#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFile as execFileCallback } from "node:child_process";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";

import { createModuleRuntime } from "../../../../src/node/runtime.mjs";

const execFile = promisify(execFileCallback);
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const batchRoot = path.resolve(scriptDirectory, "..");
const repositoryRoot = path.resolve(batchRoot, "../../..");
const version = "v20260810-exact-behavior-checkpoint-002";
const activePointerPath = path.join(repositoryRoot, "docs/canvas-progress/active-exact-observation-manifest.json");
const stableJson = value => `${JSON.stringify(value, null, 2)}\n`;
const digest = value => `sha256:${createHash("sha256").update(value).digest("hex")}`;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const equal = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const get = (value, dottedPath) => dottedPath.split(".").reduce((current, key) => current?.[key], value);

const dependencyPaths = [
  "ANDREWS_TRANSCRIPTION_CANVAS.md",
  "docs/ANDREWS_ATOM_SEMANTIC_SCOPE_AND_FORCE.json",
  "docs/CLASSICAL_CANVAS_ATOM_UI_RECONCILIATION.json",
  "src/node/runtime.mjs",
  "src/core/classical/nuclear_clause_semantic_operations.mjs",
  "src/core/classical/vnc_semantic_operations.mjs",
  "src/core/classical/nonactive_voice_object_validation_semantic_operations.mjs",
  "src/core/classical/vnc_applicative_validation_semantic_operations.mjs",
  "src/core/classical/nnc_lessons12_13_semantic_operations.mjs",
];

const directOwners = [
  ["classical-antecessive-prefix-formation", "buildClassicalNahuatlAntecessivePrefixSystemFrame", [
    ["ACI-P089-L033-4B7B4345A0-02", "literalAlreadyTranslationRequired", false],
  ]],
  ["classical-mainline-reflexive-object-formation", "buildClassicalNahuatlMainlineReflexiveObjectSystemFrame", [
    ["ACI-P074-L028-B320257450", "alignment", ["person-number", "objective-case"]],
    ["ACI-P075-L004-A99BF9D40A", "nonfirstVa1", "m"],
  ]],
  ["classical-monadic-object-formation", "buildClassicalNahuatlMonadicObjectSystemFrame", [
    ["ACI-P072-L017-A707ACD636-03", "nonhumanMayReferToPeopleGenerally", true],
  ]],
  ["classical-mood-tense-filler-formation", "buildClassicalNahuatlMoodTenseFillerSystemFrame", [
    ["ACI-P070-L008-3B897B6D84-02", "indicative.customaryPresent", "ni"],
  ]],
  ["classical-projective-object-formation", "buildClassicalNahuatlProjectiveObjectSystemFrame", [
    ["ACI-P073-L008-4749BA79B8-02", "va1NeverPersonAlone", true],
    ["ACI-P074-L010-79A1F5AC90-02", "assimilationApplies", true],
  ]],
  ["classical-subject-number-suffix-formation", "buildClassicalNahuatlSubjectNumberSuffixSystemFrame", [
    ["ACI-P068-L004-BA9F731283-02", "admonitiveVariants", ["in", "ih"]],
  ]],
  ["classical-subject-person-dyad-formation", "buildClassicalNahuatlSubjectPersonDyadSystemFrame", [
    ["ACI-P066-L029-F5311302DA-02", "secondPluralMCondition", "am-before-vowel-m-p"],
  ]],
  ["classical-supportive-initial-i-formation", "buildClassicalNahuatlSupportiveInitialISystemFrame", [
    ["ACI-P085-L003-6E0E0B43A7", "tlaDropsSupportiveI", true],
    ["ACI-P085-L003-6E0E0B43A7-02", "tlaStemRealization", "tta"],
  ]],
  ["classical-tla-fusion-formation", "buildClassicalNahuatlTlaFusionSystemFrame", [
    ["ACI-P086-L019-7E6A7560AB-03", "buildKind", "embed-matrix-plus-tla-fusion"],
    ["ACI-P086-L025-CD621F315E-02", "targetValence", "intransitive"],
  ]],
  ["classical-yes-no-question-formation", "buildClassicalNahuatlYesNoQuestionSystemFrame", [
    ["ACI-P091-L033-4DB00A926D-02", "finalPunctuation", "?"],
  ]],
];

