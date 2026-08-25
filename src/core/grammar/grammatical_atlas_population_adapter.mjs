import {
  CLASSICAL_LESSONS_1_58_RHYME_PLANES,
} from "./classical_lessons_1_58_rhyme_map.mjs?v=20260825-launch-ready-293";
import {
  buildClassicalGrammaticalAtlasAtomOperationProjectionFrame,
  buildClassicalGrammaticalAtlasFrame,
  buildClassicalGrammaticalAtlasLessonLocalCoordinateFrame,
  buildClassicalGrammaticalAtlasSixFieldCoordinateFrame,
} from "./grammatical_atlas.mjs?v=20260823-grammatical-atlas-live-bridge-256";

const POPULATION_ADAPTER_VERSION = 2;
const EXACT_POPULATION_OPERATION_PROJECTIONS = new WeakSet();
let canonicalPopulationFrame = null;
let canonicalPopulationLoadPromise = null;
let canonicalPopulationLoadAttempt = 0;
let canonicalPopulationVersionKey = "";
let canonicalPopulationLoadVersionKey = "";

function text(value = "") {
  return String(value ?? "").trim();
}

function frozenArray(values = []) {
  return Object.freeze([...(Array.isArray(values) ? values : [])]);
}

function tupleRecord(tuple = [], fields = []) {
  return Object.fromEntries(fields.map((field, index) => [
    field,
    tuple[index],
  ]));
}

function cardinality(count = 0) {
  if (count === 0) return "zero";
  if (count === 1) return "single";
  return "multiple";
}

function frozenIndex(entries = []) {
  return Object.freeze(Object.fromEntries(entries));
}

function frozenArrayIndex(keys = []) {
  return new Map(keys.map(key => [key, []]));
}

function freezeArrayIndex(index) {
  return frozenIndex([...index].map(([key, values]) => [
    key,
    frozenArray(values),
  ]));
}

function nonAuthority() {
  return {
    lessonNumberAuthority: false,
    exampleIdentityAuthority: false,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  };
}

function rejectedAtom(sourceTuple, reasons) {
  return Object.freeze({
    kind: "classical-grammatical-atlas-population-rejected-atom",
    version: POPULATION_ADAPTER_VERSION,
    sourceTuple,
    reasons: frozenArray(reasons),
    excludedFromAtlas: true,
    ...nonAuthority(),
  });
}

function decodeDirectAxisCoordinateFrames(population) {
  return Object.freeze(population.directAxisCoordinates.map(
    (sourceTuple, coordinateIndex) => {
      const decoded = tupleRecord(
        sourceTuple,
        population.codebook.directAxisCoordinateTuple,
      );
      const operationId = population.operations[decoded.operationIndex]
        || "";
      return Object.freeze({
        kind: "classical-grammatical-atlas-direct-axis-evidence",
        version: POPULATION_ADAPTER_VERSION,
        coordinateIndex,
        applicationAxisAtomId: text(decoded.applicationAxisAtomId),
        operationIndex: Number(decoded.operationIndex),
        operationId,
        axisId: text(decoded.axisId),
        sourceTuple,
        referencedOperationExists: Boolean(operationId),
        evidenceMayAuthorizeGrammar: false,
        ...nonAuthority(),
      });
    },
  ));
}

function decodeOperationCoordinateFrames(population) {
  return Object.freeze(population.operations.map((operationId, operationIndex) => {
    const sourceTuple = population.operationSixFieldSignatures[
      operationIndex
    ];
    const decoded = tupleRecord(
      sourceTuple,
      population.codebook.operationSixFieldTuple,
    );
    const sixFieldCoordinate =
      buildClassicalGrammaticalAtlasSixFieldCoordinateFrame({
        compatibilitySignature: decoded,
      });
    return Object.freeze({
      kind: "classical-grammatical-atlas-population-operation-coordinate",
      version: POPULATION_ADAPTER_VERSION,
      operationIndex,
      operationId: text(operationId),
      sourceTuple,
      sixFieldCoordinate,
      sixFieldSignature: sixFieldCoordinate.sixFieldSignature,
      operationGlobalCoordinateId: sixFieldCoordinate.globalCoordinateId,
      exactCanonicalInventoryCoordinatePreserved: true,
      coordinateMayAuthorizeGrammar: false,
      ...nonAuthority(),
    });
  }));
}

