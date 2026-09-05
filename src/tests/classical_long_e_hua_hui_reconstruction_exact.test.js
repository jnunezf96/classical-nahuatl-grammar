"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_long_e_hua_hui_reconstruction_exact");
    const application = (stem, verbClass = "B", extra = {}) => ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: stem, verbClass, sourceValence: "intransitive",
        sourceSubject: "3sg", subject: "3sg", requestedDerivation: "direct",
        requestedVoice: "active", mood: "indicative", tense: "present", outputScope: "single",
        ...extra,
    });
    const source = stem => ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
        subject: "3sg", mood: "indicative", tense: "present", verbClass: "B",
        valence: "intransitive", transitivity: "intransitive", objectKind: "none",
    });
    const coalescence = app => app.resultFrame.finiteSurfaceFrame.neighboringBoundaries.find(boundary =>
        boundary.appliedRuleIds.includes("cn-l24-identical-root-stock-vowel-coalescence"));

    // ACI-P204-L004-AE01B03F8B and -02: user-corrected long stock ē.
    // Source morphology is retained in Formula; Surface contracts e + ē.
    for (const [stem, verbClass, parts] of [
        ["cē-hui", "B", ["ce", "ē", "hui"]],
        ["ce-ē-hui", "B", ["ce", "ē", "hui"]],
        ["e-ē-hui", "B", ["e", "ē", "hui"]],
        ["ce-ē-hua", "A", ["ce", "ē", "hua"]],
        ["e-ē-hua", "A", ["e", "ē", "hua"]],
    ]) {
        const display = ctx.buildClassicalNahuatlVncSourceConstitutionProjection({
            sourceStem: stem, verbClass, sourceValence: "intransitive", requestedDerivation: "direct",
        }, ctx);
        s.eq(`${stem} preserves the corrected stock and its own theme in Source`, [
            display.parts.map(part => [part.segment, part.role]), display.grammarAuthority,
        ], [[
            [parts[0], "root"], [parts[1], "stock formative"], [parts[2], "stem formative"],
        ], false]);
    }
    for (const [stem, verbClass, tense, formulaStem, surface, root] of [
        ["ce-ē-hui", "B", "present", "ce-ē-hui", "cēhui", "ce"],
        ["e-ē-hui", "B", "present", "e-ē-hui", "ēhui", "e"],
        ["ce-ē-hua", "A", "present", "ce-ē-hua", "cēhua", "ce"],
        ["e-ē-hua", "A", "present", "e-ē-hua", "ēhua", "e"],
        ["ce-ē-hui", "B", "preterit", "ce-ē-uh", "cēuh", "ce"],
        ["e-ē-hui", "B", "preterit", "e-ē-uh", "ēuh", "e"],
        ["xe-ē-hui", "B", "present", "xe-ē-hui", "xēhui", "xe"],
    ]) {
        const app = application(stem, verbClass, { tense });
        const boundary = coalescence(app);
        const morphology = boundary?.applicableRuleFrames[0]?.sourceMorphologyFrame;
        s.eq(`${stem} ${tense}: the canonical boundary owner contracts without rewriting Formula`, {
            status: app.authorizationStatus,
            canonical: ctx.isClassicalNahuatlVncApplicationFrame(app),
            formula: app.resultFrame.formulaRealization,
            surface: app.resultFrame.surfaceRealization,
            sourceBoundary: [morphology?.root, morphology?.stockFormative, morphology?.outputVowel],
            formulaChanged: boundary?.formulaCarrierChangedByWrittenBoundary,
            writtenStock: boundary?.rightSurfaceAfter,
        }, {
            status: "authorized", canonical: true,
            formula: `#0-0(${formulaStem})0+${tense === "preterit" ? "⎕" : "0"}-0#`, surface,
            sourceBoundary: [root, "ē", "ē"], formulaChanged: false, writtenStock: "",
        });
    }
    const analyze = stem => ctx.buildClassicalNahuatlVncDerivationSourceAnalysisFrame(source(stem));
    const exactAnalyses = ["cē-hui", "cēhui", "ce-ē-hui"].map(analyze);
    s.eq("reconstructed and contracted spellings select the same signed lexical reconstruction",
        exactAnalyses.map(frame => {
            const analysis = frame.analyses.find(item => item.category === "fused-destockal-hui-exact");
            return [ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(frame), analysis?.analysisId,
                analysis?.segments, analysis?.lexicalStatus, analysis?.destockalStructureFrame?.typeId];
        }), Array.from({ length: 3 }, () => [true,
            "cn-l24-2459-cehui-fused-destockal:fused-destockal-hui-exact", ["ce", "ē", "hui"],
            "lexically-licensed-source-analysis", "long-vowel-ni-or-hui"]));
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source("ce-ē-hui"), { derivationType: "causative" });
    const option = inventory.options.find(item => item.derivationRoute === "type-one-fused-destockal-cehui-addition-exact");
    const caused = application("ce-ē-hui", "B", {
        requestedDerivation: "causative", derivationOptionId: option?.optionId || "missing",
        subject: "1sg", causativeObjectKind: "specific-projective",
    });
    s.eq("the corrected reconstruction reaches its existing exact causative owner", [
        ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory), option?.targetConstruction.underlyingSource,
        option?.targetStem, option?.targetClass, caused.authorizationStatus,
        caused.resultFrame.formulaRealization.includes("(cē-hui-a)"),
        caused.resultFrame.surfaceRealization.endsWith("cēhuia"),
    ], [true, "ce-ē-hui", "cē-hui-ā", "C", "authorized", true, true]);
    s.eq("nonmatching or short stocks do not acquire long-ē contraction", ["ca-ē-hui", "ce-e-hui"].map(stem => {
        const app = application(stem);
        return [app.authorizationStatus, app.resultFrame.surfaceRealization, Boolean(coalescence(app))];
    }), [["authorized", "caēhui", false], ["authorized", "ceehui", false]]);
    const corrected = application("ce-ē-hui");
    const editedSurface = JSON.parse(JSON.stringify(corrected.resultFrame.finiteSurfaceFrame));
    editedSurface.wordRealization = "ceēhui";
    s.eq("edited surface and copied application cannot mint canonical authority", [
        ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(JSON.parse(JSON.stringify(exactAnalyses[0]))),
        ctx.isClassicalNahuatlVncFiniteSurfaceFrame(editedSurface),
        ctx.isClassicalNahuatlVncDerivationOptionInventory(JSON.parse(JSON.stringify(inventory))),
        ctx.isClassicalNahuatlVncApplicationFrame(JSON.parse(JSON.stringify(corrected))),
    ], [false, false, false, false]);
    return s;
}

module.exports = { run };
