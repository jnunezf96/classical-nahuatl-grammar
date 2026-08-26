import {
  buildClassicalGrammaticalAtlasTypedNodeFrame,
  projectClassicalGrammaticalAtlasLocalCoordinate,
  recoverClassicalGrammaticalAtlasGlobalCoordinate,
  roundTripClassicalGrammaticalAtlasLocalCoordinate,
  updateClassicalGrammaticalAtlasFrame,
} from "../../core/grammar/grammatical_atlas.mjs?v=20260823-grammatical-atlas-live-bridge-256";

const LIVE_ATLAS_KIND = "classical-grammatical-atlas-live-state";
const LIVE_ATLAS_VERSION = 1;
const MAXIMUM_RECOVERABLE_APPLICATIONS = 256;
const populationAdapterLoadStateByVersion = new Map();

function text(value = "") {
  return String(value ?? "").trim();
}

function frozenArray(values = []) {
  return Object.freeze([...(Array.isArray(values) ? values : [])]);
}

function freezeTree(value) {
  if (Array.isArray(value)) return Object.freeze(value.map(freezeTree));
  if (!value || typeof value !== "object") return value;
  return Object.freeze(Object.fromEntries(Object.entries(value).map(
    ([key, member]) => [key, freezeTree(member)],
  )));
}

function uniqueText(values = []) {
  return frozenArray([...new Set((Array.isArray(values) ? values : [])
    .map(value => text(value))
    .filter(Boolean))]);
}

function authorityBoundary() {
  return {
    atlasMayAuthorizeGrammar: false,
    uiAuthority: false,
    lessonNumberAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    grammarAuthority: false,
  };
}

function activeSpecificity(element = null) {
  const section = element?.closest?.(
    "[data-classical-linear-formula-specificity], "
    + "[data-classical-diagrammatic-formula-specificity]",
  ) || null;
  return text(
    section?.dataset?.classicalLinearFormulaSpecificity
    || section?.dataset?.classicalDiagrammaticFormulaSpecificity
    || element?.dataset?.classicalFormulaSpecificity,
  ) || "specific";
}

function resultViewKind(element = null) {
  if (element?.closest?.(
    ".classical-rule-surface__sentence-formula-section",
  )) return "sentence-formula";
  if (element?.closest?.(".classical-rule-surface__diagram")) {
    return "diagram";
  }
  if (element?.closest?.(".classical-rule-surface__linear")) {
    return "linear-formula";
  }
  if (element?.matches?.(".classical-rule-surface__sentence-surface")) {
    return "sentence-surface";
  }
  return "result-view";
}

function nearestViewContainer(element = null) {
  return element?.closest?.(
    ".classical-rule-surface__sentence-formula-section, "
    + ".classical-rule-surface__diagram, "
    + ".classical-rule-surface__linear",
  ) || element;
}

function elementIndex(element = null, selector = "") {
  const root = element?.ownerDocument;
  if (!root?.querySelectorAll || !selector) return -1;
  return Array.from(root.querySelectorAll(selector)).indexOf(element);
}

