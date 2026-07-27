export const dynamic = "force-dynamic";

export async function GET() {
  const apiBase = process.env.AXION_API_BASE_URL || "";
  let core = { ok: false, error: "AXION_API_BASE_URL is not configured" };
  if (apiBase) {
    try {
      const response = await fetch(`${apiBase.replace(/\/+$/, "")}/api/health`, { cache: "no-store" });
      core = await response.json();
    } catch (error) {
      core = { ok: false, error: error.message };
    }
  }
  return Response.json({
    ok: true,
    service: "axion-nextjs-bff",
    generatedAt: new Date().toISOString(),
    apiBaseConfigured: Boolean(apiBase),
    core,
  });
}
