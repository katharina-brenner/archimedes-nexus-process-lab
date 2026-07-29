import { readFileSync, existsSync } from "node:fs";
import { createServer } from "node:http";
import { timingSafeEqual, randomUUID } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { assertPhysicalCommissioning, inspectSitePack } from "./site-pack.mjs";

const gatewayDir = dirname(fileURLToPath(import.meta.url));

function loadEnvFile() {
  const file = process.env.AUTOMATION_GATEWAY_ENV_FILE || join(gatewayDir, ".env");
  if (!existsSync(file)) return;
  readFileSync(file, "utf8").split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) return;
    const [key, ...rest] = trimmed.split("=");
    if (!process.env[key]) process.env[key] = rest.join("=").replace(/^["']|["']$/g, "");
  });
}

loadEnvFile();

const config = {
  host: process.env.HOST || "127.0.0.1",
  port: Number(process.env.PORT || 8921),
  token: process.env.AUTOMATION_GATEWAY_TOKEN || "axion-edge-local-token",
  writesEnabled: process.env.AUTOMATION_GATEWAY_WRITES_ENABLED === "true",
  tagMapPath: resolve(process.env.AUTOMATION_TAG_MAP || join(gatewayDir, "tag-map.json")),
  backendUrl: String(process.env.AXION_BACKEND_URL || "").replace(/\/+$/, ""),
  backendToken: process.env.AXION_AUTOMATION_INGEST_TOKEN || "",
  backendOwner: process.env.AXION_AUTOMATION_INGEST_OWNER || "",
  projectId: process.env.AXION_AUTOMATION_PROJECT_ID || "",
  connectionId: process.env.AXION_AUTOMATION_CONNECTION_ID || "",
  publishIntervalMs: Math.max(1000, Number(process.env.AUTOMATION_PUBLISH_INTERVAL_MS || 5000)),
  defaultKind: process.env.AUTOMATION_CONNECTION_KIND || "simulation",
  defaultEndpoint: process.env.AUTOMATION_CONNECTION_ENDPOINT || "axion://verified-simulator",
  securityMode: process.env.OPCUA_SECURITY_MODE || "SignAndEncrypt",
  securityPolicy: process.env.OPCUA_SECURITY_POLICY || "Basic256Sha256",
  certificateFile: process.env.OPCUA_CERTIFICATE_FILE || "",
  privateKeyFile: process.env.OPCUA_PRIVATE_KEY_FILE || "",
  trustedCertificatesDir: process.env.OPCUA_TRUSTED_CERTIFICATES_DIR || "",
  siteManifestPath: process.env.AUTOMATION_SITE_MANIFEST || "",
  approvalsManifestPath: process.env.AUTOMATION_APPROVALS_MANIFEST || "",
};

function safeCompare(leftValue, rightValue) {
  const left = Buffer.from(String(leftValue || ""));
  const right = Buffer.from(String(rightValue || ""));
  if (!left.length || left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function readTagMap() {
  const parsed = JSON.parse(readFileSync(config.tagMapPath, "utf8"));
  if (!Array.isArray(parsed.tags) || !parsed.tags.length) throw new Error("Tag map must contain at least one tag.");
  const seenTags = new Set();
  const seenNodes = new Set();
  parsed.tags.forEach((entry) => {
    if (!entry.tag || !entry.nodeId) throw new Error("Each tag-map entry requires tag and nodeId.");
    if (seenTags.has(entry.tag)) throw new Error(`Duplicate tag ${entry.tag}.`);
    if (seenNodes.has(entry.nodeId)) throw new Error(`Duplicate nodeId ${entry.nodeId}.`);
    seenTags.add(entry.tag);
    seenNodes.add(entry.nodeId);
  });
  return parsed;
}

const tagMap = readTagMap();
const tagByName = new Map(tagMap.tags.map((entry) => [entry.tag, entry]));
const simulatorOverrides = new Map();
const gatewayAudit = [];
const commissioning = inspectSitePack({
  manifestPath: config.siteManifestPath,
  approvalsPath: config.approvalsManifestPath,
  tagMap,
  certificateFile: config.certificateFile,
  privateKeyFile: config.privateKeyFile,
  trustedCertificatesDir: config.trustedCertificatesDir,
  configuredProjectId: config.projectId,
  configuredEndpoint: config.defaultEndpoint,
  writesEnabled: config.writesEnabled,
});

function json(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "content-length": Buffer.byteLength(body),
    "cache-control": "no-store",
  });
  res.end(body);
}

