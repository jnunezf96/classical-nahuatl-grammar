"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson5_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson5-review-ledger.json"
    ), "utf8"));
    const groupIds = [
        "lesson5-subject-paradigms",
        "lesson5-verbstem-categories",
        "lesson5-mood-tense-system",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writingRecords = records.filter((record) => record.proposedDirection === "BOTH");
    const subject = ctx.buildClassicalNahuatlSubjectParadigmSystemFrame();
    const verbstem = ctx.buildClassicalNahuatlVerbstemCategorySystemFrame();
    const mood = ctx.buildClassicalNahuatlMoodTenseFillerSystemFrame();

    const pairs = [
        ["ACI-P068-L006-E5F530E88C", subject.completeSubjectSet, ["1sg", "1pl", "2sg", "2pl", "3sg", "3pl"]],
        ["ACI-P068-L008-8339BD610D", subject.automaticEnglishSubjectCorrespondence, true],
        ["ACI-P068-L009-4B488D12BA", [subject.paradigmCount, subject.paradigmKinds], [4, ["main-indicative-and-past-optative", "future-preterit-indicative", "nonpast-optative", "nonpast-admonitive"]]],
        ["ACI-P068-L011-26C8D8CCD3", [subject.mainIndicativeTenses, subject.mainIndicative], [["present", "customary-present", "imperfect", "distant-past"], "main-indicative"]],
        ["ACI-P068-L012-2B2A462DB6", subject.mainIndicativeConnector, "0"],
        ["ACI-P068-L017-A6B7673EF4-02", subject.thirdCommon.formula, "#Ø-Ø(...+Ø-Ø#"],
        ["ACI-P068-L017-A6B7673EF4-03", subject.thirdCommon.interpretations.singularHumanMale, "he"],
        ["ACI-P068-L017-A6B7673EF4-04", subject.thirdCommon.interpretations.singularHumanFemale, "she"],
        ["ACI-P068-L017-A6B7673EF4-05", subject.thirdCommon.interpretations.singularAnimateNonhuman, "it"],
        ["ACI-P068-L017-A6B7673EF4-06", subject.thirdCommon.interpretations.singularNonanimate, "it"],
        ["ACI-P068-L017-A6B7673EF4-07", subject.thirdCommon.interpretations.pluralNonanimate, "they"],
        ["ACI-P068-L018-0EEEF40773", subject.thirdPluralAnimate.formula, "#Ø-Ø(...+Ø-h#"],
        ["ACI-P068-L018-0EEEF40773-02", subject.thirdPluralAnimate.person, "third"],
        ["ACI-P068-L018-0EEEF40773-03", subject.thirdPluralAnimate.number, "plural"],
        ["ACI-P068-L018-0EEEF40773-04", subject.thirdPluralAnimate.animacy, "animate"],
        ["ACI-P068-L018-0EEEF40773-05", subject.pastOptativeUsesMainParadigm, true],
        ["ACI-P068-L018-0EEEF40773-06", subject.secondPersonPastOptativePers1Variants, ["x", "xi"]],
        ["ACI-P068-L023-D96E5C517A", subject.futurePreterit, "future-preterit-indicative"],
        ["ACI-P068-L024-CACB480BD5-02", subject.futurePreteritGlossParity, true],
        ["ACI-P068-L027-E61AF11E5D", [subject.firstPluralFuturePreterit.futureFormula, subject.firstPluralFuturePreterit.preteritFormula], ["#t-Ø(...+qu-eh#", "#t-Ø(...+qu-eh#"]],
        ["ACI-P068-L027-E61AF11E5D-02", subject.firstPluralFuturePreterit.person, "first"],
        ["ACI-P068-L027-E61AF11E5D-03", subject.firstPluralFuturePreterit.number, "plural"],
        ["ACI-P068-L027-E61AF11E5D-04", subject.singularFuturePreteritConnectorAlternation.silentReplacesQui, true],
        ["ACI-P068-L029-F34FBD9C32", subject.singularFuturePreteritConnectorAlternation.limitedToSingular, true],
        ["ACI-P068-L030-652EE57238", subject.nonpastOptative, "nonpast-optative"],
        ["ACI-P068-L037-4C7397F1AB-02", subject.nonpastAdmonitiveFirstTwoPositionsUseMainFillers, true],

        ["ACI-P069-L004-4B15763778", verbstem.organizingCenter, "nemi"],
        ["ACI-P069-L008-B53886AC27", [verbstem.lexicalMeaningLocus, verbstem.valenceDeterminedByStem], ["lexical-meaning-locus", "intransitive"]],
        ["ACI-P069-L010-722A6847F7", verbstem.voiceFeatures, ["active", "nonactive"]],
        ["ACI-P069-L010-6C1C6869DD", verbstem.activeIsBasicSource, true],
        ["ACI-P069-L012-8270D0E821", [verbstem.nonactiveAuthorized, verbstem.nonactiveStem], [true, "nem-o-hua"]],
        ["ACI-P069-L013-6187845F89", verbstem.activeIsBasicSource, true],
        ["ACI-P069-L013-65DAECD870", verbstem.nonactiveUses, ["passive", "impersonal"]],
        ["ACI-P069-L015-70B6F8019A", verbstem.activeIsBasicSource, true],
        ["ACI-P069-L017-ECC049AFA4", verbstem.aspectFeatures, ["imperfective", "perfective"]],
        ["ACI-P069-L017-52D30AEE28", verbstem.imperfectiveMeaning, "ongoing-without-regard-to-beginning-or-end"],
        ["ACI-P069-L019-376EF1D004", verbstem.perfectiveMeaning, "beginning-or-end-boundary"],
        ["ACI-P069-L020-C75614B800", [verbstem.imperfectiveIsBasicSource, verbstem.imperfectiveStem, verbstem.imperfectiveAspect], [true, "nemi", "imperfective"]],
        ["ACI-P069-L021-42E3067B45", [verbstem.imperfectiveStem, verbstem.perfectiveStem], ["nemi", "nen"]],
        ["ACI-P069-L021-42E3067B45-02", [verbstem.imperfectiveStem, verbstem.perfectiveStem, verbstem.perfectiveAspect], ["nemi", "nen", "perfective"]],
        ["ACI-P069-L021-42E3067B45-03", [verbstem.perfectiveRequiredEvenWhenMappingIsUnpredictable, verbstem.lackOfPredictableRuleDoesNotMeanNoPerfective], [true, true]],
        ["ACI-P069-L024-3F84BB451E", [verbstem.contrastiveStemKindCount, verbstem.contrastiveDimensions], [8, ["aspect", "valence", "voice"]]],

        ["ACI-P069-L030-1A258F89B6", [mood.locus, mood.combinedCategories], ["tns", ["mood", "tense"]]],
        ["ACI-P069-L031-5D4049CD4B", mood.moods, { indicative: "report-fact", optative: "express-wish", admonitive: "express-warning" }],
        ["ACI-P069-L031-0D1B6E51FB", Object.keys(mood.moods), ["indicative", "optative", "admonitive"]],
        ["ACI-P069-L034-2445CDADC7", mood.tenseFeatures, ["past", "present", "future"]],
        ["ACI-P069-L035-91475DC064", mood.tenseFeatures.includes("past"), true],
        ["ACI-P069-L035-91475DC064-02", mood.tenseFeatures.includes("present"), true],
        ["ACI-P069-L035-91475DC064-03", mood.tenseFeatures.includes("future"), true],
        ["ACI-P069-L035-91475DC064-04", mood.tenseInteractsWithMood, true],
        ["ACI-P069-L035-91475DC064-05", mood.tenseInteractsWithAspect, true],
        ["ACI-P069-L035-91475DC064-06", Object.values(mood.aspectBySelection), ["imperfective", "imperfective", "imperfective", "imperfective", "perfective", "perfective", "imperfective", "imperfective", "perfective"]],
        ["ACI-P069-L039-CD46E6160B", mood.aspectBySelection, { indicativePresent: "imperfective", indicativeCustomaryPresent: "imperfective", indicativeImperfect: "imperfective", indicativeFuture: "imperfective", indicativePreterit: "perfective", indicativeDistantPast: "perfective", optativeNonpast: "imperfective", optativePast: "imperfective", admonitiveNonpast: "perfective" }],
        ["ACI-P070-L003-8D866138D0", [mood.aspectBySelection.optativeNonpast, mood.aspectBySelection.optativePast, mood.aspectBySelection.admonitiveNonpast], ["imperfective", "imperfective", "perfective"]],
        ["ACI-P070-L008-3B897B6D84", mood.indicative.present, "0"],
        ["ACI-P070-L008-3B897B6D84-02", mood.indicative.customaryPresent, "ni"],
        ["ACI-P070-L008-3B897B6D84-03", mood.indicative.imperfectCanonicalMorph, "yā"],
        ["ACI-P070-L009-2011BE5CCB", [mood.indicative.imperfectCanonicalMorph, mood.indicative.future, mood.indicative.preterit, mood.indicative.distantPast], ["yā", "z", "0", "ca"]],
        ["ACI-P070-L010-2B5709599B", mood.optative, { nonpast: "0", past: "ni" }],
        ["ACI-P070-L011-BD8C23BA27", mood.admonitive, { classA: "h", other: "0" }],
        ["ACI-P070-L017-55ACE00A59", mood.interpretationRanges.customaryPresent.includes("general-present"), true],
        ["ACI-P070-L017-55ACE00A59-02", mood.interpretationRanges.customaryPresent.includes("customary-present"), true],
        ["ACI-P070-L017-55ACE00A59-03", mood.interpretationRanges.customaryPresent.includes("habitual-present"), true],
        ["ACI-P070-L017-55ACE00A59-04", mood.interpretationRanges.customaryPresent.includes("usual-present"), true],
        ["ACI-P070-L017-55ACE00A59-05", mood.interpretationRanges.imperfect.includes("customary-past"), true],
        ["ACI-P070-L017-55ACE00A59-06", mood.interpretationRanges.imperfect.includes("habitual-past"), true],
        ["ACI-P070-L017-55ACE00A59-07", mood.interpretationRanges.imperfect.includes("past-habit"), true],
        ["ACI-P070-L017-55ACE00A59-08", mood.interpretationRanges.imperfect.includes("past-progressive"), true],
        ["ACI-P070-L024-2606AD2250", mood.interpretationRanges.distantPast.includes("simple-past-before-later-event"), true],
        ["ACI-P070-L024-2606AD2250-02", mood.interpretationRanges.distantPast[0], "simple-past-before-later-event"],
        ["ACI-P070-L024-2606AD2250-04", mood.interpretationRanges.distantPast.includes("past-perfect"), true],
        ["ACI-P070-L026-05496F04E9", mood.grammaticalTenseIsNotExistentialTime, true],
        ["ACI-P070-L027-3C8FC87DF3", mood.presentTenseMayReferToPastTimeInContext, true],
        ["ACI-P070-L030-51F97B458B", mood.singularNumberDyadAmbiguity, { futurePreterit: ["⎕", "qui"], nonpastOptative: ["⎕", "0"] }],
    ];

    const observations = new Map(pairs.map(([id, actual]) => [id, actual]));
    const expected = new Map(pairs.map(([id, , wanted]) => [id, wanted]));
    s.eq("accepted Lesson 5 Groups 7-9 cover every atom once", {
        records: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writingRecords.length,
        reading: records.length,
    }, { records: 114, unique: 114, writing: 74, reading: 114 });
    s.eq("every writing atom has its own exact normal-path observation", {
        observed: writingRecords.filter((record) => observations.has(record.atomId)).length,
        expected: writingRecords.filter((record) => expected.has(record.atomId)).length,
        missing: writingRecords.filter((record) => !observations.has(record.atomId) || !expected.has(record.atomId)).map((record) => record.atomId),
    }, { observed: 74, expected: 74, missing: [] });

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

    s.ok("all three canonical Results are owner-issued",
        ctx.isClassicalNahuatlSubjectParadigmSystemFrame(subject)
        && ctx.isClassicalNahuatlVerbstemCategorySystemFrame(verbstem)
        && ctx.isClassicalNahuatlMoodTenseFillerSystemFrame(mood));
    return s;
}

module.exports = { run };
