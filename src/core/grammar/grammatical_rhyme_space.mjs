const RHYME_SPACE_VERSION = 6;

const INPUT_SEMANTIC_ROLES = Object.freeze(new Set([
  "architecture-invariant",
  "boundary-conditioned-fact",
  "contextual-fact",
  "genuine-user-choice",
  "lexical-fact",
]));
const ADDED_SEMANTIC_ROLES = Object.freeze(new Set([
  "boundary-conditioned-fact",
  "derived-fact",
]));
const EXPLICIT_REMOVAL_AXIS_PATTERN = /^(?:elided-result|loss-result)$/u;
const UNIVERSAL_ABSENCE_REQUIREMENTS = Object.freeze([
  "copied-or-forged-result-identity",
  "example-identity-authority",
  "formula-string-authority",
  "lesson-number-authority",
  "surface-string-authority",
]);
const UNIVERSAL_PRESERVATIONS = Object.freeze([
  "exact-typed-source-arguments",
  "owner-issued-result-identity",
  "typed-source-history",
]);
const LESSON_ROTATION_MOVEMENTS = Object.freeze({
  F: "formation",
  C: "continuation",
  R: "reading-analysis",
  P: "composition",
});

function text(value) {
  return String(value == null ? "" : value).trim();
}

function normalizedList(values = []) {
  return Object.freeze([...new Set(
    (Array.isArray(values) ? values : [])
      .map(text)
      .filter(Boolean),
  )]);
}

function continuationFamilyUnitKind(unitKind = "") {
  const normalized = text(unitKind);
  if (
    normalized === "nnc-diagram-slot-frame"
    || normalized === "nnc-sentence-slot-frame"
    || normalized === "nnc-embeddable-result"
  ) {
    return "nnc-result";
  }
  return normalized;
}

function freezePin(pin = {}) {
  return Object.freeze(Object.fromEntries(
    Object.entries(pin || {}).map(([key, value]) => [
      key,
      Array.isArray(value) ? normalizedList(value) : text(value),
    ]),
  ));
}

function pinSignature(pin = {}) {
  return Object.entries(pin)
    .map(([key, value]) => (
      `${key}=${Array.isArray(value) ? value.join("+") : value}`
    ))
    .join("|");
}

function valueKind(value) {
  if (value == null) return "null";
  if (Array.isArray(value)) return "array";
  if (typeof value === "object") {
    return text(value.kind) || "typed-object";
  }
  return typeof value;
}

function canonicalResultKind(result = null) {
  if (!Array.isArray(result)) {
    return text(result?.kind);
  }
  const memberKinds = normalizedList(result.map(member => member?.kind));
  return memberKinds.length
    ? `collection:${memberKinds.join("+")}`
    : "";
}

function inferUnitKindsFromText(values = []) {
  const joined = (Array.isArray(values) ? values : [values])
    .map(value => text(value).toLowerCase())
    .join(" ");
  const kinds = [];
  const add = kind => {
    if (!kinds.includes(kind)) kinds.push(kind);
  };
  if (/(?:phon|phone|segment|sound|spell|stress|syllab|transcription|vocable|orthograph|carrier)/u.test(joined)) {
    add("phonological-unit");
  }
  if (/(?:particle)/u.test(joined)) add("particle-result");
  if (/(?:\bvnc\b|verbstem|verb-stem|finite-vnc)/u.test(joined)) {
    add("vnc-result");
  }
  if (/(?:\bnnc\b|nounstem|noun-stem|deverbal-nnc|nominal-construction|gentilic|relational-nnc|adjectiv|personal-name)/u.test(joined)) {
    add("nnc-result");
  }
  if (/(?:clause|sentence|supplement|conjunction|comparison|adjunction|vocative|reported-speech)/u.test(joined)) {
    add("clause-result");
  }
  if (!kinds.length) add("typed-structure");
  return Object.freeze(kinds);
}

function inferLessonUnitKinds(pinText = "", rhymeAxes = [], role = "input") {
  const pin = text(pinText).toLowerCase();
  const nonNuclearClausePin = pin.replaceAll("nuclear-clause", "nuclear unit");
  const axes = normalizedList(rhymeAxes)
    .map(axis => axis.toLowerCase())
    .join(" ");
  const kinds = [];
  const add = kind => {
    if (!kinds.includes(kind)) kinds.push(kind);
  };
  const hasExplicitVnc = /(?:\bvnc\b|verbstem|verb-stem|finite intransitive|finite transitive|intransitive source|transitive source|predicate and paradigm)/u.test(pin);
  const hasExplicitNnc = /(?:\bnnc\b|nounstem|noun-stem|pronominal subtype|nominalized predicate)/u.test(pin);
  if (/(?:phon|sound|spelling|stress|syllab|transcription|vocable|orthograph|segment)/u.test(pin)) {
    add("phonological-unit");
  }
  if (/\bparticle/u.test(pin)) add("particle-result");
  if (hasExplicitVnc) add("vnc-result");
  if (hasExplicitNnc) add("nnc-result");
  if (/(?:clause|sentence|supplement|conjunct|comparison|adjunction|vocative|report construction)/u.test(nonNuclearClausePin)) {
    add("clause-result");
  }
  if (role === "output" && /(?:optative|admonitive)/u.test(pin)) {
    add("vnc-result");
    add("clause-result");
  }
  if (role === "output" && /(?:complementation|comparison result)/u.test(pin)) {
    add("clause-result");
  }
  if (role === "output" && /(?:adverbialized unit|incorporated, adverbial, or complement)/u.test(pin)) {
    add("vnc-result");
    add("nnc-result");
    add("clause-result");
  }
  if (role === "output" && /(?:instrumental, exclamatory, incorporated-subject)/u.test(pin)) {
    add("vnc-result");
    add("nnc-result");
    add("clause-result");
  }
  if (!kinds.length) {
    if (/(?:causativ|applicative|frequentative|nonactive|passive|impersonal|purposive|honorific|reverential|pejorative|denominal|directive)/u.test(pin)) {
      add("vnc-result");
    }
    if (/(?:agentive|patientive|instrumentive|adjectiv|gentilic|relational|place-name|affective|numeral)/u.test(pin)) {
      add(role === "input" && /nominalization/u.test(axes)
        ? "vnc-result"
        : "nnc-result");
    }
    if (
      role === "input"
      && /nominalization/u.test(axes)
      && /(?:result|root|stock|source|predicate)/u.test(pin)
    ) {
      add("vnc-result");
    }
    if (
      !kinds.length
      && /(?:voice|valence)/u.test(axes)
      && !/nominalization/u.test(axes)
    ) {
      add("vnc-result");
    }
  }
  if (!kinds.length) add("typed-structure");
  return Object.freeze(kinds);
}

function lessonRotationSteps(rotation = "") {
  return Object.freeze(
    (text(rotation).match(/[FCRP]/gu) || [])
      .map(symbol => LESSON_ROTATION_MOVEMENTS[symbol])
      .filter(Boolean),
  );
}

function inferEmittedUnitKinds(operationId = "", resultKinds = []) {
  const operation = text(operationId).toLowerCase();
  const explicitTransitions = {
    "grammar:nominal-construction": ["vnc-result", "nnc-result"],
    "nnc:adverbial": ["vnc-result", "nnc-result", "clause-result"],
  };
  if (explicitTransitions[operation]) {
    return Object.freeze([...explicitTransitions[operation]]);
  }
  return inferUnitKindsFromText([operation, ...resultKinds]);
}

