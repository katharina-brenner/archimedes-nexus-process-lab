import { copyFile, mkdir, readdir, readFile, writeFile } from "node:fs/promises";

await mkdir("dist/.openai", { recursive: true });
await mkdir("dist/server", { recursive: true });
await copyFile(".openai/hosting.json", "dist/.openai/hosting.json");

const routes = {
  "/index.html": {
    type: "text/html; charset=utf-8",
    body: await readFile("dist/client/index.html", "utf8")
  }
};

for (const fileName of await readdir("dist/client/assets")) {
  const route = `/assets/${fileName}`;
  routes[route] = {
    type: fileName.endsWith(".css") ? "text/css; charset=utf-8" : "application/javascript; charset=utf-8",
    body: await readFile(`dist/client/assets/${fileName}`, "utf8")
  };
}

await writeFile(
  "dist/server/index.js",
  `const routes = ${JSON.stringify(routes)};

function makeResponse(request) {
    const url = new URL(request.url);
    const pathname = url.pathname === "/" || !url.pathname.includes(".") ? "/index.html" : url.pathname;
    const asset = routes[pathname];
    if (!asset) return new Response("Not found", { status: 404 });
    const cacheControl = pathname.startsWith("/assets/")
      ? "public, max-age=31536000, immutable"
      : "no-cache";
    return new Response(request.method === "HEAD" ? null : asset.body, {
      headers: {
        "content-type": asset.type,
        "cache-control": cacheControl
      }
    });
  }

export default {
  async fetch(request) {
    return makeResponse(request);
  }
};
`
);
