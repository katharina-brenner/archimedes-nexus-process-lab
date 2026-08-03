import assert from "node:assert/strict";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import test from "node:test";

const nodeBin = process.execPath;
const rootDir = new URL("..", import.meta.url).pathname;

async function startServer(extraEnv = {}) {
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
      AXION_AUTOMATION_INGEST_TOKEN: "automation-ingest-test-token",
      AXION_AUTOMATION_INGEST_OWNER: "owner",
      ...extraEnv,
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

async function startGitHubMock() {
  const manifest = {
    integrations: [
      { key: "company-lims", name: "Company LIMS", category: "Quality data", baseUrl: "https://api.company.test", auth: "OAuth 2.0", payloads: ["batches", "assays"], endpoints: ["GET /batches", "POST /assays"] },
      { key: "supplier-api", name: "Supplier API", category: "Economics", auth: "API key", payloads: ["quotes", "materials"] },
    ],
  };
  const server = createServer((req, res) => {
    res.setHeader("content-type", "application/json");
    if (req.url === "/repos/private-company/axion-apis") {
      res.end(JSON.stringify({ private: true, default_branch: "main" }));
      return;
    }
    if (req.url?.startsWith("/repos/private-company/axion-apis/contents/.axion/integrations.json")) {
      assert.equal(req.headers.authorization, "Bearer github_pat_test_secret_1234");
      res.end(JSON.stringify({ type: "file", encoding: "base64", content: Buffer.from(JSON.stringify(manifest)).toString("base64") }));
      return;
    }
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "Not Found" }));
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
}

