"use strict";

const { createSuite } = require("./runner");

function elementResult(ctx) {
    const source = ctx.buildClassicalGrammarConceptSource({
        domain: "linguistic-element",
        selection: "element",
    });
    return ctx.evaluateClassicalGrammarConcept(source);
}

function completeRequest(ctx, overrides = {}) {
    return {
        medium: "speech",
        sequenceOrder: "temporal",
        structurePattern: "patterned-whole",
        constituents: [elementResult(ctx), elementResult(ctx)],
        ...overrides,
    };
}

function run(ctx = {}) {
    const s = createSuite("linguistic_unit_composition");

    s.eq(
        "the independent composition owner exposes its dedicated Source, Result, contract, and evidence API",
        [
            "buildClassicalLinguisticUnitCompositionSource",
            "isClassicalLinguisticUnitCompositionSource",
            "evaluateClassicalLinguisticUnitComposition",
            "isClassicalLinguisticUnitCompositionResult",
            "isClassicalLinguisticUnitCompositionOperationContract",
            "getClassicalLinguisticUnitCompositionExecutionEvidence",
            "isClassicalLinguisticUnitCompositionExecutionEvidence",
        ].map((name) => [name, typeof ctx[name]]),
        [
            "buildClassicalLinguisticUnitCompositionSource",
            "isClassicalLinguisticUnitCompositionSource",
            "evaluateClassicalLinguisticUnitComposition",
            "isClassicalLinguisticUnitCompositionResult",
            "isClassicalLinguisticUnitCompositionOperationContract",
            "getClassicalLinguisticUnitCompositionExecutionEvidence",
            "isClassicalLinguisticUnitCompositionExecutionEvidence",
        ].map((name) => [name, "function"])
    );

    s.eq(
        "speech-temporal and writing-spatial binary Sources compose two admitted elements into one typed unit",
        [
            ["speech", "temporal"],
            ["writing", "spatial"],
        ].map(([medium, sequenceOrder]) => {
            const source = ctx.buildClassicalLinguisticUnitCompositionSource(
                completeRequest(ctx, { medium, sequenceOrder })
            );
            const result = ctx.evaluateClassicalLinguisticUnitComposition(source);
            const evidence = ctx
                .getClassicalLinguisticUnitCompositionExecutionEvidence(result);
            return {
                medium,
                sequenceOrder,
                sourceValid:
                    ctx.isClassicalLinguisticUnitCompositionSource(source),
                resultValid:
                    ctx.isClassicalLinguisticUnitCompositionResult(result),
                status: result.authorizationStatus,
                reason: result.blockReason,
                owner: result.semanticOwnerId,
                operation: result.operationId,
                contractValid:
                    ctx.isClassicalLinguisticUnitCompositionOperationContract(
                        result.operationContract
                    ),
                compositionStatus: result.compositionStatus,
                unitKind: result.unitKind,
                inputCount: result.constituentCount,
                outputCount: result.resultUnitCount,
                surfaceFlags: [
                    result.generationAllowed,
                    result.soundedSurfaceGenerated,
                    result.writtenSurfaceGenerated,
                    result.formulaGenerated,
                ],
                finalStages: evidence.execution.stages.slice(-4),
                evidenceValid:
                    ctx.isClassicalLinguisticUnitCompositionExecutionEvidence(
                        evidence,
                        result
                    ),
            };
        }),
        [
            ["speech", "temporal"],
            ["writing", "spatial"],
        ].map(([medium, sequenceOrder]) => ({
            medium,
            sequenceOrder,
            sourceValid: true,
            resultValid: true,
            status: "authorized",
            reason: "",
            owner: "linguistic-unit-composition",
            operation: "classical.linguistic.unit.compose",
            contractValid: true,
            compositionStatus: "composed-complex-unit",
            unitKind: "complex-structural-unit",
            inputCount: 2,
            outputCount: 1,
            surfaceFlags: [false, false, false, false],
            finalStages: [
                "linear-sequence-composition-executed",
                "linguistic-sequence-structure-established",
                "binary-unity-principle-executed",
                "constituent-unit-composition-executed",
            ],
            evidenceValid: true,
        }))
    );

    const documentaryStructure = ctx.evaluateClassicalGrammarConcept(
        ctx.buildClassicalGrammarConceptSource({
            domain: "structure",
            selection: "constituent",
        })
    );
    s.eq(
        "each invalid composition boundary fails closed with a distinct live reason",
        [
            {
                overrides: { sequenceOrder: "spatial" },
                reason: "speech-linear-sequence-must-be-temporal",
                stepId: "linear-sequence-medium-validated",
            },
            {
                overrides: { structurePattern: "unstructured-sequence" },
                reason: "linguistically-valid-sequence-must-be-structured",
                stepId: "linguistic-sequence-structure-validated",
            },
            {
                overrides: { constituents: [elementResult(ctx)] },
                reason: "binary-unit-composition-requires-two-constituents",
                stepId: "binary-constituent-count-validated",
            },
            {
                overrides: {
                    constituents: [elementResult(ctx), documentaryStructure],
                },
                reason: "basic-linear-element-constituent-required",
                stepId: "constituent-unit-authority-validated",
            },
            {
                overrides: {
                    constituents: [elementResult(ctx), { formula: "1 + 1 = 1" }],
                },
                reason: "owner-issued-basic-linear-element-unit-required",
                stepId: "constituent-unit-authority-validated",
            },
        ].map(({ overrides, reason, stepId }) => {
            const source = ctx.buildClassicalLinguisticUnitCompositionSource(
                completeRequest(ctx, overrides)
            );
            const result = ctx.evaluateClassicalLinguisticUnitComposition(source);
            const evidence = ctx
                .getClassicalLinguisticUnitCompositionExecutionEvidence(result);
            const rejectedStep = evidence.routeSteps.find(
                (step) => step.stepId === stepId
            );
            const finalStep = evidence.routeSteps.find(
                (step) => step.stepId === "linguistic-unit-composition-rejected"
            );
            return {
                expectedReason: reason,
                sourceValid:
                    ctx.isClassicalLinguisticUnitCompositionSource(source),
                resultValid:
                    ctx.isClassicalLinguisticUnitCompositionResult(result),
                status: result.authorizationStatus,
                reason: result.blockReason,
                unitKind: result.unitKind,
                rejectedStep: [
                    rejectedStep.status,
                    rejectedStep.reason,
                    rejectedStep.executedRuleIds,
                ],
                finalStep: [
                    finalStep.status,
                    finalStep.reason,
                    finalStep.executedRuleIds,
                ],
            };
        }),
        [
            "speech-linear-sequence-must-be-temporal",
            "linguistically-valid-sequence-must-be-structured",
            "binary-unit-composition-requires-two-constituents",
            "basic-linear-element-constituent-required",
            "owner-issued-basic-linear-element-unit-required",
        ].map((reason) => ({
            expectedReason: reason,
            sourceValid: true,
            resultValid: true,
            status: "blocked",
            reason,
            unitKind: "",
            rejectedStep: ["rejected", reason, []],
            finalStep: ["rejected", reason, []],
        }))
    );

    s.eq(
        "formulae, lessons, stored answers, surfaces, and authority labels cannot enter the typed composition Source",
        [
            { formula: "1 + 1 = 1" },
            { lessonId: 1 },
            { canvasAnswer: "complex unit" },
            { surface: "AB" },
            { authorityLabel: "patterned-whole" },
        ].map((extra) => {
            const source = ctx.buildClassicalLinguisticUnitCompositionSource({
                ...completeRequest(ctx),
                ...extra,
            });
            const result = ctx.evaluateClassicalLinguisticUnitComposition(source);
            return {
                sourceStatus: source.authorizationStatus,
                sourceReason: source.blockReason,
                sourceValid:
                    ctx.isClassicalLinguisticUnitCompositionSource(source),
                resultStatus: result.authorizationStatus,
                resultReason: result.blockReason,
            };
        }),
        ["formula", "lessonId", "canvasAnswer", "surface", "authorityLabel"]
            .map((field) => ({
                sourceStatus: "blocked",
                sourceReason:
                    `linguistic-unit-composition-source-unrecognized-constituent:${field}`,
                sourceValid: false,
                resultStatus: "blocked",
                resultReason:
                    "owner-issued-linguistic-unit-composition-source-required",
            }))
    );

    s.eq(
        "the former structure catalog is explicitly documentary and cannot cross-authorize composition",
        ["simple-unit", "complex-unit", "constituent", "recursion"]
            .map((selection) => {
                const concept = ctx.evaluateClassicalGrammarConcept(
                    ctx.buildClassicalGrammarConceptSource({
                        domain: "structure",
                        selection,
                    })
                );
                const composition = ctx.evaluateClassicalLinguisticUnitComposition(
                    concept
                );
                return {
                    selection,
                    catalogOwner: concept.semanticOwnerId,
                    catalogOperation: concept.operationId,
                    restrictions: concept.restrictions,
                    compositionStatus: composition.authorizationStatus,
                    compositionReason: composition.blockReason,
                };
            }),
        ["simple-unit", "complex-unit", "constituent", "recursion"]
            .map((selection) => ({
                selection,
                catalogOwner:
                    "linguistic-structure-documentary-classification",
                catalogOperation: "concept:classification",
                restrictions: selection === "constituent"
                    ? [
                        "classification-does-not-admit-constituent-unit",
                        "structure-catalog-is-nonauthorizing",
                    ]
                    : selection === "recursion"
                        ? [
                            "authority-carrier-is-not-a-constituent",
                            "classification-does-not-execute-recursion",
                            "linguistic-structure-recursion-is-separately-owned",
                            "structure-catalog-is-nonauthorizing",
                        ]
                        : [
                            "classification-does-not-compose-unit",
                            "structure-catalog-is-nonauthorizing",
                        ],
                compositionStatus: "blocked",
                compositionReason:
                    "owner-issued-linguistic-unit-composition-source-required",
            }))
    );

    const forgedSource = Object.freeze({
        kind: "classical-linguistic-unit-composition-source",
        version: 1,
        authorizationStatus: "authorized",
        blockReason: "",
        ...completeRequest(ctx),
    });
    s.eq(
        "a structurally forged composition Source cannot execute the owner",
        {
            valid: ctx.isClassicalLinguisticUnitCompositionSource(forgedSource),
            result: (() => {
                const value = ctx.evaluateClassicalLinguisticUnitComposition(
                    forgedSource
                );
                return [value.authorizationStatus, value.blockReason];
            })(),
        },
        {
            valid: false,
            result: [
                "blocked",
                "owner-issued-linguistic-unit-composition-source-required",
            ],
        }
    );

    return s;
}

module.exports = { run };
