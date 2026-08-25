"use strict";

const { createSuite } = require("./runner");
const {
    createClassicalCrossLessonCompositionalClosureReporter,
} = require(
    "./helpers/classical_cross_lesson_compositional_closure_reporter"
);

function operationIds(records = []) {
    return records.map(record => record.operationId);
}

function makeSyntheticProof() {
    const navigators = new WeakSet();
    const graphs = new WeakSet();
    const observations = new WeakSet();
    const ownerProofs = new WeakSet();
    const innerCanonicalResult = Object.freeze({
        kind: "synthetic-inner-result",
    });
    const outerCanonicalResult = Object.freeze({
        kind: "synthetic-outer-result",
    });
    const innerApplicationResult = Object.freeze({
        operationId: "op:inner",
        outputKind: "synthetic-inner-result",
        canonicalResult: innerCanonicalResult,
    });
    const outerApplicationResult = Object.freeze({
        operationId: "op:outer",
        outputKind: "synthetic-outer-result",
        canonicalResult: outerCanonicalResult,
    });
    const navigator = Object.freeze({
        inputRole: "result",
        exactResult: innerCanonicalResult,
        applicationResult: innerApplicationResult,
        operations: Object.freeze([
            Object.freeze({
                operationId: "op:outer",
                availabilityStatus: "available",
                availabilityReason: "canonical-owner-accepted",
                availabilityAuthority: "canonical-owner",
                ownerInputAcceptanceProven: true,
            }),
            Object.freeze({
                operationId: "op:open",
                availabilityStatus: "available",
                availabilityReason: "canonical-owner-accepted",
                availabilityAuthority: "canonical-owner",
                ownerInputAcceptanceProven: true,
            }),
            Object.freeze({
                operationId: "op:choice",
                availabilityStatus: "missing-prerequisite",
                availabilityReason: "owner-choice-required",
                availabilityAuthority: "canonical-owner",
                ownerInputAcceptanceProven: true,
                requiredChoiceIds: Object.freeze(["variant"]),
            }),
            Object.freeze({
                operationId: "op:result",
                availabilityStatus: "missing-prerequisite",
                availabilityReason: "owner-result-required",
                availabilityAuthority: "canonical-owner",
                requiredResultRoles: Object.freeze(["adjoined"]),
            }),
            Object.freeze({
                operationId: "op:incompatible",
                availabilityStatus: "incompatible",
                availabilityReason: "canonical-owner-rejected",
                availabilityAuthority: "canonical-owner-rejection",
                ownerRejectionProven: true,
            }),
            Object.freeze({
                operationId: "op:gap",
                availabilityStatus: "missing-prerequisite",
                availabilityReason: "capability-unavailable",
                availabilityAuthority: "canonical-owner",
                capabilityInstalled: false,
            }),
            Object.freeze({
                operationId: "op:other-input",
                availabilityStatus: "missing-prerequisite",
                availabilityReason: "different-owner-issued-source-required",
                availabilityAuthority: "canonical-owner",
            }),
        ]),
    });
    const graph = Object.freeze({
        authorizationStatus: "observed",
        terminalApplicationResult: outerApplicationResult,
        terminalCanonicalResult: outerCanonicalResult,
        nodes: Object.freeze([
            Object.freeze({
                operationId: "op:inner",
                applicationResult: innerApplicationResult,
                canonicalResult: innerCanonicalResult,
                exactApplicationResultIdentityValidated: true,
                exactCanonicalResultIdentityValidated: true,
            }),
            Object.freeze({
                operationId: "op:outer",
                applicationResult: outerApplicationResult,
                canonicalResult: outerCanonicalResult,
                exactApplicationResultIdentityValidated: true,
                exactCanonicalResultIdentityValidated: true,
            }),
        ]),
        edges: Object.freeze([
            Object.freeze({
                innerApplicationResult,
                outerApplicationResult,
                continuationEvidenceKind: "topology-owner-proof",
                exactInnerResultIdentityObservedInOuterArguments: true,
                sharedUnitKinds: Object.freeze(["synthetic-result"]),
                topologyCompatibilityObserved: true,
                exactContinuationSlotValidated: false,
                ownerContinuationProjectionValidated: false,
            }),
        ]),
    });
    const ownerProof = Object.freeze({
        innerApplicationResult,
        outerApplicationResult,
        exactInnerResultIdentityObservedInOuterArguments: true,
        bothResultsOwnerValidated: true,
        topologyCompatibilityObserved: true,
    });
    const observation = Object.freeze({
        applicationResult: outerApplicationResult,
        canonicalResult: outerCanonicalResult,
        layerGraph: graph,
    });
    navigators.add(navigator);
    graphs.add(graph);
    observations.add(observation);
    ownerProofs.add(ownerProof);

    const reporter =
        createClassicalCrossLessonCompositionalClosureReporter({
            isCapabilityNavigator: value => navigators.has(value),
            isApplicationAtlasObservation: value => observations.has(value),
            isApplicationLayerGraph: value => graphs.has(value),
            isOwnerProofObservation: value => ownerProofs.has(value),
            getOwnerProofObservations: applicationResult => (
                applicationResult === outerApplicationResult
                    ? Object.freeze([ownerProof])
                    : Object.freeze([])
            ),
            getOperationAtomIds: operationId => (
                operationId === "op:inner"
                    ? Object.freeze(["atom:inner"])
                    : Object.freeze([])
            ),
        });
    return {
        reporter,
        navigator,
        observation,
        innerApplicationResult,
        outerApplicationResult,
    };
}