async function startStripeMock() {
  const received = { checkout: null, portal: null };
  const server = createServer((req, res) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      const params = new URLSearchParams(Buffer.concat(chunks).toString("utf8"));
      res.setHeader("content-type", "application/json");
      if (req.method === "POST" && req.url === "/v1/checkout/sessions") {
        received.checkout = Object.fromEntries(params);
        res.end(JSON.stringify({
          id: "cs_test_axion_subscription",
          url: "https://checkout.stripe.test/cs_test_axion_subscription",
        }));
        return;
      }
      if (req.method === "GET" && req.url === "/v1/checkout/sessions/cs_test_axion_subscription") {
        res.end(JSON.stringify({
          id: "cs_test_axion_subscription",
          client_reference_id: received.checkout?.client_reference_id,
          metadata: { orderId: received.checkout?.["metadata[orderId]"] },
          payment_status: "paid",
          payment_intent: "pi_test_axion",
          customer: "cus_test_axion",
          subscription: "sub_test_axion",
        }));
        return;
      }
      if (req.method === "POST" && req.url === "/v1/billing_portal/sessions") {
        received.portal = Object.fromEntries(params);
        res.end(JSON.stringify({ url: "https://billing.stripe.test/session" }));
        return;
      }
      res.statusCode = 404;
      res.end(JSON.stringify({ error: { message: `Unhandled Stripe mock route ${req.method} ${req.url}` } }));
    });
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  return {
    baseUrl: `http://127.0.0.1:${address.port}`,
    received,
    close: () => new Promise((resolve) => server.close(resolve)),
  };
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
  const githubMock = await startGitHubMock();
  const server = await startServer({ GITHUB_API_BASE_URL: githubMock.baseUrl });
  try {
    const product = await jsonFetch(server.baseUrl, "/api/product");
    assert.equal(product.response.status, 200);
    assert.equal(product.response.headers.get("x-content-type-options"), "nosniff");
    assert.equal(product.response.headers.get("x-frame-options"), "DENY");
    assert.match(product.response.headers.get("content-security-policy"), /frame-ancestors 'none'/);
    assert.equal(product.payload.payments.provider, "setup_required");
    assert.equal(product.payload.payments.billingMode, "subscription");
    assert.equal(product.payload.payments.interval, "month");
    assert.equal(product.payload.plans.length, 4);
    assert.equal(product.payload.plans.find((plan) => plan.id === "professional").amount, 590);
    assert.match(product.payload.backend.currentStorage, /local JSON/);
    assert.equal(product.payload.backend.professionalReadinessEndpoint, "/api/professional-readiness");

    const health = await jsonFetch(server.baseUrl, "/api/health");
    assert.equal(health.response.status, 200);
    assert.equal(health.payload.ok, true);
    assert.equal(health.payload.storage, "local-json");

    const resourceDownload = await fetch(`${server.baseUrl}/resources/bioprocess-model-readiness-checklist.csv`);
    assert.equal(resourceDownload.status, 200);
    assert.match(resourceDownload.headers.get("content-type") || "", /^text\/csv/);
    assert.match(await resourceDownload.text(), /Mass balance/);

    const resourceLanding = await fetch(`${server.baseUrl}/resources`);
    assert.equal(resourceLanding.status, 200);
    assert.match(resourceLanding.headers.get("content-type") || "", /^text\/html/);
    assert.match(await resourceLanding.text(), /Build a process model that can survive technical review/);

    const sitemap = await fetch(`${server.baseUrl}/sitemap.xml`);
    assert.equal(sitemap.status, 200);
    assert.match(sitemap.headers.get("content-type") || "", /^application\/xml/);
    assert.match(await sitemap.text(), /bioprocess-simulation-software/);

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

    const pilotLead = await jsonFetch(server.baseUrl, "/api/leads/pilot", {
      method: "POST",
      body: {
        name: "Process Lead",
        email: "lead@example.com",
        company: "Example Biotech",
        role: "Director Process Development",
        process: "Biopharma / monoclonal antibodies",
        challenge: "Compare fed-batch and perfusion capacity with a shared downstream purification train.",
        consent: true,
        source: "backend-test",
      },
    });
    assert.equal(pilotLead.response.status, 201);
    assert.equal(pilotLead.payload.accepted, true);
    assert.match(pilotLead.payload.reference, /^PILOT-/);

    const engineeringBrief = await jsonFetch(server.baseUrl, "/api/leads/engineering-brief", {
      method: "POST",
      body: {
        email: "engineer@example.com",
        role: "MSAT / manufacturing",
        consent: true,
        source: "backend-test",
        campaign: "resource-center",
      },
    });
    assert.equal(engineeringBrief.response.status, 201);
    assert.equal(engineeringBrief.payload.accepted, true);
    assert.match(engineeringBrief.payload.reference, /^BRIEF-/);

    const login = await jsonFetch(server.baseUrl, "/api/auth/login", {
      method: "POST",
      body: { user: "owner", password: "owner-test-password" },
    });
    assert.equal(login.response.status, 200);
    const token = login.payload.token;
    assert.ok(token);

    const leads = await jsonFetch(server.baseUrl, "/api/admin/leads", { token });
    assert.equal(leads.response.status, 200);
    assert.equal(leads.payload.count, 2);
    assert.ok(leads.payload.leads.some((lead) => lead.company === "Example Biotech"));
    assert.ok(leads.payload.leads.some((lead) => lead.kind === "engineering-brief" && lead.email === "engineer@example.com"));
    assert.equal("requestFingerprint" in leads.payload.leads[0], false);

    const billingPortal = await jsonFetch(server.baseUrl, "/api/billing/portal", {
      token,
      method: "POST",
    });
    assert.equal(billingPortal.response.status, 503);
    assert.match(billingPortal.payload.error, /Stripe billing is not configured/);

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
    assert.ok(commandPlan.payload.commandPlan.plan.operations.some((operation) => operation.op === "setParam" && operation.key === "workingVolume" && operation.value === 70));

    const mediaCostPlan = await jsonFetch(server.baseUrl, "/api/commands/plan", {
      token,
      method: "POST",
      body: {
        prompt: "How can I reduce media cost by 20% without lowering viable cell density?",
        context: {
          template: "culturedMeat",
          scale: "pilot",
          params: { mediaCostPerL: 42, cellDensity: 18 },
          topLevel: { titer: 4.2, recovery: 74 },
        },
      },
    });
    assert.equal(mediaCostPlan.response.status, 201);
    assert.ok(mediaCostPlan.payload.commandPlan.plan.operations.some((operation) => operation.op === "setParam" && operation.key === "mediaCostPerL" && operation.value === 33.6));
    assert.ok(mediaCostPlan.payload.commandPlan.plan.operations.some((operation) => operation.op === "holdParam" && operation.key === "cellDensity" && operation.value === 18));

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

    const automationConnection = await jsonFetch(server.baseUrl, "/api/automation/connections", {
      token,
      method: "POST",
      body: {
        projectId: created.payload.project.id,
        name: "Verified test simulator",
        kind: "simulation",
        mode: "read-write",
      },
    });
    assert.equal(automationConnection.response.status, 201);
    assert.equal(automationConnection.payload.connection.status, "connected");
    assert.equal(automationConnection.payload.connection.writeEnabled, false);

    const automationConnectionTest = await jsonFetch(
      server.baseUrl,
      `/api/automation/connections/${automationConnection.payload.connection.id}/test`,
      { token, method: "POST" },
    );
    assert.equal(automationConnectionTest.response.status, 200);
    assert.equal(automationConnectionTest.payload.result.ok, true);

    const physicalConnection = await jsonFetch(server.baseUrl, "/api/automation/connections", {
      token,
      method: "POST",
      body: {
        projectId: created.payload.project.id,
        name: "Plant edge gateway",
        kind: "opcua-edge",
        endpoint: "opc.tcp://br101-ot.local:4840",
        mode: "read-only",
      },
    });
    assert.equal(physicalConnection.response.status, 201);

    const edgeStatus = await jsonFetch(server.baseUrl, "/api/automation/edge-status", {
      token: "automation-ingest-test-token",
      method: "POST",
      body: {
        projectId: created.payload.project.id,
        connectionId: physicalConnection.payload.connection.id,
        commissioning: {
          status: "read-only-ready",
          readyForRead: true,
          readyForWrite: false,
          siteId: "site-test",
          projectId: created.payload.project.id,
          tagCount: 16,
          certificatesInstalled: true,
          checks: [
            { key: "project", label: "Project binding", status: "pass", evidence: "Matched", required: true },
            { key: "documents", label: "Interlock / trip evidence", status: "pass", evidence: "4/4 approved", required: true },
          ],
        },
      },
    });
    assert.equal(edgeStatus.response.status, 201);
    assert.equal(edgeStatus.payload.commissioning.readyForRead, true);

    const automationState = await jsonFetch(
      server.baseUrl,
      `/api/automation/state?projectId=${created.payload.project.id}`,
      { token },
    );
    assert.equal(automationState.response.status, 200);
    assert.equal(automationState.payload.gateway.writesEnabled, false);
    assert.equal(automationState.payload.loops.length, 3);
    assert.ok(automationState.payload.latest.some((sample) => sample.tag === "BR101.PV.DO"));
    assert.equal(automationState.payload.tagMap.length, automationState.payload.tagDefinitions.length);
    assert.equal(automationState.payload.connections.find((item) => item.id === physicalConnection.payload.connection.id).status, "edge-ready");
    const doLoop = automationState.payload.loops.find((loop) => loop.key === "do-cascade");
    assert.ok(doLoop);

    const commissioning = await jsonFetch(server.baseUrl, "/api/automation/commissioning/run", {
      token,
      method: "POST",
      body: {
        projectId: created.payload.project.id,
        connectionId: automationConnection.payload.connection.id,
      },
    });
    assert.equal(commissioning.response.status, 201);
    assert.equal(commissioning.payload.run.status, "passed");
    assert.ok(commissioning.payload.run.checks.some((check) => check.key === "write-lock" && check.status === "pass"));
    assert.ok(commissioning.payload.run.checks.some((check) => check.key === "interlocks" && check.status === "not-applicable"));

    const machineTelemetry = await jsonFetch(server.baseUrl, "/api/automation/telemetry", {
      token: "automation-ingest-test-token",
      method: "POST",
      body: {
        projectId: created.payload.project.id,
        connectionId: automationConnection.payload.connection.id,
        samples: [
          { tag: "BR101.PV.PRESSURE", value: 0.28, unit: "bar(g)", quality: "Good", timestamp: new Date().toISOString() },
        ],
      },
    });
    assert.equal(machineTelemetry.response.status, 201);
    assert.equal(machineTelemetry.payload.accepted, 1);

    const blockedClosedLoop = await jsonFetch(
      server.baseUrl,
      `/api/automation/control-loops/${doLoop.id}`,
      {
        token,
        method: "POST",
        body: {
          projectId: created.payload.project.id,
          connectionId: automationConnection.payload.connection.id,
          mode: "closed-loop",
          approved: false,
        },
      },
    );
    assert.equal(blockedClosedLoop.response.status, 409);

    const advisoryLoop = await jsonFetch(
      server.baseUrl,
      `/api/automation/control-loops/${doLoop.id}`,
      {
        token,
        method: "POST",
        body: {
          connectionId: automationConnection.payload.connection.id,
          mode: "advisory",
          kp: 2.1,
          ki: 0.09,
          kd: 0.04,
          rateLimit: 6,
        },
      },
    );
    assert.equal(advisoryLoop.response.status, 200);
    assert.equal(advisoryLoop.payload.loop.mode, "advisory");

    const advisoryCycle = await jsonFetch(
      server.baseUrl,
      `/api/automation/control-loops/${doLoop.id}/cycle`,
      { token, method: "POST", body: {} },
    );
    assert.equal(advisoryCycle.response.status, 200);
    assert.equal(advisoryCycle.payload.action.execution, "recommendation");
    assert.ok(Number.isFinite(advisoryCycle.payload.action.proposedMv));
    assert.ok(Math.abs(advisoryCycle.payload.action.proposedMv - advisoryCycle.payload.action.currentMv) <= 6.0001);
    assert.match(advisoryCycle.payload.action.reason, /no command was written/i);

    const telemetryIngest = await jsonFetch(server.baseUrl, "/api/automation/telemetry", {
      token,
      method: "POST",
      body: {
        projectId: created.payload.project.id,
        connectionId: automationConnection.payload.connection.id,
        samples: [
          { tag: "BR101.PV.DO", value: 33.5, unit: "%", quality: "Good", timestamp: new Date().toISOString() },
          { tag: "BR101.PV.AMMONIUM", value: 1.7, unit: "mM", quality: "Good", timestamp: new Date().toISOString() },
        ],
      },
    });
    assert.equal(telemetryIngest.response.status, 201);
    assert.equal(telemetryIngest.payload.accepted, 2);
    assert.equal(telemetryIngest.payload.state.latest.find((sample) => sample.tag === "BR101.PV.DO").value, 33.5);

    const approvedSimulatorLoop = await jsonFetch(
      server.baseUrl,
      `/api/automation/control-loops/${doLoop.id}`,
      {
        token,
        method: "POST",
        body: {
          connectionId: automationConnection.payload.connection.id,
          mode: "closed-loop",
          approved: true,
        },
      },
    );
    assert.equal(approvedSimulatorLoop.response.status, 200);
    assert.equal(approvedSimulatorLoop.payload.loop.approvedBy, "owner");

    const simulatorCycle = await jsonFetch(
      server.baseUrl,
      `/api/automation/control-loops/${doLoop.id}/cycle`,
      { token, method: "POST", body: {} },
    );
    assert.equal(simulatorCycle.response.status, 200);
    assert.equal(simulatorCycle.payload.action.execution, "simulated-write");
    assert.match(simulatorCycle.payload.action.reason, /simulator only/i);

    const commandApply = await jsonFetch(server.baseUrl, `/api/commands/${commandPlan.payload.commandPlan.id}/apply`, {
      token,
      method: "POST",
      body: {
        projectId: created.payload.project.id,
        modelStateAfter: { template: "culturedMeat", scale: "pilot", params: { workingVolume: 70 }, units: [{ id: "BR-101" }], streams: [] },
        summary: { units: 1, streams: 0, command: "working volume 70" },
        changeLog: [{
          type: "parameter",
          where: "Bioreactor CFD · Working volume",
          what: "Working volume",
          field: "workingVolume",
          before: "72 %",
          after: "70 %",
          targetView: "cfd",
          targetId: "BR-101",
        }],
      },
    });
    assert.equal(commandApply.response.status, 200);
    assert.ok(commandApply.payload.versionId);
    assert.equal(commandApply.payload.changeLog[0].where, "Bioreactor CFD · Working volume");
    assert.equal(commandApply.payload.changeSet.summary.parameterChanges, 1);
    assert.equal(commandApply.payload.commandPlan.changeLog[0].after, "70 %");

    const projectWithHistory = await jsonFetch(server.baseUrl, `/api/projects/${created.payload.project.id}`, { token });
    assert.equal(projectWithHistory.response.status, 200);
    assert.ok(projectWithHistory.payload.branches.some((branch) => branch.name === "main"));
    assert.ok(projectWithHistory.payload.versions.some((version) => version.id === commandApply.payload.versionId));

    const branchCreated = await jsonFetch(server.baseUrl, `/api/projects/${created.payload.project.id}/branches`, {
      token,
      method: "POST",
      body: { name: "lower-media-cost" },
    });
    assert.equal(branchCreated.response.status, 201);
    assert.equal(branchCreated.payload.branch.name, "lower-media-cost");

    const branchCheckout = await jsonFetch(server.baseUrl, `/api/projects/${created.payload.project.id}/branches/${branchCreated.payload.branch.id}/checkout`, {
      token,
      method: "POST",
      body: {},
    });
    assert.equal(branchCheckout.response.status, 200);
    assert.equal(branchCheckout.payload.branch.name, "lower-media-cost");

    const branchSave = await jsonFetch(server.baseUrl, `/api/projects/${created.payload.project.id}/save`, {
      token,
      method: "POST",
      body: {
        name: "Backend smoke project",
        label: "Lower media scenario",
        modelState: { template: "culturedMeat", scale: "pilot", params: { workingVolume: 65, mediaCostPerL: 33.6 }, units: [{ id: "BR-101" }, { id: "T-201" }], streams: [] },
        summary: { units: 2, streams: 0, template: "culturedMeat", scale: "pilot" },
      },
    });
    assert.equal(branchSave.response.status, 200);

    const versionCompare = await jsonFetch(server.baseUrl, `/api/projects/${created.payload.project.id}/versions/compare`, {
      token,
      method: "POST",
      body: { baseVersionId: commandApply.payload.versionId, headVersionId: branchSave.payload.versionId },
    });
    assert.equal(versionCompare.response.status, 200);
    assert.ok(versionCompare.payload.diff.summary.parameterChanges >= 1);
    assert.ok(versionCompare.payload.diff.units.added.includes("T-201"));

    const mainBranch = projectWithHistory.payload.branches.find((branch) => branch.name === "main");
    const mainCheckout = await jsonFetch(server.baseUrl, `/api/projects/${created.payload.project.id}/branches/${mainBranch.id}/checkout`, {
      token,
      method: "POST",
      body: {},
    });
    assert.equal(mainCheckout.response.status, 200);
    assert.equal(mainCheckout.payload.branch.name, "main");
    assert.equal(mainCheckout.payload.model.modelState.params.workingVolume, 70);
    assert.equal(mainCheckout.payload.model.modelState.units.length, 1);

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

    const githubConnection = await jsonFetch(server.baseUrl, "/api/integrations/github/connect", {
      token,
      method: "POST",
      body: {
        repository: "private-company/axion-apis",
        ref: "main",
        manifestPath: ".axion/integrations.json",
        token: "github_pat_test_secret_1234",
      },
    });
    assert.equal(githubConnection.response.status, 201);
    assert.equal(githubConnection.payload.connection.status, "connected");
    assert.equal(githubConnection.payload.connection.tokenConfigured, true);
    assert.equal(githubConnection.payload.connection.tokenCiphertext, undefined);
    assert.equal(githubConnection.payload.integrations.length, 2);
    const customConnector = githubConnection.payload.integrations.find((item) => item.sourceKey === "company-lims");
    assert.ok(customConnector);

    const integrationList = await jsonFetch(server.baseUrl, "/api/integrations", { token });
    assert.equal(integrationList.response.status, 200);
    assert.ok(integrationList.payload.integrations.some((item) => item.key === customConnector.key));
    assert.equal(integrationList.payload.githubConnections.length, 1);

    const customConnectorTest = await jsonFetch(server.baseUrl, `/api/integrations/${encodeURIComponent(customConnector.key)}/actions`, {
      token,
      method: "POST",
      body: { action: "test", modelSnapshot: { projectName: "Backend smoke project", units: 18, streams: 20, equations: 230, scheduleRows: 8 } },
    });
    assert.equal(customConnectorTest.response.status, 200);
    assert.equal(customConnectorTest.payload.connector.repository, "private-company/axion-apis");
    assert.ok(customConnectorTest.payload.result.rows.some(([label]) => label === "GitHub source"));

    const githubResync = await jsonFetch(server.baseUrl, `/api/integrations/github/${githubConnection.payload.connection.id}/sync`, { token, method: "POST", body: {} });
    assert.equal(githubResync.response.status, 200);
    assert.equal(githubResync.payload.integrations.length, 2);

    const storedDatabase = await readFile(join(server.dataHome, "axion-licensing.json"), "utf8");
    assert.equal(storedDatabase.includes("github_pat_test_secret_1234"), false);

    const githubDisconnect = await jsonFetch(server.baseUrl, `/api/integrations/github/${githubConnection.payload.connection.id}`, { token, method: "DELETE" });
    assert.equal(githubDisconnect.response.status, 200);
    const integrationsAfterDisconnect = await jsonFetch(server.baseUrl, "/api/integrations", { token });
    assert.equal(integrationsAfterDisconnect.payload.githubConnections.length, 0);
    assert.equal(integrationsAfterDisconnect.payload.integrations.some((item) => item.key === customConnector.key), false);

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

    const audit = await jsonFetch(server.baseUrl, "/api/audit?limit=100", { token });
    assert.equal(audit.response.status, 200);
    assert.ok(audit.payload.events.some((event) => event.type === "service.probe"));
    assert.ok(audit.payload.events.some((event) => event.type === "cfd.job.created"));

    const schema = await readFile(new URL("../supabase/schema.sql", import.meta.url), "utf8");
    assert.match(schema, /create table if not exists public\.axion_state/);
    assert.match(schema, /create table if not exists public\.axion_documents/);
    for (const table of ["axion_customers", "axion_contracts", "axion_customer_users", "axion_plan_entitlements", "axion_entitlement_overrides", "axion_subscription_events"]) {
      assert.match(schema, new RegExp(`create table if not exists public\\.${table}`));
    }
    assert.match(schema, /revoke all on table public\.axion_state[\s\S]*from anon, authenticated/);
    assert.match(schema, /grant select, insert, update, delete[\s\S]*to service_role/);
    for (const kind of ["project_model", "project_version", "simulation_run", "dataset", "connector_run", "cfd_job", "command_plan"]) {
      assert.match(schema, new RegExp(`'${kind}'`));
    }
  } finally {
    await stopServer(server);
    await githubMock.close();
  }
});