export function buildClassicalGrammaticalAtlasResultViewCoordinates({
  documentObject = globalThis.document,
  applicationNodeId = "",
  populationFrame = null,
} = {}) {
  const normalizedApplicationNodeId = text(applicationNodeId);
  if (
    !documentObject?.querySelectorAll
    || !normalizedApplicationNodeId
    || !populationFrame
  ) {
    return Object.freeze([]);
  }
  const coordinates = [];
  const markedElements = Array.from(documentObject.querySelectorAll(
    "#classical-result-panel [data-classical-formula-coordinate]",
  ));
  markedElements.forEach((element, ordinal) => {
    const container = nearestViewContainer(element);
    const viewKind = resultViewKind(element);
    const specificity = activeSpecificity(element);
    const localCoordinateId = text(
      element.dataset?.classicalFormulaCoordinate,
    ) || `coordinate-${ordinal + 1}`;
    const atomIds = uniqueText(text(
      element.dataset?.classicalDerivedAnnotationAtoms,
    ).split("|"));
    const knownAtomIds = frozenArray(atomIds.filter(atomId => Boolean(
      populationFrame.indexes.atomById[atomId],
    )));
    const lessonSections = uniqueText(text(
      element.dataset?.classicalDerivedAnnotationLessons,
    ).split("|"));
    const row = element.closest?.(".classical-rule-surface__diagram-row")
      || null;
    const rowIndex = row
      ? elementIndex(row, "#classical-result-panel .classical-rule-surface__diagram-row")
      : -1;
    const containerIndex = container
      ? elementIndex(
        container,
        "#classical-result-panel .classical-rule-surface__linear, "
        + "#classical-result-panel .classical-rule-surface__diagram, "
        + "#classical-result-panel .classical-rule-surface__sentence-formula-section",
      )
      : -1;
    coordinates.push(Object.freeze({
      kind: "classical-grammatical-atlas-result-view-coordinate",
      version: LIVE_ATLAS_VERSION,
      viewCoordinateId: [
        normalizedApplicationNodeId,
        viewKind,
        specificity,
        `container-${Math.max(0, containerIndex)}`,
        rowIndex >= 0 ? `row-${rowIndex}` : "row-none",
        localCoordinateId,
        `mark-${ordinal}`,
      ].join("/"),
      applicationNodeId: normalizedApplicationNodeId,
      viewKind,
      specificity,
      localCoordinateId,
      coordinateKind: text(
        element.dataset?.classicalFormulaCoordinateKind,
      ),
      coordinateRoles: uniqueText(text(
        element.dataset?.classicalFormulaCoordinateRoles,
      ).split("|")),
      lessonSections,
      atomIds,
      knownAtomIds,
      atomLocalCoordinateIds: frozenArray(knownAtomIds.map(atomId => (
        populationFrame.indexes.localCoordinateIdByAtomId[atomId]
      ))),
      atomLessonGlobalCoordinateIds: uniqueText(knownAtomIds.map(
        atomId => (
          populationFrame.indexes
            .lessonGlobalCoordinateIdByAtomId[atomId]
        ),
      )),
      atomGlobalCoordinateIds: uniqueText(knownAtomIds.map(atomId => (
        populationFrame.indexes
          .lessonGlobalCoordinateIdByAtomId[atomId]
      ))),
      atomOperationGlobalCoordinateIds: uniqueText(knownAtomIds.flatMap(
        atomId => (
          populationFrame.indexes
            .operationGlobalCoordinateIdsByAtomId[atomId] || []
        ),
      )),
      atomOperationCoordinateProjectionIds: uniqueText(
        knownAtomIds.flatMap(atomId => (
          populationFrame.indexes
            .operationCoordinateProjectionsByAtomId[atomId]
            ?.map(projection => projection.projectionId) || []
        )),
      ),
      coordinateOffsetsAreLocalToThisRenderedView: true,
      formulaTextWasNotReadAsGrammar: true,
      ...authorityBoundary(),
    }));
  });

  const viewContainers = Array.from(documentObject.querySelectorAll(
    "#classical-result-panel .classical-rule-surface__linear, "
    + "#classical-result-panel .classical-rule-surface__diagram, "
    + "#classical-result-panel .classical-rule-surface__sentence-formula-section, "
    + "#classical-result-panel .classical-rule-surface__sentence-surface",
  ));
  viewContainers.forEach((element, ordinal) => {
    const viewKind = resultViewKind(element);
    if (coordinates.some(coordinate => (
      coordinate.viewKind === viewKind
      && coordinate.viewCoordinateId.includes(`container-${ordinal}/`)
    ))) return;
    coordinates.push(Object.freeze({
      kind: "classical-grammatical-atlas-result-view-coordinate",
      version: LIVE_ATLAS_VERSION,
      viewCoordinateId: [
        normalizedApplicationNodeId,
        viewKind,
        activeSpecificity(element),
        `container-${ordinal}`,
        "unannotated",
      ].join("/"),
      applicationNodeId: normalizedApplicationNodeId,
      viewKind,
      specificity: activeSpecificity(element),
      localCoordinateId: "",
      coordinateKind: "view-container",
      coordinateRoles: Object.freeze([]),
      lessonSections: Object.freeze([]),
      atomIds: Object.freeze([]),
      knownAtomIds: Object.freeze([]),
      atomLocalCoordinateIds: Object.freeze([]),
      atomLessonGlobalCoordinateIds: Object.freeze([]),
      atomGlobalCoordinateIds: Object.freeze([]),
      atomOperationGlobalCoordinateIds: Object.freeze([]),
      atomOperationCoordinateProjectionIds: Object.freeze([]),
      coordinateOffsetsAreLocalToThisRenderedView: true,
      formulaTextWasNotReadAsGrammar: true,
      ...authorityBoundary(),
    }));
  });
  return Object.freeze(coordinates);
}

