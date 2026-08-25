"use strict";

const { createSuite } = require("./runner");

const PREVIOUSLY_OMITTED_EXACT_CONTRACT_EDGES = Object.freeze([
    ["vnc:sentence-result", "nnc:adjectival-modification", "clause-result"],
    ["sentence:adverbial-adjunction", "nnc:adjectival-modification", "clause-result"],
    ["sentence:adverbial-adjunction", "nnc:adverbial", "clause-result"],
    ["sentence:particle-adjunction", "nnc:adjectival-modification", "clause-result"],
    ["sentence:particle-adjunction", "nnc:adverbial", "clause-result"],
    ["particle:result", "sentence:adverbial-adjunction", "particle-result"],
    ["particle:result", "sentence:particle-adjunction", "particle-result"],
    ["particle:result", "sentence:supplementation", "particle-result"],
    ["particle:result", "clause:adverbial-adjunction", "particle-result"],
    ["particle:negative-selection", "sentence:adverbial-adjunction", "particle-result"],
    ["particle:negative-selection", "sentence:particle-adjunction", "particle-result"],
    ["particle:negative-selection", "sentence:supplementation", "particle-result"],
    ["particle:negative-selection", "clause:adverbial-adjunction", "particle-result"],
    ["vnc:ordered-voice-application", "nnc:adjectival-modification", "vnc-result"],
    ["vnc:ordered-voice-application", "nnc:personal-name", "vnc-result"],
    ["vnc:derivational-operation", "nnc:adjectival-modification", "vnc-result"],
    ["vnc:derivational-operation", "nnc:personal-name", "vnc-result"],
    ["vnc:application", "nnc:adjectival-modification", "vnc-result"],
    ["vnc:application", "nnc:personal-name", "vnc-result"],
    ["sentence:supplementation", "nnc:adjectival-modification", "clause-result"],
    ["sentence:supplementation", "nnc:adverbial", "clause-result"],
    ["clause:adverbial-adjunction", "nnc:adjectival-modification", "clause-result"],
    ["clause:adverbial-adjunction", "nnc:adverbial", "clause-result"],
    ["clause:composition", "nnc:adjectival-modification", "clause-result"],
    ["clause:composition", "nnc:adverbial", "clause-result"],
    ["clause:comparison", "nnc:adjectival-modification", "clause-result"],
    ["clause:comparison", "nnc:adverbial", "clause-result"],
    ["vnc:denominal", "nnc:adjectival-modification", "vnc-result"],
    ["vnc:denominal", "nnc:personal-name", "vnc-result"],
]);

function edgeKey(innerOperationId, outerOperationId) {
    return `${innerOperationId}\u2192${outerOperationId}`;
}

function containsExactIdentity(root, exactValue, seen = new Set()) {
    if (root === exactValue) return true;
    if (!root || typeof root !== "object" || seen.has(root)) return false;
    seen.add(root);
    return Reflect.ownKeys(root).some(propertyKey => {
        const descriptor = Object.getOwnPropertyDescriptor(root, propertyKey);
        return Boolean(
            descriptor
            && Object.prototype.hasOwnProperty.call(descriptor, "value")
            && containsExactIdentity(descriptor.value, exactValue, seen)
        );
    });
}

function reachableOperationIds(startOperationIds, edges) {
    const reached = new Set(startOperationIds);
    const queue = [...startOperationIds];
    while (queue.length) {
        const current = queue.shift();
        edges.filter(edge => edge.innerOperationId === current)
            .forEach(edge => {
                if (reached.has(edge.outerOperationId)) return;
                reached.add(edge.outerOperationId);
                queue.push(edge.outerOperationId);
            });
    }
    return reached;
}