test("Stripe subscription checkout activates access and opens the billing portal", async () => {
  const stripeMock = await startStripeMock();
  const server = await startServer({
    STRIPE_API_BASE_URL: stripeMock.baseUrl,
    STRIPE_SECRET_KEY: "sk_test_axion",
    STRIPE_PRICE_TEAM_ID: "price_test_team_monthly",
    STRIPE_WEBHOOK_SECRET: "whsec_test_axion",
    AXION_BILLING_MODE: "subscription",
  });
  try {
    const checkout = await jsonFetch(server.baseUrl, "/api/checkout", {
      method: "POST",
      body: {
        customerName: "Paid Test User",
        customerEmail: "paid@example.com",
        company: "Axion Test",
        planId: "team",
      },
    });
    assert.equal(checkout.response.status, 201);
    assert.equal(checkout.payload.payment.billingMode, "subscription");
    assert.equal(checkout.payload.payment.interval, "month");
    assert.equal(checkout.payload.payment.plan.id, "team");
    assert.equal(checkout.payload.order.amount, 2490);
    assert.equal(stripeMock.received.checkout.mode, "subscription");
    assert.equal(stripeMock.received.checkout["line_items[0][price]"], "price_test_team_monthly");
    assert.equal(stripeMock.received.checkout["automatic_payment_methods[enabled]"], undefined);
    assert.equal(stripeMock.received.checkout.billing_address_collection, "required");
    assert.equal(stripeMock.received.checkout["tax_id_collection[enabled]"], "true");

    const checkoutStatus = await jsonFetch(server.baseUrl, "/api/checkout/session/cs_test_axion_subscription");
    assert.equal(checkoutStatus.response.status, 200);
    assert.equal(checkoutStatus.payload.paid, true);
    assert.ok(checkoutStatus.payload.licenseKey);

    const paidLogin = await jsonFetch(server.baseUrl, "/api/auth/login", {
      method: "POST",
      body: {
        user: "paid@example.com",
        password: checkoutStatus.payload.licenseKey,
        licenseKey: checkoutStatus.payload.licenseKey,
      },
    });
    assert.equal(paidLogin.response.status, 200);
    assert.equal(paidLogin.payload.account.billing.stripeCustomerId, "cus_test_axion");
    assert.equal(paidLogin.payload.account.billing.billingPortalAvailable, true);
    assert.match(paidLogin.payload.account.billing.customerNumber, /^AX-C-[A-F0-9]{10}$/);
    assert.match(paidLogin.payload.account.billing.contractNumber, /^AX-K-[A-F0-9]{10}$/);
    assert.equal(paidLogin.payload.account.entitlements.features.collaboration.enabled, true);
    assert.equal(paidLogin.payload.account.entitlements.features.api_connectors.enabled, true);
    assert.equal(paidLogin.payload.account.entitlements.features.cfd_worker_jobs.enabled, false);

    const account = await jsonFetch(server.baseUrl, "/api/account", { token: paidLogin.payload.token });
    assert.equal(account.response.status, 200);
    assert.equal(account.payload.account.billing.customerNumber, paidLogin.payload.account.billing.customerNumber);
    assert.equal(account.payload.account.billing.contractNumber, paidLogin.payload.account.billing.contractNumber);

    const portal = await jsonFetch(server.baseUrl, "/api/billing/portal", {
      token: paidLogin.payload.token,
      method: "POST",
    });
    assert.equal(portal.response.status, 201);
    assert.equal(portal.payload.url, "https://billing.stripe.test/session");
    assert.equal(stripeMock.received.portal.customer, "cus_test_axion");
  } finally {
    await stopServer(server);
    await stripeMock.close();
  }
});

