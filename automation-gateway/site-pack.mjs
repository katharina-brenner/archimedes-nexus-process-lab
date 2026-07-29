import { existsSync, readFileSync, statSync } from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";

const REQUIRED_DOCUMENTS = ["cause-and-effect", "interlock-matrix", "trip-test", "rollback-plan"];
const REQUIRED_SIGNOFFS = ["site-automation-owner", "process-safety-owner", "quality-owner", "cybersecurity-owner"];
const SHA256_PATTERN = /^sha256:[a-f0-9]{64}$/i;

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function resolvedFrom(baseFile, value) {
  if (!value) return "";
  return isAbsolute(value) ? value : resolve(dirname(baseFile), value);
}

function validApproval(value) {
  return Boolean(value?.approved && value.approvedBy && !Number.isNaN(Date.parse(value.approvedAt || "")));
}

function directoryExists(path) {
  try {
    return Boolean(path && existsSync(path) && statSync(path).isDirectory());
  } catch {
    return false;
  }
}

function check(key, label, pass, evidence, required = true) {
  return { key, label, status: pass ? "pass" : "blocked", evidence, required };
}

function isPlaceholder(value) {
  return !value || /REPLACE|EXAMPLE|CHANGEME/i.test(String(value));
}

export function isTemplateNodeId(entry) {
  const nodeId = String(entry?.nodeId || "");
  const tag = String(entry?.tag || "");
  return !nodeId
    || /replace|template|example/i.test(nodeId)
    || nodeId === `ns=2;s=${tag}`;
}