async function parseBody(req) {
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 1_000_000) throw new Error("Request body is too large.");
    chunks.push(chunk);
  }
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function bearer(req) {
  const header = req.headers.authorization || "";
  return header.startsWith("Bearer ") ? header.slice(7) : "";
}

function authorized(req) {
  return safeCompare(bearer(req), config.token);
}

function simulatorValue(tag, now = Date.now()) {
  if (simulatorOverrides.has(tag)) return simulatorOverrides.get(tag);
  const t = now / 1000;
  const phase = Math.floor((t / 18) % 6);
  const values = {
    "BR101.PV.DO": 40 + Math.sin(t / 4.8) * 5.6 + Math.sin(t / 1.7) * 1.2,
    "BR101.SP.DO": 40,
    "BR101.PV.PH": 7.08 + Math.sin(t / 9.5) * 0.045,
    "BR101.SP.PH": 7.1,
    "BR101.PV.TEMP": 36.96 + Math.sin(t / 12.5) * 0.12,
    "BR101.SP.TEMP": 37,
    "BR101.MV.AGITATION": 78 + Math.sin(t / 5.2) * 6,
    "BR101.MV.AIRFLOW": 0.35 + Math.sin(t / 6.4) * 0.04,
    "BR101.MV.FEED": phase < 2 ? 0 : 110 + Math.sin(t / 8) * 12,
    "BR101.MV.BASE": 24 + Math.sin(t / 9.5) * 4,
    "BR101.MV.JACKET": 48 + Math.sin(t / 12.5) * 3,
    "BR101.PV.LEVEL": 68 + phase * 1.7,
    "BR101.PV.PRESSURE": 0.24 + Math.sin(t / 7) * 0.025,
    "BR101.PV.AMMONIUM": 0.8 + phase * 0.19 + Math.sin(t / 20) * 0.06,
    "BR101.PV.LACTATE": 1.1 + phase * 0.14 + Math.sin(t / 16) * 0.09,
    "BATCH.PHASE": phase,
  };
  return values[tag] ?? 0;
}

function simulatorSnapshot() {
  const now = new Date().toISOString();
  return tagMap.tags.map((entry) => ({
    tag: entry.tag,
    value: simulatorValue(entry.tag),
    unit: entry.unit,
    quality: "Good",
    timestamp: now,
    nodeId: entry.nodeId,
  }));
}

async function opcuaModule() {
  try {
    return await import("node-opcua");
  } catch {
    throw new Error("The node-opcua runtime is not installed in the edge-gateway container.");
  }
}

function connectionOptions(body = {}) {
  return {
    kind: body.kind || config.defaultKind,
    endpoint: body.endpoint || config.defaultEndpoint,
    securityMode: body.securityMode || config.securityMode,
    securityPolicy: body.securityPolicy || config.securityPolicy,
    credential: body.credential || "",
  };
}

function userIdentity(opcua, credential) {
  if (!credential) return undefined;
  try {
    const parsed = typeof credential === "string" ? JSON.parse(credential) : credential;
    if (parsed.username && parsed.password) {
      return {
        type: opcua.UserTokenType.UserName,
        userName: String(parsed.username),
        password: String(parsed.password),
      };
    }
  } catch {
    return undefined;
  }
  return undefined;
}

async function withOpcuaSession(connection, action) {
  assertPhysicalCommissioning(commissioning);
  const opcua = await opcuaModule();
  if (!String(connection.endpoint).startsWith("opc.tcp://")) throw new Error("OPC UA endpoint must begin with opc.tcp://.");
  if (connection.securityMode !== "None" && (!config.certificateFile || !config.privateKeyFile)) {
    throw new Error("Signed OPC UA sessions require OPCUA_CERTIFICATE_FILE and OPCUA_PRIVATE_KEY_FILE.");
  }
  const client = opcua.OPCUAClient.create({
    applicationName: "Axion Automation Edge",
    endpointMustExist: true,
    connectionStrategy: { initialDelay: 500, maxRetry: 1 },
    securityMode: opcua.MessageSecurityMode[connection.securityMode] ?? opcua.MessageSecurityMode.SignAndEncrypt,
    securityPolicy: opcua.SecurityPolicy[connection.securityPolicy] ?? opcua.SecurityPolicy.Basic256Sha256,
    certificateFile: config.certificateFile || undefined,
    privateKeyFile: config.privateKeyFile || undefined,
  });
  await client.connect(connection.endpoint);
  try {
    const session = await client.createSession(userIdentity(opcua, connection.credential));
    try {
      return await action({ opcua, session });
    } finally {
      await session.close();
    }
  } finally {
    await client.disconnect();
  }
}

