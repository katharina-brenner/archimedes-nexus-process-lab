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
  assert.match(bootstrap, /const lightweightPublicPages = new Set/);
  assert.match(bootstrap, /bindLightweightLogin\(\)/);
  assert.match(bootstrap, /submitLightweightCheckout/);
  assert.match(bootstrap, /handleLightweightCheckoutReturn/);
  assert.match(bootstrap, /\["pilot"\]\.includes\(requestedPage\)/);
  assert.doesNotMatch(bootstrap, /\["login", "pricing", "pilot"\]\.includes\(requestedPage\)/);
  assert.match(bootstrap, /"faq", "pricing", "legal", "login"/);
  assert.match(bootstrap, /\(Boolean\(session\) && requestedPage === "home"\)/);
  assert.match(bootstrap, /lightweightApiRequest\("\/api\/account"/);
  assert.match(bootstrap, /authorization: `Bearer \$\{session\}`/);
  assert.match(bootstrap, /!lightweightPublicPages\.has\(requestedPage\)/);
  assert.match(bootstrap, /#publicBriefSignupForm/);
  assert.match(bootstrap, /showRequestedPublicPageImmediately\(requestedPage\)/);
  assert.match(indexHtml, /data-checkout-plan="academic"/);
  assert.match(indexHtml, /data-checkout-plan="professional"/);
  assert.match(indexHtml, /data-checkout-plan="team"/);
  assert.match(indexHtml, /data-checkout-plan="enterprise"/);
  assert.match(indexHtml, /id="checkoutPlan"/);
});

test("workspace initialization waits for verified authentication", async () => {
  const app = await readFile(new URL("../app.js", import.meta.url), "utf8");

  assert.match(app, /function initializeAuthenticatedWorkspace\(\)/);
  assert.match(app, /if \(authenticated\) initializeAuthenticatedWorkspace\(\)/);
  assert.match(app, /window\.__AXION_AUTH_BOOTSTRAP__/);
  assert.match(app, /window\.__AXION_ACCEPT_AUTH__ = \(payload\)/);
  assert.doesNotMatch(app, /bindPublicPointerMotion\(\);\s*bindEvents\(\);\s*loadTemplate/);
});

test("global parameters use full-width responsive controls and defer expensive recalculation", async () => {
  const [app, indexHtml, styles] = await Promise.all([
    readFile(new URL("../app.js", import.meta.url), "utf8"),
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../styles.css", import.meta.url), "utf8"),
  ]);

  assert.match(indexHtml, /class="control-group global-parameters-panel"/);
  assert.match(indexHtml, /Release it to recalculate the full model/);
  assert.match(indexHtml, /id="resetGlobalParameters"/);
  assert.match(styles, /\.sidebar \.global-parameter-row input\[type="range"\][\s\S]+width:\s*100%/);
  assert.match(styles, /grid-template-areas:[\s\S]+"slider slider"/);
  assert.match(app, /function previewGlobalParameterChange\(\)/);
  assert.match(app, /recalculationTimer = window\.setTimeout/);
  assert.match(app, /input\.addEventListener\("change", commitGlobalParameterChange\)/);
});

test("production assets use durable caching without caching HTML", async () => {
  const server = await readFile(new URL("../server.mjs", import.meta.url), "utf8");

  assert.match(server, /public, max-age=31536000, immutable/);
  assert.match(server, /htmlDocument[\s\S]+no-cache/);
});

