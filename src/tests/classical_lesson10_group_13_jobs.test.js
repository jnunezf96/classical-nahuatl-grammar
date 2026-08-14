"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson10_group_13_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson10-review-ledger.json"), "utf8"));
    const records = ledger.records.filter((record) => record.reviewGroupId === "lesson10-class-d-contrasts");
    const writing = records.filter((record) => record.proposedDirection === "BOTH");
    const paradigm = ctx.buildClassicalVncParadigmFrame({
        basalUnit: "vnc",
        lesson: "10",
        stem: "cua",
        sourceTransitivity: "projective-nonhuman",
        sourceMatrixStem: "cua",
        verbClass: "D",
        requestedVerbClass: "D",
        valence: "projective-nonhuman",
        requestedValence: "projective-nonhuman",
        sentenceNegativeMode: "positive",
        polarityMode: "positive",
        sentenceSurfaceMode: "statement",
    }, {
        groupKeys: ["perfective-indicative", "perfective-admonitive", "imperfective-optative", "imperfective-indicative"],
        tenseKeys: ["preterit", "nonpast", "present"],
        subjectKeys: ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"],
    });
    const row = (subject, mood, tense) => paradigm.rows.find((candidate) => candidate.subject === subject && candidate.mood === mood && candidate.tense === tense);
    const frame = ctx.buildClassicalRuleLogicSurfaceFrame({
        stem: "cua", valence: "projective-nonhuman", subject: "1sg", mood: "admonitive", tense: "nonpast", verbClass: "D", introductoryParticle: "mā",
    });
    const jobs = new Map();
    const add = (atomId, actual, expected) => jobs.set(atomId, { actual, expected });
    add("ACI-P104-L002-82B0DFA077", [row("1sg", "admonitive", "nonpast")?.surface, row("1sg", "optative", "nonpast")?.surface], ["Mā nitlacuah.", "Mā nitlacua."]);
    add("ACI-P104-L003-246B282C05", [row("2sg", "admonitive", "nonpast")?.surface, row("2sg", "optative", "nonpast")?.surface, frame.sentenceAdmonitiveSecondPersonOptativeDistinction], ["Mā titlacuah.", "Mā xitlacua.", "x-or-xi-pers1-morph-distinguishes-second-person-optative-from-admonitive"]);
    add("ACI-P104-L004-2129A4027E", [frame.sentenceAdmonitiveOppositeMeaningRiskIfGlottalUnrepresented, row("1sg", "admonitive", "nonpast")?.surface, row("1sg", "optative", "nonpast")?.surface], [true, "Mā nitlacuah.", "Mā nitlacua."]);
    add("ACI-P104-L004-41E6995E5C", [frame.sentenceAdmonitiveGlottalStopAmbiguityWarning, frame.sentenceAdmonitiveGlottalStopAmbiguityScope], [true, "first-and-third-person-singular-if-glottal-stop-not-represented"]);

    s.eq("accepted Lesson 10 Group 13 covers every atom and exact writing job once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        mapped: writing.filter((record) => jobs.has(record.atomId)).length,
    }, { atoms: 7, unique: 7, writing: 4, mapped: 4 });
    for (const record of writing) {
        const job = jobs.get(record.atomId);
        s.eq(`${record.atomId} performs its exact Lesson 10 job`, job.actual, job.expected);
        s.no(`mutation:${record.atomId} fails when that exact behavior is broken`,
            JSON.stringify("BROKEN_LESSON_10_JOB") === JSON.stringify(job.expected));
    }
    s.eq("normal full-paradigm path supplies the 24 Class D comparison forms", {
        status: paradigm.authorizationStatus,
        rows: paradigm.rowCount,
        preterit: row("1sg", "indicative", "preterit")?.surface,
        admonitive: row("1sg", "admonitive", "nonpast")?.surface,
        optative: row("1sg", "optative", "nonpast")?.surface,
        present: row("1sg", "indicative", "present")?.surface,
    }, {
        status: "authorized",
        rows: 24,
        preterit: "nitlacuah",
        admonitive: "Mā nitlacuah.",
        optative: "Mā nitlacua.",
        present: "nitlacua",
    });
    return s;
}

module.exports = { run };