export function buildClassicalGrammaticalAtlasAnthillJoin({
  nestedControlLedger = null,
  operationIds = [],
} = {}) {
  const knownOperationIds = new Set(uniqueText(operationIds));
  const capabilityNavigator =
    nestedControlLedger?.pathways?.capabilityNavigator
    || nestedControlLedger?.pathways?.anthillMap?.capabilityNavigator
    || null;
  const layerOperationIds = uniqueText(
    nestedControlLedger?.compositionPath?.deliveredSummary
      ?.layerOperationIds || [],
  );
  const nextOperationIds = uniqueText(
    (nestedControlLedger?.compositionPath?.deliveredSummary
      ?.nextOperations || []).map(item => item?.operationId),
  );
  const capabilityPathwayIds = uniqueText(
    capabilityNavigator?.deliveredOperationIds || [],
  );
  const expectedCapabilityPathwayIds = uniqueText(
    capabilityNavigator?.expectedOperationIds || [],
  );
  return Object.freeze({
    kind: "classical-grammatical-atlas-anthill-join",
    version: LIVE_ATLAS_VERSION,
    ledgerRevision: Number(nestedControlLedger?.revision || 0),
    sourceUnit: text(nestedControlLedger?.route?.sourceUnit),
    selectedInterfaceOperation: text(
      nestedControlLedger?.route?.selectedOperation,
    ),
    resultStatus: text(
      nestedControlLedger?.route?.result?.status,
    ),
    resultUnit: text(
      nestedControlLedger?.route?.result?.resultUnit,
    ),
    layerOperationIds,
    nextOperationIds,
    matchedLayerOperationIds: frozenArray(layerOperationIds.filter(
      operationId => knownOperationIds.has(operationId),
    )),
    matchedNextOperationIds: frozenArray(nextOperationIds.filter(
      operationId => knownOperationIds.has(operationId),
    )),
    capabilityPathwayIds,
    expectedCapabilityPathwayIds,
    matchedCapabilityPathwayIds: frozenArray(capabilityPathwayIds.filter(
      operationId => knownOperationIds.has(operationId),
    )),
    unknownCapabilityPathwayIds: frozenArray(capabilityPathwayIds.filter(
      operationId => !knownOperationIds.has(operationId),
    )),
    missingCapabilityPathwayIds: uniqueText(
      capabilityNavigator?.missingOperationIds || [],
    ),
    unexpectedCapabilityPathwayIds: uniqueText(
      capabilityNavigator?.unexpectedOperationIds || [],
    ),
    capabilityNavigator,
    anthillMap: nestedControlLedger?.pathways?.anthillMap || null,
    compositionPath: nestedControlLedger?.compositionPath || null,
    joinsOnlyByTypedOperationId: true,
    interfaceRouteDoesNotAuthorizeGrammar: true,
    capabilityPathwaysDoNotAuthorizeGrammar: true,
    ...authorityBoundary(),
  });
}

function projectionForScript(state = null) {
  if (!state) return null;
  return freezeTree({
    kind: "classical-grammatical-atlas-live-projection",
    version: LIVE_ATLAS_VERSION,
    revision: state.revision,
    status: state.status,
    population: {
      populatedLessons: state.populationFrame.populatedLessonCount,
      populatedAtoms: state.populationFrame.populatedAtomCount,
      defaultUnpopulatedLessons:
        state.populationFrame.defaultLessonLocalCoordinateCount,
      exactOperationCoordinateProjections:
        state.populationFrame.exactOperationProjectionCount,
      proofFileCandidateOperationLinks:
        state.populationFrame.proofFileCandidateLinkCount,
      sourceDigest: state.populationFrame.sourceDigest,
    },
    atlas: {
      localCoordinates: state.baseAtlasFrame.lessonLocalCoordinateCount,
      globalCoordinates: state.baseAtlasFrame.globalCoordinateCount,
      typedNodes:
        state.baseAtlasFrame.typedNodeCount
        + state.applicationNodes.length,
      declaredOwnerHyperedges:
        state.atlasFrame?.declaredOwnerHyperedgeCount || 0,
      fullFrameMaterializationStatus:
        state.atlasFrameMaterializationStatus,
    },
    live: {
      recoverableApplications: state.applicationNodeIds.length,
      continuationEdges: state.continuationEdges.length,
      resultViewCoordinates: state.resultViewCoordinates.length,
      latestApplicationNodeId: state.latestApplicationNodeId,
      currentOperationId: state.currentOperationId,
    },
    ownerCalibration: {
      calibratedEdges:
        state.ownerCalibrationFrame?.calibratedEdgeCount || 0,
      exactOwnerProofReceipts:
        state.ownerCalibrationFrame?.exactOwnerProofReceiptCount || 0,
      exactOwnerObservedEdges:
        state.ownerCalibrationFrame?.exactOwnerProofObservedEdgeCount || 0,
      proofQueue:
        state.ownerCalibrationFrame?.ownerContractProofQueueCount || 0,
    },
    anthill: {
      ledgerRevision: state.anthillJoin.ledgerRevision,
      sourceUnit: state.anthillJoin.sourceUnit,
      selectedInterfaceOperation:
        state.anthillJoin.selectedInterfaceOperation,
      matchedLayerOperationIds:
        state.anthillJoin.matchedLayerOperationIds,
      matchedNextOperationIds:
        state.anthillJoin.matchedNextOperationIds,
      matchedCapabilityPathwayIds:
        state.anthillJoin.matchedCapabilityPathwayIds,
      unknownCapabilityPathwayIds:
        state.anthillJoin.unknownCapabilityPathwayIds,
      missingCapabilityPathwayIds:
        state.anthillJoin.missingCapabilityPathwayIds,
      unexpectedCapabilityPathwayIds:
        state.anthillJoin.unexpectedCapabilityPathwayIds,
    },
    authority: authorityBoundary(),
  });
}