export function inspectSitePack({
  manifestPath = "",
  approvalsPath = "",
  tagMap = { tags: [] },
  certificateFile = "",
  privateKeyFile = "",
  trustedCertificatesDir = "",
  configuredProjectId = "",
  configuredEndpoint = "",
  writesEnabled = false,
} = {}) {
  let manifest = null;
  let approvals = null;
  let parseError = "";
  try {
    if (manifestPath && existsSync(manifestPath)) {
      manifest = readJson(manifestPath);
      const approvalFile = approvalsPath
        || resolvedFrom(manifestPath, manifest.approvalsManifest || "approvals.json");
      if (approvalFile && existsSync(approvalFile)) approvals = readJson(approvalFile);
    }
  } catch (error) {
    parseError = String(error.message || error);
  }

  const endpoint = String(manifest?.opcua?.endpoint || "");
  const projectId = String(manifest?.projectId || "");
  const targetZone = String(manifest?.network?.gatewayZone || "");
  const documentKinds = new Set((approvals?.documents || [])
    .filter((item) => item.id && item.revision && SHA256_PATTERN.test(String(item.sha256 || "")))
    .map((item) => item.kind));
  const approvedRoles = new Set((approvals?.signoffs || [])
    .filter(validApproval)
    .map((item) => item.role));
  const realNodes = (tagMap.tags || []).filter((entry) => !isTemplateNodeId(entry));
  const certPath = certificateFile || resolvedFrom(manifestPath, manifest?.certificates?.clientCertificate);
  const keyPath = privateKeyFile || resolvedFrom(manifestPath, manifest?.certificates?.privateKey);
  const trustPath = trustedCertificatesDir || resolvedFrom(manifestPath, manifest?.certificates?.trustedServerCertificatesDir);
  const certReady = Boolean(certPath && existsSync(certPath));
  const keyReady = Boolean(keyPath && existsSync(keyPath));
  const trustReady = directoryExists(trustPath);

  const checks = [
    check("manifest", "Site manifest", Boolean(manifest) && !parseError, parseError || (manifest ? "Site manifest parsed." : "AUTOMATION_SITE_MANIFEST is missing.")),
    check("project", "Project binding", Boolean(!isPlaceholder(projectId) && !isPlaceholder(configuredProjectId) && projectId === configuredProjectId), projectId && configuredProjectId ? `${projectId === configuredProjectId && !isPlaceholder(projectId) ? "Matched" : "Pending/mismatch"}: ${projectId}` : "Plant project ID and gateway project ID are required."),
    check("endpoint", "Approved OPC UA endpoint", Boolean(endpoint.startsWith("opc.tcp://") && !isPlaceholder(endpoint) && endpoint === configuredEndpoint), endpoint ? `${endpoint === configuredEndpoint && !isPlaceholder(endpoint) ? "Matched" : "Pending/mismatch"}: ${endpoint}` : "No approved opc.tcp:// endpoint in the site manifest."),
    check("network", "OT / Industrial DMZ placement", /(^|[\s/-])(ot|industrial dmz)([\s/-]|$)/i.test(targetZone) && manifest?.network?.publicInbound === false, targetZone ? `${targetZone}; public inbound ${manifest?.network?.publicInbound ? "enabled" : "disabled"}.` : "Gateway zone is not declared."),
    check("security", "OPC UA message security", manifest?.opcua?.securityMode === "SignAndEncrypt" && manifest?.opcua?.securityPolicy === "Basic256Sha256", `${manifest?.opcua?.securityMode || "missing"} / ${manifest?.opcua?.securityPolicy || "missing"}.`),
    check("nodes", "Reviewed plant Node IDs", realNodes.length === (tagMap.tags || []).length && realNodes.length > 0, `${realNodes.length}/${(tagMap.tags || []).length} mappings are non-template Node IDs.`),
    check("certificate", "Client certificate and private key", certReady && keyReady, `${certReady ? "Certificate installed" : "Certificate missing"}; ${keyReady ? "private key installed" : "private key missing"}.`),
    check("trust", "Server trust list", trustReady, trustReady ? "Trusted-server certificate directory installed." : "Trusted-server certificate directory missing."),
    check("documents", "Interlock / trip evidence", REQUIRED_DOCUMENTS.every((kind) => documentKinds.has(kind)), `${documentKinds.size}/${REQUIRED_DOCUMENTS.length} required controlled documents have revision and SHA-256 evidence.`),
    check("signoffs", "Cross-functional release", REQUIRED_SIGNOFFS.every((role) => approvedRoles.has(role)), `${approvedRoles.size}/${REQUIRED_SIGNOFFS.length} required roles approved.`),
    check("read-release", "Read-only commissioning release", validApproval(approvals?.readOnlyRelease), validApproval(approvals?.readOnlyRelease) ? "Read-only FAT/SAT release approved." : "Read-only FAT/SAT release is not approved."),
  ];

  const readyForRead = checks.every((item) => !item.required || item.status === "pass");
  const writeRelease = validApproval(approvals?.writeRelease);
  checks.push(check(
    "write-release",
    "Physical write release",
    writeRelease,
    writeRelease ? "Controlled write release approved." : "Physical writes remain unapproved.",
    false,
  ));
  const readyForWrite = readyForRead && writeRelease && writesEnabled;

  return {
    status: readyForWrite ? "write-ready" : readyForRead ? "read-only-ready" : "blocked",
    readyForRead,
    readyForWrite,
    siteId: String(manifest?.siteId || ""),
    projectId,
    manifestConfigured: Boolean(manifest),
    tagCount: (tagMap.tags || []).length,
    certificatesInstalled: certReady && keyReady && trustReady,
    writeReleaseApproved: writeRelease,
    checks,
  };
}

export function assertPhysicalCommissioning(status, { forWrite = false } = {}) {
  const allowed = forWrite ? status.readyForWrite : status.readyForRead;
  if (allowed) return;
  const blocking = status.checks.filter((item) => item.required && item.status !== "pass");
  const detail = blocking.map((item) => item.label).join(", ");
  throw new Error(`Physical OPC UA ${forWrite ? "write" : "connection"} blocked by commissioning gate: ${detail || "site approval missing"}.`);
}
