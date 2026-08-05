import { createCipheriv, createDecipheriv, createHash, createHmac, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { spawn } from "node:child_process";
import { createReadStream, existsSync, readFileSync, statSync } from "node:fs";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));
const runtimeEnvPath = join(rootDir, ".axion-runtime-env.json");

function loadLocalEnv() {
  if (existsSync(runtimeEnvPath)) {
    try {
      const runtimeEnv = JSON.parse(readFileSync(runtimeEnvPath, "utf8"));
      Object.entries(runtimeEnv).forEach(([key, value]) => {
        if (!process.env[key] && typeof value === "string") process.env[key] = value;
      });
    } catch (error) {
      console.warn(`Runtime environment file could not be loaded: ${error.message}`);
    }
  }
  [".env", ".env.local"].forEach((filename) => {
    const envPath = join(rootDir, filename);
    if (!existsSync(envPath)) return;
    const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) return;
      const [key, ...valueParts] = trimmed.split("=");
      if (process.env[key]) return;
      process.env[key] = valueParts.join("=").replace(/^["']|["']$/g, "");
    });
  });
}

loadLocalEnv();

const dataDir = process.env.AXION_DATA_DIR ? resolve(process.env.AXION_DATA_DIR) : join(rootDir, ".data");
const dbPath = join(dataDir, "axion-licensing.json");
const modelsDir = join(dataDir, "models");
const projectsDir = join(modelsDir, "projects");
const archiveDir = join(modelsDir, "archive");
const runsDir = join(modelsDir, "runs");
const pythonModelScript = join(rootDir, "python_models", "bioprocess_model.py");

const defaultHost = process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1";

const config = {
  host: process.env.HOST || defaultHost,
  port: Number(process.env.PORT || 8899),
  productName: process.env.PRODUCT_NAME || "Axion Process OS",
  priceCents: Number(process.env.AXION_PROFESSIONAL_PRICE_CENTS || 59000),
  academicPriceCents: Number(process.env.AXION_ACADEMIC_PRICE_CENTS || 14900),
  teamPriceCents: Number(process.env.AXION_TEAM_PRICE_CENTS || 249000),
  enterprisePriceCents: Number(process.env.AXION_ENTERPRISE_PRICE_CENTS || 690000),
  currency: process.env.AXION_CURRENCY || "EUR",
  sessionSecret: process.env.SESSION_SECRET || "axion-local-dev-secret",
  adminUser: (process.env.AXION_ADMIN_USER || "owner").toLowerCase(),
  adminPassword: process.env.AXION_ADMIN_PASSWORD || "",
  localPasswordLogin: process.env.AXION_LOCAL_PASSWORD_LOGIN === "true",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION || "",
  bingSiteVerification: process.env.BING_SITE_VERIFICATION || "",
  googleAllowedEmails: (process.env.GOOGLE_ALLOWED_EMAILS || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean),
  googleAllowedDomains: (process.env.GOOGLE_ALLOWED_DOMAINS || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean),
  appBaseUrl: process.env.APP_BASE_URL || `http://${process.env.HOST || defaultHost}:${process.env.PORT || 8899}`,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
  stripeAcademicPriceId: process.env.STRIPE_PRICE_ACADEMIC_ID || "",
  stripeProfessionalPriceId: process.env.STRIPE_PRICE_PROFESSIONAL_ID || "",
  stripeTeamPriceId: process.env.STRIPE_PRICE_TEAM_ID || "",
  stripeEnterprisePriceId: process.env.STRIPE_PRICE_ENTERPRISE_ID || "",
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
  stripeApiBaseUrl: (process.env.STRIPE_API_BASE_URL || "https://api.stripe.com").replace(/\/+$/, ""),
  stripeBillingMode: process.env.AXION_BILLING_MODE === "payment" ? "payment" : "subscription",
  stripeAutomaticTax: process.env.STRIPE_AUTOMATIC_TAX === "true",
  supabaseUrl: (process.env.SUPABASE_URL || "").replace(/\/+$/, ""),
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  supabaseStateTable: process.env.SUPABASE_STATE_TABLE || "axion_state",
  supabaseDocumentsTable: process.env.SUPABASE_DOCUMENTS_TABLE || "axion_documents",
  supabaseCustomersTable: process.env.SUPABASE_CUSTOMERS_TABLE || "axion_customers",
  supabaseContractsTable: process.env.SUPABASE_CONTRACTS_TABLE || "axion_contracts",
  supabaseCustomerUsersTable: process.env.SUPABASE_CUSTOMER_USERS_TABLE || "axion_customer_users",
  supabasePlanEntitlementsTable: process.env.SUPABASE_PLAN_ENTITLEMENTS_TABLE || "axion_plan_entitlements",
  supabaseEntitlementOverridesTable: process.env.SUPABASE_ENTITLEMENT_OVERRIDES_TABLE || "axion_entitlement_overrides",
  supabaseSubscriptionEventsTable: process.env.SUPABASE_SUBSCRIPTION_EVENTS_TABLE || "axion_subscription_events",
  supabaseAccessGrantsTable: process.env.SUPABASE_ACCESS_GRANTS_TABLE || "axion_access_grants",
  inviteEmailFrom: process.env.INVITE_EMAIL_FROM || "",
  salesNotificationTo: process.env.SALES_NOTIFICATION_TO || "",
  smtpHost: process.env.SMTP_HOST || "",
  smtpPort: Number(process.env.SMTP_PORT || 587),
  smtpUser: process.env.SMTP_USER || "",
  smtpPassword: process.env.SMTP_PASSWORD || "",
  resendApiKey: process.env.RESEND_API_KEY || "",
  cfdWorkerUrl: (process.env.CFD_WORKER_URL || "").replace(/\/+$/, ""),
  cfdWorkerToken: process.env.CFD_WORKER_TOKEN || "",
  nextjsBffUrl: (process.env.NEXTJS_BFF_URL || "").replace(/\/+$/, ""),
  openaiApiKey: process.env.AXION_DISABLE_OPENAI === "true" ? "" : process.env.OPENAI_API_KEY || "",
  openaiModel: process.env.OPENAI_MODEL || "gpt-4.1-mini",
  githubApiBaseUrl: (process.env.GITHUB_API_BASE_URL || "https://api.github.com").replace(/\/+$/, ""),
  automationGatewayUrl: (process.env.AUTOMATION_GATEWAY_URL || "").replace(/\/+$/, ""),
  automationGatewayToken: process.env.AUTOMATION_GATEWAY_TOKEN || "",
  automationWritesEnabled: process.env.AXION_AUTOMATION_WRITES_ENABLED === "true",
  automationIngestToken: process.env.AXION_AUTOMATION_INGEST_TOKEN || "",
  automationIngestOwner: normalizePrincipal(process.env.AXION_AUTOMATION_INGEST_OWNER || ""),
  requireProductionConfig: process.env.AXION_REQUIRE_PRODUCTION_CONFIG === "true",
  pythonExecutable: process.env.AXION_PYTHON || "python3",
  pythonRunTimeoutMs: Number(process.env.AXION_PYTHON_TIMEOUT_MS || 15000),
  scientificDataTimeoutMs: Number(process.env.AXION_SCIENTIFIC_DATA_TIMEOUT_MS || 9000),
  scientificDataCacheTtlMs: Number(process.env.AXION_SCIENTIFIC_DATA_CACHE_TTL_MS || 15 * 60 * 1000),
};

const billingPlans = Object.freeze([
  {
    id: "academic",
    name: "Research",
    audience: "Individual academic research",
    priceCents: config.academicPriceCents,
    seats: 1,
    stripePriceId: config.stripeAcademicPriceId,
    highlighted: false,
  },
  {
    id: "professional",
    name: "Professional",
    audience: "Professional process engineering",
    priceCents: config.priceCents,
    seats: 1,
    stripePriceId: config.stripeProfessionalPriceId,
    highlighted: true,
  },
  {
    id: "team",
    name: "Engineering Team",
    audience: "Shared models and governed reviews",
    priceCents: config.teamPriceCents,
    seats: 5,
    stripePriceId: config.stripeTeamPriceId,
    highlighted: false,
  },
  {
    id: "enterprise",
    name: "Enterprise Site",
    audience: "Site-wide engineering and integration",
    priceCents: config.enterprisePriceCents,
    seats: 20,
    stripePriceId: config.stripeEnterprisePriceId,
    highlighted: false,
  },
]);

const featureCatalogue = Object.freeze({
  core_modeling: { label: "Flowsheet and equipment modelling", minimumPlan: "academic" },
  mass_energy_balances: { label: "Mass and energy balances", minimumPlan: "academic" },
  dynamic_simulation: { label: "ODE and PDE simulation", minimumPlan: "academic" },
  engineering_exports: { label: "Engineering exports", minimumPlan: "academic" },
  scheduling: { label: "Finite-capacity scheduling", minimumPlan: "professional" },
  tea_lca: { label: "TEA and LCA", minimumPlan: "professional" },
  cfd_screening: { label: "Bioreactor CFD screening", minimumPlan: "professional" },
  company_data_ingestion: { label: "Company data ingestion", minimumPlan: "professional" },
  branches_versions: { label: "Branches and model versions", minimumPlan: "professional" },
  ai_command_engine: { label: "AI command engine", minimumPlan: "professional" },
  collaboration: { label: "Multi-user collaboration", minimumPlan: "team" },
  api_connectors: { label: "API connector registry", minimumPlan: "team" },
  cfd_worker_jobs: { label: "Validated CFD worker jobs", minimumPlan: "enterprise" },
  automation_opcua: { label: "OPC UA and plant automation", minimumPlan: "enterprise" },
  priority_support: { label: "Priority engineering support", minimumPlan: "team" },
});

const planFeatureLimits = Object.freeze({
  academic: { dynamic_simulation: 25, engineering_exports: 25, collaboration: 1 },
  professional: { dynamic_simulation: 250, engineering_exports: 250, cfd_screening: 50, company_data_ingestion: 20, branches_versions: 100, ai_command_engine: 250, collaboration: 1 },
  team: { dynamic_simulation: 2000, engineering_exports: 2000, cfd_screening: 500, company_data_ingestion: 250, branches_versions: 1000, ai_command_engine: 2500, collaboration: 5, api_connectors: 25 },
  enterprise: { collaboration: 20 },
});

function planRank(planId = "") {
  return ["academic", "professional", "team", "enterprise"].indexOf(String(planId || "").toLowerCase());
}

function planEntitlements(planId = "") {
  const normalizedPlan = billingPlan(planId)?.id || "";
  const currentRank = planRank(normalizedPlan);
  return Object.fromEntries(Object.entries(featureCatalogue).map(([key, feature]) => {
    const enabled = currentRank >= planRank(feature.minimumPlan);
    const limit = enabled ? planFeatureLimits[normalizedPlan]?.[key] ?? null : null;
    return [key, { key, label: feature.label, enabled, limit, minimumPlan: feature.minimumPlan }];
  }));
}

function entitlementSnapshotForSession(session = {}) {
  const allAccess = session.role === "admin" || Boolean(session.paymentExempt);
  const features = allAccess
    ? Object.fromEntries(Object.entries(featureCatalogue).map(([key, feature]) => [key, { key, label: feature.label, enabled: true, limit: null, minimumPlan: feature.minimumPlan }]))
    : planEntitlements(session.planId);
  return {
    planId: session.planId || (allAccess ? "internal" : ""),
    allAccess,
    features,
  };
}

function sessionHasFeature(session, featureKey) {
  return Boolean(entitlementSnapshotForSession(session).features[featureKey]?.enabled);
}

async function requireFeature(req, res, featureKey) {
  const verifiedSession = verifySession(getBearer(req));
  let session = verifiedSession;
  let entitlements = entitlementSnapshotForSession(session || {});
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return null;
  }
  if (session.role !== "admin" && !session.paymentExempt) {
    const db = ensureDbShape(await loadDb());
    const license = db.licenses.find((item) =>
      (session.licenseKey && item.key === session.licenseKey)
      || (session.email && normalizePrincipal(item.customerEmail) === normalizePrincipal(session.email)));
    if (!license || license.status !== "active") {
      json(res, 402, { error: "The subscription is not active. Update billing before using this function.", code: "SUBSCRIPTION_INACTIVE" });
      return null;
    }
    session = { ...session, planId: license.planId || session.planId, billingStatus: license.billingStatus || session.billingStatus };
    entitlements = await resolvedEntitlementsForSession(session, license);
    if (entitlements.contractStatus && !["active", "trialing", "past_due"].includes(entitlements.contractStatus)) {
      json(res, 402, { error: "The Supabase contract is not active. Update billing before using this function.", code: "CONTRACT_INACTIVE", contractStatus: entitlements.contractStatus });
      return null;
    }
    session = { ...session, planId: entitlements.planId || session.planId };
  }
  if (!entitlements.features[featureKey]?.enabled) {
    const feature = featureCatalogue[featureKey];
    const minimum = billingPlan(feature?.minimumPlan);
    json(res, 403, {
      error: `${feature?.label || "This function"} is not included in the current plan.`,
      code: "FEATURE_NOT_INCLUDED",
      feature: featureKey,
      currentPlan: session.planId || "workspace",
      requiredPlan: minimum?.id || feature?.minimumPlan || "enterprise",
      requiredPlanName: minimum?.name || "Enterprise Site",
    });
    return null;
  }
  return session;
}

function billingPlan(planId = "professional") {
  return billingPlans.find((plan) => plan.id === String(planId || "").toLowerCase()) || null;
}

function publicBillingPlans() {
  return billingPlans.map(({ stripePriceId, ...plan }) => ({
    ...plan,
    entitlements: planEntitlements(plan.id),
    amount: plan.priceCents / 100,
    amountFormatted: new Intl.NumberFormat("de-DE", { style: "currency", currency: config.currency, maximumFractionDigits: 0 }).format(plan.priceCents / 100),
    interval: "month",
    checkoutConfigured: Boolean(config.stripeSecretKey),
    providerPriceConfigured: Boolean(stripePriceId),
  }));
}

const staticRootDir = process.env.AXION_STATIC_DIR
  ? resolve(process.env.AXION_STATIC_DIR)
  : process.env.NODE_ENV === "production" && existsSync(join(rootDir, "dist", "index.html"))
    ? join(rootDir, "dist")
    : rootDir;

const staticTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".csv", "text/csv; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".ico", "image/x-icon"],
]);

const seoRouteMeta = Object.freeze({
  "/": {
    title: "Bioprocess Engineering Software for Process Development & MSAT | Axion",
    description: "One shared engineering model for process development, MSAT, plant engineering and TEA/LCA teams, from flowsheet and scale-up through scheduling and investment review.",
    faq: [
      { question: "Who should use Axion Process OS?", answer: "Axion is built for process-development, MSAT, manufacturing, plant-engineering, CDMO, TEA and LCA teams that need one traceable model for process design, facility capacity, cost, environmental impact and technical review." },
      { question: "What does an Axion model produce?", answer: "A project can produce an editable flowsheet, equipment and stream data, balances, dynamic profiles, schedules, capacity results, TEA and LCA datasets, sensitivities, source records, validation gaps and combined engineering exports." },
      { question: "Can Axion use company production data?", answer: "Yes. Customer-owned CSV and JSON datasets, historian exports, assays, supplier quotes, schedules and model parameters can be mapped to a project with units, sources, confidence and version context." },
    ],
  },
  "/product": {
    title: "Bioprocess Engineering Platform | Axion Process OS",
    description: "Build editable bioprocess flowsheets, equipment trains, balances, CFD screening models, schedules and engineering exports in one browser workspace.",
  },
  "/workflow": {
    title: "Bioprocess Design Workflow | Axion Process OS",
    description: "Move from product brief to process model, simulation, scheduling, TEA, LCA and technical review in one connected engineering workflow.",
  },
  "/solutions": {
    title: "Bioprocess Engineering Solutions by Role & Industry | Axion",
    description: "Explore Axion solutions for process development, MSAT, plant engineering, TEA/LCA, biopharma, CDMOs, fermentation, food biotech and industrial manufacturing.",
  },
  "/resources": {
    title: "Free Bioprocess Engineering Templates & Guides | Axion",
    description: "Download practical bioprocess model-readiness, production-data and technical-pilot templates, with guides for simulation, scheduling, TEA and LCA.",
    faq: [
      {
        question: "What data is needed for a useful bioprocess model?",
        answer: "A useful model needs a defined product and process basis, component flows, operating mode, measured or sourced kinetics, equipment data, scheduling constraints, utility conditions, economic assumptions, uncertainty ranges, and explicit ownership for each source.",
      },
      {
        question: "How should a bioprocess simulation pilot be validated?",
        answer: "Agree acceptance criteria before modelling, then reconcile component mass balances, energy duties, equipment occupancy, cleaning and hold times, sensitivities, economics, sustainability outputs, and model traceability against an authorized reference case.",
      },
    ],
  },
  "/bioprocess-model-readiness": {
    title: "Bioprocess Model Readiness Checklist | Free CSV Template",
    description: "Download a practical checklist for balances, kinetics, equipment, scheduling, utilities, TEA, LCA, controls, validation and source ownership.",
  },
  "/bioprocess-simulation-software": {
    title: "Bioprocess Simulation Software for Scale-Up & Design | Axion",
    description: "Connect flowsheets, mass and energy balances, reactions, ODE/PDE dynamics, physical limits, equipment duties and uncertainty in one browser model.",
    image: "/assets/product/axion-flowsheet-workspace.png",
    audience: "Process development, scale-up, and process systems engineering teams",
    faq: [
      { question: "Which production modes can Axion model?", answer: "Axion supports batch, fed-batch, perfusion, continuous, and hybrid process architectures, with mode-specific balances, harvest logic, schedules, and economic assumptions." },
      { question: "Does Axion replace experimental validation?", answer: "No. Axion distinguishes screening assumptions from measured and validated models. Scale-up, safety-critical, regulated, or investment decisions require an agreed validation plan and customer-owned evidence." },
    ],
  },
  "/biomanufacturing-scheduling-software": {
    title: "Biomanufacturing Scheduling & Capacity Planning Software | Axion",
    description: "Schedule reactors, downstream equipment, rooms, utilities, operators, CIP/SIP, maintenance and campaigns to quantify facility capacity and bottlenecks.",
    image: "/assets/photography/industrial-fermenters-15000l.jpg",
    audience: "MSAT, manufacturing, capacity planning, and facility engineering teams",
    faq: [
      { question: "What constraints can the Axion scheduler represent?", answer: "The scheduling model represents equipment occupancy, predecessors, setup, transfer, processing, CIP and SIP, maintenance, rooms, operators, utilities, inventories, hold times, release queues, and campaign changeovers." },
      { question: "Can equipment be reused across multiple batches?", answer: "Yes. Reusable equipment pools cycle through setup, production, transfer, cleaning, sterilization, maintenance, and available states across repeated batches or campaigns." },
    ],
  },
  "/bioprocess-tea-lca-software": {
    title: "Bioprocess TEA & LCA Software with Sensitivity Analysis | Axion",
    description: "Trace media, materials, utilities, labor, waste, equipment and facility assumptions through detailed TEA, LCA, intervals and sensitivity exports.",
    image: "/assets/product/axion-tea-lca.png",
    audience: "Techno-economic analysis, sustainability, strategy, and investment teams",
    faq: [
      { question: "What does the Axion TEA export include?", answer: "The engineering workbook includes assumptions, stream inventories, material and consumable demand, equipment and facility cost bases, labor, utilities, waste, annual cash flow, uncertainty ranges, sensitivities, and source ownership." },
      { question: "How are uncertain values handled?", answer: "Axion records low, base, and high values with units, sources, confidence, and validity domains and exposes long-form sensitivity data for further statistical analysis." },
    ],
  },
  "/biopharma-process-simulation": {
    title: "Biopharma Process Simulation for mAbs, Vaccines & Facility Fit | Axion",
    description: "Model upstream, downstream, viral safety, formulation, filling, utilities, cleaning, scheduling, facility fit and COGS in one biopharma engineering workspace.",
    image: "/assets/photography/vaccine-bioreactor-plant.jpg",
    audience: "Biopharma process development, MSAT, CDMO, and plant engineering teams",
  },
  "/fermentation-process-modeling": {
    title: "Fermentation Process Modelling for Scale-Up, TEA & LCA | Axion",
    description: "Model aerobic fermentation, oxygen and heat transfer, feed strategy, recovery, drying, utilities, wastewater, TEA and LCA for industrial biotechnology.",
    image: "/assets/photography/industrial-fermenters-15000l.jpg",
    audience: "Precision fermentation, food biotech, enzyme, and industrial biotechnology teams",
  },
  "/superpro-designer-alternative": {
    title: "SuperPro Designer Alternative for Bioprocess Engineering | Axion",
    description: "Compare Axion Process OS with SuperPro Designer for browser collaboration, flowsheets, scheduling, APIs, TEA/LCA, versioning and engineering decision workflows.",
    faq: [
      {
        question: "Is Axion Process OS a direct replacement for SuperPro Designer?",
        answer: "Axion is a browser-first engineering workspace with native flowsheets, balances, dynamic models, scheduling, CFD screening, TEA and LCA, versions, data ingestion, and exports. Teams should compare one customer-owned reference process before replacing a validated workflow.",
      },
      {
        question: "Can Axion import existing SuperPro Designer files?",
        answer: "Axion does not copy or decode proprietary model formats. Teams can reconstruct an authorized reference process from their own stream tables, equipment data, assumptions, and exported results and reconcile it against an approved baseline.",
      },
      {
        question: "Who should evaluate Axion Process OS?",
        answer: "Process-development, MSAT, manufacturing, plant-engineering, CDMO, TEA and LCA, food-biotech, fermentation, and technical-consulting teams that need collaboration, traceability, scenario comparison, and connected engineering outputs.",
      },
    ],
  },
  "/superpro-designer-migration": {
    title: "SuperPro Designer Migration & Validation Benchmark | Axion",
    description: "Benchmark one authorized SuperPro Designer reference process against Axion using explicit acceptance criteria for balances, scheduling, TEA/LCA, exports, traceability and collaboration.",
    image: "/assets/product/axion-plant-overview.png",
    audience: "Teams evaluating a controlled migration from an established process-modelling workflow",
    faq: [
      { question: "Does Axion import proprietary SuperPro Designer files?", answer: "Axion does not copy or decode proprietary model formats. A migration pilot uses customer-owned and authorized exports, stream tables, equipment data, assumptions, and reference results." },
      { question: "How is a migration benchmark accepted?", answer: "The team agrees tolerances and acceptance criteria before modelling, reconciles every material difference, and expands only the workflows that pass technical, governance, and data-handling review." },
    ],
  },
  "/security": {
    title: "Security and Production Architecture | Axion Process OS",
    description: "Review the security, identity, data, payment, deployment and validated-compute architecture behind Axion Process OS.",
  },
  "/faq": {
    title: "Bioprocess Engineering Software FAQ | Axion Process OS",
    description: "Clear answers about Axion Process OS, supported bioprocesses, modelling depth, validation, data imports, security, subscriptions, CFD, TEA, LCA and migration.",
    image: "/assets/product/axion-flowsheet-workspace.png",
    audience: "Process development, MSAT, manufacturing, plant engineering, TEA, LCA and technical decision teams",
    faq: [
      { question: "What is Axion Process OS?", answer: "Axion is a browser-based bioprocess engineering workspace that connects process flowsheets, balances, dynamic models, facility scheduling, CFD screening, TEA, LCA, source evidence, versions and exports around one project model." },
      { question: "Which production modes can Axion model?", answer: "Axion supports batch, fed-batch, perfusion, continuous and hybrid process architectures with mode-specific material balances, dynamic profiles, harvest logic, schedules and economic assumptions." },
      { question: "Is the Axion CFD view a validated CFD solver?", answer: "The in-app CFD view is an interactive engineering screen. Validated three-dimensional CFD requires a verified mesh, numerical settings, material models, convergence evidence and an external CFD worker such as OpenFOAM." },
      { question: "Can companies upload their own production data?", answer: "Yes. Projects accept customer-owned historian series, batch records, assays, recipes, schedules, utilities, TEA and LCA inventories and supplier quotes through structured CSV and JSON ingestion workflows." },
      { question: "How are Axion subscriptions paid?", answer: "Research and Professional subscriptions accept credit and debit cards through Stripe-hosted Checkout. Team, Site and private contracts can also use invoice billing after company details are confirmed. Axion stores no card credentials." },
      { question: "Does Axion replace engineering validation?", answer: "No. Axion distinguishes screening, calibrated and decision-ready evidence. Qualified engineers remain responsible for safety, GMP, regulatory, equipment, validation and investment decisions." },
    ],
  },
  "/pricing": {
    title: "Axion Process OS Pricing | Professional Bioprocess Modelling",
    description: "Compare monthly Axion Process OS plans for research, professional bioprocess modelling, engineering teams and governed enterprise sites.",
    faq: [
      { question: "How does Axion subscription payment work?", answer: "Choose a monthly plan and pay by credit or debit card through Stripe-hosted Checkout. Team, Site and private contracts can request invoice billing. Axion activates workspace access after payment or an approved contract is confirmed." },
      { question: "Can an Axion subscription be cancelled?", answer: "Yes. Active customers can use the Stripe customer portal from their Axion profile to manage payment methods, invoices and cancellation." },
      { question: "Does Axion store card or bank details?", answer: "No. Payment credentials are entered and stored with Stripe. Axion receives the verified customer and subscription status required for access control." },
    ],
  },
  "/pilot": {
    title: "Request a Technical Bioprocess Pilot | Axion Process OS",
    description: "Evaluate Axion Process OS with one customer-owned bioprocess, dataset, scale-up question, or facility decision before choosing a subscription.",
  },
  "/legal": {
    title: "Impressum, Privacy and Terms | Axion Process OS",
    description: "Read provider information, privacy, subscription, and engineering-use terms for Axion Process OS.",
  },
  "/brand": {
    title: "Axion Process OS Brand Assets and Corporate Identity",
    description: "Download official Axion Process OS SVG logos and review the industrial color, typography, spacing, and usage system.",
  },
  "/login": {
    title: "Sign in or Start Axion Professional | Axion Process OS",
    description: "Sign in to Axion Process OS or start a professional bioprocess modelling workspace through secure Stripe Checkout.",
  },
});

function htmlAttribute(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderPublicHtml(pathname, indexPath) {
  const route = pathname === "/compare" ? "/superpro-designer-alternative" : pathname;
  const meta = seoRouteMeta[route] || seoRouteMeta["/"];
  const canonicalPath = route === "/" ? "/" : route;
  const canonicalUrl = new URL(canonicalPath, "https://ax-i-on.com").href;
  let html = readFileSync(indexPath, "utf8")
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${htmlAttribute(meta.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/i, `<meta name="description" content="${htmlAttribute(meta.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/i, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/i, `<meta property="og:title" content="${htmlAttribute(meta.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/i, `<meta property="og:description" content="${htmlAttribute(meta.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/i, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta property="og:image" content="[^"]*"\s*\/>/i, `<meta property="og:image" content="${new URL(meta.image || "/assets/photography/weihenstephan-kombikeller-1600.jpg", "https://ax-i-on.com").href}" />`)
    .replace(/<meta name="twitter:card" content="[^"]*"\s*\/>/i, `<meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${htmlAttribute(meta.title)}" /><meta name="twitter:description" content="${htmlAttribute(meta.description)}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*"\s*\/>/i, `<meta name="twitter:image" content="${new URL(meta.image || "/assets/photography/weihenstephan-kombikeller-1600.jpg", "https://ax-i-on.com").href}" />`);
  const verificationTags = [
    config.googleSiteVerification ? `<meta name="google-site-verification" content="${htmlAttribute(config.googleSiteVerification)}" />` : "",
    config.bingSiteVerification ? `<meta name="msvalidate.01" content="${htmlAttribute(config.bingSiteVerification)}" />` : "",
  ].filter(Boolean).join("");
  if (verificationTags) html = html.replace("</head>", `${verificationTags}</head>`);
  const structuredData = [];
  if (route !== "/") {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Axion Process OS", item: "https://ax-i-on.com/" },
        { "@type": "ListItem", position: 2, name: meta.title.split("|")[0].trim(), item: canonicalUrl },
      ],
    });
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: meta.title.split("|")[0].trim(),
      url: canonicalUrl,
      description: meta.description,
      audience: meta.audience ? { "@type": "BusinessAudience", audienceType: meta.audience } : undefined,
      isPartOf: { "@id": "https://ax-i-on.com/#website" },
      about: { "@id": "https://ax-i-on.com/#software" },
    });
  }
  if (meta.faq?.length) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      url: canonicalUrl,
      mainEntity: meta.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    };
    structuredData.push(faqSchema);
  }
  if (structuredData.length) {
    const schemaTags = structuredData
      .map((schema) => `    <script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>`)
      .join("\n");
    html = html.replace("</head>", `${schemaTags}\n  </head>`);
  }
  return html;
}

const defaultDb = {
  users: [],
  foundingAccounts: [],
  orders: [],
  licenses: [],
  projects: [],
  projectVersions: [],
  projectBranches: [],
  invites: [],
  projectBriefs: [],
  datasets: [],
  simulationRuns: [],
  connectorRuns: [],
  cfdJobs: [],
  commandPlans: [],
  githubConnections: [],
  personalIntegrations: [],
  automationConnections: [],
  automationTelemetry: [],
  automationControlLoops: [],
  automationActions: [],
  automationCommissioningRuns: [],
  leads: [],
  stripeEvents: [],
  audit: [],
};

const publicSubmissionWindows = new Map();
const scientificDataCache = new Map();

function backendFeatures() {
  return [
    "Monthly Research, Professional, Engineering Team and Enterprise Site subscriptions",
    "Stripe-hosted subscription payment flow",
    "Customer billing portal for invoices, payment methods and cancellation",
    "Automatic license-key generation after successful payment",
    "Stripe webhook activation",
    "Checkout-session verification fallback",
    "Server-side login tokens",
    "Google OAuth login with backend token verification",
    "Multi-user project workspaces",
    "Project archives for old model versions",
    "Username/email invitations for collaboration",
    "External integration registry for modelling and data tools",
    "User-scoped GitHub repository sync for personal JSON and OpenAPI connector definitions",
    "REST API and JSON model handoff architecture",
    "Optional Next.js backend-for-frontend adapter for production app-edge deployment",
    "Python modelling runtime for dynamic bioprocess screening",
    "Academic source library for model assumptions",
    "Dataset registry for uploaded experimental, historian, TEA and LCA data",
    "Company data ingestion for CSV and JSON bioreactor, historian, TEA, LCA, supplier, QC and schedule datasets",
    "Python SDK and webhook-ready integration targets",
    "Cloud run, parameter sweep, Monte Carlo and scenario-run roadmap",
    "Live-data, historian, LIMS, ERP and vendor-quote connector registry",
    "OPC UA edge-gateway, SCADA and historian telemetry ingestion",
    "Audited PID-style control-loop workspace with observe, advisory and closed-loop modes",
    "Versioned process models with project archives and collaboration roles",
    "AI command planning with safe model operations, project versions and undo-ready audit trail",
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
    amountFormatted: new Intl.NumberFormat("de-DE", { style: "currency", currency: config.currency, maximumFractionDigits: 0 }).format(amount),
    currency: config.currency,
    plans: publicBillingPlans(),
    features: backendFeatures(),
    auth: {
      googleEnabled: Boolean(config.googleClientId),
    },
    payments: {
      provider: config.stripeSecretKey ? "stripe" : "setup_required",
      stripeEnabled: Boolean(config.stripeSecretKey),
      automaticActivation: Boolean(config.stripeSecretKey),
      billingMode: config.stripeBillingMode,
      interval: config.stripeBillingMode === "subscription" ? "month" : "one-time",
      customerPortal: Boolean(config.stripeSecretKey),
      automaticTax: config.stripeAutomaticTax,
      liveMode: /^sk_live_/.test(config.stripeSecretKey),
      webhookConfigured: Boolean(config.stripeWebhookSecret),
      providerPricesConfigured: billingPlans.every((plan) => Boolean(plan.stripePriceId)),
    },
    backend: {
      currentStorage: supabaseConfigured() ? `Supabase/Postgres: model documents plus normalized customers, contracts, users and entitlements` : "local JSON files in .data/models",
      recommendedProductionDataApp: "Supabase Postgres + Supabase Storage, or managed Postgres on Render/Fly/Railway plus S3-compatible object storage",
      pythonRuntime: config.pythonExecutable,
      modellingEndpoint: "/api/model-runs/python",
      academicSourcesEndpoint: "/api/sources/academic",
      dataArchitectureEndpoint: "/api/data/architecture",
      backendProcessesEndpoint: "/api/backend/processes",
      professionalReadinessEndpoint: "/api/professional-readiness",
      serviceStatusEndpoint: "/api/services/status",
      serviceProbeEndpoint: "/api/services/{openai|supabase|stripe|cfd}/probe",
      auditEndpoint: "/api/audit",
      commandPlanEndpoint: "/api/commands/plan",
      commandApplyEndpoint: "/api/commands/{planId}/apply",
      commandUndoEndpoint: "/api/commands/undo",
      automationStateEndpoint: "/api/automation/state",
      automationConnectionEndpoint: "/api/automation/connections",
      automationTelemetryEndpoint: "/api/automation/telemetry",
      automationEdgeStatusEndpoint: "/api/automation/edge-status",
      automationControlEndpoint: "/api/automation/control-loops",
      automationCommissioningEndpoint: "/api/automation/commissioning/run",
      billingPortalEndpoint: "/api/billing/portal",
      nextjsBffUrl: config.nextjsBffUrl || "",
      inviteEmailConfigured: emailConfigured(),
      aiCommandPlanner: Boolean(config.openaiApiKey),
      automationGateway: Boolean((config.automationGatewayUrl && config.automationGatewayToken) || (config.automationIngestToken && config.automationIngestOwner)),
      automationMachineIngest: Boolean(config.automationIngestToken && config.automationIngestOwner),
      physicalAutomationWrites: config.automationWritesEnabled,
    },
  };
}

function supabaseConfigured() {
  return Boolean(config.supabaseUrl && config.supabaseServiceRoleKey);
}

