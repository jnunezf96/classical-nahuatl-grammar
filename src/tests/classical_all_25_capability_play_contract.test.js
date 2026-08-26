"use strict";

const { createSuite } = require("./runner");

const COMPOSITION_OPERATION_IDS = Object.freeze([
    "nnc:ordinary",
    "nnc:pronominal",
    "vnc:application",
    "nnc:sentence-surface",
    "vnc:sentence-result",
    "vnc:ordered-voice-application",
    "vnc:derivational-operation",
    "sentence:adverbial-adjunction",
    "sentence:particle-adjunction",
    "particle:negative-selection",
    "sentence:supplementation",
    "nnc:adjectival-modification",
    "clause:adverbial-adjunction",
    "clause:composition",
    "clause:comparison",
    "grammar:nominal-construction",
    "nnc:deverbal-construction",
    "nnc:adverbial",
    "nnc:relational",
    "nnc:place-gentilic",
    "vnc:denominal",
    "nnc:personal-name",
    "particle:result",
]);

const ANALYSIS_OPERATION_IDS = Object.freeze([
    "nnc:diagram",
    "vnc:diagram",
]);

const FIXED_OPERATION_IDS = Object.freeze([
    ...COMPOSITION_OPERATION_IDS,
    ...ANALYSIS_OPERATION_IDS,
]);

function execute(ctx, operationId, args, outputKind = "scalar") {
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId,
        outputKind,
        args,
    });
}

function issueOrdinary(
    ctx,
    stem = "mich",
    { subject = "3sg", sourceClass = "" } = {}
) {
    const source = sourceClass
        ? ctx.issueCanonicalNncSourceFrame({ stem, sourceClass })
        : ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({ stem });
    const operation = ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
        source,
        {
            state: "absolutive",
            subject,
            sentenceType: "statement",
            polarity: "positive",
        }
    );
    return execute(ctx, "nnc:ordinary", [source, operation]);
}

function issuePronominal(ctx, stem = "yeh") {
    const source = ctx.buildClassicalNahuatlPronominalNncSourceFrame({
        stem,
    });
    const operation = ctx.buildClassicalNahuatlPronominalNncOperationFrame(
        source,
        {
            subject: "3sg",
            clausePosition: "initial",
            adjunctorInMode: "none",
            sentenceType: "statement",
            polarity: "positive",
        }
    );
    return execute(ctx, "nnc:pronominal", [source, operation]);
}

function issueVnc(ctx, overrides = {}) {
    return execute(ctx, "vnc:application", [{
        sourceStem: "ahci",
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "active",
        voice: "active",
        outputScope: "single",
        ...overrides,
    }]);
}

function issueNncSentence(ctx, ordinaryReceipt) {
    return execute(ctx, "nnc:sentence-surface", [
        ordinaryReceipt.canonicalResult.typedSlotFrame,
    ]);
}

function issueCanonicalNncClause(ctx, stem) {
    const nnc = ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
        subject: "3sg",
        nounClass: "zero",
        animacy: "animate",
    });
    return execute(ctx, "nnc:sentence-surface", [
        nnc.nncSlotFrame,
        { sentenceType: "assertion", polarity: "positive" },
    ]);
}

function makeWitnesses(ctx) {
    const cache = new Map();
    const memo = (key, build) => {
        if (!cache.has(key)) cache.set(key, build());
        return cache.get(key);
    };
    return Object.freeze({
        ordinary: (stem = "mich", options = {}) => memo(
            `ordinary:${stem}:${JSON.stringify(options)}`,
            () => issueOrdinary(ctx, stem, options)
        ),
        pronominal: () => memo(
            "pronominal:yeh",
            () => issuePronominal(ctx)
        ),
        vnc: (key = "default", overrides = {}) => memo(
            `vnc:${key}`,
            () => issueVnc(ctx, overrides)
        ),
        nncSentence: (key, ordinaryReceipt) => memo(
            `nnc-sentence:${key}`,
            () => issueNncSentence(ctx, ordinaryReceipt)
        ),
        nncClause: (stem) => memo(
            `nnc-clause:${stem}`,
            () => issueCanonicalNncClause(ctx, stem)
        ),
        particle: (particleId) => memo(
            `particle:${particleId}`,
            () => execute(ctx, "particle:result", [
                ctx.buildClassicalNahuatlParticleSourceFrame(particleId),
            ])
        ),
    });
}

