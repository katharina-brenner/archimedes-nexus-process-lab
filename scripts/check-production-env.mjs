#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const rootDir = new URL("..", import.meta.url).pathname;

function loadDotEnv() {
  for (const filename of [".env", ".env.local"]) {
    const envPath = join(rootDir, filename);
    if (!existsSync(envPath)) continue;
    const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
      const [key, ...parts] = trimmed.split("=");
      if (!process.env[key]) process.env[key] = parts.join("=").replace(/^["']|["']$/g, "");
    }
  }
}

loadDotEnv();

const has = (key) => Boolean(process.env[key]);
const isHttps = String(process.env.APP_BASE_URL || "").startsWith("https://");
const resendReady = has("INVITE_EMAIL_FROM") && has("RESEND_API_KEY");
const smtpReady = has("INVITE_EMAIL_FROM") && has("SMTP_HOST") && has("SMTP_USER") && has("SMTP_PASSWORD");

const checks = [
  {
    area: "Supabase/Postgres",
    ready: has("SUPABASE_URL") && has("SUPABASE_SERVICE_ROLE_KEY") && has("SUPABASE_STATE_TABLE") && has("SUPABASE_DOCUMENTS_TABLE"),
    missing: ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_STATE_TABLE", "SUPABASE_DOCUMENTS_TABLE"].filter((key) => !has(key)),
    requiresOwnerAction: true,
    requiresPaymentApproval: true,
  },
  {
    area: "Stripe checkout + webhook",
    ready: has("STRIPE_SECRET_KEY") && /^sk_(live|test)_/.test(process.env.STRIPE_SECRET_KEY || "") && has("STRIPE_PRICE_ID") && has("STRIPE_WEBHOOK_SECRET") && isHttps,
    missing: ["STRIPE_SECRET_KEY", "STRIPE_PRICE_ID", "STRIPE_WEBHOOK_SECRET", "APP_BASE_URL"].filter((key) => !has(key))
      .concat(has("STRIPE_SECRET_KEY") && !/^sk_(live|test)_/.test(process.env.STRIPE_SECRET_KEY || "") ? ["STRIPE_SECRET_KEY must look like sk_live_... or sk_test_..."] : [])
      .concat(isHttps ? [] : ["APP_BASE_URL must be https://..."]),
    requiresOwnerAction: true,
    requiresPaymentApproval: true,
  },
  {
    area: "Google OAuth",
    ready: has("GOOGLE_CLIENT_ID") && isHttps,
    missing: [!has("GOOGLE_CLIENT_ID") ? "GOOGLE_CLIENT_ID" : "", isHttps ? "" : "APP_BASE_URL must be https://..."].filter(Boolean),
    requiresOwnerAction: true,
    requiresPaymentApproval: false,
  },
  {
    area: "Invite email",
    ready: resendReady || smtpReady,
    missing: (!has("INVITE_EMAIL_FROM") ? ["INVITE_EMAIL_FROM"] : []).concat(resendReady || smtpReady ? [] : ["RESEND_API_KEY or SMTP_HOST + SMTP_USER + SMTP_PASSWORD"]),
    requiresOwnerAction: true,
    requiresPaymentApproval: true,
  },
  {
    area: "OpenAI command planner",
    ready: has("OPENAI_API_KEY") && /^sk-/.test(process.env.OPENAI_API_KEY || ""),
    missing: (!has("OPENAI_API_KEY") ? ["OPENAI_API_KEY"] : []).concat(has("OPENAI_API_KEY") && !/^sk-/.test(process.env.OPENAI_API_KEY || "") ? ["OPENAI_API_KEY must look like sk-..."] : []),
    requiresOwnerAction: true,
    requiresPaymentApproval: true,
  },
  {
    area: "Deployment",
    ready: has("APP_BASE_URL") && isHttps && has("SESSION_SECRET") && String(process.env.SESSION_SECRET || "").length >= 32 && has("AXION_ADMIN_PASSWORD") && String(process.env.AXION_ADMIN_PASSWORD || "").length >= 12,
    missing: ["APP_BASE_URL", "SESSION_SECRET", "AXION_ADMIN_PASSWORD"].filter((key) => !has(key))
      .concat(isHttps ? [] : ["APP_BASE_URL must be https://..."])
      .concat(String(process.env.SESSION_SECRET || "").length >= 32 ? [] : ["SESSION_SECRET must be at least 32 characters"])
      .concat(String(process.env.AXION_ADMIN_PASSWORD || "").length >= 12 ? [] : ["AXION_ADMIN_PASSWORD must be at least 12 characters"]),
    requiresOwnerAction: true,
    requiresPaymentApproval: true,
  },
  {
    area: "Next.js BFF",
    ready: has("NEXTJS_BFF_URL") && String(process.env.NEXTJS_BFF_URL || "").startsWith("https://"),
    missing: !has("NEXTJS_BFF_URL") ? ["NEXTJS_BFF_URL"] : String(process.env.NEXTJS_BFF_URL || "").startsWith("https://") ? [] : ["NEXTJS_BFF_URL must be https://..."],
    optional: true,
    requiresOwnerAction: true,
    requiresPaymentApproval: true,
  },
  {
    area: "External CFD worker",
    ready: has("CFD_WORKER_URL") && has("CFD_WORKER_TOKEN"),
    missing: ["CFD_WORKER_URL", "CFD_WORKER_TOKEN"].filter((key) => !has(key)),
    optional: true,
    requiresOwnerAction: true,
    requiresPaymentApproval: true,
  },
  {
    area: "PLC/SCADA edge gateway",
    ready: has("AXION_AUTOMATION_INGEST_TOKEN")
      && has("AXION_AUTOMATION_INGEST_OWNER"),
    missing: ["AXION_AUTOMATION_INGEST_TOKEN", "AXION_AUTOMATION_INGEST_OWNER"].filter((key) => !has(key)),
    optional: true,
    requiresOwnerAction: true,
    requiresPaymentApproval: true,
  },
];

const rows = checks;

console.log("\nAxion production readiness\n");
for (const row of rows) {
  const marker = row.ready ? "OK " : row.optional ? "SKIP" : "TODO";
  console.log(`${marker}  ${row.area}`);
  if (row.missing.length) console.log(`      missing: ${row.missing.join(", ")}`);
  if (!row.ready && row.requiresPaymentApproval) console.log("      approval: payment/account-owner approval required");
  else if (!row.ready && row.requiresOwnerAction) console.log("      approval: account-owner setup required");
}

const nextReady = !process.env.NEXTJS_BFF_URL || String(process.env.NEXTJS_BFF_URL).startsWith("https://");
if (!nextReady) {
  console.log("\nTODO  Next.js BFF HTTPS");
  console.log("      NEXTJS_BFF_URL must be an https:// URL when the BFF is deployed.");
}

console.log("\nNo secret values were printed.\n");
const paymentRows = rows.filter((row) => !row.ready && row.requiresPaymentApproval).map((row) => row.area);
if (paymentRows.length) {
  console.log(`Payment approval is still needed for: ${paymentRows.join(", ")}.\n`);
}
process.exit(rows.some((row) => !row.ready && !row.optional) || !nextReady ? 1 : 0);