function emailConfigured() {
  return Boolean(config.resendApiKey && config.inviteEmailFrom) || Boolean(config.smtpHost && config.smtpUser && config.smtpPassword && config.inviteEmailFrom);
}

function escapeEmailHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function sendTransactionalEmail({ to, subject, html, text }) {
  if (!emailConfigured() || !String(to || "").includes("@")) {
    return { delivered: false, provider: "none", reason: "Email delivery is not configured." };
  }
  if (config.resendApiKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${config.resendApiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ from: config.inviteEmailFrom, to, subject, html, text }),
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.message || payload.error || `Resend failed with ${response.status}`);
    return { delivered: true, provider: "resend", id: payload.id || "" };
  }
  if (config.smtpHost && config.smtpUser && config.smtpPassword) {
    const nodemailer = await import("nodemailer");
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpPort === 465,
      auth: { user: config.smtpUser, pass: config.smtpPassword },
    });
    const result = await transporter.sendMail({ from: config.inviteEmailFrom, to, subject, html, text });
    return { delivered: true, provider: "smtp", id: result.messageId || "" };
  }
  return { delivered: false, provider: "none", reason: "No production email provider is configured." };
}

function productionReadiness() {
  const isHttps = config.appBaseUrl.startsWith("https://");
  const productionRuntime = process.env.NODE_ENV === "production";
  const sessionSecretReady = Boolean(config.sessionSecret && config.sessionSecret !== "axion-local-dev-secret" && config.sessionSecret.length >= 32);
  const adminPasswordReady = Boolean(config.adminPassword && config.adminPassword !== "owner-local-password" && config.adminPassword.length >= 12);
  const openAiReady = Boolean(config.openaiApiKey && /^sk-/.test(config.openaiApiKey));
  const stripeKeyReady = productionRuntime
    ? /^sk_live_/.test(config.stripeSecretKey)
    : /^sk_(live|test)_/.test(config.stripeSecretKey);
  const stripeReady = Boolean(stripeKeyReady && config.stripeWebhookSecret && isHttps);
  const emailMissing = [];
  if (!config.inviteEmailFrom) emailMissing.push("INVITE_EMAIL_FROM");
  if (!config.salesNotificationTo) emailMissing.push("SALES_NOTIFICATION_TO");
  if (!config.resendApiKey && !(config.smtpHost && config.smtpUser && config.smtpPassword)) {
    emailMissing.push("RESEND_API_KEY or SMTP_HOST + SMTP_USER + SMTP_PASSWORD");
  }
  const checks = [
    {
      key: "postgres",
      label: "Supabase/Postgres database",
      ready: supabaseConfigured(),
      missing: ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"].filter((key) => !process.env[key]),
      requiresOwnerAction: true,
      requiresPaymentApproval: true,
      ownerAction: "Create a Supabase project, run supabase/schema.sql, and place the server-only URL and service-role key in the backend host secrets.",
    },
    {
      key: "stripe",
      label: "Stripe Checkout + webhook",
      ready: stripeReady,
      missing: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"].filter((key) => !process.env[key])
        .concat(isHttps ? [] : ["APP_BASE_URL must be https://..."])
        .concat(config.stripeSecretKey && !/^sk_(live|test)_/.test(config.stripeSecretKey) ? ["STRIPE_SECRET_KEY must look like a Stripe secret key"] : [])
        .concat(productionRuntime && /^sk_test_/.test(config.stripeSecretKey) ? ["STRIPE_SECRET_KEY must use Stripe live mode for real customer charges"] : []),
      requiresOwnerAction: true,
      requiresPaymentApproval: true,
      ownerAction: "Create the Stripe product/price, enable live payments when ready, add the webhook endpoint, and store the keys only as backend secrets.",
    },
    {
      key: "google",
      label: "Google OAuth login",
      ready: Boolean(config.googleClientId && isHttps),
      missing: [!config.googleClientId ? "GOOGLE_CLIENT_ID" : "", !isHttps ? "APP_BASE_URL must be https://..." : ""].filter(Boolean),
      requiresOwnerAction: true,
      requiresPaymentApproval: false,
      ownerAction: "Create a Google OAuth Web Application client and add the production HTTPS origin as an allowed JavaScript origin.",
    },
    {
      key: "email",
      label: "Invite + sales email delivery",
      ready: emailConfigured() && Boolean(config.salesNotificationTo),
      missing: emailMissing,
      requiresOwnerAction: true,
      requiresPaymentApproval: true,
      ownerAction: "Verify a sending domain in Resend or configure SMTP, then store the provider secret, sender address, and sales notification inbox in the backend host.",
    },
    {
      key: "deployment",
      label: "Public HTTPS deployment",
      ready: isHttps && config.host === "0.0.0.0",
      missing: [!isHttps ? "APP_BASE_URL must be public HTTPS" : "", config.host !== "0.0.0.0" ? "HOST=0.0.0.0 on production host" : ""].filter(Boolean),
      requiresOwnerAction: true,
      requiresPaymentApproval: true,
      ownerAction: "Deploy the backend to Render/Fly/Railway/AWS, attach a domain, configure DNS/TLS, and set APP_BASE_URL to that HTTPS URL.",
    },
    {
      key: "session-secret",
      label: "Private session signing secret",
      ready: sessionSecretReady,
      missing: sessionSecretReady ? [] : ["SESSION_SECRET must be private and at least 32 characters"],
      requiresOwnerAction: false,
      requiresPaymentApproval: false,
      ownerAction: "Generate a long random value in the backend host secret manager.",
    },
    {
      key: "admin-password",
      label: "Private owner/admin password",
      ready: adminPasswordReady,
      missing: adminPasswordReady ? [] : ["AXION_ADMIN_PASSWORD must be private and at least 12 characters"],
      requiresOwnerAction: false,
      requiresPaymentApproval: false,
      ownerAction: "Set a private admin password in the backend host; do not publish it in frontend code.",
    },
    {
      key: "nextjs-bff",
      label: "Next.js backend-for-frontend adapter",
      ready: Boolean(config.nextjsBffUrl && config.nextjsBffUrl.startsWith("https://")),
      missing: [!config.nextjsBffUrl ? "NEXTJS_BFF_URL" : "", config.nextjsBffUrl && !config.nextjsBffUrl.startsWith("https://") ? "NEXTJS_BFF_URL must be https://..." : ""].filter(Boolean),
      requiresOwnerAction: true,
      requiresPaymentApproval: true,
      ownerAction: "Deploy the optional Next.js app edge and point it at the Axion API core.",
    },
    {
      key: "ai-command-planner",
      label: "OpenAI command planner",
      ready: openAiReady,
      missing: ["OPENAI_API_KEY"].filter((key) => !process.env[key]).concat(config.openaiApiKey && !/^sk-/.test(config.openaiApiKey) ? ["OPENAI_API_KEY must look like an OpenAI project/API key"] : []),
      requiresOwnerAction: true,
      requiresPaymentApproval: true,
      ownerAction: "Keep the API key server-only, enable billing/quota in the OpenAI project, and set usage limits before production launch.",
    },
    {
      key: "cfd-worker",
      label: "External rigorous CFD worker",
      ready: Boolean(config.cfdWorkerUrl && config.cfdWorkerToken),
      missing: ["CFD_WORKER_URL", "CFD_WORKER_TOKEN"].filter((key) => !process.env[key]),
      requiresOwnerAction: true,
      requiresPaymentApproval: true,
      ownerAction: "Provision an OpenFOAM-capable worker/cluster, set the token-protected URL, and validate solver output before regulated use.",
    },
    {
      key: "automation-gateway",
      label: "PLC/SCADA edge gateway",
      ready: Boolean(config.automationIngestToken && config.automationIngestOwner),
      missing: ["AXION_AUTOMATION_INGEST_TOKEN", "AXION_AUTOMATION_INGEST_OWNER"].filter((key) => !process.env[key]),
      requiresOwnerAction: true,
      requiresPaymentApproval: true,
      ownerAction: "Deploy an OT-network edge gateway with trusted OPC UA certificates, read-only tags first, outbound TLS, and a reviewed allowlist before enabling any physical write.",
    },
    {
      key: "ci",
      label: "Tests/CI",
      ready: existsSync(join(rootDir, ".github", "workflows", "ci.yml")),
      missing: [],
      requiresOwnerAction: true,
      requiresPaymentApproval: false,
      ownerAction: "Enable GitHub Actions and Pages in repository settings after GitHub write auth is fixed.",
    },
  ];
  return {
    ready: checks.every((item) => item.ready || item.key === "cfd-worker" || item.key === "nextjs-bff"),
    checks,
    approvalSummary: {
      paymentApprovalRequiredFor: checks.filter((item) => item.requiresPaymentApproval && !item.ready).map((item) => item.key),
      ownerActionRequiredFor: checks.filter((item) => item.requiresOwnerAction && !item.ready).map((item) => item.key),
      note: "Codex can prepare code and configuration scaffolds. Account owners must approve paid provider resources, domains, live payment processing, billing/quota, and solver compute.",
    },
    note: "CFD worker is optional for current screening jobs, but required for validated external CFD. Secret values are never returned.",
  };
}

function serviceStatusFromReadiness() {
  const readiness = productionReadiness();
  const byKey = new Map(readiness.checks.map((item) => [item.key, item]));
  const publicUrl = config.appBaseUrl.startsWith("https://") ? config.appBaseUrl : "";
  return {
    generatedAt: new Date().toISOString(),
    productName: config.productName,
    publicUrl,
    requiredReady: readiness.ready,
    services: [
      {
        key: "github",
        label: "GitHub repository publishing",
        configured: false,
        status: "blocked-by-local-auth",
        safeDetail: "Local git push returned GitHub 403. Re-authenticate local GitHub credentials or reconnect the GitHub app with contents-write permission.",
      },
      {
        key: "supabase",
        label: "Supabase/Postgres",
        configured: byKey.get("postgres")?.ready || false,
        status: byKey.get("postgres")?.ready ? "ready" : "missing-secrets",
        safeDetail: supabaseConfigured() ? `Using model, customer, contract and entitlement tables in Supabase` : "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY on the backend host.",
      },
      {
        key: "stripe",
        label: "Stripe Checkout/paywall",
        configured: byKey.get("stripe")?.ready || false,
        status: byKey.get("stripe")?.ready ? "ready" : "missing-secrets-or-https",
        safeDetail: config.stripeSecretKey ? "Secret key is present; check STRIPE_WEBHOOK_SECRET and APP_BASE_URL. Plan-specific Stripe Price IDs are optional." : "Set STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET and public APP_BASE_URL. Plan-specific Stripe Price IDs are optional.",
      },
      {
        key: "google",
        label: "Google OAuth",
        configured: byKey.get("google")?.ready || false,
        status: byKey.get("google")?.ready ? "ready" : "missing-client-or-https",
        safeDetail: config.googleClientId ? "Client ID is present; APP_BASE_URL must match the authorized HTTPS origin." : "Create a Google Web Application OAuth Client ID and set GOOGLE_CLIENT_ID.",
      },
      {
        key: "email",
        label: "Invite email",
        configured: byKey.get("email")?.ready || false,
        status: byKey.get("email")?.ready ? "ready" : "missing-email-provider",
        safeDetail: config.resendApiKey ? "Resend configured." : config.smtpHost ? "SMTP configured." : "Set Resend or SMTP variables on the backend host.",
      },
      {
        key: "openai",
        label: "OpenAI command planner",
        configured: byKey.get("ai-command-planner")?.ready || false,
        status: byKey.get("ai-command-planner")?.ready ? "key-present" : "missing-key",
        safeDetail: byKey.get("ai-command-planner")?.ready ? "Key is present. Billing/quota must be active in the OpenAI Platform project." : "Set OPENAI_API_KEY on the backend host.",
      },
      {
        key: "cfd-worker",
        label: "External CFD worker",
        configured: byKey.get("cfd-worker")?.ready || false,
        status: byKey.get("cfd-worker")?.ready ? "connected-config-present" : "screening-only",
        safeDetail: byKey.get("cfd-worker")?.ready ? "CFD worker URL/token are configured; use /api/cfd/jobs for handoff/status." : "Set CFD_WORKER_URL and CFD_WORKER_TOKEN for rigorous external jobs.",
      },
      {
        key: "automation-gateway",
        label: "PLC/SCADA edge gateway",
        configured: byKey.get("automation-gateway")?.ready || false,
        status: byKey.get("automation-gateway")?.ready ? (config.automationWritesEnabled ? "gateway-plus-approved-writes" : "read-only-gateway") : "simulator-only",
        safeDetail: byKey.get("automation-gateway")?.ready
          ? `Gateway configured. Physical writes are ${config.automationWritesEnabled ? "backend-enabled but still approval-gated" : "locked"}.`
          : "Set AUTOMATION_GATEWAY_URL and AUTOMATION_GATEWAY_TOKEN. Keep AXION_AUTOMATION_WRITES_ENABLED=false until OT validation is complete.",
      },
    ],
    nextActions: readiness.checks
      .filter((item) => !item.ready && !["nextjs-bff"].includes(item.key))
      .map((item) => ({
        key: item.key,
        label: item.label,
        missing: item.missing,
        requiresOwnerAction: Boolean(item.requiresOwnerAction),
        requiresPaymentApproval: Boolean(item.requiresPaymentApproval),
        ownerAction: item.ownerAction || "",
      })),
  };
}

function professionalWebAppReadiness() {
  return {
    generatedAt: new Date().toISOString(),
    productName: config.productName,
    currentStage: "local engineering prototype with production-ready scaffolds",
    summary: "Axion has a serious product surface and a growing backend, but a professional SaaS web app also needs hosted infrastructure, durable data, verified payments, identity, monitoring, operational security, and validated compute services.",
    alreadyImplemented: [
      {
        area: "Product experience",
        details: "Public site, private workspace, process builder, equipment and stream editing, CFD screening, scheduling, economics, LCA/TEA exports, downloads, and command-based process changes.",
      },
      {
        area: "Backend API",
        details: "Node API for login, checkout handoff, projects, versions, collaborators, datasets, connectors, Python model runs, CFD jobs, audit events, provider status, and provider probes.",
      },
      {
        area: "Production scaffolds",
        details: "Supabase/Postgres adapter, Stripe webhook path, Google token verification, Resend/SMTP invites, Dockerfiles, Render blueprint, Next.js BFF adapter, and CFD worker contract.",
      },
    ],
    stillMissingBeforeProfessionalSaaS: [
      {
        area: "Identity and security",
        required: "Production OAuth, role-based access, password reset or passwordless auth, invite acceptance, session rotation, admin protection, secret management, rate limits, and security headers.",
        currentStatus: config.googleClientId ? "partially configured" : "needs provider setup",
        requiresPaymentApproval: false,
      },
      {
        area: "Persistent data",
        required: "Real Supabase/Postgres project, RLS policy review, object storage for uploads, backups, retention policy, account deletion, and migration scripts.",
        currentStatus: supabaseConfigured() ? "configured" : "needs provider setup",
        requiresPaymentApproval: true,
      },
      {
        area: "Billing",
        required: "Stripe live mode, product/price, webhook signing secret, subscription lifecycle, invoices, failed-payment handling, VAT/tax review, and customer portal.",
        currentStatus: config.stripeSecretKey ? "partially configured" : "needs provider setup",
        requiresPaymentApproval: true,
      },
      {
        area: "Deployment and domain",
        required: "Public HTTPS backend, custom domain, DNS, TLS, environment secrets, deploy previews, production smoke tests, rollback, and uptime monitoring.",
        currentStatus: config.appBaseUrl.startsWith("https://") ? "partially configured" : "needs public host/domain",
        requiresPaymentApproval: true,
      },
      {
        area: "AI and compute",
        required: "OpenAI project with billing/quota, usage limits, prompt/operation safety, real worker queue, retry/timeout handling, and observability.",
        currentStatus: config.openaiApiKey ? "key present; quota must be active" : "needs provider setup",
        requiresPaymentApproval: true,
      },
      {
        area: "Validated CFD",
        required: "OpenFOAM/COMSOL/STAR-CCM+ worker, geometry generation, meshing, MRF/turbulence models, residual criteria, field storage, and validation against measured kLa/mixing-time data.",
        currentStatus: config.cfdWorkerUrl ? "worker configured" : "screening only",
        requiresPaymentApproval: true,
      },
      {
        area: "Operations",
        required: "Monitoring, logs, alerts, error tracking, audit review, CI/CD gates, dependency updates, vulnerability scanning, backups, incident plan, and support workflow.",
        currentStatus: existsSync(join(rootDir, ".github", "workflows", "ci.yml")) ? "CI scaffold present" : "needs CI",
        requiresPaymentApproval: false,
      },
    ],
    endpointMap: {
      readiness: "/api/production-readiness",
      services: "/api/services/status",
      probes: "/api/services/{openai|supabase|stripe|cfd}/probe",
      audit: "/api/audit",
      smoke: "npm run smoke:production",
    },
  };
}

function assertProductionConfig() {
  if (!config.requireProductionConfig) return;
  const readiness = productionReadiness();
  const blocking = readiness.checks.filter((item) => !item.ready && !["cfd-worker", "nextjs-bff"].includes(item.key));
  if (!blocking.length) return;
  const details = blocking.map((item) => `${item.label}: ${item.missing.join(", ") || "not ready"}`).join("; ");
  throw new Error(`AXION_REQUIRE_PRODUCTION_CONFIG=true but production configuration is incomplete. ${details}`);
}

