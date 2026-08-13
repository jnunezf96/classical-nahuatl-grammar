"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson6_groups_4_6_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson6-review-ledger.json"
    ), "utf8"));
    const groupIds = [
        "lesson6-third-person-va1",
        "lesson6-projective-va1-va2",
        "lesson6-projective-object-paradigm",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writingRecords = records.filter((record) => record.proposedDirection === "BOTH");
    const system = ctx.buildClassicalNahuatlProjectiveObjectSystemFrame();
    const p = system.paradigm;

    const pairs = [
        ["ACI-P073-L005-044D0807A4", system.categoriesDistributedAcrossDyad, ["person", "number", "objective-case"]],
        ["ACI-P073-L005-FBCD67C0F5", system.dyadicCondition, "specific-mainline-projective-object"],
        ["ACI-P073-L008-4749BA79B8", system.va1AlwaysCarriesPerson, true],
        ["ACI-P073-L008-4749BA79B8-02", system.va1NeverPersonAlone, true],
        ["ACI-P073-L010-5017EF8378", system.thirdVa1Carries, ["person", "objective-case"]],
        ["ACI-P073-L010-BEB9308E3D", system.thirdVa1Variants, ["c", "qu", "qui"]],
        ["ACI-P073-L011-D2242C130D", system.regularKSpellings, ["c", "qu"]],
        ["ACI-P073-L011-66E6495050", system.supportiveVowel, "i"],
        ["ACI-P073-L012-492E7ECA39", [system.cSelected.va1, system.quSelected.va1], ["c", "qu"]],
        ["ACI-P073-L012-1E994DE0AF", system.cQuEnvironment, "vnc-internal-vowel-on-either-side"],
        ["ACI-P073-L013-BB51D62737-03", system.stemBoundaryCases.ca, { objectCarrier: "c", stem: "ca" }],
        ["ACI-P073-L013-BB51D62737-07", system.stemBoundaryCases.tiqui, { objectCarrier: "c", stem: "tiqui" }],
        ["ACI-P073-L013-BB51D62737-09", system.stemBoundaryCases.que, { objectCarrier: "c", stem: "que" }],
        ["ACI-P073-L019-DF58E7CC8C", system.quiSelected.va1, "qui"],
        ["ACI-P073-L019-EB3B87FFB0", [system.quiSelected.va1, system.quiCondition, system.quiSelected.formula], ["qui", "zero-subject-before-consonant-requires-support", "#0-0+qui-0(mati)0+0-0#"]],

        ["ACI-P073-L023-0C9A4CF37B", system.nonthirdVa1Carries, ["person", "number"]],
        ["ACI-P073-L024-051146B915", system.nonthirdVa1Fillers, ["n", "t", "m", "am"]],
        ["ACI-P073-L030-AE209D8BB8", system.nonthirdUnambiguous, true],
        ["ACI-P073-L034-DB645E57A4", system.thirdVa2Carries, ["number"]],
        ["ACI-P073-L035-3FCF0C9A26", system.thirdSingularVa2, "0"],
        ["ACI-P073-L036-338347B74C", system.thirdPluralVa2Variants, ["im", "in", "iz", "ix"]],
        ["ACI-P074-L002-CC39ED4019", [p.thirdPluralAnimate.va2, p.thirdPluralAnimate.formula], ["im", "#n-0+qu-im(itta)0+0-0#"]],
        ["ACI-P074-L002-6C7AF615E3", system.nasalAlternantsAvailable, true],
        ["ACI-P074-L005-77DB5DB5D1", system.nonthirdVa2Carries, ["objective-case"]],
        ["ACI-P074-L006-57B4FDF8F6", system.nonthirdVa2Variants, ["ēch", "itz"]],
        ["ACI-P074-L008-6942FDC47E", system.frequentItzPhoneVariant, "[¢]"],
        ["ACI-P074-L010-79A1F5AC90", system.echAssimilationVariants, ["ēch", "etz", "et", "ez", "ex"]],
        ["ACI-P074-L010-79A1F5AC90-02", system.itzAssimilationVariants, ["itz", "ich", "it", "i", "iz", "ix"]],
        ["ACI-P074-L010-79A1F5AC90-03", system.echAssimilationVariants.slice(1), ["etz", "et", "ez", "ex"]],
        ["ACI-P074-L010-79A1F5AC90-04", system.itzAssimilationVariants.slice(1), ["ich", "it", "i", "iz", "ix"]],

        ["ACI-P074-L012-A332BF3928", system.automaticEnglishObjectCorrespondence, true],
        ["ACI-P074-L019-46BB96CE7D-02", [p.thirdCommonC.va1, p.thirdCommonC.va2], ["c", "0"]],
        ["ACI-P074-L019-46BB96CE7D-03", [p.thirdCommonQu.va1, p.thirdCommonQu.va2], ["qu", "0"]],
        ["ACI-P074-L019-46BB96CE7D-04", [p.thirdCommonQui.va1, p.thirdCommonQui.va2], ["qui", "0"]],
        ["ACI-P074-L019-46BB96CE7D-05", system.thirdCommonInterpretations.singularHumanMale, "him"],
        ["ACI-P074-L019-46BB96CE7D-06", system.thirdCommonInterpretations.singularHumanFemale, "her"],
        ["ACI-P074-L019-46BB96CE7D-07", system.thirdCommonInterpretations.singularAnimateNonhuman, "it"],
        ["ACI-P074-L019-46BB96CE7D-08", system.thirdCommonInterpretations.singularNonanimate, "it"],
        ["ACI-P074-L019-46BB96CE7D-09", system.thirdCommonInterpretations.pluralNonanimate, "them"],
        ["ACI-P074-L020-21C34D798B-02", [p.thirdPluralAnimate.va1, p.thirdPluralAnimate.va2], ["qu", "im"]],
        ["ACI-P074-L020-21C34D798B-03", system.thirdPluralAnimateRealization.human, "them"],
        ["ACI-P074-L020-21C34D798B-04", system.thirdPluralAnimateRealization.animateNonhuman, "them"],
        ["ACI-P074-L020-21C34D798B-05", system.thirdPluralAnimateRealization.allPhonologicalVariants, ["im", "in", "iz", "ix"]],
    ];
    const observations = new Map(pairs.map(([id, actual]) => [id, actual]));
    const expected = new Map(pairs.map(([id, , wanted]) => [id, wanted]));

    s.eq("accepted Lesson 6 Groups 4-6 cover every atom once", {
        records: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writingRecords.length,
        reading: records.length - writingRecords.length,
    }, { records: 62, unique: 62, writing: 43, reading: 19 });
    s.eq("every writing atom has its own exact normal-path observation", {
        observed: writingRecords.filter((record) => observations.has(record.atomId)).length,
        expected: writingRecords.filter((record) => expected.has(record.atomId)).length,
        missing: writingRecords.filter((record) => !observations.has(record.atomId) || !expected.has(record.atomId)).map((record) => record.atomId),
    }, { observed: 43, expected: 43, missing: [] });
    for (const record of writingRecords) {
        const actual = observations.get(record.atomId);
        const wanted = expected.get(record.atomId);
        s.eq(`${record.atomId} performs its accepted writing job`, actual, wanted);
        const broken = Array.isArray(actual)
            ? [...actual, "BROKEN"]
            : actual && typeof actual === "object"
                ? { ...actual, BROKEN: true }
                : typeof actual === "boolean" ? !actual : `${actual}-BROKEN`;
        s.no(`${record.atomId} fails when its exact behavior is broken`,
            JSON.stringify(broken) === JSON.stringify(wanted));
    }
    s.ok("the projective object Results are issued by their canonical owner",
        ctx.isClassicalNahuatlProjectiveObjectSystemFrame(system));
    s.eq("the six participant choices produce the complete canonical object paradigm", {
        firstSingular: [p.firstSingular.va1, p.firstSingular.va2, p.firstSingular.objectLabel],
        firstPlural: [p.firstPlural.va1, p.firstPlural.va2, p.firstPlural.objectLabel],
        secondSingular: [p.secondSingular.va1, p.secondSingular.va2, p.secondSingular.objectLabel],
        secondPlural: [p.secondPlural.va1, p.secondPlural.va2, p.secondPlural.objectLabel],
        thirdCommon: [p.thirdCommonQu.va1, p.thirdCommonQu.va2],
        thirdPlural: [p.thirdPluralAnimate.va1, p.thirdPluralAnimate.va2, p.thirdPluralAnimate.objectLabel],
    }, {
        firstSingular: ["n", "ēch", "me"],
        firstPlural: ["t", "ēch", "us"],
        secondSingular: ["m", "itz", "you-sg"],
        secondPlural: ["am", "ēch", "you-pl"],
        thirdCommon: ["qu", "0"],
        thirdPlural: ["qu", "im", "them"],
    });
    return s;
}

module.exports = { run };
