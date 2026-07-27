export const dynamic = "force-dynamic";

const hopByHopHeaders = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
]);

function apiBase() {
  const value = process.env.AXION_API_BASE_URL || "http://127.0.0.1:8899";
  return value.replace(/\/+$/, "");
}

async function proxy(request, { params }) {
  const path = (await params).path || [];
  const target = new URL(`${apiBase()}/api/${path.map(encodeURIComponent).join("/")}`);
  const source = new URL(request.url);
  target.search = source.search;

  const headers = new Headers(request.headers);
  hopByHopHeaders.forEach((header) => headers.delete(header));
  headers.set("x-axion-bff", "nextjs");

  const init = {
    method: request.method,
    headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : await request.arrayBuffer(),
    redirect: "manual",
  };

  const response = await fetch(target, init);
  const responseHeaders = new Headers(response.headers);
  hopByHopHeaders.forEach((header) => responseHeaders.delete(header));
  responseHeaders.set("x-axion-bff", "nextjs");

  return new Response(response.body, {
    status: response.status,
    headers: responseHeaders,
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
