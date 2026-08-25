// Canonical multiple-nucleus adjectival modification (Andrews Lessons 40-43).
//
// Lessons 40 and 41 describe lexical/source classes and operations owned by
// the ordinary-NNC, nominal-construction, and deverbal-NNC services.  They do
// not create an "adjectival" source or a no-op conversion.  This owner accepts
// only already-issued canonical clause Results and performs the one operation
// introduced here: multiple-nucleus adjectival modification.

const VERSION = 2;
const CONTRACT_KIND = "classical-nahuatl-adjectival-modification-grammar-frame";
const RESULT_CONTRACT_KIND = "classical-nahuatl-adjectival-modification-result-frame";
const SELECTED_CLAUSE_KIND =
  "classical-nahuatl-adjectival-modification-selected-clause";
const INCORPORATION_FRAME_KIND =
  "classical-nahuatl-adjectival-modification-incorporation-frame";
const OPERATION_KIND = "adjectival-modification";
const GCD_IDENTITY =
  "typed-nnc-head+typed-clausal-modifier+licensed-shared-referent-contact+canonical-dual-projection";

const MODIFICATION_TOPOLOGIES = Object.freeze([
  "ordinary",
  "cooperating-preposed-nonpreposed",
  "discontinuous",
]);
const MODIFICATION_ORDERS = Object.freeze([
  "head-modifier",
  "modifier-head-preposed",
  "cooperating-preposed-nonpreposed",
  "discontinuous-head-first",
  "discontinuous-modifier-first",
]);
const ADJUNCTOR_PATTERNS = Object.freeze([
  "none",
  "in",
  "preposed-in",
  "nonpreposed-in",
  "both-in",
]);
const LINK_ROLES = Object.freeze([
  "shared-subject",
  "vnc-subject",
  "vnc-object",
]);
const COMPOUND_HEAD_TARGETS = Object.freeze([
  "simple-head",
  "compound-matrix",
  "compound-whole",
]);

// These are the genuine operation coordinates.  Clause class, rank, scope,
// ambiguity, recursion, and exceptional agreement are derived from issued
// Sources and from these selections.
const LCM_AXES = Object.freeze([
  Object.freeze({
    id: "modification-topology",
    values: MODIFICATION_TOPOLOGIES,
    semanticFactRole: "genuine-user-choice",
  }),
  Object.freeze({
    id: "modifier-head-order",
    values: MODIFICATION_ORDERS,
    semanticFactRole: "genuine-user-choice",
  }),
  Object.freeze({
    id: "adjunctor",
    values: ADJUNCTOR_PATTERNS,
    semanticFactRole: "genuine-user-choice",
  }),
  Object.freeze({
    id: "transitive-reference-contact",
    values: Object.freeze(["not-applicable", "vnc-subject", "vnc-object"]),
    semanticFactRole: "genuine-user-choice",
  }),
  Object.freeze({
    id: "compound-head-target",
    values: COMPOUND_HEAD_TARGETS,
    semanticFactRole: "genuine-user-choice",
  }),
]);

const ALLOWED_REQUEST_KEYS = Object.freeze(new Set([
  "operationKind",
  "head",
  "modifier",
  "additionalModifiers",
  "interveningClauses",
  "topology",
  "order",
  "adjunctor",
  "linkRole",
  "additionalLinkRoles",
  "compoundHeadTarget",
  "discourseSourceContextFrame",
]));

// Retired source-classification and caller-selected derived lanes fail closed.
const FORBIDDEN_AUTHORITY_KEYS = Object.freeze(new Set([
  "answer",
  "ambiguityType",
  "canvasAnswer",
  "citation",
  "compositionScope",
  "evidenceSource",
  "formula",
  "formulaArtifact",
  "generationAllowed",
  "headRank",
  "incorporationStatus",
  "lesson",
  "lesson40FormationFamily",
  "lesson41FormationFamily",
  "lessonMetadata",
  "modifierClauseType",
  "modifierRank",
  "recursionDepth",
  "result",
  "resultSurface",
  "scope",
  "sourceClassificationFrame",
  "storedAnswer",
  "surface",
  "surfaceForms",
  "targetSurface",
  "word",
]));

const OWNER_STATE_BY_TARGET = new WeakMap();
const ISSUED_INCORPORATION_ANALYSES = new WeakSet();
const ISSUED_INCORPORATION_FRAMES = new WeakSet();

function normalizeToken(value = "") {
  return String(value ?? "").normalize("NFC").trim();
}

function normalizeKey(value = "") {
  return normalizeToken(value).toLowerCase().replace(/[\s_]+/gu, "-");
}

function normalizeStem(value = "") {
  return normalizeKey(value)
    .replace(/[()[\]{}#]/gu, "")
    .replace(/^-+|-+$/gu, "");
}

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) {
    return value;
  }
  Object.values(value).forEach(deepFreeze);
  return Object.freeze(value);
}

function clone(value) {
  if (Array.isArray(value)) return value.map(clone);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, clone(item)]),
  );
}

function choose(value, values, fallback = "") {
  const normalized = normalizeKey(value);
  return values.includes(normalized) ? normalized : fallback;
}

function stripSentenceBoundary(value = "") {
  return normalizeToken(value).replace(/[.?!]+$/u, "");
}

function capitalizeInitial(value = "") {
  const text = normalizeToken(value);
  return text ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : "";
}

function getOwnerState(targetObject = globalThis) {
  let state = OWNER_STATE_BY_TARGET.get(targetObject);
  if (!state) {
    state = Object.freeze({
      grammarFrames: new WeakSet(),
      incorporationAnalyses: new WeakSet(),
      incorporationFrames: new WeakSet(),
      results: new WeakSet(),
      selectedClauses: new WeakSet(),
    });
    OWNER_STATE_BY_TARGET.set(targetObject, state);
  }
  return state;
}

function issue(targetObject, collection, value) {
  if (value && typeof value === "object") {
    getOwnerState(targetObject)[collection].add(value);
  }
  return value;
}

function issueSelectedClause(targetObject, value) {
  return issue(targetObject, "selectedClauses", deepFreeze({
    kind: SELECTED_CLAUSE_KIND,
    version: VERSION,
    authorizationStatus: "authorized",
    ...value,
    typedFrameAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  }));
}

function getCapturedCanonicalResult(targetObject, input = null) {
  if (!input || typeof input !== "object") return null;
  if (
    getOwnerState(targetObject).results.has(input)
    && input.authorizationStatus === "authorized"
  ) {
    return input;
  }
  if (
    typeof targetObject?.captureClassicalGrammarApplicationResult
      !== "function"
    || typeof targetObject?.isClassicalGrammarApplicationResultCapture
      !== "function"
  ) {
    return null;
  }
  const slotId = "adjectival-modification-source";
  const capture = targetObject.captureClassicalGrammarApplicationResult(
    input,
    slotId,
  );
  return targetObject.isClassicalGrammarApplicationResultCapture(
    capture,
    slotId,
  )
    ? capture.canonicalResult
    : null;
}

function subjectFromNncSlotFrame(slotFrame = null) {
  return normalizeKey(slotFrame?.slots?.subject?.subject || "");
}

function predicateFromNncSlotFrame(slotFrame = null) {
  return normalizeStem(slotFrame?.slots?.predicate?.stem || "");
}

function stateArityFromNncSlotFrame(slotFrame = null) {
  return normalizeKey(slotFrame?.slots?.state?.arity || "");
}

