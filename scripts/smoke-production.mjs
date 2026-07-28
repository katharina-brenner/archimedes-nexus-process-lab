#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const rootDir = new URL("..", import.meta.url).pathname;

function loadEnv() {
  for (const filename of [".env", ".env.local"]) {
    const envPath = join(rootDir, filename);
    if (!existsSync(envPath)) continue;
    for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
      const [key, ...parts] = trimmed.split("=");
      if (!process.env[key]) process.env[key] = parts.join("=").replace(/^["']|["']$/g, "");
    }
  }
}

async function getJson(baseUrl, path) {
  const response = await fetch(`${baseUrl}${path}`);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(`${path} failed with ${response.status}: ${payload.error || response.statusText}`);
  return payload;
}

loadEnv();

const baseUrl = String(process.env.APP_BASE_URL || "").replace(/\/+$/, "");
if (!baseUrl || !baseUrl.startsWith("https://")) {
  console.error("APP_BASE_URL must be set to a public https:// URL before production smoke testing.");
  process.exit(1);
}

console.log(`\nAxion production smoke test: ${baseUrl}\n`);

const health = await getJson(baseUrl, "/api/health");
const product = await getJson(baseUrl, "/api/product");
const readiness = await getJson(baseUrl, "/api/production-readiness");

console.log(`OK   health: ${health.productName || product.productName || "Axion"}`);
console.log(`OK   storage: ${health.storage || product.backend?.currentStorage || "unknown"}`);
console.log(`${health.payments ? "OK " : "TODO"} payments`);
console.log(`${health.googleLogin ? "OK " : "TODO"} google login`);
console.log(`${health.inviteEmail ? "OK " : "TODO"} invite email`);

const blocking = (readiness.checks || []).filter((item) => !item.ready && !["cfd-worker", "nextjs-bff"].includes(item.key));
for (const item of readiness.checks || []) {
  const marker = item.ready ? "OK " : ["cfd-worker", "nextjs-bff"].includes(item.key) ? "SKIP" : "TODO";
  console.log(`${marker} ${item.label}`);
}

console.log("\nNo secret values were printed.\n");
process.exit(blocking.length ? 1 : 0);