function issueDirectVnc(ctx) {
    const receipt = ctx.executeClassicalGrammarApplicationRequest({
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
    if (receipt?.authorizationStatus !== "authorized") {
        throw new Error(
            `cross-lesson-reporter:vnc:${receipt?.blockReason || "blocked"}`
        );
    }
    return receipt;
}

function issueContinuation(ctx, sourceApplicationResult) {
    const exactResult = sourceApplicationResult.canonicalResult?.resultFrame;
    const projection =
        ctx.getClassicalNahuatlVncContinuationSourceConstituents(
            exactResult
        );
    if (!projection) {
        throw new Error("cross-lesson-reporter:projection-required");
    }
    const receipt = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:derivational-operation",
        args: [{
            sourceApplicationFrame: sourceApplicationResult.canonicalResult,
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
        }],
    });
    if (receipt?.authorizationStatus !== "authorized") {
        throw new Error(
            "cross-lesson-reporter:derivation:"
            + `${receipt?.blockReason || "blocked"}`
        );
    }
    return receipt;
}

function run(ctx) {
    const s = createSuite(
        "classical_cross_lesson_compositional_closure_reporter"
    );
    const synthetic = makeSyntheticProof();

    s.eq(
        "the reporter accepts only issued navigator, layer-graph, and owner-proof identities",
        {
            copiedNavigatorRejected: synthetic.reporter.observeNavigator({
                ...synthetic.navigator,
            }) === false,
            exactNavigatorAccepted:
                synthetic.reporter.observeNavigator(synthetic.navigator),
            copiedObservationRejected:
                synthetic.reporter.observeApplicationObservation({
                    ...synthetic.observation,
                }) === false,
            exactObservationAccepted:
                synthetic.reporter.observeApplicationObservation(
                    synthetic.observation
                ),
        },
        {
            copiedNavigatorRejected: true,
            exactNavigatorAccepted: true,
            copiedObservationRejected: true,
            exactObservationAccepted: true,
        }
    );

    const syntheticReport = synthetic.reporter.snapshot();
    const syntheticWitness = syntheticReport.witnessedConnections[0];
    const recoveredSyntheticWitness = synthetic.reporter.recoverWitness(
        syntheticWitness.witnessId
    );
    s.eq(
        "the report separates every closure disposition without converting evidence into grammar authority",
        {
            witnessed: operationIds(syntheticReport.witnessedConnections),
            enterableUnwitnessed: operationIds(
                syntheticReport.enterableUnwitnessedConnections
            ),
            awaitingChoiceOrResult:
                syntheticReport.awaitingChoiceOrResultConnections.map(
                    record => [record.operationId, record.awaitingKind]
                ),
            incompatible: operationIds(
                syntheticReport.incompatibleConnections
            ),
            implementationGap: operationIds(
                syntheticReport.implementationGaps
            ),
            unmappedEvidence: syntheticReport.unmappedEvidence.map(
                record => record.operationId
            ),
            chain: syntheticReport.witnessedChains[0]?.operationIds,
            recoveredExactPair: [
                recoveredSyntheticWitness?.innerApplicationResult
                    === synthetic.innerApplicationResult,
                recoveredSyntheticWitness?.outerApplicationResult
                    === synthetic.outerApplicationResult,
            ],
            exactOnly: syntheticReport.exactApplicationLayerGraphsOnly,
            ownerProofRequired:
                syntheticReport.ownerProofRequiredForTopologyEdges,
            unitKindsUsed: syntheticReport.unitKindReachabilityUsed,
            historyUsed:
                syntheticReport.workspaceHistoryAcceptedAsEvidence,
            grammarAuthority: syntheticReport.grammarAuthority,
            valid: synthetic.reporter.isSnapshot(syntheticReport),
            frozen: Object.isFrozen(syntheticReport)
                && Object.isFrozen(syntheticReport.connections),
        },
        {
            witnessed: ["op:outer"],
            enterableUnwitnessed: ["op:open"],
            awaitingChoiceOrResult: [
                ["op:choice", "choice"],
                ["op:result", "result"],
                ["op:other-input", "result"],
            ],
            incompatible: ["op:incompatible"],
            implementationGap: ["op:gap"],
            unmappedEvidence: ["op:outer"],
            chain: ["op:inner", "op:outer"],
            recoveredExactPair: [true, true],
            exactOnly: true,
            ownerProofRequired: true,
            unitKindsUsed: false,
            historyUsed: false,
            grammarAuthority: false,
            valid: true,
            frozen: true,
        }
    );

    const exactReporter =
        createClassicalCrossLessonCompositionalClosureReporter({
            isCapabilityNavigator:
                ctx.isClassicalGrammarApplicationCapabilityNavigator,
            isApplicationAtlasObservation:
                ctx.isClassicalGrammarApplicationAtlasObservation,
            isApplicationLayerGraph:
                ctx.isClassicalGrammarApplicationLayerGraph,
            isOwnerProofObservation:
                ctx.isClassicalGrammarApplicationRhymeOwnerProofObservation,
            getOwnerProofObservations:
                ctx.getClassicalGrammarApplicationRhymeOwnerProofObservations,
            getOperationAtomIds: operationId => Object.freeze([
                `focused-receipt:${operationId}`,
            ]),
        });
    const activeVnc = issueDirectVnc(ctx);
    const exactNavigator =
        ctx.getClassicalGrammarApplicationCapabilityNavigator(activeVnc);
    const derivedVnc = issueContinuation(ctx, activeVnc);
    const exactObservation =
        ctx.getClassicalGrammarApplicationAtlasObservation(derivedVnc);
    const navigatorAccepted = exactReporter.observeNavigator(exactNavigator);
    const observationAccepted =
        exactReporter.observeApplicationObservation(exactObservation);
    const exactReport = exactReporter.snapshot();
    const exactWitness = exactReport.witnessedConnections.find(record => (
        record.operationId === "vnc:derivational-operation"
    ));
    const recoveredExactWitness = exactReporter.recoverWitness(
        exactWitness?.witnessId
    );

    s.eq(
        "one real owner-issued Result continuation becomes an exact witnessed chain",
        {
            navigatorAccepted,
            observationAccepted,
            applicationStatus: activeVnc.authorizationStatus,
            continuationStatus: derivedVnc.authorizationStatus,
            witnessed: Boolean(exactWitness),
            exactPair: [
                recoveredExactWitness?.innerApplicationResult === activeVnc,
                recoveredExactWitness?.outerApplicationResult === derivedVnc,
            ],
            chain: exactReport.witnessedChains[0]?.operationIds,
            edgeCount: exactReport.witnessedChains[0]?.edgeCount,
            unitKindsUsed: exactReport.unitKindReachabilityUsed,
            historyUsed: exactReport.workspaceHistoryAcceptedAsEvidence,
            grammarAuthority: exactReport.grammarAuthority,
            unmappedCount: exactReport.unmappedEvidence.length,
        },
        {
            navigatorAccepted: true,
            observationAccepted: true,
            applicationStatus: "authorized",
            continuationStatus: "authorized",
            witnessed: true,
            exactPair: [true, true],
            chain: ["vnc:application", "vnc:derivational-operation"],
            edgeCount: 1,
            unitKindsUsed: false,
            historyUsed: false,
            grammarAuthority: false,
            unmappedCount: 0,
        }
    );

    return s;
}

module.exports = { run };
