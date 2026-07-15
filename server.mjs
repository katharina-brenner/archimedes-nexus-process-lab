import { createHash, createHmac, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { createReadStream, existsSync, readFileSync } from "node:fs";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));
const dataDir = join(rootDir, ".data");
const dbPath = join(dataDir, "axion-licensing.json");
const modelsDir = join(dataDir, "models");
const projectsDir = join(modelsDir, "projects");
const archiveDir = join(modelsDir, "archive");

function loadLocalEnv() {
  const envPath = join(rootDir, ".env");
  if (!existsSync(envPath)) return;
  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) return;
    const [key, ...valueParts] = trimmed.split("=");
    if (process.env[key]) return;
    process.env[key] = valueParts.join("=").replace(/^["']|["']$/g, "");
  });
}

loadLocalEnv();

const config = {
  host: process.env.HOST || "127.0.0.1",
  port: Number(process.env.PORT || 8899),
  productName: process.env.PRODUCT_NAME || "Axion Process OS",
  priceCents: Number(process.env.AXION_PRICE_CENTS || 72500),
  currency: process.env.AXION_CURRENCY || "EUR",
  sessionSecret: process.env.SESSION_SECRET || "axion-local-dev-secret",
  adminUser: (process.env.AXION_ADMIN_USER || "owner").toLowerCase(),
  adminPassword: process.env.AXION_ADMIN_PASSWORD || "",
  localPasswordLogin: process.env.AXION_LOCAL_PASSWORD_LOGIN === "true",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleAllowedEmails: (process.env.GOOGLE_ALLOWED_EMAILS || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean),
  googleAllowedDomains: (process.env.GOOGLE_ALLOWED_DOMAINS || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean),
  bank: {
    accountHolder: process.env.BANK_ACCOUNT_HOLDER || "",
    iban: process.env.BANK_IBAN || "",
    bic: process.env.BANK_BIC || "",
    bankName: process.env.BANK_NAME || "",
  },
};

const staticTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".ico", "image/x-icon"],
]);

const defaultDb = {
  users: [],
  orders: [],
  licenses: [],
  projects: [],
  projectVersions: [],
  invites: [],
  projectBriefs: [],
  audit: [],
};

function backendFeatures() {
  return [
    "725 EUR professional license checkout",
    "Bank-transfer order references",
    "Manual paid-status activation after incoming transfer",
    "License-key generation",
    "Server-side login tokens",
    "Google OAuth login with backend token verification",
    "Multi-user project workspaces",
    "Project archives for old model versions",
    "Username/email invitations for collaboration",
    "External integration registry for modelling and data tools",
    "Admin order and license listing",
    "Static app hosting from the same backend",
    "Bank account configuration via environment variables",
  ];
}

function safeCompare(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

function publicConfig() {
  const amount = config.priceCents / 100;
  return {
    productName: config.productName,
    amount,
    amountFormatted: new Intl.NumberFormat("de-DE", { style: "currency", currency: config.currency }).format(amount),
    currency: config.currency,
    bankConfigured: Boolean(config.bank.accountHolder && config.bank.iban),
    bank: {
      accountHolder: config.bank.accountHolder || "Configure BANK_ACCOUNT_HOLDER",
      iban: config.bank.iban || "Configure BANK_IBAN",
      bic: config.bank.bic || "Configure BANK_BIC",
      bankName: config.bank.bankName || "Configure BANK_NAME",
    },
    features: backendFeatures(),
    auth: {
      googleEnabled: Boolean(config.googleClientId),
    },
  };
}

async function loadDb() {
  await mkdir(dataDir, { recursive: true });
  await mkdir(projectsDir, { recursive: true });
  await mkdir(archiveDir, { recursive: true });
  if (!existsSync(dbPath)) {
    const seeded = ensureDbShape(structuredClone(defaultDb));
    await writeFile(dbPath, JSON.stringify(seeded, null, 2));
    return seeded;
  }
  return ensureDbShape(JSON.parse(await readFile(dbPath, "utf8")));
}

async function saveDb(db) {
  await mkdir(dataDir, { recursive: true });
  await mkdir(projectsDir, { recursive: true });
  await mkdir(archiveDir, { recursive: true });
  await writeFile(dbPath, `${JSON.stringify(db, null, 2)}\n`);
}

function json(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  });
  res.end(body);
}

