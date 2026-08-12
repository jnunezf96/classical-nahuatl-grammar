#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const args = process.argv.slice(2);
const lessonIndex = args.indexOf("--lesson");
const lesson = Number(lessonIndex >= 0 ? args[lessonIndex + 1] : 0);
const write = args.includes("--write");

if (!Number.isInteger(lesson) || lesson < 1) {
  throw new Error("Use --lesson followed by a positive lesson number.");
}

const progressDirectory = path.join(ROOT, "docs", "canvas-progress");
const atomLedgerPath = path.join(ROOT, "docs", "ANDREWS_ATOM_LEDGER.json");
const planPath = path.join(progressDirectory, `lesson${lesson}-review-plan.json`);
const decisionsPath = path.join(progressDirectory, `lesson${lesson}-review-decisions.json`);
const ledgerPath = path.join(progressDirectory, `lesson${lesson}-review-ledger.json`);
const packetPath = path.join(progressDirectory, `lesson${lesson}-review-batches.md`);
const proofPath = path.join(progressDirectory, `lesson${lesson}-implementation-proof.json`);

for (const requiredPath of [atomLedgerPath, planPath, decisionsPath]) {
  if (!fs.existsSync(requiredPath)) {
    throw new Error(`Missing required input: ${path.relative(ROOT, requiredPath)}`);
  }
}

const atomLedger = JSON.parse(fs.readFileSync(atomLedgerPath, "utf8"));
const plan = JSON.parse(fs.readFileSync(planPath, "utf8"));
const decisions = JSON.parse(fs.readFileSync(decisionsPath, "utf8"));
const proof = fs.existsSync(proofPath)
  ? JSON.parse(fs.readFileSync(proofPath, "utf8"))
  : { lesson, groups: {} };

if (plan.lesson !== lesson || decisions.lesson !== lesson) {
  throw new Error("Lesson number does not match the review inputs.");
}

const columns = atomLedger.codebook.atomTuple;
const lessonPattern = new RegExp(`^§${lesson}(?:\\.|$)`, "u");
const atoms = atomLedger.atoms
  .map(tuple => Object.fromEntries(columns.map((column, index) => [column, tuple[index]])))
  .filter(atom => lessonPattern.test(atom.canvasSection));

const groupBySection = new Map();
for (const group of plan.groups) {
  if (!group.groupId || !Array.isArray(group.sections) || group.sections.length === 0) {
    throw new Error("Every review group needs an id and at least one section.");
  }
  for (const section of group.sections) {
    if (groupBySection.has(section)) {
      throw new Error(`Section ${section} occurs in more than one review group.`);
    }
    groupBySection.set(section, group);
  }
}

function proposedDirection(atom) {
  return atom.force === "grammar-bearing" ? "BOTH" : "READING_ONLY";
}

function proposedWritingJob(atom, group) {
  if (atom.force !== "grammar-bearing") return "NOT_A_WRITING_JOB";
  if (atom.category === "LEX") return "SUPPLY_CANONICAL_PARTICLE_CHOICE_AND_MEANING";
  if (atom.category === "ALT") return "PRESERVE_A_LICENSED_ALTERNATIVE_WITHOUT_ASSUMING_WHO_CHOOSES";
  if (["CST", "DEP", "RUL", "REA", "SCH", "USE", "EXC"].includes(atom.category)) {
    return "ENFORCE_PARTICLE_STRUCTURE_PLACEMENT_OR_APPLICABILITY";
  }
  return group.writingJob;
}

function proposedReaderJob(atom) {
  if (atom.force === "evidence") return "USE_AS_READING_OR_CHECKING_EVIDENCE_WITHOUT_AUTHORITY";
  if (atom.force === "documentary") return "PRESERVE_SOURCE_REFERENCE_WITHOUT_AUTHORITY";
  if (atom.force === "analysis") return "GUIDE_ANALYSIS_WITHOUT_AUTHORIZING_A_RESULT";
  return "GUIDE_READING_AND_INTERPRETATION";
}

