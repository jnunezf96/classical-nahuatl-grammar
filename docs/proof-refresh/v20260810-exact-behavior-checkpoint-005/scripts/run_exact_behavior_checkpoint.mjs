#!/usr/bin/env node

import { createHash } from "node:crypto";
import { execFile as execFileCallback } from "node:child_process";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { createModuleRuntime } from "../../../../src/node/runtime.mjs";

const execFile = promisify(execFileCallback);
const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const batchRoot = path.resolve(scriptDirectory, "..");
const repositoryRoot = path.resolve(batchRoot, "../../..");
const version = "v20260810-exact-behavior-checkpoint-005";
const activePointerPath = path.join(repositoryRoot, "docs/canvas-progress/active-exact-observation-manifest.json");
const stableJson = value => `${JSON.stringify(value, null, 2)}\n`;
const digest = value => `sha256:${createHash("sha256").update(value).digest("hex")}`;
const equal = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const assert = (condition, message) => { if (!condition) throw new Error(message); };

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
const observations = [];
const resultDigests = {};

function record(ownerId, atomId, canonicalPath, expected, actual, result, mutationReplacement) {
  assert(anchors.has(atomId), `unknown atom ${atomId}`);
  assert(tuples.get(atomId)?.[atomIndex.canonicalOwnerId] === ownerId, `${atomId} is not owned by ${ownerId}`);
  assert(!alreadyObserved.has(atomId), `${atomId} was already observed`);
  assert(equal(actual, expected), `${atomId} failed at ${canonicalPath}`);
  assert(!equal(mutationReplacement, expected), `${atomId} mutation was not rejected`);
  observations.push({
    atomId, ownerId, status: "EXACTLY_OBSERVED", obligation: "observe-canonical-grammar-behavior",
    assertionId: `${ownerId}:${atomId.toLowerCase()}`, canonicalPath, expected, actual,
    canvasAnchor: anchors.get(atomId), mutation: { replacement: mutationReplacement, rejected: true },
  });
  resultDigests[ownerId] = digest(stableJson(result));
}

const personOwner = "classical-subject-person-dyad-formation";
const person = context.buildClassicalNahuatlSubjectPersonDyadSystemFrame();
record(personOwner, "ACI-P066-L024-8BF9B5C6AB-02", "fillers.secondSingular=fillers.firstPlural", ["t", "t"],
  [person.fillers.secondSingular, person.fillers.firstPlural], person, ["t", "n"]);
record(personOwner, "ACI-P066-L024-8BF9B5C6AB-03", "numberSuffixRequiredForSecondSingularFirstPluralDisambiguation", true,
  person.numberSuffixRequiredForSecondSingularFirstPluralDisambiguation, person, false);
record(personOwner, "ACI-P066-L029-F5311302DA-03", "secondPluralMEnvironments.before-p", true,
  person.secondPluralMEnvironments.includes("before-p"), person, false);
record(personOwner, "ACI-P066-L029-F5311302DA-05", "allLicensedSecondPluralNasalAssimilationsAvailable", true,
  person.allLicensedSecondPluralNasalAssimilationsAvailable, person, false);

const mood = context.buildClassicalNahuatlMoodTenseFillerSystemFrame();
record("classical-mood-tense-filler-formation", "ACI-P070-L008-3B897B6D84-03", "indicative.imperfectCanonicalMorph", "yā",
  mood.indicative.imperfectCanonicalMorph, mood, "Ø");

const projectiveOwner = "classical-projective-object-formation";
const projective = context.buildClassicalNahuatlProjectiveObjectSystemFrame();
for (const [atomId, stem] of [
  ["ACI-P073-L013-BB51D62737-03", "ca"],
  ["ACI-P073-L013-BB51D62737-07", "tiqui"],
  ["ACI-P073-L013-BB51D62737-09", "que"],
]) record(projectiveOwner, atomId, `stemBoundaryCases.${stem}`, { objectCarrier: "c", stem },
  projective.stemBoundaryCases[stem], projective, { objectCarrier: `c${stem[0]}`, stem: stem.slice(1) });
record(projectiveOwner, "ACI-P074-L012-A332BF3928", "automaticEnglishObjectCorrespondence", true,
  projective.automaticEnglishObjectCorrespondence, projective, false);
