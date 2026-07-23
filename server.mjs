import { createHash, createHmac, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { spawn } from "node:child_process";
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
const runsDir = join(modelsDir, "runs");
const pythonModelScript = join(rootDir, "python_models", "bioprocess_model.py");

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
  priceCents: Number(process.env.AXION_PRICE_CENTS || 240000),
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
  appBaseUrl: process.env.APP_BASE_URL || `http://${process.env.HOST || "127.0.0.1"}:${process.env.PORT || 8899}`,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
  stripePriceId: process.env.STRIPE_PRICE_ID || "",
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
  pythonExecutable: process.env.AXION_PYTHON || "python3",
  pythonRunTimeoutMs: Number(process.env.AXION_PYTHON_TIMEOUT_MS || 15000),
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
  datasets: [],
  simulationRuns: [],
  audit: [],
};

function backendFeatures() {
  return [
    "2,400 EUR professional individual license checkout",
    "Stripe Checkout hosted payment flow",
    "Automatic license-key generation after successful payment",
    "Stripe webhook activation",
    "Checkout-session verification fallback",
    "Server-side login tokens",
    "Google OAuth login with backend token verification",
    "Multi-user project workspaces",
    "Project archives for old model versions",
    "Username/email invitations for collaboration",
    "External integration registry for modelling and data tools",
    "REST API and JSON model handoff architecture",
    "Python modelling runtime for dynamic bioprocess screening",
    "Academic source library for model assumptions",
    "Dataset registry for uploaded experimental, historian, TEA and LCA data",
    "Python SDK and webhook-ready integration targets",
    "Cloud run, parameter sweep, Monte Carlo and scenario-run roadmap",
    "Live-data, historian, LIMS, ERP and vendor-quote connector registry",
    "Versioned process models with project archives and collaboration roles",
    "Admin order and license listing",
    "Static app hosting from the same backend",
    "Google OAuth configuration via environment variables",
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
    features: backendFeatures(),
    auth: {
      googleEnabled: Boolean(config.googleClientId),
    },
    payments: {
      provider: config.stripeSecretKey ? "stripe" : "setup_required",
      stripeEnabled: Boolean(config.stripeSecretKey),
      automaticActivation: Boolean(config.stripeSecretKey),
    },
    backend: {
      currentStorage: "local JSON files in .data/models",
      recommendedProductionDataApp: "Supabase Postgres + Supabase Storage, or managed Postgres on Render/Fly/Railway plus S3-compatible object storage",
      pythonRuntime: config.pythonExecutable,
      modellingEndpoint: "/api/model-runs/python",
      academicSourcesEndpoint: "/api/sources/academic",
      dataArchitectureEndpoint: "/api/data/architecture",
    },
  };
}

