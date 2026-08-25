// Typed application controller for composing already-issued canonical clause
// results. It owns presentation decisions only; the clause engine remains the
// sole owner of relation validation, formulas, realization, and surfaces.

import { installClassicalLateValidationOwnersGlobals } from "../../core/classical/late_validation_owner_catalog.mjs?v=20260825-launch-ready-293";

const CONTROLLER_KIND = "classical-clause-relation-controller";
const CONTROLLER_RESULT_KIND = "classical-clause-relation-controller-result";
const CONTROLLER_VERSION = 1;
const BINDING_FRAME_KIND = "classical-clause-relation-binding-frame";
const BINDING_APPLICATION_KIND =
  "classical-clause-relation-binding-application";
const BINDING_FRAME_VERSION = 1;

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
  condition: Object.freeze(["tla", "in-tla"]),
  purpose: Object.freeze(["unmarked", "ma", "in-ma"]),
  concession: Object.freeze([
    "in-tla-nel",
    "in-ma-nel",
    "ma-nel",
    "ma-zo",
    "ma-zo-tel",
  ]),
  reason: Object.freeze(["ca"]),
  supplementation: Object.freeze(["in", "ca"]),
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
const CONJUNCTION_COORDINATION_TYPES = Object.freeze([
  "additive",
  "alternative",
  "adversative",
]);
const CONJUNCTION_LEVELS = Object.freeze([
  "principal",
  "adjoined",
]);
const CONJUNCTION_POLARITIES = Object.freeze(["positive", "negative"]);
const CONJUNCTION_RIGHTWARD_MODIFIERS = Object.freeze({
  additive: Object.freeze([
    "none",
    "no",
    "oc",
    "oc-no",
    "ihuan",
    "oc-ihuan",
    "no-ihuan",
    "oc-no-ihuan",
    "ahno",
    "ahmo-no",
    "no-zo",
    "no-zo-eh",
    "ma-no-zo",
    "ma-no-zo-eh",
  ]),
  alternative: Object.freeze([
    "none",
    "ahzo",
    "ahzo-eh",
    "no-zo",
    "no-zo-eh",
    "ma-no-zo",
    "ma-no-zo-eh",
    "ahno-zo",
    "ahno-zo-eh",
  ]),
  adversative: Object.freeze([
    "none",
    "zan",
    "tel",
    "yeceh",
    "yeh",
    "neh",
  ]),
});
const CONJUNCTION_SHARED_MODIFIERS = Object.freeze([
  "none",
  "ah",
  "aic",
]);
const CONJUNCTION_ADJOINED_FUNCTIONS = Object.freeze([
  "none",
  "supplementary-object",
  "supplementary-subject",
  "adverbial-adjunct",
  "adjectival-modifier",
]);
const CORRELATION_TYPES = Object.freeze(["standard", "loose"]);
const CORRELATIVE_PATTERNS = Object.freeze([
  "ahzo-ahzo",
  "ahzo-eh-ahzo-eh",
  "ahzo-ahzo-no",
  "ahmo-no-ahmo-no",
  "paired-nncs",
]);
const LEXICAL_CONJUNCTION_TYPES = Object.freeze([
  "lord-and-master",
  "bread-and-butter",
]);
const LEXICAL_ADJUNCTOR_DISTRIBUTIONS = Object.freeze([
  "none",
  "in-before-each",
  "in-before-left-only",
]);
const LEXICAL_STATE_REALIZATIONS = Object.freeze([
  "conjoined-stems",
  "compound-handoff",
]);
const PARALLEL_TYPES = Object.freeze([
  "rephrasive",
  "progressive",
  "combined",
]);
const REPHRASE_AXES = Object.freeze([
  "nonspecific-specific-object",
  "active-passive",
  "tense-shift",
  "incorporated-supplementary-object",
  "intransitive-reflexive-transitive",
]);
const APPOSITIVE_TYPES = Object.freeze([
  "none",
  "clarifying",
  "summarizing",
]);
const COMPARISON_CHOICE_VALUES = Object.freeze({
  sentenceType: Object.freeze([
    "none",
    "declarative",
    "interrogative",
    "exclamative",
  ]),
  sameAsMarker: Object.freeze([
    "zan-no-yehhuatl",
    "zan-ye-yehhuatl",
    "zan-ye-no-yehhuatl",
    "zan-no-yeh",
    "zan-ye-yeh",
    "zan-ye-no-yeh",
  ]),
  negativeIntroducer: Object.freeze([
    "inahmo",
    "in-ahmo-iuh",
    "in-ahmo-iuhqui",
    "in-ahmo-mach-iuh",
    "in-ahmo-mach-iuhqui",
  ]),
  degreeMarker: Object.freeze([
    "none",
    "achi",
    "zan-achi",
    "cencah",
    "oc",
    "oc-achi",
    "oc-cencah",
    "oc-cencah-yeh",
    "oc-cencah-yehhuatl",
    "oc-yeh",
    "oc-yeh-cencah",
    "huel-oc",
    "huel-oc-achi",
    "huel-oc-cencah",
  ]),
  adversativeMarker: Object.freeze(["zan", "yeceh"]),
  questionCollocation: Object.freeze([
    "oc-yeh",
    "oc-eh",
    "zan-yeh",
    "oc-yeh-cencah-hualcah",
    "oc-yeh-cencah-tlapanahuia",
  ]),
  superlativeAdverbial: Object.freeze([
    "cencah",
    "huel",
    "cencah-huel",
    "za-cencah",
    "za-cencah-huel",
  ]),
  incorporatedSuperlative: Object.freeze([
    "cem",
    "cenquizca",
    "cemahcica",
  ]),
  superlativePrincipal: Object.freeze([
    "ahcic",
    "cemahcic",
    "tlapanahuia",
    "tlacempanahuia",
    "mahcitzinohticah",
    "mocemahcitzinohticah",
    "motlacempanahuilia",
  ]),
  iuhquiModifier: Object.freeze([
    "none",
    "ca",
    "ca-zan",
    "ca-ye",
    "huel",
    "zan-achi-huel",
    "ahmo-zan-no",
    "za",
    "ma-nen",
  ]),
  principalNnc: Object.freeze(["tachcauh", "hualcah"]),
  continuationFamily: Object.freeze([
    "absolutive-tl",
    "absolutive-tli",
    "absolutive-li",
    "hui-preterit-agentive",
    "ti-agentive",
    "oyotl-nehnemi",
    "cihuatl-tlahtoa",
    "bare",
  ]),
  position: Object.freeze(["preposed", "postposed"]),
  boolean: Object.freeze(["yes", "no"]),
});
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
  "degreeMarker",
  "adversativeMarker",
  "questionCollocation",
  "superlativeAdverbial",
  "incorporatedSuperlative",
  "superlativePrincipal",
  "iuhquiModifier",
  "principalNnc",
  "continuationFamily",
  "adjunctorIn",
  "icRelation",
  "copula",
  "position",
  "supplementationReferenceMode",
  "supplementationHeadRole",
  "supplementationContactRole",
  "supplementationOrder",
  "supplementationAntecessivePlacement",
  "contextualSilentFirstPerson",
  "supplementObjectId",
  "wishRealizability",
  "exclamatoryPersonalPronounVariant",
  "glottalVariant",
  "silentPluralIn",
  "mach",
  "fuseQuilMach",
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
  return freezeArray(MARKING_VALUES_BY_RELATION[normalizedRelation] || []);
}

