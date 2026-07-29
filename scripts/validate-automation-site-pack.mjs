import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { inspectSitePack } from "../automation-gateway/site-pack.mjs";

function argument(name, fallback = "") {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] || fallback : fallback;
}

const source = resolve(argument("--source", "automation-gateway/site-pack.example"));
const templateMode = process.argv.includes("--template");
const manifestPath = resolve(source, "site.json");
const approvalsPath = resolve(source, "approvals.json");
const tagMapPath = resolve(source, "tag-map.json");

for (const file of [manifestPath, approvalsPath, tagMapPath]) {
  if (!existsSync(file)) {
    console.error(`Missing site-pack file: ${file}`);
    process.exit(1);
  }
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const tagMap = JSON.parse(readFileSync(tagMapPath, "utf8"));
const status = inspectSitePack({
  manifestPath,
  approvalsPath,
  tagMap,
  configuredProjectId: manifest.projectId,
  configuredEndpoint: manifest.opcua?.endpoint,
  writesEnabled: false,
});

console.log(`OT site pack: ${status.status}`);
status.checks.forEach((item) => console.log(`${item.status === "pass" ? "PASS" : "PENDING"} ${item.label}: ${item.evidence}`));

if (!templateMode && !status.readyForRead) process.exit(1);
if (templateMode && (!manifest.schemaVersion || !Array.isArray(tagMap.tags) || !tagMap.tags.length)) process.exit(1);
