"use strict";

const { createSuite } = require("./runner");

const EXACT_RULE_ID = "cn-l24-2432a-ehua-e-hu-a";
const EXACT_ANALYSIS_ID =
    "cn-l24-2462-ehua-fused-destockal:fused-destockal-hua-exact";
const SOURCE_READING = Object.freeze({
    meaning: "lift-off-in-flight",
    relation: "bird-animate-nonhuman-subject",
});
const TARGET_READINGS = Object.freeze([
    Object.freeze({
        meaning: "carry-something-heavy",
        relation: "heavy-nonhuman-object",
    }),
    Object.freeze({
        meaning: "sing-something",
        relation: "song-nonhuman-object",
    }),
]);

function buildSource(ctx, sourceStem, verbClass = "A") {
    return ctx.buildClassicalNahuatlVerbstemClassFrame(sourceStem, {
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence: "intransitive",
        transitivity: "intransitive",
        objectKind: "none",
    });
}

function getInventory(ctx, sourceStem, verbClass = "A") {
    return ctx.getClassicalNahuatlVncDerivationOptionInventory(
        buildSource(ctx, sourceStem, verbClass),
        { derivationType: "causative" },
    );
}

function getExactOption(inventory) {
    return inventory?.options?.find(option => option.ruleId === EXACT_RULE_ID) || null;
}

function applicationRequest(sourceStem, extra = {}) {
    return {
        sourceStem,
        verbClass: "A",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "1sg",
        objectKind: "none",
        objectPerson: "",
        requestedDerivation: "causative",
        requestedVoice: "active",
        causativeObjectKind: "specific-projective",
        mood: "indicative",
        tense: "present",
        outputScope: "single",
        ...extra,
    };
}

