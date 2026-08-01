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

function humanizeHeader(header) {
  return String(header || "")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replaceAll("_", " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (character) => character.toUpperCase());
}

function unitFromHeader(header) {
  const value = String(header || "").toLowerCase();
  const units = [
    [/usdkg|usdperkg/, "USD/kg product"],
    [/usdyr|usdperyr|annualvalueusd|estimateusdperyr/, "USD/year"],
    [/usd/, "USD"],
    [/co2e.*kg|kgco2e/, "kg CO2e"],
    [/mwh/, "MWh"],
    [/kwh/, "kWh"],
    [/nm3h/, "Nm3/h"],
    [/kgm3/, "kg/m3"],
    [/g\/l|gl$/, "g/L"],
    [/mm$/, "mmol/L"],
    [/lmh/, "L/m2/h"],
    [/m2$/, "m2"],
    [/volume.*l|liters|litres|litre|workingvolumel|batchsizel|wfidemandl/, "L"],
    [/mass.*kg|kgbatch|kgannual|annualmasskg|productkg|biomasskg|cleansteamkg/, "kg"],
    [/temperaturec|tempc/, "degC"],
    [/pressure.*kpa|kpa/, "kPa"],
    [/viscositycp/, "cP"],
    [/velocity.*ms|tipspeed/, "m/s"],
    [/positionm|lengthm|diameterm|heightm/, "m"],
    [/timeh|durationh|starth|finishh|endh|hours|residencetimeh|batchdurationh/, "h"],
    [/pct|percent|percentage|utilization|recovery|yield|closure|completeness/, "%"],
    [/perh|1h/, "1/h"],
  ];
  return units.find(([pattern]) => pattern.test(value))?.[1] || "";
}

function definitionForHeader(header) {
  const value = String(header || "").toLowerCase();
  const definitions = [
    [/^id$|tag$|streamid|flowid|taskid|scenarioid/, "Stable model identifier used to join this record to other worksheets."],
    [/sourcebasis|sourceclass|source$/, "Evidence or assumption basis used for the exported value."],
    [/status|severity|risk|signal/, "Model, solver, evidence, capacity, or boundary review state."],
    [/annual/, "Value normalized to the active annual production plan."],
    [/perkgproduct|perkg/, "Value normalized to the functional unit of one kilogram of product."],
    [/batch|cycle/, "Value normalized to one modeled production batch or operating cycle."],
    [/low|p10/, "Lower screening interval; replace with project evidence or an approved distribution."],
    [/high|p90/, "Upper screening interval; replace with project evidence or an approved distribution."],
    [/base|p50|value/, "Active base-case value used by the current model."],
    [/equation|formula/, "Equation or calculation basis applied by the model."],
    [/warning|gap|missing|validation|evidence/, "Explicit limitation or evidence item that remains to be resolved."],
    [/from/, "Source node, unit, room, resource, or lower interval boundary."],
    [/to/, "Destination node, unit, room, resource, or upper interval boundary."],
    [/component/, "Chemical, biochemical, utility, waste, or aggregate material component."],
    [/mass/, "Calculated or estimated mass flow or inventory quantity."],
    [/energy|heat|power|utility/, "Calculated energy, heat, power, or site-utility requirement."],
    [/cost|capex|opex|price/, "Techno-economic value in the active cost basis."],
    [/impact|co2|water|waste|emission/, "Life-cycle inventory or environmental screening result."],
    [/time|start|finish|duration|occupancy/, "Finite-capacity schedule or dynamic-model time quantity."],
  ];
  return definitions.find(([pattern]) => pattern.test(value))?.[1]
    || `${humanizeHeader(header)} exported from the active Axion process model.`;
}

function inferredType(values) {
  const populated = values.filter((value) => value !== "" && value !== null && value !== undefined);
  if (!populated.length) return "empty / pending input";
  if (populated.every((value) => typeof value === "number")) return "number";
  if (populated.every((value) => typeof value === "boolean")) return "boolean";
  if (populated.every((value) => value instanceof Date)) return "date/time";
  if (populated.some((value) => typeof value === "object")) return "structured JSON";
  return "text";
}

function numberFormatForHeader(header) {
  const value = String(header || "").toLowerCase();
  if (/pct|percent|percentage|utilization|recovery|yield|closure|completeness/.test(value)) return '0.00"%"';
  if (/usdkg|usdperkg|perkgproductusd/.test(value)) return '$#,##0.00';
  if (/usd|cost|capex|opex|price/.test(value)) return '$#,##0.00';
  if (/residual|tolerance|peclet|courant/.test(value)) return "0.000E+00";
  if (/count|index|iteration|records|rank|operationno|bucket$|node$/.test(value)) return "#,##0";
  return "#,##0.000";
}

function statusColors(value) {
  const text = String(value || "").toLowerCase();
  if (/critical|blocked|conflict|failed|hard boundary|must be resolved|not converged/.test(text)) {
    return { fill: "FFF5D9D7", font: "FF8C2F2A" };
  }
  if (/caution|warning|review|screening|estimated|watch|pending|missing|capacity/.test(text)) {
    return { fill: "FFFFF2D6", font: "FF755818" };
  }
  if (/ready|solved|complete|converged|accepted|within|ok|active|scheduled/.test(text)) {
    return { fill: "FFE1F2EC", font: "FF175E4E" };
  }
  return null;
}

function internalSheetLinkFormula(sheetName, label) {
  const escapedSheet = String(sheetName || "Sheet").replaceAll("'", "''");
  const escapedLabel = String(label || sheetName || "Open sheet").replaceAll('"', '""');
  return `HYPERLINK("#'${escapedSheet}'!A1","${escapedLabel}")`;
}

function styleStructuredSheet(worksheet, table, rows, headers, metadata) {
  const lastColumn = Math.max(1, headers.length);
  worksheet.mergeCells(1, 1, 1, lastColumn);
  worksheet.mergeCells(2, 1, 2, lastColumn);
  worksheet.mergeCells(3, 1, 3, lastColumn);
  worksheet.getCell(1, 1).value = table.sheet;
  worksheet.getCell(2, 1).value = table.description || "Detailed engineering data from the active process model.";
  worksheet.getCell(3, 1).value = `${metadata.scenario || "Axion model"} | generated ${metadata.exportDate || new Date().toISOString()} | ${rows.length} records | screening basis unless stated otherwise`;
  worksheet.getRow(1).height = 30;
  worksheet.getRow(2).height = 28;
  worksheet.getRow(3).height = 22;
  worksheet.getCell(1, 1).font = { name: "Arial", size: 16, bold: true, color: { argb: "FFF5FAF9" } };
  worksheet.getCell(1, 1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF102C3A" } };
  worksheet.getCell(1, 1).alignment = { vertical: "middle" };
  worksheet.getCell(2, 1).font = { name: "Arial", size: 10, bold: true, color: { argb: "FF264B51" } };
  worksheet.getCell(2, 1).alignment = { vertical: "middle", wrapText: true };
  worksheet.getCell(3, 1).font = { name: "Arial", size: 9, italic: true, color: { argb: "FF64777B" } };

  headers.forEach((header, index) => {
    const column = worksheet.getColumn(index + 1);
    column.width = columnWidth(header, rows);
    column.key = header;
  });
  worksheet.getRow(5).values = headers;
  rows.forEach((row) => worksheet.addRow(headers.map((header) => spreadsheetValue(row?.[header]))));
  worksheet.views = [{ state: "frozen", ySplit: 5, xSplit: Math.min(2, headers.length), topLeftCell: headers.length > 1 ? "C6" : "A6", activeCell: "A6" }];
  worksheet.autoFilter = { from: { row: 5, column: 1 }, to: { row: 5, column: headers.length } };
  worksheet.getRow(5).height = 32;
  worksheet.getRow(5).eachCell((cell) => {
    cell.font = { name: "Arial", size: 9, bold: true, color: { argb: "FFF5FAF9" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF173F3B" } };
    cell.alignment = { vertical: "middle", wrapText: true };
  });
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber <= 5) return;
    row.alignment = { vertical: "top", wrapText: true };
    row.font = { name: "Arial", size: 9, color: { argb: "FF183039" } };
    row.eachCell((cell, columnNumber) => {
      const header = headers[columnNumber - 1];
      if (typeof cell.value === "number") cell.numFmt = numberFormatForHeader(header);
      if (/status|severity|risk|signal|quality|readiness|decision/i.test(header)) {
        const colors = statusColors(cell.value);
        if (colors) {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: colors.fill } };
          cell.font = { ...cell.font, bold: true, color: { argb: colors.font } };
        }
      }
    });
  });
  worksheet.pageSetup = { orientation: headers.length > 8 ? "landscape" : "portrait", fitToPage: true, fitToWidth: 1, fitToHeight: 0 };
  worksheet.headerFooter.oddHeader = `&LAxion Process OS&C${String(table.sheet || "Engineering data")}&R${metadata.exportDate || ""}`;
  worksheet.headerFooter.oddFooter = "&Lneunzigzehn GmbH&CPage &P of &N&RScreening model - review assumptions";
  worksheet.properties.defaultRowHeight = 18;
}