function isCompoundNncSource(sourceFrame = null, slotFrame = null) {
  return sourceFrame?.compoundSource === true
    || normalizeKey(slotFrame?.sourceStructure) === "compound"
    || normalizeKey(slotFrame?.sourceFrameKind).includes("compound");
}

function buildNncSelectedClause(
  targetObject,
  {
    canonicalInput,
    role,
    slotFrame,
    formula,
    surface,
    sourceFrame = null,
    clauseClass = "ordinary-nnc",
    pronominalFamily = "",
    isComposition = false,
  } = {},
) {
  if (
    typeof targetObject?.isClassicalNahuatlNncSlotFrame !== "function"
    || !targetObject.isClassicalNahuatlNncSlotFrame(slotFrame)
    || !normalizeToken(formula)
    || !normalizeToken(surface)
  ) {
    return null;
  }
  return issueSelectedClause(targetObject, {
    role: normalizeKey(role) || "unknown",
    sourceResult: canonicalInput,
    unitKind: "nnc",
    clauseClass: normalizeKey(clauseClass) || "ordinary-nnc",
    formula: normalizeToken(formula),
    unitSurface: stripSentenceBoundary(surface),
    subjectId: subjectFromNncSlotFrame(slotFrame),
    predicateStem: predicateFromNncSlotFrame(slotFrame),
    stateArity: stateArityFromNncSlotFrame(slotFrame),
    sourceValence: "not-applicable",
    objectPerson: "",
    objectKind: "",
    compoundHead: isCompoundNncSource(sourceFrame, slotFrame),
    pronominalFamily: normalizeKey(pronominalFamily),
    typedSlotFrame: slotFrame,
    isComposition,
  });
}

function getVncFiniteProjection(frame = null) {
  const finite = frame?.resultFrame?.finiteSurfaceFrame
    || frame?.finiteSurfaceFrame
    || frame?.resultFrame
    || null;
  const formula = normalizeToken(
    finite?.formulaProjection?.result
      || finite?.formulaRealization
      || frame?.formulaRealization,
  );
  const surface = normalizeToken(
    finite?.writtenProjection?.result
      || finite?.surfaceRealization
      || finite?.wordSurface
      || frame?.surfaceRealization
      || frame?.wordSurface,
  );
  return { finite, formula, surface };
}

function buildVncSelectedClause(
  targetObject,
  canonicalInput,
  role,
) {
  const { finite, formula, surface } = getVncFiniteProjection(canonicalInput);
  const slotFrame = canonicalInput?.resultFrame?.finalTypedVncSlotFrame
    || canonicalInput?.finalTypedVncSlotFrame
    || finite?.typedSlotFrame
    || null;
  const normalizedRequest = canonicalInput?.normalizedRequest
    || canonicalInput?.resultFrame?.normalizedRequest
    || {};
  if (!finite || !formula || !surface || !slotFrame) return null;
  const sourceValence = normalizeKey(
    normalizedRequest.sourceValence
      || normalizedRequest.valence
      || slotFrame.sourceValence
      || slotFrame.valence,
  );
  const objectRequest = Array.isArray(normalizedRequest.sourceObjectRequests)
    ? normalizedRequest.sourceObjectRequests[0] || {}
    : {};
  return issueSelectedClause(targetObject, {
    role: normalizeKey(role) || "unknown",
    sourceResult: canonicalInput,
    unitKind: "vnc",
    clauseClass: sourceValence && sourceValence !== "intransitive"
      ? "transitive-vnc"
      : "intransitive-vnc",
    formula,
    unitSurface: stripSentenceBoundary(surface),
    subjectId: normalizeKey(
      normalizedRequest.subject
        || normalizedRequest.sourceSubject
        || slotFrame.subject,
    ),
    predicateStem: normalizeStem(
      normalizedRequest.sourceStem
        || slotFrame.slots?.predicate?.stem
        || slotFrame.predicateStem,
    ),
    stateArity: "not-applicable",
    sourceValence: sourceValence || "intransitive",
    objectPerson: normalizeKey(
      normalizedRequest.objectPerson
        || objectRequest.objectPerson
        || slotFrame.objectPerson,
    ),
    objectKind: normalizeKey(
      normalizedRequest.objectKind
        || objectRequest.objectKind
        || slotFrame.objectKind,
    ),
    compoundHead: false,
    pronominalFamily: "",
    typedSlotFrame: slotFrame,
    isComposition: false,
  });
}

