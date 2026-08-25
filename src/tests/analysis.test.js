"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const {
    auditClassicalNahuatlLessons5758Canvas,
    auditClassicalNahuatlLessons5758Runtime,
} = require("./fixtures/classical_lessons57_58_source_ledger");

const NOUNSTEM_L_EXPECTATIONS = Object.freeze([
    ["te-l", "#0-0(te-l)li-0#", "telli"],
    ["ca-l", "#0-0(ca-l)li-0#", "calli"],
    ["tle-l", "#0-0(tle-l)li-0#", "tlelli"],
    ["cē-l", "#0-0(cē-l)li-0#", "cēlli"],
    ["icpa-l", "#0-0(icpa-l)li-0#", "icpalli"],
    ["cā-cā-l", "#0-0(cā-cā-l)li-0#", "cācālli"],
    ["ah-co-l", "#0-0(ah-co-l)li-0#", "ahcolli"],
    ["xā-l", "#0-0(xā-l)li-0#", "xālli"],
    ["xi-l", "#0-0(xi-l)li-0#", "xilli"],
]);

const CLOSED_EXCEPTION_REQUESTS = Object.freeze([
    ["ehua-retains-source-num1", { embedStem: "tzahtzi-z", retainedSourceNum1: "tl", matrixStem: "ē-hu-a" }],
    ["ehua-retains-source-num1", { embedStem: "chōqui-z", retainedSourceNum1: "tl", matrixStem: "ē-hu-a" }],
    ["ehua-retains-source-num1", { embedStem: "cochi-h", retainedSourceNum1: "tl", matrixStem: "ē-hua" }],
    ["ehua-retains-source-num1", { embedStem: "tla-tla-t-huī-l-lō", retainedSourceNum1: "tl", matrixStem: "ē-hua" }],
    ["solid-spelling-supplement", { supplementNounstem: "pōc", principalStem: "ē-hua-toc", relation: "supplementary-subject" }],
    ["integrated-supplement", { antecessiveParticle: "ō", adverbialNnc: "huel", supplementNounstem: "tlāl", principalStem: "mic-ti-m-o-tēca-c" }],
    ["connective-t-nounstem-embed", { embedNounstem: "xo-nāuh", connective: "t", matrixStem: "i-uh" }],
    ["preterit-agentive-object-complement", { embedStem: "mic-0-t-o", retainedSourceNum1: "c", matrixStem: "cāhua", controller: "matrix-object" }],
    ["preterit-agentive-object-complement", { embedStem: "petz-0-t-o", retainedSourceNum1: "c", matrixStem: "cāuh", controller: "matrix-object" }],
    ["connective-t-matrix-object-control", { embedStem: "iuh-0", connective: "ti", matrixStem: "cāhua", controller: "matrix-object" }],
    ["connective-t-matrix-object-control", { embedStem: "iuh-0", connective: "ti", matrixStem: "quetza", controller: "matrix-object" }],
    ["connective-t-matrix-object-control", { embedStem: "iuh-0", connective: "ti", matrixStem: "tēca", controller: "matrix-object" }],
    ["connective-t-matrix-object-control", { embedStem: "pol-i-uh-0", connective: "ti", matrixStem: "tlaza", controller: "matrix-object" }],
    ["connective-t-nonrelational-nounstem", { embedNounstem: "tla-zo-h", connective: "ti", matrixNounstem: "tlāca", matrixRelationClass: "nonrelational" }],
    ["frozen-third-person-reflexive", { incorporatedAdverbialNounstem: "tlāl", frozenReflexive: "m-0", matrixStem: "āhui-l-ti-ā" }],
]);

function buildFiniteVnc(ctx, tense) {
    return ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "nemi",
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense,
        requestedDerivation: "direct",
        requestedVoice: "active",
    });
}

function buildOrdinaryNnc(ctx, stem, selections = {}) {
    const source = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({ stem });
    const operation = ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
        source,
        {
            state: "absolutive",
            subject: "3sg",
            sentenceType: "statement",
            polarity: "positive",
            ...selections,
        }
    );
    return {
        source,
        operation,
        result: ctx.requestClassicalOrdinaryNncResult(source, operation),
    };
}

function denominalBase(overrides = {}) {
    return {
        nounStem: "pi-āz",
        sourceKind: "nounstem",
        sourceState: "absolutive",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        objectPeople: ["3sg"],
        outputScope: "single",
        ...overrides,
    };
}