function parseBody(req) {
  return new Promise((resolveBody, rejectBody) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        rejectBody(new Error("Payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!body) {
        resolveBody({});
        return;
      }
      try {
        resolveBody(JSON.parse(body));
      } catch {
        rejectBody(new Error("Invalid JSON"));
      }
    });
  });
}

function signSession(payload) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", config.sessionSecret).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

function verifySession(token) {
  if (!token || !token.includes(".")) return null;
  const [encoded, signature] = token.split(".");
  const expected = createHmac("sha256", config.sessionSecret).update(encoded).digest("base64url");
  if (!safeCompare(signature, expected)) return null;
  const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8"));
  if (payload.exp && payload.exp < Date.now()) return null;
  return payload;
}

function getBearer(req) {
  const header = req.headers.authorization || "";
  return header.startsWith("Bearer ") ? header.slice(7) : "";
}

function makeReference() {
  return `AXION-${randomBytes(3).toString("hex").toUpperCase()}-${randomBytes(2).toString("hex").toUpperCase()}`;
}

function makeLicenseKey() {
  return `ARX-${randomBytes(3).toString("hex").toUpperCase()}-${randomBytes(3).toString("hex").toUpperCase()}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

function userPasswordHash(password) {
  return createHash("sha256").update(`${config.sessionSecret}:${password}`).digest("hex");
}

function normalizePrincipal(value) {
  return String(value || "").trim().toLowerCase();
}

function seedUsers(db) {
  const seeds = [
    { username: "kbrenner", email: "kbrenner@local.axion", name: "Workspace Owner", password: "0105", role: "admin" },
    { username: "mahmed", email: "mahmed@local.axion", name: "M. Ahmed", password: "1402", role: "user" },
  ];
  seeds.forEach((seed) => {
    const existing = db.users.find((user) => user.username === seed.username || user.email === seed.email);
    if (existing) return;
    db.users.push({
      id: randomUUID(),
      username: seed.username,
      email: seed.email,
      name: seed.name,
      role: seed.role,
      passwordHash: userPasswordHash(seed.password),
      createdAt: new Date().toISOString(),
      status: "active",
    });
  });
}

function sanitizeUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
    role: user.role,
    status: user.status,
  };
}

function sessionPrincipal(session) {
  return normalizePrincipal(session?.email || session?.username || session?.sub || session?.licenseKey || "unknown");
}

function sessionDisplayName(session) {
  return session?.name || session?.username || session?.email || session?.sub || "Axion user";
}

function projectFilePath(projectId) {
  return join(projectsDir, `${projectId}.json`);
}

function versionFilePath(projectId, versionId) {
  return join(archiveDir, `${projectId}-${versionId}.json`);
}

function canAccessProject(session, project) {
  if (!session || !project) return false;
  if (session.role === "admin") return true;
  const principal = sessionPrincipal(session);
  return project.owner === principal || project.collaborators?.some((item) => normalizePrincipal(item.principal) === principal);
}

function sanitizeProject(project) {
  return {
    id: project.id,
    name: project.name,
    description: project.description || "",
    owner: project.owner,
    ownerName: project.ownerName || project.owner,
    template: project.template || "",
    scale: project.scale || "",
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
    archived: Boolean(project.archived),
    collaborators: (project.collaborators || []).map((item) => ({
      principal: item.principal,
      role: item.role,
      invitedAt: item.invitedAt,
      status: item.status,
    })),
    currentVersionId: project.currentVersionId || "",
    versionCount: project.versionCount || 0,
  };
}

async function readProjectModel(projectId) {
  const filePath = projectFilePath(projectId);
  if (!existsSync(filePath)) return null;
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function writeProjectModel(projectId, payload) {
  await mkdir(projectsDir, { recursive: true });
  await writeFile(projectFilePath(projectId), `${JSON.stringify(payload, null, 2)}\n`);
}

async function writeArchivedVersion(projectId, versionId, payload) {
  await mkdir(archiveDir, { recursive: true });
  await writeFile(versionFilePath(projectId, versionId), `${JSON.stringify(payload, null, 2)}\n`);
}

function sanitizeOrder(order) {
  return {
    id: order.id,
    createdAt: order.createdAt,
    status: order.status,
    reference: order.reference,
    productName: order.productName,
    amount: order.amount,
    currency: order.currency,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    company: order.company,
    licenseKey: order.licenseKey || "",
  };
}

function sanitizeLicense(license) {
  return {
    key: license.key,
    customerEmail: license.customerEmail,
    customerName: license.customerName,
    company: license.company,
    orderId: license.orderId,
    createdAt: license.createdAt,
    status: license.status,
  };
}

async function createCheckout(req, res) {
  const body = await parseBody(req);
  const customerName = String(body.customerName || "").trim();
  const customerEmail = String(body.customerEmail || "").trim().toLowerCase();
  const company = String(body.company || "").trim();
  if (!customerName || !customerEmail.includes("@")) {
    json(res, 400, { error: "Please enter a customer name and valid email address." });
    return;
  }

  const db = ensureDbShape(await loadDb());
  const order = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pending_bank_transfer",
    reference: makeReference(),
    productName: config.productName,
    amount: config.priceCents / 100,
    currency: config.currency,
    customerName,
    customerEmail,
    company,
  };
  db.orders.unshift(order);
  db.audit.unshift({ at: order.createdAt, type: "checkout.created", orderId: order.id, reference: order.reference });
  await saveDb(db);

  json(res, 201, {
    order: sanitizeOrder(order),
    payment: {
      method: "SEPA bank transfer",
      reference: order.reference,
      amount: order.amount,
      currency: order.currency,
      bank: publicConfig().bank,
      bankConfigured: publicConfig().bankConfigured,
      instruction: `Transfer ${order.amount.toFixed(2)} ${order.currency} with reference ${order.reference}. Access is activated after the incoming payment is verified.`,
    },
  });
}

function ensureDbShape(db) {
  db.users ||= [];
  db.orders ||= [];
  db.licenses ||= [];
  db.projects ||= [];
  db.projectVersions ||= [];
  db.invites ||= [];
  db.projectBriefs ||= [];
  db.audit ||= [];
  seedUsers(db);
  return db;
}

function inferHelpGuide(prompt, context = {}) {
  const lower = String(prompt || "").toLowerCase();
  const steps = [];
  let targetView = "flowsheet";
  if (lower.includes("oxygen") || lower.includes("kla") || lower.includes("cfd") || lower.includes("nutrient")) {
    targetView = "cfd";
    steps.push("Open Bioreactor CFD and compare oxygen, nutrient, shear, and hotspot maps for the selected reactor.");
    steps.push("If the reactor is large, evaluate parallel trains, oxygen enrichment, sparger design, agitation, and working-volume reduction.");
  }
  if (lower.includes("ammon") || lower.includes("lactate") || lower.includes("ph") || lower.includes("boundary")) {
    targetView = "ai";
    steps.push("Open Boundaries + AI and inspect ammonium, lactate, pH, DO, kLa, and mammalian-volume warnings.");
    steps.push("Revise feed composition, glutamine burden, perfusion/bleed strategy, or harvest timing before scaling further.");
  }
  if (lower.includes("cost") || lower.includes("capex") || lower.includes("opex") || lower.includes("price")) {
    targetView = "economics";
    steps.push("Open Economics and check fixed lab burden, CAPEX exponent, validation factor, utilization, automation, and facility premium.");
    steps.push("Download the cost report and compare lab, pilot, demo, and commercial scale assumptions.");
  }
  if (lower.includes("download") || lower.includes("mass") || lower.includes("energy") || lower.includes("stream")) {
    targetView = "reports";
    steps.push("Open Downloads and export mass + energy balances, stream tables, chemical equations, parameters, and CFD JSON.");
  }
  if (!steps.length) {
    steps.push("Open Process Builder, select the unit or stream related to the issue, and switch Flow visibility to Full PFD.");
    steps.push("Then open Equations or Boundaries + AI depending on whether the problem is mathematical or operational.");
  }
  return {
    targetView,
    title: "Recommended tool workflow",
    steps,
    assumptions: [
      `Model: ${context.template || "current process"}`,
      `Scale: ${context.scale || "current scale"}`,
      `Selected unit: ${context.selectedId || "none"}`,
    ],
  };
}

async function createProjectBrief(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const body = await parseBody(req);
  const brief = String(body.brief || "").trim();
  if (brief.length < 12) {
    json(res, 400, { error: "Project brief is too short" });
    return;
  }
  const db = ensureDbShape(await loadDb());
  const record = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    createdBy: session.sub,
    templateKey: String(body.templateKey || "fermentation"),
    scale: String(body.scale || "pilot"),
    brief,
    files: Array.isArray(body.files) ? body.files.slice(0, 8).map((file) => ({
      name: String(file.name || "uploaded-file"),
      type: String(file.type || "application/octet-stream"),
      size: Number(file.size || 0),
      contentPreview: String(file.contentPreview || "").slice(0, 2400),
    })) : [],
    assumptions: Array.isArray(body.assumptions) ? body.assumptions.map(String).slice(0, 12) : [],
  };
  db.projectBriefs.unshift(record);
  db.audit.unshift({ at: record.createdAt, type: "project.brief.created", id: record.id, templateKey: record.templateKey });
  await saveDb(db);
  json(res, 201, { projectBrief: { ...record, files: record.files.map(({ contentPreview, ...file }) => file) } });
}

async function help(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const body = await parseBody(req);
  json(res, 200, { guide: inferHelpGuide(body.prompt, body.context || {}) });
}

function integrationRegistry() {
  return [
    {
      key: "superpro",
      name: "SuperPro Designer",
      category: "Process simulation",
      status: "import-export scaffold",
      direction: "Import reports / export Axion model",
      auth: "file",
      description: "Use CSV/Excel/report exchange as the first bridge; native proprietary model editing requires vendor-supported formats.",
    },
    {
      key: "aspen",
      name: "Aspen Plus / Aspen Batch",
      category: "Process simulation",
      status: "connector planned",
      direction: "Export streams, property package, and economics basis",
      auth: "enterprise API or file",
      description: "Prepared for stream/property-package export and future enterprise connector configuration.",
    },
    {
      key: "comsol",
      name: "COMSOL Multiphysics",
      category: "CFD / multiphysics",
      status: "connector planned",
      direction: "Export reactor geometry and boundary conditions",
      auth: "file/API",
      description: "Exports reactor geometry assumptions, kLa targets, feed zones, and sparger/impeller metadata for rigorous CFD setup.",
    },
    {
      key: "starccm",
      name: "Simcenter STAR-CCM+",
      category: "CFD",
      status: "connector planned",
      direction: "Export CFD screening cases",
      auth: "file/API",
      description: "Prepared for oxygen, nutrient, shear, sparger, and agitation case handoff.",
    },
    {
      key: "opcua",
      name: "OPC UA / SCADA",
      category: "Live plant data",
      status: "connector planned",
      direction: "Read historian tags",
      auth: "server credentials",
      description: "Maps live pH, DO, temperature, flow, pressure, feed, and batch-state tags to Axion model parameters.",
    },
    {
      key: "osisoft-pi",
      name: "AVEVA PI / OSIsoft PI",
      category: "Historian",
      status: "connector planned",
      direction: "Read batch historian",
      auth: "enterprise connector",
      description: "Prepared for batch profile calibration, soft sensors, deviations, and continued process verification.",
    },
    {
      key: "benchling",
      name: "Benchling",
      category: "ELN/LIMS",
      status: "connector planned",
      direction: "Read experiments and assays",
      auth: "API key/OAuth",
      description: "Prepared for titer, viability, media, assay, and strain/cell-line metadata transfer.",
    },
    {
      key: "limsid",
      name: "LIMS / ELN generic",
      category: "Quality data",
      status: "connector planned",
      direction: "Read/write assay metadata",
      auth: "API key",
      description: "Generic connector shell for HCP, DNA, endotoxin, sterility, bioburden, and release-test tables.",
    },
  ];
}

async function listProjects(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const db = ensureDbShape(await loadDb());
  const projects = db.projects
    .filter((project) => canAccessProject(session, project))
    .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))
    .map(sanitizeProject);
  const invites = db.invites
    .filter((invite) => normalizePrincipal(invite.recipient) === sessionPrincipal(session) || session.role === "admin")
    .sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  json(res, 200, {
    projects,
    invites,
    integrations: integrationRegistry(),
    folders: {
      activeModels: projectsDir,
      archivedModels: archiveDir,
    },
  });
}

async function createProject(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const body = await parseBody(req);
  const now = new Date().toISOString();
  const db = ensureDbShape(await loadDb());
  const id = randomUUID();
  const versionId = randomUUID();
  const project = {
    id,
    name: String(body.name || body.modelState?.projectName || "Untitled Axion model").trim().slice(0, 120),
    description: String(body.description || body.modelState?.productBrief || "").trim().slice(0, 2000),
    owner: sessionPrincipal(session),
    ownerName: sessionDisplayName(session),
    template: String(body.modelState?.template || body.template || ""),
    scale: String(body.modelState?.scale || body.scale || ""),
    createdAt: now,
    updatedAt: now,
    archived: false,
    collaborators: [],
    currentVersionId: versionId,
    versionCount: 1,
  };
  const modelPayload = {
    project: sanitizeProject(project),
    savedAt: now,
    savedBy: sessionPrincipal(session),
    summary: body.summary || {},
    modelState: body.modelState || {},
  };
  db.projects.unshift(project);
  db.projectVersions.unshift({
    id: versionId,
    projectId: id,
    createdAt: now,
    createdBy: sessionPrincipal(session),
    label: "Initial model",
    summary: body.summary || {},
  });
  db.audit.unshift({ at: now, type: "project.created", projectId: id, by: sessionPrincipal(session) });
  await writeProjectModel(id, modelPayload);
  await writeArchivedVersion(id, versionId, modelPayload);
  await saveDb(db);
  json(res, 201, { project: sanitizeProject(project), versionId });
}

async function loadProject(req, res, projectId) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const db = ensureDbShape(await loadDb());
  const project = db.projects.find((item) => item.id === projectId);
  if (!project || !canAccessProject(session, project)) {
    json(res, 404, { error: "Project not found" });
    return;
  }
  json(res, 200, {
    project: sanitizeProject(project),
    model: await readProjectModel(projectId),
    versions: db.projectVersions.filter((item) => item.projectId === projectId),
    invites: db.invites.filter((item) => item.projectId === projectId),
  });
}

async function saveProject(req, res, projectId) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const body = await parseBody(req);
  const db = ensureDbShape(await loadDb());
  const project = db.projects.find((item) => item.id === projectId);
  if (!project || !canAccessProject(session, project)) {
    json(res, 404, { error: "Project not found" });
    return;
  }
  const now = new Date().toISOString();
  const versionId = randomUUID();
  const previous = await readProjectModel(projectId);
  if (previous) {
    await writeArchivedVersion(projectId, versionId, previous);
  }
  project.name = String(body.name || project.name).trim().slice(0, 120);
  project.description = String(body.description || project.description || "").trim().slice(0, 2000);
  project.template = String(body.modelState?.template || project.template || "");
  project.scale = String(body.modelState?.scale || project.scale || "");
  project.updatedAt = now;
  project.currentVersionId = versionId;
  project.versionCount = (project.versionCount || 0) + 1;
  const payload = {
    project: sanitizeProject(project),
    savedAt: now,
    savedBy: sessionPrincipal(session),
    summary: body.summary || {},
    modelState: body.modelState || {},
  };
  await writeProjectModel(projectId, payload);
  db.projectVersions.unshift({
    id: versionId,
    projectId,
    createdAt: now,
    createdBy: sessionPrincipal(session),
    label: String(body.label || `Saved ${project.versionCount}`).slice(0, 120),
    summary: body.summary || {},
  });
  db.audit.unshift({ at: now, type: "project.saved", projectId, versionId, by: sessionPrincipal(session) });
  await saveDb(db);
  json(res, 200, { project: sanitizeProject(project), versionId });
}

async function archiveProject(req, res, projectId) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const db = ensureDbShape(await loadDb());
  const project = db.projects.find((item) => item.id === projectId);
  if (!project || !canAccessProject(session, project)) {
    json(res, 404, { error: "Project not found" });
    return;
  }
  project.archived = true;
  project.updatedAt = new Date().toISOString();
  db.audit.unshift({ at: project.updatedAt, type: "project.archived", projectId, by: sessionPrincipal(session) });
  await saveDb(db);
  json(res, 200, { project: sanitizeProject(project) });
}

async function restoreVersion(req, res, projectId, versionId) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const db = ensureDbShape(await loadDb());
  const project = db.projects.find((item) => item.id === projectId);
  if (!project || !canAccessProject(session, project)) {
    json(res, 404, { error: "Project not found" });
    return;
  }
  const filePath = versionFilePath(projectId, versionId);
  if (!existsSync(filePath)) {
    json(res, 404, { error: "Archived model version not found" });
    return;
  }
  const archived = JSON.parse(await readFile(filePath, "utf8"));
  const now = new Date().toISOString();
  await writeProjectModel(projectId, { ...archived, restoredAt: now, restoredBy: sessionPrincipal(session) });
  project.updatedAt = now;
  db.audit.unshift({ at: now, type: "project.version.restored", projectId, versionId, by: sessionPrincipal(session) });
  await saveDb(db);
  json(res, 200, { project: sanitizeProject(project), model: archived });
}

async function inviteCollaborator(req, res, projectId) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const body = await parseBody(req);
  const recipient = normalizePrincipal(body.recipient || body.email || body.username);
  if (!recipient) {
    json(res, 400, { error: "Enter an email address or username to invite." });
    return;
  }
  const role = ["viewer", "editor", "owner"].includes(body.role) ? body.role : "editor";
  const db = ensureDbShape(await loadDb());
  const project = db.projects.find((item) => item.id === projectId);
  if (!project || !canAccessProject(session, project)) {
    json(res, 404, { error: "Project not found" });
    return;
  }
  const now = new Date().toISOString();
  const matchedUser = db.users.find((user) => user.username === recipient || user.email === recipient);
  const invite = {
    id: randomUUID(),
    projectId,
    projectName: project.name,
    recipient,
    matchedUserId: matchedUser?.id || "",
    role,
    status: matchedUser ? "accepted" : "pending",
    createdAt: now,
    invitedBy: sessionPrincipal(session),
    delivery: "recorded",
    note: "SMTP delivery is not configured; this invite is stored for in-app collaboration.",
  };
  db.invites.unshift(invite);
  if (matchedUser && !project.collaborators?.some((item) => normalizePrincipal(item.principal) === recipient || normalizePrincipal(item.principal) === matchedUser.email)) {
    project.collaborators ||= [];
    project.collaborators.push({
      principal: matchedUser.email,
      username: matchedUser.username,
      role,
      invitedAt: now,
      status: "accepted",
    });
  }
  project.updatedAt = now;
  db.audit.unshift({ at: now, type: "project.invite.created", projectId, recipient, role, by: sessionPrincipal(session) });
  await saveDb(db);
  json(res, 201, { invite, project: sanitizeProject(project) });
}

async function listIntegrations(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  json(res, 200, {
    integrations: integrationRegistry(),
    note: "These are connector definitions and API handoff targets. Live third-party connections need customer credentials and vendor API access.",
  });
}

function googleConfig(req, res) {
  json(res, 200, {
    enabled: Boolean(config.googleClientId),
    clientId: config.googleClientId,
    restricted: Boolean(config.googleAllowedEmails.length || config.googleAllowedDomains.length),
  });
}

function googleAccountAllowed(profile) {
  const email = String(profile.email || "").toLowerCase();
  const domain = email.includes("@") ? email.split("@").at(-1) : "";
  if (!config.googleAllowedEmails.length && !config.googleAllowedDomains.length) {
    return true;
  }
  return config.googleAllowedEmails.includes(email) || config.googleAllowedDomains.includes(domain);
}

async function googleLogin(req, res) {
  if (!config.googleClientId) {
    json(res, 503, { error: "Google login is not configured. Set GOOGLE_CLIENT_ID on the backend." });
    return;
  }
  const body = await parseBody(req);
  const credential = String(body.credential || "").trim();
  if (!credential) {
    json(res, 400, { error: "Missing Google credential." });
    return;
  }
  const tokenInfoUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`;
  const googleResponse = await fetch(tokenInfoUrl);
  const profile = await googleResponse.json().catch(() => ({}));
  if (!googleResponse.ok) {
    json(res, 401, { error: profile.error_description || "Google credential could not be verified." });
    return;
  }
  if (profile.aud !== config.googleClientId) {
    json(res, 401, { error: "Google credential audience does not match this application." });
    return;
  }
  if (profile.email_verified !== "true" && profile.email_verified !== true) {
    json(res, 401, { error: "Google email is not verified." });
    return;
  }
  if (!googleAccountAllowed(profile)) {
    json(res, 403, { error: "This Google account is not allowed for Axion." });
    return;
  }

  const email = String(profile.email || "").toLowerCase();
  const db = ensureDbShape(await loadDb());
  let user = db.users.find((item) => item.email === email);
  if (!user) {
    user = {
      id: randomUUID(),
      username: email.split("@")[0],
      email,
      name: profile.name || email,
      role: "user",
      passwordHash: "",
      createdAt: new Date().toISOString(),
      status: "active",
    };
    db.users.push(user);
    db.audit.unshift({ at: user.createdAt, type: "user.google.created", userId: user.id, email });
    await saveDb(db);
  }
  const token = signSession({
    sub: user.id,
    role: user.role || "user",
    email,
    username: user.username,
    name: user.name || profile.name || email,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 14,
  });
  json(res, 200, {
    token,
    account: {
      role: user.role || "user",
      name: user.name || profile.name || email,
      username: user.username,
      email,
      productName: config.productName,
    },
  });
}

