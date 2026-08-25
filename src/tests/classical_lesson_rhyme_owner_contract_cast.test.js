"use strict";

const path = require("path");
const { createSuite } = require("./runner");
const {
    collectClassicalLessonRhymeOwnerEvidence,
} = require("./helpers/classical_lesson_rhyme_owner_evidence");

const ROOT = path.resolve(__dirname, "..", "..");

function requireAuthorized(receipt, label) {
    if (receipt?.authorizationStatus !== "authorized") {
        throw new Error(
            `rhyme-owner-contract-cast:${label}:`
            + `${receipt?.blockReason || "blocked"}`
        );
    }
    return receipt;
}

function execute(ctx, operationId, args) {
    return requireAuthorized(
        ctx.executeClassicalGrammarApplicationRequest({
            operationId,
            args,
        }),
        operationId
    );
}

function issueVnc(ctx, overrides = {}) {
    return execute(ctx, "vnc:application", [{
        sourceStem: "cuīca",
        verbClass: "A",
        sourceValence: "intransitive",
        subject: "3sg",
        requestedDerivation: "direct",
        requestedVoice: "active",
        mood: "indicative",
        tense: "present",
        outputScope: "single",
        sentenceOptions: {},
        ...overrides,
    }]);
}

function issueLateDerivation(ctx) {
    return execute(ctx, "vnc:derivational-operation", [{
        sourceStem: "miqui",
        sourceValence: "intransitive",
        verbClass: "B",
        subject: "3sg",
        mood: "indicative",
        tense: "future",
        derivationType: "direct",
        voice: "active",
        objectKind: "none",
        lateOperation: "frequentative",
        lateVariant: "ordinary-short-glottal",
        frequentativeRepetitions: 1,
        frequentativeScope: "open",
    }]);
}

function issueOrdinaryNnc(ctx, stem = "icnīuh", sourceClass = "zero") {
    const source = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem,
        ...(sourceClass ? { sourceClass } : {}),
    });
    const operation = ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(
        source,
        {
            state: "absolutive",
            subject: "3sg",
            sentenceType: "statement",
            polarity: "positive",
        }
    );
    if (operation?.authorizationStatus !== "authorized") {
        throw new Error(
            "rhyme-owner-contract-cast:ordinary-operation:"
            + `${operation?.blockReason || "blocked"}:`
            + `${source?.authorizationStatus || "source-blocked"}:`
            + `${source?.blockReason || ""}`
        );
    }
    return execute(ctx, "nnc:ordinary", [source, operation]);
}