function run(ctx = {}) {
    const s = createSuite(
        "classical_reconstructed_ehua_causative_continuity_exact",
    );

    for (const sourceStem of ["ē-hua", "e-ē-hua"]) {
        const inventory = getInventory(ctx, sourceStem);
        const option = getExactOption(inventory);
        const analysis = inventory?.sourceAnalysisFrame?.analyses?.find(
            candidate => candidate.analysisId === EXACT_ANALYSIS_ID,
        );

        s.eq(`${sourceStem}: normal Grammar exposes the same exact Type 1 option`, {
            inventoryStatus: inventory?.authorizationStatus,
            inventoryCanonical:
                ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
            selectionRequired: inventory?.selectionRequired,
            ruleId: option?.ruleId,
            route: option?.derivationRoute,
            targetStem: option?.targetStem,
            targetClass: option?.targetClass,
            sourceAnalysisId: option?.sourceAnalysisId,
        }, {
            inventoryStatus: "authorized",
            inventoryCanonical: true,
            selectionRequired: true,
            ruleId: EXACT_RULE_ID,
            route: "type-one-final-a-morphological-replacement-exact",
            targetStem: "ē-hu-a",
            targetClass: "B",
            sourceAnalysisId: EXACT_ANALYSIS_ID,
        });

        s.eq(`${sourceStem}: the option is bound to the signed fused Source analysis`, {
            analysisFrameCanonical:
                ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(
                    inventory?.sourceAnalysisFrame,
                ),
            analysisId: analysis?.analysisId,
            category: analysis?.category,
            authority: analysis?.analysisAuthority,
            lexicalStatus: analysis?.lexicalStatus,
            segments: analysis?.segments,
            structureType: analysis?.destockalStructureFrame?.typeId,
            reconstructed: analysis?.reconstructionNotationFrame?.underlyingStem,
            extant: analysis?.reconstructionNotationFrame?.extantSourceStem,
            optionUsesAnalysis: inventory?.sourceAnalysisFrame?.analyses?.some(
                candidate => candidate.analysisId === option?.sourceAnalysisId,
            ),
        }, {
            analysisFrameCanonical: true,
            analysisId: EXACT_ANALYSIS_ID,
            category: "fused-destockal-hua-exact",
            authority: "typed-lexical-source-analysis",
            lexicalStatus: "lexically-licensed-source-analysis",
            segments: ["e", "ē", "hua"],
            structureType: "long-vowel-hua",
            reconstructed: "e-ē-hua",
            extant: "ē-hua",
            optionUsesAnalysis: true,
        });

        s.eq(`${sourceStem}: exact source and target readings remain available`, {
            sourceMeaning: option?.sourceMeaning,
            sourceReadings: option?.additionalSourceReadings,
            targetMeaning: option?.targetMeaning,
            targetReadings: option?.additionalTargetReadings,
            formulaAuthority: option?.formulaArtifactAuthority,
            surfaceAuthority: option?.surfaceArtifactAuthority,
            callerTargetAllowed: option?.callerSuppliedTargetAllowed,
        }, {
            sourceMeaning: "arise-or-depart",
            sourceReadings: [SOURCE_READING],
            targetMeaning: "lift-something",
            targetReadings: TARGET_READINGS,
            formulaAuthority: false,
            surfaceAuthority: false,
            callerTargetAllowed: false,
        });

        const preview = ctx.evaluateClassicalNahuatlVncApplication(
            applicationRequest(sourceStem),
        );
        const selectedOption = getExactOption(
            preview.controlFrame?.derivationOptionInventory,
        );
        const applied = ctx.evaluateClassicalNahuatlVncApplication(
            applicationRequest(sourceStem, {
                derivationOptionId:
                    selectedOption?.optionId || "missing-exact-ehua-option",
            }),
        );
        const appliedOption = applied.resultFrame?.derivationOperationFrame
            ?.selectedOption;
        s.eq(`${sourceStem}: selecting that option produces the same canonical Result`, {
            previewStatus: preview.authorizationStatus,
            previewReason: preview.blockReason,
            appliedStatus: applied.authorizationStatus,
            appliedCanonical: ctx.isClassicalNahuatlVncApplicationFrame(applied),
            selectedRuleId: appliedOption?.ruleId,
            selectedAnalysisId: appliedOption?.sourceAnalysisId,
            selectedSourceMeaning: appliedOption?.sourceMeaning,
            selectedTargetMeaning: appliedOption?.targetMeaning,
            formula: applied.resultFrame?.formulaRealization,
            surface: applied.resultFrame?.surfaceRealization,
        }, {
            previewStatus: "blocked",
            previewReason: "classical-vnc-derivation-option-selection-required",
            appliedStatus: "authorized",
            appliedCanonical: true,
            selectedRuleId: EXACT_RULE_ID,
            selectedAnalysisId: EXACT_ANALYSIS_ID,
            selectedSourceMeaning: "arise-or-depart",
            selectedTargetMeaning: "lift-something",
            formula: "#ni-0+qu-0(ē-hu-a)0+0-0#",
            surface: "niquēhua",
        });
    }

    for (const [sourceStem, verbClass] of [
        ["e-ē-hui", "B"],
        ["xe-ē-hua", "A"],
    ]) {
        const inventory = getInventory(ctx, sourceStem, verbClass);
        const typeOneOptions = inventory?.options?.filter(
            option => option.derivationSubtype === "type-one",
        ) || [];
        s.eq(`${sourceStem}: a neighboring productive Source does not borrow ē-hua lexical identity`, {
            inventoryStatus: inventory?.authorizationStatus,
            inventoryCanonical:
                ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
            hasTypeOneOption: typeOneOptions.length > 0,
            hasExactRule: typeOneOptions.some(
                option => option.ruleId === EXACT_RULE_ID,
            ),
            hasExactAnalysis: typeOneOptions.some(
                option => option.sourceAnalysisId === EXACT_ANALYSIS_ID,
            ),
            hasSourceMeaning: typeOneOptions.some(
                option => Boolean(option.sourceMeaning),
            ),
            hasSourceReadings: typeOneOptions.some(
                option => option.additionalSourceReadings?.length > 0,
            ),
            hasTargetMeaning: typeOneOptions.some(
                option => Boolean(option.targetMeaning),
            ),
            hasTargetReadings: typeOneOptions.some(
                option => option.additionalTargetReadings?.length > 0,
            ),
        }, {
            inventoryStatus: "authorized",
            inventoryCanonical: true,
            hasTypeOneOption: true,
            hasExactRule: false,
            hasExactAnalysis: false,
            hasSourceMeaning: false,
            hasSourceReadings: false,
            hasTargetMeaning: false,
            hasTargetReadings: false,
        });
    }

    return s;
}

module.exports = { run };