function decodeExactOperationLinkSources({
  population,
  operationCoordinateFrames,
}) {
  const byAtomIndex = new Map();
  const links = population.exactOperationLinks.map((sourceTuple, linkIndex) => {
    const decoded = tupleRecord(
      sourceTuple,
      population.codebook.exactOperationLinkTuple,
    );
    const atomIndex = Number(decoded.atomIndex);
    const operationIndex = Number(decoded.operationIndex);
    const evidenceKindSet = population.operationEvidenceKindSets[
      Number(decoded.operationEvidenceKindSetIndex)
    ] || [];
    const evidenceKinds = frozenArray(evidenceKindSet.map(kindIndex => (
      population.codebook.operationEvidenceKinds[kindIndex] || ""
    )).filter(Boolean));
    const operationCoordinateFrame = operationCoordinateFrames[
      operationIndex
    ] || null;
    const atomTuple = population.atoms[atomIndex] || null;
    const atomRecord = atomTuple
      ? tupleRecord(atomTuple, population.codebook.atomTuple)
      : null;
    const link = Object.freeze({
      kind: "classical-grammatical-atlas-population-exact-operation-link",
      version: POPULATION_ADAPTER_VERSION,
      linkIndex,
      atomIndex,
      atomId: text(atomRecord?.atomId),
      operationIndex,
      operationId: operationCoordinateFrame?.operationId || "",
      operationCoordinateFrame,
      evidenceKinds,
      sourceTuple,
      exactOwnerEvidenceStatus: operationCoordinateFrame
        && evidenceKinds.length
        ? "exact"
        : "invalid",
      candidateProofSetDidNotAuthorizeLink: true,
      grammarAuthority: false,
      ...nonAuthority(),
    });
    const atomLinks = byAtomIndex.get(atomIndex) || [];
    atomLinks.push(link);
    byAtomIndex.set(atomIndex, atomLinks);
    return link;
  });
  return Object.freeze({
    links: Object.freeze(links),
    byAtomIndex,
  });
}

