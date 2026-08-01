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
    "../public/llms.txt",
  ];
  await Promise.all(paths.map((path) => access(new URL(path, import.meta.url))));
  const checklist = await readFile(new URL(paths[0], import.meta.url), "utf8");
  assert.ok(checklist.trim().split("\n").length >= 25);
  assert.match(checklist, /Mass balance/);
  assert.match(checklist, /Validation/);
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
  ]) {
    assert.match(sitemap, new RegExp(`https://ax-i-on\\.com/${route}`));
    assert.match(server, new RegExp(`/${route}`));
    assert.match(bootstrap, new RegExp(`"?${route}"?`));
  }
});
