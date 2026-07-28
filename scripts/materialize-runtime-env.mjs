import { existsSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("..", import.meta.url));
const outputPath = join(rootDir, ".axion-runtime-env.json");
const allowedKeys = [
  "APP_BASE_URL",
  "PRODUCT_NAME",
  "AXION_DATA_DIR",
  "AXION_REQUIRE_PRODUCTION_CONFIG",
  "NEXTJS_BFF_URL",
  "AXION_API_BASE_URL",
  "OPENAI_API_KEY",
  "OPENAI_MODEL",
  "AXION_DISABLE_OPENAI",
  "AXION_ADMIN_USER",
  "AXION_ADMIN_PASSWORD",
  "AXION_LOCAL_PASSWORD_LOGIN",
  "AXION_SEED_USERS_JSON",
  "SESSION_SECRET",
  "AXION_PRICE_CENTS",
  "AXION_CURRENCY",
  "STRIPE_SECRET_KEY",
  "STRIPE_PRICE_ID",
  "STRIPE_WEBHOOK_SECRET",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_ALLOWED_EMAILS",
  "GOOGLE_ALLOWED_DOMAINS",
  "INVITE_EMAIL_FROM",
  "RESEND_API_KEY",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USER",
  "SMTP_PASSWORD",
  "AXION_PYTHON",
  "AXION_PYTHON_TIMEOUT_MS",
  "CFD_WORKER_URL",
  "CFD_WORKER_TOKEN",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_STATE_TABLE",
  "SUPABASE_DOCUMENTS_TABLE",
  "SUPABASE_STORAGE_BUCKET",
];

const runtimeEnv = Object.fromEntries(
  allowedKeys
    .filter((key) => typeof process.env[key] === "string" && process.env[key] !== "")
    .map((key) => [key, process.env[key]]),
);

if (!Object.keys(runtimeEnv).length) {
  if (existsSync(outputPath)) unlinkSync(outputPath);
  console.log("No hosted runtime variables were present during this build.");
} else {
  writeFileSync(outputPath, `${JSON.stringify(runtimeEnv)}\n`, { mode: 0o600 });
  console.log(`Materialized ${Object.keys(runtimeEnv).length} server-only runtime variables.`);
}
