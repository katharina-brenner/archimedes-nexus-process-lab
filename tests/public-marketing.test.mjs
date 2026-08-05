import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("..", import.meta.url);

test("public resource center exposes qualified engineering content without a download gate", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /id="publicResources"/);
  assert.match(html, /data-public-page="resources"/);
  assert.match(html, /Bioprocess model readiness checklist/);
  assert.match(html, /Production data request template/);
  assert.match(html, /Acceptance criteria template/i);
  assert.match(html, /id="publicBriefSignupForm"/);
  assert.match(html, /href="\.\/resources\/bioprocess-model-readiness-checklist\.csv" download/);
});

test("resource downloads and AI-readable product summary are shipped", async () => {
  const paths = [
    "../public/resources/bioprocess-model-readiness-checklist.csv",
    "../public/resources/process-model-data-request-template.csv",
    "../public/resources/technical-pilot-acceptance-criteria.csv",
    "../public/resources/superpro-migration-benchmark.csv",
    "../public/llms.txt",
  ];
  await Promise.all(paths.map((path) => access(new URL(path, import.meta.url))));
  const checklist = await readFile(new URL(paths[0], import.meta.url), "utf8");
  assert.ok(checklist.trim().split("\n").length >= 25);
  assert.match(checklist, /Mass balance/);
  assert.match(checklist, /Validation/);
});

test("high-intent buyer pages are distinct, visual, and conversion ready", async () => {
  const [html, bootstrap, server] = await Promise.all([
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../public-bootstrap.js", import.meta.url), "utf8"),
    readFile(new URL("../server.mjs", import.meta.url), "utf8"),
  ]);
  const pages = [
    ["publicSimulationIntent", "simulation", "bioprocess-simulation-software"],
    ["publicSchedulingIntent", "scheduling", "biomanufacturing-scheduling-software"],
    ["publicTeaIntent", "tea", "bioprocess-tea-lca-software"],
    ["publicBiopharmaIntent", "biopharma", "biopharma-process-simulation"],
    ["publicFermentationIntent", "fermentation", "fermentation-process-modeling"],
    ["publicMigration", "migration", "superpro-designer-migration"],
  ];
  for (const [id, page, route] of pages) {
    assert.match(html, new RegExp(`id="${id}"[\\s\\S]{0,160}data-public-page="${page}"`));
    assert.match(bootstrap, new RegExp(`"?${route}"?: "${page}"`));
    assert.match(server, new RegExp(`/${route}`));
  }
  assert.match(html, /id="migrationAssessmentForm"/);
  assert.match(bootstrap, /submitMigrationAssessment/);
  assert.match(html, /assets\/product\/axion-flowsheet-workspace\.png/);
  assert.match(html, /assets\/photography\/industrial-fermenters-15000l\.jpg/);
});

test("sitemap and server metadata cover high-intent engineering routes", async () => {
  const [sitemap, server, bootstrap] = await Promise.all([
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
    readFile(new URL("../server.mjs", import.meta.url), "utf8"),
    readFile(new URL("../public-bootstrap.js", import.meta.url), "utf8"),
  ]);
  for (const route of [
    "resources",
    "bioprocess-model-readiness",
    "bioprocess-simulation-software",
    "biomanufacturing-scheduling-software",
    "bioprocess-tea-lca-software",
    "biopharma-process-simulation",
    "fermentation-process-modeling",
    "superpro-designer-migration",
    "faq",
  ]) {
    assert.match(sitemap, new RegExp(`https://ax-i-on\\.com/${route}`));
    assert.match(server, new RegExp(`/${route}`));
    assert.match(bootstrap, new RegExp(`"?${route}"?`));
  }
});

test("public FAQ, subscription clarity, and internal discovery links are shipped", async () => {
  const [html, bootstrap, server, sitemap] = await Promise.all([
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../public-bootstrap.js", import.meta.url), "utf8"),
    readFile(new URL("../server.mjs", import.meta.url), "utf8"),
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
  ]);
  assert.match(html, /id="publicFaq"[\s\S]{0,180}data-public-page="faq"/);
  assert.match(html, /Clear answers for process and engineering teams/);
  assert.match(html, /Payment FAQ/);
  assert.match(html, /public-route-footer/);
  assert.match(html, /href="\.\/bioprocess-simulation-software"/);
  assert.match(html, /href="\.\/biomanufacturing-scheduling-software"/);
  assert.match(html, /href="\.\/bioprocess-tea-lca-software"/);
  assert.match(html, /max-snippet:-1/);
  assert.match(html, /name="twitter:image"/);
  assert.match(bootstrap, /faq: "faq"/);
  assert.match(server, /"\/faq"/);
  assert.match(server, /Bioprocess Engineering Software FAQ/);
  assert.match(sitemap, /https:\/\/ax-i-on\.com\/faq/);
});

test("public positioning sells an evidence-led engineering decision package", async () => {
  const [html, app] = await Promise.all([
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../app.js", import.meta.url), "utf8"),
  ]);
  assert.match(html, /Built for the teams that turn biology into production/);
  assert.match(html, /Process development \+ MSAT/);
  assert.match(html, /See the whole production system/);
  assert.match(html, /Validated models, dedicated infrastructure, and implementation/);
  assert.doesNotMatch(html, /SuperPro is probably|3 bis 6 Mio|Umsatzbandbreite/);
  assert.match(app, /function decisionPackageMarkup/);
  for (const label of ["Process basis", "Scale-up envelope", "Capacity plan", "Investment model", "Environmental model", "Transport + validation"]) {
    assert.ok(app.includes(label), `missing decision-package label: ${label}`);
  }
});

test("public architecture uses one route section and evidence instead of internal placeholders", async () => {
  const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
  for (const page of ["platform", "workflow", "ecosystem", "readiness"]) {
    const matches = html.match(new RegExp(`data-public-page="${page}"`, "g")) || [];
    assert.equal(matches.length, 1, `expected one public section for ${page}`);
  }
  assert.match(html, /class="public-plant-hero"/);
  assert.match(html, /assets\/photography\/axion-autonomous-bioprocess-hall-v1\.jpg/);
  assert.match(html, /assets\/photography\/axion-integrated-production-train-v1\.jpg/);
  assert.match(html, /assets\/product\/axion-flowsheet-workspace\.png/);
  assert.match(html, /assets\/product\/axion-plant-overview\.png/);
  assert.match(html, /assets\/product\/axion-tea-lca\.png/);
  assert.doesNotMatch(html, /Professional Web App Readiness/);
  assert.doesNotMatch(html, /External setup needed/);
  assert.doesNotMatch(html, /Current product evidence, not a future-state concept/);
  assert.doesNotMatch(html, /class="axion-system-orbit"/);
});
