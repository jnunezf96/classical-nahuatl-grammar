"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run() {
    const s = createSuite("classical_lessons1_58_minimal_run_ledger");
    const root = path.resolve(__dirname, "..", "..");
    const ledgerText = fs.readFileSync(path.join(
        root, "docs", "canvas-progress", "lessons1_58-minimal-run-ledger.md",
    ), "utf8");
    const atomLedger = JSON.parse(fs.readFileSync(path.join(
        root, "docs", "ANDREWS_ATOM_LEDGER.json",
    ), "utf8"));
    const fields = atomLedger.codebook.atomTuple;
    const canvasSectionIndex = fields.indexOf("canvasSection");
    const forceIndex = fields.indexOf("force");
    const rows = [...ledgerText.matchAll(/^\| (\d+) \| (\d+) \| ([^|]+) \| ([^|]+) \|$/gmu)]
        .map(match => ({
            lesson: Number(match[1]),
            atoms: Number(match[2]),
            topics: match[3].trim(),
            run: match[4].trim(),
        }));
    const expectedCounts = Array.from({ length: 58 }, (_, index) => {
        const lesson = index + 1;
        return atomLedger.atoms.filter(atom => (
            atom[forceIndex] === "grammar-bearing"
            && new RegExp(`^§${lesson}(?:\\.|$)`, "u").test(
                String(atom[canvasSectionIndex] || ""),
            )
        )).length;
    });

    s.eq("the compact ledger has one ordered row for every lesson", {
        rows: rows.length,
        lessons: rows.map(row => row.lesson),
        unique: new Set(rows.map(row => row.lesson)).size,
    }, {
        rows: 58,
        lessons: Array.from({ length: 58 }, (_, index) => index + 1),
        unique: 58,
    });
    s.eq("each lesson row retains the authoritative grammar-bearing denominator", {
        counts: rows.map(row => row.atoms),
        total: rows.reduce((sum, row) => sum + row.atoms, 0),
    }, {
        counts: expectedCounts,
        total: atomLedger.counts.grammarBearing,
    });
    s.ok("the ledger states the narrow run policy instead of a universal blind grid",
        ledgerText.includes("Run only the subjects and contrasts that the lesson actually names.")
        && ledgerText.includes("Cross two dimensions only when the lesson states that they interact.")
        && ledgerText.includes("Examples prove rules but never limit productive Source entry.")
        && ledgerText.includes("no unmentioned dimension has been added to the test matrix."));
    s.ok("named lesson topics create their own explicit run dimensions",
        rows.find(row => row.lesson === 7)?.run.includes("predicate-table cell")
        && rows.find(row => row.lesson === 17)?.run.includes("recursive hierarchy")
        && rows.find(row => row.lesson === 29)?.run.includes("4 classes × 6 series × 2 numbers")
        && rows.find(row => row.lesson === 42)?.run.includes("principal/modifier roles")
        && rows.find(row => row.lesson === 55)?.run.includes("tiā distinct from ti-ā")
        && rows.find(row => row.lesson === 58)?.run.includes("Textual errors require analysis checks"));

    return s;
}

module.exports = { run };