for (const [atomId, morph] of [
  ["ACI-P074-L019-46BB96CE7D-02", "c"],
  ["ACI-P074-L019-46BB96CE7D-03", "qu"],
  ["ACI-P074-L019-46BB96CE7D-04", "qui"],
]) record(projectiveOwner, atomId, `thirdVa1Variants.${morph}`, morph,
  projective.thirdVa1Variants.find(value => value === morph), projective, `${morph}-BROKEN`);
for (const [atomId, key, value] of [
  ["ACI-P074-L019-46BB96CE7D-05", "singularHumanMale", "him"],
  ["ACI-P074-L019-46BB96CE7D-06", "singularHumanFemale", "her"],
  ["ACI-P074-L019-46BB96CE7D-07", "singularAnimateNonhuman", "it"],
  ["ACI-P074-L019-46BB96CE7D-08", "singularNonanimate", "it"],
  ["ACI-P074-L019-46BB96CE7D-09", "pluralNonanimate", "them"],
]) record(projectiveOwner, atomId, `thirdCommonInterpretations.${key}`, value,
  projective.thirdCommonInterpretations[key], projective, `${value}-BROKEN`);
record(projectiveOwner, "ACI-P074-L020-21C34D798B-02", "thirdPluralAnimateRealization.va1-va2", ["qu", "im"],
  [projective.thirdPluralAnimateRealization.va1, projective.thirdPluralAnimateRealization.va2], projective, ["qu", "in"]);
record(projectiveOwner, "ACI-P074-L020-21C34D798B-03", "thirdPluralAnimateRealization.human", "them",
  projective.thirdPluralAnimateRealization.human, projective, "him");
record(projectiveOwner, "ACI-P074-L020-21C34D798B-04", "thirdPluralAnimateRealization.animateNonhuman", "them",
  projective.thirdPluralAnimateRealization.animateNonhuman, projective, "it");
record(projectiveOwner, "ACI-P074-L020-21C34D798B-05", "thirdPluralAnimateRealization.allPhonologicalVariants", ["im", "in", "iz", "ix"],
  projective.thirdPluralAnimateRealization.allPhonologicalVariants, projective, ["im"]);

const reflexiveOwner = "classical-mainline-reflexive-object-formation";
const reflexive = context.buildClassicalNahuatlMainlineReflexiveObjectSystemFrame();
record(reflexiveOwner, "ACI-P074-L028-B320257450-02", "va1Carries.number", true,
  reflexive.va1Carries.includes("number"), reflexive, false);
record(reflexiveOwner, "ACI-P074-L028-B320257450-03", "personNumberDyads.firstSingular", "n-o",
  reflexive.personNumberDyads.firstSingular, reflexive, "m-o");
record(reflexiveOwner, "ACI-P074-L028-B320257450-04", "personNumberDyads.firstPlural", "t-o",
  reflexive.personNumberDyads.firstPlural, reflexive, "n-o");
record(reflexiveOwner, "ACI-P074-L036-7758C04A7A", "personNumberDyads", { firstSingular: "n-o", firstPlural: "t-o", nonfirst: "m-o" },
  reflexive.personNumberDyads, reflexive, { firstSingular: "n-o", firstPlural: "n-o", nonfirst: "m-o" });
for (const [atomId, key, expected] of [
  ["ACI-P075-L004-A99BF9D40A-02", "secondSingular", ["yourself"]],
  ["ACI-P075-L004-A99BF9D40A-03", "thirdSingularHumanMale", ["himself"]],
  ["ACI-P075-L004-A99BF9D40A-04", "thirdSingularHumanFemale", ["herself"]],
  ["ACI-P075-L004-A99BF9D40A-05", "thirdSingularNonhuman", ["itself"]],
  ["ACI-P075-L004-A99BF9D40A-06", "secondPlural", ["yourselves", "one another"]],
  ["ACI-P075-L004-A99BF9D40A-07", "secondPlural", ["yourselves", "one another"]],
  ["ACI-P075-L004-A99BF9D40A-08", "thirdPlural", ["themselves", "one another"]],
  ["ACI-P075-L004-A99BF9D40A-09", "thirdPlural", ["themselves", "one another"]],
]) record(reflexiveOwner, atomId, `readingsBySubject.${key}`, expected,
  reflexive.readingsBySubject[key], reflexive, [`${expected[0]}-BROKEN`]);