async function readSnapshot(connection) {
  if (connection.kind === "simulation") return simulatorSnapshot();
  if (connection.kind !== "opcua-edge") throw new Error(`${connection.kind} requires a site-specific read adapter.`);
  return withOpcuaSession(connection, async ({ opcua, session }) => {
    const values = await session.read(tagMap.tags.map((entry) => ({ nodeId: entry.nodeId, attributeId: opcua.AttributeIds.Value })));
    const timestamp = new Date().toISOString();
    return tagMap.tags.map((entry, index) => ({
      tag: entry.tag,
      value: Number(values[index]?.value?.value),
      unit: entry.unit,
      quality: values[index]?.statusCode?.isGood?.() ? "Good" : "Bad",
      timestamp: values[index]?.sourceTimestamp?.toISOString?.() || timestamp,
      nodeId: entry.nodeId,
    }));
  });
}

async function writeValue(connection, tag, value) {
  if (connection.kind === "simulation") {
    simulatorOverrides.set(tag.tag, value);
    return { acknowledgement: `sim-${randomUUID()}`, simulated: true };
  }
  if (connection.kind !== "opcua-edge") throw new Error(`${connection.kind} requires a site-specific write adapter.`);
  assertPhysicalCommissioning(commissioning, { forWrite: true });
  return withOpcuaSession(connection, async ({ opcua, session }) => {
    const status = await session.write({
      nodeId: tag.nodeId,
      attributeId: opcua.AttributeIds.Value,
      value: { value: new opcua.Variant({ dataType: opcua.DataType[tag.dataType] || opcua.DataType.Double, value }) },
    });
    if (!status?.isGood?.()) throw new Error(`OPC UA write rejected with ${String(status)}`);
    return { acknowledgement: String(status), simulated: false };
  });
}

async function testConnection(body) {
  const connection = connectionOptions(body);
  if (connection.kind === "simulation") {
    return {
      ok: true,
      status: "connected",
      detail: `Simulator returned ${tagMap.tags.length} quality-coded tags.`,
      tagCount: tagMap.tags.length,
      commissioning: {
        status: "simulator",
        readyForRead: true,
        readyForWrite: false,
        checks: [],
      },
    };
  }
  assertPhysicalCommissioning(commissioning);
  const samples = await readSnapshot(connection);
  const good = samples.filter((sample) => sample.quality === "Good").length;
  return {
    ok: good > 0,
    status: good > 0 ? "connected" : "bad-quality",
    detail: `${good}/${samples.length} mapped tags returned Good quality.`,
    tagCount: samples.length,
    commissioning,
  };
}

