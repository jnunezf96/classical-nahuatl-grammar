"use strict";

const REPORT_KIND =
    "classical-cross-lesson-compositional-closure-report";

function freezeList(values = []) {
    return Object.freeze([...(Array.isArray(values) ? values : [])]);
}

function uniqueText(values = []) {
    return freezeList([...new Set((Array.isArray(values) ? values : [])
        .map(value => String(value || "").trim())
        .filter(Boolean))]);
}

function explicitImplementationFailure(operation = null) {
    const reason = String(operation?.availabilityReason || "");
    return Boolean(
        operation?.capabilityInstalled === false
        || operation?.installedCapabilityState === "missing"
        || operation?.ownerBindingThrew === true
        || operation?.ownerProbeThrew === true
        || operation?.ownerPreflightThrew === true
        || (
            operation?.ownerBindingContractDeclared === true
            && operation?.ownerBindingCapabilitiesInstalled === false
        )
        || (
            operation?.directOwnerProbeInstalled === true
            && (
                operation?.ownerProbeCapabilityInstalled === false
                || operation?.ownerProbeValidatorsInstalled === false
            )
        )
        || (
            operation?.sourceContractDeclared === true
            && (
                operation?.sourceValidatorsInstalled === false
                || operation?.ownerPreflightCapabilityInstalled === false
                || operation?.ownerPreflightValidatorsInstalled === false
            )
        )
        || operation?.allOutputsHaveOwnerValidators === false
        || operation?.allOwnerValidatorsInstalled === false
        || /(?:missing-validator|unavailable|threw)/u.test(reason)
    );
}

function ownerApproved(operation = null) {
    return Boolean(
        operation?.availabilityStatus === "available"
        && operation?.ownerInputAcceptanceProven === true
        && String(operation?.availabilityAuthority || "")
        && operation.availabilityAuthority !== "none"
    );
}

function ownerRejected(operation = null) {
    return Boolean(
        operation?.availabilityStatus === "incompatible"
        && operation?.ownerRejectionProven === true
        && String(operation?.availabilityAuthority || "")
        && operation.availabilityAuthority !== "none"
    );
}

