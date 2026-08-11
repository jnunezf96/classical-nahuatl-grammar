"use strict";

const { createSuite } = require("./runner");

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

function rejectsMutation(predicate, frame, mutate) {
    const hostile = clone(frame);
    mutate(hostile);
    return !predicate(hostile);
}

function run(ctx = {}) {
    const s = createSuite("classical_nuclear_shared_exact_observations");

    const number = ctx.buildClassicalNahuatlSubjectNumberSuffixSystemFrame();
    const numberExact = frame => frame.locus === "num2";
    s.ok("num2 remains the definitive subject-number locus", numberExact(number));
    s.ok("a num2-locus mutation is observed", rejectsMutation(numberExact, number, frame => { frame.locus = "num1"; }));

    const mood = ctx.buildClassicalNahuatlMoodTenseFillerSystemFrame();
    const moodExact = frame => frame.indicative.imperfectCanonicalMorph === "yā";
    s.ok("the imperfective tense morph is derived as yā", moodExact(mood));
    s.ok("an imperfective-morph mutation is observed", rejectsMutation(moodExact, mood, frame => { frame.indicative.imperfectCanonicalMorph = "Ø"; }));

    const monadic = ctx.buildClassicalNahuatlMonadicObjectSystemFrame();
    const monadicExact = frame => frame.nonhumanMorph === "tla"
        && frame.somethingIncludesAnimateOrNonanimate === true
        && frame.humanClass === "human"
        && frame.nonhumanClass === "nonhuman";
    s.ok("tla includes animate and nonanimate referents while tē/tla encode humanness", monadicExact(monadic));
    s.ok("a humanness mutation is observed", rejectsMutation(monadicExact, monadic, frame => { frame.nonhumanClass = "human"; }));

    const projective = ctx.buildClassicalNahuatlProjectiveObjectSystemFrame();
    const projectiveExact = frame => JSON.stringify(frame.thirdVa1Variants) === JSON.stringify(["c", "qu", "qui"])
        && frame.automaticEnglishObjectCorrespondence === true
        && JSON.stringify(frame.thirdCommonInterpretations) === JSON.stringify({
            singularHumanMale: "him",
            singularHumanFemale: "her",
            singularAnimateNonhuman: "it",
            singularNonanimate: "it",
            pluralNonanimate: "them",
        })
        && JSON.stringify(frame.thirdPluralAnimateRealization) === JSON.stringify({
            va1: "qu", va2: "im", human: "them", animateNonhuman: "them",
            allPhonologicalVariants: ["im", "in", "iz", "ix"],
        })
        && JSON.stringify(frame.stemBoundaryCases) === JSON.stringify({
            ca: { objectCarrier: "c", stem: "ca" },
            tiqui: { objectCarrier: "c", stem: "tiqui" },
            que: { objectCarrier: "c", stem: "que" },
        });
    s.ok("specific-object forms preserve carrier/stem boundaries and referent-sensitive Result readings", projectiveExact(projective));
    for (const mutate of [
        frame => { frame.thirdVa1Variants = ["c", "qu"]; },
        frame => { frame.thirdCommonInterpretations.singularHumanMale = "it"; },
        frame => { frame.thirdPluralAnimateRealization.va2 = "in"; },
        frame => { frame.stemBoundaryCases.tiqui.stem = "i"; },
    ]) s.ok("a specific-object behavior mutation is observed", rejectsMutation(projectiveExact, projective, mutate));

    const reflexive = ctx.buildClassicalNahuatlMainlineReflexiveObjectSystemFrame();
    const reflexiveExact = frame => JSON.stringify(frame.va1Carries) === JSON.stringify(["person", "number"])
        && JSON.stringify(frame.personNumberDyads) === JSON.stringify({ firstSingular: "n-o", firstPlural: "t-o", nonfirst: "m-o" })
        && JSON.stringify(frame.readingsBySubject) === JSON.stringify({
            secondSingular: ["yourself"],
            thirdSingularHumanMale: ["himself"],
            thirdSingularHumanFemale: ["herself"],
            thirdSingularNonhuman: ["itself"],
            secondPlural: ["yourselves", "one another"],
            thirdPlural: ["themselves", "one another"],
        })
        && frame.reciprocalRequiresPluralSubject === true;
    s.ok("reflexive dyads and subject-sensitive readings are derived by the shared object operation", reflexiveExact(reflexive));
    for (const mutate of [
        frame => { frame.personNumberDyads.firstSingular = "m-o"; },
        frame => { frame.readingsBySubject.thirdSingularHumanFemale = ["himself"]; },
        frame => { frame.readingsBySubject.secondPlural = ["yourselves"]; },
        frame => { frame.reciprocalRequiresPluralSubject = false; },
    ]) s.ok("a reflexive/reciprocal behavior mutation is observed", rejectsMutation(reflexiveExact, reflexive, mutate));

    return s;
}

module.exports = { run };
