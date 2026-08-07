"use strict";

const { createSuite } = require("./runner");

function completeRequest(overrides = {}) {
    return {
        candidateKind: "silent-morph",
        correspondingPosition: "corresponding",
        structuralPattern: "similarly-structured",
        categoryRelation: "related-category",
        soundedCounterpart: "present",
        ...overrides,
    };
}

function run(ctx = {}) {
    const s = createSuite("silent_morph_contrast");

    s.eq(
        "the independent silent-contrast owner exposes a dedicated typed Source, Result, operation contract, and live evidence API",
        [
            "buildClassicalSilentMorphContrastSource",
            "isClassicalSilentMorphContrastSource",
            "evaluateClassicalSilentMorphContrast",
            "isClassicalSilentMorphContrastResult",
            "isClassicalSilentMorphContrastOperationContract",
            "getClassicalSilentMorphContrastExecutionEvidence",
            "isClassicalSilentMorphContrastExecutionEvidence",
        ].map((name) => [name, typeof ctx[name]]),
        [
            ["buildClassicalSilentMorphContrastSource", "function"],
            ["isClassicalSilentMorphContrastSource", "function"],
            ["evaluateClassicalSilentMorphContrast", "function"],
            ["isClassicalSilentMorphContrastResult", "function"],
            ["isClassicalSilentMorphContrastOperationContract", "function"],
            ["getClassicalSilentMorphContrastExecutionEvidence", "function"],
            ["isClassicalSilentMorphContrastExecutionEvidence", "function"],
        ]
    );

    s.eq(
        "morpheme and morph hypotheses are licensed only by the complete four-coordinate sounded contrast",
        ["silent-morpheme", "silent-morph"].map((candidateKind) => {
            const source = ctx.buildClassicalSilentMorphContrastSource(
                completeRequest({ candidateKind })
            );
            const result = ctx.evaluateClassicalSilentMorphContrast(source);
            const evidence =
                ctx.getClassicalSilentMorphContrastExecutionEvidence(result);
            return {
                candidateKind,
                sourceValid:
                    ctx.isClassicalSilentMorphContrastSource(source),
                resultValid:
                    ctx.isClassicalSilentMorphContrastResult(result),
                status: result.authorizationStatus,
                reason: result.blockReason,
                owner: result.semanticOwnerId,
                operation: result.operationId,
                contractValid:
                    ctx.isClassicalSilentMorphContrastOperationContract(
                        result.operationContract
                    ),
                contrastStatus: result.contrastStatus,
                authorized: result.silentHypothesisAuthorized,
                facts: result.facts,
                relation: result.relations,
                generated: [
                    result.generationAllowed,
                    result.formGenerated,
                    result.writtenSurfaceGenerated,
                ],
                stages: evidence.execution.stages.slice(-2),
                evidenceValid:
                    ctx.isClassicalSilentMorphContrastExecutionEvidence(
                        evidence,
                        result
                    ),
            };
        }),
        ["silent-morpheme", "silent-morph"].map((candidateKind) => ({
            candidateKind,
            sourceValid: true,
            resultValid: true,
            status: "authorized",
            reason: "",
            owner: "silent-morph-contrast-validation",
            operation: "classical.morpheme.silent.contrast.validate",
            contractValid: true,
            contrastStatus: "licensed-by-sounded-contrast",
            authorized: true,
            facts: [
                "corresponding-position-confirmed",
                "similarly-structured-item-confirmed",
                "related-category-confirmed",
                "sounded-counterpart-confirmed",
                "contrast-justifies-silent-hypothesis",
            ],
            relation: [
                "sounded-silent-contrast-licenses-silent-hypothesis",
            ],
            generated: [false, false, false],
            stages: [
                "silent-contrast-required-coordinates-validated",
                "silent-morph-hypothesis-contrast-licensed",
            ],
            evidenceValid: true,
        }))
    );

    s.eq(
        "each absent contrast coordinate fails closed with its own live rejection reason",
        [
            [
                { correspondingPosition: "noncorresponding" },
                "silent-contrast-corresponding-position-required",
            ],
            [
                { structuralPattern: "differently-structured" },
                "silent-contrast-similar-structure-required",
            ],
            [
                { categoryRelation: "unrelated-category" },
                "silent-contrast-related-category-required",
            ],
            [
                { soundedCounterpart: "absent" },
                "silent-contrast-sounded-counterpart-required",
            ],
        ].map(([overrides, expectedReason]) => {
            const source = ctx.buildClassicalSilentMorphContrastSource(
                completeRequest(overrides)
            );
            const result = ctx.evaluateClassicalSilentMorphContrast(source);
            const evidence =
                ctx.getClassicalSilentMorphContrastExecutionEvidence(result);
            const conditionRejection = evidence.routeSteps.find(
                (step) => step.stepId
                    === "silent-contrast-required-coordinates-rejected"
            );
            const hypothesisRejection = evidence.routeSteps.find(
                (step) => step.stepId
                    === "silent-morph-hypothesis-contrast-rejected"
            );
            return {
                expectedReason,
                status: result.authorizationStatus,
                reason: result.blockReason,
                contrastStatus: result.contrastStatus,
                authorized: result.silentHypothesisAuthorized,
                resultValid:
                    ctx.isClassicalSilentMorphContrastResult(result),
                executionStatus: evidence.execution.status,
                selectedRuleId: evidence.execution.selectedRuleId,
                conditionGuard: [
                    conditionRejection.status,
                    conditionRejection.reason,
                    conditionRejection.executedRuleIds,
                ],
                hypothesisGuard: [
                    hypothesisRejection.status,
                    hypothesisRejection.reason,
                    hypothesisRejection.executedRuleIds,
                ],
            };
        }),
        [
            "silent-contrast-corresponding-position-required",
            "silent-contrast-similar-structure-required",
            "silent-contrast-related-category-required",
            "silent-contrast-sounded-counterpart-required",
        ].map((expectedReason) => ({
            expectedReason,
            status: "blocked",
            reason: expectedReason,
            contrastStatus: "unlicensed-silence",
            authorized: false,
            resultValid: true,
            executionStatus: "rejected",
            selectedRuleId: null,
            conditionGuard: ["rejected", expectedReason, []],
            hypothesisGuard: ["rejected", expectedReason, []],
        }))
    );

    s.eq(
        "zero displays, empty surfaces, policy labels, examples, answers, formulas, lessons, and concrete forms cannot supply contrast coordinates",
        [
            { displayedZero: "Ø" },
            { surface: "" },
            { policyLabel: "silent-contrast-policy-nonauthority" },
            { example: "English plural" },
            { canvasAnswer: "silent morph" },
            { formula: "Ø" },
            { lessonId: 1 },
            { form: "Ø" },
        ].map((extra) => {
            const source = ctx.buildClassicalSilentMorphContrastSource({
                ...completeRequest(),
                ...extra,
            });
            const result = ctx.evaluateClassicalSilentMorphContrast(source);
            return {
                sourceStatus: source.authorizationStatus,
                sourceReason: source.blockReason,
                sourceValid:
                    ctx.isClassicalSilentMorphContrastSource(source),
                resultStatus: result.authorizationStatus,
                resultReason: result.blockReason,
            };
        }),
        [
            "displayedZero",
            "surface",
            "policyLabel",
            "example",
            "canvasAnswer",
            "formula",
            "lessonId",
            "form",
        ].map((field) => ({
            sourceStatus: "blocked",
            sourceReason:
                `silent-contrast-source-unrecognized-constituent:${field}`,
            sourceValid: false,
            resultStatus: "blocked",
            resultReason:
                "owner-issued-silent-morph-contrast-source-required",
        }))
    );

    const taxonomySource = ctx.buildClassicalGrammarConceptSource({
        domain: "morpheme",
        selection: "silent-morpheme",
    });
    const perceptionSource = ctx.buildClassicalGrammarConceptSource({
        domain: "morph-structure-perception-analysis",
        selection: "sigeme-content-recognition",
    });
    const forgedSource = Object.freeze({
        kind: "classical-silent-morph-contrast-source",
        version: 1,
        authorizationStatus: "authorized",
        blockReason: "",
        ...completeRequest(),
    });
    s.eq(
        "taxonomy, perception analysis, and structurally forged Sources cannot cross-authorize silent contrast",
        [taxonomySource, perceptionSource, forgedSource].map((source) => {
            const result = ctx.evaluateClassicalSilentMorphContrast(source);
            return {
                dedicatedSourceValid:
                    ctx.isClassicalSilentMorphContrastSource(source),
                resultStatus: result.authorizationStatus,
                resultReason: result.blockReason,
                hypothesisAuthorized: result.silentHypothesisAuthorized,
            };
        }),
        Array.from({ length: 3 }, () => ({
            dedicatedSourceValid: false,
            resultStatus: "blocked",
            resultReason:
                "owner-issued-silent-morph-contrast-source-required",
            hypothesisAuthorized: false,
        }))
    );

    return s;
}

module.exports = { run };