async function loadDb() {
  await mkdir(dataDir, { recursive: true });
  await mkdir(projectsDir, { recursive: true });
  await mkdir(archiveDir, { recursive: true });
  await mkdir(runsDir, { recursive: true });
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
  await mkdir(runsDir, { recursive: true });
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

function readRawBody(req) {
  return new Promise((resolveBody, rejectBody) => {
    const chunks = [];
    let length = 0;
    req.on("data", (chunk) => {
      chunks.push(chunk);
      length += chunk.length;
      if (length > 2_000_000) {
        rejectBody(new Error("Payload too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolveBody(Buffer.concat(chunks).toString("utf8")));
    req.on("error", rejectBody);
  });
}

function formBody(params) {
  const encoded = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") encoded.append(key, String(value));
  });
  return encoded;
}

async function stripeRequest(pathname, params = {}, method = "POST") {
  if (!config.stripeSecretKey) {
    throw new Error("Stripe is not configured. Set STRIPE_SECRET_KEY on the backend; add STRIPE_PRICE_ID, STRIPE_WEBHOOK_SECRET and APP_BASE_URL for automatic SaaS checkout.");
  }
  const response = await fetch(`https://api.stripe.com${pathname}`, {
    method,
    headers: {
      authorization: `Bearer ${config.stripeSecretKey}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: method === "GET" ? undefined : formBody(params),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error?.message || `Stripe request failed with status ${response.status}`);
  }
  return payload;
}

function verifyStripeSignature(rawBody, signatureHeader) {
  if (!config.stripeWebhookSecret) return false;
  const parts = Object.fromEntries(String(signatureHeader || "").split(",").map((part) => {
    const [key, ...valueParts] = part.split("=");
    return [key, valueParts.join("=")];
  }));
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;
  const expected = createHmac("sha256", config.stripeWebhookSecret)
    .update(`${timestamp}.${rawBody}`)
    .digest("hex");
  return safeCompare(expected, signature);
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
    { username: "kbrenner", email: "kbrenner@local.axion", name: "KBrenner", password: "0105", role: "admin", paymentExempt: true },
    { username: "mahmed", email: "mahmed@local.axion", name: "MAhmed", password: "1402", role: "user", paymentExempt: true },
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
      paymentExempt: seed.paymentExempt,
      passwordHash: userPasswordHash(seed.password),
      createdAt: new Date().toISOString(),
      status: "active",
    });
  });
  db.users.forEach((user) => {
    if (["kbrenner", "mahmed"].includes(user.username)) user.paymentExempt = true;
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
    paymentExempt: Boolean(user.paymentExempt),
    status: user.status,
  };
}

function activeLicenseForEmail(db, email) {
  const normalized = normalizePrincipal(email);
  return db.licenses.find((item) => item.status === "active" && normalizePrincipal(item.customerEmail) === normalized);
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

function runFilePath(runId) {
  return join(runsDir, `${runId}.json`);
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

async function writeSimulationRun(runId, payload) {
  await mkdir(runsDir, { recursive: true });
  await writeFile(runFilePath(runId), `${JSON.stringify(payload, null, 2)}\n`);
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

function billingProfileForSession(session) {
  const amount = config.priceCents / 100;
  const amountFormatted = new Intl.NumberFormat("de-DE", { style: "currency", currency: config.currency }).format(amount);
  const isCustomer = session.role === "customer";
  const isAdmin = session.role === "admin";
  const isExempt = Boolean(session.paymentExempt);
  return {
    plan: isAdmin ? "Owner workspace" : isCustomer ? "Professional license" : isExempt ? "Internal free access" : "Private workspace",
    paymentStatus: isCustomer ? "paid active" : isAdmin ? "payment exempt" : isExempt ? "payment exempt" : "workspace access",
    amount,
    amountFormatted,
    currency: config.currency,
    billingEmail: session.email || "",
    customerId: session.licenseKey || sessionPrincipal(session),
    licenseKey: session.licenseKey || "",
    paymentExempt: isExempt || isAdmin,
    checkoutConfigured: Boolean(config.stripeSecretKey),
    renewal: "annual SaaS access",
  };
}

function activatePaidOrder(db, order, { paymentProvider = "stripe", paymentId = "", paidAt = new Date().toISOString() } = {}) {
  if (!order.licenseKey) {
    order.licenseKey = makeLicenseKey();
    db.licenses.unshift({
      key: order.licenseKey,
      customerEmail: order.customerEmail,
      customerName: order.customerName,
      company: order.company,
      orderId: order.id,
      createdAt: paidAt,
      status: "active",
    });
  }
  order.status = "paid_active";
  order.paidAt = paidAt;
  order.paymentProvider = paymentProvider;
  if (paymentId) order.paymentId = paymentId;
  db.audit.unshift({ at: paidAt, type: "order.paid", orderId: order.id, reference: order.reference, licenseKey: order.licenseKey, paymentProvider, paymentId });
  return order.licenseKey;
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
  if (!config.stripeSecretKey) {
    json(res, 503, {
      error: "Automatic checkout is not configured yet. Set STRIPE_SECRET_KEY on the backend to enable SaaS-style payment.",
      setup: {
        provider: "Stripe Checkout",
        requiredEnv: ["STRIPE_SECRET_KEY"],
        recommendedEnv: ["STRIPE_PRICE_ID", "STRIPE_WEBHOOK_SECRET", "APP_BASE_URL"],
      },
    });
    return;
  }

  const db = ensureDbShape(await loadDb());
  const order = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pending_stripe_checkout",
    reference: makeReference(),
    productName: config.productName,
    amount: config.priceCents / 100,
    currency: config.currency,
    customerName,
    customerEmail,
    company,
  };
  db.orders.unshift(order);
  db.audit.unshift({ at: order.createdAt, type: "checkout.created", orderId: order.id, reference: order.reference, provider: "stripe" });
  await saveDb(db);

  const sessionParams = {
    mode: "payment",
    success_url: `${config.appBaseUrl}/index.html?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.appBaseUrl}/index.html?checkout=cancelled`,
    customer_email: customerEmail,
    client_reference_id: order.id,
    "metadata[orderId]": order.id,
    "metadata[reference]": order.reference,
    "metadata[customerEmail]": customerEmail,
    "automatic_payment_methods[enabled]": "true",
    "line_items[0][quantity]": 1,
  };
  if (config.stripePriceId) {
    sessionParams["line_items[0][price]"] = config.stripePriceId;
  } else {
    sessionParams["line_items[0][price_data][currency]"] = config.currency.toLowerCase();
    sessionParams["line_items[0][price_data][unit_amount]"] = config.priceCents;
    sessionParams["line_items[0][price_data][product_data][name]"] = `${config.productName} annual access`;
  }
  const session = await stripeRequest("/v1/checkout/sessions", sessionParams);
  order.stripeSessionId = session.id;
  order.checkoutUrl = session.url;
  await saveDb(db);

  json(res, 201, {
    order: sanitizeOrder(order),
    payment: {
      provider: "stripe",
      method: "Stripe Checkout",
      reference: order.reference,
      amount: order.amount,
      currency: order.currency,
      checkoutUrl: session.url,
      sessionId: session.id,
      automaticActivation: true,
      instruction: "Continue to secure checkout. Your Axion license activates automatically after successful payment.",
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
  db.datasets ||= [];
  db.simulationRuns ||= [];
  db.audit ||= [];
  seedUsers(db);
  return db;
}

function academicSourceLibrary() {
  return [
    {
      id: "src-cho-ammonia-lactate",
      area: "Cell-culture metabolic boundaries",
      citation: "Schneider, Marison and von Stockar, ammonia and mammalian cell culture work; plus CHO glutamine/lactate/ammonium metabolism literature.",
      url: "https://doi.org/10.1016/0168-1656(96)01564-2",
      modelUse: "Sets ammonium/ammonia, glutamine burden, lactate overflow, bleed/perfusion and soft-sensor warning logic.",
      axionModules: ["Boundaries + AI", "Dynamic profile", "Python bioprocess model"],
      requiredData: "glutamine, glutamate, ammonium, lactate, viable cell density, feed profile, pH, osmolality",
      status: "implemented as screening boundary; needs process-specific calibration",
    },
    {
      id: "src-animal-cell-scale-up",
      area: "Large-scale animal-cell reactor engineering",
      citation: "Nienow and related animal-cell bioreactor scale-up literature on mixing, kLa, shear, sparging and large STR operation.",
      url: "https://doi.org/10.1007/s10616-006-9005-8",
      modelUse: "Supports working-volume, oxygen-transfer, impeller, shear, sparger, and scale-out guardrails.",
      axionModules: ["Bioreactor CFD", "Equipment Register", "Physical boundaries"],
      requiredData: "vessel volume, working volume, impeller type, tip speed, gas flow, kLa, OUR, viscosity, antifoam, sparger geometry",
      status: "implemented as geometry and boundary-condition package; rigorous CFD solver still external",
    },
    {
      id: "src-kla-oxygen-transfer",
      area: "Oxygen transfer and bioreactor scale-up",
      citation: "Garcia-Ochoa and Gomez, bioreactor scale-up and oxygen transfer rate review.",
      url: "https://doi.org/10.1016/S1369-703X(09)70033-8",
      modelUse: "Informs kLa, OTR, OUR, power input, gas flow, mixing-time and scale-up calculations.",
      axionModules: ["Python bioprocess model", "CFD boundary conditions", "Mass + energy balances"],
      requiredData: "kLa, DO setpoint, OUR, gas composition, vessel geometry, power input per volume",
      status: "implemented as OTR/OUR screening equation",
    },
    {
      id: "src-cultured-meat-process",
      area: "Cultured-meat full-process design",
      citation: "Full cultured-meat manufacturing process model and TEA/LCA workflow from attached process paper.",
      url: "local:/Users/katharinajuliabrenner/Downloads/Decoding_cultured_meat_manufacturing_a_full_proces.pdf",
      modelUse: "Defines media preparation, seed train, production STR, harvest, washing, extrusion, packaging, CIP and stream-reference structure.",
      axionModules: ["Process Builder", "Stream Table", "Downloads", "Cultured-meat scale model"],
      requiredData: "medium composition, cell density, viable fraction, harvest yield, transfer rate, CIP scheme, downstream losses",
      status: "implemented as original Axion template and downloadable source model pack",
    },
    {
      id: "src-cultured-meat-scale",
      area: "Cultured-meat scale economics",
      citation: "Cultured meat scale-up, medium cost, bioreactor and cell-line challenge reviews, including attached scale-up documents.",
      url: "local:/Users/katharinajuliabrenner/Downloads/Scaling_Cultured_Meat_Challenges_and_Solutions_for.pdf",
      modelUse: "Models non-linear scale-up, high lab cost burden, medium-dominated OPEX, 20 m3 animal-cell boundary and circularity levers.",
      axionModules: ["Economics", "Recommendations", "Cultured-meat scale model"],
      requiredData: "medium price, growth-factor replacement, food-grade inputs, titer/biomass productivity, utilization, facility CAPEX, energy and water",
      status: "implemented as screening rows; quote-backed economics still missing",
    },
    {
      id: "src-digital-twin-manufacturing",
      area: "Factory simulation and digital twin",
      citation: "Manufacturing digital twin and production-system simulation literature, including attached MT_mft-202004-0011.pdf.",
      url: "local:/Users/katharinajuliabrenner/Downloads/MT_mft-202004-0011.pdf",
      modelUse: "Structures model-vs-plant comparison, production lines, logistics, buffers, resource statistics and bottleneck recommendations.",
      axionModules: ["Twin OS", "Scheduling", "Factory optimizer", "Live state"],
      requiredData: "line states, buffer levels, warehouse data, equipment status, personnel availability, batch events",
      status: "implemented as object-oriented factory simulation scaffold",
    },
    {
      id: "src-plant-simulation-functions",
      area: "Discrete-event production planning",
      citation: "Plant simulation and discrete-event modelling fact sheets attached by user, mapped into Axion-owned scheduling objects.",
      url: "local:/Users/katharinajuliabrenner/Downloads/Siemens-SW-Tecnomatix-Plant-Simulation-Fact-Sheet-1.pdf",
      modelUse: "Informs resource utilization, what-if scenarios, buffers, WIP, personnel, machine state and bottleneck views.",
      axionModules: ["Scheduling", "APS cockpit", "Plant simulation functions"],
      requiredData: "order list, routing, setup/cleaning times, calendars, machine states, failures, WIP and inventory rules",
      status: "implemented as original Axion tables; no vendor libraries copied",
    },
    {
      id: "src-openfoam-bioreactor-cfd",
      area: "Open-source CFD handoff",
      citation: "OpenFOAM and stirred-tank CFD academic workflows for multiphase flow, MRF zones, spargers, baffles and scalar transport.",
      url: "https://www.openfoam.com/",
      modelUse: "Defines exportable boundary-condition and geometry package for rigorous external CFD.",
      axionModules: ["CFD boundary conditions", "CFD geometry export", "OpenFOAM case setup"],
      requiredData: "mesh, liquid/gas properties, impeller MRF zone, gas inlet, feed inlet, wall/baffle no-slip, headspace pressure outlet, cell uptake sink",
      status: "browser screening implemented; rigorous CFD solve should run in OpenFOAM/COMSOL/STAR-CCM+",
    },
    {
      id: "src-equation-oriented-modelling",
      area: "Dynamic equation-oriented modelling",
      citation: "Equation-oriented dynamic process modelling literature and gPROMS-style workflows for parameter estimation, optimization and soft sensors.",
      url: "https://doi.org/10.1016/B978-0-444-53227-5.00006-6",
      modelUse: "Supports PDE/DAE handoff, convective-dispersive transport, parameter estimation, uncertainty and MPC roadmap.",
      axionModules: ["gPROMS-style algorithm", "Python model run", "API connector registry"],
      requiredData: "state variables, algebraic constraints, boundary conditions, measurements, parameter priors, event schedule",
      status: "implemented as algorithm/export scaffold",
    },
  ];
}

function dataArchitectureBlueprint() {
  return {
    localNow: {
      storage: ".data/axion-licensing.json plus .data/models JSON files",
      purpose: "single-machine prototype, private local testing, quick project save/restore",
      limitation: "not enough for paid multi-customer SaaS, audit-grade validation, large uploaded files or concurrent users",
    },
    recommendedProductionStack: {
      primaryChoice: "Supabase",
      database: "Postgres with Row Level Security for users, projects, runs, sources, datasets and collaboration",
      objectStorage: "Supabase Storage or S3-compatible storage for uploaded CSV/XLSX/PDF/raw historian exports",
      auth: "Supabase Auth or custom JWT with Google OAuth and Stripe customer mapping",
      pythonCompute: "FastAPI/Celery worker on Render, Fly.io, Railway, Modal or AWS ECS for model runs",
      queue: "Postgres job table initially; Redis/Celery or managed queue when runs become long",
      reason: "fastest credible path from local prototype to real SaaS with data ownership, RLS and Python jobs",
    },
    coreTables: [
      { table: "users", keyFields: "id, email, username, role, payment_exempt, stripe_customer_id", purpose: "identity and billing mapping" },
      { table: "projects", keyFields: "id, owner_id, name, template, scale, current_version_id", purpose: "user-owned process models" },
      { table: "project_versions", keyFields: "id, project_id, model_json, summary_json, created_by", purpose: "old model archive, restore and later branching/diff" },
      { table: "project_collaborators", keyFields: "project_id, user_id/email, role, status", purpose: "invite and shared editing permissions" },
      { table: "datasets", keyFields: "id, project_id, kind, file_url, schema_json, source_id", purpose: "uploaded experimental, LCA, TEA, supplier and historian data" },
      { table: "simulation_runs", keyFields: "id, project_id, run_type, inputs_json, outputs_json, status, created_by", purpose: "Python model, sweeps, Monte Carlo, CFD handoff and optimization history" },
      { table: "academic_sources", keyFields: "id, citation, url, model_use, required_data", purpose: "source-backed model governance" },
      { table: "audit_events", keyFields: "id, actor_id, event_type, entity_id, payload_json", purpose: "enterprise traceability" },
    ],
    apiRoadmap: [
      "Keep the current Node backend as API gateway and static app server.",
      "Move persistent records from JSON files into Postgres.",
      "Keep project model JSON as a versioned canonical payload, then normalize streams/equipment/runs for analytics.",
      "Run Python models in a separate worker process/service and persist every input/output package.",
      "Add dataset upload parsing for CSV/XLSX first, then PDF/document extraction as assisted evidence only.",
      "Expose a Python SDK that calls the same REST endpoints used by the frontend.",
    ],
  };
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

async function dataArchitecture(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  json(res, 200, dataArchitectureBlueprint());
}

async function listAcademicSources(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  json(res, 200, {
    sources: academicSourceLibrary(),
    note: "These sources define the model design basis. They do not make the screening model validated for a regulated or investment-critical decision without project-specific data.",
  });
}

function compactModelInput(body = {}, projectModel = null) {
  const modelState = body.modelState || projectModel?.modelState || {};
  const parameters = body.parameters || modelState.params || {};
  return {
    template: String(body.template || modelState.template || projectModel?.project?.template || "culturedMeat"),
    scale: String(body.scale || modelState.scale || projectModel?.project?.scale || "pilot"),
    batchVolumeL: Number(body.batchVolumeL || modelState.batchSize || 20000),
    annualBatches: Number(body.annualBatches || modelState.batchCount || 180),
    titerGL: Number(body.titerGL || modelState.titer || parameters.titer || 4),
    recoveryPct: Number(body.recoveryPct || modelState.recovery || parameters.recovery || 72),
    durationH: Number(body.durationH || parameters.cultureDuration || parameters.batchDuration || 120),
    klaH: Number(body.klaH || parameters.kLa || parameters.kla || 12),
    ourMolLh: Number(body.ourMolLh || parameters.ourMolLh || 0.006),
    workingVolumePct: Number(body.workingVolumePct || parameters.workingVolume || 65),
    viableCellDensityMillionMl: Number(body.viableCellDensityMillionMl || parameters.cellDensity || 50),
    glucoseGL: Number(body.glucoseGL || parameters.glucose || 6),
    glutamineMm: Number(body.glutamineMm || parameters.glutamine || 4),
    lactateMm: Number(body.lactateMm || parameters.lactate || 0),
    ammoniumMm: Number(body.ammoniumMm || parameters.ammonium || parameters.ammonia || 0.4),
    feedStrategy: String(body.feedStrategy || parameters.feedStrategy || "fed-batch"),
    temperatureC: Number(body.temperatureC || parameters.temperature || 37),
    ph: Number(body.ph || parameters.ph || 7.1),
    modelStateSummary: {
      units: Array.isArray(modelState.units) ? modelState.units.length : 0,
      streams: Array.isArray(modelState.streams) ? modelState.streams.length : 0,
    },
  };
}

function runPythonModel(input) {
  return new Promise((resolveRun, rejectRun) => {
    if (!existsSync(pythonModelScript)) {
      rejectRun(new Error("Python model script is missing."));
      return;
    }
    const child = spawn(config.pythonExecutable, [pythonModelScript], {
      cwd: rootDir,
      stdio: ["pipe", "pipe", "pipe"],
      env: { ...process.env, PYTHONUNBUFFERED: "1" },
    });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      rejectRun(new Error(`Python model timed out after ${config.pythonRunTimeoutMs} ms`));
    }, config.pythonRunTimeoutMs);
    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
      if (stdout.length > 2_000_000) child.kill("SIGKILL");
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", (error) => {
      clearTimeout(timer);
      rejectRun(error);
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      if (code !== 0) {
        rejectRun(new Error(stderr || `Python model exited with code ${code}`));
        return;
      }
      try {
        resolveRun(JSON.parse(stdout));
      } catch {
        rejectRun(new Error("Python model returned invalid JSON."));
      }
    });
    child.stdin.end(JSON.stringify(input));
  });
}

async function createPythonModelRun(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const body = await parseBody(req);
  const db = ensureDbShape(await loadDb());
  const projectId = String(body.projectId || "").trim();
  let project = null;
  let projectModel = null;
  if (projectId) {
    project = db.projects.find((item) => item.id === projectId);
    if (!project || !canAccessProject(session, project)) {
      json(res, 404, { error: "Project not found" });
      return;
    }
    projectModel = await readProjectModel(projectId);
  }
  const runId = randomUUID();
  const now = new Date().toISOString();
  const input = compactModelInput(body, projectModel);
  const sourceIds = academicSourceLibrary()
    .filter((source) => source.axionModules.some((moduleName) => /python|boundary|cfd|dynamic|economic|cultured/i.test(moduleName)))
    .map((source) => source.id);
  const record = {
    id: runId,
    projectId,
    projectName: project?.name || "",
    runType: "python-bioprocess-screening",
    status: "running",
    createdAt: now,
    createdBy: sessionPrincipal(session),
    input,
    sourceIds,
  };
  db.simulationRuns.unshift(record);
  db.audit.unshift({ at: now, type: "simulation.run.started", runId, projectId, by: sessionPrincipal(session) });
  await saveDb(db);
  try {
    const output = await runPythonModel(input);
    record.status = "completed";
    record.completedAt = new Date().toISOString();
    record.output = output;
    db.audit.unshift({ at: record.completedAt, type: "simulation.run.completed", runId, projectId, by: sessionPrincipal(session) });
    await writeSimulationRun(runId, record);
    await saveDb(db);
    json(res, 201, { run: record, sources: academicSourceLibrary().filter((source) => sourceIds.includes(source.id)) });
  } catch (error) {
    record.status = "failed";
    record.completedAt = new Date().toISOString();
    record.error = error.message;
    db.audit.unshift({ at: record.completedAt, type: "simulation.run.failed", runId, projectId, error: error.message, by: sessionPrincipal(session) });
    await writeSimulationRun(runId, record);
    await saveDb(db);
    json(res, 500, { error: error.message, run: record });
  }
}

async function listModelRuns(req, res, query = new URLSearchParams()) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const db = ensureDbShape(await loadDb());
  const projectId = String(query.get("projectId") || "").trim();
  const accessibleProjectIds = new Set(db.projects.filter((project) => canAccessProject(session, project)).map((project) => project.id));
  const runs = db.simulationRuns
    .filter((run) => {
      if (projectId && run.projectId !== projectId) return false;
      if (!run.projectId) return session.role === "admin" || run.createdBy === sessionPrincipal(session);
      return accessibleProjectIds.has(run.projectId);
    })
    .slice(0, 100);
  json(res, 200, { runs });
}

async function listDatasets(req, res, query = new URLSearchParams()) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const db = ensureDbShape(await loadDb());
  const projectId = String(query.get("projectId") || "").trim();
  const accessibleProjectIds = new Set(db.projects.filter((project) => canAccessProject(session, project)).map((project) => project.id));
  const datasets = db.datasets
    .filter((dataset) => {
      if (projectId && dataset.projectId !== projectId) return false;
      if (!dataset.projectId) return session.role === "admin" || dataset.createdBy === sessionPrincipal(session);
      return accessibleProjectIds.has(dataset.projectId);
    })
    .slice(0, 200);
  json(res, 200, { datasets });
}

async function createDataset(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const body = await parseBody(req);
  const db = ensureDbShape(await loadDb());
  const projectId = String(body.projectId || "").trim();
  let project = null;
  if (projectId) {
    project = db.projects.find((item) => item.id === projectId);
    if (!project || !canAccessProject(session, project)) {
      json(res, 404, { error: "Project not found" });
      return;
    }
  }
  const now = new Date().toISOString();
  const dataset = {
    id: randomUUID(),
    projectId,
    projectName: project?.name || "",
    name: String(body.name || "Axion dataset").trim().slice(0, 160),
    kind: String(body.kind || "experimental").trim().slice(0, 80),
    sourceId: String(body.sourceId || "").trim().slice(0, 120),
    fileName: String(body.fileName || "").trim().slice(0, 220),
    mimeType: String(body.mimeType || "").trim().slice(0, 120),
    size: Number(body.size || 0),
    schema: body.schema && typeof body.schema === "object" ? body.schema : {},
    columns: Array.isArray(body.columns) ? body.columns.map(String).slice(0, 80) : [],
    previewRows: Array.isArray(body.previewRows) ? body.previewRows.slice(0, 10) : [],
    quality: String(body.quality || "unvalidated").trim().slice(0, 80),
    createdAt: now,
    createdBy: sessionPrincipal(session),
    storage: "metadata-only-local-json",
    nextStep: "Move file bytes to Supabase Storage or S3, then parse into typed Postgres rows for simulation calibration.",
  };
  db.datasets.unshift(dataset);
  db.audit.unshift({ at: now, type: "dataset.created", datasetId: dataset.id, projectId, by: sessionPrincipal(session) });
  await saveDb(db);
  json(res, 201, { dataset });
}

function integrationRegistry() {
  return [
    {
      key: "legacy-simulator",
      name: "Legacy process simulator",
      category: "Process simulation",
      status: "import-export scaffold",
      direction: "Import reports / export Axion model",
      auth: "file",
      description: "Use legitimate CSV/Excel/report exchange as the first bridge; native proprietary model editing requires vendor-supported formats and customer rights.",
    },
    {
      key: "rest-api",
      name: "Axion REST API",
      category: "API-first modelling",
      status: "schema scaffold",
      direction: "Read/write JSON process models",
      auth: "token",
      description: "Prepared for project, version, equipment, stream, parameter, simulation-run, and report endpoints.",
    },
    {
      key: "python-sdk",
      name: "Python SDK",
      category: "Automation",
      status: "backend runtime implemented",
      direction: "Run sweeps, fit parameters, export reports",
      auth: "token",
      description: "Backend now exposes /api/model-runs/python for dynamic bioprocess screening; SDK wrapper, sweeps and calibration scripts are next.",
    },
    {
      key: "webhooks",
      name: "Webhooks",
      category: "Automation",
      status: "event scaffold",
      direction: "Notify external systems",
      auth: "signing secret",
      description: "Prepared for project.created, model.versioned, run.completed, report.ready, invite.created, and license.activated events.",
    },
    {
      key: "cloud-runs",
      name: "Cloud batch runs",
      category: "Scenario compute",
      status: "local run history implemented",
      direction: "Execute parameter sweeps and Monte Carlo cases",
      auth: "workspace token",
      description: "Simulation run records are persisted; long-running queue workers and Monte Carlo are next.",
    },
    {
      key: "supabase-postgres",
      name: "Supabase Postgres + Storage",
      category: "Backend data layer",
      status: "recommended production stack",
      direction: "Persist users, projects, datasets, sources, runs and uploaded files",
      auth: "RLS / service role",
      description: "Best next backend app for Axion: Postgres row-level security, object storage for uploads, auth, and a clean path to Python workers.",
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
      key: "gproms",
      name: "gPROMS / equation-oriented modelling",
      category: "High-fidelity modelling",
      status: "handoff planned",
      direction: "Export equations, parameters, units, and estimation cases",
      auth: "file/API",
      description: "Prepared for rigorous dynamic models, parameter estimation, optimization, soft sensors, and model predictive control roadmaps.",
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
    {
      key: "erp",
      name: "ERP / procurement",
      category: "Economics",
      status: "connector planned",
      direction: "Read material prices, inventory, and vendor quote records",
      auth: "enterprise connector",
      description: "Prepared for regional costs, supplier quotes, media BOMs, consumables, resin, packaging, and working-capital assumptions.",
    },
    {
      key: "powerbi",
      name: "Power BI / data warehouse",
      category: "Analytics",
      status: "export scaffold",
      direction: "Publish TEA/LCA and portfolio metrics",
      auth: "workspace token",
      description: "Prepared for dashboards across projects, scenarios, facilities, emissions, COGS, and readiness gaps.",
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
  const accessibleProjectIds = new Set(projects.map((project) => project.id));
  const invites = db.invites
    .filter((invite) => accessibleProjectIds.has(invite.projectId) || normalizePrincipal(invite.recipient) === sessionPrincipal(session) || session.role === "admin")
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
  const license = activeLicenseForEmail(db, email);
  if (!user && !license) {
    json(res, 402, { error: "Payment required. Create a paid order or ask an admin to activate this email before using Google login." });
    return;
  }
  if (!user) {
    user = {
      id: randomUUID(),
      username: email.split("@")[0],
      email,
      name: profile.name || email,
      role: license ? "customer" : "user",
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
    paymentExempt: Boolean(user.paymentExempt),
    licenseKey: license?.key || "",
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
      licenseKey: license?.key || "",
      billing: billingProfileForSession({ role: user.role || "user", email, username: user.username, name: user.name, paymentExempt: Boolean(user.paymentExempt), licenseKey: license?.key || "" }),
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
    const adminUsername = user || config.adminUser || "owner";
    const adminName = adminUsername === "owner" ? "Owner" : adminUsername;
    const token = signSession({ sub: "admin", role: "admin", username: adminUsername, name: adminName, paymentExempt: true, exp: Date.now() + 1000 * 60 * 60 * 12 });
    json(res, 200, { token, account: { role: "admin", username: adminUsername, name: adminName, productName: config.productName, billing: billingProfileForSession({ role: "admin", username: adminUsername, name: adminName, paymentExempt: true }) } });
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
      paymentExempt: Boolean(localUser.paymentExempt),
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
        billing: billingProfileForSession({ role: localUser.role || "user", username: localUser.username, email: localUser.email, name: localUser.name, paymentExempt: Boolean(localUser.paymentExempt) }),
      },
    });
    return;
  }

  const license = db.licenses.find((item) => item.key === licenseKey && item.status === "active");
  const emailMatches = !user || license?.customerEmail === user;
  if (license && emailMatches) {
    const token = signSession({ sub: license.key, role: "customer", email: license.customerEmail, name: license.customerName, licenseKey: license.key, exp: Date.now() + 1000 * 60 * 60 * 24 * 14 });
    json(res, 200, { token, account: { role: "customer", name: license.customerName, email: license.customerEmail, productName: config.productName, licenseKey: license.key, billing: billingProfileForSession({ role: "customer", email: license.customerEmail, name: license.customerName, licenseKey: license.key }) } });
    return;
  }

  json(res, 402, { error: "Payment required. Use KBrenner/MAhmed internal access, an activated license key, or create a paid order." });
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
      billing: billingProfileForSession(session),
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
  activatePaidOrder(db, order, { paymentProvider: order.paymentProvider || "admin" });
  await saveDb(db);
  json(res, 200, { order: sanitizeOrder(order), licenseKey: order.licenseKey });
}

async function checkoutSessionStatus(req, res, sessionId) {
  if (!config.stripeSecretKey) {
    json(res, 503, { error: "Stripe is not configured on the backend." });
    return;
  }
  const session = await stripeRequest(`/v1/checkout/sessions/${encodeURIComponent(sessionId)}`, {}, "GET");
  const db = ensureDbShape(await loadDb());
  const orderId = session.metadata?.orderId || session.client_reference_id;
  const order = db.orders.find((item) => item.id === orderId || item.stripeSessionId === session.id);
  if (!order) {
    json(res, 404, { error: "Checkout order not found." });
    return;
  }
  if (session.payment_status === "paid") {
    activatePaidOrder(db, order, { paymentProvider: "stripe", paymentId: session.payment_intent || session.id });
    await saveDb(db);
  }
  json(res, 200, {
    order: sanitizeOrder(order),
    paid: order.status === "paid_active",
    licenseKey: order.licenseKey || "",
    customerEmail: order.customerEmail,
    instruction: order.status === "paid_active"
      ? "Payment confirmed. Use your email and license key to log in."
      : "Checkout has not completed yet.",
  });
}

async function stripeWebhook(req, res) {
  const rawBody = await readRawBody(req);
  if (!verifyStripeSignature(rawBody, req.headers["stripe-signature"])) {
    json(res, 400, { error: "Invalid Stripe signature." });
    return;
  }
  const event = JSON.parse(rawBody);
  const session = event.data?.object || {};
  const db = ensureDbShape(await loadDb());
  if ((event.type === "checkout.session.completed" && session.payment_status === "paid") || event.type === "checkout.session.async_payment_succeeded") {
    const orderId = session.metadata?.orderId || session.client_reference_id;
    const order = db.orders.find((item) => item.id === orderId || item.stripeSessionId === session.id);
    if (order) {
      activatePaidOrder(db, order, { paymentProvider: "stripe", paymentId: session.payment_intent || session.id });
      await saveDb(db);
    }
  }
  if (event.type === "checkout.session.async_payment_failed") {
    const order = db.orders.find((item) => item.id === session.metadata?.orderId || item.stripeSessionId === session.id);
    if (order) {
      order.status = "payment_failed";
      db.audit.unshift({ at: new Date().toISOString(), type: "order.payment_failed", orderId: order.id, reference: order.reference });
      await saveDb(db);
    }
  }
  json(res, 200, { received: true });
}

async function routeApi(req, res, pathname, query = new URLSearchParams()) {
  if (req.method === "GET" && pathname === "/api/product") {
    json(res, 200, publicConfig());
    return;
  }
  const checkoutSessionMatch = pathname.match(/^\/api\/checkout\/session\/([^/]+)$/);
  if (req.method === "GET" && checkoutSessionMatch) {
    await checkoutSessionStatus(req, res, decodeURIComponent(checkoutSessionMatch[1]));
    return;
  }
  if (req.method === "POST" && pathname === "/api/checkout") {
    await createCheckout(req, res);
    return;
  }
  if (req.method === "POST" && pathname === "/api/stripe/webhook") {
    await stripeWebhook(req, res);
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
  if (req.method === "GET" && pathname === "/api/data/architecture") {
    await dataArchitecture(req, res);
    return;
  }
  if (req.method === "GET" && pathname === "/api/sources/academic") {
    await listAcademicSources(req, res);
    return;
  }
  if (req.method === "GET" && pathname === "/api/model-runs") {
    await listModelRuns(req, res, query);
    return;
  }
  if (req.method === "POST" && pathname === "/api/model-runs/python") {
    await createPythonModelRun(req, res);
    return;
  }
  if (req.method === "GET" && pathname === "/api/datasets") {
    await listDatasets(req, res, query);
    return;
  }
  if (req.method === "POST" && pathname === "/api/datasets") {
    await createDataset(req, res);
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
      await routeApi(req, res, url.pathname, url.searchParams);
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
  if (!config.stripeSecretKey) {
    console.log("Stripe Checkout is not configured yet. Set STRIPE_SECRET_KEY to enable automatic SaaS payment.");
  }
  if (!config.googleClientId) {
    console.log("Google login is not configured yet. Set GOOGLE_CLIENT_ID to enable Google Identity login.");
  }
});
