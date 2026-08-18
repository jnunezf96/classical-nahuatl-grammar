"use strict";

const { createSuite } = require("./runner");

const SECTION_25_13_GRAMMAR_ITEMS = Object.freeze({
    fixedObjectPrefixOrder: "ACI-P223-L013-54403BB040",
    shapeDoesNotIdentifyFunction: "ACI-P223-L013-93465EC1C5",
    multipleObjectAmbiguity: "ACI-P223-L013-F59A8CC80D",
    multipleSources: "ACI-P223-L013-FE0B6576A5",
    contextSelectsInterpretation: "ACI-P223-L013-F04885787B",
    generalContextDecides: "ACI-P223-L013-D5C78BA9A6",
    specificObjectIncompatibility: "ACI-P223-L014-38D7D4236F",
    retainedReflexiveBecomesNe: "ACI-P223-L014-2265B7752D",
});

function selectDerivation(application, request, targetStem) {
    const preview = application.evaluate(request);
    const derivationOptionId =
        preview.controlFrame?.derivationOptionInventory?.options
            ?.find(option => option.targetStem === targetStem)
            ?.optionId || "";
    return {
        preview,
        request: { ...request, derivationOptionId },
        frame: application.evaluate({ ...request, derivationOptionId }),
    };
}

function selectLaterVoice(application, selectedDerivation, requestedVoice) {
    const preview = application.evaluate({
        ...selectedDerivation.request,
        requestedVoice,
    });
    const nonactiveOptionId =
        preview.controlFrame?.nonactiveOptionInventory?.automaticOptionId
        || preview.controlFrame?.nonactiveOptionInventory?.options?.[0]
            ?.optionId
        || "";
    const request = {
        ...selectedDerivation.request,
        requestedVoice,
        nonactiveOptionId,
    };
    return {
        preview,
        request,
        frame: application.evaluate(request),
    };
}

function buildContinuationRequest(source, overrides = {}) {
    return {
        sourceStem: source.sourceStem,
        sourceLexemeId: source.sourceLexemeId,
        sourceInitialISelection: source.sourceInitialISelection,
        verbClass: source.verbClass,
        sourceValence: source.sourceValence,
        sourceSubject: source.sourceSubject,
        sourceVoice: source.sourceVoice,
        sourceNonactiveOptionId: source.sourceNonactiveOptionId,
        sourceObjectRequests: source.sourceObjectRequests,
        objectKind: source.objectKind,
        objectPerson: source.objectPerson,
        mood: "indicative",
        tense: "present",
        requestedVoice: "active",
        ...overrides,
    };
}

function continueCausative(
    application,
    sourceResultFrame,
    targetStem,
    overrides = {}
) {
    const source =
        application.getContinuationSourceConstituents(sourceResultFrame);
    if (!source) {
        return {
            source: null,
            preview: null,
            request: null,
            frame: null,
            plan: null,
            coordinate: null,
        };
    }
    const baseRequest = buildContinuationRequest(source, {
        subject: "2sg",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        ...overrides,
    });
    const preview = application.continueFromResult(
        sourceResultFrame,
        baseRequest,
    );
    const derivationOptionId =
        preview?.controlFrame?.derivationOptionInventory?.options
            ?.find(option => option.targetStem === targetStem)
            ?.optionId || "";
    const request = { ...baseRequest, derivationOptionId };
    const frame = application.continueFromResult(
        sourceResultFrame,
        request,
    );
    const plan = application.prepareParadigmFromResult(
        sourceResultFrame,
        { ...request, outputScope: "paradigm" },
    );
    const coordinate = plan
        ? application.projectParadigmCoordinates(plan, [{
            subject: "2sg",
            mood: "indicative",
            tense: "present",
        }])[0] || null
        : null;
    return { source, preview, request, frame, plan, coordinate };
}

function summarizeProjectionIndependence(frame) {
    return [
        frame?.resultFrame?.finiteSurfaceFrame
            ?.formulaDerivedFromWrittenProjection,
        frame?.resultFrame?.finiteSurfaceFrame
            ?.writtenDerivedFromFormulaProjection,
        frame?.resultFrame?.formulaStringAuthority,
        frame?.resultFrame?.surfaceStringAuthority,
    ];
}

