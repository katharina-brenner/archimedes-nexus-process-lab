import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);

test("workspace exposes one industrial validation center", async () => {
  const [html, app] = await Promise.all([
    readFile(new URL("index.html", root), "utf8"),
    readFile(new URL("app.js", root), "utf8"),
  ]);

  assert.match(html, /data-view="validation">Validation Center/);
  assert.match(html, /id="validationView"/);
  assert.match(html, /id="validationBoard"/);
  assert.match(app, /function renderValidationCenter\(\)/);
  assert.match(app, /Für industrielle Vorhersagequalität fehlen weiterhin kundenspezifische Kalibrierungsdaten/);
});

test("validation matrix names all external industrial evidence gates", async () => {
  const app = await readFile(new URL("app.js", root), "utf8");

  assert.match(app, /Customer-specific calibration data/);
  assert.match(app, /Application-specific validated model/);
  assert.match(app, /External 3D CFD cluster/);
  assert.match(app, /PLC \/ SCADA \/ historian connection/);
  assert.match(app, /industriallyValidated: false/);
  assert.match(app, /industrial-validation-csv/);
  assert.match(app, /"Industrial validation"/);
});

test("validation center has responsive high-contrast styling", async () => {
  const css = await readFile(new URL("axion-design-system.css", root), "utf8");

  assert.match(css, /\.validation-hero/);
  assert.match(css, /\.validation-gate-list/);
  assert.match(css, /\.validation-ladder/);
  assert.match(css, /@media \(max-width: 720px\)[\s\S]*\.validation-gate-body/);
});