async function loadExcelJs() {
  const module = await import("./vendor/exceljs-browser.js");
  return module.default;
}

async function loadFflate() {
  return import("./vendor/fflate-browser.js");
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
  const ExcelJS = await loadExcelJs();
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
  const indexSheet = workbook.addWorksheet("Workbook index");
  const dictionarySheet = workbook.addWorksheet("Data dictionary");
  const qaSheet = workbook.addWorksheet("QA summary");
  const indexRows = [];
  const dictionaryRows = [];
  const qaRows = [];

  tables.forEach((table, tableIndex) => {
    const rows = table.rows?.length ? table.rows : [{ empty: "" }];
    const headers = tableHeaders(rows);
    const sheetName = safeSheetName(table.sheet, usedNames);
    const worksheet = workbook.addWorksheet(sheetName);
    styleStructuredSheet(worksheet, table, rows, headers, metadata);

    const populatedCells = rows.reduce((count, row) => count + headers.filter((header) => row?.[header] !== "" && row?.[header] !== null && row?.[header] !== undefined).length, 0);
    const totalCells = rows.length * headers.length;
    const issueRows = rows.filter((row) => Object.entries(row || {}).some(([key, value]) => /status|severity|risk|warning|gap/i.test(key) && /critical|blocked|conflict|failed|warning|review|missing|gap/i.test(String(value || "")))).length;
    indexRows.push({
      sequence: tableIndex + 1,
      worksheet: sheetName,
      category: table.category || String(table.sheet || "").replace(/^\d+\s*/, "").split(" ")[0],
      purpose: table.description || "Detailed engineering data",
      records: rows.length,
      columns: headers.length,
      csvFile: table.file || "",
      navigation: `Open ${sheetName}`,
    });
    headers.forEach((header, columnIndex) => {
      const values = rows.map((row) => row?.[header]);
      const sample = values.find((value) => value !== "" && value !== null && value !== undefined);
      dictionaryRows.push({
        worksheet: sheetName,
        columnOrder: columnIndex + 1,
        field: header,
        displayName: humanizeHeader(header),
        dataType: inferredType(values),
        unit: table.units?.[header] || unitFromHeader(header),
        definition: table.columnDefinitions?.[header] || definitionForHeader(header),
        example: spreadsheetValue(sample),
        sourceBasis: table.sourceBasis || "Active Axion model and the evidence basis stated in the source worksheet",
      });
    });
    qaRows.push({
      worksheet: sheetName,
      records: rows.length,
      columns: headers.length,
      totalCells,
      populatedCells,
      blankCells: totalCells - populatedCells,
      completenessPct: totalCells ? populatedCells / totalCells * 100 : 0,
      flaggedRows: issueRows,
      qaStatus: !rows.length ? "empty" : issueRows ? "review flagged rows" : "complete for current model basis",
      reviewAction: issueRows ? "Filter status, severity, risk, warning and evidence columns before decision use." : "Confirm values against project-specific evidence before approval.",
    });
  });

  const systemTables = [
    { worksheet: indexSheet, table: { sheet: "Workbook index", description: "Navigation, scope and record count for every engineering worksheet." }, rows: indexRows },
    { worksheet: dictionarySheet, table: { sheet: "Data dictionary", description: "Field-level definitions, units, data types, examples and source basis for the complete workbook." }, rows: dictionaryRows },
    { worksheet: qaSheet, table: { sheet: "QA summary", description: "Completeness and review flags for every exported worksheet." }, rows: qaRows },
  ];
  systemTables.forEach(({ worksheet, table, rows }) => {
    const headers = tableHeaders(rows);
    styleStructuredSheet(worksheet, table, rows, headers, metadata);
  });
  indexRows.forEach((row, index) => {
    const cell = indexSheet.getCell(index + 6, 8);
    cell.value = {
      formula: internalSheetLinkFormula(row.worksheet, row.navigation),
      result: row.navigation,
    };
    cell.font = { name: "Arial", size: 9, bold: true, color: { argb: "FF176B64" }, underline: true };
  });
  qaRows.forEach((row, index) => {
    const formulaCell = qaSheet.getCell(index + 6, 7);
    formulaCell.value = { formula: `IFERROR(E${index + 6}/D${index + 6}*100,0)`, result: row.completenessPct };
    formulaCell.numFmt = '0.00"%"';
  });

  const buffer = await workbook.xlsx.writeBuffer();
  return new Uint8Array(buffer);
}

export async function buildEngineeringZip(files) {
  const { strToU8, zipSync } = await loadFflate();
  const payload = Object.fromEntries(files.map((file) => [
    file.path,
    typeof file.data === "string" ? strToU8(file.data) : file.data,
  ]));
  return zipSync(payload, { level: 6 });
}