async function login(req, res) {
  const body = await parseBody(req);
  const user = String(body.user || "").trim().toLowerCase();
  const password = String(body.password || "");
  const licenseKey = String(body.licenseKey || password || "").trim().toUpperCase();
  const db = ensureDbShape(await loadDb());

  const ownerPasswordValid = config.adminPassword && safeCompare(password, config.adminPassword);
  const ownerUserValid = safeCompare(user, config.adminUser) || (config.localPasswordLogin && Boolean(user));
  if (ownerUserValid && ownerPasswordValid) {
    if (!config.adminPassword) {
      json(res, 503, { error: "Admin password is not configured on the backend." });
      return;
    }
    const token = signSession({ sub: "admin", role: "admin", exp: Date.now() + 1000 * 60 * 60 * 12 });
    json(res, 200, { token, account: { role: "admin", name: "Owner", productName: config.productName } });
    return;
  }

  const localUser = db.users.find((item) => item.status === "active" && (item.username === user || item.email === user));
  if (localUser?.passwordHash && safeCompare(localUser.passwordHash, userPasswordHash(password))) {
    const token = signSession({
      sub: localUser.id,
      role: localUser.role || "user",
      username: localUser.username,
      email: localUser.email,
      name: localUser.name,
      exp: Date.now() + 1000 * 60 * 60 * 24 * 14,
    });
    json(res, 200, {
      token,
      account: {
        role: localUser.role || "user",
        name: localUser.name,
        username: localUser.username,
        email: localUser.email,
        productName: config.productName,
      },
    });
    return;
  }

  const license = db.licenses.find((item) => item.key === licenseKey && item.status === "active");
  const emailMatches = !user || license?.customerEmail === user;
  if (license && emailMatches) {
    const token = signSession({ sub: license.key, role: "customer", email: license.customerEmail, name: license.customerName, licenseKey: license.key, exp: Date.now() + 1000 * 60 * 60 * 24 * 14 });
    json(res, 200, { token, account: { role: "customer", name: license.customerName, productName: config.productName, licenseKey: license.key } });
    return;
  }

  json(res, 401, { error: "Access denied. Use the owner login or an activated license key." });
}

