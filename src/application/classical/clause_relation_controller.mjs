import {buildCurrentChoiceFrame} from './current_choice_frame.mjs';
import {resolveComparisonChoices, projectComparisonChoiceFrame} from './comparison_choices.mjs?v=20261026-all-comparison-1';
// Typed application controller for composing already-issued canonical clause
// results. It owns presentation decisions only; the clause engine remains the
// sole owner of relation validation, formulas, realization, and surfaces.

import { installClassicalLateValidationOwnersGlobals } from "../../core/classical/late_validation_owner_catalog.mjs?v=20260826-relational-role-340&andrewsRelease=20261024-1&interfaceRelease=1.2.37";

const CONTROLLER_KIND = "classical-clause-relation-controller";
const CONTROLLER_RESULT_KIND = "classical-clause-relation-controller-result";
const CONTROLLER_VERSION = 1;
const BINDING_FRAME_KIND = "classical-clause-relation-binding-frame";
const BINDING_APPLICATION_KIND =
  "classical-clause-relation-binding-application";
const BINDING_FRAME_VERSION = 1;

// Eligibility observes source shape/counts, never these bookkeeping IDs. Use
// one probe identity across roles; actual role custody and execution references
// are still issued independently by their existing owners.
const BINDING_SOURCE_PROBE_REFERENCE = Object.freeze({referenceId: "binding-source"});
const AVAILABILITY_SOURCE_PROBE_REFERENCES = Object.freeze({
  referenceId: "availability-source", subjectReferenceId: "availability-subject",
  objectReferenceId: "availability-object", possessorReferenceId: "availability-possessor",
});
const CAPTURE_ROLES = Object.freeze([
  "principal",
  "adjoined",
  "dependent",
  "supplement",
  "marker",
]);
const ADJECTIVAL_MODIFICATION_RELATION = "adjectival-modification";
const COMPLEMENT_OPERATION_KINDS = Object.freeze([
  "object-complement",
  "subject-complement",
  "adverbial-complement",
]);
const CONJUNCTION_OPERATION_KINDS = Object.freeze([
  "conjunction",
  "correlative-conjunction",
  "lexical-conjunction",
  "parallel-structure",
]);
const COMPARISON_RELATION = "comparison";
const SUPPLEMENTATION_RELATIONS = Object.freeze([
  "supplementation",
  "vocative",
  "rumored-report",
  "deleted-principal",
  "negative-ac-plural",
  "contextual-first-person-realization",
  "exclamatory-utterance",
  "such-that-adjunction",
]);
const NON_ADJUNCTION_RELATIONS = Object.freeze([
  ADJECTIVAL_MODIFICATION_RELATION,
  ...COMPLEMENT_OPERATION_KINDS,
  ...CONJUNCTION_OPERATION_KINDS,
  COMPARISON_RELATION,
  ...SUPPLEMENTATION_RELATIONS,
]);
const BINDING_OPERATION_IDS = Object.freeze([
  "sentence:supplementation",
  "nnc:adjectival-modification",
  "clause:adverbial-adjunction",
  "clause:composition",
  "clause:comparison",
]);
const RELATION_AVAILABILITY = Object.freeze({
  AVAILABLE: "available",
  MISSING_PREREQUISITE: "missing-prerequisite",
  INCOMPATIBLE: "incompatible",
});
const ORDER_VALUES = Object.freeze([
  "modifier-head",
  "head-modifier",
  "appositive-head-modifier",
  "principal-adverbial-head",
  "modifier-head-preposed",
  "discontinuous-head-first",
  "discontinuous-modifier-first",
]);
const RECURSION_VALUES = Object.freeze([
  "none",
  "head",
  "modifier",
  "both",
  "appositive",
]);
const MARKING_VALUES = Object.freeze([
  "unmarked",
  "in",
  "tla",
  "in-tla",
  "ma",
  "in-ma",
  "in-tla-nel",
  "in-ma-nel",
  "ma-nel",
  "ma-nel-zan",
  "ma-zan-nel",
  "ma-nel-za",
  "ma-za-nel",
  "ma-tel-za",
  "ma-tel-za-yeh",
  "ma-zo",
  "ma-zo-tel",
  "ca",
  "iuh",
  "ahzo",
  "ahmo",
  "mah",
  "mah-ca",
  "in",
  "haste-collocation",
  "frozen-quemah",
  "frozen-quemahca",
  "vocative-e",
  "particle",
]);
const PROFILE_VALUES_BY_RELATION = Object.freeze({
  time: Object.freeze([
    "implicit",
    "explicit",
    "corroborating",
    "iuh-state",
    "iuhqui",
    "elliptical",
    "one-out-of-number",
  ]),
  condition: Object.freeze([
    "open",
    "hypothetical-present-future",
    "hypothetical-past",
  ]),
  purpose: Object.freeze([
    "unmarked",
    "ma-optative",
    "ma-admonitive-lest",
    "purposive-vnc",
    "weak",
  ]),
  concession: Object.freeze([
    "in-tla-nel",
    "in-ma-nel",
    "ma-zo",
    "ma-zo-tel",
    "at-least",
  ]),
});
const MARKING_VALUES_BY_RELATION = Object.freeze({
  place: Object.freeze(["in"]),
  condition: Object.freeze(["tla", "in-tla"]),
  purpose: Object.freeze(["unmarked", "in", "ma", "in-ma"]),
  concession: Object.freeze([
    "in-tla-nel",
    "in-ma-nel",
    "ma-nel",
    "ma-nel-zan",
    "ma-zan-nel",
    "ma-nel-za",
    "ma-za-nel",
    "ma-tel-za",
    "ma-tel-za-yeh",
    "ma-zo",
    "ma-zo-tel",
  ]),
  reason: Object.freeze(["ca"]),
  consequence: Object.freeze(["in"]),
  proviso: Object.freeze(["ahzo"]),
  supplementation: Object.freeze(["in", "ca"]),
  "deleted-principal": Object.freeze(["in"]),
  "such-that-adjunction": Object.freeze([
    "cuix",
    "ahzo",
    "ahmo",
    "mah",
    "mah-ca",
    "in",
    "frozen-quemah",
    "frozen-quemahca",
  ]),
  "exclamatory-utterance": Object.freeze([
    "haste-collocation",
    "frozen-quemah",
    "frozen-quemahca",
    "vocative-e",
  ]),
});
const COMPLEMENT_SEMANTIC_CATEGORIES = Object.freeze({
  "object-complement": Object.freeze([
    "change",
    "material-composition",
    "designation",
    "state",
  ]),
  "subject-complement": Object.freeze([
    "identity",
    "composition",
    "state",
    "passive-object-complement-transform",
  ]),
  "adverbial-complement": Object.freeze([
    "coverage",
    "beginning",
    "satisfaction",
    "daring",
    "cessation",
    "tarrying",
    "relational-lexicalized",
  ]),
});
const COMPLEMENT_ORDERS = Object.freeze([
  "complement-principal",
  "principal-complement",
  "discontinuous",
]);
const OBJECT_COMPLEMENT_LINK_KINDS = Object.freeze([
  "object-subject",
  "possessor-subject",
]);
const OBJECT_COMPLEMENT_DESIGNATION_STRUCTURES = Object.freeze([
  "ordinary-object-complement",
  "tla-locative-supplement-plus-place-name",
  "possessive-name-possessor-complement",
]);
const SUBJECT_COMPLEMENT_CONTACT_KINDS = Object.freeze([
  "subject",
  "embedded-possessor-cel",
  "embedded-possessor-el",
  "preterit-agentive-subject-iyoh",
]);
const RELATIONAL_COMPLEMENT_PAIRS = Object.freeze([
  "te-ca+cahcayahua",
  "te-pan+teca",
  "te-tech+chicotlamati",
  "te-tech-pa+tlaocoya",
]);
const COMPARISON_CAPTURE_SLOT_LAYOUTS = Object.freeze({
  "similarity-reduplicative-prefix": Object.freeze({
    principal: "source",
  }),
  "similarity-downgraded-possessive-tla": Object.freeze({
    principal: "source",
  }),
  "similarity-tloc-relational-nnc": Object.freeze({
    principal: "comparand",
    adjoined: "standard",
  }),
  "similarity-same-as-pronominal": Object.freeze({
    principal: "comparand",
    adjoined: "standard",
  }),
  "similarity-incorporated-nehnequi": Object.freeze({
    principal: "source",
    adjoined: "comparand",
  }),
  "similarity-resemblance-verbstem-nnc": Object.freeze({
    principal: "principal",
    adjoined: "standard",
  }),
  "similarity-ihui-vnc": Object.freeze({
    principal: "principal",
    adjoined: "topic",
  }),
  "similarity-iuhqui-principal": Object.freeze({
    principal: "adjoined",
    adjoined: "topic",
    dependent: "dimension",
  }),
  "similarity-iuhqui-larger-concatenate": Object.freeze({
    principal: "similarityClause",
    adjoined: "headClause",
  }),
  "equality-iuhqui": Object.freeze({
    principal: "comparand",
    adjoined: "standard",
    dependent: "dimension",
  }),
  "equality-ihuan": Object.freeze({
    principal: "comparand",
    adjoined: "standard",
    dependent: "dimension",
  }),
  "size-ixquich": Object.freeze({
    principal: "standard",
    adjoined: "comparand",
  }),
  "size-quezqui-no-izqui": Object.freeze({
    principal: "leftClause",
    adjoined: "rightClause",
  }),
  "size-more-more-correlative": Object.freeze({
    principal: "leftClause",
    adjoined: "rightClause",
  }),
  "comparative-adversative": Object.freeze({
    principal: "baseClause",
    adjoined: "superiorClause",
  }),
  "comparative-negative-adverbial": Object.freeze({
    principal: "principal",
    adjoined: "standard",
    dependent: "topic",
  }),
  "comparative-tachcauh-hualcah": Object.freeze({
    principal: "point",
    adjoined: "standard",
    dependent: "topic",
  }),
  "comparative-panahuia-unspecified": Object.freeze({
    principal: "principal",
    adjoined: "point",
    dependent: "topic",
    supplement: "standard",
  }),
  "comparative-panahuia-specified": Object.freeze({
    principal: "principal",
    adjoined: "point",
    dependent: "comparand",
    supplement: "standard",
  }),
  "question-how-much-more": Object.freeze({
    principal: "baseClause",
    adjoined: "degreeClause",
  }),
  "superlative-adverbial": Object.freeze({
    principal: "topic",
    adjoined: "predicate",
  }),
  "superlative-incorporated": Object.freeze({
    principal: "topic",
    adjoined: "predicate",
  }),
  "superlative-principal-ic": Object.freeze({
    principal: "topic",
    adjoined: "predicate",
  }),
});
const ALLOWED_SELECTION_KEYS = Object.freeze([
  "relation",
  "degree",
  "relationProfile",
  "structureProfile",
  "markerProfile",
  "order",
  "recursion",
  "topology",
  "semanticCategory",
  "complementOrder",
  "linkKind",
  "dependentLinkKind",
  "designationStructure",
  "contactKind",
  "relationalPairId",
  "principalObjectId",
  "coordinationRelation",
  "coordinationType",
  "clauseLevel",
  "polarity",
  "rightwardModifier",
  "identicalAdjoinedClauseEllipsis",
  "boundaryPunctuation",
  "modifierAdjunctor",
  "compoundHeadTarget",
  "sharedModifierScope",
  "sharedModifier",
  "leftContext",
  "markedAdjoinedUse",
  "adjoinedFunction",
  "correlationType",
  "correlativePattern",
  "lexicalType",
  "adjunctorDistribution",
  "stateRealization",
  "parallelType",
  "rephraseAxis",
  "appositiveType",
  "comparisonRoute",
  "sentenceType",
  "sameAsMarker",
  "negativeIntroducer",
  "negativeStandardIn",
  "degreeMarker",
  "adversativeMarker",
  "questionCollocation",
  "superlativeAdverbial",
  "incorporatedSuperlative",
  "superlativePrincipal",
  "iuhquiModifier",
  "principalNnc",
  "continuationFamily",
  "reduplicationShape",
  "tiClass",
  "adjunctorIn",
  "icRelation",
  "copula",
  "position",
  "supplementationReferenceMode",
  "specificityDomainRestriction",
  "supplementationHeadRole",
  "supplementationContactRole",
  "additionalPossessorContact",
  "supplementationOrder",
  "principalIntervenerUse",
  "discontinuousHeadPosition",
  "supplementationAntecessivePlacement",
  "contextualSilentFirstPerson",
  "supplementObjectId",
  "wishRealizability",
  "exclamatoryPersonalPronounVariant",
  "glottalVariant",
  "silentPluralIn",
  "finalIRealization",
  "vocativeCompanion",
  "vocativeCompanionOrder",
  "mach",
  "fuseQuilMach",
  "reportAdjunctor",
  "deletionKind",
  "speechDirectness",
]);
const FORBIDDEN_AUTHORITY_KEYS = Object.freeze([
  "answer",
  "display",
  "displayFormula",
  "displaySurface",
  "formula",
  "formulaRecord",
  "lesson",
  "lessonId",
  "lessonNumber",
  "result",
  "restoredState",
  "selectedFormula",
  "selectedResult",
  "storedAnswer",
  "storedResult",
  "surface",
  "url",
  "urlState",
]);

const freezeArray = values => Object.freeze(Array.from(values || []));

function unique(values = []) {
  return Array.from(new Set(values.filter(Boolean)));
}

function normalizeToken(value = "") {
  return String(value == null ? "" : value)
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/gu, "-");
}

export function getClassicalClauseRelationMarkerProfiles(relation = "") {
  const normalizedRelation = normalizeToken(relation);
  return freezeArray(["time", "manner"].includes(normalizedRelation)
    ? ["in"] : MARKING_VALUES_BY_RELATION[normalizedRelation] || []);
}

function buildDecision({
  id,
  values = [],
  selectedValue = "",
  required = true,
  reason = "",
  optionAvailability = [],
  inventoryFieldRef = "",
  determinesCaptureRoles = false,
}) {
  const normalizedValues = freezeArray(values);
  const selected = normalizedValues.includes(selectedValue) ? selectedValue : "";
  const normalizedOptionAvailability = freezeArray(
    optionAvailability.map(option => Object.freeze({
      value: normalizeToken(option?.value),
      status: Object.values(RELATION_AVAILABILITY).includes(
        option?.status,
      )
        ? option.status
        : RELATION_AVAILABILITY.INCOMPATIBLE,
      reasonCode: normalizeToken(option?.reasonCode),
      recovery: String(option?.recovery || "").trim(),
      requiredCaptureRoles: freezeArray(
        option?.requiredCaptureRoles || [],
      ),
      missingCaptureRoles: freezeArray(
        option?.missingCaptureRoles || [],
      ),
      ownerEvidenceKind: normalizeToken(option?.ownerEvidenceKind),
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    })),
  );
  const selectedOption = normalizedOptionAvailability.find(
    option => option.value === selected,
  ) || null;
  const selectedAvailable = !normalizedOptionAvailability.length
    || selectedOption?.status === RELATION_AVAILABILITY.AVAILABLE
    || (
      id === "relation"
      && selectedOption?.status === RELATION_AVAILABILITY.MISSING_PREREQUISITE
      && selectedOption.missingCaptureRoles.length > 0
    );
  const decision = {
    kind: "classical-clause-relation-user-decision",
    id,
    values: normalizedValues,
    selectedValue: selected,
    required,
    resolved: Boolean((selected && selectedAvailable) || !required),
    reason,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  };
  if (normalizedOptionAvailability.length) {
    decision.optionAvailability = normalizedOptionAvailability;
  }
  if (inventoryFieldRef) decision.inventoryFieldRef = String(inventoryFieldRef);
  if (determinesCaptureRoles) decision.determinesCaptureRoles = true;
  return Object.freeze(decision);
}

function getCanonicalGrammarFrame(value = null) {
  if (!value || typeof value !== "object") return null;
  return [
    value.grammarFrame,
    value.frames,
    value.output?.grammarFrame,
    value.output?.frames,
  ].find(frame => frame && typeof frame === "object" && frame.resultFrame) || null;
}

function getTypedBoolean(value = null, keys = []) {
  const frame = getCanonicalGrammarFrame(value);
  const sources = [
    frame?.unitFrame,
    frame?.inflectionFrame,
    frame?.nuclearClauseFrame,
    frame?.morphBoundaryFrame,
    frame?.routeContract?.targetContract,
  ].filter(Boolean);
  return sources.some(source => keys.some(key => source[key] === true));
}

function getTypedMarkerProfile(value = null) {
  const frame = getCanonicalGrammarFrame(value);
  const sources = [
    frame?.unitFrame,
    frame?.nuclearClauseFrame,
    frame?.morphBoundaryFrame,
    frame?.routeContract?.targetContract,
  ].filter(Boolean);
  for (const source of sources) {
    for (const key of ["semanticMarker", "markerProfile", "marking"]) {
      const candidate = normalizeToken(source[key]);
      if (MARKING_VALUES.includes(candidate)) return candidate;
    }
  }
  return "";
}

function getAdjectivalModifierClauseType(sourceUnit = null, capture = null, target = null) {
  // Reuse the modifier owner's analysis, including the nucleus inside an
  // issued composition, so its contact requirements reach the chooser.
  const ownerType = target?.getClassicalNahuatlAdjectivalModifierClauseType?.(
    capture?.canonicalResult,
  );
  if (ownerType) return ownerType;
  const sentenceNucleus = capture?.canonicalResult?.vncApplicationFrame
    || capture?.canonicalResult?.lateOperationClosureFrame;
  if (sentenceNucleus) {
    const slots = sentenceNucleus.resultFrame?.finalTypedVncSlotFrame
      || sentenceNucleus.finalTypedVncSlotFrame;
    if (slots) return slots.valenceArity === "vacant"
      ? "intransitive-vnc" : "transitive-vnc";
  }
  const unitKind = normalizeToken(sourceUnit?.features?.unitKind);
  if (unitKind === "vnc") {
    const canonicalResult = capture?.canonicalResult || {};
    const sourceValence = normalizeToken(
      canonicalResult.normalizedRequest?.sourceValence
      || canonicalResult.normalizedRequest?.valence
      || canonicalResult.resultFrame?.normalizedRequest?.sourceValence
      || "",
    );
    return sourceValence && sourceValence !== "intransitive"
      ? "transitive-vnc"
      : "intransitive-vnc";
  }
  if (sourceUnit?.sourceKind === "composition-ast") {
    return "supplementation-structure";
  }
  return "adjectival-nnc";
}

function isAdjectivalCompoundHead(capture = null, target = {}) {
  let canonicalResult = capture?.canonicalResult || {};
  // The marker belongs to the retained head; its authenticated nuclear host
  // supplies the existing compound-target decision. A copied wrapper cannot
  // turn its caller-supplied host into a compound fact.
  while (target.isClassicalNahuatlIssuedParticleSentenceLayerFrame?.(canonicalResult) === true) {
    canonicalResult = canonicalResult.canonicalInputFrame;
  }
  const slotFrame = canonicalResult.typedSlotFrame
    || canonicalResult.sourceNncSlotFrame
    || canonicalResult.canonicalResult?.nncSlotFrame
    || canonicalResult.nncSlotFrame
    || null;
  return canonicalResult.sourceFrame?.compoundSource === true
    || canonicalResult.constructionKind === "compound-nnc"
    || slotFrame?.sourceStructure === "compound"
    || String(slotFrame?.sourceFrameKind || "").includes("compound");
}

function getAdjectivalModificationOrderValues(
  topology = "",
  ownerValues = [],
) {
  const licensedValues = new Set(ownerValues);
  if (topology === "ordinary") {
    return freezeArray([
      "head-modifier",
      "modifier-head-preposed",
    ].filter(value => licensedValues.has(value)));
  }
  if (topology === "discontinuous") {
    return freezeArray([
      "discontinuous-head-first",
      "discontinuous-modifier-first",
    ].filter(value => licensedValues.has(value)));
  }
  return freezeArray([]);
}

function getDerivedAdjectivalModificationOrder(topology = "") {
  return topology === "cooperating-preposed-nonpreposed"
    ? "cooperating-preposed-nonpreposed"
    : "";
}

function getAdjectivalModificationAdjunctorValues(
  topology = "",
  ownerValues = [],
) {
  const expected = topology === "cooperating-preposed-nonpreposed"
    ? [
        "none",
        "preposed-in",
        "nonpreposed-in",
        "both-in",
      ]
    : ["none", "in"];
  const licensedValues = new Set(ownerValues);
  return freezeArray(
    expected.filter(value => licensedValues.has(value)),
  );
}

function getCanonicalPresentation(result = null) {
  const frame = getCanonicalGrammarFrame(result) || result?.grammarFrame || null;
  const resultFrame = frame?.resultFrame || {};
  const formulaRecord = resultFrame.formulaRecord || result?.formulaRecord || null;
  const realizationRecord = resultFrame.formulaRealizationRecord
    || result?.formulaRealizationRecord
    || null;
  const surface = String(
    realizationRecord?.surface
    || realizationRecord?.surfaceForms?.[0]
    || resultFrame.surface
    || resultFrame.surfaceRealization
    || result?.surface
    || result?.surfaceRealization
    || result?.selectedResult
    || "",
  ).trim();
  return Object.freeze({
    formula: String(
      formulaRecord?.formula
      || resultFrame.formulaRealization
      || resultFrame.formula
      || result?.formulaRealization
      || result?.formula
      || "",
    ).trim(),
    formulaRecordId: String(formulaRecord?.id || "").trim(),
    formulaRealizationRecordId: String(realizationRecord?.id || "").trim(),
    surface,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    source: "canonical-engine-result",
  });
}

