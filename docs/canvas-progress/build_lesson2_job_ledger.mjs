#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const SOURCE_PATH = path.join(ROOT, "docs", "ANDREWS_ATOM_LEDGER.json");
const OUTPUT_PATH = path.join(ROOT, "docs", "canvas-progress", "lesson2-job-ledger.json");
const WRITE = process.argv.includes("--write");

const ACCEPTED_JOB_FAMILIES = new Set([
  "lesson2-sound-and-spelling",
  "lesson2-internal-stem-boundaries",
  "lesson2-syllables-and-supportive-i",
  "lesson2-stress",
  "lesson2-long-consonants",
  "lesson2-progressive-assimilation",
  "lesson2-regressive-assimilation-and-dissimilation",
  "lesson2-consonant-loss",
  "lesson2-other-consonant-changes",
  "lesson2-vowel-elision",
  "lesson2-long-vowel-to-glottal-stop",
  "lesson2-sentence-prosody",
]);

const EXACTLY_IMPLEMENTED_WRITING_ATOMS = Object.freeze({
  "ACI-P039-L004-E7E01D8587-02": Object.freeze({
    observationKind: "sigeme-retained-in-formula",
    observationTest: "src/tests/classical_lesson2_sigeme_result.test.js#normal-application",
    mutationTest: "src/tests/classical_lesson2_sigeme_result.test.js#mutation-pronounced-segment",
  }),
  "ACI-P039-L004-E7E01D8587-03": Object.freeze({
    observationKind: "sigeme-omitted-from-pronounced-result",
    observationTest: "src/tests/classical_lesson2_sigeme_result.test.js#normal-application",
    mutationTest: "src/tests/classical_lesson2_sigeme_result.test.js#mutation-pronounced-segment",
  }),
  ...Object.fromEntries([
    "ACI-P039-L008-483475B7F1",
    "ACI-P039-L009-12800DB414",
    "ACI-P039-L010-C014D0FE1B",
    "ACI-P039-L010-9ACAD2E5CB",
    "ACI-P039-L010-9ACAD2E5CB-02",
    "ACI-P039-L010-9ACAD2E5CB-03",
    "ACI-P039-L010-9ACAD2E5CB-04",
    "ACI-P039-L010-9ACAD2E5CB-05",
    "ACI-P043-L012-EBD20BB4BF",
    "ACI-P043-L013-3C5E09B768",
    "ACI-P043-L017-A663631D10",
    "ACI-P043-L022-3DBCFED63B",
    "ACI-P043-L024-287580F016",
    "ACI-P044-L032-7A11C5ED53",
    "ACI-P044-L033-7E95D05969",
    "ACI-P044-L035-6C0893B25C",
    "ACI-P044-L037-CD2F6CB119",
    "ACI-P045-L039-CE4CCD3E27",
    "ACI-P046-L006-9ACDEA625D",
  ].map(atomId => [atomId, Object.freeze({
    observationKind: "contextual-spelling-result",
    observationTest: `src/tests/classical_lesson2_contextual_spelling_jobs.test.js#${atomId}`,
    mutationTest: `src/tests/classical_lesson2_contextual_spelling_jobs.test.js#${atomId}-broken-spelling`,
  })])),
  ...Object.fromEntries([
    "ACI-P039-L003-5036476036",
    "ACI-P039-L004-897BE64FB1",
    "ACI-P039-L004-E7E01D8587",
    "ACI-P039-L007-2C1DE9E201",
    "ACI-P041-L033-5DC2501239",
    "ACI-P041-L033-DABD2BE51F",
    "ACI-P042-L022-D2C248195A",
    "ACI-P042-L027-CD2308A77F",
    "ACI-P043-L015-B702A24041",
    "ACI-P043-L027-98A44BD022",
    "ACI-P044-L030-6CCBCBA244",
    "ACI-P044-L031-9E6CE9402F",
    "ACI-P044-L041-AD9B08BD11",
    "ACI-P045-L030-2527A41ED4",
    "ACI-P045-L031-18802D0BDC",
    "ACI-P045-L032-B859BA5D79",
    "ACI-P045-L033-E0F5380BED",
  ].map(atomId => [atomId, Object.freeze({
    observationKind: "basic-inventory-spelling-result",
    observationTest: `src/tests/classical_lesson2_basic_spelling_jobs.test.js#${atomId}`,
    mutationTest: `src/tests/classical_lesson2_basic_spelling_jobs.test.js#${atomId}-broken-result`,
  })])),
});