function inferRequiredUnitKinds(operationId = "", axisIds = []) {
  const operation = text(operationId).toLowerCase();
  const explicitTransitions = {
    "grammar:nominal-construction": ["vnc-result", "nnc-result"],
    "nnc:adjectival-modification": ["nnc-result"],
    "nnc:adverbial": ["vnc-result", "nnc-result"],
    "nnc:deverbal-construction": ["vnc-result", "nnc-result"],
    "nnc:personal-name": ["nnc-result", "clause-result"],
    "nnc:place-gentilic": ["nnc-result"],
    "nnc:relational": ["vnc-result", "nnc-result"],
    "vnc:denominal": ["nnc-result"],
  };
  if (explicitTransitions[operation]) {
    return Object.freeze([...explicitTransitions[operation]]);
  }
  if (operation.startsWith("phonology:") || operation.startsWith("orthography:")) {
    return Object.freeze(["phonological-unit"]);
  }
  if (operation.startsWith("particle:")) {
    return Object.freeze(["particle-result"]);
  }
  if (
    operation.startsWith("sentence:")
    || operation.startsWith("clause:")
  ) {
    return Object.freeze(["clause-result", "vnc-result", "nnc-result"]);
  }
  if (operation.startsWith("vnc:")) {
    return Object.freeze(["vnc-result"]);
  }
  if (operation.startsWith("nnc:")) {
    return Object.freeze(["nnc-result"]);
  }
  return inferUnitKindsFromText([operation, ...axisIds]);
}

function inferMovementKind(operationId = "", axisIds = []) {
  const operation = text(operationId).toLowerCase();
  const joined = [operationId, ...axisIds]
    .map(value => text(value).toLowerCase())
    .join(" ");
  if (
    operation.startsWith("phonology:")
    || operation.startsWith("orthography:")
    || /:(?:diagram|finite-surface|sentence-surface)$/u.test(operation)
  ) {
    return "realization";
  }
  if (
    operation.startsWith("clause:")
    || operation.startsWith("sentence:")
    || /(?:\.unit\.compose|\.structure\.recurse|\.stem\.compound)$/u.test(
      operation,
    )
  ) {
    return "composition";
  }
  if (
    /(?:^concept:|\.interpret$|\.analyze$|\.classify$|\.validate$|:classification$)/u.test(
      operation,
    )
  ) {
    return "reading-analysis";
  }
  if (
    operation.startsWith("vnc:")
    || operation.startsWith("nnc:")
    || operation.startsWith("grammar:")
  ) {
    return "formation";
  }
  if (/(?:phonology|orthography|realization|surface|diagram|spelling|stress|syllab)/u.test(joined)) {
    return "realization";
  }
  if (/(?:compose|composition|compound|adjunction|conjunction|supplement|group)/u.test(joined)) {
    return "composition";
  }
  if (/(?:interpret|reading|analy|classif|validate|taxonomy|distinction)/u.test(joined)) {
    return "reading-analysis";
  }
  if (/(?:deriv|formation|nominal|stem|voice|valence|state|inflection)/u.test(joined)) {
    return "formation";
  }
  return "typed-transformation";
}

function buildCompatibilitySignature({
  operationId = "",
  outputKinds = [],
  resultKinds = [],
  axisIds = [],
  axisRoles = {},
  axisOwnerCounts = {},
  axisConstraintDeclarations = {},
  continuationInputUnitKinds = [],
  continuationOutputUnitKinds = [],
} = {}) {
  const requiresPresent = normalizedList([
    "canonical-owner-validation",
    "typed-application-request",
    ...axisIds.filter(axisId => (
      INPUT_SEMANTIC_ROLES.has(text(axisRoles?.[axisId]))
      || !text(axisRoles?.[axisId])
    )),
  ]);
  const requiresAbsent = normalizedList([
    ...UNIVERSAL_ABSENCE_REQUIREMENTS,
    ...Object.keys(axisConstraintDeclarations || {}).map(
      axisId => `unlicensed-owner-coordinate:${axisId}`,
    ),
  ]);
  const adds = normalizedList(axisIds.filter(axisId => (
    ADDED_SEMANTIC_ROLES.has(text(axisRoles?.[axisId]))
  )));
  const removes = normalizedList(axisIds.filter(axisId => (
    EXPLICIT_REMOVAL_AXIS_PATTERN.test(text(axisId))
  )));
  const preserves = normalizedList([
    ...UNIVERSAL_PRESERVATIONS,
    ...axisIds.filter(axisId => (
      Number(axisOwnerCounts?.[axisId] || 0) > 1
      && INPUT_SEMANTIC_ROLES.has(text(axisRoles?.[axisId]))
    )),
  ]);
  const requiredUnitKinds = inferRequiredUnitKinds(operationId, axisIds);
  const emittedUnitKinds = inferEmittedUnitKinds(
    operationId,
    resultKinds,
  );
  const emits = normalizedList([
    ...outputKinds.map(outputKind => `output-kind:${outputKind}`),
    ...resultKinds.map(resultKind => `result-kind:${resultKind}`),
    ...emittedUnitKinds.map(unitKind => `unit-kind:${unitKind}`),
  ]);
  const movementKind = inferMovementKind(operationId, axisIds);
  const exactContinuationInputUnitKinds = normalizedList(
    continuationInputUnitKinds,
  );
  const exactContinuationOutputUnitKinds = normalizedList(
    continuationOutputUnitKinds,
  );
  return Object.freeze({
    kind: "classical-grammatical-rhyme-compatibility-signature",
    version: RHYME_SPACE_VERSION,
    requiresPresent,
    requiresAbsent,
    adds,
    removes,
    preserves,
    emits,
    requiredUnitKinds,
    emittedUnitKinds,
    exactContinuationInputUnitKinds,
    exactContinuationOutputUnitKinds,
    continuationTypeContractDeclared: Boolean(
      exactContinuationInputUnitKinds.length
      || exactContinuationOutputUnitKinds.length
    ),
    movementKind,
    movementCoordinateId: [
      requiredUnitKinds.join("+"),
      movementKind,
      emittedUnitKinds.join("+"),
    ].join("→"),
    everyAxisAccountedFor: axisIds.every(axisId => (
      requiresPresent.includes(axisId)
      || adds.includes(axisId)
      || removes.includes(axisId)
      || preserves.includes(axisId)
    )),
    exactOwnerStillDecidesCompatibility: true,
    lessonNumberAuthority: false,
    exampleIdentityAuthority: false,
    grammarAuthority: false,
  });
}

