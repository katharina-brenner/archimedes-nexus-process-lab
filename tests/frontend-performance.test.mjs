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

test("large process graphs are routed outside the UI thread", async () => {
  const [app, worker] = await Promise.all([
    readFile(new URL("../app.js", import.meta.url), "utf8"),
    readFile(new URL("../canvas-router-worker.js", import.meta.url), "utf8"),
  ]);

  assert.match(app, /GLOBAL_ROUTER_WORKER_THRESHOLD = 80/);
  assert.match(app, /HIERARCHICAL_ROUTER_THRESHOLD = 400/);
  assert.match(app, /new Worker\(new URL\("\.\/canvas-router-worker\.js\?v=/);
  assert.match(app, /worker\.postMessage\(\{ signature, input \}\)/);
  assert.match(app, /import\("\.\/canvas-router\.js\?v=/);
  assert.doesNotMatch(app, /^import\s+\{\s*buildCrossingAwareRoutePlan/m);
  assert.match(worker, /buildCrossingAwareRoutePlan\(input\)/);
});

test("manual route locks are persisted in project model state", async () => {
  const [app, styles] = await Promise.all([
    readFile(new URL("../app.js", import.meta.url), "utf8"),
    readFile(new URL("../styles.css", import.meta.url), "utf8"),
  ]);

  assert.match(app, /lockedRoutes:\s*clone\(state\.lockedRoutes/);
  assert.match(app, /state\.lockedRoutes = modelState\.lockedRoutes/);
  assert.match(app, /data-lock-stream-route/);
  assert.match(app, /route-segment-handle/);
  assert.match(app, /class="stream-path-hit"/);
  assert.match(styles, /\.stream-path-hit[\s\S]+pointer-events:\s*stroke/);
});
