#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "../..");
const checkOnly = process.argv.includes("--check");

const inputPaths = {
  canvas: "ANDREWS_TRANSCRIPTION_CANVAS.md",
  semanticLedger: "docs/ANDREWS_ATOM_SEMANTIC_SCOPE_AND_FORCE.json",
  proofMigration: "docs/ANDREWS_INDIVIDUAL_ATOM_PROOF_MIGRATION.json",
  applicationBridge: "docs/CLASSICAL_APPLICATION_AXIS_CANVAS_BRIDGE.json",
  applicationDispositions: "docs/CLASSICAL_APPLICATION_AXIS_DISPOSITIONS.json",
  proofRelease:
    "docs/proof-refresh/v20260810-shared-oracle-broad-completion/release-manifest.json",
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
const migration = await readJson(inputPaths.proofMigration);
const bridge = await readJson(inputPaths.applicationBridge);
const dispositions = await readJson(inputPaths.applicationDispositions);
const release = await readJson(inputPaths.proofRelease);
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

assert(uniqueAtomIds.size === atomIds.length, "semantic ledger contains duplicate atom IDs");
assert(semantic.counts.atoms === atomIds.length, "semantic atom count does not match records");
assert(classifiedAtoms.length === atomIds.length, "one or more atoms lack a recognized force");
assert(grammarAtoms.length === semantic.counts.grammarBearing, "grammar atom count drifted");
assert(nonGrammarAtoms.length === semantic.counts.evidence + semantic.counts.analysis + semantic.counts.documentary, "non-grammar atom count drifted");
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

const coveredZones = sourceZones.filter((zone) => zone.atomLedgerStatus === "complete");
const missingZones = sourceZones.filter((zone) => zone.atomLedgerStatus !== "complete");

const metrics = {
  fullCanvasSourceZones: ratio(coveredZones.length, sourceZones.length),
  lessonSourceZones: ratio(58, 58),
  lessonAtomization: ratio(atomIds.length, atomIds.length),
  lessonAtomForceClassification: ratio(classifiedAtoms.length, atomIds.length),
  lessonNonGrammarAccounting: ratio(nonGrammarAtoms.length, nonGrammarAtoms.length),
  lessonGrammarOwnerAndExactProof: ratio(retainedProofs + newProofs, grammarAtoms.length),
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

const strictComplete = missingZones.length === 0 && contractOnlyAxes.length === 0 && Object.values(metrics).every((metric) => metric.complete);

const report = {
  schemaVersion: 1,
  kind: "canvas-true-grammar-progress",
  status: strictComplete ? "complete" : "incomplete",
  strictComplete,
  measurementPolicy: {
    headline: "No weighted aggregate is permitted. Every applicable denominator is reported separately.",
    completionRule: "Strict completion requires full Canvas source-zone atomization, exhaustive force classification, typed owner assignment, exact owner-issued proof, application-axis classification, Canvas provenance for every genuine choice, and live declaration of every genuine choice.",
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
      total: retainedProofs + newProofs,
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
  return `# Canvas true grammar progress\n\nStrict completion: **${progress.strictComplete ? "YES" : "NO"}**.\n\nThis report deliberately has no weighted overall percentage. A high score in one layer cannot conceal a missing source zone, an unproved rule, or an undelivered genuine choice.\n\n## Current measurements\n\n| Denominator | Done | Total | Progress | Status |\n|---|---:|---:|---:|---|\n${rows.join("\n")}\n\n## What is genuinely complete\n\nLessons 1–58 have **${progress.lessonCorpus.atoms.atoms.toLocaleString("en-US")}** independently classified atoms. Their **${progress.lessonCorpus.atoms.grammarBearing.toLocaleString("en-US")}** grammar-bearing atoms reconcile to **${progress.lessonCorpus.exactProofs.total.toLocaleString("en-US")}** exact typed proof coordinates: ${progress.lessonCorpus.exactProofs.retainedCanonicalCoordinates.toLocaleString("en-US")} retained canonical coordinates plus ${progress.lessonCorpus.exactProofs.newIndividualAtomCoordinates.toLocaleString("en-US")} individual atom coordinates. Evidence (${progress.lessonCorpus.atoms.evidence.toLocaleString("en-US")}), analysis (${progress.lessonCorpus.atoms.analysis.toLocaleString("en-US")}), and documentary material (${progress.lessonCorpus.atoms.documentary.toLocaleString("en-US")}) are accounted for but never authorize or block grammar.\n\n## Full-Canvas scope blockers\n\nThe present atom denominator covers Lessons 1–58, not all source zones in the Canvas file. These zones need current atom-level ledgers before “all Canvas” can be claimed:\n\n${missing}\n\nThe ${progress.metrics.fullCanvasSourceZones.percent.toFixed(2)}% source-zone figure is structural coverage only; it is not atom-weighted and must not be presented as grammatical completion.\n\n## Genuine-choice delivery backlog\n\nAll ${progress.interaction.genuineChoiceCount} genuine application axes are classified and linked to Canvas. ${progress.interaction.liveDeclarationCount} are backed by live application declarations; ${progress.interaction.contractOnlyCount} remain contract-audited rather than live-declared:\n\n${backlog}\n\n## Completion rule\n\nStrict completion becomes true only when every Canvas source zone has an atom ledger, every grammar-bearing atom has a typed owner and exact owner-issued proof, every application axis is classified, and every genuine choice is live-declared. Derived, contextual, lexical, boundary-conditioned, evidential, and presentational facts must remain non-authoritative.\n`;
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

console.log(JSON.stringify({
  status: report.status,
  strictComplete: report.strictComplete,
  fullCanvasSourceZones: report.metrics.fullCanvasSourceZones,
  lessonGrammarOwnerAndExactProof: report.metrics.lessonGrammarOwnerAndExactProof,
  genuineChoiceLiveDeclarations: report.metrics.genuineChoiceLiveDeclarations,
  blockerCount: report.blockers.length,
}, null, 2));