function getSelectedCanonicalClause(
  targetObject,
  input = null,
  role = "unknown",
) {
  const canonicalInput = getCapturedCanonicalResult(targetObject, input);
  if (!canonicalInput) return null;

  if (
    canonicalInput.kind === RESULT_CONTRACT_KIND
    && getOwnerState(targetObject).results.has(canonicalInput)
    && canonicalInput.authorizationStatus === "authorized"
  ) {
    const headSource = canonicalInput.selectedClauses?.[0] || null;
    if (!headSource) return null;
    return issueSelectedClause(targetObject, {
      role: normalizeKey(role) || "unknown",
      sourceResult: canonicalInput,
      unitKind: "nnc",
      clauseClass: "adjectival-modification-result",
      formula: canonicalInput.formulaProjection?.result,
      unitSurface: canonicalInput.writtenProjection?.unitSurface,
      subjectId: headSource.subjectId,
      predicateStem: headSource.predicateStem,
      stateArity: headSource.stateArity,
      sourceValence: "not-applicable",
      objectPerson: "",
      objectKind: "",
      compoundHead: headSource.compoundHead === true,
      pronominalFamily: headSource.pronominalFamily || "",
      typedSlotFrame: headSource.typedSlotFrame,
      isComposition: true,
    });
  }

  if (
    typeof targetObject?.isClassicalNahuatlOrdinaryNncResult === "function"
    && targetObject.isClassicalNahuatlOrdinaryNncResult(canonicalInput)
  ) {
    return buildNncSelectedClause(targetObject, {
      canonicalInput,
      role,
      slotFrame: canonicalInput.typedSlotFrame,
      formula: canonicalInput.formulaProjection?.formulaRealization,
      surface: canonicalInput.writtenProjection?.surfaceRealization,
      sourceFrame: canonicalInput.sourceFrame,
      clauseClass: "ordinary-nnc",
    });
  }

  if (
    typeof targetObject?.isClassicalNahuatlPronominalNncResult === "function"
    && targetObject.isClassicalNahuatlPronominalNncResult(canonicalInput)
  ) {
    return buildNncSelectedClause(targetObject, {
      canonicalInput,
      role,
      slotFrame: canonicalInput.typedSlotFrame,
      formula: canonicalInput.formulaProjection?.formulaRealization,
      surface: canonicalInput.writtenProjection?.surfaceRealization,
      sourceFrame: canonicalInput.sourceFrame,
      clauseClass: "pronominal-nnc",
      pronominalFamily: canonicalInput.sourceFrame?.familyId,
    });
  }

  if (
    typeof targetObject?.isClassicalNahuatlIssuedNncSentenceSurfaceFrame
      === "function"
    && targetObject.isClassicalNahuatlIssuedNncSentenceSurfaceFrame(
      canonicalInput,
    )
  ) {
    return buildNncSelectedClause(targetObject, {
      canonicalInput,
      role,
      slotFrame: canonicalInput.sourceNncSlotFrame,
      formula: canonicalInput.baseNncFormula,
      surface: canonicalInput.canonicalNuclearSurface,
      clauseClass: canonicalInput.sourceNncSlotFrame?.nncFamily || "nnc",
      pronominalFamily:
        canonicalInput.sourceNncSlotFrame?.pronominalSubtypeDetail || "",
    });
  }

  if (
    typeof targetObject?.isClassicalNahuatlDeverbalNncGrammarFrame
      === "function"
    && targetObject.isClassicalNahuatlDeverbalNncGrammarFrame(canonicalInput)
    && canonicalInput.canonicalResult?.nncSlotFrame
  ) {
    return buildNncSelectedClause(targetObject, {
      canonicalInput,
      role,
      slotFrame: canonicalInput.canonicalResult.nncSlotFrame,
      formula: canonicalInput.formulaRealization,
      surface: canonicalInput.wordSurface,
      sourceFrame: canonicalInput.sourceFrame,
      clauseClass: canonicalInput.constructionKind,
    });
  }

  if (
    typeof targetObject?.isClassicalNahuatlNominalConstructionResult
      === "function"
    && targetObject.isClassicalNahuatlNominalConstructionResult(
      canonicalInput,
    )
  ) {
    const slotFrame = canonicalInput.nncSlotFrame
      || canonicalInput.canonicalResult?.nncSlotFrame
      || null;
    if (slotFrame) {
      return buildNncSelectedClause(targetObject, {
        canonicalInput,
        role,
        slotFrame,
        formula: canonicalInput.formulaRealization,
        surface: canonicalInput.wordSurface,
        sourceFrame: canonicalInput.sourceAuthorizationFrame,
        clauseClass: canonicalInput.constructionKind,
      });
    }
  }

  if (
    typeof targetObject?.isClassicalNahuatlAdverbialNuclearResult
      === "function"
    && targetObject.isClassicalNahuatlAdverbialNuclearResult(canonicalInput)
    && canonicalInput.operationFrame?.typedSlotFrame
  ) {
    return buildNncSelectedClause(targetObject, {
      canonicalInput,
      role,
      slotFrame: canonicalInput.operationFrame.typedSlotFrame,
      formula: canonicalInput.formulaProjection?.formulaRealization,
      surface: canonicalInput.writtenProjection?.wordSurface,
      clauseClass: "adverbialized-nnc",
    });
  }

  if (
    typeof targetObject?.isPersonalNameNncResult === "function"
    && targetObject.isPersonalNameNncResult(canonicalInput)
    && canonicalInput.formulaProjection?.derivedFromWrittenProjection
      === false
    && canonicalInput.writtenProjection?.derivedFromFormulaProjection
      === false
  ) {
    return issueSelectedClause(targetObject, {
      role: normalizeKey(role) || "unknown",
      sourceResult: canonicalInput,
      unitKind: "nnc",
      clauseClass: "personal-name",
      formula: canonicalInput.formulaProjection.result,
      unitSurface: canonicalInput.writtenProjection.result,
      subjectId: normalizeKey(canonicalInput.outerSubject),
      predicateStem: normalizeStem(
        canonicalInput.typedSlotFrame?.downgradedSource?.sourceFamily
          || "personal-name",
      ),
      stateArity: "vacant",
      sourceValence: "not-applicable",
      objectPerson: "",
      objectKind: "",
      compoundHead: false,
      pronominalFamily: "",
      typedSlotFrame: canonicalInput.typedSlotFrame,
      isComposition: false,
    });
  }

  if (
    typeof targetObject?.isClassicalNahuatlVncApplicationFrame === "function"
    && targetObject.isClassicalNahuatlVncApplicationFrame(canonicalInput)
  ) {
    return buildVncSelectedClause(targetObject, canonicalInput, role);
  }

  if (
    typeof targetObject?.isClassicalNahuatlSupplementationFrame === "function"
    && targetObject.isClassicalNahuatlSupplementationFrame(canonicalInput)
  ) {
    const principal = canonicalInput.principalClause || {};
    return issueSelectedClause(targetObject, {
      role: normalizeKey(role) || "unknown",
      sourceResult: canonicalInput,
      unitKind: "supplementation",
      clauseClass: "supplementation-structure",
      formula: canonicalInput.formulaProjection?.formulaRealization
        || canonicalInput.formulaRealization,
      unitSurface: stripSentenceBoundary(
        canonicalInput.writtenProjection?.surfaceRealization
          || canonicalInput.surfaceRealization,
      ),
      subjectId: normalizeKey(
        principal.subject?.subject
          || principal.subject?.category
          || principal.subjectId
          || principal.subject?.features?.category
          || principal.subject?.features?.identity,
      ),
      predicateStem: normalizeStem(
        principal.sourceStem
          || principal.predicateStem
          || "",
      ),
      stateArity: "not-applicable",
      sourceValence: "not-applicable",
      objectPerson: "",
      objectKind: "",
      compoundHead: false,
      pronominalFamily: "",
      typedSlotFrame: principal.typedSlotFrame || null,
      isComposition: true,
    });
  }

  return null;
}

function subjectsCompatible(left = "", right = "") {
  const a = normalizeKey(left);
  const b = normalizeKey(right);
  if (!a || !b) return false;
  if (a === b) return true;
  return ["3sg", "3common", "3sg-or-common"].includes(a)
    && ["3sg", "3common", "3sg-or-common"].includes(b);
}

function subjectPerson(subjectId = "") {
  return normalizeKey(subjectId).match(/^([123])/u)?.[1] || "";
}

function subjectIsPlural(subjectId = "") {
  return /(?:^|-)pl(?:$|-)/u.test(normalizeKey(subjectId))
    || ["1pl", "2pl", "3pl"].includes(normalizeKey(subjectId));
}

function isOneOrNoneStem(stem = "") {
  return [
    "cem",
    "ce",
    "cē",
    "a-c-ah",
    "acah",
    "ayac",
    "ayāc",
  ].includes(normalizeStem(stem));
}

function isOquichFirstPluralClause(clause = null) {
  return ["oquich", "oquichtli"].includes(
    normalizeStem(clause?.predicateStem),
  ) && normalizeKey(clause?.subjectId) === "1pl";
}

function isQuantitiveClause(clause = null) {
  return normalizeKey(clause?.pronominalFamily).includes("quantitive");
}

function isPersonalNameClause(clause = null) {
  return ["personal-name", "name-nnc"].includes(
    normalizeKey(clause?.clauseClass),
  );
}

function getSourceConditionedExceptionProfilesForPair(
  head,
  modifier,
  discourseSourceContextFrame = null,
) {
  const headStem = normalizeStem(head?.predicateStem);
  const profiles = [];
  if (
    isOneOrNoneStem(headStem)
    && subjectIsPlural(modifier?.subjectId)
  ) {
    profiles.push("one-or-none-of-group");
  }
  if (
    (
      isOquichFirstPluralClause(head)
      || isOquichFirstPluralClause(modifier)
    )
    && discourseSourceContextFrame?.speakerGender === "male"
    && discourseSourceContextFrame?.speakerGroupMembership === "member"
  ) {
    profiles.push("male-bonding");
  }
  if (
    (isQuantitiveClause(head) || isQuantitiveClause(modifier))
    && subjectPerson(head?.subjectId)
      === subjectPerson(modifier?.subjectId)
    && Boolean(subjectPerson(head?.subjectId))
  ) {
    profiles.push("quantitive-number-nonagreement");
  }
  if (
    isPersonalNameClause(modifier)
    && subjectIsPlural(head?.subjectId)
    && subjectPerson(modifier?.subjectId) === "3"
    && discourseSourceContextFrame
    && discourseSourceContextFrame?.namedPartnerKnownParticipant
      !== "none"
  ) {
    profiles.push("named-partner");
  }
  return Object.freeze(profiles);
}

