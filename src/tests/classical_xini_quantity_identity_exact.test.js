"use strict";

const { createSuite } = require("./runner");

const OWNER = "classical-destockal-irregular-source-lifecycle";
const PREFIX = "ClassicalDestockalIrregularSourceLifecycle";
const EXACT_RULE = "cn-l24-2459-xini-xi-ni-a";
const EXACT_ANALYSIS = "cn-l24-2459-xini-fused-destockal:fused-destockal-ni-exact";
const EXACT_PATH = "constraints.destockalIrregularSourceLifecycle"
    + ".extantFusedSources.xini.coalescence";

const SHORT = ["xi-ni", "xini"];
const LONG = ["xī-ni", "xīni"];

function evaluateDirect(ctx, sourceStem) {
    return ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem,
        verbClass: "B",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "3sg",
        objectKind: "none",
        objectPerson: "",
        sourceVoice: "active",
        requestedDerivation: "direct",
        requestedVoice: "active",
        mood: "indicative",
        tense: "present",
        outputScope: "single",
    });
}

function findExactAnalysis(applicationFrame) {
    return applicationFrame.resultFrame?.sourceAnalysisFrame?.analyses?.find(analysis => (
        analysis.analysisId === EXACT_ANALYSIS
        && analysis.category === "fused-destockal-ni-exact"
    )) || null;
}

function prepareImpersonalCausative(ctx, sourceStem) {
    const request = {
        sourceStem,
        verbClass: "B",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "1sg",
        objectKind: "none",
        objectPerson: "",
        sourceVoice: "impersonal",
        requestedDerivation: "causative",
        requestedVoice: "active",
        mood: "indicative",
        tense: "present",
        outputScope: "single",
    };
    const sourcePreview = ctx.evaluateClassicalNahuatlVncApplication(request);
    const sourceOption = sourcePreview.controlFrame?.sourceNonactiveOptionInventory
        ?.options?.find(option => option.suffixFamily === "hua");
    const derivationPreview = ctx.evaluateClassicalNahuatlVncApplication({
        ...request,
        sourceNonactiveOptionId: sourceOption?.optionId || "missing-hua-source-option",
    });
    const inventory = derivationPreview.controlFrame?.derivationOptionInventory || null;
    const exactOption = inventory?.options?.find(option => option.ruleId === EXACT_RULE) || null;
    return { request, sourceOption, derivationPreview, inventory, exactOption };
}