function summarizeReverseAnalyses(frame) {
    return (
        frame?.resultFrame?.derivationOperationFrame?.reverseSourceAnalyses
        || []
    ).map(analysis => [
        analysis.analysisId,
        analysis.analysisStatus,
        analysis.sourceVoice,
        analysis.formationStem,
        analysis.generationAuthority,
        analysis.formulaAuthority,
        analysis.surfaceAuthority,
        Boolean(analysis.canonicalSignature),
        Object.isFrozen(analysis),
    ]);
}

function summarizeScalarAndParadigm(continuation, ctx) {
    return {
        scalar: [
            continuation.frame?.authorizationStatus || "",
            continuation.frame?.resultFrame?.surfaceRealization || "",
            continuation.frame?.resultFrame?.formulaRealization || "",
            continuation.frame?.resultFrame?.finiteSurfaceFrame
                ?.formulaDerivedFromWrittenProjection,
            continuation.frame?.resultFrame?.finiteSurfaceFrame
                ?.writtenDerivedFromFormulaProjection,
            ctx.isClassicalNahuatlVncApplicationFrame(
                continuation.frame,
            ),
            ctx.isClassicalNahuatlVncDerivationOperationFrame(
                continuation.frame?.resultFrame
                    ?.derivationOperationFrame,
            ),
        ],
        paradigm: [
            continuation.plan?.authorizationStatus || "",
            continuation.coordinate?.authorizationStatus || "",
            continuation.coordinate?.surfaceRealization || "",
            continuation.coordinate?.formulaRealization || "",
            continuation.coordinate?.scalarEquivalent === true,
            continuation.coordinate?.scalarApplicationFrame
                ?.authorizationStatus
                === continuation.frame?.authorizationStatus
            && continuation.coordinate?.scalarApplicationFrame
                ?.resultFrame?.surfaceRealization
                === continuation.frame?.resultFrame?.surfaceRealization
            && continuation.coordinate?.scalarApplicationFrame
                ?.resultFrame?.formulaRealization
                === continuation.frame?.resultFrame?.formulaRealization,
            ctx.isClassicalNahuatlVncParadigmCoordinateFrame(
                continuation.coordinate,
            ),
        ],
    };
}