const JOB_FAMILIES = Object.freeze([
  ["lesson2-sound-and-spelling", /^§2\.(?:(?:1|2|4)$|3(?:\.|$))/u],
  ["lesson2-internal-stem-boundaries", /^§2\.5$/u],
  ["lesson2-syllables-and-supportive-i", /^§2\.6(?:\.|$)/u],
  ["lesson2-stress", /^§2\.7$/u],
  ["lesson2-long-consonants", /^§2\.8$/u],
  ["lesson2-progressive-assimilation", /^§2\.(?:9$|10(?:\.|$))/u],
  ["lesson2-regressive-assimilation-and-dissimilation", /^§2\.11(?:\.|$)/u],
  ["lesson2-consonant-loss", /^§2\.12(?:\.|$)/u],
  ["lesson2-other-consonant-changes", /^§2\.13(?:\.|$)/u],
  ["lesson2-vowel-elision", /^§2\.14$/u],
  ["lesson2-long-vowel-to-glottal-stop", /^§2\.15$/u],
  ["lesson2-sentence-prosody", /^§2\.16$/u],
]);

// These statements teach pronunciation or interpretation but do not construct
// the written Result. Everything else that is grammar-bearing performs work in
// the writing system as well as helping the reader reverse that work.
const READING_ONLY_GRAMMAR_IDS = new Set([
  "ACI-P040-L015-292B034F76",
  "ACI-P040-L016-EF0B714C26",
  "ACI-P040-L017-6CAFD4507C",
  "ACI-P040-L020-601A8454A2",
  "ACI-P040-L021-F4AE95B8C8",
  "ACI-P040-L028-E5E4FA0E10",
  "ACI-P040-L028-A32E8D4B94",
  "ACI-P040-L028-A32E8D4B94-02",
  "ACI-P040-L029-D50AFEE57F",
  "ACI-P040-L040-05DFB02A6C",
  "ACI-P040-L040-05DFB02A6C-02",
  "ACI-P041-L018-BB55CC2F2F",
  "ACI-P041-L022-A623BC7669",
  "ACI-P042-L004-18E2C62565",
  "ACI-P042-L004-7521DE5E06",
  "ACI-P042-L008-52898F658F",
  "ACI-P042-L015-FE97A19365",
  "ACI-P042-L030-12C02AC2E2",
  "ACI-P042-L030-12C02AC2E2-02",
  "ACI-P042-L033-CB37BD327B-02",
  "ACI-P042-L033-CB37BD327B-03",
  "ACI-P042-L036-CE4E53CC74",
  "ACI-P043-L004-5EDD415D7E",
  "ACI-P043-L004-2F3D745824",
  "ACI-P043-L006-2B9B8DBEE8",
  "ACI-P043-L007-286B262319",
  "ACI-P043-L007-286B262319-02",
  "ACI-P043-L007-286B262319-03",
  "ACI-P043-L031-878278E713",
  "ACI-P043-L032-F7362249C5",
  "ACI-P043-L035-0303177562",
  "ACI-P043-L036-85CE4AA46C",
  "ACI-P043-L040-ED428953E9",
  "ACI-P044-L002-E6F700B460",
  "ACI-P044-L006-0810E3639E",
  "ACI-P044-L009-C82931EE62",
  "ACI-P044-L016-2945480AE5",
  "ACI-P044-L024-A8BA1A95C2",
  "ACI-P045-L002-361913A824",
  "ACI-P045-L003-7ADE7951E8",
  "ACI-P045-L004-BA52DFAA2C",
  "ACI-P045-L007-9384E589BA",
  "ACI-P045-L015-896059A9A2",
  "ACI-P045-L015-896059A9A2-02",
  "ACI-P045-L016-09ADD04091",
  "ACI-P045-L022-A48DEF25B1",
  "ACI-P045-L022-C7C6C233C1",
  "ACI-P047-L023-6987BF2E55",
  "ACI-P047-L043-BCEF23C063",
  "ACI-P048-L008-FBFB9145DF-11",
  "ACI-P048-L013-79A43748AD",
  "ACI-P048-L013-FA50C31933",
  "ACI-P053-L002-19416E3D57",
  "ACI-P053-L002-19416E3D57-02",
  "ACI-P053-L002-19416E3D57-03",
  "ACI-P053-L002-19416E3D57-04",
  "ACI-P053-L004-6D4437733A",
  "ACI-P053-L004-155CA2EB3B",
  "ACI-P053-L007-4C215DB435-02",
]);

