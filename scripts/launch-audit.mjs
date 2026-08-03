const baseUrl = String(process.env.AXION_PUBLIC_URL || process.argv[2] || "http://127.0.0.1:8899").replace(/\/+$/, "");

const results = [];

function record(name, passed, detail) {
  results.push({ name, passed: Boolean(passed), detail: String(detail || "") });
}

async function get(pathname) {
  const response = await fetch(`${baseUrl}${pathname}`, { redirect: "follow" });
  const text = await response.text();
  return { response, text };
}

try {
  const home = await get("/");
  const csp = home.response.headers.get("content-security-policy") || "";
  const hasDocumentCsp = /http-equiv=["']Content-Security-Policy["']/i.test(home.text) && /default-src 'self'/.test(home.text);
  record("Homepage responds", home.response.ok, `${home.response.status} ${home.response.url}`);
  record("Technical pilot CTA is present", home.text.includes("Request a technical pilot"), "Public conversion path");
  record("Real application screenshots are present", /axion-flowsheet-workspace[^"']*\.png/.test(home.text), "Product evidence");
  record("No placeholder review headline", !home.text.includes("What a strong customer reaction should sound like"), "Public trust");
  record("Content type protection", home.response.headers.get("x-content-type-options") === "nosniff", home.response.headers.get("x-content-type-options") || "missing");
  record("Clickjacking protection", home.response.headers.get("x-frame-options") === "DENY", home.response.headers.get("x-frame-options") || "missing");
  record(
    "Content Security Policy",
    /frame-ancestors 'none'/.test(csp) || (home.response.headers.get("x-frame-options") === "DENY" && hasDocumentCsp),
    /frame-ancestors 'none'/.test(csp) ? csp : hasDocumentCsp ? "document policy + X-Frame-Options DENY" : csp || "missing",
  );

  for (const route of ["/product", "/workflow", "/solutions", "/superpro-designer-alternative", "/faq", "/pricing", "/pilot", "/legal"]) {
    const page = await get(route);
    record(`Public route ${route}`, page.response.ok && page.text.includes("Axion Process OS"), `${page.response.status}`);
    if (route === "/superpro-designer-alternative") {
      record("Comparison route server metadata", page.text.includes("<title>SuperPro Designer Alternative for Bioprocess Engineering | Axion</title>") && page.text.includes('rel="canonical" href="https://ax-i-on.com/superpro-designer-alternative"'), "route-specific title + canonical");
      record("Comparison route FAQ schema", page.text.includes('"@type":"FAQPage"') && page.text.includes("Is Axion Process OS a direct replacement for SuperPro Designer?"), "server-rendered structured data");
    }
    if (route === "/faq") {
      record("FAQ route metadata", page.text.includes("<title>Bioprocess Engineering Software FAQ | Axion Process OS</title>") && page.text.includes('rel="canonical" href="https://ax-i-on.com/faq"'), "route-specific title + canonical");
      record("FAQ route structured answers", page.text.includes('"@type":"FAQPage"') && page.text.includes("What is Axion Process OS?"), "server-rendered structured data");
    }
  }

  const health = await get("/api/health");
  const healthPayload = JSON.parse(health.text);
  record("Backend health", health.response.ok && healthPayload.ok, healthPayload.storage || "unknown storage");

  const readiness = await get("/api/production-readiness");
  const readinessPayload = JSON.parse(readiness.text);
  const blocking = (readinessPayload.checks || [])
    .filter((item) => !item.ready && !["cfd-worker", "nextjs-bff", "automation-gateway"].includes(item.key))
    .map((item) => `${item.label}: ${(item.missing || []).join(", ") || "not ready"}`);
  record("Production providers", blocking.length === 0, blocking.length ? blocking.join(" | ") : "all required providers ready");
} catch (error) {
  record("Audit execution", false, error.message || String(error));
}

console.log(`Axion launch audit · ${baseUrl}`);
results.forEach((result) => {
  console.log(`${result.passed ? "PASS" : "FAIL"} · ${result.name}${result.detail ? ` · ${result.detail}` : ""}`);
});

const functionalFailures = results.filter((item) => !item.passed && item.name !== "Production providers");
const providerResult = results.find((item) => item.name === "Production providers");
console.log(`\nFunctional: ${functionalFailures.length ? "blocked" : "ready"}`);
console.log(`External providers: ${providerResult?.passed ? "ready" : "configuration required"}`);
if (functionalFailures.length) process.exitCode = 1;