async function account(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  json(res, 200, {
    account: {
      role: session.role,
      name: sessionDisplayName(session),
      username: session.username || "",
      email: session.email || "",
      principal: sessionPrincipal(session),
      productName: config.productName,
      licenseKey: session.licenseKey || "",
    },
  });
}

async function listOrders(req, res) {
  const session = verifySession(getBearer(req));
  if (session?.role !== "admin") {
    json(res, 403, { error: "Admin access required" });
    return;
  }
  const db = ensureDbShape(await loadDb());
  json(res, 200, { orders: db.orders.map(sanitizeOrder), licenses: db.licenses.map(sanitizeLicense) });
}

async function markPaid(req, res, orderId) {
  const session = verifySession(getBearer(req));
  if (session?.role !== "admin") {
    json(res, 403, { error: "Admin access required" });
    return;
  }
  const db = ensureDbShape(await loadDb());
  const order = db.orders.find((item) => item.id === orderId || item.reference === orderId);
  if (!order) {
    json(res, 404, { error: "Order not found" });
    return;
  }
  if (!order.licenseKey) {
    order.licenseKey = makeLicenseKey();
    db.licenses.unshift({
      key: order.licenseKey,
      customerEmail: order.customerEmail,
      customerName: order.customerName,
      company: order.company,
      orderId: order.id,
      createdAt: new Date().toISOString(),
      status: "active",
    });
  }
  order.status = "paid_active";
  order.paidAt = new Date().toISOString();
  db.audit.unshift({ at: order.paidAt, type: "order.paid", orderId: order.id, reference: order.reference, licenseKey: order.licenseKey });
  await saveDb(db);
  json(res, 200, { order: sanitizeOrder(order), licenseKey: order.licenseKey });
}

