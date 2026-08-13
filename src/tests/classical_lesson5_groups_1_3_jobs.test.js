"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson5_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson5-review-ledger.json"
    ), "utf8"));
    const groupIds = [
        "lesson5-intransitive-vnc-structure",
        "lesson5-morph-carrier-and-spelling",
        "lesson5-subject-person-fillers",
    ];
    const records = ledger.records.filter((record) => groupIds.includes(record.reviewGroupId));
    const writingRecords = records.filter((record) => record.proposedDirection === "BOTH");

    const application = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:nuclear-clause",
        args: ["nemi", { tenseMode: "verb", transitivity: "intransitive" }],
    }).canonicalResult;
    const formulaFrame = ctx.buildClassicalNahuatlIntransitiveVncFormulaSystemFrame();
    const system = ctx.buildClassicalNahuatlSubjectPersonDyadSystemFrame();
    const person = (subject, mood = "indicative", stem = "mati") =>
        ctx.getClassicalNahuatlFiniteSubjectPersonDyad(subject, mood, { stem });
    const first = person("1sg");
    const firstBeforeVowel = person("1sg", "indicative", "aqui");
    const second = person("2sg");
    const firstPlural = person("1pl");
    const secondOptative = person("2sg", "optative");
    const secondPluralBeforeVowel = person("2pl", "indicative", "aqui");
    const secondPluralBeforeM = person("2pl", "indicative", "mati");
    const secondPluralBeforeP = person("2pl", "indicative", "pāqui");
    const secondPluralBeforeZ = person("2pl", "indicative", "zaca");
    const secondPluralBeforeX = person("2pl", "indicative", "xōchiti");
    const third = person("3sg");
    const morph = first.morphCarrierAnalysis;

    const observations = new Map([
        ["ACI-P065-L005-0102F13AC5", [formulaFrame.transitivity, application.slotArity]],
        ["ACI-P065-L007-2B513828F3", formulaFrame.structuralFormula],
        ["ACI-P065-L009-52BA816055", [formulaFrame.formulaSlots, application.structureFrame.selectedFormulaShape.implicitPositionPolicy]],
        ["ACI-P065-L013-9EEE5533B4", application.formulaSlots],
        ["ACI-P065-L015-B2AA347CEB", [application.formulaSlots.includes("animacy"), application.formulaSlots.includes("humanness")]],
        ["ACI-P065-L017-8EB67E907B", application.formulaSlots.filter((slot) => ["pers1", "pers2", "num1", "num2"].includes(slot))],

        ["ACI-P065-L020-2B82CA9192", [morph.morphIdentity, morph.realizedCarrier]],
        ["ACI-P065-L023-D38A359CF3", [first.pers1, first.pers2]],
        ["ACI-P065-L024-FDBCD6D91E", morph.realizedCarrier],
        ["ACI-P065-L024-FDBCD6D91E-02", morph.carrierKind],
        ["ACI-P065-L024-FDBCD6D91E-03", third.morphCarrierAnalysis.carrierKind],
        ["ACI-P065-L024-FDBCD6D91E-04", morph.morphAndCarrierAreDistinct],
        ["ACI-P066-L002-606A9CC794", [first.pers1, application.formulaRealization.includes("[")]],
        ["ACI-P066-L004-623F59276F", morph.regularVariantListedFirst],
        ["ACI-P066-L005-D783C20235-03", morph.spellingDoesNotCreateMorphIdentity],
        ["ACI-P066-L005-D783C20235-04", morph.canonicalContrastExample.spellingVariantsOfOneMorph],
        ["ACI-P066-L008-A3F24C5A42-02", morph.canonicalContrastExample.distinctMorphicVariant],
        ["ACI-P066-L008-A3F24C5A42-03", morph.canonicalContrastExample.distinctVariantRealization],

        ["ACI-P066-L014-5F1BC4F2B7", system.locus],
        ["ACI-P066-L014-3FFC7C76D3", [system.fillers.third, system.fillers.secondSingular]],
        ["ACI-P066-L014-3FFC7C76D3-02", [secondOptative.pers1Variants, system.fillers.secondPluralVariants]],
        ["ACI-P066-L014-3FFC7C76D3-03", [system.fillers.firstSingular, system.fillers.firstPlural, secondOptative.optativeSecondPersonUsesX]],
        ["ACI-P066-L023-819EABE402", [second.pers1BaseMorph, firstPlural.pers1BaseMorph, secondOptative.pers1BaseMorph]],
        ["ACI-P066-L024-8BF9B5C6AB", system.secondSingularFirstPluralPers1Homophonous],
        ["ACI-P066-L024-8BF9B5C6AB-02", second.pers1BaseMorph === firstPlural.pers1BaseMorph],
        ["ACI-P066-L024-8BF9B5C6AB-03", system.numberSuffixRequiredForSecondSingularFirstPluralDisambiguation],
        ["ACI-P066-L028-2D04EA9809", [first.pers1SupportiveVowel, second.pers1SupportiveVowel, secondOptative.pers1SupportiveVowel]],
        ["ACI-P066-L028-22E934D505", [first.pers1SupportiveVowelPresent, firstBeforeVowel.pers1SupportiveVowelPresent]],
        ["ACI-P066-L029-F5311302DA", secondPluralBeforeVowel.pers1],
        ["ACI-P066-L029-F5311302DA-02", secondPluralBeforeM.pers1],
        ["ACI-P066-L029-F5311302DA-03", secondPluralBeforeP.pers1],
        ["ACI-P066-L029-F5311302DA-05", [secondPluralBeforeZ.pers1, secondPluralBeforeX.pers1, system.allLicensedSecondPluralNasalAssimilationsAvailable]],
    ]);

    const expected = new Map([
        ["ACI-P065-L005-0102F13AC5", ["intransitive", "vacant"]],
        ["ACI-P065-L007-2B513828F3", "#pers1-pers2(nemi)tns+num1-num2#"],
        ["ACI-P065-L009-52BA816055", [["pers1", "pers2", "stem", "tns", "num1", "num2"], "grammatically-present-but-not-written-as-a-position"]],
        ["ACI-P065-L013-9EEE5533B4", ["pers1", "pers2", "stem", "tns", "num1", "num2"]],
        ["ACI-P065-L015-B2AA347CEB", [false, false]],
        ["ACI-P065-L017-8EB67E907B", ["pers1", "pers2", "num1", "num2"]],
        ["ACI-P065-L020-2B82CA9192", ["n", "ni"]],
        ["ACI-P065-L023-D38A359CF3", ["ni", "0"]],
        ["ACI-P065-L024-FDBCD6D91E", "ni"],
        ["ACI-P065-L024-FDBCD6D91E-02", "phonic"],
        ["ACI-P065-L024-FDBCD6D91E-03", "sigic"],
        ["ACI-P065-L024-FDBCD6D91E-04", true],
        ["ACI-P066-L002-606A9CC794", ["ni", false]],
        ["ACI-P066-L004-623F59276F", true],
        ["ACI-P066-L005-D783C20235-03", true],
        ["ACI-P066-L005-D783C20235-04", ["tēuc", "tēcu"]],
        ["ACI-P066-L008-A3F24C5A42-02", "tēe"],
        ["ACI-P066-L008-A3F24C5A42-03", "delabialized-/kw/-as-[k]"],
        ["ACI-P066-L014-5F1BC4F2B7", "pers1"],
        ["ACI-P066-L014-3FFC7C76D3", ["0", "t"]],
        ["ACI-P066-L014-3FFC7C76D3-02", [["x", "xi"], ["am", "an", "az", "ax"]]],
        ["ACI-P066-L014-3FFC7C76D3-03", ["n", "t", true]],
        ["ACI-P066-L023-819EABE402", ["t", "t", "x"]],
        ["ACI-P066-L024-8BF9B5C6AB", true],
        ["ACI-P066-L024-8BF9B5C6AB-02", true],
        ["ACI-P066-L024-8BF9B5C6AB-03", true],
        ["ACI-P066-L028-2D04EA9809", ["i", "i", "i"]],
        ["ACI-P066-L028-22E934D505", [true, false]],
        ["ACI-P066-L029-F5311302DA", "am"],
        ["ACI-P066-L029-F5311302DA-02", "am"],
        ["ACI-P066-L029-F5311302DA-03", "am"],
        ["ACI-P066-L029-F5311302DA-05", ["az", "ax", true]],
    ]);

    s.eq("accepted Lesson 5 Groups 1-3 cover every atom once", {
        records: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writingRecords.length,
        reading: records.length,
    }, { records: 47, unique: 47, writing: 32, reading: 47 });
    s.eq("every writing atom has its own exact normal-path observation", {
        observed: writingRecords.filter((record) => observations.has(record.atomId)).length,
        expected: writingRecords.filter((record) => expected.has(record.atomId)).length,
        missing: writingRecords.filter((record) => !observations.has(record.atomId) || !expected.has(record.atomId)).map((record) => record.atomId),
    }, { observed: 32, expected: 32, missing: [] });

    for (const record of writingRecords) {
        const actual = observations.get(record.atomId);
        const wanted = expected.get(record.atomId);
        s.eq(`${record.atomId} performs its accepted writing job`, actual, wanted);
        const broken = JSON.parse(JSON.stringify(actual));
        if (Array.isArray(broken)) {
            broken.push("BROKEN");
            observations.set(record.atomId, broken);
        }
        else if (typeof broken === "boolean") observations.set(record.atomId, !broken);
        else observations.set(record.atomId, `${broken}-BROKEN`);
        const mutated = observations.get(record.atomId);
        s.no(`${record.atomId} fails when its exact behavior is broken`,
            JSON.stringify(mutated) === JSON.stringify(wanted));
    }

    return s;
}

module.exports = { run };
