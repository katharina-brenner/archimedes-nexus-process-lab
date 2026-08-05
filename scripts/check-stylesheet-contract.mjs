import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const styleFiles = [
  "styles.css",
  "axion-design-system.css",
  "axion-editorial.css",
  "axion-unified.css",
];

const indexes = styleFiles.map((file) => html.indexOf(file));
for (let index = 0; index < indexes.length; index += 1) {
  if (indexes[index] < 0) {
    throw new Error(`Missing stylesheet link: ${styleFiles[index]}`);
  }
  if (index > 0 && indexes[index] <= indexes[index - 1]) {
    throw new Error(`Stylesheet order is invalid near ${styleFiles[index]}`);
  }
}

function assertBalancedCss(file, source) {
  const stripped = source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'/g, "");
  let depth = 0;
  for (const char of stripped) {
    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;
    if (depth < 0) throw new Error(`Unexpected closing brace in ${file}`);
  }
  if (depth !== 0) throw new Error(`Unbalanced braces in ${file}`);
}

const sources = Object.fromEntries(
  styleFiles.map((file) => {
    const source = fs.readFileSync(path.join(root, file), "utf8");
    assertBalancedCss(file, source);
    return [file, source];
  }),
);

const unified = sources["axion-unified.css"];
const requiredContracts = [
  /--public-content:\s*1240px/,
  /--public-gutter:\s*32px/,
  /--public-label-track:\s*220px/,
  /body\.locked \.public-section\.public-page/,
  /body:not\(\.locked\) \.topbar \.profile-button/,
  /@media \(max-width: 820px\)/,
  /@media \(max-width: 560px\)/,
];

for (const contract of requiredContracts) {
  if (!contract.test(unified)) {
    throw new Error(`Unified stylesheet is missing contract ${contract}`);
  }
}

if (/Final alignment system/.test(sources["axion-editorial.css"])) {
  throw new Error("Authoritative alignment rules must remain in axion-unified.css");
}

const totalBytes = styleFiles.reduce(
  (sum, file) => sum + Buffer.byteLength(sources[file]),
  0,
);
console.log(
  `Stylesheet contract passed for ${styleFiles.length} ordered layers (${Math.round(totalBytes / 1024)} KiB source).`,
);