function issuePronominalNnc(ctx) {
    const source = ctx.buildClassicalNahuatlPronominalNncSourceFrame({
        stem: "yeh",
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

function issuePreteritAgentive(ctx) {
    const preterit = issueVnc(ctx, {
        sourceStem: "pix-ca",
        verbClass: "A",
        tense: "preterit",
    });
    const exactVncResult = preterit.canonicalResult?.resultFrame || null;
    const agentive = execute(ctx, "nnc:deverbal-construction", [{
        constructionKind: "predicate-nominalization",
        nominalizationKind: "preterit-agentive",
        canonicalVncResult: exactVncResult,
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
    }]);
    return { preterit, exactVncResult, agentive };
}

function nominalVncRequest(ctx, exactVncResult) {
    const projection =
        ctx.getClassicalNahuatlVncContinuationSourceConstituents(
            exactVncResult
        );
    if (!projection) {
        throw new Error("rhyme-owner-contract-cast:vnc-projection-required");
    }
    return {
        constructionKind: "nominal-embed-vnc",
        source: {
            embedStem: "coy-ō",
            embedClass: "zero",
            matrixStem: projection.sourceStem,
            matrixVerbClass: projection.verbClass,
            matrixValence: projection.sourceValence,
            matrixConstituent: {
                kind: "vnc-result",
                stem: projection.sourceStem,
                resultFrame: exactVncResult,
            },
        },
        relation: "adverb",
        route: "direct-adverb",
        adverbRole: "compared-manner",
        orientation: "subject",
        subject: "3sg",
        mood: "indicative",
        tense:
            exactVncResult?.tense
            || exactVncResult?.normalizedRequest?.tense
            || exactVncResult?.finiteSurfaceFrame?.morphologicalTense
            || "present",
        voice: "active",
        outputKind: "single",
    };
}

function issueNominalVnc(ctx, producerReceipt) {
    const exactVncResult = producerReceipt.canonicalResult?.resultFrame
        || producerReceipt.canonicalResult;
    return execute(ctx, "grammar:nominal-construction", [
        nominalVncRequest(ctx, exactVncResult),
    ]);
}

function issueCompoundFromOrdinary(ctx, ordinaryReceipt) {
    const result = ordinaryReceipt.canonicalResult;
    const projection =
        ctx.getClassicalNahuatlNncContinuationSourceConstituents(result);
    return execute(ctx, "grammar:nominal-construction", [{
        constructionKind: "compound-nnc",
        source: {
            embedStem: "ā",
            embedClass: "tl",
            matrixStem: projection.sourceIdentityStem,
            matrixClass: projection.sourceNounClass,
            matrixConstituent: {
                kind: "ordinary-nnc",
                stem: projection.sourceIdentityStem,
                resultFrame: result,
            },
        },
        structure: "integrated",
        embedRole: "association",
        possessorOrientation: "matrix",
        subject: "3sg",
        state: "absolutive",
        animacy: "animate",
    }]);
}

function issueCompoundFromAgentive(ctx, agentiveReceipt) {
    const result = agentiveReceipt.canonicalResult;
    const stem = result.operationFrame?.targetStems?.restrictedUse || "";
    return execute(ctx, "grammar:nominal-construction", [{
        constructionKind: "nominal-embed-vnc",
        source: {
            embedStem: stem,
            embedClass: "zero",
            embedConstituent: {
                kind: "preterit-agentive-nnc",
                stem,
                resultFrame: result,
            },
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
    }]);
}

function issueDerivationFromVncApplication(ctx, sourceApplicationFrame) {
    const exactResult = sourceApplicationFrame?.resultFrame || null;
    const projection =
        ctx.getClassicalNahuatlVncContinuationSourceConstituents(
            exactResult
        );
    if (!projection) {
        throw new Error(
            "rhyme-owner-contract-cast:derivation-source-required"
        );
    }
    return execute(ctx, "vnc:derivational-operation", [{
        sourceApplicationFrame,
        sourceStem: projection.sourceStem,
        sourceValence: projection.sourceValence,
        verbClass: projection.verbClass,
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        derivationType: "direct",
        voice: "active",
        objectKind: projection.objectKind || "none",
        lateOperation: "frequentative",
        lateVariant: "ordinary-short-glottal",
        frequentativeRepetitions: 1,
        frequentativeScope: "open",
    }]);
}

function issueDeverbalAction(ctx, exactVncResult) {
    return execute(ctx, "nnc:deverbal-construction", [{
        constructionKind: "deverbal-action",
        actionKind: "active-action",
        actionSuffix: "liz",
        canonicalVncResult: exactVncResult,
        subject: "3sg",
        state: "absolutive",
        animacy: "nonanimate",
    }]);
}

function issueNncDiagram(ctx, exactSlotFrame) {
    return execute(ctx, "nnc:diagram", [exactSlotFrame]);
}

function issueNncSentenceSurface(ctx, exactSlotFrame) {
    return execute(ctx, "nnc:sentence-surface", [
        exactSlotFrame,
        { sentenceType: "assertion", polarity: "positive" },
    ]);
}

function issueSupplementation(ctx, exactPrincipalResult) {
    const supplementFrame = ctx.buildClassicalNahuatlAbsolutiveNncFrame(
        "icnīuh",
        {
            subject: "3sg",
            nounClass: "zero",
            animacy: "animate",
        }
    );
    const supplement = issueNncSentenceSurface(
        ctx,
        supplementFrame.nncSlotFrame
    );
    const relationTarget = Object.create(ctx);
    const relationApi =
        ctx.createClassicalClauseRelationControllerGlobals(relationTarget);
    Object.defineProperties(
        relationTarget,
        Object.getOwnPropertyDescriptors(relationApi)
    );
    const controller =
        relationTarget.createClassicalClauseRelationController();
    const principalCapture = controller.captureCurrentResult(
        "principal",
        exactPrincipalResult
    );
    const supplementCapture = controller.captureCurrentResult(
        "adjoined",
        supplement.canonicalResult
    );
    if (
        principalCapture.authorizationStatus !== "authorized"
        || supplementCapture.authorizationStatus !== "authorized"
    ) {
        throw new Error(
            "rhyme-owner-contract-cast:supplement-capture:"
            + `${principalCapture.blockReason || ""}:`
            + `${supplementCapture.blockReason || ""}`
        );
    }
    const contract = controller.buildDecisionContract({
        relation: "supplementation",
        supplementationReferenceMode: "shared",
        supplementationContactRole: "subject",
        supplementationHeadRole: "subject",
        supplementationOrder: "principal-first",
    });
    const composition = controller.compose({
        relation: "supplementation",
        supplementationReferenceMode: "shared",
        supplementationContactRole: "subject",
        supplementationHeadRole: "subject",
        supplementationOrder: "principal-first",
    });
    requireAuthorized(contract, "supplementation-contract");
    requireAuthorized(composition, "supplementation-composition");
    return composition.canonicalResult;
}

function run(ctx) {
    const s = createSuite("classical_lesson_rhyme_owner_contract_cast");
    const nuclearClause = execute(ctx, "vnc:nuclear-clause", [
        "nemi",
        { tenseMode: "verb", transitivity: "intransitive" },
    ]);
    const verbstemClass = execute(ctx, "vnc:verbstem-class", [
        "(cochi)",
        {
            valence: "intransitive",
            subject: "1sg",
            mood: "optative",
            tense: "nonpast",
            verbClass: "B",
        },
    ]);
    const activeVnc = issueVnc(ctx);
    const lateDerivation = issueLateDerivation(ctx);
    const ordinary = issueOrdinaryNnc(ctx);
    const pronominal = issuePronominalNnc(ctx);
    const { agentive } = issuePreteritAgentive(ctx);
    const nominalFromActive = issueNominalVnc(ctx, activeVnc);
    const nominalFromLate = issueNominalVnc(ctx, lateDerivation);
    const compoundFromOrdinary = issueCompoundFromOrdinary(ctx, ordinary);
    const nominalFromAgentive = issueCompoundFromAgentive(ctx, agentive);
    const derivationFromActive = issueDerivationFromVncApplication(
        ctx,
        activeVnc.canonicalResult
    );
    const derivationFromNominal = issueDerivationFromVncApplication(
        ctx,
        nominalFromActive.canonicalResult.canonicalResult
    );
    const deverbalFromNominal = issueDeverbalAction(
        ctx,
        nominalFromLate.canonicalResult.canonicalResult.resultFrame
    );
    const deverbalFromLate = issueDeverbalAction(
        ctx,
        lateDerivation.canonicalResult
    );
    const nominalNncSlot =
        compoundFromOrdinary.canonicalResult.canonicalResult.nncSlotFrame;
    const deverbalNncSlot =
        agentive.canonicalResult.canonicalResult.nncSlotFrame;
    const ordinaryNncSlot = ordinary.canonicalResult.typedSlotFrame;
    const pronominalNncSlot = pronominal.canonicalResult.typedSlotFrame;
    const nominalDiagram = issueNncDiagram(ctx, nominalNncSlot);
    const deverbalDiagram = issueNncDiagram(ctx, deverbalNncSlot);
    const ordinaryDiagram = issueNncDiagram(ctx, ordinaryNncSlot);
    const ordinarySentence = issueNncSentenceSurface(ctx, ordinaryNncSlot);
    const pronominalDiagram = issueNncDiagram(ctx, pronominalNncSlot);
    const pronominalSentence = issueNncSentenceSurface(
        ctx,
        pronominalNncSlot
    );
    const derivationSupplementation = issueSupplementation(
        ctx,
        lateDerivation.canonicalResult
    );
    const activeSupplementation = issueSupplementation(
        ctx,
        activeVnc.canonicalResult
    );
    const nominalSupplementation = issueSupplementation(
        ctx,
        compoundFromOrdinary.canonicalResult
    );
    const deverbalSupplementation = issueSupplementation(
        ctx,
        agentive.canonicalResult
    );
    const ordinarySupplementation = issueSupplementation(
        ctx,
        ordinary.canonicalResult
    );
    const pronominalSupplementation = issueSupplementation(
        ctx,
        pronominal.canonicalResult
    );

    const receipts = [
        nuclearClause,
        verbstemClass,
        activeVnc,
        lateDerivation,
        ordinary,
        pronominal,
        agentive,
        nominalFromActive,
        nominalFromLate,
        compoundFromOrdinary,
        nominalFromAgentive,
        derivationFromActive,
        derivationFromNominal,
        deverbalFromNominal,
        deverbalFromLate,
        nominalDiagram,
        deverbalDiagram,
        ordinaryDiagram,
        ordinarySentence,
        pronominalDiagram,
        pronominalSentence,
        derivationSupplementation,
        activeSupplementation,
        nominalSupplementation,
        deverbalSupplementation,
        ordinarySupplementation,
        pronominalSupplementation,
    ];
    s.eq("owner fixtures are all canonical authorized Results", {
        statuses: receipts.map(receipt => receipt.authorizationStatus),
        valid: receipts.every(receipt => (
            ctx.isClassicalGrammarApplicationResult(receipt)
            || ctx.getClassicalGrammarApplicationRhymeOwnerProofObservations(
                receipt
            ).length > 0
        )),
    }, {
        statuses: receipts.map(() => "authorized"),
        valid: true,
    });

    const threeLayerGraph =
        ctx.getClassicalGrammarApplicationLayerGraph(
            derivationFromNominal
        );
    const vncNextOperations =
        ctx.getClassicalGrammarApplicationNextOperationInventory(
            activeVnc
        );
    s.eq(
        "one owner-issued layer graph retains the whole path and derives every type-compatible next operation",
        {
            graphValid:
                ctx.isClassicalGrammarApplicationLayerGraph(
                    threeLayerGraph
                ),
            operations: threeLayerGraph?.operationIds,
            nodeCount: threeLayerGraph?.nodeCount,
            edgeCount: threeLayerGraph?.edgeCount,
            maximumDepth: threeLayerGraph?.maximumDepth,
            linear: threeLayerGraph?.isLinear,
            exactEdges: threeLayerGraph?.edges.every(edge => (
                edge.exactInnerResultIdentityObservedInOuterArguments
                    === true
            )),
            nextIncludesVncLayer:
                vncNextOperations?.operationIds.includes(
                    "vnc:derivational-operation"
                ),
            nextIncludesNncLayer:
                vncNextOperations?.operationIds.includes(
                    "nnc:deverbal-construction"
                ),
            nextIncludesClauseLayer:
                vncNextOperations?.operationIds.includes(
                    "clause:composition"
                ),
            nextExcludesNncOnlyLayer:
                !vncNextOperations?.operationIds.includes(
                    "vnc:denominal"
                ),
            everyCandidateSharesAnEmittedType:
                vncNextOperations?.candidates.every(candidate => (
                    candidate.sharedUnitKinds.length > 0
                    && candidate.sharedUnitKinds.every(unitKind => (
                        vncNextOperations.emittedUnitKinds.includes(
                            unitKind
                        )
                    ))
                )),
            copiedGraphRejected:
                ctx.isClassicalGrammarApplicationLayerGraph({
                    ...threeLayerGraph,
                }) === false,
            copiedResultHasNoGraph:
                ctx.getClassicalGrammarApplicationLayerGraph({
                    ...derivationFromNominal,
                }) === null,
            inventoryDoesNotAuthorizeGrammar:
                vncNextOperations?.typeCompatibilityOnly === true
                && vncNextOperations?.ownerAuthorizationStillRequired
                    === true
                && vncNextOperations?.grammarAuthority === false,
        },
        {
            graphValid: true,
            operations: [
                "vnc:application",
                "grammar:nominal-construction",
                "vnc:derivational-operation",
            ],
            nodeCount: 3,
            edgeCount: 2,
            maximumDepth: 3,
            linear: true,
            exactEdges: true,
            nextIncludesVncLayer: true,
            nextIncludesNncLayer: true,
            nextIncludesClauseLayer: true,
            nextExcludesNncOnlyLayer: true,
            everyCandidateSharesAnEmittedType: true,
            copiedGraphRejected: true,
            copiedResultHasNoGraph: true,
            inventoryDoesNotAuthorizeGrammar: true,
        }
    );

    const inventory = ctx.getClassicalGrammarApplicationInventory();
    const evidenceFrames = collectClassicalLessonRhymeOwnerEvidence({
        rootDir: ROOT,
        inventory,
    });
    const calibration =
        ctx.buildClassicalGrammarApplicationRhymeOwnerCalibration({
            lessonOwnerEvidenceFrames: evidenceFrames,
            exactOwnerProofResults: receipts,
        });
    s.eq(
        "the closed Lesson 1-39 cast remains exact while the all-58 queue stays explicit",
        {
            contractCount: calibration.ownerContractCount,
            observedContractCount: calibration.ownerContractObservedCount,
            remainingContractCount:
                calibration.ownerContractProofQueueCount,
            remainingLessonEdgeCount: calibration.proofQueueCount,
            savedExecutions:
                calibration.ownerContractCollapseSavedExecutions,
            statusCounts: calibration.statusCounts,
            everyContractHasExactOwnerProof:
                calibration.ownerContractInventory.every(item =>
                    item.proofStatus
                        === "owner-contract-exactly-observed"
                    && item.exactOwnerProofs.length > 0
                    && item.exactOwnerProofs.every(observation =>
                        ctx.isClassicalGrammarApplicationRhymeOwnerProofObservation(
                            observation
                        )
                    )
                ),
            proofNeverAuthorizesGrammar:
                calibration.exactOwnerProofObservations.every(
                    observation => observation.grammarAuthority === false
                )
                && calibration.grammarAuthority === false,
        },
        {
            contractCount: 117,
            observedContractCount: 22,
            remainingContractCount: 95,
            remainingLessonEdgeCount: 239,
            savedExecutions: 309,
            statusCounts: {
                "rhyme-only-no-exact-continuation-contract": 145,
                "owner-contract-boundary-or-index-gap": 86,
                "owner-contract-exactly-observed": 187,
                "owner-contract-aligned-proof-required": 239,
                "owner-index-pending": 1,
            },
            everyContractHasExactOwnerProof: false,
            proofNeverAuthorizesGrammar: true,
        }
    );

    const edgeStatus = (innerLessonNumber, outerLessonNumber) => (
        calibration.calibratedEdges.find(edge => (
            edge.innerLessonNumber === innerLessonNumber
            && edge.outerLessonNumber === outerLessonNumber
        ))?.calibrationStatus || "missing"
    );
    const verticalSeamPairs = [35, 36, 37, 38, 39].map(
        outerLessonNumber => [10, outerLessonNumber]
    );
    const lateralSeamPairs = [
        ...[35, 36, 37, 38, 39].map(
            outerLessonNumber => [4, outerLessonNumber]
        ),
        [9, 10],
        [10, 9],
        [29, 10],
        [32, 14],
        [35, 14],
        [39, 14],
    ];
    const blockedNuclearContinuation = () => (
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:deverbal-construction",
            args: [{
                constructionKind: "deverbal-action",
                actionKind: "active-action",
                actionSuffix: "liz",
                canonicalVncResult: nuclearClause.canonicalResult,
                subject: "3sg",
                state: "absolutive",
                animacy: "nonanimate",
            }],
        })
    );
    const blockedVncApplicationReentry = exactResult => (
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:application",
            args: [exactResult],
        })
    );
    const blockedVerbstemClassReentry = exactResult => (
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:verbstem-class",
            args: [exactResult, {}],
        })
    );
    const blockedOrdinaryNncReentry = exactResult => (
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:ordinary",
            args: [exactResult, exactResult?.operationFrame || {}],
        })
    );
    const captureLateralAttempt = action => {
        try {
            const receipt = action();
            return {
                blocked: receipt?.authorizationStatus !== "authorized",
                outcome: receipt?.authorizationStatus || "missing",
                ownerIssuedReceipt:
                    ctx.isClassicalGrammarApplicationResult(receipt),
            };
        } catch (error) {
            return {
                blocked: true,
                outcome: "rejected-before-owner-execution",
                ownerIssuedReceipt: false,
                reason: String(error?.message || error),
            };
        }
    };
    const lateralOwnerAttempts = [
        ...[35, 36, 37, 38, 39].map(outerLessonNumber => ({
            pair: `4->${outerLessonNumber}`,
            attempt: captureLateralAttempt(blockedNuclearContinuation),
        })),
        {
            pair: "9->10",
            attempt: captureLateralAttempt(() => (
                blockedVncApplicationReentry(verbstemClass.canonicalResult)
            )),
        },
        {
            pair: "10->9",
            attempt: captureLateralAttempt(() => (
                blockedVerbstemClassReentry(
                    activeVnc.canonicalResult.resultFrame
                )
            )),
        },
        {
            pair: "29->10",
            attempt: captureLateralAttempt(() => (
                blockedVncApplicationReentry(
                    lateDerivation.canonicalResult
                )
            )),
        },
        {
            pair: "32->14",
            attempt: captureLateralAttempt(() => (
                blockedOrdinaryNncReentry(
                    compoundFromOrdinary.canonicalResult.canonicalResult
                )
            )),
        },
        {
            pair: "35->14",
            attempt: captureLateralAttempt(() => (
                blockedOrdinaryNncReentry(
                    agentive.canonicalResult.canonicalResult
                )
            )),
        },
        {
            pair: "39->14",
            attempt: captureLateralAttempt(() => (
                blockedOrdinaryNncReentry(pronominal.canonicalResult)
            )),
        },
    ];
    s.eq("the sixteen Lesson 1-39 seams keep exact continuation distinct from blocked sideways calls", {
        vertical: verticalSeamPairs.map(([inner, outer]) => ({
            pair: `${inner}->${outer}`,
            status: edgeStatus(inner, outer),
        })),
        lateral: lateralSeamPairs.map(([inner, outer]) => ({
            pair: `${inner}->${outer}`,
            status: edgeStatus(inner, outer),
        })),
        lateralOwnerAttempts: lateralOwnerAttempts.map(item => ({
            pair: item.pair,
            blocked: item.attempt.blocked,
        })),
        pendingThrough39: calibration.calibratedEdges.filter(edge => (
            edge.innerLessonNumber <= 39
            && edge.outerLessonNumber <= 39
            && edge.calibrationStatus === "owner-index-pending"
        )).length,
    }, {
        vertical: verticalSeamPairs.map(([inner, outer]) => ({
            pair: `${inner}->${outer}`,
            status: "owner-contract-exactly-observed",
        })),
        lateral: lateralSeamPairs.map(([inner, outer]) => ({
            pair: `${inner}->${outer}`,
            status: inner === 29 && outer === 10
                ? "owner-contract-aligned-proof-required"
                : "rhyme-only-no-exact-continuation-contract",
        })),
        lateralOwnerAttempts: lateralSeamPairs.map(([inner, outer]) => ({
            pair: `${inner}->${outer}`,
            blocked: true,
        })),
        pendingThrough39: 0,
    });

    const contractIds = new Set(
        calibration.ownerContractInventory.map(item => item.contractId)
    );
    const ordinarySlotProvenance =
        ctx.getClassicalGrammarApplicationRhymeContinuationProvenance(
            ordinaryNncSlot
        );
    const pronominalSlotProvenance =
        ctx.getClassicalGrammarApplicationRhymeContinuationProvenance(
            pronominalNncSlot
        );
    const nominalSlotProvenance =
        ctx.getClassicalGrammarApplicationRhymeContinuationProvenance(
            nominalNncSlot
        );
    const deverbalSlotProvenance =
        ctx.getClassicalGrammarApplicationRhymeContinuationProvenance(
            deverbalNncSlot
        );
    const pronominalProjection =
        ctx.getClassicalNahuatlNncContinuationSourceConstituents(
            pronominal.canonicalResult
        );
    const blockedPronominalEmbed =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "grammar:nominal-construction",
            args: [{
                constructionKind: "compound-nnc",
                source: {
                    embedStem: pronominalProjection.predicateStem,
                    embedClass: "zero",
                    embedSourceClass: "zero",
                    embedConstituent: {
                        kind: "ordinary-nnc",
                        stem: pronominalProjection.predicateStem,
                        resultFrame: pronominal.canonicalResult,
                    },
                    matrixStem: "cal",
                    matrixClass: "tli",
                },
                structure: "integrated",
                embedRole: "association",
                possessorOrientation: "matrix",
                subject: "3sg",
                state: "absolutive",
                animacy: "animate",
            }],
        });
    const blockedNominalSentence =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:sentence-surface",
            args: [
                nominalNncSlot,
                { sentenceType: "assertion", polarity: "positive" },
            ],
        });
    const blockedDeverbalSentence =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:sentence-surface",
            args: [
                deverbalNncSlot,
                { sentenceType: "assertion", polarity: "positive" },
            ],
        });
    s.eq(
        "the cast preserves subtype boundaries instead of manufacturing passages",
        {
            pronominalDoesNotBecomeNounstem:
                !contractIds.has(
                    "nnc:pronominal→grammar:nominal-construction"
                ),
            nominalOwnsItsSentence:
                !contractIds.has(
                    "grammar:nominal-construction→nnc:sentence-surface"
                ),
            deverbalOwnsItsSentence:
                !contractIds.has(
                    "nnc:deverbal-construction→nnc:sentence-surface"
                ),
            ordinarySlotKinds:
                ordinarySlotProvenance?.continuationUnitKinds,
            pronominalSlotKinds:
                pronominalSlotProvenance?.continuationUnitKinds,
            nominalSlotKinds:
                nominalSlotProvenance?.continuationUnitKinds,
            deverbalSlotKinds:
                deverbalSlotProvenance?.continuationUnitKinds,
            blockedPronominalEmbed: [
                blockedPronominalEmbed.authorizationStatus,
                blockedPronominalEmbed.blockReason,
            ],
            blockedNominalSentence: [
                blockedNominalSentence.authorizationStatus,
                blockedNominalSentence.blockReason,
            ],
            blockedDeverbalSentence: [
                blockedDeverbalSentence.authorizationStatus,
                blockedDeverbalSentence.blockReason,
            ],
            blockedResultsCreateNoProof:
                ctx.getClassicalGrammarApplicationRhymeOwnerProofObservations(
                    blockedPronominalEmbed
                ).length === 0
                && ctx.getClassicalGrammarApplicationRhymeOwnerProofObservations(
                    blockedNominalSentence
                ).length === 0
                && ctx.getClassicalGrammarApplicationRhymeOwnerProofObservations(
                    blockedDeverbalSentence
                ).length === 0,
        },
        {
            pronominalDoesNotBecomeNounstem: true,
            nominalOwnsItsSentence: true,
            deverbalOwnsItsSentence: true,
            ordinarySlotKinds: [
                "nnc-diagram-slot-frame",
                "nnc-sentence-slot-frame",
            ],
            pronominalSlotKinds: [
                "nnc-diagram-slot-frame",
                "nnc-sentence-slot-frame",
            ],
            nominalSlotKinds: ["nnc-diagram-slot-frame"],
            deverbalSlotKinds: ["nnc-diagram-slot-frame"],
            blockedPronominalEmbed: [
                "blocked",
                "ordinary-nnc-embed-constituent-mismatch",
            ],
            blockedNominalSentence: [
                "blocked",
                "unknown-applied-grammar-operation",
            ],
            blockedDeverbalSentence: [
                "blocked",
                "unknown-applied-grammar-operation",
            ],
            blockedResultsCreateNoProof: true,
        }
    );

    return s;
}

module.exports = { run };
