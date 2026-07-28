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
      AXION_SEED_USERS_JSON: JSON.stringify([
        {
          username: "internal-test-user",
          email: "internal-test-user@local.axion",
          name: "Internal Test User",
          password: "internal-test-password",
          role: "user",
          paymentExempt: true,
        },
      ]),
      AXION_DISABLE_OPENAI: "true",
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
    assert.equal(product.payload.backend.professionalReadinessEndpoint, "/api/professional-readiness");

    const health = await jsonFetch(server.baseUrl, "/api/health");
    assert.equal(health.response.status, 200);
    assert.equal(health.payload.ok, true);
    assert.equal(health.payload.storage, "local-json");

    const readiness = await jsonFetch(server.baseUrl, "/api/production-readiness");
    assert.equal(readiness.response.status, 200);
    assert.ok(Array.isArray(readiness.payload.checks));
    assert.ok(readiness.payload.checks.some((item) => item.key === "stripe"));
    assert.ok(readiness.payload.checks.some((item) => item.key === "nextjs-bff"));
    assert.ok(readiness.payload.checks.some((item) => item.key === "stripe" && item.requiresPaymentApproval));
    assert.ok(readiness.payload.approvalSummary.paymentApprovalRequiredFor.includes("stripe"));

    const professionalReadiness = await jsonFetch(server.baseUrl, "/api/professional-readiness");
    assert.equal(professionalReadiness.response.status, 200);
    assert.equal(professionalReadiness.payload.productName, "Axion Process OS");
    assert.ok(professionalReadiness.payload.alreadyImplemented.some((item) => item.area === "Backend API"));
    assert.ok(professionalReadiness.payload.stillMissingBeforeProfessionalSaaS.some((item) => item.area === "Deployment and domain"));
    assert.ok(professionalReadiness.payload.stillMissingBeforeProfessionalSaaS.some((item) => item.requiresPaymentApproval));

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

    const internalLogin = await jsonFetch(server.baseUrl, "/api/auth/login", {
      method: "POST",
      body: { user: "internal-test-user", password: "internal-test-password" },
    });
    assert.equal(internalLogin.response.status, 200);
    assert.equal(internalLogin.payload.account.name, "Internal Test User");
    assert.equal(internalLogin.payload.account.billing.paymentExempt, true);

    const processes = await jsonFetch(server.baseUrl, "/api/backend/processes", { token });
    assert.equal(processes.response.status, 200);
    assert.ok(processes.payload.processes.some((item) => item.id === "nextjs-bff"));
    assert.ok(processes.payload.deploymentOrder.length >= 4);

    const architecture = await jsonFetch(server.baseUrl, "/api/data/architecture", { token });
    assert.equal(architecture.response.status, 200);
    assert.equal(architecture.payload.professionalReadiness.currentStage, "local engineering prototype with production-ready scaffolds");
    assert.ok(architecture.payload.professionalReadiness.stillMissingBeforeProfessionalSaaS.length >= 6);

    const services = await jsonFetch(server.baseUrl, "/api/services/status", { token });
    assert.equal(services.response.status, 200);
    assert.ok(services.payload.services.some((item) => item.key === "openai"));
    assert.ok(services.payload.services.some((item) => item.key === "stripe"));
    assert.ok(Array.isArray(services.payload.nextActions));
    assert.ok(services.payload.nextActions.some((item) => item.requiresOwnerAction && item.ownerAction));

    const missingProbe = await jsonFetch(server.baseUrl, "/api/services/stripe/probe", { token, method: "POST" });
    assert.equal(missingProbe.response.status, 200);
    assert.equal(missingProbe.payload.service, "stripe");
    assert.equal(missingProbe.payload.result.ok, false);
    assert.match(missingProbe.payload.result.detail, /STRIPE_SECRET_KEY/);

    const commandPlan = await jsonFetch(server.baseUrl, "/api/commands/plan", {
      token,
      method: "POST",
      body: {
        prompt: "reduce working volume to 70 and move nutrient feed to feed ring and start CFD",
        context: { template: "culturedMeat", scale: "pilot", selectedId: "BR-101" },
      },
    });
    assert.equal(commandPlan.response.status, 201);
    assert.equal(commandPlan.payload.commandPlan.status, "planned");
    assert.ok(commandPlan.payload.commandPlan.plan.operations.some((operation) => operation.op === "setParam" && operation.key === "workingVolume"));

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

    const commandApply = await jsonFetch(server.baseUrl, `/api/commands/${commandPlan.payload.commandPlan.id}/apply`, {
      token,
      method: "POST",
      body: {
        projectId: created.payload.project.id,
        modelStateAfter: { template: "culturedMeat", scale: "pilot", params: { workingVolume: 70 }, units: [{ id: "BR-101" }], streams: [] },
        summary: { units: 1, streams: 0, command: "working volume 70" },
      },
    });
    assert.equal(commandApply.response.status, 200);
    assert.ok(commandApply.payload.versionId);

    const dataset = await jsonFetch(server.baseUrl, "/api/datasets", {
      token,
      method: "POST",
      body: {
        projectId: created.payload.project.id,
        name: "Pilot bioreactor run",
        kind: "bioreactor",
        sourceId: "test csv",
        contentText: [
          "time_h,batch_id,vcd_million_ml,glucose_g_l,lactate_mM,ammonium_mM,do_pct,kLa_h,cost_eur",
          "0,B-001,0.8,6.1,1.2,0.2,64,16,120",
          "24,B-001,2.5,4.8,4.9,0.7,58,16,140",
          "48,B-001,7.1,2.4,10.2,1.3,49,15,180",
        ].join("\n"),
      },
    });
    assert.equal(dataset.response.status, 201);
    assert.equal(dataset.payload.dataset.rowCount, 3);
    assert.ok(dataset.payload.dataset.schema.columns.some((column) => column.role === "oxygen_transfer"));
    assert.ok(dataset.payload.dataset.modelTargets.some((target) => /CFD|kLa|OUR/.test(target)));
    assert.ok(dataset.payload.dataset.modelPatchPreview.some((change) => change.key === "doSetpoint"));

    const teaDataset = await jsonFetch(server.baseUrl, "/api/datasets", {
      token,
      method: "POST",
      body: {
        projectId: created.payload.project.id,
        name: "Site material prices",
        kind: "tea",
        sourceId: "ERP export",
        contentText: [
          "item,unit_cost_eur,unit",
          "Basal media,18.50,L",
          "Feed supplement,142.00,L",
          "Protein A resin,11800,L",
        ].join("\n"),
      },
    });
    assert.equal(teaDataset.response.status, 201);

    const datasetApply = await jsonFetch(server.baseUrl, "/api/datasets/apply", {
      token,
      method: "POST",
      body: {
        projectId: created.payload.project.id,
        datasetIds: [dataset.payload.dataset.id, teaDataset.payload.dataset.id],
        modelState: {
          template: "culturedMeat",
          scale: "pilot",
          batchSize: 1000,
          titer: 8,
          recovery: 68,
          params: {
            glucose: 4,
            lactate: 2,
            ammonia: 2,
            doSetpoint: 40,
            kla: 65,
            mediaCostPerL: 42,
            feedSupplementCostPerL: 160,
            resinCostPerL: 9500,
          },
          units: [{ id: "BR-101" }],
          streams: [],
        },
      },
    });
    assert.equal(datasetApply.response.status, 200);
    assert.ok(datasetApply.payload.versionId);
    assert.equal(datasetApply.payload.rowsRegistered, 6);
    assert.equal(datasetApply.payload.appliedDatasets.length, 2);
    assert.ok(datasetApply.payload.changes.some((change) => change.key === "doSetpoint"));
    assert.ok(datasetApply.payload.modelState.plantDataBindings.some((binding) => binding.datasetId === dataset.payload.dataset.id));
    assert.equal(datasetApply.payload.modelState.params.doSetpoint, 58);
    assert.equal(datasetApply.payload.modelState.params.mediaCostPerL, 18.5);

    const datasetList = await jsonFetch(server.baseUrl, `/api/datasets?projectId=${created.payload.project.id}`, { token });
    assert.equal(datasetList.response.status, 200);
    assert.equal(datasetList.payload.datasets.length, 2);
    assert.ok(datasetList.payload.datasets.every((item) => item.appliedVersionId));

    const datasetExport = await jsonFetch(server.baseUrl, `/api/datasets/${dataset.payload.dataset.id}/export`, { token });
    assert.equal(datasetExport.response.status, 200);
    assert.equal(datasetExport.payload.dataset.id, dataset.payload.dataset.id);

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

    const cfdStatus = await jsonFetch(server.baseUrl, `/api/cfd/jobs/${cfd.payload.job.id}`, { token });
    assert.equal(cfdStatus.response.status, 200);
    assert.equal(cfdStatus.payload.job.id, cfd.payload.job.id);

    const exported = await jsonFetch(server.baseUrl, `/api/projects/${created.payload.project.id}/export`, { token });
    assert.equal(exported.response.status, 200);
    assert.equal(exported.payload.project.id, created.payload.project.id);
    assert.ok(Array.isArray(exported.payload.versions));
    assert.ok(Array.isArray(exported.payload.cfdJobs));

    const audit = await jsonFetch(server.baseUrl, "/api/audit?limit=20", { token });
    assert.equal(audit.response.status, 200);
    assert.ok(audit.payload.events.some((event) => event.type === "service.probe"));
    assert.ok(audit.payload.events.some((event) => event.type === "cfd.job.created"));

    const schema = await readFile(new URL("../supabase/schema.sql", import.meta.url), "utf8");
    assert.match(schema, /create table if not exists public\.axion_state/);
    assert.match(schema, /create table if not exists public\.axion_documents/);
    for (const kind of ["project_model", "project_version", "simulation_run", "dataset", "connector_run", "cfd_job", "command_plan"]) {
      assert.match(schema, new RegExp(`'${kind}'`));
    }
  } finally {
    await stopServer(server);
  }
});
