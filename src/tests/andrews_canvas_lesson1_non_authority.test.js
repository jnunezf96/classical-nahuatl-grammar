"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function loadJson(relativePath) {
    return JSON.parse(fs.readFileSync(path.join(ROOT, relativePath), "utf8"));
}

function run() {
    const s = createSuite("andrews_canvas_lesson1_non_authority");
    const atomLedger = loadJson("docs/ANDREWS_ATOM_LEDGER.json");
    const jobLedger = loadJson("docs/canvas-progress/lesson1-job-ledger.json");
    const fields = Object.fromEntries(
        atomLedger.codebook.atomTuple.map((field, index) => [field, index])
    );
    const nonGrammarAtoms = atomLedger.atoms.filter(atom =>
        /^§1\./u.test(atom[fields.canvasSection])
        && atom[fields.force] !== "grammar-bearing"
    );
    const jobByAtomId = new Map(
        jobLedger.records.map(record => [record.atomId, record])
    );
    const mapped = nonGrammarAtoms.map(atom => jobByAtomId.get(atom[fields.atomId]));

    s.eq(
        "all current Lesson 1 non-grammar atoms have one current job",
        {
            atoms: nonGrammarAtoms.length,
            mapped: mapped.filter(Boolean).length,
            unique: new Set(nonGrammarAtoms.map(atom => atom[fields.atomId])).size,
            missing: nonGrammarAtoms
                .filter(atom => !jobByAtomId.has(atom[fields.atomId]))
                .map(atom => atom[fields.atomId]),
        },
        { atoms: 547, mapped: 547, unique: 547, missing: [] }
    );

    const forceCounts = Object.fromEntries(
        ["evidence", "analysis", "documentary"].map(force => [
            force,
            nonGrammarAtoms.filter(atom => atom[fields.force] === force).length,
        ])
    );
    s.eq(
        "the current split-atom force counts replace the obsolete passage counts",
        forceCounts,
        { evidence: 138, analysis: 337, documentary: 72 }
    );

    s.eq(
        "evidence checks grammar but never becomes grammar authority",
        mapped
            .filter(record => record.sourceForce === "evidence")
            .filter(record => record.jobType !== "CHECK_GRAMMAR")
            .map(record => record.atomId),
        []
    );

    s.eq(
        "non-grammar atoms never claim to write grammar",
        mapped
            .filter(record => record.jobType === "BUILD_GRAMMAR")
            .map(record => record.atomId),
        []
    );

    s.eq(
        "every non-grammar atom can guide reading without authorizing a Result",
        mapped
            .filter(record => !record.directions.includes(
                "READING_AND_INTERPRETATION"
            ) || record.readerInterpreterRole
                !== "GUIDES_READER_AND_INTERPRETER")
            .map(record => record.atomId),
        []
    );

    return s;
}

module.exports = { run };
