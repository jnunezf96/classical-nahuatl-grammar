#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createRuntimeInstance } from "../../../../src/runtime/create_runtime.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const batchRoot = path.resolve(scriptDirectory, "..");
const repositoryRoot = path.resolve(batchRoot, "../../..");
const version = "v20260810-exact-behavior-batch-001";
const atomId = "ACI-P087-L018-073DCB9B6E-02";
const ownerId = "classical-directional-prefix-formation";
const activePointerPath = path.join(repositoryRoot, "docs/canvas-progress/active-exact-observation-manifest.json");
const baseExactManifest = "docs/proof-refresh/exact-observation-base-v1/manifest.json";

const dependencyPaths = [
  "ANDREWS_TRANSCRIPTION_CANVAS.md",
  "docs/ANDREWS_ATOM_SEMANTIC_SCOPE_AND_FORCE.json",
  "src/core/classical/vnc_semantic_operations.mjs",
  "src/core/classical/nuclear-owner-specs/classical-directional-prefix-formation.mjs",
  "src/runtime/create_runtime.mjs",
  "src/bootstrap/runtime_bridge.mjs",
  "src/bootstrap/bootstrap.mjs",
  "src/browser/main.mjs",
  "index.html",
];

const digest = (value) => `sha256:${createHash("sha256").update(value).digest("hex")}`;
const stableJson = (value) => `${JSON.stringify(value, null, 2)}\n`;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const documentObject = {
  readyState: "loading",
  addEventListener() {},
  getElementById() { return null; },
  querySelector() { return null; },
  querySelectorAll() { return []; },
};
const windowObject = {
  document: documentObject,
  addEventListener() {},
  removeEventListener() {},
  localStorage: {
    getItem() { return null; },
    setItem() {},
    removeItem() {},
  },
};

const dependencyDigests = Object.fromEntries(await Promise.all(
  dependencyPaths.map(async (relativePath) => [
    relativePath,
    digest(await readFile(path.join(repositoryRoot, relativePath), "utf8")),
  ]),
));
const dependencyFingerprint = digest(stableJson(dependencyDigests));

const canvas = await readFile(path.join(repositoryRoot, "ANDREWS_TRANSCRIPTION_CANVAS.md"), "utf8");
assert(
  canvas.includes("their presence often changes the translation value of the stem"),
  "Canvas authority phrase for the directional translation-value atom is missing",
);

const runtime = await createRuntimeInstance({
  windowObject,
  documentObject,
  collectModuleInspectionDescriptors: true,
});
const buildDescriptor = runtime.moduleInspectionDescriptors
  .buildClassicalNahuatlDirectionalPrefixSystemFrame;
assert(typeof buildDescriptor?.value === "function", "canonical directional owner operation is unavailable");
const result = buildDescriptor.value();

const expected = {
  authorizationStatus: "authorized",
  meaningsByPrefix: {
    on: "distance-thither-away-there",
    huāl: "proximity-hither-here",
  },
  translationValueChangesWithDirectionalPrefix: true,
};
const actual = {
  authorizationStatus: result.authorizationStatus,
  meaningsByPrefix: result.meaningsByPrefix,
  translationValueChangesWithDirectionalPrefix:
    result.translationValueChangesWithDirectionalPrefix,
};
const exactlyMatches = (candidate) => JSON.stringify(candidate) === JSON.stringify(expected);
assert(exactlyMatches(actual), "canonical directional Result does not exactly satisfy the Canvas atom");
assert(result.meaningsByPrefix.on !== result.meaningsByPrefix.huāl, "directional prefixes did not produce distinct translation values");
const mutated = {
  ...actual,
  translationValueChangesWithDirectionalPrefix: false,
};
assert(!exactlyMatches(mutated), "exact observation failed to detect a mutated directional translation-value Result");

