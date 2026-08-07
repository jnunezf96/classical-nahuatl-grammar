"use strict";

const { createSuite } = require("./runner");

function failureMessage(fn) {
    try {
        fn();
        return "";
    } catch (error) {
        return String(error?.message || error);
    }
}

function run(ctx) {
    const s = createSuite("classical_lesson1_concept_application");

    const vncResult =
        ctx.buildClassicalNahuatlNuclearClauseResult(
            "(nemi)",
            {
                nuclearClauseKind: "verbal-nuclear-clause",
                transitivity: "intransitive",
                valenceArity: "vacant",
            }
        );
    const nncResult =
        ctx.evaluatePlaceGentilicNnc({
            constructionKind: "gentilic",
            formation: "ca-pan-eca",
            source: {
                placeStem: "Izta-pan",
            },
            subject: "1sg",
            state: "absolutive",
            nounClass: "tl",
            pluralConnector: "0-h",
        });

    const rankSources = [
        vncResult,
        nncResult,
    ].map((canonicalOwnerResult) =>
        ctx.buildClassicalGrammarConceptSource({
            domain: "rank",
            selection: "owner-issued-nuclear-clause",
            canonicalOwnerResult,
        })
    );
    s.eq(
        "nuclear-clause rank classification consumes existing owner-issued VNC and NNC Results without reconstructing either projection",
        rankSources.map((source) => {
            const receipt =
                ctx.executeClassicalGrammarApplicationRequest({
                    operationId: "concept:classification",
                    args: [source],
                });
            return {
                sourceAccepted:
                    ctx.isClassicalGrammarConceptSource(source),
                status: receipt.authorizationStatus,
                classification:
                    receipt.canonicalResult?.classification || "",
                facts: receipt.canonicalResult?.facts || [],
                restrictions:
                    receipt.canonicalResult?.restrictions || [],
                formulaPresent:
                    Object.prototype.hasOwnProperty.call(
                        receipt.canonicalResult || {},
                        "formula"
                    )
                    || Object.prototype.hasOwnProperty.call(
                        receipt.canonicalResult || {},
                        "formulaProjection"
                    ),
                surfacePresent:
                    Object.prototype.hasOwnProperty.call(
                        receipt.canonicalResult || {},
                        "surface"
                    )
                    || Object.prototype.hasOwnProperty.call(
                        receipt.canonicalResult || {},
                        "surfaceProjection"
                    ),
            };
        }),
        Array(2).fill({
            sourceAccepted: true,
            status: "authorized",
            classification: "nuclear-clause",
            facts: [
                "morphosyntactic-unit",
                "subject-predicate-structure",
                "inflectional-rank-above-stem",
            ],
            restrictions: ["not-word", "not-generated-surface"],
            formulaPresent: true,
            surfacePresent: true,
        }).map((entry) => ({
            ...entry,
            formulaPresent: false,
            surfacePresent: false,
        }))
    );

    const wordAssertion =
        ctx.buildClassicalGrammarConceptSource({
            domain: "rank",
            selection: "owner-issued-nuclear-clause",
            assertedClassification: "word",
            canonicalOwnerResult: vncResult,
        });
    const wordRejection =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "concept:classification",
            args: [wordAssertion],
        });
    s.eq(
        "the same rank owner exactly rejects calling an owner-issued nuclear clause a word",
        {
            sourceAccepted:
                ctx.isClassicalGrammarConceptSource(wordAssertion),
            status: wordRejection.authorizationStatus,
            blockReason: wordRejection.blockReason,
            resultOwnerIssued:
                ctx.isClassicalGrammarConceptResult(
                    wordRejection.canonicalResult
                ),
            resultClassification:
                wordRejection.canonicalResult?.classification || "",
        },
        {
            sourceAccepted: true,
            status: "blocked",
            blockReason: "concept-classification-mismatch:nuclear-clause",
            resultOwnerIssued: true,
            resultClassification: "",
        }
    );

    const transcriptionOwnerSource =
        ctx.buildClassicalNahuatlTranscriptionSourceFrame({
            constituents: [
                { segments: ["/k/", "a"] },
            ],
        });
    const transcription =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "orthography:transcription",
            args: [transcriptionOwnerSource],
        }).canonicalResult;
    const transcriptionSource =
        ctx.buildClassicalGrammarConceptSource({
            domain: "carrier-realization",
            selection: "owner-issued-transcription",
            canonicalOwnerResult: transcription,
        });
    const transcriptionClassification =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "concept:classification",
            args: [transcriptionSource],
        });
    s.eq(
        "carrier classification delegates written realization to the owner-issued orthography Result and does not copy its written form",
        {
            sourceAccepted:
                ctx.isClassicalGrammarConceptSource(
                    transcriptionSource
                ),
            status: transcriptionClassification.authorizationStatus,
            owner:
                transcriptionClassification.canonicalResult
                    ?.semanticOwnerId || "",
            classification:
                transcriptionClassification.canonicalResult
                    ?.classification || "",
            leakedWritten:
                JSON.stringify(
                    transcriptionClassification.canonicalResult
                ).includes("\"ca\""),
        },
        {
            sourceAccepted: true,
            status: "authorized",
            owner: "classical-orthographic-boundary",
            classification: "contextual-carrier-realization",
            leakedWritten: false,
        }
    );

    const copiedVncSource =
        ctx.buildClassicalGrammarConceptSource({
            domain: "rank",
            selection: "owner-issued-nuclear-clause",
            canonicalOwnerResult: { ...vncResult },
        });
    const jsonNncSource =
        ctx.buildClassicalGrammarConceptSource({
            domain: "rank",
            selection: "owner-issued-nuclear-clause",
            canonicalOwnerResult:
                JSON.parse(JSON.stringify(nncResult)),
        });
    const copiedTranscriptionSource =
        ctx.buildClassicalGrammarConceptSource({
            domain: "carrier-realization",
            selection: "owner-issued-transcription",
            canonicalOwnerResult: { ...transcription },
        });
    s.eq(
        "copied VNC, NNC, and orthography structures cannot satisfy cross-owner rank or realization prerequisites",
        [
            copiedVncSource,
            jsonNncSource,
            copiedTranscriptionSource,
        ].map((source) => ({
            status: source.authorizationStatus,
            ownerIssued:
                ctx.isClassicalGrammarConceptSource(source),
            reason: source.blockReason,
        })),
        [
            {
                status: "blocked",
                ownerIssued: false,
                reason: "nuclear-clause-owner-issued-result-required",
            },
            {
                status: "blocked",
                ownerIssued: false,
                reason: "nuclear-clause-owner-issued-result-required",
            },
            {
                status: "blocked",
                ownerIssued: false,
                reason: "transcription-owner-issued-result-required",
            },
        ]
    );

    s.eq(
        "application boundary rejects lesson, labels, translation, formulas, and surfaces as concept authority before evaluation",
        [
            { lesson: 1 },
            { storedLabel: "NNC" },
            { translation: "nuclear clause" },
            { formula: "#ni-0(nemi)0+0-0#" },
            { surface: "ninemi" },
        ].map((carrier) => failureMessage(() =>
            ctx.executeClassicalGrammarApplicationRequest({
                operationId: "concept:classification",
                args: [{
                    domain: "rank",
                    selection: "owner-issued-nuclear-clause",
                    ...carrier,
                }],
            })
        )),
        [
            "classical-grammar-application-request-invalid:forbidden-authority:lesson",
            "classical-grammar-application-request-invalid:forbidden-authority:storedLabel",
            "classical-grammar-application-request-invalid:forbidden-authority:translation",
            "classical-grammar-application-request-invalid:forbidden-authority:formula",
            "classical-grammar-application-request-invalid:forbidden-authority:surface",
        ]
    );

    return s;
}

module.exports = { run };