export function createClassicalClauseRelationControllerGlobals(
  targetObject = globalThis,
) {
  const issuedBindingFrames = new WeakSet();
  const issuedMarkerEntryProjections = new WeakMap();
  const bindingRoleAvailabilityByExactResult = new WeakMap();

  function getBindingOperationRelationIds(operationId = "") {
    const normalizedOperationId = String(operationId || "").trim();
    if (normalizedOperationId === "sentence:supplementation") {
      return SUPPLEMENTATION_RELATIONS;
    }
    if (normalizedOperationId === "nnc:adjectival-modification") {
      return Object.freeze([ADJECTIVAL_MODIFICATION_RELATION]);
    }
    if (normalizedOperationId === "clause:composition") {
      return Object.freeze([
        ...COMPLEMENT_OPERATION_KINDS,
        ...CONJUNCTION_OPERATION_KINDS,
      ]);
    }
    if (normalizedOperationId === "clause:comparison") {
      return Object.freeze([COMPARISON_RELATION]);
    }
    if (normalizedOperationId === "clause:adverbial-adjunction") {
      const inventory = targetObject.ADVERBIAL_ADJUNCTION_RELATION;
      return freezeArray(unique(
        inventory && typeof inventory === "object"
          ? Object.values(inventory)
            .map(normalizeToken)
            .filter(value => !["", "unknown", "recursive"].includes(value))
          : [],
      ));
    }
    return Object.freeze([]);
  }

  function getBindingRolesForRelation(relation = "") {
    const normalizedRelation = normalizeToken(relation);
    if (normalizedRelation === ADJECTIVAL_MODIFICATION_RELATION) {
      return Object.freeze(["principal", "adjoined", "dependent"]);
    }
    if (COMPLEMENT_OPERATION_KINDS.includes(normalizedRelation)) {
      return Object.freeze([
        "principal",
        "adjoined",
        ...(normalizedRelation === "object-complement" ? ["dependent"] : []),
      ]);
    }
    if (CONJUNCTION_OPERATION_KINDS.includes(normalizedRelation)) {
      return Object.freeze([
        "principal", "adjoined", "dependent", "supplement",
        ...(normalizedRelation === "conjunction" ? ["marker"] : []),
      ]);
    }
    if (normalizedRelation === COMPARISON_RELATION) {
      return Object.freeze([
        "principal",
        "adjoined",
        "dependent",
        "supplement",
      ]);
    }
    if (normalizedRelation === "supplementation") {
      return Object.freeze(["principal", "adjoined", "marker"]);
    }
    if (normalizedRelation === "vocative") {
      return Object.freeze(["principal", "adjoined"]);
    }
    if (normalizedRelation === "rumored-report") {
      return Object.freeze(["principal", "adjoined"]);
    }
    if (normalizedRelation === "deleted-principal") {
      return Object.freeze(["principal", "adjoined", "dependent", "marker"]);
    }
    if ([
      "negative-ac-plural",
      "contextual-first-person-realization",
    ].includes(normalizedRelation)) {
      return Object.freeze(["principal"]);
    }
    if (normalizedRelation === "exclamatory-utterance") {
      return CAPTURE_ROLES;
    }
    if (normalizedRelation === "such-that-adjunction") {
      return Object.freeze(["principal", "adjoined", "dependent", "marker"]);
    }
    return Object.freeze(["principal", "adjoined", "marker"]);
  }

  function getBindingOwnerSourceEvidence(
    operationId = "",
    exactResult = null,
    role = "",
  ) {
    const ownerSourceResult = Boolean(
      typeof targetObject.isClassicalNahuatlVncSentenceResultFrame
        === "function"
      && targetObject.isClassicalNahuatlVncSentenceResultFrame(exactResult)
    )
      ? exactResult.canonicalSourceFrame || null
      : exactResult;
    const sourceUnit = typeof targetObject
      .getCanonicalAdverbialAdjunctionSourceUnit === "function"
      ? targetObject.getCanonicalAdverbialAdjunctionSourceUnit(
        exactResult,
        role,
      )
      : null;
    const unitType = normalizeToken(
      sourceUnit?.features?.unitKind || sourceUnit?.unitType || "",
    );
    let accepted = Boolean(sourceUnit?.ok);
    let ownerEvidenceKind = "canonical-clause-source-unit";
    let compatibleRelationIds = Object.freeze([]);
    if (operationId === "sentence:supplementation") {
      const envelope = (
        typeof targetObject.isClassicalNahuatlSupplementationFrame
          === "function"
        && targetObject.isClassicalNahuatlSupplementationFrame(exactResult)
      )
        ? exactResult.principalClause || null
        : typeof targetObject
          .buildClassicalNahuatlSupplementationClauseEnvelope === "function"
          ? targetObject.buildClassicalNahuatlSupplementationClauseEnvelope(
            exactResult,
            BINDING_SOURCE_PROBE_REFERENCE,
          )
          : null;
      accepted = unitType === "particle" || Boolean(
        typeof targetObject.isClassicalNahuatlSupplementationClauseEnvelope
          === "function"
        && targetObject.isClassicalNahuatlSupplementationClauseEnvelope(
          envelope,
        ),
      );
      ownerEvidenceKind = "supplementation-clause-envelope";
    } else if (operationId === "clause:composition") {
      const nestedComposition = Boolean(
        (
          typeof targetObject
            .isClassicalNahuatlClauseComplementationResultFrame === "function"
          && targetObject.isClassicalNahuatlClauseComplementationResultFrame(
            exactResult,
          )
        )
        || (
          typeof targetObject
            .isClassicalNahuatlClauseConjunctionResultFrame === "function"
          && targetObject.isClassicalNahuatlClauseConjunctionResultFrame(
            exactResult,
          )
        )
      );
      const sourceFrame = typeof targetObject
        .buildClassicalNahuatlClauseCompositionSourceFrame === "function"
        ? targetObject.buildClassicalNahuatlClauseCompositionSourceFrame(
          ownerSourceResult,
          AVAILABILITY_SOURCE_PROBE_REFERENCES,
        )
        : null;
      accepted = Boolean(
        nestedComposition
        || (
          typeof targetObject.isClassicalNahuatlClauseCompositionSourceFrame
            === "function"
          && targetObject.isClassicalNahuatlClauseCompositionSourceFrame(
            sourceFrame,
          )
        ),
      );
      if (role === "marker" && unitType === "particle"
        && targetObject.getClassicalNahuatlParticleRelationalUse?.(exactResult)?.compositeRoles?.outerConjunctor) {
        accepted = true;
        ownerEvidenceKind = "composite-conjunctor-source-role";
      } else {
        ownerEvidenceKind = "clause-composition-source-frame";
      }
    } else if (operationId === "clause:comparison") {
      const sourceFrame = typeof targetObject.buildClassicalComparisonSourceUnit
        === "function"
        ? targetObject.buildClassicalComparisonSourceUnit({
          sourceResult: ownerSourceResult,
        })
        : null;
      accepted = Boolean(
        typeof targetObject.isClassicalComparisonSourceUnit === "function"
        && targetObject.isClassicalComparisonSourceUnit(sourceFrame)
        && sourceFrame.authorizationStatus === "authorized",
      );
      ownerEvidenceKind = "comparison-source-unit";
    } else if (operationId === "nnc:adjectival-modification") {
      // A retained composition can supply a modifier through the adjectival
      // owner's authenticated nuclear analysis. Its coarse transport kind is
      // not a noun class and cannot itself grant this role.
      const ownedCompositionModifier = ["adjoined", "dependent"].includes(role)
        && (
          targetObject.isAdverbialAdjunctionResult?.(exactResult) === true
          || targetObject.isClassicalNahuatlSupplementationFrame?.(exactResult) === true
        )
        && Boolean(targetObject.getClassicalNahuatlAdjectivalModifierClauseType?.(exactResult));
      accepted = Boolean(
        sourceUnit?.ok
        && (
          role === "principal"
            ? unitType === "nnc"
            : ["nnc", "vnc", "clause", "sentence"].includes(unitType)
              || ownedCompositionModifier
        )
      );
      ownerEvidenceKind = "adjectival-modification-clause-source";
    } else if (operationId === "clause:adverbial-adjunction") {
      accepted = Boolean(
        sourceUnit?.ok
        && (
          role === "marker"
            ? unitType === "particle"
            : unitType !== "particle"
        )
      );
      ownerEvidenceKind = "adverbial-adjunction-source-unit";
      if (
        accepted
        && role === "adjoined"
        && typeof targetObject.issueAdverbialAdjunctionAvailabilityContract
          === "function"
        && typeof targetObject.isAdverbialAdjunctionAvailabilityContract
          === "function"
      ) {
        const availability =
          targetObject.issueAdverbialAdjunctionAvailabilityContract({
            principalClause: exactResult,
            adjoinedUnit: exactResult,
          });
        if (
          targetObject.isAdverbialAdjunctionAvailabilityContract(
            availability,
          )
          && availability.authorizationStatus === "authorized"
        ) {
          compatibleRelationIds = freezeArray(
            availability.availableRelations,
          );
        }
      }
    }
    return Object.freeze({
      accepted,
      unitType,
      ownerEvidenceKind,
      compatibleRelationIds,
    });
  }

  function getOwnerTypedMarkerProfile(exactResult = null) {
    const sourceUse = targetObject.getClassicalNahuatlParticleRelationalUse?.(exactResult);
    return sourceUse?.compositeRoles?.innerMarker?.semanticMarker || getTypedMarkerProfile(exactResult);
  }

  function getCompositeOuterEntryUse(exactHost = null, exactMarker = null) {
    const sourceUse = targetObject.getClassicalNahuatlParticleRelationalUse?.(exactMarker);
    const outerRole = sourceUse?.compositeRoles?.outerConjunctor;
    const marker = exactHost?.sourceContract?.marker;
    const innerRole = marker?.compositeMarkerRole;
    if (!outerRole || targetObject.isAdverbialAdjunctionResult?.(exactHost) !== true
      || exactHost.ruleProfile?.relation !== sourceUse.relation
      || exactHost.ruleProfile?.degree !== sourceUse.degree
      || marker.issuedResult !== exactMarker || innerRole?.exactParticleResult !== exactMarker
      || innerRole.sourceUse !== sourceUse || innerRole.sourceRole !== sourceUse.compositeRoles.innerMarker
      || !Object.isFrozen(innerRole)) return null;
    return Object.freeze({...sourceUse, relation: outerRole.relation, hostRole: "adjoined",
      markerRole: "marker", relationProfile: "", compositeStage: "outer", sourceUse, outerRole});
  }

  function bindingMarkerSupportsRelation(
    relation = "",
    exactResult = null,
    sourceUnit = null,
  ) {
    const normalizedRelation = normalizeToken(relation);
    if (normalizedRelation === "exclamatory-utterance") return true;
    if (normalizedRelation === "conjunction") {
      return targetObject.getClassicalNahuatlParticleRelationalUse?.(exactResult)
        ?.compositeRoles?.outerConjunctor?.relation === "conjunction";
    }
    const markerSemantic = normalizeToken(
      targetObject.getClassicalNahuatlParticleRelationalUse?.(exactResult)?.compositeRoles?.innerMarker?.semanticMarker
      || exactResult?.semanticMarker
      || getTypedMarkerProfile(exactResult)
      || sourceUnit?.features?.negativizedParticle
      || "",
    );
    return Boolean(
      markerSemantic
      && (
        getClassicalClauseRelationMarkerProfiles(normalizedRelation).includes(
          markerSemantic,
        )
        || (
          normalizedRelation === "proviso"
          && markerSemantic === "ahzo"
        )
      )
    );
  }

  function bindingRoleSupportsRelation({
    operationId = "",
    relation = "",
    role = "",
    exactResult = null,
    sourceEvidence = null,
  } = {}) {
    if (!sourceEvidence?.accepted) return false;
    if (role === "marker") {
      const sourceUnit = typeof targetObject
        .getCanonicalAdverbialAdjunctionSourceUnit === "function"
        ? targetObject.getCanonicalAdverbialAdjunctionSourceUnit(
          exactResult,
          role,
        )
        : null;
      if (operationId === "sentence:supplementation"
        && relation === "such-that-adjunction") {
        return sourceEvidence.unitType === "particle"
          && ["l3-mah", "l58-mah-ca"].includes(
            normalizeToken(exactResult?.particleId),
          );
      }
      return sourceEvidence.unitType === "particle"
        && bindingMarkerSupportsRelation(
          relation,
          exactResult,
          sourceUnit,
        );
    }
    if (operationId === "clause:adverbial-adjunction"
      && relation === "intensification") {
      // Staging uses the same canonical role eligibility as full-pair
      // authorization, including nominal heads and nonreferential primitives.
      return targetObject.isAdverbialAdjunctionIntensityRoleSource?.(exactResult, role) === true;
    }
    if (
      operationId === "clause:adverbial-adjunction"
      && role === "adjoined"
      && sourceEvidence.compatibleRelationIds.length
      && !sourceEvidence.compatibleRelationIds.includes(relation)
    ) {
      return false;
    }
    if (
      operationId === "sentence:supplementation"
      && relation === "such-that-adjunction"
    ) {
      const particleId = normalizeToken(exactResult?.particleId);
      if (role === "principal" && sourceEvidence.unitType === "particle") {
        return ["l3-cuix", "l3-ahzo", "l58-ahmo", "l58-quemah", "l58-quemahca"].includes(particleId);
      }
      if (role === "dependent") {
        return particleId === "l3-in";
      }
      return sourceEvidence.unitType !== "particle";
    }
    if (
      sourceEvidence.unitType === "particle"
      && !(
        operationId === "sentence:supplementation"
        && relation === "exclamatory-utterance"
      )
    ) {
      return false;
    }
    return true;
  }

  // Restrict discovery to the requested roles, using the same owner evidence.
  // Omission retains the complete public inventory. Caller accessors cannot
  // turn a malformed projection into an unrestricted query.
  function normalizeBindingCaptureRoles(requested = null) {
    if (requested == null) return CAPTURE_ROLES;
    try {
      if (!Array.isArray(requested) || Object.getPrototypeOf(requested) !== Array.prototype) return null;
      const descriptors = Object.getOwnPropertyDescriptors(requested);
      const length = descriptors.length?.value;
      if (!Number.isInteger(length) || length < 1 || length > CAPTURE_ROLES.length
        || Reflect.ownKeys(descriptors).length !== length + 1) return null;
      const roles = [];
      for (let index = 0; index < length; index += 1) {
        if (!Object.hasOwn(descriptors, String(index))) return null;
        const descriptor = descriptors[index];
        if (!descriptor || !Object.hasOwn(descriptor, "value")
          || !CAPTURE_ROLES.includes(descriptor.value) || roles.includes(descriptor.value)) return null;
        roles.push(descriptor.value);
      }
      return Object.freeze(roles);
    } catch { return null; }
  }

  function issueClassicalClauseRelationBindingFrame(
    operationId = "",
    currentResult = null,
    requestedCaptureRoles = null,
  ) {
    const captureRoles = normalizeBindingCaptureRoles(requestedCaptureRoles);
    const normalizedOperationId = String(operationId || "").trim();
    const operationRecognized = BINDING_OPERATION_IDS.includes(
      normalizedOperationId,
    );
    const captureSlotId = "clause-relation-binding-source";
    const resultCapture = operationRecognized && captureRoles
      && typeof targetObject.captureClassicalGrammarApplicationResult
        === "function"
      ? targetObject.captureClassicalGrammarApplicationResult(
        currentResult,
        captureSlotId,
      )
      : null;
    const captureValid = Boolean(
      resultCapture
      && typeof targetObject.isClassicalGrammarApplicationResultCapture
        === "function"
      && targetObject.isClassicalGrammarApplicationResultCapture(
        resultCapture,
        captureSlotId,
      )
    );
    const exactResult = captureValid ? resultCapture.canonicalResult : null;
    const relationIds = operationRecognized
      ? getBindingOperationRelationIds(normalizedOperationId)
      : Object.freeze([]);
    const roleEvidence = new Map();
    const cachedRoleAvailability = captureValid
      ? bindingRoleAvailabilityByExactResult.get(exactResult) : null;
    const roleAvailability = cachedRoleAvailability || new Map();
    if (captureValid) {
      captureRoles.forEach(role => {
        roleEvidence.set(
          role,
          getBindingOwnerSourceEvidence(
            normalizedOperationId,
            exactResult,
            role,
          ),
        );
        // A fresh controller with only this exact Result in this role has the
        // same availability for every binding operation. Keep operation-specific
        // source evidence above, and validate the capture before using this cache.
        if (!roleAvailability.has(role)) {
          const probe = createClassicalClauseRelationController();
          const probeCapture = probe.captureCurrentResult(role, exactResult);
          roleAvailability.set(
            role,
            probeCapture.authorizationStatus === "authorized"
              ? probe.issueRelationAvailabilityContract()
              : null,
          );
        }
      });
      if (!cachedRoleAvailability && Object.isFrozen(exactResult)) {
        bindingRoleAvailabilityByExactResult.set(exactResult, roleAvailability);
      }
    }
    const bindingChoices = freezeArray(
      relationIds.flatMap(relation => (
        getBindingRolesForRelation(relation).filter(role => captureRoles?.includes(role)).flatMap(role => {
          const sourceEvidence = roleEvidence.get(role) || null;
          const availability = roleAvailability.get(role) || null;
          const relationOption = availability?.relations?.find(
            option => option.value === relation,
          ) || null;
          if (
            !relationOption
            || relationOption.status === RELATION_AVAILABILITY.INCOMPATIBLE
            || !bindingRoleSupportsRelation({
              operationId: normalizedOperationId,
              relation,
              role,
              exactResult,
              sourceEvidence,
            })
          ) {
            return [];
          }
          return [Object.freeze({
            id: `${relation}:${role}`,
            relation,
            captureRole: role,
            relationEntryStatus: relationOption.status,
            requiredCaptureRoles: relationOption.requiredCaptureRoles,
            missingCaptureRolesAfterBinding:
              relationOption.missingCaptureRoles,
            ownerEvidenceKind: sourceEvidence.ownerEvidenceKind,
            exactResultIdentityRequired: true,
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
          })];
        })
      )),
    );
    const authorizationStatus = bindingChoices.length
      ? "authorized"
      : "blocked";
    const blockReason = authorizationStatus === "authorized"
      ? ""
      : !operationRecognized
        ? "classical-clause-relation-binding-operation-not-recognized"
        : !captureValid
          ? resultCapture?.blockReason
            || "classical-clause-relation-binding-issued-result-required"
          : "classical-clause-relation-binding-source-incompatible";
    const frame = Object.freeze({
      kind: BINDING_FRAME_KIND,
      version: BINDING_FRAME_VERSION,
      authorizationStatus,
      blockReason,
      operationId: normalizedOperationId,
      inputResult: captureValid ? currentResult : null,
      applicationResult: captureValid
        ? resultCapture.applicationResult
        : null,
      exactResult,
      capturedResultRole: captureValid
        ? resultCapture.capturedResultRole
        : "",
      resultCapture: captureValid ? resultCapture : null,
      relationIds,
      bindingChoices,
      bindingIds: freezeArray(bindingChoices.map(choice => choice.id)),
      ownerChoicesRequired: bindingChoices.length > 1,
      ownerInputAcceptanceProven: authorizationStatus === "authorized",
      ownerRejectionProven: Boolean(captureValid && !bindingChoices.length),
      exactResultIdentityPreserved: captureValid,
      ownerAuthorizationStillRequired: true,
      sourceStringAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      lessonMetadataAuthority: false,
      storedStateAuthority: false,
      grammarAuthority: false,
    });
    issuedBindingFrames.add(frame);
    return frame;
  }

  function issueClassicalClauseMarkerEntryProjection(exactHost = null, exactMarker = null) {
    const sourceRelationalUse = targetObject.getClassicalNahuatlParticleRelationalUse?.(exactMarker);
    const relationalUse = getCompositeOuterEntryUse(exactHost, exactMarker) || sourceRelationalUse;
    const blocked = reason => Object.freeze({
      kind: "classical-clause-marker-entry-projection", authorizationStatus: "blocked",
      blockReason: reason, executionAllowed: false,
    });
    if (!relationalUse || relationalUse.selectedExternalUse !== "dependent-clause-introduction") {
      return blocked("classical-clause-marker-relational-source-use-required");
    }
    const candidates = BINDING_OPERATION_IDS.flatMap(operationId => {
      if (!getBindingOperationRelationIds(operationId).includes(relationalUse.relation)) return [];
      const hostBindingFrame = issueClassicalClauseRelationBindingFrame(operationId, exactHost);
      const markerBindingFrame = issueClassicalClauseRelationBindingFrame(operationId, exactMarker);
      const hostBindingId = `${relationalUse.relation}:${relationalUse.hostRole}`;
      const markerBindingId = `${relationalUse.relation}:${relationalUse.markerRole}`;
      return isClassicalClauseRelationBindingFrame(hostBindingFrame)
        && isClassicalClauseRelationBindingFrame(markerBindingFrame)
        && hostBindingFrame.authorizationStatus === "authorized"
        && markerBindingFrame.authorizationStatus === "authorized"
        && hostBindingFrame.bindingIds.includes(hostBindingId)
        && markerBindingFrame.bindingIds.includes(markerBindingId)
        ? [{operationId, hostBindingFrame, markerBindingFrame, hostBindingId, markerBindingId}] : [];
    });
    if (candidates.length !== 1) {
      return blocked("classical-clause-marker-unique-owner-binding-required");
    }
    const frame = Object.freeze({
      kind: "classical-clause-marker-entry-projection", authorizationStatus: "authorized", blockReason: "",
      exactHost, exactMarker, relationalUse, sourceRelationalUse, relation: relationalUse.relation,
      relationProfile: relationalUse.relationProfile, degree: relationalUse.degree,
      ...candidates[0], executionAllowed: false,
    });
    issuedMarkerEntryProjections.set(frame, Object.freeze({exactHost, exactMarker, relationalUse, sourceRelationalUse, ...candidates[0]}));
    return frame;
  }

  function isClassicalClauseMarkerEntryProjection(frame = null) {
    const receipt = frame && issuedMarkerEntryProjections.get(frame);
    return Boolean(receipt && Object.isFrozen(frame)
      && frame.kind === "classical-clause-marker-entry-projection"
      && frame.authorizationStatus === "authorized" && frame.blockReason === "" && frame.executionAllowed === false
      && ["exactHost", "exactMarker", "relationalUse", "sourceRelationalUse", "operationId", "hostBindingFrame", "markerBindingFrame", "hostBindingId", "markerBindingId"]
        .every(key => frame[key] === receipt[key])
      && targetObject.getClassicalNahuatlParticleRelationalUse?.(frame.exactMarker) === receipt.sourceRelationalUse
      && (receipt.relationalUse.compositeStage !== "outer"
        || Boolean(getCompositeOuterEntryUse(frame.exactHost, frame.exactMarker)))
      && frame.relation === receipt.relationalUse.relation
      && frame.relationProfile === receipt.relationalUse.relationProfile && frame.degree === receipt.relationalUse.degree
      && isClassicalClauseRelationBindingFrame(frame.hostBindingFrame)
      && isClassicalClauseRelationBindingFrame(frame.markerBindingFrame)
      && frame.hostBindingFrame.exactResult === frame.exactHost
      && frame.markerBindingFrame.exactResult === frame.exactMarker
      && frame.hostBindingFrame.bindingIds.includes(frame.hostBindingId)
      && frame.markerBindingFrame.bindingIds.includes(frame.markerBindingId));
  }

  function isClassicalClauseRelationBindingFrame(frame = null) {
    if (
      !frame
      || !issuedBindingFrames.has(frame)
      || frame.kind !== BINDING_FRAME_KIND
      || frame.version !== BINDING_FRAME_VERSION
      || !["authorized", "blocked"].includes(frame.authorizationStatus)
      || !Array.isArray(frame.relationIds)
      || !Array.isArray(frame.bindingChoices)
      || !Array.isArray(frame.bindingIds)
      || frame.bindingIds.length !== frame.bindingChoices.length
      || frame.ownerChoicesRequired !== (frame.bindingChoices.length > 1)
      || frame.ownerAuthorizationStillRequired !== true
      || frame.sourceStringAuthority !== false
      || frame.formulaStringAuthority !== false
      || frame.surfaceStringAuthority !== false
      || frame.lessonMetadataAuthority !== false
      || frame.storedStateAuthority !== false
      || frame.grammarAuthority !== false
      || !Object.isFrozen(frame)
      || !Object.isFrozen(frame.relationIds)
      || !Object.isFrozen(frame.bindingChoices)
      || !Object.isFrozen(frame.bindingIds)
    ) {
      return false;
    }
    if (frame.authorizationStatus === "blocked") {
      return Boolean(
        frame.blockReason
        && frame.bindingChoices.length === 0
        && frame.ownerInputAcceptanceProven === false
      );
    }
    const captureValid = Boolean(
      typeof targetObject.isClassicalGrammarApplicationResultCapture
        === "function"
      && targetObject.isClassicalGrammarApplicationResultCapture(
        frame.resultCapture,
        "clause-relation-binding-source",
      )
      && frame.resultCapture.applicationResult === frame.applicationResult
      && frame.resultCapture.canonicalResult === frame.exactResult
    );
    const allowedRelations = getBindingOperationRelationIds(
      frame.operationId,
    );
    return Boolean(
      BINDING_OPERATION_IDS.includes(frame.operationId)
      && captureValid
      && frame.blockReason === ""
      && frame.exactResultIdentityPreserved === true
      && frame.ownerInputAcceptanceProven === true
      && frame.ownerRejectionProven === false
      && frame.bindingChoices.length > 0
      && frame.relationIds.every(relation => (
        allowedRelations.includes(relation)
      ))
      && frame.bindingChoices.every((choice, index) => (
        Object.isFrozen(choice)
        && choice.id === `${choice.relation}:${choice.captureRole}`
        && frame.bindingIds[index] === choice.id
        && frame.relationIds.includes(choice.relation)
        && CAPTURE_ROLES.includes(choice.captureRole)
        && getBindingRolesForRelation(choice.relation).includes(
          choice.captureRole,
        )
        && [
          RELATION_AVAILABILITY.AVAILABLE,
          RELATION_AVAILABILITY.MISSING_PREREQUISITE,
        ].includes(choice.relationEntryStatus)
        && Object.isFrozen(choice.requiredCaptureRoles)
        && Object.isFrozen(choice.missingCaptureRolesAfterBinding)
        && choice.exactResultIdentityRequired === true
        && choice.formulaStringAuthority === false
        && choice.surfaceStringAuthority === false
      ))
    );
  }

  function createClassicalClauseRelationController() {
    const captures = new Map();
    const discourseSourceContextFrames = new Map();
    let conjunctionEllipsisPreview = null;
    let conjunctionReadinessPreview = null;
    let supplementationReadinessPreview = null;
    let complementReadinessPreview = null;
    let adjunctionReadinessPreview = null;
    const issuedRelationAvailabilityContracts = new WeakSet();
    let captureRevision = 0;
    let choiceRevision = 0;
    const issuedChoiceFrames = new WeakMap();
    const choiceSignature = selections => JSON.stringify(Object.entries(selections || {}).sort(([a],[b])=>a.localeCompare(b)));
    function isCurrentChoiceFrame(frame, selections) {
      const receipt = frame && issuedChoiceFrames.get(frame);
      return !!receipt && receipt.captureRevision === captureRevision
        && receipt.choiceRevision === choiceRevision && receipt.signature === choiceSignature(selections);
    }
    function transitionComparisonChoice({selections = {}, expectedFrame = null, intent = {}} = {}) {
      const current = selections.relation === "comparison" && isCurrentComparisonRoute(selections.comparisonRoute);
      const entering = selections.relation === "comparison" && intent.type === "set-choice"
        && intent.key === "comparisonRoute" && isCurrentComparisonRoute(intent.value);
      const blocked = reason => Object.freeze({handled:true, authorizationStatus:"blocked", blockReason:reason,
        selections, contract:buildDecisionContract(selections)});
      // An old pilot control must never fall through into an unrelated legacy handler.
      if (expectedFrame && (!current || !isCurrentChoiceFrame(expectedFrame, selections)))
        return blocked("comparison-choice-stale-frame");
      if (!current && !entering) return Object.freeze({handled:false});
      if (current && !expectedFrame) return blocked("comparison-choice-stale-frame");
      let next = {...selections};
      if (intent.type === "set-choice") {
        const domain = getCurrentComparisonOwnerContract(selections.comparisonRoute, selections);
        const fields = [...(domain?.decisions || []), ...(domain?.facts || [])].map(d=>d.key);
        if (intent.key !== "comparisonRoute" && !fields.includes(intent.key)) return blocked("comparison-choice-field-not-licensed");
        if (intent.key === "comparisonRoute" && !getComparisonRouteInventory().some(route=>route.id===intent.value))
          return blocked("comparison-choice-route-not-licensed");
        if (intent.key === "continuationFamily" && intent.value !== selections.continuationFamily
          && ["bare", "absolutive-tl", "absolutive-tli", "absolutive-li"].includes(intent.value)) {
          delete next.reduplicationShape;
          delete next.tiClass;
        }
        if (intent.value) next[intent.key] = String(intent.value).trim();
        else delete next[intent.key];
      } else if (intent.type === "clear-capture" || intent.type === "capture") {
        if (!Object.hasOwn(COMPARISON_CAPTURE_SLOT_LAYOUTS[selections.comparisonRoute] || {}, intent.role))
          return blocked("comparison-choice-capture-role-not-licensed");
        if (intent.type === "clear-capture") clearCapture(intent.role);
        else {
          // Comparison admission precedes mutation of generic clause capture.
          const source = targetObject.buildClassicalComparisonSourceUnit?.({sourceResult:intent.result});
          if (targetObject.isClassicalComparisonSourceUnit?.(source) !== true || source.authorizationStatus !== "authorized")
            return blocked(source?.blockReason || "comparison-owner-issued-source-required");
          const capture = captureCurrentResult(intent.role, intent.result, intent.context);
          if (capture.authorizationStatus !== "authorized") return blocked(capture.blockReason);
        }
      } else return blocked("comparison-choice-intent-not-recognized");
      choiceRevision += 1;
      const selected = Object.freeze(next);
      return Object.freeze({handled:true, authorizationStatus:"authorized", selections:selected,
        contract:buildDecisionContract(selected)});
    }

    function transitionConjunctionChoice({selections={},expectedFrame=null,intent={}}={}) {
      const current=["conjunction","correlative-conjunction","lexical-conjunction","parallel-structure"].includes(selections.relation);
      if(!current && !["conjunction","correlative-conjunction","lexical-conjunction","parallel-structure"].includes(expectedFrame?.familyId)) return Object.freeze({handled:false});
      const blocked=reason=>Object.freeze({handled:true,authorizationStatus:"blocked",blockReason:reason,selections,contract:buildDecisionContract(selections)});
      if(!current || !isCurrentChoiceFrame(expectedFrame,selections)) return blocked("conjunction-choice-stale-frame");
      const next={...selections};
      if(intent.type === "set-choice") {
        if(!expectedFrame.decisions.some(d=>(d.key || d.id.replace(/-([a-z])/gu,(_,letter)=>letter.toUpperCase())) === intent.key)) return blocked("conjunction-choice-field-not-licensed");
        if(intent.value) next[intent.key]=String(intent.value).trim(); else delete next[intent.key];
      } else if(intent.type === "clear-capture" || intent.type === "capture") {
        if(!CAPTURE_ROLES.includes(intent.role)) return blocked("conjunction-choice-capture-role-not-licensed");
        if(intent.type === "clear-capture") clearCapture(intent.role);
        else {
          const capture=captureCurrentResult(intent.role,intent.result,intent.context);
          if(capture.authorizationStatus !== "authorized") return blocked(capture.blockReason);
        }
      } else return blocked("conjunction-choice-intent-not-recognized");
      choiceRevision += 1;
      return Object.freeze({handled:true,authorizationStatus:"authorized",selections:Object.freeze(next),contract:buildDecisionContract(next)});
    }

    function transitionSentenceChoice({selections={},expectedFrame=null,intent={}}={}) {
      const current=["rumored-report","deleted-principal"].includes(selections.relation);
      if(!current && !["rumored-report","deleted-principal"].includes(expectedFrame?.familyId)) return Object.freeze({handled:false});
      const blocked=reason=>Object.freeze({handled:true,authorizationStatus:"blocked",blockReason:reason,selections,contract:buildDecisionContract(selections)});
      if(!current || !isCurrentChoiceFrame(expectedFrame,selections)) return blocked("sentence-choice-stale-frame");
      const next={...selections};
      if(intent.type === "set-choice") {
        if(!expectedFrame.decisions.some(d=>(d.key || (d.id === "rumor-mach" ? "mach" : d.id.replace(/-([a-z])/gu,(_,letter)=>letter.toUpperCase()))) === intent.key)) return blocked("sentence-choice-field-not-licensed");
        if(intent.value) next[intent.key]=String(intent.value).trim(); else delete next[intent.key];
      } else if(intent.type === "clear-capture" || intent.type === "capture") {
        if(!CAPTURE_ROLES.includes(intent.role)) return blocked("sentence-choice-capture-role-not-licensed");
        if(intent.type === "clear-capture") clearCapture(intent.role);
        else {
          const capture=captureCurrentResult(intent.role,intent.result,intent.context);
          if(capture.authorizationStatus !== "authorized") return blocked(capture.blockReason);
        }
      } else return blocked("sentence-choice-intent-not-recognized");
      choiceRevision += 1;
      return Object.freeze({handled:true,authorizationStatus:"authorized",selections:Object.freeze(next),contract:buildDecisionContract(next)});
    }

    function validateRole(role = "") {
      const normalizedRole = normalizeToken(role);
      return CAPTURE_ROLES.includes(normalizedRole) ? normalizedRole : "";
    }

    function captureCurrentResult(
      role = "",
      applicationResult = null,
      discourseSourceContextFrame = null,
    ) {
      const normalizedRole = validateRole(role);
      if (!normalizedRole) {
        return Object.freeze({
          authorizationStatus: "blocked",
          blockReason: "classical-clause-relation-capture-role-not-recognized",
          role: "",
        });
      }
      if (
        typeof targetObject.captureClassicalGrammarApplicationResult !== "function"
        || typeof targetObject.isClassicalGrammarApplicationResultCapture !== "function"
      ) {
        return Object.freeze({
          authorizationStatus: "blocked",
          blockReason: "classical-grammar-application-result-capture-capability-required",
          role: normalizedRole,
        });
      }
      const capture = targetObject.captureClassicalGrammarApplicationResult(
        applicationResult,
        normalizedRole,
      );
      if (
        !targetObject.isClassicalGrammarApplicationResultCapture(
          capture,
          normalizedRole,
        )
      ) {
        return Object.freeze({
          authorizationStatus: "blocked",
          blockReason: capture?.blockReason
            || "classical-grammar-application-issued-authorized-result-required",
          role: normalizedRole,
        });
      }
      const sourceUnit = typeof targetObject.getCanonicalAdverbialAdjunctionSourceUnit === "function"
        ? targetObject.getCanonicalAdverbialAdjunctionSourceUnit(
          capture.canonicalResult,
          normalizedRole,
        )
        : null;
      if (!sourceUnit?.ok) {
        return Object.freeze({
          authorizationStatus: "blocked",
          blockReason: "classical-clause-relation-canonical-clause-result-required",
          role: normalizedRole,
        });
      }
      if (
        normalizedRole === "marker"
        && sourceUnit.features?.unitKind !== "particle"
      ) {
        return Object.freeze({
          authorizationStatus: "blocked",
          blockReason: "classical-clause-relation-marker-result-must-be-particle",
          role: normalizedRole,
        });
      }
      if (
        discourseSourceContextFrame
        && (
          typeof targetObject
            .isClassicalNahuatlDiscourseSourceContextFrame !== "function"
          || !targetObject.isClassicalNahuatlDiscourseSourceContextFrame(
            discourseSourceContextFrame
          )
        )
      ) {
        return Object.freeze({
          authorizationStatus: "blocked",
          blockReason:
            "classical-clause-relation-owner-issued-discourse-source-context-required",
          role: normalizedRole,
        });
      }
      captures.set(normalizedRole, capture);
      if (discourseSourceContextFrame) {
        discourseSourceContextFrames.set(
          normalizedRole,
          discourseSourceContextFrame,
        );
      } else {
        discourseSourceContextFrames.delete(normalizedRole);
      }
      captureRevision += 1;
      return Object.freeze({
        authorizationStatus: "authorized",
        blockReason: "",
        role: normalizedRole,
        operationId: capture.operationId,
        sourceKind: sourceUnit.sourceKind,
        unitType: sourceUnit.features?.unitKind || "",
        ownerIssuedResultSourcePresent: true,
        discourseSourceContextFramePresent: Boolean(
          discourseSourceContextFrame
        ),
        surface: sourceUnit.surface,
        surfaceStringAuthority: false,
      });
    }

    function issueDiscourseSourceContextFrame(
      sourceConstituents = {},
    ) {
      if (
        !sourceConstituents
        || typeof sourceConstituents !== "object"
        || Array.isArray(sourceConstituents)
        || typeof targetObject
          .buildClassicalNahuatlDiscourseSourceContextFrame !== "function"
        || typeof targetObject
          .isClassicalNahuatlDiscourseSourceContextFrame !== "function"
      ) {
        return null;
      }
      const allowedFields = new Set([
        "speakerGender",
        "speakerGroupMembership",
        "namedPartnerKnownParticipant",
      ]);
      if (
        Object.keys(sourceConstituents).some(
          field => !allowedFields.has(field),
        )
      ) {
        return null;
      }
      const frame =
        targetObject.buildClassicalNahuatlDiscourseSourceContextFrame({
          speakerGender:
            sourceConstituents.speakerGender || "unspecified",
          speakerGroupMembership:
            sourceConstituents.speakerGroupMembership || "unspecified",
          namedPartnerKnownParticipant:
            sourceConstituents.namedPartnerKnownParticipant || "none",
        });
      return targetObject.isClassicalNahuatlDiscourseSourceContextFrame(
        frame,
      ) ? frame : null;
    }

    function clearCapture(role = "") {
      const normalizedRole = validateRole(role);
      if (!normalizedRole) return false;
      discourseSourceContextFrames.delete(normalizedRole);
      const removed = captures.delete(normalizedRole);
      if (removed) captureRevision += 1;
      return removed;
    }

    function getValidatedCapture(role = "") {
      const capture = captures.get(role) || null;
      return (
        capture
        && typeof targetObject.isClassicalGrammarApplicationResultCapture === "function"
        && targetObject.isClassicalGrammarApplicationResultCapture(capture, role)
      ) ? capture : null;
    }

    function getSourceUnit(role = "") {
      const capture = getValidatedCapture(role);
      return capture
        && typeof targetObject.getCanonicalAdverbialAdjunctionSourceUnit === "function"
        ? targetObject.getCanonicalAdverbialAdjunctionSourceUnit(
          capture.canonicalResult,
          role,
        )
        : null;
    }

    function getDiscourseSourceContextFrame(role = "") {
      const frame = getValidatedCapture(role)
        ? discourseSourceContextFrames.get(role) || null
        : null;
      return (
        frame
        && typeof targetObject
          .isClassicalNahuatlDiscourseSourceContextFrame === "function"
        && targetObject.isClassicalNahuatlDiscourseSourceContextFrame(frame)
      ) ? frame : null;
    }

    function continueCapturedIntervener(role = "adjoined") {
      const result = getValidatedCapture(role)?.canonicalResult;
      const intervener = targetObject.getClassicalSupplementationIntervenerSource?.(result);
      if (!intervener) return false;
      const supplement = captureCurrentResult("adjoined", result);
      if (supplement.authorizationStatus !== "authorized") return false;
      return captureCurrentResult("principal", intervener).authorizationStatus === "authorized";
    }

    function getNestedPossessorContacts() {
      const root = getCapturedSupplementationContinuation("principal");
      const clauses = [];
      const seen = new Set();
      const visit = frame => {
        if (!frame || seen.has(frame)
          || targetObject.isClassicalNahuatlSupplementationFrame?.(frame) !== true) return;
        seen.add(frame);
        for (const clause of [frame.principalClause, frame.supplementClause]) {
          if (clause?.possessor && !clauses.includes(clause)) clauses.push(clause);
        }
        for (const child of [...(frame.principalContinuationFrames || []),
          ...(frame.supplementContinuationFrames || [])]) visit(child);
      };
      visit(root);
      return clauses;
    }

    function getState() {
      const captureState = {};
      CAPTURE_ROLES.forEach(role => {
        const capture = getValidatedCapture(role);
        const sourceUnit = getSourceUnit(role);
        captureState[role] = Object.freeze({
          captured: Boolean(capture && sourceUnit?.ok),
          operationId: capture?.operationId || "",
          sourceKind: sourceUnit?.sourceKind || "",
          unitType: sourceUnit?.features?.unitKind || "",
          ownerIssuedResultSourcePresent: Boolean(capture?.canonicalResult),
          canContinueIntervener: Boolean(targetObject.getClassicalSupplementationIntervenerSource?.(capture?.canonicalResult)),
          discourseSourceContextFramePresent: Boolean(
            getDiscourseSourceContextFrame(role)
          ),
          discourseSourceContext: getDiscourseSourceContextFrame(role)
            ? Object.freeze({
                speakerGender:
                  getDiscourseSourceContextFrame(role).speakerGender,
                speakerGroupMembership:
                  getDiscourseSourceContextFrame(role)
                    .speakerGroupMembership,
                namedPartnerKnownParticipant:
                  getDiscourseSourceContextFrame(role)
                    .namedPartnerKnownParticipant,
                grammarOperationAuthority: false,
              })
            : null,
          surface: sourceUnit?.surface || "",
          surfaceStringAuthority: false,
        });
      });
      return Object.freeze({
        kind: CONTROLLER_KIND,
        version: CONTROLLER_VERSION,
        captures: Object.freeze(captureState),
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        lessonMetadataAuthority: false,
        storedStateAuthority: false,
      });
    }

    function applyBindingFrame(
      bindingFrame = null,
      bindingId = "",
      discourseSourceContextFrame = null,
    ) {
      const normalizedBindingId = String(bindingId || "").trim();
      const frameValid = isClassicalClauseRelationBindingFrame(
        bindingFrame,
      );
      const bindingChoice = frameValid
        ? bindingFrame.bindingChoices.find(
          choice => choice.id === normalizedBindingId,
        ) || null
        : null;
      const blocked = (blockReason, recoveryCaptureRoles = []) => Object.freeze({
        recoveryCaptureRoles: Object.freeze(recoveryCaptureRoles),
        kind: BINDING_APPLICATION_KIND,
        version: BINDING_FRAME_VERSION,
        authorizationStatus: "blocked",
        blockReason,
        bindingFrame: frameValid ? bindingFrame : null,
        bindingChoice: null,
        bindingId: normalizedBindingId,
        operationId: frameValid ? bindingFrame.operationId : "",
        relation: bindingChoice?.relation || "",
        captureRole: bindingChoice?.captureRole || "",
        captureResult: null,
        relationAvailabilityContract: null,
        decisionContract: null,
        missingCaptureRoles: Object.freeze([]),
        unresolvedDecisionIds: Object.freeze([]),
        controllerState: getState(),
        exactResultIdentityPreserved: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        storedStateAuthority: false,
        grammarAuthority: false,
      });
      if (!frameValid) {
        return blocked(
          "classical-clause-relation-owner-issued-binding-frame-required",
        );
      }
      if (bindingFrame.authorizationStatus !== "authorized") {
        return blocked(
          bindingFrame.blockReason
          || "classical-clause-relation-authorized-binding-frame-required",
        );
      }
      if (!bindingChoice) {
        return blocked(
          "classical-clause-relation-binding-choice-not-recognized",
        );
      }

      const probe = createClassicalClauseRelationController();
      for (const role of CAPTURE_ROLES) {
        const existingCapture = getValidatedCapture(role);
        if (!existingCapture) continue;
        const existingProbeCapture = probe.captureCurrentResult(
          role,
          existingCapture.canonicalResult,
          getDiscourseSourceContextFrame(role),
        );
        if (existingProbeCapture.authorizationStatus !== "authorized") {
          return blocked(
            existingProbeCapture.blockReason
            || "classical-clause-relation-existing-capture-invalid",
          );
        }
      }
      const prospectiveCapture = probe.captureCurrentResult(
        bindingChoice.captureRole,
        bindingFrame.exactResult,
        discourseSourceContextFrame,
      );
      if (prospectiveCapture.authorizationStatus !== "authorized") {
        return blocked(prospectiveCapture.blockReason);
      }
      const prospectiveAvailability =
        probe.issueRelationAvailabilityContract();
      const prospectiveOption = prospectiveAvailability.relations.find(
        option => option.value === bindingChoice.relation,
      ) || null;
      if (
        !prospectiveOption
        || prospectiveOption.status === RELATION_AVAILABILITY.INCOMPATIBLE
      ) {
        // Identify a recoverable occupied slot without changing live captures.
        const recoveryCaptureRoles = CAPTURE_ROLES.filter(role => {
          if (role === bindingChoice.captureRole || !getValidatedCapture(role)) return false;
          const recoveryProbe = createClassicalClauseRelationController();
          for (const peer of CAPTURE_ROLES) {
            const capture = probe.getState().captures[peer];
            if (peer === role || !capture?.captured) continue;
            const exact = peer === bindingChoice.captureRole
              ? bindingFrame.exactResult : getValidatedCapture(peer)?.canonicalResult;
            if (exact) recoveryProbe.captureCurrentResult(peer, exact,
              peer === bindingChoice.captureRole ? discourseSourceContextFrame : getDiscourseSourceContextFrame(peer));
          }
          const option = recoveryProbe.issueRelationAvailabilityContract().relations
            .find(item => item.value === bindingChoice.relation);
          return option && option.status !== RELATION_AVAILABILITY.INCOMPATIBLE;
        });
        return blocked(
          prospectiveOption?.reasonCode
          || "classical-clause-relation-binding-incompatible-with-current-captures",
          recoveryCaptureRoles,
        );
      }

      const captureResult = captureCurrentResult(
        bindingChoice.captureRole,
        bindingFrame.exactResult,
        discourseSourceContextFrame,
      );
      if (captureResult.authorizationStatus !== "authorized") {
        return blocked(captureResult.blockReason);
      }
      const relationAvailabilityContract =
        issueRelationAvailabilityContract();
      const relationOption = relationAvailabilityContract.relations.find(
        option => option.value === bindingChoice.relation,
      ) || null;
      const decisionContract = buildDecisionContract({
        relation: bindingChoice.relation,
      });
      return Object.freeze({
        kind: BINDING_APPLICATION_KIND,
        version: BINDING_FRAME_VERSION,
        authorizationStatus: "authorized",
        blockReason: "",
        bindingFrame,
        bindingChoice,
        bindingId: normalizedBindingId,
        operationId: bindingFrame.operationId,
        relation: bindingChoice.relation,
        captureRole: bindingChoice.captureRole,
        captureResult,
        relationAvailabilityContract,
        decisionContract,
        operationReadinessStatus: decisionContract.authorizationStatus,
        missingCaptureRoles: relationOption?.missingCaptureRoles
          || Object.freeze([]),
        unresolvedDecisionIds: decisionContract.unresolvedDecisionIds,
        controllerState: getState(),
        exactResultIdentityPreserved:
          bindingFrame.exactResult === bindingFrame.resultCapture.canonicalResult,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        storedStateAuthority: false,
        grammarAuthority: false,
      });
    }

    function getComparisonRouteInventory() {
      return typeof targetObject.getClassicalComparisonRouteInventory
        === "function"
        ? targetObject.getClassicalComparisonRouteInventory()
        : [];
    }

    function isCurrentComparisonRoute(routeId) {
      return getComparisonRouteInventory().some(route => route.id === routeId);
    }
    function getCurrentComparisonOwnerContract(routeId, choices = {}) {
      const capture = getValidatedCapture("principal");
      const source = capture ? targetObject.buildClassicalComparisonSourceUnit?.({sourceResult:capture.canonicalResult}) : null;
      const presentSlots = Object.entries(COMPARISON_CAPTURE_SLOT_LAYOUTS[routeId] || {})
        .filter(([role]) => !!getValidatedCapture(role)).map(([,slot]) => slot);
      return targetObject.getClassicalComparisonChoiceContract?.(routeId, choices, source, presentSlots);
    }

    function buildNewRelationContract({
      selectionObject,
      relation,
      decisions,
      diagnostics,
      derived,
      operationSelections = {},
      derivedFieldIds = [],
    }) {
      const unresolvedDecisionIds = decisions
        .filter(decision => decision.required && !decision.resolved)
        .map(decision => decision.id);
      if (unresolvedDecisionIds.length) {
        diagnostics.push(
          `classical-clause-relation-decision-required:${unresolvedDecisionIds[0]}`,
        );
      }
      return Object.freeze({
        kind: "classical-clause-relation-decision-contract",
        version: CONTROLLER_VERSION,
        authorizationStatus: diagnostics.length ? "blocked" : "authorized",
        blockReason: diagnostics[0] || "",
        diagnostics: freezeArray(unique(diagnostics)),
        decisions: freezeArray(decisions),
        unresolvedDecisionIds: freezeArray(unresolvedDecisionIds),
        relation,
        degree: "",
        relationProfile: "",
        structureProfile: "",
        markerProfile: "unmarked",
        topology: "",
        operationSelections: Object.freeze({ ...operationSelections }),
        derived: Object.freeze(derived),
        userSelectableFieldIds: freezeArray(
          decisions.map(decision => decision.id),
        ),
        derivedFieldIds: freezeArray(derivedFieldIds),
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        lessonMetadataAuthority: false,
        storedStateAuthority: false,
        sourceConstituentAuthority: "captured-owner-issued-typed-results",
        sourceStringAuthority: false,
      });
    }

    function requireCapturedSource(
      role = "",
      diagnostics = [],
      {
        diagnosticPrefix = "classical-clause-relation",
      } = {},
    ) {
      const capture = getValidatedCapture(role);
      const sourceUnit = getSourceUnit(role);
      if (!capture || !sourceUnit?.ok) {
        diagnostics.push(`${diagnosticPrefix}-${role}-capture-required`);
        return false;
      }
      return true;
    }

    function buildComplementDecisionContract({
      selectionObject,
      relation,
      decisions,
      diagnostics,
    }) {
      requireCapturedSource("principal", diagnostics, {
        diagnosticPrefix: "classical-complement",
      });
      requireCapturedSource("adjoined", diagnostics, {
        diagnosticPrefix: "classical-complement",
      });
      const semanticValues = COMPLEMENT_SEMANTIC_CATEGORIES[relation] || [];
      const requestedSemanticCategory = normalizeToken(
        selectionObject.semanticCategory,
      );
      const semanticCategory = semanticValues.includes(
        requestedSemanticCategory,
      )
        ? requestedSemanticCategory
        : "";
      decisions.push(buildDecision({
        id: "semantic-category",
        values: semanticValues,
        selectedValue: semanticCategory,
        reason: "the complement relation selects a licensed semantic family",
      }));
      if (requestedSemanticCategory && !semanticCategory) {
        diagnostics.push("classical-complement-semantic-category-not-licensed");
      }
      const requestedOrder = normalizeToken(selectionObject.complementOrder);
      const complementOrder = COMPLEMENT_ORDERS.includes(requestedOrder)
        ? requestedOrder
        : "";
      const complementOrderDecisionIndex = decisions.length;
      decisions.push(buildDecision({
        id: "complement-order",
        values: COMPLEMENT_ORDERS,
        selectedValue: complementOrder,
        reason: "the captured principal and complement permit these orders",
        optionAvailability: COMPLEMENT_ORDERS.map(value => ({
          value,
          status: value === "discontinuous"
            ? RELATION_AVAILABILITY.INCOMPATIBLE : RELATION_AVAILABILITY.AVAILABLE,
          reasonCode: value === "discontinuous"
            ? "discontinuous-complement-topology-not-supported" : "",
          recovery: value === "discontinuous"
            ? "This complement interruption topology is not implemented." : "",
        })),
      }));
      if (requestedOrder && !complementOrder) {
        diagnostics.push("classical-complement-order-not-licensed");
      }
      const operationSelections = {
        semanticCategory,
        order: complementOrder,
      };
      if (relation === "object-complement") {
        const requestedLinkKind = normalizeToken(selectionObject.linkKind);
        const linkKind = OBJECT_COMPLEMENT_LINK_KINDS.includes(
          requestedLinkKind,
        )
          ? requestedLinkKind
          : "";
        decisions.push(buildDecision({
          id: "link-kind",
          values: OBJECT_COMPLEMENT_LINK_KINDS,
          selectedValue: linkKind,
          reason: "the complement subject contacts a typed object or possessor",
        }));
        const requestedDesignationStructure = normalizeToken(
          selectionObject.designationStructure,
        );
        const designationStructure =
          OBJECT_COMPLEMENT_DESIGNATION_STRUCTURES.includes(
            requestedDesignationStructure,
          )
            ? requestedDesignationStructure
            : "";
        decisions.push(buildDecision({
          id: "designation-structure",
          values: OBJECT_COMPLEMENT_DESIGNATION_STRUCTURES,
          selectedValue: designationStructure,
          reason: "designation distinguishes its licensed typed structures",
        }));
        if (requestedLinkKind && !linkKind) {
          diagnostics.push("classical-complement-link-kind-not-licensed");
        }
        if (requestedDesignationStructure && !designationStructure) {
          diagnostics.push(
            "classical-complement-designation-structure-not-licensed",
          );
        }
        if (
          designationStructure !== "ordinary-object-complement"
          && semanticCategory
          && semanticCategory !== "designation"
        ) {
          diagnostics.push(
            "classical-complement-special-designation-requires-designation-semantics",
          );
        }
        if (
          designationStructure
            === "tla-locative-supplement-plus-place-name"
        ) {
          requireCapturedSource("dependent", diagnostics, {
            diagnosticPrefix: "classical-complement",
          });
        }
        operationSelections.linkKind = linkKind;
        operationSelections.designationStructure = designationStructure;
        if (linkKind === "object-subject") {
          const principalPreview = buildCapturedClauseCompositionSourceFrame(
            "principal",
            {
              referenceId: "principal-subject",
              subjectReferenceId: "principal-subject",
              objectReferenceId: "complement-contact",
              possessorReferenceId: "principal-possessor",
            },
          );
          const principalObjectIds = Array.from(
            principalPreview?.objects || [],
          ).map(object => String(object?.id || "").trim()).filter(Boolean);
          const requestedPrincipalObjectId = String(
            selectionObject.principalObjectId || "",
          ).trim();
          if (principalObjectIds.length === 1) {
            operationSelections.principalObjectId = principalObjectIds[0];
            if (
              requestedPrincipalObjectId
              && requestedPrincipalObjectId !== principalObjectIds[0]
            ) {
              diagnostics.push(
                "classical-complement-principal-object-id-does-not-match-derived-object",
              );
            }
          } else if (principalObjectIds.length > 1) {
            const principalObjectId = principalObjectIds.includes(
              requestedPrincipalObjectId,
            )
              ? requestedPrincipalObjectId
              : "";
            decisions.push(buildDecision({
              id: "principal-object-id",
              values: principalObjectIds,
              selectedValue: principalObjectId,
              reason:
                "the principal typed Source has multiple objects, so the complement contact is a genuine selection",
            }));
            if (
              requestedPrincipalObjectId
              && !principalObjectId
            ) {
              diagnostics.push(
                "classical-complement-principal-object-id-not-owned-by-source",
              );
            }
            operationSelections.principalObjectId = principalObjectId;
          } else {
            diagnostics.push(
              "classical-complement-principal-object-required",
            );
          }
        }
      } else if (relation === "subject-complement") {
        const requestedContactKind = normalizeToken(
          selectionObject.contactKind,
        );
        const contactKind = SUBJECT_COMPLEMENT_CONTACT_KINDS.includes(
          requestedContactKind,
        )
          ? requestedContactKind
          : "";
        decisions.push(buildDecision({
          id: "contact-kind",
          values: SUBJECT_COMPLEMENT_CONTACT_KINDS,
          selectedValue: contactKind,
          reason: "the typed complement selects its subject or possessor contact",
        }));
        if (requestedContactKind && !contactKind) {
          diagnostics.push("classical-complement-contact-kind-not-licensed");
        }
        operationSelections.contactKind = contactKind;
      } else if (
        relation === "adverbial-complement"
        && semanticCategory === "relational-lexicalized"
      ) {
        const requestedPair = normalizeToken(selectionObject.relationalPairId);
        const relationalPairId = RELATIONAL_COMPLEMENT_PAIRS.includes(
          requestedPair,
        )
          ? requestedPair
          : "";
        decisions.push(buildDecision({
          id: "relational-pair",
          values: RELATIONAL_COMPLEMENT_PAIRS,
          selectedValue: relationalPairId,
          reason: "lexicalized relational complements require their typed pair",
        }));
        if (requestedPair && !relationalPairId) {
          diagnostics.push("classical-complement-relational-pair-not-licensed");
        }
        operationSelections.relationalPairId = relationalPairId;
      }
      const principalResult = getValidatedCapture("principal")?.canonicalResult;
      const complementResult = getValidatedCapture("adjoined")?.canonicalResult;
      const sharedIntervener = principalResult
        && targetObject.isClassicalNahuatlResultFrame?.(complementResult) === true
        && complementResult.operationKind === "adjectival-modification"
        && complementResult.topology === "discontinuous"
        && targetObject.getClassicalSupplementationIntervenerSource?.(complementResult) === principalResult;
      const discontinuousPreview = sharedIntervener
        ? targetObject.evaluateClassicalNahuatlClauseComplementation?.({
            operationKind: relation,
            ...buildComplementSourceFrames({derived: {operationKind: relation}, operationSelections}),
            options: {...operationSelections, order: "discontinuous"},
          }) : null;
      const discontinuousAvailable = discontinuousPreview?.authorizationStatus === "authorized"
        && targetObject.isClassicalNahuatlClauseComplementationResultFrame?.(discontinuousPreview) === true;
      const discontinuousReason = discontinuousPreview?.blockReason || "discontinuous-complement-topology-not-supported";
      decisions[complementOrderDecisionIndex] = buildDecision({
        id: "complement-order", values: COMPLEMENT_ORDERS, selectedValue: complementOrder,
        reason: "the captured principal and complement permit these orders",
        optionAvailability: COMPLEMENT_ORDERS.map(value => ({
          value,
          status: value === "discontinuous" && !discontinuousAvailable
            ? RELATION_AVAILABILITY.INCOMPATIBLE : RELATION_AVAILABILITY.AVAILABLE,
          reasonCode: value === "discontinuous" && !discontinuousAvailable ? discontinuousReason : "",
          recovery: value === "discontinuous" && !discontinuousAvailable
            ? "Use an authentic complementary whole with this same principal as its single intervener and a licensed complement contact." : "",
        })),
      });
      if (complementOrder === "discontinuous" && !discontinuousAvailable) diagnostics.push(discontinuousReason);
      if (!diagnostics.length
        && decisions.every(decision => !decision.required || decision.resolved)) {
        // Individually available choices do not license their combination.
        // The same exact-source owner used by Make decides readiness, including
        // semantic predicate eligibility and contact agreement (Andrews §51).
        const key = `${relation}:${captureRevision}:${JSON.stringify(operationSelections)}`;
        if (complementReadinessPreview?.key !== key) {
          const sourceFrames = buildComplementSourceFrames({
            derived: { operationKind: relation }, operationSelections,
          });
          const preview = targetObject.evaluateClassicalNahuatlClauseComplementation?.({
            operationKind: relation, ...sourceFrames, options: operationSelections,
          });
          const valid = targetObject.isClassicalNahuatlClauseComplementationResultFrame?.(preview) === true;
          complementReadinessPreview = {key, failure: valid && preview.authorizationStatus === "authorized"
            ? "" : preview?.blockReason || "classical-complement-current-owner-required"};
        }
        if (complementReadinessPreview.failure) diagnostics.push(complementReadinessPreview.failure);
      }
      return buildNewRelationContract({
        selectionObject,
        relation,
        decisions,
        diagnostics,
        derived: {
          operationFamily: "complement",
          operationKind: relation,
          principalSourceKind: getSourceUnit("principal")?.sourceKind || "",
          complementSourceKind: getSourceUnit("adjoined")?.sourceKind || "",
          auxiliaryRequired:
            operationSelections.designationStructure
              === "tla-locative-supplement-plus-place-name",
          passiveTransform:
            semanticCategory === "passive-object-complement-transform",
          referenceGraph: relation === "object-complement"
            ? operationSelections.linkKind
            : relation === "subject-complement"
              ? operationSelections.contactKind
              : ["coverage", "relational-lexicalized"].includes(
                semanticCategory,
              )
                ? "lexically-governed"
                : "shared-subject",
          principalObjectIdDerived:
            relation === "object-complement"
            && operationSelections.linkKind === "object-subject"
            && !decisions.some(
              decision => decision.id === "principal-object-id",
            )
              ? operationSelections.principalObjectId || ""
              : "",
        },
        operationSelections,
        derivedFieldIds: [
          "operation-family",
          "operation-kind",
          "principal-source-kind",
          "complement-source-kind",
          "auxiliary-required",
          "passive-transform",
          "reference-graph",
          "principal-object-id-derived",
        ],
      });
    }

    function buildConjunctionDecisionContract({
      selectionObject,
      relation,
      decisions,
      diagnostics,
    }) {
      const operationSelections = {};
      let ownerFacts = [];
      if (relation === "conjunction") {
        const ownerChoices = targetObject.getClassicalConjunctionChoiceContract?.(selectionObject);
        if (!ownerChoices) diagnostics.push("conjunction-choice-owner-capability-required");
        const selected = {};
        for (const domain of ownerChoices?.decisions || []) {
          const requestedValue = normalizeToken(selectionObject[domain.key] || (domain.key === "sharedModifier" ? "none" : ""));
          const decision = buildDecision({...domain, selectedValue:requestedValue,
            reason:"Choice licensed by the canonical conjunction owner"});
          decisions.push(Object.freeze({...decision,key:domain.key,requestedValue,
            responsibility:"user",selectionOrigin:selectionObject[domain.key]?"explicit-user":"application-default",
            sourceReference:domain.sourceReference}));
          selected[domain.key] = decision.selectedValue;
          const unavailable=decision.optionAvailability?.find(option=>option.value===requestedValue && option.status!==RELATION_AVAILABILITY.AVAILABLE);
          if(unavailable?.reasonCode) diagnostics.push(unavailable.reasonCode);
        }
        const {coordinationRelation,coordinationType,clauseLevel:level,polarity,leftContext,
          rightwardModifier,modifierAdjunctor,sharedModifierScope,sharedModifier,adjoinedFunction} = selected;
        requireCapturedSource("principal", diagnostics, {diagnosticPrefix:"classical-conjunction"});
        if(leftContext !== "absent") requireCapturedSource("adjoined", diagnostics, {diagnosticPrefix:"classical-conjunction"});
        Object.assign(operationSelections, {
          relation: coordinationRelation,
          coordinationType,
          level,
          polarity,
          rightwardModifier: rightwardModifier === "none"
            ? ""
            : rightwardModifier,
          modifierAdjunctor,
          sharedModifierScope,
          sharedModifier,
          leftContextAbsent: leftContext === "absent",
          // §52.3 permits this uncommon structure. Markedness and clause rank
          // already express the user's choice; no second license is needed.
          markedAdjoinedException:
            coordinationRelation === "marked" && level === "adjoined",
          adjoinedFunction,
        });
        const contextRoles = ["principal", "adjoined", "dependent"].filter(role => getValidatedCapture(role));
        const contextEnvelopes = contextRoles.map(role => buildCapturedSupplementationEnvelope(role,
          {referenceId: "conjunction-first-person", subjectReferenceId: "conjunction-first-person"}, true));
        const contextualFirstPersonAvailable = leftContext === "present" && contextEnvelopes.length > 1
          && contextEnvelopes.every(envelope => envelope?.unitKind === "vnc")
          && contextEnvelopes.slice(1).every(envelope =>
            targetObject.buildClassicalNahuatlConcatenatedFirstPersonProjection?.(contextEnvelopes[0], envelope));
        const requestedFirstPerson = normalizeToken(selectionObject.contextualSilentFirstPerson || "absent");
        if (!["absent", "present"].includes(requestedFirstPerson)
          || requestedFirstPerson === "present" && !contextualFirstPersonAvailable) {
          diagnostics.push("conjunction-contextual-first-person-not-licensed");
        }
        if (contextualFirstPersonAvailable || requestedFirstPerson !== "absent") decisions.push(buildDecision({
          id: "contextual-silent-first-person", values: ["absent", "present"], selectedValue: requestedFirstPerson,
          optionAvailability:[{value:"absent",status:RELATION_AVAILABILITY.AVAILABLE},{value:"present",status:contextualFirstPersonAvailable?RELATION_AVAILABILITY.AVAILABLE:RELATION_AVAILABILITY.INCOMPATIBLE,reasonCode:contextualFirstPersonAvailable?"":"conjunction-contextual-first-person-not-licensed"}],
          reason: "later VNCs with the same first-person referent may silence pers1 after the sounded first VNC"}));
        operationSelections.contextualSilentFirstPerson = requestedFirstPerson === "present";
        const ellipsis = normalizeToken(
          selectionObject.identicalAdjoinedClauseEllipsis || "none",
        );
        // Availability is a projection of the existing owner's full exact-parent
        // test. The controller must not create a second set of ellipsis rules.
        let ellipsisPreview = null;
        if (!diagnostics.length && decisions.every(decision => decision.resolved)) {
          const previewKey = `${captureRevision}:${JSON.stringify(operationSelections)}`;
          if (conjunctionEllipsisPreview?.key !== previewKey) {
            const conjuncts = (operationSelections.leftContextAbsent
              ? ["principal"] : ["principal", "adjoined", "dependent"])
              .filter(role => getValidatedCapture(role))
              .map((role, index) => getCapturedCompositionNode(role, `conjunct-${index + 1}`));
            conjunctionEllipsisPreview = {
              key: previewKey,
              result: targetObject.evaluateClassicalNahuatlClauseConjunction?.({
                operationKind: "conjunction", conjuncts,
                sharedSupplement: getValidatedCapture("supplement")
                  ? getCapturedCompositionNode("supplement", "shared-supplement") : null,
                options: {...operationSelections, identicalAdjoinedClauseEllipsis: "first"},
              }),
            };
          }
          ellipsisPreview = conjunctionEllipsisPreview.result;
        }
        const canSilenceFirst = ellipsisPreview?.authorizationStatus === "authorized";
        decisions.push(buildDecision({
          id: "identical-adjoined-clause-ellipsis",
          values: ["none", "first"],
          selectedValue: ellipsis,
          reason: "a shared clause can be silent at its first occurrence when the canonical owner licenses the exact parents",
          optionAvailability: [
            {value: "none", status: RELATION_AVAILABILITY.AVAILABLE},
            {value: "first", status: canSilenceFirst
              ? RELATION_AVAILABILITY.AVAILABLE : RELATION_AVAILABILITY.INCOMPATIBLE,
            reasonCode: canSilenceFirst ? "" : ellipsisPreview?.blockReason
              || "ellipsis-requires-compatible-captured-parents"},
          ],
        }));
        if (!["none", "first"].includes(ellipsis)
          || (ellipsis === "first" && !canSilenceFirst)) {
          diagnostics.push(ellipsisPreview?.blockReason
            || "recognized-identical-adjoined-clause-ellipsis-required");
        }
        operationSelections.identicalAdjoinedClauseEllipsis = ellipsis;
      } else if (relation === "correlative-conjunction") {
        requireCapturedSource("principal", diagnostics, {
          diagnosticPrefix: "classical-conjunction",
        });
        requireCapturedSource("adjoined", diagnostics, {
          diagnosticPrefix: "classical-conjunction",
        });
        const conjuncts=["principal","adjoined","dependent"].filter(role=>getValidatedCapture(role))
          .map((role,index)=>getCapturedCompositionNode(role,`conjunct-${index+1}`));
        const owner=targetObject.getClassicalCorrelativeChoiceContract?.(selectionObject,conjuncts);
        if(!owner) diagnostics.push("correlative-choice-owner-capability-required");
        ownerFacts = owner?.facts || [];
        const selected={};
        for(const domain of owner?.decisions || []) {
          const requestedValue=normalizeToken(selectionObject[domain.key]);
          const decision=buildDecision({...domain,selectedValue:requestedValue,reason:"Choice licensed by the canonical correlative owner"});
          decisions.push(Object.freeze({...decision,key:domain.key,requestedValue,responsibility:"user",sourceReference:domain.sourceReference}));
          selected[domain.key]=decision.selectedValue;
          const unavailable=decision.optionAvailability?.find(option=>option.value===requestedValue && option.status!==RELATION_AVAILABILITY.AVAILABLE);
          if(unavailable?.reasonCode) diagnostics.push(unavailable.reasonCode);
        }
        for(const fact of owner?.facts || []) {
          if(fact.key !== "correlativePattern") continue;
          selected[fact.key]=fact.value;
          const requestedValue=normalizeToken(selectionObject[fact.key]);
          if(requestedValue && requestedValue !== fact.value) {
            decisions.push(Object.freeze({...buildDecision({id:"correlative-pattern",values:[fact.value],selectedValue:"",reason:"Reset the previous pattern to the paired noun-clause structure"}),
              key:fact.key,requestedValue,responsibility:"application-recovery",sourceReference:fact.sourceReference}));
          }
        }
        Object.assign(operationSelections,{correlationType:selected.correlationType,pattern:selected.correlativePattern || ""});
      } else {
        requireCapturedSource("principal", diagnostics, {diagnosticPrefix:"classical-conjunction"});
        requireCapturedSource("adjoined", diagnostics, {diagnosticPrefix:"classical-conjunction"});
        const conjuncts=["principal","adjoined","dependent"].filter(role=>getValidatedCapture(role))
          .map((role,index)=>getCapturedCompositionNode(role,`conjunct-${index+1}`));
        const owner=targetObject.getClassicalLexicalParallelChoiceContract?.(relation,selectionObject,conjuncts);
        if(!owner) diagnostics.push("lexical-parallel-choice-owner-capability-required");
        for(const domain of owner?.decisions || []) {
          const requestedValue=normalizeToken(selectionObject[domain.key] || domain.defaultValue || "");
          const decision=buildDecision({...domain,selectedValue:requestedValue,reason:"Choice licensed by the canonical conjunction owner"});
          decisions.push(Object.freeze({...decision,key:domain.key,requestedValue,responsibility:domain.responsibility || "user",sourceReference:domain.sourceReference}));
          operationSelections[domain.key]=decision.selectedValue;
          const unavailable=decision.optionAvailability?.find(option=>option.value===requestedValue && option.status!==RELATION_AVAILABILITY.AVAILABLE);
          if(unavailable?.reasonCode) diagnostics.push(unavailable.reasonCode);
        }
        if(relation === "parallel-structure" && !operationSelections.rephraseAxis) operationSelections.rephraseAxis="";
      }
      if (relation === "conjunction") {
        const punctuationValues=["none","comma","semicolon"];
        const boundaryPunctuation=normalizeToken(selectionObject.boundaryPunctuation || "none");
        decisions.push(buildDecision({id:"boundary-punctuation",values:punctuationValues,selectedValue:boundaryPunctuation,reason:"Writing punctuation between the captured clauses"}));
        if(!punctuationValues.includes(boundaryPunctuation)) diagnostics.push("recognized-boundary-punctuation-required");
        operationSelections.boundaryPunctuation=boundaryPunctuation;
      }
      return buildNewRelationContract({
        selectionObject,
        relation,
        decisions,
        diagnostics,
        derived: {
          operationFamily: "conjunction",
          ...(relation === "correlative-conjunction" ? {ownerFacts} : {}),
          operationKind: relation,
          conjunctCount: (relation === "conjunction" && operationSelections.leftContextAbsent
            ? ["principal"] : ["principal", "adjoined", "dependent"])
            .filter(role => getValidatedCapture(role)).length,
          sharedSupplementPresent: Boolean(
            getValidatedCapture("supplement"),
          ),
          nestedComposition: [
            "principal",
            "adjoined",
            "dependent",
          ].some(role => getSourceUnit(role)?.sourceKind === "composition-ast"),
          principalSourceKind: getSourceUnit("principal")?.sourceKind || "",
          adjoinedSourceKind: getSourceUnit("adjoined")?.sourceKind || "",
          dependentSourceKind: getSourceUnit("dependent")?.sourceKind || "",
          supplementSourceKind: getSourceUnit("supplement")?.sourceKind || "",
          markerSourceKind: getSourceUnit("marker")?.sourceKind || "",
        },
        operationSelections,
        derivedFieldIds: [
          "operation-family",
          "operation-kind",
          "conjunct-count",
          "shared-supplement-present",
          "nested-composition",
          "principal-source-kind",
          "adjoined-source-kind",
          "dependent-source-kind",
          "supplement-source-kind",
          "marker-source-kind",
        ],
      });
    }

    function buildComparisonDecisionContract({
      selectionObject,
      relation,
      decisions,
      diagnostics,
    }) {
      const routeInventory = getComparisonRouteInventory();
      const requestedRoute = normalizeToken(selectionObject.comparisonRoute);
      const routeSpec = routeInventory.find(route => route.id === requestedRoute)
        || null;
      const routeIds = routeInventory.map(route => route.id);
      decisions.push(buildDecision({
        id: "comparison-route",
        values: routeIds,
        selectedValue: routeSpec?.id || "",
        reason: "one semantic comparison route is a genuine grammar choice",
        determinesCaptureRoles: true,
      }));
      if (requestedRoute && !routeSpec) {
        diagnostics.push("classical-comparison-route-not-licensed");
      }
      const layout = COMPARISON_CAPTURE_SLOT_LAYOUTS[routeSpec?.id] || {};
      const migrated = isCurrentComparisonRoute(routeSpec?.id);
      const domain = migrated ? getCurrentComparisonOwnerContract(routeSpec.id, selectionObject) : null;
      const resolved = resolveComparisonChoices(domain, selectionObject);
      const ownerChoices = resolved ? getCurrentComparisonOwnerContract(routeSpec.id, resolved.operationSelections) : null;
      if (migrated && !ownerChoices) diagnostics.push("comparison-choice-owner-capability-required");
      const requiredSlots = new Set(ownerChoices?.requiredSlots || routeSpec?.requiredSlots || []);

      Object.entries(layout).forEach(([role, slotId]) => {
        if (requiredSlots.has(slotId)) {
          requireCapturedSource(role, diagnostics, {
            diagnosticPrefix: "classical-comparison",
          });
        }
        const capture = getValidatedCapture(role);
        if (!capture) return;
        // Generic clause capture does not establish comparison eligibility.
        // Validate the exact whole through the same Source owner used by Make.
        const source = targetObject.buildClassicalComparisonSourceUnit?.({
          sourceResult: capture.canonicalResult,
        });
        if (targetObject.isClassicalComparisonSourceUnit?.(source) !== true
          || source.authorizationStatus !== "authorized") {
          diagnostics.push(`classical-comparison-${role}-capture-required:${
            source?.blockReason || "comparison-owner-issued-source-required"
          }`);
        }
      });
      if (migrated) {
        diagnostics.push(...(resolved?.diagnostics || []));
        for (const choice of resolved?.decisions || []) {
          if (choice.applicability !== "inactive") decisions.push(Object.freeze({...buildDecision(choice), ...choice}));
          if (!choice.resolved && choice.applicability !== "inactive") diagnostics.push(`classical-comparison-${choice.key}-not-licensed`);
        }
        return buildNewRelationContract({selectionObject, relation, decisions, diagnostics,
          operationSelections: resolved?.operationSelections || {comparisonRoute: routeSpec.id},
          derived: {operationFamily: "comparison", operationKind: routeSpec.operation,
            comparisonRelation: routeSpec.relation, comparisonRoute: routeSpec.id,
            ownerFacts: ownerChoices?.facts || [],
            captureSlotLayout: Object.freeze({...layout}),
            requiredCaptureRoles: freezeArray(Object.entries(layout).filter(([,slot])=>requiredSlots.has(slot)).map(([role])=>role)),
            optionalCaptureRoles: freezeArray(Object.entries(layout).filter(([,slot])=>!requiredSlots.has(slot)).map(([role])=>role))},
          derivedFieldIds: ["operation-family", "operation-kind", "comparison-relation", "capture-slot-layout", "required-capture-roles", "optional-capture-roles"]});
      }
      return buildNewRelationContract({selectionObject,relation,decisions,diagnostics,
        operationSelections:{comparisonRoute:""},derived:{operationFamily:"comparison",captureSlotLayout:Object.freeze({})}});
    }

    function buildSupplementationDecisionContract({
      selectionObject,
      relation,
      decisions,
      diagnostics,
    }) {
      const requireRole = role => requireCapturedSource(role, diagnostics, {
        diagnosticPrefix: `classical-${relation}`,
      });
      const operationSelections = {};
      let requiredCaptureRoles = [];
      let optionalCaptureRoles = [];
      if (relation === "supplementation") {
        requiredCaptureRoles = ["principal", "adjoined"];
        optionalCaptureRoles = ["marker"];
        requiredCaptureRoles.forEach(requireRole);
        const principalPreview = buildCapturedSupplementationEnvelope(
          "principal",
          {
            referenceId: "supplementation-principal-preview",
            subjectReferenceId: "supplementation-principal-preview-subject",
            objectReferenceId: "supplementation-principal-preview-object",
            possessorReferenceId: "supplementation-principal-preview-possessor",
          },
        );
        const supplementPreview = buildCapturedSupplementationEnvelope(
          "adjoined",
          {
            referenceId: "supplementation-supplement-preview",
            subjectReferenceId: "supplementation-supplement-preview-subject",
            objectReferenceId: "supplementation-supplement-preview-object",
            possessorReferenceId: "supplementation-supplement-preview-possessor",
          },
        );
        const supplementDiscourseContext =
          getDiscourseSourceContextFrame("adjoined");
        if (!principalPreview) {
          diagnostics.push(
            "classical-supplementation-principal-canonical-envelope-required",
          );
        }
        if (!supplementPreview) {
          diagnostics.push(
            "classical-supplementation-adjoined-canonical-envelope-required",
          );
        }
        const markerCapture = getValidatedCapture("marker");
        const markerSemantic = normalizeToken(
          markerCapture?.canonicalResult?.semanticMarker
          || getOwnerTypedMarkerProfile(markerCapture?.canonicalResult)
          || "",
        );
        if (markerCapture && !["in", "ca"].includes(markerSemantic)) {
          diagnostics.push(
            "classical-supplementation-marker-must-be-owner-issued-in-or-ca",
          );
        }
        const resolveChoice = ({
          id,
          key,
          values,
          fallback = "",
          reason,
          expose = values.length > 1,
          inventoryFieldRef = "",
        }) => {
          const requested = normalizeToken(selectionObject[key]);
          const explicitChoiceRequired = expose && values.length > 1;
          const selectedValue = values.includes(requested)
            ? requested
            // A hidden singleton is determined by the new typed context.
            // An obsolete choice must not make that context unreachable.
            : !expose && values.length === 1
              ? values[0]
            : requested
              ? ""
              : explicitChoiceRequired
                ? ""
                : values.includes(fallback)
                ? fallback
                : values[0] || "";
          if (expose) {
            decisions.push(buildDecision({
              id,
              values,
              selectedValue,
              reason,
              inventoryFieldRef,
            }));
          }
          if (requested && !selectedValue) {
            diagnostics.push(`classical-supplementation-${id}-not-licensed`);
          }
          operationSelections[key] = selectedValue;
          return selectedValue;
        };
        const typedInterrogativeSupplement = Boolean(
          supplementPreview?.interrogativeKind
          // A whole composed utterance is not its interrogative principal.
          // It can fill a saying object's included direct-speech contact.
          && !getCapturedSupplementationContinuation("adjoined"),
        );
        const reducedCopulaPredicate = targetObject.getClassicalReducedCopulaPredicateSource?.(
          getValidatedCapture("principal")?.canonicalResult);
        const referenceMode = resolveChoice({
          id: "supplementation-reference-mode",
          expose: Boolean(reducedCopulaPredicate) || !typedInterrogativeSupplement,
          key: "supplementationReferenceMode",
          values: reducedCopulaPredicate
            ? ["reduced-copula", "shared", "included", "absolute-topic"]
            : typedInterrogativeSupplement
            ? ["shared"]
            : ["shared", "included", "absolute-topic"],
          fallback: "shared",
          reason:
            typedInterrogativeSupplement
              ? "an interrogative NNC replaces a shared supplement"
              : "the user selects shared reference, whole-supplement reference, or an absolute topic",
        });
        const includedSemanticGroup = normalizeToken(
          principalPreview?.semanticGroup,
        );
        const includedObjectContent = [
          "speech",
          "saying",
          "wish",
          "perception",
          "cognition",
          "causing",
          "requesting",
        ].includes(includedSemanticGroup);
        const headRoleValues = (referenceMode === "absolute-topic"
          ? ["subject"]
          : referenceMode === "included" && includedObjectContent
            ? principalPreview?.objects?.length ? ["object"] : []
          : referenceMode === "included" && includedSemanticGroup === "affect"
            ? ["subject"]
          : principalPreview?.unitKind === "nnc"
          ? [
              "subject",
              ...(principalPreview.objects?.length ? ["object"] : []),
              ...(principalPreview.possessor ? ["possessor"] : []),
            ]
          : principalPreview?.unitKind === "vnc"
            ? [
                "subject",
                ...(principalPreview.objects?.length ? ["object"] : []),
                ...(principalPreview.possessor ? ["possessor"] : []),
              ]
            : []).filter(role => role !== "subject"
              || principalPreview?.subject?.participantFrame?.hasReferent !== false
              || referenceMode === "absolute-topic"
              || referenceMode === "reduced-copula" && Boolean(reducedCopulaPredicate)
              || referenceMode === "shared" && principalPreview?.transformedImpersonalSubjectDomainEligible === true);
        // The canonical owner distinguishes the designating object's locative
        // harmony from referential agreement and from ordinary adverbial use.
        // A preview grants a contact option only; composing still validates it.
        const previewObjects = Array.from(principalPreview?.objects || []);
        const previewObjectId = normalizeToken(selectionObject.principalObjectId)
          || (previewObjects.length === 1 ? previewObjects[0].id : "");
        let designatingLocativeContactAvailable = false;
        if (referenceMode === "shared"
          && normalizeToken(selectionObject.supplementationHeadRole) === "object"
          && previewObjectId
          && supplementPreview?.subject?.participantFrame?.hasReferent === false
          && typeof targetObject.evaluateClassicalNahuatlSupplementationOperation === "function") {
          const continuation = getCapturedSupplementationContinuation("principal");
          const object = previewObjects.find(item => item.id === previewObjectId);
          const contactPreview = object?.referenceId
            ? buildCapturedSupplementationEnvelope("adjoined", {
                referenceId: "supplementation-locative-contact-preview",
                subjectReferenceId: object.referenceId,
              }) : null;
          const preview = targetObject.evaluateClassicalNahuatlSupplementationOperation({
            operationKind: "relation", principalClause: principalPreview, supplementClause: contactPreview,
            options: {referenceMode: "shared", headRole: "object", principalObjectId: previewObjectId,
              supplementContactRole: "subject", order: "supplement-first", adjunctor: "none",
              principalContinuationFrames: continuation ? [continuation] : []},
          });
          const license = preview?.referenceFrame?.designatingLocativeSupplementFrame;
          designatingLocativeContactAvailable = preview?.authorizationStatus === "authorized"
            && license?.originalNamingObjectId === previewObjectId
            && license?.canonicalLocativeResult === getValidatedCapture("adjoined")?.canonicalResult;
        }
        const contactRoleValues = referenceMode === "included"
          ? ["subject"]
          : referenceMode === "absolute-topic"
            ? supplementPreview?.subject?.participantFrame?.hasReferent === false
              ? [] : ["subject"]
          : [
              ...(supplementPreview?.subject
                && (supplementPreview.subject.participantFrame?.hasReferent !== false
                  || designatingLocativeContactAvailable)
                ? ["subject"] : []),
              ...(supplementPreview?.objects?.length ? ["object"] : []),
              ...(supplementPreview?.possessor ? ["possessor"] : []),
            ];
        const sharedSubjectFunction = Boolean(
          referenceMode === "shared"
          && headRoleValues.length === 1 && headRoleValues[0] === "subject"
          && contactRoleValues.length === 1 && contactRoleValues[0] === "subject"
          && principalPreview?.subject?.participantFrame?.hasReferent === true
          && supplementPreview?.subject?.participantFrame?.hasReferent === true
          && principalPreview.subject.features?.person === supplementPreview.subject.features?.person
          && principalPreview.subject.features?.number === supplementPreview.subject.features?.number
        );
        let headRole;
        if (sharedSubjectFunction) {
          const adjoinedFunction = resolveChoice({
            id: "adjoined-function", key: "adjoinedFunction",
            values: ["supplementary-subject"], fallback: "supplementary-subject", expose: true,
            reason: "the captured shared-reference subject contact determines the supplementary-subject function",
            inventoryFieldRef: "clause-choice:clause:composition:adjoined-function",
          });
          headRole = adjoinedFunction === "supplementary-subject" ? "subject" : "";
          operationSelections.supplementationHeadRole = headRole;
          // Unlike obsolete hidden singleton drafts, explicit incompatible
          // contacts cannot be rewritten as this authenticated subject contact.
          for (const key of ["supplementationHeadRole", "supplementationContactRole"]) {
            if (normalizeToken(selectionObject[key]) && normalizeToken(selectionObject[key]) !== "subject")
              diagnostics.push(`classical-supplementation-${key}-not-licensed`);
          }
        } else {
          headRole = resolveChoice({
            id: "supplementation-head-role", key: "supplementationHeadRole",
            values: headRoleValues, fallback: "subject",
            reason: "the typed principal leaves these personal-pronominal heads available",
          });
          if (normalizeToken(selectionObject.adjoinedFunction)
            && normalizeToken(selectionObject.adjoinedFunction) !== "none")
            diagnostics.push("classical-supplementation-adjoined-function-not-licensed");
        }
        const contactRole = resolveChoice({
          id: "supplementation-contact-role",
          key: "supplementationContactRole",
          values: contactRoleValues,
          fallback: "subject",
          reason:
            "the typed supplement leaves these personal-pronominal contacts available",
          expose: referenceMode !== "included" && contactRoleValues.length > 1,
        });
        const nestedPossessors = referenceMode === "shared"
          ? getNestedPossessorContacts() : [];
        resolveChoice({
          id: "additional-possessor-contact",
          key: "additionalPossessorContact",
          values: ["none", ...nestedPossessors.map((_, index) => `possessor-${index + 1}`)],
          fallback: "none",
          expose: nestedPossessors.length > 0,
          reason: "Optionally identify the same supplement with a nested possessor: "
            + nestedPossessors.map((clause, index) => `${index + 1}: ${clause.surface}`).join("; "),
        });
        const interrogativeSupplement = Boolean(
          referenceMode === "shared" && typedInterrogativeSupplement,
        );
        const orderValues = referenceMode === "reduced-copula" ? ["principal-first"]
          : markerSemantic === "ca"
          ? ["supplement-first"]
          : interrogativeSupplement
            ? ["supplement-first", "discontinuous"]
            : ["principal-first", "supplement-first", "discontinuous"];
        const order = resolveChoice({
          id: "supplementation-order",
          key: "supplementationOrder",
          values: orderValues,
          fallback: orderValues[0],
          reason:
            "the user selects one of the linear orders licensed by the typed constituents",
        });
        if (order === "discontinuous") {
          requireRole("dependent");
          requiredCaptureRoles.push("dependent");
          resolveChoice({
            id: "discontinuous-head-position",
            key: "discontinuousHeadPosition",
            values: interrogativeSupplement ? ["last"] : ["first", "last"],
            reason: "Choose which side of the intervening clause contains the possessor or other head.",
          });
        }
        const reuseCandidate = getCapturedSupplementationContinuation("adjoined")
          || getValidatedCapture("adjoined")?.canonicalResult;
        const canReuseIntervener = referenceMode === "shared"
          && headRole === "subject" && contactRole === "subject"
          && order === (reuseCandidate?.linearizationFrame?.discontinuousHeadPosition === "first"
            || reuseCandidate?.order === "discontinuous-head-first"
            ? "supplement-first" : "principal-first")
          && !getCapturedSupplementationContinuation("principal")
          && targetObject.canReuseClassicalSupplementationIntervener?.(
            principalPreview, reuseCandidate
          ) === true;
        resolveChoice({
          id: "principal-intervener-use",
          key: "principalIntervenerUse",
          values: canReuseIntervener ? ["separate", "reuse"] : ["separate"],
          fallback: "separate",
          reason: "Choose whether the principal is the same occurrence already inside the discontinuous supplement.",
          expose: canReuseIntervener,
        });
        const principalObjects = Array.from(principalPreview?.objects || []);
        const principalObjectId = headRole === "object"
          ? resolveChoice({
              id: "principal-object-id",
              key: "principalObjectId",
              values: principalObjects.map(object => object.id),
              fallback: principalObjects[0]?.id || "",
              reason:
                "the typed principal has more than one object pronoun that can serve as head",
            })
          : "";
        operationSelections.principalObjectId = principalObjectId;
        if (headRole === "object" && principalObjects.some(object => object.nestedObjectContactFrame)
          && selectionObject.principalObjectId
          && !principalObjects.some(object => object.id === selectionObject.principalObjectId)) {
          diagnostics.push("classical-supplementation-principal-object-id-not-licensed");
        }
        const supplementObjects = Array.from(supplementPreview?.objects || []);
        const supplementObjectId = contactRole === "object"
          ? resolveChoice({
              id: "supplement-object-id",
              key: "supplementObjectId",
              values: supplementObjects.map(object => object.id),
              fallback: supplementObjects[0]?.id || "",
              reason:
                "the typed supplement has more than one object pronoun that can serve as contact",
            })
          : "";
        operationSelections.supplementObjectId = supplementObjectId;
        if (contactRole === "object" && supplementObjects.some(object => object.nestedObjectContactFrame)
          && selectionObject.supplementObjectId
          && !supplementObjects.some(object => object.id === selectionObject.supplementObjectId)) {
          diagnostics.push("classical-supplementation-supplement-object-id-not-licensed");
        }
        const integratedAntecessiveAvailable = Boolean(
          referenceMode === "shared"
          && order === "supplement-first"
          && principalPreview?.unitKind === "vnc"
          && principalPreview?.antecessiveOrder
          && ["subject", "object"].includes(headRole),
        );
        const includedAntecessiveJumpAvailable = Boolean(
          referenceMode === "included"
          && principalPreview?.unitKind === "nnc"
          && supplementPreview?.unitKind === "vnc"
          && supplementPreview?.antecessiveOrder
          && ["subject", "possessor"].includes(headRole),
        );
        const antecessivePlacementValues = integratedAntecessiveAvailable
          ? ["retain-with-vnc", "integrate-with-supplement"]
          : includedAntecessiveJumpAvailable
            ? ["retain-with-vnc", "move-to-principal"]
            : ["retain-with-vnc"];
        resolveChoice({
          id: "supplementation-antecessive-placement",
          key: "supplementationAntecessivePlacement",
          values: antecessivePlacementValues,
          fallback: "retain-with-vnc",
          reason:
            "the typed antecessive boundary can remain on its VNC or take the licensed integrated carrier",
        });
        const contextualPair = ["principal", "adjoined"].map(role => buildCapturedSupplementationEnvelope(role,
          {referenceId: "first-person-context", subjectReferenceId: "first-person-context"}, true));
        if (operationSelections.supplementationOrder === "supplement-first") contextualPair.reverse();
        const contextualSilentEligible = referenceMode === "shared" && Boolean(
          targetObject.buildClassicalNahuatlConcatenatedFirstPersonProjection?.(...contextualPair));
        resolveChoice({
          id: "contextual-silent-first-person",
          key: "contextualSilentFirstPerson",
          values: contextualSilentEligible
            ? ["absent", "present"]
            : ["absent"],
          fallback: "absent",
          reason:
            "the later coreferential first-person VNC may use its licensed silent contextual realization",
        });
        const specificityDomainEligible = referenceMode === "shared"
          && headRole === "subject"
          && operationSelections.supplementationContactRole === "subject"
          && principalPreview?.transformedImpersonalSubjectDomainEligible === true
          && supplementPreview?.subject?.participantFrame?.hasReferent === true;
        if (specificityDomainEligible) {
          const selectedScope = normalizeToken(selectionObject.specificityDomainRestriction);
          decisions.push(buildDecision({id: "specificity-domain-restriction", values: ["same-entire-group"], selectedValue: selectedScope,
            inventoryFieldRef: "clause-choice:sentence:supplementation:specificity-domain-restriction",
            reason: "all pertinent pronouns concern the same entire group at different specificity (§57.4)"}));
          operationSelections.specificityDomainRestriction = selectedScope === "same-entire-group" ? selectedScope : "";
        } else if (normalizeToken(selectionObject.specificityDomainRestriction)) {
          diagnostics.push("specificity-domain-restriction-not-licensed-for-captured-sources");
        }
        const semanticGroup = normalizeToken(principalPreview?.semanticGroup);
        if (
          referenceMode === "included"
          && ["speech", "saying"].includes(semanticGroup)
        ) {
          resolveChoice({
            id: "speech-directness",
            key: "speechDirectness",
            values: ["direct", "indirect"],
            fallback: "direct",
            reason:
              "the included utterance is selected as direct or indirect speech",
          });
          operationSelections.derivedSpeechAct = {
            assertion: "statement",
            question: "question",
            command: "command",
            exclamation: "exclamation",
          }[normalizeToken(supplementPreview?.sentenceKind)] || "";
        }
        if (referenceMode === "included" && semanticGroup === "wish") {
          const supplementMood = normalizeToken(supplementPreview?.mood);
          const supplementTense = normalizeToken(supplementPreview?.tense);
          const wishRealizabilityValues = [
            (
              supplementMood === "indicative"
              && supplementTense === "future"
            ) || (
              supplementMood === "optative"
              && ["nonpast", "future"].includes(supplementTense)
            )
              ? "realizable"
              : "",
            supplementMood === "optative" && supplementTense === "past"
              ? "present-or-future-impossible"
              : "",
            supplementMood === "optative"
              && supplementTense === "past"
              && supplementPreview?.antecessiveOrder
              ? "past-counterfactual"
              : "",
          ].filter(Boolean);
          resolveChoice({
            id: "wish-realizability",
            key: "wishRealizability",
            values: wishRealizabilityValues,
            fallback: wishRealizabilityValues[0] || "",
            reason:
              "the user resolves realizability only when the typed mood, tense, and antecessive leave more than one licensed reading",
          });
        }
        operationSelections.markerSemantic = markerSemantic;
        operationSelections.informationQuestion = interrogativeSupplement;
        operationSelections.integratedAntecessive =
          operationSelections.supplementationAntecessivePlacement
            === "integrate-with-supplement";
        operationSelections.includedAntecessiveJump =
          operationSelections.supplementationAntecessivePlacement
            === "move-to-principal";
        const getPreviewParticipant = (envelope, role, objectId = "") => (
          role === "subject"
            ? envelope?.subject || null
            : role === "possessor"
              ? envelope?.possessor || null
              : role === "object"
                ? (envelope?.objects || []).find(object => (
                    !objectId || object.id === objectId
                  )) || null
                : null
        );
        const principalParticipant = getPreviewParticipant(
          principalPreview,
          headRole,
          principalObjectId,
        );
        const supplementParticipant = getPreviewParticipant(
          supplementPreview,
          contactRole,
          supplementObjectId,
        );
        const retainContactAlternatives = Boolean(
          referenceMode === "shared"
          && principalPreview?.unitKind === "vnc"
          && principalPreview?.silentSpecificObjectAuthorized !== true
          && principalPreview?.subject?.features?.person === "3"
          && supplementParticipant?.features?.person === "3"
          && principalPreview.subject.features.number
            === supplementParticipant.features.number
          // A continued composition already owns its contact identities.
          // Preserve ambiguity only among contacts it still identifies together.
          && (!getCapturedSupplementationContinuation("principal")
            || [principalPreview.subject, ...(principalPreview.objects || [])]
              .filter(participant => (
                participant.referenceId === principalParticipant?.referenceId
                && participant.features?.person === "3"
                && participant.features?.number === supplementParticipant.features?.number
              )).length >= 2)
          && principalPreview.objects?.some(object => (
            object.features?.person === "3"
            && object.features?.number
              === supplementParticipant.features?.number
          ))
        );
        operationSelections.retainContactAlternatives =
          retainContactAlternatives;
        const personOrNumberMismatch = Boolean(
          principalParticipant
          && supplementParticipant
          && (
            principalParticipant.features?.person
              !== supplementParticipant.features?.person
            || principalParticipant.features?.number
              !== supplementParticipant.features?.number
          ),
        );
        operationSelections.agreementException =
          personOrNumberMismatch
          && supplementPreview?.collectiveReference
          && principalParticipant?.features?.number === "plural"
            ? "collective"
          : personOrNumberMismatch
              && Boolean(
                supplementDiscourseContext?.namedPartnerKnownParticipant,
              )
              && supplementDiscourseContext.namedPartnerKnownParticipant
                !== "none"
              && principalParticipant?.features?.number === "plural"
              && supplementParticipant?.features?.person === "3"
              && supplementParticipant?.features?.number === "singular"
              ? "named-partner"
            : personOrNumberMismatch
                && supplementDiscourseContext?.speakerGender === "male"
                && supplementDiscourseContext?.speakerGroupMembership
                  === "member"
                && normalizeToken(supplementPreview?.sourceStem)
                  === "oquich"
                && supplementParticipant?.features?.person === "1"
                && supplementParticipant?.features?.number === "plural"
                && principalParticipant?.features?.person === "3"
                ? "male-bonding"
                : "";
        operationSelections.semanticGroup = semanticGroup;
      } else if (relation === "vocative") {
        requiredCaptureRoles = ["principal"];
        requireRole("principal");
        const companionMode = normalizeToken(selectionObject.vocativeCompanion) || "standalone";
        decisions.push(buildDecision({id: "vocative-companion",
          values: ["standalone", "with-clause"], selectedValue: companionMode,
          reason: "§18.11 permits a vocative with an accompanying clause"}));
        operationSelections.vocativeCompanion = companionMode;
        if (companionMode === "with-clause") {
          requiredCaptureRoles.push("adjoined");
          requireRole("adjoined");
          const order = normalizeToken(selectionObject.vocativeCompanionOrder) || "clause-first";
          decisions.push(buildDecision({id: "vocative-companion-order",
            values: ["clause-first", "vocative-first"], selectedValue: order,
            reason: "the vocative can precede or follow its accompanying clause"}));
          operationSelections.vocativeCompanionOrder = order;
        }
        const vocativeSourceContext =
          getDiscourseSourceContextFrame("principal");
        const vocativePreview = buildCapturedSupplementationEnvelope(
          "principal",
          { referenceId: "vocative-preview" },
        );
        const speakerGender = vocativeSourceContext?.speakerGender || "";
        if (!["male", "female"].includes(speakerGender)) {
          diagnostics.push(
            "classical-vocative-speaker-context-required",
          );
        }
        operationSelections.derivedSpeakerGender = speakerGender;
        const exactVocativeParent = getValidatedCapture("principal")?.canonicalResult;
        const finalIFacts = speakerGender === "male" && exactVocativeParent
          ? targetObject.getClassicalNahuatlCustomaryAgentiveFinalIBoundaryFacts?.(
            exactVocativeParent, { useKind: "vocative" },
          ) : null;
        const requestedFinalI = normalizeToken(selectionObject.finalIRealization);
        if (finalIFacts?.authorizationStatus === "authorized"
          && finalIFacts.canonicalParentResult === exactVocativeParent) {
          const values = finalIFacts.availableRealizations;
          const selectedValue = requestedFinalI
            || finalIFacts.selectedRealization || finalIFacts.defaultRealization;
          if (values.length > 1) decisions.push(buildDecision({
            id: "vocative-final-i", values,
            selectedValue: values.includes(selectedValue) ? selectedValue : "",
            reason: "§36.3 permits final i to remain or drop before vocative é",
          }));
          if (!values.includes(selectedValue)) {
            diagnostics.push("classical-vocative-final-i-not-licensed");
          }
          operationSelections.finalIRealization = values.includes(selectedValue)
            ? selectedValue : "";
        } else if (requestedFinalI && requestedFinalI !== "preserve") {
          diagnostics.push("classical-vocative-final-i-not-licensed");
        }
        // The vocative owner has the exact captured Source, including nested
        // supplementation sources. The controller must not infer its choices
        // from the spelling of a formula or surface projection.
        const ownerLicensesVariant = options => {
          if (
            speakerGender !== "male"
            || !vocativePreview
            || typeof targetObject.evaluateClassicalNahuatlSupplementationOperation !== "function"
            || typeof targetObject.isClassicalNahuatlVocativeFrame !== "function"
          ) return false;
          const result = targetObject.evaluateClassicalNahuatlSupplementationOperation({
            operationKind: "vocative",
            nncClause: vocativePreview,
            options: {
              discourseSourceContextFrame: vocativeSourceContext,
              ...options,
            },
          });
          return targetObject.isClassicalNahuatlVocativeFrame(result);
        };
        const glottalValues = ownerLicensesVariant({ glottalVariant: "y" })
          ? ["plain-e", "glottal-e"]
          : ["plain-e"];
        const silentPluralValues = ownerLicensesVariant({ silentPluralIn: true })
          ? ["absent", "present"]
          : ["absent"];
        [
          ["glottal-variant", "glottalVariant", glottalValues, "plain-e"],
          [
            "silent-plural-in",
            "silentPluralIn",
            silentPluralValues,
            "absent",
          ],
        ].forEach(([id, key, values, fallback]) => {
          const requested = normalizeToken(selectionObject[key]);
          const selectedValue = values.includes(requested)
            ? requested
            : requested
              ? ""
              : fallback;
          if (values.length > 1) {
            decisions.push(buildDecision({
              id,
              values,
              selectedValue,
              reason:
                "the canonical vocative owner licenses this realization choice",
            }));
          }
          if (requested && !selectedValue) {
            diagnostics.push(`classical-vocative-${id}-not-licensed`);
          }
          operationSelections[key] = selectedValue;
        });
      } else if (relation === "rumored-report") {
        requiredCaptureRoles = ["principal", "adjoined"];
        requiredCaptureRoles.forEach(requireRole);
        const reportAdjunctor = normalizeToken(selectionObject.reportAdjunctor) || "in";
        decisions.push(buildDecision({
          id: "report-adjunctor", values: ["in", "none"],
          selectedValue: ["in", "none"].includes(reportAdjunctor) ? reportAdjunctor : "",
          reason: "the reported clause may have an in adjunctor or no adjunctor",
        }));
        if (!["in", "none"].includes(reportAdjunctor)) diagnostics.push("classical-rumored-report-adjunctor-not-licensed");
        operationSelections.reportAdjunctor = reportAdjunctor;
        const requestedMach = normalizeToken(selectionObject.mach);
        const selectedMach = ["present", "absent"].includes(requestedMach)
          ? requestedMach
          : "";
        decisions.push(buildDecision({
          id: "rumor-mach",
          values: ["present", "absent"],
          selectedValue: selectedMach,
          reason: "the user chooses whether the optional report particle mach is present",
        }));
        if (requestedMach && !selectedMach) {
          diagnostics.push("classical-rumored-report-rumor-mach-not-licensed");
        }
        operationSelections.mach = selectedMach;
        const requestedFusion = normalizeToken(selectionObject.fuseQuilMach);
        if (selectedMach === "present") {
          const selectedFusion = ["separate", "fused"].includes(
            requestedFusion,
          ) ? requestedFusion : "";
          decisions.push(buildDecision({
            id: "fuse-quil-mach",
            values: ["separate", "fused"],
            selectedValue: selectedFusion,
            reason: "mach is present, so the user chooses the desired written boundary",
          }));
          if (requestedFusion && !selectedFusion) {
            diagnostics.push(
              "classical-rumored-report-fuse-quil-mach-not-licensed",
            );
          }
          operationSelections.fuseQuilMach = selectedFusion;
        } else {
          // Retain inactive draft fusion, but submit only the separate boundary without mach.
          operationSelections.fuseQuilMach = "separate";
        }
      } else if (relation === "deleted-principal") {
        requiredCaptureRoles = ["principal", "dependent", "adjoined"];
        requiredCaptureRoles.forEach(requireRole);
        optionalCaptureRoles = ["marker"];
        const markerCapture = getValidatedCapture("marker");
        const markerSemantic = normalizeToken(
          markerCapture?.canonicalResult?.semanticMarker
          || getOwnerTypedMarkerProfile(markerCapture?.canonicalResult)
          || "",
        );
        if (markerCapture && markerSemantic !== "in") {
          diagnostics.push("classical-deleted-principal-marker-must-be-owner-issued-in");
        }
        operationSelections.markerSemantic = markerSemantic;
        const visiblePreview = buildCapturedSupplementationEnvelope(
          "principal",
          { referenceId: "deleted-visible" },
        );
        const deletedPreview = buildCapturedSupplementationEnvelope(
          "dependent",
          {
            referenceId: "deleted-cah",
            subjectReferenceId: "deleted-shared-subject",
          },
        );
        const supplementPreview = buildCapturedSupplementationEnvelope(
          "adjoined",
          {
            referenceId: "deleted-supplement",
            subjectReferenceId: "deleted-shared-subject",
          },
        );
        const adverbialRole = normalizeToken(visiblePreview?.adverbialRole);
        const cahProxy = Boolean(
          visiblePreview?.unitKind === "nnc"
          && visiblePreview?.isAdverbialNnc === true
          && ["place", "time", "manner", "degree"].includes(adverbialRole)
          && deletedPreview?.unitKind === "vnc"
          && /(?:^|-)ca-h$/u.test(deletedPreview?.sourceStem || "")
          && supplementPreview?.unitKind === "nnc"
        );
        const visibleSpeechAction = visiblePreview?.unitKind === "vnc"
          && ["speech-action", "requesting"].includes(visiblePreview?.semanticGroup);
        const deletedSaying = deletedPreview?.unitKind === "vnc"
          && ["speech", "saying"].includes(deletedPreview?.semanticGroup);
        const deletionKind = cahProxy
          ? "cah-proxy"
          : visibleSpeechAction && deletedSaying
            ? "saying"
            : (visiblePreview?.isAdverbialNnc === true
                || visiblePreview?.isAdverbialVnc === true) && deletedSaying
              ? "saying-adverb-only"
              : "";
        if (!deletionKind && requiredCaptureRoles.every(role => (
          getValidatedCapture(role)
        ))) {
          diagnostics.push("classical-deleted-principal-route-not-licensed");
        }
        operationSelections.deletionKind = deletionKind;
        operationSelections.adverbialRole = cahProxy
          || deletionKind === "saying-adverb-only" ? adverbialRole : "";
        if (deletionKind.startsWith("saying")) {
          const requested = normalizeToken(selectionObject.speechDirectness);
          const selectedValue = ["direct", "indirect"].includes(requested)
            ? requested
            : "";
          decisions.push(buildDecision({
            id: "speech-directness",
            values: ["direct", "indirect"],
            selectedValue,
            reason: "the included utterance can be presented as direct or indirect speech",
          }));
          operationSelections.speechDirectness = selectedValue;
        } else {
          operationSelections.speechDirectness = "";
        }
      } else if (relation === "negative-ac-plural") {
        requiredCaptureRoles = ["principal"];
        requireRole("principal");
      } else if (relation === "contextual-first-person-realization") {
        requiredCaptureRoles = ["principal"];
        requireRole("principal");
        const requested = normalizeToken(
          selectionObject.contextualSilentFirstPerson
        );
        const selectedValue = ["absent", "present"].includes(requested)
          ? requested
          : requested
            ? ""
            : "absent";
        decisions.push(buildDecision({
          id: "contextual-silent-first-person",
          values: ["absent", "present"],
          selectedValue,
          reason:
            "the typed first-person reflexive VNC licenses this contextual realization",
        }));
        if (requested && !selectedValue) {
          diagnostics.push(
            "classical-contextual-first-person-realization-selection-not-licensed",
          );
        }
        operationSelections.contextualSilentFirstPerson = selectedValue;
      } else if (relation === "exclamatory-utterance") {
        optionalCaptureRoles = [
          "principal",
          "adjoined",
          "dependent",
          "supplement",
          "marker",
        ];
        if (!optionalCaptureRoles.some(role => getValidatedCapture(role))) {
          diagnostics.push(
            "classical-exclamatory-utterance-captured-constituent-required",
          );
        }
        const requestedVariant = normalizeToken(
          selectionObject.exclamatoryPersonalPronounVariant
        );
        const selectedVariant = [
          "default",
          "y-initial",
        ].includes(requestedVariant)
          ? requestedVariant
          : requestedVariant
            ? ""
            : "default";
        decisions.push(buildDecision({
          id: "exclamatory-personal-pronoun-variant",
          values: ["default", "y-initial"],
          selectedValue: selectedVariant,
          reason:
            "the exclamatory operation licenses the typed eh or yeh realization",
        }));
        if (requestedVariant && !selectedVariant) {
          diagnostics.push(
            "classical-exclamatory-personal-pronoun-variant-not-licensed",
          );
        }
        operationSelections.exclamatoryPersonalPronounVariant =
          selectedVariant;
      } else if (relation === "such-that-adjunction") {
        const principalParticleId =
          getValidatedCapture("principal")?.canonicalResult?.particleId || "";
        const frozenEllipsis = [
          "l58-quemah",
          "l58-quemahca",
        ].includes(principalParticleId);
        requiredCaptureRoles = frozenEllipsis
          ? ["principal"]
          : ["principal", "adjoined", "marker"];
        optionalCaptureRoles = frozenEllipsis ? [] : ["dependent"];
        requiredCaptureRoles.forEach(requireRole);
        if (
          getValidatedCapture("dependent")
          && getValidatedCapture("dependent").canonicalResult?.particleId
            !== "l3-in"
        ) {
          diagnostics.push(
            "classical-such-that-adjunctor-must-be-captured-in-particle",
          );
        }
        operationSelections.frozenEllipsis = frozenEllipsis;
      }
      return buildNewRelationContract({
        selectionObject,
        relation,
        decisions,
        diagnostics,
        derived: {
          operationFamily: "supplementation",
          operationKind: relation,
          requiredCaptureRoles: Object.freeze(requiredCaptureRoles),
          optionalCaptureRoles: Object.freeze(optionalCaptureRoles),
          polarityAuthority: "derived-from-captured-principal-and-marker",
          lexicalVariantAuthority: "read-only-owner-derived",
          speechAct: operationSelections.derivedSpeechAct || "",
          speakerGender: operationSelections.derivedSpeakerGender || "",
        },
        operationSelections,
        derivedFieldIds: [
          "operation-family",
          "operation-kind",
          "required-capture-roles",
          "optional-capture-roles",
          "polarity-authority",
          "lexical-variant-authority",
          "speech-act",
          "speaker-gender",
        ],
      });
    }

    function buildRelationAvailabilityOption({
      value = "",
      status = RELATION_AVAILABILITY.INCOMPATIBLE,
      reasonCode = "",
      recovery = "",
      requiredCaptureRoles = [],
      missingCaptureRoles = [],
      ownerEvidenceKind = "typed-capture-preflight",
    } = {}) {
      return Object.freeze({
        value: normalizeToken(value),
        status,
        reasonCode: normalizeToken(reasonCode),
        recovery: String(recovery || "").trim(),
        requiredCaptureRoles: freezeArray(requiredCaptureRoles),
        missingCaptureRoles: freezeArray(missingCaptureRoles),
        ownerEvidenceKind: normalizeToken(ownerEvidenceKind),
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }

    function getInstalledAdverbialRelationValues() {
      const inventory = targetObject.ADVERBIAL_ADJUNCTION_RELATION;
      return freezeArray(unique(
        inventory && typeof inventory === "object"
          ? Object.values(inventory)
            .map(normalizeToken)
            .filter(value => !["", "unknown", "recursive"].includes(value))
          : [],
      ));
    }

    function getCapturedCanonicalRequest(role = "") {
      const result = getValidatedCapture(role)?.canonicalResult || null;
      if (!result) return null;
      return [
        result.normalizedRequest,
        result.baseApplicationFrame?.normalizedRequest,
        result.applicationFrame?.normalizedRequest,
        result.resultFrame?.normalizedRequest,
        result.canonicalResult?.normalizedRequest,
      ].find(candidate => (
        candidate
        && typeof candidate === "object"
        && !Array.isArray(candidate)
      )) || null;
    }

    function capturedNegativeAcPluralSourceAuthorized(role = "principal") {
      const envelope = buildCapturedSupplementationEnvelope(role, {
        referenceId: `${role}-negative-ac-availability`,
      });
      return Boolean(envelope
        && typeof targetObject.evaluateClassicalNahuatlSupplementationOperation === "function"
        && targetObject.evaluateClassicalNahuatlSupplementationOperation({
          operationKind: "negative-ac-plural",
          principalClause: envelope,
        })?.authorizationStatus === "authorized");
    }

    function capturedContextualFirstPersonSourceAuthorized(role = "principal") {
      const exactResult = getValidatedCapture(role)?.canonicalResult || null;
      if (!exactResult) return false;
      const envelope = buildCapturedSupplementationEnvelope(role, {
        referenceId: `${role}-contextual-first-person-availability`,
        subjectReferenceId: `${role}-contextual-first-person-subject`,
      });
      const preview = targetObject.evaluateClassicalNahuatlSupplementationOperation?.({
        operationKind: "contextual-first-person-realization",
        principalClause: envelope,
        options: {contextualSilentFirstPerson: true},
      });
      const operation = preview?.operationFrames?.find(frame =>
        frame.kind === "classical-nahuatl-contextual-silent-first-person-frame");
      const exactTypedSlot = exactResult.finalTypedVncSlotFrame
        || exactResult.resultFrame?.finalTypedVncSlotFrame
        || exactResult.targetTypedVncSlotFrame
        || exactResult.proofFrame?.conclusion?.finalTypedVncSlotFrame
        || exactResult.proofFrame?.conclusion?.finalBoundaryRealizationFrame?.typedSlotFrame;
      return Boolean(targetObject.isClassicalNahuatlSupplementationFrame?.(preview) === true
        && preview.authorizationStatus === "authorized"
        && preview.operationKind === "contextual-first-person-realization"
        && preview.principalClause === envelope
        && targetObject.getClassicalNahuatlSupplementationClauseSourceFrame?.(envelope) === exactResult
        && exactTypedSlot
        && operation?.contextualProjection?.sourceTypedSlotFrame === exactTypedSlot
        && operation.sameExtralinguisticReferent === true
        && operation.thirdPersonFallbackAllowed === false);
    }

    function getCapturedRelationSourceFacts(role = "") {
      const capture = getValidatedCapture(role);
      const sourceUnit = getSourceUnit(role);
      const compositionFrame = buildCapturedClauseCompositionSourceFrame(
        role,
        AVAILABILITY_SOURCE_PROBE_REFERENCES,
      );
      const supplementationEnvelope = buildCapturedSupplementationEnvelope(
        role,
        AVAILABILITY_SOURCE_PROBE_REFERENCES,
      );
      const request = getCapturedCanonicalRequest(role);
      return Object.freeze({
        captured: Boolean(capture && sourceUnit?.ok),
        unitKind: normalizeToken(
          compositionFrame?.unitKind
          || supplementationEnvelope?.unitKind
          || sourceUnit?.features?.unitKind
          || sourceUnit?.unitType
          || "",
        ),
        sourceKind: normalizeToken(sourceUnit?.sourceKind || ""),
        sourceStem: String(
          supplementationEnvelope?.sourceStem
          || compositionFrame?.predicateStem
          || request?.sourceStem
          || "",
        ).trim().toLowerCase(),
        tense: normalizeToken(
          supplementationEnvelope?.tense
          || compositionFrame?.tense
          || request?.requestedSemanticTense
          || request?.semanticTenseValue
          || request?.tense
          || "",
        ),
        subjectPerson: String(
          supplementationEnvelope?.subject?.features?.person
          || compositionFrame?.subject?.features?.person
          || "",
        ).trim(),
        subjectNumber: normalizeToken(
          supplementationEnvelope?.subject?.features?.number
          || compositionFrame?.subject?.features?.number
          || "",
        ),
        state: normalizeToken(compositionFrame?.state || ""),
        objectKind: normalizeToken(
          request?.objectKind
          || request?.sourceObjectKind
          || request?.sourceValence
          || request?.valence
          || "",
        ),
        objectCount: Array.from(
          compositionFrame?.objects
          || supplementationEnvelope?.objects
          || [],
        ).length,
        possessorPresent: Boolean(
          compositionFrame?.possessor
          || supplementationEnvelope?.possessor,
        ),
        supplementableHeadPresent: Boolean(
          supplementationEnvelope?.subject
            && supplementationEnvelope.subject.participantFrame?.hasReferent !== false
          || Boolean(targetObject.getClassicalReducedCopulaPredicateSource?.(capture?.canonicalResult))
          || supplementationEnvelope?.transformedImpersonalSubjectDomainEligible === true
          || supplementationEnvelope?.objects?.length
          || supplementationEnvelope?.possessor,
        ),
        adverbialCenter: normalizeToken(
          sourceUnit?.features?.adverbialCenter || "",
        ),
        negativizedParticle: normalizeToken(
          sourceUnit?.features?.negativizedParticle || "",
        ),
        particleId: normalizeToken(
          capture?.canonicalResult?.particleId || "",
        ),
        markerProfile: normalizeToken(
          getTypedMarkerProfile(capture?.canonicalResult)
          || capture?.canonicalResult?.semanticMarker
          || "",
        ),
      });
    }

    function getRelationSourceImpossibility(
      relation = "",
      principal = {},
      adjoined = {},
      dependent = {},
    ) {
      const impossible = reason => Object.freeze({ impossible: true, reason });
      const clauseKinds = ["nnc", "vnc", "clause", "sentence"];
      if (relation === ADJECTIVAL_MODIFICATION_RELATION) {
        if (principal.captured && principal.unitKind !== "nnc") {
          return impossible("Adjectival modification requires an NNC head Result.");
        }
        if (adjoined.captured && !clauseKinds.includes(adjoined.unitKind)) {
          return impossible("Replace the modifier with an NNC or VNC Result.");
        }
      } else if (relation === "object-complement") {
        if (adjoined.captured && adjoined.unitKind !== "nnc") {
          return impossible("An object complement must be an NNC Result.");
        }
        if (principal.captured) {
          const ordinaryVnc = principal.unitKind === "vnc"
            && principal.objectCount > 0;
          const possessiveNnc = principal.unitKind === "nnc"
            && principal.state === "possessive"
            && principal.possessorPresent;
          if (!ordinaryVnc && !possessiveNnc) {
            return impossible(
              "The principal Result has no licensed object-complement source role.",
            );
          }
        }
      } else if (relation === "subject-complement") {
        if (principal.captured && principal.unitKind !== "vnc") {
          return impossible("A subject-complement principal must be a VNC Result.");
        }
        if (adjoined.captured && adjoined.unitKind !== "nnc") {
          return impossible("A subject complement must be an NNC Result.");
        }
      } else if (relation === "adverbial-complement") {
        if (principal.captured && principal.unitKind !== "vnc") {
          return impossible("An adverbial-complement principal must be a VNC Result.");
        }
        if (
          adjoined.captured
          && !["nnc", "vnc"].includes(adjoined.unitKind)
        ) {
          return impossible("This Result cannot fill an adverbial-complement slot.");
        }
      } else if (relation === "lexical-conjunction") {
        if (
          (principal.captured && principal.unitKind !== "nnc")
          || (adjoined.captured && adjoined.unitKind !== "nnc")
          || (dependent.captured && dependent.unitKind !== "nnc")
        ) {
          return impossible("Lexical conjunction requires NNC conjunct Results.");
        }
      } else if (["correlative-conjunction", "parallel-structure"].includes(relation)) {
        if (
          (principal.captured && !clauseKinds.includes(principal.unitKind))
          || (adjoined.captured && !clauseKinds.includes(adjoined.unitKind))
          || (dependent.captured && !clauseKinds.includes(dependent.unitKind))
        ) {
          return impossible("Replace particle captures with NNC or VNC Results.");
        }
      } else if (relation === COMPARISON_RELATION) {
        if (principal.captured && !clauseKinds.includes(principal.unitKind)) {
          return impossible("Comparison must start from an NNC or VNC Result.");
        }
      } else if (relation === "supplementation") {
        if (principal.captured && !clauseKinds.includes(principal.unitKind)) {
          return impossible("Supplementation requires an NNC or VNC principal Result.");
        }
        if (principal.captured && !principal.supplementableHeadPresent) {
          return impossible("An impersonal subject has no referent to supplement.");
        }
      } else if (relation === "deleted-principal") {
        if (
          (principal.captured && !["nnc", "vnc"].includes(principal.unitKind))
          || (dependent.captured && dependent.unitKind !== "vnc")
          || (adjoined.captured && !clauseKinds.includes(adjoined.unitKind))
        ) {
          return impossible("Principal deletion requires a typed adverbial or speech Result, a VNC deleted principal, and a typed supplement.");
        }
      } else if (relation === "vocative") {
        if (
          principal.captured
          && (
            principal.unitKind !== "nnc"
            || (principal.subjectPerson && principal.subjectPerson !== "3")
          )
        ) {
          return impossible("A real vocative requires a third-person NNC Result.");
        }
      } else if (relation === "negative-ac-plural") {
        if (principal.captured && principal.unitKind !== "vnc") {
          return impossible("Negative ac plural requires a VNC Result.");
        }
        if (
          principal.captured
          && !capturedNegativeAcPluralSourceAuthorized("principal")
        ) {
          return impossible(
            "Negative ac plural requires the exact plural ā preterit Result.",
          );
        }
      } else if (relation === "contextual-first-person-realization") {
        // The existing owner reads the actual target slot. A derived reflexive
        // can retain an intransitive analytical Source as retired provenance.
        if (principal.captured && !capturedContextualFirstPersonSourceAuthorized("principal")) {
          return impossible("Contextual first-person realization requires an owner-licensed first-person reflexive VNC Result.");
        }
      } else if (relation === "rumored-report") {
        if (
          principal.captured
          && (
            principal.unitKind !== "vnc"
            || (principal.sourceStem && principal.sourceStem !== "il")
            || (principal.tense && principal.tense !== "preterit")
            || (principal.subjectPerson && principal.subjectPerson !== "3")
            || (
              principal.subjectNumber
              && principal.subjectNumber !== "singular"
            )
          )
        ) {
          return impossible(
            "Rumored report requires the captured owner-issued quil principal.",
          );
        }
      }
      return Object.freeze({ impossible: false, reason: "" });
    }

    function getRelationEntryRequirement(relation = "", adverbial = false) {
      if (adverbial) {
        return Object.freeze({ all: freezeArray(["principal", "adjoined"]) });
      }
      if ([
        ADJECTIVAL_MODIFICATION_RELATION,
        "object-complement",
        "subject-complement",
        "adverbial-complement",
        "correlative-conjunction",
        "lexical-conjunction",
        "parallel-structure",
        "supplementation",
        "rumored-report",
      ].includes(relation)) {
        return Object.freeze({ all: freezeArray(["principal", "adjoined"]) });
      }
      if (relation === "deleted-principal") {
        return Object.freeze({
          all: freezeArray(["principal", "adjoined", "dependent"]),
        });
      }
      if ([
        "conjunction",
        COMPARISON_RELATION,
        "vocative",
        "negative-ac-plural",
        "contextual-first-person-realization",
      ].includes(relation)) {
        return Object.freeze({ all: freezeArray(["principal"]) });
      }
      if (relation === "exclamatory-utterance") {
        return Object.freeze({
          any: freezeArray(["principal", "adjoined", "dependent", "supplement", "marker"]),
        });
      }
      if (relation === "such-that-adjunction") {
        const principalParticleId = getValidatedCapture("principal")
          ?.canonicalResult?.particleId || "";
        return Object.freeze({ all: freezeArray(
          ["l58-quemah", "l58-quemahca"].includes(principalParticleId)
            ? ["principal"] : ["principal", "adjoined", "marker"],
        ) });
      }
      return Object.freeze({ all: freezeArray(["principal", "adjoined"]) });
    }

    function issueRelationAvailabilityContract() {
      const principal = getCapturedRelationSourceFacts("principal");
      const adjoined = getCapturedRelationSourceFacts("adjoined");
      const dependent = getCapturedRelationSourceFacts("dependent");
      const marker = getCapturedRelationSourceFacts("marker");
      const capturedRoles = new Set(
        CAPTURE_ROLES.filter(role => getValidatedCapture(role)),
      );
      const adverbialRelations = getInstalledAdverbialRelationValues();
      const adverbialRelationSet = new Set(adverbialRelations);
      const adjunctionAvailability =
        typeof targetObject.issueAdverbialAdjunctionAvailabilityContract
          === "function"
          ? targetObject.issueAdverbialAdjunctionAvailabilityContract({
            principalClause:
              getValidatedCapture("principal")?.canonicalResult || null,
            adjoinedUnit:
              getValidatedCapture("adjoined")?.canonicalResult || null,
          })
          : null;
      const adjunctionAvailabilityVerified = Boolean(
        typeof targetObject.isAdverbialAdjunctionAvailabilityContract
          === "function"
        && targetObject.isAdverbialAdjunctionAvailabilityContract(
          adjunctionAvailability,
        )
        && adjunctionAvailability.authorizationStatus === "authorized",
      );
      const ownerAvailableAdverbialRelations = new Set(
        adjunctionAvailabilityVerified
          ? adjunctionAvailability.availableRelations
          : [],
      );
      const options = freezeArray(unique([
        ...NON_ADJUNCTION_RELATIONS,
        ...adverbialRelations,
      ]).map(relation => {
        const adverbial = adverbialRelationSet.has(relation);
        const requirement = getRelationEntryRequirement(relation, adverbial);
        const requiredCaptureRoles = Array.from(requirement.all || []);
        const missingCaptureRoles = requiredCaptureRoles.filter(
          role => !capturedRoles.has(role),
        );
        const anyCaptureSatisfied = !requirement.any?.length
          || requirement.any.some(role => capturedRoles.has(role));
        const sourceImpossibility = getRelationSourceImpossibility(
          relation,
          principal,
          adjoined,
          dependent,
        );
        if (sourceImpossibility.impossible) {
          return buildRelationAvailabilityOption({
            value: relation,
            status: RELATION_AVAILABILITY.INCOMPATIBLE,
            reasonCode: `classical-clause-relation-${relation}-source-incompatible`,
            recovery: sourceImpossibility.reason,
            requiredCaptureRoles,
          });
        }
        if (missingCaptureRoles.length || !anyCaptureSatisfied) {
          const missing = missingCaptureRoles.length
            ? missingCaptureRoles
            : ["principal"];
          return buildRelationAvailabilityOption({
            value: relation,
            status: RELATION_AVAILABILITY.MISSING_PREREQUISITE,
            reasonCode: `classical-clause-relation-${relation}-capture-required`,
            recovery: requirement.any?.length
              ? "Capture at least one owner-issued VNC or NNC Result first."
              : `Capture ${missing.join(" and ")} Result${missing.length === 1 ? "" : "s"} first.`,
            requiredCaptureRoles,
            missingCaptureRoles: missing,
          });
        }
        if (adverbial && !ownerAvailableAdverbialRelations.has(relation)) {
          return buildRelationAvailabilityOption({
            value: relation,
            status: RELATION_AVAILABILITY.INCOMPATIBLE,
            reasonCode: `classical-clause-relation-${relation}-owner-incompatible`,
            recovery:
              "The owner-issued adjunction contract does not license this relation for the captured Results.",
            requiredCaptureRoles,
            ownerEvidenceKind: adjunctionAvailabilityVerified
              ? "adverbial-adjunction-availability-contract"
              : "missing-adverbial-adjunction-availability-contract",
          });
        }
        if (
          adverbial
          && ["condition", "concession"].includes(relation)
          && !capturedRoles.has("marker")
          && !(
            relation === "condition"
            && getSourceUnit("adjoined")?.features?.conditionalCue === true
          )
        ) {
          return buildRelationAvailabilityOption({
            value: relation,
            status: RELATION_AVAILABILITY.MISSING_PREREQUISITE,
            reasonCode: `classical-clause-relation-${relation}-marker-required`,
            recovery: `Capture the owner-issued ${relation === "condition" ? "tla" : "concessive"} particle as marker.`,
            requiredCaptureRoles: freezeArray(["principal", "adjoined", "marker"]),
            missingCaptureRoles: freezeArray(["marker"]),
            ownerEvidenceKind: "adverbial-adjunction-owner",
          });
        }
        if (
          adverbial
          && relation === "proviso"
          && adjoined.negativizedParticle !== "ahzo"
          && marker.negativizedParticle !== "ahzo"
          && marker.markerProfile !== "ahzo"
        ) {
          return buildRelationAvailabilityOption({
            value: relation,
            status: capturedRoles.has("marker")
              ? RELATION_AVAILABILITY.INCOMPATIBLE
              : RELATION_AVAILABILITY.MISSING_PREREQUISITE,
            reasonCode: "classical-clause-relation-proviso-negativized-ahzo-required",
            recovery: capturedRoles.has("marker")
              ? "Replace the marker with the owner-issued negativized ahzo Result."
              : "Capture the owner-issued negativized ahzo Result as marker.",
            requiredCaptureRoles: freezeArray(["principal", "adjoined", "marker"]),
            missingCaptureRoles: capturedRoles.has("marker")
              ? freezeArray([])
              : freezeArray(["marker"]),
            ownerEvidenceKind: "adverbial-adjunction-owner",
          });
        }
        if (
          adverbial
          && relation === "consequence"
          && adjoined.adverbialCenter !== "iuh"
        ) {
          return buildRelationAvailabilityOption({
            value: relation,
            status: RELATION_AVAILABILITY.INCOMPATIBLE,
            reasonCode: "classical-clause-relation-consequence-iuh-required",
            recovery: "Replace the adjoined capture with the typed adverbial iuh Result.",
            requiredCaptureRoles,
            ownerEvidenceKind: "adverbial-adjunction-owner",
          });
        }
        if (
          adverbial
          && relation === "reason"
          && getSourceUnit("adjoined")?.unitType !== "sentence"
        ) {
          return buildRelationAvailabilityOption({
            value: relation,
            status: RELATION_AVAILABILITY.INCOMPATIBLE,
            reasonCode: "classical-clause-relation-reason-sentence-required",
            recovery: "Replace the adjoined capture with a sentence Result.",
            requiredCaptureRoles: freezeArray(["principal", "adjoined", "marker"]),
            ownerEvidenceKind: "adverbial-adjunction-owner",
          });
        }
        if (adverbial && relation === "reason" && !capturedRoles.has("marker")) {
          return buildRelationAvailabilityOption({
            value: relation,
            status: RELATION_AVAILABILITY.MISSING_PREREQUISITE,
            reasonCode: "classical-clause-relation-reason-marker-required",
            recovery: "Capture the owner-issued ca particle as marker.",
            requiredCaptureRoles: freezeArray(["principal", "adjoined", "marker"]),
            missingCaptureRoles: freezeArray(["marker"]),
            ownerEvidenceKind: "adverbial-adjunction-owner",
          });
        }
        if (
          adverbial
          && relation === "reason"
          && marker.markerProfile !== "ca"
        ) {
          return buildRelationAvailabilityOption({
            value: relation,
            status: RELATION_AVAILABILITY.INCOMPATIBLE,
            reasonCode: "classical-clause-relation-reason-ca-marker-required",
            recovery: "Replace the marker capture with the owner-issued ca particle.",
            requiredCaptureRoles: freezeArray(["principal", "adjoined", "marker"]),
            ownerEvidenceKind: "adverbial-adjunction-owner",
          });
        }
        if (relation === "vocative") {
          const context = getDiscourseSourceContextFrame("principal");
          if (!context || !["male", "female"].includes(context.speakerGender)) {
            return buildRelationAvailabilityOption({
              value: relation,
              status: RELATION_AVAILABILITY.MISSING_PREREQUISITE,
              reasonCode: "classical-clause-relation-vocative-discourse-context-required",
              recovery: "Capture the NNC as principal with male or female speaker context.",
              requiredCaptureRoles,
            });
          }
        }
        if (
          relation === "negative-ac-plural"
          && !capturedNegativeAcPluralSourceAuthorized("principal")
        ) {
          return buildRelationAvailabilityOption({
            value: relation,
            status: RELATION_AVAILABILITY.INCOMPATIBLE,
            reasonCode: "classical-clause-relation-negative-ac-plural-source-incompatible",
            recovery: "Replace the principal capture with the exact plural ā preterit VNC Result.",
            requiredCaptureRoles,
          });
        }
        if (
          relation === "contextual-first-person-realization"
          && !capturedContextualFirstPersonSourceAuthorized("principal")
        ) {
          return buildRelationAvailabilityOption({
            value: relation,
            status: RELATION_AVAILABILITY.INCOMPATIBLE,
            reasonCode: "classical-clause-relation-contextual-first-person-source-incompatible",
            recovery: "Replace the principal capture with a first-person reflexive VNC Result.",
            requiredCaptureRoles,
          });
        }
        return buildRelationAvailabilityOption({
          value: relation,
          status: RELATION_AVAILABILITY.AVAILABLE,
          reasonCode: `classical-clause-relation-${relation}-available`,
          recovery: relation === COMPARISON_RELATION
            ? "Choose a comparison route next."
            : "",
          requiredCaptureRoles,
          ownerEvidenceKind: adverbial
            ? "adverbial-adjunction-availability-contract"
            : "typed-capture-preflight",
        });
      }));
      const contract = Object.freeze({
        kind: "classical-clause-relation-availability-contract",
        version: CONTROLLER_VERSION,
        captureRevision,
        authorizationStatus: "authorized",
        relations: options,
        availableRelations: freezeArray(
          options
            .filter(option => (
              option.status === RELATION_AVAILABILITY.AVAILABLE
            ))
            .map(option => option.value),
        ),
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        lessonMetadataAuthority: false,
        storedStateAuthority: false,
      });
      issuedRelationAvailabilityContracts.add(contract);
      return contract;
    }

    function isRelationAvailabilityContract(contract = null) {
      return Boolean(
        contract
        && issuedRelationAvailabilityContracts.has(contract)
        && contract.kind === "classical-clause-relation-availability-contract"
        && contract.version === CONTROLLER_VERSION
        && contract.captureRevision === captureRevision
        && contract.authorizationStatus === "authorized"
        && Array.isArray(contract.relations)
        && Array.isArray(contract.availableRelations),
      );
    }

    function getActiveMarkerProfilesForRelation(relation = "") {
      const profiles = getClassicalClauseRelationMarkerProfiles(relation);
      if (normalizeToken(relation) !== "proviso") return profiles;
      const adjoined = getSourceUnit("adjoined");
      return adjoined?.ok && adjoined.features?.negativizedParticle === "ahzo"
        ? freezeArray([...profiles, "in"]) : profiles;
    }

    function buildDecisionContractUnprojected(selections = {}) {
      const selectionObject = selections && typeof selections === "object"
        && !Array.isArray(selections)
        ? selections
        : {};
      const forbiddenKeys = FORBIDDEN_AUTHORITY_KEYS.filter(key => (
        Object.prototype.hasOwnProperty.call(selectionObject, key)
      ));
      const unknownKeys = Object.keys(selectionObject).filter(key => (
        !ALLOWED_SELECTION_KEYS.includes(key)
      ));
      const principalCapture = getValidatedCapture("principal");
      const adjoinedCapture = getValidatedCapture("adjoined");
      const dependentCapture = getValidatedCapture("dependent");
      const markerCapture = getValidatedCapture("marker");
      const principalSource = getSourceUnit("principal");
      const adjoinedSource = getSourceUnit("adjoined");
      const dependentSource = getSourceUnit("dependent");
      const markerSource = getSourceUnit("marker");
      const diagnostics = [];
      if (forbiddenKeys.length) {
        diagnostics.push(`classical-clause-relation-forbidden-authority:${forbiddenKeys[0]}`);
      }
      if (unknownKeys.length) {
        diagnostics.push(`classical-clause-relation-selection-not-recognized:${unknownKeys[0]}`);
      }
      const relationAvailability = issueRelationAvailabilityContract();
      const relationOptions = relationAvailability.relations;
      const relationValues = relationOptions.map(option => option.value);
      const availableRelationValues = relationAvailability.availableRelations;
      const requestedRelation = normalizeToken(selectionObject.relation);
      const requestedRelationOption = relationOptions.find(option => (
        option.value === requestedRelation
      )) || null;
      const relation = (
        availableRelationValues.includes(requestedRelation)
        || (
          requestedRelationOption?.status
            === RELATION_AVAILABILITY.MISSING_PREREQUISITE
          && requestedRelationOption.missingCaptureRoles.length > 0
        )
      )
        ? requestedRelation
        : "";
      const decisions = [];
      decisions.push(buildDecision({
        id: "relation",
        values: relationValues,
        selectedValue: relation,
        reason: "semantic relation between the two captured canonical results",
        optionAvailability: relationOptions,
      }));
      if (requestedRelation && !relation) {
        diagnostics.push(
          requestedRelationOption?.reasonCode
          || "classical-clause-relation-not-recognized",
        );
        return Object.freeze({
          kind: "classical-clause-relation-decision-contract",
          version: CONTROLLER_VERSION,
          authorizationStatus: "blocked",
          blockReason: diagnostics[0],
          diagnostics: freezeArray(unique(diagnostics)),
          decisions: freezeArray(decisions),
          unresolvedDecisionIds: freezeArray(["relation"]),
          relation: "",
          rejectedRelation: requestedRelation,
          recovery: requestedRelationOption?.recovery
            || "Choose an available relation.",
          relationAvailabilityContract: relationAvailability,
          userSelectableFieldIds: freezeArray(["relation"]),
          derivedFieldIds: freezeArray([]),
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
          lessonMetadataAuthority: false,
          storedStateAuthority: false,
        });
      }
      if (COMPLEMENT_OPERATION_KINDS.includes(relation)) {
        return buildComplementDecisionContract({
          selectionObject,
          relation,
          decisions,
          diagnostics,
        });
      }
      if (CONJUNCTION_OPERATION_KINDS.includes(relation)) {
        return buildConjunctionDecisionContract({
          selectionObject,
          relation,
          decisions,
          diagnostics,
        });
      }
      if (relation === COMPARISON_RELATION) {
        return buildComparisonDecisionContract({
          selectionObject,
          relation,
          decisions,
          diagnostics,
        });
      }
      if (SUPPLEMENTATION_RELATIONS.includes(relation)) {
        return buildSupplementationDecisionContract({
          selectionObject,
          relation,
          decisions,
          diagnostics,
        });
      }
      if (!principalCapture || !principalSource?.ok) {
        diagnostics.push("classical-clause-relation-principal-capture-required");
      }
      if (!adjoinedCapture || !adjoinedSource?.ok) {
        diagnostics.push("classical-clause-relation-adjoined-capture-required");
      }

      if (relation === ADJECTIVAL_MODIFICATION_RELATION) {
        const ownerAxes =
          typeof targetObject.getClassicalNahuatlLcmAxes
            === "function"
            ? targetObject.getClassicalNahuatlLcmAxes()
            : [];
        const ownerAxisValues = axisId => {
          const axis = ownerAxes.find(item => item?.id === axisId);
          return Array.isArray(axis?.values)
            ? axis.values.map(normalizeToken).filter(Boolean)
            : [];
        };
        const topologyValues = ownerAxisValues(
          "modification-topology",
        );
        if (!topologyValues.length) {
          diagnostics.push(
            "classical-adjectival-modification-owner-axis-capability-required",
          );
        }
        const requestedTopology = normalizeToken(selectionObject.topology);
        const topology = topologyValues.includes(
          requestedTopology,
        )
          ? requestedTopology
          : "";
        decisions.push(buildDecision({
          id: "topology",
          values: topologyValues,
          selectedValue: topology,
          reason: "semantic topology of the captured head and modifier Results",
        }));
        if (requestedTopology && !topology) {
          diagnostics.push(
            "classical-adjectival-modification-topology-not-recognized",
          );
        }

        const dependentRequired = [
          "cooperating-preposed-nonpreposed",
          "discontinuous",
        ].includes(topology);
        if (
          dependentRequired
          && (!dependentCapture || !dependentSource?.ok)
        ) {
          diagnostics.push(
            "classical-adjectival-modification-dependent-capture-required",
          );
        }

        const orderValues = getAdjectivalModificationOrderValues(
          topology,
          ownerAxisValues("modifier-head-order"),
        );
        const requestedOrder = normalizeToken(selectionObject.order);
        const derivedOrder = getDerivedAdjectivalModificationOrder(topology);
        const order = orderValues.length
          ? orderValues.includes(requestedOrder) ? requestedOrder : ""
          : derivedOrder;
        if (orderValues.length) {
          decisions.push(buildDecision({
            id: "order",
            values: orderValues,
            selectedValue: order,
            reason:
              topology === "ordinary"
                ? "the modifier may follow its head or be preposed"
                : "the discontinuous modifier may precede or follow its head",
          }));
        }
        if (
          requestedOrder
          && (
            orderValues.length
              ? !orderValues.includes(requestedOrder)
              : requestedOrder !== derivedOrder
          )
        ) {
          diagnostics.push(
            "classical-adjectival-modification-order-not-licensed",
          );
        }

        const requestedAdjunctor = normalizeToken(
          selectionObject.modifierAdjunctor,
        );
        const adjunctorValues =
          getAdjectivalModificationAdjunctorValues(
            topology,
            ownerAxisValues("adjunctor"),
          );
        const adjunctor = adjunctorValues.includes(requestedAdjunctor)
          ? requestedAdjunctor
          : "";
        decisions.push(buildDecision({
          id: "modifier-adjunctor",
          values: adjunctorValues,
          selectedValue: adjunctor,
          reason:
            topology === "cooperating-preposed-nonpreposed"
              ? "the preposed and nonpreposed modifiers may each independently be introduced by in"
              : "the clausal modifier may be unmarked or introduced by in",
        }));
        if (requestedAdjunctor && !adjunctor) {
          diagnostics.push(
            "classical-adjectival-modification-adjunctor-not-licensed",
          );
        }

        const modifierClauseType = getAdjectivalModifierClauseType(
          adjoinedSource,
          adjoinedCapture,
          targetObject,
        );
        const transitiveContactRequired =
          modifierClauseType === "transitive-vnc";
        const requestedLinkRole = normalizeToken(selectionObject.linkKind);
        const modifierContacts = targetObject.getClassicalNahuatlAdjectivalModifierReferenceContacts?.(
          adjoinedCapture?.canonicalResult,
          {order, topology},
        ) || [];
        const preposedSupplementation = modifierClauseType === "supplementation-structure"
          && (order === "modifier-head-preposed" || topology === "cooperating-preposed-nonpreposed");
        const followingPossessorChoice = !preposedSupplementation
          && modifierContacts.includes("supplement-possessor");
        const supplementationPossessorContact = (preposedSupplementation
            || followingPossessorChoice && requestedLinkRole === "supplement-possessor")
          && modifierContacts.includes("supplement-possessor")
          ? targetObject.getClassicalNahuatlAdjectivalSupplementationPossessorContactFrame?.(
              principalCapture?.canonicalResult, adjoinedCapture?.canonicalResult
            ) : null;
        if (preposedSupplementation && !supplementationPossessorContact) {
          diagnostics.push("classical-adjectival-modification-preposed-supplementation-contact-unavailable");
        } else if (supplementationPossessorContact?.headSubjectMatchesPossessor !== undefined
          && supplementationPossessorContact.headSubjectMatchesPossessor !== true) {
          diagnostics.push("classical-adjectival-modification-supplement-possessor-reference-mismatch");
        }
        const transitiveContactValues = ownerAxisValues(
          "transitive-reference-contact",
        ).filter(value => value !== "not-applicable" && modifierContacts.includes(value));
        const linkRole = transitiveContactRequired
          ? transitiveContactValues.includes(requestedLinkRole)
            ? requestedLinkRole
            : ""
          : supplementationPossessorContact ? "supplement-possessor"
          : followingPossessorChoice ? requestedLinkRole === "shared-subject" ? "shared-subject" : "" : "shared-subject";
        if (followingPossessorChoice) {
          decisions.push(buildDecision({id: "link-kind", values: ["shared-subject", "supplement-possessor"], selectedValue: linkRole,
            reason: "the following whole description contacts the head through its subject or its authenticated inner possessor"}));
        }
        if (transitiveContactRequired) {
          decisions.push(buildDecision({
            id: "link-kind",
            values: transitiveContactValues,
            selectedValue: linkRole,
            reason:
              "a transitive VNC modifier contacts the head through its subject or its specific object",
          }));
        } else if (
          requestedLinkRole
          && requestedLinkRole !== linkRole
        ) {
          diagnostics.push(
            "classical-adjectival-modification-link-role-not-applicable",
          );
        }
        const adjoinedFunction = principalSource?.features?.unitKind === "nnc"
          && modifierContacts.includes(linkRole) ? "adjectival-modifier" : "";
        if (adjoinedFunction) {
          const requestedFunction = normalizeToken(selectionObject.adjoinedFunction);
          decisions.push(buildDecision({id:"adjoined-function", values:[adjoinedFunction],
            selectedValue:requestedFunction || adjoinedFunction,
            inventoryFieldRef:"clause-choice:clause:composition:adjoined-function",
            reason:"the canonical nominal head and modifier contact determine the adjectival-modifier function"}));
          if (requestedFunction && requestedFunction !== adjoinedFunction)
            diagnostics.push("classical-adjectival-modification-adjoined-function-not-licensed");
        } else if (normalizeToken(selectionObject.adjoinedFunction)) {
          diagnostics.push("classical-adjectival-modification-adjoined-function-contact-required");
        }
        const dependentModifierClauseType =
          topology === "cooperating-preposed-nonpreposed"
            ? getAdjectivalModifierClauseType(
                dependentSource,
                dependentCapture,
                targetObject,
              )
            : "";
        const dependentTransitiveContactRequired =
          dependentModifierClauseType === "transitive-vnc";
        const requestedDependentLinkRole = normalizeToken(
          selectionObject.dependentLinkKind,
        );
        const dependentContacts = targetObject.getClassicalNahuatlAdjectivalModifierReferenceContacts?.(
          dependentCapture?.canonicalResult,
        ) || [];
        const dependentTransitiveContactValues = ownerAxisValues(
          "transitive-reference-contact",
        ).filter(value => value !== "not-applicable" && dependentContacts.includes(value));
        const dependentLinkRole = dependentTransitiveContactRequired
          ? dependentTransitiveContactValues.includes(
              requestedDependentLinkRole,
            )
            ? requestedDependentLinkRole
            : ""
          : "shared-subject";
        if (dependentTransitiveContactRequired) {
          decisions.push(buildDecision({
            id: "dependent-link-kind",
            values: dependentTransitiveContactValues,
            selectedValue: dependentLinkRole,
            reason:
              "a cooperating transitive modifier independently contacts the head through its subject or its specific object",
          }));
        } else if (
          requestedDependentLinkRole
          && requestedDependentLinkRole !== "shared-subject"
        ) {
          diagnostics.push(
            "classical-adjectival-modification-dependent-link-role-not-applicable",
          );
        }

        const compoundHead = isAdjectivalCompoundHead(principalCapture, targetObject);
        const requestedCompoundHeadTarget = normalizeToken(
          selectionObject.compoundHeadTarget,
        );
        const compoundHeadTargetValues = ownerAxisValues(
          "compound-head-target",
        ).filter(value => value !== "simple-head");
        const compoundHeadTarget = compoundHead
          ? compoundHeadTargetValues.includes(
              requestedCompoundHeadTarget,
            )
              ? requestedCompoundHeadTarget
              : ""
          : "simple-head";
        if (compoundHead) {
          decisions.push(buildDecision({
            id: "compound-head-target",
            values: compoundHeadTargetValues,
            selectedValue: compoundHeadTarget,
            reason:
              "the modifier relates to the compound matrix or to the metaphorically distant compound as a whole",
          }));
        } else if (
          requestedCompoundHeadTarget
          && requestedCompoundHeadTarget !== "simple-head"
        ) {
          diagnostics.push(
            "classical-adjectival-modification-compound-target-not-applicable",
          );
        }

        const unresolvedDecisionIds = decisions
          .filter(decision => decision.required && !decision.resolved)
          .map(decision => decision.id);
        if (unresolvedDecisionIds.length) {
          diagnostics.push(
            `classical-clause-relation-decision-required:${unresolvedDecisionIds[0]}`,
          );
        }

        const principalIsComposition =
          principalSource?.sourceKind === "composition-ast";
        const adjoinedIsComposition =
          adjoinedSource?.sourceKind === "composition-ast";
        const dependentIsComposition =
          dependentSource?.sourceKind === "composition-ast";
        const recursion = principalIsComposition
          || adjoinedIsComposition
          || (dependentRequired && dependentIsComposition)
          ? "one-or-more"
          : "zero";
        const headLayer = principalCapture?.canonicalResult || null;
        const retainedHeadIn = topology === "ordinary"
          && order === "modifier-head-preposed"
          && targetObject.isClassicalNahuatlIssuedParticleSentenceLayerFrame?.(headLayer) === true
          && targetObject.isClassicalNahuatlParticleResultFrame?.(headLayer.particleResultFrame) === true
          && headLayer.particleResultFrame.semanticMarker === "in";
        const scope = (
          order === "modifier-head-preposed"
          && adjunctor === "in"
        ) || (
          topology === "cooperating-preposed-nonpreposed"
          && ["preposed-in", "both-in"].includes(adjunctor)
        ) || retainedHeadIn
          ? "adjoined-unit"
          : "complete-sentence";
        const ambiguityType = (
          transitiveContactRequired && transitiveContactValues.length > 1
          || dependentTransitiveContactRequired && dependentTransitiveContactValues.length > 1
        )
          ? "transitive-subject-or-object-contact"
          : "structural-apposition";
        const derived = Object.freeze({
          unitType: String(adjoinedSource?.features?.unitKind || ""),
          mood: adjoinedSource?.features?.mood || "",
          tense: adjoinedSource?.features?.tense || "",
          antecessive: adjoinedSource?.features?.antecessive === true,
          futureEmbed: principalSource?.features?.futureEmbed === true,
          structureKind: recursion === "zero" ? "simple" : "complex",
          recursion,
          order,
          marking: adjunctor === "none" ? "unmarked" : "marked",
          topology,
          modifierClauseType,
          adjoinedFunction,
          supplementationPossessorContact,
          scope,
          retainedHeadMarker: retainedHeadIn ? "in" : "",
          retainedHeadMarkerOrigin: retainedHeadIn ? "owner-issued-head-layer" : "",
          linkRole,
          dependentModifierClauseType,
          dependentLinkRole,
          compoundHeadTarget,
          ambiguityType,
          adjunctor,
          dependentRequired,
          principalSourceKind: principalSource?.sourceKind || "",
          adjoinedSourceKind: adjoinedSource?.sourceKind || "",
          dependentSourceKind: dependentSource?.sourceKind || "",
        });

        return Object.freeze({
          kind: "classical-clause-relation-decision-contract",
          version: CONTROLLER_VERSION,
          authorizationStatus: diagnostics.length ? "blocked" : "authorized",
          blockReason: diagnostics[0] || "",
          diagnostics: freezeArray(unique(diagnostics)),
          decisions: freezeArray(decisions),
          unresolvedDecisionIds: freezeArray(unresolvedDecisionIds),
          relation,
          degree: "",
          relationProfile: "",
          structureProfile: "modification",
          markerProfile: "unmarked",
          topology,
          derived,
          userSelectableFieldIds: freezeArray(
            decisions.map(decision => decision.id),
          ),
          derivedFieldIds: Object.freeze([
            "unit-type",
            "mood",
            "tense",
            "antecessive",
            "future-embed",
            "structure",
            "recursion",
            ...(orderValues.length ? [] : ["order"]),
            "modifier-clause-type",
            "scope",
            ...(transitiveContactRequired ? [] : ["link-role"]),
            ...(dependentTransitiveContactRequired
              ? []
              : ["dependent-link-role"]),
            ...(compoundHead ? [] : ["compound-head-target"]),
            "ambiguity-type",
            "dependent-required",
          ]),
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
          lessonMetadataAuthority: false,
          storedStateAuthority: false,
        });
      }

      const adjunctionAvailability =
        typeof targetObject.issueAdverbialAdjunctionAvailabilityContract
          === "function"
          ? targetObject.issueAdverbialAdjunctionAvailabilityContract({
            principalClause: principalCapture?.canonicalResult || null,
            adjoinedUnit: adjoinedCapture?.canonicalResult || null,
            markerUnit: markerCapture?.canonicalResult || null,
          })
          : null;
      const adjunctionAvailabilityVerified = Boolean(
        typeof targetObject.isAdverbialAdjunctionAvailabilityContract
          === "function"
        && targetObject.isAdverbialAdjunctionAvailabilityContract(
          adjunctionAvailability,
        )
        && adjunctionAvailability.authorizationStatus === "authorized",
      );
      const relationalNumeralCoCFixedProfile = Boolean(
        adjunctionAvailabilityVerified
        && typeof targetObject.isRelationalNumeralCoCAdjunctionContract
          === "function"
        && targetObject.isRelationalNumeralCoCAdjunctionContract(
          adjunctionAvailability.relationalNumeralCoCContract,
        )
        && adjunctionAvailability.relationalNumeralCoCContract
          .authorizationStatus === "authorized"
      );
      const intensityUse = adjunctionAvailabilityVerified
        && relation === "intensification"
        && adjunctionAvailability.intensityUse?.referenceHead === principalCapture?.canonicalResult
        && adjunctionAvailability.intensityUse?.exactAdverbResult === adjoinedCapture?.canonicalResult
          ? adjunctionAvailability.intensityUse : null;
      const unitType = String(adjoinedSource?.features?.unitKind || "");
      const degreeValues = (
        adjunctionAvailabilityVerified
        && typeof targetObject.getAdverbialAdjunctionRanksFromAvailability
          === "function"
      )
        ? targetObject.getAdverbialAdjunctionRanksFromAvailability(
          adjunctionAvailability,
          relation,
        )
        : [];
      const requestedDegree = normalizeToken(selectionObject.degree);
      const degree = degreeValues.length === 1
        ? degreeValues[0]
        : degreeValues.includes(requestedDegree) ? requestedDegree : "";
      if (degreeValues.length > 1) {
        decisions.push(buildDecision({
          id: "degree",
          values: degreeValues,
          selectedValue: degree,
          reason: "captured NNC can support more than one licensed adverbial rank",
        }));
      }
      if (degreeValues.length === 0 && relation) {
        diagnostics.push("classical-clause-relation-degree-not-licensed-for-captured-unit");
      } else if (requestedDegree && !degreeValues.includes(requestedDegree)) {
        diagnostics.push("classical-clause-relation-degree-not-licensed");
      }

      const principalIsComposition = principalSource?.sourceKind === "composition-ast";
      const adjoinedIsComposition = adjoinedSource?.sourceKind === "composition-ast";
      const relationAllowsApposition = (
        !relationalNumeralCoCFixedProfile
        &&
        ["first", "second"].includes(degree)
        && ["place", "time"].includes(relation)
        && unitType === "nnc"
      );
      const relationAllowsAdverbialPrincipal = !relationalNumeralCoCFixedProfile
        && degree === "second" && unitType === "nnc"
        && ["place", "time", "manner"].includes(relation);
      // §49.8 includes first-degree NNCs (e.g. ātl) in place/time apposition.
      // Keep the independent principal-clause domain unchanged.
      const structureProfileValues = relationAllowsApposition || relationAllowsAdverbialPrincipal
        ? ["modification", ...(relationAllowsApposition ? ["apposition"] : []),
          ...(relationAllowsAdverbialPrincipal ? ["adverbial-principal"] : [])]
        : [];
      const requestedStructureProfile = normalizeToken(
        selectionObject.structureProfile,
      );
      const structureProfile = structureProfileValues.length
        ? structureProfileValues.includes(requestedStructureProfile)
          ? requestedStructureProfile
          : ""
        : "modification";
      if (structureProfileValues.length) {
        decisions.push(buildDecision({
          id: "structure-profile",
          values: structureProfileValues,
          selectedValue: structureProfile,
          reason: "choose whether the adverbial modifies, stands in apposition, or functions as principal",
        }));
      }
      if (
        requestedStructureProfile
        && !structureProfileValues.includes(requestedStructureProfile)
        && requestedStructureProfile !== "modification"
      ) {
        diagnostics.push("classical-clause-relation-structure-profile-not-licensed");
      }

      const recursion = structureProfile === "apposition"
        ? "appositive"
        : principalIsComposition && adjoinedIsComposition
          ? "both"
          : principalIsComposition
            ? "head"
            : adjoinedIsComposition
              ? "modifier"
              : "none";
      const requestedRecursion = normalizeToken(selectionObject.recursion);
      if (requestedRecursion && requestedRecursion !== recursion) {
        diagnostics.push("classical-clause-relation-derived-recursion-cannot-be-overridden");
      }
      const structureKind = structureProfile === "apposition"
        ? "apposition"
        : structureProfile === "adverbial-principal"
          ? "adverbial-principal"
        : degree === "nonadverbialized" || recursion !== "none"
          ? "complex"
          : "simple";

      const orderValues = !relation
        ? []
        : relationalNumeralCoCFixedProfile || intensityUse
          ? ["modifier-head"]
        : structureProfile === "adverbial-principal"
          ? ["principal-adverbial-head"]
        : structureProfile === "apposition"
          ? ["appositive-head-modifier"]
          : relation === "reason"
            ? ["head-modifier"]
            : ["modifier-head", "head-modifier"];
      if (relation === "place" && degree === "first"
        && adjoinedCapture?.canonicalResult?.operationKind === "adjectival-modification"
        && targetObject.getClassicalSupplementationIntervenerSource?.(adjoinedCapture.canonicalResult)
          === principalCapture?.canonicalResult) {
        orderValues.push("discontinuous");
      }
      const requestedOrder = normalizeToken(selectionObject.order);
      const order = orderValues.length === 1
        ? orderValues[0]
        : orderValues.includes(requestedOrder) ? requestedOrder : "";
      if (orderValues.length > 1) {
        decisions.push(buildDecision({
          id: "order",
          values: orderValues,
          selectedValue: order,
          reason: "both clause orders remain structurally licensed for this relation",
        }));
      }
      if (requestedOrder && !orderValues.includes(requestedOrder)) {
        diagnostics.push("classical-clause-relation-order-not-licensed");
      }

      const markerRelationalUse = markerCapture
        ? targetObject.getClassicalNahuatlParticleRelationalUse?.(markerCapture.canonicalResult) : null;
      const sourceRelationProfile = markerRelationalUse?.relation === relation
        && (!degree || markerRelationalUse.degree === degree) ? markerRelationalUse.relationProfile : "";
      const temporalEligibility = relation === "time"
        && (degree === "nonadverbialized" || requestedDegree === "nonadverbialized")
        && targetObject.isAdverbialAdjunctionAvailabilityContract?.(adjunctionAvailability) === true
        && adjunctionAvailability.temporalProfileEligibility?.principalClause === (principalCapture?.canonicalResult || null)
        && adjunctionAvailability.temporalProfileEligibility?.adjoinedUnit === (adjoinedCapture?.canonicalResult || null)
          ? adjunctionAvailability.temporalProfileEligibility : null;
      const relationProfileValues = sourceRelationProfile ? [sourceRelationProfile]
        : degree === "nonadverbialized" || temporalEligibility ? PROFILE_VALUES_BY_RELATION[relation] || [] : [];
      const requestedRelationProfile = normalizeToken(
        selectionObject.relationProfile,
      );
      const relationProfile = relationProfileValues.length === 1
        ? relationProfileValues[0]
        : relationProfileValues.includes(requestedRelationProfile)
          ? requestedRelationProfile
          : "";
      if (relationProfileValues.length > 1) {
        decisions.push(buildDecision({
          id: "relation-profile",
          values: relationProfileValues,
          selectedValue: relationProfile,
          reason: `the captured ${relation || "clause"} relation leaves a genuine profile choice`,
          optionAvailability: temporalEligibility ? temporalEligibility.profiles.map(entry => ({
            value: entry.profile, status: entry.status === "needs-capture" ? "missing-prerequisite" : entry.status,
            reasonCode: entry.blockReason,
            recovery: entry.status === "needs-capture" ? "Add the required Result."
              : entry.status === "incompatible" ? "Choose a compatible temporal construction." : "",
            requiredCaptureRoles: entry.requiredCaptureRoles,
            missingCaptureRoles: entry.missingCaptureRoles,
            ownerEvidenceKind: "temporal-profile-eligibility",
          })) : [],
        }));
      }
      if (
        requestedRelationProfile
        && !relationProfileValues.includes(requestedRelationProfile)
      ) {
        diagnostics.push("classical-clause-relation-profile-not-licensed");
      }
      if (temporalEligibility && relationProfile) {
        const eligibility = temporalEligibility.profiles.find(entry => entry.profile === relationProfile);
        if (eligibility?.status !== "available") diagnostics.push(eligibility?.blockReason
          || "adverbial-adjunction-time-profile-required");
      }

      const derivedMarkerProfile = markerCapture
        ? getOwnerTypedMarkerProfile(markerCapture.canonicalResult)
        : "unmarked";
      const markerProfileValues = markerCapture
        ? structureProfile === "adverbial-principal"
          ? ["in"]
          : getActiveMarkerProfilesForRelation(relation)
        : ["unmarked"];
      const requestedMarkerProfile = normalizeToken(selectionObject.markerProfile);
      const markerProfile = derivedMarkerProfile
        && markerProfileValues.includes(derivedMarkerProfile)
        ? derivedMarkerProfile
        : markerProfileValues.length === 1
          ? markerProfileValues[0]
          : markerProfileValues.includes(requestedMarkerProfile)
            ? requestedMarkerProfile
            : "";
      if (markerProfileValues.length > 1 && !derivedMarkerProfile) {
        decisions.push(buildDecision({
          id: "marker-profile",
          values: markerProfileValues,
          selectedValue: markerProfile,
          reason: "the captured particle result has more than one licensed clause-marker analysis",
        }));
      }
      if (
        requestedMarkerProfile
        && !markerProfileValues.includes(requestedMarkerProfile)
      ) {
        diagnostics.push("classical-clause-relation-marker-profile-not-licensed");
      }
      if (
        markerCapture
        && (!markerSource?.ok || markerSource.features?.unitKind !== "particle")
      ) {
        diagnostics.push("classical-clause-relation-canonical-marker-capture-required");
      }
      if (
        markerCapture
        && derivedMarkerProfile
        && !markerProfileValues.includes(derivedMarkerProfile)
      ) {
        diagnostics.push("classical-clause-relation-marker-not-licensed-for-relation");
      }
      if (
        ["condition", "concession", "reason"].includes(relation)
        && !markerCapture
        && !(
          relation === "condition"
          && adjoinedSource?.features?.conditionalCue === true
        )
      ) {
        diagnostics.push("classical-clause-relation-issued-marker-capture-required");
      }
      if (
        relation === "purpose"
        && ["ma-optative", "ma-admonitive-lest"].includes(relationProfile)
        && !markerCapture
      ) {
        diagnostics.push("classical-clause-relation-issued-marker-capture-required");
      }

      const unresolvedDecisionIds = decisions
        .filter(decision => decision.required && !decision.resolved)
        .map(decision => decision.id);
      if (unresolvedDecisionIds.length) {
        diagnostics.push(
          `classical-clause-relation-decision-required:${unresolvedDecisionIds[0]}`,
        );
      }

      const derived = Object.freeze({
        unitType,
        mood: adjoinedSource?.features?.mood || "",
        tense: adjoinedSource?.features?.tense || "",
        antecessive: adjoinedSource?.features?.antecessive === true,
        futureEmbed: principalSource?.features?.futureEmbed === true,
        structureKind,
        recursion,
        order,
        marking: markerProfile || "unmarked",
        relationalNumeralCoCFixedProfile,
        ...(intensityUse ? {intensifier: true, selectedUse: "intensifier"} : {}),
        principalSourceKind: principalSource?.sourceKind || "",
        adjoinedSourceKind: adjoinedSource?.sourceKind || "",
      });

      return Object.freeze({
        kind: "classical-clause-relation-decision-contract",
        version: CONTROLLER_VERSION,
        authorizationStatus: diagnostics.length ? "blocked" : "authorized",
        blockReason: diagnostics[0] || "",
        diagnostics: freezeArray(unique(diagnostics)),
        decisions: freezeArray(decisions),
        unresolvedDecisionIds: freezeArray(unresolvedDecisionIds),
        relation,
        degree,
        relationProfile,
        structureProfile,
        markerProfile: markerProfile || "unmarked",
        derived,
        intensityUse,
        temporalProfileEligibility: temporalEligibility,
        userSelectableFieldIds: freezeArray(decisions.map(decision => decision.id)),
        derivedFieldIds: Object.freeze([
          "unit-type",
          "mood",
          "tense",
          "antecessive",
          "future-embed",
          "structure",
          "recursion",
          ...(orderValues.length === 1 ? ["order"] : []),
          ...(sourceRelationProfile ? ["relation-profile"] : []),
          ...(markerProfileValues.length === 1 || derivedMarkerProfile
            ? ["marker-profile"]
            : []),
        ]),
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        lessonMetadataAuthority: false,
        storedStateAuthority: false,
      });
    }

    function buildDecisionContract(selections = {}) {
      let contract = buildDecisionContractUnprojected(selections);
      if (contract.relation === COMPARISON_RELATION
        && contract.authorizationStatus === "authorized") {
        let operation = null;
        let operationValidated = false;
        let failure = "classical-comparison-operation-preflight-capability-required";
        try {
          if (typeof targetObject.buildClassicalComparisonOperationFrame === "function"
            && typeof targetObject.isClassicalComparisonOperationFrame === "function") {
            operation = targetObject.buildClassicalComparisonOperationFrame(
              buildComparisonOperationRequest(contract)
            );
            operationValidated = targetObject.isClassicalComparisonOperationFrame(operation) === true;
            failure = operationValidated
              ? operation.blockReason || "classical-comparison-operation-preflight-blocked"
              : "classical-comparison-operation-preflight-validation-required";
          }
        } catch {
          failure = "classical-comparison-operation-preflight-threw";
        }
        if (!operationValidated || operation.authorizationStatus !== "authorized") {
          contract = Object.freeze({
            ...contract, authorizationStatus: "blocked", blockReason: failure,
            diagnostics: freezeArray(unique([
              ...contract.diagnostics,
              ...(operationValidated ? operation.diagnostics || [] : []),
              failure,
            ])),
          });
        }
      }
      // Ask the same canonical owner used by preview and Make about coupled
      // options. Completing each field alone is not grammatical readiness.
      if (contract.relation === "supplementation"
        && contract.operationSelections.supplementationReferenceMode === "shared"
        && contract.authorizationStatus === "authorized") {
        const key = `${captureRevision}:${JSON.stringify(contract.operationSelections)}`;
        if (supplementationReadinessPreview?.key !== key) {
          let failure = "classical-supplementation-preflight-blocked";
          try {
            const result = composeSupplementationRelation(contract, true, []);
            failure = result?.authorizationStatus === "authorized"
              ? "" : result?.blockReason || failure;
          } catch { failure = "classical-supplementation-preflight-threw"; }
          supplementationReadinessPreview = {key, failure};
        }
        const {failure} = supplementationReadinessPreview;
        if (failure) contract = Object.freeze({...contract, authorizationStatus: "blocked",
          blockReason: failure, diagnostics: freezeArray(unique([...contract.diagnostics, failure]))});
      }
      if (["conjunction","correlative-conjunction","lexical-conjunction","parallel-structure"].includes(contract.relation) && contract.authorizationStatus === "authorized") {
        const key = `${contract.relation}:${captureRevision}:${JSON.stringify(contract.operationSelections)}`;
        let failure = "classical-conjunction-preflight-capability-required";
        try {
          if (typeof targetObject.evaluateClassicalNahuatlClauseConjunction === "function") {
            if (conjunctionReadinessPreview?.key !== key) {
              conjunctionReadinessPreview = {key,
                result: targetObject.evaluateClassicalNahuatlClauseConjunction(buildConjunctionRequest(contract))};
            }
            const result = conjunctionReadinessPreview.result;
            failure = result?.authorizationStatus === "authorized"
              && targetObject.isClassicalNahuatlClauseConjunctionResultFrame?.(result) === true
              ? "" : result?.blockReason || "classical-conjunction-preflight-blocked";
          }
        } catch { failure = "classical-conjunction-preflight-threw"; }
        if (failure) contract = Object.freeze({...contract, authorizationStatus: "blocked",
          blockReason: failure, diagnostics: freezeArray(unique([...contract.diagnostics, failure]))});
      }
      if (contract.relation && !NON_ADJUNCTION_RELATIONS.includes(contract.relation)
        && contract.authorizationStatus === "authorized") {
        const key = `${captureRevision}:${JSON.stringify(selections)}`;
        if (adjunctionReadinessPreview?.key !== key) {
          let failure = "classical-adverbial-adjunction-preflight-capability-required";
          try {
            const result = targetObject.evaluateAdverbialAdjunction?.(buildAdjunctionRequest(contract));
            failure = targetObject.isAdverbialAdjunctionResult?.(result) === true
              && result.ok === true && result.supported === true
              ? "" : result?.diagnostics?.[0] || failure;
          } catch { failure = "classical-adverbial-adjunction-preflight-threw"; }
          adjunctionReadinessPreview = {key, failure};
        }
        if (adjunctionReadinessPreview.failure) contract = Object.freeze({...contract,
          authorizationStatus: "blocked", blockReason: adjunctionReadinessPreview.failure,
          diagnostics: freezeArray(unique([...contract.diagnostics, adjunctionReadinessPreview.failure]))});
      }
      const diagnostics = Array.isArray(contract?.diagnostics)
        ? contract.diagnostics
        : [];
      const missingCaptureRoles = CAPTURE_ROLES.filter(role => (
        diagnostics.some(diagnostic => {
          const reason = String(diagnostic || "");
          return reason.includes(`${role}-capture-required`)
            || (
              role === "marker"
              && reason.includes("issued-marker-capture-required")
            );
        })
      ));
      contract = Object.freeze({...contract, missingCaptureRoles: freezeArray(missingCaptureRoles)});
      if (isCurrentComparisonRoute(contract.derived?.comparisonRoute)) {
        const ownerContract = getCurrentComparisonOwnerContract(contract.derived.comparisonRoute, contract.operationSelections);
        const choices = resolveComparisonChoices(ownerContract, selections);
        if (ownerContract && choices) {
          const currentChoiceFrame = projectComparisonChoiceFrame({contract, ownerContract, choices,
            captureRevision, stagedRevision: choiceRevision,
            captures: Object.fromEntries(CAPTURE_ROLES.map(role=>[role, !!getValidatedCapture(role)]))});
          issuedChoiceFrames.set(currentChoiceFrame, {captureRevision, choiceRevision, signature:choiceSignature(selections)});
          contract = Object.freeze({...contract, currentChoiceFrame});
        }
      }
      if(["conjunction","correlative-conjunction","lexical-conjunction","parallel-structure"].includes(contract.relation)) {
        const correlative=contract.relation === "correlative-conjunction";
        const currentChoiceFrame=buildCurrentChoiceFrame({familyId:contract.relation,routeId:contract.relation,
          captureRevision,stagedRevision:choiceRevision,decisions:contract.decisions.filter(d=>d.id !== "relation"),
          inputs:CAPTURE_ROLES.map(role=>({role,presence:getValidatedCapture(role)?"captured":"missing",
            applicability:(contract.relation !== "conjunction" && ["supplement","marker"].includes(role)) || (contract.operationSelections.leftContextAbsent && ["adjoined","dependent"].includes(role))?"inactive":"relevant",
            required:role === "principal" || role === "adjoined" && !contract.operationSelections.leftContextAbsent})),
          facts:{...contract.derived,...(correlative ? Object.fromEntries((contract.derived.ownerFacts || []).map(fact=>[fact.key,fact.value])) : {})},outcome:{readyToMake:contract.authorizationStatus === "authorized",reasons:contract.diagnostics},
          provenance:{owner:"conjunction",sourceReferences:[({"conjunction":"Andrews §§52.1–52.4","correlative-conjunction":"Andrews §52.5","lexical-conjunction":"Andrews §52.6","parallel-structure":"Andrews §52.7"})[contract.relation]]}});
        issuedChoiceFrames.set(currentChoiceFrame,{captureRevision,choiceRevision,signature:choiceSignature(selections)});
        contract=Object.freeze({...contract,currentChoiceFrame});
      }
      if (["rumored-report","deleted-principal"].includes(contract.relation)) {
        const currentChoiceFrame=buildCurrentChoiceFrame({familyId:contract.relation,routeId:contract.relation,
          captureRevision,stagedRevision:choiceRevision,decisions:contract.decisions.filter(d=>d.id!=="relation"),
          inputs:CAPTURE_ROLES.map(role=>({role,presence:getValidatedCapture(role)?"captured":"missing",applicability:[...(contract.derived?.requiredCaptureRoles||[]),...(contract.derived?.optionalCaptureRoles||[])].includes(role)?"relevant":"inactive",required:(contract.derived?.requiredCaptureRoles||[]).includes(role)})),
          facts:contract.derived,outcome:{readyToMake:contract.authorizationStatus==="authorized",reasons:contract.diagnostics},
          provenance:{owner:"supplementation",sourceReferences:["Andrews §§19.3–19.6"]}});
        issuedChoiceFrames.set(currentChoiceFrame,{captureRevision,choiceRevision,signature:choiceSignature(selections)});
        contract=Object.freeze({...contract,currentChoiceFrame});
      }
      return contract;
    }

    function buildConjunctionRequest(contract) {
      const sharedReference = contract.relation === "lexical-conjunction"
        ? "lexical-conjunction-shared-referent"
        : contract.relation === "conjunction" && contract.operationSelections.contextualSilentFirstPerson === true
          ? "conjunction-first-person" : "";
      const conjunctRoles = contract.relation === "conjunction"
        && contract.operationSelections.leftContextAbsent === true
        ? ["principal"]
        : ["principal", "adjoined", "dependent"];
      const conjuncts = conjunctRoles
        .filter(role => Boolean(getValidatedCapture(role)))
        .map((role, index) => getCapturedCompositionNode(
          role,
          sharedReference || `conjunct-${index + 1}`,
        ));
      const sharedSupplement = getValidatedCapture("supplement")
        ? getCapturedCompositionNode(
            "supplement",
            sharedReference || "shared-supplement",
          )
        : null;
      const request = {
        operationKind: contract.relation,
        conjuncts,
        ...(contract.relation === "conjunction" && getValidatedCapture("marker")
          ? {conjunctorResult: getValidatedCapture("marker").canonicalResult} : {}),
        sharedSupplement,
        options: {
          ...contract.operationSelections,
        },
      };
      return request;
    }

    function buildCapturedClauseCompositionSourceFrame(
      role = "",
      referenceOptions = {},
    ) {
      if (
        typeof targetObject.buildClassicalNahuatlClauseCompositionSourceFrame
          !== "function"
      ) {
        return null;
      }
      const capture = getValidatedCapture(role);
      const ownerIssuedResult = capture?.canonicalResult || null;
      if (!ownerIssuedResult) return null;
      return targetObject.buildClassicalNahuatlClauseCompositionSourceFrame(
        ownerIssuedResult,
        referenceOptions,
      );
    }

    function buildComplementSourceFrames(contract = null) {
      const operationKind = contract?.derived?.operationKind || "";
      const semanticCategory =
        contract?.operationSelections?.semanticCategory || "";
      const linkKind = contract?.operationSelections?.linkKind || "";
      let principalOptions = {
        referenceId: "principal-subject",
        subjectReferenceId: "principal-subject",
        objectReferenceId: "complement-contact",
        possessorReferenceId: linkKind === "possessor-subject"
          ? "complement-contact"
          : "principal-possessor",
      };
      let complementOptions = {
        referenceId: "complement-contact",
        subjectReferenceId: "complement-contact",
        possessorReferenceId: "complement-contact",
      };
      if (operationKind === "subject-complement") {
        principalOptions = {
          referenceId: "subject-contact",
          subjectReferenceId: "subject-contact",
          objectReferenceId: "principal-object",
          possessorReferenceId: "principal-possessor",
        };
        const specialPossessorContact = [
          "embedded-possessor-cel",
          "embedded-possessor-el",
        ].includes(contract.operationSelections.contactKind);
        complementOptions = {
          referenceId: specialPossessorContact
            ? "complement-subject"
            : "subject-contact",
          subjectReferenceId: specialPossessorContact
            ? "complement-subject"
            : "subject-contact",
          possessorReferenceId: "subject-contact",
        };
      } else if (operationKind === "adverbial-complement") {
        const sharedSubject = ![
          "coverage",
          "relational-lexicalized",
        ].includes(semanticCategory);
        principalOptions = {
          referenceId: "adverbial-principal-subject",
          subjectReferenceId: "adverbial-principal-subject",
          objectReferenceId: "adverbial-principal-object",
          possessorReferenceId: "adverbial-principal-possessor",
        };
        complementOptions = {
          referenceId: sharedSubject
            ? "adverbial-principal-subject"
            : "adverbial-complement-referent",
          subjectReferenceId: sharedSubject
            ? "adverbial-principal-subject"
            : "adverbial-complement-referent",
          possessorReferenceId: "adverbial-complement-possessor",
        };
      }
      return Object.freeze({
        principalClause: buildCapturedClauseCompositionSourceFrame(
          "principal",
          principalOptions,
        ),
        complementClause: buildCapturedClauseCompositionSourceFrame(
          "adjoined",
          complementOptions,
        ),
        auxiliaryClause: contract?.derived?.auxiliaryRequired
          ? buildCapturedClauseCompositionSourceFrame("dependent", {
              referenceId: "complement-contact",
              subjectReferenceId: "complement-contact",
              possessorReferenceId: "complement-contact",
            })
          : null,
      });
    }

    function getCapturedCompositionNode(
      role = "",
      referenceId = "",
    ) {
      const capture = getValidatedCapture(role);
      const canonicalResult = capture?.canonicalResult || null;
      if (
        canonicalResult
        && (
          (
            typeof targetObject.isClassicalNahuatlClauseComplementationResultFrame
              === "function"
            && targetObject.isClassicalNahuatlClauseComplementationResultFrame(
              canonicalResult,
            )
          )
          || (
            typeof targetObject.isClassicalNahuatlClauseConjunctionResultFrame
              === "function"
            && targetObject.isClassicalNahuatlClauseConjunctionResultFrame(
              canonicalResult,
            )
          )
        )
      ) {
        return canonicalResult;
      }
      return buildCapturedClauseCompositionSourceFrame(role, {
        referenceId,
        subjectReferenceId: referenceId,
        objectReferenceId: `${referenceId}-object`,
        possessorReferenceId: `${referenceId}-possessor`,
      });
    }

    function buildComparisonSourceSlots(contract = null) {
      if (
        typeof targetObject.buildClassicalComparisonSourceUnit !== "function"
      ) {
        return Object.freeze({});
      }
      const layout = contract?.derived?.captureSlotLayout || {};
      return Object.freeze(Object.fromEntries(
        Object.entries(layout)
          .filter(([role]) => Boolean(getValidatedCapture(role)))
          .map(([role, slotId]) => {
            const capture = getValidatedCapture(role);
            return [
              slotId,
              targetObject.buildClassicalComparisonSourceUnit({
                sourceResult: capture.canonicalResult,
              }),
            ];
          }),
      ));
    }

    function buildAdjunctionRequest(contract) {
      const principalCapture = getValidatedCapture("principal");
      const adjoinedCapture = getValidatedCapture("adjoined");
      const markerCapture = getValidatedCapture("marker");
      const request = {
        principalClause: principalCapture.canonicalResult,
        adjoinedUnit: adjoinedCapture.canonicalResult,
        semanticRelation: contract.relation,
        adverbializationDegree: contract.degree,
        structureKind: contract.derived.structureKind,
        adjoinedUnitType: contract.derived.unitType,
        order: contract.derived.order,
        recursion: contract.derived.recursion,
        marking: contract.derived.marking,
      };
      if (markerCapture && contract.derived.marking !== "unmarked") {
        request.markerUnit = markerCapture.canonicalResult;
      }
      if (contract.relation === "time") {
        request.timeProfile = contract.relationProfile;
      } else if (contract.relation === "condition") {
        request.conditionType = contract.relationProfile;
        request.conditionalCuePresent = !markerCapture
          && getSourceUnit("adjoined")?.features?.conditionalCue === true;
      } else if (contract.relation === "purpose") {
        request.purposeType = contract.relationProfile;
      } else if (contract.relation === "concession") {
        request.concessionType = contract.relationProfile;
      } else if (
        contract.relation === "compared-manner"
        || contract.relation === "consideration"
      ) {
        request.contrast = "adverbial-modification";
      }
      return request;
    }

    function buildComparisonOperationRequest(contract = null) {
      const choices = Object.fromEntries(
        Object.entries(contract?.operationSelections || {})
          .filter(([field]) => field !== "comparisonRoute")
          .map(([field, value]) => [field,
            ["adjunctorIn", "negativeStandardIn", "icRelation", "copula"].includes(field)
              ? value === "yes" : value,
          ])
      );
      return {
        routeId: contract?.derived?.comparisonRoute || "",
        relation: contract?.derived?.comparisonRelation || "",
        slots: buildComparisonSourceSlots(contract),
        choices,
      };
    }

    function buildControllerResult({
      contract,
      canonicalRequest = {},
      canonicalResult = null,
      authorized = false,
      fallbackBlockReason = "",
    }) {
      return Object.freeze({
        kind: CONTROLLER_RESULT_KIND,
        version: CONTROLLER_VERSION,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized
          ? ""
          : canonicalResult?.blockReason
            || canonicalResult?.diagnostics?.[0]
            || fallbackBlockReason
            || "classical-clause-relation-canonical-result-blocked",
        decisionContract: contract,
        canonicalRequest: Object.freeze({
          ...canonicalRequest,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
        }),
        canonicalResult,
        presentation: getCanonicalPresentation(canonicalResult),
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        storedStateAuthority: false,
      });
    }

    function buildCapturedSupplementationEnvelope(
      role = "",
      referenceOptions = {},
      preserveComposition = false,
    ) {
      if (
        typeof targetObject.buildClassicalNahuatlSupplementationClauseEnvelope
          !== "function"
      ) {
        return null;
      }
      const capture = getValidatedCapture(role);
      const canonicalResult = capture?.canonicalResult || null;
      if (
        typeof targetObject.isClassicalNahuatlSupplementationFrame
          === "function"
        && targetObject.isClassicalNahuatlSupplementationFrame(canonicalResult)
        && !preserveComposition
      ) {
        const whole = targetObject.buildClassicalNahuatlSupplementationClauseEnvelope(canonicalResult, referenceOptions);
        return targetObject.isClassicalNahuatlSupplementationClauseEnvelope?.(whole)
          && whole.objects?.some(object => object.nestedObjectContactFrame)
          ? whole : canonicalResult.principalClause;
      }
      const envelope =
        targetObject.buildClassicalNahuatlSupplementationClauseEnvelope(
          canonicalResult,
          referenceOptions,
        );
      if (
        typeof targetObject.isClassicalNahuatlSupplementationClauseEnvelope
          === "function"
        && targetObject.isClassicalNahuatlSupplementationClauseEnvelope(
          envelope,
        )
      ) {
        return envelope;
      }
      return null;
    }

    function getCapturedSupplementationContinuation(role = "") {
      if (
        typeof targetObject.isClassicalNahuatlSupplementationFrame
          !== "function"
      ) {
        return null;
      }
      const capture = getValidatedCapture(role);
      const canonicalResult = capture?.canonicalResult || null;
      return targetObject.isClassicalNahuatlSupplementationFrame(
        canonicalResult
      )
        ? canonicalResult
        : null;
    }

    function getCapturedSupplementationContactContinuation(role = "") {
      let source = getValidatedCapture(role)?.canonicalResult || null;
      const visited = new Set();
      while (source && !visited.has(source)
        && targetObject.isClassicalNahuatlIssuedParticleSentenceLayerFrame?.(source) === true) {
        visited.add(source);
        source = source.contextualNncSentenceFrame || source.canonicalInputFrame;
      }
      return targetObject.isClassicalNahuatlSupplementationFrame?.(source) === true
        ? source : null;
    }

    function composeSupplementationRelation(contract = null, previewOnly = false, previewLeases = []) {
      if (
        typeof targetObject.executeClassicalGrammarApplicationRequest
          !== "function"
        || typeof targetObject.isClassicalGrammarApplicationResult
          !== "function"
        || typeof targetObject.isClassicalNahuatlSupplementationFrame
          !== "function"
      ) {
        return buildControllerResult({
          contract,
          fallbackBlockReason:
            "classical-supplementation-application-capability-required",
        });
      }
      const requestThroughCanonicalApplication = request => {
        const exactCapturedResults = CAPTURE_ROLES
          .map(role => getValidatedCapture(role)?.canonicalResult || null)
          .filter(Boolean);
        const applicationRequest = {operationId: "sentence:supplementation", args: [request, ...exactCapturedResults]};
        const applicationResult = previewOnly
          ? targetObject.previewClassicalGrammarApplicationRequest?.(applicationRequest)
          : targetObject.executeClassicalGrammarApplicationRequest(applicationRequest);
        if (previewOnly && applicationResult) previewLeases.push(applicationResult);
        return (previewOnly ? targetObject.isClassicalGrammarApplicationPreview?.(applicationResult)
          : targetObject.isClassicalGrammarApplicationResult(applicationResult))
          ? applicationResult
          : null;
      };
      const relation = contract.relation;
      const selected = contract.operationSelections || {};
      const principalContinuation =
        getCapturedSupplementationContinuation("principal");
      const supplementContinuation =
        getCapturedSupplementationContinuation("adjoined");
      const principalContactContinuation =
        getCapturedSupplementationContactContinuation("principal");
      const supplementContactContinuation =
        getCapturedSupplementationContactContinuation("adjoined");
      const buildEnvelope = (
        role,
        referenceId,
        subjectReferenceId = referenceId,
        objectReferenceId = referenceId,
        possessorReferenceId = referenceId,
        extraOptions = {},
        preserveComposition = false,
      ) => buildCapturedSupplementationEnvelope(role, {
        referenceId,
        subjectReferenceId,
        objectReferenceId,
        possessorReferenceId,
        ...extraOptions,
      }, preserveComposition);
      let request = { operationKind: relation };
      if (relation === "supplementation") {
        const shared = selected.supplementationReferenceMode === "shared";
        const absoluteTopic =
          selected.supplementationReferenceMode === "absolute-topic";
        // A new outer clause is a new occurrence, even when its wording repeats.
        // Preserve the signed inner graph and its shared participant contacts.
        const retainedReferences = new Set();
        const visited = new Set();
        const collectReferences = frame => {
          if (!frame || visited.has(frame)) return;
          visited.add(frame);
          if (frame.referenceId) retainedReferences.add(frame.referenceId);
          for (const key of ["principalClause", "supplementClause"]) collectReferences(frame[key]);
          for (const key of ["principalContinuationFrames", "supplementContinuationFrames"])
            for (const inner of frame[key] || []) collectReferences(inner);
        };
        collectReferences(principalContactContinuation);
        collectReferences(supplementContactContinuation);
        let principalReference = "supplementation-principal";
        for (let occurrence = 2; retainedReferences.has(principalReference); occurrence++)
          principalReference = `supplementation-principal-${occurrence}`;
        const sourceContext =
          getDiscourseSourceContextFrame("adjoined");
        const agreementException = selected.agreementException || "";
        const namedPartner = agreementException === "named-partner";
        // A captured continuation owns its referent identities. Bind a fresh
        // partner to the selected existing contact instead of relabeling the
        // signed inner graph or discarding its continuation.
        const continuationContact = (frame, role, objectId) => {
          const clause = frame?.principalClause;
          if (role === "object" && frame) {
            const whole = targetObject.buildClassicalNahuatlSupplementationClauseEnvelope(frame);
            const nested = whole?.objects?.find(object => object.nestedObjectContactFrame
              && (!objectId || object.id === objectId));
            if (nested) return nested;
          }
          return role === "possessor" ? clause?.possessor
            : role === "object" ? clause?.objects?.find(object => (
                !objectId || object.id === objectId
              ))
            : clause?.subject;
        };
        const retainedContactReference = shared && !namedPartner
          ? continuationContact(principalContactContinuation,
              selected.supplementationHeadRole, selected.principalObjectId)?.referenceId
            || continuationContact(supplementContactContinuation,
              selected.supplementationContactRole, selected.supplementObjectId)?.referenceId
            || "supplementation-shared-referent"
          : "supplementation-shared-referent";
        const principalContactReference = namedPartner
          ? "supplementation-named-partner-group"
          : shared
          ? retainedContactReference
          : "supplementation-principal";
        const supplementContactReference = namedPartner
          ? "supplementation-named-third-party"
          : shared
          ? retainedContactReference
          : "supplementation-whole-supplement";
        const supplementReference = supplementContactReference;
        const principalPreview = buildEnvelope(
          "principal",
          principalReference,
          `${principalReference}-subject`,
          `${principalReference}-object`,
          `${principalReference}-possessor`,
        );
        const supplementPreviewForContact = buildEnvelope(
          "adjoined",
          supplementReference,
          `${supplementReference}-subject`,
          `${supplementReference}-object`,
          `${supplementReference}-possessor`,
        );
        const supplementContactParticipant = selected
          .supplementationContactRole === "object"
            ? supplementPreviewForContact?.objects?.find(object => (
                !selected.supplementObjectId
                || object.id === selected.supplementObjectId
              )) || null
            : selected.supplementationContactRole === "possessor"
              ? supplementPreviewForContact?.possessor || null
              : supplementPreviewForContact?.subject || null;
        const normalizedPrincipalStem = normalizeToken(
          principalPreview?.sourceStem,
        );
        const sameSubjectFutureEligible = [
          "mati",
          "il-namiqui",
          "il-cahua",
          "ilcahua",
          "nequi",
        ].some(stem => (
          normalizedPrincipalStem === stem
          || normalizedPrincipalStem.endsWith(`-${stem}`)
        ));
        const sameSubjectFuture = Boolean(
          selected.supplementationReferenceMode === "included"
          && selected.supplementationHeadRole === "object"
          && sameSubjectFutureEligible
          && supplementPreviewForContact?.unitKind === "vnc"
          && supplementPreviewForContact?.tense === "future"
          && principalPreview?.subject?.category
            === supplementPreviewForContact?.subject?.category
        );
        const principalSubjectReference = sameSubjectFuture
          ? "supplementation-same-subject-future"
          : selected.supplementationHeadRole === "subject"
              || selected.retainContactAlternatives === true
            ? principalContactReference
            : principalReference;
        const supplementSubjectReference = sameSubjectFuture
          ? "supplementation-same-subject-future"
          : selected.supplementationContactRole === "subject"
            ? supplementContactReference
            // Object or possessor contact must not also bind the subject.
            : `${supplementReference}-subject`;
        const principalObjectReferenceIds = Object.fromEntries(
          (principalPreview?.objects || []).map(object => [
            object.id,
            (
              selected.supplementationHeadRole === "object"
              && object.id === selected.principalObjectId
            ) || (
              selected.retainContactAlternatives === true
              && object.features?.person === "3"
              && object.features?.number
                === supplementContactParticipant?.features?.number
            )
              ? principalContactReference
              : `${principalReference}-object-${object.id}`,
          ]),
        );
        const principalClause = buildEnvelope(
          "principal",
          principalReference,
          principalSubjectReference,
          selected.supplementationHeadRole === "object"
            ? `${principalReference}-object`
            : `${principalReference}-object`,
          selected.supplementationHeadRole === "possessor"
            ? principalContactReference
            : `${principalReference}-possessor`,
          {
            objectReferenceIds: principalObjectReferenceIds,
          },
        );
        const absoluteTopicContext = absoluteTopic
          && typeof targetObject
            .buildClassicalNahuatlSupplementationContextRecord === "function"
          ? targetObject.buildClassicalNahuatlSupplementationContextRecord({
              kind: "absolute-topic",
              referenceId: supplementReference,
            })
          : null;
        const exceptionContext =
          typeof targetObject
            .buildClassicalNahuatlSupplementationContextRecord === "function"
          && namedPartner
          && sourceContext?.namedPartnerKnownParticipant
            && sourceContext.namedPartnerKnownParticipant !== "none"
            ? targetObject.buildClassicalNahuatlSupplementationContextRecord({
                kind: "named-partner",
                referenceId: supplementReference,
                discourseSourceContextFrame: sourceContext,
                groupReferenceId: principalContactReference,
                namedPartnerReferenceId: supplementContactReference,
                speakerOrAddresseeReferenceId:
                  `supplementation-${sourceContext.namedPartnerKnownParticipant}`,
              })
            : typeof targetObject
                .buildClassicalNahuatlSupplementationContextRecord
                === "function"
              && agreementException === "male-bonding"
              && sourceContext?.speakerGender === "male"
              && sourceContext?.speakerGroupMembership === "member"
              ? targetObject.buildClassicalNahuatlSupplementationContextRecord({
                  kind: "male-bonding",
                  referenceId: supplementReference,
                  discourseSourceContextFrame: sourceContext,
                })
              : null;
        const supplementContextRecords = [
          absoluteTopicContext,
          exceptionContext,
        ].filter(Boolean);
        const supplementPreview = supplementPreviewForContact;
        const supplementObjectReferenceIds = Object.fromEntries(
          (supplementPreview?.objects || []).map(object => [
            object.id,
            selected.supplementationContactRole === "object"
              && object.id === selected.supplementObjectId
              ? supplementContactReference
              : `${supplementReference}-object-${object.id}`,
          ]),
        );
        const supplementClause = buildEnvelope(
          "adjoined",
          supplementReference,
          supplementSubjectReference,
          selected.supplementationContactRole === "object"
            ? supplementContactReference
            : `${supplementReference}-object`,
          selected.supplementationContactRole === "possessor"
            ? supplementContactReference
            : `${supplementReference}-possessor`,
          supplementContextRecords.length
            ? {
                contextRecords: supplementContextRecords,
                objectReferenceIds: supplementObjectReferenceIds,
              }
            : {
                objectReferenceIds: supplementObjectReferenceIds,
              },
        );
        const interveningClause =
          selected.supplementationOrder === "discontinuous"
            ? buildEnvelope(
                "dependent",
                "supplementation-intervener",
              )
            : null;
        request = {
          operationKind: "relation",
          principalClause,
          supplementClause,
          options: {
            referenceMode: selected.supplementationReferenceMode,
            specificityDomainRestriction: selected.specificityDomainRestriction || "",
            headRole: selected.supplementationHeadRole,
            supplementContactRole:
              selected.supplementationContactRole,
            order: selected.supplementationOrder,
            adjunctor: selected.markerSemantic === "in" ? "in" : "none",
            commentEmphaticCa: selected.markerSemantic === "ca",
            informationQuestion: selected.informationQuestion === true,
            integratedAntecessive: selected.integratedAntecessive === true,
            includedAntecessiveJump:
              selected.includedAntecessiveJump === true,
            agreementException,
            principalObjectId: selected.principalObjectId || "",
            supplementObjectId: selected.supplementObjectId || "",
            retainContactAlternatives:
              selected.retainContactAlternatives === true,
            additionalSharedContacts: getNestedPossessorContacts()
              .filter((_, index) => selected.additionalPossessorContact === `possessor-${index + 1}`)
              .map(clause => ({ clause, role: "possessor" })),
            interveningClauses: interveningClause
              ? [interveningClause]
              : [],
            contextualSilentFirstPerson:
              selected.contextualSilentFirstPerson === "present",
            wishRealizability: selected.wishRealizability || "",
            speechDirectness: selected.speechDirectness || "",
            principalContinuationFrames: principalContinuation
              ? [principalContinuation]
              : [],
            supplementContinuationFrames: supplementContinuation
              ? [supplementContinuation]
              : [],
            reusePrincipalIntervener: selected.principalIntervenerUse === "reuse",
            discontinuousHeadPosition: selected.discontinuousHeadPosition || "last",
            principalActsAsStandaloneUtterance: false,
            supplementActsAsStandaloneUtterance: false,
          },
        };
      } else if (relation === "vocative") {
        const companionClause = selected.vocativeCompanion === "with-clause"
          ? targetObject.buildClassicalNahuatlSupplementationClauseEnvelope(
            getValidatedCapture("adjoined")?.canonicalResult,
            { referenceId: "vocative-companion" },
          ) : null;
        request = {
          operationKind: "vocative",
          nncClause: buildEnvelope("principal", "vocative-referent"),
          options: {
            discourseSourceContextFrame:
              getDiscourseSourceContextFrame("principal"),
            glottalVariant: selected.glottalVariant === "glottal-e"
              ? "y"
              : "retain",
            silentPluralIn: selected.silentPluralIn === "present",
            ...(selected.finalIRealization
              ? { finalIRealization: selected.finalIRealization } : {}),
            companionClause,
            companionOrder: selected.vocativeCompanionOrder || "clause-first",
          },
        };
      } else if (relation === "rumored-report") {
        request = {
          operationKind: "rumored-report",
          principalClause: buildEnvelope(
            "principal",
            "rumored-report-principal",
            "rumored-report-speaker",
            "reported-whole-supplement",
          ),
          supplementClause: buildCapturedSupplementationEnvelope(
            "adjoined",
            { referenceId: "reported-whole-supplement" },
            true,
          ),
          options: {
            mach: selected.mach === "present",
            fuseQuilMach: selected.fuseQuilMach === "fused",
            adjunctor: selected.reportAdjunctor,
          },
        };
      } else if (relation === "deleted-principal") {
        const sayingDeletion = selected.deletionKind.startsWith("saying");
        const visiblePreview = buildEnvelope(
          "principal",
          "deleted-visible-preview",
          undefined, undefined, undefined, {}, true,
        );
        const deletedPreview = buildEnvelope(
          "dependent",
          "deleted-principal-preview",
        );
        const deletedContentObject = sayingDeletion
          ? Array.from(deletedPreview?.objects || []).find(object => (
              object.sounded === false
            )) || Array.from(deletedPreview?.objects || []).find(object => (
              /report|content|supplement/u.test(object.id)
            )) || Array.from(deletedPreview?.objects || []).find(object => (
              object.id === "source-object-1"
            )) || null
          : null;
        const retainedVisible = Boolean(principalContinuation);
        const sharedSpeaker = retainedVisible
          ? visiblePreview?.subject?.referenceId : "shared-speaker";
        const visibleObjectReferenceIds = Object.fromEntries(
          Array.from(visiblePreview?.objects || []).map(object => [
            object.id,
            retainedVisible ? object.referenceId : "shared-addressee",
          ]),
        );
        const deletedObjectReferenceIds = Object.fromEntries(
          Array.from(deletedPreview?.objects || []).map(object => [
            object.id,
            object.id === deletedContentObject?.id
              ? "deleted-whole-supplement"
              : retainedVisible
                ? visiblePreview?.objects?.find(visible => visible.category === object.category)?.referenceId || "shared-addressee"
                : "shared-addressee",
          ]),
        );
        const visibleEnvelope = buildEnvelope(
          "principal",
          "deleted-visible",
          sayingDeletion ? sharedSpeaker : "deleted-visible",
          "shared-addressee",
          "deleted-visible-possessor",
          { objectReferenceIds: visibleObjectReferenceIds },
          true,
        );
        const deletedPrincipalClause = buildEnvelope(
          "dependent",
          "deleted-principal",
          selected.deletionKind === "cah-proxy"
            ? "deleted-shared-subject"
            : sharedSpeaker,
          "shared-addressee",
          "deleted-principal-possessor",
          { objectReferenceIds: deletedObjectReferenceIds },
        );
        const supplementClause = buildEnvelope(
          "adjoined",
          "deleted-whole-supplement",
          selected.deletionKind === "cah-proxy"
            ? "deleted-shared-subject"
            : sayingDeletion && selected.speechDirectness === "direct"
              && buildEnvelope("adjoined", "direct-quote-preview", undefined,
                undefined, undefined, {}, true)?.subject?.category === "1sg"
              ? sharedSpeaker
            : "deleted-whole-supplement",
          undefined, undefined, {}, true,
        );
        const visiblePrincipalClause = ["cah-proxy", "saying-adverb-only"].includes(selected.deletionKind)
          && typeof targetObject
            .buildClassicalNahuatlSupplementationAdverbialModifierFrame
            === "function"
          ? targetObject
            .buildClassicalNahuatlSupplementationAdverbialModifierFrame(
              visibleEnvelope,
              { adverbialRole: selected.adverbialRole },
            )
          : visibleEnvelope;
        const deletedSupplementationApplication = selected.deletionKind
          .startsWith("saying")
          ? requestThroughCanonicalApplication({
              operationKind: "relation",
              principalClause: deletedPrincipalClause,
              supplementClause,
              options: {
                referenceMode: "included",
                headRole: "object",
                principalObjectId: deletedContentObject?.id || "",
                supplementContactRole: "subject",
                order: "principal-first",
                speechDirectness: selected.speechDirectness,
                adjunctor: selected.markerSemantic === "in" ? "in" : "none",
              },
            })
          : null;
        const deletedSupplementationFrame =
          deletedSupplementationApplication?.canonicalResult || null;
        request = {
          operationKind: "deleted-principal",
          visiblePrincipalClause,
          deletedPrincipalClause,
          supplementClause,
          options: {
            deletionKind: selected.deletionKind,
            speechDirectness: selected.speechDirectness,
            deletedSupplementationFrame,
          },
        };
      } else if (relation === "negative-ac-plural") {
        request = {
          operationKind: "negative-ac-plural",
          principalClause: buildEnvelope(
            "principal",
            "negative-ac-referent",
          ),
        };
      } else if (relation === "contextual-first-person-realization") {
        request = {
          operationKind: "contextual-first-person-realization",
          principalClause: buildEnvelope(
            "principal",
            "contextual-first-person-referent",
          ),
          options: {
            contextualSilentFirstPerson:
              selected.contextualSilentFirstPerson === "present",
          },
        };
      } else if (relation === "exclamatory-utterance") {
        request = {
          operationKind: "exclamatory-utterance",
          constituents: [
            "principal",
            "adjoined",
            "dependent",
            "supplement",
            "marker",
          ].filter(role => getValidatedCapture(role)).map((role, index) => (
            buildEnvelope(role, `exclamation-${index + 1}`)
          )),
          options: {
            personalPronounVariant:
              selected.exclamatoryPersonalPronounVariant,
          },
        };
      } else if (relation === "such-that-adjunction") {
        const frozen = selected.frozenEllipsis === true;
        request = {
          operationKind: "such-that-adjunction",
          principalClause: buildEnvelope(
            "principal",
            "such-that-principal",
          ),
          supplementClause: frozen
            ? null
            : buildEnvelope("adjoined", "such-that-adjoined"),
          markerClause: frozen
            ? null
            : buildEnvelope("marker", "such-that-marker"),
          adjunctorClause: frozen || !getValidatedCapture("dependent")
            ? null
            : buildEnvelope("dependent", "such-that-adjunctor"),
        };
      }
      const applicationResult =
        requestThroughCanonicalApplication(request);
      const canonicalResult = applicationResult?.canonicalResult || null;
      const validatorName = {
        vocative: "isClassicalNahuatlVocativeFrame",
        "rumored-report": "isClassicalNahuatlRumoredReportFrame",
        "deleted-principal": "isClassicalNahuatlDeletedPrincipalFrame",
        "negative-ac-plural": "isClassicalNahuatlNegativeAcPluralFrame",
      }[relation] || "isClassicalNahuatlSupplementationFrame";
      const authorized = Boolean(
        typeof targetObject[validatorName] === "function"
        && targetObject[validatorName](canonicalResult)
      );
      return buildControllerResult({
        contract,
        canonicalRequest: {
          operationKind: request.operationKind,
          applicationOperationId: "sentence:supplementation",
          capturedConstituentRoles:
            contract.derived.requiredCaptureRoles
              .concat(contract.derived.optionalCaptureRoles)
              .filter(role => getValidatedCapture(role)),
          projectionsGeneratedIndependently:
            canonicalResult?.projectionsGeneratedIndependently === true,
        },
        canonicalResult,
        authorized,
        fallbackBlockReason:
          applicationResult?.blockReason
          || "classical-supplementation-canonical-result-blocked",
      });
    }

    function compose(selections = {}, previewOnly = false, previewLeases = []) {
      const requestPreviewOwner = (operationId, request) => {
        if (!previewOnly) {
          const capability = {"clause:composition": "requestClassicalClauseCompositionResult",
            "clause:comparison": "requestClassicalComparisonResult",
            "nnc:adjectival-modification": "requestClassicalAdjectivalModificationResult",
            "clause:adverbial-adjunction": "requestClassicalAdverbialAdjunctionResult"}[operationId];
          return targetObject[capability](request);
        }
        const lease = targetObject.previewClassicalGrammarApplicationRequest?.({operationId, args: [request]});
        if (targetObject.isClassicalGrammarApplicationPreview?.(lease) !== true) return null;
        previewLeases.push(lease);return lease.canonicalResult;
      };
      const contract = buildDecisionContract(selections);
      if (contract.authorizationStatus !== "authorized") {
        return Object.freeze({
          kind: CONTROLLER_RESULT_KIND,
          version: CONTROLLER_VERSION,
          authorizationStatus: "blocked",
          blockReason: contract.blockReason,
          decisionContract: contract,
          canonicalResult: null,
          presentation: getCanonicalPresentation(null),
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
          storedStateAuthority: false,
        });
      }
      if (SUPPLEMENTATION_RELATIONS.includes(contract.relation)) {
        return composeSupplementationRelation(contract, previewOnly, previewLeases);
      }
      if (COMPLEMENT_OPERATION_KINDS.includes(contract.relation)) {
        if (
          typeof targetObject.requestClassicalClauseCompositionResult
            !== "function"
          || typeof targetObject.isClassicalNahuatlClauseComplementationResultFrame
            !== "function"
        ) {
          return buildControllerResult({
            contract,
            fallbackBlockReason:
              "classical-complement-application-capability-required",
          });
        }
        const sourceFrames = buildComplementSourceFrames(contract);
        const options = {
          ...contract.operationSelections,
        };
        delete options.comparisonRoute;
        const request = {
          operationKind: contract.relation,
          principalClause: sourceFrames.principalClause,
          complementClause: sourceFrames.complementClause,
          auxiliaryClause: sourceFrames.auxiliaryClause,
          options,
        };
        const canonicalResult =
          requestPreviewOwner("clause:composition", request);
        const authorized = Boolean(
          targetObject.isClassicalNahuatlClauseComplementationResultFrame(canonicalResult)
          && canonicalResult.authorizationStatus === "authorized",
        );
        return buildControllerResult({
          contract,
          canonicalRequest: {
            operationKind: request.operationKind,
            options: request.options,
            auxiliaryConstituentPresent: Boolean(request.auxiliaryClause),
          },
          canonicalResult,
          authorized,
          fallbackBlockReason: "classical-complement-canonical-result-blocked",
        });
      }
      if (CONJUNCTION_OPERATION_KINDS.includes(contract.relation)) {
        if (
          typeof targetObject.requestClassicalClauseCompositionResult
            !== "function"
          || typeof targetObject.isClassicalNahuatlClauseConjunctionResultFrame
            !== "function"
        ) {
          return buildControllerResult({
            contract,
            fallbackBlockReason:
              "classical-conjunction-application-capability-required",
          });
        }
        const request = buildConjunctionRequest(contract);
        const conjuncts = request.conjuncts;
        const sharedSupplement = request.sharedSupplement;
        const canonicalResult =
          requestPreviewOwner("clause:composition", request);
        const authorized = Boolean(
          targetObject.isClassicalNahuatlClauseConjunctionResultFrame(canonicalResult)
          && canonicalResult.authorizationStatus === "authorized",
        );
        return buildControllerResult({
          contract,
          canonicalRequest: {
            operationKind: request.operationKind,
            options: request.options,
            ...(request.conjunctorResult ? {conjunctorResult: request.conjunctorResult} : {}),
            conjunctCount: conjuncts.length,
            sharedSupplementPresent: Boolean(sharedSupplement),
          },
          canonicalResult,
          authorized,
          fallbackBlockReason:
            "classical-conjunction-canonical-result-blocked",
        });
      }
      if (contract.relation === COMPARISON_RELATION) {
        if (
          typeof targetObject.requestClassicalComparisonResult !== "function"
          || typeof targetObject.isClassicalComparisonResultFrame !== "function"
        ) {
          return buildControllerResult({
            contract,
            fallbackBlockReason:
              "classical-comparison-application-capability-required",
          });
        }
        const request = buildComparisonOperationRequest(contract);
        const canonicalResult =
          requestPreviewOwner("clause:comparison", request);
        const authorized = Boolean(
          targetObject.isClassicalComparisonResultFrame(canonicalResult)
          && canonicalResult.authorizationStatus === "authorized",
        );
        return buildControllerResult({
          contract,
          canonicalRequest: {
            routeId: request.routeId,
            relation: request.relation,
            slotIds: Object.keys(request.slots),
            choices: request.choices,
          },
          canonicalResult,
          authorized,
          fallbackBlockReason:
            "classical-comparison-canonical-result-blocked",
        });
      }
      if (contract.relation === ADJECTIVAL_MODIFICATION_RELATION) {
        if (
          typeof targetObject.requestClassicalAdjectivalModificationResult
            !== "function"
          || typeof targetObject.isClassicalNahuatlResultFrame
            !== "function"
        ) {
          return Object.freeze({
            kind: CONTROLLER_RESULT_KIND,
            version: CONTROLLER_VERSION,
            authorizationStatus: "blocked",
            blockReason:
              "classical-adjectival-modification-application-capability-required",
            decisionContract: contract,
            canonicalResult: null,
            presentation: getCanonicalPresentation(null),
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
            storedStateAuthority: false,
          });
        }
        const principalCapture = getValidatedCapture("principal");
        const adjoinedCapture = getValidatedCapture("adjoined");
        const dependentCapture = getValidatedCapture("dependent");
        const request = {
          operationKind: "adjectival-modification",
          topology: contract.topology,
          head: principalCapture.canonicalResult,
          modifier: adjoinedCapture.canonicalResult,
          order: contract.derived.order,
          adjunctor: contract.derived.adjunctor,
        };
        if (contract.derived.modifierClauseType === "transitive-vnc"
          || contract.derived.linkRole === "supplement-possessor") {
          request.linkRole = contract.derived.linkRole;
        }
        if (contract.derived.compoundHeadTarget !== "simple-head") {
          request.compoundHeadTarget =
            contract.derived.compoundHeadTarget;
        }
        const discourseSourceContextFrame =
          getDiscourseSourceContextFrame("principal")
          || getDiscourseSourceContextFrame("adjoined")
          || getDiscourseSourceContextFrame("dependent");
        if (discourseSourceContextFrame) {
          request.discourseSourceContextFrame =
            discourseSourceContextFrame;
        }
        if (
          contract.topology === "cooperating-preposed-nonpreposed"
          && dependentCapture
        ) {
          request.additionalModifiers = [dependentCapture.canonicalResult];
          if (
            contract.derived.dependentModifierClauseType
              === "transitive-vnc"
          ) {
            request.additionalLinkRoles = [
              contract.derived.dependentLinkRole,
            ];
          }
        } else if (
          contract.topology === "discontinuous"
          && dependentCapture
        ) {
          request.interveningClauses = [dependentCapture.canonicalResult];
        }
        const canonicalResult =
          requestPreviewOwner("nnc:adjectival-modification", request);
        const authorized = Boolean(
          targetObject.isClassicalNahuatlResultFrame(
            canonicalResult,
          )
          && canonicalResult.authorizationStatus === "authorized",
        );
        return Object.freeze({
          kind: CONTROLLER_RESULT_KIND,
          version: CONTROLLER_VERSION,
          authorizationStatus: authorized ? "authorized" : "blocked",
          blockReason: authorized
            ? ""
            : canonicalResult?.blockReason
              || canonicalResult?.diagnostics?.[0]
              || "classical-adjectival-modification-canonical-result-blocked",
          decisionContract: contract,
          canonicalRequest: Object.freeze({
            operationKind: request.operationKind,
            topology: request.topology,
            order: request.order,
            linkRole: request.linkRole,
            additionalLinkRoles:
              request.additionalLinkRoles,
            compoundHeadTarget: request.compoundHeadTarget,
            adjunctor: request.adjunctor,
            discourseSourceContextPresent:
              Boolean(request.discourseSourceContextFrame),
            dependentConstituentCount:
              Array.isArray(request.additionalModifiers)
              || Array.isArray(request.interveningClauses)
                ? 1
                : 0,
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
          }),
          canonicalResult,
          presentation: getCanonicalPresentation(canonicalResult),
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
          storedStateAuthority: false,
        });
      }
      if (typeof targetObject.requestClassicalAdverbialAdjunctionResult !== "function") {
        return Object.freeze({
          kind: CONTROLLER_RESULT_KIND,
          version: CONTROLLER_VERSION,
          authorizationStatus: "blocked",
          blockReason: "classical-adverbial-adjunction-application-capability-required",
          decisionContract: contract,
          canonicalResult: null,
          presentation: getCanonicalPresentation(null),
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
          storedStateAuthority: false,
        });
      }
      const request = buildAdjunctionRequest(contract);
      const canonicalResult = requestPreviewOwner("clause:adverbial-adjunction", request);
      const authorized = Boolean(
        canonicalResult
        && canonicalResult.ok !== false
        && canonicalResult.supported === true
        && canonicalResult.grammarFrame?.resultFrame?.ok !== false,
      );
      return Object.freeze({
        kind: CONTROLLER_RESULT_KIND,
        version: CONTROLLER_VERSION,
        authorizationStatus: authorized ? "authorized" : "blocked",
        blockReason: authorized
          ? ""
          : canonicalResult?.diagnostics?.[0]
            || "classical-clause-relation-canonical-result-blocked",
        decisionContract: contract,
        canonicalRequest: Object.freeze({
          semanticRelation: request.semanticRelation,
          adverbializationDegree: request.adverbializationDegree,
          structureKind: request.structureKind,
          adjoinedUnitType: request.adjoinedUnitType,
          order: request.order,
          recursion: request.recursion,
          marking: request.marking,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
        }),
        canonicalResult,
        presentation: getCanonicalPresentation(canonicalResult),
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
        storedStateAuthority: false,
      });
    }

    return Object.freeze({
      kind: CONTROLLER_KIND,
      version: CONTROLLER_VERSION,
      issueDiscourseSourceContextFrame,
      captureCurrentResult,
      getCapturedCanonicalResult: role => getValidatedCapture(role)?.canonicalResult || null,
      continueCapturedIntervener,
      clearCapture,
      getState,
      applyBindingFrame,
      getMarkerProfilesForRelation:
        getActiveMarkerProfilesForRelation,
      issueRelationAvailabilityContract,
      isRelationAvailabilityContract,
      buildDecisionContract,
      transitionComparisonChoice,
      transitionConjunctionChoice,
      transitionSentenceChoice,
      prepareAdjunctionAnchorReplacement(bindingFrame, bindingId, role, exactResult) {
        if (!isClassicalClauseRelationBindingFrame(bindingFrame)) return null;
        const prior = bindingFrame.bindingChoices.find(choice => choice.id === bindingId);
        if (!prior || NON_ADJUNCTION_RELATIONS.includes(prior.relation)
          || prior.captureRole !== role || !["principal", "adjoined", "marker"].includes(role)) return null;
        const navigator = targetObject.getClassicalGrammarApplicationCapabilityNavigator?.(exactResult);
        if (targetObject.isClassicalGrammarApplicationCapabilityNavigator?.(navigator) !== true
          || navigator.exactResult !== exactResult) return null;
        const operation = navigator.operations?.find(item => item.operationId === bindingFrame.operationId);
        const owner = operation?.ownerBindingFrame;
        if (operation?.availabilityStatus !== "available" || operation.ownerBindingFrameValidated !== true
          || operation.ownerBindingInputResult !== exactResult || !isClassicalClauseRelationBindingFrame(owner)
          || owner.exactResult !== exactResult || !owner.bindingChoices.some(choice => choice.id === bindingId
            && choice.relation === prior.relation && choice.captureRole === role)) return null;
        const capture = targetObject.captureClassicalGrammarApplicationResult?.(exactResult, "adjunction-replacement-source");
        if (targetObject.isClassicalGrammarApplicationResultCapture?.(capture, "adjunction-replacement-source") !== true
          || capture.canonicalResult !== exactResult) return null;
        return Object.freeze({navigator, operation, capture});
      },
      preserveAdjunctionCaptureChoices(selections, role) {
        return Boolean(selections?.relation && !NON_ADJUNCTION_RELATIONS.includes(selections.relation)
          && ["principal", "adjoined", "marker"].includes(role));
      },
      preserveComplementCaptureChoices(selections, role) {
        return COMPLEMENT_OPERATION_KINDS.includes(selections?.relation)
          && ["principal", "adjoined", "dependent"].includes(role);
      },
      preserveComparisonCaptureChoices(selections, role) {
        const contract = buildDecisionContract(selections);
        return contract.relation === "comparison" && (contract.currentChoiceFrame
          ? contract.currentChoiceFrame.inputs.some(input=>input.role === role)
          : contract.derived?.optionalCaptureRoles?.includes(role)
            || (role === "dependent" && contract.derived?.requiredCaptureRoles?.includes(role)));
      },
      isCurrentChoiceFrame,
      preview(selections = {}) {
        const previewChoiceRevision = choiceRevision;
        const migrated = ["conjunction","correlative-conjunction","lexical-conjunction","parallel-structure"].includes(selections.relation) || selections.relation === "comparison" && isCurrentComparisonRoute(selections.comparisonRoute);
        const parents = CAPTURE_ROLES.map(role => [role, getValidatedCapture(role)?.canonicalResult || null]);
        const leases = [], result = compose(selections, true, leases);
        if (result?.authorizationStatus !== "authorized" || !leases.length) return null;
        const exact = result.canonicalResult;
        const surface = result.presentation?.surface || exact?.sentenceSurfaceDisplay || exact?.surfaceRealization || exact?.surface || "";
        return Object.freeze({surface, canonicalResult: exact, isCurrent: () =>
          (!migrated || previewChoiceRevision === choiceRevision) && parents.every(([role, parent]) => (getValidatedCapture(role)?.canonicalResult || null) === parent)
          && leases.every(lease => targetObject.isClassicalGrammarApplicationPreview?.(lease) === true)});
      },
      compose,
    });
  }

  const api = {
    CLASSICAL_CLAUSE_RELATION_CONTROLLER_KIND: CONTROLLER_KIND,
    CLASSICAL_CLAUSE_RELATION_CONTROLLER_RESULT_KIND: CONTROLLER_RESULT_KIND,
    CLASSICAL_CLAUSE_RELATION_CONTROLLER_VERSION: CONTROLLER_VERSION,
    CLASSICAL_CLAUSE_RELATION_BINDING_FRAME_KIND: BINDING_FRAME_KIND,
    CLASSICAL_CLAUSE_RELATION_BINDING_APPLICATION_KIND:
      BINDING_APPLICATION_KIND,
    CLASSICAL_CLAUSE_RELATION_BINDING_FRAME_VERSION:
      BINDING_FRAME_VERSION,
    CLASSICAL_CLAUSE_RELATION_BINDING_OPERATION_IDS:
      BINDING_OPERATION_IDS,
    CLASSICAL_CLAUSE_RELATION_CAPTURE_ROLES: CAPTURE_ROLES,
    CLASSICAL_CLAUSE_RELATION_ORDER_VALUES: ORDER_VALUES,
    CLASSICAL_CLAUSE_RELATION_ADJECTIVAL_MODIFICATION_RELATION:
      ADJECTIVAL_MODIFICATION_RELATION,
    CLASSICAL_CLAUSE_RELATION_COMPLEMENT_OPERATION_KINDS:
      COMPLEMENT_OPERATION_KINDS,
    CLASSICAL_CLAUSE_RELATION_CONJUNCTION_OPERATION_KINDS:
      CONJUNCTION_OPERATION_KINDS,
    CLASSICAL_CLAUSE_RELATION_COMPARISON_RELATION:
      COMPARISON_RELATION,
    CLASSICAL_CLAUSE_RELATION_SUPPLEMENTATION_RELATIONS:
      SUPPLEMENTATION_RELATIONS,
    CLASSICAL_CLAUSE_RELATION_AVAILABILITY: RELATION_AVAILABILITY,
    CLASSICAL_CLAUSE_RELATION_RECURSION_VALUES: RECURSION_VALUES,
    CLASSICAL_CLAUSE_RELATION_MARKING_VALUES: MARKING_VALUES,
    getClassicalClauseRelationMarkerProfiles,
    issueClassicalClauseRelationBindingFrame,
    isClassicalClauseRelationBindingFrame,
    issueClassicalClauseMarkerEntryProjection,
    isClassicalClauseMarkerEntryProjection,
    createClassicalClauseRelationControllerGlobals,
    createClassicalClauseRelationController,
  };
  return Object.freeze(api);
}

export function installClassicalClauseRelationControllerGlobals(
  targetObject = globalThis,
  installationContext = {},
) {
  const controllerTarget = Object.create(targetObject);
  Object.defineProperties(controllerTarget, Object.getOwnPropertyDescriptors(
    installationContext?.moduleDependencyCapabilities || {},
  ));
  const api = createClassicalClauseRelationControllerGlobals(controllerTarget);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  installClassicalLateValidationOwnersGlobals(targetObject);
  return api;
}
