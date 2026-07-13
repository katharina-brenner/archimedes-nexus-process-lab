import { copyFile, mkdir, writeFile } from "node:fs/promises";

await mkdir("dist/.openai", { recursive: true });
await mkdir("dist/server", { recursive: true });
await copyFile(".openai/hosting.json", "dist/.openai/hosting.json");

await writeFile(
  "dist/server/index.js",
  `export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const assetPath = pathname === "/" || !pathname.includes(".") ? "/index.html" : pathname;
    const assetUrl = new URL(assetPath, url.origin);
    return env.ASSETS.fetch(new Request(assetUrl, request));
  }
};
`
);