async function publishTelemetry() {
  if (!config.backendUrl || !config.backendToken || !config.backendOwner) return;
  try {
    const samples = await readSnapshot(connectionOptions());
    const response = await fetch(`${config.backendUrl}/api/automation/telemetry`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${config.backendToken}`,
        "content-type": "application/json",
        "x-axion-automation-owner": config.backendOwner,
      },
      body: JSON.stringify({
        projectId: config.projectId,
        connectionId: config.connectionId,
        samples,
      }),
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.error || `Axion ingest returned ${response.status}`);
    }
  } catch (error) {
    console.error(`Automation publish failed: ${error.message}`);
  }
}

async function publishCommissioningStatus() {
  if (!config.backendUrl || !config.backendToken || !config.backendOwner || !config.projectId || !config.connectionId) return;
  try {
    const response = await fetch(`${config.backendUrl}/api/automation/edge-status`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${config.backendToken}`,
        "content-type": "application/json",
        "x-axion-automation-owner": config.backendOwner,
      },
      body: JSON.stringify({
        projectId: config.projectId,
        connectionId: config.connectionId,
        commissioning,
        gateway: {
          mode: config.defaultKind,
          tagCount: tagMap.tags.length,
          writesEnabled: config.writesEnabled,
          reportedAt: new Date().toISOString(),
        },
      }),
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.error || `Axion edge-status ingest returned ${response.status}`);
    }
  } catch (error) {
    console.error(`Automation commissioning publish failed: ${error.message}`);
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  if (req.method === "GET" && url.pathname === "/health") {
    json(res, 200, {
      ok: true,
      service: "axion-automation-gateway",
      mode: config.defaultKind,
      tagCount: tagMap.tags.length,
      writesEnabled: config.writesEnabled,
      backendPublishing: Boolean(config.backendUrl && config.backendToken && config.backendOwner),
      commissioning: {
        status: config.defaultKind === "simulation" ? "simulator" : commissioning.status,
        readyForRead: config.defaultKind === "simulation" || commissioning.readyForRead,
        readyForWrite: config.defaultKind === "simulation" ? false : commissioning.readyForWrite,
      },
    });
    return;
  }
  if (!authorized(req)) {
    json(res, 401, { error: "Unauthorized edge-gateway request." });
    return;
  }
  try {
    if (req.method === "GET" && url.pathname === "/v1/tag-map") {
      json(res, 200, { ...tagMap, writesEnabled: config.writesEnabled, commissioning });
      return;
    }
    if (req.method === "GET" && url.pathname === "/v1/commissioning/status") {
      json(res, 200, commissioning);
      return;
    }
    if (req.method === "POST" && url.pathname === "/v1/connections/test") {
      const body = await parseBody(req);
      json(res, 200, await testConnection(body));
      return;
    }
    if (req.method === "POST" && url.pathname === "/v1/telemetry/snapshot") {
      const body = await parseBody(req);
      const samples = await readSnapshot(connectionOptions(body));
      json(res, 200, { samples, generatedAt: new Date().toISOString() });
      return;
    }
    if (req.method === "POST" && url.pathname === "/v1/write") {
      if (!config.writesEnabled) {
        json(res, 423, { error: "Physical writes are locked at the edge gateway." });
        return;
      }
      const body = await parseBody(req);
      const command = body.write || {};
      const tag = tagByName.get(String(command.tag || ""));
      const value = Number(command.value);
      if (!tag || !tag.writable) {
        json(res, 403, { error: "The requested tag is not on the writable allowlist." });
        return;
      }
      if (!Number.isFinite(value) || value < tag.min || value > tag.max) {
        json(res, 422, { error: `Value must remain inside ${tag.min}-${tag.max} ${tag.unit}.` });
        return;
      }
      if (!command.approvedBy || !command.reason) {
        json(res, 409, { error: "Every edge write requires approvedBy and reason." });
        return;
      }
      const result = await writeValue(connectionOptions(body.connection), tag, value);
      const audit = {
        id: randomUUID(),
        at: new Date().toISOString(),
        tag: tag.tag,
        nodeId: tag.nodeId,
        value,
        approvedBy: String(command.approvedBy).slice(0, 200),
        reason: String(command.reason).slice(0, 500),
        acknowledgement: result.acknowledgement,
        simulated: result.simulated,
      };
      gatewayAudit.unshift(audit);
      gatewayAudit.splice(2000);
      json(res, 200, { acknowledgement: result.acknowledgement, audit });
      return;
    }
    if (req.method === "GET" && url.pathname === "/v1/audit") {
      json(res, 200, { events: gatewayAudit.slice(0, 100) });
      return;
    }
    json(res, 404, { error: "Gateway route not found." });
  } catch (error) {
    json(res, 502, { error: String(error.message || error).slice(0, 800) });
  }
});

server.listen(config.port, config.host, () => {
  console.log(`Axion automation gateway running at http://${config.host}:${config.port}`);
  console.log(`Mode: ${config.defaultKind}; physical writes: ${config.writesEnabled ? "enabled" : "locked"}`);
});

if (config.backendUrl && config.backendToken && config.backendOwner) {
  const timer = setInterval(() => {
    publishCommissioningStatus();
    publishTelemetry();
  }, config.publishIntervalMs);
  timer.unref();
  publishCommissioningStatus();
  publishTelemetry();
}
