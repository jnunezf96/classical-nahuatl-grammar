#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
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
const atlasPopulationPath = path.join(
  ROOT,
  "data",
  "classical_grammatical_atlas_population.mjs",
);
const atlasPopulationVersionPath = path.join(
  ROOT,
  "data",
  "classical_grammatical_atlas_population_version.mjs",
);
const atlasGeneratorPath = path.join(
  ROOT,
  "scripts",
  "build_classical_grammatical_atlas_population.mjs",
);
const publicationLockPath = path.join(
  ROOT,
  "data",
  ".classical_grammatical_atlas_publication.lock",
);
const publicationJournalPath = path.join(
  ROOT,
  "data",
  ".classical_grammatical_atlas_publication.journal.json",
);
const PUBLICATION_JOURNAL_KIND =
  "classical-grammatical-atlas-publication-journal";
const PUBLICATION_JOURNAL_SCHEMA_VERSION = 1;

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

const WRITING_PROJECT_ROLES = new Set([
  "canonical-rule-or-alternation",
  "applicability-or-constraint",
  "derived-realization",
  "source-structure-schema",
  "result-projection",
]);

function proposedDirection(atom, group = null) {
  if (Array.isArray(group?.writingAtomIds)) {
    return group.writingAtomIds.includes(atom.atomId) ? "BOTH" : "READING_ONLY";
  }
  if (lesson >= 7) {
    return WRITING_PROJECT_ROLES.has(atom.projectRole) ? "BOTH" : "READING_ONLY";
  }
  return atom.force === "grammar-bearing" ? "BOTH" : "READING_ONLY";
}

function proposedWritingJob(atom, group) {
  if (proposedDirection(atom, group) !== "BOTH") return "NOT_A_WRITING_JOB";
  if (group.writingJobsByCategory?.[atom.category]) {
    return group.writingJobsByCategory[atom.category];
  }
  if (lesson !== 3) return group.writingJob;
  if (atom.category === "LEX") return "SUPPLY_CANONICAL_PARTICLE_CHOICE_AND_MEANING";
  if (atom.category === "ALT") return "PRESERVE_A_LICENSED_ALTERNATIVE_WITHOUT_ASSUMING_WHO_CHOOSES";
  if (["CST", "DEP", "RUL", "REA", "SCH", "USE", "EXC"].includes(atom.category)) {
    return "ENFORCE_PARTICLE_STRUCTURE_PLACEMENT_OR_APPLICABILITY";
  }
  return group.writingJob;
}

function proposedReaderJob(atom) {
  const group = groupBySection.get(atom.canvasSection);
  if (group?.readerJobsByForce?.[atom.force]) {
    return group.readerJobsByForce[atom.force];
  }
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
    && (proposedDirection(atom, group) === "READING_ONLY" || Boolean(groupProof.writingTest));
  return {
    atomId: atom.atomId,
    canvasSection: atom.canvasSection,
    canvasSpan: atom.canvasSpan,
    meaning: atom.meaning,
    sourceForce: atom.force,
    sourceCategory: atom.category,
    sourceProjectRole: atom.projectRole,
    reviewGroupId: group.groupId,
    proposedDirection: proposedDirection(atom, group),
    proposedWritingJob: proposedWritingJob(atom, group),
    proposedReaderJob: proposedReaderJob(atom),
    proposedDecisionSplit: group.decisionSplit,
    proposedControlPolicy: group.controlPolicy,
    proposedUserChoiceJob: group.userChoiceJob || "NO_NEW_USER_CHOICE",
    proposedApplicationJob: group.applicationJob || group.writingJob,
    proposedDerivedCueJob: group.derivedCueJob || "PRESENT_ACCEPTED_AUTOMATIC_GRAMMAR_WITHOUT_AUTHORIZING_IT",
    reviewStatus: decision?.status || "AWAITING_USER_REVIEW",
    acceptedJob: decision?.status === "ACCEPTED" ? decision.acceptedJob || group.proposal : "",
    implementationCredit: proofAccepted ? "EXACTLY_OBSERVED" : "NONE_UNTIL_ACCEPTED_JOB_WORKS_AND_IS_EXACTLY_CHECKED",
    writingObservationTest: proofAccepted && proposedDirection(atom, group) === "BOTH"
      ? `${groupProof.writingTest}#${atom.atomId}`
      : "",
    writingMutationTest: proofAccepted && proposedDirection(atom, group) === "BOTH"
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
const packetText = `${packetLines.join("\n").trimEnd()}\n`;

function fileSnapshot(filePath) {
  const relativePath = path.relative(ROOT, filePath);
  if (!relativePath
    || relativePath.startsWith("..")
    || path.isAbsolute(relativePath)) {
    throw new Error(`Publication target leaves Web root: ${filePath}`);
  }
  const existed = fs.existsSync(filePath);
  return {
    relativePath,
    existed,
    contentsBase64: existed
      ? fs.readFileSync(filePath).toString("base64")
      : "",
  };
}

function fsyncDirectory(directoryPath) {
  let descriptor;
  try {
    descriptor = fs.openSync(directoryPath, "r");
    fs.fsyncSync(descriptor);
  } finally {
    if (descriptor !== undefined) fs.closeSync(descriptor);
  }
}

function writeFileDurably(filePath, contents, options = {}) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const descriptor = fs.openSync(
    filePath,
    options.flag || "w",
    options.mode || 0o644,
  );
  try {
    const buffer = Buffer.isBuffer(contents)
      ? contents
      : Buffer.from(String(contents), "utf8");
    fs.writeSync(descriptor, buffer, 0, buffer.length, 0);
    fs.fsyncSync(descriptor);
  } finally {
    fs.closeSync(descriptor);
  }
  fsyncDirectory(path.dirname(filePath));
}

function replaceFileAtomically(filePath, contents, options = {}) {
  const temporaryPath = `${filePath}.tmp-${process.pid}-${crypto.randomUUID()}`;
  try {
    writeFileDurably(temporaryPath, contents, options);
    fs.renameSync(temporaryPath, filePath);
    fsyncDirectory(path.dirname(filePath));
  } finally {
    if (fs.existsSync(temporaryPath)) fs.unlinkSync(temporaryPath);
  }
}

function removeFileDurably(filePath) {
  if (!fs.existsSync(filePath)) return;
  fs.unlinkSync(filePath);
  fsyncDirectory(path.dirname(filePath));
}

function restoreSnapshot(snapshot) {
  const filePath = path.resolve(ROOT, String(snapshot.relativePath || ""));
  const relativePath = path.relative(ROOT, filePath);
  if (!relativePath
    || relativePath.startsWith("..")
    || path.isAbsolute(relativePath)) {
    throw new Error("Publication journal target leaves Web root");
  }
  if (snapshot.existed === true) {
    replaceFileAtomically(
      filePath,
      Buffer.from(String(snapshot.contentsBase64 || ""), "base64"),
    );
  } else {
    removeFileDurably(filePath);
  }
}

function processIsAlive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return true;
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error?.code !== "ESRCH";
  }
}

