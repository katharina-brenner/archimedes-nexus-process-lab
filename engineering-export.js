function safeSheetName(value, used) {
  const base = String(value || "Sheet")
    .replace(/[\\/?*:[\]]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 31) || "Sheet";
  let candidate = base;
  let index = 2;
  while (used.has(candidate)) {
    const suffix = ` ${index++}`;
    candidate = `${base.slice(0, 31 - suffix.length)}${suffix}`;
  }
  used.add(candidate);
  return candidate;
}

function spreadsheetValue(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "number" || typeof value === "boolean" || value instanceof Date) return value;
  if (typeof value === "object") return JSON.stringify(value);
  const text = String(value);
  return /^[=+@]/.test(text) ? `'${text}` : text;
}

function tableHeaders(rows) {
  const seen = new Set();
  const headers = [];
  rows.forEach((row) => Object.keys(row || {}).forEach((key) => {
    if (seen.has(key)) return;
    seen.add(key);
    headers.push(key);
  }));
  return headers.length ? headers : ["empty"];
}

function columnWidth(header, rows) {
  const sample = rows.slice(0, 120).map((row) => String(row?.[header] ?? ""));
  return Math.max(11, Math.min(44, Math.max(String(header).length + 2, ...sample.map((value) => value.length + 2))));
}

export function csvText(rows) {
  const sourceRows = rows?.length ? rows : [{ empty: "" }];
  const headers = tableHeaders(sourceRows);
  const escape = (value) => `"${String(spreadsheetValue(value)).replaceAll('"', '""')}"`;
  return [
    headers.map(escape).join(","),
    ...sourceRows.map((row) => headers.map((header) => escape(row?.[header] ?? "")).join(",")),
  ].join("\n");
}

export async function buildEngineeringWorkbook(tables, metadata = {}) {
  const module = await import("exceljs/dist/exceljs.min.js");
  const ExcelJS = module.default || module;
  const workbook = new ExcelJS.Workbook();
  workbook.creator = metadata.exportProduct || "Axion Process OS";
  workbook.lastModifiedBy = metadata.generatedBy || "Axion user";
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.subject = metadata.exportKind || "Detailed engineering model export";
  workbook.title = `${metadata.scenario || "Axion model"} engineering package`;
  workbook.description = metadata.modelBasis || "Process engineering export";
  workbook.company = "neunzigzehn GmbH";
  workbook.calcProperties.fullCalcOnLoad = true;

  const usedNames = new Set();
  tables.forEach((table) => {
    const rows = table.rows?.length ? table.rows : [{ empty: "" }];
    const headers = tableHeaders(rows);
    const worksheet = workbook.addWorksheet(safeSheetName(table.sheet, usedNames), {
      views: [{ state: "frozen", ySplit: 1, xSplit: Math.min(2, headers.length) }],
      properties: { defaultRowHeight: 18 },
    });
    worksheet.columns = headers.map((header) => ({
      header,
      key: header,
      width: columnWidth(header, rows),
    }));
    rows.forEach((row) => worksheet.addRow(Object.fromEntries(headers.map((header) => [header, spreadsheetValue(row?.[header])]))));
    worksheet.autoFilter = {
      from: { row: 1, column: 1 },
      to: { row: 1, column: headers.length },
    };
    worksheet.getRow(1).height = 28;
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { name: "Arial", size: 10, bold: true, color: { argb: "FFF5FAF9" } };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF173F3B" } };
      cell.alignment = { vertical: "middle", wrapText: true };
      cell.border = { bottom: { style: "thin", color: { argb: "FF6E9A92" } } };
    });
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      row.alignment = { vertical: "top", wrapText: true };
      row.font = { name: "Arial", size: 9, color: { argb: "FF183039" } };
      if (rowNumber % 2 === 0) {
        row.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF1F6F4" } };
      }
      row.eachCell((cell) => {
        if (typeof cell.value === "number") cell.numFmt = "#,##0.000";
      });
    });
    worksheet.pageSetup = { orientation: headers.length > 8 ? "landscape" : "portrait", fitToPage: true, fitToWidth: 1, fitToHeight: 0 };
    worksheet.headerFooter.oddHeader = `&LAxion Process OS&C${String(table.sheet || "Engineering data")}&R${metadata.exportDate || ""}`;
    worksheet.headerFooter.oddFooter = "&Lneunzigzehn GmbH&CPage &P of &N&RScreening model - review assumptions";
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return new Uint8Array(buffer);
}

export async function buildEngineeringZip(files) {
  const { strToU8, zipSync } = await import("fflate");
  const payload = Object.fromEntries(files.map((file) => [
    file.path,
    typeof file.data === "string" ? strToU8(file.data) : file.data,
  ]));
  return zipSync(payload, { level: 6 });
}