function run(ctx = {}) {
    const suite = createSuite(
        "classical_cross_lesson_compositional_topology"
    );
    const inventory = ctx.getClassicalGrammarApplicationInventory();
    const topology = inventory.grammaticalRhymeCalibration.topology;
    const continuationOperations = inventory.operations.filter(operation => (
        operation.rhymeRoutePlaneFrame.compatibilitySignature
            .continuationTypeContractDeclared === true
    ));
    const contractEdges = continuationOperations.flatMap(producer => (
        continuationOperations.flatMap(consumer => {
            if (producer === consumer) return [];
            const producerSignature =
                producer.rhymeRoutePlaneFrame.compatibilitySignature;
            const consumerSignature =
                consumer.rhymeRoutePlaneFrame.compatibilitySignature;
            const sharedUnitKinds = producerSignature
                .exactContinuationOutputUnitKinds.filter(unitKind => (
                    consumerSignature.exactContinuationInputUnitKinds
                        .includes(unitKind)
                ));
            return sharedUnitKinds.length
                ? [{
                    innerOperationId: producer.operationId,
                    outerOperationId: consumer.operationId,
                    sharedUnitKinds,
                }]
                : [];
        })
    ));
    const contractEdgeKeys = contractEdges.map(edge => edgeKey(
        edge.innerOperationId,
        edge.outerOperationId
    )).sort();
    const topologyEdgeKeys = topology.exactContinuationEdges.map(edge => (
        edgeKey(edge.innerOperationId, edge.outerOperationId)
    )).sort();

    suite.eq(
        "the topology contains every non-self exact continuation contract independently of the broader inferred seam",
        {
            operationNodes: continuationOperations.length,
            contractPairs: contractEdges.length,
            topologyPairs: topology.exactContinuationEdgeCount,
            contractMemberships: contractEdges.reduce(
                (count, edge) => count + edge.sharedUnitKinds.length,
                0
            ),
            topologyMemberships: topology.exactContinuationEdges.reduce(
                (count, edge) => count + edge.sharedUnitKinds.length,
                0
            ),
            pairIdentity: contractEdgeKeys.join("|")
                === topologyEdgeKeys.join("|"),
            selfEdges: topology.exactContinuationEdges.filter(edge => (
                edge.innerOperationId === edge.outerOperationId
            )).length,
            allCandidateOnly: topology.exactContinuationEdges.every(edge => (
                edge.candidateOnlyUntilConsumerOwnerAuthorizesExactResult
                    === true
                && edge.exactOwnerValidationRequired === true
                && edge.grammarAuthority === false
            )),
        },
        {
            operationNodes: 25,
            contractPairs: 252,
            topologyPairs: 252,
            contractMemberships: 278,
            topologyMemberships: 278,
            pairIdentity: true,
            selfEdges: 0,
            allCandidateOnly: true,
        }
    );

    const topologyEdgeByKey = new Map(topology.exactContinuationEdges.map(
        edge => [edgeKey(edge.innerOperationId, edge.outerOperationId), edge]
    ));
    suite.eq(
        "all 29 exact-contract lanes formerly hidden by the generic seam gate are represented without authorizing them",
        {
            declaredCount: PREVIOUSLY_OMITTED_EXACT_CONTRACT_EDGES.length,
            missing: PREVIOUSLY_OMITTED_EXACT_CONTRACT_EDGES.filter(
                ([innerOperationId, outerOperationId, unitKind]) => {
                    const edge = topologyEdgeByKey.get(edgeKey(
                        innerOperationId,
                        outerOperationId
                    ));
                    return !edge || !edge.sharedUnitKinds.includes(unitKind);
                }
            ),
            authorityViolations:
                PREVIOUSLY_OMITTED_EXACT_CONTRACT_EDGES.filter(
                    ([innerOperationId, outerOperationId]) => {
                        const edge = topologyEdgeByKey.get(edgeKey(
                            innerOperationId,
                            outerOperationId
                        ));
                        return edge?.grammarAuthority !== false
                            || edge?.exactOwnerValidationRequired !== true
                            || edge
                                ?.candidateOnlyUntilConsumerOwnerAuthorizesExactResult
                                !== true;
                    }
                ),
        },
        {
            declaredCount: 29,
            missing: [],
            authorityViolations: [],
        }
    );

    const projectionEdges = topology.exactNestedCarrierProjectionEdges;
    const vncDiagramProjection = projectionEdges.find(edge => (
        edge.innerOperationId === "vnc:application"
        && edge.outerOperationId === "vnc:diagram"
    ));
    const entrances = [
        "nnc:ordinary",
        "nnc:pronominal",
        "vnc:application",
        "particle:result",
    ];
    const exactOnlyReachable = reachableOperationIds(
        entrances,
        topology.exactContinuationEdges
    );
    const projectionReachable = reachableOperationIds(
        entrances,
        [
            ...topology.exactContinuationEdges,
            ...projectionEdges,
        ]
    );
    suite.eq(
        "the separate nested-carrier projection represents VNC diagram reachability without changing the 252 continuation edges",
        {
            projectionCount:
                topology.exactNestedCarrierProjectionEdgeCount,
            vncDiagramProducerCount: projectionEdges.filter(edge => (
                edge.outerOperationId === "vnc:diagram"
            )).length,
            applicationProjection: vncDiagramProjection && {
                sourceUnitKind: vncDiagramProjection.sourceUnitKind,
                nestedCarrierUnitKind:
                    vncDiagramProjection.nestedCarrierUnitKind,
                sharedFamilyUnitKinds:
                    vncDiagramProjection.sharedFamilyUnitKinds,
                mode: vncDiagramProjection.projectionMode,
                exactCarrierRequired:
                    vncDiagramProjection.exactNestedCarrierIdentityRequired,
                candidateOnly:
                    vncDiagramProjection
                        .candidateOnlyUntilExactNestedCarrierObserved,
                ownerRequired:
                    vncDiagramProjection.exactOwnerValidationRequired,
                grammarAuthority: vncDiagramProjection.grammarAuthority,
            },
            exactOnlyReachable: exactOnlyReachable.size,
            exactOnlyMissing: continuationOperations
                .map(operation => operation.operationId)
                .filter(operationId => !exactOnlyReachable.has(operationId)),
            projectedReachable: projectionReachable.size,
            projectedMissing: continuationOperations
                .map(operation => operation.operationId)
                .filter(operationId => !projectionReachable.has(operationId)),
            exactPairCountUnchanged: topology.exactContinuationEdgeCount,
        },
        {
            projectionCount: 6,
            vncDiagramProducerCount: 6,
            applicationProjection: {
                sourceUnitKind: "vnc-result",
                nestedCarrierUnitKind: "vnc-diagram-slot-frame",
                sharedFamilyUnitKinds: ["vnc-result"],
                mode:
                    "exact-owner-issued-nested-carrier-direct-projection",
                exactCarrierRequired: true,
                candidateOnly: true,
                ownerRequired: true,
                grammarAuthority: false,
            },
            exactOnlyReachable: 24,
            exactOnlyMissing: ["vnc:diagram"],
            projectedReachable: 25,
            projectedMissing: [],
            exactPairCountUnchanged: 252,
        }
    );

    const vncReceipt = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:application",
        args: [{
            sourceStem: "ahci",
            verbClass: "A",
            sourceValence: "intransitive",
            subject: "3sg",
            mood: "indicative",
            tense: "present",
            requestedDerivation: "direct",
            requestedVoice: "active",
            voice: "active",
        }],
    });
    const navigator =
        ctx.getClassicalGrammarApplicationCapabilityNavigator(vncReceipt);
    const diagramOperation = navigator.operations.find(operation => (
        operation.operationId === "vnc:diagram"
    ));
    const exactNestedCarrier = diagramOperation.ownerProbeInputResult;
    const nestedCarrierProvenance =
        ctx.getClassicalGrammarApplicationRhymeContinuationProvenance(
            exactNestedCarrier
        );
    suite.eq(
        "one exact VNC Result proves the represented projection through its nested owner-issued carrier and direct diagram owner",
        {
            receipt: [
                vncReceipt.authorizationStatus,
                ctx.isClassicalGrammarApplicationResult(vncReceipt),
            ],
            navigator:
                ctx.isClassicalGrammarApplicationCapabilityNavigator(
                    navigator
                ),
            diagram: [
                diagramOperation.availabilityStatus,
                diagramOperation.availabilityAuthority,
                diagramOperation.ownerProbeInputResultRole,
                diagramOperation.ownerProbeInputUnitKinds,
                diagramOperation
                    .ownerProbeInputExactContinuationResultIdentity,
                diagramOperation.ownerProbeResultKind,
                diagramOperation.ownerProbeResultValidated,
            ],
            exactCarrier: [
                exactNestedCarrier?.kind,
                exactNestedCarrier !== vncReceipt.canonicalResult,
                containsExactIdentity(
                    vncReceipt.canonicalResult,
                    exactNestedCarrier
                ),
            ],
            provenance: nestedCarrierProvenance && [
                nestedCarrierProvenance.applicationResult === vncReceipt,
                nestedCarrierProvenance.exactResult === exactNestedCarrier,
                nestedCarrierProvenance.resultRole,
                nestedCarrierProvenance.continuationUnitKinds,
                nestedCarrierProvenance.grammarAuthority,
            ],
        },
        {
            receipt: ["authorized", true],
            navigator: true,
            diagram: [
                "available",
                "canonical-owner-direct-probe",
                "continuation-result",
                ["vnc-diagram-slot-frame"],
                true,
                "classical-nahuatl-vnc-diagrammatic-frame",
                true,
            ],
            exactCarrier: [
                "classical-nahuatl-vnc-slot-frame",
                true,
                true,
            ],
            provenance: [
                true,
                true,
                "continuation-result",
                ["vnc-diagram-slot-frame"],
                false,
            ],
        }
    );

    return suite;
}

module.exports = { run };