function decodePopulationAtoms({
  population,
  lessonPlaneByNumber,
  directAxisCoordinateFrames,
  exactOperationLinksByAtomIndex,
  brandExactOperationProjections = false,
}) {
  const localCoordinateFrames = [];
  const atomEvidenceFrames = [];
  const decodedAtoms = [];
  const rejectedAtoms = [];
  population.atoms.forEach((sourceTuple, sourceAtomIndex) => {
    const decoded = tupleRecord(sourceTuple, population.codebook.atomTuple);
    const atomId = text(decoded.atomId);
    const lessonNumber = Number(decoded.lessonNumber);
    const groupTuple = population.groups[Number(decoded.groupIndex)];
    const group = groupTuple
      ? tupleRecord(groupTuple, population.codebook.groupTuple)
      : null;
    const lessonPlaneFrame = lessonPlaneByNumber.get(lessonNumber) || null;
    const proofFileCandidateOperationSet =
      population.proofFileCandidateOperationSets[
        Number(decoded.proofFileCandidateOperationSetIndex)
      ];
    const directAxisSet = population.directAxisEvidenceSets[
      Number(decoded.directAxisEvidenceSetIndex)
    ];
    const exactOperationLinkSources = frozenArray(
      exactOperationLinksByAtomIndex.get(sourceAtomIndex) || [],
    );
    const reasons = [];
    if (!atomId) reasons.push("atom-id-required");
    if (!lessonPlaneFrame) reasons.push("lesson-plane-required");
    if (!group || Number(group.lessonNumber) !== lessonNumber) {
      reasons.push("lesson-group-join-invalid");
    }
    if (!Array.isArray(proofFileCandidateOperationSet)) {
      reasons.push("proof-file-candidate-operation-set-required");
    }
    if (!Array.isArray(directAxisSet)) {
      reasons.push("direct-axis-evidence-set-required");
    }
    const proofFileCandidateOperationIds = frozenArray(
      (proofFileCandidateOperationSet || []).map(
        operationIndex => population.operations[operationIndex] || "",
      ),
    );
    if (proofFileCandidateOperationIds.some(operationId => !operationId)) {
      reasons.push("candidate-operation-required");
    }
    const directAxisEvidenceFrames = frozenArray((directAxisSet || []).map(
      coordinateIndex => directAxisCoordinateFrames[coordinateIndex],
    ));
    if (directAxisEvidenceFrames.some(frame => !frame)) {
      reasons.push("direct-axis-coordinate-required");
    }
    const semanticOwner = population.semanticOwners[
      Number(decoded.semanticOwnerIndex)
    ] || "";
    const semanticOwnerOperation = population.semanticOwnerOperations[
      Number(decoded.semanticOwnerOperationIndex)
    ] || "";
    const evidenceDisposition = population.codebook.evidenceDispositions[
      Number(decoded.evidenceDispositionIndex)
    ] || "";
    if (!evidenceDisposition) reasons.push("evidence-disposition-required");
    if (exactOperationLinkSources.some(link => (
      link.exactOwnerEvidenceStatus !== "exact"
      || !link.operationId
      || link.atomIndex !== sourceAtomIndex
    ))) {
      reasons.push("exact-operation-link-invalid");
    }
    if (reasons.length) {
      rejectedAtoms.push(rejectedAtom(sourceTuple, reasons));
      return;
    }
    const localCoordinateId = [
      `L${lessonNumber}`,
      text(group.groupId),
      atomId,
    ].join("/");
    const exactOperationIds = frozenArray(population.operations.filter(
      operationId => exactOperationLinkSources.some(
        link => link.operationId === operationId,
      ),
    ));
    const operationCoordinateProjections = frozenArray(
      exactOperationLinkSources.map(link => (
        buildClassicalGrammaticalAtlasAtomOperationProjectionFrame({
          atomId,
          atomLocalCoordinateId: localCoordinateId,
          operationId: link.operationId,
          compatibilitySignature:
            link.operationCoordinateFrame.sixFieldSignature,
          exactOperationLinkFrames: [link],
        })
      )),
    );
    if (operationCoordinateProjections.some(projection => (
      projection.projectionStatus !== "declared-operation-coordinate"
      || projection.atomId !== atomId
      || !exactOperationIds.includes(projection.operationId)
    ))) {
      rejectedAtoms.push(rejectedAtom(sourceTuple, [
        "exact-operation-coordinate-projection-invalid",
      ]));
      return;
    }
    if (brandExactOperationProjections) {
      operationCoordinateProjections.forEach(projection => {
        EXACT_POPULATION_OPERATION_PROJECTIONS.add(projection);
      });
    }
    const force = population.codebook.forces[Number(decoded.forceIndex)]
      || "";
    const projectRole = population.codebook.projectRoles[
      Number(decoded.projectRoleIndex)
    ] || "";
    const direction = population.codebook.directions[
      Number(decoded.directionIndex)
    ] || "";
    const status = population.codebook.statuses[
      Number(decoded.statusIndex)
    ] || "";
    const atomEvidenceFrame = Object.freeze({
      kind: "classical-grammatical-atlas-population-atom-evidence",
      version: POPULATION_ADAPTER_VERSION,
      sourceAtomIndex,
      atomId,
      lessonNumber,
      groupIndex: Number(decoded.groupIndex),
      groupId: text(group.groupId),
      semanticOwnerIndex: Number(decoded.semanticOwnerIndex),
      semanticOwner,
      semanticOwnerOperationIndex: Number(
        decoded.semanticOwnerOperationIndex,
      ),
      semanticOwnerOperation,
      forceIndex: Number(decoded.forceIndex),
      force,
      projectRoleIndex: Number(decoded.projectRoleIndex),
      projectRole,
      directionIndex: Number(decoded.directionIndex),
      direction,
      statusIndex: Number(decoded.statusIndex),
      status,
      evidenceDispositionIndex: Number(decoded.evidenceDispositionIndex),
      evidenceDisposition,
      proofFileCandidateOperationSetIndex: Number(
        decoded.proofFileCandidateOperationSetIndex,
      ),
      proofFileCandidateOperationIds,
      proofFileCandidateMappingCardinality: cardinality(
        proofFileCandidateOperationIds.length,
      ),
      exactOperationIds,
      exactOperationMappingCardinality: cardinality(
        exactOperationIds.length,
      ),
      exactOperationLinkSources,
      operationCoordinateProjections,
      directAxisEvidenceSetIndex: Number(
        decoded.directAxisEvidenceSetIndex,
      ),
      directAxisEvidenceFrames,
      sourceTuple,
      proofFileCandidatesRemainNonAuthorizing: true,
      onlyExactOwnerEvidenceCreatesOperationCoordinates: true,
      evidenceMayAuthorizeGrammar: false,
      ...nonAuthority(),
    });
    const localCoordinateFrame =
      buildClassicalGrammaticalAtlasLessonLocalCoordinateFrame({
        lessonPlaneFrame,
        localCoordinateId,
        atomId,
        localIdentity: sourceTuple,
        evidenceFrames: [
          atomEvidenceFrame,
          ...directAxisEvidenceFrames,
          ...operationCoordinateProjections,
        ],
      });
    localCoordinateFrames.push(localCoordinateFrame);
    atomEvidenceFrames.push(atomEvidenceFrame);
    decodedAtoms.push({
      sourceTuple,
      atomId,
      lessonNumber,
      groupId: text(group.groupId),
      localCoordinateId,
      proofFileCandidateOperationIds,
      exactOperationIds,
      operationCoordinateProjections,
      directAxisEvidenceFrames,
      atomEvidenceFrame,
      localCoordinateFrame,
    });
  });
  return {
    decodedAtoms,
    localCoordinateFrames: Object.freeze(localCoordinateFrames),
    atomEvidenceFrames: Object.freeze(atomEvidenceFrames),
    rejectedAtoms: Object.freeze(rejectedAtoms),
  };
}

