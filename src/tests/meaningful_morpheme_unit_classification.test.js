"use strict";

const { createSuite } = require("./runner");

const OPERATION_ID = "classical.morpheme.meaningful-unit.classify";
const CANDIDATES = Object.freeze({
    morpheme: Object.freeze({
        domain: "morpheme",
        selection: "morpheme",
        owner: "morpheme-taxonomy",
        prerequisiteOperation: "classical.morpheme.taxonomy.classify",
        classification: "type-level-meaningful-unit",
        analysisLevel: "type",
    }),
    morph: Object.freeze({
        domain: "morpheme",
        selection: "morph",
        owner: "morph-token-classification",
        prerequisiteOperation:
            "classical.morpheme.morph.token.classify",
        classification: "token-level-meaningful-unit",
        analysisLevel: "token",
    }),
});

function conceptResult(ctx, domain, selection) {
    return ctx.evaluateClassicalGrammarConcept(
        ctx.buildClassicalGrammarConceptSource({ domain, selection }),
    );
}

function classify(ctx, candidateResult) {
    const source = ctx
        .buildClassicalMeaningfulMorphemeUnitClassificationSource({
            candidateResult,
        });
    const result = ctx
        .evaluateClassicalMeaningfulMorphemeUnitClassification(source);
    const evidence = ctx
        .getClassicalMeaningfulMorphemeUnitClassificationExecutionEvidence(
            result,
        );
    return { source, result, evidence };
}

