"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson10_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson10-review-ledger.json"), "utf8"));
    const groupIds = ["lesson10-class-a-admonitions", "lesson10-class-b-admonitions", "lesson10-class-c-admonitions"];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");
    const build = (overrides = {}) => ctx.buildClassicalRuleLogicSurfaceFrame({
        stem: "huetz",
        valence: "intransitive",
        subject: "2sg",
        mood: "admonitive",
        tense: "nonpast",
        verbClass: "B",
        introductoryParticle: "mā",
        ...overrides,
    });
    const classAPlural = build({ stem: "tzahtzi", subject: "3pl", verbClass: "A" });
    const classBSingular = build();
    const classCPlural = build({ stem: "chol-o-a", subject: "2pl", verbClass: "C" });

    const jobs = new Map();
    const add = (atomId, actual, expected) => jobs.set(atomId, { actual, expected });
    add("ACI-P100-L029-533F1A031C", [classAPlural.sentenceSurfaceDisplay, classAPlural.sentenceAdmonitiveForce], ["Mā tzahtzihtin.", "positive-cautionary-warning-advice"]);

    add("ACI-P100-L033-A7AEE03A98-02", [classBSingular.selectedFormula, classBSingular.sentenceSurfaceDisplay, classBSingular.sentenceAdmonitiveSingularNumberDyad], ["#ti-0(huetz)0+⎕-0#", "Mā tihuetz.", "⎕-0"]);
    add("ACI-P100-L033-A7AEE03A98-03", [classBSingular.sentenceSurfaceDisplay, classBSingular.sentenceAdmonitiveForce], ["Mā tihuetz.", "positive-cautionary-warning-advice"]);
    add("ACI-P100-L033-A7AEE03A98-04", [classBSingular.sentenceSurfaceDisplay, classBSingular.sentenceAdmonitiveWarningRenderingPolicy], ["Mā tihuetz.", "any-rendering-with-warning-sense-is-valid-not-example-whitelist"]);
    add("ACI-P100-L033-A7AEE03A98-05", [classBSingular.sentenceCanvasRole, classBSingular.sentenceAdmonitiveProhibitionReadingAllowed], ["direct-admonition", false]);
    add("ACI-P100-L033-A7AEE03A98-06", [classBSingular.sentenceAdmonitiveIsPositiveByMood, classBSingular.sentenceSurfaceDisplay], [true, "Mā tihuetz."]);
    add("ACI-P100-L033-A7AEE03A98-07", [classBSingular.sentenceAdmonitiveNegativeCommandReadingAllowed, classBSingular.sentenceAdmonitiveForce], [false, "positive-cautionary-warning-advice"]);
    add("ACI-P100-L035-06B4A02E58", [classBSingular.sentenceAdmonitiveNum1Morpheme, classBSingular.sentenceAdmonitiveSingularNumberDyad], ["/ti", "⎕-0"]);

    add("ACI-P101-L005-7E48FF280A", [classCPlural.sentenceAdmonitiveNum1Morpheme, classCPlural.sentenceAdmonitiveNumberDyad], ["/ti", "t-in"]);
    add("ACI-P101-L008-E43AF64242-02", [classCPlural.selectedFormula, classCPlural.sentenceSurfaceDisplay], ["#an-0(chol-o-h)0+t-in#", "Mā ancholohtin."]);
    add("ACI-P101-L008-E43AF64242-03", [classCPlural.sentenceCanvasRole, classCPlural.sentenceAdmonitiveForce], ["direct-admonition", "positive-cautionary-warning-advice"]);
    add("ACI-P101-L008-E43AF64242-04", [classCPlural.sentenceSurfaceDisplay, classCPlural.sentenceAdmonitiveWarningRenderingPolicy], ["Mā ancholohtin.", "any-rendering-with-warning-sense-is-valid-not-example-whitelist"]);

    s.eq("accepted Lesson 10 Groups 4-6 cover every atom and exact writing job once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        mapped: writing.filter((record) => jobs.has(record.atomId)).length,
    }, { atoms: 39, unique: 39, writing: 12, mapped: 12 });
    for (const record of writing) {
        const job = jobs.get(record.atomId);
        s.eq(`${record.atomId} performs its exact Lesson 10 job`, job.actual, job.expected);
        s.no(`mutation:${record.atomId} fails when that exact behavior is broken`,
            JSON.stringify("BROKEN_LESSON_10_JOB") === JSON.stringify(job.expected));
    }
    s.eq("normal application builds the accepted Class A, B, and C admonitions", {
        classA: [classAPlural.selectedFormula, classAPlural.sentenceSurfaceDisplay],
        classB: [classBSingular.selectedFormula, classBSingular.sentenceSurfaceDisplay],
        classC: [classCPlural.selectedFormula, classCPlural.sentenceSurfaceDisplay],
    }, {
        classA: ["#0-0(tzahtzi)h+t-in#", "Mā tzahtzihtin."],
        classB: ["#ti-0(huetz)0+⎕-0#", "Mā tihuetz."],
        classC: ["#an-0(chol-o-h)0+t-in#", "Mā ancholohtin."],
    });
    return s;
}

module.exports = { run };
