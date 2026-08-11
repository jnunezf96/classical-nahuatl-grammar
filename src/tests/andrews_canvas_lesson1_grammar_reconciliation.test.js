"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function loadJson(relativePath) {
    return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
}

function run() {
    const s = createSuite("andrews_canvas_lesson1_grammar_reconciliation");
    const atomLedger = loadJson("docs/ANDREWS_ATOM_LEDGER.json");
    const jobLedger = loadJson("docs/canvas-progress/lesson1-job-ledger.json");
    const fields = Object.fromEntries(
        atomLedger.codebook.atomTuple.map((field, index) => [field, index])
    );
    const grammarAtoms = atomLedger.atoms.filter(atom =>
        /^§1\./u.test(atom[fields.canvasSection])
        && atom[fields.force] === "grammar-bearing"
    );
    const jobs = new Map(jobLedger.records.map(record => [record.atomId, record]));
    const mapped = grammarAtoms.map(atom => jobs.get(atom[fields.atomId]));

    s.eq(
        "the current Lesson 1 grammar denominator is mapped exactly once",
        {
            required: grammarAtoms.length,
            mapped: mapped.filter(Boolean).length,
            unique: new Set(grammarAtoms.map(atom => atom[fields.atomId])).size,
            missing: grammarAtoms
                .filter(atom => !jobs.has(atom[fields.atomId]))
                .map(atom => atom[fields.atomId]),
        },
        { required: 307, mapped: 307, unique: 307, missing: [] }
    );

    const jobCounts = Object.fromEntries([
        "BUILD_GRAMMAR",
        "BUILD_CODE_MODEL",
        "CHECK_GRAMMAR",
        "PROTECT_GRAMMAR",
    ].map(jobType => [
        jobType,
        mapped.filter(record => record.jobType === jobType).length,
    ]));
    s.eq(
        "grammar atoms keep their exact current jobs",
        jobCounts,
        {
            BUILD_GRAMMAR: 113,
            BUILD_CODE_MODEL: 171,
            CHECK_GRAMMAR: 8,
            PROTECT_GRAMMAR: 15,
        }
    );

    s.eq(
        "every grammar atom has an owner and an exact observation",
        mapped
            .filter(record => !record.targetOwnerId
                || !record.observationKind
                || !record.observationTest
                || !record.mutationTest)
            .map(record => record.atomId),
        []
    );

    s.eq(
        "Lesson 1 grammar serves writing and reading without changing truth",
        mapped
            .filter(record => record.directionClass !== "BOTH"
                || !record.directions.includes("WRITING")
                || !record.directions.includes("READING_AND_INTERPRETATION"))
            .map(record => record.atomId),
        []
    );

    s.eq(
        "the job ledger covers the one complete Lesson 1 atom inventory",
        {
            atomCount: atomLedger.atoms.filter(atom =>
                /^§1\./u.test(atom[fields.canvasSection])
            ).length,
            jobCount: jobLedger.records.length,
            pending: jobLedger.counts.pendingJobs,
            unassigned: jobLedger.counts.unassignedJobs,
        },
        { atomCount: 854, jobCount: 854, pending: 0, unassigned: 0 }
    );

    return s;
}

module.exports = { run };
