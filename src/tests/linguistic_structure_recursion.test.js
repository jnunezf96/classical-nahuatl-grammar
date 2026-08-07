"use strict";

const { createSuite } = require("./runner");

function elementResult(ctx) {
    return ctx.evaluateClassicalGrammarConcept(
        ctx.buildClassicalGrammarConceptSource({
            domain: "linguistic-element",
            selection: "element",
        })
    );
}

function compositionResult(ctx, medium = "speech") {
    return ctx.evaluateClassicalLinguisticUnitComposition(
        ctx.buildClassicalLinguisticUnitCompositionSource({
            medium,
            sequenceOrder: medium === "speech" ? "temporal" : "spatial",
            structurePattern: "patterned-whole",
            constituents: [elementResult(ctx), elementResult(ctx)],
        })
    );
}

function recursionResult(ctx, priorStructureResult, nextConstituentResult) {
    const source = ctx.buildClassicalLinguisticStructureRecursionSource({
        priorStructureResult,
        nextConstituentResult: nextConstituentResult || elementResult(ctx),
    });
    return {
        source,
        result: ctx.evaluateClassicalLinguisticStructureRecursion(source),
    };
}

function run(ctx = {}) {
    const s = createSuite("linguistic_structure_recursion");

    const apiNames = [
        "buildClassicalLinguisticStructureRecursionSource",
        "isClassicalLinguisticStructureRecursionSource",
        "evaluateClassicalLinguisticStructureRecursion",
        "isClassicalLinguisticStructureRecursionResult",
        "isClassicalLinguisticStructureRecursionOperationContract",
        "getClassicalLinguisticStructureRecursionExecutionEvidence",
        "isClassicalLinguisticStructureRecursionExecutionEvidence",
    ];
    s.eq(
        "recursion has an independent Source, Result, operation contract, and execution-evidence API",
        apiNames.map((name) => [name, typeof ctx[name]]),
        apiNames.map((name) => [name, "function"])
    );

    s.eq(
        "the owner reapplies composition in both media and retains every prior operation before its own operation",
        ["speech", "writing"].map((medium) => {
            const prior = compositionResult(ctx, medium);
            const { source, result } = recursionResult(ctx, prior);
            const evidence = ctx
                .getClassicalLinguisticStructureRecursionExecutionEvidence(
                    result
                );
            const executed = evidence.routeSteps
                .filter((step) => step.executedRuleIds.length)
                .map((step) => [step.stepId, step.executedRuleIds[0]]);
            return {
                medium,
                sourceValid:
                    ctx.isClassicalLinguisticStructureRecursionSource(source),
                resultValid:
                    ctx.isClassicalLinguisticStructureRecursionResult(result),
                evidenceValid:
                    ctx.isClassicalLinguisticStructureRecursionExecutionEvidence(
                        evidence,
                        result
                    ),
                contractValid:
                    ctx.isClassicalLinguisticStructureRecursionOperationContract(
                        result.operationContract
                    ),
                status: result.authorizationStatus,
                owner: result.semanticOwnerId,
                operation: result.operationId,
                priorKind: result.priorStructureKind,
                order: result.sequenceOrder,
                leafCount: result.leafConstituentCount,
                recursionApplications: result.recursionApplicationCount,
                resultUnitCount: result.resultUnitCount,
                lineage: result.executedOperationLineage,
                executed,
                authorityFlags: [
                    result.hierarchyAuthorized,
                    result.rankPotentialAuthorized,
                    result.recursionLabelAuthority,
                    result.depthCounterAuthority,
                    result.storedTreeAuthority,
                ],
                surfaceFlags: [
                    result.generationAllowed,
                    result.soundedSurfaceGenerated,
                    result.writtenSurfaceGenerated,
                    result.formulaGenerated,
                ],
            };
        }),
        ["speech", "writing"].map((medium) => ({
            medium,
            sourceValid: true,
            resultValid: true,
            evidenceValid: true,
            contractValid: true,
            status: "authorized",
            owner: "linguistic-structure-recursion",
            operation: "classical.linguistic.structure.recurse",
            priorKind: "initial-composition-result",
            order: medium === "speech" ? "temporal" : "spatial",
            leafCount: 3,
            recursionApplications: 1,
            resultUnitCount: 1,
            lineage: [
                "classical.linguistic.unit.compose",
                "classical.linguistic.structure.recurse",
            ],
            executed: [
                [
                    "prior-structure.linear-sequence-composition-executed",
                    "classical.linguistic.unit.compose",
                ],
                [
                    "prior-structure.linguistic-sequence-structure-established",
                    "classical.linguistic.unit.compose",
                ],
                [
                    "prior-structure.binary-unity-principle-executed",
                    "classical.linguistic.unit.compose",
                ],
                [
                    "prior-structure.constituent-unit-composition-executed",
                    "classical.linguistic.unit.compose",
                ],
                [
                    "linguistic-structure-recursion-executed",
                    "classical.linguistic.structure.recurse",
                ],
            ],
            authorityFlags: [false, false, false, false, false],
            surfaceFlags: [false, false, false, false],
        }))
    );

    s.eq(
        "an issued recursion Result can itself be the next prior unit and the live route retains both earlier applications",
        (() => {
            const first = recursionResult(ctx, compositionResult(ctx)).result;
            const second = recursionResult(ctx, first).result;
            const evidence = ctx
                .getClassicalLinguisticStructureRecursionExecutionEvidence(
                    second
                );
            const executedOperationIds = evidence.routeSteps.flatMap(
                (step) => step.executedRuleIds
            );
            const outerIndex = evidence.routeSteps.findIndex(
                (step) => step.stepId
                    === "linguistic-structure-recursion-executed"
            );
            const priorRecursiveIndex = evidence.routeSteps.findIndex(
                (step) => step.stepId
                    === "prior-structure.linguistic-structure-recursion-executed"
            );
            return {
                valid:
                    ctx.isClassicalLinguisticStructureRecursionResult(second),
                evidenceValid:
                    ctx.isClassicalLinguisticStructureRecursionExecutionEvidence(
                        evidence,
                        second
                    ),
                priorKind: second.priorStructureKind,
                leafCount: second.leafConstituentCount,
                recursionApplications: second.recursionApplicationCount,
                lineage: second.executedOperationLineage,
                compositionExecutions: executedOperationIds.filter(
                    (id) => id === "classical.linguistic.unit.compose"
                ).length,
                recursionExecutions: executedOperationIds.filter(
                    (id) => id === "classical.linguistic.structure.recurse"
                ).length,
                priorBeforeOuter: priorRecursiveIndex >= 0
                    && priorRecursiveIndex < outerIndex,
            };
        })(),
        {
            valid: true,
            evidenceValid: true,
            priorKind: "recursive-composition-result",
            leafCount: 4,
            recursionApplications: 2,
            lineage: [
                "classical.linguistic.unit.compose",
                "classical.linguistic.structure.recurse",
                "classical.linguistic.structure.recurse",
            ],
            compositionExecutions: 4,
            recursionExecutions: 2,
            priorBeforeOuter: true,
        }
    );

    s.eq(
        "copied prior and next Results fail at their exact identity boundaries",
        (() => {
            const prior = compositionResult(ctx);
            const next = elementResult(ctx);
            return [
                {
                    priorStructureResult: { ...prior },
                    nextConstituentResult: next,
                },
                {
                    priorStructureResult: prior,
                    nextConstituentResult: { ...next },
                },
            ].map((request) => {
                const source = ctx
                    .buildClassicalLinguisticStructureRecursionSource(request);
                const result = ctx
                    .evaluateClassicalLinguisticStructureRecursion(source);
                const evidence = ctx
                    .getClassicalLinguisticStructureRecursionExecutionEvidence(
                        result
                    );
                return {
                    sourceValid:
                        ctx.isClassicalLinguisticStructureRecursionSource(source),
                    sourceReason: source.blockReason,
                    resultValid:
                        ctx.isClassicalLinguisticStructureRecursionResult(result),
                    resultReason: result.blockReason,
                    evidenceValid:
                        ctx.isClassicalLinguisticStructureRecursionExecutionEvidence(
                            evidence,
                            result
                        ),
                    executed: evidence.routeSteps.some(
                        (step) => step.executedRuleIds.includes(
                            "classical.linguistic.structure.recurse"
                        )
                    ),
                };
            });
        })(),
        [
            "owner-issued-prior-structural-unit-result-required",
            "owner-issued-next-basic-linear-element-unit-required",
        ].map((reason) => ({
            sourceValid: false,
            sourceReason: reason,
            resultValid: true,
            resultReason: reason,
            evidenceValid: true,
            executed: false,
        }))
    );

    s.eq(
        "recursion labels, depth counters, stored trees, formulas, surfaces, lessons, and answers cannot enter the Source",
        [
            ["recursionLabel", "recursive"],
            ["depth", 2],
            ["storedTree", ["A", "B", "C"]],
            ["formula", "(1 + 1) + 1 = 1"],
            ["surface", "ABC"],
            ["lessonId", 1],
            ["canvasAnswer", "recursive"],
        ].map(([field, value]) => {
            const source = ctx
                .buildClassicalLinguisticStructureRecursionSource({
                    priorStructureResult: compositionResult(ctx),
                    nextConstituentResult: elementResult(ctx),
                    [field]: value,
                });
            const result = ctx
                .evaluateClassicalLinguisticStructureRecursion(source);
            return [
                field,
                source.authorizationStatus,
                source.blockReason,
                result.authorizationStatus,
                result.blockReason,
            ];
        }),
        [
            "recursionLabel",
            "depth",
            "storedTree",
            "formula",
            "surface",
            "lessonId",
            "canvasAnswer",
        ].map((field) => [
            field,
            "blocked",
            `linguistic-structure-recursion-source-unrecognized-constituent:${field}`,
            "blocked",
            `linguistic-structure-recursion-source-unrecognized-constituent:${field}`,
        ])
    );

    s.eq(
        "the documentary recursion catalog and structural-hierarchy claims remain non-authorizing and separately owned",
        (() => {
            const documentary = ctx.evaluateClassicalGrammarConcept(
                ctx.buildClassicalGrammarConceptSource({
                    domain: "structure",
                    selection: "recursion",
                })
            );
            const source = ctx
                .buildClassicalLinguisticStructureRecursionSource({
                    priorStructureResult: documentary,
                    nextConstituentResult: elementResult(ctx),
                });
            const result = ctx
                .evaluateClassicalLinguisticStructureRecursion(source);
            return {
                catalogOwner: documentary.semanticOwnerId,
                catalogRestrictions: documentary.restrictions,
                sourceValid:
                    ctx.isClassicalLinguisticStructureRecursionSource(source),
                reason: result.blockReason,
                hierarchyAuthorized: result.hierarchyAuthorized,
                rankPotentialAuthorized: result.rankPotentialAuthorized,
            };
        })(),
        {
            catalogOwner: "linguistic-structure-documentary-classification",
            catalogRestrictions: [
                "authority-carrier-is-not-a-constituent",
                "classification-does-not-execute-recursion",
                "linguistic-structure-recursion-is-separately-owned",
                "structure-catalog-is-nonauthorizing",
            ],
            sourceValid: false,
            reason: "owner-issued-prior-structural-unit-result-required",
            hierarchyAuthorized: false,
            rankPotentialAuthorized: false,
        }
    );

    const forgedSource = Object.freeze({
        kind: "classical-linguistic-structure-recursion-source",
        version: 1,
        authorizationStatus: "authorized",
        blockReason: "",
        priorStructureResult: compositionResult(ctx),
        nextConstituentResult: elementResult(ctx),
    });
    s.eq(
        "a structurally forged recursion Source cannot execute the owner",
        (() => {
            const result = ctx
                .evaluateClassicalLinguisticStructureRecursion(forgedSource);
            return {
                sourceValid:
                    ctx.isClassicalLinguisticStructureRecursionSource(
                        forgedSource
                    ),
                status: result.authorizationStatus,
                reason: result.blockReason,
            };
        })(),
        {
            sourceValid: false,
            status: "blocked",
            reason: "owner-issued-linguistic-structure-recursion-source-required",
        }
    );

    return s;
}

module.exports = { run };
