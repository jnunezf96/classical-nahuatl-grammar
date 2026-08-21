#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { buildAuthoritativeAtomLedger } from "./build_authoritative_atom_ledger.mjs";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "../..");
const checkOnly = process.argv.includes("--check");

const inputPaths = {
  canvas: "ANDREWS_TRANSCRIPTION_CANVAS.md",
  semanticLedger: "docs/ANDREWS_ATOM_SEMANTIC_SCOPE_AND_FORCE.json",
  atomUiReconciliation: "docs/CLASSICAL_CANVAS_ATOM_UI_RECONCILIATION.json",
  proofMigration: "docs/ANDREWS_INDIVIDUAL_ATOM_PROOF_MIGRATION.json",
  applicationDispositions: "docs/CLASSICAL_APPLICATION_AXIS_DISPOSITIONS.json",
  proofRelease:
    "docs/proof-refresh/v20260810-shared-oracle-broad-completion/release-manifest.json",
  activeExactObservationPointer:
    "docs/canvas-progress/active-exact-observation-manifest.json",
};

const outputPaths = {
  json: "docs/CANVAS_TRUE_GRAMMAR_PROGRESS.json",
  markdown: "docs/CANVAS_TRUE_GRAMMAR_PROGRESS.md",
};

const sourceZones = [
  ...Array.from({ length: 58 }, (_, index) => ({
    id: `lesson-${index + 1}`,
    label: `Lesson ${index + 1}`,
    kind: "lesson",
    atomLedgerStatus: "complete",
  })),
  { id: "front-matter", label: "Front matter", kind: "non-lesson", atomLedgerStatus: "missing" },
  { id: "appendix-a", label: "Appendix A", kind: "non-lesson", atomLedgerStatus: "missing" },
  { id: "appendix-b", label: "Appendix B", kind: "non-lesson", atomLedgerStatus: "missing" },
  { id: "appendix-c", label: "Appendix C", kind: "non-lesson", atomLedgerStatus: "missing" },
  { id: "appendix-d", label: "Appendix D", kind: "non-lesson", atomLedgerStatus: "missing" },
  { id: "appendix-e", label: "Appendix E", kind: "non-lesson", atomLedgerStatus: "missing" },
  { id: "appendix-f", label: "Appendix F", kind: "non-lesson", atomLedgerStatus: "missing" },
  { id: "suggested-reading", label: "Suggested Reading", kind: "non-lesson", atomLedgerStatus: "missing" },
];

const sha256 = (text) => `sha256:${createHash("sha256").update(text).digest("hex")}`;
const ratio = (numerator, denominator) => ({
  numerator,
  denominator,
  percent: denominator === 0 ? null : Number(((numerator / denominator) * 100).toFixed(2)),
  complete: numerator === denominator,
});

