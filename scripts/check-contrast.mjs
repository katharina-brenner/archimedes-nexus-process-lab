const pairs = [
  ["navy surface heading", "#ffffff", "#071d33", 4.5],
  ["navy surface body", "#c8d7e5", "#071d33", 4.5],
  ["light surface heading", "#10273d", "#ffffff", 4.5],
  ["light surface body", "#526a80", "#ffffff", 4.5],
  ["ice surface body", "#526a80", "#eef3f8", 4.5],
  ["white on cobalt", "#ffffff", "#234fc8", 4.5],
  ["ink on amber", "#10273d", "#f2b441", 4.5],
  ["sidebar label", "#a7bbcf", "#071d33", 4.5],
  ["sidebar navigation", "#d5e0eb", "#071d33", 4.5],
  ["canvas stream label", "#eff5fb", "#051627", 4.5],
  ["open status", "#10273d", "#d9e4ef", 4.5],
];

function channel(value) {
  const normalized = value / 255;
  return normalized <= 0.04045
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const value = hex.replace("#", "");
  const channels = [0, 2, 4].map((offset) =>
    channel(Number.parseInt(value.slice(offset, offset + 2), 16)),
  );
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(foreground, background) {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

const failures = [];

for (const [label, foreground, background, minimum] of pairs) {
  const ratio = contrast(foreground, background);
  if (ratio < minimum) {
    failures.push(`${label}: ${ratio.toFixed(2)}:1 (minimum ${minimum}:1)`);
  }
}

if (failures.length) {
  console.error(`Contrast checks failed:\n${failures.join("\n")}`);
  process.exit(1);
}

console.log(`Contrast checks passed for ${pairs.length} semantic color pairs.`);