export function installClassicalGrammaticalAtlas({
  globalObject = globalThis,
  documentObject = globalObject.document,
  populationFrame = null,
  maximumRecoverableApplications = MAXIMUM_RECOVERABLE_APPLICATIONS,
} = {}) {
  if (!populationFrame) {
    throw new Error(
      "The Classical Grammatical Atlas population has not finished loading.",
    );
  }
  const workbench = documentObject?.getElementById?.(
    "classical-workbench",
  ) || null;
  if (!workbench) return null;
  workbench.classicalGrammaticalAtlasController?.disconnect?.();

  const inventory = globalObject.getClassicalGrammarApplicationInventory?.()
    || null;
  const routePlaneFrames = frozenArray((inventory?.operations || []).map(
    operation => operation.rhymeRoutePlaneFrame,
  ));
  const routePlaneByOperationId = new Map((inventory?.operations || []).map(
    operation => [operation.operationId, operation.rhymeRoutePlaneFrame],
  ));
  const sessionIdByApplicationResult = new WeakMap();
  const applicationEntryById = new Map();
  const applicationNodeById = new Map();
  const continuationEdgeById = new Map();
  const resultViewElementById = new Map();
  let sequence = 0;
  let revision = 0;
  let refreshPending = false;
  let ownerCalibrationDirty = true;
  let atlasFrameMaterializationDirty = true;
  let disconnected = false;
  let publishing = false;
  let latestStateSignature = "";
  let latestApplicationNodeId = "";
  let latestNestedControlLedger =
    globalObject.getClassicalNestedControlLedger?.()
    || globalObject.__CLASSICAL_NESTED_CONTROL_LEDGER__
    || null;
  const baseAtlasFrame = updateClassicalGrammaticalAtlasFrame(
    populationFrame.atlasFrame,
    { routePlaneFrames },
  );
  let atlasFrame = baseAtlasFrame;
  let ownerCalibrationFrame = null;
  let latestState = null;

  const applicationEntries = () => frozenArray(
    [...applicationEntryById.values()],
  );

  const removeOldestApplication = () => {
    const oldest = applicationEntryById.entries().next().value;
    if (!oldest) return;
    const [sessionId, entry] = oldest;
    applicationEntryById.delete(sessionId);
    applicationNodeById.delete(sessionId);
    sessionIdByApplicationResult.delete(entry.applicationResult);
    [...continuationEdgeById].forEach(([edgeId, edge]) => {
      if (
        edge.fromApplicationNodeId === sessionId
        || edge.toApplicationNodeId === sessionId
      ) continuationEdgeById.delete(edgeId);
    });
  };

  const registerObservation = observation => {
    if (
      !globalObject.isClassicalGrammarApplicationAtlasObservation?.(
        observation,
      )
    ) return "";
    const applicationResult = observation.applicationResult;
    const existingId = sessionIdByApplicationResult.get(applicationResult);
    if (existingId && applicationEntryById.has(existingId)) {
      const existingEntry = applicationEntryById.get(existingId);
      applicationEntryById.delete(existingId);
      applicationEntryById.set(existingId, existingEntry);
      return existingId;
    }
    sequence += 1;
    const sessionId = `application-${sequence}`;
    const routePlaneFrame = routePlaneByOperationId.get(
      observation.operationId,
    ) || null;
    const applicationNode = buildClassicalGrammaticalAtlasTypedNodeFrame({
      nodeType: "application",
      nodeId: sessionId,
      routePlaneFrame,
      applicationObservationFrame: observation,
      localIdentity: applicationResult,
      evidenceFrames: [
        observation.rhymeFullPinFrame,
        observation.rhymeCalibrationFrame,
        observation.layerGraph,
        observation.evaluationOrderFrame,
      ].filter(Boolean),
    });
    if (applicationNode.nodeStatus !== "declared") return "";
    const entry = Object.freeze({
      kind: "classical-grammatical-atlas-live-application-entry",
      version: LIVE_ATLAS_VERSION,
      sessionId,
      operationId: observation.operationId,
      outputKind: observation.outputKind,
      observation,
      applicationNode,
      applicationResult,
      canonicalResult: observation.canonicalResult,
      serviceObservationIdentityValidated: true,
      exactLiveIdentityRecoverable: true,
      ...authorityBoundary(),
    });
    sessionIdByApplicationResult.set(applicationResult, sessionId);
    applicationEntryById.set(sessionId, entry);
    applicationNodeById.set(sessionId, applicationNode);
    while (
      applicationEntryById.size
        > Math.max(1, Number(maximumRecoverableApplications) || 1)
    ) removeOldestApplication();
    return sessionId;
  };

  const observeLayerGraph = observation => {
    const graph = observation?.layerGraph;
    const graphNodeIdToSessionId = new Map();
    (graph?.nodes || []).forEach(node => {
      const nodeObservation =
        globalObject.getClassicalGrammarApplicationAtlasObservation?.(
          node.applicationResult,
        ) || null;
      const sessionId = registerObservation(nodeObservation);
      if (sessionId) graphNodeIdToSessionId.set(node.nodeId, sessionId);
    });
    const terminalSessionId = registerObservation(observation);
    if (terminalSessionId) latestApplicationNodeId = terminalSessionId;
    (graph?.edges || []).forEach(edge => {
      const fromApplicationNodeId = graphNodeIdToSessionId.get(
        edge.fromNodeId,
      ) || "";
      const toApplicationNodeId = graphNodeIdToSessionId.get(
        edge.toNodeId,
      ) || "";
      if (!fromApplicationNodeId || !toApplicationNodeId) return;
      if (
        !applicationEntryById.has(fromApplicationNodeId)
        || !applicationEntryById.has(toApplicationNodeId)
      ) return;
      const edgeId = [
        fromApplicationNodeId,
        toApplicationNodeId,
        ...(edge.sharedUnitKinds || []),
      ].join("→");
      continuationEdgeById.set(edgeId, Object.freeze({
        kind: "classical-grammatical-atlas-observed-continuation-edge",
        version: LIVE_ATLAS_VERSION,
        edgeId,
        fromApplicationNodeId,
        toApplicationNodeId,
        innerApplicationResult: edge.innerApplicationResult,
        outerApplicationResult: edge.outerApplicationResult,
        sharedUnitKinds: frozenArray(edge.sharedUnitKinds),
        exactInnerResultIdentityObservedInOuterArguments:
          edge.exactInnerResultIdentityObservedInOuterArguments === true,
        actualDerivationIsAcyclic: graph.authorizationStatus === "observed",
        compatibilityAloneDidNotCreateThisEdge: true,
        ...authorityBoundary(),
      }));
    });
  };

  const projectResultViewElements = resultViewCoordinates => {
    resultViewElementById.clear();
    const markedElements = Array.from(documentObject.querySelectorAll?.(
      "#classical-result-panel [data-classical-formula-coordinate]",
    ) || []);
    const viewContainers = Array.from(documentObject.querySelectorAll?.(
      "#classical-result-panel .classical-rule-surface__linear, "
      + "#classical-result-panel .classical-rule-surface__diagram, "
      + "#classical-result-panel .classical-rule-surface__sentence-formula-section, "
      + "#classical-result-panel .classical-rule-surface__sentence-surface",
    ) || []);
    resultViewCoordinates.forEach(coordinate => {
      const markIndex = Number(
        coordinate.viewCoordinateId.match(/\/mark-(\d+)$/u)?.[1],
      );
      const containerIndex = Number(
        coordinate.viewCoordinateId.match(
          /\/container-(\d+)\/unannotated$/u,
        )?.[1],
      );
      const element = Number.isInteger(markIndex)
        ? markedElements[markIndex] || null
        : Number.isInteger(containerIndex)
          ? viewContainers[containerIndex] || null
          : null;
      if (element) resultViewElementById.set(
        coordinate.viewCoordinateId,
        element,
      );
    });
  };

  const publishProjection = state => {
    let projection = documentObject.getElementById?.(
      "classical-grammatical-atlas",
    ) || null;
    if (!projection) {
      projection = documentObject.createElement?.("script") || null;
      if (!projection) return;
      projection.id = "classical-grammatical-atlas";
      projection.type = "application/json";
      projection.dataset.classicalGrammaticalAtlas =
        "descriptive-non-authorizing";
      (documentObject.head || documentObject.body)?.appendChild?.(
        projection,
      );
    }
    projection.textContent = JSON.stringify(
      projectionForScript(state),
      null,
      2,
    );
  };

  const ensureOwnerCalibration = () => {
    if (!ownerCalibrationDirty) return ownerCalibrationFrame;
    const entries = applicationEntries();
    ownerCalibrationFrame =
      globalObject
        .buildClassicalGrammarApplicationRhymeOwnerCalibration?.({
          lessonOwnerEvidenceFrames:
            populationFrame.lessonOwnerEvidenceFrames,
          exactOwnerProofResults: entries.map(entry => (
            entry.applicationResult
          )),
        }) || null;
    ownerCalibrationDirty = false;
    atlasFrameMaterializationDirty = true;
    return ownerCalibrationFrame;
  };

  const materializeAtlasFrame = () => {
    ensureOwnerCalibration();
    if (!atlasFrameMaterializationDirty) return atlasFrame;
    const entries = applicationEntries();
    atlasFrame = updateClassicalGrammaticalAtlasFrame(baseAtlasFrame, {
      typedNodeFrames: entries.map(entry => entry.applicationNode),
      ownerCalibrationFrame,
    });
    atlasFrameMaterializationDirty = false;
    schedule();
    return atlasFrame;
  };

  const publish = () => {
    if (publishing) return latestState;
    publishing = true;
    refreshPending = false;
    try {
      if (disconnected) return latestState;
      const entries = applicationEntries();
      ensureOwnerCalibration();
      const applicationNodes = frozenArray(entries.map(
        entry => entry.applicationNode,
      ));
      const applicationCoordinateMappings = frozenArray(
        entries.map(entry => Object.freeze({
          kind: "classical-grammatical-atlas-live-coordinate-mapping",
          version: LIVE_ATLAS_VERSION,
          applicationNodeId: entry.applicationNode.nodeId,
          operationId: entry.applicationNode.operationId,
          globalCoordinateId:
            entry.applicationNode.proposedGlobalCoordinateId,
          globalCoordinate:
            baseAtlasFrame.globalCoordinateIndex[
              entry.applicationNode.proposedGlobalCoordinateId
            ] || null,
          exactApplicationIdentityPreserved:
            entry.serviceObservationIdentityValidated === true
            && entry.applicationNode.applicationObservationFrame
              === entry.observation
            && entry.applicationNode.localIdentity
              === entry.applicationResult,
          ...authorityBoundary(),
        })),
      );
      const resultViewCoordinates =
        buildClassicalGrammaticalAtlasResultViewCoordinates({
          documentObject,
          applicationNodeId: latestApplicationNodeId,
          populationFrame,
        });
      projectResultViewElements(resultViewCoordinates);
      const anthillJoin = buildClassicalGrammaticalAtlasAnthillJoin({
        nestedControlLedger: latestNestedControlLedger,
        operationIds: inventory?.operationIds || [],
      });
      const continuationEdges = frozenArray([
        ...continuationEdgeById.values(),
      ]);
      const applicationNodeIds = frozenArray(entries.map(
        entry => entry.sessionId,
      ));
      const stateSignature = JSON.stringify({
        applicationNodeIds,
        latestApplicationNodeId,
        continuationEdgeIds: continuationEdges.map(edge => edge.edgeId),
        resultViewCoordinates: resultViewCoordinates.map(coordinate => [
          coordinate.viewCoordinateId,
          coordinate.viewKind,
          coordinate.specificity,
          coordinate.coordinateKind,
          coordinate.coordinateRoles,
          coordinate.lessonSections,
          coordinate.knownAtomIds,
        ]),
        ownerCalibrationCounts: [
          ownerCalibrationFrame?.calibratedEdgeCount || 0,
          ownerCalibrationFrame?.exactOwnerProofReceiptCount || 0,
          ownerCalibrationFrame?.exactOwnerProofObservedEdgeCount || 0,
          ownerCalibrationFrame?.ownerContractProofQueueCount || 0,
        ],
        anthill: [
          anthillJoin.ledgerRevision,
          anthillJoin.sourceUnit,
          anthillJoin.selectedInterfaceOperation,
          anthillJoin.resultStatus,
          anthillJoin.resultUnit,
          anthillJoin.matchedLayerOperationIds,
          anthillJoin.matchedNextOperationIds,
          anthillJoin.matchedCapabilityPathwayIds,
          anthillJoin.unknownCapabilityPathwayIds,
          anthillJoin.missingCapabilityPathwayIds,
          anthillJoin.unexpectedCapabilityPathwayIds,
        ],
        atlasFrameMaterializationStatus:
          atlasFrameMaterializationDirty ? "lazy-pending" : "current",
      });
      if (latestState && stateSignature === latestStateSignature) {
        return latestState;
      }
      latestStateSignature = stateSignature;
      revision += 1;
      const currentEntry = applicationEntryById.get(
        latestApplicationNodeId,
      ) || null;
      latestState = Object.freeze({
        kind: LIVE_ATLAS_KIND,
        version: LIVE_ATLAS_VERSION,
        revision,
        status: "observing",
        populationFrame,
        baseAtlasFrame,
        atlasFrame: atlasFrameMaterializationDirty ? null : atlasFrame,
        atlasFrameMaterializationStatus:
          atlasFrameMaterializationDirty ? "lazy-pending" : "current",
        ownerCalibrationFrame,
        applicationEntries: entries,
        applicationNodes,
        applicationCoordinateMappings,
        applicationNodeIds,
        latestApplicationNodeId,
        currentOperationId: currentEntry?.operationId || "",
        continuationEdges,
        resultViewCoordinates,
        anthillJoin,
        latestNestedControlLedger,
        exactLiveApplicationIdentityRecoverable: true,
        exactPopulationAtomIdentityRecoverable: true,
        localGlobalRoundTripsUseCoreAtlas: true,
        normalCanonicalApplicationsPopulateOwnerCalibration: true,
        automaticUpdatesUseLightweightOverlay: true,
        fullFrameMaterializesOnlyOnExplicitRequest: true,
        ...authorityBoundary(),
      });
      globalObject.__CLASSICAL_GRAMMATICAL_ATLAS__ =
        projectionForScript(latestState);
      publishProjection(latestState);
      try {
        globalObject.dispatchEvent?.(new globalObject.CustomEvent(
          "classical:grammatical-atlas-updated",
          { detail: latestState },
        ));
      } catch {
        // The exact Atlas remains available without a DOM event constructor.
      }
      return latestState;
    } finally {
      publishing = false;
    }
  };

  const schedule = () => {
    if (refreshPending || disconnected) return;
    refreshPending = true;
    const enqueue = globalObject.queueMicrotask
      || (callback => Promise.resolve().then(callback));
    enqueue(() => {
      try {
        publish();
      } catch {
        refreshPending = false;
        // A diagnostic map can never interrupt canonical grammar or UI.
      }
    });
  };

  const applicationObserver = observation => {
    try {
      observeLayerGraph(observation);
      ownerCalibrationDirty = true;
      atlasFrameMaterializationDirty = true;
      schedule();
    } catch {
      // The canonical application result has already been issued.
    }
  };
  const nestedLedgerObserver = event => {
    latestNestedControlLedger = event?.detail
      || globalObject.getClassicalNestedControlLedger?.()
      || null;
    schedule();
  };
  const resultPanel = documentObject.getElementById?.(
    "classical-result-panel",
  ) || null;
  const MutationObserverConstructor = globalObject.MutationObserver
    || documentObject.defaultView?.MutationObserver
    || null;
  const resultMutationObserver = MutationObserverConstructor && resultPanel
    ? new MutationObserverConstructor(() => schedule())
    : null;
  resultMutationObserver?.observe?.(resultPanel, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: [
      "hidden",
      "data-classical-linear-formula-specificity",
      "data-classical-diagrammatic-formula-specificity",
      "data-classical-formula-specificity",
      "data-classical-formula-coordinate",
      "data-classical-formula-coordinate-kind",
      "data-classical-formula-coordinate-roles",
      "data-classical-derived-annotation-lessons",
      "data-classical-derived-annotation-atoms",
    ],
  });
  const unsubscribeApplication =
    globalObject.subscribeClassicalGrammarApplicationAtlasObservations?.(
      applicationObserver,
    ) || (() => false);
  globalObject.addEventListener?.(
    "classical:nested-control-ledger-updated",
    nestedLedgerObserver,
  );

  const controller = Object.freeze({
    refresh: publish,
    get current() { return latestState; },
    get atlasFrame() { return materializeAtlasFrame(); },
    disconnect() {
      if (disconnected) return false;
      disconnected = true;
      unsubscribeApplication?.();
      globalObject.removeEventListener?.(
        "classical:nested-control-ledger-updated",
        nestedLedgerObserver,
      );
      resultMutationObserver?.disconnect?.();
      return true;
    },
  });
  workbench.classicalGrammaticalAtlasController = controller;
  globalObject.getClassicalGrammaticalAtlas = () => (
    projectionForScript(latestState || publish())
  );
  globalObject.getClassicalGrammaticalAtlasFrame = () => {
    const currentFrame = materializeAtlasFrame();
    publish();
    return currentFrame;
  };
  globalObject.getClassicalGrammaticalAtlasPopulation = () => (
    populationFrame
  );
  globalObject.getClassicalGrammaticalAtlasAtomCoordinate = atomId => (
    populationFrame.indexes.atomById[text(atomId)] || null
  );
  globalObject.getClassicalGrammaticalAtlasOperationAtoms = operationId => (
    populationFrame.indexes.atomIdsByOperationId[text(operationId)]
    || Object.freeze([])
  );
  globalObject.getClassicalGrammaticalAtlasAtomOperationCoordinates = atomId => (
    populationFrame.indexes.operationCoordinateProjectionsByAtomId[
      text(atomId)
    ] || Object.freeze([])
  );
  globalObject.recoverClassicalGrammaticalAtlasApplication = sessionId => {
    const entry = applicationEntryById.get(text(sessionId)) || null;
    return entry ? Object.freeze({
      kind: "classical-grammatical-atlas-live-application-recovery",
      version: LIVE_ATLAS_VERSION,
      sessionId: entry.sessionId,
      applicationResult: entry.applicationResult,
      canonicalResult: entry.canonicalResult,
      applicationNode: entry.applicationNode,
      exactLiveIdentityRecovered: true,
      ...authorityBoundary(),
    }) : null;
  };
  globalObject.recoverClassicalGrammaticalAtlasResultView = viewId => {
    const element = resultViewElementById.get(text(viewId)) || null;
    return element ? Object.freeze({
      kind: "classical-grammatical-atlas-result-view-recovery",
      version: LIVE_ATLAS_VERSION,
      viewCoordinateId: text(viewId),
      element,
      exactLiveElementIdentityRecovered: true,
      ...authorityBoundary(),
    }) : null;
  };
  globalObject.projectClassicalGrammaticalAtlasLocalCoordinate = localId => (
    projectClassicalGrammaticalAtlasLocalCoordinate(
      materializeAtlasFrame(),
      localId,
    )
  );
  globalObject.recoverClassicalGrammaticalAtlasGlobalCoordinate = globalId => (
    recoverClassicalGrammaticalAtlasGlobalCoordinate(
      materializeAtlasFrame(),
      globalId,
    )
  );
  globalObject.roundTripClassicalGrammaticalAtlasLocalCoordinate = localId => (
    roundTripClassicalGrammaticalAtlasLocalCoordinate(
      materializeAtlasFrame(),
      localId,
    )
  );
  globalObject.refreshClassicalGrammaticalAtlas = publish;

  publish();
  return controller;
}