function buildLessonOwnerEvidenceFrames({
  population,
  lessonPlaneFrames,
  atomCoordinates,
}) {
  const atomsByLesson = new Map(lessonPlaneFrames.map(frame => [
    Number(frame.lessonNumber),
    [],
  ]));
  atomCoordinates.forEach(atom => {
    atomsByLesson.get(atom.lessonNumber)?.push(atom);
  });
  const sourceLessonTupleByNumber = new Map(population.lessons.map(tuple => [
    Number(tuple[0]),
    tuple,
  ]));
  return Object.freeze(lessonPlaneFrames.map(lessonPlaneFrame => {
    const lessonNumber = Number(lessonPlaneFrame.lessonNumber);
    const atoms = atomsByLesson.get(lessonNumber) || [];
    const exactOperationSet = new Set(atoms.flatMap(
      atom => atom.exactOperationIds,
    ));
    const operationIds = frozenArray(population.operations.filter(
      operationId => exactOperationSet.has(operationId),
    ));
    const proofFileCandidateSet = new Set(atoms.flatMap(
      atom => atom.proofFileCandidateOperationIds,
    ));
    const proofFileCandidateOperationIds = frozenArray(
      population.operations.filter(
        operationId => proofFileCandidateSet.has(operationId),
      ),
    );
    const zeroOperationAtomIds = frozenArray(atoms
      .filter(atom => atom.exactOperationIds.length === 0)
      .map(atom => atom.atomId));
    const singleOperationAtomIds = frozenArray(atoms
      .filter(atom => atom.exactOperationIds.length === 1)
      .map(atom => atom.atomId));
    const multipleOperationAtomIds = frozenArray(atoms
      .filter(atom => atom.exactOperationIds.length > 1)
      .map(atom => atom.atomId));
    const evidenceDispositionCounts = Object.freeze(Object.fromEntries(
      population.codebook.evidenceDispositions.map(disposition => [
        disposition,
        atoms.filter(atom => (
          atom.atomEvidenceFrame.evidenceDisposition === disposition
        )).length,
      ]),
    ));
    const acceptedImplementationEvidencePresent = atoms.some(atom => (
      atom.atomEvidenceFrame.status === "ACTIVE"
    ));
    const acceptedWritingOwnerLinkPending = Number(
      evidenceDispositionCounts["accepted-writing-owner-link-pending"] || 0,
    );
    return Object.freeze({
      kind: "classical-grammatical-rhyme-lesson-owner-evidence",
      version: POPULATION_ADAPTER_VERSION,
      lessonNumber,
      lessonPlaneFrame,
      sourceLessonTuple: sourceLessonTupleByNumber.get(lessonNumber) || null,
      populationStatus: atoms.length ? "populated" : "unpopulated",
      atomCount: atoms.length,
      operationIds,
      operationMappingCardinality: cardinality(operationIds.length),
      proofFileCandidateOperationIds,
      proofFileCandidateMappingCardinality: cardinality(
        proofFileCandidateOperationIds.length,
      ),
      zeroOperationAtomIds,
      singleOperationAtomIds,
      multipleOperationAtomIds,
      evidenceDispositionCounts,
      acceptedImplementationEvidencePresent,
      operationIndexStatus: operationIds.length
        ? "owner-index-present"
        : acceptedWritingOwnerLinkPending
          ? "owner-index-pending"
          : atoms.length
            ? "owner-index-not-required-or-not-application"
            : "accepted-evidence-pending",
      exactOwnerOperationLinksOnly: true,
      proofFileCandidatesRemainNonAuthorizing: true,
      ownerEvidenceAuthorizesGrammar: false,
      ...nonAuthority(),
    });
  }));
}

