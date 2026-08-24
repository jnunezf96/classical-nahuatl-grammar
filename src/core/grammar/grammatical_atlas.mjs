const ATLAS_VERSION = 1;

const SIX_FIELD_NAMES = Object.freeze([
  "requiresPresent",
  "requiresAbsent",
  "adds",
  "removes",
  "preserves",
  "emits",
]);

function text(value = "") {
  return String(value ?? "").trim();
}

function compareText(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

function normalizedSet(values = []) {
  return Object.freeze([...new Set(
    (Array.isArray(values) ? values : [])
      .map(value => text(value))
      .filter(Boolean),
  )].sort(compareText));
}

function normalizedSixFieldSignature(signature = null) {
  if (!signature || typeof signature !== "object") return null;
  if (!SIX_FIELD_NAMES.every(field => Array.isArray(signature[field]))) {
    return null;
  }
  return Object.freeze({
    kind: "classical-grammatical-atlas-six-field-signature",
    version: ATLAS_VERSION,
    requiresPresent: normalizedSet(signature.requiresPresent),
    requiresAbsent: normalizedSet(signature.requiresAbsent),
    adds: normalizedSet(signature.adds),
    removes: normalizedSet(signature.removes),
    preserves: normalizedSet(signature.preserves),
    emits: normalizedSet(signature.emits),
    grammarAuthority: false,
  });
}

function coordinateIdForSignature(signature) {
  return [
    "classical-grammatical-atlas-coordinate",
    JSON.stringify(SIX_FIELD_NAMES.map(field => signature[field])),
  ].join(":");
}

function isDeclaredLessonPlane(frame = null) {
  return Boolean(
    frame
    && frame.kind === "classical-grammatical-rhyme-lesson-plane-frame"
    && frame.planeStatus === "declared"
    && Number.isInteger(Number(frame.lessonNumber))
    && Number(frame.lessonNumber) > 0
    && normalizedSixFieldSignature(frame.compatibilitySignature)
    && frame.grammarAuthority === false
    && Object.isFrozen(frame)
  );
}

function isDeclaredRoutePlane(frame = null) {
  return Boolean(
    frame
    && frame.kind === "classical-grammatical-rhyme-route-plane-frame"
    && frame.planeStatus === "declared"
    && text(frame.emptyPin?.operationId)
    && normalizedSixFieldSignature(frame.compatibilitySignature)
    && frame.grammarAuthority === false
    && Object.isFrozen(frame)
  );
}

function signatureCoordinate(frame = null) {
  const signature = normalizedSixFieldSignature(
    frame?.compatibilitySignature,
  );
  return signature
    ? Object.freeze({
      signature,
      globalCoordinateId: coordinateIdForSignature(signature),
    })
    : null;
}

export function buildClassicalGrammaticalAtlasSixFieldCoordinateFrame({
  compatibilitySignature = null,
} = {}) {
  const signature = normalizedSixFieldSignature(compatibilitySignature);
  return Object.freeze({
    kind: "classical-grammatical-atlas-six-field-coordinate",
    version: ATLAS_VERSION,
    coordinateStatus: signature ? "declared" : "incomplete",
    sixFieldSignature: signature,
    globalCoordinateId: signature
      ? coordinateIdForSignature(signature)
      : "",
    globalGroupingUsesOnlyNormalizedSixFields: true,
    grammarAuthority: false,
    lessonNumberAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function frozenEvidenceFrames(evidenceFrames = []) {
  return Object.freeze([
    ...(Array.isArray(evidenceFrames) ? evidenceFrames : []),
  ]);
}

export function buildClassicalGrammaticalAtlasLessonLocalCoordinateFrame({
  lessonPlaneFrame = null,
  localCoordinateId = "",
  atomId = "",
  localIdentity = null,
  evidenceFrames = [],
} = {}) {
  const lessonNumber = Number(lessonPlaneFrame?.lessonNumber);
  const normalizedAtomId = text(atomId);
  const normalizedLocalCoordinateId = text(localCoordinateId) || (
    Number.isInteger(lessonNumber) && lessonNumber > 0
      ? [
        `lesson:L${lessonNumber}`,
        normalizedAtomId ? `atom:${normalizedAtomId}` : "",
      ].filter(Boolean).join("/")
      : ""
  );
  const coordinate = isDeclaredLessonPlane(lessonPlaneFrame)
    ? signatureCoordinate(lessonPlaneFrame)
    : null;
  const complete = Boolean(normalizedLocalCoordinateId && coordinate);
  return Object.freeze({
    kind: "classical-grammatical-atlas-lesson-local-coordinate",
    version: ATLAS_VERSION,
    coordinateStatus: complete ? "declared" : "incomplete",
    localCoordinateId: normalizedLocalCoordinateId,
    lessonNumber,
    atomId: normalizedAtomId,
    coordinateScope: normalizedAtomId ? "lesson-atom" : "lesson",
    lessonPlaneFrame,
    localIdentity: localIdentity ?? lessonPlaneFrame,
    evidenceFrames: frozenEvidenceFrames(evidenceFrames),
    sixFieldSignature: coordinate?.signature || null,
    proposedGlobalCoordinateId: coordinate?.globalCoordinateId || "",
    lessonNumberParticipatesInGlobalGrouping: false,
    atomIdentityParticipatesInGlobalGrouping: false,
    evidenceIdentityParticipatesInGlobalGrouping: false,
    localIdentityRemainsRecoverable: true,
    lessonNumberAuthority: false,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

export function buildClassicalGrammaticalAtlasAtomOperationProjectionFrame({
  atomId = "",
  atomLocalCoordinateId = "",
  operationId = "",
  compatibilitySignature = null,
  exactOperationLinkFrames = [],
  evidenceFrames = [],
} = {}) {
  const normalizedAtomId = text(atomId);
  const normalizedLocalCoordinateId = text(atomLocalCoordinateId);
  const normalizedOperationId = text(operationId);
  const coordinate = buildClassicalGrammaticalAtlasSixFieldCoordinateFrame({
    compatibilitySignature,
  });
  const acceptedExactOperationLinkFrames = Object.freeze(
    (Array.isArray(exactOperationLinkFrames)
      ? exactOperationLinkFrames
      : []).filter(frame => (
      frame?.kind
        === "classical-grammatical-atlas-population-exact-operation-link"
      && frame.exactOwnerEvidenceStatus === "exact"
      && frame.atomId === normalizedAtomId
      && frame.operationId === normalizedOperationId
      && Array.isArray(frame.evidenceKinds)
      && frame.evidenceKinds.length
      && frame.grammarAuthority === false
      && Object.isFrozen(frame)
    )),
  );
  const normalizedEvidenceKinds = normalizedSet(
    acceptedExactOperationLinkFrames.flatMap(frame => frame.evidenceKinds),
  );
  const complete = Boolean(
    normalizedAtomId
    && normalizedLocalCoordinateId
    && normalizedOperationId
    && coordinate.coordinateStatus === "declared"
    && acceptedExactOperationLinkFrames.length
    && normalizedEvidenceKinds.length
  );
  return Object.freeze({
    kind: "classical-grammatical-atlas-atom-operation-projection",
    version: ATLAS_VERSION,
    projectionStatus: complete
      ? "declared-operation-coordinate"
      : "incomplete",
    projectionId: complete
      ? `${normalizedLocalCoordinateId}/operation:${normalizedOperationId}`
      : "",
    atomId: normalizedAtomId,
    atomLocalCoordinateId: normalizedLocalCoordinateId,
    operationId: normalizedOperationId,
    evidenceKinds: normalizedEvidenceKinds,
    exactOperationLinkFrames: acceptedExactOperationLinkFrames,
    evidenceFrames: frozenEvidenceFrames([
      ...acceptedExactOperationLinkFrames,
      ...(Array.isArray(evidenceFrames) ? evidenceFrames : []),
    ]),
    sixFieldCoordinate: coordinate,
    sixFieldSignature: coordinate.sixFieldSignature,
    operationGlobalCoordinateId: coordinate.globalCoordinateId,
    exactOwnerOperationEvidenceRequired: true,
    proofFileCandidateEvidenceAcceptedAsExact: false,
    exactLinkShapePreservedWithoutGrantingIdentity:
      acceptedExactOperationLinkFrames.length > 0,
    callerSuppliedEvidenceKindsAcceptedAsExact: false,
    coordinateMayAuthorizeGrammar: false,
    grammarAuthority: false,
    lessonNumberAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function isDeclaredLessonLocalCoordinate(frame = null) {
  const coordinate = signatureCoordinate(frame?.lessonPlaneFrame);
  return Boolean(
    frame
    && frame.kind
      === "classical-grammatical-atlas-lesson-local-coordinate"
    && frame.coordinateStatus === "declared"
    && text(frame.localCoordinateId)
    && isDeclaredLessonPlane(frame.lessonPlaneFrame)
    && frame.proposedGlobalCoordinateId === coordinate?.globalCoordinateId
    && frame.grammarAuthority === false
    && Object.isFrozen(frame)
  );
}

function isDeclaredApplicationObservationShape(frame = null) {
  return Boolean(
    frame
    && frame.kind === "classical-grammar-application-atlas-observation"
    && frame.authorizationStatus === "observed"
    && text(frame.operationId)
    && frame.applicationResult
    && frame.canonicalResult
      === frame.applicationResult.canonicalResult
    && frame.exactOwnerIssuedResultObserved === true
    && frame.grammarAuthority === false
    && Object.isFrozen(frame)
  );
}

export function buildClassicalGrammaticalAtlasTypedNodeFrame({
  nodeType = "operation",
  nodeId = "",
  routePlaneFrame = null,
  applicationObservationFrame = null,
  localIdentity = null,
  evidenceFrames = [],
} = {}) {
  const normalizedNodeType = text(nodeType);
  const operationId = text(routePlaneFrame?.emptyPin?.operationId);
  const normalizedNodeId = text(nodeId) || (
    normalizedNodeType === "operation" && operationId
      ? `operation:${operationId}`
      : ""
  );
  const coordinate = isDeclaredRoutePlane(routePlaneFrame)
    ? signatureCoordinate(routePlaneFrame)
    : null;
  const applicationObservationShapeDeclared =
    isDeclaredApplicationObservationShape(
    applicationObservationFrame,
  );
  const complete = Boolean(
    ["operation", "application"].includes(normalizedNodeType)
    && normalizedNodeId
    && coordinate
    && (
      normalizedNodeType === "operation"
      || (
        applicationObservationShapeDeclared
        && applicationObservationFrame.operationId === operationId
      )
    )
  );
  const preservedLocalIdentity = localIdentity ?? (
    normalizedNodeType === "application"
      ? applicationObservationFrame?.applicationResult
      : routePlaneFrame
  );
  return Object.freeze({
    kind: "classical-grammatical-atlas-typed-node",
    version: ATLAS_VERSION,
    nodeStatus: complete ? "declared" : "incomplete",
    nodeType: normalizedNodeType,
    nodeId: normalizedNodeId,
    operationId,
    routePlaneFrame,
    applicationObservationFrame,
    localIdentity: preservedLocalIdentity,
    evidenceFrames: frozenEvidenceFrames(evidenceFrames),
    sixFieldSignature: coordinate?.signature || null,
    proposedGlobalCoordinateId: coordinate?.globalCoordinateId || "",
    declaredApplicationIdentityPreservedWithoutGrantingIssuance:
      normalizedNodeType === "application"
        && applicationObservationShapeDeclared,
    serviceIssuedIdentityMustBeValidatedExternally: true,
    nodeIdentityParticipatesInGlobalGrouping: false,
    evidenceIdentityParticipatesInGlobalGrouping: false,
    localIdentityRemainsRecoverable: true,
    lessonNumberAuthority: false,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function isDeclaredTypedNode(frame = null) {
  const routePlane = frame?.routePlaneFrame;
  const operationId = text(routePlane?.emptyPin?.operationId);
  const coordinate = signatureCoordinate(routePlane);
  return Boolean(
    frame
    && frame.kind === "classical-grammatical-atlas-typed-node"
    && frame.nodeStatus === "declared"
    && ["operation", "application"].includes(frame.nodeType)
    && text(frame.nodeId)
    && isDeclaredRoutePlane(routePlane)
    && frame.operationId === operationId
    && frame.proposedGlobalCoordinateId === coordinate?.globalCoordinateId
    && (
      frame.nodeType === "operation"
      || (
        isDeclaredApplicationObservationShape(
          frame.applicationObservationFrame,
        )
        && frame.applicationObservationFrame.operationId === operationId
      )
    )
    && frame.grammarAuthority === false
    && Object.isFrozen(frame)
  );
}

function rejection(kind, sourceFrame, reasons) {
  return Object.freeze({
    kind,
    version: ATLAS_VERSION,
    sourceFrame,
    reasons: Object.freeze(reasons),
    excludedFromGlobalCoordinates: true,
    grammarAuthority: false,
  });
}

function declaredOwnerProofObservationShape(observation = null) {
  return Boolean(
    observation
    && observation.kind
      === "classical-grammar-application-rhyme-owner-proof-observation"
    && observation.authorizationStatus === "observed"
    && text(observation.innerOperationId)
    && text(observation.outerOperationId)
    && Array.isArray(observation.sharedUnitKinds)
    && observation.sharedUnitKinds.length > 0
    && observation.exactInnerResultIdentityObservedInOuterArguments
      === true
    && observation.bothResultsOwnerValidated === true
    && observation.topologyCompatibilityObserved === true
    && observation.grammarAuthority === false
    && Object.isFrozen(observation)
  );
}

function proofMatchesPairAndLessonEdge(proof, pair, edge) {
  const proofUnitKinds = normalizedSet(proof.sharedUnitKinds);
  const pairUnitKinds = normalizedSet(pair.sharedUnitKinds);
  const pairFamilyUnitKinds = normalizedSet(pair.sharedFamilyUnitKinds);
  const lessonUnitKinds = normalizedSet(edge.sharedUnitKinds);
  return Boolean(
    proof.innerOperationId === pair.innerOperationId
    && proof.outerOperationId === pair.outerOperationId
    && proofUnitKinds.some(unitKind => pairUnitKinds.includes(unitKind))
    && pairFamilyUnitKinds.some(unitKind => (
      lessonUnitKinds.includes(unitKind)
    ))
  );
}

function sourceArray(value) {
  return Object.freeze([...(Array.isArray(value) ? value : [])]);
}

function uniqueByIdentityId(frames, identityId, rejectionKind) {
  const counts = new Map();
  frames.forEach(frame => {
    const id = identityId(frame);
    counts.set(id, Number(counts.get(id) || 0) + 1);
  });
  const accepted = [];
  const rejected = [];
  frames.forEach(frame => {
    const id = identityId(frame);
    if (counts.get(id) === 1) {
      accepted.push(frame);
    } else {
      rejected.push(rejection(
        rejectionKind,
        frame,
        [`duplicate-identity:${id}`],
      ));
    }
  });
  return { accepted, rejected };
}

function buildAtlas({
  lessonPlaneFrames = [],
  lessonLocalCoordinateFrames = [],
  routePlaneFrames = [],
  typedNodeFrames = [],
  ownerCalibrationFrame = null,
} = {}) {
  const suppliedLessonPlanes = sourceArray(lessonPlaneFrames);
  const suppliedLessonLocals = sourceArray(lessonLocalCoordinateFrames);
  const suppliedRoutePlanes = sourceArray(routePlaneFrames);
  const suppliedTypedNodes = sourceArray(typedNodeFrames);

  const validLessonPlanes = suppliedLessonPlanes.filter(
    isDeclaredLessonPlane,
  );
  const lessonPlaneUniqueness = uniqueByIdentityId(
    validLessonPlanes,
    frame => `L${Number(frame.lessonNumber)}`,
    "classical-grammatical-atlas-rejected-lesson-plane",
  );
  const acceptedLessonPlanes = lessonPlaneUniqueness.accepted.sort(
    (left, right) => Number(left.lessonNumber) - Number(right.lessonNumber),
  );
  const lessonPlaneByNumber = new Map(acceptedLessonPlanes.map(frame => [
    Number(frame.lessonNumber),
    frame,
  ]));
  const lessonCoordinateByNumber = new Map(acceptedLessonPlanes.map(frame => [
    Number(frame.lessonNumber),
    signatureCoordinate(frame),
  ]));
  const rejectedLessonPlanes = [
    ...lessonPlaneUniqueness.rejected,
    ...suppliedLessonPlanes.filter(frame => !isDeclaredLessonPlane(frame))
      .map(frame => rejection(
        "classical-grammatical-atlas-rejected-lesson-plane",
        frame,
        ["declared-non-authorizing-six-field-lesson-plane-required"],
      )),
  ];

  const validExplicitLocals = [];
  const rejectedLessonLocals = [];
  suppliedLessonLocals.forEach(frame => {
    const lessonNumber = Number(frame?.lessonNumber);
    const sourceCoordinate = signatureCoordinate(frame?.lessonPlaneFrame);
    const atlasCoordinate = lessonCoordinateByNumber.get(lessonNumber);
    const reasons = [];
    if (!isDeclaredLessonLocalCoordinate(frame)) {
      reasons.push("immutable-declared-lesson-local-coordinate-required");
    }
    if (!text(frame?.localCoordinateId)) {
      reasons.push("local-coordinate-id-required");
    }
    if (!atlasCoordinate) reasons.push("mapped-lesson-plane-required");
    if (
      sourceCoordinate?.globalCoordinateId
      !== atlasCoordinate?.globalCoordinateId
    ) reasons.push("lesson-plane-six-field-coordinate-mismatch");
    if (reasons.length) {
      rejectedLessonLocals.push(rejection(
        "classical-grammatical-atlas-rejected-lesson-local-coordinate",
        frame,
        reasons,
      ));
    } else {
      validExplicitLocals.push(frame);
    }
  });
  const explicitLocalUniqueness = uniqueByIdentityId(
    validExplicitLocals,
    frame => frame.localCoordinateId,
    "classical-grammatical-atlas-rejected-lesson-local-coordinate",
  );
  rejectedLessonLocals.push(...explicitLocalUniqueness.rejected);
  const explicitLessonNumbers = new Set(
    explicitLocalUniqueness.accepted.map(frame => Number(frame.lessonNumber)),
  );
  const defaultLessonLocals = acceptedLessonPlanes
    .filter(frame => !explicitLessonNumbers.has(Number(frame.lessonNumber)))
    .map(frame => buildClassicalGrammaticalAtlasLessonLocalCoordinateFrame({
      lessonPlaneFrame: frame,
    }));
  const assembledLessonLocals = [
    ...explicitLocalUniqueness.accepted,
    ...defaultLessonLocals,
  ];
  const assembledLocalUniqueness = uniqueByIdentityId(
    assembledLessonLocals,
    frame => frame.localCoordinateId,
    "classical-grammatical-atlas-rejected-lesson-local-coordinate",
  );
  rejectedLessonLocals.push(...assembledLocalUniqueness.rejected);
  const lessonLocals = Object.freeze(
    assembledLocalUniqueness.accepted.sort((left, right) => (
    Number(left.lessonNumber) - Number(right.lessonNumber)
    || compareText(left.localCoordinateId, right.localCoordinateId)
    )),
  );

  const validRoutePlanes = suppliedRoutePlanes.filter(isDeclaredRoutePlane);
  const routePlaneUniqueness = uniqueByIdentityId(
    validRoutePlanes,
    frame => text(frame.emptyPin.operationId),
    "classical-grammatical-atlas-rejected-route-plane",
  );
  const acceptedRoutePlanes = routePlaneUniqueness.accepted.sort(
    (left, right) => compareText(
      left.emptyPin.operationId,
      right.emptyPin.operationId,
    ),
  );
  const rejectedRoutePlanes = [
    ...routePlaneUniqueness.rejected,
    ...suppliedRoutePlanes.filter(frame => !isDeclaredRoutePlane(frame))
      .map(frame => rejection(
        "classical-grammatical-atlas-rejected-route-plane",
        frame,
        ["declared-non-authorizing-six-field-route-plane-required"],
      )),
  ];

  const validExplicitNodes = [];
  const rejectedTypedNodes = [];
  suppliedTypedNodes.forEach(frame => {
    const reasons = [];
    if (!isDeclaredTypedNode(frame)) {
      reasons.push("immutable-declared-typed-node-required");
    }
    if (!text(frame?.nodeId)) reasons.push("node-id-required");
    if (reasons.length) {
      rejectedTypedNodes.push(rejection(
        "classical-grammatical-atlas-rejected-typed-node",
        frame,
        reasons,
      ));
    } else {
      validExplicitNodes.push(frame);
    }
  });
  const typedNodeUniqueness = uniqueByIdentityId(
    validExplicitNodes,
    frame => frame.nodeId,
    "classical-grammatical-atlas-rejected-typed-node",
  );
  rejectedTypedNodes.push(...typedNodeUniqueness.rejected);
  const explicitOperationIds = new Set(
    typedNodeUniqueness.accepted
      .filter(frame => frame.nodeType === "operation")
      .map(frame => frame.operationId),
  );
  const defaultOperationNodes = acceptedRoutePlanes
    .filter(frame => !explicitOperationIds.has(frame.emptyPin.operationId))
    .map(frame => buildClassicalGrammaticalAtlasTypedNodeFrame({
      routePlaneFrame: frame,
    }));
  const assembledTypedNodes = [
    ...typedNodeUniqueness.accepted,
    ...defaultOperationNodes,
  ];
  const assembledNodeUniqueness = uniqueByIdentityId(
    assembledTypedNodes,
    frame => frame.nodeId,
    "classical-grammatical-atlas-rejected-typed-node",
  );
  rejectedTypedNodes.push(...assembledNodeUniqueness.rejected);
  const lessonLocalIds = new Set(lessonLocals.map(
    frame => frame.localCoordinateId,
  ));
  const collidingTypedNodes = assembledNodeUniqueness.accepted.filter(frame => (
    lessonLocalIds.has(frame.nodeId)
  ));
  rejectedTypedNodes.push(...collidingTypedNodes.map(frame => rejection(
    "classical-grammatical-atlas-rejected-typed-node",
    frame,
    [`cross-member-identity-collision:${frame.nodeId}`],
  )));
  const typedNodes = Object.freeze(assembledNodeUniqueness.accepted
    .filter(frame => !lessonLocalIds.has(frame.nodeId))
    .sort((left, right) => compareText(left.nodeId, right.nodeId)));

  const coordinateGroups = new Map();
  const addCoordinateMember = (globalCoordinateId, signature, field, frame) => {
    const group = coordinateGroups.get(globalCoordinateId) || {
      globalCoordinateId,
      signature,
      lessonLocals: [],
      typedNodes: [],
    };
    group[field].push(frame);
    coordinateGroups.set(globalCoordinateId, group);
  };
  lessonLocals.forEach(frame => addCoordinateMember(
    frame.proposedGlobalCoordinateId,
    frame.sixFieldSignature,
    "lessonLocals",
    frame,
  ));
  typedNodes.forEach(frame => addCoordinateMember(
    frame.proposedGlobalCoordinateId,
    frame.sixFieldSignature,
    "typedNodes",
    frame,
  ));
  const globalCoordinates = Object.freeze([...coordinateGroups.values()]
    .sort((left, right) => compareText(
      left.globalCoordinateId,
      right.globalCoordinateId,
    ))
    .map(group => Object.freeze({
      kind: "classical-grammatical-atlas-global-coordinate",
      version: ATLAS_VERSION,
      coordinateSystem: "classical-grammatical-atlas",
      globalCoordinateId: group.globalCoordinateId,
      sixFieldSignature: group.signature,
      lessonLocalCoordinates: Object.freeze([...group.lessonLocals]),
      lessonLocalCoordinateIds: Object.freeze(
        group.lessonLocals.map(frame => frame.localCoordinateId),
      ),
      typedNodes: Object.freeze([...group.typedNodes]),
      typedNodeIds: Object.freeze(
        group.typedNodes.map(frame => frame.nodeId),
      ),
      allLocalFrames: Object.freeze([
        ...group.lessonLocals,
        ...group.typedNodes,
      ]),
      localFrameIndex: Object.freeze(Object.fromEntries([
        ...group.lessonLocals.map(frame => [
          frame.localCoordinateId,
          frame,
        ]),
        ...group.typedNodes.map(frame => [frame.nodeId, frame]),
      ])),
      localMemberCount: group.lessonLocals.length + group.typedNodes.length,
      localIdentitiesRemainDistinct: true,
      exactEvidenceIdentityPreserved: true,
      globalGroupingUsesOnlyNormalizedSixFields: true,
      lessonNumberAuthority: false,
      grammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    })));
  const globalCoordinateById = new Map(globalCoordinates.map(frame => [
    frame.globalCoordinateId,
    frame,
  ]));
  const lessonLocalToGlobalMappings = Object.freeze(lessonLocals.map(frame => (
    Object.freeze({
      kind: "classical-grammatical-atlas-local-global-mapping",
      version: ATLAS_VERSION,
      memberType: "lesson-local-coordinate",
      localId: frame.localCoordinateId,
      localFrame: frame,
      globalCoordinateId: frame.proposedGlobalCoordinateId,
      globalCoordinate: globalCoordinateById.get(
        frame.proposedGlobalCoordinateId,
      ),
      grammarAuthority: false,
    })
  )));
  const typedNodeToGlobalMappings = Object.freeze(typedNodes.map(frame => (
    Object.freeze({
      kind: "classical-grammatical-atlas-local-global-mapping",
      version: ATLAS_VERSION,
      memberType: "typed-node",
      localId: frame.nodeId,
      localFrame: frame,
      globalCoordinateId: frame.proposedGlobalCoordinateId,
      globalCoordinate: globalCoordinateById.get(
        frame.proposedGlobalCoordinateId,
      ),
      grammarAuthority: false,
    })
  )));
  const localMappingById = Object.freeze(Object.fromEntries([
    ...lessonLocalToGlobalMappings,
    ...typedNodeToGlobalMappings,
  ].map(mapping => [mapping.localId, mapping])));
  const globalCoordinateIndex = Object.freeze(Object.fromEntries(
    globalCoordinates.map(frame => [frame.globalCoordinateId, frame]),
  ));

  const localsByLesson = new Map();
  lessonLocals.forEach(frame => {
    const frames = localsByLesson.get(frame.lessonNumber) || [];
    frames.push(frame);
    localsByLesson.set(frame.lessonNumber, frames);
  });
  const nodesByOperation = new Map();
  typedNodes.forEach(frame => {
    const frames = nodesByOperation.get(frame.operationId) || [];
    frames.push(frame);
    nodesByOperation.set(frame.operationId, frames);
  });
  const calibrationAccepted = Boolean(
    ownerCalibrationFrame?.kind
      === "classical-grammatical-rhyme-owner-calibration-frame"
    && ownerCalibrationFrame.grammarAuthority === false
    && ownerCalibrationFrame.callerSuppliedOwnerAuthorizationAccepted
      === false
    && Array.isArray(ownerCalibrationFrame.calibratedEdges)
    && Object.isFrozen(ownerCalibrationFrame)
  );
  const hyperedges = [];
  const rejectedOwnerEdges = [];
  const calibratedEdges = calibrationAccepted
    ? ownerCalibrationFrame.calibratedEdges
    : [];
  [...calibratedEdges].sort((left, right) => (
    Number(left?.innerLessonNumber) - Number(right?.innerLessonNumber)
    || Number(left?.outerLessonNumber) - Number(right?.outerLessonNumber)
  )).forEach(edge => {
    const innerLocals = localsByLesson.get(Number(edge?.innerLessonNumber))
      || [];
    const outerLocals = localsByLesson.get(Number(edge?.outerLessonNumber))
      || [];
    const declaredProofShapes = (Array.isArray(edge?.exactOwnerProofs)
      ? edge.exactOwnerProofs
      : []).filter(declaredOwnerProofObservationShape);
    const ownerRoutePairs = (Array.isArray(edge?.ownerRoutePairs)
      ? edge.ownerRoutePairs
      : []).filter(pair => (
      Object.isFrozen(pair)
      && declaredProofShapes.some(proof => (
        proofMatchesPairAndLessonEdge(proof, pair, edge)
      ))
    ));
    const verifiedSharedUnitKinds = normalizedSet(
      edge?.sharedUnitKinds,
    ).filter(unitKind => (
      innerLocals.some(frame => (
        frame.lessonPlaneFrame.compatibilitySignature
          .emittedUnitKinds.includes(unitKind)
      ))
      && outerLocals.some(frame => (
        frame.lessonPlaneFrame.compatibilitySignature
          .requiredUnitKinds.includes(unitKind)
      ))
    ));
    const reasons = [];
    if (
      edge?.kind
        !== "classical-grammatical-rhyme-calibrated-lesson-edge"
      || edge.grammarAuthority !== false
      || !Object.isFrozen(edge)
    ) reasons.push("non-authorizing-calibrated-lesson-edge-required");
    if (
      edge?.calibrationStatus !== "owner-contract-exactly-observed"
      || edge.exactOwnerProofObserved !== true
    ) reasons.push("declared-owner-observation-status-shape-required");
    if (!declaredProofShapes.length) {
      reasons.push("frozen-owner-proof-observation-shape-required");
    }
    if (!ownerRoutePairs.length) {
      reasons.push("proof-matched-owner-route-pair-required");
    }
    if (!verifiedSharedUnitKinds.length) {
      reasons.push("typed-lesson-boundary-unit-required");
    }
    if (!innerLocals.length || !outerLocals.length) {
      reasons.push("recoverable-lesson-local-endpoints-required");
    }
    if (reasons.length) {
      rejectedOwnerEdges.push(rejection(
        "classical-grammatical-atlas-unrepresented-owner-edge",
        edge,
        reasons,
      ));
      return;
    }
    const innerOperationIds = normalizedSet(ownerRoutePairs.map(
      pair => pair.innerOperationId,
    ));
    const outerOperationIds = normalizedSet(ownerRoutePairs.map(
      pair => pair.outerOperationId,
    ));
    const matchingInnerNodes = typedNodes.filter(node => (
      innerOperationIds.includes(node.operationId)
      && (
        node.nodeType === "operation"
        || declaredProofShapes.some(proof => (
          node.applicationObservationFrame?.applicationResult
            === proof.innerApplicationResult
        ))
      )
    ));
    const matchingOuterNodes = typedNodes.filter(node => (
      outerOperationIds.includes(node.operationId)
      && (
        node.nodeType === "operation"
        || declaredProofShapes.some(proof => (
          node.applicationObservationFrame?.applicationResult
            === proof.outerApplicationResult
        ))
      )
    ));
    // This generic core preserves declared application object relationships;
    // only the canonical application service can validate issued identity.
    // Atom-to-operation coordinates likewise stay behind the population
    // adapter's private issued-identity boundary. Keeping both boundaries
    // external prevents lookalike objects from gaining proof status here.
    const matchingInnerLocals = [];
    const matchingOuterLocals = [];
    const matchingInnerOperationProjections = [];
    const matchingOuterOperationProjections = [];
    const hyperedgeId = [
      "owner-shape",
      `L${edge.innerLessonNumber}`,
      `L${edge.outerLessonNumber}`,
      ownerRoutePairs.map(pair => (
        `${pair.innerOperationId}→${pair.outerOperationId}`
      )).sort(compareText).join("+"),
    ].join(":");
    hyperedges.push(Object.freeze({
      kind: "classical-grammatical-atlas-declared-owner-hyperedge",
      version: ATLAS_VERSION,
      hyperedgeId,
      innerLessonNumber: Number(edge.innerLessonNumber),
      outerLessonNumber: Number(edge.outerLessonNumber),
      innerLessonLocalCoordinates: Object.freeze([
        ...matchingInnerLocals,
      ]),
      outerLessonLocalCoordinates: Object.freeze([
        ...matchingOuterLocals,
      ]),
      innerLessonLocalCoordinateIds: Object.freeze(
        matchingInnerLocals.map(frame => frame.localCoordinateId),
      ),
      outerLessonLocalCoordinateIds: Object.freeze(
        matchingOuterLocals.map(frame => frame.localCoordinateId),
      ),
      innerAtomOperationProjections: Object.freeze([
        ...matchingInnerOperationProjections,
      ]),
      outerAtomOperationProjections: Object.freeze([
        ...matchingOuterOperationProjections,
      ]),
      innerGlobalCoordinateIds: normalizedSet(
        matchingInnerOperationProjections.map(
          frame => frame.operationGlobalCoordinateId,
        ),
      ),
      outerGlobalCoordinateIds: normalizedSet(
        matchingOuterOperationProjections.map(
          frame => frame.operationGlobalCoordinateId,
        ),
      ),
      innerLessonScopeLocalCoordinateCount: innerLocals.length,
      outerLessonScopeLocalCoordinateCount: outerLocals.length,
      innerLessonScopeGlobalCoordinateIds: normalizedSet(innerLocals.map(
        frame => frame.proposedGlobalCoordinateId,
      )),
      outerLessonScopeGlobalCoordinateIds: normalizedSet(outerLocals.map(
        frame => frame.proposedGlobalCoordinateId,
      )),
      innerTypedNodes: Object.freeze([...matchingInnerNodes]),
      outerTypedNodes: Object.freeze([...matchingOuterNodes]),
      innerTypedNodeIds: Object.freeze(
        matchingInnerNodes.map(frame => frame.nodeId),
      ),
      outerTypedNodeIds: Object.freeze(
        matchingOuterNodes.map(frame => frame.nodeId),
      ),
      sharedUnitKinds: Object.freeze(verifiedSharedUnitKinds),
      sharedRhymeAxes: normalizedSet(edge.sharedRhymeAxes),
      ownerRoutePairs: Object.freeze([...ownerRoutePairs]),
      declaredOwnerProofObservationShapes: Object.freeze([
        ...declaredProofShapes,
      ]),
      calibratedLessonEdge: edge,
      ownerValidationStatus:
        "declared-owner-proof-shape-external-validation-required",
      atomEndpointStatus: "no-atom-operation-coordinate-claimed",
      atomOperationCoordinatesRemainPopulationAdapterOwned: true,
      lessonScopeDidNotCreateAtomEndpoints: true,
      atomEndpointsAreDiagnosticNotOwnerAuthorization: true,
      declaredApplicationNodesMatchProofObjectIdentity: true,
      serviceIssuedIdentitiesMustBeValidatedExternally: true,
      ownerObservationIsEvidenceNotGrammarAuthority: true,
      callerSuppliedAuthorizationAccepted: false,
      lessonNumberAuthority: false,
      grammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    }));
  });

  const sourceInputs = Object.freeze({
    lessonPlaneFrames: suppliedLessonPlanes,
    lessonLocalCoordinateFrames: suppliedLessonLocals,
    routePlaneFrames: suppliedRoutePlanes,
    typedNodeFrames: suppliedTypedNodes,
    ownerCalibrationFrame,
  });
  return Object.freeze({
    kind: "classical-grammatical-atlas-frame",
    version: ATLAS_VERSION,
    coordinateSystem: "classical-grammatical-atlas",
    sourceInputs,
    lessonPlaneCount: acceptedLessonPlanes.length,
    lessonPlanes: Object.freeze([...acceptedLessonPlanes]),
    lessonLocalCoordinateCount: lessonLocals.length,
    lessonLocalCoordinates: lessonLocals,
    typedNodeCount: typedNodes.length,
    typedNodes,
    globalCoordinateCount: globalCoordinates.length,
    globalCoordinates,
    lessonLocalToGlobalMappings,
    typedNodeToGlobalMappings,
    localMappingById,
    globalCoordinateIndex,
    declaredOwnerHyperedgeCount: hyperedges.length,
    declaredOwnerHyperedges: Object.freeze(hyperedges),
    rejectedLessonPlanes: Object.freeze(rejectedLessonPlanes),
    rejectedLessonLocalCoordinates: Object.freeze(rejectedLessonLocals),
    rejectedRoutePlanes: Object.freeze(rejectedRoutePlanes),
    rejectedTypedNodes: Object.freeze(rejectedTypedNodes),
    unrepresentedOwnerEdges: Object.freeze(rejectedOwnerEdges),
    ownerCalibrationAccepted: calibrationAccepted,
    globalGroupingUsesOnlyNormalizedSixFields: true,
    forwardBackwardRoundTripSupported: true,
    exactLocalAndEvidenceIdentityPreserved: true,
    rebuildsPurelyFromCurrentSourceInputs: true,
    serviceIssuedIdentityMustBeValidatedExternally: true,
    callerSuppliedOwnerAuthorizationAccepted: false,
    atlasMayAuthorizeGrammar: false,
    lessonNumberAuthority: false,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

export function buildClassicalGrammaticalAtlasFrame(inputs = {}) {
  return buildAtlas(inputs);
}

export function updateClassicalGrammaticalAtlasFrame(
  atlasFrame = null,
  replacements = {},
) {
  if (atlasFrame?.kind !== "classical-grammatical-atlas-frame") {
    return buildAtlas(replacements);
  }
  const prior = atlasFrame.sourceInputs;
  const next = {};
  [
    "lessonPlaneFrames",
    "lessonLocalCoordinateFrames",
    "routePlaneFrames",
    "typedNodeFrames",
    "ownerCalibrationFrame",
  ].forEach(field => {
    next[field] = Object.prototype.hasOwnProperty.call(replacements, field)
      ? replacements[field]
      : prior[field];
  });
  return buildAtlas(next);
}

export function projectClassicalGrammaticalAtlasLocalCoordinate(
  atlasFrame = null,
  localCoordinateId = "",
) {
  if (atlasFrame?.kind !== "classical-grammatical-atlas-frame") return null;
  const normalizedId = text(localCoordinateId);
  return atlasFrame.localMappingById?.[normalizedId] || null;
}

export function recoverClassicalGrammaticalAtlasGlobalCoordinate(
  atlasFrame = null,
  globalCoordinateId = "",
) {
  if (atlasFrame?.kind !== "classical-grammatical-atlas-frame") return null;
  const coordinate = atlasFrame.globalCoordinateIndex?.[
    text(globalCoordinateId)
  ];
  if (!coordinate) return null;
  return Object.freeze({
    kind: "classical-grammatical-atlas-global-local-recovery",
    version: ATLAS_VERSION,
    globalCoordinate: coordinate,
    lessonLocalCoordinates: coordinate.lessonLocalCoordinates,
    typedNodes: coordinate.typedNodes,
    localFrameIndex: coordinate.localFrameIndex,
    allLocalFrames: coordinate.allLocalFrames,
    everyLocalIdentityRemainsRecoverable: true,
    grammarAuthority: false,
  });
}

export function roundTripClassicalGrammaticalAtlasLocalCoordinate(
  atlasFrame = null,
  localCoordinateId = "",
) {
  const forward = projectClassicalGrammaticalAtlasLocalCoordinate(
    atlasFrame,
    localCoordinateId,
  );
  const backward = forward
    ? recoverClassicalGrammaticalAtlasGlobalCoordinate(
      atlasFrame,
      forward.globalCoordinateId,
    )
    : null;
  const recoveredLocalFrame = backward?.localFrameIndex?.[
    forward?.localId
  ] || null;
  const exactEvidenceIdentityPreserved = Boolean(
    recoveredLocalFrame
    && recoveredLocalFrame.evidenceFrames.length
      === forward.localFrame.evidenceFrames.length
    && recoveredLocalFrame.evidenceFrames.every((frame, index) => (
      frame === forward.localFrame.evidenceFrames[index]
    ))
  );
  const exactLocalFrameIdentityPreserved = Boolean(
    recoveredLocalFrame && recoveredLocalFrame === forward.localFrame
  );
  return Object.freeze({
    kind: "classical-grammatical-atlas-round-trip",
    version: ATLAS_VERSION,
    localId: text(localCoordinateId),
    globalCoordinateId: forward?.globalCoordinateId || "",
    forward,
    backward,
    recoveredLocalFrame,
    exactLocalFrameIdentityPreserved,
    exactLocalIdentityPreserved: Boolean(
      exactLocalFrameIdentityPreserved
      && recoveredLocalFrame.localIdentity
        === forward.localFrame.localIdentity
    ),
    exactEvidenceIdentityPreserved,
    roundTripStatus:
      exactLocalFrameIdentityPreserved && exactEvidenceIdentityPreserved
        ? "lossless"
        : "incomplete",
    grammarAuthority: false,
  });
}

export const CLASSICAL_GRAMMATICAL_ATLAS_VERSION = ATLAS_VERSION;
