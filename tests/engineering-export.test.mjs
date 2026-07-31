import assert from "node:assert/strict";
import test from "node:test";
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