function run(ctx = {}) {
    const s = createSuite(
        "classical_lesson25_13_dual_source_application",
    );
    const application = ctx.createClassicalNahuatlVncApplication(ctx);

    const caquiActiveSource = selectDerivation(application, {
        sourceStem: "caqui",
        verbClass: "B",
        sourceValence: "projective-human",
        objectKind: "nonspecific-human",
        sourceSubject: "3sg",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        requestedVoice: "active",
    }, "caquī-tiā");
    const caquiPassiveActiveBasis = selectDerivation(application, {
        sourceStem: "caqui",
        verbClass: "B",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        sourceSubject: "1sg",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        requestedVoice: "active",
    }, "caquī-tiā");
    const caquiPassiveSource = selectLaterVoice(
        application,
        caquiPassiveActiveBasis,
        "passive",
    );
    const caquiFromActive = continueCausative(
        application,
        caquiActiveSource.frame.resultFrame,
        "caquī-ti-l-tiā",
    );
    const caquiFromPassive = continueCausative(
        application,
        caquiPassiveSource.frame.resultFrame,
        "caquī-ti-l-tiā",
    );

    s.eq(
        "§25.13 two owner-issued caqui Sources converge on one exact scalar and pointwise paradigm Result",
        {
            inventoryItems: [
                SECTION_25_13_GRAMMAR_ITEMS.fixedObjectPrefixOrder,
                SECTION_25_13_GRAMMAR_ITEMS.shapeDoesNotIdentifyFunction,
                SECTION_25_13_GRAMMAR_ITEMS.multipleObjectAmbiguity,
                SECTION_25_13_GRAMMAR_ITEMS.multipleSources,
            ],
            activeSource: [
                caquiActiveSource.frame.authorizationStatus,
                caquiActiveSource.frame.resultFrame.surfaceRealization,
                caquiActiveSource.frame.resultFrame.formulaRealization,
                ...summarizeProjectionIndependence(
                    caquiActiveSource.frame,
                ),
            ],
            passiveSource: [
                caquiPassiveSource.frame.authorizationStatus,
                caquiPassiveSource.frame.resultFrame.surfaceRealization,
                caquiPassiveSource.frame.resultFrame.formulaRealization,
                ...summarizeProjectionIndependence(
                    caquiPassiveSource.frame,
                ),
            ],
            activeContinuation:
                summarizeScalarAndParadigm(caquiFromActive, ctx),
            passiveContinuation:
                summarizeScalarAndParadigm(caquiFromPassive, ctx),
            exactSameResult:
                caquiFromActive.frame?.resultFrame?.surfaceRealization
                    === caquiFromPassive.frame?.resultFrame
                        ?.surfaceRealization
                && caquiFromActive.frame?.resultFrame?.formulaRealization
                    === caquiFromPassive.frame?.resultFrame
                        ?.formulaRealization,
            activeAnalyses:
                summarizeReverseAnalyses(caquiFromActive.frame),
            passiveAnalyses:
                summarizeReverseAnalyses(caquiFromPassive.frame),
        },
        {
            inventoryItems: [
                "ACI-P223-L013-54403BB040",
                "ACI-P223-L013-93465EC1C5",
                "ACI-P223-L013-F59A8CC80D",
                "ACI-P223-L013-FE0B6576A5",
            ],
            activeSource: [
                "authorized",
                "nictēcaquītia",
                "#ni-0+c-0+tē(caquī-tia)0+0-0#",
                false,
                false,
                false,
                false,
            ],
            passiveSource: [
                "authorized",
                "nicaquitīlo",
                "#ni-0+⎕-0(caquī-ti-lo)0+0-0#",
                false,
                false,
                false,
                false,
            ],
            activeContinuation: {
                scalar: [
                    "authorized",
                    "tinēchtēcaquītiltia",
                    "#ti-0+n-ēch+⎕-0+tē(caquī-ti-l-tia)0+0-0#",
                    false,
                    false,
                    true,
                    true,
                ],
                paradigm: [
                    "authorized",
                    "authorized",
                    "tinēchtēcaquītiltia",
                    "#ti-0+n-ēch+⎕-0+tē(caquī-ti-l-tia)0+0-0#",
                    true,
                    true,
                    true,
                ],
            },
            passiveContinuation: {
                scalar: [
                    "authorized",
                    "tinēchtēcaquītiltia",
                    "#ti-0+n-ēch+⎕-0+tē(caquī-ti-l-tia)0+0-0#",
                    false,
                    false,
                    true,
                    true,
                ],
                paradigm: [
                    "authorized",
                    "authorized",
                    "tinēchtēcaquītiltia",
                    "#ti-0+n-ēch+⎕-0+tē(caquī-ti-l-tia)0+0-0#",
                    true,
                    true,
                    true,
                ],
            },
            exactSameResult: true,
            activeAnalyses: [
                [
                    "cn-l25-2513-caquitiltia-from-active-first-causative",
                    "identified-source",
                    "active",
                    "caquī-tiā",
                    false,
                    false,
                    false,
                    true,
                    true,
                ],
                [
                    "cn-l25-2513-caquitiltia-from-passive-first-causative",
                    "canonically-licensed-reverse-source",
                    "passive",
                    "caquī-ti-lō",
                    false,
                    false,
                    false,
                    true,
                    true,
                ],
            ],
            passiveAnalyses: [
                [
                    "cn-l25-2513-caquitiltia-from-active-first-causative",
                    "canonically-licensed-reverse-source",
                    "active",
                    "caquī-tiā",
                    false,
                    false,
                    false,
                    true,
                    true,
                ],
                [
                    "cn-l25-2513-caquitiltia-from-passive-first-causative",
                    "identified-source",
                    "passive",
                    "caquī-ti-lō",
                    false,
                    false,
                    false,
                    true,
                    true,
                ],
            ],
        },
    );

    const notzaActiveSource = application.evaluate({
        sourceStem: "nōtza",
        verbClass: "A",
        sourceValence: "projective-human",
        objectKind: "nonspecific-human",
        sourceSubject: "1sg",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "active",
    });
    const notzaPassivePreview = application.evaluate({
        sourceStem: "nōtza",
        verbClass: "A",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "1sg",
        sourceSubject: "3sg",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "passive",
    });
    const notzaNonactiveOptionId =
        notzaPassivePreview.controlFrame?.nonactiveOptionInventory
            ?.automaticOptionId
        || notzaPassivePreview.controlFrame?.nonactiveOptionInventory
            ?.options?.find(option => option.nonactiveStem === "nōtza-lō")
            ?.optionId
        || "";
    const notzaPassiveSource = application.evaluate({
        sourceStem: "nōtza",
        verbClass: "A",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "1sg",
        sourceSubject: "3sg",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "passive",
        nonactiveOptionId: notzaNonactiveOptionId,
    });
    const notzaFromActive = continueCausative(
        application,
        notzaActiveSource.resultFrame,
        "nōtza-l-tiā",
    );
    const notzaFromPassive = continueCausative(
        application,
        notzaPassiveSource.resultFrame,
        "nōtza-l-tiā",
        {
            // §25.3 licenses the sounded writer variant when a nonspecific
            // causative object co-occurs with a retained specific shuntline.
            // The §25.13 printed ambiguity uses that genuine realization
            // choice; the reverse-source interpretation remains read-only.
            causativeSpecificShuntlineRealization: "sounded",
        },
    );

    s.eq(
        "§25.13 active and passive nōtza Sources converge while context remains read-only interpretation",
        {
            inventoryItems: [
                SECTION_25_13_GRAMMAR_ITEMS.contextSelectsInterpretation,
                SECTION_25_13_GRAMMAR_ITEMS.generalContextDecides,
            ],
            activeSource: [
                notzaActiveSource.authorizationStatus,
                notzaActiveSource.resultFrame.surfaceRealization,
                notzaActiveSource.resultFrame.formulaRealization,
            ],
            passiveSource: [
                notzaPassiveSource.authorizationStatus,
                notzaPassiveSource.blockReason,
                notzaPassiveSource.resultFrame.surfaceRealization,
                notzaPassiveSource.resultFrame.formulaRealization,
            ],
            activeContinuation:
                summarizeScalarAndParadigm(notzaFromActive, ctx),
            passiveContinuation:
                summarizeScalarAndParadigm(notzaFromPassive, ctx),
            exactSameResult:
                notzaFromActive.frame?.resultFrame?.surfaceRealization
                    === notzaFromPassive.frame?.resultFrame
                        ?.surfaceRealization
                && notzaFromActive.frame?.resultFrame?.formulaRealization
                    === notzaFromPassive.frame?.resultFrame
                        ?.formulaRealization,
            activeAnalyses:
                summarizeReverseAnalyses(notzaFromActive.frame),
            passiveAnalyses:
                summarizeReverseAnalyses(notzaFromPassive.frame),
        },
        {
            inventoryItems: [
                "ACI-P223-L013-F04885787B",
                "ACI-P223-L013-D5C78BA9A6",
            ],
            activeSource: [
                "authorized",
                "nitēnōtza",
                "#ni-0+tē(nōtza)0+0-0#",
            ],
            passiveSource: [
                "authorized",
                "",
                "ninōtzalo",
                "#ni-0(nōtza-lo)0+0-0#",
            ],
            activeContinuation: {
                scalar: [
                    "authorized",
                    "tinēchtēnōtzaltia",
                    "#ti-0+n-ēch+tē(nōtza-l-tia)0+0-0#",
                    false,
                    false,
                    true,
                    true,
                ],
                paradigm: [
                    "authorized",
                    "authorized",
                    "tinēchtēnōtzaltia",
                    "#ti-0+n-ēch+tē(nōtza-l-tia)0+0-0#",
                    true,
                    true,
                    true,
                ],
            },
            passiveContinuation: {
                scalar: [
                    "authorized",
                    "tinēchtēnōtzaltia",
                    "#ti-0+n-ēch+tē(nōtza-l-tia)0+0-0#",
                    false,
                    false,
                    true,
                    true,
                ],
                paradigm: [
                    "authorized",
                    "authorized",
                    "tinēchtēnōtzaltia",
                    "#ti-0+n-ēch+tē(nōtza-l-tia)0+0-0#",
                    true,
                    true,
                    true,
                ],
            },
            exactSameResult: true,
            activeAnalyses: [
                [
                    "cn-l25-2513-notzaltia-from-active-human-object-source",
                    "identified-source",
                    "active",
                    "nōtza",
                    false,
                    false,
                    false,
                    true,
                    true,
                ],
                [
                    "cn-l25-2513-notzaltia-from-passive-source",
                    "canonically-licensed-reverse-source",
                    "passive",
                    "nōtza-lō",
                    false,
                    false,
                    false,
                    true,
                    true,
                ],
            ],
            passiveAnalyses: [
                [
                    "cn-l25-2513-notzaltia-from-active-human-object-source",
                    "canonically-licensed-reverse-source",
                    "active",
                    "nōtza",
                    false,
                    false,
                    false,
                    true,
                    true,
                ],
                [
                    "cn-l25-2513-notzaltia-from-passive-source",
                    "identified-source",
                    "passive",
                    "nōtza-lō",
                    false,
                    false,
                    false,
                    true,
                    true,
                ],
            ],
        },
    );

    const specificNōtza = selectDerivation(application, {
        sourceStem: "nōtza",
        verbClass: "A",
        sourceValence: "specific-projective",
        objectKind: "specific-projective",
        objectPerson: "3sg",
        sourceSubject: "1sg",
        subject: "2sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        requestedVoice: "active",
    }, "nōtza-l-tiā");
    const specificCluster =
        specificNōtza.frame.resultFrame.activeMachineryFrame
            ?.targetObjectClusterFrame
        || specificNōtza.frame.resultFrame.activeMachineryFrame
            ?.multipleObjectClusterFrame
        || null;
    const soundedSpecificNōtza = application.evaluate({
        ...specificNōtza.request,
        causativeSpecificShuntlineRealization: "sounded",
    });
    const reflexive = selectDerivation(application, {
        sourceStem: "tlazohtla",
        verbClass: "A",
        sourceValence: "mainline-reflexive",
        objectKind: "reflexive",
        objectPerson: "3pl",
        sourceSubject: "3pl",
        subject: "1pl",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        requestedVoice: "active",
    }, "tla-zo-h-tla-l-tiā");
    const reflexiveOperation =
        reflexive.frame.resultFrame.derivationOperationFrame;

    s.eq(
        "§25.13 incompatibility and retained-reflexive rules execute inside the canonical object layer",
        {
            inventoryItems: [
                SECTION_25_13_GRAMMAR_ITEMS
                    .specificObjectIncompatibility,
                SECTION_25_13_GRAMMAR_ITEMS
                    .retainedReflexiveBecomesNe,
            ],
            specific: [
                specificNōtza.frame.authorizationStatus,
                specificNōtza.frame.resultFrame.surfaceRealization,
                specificNōtza.frame.resultFrame.formulaRealization,
                specificCluster?.linearCarriers || [],
                (specificCluster?.positions || []).map(position => [
                    position.objectId,
                    position.objectKind,
                    position.governor,
                    position.prominence,
                    position.carrier,
                    position.sounded,
                ]),
            ],
            incompatibleSoundedChoice: [
                soundedSpecificNōtza.authorizationStatus,
                soundedSpecificNōtza.blockReason,
                soundedSpecificNōtza.resultFrame.surfaceRealization,
                soundedSpecificNōtza.resultFrame.formulaRealization,
            ],
            reflexive: [
                reflexive.frame.authorizationStatus,
                reflexive.frame.resultFrame.surfaceRealization,
                reflexive.frame.resultFrame.formulaRealization,
                reflexiveOperation?.participantTransformFrame
                    ?.retainedSourceReflexiveShuntlineRuleFrame?.ruleId
                    || "",
                reflexiveOperation?.targetObjectRequests.map(request => [
                    request.objectId,
                    request.objectKind,
                    request.objectPerson,
                    request.governor,
                    request.derivationalLevel,
                ]) || [],
            ],
        },
        {
            inventoryItems: [
                "ACI-P223-L014-38D7D4236F",
                "ACI-P223-L014-2265B7752D",
            ],
            specific: [
                "authorized",
                "tinēchnōtzaltia",
                "#ti-0+n-ēch+⎕-0(nōtza-l-tia)0+0-0#",
                ["n-ēch", "0-0"],
                [
                    [
                        "causative-object",
                        "specific-projective",
                        "causative",
                        "mainline",
                        "n-ēch",
                        true,
                    ],
                    [
                        "source-object-1",
                        "specific-projective",
                        "directive",
                        "shuntline",
                        "0-0",
                        false,
                    ],
                ],
            ],
            incompatibleSoundedChoice: [
                "blocked",
                "classical-vnc-causative-specific-shuntline-realization-not-applicable",
                "",
                "",
            ],
            reflexive: [
                "authorized",
                "tiquinnetlazohtlaltiah",
                "#ti-0+qu-in+ne(tla-zo-h-tla-l-tia)0+0-h#",
                "cn-vnc-retained-source-mainline-reflexive-to-shuntline-ne",
                [
                    [
                        "source-object-1",
                        "reflexive",
                        "nonfirst-common",
                        "directive",
                        1,
                    ],
                    [
                        "causative-object",
                        "specific-projective",
                        "3pl",
                        "causative",
                        2,
                    ],
                ],
            ],
        },
    );

    const activeAnalysis =
        caquiFromActive.frame?.resultFrame?.derivationOperationFrame
            ?.reverseSourceAnalyses?.[0] || null;
    const analysisAsResult =
        application.continueFromResult(
            activeAnalysis,
            caquiFromActive.request,
        );
    const forgedContextRequest =
        application.continueFromResult(
            caquiActiveSource.frame.resultFrame,
            {
                ...caquiFromActive.request,
                reverseSourceAnalyses: [{
                    sourceVoice: "passive",
                    formationStem: "caquī-ti-lō",
                    generationAuthority: true,
                }],
                displayText:
                    "Context says the passive reading must generate.",
                lessonMetadata: { lesson: "25.13" },
            },
        );
    const copiedSourceResult =
        application.continueFromResult(
            { ...caquiActiveSource.frame.resultFrame },
            caquiFromActive.request,
        );
    const copiedAlternativeResults = [
        caquiActiveSource.frame.resultFrame,
        caquiPassiveSource.frame.resultFrame,
        notzaActiveSource.resultFrame,
        notzaPassiveSource.resultFrame,
    ].map(resultFrame => application.continueFromResult(
        { ...resultFrame },
        caquiFromActive.request,
    ));
    const forgedSourceResult =
        application.continueFromResult(
            {
                ...caquiActiveSource.frame.resultFrame,
                surfaceRealization: "tinēchtēcaquītiltia",
                formulaRealization:
                    "#ti-0+n-ēch+⎕-0+tē(caquī-ti-l-tia)0+0-0#",
            },
            caquiFromActive.request,
        );

    s.eq(
        "§25.13 context and reverse analyses can explain but never authorize generation",
        {
            copiedSourceResult,
            copiedAlternativeResults,
            forgedSourceResult,
            analysisAsResult,
            forgedContext: [
                forgedContextRequest?.authorizationStatus || "",
                forgedContextRequest?.blockReason || "",
                forgedContextRequest?.rejectedAuthorityFields || [],
                forgedContextRequest?.resultFrame?.surfaceRealization || "",
                forgedContextRequest?.resultFrame?.formulaRealization || "",
            ],
            projectionFlags:
                caquiFromActive.frame?.derivationExplanationProjection
                    ?.reverseSourceAnalyses?.map(analysis => [
                        analysis.grammarAuthority,
                        analysis.displayOnly,
                        analysis.generationAuthority,
                        analysis.formulaAuthority,
                        analysis.surfaceAuthority,
                    ]) || [],
        },
        {
            copiedSourceResult: null,
            copiedAlternativeResults: [null, null, null, null],
            forgedSourceResult: null,
            analysisAsResult: null,
            forgedContext: [
                "blocked",
                "classical-vnc-application-caller-authority-rejected",
                [
                    "lessonMetadata",
                    "displayText",
                    "reverseSourceAnalyses",
                ],
                "",
                "",
            ],
            projectionFlags: [
                [false, true, false, false, false],
                [false, true, false, false, false],
            ],
        },
    );

    return s;
}

module.exports = { run };