function buildIndexes({
  population,
  atlasFrame,
  atomCoordinates,
  operationCoordinateFrames,
}) {
  const lessonGlobalCoordinateIds = atlasFrame.globalCoordinates.map(
    frame => frame.globalCoordinateId,
  );
  const operationGlobalCoordinateIds = [...new Set(
    operationCoordinateFrames.map(frame => frame.operationGlobalCoordinateId),
  )];
  const atomIdsByLessonGlobalCoordinateId = frozenArrayIndex(
    lessonGlobalCoordinateIds,
  );
  const atomIdsByOperationGlobalCoordinateId = frozenArrayIndex(
    operationGlobalCoordinateIds,
  );
  const candidateAtomIdsByOperationId = frozenArrayIndex(
    population.operations,
  );
  const directAxisAtomIdsByOperationId = frozenArrayIndex(
    population.operations,
  );
  const exactAtomIdsByOperationId = frozenArrayIndex(population.operations);
  const localCoordinateIdsByOperationId = frozenArrayIndex(
    population.operations,
  );
  const atomByIdEntries = [];
  const atomByLocalCoordinateIdEntries = [];
  const localCoordinateIdByAtomIdEntries = [];
  const lessonGlobalCoordinateIdByAtomIdEntries = [];
  const proofFileCandidateOperationIdsByAtomIdEntries = [];
  const directAxisOperationIdsByAtomIdEntries = [];
  const exactOperationIdsByAtomIdEntries = [];
  const operationGlobalCoordinateIdsByAtomIdEntries = [];
  const operationCoordinateProjectionsByAtomIdEntries = [];
  atomCoordinates.forEach(atom => {
    const lessonProjection = atlasFrame.localMappingById[
      atom.localCoordinateId
    ];
    const lessonGlobalCoordinateId =
      lessonProjection?.globalCoordinateId || "";
    const directAxisOperationIds = frozenArray(population.operations.filter(
      operationId => atom.directAxisEvidenceFrames.some(
        frame => frame.operationId === operationId,
      ),
    ));
    const exactOperationIds = frozenArray(population.operations.filter(
      operationId => atom.exactOperationIds.includes(operationId),
    ));
    const operationGlobalCoordinateIds = frozenArray([...new Set(
      atom.operationCoordinateProjections.map(
        projection => projection.operationGlobalCoordinateId,
      ),
    )]);
    const coordinate = Object.freeze({
      kind: "classical-grammatical-atlas-population-atom-coordinate",
      version: POPULATION_ADAPTER_VERSION,
      atomId: atom.atomId,
      lessonNumber: atom.lessonNumber,
      groupId: atom.groupId,
      localCoordinateId: atom.localCoordinateId,
      lessonGlobalCoordinateId,
      globalCoordinateId: lessonGlobalCoordinateId,
      proofFileCandidateOperationIds: atom.proofFileCandidateOperationIds,
      exactOperationIds,
      operationIds: exactOperationIds,
      directAxisOperationIds,
      operationGlobalCoordinateIds,
      operationCoordinateProjections: atom.operationCoordinateProjections,
      directAxisEvidenceFrames: atom.directAxisEvidenceFrames,
      atomEvidenceFrame: atom.atomEvidenceFrame,
      localCoordinateFrame: atom.localCoordinateFrame,
      sourceTuple: atom.sourceTuple,
      localIdentityRemainsExact:
        atom.localCoordinateFrame.localIdentity === atom.sourceTuple,
      lessonAndOperationCoordinatesRemainDistinct: true,
      candidateProofSetsDoNotCreateOperationCoordinates: true,
      coordinateMayAuthorizeGrammar: false,
      ...nonAuthority(),
    });
    atomByIdEntries.push([atom.atomId, coordinate]);
    atomByLocalCoordinateIdEntries.push([
      atom.localCoordinateId,
      coordinate,
    ]);
    localCoordinateIdByAtomIdEntries.push([
      atom.atomId,
      atom.localCoordinateId,
    ]);
    lessonGlobalCoordinateIdByAtomIdEntries.push([
      atom.atomId,
      lessonGlobalCoordinateId,
    ]);
    proofFileCandidateOperationIdsByAtomIdEntries.push([
      atom.atomId,
      atom.proofFileCandidateOperationIds,
    ]);
    directAxisOperationIdsByAtomIdEntries.push([
      atom.atomId,
      directAxisOperationIds,
    ]);
    exactOperationIdsByAtomIdEntries.push([
      atom.atomId,
      exactOperationIds,
    ]);
    operationGlobalCoordinateIdsByAtomIdEntries.push([
      atom.atomId,
      operationGlobalCoordinateIds,
    ]);
    operationCoordinateProjectionsByAtomIdEntries.push([
      atom.atomId,
      atom.operationCoordinateProjections,
    ]);
    atomIdsByLessonGlobalCoordinateId.get(
      lessonGlobalCoordinateId,
    )?.push(atom.atomId);
    atom.proofFileCandidateOperationIds.forEach(operationId => {
      candidateAtomIdsByOperationId.get(operationId)?.push(atom.atomId);
    });
    directAxisOperationIds.forEach(operationId => {
      directAxisAtomIdsByOperationId.get(operationId)?.push(atom.atomId);
    });
    exactOperationIds.forEach(operationId => {
      exactAtomIdsByOperationId.get(operationId)?.push(atom.atomId);
      localCoordinateIdsByOperationId.get(operationId)?.push(
        atom.localCoordinateId,
      );
    });
    operationGlobalCoordinateIds.forEach(globalCoordinateId => {
      atomIdsByOperationGlobalCoordinateId.get(globalCoordinateId)?.push(
        atom.atomId,
      );
    });
  });
  const exactAtomIndex = freezeArrayIndex(exactAtomIdsByOperationId);
  const lessonGlobalCoordinateIndex = freezeArrayIndex(
    atomIdsByLessonGlobalCoordinateId,
  );
  return Object.freeze({
    atomById: frozenIndex(atomByIdEntries),
    atomByLocalCoordinateId: frozenIndex(atomByLocalCoordinateIdEntries),
    localCoordinateIdByAtomId: frozenIndex(
      localCoordinateIdByAtomIdEntries,
    ),
    lessonGlobalCoordinateIdByAtomId: frozenIndex(
      lessonGlobalCoordinateIdByAtomIdEntries,
    ),
    globalCoordinateIdByAtomId: frozenIndex(
      lessonGlobalCoordinateIdByAtomIdEntries,
    ),
    proofFileCandidateOperationIdsByAtomId: frozenIndex(
      proofFileCandidateOperationIdsByAtomIdEntries,
    ),
    directAxisOperationIdsByAtomId: frozenIndex(
      directAxisOperationIdsByAtomIdEntries,
    ),
    exactOperationIdsByAtomId: frozenIndex(
      exactOperationIdsByAtomIdEntries,
    ),
    operationIdsByAtomId: frozenIndex(exactOperationIdsByAtomIdEntries),
    operationGlobalCoordinateIdsByAtomId: frozenIndex(
      operationGlobalCoordinateIdsByAtomIdEntries,
    ),
    operationCoordinateProjectionsByAtomId: frozenIndex(
      operationCoordinateProjectionsByAtomIdEntries,
    ),
    atomIdsByLessonGlobalCoordinateId: lessonGlobalCoordinateIndex,
    atomIdsByGlobalCoordinateId: lessonGlobalCoordinateIndex,
    atomIdsByOperationGlobalCoordinateId: freezeArrayIndex(
      atomIdsByOperationGlobalCoordinateId,
    ),
    candidateAtomIdsByOperationId: freezeArrayIndex(
      candidateAtomIdsByOperationId,
    ),
    directAxisAtomIdsByOperationId: freezeArrayIndex(
      directAxisAtomIdsByOperationId,
    ),
    exactAtomIdsByOperationId: exactAtomIndex,
    atomIdsByOperationId: exactAtomIndex,
    localCoordinateIdsByOperationId: freezeArrayIndex(
      localCoordinateIdsByOperationId,
    ),
    indexesMayAuthorizeGrammar: false,
    ...nonAuthority(),
  });
}

