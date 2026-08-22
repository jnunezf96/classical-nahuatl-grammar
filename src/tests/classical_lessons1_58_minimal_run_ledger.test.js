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
    const rotationRows = [...ledgerText.matchAll(
        /^\| L(\d+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \| ([^|]+) \|$/gmu,
    )].map(match => ({
        lesson: Number(match[1]),
        emptiness: match[2].trim(),
        fullness: match[3].trim(),
        rotation: match[4].trim(),
        rhymeAxes: match[5].split(",").map(axis => axis.trim()),
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
    s.eq("the two-pin rotation map covers every lesson through Lesson 58", {
        rows: rotationRows.length,
        lessons: rotationRows.map(row => row.lesson),
        unique: new Set(rotationRows.map(row => row.lesson)).size,
        completePins: rotationRows.every(row => (
            row.emptiness.length > 0 && row.fullness.length > 0
        )),
        validRotations: rotationRows.every(row => (
            /^(?:[FCRP])(?:(?:→|↔|\/)[FCRP])*$/u.test(row.rotation)
        )),
    }, {
        rows: 58,
        lessons: Array.from({ length: 58 }, (_, index) => index + 1),
        unique: 58,
        completePins: true,
        validRotations: true,
    });
    const lessonsByNumber = new Map(rotationRows.map(row => [
        row.lesson,
        row,
    ]));
    const connectedLessons = new Set([1]);
    const queue = [1];
    while (queue.length) {
        const currentLesson = queue.shift();
        const currentAxes = new Set(
            lessonsByNumber.get(currentLesson)?.rhymeAxes || [],
        );
        rotationRows.forEach(candidate => {
            if (
                !connectedLessons.has(candidate.lesson)
                && candidate.rhymeAxes.some(axis => currentAxes.has(axis))
            ) {
                connectedLessons.add(candidate.lesson);
                queue.push(candidate.lesson);
            }
        });
    }
    const axisCounts = new Map();
    rotationRows.forEach(row => row.rhymeAxes.forEach(axis => {
        axisCounts.set(axis, (axisCounts.get(axis) || 0) + 1);
    }));
    s.eq("shared rhyme axes form one connected Lessons 1–58 rhyme space rather than isolated lesson routes", {
        connectedLessons: [...connectedLessons].sort((a, b) => a - b),
        everyAxisShared: [...axisCounts.values()].every(count => count > 1),
        isolatedLessons: rotationRows.filter(row => !rotationRows.some(
            candidate => candidate.lesson !== row.lesson
                && candidate.rhymeAxes.some(axis => row.rhymeAxes.includes(axis)),
        )).map(row => row.lesson),
    }, {
        connectedLessons: Array.from({ length: 58 }, (_, index) => index + 1),
        everyAxisShared: true,
        isolatedLessons: [],
    });
    s.ok("superposition compresses repeated lesson axes without erasing their planes",
        rotationRows.reduce(
            (count, row) => count + row.rhymeAxes.length,
            0,
        ) > axisCounts.size * 4
        && new Set(rotationRows.map(row => row.rotation)).size
            < rotationRows.length
        && rotationRows.every(row => row.rhymeAxes.every(axis => (
            axisCounts.get(axis) > 1
        ))));
    s.ok("rotation remains a non-authorizing exact-Result run tool",
        ledgerText.includes("Rotation signatures are analogies, not new grammar rules")
        && ledgerText.includes("The two pins are joined only at a licensed handoff")
        && ledgerText.includes("consumer accepts that exact owner-issued Result")
        && ledgerText.includes("Similar spelling, translation, example identity, or a copied formula cannot join the pins")
        && ledgerText.includes("The axes organize checks; they never authorize a route"));
    s.ok("rotation is used to superimpose shared machinery and expose compatible cross-lesson properties",
        ledgerText.includes("This map is a compression plan, not merely a list of connections")
        && ledgerText.includes("rotating the loops reveals which arcs can occupy the same canonical machinery")
        && ledgerText.includes("the engine should store the operation once and let both lessons use it")
        && ledgerText.includes("Apparent recursion is normally a complete typed unit re-entering the same filling operation")
        && ledgerText.includes("compatible grammatical properties from several lessons may coexist on one exact Source and Result"));
    s.ok("the all-route cast explains the six-field inside-out procedure and its exact-owner boundary",
        ledgerText.includes("Executed all-route inside-out cast")
        && ledgerText.includes("requires present")
        && ledgerText.includes("requires absent")
        && ledgerText.includes("adds")
        && ledgerText.includes("removes")
        && ledgerText.includes("preserves")
        && ledgerText.includes("emits")
        && ledgerText.includes("all **100 canonical routes**")
        && ledgerText.includes("all **441 accepted route-axis jobs**")
        && ledgerText.includes("six typed boundary seams")
        && ledgerText.includes("consumer owner must still authorize the exact Result")
        && ledgerText.includes("topology candidates until the receiving owner authorizes a real Result")
        && ledgerText.includes("A blocked owner Result is a grammatical boundary"));
    s.ok("the lesson planes now discover superpositions from the map rather than named pairs",
        ledgerText.includes("Automatic Lessons 1–58 rotation discovery")
        && ledgerText.includes("does not begin with named lesson pairs")
        && ledgerText.includes("compares every full pin with every empty pin")
        && ledgerText.includes("56 families in which several full pins can occupy the same empty pin")
        && ledgerText.includes("represents arbitrarily long compatible stacks")
        && ledgerText.includes("checked only after discovery")
        && ledgerText.includes("They are not inputs to it")
        && ledgerText.includes("Lesson numbers identify the resulting map locations but never participate in compatibility"));
    s.ok("accepted proof files now populate a non-authorizing exact-owner calibration queue",
        ledgerText.includes("Automatic owner calibration queue")
        && ledgerText.includes("does not use a lesson-pair table")
        && ledgerText.includes("146** currently have an explicit continuation type")
        && ledgerText.includes("22 distinct producer → consumer owner contracts")
        && ledgerText.includes("saving **124 repeated executions**")
        && ledgerText.includes("No accepted Lessons 1–39 coordinate still waits for an owner index")
        && ledgerText.includes("Five Lesson 10 → Lessons 35–39 coordinates are exact vertical continuations")
        && ledgerText.includes("The other eleven are sideways rhymes")
        && ledgerText.includes("Explicit `operationId` calls in accepted proof files populate this diagnostic index")
        && ledgerText.includes("all **22 of 22** currently supported contracts")
        && ledgerText.includes("remaining aligned lesson-edge queue are both zero")
        && ledgerText.includes("execute the exact producer Result or exact owner-issued Result constituent through the receiving owner")
        && ledgerText.includes("A caller cannot declare a candidate authorized")
        && ledgerText.includes("a genuine owner block is retained as a grammatical boundary"));
    s.ok("completed rotation rows rest on their accepted lesson ledgers while later planes remain non-authorizing preparation",
        rotationRows.filter(row => row.lesson <= 39).every(row => fs.existsSync(path.join(
            root,
            "docs",
            "canvas-progress",
            row.lesson <= 2
                ? `lesson${row.lesson}-job-ledger.json`
                : `lesson${row.lesson}-review-ledger.json`,
        )))
        && rotationRows.filter(row => row.lesson >= 40).every(row => (
            rows.some(runRow => runRow.lesson === row.lesson)
            && row.emptiness.length > 0
            && row.fullness.length > 0
        ))
        && ledgerText.includes(
            "This does not mark those lessons accepted or implemented"
        ));

    return s;
}

module.exports = { run };
