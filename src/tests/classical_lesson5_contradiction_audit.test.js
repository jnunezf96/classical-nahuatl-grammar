"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson5_contradiction_audit");
    const audit = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson5-contradiction-audit.json"
    ), "utf8"));
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson5-review-ledger.json"
    ), "utf8"));
    const shell = fs.readFileSync(path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    const verbstem = ctx.buildClassicalNahuatlVerbstemCategorySystemFrame();
    const mood = ctx.buildClassicalNahuatlMoodTenseFillerSystemFrame();
    const subject = ctx.buildClassicalNahuatlSubjectParadigmSystemFrame();
    const classA = ctx.buildClassicalNahuatlFiniteVncResult("mati", {
        subject: "1sg", mood: "indicative", tense: "preterit", verbClass: "A",
    });
    const classB = ctx.buildClassicalNahuatlFiniteVncResult("mati", {
        subject: "1sg", mood: "indicative", tense: "preterit", verbClass: "B",
    });
    const blockedMoodTense = ctx.validateClassicalNahuatlVncSemanticSelection({
        mood: "admonitive", tense: "past",
    });

    s.eq("every Lesson 5 atom has an accepted exact job", {
        total: ledger.records.length,
        accepted: ledger.records.filter((record) => record.reviewStatus === "ACCEPTED").length,
        exact: ledger.records.filter((record) => record.implementationCredit === "EXACTLY_OBSERVED").length,
    }, { total: 200, accepted: 200, exact: 200 });
    s.eq("the Lesson 5 contradiction record is complete and non-authorizing", {
        status: audit.status,
        resolved: audit.resolvedCount,
        unresolved: audit.unresolvedCount,
        reportAuthority: audit.reportAuthority,
    }, { status: "UNCONTRADICTED", resolved: 8, unresolved: 0, reportAuthority: false });
    s.eq("genuine choices stay visible while derived carriers stay automatic", {
        subject: shell.includes('id="classical-rule-logic-subject"'),
        mood: shell.includes('id="classical-rule-logic-mood"'),
        tense: shell.includes('id="classical-rule-logic-tense"'),
        valence: shell.includes('id="classical-rule-logic-valence"'),
        voice: shell.includes('id="classical-rule-logic-vnc-voice"'),
        derivedControl: /(?:id|name)="[^"]*(?:pers2|num1|num2|number-connector|aspect-carrier|tense-morph)[^"]*"/iu.test(shell),
    }, { subject: true, mood: true, tense: true, valence: true, voice: true, derivedControl: false });
    s.eq("the perfective exists even when it cannot be guessed from the imperfective", {
        imperfective: verbstem.imperfectiveStem,
        perfective: verbstem.perfectiveStem,
        required: verbstem.perfectiveRequiredEvenWhenMappingIsUnpredictable,
        noEvidenceMeansNoForm: !verbstem.lackOfPredictableRuleDoesNotMeanNoPerfective,
    }, { imperfective: "nemi", perfective: "nen", required: true, noEvidenceMeansNoForm: false });
    s.eq("Class A c and non-Class-A square-zero no longer contradict each other", {
        classA: classA.numberDyad.num1,
        classB: classB.numberDyad.num1,
        classARule: classA.numberDyad.preteritSingularCRequiresClassA,
    }, { classA: "c", classB: "⎕", classARule: true });
    s.eq("English reference and grammatical tense remain contextual readings", {
        thirdCommon: subject.thirdCommon.interpretations,
        tenseIsNotTime: mood.grammaticalTenseIsNotExistentialTime,
        presentMayReferPast: mood.presentTenseMayReferToPastTimeInContext,
    }, {
        thirdCommon: { singularHumanMale: "he", singularHumanFemale: "she", singularAnimateNonhuman: "it", singularNonanimate: "it", pluralNonanimate: "they" },
        tenseIsNotTime: true,
        presentMayReferPast: true,
    });
    s.eq("an impossible mood-tense pairing is blocked by grammar", {
        status: blockedMoodTense.authorizationStatus,
        reason: blockedMoodTense.blockReason,
    }, { status: "blocked", reason: "vnc-semantic-tense-not-authorized-for-mood" });
    return s;
}

module.exports = { run };