function buildPopulationFrame({
  population,
  lessonPlaneFrames = CLASSICAL_LESSONS_1_58_RHYME_PLANES,
  brandExactOperationProjections = false,
} = {}) {
  if (!population || typeof population !== "object") {
    throw new Error(
      "A checked Classical Grammatical Atlas population is required.",
    );
  }
  const acceptedLessonPlanes = frozenArray(lessonPlaneFrames).filter(
    frame => (
      frame?.kind === "classical-grammatical-rhyme-lesson-plane-frame"
      && frame.planeStatus === "declared"
      && Number.isInteger(Number(frame.lessonNumber))
      && frame.grammarAuthority === false
      && Object.isFrozen(frame)
    ),
  );
  const lessonPlaneByNumber = new Map(acceptedLessonPlanes.map(frame => [
    Number(frame.lessonNumber),
    frame,
  ]));
  const directAxisCoordinateFrames =
    decodeDirectAxisCoordinateFrames(population);
  const operationCoordinateFrames = decodeOperationCoordinateFrames(
    population,
  );
  const exactOperationLinkSources = decodeExactOperationLinkSources({
    population,
    operationCoordinateFrames,
  });
  const decoded = decodePopulationAtoms({
    population,
    lessonPlaneByNumber,
    directAxisCoordinateFrames,
    exactOperationLinksByAtomIndex: exactOperationLinkSources.byAtomIndex,
    brandExactOperationProjections,
  });
  const atlasFrame = buildClassicalGrammaticalAtlasFrame({
    lessonPlaneFrames: acceptedLessonPlanes,
    lessonLocalCoordinateFrames: decoded.localCoordinateFrames,
  });
  const preliminaryAtomCoordinates = decoded.decodedAtoms;
  const indexes = buildIndexes({
    population,
    atlasFrame,
    atomCoordinates: preliminaryAtomCoordinates,
    operationCoordinateFrames,
  });
  const atomCoordinates = Object.freeze(Object.values(indexes.atomById));
  const lessonOwnerEvidenceFrames = buildLessonOwnerEvidenceFrames({
    population,
    lessonPlaneFrames: acceptedLessonPlanes,
    atomCoordinates,
  });
  const populatedLessonNumbers = new Set(atomCoordinates.map(
    atom => atom.lessonNumber,
  ));
  const unpopulatedLessonNumbers = frozenArray(acceptedLessonPlanes
    .map(frame => Number(frame.lessonNumber))
    .filter(lessonNumber => !populatedLessonNumbers.has(lessonNumber)));
  const defaultLessonLocalCoordinates = Object.freeze(
    atlasFrame.lessonLocalCoordinates.filter(frame => (
      unpopulatedLessonNumbers.includes(frame.lessonNumber)
    )),
  );
  const directAxisLinkCount = atomCoordinates.reduce((count, atom) => (
    count + atom.directAxisEvidenceFrames.length
  ), 0);
  const exactOperationProjectionCount = atomCoordinates.reduce(
    (count, atom) => count + atom.operationCoordinateProjections.length,
    0,
  );
  const proofFileCandidateLinkCount = atomCoordinates.reduce(
    (count, atom) => (
      count + atom.proofFileCandidateOperationIds.length
    ),
    0,
  );
  return Object.freeze({
    kind: "classical-grammatical-atlas-population-frame",
    version: POPULATION_ADAPTER_VERSION,
    population,
    sourceDigest: population.sourceDigests?.combined || "",
    sourceAtomCount: population.atoms.length,
    populatedAtomCount: atomCoordinates.length,
    rejectedAtomCount: decoded.rejectedAtoms.length,
    rejectedAtoms: decoded.rejectedAtoms,
    populatedLessonCount: populatedLessonNumbers.size,
    unpopulatedLessonNumbers,
    defaultLessonLocalCoordinateCount:
      defaultLessonLocalCoordinates.length,
    defaultLessonLocalCoordinates,
    atomEvidenceFrames: decoded.atomEvidenceFrames,
    atomLocalCoordinateFrames: decoded.localCoordinateFrames,
    atomCoordinates,
    directAxisCoordinateFrames,
    directAxisLinkCount,
    operationCoordinateFrames,
    exactOperationLinkFrames: exactOperationLinkSources.links,
    exactOperationProjectionCount,
    proofFileCandidateLinkCount,
    lessonOwnerEvidenceFrames,
    atlasFrame,
    indexes,
    generatedPopulationIsEvidenceOnly: true,
    proofFileCandidatesDoNotAuthorizeOperationCoordinates: true,
    operationCoordinatesRequireExactOwnerEvidence: true,
    exactCanonicalOwnerStillRequired: true,
    adapterMayAuthorizeGrammar: false,
    ...nonAuthority(),
  });
}