function getSourceConditionedExceptionProfiles(
  head,
  modifiers,
  discourseSourceContextFrame = null,
) {
  return Object.freeze(Array.from(new Set(
    modifiers.flatMap(modifier => (
      getSourceConditionedExceptionProfilesForPair(
        head,
        modifier,
        discourseSourceContextFrame,
      )
    )),
  )));
}

function getPrimaryExceptionProfile(profiles = []) {
  if (!profiles.length) return "none";
  return profiles.length === 1
    ? profiles[0]
    : "multiple-source-conditioned";
}

function deriveModifierClauseType(modifier = null) {
  if (!modifier) return "";
  return modifier.clauseClass || modifier.unitKind || "";
}

function deriveAmbiguityType(head, modifiers, linkRoles) {
  const interrogative = [head, ...modifiers].some(item => (
    ["interrogative-who", "interrogative-what"].includes(
      normalizeKey(item.pronominalFamily),
    )
    || ["ā-0", "ac", "āc", "tl-eh", "tleh"].includes(
      normalizeStem(item.predicateStem),
    )
  ));
  if (interrogative) return "supplementation-or-modification";
  if (
    modifiers.some(item => item.clauseClass === "transitive-vnc")
    && linkRoles.some(
      linkRole => ["vnc-subject", "vnc-object"].includes(linkRole),
    )
  ) {
    return "transitive-subject-or-object-contact";
  }
  return "structural-apposition";
}

function expectedOrderValues(topology) {
  if (topology === "ordinary") {
    return ["head-modifier", "modifier-head-preposed"];
  }
  if (topology === "cooperating-preposed-nonpreposed") {
    return ["cooperating-preposed-nonpreposed"];
  }
  if (topology === "discontinuous") {
    return [
      "discontinuous-head-first",
      "discontinuous-modifier-first",
    ];
  }
  return [];
}

function expectedAdjunctorValues(topology) {
  return topology === "cooperating-preposed-nonpreposed"
    ? ["none", "preposed-in", "nonpreposed-in", "both-in"]
    : ["none", "in"];
}

function buildSelection(request, head, modifiers) {
  const topology = choose(
    request.topology || "ordinary",
    MODIFICATION_TOPOLOGIES,
    "",
  );
  const allowedOrders = expectedOrderValues(topology);
  const defaultOrder = topology === "ordinary"
    ? "head-modifier"
    : topology === "cooperating-preposed-nonpreposed"
      ? "cooperating-preposed-nonpreposed"
      : "discontinuous-head-first";
  const order = choose(request.order || defaultOrder, allowedOrders, "");
  const allowedAdjunctors = expectedAdjunctorValues(topology);
  const adjunctor = choose(
    request.adjunctor || "none",
    allowedAdjunctors,
    "",
  );
  const hasAdditionalLinkRoles = Object.hasOwn(
    request,
    "additionalLinkRoles",
  );
  const additionalLinkRoleInputs = Array.isArray(
    request.additionalLinkRoles,
  )
    ? request.additionalLinkRoles
    : [];
  const additionalLinkRolesShapeValid = !hasAdditionalLinkRoles
    || (
      Array.isArray(request.additionalLinkRoles)
      && request.additionalLinkRoles.length === modifiers.length - 1
    );
  const modifierLinkRoles = modifiers.map((modifier, index) => {
    const supplied = index === 0
      ? request.linkRole
      : additionalLinkRoleInputs[index - 1];
    const suppliedPresent = index === 0
      ? Object.hasOwn(request, "linkRole")
      : index - 1 < additionalLinkRoleInputs.length;
    return modifier.clauseClass === "transitive-vnc"
      ? choose(supplied, ["vnc-subject", "vnc-object"], "")
      : suppliedPresent
        ? choose(supplied, ["shared-subject"], "")
        : "shared-subject";
  });
  const linkRole = modifierLinkRoles[0] || "";
  const compoundHeadTarget = head.compoundHead
    ? choose(
        request.compoundHeadTarget || "compound-matrix",
        ["compound-matrix", "compound-whole"],
        "",
      )
    : Object.hasOwn(request, "compoundHeadTarget")
      ? choose(request.compoundHeadTarget, ["simple-head"], "")
      : "simple-head";
  return deepFreeze({
    topology,
    order,
    adjunctor,
    linkRole,
    modifierLinkRoles,
    additionalLinkRolesShapeValid,
    compoundHeadTarget,
    transitiveReferenceContact: modifiers.some(
      item => item.clauseClass === "transitive-vnc",
    )
      ? modifierLinkRoles.filter(
          (role, index) => (
            modifiers[index]?.clauseClass === "transitive-vnc"
          ),
        )
      : "not-applicable",
  });
}

function validateSelection(
  request,
  selection,
  head,
  modifiers,
  dependents,
  discourseSourceContextFrame,
) {
  if (!selection.topology) {
    return "lessons40-43-modification-topology-not-licensed";
  }
  if (!selection.order) {
    return "lessons40-43-modifier-head-order-not-licensed";
  }
  if (!selection.adjunctor) {
    return "lessons40-43-adjunctor-not-licensed";
  }
  if (
    !selection.linkRole
    || selection.modifierLinkRoles.some(linkRole => !linkRole)
  ) {
    return modifiers.some(item => item.clauseClass === "transitive-vnc")
      ? "lessons40-43-transitive-reference-contact-required"
      : "lessons40-43-shared-referent-contact-not-licensed";
  }
  if (!selection.additionalLinkRolesShapeValid) {
    return "lessons40-43-additional-reference-contact-count-mismatch";
  }
  if (!selection.compoundHeadTarget) {
    return head.compoundHead
      ? "lessons40-43-compound-head-target-required"
      : "lessons40-43-compound-head-target-not-applicable";
  }
  if (
    selection.topology === "cooperating-preposed-nonpreposed"
    && modifiers.length !== 2
  ) {
    return "lessons40-43-cooperating-topology-requires-exactly-two-modifiers";
  }
  if (
    selection.topology === "discontinuous"
    && dependents.length < 1
  ) {
    return "lessons40-43-discontinuous-topology-requires-intervening-clause";
  }
  if (
    selection.topology === "ordinary"
    && (modifiers.length !== 1 || dependents.length)
  ) {
    return "lessons40-43-ordinary-topology-requires-one-modifier";
  }
  if (
    modifiers.some(item => item.unitKind === "nnc"
      && item.stateArity !== "vacant")
  ) {
    return "lessons40-43-nnc-modifier-must-have-vacant-state";
  }
  if (
    (
      selection.order === "modifier-head-preposed"
      || selection.topology
        === "cooperating-preposed-nonpreposed"
    )
    && modifiers[0]?.clauseClass === "supplementation-structure"
  ) {
    return "lessons40-43-preposed-modifier-cannot-contain-supplementation";
  }
  for (const [index, modifier] of modifiers.entries()) {
    const linkRole = selection.modifierLinkRoles[index];
    const referenceTarget = linkRole === "vnc-object"
      ? modifier.objectPerson
      : modifier.subjectId;
    if (linkRole === "vnc-object" && !modifier.objectPerson) {
      return "lessons40-43-typed-vnc-object-contact-required";
    }
    const exceptionProfiles =
      getSourceConditionedExceptionProfilesForPair(
        head,
        modifier,
        discourseSourceContextFrame,
      );
    if (
      !subjectsCompatible(head.subjectId, referenceTarget)
      && exceptionProfiles.length === 0
    ) {
      return "lessons40-43-shared-referent-restriction-not-satisfied";
    }
  }
  if (
    Object.hasOwn(request, "additionalModifiers")
    && selection.topology !== "cooperating-preposed-nonpreposed"
  ) {
    return "lessons40-43-additional-modifier-topology-mismatch";
  }
  if (
    Object.hasOwn(request, "interveningClauses")
    && selection.topology !== "discontinuous"
  ) {
    return "lessons40-43-intervening-clause-topology-mismatch";
  }
  if (
    Object.hasOwn(request, "additionalLinkRoles")
    && selection.topology !== "cooperating-preposed-nonpreposed"
  ) {
    return "lessons40-43-additional-reference-contact-topology-mismatch";
  }
  return "";
}

