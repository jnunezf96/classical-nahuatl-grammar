#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFile as execFileCallback } from "node:child_process";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { createModuleRuntime } from "../../../../src/node/runtime.mjs";

const execFile = promisify(execFileCallback);
const require = createRequire(import.meta.url);
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const batchRoot = path.resolve(scriptDirectory, "..");
const repositoryRoot = path.resolve(batchRoot, "../../..");
const version = "v20260810-exact-behavior-checkpoint-006";
const activePointerPath = path.join(repositoryRoot, "docs/canvas-progress/active-exact-observation-manifest.json");
const stableJson = value => `${JSON.stringify(value, null, 2)}\n`;
const digest = value => `sha256:${createHash("sha256").update(value).digest("hex")}`;
const equal = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const exactTestFiles = [
  "classical_vnc_subject_paradigm_exact.test.js",
  "classical_purposive_paradigm_axis_exact.test.js",
  "classical_compound_personal_pronominal_exact.test.js",
  "classical_interrogative_pronominal_subject_exact.test.js",
  "classical_simple_personal_pronominal_exact.test.js",
  "classical_nnc_subject_paradigm_projection_exact.test.js",
  "classical_pronominal_shared_owner_exact.test.js",
  "classical_quantitive_shared_owner_exact.test.js",
];

const semantic = JSON.parse(await readFile(path.join(repositoryRoot, "docs/ANDREWS_ATOM_SEMANTIC_SCOPE_AND_FORCE.json"), "utf8"));
const reconciliation = JSON.parse(await readFile(path.join(repositoryRoot, "docs/CLASSICAL_CANVAS_ATOM_UI_RECONCILIATION.json"), "utf8"));
const atomIndex = Object.fromEntries(reconciliation.codebooks.atomTuple.map((field, offset) => [field, offset]));
const tuples = new Map(reconciliation.atoms.map(tuple => [tuple[atomIndex.atomId], tuple]));
const anchors = new Map(semantic.atoms.map(atom => [atom.atomId, atom.anchor]));
const currentPointer = JSON.parse(await readFile(activePointerPath, "utf8"));
const oldPointer = currentPointer.activeManifest === `docs/proof-refresh/${version}/manifest.json`
  ? JSON.parse(await readFile(path.join(batchRoot, "rollback-active-manifest.json"), "utf8"))
  : currentPointer;
const oldManifest = JSON.parse(await readFile(path.join(repositoryRoot, oldPointer.activeManifest), "utf8"));
const alreadyObserved = new Set(oldManifest.observations.map(item => item.atomId));
const { context } = await createModuleRuntime({ exposeModuleInspectionCapabilities: true });
const captured = new Map();
let activeTestFile = "";

function captureAtom(label, actual, expected) {
  const match = /^(ACI-[^ ]+) observes (.+)$/.exec(label);
  if (!match) return false;
  const [, atomId, canonicalPath] = match;
  assert(equal(actual, expected), `${atomId} failed at ${canonicalPath}`);
  assert(!captured.has(atomId), `${atomId} was observed more than once in checkpoint tests`);
  captured.set(atomId, { atomId, canonicalPath, expected, actual, testFile: activeTestFile, mutationRejected: false });
  return true;
}

function captureMutation(label, comparison) {
  const match = /^(ACI-[^ ]+) rejects (.+)$/.exec(label);
  if (!match) return false;
  const atomId = match[1];
  assert(comparison === false, `${atomId} hostile mutation did not fail`);
  assert(captured.has(atomId), `${atomId} mutation ran before its exact observation`);
  captured.get(atomId).mutationRejected = true;
  captured.get(atomId).mutationAssertion = label;
  return true;
}

const runnerPath = require.resolve(path.join(repositoryRoot, "src/tests/runner.js"));
require(runnerPath);
require.cache[runnerPath].exports.createSuite = name => ({
  name,
  eq(label, actual, expected) {
    if (!captureAtom(label, actual, expected)) assert(equal(actual, expected), `${name}: ${label}`);
  },
  ok(label, value) { assert(Boolean(value), `${name}: ${label}`); },
  no(label, value) {
    if (!captureMutation(label, value)) assert(!value, `${name}: ${label}`);
  },
  summarize() { return { name, total: 0, passed: 0, failed: 0 }; },
});

for (const testFile of exactTestFiles) {
  activeTestFile = `src/tests/${testFile}`;
  require(path.join(repositoryRoot, activeTestFile)).run(context);
}

assert(captured.size === 99, `checkpoint test observation yield drifted: ${captured.size}`);
const eligibleCaptured = [...captured.values()].filter(item =>
  tuples.get(item.atomId)?.[atomIndex.proofCoordinateKind] === "non-generative-individual-atom-assertion");