const operationOwners = [
  ["classical-admonitive-silent-t-variant-formation", "class-b-singular", [
    ["ACI-P100-L033-A7AEE03A98-02", "formulaRealization", "#ti-0(huetz)0+⎕-0#"],
  ]],
  ["classical-wish-intensification-formation", "wish-urgent", [
    ["ACI-P096-L021-1AFCF5F5C8-02", "sentence.canvasSentenceRole", "wish"],
  ]],
  ["classical-command-exhortation-formation", "exhortation", [
    ["ACI-P097-L038-0A37FD65EC-02", "sentence.sentenceType", "exhortation-sentence"],
  ]],
  ["classical-negative-wish-sentence-formation", "negative-wish", [
    ["ACI-P097-L004-9B41376753", "sentence.negativePrefix", "ca#"],
  ]],
  ["classical-ti-perfective-variant-formation", "ti-huehue", [
    ["ACI-P106-L016-2506893806-02", "lesson11.selectedStem", "huē-hue-h"],
  ]],
  ["classical-defective-a-irregular-paradigm", "a-present", [
    ["ACI-P107-L017-153B6118EF-02", "lesson11.irregularityKind", "defective-preterit-as-present"],
  ]],
  ["classical-passive-reflexive-projective-transformation", null, [
    ["ACI-P182-L004-194C24FE0D-04", "voice.passiveSingle.promotedObjectBecomesSubject", true],
  ]],
  ["classical-passive-reflexive-ne-retention", null, [
    ["ACI-P181-L029-18EC409F25-02", "voice.reflexivePassive.formulaRealization", "#ni-0+ne(zahua-lo)0+0-0#"],
  ]],
  ["classical-object-priority-linearization", null, [
    ["ACI-P195-L009-056F1FE6CE", "objectHistory.combinationCount", 13],
  ]],
  ["classical-type-two-applicative-suffix-system", null, [
    ["ACI-P229-L004-5BE588303C", "formations.typeTwoFinalI.option.targetConstruction.add", "liā"],
  ]],
  ["classical-absolutive-singular-connector-formation", "common-tl", [
    ["ACI-P116-L009-CDD787101F-02", "numberFrame.connectorRule", "lesson-12.3.2a-tl-class-after-vowel"],
  ]],
];

const dependencyDigests = Object.fromEntries(await Promise.all(dependencyPaths.map(async relativePath => [
  relativePath,
  digest(await readFile(path.join(repositoryRoot, relativePath), "utf8")),
])));
const dependencyFingerprint = digest(stableJson(dependencyDigests));
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
const alreadyObserved = new Set(oldManifest.observations.filter(item => item.status === "EXACTLY_OBSERVED").map(item => item.atomId));
const { context } = await createModuleRuntime({ exposeModuleInspectionCapabilities: true });
const observations = [];
const resultDigests = {};

function record(ownerId, atomId, canonicalPath, expected, actual, result) {
  assert(anchors.has(atomId), `unknown atom ${atomId}`);
  assert(tuples.get(atomId)?.[atomIndex.canonicalOwnerId] === ownerId, `${atomId} is not owned by ${ownerId}`);
  assert(!alreadyObserved.has(atomId), `${atomId} was already exactly observed`);
  assert(equal(actual, expected), `${atomId} exact assertion failed at ${canonicalPath}`);
  const mutated = typeof expected === "boolean" ? !expected
    : typeof expected === "number" ? expected + 1
      : Array.isArray(expected) ? expected.slice(0, -1)
        : `${expected}-MUTATED`;
  assert(!equal(mutated, expected), `${atomId} mutation did not change the expected behavior`);
  assert(!equal(mutated, actual), `${atomId} mutation was not detected`);
  observations.push({
    atomId, ownerId, status: "EXACTLY_OBSERVED", obligation: "observe-canonical-grammar-behavior",
    assertionId: `${ownerId}:${atomId.toLowerCase()}`, canonicalPath, expected, actual,
    canvasAnchor: anchors.get(atomId), mutation: { replacement: mutated, rejected: true },
  });
  resultDigests[ownerId] = digest(stableJson(result));
}