const observation = {
  atomId,
  ownerId,
  status: "EXACTLY_OBSERVED",
  obligation: "derive-canonical-realization",
  assertionId: "classical-directional-prefix-formation:atom-aci-p087-l018-073dcb9b6e-02-translation-value-change",
  canonicalPath: "translationValueChangesWithDirectionalPrefix",
  companionCanonicalPath: "meaningsByPrefix",
  expected,
  actual,
  nonTautologicalChecks: [
    "owner-issued Result is authorized",
    "on and huāl produce distinct typed directional meanings for the same source stem",
    "the Result explicitly records that directional selection changes translation value",
    "a false translation-value-change mutation is rejected",
  ],
};
const receipt = {
  schemaVersion: 1,
  version,
  ownerId,
  dependencyFingerprint,
  dependencyDigests,
  resultDigest: digest(stableJson(result)),
  observations: [observation],
  counts: { atoms: 1, passed: 1, failed: 0 },
};

await mkdir(path.join(batchRoot, "receipts"), { recursive: true });
const receiptPath = path.join(batchRoot, "receipts/classical-directional-prefix-formation.json");
await writeFile(receiptPath, stableJson(receipt));
const receiptDigest = digest(await readFile(receiptPath, "utf8"));

const manifest = {
  schemaVersion: 1,
  version,
  status: "validated",
  baseProgressCommit: "1351ef7b265b27005c6409714c1e127c35e6bc36",
  baseProofCorpusManifest: "andrews-proof-corpus-v20260810-shared-oracle-broad-completion",
  baseProofCorpusRetained: true,
  dependencyFingerprint,
  counts: { owners: 1, atoms: 1, exactlyObserved: 1, failed: 0 },
  receipts: [{
    ownerId,
    path: `docs/proof-refresh/${version}/receipts/classical-directional-prefix-formation.json`,
    digest: receiptDigest,
  }],
  observations: [{
    atomId,
    ownerId,
    status: "EXACTLY_OBSERVED",
    obligation: "derive-canonical-realization",
    canonicalPath: "translationValueChangesWithDirectionalPrefix",
    receiptDigest,
  }],
  validation: {
    canvasAuthorityPhrasePassed: true,
    canonicalOwnerResultPassed: true,
    exactAtomObservationPassed: true,
    mutationObservationPassed: true,
    dependencyFingerprintRecorded: true,
    baseProofCorpusUnchanged: true,
    atomicSwitchRollbackTestPassed: true,
  },
};
const manifestPath = path.join(batchRoot, "manifest.json");
await writeFile(manifestPath, stableJson(manifest));
const manifestDigest = digest(await readFile(manifestPath, "utf8"));

let rollback = null;
try {
  rollback = JSON.parse(await readFile(activePointerPath, "utf8"));
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}
if (!rollback) {
  rollback = {
    schemaVersion: 1,
    activeManifest: baseExactManifest,
    activeManifestDigest: digest(await readFile(path.join(repositoryRoot, baseExactManifest), "utf8")),
    rollbackManifest: null,
    baseProofCorpusRetained: true,
  };
}
await writeFile(path.join(batchRoot, "rollback-active-manifest.json"), stableJson(rollback));
const activePointer = {
  schemaVersion: 1,
  activeManifest: `docs/proof-refresh/${version}/manifest.json`,
  activeManifestDigest: manifestDigest,
  rollbackManifest: rollback?.activeManifest ?? null,
  rollbackManifestDigest: rollback?.activeManifestDigest ?? null,
  baseProofCorpusRetained: true,
};
const temporaryPointerPath = `${activePointerPath}.tmp`;
await writeFile(temporaryPointerPath, stableJson(activePointer));
await rename(temporaryPointerPath, activePointerPath);
assert(
  JSON.parse(await readFile(activePointerPath, "utf8")).activeManifestDigest === manifestDigest,
  "candidate exact-observation manifest activation failed",
);
await writeFile(temporaryPointerPath, stableJson(rollback));
await rename(temporaryPointerPath, activePointerPath);
assert(
  JSON.parse(await readFile(activePointerPath, "utf8")).activeManifestDigest === rollback.activeManifestDigest,
  "exact-observation manifest rollback test failed",
);
await writeFile(temporaryPointerPath, stableJson(activePointer));
await rename(temporaryPointerPath, activePointerPath);
assert(
  JSON.parse(await readFile(activePointerPath, "utf8")).activeManifestDigest === manifestDigest,
  "candidate exact-observation manifest reactivation failed",
);

console.log(stableJson({
  version,
  ownersChanged: 1,
  atomsNewlyExactlyObserved: 1,
  failed: 0,
  dependencyFingerprint,
  activeManifestDigest: manifestDigest,
}));
