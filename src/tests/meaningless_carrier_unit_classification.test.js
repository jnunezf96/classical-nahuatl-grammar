"use strict";

const { createSuite } = require("./runner");

const OPERATION_ID = "classical.carrier.meaningless-unit.classify";
const CANDIDATES = Object.freeze({
    phoneme: Object.freeze({
        domain: "linguistic-element",
        selection: "phoneme",
        owner: "carrier-phoneme-classification",
        prerequisiteOperation: "classical.carrier.phoneme.classify",
        subsystem: "phonological",
        analysisLevel: "type",
    }),
    phone: Object.freeze({
        domain: "phone-repertory-analysis",
        selection: "phone-definition",
        owner: "phone-repertory-analysis",
        prerequisiteOperation: "classical.carrier.phone.repertory.analyze",
        subsystem: "phonological",
        analysisLevel: "token",
    }),
    grapheme: Object.freeze({
        domain: "linguistic-element",
        selection: "grapheme",
        owner: "carrier-grapheme-classification",
        prerequisiteOperation: "classical.carrier.grapheme.classify",
        subsystem: "graphological",
        analysisLevel: "type",
    }),
    graph: Object.freeze({
        domain: "graph-variant-analysis",
        selection: "graph-definition",
        owner: "graph-variant-analysis",
        prerequisiteOperation: "classical.carrier.graph.variant.analyze",
        subsystem: "graphological",
        analysisLevel: "token",
    }),
});

function conceptResult(ctx, domain, selection) {
    const source = ctx.buildClassicalGrammarConceptSource({
        domain,
        selection,
    });
    return ctx.evaluateClassicalGrammarConcept(source);
}

function classify(ctx, candidateResult) {
    const source = ctx
        .buildClassicalMeaninglessCarrierUnitClassificationSource({
            candidateResult,
        });
    const result = ctx
        .evaluateClassicalMeaninglessCarrierUnitClassification(source);
    const evidence = ctx
        .getClassicalMeaninglessCarrierUnitClassificationExecutionEvidence(
            result
        );
    return { source, result, evidence };
}

