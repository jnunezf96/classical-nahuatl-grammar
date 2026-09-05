"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_destockal_class_b_stock_preservation_exact");
    // §24.5.6: ACI-P203-L004-321DD44966 is the rule; its -02/-03
    // examples are witnesses, not lexical permission or direct atom receipts.
    const application = (stem, extra = {}) => ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: stem, verbClass: "B", sourceValence: "intransitive",
        sourceSubject: "3sg", subject: "3sg", mood: "indicative", tense: "preterit",
        requestedDerivation: "direct", requestedVoice: "active", outputScope: "single",
        ...extra,
    });
    const source = stem => ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
        subject: "3sg", mood: "indicative", tense: "present", verbClass: "B",
        valence: "intransitive", transitivity: "intransitive", objectKind: "none",
    });
    const perfective = (stem, classId = "B") =>
        ctx.getClassicalNahuatlPerfectiveStem(stem, { classId });

    s.eq("the class owner applies the productive rule, not an exact stock-shortening override",
        ["chay-ā-hui", "chay-ā-hu-a"].map(stem => {
            const frame = perfective(stem);
            return [frame.perfectiveStem, frame.changeRule];
        }), [
            ["chay-ā-uh", "class-b-w-change-hu-to-uh"],
            ["chay-ā-uh", "class-b-w-change-hu-to-uh"],
        ]);

    for (const [stem, expectedStem, surface] of [
        ["chay-ā-hui", "chay-ā-uh", "chayāuh"],
        ["pey-ō-ni", "pey-ō-n", "peyōn"],
        ["chip-ī-ni", "chip-ī-n", "chipīn"],
        ["tlap-ī-hui", "tlap-ī-uh", "tlapīuh"],
        ["xep-ā-hui", "xep-ā-uh", "xepāuh"],
        ["xep-a-hui", "xep-a-uh", "xepauh"],
    ]) {
        const app = application(stem);
        s.eq(`${stem}: normal Class B preserves the stock in formula and surface`, {
            status: app.authorizationStatus,
            canonical: ctx.isClassicalNahuatlVncApplicationFrame(app),
            resultCanonical: ctx.isClassicalNahuatlVncApplicationResultFrame(app.resultFrame),
            formula: app.resultFrame.formulaRealization,
            surface: app.resultFrame.surfaceRealization,
        }, {
            status: "authorized", canonical: true, resultCanonical: true,
            formula: `#0-0(${expectedStem})0+⎕-0#`, surface,
        });
    }

    // §24.5.8: 3EF3B0BE62 and F1EA346E69 distinguish the classes
    // of signed replacement and addition, not classes guessed from display.
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source("chay-ā-hui"), {
        derivationType: "causative",
    });
    for (const [targetClass, targetStem, expectedPerfective, expectedSurfaceEnding] of [
        ["B", "chay-ā-hu-a", "chay-ā-uh", "chayāuh"],
        ["C", "chay-ā-hui-ā", "chay-ā-hui-h", "chayāhuih"],
    ]) {
        const option = inventory.options.find(candidate =>
            candidate.targetStem === targetStem && candidate.targetClass === targetClass);
        const app = application("chay-ā-hui", {
            requestedDerivation: "causative", derivationOptionId: option?.optionId || "missing",
            subject: "1sg", causativeObjectKind: "specific-projective",
        });
        s.eq(`signed causative ${targetClass} retains its own perfective procedure`, {
            inventoryCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
            target: option?.targetStem, targetClass: option?.targetClass,
            perfective: option && perfective(option.targetStem, option.targetClass).perfectiveStem,
            status: app.authorizationStatus,
            canonical: ctx.isClassicalNahuatlVncApplicationFrame(app),
            formulaOwnsPerfective: app.resultFrame.formulaRealization.includes(`(${expectedPerfective})`),
            surfacePreservesStock: app.resultFrame.surfaceRealization.endsWith(expectedSurfaceEnding),
        }, {
            inventoryCanonical: true, target: targetStem, targetClass,
            perfective: expectedPerfective, status: "authorized", canonical: true,
            formulaOwnsPerfective: true, surfacePreservesStock: true,
        });
    }
    const corrected = application("chay-ā-hui");
    s.eq("serialized output cannot mint canonical application authority", [
        ctx.isClassicalNahuatlVncApplicationFrame(JSON.parse(JSON.stringify(corrected))),
        ctx.isClassicalNahuatlVncDerivationOptionInventory(JSON.parse(JSON.stringify(inventory))),
    ], [false, false]);
    return s;
}

module.exports = { run };