const records = atoms.map(atom => {
  const group = groupBySection.get(atom.canvasSection);
  if (!group) throw new Error(`No Lesson ${lesson} review group covers ${atom.canvasSection}.`);
  const decision = decisions.decisions[group.groupId] || null;
  const groupProof = proof.groups?.[group.groupId] || null;
  const proofAccepted = decision?.status === "ACCEPTED"
    && groupProof?.status === "EXACTLY_OBSERVED"
    && Boolean(groupProof.readerTest)
    && (proposedDirection(atom) === "READING_ONLY" || Boolean(groupProof.writingTest));
  return {
    atomId: atom.atomId,
    canvasSection: atom.canvasSection,
    canvasSpan: atom.canvasSpan,
    meaning: atom.meaning,
    sourceForce: atom.force,
    sourceCategory: atom.category,
    reviewGroupId: group.groupId,
    proposedDirection: proposedDirection(atom),
    proposedWritingJob: proposedWritingJob(atom, group),
    proposedReaderJob: proposedReaderJob(atom),
    proposedDecisionSplit: group.decisionSplit,
    proposedControlPolicy: group.controlPolicy,
    reviewStatus: decision?.status || "AWAITING_USER_REVIEW",
    acceptedJob: decision?.status === "ACCEPTED" ? decision.acceptedJob || group.proposal : "",
    implementationCredit: proofAccepted ? "EXACTLY_OBSERVED" : "NONE_UNTIL_ACCEPTED_JOB_WORKS_AND_IS_EXACTLY_CHECKED",
    writingObservationTest: proofAccepted && proposedDirection(atom) === "BOTH"
      ? `${groupProof.writingTest}#${atom.atomId}`
      : "",
    writingMutationTest: proofAccepted && proposedDirection(atom) === "BOTH"
      ? `${groupProof.writingTest}#mutation:${atom.atomId}`
      : "",
    readerGuidanceIdeaId: proofAccepted ? group.groupId : "",
    readerObservationTest: proofAccepted
      ? `${groupProof.readerTest}#${atom.atomId}`
      : "",
    readerMutationTest: proofAccepted
      ? `${groupProof.readerTest}#mutation:${atom.atomId}`
      : "",
  };
});

const atomIds = records.map(record => record.atomId);
if (new Set(atomIds).size !== atomIds.length) throw new Error("Duplicate Lesson atom in review ledger.");

const groups = plan.groups.map((group, index) => {
  const groupRecords = records.filter(record => record.reviewGroupId === group.groupId);
  const decision = decisions.decisions[group.groupId] || null;
  return {
    groupNumber: index + 1,
    batchNumber: Math.floor(index / plan.groupsPerBatch) + 1,
    groupId: group.groupId,
    title: group.title,
    sections: group.sections,
    atomCount: groupRecords.length,
    proposedBoth: groupRecords.filter(record => record.proposedDirection === "BOTH").length,
    proposedReadingOnly: groupRecords.filter(record => record.proposedDirection === "READING_ONLY").length,
    proposal: group.proposal,
    writingJob: group.writingJob,
    readingJob: group.readingJob,
    decisionSplit: group.decisionSplit,
    controlPolicy: group.controlPolicy,
    reviewStatus: decision?.status || "AWAITING_USER_REVIEW",
    exactlyObserved: groupRecords.filter(record => record.implementationCredit === "EXACTLY_OBSERVED").length,
  };
});

const ledger = {
  schemaVersion: 1,
  kind: "classical-nahuatl-lesson-atom-job-review",
  lesson,
  source: "ANDREWS_TRANSCRIPTION_CANVAS.md",
  authority: {
    canvasAndAtomsAuthorizeGrammar: true,
    reviewLedgerAuthorizesGrammar: false,
    automationMayInventGrammar: false,
    implementationCreditRequiresAcceptedWorkingExactJob: true,
  },
  counts: {
    atoms: records.length,
    uniqueAtoms: new Set(atomIds).size,
    groups: groups.length,
    batches: Math.ceil(groups.length / plan.groupsPerBatch),
    proposedBoth: records.filter(record => record.proposedDirection === "BOTH").length,
    proposedReadingOnly: records.filter(record => record.proposedDirection === "READING_ONLY").length,
    acceptedAtoms: records.filter(record => record.reviewStatus === "ACCEPTED").length,
    declinedAtoms: records.filter(record => record.reviewStatus === "DECLINED").length,
    awaitingReview: records.filter(record => record.reviewStatus === "AWAITING_USER_REVIEW").length,
    implementationCredit: records.filter(record => record.implementationCredit === "EXACTLY_OBSERVED").length,
  },
  groups,
  records,
};

const packetLines = [
  `# Lesson ${lesson} atom-job review batches`,
  "",
  `All ${records.length} atoms are included exactly once. Unaccepted groups remain proposals; implementation credit appears only after accepted jobs pass their exact checks.`,
  "",
];
for (const group of groups) {
  packetLines.push(
    `## Batch ${group.batchNumber}, Group ${group.groupNumber}: ${group.title}`,
    "",
    `- Sections: ${group.sections.join(", ")}`,
    `- Atoms: ${group.atomCount}`,
    `- Proposed direction: ${group.proposedBoth} both; ${group.proposedReadingOnly} reading only`,
    `- Writing job: ${group.writingJob}`,
    `- Reading job: ${group.readingJob}`,
    `- User/application split: ${group.decisionSplit}`,
    `- Control policy: ${group.controlPolicy}`,
    `- Proposal: ${group.proposal}`,
    `- Status: ${group.reviewStatus}`,
    `- Exactly observed: ${group.exactlyObserved}/${group.atomCount}`,
    "",
  );
}

const ledgerText = `${JSON.stringify(ledger, null, 2)}\n`;
const packetText = `${packetLines.join("\n")}\n`;
if (write) {
  fs.writeFileSync(ledgerPath, ledgerText);
  fs.writeFileSync(packetPath, packetText);
} else {
  process.stdout.write(ledgerText);
}
