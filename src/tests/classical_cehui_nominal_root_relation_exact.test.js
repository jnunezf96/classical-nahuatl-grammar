"use strict";

const { createSuite } = require("./runner");

const OWNER = "classical-destockal-irregular-source-lifecycle";
const PREFIX = "ClassicalDestockalIrregularSourceLifecycle";
const SELECTION = "claim-p2343-nominal-cehui";
const BASE = "constraints.destockalIrregularSourceLifecycle"
    + ".extantFusedSources.cehui.nominalRootRelation";
const ICE_FACET =
    "aci-p204-l004-ae01b03f8b-10-cehui-nominal-root-ice";
const ICICLE_FACET =
    "aci-p204-l004-ae01b03f8b-11-cehui-nominal-icicle";
const CEHUI_ANALYSIS =
    "cn-l24-2459-cehui-fused-destockal:fused-destockal-hui-exact";

function buildSourceMeaning(ctx, sourceStem = "cē-hui") {
    const applicationFrame = ctx.evaluateClassicalNahuatlVncApplication({
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
    return {
        applicationFrame,
        meaningFrame: ctx.buildClassicalNahuatlExtantDestockalMeaningFrame({
            applicationFrame,
        }),
    };
}

function buildNoun(ctx, {
    stem = "ce",
    sourceClass = "tl-1-a",
    embedStem = "",
    matrixStem = "",
} = {}) {
    const sourceInput = { stem };
    if (sourceClass) sourceInput.sourceClass = sourceClass;
    if (embedStem || matrixStem) {
        sourceInput.embedStem = embedStem;
        sourceInput.matrixStem = matrixStem;
    }
    const sourceFrame = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame(
        sourceInput,
    );
    const operationFrame = ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
        sourceFrame,
        {
            state: "absolutive",
            subject: "3common",
            humanness: "nonhuman",
        },
    );
    const resultFrame = ctx.evaluateClassicalNahuatlOrdinaryNnc(
        sourceFrame,
        operationFrame,
    );
    return { sourceFrame, operationFrame, resultFrame };
}

function receipt(ctx, facet) {
    const source = ctx[`build${PREFIX}Source`]({
        analysisDomain: OWNER,
        selection: SELECTION,
        requestedFacet: facet,
        participantChoice: `${SELECTION}:${facet}`,
    });
    const result = ctx[`evaluate${PREFIX}`](source);
    return {
        source,
        result,
        evidence: ctx[`get${PREFIX}ExecutionEvidence`](result),
    };
}

function summarizeReading(reading) {
    return [
        reading?.meaningId,
        reading?.meaning,
        reading?.availabilityStatus,
        reading?.nounSourceFrame?.stem,
        reading?.nounSourceFrame?.nounClass,
        reading?.nounResult?.formulaRealization,
        reading?.nounResult?.surfaceRealization,
    ];
}

function run(ctx = {}) {
    const s = createSuite("classical_cehui_nominal_root_relation_exact");

    s.eq("the public runtime exposes the issued noun-relation boundary", [
        typeof ctx.buildClassicalNahuatlExtantDestockalNounRelationFrame,
        typeof ctx.isClassicalNahuatlExtantDestockalNounRelationFrame,
    ], ["function", "function"]);

    const source = buildSourceMeaning(ctx);
    s.eq("cē-hui supplies the exact short ce lexical root", [
        source.applicationFrame.authorizationStatus,
        ctx.isClassicalNahuatlVncApplicationFrame(source.applicationFrame),
        source.applicationFrame.resultFrame?.formulaRealization,
        source.applicationFrame.resultFrame?.surfaceRealization,
        source.meaningFrame.authorizationStatus,
        ctx.isClassicalNahuatlExtantDestockalMeaningFrame(source.meaningFrame),
        source.meaningFrame.relationKind,
        source.meaningFrame.sourceAnalysis?.analysisId,
        source.meaningFrame.sourceAnalysis?.root,
        source.meaningFrame.sourceAnalysis?.segments,
        source.meaningFrame.sourceAnalysis?.stockFormative,
    ], [
        "authorized",
        true,
        "#0-0(cē-hui)0+0-0#",
        "cēhui",
        "authorized",
        true,
        "source",
        CEHUI_ANALYSIS,
        "ce",
        ["ce", "ē", "hui"],
        "ē",
    ]);

    const noun = buildNoun(ctx);
    s.eq("ordinary NNC independently issues short ce as tl-class cetl", [
        noun.sourceFrame.authorizationStatus,
        ctx.isClassicalNahuatlOrdinaryNncSourceFrame(noun.sourceFrame),
        noun.sourceFrame.stem,
        noun.sourceFrame.sourceClass,
        noun.sourceFrame.nounClass,
        noun.sourceFrame.subclass,
        noun.sourceFrame.compoundSource,
        noun.operationFrame.authorizationStatus,
        ctx.isClassicalNahuatlOrdinaryNncOperationFrame(noun.operationFrame),
        noun.operationFrame.subject,
        noun.operationFrame.referentialAnimacy,
        noun.operationFrame.referentialHumanness,
        noun.resultFrame.authorizationStatus,
        ctx.isClassicalNahuatlOrdinaryNncResult(noun.resultFrame),
        noun.resultFrame.formulaRealization,
        noun.resultFrame.surfaceRealization,
    ], [
        "authorized",
        true,
        "ce",
        "tl-1-a",
        "tl",
        "tl-1-a",
        false,
        "authorized",
        true,
        "3common",
        "nonanimate",
        "nonhuman",
        "authorized",
        true,
        "#0-0(ce)tl-0#",
        "cetl",
    ]);

    const relation =
        ctx.buildClassicalNahuatlExtantDestockalNounRelationFrame({
            meaningFrame: source.meaningFrame,
            nounResult: noun.resultFrame,
        });
    s.eq("the lexical relation binds the two exact issued sources by identity", [
        relation.authorizationStatus,
        relation.blockReason,
        ctx.isClassicalNahuatlExtantDestockalNounRelationFrame(relation),
        relation.kind,
        relation.version,
        relation.relationKind,
        relation.root,
        relation.meaningFrame === source.meaningFrame,
        relation.sourceAnalysisFrame === source.meaningFrame.sourceAnalysisFrame,
        relation.sourceAnalysis === source.meaningFrame.sourceAnalysis,
        relation.nounResult === noun.resultFrame,
        relation.nounSourceFrame === noun.sourceFrame,
        relation.nounOperationFrame === noun.operationFrame,
        Object.isFrozen(relation),
    ], [
        "authorized",
        "",
        true,
        "classical-nahuatl-extant-destockal-noun-relation-frame",
        1,
        "shared-lexical-root",
        "ce",
        true,
        true,
        true,
        true,
        true,
        true,
        true,
    ]);

    s.eq("ice and icicle remain available readings, neither asserted", [
        relation.availableReadings.map(summarizeReading),
        relation.availableReadings.every(reading => (
            reading.nounSourceFrame === noun.sourceFrame
            && reading.nounResult === noun.resultFrame
            && Object.isFrozen(reading)
        )),
        relation.selectedReading,
    ], [
        [
            ["ice", "ice", "available-not-asserted", "ce", "tl",
                "#0-0(ce)tl-0#", "cetl"],
            ["icicle", "icicle", "available-not-asserted", "ce", "tl",
                "#0-0(ce)tl-0#", "cetl"],
        ],
        true,
        "",
    ]);

    s.eq("the relation neither changes grammar nor infers animacy or number", [
        relation.productiveDerivation,
        relation.changesMorphology,
        relation.infersGrammaticalAnimacy,
        relation.infersNumber,
        relation.sourceAdmissionAuthority,
        relation.grammarGenerationAuthority,
        relation.callerSuppliedAuthorityAccepted,
        relation.formulaStringAuthority,
        relation.surfaceStringAuthority,
        relation.canvasExampleAuthority,
        relation.nounResult.formulaRealization,
        relation.nounResult.surfaceRealization,
        relation.meaningFrame.resultFrame.formulaRealization,
        relation.meaningFrame.resultFrame.surfaceRealization,
    ], [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        "#0-0(ce)tl-0#",
        "cetl",
        "#0-0(cē-hui)0+0-0#",
        "cēhui",
    ]);

    const iceReceipt = receipt(ctx, ICE_FACET);
    const iceValue = iceReceipt.result.payload?.facetValue;
    s.eq("the ice atom directly observes the whole issued root relation", [
        iceReceipt.result.authorizationStatus,
        iceReceipt.result.payload?.effectiveCanonicalPath,
        iceReceipt.result.payload?.sourceCanonicalPath,
        iceReceipt.result.payload?.proofObservationKind,
        ctx[`is${PREFIX}Result`](iceReceipt.result),
        ctx[`is${PREFIX}ExecutionEvidence`](
            iceReceipt.evidence,
            iceReceipt.result,
        ),
        iceValue?.kind,
        iceValue?.relationKind,
        iceValue?.root,
        iceValue?.sourceAnalysis?.analysisId,
        iceValue?.nounSourceFrame?.stem,
        iceValue?.nounSourceFrame?.nounClass,
        iceValue?.availableReadings?.map(reading => reading.meaningId),
        iceValue?.selectedReading,
        iceValue?.productiveDerivation,
        iceValue?.infersGrammaticalAnimacy,
    ], [
        "authorized",
        BASE,
        BASE,
        "direct-canonical-result-observation",
        true,
        true,
        "classical-nahuatl-extant-destockal-noun-relation-frame",
        "shared-lexical-root",
        "ce",
        CEHUI_ANALYSIS,
        "ce",
        "tl",
        ["ice", "icicle"],
        "",
        false,
        false,
    ]);

    const icicleReceipt = receipt(ctx, ICICLE_FACET);
    s.eq("the icicle atom directly observes only the second available reading", [
        icicleReceipt.result.authorizationStatus,
        icicleReceipt.result.payload?.effectiveCanonicalPath,
        icicleReceipt.result.payload?.sourceCanonicalPath,
        icicleReceipt.result.payload?.proofObservationKind,
        ctx[`is${PREFIX}Result`](icicleReceipt.result),
        ctx[`is${PREFIX}ExecutionEvidence`](
            icicleReceipt.evidence,
            icicleReceipt.result,
        ),
        summarizeReading(icicleReceipt.result.payload?.facetValue),
    ], [
        "authorized",
        `${BASE}.availableReadings.1`,
        `${BASE}.availableReadings.1`,
        "direct-canonical-result-observation",
        true,
        true,
        ["icicle", "icicle", "available-not-asserted", "ce", "tl",
            "#0-0(ce)tl-0#", "cetl"],
    ]);

    const copiedMeaning = { ...source.meaningFrame };
    const copiedNounResult = { ...noun.resultFrame };
    const copiedRelation = { ...relation };
    const relationFromCopiedMeaning =
        ctx.buildClassicalNahuatlExtantDestockalNounRelationFrame({
            meaningFrame: copiedMeaning,
            nounResult: noun.resultFrame,
        });
    const relationFromCopiedNoun =
        ctx.buildClassicalNahuatlExtantDestockalNounRelationFrame({
            meaningFrame: source.meaningFrame,
            nounResult: copiedNounResult,
        });
    s.eq("copies cannot mint either side or the relation itself", [
        relationFromCopiedMeaning.authorizationStatus,
        relationFromCopiedMeaning.blockReason,
        relationFromCopiedNoun.authorizationStatus,
        relationFromCopiedNoun.blockReason,
        ctx.isClassicalNahuatlExtantDestockalNounRelationFrame(copiedRelation),
    ], [
        "blocked",
        "canonical-extant-destockal-source-meaning-required",
        "blocked",
        "canonical-ordinary-nnc-result-required",
        false,
    ]);

    const injectedRoot =
        ctx.buildClassicalNahuatlExtantDestockalNounRelationFrame({
            meaningFrame: source.meaningFrame,
            nounResult: noun.resultFrame,
            root: "ce",
        });
    const injectedAuthority =
        ctx.buildClassicalNahuatlExtantDestockalNounRelationFrame({
            meaningFrame: source.meaningFrame,
            nounResult: noun.resultFrame,
            sourceAdmissionAuthority: true,
        });
    s.eq("caller-injected facts and authority keys are rejected", [
        injectedRoot.authorizationStatus,
        injectedRoot.blockReason,
        injectedAuthority.authorizationStatus,
        injectedAuthority.blockReason,
    ], [
        "blocked",
        "extant-destockal-noun-relation-accepts-issued-inputs-only",
        "blocked",
        "extant-destockal-noun-relation-accepts-issued-inputs-only",
    ]);

    const longNoun = buildNoun(ctx, { stem: "cē" });
    const longRelation =
        ctx.buildClassicalNahuatlExtantDestockalNounRelationFrame({
            meaningFrame: source.meaningFrame,
            nounResult: longNoun.resultFrame,
        });
    s.eq("long cē remains a valid noun input but is not the short ce relation", [
        longNoun.resultFrame.authorizationStatus,
        ctx.isClassicalNahuatlOrdinaryNncResult(longNoun.resultFrame),
        longNoun.resultFrame.formulaRealization,
        longNoun.resultFrame.surfaceRealization,
        longRelation.authorizationStatus,
        longRelation.blockReason,
    ], [
        "authorized",
        true,
        "#0-0(cē)tl-0#",
        "cētl",
        "blocked",
        "exact-shared-root-and-noun-class-required",
    ]);

    const wrongClassNoun = buildNoun(ctx, {
        stem: "ce",
        sourceClass: "zero",
    });
    const wrongClassRelation =
        ctx.buildClassicalNahuatlExtantDestockalNounRelationFrame({
            meaningFrame: source.meaningFrame,
            nounResult: wrongClassNoun.resultFrame,
        });
    const compoundNoun = buildNoun(ctx, {
        stem: "ce",
        sourceClass: "tl-1-a",
        embedStem: "c",
        matrixStem: "e",
    });
    const compoundRelation =
        ctx.buildClassicalNahuatlExtantDestockalNounRelationFrame({
            meaningFrame: source.meaningFrame,
            nounResult: compoundNoun.resultFrame,
        });
    s.eq("wrong noun classes and compound analyses cannot satisfy the relation", [
        wrongClassNoun.resultFrame.authorizationStatus,
        wrongClassNoun.sourceFrame.nounClass,
        wrongClassRelation.authorizationStatus,
        wrongClassRelation.blockReason,
        compoundNoun.resultFrame.authorizationStatus,
        compoundNoun.sourceFrame.compoundSource,
        compoundRelation.authorizationStatus,
        compoundRelation.blockReason,
    ], [
        "authorized",
        "zero",
        "blocked",
        "exact-shared-root-and-noun-class-required",
        "authorized",
        true,
        "blocked",
        "exact-shared-root-and-noun-class-required",
    ]);

    const wrongSource = buildSourceMeaning(ctx, "mī-ni");
    const wrongSourceRelation =
        ctx.buildClassicalNahuatlExtantDestockalNounRelationFrame({
            meaningFrame: wrongSource.meaningFrame,
            nounResult: noun.resultFrame,
        });
    s.eq("an unrelated licensed VNC meaning cannot borrow the ce noun relation", [
        wrongSource.meaningFrame.authorizationStatus,
        wrongSource.meaningFrame.sourceAnalysis?.root,
        wrongSourceRelation.authorizationStatus,
        wrongSourceRelation.blockReason,
    ], [
        "authorized",
        "mi",
        "blocked",
        "exact-destockal-noun-relation-not-licensed",
    ]);

    const openNoun = buildNoun(ctx, { stem: "xe" });
    const openRelation =
        ctx.buildClassicalNahuatlExtantDestockalNounRelationFrame({
            meaningFrame: source.meaningFrame,
            nounResult: openNoun.resultFrame,
        });
    s.eq("the lexical relation does not narrow ordinary open NNC admission", [
        openNoun.sourceFrame.authorizationStatus,
        openNoun.sourceFrame.openStemSource,
        openNoun.operationFrame.authorizationStatus,
        openNoun.resultFrame.authorizationStatus,
        ctx.isClassicalNahuatlOrdinaryNncResult(openNoun.resultFrame),
        openNoun.resultFrame.formulaRealization,
        openNoun.resultFrame.surfaceRealization,
        openRelation.authorizationStatus,
        openRelation.blockReason,
        noun.resultFrame.formulaRealization,
        noun.resultFrame.surfaceRealization,
    ], [
        "authorized",
        true,
        "authorized",
        "authorized",
        true,
        "#0-0(xe)tl-0#",
        "xetl",
        "blocked",
        "exact-shared-root-and-noun-class-required",
        "#0-0(ce)tl-0#",
        "cetl",
    ]);

    return s;
}

module.exports = { run };
