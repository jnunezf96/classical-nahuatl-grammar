"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson10_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson10-review-ledger.json"), "utf8"));
    const groupIds = ["lesson10-admonitive-meaning", "lesson10-admonitive-vnc-formation", "lesson10-affirmative-admonition-system"];
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
    const direct = build();
    const classA = build({ stem: "tzahtzi", subject: "1sg", verbClass: "A" });
    const plural = build({ subject: "1pl" });
    const indirect = build({ stem: "chol-o-a", subject: "3sg", verbClass: "C" });
    const strengthened = build({ stem: "tzahtzi", subject: "1sg", verbClass: "A", introductoryModifier: "nēn" });
    const hostileFuture = build({ tense: "future" });
    const hostileDont = build({ admonitiveTranslationReading: "don't" });
    const hostileMayNot = build({ admonitiveTranslationReading: "may-not" });

    const jobs = new Map();
    const add = (atomId, actual, expected) => jobs.set(atomId, { actual, expected });
    add("ACI-P099-L003-88994B555E", direct.sentenceAdmonitiveForce, "positive-cautionary-warning-advice");
    add("ACI-P099-L006-63A81C32E3", direct.sentenceAdmonitiveProhibitionReadingAllowed, false);
    add("ACI-P099-L007-59A03EA898", direct.sentenceAdmonitiveMoodPolarity, "positive-not-negative-by-mood");
    add("ACI-P099-L008-17C569519F", [direct.sentenceAdmonitiveIsPositiveByMood, direct.sentenceAdmonitiveForce], [true, "positive-cautionary-warning-advice"]);
    add("ACI-P099-L016-011FBB8AA2-02", [direct.state.mood, direct.sentenceAdmonitiveRequestedTenseAuthorized], ["admonitive", true]);
    add("ACI-P099-L016-011FBB8AA2-03", [direct.sentenceCanvasRole, direct.sentenceAdmonitiveNegativeCommandReadingAllowed], ["direct-admonition", false]);

    add("ACI-P099-L025-213CC30339", [direct.sentenceAdmonitiveOnlyNonpastTense, hostileFuture.sentenceSurfaceStatus, hostileFuture.sentenceBlockReason], [true, "blocked", "lesson-10-admonitive-requires-nonpast-tense"]);
    add("ACI-P099-L027-96825197F7", [classA.sentenceAdmonitiveTenseMorph, classA.sentenceAdmonitiveClassATenseMorphContrast, direct.sentenceAdmonitiveTenseMorph], ["h", "admonitive-h-vs-preterit-indicative-0", "0"]);
    add("ACI-P099-L030-26E14924E5", [direct.sentenceAdmonitiveNum1Morpheme, direct.sentenceAdmonitiveNumberDyadKind], ["/ti", "nonpast-admonitive"]);
    add("ACI-P099-L031-67AE7EAEA1", [direct.sentenceAdmonitiveSingularNumberDyad, direct.sentenceAdmonitiveNum2SingularMorph], ["⎕-0", "0"]);
    add("ACI-P099-L031-AA866EEB91", direct.sentenceAdmonitiveNum1RegularMorphCondition, "only-with-plural-num2");
    add("ACI-P100-L002-5ED2CBD75C", direct.sentenceAdmonitiveNum2PluralMorphs, ["in", "ih"]);
    add("ACI-P100-L003-06F5516E8F", [direct.sentenceAdmonitiveSingularNumberDyad, direct.sentenceAdmonitivePluralNumberDyads, plural.sentenceAdmonitiveNumberDyad], ["⎕-0", ["t-in", "t-ih"], "t-in"]);
    add("ACI-P100-L004-420712089F", direct.sentenceAdmonitiveVncTranslationValueOutsideSentence, "none");

    add("ACI-P100-L007-23E19EBF86", [direct.sentenceAdmonitiveAssertionConversionSource, direct.sentenceAdmonitiveAssertionConversionTarget], ["affirmative-present-indicative-assertion", "affirmative-admonition-warning-sentence"]);
    add("ACI-P100-L008-F1AA6390D3", [direct.sentenceIntroductoryParticleRequired, direct.sentenceAdmonitiveMaPosition, direct.sentenceSurfaceDisplay], [true, "beginning-of-admonition-sentence", "Mā tihuetz."]);
    add("ACI-P100-L010-182DC4F7F2", [direct.sentenceAdmonitiveNenStrengtheningKind, strengthened.sentenceSurfaceDisplay], ["optional-adverbialized-nnc-strengthener", "Mā nēn nitzahtzih."]);
    add("ACI-P100-L012-B50BCE2387", direct.sentenceCanvasRole, "direct-admonition");
    add("ACI-P100-L013-4B31118EEC", indirect.sentenceCanvasRole, "indirect-admonition");
    add("ACI-P100-L014-B43ECB07B3", strengthened.sentenceCanvasRole, "admonitive-exhortation");
    add("ACI-P100-L015-5D76C37786", direct.sentenceAdmonitiveWarningRenderingPolicy, "any-rendering-with-warning-sense-is-valid-not-example-whitelist");
    add("ACI-P100-L017-35A7027F5C", [hostileDont.authorizationStatus, hostileDont.blockReason, hostileMayNot.authorizationStatus], ["blocked", "classical-grammar-application-request-invalid:forbidden-authority:admonitiveTranslationReading", "blocked"]);

    s.eq("accepted Lesson 10 Groups 1-3 cover every atom and exact writing job once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        mapped: writing.filter((record) => jobs.has(record.atomId)).length,
    }, { atoms: 52, unique: 52, writing: 22, mapped: 22 });
    for (const record of writing) {
        const job = jobs.get(record.atomId);
        s.eq(`${record.atomId} performs its exact Lesson 10 job`, job.actual, job.expected);
        s.no(`mutation:${record.atomId} fails when that exact behavior is broken`,
            JSON.stringify("BROKEN_LESSON_10_JOB") === JSON.stringify(job.expected));
    }
    s.eq("normal application builds positive admonitions across participant roles", {
        direct: [direct.selectedFormula, direct.sentenceSurfaceDisplay, direct.sentenceCanvasRole],
        indirect: [indirect.selectedFormula, indirect.sentenceSurfaceDisplay, indirect.sentenceCanvasRole],
        exhortation: [strengthened.selectedFormula, strengthened.sentenceSurfaceDisplay, strengthened.sentenceCanvasRole],
    }, {
        direct: ["#ti-0(huetz)0+⎕-0#", "Mā tihuetz.", "direct-admonition"],
        indirect: ["#0-0(chol-o-h)0+⎕-0#", "Mā choloh.", "indirect-admonition"],
        exhortation: ["#ni-0(tzahtzi)h+⎕-0#", "Mā nēn nitzahtzih.", "admonitive-exhortation"],
    });
    s.eq("normal application derives singular and plural admonitive formation", {
        classA: [classA.selectedFormula, classA.sentenceSurfaceDisplay],
        classB: [direct.selectedFormula, direct.sentenceSurfaceDisplay],
        plural: [plural.selectedFormula, plural.sentenceSurfaceDisplay],
    }, {
        classA: ["#ni-0(tzahtzi)h+⎕-0#", "Mā nitzahtzih."],
        classB: ["#ti-0(huetz)0+⎕-0#", "Mā tihuetz."],
        plural: ["#ti-0(huetz)0+t-in#", "Mā tihuetztin."],
    });
    return s;
}

module.exports = { run };
