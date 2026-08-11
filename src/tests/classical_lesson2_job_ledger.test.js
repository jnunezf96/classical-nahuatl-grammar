"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run() {
    const s = createSuite("classical_lesson2_job_ledger");
    const atoms = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs", "ANDREWS_ATOM_LEDGER.json"),
        "utf8"
    ));
    const jobs = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs", "canvas-progress", "lesson2-job-ledger.json"),
        "utf8"
    ));
    const atomIdIndex = atoms.codebook.atomTuple.indexOf("atomId");
    const sectionIndex = atoms.codebook.atomTuple.indexOf("canvasSection");
    const lesson2Ids = atoms.atoms
        .filter(atom => /^§2(?:\.|$)/u.test(atom[sectionIndex]))
        .map(atom => atom[atomIdIndex]);
    const jobIds = jobs.records.map(record => record.atomId);

    s.eq("all Lesson 2 atoms receive one proposed job in Canvas order", {
        source: lesson2Ids.length,
        jobs: jobIds.length,
        unique: new Set(jobIds).size,
        sameOrder: JSON.stringify(lesson2Ids) === JSON.stringify(jobIds),
        unassigned: jobs.counts.unassignedJobs,
    }, {
        source: 539,
        jobs: 539,
        unique: 539,
        sameOrder: true,
        unassigned: 0,
    });

    s.eq("the complete direction assignment is explicit", jobs.counts.byDirectionClass, {
        WRITING_ONLY: 0,
        READING_ONLY: 140,
        BOTH: 399,
    });

    s.eq("all twelve reviewed Lesson 2 families are present", jobs.counts.byFamily, {
        "lesson2-sound-and-spelling": 246,
        "lesson2-internal-stem-boundaries": 12,
        "lesson2-syllables-and-supportive-i": 40,
        "lesson2-stress": 30,
        "lesson2-long-consonants": 34,
        "lesson2-progressive-assimilation": 21,
        "lesson2-regressive-assimilation-and-dissimilation": 62,
        "lesson2-consonant-loss": 33,
        "lesson2-other-consonant-changes": 36,
        "lesson2-vowel-elision": 11,
        "lesson2-long-vowel-to-glottal-stop": 6,
        "lesson2-sentence-prosody": 8,
    });

    s.eq("writing jobs state the behavior that the normal application must perform", jobs.records
        .filter(record => record.directionClass === "BOTH")
        .filter(record => !record.writingRole || !record.normalApplicationRequirement)
        .map(record => record.atomId), []);

    s.eq("reading-only jobs cannot claim Result-writing work", jobs.records
        .filter(record => record.directionClass === "READING_ONLY")
        .filter(record => record.writingRole || record.normalApplicationRequirement)
        .map(record => record.atomId), []);

    s.eq("every atom guides the reader without authorizing grammar", jobs.records
        .filter(record => !record.readerRequirement || record.evidenceAuthorizesGrammar !== false)
        .map(record => record.atomId), []);

    s.eq("all twelve user-approved families are accepted", {
        accepted: jobs.counts.acceptedJobs,
        pending: jobs.counts.pendingUserReview,
        acceptedFamilies: [...new Set(jobs.records
            .filter(record => record.acceptanceStatus === "ACCEPTED_JOB_NOT_YET_IMPLEMENTED")
            .map(record => record.jobFamily))],
        wrongStatus: jobs.records
            .filter(record => ![
                "ACCEPTED_JOB_NOT_YET_IMPLEMENTED",
                "PROPOSED_AWAITING_USER_REVIEW",
            ].includes(record.acceptanceStatus))
            .map(record => record.atomId),
    }, {
        accepted: 539,
        pending: 0,
        acceptedFamilies: [
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
        ],
        wrongStatus: [],
    });

    s.eq("implementation credit requires normal application and mutation observations", {
        writingJobs: jobs.counts.writingJobs,
        exactlyImplemented: jobs.counts.exactlyImplementedWritingJobs,
        awaiting: jobs.counts.writingJobsAwaitingExactObservation,
        creditedIds: jobs.records
            .filter(record => record.writingImplementationStatus
                === "EXACTLY_OBSERVED_NORMAL_APPLICATION_BEHAVIOR")
            .map(record => record.atomId),
        creditedWithoutProof: jobs.records
            .filter(record => record.writingImplementationStatus
                === "EXACTLY_OBSERVED_NORMAL_APPLICATION_BEHAVIOR")
            .filter(record => !record.observationKind
                || !record.observationTest
                || !record.mutationTest)
            .map(record => record.atomId),
    }, {
        writingJobs: 399,
        exactlyImplemented: 2,
        awaiting: 397,
        creditedIds: [
            "ACI-P039-L004-E7E01D8587-02",
            "ACI-P039-L004-E7E01D8587-03",
        ],
        creditedWithoutProof: [],
    });

    return s;
}

module.exports = { run };