async function supabaseRequest(pathname, { method = "GET", body, headers = {} } = {}) {
  if (!supabaseConfigured()) {
    throw new Error("Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
  }
  const response = await fetch(`${config.supabaseUrl}/rest/v1/${pathname}`, {
    method,
    headers: {
      apikey: config.supabaseServiceRoleKey,
      authorization: `Bearer ${config.supabaseServiceRoleKey}`,
      "content-type": "application/json",
      prefer: "return=representation",
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;
  if (!response.ok) {
    throw new Error(payload?.message || payload?.error || `Supabase request failed with ${response.status}`);
  }
  return payload;
}

function stableCommerceNumber(prefix, identity) {
  const digest = createHash("sha256").update(String(identity || randomUUID()).trim().toLowerCase()).digest("hex").slice(0, 10).toUpperCase();
  return `AX-${prefix}-${digest}`;
}

function ensureCommerceIdentifiers(order = {}, license = null) {
  const identity = order.customerEmail || license?.customerEmail || order.id || license?.key;
  const customerNumber = order.customerNumber || license?.customerNumber || stableCommerceNumber("C", identity);
  const contractNumber = order.contractNumber || license?.contractNumber || stableCommerceNumber("K", order.id || license?.orderId || license?.key || identity);
  order.customerNumber = customerNumber;
  order.contractNumber = contractNumber;
  if (license) {
    license.customerNumber = customerNumber;
    license.contractNumber = contractNumber;
  }
  return { customerNumber, contractNumber };
}

function normalizedContractStatus(order = {}, license = {}) {
  const status = String(order.subscriptionStatus || license.billingStatus || order.status || license.status || "draft").toLowerCase();
  if (["active", "trialing", "past_due", "cancelled"].includes(status)) return status;
  if (["paid_active", "paid"].includes(status)) return "active";
  if (status.includes("past_due") || status.includes("action_required") || status.includes("payment_failed")) return "past_due";
  if (status.includes("cancel") || status.includes("delete")) return "cancelled";
  if (status.includes("suspend") || status.includes("pause") || status.includes("unpaid")) return "suspended";
  return "draft";
}

async function syncCommerceRecordToSupabase(order, license = null, user = null) {
  if (!supabaseConfigured() || !order) return null;
  const { customerNumber, contractNumber } = ensureCommerceIdentifiers(order, license);
  try {
    const customerRows = await supabaseRequest(`${config.supabaseCustomersTable}?on_conflict=customer_number`, {
      method: "POST",
      headers: { prefer: "resolution=merge-duplicates,return=representation" },
      body: {
        customer_number: customerNumber,
        legal_name: order.company || license?.company || order.customerName || license?.customerName || "Axion customer",
        display_name: order.company || license?.company || order.customerName || license?.customerName || "Axion customer",
        billing_email: String(order.customerEmail || license?.customerEmail || user?.email || "").toLowerCase(),
        stripe_customer_id: order.stripeCustomerId || license?.stripeCustomerId || null,
        status: normalizedContractStatus(order, license) === "cancelled" ? "cancelled" : normalizedContractStatus(order, license) === "suspended" ? "suspended" : normalizedContractStatus(order, license) === "past_due" ? "past_due" : order.status === "pending_stripe_checkout" ? "lead" : "active",
        metadata: { source: "axion-backend", orderId: order.id || license?.orderId || "" },
      },
    });
    const customer = Array.isArray(customerRows) ? customerRows[0] : null;
    if (!customer?.id) throw new Error("Supabase customer upsert did not return an id.");
    const contractRows = await supabaseRequest(`${config.supabaseContractsTable}?on_conflict=contract_number`, {
      method: "POST",
      headers: { prefer: "resolution=merge-duplicates,return=representation" },
      body: {
        contract_number: contractNumber,
        customer_id: customer.id,
        plan_id: order.planId || license?.planId || "professional",
        plan_name: order.planName || license?.planName || billingPlan(order.planId || license?.planId)?.name || "Professional",
        status: normalizedContractStatus(order, license),
        seat_limit: Math.max(1, Number(order.seats || license?.seats || 1)),
        billing_interval: order.billingMode === "payment" ? "one_time" : "month",
        currency: order.currency || config.currency,
        amount: Math.max(0, Number(order.amount || 0)),
        stripe_subscription_id: order.stripeSubscriptionId || license?.stripeSubscriptionId || null,
        valid_from: order.paidAt || license?.createdAt || null,
        current_period_end: order.currentPeriodEnd || license?.currentPeriodEnd || null,
        metadata: { orderId: order.id || license?.orderId || "", licenseKeyAssigned: Boolean(license?.key || order.licenseKey) },
      },
    });
    const contract = Array.isArray(contractRows) ? contractRows[0] : null;
    const email = String(user?.email || order.customerEmail || license?.customerEmail || "").toLowerCase();
    if (email) {
      await supabaseRequest(`${config.supabaseCustomerUsersTable}?on_conflict=customer_id,email`, {
        method: "POST",
        headers: { prefer: "resolution=merge-duplicates,return=representation" },
        body: {
          customer_id: customer.id,
          user_id: user?.id || null,
          email,
          username: user?.username || email.split("@")[0],
          role: "owner",
          status: normalizedContractStatus(order, license) === "suspended" ? "suspended" : "active",
        },
      });
    }
    return { customer, contract };
  } catch (error) {
    console.warn(`Supabase customer/contract sync failed: ${error.message}`);
    return null;
  }
}

async function recordSubscriptionEventToSupabase(event, commerceRecord = null) {
  if (!supabaseConfigured() || !event?.type) return;
  try {
    const object = event.data?.object || {};
    await supabaseRequest(`${config.supabaseSubscriptionEventsTable}?on_conflict=provider_event_id`, {
      method: "POST",
      headers: { prefer: "resolution=merge-duplicates,return=minimal" },
      body: {
        customer_id: commerceRecord?.customer?.id || null,
        contract_id: commerceRecord?.contract?.id || null,
        provider: "stripe",
        provider_event_id: event.id || stableCommerceNumber("E", `${event.type}:${object.id || Date.now()}`),
        event_type: event.type,
        payload: {
          objectId: object.id || "",
          status: object.status || object.payment_status || "",
          customerId: typeof object.customer === "string" ? object.customer : object.customer?.id || "",
          subscriptionId: typeof object.subscription === "string" ? object.subscription : object.subscription?.id || "",
          planId: object.metadata?.planId || "",
        },
      },
    });
  } catch (error) {
    console.warn(`Supabase subscription-event sync failed: ${error.message}`);
  }
}

async function supabaseContractContext(license) {
  if (!supabaseConfigured() || !license?.customerNumber) return null;
  try {
    const customerRows = await supabaseRequest(`${config.supabaseCustomersTable}?customer_number=eq.${encodeURIComponent(license.customerNumber)}&select=id,customer_number,status&limit=1`);
    const customer = customerRows?.[0];
    if (!customer) return null;
    const contractFilter = license.contractNumber
      ? `contract_number=eq.${encodeURIComponent(license.contractNumber)}`
      : `customer_id=eq.${encodeURIComponent(customer.id)}`;
    const contractRows = await supabaseRequest(`${config.supabaseContractsTable}?${contractFilter}&select=*&order=updated_at.desc&limit=1`);
    const contract = contractRows?.[0];
    if (!contract) return null;
    const [planRows, overrideRows] = await Promise.all([
      supabaseRequest(`${config.supabasePlanEntitlementsTable}?plan_id=eq.${encodeURIComponent(contract.plan_id)}&select=feature_key,feature_label,enabled,limit_value`),
      supabaseRequest(`${config.supabaseEntitlementOverridesTable}?customer_id=eq.${encodeURIComponent(customer.id)}&select=feature_key,enabled,limit_value,valid_until`),
    ]);
    const now = Date.now();
    const overrides = new Map(overrideRows
      .filter((item) => !item.valid_until || new Date(item.valid_until).getTime() > now)
      .map((item) => [item.feature_key, item]));
    const features = Object.fromEntries(Object.entries(featureCatalogue).map(([key, definition]) => {
      const planRow = planRows.find((item) => item.feature_key === key);
      const override = overrides.get(key);
      return [key, {
        key,
        label: planRow?.feature_label || definition.label,
        enabled: override?.enabled ?? planRow?.enabled ?? false,
        limit: override?.limit_value ?? planRow?.limit_value ?? null,
        minimumPlan: definition.minimumPlan,
      }];
    }));
    return { customer, contract, features };
  } catch (error) {
    console.warn(`Supabase entitlement lookup failed, using signed-session plan: ${error.message}`);
    return null;
  }
}

async function resolvedEntitlementsForSession(session, license = null) {
  if (session.role === "admin" || session.paymentExempt) return entitlementSnapshotForSession(session);
  const context = await supabaseContractContext(license);
  if (!context) return entitlementSnapshotForSession(session);
  return {
    planId: context.contract.plan_id,
    allAccess: false,
    contractStatus: context.contract.status,
    contractNumber: context.contract.contract_number,
    customerNumber: context.customer.customer_number,
    features: context.features,
  };
}

async function loadDbFromSupabase() {
  const rows = await supabaseRequest(`${config.supabaseStateTable}?id=eq.primary&select=payload&limit=1`);
  if (Array.isArray(rows) && rows[0]?.payload) {
    return ensureDbShape(rows[0].payload);
  }
  const seeded = ensureDbShape(structuredClone(defaultDb));
  await saveDbToSupabase(seeded);
  return seeded;
}

async function saveDbToSupabase(db) {
  const shaped = ensureDbShape(db);
  await supabaseRequest(config.supabaseStateTable, {
    method: "POST",
    headers: { prefer: "resolution=merge-duplicates,return=representation" },
    body: {
      id: "primary",
      payload: shaped,
      updated_at: new Date().toISOString(),
    },
  });
}

async function loadDb() {
  await mkdir(dataDir, { recursive: true });
  await mkdir(projectsDir, { recursive: true });
  await mkdir(archiveDir, { recursive: true });
  await mkdir(runsDir, { recursive: true });
  if (supabaseConfigured()) {
    try {
      return await loadDbFromSupabase();
    } catch (error) {
      console.warn(`Supabase load failed, falling back to local JSON: ${error.message}`);
    }
  }
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
  if (supabaseConfigured()) {
    try {
      await saveDbToSupabase(db);
      return;
    } catch (error) {
      console.warn(`Supabase save failed, falling back to local JSON: ${error.message}`);
    }
  }
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

function jsonDownload(res, filename, payload) {
  const body = `${JSON.stringify(payload, null, 2)}\n`;
  res.writeHead(200, {
    "content-type": "application/json; charset=utf-8",
    "content-disposition": `attachment; filename="${filename.replace(/[^a-z0-9._-]/gi, "-")}"`,
    "cache-control": "no-store",
  });
  res.end(body);
}

function parseBody(req) {
  return new Promise((resolveBody, rejectBody) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 12_000_000) {
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
    throw new Error("Stripe is not configured. Set STRIPE_SECRET_KEY on the backend; add STRIPE_WEBHOOK_SECRET and APP_BASE_URL for automatic SaaS checkout. Plan-specific Stripe Price IDs are optional.");
  }
  const response = await fetch(`${config.stripeApiBaseUrl}${pathname}`, {
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

async function openAiHealthProbe() {
  if (!config.openaiApiKey) return { ok: false, status: "missing-key", detail: "OPENAI_API_KEY is not set." };
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      authorization: `Bearer ${config.openaiApiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: config.openaiModel,
      input: "Return OK as plain text.",
      max_output_tokens: 8,
    }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      detail: payload.error?.message || payload.message || `OpenAI probe failed with ${response.status}`,
    };
  }
  return {
    ok: true,
    status: "ready",
    model: config.openaiModel,
    detail: "OpenAI Responses API accepted a minimal command-planner probe.",
  };
}

async function supabaseHealthProbe() {
  if (!supabaseConfigured()) return { ok: false, status: "missing-secrets", detail: "SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set." };
  try {
    await supabaseRequest(`${config.supabaseStateTable}?id=eq.primary&select=id&limit=1`);
    return { ok: true, status: "ready", detail: `Postgres REST read succeeded for ${config.supabaseStateTable}.` };
  } catch (error) {
    return { ok: false, status: "error", detail: error.message };
  }
}

async function stripeHealthProbe() {
  if (!config.stripeSecretKey) return { ok: false, status: "missing-key", detail: "STRIPE_SECRET_KEY is not set." };
  try {
    const account = await stripeRequest("/v1/account", {}, "GET");
    return {
      ok: true,
      status: "ready",
      detail: `Stripe account reachable${account.country ? ` (${account.country})` : ""}.`,
      chargesEnabled: Boolean(account.charges_enabled),
      payoutsEnabled: Boolean(account.payouts_enabled),
    };
  } catch (error) {
    return { ok: false, status: "error", detail: error.message };
  }
}

async function cfdWorkerHealthProbe() {
  if (!config.cfdWorkerUrl || !config.cfdWorkerToken) return { ok: false, status: "screening-only", detail: "CFD_WORKER_URL or CFD_WORKER_TOKEN is not set." };
  try {
    const response = await fetch(`${config.cfdWorkerUrl}/health`, {
      headers: { authorization: `Bearer ${config.cfdWorkerToken}` },
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error || payload.message || `CFD worker health failed with ${response.status}`);
    return {
      ok: true,
      status: payload.dryRun ? "dry-run-worker" : "solver-worker",
      detail: payload.solverAvailable ? `${payload.solver} is available.` : `${payload.solver || "solver"} is not available on the worker PATH.`,
      worker: payload.worker || "axion-cfd-worker",
      dryRun: Boolean(payload.dryRun),
      solverAvailable: Boolean(payload.solverAvailable),
    };
  } catch (error) {
    return { ok: false, status: "error", detail: error.message };
  }
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
  const rawSeeds = process.env.AXION_SEED_USERS_JSON || "[]";
  let seeds = [];
  try {
    const parsed = JSON.parse(rawSeeds);
    seeds = Array.isArray(parsed) ? parsed : [];
  } catch {
    seeds = [];
  }
  seeds.forEach((seed) => {
    if (!seed?.username || !seed?.password) return;
    const username = normalizePrincipal(seed.username);
    const email = normalizePrincipal(seed.email || `${username}@local.axion`);
    const existing = db.users.find((user) => normalizePrincipal(user.username) === username || normalizePrincipal(user.email) === email);
    const seededUser = {
      username,
      email,
      name: seed.name || username,
      role: seed.role === "admin" ? "admin" : "user",
      paymentExempt: Boolean(seed.paymentExempt),
      passwordHash: userPasswordHash(seed.password),
      status: "active",
    };
    if (existing) {
      Object.assign(existing, seededUser);
      return;
    }
    db.users.push({
      id: randomUUID(),
      ...seededUser,
      createdAt: new Date().toISOString(),
    });
  });
  db.users.forEach((user) => {
    user.paymentExempt = Boolean(user.paymentExempt);
  });
}

function configuredSeedUserCount() {
  try {
    const parsed = JSON.parse(process.env.AXION_SEED_USERS_JSON || "[]");
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
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

function documentId(kind, { projectId = "", versionId = "", runId = "" } = {}) {
  if (kind === "project_model") return `project:${projectId}`;
  if (kind === "project_version") return `project:${projectId}:version:${versionId}`;
  if (kind === "simulation_run") return `run:${runId}`;
  return `${kind}:${projectId || versionId || runId || randomUUID()}`;
}

function encodeQueryValue(value) {
  return encodeURIComponent(String(value || ""));
}

async function readSupabaseDocument(kind, { projectId = "", versionId = "", runId = "" } = {}) {
  if (!supabaseConfigured()) return null;
  const filters = [`kind=eq.${encodeQueryValue(kind)}`, "select=payload", "limit=1"];
  if (projectId) filters.push(`project_id=eq.${encodeQueryValue(projectId)}`);
  if (versionId) filters.push(`version_id=eq.${encodeQueryValue(versionId)}`);
  if (runId) filters.push(`run_id=eq.${encodeQueryValue(runId)}`);
  const rows = await supabaseRequest(`${config.supabaseDocumentsTable}?${filters.join("&")}`);
  return Array.isArray(rows) ? rows[0]?.payload || null : null;
}

async function writeSupabaseDocument(kind, payload, { projectId = "", versionId = "", runId = "" } = {}) {
  if (!supabaseConfigured()) return false;
  const now = new Date().toISOString();
  await supabaseRequest(config.supabaseDocumentsTable, {
    method: "POST",
    headers: { prefer: "resolution=merge-duplicates,return=representation" },
    body: {
      id: documentId(kind, { projectId, versionId, runId }),
      kind,
      project_id: projectId || null,
      version_id: versionId || null,
      run_id: runId || null,
      payload,
      updated_at: now,
    },
  });
  return true;
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
    currentBranchId: project.currentBranchId || "",
    currentBranchName: project.currentBranchName || "main",
    branchCount: project.branchCount || 1,
  };
}

function ensureProjectBranches(db, project) {
  let branches = db.projectBranches.filter((branch) => branch.projectId === project.id);
  if (!branches.length) {
    const branch = {
      id: `main-${project.id}`,
      projectId: project.id,
      name: "main",
      headVersionId: project.currentVersionId || "",
      createdAt: project.createdAt || project.updatedAt || new Date().toISOString(),
      updatedAt: project.updatedAt || project.createdAt || new Date().toISOString(),
      createdBy: project.owner,
    };
    db.projectBranches.push(branch);
    branches = [branch];
  }
  const current = branches.find((branch) => branch.id === project.currentBranchId) || branches.find((branch) => branch.name === "main") || branches[0];
  project.currentBranchId = current.id;
  project.currentBranchName = current.name;
  project.branchCount = branches.length;
  db.projectVersions
    .filter((version) => version.projectId === project.id)
    .forEach((version) => {
      version.branchId ||= current.id;
      version.branchName ||= current.name;
    });
  return branches;
}

function activeProjectBranch(db, project) {
  const branches = ensureProjectBranches(db, project);
  return branches.find((branch) => branch.id === project.currentBranchId) || branches[0];
}

function summarizeVersionDiff(basePayload = {}, headPayload = {}) {
  const base = basePayload.modelState || {};
  const head = headPayload.modelState || {};
  const parameterKeys = Array.from(new Set([...Object.keys(base.params || {}), ...Object.keys(head.params || {})]));
  const parameters = parameterKeys
    .filter((key) => JSON.stringify(base.params?.[key]) !== JSON.stringify(head.params?.[key]))
    .map((key) => ({ key, before: base.params?.[key] ?? null, after: head.params?.[key] ?? null }));
  const baseUnits = new Map((base.units || []).map((unit) => [unit.id, unit]));
  const headUnits = new Map((head.units || []).map((unit) => [unit.id, unit]));
  const baseStreams = new Map((base.streams || []).map((stream) => [stream.id, stream]));
  const headStreams = new Map((head.streams || []).map((stream) => [stream.id, stream]));
  const changedIds = (left, right) => Array.from(new Set([...left.keys(), ...right.keys()])).filter((id) => JSON.stringify(left.get(id)) !== JSON.stringify(right.get(id)));
  const topLevelKeys = ["template", "scale", "batchSize", "batchCount", "titer", "recovery"];
  return {
    parameters,
    topLevel: topLevelKeys.filter((key) => JSON.stringify(base[key]) !== JSON.stringify(head[key])).map((key) => ({ key, before: base[key] ?? null, after: head[key] ?? null })),
    units: {
      added: [...headUnits.keys()].filter((id) => !baseUnits.has(id)),
      removed: [...baseUnits.keys()].filter((id) => !headUnits.has(id)),
      changed: changedIds(baseUnits, headUnits).filter((id) => baseUnits.has(id) && headUnits.has(id)),
    },
    streams: {
      added: [...headStreams.keys()].filter((id) => !baseStreams.has(id)),
      removed: [...baseStreams.keys()].filter((id) => !headStreams.has(id)),
      changed: changedIds(baseStreams, headStreams).filter((id) => baseStreams.has(id) && headStreams.has(id)),
    },
    summary: {
      parameterChanges: parameters.length,
      equipmentChanges: changedIds(baseUnits, headUnits).length,
      streamChanges: changedIds(baseStreams, headStreams).length,
    },
  };
}

async function readProjectModel(projectId) {
  if (supabaseConfigured()) {
    try {
      const payload = await readSupabaseDocument("project_model", { projectId });
      if (payload) return payload;
    } catch (error) {
      console.warn(`Supabase project model read failed, falling back to local file: ${error.message}`);
    }
  }
  const filePath = projectFilePath(projectId);
  if (!existsSync(filePath)) return null;
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function writeProjectModel(projectId, payload) {
  if (supabaseConfigured()) {
    try {
      await writeSupabaseDocument("project_model", payload, { projectId });
      return;
    } catch (error) {
      console.warn(`Supabase project model write failed, falling back to local file: ${error.message}`);
    }
  }
  await mkdir(projectsDir, { recursive: true });
  await writeFile(projectFilePath(projectId), `${JSON.stringify(payload, null, 2)}\n`);
}

async function writeArchivedVersion(projectId, versionId, payload) {
  if (supabaseConfigured()) {
    try {
      await writeSupabaseDocument("project_version", payload, { projectId, versionId });
      return;
    } catch (error) {
      console.warn(`Supabase archived version write failed, falling back to local file: ${error.message}`);
    }
  }
  await mkdir(archiveDir, { recursive: true });
  await writeFile(versionFilePath(projectId, versionId), `${JSON.stringify(payload, null, 2)}\n`);
}

async function readArchivedVersion(projectId, versionId) {
  if (supabaseConfigured()) {
    try {
      const payload = await readSupabaseDocument("project_version", { projectId, versionId });
      if (payload) return payload;
    } catch (error) {
      console.warn(`Supabase archived version read failed, falling back to local file: ${error.message}`);
    }
  }
  const filePath = versionFilePath(projectId, versionId);
  if (!existsSync(filePath)) return null;
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function writeSimulationRun(runId, payload) {
  if (supabaseConfigured()) {
    try {
      await writeSupabaseDocument("simulation_run", payload, { projectId: payload.projectId || "", runId });
      return;
    } catch (error) {
      console.warn(`Supabase simulation run write failed, falling back to local file: ${error.message}`);
    }
  }
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
    planId: order.planId || "professional",
    planName: order.planName || "Professional",
    seats: order.seats || 1,
    amount: order.amount,
    currency: order.currency,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    company: order.company,
    customerNumber: order.customerNumber || "",
    contractNumber: order.contractNumber || "",
    licenseKey: order.licenseKey || "",
    billingMode: order.billingMode || "subscription",
    stripeCustomerId: order.stripeCustomerId || "",
    stripeSubscriptionId: order.stripeSubscriptionId || "",
    subscriptionStatus: order.subscriptionStatus || "",
    currentPeriodEnd: order.currentPeriodEnd || "",
  };
}

function sanitizeLicense(license) {
  return {
    key: license.key,
    customerEmail: license.customerEmail,
    customerName: license.customerName,
    company: license.company,
    customerNumber: license.customerNumber || "",
    contractNumber: license.contractNumber || "",
    orderId: license.orderId,
    planId: license.planId || "professional",
    planName: license.planName || "Professional",
    seats: license.seats || 1,
    createdAt: license.createdAt,
    status: license.status,
    billingStatus: license.billingStatus || "",
    stripeCustomerId: license.stripeCustomerId || "",
    stripeSubscriptionId: license.stripeSubscriptionId || "",
    currentPeriodEnd: license.currentPeriodEnd || "",
  };
}

async function sendInviteEmail(invite, project) {
  if (!emailConfigured() || !invite.recipient.includes("@")) {
    return { delivered: false, provider: "none", reason: "Email provider is not configured or recipient is not an email address." };
  }
  const subject = `Invitation to ${project.name} in Axion Process OS`;
  const inviteUrl = `${config.appBaseUrl}/?invite=${encodeURIComponent(invite.id)}&project=${encodeURIComponent(project.id)}`;
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.5;color:#0b1725">
      <h2 style="margin:0 0 12px">Axion Process OS invitation</h2>
      <p>You have been invited to collaborate on <strong>${project.name}</strong> as <strong>${invite.role}</strong>.</p>
      <p><a href="${inviteUrl}" style="display:inline-block;background:#123b35;color:white;padding:12px 18px;border-radius:999px;text-decoration:none">Open Axion workspace</a></p>
      <p style="color:#5d6875;font-size:13px">If you do not have access yet, use checkout or ask the workspace owner to activate your account.</p>
    </div>
  `;
  const text = `You have been invited to collaborate on ${project.name} in Axion Process OS as ${invite.role}. Open: ${inviteUrl}`;
  return sendTransactionalEmail({ to: invite.recipient, subject, html, text });
}

function cleanPublicField(value, maxLength = 240) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function publicRequestFingerprint(req) {
  const forwarded = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const address = forwarded || req.socket?.remoteAddress || "unknown";
  return createHash("sha256").update(`${config.sessionSecret}:${address}`).digest("hex").slice(0, 20);
}

function consumePublicSubmission(req, limit = 5, windowMs = 60 * 60 * 1000) {
  const key = publicRequestFingerprint(req);
  const now = Date.now();
  const recent = (publicSubmissionWindows.get(key) || []).filter((at) => now - at < windowMs);
  if (recent.length >= limit) return false;
  recent.push(now);
  publicSubmissionWindows.set(key, recent);
  return true;
}

async function createPilotLead(req, res) {
  if (!consumePublicSubmission(req)) {
    json(res, 429, { error: "Too many requests. Please try again later." });
    return;
  }
  const body = await parseBody(req);
  if (cleanPublicField(body.website, 120)) {
    json(res, 201, { accepted: true, reference: "AXION-PILOT" });
    return;
  }
  const name = cleanPublicField(body.name, 120);
  const email = cleanPublicField(body.email, 180).toLowerCase();
  const company = cleanPublicField(body.company, 180);
  const role = cleanPublicField(body.role, 120);
  const process = cleanPublicField(body.process, 160);
  const challenge = cleanPublicField(body.challenge, 1800);
  const consent = body.consent === true;
  if (name.length < 2 || company.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    json(res, 400, { error: "Enter your name, company, and a valid work email." });
    return;
  }
  if (!process || challenge.length < 20) {
    json(res, 400, { error: "Choose a process area and describe the engineering question in at least 20 characters." });
    return;
  }
  if (!consent) {
    json(res, 400, { error: "Consent is required so Axion can respond to this request." });
    return;
  }
  const db = ensureDbShape(await loadDb());
  const createdAt = new Date().toISOString();
  const lead = {
    id: randomUUID(),
    reference: `PILOT-${randomBytes(3).toString("hex").toUpperCase()}`,
    name,
    email,
    company,
    role,
    process,
    challenge,
    status: "new",
    source: cleanPublicField(body.source || "website", 120),
    campaign: cleanPublicField(body.campaign, 120),
    landingPage: cleanPublicField(body.landingPage, 320),
    requestFingerprint: publicRequestFingerprint(req),
    createdAt,
    notification: { delivered: false, provider: "none" },
  };
  db.leads.unshift(lead);
  db.audit.unshift({ at: createdAt, type: "pilot.requested", leadId: lead.id, reference: lead.reference, process });
  await saveDb(db);

  if (config.salesNotificationTo && emailConfigured()) {
    try {
      const safe = Object.fromEntries(Object.entries({ name, email, company, role, process, challenge }).map(([key, value]) => [key, escapeEmailHtml(value)]));
      lead.notification = await sendTransactionalEmail({
        to: config.salesNotificationTo,
        subject: `${lead.reference} · ${company} technical pilot request`,
        html: `<div style="font-family:Arial,sans-serif;line-height:1.5;color:#0b1725"><h2>New Axion technical pilot request</h2><p><strong>${safe.name}</strong> · ${safe.role || "Role not supplied"}<br />${safe.company}<br /><a href="mailto:${safe.email}">${safe.email}</a></p><p><strong>Process</strong><br />${safe.process}</p><p><strong>Engineering question</strong><br />${safe.challenge}</p><p>Reference: ${lead.reference}</p></div>`,
        text: `New Axion technical pilot request\n${name} · ${role}\n${company}\n${email}\nProcess: ${process}\nQuestion: ${challenge}\nReference: ${lead.reference}`,
      });
      await saveDb(db);
    } catch (error) {
      lead.notification = { delivered: false, provider: "error", error: cleanPublicField(error.message, 240) };
      await saveDb(db);
    }
  }
  json(res, 201, {
    accepted: true,
    reference: lead.reference,
    delivery: lead.notification.delivered ? "notified" : "stored",
    message: "Your process evaluation request has been received.",
  });
}

async function createEngineeringBriefLead(req, res) {
  if (!consumePublicSubmission(req, 8)) {
    json(res, 429, { error: "Too many requests. Please try again later." });
    return;
  }
  const body = await parseBody(req);
  if (cleanPublicField(body.website, 120)) {
    json(res, 201, { accepted: true, reference: "AXION-BRIEF" });
    return;
  }
  const email = cleanPublicField(body.email, 180).toLowerCase();
  const role = cleanPublicField(body.role, 120);
  const consent = body.consent === true;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    json(res, 400, { error: "Enter a valid email address." });
    return;
  }
  if (!consent) {
    json(res, 400, { error: "Consent is required to receive the Axion Engineering Brief." });
    return;
  }
  const db = ensureDbShape(await loadDb());
  const existing = db.leads.find((lead) => lead.kind === "engineering-brief" && lead.email === email && lead.status !== "unsubscribed");
  if (existing) {
    existing.role = role || existing.role;
    existing.updatedAt = new Date().toISOString();
    await saveDb(db);
    json(res, 200, { accepted: true, reference: existing.reference, message: "This address is already subscribed." });
    return;
  }
  const createdAt = new Date().toISOString();
  const lead = {
    id: randomUUID(),
    reference: `BRIEF-${randomBytes(3).toString("hex").toUpperCase()}`,
    kind: "engineering-brief",
    email,
    role,
    company: "",
    process: "Engineering resources",
    challenge: "Opted in to Axion engineering templates, guides, and release notes.",
    status: "subscribed",
    consentAt: createdAt,
    source: cleanPublicField(body.source || "website", 120),
    campaign: cleanPublicField(body.campaign || "engineering-brief", 120),
    landingPage: cleanPublicField(body.landingPage, 320),
    requestFingerprint: publicRequestFingerprint(req),
    createdAt,
  };
  db.leads.unshift(lead);
  db.audit.unshift({ at: createdAt, type: "engineering-brief.subscribed", leadId: lead.id, reference: lead.reference });
  await saveDb(db);
  json(res, 201, { accepted: true, reference: lead.reference, message: "Engineering Brief subscription saved." });
}

async function listPilotLeads(req, res) {
  const session = verifySession(getBearer(req));
  if (!session || session.role !== "admin") {
    json(res, 403, { error: "Admin access required" });
    return;
  }
  const db = ensureDbShape(await loadDb());
  json(res, 200, {
    leads: db.leads.map(({ requestFingerprint, ...lead }) => lead),
    count: db.leads.length,
  });
}

function billingProfileForSession(session) {
  const selectedPlan = billingPlan(session.planId) || billingPlan("professional");
  const amount = selectedPlan.priceCents / 100;
  const amountFormatted = new Intl.NumberFormat("de-DE", { style: "currency", currency: config.currency, maximumFractionDigits: 0 }).format(amount);
  const isCustomer = session.role === "customer";
  const isAdmin = session.role === "admin";
  const isExempt = Boolean(session.paymentExempt);
  return {
    plan: isAdmin ? "Owner workspace" : isCustomer ? `${session.planName || selectedPlan.name} license` : isExempt ? "Workspace access" : "Private workspace",
    planId: isCustomer ? selectedPlan.id : "",
    seats: isCustomer ? selectedPlan.seats : 1,
    paymentStatus: session.billingStatus || (isCustomer ? "paid active" : "workspace access"),
    amount,
    amountFormatted,
    currency: config.currency,
    billingEmail: session.email || "",
    customerId: session.customerNumber || session.stripeCustomerId || session.licenseKey || sessionPrincipal(session),
    customerNumber: session.customerNumber || "",
    contractNumber: session.contractNumber || "",
    contractStatus: session.contractStatus || session.billingStatus || (isCustomer ? "active" : "workspace access"),
    licenseKey: session.licenseKey || "",
    paymentExempt: isExempt || isAdmin,
    checkoutConfigured: Boolean(config.stripeSecretKey),
    stripeCustomerId: session.stripeCustomerId || "",
    stripeSubscriptionId: session.stripeSubscriptionId || "",
    currentPeriodEnd: session.currentPeriodEnd || "",
    billingPortalAvailable: Boolean(config.stripeSecretKey && session.stripeCustomerId),
    renewal: config.stripeBillingMode === "subscription" ? "renews monthly until cancelled" : "one-time access",
  };
}

function activatePaidOrder(db, order, {
  paymentProvider = "stripe",
  paymentId = "",
  stripeCustomerId = "",
  stripeSubscriptionId = "",
  subscriptionStatus = "",
  currentPeriodEnd = "",
  paidAt = new Date().toISOString(),
} = {}) {
  let license = order.licenseKey ? db.licenses.find((item) => item.key === order.licenseKey) : null;
  if (!order.licenseKey) {
    order.licenseKey = makeLicenseKey();
    license = {
      key: order.licenseKey,
      customerEmail: order.customerEmail,
      customerName: order.customerName,
      company: order.company,
      orderId: order.id,
      planId: order.planId || "professional",
      planName: order.planName || "Professional",
      seats: order.seats || 1,
      createdAt: paidAt,
      status: "active",
    };
    db.licenses.unshift(license);
  }
  license ||= db.licenses.find((item) => item.key === order.licenseKey);
  if (license) {
    license.planId = order.planId || license.planId || "professional";
    license.planName = order.planName || license.planName || "Professional";
    license.seats = order.seats || license.seats || 1;
    license.status = "active";
    license.billingStatus = subscriptionStatus || "active";
    license.stripeCustomerId = stripeCustomerId || license.stripeCustomerId || "";
    license.stripeSubscriptionId = stripeSubscriptionId || license.stripeSubscriptionId || "";
    license.currentPeriodEnd = currentPeriodEnd || license.currentPeriodEnd || "";
  }
  order.status = "paid_active";
  order.paidAt = paidAt;
  order.paymentProvider = paymentProvider;
  order.stripeCustomerId = stripeCustomerId || order.stripeCustomerId || "";
  order.stripeSubscriptionId = stripeSubscriptionId || order.stripeSubscriptionId || "";
  order.subscriptionStatus = subscriptionStatus || order.subscriptionStatus || (order.billingMode === "subscription" ? "active" : "paid");
  order.currentPeriodEnd = currentPeriodEnd || order.currentPeriodEnd || "";
  if (paymentId) order.paymentId = paymentId;
  ensureCommerceIdentifiers(order, license);
  const founding = db.foundingAccounts?.find((item) => normalizePrincipal(item.email) === normalizePrincipal(order.customerEmail) && item.status !== "converted");
  if (founding && paymentProvider === "stripe") {
    founding.status = "converted";
    founding.convertedAt = paidAt;
    founding.paidOrderId = order.id;
    founding.paidLicenseKey = order.licenseKey;
    const complimentaryLicense = db.licenses.find((item) => item.key === founding.licenseKey);
    if (complimentaryLicense && complimentaryLicense.key !== order.licenseKey) complimentaryLicense.status = "replaced";
  }
  db.audit.unshift({ at: paidAt, type: "order.paid", orderId: order.id, reference: order.reference, licenseKey: order.licenseKey, paymentProvider, paymentId });
  return order.licenseKey;
}

function stripeTimestamp(value) {
  const seconds = Number(value);
  return Number.isFinite(seconds) && seconds > 0 ? new Date(seconds * 1000).toISOString() : "";
}

function findStripeOrder(db, object = {}) {
  const subscriptionId = typeof object.subscription === "string"
    ? object.subscription
    : object.id?.startsWith?.("sub_") ? object.id : object.parent?.subscription_details?.subscription || "";
  const customerId = typeof object.customer === "string" ? object.customer : object.customer?.id || "";
  const orderId = object.metadata?.orderId || object.client_reference_id || "";
  return db.orders.find((item) =>
    (orderId && item.id === orderId)
    || (object.id?.startsWith?.("cs_") && item.stripeSessionId === object.id)
    || (subscriptionId && item.stripeSubscriptionId === subscriptionId)
    || (customerId && item.stripeCustomerId === customerId));
}

function syncSubscriptionAccess(db, order, subscription = {}) {
  if (!order) return;
  const updatedPlan = billingPlan(subscription.metadata?.planId || order.planId);
  if (updatedPlan) {
    order.planId = updatedPlan.id;
    order.planName = updatedPlan.name;
    order.seats = updatedPlan.seats;
  }
  const status = String(subscription.status || order.subscriptionStatus || "active");
  const activeStatuses = new Set(["active", "trialing", "past_due"]);
  const accessStatus = activeStatuses.has(status) ? "active" : "suspended";
  const currentPeriodEnd = stripeTimestamp(subscription.current_period_end) || order.currentPeriodEnd || "";
  order.stripeCustomerId = String(subscription.customer || order.stripeCustomerId || "");
  order.stripeSubscriptionId = String(subscription.id || order.stripeSubscriptionId || "");
  order.subscriptionStatus = status;
  order.currentPeriodEnd = currentPeriodEnd;
  order.status = accessStatus === "active" ? "paid_active" : `subscription_${status}`;
  const license = db.licenses.find((item) => item.key === order.licenseKey || item.orderId === order.id);
  if (license) {
    if (updatedPlan) {
      license.planId = updatedPlan.id;
      license.planName = updatedPlan.name;
      license.seats = updatedPlan.seats;
    }
    license.status = accessStatus;
    license.billingStatus = status;
    license.stripeCustomerId = order.stripeCustomerId;
    license.stripeSubscriptionId = order.stripeSubscriptionId;
    license.currentPeriodEnd = currentPeriodEnd;
  }
  ensureCommerceIdentifiers(order, license);
  db.audit.unshift({
    at: new Date().toISOString(),
    type: "billing.subscription.synced",
    orderId: order.id,
    reference: order.reference,
    subscriptionId: order.stripeSubscriptionId,
    status,
    accessStatus,
  });
}

async function createCheckout(req, res) {
  const body = await parseBody(req);
  const customerName = String(body.customerName || "").trim();
  const customerEmail = String(body.customerEmail || "").trim().toLowerCase();
  const company = String(body.company || "").trim();
  const selectedPlan = billingPlan(body.planId || "professional");
  if (!customerName || !customerEmail.includes("@")) {
    json(res, 400, { error: "Please enter a customer name and valid email address." });
    return;
  }
  if (!selectedPlan) {
    json(res, 400, { error: "Choose a valid Axion subscription plan." });
    return;
  }
  if (!config.stripeSecretKey) {
    json(res, 503, {
      error: "Automatic checkout is not configured yet. Set STRIPE_SECRET_KEY on the backend to enable SaaS-style payment.",
      setup: {
        provider: "Stripe Checkout",
        requiredEnv: ["STRIPE_SECRET_KEY"],
        recommendedEnv: ["STRIPE_WEBHOOK_SECRET", "APP_BASE_URL", "STRIPE_PRICE_ACADEMIC_ID", "STRIPE_PRICE_PROFESSIONAL_ID", "STRIPE_PRICE_TEAM_ID", "STRIPE_PRICE_ENTERPRISE_ID"],
      },
    });
    return;
  }
  if (body.acceptedTerms !== true) {
    json(res, 400, { error: "Accept the terms and privacy notice before starting checkout." });
    return;
  }

  const db = ensureDbShape(await loadDb());
  const termsAcceptedAt = new Date().toISOString();
  const termsVersion = "2026-08-03";
  const order = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: "pending_stripe_checkout",
    reference: makeReference(),
    productName: config.productName,
    planId: selectedPlan.id,
    planName: selectedPlan.name,
    seats: selectedPlan.seats,
    amount: selectedPlan.priceCents / 100,
    currency: config.currency,
    customerName,
    customerEmail,
    company,
    billingMode: config.stripeBillingMode,
    termsAcceptedAt,
    termsVersion,
  };
  ensureCommerceIdentifiers(order);
  db.orders.unshift(order);
  db.audit.unshift({ at: order.createdAt, type: "checkout.created", orderId: order.id, reference: order.reference, provider: "stripe" });
  await saveDb(db);

  const sessionParams = {
    mode: config.stripeBillingMode,
    success_url: `${config.appBaseUrl}/login?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.appBaseUrl}/login?checkout=cancelled&plan=${encodeURIComponent(selectedPlan.id)}`,
    customer_email: customerEmail,
    client_reference_id: order.id,
    "metadata[orderId]": order.id,
    "metadata[reference]": order.reference,
    "metadata[customerEmail]": customerEmail,
    "metadata[planId]": selectedPlan.id,
    "metadata[planName]": selectedPlan.name,
    "metadata[termsVersion]": termsVersion,
    billing_address_collection: "required",
    "tax_id_collection[enabled]": "true",
    allow_promotion_codes: "true",
    locale: "auto",
    "line_items[0][quantity]": 1,
  };
  if (config.stripeAutomaticTax) sessionParams["automatic_tax[enabled]"] = "true";
  if (config.stripeBillingMode === "subscription") {
    sessionParams["subscription_data[metadata][orderId]"] = order.id;
    sessionParams["subscription_data[metadata][reference]"] = order.reference;
    sessionParams["subscription_data[metadata][planId]"] = selectedPlan.id;
    sessionParams["subscription_data[metadata][customerEmail]"] = customerEmail;
    sessionParams["subscription_data[metadata][termsVersion]"] = termsVersion;
  } else {
    sessionParams.customer_creation = "always";
    sessionParams["invoice_creation[enabled]"] = "true";
  }
  if (selectedPlan.stripePriceId) {
    sessionParams["line_items[0][price]"] = selectedPlan.stripePriceId;
  } else {
    sessionParams["line_items[0][price_data][currency]"] = config.currency.toLowerCase();
    sessionParams["line_items[0][price_data][unit_amount]"] = selectedPlan.priceCents;
    sessionParams["line_items[0][price_data][product_data][name]"] = `${config.productName} · ${selectedPlan.name}`;
    sessionParams["line_items[0][price_data][product_data][description]"] = `${selectedPlan.audience} · ${selectedPlan.seats} named seat${selectedPlan.seats === 1 ? "" : "s"}`;
    if (config.stripeBillingMode === "subscription") {
      sessionParams["line_items[0][price_data][recurring][interval]"] = "month";
    }
  }
  let session;
  try {
    session = await stripeRequest("/v1/checkout/sessions", sessionParams);
  } catch (error) {
    order.status = "checkout_failed";
    db.audit.unshift({ at: new Date().toISOString(), type: "checkout.failed", orderId: order.id, reference: order.reference });
    await saveDb(db);
    json(res, 502, { error: "Secure checkout could not be created. Please retry in a moment." });
    return;
  }
  order.stripeSessionId = session.id;
  order.checkoutUrl = session.url;
  await saveDb(db);
  await syncCommerceRecordToSupabase(order);

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
      billingMode: config.stripeBillingMode,
      interval: config.stripeBillingMode === "subscription" ? "month" : "one-time",
      plan: {
        id: selectedPlan.id,
        name: selectedPlan.name,
        seats: selectedPlan.seats,
      },
      instruction: config.stripeBillingMode === "subscription"
        ? `Continue to secure checkout. Your ${selectedPlan.name} monthly subscription and workspace access activate automatically after successful payment.`
        : "Continue to secure checkout. Your license activates automatically after successful payment.",
    },
  });
}

function ensureDbShape(db) {
  db.users ||= [];
  db.foundingAccounts ||= [];
  db.orders ||= [];
  db.licenses ||= [];
  db.projects ||= [];
  db.projectVersions ||= [];
  db.projectBranches ||= [];
  db.invites ||= [];
  db.projectBriefs ||= [];
  db.datasets ||= [];
  db.simulationRuns ||= [];
  db.connectorRuns ||= [];
  db.cfdJobs ||= [];
  db.commandPlans ||= [];
  db.githubConnections ||= [];
  db.personalIntegrations ||= [];
  db.automationConnections ||= [];
  db.automationTelemetry ||= [];
  db.automationControlLoops ||= [];
  db.automationActions ||= [];
  db.automationCommissioningRuns ||= [];
  db.leads ||= [];
  db.stripeEvents ||= [];
  db.audit ||= [];
  db.orders.forEach((order) => {
    const license = db.licenses.find((item) => item.orderId === order.id || item.key === order.licenseKey);
    ensureCommerceIdentifiers(order, license);
  });
  db.licenses.forEach((license) => {
    const order = db.orders.find((item) => item.id === license.orderId || item.licenseKey === license.key);
    if (order) ensureCommerceIdentifiers(order, license);
    else {
      license.customerNumber ||= stableCommerceNumber("C", license.customerEmail || license.key);
      license.contractNumber ||= stableCommerceNumber("K", license.orderId || license.key);
    }
  });
  seedUsers(db);
  return db;
}

const scientificDataSources = Object.freeze([
  { id: "pubchem", name: "PubChem", domain: "Chemical compounds and physicochemical properties", provider: "NIH / NCBI", documentation: "https://pubchem.ncbi.nlm.nih.gov/docs/pug-rest", modelUse: "Component identity, formula, molecular weight, structure and basic properties" },
  { id: "chebi", name: "ChEBI", domain: "Biologically relevant chemical entities and ontology", provider: "EMBL-EBI", documentation: "https://www.ebi.ac.uk/chebi/tools", modelUse: "Canonical biochemical entities, synonyms, ontology classes and identifiers" },
  { id: "uniprot", name: "UniProtKB", domain: "Protein sequence and functional annotation", provider: "UniProt Consortium", documentation: "https://www.uniprot.org/help/api", modelUse: "Enzymes, proteins, organisms, accessions and sequence metadata" },
  { id: "rhea", name: "Rhea", domain: "Curated biochemical reactions", provider: "SIB Swiss Institute of Bioinformatics", documentation: "https://www.rhea-db.org/help/rest-api", modelUse: "Balanced reaction equations, enzyme links and biochemical reaction identifiers" },
  { id: "europepmc", name: "Europe PMC", domain: "Life-science literature and open-access links", provider: "EMBL-EBI", documentation: "https://europepmc.org/RestfulWebService", modelUse: "Papers, citations, abstracts, data links and model evidence" },
]);

function scientificSource(sourceId) {
  return scientificDataSources.find((source) => source.id === String(sourceId || "").toLowerCase());
}

function normalizedScientificQuery(value) {
  return String(value || "").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);
}

async function fetchScientificJson(url) {
  const response = await fetch(url, {
    headers: { accept: "application/json", "user-agent": "Axion-Process-OS/1.0 scientific-data-connector" },
    signal: AbortSignal.timeout(config.scientificDataTimeoutMs),
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`Source returned ${response.status}: ${text.slice(0, 180)}`);
  return text ? JSON.parse(text) : {};
}

async function fetchScientificText(url) {
  const response = await fetch(url, {
    headers: { accept: "text/tab-separated-values", "user-agent": "Axion-Process-OS/1.0 scientific-data-connector" },
    signal: AbortSignal.timeout(config.scientificDataTimeoutMs),
  });
  const text = await response.text();
  if (!response.ok) throw new Error(`Source returned ${response.status}: ${text.slice(0, 180)}`);
  return text;
}

function parseTsv(text) {
  const [headerLine = "", ...lines] = String(text || "").trim().split(/\r?\n/);
  const headers = headerLine.split("\t");
  return lines.filter(Boolean).map((line) => Object.fromEntries(line.split("\t").map((value, index) => [headers[index] || `field_${index + 1}`, value])));
}

async function queryScientificData(sourceId, query, limit = 8) {
  const source = scientificSource(sourceId);
  if (!source) throw new Error("Choose a supported scientific data source.");
  const cleanedQuery = normalizedScientificQuery(query);
  if (cleanedQuery.length < 2) throw new Error("Enter at least two characters to search a scientific source.");
  const resultLimit = Math.max(1, Math.min(20, Number(limit) || 8));
  const cacheKey = `${source.id}:${cleanedQuery.toLowerCase()}:${resultLimit}`;
  const cached = scientificDataCache.get(cacheKey);
  if (cached && Date.now() - cached.createdAt < config.scientificDataCacheTtlMs) return { ...cached.payload, cached: true };
  let rows = [];
  if (source.id === "pubchem") {
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(cleanedQuery)}/property/Title,MolecularFormula,MolecularWeight,CanonicalSMILES,InChIKey,XLogP,TPSA/JSON`;
    const payload = await fetchScientificJson(url);
    rows = (payload.PropertyTable?.Properties || []).slice(0, resultLimit).map((item) => ({ id: `CID:${item.CID}`, title: item.Title || cleanedQuery, formula: item.MolecularFormula || "", molecularWeight: item.MolecularWeight ?? "", canonicalSmiles: item.ConnectivitySMILES || item.CanonicalSMILES || "", inchiKey: item.InChIKey || "", xlogp: item.XLogP ?? "", tpsa: item.TPSA ?? "", url: `https://pubchem.ncbi.nlm.nih.gov/compound/${item.CID}` }));
  } else if (source.id === "chebi") {
    const url = `https://www.ebi.ac.uk/ols4/api/search?q=${encodeURIComponent(cleanedQuery)}&ontology=chebi&rows=${resultLimit}`;
    const payload = await fetchScientificJson(url);
    rows = (payload.response?.docs || []).slice(0, resultLimit).map((item) => ({ id: item.short_form || item.obo_id || item.iri, title: item.label || cleanedQuery, description: Array.isArray(item.description) ? item.description.join(" ") : item.description || "", synonyms: Array.isArray(item.synonym) ? item.synonym.slice(0, 6).join(" | ") : "", url: item.iri || "" }));
  } else if (source.id === "uniprot") {
    const fields = "accession,id,protein_name,organism_name,length,ec";
    const url = `https://rest.uniprot.org/uniprotkb/search?query=${encodeURIComponent(cleanedQuery)}&format=json&size=${resultLimit}&fields=${encodeURIComponent(fields)}`;
    const payload = await fetchScientificJson(url);
    rows = (payload.results || []).map((item) => ({ id: item.primaryAccession, title: item.proteinDescription?.recommendedName?.fullName?.value || item.uniProtkbId || item.primaryAccession, organism: item.organism?.scientificName || "", gene: item.genes?.[0]?.geneName?.value || "", length: item.sequence?.length || "", url: `https://www.uniprot.org/uniprotkb/${item.primaryAccession}/entry` }));
  } else if (source.id === "rhea") {
    const url = `https://www.rhea-db.org/rhea?query=${encodeURIComponent(cleanedQuery)}&columns=rhea-id,equation,ec&format=tsv`;
    rows = parseTsv(await fetchScientificText(url)).slice(0, resultLimit).map((item) => {
      const id = item["RHEA-ID"] || item["rhea-id"] || Object.values(item)[0] || "";
      return { id, title: item["Equation"] || item.equation || Object.values(item)[1] || "Biochemical reaction", ec: item["EC number"] || item.ec || "", url: id ? `https://www.rhea-db.org/rhea/${String(id).replace(/^RHEA:/, "")}` : "" };
    });
  } else if (source.id === "europepmc") {
    const url = `https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=${encodeURIComponent(cleanedQuery)}&format=json&pageSize=${resultLimit}&resultType=core`;
    const payload = await fetchScientificJson(url);
    rows = (payload.resultList?.result || []).map((item) => ({ id: `${item.source || "MED"}:${item.id || item.pmid || item.pmcid || ""}`, title: item.title || "Untitled publication", authors: item.authorString || "", journal: item.journalTitle || "", year: item.pubYear || "", citedBy: item.citedByCount ?? "", openAccess: item.isOpenAccess === "Y" ? "yes" : "no", url: item.pmcid ? `https://europepmc.org/article/PMC/${item.pmcid.replace(/^PMC/, "")}` : `https://europepmc.org/article/${item.source || "MED"}/${item.id || item.pmid || ""}` }));
  }
  const payload = { source, query: cleanedQuery, results: rows, resultCount: rows.length, retrievedAt: new Date().toISOString(), cached: false };
  scientificDataCache.set(cacheKey, { createdAt: Date.now(), payload });
  return payload;
}

async function listScientificDataSources(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) return json(res, 401, { error: "Not authenticated" });
  json(res, 200, { sources: scientificDataSources, cacheTtlMs: config.scientificDataCacheTtlMs, note: "Results are retrieved from the named public provider at request time and must be reviewed before model use." });
}

async function searchScientificData(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) return json(res, 401, { error: "Not authenticated" });
  const body = await parseBody(req);
  try {
    const payload = await queryScientificData(body.sourceId, body.query, body.limit);
    json(res, 200, payload);
  } catch (error) {
    json(res, 502, { error: `Scientific source search failed: ${error.message}` });
  }
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
      storage: supabaseConfigured() ? `Supabase/Postgres tables ${config.supabaseStateTable} and ${config.supabaseDocumentsTable}` : ".data/axion-licensing.json plus .data/models JSON files",
      purpose: "single-machine prototype, private local testing, quick project save/restore",
      limitation: supabaseConfigured() ? "production metadata and model JSON are persistent; large uploaded file bytes still need Supabase Storage/S3 parsing pipeline" : "not enough for paid multi-customer SaaS, audit-grade validation, large uploaded files or concurrent users",
    },
    recommendedProductionStack: {
      primaryChoice: "Supabase",
      database: "Postgres with Row Level Security for users, projects, runs, sources, datasets, collaboration and versioned model documents",
      objectStorage: "Supabase Storage or S3-compatible storage for uploaded CSV/XLSX/PDF/raw historian exports",
      auth: "Supabase Auth or custom JWT with Google OAuth and Stripe customer mapping",
      pythonCompute: "FastAPI/Celery worker on Render, Fly.io, Railway, Modal or AWS ECS for model runs",
      queue: "Postgres job table initially; Redis/Celery or managed queue when runs become long",
      reason: "fastest credible path from local prototype to real SaaS with data ownership, RLS and Python jobs",
    },
    coreTables: [
      { table: "users", keyFields: "id, email, username, role, payment_exempt, stripe_customer_id", purpose: "identity and billing mapping" },
      { table: "projects", keyFields: "id, owner_id, name, template, scale, current_version_id", purpose: "user-owned process models" },
      { table: "project_versions", keyFields: "id, project_id, summary_json, created_by", purpose: "old model archive index, restore and later branching/diff" },
      { table: "axion_documents", keyFields: "id, kind, project_id, version_id, run_id, payload", purpose: "active project models, archived versions and simulation/CFD job documents" },
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
    professionalReadiness: professionalWebAppReadiness(),
  };
}

