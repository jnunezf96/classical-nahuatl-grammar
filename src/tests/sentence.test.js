"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("sentence");

    s.eq(
        "the duplicate sentence metadata and lesson-finalizer APIs are absent",
        [
            "buildSentenceLayerMetadata",
            "buildGeneratedSentenceLayerMetadata",
            "buildBasicSentenceBoundaryMetadata",
            "getSentenceLayerAntiConflationRules",
            "buildClassicalNahuatlLesson2516SupplementationFrame",
            "buildClassicalNahuatlLesson253SupplementationFrame",
            "isClassicalNahuatlLesson2516SupplementationFrame",
            "isClassicalNahuatlLesson253SupplementationFrame",
        ].map(name => [name, typeof ctx[name]]),
        [
            ["buildSentenceLayerMetadata", "undefined"],
            ["buildGeneratedSentenceLayerMetadata", "undefined"],
            ["buildBasicSentenceBoundaryMetadata", "undefined"],
            ["getSentenceLayerAntiConflationRules", "undefined"],
            ["buildClassicalNahuatlLesson2516SupplementationFrame", "undefined"],
            ["buildClassicalNahuatlLesson253SupplementationFrame", "undefined"],
            ["isClassicalNahuatlLesson2516SupplementationFrame", "undefined"],
            ["isClassicalNahuatlLesson253SupplementationFrame", "undefined"],
        ]
    );

    const principalSource =
        ctx.classicalNahuatlVncApplication.evaluate({
            sourceStem: "cuīca",
            sourceSubject: "1sg",
            subject: "1sg",
            mood: "indicative",
            tense: "present",
            verbClass: "A",
            sourceValence: "intransitive",
            requestedDerivation: "direct",
            requestedVoice: "active",
        });
    const supplementSource =
        ctx.buildClassicalNahuatlAbsolutiveNncFrame("Petoloh", {
            subject: "1sg",
            nounClass: "zero",
            animacy: "animate",
        });
    const principal =
        ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
            principalSource,
            { referenceId: "speaker" }
        );
    const supplement =
        ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
            supplementSource,
            { referenceId: "speaker" }
        );
    const request = {
        coordinateId: "scalar",
        operationKind: "relation",
        principalClause: principal,
        supplementClause: supplement,
        options: {
            referenceMode: "shared",
            headRole: "subject",
            supplementContactRole: "subject",
            order: "principal-first",
        },
    };
    const scalar =
        ctx.evaluateClassicalNahuatlSupplementationOperation(request);
    const paradigm =
        ctx.evaluateClassicalNahuatlSupplementationOperationParadigm([
            request,
            {
                ...request,
                coordinateId: "hostile",
                operationKind: "stored-canvas-sentence",
                surface: "Caller answer.",
                formula: "#caller#",
            },
        ]);

    s.eq(
        "sentence composition and its paradigm coordinate use one typed supplementation evaluator",
        {
            scalar: [
                scalar.authorizationStatus,
                scalar.formulaRealization,
                scalar.surfaceRealization,
            ],
            paradigm: [
                paradigm.authorizationStatus,
                paradigm.scalarBuilder,
                paradigm.coordinateCount,
                paradigm.authorizedCoordinateCount,
            ],
            rows: paradigm.rows.map(row => [
                row.coordinateId,
                row.authorizationStatus,
                row.formulaRealization,
                row.surfaceRealization,
                row.blockReason,
            ]),
            scalarEquivalent:
                JSON.stringify(paradigm.rows[0].frame)
                === JSON.stringify(scalar),
        },
        {
            scalar: [
                "authorized",
                "#ni-0(cuīca)0+0-0# + #ni-0(Petoloh)0-0#",
                "Nicuīca niPetoloh.",
            ],
            paradigm: ["authorized", "evaluateClassicalNahuatlSupplementationOperation", 2, 1],
            rows: [
                [
                    "scalar",
                    "authorized",
                    "#ni-0(cuīca)0+0-0# + #ni-0(Petoloh)0-0#",
                    "Nicuīca niPetoloh.",
                    "",
                ],
                [
                    "hostile",
                    "blocked",
                    "",
                    "",
                    "unknown-supplementation-operation-kind",
                ],
            ],
            scalarEquivalent: true,
        }
    );

    const copiedPrincipal = { ...principal };
    const blocked =
        ctx.evaluateClassicalNahuatlSupplementationOperation({
            ...request,
            principalClause: copiedPrincipal,
        });
    s.eq(
        "copied constituents and stored projections cannot authorize a sentence",
        [
            ctx.isClassicalNahuatlSupplementationClauseEnvelope(
                copiedPrincipal
            ),
            blocked.authorizationStatus,
            blocked.blockReason,
            blocked.formulaRealization,
            blocked.surfaceRealization,
        ],
        [
            false,
            "blocked",
            "authorized-typed-principal-and-supplement-required",
            null,
            null,
        ]
    );

    return s;
}

module.exports = { run };
