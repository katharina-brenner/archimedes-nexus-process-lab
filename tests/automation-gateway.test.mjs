import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import test from "node:test";

const nodeBin = process.execPath;
const rootDir = new URL("..", import.meta.url).pathname;

async function startGateway({ writesEnabled = false, kind = "simulation" } = {}) {
  const port = 10400 + Math.floor(Math.random() * 500);
  const token = `gateway-test-${port}`;
  const child = spawn(nodeBin, ["automation-gateway/server.mjs"], {
    cwd: rootDir,
    env: {
      ...process.env,
      HOST: "127.0.0.1",
      PORT: String(port),
      AUTOMATION_GATEWAY_TOKEN: token,
      AUTOMATION_GATEWAY_WRITES_ENABLED: writesEnabled ? "true" : "false",
      AUTOMATION_CONNECTION_KIND: kind,
      AUTOMATION_CONNECTION_ENDPOINT: kind === "simulation" ? "axion://verified-simulator" : "opc.tcp://approved-plant.local:4840",
      AUTOMATION_SITE_MANIFEST: "",
      AUTOMATION_APPROVALS_MANIFEST: "",
      AXION_BACKEND_URL: "",
      AXION_AUTOMATION_INGEST_TOKEN: "",
      AXION_AUTOMATION_INGEST_OWNER: "",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let logs = "";
  child.stdout.on("data", (chunk) => { logs += chunk.toString(); });
  child.stderr.on("data", (chunk) => { logs += chunk.toString(); });
  const baseUrl = `http://127.0.0.1:${port}`;
  const deadline = Date.now() + 6000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseUrl}/health`);
      if (response.ok) return { child, baseUrl, token, logs: () => logs };
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  child.kill("SIGKILL");
  throw new Error(`Gateway did not start:\n${logs}`);
}

async function stopGateway(gateway) {
  gateway.child.kill("SIGTERM");
  await new Promise((resolve) => gateway.child.once("exit", resolve));
}

async function gatewayFetch(gateway, pathname, { method = "GET", body, token = gateway.token } = {}) {
  const response = await fetch(`${gateway.baseUrl}${pathname}`, {
    method,
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return { response, payload: await response.json().catch(() => ({})) };
}

test("automation edge gateway enforces auth, tag map, write lock, limits and audit", async () => {
  const locked = await startGateway();
  try {
    const health = await fetch(`${locked.baseUrl}/health`);
    const healthPayload = await health.json();
    assert.equal(health.status, 200);
    assert.equal(healthPayload.writesEnabled, false);
    assert.equal(healthPayload.tagCount, 16);

    const unauthorized = await gatewayFetch(locked, "/v1/tag-map", { token: "wrong-token" });
    assert.equal(unauthorized.response.status, 401);

    const connection = await gatewayFetch(locked, "/v1/connections/test", {
      method: "POST",
      body: { kind: "simulation" },
    });
    assert.equal(connection.response.status, 200);
    assert.equal(connection.payload.ok, true);
    assert.equal(connection.payload.tagCount, 16);

    const commissioning = await gatewayFetch(locked, "/v1/commissioning/status");
    assert.equal(commissioning.response.status, 200);
    assert.equal(commissioning.payload.status, "blocked");
    assert.equal(commissioning.payload.readyForRead, false);

    const snapshot = await gatewayFetch(locked, "/v1/telemetry/snapshot", {
      method: "POST",
      body: { kind: "simulation" },
    });
    assert.equal(snapshot.response.status, 200);
    assert.equal(snapshot.payload.samples.length, 16);
    assert.ok(snapshot.payload.samples.every((sample) => sample.quality === "Good"));

    const blockedWrite = await gatewayFetch(locked, "/v1/write", {
      method: "POST",
      body: {
        connection: { kind: "simulation" },
        write: { tag: "BR101.MV.AGITATION", value: 90, approvedBy: "test engineer", reason: "FAT test" },
      },
    });
    assert.equal(blockedWrite.response.status, 423);
  } finally {
    await stopGateway(locked);
  }

  const enabled = await startGateway({ writesEnabled: true });
  try {
    const readOnlyTag = await gatewayFetch(enabled, "/v1/write", {
      method: "POST",
      body: {
        connection: { kind: "simulation" },
        write: { tag: "BR101.PV.DO", value: 50, approvedBy: "test engineer", reason: "Must be blocked" },
      },
    });
    assert.equal(readOnlyTag.response.status, 403);

    const outsideRange = await gatewayFetch(enabled, "/v1/write", {
      method: "POST",
      body: {
        connection: { kind: "simulation" },
        write: { tag: "BR101.MV.AGITATION", value: 900, approvedBy: "test engineer", reason: "Must be blocked" },
      },
    });
    assert.equal(outsideRange.response.status, 422);

    const missingApproval = await gatewayFetch(enabled, "/v1/write", {
      method: "POST",
      body: {
        connection: { kind: "simulation" },
        write: { tag: "BR101.MV.AGITATION", value: 90 },
      },
    });
    assert.equal(missingApproval.response.status, 409);

    const accepted = await gatewayFetch(enabled, "/v1/write", {
      method: "POST",
      body: {
        connection: { kind: "simulation" },
        write: { tag: "BR101.MV.AGITATION", value: 90, approvedBy: "test engineer", reason: "Verified simulator FAT" },
      },
    });
    assert.equal(accepted.response.status, 200);
    assert.equal(accepted.payload.audit.simulated, true);

    const snapshot = await gatewayFetch(enabled, "/v1/telemetry/snapshot", {
      method: "POST",
      body: { kind: "simulation" },
    });
    assert.equal(snapshot.payload.samples.find((sample) => sample.tag === "BR101.MV.AGITATION").value, 90);

    const audit = await gatewayFetch(enabled, "/v1/audit");
    assert.equal(audit.response.status, 200);
    assert.equal(audit.payload.events.length, 1);
    assert.equal(audit.payload.events[0].approvedBy, "test engineer");
  } finally {
    await stopGateway(enabled);
  }
});

test("physical OPC UA is blocked before network access when the controlled site pack is absent", async () => {
  const gateway = await startGateway({ kind: "opcua-edge" });
  try {
    const health = await fetch(`${gateway.baseUrl}/health`).then((response) => response.json());
    assert.equal(health.commissioning.status, "blocked");
    assert.equal(health.commissioning.readyForRead, false);

    const result = await gatewayFetch(gateway, "/v1/connections/test", {
      method: "POST",
      body: {
        kind: "opcua-edge",
        endpoint: "opc.tcp://approved-plant.local:4840",
        securityMode: "SignAndEncrypt",
      },
    });
    assert.equal(result.response.status, 502);
    assert.match(result.payload.error, /commissioning gate/i);
    assert.match(result.payload.error, /Site manifest/i);
  } finally {
    await stopGateway(gateway);
  }
});