function createClassicalCrossLessonCompositionalClosureReporter({
    isCapabilityNavigator = null,
    isApplicationAtlasObservation = null,
    isApplicationLayerGraph = null,
    isOwnerProofObservation = null,
    getOwnerProofObservations = null,
    getOperationAtomIds = () => Object.freeze([]),
} = {}) {
    if (
        typeof isCapabilityNavigator !== "function"
        || typeof isApplicationAtlasObservation !== "function"
        || typeof isApplicationLayerGraph !== "function"
        || typeof isOwnerProofObservation !== "function"
        || typeof getOwnerProofObservations !== "function"
        || typeof getOperationAtomIds !== "function"
    ) {
        throw new TypeError(
            "cross-lesson-closure-exact-observer-contract-required"
        );
    }

    const observedNavigatorIdentities = new WeakSet();
    const observedObservationIdentities = new WeakSet();
    const exactInputIds = new WeakMap();
    const applicationIds = new WeakMap();
    const navigatorRecords = [];
    const applicationRecords = [];
    const witnessRecords = [];
    const chainRecords = [];
    const witnessIdentities = new Map();
    const chainIdentities = new Map();
    const issuedSnapshots = new WeakSet();
    let exactInputSequence = 0;
    let applicationSequence = 0;
    let witnessSequence = 0;
    let chainSequence = 0;
    let revision = 0;

    function exactInputId(value = null) {
        if (!value || typeof value !== "object") return "";
        const existing = exactInputIds.get(value);
        if (existing) return existing;
        exactInputSequence += 1;
        const id = `exact-input-${exactInputSequence}`;
        exactInputIds.set(value, id);
        return id;
    }

    function applicationId(value = null) {
        if (!value || typeof value !== "object") return "";
        const existing = applicationIds.get(value);
        if (existing) return existing;
        applicationSequence += 1;
        const id = `application-${applicationSequence}`;
        applicationIds.set(value, id);
        applicationRecords.push(Object.freeze({
            applicationId: id,
            operationId: String(value.operationId || ""),
            outputKind: String(value.outputKind || ""),
            exactApplicationResult: value,
        }));
        return id;
    }

    function operationAtomIds(operationId = "") {
        try {
            const atomIds = getOperationAtomIds(String(operationId || ""));
            return uniqueText(atomIds);
        } catch {
            return Object.freeze([]);
        }
    }

    function observeNavigator(frame = null) {
        if (
            !isCapabilityNavigator(frame)
            || observedNavigatorIdentities.has(frame)
        ) return false;
        const exactInput = frame.exactSource || frame.exactResult || null;
        const inputId = exactInputId(exactInput);
        if (!inputId || !Array.isArray(frame.operations)) return false;
        navigatorRecords.push(Object.freeze({
            inputId,
            inputRole: String(frame.inputRole || ""),
            exactInput,
            inputApplicationResult:
                frame.applicationResult && typeof frame.applicationResult === "object"
                    ? frame.applicationResult
                    : null,
            operations: frame.operations,
        }));
        observedNavigatorIdentities.add(frame);
        revision += 1;
        return true;
    }

    function matchingOwnerProof(edge, ownerProofs) {
        return ownerProofs.find(proof => Boolean(
            isOwnerProofObservation(proof)
            && proof.innerApplicationResult === edge.innerApplicationResult
            && proof.outerApplicationResult === edge.outerApplicationResult
            && proof.exactInnerResultIdentityObservedInOuterArguments === true
            && proof.bothResultsOwnerValidated === true
            && proof.topologyCompatibilityObserved === true
        )) || null;
    }

    function existingWitness(edge) {
        return witnessRecords.find(record => {
            const identity = witnessIdentities.get(record.witnessId);
            return identity?.innerApplicationResult
                    === edge.innerApplicationResult
                && identity?.outerApplicationResult
                    === edge.outerApplicationResult;
        }) || null;
    }

    function exactEdgeCanBeObserved(edge, ownerProofs) {
        if (
            !edge?.innerApplicationResult
            || !edge?.outerApplicationResult
            || edge.innerApplicationResult === edge.outerApplicationResult
            || edge.exactInnerResultIdentityObservedInOuterArguments !== true
        ) return false;
        return Boolean(
            (
                edge.continuationEvidenceKind === "exact-instance-continuation"
                && edge.exactContinuationSlotValidated === true
                && edge.ownerContinuationProjectionValidated === true
            )
            || (
                edge.continuationEvidenceKind === "topology-owner-proof"
                && matchingOwnerProof(edge, ownerProofs)
            )
        );
    }

    function observeExactEdge({
        edge,
        graph,
        observation,
        ownerProofs,
    }) {
        if (!exactEdgeCanBeObserved(edge, ownerProofs)) return null;
        const ownerProof = matchingOwnerProof(edge, ownerProofs);
        const exactInstanceContinuation = Boolean(
            edge.continuationEvidenceKind === "exact-instance-continuation"
            && edge.exactContinuationSlotValidated === true
            && edge.ownerContinuationProjectionValidated === true
        );
        const topologyOwnerProof = Boolean(
            edge.continuationEvidenceKind === "topology-owner-proof"
            && ownerProof
        );
        if (!exactInstanceContinuation && !topologyOwnerProof) return null;
        const existing = existingWitness(edge);
        if (existing) return existing;
        witnessSequence += 1;
        const witnessId = `witness-${witnessSequence}`;
        const innerApplicationId = applicationId(edge.innerApplicationResult);
        const outerApplicationId = applicationId(edge.outerApplicationResult);
        const innerOperationId = String(
            edge.innerApplicationResult.operationId || ""
        );
        const outerOperationId = String(
            edge.outerApplicationResult.operationId || ""
        );
        const record = Object.freeze({
            witnessId,
            innerApplicationId,
            outerApplicationId,
            innerOperationId,
            outerOperationId,
            continuationEvidenceKind: edge.continuationEvidenceKind,
            sharedUnitKinds: uniqueText(edge.sharedUnitKinds),
            innerAtomIds: operationAtomIds(innerOperationId),
            outerAtomIds: operationAtomIds(outerOperationId),
            exactInnerResultIdentityObservedInOuterArguments: true,
            bothResultsOwnerValidated:
                exactInstanceContinuation || ownerProof?.bothResultsOwnerValidated === true,
            exactChainEvidence: true,
            grammarAuthority: false,
        });
        witnessRecords.push(record);
        witnessIdentities.set(witnessId, Object.freeze({
            innerApplicationResult: edge.innerApplicationResult,
            outerApplicationResult: edge.outerApplicationResult,
            applicationLayerGraph: graph,
            applicationObservation: observation,
            ownerProofObservation: ownerProof,
        }));
        return record;
    }

    function observeApplicationObservation(observation = null, {
        ownerProofObservations = [],
    } = {}) {
        if (
            !isApplicationAtlasObservation(observation)
            || observedObservationIdentities.has(observation)
        ) return false;
        const graph = observation.layerGraph;
        if (
            !isApplicationLayerGraph(graph)
            || graph.authorizationStatus !== "observed"
            || graph.terminalApplicationResult !== observation.applicationResult
            || graph.terminalCanonicalResult !== observation.canonicalResult
        ) return false;
        const suppliedProofs = Array.isArray(ownerProofObservations)
            ? ownerProofObservations
            : [];
        const graphProofs = (graph.nodes || []).flatMap(node => {
            try {
                return getOwnerProofObservations(node.applicationResult) || [];
            } catch {
                return [];
            }
        });
        const ownerProofs = [...new Set([
            ...suppliedProofs,
            ...graphProofs,
        ])].filter(isOwnerProofObservation);
        if (!(graph.edges || []).every(edge => (
            exactEdgeCanBeObserved(edge, ownerProofs)
        ))) return false;
        (graph.nodes || []).forEach(node => {
            if (
                node?.applicationResult
                && node.canonicalResult
                    === node.applicationResult.canonicalResult
                && node.exactApplicationResultIdentityValidated === true
                && node.exactCanonicalResultIdentityValidated === true
            ) applicationId(node.applicationResult);
        });
        const observedWitnesses = (graph.edges || []).map(edge => (
            observeExactEdge({
                edge,
                graph,
                observation,
                ownerProofs,
            })
        )).filter(Boolean);
        if (
            graph.edges.length > 0
            && observedWitnesses.length !== graph.edges.length
        ) return false;
        if (graph.edges.length > 0) {
            chainSequence += 1;
            const chainId = `chain-${chainSequence}`;
            const chain = Object.freeze({
                chainId,
                operationIds: freezeList(graph.nodes.map(
                    node => String(node.operationId || "")
                )),
                applicationIds: freezeList(graph.nodes.map(
                    node => applicationId(node.applicationResult)
                )),
                witnessIds: freezeList(observedWitnesses.map(
                    witness => witness.witnessId
                )),
                edgeCount: graph.edges.length,
                exactApplicationLayerGraphObserved: true,
                repeatedOperationsPreserved: graph.nodes.length
                    !== new Set(graph.nodes.map(node => node.operationId)).size,
                operationOrderPreserved: true,
                grammarAuthority: false,
            });
            chainRecords.push(chain);
            chainIdentities.set(chainId, Object.freeze({
                applicationLayerGraph: graph,
                applicationObservation: observation,
            }));
        }
        observedObservationIdentities.add(observation);
        revision += 1;
        return true;
    }

    function witnessForConnection(navigatorRecord, operationId) {
        if (!navigatorRecord.inputApplicationResult) return null;
        return witnessRecords.find(record => {
            const identity = witnessIdentities.get(record.witnessId);
            return identity?.innerApplicationResult
                    === navigatorRecord.inputApplicationResult
                && record.outerOperationId === operationId;
        }) || null;
    }

    function connectionRecord(navigatorRecord, operation) {
        const operationId = String(operation?.operationId || "");
        const availabilityReason = String(
            operation?.availabilityReason || ""
        );
        const witness = witnessForConnection(navigatorRecord, operationId);
        const requiredChoiceIds = uniqueText(operation?.requiredChoiceIds);
        const requiredResultRoles = uniqueText(operation?.requiredResultRoles);
        const base = {
            inputId: navigatorRecord.inputId,
            inputRole: navigatorRecord.inputRole,
            operationId,
            availabilityStatus: String(operation?.availabilityStatus || ""),
            availabilityReason,
            availabilityAuthority: String(
                operation?.availabilityAuthority || ""
            ),
            requiredChoiceIds,
            requiredResultRoles,
            exactInputIdentityObserved: true,
            grammarAuthority: false,
        };
        if (witness) {
            return Object.freeze({
                ...base,
                classification: "witnessed",
                witnessId: witness.witnessId,
            });
        }
        if (explicitImplementationFailure(operation)) {
            return Object.freeze({
                ...base,
                classification: "implementation-gap",
                witnessId: "",
            });
        }
        if (operation?.availabilityStatus === "incompatible") {
            return Object.freeze({
                ...base,
                classification: ownerRejected(operation)
                    ? "incompatible"
                    : "implementation-gap",
                witnessId: "",
            });
        }
        if (
            requiredResultRoles.length > 0
            || /(?:result|source).*(?:required|missing)|additional-result|additional-source/u
                .test(availabilityReason)
        ) {
            return Object.freeze({
                ...base,
                classification: "awaiting-choice/result",
                awaitingKind: "result",
                witnessId: "",
            });
        }
        if (
            requiredChoiceIds.length > 0
            || operation?.ownerChoicesRequired === true
            || /(?:choice|selection).*(?:required|missing)/u
                .test(availabilityReason)
        ) {
            return Object.freeze({
                ...base,
                classification: "awaiting-choice/result",
                awaitingKind: "choice",
                witnessId: "",
            });
        }
        if (ownerApproved(operation)) {
            return Object.freeze({
                ...base,
                classification: "enterable-unwitnessed",
                witnessId: "",
            });
        }
        return Object.freeze({
            ...base,
            classification: "implementation-gap",
            witnessId: "",
        });
    }

    function snapshot() {
        const connections = navigatorRecords.flatMap(navigatorRecord => (
            navigatorRecord.operations.map(operation => (
                connectionRecord(navigatorRecord, operation)
            ))
        ));
        const byClassification = classification => freezeList(
            connections.filter(record => (
                record.classification === classification
            ))
        );
        const unmappedEvidence = freezeList(applicationRecords.flatMap(record => {
            const atomIds = operationAtomIds(record.operationId);
            return atomIds.length ? [] : [Object.freeze({
                applicationId: record.applicationId,
                operationId: record.operationId,
                evidenceStatus: "unmapped-evidence",
                exactApplicationResultObserved: true,
                absenceDoesNotProveGrammarGap: true,
                grammarAuthority: false,
            })];
        }));
        const value = Object.freeze({
            kind: REPORT_KIND,
            version: 1,
            revision,
            observedNavigatorCount: navigatorRecords.length,
            observedApplicationCount: applicationRecords.length,
            connectionCount: connections.length,
            connections: freezeList(connections),
            witnessedConnections: byClassification("witnessed"),
            enterableUnwitnessedConnections:
                byClassification("enterable-unwitnessed"),
            awaitingChoiceOrResultConnections:
                byClassification("awaiting-choice/result"),
            incompatibleConnections: byClassification("incompatible"),
            implementationGaps: byClassification("implementation-gap"),
            unmappedEvidence,
            witnessedChains: freezeList(chainRecords),
            witnessedChainCount: chainRecords.length,
            exactApplicationLayerGraphsOnly: true,
            ownerProofRequiredForTopologyEdges: true,
            unitKindReachabilityUsed: false,
            workspaceHistoryAcceptedAsEvidence: false,
            compatibilityMayAuthorizeGrammar: false,
            atlasMayAuthorizeGrammar: false,
            grammarAuthority: false,
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
        });
        issuedSnapshots.add(value);
        return value;
    }

    function isSnapshot(value = null) {
        return Boolean(
            value
            && issuedSnapshots.has(value)
            && value.kind === REPORT_KIND
            && value.version === 1
            && value.exactApplicationLayerGraphsOnly === true
            && value.unitKindReachabilityUsed === false
            && value.workspaceHistoryAcceptedAsEvidence === false
            && value.grammarAuthority === false
            && Object.isFrozen(value)
            && Object.isFrozen(value.connections)
            && Object.isFrozen(value.witnessedChains)
        );
    }

    function recoverWitness(witnessId = "") {
        return witnessIdentities.get(String(witnessId || "")) || null;
    }

    function recoverChain(chainId = "") {
        return chainIdentities.get(String(chainId || "")) || null;
    }

    return Object.freeze({
        observeNavigator,
        observeApplicationObservation,
        snapshot,
        isSnapshot,
        recoverWitness,
        recoverChain,
    });
}

module.exports = {
    REPORT_KIND,
    createClassicalCrossLessonCompositionalClosureReporter,
};
