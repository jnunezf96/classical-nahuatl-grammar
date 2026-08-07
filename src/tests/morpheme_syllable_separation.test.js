"use strict";

const { createSuite } = require("./runner");

const OPERATION_ID = "classical.morpheme.syllable.rank.separate";

function conceptResult(ctx, selection) {
    return ctx.evaluateClassicalGrammarConcept(
        ctx.buildClassicalGrammarConceptSource({
            domain: "morpheme",
            selection,
        }),
    );
}

function meaningfulResult(ctx, candidateKind = "morpheme") {
    return ctx.evaluateClassicalMeaningfulMorphemeUnitClassification(
        ctx.buildClassicalMeaningfulMorphemeUnitClassificationSource({
            candidateResult: conceptResult(ctx, candidateKind),
        }),
    );
}

function rankResult(ctx, rankTier = "syllable", subsystem = "phonological") {
    return ctx.evaluateClassicalCarrierRankTaxonomy(
        ctx.buildClassicalCarrierRankTaxonomySource({ subsystem, rankTier }),
    );
}

function separate(ctx, {
    candidateKind = "morpheme",
    rankTier = "syllable",
    subsystem = "phonological",
    requestedAnalysisKind = "rank-contrast",
    meaningfulUnitResult = null,
    syllableRankResult = null,
} = {}) {
    const source = ctx.buildClassicalMorphemeSyllableSeparationSource({
        meaningfulUnitResult:
            meaningfulUnitResult || meaningfulResult(ctx, candidateKind),
        syllableRankResult:
            syllableRankResult || rankResult(ctx, rankTier, subsystem),
        requestedAnalysisKind,
    });
    const result = ctx.evaluateClassicalMorphemeSyllableSeparation(source);
    const evidence = ctx
        .getClassicalMorphemeSyllableSeparationExecutionEvidence(result);
    return { source, result, evidence };
}

