"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson6_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson6-review-ledger.json"
    ), "utf8"));
    const groupIds = [
        "lesson6-object-category-system",
        "lesson6-monadic-valence",
        "lesson6-dyadic-valence",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writingRecords = records.filter((record) => record.proposedDirection === "BOTH");
    const system = ctx.buildClassicalNahuatlTransitiveVncFormulaSystemFrame();
    const monadic = ctx.buildClassicalNahuatlMonadicObjectSystemFrame();

    const pairs = [
        ["ACI-P071-L004-DA38E299B2", system.onlyValenceDiffers, true],
        ["ACI-P071-L007-D6ED2396D6", system.valenceCategories, ["person", "number", "objective-case"]],
        ["ACI-P071-L008-AD58C8E010", system.caseFeature, "objective"],
        ["ACI-P071-L009-B391E448E5", [system.trajectoryFeatures, system.specificityFeatures, system.prominenceFeatures], [["projective", "reflexive", "reciprocative"], ["specific", "nonspecific"], ["mainline", "shuntline"]]],
        ["ACI-P071-L012-23E271B009", system.trajectoryFeatures, ["projective", "reflexive", "reciprocative"]],
        ["ACI-P071-L012-7D4718B4BA", system.projectiveAffectsEntityOtherThanSubject, true],
        ["ACI-P071-L012-9288A87D07", system.observedObjectFrames.specificProjective.trajectory, "projective"],
        ["ACI-P071-L014-4E2F56927C", system.reflexiveAffectsSubjectReferent, true],
        ["ACI-P071-L015-F64F16E273", system.reciprocativeRequiresTwoOrMoreMatchingParticipants, true],
        ["ACI-P071-L015-32DE09BB0A", [system.reflexiveAffectsSubjectReferent, system.reciprocativeRequiresTwoOrMoreMatchingParticipants], [true, true]],
        ["ACI-P071-L019-7AAEAAF51C", system.specificityFeatures, ["specific", "nonspecific"]],
        ["ACI-P071-L019-76A543FEF2", system.observedObjectFrames.specificProjective.specificity, "specific"],
        ["ACI-P071-L020-C1C02C75A7", system.specificPronounClass, "personal-pronoun"],
        ["ACI-P071-L021-F96290B901", system.observedObjectFrames.nonspecificHuman.specificity, "nonspecific"],
        ["ACI-P071-L022-C811452B5B", system.nonspecificPronounClass === "personal-pronoun", false],
        ["ACI-P071-L022-C811452B5B-02", system.nonspecificPronounClass, "indefinite-pronoun"],
        ["ACI-P071-L022-C811452B5B-03", system.nonspecificNominativeCorrespondence, "third-person-personal-pronoun"],
        ["ACI-P071-L022-C811452B5B-04", system.nonspecificNominativeRequiresNonactiveVerbstem, true],
        ["ACI-P071-L026-FB1F1484E4", system.prominenceFeatures, ["mainline", "shuntline"]],
        ["ACI-P071-L026-E5FBEF0694", system.prominenceSelectedByMorphosyntax, true],
        ["ACI-P071-L027-FBF85B199E", system.newlyAddedObjectBecomesMainline, true],
        ["ACI-P071-L028-4C3EED8269", system.earlierObjectDemotedToShuntline, true],
        ["ACI-P071-L028-E6BDD97DE3", [system.newlyAddedObjectBecomesMainline, system.earlierObjectDemotedToShuntline], [true, true]],

        ["ACI-P072-L002-47F1830B99", [monadic.valenceArity, monadic.valencePosition], ["monadic", "va"]],
        ["ACI-P072-L005-833314E443", monadic.formulaTemplate, "#pers1-pers2+va(STEM)tns+num1-num2#"],
        ["ACI-P072-L006-EC368EA490", [system.monadicArity, system.monadicFormula], ["monadic", "#n-0+tē(itta)0+0-0#"]],
        ["ACI-P072-L012-57B42F69F3", monadic.shuntlineReflexiveMorph, "ne"],
        ["ACI-P072-L014-454D5360C7", [monadic.nonspecificProjective, monadic.humanMorph, monadic.nonhumanMorph], [true, "tē", "tla"]],
        ["ACI-P072-L015-597D3742E2", [monadic.humanMorph, monadic.humanMeanings], ["tē", ["someone", "anyone", "people-in-general", "everyone", "all"]]],
        ["ACI-P072-L016-CFD3333900", [monadic.nonhumanMorph, monadic.nonhumanMeanings], ["tla", ["something", "anything", "things-in-general", "everything"]]],
        ["ACI-P072-L017-4F0BE9C260", monadic.pronounClass, "indefinite-pronoun"],
        ["ACI-P072-L017-A707ACD636", monadic.somethingIncludesAnimateOrNonanimate, true],
        ["ACI-P072-L017-A707ACD636-02", monadic.somethingIncludesAnimateOrNonanimate, true],
        ["ACI-P072-L017-A707ACD636-03", monadic.humanNonhumanContrastIsNotAnimacy, true],
        ["ACI-P072-L017-A707ACD636-04", monadic.humanNonhumanContrastIsHumanness, true],
        ["ACI-P072-L021-9ED887DDC8", [monadic.humanClass, monadic.humanMorph], ["human", "tē"]],
        ["ACI-P072-L022-492C280A9A", [monadic.nonhumanClass, monadic.nonhumanMorph, monadic.mainlineAndShuntlineUseSameNonspecificForms], ["nonhuman", "tla", true]],
        ["ACI-P072-L028-C27FDCA929", monadic.nonhumanMayReferToPeopleGenerally, true],

        ["ACI-P072-L030-5D09A9B56D", system.dyadicCategories, ["trajectory", "person", "number", "objective-case"]],
        ["ACI-P072-L030-931DB0E04A", [system.observedObjectFrames.specificProjective.specificity, system.observedObjectFrames.specificProjective.prominence], ["specific", "mainline"]],
        ["ACI-P072-L032-302FC5EE6C", [system.dyadicArity, system.dyadicCategories], ["dyadic", ["trajectory", "person", "number", "objective-case"]]],
        ["ACI-P072-L035-721779DDFC", system.dyadicTemplate, "#pers1-pers2+va1-va2(STEM)tns+num1-num2#"],
        ["ACI-P072-L036-9C0F35E94F", [system.dyadicArity, system.dyadicFormula], ["dyadic", "#n-0+qu-0(itta)0+0-0#"]],
    ];
    const observations = new Map(pairs.map(([id, actual]) => [id, actual]));
    const expected = new Map(pairs.map(([id, , wanted]) => [id, wanted]));

    s.eq("accepted Lesson 6 Groups 1-3 cover every atom once", {
        records: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writingRecords.length,
        reading: records.length,
    }, { records: 50, unique: 50, writing: 43, reading: 50 });
    s.eq("every writing atom has its own exact normal-path observation", {
        observed: writingRecords.filter((record) => observations.has(record.atomId)).length,
        expected: writingRecords.filter((record) => expected.has(record.atomId)).length,
        missing: writingRecords.filter((record) => !observations.has(record.atomId) || !expected.has(record.atomId)).map((record) => record.atomId),
    }, { observed: 43, expected: 43, missing: [] });
    for (const record of writingRecords) {
        const actual = observations.get(record.atomId);
        const wanted = expected.get(record.atomId);
        s.eq(`${record.atomId} performs its accepted writing job`, actual, wanted);
        const broken = JSON.parse(JSON.stringify(actual));
        if (Array.isArray(broken)) broken.push("BROKEN");
        else if (broken && typeof broken === "object") broken.BROKEN = true;
        else if (typeof broken === "boolean") observations.set(record.atomId, !broken);
        else observations.set(record.atomId, `${broken}-BROKEN`);
        if (Array.isArray(broken) || (broken && typeof broken === "object")) observations.set(record.atomId, broken);
        s.no(`${record.atomId} fails when its exact behavior is broken`,
            JSON.stringify(observations.get(record.atomId)) === JSON.stringify(wanted));
    }
    s.ok("the transitive object Results are issued by their canonical owners",
        ctx.isClassicalNahuatlTransitiveVncFormulaSystemFrame(system)
        && ctx.isClassicalNahuatlMonadicObjectSystemFrame(monadic));
    return s;
}

module.exports = { run };