export function buildClassicalGrammaticalAtlasPopulationFrame(options = {}) {
  return buildPopulationFrame({
    ...options,
    brandExactOperationProjections: false,
  });
}

function normalizedPopulationVersion(populationVersion = null) {
  const normalized = populationVersion && typeof populationVersion === "object"
    ? populationVersion
    : null;
  const version = text(normalized?.version);
  const sourceDigest = text(normalized?.sourceDigest);
  const populationDigest = text(normalized?.populationDigest);
  const populatedLessonNumbers = frozenArray(
    normalized?.populatedLessonNumbers,
  ).map(Number);
  const activeCount = Number(normalized?.counts?.active);
  const pendingCount = Number(normalized?.counts?.pending);
  if (
    !normalized
    || normalized.kind !== "classical-grammatical-atlas-population-version"
    || !version
    || !sourceDigest
    || !populationDigest
    || populatedLessonNumbers.some(number => !Number.isInteger(number))
    || !Number.isInteger(activeCount)
    || !Number.isInteger(pendingCount)
  ) {
    throw new Error(
      "A generated Classical Grammatical Atlas population version is required.",
    );
  }
  return Object.freeze({
    version,
    sourceDigest,
    populationDigest,
    populatedLessonNumbers: Object.freeze(populatedLessonNumbers),
    populationSchemaVersion: Number(normalized.populationSchemaVersion),
    atomCount: Number(normalized.counts?.atoms),
    lessonCount: Number(normalized.counts?.lessons),
    activeCount,
    pendingCount,
  });
}

async function computedPopulationPayloadDigest(population) {
  if (
    typeof globalThis.TextEncoder !== "function"
    || typeof globalThis.crypto?.subtle?.digest !== "function"
  ) {
    throw new Error("SHA-256 payload hashing is unavailable.");
  }
  const payload = new globalThis.TextEncoder().encode(JSON.stringify(population));
  const digest = await globalThis.crypto.subtle.digest("SHA-256", payload);
  return `sha256:${Array.from(new Uint8Array(digest), byte => (
    byte.toString(16).padStart(2, "0")
  )).join("")}`;
}