function deriveReadOnlyFacts(
  selection,
  head,
  modifiers,
  discourseSourceContextFrame,
) {
  const exceptionProfiles = getSourceConditionedExceptionProfiles(
    head,
    modifiers,
    discourseSourceContextFrame,
  );
  const exceptionProfile = getPrimaryExceptionProfile(exceptionProfiles);
  const markedPreposed = (
    selection.order === "modifier-head-preposed"
      && selection.adjunctor === "in"
  ) || (
    selection.topology === "cooperating-preposed-nonpreposed"
      && ["preposed-in", "both-in"].includes(selection.adjunctor)
  );
  return deepFreeze({
    operationKind: OPERATION_KIND,
    modifierClauseType: modifiers.length > 1
      ? "cooperating-clausal-modifiers"
      : deriveModifierClauseType(modifiers[0]),
    compositionScope: markedPreposed
      ? "adjoined-unit"
      : "complete-sentence",
    linkRole: selection.linkRole,
    modifierLinkRoles: selection.modifierLinkRoles,
    ambiguityType: deriveAmbiguityType(
      head,
      modifiers,
      selection.modifierLinkRoles,
    ),
    exceptionProfile,
    exceptionProfiles,
    recursionDepth: [head, ...modifiers].some(
      item => item.isComposition === true,
    )
      ? "one-or-more"
      : "zero",
    incorporationStatus: "free",
    headRank: "principal",
    modifierRank: modifiers.length > 1
      ? "cooperating-adjoined"
      : "adjoined",
    headClauseType: head.clauseClass,
    compoundHead: head.compoundHead === true,
    discourseSourceContextPresent:
      Boolean(discourseSourceContextFrame),
    factsAreReadOnly: true,
    callerSelectionAuthority: false,
  });
}

function buildGrammarFrame(
  targetObject,
  selection,
  derived,
  selectedClauses,
  discourseSourceContextFrame = null,
) {
  const selected = {
    "modification-topology": selection.topology,
    "modifier-head-order": selection.order,
    adjunctor: selection.adjunctor,
    "transitive-reference-contact":
      selection.transitiveReferenceContact,
    "compound-head-target": selection.compoundHeadTarget,
  };
  return issue(targetObject, "grammarFrames", deepFreeze({
    kind: CONTRACT_KIND,
    version: VERSION,
    authorizationStatus: "authorized",
    greatestCommonDivisor: {
      identityId: GCD_IDENTITY,
      satisfied: selectedClauses.length >= 2,
      sourceConstituentCount: selectedClauses.length,
      constituentsAreCanonicalSelectedResults: selectedClauses.every(
        clause => getOwnerState(targetObject).selectedClauses.has(clause),
      ),
      nncHeadIsTyped: selectedClauses[0]?.unitKind === "nnc",
      adjectivalRoleIsTyped: true,
      sharedReferentRelationIsTyped: Boolean(selection.linkRole),
      canonicalResultRequired: true,
    },
    leastCommonMultiple: {
      axisIds: LCM_AXES.map(axis => axis.id),
      axes: clone(LCM_AXES),
      selectedAxisIds: LCM_AXES.map(axis => axis.id),
      selected,
      licensedAxisSetComplete: true,
    },
    derivedReadOnlyFacts: derived,
    sourceConstituents: {
      clauseResults: selectedClauses.map(
        clause => clause.sourceResult,
      ),
      discourseSourceContextFrame,
    },
    typedGrammarAuthority: true,
    callerSuppliedCoordinateAuthority: false,
    lessonMetadataAuthority: false,
    citationAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  }));
}

function isGrammarFrame(targetObject, frame = null) {
  if (
    !frame
    || frame.kind !== CONTRACT_KIND
    || frame.version !== VERSION
    || frame.authorizationStatus !== "authorized"
    || !getOwnerState(targetObject).grammarFrames.has(frame)
    || frame.greatestCommonDivisor?.identityId !== GCD_IDENTITY
    || frame.greatestCommonDivisor?.satisfied !== true
    || frame.greatestCommonDivisor?.constituentsAreCanonicalSelectedResults
      !== true
    || frame.greatestCommonDivisor?.nncHeadIsTyped !== true
    || frame.greatestCommonDivisor?.adjectivalRoleIsTyped !== true
    || frame.greatestCommonDivisor?.sharedReferentRelationIsTyped !== true
    || frame.leastCommonMultiple?.licensedAxisSetComplete !== true
    || frame.leastCommonMultiple?.axisIds?.join("|")
      !== LCM_AXES.map(axis => axis.id).join("|")
    || frame.leastCommonMultiple?.selectedAxisIds?.join("|")
      !== LCM_AXES.map(axis => axis.id).join("|")
    || frame.derivedReadOnlyFacts?.factsAreReadOnly !== true
    || frame.derivedReadOnlyFacts?.callerSelectionAuthority !== false
    || frame.typedGrammarAuthority !== true
    || frame.callerSuppliedCoordinateAuthority !== false
    || frame.lessonMetadataAuthority !== false
    || frame.citationAuthority !== false
    || frame.formulaStringAuthority !== false
    || frame.surfaceStringAuthority !== false
  ) {
    return false;
  }
  const discourseSourceContextFrame =
    frame.sourceConstituents?.discourseSourceContextFrame || null;
  if (
    discourseSourceContextFrame
    && (
      typeof targetObject
        ?.isClassicalNahuatlDiscourseSourceContextFrame !== "function"
      || !targetObject.isClassicalNahuatlDiscourseSourceContextFrame(
        discourseSourceContextFrame,
      )
    )
  ) {
    return false;
  }
  const selected = frame.leastCommonMultiple.selected || {};
  return MODIFICATION_TOPOLOGIES.includes(
    selected["modification-topology"],
  )
    && MODIFICATION_ORDERS.includes(selected["modifier-head-order"])
    && ADJUNCTOR_PATTERNS.includes(selected.adjunctor)
    && (
      selected["transitive-reference-contact"] === "not-applicable"
      || (
        Array.isArray(selected["transitive-reference-contact"])
        && selected["transitive-reference-contact"].length > 0
        && selected["transitive-reference-contact"].every(
          linkRole => ["vnc-subject", "vnc-object"].includes(linkRole),
        )
      )
    )
    && COMPOUND_HEAD_TARGETS.includes(
      selected["compound-head-target"],
    );
}

