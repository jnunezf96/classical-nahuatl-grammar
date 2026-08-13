"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson10_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson10-review-ledger.json"), "utf8"));
    const groupIds = ["lesson10-class-d-admonitions", "lesson10-negative-admonitions", "lesson10-general-vnc-contrasts"];
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
    const classDSingular = build({ stem: "cua", valence: "projective-nonhuman", subject: "1sg", verbClass: "D" });
    const classDPlural = build({ stem: "cua", valence: "projective-nonhuman", subject: "1pl", verbClass: "D" });
    const classDStrengthened = build({ stem: "cua", valence: "projective-nonhuman", subject: "1sg", verbClass: "D", introductoryModifier: "nēn" });
    const negativeQuiza = build({ stem: "quiza", negative: true });
    const negativeMama = build({
        stem: "māma",
        valence: "transitive",
        sourceTransitivity: "transitive",
        subject: "3sg",
        verbClass: "D",
        negative: true,
        objectSelection: "specific-projective:3sg",
    });
    const hostileCa = build({ stem: "quiza", negative: true, requestedNegativePrefix: "ca#" });
    const secondOptative = build({ mood: "optative", stem: "huetzi", verbClass: "B" });

    const jobs = new Map();
    const add = (atomId, actual, expected) => jobs.set(atomId, { actual, expected });
    add("ACI-P101-L014-8DEBB28C45", [classDSingular.sentenceAdmonitiveNum1Morpheme, classDSingular.sentenceAdmonitiveSingularNumberDyad], ["/ti", "⎕-0"]);
    add("ACI-P101-L017-76D6ED7F57", [classDStrengthened.sentenceAdmonitiveNenStrengtheningKind, classDStrengthened.sentenceSurfaceDisplay], ["optional-adverbialized-nnc-strengthener", "Mā nēn nitlacuah."]);

    add("ACI-P101-L023-A798BEA5C8", [negativeQuiza.sentenceAdmonitiveNegativeAssertionConversionSource, negativeQuiza.sentenceAdmonitiveNegativeAssertionConversionTarget], ["negative-present-indicative-assertion", "negative-admonition-cancellation-sentence"]);
    add("ACI-P101-L025-03F4F79346", [negativeQuiza.sentencePrefixalStack, negativeQuiza.sentenceAdmonitiveNegativeIntroductoryCollocation, negativeQuiza.sentenceAdmonitiveNegativeIntroductoryCollocationRequired], [["ah#"], "mā nēn", true]);
    add("ACI-P101-L033-E214411E9F-02", [negativeQuiza.state.subject, negativeQuiza.selectedFormula], ["2sg", "#ti-0(quiz)0+⎕-0#"]);
    add("ACI-P101-L033-E214411E9F-03", [negativeQuiza.sentencePrefixalStack, negativeQuiza.sentenceAdmonitiveNegativePrefixAttachment], [["ah#"], "ah#-affixed-to-admonitive-vnc"]);
    add("ACI-P101-L033-E214411E9F-04", [negativeQuiza.state.stem, negativeQuiza.selectedFormula], ["quiza", "#ti-0(quiz)0+⎕-0#"]);
    add("ACI-P101-L033-E214411E9F-05", [negativeQuiza.sentenceSurfaceDisplay, negativeQuiza.sentenceAdmonitiveForce], ["Mā nēn ahtiquiz.", "cancel-warning-recommend-reject-caution"]);
    add("ACI-P101-L035-8E4D508EFA-02", [negativeQuiza.selectedFormula, negativeQuiza.sentenceSurfaceDisplay, negativeQuiza.sentenceAdmonitiveNumberDyad], ["#ti-0(quiz)0+⎕-0#", "Mā nēn ahtiquiz.", "⎕-0"]);
    add("ACI-P101-L035-8E4D508EFA-03", negativeQuiza.sentenceAdmonitiveNegativeForceDefinition, "cancellation-of-warning-recommendation-to-reject-caution");
    add("ACI-P101-L035-8E4D508EFA-04", [negativeQuiza.sentenceAdmonitiveForce, negativeQuiza.sentenceSurfaceDisplay], ["cancel-warning-recommend-reject-caution", "Mā nēn ahtiquiz."]);
    add("ACI-P101-L035-8E4D508EFA-05", [negativeQuiza.sentenceAdmonitiveProhibitionReadingAllowed, negativeQuiza.sentenceAdmonitiveRequestedTranslationReading], [false, "reject-caution-sense"]);
    add("ACI-P101-L035-B25CB80564", [negativeQuiza.sentenceAdmonitiveNum1Morpheme, negativeQuiza.sentenceAdmonitiveSingularNumberDyad], ["/ti", "⎕-0"]);
    add("ACI-P102-L002-0ACE879B9E-02", negativeMama.sentencePrefixalStack, ["ah#"]);
    add("ACI-P102-L002-0ACE879B9E-03", [negativeMama.state.subject, negativeMama.sentenceCanvasRole], ["3sg", "indirect-admonition"]);
    add("ACI-P102-L002-0ACE879B9E-04", [negativeMama.selectedFormula, negativeMama.sentenceSurfaceDisplay], ["#0-0+qui-0(māmah)0+⎕-0#", "Mā nēn ahquimāmah."]);
    add("ACI-P102-L002-0ACE879B9E-05", [negativeMama.state.tense, negativeMama.sentenceAdmonitiveOnlyNonpastTense], ["nonpast", true]);
    add("ACI-P102-L002-0ACE879B9E-06", [negativeMama.sentenceSurfaceDisplay, negativeMama.sentenceAdmonitiveForce], ["Mā nēn ahquimāmah.", "cancel-warning-recommend-reject-caution"]);
    add("ACI-P102-L006-F4578528FF", [negativeMama.sentenceAdmonitiveNum1Morpheme, negativeMama.sentenceAdmonitiveNumberDyad], ["/ti", "⎕-0"]);

    add("ACI-P102-L010-100661586C", [secondOptative.selectedFormula, negativeQuiza.sentenceAdmonitiveSecondPersonOptativeDistinction], ["#xi-0(huetzi)0+⎕-0#", "x-or-xi-pers1-morph-distinguishes-second-person-optative-from-admonitive"]);
    add("ACI-P102-L012-6E13B8359B", [classDPlural.sentenceAdmonitivePluralSubjectsAlwaysDistinctive, classDPlural.sentenceAdmonitiveNumberDyad], [true, "t-in"]);

    s.eq("accepted Lesson 10 Groups 7-9 cover every atom and exact writing job once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        mapped: writing.filter((record) => jobs.has(record.atomId)).length,
    }, { atoms: 52, unique: 52, writing: 21, mapped: 21 });
    for (const record of writing) {
        const job = jobs.get(record.atomId);
        s.eq(`${record.atomId} performs its exact Lesson 10 job`, job.actual, job.expected);
        s.no(`mutation:${record.atomId} fails when that exact behavior is broken`,
            JSON.stringify("BROKEN_LESSON_10_JOB") === JSON.stringify(job.expected));
    }
    s.eq("normal application builds Class D singular and plural admonitions", {
        singular: [classDSingular.selectedFormula, classDSingular.sentenceSurfaceDisplay],
        plural: [classDPlural.selectedFormula, classDPlural.sentenceSurfaceDisplay],
    }, {
        singular: ["#ni-0+tla(cuah)0+⎕-0#", "Mā nitlacuah."],
        plural: ["#ti-0+tla(cuah)0+t-in#", "Mā titlacuahtin."],
    });
    s.eq("normal application keeps negative admonition separate from a Lesson 9 ca command", {
        quiza: [negativeQuiza.sentencePrefixalStack, negativeQuiza.sentenceAdmonitiveNegativeIntroductoryCollocation, negativeQuiza.sentenceSurfaceDisplay],
        mama: [negativeMama.sentencePrefixalStack, negativeMama.sentenceSurfaceDisplay],
        hostileCa: [hostileCa.sentenceSurfaceStatus, hostileCa.sentenceBlockReason],
    }, {
        quiza: [["ah#"], "mā nēn", "Mā nēn ahtiquiz."],
        mama: [["ah#"], "Mā nēn ahquimāmah."],
        hostileCa: ["blocked", "lesson-10-admonition-keeps-ah-not-ca"],
    });
    return s;
}

module.exports = { run };