const READING_ONLY_EVIDENCE_IDS = new Set([
  "ACI-P039-L015-D741EB618B-04",
  "ACI-P041-L034-73276DDFDA",
  "ACI-P042-L033-CB37BD327B-02",
  "ACI-P044-L024-A8BA1A95C2-02",
  "ACI-P043-L027-98A44BD022-03",
  "ACI-P043-L027-98A44BD022-05",
  "ACI-P047-L025-0BA41ED929",
  "ACI-P047-L026-2C813E6D9D",
  "ACI-P047-L027-21425C499E",
  "ACI-P047-L028-71941218CC",
  "ACI-P047-L029-67BFE31616",
  "ACI-P047-L030-9CFFA1787D",
  "ACI-P047-L031-68BAA8DE61",
  "ACI-P047-L032-888AA1454B",
  "ACI-P047-L033-641ED230F3",
  "ACI-P047-L034-DDB33A645F",
  "ACI-P047-L035-D2E2594088",
  "ACI-P047-L038-7FDC477D96",
  "ACI-P048-L008-FBFB9145DF",
  "ACI-P048-L008-FBFB9145DF-02",
  "ACI-P048-L008-FBFB9145DF-03",
  "ACI-P048-L008-FBFB9145DF-04",
  "ACI-P048-L008-FBFB9145DF-05",
  "ACI-P048-L008-FBFB9145DF-06",
  "ACI-P048-L008-FBFB9145DF-07",
  "ACI-P048-L008-FBFB9145DF-08",
  "ACI-P048-L008-FBFB9145DF-09",
  "ACI-P048-L008-FBFB9145DF-10",
]);

function jobFamily(section) {
  return JOB_FAMILIES.find(([, pattern]) => pattern.test(section))?.[0] || "";
}

function writingRole(atom) {
  if (atom.force === "documentary" || atom.force === "analysis") return "";
  if (READING_ONLY_GRAMMAR_IDS.has(atom.atomId)) return "";
  if (atom.force === "evidence") {
    return READING_ONLY_EVIDENCE_IDS.has(atom.atomId) ? "" : "CHECKS_WRITING_GRAMMAR";
  }
  if (atom.projectRole === "result-projection" || atom.projectRole === "derived-realization") {
    return "WRITES_OR_CONTROLS_RESULT";
  }
  if (atom.projectRole === "applicability-or-constraint") {
    return "ALLOWS_BLOCKS_OR_CONSTRAINS_WRITING";
  }
  return "BUILDS_WRITING_MODEL";
}

function writingRequirement(atom, role) {
  if (!role) return "";
  if (role === "CHECKS_WRITING_GRAMMAR") {
    return `Use this Canvas example to check the related Lesson 2 writing rule without allowing the example to invent the rule: ${atom.meaning}`;
  }
  return `The normal application path must perform or enforce this Lesson 2 requirement when it applies: ${atom.meaning}`;
}