function applyExactCausative(ctx, prepared) {
    return ctx.evaluateClassicalNahuatlVncApplication({
        ...prepared.request,
        sourceNonactiveOptionId:
            prepared.sourceOption?.optionId || "missing-hua-source-option",
        derivationOptionId:
            prepared.exactOption?.optionId || "missing-exact-xini-option",
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_xini_quantity_identity_exact");

    const ownerSource = ctx[`build${PREFIX}Source`]({
        analysisDomain: OWNER,
        selection: "claim-p2343-extant-xini",
        requestedFacet: "aci-p204-l003-429a0e8ace-03-xini-coalescence",
        participantChoice:
            "claim-p2343-extant-xini:aci-p204-l003-429a0e8ace-03-xini-coalescence",
    });
    const ownerResult = ctx[`evaluate${PREFIX}`](ownerSource);
    const ownerEvidence = ctx[`get${PREFIX}ExecutionEvidence`](ownerResult);
    const ownerValue = ownerResult.payload?.facetValue;
    const ownerAnalysis = ownerValue?.sourceAnalysis;
    s.eq("the existing xini receipt retains exact long-quantity metadata", [
        ownerResult.authorizationStatus,
        ownerResult.payload?.effectiveCanonicalPath,
        ownerResult.payload?.sourceCanonicalPath,
        ownerResult.payload?.proofObservationKind,
        ctx[`is${PREFIX}Result`](ownerResult),
        ctx[`is${PREFIX}ExecutionEvidence`](ownerEvidence, ownerResult),
        ownerValue?.sourceAnalysisFrame?.sourceStem,
        ownerAnalysis?.analysisId,
        ownerAnalysis?.category,
        ownerAnalysis?.analysisAuthority,
        ownerAnalysis?.lexicalStatus,
        ownerAnalysis?.segments,
        ownerAnalysis?.root,
        ownerAnalysis?.stockFormative,
        ownerAnalysis?.stemFormative,
        ownerValue?.reconstructedSourceStem,
    ], [
        "authorized",
        EXACT_PATH,
        EXACT_PATH,
        "direct-canonical-result-observation",
        true,
        true,
        "xī-ni",
        EXACT_ANALYSIS,
        "fused-destockal-ni-exact",
        "typed-lexical-source-analysis",
        "lexically-licensed-source-analysis",
        ["xi", "ī", "ni"],
        "xi",
        "ī",
        "ni",
        "xi-ī-ni",
    ]);

    const shortApplications = SHORT.map(sourceStem => evaluateDirect(ctx, sourceStem));
    SHORT.forEach((sourceStem, index) => {
        const application = shortApplications[index];
        const sourceAnalysisFrame = application.resultFrame?.sourceAnalysisFrame;
        const meaningFrame = ctx.buildClassicalNahuatlExtantDestockalMeaningFrame({
            applicationFrame: application,
        });
        s.eq(`${sourceStem}: short quantity remains productive but is not exact xī-ni`, [
            application.authorizationStatus,
            ctx.isClassicalNahuatlVncApplicationFrame(application),
            application.resultFrame?.surfaceRealization,
            ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(sourceAnalysisFrame),
            sourceAnalysisFrame?.analyses?.filter(analysis => (
                analysis.category === "fused-destockal-ni-exact"
            )).length,
            findExactAnalysis(application),
            meaningFrame.authorizationStatus,
            ctx.isClassicalNahuatlExtantDestockalMeaningFrame(meaningFrame),
            meaningFrame.availableReadings?.length || 0,
        ], [
            "authorized", true, "xini", true, 0, null, "blocked", false, 0,
        ]);
    });

    const longApplications = LONG.map(sourceStem => evaluateDirect(ctx, sourceStem));
    LONG.forEach((sourceStem, index) => {
        const application = longApplications[index];
        const analysis = findExactAnalysis(application);
        const meaningFrame = ctx.buildClassicalNahuatlExtantDestockalMeaningFrame({
            applicationFrame: application,
        });
        s.eq(`${sourceStem}: long quantity retains exact fused identity and readings`, [
            application.authorizationStatus,
            ctx.isClassicalNahuatlVncApplicationFrame(application),
            application.resultFrame?.surfaceRealization,
            analysis?.analysisId,
            analysis?.analysisAuthority,
            analysis?.lexicalStatus,
            analysis?.segments,
            analysis?.stockFormative,
            analysis?.destockalStructureFrame?.typeId,
            meaningFrame.authorizationStatus,
            ctx.isClassicalNahuatlExtantDestockalMeaningFrame(meaningFrame),
            meaningFrame.availableReadings?.map(reading => [
                reading.meaningId,
                reading.contextCondition.requiredReferentKind,
                reading.availabilityStatus,
            ]),
        ], [
            "authorized",
            true,
            "xīni",
            EXACT_ANALYSIS,
            "typed-lexical-source-analysis",
            "lexically-licensed-source-analysis",
            ["xi", "ī", "ni"],
            "ī",
            "long-vowel-ni-or-hui",
            "authorized",
            true,
            [
                ["collapse-wall", "wall", "available-not-asserted"],
                ["slide-or-collapse-mountainside", "mountainside",
                    "available-not-asserted"],
            ],
        ]);
    });

    s.eq("editorial hyphens preserve quantity identity without changing the word", [
        shortApplications.map(application => application.resultFrame?.surfaceRealization),
        longApplications.map(application => application.resultFrame?.surfaceRealization),
        shortApplications.map(application => Boolean(findExactAnalysis(application))),
        longApplications.map(application => Boolean(findExactAnalysis(application))),
    ], [
        ["xini", "xini"],
        ["xīni", "xīni"],
        [false, false],
        [true, true],
    ]);

    s.eq("context cannot recover long lexical meanings from a short source", (
        shortApplications.map(application => {
            const meaningFrame = ctx.buildClassicalNahuatlExtantDestockalMeaningFrame({
                applicationFrame: application,
            });
            const contextual = ctx.interpretClassicalNahuatlExtantDestockalReading({
                meaningFrame,
                context: {
                    participantFrame:
                        application.resultFrame?.participantProjection?.sourceSubject,
                    referentKind: "wall",
                },
                requestedReading: "collapse-wall",
            });
            return [
                meaningFrame.authorizationStatus,
                contextual.authorizationStatus,
                contextual.blockReason,
                contextual.selectedReading,
                contextual.supportedReadings.length,
                contextual.sourceAdmissionAuthority,
                contextual.grammarGenerationAuthority,
            ];
        })
    ), SHORT.map(() => [
        "blocked",
        "blocked",
        "owner-issued-extant-destockal-meaning-required",
        "",
        0,
        false,
        false,
    ]));

    const shortCausatives = SHORT.map(sourceStem => (
        prepareImpersonalCausative(ctx, sourceStem)
    ));
    SHORT.forEach((sourceStem, index) => {
        const prepared = shortCausatives[index];
        s.eq(`${sourceStem}: generic causative choices remain open without the long rule`, [
            ctx.isClassicalNahuatlVncDerivationOptionInventory(prepared.inventory),
            prepared.inventory?.authorizationStatus,
            prepared.inventory?.options?.length > 0,
            prepared.inventory?.options?.some(option => option.derivationType === "causative"),
            prepared.inventory?.options?.some(option => option.ruleId === EXACT_RULE),
            prepared.exactOption,
        ], [true, "authorized", true, true, false, null]);
    });

    const longCausatives = LONG.map(sourceStem => (
        prepareImpersonalCausative(ctx, sourceStem)
    ));
    LONG.forEach((sourceStem, index) => {
        const prepared = longCausatives[index];
        const option = prepared.exactOption;
        s.eq(`${sourceStem}: causative inventory exposes the exact long rule`, [
            ctx.isClassicalNahuatlVncDerivationOptionInventory(prepared.inventory),
            prepared.inventory?.authorizationStatus,
            prepared.inventory?.options?.includes(option),
            option?.ruleId,
            option?.derivationSubtype,
            option?.derivationRoute,
            option?.sourceAnalysisId,
            option?.sourceAnalysisFrame?.analyses?.find(analysis => (
                analysis.analysisId === option.sourceAnalysisId
            ))?.category,
            option?.targetStem,
            option?.targetClass,
            option?.targetConstruction?.underlyingSource,
            option?.exactWitness,
        ], [
            true,
            "authorized",
            true,
            EXACT_RULE,
            "type-one",
            "type-one-fused-destockal-xini-addition-exact",
            EXACT_ANALYSIS,
            "fused-destockal-ni-exact",
            "xī-ni-ā",
            "C",
            "xi-ī-ni",
            true,
        ]);
    });

    LONG.forEach((sourceStem, index) => {
        const application = applyExactCausative(ctx, longCausatives[index]);
        const operation = application.resultFrame?.derivationOperationFrame;
        const meaningFrame = ctx.buildClassicalNahuatlExtantDestockalMeaningFrame({
            applicationFrame: application,
        });
        s.eq(`${sourceStem}: exact derivation keeps its word, formula, and causal readings`, [
            application.authorizationStatus,
            ctx.isClassicalNahuatlVncApplicationFrame(application),
            application.resultFrame?.formulaRealization,
            application.resultFrame?.surfaceRealization,
            operation?.selectedOption?.ruleId,
            operation?.selectedOption?.sourceAnalysisId,
            operation?.targetStem,
            operation?.targetClass,
            meaningFrame.authorizationStatus,
            ctx.isClassicalNahuatlExtantDestockalMeaningFrame(meaningFrame),
            meaningFrame.relationKind,
            meaningFrame.sourceReadings,
            meaningFrame.availableReadings?.map(reading => [
                reading.meaningId,
                reading.contextCondition.requiredReferentKind,
                reading.availabilityStatus,
            ]),
            meaningFrame.meaningAssertionStatus,
            meaningFrame.selectedReading,
        ], [
            "authorized",
            true,
            "#ni-0+tla(xī-ni-a)0+0-0#",
            "nitlaxīnia",
            EXACT_RULE,
            EXACT_ANALYSIS,
            "xī-ni-ā",
            "C",
            "authorized",
            true,
            "causative",
            [],
            [
                ["ravel", "", "available-not-asserted"],
                ["rip-out-stitches", "stitches", "available-not-asserted"],
            ],
            "available-not-asserted",
            "",
        ]);
    });

    s.eq("copied frames cannot mint long analysis, inventory, or meaning authority", [
        ctx.isClassicalNahuatlVncApplicationFrame(
            JSON.parse(JSON.stringify(longApplications[0])),
        ),
        ctx.isClassicalNahuatlVncDerivationSourceAnalysisFrame(
            JSON.parse(JSON.stringify(longApplications[0].resultFrame.sourceAnalysisFrame)),
        ),
        ctx.isClassicalNahuatlVncDerivationOptionInventory(
            JSON.parse(JSON.stringify(longCausatives[0].inventory)),
        ),
        ctx.isClassicalNahuatlExtantDestockalMeaningFrame(JSON.parse(JSON.stringify(
            ctx.buildClassicalNahuatlExtantDestockalMeaningFrame({
                applicationFrame: longApplications[0],
            }),
        ))),
    ], [false, false, false, false]);

    return s;
}

module.exports = { run };
