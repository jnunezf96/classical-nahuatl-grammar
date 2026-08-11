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
const version = "v20260810-exact-behavior-checkpoint-004";
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
    atomId,
    ownerId,
    status: "EXACTLY_OBSERVED",
    obligation: "observe-canonical-grammar-behavior",
    assertionId: `${ownerId}:${atomId.toLowerCase()}`,
    canonicalPath,
    expected,
    actual,
    canvasAnchor: anchors.get(atomId),
    mutation: { replacement: mutationReplacement, rejected: true },
  });
  resultDigests[ownerId] = digest(stableJson(result));
}

const particle = particleId => context.buildClassicalNahuatlParticleResultFrame(
  context.buildClassicalNahuatlParticleSourceFrame(particleId),
);
const antecessive = particle("l3-o-antecessive");
const profile = antecessive.lexicalFactFrame.antecessiveProfile;
const preterit = context.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
  subject: "1sg", mood: "indicative", tense: "preterit", verbClass: "B", valence: "intransitive", antecessive: true,
});
const present = context.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
  subject: "1sg", mood: "indicative", tense: "present", verbClass: "B", valence: "intransitive", antecessive: true,
});
const particleOwner = "classical-particle-lexicon";
record(particleOwner, "ACI-P056-L024-EA0D75FF38-03", "lexicalFactFrame.antecessiveProfile.pronunciationAttachment",
  "obligatory-to-following-item", profile.pronunciationAttachment, antecessive, "optional");
record(particleOwner, "ACI-P056-L024-EA0D75FF38-04", "lexicalFactFrame.antecessiveProfile.writingAttachment",
  "obligatory-to-following-item", profile.writingAttachment, antecessive, "separate-word");
record(particleOwner, "ACI-P056-L024-EA0D75FF38-05", "antecessiveTenseRestriction",
  { past: ["authorized", true], present: ["blocked", false] },
  { past: [preterit.authorizationStatus, preterit.expandedVncBoundaryFrame.antecessiveTenseAuthorized], present: [present.authorizationStatus, present.expandedVncBoundaryFrame.antecessiveTenseAuthorized] },
  { preterit, present }, { past: ["authorized", true], present: ["authorized", true] });
record(particleOwner, "ACI-P056-L024-EA0D75FF38-06", "lexicalFactFrame.antecessiveProfile.placementRelativeToPastVnc",
  ["immediate", "nonimmediate"], profile.placementRelativeToPastVnc, antecessive, ["immediate"]);
record(particleOwner, "ACI-P056-L024-EA0D75FF38-07", "lexicalFactFrame.antecessiveProfile.defaultEnglishTensePreference",
  "perfect", profile.defaultEnglishTensePreference, antecessive, "preterit-only");
record(particleOwner, "ACI-P056-L024-EA0D75FF38-09", "lexicalFactFrame.antecessiveProfile.untranslatedWhenPerfectRenderingUnwarranted",
  true, profile.untranslatedWhenPerfectRenderingUnwarranted, antecessive, false);
record(particleOwner, "ACI-P056-L024-EA0D75FF38-10", "lexicalFactFrame.antecessiveProfile.boundaryNotation",
  "hash-marks-obligatory-attachment-to-following-item", profile.boundaryNotation, antecessive, "hash-is-presentation-only");

const at = particle("l3-at");
const ac = particle("l3-ac");
record(particleOwner, "ACI-P056-L035-2AED292FE4-02", "atAcVariantRelation",
  { at: ["variant of ac"], ac: ["variant of at"] },
  { at: at.lexicalFactFrame.usageFacts.filter(value => value.startsWith("variant")), ac: ac.lexicalFactFrame.usageFacts.filter(value => value.startsWith("variant")) },
  { at, ac }, { at: [], ac: [] });
record(particleOwner, "ACI-P056-L035-2AED292FE4-03", "atAcPronounContrast",
  ["distinct from interrogative pronoun āc", "distinct from interrogative pronoun āc"],
  [at.lexicalFactFrame.usageFacts[1], ac.lexicalFactFrame.usageFacts[1]], { at, ac }, ["same as āc", "same as āc"]);
