import { readFileSync } from "node:fs";

const dockerfile = readFileSync("Dockerfile.automation-gateway", "utf8");
const compose = readFileSync("docker-compose.ot.yml", "utf8");
const rules = [
  ["Docker image uses a non-root user", /^USER\s+\S+/m.test(dockerfile)],
  ["Gateway defaults to physical writes locked", /AUTOMATION_GATEWAY_WRITES_ENABLED=false/.test(dockerfile)],
  ["OT compose has a read-only root filesystem", /read_only:\s*true/.test(compose)],
  ["OT compose drops Linux capabilities", /cap_drop:\s*\n\s*-\s*ALL/.test(compose)],
  ["OT compose prevents privilege escalation", /no-new-privileges:true/.test(compose)],
  ["Management port binds to loopback only", /127\.0\.0\.1:8921:8921/.test(compose) && !/["']?8921:8921/.test(compose.replace(/127\.0\.0\.1:8921:8921/g, ""))],
  ["Site pack and certificates mount read-only", /site-pack:ro/.test(compose) && /opcua:ro/.test(compose)],
  ["Gateway is configured for OPC UA edge mode", /AUTOMATION_CONNECTION_KIND:\s*opcua-edge/.test(compose)],
];

for (const [label, passed] of rules) console.log(`${passed ? "PASS" : "FAIL"} ${label}`);
if (rules.some(([, passed]) => !passed)) process.exit(1);
