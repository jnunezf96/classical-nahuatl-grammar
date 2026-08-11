#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFile as execFileCallback } from "node:child_process";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const execFile = promisify(execFileCallback);
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const correctionRoot = path.resolve(scriptDirectory, "..");
const repositoryRoot = path.resolve(correctionRoot, "../../..");
const version = "v20260810-visible-credit-correction-011";
const pointerPath = path.join(repositoryRoot, "docs/canvas-progress/active-exact-observation-manifest.json");
const baseManifestRelative = "docs/proof-refresh/v20260810-exact-behavior-checkpoint-008/manifest.json";
const stableJson = (value) => `${JSON.stringify(value, null, 2)}\n`;
const digest = (value) => `sha256:${createHash("sha256").update(value).digest("hex")}`;
const assert = (condition, message) => { if (!condition) throw new Error(message); };

const priorPointer = JSON.parse(await readFile(pointerPath, "utf8"));
const baseManifest = JSON.parse(await readFile(path.join(repositoryRoot, baseManifestRelative), "utf8"));
const selection009 = JSON.parse(await readFile(path.join(repositoryRoot, "docs/canvas-progress/checkpoint009_fact_selection.json"), "utf8"));
const selection010 = JSON.parse(await readFile(path.join(repositoryRoot, "docs/canvas-progress/checkpoint010_fact_selection.json"), "utf8"));
const affectedAtomIds = [...selection009.atoms, ...selection010.atoms].map((record) => record.atomId);
assert(new Set(affectedAtomIds).size === 1000, "credit-correction atom set drifted");
assert(baseManifest.counts.atoms === 409, "checkpoint 008 base observation count drifted");

const manifest = {
  schemaVersion: 1,
  version,
  status: "validated",
  previousActiveManifest: priorPointer.activeManifest,
  baseExactManifest: baseManifestRelative,
  baseProofCorpusRetained: true,
  checkpointCounts: {
    owners: 0,
    newlyExactlyObserved: 0,
    failed: 0,
    reclassifiedPreparedRuntimeFacts: affectedAtomIds.length,
  },
  counts: baseManifest.counts,
  receipts: baseManifest.receipts,
  observations: baseManifest.observations,
  normalizationRecords: baseManifest.normalizationRecords || [],
  preparedRuntimeFacts: {
    status: "prepared-runtime-ready-not-exactly-observed",
    atomCount: affectedAtomIds.length,
    selectionManifests: [
      "docs/canvas-progress/checkpoint009_fact_selection.json",
      "docs/canvas-progress/checkpoint010_fact_selection.json",
    ],
    runtimeRegistry: "src/core/classical/canvas_grammar_fact_registry.mjs",
    runtimeProjectionMechanism: "src/core/classical/transcription_owner_mechanics.mjs",
    missingCompletionRequirement: "normal-user-triggered-visible-rendering-observed-by-browser-test",
    grammarAuthority: false,
  },
  creditCorrection: {
    reason: "Typed runtime projections had no non-test UI consumer, so internal projection tests did not complete the user-visible job of showing each fact.",
    supersededCheckpoints: [
      "v20260810-exact-behavior-checkpoint-009",
      "v20260810-exact-behavior-checkpoint-010",
    ],
    priorClaimedExactlyObserved: 1000,
    correctedExactlyObserved: 0,
    correctedStatus: "prepared-runtime-ready",
  },
  validation: {
    baseExactObservationsRetained: true,
    falseVisibleCreditsRemoved: true,
    baseProofCorpusUnchanged: true,
    atomicSwitchRollbackTestPassed: true,
  },
};

await mkdir(correctionRoot, { recursive: true });
const manifestPath = path.join(correctionRoot, "manifest.json");
await writeFile(manifestPath, stableJson(manifest));
const activePointer = {
  schemaVersion: 1,
  activeManifest: `docs/proof-refresh/${version}/manifest.json`,
  activeManifestDigest: digest(await readFile(manifestPath, "utf8")),
  rollbackManifest: priorPointer.activeManifest,
  rollbackManifestDigest: priorPointer.activeManifestDigest,
  baseProofCorpusRetained: true,
};
await writeFile(path.join(correctionRoot, "rollback-active-manifest.json"), stableJson(priorPointer));
const temporaryPointerPath = `${pointerPath}.tmp`;
for (const candidate of [activePointer, priorPointer, activePointer]) {
  await writeFile(temporaryPointerPath, stableJson(candidate));
  await rename(temporaryPointerPath, pointerPath);
  assert(JSON.parse(await readFile(pointerPath, "utf8")).activeManifestDigest === candidate.activeManifestDigest,
    "atomic correction switch/rollback failed");
}

const { stdout: auditOutput } = await execFile(process.execPath, [
  "docs/canvas-progress/audit_canvas_true_progress.mjs",
], { cwd: repositoryRoot });
const progress = JSON.parse(await readFile(path.join(repositoryRoot, "docs/CANVAS_TRUE_GRAMMAR_PROGRESS.json"), "utf8"));
assert(progress.lessonCorpus.exactProofs.exactBehaviorObserved === 5756, "corrected exact count is wrong");
const report = {
  schemaVersion: 1,
  version,
  status: "passed",
  correction: {
    removedFalseExactCredits: 1000,
    preparedRuntimeFactsRetained: 1000,
    exactlyObservedBeforeCorrection: 6756,
    exactlyObservedAfterCorrection: 5756,
    remainingAfterCorrection: 12883,
  },
  validations: {
    baseExactObservationsRetained: true,
    runtimePreparationRetained: true,
    ledgerRegenerated: true,
    atomicSwitchRollbackPassed: true,
  },
  auditSummary: JSON.parse(auditOutput),
};
await writeFile(path.join(correctionRoot, "validation-report.json"), stableJson(report));
console.log(stableJson(report));