async function routeApi(req, res, pathname) {
  if (req.method === "GET" && pathname === "/api/product") {
    json(res, 200, publicConfig());
    return;
  }
  if (req.method === "POST" && pathname === "/api/checkout") {
    await createCheckout(req, res);
    return;
  }
  if (req.method === "POST" && pathname === "/api/auth/login") {
    await login(req, res);
    return;
  }
  if (req.method === "GET" && pathname === "/api/auth/google-config") {
    googleConfig(req, res);
    return;
  }
  if (req.method === "POST" && pathname === "/api/auth/google") {
    await googleLogin(req, res);
    return;
  }
  if (req.method === "POST" && pathname === "/api/project/brief") {
    await createProjectBrief(req, res);
    return;
  }
  if (req.method === "GET" && pathname === "/api/projects") {
    await listProjects(req, res);
    return;
  }
  if (req.method === "POST" && pathname === "/api/projects") {
    await createProject(req, res);
    return;
  }
  const projectMatch = pathname.match(/^\/api\/projects\/([^/]+)$/);
  if (projectMatch && req.method === "GET") {
    await loadProject(req, res, decodeURIComponent(projectMatch[1]));
    return;
  }
  const projectSaveMatch = pathname.match(/^\/api\/projects\/([^/]+)\/save$/);
  if (projectSaveMatch && req.method === "POST") {
    await saveProject(req, res, decodeURIComponent(projectSaveMatch[1]));
    return;
  }
  const projectArchiveMatch = pathname.match(/^\/api\/projects\/([^/]+)\/archive$/);
  if (projectArchiveMatch && req.method === "POST") {
    await archiveProject(req, res, decodeURIComponent(projectArchiveMatch[1]));
    return;
  }
  const projectInviteMatch = pathname.match(/^\/api\/projects\/([^/]+)\/invites$/);
  if (projectInviteMatch && req.method === "POST") {
    await inviteCollaborator(req, res, decodeURIComponent(projectInviteMatch[1]));
    return;
  }
  const restoreMatch = pathname.match(/^\/api\/projects\/([^/]+)\/versions\/([^/]+)\/restore$/);
  if (restoreMatch && req.method === "POST") {
    await restoreVersion(req, res, decodeURIComponent(restoreMatch[1]), decodeURIComponent(restoreMatch[2]));
    return;
  }
  if (req.method === "GET" && pathname === "/api/integrations") {
    await listIntegrations(req, res);
    return;
  }
  if (req.method === "POST" && pathname === "/api/help") {
    await help(req, res);
    return;
  }
  if (req.method === "GET" && pathname === "/api/account") {
    await account(req, res);
    return;
  }
  if (req.method === "GET" && pathname === "/api/admin/orders") {
    await listOrders(req, res);
    return;
  }
  const paidMatch = pathname.match(/^\/api\/admin\/orders\/([^/]+)\/mark-paid$/);
  if (req.method === "POST" && paidMatch) {
    await markPaid(req, res, decodeURIComponent(paidMatch[1]));
    return;
  }
  json(res, 404, { error: "API route not found" });
}

