import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";
import test from "node:test";

const nodeBin = process.execPath;
const rootDir = new URL("..", import.meta.url).pathname;

async function startServer() {
  const dataHome = await mkdtemp(join(tmpdir(), "axion-test-"));
  const port = 9899 + Math.floor(Math.random() * 500);
  const child = spawn(nodeBin, ["server.mjs"], {
    cwd: rootDir,
    env: {
      ...process.env,
      HOST: "127.0.0.1",
      PORT: String(port),
      APP_BASE_URL: `http://127.0.0.1:${port}`,
      AXION_DATA_DIR: dataHome,
      SESSION_SECRET: "test-session-secret-with-enough-length",
      AXION_ADMIN_PASSWORD: "owner-test-password",
      STRIPE_SECRET_KEY: "",
      GOOGLE_CLIENT_ID: "",
      SUPABASE_URL: "",
      SUPABASE_SERVICE_ROLE_KEY: "",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let logs = "";
  child.stdout.on("data", (chunk) => {
    logs += chunk.toString();
  });
  child.stderr.on("data", (chunk) => {
    logs += chunk.toString();
  });
  const baseUrl = `http://127.0.0.1:${port}`;
  const deadline = Date.now() + 6000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseUrl}/api/product`);
      if (response.ok) return { child, baseUrl, dataHome, logs: () => logs };
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 120));
    }
  }
  child.kill("SIGKILL");
  await rm(dataHome, { recursive: true, force: true });
  throw new Error(`Server did not start. Logs:\n${logs}`);
}

async function stopServer(server) {
  server.child.kill("SIGTERM");
  await new Promise((resolve) => server.child.once("exit", resolve));
  await rm(server.dataHome, { recursive: true, force: true });
}

async function jsonFetch(baseUrl, pathname, { token = "", method = "GET", body } = {}) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    method,
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const payload = await response.json().catch(() => ({}));
  return { response, payload };
}

test("login, projects, connector actions, CFD jobs and paywall setup", async () => {
  const server = await startServer();
  try {
    const product = await jsonFetch(server.baseUrl, "/api/product");
    assert.equal(product.response.status, 200);
    assert.equal(product.payload.payments.provider, "setup_required");
    assert.match(product.payload.backend.currentStorage, /local JSON/);

    const health = await jsonFetch(server.baseUrl, "/api/health");
    assert.equal(health.response.status, 200);
    assert.equal(health.payload.ok, true);
    assert.equal(health.payload.storage, "local-json");

    const readiness = await jsonFetch(server.baseUrl, "/api/production-readiness");
    assert.equal(readiness.response.status, 200);
    assert.ok(Array.isArray(readiness.payload.checks));
    assert.ok(readiness.payload.checks.some((item) => item.key === "stripe"));

    const checkout = await jsonFetch(server.baseUrl, "/api/checkout", {
      method: "POST",
      body: { customerName: "Test User", customerEmail: "test@example.com", company: "Axion Test" },
    });
    assert.equal(checkout.response.status, 503);
    assert.match(checkout.payload.error, /STRIPE_SECRET_KEY/);

    const login = await jsonFetch(server.baseUrl, "/api/auth/login", {
      method: "POST",
      body: { user: "owner", password: "owner-test-password" },
    });
    assert.equal(login.response.status, 200);
    const token = login.payload.token;
    assert.ok(token);

    const created = await jsonFetch(server.baseUrl, "/api/projects", {
      token,
      method: "POST",
      body: {
        name: "Backend smoke project",
        modelState: { template: "culturedMeat", scale: "pilot", units: [{ id: "BR-101" }], streams: [] },
        summary: { units: 1, streams: 0, template: "culturedMeat", scale: "pilot" },
      },
    });
    assert.equal(created.response.status, 201);
    assert.ok(created.payload.project.id);

    const connector = await jsonFetch(server.baseUrl, "/api/integrations/rest-api/actions", {
      token,
      method: "POST",
      body: {
        action: "test",
        modelSnapshot: { projectName: "Backend smoke project", template: "culturedMeat", scale: "pilot", units: 18, streams: 20, equations: 230, scheduleRows: 8 },
      },
    });
    assert.equal(connector.response.status, 200);
    assert.equal(connector.payload.result.title, "6/6 checks passed");
    assert.ok(connector.payload.runId);

    const cfd = await jsonFetch(server.baseUrl, "/api/cfd/jobs", {
      token,
      method: "POST",
      body: { projectId: created.payload.project.id, unitId: "BR-101", caseInput: { volumeL: 20000, workingVolumePct: 70, klaH: 16, ourMolLh: 0.004, tipSpeed: 1.2 } },
    });
    assert.equal(cfd.response.status, 201);
    assert.equal(cfd.payload.job.status, "completed-screening");
    assert.ok(cfd.payload.job.result.boundaryConditions.length >= 6);

    const exported = await jsonFetch(server.baseUrl, `/api/projects/${created.payload.project.id}/export`, { token });
    assert.equal(exported.response.status, 200);
    assert.equal(exported.payload.project.id, created.payload.project.id);
    assert.ok(Array.isArray(exported.payload.versions));
    assert.ok(Array.isArray(exported.payload.cfdJobs));

    const schema = await readFile(new URL("../supabase/schema.sql", import.meta.url), "utf8");
    assert.match(schema, /create table if not exists public\.axion_state/);
    assert.match(schema, /create table if not exists public\.axion_documents/);
    assert.match(schema, /kind in \('project_model', 'project_version', 'simulation_run'\)/);
  } finally {
    await stopServer(server);
  }
});