function buildDecision({
  id,
  values = [],
  selectedValue = "",
  required = true,
  reason = "",
  optionAvailability = [],
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

function getAdjectivalModifierClauseType(sourceUnit = null, capture = null) {
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

function isAdjectivalCompoundHead(capture = null) {
  const canonicalResult = capture?.canonicalResult || {};
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
        "principal",
        "adjoined",
        "dependent",
        "supplement",
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
      return Object.freeze(["principal"]);
    }
    if (normalizedRelation === "rumored-report") {
      return Object.freeze(["principal", "adjoined"]);
    }
    if (normalizedRelation === "deleted-principal") {
      return Object.freeze(["principal", "adjoined", "dependent"]);
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
            ownerSourceResult,
            { referenceId: `binding-${role}` },
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
          {
            referenceId: `binding-${role}`,
            subjectReferenceId: `binding-${role}-subject`,
            objectReferenceId: `binding-${role}-object`,
            possessorReferenceId: `binding-${role}-possessor`,
          },
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
      ownerEvidenceKind = "clause-composition-source-frame";
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
      accepted = Boolean(
        sourceUnit?.ok
        && (
          role === "principal"
            ? unitType === "nnc"
            : ["nnc", "vnc", "clause", "sentence"].includes(unitType)
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

  function bindingMarkerSupportsRelation(
    relation = "",
    exactResult = null,
    sourceUnit = null,
  ) {
    const normalizedRelation = normalizeToken(relation);
    if (normalizedRelation === "exclamatory-utterance") return true;
    const markerSemantic = normalizeToken(
      exactResult?.semanticMarker
      || getTypedMarkerProfile(exactResult)
      || sourceUnit?.features?.negativizedParticle
      || "",
    );
    return Boolean(
      markerSemantic
      && (
        (MARKING_VALUES_BY_RELATION[normalizedRelation] || []).includes(
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
    const sourceUnit = typeof targetObject
      .getCanonicalAdverbialAdjunctionSourceUnit === "function"
      ? targetObject.getCanonicalAdverbialAdjunctionSourceUnit(
        exactResult,
        role,
      )
      : null;
    if (role === "marker") {
      return sourceEvidence.unitType === "particle"
        && bindingMarkerSupportsRelation(
          relation,
          exactResult,
          sourceUnit,
        );
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
        return ["l58-quemah", "l58-quemahca"].includes(particleId);
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

  function issueClassicalClauseRelationBindingFrame(
    operationId = "",
    currentResult = null,
  ) {
    const normalizedOperationId = String(operationId || "").trim();
    const operationRecognized = BINDING_OPERATION_IDS.includes(
      normalizedOperationId,
    );
    const captureSlotId = "clause-relation-binding-source";
    const resultCapture = operationRecognized
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
    const roleAvailability = new Map();
    if (captureValid) {
      CAPTURE_ROLES.forEach(role => {
        roleEvidence.set(
          role,
          getBindingOwnerSourceEvidence(
            normalizedOperationId,
            exactResult,
            role,
          ),
        );
        const probe = createClassicalClauseRelationController();
        const probeCapture = probe.captureCurrentResult(role, exactResult);
        roleAvailability.set(
          role,
          probeCapture.authorizationStatus === "authorized"
            ? probe.issueRelationAvailabilityContract()
            : null,
        );
      });
    }
    const bindingChoices = freezeArray(
      relationIds.flatMap(relation => (
        getBindingRolesForRelation(relation).flatMap(role => {
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
    const issuedRelationAvailabilityContracts = new WeakSet();
    let captureRevision = 0;

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
      const blocked = blockReason => Object.freeze({
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
        return blocked(
          prospectiveOption?.reasonCode
          || "classical-clause-relation-binding-incompatible-with-current-captures",
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

    function getComparisonChoiceValues(routeId = "", field = "") {
      if (field === "degreeMarker") {
        if (
          [
            "similarity-tloc-relational-nnc",
            "similarity-incorporated-nehnequi",
          ].includes(routeId)
        ) {
          return freezeArray(["none", "achi"]);
        }
        if (routeId === "size-ixquich") {
          return freezeArray(["none", "achi", "zan-achi"]);
        }
        if (routeId === "comparative-tachcauh-hualcah") {
          return freezeArray([
            "oc",
            "oc-achi",
            "oc-cencah",
            "huel-oc",
            "huel-oc-achi",
            "huel-oc-cencah",
          ]);
        }
        if (routeId.startsWith("comparative-panahuia")) {
          return freezeArray([
            "none",
            "achi",
            "cencah",
            "oc",
            "oc-achi",
            "oc-cencah",
            "huel-oc",
            "huel-oc-achi",
            "huel-oc-cencah",
          ]);
        }
      }
      if (["adjunctorIn", "icRelation", "copula"].includes(field)) {
        return COMPARISON_CHOICE_VALUES.boolean;
      }
      return freezeArray(COMPARISON_CHOICE_VALUES[field] || []);
    }

    function getComparisonChoiceDefault(
      routeId = "",
      field = "",
      layout = {},
    ) {
      if (field === "sentenceType") return "none";
      if (field === "sameAsMarker") return "zan-no-yehhuatl";
      if (field === "negativeIntroducer") return "in-ahmo-iuhqui";
      if (field === "adversativeMarker") return "yeceh";
      if (field === "questionCollocation") return "oc-yeh";
      if (field === "superlativeAdverbial") return "cencah";
      if (field === "incorporatedSuperlative") return "cem";
      if (field === "superlativePrincipal") return "ahcic";
      if (field === "iuhquiModifier") return "none";
      if (field === "principalNnc") return "tachcauh";
      if (field === "continuationFamily") return "bare";
      if (field === "position") return "preposed";
      if (field === "adjunctorIn") return "yes";
      if (field === "icRelation") {
        return Object.values(layout).includes("dimension") ? "yes" : "no";
      }
      if (field === "copula") return "no";
      if (field === "degreeMarker") {
        return getComparisonChoiceValues(routeId, field).includes("none")
          ? "none"
          : getComparisonChoiceValues(routeId, field)[0] || "";
      }
      return "";
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
      decisions.push(buildDecision({
        id: "complement-order",
        values: COMPLEMENT_ORDERS,
        selectedValue: complementOrder,
        reason: "the captured principal and complement permit these orders",
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
      if (relation === "conjunction") {
        const requestedCoordinationRelation = normalizeToken(
          selectionObject.coordinationRelation,
        );
        const coordinationRelation = ["marked", "unmarked"].includes(
          requestedCoordinationRelation,
        )
          ? requestedCoordinationRelation
          : "";
        decisions.push(buildDecision({
          id: "coordination-relation",
          values: ["marked", "unmarked"],
          selectedValue: coordinationRelation,
          reason: "the conjunction may be structurally marked or asyndetic",
        }));
        const requestedCoordinationType = normalizeToken(
          selectionObject.coordinationType,
        );
        const coordinationType = CONJUNCTION_COORDINATION_TYPES.includes(
          requestedCoordinationType,
        )
          ? requestedCoordinationType
          : "";
        decisions.push(buildDecision({
          id: "coordination-type",
          values: CONJUNCTION_COORDINATION_TYPES,
          selectedValue: coordinationType,
          reason: "additive, alternative, and adversative coordination differ",
        }));
        const requestedLevel = normalizeToken(selectionObject.clauseLevel);
        const level = CONJUNCTION_LEVELS.includes(requestedLevel)
          ? requestedLevel
          : "";
        decisions.push(buildDecision({
          id: "clause-level",
          values: CONJUNCTION_LEVELS,
          selectedValue: level,
          reason: "coordination applies at a selected clause rank",
        }));
        const requestedPolarity = normalizeToken(selectionObject.polarity);
        const polarity = CONJUNCTION_POLARITIES.includes(requestedPolarity)
          ? requestedPolarity
          : "";
        decisions.push(buildDecision({
          id: "polarity",
          values: CONJUNCTION_POLARITIES,
          selectedValue: polarity,
          reason: "negative coordination licenses its own modifier inventory",
        }));
        const leftContext = ["present", "absent"].includes(
          normalizeToken(selectionObject.leftContext),
        )
          ? normalizeToken(selectionObject.leftContext)
          : "";
        decisions.push(buildDecision({
          id: "left-context",
          values: ["present", "absent"],
          selectedValue: leftContext,
          reason: "sentence-initial auh is licensed only with absent left context",
        }));
        requireCapturedSource("principal", diagnostics, {
          diagnosticPrefix: "classical-conjunction",
        });
        if (leftContext !== "absent") {
          requireCapturedSource("adjoined", diagnostics, {
            diagnosticPrefix: "classical-conjunction",
          });
        }
        const modifierValues = CONJUNCTION_RIGHTWARD_MODIFIERS[
          coordinationType
        ] || [];
        const requestedModifier = normalizeToken(
          selectionObject.rightwardModifier,
        );
        const rightwardModifier = modifierValues.includes(requestedModifier)
          ? requestedModifier
          : "";
        if (coordinationType) {
          decisions.push(buildDecision({
            id: "rightward-modifier",
            values: modifierValues,
            selectedValue: rightwardModifier,
            reason: "the right conjunct licenses a typed adverbial modifier",
          }));
        }
        const modifierAdjunctor = ["none", "in"].includes(
          normalizeToken(selectionObject.modifierAdjunctor),
        )
          ? normalizeToken(selectionObject.modifierAdjunctor)
          : "";
        decisions.push(buildDecision({
          id: "modifier-adjunctor",
          values: ["none", "in"],
          selectedValue: modifierAdjunctor,
          reason: "in may introduce only the licensed rightward modifier",
        }));
        const sharedModifierScope = [
          "none",
          "before-first-applies-to-all",
        ].includes(normalizeToken(selectionObject.sharedModifierScope))
          ? normalizeToken(selectionObject.sharedModifierScope)
          : "";
        decisions.push(buildDecision({
          id: "shared-modifier-scope",
          values: ["none", "before-first-applies-to-all"],
          selectedValue: sharedModifierScope,
          reason: "a preposed modifier may scope over every conjunct",
        }));
        const requestedSharedModifier = normalizeToken(
          selectionObject.sharedModifier || "none",
        );
        const sharedModifier = CONJUNCTION_SHARED_MODIFIERS.includes(
          requestedSharedModifier,
        )
          ? requestedSharedModifier
          : "";
        decisions.push(buildDecision({
          id: "shared-modifier",
          values: CONJUNCTION_SHARED_MODIFIERS,
          selectedValue: sharedModifier,
          reason:
            "ah or aic may be placed before the first conjunct with typed scope over every conjunct",
        }));
        if (
          requestedSharedModifier
          && !sharedModifier
        ) {
          diagnostics.push(
            "classical-conjunction-shared-modifier-not-licensed",
          );
        }
        if (
          sharedModifierScope === "before-first-applies-to-all"
          && sharedModifier === "none"
        ) {
          diagnostics.push(
            "classical-conjunction-shared-modifier-required-for-pre-first-scope",
          );
        }
        if (
          sharedModifierScope === "none"
          && sharedModifier
          && sharedModifier !== "none"
        ) {
          diagnostics.push(
            "classical-conjunction-shared-modifier-requires-pre-first-scope",
          );
        }
        const adjoinedFunction =
          CONJUNCTION_ADJOINED_FUNCTIONS.includes(
            normalizeToken(selectionObject.adjoinedFunction),
          )
            ? normalizeToken(selectionObject.adjoinedFunction)
            : "";
        decisions.push(buildDecision({
          id: "adjoined-function",
          values: CONJUNCTION_ADJOINED_FUNCTIONS,
          selectedValue: adjoinedFunction,
          reason: "adjoined conjunctions retain a typed clause function",
        }));
        let markedAdjoinedUse = "no";
        if (coordinationRelation === "marked" && level === "adjoined") {
          markedAdjoinedUse = ["yes", "no"].includes(
            normalizeToken(selectionObject.markedAdjoinedUse),
          )
            ? normalizeToken(selectionObject.markedAdjoinedUse)
            : "";
          decisions.push(buildDecision({
            id: "marked-adjoined-use",
            values: ["yes", "no"],
            selectedValue: markedAdjoinedUse,
            reason: "marked adjoined coordination is an explicit unusual use",
          }));
        }
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
          markedAdjoinedException: markedAdjoinedUse === "yes",
          adjoinedFunction,
        });
      } else if (relation === "correlative-conjunction") {
        requireCapturedSource("principal", diagnostics, {
          diagnosticPrefix: "classical-conjunction",
        });
        requireCapturedSource("adjoined", diagnostics, {
          diagnosticPrefix: "classical-conjunction",
        });
        const correlationType = CORRELATION_TYPES.includes(
          normalizeToken(selectionObject.correlationType),
        )
          ? normalizeToken(selectionObject.correlationType)
          : "";
        decisions.push(buildDecision({
          id: "correlation-type",
          values: CORRELATION_TYPES,
          selectedValue: correlationType,
          reason: "standard particle pairs and loose NNC correlation differ",
        }));
        const patternValues = correlationType === "loose"
          ? ["paired-nncs"]
          : CORRELATIVE_PATTERNS.filter(value => value !== "paired-nncs");
        const pattern = patternValues.includes(
          normalizeToken(selectionObject.correlativePattern),
        )
          ? normalizeToken(selectionObject.correlativePattern)
          : "";
        if (correlationType) {
          decisions.push(buildDecision({
            id: "correlative-pattern",
            values: patternValues,
            selectedValue: pattern,
            reason: "the selected correlation type licenses its paired pattern",
          }));
        }
        Object.assign(operationSelections, {
          correlationType,
          pattern,
        });
      } else if (relation === "lexical-conjunction") {
        requireCapturedSource("principal", diagnostics, {
          diagnosticPrefix: "classical-conjunction",
        });
        requireCapturedSource("adjoined", diagnostics, {
          diagnosticPrefix: "classical-conjunction",
        });
        const lexicalType = LEXICAL_CONJUNCTION_TYPES.includes(
          normalizeToken(selectionObject.lexicalType),
        )
          ? normalizeToken(selectionObject.lexicalType)
          : "";
        const adjunctorDistribution =
          LEXICAL_ADJUNCTOR_DISTRIBUTIONS.includes(
            normalizeToken(selectionObject.adjunctorDistribution),
          )
            ? normalizeToken(selectionObject.adjunctorDistribution)
            : "";
        const stateRealization = LEXICAL_STATE_REALIZATIONS.includes(
          normalizeToken(selectionObject.stateRealization),
        )
          ? normalizeToken(selectionObject.stateRealization)
          : "";
        [
          ["lexical-type", LEXICAL_CONJUNCTION_TYPES, lexicalType],
          [
            "adjunctor-distribution",
            LEXICAL_ADJUNCTOR_DISTRIBUTIONS,
            adjunctorDistribution,
          ],
          ["state-realization", LEXICAL_STATE_REALIZATIONS, stateRealization],
        ].forEach(([id, values, selectedValue]) => {
          decisions.push(buildDecision({
            id,
            values,
            selectedValue,
            reason: "lexical conjunction requires a typed structural choice",
          }));
        });
        Object.assign(operationSelections, {
          lexicalType,
          adjunctorDistribution,
          stateRealization,
        });
      } else {
        requireCapturedSource("principal", diagnostics, {
          diagnosticPrefix: "classical-parallel-structure",
        });
        requireCapturedSource("adjoined", diagnostics, {
          diagnosticPrefix: "classical-parallel-structure",
        });
        const parallelType = PARALLEL_TYPES.includes(
          normalizeToken(selectionObject.parallelType),
        )
          ? normalizeToken(selectionObject.parallelType)
          : "";
        const rephraseAxis = REPHRASE_AXES.includes(
          normalizeToken(selectionObject.rephraseAxis),
        )
          ? normalizeToken(selectionObject.rephraseAxis)
          : "";
        const appositiveType = APPOSITIVE_TYPES.includes(
          normalizeToken(selectionObject.appositiveType),
        )
          ? normalizeToken(selectionObject.appositiveType)
          : "";
        decisions.push(buildDecision({
          id: "parallel-type",
          values: PARALLEL_TYPES,
          selectedValue: parallelType,
          reason: "parallel structures rephrase, progress, or combine both",
        }));
        if (["rephrasive", "combined"].includes(parallelType)) {
          decisions.push(buildDecision({
            id: "rephrase-axis",
            values: REPHRASE_AXES,
            selectedValue: rephraseAxis,
            reason: "rephrasive parallelism selects its typed contrast axis",
          }));
        }
        decisions.push(buildDecision({
          id: "appositive-type",
          values: APPOSITIVE_TYPES,
          selectedValue: appositiveType,
          reason: "parallel apposition may clarify, summarize, or remain absent",
        }));
        Object.assign(operationSelections, {
          parallelType,
          rephraseAxis,
          appositiveType,
        });
      }
      return buildNewRelationContract({
        selectionObject,
        relation,
        decisions,
        diagnostics,
        derived: {
          operationFamily: "conjunction",
          operationKind: relation,
          conjunctCount: [
            "principal",
            "adjoined",
            "dependent",
          ].filter(role => getValidatedCapture(role)).length,
          sharedSupplementPresent: Boolean(
            getValidatedCapture("supplement"),
          ),
          nestedComposition: [
            "principal",
            "adjoined",
            "dependent",
          ].some(role => getSourceUnit(role)?.sourceKind === "composition-ast"),
        },
        operationSelections,
        derivedFieldIds: [
          "operation-family",
          "operation-kind",
          "conjunct-count",
          "shared-supplement-present",
          "nested-composition",
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
      }));
      if (requestedRoute && !routeSpec) {
        diagnostics.push("classical-comparison-route-not-licensed");
      }
      const layout = COMPARISON_CAPTURE_SLOT_LAYOUTS[routeSpec?.id] || {};
      const requiredSlots = new Set(routeSpec?.requiredSlots || []);
      Object.entries(layout).forEach(([role, slotId]) => {
        if (requiredSlots.has(slotId)) {
          requireCapturedSource(role, diagnostics, {
            diagnosticPrefix: "classical-comparison",
          });
        }
      });
      const operationSelections = {
        comparisonRoute: routeSpec?.id || "",
      };
      Array.from(routeSpec?.choiceFields || []).forEach(field => {
        const values = getComparisonChoiceValues(routeSpec.id, field);
        const selectionKey = field;
        const requestedValue = normalizeToken(selectionObject[selectionKey]);
        const defaultValue = getComparisonChoiceDefault(
          routeSpec.id,
          field,
          layout,
        );
        const selectedValue = values.includes(requestedValue)
          ? requestedValue
          : requestedValue
            ? ""
            : defaultValue;
        decisions.push(buildDecision({
          id: field.replace(/[A-Z]/gu, letter => `-${letter.toLowerCase()}`),
          values,
          selectedValue,
          reason: `the ${routeSpec.id} route licenses this comparison choice`,
        }));
        if (requestedValue && !selectedValue) {
          diagnostics.push(`classical-comparison-${field}-not-licensed`);
        }
        operationSelections[field] = selectedValue;
      });
      return buildNewRelationContract({
        selectionObject,
        relation,
        decisions,
        diagnostics,
        derived: {
          operationFamily: "comparison",
          operationKind: routeSpec?.operation || "",
          comparisonRelation: routeSpec?.relation || "",
          comparisonRoute: routeSpec?.id || "",
          captureSlotLayout: Object.freeze({ ...layout }),
          requiredCaptureRoles: Object.freeze(
            Object.entries(layout)
              .filter(([, slotId]) => requiredSlots.has(slotId))
              .map(([role]) => role),
          ),
          optionalCaptureRoles: Object.freeze(
            Object.entries(layout)
              .filter(([, slotId]) => !requiredSlots.has(slotId))
              .map(([role]) => role),
          ),
        },
        operationSelections,
        derivedFieldIds: [
          "operation-family",
          "operation-kind",
          "comparison-relation",
          "capture-slot-layout",
          "required-capture-roles",
          "optional-capture-roles",
        ],
      });
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
          || getTypedMarkerProfile(markerCapture?.canonicalResult)
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
        }) => {
          const requested = normalizeToken(selectionObject[key]);
          const explicitChoiceRequired = expose && values.length > 1;
          const selectedValue = values.includes(requested)
            ? requested
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
            }));
          }
          if (requested && !selectedValue) {
            diagnostics.push(`classical-supplementation-${id}-not-licensed`);
          }
          operationSelections[key] = selectedValue;
          return selectedValue;
        };
        const typedInterrogativeSupplement = Boolean(
          supplementPreview?.interrogativeKind,
        );
        const referenceMode = resolveChoice({
          id: "supplementation-reference-mode",
          key: "supplementationReferenceMode",
          values: typedInterrogativeSupplement
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
        const headRoleValues = referenceMode === "absolute-topic"
          ? ["subject"]
          : referenceMode === "included" && includedObjectContent
            ? principalPreview?.objects?.length ? ["object"] : []
          : referenceMode === "included" && includedSemanticGroup === "affect"
            ? ["subject"]
          : principalPreview?.unitKind === "nnc"
          ? [
              "subject",
              ...(principalPreview.possessor ? ["possessor"] : []),
            ]
          : principalPreview?.unitKind === "vnc"
            ? [
                "subject",
                ...(principalPreview.objects?.length ? ["object"] : []),
              ]
            : [];
        const headRole = resolveChoice({
          id: "supplementation-head-role",
          key: "supplementationHeadRole",
          values: headRoleValues,
          fallback: "subject",
          reason:
            "the typed principal leaves these personal-pronominal heads available",
        });
        const contactRoleValues = [
          "included",
          "absolute-topic",
        ].includes(referenceMode)
          ? ["subject"]
          : [
              ...(supplementPreview?.subject ? ["subject"] : []),
              ...(supplementPreview?.objects?.length ? ["object"] : []),
              ...(supplementPreview?.possessor ? ["possessor"] : []),
            ];
        const contactRole = resolveChoice({
          id: "supplementation-contact-role",
          key: "supplementationContactRole",
          values: contactRoleValues,
          fallback: "subject",
          reason:
            "the typed supplement leaves these personal-pronominal contacts available",
          expose: referenceMode !== "included" && contactRoleValues.length > 1,
        });
        const interrogativeSupplement = Boolean(
          referenceMode === "shared" && typedInterrogativeSupplement,
        );
        const orderValues = markerSemantic === "ca" || interrogativeSupplement
          ? ["supplement-first"]
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
        }
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
        const contextualSilentEligible = Boolean(
          referenceMode === "shared"
          && principalPreview?.unitKind === "vnc"
          && supplementPreview?.unitKind === "vnc"
          && principalPreview?.subject?.features?.person === "1"
          && supplementPreview?.subject?.features?.person === "1",
        );
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
        const glottalValues = speakerGender === "male"
          && /h$/u.test(vocativePreview?.surface || "")
          ? ["plain-e", "glottal-e"]
          : ["plain-e"];
        const silentPluralValues = speakerGender === "male"
          && vocativePreview?.subject?.features?.number === "plural"
          && /tin$/u.test(vocativePreview?.surface || "")
          && /t-in#$/u.test(vocativePreview?.formulaRealization || "")
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
                "the typed vocative source licenses this realization choice",
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
          if (requestedFusion && requestedFusion !== "separate") {
            diagnostics.push(
              "classical-rumored-report-fusion-requires-mach",
            );
          }
          operationSelections.fuseQuilMach = "separate";
        }
      } else if (relation === "deleted-principal") {
        requiredCaptureRoles = ["principal", "dependent", "adjoined"];
        requiredCaptureRoles.forEach(requireRole);
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
          && visiblePreview?.semanticGroup === "speech-action";
        const deletedSaying = deletedPreview?.unitKind === "vnc"
          && ["speech", "saying"].includes(deletedPreview?.semanticGroup);
        const deletionKind = cahProxy
          ? "cah-proxy"
          : visibleSpeechAction && deletedSaying
            ? "saying"
            : visiblePreview?.isAdverbialNnc === true && deletedSaying
              ? "saying-adverb-only"
              : "";
        if (!deletionKind && requiredCaptureRoles.every(role => (
          getValidatedCapture(role)
        ))) {
          diagnostics.push("classical-deleted-principal-route-not-licensed");
        }
        operationSelections.deletionKind = deletionKind;
        operationSelections.adverbialRole = cahProxy ? adverbialRole : "";
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

    function getCapturedRelationSourceFacts(role = "") {
      const capture = getValidatedCapture(role);
      const sourceUnit = getSourceUnit(role);
      const compositionFrame = buildCapturedClauseCompositionSourceFrame(
        role,
        {
          referenceId: `${role}-availability`,
          subjectReferenceId: `${role}-availability-subject`,
          objectReferenceId: `${role}-availability-object`,
          possessorReferenceId: `${role}-availability-possessor`,
        },
      );
      const supplementationEnvelope = buildCapturedSupplementationEnvelope(
        role,
        {
          referenceId: `${role}-availability`,
          subjectReferenceId: `${role}-availability-subject`,
          objectReferenceId: `${role}-availability-object`,
          possessorReferenceId: `${role}-availability-possessor`,
        },
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
          && (
            (principal.subjectNumber && principal.subjectNumber !== "plural")
            || (principal.tense && principal.tense !== "preterit")
            || (principal.sourceStem && principal.sourceStem !== "ā")
          )
        ) {
          return impossible(
            "Negative ac plural requires the exact plural ā preterit Result.",
          );
        }
      } else if (relation === "contextual-first-person-realization") {
        if (principal.captured && principal.unitKind !== "vnc") {
          return impossible("Contextual first-person realization requires a VNC Result.");
        }
        if (
          principal.captured
          && principal.subjectPerson
          && principal.subjectPerson !== "1"
        ) {
          return impossible(
            "Contextual first-person realization requires a first-person VNC Result.",
          );
        }
        if (
          principal.captured
          && principal.objectKind
          && !principal.objectKind.includes("reflexive")
        ) {
          return impossible(
            "Contextual first-person realization requires a reflexive VNC Result.",
          );
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
        return Object.freeze({ all: freezeArray(["principal"]) });
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
            && getTypedBoolean(
              getValidatedCapture("adjoined")?.canonicalResult,
              ["conditionalCuePresent"],
            )
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
          && adjoined.unitKind !== "sentence"
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
          && !(
            principal.unitKind === "vnc"
            && principal.subjectNumber === "plural"
            && principal.tense === "preterit"
            && principal.sourceStem === "ā"
          )
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
          && !(
            principal.unitKind === "vnc"
            && principal.subjectPerson === "1"
            && principal.objectKind.includes("reflexive")
          )
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

    function buildDecisionContract(selections = {}) {
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
        );
        const transitiveContactRequired =
          modifierClauseType === "transitive-vnc";
        const requestedLinkRole = normalizeToken(selectionObject.linkKind);
        const transitiveContactValues = ownerAxisValues(
          "transitive-reference-contact",
        ).filter(value => value !== "not-applicable");
        const linkRole = transitiveContactRequired
          ? transitiveContactValues.includes(requestedLinkRole)
            ? requestedLinkRole
            : ""
          : "shared-subject";
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
          && requestedLinkRole !== "shared-subject"
        ) {
          diagnostics.push(
            "classical-adjectival-modification-link-role-not-applicable",
          );
        }
        const dependentModifierClauseType =
          topology === "cooperating-preposed-nonpreposed"
            ? getAdjectivalModifierClauseType(
                dependentSource,
                dependentCapture,
              )
            : "";
        const dependentTransitiveContactRequired =
          dependentModifierClauseType === "transitive-vnc";
        const requestedDependentLinkRole = normalizeToken(
          selectionObject.dependentLinkKind,
        );
        const dependentLinkRole = dependentTransitiveContactRequired
          ? transitiveContactValues.includes(
              requestedDependentLinkRole,
            )
            ? requestedDependentLinkRole
            : ""
          : "shared-subject";
        if (dependentTransitiveContactRequired) {
          decisions.push(buildDecision({
            id: "dependent-link-kind",
            values: transitiveContactValues,
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

        const compoundHead = isAdjectivalCompoundHead(principalCapture);
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
        const scope = (
          order === "modifier-head-preposed"
          && adjunctor === "in"
        ) || (
          topology === "cooperating-preposed-nonpreposed"
          && ["preposed-in", "both-in"].includes(adjunctor)
        )
          ? "adjoined-unit"
          : "complete-sentence";
        const ambiguityType = (
          transitiveContactRequired
          || dependentTransitiveContactRequired
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
          scope,
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
        degree === "second"
        && ["place", "time"].includes(relation)
        && unitType === "nnc"
      );
      const structureProfileValues = relationAllowsApposition
        ? ["modification", "apposition"]
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
          reason: "place or time sequence remains ambiguous between modification and apposition",
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
        : degree === "nonadverbialized" || recursion !== "none"
          ? "complex"
          : "simple";

      const orderValues = !relation
        ? []
        : structureProfile === "apposition"
          ? ["appositive-head-modifier"]
          : relation === "reason"
            ? ["head-modifier"]
            : ["modifier-head", "head-modifier"];
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

      const relationProfileValues = degree === "nonadverbialized"
        ? PROFILE_VALUES_BY_RELATION[relation] || []
        : [];
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
        }));
      }
      if (
        requestedRelationProfile
        && !relationProfileValues.includes(requestedRelationProfile)
      ) {
        diagnostics.push("classical-clause-relation-profile-not-licensed");
      }

      const derivedMarkerProfile = markerCapture
        ? getTypedMarkerProfile(markerCapture.canonicalResult)
        : "unmarked";
      const markerProfileValues = markerCapture
        ? MARKING_VALUES_BY_RELATION[relation] || ["particle"]
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
          && getTypedBoolean(adjoinedCapture?.canonicalResult, [
            "conditionalCuePresent",
          ])
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
      ) {
        return canonicalResult.principalClause;
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

    function composeSupplementationRelation(contract = null) {
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
        const applicationResult =
          targetObject.executeClassicalGrammarApplicationRequest({
            operationId: "sentence:supplementation",
            args: [request, ...exactCapturedResults],
          });
        return targetObject.isClassicalGrammarApplicationResult(
          applicationResult
        )
          ? applicationResult
          : null;
      };
      const relation = contract.relation;
      const selected = contract.operationSelections || {};
      const principalContinuation =
        getCapturedSupplementationContinuation("principal");
      const supplementContinuation =
        getCapturedSupplementationContinuation("adjoined");
      const buildEnvelope = (
        role,
        referenceId,
        subjectReferenceId = referenceId,
        objectReferenceId = referenceId,
        possessorReferenceId = referenceId,
        extraOptions = {},
      ) => buildCapturedSupplementationEnvelope(role, {
        referenceId,
        subjectReferenceId,
        objectReferenceId,
        possessorReferenceId,
        ...extraOptions,
      });
      let request = { operationKind: relation };
      if (relation === "supplementation") {
        const shared = selected.supplementationReferenceMode === "shared";
        const absoluteTopic =
          selected.supplementationReferenceMode === "absolute-topic";
        const principalReference = "supplementation-principal";
        const sourceContext =
          getDiscourseSourceContextFrame("adjoined");
        const agreementException = selected.agreementException || "";
        const namedPartner = agreementException === "named-partner";
        const principalContactReference = namedPartner
          ? "supplementation-named-partner-group"
          : shared
          ? "supplementation-shared-referent"
          : "supplementation-principal";
        const supplementContactReference = namedPartner
          ? "supplementation-named-third-party"
          : shared
          ? "supplementation-shared-referent"
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
            : supplementReference;
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
            headRole: selected.supplementationHeadRole,
            supplementContactRole:
              selected.supplementationContactRole,
            order: selected.supplementationOrder,
            adjunctor: selected.markerSemantic === "in" ? "in" : "none",
            commentEmphaticCa: selected.markerSemantic === "ca",
            fuseDemonstrativeAdjunctor:
              selected.markerSemantic === "in"
              && ["in", "on"].includes(supplementClause?.demonstrativeKind),
            informationQuestion: selected.informationQuestion === true,
            integratedAntecessive: selected.integratedAntecessive === true,
            includedAntecessiveJump:
              selected.includedAntecessiveJump === true,
            agreementException,
            principalObjectId: selected.principalObjectId || "",
            supplementObjectId: selected.supplementObjectId || "",
            retainContactAlternatives:
              selected.retainContactAlternatives === true,
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
            principalActsAsStandaloneUtterance: false,
            supplementActsAsStandaloneUtterance: false,
          },
        };
      } else if (relation === "vocative") {
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
          supplementClause: buildEnvelope(
            "adjoined",
            "reported-whole-supplement",
          ),
          options: {
            mach: selected.mach === "present",
            fuseQuilMach: selected.fuseQuilMach === "fused",
          },
        };
      } else if (relation === "deleted-principal") {
        const sayingDeletion = selected.deletionKind.startsWith("saying");
        const visiblePreview = buildEnvelope(
          "principal",
          "deleted-visible-preview",
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
            )) || null
          : null;
        const visibleObjectReferenceIds = Object.fromEntries(
          Array.from(visiblePreview?.objects || []).map(object => [
            object.id,
            "shared-addressee",
          ]),
        );
        const deletedObjectReferenceIds = Object.fromEntries(
          Array.from(deletedPreview?.objects || []).map(object => [
            object.id,
            object.id === deletedContentObject?.id
              ? "deleted-whole-supplement"
              : "shared-addressee",
          ]),
        );
        const visibleEnvelope = buildEnvelope(
          "principal",
          "deleted-visible",
          sayingDeletion ? "shared-speaker" : "deleted-visible",
          "shared-addressee",
          "deleted-visible-possessor",
          { objectReferenceIds: visibleObjectReferenceIds },
        );
        const deletedPrincipalClause = buildEnvelope(
          "dependent",
          "deleted-principal",
          selected.deletionKind === "cah-proxy"
            ? "deleted-shared-subject"
            : "shared-speaker",
          "shared-addressee",
          "deleted-principal-possessor",
          { objectReferenceIds: deletedObjectReferenceIds },
        );
        const supplementClause = buildEnvelope(
          "adjoined",
          "deleted-whole-supplement",
          selected.deletionKind === "cah-proxy"
            ? "deleted-shared-subject"
            : "deleted-whole-supplement",
        );
        const visiblePrincipalClause = selected.deletionKind === "cah-proxy"
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

    function compose(selections = {}) {
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
        return composeSupplementationRelation(contract);
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
          targetObject.requestClassicalClauseCompositionResult(request);
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
        const sharedReference = contract.relation === "lexical-conjunction"
          ? "lexical-conjunction-shared-referent"
          : "";
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
          sharedSupplement,
          options: {
            ...contract.operationSelections,
          },
        };
        const canonicalResult =
          targetObject.requestClassicalClauseCompositionResult(request);
        const authorized = Boolean(
          targetObject.isClassicalNahuatlClauseConjunctionResultFrame(canonicalResult)
          && canonicalResult.authorizationStatus === "authorized",
        );
        return buildControllerResult({
          contract,
          canonicalRequest: {
            operationKind: request.operationKind,
            options: request.options,
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
        const slots = buildComparisonSourceSlots(contract);
        const choices = {};
        Object.entries(contract.operationSelections || {}).forEach(
          ([field, value]) => {
            if (field === "comparisonRoute") return;
            choices[field] = ["adjunctorIn", "icRelation", "copula"].includes(
              field,
            )
              ? value === "yes"
              : value;
          },
        );
        const request = {
          routeId: contract.derived.comparisonRoute,
          relation: contract.derived.comparisonRelation,
          slots,
          choices,
        };
        const canonicalResult =
          targetObject.requestClassicalComparisonResult(request);
        const authorized = Boolean(
          targetObject.isClassicalComparisonResultFrame(canonicalResult)
          && canonicalResult.authorizationStatus === "authorized",
        );
        return buildControllerResult({
          contract,
          canonicalRequest: {
            routeId: request.routeId,
            relation: request.relation,
            slotIds: Object.keys(slots),
            choices,
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
        if (contract.derived.modifierClauseType === "transitive-vnc") {
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
          targetObject.requestClassicalAdjectivalModificationResult(request);
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
        request.explicitAdverbialIndicator = contract.relationProfile === "explicit";
        request.principalCorroboratingAdverbial = contract.relationProfile === "corroborating";
      } else if (contract.relation === "condition") {
        request.conditionType = contract.relationProfile;
        request.conditionalCuePresent = !markerCapture
          && getTypedBoolean(adjoinedCapture.canonicalResult, [
            "conditionalCuePresent",
          ]);
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
      const canonicalResult = targetObject.requestClassicalAdverbialAdjunctionResult(
        request,
      );
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
      clearCapture,
      getState,
      applyBindingFrame,
      getMarkerProfilesForRelation:
        getClassicalClauseRelationMarkerProfiles,
      issueRelationAvailabilityContract,
      isRelationAvailabilityContract,
      buildDecisionContract,
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
    createClassicalClauseRelationControllerGlobals,
    createClassicalClauseRelationController,
  };
  return Object.freeze(api);
}

export function installClassicalClauseRelationControllerGlobals(
  targetObject = globalThis,
) {
  const api = createClassicalClauseRelationControllerGlobals(targetObject);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  installClassicalLateValidationOwnersGlobals(targetObject);
  return api;
}