function acquirePublicationLock() {
  fs.mkdirSync(path.dirname(publicationLockPath), { recursive: true });
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const token = crypto.randomUUID();
    const owner = {
      schemaVersion: 1,
      pid: process.pid,
      token,
      actor: "lesson-review",
      lesson,
      startedAt: new Date().toISOString(),
    };
    try {
      writeFileDurably(
        publicationLockPath,
        `${JSON.stringify(owner)}\n`,
        { flag: "wx", mode: 0o600 },
      );
      return () => {
        if (!fs.existsSync(publicationLockPath)) return;
        let current;
        try {
          current = JSON.parse(fs.readFileSync(publicationLockPath, "utf8"));
        } catch {
          return;
        }
        if (current.token === token) removeFileDurably(publicationLockPath);
      };
    } catch (error) {
      if (error?.code !== "EEXIST") throw error;
      let existing;
      try {
        existing = JSON.parse(fs.readFileSync(publicationLockPath, "utf8"));
      } catch {
        throw new Error(
          `Atlas publication lock exists and is unreadable: ${publicationLockPath}`,
        );
      }
      if (processIsAlive(Number(existing.pid))) {
        throw new Error(
          `Atlas publication lock is held by pid ${existing.pid} (${existing.actor || "unknown"})`,
        );
      }
      removeFileDurably(publicationLockPath);
    }
  }
  throw new Error("Atlas publication lock could not be acquired");
}

function validatePublicationJournal(journal) {
  if (journal?.schemaVersion !== PUBLICATION_JOURNAL_SCHEMA_VERSION
    || journal?.kind !== PUBLICATION_JOURNAL_KIND
    || path.resolve(journal.webRoot || "") !== path.resolve(ROOT)
    || !Array.isArray(journal.targets)
    || !Array.isArray(journal.stageRelativePaths)) {
    throw new Error("Atlas publication journal is unreadable; refusing unsafe recovery");
  }
  for (const relativePath of [
    ...journal.targets.map(target => target.relativePath),
    ...journal.stageRelativePaths,
  ]) {
    const resolved = path.resolve(ROOT, String(relativePath || ""));
    const relative = path.relative(ROOT, resolved);
    if (!relative || relative.startsWith("..") || path.isAbsolute(relative)) {
      throw new Error("Atlas publication journal contains an unsafe path");
    }
  }
}

function writePublicationJournal(journal) {
  replaceFileAtomically(
    publicationJournalPath,
    `${JSON.stringify(journal, null, 2)}\n`,
    { mode: 0o600 },
  );
}