test("workspace rendering is view-aware and caches expensive engineering calculations", async () => {
  const [app, styles] = await Promise.all([
    readFile(new URL("../app.js", import.meta.url), "utf8"),
    readFile(new URL("../styles.css", import.meta.url), "utf8"),
  ]);
  const renderAll = app.match(/function renderAll\(\) \{([\s\S]*?)\n\}/)?.[1] || "";

  assert.match(app, /let metricsCache = \{ key: "", value: null \}/);
  assert.match(app, /let comprehensiveReportCache = \{ key: "", value: null \}/);
  assert.match(app, /function renderActiveView\(view = document\.body\.dataset\.activeView/);
  assert.match(renderAll, /renderActiveView\(document\.body\.dataset\.activeView/);
  assert.doesNotMatch(renderAll, /renderReportsBoard\(/);
  assert.doesNotMatch(renderAll, /renderSimulationBoard\(/);
  assert.doesNotMatch(renderAll, /renderCfdBoard\(/);
  assert.doesNotMatch(renderAll, /renderTwinWorkspace\(/);
  assert.match(app, /document\.body\.dataset\.lastRenderMs/);
  assert.match(styles, /\.modelling-view\.active\s*\{[\s\S]*overflow-y:\s*auto/);
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

test("production modes and numerical solvers are connected to the workspace", async () => {
  const [app, indexHtml, styles] = await Promise.all([
    readFile(new URL("../app.js", import.meta.url), "utf8"),
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../styles.css", import.meta.url), "utf8"),
  ]);

  assert.match(app, /operationMode:\s*"perfusion"/);
  assert.match(app, /operationMode:\s*state\.operationMode/);
  assert.match(app, /solveBioprocessOde\(/);
  assert.match(app, /solveAxialTransportPde\(/);
  assert.match(app, /data-operation-mode/);
  assert.match(app, /ode-profile-csv/);
  assert.match(app, /pde-profile-csv/);
  assert.match(indexHtml, /id="impressum"/);
  assert.match(styles, /\.operation-mode-panel/);
  assert.match(styles, /\.numerical-solver-panel/);
});

test("flowsheet workbench supports equipment connections and plant boundary streams", async () => {
  const [app, indexHtml, styles] = await Promise.all([
    readFile(new URL("../app.js", import.meta.url), "utf8"),
    readFile(new URL("../index.html", import.meta.url), "utf8"),
    readFile(new URL("../styles.css", import.meta.url), "utf8"),
  ]);

  assert.match(indexHtml, /id="canvasWorkbench"/);
  assert.match(indexHtml, /Connect equipment/);
  assert.match(app, /createBoundaryStream\(/);
  assert.match(app, /addBoundaryStreamToUnit\(/);
  assert.match(app, /applyStreamEditor\(/);
  assert.match(app, /data-canvas-action="add-inlet"/);
  assert.match(app, /data-canvas-action="add-outlet"/);
  assert.match(app, /data-canvas-action="connect-to"/);
  assert.match(app, /visibleBoundaryStreams/);
  assert.match(app, /document\.body\.dataset\.activeView === "flowsheet"/);
  assert.match(styles, /\.canvas-workbench/);
  assert.match(styles, /#flowsheetView \.canvas-workbench/);
  assert.match(styles, /\.boundary-node/);
  assert.match(styles, /\.unit-disconnected/);
});

test("output-specific readiness is visible in results and exports", async () => {
  const [app, styles, readinessModule] = await Promise.all([
    readFile(new URL("../app.js", import.meta.url), "utf8"),
    readFile(new URL("../styles.css", import.meta.url), "utf8"),
    readFile(new URL("../model-readiness.js", import.meta.url), "utf8"),
  ]);

  assert.match(app, /assessModelReadiness/);
  assert.match(app, /modelReadinessAssessment\(\)/);
  assert.match(app, /model-readiness-csv/);
  assert.match(app, /outputValidityMarkup\(dynamicReadiness/);
  assert.match(app, /readinessOutputById\(readiness,\s*"tea"\)/);
  assert.match(styles, /\.model-readiness-board/);
  assert.match(styles, /\.readiness-output-grid/);
  assert.match(styles, /\.result-validity-banner/);
  assert.match(readinessModule, /Flowsheet \+ mass and energy balances/);
  assert.match(readinessModule, /Bioreactor CFD \+ transport/);
});

test("reports provide a complete detailed engineering handoff", async () => {
  const [app, styles, exportModule] = await Promise.all([
    readFile(new URL("../app.js", import.meta.url), "utf8"),
    readFile(new URL("../styles.css", import.meta.url), "utf8"),
    readFile(new URL("../engineering-export.js", import.meta.url), "utf8"),
  ]);

  assert.match(app, /data-download-report="complete-package"/);
  assert.match(app, /data-download-report="engineering-workbook"/);
  assert.match(app, /function fullProcessCanvasSvg\(/);
  assert.match(app, /function sensitivityTornadoSvg\(/);
  assert.match(app, /function engineeringSensitivityRows\(/);
  assert.match(app, /function streamComponentRows\(/);
  assert.match(app, /function unitComponentLedgerRows\(/);
  assert.match(app, /function calculationAuditRows\(/);
  assert.match(app, /parameterIntervals/);
  assert.match(app, /workbookSheetCount: tables\.length \+ 3/);
  assert.match(styles, /\.export-command-center/);
  assert.match(styles, /\.export-canvas-scroll/);
  assert.match(styles, /\.export-table-scroll/);
  assert.match(exportModule, /vendor\/exceljs-browser\.js/);
  assert.match(exportModule, /Workbook index/);
  assert.match(exportModule, /Data dictionary/);
  assert.match(exportModule, /QA summary/);
  assert.match(exportModule, /vendor\/fflate-browser\.js/);
});