function run(ctx = {}) {
    const s = createSuite("meaningful_morpheme_unit_classification");

    const apiNames = [
        "buildClassicalMeaningfulMorphemeUnitClassificationSource",
        "isClassicalMeaningfulMorphemeUnitClassificationSource",
        "evaluateClassicalMeaningfulMorphemeUnitClassification",
        "isClassicalMeaningfulMorphemeUnitClassificationResult",
        "isClassicalMeaningfulMorphemeUnitClassificationOperationContract",
        "getClassicalMeaningfulMorphemeUnitClassificationExecutionEvidence",
        "isClassicalMeaningfulMorphemeUnitClassificationExecutionEvidence",
    ];
    s.eq(
        "the family classifier exposes an independent Source, Result, contract, and evidence API",
        apiNames.map((name) => [name, typeof ctx[name]]),
        apiNames.map((name) => [name, "function"]),
    );

    s.eq(
        "morpheme and morph Results retain distinct prerequisite owners and operations",
        Object.entries(CANDIDATES).map(([candidateKind, candidate]) => {
            const prerequisiteResult = conceptResult(
                ctx,
                candidate.domain,
                candidate.selection,
            );
            const { source, result, evidence } = classify(
                ctx,
                prerequisiteResult,
            );
            return {
                candidateKind,
                sourceValid: ctx
                    .isClassicalMeaningfulMorphemeUnitClassificationSource(
                        source,
                    ),
                resultValid: ctx
                    .isClassicalMeaningfulMorphemeUnitClassificationResult(
                        result,
                    ),
                evidenceValid: ctx
                    .isClassicalMeaningfulMorphemeUnitClassificationExecutionEvidence(
                        evidence,
                        result,
                    ),
                status: result.authorizationStatus,
                owner: result.semanticOwnerId,
                operation: result.operationId,
                candidateOwner: result.candidateSemanticOwnerId,
                candidateOperation: result.candidateOperationId,
                candidateClassification: result.candidateClassification,
                analysisLevel: result.analysisLevel,
                familyIdentity: result.familyIdentity,
                prerequisiteExecuted: evidence.routeSteps.some((step) =>
                    step.invocationRole === "prerequisite"
                    && step.executedRuleIds.includes(
                        candidate.prerequisiteOperation,
                    )),
                currentOperationCount: evidence.routeSteps.filter((step) =>
                    step.invocationRole !== "prerequisite"
                    && step.executedRuleIds.includes(OPERATION_ID)).length,
            };
        }),
        Object.entries(CANDIDATES).map(([candidateKind, candidate]) => ({
            candidateKind,
            sourceValid: true,
            resultValid: true,
            evidenceValid: true,
            status: "authorized",
            owner: "meaningful-morpheme-unit-classification",
            operation: OPERATION_ID,
            candidateOwner: candidate.owner,
            candidateOperation: candidate.prerequisiteOperation,
            candidateClassification: candidate.classification,
            analysisLevel: candidate.analysisLevel,
            familyIdentity: `meaningful-morpheme-unit:${candidateKind}`,
            prerequisiteExecuted: true,
            currentOperationCount: 1,
        })),
    );

    s.eq(
        "the fixed two-member definition is read-only and does not absorb later syllable or hierarchy claims",
        (() => {
            const { result } = classify(
                ctx,
                conceptResult(ctx, "morpheme", "morpheme"),
            );
            return {
                family: result.hierarchyFamily,
                constituents: result.familyConstituentKinds,
                facts: result.facts,
                restrictions: result.restrictions,
                nonclaims: [
                    result.morphemeSyllableContrastAuthorized,
                    result.coterminalityAuthorized,
                    result.syllableFormationAuthorized,
                    result.rankConversionAuthorized,
                    result.affixHierarchyAuthorized,
                    result.unitConstructed,
                    result.unitUpgraded,
                    result.generationAllowed,
                    result.soundedSurfaceGenerated,
                    result.writtenSurfaceGenerated,
                    result.formulaGenerated,
                ],
            };
        })(),
        {
            family: "meaningful",
            constituents: ["morpheme", "morph"],
            facts: [
                "meaningful-structural-units-have-morpheme-or-morph-constituents",
                "morpheme-is-a-meaningful-structural-unit",
            ],
            restrictions: [
                "membership-requires-an-independently-owner-issued-morpheme-or-morph-result",
                "morpheme-taxonomy-and-morph-token-classification-remain-independent-owners",
                "one-prerequisite-owner-proof-cannot-satisfy-the-other-owner",
                "a-family-label-or-stored-catalog-does-not-authorize-membership",
                "copied-prerequisite-results-do-not-retain-owner-authority",
                "sigeme-seme-and-carrier-owners-remain-separate",
                "morpheme-syllable-separation-and-coterminality-are-separately-owned",
                "syllable-formation-and-rank-conversion-are-separately-owned",
                "affix-hierarchy-and-combinatorial-types-are-separately-owned",
                "classification-does-not-construct-or-upgrade-a-unit",
                "classification-does-not-generate-a-formula-or-surface",
            ],
            nonclaims: Array(11).fill(false),
        },
    );

    s.eq(
        "other owner-issued linguistic elements retain their own live route but cannot enter the family",
        ["sigeme", "sememe", "phoneme"].map((selection) => {
            const { source, result, evidence } = classify(
                ctx,
                conceptResult(ctx, "linguistic-element", selection),
            );
            return {
                selection,
                sourceStatus: source.authorizationStatus,
                reason: result.blockReason,
                resultValid: ctx
                    .isClassicalMeaningfulMorphemeUnitClassificationResult(
                        result,
                    ),
                evidenceValid: ctx
                    .isClassicalMeaningfulMorphemeUnitClassificationExecutionEvidence(
                        evidence,
                        result,
                    ),
                prerequisiteExecuted: evidence.routeSteps.some((step) =>
                    step.invocationRole === "prerequisite"
                    && step.executedRuleIds.length > 0),
                currentExecuted: evidence.routeSteps.some((step) =>
                    step.invocationRole !== "prerequisite"
                    && step.executedRuleIds.includes(OPERATION_ID)),
            };
        }),
        ["sigeme", "sememe", "phoneme"].map((selection) => ({
            selection,
            sourceStatus: "blocked",
            reason: "meaningful-morpheme-unit-candidate-kind-unlicensed",
            resultValid: true,
            evidenceValid: true,
            prerequisiteExecuted: true,
            currentExecuted: false,
        })),
    );

    s.eq(
        "carrier-family and syllable-rank Results stay under their separate owners and are rejected with retained prerequisite routes",
        (() => {
            const carrierFamily = ctx
                .evaluateClassicalMeaninglessCarrierUnitClassification(
                    ctx
                        .buildClassicalMeaninglessCarrierUnitClassificationSource({
                            candidateResult: conceptResult(
                                ctx,
                                "linguistic-element",
                                "phoneme",
                            ),
                        }),
                );
            const syllableRank = ctx.evaluateClassicalCarrierRankTaxonomy(
                ctx.buildClassicalCarrierRankTaxonomySource({
                    subsystem: "phonological",
                    rankTier: "syllable",
                }),
            );
            return [
                ["carrier-family", carrierFamily],
                ["syllable-rank", syllableRank],
            ].map(([candidateKind, candidateResult]) => {
                const { source, result, evidence } = classify(
                    ctx,
                    candidateResult,
                );
                return {
                    candidateKind,
                    prerequisiteOwner: candidateResult.semanticOwnerId,
                    sourceStatus: source.authorizationStatus,
                    reason: result.blockReason,
                    resultValid: ctx
                        .isClassicalMeaningfulMorphemeUnitClassificationResult(
                            result,
                        ),
                    evidenceValid: ctx
                        .isClassicalMeaningfulMorphemeUnitClassificationExecutionEvidence(
                            evidence,
                            result,
                        ),
                    prerequisiteExecuted: evidence.routeSteps.some((step) =>
                        step.invocationRole === "prerequisite"
                        && step.executedRuleIds.length > 0),
                    currentExecuted: evidence.routeSteps.some((step) =>
                        step.invocationRole !== "prerequisite"
                        && step.executedRuleIds.includes(OPERATION_ID)),
                };
            });
        })(),
        [
            {
                candidateKind: "carrier-family",
                prerequisiteOwner:
                    "meaningless-carrier-unit-classification",
                sourceStatus: "blocked",
                reason:
                    "meaningful-morpheme-unit-candidate-kind-unlicensed",
                resultValid: true,
                evidenceValid: true,
                prerequisiteExecuted: true,
                currentExecuted: false,
            },
            {
                candidateKind: "syllable-rank",
                prerequisiteOwner: "carrier-rank-taxonomy",
                sourceStatus: "blocked",
                reason:
                    "meaningful-morpheme-unit-candidate-kind-unlicensed",
                resultValid: true,
                evidenceValid: true,
                prerequisiteExecuted: true,
                currentExecuted: false,
            },
        ],
    );

    s.eq(
        "copied Results and raw labels cannot authorize family membership",
        [
            Object.freeze({
                ...conceptResult(ctx, "morpheme", "morpheme"),
            }),
            "morpheme",
            "morph",
        ].map((candidateResult) => {
            const { source, result, evidence } = classify(
                ctx,
                candidateResult,
            );
            return {
                sourceStatus: source.authorizationStatus,
                reason: result.blockReason,
                resultValid: ctx
                    .isClassicalMeaningfulMorphemeUnitClassificationResult(
                        result,
                    ),
                evidenceValid: ctx
                    .isClassicalMeaningfulMorphemeUnitClassificationExecutionEvidence(
                        evidence,
                        result,
                    ),
                currentExecuted: evidence.routeSteps.some((step) =>
                    step.executedRuleIds.includes(OPERATION_ID)),
            };
        }),
        Array(3).fill({
            sourceStatus: "blocked",
            reason: "owner-issued-meaningful-candidate-result-required",
            resultValid: true,
            evidenceValid: true,
            currentExecuted: false,
        }),
    );

    s.eq(
        "stored family answers and surface carriers are rejected at request inspection",
        [
            "familyLabel",
            "catalog",
            "expectedMembership",
            "notation",
            "gloss",
            "lessonId",
            "formula",
            "surface",
        ].map((key) => {
            const source = ctx
                .buildClassicalMeaningfulMorphemeUnitClassificationSource({
                    candidateResult: conceptResult(
                        ctx,
                        "morpheme",
                        "morpheme",
                    ),
                    [key]: "stored-answer",
                });
            const result = ctx
                .evaluateClassicalMeaningfulMorphemeUnitClassification(
                    source,
                );
            return [
                key,
                source.authorizationStatus,
                result.blockReason,
            ];
        }),
        [
            "familyLabel",
            "catalog",
            "expectedMembership",
            "notation",
            "gloss",
            "lessonId",
            "formula",
            "surface",
        ].map((key) => [
            key,
            "blocked",
            `meaningful-morpheme-unit-source-unrecognized-constituent:${key}`,
        ]),
    );

    return s;
}

module.exports = { run };