async function readJson(relativePath) {
  return JSON.parse(await readFile(path.join(repositoryRoot, relativePath), "utf8"));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const semantic = await readJson(inputPaths.semanticLedger);
const atomUi = await readJson(inputPaths.atomUiReconciliation);
const migration = await readJson(inputPaths.proofMigration);
const dispositions = await readJson(inputPaths.applicationDispositions);
const bridge = dispositions.canvasProvenance;
const release = await readJson(inputPaths.proofRelease);
const exactObservationPointer = await readJson(inputPaths.activeExactObservationPointer);
const exactObservationManifest = await readJson(exactObservationPointer.activeManifest);
const canvas = await readFile(path.join(repositoryRoot, inputPaths.canvas), "utf8");

for (let lesson = 1; lesson <= 58; lesson += 1) {
  assert(new RegExp(`(?:LESSON|Lesson)\\s*${lesson}(?:\\D|$)`, "u").test(canvas), `Canvas is missing Lesson ${lesson}`);
}
for (const appendix of ["A", "B", "C", "D", "E", "F"]) {
  assert(new RegExp(`APPENDIX\\s+${appendix}(?:\\D|$)`, "iu").test(canvas), `Canvas is missing Appendix ${appendix}`);
}
assert(/Suggested Reading/u.test(canvas), "Canvas is missing Suggested Reading");

const atomIds = semantic.atoms.map((atom) => atom.atomId);
const uniqueAtomIds = new Set(atomIds);
const validForces = new Set(["grammar-bearing", "evidence", "analysis", "documentary"]);
const classifiedAtoms = semantic.atoms.filter((atom) => validForces.has(atom.force));
const grammarAtoms = semantic.atoms.filter((atom) => atom.force === "grammar-bearing");
const nonGrammarAtoms = semantic.atoms.filter((atom) => atom.force !== "grammar-bearing");
const atomTupleFields = atomUi.codebooks.atomTuple;
const atomTupleIndex = Object.fromEntries(atomTupleFields.map((field, index) => [field, index]));
const grammarAtomTuples = atomUi.atoms.filter((tuple) => tuple[atomTupleIndex.force] === "grammar-bearing");
const retainedCanonicalProofTuples = grammarAtomTuples.filter(
  (tuple) => tuple[atomTupleIndex.proofCoordinateKind] === "retained-existing-canonical-proof",
);
const assertionProofTuples = grammarAtomTuples.filter(
  (tuple) => tuple[atomTupleIndex.proofCoordinateKind] === "non-generative-individual-atom-assertion",
);
const behaviorRequiredRoles = new Map([
  ["canonical-rule-or-alternation", "perform-canonical-operation-or-alternation"],
  ["derived-realization", "derive-canonical-realization"],
  ["result-projection", "project-canonical-result"],
  ["applicability-or-constraint", "enforce-applicability-or-constraint"],
  ["source-structure-schema", "construct-or-validate-typed-source-structure"],
  ["read-only-grammar-fact", "supply-or-present-exact-grammar-fact-or-explanation"],
]);
const refreshedExactAtomIds = new Set(
  exactObservationManifest.observations
    .filter((observation) => observation.status === "EXACTLY_OBSERVED")
    .map((observation) => observation.atomId),
);
const insufficientAssertionTuples = assertionProofTuples.filter(
  (tuple) => behaviorRequiredRoles.has(tuple[atomTupleIndex.uiRole])
    && !refreshedExactAtomIds.has(tuple[atomTupleIndex.atomId]),
);

assert(uniqueAtomIds.size === atomIds.length, "semantic ledger contains duplicate atom IDs");
assert(semantic.counts.atoms === atomIds.length, "semantic atom count does not match records");
assert(classifiedAtoms.length === atomIds.length, "one or more atoms lack a recognized force");
assert(grammarAtoms.length === semantic.counts.grammarBearing, "grammar atom count drifted");
assert(nonGrammarAtoms.length === semantic.counts.evidence + semantic.counts.analysis + semantic.counts.documentary, "non-grammar atom count drifted");
assert(grammarAtomTuples.length === grammarAtoms.length, "atom UI grammar denominator drifted");
assert(retainedCanonicalProofTuples.length + assertionProofTuples.length === grammarAtoms.length, "proof coordinate accounting drifted");
assert(insufficientAssertionTuples.length + refreshedExactAtomIds.size === assertionProofTuples.length, "an assertion atom lacks an exact project-role classification");
assert(semantic.invariants.evidenceAbsenceBlocksGeneration === false, "evidence absence must not block generation");
assert(semantic.invariants.typedGrammarAuthorizesUnlistedRealizations === true, "typed grammar must authorize unlisted realizations");

const lessonRows = new Map();
for (const atom of semantic.atoms) {
  const match = /^§(\d+)(?:\.|$)/u.exec(atom.belongsTo);
  assert(match, `atom ${atom.atomId} is outside the current Lessons 1-58 ledger`);
  const lesson = Number(match[1]);
  assert(lesson >= 1 && lesson <= 58, `atom ${atom.atomId} has invalid lesson ${lesson}`);
  const row = lessonRows.get(lesson) ?? {
    lesson,
    totalAtoms: 0,
    grammarBearing: 0,
    evidence: 0,
    analysis: 0,
    documentary: 0,
  };
  row.totalAtoms += 1;
  row[atom.force === "grammar-bearing" ? "grammarBearing" : atom.force] += 1;
  lessonRows.set(lesson, row);
}
assert(lessonRows.size === 58, "not all 58 lessons occur in the atom ledger");

const classifiedApplicationAxes = dispositions.entries.filter((entry) => entry.status === "classified");
const genuineAxes = dispositions.entries.filter((entry) => entry.semanticFactRole === "genuine-user-choice");
const liveAxes = genuineAxes.filter((entry) => entry.roleEvidenceKind === "live-application-declaration");
const contractOnlyAxes = genuineAxes.filter((entry) => entry.roleEvidenceKind === "canonical-owner-contract-audit");

assert(bridge.counts.interactiveAxisCount === genuineAxes.length, "genuine choice denominator drifted");
assert(bridge.counts.mappedAxisCount === genuineAxes.length, "not every genuine choice has Canvas provenance");
assert(classifiedApplicationAxes.length === dispositions.entries.length, "an application axis is unresolved");
assert(release.counts.grammarAtomCount === grammarAtoms.length, "proof release grammar denominator drifted");
assert(release.counts.failureCount === 0, "active proof release contains failures");
assert(release.validations.basePlusOverrideRegistryComplete === true, "proof registry is incomplete");
assert(release.validations.section7_9CanaryPassed === true, "section 7.9 canary failed");

const newProofs = migration.counts.newIndividualAtomProofs;
const retainedProofs = grammarAtoms.length - newProofs;
assert(newProofs === 13292, "individual atom proof migration count drifted");
assert(retainedProofs === 5347, "retained exact proof count drifted");
assert(retainedCanonicalProofTuples.length === retainedProofs, "retained canonical proof records drifted");
assert(assertionProofTuples.length === newProofs, "non-generative assertion records drifted");
assert(exactObservationManifest.status === "validated", "active exact-observation manifest is not validated");
assert(exactObservationManifest.counts.failed === 0, "active exact-observation manifest contains failures");
assert(
  sha256(await readFile(path.join(repositoryRoot, exactObservationPointer.activeManifest), "utf8"))
    === exactObservationPointer.activeManifestDigest,
  "active exact-observation manifest digest drifted",
);

const coveredZones = sourceZones.filter((zone) => zone.atomLedgerStatus === "complete");
const missingZones = sourceZones.filter((zone) => zone.atomLedgerStatus !== "complete");

const metrics = {
  fullCanvasSourceZones: ratio(coveredZones.length, sourceZones.length),
  lessonSourceZones: ratio(58, 58),
  lessonAtomization: ratio(atomIds.length, atomIds.length),
  lessonAtomForceClassification: ratio(classifiedAtoms.length, atomIds.length),
  lessonNonGrammarAccounting: ratio(nonGrammarAtoms.length, nonGrammarAtoms.length),
  lessonGrammarOwnerLinked: ratio(grammarAtomTuples.length, grammarAtoms.length),
  lessonGrammarExactBehaviorObserved: ratio(
    retainedCanonicalProofTuples.length + refreshedExactAtomIds.size,
    grammarAtoms.length,
  ),
  applicationAxisClassification: ratio(classifiedApplicationAxes.length, dispositions.entries.length),
  genuineChoiceCanvasProvenance: ratio(bridge.counts.mappedAxisCount, bridge.counts.interactiveAxisCount),
  genuineChoiceLiveDeclarations: ratio(liveAxes.length, genuineAxes.length),
  genuineChoiceBrowserDeliveryProof: {
    numerator: null,
    denominator: genuineAxes.length,
    percent: null,
    complete: false,
    status: "not-measured",
  },
};

const strictComplete = missingZones.length === 0 && insufficientAssertionTuples.length === 0 && contractOnlyAxes.length === 0 && Object.values(metrics).every((metric) => metric.complete);

const report = {
  schemaVersion: 1,
  kind: "canvas-true-grammar-progress",
  status: strictComplete ? "complete" : "incomplete",
  strictComplete,
  measurementPolicy: {
    headline: "No weighted aggregate is permitted. Every applicable denominator is reported separately.",
    completionRule: "Strict completion requires full Canvas source-zone atomization, exhaustive force classification, and an atom-specific test that observes the atom's real project job: performing, deriving, projecting, enforcing, constructing, validating, controlling a genuine choice, or supplying an exact grammar fact or explanation. An owner link, file, label, semantic assertion, or existence test is insufficient.",
    grammarAuthority: "Only typed grammar owners authorize results. Canvas atoms supply specification and provenance.",
    evidencePolicy: "Evidence neither authorizes grammar nor blocks a result when absent.",
    uiPolicy: "Only genuine grammatical choices become controls; derived, contextual, lexical, boundary-conditioned, evidence, and presentation facts do not.",
  },
  metrics,
  sourceScope: {
    zones: sourceZones,
    missingZoneIds: missingZones.map((zone) => zone.id),
    warning: "The 28,540-atom denominator is exhaustive for Lessons 1-58 only. It is not a full-Canvas denominator until the eight non-lesson zones have current atom ledgers.",
  },
  lessonCorpus: {
    atoms: semantic.counts,
    exactProofs: {
      retainedCanonicalCoordinates: retainedProofs,
      newIndividualAtomCoordinates: newProofs,
      exactBehaviorObserved: retainedCanonicalProofTuples.length + refreshedExactAtomIds.size,
      linkOnlyInsufficient: insufficientAssertionTuples.length,
      totalOwnerLinked: retainedProofs + newProofs,
      activeExactObservationManifest: exactObservationPointer.activeManifest,
      refreshedExactAtomCount: refreshedExactAtomIds.size,
      executionObligations: Object.fromEntries(
        [...behaviorRequiredRoles].map(([uiRole, requiredBehavior]) => [uiRole, {
          requiredBehavior,
          linkOnlyInsufficient: insufficientAssertionTuples.filter(
            (tuple) => tuple[atomTupleIndex.uiRole] === uiRole,
          ).length,
        }]),
      ),
    },
    proofRelease: {
      version: release.version,
      ownerCount: release.counts.ownerCount,
      replayedOwnerCount: release.counts.replayedOwnerCount,
      failureCount: release.counts.failureCount,
      section7_9CanaryPassed: release.validations.section7_9CanaryPassed,
    },
    byLesson: [...lessonRows.values()].sort((a, b) => a.lesson - b.lesson),
  },
  interaction: {
    allAxes: dispositions.counts,
    genuineChoiceCount: genuineAxes.length,
    liveDeclarationCount: liveAxes.length,
    contractOnlyCount: contractOnlyAxes.length,
    contractOnlyBacklog: contractOnlyAxes.map(({ atomId, operationId, axisId }) => ({ atomId, operationId, axisId })),
  },
  blockers: [
    ...missingZones.map((zone) => ({ kind: "missing-source-zone-ledger", id: zone.id, label: zone.label })),
    ...contractOnlyAxes.map((entry) => ({ kind: "genuine-choice-not-live-declared", id: entry.atomId, operationId: entry.operationId, axisId: entry.axisId })),
    ...insufficientAssertionTuples.map((tuple) => ({
      kind: "atom-link-without-exact-canonical-behavior-proof",
      id: tuple[atomTupleIndex.atomId],
      canonicalOwnerId: tuple[atomTupleIndex.canonicalOwnerId],
      uiRole: tuple[atomTupleIndex.uiRole],
      requiredBehavior: behaviorRequiredRoles.get(tuple[atomTupleIndex.uiRole]),
    })),
    { kind: "missing-per-axis-browser-delivery-proof-registry", id: "genuine-choice-browser-delivery-proof", axisCount: genuineAxes.length },
  ],
  inputDigests: Object.fromEntries(
    await Promise.all(Object.entries(inputPaths).map(async ([key, relativePath]) => [key, sha256(await readFile(path.join(repositoryRoot, relativePath), "utf8"))])),
  ),
};

function markdown(progress) {
  const rows = Object.entries(progress.metrics).map(([name, metric]) =>
    `| ${name} | ${metric.numerator ?? "not measured"} | ${metric.denominator} | ${metric.percent === null ? "not measured" : `${metric.percent.toFixed(2)}%`} | ${metric.status ?? (metric.complete ? "complete" : "incomplete")} |`,
  );
  const missing = progress.sourceScope.zones.filter((zone) => zone.atomLedgerStatus !== "complete").map((zone) => `- ${zone.label}`).join("\n");
  const backlog = progress.interaction.contractOnlyBacklog.map((entry) => `- \`${entry.operationId}\` / \`${entry.axisId}\``).join("\n");
  return [
    "# Canvas true grammar progress",
    "",
    `Strict completion: **${progress.strictComplete ? "YES" : "NO"}**.`,
    "",
    "This report deliberately has no weighted overall percentage. An atom-to-owner link does not count as exact behavior.",
    "",
    "## Current measurements",
    "",
    "| Denominator | Done | Total | Progress | Status |",
    "|---|---:|---:|---:|---|",
    ...rows,
    "",
    "## Exact behavior rule",
    "",
    `Lessons 1–58 contain **${progress.lessonCorpus.atoms.grammarBearing.toLocaleString("en-US")}** grammar-bearing atoms. All have owner links, but only **${progress.lessonCorpus.exactProofs.exactBehaviorObserved.toLocaleString("en-US")}** currently have an acceptable exact-behavior observation.`,
    "",
    `The remaining **${progress.lessonCorpus.exactProofs.linkOnlyInsufficient.toLocaleString("en-US")}** use non-generative assertion coordinates where the canonical engine must instead be observed performing, deriving, projecting, enforcing, constructing, or validating the atom-specific behavior.`,
    "",
    "A legitimately read-only grammar fact may remain non-generative only when a test observes its exact typed value. Evidence, analysis, and documentary material never authorize or block grammar.",
    "",
    "## Full-Canvas scope blockers",
    "",
    "The present atom denominator covers Lessons 1–58, not all source zones in the Canvas file:",
    "",
    missing,
    "",
    `The ${progress.metrics.fullCanvasSourceZones.percent.toFixed(2)}% source-zone figure is structural only; it is not grammatical completion.`,
    "",
    "## Genuine-choice delivery backlog",
    "",
    `All ${progress.interaction.genuineChoiceCount} genuine application axes are classified and linked to Canvas. ${progress.interaction.liveDeclarationCount} are live-declared; ${progress.interaction.contractOnlyCount} remain contract-audited:`,
    "",
    backlog,
    "",
    "## Completion rule",
    "",
    "Strict completion requires an atom-specific test to observe the canonical engine performing or enforcing every executable grammar contribution. Owner linkage, copied expectations, and non-generative assertions cannot satisfy that obligation.",
    "",
  ].join("\n");
}

const serializedJson = `${JSON.stringify(report, null, 2)}\n`;
const serializedMarkdown = markdown(report);

for (const [kind, relativePath] of Object.entries(outputPaths)) {
  const expected = kind === "json" ? serializedJson : serializedMarkdown;
  const absolutePath = path.join(repositoryRoot, relativePath);
  if (checkOnly) {
    const actual = await readFile(absolutePath, "utf8");
    assert(actual === expected, `${relativePath} is stale; regenerate it`);
  } else {
    await writeFile(absolutePath, expected);
  }
}

await buildAuthoritativeAtomLedger({ checkOnly });

console.log(JSON.stringify({
  status: report.status,
  strictComplete: report.strictComplete,
  fullCanvasSourceZones: report.metrics.fullCanvasSourceZones,
  lessonGrammarOwnerLinked: report.metrics.lessonGrammarOwnerLinked,
  lessonGrammarExactBehaviorObserved: report.metrics.lessonGrammarExactBehaviorObserved,
  genuineChoiceLiveDeclarations: report.metrics.genuineChoiceLiveDeclarations,
  blockerCount: report.blockers.length,
}, null, 2));