function recoverPublicationJournal() {
  if (!fs.existsSync(publicationJournalPath)) return false;
  const journal = JSON.parse(fs.readFileSync(publicationJournalPath, "utf8"));
  validatePublicationJournal(journal);
  const failures = [];
  if (journal.phase !== "COMMITTED") {
    for (const snapshot of journal.targets) {
      try {
        restoreSnapshot(snapshot);
      } catch (error) {
        failures.push(`${snapshot.relativePath}: ${error.message}`);
      }
    }
  }
  for (const relativePath of journal.stageRelativePaths) {
    try {
      removeFileDurably(path.resolve(ROOT, relativePath));
    } catch (error) {
      failures.push(`${relativePath}: ${error.message}`);
    }
  }
  if (failures.length) {
    throw new Error([
      "Atlas publication journal recovery failed; journal was preserved.",
      ...failures,
    ].join("\n"));
  }
  removeFileDurably(publicationJournalPath);
  return true;
}

function maybeInjectPublicationFailure(publishedCount) {
  const caughtAt = Number(
    process.env.CLASSICAL_LESSON_REVIEW_TEST_FAIL_AFTER_PUBLISH || 0,
  );
  if (caughtAt === publishedCount) {
    throw new Error(`Injected publication failure after ${publishedCount} files`);
  }
  const crashAt = Number(
    process.env.CLASSICAL_LESSON_REVIEW_TEST_CRASH_AFTER_PUBLISH || 0,
  );
  if (crashAt === publishedCount) process.exit(86);
}

function rollbackPublication(journal, originalError) {
  const failures = [];
  for (const snapshot of journal.targets) {
    try {
      restoreSnapshot(snapshot);
    } catch (error) {
      failures.push(`${snapshot.relativePath}: ${error.message}`);
    }
  }
  for (const relativePath of journal.stageRelativePaths) {
    try {
      removeFileDurably(path.resolve(ROOT, relativePath));
    } catch (error) {
      failures.push(`${relativePath}: ${error.message}`);
    }
  }
  if (!failures.length) removeFileDurably(publicationJournalPath);
  if (failures.length) {
    throw new Error([
      originalError.message,
      "Rollback also failed; the durable journal was preserved:",
      ...failures,
    ].join("\n"));
  }
  throw originalError;
}

function writeReviewAndAtlasTransactionally() {
  if (!fs.existsSync(atlasGeneratorPath)) {
    throw new Error(
      `Missing Atlas generator: ${path.relative(path.dirname(ROOT), atlasGeneratorPath)}`,
    );
  }
  const releaseLock = acquirePublicationLock();
  try {
    recoverPublicationJournal();
    const transactionId = crypto.randomUUID();
    const targetPaths = [
      ledgerPath,
      packetPath,
      atlasPopulationPath,
      atlasPopulationVersionPath,
    ];
    const stagePaths = targetPaths.map(targetPath => (
      `${targetPath}.lesson-review-${transactionId}.tmp`
    ));
    const journal = {
      schemaVersion: PUBLICATION_JOURNAL_SCHEMA_VERSION,
      kind: PUBLICATION_JOURNAL_KIND,
      webRoot: path.resolve(ROOT),
      transactionId,
      actor: "lesson-review",
      lesson,
      phase: "PREPARING",
      targets: targetPaths.map(fileSnapshot),
      stageRelativePaths: stagePaths.map(stagePath => (
        path.relative(ROOT, stagePath)
      )),
    };
    writePublicationJournal(journal);
    try {
      writeFileDurably(stagePaths[0], ledgerText);
      writeFileDurably(stagePaths[1], packetText);
      const generated = spawnSync(process.execPath, [
        atlasGeneratorPath,
        "--write",
        "--self-test",
        "--web-root",
        ROOT,
        "--output",
        stagePaths[2],
        "--version-output",
        stagePaths[3],
        "--lesson-ledger-override",
        String(lesson),
        stagePaths[0],
      ], {
        cwd: path.dirname(atlasGeneratorPath),
        encoding: "utf8",
        maxBuffer: 16 * 1024 * 1024,
      });
      if (generated.error
        || generated.status !== 0
        || !fs.existsSync(stagePaths[2])
        || !fs.existsSync(stagePaths[3])) {
        throw new Error([
          "Atlas regeneration failed; Lesson review outputs were not kept.",
          generated.error?.message,
          generated.stderr,
          generated.stdout,
        ].filter(Boolean).join("\n"));
      }
      writePublicationJournal({
        ...journal,
        phase: "PUBLISHING",
      });
      targetPaths.forEach((targetPath, index) => {
        fs.renameSync(stagePaths[index], targetPath);
        fsyncDirectory(path.dirname(targetPath));
        maybeInjectPublicationFailure(index + 1);
      });
      writePublicationJournal({
        ...journal,
        phase: "COMMITTED",
      });
      if (process.env.CLASSICAL_LESSON_REVIEW_TEST_CRASH_AFTER_COMMIT_JOURNAL
        === "1") {
        process.exit(87);
      }
      removeFileDurably(publicationJournalPath);
    } catch (error) {
      try {
        rollbackPublication(journal, error);
      } catch (rollbackError) {
        throw rollbackError;
      }
    }
  } finally {
    releaseLock();
  }
}

if (write) {
  writeReviewAndAtlasTransactionally();
} else {
  process.stdout.write(ledgerText);
}
