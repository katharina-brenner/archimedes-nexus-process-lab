import { createHmac, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { createReadStream, existsSync, readFileSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));
const dataDir = join(rootDir, ".data");
const dbPath = join(dataDir, "archytas-licensing.json");

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
  productName: process.env.PRODUCT_NAME || "Archytas Process OS",
  priceCents: Number(process.env.ARCHYTAS_PRICE_CENTS || 72500),
  currency: process.env.ARCHYTAS_CURRENCY || "EUR",
  sessionSecret: process.env.SESSION_SECRET || "archytas-local-dev-secret",
  adminUser: (process.env.ARCHYTAS_ADMIN_USER || "Kbrenner").toLowerCase(),
  adminPassword: process.env.ARCHYTAS_ADMIN_PASSWORD || "",
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
  orders: [],
  licenses: [],
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
  };
}

async function loadDb() {
  await mkdir(dataDir, { recursive: true });
  if (!existsSync(dbPath)) {
    await writeFile(dbPath, JSON.stringify(defaultDb, null, 2));
    return structuredClone(defaultDb);
  }
  return JSON.parse(await readFile(dbPath, "utf8"));
}

async function saveDb(db) {
  await mkdir(dataDir, { recursive: true });
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
  return `ARCHYTAS-${randomBytes(3).toString("hex").toUpperCase()}-${randomBytes(2).toString("hex").toUpperCase()}`;
}

function makeLicenseKey() {
  return `ARX-${randomBytes(3).toString("hex").toUpperCase()}-${randomBytes(3).toString("hex").toUpperCase()}-${randomBytes(3).toString("hex").toUpperCase()}`;
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
  db.orders ||= [];
  db.licenses ||= [];
  db.projectBriefs ||= [];
  db.audit ||= [];
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

async function login(req, res) {
  const body = await parseBody(req);
  const user = String(body.user || "").trim().toLowerCase();
  const password = String(body.password || "");
  const licenseKey = String(body.licenseKey || password || "").trim().toUpperCase();
  const db = ensureDbShape(await loadDb());

  if (safeCompare(user, config.adminUser) && safeCompare(password, config.adminPassword)) {
    if (!config.adminPassword) {
      json(res, 503, { error: "Admin password is not configured on the backend." });
      return;
    }
    const token = signSession({ sub: "admin", role: "admin", exp: Date.now() + 1000 * 60 * 60 * 12 });
    json(res, 200, { token, account: { role: "admin", name: "K. Brenner", productName: config.productName } });
    return;
  }

  const license = db.licenses.find((item) => item.key === licenseKey && item.status === "active");
  const emailMatches = !user || license?.customerEmail === user;
  if (license && emailMatches) {
    const token = signSession({ sub: license.key, role: "customer", licenseKey: license.key, exp: Date.now() + 1000 * 60 * 60 * 24 * 14 });
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
  json(res, 200, { account: { role: session.role, productName: config.productName, licenseKey: session.licenseKey || "" } });
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
  if (req.method === "POST" && pathname === "/api/project/brief") {
    await createProjectBrief(req, res);
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
