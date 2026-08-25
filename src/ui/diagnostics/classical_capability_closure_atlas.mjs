const CLASSICAL_CAPABILITY_CLOSURE_ATLAS_KIND =
  "classical-capability-closure-atlas";
const CLASSICAL_CAPABILITY_CLOSURE_OPERATION_IDS = Object.freeze([
  "nnc:ordinary",
  "nnc:pronominal",
  "vnc:application",
  "vnc:sentence-result",
  "vnc:diagram",
  "nnc:sentence-surface",
  "nnc:diagram",
  "particle:result",
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
]);

function freezeList(values = []) {
  return Object.freeze([...values]);
}

function unique(values = []) {
  return [...new Set(values)];
}

function normalizeUnitKinds(frame = null) {
  return freezeList(unique([
    ...(frame?.sourceUnitKinds || []),
    ...(frame?.emittedUnitKinds || []),
  ].filter(Boolean)));
}

function ownerApproved(operation = null) {
  return Boolean(
    operation?.availabilityStatus === "available"
    && operation.ownerInputAcceptanceProven === true
    && operation.availabilityAuthority
    && operation.availabilityAuthority !== "none"
  );
}

export function createClassicalCapabilityClosureAtlas({
  operationIds = [],
  isClassicalGrammarApplicationCapabilityNavigator = null,
  isClassicalGrammarApplicationResult = null,
} = {}) {
  if (
    typeof isClassicalGrammarApplicationCapabilityNavigator !== "function"
    || typeof isClassicalGrammarApplicationResult !== "function"
  ) {
    throw new TypeError(
      "classical-capability-closure-atlas-owner-validators-required",
    );
  }
  const declaredOperationIds = freezeList(unique(operationIds.filter(Boolean)));
  const observations = [];
  const observedNavigatorIdentities = new WeakSet();
  const observedApplicationIdentities = new WeakSet();
  const executions = [];
  const exactInputIds = new WeakMap();
  const issuedSnapshots = new WeakSet();
  let inputSequence = 0;
  let revision = 0;

  function exactInputId(frame = null) {
    const exactInput = frame?.exactSource || frame?.exactResult || null;
    if (!exactInput || typeof exactInput !== "object") return "";
    const existing = exactInputIds.get(exactInput);
    if (existing) return existing;
    inputSequence += 1;
    const id = `exact-input-${inputSequence}`;
    exactInputIds.set(exactInput, id);
    return id;
  }

  function observeNavigator(frame = null) {
    if (
      !isClassicalGrammarApplicationCapabilityNavigator(frame)
      || observedNavigatorIdentities.has(frame)
    ) return false;
    const inputId = exactInputId(frame);
    if (!inputId) return false;
    observations.push(Object.freeze({
      inputId,
      inputRole: frame.inputRole,
      unitKinds: normalizeUnitKinds(frame),
      operationRecords: frame.operations,
    }));
    observedNavigatorIdentities.add(frame);
    revision += 1;
    return true;
  }

  function observeExecution(applicationResult = null, {
    sourceInputId = "",
  } = {}) {
    if (
      !isClassicalGrammarApplicationResult(applicationResult)
      || applicationResult.authorizationStatus !== "authorized"
      || observedApplicationIdentities.has(applicationResult)
    ) return false;
    executions.push(Object.freeze({
      operationId: applicationResult.operationId,
      outputKind: applicationResult.outputKind,
      sourceInputId: String(sourceInputId || ""),
      exactApplicationResult: applicationResult,
    }));
    observedApplicationIdentities.add(applicationResult);
    revision += 1;
    return true;
  }

  function snapshot() {
    const approvedEdges = [];
    const missingCombinations = [];
    observations.forEach(observation => {
      observation.operationRecords.forEach(operation => {
        const connection = Object.freeze({
          inputId: observation.inputId,
          inputRole: observation.inputRole,
          inputUnitKinds: observation.unitKinds,
          operationId: operation.operationId,
          outputUnitKinds: freezeList(operation.outputUnitKinds || []),
          availabilityStatus: operation.availabilityStatus,
          availabilityReason: operation.availabilityReason,
          availabilityAuthority: operation.availabilityAuthority,
          exactInputIdentityObserved: true,
          grammarAuthority: false,
        });
        if (ownerApproved(operation)) approvedEdges.push(connection);
        else if (operation.availabilityStatus !== "incompatible") {
          missingCombinations.push(connection);
        }
      });
    });
    const approvedOperationIds = unique(approvedEdges.map(
      edge => edge.operationId,
    ));
    const observedExecutedOperationIds = new Set(executions.map(
      execution => execution.operationId,
    ));
    const enteredOperationIds = declaredOperationIds.filter(
      operationId => observedExecutedOperationIds.has(operationId),
    );
    const unenteredOperationIds = declaredOperationIds.filter(
      operationId => !enteredOperationIds.includes(operationId),
    );
    const observedInputUnitKinds = unique(observations.flatMap(
      observation => observation.unitKinds,
    ));
    const producedUnitKinds = unique(approvedEdges.flatMap(
      edge => edge.outputUnitKinds,
    ));
    const sinkUnitKinds = producedUnitKinds.filter(
      unitKind => !observedInputUnitKinds.includes(unitKind),
    );
    const reachableUnitKinds = new Set(observedInputUnitKinds);
    const reachableOperationIds = new Set();
    let changed = true;
    while (changed) {
      changed = false;
      approvedEdges.forEach(edge => {
        if (
          !edge.inputUnitKinds.some(unitKind => reachableUnitKinds.has(
            unitKind,
          ))
        ) return;
        if (!reachableOperationIds.has(edge.operationId)) {
          reachableOperationIds.add(edge.operationId);
          changed = true;
        }
        edge.outputUnitKinds.forEach(unitKind => {
          if (!reachableUnitKinds.has(unitKind)) {
            reachableUnitKinds.add(unitKind);
            changed = true;
          }
        });
      });
    }
    const unreachableOperationIds = declaredOperationIds.filter(
      operationId => !reachableOperationIds.has(operationId),
    );
    const missingBindingOperationIds = declaredOperationIds.filter(
      operationId => !approvedOperationIds.includes(operationId)
        && observations.some(observation => observation.operationRecords.some(
          operation => operation.operationId === operationId
            && operation.availabilityStatus === "missing-prerequisite",
        )),
    );
    const value = Object.freeze({
      kind: CLASSICAL_CAPABILITY_CLOSURE_ATLAS_KIND,
      version: 1,
      revision,
      operationIds: declaredOperationIds,
      operationCount: declaredOperationIds.length,
      observedExactInputCount: observations.length,
      observedInputUnitKinds: freezeList(observedInputUnitKinds),
      ownerApprovedConnections: freezeList(approvedEdges),
      ownerApprovedConnectionCount: approvedEdges.length,
      ownerApprovedOperationIds: freezeList(approvedOperationIds),
      enteredOperationIds: freezeList(enteredOperationIds),
      enteredOperationCount: enteredOperationIds.length,
      unenteredOperationIds: freezeList(unenteredOperationIds),
      reachableUnitKinds: freezeList([...reachableUnitKinds]),
      reachableOperationIds: freezeList([...reachableOperationIds]),
      unreachableOperationIds: freezeList(unreachableOperationIds),
      missingBindingOperationIds: freezeList(missingBindingOperationIds),
      missingCombinations: freezeList(missingCombinations),
      sinkUnitKinds: freezeList(sinkUnitKinds),
      closureComplete:
        unreachableOperationIds.length === 0
        && missingBindingOperationIds.length === 0
        && sinkUnitKinds.length === 0
        && unenteredOperationIds.length === 0,
      traversalUsesObservedOwnerApprovedConnectionsOnly: true,
      compatibilityAloneAuthorizesTraversal: false,
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
      && value.kind === CLASSICAL_CAPABILITY_CLOSURE_ATLAS_KIND
      && value.version === 1
      && value.operationCount === value.operationIds.length
      && value.grammarAuthority === false
      && Object.isFrozen(value)
      && Object.isFrozen(value.ownerApprovedConnections)
      && Object.isFrozen(value.unenteredOperationIds)
      && Object.isFrozen(value.missingCombinations)
    );
  }

  return Object.freeze({
    observeNavigator,
    observeExecution,
    snapshot,
    isSnapshot,
  });
}

export function installClassicalCapabilityClosureAtlasGlobals(
  targetObject = globalThis,
) {
  const atlas = createClassicalCapabilityClosureAtlas({
    operationIds: CLASSICAL_CAPABILITY_CLOSURE_OPERATION_IDS,
    isClassicalGrammarApplicationCapabilityNavigator:
      targetObject.isClassicalGrammarApplicationCapabilityNavigator,
    isClassicalGrammarApplicationResult:
      targetObject.isClassicalGrammarApplicationResult,
  });
  const publish = () => {
    const value = atlas.snapshot();
    try {
      const EventConstructor = targetObject.CustomEvent
        || globalThis.CustomEvent;
      targetObject.document?.dispatchEvent?.(new EventConstructor(
        "classical:capability-closure-atlas-updated",
        { detail: value },
      ));
    } catch {
      // Diagnostics may never interrupt grammar or presentation.
    }
    return value;
  };
  const observeNavigator = frame => {
    const changed = atlas.observeNavigator(frame);
    if (changed) publish();
    return changed;
  };
  let unsubscribe = () => false;
  if (
    typeof targetObject
      .subscribeClassicalGrammarApplicationAtlasObservations === "function"
  ) {
    try {
      unsubscribe = targetObject
        .subscribeClassicalGrammarApplicationAtlasObservations(
          observation => {
            if (atlas.observeExecution(observation?.applicationResult)) {
              publish();
            }
          },
        );
    } catch {
      unsubscribe = () => false;
    }
  }
  const api = Object.freeze({
    CLASSICAL_CAPABILITY_CLOSURE_ATLAS_KIND,
    CLASSICAL_CAPABILITY_CLOSURE_OPERATION_IDS,
    observeClassicalCapabilityClosureNavigator: observeNavigator,
    getClassicalCapabilityClosureAtlasSnapshot: () => atlas.snapshot(),
    isClassicalCapabilityClosureAtlasSnapshot: value => (
      atlas.isSnapshot(value)
    ),
    disconnectClassicalCapabilityClosureAtlas: () => unsubscribe(),
  });
  Object.defineProperties(
    targetObject,
    Object.getOwnPropertyDescriptors(api),
  );
  return api;
}

export {
  CLASSICAL_CAPABILITY_CLOSURE_ATLAS_KIND,
  CLASSICAL_CAPABILITY_CLOSURE_OPERATION_IDS,
};