function buildIncorporatedVnc(ctx, voice) {
    const passive = voice === "passive";
    return ctx.evaluateClassicalNahuatlNominalConstruction({
        constructionKind: "nominal-embed-vnc",
        source: {
            embedStem: passive ? "cōā" : "quimich",
            embedClass: "zero",
            matrixStem: passive ? "cuā" : "patl-ā-ni",
            matrixVerbClass: "A",
            matrixValence: passive ? "single-object" : "intransitive",
            objectPeople: passive ? ["3sg"] : [],
        },
        relation: "adverb",
        route: passive
            ? "passive-adverbialized-subject"
            : "direct-adverb",
        adverbRole: passive ? "means" : "compared-manner",
        orientation: "subject",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        voice,
        outputKind: "single",
    });
}

function run(ctx) {
    const s = createSuite("analysis");

    s.eq(
        "Lessons 57-58 have no generic analysis Source, operation, result, or runtime module",
        {
            analysisRoute: typeof ctx.ANALYSIS_ROUTE,
            sourceBuilder:
                typeof ctx.buildClassicalNahuatlAnalysisSourceFrame,
            evaluator: typeof ctx.evaluateClassicalNahuatlAnalysis,
            preparedPlan:
                typeof ctx.prepareClassicalNahuatlAnalysisPlan,
            genericBoundary: typeof ctx.buildAnalysisBoundaryMetadata,
            applicationOperations:
                ctx.getClassicalGrammarApplicationInventory().operationIds
                    .filter(operationId => operationId.startsWith("analysis:")),
            runtimeModules: (ctx.__CLASSICAL_ESM_PRELOADS__ || [])
                .map(entry => entry.esmModulePath)
                .filter(modulePath => modulePath.includes("/analysis/")),
        },
        {
            analysisRoute: "undefined",
            sourceBuilder: "undefined",
            evaluator: "undefined",
            preparedPlan: "undefined",
            genericBoundary: "undefined",
            applicationOperations: [],
            runtimeModules: [],
        }
    );

    const sourceAudit = auditClassicalNahuatlLessons5758Canvas(
        fs.readFileSync(
            path.join(process.cwd(), "ANDREWS_TRANSCRIPTION_CANVAS.md"),
            "utf8"
        )
    );
    s.eq(
        "the test-only Canvas ledger still accounts for every Lessons 57-58 claim and line without storing generated targets",
        {
            complete: sourceAudit.complete,
            sections: sourceAudit.sectionSpanCount,
            rules: sourceAudit.ruleCount,
            claims: sourceAudit.claimCount,
            bijection: sourceAudit.ruleClaimBijection,
            uncovered: sourceAudit.uncoveredLines,
            invalid: sourceAudit.invalidClaims,
            targetAuthority: sourceAudit.storedTargetAuthorityClaims,
        },
        {
            complete: true,
            sections: 15,
            rules: 54,
            claims: 54,
            bijection: true,
            uncovered: [],
            invalid: [],
            targetAuthority: [],
        }
    );

    const vncByTense = {
        present: buildFiniteVnc(ctx, "present"),
        preterit: buildFiniteVnc(ctx, "preterit"),
        future: buildFiniteVnc(ctx, "future"),
    };
    const contextualCases = [
        ["present", "past", "same", "historical-past"],
        ["present", "past", "prior", "pluperfect"],
        ["present", "past", "subsequent", "future-in-past"],
        ["present", "past", "concomitant", "past-progressive"],
        ["preterit", "present", "prior", "priority-to-present"],
        ["preterit", "past", "prior", "priority-to-past"],
        ["preterit", "future", "prior", "priority-to-future"],
        ["future", "past", "subsequent", "posteriority-to-past"],
    ];
    const contextualResults = contextualCases.map(
        ([tense, referenceTime, eventRelation]) =>
            ctx.interpretClassicalNahuatlVncContextualTime(
                vncByTense[tense],
                {
                    referenceTime,
                    eventRelation,
                    relationScope: "concatenation",
                }
            )
    );
    s.eq(
        "57.1 contextual time consumes owner-issued finite VNC Results and preserves their independent exact projections",
        contextualResults.map((frame, index) => ({
            status: frame.authorizationStatus,
            reading: frame.timeReading,
            formula: frame.formulaRealization,
            written: frame.surfaceRealization,
            sameFormula:
                frame.formulaRealization
                === vncByTense[contextualCases[index][0]]
                    .resultFrame.formulaRealization,
            sameWritten:
                frame.surfaceRealization
                === vncByTense[contextualCases[index][0]]
                    .resultFrame.surfaceRealization,
            issued: ctx.isClassicalNahuatlVncContextualTimeFrame(frame),
            changesMorphology: frame.changesFiniteMorphology,
        })),
        contextualCases.map(([, , , reading], index) => ({
            status: "authorized",
            reading,
            formula:
                vncByTense[contextualCases[index][0]]
                    .resultFrame.formulaRealization,
            written:
                vncByTense[contextualCases[index][0]]
                    .resultFrame.surfaceRealization,
            sameFormula: true,
            sameWritten: true,
            issued: true,
            changesMorphology: false,
        }))
    );

    const ye = ctx.requestClassicalParticleResult("l3-ye");
    const imminentContexts = ["present", "future"].map(referenceTime =>
        ctx.interpretClassicalNahuatlVncContextualTime(
            vncByTense.future,
            {
                referenceTime,
                eventRelation: "immediately-prior",
                relationScope: "neighboring-vnc",
                yeParticleResult: ye,
            }
        )
    );
    const hostileTime = ctx.interpretClassicalNahuatlVncContextualTime(
        vncByTense.present,
        {
            referenceTime: "past",
            eventRelation: "same",
            relationScope: "discourse",
            timeReading: "attacker-supplied",
        }
    );
    const copiedVnc = JSON.parse(JSON.stringify(vncByTense.present));
    const copiedTime = ctx.interpretClassicalNahuatlVncContextualTime(
        copiedVnc,
        {
            referenceTime: "past",
            eventRelation: "same",
            relationScope: "discourse",
        }
    );
    const missingYe = ctx.interpretClassicalNahuatlVncContextualTime(
        vncByTense.future,
        {
            referenceTime: "present",
            eventRelation: "immediately-prior",
            relationScope: "neighboring-vnc",
        }
    );
    const contextualBatch =
        ctx.interpretClassicalNahuatlVncContextualTimeBatch(
            contextualCases.map(([tense, referenceTime, eventRelation]) => ({
                finiteVncResult: vncByTense[tense],
                context: {
                    referenceTime,
                    eventRelation,
                    relationScope: "concatenation",
                },
            }))
        );
    s.eq(
        "57.1 imminence is ye-gated, hostile or copied authority fails closed, and batch evaluation is pointwise scalar",
        {
            imminent: imminentContexts.map(frame => [
                frame.authorizationStatus,
                frame.timeReading,
                frame.formulaRealization,
                frame.surfaceRealization,
            ]),
            hostile: [
                hostileTime.authorizationStatus,
                hostileTime.blockReason,
            ],
            copied: [
                copiedTime.authorizationStatus,
                copiedTime.blockReason,
            ],
            missingYe: [
                missingYe.authorizationStatus,
                missingYe.blockReason,
            ],
            batch: {
                status: contextualBatch.authorizationStatus,
                validator:
                    ctx.isClassicalNahuatlVncContextualTimeBatch(
                        contextualBatch
                    ),
                pointwise: contextualBatch.results.map(
                    (frame, index) =>
                        frame.formulaRealization
                            === contextualResults[index].formulaRealization
                        && frame.surfaceRealization
                            === contextualResults[index].surfaceRealization
                        && frame.timeReading
                            === contextualResults[index].timeReading
                ),
            },
        },
        {
            imminent: imminentContexts.map(() => [
                "authorized",
                "imminent",
                vncByTense.future.resultFrame.formulaRealization,
                vncByTense.future.resultFrame.surfaceRealization,
            ]),
            hostile: [
                "blocked",
                "contextual-time-accepts-context-facts-only",
            ],
            copied: [
                "blocked",
                "owner-issued-finite-vnc-result-required",
            ],
            missingYe: [
                "blocked",
                "future-imminence-requires-owner-issued-ye-particle",
            ],
            batch: {
                status: "authorized",
                validator: true,
                pointwise: contextualCases.map(() => true),
            },
        }
    );

    const valenceRequests = [
        {
            sourceStem: "itt-a",
            observedValence: "intransitive",
        },
        {
            sourceStem: "cuā",
            observedValence: "intransitive",
        },
        {
            sourceStem: "",
            observedValence: "transitive",
            incorporatedObjectStem: "ā-man-tē-Ø-ca-yō",
            matrixStem: "tlāliā",
        },
    ];
    const valence = valenceRequests.map(request =>
        ctx.buildClassicalNahuatlValenceSourceAnalysis(request)
    );
    const unknownValence =
        ctx.buildClassicalNahuatlValenceSourceAnalysis({
            sourceStem: "attacker",
            observedValence: "intransitive",
        });
    const hostileValence =
        ctx.buildClassicalNahuatlValenceSourceAnalysis({
            ...valenceRequests[0],
            translation: "authorize it",
        });
    s.eq(
        "57.2 valence is a closed lexical/source-structure fact and unknown or hostile authority is rejected",
        {
            authorized: valence.map(frame => ({
                status: frame.authorizationStatus,
                class: frame.classification,
                structure: frame.sourceStructure,
                issued:
                    ctx.isClassicalNahuatlValenceSourceAnalysisFrame(frame),
            })),
            copiedIssued:
                ctx.isClassicalNahuatlValenceSourceAnalysisFrame(
                    JSON.parse(JSON.stringify(valence[0]))
                ),
            unknown: [
                unknownValence.authorizationStatus,
                unknownValence.blockReason,
            ],
            hostile: [
                hostileValence.authorizationStatus,
                hostileValence.blockReason,
            ],
        },
        {
            authorized: [
                {
                    status: "authorized",
                    class: "true-irregular-valence",
                    structure: "simple-verbstem",
                    issued: true,
                },
                {
                    status: "authorized",
                    class: "true-irregular-valence",
                    structure: "simple-verbstem",
                    issued: true,
                },
                {
                    status: "authorized",
                    class:
                        "incorporated-compound-nounstem-object-not-irregular",
                    structure:
                        "incorporated-object-plus-transitive-matrix",
                    issued: true,
                },
            ],
            copiedIssued: false,
            unknown: [
                "blocked",
                "valence-source-analysis-not-lexically-authorized",
            ],
            hostile: [
                "blocked",
                "valence-source-analysis-accepts-source-constituents-only",
            ],
        }
    );

    const nounstemLResults = NOUNSTEM_L_EXPECTATIONS.map(
        ([stem]) => buildOrdinaryNnc(ctx, stem)
    );
    s.eq(
        "57.7 all closed nounstem-l Sources use the ordinary NNC owner with exact independent formula and written projections",
        nounstemLResults.map(({ source, result }) => ({
            stem: source.stem,
            sourceStatus: source.authorizationStatus,
            resultStatus: result.authorizationStatus,
            formula: result.formulaRealization,
            written: result.surfaceRealization,
            formation: source.lexicalFormation,
            nonactive: source.boundaryFacts.inferredNonactiveSource,
            continuation: source.boundaryFacts.locativeContinuation,
            independent: result.formulaAndWrittenDerivedIndependently,
        })),
        NOUNSTEM_L_EXPECTATIONS.map(
            ([stem, formula, written]) => ({
                stem,
                sourceStatus: "authorized",
                resultStatus: "authorized",
                formula,
                written,
                formation: "lexical-nounstem-l",
                nonactive: false,
                continuation: stem === "xi-l" ? "xi-l-lan" : "",
                independent: true,
            })
        )
    );

    const nounstemParadigmProof = NOUNSTEM_L_EXPECTATIONS.map(([stem]) => {
        const source =
            ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({ stem });
        const plan = ctx.prepareClassicalOrdinaryNncParadigmPlan(
            source,
            {
                states: ["absolutive", "possessive"],
                subjects: [
                    "1sg", "2sg", "3sg", "3common",
                    "1pl", "2pl", "3pl",
                ],
                possessors: [
                    "1sg", "2sg", "3sg", "1pl", "2pl", "3pl",
                ],
                sentenceType: "statement",
                polarity: "positive",
            }
        );
        const projected =
            ctx.projectClassicalOrdinaryNncParadigmCoordinates(plan);
        const scalar = plan.coordinates.map(coordinate =>
            ctx.requestClassicalOrdinaryNncResult(
                source,
                coordinate.operationFrame
            )
        );
        return {
            stem,
            status: plan.authorizationStatus,
            count: projected.length,
            pointwise: projected.every(
                (coordinate, index) =>
                    coordinate.formulaRealization
                        === scalar[index].formulaRealization
                    && coordinate.surfaceRealization
                        === scalar[index].surfaceRealization
                    && coordinate.scalarEvaluatorIdentity
                        === "evaluateClassicalNahuatlOrdinaryNnc"
            ),
        };
    });
    s.eq(
        "57.7 each affected Source is pointwise scalar-equivalent across its ordinary-NNC state and participant paradigm",
        nounstemParadigmProof,
        NOUNSTEM_L_EXPECTATIONS.map(([stem]) => ({
            stem,
            status: "authorized",
            count: 52,
            pointwise: true,
        }))
    );

    const instrumentalSources =
        ctx.getClassicalNahuatlCanonicalSourceStemInventory("nnc")
            .filter(record => record.sourceSection === "58.1");
    const instrumentalNncs = instrumentalSources.map(({ stem }) =>
        buildOrdinaryNnc(ctx, stem)
    );
    const instrumentalAuthorizations = instrumentalSources
        .map(({ stem }) => ({
            stem,
            frame:
                ctx.buildClassicalNahuatlInstrumentalAzSourceAuthorization(
                    stem
                ),
        }))
        .filter(({ frame }) => frame.authorizationStatus === "authorized");
    s.eq(
        "58.1 every listed nounstem is an ordinary NNC Source and the restricted āz compounds carry read-only lexical connector facts",
        {
            sourceCount: instrumentalSources.length,
            allOrdinaryNnc: instrumentalNncs.every(
                ({ source, result }) =>
                    source.authorizationStatus === "authorized"
                    && result.authorizationStatus === "authorized"
                    && result.formulaAndWrittenDerivedIndependently === true
            ),
            restrictedCount: instrumentalAuthorizations.length,
            connectorClasses: Array.from(new Set(
                instrumentalAuthorizations.map(
                    ({ frame }) => frame.connectorClass
                )
            )).sort(),
            userSelectableConnector:
                instrumentalAuthorizations.some(
                    ({ frame }) => frame.connectorIsUserChoice !== false
                ),
            unknown:
                ctx.buildClassicalNahuatlInstrumentalAzSourceAuthorization(
                    "attacker-āz"
                ).authorizationStatus,
            associatedNotProductive:
                ["āz-ca", "ah-āz"].map(stem =>
                    ctx.buildClassicalNahuatlInstrumentalAzSourceAuthorization(
                        stem
                    ).authorizationStatus
                ),
        },
        {
            sourceCount: 34,
            allOrdinaryNnc: true,
            restrictedCount: 32,
            connectorClasses: [
                "hu-after-a",
                "hu-after-l",
                "hu-after-n",
                "none",
            ],
            userSelectableConnector: false,
            unknown: "blocked",
            associatedNotProductive: ["blocked", "blocked"],
        }
    );

    const continuationResults = [];
    instrumentalAuthorizations.forEach(({ stem, frame }) => {
        frame.licensedContinuations.forEach(continuation => {
            const operationId = continuation === "huiā"
                ? "applicative-huia-use"
                : "intransitive-o-a-use";
            const objectPeople = continuation === "huiā" ? ["3sg"] : [];
            const request = denominalBase({
                nounStem: stem,
                operationId,
                objectPeople,
            });
            const scalar =
                ctx.requestClassicalDenominalVncResult(request);
            const plan =
                ctx.prepareClassicalDenominalVncParadigmPlan({
                    ...request,
                    outputScope: "paradigm",
                });
            const coordinates = [
                { subject: "1sg", mood: "indicative", tense: "present" },
                { subject: "3sg", mood: "indicative", tense: "preterit" },
                { subject: "2pl", mood: "indicative", tense: "future" },
            ];
            const projected =
                ctx.projectClassicalDenominalVncParadigmCoordinates(
                    plan,
                    coordinates
                );
            const pointwise = coordinates.map(coordinate =>
                ctx.requestClassicalDenominalVncResult({
                    ...request,
                    ...coordinate,
                    outputScope: "single",
                })
            );
            continuationResults.push({
                stem,
                continuation,
                scalarStatus: scalar.authorizationStatus,
                formula: scalar.formulaRealization,
                written: scalar.surfaceRealization,
                paradigmStatus: plan.authorizationStatus,
                pointwise: projected.every(
                    (coordinate, index) =>
                        coordinate.formulaRealization
                            === pointwise[index].formulaRealization
                        && coordinate.surfaceRealization
                            === pointwise[index].surfaceRealization
                ),
            });
        });
    });
    s.eq(
        "58.1 every licensed āz continuation reaches the shared denominal scalar and pointwise-equivalent paradigm owner",
        {
            count: continuationResults.length,
            failures: continuationResults.filter(
                row =>
                    row.scalarStatus !== "authorized"
                    || row.paradigmStatus !== "authorized"
                    || !row.pointwise
                    || !row.formula
                    || !row.written
            ),
        },
        {
            count: 33,
            failures: [],
        }
    );

    const combReflexive =
        ctx.requestClassicalDenominalVncResult(denominalBase({
            nounStem: "tzicua-hu-āz",
            operationId: "applicative-huia-use",
            objectPeople: ["reflexive"],
        }));
    const tube = ctx.requestClassicalDenominalVncResult(denominalBase({
        nounStem: "pi-āz",
        operationId: "applicative-huia-use",
    }));
    const drum = ctx.requestClassicalDenominalVncResult(denominalBase({
        nounStem: "tepon-āz",
        operationId: "intransitive-o-a-use",
        objectPeople: [],
    }));
    const quasiPipe =
        ctx.requestClassicalDenominalVncResult(denominalBase({
            nounStem: "tla-pi-āz",
            operationId: "intransitive-o-a-use",
            objectPeople: [],
        }));
    s.eq(
        "58.1 selected continuation witnesses have exact canonical GCD written and LCM formula outputs",
        [tube, combReflexive, drum, quasiPipe].map(result => [
            result.authorizationStatus,
            result.formulaRealization,
            result.surfaceRealization,
        ]),
        [
            ["authorized", "#ni-0+c-0(pi-āz-huia)0+0-0#", "nicpiāzhuia"],
            ["authorized", "#ni-0+n-o(tzicua-hu-āz-huia)0+0-0#", "ninotzicuahuāzhuia"],
            ["authorized", "#ni-0(tepon-āz-o-a)0+0-0#", "niteponāzoa"],
            ["authorized", "#ni-0(tla-pi-āz-o-a)0+0-0#", "nitlapiāzoa"],
        ]
    );

    const exceptionFrames = CLOSED_EXCEPTION_REQUESTS.map(
        ([constructionFamily, source]) =>
            ctx.validateClassicalNahuatlClosedConstructionException({
                constructionFamily,
                source,
            })
    );
    const copiedException =
        JSON.parse(JSON.stringify(exceptionFrames[0]));
    const hostileException =
        ctx.validateClassicalNahuatlClosedConstructionException({
            constructionFamily: CLOSED_EXCEPTION_REQUESTS[0][0],
            source: CLOSED_EXCEPTION_REQUESTS[0][1],
            surface: "attacker",
        });
    const unknownException =
        ctx.validateClassicalNahuatlClosedConstructionException({
            constructionFamily: "ehua-retains-source-num1",
            source: {
                embedStem: "attacker",
                retainedSourceNum1: "tl",
                matrixStem: "ē-hu-a",
            },
        });
    s.eq(
        "58.2 every closed exceptional source structure is recognized by its construction owner without stored formula or surface authority",
        {
            count: exceptionFrames.length,
            allIssued: exceptionFrames.every(frame =>
                ctx.isClassicalNahuatlClosedConstructionExceptionValidation(
                    frame
                )
            ),
            allSourceOnly: exceptionFrames.every(frame =>
                frame.formulaStringAuthority === false
                && frame.surfaceStringAuthority === false
                && frame.callerSuppliedAuthorityAccepted === false
            ),
            copiedIssued:
                ctx.isClassicalNahuatlClosedConstructionExceptionValidation(
                    copiedException
                ),
            hostile: [
                hostileException.authorizationStatus,
                hostileException.blockReason,
            ],
            unknown: [
                unknownException.authorizationStatus,
                unknownException.blockReason,
            ],
        },
        {
            count: 15,
            allIssued: true,
            allSourceOnly: true,
            copiedIssued: false,
            hostile: [
                "blocked",
                "closed-construction-validation-accepts-source-constituents-only",
            ],
            unknown: [
                "blocked",
                "closed-construction-source-not-lexically-authorized",
            ],
        }
    );

    const activeIncorporated = buildIncorporatedVnc(ctx, "active");
    const passiveIncorporated = buildIncorporatedVnc(ctx, "passive");
    const activeRole =
        ctx.validateClassicalNahuatlIncorporatedNounRole(
            activeIncorporated,
            { claimedRole: "adverbial" }
        );
    const passiveRole =
        ctx.validateClassicalNahuatlIncorporatedNounRole(
            passiveIncorporated,
            { claimedRole: "means-instrument" }
        );
    const hostileRoles = [
        ctx.validateClassicalNahuatlIncorporatedNounRole(
            activeIncorporated,
            { claimedRole: "subject" }
        ),
        ctx.validateClassicalNahuatlIncorporatedNounRole(
            activeIncorporated,
            { claimedRole: "agent" }
        ),
        ctx.validateClassicalNahuatlIncorporatedNounRole(
            passiveIncorporated,
            { claimedRole: "means-instrument", agentMentioned: true }
        ),
        ctx.validateClassicalNahuatlIncorporatedNounRole(
            JSON.parse(JSON.stringify(activeIncorporated)),
            { claimedRole: "adverbial" }
        ),
    ];
    s.eq(
        "58.7 validates roles only from owner-issued incorporated VNC Results and preserves personal-pronoun subject and passive-agent barriers",
        {
            sourceResults: [
                [
                    activeIncorporated.authorizationStatus,
                    activeIncorporated.formulaRealization,
                    activeIncorporated.wordSurface,
                ],
                [
                    passiveIncorporated.authorizationStatus,
                    passiveIncorporated.formulaRealization,
                    passiveIncorporated.wordSurface,
                ],
            ],
            roles: [activeRole, passiveRole].map(frame => ({
                status: frame.authorizationStatus,
                voice: frame.selectedVoice,
                role: frame.derivedRole,
                subject: frame.incorporatedNounIsSubject,
                agent: frame.incorporatedNounIsAgent,
                personalSubject:
                    frame.personalPronounSubjectPositionsPreserved,
                issued:
                    ctx.isClassicalNahuatlIncorporatedNounRoleValidation(
                        frame
                    ),
            })),
            hostile: hostileRoles.map(frame => [
                frame.authorizationStatus,
                frame.blockReason,
            ]),
        },
        {
            sourceResults: [
                [
                    "authorized",
                    "#0-0(quimich-patl-ā-ni)0+0-0#",
                    "quimichpatlāni",
                ],
                [
                    "authorized",
                    "#0-0(cōā-cua-lo)0+0-0#",
                    "cōācualo",
                ],
            ],
            roles: [
                {
                    status: "authorized",
                    voice: "active",
                    role: "adverbial",
                    subject: false,
                    agent: false,
                    personalSubject: true,
                    issued: true,
                },
                {
                    status: "authorized",
                    voice: "passive",
                    role: "means-instrument",
                    subject: false,
                    agent: false,
                    personalSubject: true,
                    issued: true,
                },
            ],
            hostile: [
                [
                    "blocked",
                    "incorporated-noun-cannot-be-subject-or-agent",
                ],
                [
                    "blocked",
                    "incorporated-noun-cannot-be-subject-or-agent",
                ],
                ["blocked", "passive-agent-mention-forbidden"],
                [
                    "blocked",
                    "owner-issued-incorporated-vnc-result-required",
                ],
            ],
        }
    );

    const runtimeAudit =
        auditClassicalNahuatlLessons5758Runtime(ctx);
    s.eq(
        "the two-direction owner audit executes every claim and confirms 58.8 remains test-only documentary evidence",
        {
            complete: runtimeAudit.complete,
            claims: runtimeAudit.claimCount,
            executed: runtimeAudit.authorizedExecutionCount,
            documentary: runtimeAudit.diagnosticExecutionCount,
            failures: runtimeAudit.failures,
        },
        {
            complete: true,
            claims: 54,
            executed: 51,
            documentary: 3,
            failures: [],
        }
    );

    return s;
}

module.exports = { run };