function buildLinearizationTokens(
  selection,
  head,
  modifiers,
  dependents,
) {
  const marker = () => ({ kind: "adjunctor", value: "in" });
  const headToken = { kind: "clause", clause: head };
  const modifierTokens = modifiers.map(clause => ({
    kind: "clause",
    clause,
  }));
  const dependentTokens = dependents.map(clause => ({
    kind: "clause",
    clause,
  }));
  const marked = selection.adjunctor === "in";
  if (selection.topology === "cooperating-preposed-nonpreposed") {
    const markPreposed = [
      "preposed-in",
      "both-in",
    ].includes(selection.adjunctor);
    const markNonpreposed = [
      "nonpreposed-in",
      "both-in",
    ].includes(selection.adjunctor);
    return [
      ...(markPreposed ? [marker()] : []),
      modifierTokens[0],
      headToken,
      ...(markNonpreposed ? [marker()] : []),
      modifierTokens[1],
    ];
  }
  if (selection.topology === "discontinuous") {
    const markedModifier = marked
      ? [marker(), modifierTokens[0]]
      : [modifierTokens[0]];
    return selection.order === "discontinuous-modifier-first"
      ? [...markedModifier, ...dependentTokens, headToken]
      : [headToken, ...dependentTokens, ...markedModifier];
  }
  if (selection.order === "modifier-head-preposed") {
    return [
      ...(marked ? [marker()] : []),
      modifierTokens[0],
      headToken,
    ];
  }
  return [
    headToken,
    ...(marked ? [marker()] : []),
    modifierTokens[0],
  ];
}

function projectFormula(tokens) {
  return tokens.map(token => (
    token.kind === "adjunctor"
      ? token.value
      : token.clause.formula
  )).join(" ");
}

function projectWritten(tokens, compositionScope) {
  const unitSurface = tokens.map(token => (
    token.kind === "adjunctor"
      ? token.value
      : token.clause.unitSurface
  )).join(" ");
  return {
    unitSurface,
    result: compositionScope === "complete-sentence"
      ? `${capitalizeInitial(unitSurface)}.`
      : unitSurface,
  };
}

function buildCanonicalProjectionBundle(
  targetObject,
  tokens,
  derived,
) {
  const formula = projectFormula(tokens);
  const written = projectWritten(tokens, derived.compositionScope);
  const idSeed = tokens.map(token => (
    token.kind === "adjunctor"
      ? "in"
      : normalizeToken(token.clause.formula)
  )).join("+");
  const formulaRecord = targetObject.buildGrammarFormulaRecord({
    id: `lessons40-43:${idSeed}`,
    unit: "MULTIPLE-NUCLEUS-ADJECTIVAL-MODIFICATION",
    formula,
    formulaSlots: Object.fromEntries(tokens.map((token, index) => [
      `token${index + 1}`,
      {
        slot: token.kind === "adjunctor"
          ? "ADJUNCTOR"
          : `CLAUSE${index + 1}`,
        formulaValue: token.kind === "adjunctor"
          ? token.value
          : token.clause.formula,
      },
    ])),
  });
  const formulaRealizationRecord =
    targetObject.buildGrammarFormulaRealizationRecord({
      id: `${formulaRecord.id}:realization`,
      formulaRecord,
      segmentFrames: tokens.map((token, index) => ({
        slot: `token${index + 1}`,
        formulaValue: token.kind === "adjunctor"
          ? token.value
          : token.clause.formula,
        surface: token.kind === "adjunctor"
          ? token.value
          : token.clause.unitSurface,
      })),
      surfaceForms: [written.result],
    });
  const canonicalResultFrame = deepFreeze({
    ...targetObject.buildGrammarResultFrame({
      ok: true,
      formulaRecord,
      formulaRealizationRecord,
    }),
    surface: written.result,
    surfaceForms: [written.result],
    formulaRecord,
    formulaRecords: [formulaRecord],
    formulaRealizationRecord,
    formulaRealizationRecords: [formulaRealizationRecord],
    formulaProjection: {
      result: formula,
      source: "typed-linearization-tokens",
      derivedFromWrittenProjection: false,
    },
    writtenProjection: {
      result: written.result,
      unitSurface: written.unitSurface,
      source: "typed-linearization-tokens-plus-boundary-realization",
      derivedFromFormulaProjection: false,
    },
  });
  return deepFreeze({
    tokens,
    formulaRecord,
    formulaRealizationRecord,
    canonicalResultFrame,
    formulaProjection: canonicalResultFrame.formulaProjection,
    writtenProjection: canonicalResultFrame.writtenProjection,
  });
}

function buildBlockedResult(
  targetObject,
  blockReason,
  request = {},
  extra = {},
) {
  return issue(targetObject, "results", deepFreeze({
    kind: RESULT_CONTRACT_KIND,
    version: VERSION,
    authorizationStatus: "blocked",
    blockReason: normalizeKey(blockReason)
      || "lessons40-43-request-blocked",
    operationKind: normalizeKey(request.operationKind),
    typedFrameAuthority: true,
    callerSuppliedAuthorityAccepted: false,
    lessonMetadataAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    ...extra,
  }));
}

