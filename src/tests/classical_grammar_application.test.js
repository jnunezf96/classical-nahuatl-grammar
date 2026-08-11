"use strict";

const path = require("path");
const { spawnSync } = require("child_process");
const { createSuite } = require("./runner");
const {
    getCanonicalVncTestGrammarFrame,
} = require("./helpers/canonical_grammar_result");

function run(ctx) {
    const s = createSuite("classical_grammar_application");

    s.eq(
        "canonical Classical application projections are installed once",
        [
            typeof ctx.requestClassicalVncSentenceResultFrame,
            typeof ctx.requestClassicalNncDiagrammaticFrame,
            typeof ctx.requestClassicalVncDiagrammaticFrame,
            typeof ctx.requestClassicalOrdinaryNncResult,
            typeof ctx.prepareClassicalOrdinaryNncParadigmPlan,
            typeof ctx.projectClassicalOrdinaryNncParadigmCoordinates,
            typeof ctx.requestClassicalPronominalNncResult,
            typeof ctx.prepareClassicalPronominalNncParadigmPlan,
            typeof ctx.projectClassicalPronominalNncParadigmCoordinates,
            typeof ctx.requestClassicalSentenceAdverbialFrame,
            typeof ctx.requestClassicalSentenceParticleFrame,
            typeof ctx.requestClassicalParticleResult,
            typeof ctx.requestClassicalOrderedVoiceVncApplicationFrame,
        ],
        Array(13).fill("function")
    );
    s.eq(
        "one application boundary covers the late semantic families without a supplementation-only facade",
        [
            typeof ctx.requestClassicalNominalConstructionResult,
            typeof ctx.requestClassicalDeverbalNncResult,
            typeof ctx.requestClassicalAdjectivalModificationResult,
            typeof ctx.requestClassicalAdverbialNncResult,
            typeof ctx.requestClassicalRelationalNncResult,
            typeof ctx.requestClassicalPlaceGentilicResult,
            typeof ctx.requestClassicalAdverbialAdjunctionResult,
            typeof ctx.requestClassicalClauseCompositionResult,
            typeof ctx.requestClassicalComparisonResult,
            typeof ctx.requestClassicalDenominalVncResult,
            typeof ctx.requestClassicalPersonalNameNncResult,
        ],
        Array(11).fill("function")
    );
    s.eq(
        "supplementation uses the canonical generic application request only",
        typeof ctx.requestClassicalSupplementationResult,
        "undefined"
    );
    s.eq(
        "one semantic boundary exposes scalar and specialized outputs without advertising an unimplemented axis constraint",
        [
            typeof ctx.prepareClassicalNominalConstructionParadigmPlan,
            typeof ctx.projectClassicalNominalConstructionParadigmCoordinates,
            typeof ctx.prepareClassicalPlaceGentilicParadigmPlan,
            typeof ctx.projectClassicalPlaceGentilicParadigmCoordinates,
            typeof ctx.prepareClassicalDenominalVncParadigmPlan,
            typeof ctx.projectClassicalDenominalVncParadigmCoordinates,
            typeof ctx.prepareClassicalVncApplicationParadigmPlan,
            typeof ctx.projectClassicalVncApplicationParadigmCoordinates,
            typeof ctx.prepareClassicalPersonalNameNncParadigmPlan,
            typeof ctx.projectClassicalPersonalNameNncParadigmCoordinates,
            typeof ctx.prepareClassicalAdverbialNncParadigmPlan,
            typeof ctx.projectClassicalAdverbialNncParadigmCoordinates,
            typeof ctx.prepareClassicalRelationalNncParadigmPlan,
            typeof ctx.projectClassicalRelationalNncParadigmCoordinates,
        ],
        Array(14).fill("function")
    );
    s.eq(
        "application globals omit wrappers that have no production consumer",
        [
            "requestClassicalTranscriptionFrame",
            "requestClassicalVncNuclearFrame",
            "requestClassicalVncFiniteFrame",
            "requestClassicalVncFiniteSurfaceFrame",
            "requestClassicalNncSentenceSurfaceFrame",
            "requestClassicalOrderedVoiceChain",
            "requestClassicalTransitiveVncFrame",
            "requestClassicalVerbstemClassFrame",
            "prepareClassicalAdverbialNuclearBatchPlan",
            "projectClassicalAdverbialNuclearBatchCoordinates",
            "requestClassicalPersonalNameSentenceOperationResult",
            "requestClassicalTextualAnalysisResult",
            "requestClassicalTextualAnalysisSource",
        ].map(name => typeof ctx[name]),
        Array(13).fill("undefined")
    );

    const calls = [];
    const issuedFakeResults = new WeakSet();
    const fakeTarget = Object.create(ctx);
    const installFakeCapability = (property, kind, extras = {}) => {
        Object.defineProperty(fakeTarget, property, {
            configurable: true,
            enumerable: true,
            value(...args) {
                calls.push([property, args]);
                const result = Object.freeze({
                    kind,
                    authorizationStatus: "authorized",
                    property,
                    args,
                    ...extras,
                });
                issuedFakeResults.add(result);
                return result;
            },
        });
    };
    installFakeCapability(
        "buildClassicalNahuatlVncFiniteSurfaceFrame",
        "classical-nahuatl-vnc-finite-surface-frame"
    );
    installFakeCapability(
        "buildClassicalNahuatlVncSentenceResultFrame",
        "classical-nahuatl-vnc-sentence-result-frame"
    );
    installFakeCapability(
        "buildClassicalNahuatlNncDiagrammaticFrame",
        "classical-nahuatl-nnc-diagrammatic-frame",
        {
            sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
            rows: [],
            projectionAuthority: "typed-slot-projection",
            formulaStringAuthority: false,
        }
    );
    installFakeCapability(
        "buildClassicalNahuatlSentenceParticleLayerFrame",
        "classical-nahuatl-sentence-particle-layer-frame"
    );
    Object.defineProperties(fakeTarget, {
        isClassicalNahuatlVncFiniteSurfaceFrame: {
            value: result => issuedFakeResults.has(result)
                && result.kind === "classical-nahuatl-vnc-finite-surface-frame",
        },
        isClassicalNahuatlVncSentenceResultFrame: {
            value: result => issuedFakeResults.has(result)
                && result.kind === "classical-nahuatl-vnc-sentence-result-frame",
        },
        isClassicalNahuatlIssuedParticleSentenceLayerFrame: {
            value: result => issuedFakeResults.has(result)
                && result.kind
                    === "classical-nahuatl-sentence-particle-layer-frame",
        },
    });
    const api = ctx.createClassicalGrammarApplicationApi(fakeTarget);
    const issuedSlot = Object.freeze({ kind: "issued-slot" });
    const fakeReceipts = [
        ["vnc:finite-surface", [issuedSlot]],
        ["vnc:sentence-result", [issuedSlot]],
        ["nnc:diagram", [issuedSlot]],
        ["sentence:particle-adjunction", [{
            nuclearResult: issuedSlot,
            particleId: "auh",
        }]],
    ].map(([operationId, args]) =>
        api.executeClassicalGrammarApplicationRequest({
            operationId,
            args,
        }));
    s.eq(
        "a directly created API cannot delegate to arbitrary target capabilities",
        {
            receipts: fakeReceipts.map((receipt) => [
                receipt.authorizationStatus,
                receipt.blockReason,
                receipt.canonicalResult,
                receipt.greatestCommonDivisor.invariantProofs[
                    "canonical-runtime-installation"
                ],
                receipt.greatestCommonDivisor.invariantProofs[
                    "canonical-capability-identity"
                ],
            ]),
            calls,
        },
        {
            receipts: Array(4).fill([
                "blocked",
                "classical-grammar-application-canonical-runtime-required",
                null,
                false,
                false,
            ]),
            calls: [],
        }
    );

    const missingTargetApi = ctx.createClassicalGrammarApplicationApi({});
    let failure = "";
    try {
        missingTargetApi.requestClassicalVncDiagrammaticFrame(issuedSlot);
    } catch (error) {
        failure = String(error?.message || error);
    }
    s.eq(
        "required grammar capabilities fail closed instead of producing renderer fallbacks",
        failure,
        "classical-grammar-application-required-capability-missing:buildClassicalNahuatlVncDiagrammaticFrame"
    );
    const issuedGrammarFrame =
        getCanonicalVncTestGrammarFrame(ctx);
    const copiedGrammarFrame = { ...issuedGrammarFrame };
    const issuedGrammarFrameResult =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:finite-surface",
            args: [issuedGrammarFrame],
        });
    let copiedGrammarFrameFailure = "";
    try {
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:finite-surface",
            args: [copiedGrammarFrame],
        });
    } catch (error) {
        copiedGrammarFrameFailure = String(error?.message || error);
    }
    s.eq(
        "only an exact engine-issued grammar carrier may cross the recursive string-authority firewall",
        {
            issued: ctx.isIssuedGrammarFrame(issuedGrammarFrame),
            copied: ctx.isIssuedGrammarFrame(copiedGrammarFrame),
            issuedResult: [
                issuedGrammarFrameResult.authorizationStatus,
                issuedGrammarFrameResult.blockReason,
            ],
            copiedFailure: copiedGrammarFrameFailure,
        },
        {
            issued: true,
            copied: false,
            issuedResult: [
                "blocked",
                "classical-vnc-canonical-machinery-required",
            ],
            copiedFailure:
                "classical-grammar-application-request-invalid:forbidden-authority:sourceEvidence",
        }
    );

    const inventory = ctx.getClassicalGrammarApplicationInventory();
    const retiredNncSliceOperationIds = [
        "nnc:quantitive-source-analysis",
        "nnc:stem-operation",
        "nnc:possessor-reduplication",
        "nnc:source-authority",
        "nnc:nounstem-lexical-selection",
        "nnc:class-governed",
        "nnc:higher-ordinary",
        "nnc:quantitive-authority",
        "nnc:pronominal-context",
    ];
    s.eq(
        "Lesson 12-16 facts contribute to the two shared NNC operations without surviving as application routes",
        {
            operationIdsAbsent: retiredNncSliceOperationIds.every(
                operationId => !inventory.operationIds.includes(operationId)
            ),
            requestAdaptersAbsent: [
                "requestClassicalQuantitiveSourceAnalysis",
                "requestClassicalNncStemOperation",
                "requestClassicalPossessorReduplication",
                "requestClassicalNncSourceAuthority",
                "requestClassicalNounstemLexicalSelection",
                "requestClassicalClassGovernedNnc",
                "requestClassicalHigherOrdinaryNnc",
                "requestClassicalQuantitiveAuthority",
                "requestClassicalPronominalContext",
            ].every(name => typeof ctx[name] === "undefined"),
            ordinaryOwnsPossessorReduplication:
                inventory.operations.find(operation =>
                    operation.operationId === "nnc:ordinary")
                    ?.axisIds.includes("possessor-reduplication"),
            pronominalOwnsQuantitiveStructure:
                inventory.operations.find(operation =>
                    operation.operationId === "nnc:pronominal")
                    ?.axisIds.includes("quantitive-matrix"),
        },
        {
            operationIdsAbsent: true,
            requestAdaptersAbsent: true,
            ordinaryOwnsPossessorReduplication: true,
            pronominalOwnsQuantitiveStructure: true,
        }
    );
    const transcriptionSource =
        ctx.buildClassicalNahuatlTranscriptionSourceFrame({
            constituents: [{
                segments: ["/k/", "a", "/l/"],
            }],
        });
    const applicationReceipt = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "orthography:transcription",
        args: [transcriptionSource],
    });
    s.eq(
        "one semantic application contract exposes the shared GCD and complete LCM",
        {
            operationCount: inventory.operationIds.length,
            allCapabilitiesInstalled: inventory.allCapabilitiesInstalled,
            gcd: inventory.greatestCommonDivisor,
            lcmAxisCount: inventory.leastCommonMultiple.axisCount,
            lcmAllAxesOwned: inventory.leastCommonMultiple.allAxesOwned,
            lcmOwnerCount: inventory.leastCommonMultiple.axisOwners.length,
            receiptKind: applicationReceipt.kind,
            receiptOperation: applicationReceipt.operationId,
            receiptOutputKind: applicationReceipt.outputKind,
            receiptCapability: applicationReceipt.capabilityName,
            outputKinds: inventory.outputKinds,
            nominalOutputKinds: inventory.operations.find(
                operation =>
                    operation.operationId === "grammar:nominal-construction"
            )?.outputKinds,
            placeOutputKinds: inventory.operations.find(
                operation => operation.operationId === "nnc:place-gentilic"
            )?.outputKinds,
            denominalOutputKinds: inventory.operations.find(
                operation => operation.operationId === "vnc:denominal"
            )?.outputKinds,
            vncApplicationOutputKinds: inventory.operations.find(
                operation => operation.operationId === "vnc:application"
            )?.outputKinds,
            personalNameOutputKinds: inventory.operations.find(
                operation => operation.operationId === "nnc:personal-name"
            )?.outputKinds,
            adverbialOutputKinds: inventory.operations.find(
                operation => operation.operationId === "nnc:adverbial"
            )?.outputKinds,
            voiceChainOutputKinds: inventory.operations.find(
                operation =>
                    operation.operationId === "vnc:ordered-voice-chain"
            )?.outputKinds,
            axisConstraintOutputOwnerCount: inventory.operations.filter(
                operation => operation.outputKinds.includes("axis-constraint")
            ).length,
            axisConstraintOutputOwners: inventory.operations
                .filter(operation =>
                    operation.outputKinds.includes("axis-constraint"))
                .map(operation => operation.operationId),
            gcdSatisfied: applicationReceipt.greatestCommonDivisor.satisfied,
            gcdProofs: applicationReceipt.greatestCommonDivisor.invariantProofs,
            selectedAxes: applicationReceipt.leastCommonMultiple.selectedAxisIds,
            curriculumOrderAuthority: applicationReceipt.curriculumOrderAuthority,
            formulaStringAuthority: applicationReceipt.formulaStringAuthority,
            surfaceStringAuthority: applicationReceipt.surfaceStringAuthority,
        },
        {
            operationCount: 90,
            allCapabilitiesInstalled: true,
            gcd: {
                identityId: "typed-semantic-application-to-canonical-result",
                invariantIds: [
                    "canonical-runtime-installation",
                    "typed-application-request",
                    "semantic-operation-identity",
                    "required-capability-resolution",
                    "canonical-capability-identity",
                    "canonical-engine-result",
                    "no-renderer-fallback",
                    "lesson-and-display-authority-forbidden",
                    "classical-visible-surface-firewall",
                ],
            },
            lcmAxisCount: inventory.leastCommonMultiple.axisCount,
            lcmAllAxesOwned: true,
            lcmOwnerCount: inventory.leastCommonMultiple.axisCount,
            receiptKind: "classical-grammar-application-result",
            receiptOperation: "orthography:transcription",
            receiptOutputKind: "scalar",
            receiptCapability: "buildClassicalNahuatlTranscriptionFrame",
            outputKinds: {
                scalar: "scalar",
                sourcePreparation: "source-preparation",
                preparedPlan: "prepared-plan",
                coordinateProjection: "coordinate-projection",
                sentenceOperation: "sentence-operation",
            },
            nominalOutputKinds: [
                "scalar",
                "prepared-plan",
                "coordinate-projection",
            ],
            placeOutputKinds: [
                "scalar",
                "prepared-plan",
                "coordinate-projection",
            ],
            denominalOutputKinds: [
                "scalar",
                "prepared-plan",
                "coordinate-projection",
            ],
            vncApplicationOutputKinds: [
                "scalar",
                "prepared-plan",
                "coordinate-projection",
            ],
            personalNameOutputKinds: [
                "scalar",
                "prepared-plan",
                "coordinate-projection",
                "sentence-operation",
            ],
            adverbialOutputKinds: [
                "scalar",
                "source-preparation",
                "prepared-plan",
                "coordinate-projection",
            ],
            voiceChainOutputKinds: ["scalar"],
            axisConstraintOutputOwnerCount: 0,
            axisConstraintOutputOwners: [],
            gcdSatisfied: true,
            gcdProofs: {
                "canonical-runtime-installation": true,
                "typed-application-request": true,
                "semantic-operation-identity": true,
                "required-capability-resolution": true,
                "canonical-capability-identity": true,
                "canonical-engine-result": true,
                "no-renderer-fallback": true,
                "lesson-and-display-authority-forbidden": true,
                "classical-visible-surface-firewall": true,
            },
            selectedAxes: [
                "transcription-source",
                "phonological-boundary",
                "orthographic-realization",
            ],
            curriculumOrderAuthority: false,
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
        }
    );
    s.ok("LCM is a real union rather than one route echo", inventory.leastCommonMultiple.axisCount > 40);
    s.ok(
        "every global LCM axis names its semantic owners and canonical prerequisites",
        inventory.leastCommonMultiple.axisOwners.every((axis) => (
            axis.ownerOperationIds.length > 0
            && axis.prerequisiteInvariantIds.includes("canonical-engine-result")
            && axis.licensedValueAuthority === "semantic-owner-canonical-result"
            && axis.callerSuppliedValueAuthority === false
        ))
    );
    s.ok(
        "application receipt keeps engine identity",
        ctx.isClassicalGrammarApplicationResult(applicationReceipt)
    );
    s.no(
        "a copied application receipt cannot become canonical authority",
        ctx.isClassicalGrammarApplicationResult(
            JSON.parse(JSON.stringify(applicationReceipt))
        )
    );

    const deverbalVocativeReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:deverbal-construction",
            args: [{
                constructionKind: "vocative",
                source: {
                    wordStem: "pix",
                    numberConnector: "c",
                },
            }],
        });
    s.eq(
        "the typed vocative boundary realizer crosses the shared application boundary without inventing a nominal result carrier",
        {
            authorizationStatus: deverbalVocativeReceipt.authorizationStatus,
            outputKind: deverbalVocativeReceipt.outputKind,
            resultKind: deverbalVocativeReceipt.canonicalResult?.kind,
            constructionKind:
                deverbalVocativeReceipt.canonicalResult?.constructionKind,
            targetEvaluator:
                deverbalVocativeReceipt.canonicalResult
                    ?.canonicalTargetEvaluator,
            nominalResult:
                deverbalVocativeReceipt.canonicalResult?.canonicalResult,
            wordSurface:
                deverbalVocativeReceipt.canonicalResult?.wordSurface,
            gcdSatisfied:
                deverbalVocativeReceipt.canonicalResult
                    ?.greatestCommonDivisor?.satisfied,
            lcmComplete:
                deverbalVocativeReceipt.canonicalResult
                    ?.leastCommonMultiple?.licensedAxisSetComplete,
        },
        {
            authorizationStatus: "authorized",
            outputKind: "scalar",
            resultKind: "classical-nahuatl-deverbal-nnc-grammar-frame",
            constructionKind: "vocative",
            targetEvaluator: "typed-vocative-boundary-realizer",
            nominalResult: null,
            wordSurface: "pixquē",
            gcdSatisfied: true,
            lcmComplete: true,
        }
    );

    const outputKindCases = [
        {
            operationId: "vnc:application",
            projectionCoordinates: [{
                subject: "3sg",
                mood: "indicative",
                tense: "present",
            }],
            request: {
                sourceStem: "nemi",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                requestedDerivation: "direct",
                requestedVoice: "active",
            },
        },
        {
            operationId: "grammar:nominal-construction",
            projectionCoordinates: [{
                subject: "3sg",
                state: "not-applicable",
            }],
            request: {
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
            },
        },
        {
            operationId: "nnc:place-gentilic",
            projectionCoordinates: [{
                coordinateId: "absolutive:3sg",
                subject: "3sg",
                state: "absolutive",
            }],
            request: {
                constructionKind: "place-name",
                formation: "co",
                source: { embedStem: "Tlach" },
                usage: "adverbial",
            },
        },
        {
            operationId: "vnc:denominal",
            projectionCoordinates: [{
                subject: "3sg",
                mood: "indicative",
                tense: "present",
            }],
            request: {
                nounStem: "tlīl",
                sourceKind: "nounstem",
                sourceState: "absolutive",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                objectPeople: ["3sg", "2sg"],
                outputScope: "single",
                operationId: "inceptive-ti",
            },
        },
    ];
    s.eq(
        "scalar, prepared, and projected forms retain one operation identity and pointwise canonical parity",
        outputKindCases.map(({
            operationId,
            projectionCoordinates,
            request,
        }) => {
            const scalarReceipt =
                ctx.executeClassicalGrammarApplicationRequest({
                    operationId,
                    outputKind: "scalar",
                    args: [request],
                });
            const planReceipt =
                ctx.executeClassicalGrammarApplicationRequest({
                    operationId,
                    outputKind: "prepared-plan",
                    args: [request],
                });
            const projectionReceipt =
                ctx.executeClassicalGrammarApplicationRequest({
                    operationId,
                    outputKind: "coordinate-projection",
                    args: [
                        planReceipt.canonicalResult,
                        projectionCoordinates,
                    ],
                });
            const firstCoordinate = projectionReceipt.canonicalResult?.[0];
            const scalarFormula =
                scalarReceipt.canonicalResult?.formulaRealization
                || scalarReceipt.canonicalResult
                    ?.resultFrame?.formulaRealization;
            const scalarSurface = scalarReceipt.canonicalResult?.wordSurface
                || scalarReceipt.canonicalResult?.surfaceRealization
                || scalarReceipt.canonicalResult
                    ?.resultFrame?.surfaceRealization;
            const coordinateSurface = firstCoordinate?.wordSurface
                || firstCoordinate?.surfaceRealization;
            const copiedPlanReceipt =
                ctx.executeClassicalGrammarApplicationRequest({
                    operationId,
                    outputKind: "coordinate-projection",
                    args: [Object.freeze({
                        kind: planReceipt.canonicalResult?.kind,
                        version: planReceipt.canonicalResult?.version,
                        authorizationStatus:
                            planReceipt.canonicalResult?.authorizationStatus,
                    })],
                });
            return {
                operationId,
                scalar: [
                    scalarReceipt.authorizationStatus,
                    scalarReceipt.outputKind,
                ],
                plan: [
                    planReceipt.authorizationStatus,
                    planReceipt.outputKind,
                ],
                projection: [
                    projectionReceipt.authorizationStatus,
                    projectionReceipt.outputKind,
                    projectionReceipt.canonicalResult?.length > 0,
                ],
                parity: [
                    firstCoordinate?.formulaRealization === scalarFormula,
                    coordinateSurface === scalarSurface,
                ],
                copiedPlan: [
                    copiedPlanReceipt.authorizationStatus,
                    copiedPlanReceipt.blockReason,
                    copiedPlanReceipt.canonicalResult,
                ],
            };
        }),
        outputKindCases.map(({ operationId }) => ({
            operationId,
            scalar: ["authorized", "scalar"],
            plan: ["authorized", "prepared-plan"],
            projection: ["authorized", "coordinate-projection", true],
            parity: [true, true],
            copiedPlan: [
                "blocked",
                "classical-grammar-application-request-invalid:issued-authorized-prepared-plan-required",
                null,
            ],
        }))
    );

    const personalNameClause = ctx.buildPersonalNameInnerClauseFrame({
        sourceFamily: "preterit-agentive",
        subjectPrefix: "Ø",
        subjectConnector: "Ø",
        predicateMorphs: ["temō", "Ø"],
        numberPrefix: "c",
        numberSuffix: "Ø",
    });
    const personalNameSource = ctx.buildPersonalNameNncSourceFrame({
        sourceFamily: "preterit-agentive",
        clauses: [personalNameClause],
    });
    const personalNameReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:personal-name",
            outputKind: "scalar",
            args: [{
                sourceFrame: personalNameSource,
                outerSubject: "3sg",
            }],
        });
    const copiedPersonalNameSource = { ...personalNameSource };
    const descriptorCopiedPersonalNameSource = Object.defineProperties(
        {},
        Object.getOwnPropertyDescriptors(personalNameSource)
    );
    const copiedPersonalNameSourceFailures = [
        copiedPersonalNameSource,
        descriptorCopiedPersonalNameSource,
    ].map((sourceFrame) => {
        try {
            const receipt = ctx.executeClassicalGrammarApplicationRequest({
                operationId: "nnc:personal-name",
                outputKind: "scalar",
                args: [{
                    sourceFrame,
                    outerSubject: "3sg",
                }],
            });
            return [
                receipt.authorizationStatus,
                receipt.canonicalResult?.authorizationStatus || "",
                receipt.canonicalResult == null,
            ];
        } catch (error) {
            return ["threw", String(error?.message || error), false];
        }
    });
    const sentenceOperationReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:personal-name",
            outputKind: "sentence-operation",
            args: [{
                personalNameResult: personalNameReceipt.canonicalResult,
                operation: "sentence-name-use",
            }],
        });
    let copiedPersonalNameFailure = "";
    try {
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:personal-name",
            outputKind: "sentence-operation",
            args: [{
                personalNameResult: {
                    ...personalNameReceipt.canonicalResult,
                },
                operation: "sentence-name-use",
            }],
        });
    } catch (error) {
        copiedPersonalNameFailure = error.message;
    }
    s.eq(
        "Lesson 56 sentence use is an output kind of the personal-name operation and requires its issued scalar source",
        {
            scalar: [
                personalNameReceipt.authorizationStatus,
                personalNameReceipt.outputKind,
            ],
            sentence: [
                sentenceOperationReceipt.authorizationStatus,
                sentenceOperationReceipt.outputKind,
                sentenceOperationReceipt.canonicalResult?.operation,
            ],
            copied: [
                copiedPersonalNameFailure,
            ],
            copiedSources: copiedPersonalNameSourceFailures,
        },
        {
            scalar: ["authorized", "scalar"],
            sentence: [
                "authorized",
                "sentence-operation",
                "sentence-name-use",
            ],
            copied: [
                "classical-grammar-application-request-invalid:forbidden-authority:formulaRealization",
            ],
            copiedSources: [
                ["blocked", "", true],
                ["blocked", "", true],
            ],
        }
    );
    let unsupportedOutputKindFailure = "";
    try {
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:denominal",
            outputKind: "lesson-local-paradigm",
            args: [{}],
        });
    } catch (error) {
        unsupportedOutputKindFailure = String(error?.message || error);
    }
    s.eq(
        "unregistered output kinds cannot create a second execution lane",
        unsupportedOutputKindFailure,
        "classical-grammar-application-request-invalid:output-kind-not-supported:lesson-local-paradigm"
    );

    s.eq(
        "the shared application route issues and captures the ordered Voice finite Result",
        (() => {
            const base = ctx.evaluateClassicalNahuatlVncApplication({
                sourceStem: "yohua",
                verbClass: "A",
                sourceValence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                requestedDerivation: "direct",
                requestedVoice: "impersonal",
                nonactiveOptionId: "inherent-impersonal",
            });
            const ordered =
                ctx.requestClassicalOrderedVoiceVncApplicationFrame(
                    base,
                    {
                        operations: [
                            "inherent-impersonal",
                            "tla-impersonal",
                            "nonactive-lō",
                        ],
                    }
                );
            const capture = ctx.captureClassicalGrammarApplicationResult(
                ordered,
                "ordered-voice-result"
            );
            const copiedCapture =
                ctx.captureClassicalGrammarApplicationResult(
                    { ...ordered },
                    "copied-ordered-voice-result"
                );
            return {
                status: ordered.authorizationStatus,
                formula: ordered.formulaRealization,
                surface: ordered.surfaceRealization,
                target: ordered.voiceLayerChainFrame?.targetStem,
                captureStatus: capture.authorizationStatus,
                captureOperation: capture.operationId,
                captureIdentity: capture.canonicalResult === ordered,
                copiedStatus: copiedCapture.authorizationStatus,
                copiedReason: copiedCapture.blockReason,
            };
        })(),
        {
            status: "authorized",
            formula: "#0-0(tla-yohua-lo)0+0-0#",
            surface: "tlayohualo",
            target: "tla-yohua-lō",
            captureStatus: "authorized",
            captureOperation: "vnc:ordered-voice-application",
            captureIdentity: true,
            copiedStatus: "blocked",
            copiedReason:
                "classical-grammar-application-issued-authorized-result-required",
        }
    );

    s.eq(
        "issued VNC sentence results preserve canonical sentence composition and reject string or curriculum authority",
        (() => {
            const application = ctx.evaluateClassicalNahuatlVncApplication({
                sourceStem: "nemi",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "3sg",
                requestedDerivation: "direct",
                requestedVoice: "active",
                mood: "indicative",
                tense: "present",
                outputScope: "single",
                sentenceOptions: {
                    sentenceType: "yes-no-question",
                    questionMode: "cuix",
                },
            });
            const sentenceResult = ctx.requestClassicalVncSentenceResultFrame(application);
            const auhSource =
                ctx.buildClassicalNahuatlParticleSourceFrame(
                    "l3-auh-conjunctor"
                );
            const particle = ctx.requestClassicalSentenceParticleFrame({
                particleSourceFrame: auhSource,
                nuclearResultFrame: sentenceResult,
            });
            let hostileParticleFailure = "";
            try {
                ctx.requestClassicalSentenceParticleFrame({
                    particleSourceFrame: auhSource,
                    nuclearResultFrame: sentenceResult,
                    nestedAuthority: {
                        formula: "HOSTILE_FORMULA",
                    },
                    lesson: "STORED_CURRICULUM_AUTHORITY",
                });
            } catch (error) {
                hostileParticleFailure = String(error?.message || error);
            }
            const copiedSentenceResult = { ...sentenceResult };
            let copiedParticleFailure = "";
            try {
                ctx.requestClassicalSentenceParticleFrame({
                    particleSourceFrame: auhSource,
                    nuclearResultFrame: copiedSentenceResult,
                });
            } catch (error) {
                copiedParticleFailure = String(error?.message || error);
            }
            const rawOnly = ctx.buildClassicalNahuatlVncSentenceResultFrame({
                nuclearFormula: "HOSTILE_FORMULA",
                nuclearSurface: "HOSTILE_SURFACE",
                sentenceFormula: "STORED_FORMULA",
                sentenceSurface: "STORED_SURFACE",
                lesson: "STORED_CURRICULUM_AUTHORITY",
            });
            return {
                sentenceStatus: sentenceResult.authorizationStatus,
                sentenceFormula: sentenceResult.sentenceFormulaDisplay,
                sentenceSurface: sentenceResult.sentenceSurfaceDisplay,
                sentenceFormulaAttachment:
                    sentenceResult.sentenceFormulaAttachment,
                sentenceCanonical: ctx.isClassicalNahuatlVncSentenceResultFrame(sentenceResult),
                copyCanonical: ctx.isClassicalNahuatlVncSentenceResultFrame(copiedSentenceResult),
                formulaAuthority: sentenceResult.formulaStringAuthority,
                surfaceAuthority: sentenceResult.surfaceStringAuthority,
                curriculumAuthority: sentenceResult.curriculumOrderAuthority,
                lessonAuthority: sentenceResult.lessonMetadataAuthority,
                callerAuthority: sentenceResult.callerSuppliedAuthorityAccepted,
                particleStatus: particle.authorizationStatus,
                particleFormula: particle.sentenceFormulaDisplay,
                particleSurface: particle.sentenceSurfaceDisplay,
                particleInputKind: particle.canonicalInputKind,
                hostileParticleFailure,
                copiedParticleFailure,
                rawStatus: rawOnly.authorizationStatus,
                rawReason: rawOnly.blockReason,
            };
        })(),
        {
            sentenceStatus: "authorized",
            sentenceFormula: "cuix #0-0(nemi)0+0-0#?",
            sentenceSurface: "Cuix nemi?",
            sentenceFormulaAttachment:
                "sentence-left-particles-space-separated",
            sentenceCanonical: true,
            copyCanonical: false,
            formulaAuthority: false,
            surfaceAuthority: false,
            curriculumAuthority: false,
            lessonAuthority: false,
            callerAuthority: false,
            particleStatus: "authorized",
            particleFormula: "auh cuix #0-0(nemi)0+0-0#?",
            particleSurface: "Auh cuix nemi?",
            particleInputKind: "classical-nahuatl-vnc-sentence-result-frame",
            hostileParticleFailure:
                "classical-grammar-application-request-invalid:forbidden-authority:formula",
            copiedParticleFailure:
                "classical-grammar-application-request-invalid:forbidden-authority:lesson",
            rawStatus: "blocked",
            rawReason: "canonical-vnc-application-frame-required",
        }
    );

    s.eq(
        "Lesson 3 accepts only the issued VNC sentence handoff, including late-operation results",
        (() => {
            const application = ctx.evaluateClassicalNahuatlVncApplication({
                sourceStem: "nemi",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "3sg",
                requestedDerivation: "direct",
                requestedVoice: "active",
                mood: "indicative",
                tense: "present",
                outputScope: "single",
                sentenceOptions: {
                    sentenceType: "yes-no-question",
                    questionMode: "cuix",
                },
            });
            const issuedSentence =
                ctx.requestClassicalVncSentenceResultFrame(application);
            const auhSource =
                ctx.buildClassicalNahuatlParticleSourceFrame(
                    "l3-auh-conjunctor"
                );
            const issuedParticle = ctx.requestClassicalSentenceParticleFrame({
                particleSourceFrame: auhSource,
                nuclearResultFrame: issuedSentence,
            });
            const legacyApplicationParticle =
                ctx.executeClassicalGrammarApplicationRequest({
                    operationId: "sentence:particle-adjunction",
                    args: [{
                        particleSourceFrame: auhSource,
                        nuclearResultFrame: application,
                    }],
                });
            const legacyResultParticle =
                ctx.executeClassicalGrammarApplicationRequest({
                    operationId: "sentence:particle-adjunction",
                    args: [{
                        particleSourceFrame: auhSource,
                        nuclearResultFrame: application.resultFrame,
                    }],
                });
            const lateClosure = ctx.requestClassicalLateVncOperation({
                sourceStem: "chōca",
                sourceValence: "intransitive",
                verbClass: "A",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                derivationType: "direct",
                voice: "active",
                lateOperation: "frequentative",
                lateVariant: "ordinary-long",
                frequentativeRepetitions: 2,
                sentenceOptions: {
                    sentenceType: "yes-no-question",
                    questionMode: "cuix",
                },
            });
            const lateSentence =
                ctx.requestClassicalVncSentenceResultFrame(lateClosure);
            const lateParticle = ctx.requestClassicalSentenceParticleFrame({
                particleSourceFrame: auhSource,
                nuclearResultFrame: lateSentence,
            });
            return {
                issued: [
                    issuedParticle.authorizationStatus,
                    issuedParticle.sentenceFormulaDisplay,
                    issuedParticle.sentenceSurfaceDisplay,
                ],
                legacyApplication: [
                    legacyApplicationParticle.authorizationStatus,
                    legacyApplicationParticle.blockReason,
                    legacyApplicationParticle.canonicalResult?.authorizationStatus,
                ],
                legacyResult: [
                    legacyResultParticle.authorizationStatus,
                    legacyResultParticle.blockReason,
                    legacyResultParticle.canonicalResult?.authorizationStatus,
                ],
                lateClosure: [
                    lateClosure.authorizationStatus,
                    lateSentence.authorizationStatus,
                    lateSentence.canonicalSourceKind,
                    lateSentence.lateOperationClosureFrame === lateClosure,
                    ctx.isClassicalNahuatlVncSentenceResultFrame(lateSentence),
                ],
                lateParticle: [
                    lateParticle.authorizationStatus,
                    lateParticle.sentenceFormulaDisplay,
                    lateParticle.sentenceSurfaceDisplay,
                ],
            };
        })(),
        {
            issued: [
                "authorized",
                "auh cuix #0-0(nemi)0+0-0#?",
                "Auh cuix nemi?",
            ],
            legacyApplication: [
                "blocked",
                "canonical-issued-nuclear-result-required",
                "blocked",
            ],
            legacyResult: [
                "blocked",
                "canonical-issued-nuclear-result-required",
                "blocked",
            ],
            lateClosure: [
                "authorized",
                "authorized",
                "classical-nahuatl-late-vnc-derivation-closure-frame",
                true,
                true,
            ],
            lateParticle: [
                "authorized",
                "auh cuix #0-0(chō-chō-chōca)0+0-0#?",
                "Auh cuix chōchōchōca?",
            ],
        }
    );

    s.eq(
        "prepared VNC coordinates carry canonical sentence displays for the selected result and every conditioned variant",
        (() => {
            const plan = ctx.prepareClassicalNahuatlVncParadigmPlan({
                sourceStem: "ye",
                verbClass: "A",
                sourceValence: "intransitive",
                subject: "3sg",
                mood: "indicative",
                tense: "present",
                requestedDerivation: "direct",
                requestedVoice: "active",
                outputScope: "paradigm",
                sentenceOptions: {
                    sentenceType: "yes-no-question",
                    questionMode: "cuix",
                },
            });
            const coordinate =
                ctx.projectClassicalNahuatlVncParadigmCoordinates(plan, [{
                    subject: "1sg",
                    mood: "indicative",
                    tense: "preterit-as-present",
                }])[0];
            return {
                plan: [
                    plan.authorizationStatus,
                    ctx.isClassicalNahuatlVncParadigmPlan(plan),
                    plan.targetStem,
                    Boolean(plan.sourceAnalysisSignature),
                ],
                coordinate: [
                    coordinate.authorizationStatus,
                    ctx.isClassicalNahuatlVncParadigmCoordinateFrame(
                        coordinate
                    ),
                    coordinate.paradigmTense,
                    coordinate.formulaRealization,
                    coordinate.surfaceRealization,
                    coordinate.sentenceFormulaDisplay,
                    coordinate.sentenceSurfaceDisplay,
                    coordinate.sentenceFormulaAttachment,
                    ctx.isClassicalNahuatlVncParadigmCoordinateFrame({
                        ...coordinate,
                    }),
                ],
                variants: (coordinate?.conditionedSentenceRealizations || []).map(
                    (realization) => [
                        realization.variantId,
                        realization.formulaRealization,
                        realization.surfaceRealization,
                        realization.sentenceFormulaDisplay,
                        realization.sentenceSurfaceDisplay,
                    ]
                ),
            };
        })(),
        {
            plan: ["authorized", true, "ye", true],
            coordinate: [
                "authorized",
                true,
                "preterit-as-present",
                "#ni-0(ca-h)0+⎕-0#",
                "nicah",
                "cuix #ni-0(ca-h)0+⎕-0#?",
                "Cuix nicah?",
                "sentence-left-particles-space-separated",
                false,
            ],
            variants: [
                [
                    "current-singular-ca-h",
                    "#ni-0(ca-h)0+⎕-0#",
                    "nicah",
                    "cuix #ni-0(ca-h)0+⎕-0#?",
                    "Cuix nicah?",
                ],
                [
                    "antiquated-singular-ca-t-qui",
                    "#ni-0(ca-t)0+qui-0#",
                    "nicatqui",
                    "cuix #ni-0(ca-t)0+qui-0#?",
                    "Cuix nicatqui?",
                ],
            ],
        }
    );

    const hostileKeys = [
        "lesson",
        "lessonId",
        "lessonNumber",
        "lessonMetadata",
        "highestActiveLesson",
        "curriculum",
        "curriculumOrder",
        "formula",
        "formulaString",
        "formulaRecord",
        "formulaRecords",
        "surface",
        "surfaceForm",
        "surfaceForms",
        "selectedResult",
        "result",
        "answer",
        "storedAnswer",
        "canvasAnswer",
        "example",
        "evidence",
        "citation",
        "sourceText",
        "translation",
        "display",
        "displayText",
        "restoredState",
        "uiState",
        "urlState",
        "Stored_Answer",
        "source-text",
        "RESTORED_STATE",
    ];
    const hostileDiagnostics = hostileKeys.map((key) => {
        try {
            api.executeClassicalGrammarApplicationRequest({
                operationId: "vnc:finite-surface",
                args: [issuedSlot],
                [key]: "STORED_AUTHORITY",
            });
            return "";
        } catch (error) {
            return String(error?.message || error);
        }
    });
    s.eq(
        "lesson, formula, surface, stored result, answer, and display carriers cannot authorize the application path",
        hostileDiagnostics,
        hostileKeys.map((key) => `classical-grammar-application-request-invalid:forbidden-authority:${key}`)
    );

    let nestedAuthorityGetterCalls = 0;
    const nestedHostileKeys = [
        ["formula", {
            options: {
                authority: [{ formula: "HOSTILE_FORMULA" }],
            },
        }],
        ["surface", {
            layers: [{
                selected: {
                    surface: "HOSTILE_SURFACE",
                },
            }],
        }],
        ["lessonNumber", {
            nested: [[{
                unit: {
                    lessonNumber: 58,
                },
            }]],
        }],
        ["display", {
            projection: [{
                payload: {
                    display: "HOSTILE_DISPLAY",
                },
            }],
        }],
        ["surfaceForms", {
            projection: [{
                payload: {
                    surfaceForms: ["calli"],
                },
            }],
        }],
        ["lessonMetadata", {
            projection: [{
                payload: {
                    lessonMetadata: {
                        highestActiveLesson: 58,
                    },
                },
            }],
        }],
        ["highestActiveLesson", {
            projection: [{
                payload: {
                    unit: {
                        highestActiveLesson: 58,
                    },
                },
            }],
        }],
        ["formulaRecords", {
            projection: [{
                payload: {
                    formulaRecords: [{
                        formulaString: "HOSTILE_FORMULA",
                    }],
                },
            }],
        }],
        ["surfaceForms", (() => {
            const payload = {};
            Object.defineProperty(payload, "surfaceForms", {
                value: ["calli"],
            });
            return {
                projection: [{
                    payload,
                }],
            };
        })()],
        ["formulaRecords", {
            projection: [{
                payload: Object.create({
                    formulaRecords: [{
                        formulaString: "INHERITED_HOSTILE_FORMULA",
                    }],
                }),
            }],
        }],
        ["Stored_Answer", {
            projection: [{
                payload: {
                    Stored_Answer: "HOSTILE_STORED_ANSWER",
                },
            }],
        }],
        ["source-text", {
            projection: [{
                payload: {
                    "source-text": "HOSTILE_CANVAS_SOURCE_TEXT",
                },
            }],
        }],
        ["RESTORED_STATE", {
            projection: [{
                payload: {
                    RESTORED_STATE: {
                        selectedResult: "HOSTILE_RESTORED_RESULT",
                    },
                },
            }],
        }],
        ["accessor", (() => {
            const payload = {};
            Object.defineProperty(payload, "nestedAuthority", {
                get() {
                    nestedAuthorityGetterCalls += 1;
                    return {
                        formulaRecords: [{
                            formulaString: "GETTER_HOSTILE_FORMULA",
                        }],
                    };
                },
            });
            return { payload };
        })()],
    ];
    s.eq(
        "nested, nonenumerable, and inherited carriers cannot hide formula, surface, lesson, or display authority",
        nestedHostileKeys.map(([key, payload]) => {
            try {
                api.executeClassicalGrammarApplicationRequest({
                    operationId: "vnc:finite-surface",
                    args: [payload],
                });
                return "";
            } catch (error) {
                return String(error?.message || error);
            }
        }),
        nestedHostileKeys.map(([key]) =>
            `classical-grammar-application-request-invalid:forbidden-authority:${key}`)
    );
    s.eq(
        "the recursive firewall rejects accessors without invoking them",
        nestedAuthorityGetterCalls,
        0
    );

    let emptyResultCapabilityCalls = 0;
    const emptyResultApi = ctx.createClassicalGrammarApplicationApi({
        buildClassicalNahuatlVncFiniteSurfaceFrame() {
            emptyResultCapabilityCalls += 1;
            return {};
        },
    });
    const emptyResultReceipt =
        emptyResultApi.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:finite-surface",
            args: [{ kind: "typed-test-slot" }],
        });
    s.eq(
        "a non-null empty capability result is not a canonical authorized result",
        {
            status: emptyResultReceipt.authorizationStatus,
            reason: emptyResultReceipt.blockReason,
            canonicalResult: emptyResultReceipt.canonicalResult,
            gcd: emptyResultReceipt.greatestCommonDivisor.satisfied,
            proofs: emptyResultReceipt.greatestCommonDivisor.invariantProofs,
            capabilityCalls: emptyResultCapabilityCalls,
        },
        {
            status: "blocked",
            reason:
                "classical-grammar-application-canonical-runtime-required",
            canonicalResult: null,
            gcd: false,
            proofs: {
                "canonical-runtime-installation": false,
                "typed-application-request": true,
                "semantic-operation-identity": true,
                "required-capability-resolution": false,
                "canonical-capability-identity": false,
                "canonical-engine-result": false,
                "no-renderer-fallback": false,
                "lesson-and-display-authority-forbidden": true,
                "classical-visible-surface-firewall": true,
            },
            capabilityCalls: 0,
        }
    );

    const lesson2ForgeVariants = [
        {
            kind: "classical-nahuatl-transcription-frame",
            version: 1,
            authorizationStatus: "authorized",
            sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
            transcriptionSource: "HOSTILE",
            phonologicalBoundary: "HOSTILE",
            orthographicRealization: "HOSTILE",
        },
        {
            kind: "classical-nahuatl-transcription-frame",
            version: 1,
            authorizationStatus: "authorized",
            sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
            surfaceForms: ["calli"],
        },
        {
            kind: "classical-nahuatl-transcription-frame",
            version: 1,
            authorizationStatus: "authorized",
            sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
            lessonMetadata: {
                highestActiveLesson: 58,
            },
        },
        {
            kind: "classical-nahuatl-transcription-frame",
            version: 1,
            authorizationStatus: "authorized",
            sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
            formulaRecords: [{
                formulaString: "HOSTILE_FORMULA",
            }],
        },
    ];
    let lesson2ForgeCalls = 0;
    const lesson2ForgeTarget = Object.create(ctx);
    Object.defineProperty(
        lesson2ForgeTarget,
        "buildClassicalNahuatlTranscriptionFrame",
        {
            value() {
                const result =
                    lesson2ForgeVariants[lesson2ForgeCalls]
                    || lesson2ForgeVariants[0];
                lesson2ForgeCalls += 1;
                return Object.freeze(result);
            },
        }
    );
    const lesson2ForgeApi =
        ctx.createClassicalGrammarApplicationApi(lesson2ForgeTarget);
    const lesson2ForgeReceipts = lesson2ForgeVariants.map(() =>
        lesson2ForgeApi.executeClassicalGrammarApplicationRequest({
            operationId: "orthography:transcription",
            args: ["HOSTILE"],
        }));

    let lesson5ForgeCalls = 0;
    const lesson5ForgeTarget = Object.create(ctx);
    Object.defineProperty(
        lesson5ForgeTarget,
        "buildClassicalNahuatlLesson5VncSubjectTenseFrame",
        {
            value() {
                lesson5ForgeCalls += 1;
                return Object.freeze({
                    kind:
                        "classical-nahuatl-finite-vnc-vnc-subject-tense-machinery-frame",
                    version: 1,
                    authorizationStatus: "authorized",
                    sourceDocument: "ANDREWS_TRANSCRIPTION_CANVAS.md",
                    proofFrame: {
                        conclusion: {
                            authorizationStatus: "authorized",
                        },
                    },
                    vncSlotFrame: {
                        kind: "HOSTILE_SLOT",
                    },
                    formulaRealization: "#ni-0(HOSTILE)0+0-0#",
                });
            },
        }
    );
    const lesson5ForgeReceipt =
        ctx.createClassicalGrammarApplicationApi(lesson5ForgeTarget)
            .executeClassicalGrammarApplicationRequest({
                operationId: "vnc:finite-slot",
                args: ["HOSTILE", {}],
            });
    s.eq(
        "correct-kind Lesson 2 and Lesson 5 structural forgeries never cross the canonical runtime identity boundary",
        {
            lesson2Receipts: lesson2ForgeReceipts.map(receipt => [
                receipt.authorizationStatus,
                receipt.blockReason,
                receipt.canonicalResult,
                receipt.greatestCommonDivisor.invariantProofs[
                    "canonical-runtime-installation"
                ],
                receipt.greatestCommonDivisor.invariantProofs[
                    "canonical-capability-identity"
                ],
            ]),
            lesson2ForgeCalls,
            lesson5Receipt: [
                lesson5ForgeReceipt.authorizationStatus,
                lesson5ForgeReceipt.blockReason,
                lesson5ForgeReceipt.canonicalResult,
                lesson5ForgeReceipt.greatestCommonDivisor.invariantProofs[
                    "canonical-runtime-installation"
                ],
                lesson5ForgeReceipt.greatestCommonDivisor.invariantProofs[
                    "canonical-capability-identity"
                ],
            ],
            lesson5ForgeCalls,
        },
        {
            lesson2Receipts: Array(4).fill([
                "blocked",
                "classical-grammar-application-canonical-runtime-required",
                null,
                false,
                false,
            ]),
            lesson2ForgeCalls: 0,
            lesson5Receipt: [
                "blocked",
                "classical-grammar-application-canonical-runtime-required",
                null,
                false,
                false,
            ],
            lesson5ForgeCalls: 0,
        }
    );

    const lesson2CapabilityName =
        "buildClassicalNahuatlTranscriptionFrame";
    const canonicalLesson2Descriptor =
        Object.getOwnPropertyDescriptor(ctx, lesson2CapabilityName);
    let replacementCapabilityCalls = 0;
    let replacedCapabilityReceipt = null;
    try {
        Object.defineProperty(ctx, lesson2CapabilityName, {
            ...canonicalLesson2Descriptor,
            value() {
                replacementCapabilityCalls += 1;
                return lesson2ForgeVariants[0];
            },
        });
        replacedCapabilityReceipt =
            ctx.executeClassicalGrammarApplicationRequest({
                operationId: "orthography:transcription",
                args: [transcriptionSource],
            });
    } finally {
        Object.defineProperty(
            ctx,
            lesson2CapabilityName,
            canonicalLesson2Descriptor
        );
    }
    s.eq(
        "replacing an exported facade binding cannot replace the isolated canonical runtime capability",
        {
            status: replacedCapabilityReceipt.authorizationStatus,
            reason: replacedCapabilityReceipt.blockReason,
            canonicalKind: replacedCapabilityReceipt.canonicalResult?.kind,
            canonicalRuntime:
                replacedCapabilityReceipt.greatestCommonDivisor.invariantProofs[
                    "canonical-runtime-installation"
                ],
            canonicalIdentity:
                replacedCapabilityReceipt.greatestCommonDivisor.invariantProofs[
                    "canonical-capability-identity"
                ],
            replacementCapabilityCalls,
        },
        {
            status: "authorized",
            reason: "",
            canonicalKind: "classical-nahuatl-transcription-frame",
            canonicalRuntime: true,
            canonicalIdentity: true,
            replacementCapabilityCalls: 0,
        }
    );

    const capabilityReplacementProbe = spawnSync(
        process.execPath,
        [
            "--input-type=module",
            "-e",
            `
                import {
                    installClassicalGrammarApplicationGlobals,
                } from "./src/application/classical/grammar_application.mjs";
                let calls = 0;
                const target = {
                    buildClassicalNahuatlTranscriptionFrame() {
                        return {};
                    },
                };
                installClassicalGrammarApplicationGlobals(target);
                target.buildClassicalNahuatlTranscriptionFrame = () => {
                    calls += 1;
                    return {};
                };
                const receipt =
                    target.executeClassicalGrammarApplicationRequest({
                        operationId: "orthography:transcription",
                        args: ["cal"],
                    });
                process.stdout.write(JSON.stringify({
                    status: receipt.authorizationStatus,
                    reason: receipt.blockReason,
                    canonicalResult: receipt.canonicalResult,
                    canonicalRuntime:
                        receipt.greatestCommonDivisor.invariantProofs[
                            "canonical-runtime-installation"
                        ],
                    canonicalIdentity:
                        receipt.greatestCommonDivisor.invariantProofs[
                            "canonical-capability-identity"
                    ],
                    calls,
                }));
            `,
        ],
        {
            cwd: path.resolve(__dirname, "../.."),
            encoding: "utf8",
        }
    );
    const capabilityReplacementProof =
        capabilityReplacementProbe.status === 0
            ? JSON.parse(capabilityReplacementProbe.stdout)
            : null;
    s.eq(
        "replacing a capability on the canonical application target blocks before the replacement executes",
        {
            exitStatus: capabilityReplacementProbe.status,
            stderr: capabilityReplacementProbe.stderr,
            proof: capabilityReplacementProof,
        },
        {
            exitStatus: 0,
            stderr: "",
            proof: {
                status: "blocked",
                reason:
                    "classical-grammar-application-canonical-capability-identity-invalid:buildClassicalNahuatlTranscriptionFrame",
                canonicalResult: null,
                canonicalRuntime: true,
                canonicalIdentity: false,
                calls: 0,
            },
        }
    );

    const transcriptionIssuanceProbe = spawnSync(
        process.execPath,
        [
            "--input-type=module",
            "-e",
            `
                import {
                    installClassicalGrammarApplicationGlobals,
                } from "./src/application/classical/grammar_application.mjs";
                import {
                    installClassicalNahuatlTranscriptionGlobals,
                } from "./src/core/classical/transcription.mjs";
                const target = {};
                installClassicalNahuatlTranscriptionGlobals(target);
                const source =
                    target.buildClassicalNahuatlTranscriptionSourceFrame({
                        constituents: [{
                            segments: ["/k/", "a", "/l/"],
                        }],
                    });
                const issued =
                    target.buildClassicalNahuatlTranscriptionFrame(source);
                const variants = [
                    Object.freeze({ ...issued }),
                    JSON.parse(JSON.stringify(issued)),
                    "classical-nahuatl-transcription-frame",
                ];
                const validatorProof = [
                    target.isClassicalNahuatlTranscriptionFrame(issued),
                    target.isClassicalNahuatlTranscriptionFrame(variants[0]),
                    target.isClassicalNahuatlTranscriptionFrame(variants[1]),
                    target.isClassicalNahuatlTranscriptionFrame(variants[2]),
                ];
                let calls = 0;
                Object.defineProperty(
                    target,
                    "buildClassicalNahuatlTranscriptionFrame",
                    {
                        configurable: true,
                        enumerable: true,
                        writable: true,
                        value() {
                            const value = variants[calls] ?? variants[0];
                            calls += 1;
                            return value;
                        },
                    },
                );
                installClassicalGrammarApplicationGlobals(target);
                const receipts = variants.map(() =>
                    target.executeClassicalGrammarApplicationRequest({
                        operationId: "orthography:transcription",
                        args: [source],
                    }));
                process.stdout.write(JSON.stringify({
                    validatorProof,
                    receipts: receipts.map((receipt) => ({
                        status: receipt.authorizationStatus,
                        reason: receipt.blockReason,
                        canonicalResult: receipt.canonicalResult,
                        canonicalRuntime:
                            receipt.greatestCommonDivisor.invariantProofs[
                                "canonical-runtime-installation"
                            ],
                        canonicalIdentity:
                            receipt.greatestCommonDivisor.invariantProofs[
                                "canonical-capability-identity"
                            ],
                    })),
                    calls,
                    oldOrthographyCapability:
                        typeof target.buildClassicalNahuatlLesson2OrthographyFrame,
                    oldMachineryCapability:
                        typeof target.buildClassicalNahuatlLesson2MachineryFrame,
                }));
            `,
        ],
        {
            cwd: path.resolve(__dirname, "../.."),
            encoding: "utf8",
        }
    );
    const transcriptionIssuanceProof =
        transcriptionIssuanceProbe.status === 0
            ? JSON.parse(transcriptionIssuanceProbe.stdout)
            : null;
    s.eq(
        "copied, serialized, and string transcription authority fails closed through the canonical application route",
        {
            exitStatus: transcriptionIssuanceProbe.status,
            stderr: transcriptionIssuanceProbe.stderr,
            proof: transcriptionIssuanceProof,
        },
        {
            exitStatus: 0,
            stderr: "",
            proof: {
                validatorProof: [true, false, false, false],
                receipts: Array(3).fill({
                    status: "blocked",
                    reason:
                        "classical-grammar-application-result-invalid:unrecognized-route-result",
                    canonicalResult: null,
                    canonicalRuntime: true,
                    canonicalIdentity: true,
                }),
                calls: 3,
                oldOrthographyCapability: "undefined",
                oldMachineryCapability: "undefined",
            },
        }
    );

    let proxyGetTrapReads = 0;
    const proxyCapabilityTarget = new Proxy({}, {
        get() {
            proxyGetTrapReads += 1;
            return () => ({});
        },
    });
    const proxyCapabilityApi =
        ctx.createClassicalGrammarApplicationApi(proxyCapabilityTarget);
    const proxyInventory =
        proxyCapabilityApi.getClassicalGrammarApplicationInventory();
    const proxyAttempts = proxyInventory.operations.map((operation) => {
        try {
            proxyCapabilityApi.executeClassicalGrammarApplicationRequest({
                operationId: operation.operationId,
                args: [],
            });
            return "authorized";
        } catch (error) {
            return String(error?.message || error);
        }
    });
    s.eq(
        "a get-trap Proxy cannot install dummy capabilities or satisfy the GCD",
        {
            operationCount: proxyInventory.operations.length,
            installedCount: proxyInventory.operations.filter(
                operation => operation.capabilityInstalled
            ).length,
            allCapabilitiesInstalled: proxyInventory.allCapabilitiesInstalled,
            blockedCount: proxyAttempts.filter(message =>
                message.startsWith(
                    "classical-grammar-application-required-capability-missing:"
                )
            ).length,
            authorizedCount: proxyAttempts.filter(
                message => message === "authorized"
            ).length,
            proxyGetTrapReads,
        },
        {
            operationCount: 90,
            installedCount: 0,
            allCapabilitiesInstalled: false,
            blockedCount: 90,
            authorizedCount: 0,
            proxyGetTrapReads: 0,
        }
    );

    let blockedCandidateCalls = 0;
    const blockedApi = ctx.createClassicalGrammarApplicationApi({
        buildClassicalNahuatlVncFiniteSurfaceFrame() {
            blockedCandidateCalls += 1;
            return Object.freeze({
                kind: "classical-nahuatl-vnc-finite-surface-frame",
                authorizationStatus: "blocked",
                blockReason: "typed-source-not-issued",
            });
        },
    });
    const blockedReceipt = blockedApi.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:finite-surface",
        args: [{ kind: "forged-slot" }],
    });
    s.eq(
        "an arbitrary target cannot present even a blocked correct-kind result as canonical",
        {
            authorizationStatus: blockedReceipt.authorizationStatus,
            blockReason: blockedReceipt.blockReason,
            gcdSatisfied: blockedReceipt.greatestCommonDivisor.satisfied,
            canonicalResult: blockedReceipt.canonicalResult,
            blockedCandidateCalls,
        },
        {
            authorizationStatus: "blocked",
            blockReason:
                "classical-grammar-application-canonical-runtime-required",
            gcdSatisfied: false,
            canonicalResult: null,
            blockedCandidateCalls: 0,
        }
    );

    let leakedSurfaceCapabilityCalls = 0;
    const leakedSurfaceApi = ctx.createClassicalGrammarApplicationApi({
        buildClassicalNahuatlVncFiniteSurfaceFrame() {
            leakedSurfaceCapabilityCalls += 1;
            return Object.freeze({
                kind: "forged-finite-surface",
                authorizationStatus: "authorized",
                wordRealization: "kwawtajkat",
            });
        },
    });
    const leakedSurfaceReceipt =
        leakedSurfaceApi.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:finite-surface",
            args: [{ kind: "forged-slot" }],
        });
    s.eq(
        "an untrusted target cannot reach the visible-surface check or emit a surface",
        [
            leakedSurfaceReceipt.authorizationStatus,
            leakedSurfaceReceipt.blockReason,
            leakedSurfaceReceipt.canonicalResult,
            leakedSurfaceCapabilityCalls,
        ],
        [
            "blocked",
            "classical-grammar-application-canonical-runtime-required",
            null,
            0,
        ]
    );
    s.eq(
        "special renderer word and sentence surface fields share the same firewall",
        [
            ctx.getClassicalVisibleSurfaceViolation({ wordSurface: "kali" }),
            ctx.getClassicalVisibleSurfaceViolation({ sentenceSurface: "Weli." }),
            ctx.getClassicalVisibleSurfaceViolation({
                surfaceForms: ["calli", "kwalli"],
            }),
            ctx.getClassicalVisibleSurfaceViolation({
                variants: [{
                    surfaceForms: [["cualli"], ["wēyi"]],
                }],
            }),
        ],
        [
            "$.wordSurface",
            "$.sentenceSurface",
            "$.surfaceForms[1]",
            "$.variants[0].surfaceForms[1][0]",
        ]
    );

    let leakedSurfaceFormsCapabilityCalls = 0;
    const leakedSurfaceFormsApi = ctx.createClassicalGrammarApplicationApi({
        buildClassicalNahuatlVncFiniteSurfaceFrame() {
            leakedSurfaceFormsCapabilityCalls += 1;
            return Object.freeze({
                kind: "classical-nahuatl-vnc-finite-surface-frame",
                authorizationStatus: "authorized",
                surfaceForms: [{
                    primary: ["calli"],
                    alternate: ["kwalli"],
                }],
            });
        },
    });
    const leakedSurfaceFormsReceipt =
        leakedSurfaceFormsApi.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:finite-surface",
            args: [{ kind: "typed-test-slot" }],
        });
    s.eq(
        "nested surfaceForms from an untrusted target are never evaluated as canonical output",
        [
            leakedSurfaceFormsReceipt.authorizationStatus,
            leakedSurfaceFormsReceipt.blockReason,
            leakedSurfaceFormsReceipt.canonicalResult,
            leakedSurfaceFormsCapabilityCalls,
        ],
        [
            "blocked",
            "classical-grammar-application-canonical-runtime-required",
            null,
            0,
        ]
    );

    return s;
}

module.exports = { run };