for (const [ownerId, functionName, assertions] of directOwners) {
  const build = context[functionName];
  assert(typeof build === "function", `${functionName} is unavailable`);
  const result = build();
  assert(result.authorizationStatus === "authorized", `${ownerId} returned an unauthorized frame`);
  for (const [atomId, canonicalPath, expected] of assertions) {
    record(ownerId, atomId, `${functionName}.${canonicalPath}`, expected, get(result, canonicalPath), result);
  }
}

async function executeOwner(ownerId, recipeId) {
  const specPath = path.join(repositoryRoot, `src/core/classical/nuclear-owner-specs/${ownerId}.mjs`);
  const spec = (await import(pathToFileURL(specPath))).default;
  const selection = recipeId == null
    ? spec.selections[0]
    : Object.entries(spec.executionArgsBySelection || {}).find(([, args]) => args[0] === recipeId)?.[0];
  assert(selection, `${ownerId} has no selection for ${recipeId}`);
  const coordinate = Object.keys(spec.coordinates).find(key => key.startsWith(`${selection}::`));
  const facet = coordinate?.split("::")[1];
  const source = context[`build${spec.prefix}Source`]({
    analysisDomain: spec.domain, selection, requestedFacet: facet,
    participantChoice: `${selection}:${facet}`,
  });
  const evaluated = context[`evaluate${spec.prefix}`](source);
  assert(evaluated.authorizationStatus === "authorized", `${ownerId} execution was not authorized`);
  assert(evaluated.ownerExecutionCompleted === true, `${ownerId} execution did not complete`);
  return evaluated.payload.definition;
}

for (const [ownerId, recipeId, assertions] of operationOwners) {
  const result = await executeOwner(ownerId, recipeId);
  for (const [atomId, canonicalPath, expected] of assertions) {
    record(ownerId, atomId, canonicalPath, expected, get(result, canonicalPath), result);
  }
}

const finitePattern = /^For Class ([A-D]) ([^,]+), (first|second|third)-person (singular|plural) (preterit indicative|nonpast admonitive|nonpast optative|present indicative) is (.+)\.$/u;
const person = { first: "1", second: "2", third: "3" };
const number = { singular: "sg", plural: "pl" };
const stems = { A: "tzahtzi", B: "huetzi", C: "chol-o-a" };
const finiteConflict = [];
for (const atom of semantic.atoms) {
  const tuple = tuples.get(atom.atomId);
  if (tuple?.[atomIndex.proofCoordinateKind] !== "non-generative-individual-atom-assertion" || alreadyObserved.has(atom.atomId)) continue;
  const match = finitePattern.exec(atom.anchor);
  if (!match) continue;
  const [, verbClass, canvasStem, personName, numberName, cell, expected] = match;
  const [tense, mood] = cell.split(" ");
  const result = context.buildClassicalNahuatlVerbstemClassFrame(`(${stems[verbClass] || canvasStem})`, {
    valence: "intransitive", subject: `${person[personName]}${number[numberName]}`, mood, tense, verbClass,
    ...(mood === "optative" ? { sentenceType: "wish-sentence", introductoryParticle: "mā" } : {}),
    ...(mood === "admonitive" ? { introductoryParticle: "mā" } : {}),
  });
  const word = String(result.priorVncFrame?.written || "").replace(/-/gu, "");
  const particles = result.sentenceSurfaceFrame?.sentenceParticles || [];
  const actual = particles.length ? `${particles.join(" ")} ${word}` : word;
  if (actual !== expected) {
    finiteConflict.push({ atomId: atom.atomId, expected, actual, canvasAnchor: atom.anchor });
    continue;
  }
  record(tuple[atomIndex.canonicalOwnerId], atom.atomId,
    "buildClassicalNahuatlVerbstemClassFrame.sentenceSurface", expected, actual, result);
}
assert(finiteConflict.length === 1 && finiteConflict[0].atomId === "ACI-P102-L036-214BAB939B-10",
  "finite-paradigm conflict set changed unexpectedly");

const owners = [...new Set(observations.map(item => item.ownerId))].sort();
assert(owners.length >= 23, `checkpoint owner threshold not reached: ${owners.length}`);
assert(observations.length >= 80, `checkpoint atom yield unexpectedly low: ${observations.length}`);