export function buildClassicalGrammaticalRhymeRoutePlaneFrame({
  operationId = "",
  outputKinds = [],
  resultKinds = [],
  axisIds = [],
  axisRoles = {},
  axisOwnerCounts = {},
  axisConstraintDeclarations = {},
  continuationInputUnitKinds = [],
  continuationOutputUnitKinds = [],
} = {}) {
  const requiredAxisIds = normalizedList(axisIds);
  const normalizedOutputKinds = normalizedList(outputKinds);
  const classifiedAxisIds = Object.freeze(requiredAxisIds.filter(
    axisId => text(axisRoles?.[axisId]),
  ));
  const unresolvedAxisIds = Object.freeze(requiredAxisIds.filter(
    axisId => !text(axisRoles?.[axisId]),
  ));
  const sharedAxisIds = Object.freeze(requiredAxisIds.filter(
    axisId => Number(axisOwnerCounts?.[axisId] || 0) > 1,
  ));
  const distinctAxisIds = Object.freeze(requiredAxisIds.filter(
    axisId => !sharedAxisIds.includes(axisId),
  ));
  const complete = Boolean(
    text(operationId)
    && requiredAxisIds.length
    && normalizedOutputKinds.length
  );
  const compatibilitySignature = buildCompatibilitySignature({
    operationId,
    outputKinds: normalizedOutputKinds,
    resultKinds,
    axisIds: requiredAxisIds,
    axisRoles,
    axisOwnerCounts,
    axisConstraintDeclarations,
    continuationInputUnitKinds,
    continuationOutputUnitKinds,
  });
  return Object.freeze({
    kind: "classical-grammatical-rhyme-route-plane-frame",
    version: RHYME_SPACE_VERSION,
    coordinateSystem: "classical-grammatical-rhyme-space",
    planeStatus: complete ? "declared" : "incomplete",
    emptyPin: freezePin({
      operationId,
      outputKinds: normalizedOutputKinds,
      requiredAxisIds,
    }),
    rotation: Object.freeze({
      sharedAxisIds,
      distinctAxisIds,
      alignmentStatus: sharedAxisIds.length
        ? "shares-rhyme-coordinates"
        : "dimensionally-distinct-plane",
    }),
    classifiedAxisIds,
    unresolvedAxisIds,
    compatibilitySignature,
    insideOutCompatibilityDeclared:
      compatibilitySignature.everyAxisAccountedFor,
    roleClassificationIsNonAuthorizing: true,
    lessonNumberAuthority: false,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

export function buildClassicalGrammaticalRhymeLessonPlaneFrame({
  lessonNumber = 0,
  emptiness = "",
  fullness = "",
  rotation = "",
  rhymeAxes = [],
} = {}) {
  const normalizedLessonNumber = Number(lessonNumber);
  const normalizedEmptiness = text(emptiness);
  const normalizedFullness = text(fullness);
  const normalizedRotation = text(rotation);
  const normalizedAxes = normalizedList(rhymeAxes);
  const rotationSteps = lessonRotationSteps(normalizedRotation);
  const requiredUnitKinds = inferLessonUnitKinds(
    normalizedEmptiness,
    normalizedAxes,
    "input",
  );
  const emittedUnitKinds = inferLessonUnitKinds(
    normalizedFullness,
    normalizedAxes,
    "output",
  );
  const movementAdds = normalizedList(rotationSteps
    .filter(movement => movement !== "continuation")
    .map(movement => `movement:${movement}`));
  const namedRemovals = normalizedList([
    /(?:deletion|elision|loss)/u.test(
      `${normalizedEmptiness} ${normalizedFullness}`.toLowerCase(),
    ) ? "licensed-structural-removal" : "",
  ]);
  const complete = Boolean(
    Number.isInteger(normalizedLessonNumber)
    && normalizedLessonNumber > 0
    && normalizedEmptiness
    && normalizedFullness
    && rotationSteps.length
    && normalizedAxes.length
  );
  const compatibilitySignature = Object.freeze({
    kind: "classical-grammatical-rhyme-lesson-compatibility-signature",
    version: RHYME_SPACE_VERSION,
    requiresPresent: normalizedList([
      "canonical-consumer-owner-validation",
      "exact-typed-source-or-owner-issued-result",
      ...requiredUnitKinds.map(unitKind => `unit-kind:${unitKind}`),
      ...normalizedAxes.map(axis => `rhyme-axis:${axis}`),
    ]),
    requiresAbsent: normalizedList(UNIVERSAL_ABSENCE_REQUIREMENTS),
    adds: movementAdds,
    removes: namedRemovals,
    preserves: normalizedList(UNIVERSAL_PRESERVATIONS),
    emits: normalizedList(
      emittedUnitKinds.map(unitKind => `unit-kind:${unitKind}`),
    ),
    requiredUnitKinds,
    emittedUnitKinds,
    rotationSteps,
    everyMapCoordinateAccountedFor: Boolean(
      requiredUnitKinds.length
      && emittedUnitKinds.length
      && rotationSteps.length
      && normalizedAxes.length
    ),
    exactOwnerStillDecidesCompatibility: true,
    lessonNumberAuthority: false,
    exampleIdentityAuthority: false,
    grammarAuthority: false,
  });
  return Object.freeze({
    kind: "classical-grammatical-rhyme-lesson-plane-frame",
    version: RHYME_SPACE_VERSION,
    coordinateSystem: "classical-grammatical-rhyme-space",
    planeStatus: complete ? "declared" : "incomplete",
    lessonNumber: normalizedLessonNumber,
    emptyPin: freezePin({
      description: normalizedEmptiness,
      requiredUnitKinds,
    }),
    fullPin: freezePin({
      description: normalizedFullness,
      emittedUnitKinds,
    }),
    rotation: Object.freeze({
      signature: normalizedRotation,
      steps: rotationSteps,
      rhymeAxes: normalizedAxes,
    }),
    compatibilitySignature,
    lessonNumberParticipatesInCompatibility: false,
    descriptionIdentityParticipatesInCompatibility: false,
    roleClassificationIsNonAuthorizing: true,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function stronglyConnectedLessonComponents(lessonNumbers, edges) {
  const adjacency = new Map(lessonNumbers.map(lessonNumber => [
    lessonNumber,
    [],
  ]));
  edges.forEach(edge => {
    adjacency.get(edge.innerLessonNumber)?.push(edge.outerLessonNumber);
  });
  let nextIndex = 0;
  const indices = new Map();
  const lowLinks = new Map();
  const stack = [];
  const onStack = new Set();
  const components = [];
  const visit = lessonNumber => {
    indices.set(lessonNumber, nextIndex);
    lowLinks.set(lessonNumber, nextIndex);
    nextIndex += 1;
    stack.push(lessonNumber);
    onStack.add(lessonNumber);
    (adjacency.get(lessonNumber) || []).forEach(nextLessonNumber => {
      if (!indices.has(nextLessonNumber)) {
        visit(nextLessonNumber);
        lowLinks.set(lessonNumber, Math.min(
          lowLinks.get(lessonNumber),
          lowLinks.get(nextLessonNumber),
        ));
      } else if (onStack.has(nextLessonNumber)) {
        lowLinks.set(lessonNumber, Math.min(
          lowLinks.get(lessonNumber),
          indices.get(nextLessonNumber),
        ));
      }
    });
    if (lowLinks.get(lessonNumber) !== indices.get(lessonNumber)) return;
    const component = [];
    let member = null;
    do {
      member = stack.pop();
      onStack.delete(member);
      component.push(member);
    } while (member !== lessonNumber);
    components.push(component.sort((left, right) => left - right));
  };
  lessonNumbers.forEach(lessonNumber => {
    if (!indices.has(lessonNumber)) visit(lessonNumber);
  });
  return components;
}

export function buildClassicalGrammaticalRhymeLessonDiscoveryFrame({
  lessonPlaneFrames = [],
} = {}) {
  const planes = (Array.isArray(lessonPlaneFrames)
    ? lessonPlaneFrames
    : []).filter(frame => (
    frame?.kind === "classical-grammatical-rhyme-lesson-plane-frame"
    && frame.planeStatus === "declared"
    && frame.compatibilitySignature?.kind
      === "classical-grammatical-rhyme-lesson-compatibility-signature"
  ));
  const candidateEdges = [];
  planes.forEach(innerPlane => {
    planes.forEach(outerPlane => {
      if (innerPlane === outerPlane) return;
      const innerSignature = innerPlane.compatibilitySignature;
      const outerSignature = outerPlane.compatibilitySignature;
      const sharedUnitKinds = innerSignature.emittedUnitKinds.filter(
        unitKind => outerSignature.requiredUnitKinds.includes(unitKind),
      );
      if (!sharedUnitKinds.length) return;
      const sharedRhymeAxes = innerPlane.rotation.rhymeAxes.filter(
        axis => outerPlane.rotation.rhymeAxes.includes(axis),
      );
      const absenceConflicts = innerSignature.adds.filter(factId => (
        outerSignature.requiresAbsent.includes(factId)
      ));
      const outerBeginsWithContinuation =
        outerSignature.rotationSteps[0] === "continuation";
      const innerOffersContinuation =
        innerSignature.rotationSteps.includes("continuation");
      const patternAlignment = absenceConflicts.length
        ? "owner-review-required"
        : (
          outerBeginsWithContinuation
          || (innerOffersContinuation && sharedRhymeAxes.length > 0)
          || sharedRhymeAxes.length >= 3
        )
          ? "direct-rhyme-candidate"
          : "typed-boundary-candidate";
      candidateEdges.push(Object.freeze({
        kind: "classical-grammatical-rhyme-discovered-lesson-edge",
        version: RHYME_SPACE_VERSION,
        innerLessonNumber: innerPlane.lessonNumber,
        outerLessonNumber: outerPlane.lessonNumber,
        sharedUnitKinds: Object.freeze(sharedUnitKinds),
        sharedRhymeAxes: Object.freeze(sharedRhymeAxes),
        absenceConflicts: Object.freeze(absenceConflicts),
        outerBeginsWithContinuation,
        innerOffersContinuation,
        patternAlignment,
        discoveredFromPinsAndSignaturesOnly: true,
        candidateOnlyUntilConsumerOwnerAuthorizesExactResult: true,
        exactOwnerValidationRequired: true,
        localHistoriesRemainDistinct: true,
        lessonNumberParticipatesInCompatibility: false,
        grammarAuthority: false,
      }));
    });
  });
  const directRhymeEdges = candidateEdges.filter(edge => (
    edge.patternAlignment === "direct-rhyme-candidate"
  ));
  const familyMap = new Map();
  directRhymeEdges.forEach(edge => {
    edge.sharedUnitKinds.forEach(unitKind => {
      const familyId = `${unitKind}→L${edge.outerLessonNumber}`;
      const family = familyMap.get(familyId) || {
        familyId,
        unitKind,
        outerLessonNumber: edge.outerLessonNumber,
        innerLessonNumbers: [],
      };
      family.innerLessonNumbers.push(edge.innerLessonNumber);
      familyMap.set(familyId, family);
    });
  });
  const superpositionFamilies = Object.freeze([...familyMap.values()]
    .filter(family => new Set(family.innerLessonNumbers).size > 1)
    .map(family => Object.freeze({
      kind: "classical-grammatical-rhyme-discovered-lesson-family",
      version: RHYME_SPACE_VERSION,
      familyId: family.familyId,
      unitKind: family.unitKind,
      outerLessonNumber: family.outerLessonNumber,
      innerLessonNumbers: Object.freeze([...new Set(
        family.innerLessonNumbers,
      )].sort((left, right) => left - right)),
      oneEmptyPinAcceptsMultipleCompatibleFullPins: true,
      exactOwnerValidationRequiredForEveryMember: true,
      grammarAuthority: false,
    }))
    .sort((left, right) => left.familyId.localeCompare(right.familyId)));
  const lessonNumbers = planes.map(plane => plane.lessonNumber)
    .sort((left, right) => left - right);
  const components = stronglyConnectedLessonComponents(
    lessonNumbers,
    directRhymeEdges,
  );
  const componentIdByLesson = new Map();
  const collapsedComponents = Object.freeze(components.map(
    (members, index) => {
      const componentId = `rhyme-component-${index + 1}`;
      members.forEach(lessonNumber => {
        componentIdByLesson.set(lessonNumber, componentId);
      });
      return Object.freeze({
        kind: "classical-grammatical-rhyme-collapsed-lesson-component",
        version: RHYME_SPACE_VERSION,
        componentId,
        lessonNumbers: Object.freeze(members),
        cyclicallyComposable: members.length > 1,
        collapsePreservesEveryLessonPlane: true,
        exactOwnerValidationRequiredAtEveryStep: true,
        grammarAuthority: false,
      });
    },
  ));
  const componentEdgeIds = new Set();
  directRhymeEdges.forEach(edge => {
    const innerComponentId = componentIdByLesson.get(
      edge.innerLessonNumber,
    );
    const outerComponentId = componentIdByLesson.get(
      edge.outerLessonNumber,
    );
    if (innerComponentId !== outerComponentId) {
      componentEdgeIds.add(`${innerComponentId}→${outerComponentId}`);
    }
  });
  const compressedComponentEdges = Object.freeze([...componentEdgeIds]
    .sort()
    .map(componentEdgeId => {
      const [innerComponentId, outerComponentId] =
        componentEdgeId.split("→");
      return Object.freeze({
        innerComponentId,
        outerComponentId,
      });
    }));
  return Object.freeze({
    kind: "classical-grammatical-rhyme-lesson-discovery-frame",
    version: RHYME_SPACE_VERSION,
    coordinateSystem: "classical-grammatical-rhyme-space",
    lessonPlaneCount: planes.length,
    lessonNumbers: Object.freeze(lessonNumbers),
    lessonPlanes: Object.freeze(planes),
    candidateEdges: Object.freeze(candidateEdges),
    directRhymeEdges: Object.freeze(directRhymeEdges),
    superpositionFamilies,
    collapsedComponents,
    compressedComponentEdges,
    candidateEdgeCount: candidateEdges.length,
    directRhymeEdgeCount: directRhymeEdges.length,
    superpositionFamilyCount: superpositionFamilies.length,
    collapsedComponentCount: collapsedComponents.length,
    everyLessonHasSixFieldSignature: planes.every(plane => [
      "requiresPresent",
      "requiresAbsent",
      "adds",
      "removes",
      "preserves",
      "emits",
    ].every(field => Array.isArray(
      plane.compatibilitySignature[field],
    ))),
    everyConnectionWasDiscoveredWithoutPairInstructions:
      candidateEdges.every(edge => (
        edge.discoveredFromPinsAndSignaturesOnly
        && edge.lessonNumberParticipatesInCompatibility === false
      )),
    exactOwnerValidationRequired: true,
    lessonNumberAuthority: false,
    exampleIdentityAuthority: false,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

export function buildClassicalGrammaticalRhymeOwnerCalibrationFrame({
  lessonDiscoveryFrame = null,
  routeTopologyFrame = null,
  lessonOwnerEvidenceFrames = [],
  exactOwnerProofObservationFrames = [],
} = {}) {
  const discovery = lessonDiscoveryFrame?.kind
    === "classical-grammatical-rhyme-lesson-discovery-frame"
    ? lessonDiscoveryFrame
    : null;
  const routeTopology = routeTopologyFrame?.kind
    === "classical-grammatical-rhyme-topology-frame"
    ? routeTopologyFrame
    : null;
  const evidenceByLesson = new Map(
    (Array.isArray(lessonOwnerEvidenceFrames)
      ? lessonOwnerEvidenceFrames
      : []).filter(frame => (
      frame?.kind
        === "classical-grammatical-rhyme-lesson-owner-evidence"
      && Number.isInteger(Number(frame.lessonNumber))
    )).map(frame => [Number(frame.lessonNumber), frame]),
  );
  const exactOwnerProofObservations = Object.freeze(
    (Array.isArray(exactOwnerProofObservationFrames)
      ? exactOwnerProofObservationFrames
      : []).filter(observation => (
      observation?.kind
        === "classical-grammar-application-rhyme-owner-proof-observation"
      && observation.authorizationStatus === "observed"
      && text(observation.innerOperationId)
      && text(observation.outerOperationId)
      && observation.exactInnerResultIdentityObservedInOuterArguments
        === true
      && observation.bothResultsOwnerValidated === true
      && observation.topologyCompatibilityObserved === true
      && observation.grammarAuthority === false
    )),
  );
  const calibratedEdges = Object.freeze(
    (discovery?.directRhymeEdges || []).map(edge => {
      const innerEvidence = evidenceByLesson.get(edge.innerLessonNumber)
        || null;
      const outerEvidence = evidenceByLesson.get(edge.outerLessonNumber)
        || null;
      const innerOperationIds = normalizedList(
        innerEvidence?.operationIds,
      );
      const outerOperationIds = normalizedList(
        outerEvidence?.operationIds,
      );
      const ownerRoutePairs = Object.freeze(
        (routeTopology?.exactContinuationEdges || []).filter(routeEdge => (
          innerOperationIds.includes(routeEdge.innerOperationId)
          && outerOperationIds.includes(routeEdge.outerOperationId)
          && routeEdge.sharedFamilyUnitKinds.some(unitKind => (
            edge.sharedUnitKinds.includes(unitKind)
          ))
        )).map(routeEdge => Object.freeze({
          innerOperationId: routeEdge.innerOperationId,
          outerOperationId: routeEdge.outerOperationId,
          sharedUnitKinds: routeEdge.sharedUnitKinds,
          sharedFamilyUnitKinds: routeEdge.sharedFamilyUnitKinds,
          compatibilityStatus: routeEdge.compatibilityStatus,
        })),
      );
      const rhymeOnlyRoutePairs = Object.freeze(
        (routeTopology?.insideOutEdges || []).filter(routeEdge => (
          innerOperationIds.includes(routeEdge.innerOperationId)
          && outerOperationIds.includes(routeEdge.outerOperationId)
          && routeEdge.sharedUnitKinds.some(unitKind => (
            edge.sharedUnitKinds.includes(unitKind)
          ))
          && !ownerRoutePairs.some(pair => (
            pair.innerOperationId === routeEdge.innerOperationId
            && pair.outerOperationId === routeEdge.outerOperationId
          ))
        )).map(routeEdge => Object.freeze({
          innerOperationId: routeEdge.innerOperationId,
          outerOperationId: routeEdge.outerOperationId,
          sharedUnitKinds: routeEdge.sharedUnitKinds,
          compatibilityStatus: routeEdge.compatibilityStatus,
        })),
      );
      const exactOwnerProofs = Object.freeze(
        exactOwnerProofObservations.filter(observation => (
          ownerRoutePairs.some(pair => (
            pair.innerOperationId === observation.innerOperationId
            && pair.outerOperationId === observation.outerOperationId
            && observation.sharedUnitKinds.some(unitKind => (
              pair.sharedUnitKinds.includes(unitKind)
              && pair.sharedFamilyUnitKinds.some(familyUnitKind => (
                edge.sharedUnitKinds.includes(familyUnitKind)
              ))
            ))
          ))
        )),
      );
      let calibrationStatus = "lesson-owner-evidence-pending";
      if (
        innerEvidence?.acceptedImplementationEvidencePresent !== true
        || outerEvidence?.acceptedImplementationEvidencePresent !== true
      ) {
        calibrationStatus = "lesson-owner-evidence-pending";
      } else if (!innerOperationIds.length || !outerOperationIds.length) {
        calibrationStatus = "owner-index-pending";
      } else if (exactOwnerProofs.length) {
        calibrationStatus = "owner-contract-exactly-observed";
      } else if (ownerRoutePairs.length) {
        calibrationStatus = "owner-contract-aligned-proof-required";
      } else if (rhymeOnlyRoutePairs.length) {
        calibrationStatus =
          "rhyme-only-no-exact-continuation-contract";
      } else {
        calibrationStatus = "owner-contract-boundary-or-index-gap";
      }
      return Object.freeze({
        kind: "classical-grammatical-rhyme-calibrated-lesson-edge",
        version: RHYME_SPACE_VERSION,
        innerLessonNumber: edge.innerLessonNumber,
        outerLessonNumber: edge.outerLessonNumber,
        sharedUnitKinds: edge.sharedUnitKinds,
        sharedRhymeAxes: edge.sharedRhymeAxes,
        patternAlignment: edge.patternAlignment,
        outerBeginsWithContinuation: edge.outerBeginsWithContinuation,
        innerOffersContinuation: edge.innerOffersContinuation,
        innerOperationIds,
        outerOperationIds,
        ownerRoutePairs,
        rhymeOnlyRoutePairs,
        exactOwnerProofs,
        calibrationStatus,
        patternDiscoveryPrecedesOwnerCalibration: true,
        exactOwnerProofStillRequired: exactOwnerProofs.length === 0,
        exactOwnerProofObserved: exactOwnerProofs.length > 0,
        callerCannotDeclareOwnerAuthorization: true,
        lessonNumberParticipatesInCompatibility: false,
        grammarAuthority: false,
      });
    }),
  );
  const statusCounts = Object.freeze(
    calibratedEdges.reduce((counts, edge) => {
      counts[edge.calibrationStatus] = Number(
        counts[edge.calibrationStatus] || 0,
      ) + 1;
      return counts;
    }, {}),
  );
  const proofQueue = Object.freeze(
    calibratedEdges
      .filter(edge => (
        edge.calibrationStatus
          === "owner-contract-aligned-proof-required"
      ))
      .map(edge => Object.freeze({
        kind: "classical-grammatical-rhyme-owner-proof-queue-item",
        version: RHYME_SPACE_VERSION,
        innerLessonNumber: edge.innerLessonNumber,
        outerLessonNumber: edge.outerLessonNumber,
        sharedUnitKinds: edge.sharedUnitKinds,
        sharedRhymeAxes: edge.sharedRhymeAxes,
        ownerRoutePairs: edge.ownerRoutePairs,
        structuralPriority:
          (edge.outerBeginsWithContinuation ? 4 : 0)
          + (edge.innerOffersContinuation ? 2 : 0)
          + edge.sharedRhymeAxes.length,
        requiredProof:
          "execute-exact-producer-result-through-consumer-owner",
        grammarAuthority: false,
      }))
      .sort((left, right) => (
        right.structuralPriority - left.structuralPriority
        || left.innerLessonNumber - right.innerLessonNumber
        || left.outerLessonNumber - right.outerLessonNumber
      )),
  );
  const ownerContractQueueGroups = new Map();
  calibratedEdges
    .filter(edge => [
      "owner-contract-aligned-proof-required",
      "owner-contract-exactly-observed",
    ].includes(edge.calibrationStatus))
    .forEach(edge => {
      edge.ownerRoutePairs.forEach(pair => {
        const contractId = [
          pair.innerOperationId,
          pair.outerOperationId,
        ].join("→");
        const group = ownerContractQueueGroups.get(contractId) || {
          contractId,
          innerOperationId: pair.innerOperationId,
          outerOperationId: pair.outerOperationId,
          sharedUnitKinds: [],
          lessonEdges: [],
          structuralPriority: 0,
        };
        group.sharedUnitKinds.push(...pair.sharedUnitKinds);
        group.lessonEdges.push(Object.freeze({
          innerLessonNumber: edge.innerLessonNumber,
          outerLessonNumber: edge.outerLessonNumber,
          sharedUnitKinds: edge.sharedUnitKinds,
          sharedRhymeAxes: edge.sharedRhymeAxes,
        }));
        group.structuralPriority = Math.max(
          group.structuralPriority,
          (edge.outerBeginsWithContinuation ? 4 : 0)
            + (edge.innerOffersContinuation ? 2 : 0)
            + edge.sharedRhymeAxes.length,
        );
        ownerContractQueueGroups.set(contractId, group);
      });
    });
  const ownerContractInventory = Object.freeze(
    [...ownerContractQueueGroups.values()]
      .map(group => {
        const exactOwnerProofs = Object.freeze(
          exactOwnerProofObservations.filter(observation => (
            observation.innerOperationId === group.innerOperationId
            && observation.outerOperationId === group.outerOperationId
            && observation.sharedUnitKinds.some(unitKind => (
              group.sharedUnitKinds.includes(unitKind)
            ))
          )),
        );
        return Object.freeze({
          kind:
            "classical-grammatical-rhyme-owner-contract-inventory-item",
          version: RHYME_SPACE_VERSION,
          contractId: group.contractId,
          innerOperationId: group.innerOperationId,
          outerOperationId: group.outerOperationId,
          sharedUnitKinds: normalizedList(group.sharedUnitKinds),
          lessonEdges: Object.freeze(group.lessonEdges),
          lessonEdgeCount: group.lessonEdges.length,
          structuralPriority: group.structuralPriority,
          exactOwnerProofs,
          proofStatus: exactOwnerProofs.length
            ? "owner-contract-exactly-observed"
            : "owner-contract-proof-required",
          requiredProof:
            "execute-exact-producer-result-through-consumer-owner",
          oneContractReceiptMayObserveManyLessonCoordinates: true,
          lessonNumberAuthority: false,
          grammarAuthority: false,
        });
      })
      .sort((left, right) => (
        right.structuralPriority - left.structuralPriority
        || left.contractId.localeCompare(right.contractId)
      )),
  );
  const ownerContractProofQueue = Object.freeze(
    ownerContractInventory.filter(item => (
      item.proofStatus === "owner-contract-proof-required"
    )),
  );
  const ownerContractAlignedEdgeCount = calibratedEdges.filter(edge => (
    [
      "owner-contract-aligned-proof-required",
      "owner-contract-exactly-observed",
    ].includes(edge.calibrationStatus)
  )).length;
  return Object.freeze({
    kind: "classical-grammatical-rhyme-owner-calibration-frame",
    version: RHYME_SPACE_VERSION,
    coordinateSystem: "classical-grammatical-rhyme-space",
    calibratedEdgeCount: calibratedEdges.length,
    calibratedEdges,
    statusCounts,
    proofQueue,
    proofQueueCount: proofQueue.length,
    ownerContractInventory,
    ownerContractCount: ownerContractInventory.length,
    ownerContractObservedCount: ownerContractInventory.filter(item => (
      item.proofStatus === "owner-contract-exactly-observed"
    )).length,
    ownerContractProofQueue,
    ownerContractProofQueueCount: ownerContractProofQueue.length,
    ownerContractCollapseSavedExecutions:
      ownerContractAlignedEdgeCount - ownerContractInventory.length,
    lessonOwnerEvidenceFrames: Object.freeze([...evidenceByLesson.values()]),
    exactOwnerProofObservations,
    exactOwnerProofReceiptCount: exactOwnerProofObservations.length,
    exactOwnerProofObservedEdgeCount: calibratedEdges.filter(edge => (
      edge.calibrationStatus === "owner-contract-exactly-observed"
    )).length,
    discoveryRemainsIndependentOfOwnerEvidence: true,
    callerSuppliedOwnerAuthorizationAccepted: false,
    exactOwnerValidationRequired: true,
    ownerEvidenceAuthorizesGrammar: false,
    lessonNumberAuthority: false,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

export function buildClassicalGrammaticalRhymeTopologyFrame({
  routePlaneFrames = [],
} = {}) {
  const planes = (Array.isArray(routePlaneFrames) ? routePlaneFrames : [])
    .filter(frame => (
      frame?.kind === "classical-grammatical-rhyme-route-plane-frame"
      && frame.planeStatus === "declared"
      && frame.compatibilitySignature?.kind
        === "classical-grammatical-rhyme-compatibility-signature"
    ));
  const seams = new Map();
  const ensureSeam = unitKind => {
    if (!seams.has(unitKind)) {
      seams.set(unitKind, {
        unitKind,
        producerOperationIds: [],
        consumerOperationIds: [],
      });
    }
    return seams.get(unitKind);
  };
  planes.forEach(plane => {
    const signature = plane.compatibilitySignature;
    signature.emittedUnitKinds.forEach(unitKind => {
      ensureSeam(unitKind).producerOperationIds.push(
        plane.emptyPin.operationId,
      );
    });
    signature.requiredUnitKinds.forEach(unitKind => {
      ensureSeam(unitKind).consumerOperationIds.push(
        plane.emptyPin.operationId,
      );
    });
  });
  const boundarySeams = Object.freeze([...seams.values()]
    .map(seam => Object.freeze({
      kind: "classical-grammatical-rhyme-collapsed-boundary-seam",
      version: RHYME_SPACE_VERSION,
      unitKind: seam.unitKind,
      producerOperationIds: normalizedList(seam.producerOperationIds),
      consumerOperationIds: normalizedList(seam.consumerOperationIds),
      collapsed: Boolean(
        seam.producerOperationIds.length
        && seam.consumerOperationIds.length
      ),
      exactOwnerValidationRequiredAtEveryHandoff: true,
      localOperationHistoryPreserved: true,
      grammarAuthority: false,
    }))
    .sort((a, b) => a.unitKind.localeCompare(b.unitKind)));
  const insideOutEdges = [];
  const exactContinuationEdges = [];
  planes.forEach(producer => {
    planes.forEach(consumer => {
      if (producer === consumer) return;
      const producerSignature = producer.compatibilitySignature;
      const consumerSignature = consumer.compatibilitySignature;
      const sharedUnitKinds = producerSignature.emittedUnitKinds.filter(
        unitKind => consumerSignature.requiredUnitKinds.includes(unitKind),
      );
      if (!sharedUnitKinds.length) return;
      const absenceConflicts = producerSignature.adds.filter(factId => (
        consumerSignature.requiresAbsent.includes(factId)
      ));
      insideOutEdges.push(Object.freeze({
        kind: "classical-grammatical-rhyme-inside-out-edge",
        version: RHYME_SPACE_VERSION,
        innerOperationId: producer.emptyPin.operationId,
        outerOperationId: consumer.emptyPin.operationId,
        sharedUnitKinds: Object.freeze(sharedUnitKinds),
        sharedAxisIds: Object.freeze(
          producer.emptyPin.requiredAxisIds.filter(axisId => (
            consumer.emptyPin.requiredAxisIds.includes(axisId)
          )),
        ),
        absenceConflicts: Object.freeze(absenceConflicts),
        compatibilityStatus: absenceConflicts.length
          ? "owner-review-required"
          : "typed-boundary-aligned-owner-proof-required",
        candidateOnlyUntilConsumerOwnerAuthorizesExactResult: true,
        exactOwnerValidationRequired: true,
        localHistoriesRemainDistinct: true,
        grammarAuthority: false,
      }));
      const exactSharedUnitKinds = producerSignature
        .exactContinuationOutputUnitKinds.filter(unitKind => (
          consumerSignature.exactContinuationInputUnitKinds.includes(
            unitKind,
          )
        ));
      if (exactSharedUnitKinds.length) {
        exactContinuationEdges.push(Object.freeze({
          kind:
            "classical-grammatical-rhyme-exact-continuation-edge",
          version: RHYME_SPACE_VERSION,
          innerOperationId: producer.emptyPin.operationId,
          outerOperationId: consumer.emptyPin.operationId,
          sharedUnitKinds: Object.freeze(exactSharedUnitKinds),
          sharedFamilyUnitKinds: normalizedList(
            exactSharedUnitKinds.map(continuationFamilyUnitKind),
          ),
          compatibilityStatus:
            "typed-continuation-contract-aligned-owner-proof-required",
          continuationTypeContractDeclaredByBothOwners: true,
          candidateOnlyUntilConsumerOwnerAuthorizesExactResult: true,
          exactOwnerValidationRequired: true,
          localHistoriesRemainDistinct: true,
          grammarAuthority: false,
        }));
      }
    });
  });
  const movementGroups = new Map();
  planes.forEach(plane => {
    const id = plane.compatibilitySignature.movementCoordinateId;
    const group = movementGroups.get(id) || [];
    group.push(plane.emptyPin.operationId);
    movementGroups.set(id, group);
  });
  const superpositionClasses = Object.freeze([...movementGroups.entries()]
    .map(([movementCoordinateId, operationIds]) => Object.freeze({
      kind: "classical-grammatical-rhyme-superposition-class",
      version: RHYME_SPACE_VERSION,
      movementCoordinateId,
      operationIds: normalizedList(operationIds),
      superimposed: operationIds.length > 1,
      sharedMovementDoesNotEraseLocalGrammar: true,
      grammarAuthority: false,
    }))
    .sort((a, b) => a.movementCoordinateId.localeCompare(
      b.movementCoordinateId,
    )));
  return Object.freeze({
    kind: "classical-grammatical-rhyme-topology-frame",
    version: RHYME_SPACE_VERSION,
    coordinateSystem: "classical-grammatical-rhyme-space",
    routePlaneCount: planes.length,
    everyRouteHasSixFieldSignature: planes.every(plane => {
      const signature = plane.compatibilitySignature;
      return [
        "requiresPresent",
        "requiresAbsent",
        "adds",
        "removes",
        "preserves",
        "emits",
      ].every(field => Array.isArray(signature[field]));
    }),
    everyAxisAccountedFor: planes.every(
      plane => plane.compatibilitySignature.everyAxisAccountedFor,
    ),
    boundarySeams,
    insideOutEdges: Object.freeze(insideOutEdges),
    exactContinuationEdges: Object.freeze(exactContinuationEdges),
    exactContinuationEdgeCount: exactContinuationEdges.length,
    superpositionClasses,
    collapsedBoundarySeamCount: boundarySeams.filter(
      seam => seam.collapsed,
    ).length,
    insideOutEdgeCount: insideOutEdges.length,
    superimposedClassCount: superpositionClasses.filter(
      group => group.superimposed,
    ).length,
    exactOwnerValidationRequired: true,
    lessonNumberAuthority: false,
    exampleIdentityAuthority: false,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function rhymeCarrierFirstSound(value = "") {
  const normalized = text(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .toLowerCase();
  return normalized.match(/[a-z]/u)?.[0] || "";
}

function expectedSubjectCarrierAtCompletedBoundary(
  baseMorph = "",
  nextSound = "",
) {
  const base = text(baseMorph).toLowerCase();
  const sound = text(nextSound).toLowerCase();
  if (!base || !sound) return "";
  const vowel = /^[aeio]$/u.test(sound);
  if (["n", "t", "x"].includes(base)) {
    return vowel ? base : `${base}i`;
  }
  if (base === "am") {
    if (sound === "z" || sound === "x") return `a${sound}`;
    return vowel || sound === "m" || sound === "p" ? "am" : "an";
  }
  return base;
}

function collectRhymeTypedSlotFrames(
  value,
  path = "canonicalResult",
  found = [],
  seen = new Set(),
) {
  if (!value || typeof value !== "object" || seen.has(value)) return found;
  seen.add(value);
  if (
    value.kind === "classical-nahuatl-vnc-slot-frame"
    || value.kind === "classical-nahuatl-nnc-slot-frame"
  ) {
    found.push(Object.freeze({ path, frame: value }));
    return found;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectRhymeTypedSlotFrames(
      item,
      `${path}[${index}]`,
      found,
      seen,
    ));
    return found;
  }
  Reflect.ownKeys(value).filter(propertyKey => {
    const propertyName = String(propertyKey);
    return propertyName === "canonicalResult"
      || propertyName === "resultFrame"
      || propertyName === "results"
      || propertyName === "coordinates"
      || /(?:Result|ResultFrame|SlotFrame)$/u.test(propertyName);
  }).forEach(propertyKey => {
    let descriptor = null;
    try {
      descriptor = Object.getOwnPropertyDescriptor(value, propertyKey);
    } catch {
      descriptor = null;
    }
    if (
      descriptor
      && Object.prototype.hasOwnProperty.call(descriptor, "value")
      && descriptor.value
      && typeof descriptor.value === "object"
    ) {
      collectRhymeTypedSlotFrames(
        descriptor.value,
        `${path}.${String(propertyKey)}`,
        found,
        seen,
      );
    }
  });
  return found;
}

function describeRhymeSubjectBoundary(slotRecord) {
  const frame = slotRecord.frame;
  const family = frame.kind === "classical-nahuatl-vnc-slot-frame"
    ? "vnc"
    : "nnc";
  const subject = frame.slots?.subject || {};
  const actualSubjectCarrier = text(subject.pers1);
  const baseMorph = text(
    subject.pers1BaseMorph || subject.baseMorph || actualSubjectCarrier,
  ).toLowerCase();
  const innerCarriers = family === "vnc"
    ? [
      ...(frame.slots?.prePredicate || []).map(slot => slot?.carrier),
      frame.slots?.predicate?.stem,
    ]
    : [
      ...(frame.slots?.participant?.slots || []).map(slot => slot?.carrier),
      ...(frame.slots?.state?.slots || []).map(slot => slot?.carrier),
      frame.slots?.predicate?.stem,
    ];
  const immediateAudibleCarrier = innerCarriers.find(
    carrier => rhymeCarrierFirstSound(carrier),
  ) || "";
  const immediateSound = rhymeCarrierFirstSound(immediateAudibleCarrier);
  const expectedSubjectCarrier = expectedSubjectCarrierAtCompletedBoundary(
    baseMorph,
    immediateSound,
  );
  const applicable = Boolean(
    actualSubjectCarrier
    && immediateSound
    && expectedSubjectCarrier,
  );
  const aligned = !applicable
    || actualSubjectCarrier === expectedSubjectCarrier;
  const timingClassification = aligned
    ? "aligned-after-inner-structure"
    : expectedSubjectCarrier.endsWith("i")
      && !actualSubjectCarrier.endsWith("i")
      ? "early-evaluation-before-inner-consonant"
      : !expectedSubjectCarrier.endsWith("i")
        && actualSubjectCarrier.endsWith("i")
        ? "late-or-stale-evaluation-after-neighbor-change"
        : "boundary-evaluation-order-mismatch";
  return Object.freeze({
    kind: "classical-grammatical-rhyme-subject-boundary-observation",
    version: RHYME_SPACE_VERSION,
    slotFramePath: slotRecord.path,
    slotFrameKind: frame.kind,
    unitFamily: family,
    baseMorph,
    actualSubjectCarrier,
    immediateAudibleCarrier: text(immediateAudibleCarrier),
    immediateSound,
    expectedSubjectCarrier,
    applicable,
    aligned,
    timingClassification,
    prerequisiteStage: "participants-and-state-finalized",
    consumerStage: "subject-boundary-realization",
    localHistoryPreserved: true,
    grammarAuthority: false,
  });
}

export function buildClassicalGrammaticalRhymeEvaluationOrderFrame({
  canonicalResult = null,
  layerGraph = null,
  ownerResultValidated = false,
} = {}) {
  const slotRecords = collectRhymeTypedSlotFrames(canonicalResult);
  const subjectBoundaryObservations = Object.freeze(
    slotRecords.map(describeRhymeSubjectBoundary),
  );
  const earlyFindings = Object.freeze(
    subjectBoundaryObservations.filter(observation => (
      observation.aligned === false
      && observation.timingClassification.startsWith("early-")
    )),
  );
  const lateFindings = Object.freeze([
    ...subjectBoundaryObservations.filter(observation => (
      observation.aligned === false
      && observation.timingClassification.startsWith("late-")
    )),
    ...(layerGraph?.edges || []).filter(edge => (
      edge.exactInnerResultIdentityObservedInOuterArguments !== true
    )).map(edge => Object.freeze({
      kind: "classical-grammatical-rhyme-late-identity-loss-observation",
      version: RHYME_SPACE_VERSION,
      edgeId: text(edge.edgeId),
      fromNodeId: text(edge.fromNodeId),
      toNodeId: text(edge.toNodeId),
      timingClassification: "late-evaluation-after-owner-identity-loss",
      prerequisiteStage: "exact-inner-owner-result",
      consumerStage: "outer-owner-operation",
      grammarAuthority: false,
    })),
  ]);
  const otherFindings = Object.freeze(
    subjectBoundaryObservations.filter(observation => (
      observation.aligned === false
      && !observation.timingClassification.startsWith("early-")
      && !observation.timingClassification.startsWith("late-")
    )),
  );
  const findingCount = earlyFindings.length
    + lateFindings.length
    + otherFindings.length;
  const ownerValidated = ownerResultValidated === true
    && Boolean(canonicalResult);
  return Object.freeze({
    kind: "classical-grammatical-rhyme-evaluation-order-frame",
    version: RHYME_SPACE_VERSION,
    coordinateSystem: "classical-grammatical-rhyme-space",
    analysisStatus: !ownerValidated
      ? "untrusted-input"
      : findingCount
        ? "order-contradiction-observed"
        : "order-aligned",
    stageOrder: Object.freeze([
      "exact-owner-source",
      "inner-formation",
      "participants-and-state-finalized",
      "boundary-realization",
      "surface-projection",
    ]),
    scope: "every-typed-slot-frame-in-owner-issued-result",
    canonicalResult: ownerValidated ? canonicalResult : null,
    layerGraph: ownerValidated ? layerGraph : null,
    typedSlotFrameCount: slotRecords.length,
    subjectBoundaryObservationCount: subjectBoundaryObservations.length,
    subjectBoundaryObservations,
    earlyFindings,
    lateFindings,
    otherFindings,
    findingCount,
    exactOwnerIdentityHandoffsPreserved: Boolean(
      !layerGraph
      || (
        layerGraph.authorizationStatus === "observed"
        && (layerGraph.edges || []).every(edge => (
          edge.exactInnerResultIdentityObservedInOuterArguments === true
        ))
      )
    ),
    completedInnerStructurePrecedesOuterBoundary: findingCount === 0,
    generatedFromStructureNotExampleIdentity: true,
    diagnosticOnly: true,
    ownerResultValidated: ownerValidated,
    callerSuppliedOwnerAuthorityAccepted: false,
    lessonNumberAuthority: false,
    exampleIdentityAuthority: false,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

export function buildClassicalGrammaticalRhymeFullPinFrame({
  operationId = "",
  outputKind = "",
  axisIds = [],
  canonicalResult = null,
  exactResultIdentityValidated = false,
} = {}) {
  const normalizedAxes = normalizedList(axisIds);
  const fullPin = freezePin({
    outputKind,
    resultKind: canonicalResultKind(canonicalResult),
    resultCardinality: Array.isArray(canonicalResult)
      ? "collection"
      : "scalar",
    axes: normalizedAxes,
  });
  const complete = Boolean(
    exactResultIdentityValidated
    && text(operationId)
    && fullPin.outputKind
    && fullPin.resultKind
    && normalizedAxes.length
    && canonicalResult
  );
  return Object.freeze({
    kind: "classical-grammatical-rhyme-full-pin-frame",
    version: RHYME_SPACE_VERSION,
    coordinateSystem: "classical-grammatical-rhyme-space",
    coordinateCompleteness: complete ? "complete" : "incomplete",
    coordinateId: pinSignature(fullPin),
    fullPin,
    localOperationId: text(operationId),
    localOperationDoesNotAuthorizeCoordinateEquivalence: true,
    exactResultIdentityValidatedByOwner: complete,
    canonicalResult: complete ? canonicalResult : null,
    lessonNumberAuthority: false,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

export function buildClassicalGrammaticalRhymeCoordinateFrame({
  canonicalSourceFrame = null,
  canonicalSourceResult = null,
  canonicalSourceOperationFrame = null,
  emptyPin = {},
  fullPin = {},
  localResultTense = "",
  localDerivationOperation = "",
  exactSourceIdentityValidated = false,
} = {}) {
  const frozenEmptyPin = freezePin(emptyPin);
  const frozenFullPin = freezePin(fullPin);
  const complete = Boolean(
    exactSourceIdentityValidated
    && canonicalSourceFrame
    && canonicalSourceResult
    && Object.keys(frozenEmptyPin).length
    && Object.values(frozenEmptyPin).every(value => (
      Array.isArray(value) ? value.length > 0 : Boolean(value)
    ))
    && Object.keys(frozenFullPin).length
    && Object.values(frozenFullPin).every(value => (
      Array.isArray(value) ? value.length > 0 : Boolean(value)
    ))
  );
  return Object.freeze({
    kind: "classical-grammatical-rhyme-coordinate-frame",
    version: RHYME_SPACE_VERSION,
    coordinateSystem: "classical-grammatical-rhyme-space",
    coordinateCompleteness: complete ? "complete" : "incomplete",
    coordinateId: [
      pinSignature(frozenEmptyPin),
      pinSignature(frozenFullPin),
    ].join("→"),
    emptyPin: frozenEmptyPin,
    fullPin: frozenFullPin,
    rotation: Object.freeze({
      localResultTense: text(localResultTense),
      alignedSourceStage: text(frozenEmptyPin.sourceStage),
      localDerivationOperation:
        text(localDerivationOperation) || "direct",
      alignedStructuralContract:
        text(frozenFullPin.structuralContractId),
    }),
    compatibleCoordinateCollapsedOnce: complete,
    derivationHistoryParticipatesInCompatibility: false,
    lessonNumberParticipatesInCompatibility: false,
    sourceStemIdentityParticipatesInCompatibility: false,
    exactTypedSourceShapePreservedOutsideCoordinate: true,
    exactDerivationHistoryPreservedOutsideCoordinate: true,
    exactSourceIdentityValidatedByConsumer: complete,
    canonicalSourceFrame: complete ? canonicalSourceFrame : null,
    canonicalSourceResult: complete ? canonicalSourceResult : null,
    canonicalSourceOperationFrame:
      complete ? canonicalSourceOperationFrame : null,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

export function buildClassicalGrammaticalRhymeCalibrationFrame({
  operationId = "",
  outputKind = "",
  axisIds = [],
  sharedAxisIds = [],
  typedArguments = [],
  applicationResult = null,
  canonicalResult = null,
  rhymeFullPinFrame = null,
  requestValidationPassed = false,
  ownerResultValidationPassed = false,
  exactApplicationResultIdentityValidated = false,
  exactCanonicalResultIdentityValidated = false,
} = {}) {
  const requiredAxisIds = normalizedList(axisIds);
  const alignedAxisIds = normalizedList(sharedAxisIds).filter(
    axisId => requiredAxisIds.includes(axisId),
  );
  const argumentList = Array.isArray(typedArguments)
    ? Object.freeze([...typedArguments])
    : Object.freeze([]);
  const argumentKinds = Object.freeze(argumentList.map(valueKind));
  const fullPinComplete = Boolean(
    rhymeFullPinFrame
    && rhymeFullPinFrame.coordinateCompleteness === "complete"
    && rhymeFullPinFrame.canonicalResult === canonicalResult
  );
  const operationIdentityReturns = Boolean(
    applicationResult?.operationId === text(operationId)
    && applicationResult?.outputKind === text(outputKind)
  );
  const resultIdentityReturns = Boolean(
    applicationResult?.canonicalResult === canonicalResult
  );
  const forwardChecks = Object.freeze({
    routeRequirementsDeclared: Boolean(
      text(operationId) && text(outputKind) && requiredAxisIds.length
    ),
    typedRequestValidated: requestValidationPassed === true,
    ownerResultValidated: ownerResultValidationPassed === true,
    exactApplicationResultIdentity:
      exactApplicationResultIdentityValidated === true,
    exactCanonicalResultIdentity:
      exactCanonicalResultIdentityValidated === true,
  });
  const backwardChecks = Object.freeze({
    fullPinComplete,
    operationIdentityReturns,
    resultIdentityReturns,
    exactSourceArgumentsRetained: Array.isArray(typedArguments),
  });
  const forwardComplete = Object.values(forwardChecks).every(Boolean);
  const backwardComplete = Object.values(backwardChecks).every(Boolean);
  const complete = forwardComplete && backwardComplete;
  return Object.freeze({
    kind: "classical-grammatical-rhyme-calibration-frame",
    version: RHYME_SPACE_VERSION,
    coordinateSystem: "classical-grammatical-rhyme-space",
    calibrationStatus: complete ? "calibrated" : "incomplete",
    emptyPin: freezePin({
      operationId,
      outputKind,
      requiredAxisIds,
    }),
    filledEmptyPin: freezePin({
      argumentCount: argumentList.length,
      argumentKinds,
    }),
    fullPin: rhymeFullPinFrame?.fullPin || freezePin({}),
    forwardCalibration: Object.freeze({
      status: forwardComplete ? "calibrated" : "incomplete",
      checks: forwardChecks,
    }),
    backwardCalibration: Object.freeze({
      status: backwardComplete ? "calibrated" : "incomplete",
      checks: backwardChecks,
    }),
    sidewaysCalibration: Object.freeze({
      status: alignedAxisIds.length
        ? "aligned"
        : "dimensionally-distinct",
      alignedAxisIds: Object.freeze(alignedAxisIds),
      compatibilityRequiresOwnerValidation: true,
    }),
    localFullnessComplete: complete,
    continuationalFullnessAvailable: complete,
    exactTypedArguments: complete ? argumentList : Object.freeze([]),
    applicationResult: complete ? applicationResult : null,
    canonicalResult: complete ? canonicalResult : null,
    rhymeFullPinFrame: complete ? rhymeFullPinFrame : null,
    lessonNumberAuthority: false,
    exampleIdentityAuthority: false,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

export const CLASSICAL_GRAMMATICAL_RHYME_SPACE_VERSION =
  RHYME_SPACE_VERSION;
