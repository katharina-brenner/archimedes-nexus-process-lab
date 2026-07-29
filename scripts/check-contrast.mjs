const pairs = [
  ["dark surface heading", "#f8fcfc", "#102334", 4.5],
  ["dark surface body", "#c2d6d4", "#102334", 4.5],
  ["dark surface accent", "#a9e4d6", "#102334", 4.5],
  ["light surface heading", "#102033", "#ffffff", 4.5],
  ["light surface body", "#52647e", "#ffffff", 4.5],
  ["teal text on white", "#0f5a52", "#ffffff", 4.5],
  ["active control text", "#0b1b24", "#a5e2d0", 4.5],
  ["white on deep teal", "#ffffff", "#245c52", 4.5],
  ["sidebar label", "#a9bdc2", "#0b1828", 4.5],
  ["sidebar navigation", "#d7e5e7", "#0b1828", 4.5],
  ["public secondary copy", "#c5d3cf", "#102334", 4.5],
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