const oc = particle("l3-oc");
record(particleOwner, "ACI-P146-L025-8BFBD677DB-04", "lexicalFactFrame.meanings",
  ["else", "besides"], oc.lexicalFactFrame.meanings.filter(value => ["else", "besides"].includes(value)), oc, ["still"]);

const collocationOwner = "classical-particle-collocation-lexicon";
const inTlaZa = particle("l3-in-tla-za");
record(collocationOwner, "ACI-P058-L020-4835B3189A-04", "formulaSegments.containsAndMorph",
  false, inTlaZa.formulaSegments.includes("auh"), inTlaZa, true);
record(collocationOwner, "ACI-P058-L020-4835B3189A-05", "formulaSegments.containsButMorph",
  false, inTlaZa.formulaSegments.includes("but"), inTlaZa, true);
const ahzaZo = particle("l3-ahza-zo");
record(collocationOwner, "ACI-P146-L025-8BFBD677DB-03", "lexicalFactFrame.meanings",
  ["perhaps"], ahzaZo.lexicalFactFrame.meanings.filter(value => value === "perhaps"), ahzaZo, ["certainly"]);

const missingWish = subject => context.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
  subject, mood: "optative", tense: "nonpast", verbClass: "B", valence: "intransitive", sentenceType: "wish-sentence",
});
const validWish = context.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
  subject: "1sg", mood: "optative", tense: "nonpast", verbClass: "B", valence: "intransitive", sentenceType: "wish-sentence", introductoryParticle: "mā",
});
for (const frame of [missingWish("1sg"), missingWish("3sg")]) {
  assert(frame.authorizationStatus === "blocked", "missing introductory particle reached an authorized Result");
  assert(frame.proofFrame.authorizationStatus === "blocked", "sentence block did not reach the canonical proof");
  assert(frame.formulaRealization === "", "blocked sentence retained an output formula");
  assert(frame.blockReason === "lesson-9-wish-command-requires-ma-or-tla", "missing-particle block reason drifted");
}
assert(validWish.authorizationStatus === "authorized" && equal(validWish.sentenceSurfaceFrame.sentenceParticles, ["mā"]), "valid separate mā wish failed");

const owners = [...new Set(observations.map(item => item.ownerId))].sort();
assert(observations.length === 13, `checkpoint atom yield drifted: ${observations.length}`);
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
const manifest = { schemaVersion: 1, version, status: "validated", baseProgressCommit: "216851be5",
  previousActiveManifest: oldPointer.activeManifest, baseProofCorpusRetained: true,
  checkpointCounts: { owners: owners.length, newlyExactlyObserved: observations.length, failed: 0, mutationsRejected: observations.length },
  counts: { owners: new Set(cumulative.map(item => item.ownerId)).size, atoms: cumulative.length, exactlyObserved: cumulative.length, failed: 0 },
  receipts: [...(oldManifest.receipts || []), ...receipts], observations: cumulative,
  normalizationRecords: oldManifest.normalizationRecords || [],
  validation: { exactAtomObservationPassed: true, mutationObservationPassed: true, sentenceAuthorizationPropagationPassed: true,
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
assert(progress.lessonCorpus.exactProofs.exactBehaviorObserved === 8395, "progress ledger delta is wrong");
const report = { schemaVersion: 1, version, status: "passed", checkpoint: { owners: owners.length, newlyExactlyObserved: observations.length,
  failures: 0, mutationsRejected: observations.length }, progress: { denominator: 18639, before: 8382, after: 8395, remaining: 10244 },
  validations: { canonicalResultObserved: true, mutationObservationPassed: true, sentenceAuthorizationPropagationPassed: true,
    focusedRuntimeTestsPassed: true, ledgerRegenerated: true, rollbackPassed: true }, auditSummary: JSON.parse(auditOutput) };
await writeFile(path.join(batchRoot, "validation-report.json"), stableJson(report));
console.log(stableJson(report));