function run(ctx = {}) {
    const s = createSuite("morpheme_syllable_separation");
    const apiNames = [
        "buildClassicalMorphemeSyllableSeparationSource",
        "isClassicalMorphemeSyllableSeparationSource",
        "evaluateClassicalMorphemeSyllableSeparation",
        "isClassicalMorphemeSyllableSeparationResult",
        "isClassicalMorphemeSyllableSeparationOperationContract",
        "getClassicalMorphemeSyllableSeparationExecutionEvidence",
        "isClassicalMorphemeSyllableSeparationExecutionEvidence",
    ];
    s.eq(
        "the owner exposes an independent typed Source Result contract and route API",
        apiNames.map((name) => [name, typeof ctx[name]]),
        apiNames.map((name) => [name, "function"]),
    );

    const positiveCases = [
        ["morpheme", "rank-contrast"],
        ["morph", "rank-contrast"],
        ["morpheme", "coterminality-permission"],
        ["morph", "coterminality-permission"],
    ];
    s.eq(
        "both meaningful unit kinds execute both distinct analyses through two retained prerequisite owners",
        positiveCases.map(([candidateKind, requestedAnalysisKind]) => {
            const { source, result, evidence } = separate(ctx, {
                candidateKind,
                requestedAnalysisKind,
            });
            return {
                candidateKind,
                requestedAnalysisKind,
                sourceValid:
                    ctx.isClassicalMorphemeSyllableSeparationSource(source),
                resultValid:
                    ctx.isClassicalMorphemeSyllableSeparationResult(result),
                evidenceValid:
                    ctx.isClassicalMorphemeSyllableSeparationExecutionEvidence(
                        evidence,
                        result,
                    ),
                status: result.authorizationStatus,
                owner: result.semanticOwnerId,
                operation: result.operationId,
                relation: result.rankRelation,
                coterminality: result.coterminalityStatus,
                currentExecutionCount: evidence.routeSteps.filter((step) =>
                    step.invocationRole !== "prerequisite"
                    && step.executedRuleIds.includes(OPERATION_ID)).length,
                meaningfulPrerequisite: evidence.routeSteps.some((step) =>
                    step.invocationRole === "prerequisite"
                    && step.stepId.startsWith("meaningful-unit-result.")
                    && step.executedRuleIds.includes(
                        "classical.morpheme.meaningful-unit.classify",
                    )),
                rankPrerequisite: evidence.routeSteps.some((step) =>
                    step.invocationRole === "prerequisite"
                    && step.stepId.startsWith("syllable-rank-result.")
                    && step.executedRuleIds.includes(
                        "classical.carrier.rank.taxonomy.classify",
                    )),
            };
        }),
        positiveCases.map(([candidateKind, requestedAnalysisKind]) => ({
            candidateKind,
            requestedAnalysisKind,
            sourceValid: true,
            resultValid: true,
            evidenceValid: true,
            status: "authorized",
            owner: "morpheme-syllable-separation",
            operation: OPERATION_ID,
            relation: "distinct-ranks",
            coterminality: requestedAnalysisKind === "coterminality-permission"
                ? "permitted-without-rank-merger"
                : "not-evaluated-by-rank-contrast",
            currentExecutionCount: 1,
            meaningfulPrerequisite: true,
            rankPrerequisite: true,
        })),
    );

    s.eq(
        "rank contrast and coterminality are distinct exact outputs and examples remain evidence only",
        ["rank-contrast", "coterminality-permission"].map(
            (requestedAnalysisKind) => {
                const { result } = separate(ctx, { requestedAnalysisKind });
                return {
                    requestedAnalysisKind,
                    classification: result.classificationStatus,
                    facts: result.facts,
                    containsStoredExample: result.facts.some(
                        (fact) => fact === "if" || fact === "nest",
                    ),
                    generation: [
                        result.unitConstructed,
                        result.unitSegmented,
                        result.boundaryRewritten,
                        result.generationAllowed,
                        result.soundedSurfaceGenerated,
                        result.writtenSurfaceGenerated,
                        result.formulaGenerated,
                    ],
                };
            },
        ),
        [
            {
                requestedAnalysisKind: "rank-contrast",
                classification: "validated-morpheme-syllable-rank-contrast",
                facts: [
                    "morpheme-or-morph-is-an-element-not-a-combination-or-sequence",
                    "morpheme-or-morph-has-meaning-while-a-syllable-does-not",
                    "morpheme-or-morph-may-have-a-sigeme-or-sig-as-meaning-carrier",
                    "sounded-monophonemic-or-monophonic-carrier-may-be-one-consonant-or-vowel",
                    "sounded-polyphonemic-or-polyphonic-carrier-may-be-consonants-alone-or-consonant-vowel-combination",
                ],
                containsStoredExample: false,
                generation: Array(7).fill(false),
            },
            {
                requestedAnalysisKind: "coterminality-permission",
                classification:
                    "validated-morpheme-syllable-coterminality-permission",
                facts: [
                    "morpheme-or-morph-may-be-coterminous-with-a-syllable",
                    "coterminality-does-not-merge-morpheme-or-morph-with-syllable-rank",
                    "vocable-and-word-analysis-remain-distinct-when-surface-span-is-shared",
                ],
                containsStoredExample: false,
                generation: Array(7).fill(false),
            },
        ],
    );

    const copiedMeaningful = Object.freeze({ ...meaningfulResult(ctx) });
    const copiedRank = Object.freeze({ ...rankResult(ctx) });
    const hostileCases = [
        {
            id: "vocable-rank",
            args: { rankTier: "vocable" },
            reason: "exact-phonological-syllable-rank-result-required",
        },
        {
            id: "graphological-syllable",
            args: { subsystem: "graphological" },
            reason: "exact-phonological-syllable-rank-result-required",
        },
        {
            id: "copied-meaningful",
            args: { meaningfulUnitResult: copiedMeaningful },
            reason: "owner-issued-meaningful-unit-result-required",
        },
        {
            id: "copied-rank",
            args: { syllableRankResult: copiedRank },
            reason: "owner-issued-syllable-rank-result-required",
        },
        {
            id: "unsupported-analysis",
            args: { requestedAnalysisKind: "stored-answer" },
            reason: "morpheme-syllable-analysis-kind-required",
        },
    ];
    s.eq(
        "wrong ranks copied Results and answer-like analysis labels fail closed without current execution",
        hostileCases.map(({ id, args }) => {
            const { source, result, evidence } = separate(ctx, args);
            return {
                id,
                sourceStatus: source.authorizationStatus,
                resultStatus: result.authorizationStatus,
                reason: result.blockReason,
                resultValid:
                    ctx.isClassicalMorphemeSyllableSeparationResult(result),
                evidenceValid:
                    ctx.isClassicalMorphemeSyllableSeparationExecutionEvidence(
                        evidence,
                        result,
                    ),
                currentExecution: evidence.routeSteps.some((step) =>
                    step.invocationRole !== "prerequisite"
                    && step.executedRuleIds.includes(OPERATION_ID)),
            };
        }),
        hostileCases.map(({ id, reason }) => ({
            id,
            sourceStatus: "blocked",
            resultStatus: "blocked",
            reason,
            resultValid: true,
            evidenceValid: true,
            currentExecution: false,
        })),
    );

    s.eq(
        "the former label-only concept route is retired",
        (() => {
            const source = ctx.buildClassicalGrammarConceptSource({
                domain: "carrier-unit",
                selection: "morpheme-versus-syllable",
                assertedClassification: "rank-separation",
            });
            const result = ctx.evaluateClassicalGrammarConcept(source);
            return {
                sourceStatus: source.authorizationStatus,
                sourceReason: source.blockReason,
                resultStatus: result.authorizationStatus,
                resultReason: result.blockReason,
            };
        })(),
        {
            sourceStatus: "blocked",
            sourceReason: "concept-source-selection-unlicensed",
            resultStatus: "blocked",
            resultReason: "owner-issued-concept-source-required",
        },
    );

    const { source, result } = separate(ctx);
    const copiedSource = Object.freeze({ ...source });
    const copiedResult = Object.freeze({ ...result });
    const copiedSourceEvaluation =
        ctx.evaluateClassicalMorphemeSyllableSeparation(copiedSource);
    s.eq(
        "copied current-owner Sources and Results do not retain identity authority",
        {
            copiedSourceValid:
                ctx.isClassicalMorphemeSyllableSeparationSource(copiedSource),
            copiedSourceStatus: copiedSourceEvaluation.authorizationStatus,
            copiedSourceReason: copiedSourceEvaluation.blockReason,
            copiedResultValid:
                ctx.isClassicalMorphemeSyllableSeparationResult(copiedResult),
            contractValid:
                ctx.isClassicalMorphemeSyllableSeparationOperationContract(
                    result.operationContract,
                ),
            meaningfulContractIsCurrent:
                ctx.isClassicalMorphemeSyllableSeparationOperationContract(
                    source.meaningfulUnitResult.operationContract,
                ),
            rankContractIsCurrent:
                ctx.isClassicalMorphemeSyllableSeparationOperationContract(
                    source.syllableRankResult.operationContract,
                ),
        },
        {
            copiedSourceValid: false,
            copiedSourceStatus: "blocked",
            copiedSourceReason:
                "owner-issued-morpheme-syllable-separation-source-required",
            copiedResultValid: false,
            contractValid: true,
            meaningfulContractIsCurrent: false,
            rankContractIsCurrent: false,
        },
    );

    for (const key of [
        "domain",
        "selection",
        "assertedClassification",
        "expectedResult",
        "storedContrast",
        "example",
        "surface",
        "formula",
        "lesson",
    ]) {
        const request = {
            meaningfulUnitResult: meaningfulResult(ctx),
            syllableRankResult: rankResult(ctx),
            requestedAnalysisKind: "rank-contrast",
            [key]: "hostile",
        };
        const hostileSource =
            ctx.buildClassicalMorphemeSyllableSeparationSource(request);
        s.eq(
            `the Source rejects the unrecognized answer-bearing constituent ${key}`,
            hostileSource.blockReason,
            `morpheme-syllable-separation-source-unrecognized-constituent:${key}`,
        );
    }

    return s;
}

module.exports = { run };