function buildLedger() {
  const source = JSON.parse(fs.readFileSync(SOURCE_PATH, "utf8"));
  const columns = source.codebook.atomTuple;
  const atoms = source.atoms
    .map((tuple) => Object.fromEntries(columns.map((column, index) => [column, tuple[index]])))
    .filter((atom) => /^§2(?:\.|$)/u.test(atom.canvasSection));

  const records = atoms.map((atom) => {
    const family = jobFamily(atom.canvasSection);
    const role = writingRole(atom);
    if (!family) throw new Error(`No Lesson 2 family for ${atom.atomId}`);
    const exactImplementation = EXACTLY_IMPLEMENTED_WRITING_ATOMS[atom.atomId] || null;
    return {
      atomId: atom.atomId,
      canvasSection: atom.canvasSection,
      canvasSpan: atom.canvasSpan,
      meaning: atom.meaning,
      sourceForce: atom.force,
      sourceCategory: atom.category,
      jobFamily: family,
      directions: role ? ["WRITING", "READING_AND_INTERPRETATION"] : ["READING_AND_INTERPRETATION"],
      directionClass: role ? "BOTH" : "READING_ONLY",
      writingRole: role,
      readerInterpreterRole: "GUIDES_READER_AND_INTERPRETER",
      normalApplicationRequirement: writingRequirement(atom, role),
      readerRequirement: `Use this atom to guide pronunciation, reading, or interpretation without allowing the guidance to authorize the generated Result: ${atom.meaning}`,
      evidenceAuthorizesGrammar: false,
      writingImplementationStatus: exactImplementation
        ? "EXACTLY_OBSERVED_NORMAL_APPLICATION_BEHAVIOR"
        : role
          ? "ACCEPTED_JOB_NOT_YET_EXACTLY_OBSERVED"
          : "NOT_A_WRITING_JOB",
      observationKind: exactImplementation?.observationKind || "",
      observationTest: exactImplementation?.observationTest || "",
      mutationTest: exactImplementation?.mutationTest || "",
      acceptanceStatus: ACCEPTED_JOB_FAMILIES.has(family)
        ? "ACCEPTED_JOB_NOT_YET_IMPLEMENTED"
        : "PROPOSED_AWAITING_USER_REVIEW",
    };
  });

  const byDirectionClass = { WRITING_ONLY: 0, READING_ONLY: 0, BOTH: 0 };
  const byFamily = {};
  for (const record of records) {
    byDirectionClass[record.directionClass] += 1;
    byFamily[record.jobFamily] = (byFamily[record.jobFamily] || 0) + 1;
  }

  const acceptedJobs = records.filter((record) => (
    record.acceptanceStatus === "ACCEPTED_JOB_NOT_YET_IMPLEMENTED"
  )).length;
  const exactlyImplementedWritingJobs = records.filter((record) => (
    record.writingImplementationStatus
      === "EXACTLY_OBSERVED_NORMAL_APPLICATION_BEHAVIOR"
  )).length;

  return {
    schemaVersion: 1,
    kind: "classical-nahuatl-lesson2-atom-job-ledger",
    source: "ANDREWS_TRANSCRIPTION_CANVAS.md",
    rule: "Every Lesson 2 atom receives a proposed writing, reading, or both job before implementation.",
    counts: {
      lesson2Atoms: records.length,
      assignedJobs: records.length,
      acceptedJobs,
      pendingUserReview: records.length - acceptedJobs,
      unassignedJobs: records.filter((record) => !record.directionClass).length,
      writingJobs: records.filter((record) => Boolean(record.writingRole)).length,
      exactlyImplementedWritingJobs,
      writingJobsAwaitingExactObservation:
        records.filter((record) => Boolean(record.writingRole)).length
        - exactlyImplementedWritingJobs,
      byDirectionClass,
      byFamily,
    },
    invariants: {
      ledgerAuthorizesGrammar: false,
      evidenceAuthorizesGrammar: false,
      evidenceAbsenceBlocksGrammar: false,
      everyWritingJobRequiresNormalApplicationBehavior: true,
      everyAtomGuidesReadingOrChecksWriting: true,
      readerGuidanceDoesNotAuthorizeOrComposeResult: true,
      acceptedStatusRequiresUserReview: true,
    },
    records,
  };
}

const ledger = buildLedger();
const serialized = `${JSON.stringify(ledger, null, 2)}\n`;
if (WRITE) fs.writeFileSync(OUTPUT_PATH, serialized);
else process.stdout.write(serialized);
