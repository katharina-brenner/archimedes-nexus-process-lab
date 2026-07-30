import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("public homepage defers the authenticated workspace bundle", async () => {
  const [indexHtml, bootstrap] = await Promise.all([
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../public-bootstrap.js", import.meta.url), "utf8"),
  ]);

  assert.match(indexHtml, /src="\.\/public-bootstrap\.js\?v=/);
  assert.doesNotMatch(indexHtml, /<script[^>]+src="\.\/app\.js/);
  assert.match(bootstrap, /import\("\.\/app\.js\?v=/);
  assert.match(bootstrap, /session \|\| requestedPage !== "home" \|\| checkoutReturn/);
});

test("production assets use durable caching without caching HTML", async () => {
  const server = await readFile(new URL("../server.mjs", import.meta.url), "utf8");

  assert.match(server, /public, max-age=31536000, immutable/);
  assert.match(server, /htmlDocument[\s\S]+no-cache/);
});