function evaluateModification(
  targetObject,
  request,
  grammarFrameOwnerCapability,
) {
  const discourseSourceContextFrame =
    request.discourseSourceContextFrame || null;
  if (
    discourseSourceContextFrame
    && (
      typeof targetObject
        ?.isClassicalNahuatlDiscourseSourceContextFrame !== "function"
      || !targetObject.isClassicalNahuatlDiscourseSourceContextFrame(
        discourseSourceContextFrame,
      )
    )
  ) {
    return buildBlockedResult(
      targetObject,
      "lessons40-43-issued-discourse-source-context-required",
      request,
    );
  }
  const additional = Array.isArray(request.additionalModifiers)
    ? request.additionalModifiers
    : [];
  const intervening = Array.isArray(request.interveningClauses)
    ? request.interveningClauses
    : [];
  const head = getSelectedCanonicalClause(
    targetObject,
    request.head,
    "head",
  );
  const primaryModifier = getSelectedCanonicalClause(
    targetObject,
    request.modifier,
    "modifier",
  );
  const additionalModifiers = additional.map((input, index) => (
    getSelectedCanonicalClause(
      targetObject,
      input,
      `modifier-${index + 2}`,
    )
  ));
  const dependents = intervening.map((input, index) => (
    getSelectedCanonicalClause(
      targetObject,
      input,
      `intervening-${index + 1}`,
    )
  ));
  if (!head) {
    return buildBlockedResult(
      targetObject,
      "lessons40-43-canonical-head-result-required",
      request,
    );
  }
  if (head.unitKind !== "nnc") {
    return buildBlockedResult(
      targetObject,
      "lessons40-43-head-must-be-nnc",
      request,
    );
  }
  if (!primaryModifier) {
    return buildBlockedResult(
      targetObject,
      "lessons40-43-canonical-modifier-result-required",
      request,
    );
  }
  if (
    additionalModifiers.some(item => !item)
    || dependents.some(item => !item)
  ) {
    return buildBlockedResult(
      targetObject,
      "lessons40-43-every-dependent-must-be-canonical-result",
      request,
    );
  }
  const modifiers = [primaryModifier, ...additionalModifiers];
  const selection = buildSelection(request, head, modifiers);
  const selectionError = validateSelection(
    request,
    selection,
    head,
    modifiers,
    dependents,
    discourseSourceContextFrame,
  );
  if (selectionError) {
    return buildBlockedResult(targetObject, selectionError, request);
  }
  const derived = deriveReadOnlyFacts(
    selection,
    head,
    modifiers,
    discourseSourceContextFrame,
  );
  const selectedClauses = [head, ...modifiers, ...dependents];
  const grammarFrame = buildGrammarFrame(
    targetObject,
    selection,
    derived,
    selectedClauses,
    discourseSourceContextFrame,
  );
  if (!isGrammarFrame(targetObject, grammarFrame)) {
    return buildBlockedResult(
      targetObject,
      "lessons40-43-grammar-frame-invalid",
      request,
    );
  }
  const tokens = buildLinearizationTokens(
    selection,
    head,
    modifiers,
    dependents,
  );
  const bundle = buildCanonicalProjectionBundle(
    targetObject,
    tokens,
    derived,
  );
  const result = deepFreeze({
    kind: RESULT_CONTRACT_KIND,
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    operationKind: OPERATION_KIND,
    grammarFrame,
    selectedClauses,
    discourseSourceContextFrame,
    selection,
    derived,
    topology: selection.topology,
    order: selection.order,
    adjunctor: selection.adjunctor,
    linkRole: selection.linkRole,
    modifierLinkRoles: selection.modifierLinkRoles,
    compoundHeadTarget: selection.compoundHeadTarget,
    linearizationTokens: tokens,
    selectedFormulaRecordId: bundle.formulaRecord.id,
    selectedFormulaRealizationRecordId:
      bundle.formulaRealizationRecord.id,
    selectedVariantId:
      `${bundle.formulaRealizationRecord.id}::surface-0`,
    formulaRecord: bundle.formulaRecord,
    formulaRealizationRecord: bundle.formulaRealizationRecord,
    canonicalResultFrame: bundle.canonicalResultFrame,
    formulaProjection: bundle.formulaProjection,
    writtenProjection: bundle.writtenProjection,
    formulaRealization: bundle.formulaProjection.result,
    surfaceRealization: bundle.writtenProjection.result,
    wordSurface: bundle.writtenProjection.unitSurface,
    sentenceSurface: derived.compositionScope === "complete-sentence"
      ? bundle.writtenProjection.result
      : "",
    surface: bundle.writtenProjection.result,
    surfaceForms: [bundle.writtenProjection.result],
    grammarFrameEnvelope: targetObject.buildGrammarFrame({
      resultFrame: bundle.canonicalResultFrame,
    }, grammarFrameOwnerCapability),
    formulaAndWrittenGeneratedIndependently: true,
    scalarEvaluatorIdentity: "evaluateClassicalNahuatlAdjectivalModification",
    typedFrameAuthority: true,
    callerSuppliedAuthorityAccepted: false,
    lessonMetadataAuthority: false,
    citationAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  return issue(targetObject, "results", result);
}

function evaluate(
  targetObject,
  request = {},
  grammarFrameOwnerCapability = null,
) {
  if (!request || typeof request !== "object" || Array.isArray(request)) {
    return buildBlockedResult(
      targetObject,
      "lessons40-43-request-object-required",
    );
  }
  const forbiddenKey = Reflect.ownKeys(request).find(key => (
    typeof key !== "string" || FORBIDDEN_AUTHORITY_KEYS.has(key)
  ));
  if (forbiddenKey !== undefined) {
    return buildBlockedResult(
      targetObject,
      "lessons40-43-caller-authority-forbidden",
      request,
      { rejectedAuthorityKey: String(forbiddenKey) },
    );
  }
  const unknownKey = Object.keys(request).find(
    key => !ALLOWED_REQUEST_KEYS.has(key),
  );
  if (unknownKey) {
    return buildBlockedResult(
      targetObject,
      "lessons40-43-request-field-not-licensed",
      request,
      { rejectedRequestKey: unknownKey },
    );
  }
  if (normalizeKey(request.operationKind) !== OPERATION_KIND) {
    return buildBlockedResult(
      targetObject,
      "lessons40-43-operation-kind-not-licensed",
      request,
    );
  }
  return evaluateModification(
    targetObject,
    request,
    grammarFrameOwnerCapability,
  );
}

function isResultFrame(targetObject, frame = null) {
  if (
    !frame
    || frame.kind !== RESULT_CONTRACT_KIND
    || frame.version !== VERSION
    || !getOwnerState(targetObject).results.has(frame)
    || !["authorized", "blocked"].includes(frame.authorizationStatus)
    || frame.typedFrameAuthority !== true
    || frame.callerSuppliedAuthorityAccepted !== false
    || frame.lessonMetadataAuthority !== false
    || frame.formulaStringAuthority !== false
    || frame.surfaceStringAuthority !== false
  ) {
    return false;
  }
  if (frame.authorizationStatus === "blocked") {
    return Boolean(frame.blockReason);
  }
  return frame.operationKind === OPERATION_KIND
    && isGrammarFrame(targetObject, frame.grammarFrame)
    && Array.isArray(frame.selectedClauses)
    && frame.selectedClauses.length >= 2
    && frame.selectedClauses.every(
      clause => getOwnerState(targetObject).selectedClauses.has(clause),
    )
    && frame.discourseSourceContextFrame
      === frame.grammarFrame.sourceConstituents
        ?.discourseSourceContextFrame
    && frame.formulaProjection?.result
      === frame.canonicalResultFrame?.formulaProjection?.result
    && frame.formulaProjection?.derivedFromWrittenProjection === false
    && frame.writtenProjection?.result
      === frame.canonicalResultFrame?.writtenProjection?.result
    && frame.writtenProjection?.derivedFromFormulaProjection === false
    && frame.formulaAndWrittenGeneratedIndependently === true
    && frame.scalarEvaluatorIdentity
      === "evaluateClassicalNahuatlAdjectivalModification"
    && Boolean(
      frame.selectedFormulaRecordId
      && frame.selectedFormulaRealizationRecordId
      && frame.selectedVariantId
      && frame.canonicalResultFrame,
    );
}

function realizeNncCarriers(targetObject, carriers = []) {
  if (
    typeof targetObject?.realizeClassicalNahuatlNncSurfaceCarriers
      === "function"
  ) {
    return normalizeStem(
      targetObject.realizeClassicalNahuatlNncSurfaceCarriers(carriers),
    );
  }
  return normalizeStem(carriers.map(value => (
    normalizeStem(value).replace(/[0Ø⎕-]/gu, "")
  )).join(""));
}

function buildIncorporatedClauseStem(
  targetObject,
  clause,
  { deleteNumberDyad = false } = {},
) {
  const slotFrame = clause?.typedSlotFrame || null;
  if (
    clause?.unitKind !== "nnc"
    || typeof targetObject?.isClassicalNahuatlNncSlotFrame !== "function"
    || !targetObject.isClassicalNahuatlNncSlotFrame(slotFrame)
  ) {
    return null;
  }
  const carriers = [
    slotFrame.slots?.subject?.pers1,
    slotFrame.slots?.subject?.pers2,
    ...(slotFrame.slots?.state?.slots || []).map(slot => slot.carrier),
    slotFrame.slots?.predicate?.stem,
    ...(deleteNumberDyad
      ? []
      : [
        slotFrame.slots?.number?.num1,
        slotFrame.slots?.number?.num2,
      ]),
  ];
  const stem = realizeNncCarriers(targetObject, carriers);
  return stem ? deepFreeze({
    clause,
    stem,
    subjectPersonCarriers: deepFreeze([
      slotFrame.slots?.subject?.pers1 || "",
      slotFrame.slots?.subject?.pers2 || "",
    ]),
    numberDyadDeleted: deleteNumberDyad,
    numberDyadPreserved: !deleteNumberDyad,
    derivedOnlyFromOwnerIssuedTypedSlots: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  }) : null;
}

function buildIncorporationAnalysis(targetObject, source = {}) {
  if (
    !source
    || typeof source !== "object"
    || Array.isArray(source)
    || Reflect.ownKeys(source).some(
      key => typeof key !== "string" || key !== "sequenceStatus",
    )
    || normalizeKey(source.sequenceStatus)
      !== "lexicalized-concatenate"
  ) {
    return null;
  }
  const frame = issue(targetObject, "incorporationAnalyses", deepFreeze({
    kind:
      "classical-nahuatl-adjectival-modification-incorporation-analysis",
    version: VERSION,
    authorizationStatus: "authorized",
    sequenceStatus: "lexicalized-concatenate",
    typedSourceAnalysisRequired: true,
    CanvasExampleMembershipRequired: false,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    lessonMetadataAuthority: false,
  }));
  ISSUED_INCORPORATION_ANALYSES.add(frame);
  return frame;
}

function isIncorporationAnalysis(targetObject, frame = null) {
  return Boolean(
    frame
    && ISSUED_INCORPORATION_ANALYSES.has(frame)
    && frame.kind
      === "classical-nahuatl-adjectival-modification-incorporation-analysis"
    && frame.authorizationStatus === "authorized"
    && frame.sequenceStatus === "lexicalized-concatenate"
    && frame.typedSourceAnalysisRequired === true
    && frame.CanvasExampleMembershipRequired === false
    && frame.grammarAuthority === false
    && Object.isFrozen(frame)
  );
}

function projectResultForIncorporation(
  targetObject,
  result = null,
  incorporationAnalysis = null,
) {
  if (
    !isResultFrame(targetObject, result)
    || !isIncorporationAnalysis(targetObject, incorporationAnalysis)
    || result.authorizationStatus !== "authorized"
    || result.topology !== "ordinary"
    || result.order !== "modifier-head-preposed"
    || result.adjunctor !== "none"
    || result.selectedClauses?.length !== 2
    || result.linearizationTokens?.length !== 2
  ) {
    return null;
  }
  const [head, modifier] = result.selectedClauses;
  if (
    result.linearizationTokens[0]?.clause !== modifier
    || result.linearizationTokens[1]?.clause !== head
  ) {
    return null;
  }
  const modifierPart = buildIncorporatedClauseStem(
    targetObject,
    modifier,
  );
  const headPart = buildIncorporatedClauseStem(
    targetObject,
    head,
    { deleteNumberDyad: true },
  );
  if (!modifierPart || !headPart) return null;
  const frame = deepFreeze({
    kind: INCORPORATION_FRAME_KIND,
    version: VERSION,
    authorizationStatus: "authorized",
    canonicalAdjectivalModificationResult: result,
    incorporationAnalysis,
    exactResultIdentityPreserved: true,
    modifierPart,
    headPart,
    incorporatedStem: `${modifierPart.stem}-${headPart.stem}`,
    constituentSubjectPronounsPreserved: true,
    modifierNumberDyadPreserved: true,
    headNumberDyadDeleted: true,
    fixedModifierHeadConcatenationRequired: true,
    lexicalizationStillRequiresTypedSourceAnalysis: true,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    lessonMetadataAuthority: false,
  });
  issue(targetObject, "incorporationFrames", frame);
  ISSUED_INCORPORATION_FRAMES.add(frame);
  return frame;
}

function isIncorporationFrame(targetObject, frame = null) {
  return Boolean(
    frame
    && ISSUED_INCORPORATION_FRAMES.has(frame)
    && frame.kind === INCORPORATION_FRAME_KIND
    && frame.authorizationStatus === "authorized"
    && frame.canonicalAdjectivalModificationResult
      ?.kind === RESULT_CONTRACT_KIND
    && frame.canonicalAdjectivalModificationResult
      ?.authorizationStatus === "authorized"
    && isIncorporationAnalysis(
      targetObject,
      frame.incorporationAnalysis,
    )
    && frame.exactResultIdentityPreserved === true
    && frame.modifierPart?.numberDyadPreserved === true
    && frame.headPart?.numberDyadDeleted === true
    && frame.incorporatedStem
      === `${frame.modifierPart.stem}-${frame.headPart.stem}`
    && frame.constituentSubjectPronounsPreserved === true
    && frame.grammarAuthority === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && frame.lessonMetadataAuthority === false
    && Object.isFrozen(frame)
  );
}

export function isClassicalNahuatlAdjectivalModificationIncorporationFrame(
  frame = null,
  targetObject = globalThis,
) {
  return isIncorporationFrame(targetObject, frame);
}

function getLcmAxes() {
  return clone(LCM_AXES);
}

export function createClassicalNahuatlClosureModule(
  targetObject = globalThis,
  installationContext = null,
) {
  const grammarFrameOwnerCapability =
    installationContext?.grammarFrameOwnerCapability || null;
  getOwnerState(targetObject);
  return {
    CLASSICAL_NAHUATL_LESSONS40_43_VERSION: VERSION,
    CLASSICAL_NAHUATL_LESSONS40_43_GCD_IDENTITY: GCD_IDENTITY,
    CLASSICAL_NAHUATL_LESSONS40_43_OPERATION_KIND: OPERATION_KIND,
    CLASSICAL_NAHUATL_LESSONS42_43_MODIFICATION_TOPOLOGIES:
      MODIFICATION_TOPOLOGIES,
    CLASSICAL_NAHUATL_LESSONS42_43_MODIFICATION_ORDERS:
      MODIFICATION_ORDERS,
    CLASSICAL_NAHUATL_LESSONS42_43_LINK_ROLES: LINK_ROLES,
    CLASSICAL_NAHUATL_LESSONS42_43_COMPOUND_HEAD_TARGETS:
      COMPOUND_HEAD_TARGETS,
    getClassicalNahuatlLcmAxes: getLcmAxes,
    isClassicalNahuatlAdjectivalModificationGrammarFrame:
      frame => isGrammarFrame(targetObject, frame),
    isClassicalNahuatlResultFrame:
      frame => isResultFrame(targetObject, frame),
    buildClassicalNahuatlAdjectivalModificationIncorporationAnalysis:
      source => buildIncorporationAnalysis(targetObject, source),
    isClassicalNahuatlAdjectivalModificationIncorporationAnalysis:
      frame => isIncorporationAnalysis(targetObject, frame),
    projectClassicalNahuatlAdjectivalModificationForIncorporation:
      (result, analysis) => projectResultForIncorporation(
        targetObject,
        result,
        analysis,
      ),
    isClassicalNahuatlAdjectivalModificationIncorporationFrame:
      frame => isIncorporationFrame(targetObject, frame),
    evaluateClassicalNahuatlAdjectivalModification:
      request => evaluate(
        targetObject,
        request,
        grammarFrameOwnerCapability,
      ),
  };
}

export function installClassicalNahuatlClosureGlobals(
  targetObject = globalThis,
  installationContext = null,
) {
  const api = createClassicalNahuatlClosureModule(
    targetObject,
    installationContext,
  );
  for (const [key, value] of Object.entries(api)) {
    Object.defineProperty(targetObject, key, {
      configurable: true,
      enumerable: true,
      writable: true,
      value,
    });
  }
  return api;
}