function serveStatic(req, res, pathname) {
  const requested = pathname === "/" ? "/index.html" : pathname;
  const clean = normalize(decodeURIComponent(requested)).replace(/^(\.\.[/\\])+/, "");
  const filePath = resolve(rootDir, `.${clean}`);
  if (!filePath.startsWith(rootDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  if (!existsSync(filePath)) {
    const fallback = join(rootDir, "index.html");
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    createReadStream(fallback).pipe(res);
    return;
  }
  res.writeHead(200, {
    "content-type": staticTypes.get(extname(filePath)) || "application/octet-stream",
  });
  createReadStream(filePath).pipe(res);
}

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
    if (url.pathname.startsWith("/api/")) {
      await routeApi(req, res, url.pathname);
      return;
    }
    serveStatic(req, res, url.pathname);
  } catch (error) {
    json(res, 500, { error: error.message || "Internal server error" });
  }
});

server.listen(config.port, config.host, () => {
  console.log(`${config.productName} backend running at http://${config.host}:${config.port}`);
  console.log(`Price gate: ${(config.priceCents / 100).toFixed(2)} ${config.currency}`);
  if (!publicConfig().bankConfigured) {
    console.log("Bank account is not configured yet. Set BANK_ACCOUNT_HOLDER, BANK_IBAN, BANK_BIC, and BANK_NAME.");
  }
});