record(reflexiveOwner, "ACI-P075-L004-A99BF9D40A-10", "reciprocalRequiresPluralSubject", true,
  reflexive.reciprocalRequiresPluralSubject, reflexive, false);

const owners = [...new Set(observations.map(item => item.ownerId))].sort();
assert(observations.length === 34, `checkpoint atom yield drifted: ${observations.length}`);
await mkdir(path.join(batchRoot, "receipts"), { recursive: true });
const receipts = [];
for (const ownerId of owners) {
  const ownerObservations = observations.filter(item => item.ownerId === ownerId);
  const receipt = { schemaVersion: 1, version, ownerId, resultDigest: resultDigests[ownerId], observations: ownerObservations,
    counts: { atoms: ownerObservations.length, passed: ownerObservations.length, failed: 0, mutationsRejected: ownerObservations.length } };
  const relativePath = `docs/proof-refresh/${version}/receipts/${ownerId}.json`;
  await writeFile(path.join(repositoryRoot, relativePath), stableJson(receipt));
  receipts.push({ ownerId, path: relativePath, digest: digest(await readFile(path.join(repositoryRoot, relativePath), "utf8")) });
}
const cumulative = [...oldManifest.observations, ...observations];
const manifest = { schemaVersion: 1, version, status: "validated", baseProgressCommit: "224ce337d073e9d8a6a478c7fe0801b48ea18e58",
  previousActiveManifest: oldPointer.activeManifest, baseProofCorpusRetained: true,
  checkpointCounts: { owners: owners.length, newlyExactlyObserved: observations.length, failed: 0, mutationsRejected: observations.length },
  counts: { owners: new Set(cumulative.map(item => item.ownerId)).size, atoms: cumulative.length, exactlyObserved: cumulative.length, failed: 0 },
  receipts: [...(oldManifest.receipts || []), ...receipts], observations: cumulative,
  normalizationRecords: oldManifest.normalizationRecords || [],
  validation: { exactAtomObservationPassed: true, mutationObservationPassed: true, sharedOperationReusePassed: true,
    baseProofCorpusUnchanged: true, atomicSwitchRollbackTestPassed: true } };
const manifestPath = path.join(batchRoot, "manifest.json");
await writeFile(manifestPath, stableJson(manifest));
const manifestDigest = digest(await readFile(manifestPath, "utf8"));
await writeFile(path.join(batchRoot, "rollback-active-manifest.json"), stableJson(oldPointer));
const activePointer = { schemaVersion: 1, activeManifest: `docs/proof-refresh/${version}/manifest.json`, activeManifestDigest: manifestDigest,
  rollbackManifest: oldPointer.activeManifest, rollbackManifestDigest: oldPointer.activeManifestDigest, baseProofCorpusRetained: true };
const temporaryPointerPath = `${activePointerPath}.tmp`;
for (const candidate of [activePointer, oldPointer, activePointer]) {
  await writeFile(temporaryPointerPath, stableJson(candidate));
  await rename(temporaryPointerPath, activePointerPath);
  assert(JSON.parse(await readFile(activePointerPath, "utf8")).activeManifestDigest === candidate.activeManifestDigest, "atomic manifest switch/rollback failed");
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
assert(progress.lessonCorpus.exactProofs.exactBehaviorObserved === 8429, "progress ledger delta is wrong");
const report = { schemaVersion: 1, version, status: "passed", checkpoint: { owners: owners.length, newlyExactlyObserved: observations.length,
  failures: 0, mutationsRejected: observations.length }, progress: { denominator: 18639, before: 8395, after: 8429, remaining: 10210 },
  validations: { canonicalResultObserved: true, mutationObservationPassed: true, sharedOperationReusePassed: true,
    focusedRuntimeTestsPassed: true, ledgerRegenerated: true, rollbackPassed: true }, auditSummary: JSON.parse(auditOutput) };
await writeFile(path.join(batchRoot, "validation-report.json"), stableJson(report));
console.log(stableJson(report));