export async function inspectClassicalGrammaticalAtlasPopulationCommit({
  population = null,
  populationPayloadDigest = "",
  populationVersion = null,
} = {}) {
  let normalizedVersion = null;
  let computedPayloadDigest = "";
  const reasons = [];
  try {
    normalizedVersion = normalizedPopulationVersion(populationVersion);
  } catch {
    reasons.push("generated-population-version-required");
  }
  if (!population || typeof population !== "object") {
    reasons.push("generated-population-payload-required");
  } else {
    try {
      computedPayloadDigest = await computedPopulationPayloadDigest(population);
    } catch {
      reasons.push("population-payload-hashing-unavailable");
    }
  }
  if (normalizedVersion && population) {
    if (text(populationPayloadDigest) !== normalizedVersion.populationDigest) {
      reasons.push("population-payload-digest-mismatch");
    }
    if (
      computedPayloadDigest
      && computedPayloadDigest !== text(populationPayloadDigest)
    ) {
      reasons.push("population-computed-payload-digest-mismatch");
    }
    if (
      computedPayloadDigest
      && computedPayloadDigest !== normalizedVersion.populationDigest
    ) {
      reasons.push("population-version-payload-digest-mismatch");
    }
    if (population.sourceDigests?.combined !== normalizedVersion.sourceDigest) {
      reasons.push("population-source-digest-mismatch");
    }
    if (Number(population.schemaVersion)
      !== normalizedVersion.populationSchemaVersion) {
      reasons.push("population-schema-version-mismatch");
    }
    if (population.atoms?.length !== normalizedVersion.atomCount) {
      reasons.push("population-atom-count-mismatch");
    }
    if (population.lessons?.length !== normalizedVersion.lessonCount) {
      reasons.push("population-lesson-count-mismatch");
    }
    if (Number(population.counts?.active) !== normalizedVersion.activeCount) {
      reasons.push("population-active-count-mismatch");
    }
    if (Number(population.counts?.pending) !== normalizedVersion.pendingCount) {
      reasons.push("population-pending-count-mismatch");
    }
    if (JSON.stringify(population.scope?.populatedLessonNumbers || [])
      !== JSON.stringify(normalizedVersion.populatedLessonNumbers)) {
      reasons.push("population-populated-lessons-mismatch");
    }
  }
  return Object.freeze({
    kind: "classical-grammatical-atlas-population-commit-inspection",
    version: 1,
    status: reasons.length ? "invalid" : "matched",
    reasons: Object.freeze(reasons),
    exactProjectionBrandingAllowed: reasons.length === 0,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function canonicalPopulationModuleUrl(populationVersion) {
  const url = new URL(
    "../../../data/classical_grammatical_atlas_population.mjs",
    import.meta.url,
  );
  url.searchParams.set(
    "v",
    populationVersion.version,
  );
  if (canonicalPopulationLoadAttempt > 1) {
    url.searchParams.set("retry", String(canonicalPopulationLoadAttempt));
  }
  return url.href;
}

export function getClassicalGrammaticalAtlasPopulationFrameIfReady() {
  return canonicalPopulationFrame;
}

export async function loadClassicalGrammaticalAtlasPopulationFrame({
  populationVersion,
} = {}) {
  const normalizedVersion = normalizedPopulationVersion(populationVersion);
  const versionKey = [
    normalizedVersion.version,
    normalizedVersion.sourceDigest,
    normalizedVersion.populationDigest,
  ].join("|");
  if (
    canonicalPopulationFrame
    && canonicalPopulationVersionKey === versionKey
  ) return canonicalPopulationFrame;
  if (canonicalPopulationLoadPromise) {
    if (canonicalPopulationLoadVersionKey === versionKey) {
      return canonicalPopulationLoadPromise;
    }
    return canonicalPopulationLoadPromise.catch(() => null).then(() => (
      loadClassicalGrammaticalAtlasPopulationFrame({ populationVersion })
    ));
  }
  if (
    canonicalPopulationVersionKey !== versionKey
    && canonicalPopulationLoadVersionKey !== versionKey
  ) {
    canonicalPopulationFrame = null;
    canonicalPopulationLoadAttempt = 0;
  }
  canonicalPopulationLoadAttempt += 1;
  canonicalPopulationLoadVersionKey = versionKey;
  canonicalPopulationLoadPromise = import(
    canonicalPopulationModuleUrl(normalizedVersion)
  ).then(async module => {
    const population = module.CLASSICAL_GRAMMATICAL_ATLAS_POPULATION;
    const commitInspection =
      await inspectClassicalGrammaticalAtlasPopulationCommit({
        population,
        populationPayloadDigest: module
          .CLASSICAL_GRAMMATICAL_ATLAS_POPULATION_PAYLOAD_DIGEST,
        populationVersion,
      });
    if (commitInspection.status !== "matched") {
      throw new Error(
        `The generated Classical Grammatical Atlas population version does not match its payload: ${commitInspection.reasons.join(", ")}`,
      );
    }
    canonicalPopulationFrame = buildPopulationFrame({
      population,
      brandExactOperationProjections: true,
    });
    canonicalPopulationVersionKey = versionKey;
    canonicalPopulationLoadPromise = null;
    canonicalPopulationLoadVersionKey = "";
    return canonicalPopulationFrame;
  }).catch(error => {
    canonicalPopulationLoadPromise = null;
    canonicalPopulationFrame = null;
    canonicalPopulationVersionKey = "";
    canonicalPopulationLoadVersionKey = versionKey;
    throw error;
  });
  return canonicalPopulationLoadPromise;
}

export function getClassicalGrammaticalAtlasBaseFrameIfReady() {
  return canonicalPopulationFrame?.atlasFrame || null;
}

export function getClassicalGrammaticalAtlasLessonOwnerEvidenceFramesIfReady() {
  return canonicalPopulationFrame?.lessonOwnerEvidenceFrames || null;
}

export const CLASSICAL_GRAMMATICAL_ATLAS_POPULATION_ADAPTER_VERSION =
  POPULATION_ADAPTER_VERSION;

export function isClassicalGrammaticalAtlasPopulationExactOperationProjection(
  frame,
) {
  return Boolean(
    frame
    && EXACT_POPULATION_OPERATION_PROJECTIONS.has(frame)
    && frame.projectionStatus === "declared-operation-coordinate"
    && frame.coordinateMayAuthorizeGrammar === false
    && Object.isFrozen(frame)
  );
}
