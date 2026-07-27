#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const rootDir = new URL("..", import.meta.url).pathname;

function loadDotEnv() {
  const envPath = join(rootDir, ".env");
  if (!existsSync(envPath)) return;
  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const [key, ...parts] = trimmed.split("=");
    if (!process.env[key]) process.env[key] = parts.join("=").replace(/^["']|["']$/g, "");
  }
}

loadDotEnv();

const checks = [
  ["Supabase/Postgres", ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_STATE_TABLE", "SUPABASE_DOCUMENTS_TABLE"]],
  ["Stripe checkout + webhook", ["STRIPE_SECRET_KEY", "STRIPE_PRICE_ID", "STRIPE_WEBHOOK_SECRET", "APP_BASE_URL"]],
  ["Google OAuth", ["GOOGLE_CLIENT_ID", "APP_BASE_URL"]],
  ["Invite email", ["INVITE_EMAIL_FROM", "RESEND_API_KEY"]],
  ["Deployment", ["APP_BASE_URL", "SESSION_SECRET", "AXION_ADMIN_PASSWORD"]],
  ["Next.js BFF", ["NEXTJS_BFF_URL"]],
  ["External CFD worker", ["CFD_WORKER_URL", "CFD_WORKER_TOKEN"]],
];

const rows = checks.map(([area, keys]) => {
  const missing = keys.filter((key) => !process.env[key]);
  return {
    area,
    ready: missing.length === 0,
    missing,
  };
});

console.log("\nAxion production readiness\n");
for (const row of rows) {
  const marker = row.ready ? "OK " : "TODO";
  console.log(`${marker}  ${row.area}`);
  if (row.missing.length) console.log(`      missing: ${row.missing.join(", ")}`);
}

const httpsReady = String(process.env.APP_BASE_URL || "").startsWith("https://");
if (!httpsReady) {
  console.log("\nTODO  Public HTTPS");
  console.log("      APP_BASE_URL must be an https:// production URL for Stripe, Google OAuth and invite links.");
}

const nextReady = !process.env.NEXTJS_BFF_URL || String(process.env.NEXTJS_BFF_URL).startsWith("https://");
if (!nextReady) {
  console.log("\nTODO  Next.js BFF HTTPS");
  console.log("      NEXTJS_BFF_URL must be an https:// URL when the BFF is deployed.");
}

console.log("\nNo secret values were printed.\n");
process.exit(rows.some((row) => !row.ready && row.area !== "External CFD worker" && row.area !== "Next.js BFF") || !httpsReady || !nextReady ? 1 : 0);
