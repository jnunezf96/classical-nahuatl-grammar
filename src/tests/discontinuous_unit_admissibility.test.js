"use strict";

const { createSuite } = require("./runner");

function buildCanonicalNncResult(ctx, overrides = {}) {
    const source = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem: "mich",
    });
    const operation = ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
        source,
        {
            state: "absolutive",
            subject: "1sg",
            sentenceType: "statement",
            polarity: "positive",
            ...overrides,
        }
    );
    return ctx.evaluateClassicalNahuatlOrdinaryNnc(source, operation);
}

function run(ctx = {}) {
    const s = createSuite("discontinuous_unit_admissibility");

    const apiNames = [
        "buildClassicalDiscontinuousUnitAdmissibilitySource",
        "isClassicalDiscontinuousUnitAdmissibilitySource",
        "evaluateClassicalDiscontinuousUnitAdmissibility",
        "isClassicalDiscontinuousUnitAdmissibilityResult",
        "isClassicalDiscontinuousUnitAdmissibilityOperationContract",
        "getClassicalDiscontinuousUnitAdmissibilityExecutionEvidence",
        "isClassicalDiscontinuousUnitAdmissibilityExecutionEvidence",
    ];
    s.eq(
        "the singleton discontinuity owner exposes an independent Source, Result, contract, and execution-evidence API",
        apiNames.map((name) => [name, typeof ctx[name]]),
        apiNames.map((name) => [name, "function"])
    );

    const canonicalResult = buildCanonicalNncResult(ctx);
    const source = ctx.buildClassicalDiscontinuousUnitAdmissibilitySource({
        canonicalNuclearClauseResult: canonicalResult,
    });
    const result = ctx.evaluateClassicalDiscontinuousUnitAdmissibility(source);
    const evidence = ctx
        .getClassicalDiscontinuousUnitAdmissibilityExecutionEvidence(result);
    s.eq(
        "an owner-issued NNC Result proves one exact cohesive subject unit across an intervening predicate",
        {
            canonicalNnc:
                ctx.isClassicalNahuatlOrdinaryNncResult(canonicalResult),
            sourceValid:
                ctx.isClassicalDiscontinuousUnitAdmissibilitySource(source),
            resultValid:
                ctx.isClassicalDiscontinuousUnitAdmissibilityResult(result),
            evidenceValid:
                ctx.isClassicalDiscontinuousUnitAdmissibilityExecutionEvidence(
                    evidence,
                    result
                ),
            contractValid:
                ctx.isClassicalDiscontinuousUnitAdmissibilityOperationContract(
                    result.operationContract
                ),
            status: result.authorizationStatus,
            reason: result.blockReason,
            owner: result.semanticOwnerId,
            operation: result.operationId,
            unitKind: result.unitKind,
            roles: result.constituentRoles,
            topology: result.topology,
            interveningRole: result.interveningConstituentRole,
            scope: result.validationScope,
            universal: result.universalDiscontinuityAuthorized,
            arbitraryGap: result.arbitraryGapAuthorized,
            outputFlags: [
                result.arrangementGenerated,
                result.generationAllowed,
                result.soundedSurfaceGenerated,
                result.writtenSurfaceGenerated,
                result.formulaGenerated,
            ],
            stages: evidence.execution.stages,
        },
        {
            canonicalNnc: true,
            sourceValid: true,
            resultValid: true,
            evidenceValid: true,
            contractValid: true,
            status: "authorized",
            reason: "",
            owner: "discontinuous-unit-admissibility",
            operation: "classical.linguistic.unit.discontinuity.validate",
            unitKind: "nahuatl-subject-person-number-unit",
            roles: ["subject-person", "subject-number"],
            topology: "non-juxtaposed",
            interveningRole: "predicate",
            scope: "specific-typed-unit-kind",
            universal: false,
            arbitraryGap: false,
            outputFlags: [false, false, false, false, false],
            stages: [
                "discontinuous-unit-admissibility-source-admitted",
                "discontinuous-unit-admissibility-semantic-owner-selected",
                "canonical-nuclear-clause-result-validated",
                "subject-person-number-constituents-validated",
                "nonjuxtaposed-subject-topology-validated",
                "subject-functional-cohesion-validated",
                "discontinuous-unit-admissibility-validated",
            ],
        }
    );

    const diagrammaticProjection =
        ctx.buildClassicalNahuatlNncDiagrammaticFrame(
            canonicalResult.typedSlotFrame
        );
    const hostileCarriers = [
        { id: "copied-result", value: { ...canonicalResult } },
        {
            id: "formula",
            value: { formula: "#person + ... + number#" },
        },
        { id: "diagrammatic-projection", value: diagrammaticProjection },
        {
            id: "labels",
            value: { discontinuous: true, cohesive: true },
        },
        {
            id: "stored-example",
            value: { storedAnswer: "magna cum laude" },
        },
    ];
    s.eq(
        "copied Results, formulae, projections, labels, and examples cannot authorize discontinuity",
        hostileCarriers.map(({ id, value }) => {
            const hostileSource =
                ctx.buildClassicalDiscontinuousUnitAdmissibilitySource({
                    canonicalNuclearClauseResult: value,
                });
            const hostileResult =
                ctx.evaluateClassicalDiscontinuousUnitAdmissibility(
                    hostileSource
                );
            const hostileEvidence =
                ctx.getClassicalDiscontinuousUnitAdmissibilityExecutionEvidence(
                    hostileResult
                );
            return {
                id,
                source: [
                    hostileSource.authorizationStatus,
                    hostileSource.blockReason,
                    ctx.isClassicalDiscontinuousUnitAdmissibilitySource(
                        hostileSource
                    ),
                ],
                result: [
                    hostileResult.authorizationStatus,
                    hostileResult.blockReason,
                    ctx.isClassicalDiscontinuousUnitAdmissibilityResult(
                        hostileResult
                    ),
                ],
                route: [
                    hostileEvidence.execution.status,
                    hostileEvidence.execution.selectedRuleId,
                    hostileEvidence.routeSteps[0].status,
                    hostileEvidence.routeSteps.at(-1).executedRuleIds,
                ],
            };
        }),
        hostileCarriers.map(({ id }) => ({
            id,
            source: [
                "blocked",
                "owner-issued-canonical-nuclear-clause-result-required",
                false,
            ],
            result: [
                "blocked",
                "owner-issued-discontinuous-unit-admissibility-source-required",
                true,
            ],
            route: ["rejected", null, "rejected", []],
        }))
    );

    const copiedSource = Object.freeze({ ...source });
    const copiedSourceResult =
        ctx.evaluateClassicalDiscontinuousUnitAdmissibility(copiedSource);
    s.eq(
        "Source identity is owner-bound and a copied Source fails before operation execution",
        {
            sourceValid:
                ctx.isClassicalDiscontinuousUnitAdmissibilitySource(
                    copiedSource
                ),
            result: [
                copiedSourceResult.authorizationStatus,
                copiedSourceResult.blockReason,
                ctx.isClassicalDiscontinuousUnitAdmissibilityResult(
                    copiedSourceResult
                ),
            ],
        },
        {
            sourceValid: false,
            result: [
                "blocked",
                "owner-issued-discontinuous-unit-admissibility-source-required",
                true,
            ],
        }
    );

    let getterCalls = 0;
    const accessorRequest = {};
    Object.defineProperty(accessorRequest, "canonicalNuclearClauseResult", {
        enumerable: true,
        get() {
            getterCalls += 1;
            return canonicalResult;
        },
    });
    const accessorSource =
        ctx.buildClassicalDiscontinuousUnitAdmissibilitySource(
            accessorRequest
        );
    const injectedFields = [
        "unitKind",
        "discontinuous",
        "cohesive",
        "formula",
        "surface",
        "lessonId",
        "storedAnswer",
    ];
    s.eq(
        "answer-bearing fields and accessors are rejected at the Source boundary",
        {
            getterCalls,
            accessor: [
                accessorSource.authorizationStatus,
                accessorSource.blockReason,
            ],
            injected: injectedFields.map((field) => {
                const injected =
                    ctx.buildClassicalDiscontinuousUnitAdmissibilitySource({
                        canonicalNuclearClauseResult: canonicalResult,
                        [field]: field === "discontinuous" || field === "cohesive"
                            ? true
                            : "authority-carrier",
                    });
                return [field, injected.authorizationStatus, injected.blockReason];
            }),
        },
        {
            getterCalls: 0,
            accessor: [
                "blocked",
                "discontinuous-unit-admissibility-source-data-constituent-required:canonicalNuclearClauseResult",
            ],
            injected: injectedFields.map((field) => [
                field,
                "blocked",
                `discontinuous-unit-admissibility-source-unrecognized-constituent:${field}`,
            ]),
        }
    );

    return s;
}

module.exports = { run };
