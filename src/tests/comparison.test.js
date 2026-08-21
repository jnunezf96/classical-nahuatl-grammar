"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function requireAuthorized(condition, diagnostic) {
    if (!condition) {
        throw new Error(`comparison-test-source:${diagnostic}`);
    }
}

function run(ctx) {
    const s = createSuite("comparison");

    const issueOrdinary = (
        stem,
        {
            subject = "3sg",
            state = "absolutive",
            possessor = "",
        } = {}
    ) => {
        const sourceFrame =
            ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
                stem,
            });
        const operationFrame =
            ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
                sourceFrame,
                {
                    state,
                    subject,
                    ...(state === "possessive" && possessor
                        ? { possessor }
                        : {}),
                    sentenceType: "statement",
                    polarity: "positive",
                }
            );
        const receipt =
            ctx.executeClassicalGrammarApplicationRequest({
                operationId: "nnc:ordinary",
                args: [sourceFrame, operationFrame],
            });
        requireAuthorized(
            ctx.isClassicalNahuatlOrdinaryNncSourceFrame(
                sourceFrame
            )
            && ctx.isClassicalNahuatlOrdinaryNncOperationFrame(
                operationFrame
            )
            && ctx.isClassicalGrammarApplicationResult(receipt)
            && receipt.authorizationStatus === "authorized"
            && ctx.isClassicalNahuatlOrdinaryNncResult(
                receipt.canonicalResult
            ),
            `ordinary:${stem}:${receipt?.blockReason || "blocked"}`
        );
        const comparisonSource =
            ctx.buildClassicalComparisonSourceUnit({
                sourceResult: receipt.canonicalResult,
            });
        requireAuthorized(
            ctx.isClassicalComparisonSourceUnit(comparisonSource)
            && comparisonSource.authorizationStatus === "authorized",
            `comparison-ordinary:${stem}:`
                + `${comparisonSource?.blockReason || "blocked"}`
        );
        return Object.freeze({
            sourceFrame,
            operationFrame,
            receipt,
            comparisonSource,
        });
    };

    const issuePronominal = (stem) => {
        const sourceFrame =
            ctx.buildClassicalNahuatlPronominalNncSourceFrame({
                stem,
            });
        const operationFrame =
            ctx.buildClassicalNahuatlPronominalNncOperationFrame(
                sourceFrame,
                {
                    subject: "3sg",
                    clausePosition: "initial",
                    adjunctorInMode: "none",
                    sentenceType: "statement",
                    polarity: "positive",
                }
            );
        const receipt =
            ctx.executeClassicalGrammarApplicationRequest({
                operationId: "nnc:pronominal",
                args: [sourceFrame, operationFrame],
            });
        requireAuthorized(
            ctx.isClassicalNahuatlPronominalNncSourceFrame(
                sourceFrame
            )
            && ctx.isClassicalNahuatlPronominalNncOperationFrame(
                operationFrame
            )
            && ctx.isClassicalGrammarApplicationResult(receipt)
            && receipt.authorizationStatus === "authorized"
            && ctx.isClassicalNahuatlPronominalNncResult(
                receipt.canonicalResult
            ),
            `pronominal:${stem}:${receipt?.blockReason || "blocked"}`
        );
        const comparisonSource =
            ctx.buildClassicalComparisonSourceUnit({
                sourceResult: receipt.canonicalResult,
            });
        requireAuthorized(
            ctx.isClassicalComparisonSourceUnit(comparisonSource)
            && comparisonSource.authorizationStatus === "authorized",
            `comparison-pronominal:${stem}:`
                + `${comparisonSource?.blockReason || "blocked"}`
        );
        return Object.freeze({
            sourceFrame,
            operationFrame,
            receipt,
            comparisonSource,
        });
    };

    const issueVnc = (
        sourceStem,
        {
            objectSpecificity = "",
        } = {}
    ) => {
        const unspecified =
            objectSpecificity === "unspecified";
        const specified = objectSpecificity === "specified";
        const receipt =
            ctx.executeClassicalGrammarApplicationRequest({
                operationId: "vnc:application",
                args: [{
                    sourceStem,
                    ...(sourceStem.startsWith("i")
                        ? { sourceInitialISelection: "real" }
                        : {}),
                    verbClass: "A",
                    sourceValence: unspecified
                        ? "projective-nonhuman"
                        : specified
                            ? "specific-projective"
                            : "intransitive",
                    subject: specified ? "3sg" : "1sg",
                    objectKind: unspecified
                        ? "projective-nonhuman"
                        : specified
                            ? "specific-projective"
                            : "none",
                    objectPerson: specified ? "3sg" : "",
                    requestedDerivation: "direct",
                    requestedVoice: "active",
                    mood: "indicative",
                    tense: "present",
                    outputScope: "single",
                }],
            });
        requireAuthorized(
            ctx.isClassicalGrammarApplicationResult(receipt)
            && receipt.authorizationStatus === "authorized",
            `vnc:${sourceStem}:${receipt?.blockReason || "blocked"}`
        );
        const comparisonSource =
            ctx.buildClassicalComparisonSourceUnit({
                sourceResult: receipt.canonicalResult,
            });
        requireAuthorized(
            ctx.isClassicalComparisonSourceUnit(comparisonSource)
            && comparisonSource.authorizationStatus === "authorized",
            `comparison-vnc:${sourceStem}:`
                + `${comparisonSource?.blockReason || "blocked"}`
        );
        return Object.freeze({
            receipt,
            comparisonSource,
        });
    };

    const issueComposition = (leftStem, rightStem) => {
        const left = issueOrdinary(leftStem, { subject: "3common" });
        const right = issueOrdinary(rightStem, { subject: "3common" });
        const conjuncts = [
            [left, leftStem],
            [right, rightStem],
        ].map(([entry, stem]) => (
            ctx.buildClassicalNahuatlClauseCompositionSourceFrame(
                entry.receipt.canonicalResult,
                { referenceId: `comparison-${stem}` }
            )
        ));
        requireAuthorized(
            conjuncts.every(frame => (
                ctx.isClassicalNahuatlClauseCompositionSourceFrame(
                    frame
                )
                && frame.authorizationStatus === "authorized"
            )),
            `composition-conjuncts:${leftStem}:${rightStem}`
        );
        const receipt =
            ctx.executeClassicalGrammarApplicationRequest({
                operationId: "clause:composition",
                args: [{
                    operationKind: "conjunction",
                    conjuncts,
                    options: {
                        relation: "unmarked",
                        coordinationType: "additive",
                        level: "principal",
                        polarity: "positive",
                    },
                }],
            });
        requireAuthorized(
            ctx.isClassicalGrammarApplicationResult(receipt)
            && receipt.authorizationStatus === "authorized",
            `composition:${leftStem}:${rightStem}:`
                + `${receipt?.blockReason || "blocked"}`
        );
        const comparisonSource =
            ctx.buildClassicalComparisonSourceUnit({
                sourceResult: receipt.canonicalResult,
            });
        requireAuthorized(
            ctx.isClassicalComparisonSourceUnit(comparisonSource)
            && comparisonSource.authorizationStatus === "authorized"
            && comparisonSource.baseUnitKind === "composition",
            `comparison-composition:${leftStem}:${rightStem}`
        );
        return comparisonSource;
    };

    const execute = (request) => (
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "clause:comparison",
            args: [request],
        })
    );

    s.eq(
        "comparison exposes one canonical typed Source, scalar, batch, and result contract",
        [
            typeof ctx.buildClassicalComparisonSourceUnit,
            typeof ctx.buildClassicalComparisonOperationFrame,
            typeof ctx.buildClassicalComparisonAst,
            typeof ctx.realizeClassicalComparison,
            typeof ctx.evaluateClassicalNahuatlComparison,
            typeof ctx.evaluateClassicalNahuatlComparisonBatch,
            typeof ctx.isClassicalComparisonResultFrame,
        ],
        Array(7).fill("function")
    );

    const gcd = ctx.buildClassicalComparisonGcdFrame();
    const lcm = ctx.getClassicalComparisonLcmInventory();
    s.eq(
        "the comparison contract declares one ordered path and exposes its route inventory only as a derived diagnostic",
        {
            gcdId: gcd.gcdId,
            stages: gcd.orderedStages,
            scalar: gcd.scalarEvaluatorIdentity,
            batch: gcd.batchEvaluatorIdentity,
            batchEqualsScalar: gcd.batchEqualsScalar,
            authority: [
                gcd.routeSelectedByLessonMetadata,
                gcd.routeSelectedByEvidence,
                gcd.routeSelectedByFormulaString,
                gcd.routeSelectedBySurfaceString,
                gcd.callerSuppliedResultAuthorityAccepted,
            ],
            routeCount: lcm.routeCount,
            runtimeRouteCount:
                ctx.getClassicalComparisonRouteInventory().length,
            inventoryIsCoverageAuthority:
                lcm.inventoryIsCoverageAuthority === true,
        },
        {
            gcdId: "typed-comparison-source-route-ast-result",
            stages: [
                "typed-source",
                "licensed-route",
                "typed-operation",
                "comparison-ast",
                "canonical-result",
            ],
            scalar: "evaluateClassicalNahuatlComparison",
            batch: "evaluateClassicalNahuatlComparisonBatch",
            batchEqualsScalar: true,
            authority: [false, false, false, false, false],
            routeCount: 23,
            runtimeRouteCount: 23,
            inventoryIsCoverageAuthority: false,
        }
    );

    const cal = issueOrdinary("cal", { subject: "3common" }).comparisonSource;
    const mich = issueOrdinary("mich", { subject: "3common" }).comparisonSource;
    const teuc = issueOrdinary("tēuc").comparisonSource;
    const resemblance =
        issueOrdinary("nēnehuilia").comparisonSource;
    const honorific =
        issueOrdinary("yōlchicāhuacātzintli")
            .comparisonSource;
    const yeh = issuePronominal("yeh").comparisonSource;
    const ihui = issueVnc("ihui").comparisonSource;
    const cempanahuia =
        issueVnc("cempanahuia", {
            objectSpecificity: "unspecified",
        }).comparisonSource;
    const larger = issueComposition("cal", "mich");

    s.eq(
        "comparison Source units are projections of genuine owner-issued NNC, VNC, and composition Results",
        [
            cal,
            yeh,
            ihui,
            larger,
        ].map(source => [
            source.authorizationStatus,
            source.baseUnitKind,
            source.ownerOperationId,
            source.ownerIssuedSource,
            source.callerSuppliedSurfaceAccepted,
            source.callerSuppliedFormulaAccepted,
        ]),
        [
            [
                "authorized",
                "nnc",
                "nnc:ordinary",
                true,
                false,
                false,
            ],
            [
                "authorized",
                "nnc",
                "nnc:pronominal",
                true,
                false,
                false,
            ],
            [
                "authorized",
                "vnc",
                "vnc:application",
                true,
                false,
                false,
            ],
            [
                "authorized",
                "composition",
                "clause:composition",
                true,
                false,
                false,
            ],
        ]
    );

    const cases = [
        [
            {
                routeId: "similarity-reduplicative-prefix",
                slots: { source: cal },
                choices: {
                    continuationFamily: "absolutive-li",
                },
            },
            "cacalli",
            "(ca-cal)-li-",
        ],
        [
            {
                routeId:
                    "similarity-resemblance-verbstem-nnc",
                slots: {
                    principal: resemblance,
                    standard: cal,
                },
                choices: {},
            },
            "nēnehuilia in calli",
            "#0-0(nēnehuilia)0-0#"
                + " + in + #0-0(cal)li-0#",
        ],
        [
            {
                routeId: "similarity-ihui-vnc",
                slots: {
                    topic: yeh,
                    principal: ihui,
                },
                choices: {},
            },
            "yeh, nihui",
            "#0-0(yeh)0-0# + #n-0(ihui)0+0-0#",
        ],
        [
            {
                routeId:
                    "comparative-panahuia-unspecified",
                slots: {
                    principal: cempanahuia,
                    point: cal,
                },
                choices: { adjunctorIn: true },
            },
            "nitlacempanahuia in īc calli",
            "#ni-0+tla(cempanahuia)0+0-0#"
                + " + in + īc + #0-0(cal)li-0#",
        ],
        [
            {
                routeId: "superlative-adverbial",
                slots: {
                    topic: teuc,
                    predicate: honorific,
                },
                choices: {
                    superlativeAdverbial: "cencah",
                    sentenceType: "declarative",
                },
            },
            "Tēuctli cencah yōlchicāhuacātzintli.",
            "#0-0(tēuc)tli-0# + cencah"
                + " + #0-0(yōlchicāhuacātzintli)0-0#",
        ],
    ];
    const receipts = cases.map(([request]) => execute(request));
    s.eq(
        "canonical scalar application independently generates exact written and formula projections",
        receipts.map((receipt, index) => {
            const result = receipt.canonicalResult;
            return [
                receipt.authorizationStatus,
                ctx.isClassicalGrammarApplicationResult(receipt),
                ctx.isClassicalComparisonResultFrame(result),
                result.surface,
                result.formula,
                result.formulaRealizationRecord?.surface
                    === result.surface,
                result.formulaRecord?.formula === result.formula,
                result.formulaRealizationRecord?.id
                    !== result.formulaRecord?.id,
                cases[index][1],
                cases[index][2],
            ];
        }),
        cases.map(([, written, formula]) => [
            "authorized",
            true,
            true,
            written,
            formula,
            true,
            true,
            true,
            written,
            formula,
        ])
    );

    const batchRequests = cases.map(([request]) => request);
    const batch =
        ctx.evaluateClassicalNahuatlComparisonBatch(batchRequests);
    s.eq(
        "batch evaluation is pointwise identical to the scalar evaluator for both projections",
        {
            status: batch.authorizationStatus,
            count: batch.resultCount,
            scalarIdentity: batch.scalarEvaluatorIdentity,
            pointwise: batch.pointwiseScalarEquality,
            writtenPointwise:
                batch.writtenProjectionPointwiseScalarEquivalent,
            formulaPointwise:
                batch.formulaProjectionPointwiseScalarEquivalent,
            exact: batch.results.map((result, index) => [
                result.surface
                    === receipts[index].canonicalResult.surface,
                result.formula
                    === receipts[index].canonicalResult.formula,
            ]),
        },
        {
            status: "authorized",
            count: cases.length,
            scalarIdentity:
                "evaluateClassicalNahuatlComparison",
            pointwise: true,
            writtenPointwise: true,
            formulaPointwise: true,
            exact: cases.map(() => [true, true]),
        }
    );

    const copiedSource = { ...mich };
    const hostileRequests = [
        [
            "copied-source",
            {
                routeId: "similarity-iuhqui-principal",
                slots: { adjoined: copiedSource },
                choices: {},
            },
            "comparison-adjoined-typed-source-required",
            "forbidden-authority:surface",
        ],
        [
            "wrong-resemblance-lexical-class",
            {
                routeId:
                    "similarity-resemblance-verbstem-nnc",
                slots: {
                    principal: cal,
                    standard: mich,
                },
                choices: {},
            },
            "comparison-resemblance-verbstem-nnc-source-required",
        ],
        [
            "wrong-ihui-lexeme",
            {
                routeId: "similarity-ihui-vnc",
                slots: {
                    topic: yeh,
                    principal: cempanahuia,
                },
                choices: {},
            },
            "comparison-ihui-vnc-source-required",
        ],
        [
            "unknown-marker",
            {
                routeId: "question-how-much-more",
                slots: {
                    baseClause: cal,
                    degreeClause: mich,
                },
                choices: {
                    questionCollocation:
                        "stored-canvas-answer",
                },
            },
            "comparison-questionCollocation-choice-not-recognized",
        ],
    ];
    const hostileExecutions = hostileRequests.map(([, request]) => {
        const ownerResult =
            ctx.evaluateClassicalNahuatlComparison(request);
        try {
            return { ownerResult, receipt: execute(request) };
        } catch (error) {
            return {
                ownerResult,
                receipt: {
                    authorizationStatus: "blocked",
                    canonicalResult: null,
                    blockReason: String(error?.message || error)
                        .replace(/^.*request-invalid:/u, ""),
                },
            };
        }
    });
    s.eq(
        "copied Sources, mismatched lexical classes, wrong lexemes, and unlicensed choices fail closed with exact reasons",
        hostileExecutions.map(
            ({ ownerResult, receipt }, index) => [
            hostileRequests[index][0],
            receipt.authorizationStatus,
            receipt.canonicalResult === null
                || receipt.canonicalResult?.authorizationStatus === "blocked",
            receipt.blockReason,
            ctx.isClassicalComparisonResultFrame(ownerResult),
            ownerResult.authorizationStatus,
            ownerResult.blockReason,
            ownerResult.surface,
            ownerResult.formula,
        ]),
        hostileRequests.map(([id, , reason, applicationReason = reason]) => [
            id,
            "blocked",
            true,
            applicationReason,
            true,
            "blocked",
            reason,
            "",
            "",
        ])
    );

    let forbiddenAuthorityError = "";
    try {
        execute({
            routeId: "equality-iuhqui",
            slots: {
                comparand: cal,
                standard: mich,
            },
            choices: {},
            formula: "stored Canvas answer",
        });
    } catch (error) {
        forbiddenAuthorityError =
            String(error?.message || error);
    }
    s.ok(
        "stored formula authority is rejected at the shared application boundary",
        forbiddenAuthorityError.endsWith(
            "forbidden-authority:formula"
        )
    );

    const sourcePoison =
        ctx.buildClassicalComparisonSourceUnit({
            sourceResult:
                issueOrdinary("cal", { subject: "3common" }).receipt.canonicalResult,
            surface: "stored answer",
        });
    s.eq(
        "callers cannot mint comparison Source facts or copy owner-issued Source identity",
        {
            poison: [
                sourcePoison.authorizationStatus,
                sourcePoison.blockReason,
            ],
            copiedValid:
                ctx.isClassicalComparisonSourceUnit(copiedSource),
        },
        {
            poison: [
                "blocked",
                "comparison-caller-supplied-source-facts-are-not-authority",
            ],
            copiedValid: false,
        }
    );

    const operation =
        ctx.buildClassicalComparisonOperationFrame(
            cases[0][0]
        );
    const ast = ctx.buildClassicalComparisonAst(operation);
    s.eq(
        "copied operation and AST objects cannot enter the Result boundary",
        [
            ctx.realizeClassicalComparison(
                { ...operation },
                ast
            ).authorizationStatus,
            ctx.realizeClassicalComparison(
                operation,
                { ...ast }
            ).authorizationStatus,
            ctx.isClassicalComparisonOperationFrame({
                ...operation,
            }),
            ctx.isClassicalComparisonAst({ ...ast }),
        ],
        ["blocked", "blocked", false, false]
    );

    const registry = ctx.getDefaultGrammarContractRegistry();
    const registryResult = receipts[0].canonicalResult;
    const registryFrames = [
        cal,
        registryResult.operationFrame,
        registryResult.astFrame,
        registryResult,
        batch,
        gcd,
        lcm,
    ];
    s.eq(
        "comparison contract kinds remain registered and identity-valid",
        registryFrames.map(frame => {
            const report =
                ctx.inspectRegisteredGrammarContract(
                    registry,
                    frame
                );
            return [frame.kind, report.ok, report.errors];
        }),
        [
            [
                "classical-nahuatl-comparison-source-unit",
                true,
                [],
            ],
            [
                "classical-nahuatl-comparison-operation-frame",
                true,
                [],
            ],
            [
                "classical-nahuatl-comparison-ast",
                true,
                [],
            ],
            [
                "classical-nahuatl-comparison-result-frame",
                true,
                [],
            ],
            [
                "classical-nahuatl-comparison-batch-result",
                true,
                [],
            ],
            [
                "classical-nahuatl-comparison-gcd-frame",
                true,
                [],
            ],
            [
                "classical-nahuatl-comparison-lcm-inventory",
                true,
                [],
            ],
        ]
    );

    s.eq(
        "lesson-local comparison classifiers and pursuit lanes are absent",
        [
            typeof ctx.classifyComparisonCandidate,
            typeof ctx.classifyComparisonFalsePositive,
            typeof ctx.getLesson53ComparisonSubsectionInventory,
            typeof ctx.buildLesson53ComparisonPursuitFrame,
        ],
        Array(4).fill("undefined")
    );

    const productionText = fs.readFileSync(
        path.resolve(
            process.cwd(),
            "src",
            "core",
            "comparison",
            "comparison.mjs"
        ),
        "utf8"
    );
    s.eq(
        "production comparison grammar contains no Canvas span, lesson ledger, stored witness, or documentary authority lane",
        {
            canvasDocument:
                /ANDREWS_TRANSCRIPTION_CANVAS\.md/u
                    .test(productionText),
            sourceSpan:
                /transcriptionLine(Start|End)|source[- ]span inventory/iu
                    .test(productionText),
            lessonLedger:
                /classical_lesson53_canvas_ledger/u
                    .test(productionText),
            storedAnswer:
                /comparisonStored(?:Surface|Formula|Answer)|storedComparison(?:Surface|Formula|Answer)/u
                    .test(productionText),
        },
        {
            canvasDocument: false,
            sourceSpan: false,
            lessonLedger: false,
            storedAnswer: false,
        }
    );

    return s;
}

module.exports = { run };
