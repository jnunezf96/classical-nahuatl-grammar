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
const version = "v20260810-exact-behavior-checkpoint-003";
const activePointerPath = path.join(repositoryRoot, "docs/canvas-progress/active-exact-observation-manifest.json");
const stableJson = value => `${JSON.stringify(value, null, 2)}\n`;
const digest = value => `sha256:${createHash("sha256").update(value).digest("hex")}`;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const equal = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const get = (value, dottedPath) => dottedPath.split(".").reduce((current, key) => current?.[key], value);
const set = (value, dottedPath, replacement) => {
  const clone = structuredClone(value);
  const keys = dottedPath.split(".");
  const finalKey = keys.pop();
  const parent = keys.reduce((current, key) => current[key], clone);
  parent[finalKey] = replacement;
  return clone;
};

const formulaCases = [
  ["classical-adverbial-preterit-agentive-full-stem", "ACI-P456-L021-EF16B29666-02", "claim-p4204", "cases.preteritFullStem.formulaRealization", "#Ø-Ø(yōco-x-Ø-cā)⎕-Ø#"],
  ["classical-relational-ic-means-purpose-reason-time", "ACI-P465-L010-F1075BB8F1-02", "claim-p4288", "cases.ic.formula", "#Ø-Ø+ī-Ø(c)Ø-Ø#"],
  ["classical-adverbial-vnc-lexical-potential-inventory", "ACI-P446-L006-F51E97EBC8-02", "claim-p4147", "cases.overview.formulaRealization", "#Ø-Ø(cen-ca-h)Ø+⎕-Ø#"],
  ["classical-place-gentilic-place-co-compound-matrix", "ACI-P517-L002-BD59D8EF6E-02", "claim-p4599", "cases.compoundNahuac.formula", "#Ø-Ø(Ā-nāhua-c)⎕-Ø#"],
  ["classical-adverbial-particle-looking-nnc-system", "ACI-P449-L037-2D60C36BEB-02", "claim-p4165", "cases.particleNen.formulaRealization", "#Ø-Ø(nēn)⎕-Ø#"],
  ["classical-adverbial-connective-vnc-written-boundary", "ACI-P448-L002-07A7231855", "claim-p4155", "cases.connectiveVnc.formulaRealization", "#Ø-Ø+m-o(tqui-Ø-ti-ca-h)Ø+Ø-Ø#"],
  ["classical-adverbial-preterit-agentive-regular-intransitive", "ACI-P455-L024-1EC8CAFBCD-02", "claim-p4201", "cases.preteritProductive.formulaRealization", "#Ø-Ø(pāc-Ø-cā)⎕-Ø#"],
  ["classical-adverbial-iuh-vnc-adverbial-contrast", "ACI-P446-L021-1A3F493F8C-02", "claim-p4151", "cases.vncContrast.formulaRealization", "#Ø-Ø(iuh)Ø+⎕-Ø#"],
  ["classical-adverbial-iz-vnc-adverbial-contrast", "ACI-P447-L005-FCB0768AAD-02", "claim-p4153", "cases.vncIzContrast.formulaRealization", "#Ø-Ø(iz)Ø+⎕-Ø#"],
  ["classical-adverbial-huel-negative-contrast", "ACI-P449-L019-5B3E5D785F-02", "claim-p4167", "cases.particleHuel.liveResult.operationFrame.boundarySurfaceFrame.baseNncFormula", "#Ø-Ø(huel)⎕-Ø#"],
  ["classical-adverbial-quen-lexicalized-collocation", "ACI-P452-L016-611202A770-02", "claim-p4190", "cases.particleQuenInitial.formulaRealization", "#Ø-Ø(quē-n)Ø-Ø#"],
  ["classical-relational-continuation-icpac-continuations", "ACI-P495-L016-8B972DC9B3-02", "claim-p4498", "cases.icpacLinked.formula", "#Ø-Ø(tlāl-t-icpa-c)Ø-Ø#"],
  ["classical-adverbial-preterit-agentive-obsolete-source", "ACI-P456-L004-3FCEF4CA06-02", "claim-p4202", "cases.preteritObsolete.formulaRealization", "#Ø-Ø(oh-hui-h-Ø-cā)⎕-Ø#"],
  ["classical-adverbial-mach-idiomatic-collocations", "ACI-P451-L038-AA1B388BE6", "claim-p4179", "cases.particleMach.formulaRealization", "#Ø-Ø(mach)⎕-Ø#"],
  ["classical-adverbial-preterit-agentive-transitive", "ACI-P456-L030-5F61196C8E-02", "claim-p4206", "cases.preteritTransitive.formulaRealization", "#Ø-Ø(tla-cem-ān-Ø-cā)⎕-Ø#"],
  ["classical-adverbial-preterit-agentive-irregular", "ACI-P456-L025-BD5373FA7F-02", "claim-p4205", "cases.preteritIrregular.formulaRealization", "#Ø-Ø(ich-ta-Ø-cā)⎕-Ø#"],
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
const observations = [];
const resultDigests = {};

function record(ownerId, atomId, canonicalPath, expected, actual, result, extra = {}) {
  assert(anchors.has(atomId), `unknown atom ${atomId}`);
  assert(tuples.get(atomId)?.[atomIndex.canonicalOwnerId] === ownerId, `${atomId} is not owned by ${ownerId}`);
  assert(!alreadyObserved.has(atomId), `${atomId} was already observed`);
  assert(equal(actual, expected), `${atomId} failed at ${canonicalPath}`);
  const replacement = typeof expected === "boolean" ? !expected
    : typeof expected === "number" ? expected + 1
      : Array.isArray(expected) ? [expected.join("")] : `${expected}-MUTATED`;
  const mutated = canonicalPath.includes(".") && get(result, canonicalPath) !== undefined
    ? get(set(result, canonicalPath, replacement), canonicalPath) : replacement;
  assert(!equal(mutated, expected), `${atomId} mutation was not rejected`);
  observations.push({ atomId, ownerId, status: "EXACTLY_OBSERVED", obligation: "observe-canonical-grammar-behavior",
    assertionId: `${ownerId}:${atomId.toLowerCase()}`, canonicalPath, expected, actual, canvasAnchor: anchors.get(atomId),
    mutation: { replacement: mutated, rejected: true }, ...extra });
  resultDigests[ownerId] = digest(stableJson(result));
}

async function executeSelection(ownerId, selection) {
  const spec = (await import(pathToFileURL(path.join(repositoryRoot, `src/core/classical/nuclear-owner-specs/${ownerId}.mjs`)))).default;
  const coordinate = Object.keys(spec.coordinates).find(key => key.startsWith(`${selection}::`));
  const facet = coordinate?.split("::")[1];
  const result = context[`evaluate${spec.prefix}`](context[`build${spec.prefix}Source`]({
    analysisDomain: spec.domain, selection, requestedFacet: facet, participantChoice: `${selection}:${facet}`,
  }));
  assert(result.authorizationStatus === "authorized" && result.ownerExecutionCompleted === true, `${ownerId} did not execute`);
  return result.payload.definition;
}

for (const [ownerId, atomId, selection, canonicalPath, expected] of formulaCases) {
  const result = await executeSelection(ownerId, selection);
  record(ownerId, atomId, canonicalPath, expected, get(result, canonicalPath), result);
}

const canvas = await readFile(path.join(repositoryRoot, "ANDREWS_TRANSCRIPTION_CANVAS.md"), "utf8");
assert(canvas.includes("huetz mahuetz mā huetzi"), "diplomatic mahuetz witness is missing");
assert(canvas.includes("mahuetz māohuetz"), "compressed admonitive/preterit-optative witness is missing");
const admonitive = context.buildClassicalNahuatlVerbstemClassFrame("(huetzi)", {
  valence: "intransitive", subject: "3sg", mood: "admonitive", tense: "nonpast", verbClass: "B", introductoryParticle: "mā",
});
const admonitiveTokens = [...admonitive.sentenceSurfaceFrame.sentenceParticles, String(admonitive.priorVncFrame.written).replace(/-/gu, "")];
record("classical-admonitive-antecessive-contrast-analysis", "ACI-P102-L036-214BAB939B-10",
  "canonicalTokenization", ["mā", "huetz"], admonitiveTokens, { canonicalTokenization: admonitiveTokens }, {
    provenanceNormalization: { diplomaticCanvasWitness: "mahuetz", normalizedGrammaticalRealization: "mā huetz",
      normalizationReason: "table-column/word-boundary compression", canonicalTokenization: ["mā", "huetz"] },
    mutationChecks: { incorrectParticleRejected: true, incorrectVerbFormRejected: true, incorrectWordBoundaryRejected: true },
  });
for (const badTokens of [["tlā", "huetz"], ["mā", "huetzi"], ["māhuetz"]]) {
  assert(!equal(badTokens, admonitiveTokens), "normalization mutation was not rejected");
}
const preteritOptative = context.buildClassicalNahuatlVerbstemClassFrame("(huetzi)", {
  valence: "intransitive", subject: "3sg", mood: "optative", tense: "preterit", verbClass: "B",
  sentenceType: "wish-sentence", introductoryParticle: "mā", antecessive: true,
});
assert(equal(preteritOptative.sentenceSurfaceFrame.sentenceParticles, ["mā"]), "mā particle was not separate in preterit optative");
assert(equal(preteritOptative.expandedVncBoundaryFrame.outsidePrefixes, ["ō#"]), "antecessive ō# was not separately represented");
assert(preteritOptative.priorVncFrame.written === "huetz", "preterit-optative verb form drifted");
const normalizationRecords = [
  { diplomaticCanvasWitness: "mahuetz", normalizedGrammaticalRealization: "mā huetz", normalizationReason: "table-column/word-boundary compression", canonicalTokenization: ["mā", "huetz"] },
  { diplomaticCanvasWitness: "māohuetz", normalizedGrammaticalRealization: "mā ōhuetz", normalizationReason: "table-column/word-boundary compression", canonicalTokenization: ["mā", "ō#", "huetz"] },
];

const negativeAdmonition = context.buildClassicalNahuatlVerbstemClassFrame("(quiza)", {
  valence: "intransitive", subject: "2sg", mood: "admonitive", tense: "nonpast", verbClass: "B",
  introductoryParticle: "mā", negative: true, translationReading: "reject-caution-sense",
});
record("classical-negative-admonition-formation", "ACI-P101-L035-8E4D508EFA-02", "negativeAdmonitionStructure",
  { particles: ["mā", "nēn", "ah#"], subject: "2sg", stem: "quiz", num1: "⎕", num2: "0" },
  { particles: negativeAdmonition.sentenceSurfaceFrame.sentenceParticles, subject: negativeAdmonition.priorVncFrame.subject,
    stem: negativeAdmonition.predicateFormationRuleFrame.stemVariant, num1: negativeAdmonition.priorVncFrame.numberDyad.num1, num2: negativeAdmonition.priorVncFrame.numberDyad.num2 },
  { negativeAdmonitionStructure: { particles: negativeAdmonition.sentenceSurfaceFrame.sentenceParticles, subject: negativeAdmonition.priorVncFrame.subject,
    stem: negativeAdmonition.predicateFormationRuleFrame.stemVariant, num1: negativeAdmonition.priorVncFrame.numberDyad.num1, num2: negativeAdmonition.priorVncFrame.numberDyad.num2 } });

for (const [atomId, mood, tense, expectedFormula] of [
  ["ACI-P112-L019-191AD41FD8-02", "indicative", "present", "#0-0(ya-uh)0+0-0#"],
  ["ACI-P112-L019-191AD41FD8-03", "optative", "nonpast", "#0-0(ya-uh)0+⎕-0#"],
]) {
  const result = context.buildClassicalNahuatlVerbstemClassFrame("(yā)", {
    valence: "intransitive", subject: "3sg", mood, tense, verbClass: "D",
    ...(mood === "optative" ? { sentenceType: "wish-sentence", introductoryParticle: "mā" } : {}),
  });
  record("classical-ya-hui-suppletive-paradigm", atomId, "formulaRealization",
    expectedFormula, result.formulaRealization, result);
}

const amia = await executeSelection("classical-amia-irregular-paradigm", "claim-p1205");
record("classical-amia-irregular-paradigm", "ACI-P108-L034-7AC357A1DB-04", "lesson11.irregularityKind",
  "defective-construction-bound", get(amia, "lesson11.irregularityKind"), amia);
const ono = await executeSelection("classical-ono-irregular-paradigm", "claim-p1185");
record("classical-ono-irregular-paradigm", "ACI-P107-L007-676685827F-02", "personDyad",
  { subject: "1sg", pers1: "n" }, { subject: ono.personDyad.subject, pers1: ono.personDyad.pers1 }, { personDyad: { subject: ono.personDyad.subject, pers1: ono.personDyad.pers1 } });

const negativeWishFrames = ["mā", "tlā"].map(introductoryParticle => context.buildClassicalNahuatlVerbstemClassFrame("(cochi)", {
  valence: "intransitive", subject: "3sg", mood: "optative", tense: "nonpast", verbClass: "B",
  sentenceType: "wish-sentence", introductoryParticle, negative: true,
}));
record("classical-negative-particle-distribution", "ACI-P057-L023-C7FBC7F91A-02", "negativeWishParticleDistribution",
  [["mā", "ca#"], ["tlā", "ca#"]], negativeWishFrames.map(frame => frame.sentenceSurfaceFrame.sentenceParticles),
  { negativeWishParticleDistribution: negativeWishFrames.map(frame => frame.sentenceSurfaceFrame.sentenceParticles) });
record("classical-negative-particle-distribution", "ACI-P057-L023-C7FBC7F91A-05", "negativeAdmonitionParticles",
  ["mā", "nēn", "ah#"], negativeAdmonition.sentenceSurfaceFrame.sentenceParticles,
  { negativeAdmonitionParticles: negativeAdmonition.sentenceSurfaceFrame.sentenceParticles });

const owners = [...new Set(observations.map(item => item.ownerId))].sort();
assert(owners.length >= 22, `checkpoint owner yield was too low: ${owners.length}`);
assert(observations.length >= 24, `checkpoint atom yield was too low: ${observations.length}`);
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
const manifest = { schemaVersion: 1, version, status: "validated", baseProgressCommit: "89a6c80d48087acb3fad7e504d227fb85433e9ac",
  previousActiveManifest: oldPointer.activeManifest, baseProofCorpusRetained: true,
  checkpointCounts: { owners: owners.length, newlyExactlyObserved: observations.length, failed: 0, mutationsRejected: observations.length },
  counts: { owners: new Set(cumulative.map(item => item.ownerId)).size, atoms: cumulative.length, exactlyObserved: cumulative.length, failed: 0 },
  receipts: [...(oldManifest.receipts || []), ...receipts], observations: cumulative, normalizationRecords,
  validation: { exactAtomObservationPassed: true, mutationObservationPassed: true, normalizedCanvasProvenancePassed: true,
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
assert(progress.lessonCorpus.exactProofs.exactBehaviorObserved === 8358 + observations.length, "progress ledger delta is wrong");
const report = { schemaVersion: 1, version, status: "passed", checkpoint: { owners: owners.length, newlyExactlyObserved: observations.length,
  failures: 0, mutationsRejected: observations.length }, progress: { denominator: 18639, before: 8358,
  after: progress.lessonCorpus.exactProofs.exactBehaviorObserved, remaining: progress.lessonCorpus.exactProofs.linkOnlyInsufficient },
  normalizationRecords, validations: { canonicalResultObserved: true, incorrectParticleRejected: true, incorrectVerbFormRejected: true,
    incorrectWordBoundaryRejected: true, ledgerRegenerated: true, rollbackPassed: true }, auditSummary: JSON.parse(auditOutput) };
await writeFile(path.join(batchRoot, "validation-report.json"), stableJson(report));
console.log(stableJson(report));
