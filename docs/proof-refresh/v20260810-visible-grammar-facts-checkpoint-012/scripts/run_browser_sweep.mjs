import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DRIVER_PATH = "docs/proof-refresh/v20260810-visible-grammar-facts-checkpoint-012/scripts/run_browser_sweep.mjs";
const REPORT_PATH = "docs/proof-refresh/v20260810-visible-grammar-facts-checkpoint-012/browser-sweep-report.json";
const SELECTION_PATH = "docs/canvas-progress/checkpoint009_fact_selection.json";
const SEMANTIC_PATH = "docs/ANDREWS_ATOM_SEMANTIC_SCOPE_AND_FORCE.json";
const FINGERPRINT_PATHS = Object.freeze([
  DRIVER_PATH,
  "index.html",
  "src/browser/main.mjs",
  "src/bootstrap/bootstrap.mjs",
  "src/runtime/create_runtime.mjs",
  "src/core/classical/canvas_grammar_fact_presentation_routes.mjs",
  "src/core/classical/transcription_owner_mechanics.mjs",
  "src/ui/shell/classical_shell.mjs",
  "src/ui/rendering/rendering.mjs",
  SELECTION_PATH,
  SEMANTIC_PATH,
]);

const digest = value => `sha256:${createHash("sha256").update(value).digest("hex")}`;
const stableJson = value => `${JSON.stringify(value, null, 2)}\n`;

export async function getCheckpoint012BrowserSweepSourceFingerprint(repositoryRoot) {
  const records = [];
  for (const relativePath of FINGERPRINT_PATHS) {
    const bytes = await readFile(path.join(repositoryRoot, relativePath));
    records.push([relativePath, digest(bytes)]);
  }
  return Object.freeze({
    algorithm: "sha256",
    digest: digest(JSON.stringify(records)),
    files: Object.freeze(records.map(([relativePath, fileDigest]) => Object.freeze({
      path: relativePath,
      digest: fileDigest,
    }))),
  });
}

export async function runCheckpoint012BrowserSweep({
  tab,
  repositoryRoot,
  appUrl = "http://127.0.0.1:8090/?checkpoint=012-driver",
  writeReport = true,
} = {}) {
  if (!tab?.playwright || !repositoryRoot) {
    throw new Error("checkpoint 012 browser sweep requires a browser Tab and repository root");
  }
  const selection = JSON.parse(await readFile(path.join(repositoryRoot, SELECTION_PATH), "utf8"));
  const semantic = JSON.parse(await readFile(path.join(repositoryRoot, SEMANTIC_PATH), "utf8"));
  const sourceFactById = new Map(semantic.atoms.map(atom => [atom.atomId, atom]));
  const sourceFingerprint = await getCheckpoint012BrowserSweepSourceFingerprint(repositoryRoot);

  await tab.goto(appUrl);
  const details = tab.playwright.locator("#classical-canvas-grammar-facts");
  await details.waitFor({ state: "attached", timeoutMs: 20000 });
  await tab.playwright.waitForTimeout(5000);
  const open = await tab.playwright.evaluate(() => (
    document.querySelector("#classical-canvas-grammar-facts")?.open === true
  ));
  if (!open) await details.locator("summary").click({ timeoutMs: 10000 });

  const query = tab.playwright.locator("#classical-canvas-grammar-fact-query");
  const show = tab.playwright.locator("#classical-canvas-grammar-fact-show");
  const observations = [];
  for (const fact of selection.atoms) {
    const sourceFact = sourceFactById.get(fact.atomId);
    if (!sourceFact) throw new Error(`browser sweep atom is absent from semantic scope: ${fact.atomId}`);
    await query.fill(fact.atomId, { timeoutMs: 10000 });
    await show.click({ timeoutMs: 10000 });
    const observed = await tab.playwright.evaluate(() => {
      const output = document.querySelector("#classical-canvas-grammar-fact-output");
      return {
        atomId: output?.dataset.classicalCanvasGrammarFactAtomId || "",
        semanticOwnerId: output?.dataset.classicalCanvasGrammarFactOwnerId || "",
        projectRole: output?.dataset.classicalCanvasGrammarFactProjectRole || "",
        grammarAuthority: output?.dataset.classicalGrammarAuthority || "",
        statement: output?.querySelector("[data-classical-canvas-grammar-fact-statement]")?.textContent || "",
        canvasSource: output?.querySelector("[data-classical-canvas-grammar-fact-source]")?.textContent || "",
        visible: output?.dataset.classicalCanvasGrammarFactVisible || "",
      };
    });
    const expected = {
      atomId: fact.atomId,
      semanticOwnerId: fact.semanticOwnerId,
      projectRole: "read-only-grammar-fact",
      grammarAuthority: "false",
      statement: sourceFact.anchor,
      canvasSource: `Canvas source: ${sourceFact.canvasSpan}`,
      visible: "true",
    };
    const passed = Object.keys(expected).every(key => observed[key] === expected[key]);
    observations.push({ atomId: fact.atomId, passed, observed, expected });
  }

  const fields = Object.freeze([
    "atomId",
    "semanticOwnerId",
    "projectRole",
    "grammarAuthority",
    "statement",
    "canvasSource",
    "visible",
  ]);
  const tuples = (side) => observations.map(record => fields.map(field => record[side][field]));
  const orderedObservedDigest = digest(JSON.stringify(tuples("observed")));
  const orderedExpectedDigest = digest(JSON.stringify(tuples("expected")));
  const report = {
    schemaVersion: 1,
    kind: "normal-user-visible-canvas-grammar-fact-browser-sweep",
    driver: DRIVER_PATH,
    browser: "Codex In-app Browser",
    url: appUrl,
    interaction: [
      "fill Canvas grammar fact search with exact atom id",
      "use selected exact match",
      "press Show fact",
      "read visible output",
    ],
    sourceFingerprint,
    atomsAttempted: observations.length,
    atomsPassed: observations.filter(record => record.passed).length,
    atomsFailed: observations.filter(record => !record.passed).length,
    firstAtomId: observations[0]?.atomId || "",
    lastAtomId: observations.at(-1)?.atomId || "",
    orderedObservedDigest,
    orderedExpectedDigest,
    digestsEqual: orderedObservedDigest === orderedExpectedDigest,
    fields,
    passed: observations.every(record => record.passed),
  };
  if (writeReport) {
    await writeFile(path.join(repositoryRoot, REPORT_PATH), stableJson(report));
  }
  return Object.freeze(report);
}
