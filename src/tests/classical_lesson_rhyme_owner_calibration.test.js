"use strict";

const path = require("path");
const { createSuite } = require("./runner");
const {
    collectClassicalLessonRhymeOwnerEvidence,
} = require("./helpers/classical_lesson_rhyme_owner_evidence");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx) {
    const s = createSuite("classical_lesson_rhyme_owner_calibration");
    const inventory = ctx.getClassicalGrammarApplicationInventory();
    const evidenceFrames = collectClassicalLessonRhymeOwnerEvidence({
        rootDir: ROOT,
        inventory,
    });
    const calibration =
        ctx.buildClassicalGrammarApplicationRhymeOwnerCalibration({
            lessonOwnerEvidenceFrames: evidenceFrames,
        });
    const operationIds = new Set(inventory.operationIds);

    s.eq("accepted lesson proof files create the owner index without becoming authority", {
        frameCount: evidenceFrames.length,
        lessonNumbers: evidenceFrames.map(frame => frame.lessonNumber),
        acceptedEvidenceLessons: evidenceFrames
            .filter(frame => frame.acceptedImplementationEvidencePresent)
            .map(frame => frame.lessonNumber),
        pendingEvidenceLessons: evidenceFrames
            .filter(frame => !frame.acceptedImplementationEvidencePresent)
            .map(frame => frame.lessonNumber),
        seamOwnerIndex: Object.fromEntries(
            [4, 10, 14].map(lessonNumber => [
                lessonNumber,
                evidenceFrames.find(frame => (
                    frame.lessonNumber === lessonNumber
                ))?.operationIds || [],
            ])
        ),
        everyIndexedOperationIsCanonical: evidenceFrames.every(frame => (
            frame.operationIds.every(operationId => (
                operationIds.has(operationId)
            ))
        )),
        evidenceComesFromAcceptedProofs: evidenceFrames.every(frame => (
            frame.evidenceWasDerivedFromAcceptedProofFiles
        )),
        noEvidenceAuthority: evidenceFrames.every(frame => (
            frame.grammarAuthority === false
            && frame.lessonNumberAuthority === false
            && frame.formulaStringAuthority === false
            && frame.surfaceStringAuthority === false
        )),
    }, {
        frameCount: 58,
        lessonNumbers: Array.from(
            { length: 58 },
            (_, index) => index + 1
        ),
        acceptedEvidenceLessons: Array.from(
            { length: 39 },
            (_, index) => index + 1
        ),
        pendingEvidenceLessons: Array.from(
            { length: 19 },
            (_, index) => index + 40
        ),
        seamOwnerIndex: {
            4: ["vnc:nuclear-clause"],
            10: ["vnc:application"],
            14: ["nnc:ordinary"],
        },
        everyIndexedOperationIsCanonical: true,
        evidenceComesFromAcceptedProofs: true,
        noEvidenceAuthority: true,
    });

    s.eq("the discovered graph is automatically divided by current owner evidence", {
        kind: calibration.kind,
        version: calibration.version,
        edgeCount: calibration.calibratedEdgeCount,
        discoveryEdgeCount: inventory.grammaticalRhymeCalibration
            .lessonDiscovery.directRhymeEdgeCount,
        statusCounts: calibration.statusCounts,
        everyEdgeKeepsProofBoundary:
            calibration.calibratedEdges.every(edge => (
                edge.patternDiscoveryPrecedesOwnerCalibration
                && edge.exactOwnerProofStillRequired
                && edge.callerCannotDeclareOwnerAuthorization
                && edge.lessonNumberParticipatesInCompatibility === false
                && edge.grammarAuthority === false
            )),
        noForgedAuthorizationChannel:
            calibration.exactOwnerProofReceiptCount === 0
            && calibration.callerSuppliedOwnerAuthorizationAccepted
                === false,
        proofQueueCount: calibration.proofQueueCount,
        ownerContractProofQueueCount:
            calibration.ownerContractProofQueueCount,
        ownerContractCollapseSavedExecutions:
            calibration.ownerContractCollapseSavedExecutions,
        ownerContractQueueIsExactAndNonAuthorizing:
            calibration.ownerContractProofQueue.every(item => (
                item.requiredProof
                    === "execute-exact-producer-result-through-consumer-owner"
                && item.oneContractReceiptMayObserveManyLessonCoordinates
                && item.lessonEdgeCount === item.lessonEdges.length
                && item.lessonNumberAuthority === false
                && item.grammarAuthority === false
            )),
        queueIsOnlyOwnerAlignedEdges:
            calibration.proofQueue.every(item => (
                item.requiredProof
                    === "execute-exact-producer-result-through-consumer-owner"
                && item.ownerRoutePairs.length > 0
                && item.grammarAuthority === false
            )),
        queuePriorityIsMonotonic:
            calibration.proofQueue.every((item, index, queue) => (
                index === 0
                || queue[index - 1].structuralPriority
                    >= item.structuralPriority
            )),
        evidenceDoesNotChangeDiscovery:
            calibration.discoveryRemainsIndependentOfOwnerEvidence,
        grammarAuthority: calibration.grammarAuthority,
    }, {
        kind: "classical-grammatical-rhyme-owner-calibration-frame",
        version: 6,
        edgeCount: inventory.grammaticalRhymeCalibration
            .lessonDiscovery.directRhymeEdgeCount,
        discoveryEdgeCount: inventory.grammaticalRhymeCalibration
            .lessonDiscovery.directRhymeEdgeCount,
        statusCounts: {
            "rhyme-only-no-exact-continuation-contract": 106,
            "lesson-owner-evidence-pending": 393,
            "owner-contract-aligned-proof-required": 146,
            "owner-contract-boundary-or-index-gap": 13,
        },
        everyEdgeKeepsProofBoundary: true,
        noForgedAuthorizationChannel: true,
        proofQueueCount: 146,
        ownerContractProofQueueCount: 22,
        ownerContractCollapseSavedExecutions: 124,
        ownerContractQueueIsExactAndNonAuthorizing: true,
        queueIsOnlyOwnerAlignedEdges: true,
        queuePriorityIsMonotonic: true,
        evidenceDoesNotChangeDiscovery: true,
        grammarAuthority: false,
    });

    const calibratedEdge = (innerLessonNumber, outerLessonNumber) => (
        calibration.calibratedEdges.find(edge => (
            edge.innerLessonNumber === innerLessonNumber
            && edge.outerLessonNumber === outerLessonNumber
        ))
    );
    s.eq("known examples are classified only after the general owner index is built", {
        causativeFrequentative:
            calibratedEdge(24, 27)?.calibrationStatus,
        frequentativeDeverbal37:
            calibratedEdge(27, 37)?.calibrationStatus,
        frequentativeDeverbal38:
            calibratedEdge(27, 38)?.calibrationStatus,
        frequentativeDeverbal39:
            calibratedEdge(27, 39)?.calibrationStatus,
        compoundDenominal:
            calibratedEdge(31, 54)?.calibrationStatus,
        causativeFrequentativeOwnerPairs:
            calibratedEdge(24, 27)?.ownerRoutePairs.length > 0,
        frequentativeDeverbalOwnerPairs:
            [37, 38, 39].every(lessonNumber => (
                calibratedEdge(27, lessonNumber)
                    ?.ownerRoutePairs.some(pair => (
                        pair.innerOperationId
                            === "vnc:derivational-operation"
                        && pair.outerOperationId
                            === "nnc:deverbal-construction"
                    ))
            )),
        futureLessonHasNoInventedOwner:
            calibratedEdge(31, 54)?.outerOperationIds,
    }, {
        causativeFrequentative:
            "owner-contract-aligned-proof-required",
        frequentativeDeverbal37:
            "owner-contract-aligned-proof-required",
        frequentativeDeverbal38:
            "owner-contract-aligned-proof-required",
        frequentativeDeverbal39:
            "owner-contract-aligned-proof-required",
        compoundDenominal: "lesson-owner-evidence-pending",
        causativeFrequentativeOwnerPairs: true,
        frequentativeDeverbalOwnerPairs: true,
        futureLessonHasNoInventedOwner: [],
    });

    const frequentativeReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:derivational-operation",
            args: [{
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
            }],
        });
    const deverbalReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:deverbal-construction",
            args: [{
                constructionKind: "deverbal-action",
                actionKind: "active-action",
                actionSuffix: "liz",
                canonicalVncResult: frequentativeReceipt.canonicalResult,
                subject: "3sg",
                state: "absolutive",
                animacy: "nonanimate",
            }],
        });
    const observations =
        ctx.getClassicalGrammarApplicationRhymeOwnerProofObservations(
            deverbalReceipt
        );
    let copiedInnerDiagnostic = "";
    try {
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:deverbal-construction",
            args: [{
                constructionKind: "deverbal-action",
                actionKind: "active-action",
                actionSuffix: "liz",
                canonicalVncResult: {
                    ...frequentativeReceipt.canonicalResult,
                },
                subject: "3sg",
                state: "absolutive",
                animacy: "nonanimate",
            }],
        });
    } catch (error) {
        copiedInnerDiagnostic = String(error?.message || error);
    }
    const observedCalibration =
        ctx.buildClassicalGrammarApplicationRhymeOwnerCalibration({
            lessonOwnerEvidenceFrames: evidenceFrames,
            exactOwnerProofResults: [deverbalReceipt],
        });
    const observedEdge = (innerLessonNumber, outerLessonNumber) => (
        observedCalibration.calibratedEdges.find(edge => (
            edge.innerLessonNumber === innerLessonNumber
            && edge.outerLessonNumber === outerLessonNumber
        ))
    );
    s.eq("an exact inner Result consumed by the outer owner issues an unforgeable proof observation", {
        producer: frequentativeReceipt.authorizationStatus,
        consumer: deverbalReceipt.authorizationStatus,
        observationCount: observations.length,
        observationValid: observations.every(observation => (
            ctx.isClassicalGrammarApplicationRhymeOwnerProofObservation(
                observation
            )
        )),
        exactInnerIdentity:
            observations[0]?.innerCanonicalResult
                === frequentativeReceipt.canonicalResult,
        exactOuterIdentity:
            observations[0]?.outerCanonicalResult
                === deverbalReceipt.canonicalResult,
        operationPair: observations.map(observation => [
            observation.innerOperationId,
            observation.outerOperationId,
        ]),
        innerResultRoles: observations.map(
            observation => observation.innerResultRole
        ),
        copiedOuterRejected:
            ctx.getClassicalGrammarApplicationRhymeOwnerProofObservations({
                ...deverbalReceipt,
            }).length === 0,
        copiedCanonicalRejected:
            ctx.getClassicalGrammarApplicationRhymeOwnerProofObservations({
                ...deverbalReceipt.canonicalResult,
            }).length === 0,
        copiedInnerDiagnostic,
        forgedObservationRejected:
            ctx.isClassicalGrammarApplicationRhymeOwnerProofObservation({
                ...observations[0],
            }) === false,
        receiptCount: observedCalibration.exactOwnerProofReceiptCount,
        observedEdgeCount:
            observedCalibration.exactOwnerProofObservedEdgeCount,
        remainingQueueCount: observedCalibration.proofQueueCount,
        remainingOwnerContractQueueCount:
            observedCalibration.ownerContractProofQueueCount,
        ownerContractCollapseSavedExecutions:
            observedCalibration.ownerContractCollapseSavedExecutions,
        observedStatusCounts: observedCalibration.statusCounts,
        frequentativeActionStatus:
            observedEdge(27, 37)?.calibrationStatus,
        frequentativePatientive38Status:
            observedEdge(27, 38)?.calibrationStatus,
        frequentativePatientive39Status:
            observedEdge(27, 39)?.calibrationStatus,
        proofNeverAuthorizesGrammar:
            observations.every(observation => (
                observation.grammarAuthority === false
            ))
            && observedCalibration.grammarAuthority === false,
    }, {
        producer: "authorized",
        consumer: "authorized",
        observationCount: 1,
        observationValid: true,
        exactInnerIdentity: true,
        exactOuterIdentity: true,
        operationPair: [[
            "vnc:derivational-operation",
            "nnc:deverbal-construction",
        ]],
        innerResultRoles: ["canonical-result"],
        copiedOuterRejected: true,
        copiedCanonicalRejected: true,
        copiedInnerDiagnostic:
            "classical-grammar-application-request-invalid:forbidden-authority:shapeFormula",
        forgedObservationRejected: true,
        receiptCount: 1,
        observedEdgeCount: 20,
        remainingQueueCount: 126,
        remainingOwnerContractQueueCount: 21,
        ownerContractCollapseSavedExecutions: 124,
        observedStatusCounts: {
            "rhyme-only-no-exact-continuation-contract": 106,
            "lesson-owner-evidence-pending": 393,
            "owner-contract-aligned-proof-required": 126,
            "owner-contract-boundary-or-index-gap": 13,
            "owner-contract-exactly-observed": 20,
        },
        frequentativeActionStatus:
            "owner-contract-exactly-observed",
        frequentativePatientive38Status:
            "owner-contract-exactly-observed",
        frequentativePatientive39Status:
            "owner-contract-exactly-observed",
        proofNeverAuthorizesGrammar: true,
    });

    const impersonalRequest = {
        sourceStem: "mayāna",
        verbClass: "B",
        sourceValence: "intransitive",
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "direct",
        requestedVoice: "impersonal",
        voice: "impersonal",
    };
    const impersonalPreview =
        ctx.evaluateClassicalNahuatlVncApplication(impersonalRequest);
    const impersonalOption = (
        impersonalPreview.controlFrame
            ?.nonactiveOptionInventory?.options || []
    ).find(option => option.suffixFamily === "lō");
    const impersonalReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:application",
            args: [{
                ...impersonalRequest,
                nonactiveOptionId: impersonalOption?.optionId || "",
            }],
        });
    const exactImpersonalResult =
        impersonalReceipt.canonicalResult?.resultFrame || null;
    const nestedProvenance =
        ctx.getClassicalGrammarApplicationRhymeContinuationProvenance(
            exactImpersonalResult
        );
    const impersonalPatientiveRequest = {
        constructionKind: "patientive",
        patientiveSourceFamily: "impersonal-core",
        canonicalVncResult: exactImpersonalResult,
        subject: "3sg",
        state: "absolutive",
        animacy: "nonanimate",
        humanness: "nonhuman",
    };
    const impersonalPatientiveReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:deverbal-construction",
            args: [impersonalPatientiveRequest],
        });
    const nestedObservations =
        ctx.getClassicalGrammarApplicationRhymeOwnerProofObservations(
            impersonalPatientiveReceipt
        );
    const twoContractCalibration =
        ctx.buildClassicalGrammarApplicationRhymeOwnerCalibration({
            lessonOwnerEvidenceFrames: evidenceFrames,
            exactOwnerProofResults: [
                deverbalReceipt,
                impersonalPatientiveReceipt,
            ],
        });
    s.eq("nested owner-issued Results keep their own identity when the surrounding application frame does not continue", {
        producer: impersonalReceipt.authorizationStatus,
        consumer: impersonalPatientiveReceipt.authorizationStatus,
        exactNestedResult:
            exactImpersonalResult
                === impersonalReceipt.canonicalResult?.resultFrame,
        observationCount: nestedObservations.length,
        observationValid: nestedObservations.every(observation => (
            ctx.isClassicalGrammarApplicationRhymeOwnerProofObservation(
                observation
            )
        )),
        operationPair: nestedObservations.map(observation => [
            observation.innerOperationId,
            observation.outerOperationId,
        ]),
        resultRole: nestedObservations.map(
            observation => observation.innerResultRole
        ),
        exactContinuationIdentity:
            nestedObservations[0]?.innerCanonicalResult
                === exactImpersonalResult,
        producerEnvelopeIdentity:
            nestedObservations[0]?.innerProducerCanonicalResult
                === impersonalReceipt.canonicalResult,
        registeredProvenance: nestedProvenance && {
            role: nestedProvenance.resultRole,
            unitKinds: nestedProvenance.continuationUnitKinds,
            exact:
                nestedProvenance.exactResult === exactImpersonalResult,
            envelope:
                nestedProvenance.applicationResult === impersonalReceipt,
        },
        producerReceiptValid:
            ctx.isClassicalGrammarApplicationResult(impersonalReceipt),
        receiptCount:
            twoContractCalibration.exactOwnerProofReceiptCount,
        observedEdgeCount:
            twoContractCalibration.exactOwnerProofObservedEdgeCount,
        remainingLessonQueue:
            twoContractCalibration.proofQueueCount,
        remainingContractQueue:
            twoContractCalibration.ownerContractProofQueueCount,
        statusCounts: twoContractCalibration.statusCounts,
        copiedNestedRejected:
            ctx.getClassicalGrammarApplicationRhymeOwnerProofObservations({
                ...exactImpersonalResult,
            }).length === 0,
    }, {
        producer: "authorized",
        consumer: "authorized",
        exactNestedResult: true,
        observationCount: 1,
        observationValid: true,
        operationPair: [[
            "vnc:application",
            "nnc:deverbal-construction",
        ]],
        resultRole: ["continuation-result"],
        exactContinuationIdentity: true,
        producerEnvelopeIdentity: true,
        registeredProvenance: {
            role: "continuation-result",
            unitKinds: ["vnc-result"],
            exact: true,
            envelope: true,
        },
        producerReceiptValid: true,
        receiptCount: 2,
        observedEdgeCount: 60,
        remainingLessonQueue: 86,
        remainingContractQueue: 20,
        statusCounts: {
            "rhyme-only-no-exact-continuation-contract": 106,
            "lesson-owner-evidence-pending": 393,
            "owner-contract-exactly-observed": 60,
            "owner-contract-boundary-or-index-gap": 13,
            "owner-contract-aligned-proof-required": 86,
        },
        copiedNestedRejected: true,
    });

    const activeVncReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:application",
            args: [{
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
            }],
        });
    const activeVncCapture =
        ctx.captureClassicalGrammarApplicationResult(
            activeVncReceipt.canonicalResult,
            "principal-proof"
        );
    const supplementFrame = ctx.buildClassicalNahuatlAbsolutiveNncFrame(
        "icnīuh",
        {
            subject: "3sg",
            nounClass: "zero",
            animacy: "animate",
        }
    );
    const supplementResult =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:sentence-surface",
            args: [
                supplementFrame.nncSlotFrame,
                { sentenceType: "assertion", polarity: "positive" },
            ],
        });
    const relationTarget = Object.create(ctx);
    const relationApi =
        ctx.createClassicalClauseRelationControllerGlobals(relationTarget);
    Object.defineProperties(
        relationTarget,
        Object.getOwnPropertyDescriptors(relationApi)
    );
    const relationController =
        relationTarget.createClassicalClauseRelationController();
    const principalCapture = relationController.captureCurrentResult(
        "principal",
        activeVncReceipt.canonicalResult
    );
    const supplementCapture = relationController.captureCurrentResult(
        "adjoined",
        supplementResult.canonicalResult
    );
    const supplementationContract = relationController.buildDecisionContract({
        relation: "supplementation",
        supplementationReferenceMode: "shared",
        supplementationContactRole: "subject",
        supplementationHeadRole: "subject",
        supplementationOrder: "principal-first",
    });
    const supplementationResult = relationController.compose({
        relation: "supplementation",
        supplementationReferenceMode: "shared",
        supplementationContactRole: "subject",
        supplementationHeadRole: "subject",
        supplementationOrder: "principal-first",
    });
    const supplementationObservations =
        ctx.getClassicalGrammarApplicationRhymeOwnerProofObservations(
            supplementationResult.canonicalResult
        );
    const threeContractCalibration =
        ctx.buildClassicalGrammarApplicationRhymeOwnerCalibration({
            lessonOwnerEvidenceFrames: evidenceFrames,
            exactOwnerProofResults: [
                deverbalReceipt,
                impersonalPatientiveReceipt,
                supplementationResult.canonicalResult,
            ],
        });
    s.eq("clause composition reports both exact owner-issued inputs without giving proof data grammar authority", {
        captures: [
            principalCapture.authorizationStatus,
            supplementCapture.authorizationStatus,
        ],
        contract: supplementationContract.authorizationStatus,
        composition: supplementationResult.authorizationStatus,
        observationPairs: supplementationObservations.map(observation => [
            observation.innerOperationId,
            observation.outerOperationId,
            observation.innerResultRole,
        ]),
        exactPrincipalIdentity:
            supplementationObservations.some(observation => (
                observation.innerCanonicalResult
                    === activeVncReceipt.canonicalResult
            )),
        exactSupplementIdentity:
            supplementationObservations.some(observation => (
                observation.innerCanonicalResult
                    === supplementResult.canonicalResult
            )),
        directCapture: activeVncCapture && {
            role: activeVncCapture.capturedResultRole,
            exact:
                activeVncCapture.canonicalResult
                    === activeVncReceipt.canonicalResult,
        },
        receiptCount:
            threeContractCalibration.exactOwnerProofReceiptCount,
        observedEdges:
            threeContractCalibration.exactOwnerProofObservedEdgeCount,
        remainingLessonQueue:
            threeContractCalibration.proofQueueCount,
        remainingContractQueue:
            threeContractCalibration.ownerContractProofQueueCount,
        statusCounts: threeContractCalibration.statusCounts,
    }, {
        captures: ["authorized", "authorized"],
        contract: "authorized",
        composition: "authorized",
        observationPairs: [
            [
                "vnc:application",
                "sentence:supplementation",
                "canonical-result",
            ],
            [
                "nnc:sentence-surface",
                "sentence:supplementation",
                "canonical-result",
            ],
        ],
        exactPrincipalIdentity: true,
        exactSupplementIdentity: true,
        directCapture: {
            role: "canonical-result",
            exact: true,
        },
        receiptCount: 4,
        observedEdges: 95,
        remainingLessonQueue: 51,
        remainingContractQueue: 18,
        statusCounts: {
            "rhyme-only-no-exact-continuation-contract": 106,
            "lesson-owner-evidence-pending": 393,
            "owner-contract-exactly-observed": 95,
            "owner-contract-boundary-or-index-gap": 13,
            "owner-contract-aligned-proof-required": 51,
        },
    });

    return s;
}

module.exports = { run };