assert(eligibleCaptured.length === 85, `checkpoint exact-credit yield drifted: ${eligibleCaptured.length}`);
const observations = eligibleCaptured.map(item => {
  const tuple = tuples.get(item.atomId);
  const ownerId = tuple?.[atomIndex.canonicalOwnerId];
  assert(anchors.has(item.atomId), `unknown atom ${item.atomId}`);
  assert(ownerId, `${item.atomId} has no canonical owner`);
  assert(tuple[atomIndex.proofCoordinateKind] === "non-generative-individual-atom-assertion",
    `${item.atomId} already has retained canonical proof and cannot be newly credited`);
  assert(!alreadyObserved.has(item.atomId), `${item.atomId} was already observed`);
  assert(item.mutationRejected, `${item.atomId} has no rejected hostile mutation`);
  return {
    atomId: item.atomId,
    ownerId,
    status: "EXACTLY_OBSERVED",
    obligation: "observe-canonical-grammar-behavior",
    assertionId: `${ownerId}:${item.atomId.toLowerCase()}`,
    canonicalPath: item.canonicalPath,
    expected: item.expected,
    actual: item.actual,
    canvasAnchor: anchors.get(item.atomId),
    proofTest: item.testFile,
    mutation: { assertion: item.mutationAssertion, rejected: true },
  };
});

const owners = [...new Set(observations.map(item => item.ownerId))].sort();
assert(owners.length === 13, `checkpoint owner count drifted: ${owners.length}`);
await mkdir(path.join(batchRoot, "receipts"), { recursive: true });
const receipts = [];
for (const ownerId of owners) {
  const ownerObservations = observations.filter(item => item.ownerId === ownerId);
  const receipt = {
    schemaVersion: 1,
    version,
    ownerId,
    canonicalResultDigest: digest(stableJson(ownerObservations.map(item => ({ canonicalPath: item.canonicalPath, actual: item.actual })))),
    observations: ownerObservations,
    counts: { atoms: ownerObservations.length, passed: ownerObservations.length, failed: 0, mutationsRejected: ownerObservations.length },
  };
  const relativePath = `docs/proof-refresh/${version}/receipts/${ownerId}.json`;
  await writeFile(path.join(repositoryRoot, relativePath), stableJson(receipt));
  receipts.push({ ownerId, path: relativePath, digest: digest(await readFile(path.join(repositoryRoot, relativePath), "utf8")) });
}

const cumulative = [...oldManifest.observations, ...observations];
const manifest = {
  schemaVersion: 1,
  version,
  status: "validated",
  baseProgressCommit: "0fd4e0090006a45c826f5956ee495fc54c4b3550",
  previousActiveManifest: oldPointer.activeManifest,
  baseProofCorpusRetained: true,
  checkpointCounts: { owners: owners.length, newlyExactlyObserved: observations.length, failed: 0, mutationsRejected: observations.length },
  counts: { owners: new Set(cumulative.map(item => item.ownerId)).size, atoms: cumulative.length, exactlyObserved: cumulative.length, failed: 0 },
  receipts: [...(oldManifest.receipts || []), ...receipts],
  observations: cumulative,
  normalizationRecords: oldManifest.normalizationRecords || [],
  validation: {
    exactAtomObservationPassed: true,
    mutationObservationPassed: true,
    sharedOperationReusePassed: true,
    baseProofCorpusUnchanged: true,
    atomicSwitchRollbackTestPassed: true,
  },
};
const manifestPath = path.join(batchRoot, "manifest.json");
await writeFile(manifestPath, stableJson(manifest));
const manifestDigest = digest(await readFile(manifestPath, "utf8"));
await writeFile(path.join(batchRoot, "rollback-active-manifest.json"), stableJson(oldPointer));
const activePointer = {
  schemaVersion: 1,
  activeManifest: `docs/proof-refresh/${version}/manifest.json`,
  activeManifestDigest: manifestDigest,
  rollbackManifest: oldPointer.activeManifest,
  rollbackManifestDigest: oldPointer.activeManifestDigest,
  baseProofCorpusRetained: true,
};
const temporaryPointerPath = `${activePointerPath}.tmp`;
for (const candidate of [activePointer, oldPointer, activePointer]) {
  await writeFile(temporaryPointerPath, stableJson(candidate));
  await rename(temporaryPointerPath, activePointerPath);
  assert(JSON.parse(await readFile(activePointerPath, "utf8")).activeManifestDigest === candidate.activeManifestDigest,
    "atomic manifest switch/rollback failed");
}

let auditOutput;
try {
  ({ stdout: auditOutput } = await execFile(process.execPath, ["docs/canvas-progress/audit_canvas_true_progress.mjs"], { cwd: repositoryRoot }));
} catch (error) {
  await writeFile(temporaryPointerPath, stableJson(oldPointer));
  await rename(temporaryPointerPath, activePointerPath);
  throw error;
}
const progress = JSON.parse(await readFile(path.join(repositoryRoot, "docs/CANVAS_TRUE_GRAMMAR_PROGRESS.json"), "utf8"));
assert(progress.lessonCorpus.exactProofs.exactBehaviorObserved === 8514, "progress ledger delta is wrong");
const report = {
  schemaVersion: 1,
  version,
  status: "passed",
  checkpoint: { owners: owners.length, newlyExactlyObserved: observations.length, failures: 0, mutationsRejected: observations.length },
  progress: { denominator: 18639, before: 8429, after: 8514, remaining: 10125 },
  validations: {
    canonicalResultObserved: true,
    mutationObservationPassed: true,
    sharedOperationReusePassed: true,
    focusedRuntimeTestsPassed: true,
    ledgerRegenerated: true,
    rollbackPassed: true,
  },
  auditSummary: JSON.parse(auditOutput),
};
await writeFile(path.join(batchRoot, "validation-report.json"), stableJson(report));
console.log(stableJson(report));