function run(ctx = {}) {
    const suite = createSuite("classical_all_25_capability_play_contract");
    const witnesses = makeWitnesses(ctx);

    const ordinaryMich = () => witnesses.ordinary("mich");
    const ordinaryCal = () => witnesses.ordinary(
        "cal",
        { subject: "3common" }
    );
    const ordinaryAchi = () => witnesses.ordinary(
        "achi",
        { sourceClass: "zero" }
    );
    const defaultVnc = () => witnesses.vnc();
    const vncSentence = () => witnesses.vnc(
        "sentence",
        {
            sourceStem: "nemi",
            verbClass: "B",
            sentenceOptions: {
                sentenceType: "yes-no-question",
                questionMode: "cuix",
            },
        }
    );
    const exactVncSentence = () => execute(
        ctx,
        "vnc:sentence-result",
        [vncSentence().canonicalResult]
    );
    const exactDeverbal = () => {
        const preterit = witnesses.vnc("pix-preterit", {
            sourceStem: "pix",
            verbClass: "A",
            tense: "preterit",
        });
        return execute(ctx, "nnc:deverbal-construction", [{
            constructionKind: "predicate-nominalization",
            nominalizationKind: "preterit-agentive",
            canonicalVncResult: preterit.canonicalResult.resultFrame,
            subject: "3sg",
            state: "absolutive",
            animacy: "animate",
        }]);
    };

    const cases = [
        {
            operationId: "nnc:ordinary",
            mode: "composition",
            validator: "isClassicalNahuatlOrdinaryNncResult",
            build: ordinaryMich,
        },
        {
            operationId: "nnc:pronominal",
            mode: "composition",
            validator: "isClassicalNahuatlPronominalNncResult",
            build: witnesses.pronominal,
        },
        {
            operationId: "vnc:application",
            mode: "composition",
            validator: "isClassicalNahuatlVncApplicationFrame",
            build: defaultVnc,
        },
        {
            operationId: "nnc:sentence-surface",
            mode: "composition",
            validator: "isClassicalNahuatlIssuedNncSentenceSurfaceFrame",
            build: () => witnesses.nncSentence("mich", ordinaryMich()),
        },
        {
            operationId: "vnc:sentence-result",
            mode: "composition",
            validator: "isClassicalNahuatlVncSentenceResultFrame",
            build: exactVncSentence,
        },
        {
            operationId: "vnc:ordered-voice-application",
            mode: "composition",
            validator: "isClassicalNahuatlOrderedVoiceVncApplicationFrame",
            build: () => {
                const base = witnesses.vnc("ordered-base", {
                    sourceStem: "yohua",
                    subject: "1sg",
                    requestedVoice: "impersonal",
                    voice: "impersonal",
                    nonactiveOptionId: "inherent-impersonal",
                });
                const binding = ctx
                    .issueClassicalNahuatlVncContinuationBindingFrame(
                        "vnc:ordered-voice-application",
                        base.canonicalResult.resultFrame,
                        {
                            operations: [
                                "inherent-impersonal",
                                "tla-impersonal",
                                "nonactive-lō",
                            ],
                        }
                    );
                return execute(ctx, binding.operationId, [
                    ...binding.executionArgs,
                ]);
            },
        },
        {
            operationId: "vnc:derivational-operation",
            mode: "composition",
            validator: "isClassicalNahuatlClosureFrame",
            build: () => {
                const binding = ctx
                    .issueClassicalNahuatlVncContinuationBindingFrame(
                        "vnc:derivational-operation",
                        defaultVnc().canonicalResult.resultFrame,
                        {
                            lateOperation: "frequentative",
                            lateVariant: "ordinary-long",
                            frequentativeRepetitions: 2,
                        }
                    );
                return execute(ctx, binding.operationId, [
                    ...binding.executionArgs,
                ]);
            },
        },
        {
            operationId: "sentence:adverbial-adjunction",
            mode: "composition",
            validator: "isClassicalNahuatlIssuedParticleSentenceLayerFrame",
            build: () => execute(
                ctx,
                "sentence:adverbial-adjunction",
                [{
                    particleResultFrame:
                        witnesses.particle("l3-oc").canonicalResult,
                    nuclearResultFrame: exactVncSentence().canonicalResult,
                }]
            ),
        },
        {
            operationId: "sentence:particle-adjunction",
            mode: "composition",
            validator: "isClassicalNahuatlIssuedParticleSentenceLayerFrame",
            build: () => execute(
                ctx,
                "sentence:particle-adjunction",
                [{
                    particleResultFrame:
                        witnesses.particle("l3-auh-conjunctor")
                            .canonicalResult,
                    nuclearResultFrame: exactVncSentence().canonicalResult,
                    honorificized: false,
                    speakerGender: "unspecified",
                }]
            ),
        },
        {
            operationId: "particle:negative-selection",
            mode: "composition",
            validator: "isClassicalNahuatlNegativeParticleSelectionFrame",
            build: () => execute(
                ctx,
                "particle:negative-selection",
                [{
                    polarity: "negative",
                    precedingParticleResultFrame:
                        witnesses.particle("l3-ma").canonicalResult,
                    sentenceKind: "wish",
                }]
            ),
        },
        {
            operationId: "sentence:supplementation",
            mode: "composition",
            validator: "isClassicalNahuatlSupplementationFrame",
            build: () => {
                const principal = ctx
                    .buildClassicalNahuatlSupplementationClauseEnvelope(
                        witnesses.vnc("supplement-principal", {
                            sourceStem: "cuīca",
                        }).canonicalResult,
                        {
                            referenceId: "third",
                            subjectReferenceId: "third",
                            sourceStem: "cuīca",
                        }
                    );
                const supplement = ctx
                    .buildClassicalNahuatlSupplementationClauseEnvelope(
                        witnesses.nncSentence(
                            "supplement",
                            ordinaryMich()
                        ).canonicalResult,
                        {
                            referenceId: "third",
                            subjectReferenceId: "third",
                            sourceStem: "mich",
                        }
                    );
                return execute(ctx, "sentence:supplementation", [{
                    operationKind: "relation",
                    principalClause: principal,
                    supplementClause: supplement,
                    options: {
                        referenceMode: "shared",
                        headRole: "subject",
                        supplementContactRole: "subject",
                        order: "principal-first",
                    },
                }]);
            },
        },
        {
            operationId: "nnc:adjectival-modification",
            mode: "composition",
            validator: "isClassicalNahuatlResultFrame",
            build: () => execute(ctx, "nnc:adjectival-modification", [{
                operationKind: "adjectival-modification",
                topology: "ordinary",
                head: witnesses.nncClause("cueitl").canonicalResult,
                modifier: witnesses.nncClause("canahuac").canonicalResult,
            }]),
        },
        {
            operationId: "clause:adverbial-adjunction",
            mode: "composition",
            validator: "isAdverbialAdjunctionResult",
            build: () => {
                const principal = witnesses.nncClause("cueitl")
                    .canonicalResult;
                const adjoined = witnesses.nncClause("canahuac")
                    .canonicalResult;
                return execute(ctx, "clause:adverbial-adjunction", [{
                    principalClause: principal,
                    adjoinedUnit: adjoined,
                    semanticRelation: "place",
                    adverbializationDegree: "first",
                    structureKind: "simple",
                    adjoinedUnitType: "nnc",
                    order: "modifier-head",
                    recursion: "none",
                    marking: "unmarked",
                }]);
            },
        },
        {
            operationId: "clause:composition",
            mode: "composition",
            validator: "isClassicalNahuatlClauseConjunctionResultFrame",
            build: () => execute(ctx, "clause:composition", [{
                operationKind: "conjunction",
                conjuncts: [
                    [witnesses.nncClause("cueitl").canonicalResult, "cueitl"],
                    [witnesses.nncClause("canahuac").canonicalResult, "canahuac"],
                ].map(([result, referenceId]) => (
                    ctx.buildClassicalNahuatlClauseCompositionSourceFrame(
                        result,
                        { referenceId }
                    )
                )),
                options: {
                    relation: "unmarked",
                    coordinationType: "additive",
                    level: "principal",
                    polarity: "positive",
                },
            }]),
        },
        {
            operationId: "clause:comparison",
            mode: "composition",
            validator: "isClassicalComparisonResultFrame",
            build: () => execute(ctx, "clause:comparison", [{
                routeId: "similarity-reduplicative-prefix",
                slots: {
                    source: ctx.buildClassicalComparisonSourceUnit({
                        sourceResult: ordinaryCal().canonicalResult,
                    }),
                },
                choices: { continuationFamily: "absolutive-li" },
            }]),
        },
        {
            operationId: "grammar:nominal-construction",
            mode: "composition",
            validator: "isClassicalNahuatlNominalConstructionResult",
            build: () => execute(ctx, "grammar:nominal-construction", [{
                constructionKind: "nominal-embed-vnc",
                source: {
                    embedStem: "coy-ō",
                    embedClass: "zero",
                    matrixStem: "chōca",
                    matrixVerbClass: "A",
                    matrixValence: "intransitive",
                },
                relation: "adverb",
                route: "direct-adverb",
                adverbRole: "compared-manner",
                orientation: "subject",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                voice: "active",
                outputKind: "single",
            }]),
        },
        {
            operationId: "nnc:deverbal-construction",
            mode: "composition",
            validator: "isClassicalNahuatlDeverbalNncGrammarFrame",
            build: exactDeverbal,
        },
        {
            operationId: "nnc:adverbial",
            mode: "composition",
            validator: "isClassicalNahuatlAdverbialNuclearResult",
            build: () => {
                const source = ordinaryAchi().canonicalResult;
                const binding = ctx
                    .issueClassicalGrammarFormationResultBindingFrame(
                        "nnc:adverbial",
                        source,
                        { scope: "external-clause" }
                    );
                return execute(ctx, "nnc:adverbial", [{
                    canonicalSourceResult: source,
                    degree: binding.ownerChoiceFrame.allowedDegrees[0],
                    scope: "external-clause",
                    context: {},
                }]);
            },
        },
        {
            operationId: "nnc:relational",
            mode: "composition",
            validator: "isClassicalNahuatlRelationalResult",
            build: () => execute(ctx, "nnc:relational", [{
                nounstem: {
                    kind: "classical-nahuatl-nnc-nounstem-request",
                    stemId: "n-locative",
                    operation: "relational-nnc",
                    formation: "option-two",
                    sourceFormation: "preterit-agentive",
                    sourceMode: "embed-matrix",
                    upstreamResult: exactDeverbal().canonicalResult,
                },
                state: "absolutive",
                subjectMode: "adverbialized",
                subjectId: "3common",
            }]),
        },
        {
            operationId: "nnc:place-gentilic",
            mode: "composition",
            validator: "isPlaceGentilicNncFrame",
            build: () => execute(ctx, "nnc:place-gentilic", [{
                canonicalNncResult: ordinaryMich().canonicalResult,
                constructionKind: "place-name",
                formation: "co",
                usage: "adverbial",
            }]),
        },
        {
            operationId: "vnc:denominal",
            mode: "composition",
            validator: "isClassicalNahuatlDenominalVncResultFrame",
            build: () => execute(ctx, "vnc:denominal", [{
                canonicalNncResult: ordinaryCal().canonicalResult,
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                objectPeople: ["3sg", "2sg"],
                outputScope: "single",
                operationId: "inceptive-ti",
            }]),
        },
        {
            operationId: "nnc:personal-name",
            mode: "composition",
            validator: "isPersonalNameNncResult",
            build: () => {
                const source = witnesses.vnc("temo-preterit", {
                    sourceStem: "temō",
                    tense: "preterit",
                }).canonicalResult.resultFrame;
                return execute(ctx, "nnc:personal-name", [{
                    canonicalSourceResult: source,
                    sourceFamily: "preterit-agentive",
                    outerSubject: "3sg",
                    affectiveScope: "none",
                    affectiveMatrix: "none",
                }]);
            },
        },
        {
            operationId: "particle:result",
            mode: "composition",
            validator: "isClassicalNahuatlParticleResultFrame",
            build: () => witnesses.particle("l3-auh-conjunctor"),
        },
        {
            operationId: "nnc:diagram",
            mode: "analysis",
            validator: "isClassicalNahuatlNncDiagrammaticFrame",
            build: () => {
                const navigator = ctx
                    .getClassicalGrammarApplicationCapabilityNavigator(
                        ordinaryMich()
                    );
                const operation = navigator.operations.find(candidate => (
                    candidate.operationId === "nnc:diagram"
                ));
                return execute(ctx, "nnc:diagram", [
                    operation.ownerProbeInputResult,
                ]);
            },
        },
        {
            operationId: "vnc:diagram",
            mode: "analysis",
            validator: "isClassicalNahuatlVncDiagrammaticFrame",
            build: () => {
                const navigator = ctx
                    .getClassicalGrammarApplicationCapabilityNavigator(
                        defaultVnc()
                    );
                const operation = navigator.operations.find(candidate => (
                    candidate.operationId === "vnc:diagram"
                ));
                return execute(ctx, "vnc:diagram", [
                    operation.ownerProbeInputResult,
                ]);
            },
        },
    ];

    cases.forEach((candidate, index) => {
        let receipt = null;
        let error = "";
        try {
            receipt = candidate.build();
        } catch (caught) {
            error = String(caught?.message || caught);
        }
        const canonicalResult = receipt?.canonicalResult || null;
        const validator = ctx[candidate.validator];
        const navigator = canonicalResult
            ? ctx.getClassicalGrammarApplicationCapabilityNavigator(
                canonicalResult
            )
            : null;
        const slotId = `all-25:${index + 1}:${candidate.operationId}`;
        const capture = candidate.mode === "composition" && receipt
            ? ctx.captureClassicalGrammarApplicationResult(receipt, slotId)
            : null;
        const common = {
            ...(index === 0 ? {
                fixedDenominator: {
                    all: cases.map(entry => entry.operationId),
                    composition: cases.filter(entry => (
                        entry.mode === "composition"
                    )).map(entry => entry.operationId),
                    analysis: cases.filter(entry => (
                        entry.mode === "analysis"
                    )).map(entry => entry.operationId),
                },
            } : {}),
            error,
            receipt: [
                ctx.isClassicalGrammarApplicationResult(receipt),
                receipt?.authorizationStatus || "",
                receipt?.operationId || "",
                receipt?.outputKind || "",
                receipt?.blockReason || "",
            ],
            ownerResult: [
                typeof validator,
                typeof validator === "function"
                    ? validator(canonicalResult)
                    : false,
                Boolean(canonicalResult),
            ],
        };
        const actual = candidate.mode === "composition"
            ? {
                ...common,
                capture: [
                    ctx.isClassicalGrammarApplicationResultCapture(
                        capture,
                        slotId
                    ),
                    capture?.authorizationStatus || "",
                    capture?.canonicalResult === canonicalResult,
                ],
                continuation: [
                    ctx.isClassicalGrammarApplicationCapabilityNavigator(
                        navigator
                    ),
                    navigator?.inputRole || "",
                    navigator?.exactResult === canonicalResult,
                    navigator?.emittedUnitKinds?.length > 0,
                ],
            }
            : {
                ...common,
                analysisOnly: [
                    ctx.isClassicalGrammarApplicationCapabilityNavigator(
                        navigator
                    ),
                    navigator?.inputRole || "",
                    navigator?.exactResult === canonicalResult,
                    navigator?.emittedUnitKinds || null,
                    navigator?.availableCount ?? -1,
                ],
            };
        const expected = candidate.mode === "composition"
            ? {
                ...(index === 0 ? {
                    fixedDenominator: {
                        all: FIXED_OPERATION_IDS,
                        composition: COMPOSITION_OPERATION_IDS,
                        analysis: ANALYSIS_OPERATION_IDS,
                    },
                } : {}),
                error: "",
                receipt: [
                    true,
                    "authorized",
                    candidate.operationId,
                    "scalar",
                    "",
                ],
                ownerResult: ["function", true, true],
                capture: [true, "authorized", true],
                continuation: [
                    true,
                    "exact-owner-issued-result",
                    true,
                    true,
                ],
            }
            : {
                ...(index === 0 ? {
                    fixedDenominator: {
                        all: FIXED_OPERATION_IDS,
                        composition: COMPOSITION_OPERATION_IDS,
                        analysis: ANALYSIS_OPERATION_IDS,
                    },
                } : {}),
                error: "",
                receipt: [
                    true,
                    "authorized",
                    candidate.operationId,
                    "scalar",
                    "",
                ],
                ownerResult: ["function", true, true],
                analysisOnly: [
                    true,
                    "exact-owner-issued-result",
                    true,
                    [],
                    0,
                ],
            };
        suite.eq(
            `${String(index + 1).padStart(2, "0")}/25 ${candidate.operationId}`,
            actual,
            expected
        );
    });

    return suite;
}

module.exports = { run };
