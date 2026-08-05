import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = path.resolve(import.meta.dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "axion-design-system.css"), "utf8");
const editorialCss = fs.readFileSync(path.join(root, "axion-editorial.css"), "utf8");
const unifiedCss = fs.readFileSync(path.join(root, "axion-unified.css"), "utf8");

test("clean-motion design system is loaded after the legacy stylesheet", () => {
  const legacyIndex = html.indexOf("styles.css?v=");
  const designIndex = html.indexOf("axion-design-system.css?v=");
  const editorialIndex = html.indexOf("axion-editorial.css?v=");
  const unifiedIndex = html.indexOf("axion-unified.css?v=");
  assert.ok(legacyIndex >= 0);
  assert.ok(designIndex > legacyIndex);
  assert.ok(editorialIndex > designIndex);
  assert.ok(unifiedIndex > editorialIndex);
  assert.match(html, /data-design-version="20260805-brand-reduction-v1"/);
  assert.match(unifiedCss, /Axion unified interface layer/);
  assert.match(unifiedCss, /Final alignment system/);
  assert.match(unifiedCss, /--public-content:\s*1240px/);
  assert.match(unifiedCss, /header\.intent-hero:first-child/);
  assert.match(unifiedCss, /Alignment enforcement/);
  assert.match(unifiedCss, /assets\/axion-mark\.svg/);
  assert.match(html, /assets\/photography\/axion-autonomous-bioprocess-hall-v1\.jpg/);
  assert.match(html, /assets\/photography\/axion-integrated-production-train-v1\.jpg/);
  assert.doesNotMatch(editorialCss, /Final alignment system/);
});

test("design system covers public, workspace, canvas, and reduced-motion states", () => {
  assert.match(css, /\.clarity-hero\s*\{/);
  assert.match(css, /body:not\(\.locked\) \.app-shell\s*\{/);
  assert.match(css, /body:not\(\.locked\) \.flowsheet-canvas\s*\{/);
  assert.match(css, /@keyframes axion-stream-flow/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test("editorial layer covers the studio homepage, subpages, and accessible motion", () => {
  assert.match(editorialCss, /\.editorial-showcase\s*\{/);
  assert.match(editorialCss, /\.editorial-product-grid\s*\{/);
  assert.match(editorialCss, /\.public-plant-hero\s*\{/);
  assert.match(editorialCss, /\.security-principles\s*\{/);
  assert.match(editorialCss, /\.public-scroll-progress\s*\{/);
  assert.match(editorialCss, /body\.locked \.public-section\.public-page\s*\{/);
  assert.match(editorialCss, /@keyframes studio-flow/);
  assert.match(editorialCss, /@media \(prefers-reduced-motion: reduce\)/);
});

test("public and workspace surfaces share the uniform component grammar", () => {
  assert.match(editorialCss, /--studio-radius-control:\s*10px/);
  assert.match(editorialCss, /--studio-radius-card:\s*14px/);
  assert.match(editorialCss, /--studio-text-muted:\s*#556473/);
  assert.match(editorialCss, /body\.locked #publicPricing \.pricing-grid article/);
  assert.match(editorialCss, /body\.locked \.public-nav nav \.public-menu-toggle/);
  assert.match(editorialCss, /body:not\(\.locked\) :where\(/);
});
