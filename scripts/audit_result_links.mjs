import { createRuntimeInstance } from "../src/runtime/create_runtime.mjs";
import { inspectClassicalResultLink } from "../src/application/classical/result_reload.mjs";
import { encodeCompactResultAddress, decodeCompactResultAddress } from "../src/application/classical/compact_result_link.mjs";
import capabilities from "../src/tests/classical_all_25_capability_play_contract.test.js";
import { isDeepStrictEqual } from "node:util";

const instantiate = async () => (await createRuntimeInstance({
  documentObject: { getElementById: () => null, addEventListener() {} },
})).runtimeObject;
const runtime = await instantiate();
const fresh = await instantiate();
const witnesses = new Map();
const instrumented = Object.create(runtime);
Object.defineProperty(instrumented, "captureClassicalGrammarApplicationResult", { value(value, slot) {
  const capture = runtime.captureClassicalGrammarApplicationResult(value, slot);
  if (capture?.authorizationStatus === "authorized" && capture.canonicalResult) {
    witnesses.set(capture.canonicalResult, capture.operationId);
  }
  return capture;
} });
Object.defineProperty(instrumented, "executeClassicalGrammarApplicationRequest", { value(request) {
  const receipt = runtime.executeClassicalGrammarApplicationRequest(request);
  if (receipt?.authorizationStatus === "authorized" && receipt.canonicalResult
    && !["nnc:diagram", "vnc:diagram"].includes(receipt.operationId)) {
    witnesses.set(receipt.canonicalResult, receipt.operationId);
  }
  return receipt;
} });
const fixtureResults = capabilities.run(instrumented).summarize();

// Reuse issued parents to exercise recursion without inventing grammar inputs.
for (const [whole, operation] of [...witnesses]) {
  if (operation === "vnc:ordered-voice-application") {
    instrumented.executeClassicalGrammarApplicationRequest({ operationId: "vnc:sentence-result", args: [whole] });
  }
  if (operation !== "nnc:adjectival-modification") continue;
  const modifier = whole.selectedClauses.find(clause => clause.role === "modifier")?.sourceResult;
  instrumented.executeClassicalGrammarApplicationRequest({
    operationId: operation,
    args: [{ operationKind: "adjectival-modification", topology: "ordinary", head: whole, modifier }],
  });
}

function project(runtime, value) {
  const capture = runtime.captureClassicalGrammarApplicationResult(value, "result-link-audit");
  if (!capture || !runtime.isClassicalGrammarApplicationResultCapture(capture, "result-link-audit")) return null;
  const inner = value.resultFrame;
  return {
    operation: capture.operationId,
    kind: capture.outputKind,
    surface: value.sentenceSurfaceDisplay || value.sentenceSurface || value.surface || value.surfaceRealization
      || value.wordSurface || inner?.surface || inner?.surfaceRealization,
    analysis: value.sentenceFormulaDisplay || value.sentenceFormula || value.formula
      || value.formulaRealization || value.formulaRecord?.formula || inner?.formulaRealization,
  };
}

const counts = new Map();
for (const [result, operation] of witnesses) {
  const check = inspectClassicalResultLink(runtime, result, project, fresh);
  let { status } = check;
  if (status === "verified") {
    try {
      const address = await encodeCompactResultAddress(check.recipe);
      const decoded = address && await decodeCompactResultAddress(address);
      status = isDeepStrictEqual(decoded, JSON.parse(JSON.stringify(check.recipe)))
        ? status : "compact-address-failed";
    } catch {
      status = "compact-address-failed";
    }
  }
  const key = `${operation}: ${status}`;
  counts.set(key, (counts.get(key) || 0) + 1);
}
console.log(`Checked ${witnesses.size} accepted Result witnesses`);
for (const [key, count] of [...counts].sort(([left], [right]) => left.localeCompare(right))) {
  console.log(`${count}\t${key}`);
}
if (fixtureResults.failed || !witnesses.size || [...counts.keys()].some(key => !key.endsWith(": verified"))) process.exitCode = 1;