export async function loadAndInstallClassicalGrammaticalAtlas({
  populationVersion,
  ...options
} = {}) {
  const version = text(populationVersion?.version);
  const sourceDigest = text(populationVersion?.sourceDigest);
  if (
    populationVersion?.kind
      !== "classical-grammatical-atlas-population-version"
    || !version
    || !sourceDigest
  ) {
    throw new Error(
      "A generated Classical Grammatical Atlas population version is required.",
    );
  }
  let adapterLoadState = populationAdapterLoadStateByVersion.get(version);
  if (!adapterLoadState) {
    adapterLoadState = {
      attempt: 0,
      module: null,
      promise: null,
    };
    populationAdapterLoadStateByVersion.set(version, adapterLoadState);
  }
  if (!adapterLoadState.module && !adapterLoadState.promise) {
    adapterLoadState.attempt += 1;
    const adapterUrl = new URL(
      "../../core/grammar/grammatical_atlas_population_adapter.mjs",
      import.meta.url,
    );
    adapterUrl.searchParams.set("v", version);
    adapterUrl.searchParams.set(
      "cache",
      "20260825-capability-closure-333",
    );
    if (adapterLoadState.attempt > 1) {
      adapterUrl.searchParams.set(
        "retry",
        String(adapterLoadState.attempt),
      );
    }
    adapterLoadState.promise = import(adapterUrl.href).then(module => {
      if (
        typeof module.loadClassicalGrammaticalAtlasPopulationFrame
          !== "function"
      ) {
        throw new Error(
          "The Classical Grammatical Atlas population adapter is unavailable.",
        );
      }
      adapterLoadState.module = module;
      adapterLoadState.promise = null;
      return module;
    }).catch(error => {
      adapterLoadState.promise = null;
      throw error;
    });
  }
  const adapter = adapterLoadState.module
    || await adapterLoadState.promise;
  const populationFrame = await adapter
    .loadClassicalGrammaticalAtlasPopulationFrame({
      populationVersion,
    });
  return installClassicalGrammaticalAtlas({
    ...options,
    populationFrame,
  });
}

export const CLASSICAL_GRAMMATICAL_ATLAS_LIVE_KIND = LIVE_ATLAS_KIND;
export const CLASSICAL_GRAMMATICAL_ATLAS_LIVE_VERSION =
  LIVE_ATLAS_VERSION;
