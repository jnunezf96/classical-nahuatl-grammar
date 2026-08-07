import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const testDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(testDirectory, "..", "..");
const css = fs.readFileSync(path.join(projectRoot, "style.css"), "utf8");
const html = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");

function relativeLuminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map((value) => parseInt(value, 16) / 255);
  const linear = channels.map((value) => value <= 0.04045
    ? value / 12.92
    : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(first, second) {
  const lighter = Math.max(relativeLuminance(first), relativeLuminance(second));
  const darker = Math.min(relativeLuminance(first), relativeLuminance(second));
  return (lighter + 0.05) / (darker + 0.05);
}

const stylesheetVersion = html.match(/style\.css\?v=([^"']+)/u)?.[1] || "";
const moduleEntryVersion = html.match(/main\.mjs\?v=([^"']+)/u)?.[1] || "";
const selectedBackground = css.match(/--workbench-teal-deep:\s*(#[a-f\d]{6})\s*;/iu)?.[1] || "";
const selectedForeground = "#ffffff";

assert.ok(stylesheetVersion, "the stylesheet must have an explicit delivery key");
assert.equal(
  stylesheetVersion,
  moduleEntryVersion,
  "the Workbench stylesheet and browser entry must share the current delivery key"
);
assert.equal(selectedBackground.toLowerCase(), "#123f37");
assert.ok(css.includes('body.is-language-classical .panel-stack-tab[aria-selected="true"]'));
assert.ok(css.includes("background: var(--workbench-teal-deep);"));
assert.ok(css.includes("color: #fff;"));
assert.ok(contrastRatio(selectedBackground, selectedForeground) >= 4.5);

console.log("Panel tab contrast tests passed.");
