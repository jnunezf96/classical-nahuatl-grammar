"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson9_groups_10_11_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson9-review-ledger.json"), "utf8"));
    const groupIds = ["lesson9-future-commands", "lesson9-negative-commands"];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writing = records.filter((record) => record.proposedDirection === "BOTH");
    const build = (overrides = {}) => ctx.buildClassicalRuleLogicSurfaceFrame({
        stem: "tequi-ti",
        valence: "intransitive",
        subject: "2sg",
        mood: "optative",
        tense: "future",
        verbClass: "A",
        sentenceType: "command-sentence",
        ...overrides,
    });
    const future = build({ introductoryParticle: "mā" });
    const laterFuture = build({ introductoryParticle: "mā", introductoryModifier: "quin" });
    const negativeNonpast = build({ stem: "chīhua", tense: "nonpast", introductoryParticle: "mā", negative: true });
    const negativeFuture = build({ introductoryParticle: "mā", negative: true });
    const negativeExhortation = build({ subject: "1pl", tense: "nonpast", sentenceType: "exhortation-sentence", introductoryParticle: "mā", negative: true });
    const blunt = build({ stem: "chīhua", tense: "nonpast", negative: true });
    const ahmo = build({
        stem: "chīhua",
        valence: "transitive",
        sourceTransitivity: "transitive",
        tense: "nonpast",
        sentenceParticleId: "l58-ahmo",
        objectSelection: "specific-projective:3sg",
    });

    const jobs = new Map();
    const add = (atomId, actual, expected) => jobs.set(atomId, { actual, expected });
    add("ACI-P098-L008-32ABDE494C", [future.state.tense, future.sentenceCanvasRole, laterFuture.sentenceSurfaceDisplay], ["future", "direct-command", "Mā quin titequitiz."]);
    add("ACI-P098-L009-EB8093783D", [future.sentenceFutureIndicativeAsOptative, future.selectedFormula, future.sentenceSurfaceDisplay], [true, "#ti-0(tequi-ti)z+⎕-0#", "Mā titequitiz."]);
    add("ACI-P098-L016-E34A88A44A", [negativeNonpast.sentenceCanvasRole, negativeExhortation.sentenceCanvasRole, negativeNonpast.sentenceLesson9NegativeTransformation], ["direct-command", "exhortation", "ma-tla-changes-ah-to-ca"]);
    add("ACI-P098-L017-5EEAC49845", [negativeNonpast.state.tense, negativeNonpast.sentenceSurfaceDisplay], ["nonpast", "Mā caxichīhua."]);
    add("ACI-P098-L018-7FEA528FE0", [negativeFuture.state.tense, negativeFuture.sentenceSurfaceDisplay], ["future", "Mā catitequitiz."]);
    add("ACI-P098-L025-EDA3D8C83B", [blunt.sentenceIntroductoryParticle, blunt.sentenceIntroductoryParticleOmissionAllowed, blunt.sentenceSurfaceDisplay], ["", true, "Ahxichīhua."]);
    add("ACI-P098-L026-100C8EEB0B", [blunt.sentencePrefixalStack, blunt.sentenceLesson9NegativeTransformation], [["ah#"], "brusque-command-keeps-ah"]);
    add("ACI-P098-L029-8C4E6B763C-02", blunt.sentenceSurfaceDisplay, "Ahxichīhua.");
    add("ACI-P098-L029-8FFE661856", [ahmo.sentenceFormulaDisplay, ahmo.sentenceSurfaceDisplay], ["ahmō #xi-0+c-0(chīhua)0+⎕-0#.", "Ahmō xicchīhua."]);

    s.eq("accepted Lesson 9 Groups 10-11 cover every atom and exact writing job once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        mapped: writing.filter((record) => jobs.has(record.atomId)).length,
    }, { atoms: 23, unique: 23, writing: 9, mapped: 9 });
    for (const record of writing) {
        const job = jobs.get(record.atomId);
        s.eq(`${record.atomId} performs its exact Lesson 9 job`, job.actual, job.expected);
        s.no(`mutation:${record.atomId} fails when that exact behavior is broken`,
            JSON.stringify("BROKEN_LESSON_9_JOB") === JSON.stringify(job.expected));
    }
    s.eq("normal application keeps future command meaning on the borrowed future form", {
        ordinary: [future.sentenceFutureIndicativeAsOptative, future.sentenceSurfaceDisplay],
        later: [laterFuture.sentenceIntroductoryModifier, laterFuture.sentenceSurfaceDisplay],
    }, {
        ordinary: [true, "Mā titequitiz."],
        later: ["quin", "Mā quin titequitiz."],
    });
    s.eq("normal application builds both introduced and blunt negative commands", {
        nonpast: [negativeNonpast.sentencePrefixalStack, negativeNonpast.sentenceSurfaceDisplay],
        future: [negativeFuture.sentencePrefixalStack, negativeFuture.sentenceSurfaceDisplay],
        exhortation: negativeExhortation.sentenceSurfaceDisplay,
        blunt: [blunt.sentencePrefixalStack, blunt.sentenceSurfaceDisplay],
        ahmo: ahmo.sentenceSurfaceDisplay,
    }, {
        nonpast: [["ca#"], "Mā caxichīhua."],
        future: [["ca#"], "Mā catitequitiz."],
        exhortation: "Mā catitequiticān.",
        blunt: [["ah#"], "Ahxichīhua."],
        ahmo: "Ahmō xicchīhua.",
    });
    return s;
}

module.exports = { run };
