import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "axion-design-system.css"), "utf8");

test("clean-motion design system is loaded after the legacy stylesheet", () => {
  const legacyIndex = html.indexOf("styles.css?v=");
  const designIndex = html.indexOf("axion-design-system.css?v=");
  assert.ok(legacyIndex >= 0);
  assert.ok(designIndex > legacyIndex);
  assert.match(html, /data-design-version="20260803-clean-motion-v1"/);
});

test("design system covers public, workspace, canvas, and reduced-motion states", () => {
  assert.match(css, /\.clarity-hero\s*\{/);
  assert.match(css, /body:not\(\.locked\) \.app-shell\s*\{/);
  assert.match(css, /body:not\(\.locked\) \.flowsheet-canvas\s*\{/);
  assert.match(css, /@keyframes axion-stream-flow/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});
