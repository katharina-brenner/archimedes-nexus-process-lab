import assert from "node:assert/strict";
import test from "node:test";
import ExcelJS from "exceljs";
import { unzipSync, strFromU8 } from "fflate";

import { buildEngineeringWorkbook, buildEngineeringZip, csvText } from "../engineering-export.js";

test("engineering CSV keeps union columns and neutralizes spreadsheet formulas", () => {
  const csv = csvText([
    { parameter: "Titer", base: 5, note: "measured" },
    { parameter: "Media cost", low: 3.2, high: 8.4, note: "=SUM(A1:A2)" },
  ]);

  assert.match(csv, /"parameter","base","note","low","high"/);
  assert.match(csv, /"'=SUM\(A1:A2\)"/);
  assert.match(csv, /"Media cost"/);
});

test("engineering workbook contains formatted long-form worksheets", async () => {
  const workbook = await buildEngineeringWorkbook([
    {
      sheet: "Sensitivity sweep",
      rows: Array.from({ length: 140 }, (_, index) => ({
        run: index + 1,
        parameter: `Parameter ${index % 20}`,
        variationPct: (index % 7 - 3) * 10,
        directCostUsdKg: 1000 + index * 4.25,
      })),
    },
    { sheet: "Parameter intervals", rows: [{ parameter: "Titer", p10Low: 3, baseP50: 5, p90High: 8 }] },
  ], { scenario: "Test process", exportDate: "2026-07-31" });

  assert.equal(workbook[0], 0x50);
  assert.equal(workbook[1], 0x4b);
  assert.ok(workbook.byteLength > 8000);

  const parsed = new ExcelJS.Workbook();
  await parsed.xlsx.load(Buffer.from(workbook));
  assert.deepEqual(parsed.worksheets.map((sheet) => sheet.name), [
    "Workbook index",
    "Data dictionary",
    "QA summary",
    "Sensitivity sweep",
    "Parameter intervals",
  ]);

  const sensitivity = parsed.getWorksheet("Sensitivity sweep");
  assert.equal(sensitivity.getCell("A1").value, "Sensitivity sweep");
  assert.equal(sensitivity.getCell("A5").value, "run");
  assert.equal(sensitivity.getCell("A6").value, 1);
  assert.equal(sensitivity.getCell("A145").value, 140);
  assert.equal(Object.keys(sensitivity.tables).length, 1);
  assert.equal(sensitivity.views[0].state, "frozen");
  assert.equal(sensitivity.views[0].ySplit, 5);

  const dictionary = parsed.getWorksheet("Data dictionary");
  assert.ok(dictionary.rowCount > 10);
  assert.equal(dictionary.getCell("A5").value, "worksheet");
  assert.match(String(dictionary.getCell("G6").value), /exported|identifier|value/i);

  const qa = parsed.getWorksheet("QA summary");
  assert.equal(qa.getCell("A6").value, "Sensitivity sweep");
  assert.equal(qa.getCell("B6").value, 140);
  assert.equal(qa.getCell("G6").type, ExcelJS.ValueType.Formula);

  const index = parsed.getWorksheet("Workbook index");
  assert.equal(index.getCell("E6").value, 140);
  assert.match(index.getCell("H6").value.hyperlink, /Sensitivity sweep/);
});

test("complete export ZIP keeps workbook, canvas and detailed tables together", async () => {
  const zip = await buildEngineeringZip([
    { path: "model/workbook.xlsx", data: new Uint8Array([0x50, 0x4b, 0x03, 0x04]) },
    { path: "flowsheets/full-process-canvas.svg", data: "<svg><title>Full process</title></svg>" },
    { path: "csv/sensitivity.csv", data: "parameter,variationPct\nTiter,-20" },
  ]);
  const files = unzipSync(zip);

  assert.deepEqual(Object.keys(files).sort(), [
    "csv/sensitivity.csv",
    "flowsheets/full-process-canvas.svg",
    "model/workbook.xlsx",
  ]);
  assert.match(strFromU8(files["flowsheets/full-process-canvas.svg"]), /Full process/);
});