test("subscription entitlements block functions outside the contracted plan", async () => {
  const stripeMock = await startStripeMock();
  const server = await startServer({
    STRIPE_API_BASE_URL: stripeMock.baseUrl,
    STRIPE_SECRET_KEY: "sk_test_axion",
    STRIPE_WEBHOOK_SECRET: "whsec_test_axion",
    AXION_BILLING_MODE: "subscription",
  });
  try {
    const checkout = await jsonFetch(server.baseUrl, "/api/checkout", {
      method: "POST",
      body: { customerName: "Research User", customerEmail: "research@example.com", company: "Research Lab", planId: "academic" },
    });
    assert.equal(checkout.response.status, 201);
    const status = await jsonFetch(server.baseUrl, `/api/checkout/session/${checkout.payload.payment.sessionId}`);
    const login = await jsonFetch(server.baseUrl, "/api/auth/login", {
      method: "POST",
      body: { user: "research@example.com", password: status.payload.licenseKey, licenseKey: status.payload.licenseKey },
    });
    assert.equal(login.response.status, 200);
    assert.equal(login.payload.account.entitlements.features.dynamic_simulation.enabled, true);
    assert.equal(login.payload.account.entitlements.features.cfd_screening.enabled, false);

    const blocked = await jsonFetch(server.baseUrl, "/api/cfd/jobs", {
      token: login.payload.token,
      method: "POST",
      body: { volumeL: 2000 },
    });
    assert.equal(blocked.response.status, 403);
    assert.equal(blocked.payload.code, "FEATURE_NOT_INCLUDED");
    assert.equal(blocked.payload.requiredPlan, "professional");
  } finally {
    await stopServer(server);
    await stripeMock.close();
  }
});

test("production static routes fall back to the app when a public directory shares the route name", async () => {
  const staticHome = await mkdtemp(join(tmpdir(), "axion-static-test-"));
  await mkdir(join(staticHome, "resources"));
  await writeFile(join(staticHome, "index.html"), "<!doctype html><html><head><title>Axion</title></head><body><main id=\"publicResources\">Resource center</main></body></html>");
  await writeFile(join(staticHome, "resources", "checklist.csv"), "field,value\nstatus,ready\n");
  const server = await startServer({ AXION_STATIC_DIR: staticHome, NODE_ENV: "production" });
  try {
    const resourcePage = await fetch(`${server.baseUrl}/resources`);
    assert.equal(resourcePage.status, 200);
    assert.match(resourcePage.headers.get("content-type"), /text\/html/);
    assert.match(await resourcePage.text(), /Resource center/);

    const resourceFile = await fetch(`${server.baseUrl}/resources/checklist.csv`);
    assert.equal(resourceFile.status, 200);
    assert.match(resourceFile.headers.get("content-type"), /text\/csv/);
    assert.match(await resourceFile.text(), /status,ready/);
  } finally {
    await stopServer(server);
    await rm(staticHome, { recursive: true, force: true });
  }
});