function backendProcessBlueprint() {
  const readiness = productionReadiness();
  const processRows = [
    {
      id: "nextjs-bff",
      name: "Next.js backend-for-frontend",
      status: config.nextjsBffUrl ? "configured" : "adapter scaffold ready",
      runtime: "Next.js route handlers, standalone output, proxy to Axion API core",
      owns: "public app edge, SSR-ready auth gate, API path forwarding, deployment health checks",
      productionNeed: "Deploy the nextjs-bff service and set NEXTJS_BFF_URL plus AXION_API_BASE_URL.",
    },
    {
      id: "api-core",
      name: "Axion API core",
      status: "implemented",
      runtime: "Node HTTP server",
      owns: "login, licenses, project APIs, datasets, connector registry, Python screening, CFD handoff, exports",
      productionNeed: "Run behind HTTPS with SESSION_SECRET, APP_BASE_URL, Supabase, Stripe, Google and email secrets.",
    },
    {
      id: "data-store",
      name: "Project and company data store",
      status: supabaseConfigured() ? "postgres configured" : "local json fallback",
      runtime: "Supabase/Postgres adapter plus local development JSON fallback",
      owns: "users, orders, projects, versions, datasets, runs, CFD jobs and audit records",
      productionNeed: "Use Supabase tables and object storage for large company uploads.",
    },
    {
      id: "company-data-ingestion",
      name: "Company data ingestion",
      status: "implemented",
      runtime: "CSV/JSON parsing, schema inference, role mapping and quality scoring",
      owns: "bioreactor runs, historian exports, TEA/LCA data, supplier data, QC and schedule datasets",
      productionNeed: "Add signed object-upload URLs and async parsers for large XLSX/PDF/historian packages.",
    },
    {
      id: "simulation-queue",
      name: "Simulation and optimization jobs",
      status: "screening implemented",
      runtime: "local Python subprocess with saved run packages",
      owns: "dynamic bioprocess model runs, parameter sweeps, scenario packages and future Monte Carlo jobs",
      productionNeed: "Move long jobs to a worker queue with status polling, retry, timeout and audit events.",
    },
    {
      id: "cfd-worker",
      name: "Rigorous CFD backend worker",
      status: config.cfdWorkerUrl ? "external worker configured" : "handoff scaffold ready",
      runtime: "external CFD worker endpoint or local screening fallback",
      owns: "OpenFOAM/COMSOL/STAR-CCM+ handoff, boundary packages, geometry, residual targets and validated run metadata",
      productionNeed: "Deploy a token-protected CFD worker/cluster and connect CFD_WORKER_URL.",
    },
    {
      id: "billing-auth",
      name: "Billing, OAuth and invites",
      status: readiness.checks.filter((item) => ["stripe", "google", "email"].includes(item.key)).every((item) => item.ready) ? "production ready" : "needs secrets",
      runtime: "Stripe Checkout/webhook, Google Identity token verification, Resend invite delivery",
      owns: "paywall, automatic license activation, Google login, collaborator invitations",
      productionNeed: "Set live Stripe, Google OAuth, email-domain and webhook secrets on the host.",
    },
  ];
  return {
    generatedAt: new Date().toISOString(),
    product: config.productName,
    nextjs: {
      assumedMeaning: "Next.js, used as a Backend-for-Frontend adapter. If 'NextGS' meant a different product, keep this adapter and add a dedicated connector.",
      officialPatterns: [
        "Route Handlers expose HTTP endpoints using the Web Request/Response APIs.",
        "Backend-for-Frontend keeps browser-facing endpoints close to the app while the Axion API core remains the modelling authority.",
        "Standalone output is the recommended self-hosting shape for production containers.",
      ],
      bffUrl: config.nextjsBffUrl || "",
    },
    processes: processRows,
    readiness,
    deploymentOrder: [
      "Deploy Axion API core with Supabase, Stripe, Google, email and SESSION_SECRET.",
      "Deploy nextjs-bff with AXION_API_BASE_URL pointing to the API core.",
      "Set NEXTJS_BFF_URL on the API core for readiness checks and product config.",
      "Point the public domain to the Next.js service; keep /api/core health checks private or admin-only where needed.",
      "Run CI, smoke-test login, project save, company dataset ingestion, connector registry, CFD job creation, paywall and exports.",
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

function commandPlanSchema() {
  return {
    title: "string",
    summary: "string",
    targetView: "overview|flowsheet|cfd|simulation|economics|reports|sources|ai",
    riskLevel: "low|medium|high",
    operations: [
      { op: "setParam", key: "workingVolume", value: 70, reason: "why" },
      { op: "holdParam", key: "cellDensity", value: 18, reason: "protected constraint" },
      { op: "setCfd", key: "cfdNutrientInlet", value: "feed-ring", reason: "why" },
      { op: "startCfd", reason: "why" },
    ],
    expectedImpacts: ["short impact"],
    reviewNotes: ["short note"],
  };
}

function normalizeOperation(operation = {}) {
  const op = String(operation.op || "").trim();
  const allowed = new Set(["setParam", "holdParam", "setTopLevel", "setCfd", "addUnit", "addPreset", "setCanvas", "setView", "fitCanvas", "startCfd", "openDownloads", "saveVersion"]);
  if (!allowed.has(op)) return null;
  const normalized = {
    op,
    key: String(operation.key || "").slice(0, 80),
    value: operation.value,
    reason: String(operation.reason || "Planned by Axion command planner.").slice(0, 500),
  };
  if (typeof normalized.value === "string") normalized.value = normalized.value.slice(0, 200);
  if (typeof normalized.value === "number" && !Number.isFinite(normalized.value)) return null;
  return normalized;
}

function deterministicCommandPlan(prompt, context = {}) {
  const lower = String(prompt || "").toLowerCase();
  const operations = [];
  const notes = [];
  const params = context.params || context.modelState?.params || {};
  const topLevel = context.topLevel || context.modelState || context;
  let targetView = "flowsheet";
  const parameterDefaults = {
    workingVolume: 72,
    kla: 65,
    aeration: 0.35,
    doSetpoint: 40,
    feedRate: 18,
    perfusionRate: 1,
    mediaCostPerL: 42,
    feedSupplementCostPerL: 180,
    materialLossFactor: 18,
    cellDensity: 18,
  };
  const currentValue = (key, scope = "params") => {
    const source = scope === "topLevel" ? topLevel : params;
    const value = Number(source?.[key]);
    return Number.isFinite(value) ? value : Number(parameterDefaults[key] ?? 0);
  };
  const numberNear = (terms) => {
    const escaped = terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
    const match = lower.match(new RegExp(`(?:${escaped})[^0-9]{0,28}([0-9]+(?:[.,][0-9]+)?)|([0-9]+(?:[.,][0-9]+)?)[^a-z0-9]{0,12}(?:${escaped})`, "i"));
    const raw = match?.[1] || match?.[2] || "";
    return raw ? Number(raw.replace(",", ".")) : null;
  };
  const add = (op) => {
    const normalized = normalizeOperation(op);
    if (!normalized) return;
    const existing = operations.findIndex((item) => item.op === normalized.op && item.key === normalized.key);
    if (existing >= 0) operations[existing] = normalized;
    else operations.push(normalized);
  };
  const relativePercent = (terms) => {
    const escaped = terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
    const explicitTarget = new RegExp(`(?:${escaped})[^.]{0,24}\\b(?:to|at|auf)\\s*([0-9]+(?:[.,][0-9]+)?)\\s*%`, "i");
    if (explicitTarget.test(lower)) return null;
    const decrease = "reduce|decrease|lower|cut|senke|senken|reduziere|reduzieren|verringere|verringern";
    const increase = "increase|raise|improve|grow|erhöhe|erhöhen|steigere|steigern";
    const patterns = [
      new RegExp(`\\b(${decrease}|${increase})\\b[^.]{0,60}(?:${escaped})[^0-9]{0,20}([0-9]+(?:[.,][0-9]+)?)\\s*%`, "i"),
      new RegExp(`\\b(${decrease}|${increase})\\b[^0-9]{0,20}([0-9]+(?:[.,][0-9]+)?)\\s*%[^.]{0,16}(?:${escaped})`, "i"),
    ];
    const match = patterns.map((pattern) => lower.match(pattern)).find(Boolean);
    if (!match) return null;
    const percent = Math.max(0, Math.min(95, Number(String(match[2]).replace(",", "."))));
    if (!Number.isFinite(percent)) return null;
    return {
      percent,
      direction: new RegExp(`^(?:${decrease})$`, "i").test(match[1]) ? -1 : 1,
    };
  };
  const relativeParameters = [
    { key: "mediaCostPerL", terms: ["media cost", "medium cost", "medium price", "medienkosten", "mediumkosten"], target: "economics" },
    { key: "feedSupplementCostPerL", terms: ["feed supplement cost", "supplement cost", "feedkosten"], target: "economics" },
    { key: "materialLossFactor", terms: ["material loss", "materialverlust"], target: "economics" },
    { key: "workingVolume", terms: ["working volume", "arbeitsvolumen", "füllstand", "fill level"], target: "cfd" },
    { key: "kla", terms: ["kla", "k la", "oxygen transfer", "sauerstofftransfer"], target: "cfd" },
    { key: "aeration", terms: ["aeration", "gas flow", "air flow", "begasung"], target: "cfd" },
    { key: "feedRate", terms: ["feed rate", "feeding rate", "zufuhrrate"], target: "cfd" },
    { key: "perfusionRate", terms: ["perfusion rate", "perfusion", "bleed rate"], target: "cfd" },
    { key: "doSetpoint", terms: ["dissolved oxygen", "do setpoint", "sauerstoffsollwert"], target: "cfd" },
    { key: "cellDensity", terms: ["viable cell density", "cell density", "zelldichte", "vcd"], target: "simulation" },
  ];
  const relativeKeys = new Set();
  relativeParameters.forEach((parameter) => {
    const directive = relativePercent(parameter.terms);
    if (!directive) return;
    const before = currentValue(parameter.key);
    const after = before * (1 + directive.direction * directive.percent / 100);
    add({
      op: "setParam",
      key: parameter.key,
      value: Number(after.toFixed(Math.abs(after) < 10 ? 3 : 2)),
      reason: `${directive.direction < 0 ? "Reduced" : "Increased"} ${parameter.terms[0]} by ${directive.percent}% from the current model value.`,
    });
    relativeKeys.add(parameter.key);
    targetView = parameter.target;
  });
  const protectedParameters = [
    { key: "cellDensity", terms: ["viable cell density", "cell density", "zelldichte", "vcd"] },
    { key: "titer", terms: ["titer", "titre"], scope: "topLevel" },
    { key: "recovery", terms: ["recovery", "yield", "ausbeute"], scope: "topLevel" },
    { key: "workingVolume", terms: ["working volume", "arbeitsvolumen", "füllstand"] },
  ];
  protectedParameters.forEach((parameter) => {
    const mentioned = parameter.terms.some((term) => lower.includes(term));
    const protectedClause = /\bwithout\b|\bkeep\b|\bmaintain\b|\bdo not change\b|\bnicht (?:senken|verändern|reduzieren)\b|\bkonstant\b/i.test(lower);
    if (!mentioned || !protectedClause || relativeKeys.has(parameter.key)) return;
    add({
      op: "holdParam",
      key: parameter.key,
      value: currentValue(parameter.key, parameter.scope),
      reason: `${parameter.terms[0]} is a protected constraint and remains at its current value.`,
    });
  });
  const workingVolume = numberNear(["working volume", "arbeitsvolumen", "füllstand", "fill level"]);
  if (workingVolume !== null && !relativeKeys.has("workingVolume")) {
    add({ op: "setParam", key: "workingVolume", value: Math.max(30, Math.min(80, workingVolume)), reason: "Working volume was explicitly requested; Axion keeps STR screening below the 80% headspace boundary." });
    targetView = "cfd";
  } else if (lower.includes("too full") || lower.includes("weniger voll") || lower.includes("not completely full")) {
    add({ op: "setParam", key: "workingVolume", value: 72, reason: "Reduced fill level to preserve headspace, foam control and gas disengagement." });
    targetView = "cfd";
  }
  const kla = numberNear(["kla", "k la", "oxygen transfer", "sauerstofftransfer"]);
  if (kla !== null && !relativeKeys.has("kla")) add({ op: "setParam", key: "kla", value: kla, reason: "kLa was explicitly requested for oxygen-transfer screening." });
  if (lower.includes("oxygen") || lower.includes("sauerstoff") || lower.includes("kla")) {
    add({ op: "setParam", key: "doSetpoint", value: 45, reason: "Maintains a conservative minimum DO target for oxygen-transfer review." });
    add({ op: "setCfd", key: "cfdLayer", value: "oxygen", reason: "Show dissolved oxygen field after the change." });
    targetView = "cfd";
  }
  if (lower.includes("feed ring") || lower.includes("distributed feed") || lower.includes("nutrient feed") || lower.includes("nährstoff")) {
    add({ op: "setCfd", key: "cfdNutrientInlet", value: "feed-ring", reason: "Distributed feed reduces local nutrient gradients and feed-point risk." });
    add({ op: "setCfd", key: "cfdLayer", value: "nutrient", reason: "Show nutrient field after the feed-boundary edit." });
    targetView = "cfd";
  }
  if (lower.includes("ammon") || lower.includes("lactate") || lower.includes("laktat")) {
    add({ op: "setParam", key: "glutamine", value: 2.5, reason: "Lower glutamine burden reduces ammonium formation risk." });
    add({ op: "setParam", key: "perfusionRate", value: 1.2, reason: "Perfusion or bleed gives a mitigation lever for ammonium/lactate accumulation." });
    add({ op: "addUnit", value: "pat", reason: "PAT soft-sensor supports metabolite boundary tracking." });
    targetView = "ai";
  }
  if (lower.includes("cip") || lower.includes("cleaning") || lower.includes("sip")) {
    add({ op: "addPreset", value: "cip", reason: "Adds cleaning, sterilization and support loop logic." });
    add({ op: "setParam", key: "cipTime", value: 2.5, reason: "Adds a realistic short cleaning-cycle assumption." });
    targetView = "flowsheet";
  }
  if (lower.includes("full pfd") || lower.includes("whole process") || lower.includes("show streams") || lower.includes("fit canvas")) {
    add({ op: "setCanvas", key: "flowDetail", value: "full", reason: "Shows all stream labels and support flows." });
    add({ op: "setCanvas", key: "canvasFocus", value: "all", reason: "Shows full plant instead of one subsystem." });
    add({ op: "fitCanvas", reason: "Fits the whole process into view." });
    targetView = "flowsheet";
  }
  if (lower.includes("start") || lower.includes("run") || lower.includes("solve") || lower.includes("simulate")) {
    add({ op: "startCfd", reason: "User asked to run or solve the CFD screen." });
    targetView = lower.includes("cfd") || targetView === "cfd" ? "cfd" : targetView;
  }
  if (lower.includes("download") || lower.includes("export") || lower.includes("lca") || lower.includes("tea")) {
    add({ op: "openDownloads", reason: "User asked for export/download handoff." });
    targetView = "reports";
  }
  if (!operations.length) {
    notes.push("The planner did not find a directly applicable safe operation; it returns navigation and review guidance only.");
  }
  return {
    title: operations.length ? "Safe model edit plan" : "Review-only plan",
    summary: operations.length ? "Axion prepared bounded operations that can be applied to the current process model." : "Axion prepared guidance; no model write will be applied.",
    targetView,
    riskLevel: operations.some((operation) => operation.op === "addUnit" || operation.op === "addPreset") ? "medium" : "low",
    operations,
    expectedImpacts: [
      ...(operations.some((operation) => operation.op === "setParam") ? ["Parameters, KPIs, balances and TEA/LCA exports will recalculate."] : []),
      ...(operations.some((operation) => operation.op === "holdParam") ? ["Protected process constraints remain fixed and are included in the before/after review."] : []),
      ...(targetView === "cfd" ? ["CFD screening inputs and selected field layer will update."] : []),
      ...(operations.some((operation) => operation.op === "addUnit" || operation.op === "addPreset") ? ["Equipment count, streams and scheduling assumptions may change."] : []),
    ],
    reviewNotes: notes.concat(["Review model changes before GMP, safety-critical, investment or regulated decisions."]),
    planner: "deterministic",
  };
}

function extractOpenAiJson(payload) {
  const chunks = [];
  const collect = (value) => {
    if (!value) return;
    if (typeof value === "string") chunks.push(value);
    if (Array.isArray(value)) value.forEach(collect);
    if (typeof value === "object") {
      if (value.type === "output_text" && value.text) chunks.push(value.text);
      if (value.text && typeof value.text === "string") chunks.push(value.text);
      if (value.content) collect(value.content);
      if (value.output) collect(value.output);
    }
  };
  collect(payload.output_text || payload.output || payload.choices);
  const text = chunks.join("\n").trim();
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("AI planner returned no JSON object.");
  return JSON.parse(match[0]);
}

async function aiCommandPlan(prompt, context = {}) {
  if (!config.openaiApiKey) return deterministicCommandPlan(prompt, context);
  const fallback = deterministicCommandPlan(prompt, context);
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      authorization: `Bearer ${config.openaiApiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: config.openaiModel,
      input: [
        {
          role: "system",
          content: "You are Axion Process OS command planner. Return only valid JSON. Never return code. Only use safe operations from this list: setParam, holdParam, setTopLevel, setCfd, addUnit, addPreset, setCanvas, setView, fitCanvas, startCfd, openDownloads. Use holdParam for values the user explicitly says must not decrease or change. Calculate relative percentage edits from the supplied current values. Bound numeric bioprocess edits to plausible screening ranges. Do not invent proprietary simulator content.",
        },
        {
          role: "user",
          content: JSON.stringify({
            task: "Create a safe command plan for a browser bioprocess model.",
            prompt,
            context: {
              template: context.template,
              scale: context.scale,
              selectedId: context.selectedId,
              summary: context.summary,
              params: context.params,
              topLevel: context.topLevel,
            },
            schema: commandPlanSchema(),
          }),
        },
      ],
    }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error?.message || `OpenAI planner failed with ${response.status}`);
  const raw = extractOpenAiJson(payload);
  const aiOperations = Array.isArray(raw.operations) ? raw.operations.map(normalizeOperation).filter(Boolean) : [];
  const operations = [...fallback.operations];
  aiOperations.forEach((operation) => {
    if (!operations.some((item) => item.op === operation.op && item.key === operation.key)) operations.push(operation);
  });
  return {
    title: String(raw.title || fallback.title).slice(0, 120),
    summary: String(raw.summary || fallback.summary).slice(0, 800),
    targetView: String(raw.targetView || fallback.targetView),
    riskLevel: ["low", "medium", "high"].includes(raw.riskLevel) ? raw.riskLevel : fallback.riskLevel,
    operations,
    expectedImpacts: Array.isArray(raw.expectedImpacts) ? raw.expectedImpacts.map(String).slice(0, 8) : fallback.expectedImpacts,
    reviewNotes: Array.isArray(raw.reviewNotes) ? raw.reviewNotes.map(String).slice(0, 8) : fallback.reviewNotes,
    planner: "openai",
    fallbackOperations: fallback.operations,
  };
}

async function createCommandPlan(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const body = await parseBody(req);
  const prompt = String(body.prompt || "").trim();
  if (prompt.length < 3) {
    json(res, 400, { error: "Command prompt is too short" });
    return;
  }
  const db = ensureDbShape(await loadDb());
  const projectId = String(body.projectId || "");
  if (projectId) {
    const project = db.projects.find((item) => item.id === projectId);
    if (!project || !canAccessProject(session, project)) {
      json(res, 404, { error: "Project not found" });
      return;
    }
  }
  let plan;
  let plannerError = "";
  try {
    plan = await aiCommandPlan(prompt, body.context || body.modelState || {});
  } catch (error) {
    plannerError = error.message;
    plan = deterministicCommandPlan(prompt, body.context || body.modelState || {});
  }
  const now = new Date().toISOString();
  const record = {
    id: randomUUID(),
    createdAt: now,
    createdBy: sessionPrincipal(session),
    projectId,
    prompt,
    status: "planned",
    planner: plan.planner,
    plannerError,
    plan,
    contextSummary: body.context?.summary || body.summary || {},
  };
  db.commandPlans.unshift(record);
  db.audit.unshift({ at: now, type: "command.plan.created", planId: record.id, projectId, by: sessionPrincipal(session), planner: plan.planner });
  await saveDb(db);
  json(res, 201, { commandPlan: record, aiConfigured: Boolean(config.openaiApiKey) });
}

async function applyCommandPlan(req, res, planId) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const body = await parseBody(req);
  const changeLog = Array.isArray(body.changeLog)
    ? body.changeLog.slice(0, 100).map((change) => ({
      type: String(change.type || "model").slice(0, 80),
      where: String(change.where || "Active model").slice(0, 240),
      what: String(change.what || change.field || "Model value").slice(0, 240),
      field: String(change.field || "").slice(0, 120),
      before: String(change.before ?? "Not set").slice(0, 500),
      after: String(change.after ?? "Not set").slice(0, 500),
      reason: String(change.reason || "").slice(0, 800),
      targetView: String(change.targetView || "").slice(0, 80),
      targetId: String(change.targetId || "").slice(0, 120),
    }))
    : [];
  const db = ensureDbShape(await loadDb());
  const record = db.commandPlans.find((item) => item.id === planId);
  if (!record) {
    json(res, 404, { error: "Command plan not found" });
    return;
  }
  if (record.createdBy !== sessionPrincipal(session) && session.role !== "admin") {
    json(res, 403, { error: "Command plan is not accessible" });
    return;
  }
  const now = new Date().toISOString();
  let versionId = "";
  let undoVersionId = "";
  let changeSet = null;
  const projectId = String(record.projectId || body.projectId || "");
  if (projectId && body.modelStateAfter) {
    const project = db.projects.find((item) => item.id === projectId);
    if (!project || !canAccessProject(session, project)) {
      json(res, 404, { error: "Project not found" });
      return;
    }
    const branch = activeProjectBranch(db, project);
    const previous = await readProjectModel(projectId);
    const parentVersionId = branch.headVersionId || project.currentVersionId || "";
    versionId = randomUUID();
    undoVersionId = randomUUID();
    if (previous) await writeArchivedVersion(projectId, undoVersionId, previous);
    project.updatedAt = now;
    project.currentVersionId = versionId;
    project.versionCount = (project.versionCount || 0) + 1;
    const payload = {
      project: sanitizeProject(project),
      savedAt: now,
      savedBy: sessionPrincipal(session),
      summary: body.summary || {},
      modelState: body.modelStateAfter || {},
      commandPlanId: planId,
      commandPrompt: record.prompt,
      branchId: branch.id,
      branchName: branch.name,
      parentVersionId,
      changeLog,
    };
    changeSet = summarizeVersionDiff(previous || {}, payload);
    payload.changeSet = changeSet;
    await writeProjectModel(projectId, payload);
    await writeArchivedVersion(projectId, versionId, payload);
    branch.headVersionId = versionId;
    branch.updatedAt = now;
    project.currentBranchId = branch.id;
    project.currentBranchName = branch.name;
    db.projectVersions.unshift({
      id: versionId,
      projectId,
      createdAt: now,
      createdBy: sessionPrincipal(session),
      label: `AI command: ${record.prompt}`.slice(0, 120),
      summary: body.summary || {},
      commandPlanId: planId,
      branchId: branch.id,
      branchName: branch.name,
      parentVersionId,
      changeLog,
      changeSet,
    });
    record.parentVersionId = parentVersionId;
  }
  record.status = "applied";
  record.appliedAt = now;
  record.appliedBy = sessionPrincipal(session);
  record.projectId = projectId;
  record.resultSummary = body.summary || {};
  record.changeLog = changeLog;
  record.changeSet = changeSet;
  record.versionId = versionId;
  record.undoVersionId = undoVersionId;
  db.audit.unshift({ at: now, type: "command.plan.applied", planId, projectId, versionId, by: sessionPrincipal(session) });
  await saveDb(db);
  json(res, 200, { commandPlan: record, versionId, changeLog, changeSet });
}

async function undoCommandPlan(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const body = await parseBody(req);
  const db = ensureDbShape(await loadDb());
  const projectId = String(body.projectId || "");
  const project = db.projects.find((item) => item.id === projectId);
  if (!project || !canAccessProject(session, project)) {
    json(res, 404, { error: "Project not found" });
    return;
  }
  const applied = db.commandPlans.find((item) => item.projectId === projectId && item.status === "applied" && (!body.planId || item.id === body.planId));
  if (!applied?.undoVersionId && !applied?.versionId) {
    json(res, 404, { error: "No applied command version is available to undo" });
    return;
  }
  const archived = await readArchivedVersion(projectId, applied.undoVersionId || applied.versionId);
  if (!archived) {
    json(res, 404, { error: "Undo archive not found" });
    return;
  }
  const now = new Date().toISOString();
  await writeProjectModel(projectId, { ...archived, restoredAt: now, restoredBy: sessionPrincipal(session), undoOfCommandPlanId: applied.id });
  project.updatedAt = now;
  const branch = activeProjectBranch(db, project);
  if (applied.parentVersionId) {
    branch.headVersionId = applied.parentVersionId;
    branch.updatedAt = now;
    project.currentVersionId = applied.parentVersionId;
  }
  applied.status = "undone";
  applied.undoneAt = now;
  applied.undoneBy = sessionPrincipal(session);
  db.audit.unshift({ at: now, type: "command.plan.undone", planId: applied.id, projectId, by: sessionPrincipal(session) });
  await saveDb(db);
  json(res, 200, { commandPlan: applied, model: archived, project: sanitizeProject(project) });
}

async function dataArchitecture(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  json(res, 200, dataArchitectureBlueprint());
}

async function backendProcesses(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  json(res, 200, backendProcessBlueprint());
}

async function professionalReadiness(req, res) {
  json(res, 200, professionalWebAppReadiness());
}

async function serviceStatus(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  json(res, 200, serviceStatusFromReadiness());
}

async function serviceProbe(req, res, serviceKey) {
  const session = verifySession(getBearer(req));
  if (session?.role !== "admin") {
    json(res, 403, { error: "Admin access required" });
    return;
  }
  const probes = {
    openai: openAiHealthProbe,
    supabase: supabaseHealthProbe,
    stripe: stripeHealthProbe,
    cfd: cfdWorkerHealthProbe,
  };
  const probe = probes[serviceKey];
  if (!probe) {
    json(res, 404, { error: "Probe not found", available: Object.keys(probes) });
    return;
  }
  const startedAt = new Date().toISOString();
  const result = await probe();
  const db = ensureDbShape(await loadDb());
  db.audit.unshift({
    at: startedAt,
    type: "service.probe",
    service: serviceKey,
    ok: Boolean(result.ok),
    status: result.status,
    by: sessionPrincipal(session),
  });
  await saveDb(db);
  json(res, 200, {
    service: serviceKey,
    checkedAt: new Date().toISOString(),
    result,
  });
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

function cfdScreeningResult(caseInput = {}) {
  const volumeL = Number(caseInput.volumeL || caseInput.batchVolumeL || 20000);
  const workingVolumePct = Number(caseInput.workingVolumePct || 70);
  const tipSpeed = Number(caseInput.tipSpeed || 1.1);
  const kla = Number(caseInput.klaH || caseInput.kLa || 12);
  const our = Number(caseInput.ourMolLh || 0.006);
  const gridCells = Math.max(384, Number(caseInput.gridCells || 1536));
  const scaleRisk = volumeL > 20000 ? "review" : "ok";
  const fillRisk = workingVolumePct > 80 ? "review" : "ok";
  const oxygenMargin = Math.max(0, Math.min(140, (kla * 0.21) / Math.max(0.001, our * 100) * 100));
  const mixingTimeMin = Math.max(1.2, 18 / Math.max(0.4, tipSpeed) * Math.pow(Math.max(1, volumeL / 20000), 0.22));
  const hotspots = Math.round(gridCells * (oxygenMargin < 45 ? 0.14 : oxygenMargin < 75 ? 0.06 : 0.018) + (workingVolumePct > 80 ? 18 : 0));
  return {
    solver: "Axion backend CFD screening job",
    status: oxygenMargin < 45 || scaleRisk === "review" || fillRisk === "review" ? "needs-rigorous-cfd" : "screening-ok",
    mesh: {
      type: "axisymmetric STR slice plus external OpenFOAM handoff",
      cells: gridCells,
      requiredForRigorousRun: ["3D vessel CAD", "impeller geometry", "baffle dimensions", "sparger ring holes", "liquid properties", "gas flow", "probe positions"],
    },
    kpis: {
      oxygenMarginPct: Number(oxygenMargin.toFixed(1)),
      mixingTimeMin: Number(mixingTimeMin.toFixed(2)),
      predictedHotspots: hotspots,
      workingVolumePct,
      volumeL,
    },
    boundaryConditions: [
      { name: "gas_inlet", type: "alpha.gas / U.gas / C_O2", location: "ring sparger", required: true },
      { name: "feed_inlet", type: "C_N / glucose / glutamine proxy", location: "top feed", required: true },
      { name: "walls_baffles", type: "U.liquid noSlip", location: "vessel wall and baffles", required: true },
      { name: "top_headspace", type: "p_rgh / alpha.gas outlet", location: "headspace", required: true },
      { name: "impeller_zone", type: "MRF / horizontal momentum source", location: "impeller swept volume", required: true },
      { name: "cell_uptake", type: "S_O2 / S_N volumetric sink", location: "liquid volume", required: true },
    ],
    warnings: [
      ...(scaleRisk === "review" ? ["Animal-cell stirred tank exceeds 20,000 L screening boundary; use scale-out or validated large-scale CFD."] : []),
      ...(fillRisk === "review" ? ["Working volume exceeds 80%; headspace, foam and gas-disengagement risk should be reviewed."] : []),
      ...(oxygenMargin < 75 ? ["Oxygen transfer margin is low; validate kLa, gas flow, sparger and impeller configuration."] : []),
    ],
  };
}

async function runExternalCfdWorker(job) {
  if (!config.cfdWorkerUrl || !config.cfdWorkerToken) return null;
  const response = await fetch(`${config.cfdWorkerUrl}/jobs`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${config.cfdWorkerToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      jobId: job.id,
      projectId: job.projectId,
      unitId: job.unitId,
      solver: job.requestedSolver,
      caseInput: job.caseInput,
    }),
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || payload.message || `CFD worker failed with ${response.status}`);
  }
  return payload;
}

async function fetchExternalCfdWorkerJob(jobId) {
  if (!config.cfdWorkerUrl || !config.cfdWorkerToken) return null;
  const response = await fetch(`${config.cfdWorkerUrl}/jobs/${encodeURIComponent(jobId)}`, {
    headers: { authorization: `Bearer ${config.cfdWorkerToken}` },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.error || payload.message || `CFD worker status failed with ${response.status}`);
  return payload;
}

async function createCfdJob(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const body = await parseBody(req);
  const now = new Date().toISOString();
  const job = {
    id: randomUUID(),
    createdAt: now,
    createdBy: sessionPrincipal(session),
    projectId: String(body.projectId || ""),
    unitId: String(body.unitId || body.reactorId || ""),
    status: config.cfdWorkerUrl ? "submitted-to-worker" : "completed-screening",
    requestedSolver: String(body.solver || "openfoam-handoff"),
    caseInput: body.caseInput && typeof body.caseInput === "object" ? body.caseInput : body,
    result: cfdScreeningResult(body.caseInput || body),
    nextProductionStep: "Attach this job to an external OpenFOAM/BiRD/COMSOL/STAR-CCM+ worker for validated 3D multiphase CFD.",
  };
  if (config.cfdWorkerUrl) {
    try {
      job.worker = await runExternalCfdWorker(job);
      job.status = job.worker?.status || "submitted-to-worker";
      job.nextProductionStep = "Track the external CFD worker result, residuals, mesh quality and field outputs before engineering sign-off.";
    } catch (error) {
      job.status = "worker-submit-failed-screening-kept";
      job.workerError = error.message;
    }
  }
  const db = ensureDbShape(await loadDb());
  db.cfdJobs.unshift(job);
  db.audit.unshift({ at: now, type: "cfd.job.created", jobId: job.id, projectId: job.projectId, unitId: job.unitId, by: sessionPrincipal(session) });
  await saveDb(db);
  await writeSimulationRun(job.id, job);
  json(res, 201, { job });
}

async function getCfdJob(req, res, jobId) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const db = ensureDbShape(await loadDb());
  const job = db.cfdJobs.find((item) => item.id === jobId);
  if (!job) {
    json(res, 404, { error: "CFD job not found" });
    return;
  }
  if (session.role !== "admin" && job.createdBy !== sessionPrincipal(session)) {
    json(res, 403, { error: "CFD job is not accessible" });
    return;
  }
  let worker = null;
  let workerError = "";
  try {
    worker = await fetchExternalCfdWorkerJob(job.id);
    if (worker?.status) {
      job.worker = worker;
      job.status = worker.status;
      job.updatedAt = new Date().toISOString();
      await saveDb(db);
      await writeSimulationRun(job.id, job);
    }
  } catch (error) {
    workerError = error.message;
  }
  json(res, 200, { job, worker, workerError });
}

async function listCfdJobs(req, res, query = new URLSearchParams()) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const db = ensureDbShape(await loadDb());
  const projectId = String(query.get("projectId") || "");
  const jobs = db.cfdJobs
    .filter((job) => !projectId || job.projectId === projectId)
    .filter((job) => session.role === "admin" || job.createdBy === sessionPrincipal(session) || !job.projectId)
    .slice(0, 100);
  json(res, 200, { jobs });
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

function splitDelimitedLine(line, delimiter = ",") {
  const cells = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === delimiter && !quoted) {
      cells.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  cells.push(current.trim());
  return cells;
}

function detectDelimiter(line = "") {
  const options = [",", ";", "\t", "|"];
  return options
    .map((delimiter) => ({ delimiter, count: splitDelimitedLine(line, delimiter).length }))
    .sort((a, b) => b.count - a.count)[0]?.delimiter || ",";
}

function parseDatasetContent(contentText = "") {
  const text = String(contentText || "").trim();
  if (!text) return { format: "empty", columns: [], rows: [], rowCount: 0, issues: ["No raw data was supplied."] };
  if (text.startsWith("{") || text.startsWith("[")) {
    try {
      const parsed = JSON.parse(text);
      const rows = Array.isArray(parsed) ? parsed : Array.isArray(parsed.rows) ? parsed.rows : [parsed];
      const objectRows = rows.filter((row) => row && typeof row === "object" && !Array.isArray(row));
      const columns = [...new Set(objectRows.flatMap((row) => Object.keys(row)))];
      return { format: "json", columns, rows: objectRows.slice(0, 1000), rowCount: objectRows.length, issues: objectRows.length ? [] : ["JSON did not contain object rows."] };
    } catch (error) {
      return { format: "json-invalid", columns: [], rows: [], rowCount: 0, issues: [`Invalid JSON: ${error.message}`] };
    }
  }
  const lines = text.split(/\r?\n/).filter((line) => line.trim()).slice(0, 1001);
  if (!lines.length) return { format: "empty", columns: [], rows: [], rowCount: 0, issues: ["No table rows were found."] };
  const delimiter = detectDelimiter(lines[0]);
  const headers = splitDelimitedLine(lines[0], delimiter).map((header, index) => String(header || `column_${index + 1}`).trim());
  const rows = lines.slice(1).map((line) => {
    const cells = splitDelimitedLine(line, delimiter);
    return Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ""]));
  });
  return {
    format: "csv",
    delimiter: delimiter === "\t" ? "tab" : delimiter,
    columns: headers,
    rows,
    rowCount: Math.max(0, text.split(/\r?\n/).filter((line) => line.trim()).length - 1),
    issues: headers.length < 2 ? ["Only one column detected; check delimiter or header row."] : [],
  };
}

function numericValues(rows, column) {
  return rows
    .map((row) => Number(String(row[column] ?? "").replace(",", ".")))
    .filter((value) => Number.isFinite(value));
}

function inferDatasetColumn(column = "", rows = []) {
  const lower = column.toLowerCase();
  const values = numericValues(rows, column);
  const unitMatch = column.match(/\(([^)]+)\)|\[([^\]]+)\]/);
  let role = "metadata";
  let modelParameter = "";
  if (/time|hour|minute|date|timestamp|batch/.test(lower)) {
    role = "time_or_batch";
    modelParameter = "dynamic profile / schedule";
  } else if (/titer|product|concentration/.test(lower)) {
    role = "productivity";
    modelParameter = "titerGL, yield, batch profile";
  } else if (/viab|vcd|cell|biomass|od/.test(lower)) {
    role = "cell_growth";
    modelParameter = "viableCellDensityMillionMl, biomass growth";
  } else if (/glucose|substrate|feed|nutrient|glutamine/.test(lower)) {
    role = "nutrient";
    modelParameter = "glucoseGL, glutamineMm, feedStrategy";
  } else if (/oxygen|do|kla|otr|our/.test(lower)) {
    role = "oxygen_transfer";
    modelParameter = "klaH, ourMolLh, DO boundary";
  } else if (/lactate|ammon|nh4|nh3|ph|osmo/.test(lower)) {
    role = "metabolite_boundary";
    modelParameter = "lactateMm, ammoniumMm, pH, osmolality";
  } else if (/cost|price|eur|usd|capex|opex|media|resin|filter/.test(lower)) {
    role = "economics";
    modelParameter = "TEA cost driver";
  } else if (/energy|steam|water|wfi|electric|cooling|heat|co2|waste/.test(lower)) {
    role = "lca_utility";
    modelParameter = "LCA/utility inventory";
  } else if (/equipment|unit|resource|room|operator|clean|cip|sip|duration|start|finish/.test(lower)) {
    role = "schedule_resource";
    modelParameter = "finite-capacity schedule";
  }
  return {
    name: column,
    role,
    modelParameter,
    inferredUnit: unitMatch?.[1] || unitMatch?.[2] || "",
    numeric: values.length,
    missing: rows.filter((row) => String(row[column] ?? "").trim() === "").length,
    min: values.length ? Math.min(...values) : "",
    max: values.length ? Math.max(...values) : "",
    mean: values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : "",
  };
}

function datasetModelTargets(columns = []) {
  const roles = new Set(columns.map((column) => column.role));
  const targets = [];
  if (roles.has("cell_growth") || roles.has("productivity")) targets.push("Fit growth/productivity kinetics and update titer, yield and batch duration.");
  if (roles.has("oxygen_transfer")) targets.push("Calibrate kLa/OUR and CFD oxygen-transfer boundary conditions.");
  if (roles.has("nutrient") || roles.has("metabolite_boundary")) targets.push("Update feed strategy, ammonium/lactate/pH/osmolality boundary checks and soft-sensor variables.");
  if (roles.has("economics")) targets.push("Replace screening TEA assumptions with company-specific material, media, resin, filter, labor or CAPEX data.");
  if (roles.has("lca_utility")) targets.push("Replace screening LCA inventory with site-specific energy, water, steam, gas, waste and emissions data.");
  if (roles.has("schedule_resource")) targets.push("Update finite-capacity scheduling, equipment utilization, rooms, cleaning windows and personnel demand.");
  return targets.length ? targets : ["Store as project evidence and manually map columns to model parameters."];
}

function datasetQuality(parsed, columnProfiles, kind) {
  const issues = [...(parsed.issues || [])];
  if (parsed.rowCount < 3) issues.push("Few rows; useful as evidence, but weak for fitting or validation.");
  if (!columnProfiles.some((column) => column.role === "time_or_batch")) issues.push("No obvious time/batch column; dynamic calibration may need manual mapping.");
  if (kind === "historian" && !columnProfiles.some((column) => column.role === "oxygen_transfer" || column.role === "metabolite_boundary")) {
    issues.push("Historian data should normally include DO, pH, temperature, feed, gas or metabolite tags.");
  }
  if (kind === "tea" && !columnProfiles.some((column) => column.role === "economics")) {
    issues.push("TEA data should include cost, price, CAPEX, OPEX, material, utility or labor columns.");
  }
  if (kind === "lca" && !columnProfiles.some((column) => column.role === "lca_utility")) {
    issues.push("LCA data should include energy, water, material, waste, emissions or utility columns.");
  }
  return {
    score: Math.max(15, Math.min(98, 88 - issues.length * 13 + Math.min(10, parsed.rowCount / 12))),
    issues,
    readyFor: datasetModelTargets(columnProfiles),
  };
}

function datasetNumericValues(dataset, pattern) {
  const rows = Array.isArray(dataset?.parsedRows) ? dataset.parsedRows : [];
  const column = (dataset?.columns || []).find((name) => pattern.test(String(name).toLowerCase()));
  if (!column) return { column: "", values: [] };
  return {
    column,
    values: rows
      .map((row) => Number(String(row?.[column] ?? "").replace(",", ".")))
      .filter(Number.isFinite),
  };
}

function percentile(values = [], fraction = 0.5) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.max(0, Math.min(sorted.length - 1, Math.round((sorted.length - 1) * fraction)));
  return sorted[index];
}

function boundedPlantValue(value, min, max, digits = 2) {
  if (!Number.isFinite(value)) return null;
  const bounded = Math.max(min, Math.min(max, value));
  return Number(bounded.toFixed(digits));
}

function aggregateDatasetMeasure(datasets, pattern) {
  const matches = datasets.map((dataset) => {
    const measure = datasetNumericValues(dataset, pattern);
    return { ...measure, dataset };
  }).filter((item) => item.values.length);
  return {
    values: matches.flatMap((item) => item.values),
    columns: [...new Set(matches.map((item) => item.column))],
    datasetIds: [...new Set(matches.map((item) => item.dataset.id))],
    datasetNames: [...new Set(matches.map((item) => item.dataset.name))],
  };
}

function plantDataModelChanges(datasets = [], modelState = {}) {
  const changes = [];
  const params = { ...(modelState.params || {}) };
  const addParam = (key, label, pattern, reducer, min, max, unit, convert = (value) => value) => {
    const measure = aggregateDatasetMeasure(datasets, pattern);
    if (!measure.values.length) return;
    const raw = reducer(measure.values);
    const value = boundedPlantValue(convert(raw, measure.columns), min, max);
    if (value === null || value === Number(params[key])) return;
    changes.push({
      scope: "parameter",
      key,
      label,
      from: Number(params[key]),
      to: value,
      unit,
      sourceColumns: measure.columns,
      datasetIds: measure.datasetIds,
      datasetNames: measure.datasetNames,
      basis: `Derived from ${measure.values.length} numeric plant records.`,
      confidence: measure.values.length >= 20 ? "high" : measure.values.length >= 5 ? "medium" : "screening",
    });
  };
  const addModelValue = (key, label, pattern, reducer, min, max, unit) => {
    const measure = aggregateDatasetMeasure(datasets, pattern);
    if (!measure.values.length) return;
    const value = boundedPlantValue(reducer(measure.values), min, max);
    if (value === null || value === Number(modelState[key])) return;
    changes.push({
      scope: "model",
      key,
      label,
      from: Number(modelState[key]),
      to: value,
      unit,
      sourceColumns: measure.columns,
      datasetIds: measure.datasetIds,
      datasetNames: measure.datasetNames,
      basis: `Derived from ${measure.values.length} numeric plant records.`,
      confidence: measure.values.length >= 20 ? "high" : measure.values.length >= 5 ? "medium" : "screening",
    });
  };

  addParam("viability", "Viability", /(^|_)viab(ility)?(_|$)|viable_pct/, (values) => percentile(values, 0.5), 45, 99, "%");
  addParam("cellDensity", "Peak cell density", /vcd|viable_cell|cell_density|biomass/, (values) => Math.max(...values), 0.2, 120, "M cells/mL");
  addParam("glucose", "Glucose setpoint", /glucose|substrate(_g_l)?/, (values) => percentile(values, 0.5), 0.2, 12, "g/L");
  addParam("glutamine", "Glutamine", /glutamine|gln/, (values) => percentile(values, 0.5), 0, 8, "mM");
  addParam(
    "lactate",
    "Lactate limit",
    /lactate|lac(_|$)/,
    (values) => Math.max(...values),
    0.2,
    8,
    "g/L",
    (value, columns) => columns.some((column) => /mmol|_mm|mm$/i.test(column)) ? value * 0.09008 : value,
  );
  addParam("ammonia", "Ammonium / ammonia limit", /ammon|nh4|nh3/, (values) => Math.max(...values), 0.2, 8, "mM");
  addParam("ph", "pH", /(^|_)ph($|_)/, (values) => percentile(values, 0.5), 5.5, 8.2, "");
  addParam("temperature", "Temperature", /temp|temperature/, (values) => percentile(values, 0.5), 20, 39, "C");
  addParam("doSetpoint", "Dissolved oxygen", /dissolved_oxygen|do_pct|oxygen_pct/, (values) => percentile(values, 0.5), 10, 80, "% air sat.");
  addParam("kla", "kLa", /(^|_)kla($|_)|k_la/, (values) => percentile(values, 0.5), 2, 260, "1/h");
  addParam("our", "OUR", /(^|_)our($|_)|oxygen_uptake/, (values) => percentile(values, 0.5), 0.2, 18, "mmol/L/h");
  addParam("aeration", "Aeration", /aeration|gas_flow_vvm|airflow_vvm/, (values) => percentile(values, 0.5), 0.01, 2.5, "vvm");
  addParam("feedRate", "Feed rate", /feed_rate|feed_pct|feed_percent/, (values) => percentile(values, 0.5), 0, 80, "% vol/day");
  addParam("cipTime", "CIP cycle time", /cleaning_h|cip_time|cip_duration/, (values) => percentile(values, 0.5), 0.2, 16, "h");
  addParam("equipmentUptime", "Equipment uptime", /equipment_uptime|uptime_pct|availability_pct/, (values) => percentile(values, 0.5), 50, 99.9, "%");
  addParam("mediaCostPerL", "Media cost", /media_cost_per_l|media_price_per_l/, (values) => percentile(values, 0.5), 0.1, 500, "currency/L");
  addParam("resinCostPerL", "Resin cost", /resin_cost_per_l|resin_price_per_l/, (values) => percentile(values, 0.5), 50, 25000, "currency/L resin");
  addModelValue("titer", "Process titer", /titer|product_concentration/, (values) => Math.max(...values), 0.01, 500, "g/L");
  addModelValue("recovery", "Overall recovery", /overall_recovery|recovery_pct|total_yield_pct/, (values) => percentile(values, 0.5), 1, 99, "%");
  addModelValue("batchSize", "Batch / working volume", /batch_volume_l|working_volume_l|volume_l/, (values) => percentile(values, 0.5), 1, 2_000_000, "L");
  addModelValue("batchCount", "Annual batch count", /annual_batches|batches_per_year/, (values) => percentile(values, 0.5), 1, 2000, "batches/year");

  datasets.filter((dataset) => dataset.kind === "tea").forEach((dataset) => {
    const rows = Array.isArray(dataset.parsedRows) ? dataset.parsedRows : [];
    rows.forEach((row) => {
      const itemEntry = Object.entries(row).find(([key]) => /item|material|description|name/i.test(key));
      const costEntry = Object.entries(row).find(([key]) => /unit_cost|unit_price|price_per/i.test(key));
      if (!itemEntry || !costEntry) return;
      const item = String(itemEntry[1] || "").toLowerCase();
      const rawCost = Number(String(costEntry[1] ?? "").replace(",", "."));
      if (!Number.isFinite(rawCost)) return;
      const target = item.includes("basal media") || item === "media"
        ? ["mediaCostPerL", "Media cost", 0.1, 500, "currency/L"]
        : item.includes("feed") || item.includes("supplement")
          ? ["feedSupplementCostPerL", "Feed / supplement cost", 0, 1200, "currency/L"]
          : item.includes("buffer")
            ? ["bufferCostPerL", "Buffer cost", 0.05, 80, "currency/L"]
            : item.includes("resin")
              ? ["resinCostPerL", "Resin cost", 50, 25000, "currency/L resin"]
              : null;
      if (!target) return;
      const [key, label, min, max, unit] = target;
      const value = boundedPlantValue(rawCost, min, max);
      const existing = changes.find((change) => change.scope === "parameter" && change.key === key);
      if (existing) {
        existing.to = value;
        existing.datasetIds = [...new Set([...existing.datasetIds, dataset.id])];
        existing.datasetNames = [...new Set([...existing.datasetNames, dataset.name])];
        existing.sourceColumns = [...new Set([...existing.sourceColumns, costEntry[0]])];
        existing.basis = `Mapped from the company TEA line item "${itemEntry[1]}".`;
        return;
      }
      if (value !== Number(params[key])) {
        changes.push({
          scope: "parameter",
          key,
          label,
          from: Number(params[key]),
          to: value,
          unit,
          sourceColumns: [costEntry[0]],
          datasetIds: [dataset.id],
          datasetNames: [dataset.name],
          basis: `Mapped from the company TEA line item "${itemEntry[1]}".`,
          confidence: "high",
        });
      }
    });
  });
  return changes;
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
  const parsed = parseDatasetContent(body.contentText || body.rawText || body.csv || "");
  const columns = parsed.columns.length ? parsed.columns : Array.isArray(body.columns) ? body.columns.map(String).slice(0, 80) : [];
  const columnProfiles = columns.map((column) => inferDatasetColumn(column, parsed.rows || []));
  const kind = String(body.kind || "experimental").trim().slice(0, 80);
  const quality = datasetQuality(parsed, columnProfiles, kind);
  const dataset = {
    id: randomUUID(),
    projectId,
    projectName: project?.name || "",
    name: String(body.name || "Axion dataset").trim().slice(0, 160),
    kind,
    sourceId: String(body.sourceId || "").trim().slice(0, 120),
    fileName: String(body.fileName || "").trim().slice(0, 220),
    mimeType: String(body.mimeType || "").trim().slice(0, 120),
    size: Number(body.size || String(body.contentText || "").length || 0),
    schema: {
      ...(body.schema && typeof body.schema === "object" ? body.schema : {}),
      format: parsed.format,
      delimiter: parsed.delimiter || "",
      columns: columnProfiles,
    },
    columns,
    previewRows: parsed.rows?.length ? parsed.rows.slice(0, 10) : Array.isArray(body.previewRows) ? body.previewRows.slice(0, 10) : [],
    rowCount: parsed.rowCount || 0,
    parsedRows: parsed.rows?.slice(0, 250) || [],
    quality: body.quality ? String(body.quality).trim().slice(0, 80) : quality.score >= 75 ? "model-ready screening data" : "needs mapping review",
    qualityScore: Number(quality.score.toFixed(1)),
    qualityIssues: quality.issues,
    modelTargets: quality.readyFor,
    calibrationPackage: {
      parameterTargets: [...new Set(columnProfiles.map((column) => column.modelParameter).filter(Boolean))],
      columnRoles: columnProfiles.map((column) => ({ name: column.name, role: column.role, modelParameter: column.modelParameter, inferredUnit: column.inferredUnit })),
      recommendedNextRun: quality.readyFor.join(" "),
    },
    modelPatchPreview: plantDataModelChanges([{
      id: "preview",
      name: String(body.name || "Axion dataset").trim().slice(0, 160),
      kind,
      columns,
      parsedRows: parsed.rows?.slice(0, 250) || [],
    }], body.modelState || {}),
    createdAt: now,
    createdBy: sessionPrincipal(session),
    storage: supabaseConfigured() ? "supabase-postgres-record" : "local-json-record",
    nextStep: "Review column roles, then run Python screening or update TEA/LCA/schedule parameters from accepted company data.",
  };
  db.datasets.unshift(dataset);
  db.audit.unshift({ at: now, type: "dataset.created", datasetId: dataset.id, projectId, by: sessionPrincipal(session) });
  await saveDb(db);
  json(res, 201, { dataset });
}

async function applyDatasetsToModel(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const body = await parseBody(req);
  const projectId = String(body.projectId || "").trim();
  const datasetIds = [...new Set((Array.isArray(body.datasetIds) ? body.datasetIds : []).map(String))];
  if (!projectId || !datasetIds.length) {
    json(res, 400, { error: "A saved project and at least one dataset are required" });
    return;
  }
  const db = ensureDbShape(await loadDb());
  const project = db.projects.find((item) => item.id === projectId);
  if (!project || !canAccessProject(session, project)) {
    json(res, 404, { error: "Project not found" });
    return;
  }
  const datasets = db.datasets.filter((dataset) => datasetIds.includes(dataset.id) && dataset.projectId === projectId);
  if (datasets.length !== datasetIds.length) {
    json(res, 404, { error: "One or more datasets are not accessible in this project" });
    return;
  }
  const currentPayload = await readProjectModel(projectId);
  const currentModelState = body.modelState && typeof body.modelState === "object"
    ? body.modelState
    : currentPayload?.modelState || {};
  const changes = plantDataModelChanges(datasets, currentModelState);
  const now = new Date().toISOString();
  const modelStateAfter = {
    ...currentModelState,
    params: { ...(currentModelState.params || {}) },
    plantDataBindings: [
      ...(Array.isArray(currentModelState.plantDataBindings) ? currentModelState.plantDataBindings : []),
      ...datasets.map((dataset) => ({
        datasetId: dataset.id,
        name: dataset.name,
        kind: dataset.kind,
        sourceId: dataset.sourceId,
        fileName: dataset.fileName,
        rowCount: dataset.rowCount,
        qualityScore: dataset.qualityScore,
        appliedAt: now,
      })),
    ].slice(-100),
    dataApplicationHistory: [
      {
        appliedAt: now,
        appliedBy: sessionPrincipal(session),
        datasetIds,
        changeCount: changes.length,
        changes,
      },
      ...(Array.isArray(currentModelState.dataApplicationHistory) ? currentModelState.dataApplicationHistory : []),
    ].slice(0, 30),
  };
  changes.forEach((change) => {
    if (change.scope === "parameter") modelStateAfter.params[change.key] = change.to;
    else modelStateAfter[change.key] = change.to;
  });

  const versionId = randomUUID();
  if (currentPayload) await writeArchivedVersion(projectId, versionId, currentPayload);
  project.updatedAt = now;
  project.currentVersionId = versionId;
  project.versionCount = (project.versionCount || 0) + 1;
  project.template = String(modelStateAfter.template || project.template || "");
  project.scale = String(modelStateAfter.scale || project.scale || "");
  const summary = {
    ...(body.summary || currentPayload?.summary || {}),
    plantDatasetsApplied: datasets.length,
    plantRowsRegistered: datasets.reduce((sum, dataset) => sum + (dataset.rowCount || 0), 0),
    plantRowsAnalyzed: datasets.reduce((sum, dataset) => sum + (dataset.parsedRows?.length || 0), 0),
    updatedParameters: changes.length,
  };
  await writeProjectModel(projectId, {
    project: sanitizeProject(project),
    savedAt: now,
    savedBy: sessionPrincipal(session),
    summary,
    modelState: modelStateAfter,
    dataApplication: { datasetIds, changes },
  });
  db.projectVersions.unshift({
    id: versionId,
    projectId,
    createdAt: now,
    createdBy: sessionPrincipal(session),
    label: `Plant data import: ${datasets.length} dataset${datasets.length === 1 ? "" : "s"}`,
    summary,
  });
  datasets.forEach((dataset) => {
    dataset.appliedAt = now;
    dataset.appliedBy = sessionPrincipal(session);
    dataset.appliedVersionId = versionId;
    dataset.appliedChanges = changes.filter((change) => change.datasetIds.includes(dataset.id));
    dataset.nextStep = changes.length
      ? "Review the applied model diff, run mass/energy balances, scheduling and CFD screening, then validate against a held-out batch."
      : "No unit-compatible parameter was changed. Review column mapping and units manually.";
  });
  db.audit.unshift({
    at: now,
    type: "datasets.applied",
    projectId,
    datasetIds,
    versionId,
    changeCount: changes.length,
    by: sessionPrincipal(session),
  });
  await saveDb(db);
  json(res, 200, {
    project: sanitizeProject(project),
    versionId,
    modelState: modelStateAfter,
    changes,
    appliedDatasets: datasets.map((dataset) => ({
      id: dataset.id,
      name: dataset.name,
      rowCount: dataset.rowCount,
      qualityScore: dataset.qualityScore,
    })),
    rowsRegistered: datasets.reduce((sum, dataset) => sum + (dataset.rowCount || 0), 0),
    rowsAnalyzed: datasets.reduce((sum, dataset) => sum + (dataset.parsedRows?.length || 0), 0),
    untouchedColumns: datasets.flatMap((dataset) => (dataset.schema?.columns || [])
      .filter((column) => column.role === "metadata")
      .map((column) => `${dataset.name}: ${column.name}`)).slice(0, 80),
  });
}

async function exportDataset(req, res, datasetId) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const db = ensureDbShape(await loadDb());
  const dataset = db.datasets.find((item) => item.id === datasetId);
  if (!dataset) {
    json(res, 404, { error: "Dataset not found" });
    return;
  }
  if (dataset.projectId) {
    const project = db.projects.find((item) => item.id === dataset.projectId);
    if (!project || !canAccessProject(session, project)) {
      json(res, 404, { error: "Dataset not found" });
      return;
    }
  } else if (session.role !== "admin" && dataset.createdBy !== sessionPrincipal(session)) {
    json(res, 404, { error: "Dataset not found" });
    return;
  }
  jsonDownload(res, `${dataset.name || dataset.id}-axion-dataset.json`, {
    product: config.productName,
    exportedAt: new Date().toISOString(),
    exportedBy: sessionPrincipal(session),
    dataset,
    note: "Company-supplied data package with detected schema, column roles, quality flags, calibration targets and preview rows. Validate mappings before using for regulated or investment-critical decisions.",
  });
}

function integrationSecretKey() {
  return createHash("sha256").update(config.sessionSecret).digest();
}

function encryptIntegrationSecret(value) {
  if (!value) return "";
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", integrationSecretKey(), iv);
  const encrypted = Buffer.concat([cipher.update(String(value), "utf8"), cipher.final()]);
  return [iv.toString("base64url"), cipher.getAuthTag().toString("base64url"), encrypted.toString("base64url")].join(".");
}

function decryptIntegrationSecret(value) {
  if (!value) return "";
  const [iv, tag, encrypted] = String(value).split(".");
  if (!iv || !tag || !encrypted) return "";
  const decipher = createDecipheriv("aes-256-gcm", integrationSecretKey(), Buffer.from(iv, "base64url"));
  decipher.setAuthTag(Buffer.from(tag, "base64url"));
  return Buffer.concat([decipher.update(Buffer.from(encrypted, "base64url")), decipher.final()]).toString("utf8");
}

function sanitizeGitHubConnection(connection) {
  return {
    id: connection.id,
    repository: connection.repository,
    ref: connection.ref,
    manifestPath: connection.manifestPath,
    status: connection.status || "configured",
    private: Boolean(connection.private),
    tokenConfigured: Boolean(connection.tokenCiphertext),
    tokenHint: connection.tokenHint || "",
    importedCount: Number(connection.importedCount || 0),
    lastSyncedAt: connection.lastSyncedAt || "",
    error: connection.error || "",
  };
}

function normalizeRepository(value) {
  const repository = String(value || "").trim().replace(/^https?:\/\/github\.com\//i, "").replace(/\.git$/i, "").replace(/^\/+|\/+$/g, "");
  return /^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(repository) ? repository : "";
}

function normalizeManifestPath(value) {
  const path = String(value || ".axion/integrations.json").trim().replace(/^\/+/, "");
  if (!path || path.includes("..") || !/^[a-zA-Z0-9_./-]+\.json$/i.test(path)) return "";
  return path;
}

async function githubApiRequest(path, token = "") {
  const response = await fetch(`${config.githubApiBaseUrl}${path}`, {
    signal: AbortSignal.timeout(15000),
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "Axion-Process-OS",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }
  if (!response.ok) {
    const detail = payload?.message ? `: ${payload.message}` : "";
    throw new Error(`GitHub request failed (${response.status})${detail}`);
  }
  return payload;
}

function personalIntegrationId(connectionId, key) {
  return `personal-${createHash("sha256").update(`${connectionId}:${key}`).digest("hex").slice(0, 16)}`;
}

function normalizePersonalIntegration(definition, connection, index = 0) {
  const rawKey = String(definition.key || definition.id || definition.name || `api-${index + 1}`).toLowerCase();
  const key = rawKey.replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 80) || `api-${index + 1}`;
  const endpoints = Array.isArray(definition.endpoints)
    ? definition.endpoints.slice(0, 100).map((endpoint) => typeof endpoint === "string" ? endpoint : `${String(endpoint.method || "GET").toUpperCase()} ${endpoint.path || endpoint.url || ""}`.trim())
    : [];
  const payloads = Array.isArray(definition.payloads)
    ? definition.payloads.slice(0, 20).map(String)
    : endpoints.slice(0, 8);
  const baseUrl = /^https?:\/\//i.test(String(definition.baseUrl || "")) ? String(definition.baseUrl).slice(0, 500) : "";
  return {
    id: personalIntegrationId(connection.id, key),
    key: `custom-${connection.id.slice(0, 8)}-${key}`,
    sourceKey: key,
    name: String(definition.name || definition.title || key).slice(0, 120),
    category: String(definition.category || "Personal API").slice(0, 80),
    status: "GitHub synced",
    direction: String(definition.direction || "Customer-defined API handoff").slice(0, 220),
    auth: String(definition.auth || definition.authType || "configured by company").slice(0, 120),
    description: String(definition.description || "API definition imported from a connected GitHub repository.").slice(0, 1000),
    payloads: payloads.length ? payloads : ["project JSON", "equipment", "streams", "parameters"],
    endpoints,
    baseUrl,
    owner: connection.owner,
    connectionId: connection.id,
    repository: connection.repository,
    manifestPath: connection.manifestPath,
    source: "github",
  };
}

function integrationsFromManifest(manifest, connection) {
  let definitions = [];
  if (Array.isArray(manifest)) definitions = manifest;
  else if (Array.isArray(manifest?.integrations)) definitions = manifest.integrations;
  else if (Array.isArray(manifest?.connectors)) definitions = manifest.connectors;
  else if (Array.isArray(manifest?.apis)) definitions = manifest.apis;
  else if (manifest?.openapi || manifest?.swagger) {
    const endpoints = Object.entries(manifest.paths || {}).flatMap(([path, methods]) => Object.keys(methods || {}).filter((method) => /^(get|post|put|patch|delete)$/i.test(method)).map((method) => `${method.toUpperCase()} ${path}`));
    definitions = [{
      key: manifest.info?.title || "openapi",
      name: manifest.info?.title || "Imported OpenAPI",
      description: manifest.info?.description || "OpenAPI definition imported from GitHub.",
      category: "OpenAPI",
      baseUrl: manifest.servers?.[0]?.url || "",
      endpoints,
      payloads: [...new Set(Object.values(manifest.paths || {}).flatMap((methods) => Object.values(methods || {}).flatMap((operation) => operation?.tags || [])))],
      auth: Object.keys(manifest.components?.securitySchemes || {}).join(", ") || "defined by OpenAPI",
    }];
  }
  return definitions.slice(0, 50).filter((definition) => definition && typeof definition === "object").map((definition, index) => normalizePersonalIntegration(definition, connection, index));
}

async function syncGitHubConnection(db, connection) {
  const token = decryptIntegrationSecret(connection.tokenCiphertext);
  const [owner, repository] = connection.repository.split("/");
  const repoPath = `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}`;
  const encodedManifest = connection.manifestPath.split("/").map(encodeURIComponent).join("/");
  const [repositoryInfo, content] = await Promise.all([
    githubApiRequest(repoPath, token),
    githubApiRequest(`${repoPath}/contents/${encodedManifest}?ref=${encodeURIComponent(connection.ref)}`, token),
  ]);
  if (content?.type !== "file" || content.encoding !== "base64" || !content.content) throw new Error("The GitHub manifest must be a JSON file smaller than the repository contents API limit.");
  let manifest;
  try {
    manifest = JSON.parse(Buffer.from(String(content.content).replace(/\s/g, ""), "base64").toString("utf8"));
  } catch {
    throw new Error("The GitHub integration manifest is not valid JSON.");
  }
  const integrations = integrationsFromManifest(manifest, connection);
  if (!integrations.length) throw new Error("No integrations were found. Add integrations[], connectors[], apis[], or an OpenAPI JSON document.");
  db.personalIntegrations = db.personalIntegrations.filter((item) => item.connectionId !== connection.id);
  db.personalIntegrations.push(...integrations);
  connection.status = "connected";
  connection.private = Boolean(repositoryInfo.private);
  connection.defaultBranch = repositoryInfo.default_branch || connection.ref;
  connection.importedCount = integrations.length;
  connection.lastSyncedAt = new Date().toISOString();
  connection.error = "";
  return integrations;
}

function availableIntegrations(db, session) {
  const principal = sessionPrincipal(session);
  const personal = db.personalIntegrations.filter((item) => session.role === "admin" || normalizePrincipal(item.owner) === principal);
  return [...integrationRegistry(), ...personal];
}

async function connectGitHubRepository(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) return json(res, 401, { error: "Not authenticated" });
  const body = await parseBody(req);
  const repository = normalizeRepository(body.repository);
  const manifestPath = normalizeManifestPath(body.manifestPath);
  const ref = String(body.ref || "main").trim().slice(0, 200);
  const token = String(body.token || "").trim();
  if (!repository) return json(res, 400, { error: "Enter a GitHub repository as owner/name" });
  if (!manifestPath) return json(res, 400, { error: "Enter a safe JSON manifest path" });
  if (!ref || /\s/.test(ref)) return json(res, 400, { error: "Enter a valid branch, tag, or commit ref" });
  if (token.length > 1000) return json(res, 400, { error: "GitHub token is too long" });
  const db = ensureDbShape(await loadDb());
  const owner = sessionPrincipal(session);
  let connection = db.githubConnections.find((item) => normalizePrincipal(item.owner) === owner && item.repository.toLowerCase() === repository.toLowerCase() && item.manifestPath === manifestPath);
  const now = new Date().toISOString();
  if (!connection) {
    connection = { id: randomUUID(), owner, repository, ref, manifestPath, createdAt: now, status: "configuring", tokenCiphertext: "", tokenHint: "" };
    db.githubConnections.push(connection);
  }
  connection.ref = ref;
  connection.updatedAt = now;
  if (token) {
    connection.tokenCiphertext = encryptIntegrationSecret(token);
    connection.tokenHint = token.slice(-4);
  }
  try {
    const integrations = await syncGitHubConnection(db, connection);
    db.audit.unshift({ at: now, type: "github.integration.connected", connectionId: connection.id, repository, importedCount: integrations.length, by: owner });
    await saveDb(db);
    json(res, 201, { connection: sanitizeGitHubConnection(connection), integrations });
  } catch (error) {
    connection.status = "error";
    connection.error = String(error.message || error).slice(0, 500);
    await saveDb(db);
    json(res, 502, { error: connection.error, connection: sanitizeGitHubConnection(connection) });
  }
}

async function resyncGitHubRepository(req, res, connectionId) {
  const session = verifySession(getBearer(req));
  if (!session) return json(res, 401, { error: "Not authenticated" });
  const db = ensureDbShape(await loadDb());
  const owner = sessionPrincipal(session);
  const connection = db.githubConnections.find((item) => item.id === connectionId && (session.role === "admin" || normalizePrincipal(item.owner) === owner));
  if (!connection) return json(res, 404, { error: "GitHub connection not found" });
  try {
    const integrations = await syncGitHubConnection(db, connection);
    db.audit.unshift({ at: connection.lastSyncedAt, type: "github.integration.synced", connectionId, repository: connection.repository, importedCount: integrations.length, by: owner });
    await saveDb(db);
    json(res, 200, { connection: sanitizeGitHubConnection(connection), integrations });
  } catch (error) {
    connection.status = "error";
    connection.error = String(error.message || error).slice(0, 500);
    await saveDb(db);
    json(res, 502, { error: connection.error, connection: sanitizeGitHubConnection(connection) });
  }
}

async function disconnectGitHubRepository(req, res, connectionId) {
  const session = verifySession(getBearer(req));
  if (!session) return json(res, 401, { error: "Not authenticated" });
  const db = ensureDbShape(await loadDb());
  const owner = sessionPrincipal(session);
  const connection = db.githubConnections.find((item) => item.id === connectionId && (session.role === "admin" || normalizePrincipal(item.owner) === owner));
  if (!connection) return json(res, 404, { error: "GitHub connection not found" });
  db.githubConnections = db.githubConnections.filter((item) => item.id !== connectionId);
  db.personalIntegrations = db.personalIntegrations.filter((item) => item.connectionId !== connectionId);
  db.audit.unshift({ at: new Date().toISOString(), type: "github.integration.disconnected", connectionId, repository: connection.repository, by: owner });
  await saveDb(db);
  json(res, 200, { removed: true, connectionId });
}

function integrationRegistry() {
  return [
    {
      key: "github-repository",
      name: "GitHub API repository",
      category: "Personal integrations",
      status: "repository sync available",
      direction: "Import company API manifests and OpenAPI JSON",
      auth: "fine-grained token or public repository",
      description: "Connect a repository, keep its token encrypted on the backend, and sync declarative API definitions into the Axion connector registry.",
    },
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
      status: "handoff ready",
      direction: "Export streams, property package, and economics basis",
      auth: "enterprise API or file",
      description: "Stream vectors, component properties, unit-operation duty and economics basis can be packaged for customer-owned external workflows.",
    },
    {
      key: "comsol",
      name: "COMSOL Multiphysics",
      category: "CFD / multiphysics",
      status: "handoff ready",
      direction: "Export reactor geometry and boundary conditions",
      auth: "file/API",
      description: "Reactor geometry, sparger, impeller, boundary conditions, kinetics and turbulence assumptions can be packaged for rigorous CFD setup.",
    },
    {
      key: "starccm",
      name: "Simcenter STAR-CCM+",
      category: "CFD",
      status: "handoff ready",
      direction: "Export CFD screening cases",
      auth: "file/API",
      description: "Oxygen, nutrient, shear, gas-liquid, turbulence and agitation case metadata can be exported for external CFD review.",
    },
    {
      key: "gproms",
      name: "gPROMS / equation-oriented modelling",
      category: "High-fidelity modelling",
      status: "handoff ready",
      direction: "Export equations, parameters, units, and estimation cases",
      auth: "file/API",
      description: "Dynamic equations, parameters, estimation cases, soft-sensor variables and optimization payloads are packaged for external model work.",
    },
    {
      key: "opcua",
      name: "OPC UA / SCADA",
      category: "Live plant data",
      status: "edge gateway + telemetry API ready",
      direction: "Subscribe/read plus approval-gated writes",
      auth: "X.509 trust + gateway token + user role",
      description: "OPC UA monitored-item tags feed the Factory Twin through a backend edge gateway. Physical writes remain locked until connection, role, allowlist and closed-loop approval checks pass.",
    },
    {
      key: "osisoft-pi",
      name: "AVEVA PI / OSIsoft PI",
      category: "Historian",
      status: "historian ingestion API ready",
      direction: "Read current and recorded process values",
      auth: "PI Web API identity via edge gateway",
      description: "Quality-coded PI values can be ingested into the Axion historian, mapped to process variables, trended, and used for model residuals and advisory control.",
    },
    {
      key: "benchling",
      name: "Benchling",
      category: "ELN/LIMS",
      status: "schema map ready",
      direction: "Read experiments and assays",
      auth: "API key/OAuth",
      description: "Titer, viability, media, assay, strain and cell-line metadata fields are mapped; live sync needs customer API access.",
    },
    {
      key: "limsid",
      name: "LIMS / ELN generic",
      category: "Quality data",
      status: "schema map ready",
      direction: "Read/write assay metadata",
      auth: "API key",
      description: "Release-test, sterility, HCP, DNA, endotoxin and bioburden handoff fields are available as export contract.",
    },
    {
      key: "erp",
      name: "ERP / procurement",
      category: "Economics",
      status: "schema map ready",
      direction: "Read material prices, inventory, and vendor quote records",
      auth: "enterprise connector",
      description: "Regional costs, supplier quotes, media BOMs, consumables, resin, packaging and working-capital fields are mapped for procurement integration.",
    },
    {
      key: "powerbi",
      name: "Power BI / data warehouse",
      category: "Analytics",
      status: "export ready",
      direction: "Publish TEA/LCA and portfolio metrics",
      auth: "workspace token",
      description: "Dashboard-ready TEA, LCA, scenario KPI, portfolio, emissions, COGS and readiness tables can be exported from the workspace.",
    },
  ];
}

function connectorPayloadGroups(key) {
  const byKey = {
    "github-repository": ["integration manifest", "OpenAPI JSON", "endpoint catalogue", "payload contract"],
    "legacy-simulator": ["stream table CSV", "equipment register CSV", "mass and energy balances", "economic report basis"],
    "rest-api": ["project JSON", "version records", "unit operations", "stream table", "reports"],
    "python-sdk": ["model id", "parameter set", "run id", "sweep matrix", "calibration output"],
    webhooks: ["project.created", "model.versioned", "run.completed", "report.ready", "license.activated"],
    "cloud-runs": ["scenario queue", "parameter grid", "Monte Carlo package", "run results"],
    "supabase-postgres": ["users", "projects", "datasets", "simulation runs", "audit events"],
    aspen: ["component list", "stream vectors", "property assumptions", "unit duty table"],
    comsol: ["bioreactor geometry", "boundary conditions", "sparger metadata", "impeller zones"],
    starccm: ["CFD case matrix", "mesh basis", "gas-liquid assumptions", "shear and oxygen targets"],
    gproms: ["equations", "state variables", "parameters", "estimation case", "optimization objective"],
    opcua: ["tag map", "sample interval", "parameter binding", "live telemetry stream"],
    "osisoft-pi": ["historian tags", "time-series calibration data", "deviation windows", "soft-sensor inputs"],
    benchling: ["experiment metadata", "assay tables", "cell-line records", "media and titer data"],
    limsid: ["QC assay fields", "release metadata", "sample chain", "batch record handoff"],
    erp: ["material prices", "inventory levels", "vendor quotes", "consumable BOM"],
    powerbi: ["TEA tables", "LCA tables", "scenario KPIs", "portfolio dashboards"],
  };
  return byKey[key] || ["stream data", "equipment metadata", "parameter set", "report export"];
}

function connectorMappingChecks(integration, modelSnapshot = {}) {
  const units = Number(modelSnapshot.units ?? modelSnapshot.unitCount ?? 0);
  const streams = Number(modelSnapshot.streams ?? modelSnapshot.streamCount ?? 0);
  const equations = Number(modelSnapshot.equations ?? modelSnapshot.equationCount ?? 0);
  const scheduleRows = Number(modelSnapshot.scheduleRows ?? modelSnapshot.scheduleCount ?? 0);
  const payloads = integration.payloads?.length ? integration.payloads : connectorPayloadGroups(integration.key);
  const needsCredentials = /planned|connector|SDK|queue|handoff/i.test(integration.status || "");
  return [
    { label: "Equipment register", value: `${units} units mapped`, status: units >= 12 ? "pass" : "warn" },
    { label: "Stream table", value: `${streams} streams available`, status: streams >= 10 ? "pass" : "warn" },
    { label: "Equation layer", value: `${equations} equations available`, status: equations >= 40 ? "pass" : "warn" },
    { label: "Scheduling handoff", value: `${scheduleRows} transfer slots`, status: scheduleRows > 0 ? "pass" : "warn" },
    { label: "Payload contract", value: `${payloads.length} payload groups`, status: payloads.length >= 3 ? "pass" : "warn" },
    { label: "Live credentials", value: needsCredentials ? "Customer credentials required" : "Controlled export ready", status: needsCredentials ? "hold" : "pass" },
  ];
}

function connectorConfigurationRows(integration, modelSnapshot = {}) {
  const payloads = integration.payloads?.length ? integration.payloads : connectorPayloadGroups(integration.key);
  return [
    ["Connector mode", integration.status?.includes("planned") ? "Prepared handoff shell" : "Configured handoff scaffold"],
    ["Authentication", integration.auth || "credential setup"],
    ["Model source", `${modelSnapshot.projectName || "Current model"} · ${modelSnapshot.template || "active process"}`],
    ["Data contract", payloads.join(" + ")],
    ...(integration.repository ? [["GitHub source", `${integration.repository}/${integration.manifestPath}`]] : []),
  ];
}

function connectorActionResult(action, integration, modelSnapshot = {}) {
  const checks = connectorMappingChecks(integration, modelSnapshot);
  const passCount = checks.filter((check) => check.status === "pass").length;
  const rows = connectorConfigurationRows(integration, modelSnapshot);
  if (action === "test") {
    return {
      mode: "Mapping test",
      title: `${passCount}/${checks.length} checks passed`,
      message: passCount === checks.length
        ? "The model is ready for a controlled connector handoff. Live sync still requires customer-approved credentials."
        : "The model can be exported as a handoff package, but credentials, schema mapping, or fuller process data are still needed before live sync.",
      rows,
      checks,
    };
  }
  if (action === "export") {
    return {
      mode: "Export",
      title: "Backend handoff package prepared",
      message: "A server-side connector package was prepared with the current model summary, stream/equipment previews, schedule previews, payload contract and validation checks.",
      rows: [...rows, ["Prepared by", "Axion backend"], ["Prepared at", new Date().toISOString()]],
      checks,
    };
  }
  return {
    mode: "Configure",
    title: "Connector configuration opened",
    message: "Review authentication, payload groups, mapping checks and data contract before enabling a live third-party integration.",
    rows,
    checks,
  };
}

async function connectorAction(req, res, integrationKey) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const body = await parseBody(req);
  const action = ["configure", "test", "export"].includes(body.action) ? body.action : "configure";
  const db = ensureDbShape(await loadDb());
  const integration = availableIntegrations(db, session).find((item) => item.key === integrationKey);
  if (!integration) {
    json(res, 404, { error: "Connector not found" });
    return;
  }
  const now = new Date().toISOString();
  const modelSnapshot = body.modelSnapshot && typeof body.modelSnapshot === "object" ? body.modelSnapshot : {};
  const result = connectorActionResult(action, integration, modelSnapshot);
  const handoff = action === "export" ? {
    product: config.productName,
    generatedAt: now,
    generatedBy: sessionPrincipal(session),
    project: {
      id: modelSnapshot.projectId || "",
      name: modelSnapshot.projectName || "",
      template: modelSnapshot.template || "",
      scale: modelSnapshot.scale || "",
    },
    connector: integration,
    payloads: integration.payloads?.length ? integration.payloads : connectorPayloadGroups(integration.key),
    modelSnapshot,
    checks: result.checks,
    note: "Live third-party synchronization requires customer credentials, vendor API access, schema mapping and project-specific validation.",
  } : null;
  const run = {
    id: randomUUID(),
    createdAt: now,
    createdBy: sessionPrincipal(session),
    action,
    connectorKey: integration.key,
    connectorName: integration.name,
    projectId: modelSnapshot.projectId || "",
    result,
    handoff,
  };
  db.connectorRuns.unshift(run);
  db.audit.unshift({ at: now, type: `connector.${action}`, connectorKey: integration.key, runId: run.id, by: sessionPrincipal(session) });
  await saveDb(db);
  json(res, 200, { connector: integration, runId: run.id, result, handoff });
}

const automationTagDefinitions = [
  { tag: "BR101.PV.DO", label: "Dissolved oxygen", unit: "%", min: 0, max: 100, target: 40, writable: false, modelKey: "dissolvedOxygen" },
  { tag: "BR101.SP.DO", label: "DO setpoint", unit: "%", min: 10, max: 80, target: 40, writable: true, modelKey: "dissolvedOxygenSetpoint" },
  { tag: "BR101.PV.PH", label: "pH", unit: "pH", min: 6, max: 8, target: 7.1, writable: false, modelKey: "pH" },
  { tag: "BR101.SP.PH", label: "pH setpoint", unit: "pH", min: 6.5, max: 7.5, target: 7.1, writable: true, modelKey: "pHSetpoint" },
  { tag: "BR101.PV.TEMP", label: "Temperature", unit: "degC", min: 20, max: 45, target: 37, writable: false, modelKey: "temperature" },
  { tag: "BR101.SP.TEMP", label: "Temperature setpoint", unit: "degC", min: 25, max: 42, target: 37, writable: true, modelKey: "temperatureSetpoint" },
  { tag: "BR101.MV.AGITATION", label: "Agitation command", unit: "rpm", min: 20, max: 160, target: 78, writable: true, modelKey: "agitation" },
  { tag: "BR101.MV.AIRFLOW", label: "Air-flow command", unit: "vvm", min: 0, max: 1.5, target: 0.35, writable: true, modelKey: "airflow" },
  { tag: "BR101.MV.FEED", label: "Feed command", unit: "L/h", min: 0, max: 500, target: 110, writable: true, modelKey: "feedRate" },
  { tag: "BR101.MV.BASE", label: "Base addition command", unit: "mL/min", min: 0, max: 200, target: 24, writable: true, modelKey: "baseAddition" },
  { tag: "BR101.MV.JACKET", label: "Jacket valve command", unit: "%", min: 0, max: 100, target: 48, writable: true, modelKey: "jacketValve" },
  { tag: "BR101.PV.LEVEL", label: "Working volume", unit: "%", min: 0, max: 85, target: 72, writable: false, modelKey: "workingVolume" },
  { tag: "BR101.PV.PRESSURE", label: "Headspace pressure", unit: "bar(g)", min: 0, max: 1.5, target: 0.25, writable: false, modelKey: "pressure" },
  { tag: "BR101.PV.AMMONIUM", label: "Ammonium soft sensor", unit: "mM", min: 0, max: 8, target: 1.5, writable: false, modelKey: "ammonium" },
  { tag: "BR101.PV.LACTATE", label: "Lactate soft sensor", unit: "g/L", min: 0, max: 8, target: 1.8, writable: false, modelKey: "lactate" },
  { tag: "BATCH.PHASE", label: "Batch phase", unit: "state", min: 0, max: 8, target: 3, writable: false, modelKey: "batchPhase" },
];

const automationTagMap = automationTagDefinitions.map((definition) => ({
  ...definition,
  nodeId: `ns=2;s=${definition.tag}`,
  dataType: definition.tag === "BATCH.PHASE" ? "Int32" : "Double",
  criticality: definition.tag.includes(".MV.") ? "CMA" : definition.tag === "BATCH.PHASE" ? "context" : "CPP",
  commissioningState: "template-node-id",
}));

const automationLoopTemplates = [
  { key: "do-cascade", name: "DO cascade", pvTag: "BR101.PV.DO", spTag: "BR101.SP.DO", mvTag: "BR101.MV.AGITATION", kp: 1.8, ki: 0.08, kd: 0.05, outputMin: 30, outputMax: 150, rateLimit: 8, safetyLow: 10, safetyHigh: 80 },
  { key: "ph-control", name: "pH control", pvTag: "BR101.PV.PH", spTag: "BR101.SP.PH", mvTag: "BR101.MV.BASE", kp: 18, ki: 0.6, kd: 0.2, outputMin: 0, outputMax: 200, rateLimit: 15, safetyLow: 6.6, safetyHigh: 7.5 },
  { key: "temperature", name: "Temperature control", pvTag: "BR101.PV.TEMP", spTag: "BR101.SP.TEMP", mvTag: "BR101.MV.JACKET", kp: 8, ki: 0.35, kd: 0.1, outputMin: 0, outputMax: 100, rateLimit: 8, safetyLow: 30, safetyHigh: 40 },
];

function automationOwner(session) {
  return sessionPrincipal(session);
}

function automationProjectAllowed(db, session, projectId = "") {
  if (!projectId) return true;
  const project = db.projects.find((item) => item.id === projectId);
  return Boolean(project && canAccessProject(session, project));
}

function sanitizeAutomationConnection(connection) {
  return {
    id: connection.id,
    owner: connection.owner,
    projectId: connection.projectId || "",
    name: connection.name,
    kind: connection.kind,
    endpoint: connection.endpoint,
    securityMode: connection.securityMode,
    mode: connection.mode,
    status: connection.status,
    writeEnabled: Boolean(connection.writeEnabled),
    secretConfigured: Boolean(connection.secretCiphertext),
    lastTestedAt: connection.lastTestedAt || "",
    lastConnectedAt: connection.lastConnectedAt || "",
    error: connection.error || "",
    commissioning: connection.commissioning || null,
  };
}

function ensureAutomationLoops(db, owner, projectId = "") {
  automationLoopTemplates.forEach((template) => {
    const exists = db.automationControlLoops.some((item) => item.owner === owner && item.projectId === projectId && item.key === template.key);
    if (exists) return;
    db.automationControlLoops.push({
      id: randomUUID(),
      owner,
      projectId,
      ...template,
      mode: "observe",
      enabled: true,
      integral: 0,
      previousError: 0,
      previousOutput: template.outputMin,
      lastCycleAt: "",
      approvedBy: "",
      approvedAt: "",
      connectionId: "",
    });
  });
}

function simulationTelemetry(now = Date.now()) {
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
  const timestamp = new Date(now).toISOString();
  return automationTagDefinitions.map((definition) => ({
    id: `sim-${definition.tag}`,
    tag: definition.tag,
    value: values[definition.tag] ?? definition.target,
    unit: definition.unit,
    quality: "Good",
    sourceTimestamp: timestamp,
    receivedAt: timestamp,
    source: "Axion verified simulator",
    simulated: true,
  }));
}

function latestAutomationTelemetry(db, owner, projectId = "") {
  const samples = db.automationTelemetry
    .filter((item) => item.owner === owner && item.projectId === projectId)
    .sort((a, b) => String(b.sourceTimestamp).localeCompare(String(a.sourceTimestamp)));
  const latest = new Map();
  samples.forEach((item) => {
    if (!latest.has(item.tag)) latest.set(item.tag, item);
  });
  simulationTelemetry().forEach((item) => {
    if (!latest.has(item.tag)) latest.set(item.tag, item);
  });
  return [...latest.values()];
}

function automationHistory(db, owner, projectId = "", limit = 240) {
  const stored = db.automationTelemetry
    .filter((item) => item.owner === owner && item.projectId === projectId)
    .sort((a, b) => String(a.sourceTimestamp).localeCompare(String(b.sourceTimestamp)))
    .slice(-limit);
  if (stored.length) return stored;
  const now = Date.now();
  return Array.from({ length: 48 }, (_, index) => simulationTelemetry(now - (47 - index) * 60_000))
    .flat()
    .filter((item) => ["BR101.PV.DO", "BR101.PV.PH", "BR101.PV.TEMP", "BR101.PV.AMMONIUM", "BR101.PV.LACTATE"].includes(item.tag));
}

function automationSnapshot(db, session, projectId = "") {
  const owner = automationOwner(session);
  ensureAutomationLoops(db, owner, projectId);
  const connections = db.automationConnections
    .filter((item) => item.owner === owner && item.projectId === projectId)
    .map(sanitizeAutomationConnection);
  const loops = db.automationControlLoops.filter((item) => item.owner === owner && item.projectId === projectId);
  const actions = db.automationActions
    .filter((item) => item.owner === owner && item.projectId === projectId)
    .slice(0, 40);
  const commissioningRuns = db.automationCommissioningRuns
    .filter((item) => item.owner === owner && item.projectId === projectId)
    .slice(0, 10);
  return {
    projectId,
    gateway: {
      configured: Boolean((config.automationGatewayUrl && config.automationGatewayToken) || (config.automationIngestToken && config.automationIngestOwner)),
      writesEnabled: config.automationWritesEnabled,
      physicalWritePolicy: config.automationWritesEnabled ? "approved closed-loop writes only" : "physical writes locked",
    },
    connections,
    tagDefinitions: automationTagDefinitions,
    tagMap: automationTagMap,
    latest: latestAutomationTelemetry(db, owner, projectId),
    history: automationHistory(db, owner, projectId),
    loops,
    actions,
    commissioningRuns,
    generatedAt: new Date().toISOString(),
    note: "Simulation and advisory control are available immediately. Physical PLC writes require an approved edge gateway, a write-enabled connection, a closed-loop approval and AXION_AUTOMATION_WRITES_ENABLED=true.",
  };
}

async function listAutomationState(req, res, query) {
  const session = verifySession(getBearer(req));
  if (!session) return json(res, 401, { error: "Not authenticated" });
  const projectId = String(query.get("projectId") || "").slice(0, 200);
  const db = ensureDbShape(await loadDb());
  if (!automationProjectAllowed(db, session, projectId)) return json(res, 404, { error: "Project not found" });
  const snapshot = automationSnapshot(db, session, projectId);
  await saveDb(db);
  json(res, 200, snapshot);
}

async function createAutomationConnection(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) return json(res, 401, { error: "Not authenticated" });
  const body = await parseBody(req);
  const db = ensureDbShape(await loadDb());
  const projectId = String(body.projectId || "").slice(0, 200);
  if (!automationProjectAllowed(db, session, projectId)) return json(res, 404, { error: "Project not found" });
  const kind = ["simulation", "opcua-edge", "pi-web-api", "mqtt-edge"].includes(body.kind) ? body.kind : "simulation";
  const endpoint = String(body.endpoint || "").trim().slice(0, 1000);
  if (kind !== "simulation" && !endpoint) return json(res, 400, { error: "Enter the plant endpoint exposed to the approved edge gateway." });
  const owner = automationOwner(session);
  const now = new Date().toISOString();
  const connection = {
    id: randomUUID(),
    owner,
    projectId,
    name: String(body.name || `${kind} connection`).trim().slice(0, 120),
    kind,
    endpoint: kind === "simulation" ? "axion://verified-simulator" : endpoint,
    securityMode: kind === "opcua-edge" ? String(body.securityMode || "SignAndEncrypt").slice(0, 80) : "TLS",
    mode: body.mode === "read-write" ? "read-write" : "read-only",
    status: kind === "simulation" ? "connected" : "configured",
    writeEnabled: Boolean(body.writeEnabled && body.mode === "read-write" && config.automationWritesEnabled),
    secretCiphertext: body.secret ? encryptIntegrationSecret(String(body.secret).slice(0, 4000)) : "",
    createdAt: now,
    updatedAt: now,
    lastConnectedAt: kind === "simulation" ? now : "",
    error: "",
    commissioning: kind === "simulation"
      ? { status: "simulator", readyForRead: true, readyForWrite: false, checks: [] }
      : { status: "blocked", readyForRead: false, readyForWrite: false, checks: [] },
  };
  db.automationConnections.unshift(connection);
  db.audit.unshift({ at: now, type: "automation.connection.created", projectId, connectionId: connection.id, kind, by: owner });
  await saveDb(db);
  json(res, 201, { connection: sanitizeAutomationConnection(connection), state: automationSnapshot(db, session, projectId) });
}

async function testAutomationConnection(req, res, connectionId) {
  const session = verifySession(getBearer(req));
  if (!session) return json(res, 401, { error: "Not authenticated" });
  const db = ensureDbShape(await loadDb());
  const owner = automationOwner(session);
  const connection = db.automationConnections.find((item) => item.id === connectionId && item.owner === owner);
  if (!connection) return json(res, 404, { error: "Automation connection not found" });
  const now = new Date().toISOString();
  let result = {
    ok: true,
    status: connection.commissioning?.readyForRead ? "edge-ready" : "awaiting-edge",
    detail: connection.commissioning?.readyForRead
      ? "The private edge gateway has reported a valid read-only commissioning release."
      : "Waiting for the private OT/DMZ edge gateway to report its commissioning status over outbound HTTPS.",
    commissioning: connection.commissioning || null,
  };
  if (connection.kind === "simulation") {
    result = { ok: true, status: "connected", detail: "Axion verified simulator is producing quality-coded telemetry." };
  } else if (config.automationGatewayUrl && config.automationGatewayToken) {
    try {
      const response = await fetch(`${config.automationGatewayUrl}/v1/connections/test`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${config.automationGatewayToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          kind: connection.kind,
          endpoint: connection.endpoint,
          securityMode: connection.securityMode,
          mode: connection.mode,
          credential: decryptIntegrationSecret(connection.secretCiphertext),
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.error || payload.message || `Gateway test failed with ${response.status}`);
      result = {
        ok: true,
        status: "connected",
        detail: payload.detail || "Edge gateway accepted the connection contract.",
        commissioning: payload.commissioning || null,
      };
    } catch (error) {
      result = { ok: false, status: "error", detail: String(error.message || error).slice(0, 500) };
    }
  }
  if (result.commissioning) connection.commissioning = result.commissioning;
  connection.status = result.status;
  connection.error = result.ok ? "" : result.detail;
  connection.lastTestedAt = now;
  if (result.ok) connection.lastConnectedAt = now;
  db.audit.unshift({ at: now, type: "automation.connection.tested", projectId: connection.projectId, connectionId, ok: result.ok, by: owner });
  await saveDb(db);
  json(res, result.ok ? 200 : 424, { result, connection: sanitizeAutomationConnection(connection), state: automationSnapshot(db, session, connection.projectId) });
}

async function ingestAutomationTelemetry(req, res) {
  const token = getBearer(req);
  let session = verifySession(token);
  let machineIngest = false;
  if (!session && config.automationIngestToken && config.automationIngestOwner && safeCompare(token, config.automationIngestToken)) {
    session = {
      username: config.automationIngestOwner,
      name: "Axion automation edge gateway",
      role: "automation-gateway",
    };
    machineIngest = true;
  }
  if (!session) return json(res, 401, { error: "Not authenticated" });
  const body = await parseBody(req);
  const db = ensureDbShape(await loadDb());
  const projectId = String(body.projectId || "").slice(0, 200);
  if (!automationProjectAllowed(db, session, projectId)) return json(res, 404, { error: "Project not found" });
  const owner = automationOwner(session);
  const connectionId = String(body.connectionId || "").slice(0, 200);
  const connection = db.automationConnections.find((item) => item.id === connectionId && item.owner === owner && item.projectId === projectId);
  if (connectionId && !connection) return json(res, 404, { error: "Automation connection not found" });
  const samples = Array.isArray(body.samples) ? body.samples.slice(0, 1000) : [];
  if (!samples.length) return json(res, 400, { error: "Provide at least one telemetry sample." });
  const receivedAt = new Date().toISOString();
  const accepted = samples.flatMap((sample) => {
    const tag = String(sample.tag || "").trim().slice(0, 200);
    const value = Number(sample.value);
    if (!tag || !Number.isFinite(value)) return [];
    return [{
      id: randomUUID(),
      owner,
      projectId,
      connectionId,
      tag,
      value,
      unit: String(sample.unit || automationTagDefinitions.find((item) => item.tag === tag)?.unit || "").slice(0, 40),
      quality: ["Good", "Uncertain", "Bad"].includes(sample.quality) ? sample.quality : "Good",
      sourceTimestamp: Number.isNaN(Date.parse(sample.timestamp)) ? receivedAt : new Date(sample.timestamp).toISOString(),
      receivedAt,
      source: connection?.name || "Axion API ingest",
      simulated: false,
    }];
  });
  db.automationTelemetry.push(...accepted);
  if (db.automationTelemetry.length > 20_000) db.automationTelemetry = db.automationTelemetry.slice(-20_000);
  db.audit.unshift({
    at: receivedAt,
    type: "automation.telemetry.ingested",
    projectId,
    connectionId,
    accepted: accepted.length,
    by: machineIngest ? `edge:${owner}` : owner,
  });
  await saveDb(db);
  json(res, 201, { accepted: accepted.length, rejected: samples.length - accepted.length, state: automationSnapshot(db, session, projectId) });
}

async function ingestAutomationEdgeStatus(req, res) {
  const token = getBearer(req);
  if (!config.automationIngestToken || !config.automationIngestOwner || !safeCompare(token, config.automationIngestToken)) {
    return json(res, 401, { error: "Machine edge-status authentication failed" });
  }
  const body = await parseBody(req);
  const db = ensureDbShape(await loadDb());
  const owner = config.automationIngestOwner;
  const projectId = String(body.projectId || "").slice(0, 200);
  const connectionId = String(body.connectionId || "").slice(0, 200);
  const session = { username: owner, role: "automation-gateway" };
  if (!automationProjectAllowed(db, session, projectId)) return json(res, 404, { error: "Project not found" });
  const connection = db.automationConnections.find((item) => item.id === connectionId && item.owner === owner && item.projectId === projectId);
  if (!connection) return json(res, 404, { error: "Automation connection not found" });
  const commissioning = body.commissioning && typeof body.commissioning === "object" ? body.commissioning : {};
  const checks = Array.isArray(commissioning.checks) ? commissioning.checks.slice(0, 30).map((item) => ({
    key: String(item.key || "").slice(0, 80),
    label: String(item.label || "").slice(0, 160),
    status: item.status === "pass" ? "pass" : "blocked",
    evidence: String(item.evidence || "").slice(0, 500),
    required: item.required !== false,
  })) : [];
  connection.commissioning = {
    status: ["blocked", "read-only-ready", "write-ready"].includes(commissioning.status) ? commissioning.status : "blocked",
    readyForRead: Boolean(commissioning.readyForRead),
    readyForWrite: Boolean(commissioning.readyForWrite),
    siteId: String(commissioning.siteId || "").slice(0, 160),
    projectId: String(commissioning.projectId || "").slice(0, 200),
    tagCount: Number(commissioning.tagCount || 0),
    certificatesInstalled: Boolean(commissioning.certificatesInstalled),
    writeReleaseApproved: Boolean(commissioning.writeReleaseApproved),
    checks,
  };
  connection.status = connection.commissioning.readyForRead ? "edge-ready" : "edge-blocked";
  connection.lastTestedAt = new Date().toISOString();
  connection.error = connection.commissioning.readyForRead ? "" : "The OT commissioning gate is incomplete.";
  db.audit.unshift({
    at: connection.lastTestedAt,
    type: "automation.edge-status.ingested",
    projectId,
    connectionId,
    status: connection.commissioning.status,
    by: `edge:${owner}`,
  });
  await saveDb(db);
  json(res, 201, { accepted: true, commissioning: connection.commissioning });
}

function commissioningCheck(key, label, status, evidence, required = true) {
  return { key, label, status, evidence, required };
}

async function runAutomationCommissioning(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) return json(res, 401, { error: "Not authenticated" });
  const body = await parseBody(req);
  const db = ensureDbShape(await loadDb());
  const projectId = String(body.projectId || "").slice(0, 200);
  if (!automationProjectAllowed(db, session, projectId)) return json(res, 404, { error: "Project not found" });
  const owner = automationOwner(session);
  const connectionId = String(body.connectionId || "").slice(0, 200);
  const connection = db.automationConnections.find((item) => item.id === connectionId && item.owner === owner && item.projectId === projectId)
    || db.automationConnections.find((item) => item.owner === owner && item.projectId === projectId)
    || null;
  const latest = latestAutomationTelemetry(db, owner, projectId);
  const definitionMap = new Map(automationTagDefinitions.map((item) => [item.tag, item]));
  const good = latest.filter((item) => item.quality === "Good");
  const recent = latest.filter((item) => Date.now() - Date.parse(item.sourceTimestamp) < 120_000);
  const insideRange = latest.filter((item) => {
    const definition = definitionMap.get(item.tag);
    return !definition || (Number(item.value) >= definition.min && Number(item.value) <= definition.max);
  });
  const physical = connection && connection.kind !== "simulation";
  const edgeChecks = new Map((connection?.commissioning?.checks || []).map((item) => [item.key, item]));
  const edgeStatus = (key, fallback = "review") => edgeChecks.get(key)?.status === "pass" ? "pass" : fallback;
  const edgeEvidence = (key, fallback) => edgeChecks.get(key)?.evidence || fallback;
  const checks = [
    commissioningCheck(
      "connection",
      "Data-source handshake",
      connection?.status === "connected" ? "pass" : connection ? "review" : "fail",
      connection ? `${connection.name}: ${connection.status}` : "Create and test a data-source connection.",
    ),
    commissioningCheck(
      "read-only",
      "Read-only commissioning",
      !connection || connection.mode === "read-only" || connection.kind === "simulation" ? "pass" : "review",
      connection?.kind === "simulation" ? "Simulator has no physical outputs." : `Connection mode: ${connection?.mode || "not configured"}.`,
    ),
    commissioningCheck(
      "tag-map",
      "Tag-map completeness",
      automationTagMap.length === automationTagDefinitions.length ? "pass" : "fail",
      `${automationTagMap.length}/${automationTagDefinitions.length} required Axion tags have a node-map entry.`,
    ),
    commissioningCheck(
      "namespace",
      "Plant namespace review",
      physical ? edgeStatus("nodes", "fail") : "pass",
      physical ? edgeEvidence("nodes", "Replace template Node IDs with the exported and independently reviewed PLC namespace.") : "Template namespace is valid for the simulator.",
    ),
    commissioningCheck(
      "quality",
      "Signal quality",
      good.length === latest.length && latest.length ? "pass" : good.length ? "review" : "fail",
      `${good.length}/${latest.length} current values report Good quality.`,
    ),
    commissioningCheck(
      "timestamps",
      "Timestamp freshness",
      recent.length === latest.length && latest.length ? "pass" : "review",
      `${recent.length}/${latest.length} values are newer than 120 seconds.`,
    ),
    commissioningCheck(
      "engineering-limits",
      "Engineering-unit limits",
      insideRange.length === latest.length ? "pass" : "fail",
      `${insideRange.length}/${latest.length} values lie inside configured engineering ranges.`,
    ),
    commissioningCheck(
      "write-lock",
      "Physical write lock",
      !config.automationWritesEnabled ? "pass" : "review",
      config.automationWritesEnabled ? "Backend writes are enabled; verify gateway allowlist and site approval." : "Backend physical writes remain locked.",
    ),
    commissioningCheck(
      "interlocks",
      "PLC interlocks and independent trips",
      physical ? edgeStatus("documents", "site-evidence") : "not-applicable",
      physical ? edgeEvidence("documents", "Attach approved cause-and-effect, interlock and trip test evidence before closed-loop release.") : "Not applicable to the verified simulator.",
      physical,
    ),
    commissioningCheck(
      "site-pack",
      "OT site and project binding",
      physical ? (edgeStatus("manifest", "fail") === "pass" && edgeStatus("project", "fail") === "pass" ? "pass" : "fail") : "not-applicable",
      physical ? `${edgeEvidence("manifest", "Site manifest missing")} ${edgeEvidence("project", "Project binding missing")}` : "Not applicable to the verified simulator.",
      physical,
    ),
    commissioningCheck(
      "ot-network",
      "Industrial DMZ network path",
      physical ? edgeStatus("network", "site-evidence") : "not-applicable",
      physical ? edgeEvidence("network", "Approved OT/DMZ placement evidence missing.") : "Not applicable to the verified simulator.",
      physical,
    ),
    commissioningCheck(
      "opcua-trust",
      "OPC UA certificate trust",
      physical && edgeStatus("security", "fail") === "pass" && edgeStatus("certificate", "fail") === "pass" && edgeStatus("trust", "fail") === "pass" ? "pass" : physical ? "fail" : "not-applicable",
      physical ? `${edgeEvidence("security", "Security profile missing")} ${edgeEvidence("certificate", "Client certificate missing")} ${edgeEvidence("trust", "Server trust missing")}` : "Not applicable to the verified simulator.",
      physical,
    ),
    commissioningCheck(
      "historian",
      "Historian continuity",
      automationHistory(db, owner, projectId).length >= 30 ? "pass" : "review",
      `${automationHistory(db, owner, projectId).length} recent historian samples are available.`,
    ),
  ];
  const blocking = checks.filter((item) => item.required && ["fail", "site-evidence"].includes(item.status));
  const run = {
    id: randomUUID(),
    owner,
    projectId,
    connectionId: connection?.id || "",
    connectionName: connection?.name || "No connection",
    mode: physical ? "site-read-only" : "simulator",
    status: blocking.length ? "blocked" : checks.some((item) => item.status === "review") ? "review-required" : "passed",
    checks,
    createdAt: new Date().toISOString(),
    createdBy: owner,
  };
  db.automationCommissioningRuns.unshift(run);
  db.automationCommissioningRuns = db.automationCommissioningRuns.slice(0, 2000);
  db.audit.unshift({ at: run.createdAt, type: "automation.commissioning.run", projectId, connectionId: run.connectionId, status: run.status, by: owner });
  await saveDb(db);
  json(res, 201, { run, state: automationSnapshot(db, session, projectId) });
}

function boundedNumber(value, fallback, min, max) {
  const numeric = Number(value);
  return Math.max(min, Math.min(max, Number.isFinite(numeric) ? numeric : fallback));
}

async function updateAutomationLoop(req, res, loopId) {
  const session = verifySession(getBearer(req));
  if (!session) return json(res, 401, { error: "Not authenticated" });
  const body = await parseBody(req);
  const db = ensureDbShape(await loadDb());
  const owner = automationOwner(session);
  const loop = db.automationControlLoops.find((item) => item.id === loopId && item.owner === owner);
  if (!loop) return json(res, 404, { error: "Control loop not found" });
  const mode = ["manual", "observe", "advisory", "closed-loop"].includes(body.mode) ? body.mode : loop.mode;
  if (mode === "closed-loop" && !body.approved) {
    return json(res, 409, { error: "Closed-loop mode requires an explicit approval for this project and loop." });
  }
  loop.mode = mode;
  loop.enabled = body.enabled === undefined ? loop.enabled : Boolean(body.enabled);
  loop.kp = boundedNumber(body.kp, loop.kp, 0, 1000);
  loop.ki = boundedNumber(body.ki, loop.ki, 0, 1000);
  loop.kd = boundedNumber(body.kd, loop.kd, 0, 1000);
  loop.rateLimit = boundedNumber(body.rateLimit, loop.rateLimit, 0.001, 10000);
  loop.connectionId = String(body.connectionId || loop.connectionId || "").slice(0, 200);
  if (mode === "closed-loop") {
    loop.approvedBy = owner;
    loop.approvedAt = new Date().toISOString();
  } else {
    loop.approvedBy = "";
    loop.approvedAt = "";
  }
  const now = new Date().toISOString();
  db.audit.unshift({ at: now, type: "automation.loop.updated", projectId: loop.projectId, loopId, mode, by: owner });
  await saveDb(db);
  json(res, 200, { loop, state: automationSnapshot(db, session, loop.projectId) });
}

async function writeAutomationGateway(connection, payload) {
  if (!config.automationGatewayUrl || !config.automationGatewayToken) throw new Error("Automation gateway is not configured.");
  const response = await fetch(`${config.automationGatewayUrl}/v1/write`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${config.automationGatewayToken}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      connection: {
        kind: connection.kind,
        endpoint: connection.endpoint,
        securityMode: connection.securityMode,
        credential: decryptIntegrationSecret(connection.secretCiphertext),
      },
      write: payload,
    }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || result.message || `Gateway write failed with ${response.status}`);
  return result;
}

async function runAutomationCycle(req, res, loopId) {
  const session = verifySession(getBearer(req));
  if (!session) return json(res, 401, { error: "Not authenticated" });
  const db = ensureDbShape(await loadDb());
  const owner = automationOwner(session);
  const loop = db.automationControlLoops.find((item) => item.id === loopId && item.owner === owner);
  if (!loop) return json(res, 404, { error: "Control loop not found" });
  const latest = latestAutomationTelemetry(db, owner, loop.projectId);
  const pv = latest.find((item) => item.tag === loop.pvTag);
  const sp = latest.find((item) => item.tag === loop.spTag);
  const mv = latest.find((item) => item.tag === loop.mvTag);
  if (!pv || !sp || !mv) return json(res, 409, { error: "The loop is missing PV, SP or MV telemetry." });
  if (pv.quality !== "Good" || sp.quality !== "Good") return json(res, 409, { error: "Control calculation blocked because PV or SP quality is not Good." });
  const nowMs = Date.now();
  const previousMs = loop.lastCycleAt ? Date.parse(loop.lastCycleAt) : nowMs - 5000;
  const dt = Math.max(0.25, Math.min(60, (nowMs - previousMs) / 1000));
  const error = Number(sp.value) - Number(pv.value);
  const outsideSafety = Number(pv.value) < loop.safetyLow || Number(pv.value) > loop.safetyHigh;
  loop.integral = boundedNumber(loop.integral + error * dt, 0, -10000, 10000);
  const derivative = (error - Number(loop.previousError || 0)) / dt;
  const rawOutput = Number(mv.value) + loop.kp * error + loop.ki * loop.integral + loop.kd * derivative;
  const previousOutput = loop.lastCycleAt ? Number(loop.previousOutput ?? mv.value) : Number(mv.value);
  const rateDelta = Math.max(-loop.rateLimit, Math.min(loop.rateLimit, rawOutput - previousOutput));
  const output = boundedNumber(previousOutput + rateDelta, mv.value, loop.outputMin, loop.outputMax);
  const connection = db.automationConnections.find((item) => item.id === loop.connectionId && item.owner === owner);
  const simulatorWrite = connection?.kind === "simulation";
  const physicalWritePermitted = Boolean(
    loop.mode === "closed-loop"
    && loop.approvedBy
    && config.automationWritesEnabled
    && connection?.writeEnabled
    && connection.mode === "read-write"
    && config.automationGatewayUrl
    && config.automationGatewayToken
  );
  let execution = loop.mode === "advisory" || loop.mode === "observe" ? "recommendation" : "blocked";
  let gatewayResult = null;
  let reason = "";
  if (!loop.enabled) {
    reason = "Loop is disabled.";
  } else if (outsideSafety) {
    reason = "PV is outside the configured safety envelope; automatic action is inhibited.";
  } else if (loop.mode === "closed-loop" && simulatorWrite) {
    execution = "simulated-write";
    reason = "Command applied to the Axion simulator only.";
  } else if (physicalWritePermitted) {
    try {
      gatewayResult = await writeAutomationGateway(connection, {
        tag: loop.mvTag,
        value: output,
        timestamp: new Date(nowMs).toISOString(),
        reason: `${loop.name}: PV ${pv.value}, SP ${sp.value}`,
        approvedBy: loop.approvedBy,
      });
      execution = "physical-write";
      reason = "Approved write acknowledged by the edge gateway.";
    } catch (errorWrite) {
      execution = "write-failed";
      reason = String(errorWrite.message || errorWrite).slice(0, 500);
    }
  } else if (loop.mode === "closed-loop") {
    reason = "Physical write is locked until the backend flag, gateway, write-enabled connection and approval are all present.";
  } else if (loop.mode === "manual") {
    reason = "Manual mode calculates no automatic actuation.";
  } else if (loop.mode === "advisory") {
    reason = "Recommendation calculated from current PV, SP and MV; no command was written.";
  } else if (loop.mode === "observe") {
    reason = "Observe mode records the calculated response without proposing automatic actuation.";
  }
  loop.previousError = error;
  loop.previousOutput = output;
  loop.lastCycleAt = new Date(nowMs).toISOString();
  const action = {
    id: randomUUID(),
    owner,
    projectId: loop.projectId,
    loopId: loop.id,
    loopName: loop.name,
    at: loop.lastCycleAt,
    mode: loop.mode,
    pvTag: loop.pvTag,
    pv: Number(pv.value),
    spTag: loop.spTag,
    sp: Number(sp.value),
    mvTag: loop.mvTag,
    currentMv: Number(mv.value),
    proposedMv: output,
    error,
    execution,
    reason,
    gatewayAcknowledgement: gatewayResult?.acknowledgement || "",
    by: owner,
  };
  db.automationActions.unshift(action);
  db.automationActions = db.automationActions.slice(0, 5000);
  db.audit.unshift({ at: action.at, type: "automation.control.cycle", projectId: loop.projectId, loopId, execution, by: owner });
  await saveDb(db);
  json(res, 200, { action, loop, state: automationSnapshot(db, session, loop.projectId) });
}

async function listProjects(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const db = ensureDbShape(await loadDb());
  db.projects.forEach((project) => ensureProjectBranches(db, project));
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
    integrations: availableIntegrations(db, session),
    githubConnections: db.githubConnections
      .filter((connection) => session.role === "admin" || normalizePrincipal(connection.owner) === sessionPrincipal(session))
      .map(sanitizeGitHubConnection),
    storage: {
      provider: supabaseConfigured() ? "supabase-postgres" : "local-json",
      activeModels: supabaseConfigured() ? `${config.supabaseDocumentsTable}: kind=project_model` : projectsDir,
      archivedModels: supabaseConfigured() ? `${config.supabaseDocumentsTable}: kind=project_version` : archiveDir,
      runDocuments: supabaseConfigured() ? `${config.supabaseDocumentsTable}: kind=simulation_run` : runsDir,
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
    currentBranchId: `main-${id}`,
    currentBranchName: "main",
    branchCount: 1,
  };
  const modelPayload = {
    project: sanitizeProject(project),
    savedAt: now,
    savedBy: sessionPrincipal(session),
    summary: body.summary || {},
    modelState: body.modelState || {},
  };
  db.projects.unshift(project);
  db.projectBranches.unshift({
    id: project.currentBranchId,
    projectId: id,
    name: "main",
    headVersionId: versionId,
    createdAt: now,
    updatedAt: now,
    createdBy: sessionPrincipal(session),
  });
  db.projectVersions.unshift({
    id: versionId,
    projectId: id,
    createdAt: now,
    createdBy: sessionPrincipal(session),
    label: "Initial model",
    summary: body.summary || {},
    branchId: project.currentBranchId,
    branchName: "main",
    parentVersionId: "",
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
  const branches = ensureProjectBranches(db, project);
  json(res, 200, {
    project: sanitizeProject(project),
    model: await readProjectModel(projectId),
    versions: db.projectVersions.filter((item) => item.projectId === projectId).sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt))),
    branches: branches.sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt))),
    invites: db.invites.filter((item) => item.projectId === projectId),
  });
}

async function exportProject(req, res, projectId) {
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
  const model = await readProjectModel(projectId);
  const projectRuns = db.simulationRuns.filter((item) => item.projectId === projectId);
  const connectorRuns = db.connectorRuns.filter((item) => item.projectId === projectId);
  const cfdJobs = db.cfdJobs.filter((item) => item.projectId === projectId);
  const datasets = db.datasets.filter((item) => item.projectId === projectId);
  const exportPayload = {
    product: config.productName,
    exportedAt: new Date().toISOString(),
    exportedBy: sessionPrincipal(session),
    project: sanitizeProject(project),
    model,
    versions: db.projectVersions.filter((item) => item.projectId === projectId),
    invites: db.invites.filter((item) => item.projectId === projectId),
    datasets,
    simulationRuns: projectRuns,
    connectorRuns,
    cfdJobs,
    audit: db.audit.filter((item) => item.projectId === projectId || item.entityId === projectId).slice(0, 200),
    complianceNote: "Engineering export package for review, TEA/LCA handoff, project archive and controlled migration. Validate assumptions before GMP, regulatory, investment or safety-critical decisions.",
  };
  db.audit.unshift({ at: exportPayload.exportedAt, type: "project.exported", projectId, by: sessionPrincipal(session) });
  await saveDb(db);
  jsonDownload(res, `${project.name || project.id}-axion-export.json`, exportPayload);
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
  const branch = activeProjectBranch(db, project);
  const now = new Date().toISOString();
  const versionId = randomUUID();
  const parentVersionId = branch.headVersionId || project.currentVersionId || "";
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
    branchId: branch.id,
    branchName: branch.name,
    parentVersionId,
  };
  await writeProjectModel(projectId, payload);
  await writeArchivedVersion(projectId, versionId, payload);
  branch.headVersionId = versionId;
  branch.updatedAt = now;
  project.currentBranchId = branch.id;
  project.currentBranchName = branch.name;
  db.projectVersions.unshift({
    id: versionId,
    projectId,
    createdAt: now,
    createdBy: sessionPrincipal(session),
    label: String(body.label || `Saved ${project.versionCount}`).slice(0, 120),
    summary: body.summary || {},
    branchId: branch.id,
    branchName: branch.name,
    parentVersionId,
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
  const archived = await readArchivedVersion(projectId, versionId);
  if (!archived) {
    json(res, 404, { error: "Archived model version not found" });
    return;
  }
  const now = new Date().toISOString();
  const branch = activeProjectBranch(db, project);
  const restoredVersionId = randomUUID();
  const restoredPayload = {
    ...archived,
    project: sanitizeProject(project),
    savedAt: now,
    savedBy: sessionPrincipal(session),
    restoredAt: now,
    restoredBy: sessionPrincipal(session),
    restoredFromVersionId: versionId,
    branchId: branch.id,
    branchName: branch.name,
    parentVersionId: branch.headVersionId || project.currentVersionId || "",
  };
  await writeProjectModel(projectId, restoredPayload);
  await writeArchivedVersion(projectId, restoredVersionId, restoredPayload);
  project.updatedAt = now;
  project.currentVersionId = restoredVersionId;
  project.versionCount = (project.versionCount || 0) + 1;
  branch.headVersionId = restoredVersionId;
  branch.updatedAt = now;
  db.projectVersions.unshift({
    id: restoredVersionId,
    projectId,
    createdAt: now,
    createdBy: sessionPrincipal(session),
    label: `Restore ${String(versionId).slice(0, 8)}`,
    summary: archived.summary || {},
    branchId: branch.id,
    branchName: branch.name,
    parentVersionId: restoredPayload.parentVersionId,
    restoredFromVersionId: versionId,
  });
  db.audit.unshift({ at: now, type: "project.version.restored", projectId, versionId, restoredVersionId, branchId: branch.id, by: sessionPrincipal(session) });
  await saveDb(db);
  json(res, 200, { project: sanitizeProject(project), model: restoredPayload, versionId: restoredVersionId, branch });
}

async function createProjectBranch(req, res, projectId) {
  const session = verifySession(getBearer(req));
  if (!session) return json(res, 401, { error: "Not authenticated" });
  const body = await parseBody(req);
  const db = ensureDbShape(await loadDb());
  const project = db.projects.find((item) => item.id === projectId);
  if (!project || !canAccessProject(session, project)) return json(res, 404, { error: "Project not found" });
  const branches = ensureProjectBranches(db, project);
  const name = String(body.name || "").trim().replace(/\s+/g, "-").replace(/[^a-zA-Z0-9._/-]/g, "").slice(0, 64);
  if (!name) return json(res, 400, { error: "Enter a branch name" });
  if (branches.some((branch) => branch.name.toLowerCase() === name.toLowerCase())) return json(res, 409, { error: "A branch with this name already exists" });
  const sourceVersionId = String(body.fromVersionId || project.currentVersionId || "");
  let sourcePayload = sourceVersionId ? await readArchivedVersion(projectId, sourceVersionId) : null;
  if (!sourcePayload) sourcePayload = await readProjectModel(projectId);
  if (!sourcePayload) return json(res, 404, { error: "Branch source model not found" });
  const now = new Date().toISOString();
  let headVersionId = sourceVersionId;
  if (!headVersionId || !(await readArchivedVersion(projectId, headVersionId))) {
    headVersionId = randomUUID();
    await writeArchivedVersion(projectId, headVersionId, sourcePayload);
    db.projectVersions.unshift({ id: headVersionId, projectId, createdAt: now, createdBy: sessionPrincipal(session), label: `Branch point for ${name}`, summary: sourcePayload.summary || {}, branchId: project.currentBranchId, branchName: project.currentBranchName || "main", parentVersionId: project.currentVersionId || "" });
  }
  const branch = { id: randomUUID(), projectId, name, headVersionId, createdAt: now, updatedAt: now, createdBy: sessionPrincipal(session), sourceVersionId: headVersionId };
  db.projectBranches.unshift(branch);
  project.branchCount = branches.length + 1;
  project.updatedAt = now;
  db.audit.unshift({ at: now, type: "project.branch.created", projectId, branchId: branch.id, branchName: name, fromVersionId: headVersionId, by: sessionPrincipal(session) });
  await saveDb(db);
  json(res, 201, { branch, project: sanitizeProject(project) });
}

async function checkoutProjectBranch(req, res, projectId, branchId) {
  const session = verifySession(getBearer(req));
  if (!session) return json(res, 401, { error: "Not authenticated" });
  const db = ensureDbShape(await loadDb());
  const project = db.projects.find((item) => item.id === projectId);
  if (!project || !canAccessProject(session, project)) return json(res, 404, { error: "Project not found" });
  const branches = ensureProjectBranches(db, project);
  const branch = branches.find((item) => item.id === branchId || item.name === branchId);
  if (!branch) return json(res, 404, { error: "Branch not found" });
  const model = branch.headVersionId ? await readArchivedVersion(projectId, branch.headVersionId) : await readProjectModel(projectId);
  if (!model) return json(res, 404, { error: "Branch head model not found" });
  const now = new Date().toISOString();
  project.currentBranchId = branch.id;
  project.currentBranchName = branch.name;
  project.currentVersionId = branch.headVersionId;
  project.updatedAt = now;
  await writeProjectModel(projectId, { ...model, project: sanitizeProject(project), checkedOutAt: now, checkedOutBy: sessionPrincipal(session), branchId: branch.id, branchName: branch.name });
  db.audit.unshift({ at: now, type: "project.branch.checked_out", projectId, branchId: branch.id, branchName: branch.name, by: sessionPrincipal(session) });
  await saveDb(db);
  json(res, 200, { project: sanitizeProject(project), branch, model });
}

async function compareProjectVersions(req, res, projectId) {
  const session = verifySession(getBearer(req));
  if (!session) return json(res, 401, { error: "Not authenticated" });
  const body = await parseBody(req);
  const db = ensureDbShape(await loadDb());
  const project = db.projects.find((item) => item.id === projectId);
  if (!project || !canAccessProject(session, project)) return json(res, 404, { error: "Project not found" });
  const baseVersionId = String(body.baseVersionId || "");
  const headVersionId = String(body.headVersionId || "");
  const [base, head] = await Promise.all([readArchivedVersion(projectId, baseVersionId), readArchivedVersion(projectId, headVersionId)]);
  if (!base || !head) return json(res, 404, { error: "One or both model versions were not found" });
  json(res, 200, { baseVersionId, headVersionId, diff: summarizeVersionDiff(base, head) });
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
  const seatLimit = entitlementSnapshotForSession(session).features.collaboration?.limit;
  const alreadyAssigned = project.collaborators?.some((item) => normalizePrincipal(item.principal || item.email || item.username) === recipient);
  const assignedSeats = 1 + new Set((project.collaborators || []).map((item) => normalizePrincipal(item.principal || item.email || item.username)).filter(Boolean)).size;
  if (!alreadyAssigned && Number.isFinite(seatLimit) && assignedSeats >= seatLimit) {
    json(res, 409, {
      error: `The ${billingPlan(session.planId)?.name || "current"} plan includes ${seatLimit} named seats. Remove a collaborator or change the subscription before inviting another user.`,
      code: "SEAT_LIMIT_REACHED",
      seatLimit,
      assignedSeats,
    });
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
    note: "Invite is stored in Axion. Email delivery depends on backend email configuration.",
  };
  try {
    const emailResult = await sendInviteEmail(invite, project);
    invite.email = emailResult;
    if (emailResult.delivered) {
      invite.delivery = "email";
      invite.note = `Invite email sent via ${emailResult.provider}.`;
    }
  } catch (error) {
    invite.email = { delivered: false, provider: "error", error: error.message };
    invite.note = `Invite stored, but email sending failed: ${error.message}`;
  }
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
  const db = ensureDbShape(await loadDb());
  json(res, 200, {
    integrations: availableIntegrations(db, session),
    githubConnections: db.githubConnections
      .filter((connection) => session.role === "admin" || normalizePrincipal(connection.owner) === sessionPrincipal(session))
      .map(sanitizeGitHubConnection),
    note: "Built-in connector definitions and user-scoped GitHub API manifests. Repository tokens remain encrypted on the backend and are never returned to the browser.",
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
  if (license) {
    const order = db.orders.find((item) => item.id === license.orderId || item.licenseKey === license.key);
    if (order) await syncCommerceRecordToSupabase(order, license, user);
  }
  const token = signSession({
    sub: user.id,
    role: user.role || "user",
    email,
    username: user.username,
    name: user.name || profile.name || email,
    paymentExempt: Boolean(user.paymentExempt),
    licenseKey: license?.key || "",
    planId: license?.planId || "",
    planName: license?.planName || "",
    billingStatus: license?.billingStatus || "",
    stripeCustomerId: license?.stripeCustomerId || "",
    stripeSubscriptionId: license?.stripeSubscriptionId || "",
    currentPeriodEnd: license?.currentPeriodEnd || "",
    customerNumber: license?.customerNumber || "",
    contractNumber: license?.contractNumber || "",
    contractStatus: license?.billingStatus || "",
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
      entitlements: entitlementSnapshotForSession({ role: user.role || "user", paymentExempt: Boolean(user.paymentExempt), planId: license?.planId || "" }),
      billing: billingProfileForSession({
        role: user.role || "user",
        email,
        username: user.username,
        name: user.name,
        paymentExempt: Boolean(user.paymentExempt),
        licenseKey: license?.key || "",
        planId: license?.planId || "",
        planName: license?.planName || "",
        billingStatus: license?.billingStatus || "",
        stripeCustomerId: license?.stripeCustomerId || "",
        stripeSubscriptionId: license?.stripeSubscriptionId || "",
        currentPeriodEnd: license?.currentPeriodEnd || "",
        customerNumber: license?.customerNumber || "",
        contractNumber: license?.contractNumber || "",
        contractStatus: license?.billingStatus || "",
      }),
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
    json(res, 200, { token, account: { role: "admin", username: adminUsername, name: adminName, productName: config.productName, entitlements: entitlementSnapshotForSession({ role: "admin", paymentExempt: true }), billing: billingProfileForSession({ role: "admin", username: adminUsername, name: adminName, paymentExempt: true }) } });
    return;
  }

  const foundingAccess = db.foundingAccounts.find((item) => item.username === user || normalizePrincipal(item.email) === user);
  if (foundingAccess?.status === "blocked") {
    json(res, 403, { error: "This workspace account is suspended. Contact the Axion workspace owner.", code: "ACCOUNT_SUSPENDED" });
    return;
  }
  if (foundingAccess?.status === "payment_required") {
    json(res, 402, { error: "The founding access period has ended. Choose a subscription to continue.", code: "PAYMENT_REQUIRED", planId: foundingAccess.planId });
    return;
  }

  const localUser = db.users.find((item) => item.status === "active" && (item.username === user || item.email === user));
  if (localUser?.passwordHash && safeCompare(localUser.passwordHash, userPasswordHash(password))) {
    const localLicense = activeLicenseForEmail(db, localUser.email);
    if (localLicense) {
      const localOrder = db.orders.find((item) => item.id === localLicense.orderId || item.licenseKey === localLicense.key);
      if (localOrder) await syncCommerceRecordToSupabase(localOrder, localLicense, localUser);
    }
    const token = signSession({
      sub: localUser.id,
      role: localUser.role || "user",
      username: localUser.username,
      email: localUser.email,
      name: localUser.name,
      paymentExempt: Boolean(localUser.paymentExempt),
      licenseKey: localLicense?.key || "",
      planId: localLicense?.planId || "",
      planName: localLicense?.planName || "",
      billingStatus: localLicense?.billingStatus || "",
      stripeCustomerId: localLicense?.stripeCustomerId || "",
      stripeSubscriptionId: localLicense?.stripeSubscriptionId || "",
      currentPeriodEnd: localLicense?.currentPeriodEnd || "",
      customerNumber: localLicense?.customerNumber || "",
      contractNumber: localLicense?.contractNumber || "",
      contractStatus: localLicense?.billingStatus || "",
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
        licenseKey: localLicense?.key || "",
        entitlements: entitlementSnapshotForSession({ role: localUser.role || "user", paymentExempt: Boolean(localUser.paymentExempt), planId: localLicense?.planId || "" }),
        billing: billingProfileForSession({
          role: localUser.role || "user",
          username: localUser.username,
          email: localUser.email,
          name: localUser.name,
          paymentExempt: Boolean(localUser.paymentExempt),
          licenseKey: localLicense?.key || "",
          planId: localLicense?.planId || "",
          planName: localLicense?.planName || "",
          billingStatus: localLicense?.billingStatus || "",
          stripeCustomerId: localLicense?.stripeCustomerId || "",
          stripeSubscriptionId: localLicense?.stripeSubscriptionId || "",
          currentPeriodEnd: localLicense?.currentPeriodEnd || "",
          customerNumber: localLicense?.customerNumber || "",
          contractNumber: localLicense?.contractNumber || "",
          contractStatus: localLicense?.billingStatus || "",
        }),
      },
    });
    return;
  }

  const license = db.licenses.find((item) => item.key === licenseKey && item.status === "active");
  const emailMatches = !user || license?.customerEmail === user;
  if (license && emailMatches) {
    const order = db.orders.find((item) => item.id === license.orderId || item.licenseKey === license.key);
    if (order) await syncCommerceRecordToSupabase(order, license);
    const customerSession = {
      sub: license.key,
      role: "customer",
      email: license.customerEmail,
      name: license.customerName,
      licenseKey: license.key,
      planId: license.planId || "professional",
      planName: license.planName || "Professional",
      billingStatus: license.billingStatus || "",
      stripeCustomerId: license.stripeCustomerId || "",
      stripeSubscriptionId: license.stripeSubscriptionId || "",
      currentPeriodEnd: license.currentPeriodEnd || "",
      customerNumber: license.customerNumber || "",
      contractNumber: license.contractNumber || "",
      contractStatus: license.billingStatus || "",
      exp: Date.now() + 1000 * 60 * 60 * 24 * 14,
    };
    const token = signSession(customerSession);
    json(res, 200, {
      token,
      account: {
        role: "customer",
        name: license.customerName,
        email: license.customerEmail,
        productName: config.productName,
        licenseKey: license.key,
        entitlements: entitlementSnapshotForSession(customerSession),
        billing: billingProfileForSession(customerSession),
      },
    });
    return;
  }

  json(res, 402, { error: "Payment required. Sign in with a configured workspace account, use an activated license key, or create a paid order." });
}

async function account(req, res) {
  const verifiedSession = verifySession(getBearer(req));
  if (!verifiedSession) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const db = ensureDbShape(await loadDb());
  const foundingAccess = db.foundingAccounts.find((item) => normalizePrincipal(item.email) === normalizePrincipal(verifiedSession.email));
  if (foundingAccess?.status === "blocked") {
    json(res, 403, { error: "This workspace account is suspended. Contact the Axion workspace owner.", code: "ACCOUNT_SUSPENDED" });
    return;
  }
  if (foundingAccess?.status === "payment_required") {
    json(res, 402, { error: "The founding access period has ended. Choose a subscription to continue.", code: "PAYMENT_REQUIRED", planId: foundingAccess.planId });
    return;
  }
  const license = db.licenses.find((item) =>
    (verifiedSession.licenseKey && item.key === verifiedSession.licenseKey)
    || (verifiedSession.email && normalizePrincipal(item.customerEmail) === normalizePrincipal(verifiedSession.email)));
  let session = license ? {
    ...verifiedSession,
    planId: license.planId || verifiedSession.planId,
    planName: license.planName || verifiedSession.planName,
    billingStatus: license.billingStatus || verifiedSession.billingStatus,
    stripeCustomerId: license.stripeCustomerId || verifiedSession.stripeCustomerId,
    stripeSubscriptionId: license.stripeSubscriptionId || verifiedSession.stripeSubscriptionId,
    currentPeriodEnd: license.currentPeriodEnd || verifiedSession.currentPeriodEnd,
    customerNumber: license.customerNumber || verifiedSession.customerNumber,
    contractNumber: license.contractNumber || verifiedSession.contractNumber,
    contractStatus: license.billingStatus || verifiedSession.contractStatus,
  } : verifiedSession;
  const entitlements = await resolvedEntitlementsForSession(session, license);
  session = {
    ...session,
    planId: entitlements.planId || session.planId,
    customerNumber: entitlements.customerNumber || session.customerNumber,
    contractNumber: entitlements.contractNumber || session.contractNumber,
    contractStatus: entitlements.contractStatus || session.contractStatus,
  };
  json(res, 200, {
    account: {
      role: session.role,
      name: sessionDisplayName(session),
      username: session.username || "",
      email: session.email || "",
      principal: sessionPrincipal(session),
      productName: config.productName,
      licenseKey: session.licenseKey || "",
      entitlements,
      billing: billingProfileForSession(session),
    },
  });
}

async function listAuditEvents(req, res, query = new URLSearchParams()) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  const db = ensureDbShape(await loadDb());
  const principal = sessionPrincipal(session);
  const limit = Math.max(1, Math.min(250, Number(query.get("limit") || 100)));
  const projectId = query.get("projectId") || "";
  const type = query.get("type") || "";
  const allowedProjectIds = new Set(db.projects.filter((project) => canAccessProject(session, project)).map((project) => project.id));
  const events = db.audit
    .filter((event) => {
      if (projectId && event.projectId !== projectId) return false;
      if (type && event.type !== type) return false;
      if (session.role === "admin") return true;
      if (event.projectId) return allowedProjectIds.has(event.projectId);
      return event.by === principal || event.createdBy === principal;
    })
    .slice(0, limit);
  json(res, 200, {
    events,
    limit,
    filteredBy: { projectId, type },
    note: "Audit events contain operational metadata only; secret values are never returned.",
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

function sanitizeFoundingAccount(account) {
  return {
    id: account.id,
    slot: account.slot,
    name: account.name,
    username: account.username,
    email: account.email,
    company: account.company || "",
    planId: account.planId,
    planName: account.planName,
    status: account.status,
    customerNumber: account.customerNumber,
    contractNumber: account.contractNumber,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
    blockedAt: account.blockedAt || "",
    paymentRequiredAt: account.paymentRequiredAt || "",
    convertedAt: account.convertedAt || "",
  };
}

async function syncFoundingGrantToSupabase(account) {
  if (!supabaseConfigured() || !account) return null;
  try {
    const rows = await supabaseRequest(`${config.supabaseAccessGrantsTable}?on_conflict=email`, {
      method: "POST",
      headers: { prefer: "resolution=merge-duplicates,return=representation" },
      body: {
        external_id: account.id,
        grant_type: "founding_customer",
        slot_number: account.slot,
        email: account.email,
        username: account.username,
        display_name: account.name,
        company: account.company || "",
        plan_id: account.planId,
        status: account.status,
        customer_number: account.customerNumber,
        contract_number: account.contractNumber,
        converted_at: account.convertedAt || null,
        metadata: { source: "axion-backend", createdAt: account.createdAt },
      },
    });
    return rows?.[0] || null;
  } catch (error) {
    console.warn(`Supabase founding-account sync failed: ${error.message}`);
    return null;
  }
}

async function listFoundingAccounts(req, res) {
  const session = verifySession(getBearer(req));
  if (session?.role !== "admin") return json(res, 403, { error: "Admin access required" });
  const db = ensureDbShape(await loadDb());
  const accounts = db.foundingAccounts.slice().sort((a, b) => a.slot - b.slot).map(sanitizeFoundingAccount);
  json(res, 200, {
    accounts,
    capacity: 5,
    occupiedSlots: accounts.filter((item) => item.status !== "converted").length,
    availableSlots: Math.max(0, 5 - accounts.filter((item) => item.status !== "converted").length),
    statuses: ["active", "blocked", "payment_required", "converted"],
  });
}

async function createFoundingAccount(req, res) {
  const session = verifySession(getBearer(req));
  if (session?.role !== "admin") return json(res, 403, { error: "Admin access required" });
  const body = await parseBody(req);
  const name = cleanPublicField(body.name, 120);
  const username = normalizePrincipal(body.username).replace(/[^a-z0-9._-]/g, "").slice(0, 48);
  const email = normalizePrincipal(body.email);
  const company = cleanPublicField(body.company, 160);
  const selectedPlan = billingPlan(body.planId || "professional");
  const suppliedPassword = String(body.password || "");
  const temporaryPassword = suppliedPassword || `Axion-${randomBytes(6).toString("base64url")}`;
  if (name.length < 2 || username.length < 3 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json(res, 400, { error: "Enter a name, unique username, and valid email." });
  if (!selectedPlan) return json(res, 400, { error: "Choose a valid Axion plan." });
  if (temporaryPassword.length < 8) return json(res, 400, { error: "Initial password must contain at least eight characters." });
  const db = ensureDbShape(await loadDb());
  const occupied = db.foundingAccounts.filter((item) => item.status !== "converted");
  if (occupied.length >= 5) return json(res, 409, { error: "All five founding-customer slots are occupied. Convert or remove a completed grant before creating another." });
  if (db.users.some((item) => normalizePrincipal(item.email) === email || normalizePrincipal(item.username) === username)) return json(res, 409, { error: "This email or username is already registered." });
  const slot = [1, 2, 3, 4, 5].find((candidate) => !occupied.some((item) => item.slot === candidate));
  const createdAt = new Date().toISOString();
  const user = { id: randomUUID(), username, email, name, company, role: "customer", passwordHash: userPasswordHash(temporaryPassword), createdAt, status: "active", foundingCustomer: true };
  const order = {
    id: randomUUID(), createdAt, status: "founding_access", reference: makeReference(), productName: config.productName,
    planId: selectedPlan.id, planName: selectedPlan.name, seats: 1, amount: 0, currency: config.currency,
    customerName: name, customerEmail: email, company, billingMode: "founding", subscriptionStatus: "trialing",
  };
  const license = {
    key: makeLicenseKey(), customerEmail: email, customerName: name, company, orderId: order.id,
    planId: selectedPlan.id, planName: selectedPlan.name, seats: 1, createdAt, status: "active", billingStatus: "trialing", foundingCustomer: true,
  };
  order.licenseKey = license.key;
  ensureCommerceIdentifiers(order, license);
  const account = {
    id: randomUUID(), slot, userId: user.id, orderId: order.id, licenseKey: license.key,
    name, username, email, company, planId: selectedPlan.id, planName: selectedPlan.name,
    customerNumber: order.customerNumber, contractNumber: order.contractNumber,
    status: "active", createdAt, updatedAt: createdAt,
  };
  db.users.unshift(user);
  db.orders.unshift(order);
  db.licenses.unshift(license);
  db.foundingAccounts.push(account);
  db.audit.unshift({ at: createdAt, type: "founding_account.created", foundingAccountId: account.id, slot, email, planId: selectedPlan.id, by: sessionPrincipal(session) });
  await saveDb(db);
  await Promise.all([syncCommerceRecordToSupabase(order, license, user), syncFoundingGrantToSupabase(account)]);
  json(res, 201, { account: sanitizeFoundingAccount(account), temporaryPassword, note: "The initial password is returned only in this response. Share it through a secure channel." });
}

async function updateFoundingAccount(req, res, accountId) {
  const session = verifySession(getBearer(req));
  if (session?.role !== "admin") return json(res, 403, { error: "Admin access required" });
  const body = await parseBody(req);
  const action = String(body.action || "");
  if (!["block", "unblock", "require_payment"].includes(action)) return json(res, 400, { error: "Use block, unblock, or require_payment." });
  const db = ensureDbShape(await loadDb());
  const account = db.foundingAccounts.find((item) => item.id === accountId);
  if (!account) return json(res, 404, { error: "Founding account not found" });
  if (account.status === "converted") return json(res, 409, { error: "This grant has already converted to a paid subscription." });
  const user = db.users.find((item) => item.id === account.userId || normalizePrincipal(item.email) === normalizePrincipal(account.email));
  const license = db.licenses.find((item) => item.key === account.licenseKey);
  const order = db.orders.find((item) => item.id === account.orderId);
  const now = new Date().toISOString();
  if (action === "block") {
    account.status = "blocked";
    account.blockedAt = now;
    if (user) user.status = "suspended";
    if (license) { license.status = "suspended"; license.billingStatus = "suspended"; }
    if (order) { order.status = "subscription_suspended"; order.subscriptionStatus = "suspended"; }
  } else if (action === "unblock") {
    account.status = "active";
    account.blockedAt = "";
    account.paymentRequiredAt = "";
    if (user) user.status = "active";
    if (license) { license.status = "active"; license.billingStatus = "trialing"; }
    if (order) { order.status = "founding_access"; order.subscriptionStatus = "trialing"; }
  } else {
    account.status = "payment_required";
    account.paymentRequiredAt = now;
    if (user) user.status = "active";
    if (license) { license.status = "suspended"; license.billingStatus = "payment_required"; }
    if (order) { order.status = "payment_required"; order.subscriptionStatus = "payment_required"; }
  }
  account.updatedAt = now;
  db.audit.unshift({ at: now, type: `founding_account.${action}`, foundingAccountId: account.id, email: account.email, by: sessionPrincipal(session) });
  await saveDb(db);
  if (order) await syncCommerceRecordToSupabase(order, license, user);
  await syncFoundingGrantToSupabase(account);
  json(res, 200, { account: sanitizeFoundingAccount(account), checkout: action === "require_payment" ? { page: `${config.appBaseUrl}/pricing`, planId: account.planId, email: account.email } : null });
}

async function listCustomerAccounts(req, res) {
  const session = verifySession(getBearer(req));
  if (session?.role !== "admin") {
    json(res, 403, { error: "Admin access required" });
    return;
  }
  if (supabaseConfigured()) {
    try {
      const [customers, contracts, users] = await Promise.all([
        supabaseRequest(`${config.supabaseCustomersTable}?select=*&order=updated_at.desc`),
        supabaseRequest(`${config.supabaseContractsTable}?select=*&order=updated_at.desc`),
        supabaseRequest(`${config.supabaseCustomerUsersTable}?select=id,customer_id,user_id,email,username,role,status,created_at,updated_at&order=updated_at.desc`),
      ]);
      json(res, 200, {
        source: "supabase",
        customers: customers.map((customer) => ({
          ...customer,
          contracts: contracts.filter((contract) => contract.customer_id === customer.id),
          users: users.filter((user) => user.customer_id === customer.id),
        })),
      });
      return;
    } catch (error) {
      console.warn(`Supabase customer listing failed, using local commerce records: ${error.message}`);
    }
  }
  const db = ensureDbShape(await loadDb());
  const customers = Array.from(new Set(db.licenses.map((license) => license.customerNumber))).filter(Boolean).map((customerNumber) => {
    const licenses = db.licenses.filter((license) => license.customerNumber === customerNumber);
    const orders = db.orders.filter((order) => order.customerNumber === customerNumber);
    const primary = licenses[0] || orders[0] || {};
    return {
      customer_number: customerNumber,
      legal_name: primary.company || primary.customerName || "Axion customer",
      billing_email: primary.customerEmail || "",
      status: primary.status || "active",
      contracts: licenses.map((license) => ({
        contract_number: license.contractNumber,
        plan_id: license.planId,
        plan_name: license.planName,
        status: license.billingStatus || license.status,
        seat_limit: license.seats,
        current_period_end: license.currentPeriodEnd || null,
      })),
      users: db.users.filter((user) => normalizePrincipal(user.email) === normalizePrincipal(primary.customerEmail)).map(sanitizeUser),
    };
  });
  json(res, 200, { source: "local-fallback", customers });
}

async function updateCustomerContract(req, res, customerNumber) {
  const session = verifySession(getBearer(req));
  if (session?.role !== "admin") return json(res, 403, { error: "Admin access required" });
  const body = await parseBody(req);
  const selectedPlan = billingPlan(body.planId);
  const allowedStatuses = new Set(["draft", "trialing", "active", "past_due", "suspended", "cancelled", "expired"]);
  if (!selectedPlan || !allowedStatuses.has(String(body.status || "active"))) {
    return json(res, 400, { error: "Provide a valid planId and contract status." });
  }
  const status = String(body.status || "active");
  const seatLimit = Math.max(1, Number(body.seatLimit || selectedPlan.seats));
  const db = ensureDbShape(await loadDb());
  db.orders.filter((order) => order.customerNumber === customerNumber).forEach((order) => {
    order.planId = selectedPlan.id;
    order.planName = selectedPlan.name;
    order.seats = seatLimit;
    order.subscriptionStatus = status;
    order.status = ["active", "trialing", "past_due"].includes(status) ? "paid_active" : `subscription_${status}`;
  });
  db.licenses.filter((license) => license.customerNumber === customerNumber).forEach((license) => {
    license.planId = selectedPlan.id;
    license.planName = selectedPlan.name;
    license.seats = seatLimit;
    license.billingStatus = status;
    license.status = ["active", "trialing", "past_due"].includes(status) ? "active" : "suspended";
  });
  db.audit.unshift({ at: new Date().toISOString(), type: "customer.contract.updated", customerNumber, planId: selectedPlan.id, status, seatLimit, by: sessionPrincipal(session) });
  await saveDb(db);
  let contract = null;
  if (supabaseConfigured()) {
    const customers = await supabaseRequest(`${config.supabaseCustomersTable}?customer_number=eq.${encodeURIComponent(customerNumber)}&select=id&limit=1`);
    if (!customers?.[0]) return json(res, 404, { error: "Customer not found in Supabase" });
    const contracts = await supabaseRequest(`${config.supabaseContractsTable}?customer_id=eq.${encodeURIComponent(customers[0].id)}&select=id&order=updated_at.desc&limit=1`);
    if (!contracts?.[0]) return json(res, 404, { error: "Contract not found in Supabase" });
    const rows = await supabaseRequest(`${config.supabaseContractsTable}?id=eq.${encodeURIComponent(contracts[0].id)}`, {
      method: "PATCH",
      body: { plan_id: selectedPlan.id, plan_name: selectedPlan.name, status, seat_limit: seatLimit },
    });
    contract = rows?.[0] || null;
  }
  json(res, 200, { customerNumber, contract, plan: { id: selectedPlan.id, name: selectedPlan.name, seatLimit }, status });
}

async function setCustomerEntitlementOverride(req, res, customerNumber, featureKey) {
  const session = verifySession(getBearer(req));
  if (session?.role !== "admin") return json(res, 403, { error: "Admin access required" });
  if (!featureCatalogue[featureKey]) return json(res, 400, { error: "Unknown feature key" });
  if (!supabaseConfigured()) return json(res, 503, { error: "Supabase is required for customer-specific entitlement overrides." });
  const body = await parseBody(req);
  const customers = await supabaseRequest(`${config.supabaseCustomersTable}?customer_number=eq.${encodeURIComponent(customerNumber)}&select=id&limit=1`);
  const customer = customers?.[0];
  if (!customer) return json(res, 404, { error: "Customer not found" });
  const contracts = await supabaseRequest(`${config.supabaseContractsTable}?customer_id=eq.${encodeURIComponent(customer.id)}&select=id&order=updated_at.desc&limit=1`);
  const contract = contracts?.[0];
  const rows = await supabaseRequest(`${config.supabaseEntitlementOverridesTable}?on_conflict=customer_id,contract_id,feature_key`, {
    method: "POST",
    headers: { prefer: "resolution=merge-duplicates,return=representation" },
    body: {
      customer_id: customer.id,
      contract_id: contract?.id || null,
      feature_key: featureKey,
      enabled: typeof body.enabled === "boolean" ? body.enabled : null,
      limit_value: Number.isFinite(Number(body.limit)) ? Number(body.limit) : null,
      reason: String(body.reason || "Admin contract override").slice(0, 500),
      valid_until: body.validUntil || null,
    },
  });
  json(res, 200, { customerNumber, override: rows?.[0] || null });
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
  await syncCommerceRecordToSupabase(order, db.licenses.find((item) => item.key === order.licenseKey));
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
    activatePaidOrder(db, order, {
      paymentProvider: "stripe",
      paymentId: session.payment_intent || session.id,
      stripeCustomerId: typeof session.customer === "string" ? session.customer : session.customer?.id || "",
      stripeSubscriptionId: typeof session.subscription === "string" ? session.subscription : session.subscription?.id || "",
      subscriptionStatus: config.stripeBillingMode === "subscription" ? "active" : "paid",
    });
    await saveDb(db);
    await syncCommerceRecordToSupabase(order, db.licenses.find((item) => item.key === order.licenseKey));
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
  const object = event.data?.object || {};
  const db = ensureDbShape(await loadDb());
  if (event.id && db.stripeEvents.some((item) => item.id === event.id)) {
    json(res, 200, { received: true, duplicate: true });
    return;
  }
  let changed = false;
  if ((event.type === "checkout.session.completed" && object.payment_status === "paid") || event.type === "checkout.session.async_payment_succeeded") {
    const order = findStripeOrder(db, object);
    if (order) {
      activatePaidOrder(db, order, {
        paymentProvider: "stripe",
        paymentId: object.payment_intent || object.id,
        stripeCustomerId: typeof object.customer === "string" ? object.customer : object.customer?.id || "",
        stripeSubscriptionId: typeof object.subscription === "string" ? object.subscription : object.subscription?.id || "",
        subscriptionStatus: config.stripeBillingMode === "subscription" ? "active" : "paid",
      });
      changed = true;
    }
  }
  if (event.type === "checkout.session.async_payment_failed") {
    const order = findStripeOrder(db, object);
    if (order) {
      order.status = "payment_failed";
      db.audit.unshift({ at: new Date().toISOString(), type: "order.payment_failed", orderId: order.id, reference: order.reference });
      changed = true;
    }
  }
  if ([
    "customer.subscription.created",
    "customer.subscription.updated",
    "customer.subscription.deleted",
    "customer.subscription.paused",
    "customer.subscription.resumed",
  ].includes(event.type)) {
    const order = findStripeOrder(db, object);
    if (order) {
      syncSubscriptionAccess(db, order, object);
      changed = true;
    }
  }
  if (event.type === "invoice.paid") {
    const order = findStripeOrder(db, object);
    if (order) {
      const license = db.licenses.find((item) => item.key === order.licenseKey || item.orderId === order.id);
      order.status = "paid_active";
      order.subscriptionStatus = "active";
      if (license) {
        license.status = "active";
        license.billingStatus = "active";
      }
      db.audit.unshift({ at: new Date().toISOString(), type: "billing.invoice.paid", orderId: order.id, invoiceId: object.id });
      changed = true;
    }
  }
  if (["invoice.payment_failed", "invoice.payment_action_required"].includes(event.type)) {
    const order = findStripeOrder(db, object);
    if (order) {
      const license = db.licenses.find((item) => item.key === order.licenseKey || item.orderId === order.id);
      order.status = "payment_action_required";
      order.subscriptionStatus = "past_due";
      if (license) license.billingStatus = "past_due";
      db.audit.unshift({ at: new Date().toISOString(), type: "billing.invoice.action_required", orderId: order.id, invoiceId: object.id });
      changed = true;
    }
  }
  if (changed) {
    await saveDb(db);
    const order = findStripeOrder(db, object);
    if (order) {
      const commerceRecord = await syncCommerceRecordToSupabase(order, db.licenses.find((item) => item.key === order.licenseKey || item.orderId === order.id));
      await recordSubscriptionEventToSupabase(event, commerceRecord);
    }
  }
  if (event.id) {
    db.stripeEvents.unshift({ id: event.id, type: event.type, receivedAt: new Date().toISOString() });
    db.stripeEvents = db.stripeEvents.slice(0, 2000);
    await saveDb(db);
  }
  json(res, 200, { received: true });
}

async function createBillingPortal(req, res) {
  const session = verifySession(getBearer(req));
  if (!session) {
    json(res, 401, { error: "Not authenticated" });
    return;
  }
  if (!config.stripeSecretKey) {
    json(res, 503, { error: "Stripe billing is not configured on the backend." });
    return;
  }
  const db = ensureDbShape(await loadDb());
  const principal = normalizePrincipal(session.email || "");
  const license = db.licenses.find((item) =>
    (session.licenseKey && item.key === session.licenseKey)
    || (principal && normalizePrincipal(item.customerEmail) === principal));
  const order = db.orders.find((item) =>
    (license?.orderId && item.id === license.orderId)
    || (principal && normalizePrincipal(item.customerEmail) === principal));
  const customerId = session.stripeCustomerId || license?.stripeCustomerId || order?.stripeCustomerId || "";
  if (!customerId) {
    json(res, 409, { error: "No Stripe customer is linked to this account yet." });
    return;
  }
  const portal = await stripeRequest("/v1/billing_portal/sessions", {
    customer: customerId,
    return_url: `${config.appBaseUrl}/?page=login`,
  });
  db.audit.unshift({
    at: new Date().toISOString(),
    type: "billing.portal.created",
    customerId,
    by: sessionPrincipal(session),
  });
  await saveDb(db);
  json(res, 201, { url: portal.url });
}

function requiredFeatureForRequest(method, pathname) {
  if (method === "POST" && pathname === "/api/model-runs/python") return "dynamic_simulation";
  if (method === "POST" && pathname === "/api/cfd/jobs") return config.cfdWorkerUrl ? "cfd_worker_jobs" : "cfd_screening";
  if (method === "POST" && ["/api/datasets", "/api/datasets/apply"].includes(pathname)) return "company_data_ingestion";
  if (method === "POST" && (pathname === "/api/commands/plan" || /^\/api\/commands\/[^/]+\/apply$/.test(pathname))) return "ai_command_engine";
  if (method === "POST" && /^\/api\/projects\/[^/]+\/invites$/.test(pathname)) return "collaboration";
  if (method === "POST" && (/^\/api\/projects\/[^/]+\/branches/.test(pathname) || /^\/api\/projects\/[^/]+\/versions\/(compare|[^/]+\/restore)$/.test(pathname))) return "branches_versions";
  if (["POST", "DELETE"].includes(method) && (/^\/api\/integrations\//.test(pathname))) return "api_connectors";
  if (method === "POST" && (
    pathname === "/api/automation/connections"
    || pathname === "/api/automation/commissioning/run"
    || /^\/api\/automation\/control-loops\/[^/]+(?:\/cycle)?$/.test(pathname)
  )) return "automation_opcua";
  return "";
}

async function routeApi(req, res, pathname, query = new URLSearchParams()) {
  if (req.method === "GET" && pathname === "/api/health") {
    json(res, 200, {
      ok: true,
      productName: config.productName,
      storage: supabaseConfigured() ? "supabase-postgres-documents" : "local-json",
      payments: Boolean(config.stripeSecretKey),
      googleLogin: Boolean(config.googleClientId),
      inviteEmail: emailConfigured(),
      at: new Date().toISOString(),
    });
    return;
  }
  if (req.method === "GET" && pathname === "/api/production-readiness") {
    json(res, 200, productionReadiness());
    return;
  }
  if (req.method === "GET" && pathname === "/api/professional-readiness") {
    await professionalReadiness(req, res);
    return;
  }
  if (req.method === "GET" && pathname === "/api/product") {
    json(res, 200, publicConfig());
    return;
  }
  if (req.method === "POST" && pathname === "/api/leads/pilot") {
    await createPilotLead(req, res);
    return;
  }
  if (req.method === "POST" && pathname === "/api/leads/engineering-brief") {
    await createEngineeringBriefLead(req, res);
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
  if (req.method === "POST" && pathname === "/api/billing/portal") {
    await createBillingPortal(req, res);
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
  const requiredFeature = requiredFeatureForRequest(req.method, pathname);
  if (requiredFeature && !(await requireFeature(req, res, requiredFeature))) return;
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
  const projectExportMatch = pathname.match(/^\/api\/projects\/([^/]+)\/export$/);
  if (projectExportMatch && req.method === "GET") {
    await exportProject(req, res, decodeURIComponent(projectExportMatch[1]));
    return;
  }
  const projectSaveMatch = pathname.match(/^\/api\/projects\/([^/]+)\/save$/);
  if (projectSaveMatch && req.method === "POST") {
    await saveProject(req, res, decodeURIComponent(projectSaveMatch[1]));
    return;
  }
  const projectBranchCreateMatch = pathname.match(/^\/api\/projects\/([^/]+)\/branches$/);
  if (projectBranchCreateMatch && req.method === "POST") {
    await createProjectBranch(req, res, decodeURIComponent(projectBranchCreateMatch[1]));
    return;
  }
  const projectBranchCheckoutMatch = pathname.match(/^\/api\/projects\/([^/]+)\/branches\/([^/]+)\/checkout$/);
  if (projectBranchCheckoutMatch && req.method === "POST") {
    await checkoutProjectBranch(req, res, decodeURIComponent(projectBranchCheckoutMatch[1]), decodeURIComponent(projectBranchCheckoutMatch[2]));
    return;
  }
  const projectVersionCompareMatch = pathname.match(/^\/api\/projects\/([^/]+)\/versions\/compare$/);
  if (projectVersionCompareMatch && req.method === "POST") {
    await compareProjectVersions(req, res, decodeURIComponent(projectVersionCompareMatch[1]));
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
  if (req.method === "POST" && pathname === "/api/integrations/github/connect") {
    await connectGitHubRepository(req, res);
    return;
  }
  const githubSyncMatch = pathname.match(/^\/api\/integrations\/github\/([^/]+)\/sync$/);
  if (githubSyncMatch && req.method === "POST") {
    await resyncGitHubRepository(req, res, decodeURIComponent(githubSyncMatch[1]));
    return;
  }
  const githubDisconnectMatch = pathname.match(/^\/api\/integrations\/github\/([^/]+)$/);
  if (githubDisconnectMatch && req.method === "DELETE") {
    await disconnectGitHubRepository(req, res, decodeURIComponent(githubDisconnectMatch[1]));
    return;
  }
  const integrationActionMatch = pathname.match(/^\/api\/integrations\/([^/]+)\/actions$/);
  if (integrationActionMatch && req.method === "POST") {
    await connectorAction(req, res, decodeURIComponent(integrationActionMatch[1]));
    return;
  }
  if (req.method === "GET" && pathname === "/api/automation/state") {
    await listAutomationState(req, res, query);
    return;
  }
  if (req.method === "POST" && pathname === "/api/automation/connections") {
    await createAutomationConnection(req, res);
    return;
  }
  const automationConnectionTestMatch = pathname.match(/^\/api\/automation\/connections\/([^/]+)\/test$/);
  if (automationConnectionTestMatch && req.method === "POST") {
    await testAutomationConnection(req, res, decodeURIComponent(automationConnectionTestMatch[1]));
    return;
  }
  if (req.method === "POST" && pathname === "/api/automation/telemetry") {
    await ingestAutomationTelemetry(req, res);
    return;
  }
  if (req.method === "POST" && pathname === "/api/automation/edge-status") {
    await ingestAutomationEdgeStatus(req, res);
    return;
  }
  if (req.method === "POST" && pathname === "/api/automation/commissioning/run") {
    await runAutomationCommissioning(req, res);
    return;
  }
  const automationLoopMatch = pathname.match(/^\/api\/automation\/control-loops\/([^/]+)$/);
  if (automationLoopMatch && req.method === "POST") {
    await updateAutomationLoop(req, res, decodeURIComponent(automationLoopMatch[1]));
    return;
  }
  const automationCycleMatch = pathname.match(/^\/api\/automation\/control-loops\/([^/]+)\/cycle$/);
  if (automationCycleMatch && req.method === "POST") {
    await runAutomationCycle(req, res, decodeURIComponent(automationCycleMatch[1]));
    return;
  }
  if (req.method === "GET" && pathname === "/api/data/architecture") {
    await dataArchitecture(req, res);
    return;
  }
  if (req.method === "GET" && pathname === "/api/backend/processes") {
    await backendProcesses(req, res);
    return;
  }
  if (req.method === "GET" && pathname === "/api/services/status") {
    await serviceStatus(req, res);
    return;
  }
  const serviceProbeMatch = pathname.match(/^\/api\/services\/([^/]+)\/probe$/);
  if (serviceProbeMatch && req.method === "POST") {
    await serviceProbe(req, res, decodeURIComponent(serviceProbeMatch[1]));
    return;
  }
  if (req.method === "POST" && pathname === "/api/commands/plan") {
    await createCommandPlan(req, res);
    return;
  }
  const commandApplyMatch = pathname.match(/^\/api\/commands\/([^/]+)\/apply$/);
  if (commandApplyMatch && req.method === "POST") {
    await applyCommandPlan(req, res, decodeURIComponent(commandApplyMatch[1]));
    return;
  }
  if (req.method === "POST" && pathname === "/api/commands/undo") {
    await undoCommandPlan(req, res);
    return;
  }
  if (req.method === "GET" && pathname === "/api/sources/academic") {
    await listAcademicSources(req, res);
    return;
  }
  if (req.method === "GET" && pathname === "/api/scientific-data/sources") {
    await listScientificDataSources(req, res);
    return;
  }
  if (req.method === "POST" && pathname === "/api/scientific-data/search") {
    await searchScientificData(req, res);
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
  if (req.method === "GET" && pathname === "/api/cfd/jobs") {
    await listCfdJobs(req, res, query);
    return;
  }
  if (req.method === "POST" && pathname === "/api/cfd/jobs") {
    await createCfdJob(req, res);
    return;
  }
  const cfdJobMatch = pathname.match(/^\/api\/cfd\/jobs\/([^/]+)$/);
  if (cfdJobMatch && req.method === "GET") {
    await getCfdJob(req, res, decodeURIComponent(cfdJobMatch[1]));
    return;
  }
  if (req.method === "GET" && pathname === "/api/datasets") {
    await listDatasets(req, res, query);
    return;
  }
  if (req.method === "POST" && pathname === "/api/datasets/apply") {
    await applyDatasetsToModel(req, res);
    return;
  }
  const datasetExportMatch = pathname.match(/^\/api\/datasets\/([^/]+)\/export$/);
  if (datasetExportMatch && req.method === "GET") {
    await exportDataset(req, res, decodeURIComponent(datasetExportMatch[1]));
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
  if (req.method === "GET" && pathname === "/api/audit") {
    await listAuditEvents(req, res, query);
    return;
  }
  if (req.method === "GET" && pathname === "/api/admin/orders") {
    await listOrders(req, res);
    return;
  }
  if (req.method === "GET" && pathname === "/api/admin/customers") {
    await listCustomerAccounts(req, res);
    return;
  }
  if (req.method === "GET" && pathname === "/api/admin/founding-accounts") {
    await listFoundingAccounts(req, res);
    return;
  }
  if (req.method === "POST" && pathname === "/api/admin/founding-accounts") {
    await createFoundingAccount(req, res);
    return;
  }
  const foundingAccountMatch = pathname.match(/^\/api\/admin\/founding-accounts\/([^/]+)$/);
  if (req.method === "PATCH" && foundingAccountMatch) {
    await updateFoundingAccount(req, res, decodeURIComponent(foundingAccountMatch[1]));
    return;
  }
  const adminCustomerContractMatch = pathname.match(/^\/api\/admin\/customers\/([^/]+)\/contract$/);
  if (req.method === "PATCH" && adminCustomerContractMatch) {
    await updateCustomerContract(req, res, decodeURIComponent(adminCustomerContractMatch[1]));
    return;
  }
  const adminCustomerEntitlementMatch = pathname.match(/^\/api\/admin\/customers\/([^/]+)\/entitlements\/([^/]+)$/);
  if (req.method === "PUT" && adminCustomerEntitlementMatch) {
    await setCustomerEntitlementOverride(req, res, decodeURIComponent(adminCustomerEntitlementMatch[1]), decodeURIComponent(adminCustomerEntitlementMatch[2]));
    return;
  }
  if (req.method === "GET" && pathname === "/api/admin/leads") {
    await listPilotLeads(req, res);
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
  if (requested === "/.axion-runtime-env.json" || requested.startsWith("/.data/")) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  const clean = normalize(decodeURIComponent(requested)).replace(/^(\.\.[/\\])+/, "");
  let filePath = resolve(staticRootDir, `.${clean}`);
  if (!filePath.startsWith(staticRootDir)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  if (!isRegularFile(filePath) && staticRootDir === rootDir) {
    const publicRoot = join(rootDir, "public");
    const publicFilePath = resolve(publicRoot, `.${clean}`);
    if (publicFilePath.startsWith(publicRoot) && isRegularFile(publicFilePath)) filePath = publicFilePath;
  }
  if (!isRegularFile(filePath)) {
    const fallback = join(staticRootDir, "index.html");
    const body = renderPublicHtml(pathname, fallback);
    res.writeHead(200, {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-cache",
    });
    res.end(body);
    return;
  }
  const immutableAsset = /\/assets\/[^/]+-[A-Za-z0-9_-]{8,}\.[^/]+$/.test(requested);
  const htmlDocument = extname(filePath) === ".html";
  const unbundledDevelopmentSource = staticRootDir === rootDir;
  res.writeHead(200, {
    "content-type": staticTypes.get(extname(filePath)) || "application/octet-stream",
    "cache-control": immutableAsset
      ? "public, max-age=31536000, immutable"
      : htmlDocument || unbundledDevelopmentSource
        ? "no-cache"
        : "public, max-age=3600",
  });
  if (htmlDocument) {
    res.end(renderPublicHtml(pathname === "/index.html" ? "/" : pathname, filePath));
    return;
  }
  createReadStream(filePath).pipe(res);
}

function isRegularFile(pathname) {
  try {
    return statSync(pathname).isFile();
  } catch {
    return false;
  }
}

function applySecurityHeaders(res) {
  res.setHeader("x-content-type-options", "nosniff");
  res.setHeader("x-frame-options", "DENY");
  res.setHeader("referrer-policy", "strict-origin-when-cross-origin");
  res.setHeader("cross-origin-opener-policy", "same-origin-allow-popups");
  res.setHeader("cross-origin-resource-policy", "same-site");
  res.setHeader("permissions-policy", "camera=(), microphone=(), geolocation=(), usb=(), payment=(self)");
  res.setHeader(
    "content-security-policy",
    [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "form-action 'self' https://checkout.stripe.com",
      "script-src 'self' 'unsafe-inline' https://accounts.google.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://accounts.google.com https://oauth2.googleapis.com",
      "frame-src https://accounts.google.com",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  );
  if (config.appBaseUrl.startsWith("https://")) {
    res.setHeader("strict-transport-security", "max-age=31536000; includeSubDomains");
  }
}

const server = createServer(async (req, res) => {
  try {
    applySecurityHeaders(res);
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

assertProductionConfig();

server.listen(config.port, config.host, () => {
  console.log(`${config.productName} backend running at http://${config.host}:${config.port}`);
  console.log(`Price gate: ${(config.priceCents / 100).toFixed(2)} ${config.currency}`);
  console.log(`Private workspace access configured: admin=${Boolean(config.adminPassword)}, seededUsers=${configuredSeedUserCount()}`);
  if (!config.stripeSecretKey) {
    console.log("Stripe Checkout is not configured yet. Set STRIPE_SECRET_KEY to enable automatic SaaS payment.");
  }
  if (!config.googleClientId) {
    console.log("Google login is not configured yet. Set GOOGLE_CLIENT_ID to enable Google Identity login.");
  }
});