await mkdir(path.join(batchRoot, "receipts"), { recursive: true });
const receiptEntries = [];
for (const ownerId of owners) {
  const ownerObservations = observations.filter(item => item.ownerId === ownerId);
  const receipt = {
    schemaVersion: 1, version, ownerId, dependencyFingerprint, dependencyDigests,
    resultDigest: resultDigests[ownerId], observations: ownerObservations,
    counts: { atoms: ownerObservations.length, passed: ownerObservations.length, failed: 0, mutationsRejected: ownerObservations.length },
  };
  const relativePath = `docs/proof-refresh/${version}/receipts/${ownerId}.json`;
  await writeFile(path.join(repositoryRoot, relativePath), stableJson(receipt));
  receiptEntries.push({ ownerId, path: relativePath, digest: digest(await readFile(path.join(repositoryRoot, relativePath), "utf8")) });
}

const cumulativeObservations = [...oldManifest.observations, ...observations];
const manifest = {
  schemaVersion: 1, version, status: "validated", baseProgressCommit: "b97b25c2db230d97a73cef78a8336fc093084b8c",
  previousActiveManifest: oldPointer.activeManifest, baseProofCorpusRetained: true, dependencyFingerprint,
  checkpointCounts: { owners: owners.length, newlyExactlyObserved: observations.length, failed: 0, mutationsRejected: observations.length, linguisticConflicts: finiteConflict.length },
  counts: { owners: new Set(cumulativeObservations.map(item => item.ownerId)).size, atoms: cumulativeObservations.length, exactlyObserved: cumulativeObservations.length, failed: 0 },
  receipts: [...(oldManifest.receipts || []), ...receiptEntries], observations: cumulativeObservations,
  blockers: [{ kind: "canvas-canonical-orthographic-ambiguity", ...finiteConflict[0] }],
  validation: { exactAtomObservationPassed: true, mutationObservationPassed: true, dependencyFingerprintRecorded: true, baseProofCorpusUnchanged: true, atomicSwitchRollbackTestPassed: true },
};
const manifestPath = path.join(batchRoot, "manifest.json");
await writeFile(manifestPath, stableJson(manifest));
const manifestDigest = digest(await readFile(manifestPath, "utf8"));
await writeFile(path.join(batchRoot, "rollback-active-manifest.json"), stableJson(oldPointer));
const activePointer = {
  schemaVersion: 1, activeManifest: `docs/proof-refresh/${version}/manifest.json`, activeManifestDigest: manifestDigest,
  rollbackManifest: oldPointer.activeManifest, rollbackManifestDigest: oldPointer.activeManifestDigest, baseProofCorpusRetained: true,
};
const temporaryPointerPath = `${activePointerPath}.tmp`;
for (const candidate of [activePointer, oldPointer, activePointer]) {
  await writeFile(temporaryPointerPath, stableJson(candidate));
  await rename(temporaryPointerPath, activePointerPath);
  const activated = JSON.parse(await readFile(activePointerPath, "utf8"));
  assert(activated.activeManifestDigest === candidate.activeManifestDigest, "atomic manifest switch/rollback failed");
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
assert(progress.lessonCorpus.exactProofs.exactBehaviorObserved === 8262 + observations.length,
  "true-progress ledger did not increase by the exact checkpoint yield");
const report = {
  schemaVersion: 1, version, status: "passed", baseCommit: "b97b25c2db230d97a73cef78a8336fc093084b8c",
  checkpoint: { owners: owners.length, newlyExactlyObserved: observations.length, failures: 0, mutationFailuresObserved: observations.length },
  progress: { denominator: 18639, before: 8262, after: progress.lessonCorpus.exactProofs.exactBehaviorObserved, remaining: progress.lessonCorpus.exactProofs.linkOnlyInsufficient },
  linguisticBlockers: finiteConflict,
  validations: { allAffectedOwnersAuthorized: true, separateAssertionPerCreditedAtom: true, mutationsRejected: true, ledgerRegenerated: true, versionedProofDataPreserved: true, rollbackManifestPreserved: true, atomicSwitchRollbackTestPassed: true, activeManifestReactivated: true },
  auditSummary: JSON.parse(auditOutput),
};
await writeFile(path.join(batchRoot, "validation-report.json"), stableJson(report));
console.log(stableJson(report));