function run(ctx = {}) {
    const s = createSuite("meaningless_carrier_unit_classification");

    const apiNames = [
        "buildClassicalMeaninglessCarrierUnitClassificationSource",
        "isClassicalMeaninglessCarrierUnitClassificationSource",
        "evaluateClassicalMeaninglessCarrierUnitClassification",
        "isClassicalMeaninglessCarrierUnitClassificationResult",
        "isClassicalMeaninglessCarrierUnitClassificationOperationContract",
        "getClassicalMeaninglessCarrierUnitClassificationExecutionEvidence",
        "isClassicalMeaninglessCarrierUnitClassificationExecutionEvidence",
    ];
    s.eq(
        "the family classifier has an independent Source, Result, owner contract, and evidence API",
        apiNames.map((name) => [name, typeof ctx[name]]),
        apiNames.map((name) => [name, "function"])
    );

    s.eq(
        "phoneme, phone, grapheme, and graph Results retain separate prerequisite owners while receiving carrier-family membership",
        Object.entries(CANDIDATES).map(([candidateKind, candidate]) => {
            const prerequisiteResult = conceptResult(
                ctx,
                candidate.domain,
                candidate.selection
            );
            const { source, result, evidence } = classify(
                ctx,
                prerequisiteResult
            );
            const prerequisiteOperationIds = [
                ...new Set(evidence.routeSteps
                    .filter((step) => step.invocationRole === "prerequisite")
                    .flatMap((step) => step.executedRuleIds)),
            ];
            const currentSteps = evidence.routeSteps.filter(
                (step) => step.invocationRole !== "prerequisite"
                    && step.executedRuleIds.includes(OPERATION_ID)
            );
            return {
                candidateKind,
                prerequisiteValid:
                    ctx.isClassicalGrammarConceptResult(prerequisiteResult),
                sourceValid: ctx
                    .isClassicalMeaninglessCarrierUnitClassificationSource(
                        source
                    ),
                resultValid: ctx
                    .isClassicalMeaninglessCarrierUnitClassificationResult(
                        result
                    ),
                evidenceValid: ctx
                    .isClassicalMeaninglessCarrierUnitClassificationExecutionEvidence(
                        evidence,
                        result
                    ),
                status: result.authorizationStatus,
                owner: result.semanticOwnerId,
                operation: result.operationId,
                candidateOwner: result.candidateSemanticOwnerId,
                candidateOperation: result.candidateOperationId,
                identity: result.familyIdentity,
                subsystem: result.subsystem,
                analysisLevel: result.analysisLevel,
                prerequisiteOperationIds,
                currentStepIds: currentSteps.map((step) => step.stepId),
            };
        }),
        Object.entries(CANDIDATES).map(([candidateKind, candidate]) => ({
            candidateKind,
            prerequisiteValid: true,
            sourceValid: true,
            resultValid: true,
            evidenceValid: true,
            status: "authorized",
            owner: "meaningless-carrier-unit-classification",
            operation: OPERATION_ID,
            candidateOwner: candidate.owner,
            candidateOperation: candidate.prerequisiteOperation,
            identity: `meaningless-carrier-unit:${candidateKind}`,
            subsystem: candidate.subsystem,
            analysisLevel: candidate.analysisLevel,
            prerequisiteOperationIds: [candidate.prerequisiteOperation],
            currentStepIds: [
                "meaningless-carrier-family-membership-classified",
            ],
        }))
    );

    s.eq(
        "the fixed family definition and exclusions are derived without authorizing rank, construction, or surface behavior",
        (() => {
            const { result } = classify(
                ctx,
                conceptResult(ctx, "linguistic-element", "phoneme")
            );
            return {
                family: result.hierarchyFamily,
                constituentKinds: result.familyConstituentKinds,
                facts: result.facts,
                exclusions: [result.sememeExcluded, result.sigemeExcluded],
                nonclaims: [
                    result.rankTaxonomyAuthorized,
                    result.rankFormationAuthorized,
                    result.higherRankUnitInventoryAuthorized,
                    result.structuralPotentialAuthorized,
                    result.syllableStructureAuthorized,
                    result.vocableStructureAuthorized,
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
            family: "meaningless",
            constituentKinds: ["phoneme", "phone", "grapheme", "graph"],
            facts: [
                "meaningless-structural-units-have-phoneme-phone-grapheme-or-graph-constituents",
                "phoneme-is-a-meaningless-carrier-unit",
                "sememes-are-absent-from-meaningless-carrier-unit-family",
                "sigemes-cannot-participate-in-meaningless-carrier-unit-family",
            ],
            exclusions: [true, true],
            nonclaims: Array(12).fill(false),
        }
    );

    s.eq(
        "sigeme and sememe Results are retained as prerequisite proof but rejected by the distinct meaning constraint without current-owner execution",
        [
            [
                "sigeme",
                "carrier-sigeme-classification",
                "sigeme-cannot-participate-in-meaningless-carrier-unit-family",
            ],
            [
                "sememe",
                "content-sememe-classification",
                "sememe-absent-from-meaningless-carrier-unit-family",
            ],
        ].map(([candidateKind, owner, reason]) => {
            const { source, result, evidence } = classify(
                ctx,
                conceptResult(ctx, "linguistic-element", candidateKind)
            );
            const constraintStep = evidence.routeSteps.find(
                (step) => step.stepId
                    === "meaningful-carrier-family-exclusion-enforced"
            );
            return {
                candidateKind,
                owner,
                sourceStatus: source.authorizationStatus,
                sourceReason: source.blockReason,
                resultValid: ctx
                    .isClassicalMeaninglessCarrierUnitClassificationResult(
                        result
                    ),
                evidenceValid: ctx
                    .isClassicalMeaninglessCarrierUnitClassificationExecutionEvidence(
                        evidence,
                        result
                    ),
                resultReason: result.blockReason,
                constraintStatus: constraintStep.status,
                constraintReason: constraintStep.reason,
                prerequisiteExecuted: evidence.routeSteps.some(
                    (step) => step.invocationRole === "prerequisite"
                        && step.executedRuleIds.length > 0
                ),
                currentExecuted: evidence.routeSteps.some(
                    (step) => step.invocationRole !== "prerequisite"
                        && step.executedRuleIds.includes(OPERATION_ID)
                ),
            };
        }),
        [
            [
                "sigeme",
                "carrier-sigeme-classification",
                "sigeme-cannot-participate-in-meaningless-carrier-unit-family",
            ],
            [
                "sememe",
                "content-sememe-classification",
                "sememe-absent-from-meaningless-carrier-unit-family",
            ],
        ].map(([candidateKind, owner, reason]) => ({
            candidateKind,
            owner,
            sourceStatus: "blocked",
            sourceReason: reason,
            resultValid: true,
            evidenceValid: true,
            resultReason: reason,
            constraintStatus: "rejected",
            constraintReason: reason,
            prerequisiteExecuted: true,
            currentExecuted: false,
        }))
    );

    s.eq(
        "raw labels, copied prerequisite Results, and unrelated owner Results cannot authorize membership",
        (() => {
            const phoneme = conceptResult(
                ctx,
                "linguistic-element",
                "phoneme"
            );
            const carrierRank = ctx.evaluateClassicalCarrierRankTaxonomy(
                ctx.buildClassicalCarrierRankTaxonomySource({
                    subsystem: "phonological",
                    rankTier: "lowest",
                })
            );
            return [
                ["raw-label", "phoneme"],
                ["copied-result", Object.freeze({ ...phoneme })],
                ["rank-result", carrierRank],
            ].map(([kind, candidateResult]) => {
                const { source, result, evidence } = classify(
                    ctx,
                    candidateResult
                );
                return {
                    kind,
                    sourceStatus: source.authorizationStatus,
                    sourceReason: source.blockReason,
                    resultValid: ctx
                        .isClassicalMeaninglessCarrierUnitClassificationResult(
                            result
                        ),
                    resultReason: result.blockReason,
                    currentExecuted: evidence.routeSteps.some(
                        (step) => step.invocationRole !== "prerequisite"
                            && step.executedRuleIds.includes(OPERATION_ID)
                    ),
                };
            });
        })(),
        ["raw-label", "copied-result", "rank-result"].map((kind) => ({
            kind,
            sourceStatus: "blocked",
            sourceReason: "owner-issued-carrier-candidate-result-required",
            resultValid: true,
            resultReason: "owner-issued-carrier-candidate-result-required",
            currentExecuted: false,
        }))
    );

    s.eq(
        "family labels, catalogs, expected membership, owner labels, lessons, answers, surfaces, and formulas cannot enter the Source",
        [
            ["familyLabel", "meaningless"],
            ["catalog", ["phoneme", "phone", "grapheme", "graph"]],
            ["expectedMembership", true],
            ["prerequisiteOwnerId", "carrier-phoneme-classification"],
            ["lessonId", 1],
            ["canvasAnswer", "phoneme"],
            ["surface", "phoneme"],
            ["formula", "phoneme/phone"],
        ].map(([field, value]) => {
            const candidateResult = conceptResult(
                ctx,
                "linguistic-element",
                "phoneme"
            );
            const source = ctx
                .buildClassicalMeaninglessCarrierUnitClassificationSource({
                    candidateResult,
                    [field]: value,
                });
            const result = ctx
                .evaluateClassicalMeaninglessCarrierUnitClassification(
                    source
                );
            return [
                field,
                source.authorizationStatus,
                source.blockReason,
                result.authorizationStatus,
                result.blockReason,
            ];
        }),
        [
            "familyLabel",
            "catalog",
            "expectedMembership",
            "prerequisiteOwnerId",
            "lessonId",
            "canvasAnswer",
            "surface",
            "formula",
        ].map((field) => [
            field,
            "blocked",
            `meaningless-carrier-unit-source-unrecognized-constituent:${field}`,
            "blocked",
            `meaningless-carrier-unit-source-unrecognized-constituent:${field}`,
        ])
    );

    s.eq(
        "copied Sources and Results lose identity and the owner contract cannot satisfy adjacent owners",
        (() => {
            const original = classify(
                ctx,
                conceptResult(ctx, "linguistic-element", "phoneme")
            );
            const copiedSource = Object.freeze({ ...original.source });
            const copiedSourceResult = ctx
                .evaluateClassicalMeaninglessCarrierUnitClassification(
                    copiedSource
                );
            const copiedResult = Object.freeze({ ...original.result });
            return {
                copiedSourceValid: ctx
                    .isClassicalMeaninglessCarrierUnitClassificationSource(
                        copiedSource
                    ),
                copiedSourceResultValid: ctx
                    .isClassicalMeaninglessCarrierUnitClassificationResult(
                        copiedSourceResult
                    ),
                copiedSourceReason: copiedSourceResult.blockReason,
                copiedResultValid: ctx
                    .isClassicalMeaninglessCarrierUnitClassificationResult(
                        copiedResult
                    ),
                ownContract: ctx
                    .isClassicalMeaninglessCarrierUnitClassificationOperationContract(
                        original.result.operationContract
                    ),
                genericContract: ctx
                    .isClassicalGrammarConceptOperationContract(
                        original.result.operationContract
                    ),
                rankContract: ctx
                    .isClassicalCarrierRankTaxonomyOperationContract(
                        original.result.operationContract
                    ),
            };
        })(),
        {
            copiedSourceValid: false,
            copiedSourceResultValid: true,
            copiedSourceReason:
                "owner-issued-meaningless-carrier-unit-source-required",
            copiedResultValid: false,
            ownContract: true,
            genericContract: false,
            rankContract: false,
        }
    );

    return s;
}

module.exports = { run };
