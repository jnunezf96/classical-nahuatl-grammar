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
        READING_ONLY: 155,
        BOTH: 384,
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

    s.eq("every atom job names who decides and keeps user input open", jobs.records
        .filter(record => !record.decisionOwner
            || typeof record.userInterferenceRequired !== "boolean"
            || !record.uiControlPolicy
            || record.openInputPolicy !== "ACCEPT_ANY_USER_SUPPLIED_FORM")
        .map(record => record.atomId), []);

    s.eq("only genuine Canvas-licensed alternatives request user interference in this batch", jobs.records
        .filter(record => record.userInterferenceRequired === true)
        .map(record => record.atomId), [
        "ACI-P050-L022-A33747C200",
        "ACI-P050-L025-12876984C1",
        "ACI-P050-L027-6ECB43F0B4",
        "ACI-P050-L031-20EA88210A",
        "ACI-P050-L033-8ED17977BE",
        "ACI-P050-L035-9EFC19B9DD",
        "ACI-P051-L024-FA7BB4A79C",
        "ACI-P052-L010-C54302F544",
        "ACI-P052-L014-75267806EC",
        "ACI-P052-L017-66E82EE5B5",
        "ACI-P052-L020-B62AAD1010",
    ]);

    s.eq("the reviewed UI decisions distinguish choice from application duty", [
        "ACI-P047-L009-EF940827EC",
        "ACI-P048-L017-C013C1931E",
        "ACI-P052-L038-6C1A02F633",
    ].map(atomId => {
        const record = jobs.records.find(candidate => candidate.atomId === atomId);
        return [record.decisionOwner, record.uiControlPolicy];
    }), [
        ["USER_ONLY_IF_APPLICATION_DOES_NOT_KNOW", "SHOW_ONLY_FOR_UNKNOWN_INITIAL_I_SOURCE"],
        ["USER_PRONUNCIATION_CONTEXT", "READING_OR_PRONUNCIATION_VIEW_ONLY"],
        ["APPLICATION_AFTER_USER_SUPPLIES_STRUCTURE", "REUSE_OPEN_COMPOUND_EMBED_AND_MATRIX_INPUTS"],
    ]);

    s.eq("all twelve user-approved families are accepted", {
        accepted: jobs.counts.acceptedJobs,
        pending: jobs.counts.pendingUserReview,
        acceptedFamilies: [...new Set(jobs.records
            .filter(record => [
              "ACCEPTED_JOB_NOT_YET_IMPLEMENTED",
              "ACCEPTED_AND_EXACTLY_IMPLEMENTED",
            ].includes(record.acceptanceStatus))
            .map(record => record.jobFamily))],
        wrongStatus: jobs.records
            .filter(record => ![
              "ACCEPTED_JOB_NOT_YET_IMPLEMENTED",
              "ACCEPTED_AND_EXACTLY_IMPLEMENTED",
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
        creditedWithoutProof: jobs.records
            .filter(record => record.writingImplementationStatus
                === "EXACTLY_OBSERVED_NORMAL_APPLICATION_BEHAVIOR")
            .filter(record => !record.observationKind
                || !record.observationTest
                || !record.mutationTest)
            .map(record => record.atomId),
    }, {
        writingJobs: 384,
        exactlyImplemented: 384,
        awaiting: 0,
        creditedWithoutProof: [],
    });

    return s;
}

module.exports = { run };
