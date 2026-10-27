import { reduplicate } from "./reduplicative_realization.mjs";
import { getClassicalNahuatlNncPredicateBoundaryCarrier } from "./nnc_predicate_boundary.mjs";
import { pluralizeClassicalNahuatlLesson16InternalStem } from "./pronominal_internal_plural.mjs";
// Canonical typed nominal-construction grammar. Andrews lesson coordinates are
// curriculum/evidence metadata only; they never select a runtime operation.

import {
  buildClassicalNahuatlParticipantRoleTransitionFrame,
  isClassicalNahuatlParticipantFrame,
} from "./participant_frame.mjs?v=20260823-passive-formation-continuity-238";

const VERSION = 1;
// Exact lexical meanings, not a whitelist for productive compound Sources.
const COMPOUND_SEX_EMBED_MEANINGS = Object.freeze({oquich: "male", "cihuā": "female"});
const GCD_IDENTITY = "typed-ordered-source-constituents+licensed-relation+matrix-governance+canonical-target-evaluator";
const ISSUED_CONSTRUCTION_FRAMES = new WeakSet();
const NOMINAL_CONSTRUCTION_REQUESTS = new WeakMap();
const ISSUED_NOMINAL_NNC_SLOTS = new WeakSet();
const CONTEXTUAL_FLAWED_SUBJECT_SOURCES = new WeakMap();
const CONTEXTUAL_FLAWED_SUBJECT_SLOTS = new WeakMap();
const CONTEXTUAL_FLAWED_SUBJECT_FAMILY = "contextual-flawed-subject-nnc";
const CONTEXTUAL_FLAWED_SUBJECT_OPERATION = "contextual-flawed-subject-negative-nnc";
const ISSUED_ADJECTIVAL_SOURCE_CONSTITUENTS = new WeakSet();
const ISSUED_NOMINAL_EXTERNAL_OBJECTS = new WeakMap();
const ISSUED_SOURCE_AUTHORIZATION_FRAMES = new WeakSet();
const ISSUED_COMPOUND_USE_SOURCE_FRAMES = new WeakSet();
const ISSUED_RAW_COMPOUND_SOURCE_FRAMES = new WeakSet();
const ISSUED_AFFECTIVE_DENOMINAL_SOURCE_FRAMES = new WeakSet();
const ISSUED_NOMINAL_VNC_MATRIX_COORDINATES = new WeakSet();
const ISSUED_TYPED_SOURCE_BINDING_FRAMES = new WeakSet();
const TYPED_SOURCE_BINDING_CONTEXTS = new WeakMap();
const CARDINAL_NUMERIC_SOURCE_FRAMES = new WeakSet();
const CARDINAL_NUMERIC_SOURCE_CACHE = new Map();
const EXECUTED_TYPED_SOURCE_BINDING_FRAMES = new WeakSet();
const ISSUED_PARADIGM_PLANS = new WeakSet();
const ISSUED_PARADIGM_COORDINATES = new WeakSet();
const ISSUED_UI_PROJECTIONS = new WeakSet();
const ISSUED_CLOSED_CONSTRUCTION_EXCEPTION_VALIDATIONS = new WeakSet();
const ISSUED_INCORPORATED_NOUN_ROLE_VALIDATIONS = new WeakSet();
const ISSUED_PATIENTIVE_EMBED_CONSTITUENT_FRAMES = new WeakSet();
const ISSUED_PATIENTIVE_MATRIX_CONSTITUENT_FRAMES = new WeakSet();
const COMPOUND_NNC_RESTRICTED_USE_CITATION_PROJECTIONS = new WeakMap();
const COMPOUND_NNC_RESTRICTED_USE_CITATION_RECEIPTS = new WeakMap();
const COMPOUND_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND =
  "classical-nahuatl-compound-nnc-restricted-use-citation-projection";
const AFFECTIVE_NNC_RESTRICTED_USE_CITATION_PROJECTIONS = new WeakMap();
const AFFECTIVE_NNC_RESTRICTED_USE_CITATION_RECEIPTS = new WeakMap();
const AFFECTIVE_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND =
  "classical-nahuatl-affective-nnc-restricted-use-citation-projection";
const CARDINAL_NNC_WRITTEN_SPELLING_PROJECTIONS = new WeakMap();
const CARDINAL_NNC_WRITTEN_SPELLING_PARENTS = new WeakMap();
const CARDINAL_NNC_RESTRICTED_USE_CITATION_PROJECTIONS = new WeakMap();
const CARDINAL_NNC_RESTRICTED_USE_CITATION_RECEIPTS = new WeakMap();
const ISSUED_COB_GROSS_FORMATION_FRAMES = new WeakSet();
const ISSUED_GROSS_CONJUNCTION_EMBED_FRAMES = new WeakSet();
const CARDINAL_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND =
  "classical-nahuatl-cardinal-nnc-restricted-use-citation-projection";
const PARADIGM_PLAN_CONTEXTS = new WeakMap();
const UI_PROJECTION_CONTEXTS = new WeakMap();
const LCM_AXIS_IDS = Object.freeze([
  "construction-kind",
  "source-role",
  "semantic-relation",
  "embed-role",
  "matrix-kind",
  "source-valence",
  "target-valence",
  "subject",
  "state",
  "affective-matrix",
  "numeral-value",
  "count-kind",
  "classifier",
  "reduplication",
  "modifier",
  "composition-kind",
  "canonical-target-kind",
  "scalar-versus-full-paradigm",
]);
const CURRICULUM_LESSON_BY_CONSTRUCTION = Object.freeze({
  "nominal-embed-vnc": 30,
  "compound-nnc": 31,
  "affective-nnc": 32,
  "cardinal-numeral-nnc": 34,
  "calendar-date-nnc": 42,
  "adjectival-nnc": 41,
});
const SUPPORTED_NOMINAL_CONSTRUCTION_KINDS = Object.freeze(new Set(
  Object.keys(CURRICULUM_LESSON_BY_CONSTRUCTION)
));
const HOSTILE_AUTHORITY_KEYS = Object.freeze([
  "answer",
  "canvasAnswer",
  "derivedStem",
  "displayFormula",
  "displayText",
  "formula",
  "formulaArtifact",
  "generationAllowed",
  "lessonMetadata",
  "participantRoleTransitionFrame",
  "result",
  "resultSurface",
  "surface",
  "targetClass",
  "targetStem",
  "targetValence",
  "word",
]);
const CALLER_MINTED_SOURCE_AUTHORITY_KEYS = Object.freeze([
  "agentiveEmbed",
  "defectEntityAmbiguous",
  "defectStemLicensed",
  "embedIsCompound",
  "embedLexicalFamily",
  "embedLexicalRule",
  "embedSemanticClass",
  "embedSubclass",
  "firstConjunctVestige",
  "lexicalizedSpecialMeaning",
  "matrixIsApplicative",
  "matrixIsCompound",
  "matrixSubclass",
  "matrixTlaFusion",
  "orderAlternative",
  "sourceAnalysisAmbiguous",
  "sourceAuthorization",
  "sourceAuthorizationFrame",
  "specialMatrix",
  "uniqueLexemeLicensed",
]);
const NOMINAL_EMBED_2B_FINAL_A_STEMS = Object.freeze(new Set([
  "āma",
  "cihuā",
  "cuica",
  "ihtaca",
  "naca",
  "tlāca",
  "yaca",
]));
const NOMINAL_EMBED_UNIQUE_FAMILIES = Object.freeze(new Map([
  ["ih", "ih"],
  ["il", "unique"],
  ["pol", "unique"],
  ["poz", "unique"],
  ["tel", "unique"],
]));
const NOMINAL_COMPOUND_EMBED_SOURCE_CLASS_ANALYSES = Object.freeze({
  zero: Object.freeze({
    nounClass: "zero", useShape: "base", subclass: "",
    ephemeralFinalVowel: "", truncationRepair: "none",
  }),
  in: Object.freeze({
    nounClass: "in", useShape: "base", subclass: "",
    ephemeralFinalVowel: "", truncationRepair: "none",
  }),
  "tli-1": Object.freeze({
    nounClass: "tli", useShape: "base", subclass: "tli-1",
    ephemeralFinalVowel: "", truncationRepair: "none",
  }),
  "tli-2": Object.freeze({
    nounClass: "tli", useShape: "base", subclass: "tli-2",
    ephemeralFinalVowel: "", truncationRepair: "none",
  }),
  "tl-1-a": Object.freeze({
    nounClass: "tl", useShape: "base", subclass: "tl-1-a",
    ephemeralFinalVowel: "", truncationRepair: "none",
  }),
  "tl-1-b": Object.freeze({
    nounClass: "tl", useShape: "base", subclass: "tl-1-b",
    ephemeralFinalVowel: "", truncationRepair: "none",
  }),
  "tl-2-a": Object.freeze({
    nounClass: "tl", useShape: "truncated", subclass: "tl-2-a",
    ephemeralFinalVowel: "i", truncationRepair: "none",
  }),
  "tl-2-b-a": Object.freeze({
    nounClass: "tl", useShape: "truncated", subclass: "tl-2-b",
    ephemeralFinalVowel: "a", truncationRepair: "none",
  }),
  "tl-2-b-i": Object.freeze({
    nounClass: "tl", useShape: "truncated", subclass: "tl-2-b",
    ephemeralFinalVowel: "i", truncationRepair: "none",
  }),
  "tl-2-c": Object.freeze({
    nounClass: "tl", useShape: "truncated", subclass: "tl-2-c",
    ephemeralFinalVowel: "a", truncationRepair: "supportive-i",
  }),
});
const NOMINAL_COMPOUND_TYPED_SOURCE_BINDING_KIND =
  "classical-nahuatl-nominal-construction-typed-source-binding-frame";
const NOMINAL_COMPOUND_TYPED_SOURCE_SELECTION_FIELDS = Object.freeze([
  "embedUse",
  "embedSourceClass",
  "embedAnalysis",
  "variantStem",
  "structure",
  "embedRole",
  "possessorOrientation",
  "reduplication",
  "reduplicationTarget",
  "bracketing",
  "subject",
  "state",
  "possessor",
  "animacy",
  "pluralConnector",
  "singularPossessiveConnector",
]);
const CANONICAL_SEMANTIC_RESTRICTION_IDS = Object.freeze([
  "nominal-embed-toca-as-if-precise-nuance-genuinely-blocked",
  "ordinary-2b-final-ca-is-not-unique-ca-matrix",
]);
const CLOSED_CONSTRUCTION_EXCEPTION_SPECS = Object.freeze([
  {
    constructionFamily: "ehua-retains-source-num1",
    source: {
      embedStem: "tzahtzi-z",
      retainedSourceNum1: "tl",
      matrixStem: "ē-hu-a",
    },
    ruleFacts: ["source-absolutive-num1-retained", "closed-lexical-exception"],
  },
  {
    constructionFamily: "ehua-retains-source-num1",
    source: {
      embedStem: "chōqui-z",
      retainedSourceNum1: "tl",
      matrixStem: "ē-hu-a",
    },
    ruleFacts: ["source-absolutive-num1-retained", "closed-lexical-exception"],
  },
  {
    constructionFamily: "ehua-retains-source-num1",
    source: {
      embedStem: "cochi-h",
      retainedSourceNum1: "tl",
      matrixStem: "ē-hua",
    },
    ruleFacts: ["source-absolutive-num1-retained", "closed-lexical-exception"],
  },
  {
    constructionFamily: "ehua-retains-source-num1",
    source: {
      embedStem: "tla-tla-t-huī-l-lō",
      retainedSourceNum1: "tl",
      matrixStem: "ē-hua",
    },
    ruleFacts: [
      "source-absolutive-num1-retained",
      "initial-tla-is-impersonal",
      "closed-lexical-exception",
    ],
  },
  {
    constructionFamily: "solid-spelling-supplement",
    source: {
      supplementNounstem: "pōc",
      principalStem: "ē-hua-toc",
      relation: "supplementary-subject",
    },
    ruleFacts: [
      "solid-spelling-does-not-authorize-incorporation",
      "supplementation-structure-preserved",
    ],
  },
  {
    constructionFamily: "integrated-supplement",
    source: {
      antecessiveParticle: "ō",
      adverbialNnc: "huel",
      supplementNounstem: "tlāl",
      principalStem: "mic-ti-m-o-tēca-c",
    },
    ruleFacts: [
      "tight-boundary-does-not-authorize-incorporation",
      "integrated-supplementation-structure-preserved",
    ],
  },
  {
    constructionFamily: "connective-t-nounstem-embed",
    source: {
      embedNounstem: "xo-nāuh",
      connective: "t",
      matrixStem: "i-uh",
    },
    ruleFacts: ["nounstem-embed-lexically-licensed", "connective-t-retained"],
  },
  {
    constructionFamily: "preterit-agentive-object-complement",
    source: {
      embedStem: "mic-0-t-o",
      retainedSourceNum1: "c",
      matrixStem: "cāhua",
      controller: "matrix-object",
    },
    ruleFacts: ["embed-num1-c-retained", "matrix-object-controls-embed-subject"],
  },
  {
    constructionFamily: "preterit-agentive-object-complement",
    source: {
      embedStem: "petz-0-t-o",
      retainedSourceNum1: "c",
      matrixStem: "cāuh",
      controller: "matrix-object",
    },
    ruleFacts: ["embed-num1-c-retained", "matrix-object-controls-embed-subject"],
  },
  ...["cāhua", "quetza", "tēca"].map(matrixStem => ({
    constructionFamily: "connective-t-matrix-object-control",
    source: {
      embedStem: "iuh-0",
      connective: "ti",
      matrixStem,
      controller: "matrix-object",
    },
    ruleFacts: ["matrix-object-controls-deleted-embed-subject"],
  })),
  {
    constructionFamily: "connective-t-matrix-object-control",
    source: {
      embedStem: "pol-i-uh-0",
      connective: "ti",
      matrixStem: "tlaza",
      controller: "matrix-object",
    },
    ruleFacts: ["matrix-object-controls-deleted-embed-subject"],
  },
  {
    constructionFamily: "connective-t-nonrelational-nounstem",
    source: {
      embedNounstem: "tla-zo-h",
      connective: "ti",
      matrixNounstem: "tlāca",
      matrixRelationClass: "nonrelational",
    },
    ruleFacts: ["nonrelational-matrix-closed-exception"],
  },
  {
    constructionFamily: "frozen-third-person-reflexive",
    source: {
      incorporatedAdverbialNounstem: "tlāl",
      frozenReflexive: "m-0",
      matrixStem: "āhui-l-ti-ā",
    },
    ruleFacts: [
      "third-person-reflexive-remains-frozen",
      "subject-person-does-not-rewrite-frozen-reflexive",
    ],
  },
].map(spec => deepFreeze(spec)));

const NOMINAL_EMBED_ADVERB_ROLES = Object.freeze([
  "means", "instrument", "place", "time", "duration", "cause", "purpose",
  "manner", "quantity", "form-style", "compared-manner",
]);
const NOMINAL_COMPOUND_EMBED_ROLES = Object.freeze([
  "source", "material", "purpose", "form", "appearance", "manner",
  "pertinence", "possession", "association", "production", "carrier", "sex",
  "instrument", "means", "character", "progeny", "fellowship",
]);
const AFFECTIVE_NOMINAL_MATRICES = Object.freeze([
  "pil", "pōl", "tzin", "tōn", "zol",
]);
const CARDINAL_NOMINAL_CLASSIFIERS = Object.freeze([
  "basic", "rock", "row", "thing", "cob", "tecpan", "ipil", "quimil", "measure",
]);

function normalizeToken(value = "") {
  return String(value ?? "").normalize("NFC").trim();
}

function normalizeKey(value = "") {
  return normalizeToken(value).toLowerCase().replace(/[\s_]+/gu, "-");
}

function normalizeConstructionKind(value = "") {
  const kind = normalizeKey(value);
  return SUPPORTED_NOMINAL_CONSTRUCTION_KINDS.has(kind) ? kind : "";
}

function canonicalizeClosedExceptionValue(value) {
  if (Array.isArray(value)) {
    return value.map(canonicalizeClosedExceptionValue);
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value)
        .sort()
        .map(key => [
          key,
          canonicalizeClosedExceptionValue(value[key]),
        ])
    );
  }
  return typeof value === "string" ? normalizeToken(value) : value;
}

function closedExceptionSourceSignature(constructionFamily, source) {
  return JSON.stringify(canonicalizeClosedExceptionValue({
    constructionFamily: normalizeKey(constructionFamily),
    source: source && typeof source === "object" && !Array.isArray(source)
      ? source
      : {},
  }));
}

function validateClassicalNahuatlClosedConstructionException(request = {}) {
  const requestObject = request && typeof request === "object"
    && !Array.isArray(request)
    ? request
    : {};
  const allowedKeys = new Set(["constructionFamily", "source"]);
  const forbiddenKey = Reflect.ownKeys(requestObject).find(
    key => typeof key !== "string" || !allowedKeys.has(key)
  );
  const signature = closedExceptionSourceSignature(
    requestObject.constructionFamily,
    requestObject.source
  );
  const matchedSpec = forbiddenKey
    ? null
    : CLOSED_CONSTRUCTION_EXCEPTION_SPECS.find(spec => (
      closedExceptionSourceSignature(
        spec.constructionFamily,
        spec.source
      ) === signature
    )) || null;
  const frame = deepFreeze({
    kind: "classical-nahuatl-closed-construction-exception-validation",
    version: VERSION,
    authorizationStatus: matchedSpec ? "authorized" : "blocked",
    blockReason: forbiddenKey
      ? "closed-construction-validation-accepts-source-constituents-only"
      : matchedSpec
        ? ""
        : "closed-construction-source-not-lexically-authorized",
    constructionFamily: matchedSpec?.constructionFamily
      || normalizeKey(requestObject.constructionFamily),
    source: matchedSpec ? deepClone(matchedSpec.source) : null,
    ruleFacts: matchedSpec ? [...matchedSpec.ruleFacts] : [],
    closedLexicalValidation: true,
    productiveForUnknownSources: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    documentaryExampleAuthority: false,
    lessonMetadataAuthority: false,
    callerSuppliedAuthorityAccepted: false,
  });
  if (matchedSpec) {
    ISSUED_CLOSED_CONSTRUCTION_EXCEPTION_VALIDATIONS.add(frame);
  }
  return frame;
}

function isClassicalNahuatlClosedConstructionExceptionValidation(
  frame = null
) {
  return Boolean(
    ISSUED_CLOSED_CONSTRUCTION_EXCEPTION_VALIDATIONS.has(frame)
    && frame?.kind
      === "classical-nahuatl-closed-construction-exception-validation"
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && frame.closedLexicalValidation === true
    && frame.productiveForUnknownSources === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && frame.documentaryExampleAuthority === false
    && frame.lessonMetadataAuthority === false
    && frame.callerSuppliedAuthorityAccepted === false
    && Object.isFrozen(frame)
  );
}

function deepClone(value) {
  if (Array.isArray(value)) return value.map(deepClone);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, deepClone(item)]));
  }
  return value;
}

function cloneNominalConstructionRequest(request = {}) {
  const exactFrames = getNominalConstructionTrustedResultFrames(request);
  const cloneRequestValue = value => {
    if (value && typeof value === "object" && exactFrames.has(value)) return value;
    if (Array.isArray(value)) return value.map(cloneRequestValue);
    return value && typeof value === "object"
      ? Object.fromEntries(Object.entries(value).map(([key,item]) => [key,cloneRequestValue(item)]))
      : value;
  };
  const clone = cloneRequestValue(request);
  const issuedPrerequisite =
    request?.source?.embedConstituent?.resultFrame || null;
  if (
    issuedPrerequisite
    && clone?.source?.embedConstituent
  ) {
    clone.source.embedConstituent.resultFrame = issuedPrerequisite;
  }
  if (request?.source?.canonicalNncResult && clone?.source) {
    clone.source.canonicalNncResult = request.source.canonicalNncResult;
  }
  if (request?.source?.canonicalLexicalConjunctionResult && clone?.source) {
    clone.source.canonicalLexicalConjunctionResult = request.source.canonicalLexicalConjunctionResult;
  }
  const embedBridgeFrame =
    request?.source?.embedConstituent?.bridgeFrame || null;
  if (embedBridgeFrame && clone?.source?.embedConstituent) {
    clone.source.embedConstituent.bridgeFrame = embedBridgeFrame;
  }
  const cobPreteritAgentiveResultFrame =
    request?.source?.cobPreteritAgentiveResultFrame || null;
  if (cobPreteritAgentiveResultFrame && clone?.source) {
    clone.source.cobPreteritAgentiveResultFrame =
      cobPreteritAgentiveResultFrame;
  }
  if (request?.source?.cobConjunctionResultFrame && clone?.source) {
    clone.source.cobConjunctionResultFrame = request.source.cobConjunctionResultFrame;
  }
  if (request?.source?.multiplierConjunctionResultFrame && clone?.source) {
    clone.source.multiplierConjunctionResultFrame = request.source.multiplierConjunctionResultFrame;
  }
  const matrixResultFrame =
    request?.source?.matrixConstituent?.resultFrame || null;
  if (matrixResultFrame && clone?.source?.matrixConstituent) {
    clone.source.matrixConstituent.resultFrame = matrixResultFrame;
  }
  if (request?.source?.matrixConstituent?.sourceFrame && clone?.source?.matrixConstituent) {
    clone.source.matrixConstituent.sourceFrame = request.source.matrixConstituent.sourceFrame;
  }
  const matrixBridgeFrame =
    request?.source?.matrixConstituent?.bridgeFrame || null;
  if (matrixBridgeFrame && clone?.source?.matrixConstituent) {
    clone.source.matrixConstituent.bridgeFrame = matrixBridgeFrame;
  }
  return clone;
}

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.values(value).forEach(deepFreeze);
  return Object.freeze(value);
}

function issueClassicalNahuatlPatientiveEmbedConstituentFrame(
  captureFrame = null,
  target = null
) {
  if (
    !captureFrame
    || target?.isClassicalNahuatlPatientiveNncContinuationCaptureFrame?.(captureFrame) !== true
    || captureFrame.authorizationStatus !== "authorized"
    || captureFrame.kind
      !== "classical-nahuatl-patientive-nnc-matrix-continuation-capture-frame"
    || captureFrame.exactResultIdentityPreserved !== true
    || captureFrame.grammarAuthority !== false
    || captureFrame.formulaStringAuthority !== false
    || captureFrame.surfaceStringAuthority !== false
    || !Object.isFrozen(captureFrame)
  ) {
    return null;
  }
  const frame = deepFreeze({
    kind:
      "classical-nahuatl-patientive-embed-constituent-bridge-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    captureFrame,
    canonicalPatientiveNncResult:
      captureFrame.canonicalPatientiveNncResult,
    embedStem: captureFrame.sourceStem,
    restrictedUseEmbedStem:
      captureFrame.restrictedUseStem || captureFrame.sourceIdentityStem
      || captureFrame.sourceStem,
    generalUseEmbedStem:
      captureFrame.generalUseStem || captureFrame.sourceStem,
    participantSeparatedEmbedStem:
      captureFrame.participantSeparatedSourceStem
      || captureFrame.sourceStem,
    participantCarrierSequence: Object.freeze([
      ...(captureFrame.participantCarrierSequence || []),
    ]),
    characteristicMatrixFullEmbedStem:
      captureFrame.characteristicMatrixFullEmbedStem || "",
    characteristicMatrixOmittedEmbedStem:
      captureFrame.characteristicMatrixOmittedEmbedStem || "",
    licensedEmbedStems: Object.freeze(Array.from(new Set([
      captureFrame.sourceStem,
      captureFrame.characteristicMatrixFullEmbedStem,
      captureFrame.characteristicMatrixOmittedEmbedStem,
    ].map(normalizeStem).filter(Boolean)))),
    embedNounClass: captureFrame.sourceNounClass,
    embedSourceClass: captureFrame.sourceCompoundClass,
    compoundRoles: Object.freeze(["nominal-embed", "verbal-embed"]),
    nounstemStringAuthority: false,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_PATIENTIVE_EMBED_CONSTITUENT_FRAMES.add(frame);
  return frame;
}

function isClassicalNahuatlPatientiveEmbedConstituentFrame(frame = null) {
  return Boolean(
    ISSUED_PATIENTIVE_EMBED_CONSTITUENT_FRAMES.has(frame)
    && frame?.kind
      === "classical-nahuatl-patientive-embed-constituent-bridge-frame"
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && frame.nounstemStringAuthority === false
    && frame.grammarAuthority === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame)
  );
}

function issueClassicalNahuatlPatientiveMatrixConstituentFrame(
  captureFrame = null,
  target = null
) {
  if (
    !captureFrame
    || target?.isClassicalNahuatlPatientiveNncContinuationCaptureFrame?.(captureFrame) !== true
    || captureFrame.authorizationStatus !== "authorized"
    || captureFrame.kind
      !== "classical-nahuatl-patientive-nnc-matrix-continuation-capture-frame"
    || captureFrame.exactResultIdentityPreserved !== true
    || captureFrame.grammarAuthority !== false
    || captureFrame.formulaStringAuthority !== false
    || captureFrame.surfaceStringAuthority !== false
    || !Object.isFrozen(captureFrame)
  ) {
    return null;
  }
  const frame = deepFreeze({
    kind:
      "classical-nahuatl-patientive-matrix-constituent-bridge-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    captureFrame,
    canonicalPatientiveNncResult:
      captureFrame.canonicalPatientiveNncResult,
    matrixStem: captureFrame.sourceStem,
    matrixNounClass: captureFrame.sourceNounClass,
    matrixSourceClass: captureFrame.sourceCompoundClass,
    grammarAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_PATIENTIVE_MATRIX_CONSTITUENT_FRAMES.add(frame);
  return frame;
}

function isClassicalNahuatlPatientiveMatrixConstituentFrame(frame = null) {
  return Boolean(
    ISSUED_PATIENTIVE_MATRIX_CONSTITUENT_FRAMES.has(frame)
    && frame?.kind
      === "classical-nahuatl-patientive-matrix-constituent-bridge-frame"
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && frame.grammarAuthority === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame)
  );
}

function buildSelectedLcmFrame(
  request = {},
  frame = null,
  outputScope = "scalar"
) {
  const operation = frame?.operationFrame || {};
  const source = frame?.sourceFrame || {};
  const canonical = frame?.canonicalResult || {};
  const selectedValues = {
    "construction-kind": frame?.constructionKind || "not-applicable",
    "source-role": source.constructionRole || source.sourceRole || "not-applicable",
    "semantic-relation": operation.relation || operation.operationKind
      || operation.kind || "not-applicable",
    "embed-role": operation.embedRole || request.embedRole || "not-applicable",
    "matrix-kind": operation.matrixKind || operation.matrixStem
      || request.matrixStem || "not-applicable",
    "source-valence": operation.sourceValence || request.sourceValence
      || "not-applicable",
    "target-valence": operation.targetValence
      || operation.targetSourceValence || "not-applicable",
    subject: canonical.subject || normalizeSubject(request.subject)
      || "not-applicable",
    state: canonical.state || normalizeKey(request.state)
      || "not-applicable",
    "affective-matrix": operation.affectiveMatrix || "not-applicable",
    "numeral-value": Number.isFinite(operation.value)
      ? String(operation.value)
      : "not-applicable",
    "count-kind": operation.countKind || "not-applicable",
    classifier: operation.classifier || "not-applicable",
    reduplication: operation.reduplication || "none",
    modifier: operation.modifier || "none",
    "composition-kind": operation.measureComposition
      || operation.continuationRelation || "not-applicable",
    "canonical-target-kind": canonical.kind || "not-applicable",
    "scalar-versus-full-paradigm": outputScope === "paradigm"
      ? "full-paradigm"
      : "scalar",
  };
  const selectedAxisValues = LCM_AXIS_IDS.map(axisId => deepFreeze({
    axisId,
    selectedValue: normalizeToken(selectedValues[axisId]) || "not-applicable",
  }));
  return deepFreeze({
    axisIds: LCM_AXIS_IDS,
    axisCount: LCM_AXIS_IDS.length,
    selectedAxisIds: selectedAxisValues.map(selection => selection.axisId),
    selectedAxisValues,
    selectedValues: Object.fromEntries(
      selectedAxisValues.map(selection => [
        selection.axisId,
        selection.selectedValue,
      ])
    ),
    licensedAxisSetComplete: selectedAxisValues.length === LCM_AXIS_IDS.length
      && selectedAxisValues.every(selection => Boolean(selection.selectedValue)),
    lessonMetadataAuthorizesOutput: false,
  });
}

function buildEvaluatedGcdFrame(frame = null) {
  const semanticRestrictionEnforced = Boolean(
    frame?.semanticRestrictionFrame?.kind
      === "classical-nahuatl-nominal-construction-semantic-restriction-frame"
    && frame.semanticRestrictionFrame.authorizationStatus === "blocked"
    && frame.semanticRestrictionFrame.restrictionEnforced === true
    && CANONICAL_SEMANTIC_RESTRICTION_IDS.includes(
      frame.semanticRestrictionFrame.restrictionId
    )
    && frame?.canonicalResult?.authorizationStatus === "blocked"
    && frame.canonicalResult.blockReason
      === frame.semanticRestrictionFrame.restrictionId
  );
  const sourceIsTyped = frame?.sourceFrame?.authorizationStatus === "authorized"
    && isClassicalNahuatlNominalConstructionSourceAuthorization(
      frame?.sourceAuthorizationFrame
    );
  const operationIsSemantic =
    frame?.operationFrame?.authorizationStatus === "authorized";
  const canonicalTargetAuthorized =
    frame?.canonicalResult?.authorizationStatus === "authorized"
    || semanticRestrictionEnforced;
  const selectedResultPresent = Boolean(
    frame?.formulaRealization
    && (frame?.wordSurface || frame?.sentenceSurface)
  ) || semanticRestrictionEnforced;
  return deepFreeze({
    identity: GCD_IDENTITY,
    sourceIsTyped,
    operationIsSemantic,
    canonicalTargetAuthorized,
    selectedResultPresent,
    semanticRestrictionEnforced,
    satisfied: Boolean(
      sourceIsTyped
      && operationIsSemantic
      && canonicalTargetAuthorized
      && selectedResultPresent
    ),
  });
}

const vncScalarResultCaches = new WeakMap();

function findUnsafeOrNamedAuthorityPath(
  value,
  blockedKeys,
  path,
  seen,
  trustedValues = new WeakSet()
) {
  if (!value || typeof value !== "object") return "";
  if (trustedValues.has(value)) return "";
  if (seen.has(value)) return "";
  seen.add(value);
  let prototype;
  try {
    prototype = Object.getPrototypeOf(value);
  } catch {
    return `${path}.[[uninspectable-prototype]]`;
  }
  if (
    prototype !== null
    && prototype !== Object.prototype
    && prototype !== Array.prototype
  ) {
    return `${path}.[[custom-prototype]]`;
  }
  let propertyKeys;
  try {
    propertyKeys = Reflect.ownKeys(value);
  } catch {
    return `${path}.[[uninspectable-own-keys]]`;
  }
  for (const propertyKey of propertyKeys) {
    if (typeof propertyKey !== "string") {
      return `${path}.[[non-string-key]]`;
    }
    const nextPath = Array.isArray(value) && /^\d+$/u.test(propertyKey)
      ? `${path}[${propertyKey}]`
      : `${path}.${propertyKey}`;
    let descriptor;
    try {
      descriptor = Object.getOwnPropertyDescriptor(value, propertyKey);
    } catch {
      return `${nextPath}.[[uninspectable-descriptor]]`;
    }
    if (
      !descriptor
      || !Object.prototype.hasOwnProperty.call(descriptor, "value")
    ) {
      return `${nextPath}.[[accessor]]`;
    }
    const item = descriptor.value;
    if (
      blockedKeys.includes(propertyKey)
      && item !== undefined
      && item !== null
      && item !== ""
    ) {
      return nextPath;
    }
    const nested = findUnsafeOrNamedAuthorityPath(
      item,
      blockedKeys,
      nextPath,
      seen,
      trustedValues
    );
    if (nested) return nested;
  }
  return "";
}

function findHostileAuthorityPath(
  value,
  path = "request",
  seen = new WeakSet(),
  trustedValues = new WeakSet()
) {
  return findUnsafeOrNamedAuthorityPath(
    value,
    HOSTILE_AUTHORITY_KEYS,
    path,
    seen,
    trustedValues
  );
}

function findCallerMintedSourceAuthorityPath(
  value,
  path = "request",
  seen = new WeakSet(),
  trustedValues = new WeakSet()
) {
  return findUnsafeOrNamedAuthorityPath(
    value,
    CALLER_MINTED_SOURCE_AUTHORITY_KEYS,
    path,
    seen,
    trustedValues
  );
}

function getNominalConstructionTrustedResultFrames(request = {}) {
  const trusted = new WeakSet();
  const contextual = request?.source?.contextualFlawedSubjectSourceFrame;
  const contextualReceipt = CONTEXTUAL_FLAWED_SUBJECT_SOURCES.get(contextual);
  if (contextualReceipt) {
    trusted.add(contextual);
    if (request.source.canonicalNncSourceFrame === contextualReceipt.canonicalNncSourceFrame) {
      trusted.add(contextualReceipt.canonicalNncSourceFrame);
    }
  }
  const raw = request?.source?.rawCompoundSourceFrame;
  if (ISSUED_RAW_COMPOUND_SOURCE_FRAMES.has(raw)) trusted.add(raw);
  [
    request?.source?.canonicalNncResult,
    request?.source?.canonicalLexicalConjunctionResult,
    request?.source?.numeralResult,
    request?.source?.daySignResult,
    request?.source?.embedConstituent?.resultFrame,
    request?.source?.embedConstituent?.bridgeFrame,
    request?.source?.embedConstituent?.sourceFrame,
    request?.source?.matrixConstituent?.resultFrame,
    request?.source?.matrixConstituent?.bridgeFrame,
    request?.source?.matrixConstituent?.sourceFrame,
  ].forEach(frame => {
    if (frame && typeof frame === "object") trusted.add(frame);
  });
  const conjunction = request?.source?.cobConjunctionResultFrame;
  if (isClassicalNahuatlNominalConstructionResult(conjunction)) trusted.add(conjunction);
  const multiplierConjunction = request?.source?.multiplierConjunctionResultFrame;
  if (isClassicalNahuatlNominalConstructionResult(multiplierConjunction)) trusted.add(multiplierConjunction);
  return trusted;
}

function issueClassicalNahuatlContextualFlawedSubjectSourceFrame(
  canonicalNncSourceFrame = null, negativeParticleSelectionFrame = null,
  target = globalThis
) {
  const sourceValid = target.isClassicalNahuatlOrdinaryNncSourceFrame?.(canonicalNncSourceFrame) === true
    && canonicalNncSourceFrame.stem === "hueli"
    && canonicalNncSourceFrame.nounClass === "tl"
    && canonicalNncSourceFrame.sourceClass === "tl"
    && canonicalNncSourceFrame.restrictedUseOnly === true;
  // The particle validator also recognizes issued blocked selections.
  const negativeValid = target.isClassicalNahuatlNegativeParticleSelectionFrame?.(negativeParticleSelectionFrame) === true
    && negativeParticleSelectionFrame.authorizationStatus === "authorized"
    && negativeParticleSelectionFrame.polarity === "negative"
    && negativeParticleSelectionFrame.sentenceKind === "statement"
    && negativeParticleSelectionFrame.selectedParticleId === "l3-ah-negative"
    && !negativeParticleSelectionFrame.precedingParticleId
    && target.isClassicalNahuatlParticleResultFrame?.(negativeParticleSelectionFrame.particleResultFrame) === true;
  const blockReason = !sourceValid ? "contextual-flawed-subject-exact-hueli-tl-source-required"
    : !negativeValid ? "contextual-flawed-subject-authorized-ah-assertion-required" : "";
  const frame = deepFreeze({
    kind: "classical-nahuatl-contextual-flawed-subject-source-frame",
    version: VERSION, authorizationStatus: blockReason ? "blocked" : "authorized", blockReason,
    canonicalNncSourceFrame: blockReason ? null : canonicalNncSourceFrame,
    negativeParticleSelectionFrame: blockReason ? null : negativeParticleSelectionFrame,
    sourceStem: "hueli", nounClass: "tl", state: "absolutive", subject: "3common",
    animacy: "unspecified", subjectReferenceStatus: "unclaimed",
    reading: "negative-possibility", formation: "flawed-subject",
    num1: "⎕", num2: "0", requiredSentenceType: "assertion",
    requiredPolarity: "negative", negativePrefix: "ah",
    positiveHueliAnalysis: "unclaimed",
    sourceShapePreserved: true, sourceDerivedContext: true,
    callerSuppliedAuthorityAccepted: false, formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  if (!blockReason) CONTEXTUAL_FLAWED_SUBJECT_SOURCES.set(frame, {
    canonicalNncSourceFrame, negativeParticleSelectionFrame,
  });
  return frame;
}

function isClassicalNahuatlContextualFlawedSubjectSourceFrame(frame = null, target = globalThis) {
  const receipt = frame && typeof frame === "object" ? CONTEXTUAL_FLAWED_SUBJECT_SOURCES.get(frame) : null;
  return Boolean(receipt && frame.authorizationStatus === "authorized"
    && frame.canonicalNncSourceFrame === receipt.canonicalNncSourceFrame
    && target.isClassicalNahuatlOrdinaryNncSourceFrame?.(receipt.canonicalNncSourceFrame) === true
    && frame.negativeParticleSelectionFrame === receipt.negativeParticleSelectionFrame
    && target.isClassicalNahuatlNegativeParticleSelectionFrame?.(receipt.negativeParticleSelectionFrame) === true
    && receipt.negativeParticleSelectionFrame.authorizationStatus === "authorized"
    && target.isClassicalNahuatlParticleResultFrame?.(receipt.negativeParticleSelectionFrame.particleResultFrame) === true
    && frame.subjectReferenceStatus === "unclaimed"
    && frame.subjectParticipantFrame === undefined
    && frame.sourceDerivedContext === true && frame.subject === "3common"
    && frame.state === "absolutive" && frame.sourceStem === "hueli"
    && frame.requiredPolarity === "negative" && frame.negativePrefix === "ah"
    && frame.callerSuppliedAuthorityAccepted === false && Object.isFrozen(frame));
}

function getClassicalNahuatlNominalNncSentenceContext(slot = null, target = globalThis) {
  // An object copy of a nominal slot is not a new issued clause, even when
  // its public context/family labels have been erased.
  const unissuedNominalSlot = slot?.sourceFrameKind === "classical-nahuatl-affective-nominal-source-frame"
    && !ISSUED_NOMINAL_NNC_SLOTS.has(slot);
  const marked = Boolean(slot?.contextualFlawedSubjectSourceFrame
    || slot?.nncFamily === CONTEXTUAL_FLAWED_SUBJECT_FAMILY
    || slot?.appliedOperationIds?.includes(CONTEXTUAL_FLAWED_SUBJECT_OPERATION)
    || unissuedNominalSlot);
  const context = slot && typeof slot === "object" ? CONTEXTUAL_FLAWED_SUBJECT_SLOTS.get(slot) : null;
  if (!marked && !context) return null;
  if (ISSUED_NOMINAL_NNC_SLOTS.has(slot)
    && isClassicalNahuatlContextualFlawedSubjectSourceFrame(context, target)
    && slot.contextualFlawedSubjectSourceFrame === context
    && slot.slots?.subject?.subject === "3common"
    && slot.slots.subject.participantFrame === null
    && slot.subjectReferenceStatus === "unclaimed"
    && slot.slots?.state?.arity === "vacant"
    && slot.slots?.predicate?.stem === "hueli"
    && slot.nounClass === "tl"
    && slot.slots?.number?.num1 === "⎕" && slot.slots.number.num2 === "0") return context;
  return deepFreeze({kind: "classical-nahuatl-contextual-flawed-subject-slot-rejection",
    authorizationStatus: "blocked", blockReason: "issued-contextual-flawed-subject-slot-required"});
}

function normalizeStem(value = "") {
  const stem = normalizeToken(value)
    .replace(/[()[\]{}#]/gu, "")
    .replace(/\s+/gu, "")
    .replace(/^-+|-+$/gu, "");
  return /^[\p{L}\p{M}⎕Ø0-]+$/u.test(stem) ? stem : "";
}

function getCompoundEmbedSourceClassAnalysis(sourceClass = "") {
  const key = normalizeKey(sourceClass);
  const exact = NOMINAL_COMPOUND_EMBED_SOURCE_CLASS_ANALYSES[key];
  if (exact) return { sourceClass: key, ...exact };
  const nounClass = normalizeNounClass(key);
  return nounClass
    ? {
      sourceClass: nounClass,
      nounClass,
      useShape: "base",
      subclass: "",
      ephemeralFinalVowel: "",
      truncationRepair: "none",
    }
    : null;
}

function getCompoundEmbedClassAlternativesAnalysis(source = {}) {
  if (source.embedClassAlternatives === undefined) return null;
  const declared = source.embedClassAlternatives;
  const blocked = blockReason => ({ authorizationStatus: "blocked", blockReason });
  if (normalizeKey(source.embedClass) || normalizeKey(source.embedSourceClass)) {
    return blocked("compound-embed-class-alternatives-scalar-conflict");
  }
  if (!Array.isArray(declared) || declared.length < 2
    || declared.some(value => typeof value !== "string" || !normalizeKey(value))) {
    return blocked("compound-embed-class-alternatives-invalid");
  }
  // The li ending is the existing §12.3.2a realization of tli after final l.
  // It is a contextual ending declaration, not a new global noun-class alias.
  if (declared.some(value => normalizeKey(value) === "li")
    && !/l$/u.test(normalizeStem(source.embedStem))) {
    return blocked("compound-embed-class-alternatives-li-ending-context-required");
  }
  const analyses = declared.map(value => getCompoundEmbedSourceClassAnalysis(
    normalizeKey(value) === "li" ? "tli" : value
  ));
  if (analyses.some(value => !value)
    || new Set(analyses.map(value => value.sourceClass)).size !== analyses.length) {
    return blocked("compound-embed-class-alternatives-invalid");
  }
  // A common grammatical operand is not a claim that one class is correct.
  const recipe = value => ({
    useShape: value.useShape,
    subclass: value.useShape === "truncated" ? value.subclass : "",
    ephemeralFinalVowel: value.ephemeralFinalVowel,
    truncationRepair: value.truncationRepair,
  });
  const common = recipe(analyses[0]);
  if (analyses.some(value => JSON.stringify(recipe(value)) !== JSON.stringify(common))) {
    return blocked("compound-embed-class-constraint-divergent-use-shapes");
  }
  return deepFreeze({
    authorizationStatus: "authorized", sourceClass: "", nounClass: "",
    ...common,
    declaredClassAlternatives: declared.map(normalizeToken),
    normalizedClassAlternatives: analyses.map(value => value.sourceClass),
    classAlternativeAnalyses: analyses,
    selectionRequired: false, selectedClass: "",
  });
}


function firstSound(stem = "") {
  return Array.from(normalizeStem(stem).replace(/-/gu, ""))[0]?.toLowerCase() || "";
}

function finalSound(stem = "") {
  return Array.from(normalizeStem(stem).replace(/-/gu, "")).at(-1)?.toLowerCase() || "";
}

function projectSourceConstituents(constructionKind = "", source = {}) {
  const keysByConstruction = {
    "nominal-embed-vnc": [
      "embedStem",
      "embedClass",
      "embedState",
      "matrixStem",
      "matrixValence",
      "matrixVerbClass",
      "possessionKind",
    ],
    "compound-nnc": [
      "embedStem",
      "embedClass",
      "embedSourceClass",
      "matrixStem",
      "matrixClass",
      "matrixSourceClass",
      "structure",
      "bracketing",
      "sexEmbedAnalysis",
      "affinityScopeAnalysis",
      "distributiveVarietalAnalysis",
    ],
    "affective-nnc": [
      "embedStem",
      "embedClass",
      "affectiveMatrix",
      "animacy",
      "affectiveLexicalAnalysis",
      "affectiveAffinityAnalysis",
      "flawedSubjectAnalysis",
    ],
    "cardinal-numeral-nnc": [
      "matrixStem",
      "matrixVerbClass",
      "matrixValence",
      "measureStem",
      "measureClass",
      "measuredStem",
      "measuredClass",
      "referentClass",
    ],
  };
  const projected = Object.fromEntries(
    (keysByConstruction[constructionKind] || [])
      .filter(key => source[key] !== undefined)
      .map(key => [
        key,
        key.toLowerCase().includes("stem")
          ? normalizeStem(source[key])
          : normalizeToken(source[key]),
      ])
  );
  if (constructionKind === "compound-nnc" && source.compoundEmbedUseSource) {
    projected.compoundEmbedUseSource = {
      sourceStem: normalizeStem(source.compoundEmbedUseSource.sourceStem),
      compoundUseStem: normalizeStem(source.compoundEmbedUseSource.compoundUseStem),
    };
  }
  if (constructionKind === "compound-nnc" && Array.isArray(source.embedClassAlternatives)) {
    projected.embedClassAlternatives = Object.freeze(
      source.embedClassAlternatives.map(value => normalizeToken(value))
    );
  }
  const embedConstituent = source.embedConstituent;
  if (
    embedConstituent
    && typeof embedConstituent === "object"
    && !Array.isArray(embedConstituent)
  ) {
    projected.embedConstituent = {
      kind: normalizeKey(embedConstituent.kind),
      stem: normalizeStem(embedConstituent.stem),
    };
  }
  const matrixConstituent = source.matrixConstituent;
  if (
    matrixConstituent
    && typeof matrixConstituent === "object"
    && !Array.isArray(matrixConstituent)
  ) {
    projected.matrixConstituent = {
      kind: normalizeKey(matrixConstituent.kind),
      stem: normalizeStem(matrixConstituent.stem),
    };
  }
  return deepFreeze(projected);
}

function resolveExactOrdinaryNncPredicateEmbed(source, target, request = {}) {
  const constituent = source.embedConstituent;
  const result = constituent?.resultFrame;
  const blocked = blockReason => ({ authorizationStatus: "blocked", blockReason });
  if (
    target.isClassicalNahuatlOrdinaryNncResult?.(result) !== true
    || typeof target.getClassicalNahuatlNncContinuationSourceConstituents
      !== "function"
  ) return blocked("ordinary-nnc-predicate-embed-issued-result-required");
  const projection = target.getClassicalNahuatlNncContinuationSourceConstituents(result);
  const predicateStem = normalizeStem(projection?.predicateStem);
  const finalNounClass = normalizeNounClass(projection?.typedSlotFrame?.nounClass);
  if (
    !projection
    || projection.canonicalResultFrame !== result
    || projection.canonicalSourceFrame !== result.sourceFrame
    || projection.canonicalOperationFrame !== result.operationFrame
    || projection.typedSlotFrame !== result.typedSlotFrame
    || projection.projectionRole !== "read-only-source-constituents"
    || projection.continuationMode !== "licensed-operation-only"
    || !predicateStem
    || predicateStem !== normalizeStem(source.embedStem)
    || predicateStem !== normalizeStem(constituent.stem)
  ) return blocked("ordinary-nnc-predicate-embed-constituent-mismatch");
  if (!finalNounClass || normalizeNounClass(source.embedClass) !== finalNounClass) {
    return blocked("ordinary-nnc-predicate-embed-final-class-mismatch");
  }
  const lexicalSource = projection.canonicalSourceFrame;
  const sourceStemOperation = projection.stemOperation?.predicateFormation === "source-stem";
  // §30.2 explicitly gives īx-i before mati. This lexical use determines
  // the incorporated operand without asserting a general-use subclass for īx.
  const lexicalUseResolved = sourceStemOperation && lexicalSource.stem === "īx"
    && lexicalSource.nounClass === "tli" && predicateStem === "īx"
    && normalizeStem(source.matrixStem) === "mati"
    && projection.canonicalOperationFrame.stemFormation === "plain";
  // An attested object-use stem belongs to this authenticated nominal Source,
  // even when its broader general-use paradigm remains unclaimed. Predicate
  // continuation must consume that same fact as the ordinary-nnc route.
  const attestedObjectUseResolved = sourceStemOperation
    && !lexicalSource.attestedPredicateEmbedUse
    && normalizeKey(request.relation || source.relation) === "object"
    && normalizeStem(lexicalSource.attestedGeneralUseStem) === predicateStem
    && projection.canonicalOperationFrame.stemFormation === "plain";
  const attestedUse = lexicalSource.attestedPredicateEmbedUse;
  // A private citation Source may own one documented contextual use without
  // asserting the rest of its general-use/possessive paradigm. Empty choices
  // permit Source admission only; the operation owner still requires them.
  const attestedPredicateUseResolved = Boolean(sourceStemOperation
    && projection.canonicalOperationFrame.stemFormation === "plain"
    && attestedUse?.kind === "classical-nahuatl-attested-nominal-predicate-embed-use"
    && Object.isFrozen(attestedUse)
    && attestedUse.sourceStem === lexicalSource.stem
    && predicateStem === lexicalSource.stem
    && normalizeStem(attestedUse.useStem) === normalizeStem(lexicalSource.attestedGeneralUseStem)
    && normalizeKey(attestedUse.constructionKind) === "nominal-embed-vnc"
    && normalizeStem(source.matrixStem) === attestedUse.matrixStem
    && ["relation", "orientation", "complementKind", "adverbRole",
      "embedReduplication", "similarityReduplicationShape"].every(key => {
      const selected = normalizeKey(request[key] || source[key]);
      return !Object.hasOwn(attestedUse, key) || !selected || selected === normalizeKey(attestedUse[key]);
    }));
  if (!lexicalUseResolved && !attestedObjectUseResolved && !attestedPredicateUseResolved
    && (lexicalSource.restrictedUseOnly === true || lexicalSource.generalUseShapeClaimed === false)) {
    return blocked("ordinary-nnc-predicate-embed-source-use-analysis-required");
  }
  let useStemFrame = null;
  let realizedStem = attestedPredicateUseResolved ? attestedUse.useStem : predicateStem;
  let compoundFinalARetained = false;
  // The final predicate owns its class. Only an unchanged source-stem
  // operation retains the lexical Source's ephemeral-vowel analysis.
  if (sourceStemOperation && !lexicalUseResolved && !attestedObjectUseResolved && !attestedPredicateUseResolved) {
    if (typeof target.buildClassicalNahuatlNounstemSourceFrame !== "function") {
      return blocked("ordinary-nnc-predicate-embed-use-stem-capability-required");
    }
    useStemFrame = target.buildClassicalNahuatlNounstemSourceFrame(lexicalSource.stem, {
      state: "absolutive", nounClass: lexicalSource.nounClass,
      classSelectionAuthority: lexicalSource.lexicalSelectionAuthority,
      classMembershipOptions: lexicalSource.classMembershipOptions,
      generalUseShape: lexicalSource.useShape,
      tlSubclass: normalizeKey(lexicalSource.subclass).replace(/^tl-/u, ""),
      ephemeralFinalVowel: lexicalSource.ephemeralFinalVowel,
      truncationRepair: lexicalSource.truncationRepair,
    });
    if (useStemFrame.authorizationStatus !== "authorized") return useStemFrame;
    const restricted = normalizeStem(useStemFrame.selectedRestrictedUseStem);
    const general = normalizeStem(useStemFrame.generalUseStem);
    compoundFinalARetained = useStemFrame.subclassSourceShapeFrame?.tlSubclass === "2B"
      && useStemFrame.generalUseShape === "truncated"
      && useStemFrame.ephemeralFinalVowel === "a";
    const embedUseStem = compoundFinalARetained ? restricted : general;
    const inheritedUseStem = [restricted, general].filter(Boolean).find(stem => (
      predicateStem === stem || predicateStem.endsWith(`-${stem}`)
    ));
    if (!inheritedUseStem || !embedUseStem) {
      return blocked("ordinary-nnc-predicate-embed-source-use-analysis-required");
    }
    realizedStem = `${predicateStem.slice(0, -inheritedUseStem.length)}${embedUseStem}`;
  }
  return deepFreeze({
    kind: "classical-nahuatl-exact-ordinary-nnc-predicate-embed-frame",
    authorizationStatus: "authorized", blockReason: "",
    canonicalResultFrame: result, canonicalSourceProjection: projection,
    predicateStem, finalNounClass, sourceStemOperation, useStemFrame,
    compoundFinalARetained, realizedStem, lexicalUseResolved, attestedObjectUseResolved,
    ...(attestedPredicateUseResolved ? {attestedPredicateUseResolved: true,
      attestedPredicateEmbedUseFrame: attestedUse} : {}),
    exactResultIdentityPreserved: true,
    formulaStringAuthority: false, surfaceStringAuthority: false,
  });
}

// The user ruling on §30.15 accepts the printed affinity-to-plain transition.
// Expose it as an explicit canonical reformation, never automatic deletion.
function admitsPlainSourceComplementReformation(result, target) {
  return Boolean(target.isClassicalNahuatlOrdinaryNncResult?.(result) === true
    && result.operationFrame.state === "absolutive"
    && result.operationFrame.stemFormation === "affinity"
    && result.operationFrame.predicateFormation === "source-stem"
    && result.sourceFrame.stemFormationOptions.includes("plain"));
}

function reformPlainSourceComplementEmbed(exactPredicateFrame, target) {
  const originalResultFrame = exactPredicateFrame?.canonicalResultFrame;
  const blocked = blockReason => ({authorizationStatus: "blocked", blockReason});
  if (!admitsPlainSourceComplementReformation(originalResultFrame, target)) {
    return blocked("nominal-complement-plain-source-affinity-parent-required");
  }
  if (typeof target.buildClassicalNahuatlOrdinaryNncOperationFrame !== "function"
    || typeof target.requestClassicalOrdinaryNncResult !== "function") {
    return blocked("nominal-complement-plain-source-nnc-owner-required");
  }
  const parentOperation = originalResultFrame.operationFrame;
  const selections = Object.fromEntries([
    "state", "subject", "metaphoricalUse", "possessor", "pluralConnector",
    "singularConnector", "nonspecificHumanForm", "predicateFormation",
    "possessorReduplication", "sentenceType", "polarity",
  ].map(key => [key, parentOperation[key]]));
  selections.humanness = parentOperation.referentialHumanness;
  selections.stemFormation = "plain";
  const operation = target.buildClassicalNahuatlOrdinaryNncOperationFrame(
    originalResultFrame.sourceFrame, selections
  );
  if (operation.authorizationStatus !== "authorized") return operation;
  const derivedResultFrame = target.requestClassicalOrdinaryNncResult(
    originalResultFrame.sourceFrame, operation
  );
  if (target.isClassicalNahuatlOrdinaryNncResult?.(derivedResultFrame) !== true) {
    return blocked(derivedResultFrame?.blockReason || "nominal-complement-plain-source-issued-child-required");
  }
  const projection = target.getClassicalNahuatlNncContinuationSourceConstituents(derivedResultFrame);
  const childStem = projection.predicateStem;
  const childPredicate = resolveExactOrdinaryNncPredicateEmbed({
    embedStem: childStem, embedClass: projection.typedSlotFrame.nounClass,
    embedConstituent: {kind: "ordinary-nnc-predicate", stem: childStem, resultFrame: derivedResultFrame},
  }, target);
  if (childPredicate.authorizationStatus !== "authorized") return childPredicate;
  return deepFreeze({
    kind: "classical-nahuatl-nominal-complement-embed-reformation-frame",
    authorizationStatus: "authorized", blockReason: "", selection: "plain-source",
    originalResultFrame, derivedResultFrame, childPredicate,
    realizedStem: childPredicate.realizedStem,
    sourceIdentityPreserved: derivedResultFrame.sourceFrame === originalResultFrame.sourceFrame,
    subjectAndNumberPreserved: operation.subject === parentOperation.subject,
    nounClassPreserved: derivedResultFrame.typedSlotFrame.nounClass === originalResultFrame.typedSlotFrame.nounClass,
    formulaStringAuthority: false, surfaceStringAuthority: false,
  });
}

// §35.7 attests two lexical compound readings which retain mainline
// reflexive morphology. Ordinary cā possession continues to use shuntline ne.
// Authenticate the issued analysis before selecting these bounded readings;
// a spelling or a caller's proposed exception never supplies that ancestry.
function buildPreteritAgentiveCompoundAnalysis(parent, constructionKind, matrix, target) {
  if (target.isClassicalNahuatlDeverbalNncGrammarFrame?.(parent) !== true
    || parent.operationFrame?.nominalizationKind !== "preterit-agentive"
    || parent.sourceFrame?.sourceVoice !== "active"
    || parent.sourceFrame?.sourceObjectPattern !== "reflexive") return null;
  const source = parent.sourceFrame;
  const capture = source.preteritVncCaptureFrame;
  const objects = capture?.sourceObjectRequests || [];
  if (objects.length !== 1 || objects[0].objectKind !== "reflexive") return null;
  const prudent = constructionKind === "compound-nnc"
    && source.sourceStem === "ih-mat" && source.verbClass === "B"
    && matrix === "tlāca";
  const apprentice = constructionKind === "affective-nnc"
    && source.sourceStem === "mach-tih" && source.verbClass === "C"
    && matrix === "pil";
  if (!prudent && !apprentice) return null;
  const slots = capture.canonicalVncTypedSlotFrame?.slots;
  const valence = slots?.prePredicate;
  if (valence?.length !== 1 || valence[0].kind !== "dyadic-valence"
    || !valence[0].va1 || !valence[0].va2
    || slots.predicate.stem !== source.sourceStem
    || slots.predicate.tns !== "0") return null;
  const retainedGeneralUseStem = joinStemParts([
    valence[0].va1, valence[0].va2, slots.predicate.stem, "0", "cā",
  ]);
  return deepFreeze({
    kind: "classical-nahuatl-preterit-agentive-compound-lexical-analysis-frame",
    authorizationStatus: "authorized", canonicalParentResult: parent,
    canonicalSourceFrame: source, canonicalCaptureFrame: capture,
    canonicalVncTypedSlotFrame: capture.canonicalVncTypedSlotFrame,
    ordinaryGeneralUseStem: parent.operationFrame.targetStems.generalUse,
    retainedGeneralUseStem, constructionKind, matrixStem: matrix,
    reading: prudent ? "prudent-person" : "dear-apprentice",
    mainlineReflexiveRetained: true,
    classException: apprentice, resultClass: apprentice ? "tli" : "",
    ordinaryPossessionChanged: false, callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false, surfaceStringAuthority: false,
  });
}

// Resolve only the existing nominal embed operand of an authenticated whole
// continuation. The caller's constituent still carries the whole Result.
function resolveCompoundNncEmbedResult(exactResult, target) {
  if (target.isClassicalNahuatlNominalConstructionResult?.(exactResult) === true
    && exactResult.constructionKind === "compound-nnc") return exactResult.sourceFrame?.restrictedUseOnly === true
      ? null : exactResult;
  if (target.isClassicalNahuatlDeverbalNncGrammarFrame?.(exactResult) !== true
    || exactResult.constructionKind !== "patientive-embed-continuation"
    || exactResult.canonicalTargetEvaluator !== "evaluateClassicalNahuatlNominalConstruction") return null;
  const inner = exactResult.canonicalResult;
  const link = exactResult.operationFrame?.patientiveEmbedCompoundFrame;
  const stem = inner?.operationFrame?.compoundStem;
  return target.isClassicalNahuatlNominalConstructionResult?.(inner) === true
    && inner.constructionKind === "compound-nnc" && stem
    && inner.sourceFrame?.restrictedUseOnly !== true
    && link?.compoundTargetKind === "nnc" && link.compoundStem === stem
    && exactResult.operationFrame?.targetStems?.generalUse === stem
    && exactResult.operationFrame?.targetStems?.restrictedUse === stem
    ? inner : null;
}

function getOwnedAdjectivalNncConstitution(result, target) {
  const owned = target.isClassicalNahuatlOrdinaryNncResult?.(result) === true
    || target.isClassicalNahuatlPronominalNncResult?.(result) === true
    || target.isClassicalNahuatlDeverbalNncGrammarFrame?.(result) === true
    || isClassicalNahuatlNominalConstructionResult(result);
  if (!owned || result.authorizationStatus !== "authorized") return null;
  const slots = result.typedSlotFrame || result.nncSlotFrame
    || result.canonicalResult?.nncSlotFrame;
  if (!slots?.slots?.predicate?.stem || !slots.slots.number) return null;
  return { result, slots, sourceFrame: result.sourceFrame,
    operationFrame: result.operationFrame,
    numberFrame: result.canonicalResult?.numberFrame || result.numberFrame || null,
    stem: slots.slots.predicate.stem,
    nounClass: slots.nounClass || result.operationFrame?.nounClass
      || result.operationFrame?.matrixClass || result.sourceFrame?.nounClass,
    subject: slots.slots.subject.subject,
    state: slots.slots.state.arity === "vacant" ? "absolutive" : "possessive" };
}

function getAdjectivalQualityConstitution(result, target, seen = new Set()) {
  if (!result || seen.has(result)) return "";
  seen.add(result);
  const source = getOwnedAdjectivalNncConstitution(result, target);
  if (!source) return "";
  if (target.isClassicalNahuatlDeverbalNncGrammarFrame?.(result) === true
    && (result.sourceFrame?.sourceCapturedFromExactVncResult
      || result.sourceFrame?.sourceCapturedFromExactNncResult)) return "verbal-source";
  if (result.sourceFrame?.adjectivalProfile) return "owned-adjectival-source";
  // These are primitive quantitative Source meanings, not generated answers
  // or an exception to the productive verbal-source operation.
  if (target.isClassicalNahuatlOrdinaryNncResult?.(result) === true
    && result.sourceFrame?.nounClass === "zero"
    && ["tepi", "tziqui"].includes(result.sourceFrame.stem)) return "primitive-quantitative-quality";
  const facts = result.sourceAuthorizationFrame?.lexicalFacts;
  if (facts && [facts.capturedEmbedResult, facts.capturedMatrixNncResult]
    .some(parent => getAdjectivalQualityConstitution(parent, target, seen))) return "compound-verbal-quality";
  if (result.constructionKind === "adjectival-nnc"
    && getAdjectivalQualityConstitution(result.sourceFrame.canonicalNncResult, target, seen)) return "owned-quality";
  return "";
}

// A consuming-use projection of an owned adjective is not a detached noun.
function getClassicalNahuatlAdjectivalNncSourceConstituent(parent, options = {}, target) {
  const constitution = getOwnedAdjectivalNncConstitution(parent, target);
  if (!constitution || !getAdjectivalQualityConstitution(parent, target)) return null;
  const useShape = options.useShape || "general-use";
  const spelling = options.sourceSpelling || "productive";
  const capture = parent.sourceFrame.preteritVncCaptureFrame;
  const preterit = target.isClassicalNahuatlDeverbalNncGrammarFrame?.(parent)
    && parent.operationFrame?.constructionKind === "predicate-nominalization"
    && parent.operationFrame?.nominalizationKind === "preterit-agentive"
    && target.isClassicalNahuatlPreteritVncNominalizationCaptureFrame?.(capture) === true
    && parent.sourceFrame.sourceCapturedFromExactVncResult === true
    && capture.sourceVoice === "active" && capture.sourceValence === "intransitive"
    && capture.sourceObjectPattern === "none";
  if (!preterit) return null;
  const obsolete = capture?.obsoleteRootPreteritAnalysis;
  const originalStem = obsolete?.originalSourceStem || parent.sourceFrame.sourceStem || "";
  const root = obsolete?.rootStem || (preterit && /-ti$/u.test(originalStem) ? originalStem : "");
  if (!root) return null;
  const sourceRoot = root.replace(/-ti$/u, "");
  const availableUseShapes = Object.freeze(["general-use", "source-root"]);
  const availableSourceSpellings = Object.freeze(originalStem === "izta-ya"
    ? ["productive", "retained-lexical"] : ["productive"]);
  if (!availableUseShapes.includes(useShape) || !availableSourceSpellings.includes(spelling)) return null;
  const selectedRoot = spelling === "retained-lexical" ? "iztā" : sourceRoot;
  // General use keeps the genuine derived predicate, including its inchoative
  // ti; lexical iztāc is the separately retained spelling, never a VNC rule.
  const stem = useShape === "source-root" ? selectedRoot
    : spelling === "retained-lexical" ? "iztā-0-cā" : parent.operationFrame.targetStems.generalUse;
  const bridgeFrame = deepFreeze({kind:"classical-nahuatl-adjectival-nnc-source-constituent-frame",
    version:VERSION, authorizationStatus:"authorized", canonicalNncResult:parent,
    canonicalSourceFrame:parent.sourceFrame, canonicalOperationFrame:parent.operationFrame,
    canonicalTypedSlotFrame:constitution.slots, canonicalCaptureFrame:capture,
    originalSourceStem:originalStem, sourceRoot: selectedRoot, stem, useShape, sourceSpelling:spelling,
    availableUseShapes, availableSourceSpellings, consumingUseOnly:true,
    classMembershipClaimed:useShape !== "source-root", lexicalSpellingPreservesProductiveParent:true,
    formulaStringAuthority:false, surfaceStringAuthority:false, callerSuppliedAuthorityAccepted:false});
  ISSUED_ADJECTIVAL_SOURCE_CONSTITUENTS.add(bridgeFrame);
  return Object.freeze({kind:useShape === "source-root" ? "adjectival-root-nnc" : "adjectival-general-use-nnc",
    stem,nounClass:useShape === "source-root" ? "" : "tl",
    sourceClass:useShape === "source-root" ? "root-only" : "tl-1-a",
    resultFrame:parent,bridgeFrame,useShape,sourceSpelling:spelling,
    availableUseShapes,availableSourceSpellings,classMembershipClaimed:useShape !== "source-root"});
}
function isClassicalNahuatlAdjectivalNncSourceConstituentFrame(frame) {
  return ISSUED_ADJECTIVAL_SOURCE_CONSTITUENTS.has(frame);
}

function issueAdjectivalNncSourceAuthorization(request, target) {
  const parent = request.source?.canonicalNncResult;
  const source = getOwnedAdjectivalNncConstitution(parent, target);
  const reading = normalizeKey(request.adjectivalOperation);
  const quality = source && getAdjectivalQualityConstitution(parent, target);
  const blockReason = !source ? "adjectival-exact-nnc-source-required"
    : !["quality-intensification", "distribution-variety"].includes(reading)
      ? "adjectival-semantic-operation-required"
      : !quality ? "adjectival-qualitative-source-constitution-required"
        : request.operationScope && request.operationScope !== "whole"
          ? "adjectival-whole-operation-scope-required" : "";
  const frame = deepFreeze({
    kind: "classical-nahuatl-nominal-construction-source-authorization-frame",
    version: VERSION, constructionKind: "adjectival-nnc",
    authorizationStatus: blockReason ? "blocked" : "authorized", blockReason,
    sourceConstituents: source ? [{role: "whole-adjectival-source", resultFrame: parent,
      stem: source.stem, sourceFrame: source.sourceFrame,
      operationFrame: source.operationFrame, typedSlotFrame: source.slots}] : [],
    lexicalFacts: { capturedAdjectivalNncResult: parent || null,
      qualitativeSourceConstitution: quality || "", selectedReading: reading },
    lexicalFactsReadOnly: true, sourceConstituentsOnly: true,
    documentaryExampleAuthority: false, lessonMetadataAuthority: false,
    formulaStringAuthority: false, surfaceStringAuthority: false,
    callerSuppliedAuthorityAccepted: false,
  });
  if (!blockReason) ISSUED_SOURCE_AUTHORIZATION_FRAMES.add(frame);
  return frame;
}

function reenterAdjectivalSourceInflection(parent, request, target) {
  const choices = {subject:request.subject, state:request.state, animacy:request.animacy,
    ...(request.possessor ? {possessor:request.possessor} : {})};
  if (target.isClassicalNahuatlOrdinaryNncResult?.(parent)) {
    const operation = target.buildClassicalNahuatlOrdinaryNncOperationFrame(parent.sourceFrame,
      {...parent.operationFrame, ...choices, predicateFormation:parent.stemOperation?.predicateFormation || "source-stem",
        stemFormation:parent.stemOperation?.stemFormation || "plain"});
    return target.evaluateClassicalNahuatlOrdinaryNnc(parent.sourceFrame, operation);
  }
  if (target.isClassicalNahuatlPronominalNncResult?.(parent)) {
    const operation = target.buildClassicalNahuatlPronominalNncOperationFrame(parent.sourceFrame,
      {...parent.operationFrame,...choices});
    return target.evaluateClassicalNahuatlPronominalNnc(parent.sourceFrame,operation);
  }
  const original = NOMINAL_CONSTRUCTION_REQUESTS.get(parent);
  if (original) return evaluateNominalConstruction({...original,...choices},target);
  if (target.isClassicalNahuatlDeverbalNncGrammarFrame?.(parent)) {
    const operation=parent.operationFrame, source=parent.sourceFrame;
    return target.evaluateClassicalNahuatlDeverbalNnc({
      constructionKind:operation.constructionKind,
      nominalizationKind:operation.nominalizationKind,
      canonicalVncResult:source.canonicalVncResult,
      ...(source.sourceCapturedFromExactNncResult ? {canonicalNncResult:source.canonicalNncResult} : {}),
      patientiveSourceFamily:operation.patientiveSourceFamily,
      patientiveKind:operation.patientiveKind,
      rootStockAllomorph:operation.rootStockAllomorph,
      patientiveAnalogy:operation.patientiveAnalogy,
      preteritSourceAnalysis:operation.preteritSourceAnalysis,
      numberConnector:operation.singularConnectorChoice,
      ...(operation.constructionKind === "ownerhood" ? {source:{ownerhoodMatrix:operation.ownerhoodMatrix},
        characteristicMatrixRealization:operation.characteristicMatrixRealization,
        ownerhoodBoundaryVariant:operation.ownerhoodBoundaryFrame?.boundaryVariant} : {}),
      ...choices});
  }
  return null;
}

function evaluateAdjectivalNncConstruction(request, target, authorization) {
  const parent = request.source.canonicalNncResult;
  let source = getOwnedAdjectivalNncConstitution(parent, target);
  const originalSource = source;
  const subject = normalizeSubject(request.subject || source.subject);
  const state = normalizeKey(request.state || source.state);
  // Inflection belongs to the original family; no generic zero-number
  // fallback may replace the parent's patientive or agentive contract.
  let sourceNumberResult = parent;
  if (subject !== source.subject || state !== source.state) {
    sourceNumberResult = reenterAdjectivalSourceInflection(parent,{...request,subject,state},target);
    const reissued = getOwnedAdjectivalNncConstitution(sourceNumberResult,target);
    if (!reissued || reissued.subject !== subject || reissued.state !== state) return buildBlockedFrame(
      "adjectival-nnc", sourceNumberResult?.blockReason || "adjectival-source-family-inflection-reentry-required", request);
    source = reissued;
  }
  const shape = request.adjectivalOperation === "quality-intensification" ? "long" : "short-glottal";
  const supportiveI = source.sourceFrame.supportiveInitialI === true
    || source.sourceFrame.sourceInitialIKind === "supportive";
  const stem = reduplicate(source.stem, shape, {supportiveI});
  const sourceFrame = deepFreeze({kind: "classical-nahuatl-adjectival-nnc-source-frame",
    version: VERSION, authorizationStatus: "authorized", canonicalNncResult: parent,
    canonicalSourceFrame: originalSource.sourceFrame, canonicalOperationFrame: originalSource.operationFrame,
    canonicalTypedSlotFrame: originalSource.slots, sourceStem: originalSource.stem,
    sourceInflectionResult:sourceNumberResult, inflectedSourceFrame:source.sourceFrame,
    inflectedOperationFrame:source.operationFrame, inflectedTypedSlotFrame:source.slots,
    supportiveInitialI: supportiveI, qualitativeSourceConstitution: authorization.lexicalFacts.qualitativeSourceConstitution,
    typedSourceAuthority: true, formulaStringAuthority: false, surfaceStringAuthority: false});
  const retainedNumber = source.numberFrame || deepFreeze({
    kind: "classical-nahuatl-retained-owned-nnc-number-frame", authorizationStatus: "authorized",
    nounClass: source.nounClass, subjectNumber: source.slots.subjectNumber,
    ...source.slots.slots.number, canonicalSourceSlotFrame: source.slots });
  const result = buildNncTarget({target, constructionFamily: "adjectival-nominal",
    sourceFrame, stem, nounClass: source.nounClass, subject, state,
    animacy: request.animacy || source.slots.subjectAnimacy || "nonanimate",
    numberFrameOverride: retainedNumber,
    operationIds: ["adjectival-source", request.adjectivalOperation],
    nncLayerOperationIds: ["nnc-clause-shell", "adjectival-predicate"]});
  if (result.authorizationStatus !== "authorized") return buildBlockedFrame(
    "adjectival-nnc", result.blockReason, request);
  ISSUED_NOMINAL_NNC_SLOTS.add(result.nncSlotFrame);
  return deepFreeze({version:VERSION, authorizationStatus: "authorized", blockReason: "", sourceFrame,
    operationFrame: {kind: "classical-nahuatl-adjectival-nnc-operation-frame", version: VERSION,
      authorizationStatus: "authorized", adjectivalOperation: request.adjectivalOperation,
      operationScope: "whole", reduplicationShape: shape, targetStem: stem,
      subject, state, nounClass: source.nounClass,
      canonicalNncResult: parent, sourceNumberResult, sourceNumberFrame: retainedNumber,
      sourceTypedSlotFrame: source.slots, typedOperationAuthority: true,
      callerSuppliedDerivedAuthorityAccepted: false, formulaStringAuthority: false},
    canonicalTargetEvaluator: "buildClassicalNahuatlNncSlotFrame",
    canonicalResult: result, typedSlotFrame: result.nncSlotFrame, nncSlotFrame: result.nncSlotFrame,
    formulaRealization: result.formulaRealization, wordSurface: result.wordSurface,
    sentenceSurface: result.sentenceSurface, typedFrameAuthority: true,
    callerSuppliedAuthorityAccepted: false, formulaStringAuthority: false, surfaceStringAuthority: false});
}

function getDocumentedCompoundAffinityAnalysis(source = {}) {
  const embedStem = normalizeStem(source.embedStem);
  const matrixStem = normalizeStem(source.matrixStem);
  if (!["tēl", "ich"].includes(embedStem)
    || !["pōch", "pō-ch"].includes(matrixStem)) return null;
  return deepFreeze({lexicalStatus: "compound-affinity-scope", embedStem,
    matrixStem, availableTargets: ["matrix"], lexicalRequirement: "obligatory"});
}

function getDocumentedAffectiveAffinityAnalysis(source = {}, matrix = "") {
  const embedStem = normalizeStem(source.embedStem);
  if (!["tēl-pōch", "tēl-pō-ch"].includes(embedStem)
    || normalizeKey(matrix) !== "pil") return null;
  return deepFreeze({lexicalStatus: "affective-affinity-scope-analysis", embedStem,
    matrixStem: "pil", embedAffinityRequirement: "optional", embedAffinityTarget: "matrix"});
}

function getAffectivePilAffinityContext(request = {}, source = {}) {
  const semanticReading = normalizeKey(request.semanticReading || source.semanticReading || "ordinary-affective");
  const reading = semanticReading.startsWith("pil-") ? semanticReading.slice(4) : "";
  const childUsesMatrix = reading === "child"
    && normalizeKey(request.pilChildRoute || "simple") === "affective";
  const plural = normalizeSubject(request.subject || "3sg")?.endsWith("pl") === true;
  const embedStem = normalizeStem(source.embedStem);
  return {reading, childUsesMatrix,
    lexemeAtFinalBoundary: embedStem === "pil" || embedStem.endsWith("-pil"),
    simpleLexemeFormation: Boolean(reading && !childUsesMatrix && reading !== "honorific-vocative"),
    childDoubleAffinity: childUsesMatrix && plural
      && normalizeKey(request.state || "absolutive") === "absolutive"};
}

function issueClassicalNahuatlNominalConstructionSourceAuthorization(
  request = {},
  target = globalThis
) {
  const constructionKind = normalizeConstructionKind(request.constructionKind);
  if (constructionKind === "adjectival-nnc") return issueAdjectivalNncSourceAuthorization(request, target);
  if (constructionKind === "calendar-date-nnc") return issueCalendarDateSourceAuthorization(request, target);
  const source = request.source && typeof request.source === "object"
    && !Array.isArray(request.source)
    ? request.source
    : {};
  const embedStem = normalizeStem(source.embedStem || source.compoundEmbedUseSource?.sourceStem);
  const matrixStem = normalizeStem(source.matrixStem);
  const embedConstituent = source.embedConstituent;
  const matrixConstituent = source.matrixConstituent;
  let blockReason = "";
  const suppliedContextualFlawedSource = source.contextualFlawedSubjectSourceFrame;
  const contextualFlawedSubjectSourceFrame = isClassicalNahuatlContextualFlawedSubjectSourceFrame(
    suppliedContextualFlawedSource, target) ? suppliedContextualFlawedSource : null;
  if (suppliedContextualFlawedSource !== undefined && (
    !contextualFlawedSubjectSourceFrame || constructionKind !== "affective-nnc"
    || source.canonicalNncSourceFrame !== contextualFlawedSubjectSourceFrame.canonicalNncSourceFrame
    || embedStem !== contextualFlawedSubjectSourceFrame.sourceStem
    || normalizeNounClass(source.embedClass) !== "tl"
    || (source.embedSourceClass && normalizeKey(source.embedSourceClass) !== "tl")
    || source.embedConstituent || source.matrixConstituent || source.matrixStem || source.matrixClass
    || (source.animacy && source.animacy !== "unspecified")
    || source.flawedSubjectAnalysis || source.affectiveLexicalAnalysis
  )) blockReason = "contextual-flawed-subject-source-custody-mismatch";
  let agentiveEmbed = false;
  let capturedEmbedState = "";
  let capturedEmbedPossessor = "";
  let capturedEmbedSubject = "";
  let capturedEmbedResult = null;
  let capturedCompoundNncResult = null;
  let capturedEmbedNegativeProjection = null;
  let capturedEmbedNounClass = "";
  let capturedEmbedSourceClass = "";
  let capturedEmbedUseShape = "";
  let capturedEmbedSubclass = "";
  let capturedEmbedEphemeralFinalVowel = "";
  let capturedEmbedTruncationRepair = "";
  let capturedEmbedPatientiveCaptureFrame = null;
  let capturedCharacteristicNounSourceFrame = null;
  let capturedAdjectivalModificationFrame = null;
  let lexicalizedAdjectivalModification = false;
  let capturedExactOrdinaryNncPredicateFrame = null;
  let capturedBasicNumeralEmbedCitation = null;
  let canonicalAdverbialEmbedResult = null;
  let canonicalRestrictedMatrixSourceFrame = null;
  const rawCompoundSourceFrame = source.rawCompoundSourceFrame || null;
  if (rawCompoundSourceFrame && (!ISSUED_RAW_COMPOUND_SOURCE_FRAMES.has(rawCompoundSourceFrame)
    || constructionKind !== "compound-nnc"
    || embedStem !== rawCompoundSourceFrame.embedStem
    || matrixStem !== rawCompoundSourceFrame.matrixStem
    || normalizeKey(source.matrixSourceClass || source.matrixClass) !== rawCompoundSourceFrame.sourceClass)) {
    blockReason = "raw-compound-source-identity-or-constitution-mismatch";
  }
  if (rawCompoundSourceFrame && !blockReason && normalizeKey(request.state || "absolutive") !== "absolutive") {
    blockReason = "raw-compound-source-class-dependent-state-unclaimed";
  }
  if (embedConstituent !== undefined) {
    const constituentObject = embedConstituent
      && typeof embedConstituent === "object"
      && !Array.isArray(embedConstituent)
      ? embedConstituent
      : null;
    const constituentKind = normalizeKey(constituentObject?.kind);
    const allowedKeys = new Set([
      "kind", "stem", "resultFrame", "bridgeFrame",
      ...(constituentKind === "characteristic-noun-source" ? ["sourceFrame"] : []),
    ]);
    const forbiddenKey = constituentObject
      ? Reflect.ownKeys(constituentObject).find(
        key => typeof key !== "string" || !allowedKeys.has(key)
      )
      : "embedConstituent";
    const constituentStem = normalizeStem(constituentObject?.stem
      || (constituentKind === "adverbial-nnc-result" ? constituentObject?.resultFrame?.wordSurface : ""));
    const suppliedExactResult = constituentObject?.resultFrame || null;
    const negativeProjection = constituentKind === "preterit-agentive-nnc"
      ? target.getClassicalNahuatlPreteritNncNegativeEmbedProjection?.(suppliedExactResult) : null;
    const suppliedResult = negativeProjection?.canonicalParentResult || suppliedExactResult;
    const compoundNncResult = constituentKind === "compound-nnc"
      ? resolveCompoundNncEmbedResult(suppliedResult, target) : null;
    const suppliedNominalOperand = compoundNncResult || suppliedResult;
    const restrictedMatrixSource = source.matrixConstituent?.sourceFrame;
    const adverbialNncAuthorized = Boolean(constituentKind === "adverbial-nnc-result"
      && constructionKind === "nominal-embed-vnc" && normalizeKey(request.relation) === "adverb"
      && normalizeKey(request.route) === "direct-adverb" && normalizeKey(request.adverbRole) === "manner"
      && target.isClassicalNahuatlAdverbialNuclearResult?.(suppliedResult) === true
      && target.isClassicalNahuatlRestrictedContainingVncSourceFrame?.(restrictedMatrixSource) === true
      && restrictedMatrixSource.sourceAnalysis.containingFamily === "adverbial-matrix"
      && suppliedResult.lexicalEntryId === restrictedMatrixSource.sourceAnalysis.requiredAdverbialEntryId
      && suppliedResult.operationFrame.degree === restrictedMatrixSource.sourceAnalysis.requiredAdverbialDegree
      && suppliedResult.sourceFrame.clauseKind === "nnc-absolutive"
      && constituentStem === suppliedResult.wordSurface);
    capturedEmbedState = normalizeKey(suppliedNominalOperand?.operationFrame?.state || suppliedNominalOperand?.canonicalResult?.state);
    capturedEmbedPossessor = normalizeKey(
      suppliedNominalOperand?.operationFrame?.possessor || suppliedNominalOperand?.canonicalResult?.possessor
    );
    capturedEmbedSubject = normalizeKey(
      suppliedNominalOperand?.operationFrame?.subject || suppliedNominalOperand?.canonicalResult?.subject
    );
    const suppliedRestrictedStem = normalizeStem(
      suppliedResult?.operationFrame?.targetStems?.restrictedUse
    );
    const suppliedGeneralStem = normalizeStem(
      suppliedResult?.operationFrame?.targetStems?.generalUse
    );
    const suppliedPredicateStem = normalizeStem(
      suppliedResult?.canonicalResult?.nncSlotFrame?.slots?.predicate?.stem
    );
    const actionNncCapture = constituentKind === "action-nnc"
      ? captureExactCoreActionNncConstituent(suppliedResult, target) : null;
    const actionNncAuthorized = Boolean(actionNncCapture
      && actionNncCapture.sourceStem === constituentStem);
    const obsoleteGeneralUse = constituentKind === "obsolete-general-use-nnc"
      ? target.getClassicalNahuatlObsoleteGeneralUseAdverbialConstituent?.(suppliedResult) : null;
    const obsoleteGeneralUseAuthorized = Boolean(obsoleteGeneralUse
      && obsoleteGeneralUse.canonicalResultFrame === suppliedResult
      && obsoleteGeneralUse.stem === constituentStem);
    const preteritAgentiveAuthorized = Boolean(
      constituentKind === "preterit-agentive-nnc"
      && suppliedResult
      && target.isClassicalNahuatlDeverbalNncGrammarFrame?.(suppliedResult) === true
      && suppliedResult.operationFrame?.nominalizationKind
        === "preterit-agentive"
      && [suppliedRestrictedStem, suppliedGeneralStem, suppliedPredicateStem]
        .filter(Boolean).includes(constituentStem)
    );
    const preteritPatientiveAuthorized = Boolean(
      constituentKind === "preterit-patientive-nnc"
      && target.isClassicalNahuatlDeverbalNncGrammarFrame?.(suppliedResult) === true
      && suppliedResult.operationFrame?.nominalizationKind === "preterit-patientive"
      && suppliedGeneralStem && constituentStem === suppliedGeneralStem
    );
    const preteritAgentiveGeneralUse = Boolean(
      (preteritAgentiveAuthorized || preteritPatientiveAuthorized)
      && suppliedGeneralStem
      && constituentStem === suppliedGeneralStem
    );
    const customaryBoundaryBridge = constituentObject?.bridgeFrame;
    const customaryBoundaryAuthorized = Boolean(customaryBoundaryBridge
      && target.isClassicalNahuatlCustomaryAgentiveBoundaryConstituent?.(customaryBoundaryBridge, suppliedResult) === true
      && customaryBoundaryBridge.useKind === "compound-embed"
      && customaryBoundaryBridge.canonicalParentResult === suppliedResult
      && customaryBoundaryBridge.selectedStem === constituentStem);
    const customaryAgentiveAuthorized = Boolean(
      ["compound-nnc", "affective-nnc", "nominal-embed-vnc"].includes(constructionKind)
      && constituentKind === "customary-agentive-nnc"
      && target.isClassicalNahuatlDeverbalNncGrammarFrame?.(suppliedResult)
      && suppliedResult.operationFrame?.nominalizationKind
        === "customary-agentive-full"
      && suppliedResult.operationFrame?.nounClass === "tl"
      && suppliedGeneralStem
      && (customaryBoundaryBridge ? customaryBoundaryAuthorized : constituentStem === suppliedGeneralStem)
    );
    const futureAgentiveAuthorized = Boolean(
      ["compound-nnc", "affective-nnc", "nominal-embed-vnc"].includes(constructionKind)
      && constituentKind === "future-agentive-nnc"
      && target.isClassicalNahuatlDeverbalNncGrammarFrame?.(suppliedResult)
      && suppliedResult.operationFrame?.nominalizationKind
        === "future-agentive"
      && suppliedResult.operationFrame?.futureAgentiveFrame?.authorizationStatus === "authorized"
      && suppliedGeneralStem
      && constituentStem === suppliedGeneralStem
    );
    const futureRestrictedReceipt = constituentKind === "future-agentive-lexicalized-nnc"
      ? constituentObject?.bridgeFrame : null;
    const futureRestrictedAuthorized = Boolean(
      ["compound-nnc", "affective-nnc"].includes(constructionKind)
      && target.isClassicalNahuatlFutureAgentiveRestrictedEmbedReceipt?.(futureRestrictedReceipt)
      && futureRestrictedReceipt.canonicalResult === suppliedResult
      && futureRestrictedReceipt.stem === constituentStem
    );
    const includedPredicateCitation = constituentKind === "ordinary-nnc"
      && target.isClassicalNahuatlOrdinaryNncResult?.(suppliedResult) === true
      && suppliedResult.sourceFrame.adjectivalProfile?.kind === "possessor-included"
        ? target.getClassicalNahuatlNncRestrictedUseCitationProjection?.(suppliedResult) : null;
    const includedPredicateAuthorized = Boolean(includedPredicateCitation
      && target.isClassicalNahuatlNncRestrictedUseCitationProjection?.(includedPredicateCitation)
      && includedPredicateCitation.canonicalResultFrame === suppliedResult
      && includedPredicateCitation.stem === constituentStem);
    const ordinaryNncAuthorized = Boolean(
      constituentKind === "ordinary-nnc"
      && suppliedResult
      && target.isClassicalNahuatlOrdinaryNncResult?.(suppliedResult) === true
      && (suppliedResult.sourceFrame.restrictedUseOnly !== true
        || constructionKind === "nominal-embed-vnc"
          && normalizeKey(request.relation || source.relation) === "object"
          && suppliedResult.sourceFrame.attestedGeneralUseStem === constituentStem)
      && (includedPredicateAuthorized || (!suppliedResult.sourceFrame.adjectivalProfile?.includesPossessor
        && normalizeStem(suppliedResult.sourceFrame?.stem) === constituentStem))
    );
    // Andrews §32.3.1: the demonstrative stem is retained in the tzin compound.
    const demonstrativePronominalAuthorized = Boolean(
      constructionKind === "affective-nnc"
      && constituentKind === "demonstrative-pronominal-nnc"
      && target.isClassicalNahuatlPronominalNncResult?.(suppliedResult) === true
      && ["demonstrative-this", "demonstrative-that"].includes(suppliedResult.sourceFrame?.familyId)
      && suppliedResult.sourceFrame?.nounClass === "zero"
      && normalizeStem(suppliedResult.sourceFrame?.stem) === constituentStem
      && normalizeNounClass(source.embedClass) === "zero"
    );
    const quantitivePronominalAuthorized = Boolean(
      constructionKind === "affective-nnc"
      && constituentKind === "quantitive-pronominal-nnc"
      && target.isClassicalNahuatlPronominalNncResult?.(suppliedResult) === true
      && suppliedResult.sourceFrame?.familyId === "quantitive"
      && ["qui", "chi"].includes(suppliedResult.sourceFrame?.matrixFamily)
      && suppliedResult.operationFrame?.subject === "3common"
      && /-(?:qui|quī|chi|chī)$/u.test(constituentStem)
      && normalizeStem(suppliedResult.typedSlotFrame?.slots?.predicate?.stem)
        === constituentStem
    );
    const exactOrdinaryNncPredicateFrame = constituentKind === "ordinary-nnc-predicate"
      && constructionKind === "nominal-embed-vnc"
      ? resolveExactOrdinaryNncPredicateEmbed(source, target, request)
      : null;
    const ordinaryNncPredicateAuthorized =
      exactOrdinaryNncPredicateFrame?.authorizationStatus === "authorized";
    const basicNumeralCitation = constituentKind === "cardinal-nnc"
      && constructionKind === "nominal-embed-vnc"
      ? getClassicalNahuatlBasicNumeralEmbedCitation(suppliedResult, target) : null;
    const cardinalNncAuthorized = Boolean(basicNumeralCitation
      && basicNumeralCitation.stem === constituentStem);
    const compoundNncAuthorized = Boolean(compoundNncResult
      && normalizeStem(compoundNncResult.operationFrame.compoundStem) === constituentStem);
    const affectiveNncAuthorized = Boolean(
      constituentKind === "affective-nnc"
      && suppliedResult
      && target.isClassicalNahuatlNominalConstructionResult?.(suppliedResult)
        === true
      && suppliedResult.constructionKind === "affective-nnc"
      && suppliedResult.operationFrame?.affectRoute === "compound"
      && normalizeStem(suppliedResult.operationFrame?.compoundStem)
        === constituentStem
    );
    const patientiveBridgeFrame = constituentKind === "patientive-nnc"
      ? constituentObject?.bridgeFrame || null
      : null;
    const patientiveCaptureFrame = patientiveBridgeFrame?.captureFrame
      || null;
    // A whole patientive can enter the attested honorific compound through
    // its existing authenticated continuation bridge. This does not license
    // the same bridge for general patientive incorporation.
    const patientiveHonorificAuthorized = Boolean(
      constructionKind === "affective-nnc"
      && normalizeKey(request.affectiveMatrix || source.affectiveMatrix) === "tzin"
      && isClassicalNahuatlPatientiveMatrixConstituentFrame(patientiveBridgeFrame)
      && patientiveCaptureFrame?.authorizationStatus === "authorized"
      && patientiveCaptureFrame?.kind
        === "classical-nahuatl-patientive-nnc-matrix-continuation-capture-frame"
      && patientiveCaptureFrame?.canonicalPatientiveNncResult
        === patientiveBridgeFrame.canonicalPatientiveNncResult
      && (patientiveBridgeFrame.canonicalPatientiveNncResult === suppliedResult
        || target.isClassicalNahuatlDeverbalNncGrammarFrame?.(suppliedResult) === true
          && patientiveCaptureFrame.canonicalNncGrammarFrame === suppliedResult
          && suppliedResult.canonicalResult === patientiveBridgeFrame.canonicalPatientiveNncResult)
      && patientiveCaptureFrame.exactResultIdentityPreserved === true
      && patientiveCaptureFrame.grammarAuthority === false
      && patientiveCaptureFrame.formulaStringAuthority === false
      && patientiveCaptureFrame.surfaceStringAuthority === false
      && Object.isFrozen(patientiveCaptureFrame)
      && normalizeStem(patientiveCaptureFrame.sourceStem) === constituentStem
    );
    const patientiveNncAuthorized = Boolean(
      constituentKind === "patientive-nnc"
      && suppliedResult
      && (patientiveHonorificAuthorized || (isClassicalNahuatlPatientiveEmbedConstituentFrame(
        patientiveBridgeFrame
      )
      && patientiveCaptureFrame?.canonicalPatientiveNncResult
        === patientiveBridgeFrame.canonicalPatientiveNncResult
      && (patientiveBridgeFrame.canonicalPatientiveNncResult === suppliedResult
        || target.isClassicalNahuatlDeverbalNncGrammarFrame?.(suppliedResult) === true
          && patientiveCaptureFrame.canonicalNncGrammarFrame === suppliedResult
          && suppliedResult.canonicalResult === patientiveBridgeFrame.canonicalPatientiveNncResult)
      && patientiveCaptureFrame?.exactResultIdentityPreserved === true
      && (
        (
          Array.isArray(patientiveBridgeFrame.licensedEmbedStems)
          && patientiveBridgeFrame.licensedEmbedStems
            .map(normalizeStem).includes(constituentStem)
        )
        || (
          normalizeKey(source.matrixSemanticFamily)
            === "patientive-incorporated-object-matrix"
          && normalizeStem(
            patientiveBridgeFrame.restrictedUseEmbedStem
          ) === constituentStem
        )
        || (
          normalizeKey(source.matrixSemanticFamily)
            === "short-a-type-three-causative-tlani"
          && normalizeStem(
            patientiveBridgeFrame.participantSeparatedEmbedStem
          ) === constituentStem
        )
      )))
    );
    const suppliedAdjectivalModificationBridge =
      constituentObject?.bridgeFrame || null;
    const adjectivalModificationFrame =
      ["adjectival-modification", "adjectival-modification-modifier-part"].includes(constituentKind)
        ? target.isClassicalNahuatlAdjectivalModificationIncorporationFrame?.(suppliedAdjectivalModificationBridge) === true
          && suppliedAdjectivalModificationBridge
            .canonicalAdjectivalModificationResult === suppliedResult
          ? suppliedAdjectivalModificationBridge
          : null
        : null;
    const adjectivalModificationAuthorized = Boolean(
      ["adjectival-modification", "adjectival-modification-modifier-part"].includes(constituentKind)
      && suppliedResult
      && target.isClassicalNahuatlAdjectivalModificationIncorporationFrame?.(adjectivalModificationFrame) === true
      && adjectivalModificationFrame
        .canonicalAdjectivalModificationResult === suppliedResult
      && (constituentKind === "adjectival-modification"
        ? adjectivalModificationFrame.incorporatedStem === constituentStem
        : constructionKind === "compound-nnc"
          && adjectivalModificationFrame.modifierPart.stem === constituentStem
          && adjectivalModificationFrame.headPart.clause.typedSlotFrame.slots.state.arity === "vacant"
          && target.isClassicalNahuatlOrdinaryNncResult?.(adjectivalModificationFrame.headPart.clause.sourceResult) === true
          && adjectivalModificationFrame.headPart.clause.sourceResult.stemOperation?.predicateFormation === "source-stem"
          && adjectivalModificationFrame.headPart.clause.sourceResult.operationFrame?.stemFormation === "plain"
          && source.matrixConstituent?.resultFrame === adjectivalModificationFrame.headPart.clause.sourceResult)
    );
    const adjectivalBridge = constituentObject?.bridgeFrame;
    const adjectivalSourceAuthorized = Boolean(
      ["adjectival-root-nnc", "adjectival-general-use-nnc"].includes(constituentKind)
      && isClassicalNahuatlAdjectivalNncSourceConstituentFrame(adjectivalBridge)
      && adjectivalBridge.canonicalNncResult === suppliedResult
      && adjectivalBridge.stem === constituentStem
      && constituentKind === (adjectivalBridge.useShape === "source-root" ? "adjectival-root-nnc" : "adjectival-general-use-nnc")
      && (adjectivalBridge.useShape === "source-root" ? constructionKind === "compound-nnc"
        : ["compound-nnc", "affective-nnc"].includes(constructionKind)));
    const adjectivalQualityAuthorized = constituentKind === "adjectival-quality-nnc"
      && isClassicalNahuatlNominalConstructionResult(suppliedResult)
      && suppliedResult.constructionKind === "adjectival-nnc"
      && suppliedResult.typedSlotFrame.slots.predicate.stem === constituentStem;
    const characteristicSource = constituentKind === "characteristic-noun-source"
      ? constituentObject.sourceFrame : null;
    const characteristicRealization = normalizeKey(request.characteristicMatrixRealization || "full");
    const characteristicNounSourceAuthorized = Boolean(characteristicSource
      && target.isClassicalNahuatlCharacteristicNounSourceFrame?.(characteristicSource) === true
      && constructionKind === "nominal-embed-vnc"
      && normalizeKey(request.relation || source.relation) === "object"
      && ["full", "omitted"].includes(characteristicRealization)
      && constituentStem === (characteristicRealization === "omitted"
        ? characteristicSource.characteristicMatrixOmittedEmbedStem
        : characteristicSource.characteristicMatrixFullEmbedStem)
      && normalizeNounClass(source.embedClass) === characteristicSource.nounClass
      && !constituentObject.resultFrame && !constituentObject.bridgeFrame);
    const resultAuthorized = adverbialNncAuthorized || characteristicNounSourceAuthorized || adjectivalSourceAuthorized || adjectivalQualityAuthorized || obsoleteGeneralUseAuthorized || actionNncAuthorized || preteritAgentiveAuthorized
      || preteritPatientiveAuthorized
      || customaryAgentiveAuthorized
      || futureAgentiveAuthorized
      || futureRestrictedAuthorized
      || ordinaryNncAuthorized
      || demonstrativePronominalAuthorized
      || quantitivePronominalAuthorized
      || ordinaryNncPredicateAuthorized
      || cardinalNncAuthorized
      || compoundNncAuthorized
      || affectiveNncAuthorized
      || patientiveNncAuthorized
      || adjectivalModificationAuthorized;
    if (
      forbiddenKey
      || negativeProjection && constructionKind !== "nominal-embed-vnc"
      || ![
        "ordinary-nnc",
        "adverbial-nnc-result",
        "obsolete-general-use-nnc",
        "adjectival-root-nnc", "adjectival-general-use-nnc", "adjectival-quality-nnc",
        "action-nnc",
        "demonstrative-pronominal-nnc",
        "quantitive-pronominal-nnc",
        "ordinary-nnc-predicate",
        "cardinal-nnc",
        "preterit-agentive-nnc",
        "preterit-patientive-nnc",
        "customary-agentive-nnc",
        "future-agentive-nnc",
        "future-agentive-lexicalized-nnc",
        "compound-nnc",
        "affective-nnc",
        "patientive-nnc",
        "characteristic-noun-source",
        "adjectival-modification",
        "adjectival-modification-modifier-part",
      ].includes(constituentKind)
      || !constituentStem
      || constituentStem !== embedStem
      || !resultAuthorized
    ) {
      blockReason = constituentKind === "characteristic-noun-source"
        ? "characteristic-noun-source-embed-mismatch"
        : constituentKind === "ordinary-nnc-predicate"
        ? exactOrdinaryNncPredicateFrame?.blockReason
          || "ordinary-nnc-predicate-embed-constituent-mismatch"
        : constituentKind === "ordinary-nnc"
        ? suppliedResult?.sourceFrame?.restrictedUseOnly === true
          ? "ordinary-nnc-embed-source-use-analysis-required"
          : "ordinary-nnc-embed-constituent-mismatch"
        : constituentKind === "quantitive-pronominal-nnc"
        ? "quantitive-pronominal-embed-constituent-mismatch"
        : constituentKind === "compound-nnc"
          ? "compound-nnc-embed-constituent-mismatch"
          : constituentKind === "affective-nnc"
            ? "affective-nnc-embed-constituent-mismatch"
            : constituentKind === "patientive-nnc"
              ? "patientive-nnc-embed-constituent-mismatch"
              : ["adjectival-modification", "adjectival-modification-modifier-part"].includes(constituentKind)
                ? "adjectival-modification-embed-constituent-mismatch"
              : constituentKind === "future-agentive-nnc"
                ? "future-agentive-embed-constituent-mismatch"
              : constituentKind === "customary-agentive-nnc"
                ? "customary-agentive-embed-constituent-mismatch"
              : "preterit-agentive-embed-constituent-mismatch";
    } else {
      agentiveEmbed = preteritAgentiveAuthorized;
      capturedEmbedResult = suppliedResult;
      canonicalAdverbialEmbedResult = adverbialNncAuthorized ? suppliedResult : null;
      capturedCharacteristicNounSourceFrame = characteristicNounSourceAuthorized ? characteristicSource : null;
      lexicalizedAdjectivalModification = adjectivalModificationAuthorized
        && constituentKind === "adjectival-modification-modifier-part";
      capturedCompoundNncResult = compoundNncAuthorized ? compoundNncResult : null;
      capturedEmbedNegativeProjection = negativeProjection || null;
      capturedBasicNumeralEmbedCitation = cardinalNncAuthorized ? basicNumeralCitation : null;
      capturedEmbedNounClass = normalizeNounClass(
        characteristicNounSourceAuthorized ? characteristicSource.nounClass : adjectivalSourceAuthorized ? (adjectivalBridge.useShape === "source-root" ? "" : "tl") : adjectivalQualityAuthorized ? suppliedResult.operationFrame.nounClass : obsoleteGeneralUseAuthorized ? obsoleteGeneralUse.nounClass : actionNncAuthorized ? "tli" : futureRestrictedAuthorized ? "tli"
          : (customaryAgentiveAuthorized || futureAgentiveAuthorized) ? "tl"
          : ordinaryNncPredicateAuthorized
          ? exactOrdinaryNncPredicateFrame.finalNounClass
          : adjectivalModificationAuthorized
          ? "zero"
          : patientiveNncAuthorized
          ? patientiveCaptureFrame?.sourceNounClass
          : suppliedNominalOperand?.sourceFrame?.nounClass
        || suppliedNominalOperand?.operationFrame?.matrixClass
        || (preteritAgentiveGeneralUse ? "tl" : "zero")
      );
      capturedEmbedSourceClass = normalizeKey(
        characteristicNounSourceAuthorized ? characteristicSource.nounClass : adjectivalSourceAuthorized ? (adjectivalBridge.useShape === "source-root" ? "root-only" : "tl-1-a") : adjectivalQualityAuthorized ? suppliedResult.operationFrame.nounClass : obsoleteGeneralUseAuthorized ? obsoleteGeneralUse.sourceClass : actionNncAuthorized ? "tli-1" : futureRestrictedAuthorized ? "tli-1"
          : (customaryAgentiveAuthorized || futureAgentiveAuthorized) ? "tl-1-a"
          : adjectivalModificationAuthorized
          ? "zero"
          : patientiveNncAuthorized
          ? patientiveCaptureFrame?.sourceCompoundClass
          : suppliedNominalOperand?.sourceFrame?.sourceClass
        || suppliedNominalOperand?.sourceFrame?.subclass
        || suppliedNominalOperand?.operationFrame?.resultSourceClass
        || suppliedNominalOperand?.operationFrame?.resultSourceClassFrame
          ?.sourceClass
        || (preteritAgentiveGeneralUse ? "tl-1-a" : "zero")
        || capturedEmbedNounClass
      );
      capturedEmbedUseShape = normalizeKey(
        (customaryAgentiveAuthorized || futureAgentiveAuthorized) ? "base"
          : adjectivalModificationAuthorized
          ? "base"
          : patientiveNncAuthorized
          ? "base"
          : suppliedNominalOperand?.sourceFrame?.useShape
        || suppliedNominalOperand?.operationFrame?.resultSourceClassFrame?.useShape
        || "base"
      );
      capturedEmbedSubclass = normalizeKey(
        adjectivalSourceAuthorized ? (adjectivalBridge.useShape === "source-root" ? "" : "tl-1-a") : obsoleteGeneralUseAuthorized ? obsoleteGeneralUse.sourceClass : actionNncAuthorized ? "tli-1" : futureRestrictedAuthorized ? "tli-1"
          : (customaryAgentiveAuthorized || futureAgentiveAuthorized) ? "tl-1-a"
          : adjectivalModificationAuthorized
          ? ""
          : patientiveNncAuthorized
          ? patientiveCaptureFrame?.sourceCompoundClass
          : suppliedNominalOperand?.sourceFrame?.subclass
        || suppliedNominalOperand?.operationFrame?.resultSourceClassFrame?.subclass
        || (preteritAgentiveGeneralUse ? "tl-1-a" : "")
      );
      capturedEmbedEphemeralFinalVowel = normalizeKey(
        suppliedNominalOperand?.sourceFrame?.ephemeralFinalVowel
        || suppliedNominalOperand?.operationFrame?.resultSourceClassFrame
          ?.ephemeralFinalVowel
      );
      capturedEmbedTruncationRepair = normalizeKey(
        suppliedNominalOperand?.sourceFrame?.truncationRepair
        || suppliedNominalOperand?.operationFrame?.resultSourceClassFrame
          ?.truncationRepair
      );
      capturedEmbedPatientiveCaptureFrame = patientiveNncAuthorized
        ? patientiveCaptureFrame
        : null;
      capturedAdjectivalModificationFrame =
        adjectivalModificationAuthorized
          ? adjectivalModificationFrame
          : null;
      capturedExactOrdinaryNncPredicateFrame = ordinaryNncPredicateAuthorized
        ? exactOrdinaryNncPredicateFrame
        : null;
      if (ordinaryNncPredicateAuthorized && !exactOrdinaryNncPredicateFrame.sourceStemOperation) {
        capturedEmbedSourceClass = capturedEmbedNounClass;
        capturedEmbedUseShape = "base";
        capturedEmbedSubclass = "";
        capturedEmbedEphemeralFinalVowel = "";
        capturedEmbedTruncationRepair = "none";
      }
    }
  }
  let matrixResultProjection = null;
  let capturedMatrixInherentImpersonal = false;
  let capturedMatrixInternalTlaImpersonal = false;
  let capturedMatrixNncResult = null;
  let capturedMatrixPatientiveCaptureFrame = null;
  let capturedMatrixNounClass = "";
  let capturedMatrixSourceClass = "";
  let capturedMatrixUseShape = "";
  let capturedMatrixSubclass = "";
  let capturedMatrixEphemeralFinalVowel = "";
  let capturedMatrixTruncationRepair = "";
  let capturedMatrixRestrictedUseOnly = false;
  let capturedMatrixDerivationType = "";
  if (!blockReason && matrixConstituent !== undefined) {
    const constituentObject = matrixConstituent
      && typeof matrixConstituent === "object"
      && !Array.isArray(matrixConstituent)
      ? matrixConstituent
      : null;
    const allowedKeys = new Set([
      "kind", "stem", "resultFrame", "bridgeFrame",
      ...(normalizeKey(constituentObject?.kind) === "restricted-vnc-source" ? ["sourceFrame"] : []),
    ]);
    const forbiddenKey = constituentObject
      ? Reflect.ownKeys(constituentObject).find(
        key => typeof key !== "string" || !allowedKeys.has(key)
      )
      : "matrixConstituent";
    if (constructionKind === "compound-nnc") {
      const constituentKind = normalizeKey(constituentObject?.kind);
      const suppliedResult = constituentObject?.resultFrame || null;
      const actionNncCapture = constituentKind === "action-nnc"
        ? captureExactCoreActionNncConstituent(suppliedResult, target, true) : null;
      const actionNncAuthorized = Boolean(actionNncCapture
        && actionNncCapture.sourceStem === matrixStem);
      // §31.1 requires general use of the embed, not the governing matrix.
      // A coarse matrix can supply its restricted base and absolute class;
      // possession and plural formation still need further Source facts.
      const restrictedMatrixTarget = normalizeKey(request.state || "absolutive") === "absolutive"
        && !normalizeSubject(request.subject || "3sg").endsWith("pl");
      const ordinaryNncAuthorized = Boolean(
        constituentKind === "ordinary-nnc"
        && suppliedResult
        && target.isClassicalNahuatlOrdinaryNncResult?.(suppliedResult) === true
        && (suppliedResult.sourceFrame.restrictedUseOnly !== true
          || restrictedMatrixTarget
            && suppliedResult.operationFrame?.state === "absolutive"
            && suppliedResult.operationFrame?.stemFormation === "plain"
            && suppliedResult.stemOperation?.predicateFormation === "source-stem")
        && normalizeStem(suppliedResult.sourceFrame?.stem) === matrixStem
      );
      const secondaryGeneralUseAuthorized = Boolean(
        constituentKind === "ordinary-nnc-secondary-general-use"
        && target.isClassicalNahuatlOrdinaryNncResult?.(suppliedResult)
        && suppliedResult.stemOperation?.predicateFormation === "secondary-general-use"
        && normalizeStem(suppliedResult.stemOperation.targetStem) === matrixStem
      );
      const preteritAgentiveMatrixAuthorized = Boolean(
        constituentKind === "preterit-agentive-nnc"
        && target.isClassicalNahuatlDeverbalNncGrammarFrame?.(suppliedResult)
        && suppliedResult.operationFrame?.nominalizationKind === "preterit-agentive"
        && normalizeStem(suppliedResult.operationFrame.targetStems.restrictedUse) === matrixStem
      );
      // §40.6 uses the zero customary predicate as a matrix under owned AH.
      // The issued parent supplies NI and its number contract; it is not a
      // full/general-use nominal stem or a caller-declared ordinary noun.
      const customaryReanalysisMatrixAuthorized = Boolean(
        constituentKind === "customary-agentive-reanalysis-nnc"
        && target.isClassicalNahuatlDeverbalNncGrammarFrame?.(suppliedResult)
        && suppliedResult.operationFrame?.nominalizationKind === "customary-agentive-reanalysis"
        && suppliedResult.operationFrame?.nounClass === "zero"
        && suppliedResult.operationFrame?.connectorProfile === "vnc-reanalysis"
        && suppliedResult.canonicalResult?.nncSlotFrame?.slots?.state?.arity === "vacant"
        && normalizeStem(suppliedResult.operationFrame?.targetStems?.restrictedUse) === matrixStem
        && normalizeStem(suppliedResult.canonicalResult?.nncSlotFrame?.slots?.predicate?.stem) === matrixStem
      );
      const compoundNncAuthorized = Boolean(
        constituentKind === "compound-nnc"
        && suppliedResult
        && target.isClassicalNahuatlNominalConstructionResult?.(suppliedResult) === true
        && suppliedResult.constructionKind === "compound-nnc"
        && (suppliedResult.sourceFrame?.restrictedUseOnly !== true || restrictedMatrixTarget)
        && normalizeStem(suppliedResult.operationFrame?.compoundStem)
          === matrixStem
      );
      const affectiveNncAuthorized = Boolean(
        constituentKind === "affective-nnc"
        && target.isClassicalNahuatlNominalConstructionResult?.(suppliedResult)
        && suppliedResult.constructionKind === "affective-nnc"
        && suppliedResult.operationFrame?.affectRoute === "compound"
        && normalizeStem(suppliedResult.operationFrame?.compoundStem) === matrixStem
      );
      const patientiveBridgeFrame = constituentKind === "patientive-nnc"
        ? constituentObject?.bridgeFrame || null
        : null;
      const patientiveCaptureFrame = patientiveBridgeFrame?.captureFrame
        || null;
      const patientiveResultIdentityPreserved = Boolean(
        patientiveBridgeFrame?.canonicalPatientiveNncResult === suppliedResult
        || target.isClassicalNahuatlDeverbalNncGrammarFrame?.(suppliedResult) === true
          && patientiveCaptureFrame?.canonicalNncGrammarFrame === suppliedResult
          && suppliedResult.canonicalResult === patientiveBridgeFrame?.canonicalPatientiveNncResult
      );
      const patientiveCaptureAuthorized = Boolean(
        isClassicalNahuatlPatientiveMatrixConstituentFrame(
          patientiveBridgeFrame
        )
        && patientiveResultIdentityPreserved
        && patientiveCaptureFrame?.authorizationStatus === "authorized"
        && patientiveCaptureFrame?.kind
          === "classical-nahuatl-patientive-nnc-matrix-continuation-capture-frame"
        && patientiveCaptureFrame?.canonicalPatientiveNncResult
          === patientiveBridgeFrame.canonicalPatientiveNncResult
        && patientiveCaptureFrame?.exactResultIdentityPreserved === true
        && patientiveCaptureFrame?.grammarAuthority === false
        && patientiveCaptureFrame?.formulaStringAuthority === false
        && patientiveCaptureFrame?.surfaceStringAuthority === false
        && Object.isFrozen(patientiveCaptureFrame)
      );
      const patientiveNncAuthorized = Boolean(
        constituentKind === "patientive-nnc"
        && suppliedResult
        && patientiveCaptureAuthorized
        && patientiveResultIdentityPreserved
        && normalizeStem(patientiveCaptureFrame.sourceStem) === matrixStem
      );
      capturedMatrixNounClass = normalizeNounClass(
        actionNncAuthorized ? "tli" : (preteritAgentiveMatrixAuthorized || customaryReanalysisMatrixAuthorized) ? "zero"
          : (ordinaryNncAuthorized || secondaryGeneralUseAuthorized)
          ? suppliedResult?.sourceFrame?.nounClass
          : patientiveNncAuthorized
            ? patientiveCaptureFrame?.sourceNounClass
            : suppliedResult?.operationFrame?.matrixClass
      );
      capturedMatrixSourceClass = normalizeKey(
        actionNncAuthorized ? (actionNncCapture.actionKind === "potential-patient" ? "tli" : "tli-1") : (preteritAgentiveMatrixAuthorized || customaryReanalysisMatrixAuthorized) ? "zero"
          : (ordinaryNncAuthorized || secondaryGeneralUseAuthorized)
          ? suppliedResult?.sourceFrame?.sourceClass
            || suppliedResult?.sourceFrame?.subclass
            || capturedMatrixNounClass
          : patientiveNncAuthorized
            ? normalizeKey(
              patientiveCaptureFrame?.sourceCompoundClass
            ).includes("-")
              ? patientiveCaptureFrame?.sourceCompoundClass
              : ""
              || capturedMatrixNounClass
            : suppliedResult?.operationFrame?.resultSourceClass
              || suppliedResult?.operationFrame?.matrixSourceClassFrame
                ?.sourceClass
              || capturedMatrixNounClass
      );
      capturedMatrixUseShape = normalizeKey(
        (ordinaryNncAuthorized || secondaryGeneralUseAuthorized)
          ? suppliedResult?.sourceFrame?.useShape || "base"
          : patientiveNncAuthorized
            ? "base"
            : suppliedResult?.operationFrame?.resultSourceClassFrame?.useShape
              || "base"
      );
      capturedMatrixSubclass = normalizeKey(
        actionNncAuthorized ? (actionNncCapture.actionKind === "potential-patient" ? "" : "tli-1") : (ordinaryNncAuthorized || secondaryGeneralUseAuthorized)
          ? suppliedResult?.sourceFrame?.subclass
          : patientiveNncAuthorized
            ? patientiveCaptureFrame?.sourceCompoundClass
            : suppliedResult?.operationFrame?.resultSourceClassFrame?.subclass
      );
      capturedMatrixEphemeralFinalVowel = normalizeKey(
        (ordinaryNncAuthorized || secondaryGeneralUseAuthorized)
          ? suppliedResult?.sourceFrame?.ephemeralFinalVowel
          : suppliedResult?.operationFrame?.resultSourceClassFrame
            ?.ephemeralFinalVowel
      );
      capturedMatrixTruncationRepair = normalizeKey(
        (ordinaryNncAuthorized || secondaryGeneralUseAuthorized)
          ? suppliedResult?.sourceFrame?.truncationRepair
          : suppliedResult?.operationFrame?.resultSourceClassFrame
            ?.truncationRepair
      );
      if (forbiddenKey) {
        blockReason = "compound-nnc-matrix-constituent-shape-invalid";
      } else if (
        !(ordinaryNncAuthorized || secondaryGeneralUseAuthorized)
        && !preteritAgentiveMatrixAuthorized
        && !customaryReanalysisMatrixAuthorized
        && !actionNncAuthorized
        && !compoundNncAuthorized
        && !affectiveNncAuthorized
        && !patientiveNncAuthorized
      ) {
        blockReason = suppliedResult?.sourceFrame?.restrictedUseOnly === true
          ? "ordinary-nnc-matrix-source-use-analysis-required"
          : "compound-nnc-matrix-owner-result-required";
      } else if (normalizeStem(constituentObject?.stem) !== matrixStem) {
        blockReason = "compound-nnc-matrix-stem-mismatch";
      } else if (
        capturedMatrixNounClass !== normalizeNounClass(source.matrixClass)
      ) {
        blockReason = "compound-nnc-matrix-class-mismatch";
      } else {
        capturedMatrixNncResult = suppliedResult;
        capturedMatrixPatientiveCaptureFrame = patientiveCaptureFrame;
        capturedMatrixRestrictedUseOnly = suppliedResult?.sourceFrame?.restrictedUseOnly === true;
      }
    } else if (normalizeKey(constituentObject?.kind) === "restricted-vnc-source") {
      const exactSource = constituentObject.sourceFrame;
      if (forbiddenKey || !canonicalAdverbialEmbedResult
        || target.isClassicalNahuatlRestrictedContainingVncSourceFrame?.(exactSource) !== true
        || exactSource.sourceAnalysis.containingFamily !== "adverbial-matrix"
        || exactSource.sourceStem !== matrixStem
        || source.matrixVerbClass && source.matrixVerbClass !== exactSource.sourceClass
        || source.matrixValence && source.matrixValence !== exactSource.sourceValence
        || constituentObject.stem && normalizeStem(constituentObject.stem) !== matrixStem) {
        blockReason = "nominal-adverbial-restricted-matrix-source-mismatch";
      } else canonicalRestrictedMatrixSourceFrame = exactSource;
    } else {
      matrixResultProjection = target
        .getClassicalNahuatlVncContinuationSourceConstituents?.(
          constituentObject?.resultFrame
        ) || null;
      capturedMatrixDerivationType = normalizeKey(
        constituentObject?.resultFrame?.normalizedRequest?.derivationType
        || constituentObject?.resultFrame?.derivationOperationFrame?.derivationType
        || constituentObject?.resultFrame?.resultFrame?.derivationOperationFrame
          ?.derivationType
        || constituentObject?.resultFrame?.operationFrame?.derivationType
      );
      const projectedObjectCount = Array.isArray(
        matrixResultProjection?.sourceObjectRequests
      )
        ? matrixResultProjection.sourceObjectRequests.length
        : -1;
      const expectedObjectCount = ({
        intransitive: 0,
        "single-object": 1,
        "double-object": 2,
        "triple-object": 3,
      })[normalizeMatrixValence(source.matrixValence || source.sourceValence)];
      if (
        forbiddenKey
        || normalizeKey(constituentObject?.kind) !== "vnc-result"
        || normalizeStem(constituentObject?.stem) !== matrixStem
        || matrixResultProjection?.sourceStem !== matrixStem
        || matrixResultProjection?.verbClass
          !== normalizeToken(source.matrixVerbClass || source.verbClass).toUpperCase()
        || projectedObjectCount !== expectedObjectCount
        || matrixResultProjection?.grammarAuthority !== false
        || matrixResultProjection?.callerSuppliedAuthorityAccepted !== false
      ) {
        blockReason = "nominal-embed-matrix-result-constituent-mismatch";
      } else {
        capturedMatrixInherentImpersonal = matrixResultProjection.inherentImpersonal === true;
        capturedMatrixInternalTlaImpersonal = matrixResultProjection.internalTlaImpersonal === true;
      }
    }
  }

  const suppliedMatrixDerivationType = normalizeKey(
    source.matrixDerivationType || ""
  );
  if (
    !blockReason
    && capturedMatrixDerivationType
    && suppliedMatrixDerivationType
    && capturedMatrixDerivationType !== suppliedMatrixDerivationType
  ) {
    blockReason = "nominal-embed-matrix-derivation-analysis-mismatch";
  }
  const matrixDerivationType = capturedMatrixDerivationType
    || suppliedMatrixDerivationType
    || "direct";
  const capturedMatrixObjectRequests = Object.freeze(
    (Array.isArray(matrixResultProjection?.sourceObjectRequests)
      ? matrixResultProjection.sourceObjectRequests
      : []).map((objectRequest, index) => Object.freeze({
        objectId: normalizeKey(
          objectRequest?.objectId || `source-object-${index + 1}`
        ),
        objectKind: normalizeKey(
          objectRequest?.objectKind || "specific-projective"
        ),
        objectPerson: normalizeKey(objectRequest?.objectPerson || ""),
        governor: normalizeKey(
          objectRequest?.governor || (index ? "shuntline" : "directive")
        ),
        derivationalLevel: Number(
          objectRequest?.derivationalLevel || index + 1
        ),
        ...(objectRequest?.participantFrame
          ? {participantFrame: objectRequest.participantFrame} : {}),
      }))
  );
  const capturedMatrixSubjectContext = matrixResultProjection?.sourceVoice === "active"
    && ["sourceSubject", "sourceSubjectPerson", "sourceSubjectAnimacy",
      "sourceSubjectHumanness", "sourceSubjectNumber"]
      .every(key => typeof matrixResultProjection[key] === "string")
    ? Object.freeze({
      sourceSubject: matrixResultProjection.sourceSubject,
      sourceSubjectPerson: matrixResultProjection.sourceSubjectPerson,
      sourceSubjectAnimacy: matrixResultProjection.sourceSubjectAnimacy,
      sourceSubjectHumanness: matrixResultProjection.sourceSubjectHumanness,
      sourceSubjectNumber: matrixResultProjection.sourceSubjectNumber,
    }) : null;

  const constrainedEmbedClassAnalysis = constructionKind === "compound-nnc"
    ? getCompoundEmbedClassAlternativesAnalysis(source) : null;
  if (!blockReason && constrainedEmbedClassAnalysis?.authorizationStatus === "blocked") {
    blockReason = constrainedEmbedClassAnalysis.blockReason;
  }
  if (!blockReason && constrainedEmbedClassAnalysis && capturedEmbedResult) {
    blockReason = "compound-embed-class-constraint-requires-open-bound-source";
  }
  if (!blockReason && constrainedEmbedClassAnalysis && (
    normalizeKey(request.structure || source.structure || "integrated") !== "integrated"
    || normalizeKey(request.embedRole || source.embedRole || "association") !== "association"
    || normalizeKey(request.state || source.state || "absolutive") !== "absolutive"
    || normalizeKey(request.possessorOrientation || source.possessorOrientation || "matrix") !== "matrix"
  )) {
    // Only this independent use has a proved invariant operand contract.
    // Other contexts remain unestablished, not grammatically prohibited.
    blockReason = "compound-embed-class-constraint-context-unestablished";
  }
  const negativeParticleSourceFrame = constructionKind === "compound-nnc"
    && ["ah", "ay"].includes(embedStem) && !embedConstituent
    ? deepFreeze({
      kind: "classical-nahuatl-negative-particle-embed-source-frame",
      authorizationStatus: "authorized", sourceKind: "negative-particle",
      sourceStem: embedStem, underlyingSourceStem: "ah", sourceLexeme: "negative-ah",
      selectedForm: embedStem,
      availableForms: Object.freeze(isVowel(firstSound(matrixStem)) ? ["ah", "ay"] : ["ah"]),
      embeddedUseShape: "base", embeddedEnding: "none",
      sourceClassSelectionRequired: false,
      nounClassMembershipAuthority: false,
      declaredNounClassRequired: false,
      sourceAuthority: "owned-negative-particle",
      formulaStringAuthority: false, surfaceStringAuthority: false,
    }) : null;
  if (!blockReason && negativeParticleSourceFrame?.selectedForm === "ay"
    && !negativeParticleSourceFrame.availableForms.includes("ay")) {
    blockReason = "ay-negative-particle-embed-requires-vowel-initial-matrix";
  }
  const declaredEmbedSourceClass = normalizeKey(source.embedSourceClass || source.embedClass);
  if (!blockReason && negativeParticleSourceFrame
    && declaredEmbedSourceClass && declaredEmbedSourceClass !== "zero") {
    blockReason = "negative-particle-embed-does-not-take-a-declared-noun-class";
  }
  const adjectivalSourceConstituentFrame = capturedEmbedResult
    && isClassicalNahuatlAdjectivalNncSourceConstituentFrame(source.embedConstituent?.bridgeFrame)
    ? source.embedConstituent.bridgeFrame : null;
  const classlessRoot = adjectivalSourceConstituentFrame?.useShape === "source-root";
  const requestedEmbedSourceClass = negativeParticleSourceFrame
    ? "zero" : declaredEmbedSourceClass;
  const requestedEmbedClassAnalysis = classlessRoot && requestedEmbedSourceClass === "root-only"
    ? {sourceClass:"root-only",nounClass:"",useShape:"base",subclass:"",ephemeralFinalVowel:"",truncationRepair:"none"}
    : (["compound-nnc", "affective-nnc"].includes(constructionKind)
      || constructionKind === "nominal-embed-vnc" && !capturedEmbedResult)
    ? getCompoundEmbedSourceClassAnalysis(requestedEmbedSourceClass)
    : null;
  if (!blockReason && classlessRoot && declaredEmbedSourceClass && declaredEmbedSourceClass !== "root-only") {
    blockReason = "adjectival-root-does-not-claim-a-noun-class";
  }
  const capturedEmbedClassAnalysis = constructionKind === "compound-nnc"
    && capturedEmbedResult
    ? {
      sourceClass: capturedEmbedSourceClass || capturedEmbedNounClass,
      nounClass: capturedEmbedNounClass,
      useShape: capturedEmbedUseShape || "base",
      subclass: capturedEmbedSubclass,
      ephemeralFinalVowel: capturedEmbedEphemeralFinalVowel,
      truncationRepair: capturedEmbedTruncationRepair || "none",
    }
    : null;
  if (
    !blockReason
    && constructionKind === "compound-nnc"
    && requestedEmbedSourceClass
    && !requestedEmbedClassAnalysis
  ) {
    blockReason = "recognized-compound-embed-source-class-required";
  }
  if (
    !blockReason
    && capturedEmbedClassAnalysis
    && requestedEmbedClassAnalysis
    && (
      requestedEmbedClassAnalysis.nounClass
        !== capturedEmbedClassAnalysis.nounClass
      || requestedEmbedClassAnalysis.useShape
        !== capturedEmbedClassAnalysis.useShape
      || requestedEmbedClassAnalysis.subclass
        !== capturedEmbedClassAnalysis.subclass
      || requestedEmbedClassAnalysis.ephemeralFinalVowel
        !== capturedEmbedClassAnalysis.ephemeralFinalVowel
      || requestedEmbedClassAnalysis.truncationRepair
        !== capturedEmbedClassAnalysis.truncationRepair
    )
  ) {
    blockReason = "compound-embed-source-class-mismatch";
  }
  if (
    !blockReason
    && constructionKind === "affective-nnc"
    && capturedEmbedResult
    && capturedEmbedNounClass !== normalizeNounClass(source.embedClass)
  ) {
    blockReason = "affective-embed-source-class-mismatch";
  }
  const embedSourceClassFrame = (["compound-nnc", "affective-nnc"].includes(constructionKind)
    || constructionKind === "nominal-embed-vnc" && !capturedEmbedResult)
    && (capturedEmbedClassAnalysis || requestedEmbedClassAnalysis
      || constrainedEmbedClassAnalysis?.authorizationStatus === "authorized")
    ? deepFreeze({
      kind: "classical-nahuatl-compound-embed-source-class-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      ...(capturedEmbedClassAnalysis || requestedEmbedClassAnalysis
        || constrainedEmbedClassAnalysis),
      sourceAuthority: negativeParticleSourceFrame
        ? "owned-negative-particle" : capturedEmbedClassAnalysis
        ? "owner-issued-nnc-result"
        : "typed-open-nnc-source",
      ...(negativeParticleSourceFrame ? {
        sourceKind: "negative-particle", sourceClassSelectionRequired: false,
        nounClassMembershipAuthority: false,
      } : {}),
      productiveRouteAuthority: false,
      documentaryExampleAuthority: false,
    })
    : null;

  const requestedMatrixSourceClass = normalizeKey(
    source.matrixSourceClass || source.matrixClass
  );
  const requestedMatrixClassAnalysis = constructionKind === "compound-nnc"
    ? getCompoundEmbedSourceClassAnalysis(requestedMatrixSourceClass)
    : null;
  const capturedMatrixClassAnalysis = constructionKind === "compound-nnc"
    && capturedMatrixNncResult
    ? {
      sourceClass: capturedMatrixSourceClass || capturedMatrixNounClass,
      nounClass: capturedMatrixNounClass,
      useShape: capturedMatrixUseShape || "base",
      subclass: capturedMatrixSubclass,
      ephemeralFinalVowel: capturedMatrixEphemeralFinalVowel,
      truncationRepair: capturedMatrixTruncationRepair || "none",
      ...(capturedMatrixRestrictedUseOnly ? {
        restrictedUseOnly: true, generalUseShapeClaimed: false,
        possessiveSubclassClaimed: false,
      } : {}),
    }
    : null;
  if (
    !blockReason
    && constructionKind === "compound-nnc"
    && requestedMatrixSourceClass
    && !requestedMatrixClassAnalysis
  ) {
    blockReason = "recognized-compound-matrix-source-class-required";
  }
  if (
    !blockReason
    && capturedMatrixClassAnalysis
    && requestedMatrixClassAnalysis
    && (
      requestedMatrixClassAnalysis.nounClass
        !== capturedMatrixClassAnalysis.nounClass
      || requestedMatrixClassAnalysis.useShape
        !== capturedMatrixClassAnalysis.useShape
      || requestedMatrixClassAnalysis.subclass
        !== capturedMatrixClassAnalysis.subclass
      || requestedMatrixClassAnalysis.ephemeralFinalVowel
        !== capturedMatrixClassAnalysis.ephemeralFinalVowel
      || requestedMatrixClassAnalysis.truncationRepair
        !== capturedMatrixClassAnalysis.truncationRepair
    )
  ) {
    blockReason = "compound-matrix-source-class-mismatch";
  }
  const matrixSourceClassFrame = rawCompoundSourceFrame && !blockReason
    ? rawCompoundSourceFrame.matrixSourceClassFrame
    : constructionKind === "compound-nnc"
    && (capturedMatrixClassAnalysis || requestedMatrixClassAnalysis)
    ? deepFreeze({
      kind: "classical-nahuatl-compound-matrix-source-class-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      ...(capturedMatrixClassAnalysis || requestedMatrixClassAnalysis),
      sourceAuthority: capturedMatrixClassAnalysis
        ? "owner-issued-nnc-result"
        : "typed-open-nnc-source",
      productiveRouteAuthority: false,
      documentaryExampleAuthority: false,
    })
    : null;

  // A declared compound-use form supplies only its analyzed general-use
  // shape. It does not assert the independently unknown noun membership.
  const compoundUseDeclaration = source.compoundEmbedUseSource;
  const compoundUseStructure = normalizeKey(request.structure || source.structure || "integrated");
  const compoundUseOrientation = normalizeKey(request.possessorOrientation || source.possessorOrientation || "matrix");
  const compoundEmbedUseSourceAllowed = Boolean(constructionKind === "compound-nnc"
    && !blockReason && (capturedMatrixNncResult || rawCompoundSourceFrame) && matrixSourceClassFrame
    && compoundUseStructure === "integrated" && compoundUseOrientation === "matrix"
    && !capturedEmbedResult && !embedSourceClassFrame
    && !source.compoundEmbedAnalysis && !source.embedLexicalRule
    && ["", "absolutive"].includes(normalizeKey(source.embedState || ""))
    && !source.embedPossessor
    && !request.embedLexicalRule
    && (!rawCompoundSourceFrame || normalizeKey(request.state || "absolutive") === "absolutive"));
  let compoundEmbedUseSourceFrame = null;
  if (compoundUseDeclaration !== undefined) {
    const validDeclaration = compoundUseDeclaration && typeof compoundUseDeclaration === "object"
      && !Array.isArray(compoundUseDeclaration)
      && Object.keys(compoundUseDeclaration).every(key => ["sourceStem", "compoundUseStem"].includes(key))
      && typeof compoundUseDeclaration.sourceStem === "string"
      && typeof compoundUseDeclaration.compoundUseStem === "string";
    const declaredStem = validDeclaration ? normalizeStem(compoundUseDeclaration.sourceStem) : "";
    const useStem = validDeclaration ? normalizeStem(compoundUseDeclaration.compoundUseStem) : "";
    if (!blockReason && (!validDeclaration || !declaredStem || !useStem)) {
      blockReason = "compound-use-source-two-analyzed-stems-required";
    } else if (!blockReason && (declaredStem !== embedStem || !compoundEmbedUseSourceAllowed
      || rawCompoundSourceFrame && useStem !== rawCompoundSourceFrame.embedStem)) {
      blockReason = "compound-use-source-selected-context-or-known-source-conflict";
    } else if (!blockReason) {
      compoundEmbedUseSourceFrame = deepFreeze({
        kind: "classical-nahuatl-compound-use-source-frame", version: VERSION,
        authorizationStatus: "authorized", sourceStem: declaredStem, compoundUseStem: useStem,
        useKind: "general-use", nounClass: "", subclass: "", classClaimed: false,
        noFakeNnc: true, lexicalCompoundOnlyClaimed: false,
        canonicalMatrixResult: capturedMatrixNncResult,
        canonicalRawCompoundSourceFrame: rawCompoundSourceFrame,
        canonicalMatrixSourceClassFrame: matrixSourceClassFrame,
        canonicalMatrixSourceFrame: capturedMatrixNncResult?.sourceFrame || rawCompoundSourceFrame,
        canonicalMatrixOperationFrame: capturedMatrixNncResult?.operationFrame || null,
        canonicalMatrixSlotFrame: capturedMatrixNncResult?.typedSlotFrame || capturedMatrixNncResult?.nncSlotFrame || null,
        sourceAuthority: "typed-compound-use-declaration",
        callerSuppliedAuthorityAccepted: false, formulaStringAuthority: false, surfaceStringAuthority: false,
      });
      ISSUED_COMPOUND_USE_SOURCE_FRAMES.add(compoundEmbedUseSourceFrame);
    }
  }

  const suppliedCompoundEmbedAnalysis = constructionKind === "compound-nnc"
    && source.compoundEmbedAnalysis
    && typeof source.compoundEmbedAnalysis === "object"
    && !Array.isArray(source.compoundEmbedAnalysis)
    ? source.compoundEmbedAnalysis
    : null;
  const compoundEmbedAnalysisAllowedKeys = new Set([
    "lexicalStatus",
    "sourceStem",
    "exceptionKind",
    "variantStem",
    "meaningCertainty",
    "historicalSource",
    "sourceBoundaries",
  ]);
  const compoundEmbedAnalysisForbiddenKey = suppliedCompoundEmbedAnalysis
    ? Reflect.ownKeys(suppliedCompoundEmbedAnalysis).find(
      key => typeof key !== "string"
        || !compoundEmbedAnalysisAllowedKeys.has(key)
    )
    : "";
  const compoundEmbedExceptionKind = normalizeKey(
    suppliedCompoundEmbedAnalysis?.exceptionKind
  );
  const compoundEmbedVariantStem = normalizeStem(
    suppliedCompoundEmbedAnalysis?.variantStem
  );
  const compoundEmbedMeaningCertainty = normalizeKey(
    suppliedCompoundEmbedAnalysis?.meaningCertainty || "known"
  );
  const compoundEmbedSourceBoundaries = Array.isArray(
    suppliedCompoundEmbedAnalysis?.sourceBoundaries
  )
    ? suppliedCompoundEmbedAnalysis.sourceBoundaries.map(normalizeStem)
    : [];
  if (
    !blockReason
    && suppliedCompoundEmbedAnalysis
    && (
      compoundEmbedAnalysisForbiddenKey
      || normalizeKey(suppliedCompoundEmbedAnalysis.lexicalStatus)
        !== "compound-embed-exception"
      || normalizeStem(suppliedCompoundEmbedAnalysis.sourceStem) !== embedStem
      || ![
        "marked-final-a-loss",
        "glottalized-long-vowel",
        "unexpected-variant",
      ].includes(compoundEmbedExceptionKind)
      || (compoundEmbedExceptionKind === "unexpected-variant"
        ? !compoundEmbedVariantStem
        : Boolean(compoundEmbedVariantStem))
      || !["known", "uncertain"].includes(compoundEmbedMeaningCertainty)
      || compoundEmbedSourceBoundaries.some(boundary => !boundary)
    )
  ) {
    blockReason = "typed-compound-embed-analysis-mismatch";
  }
  const compoundEmbedAnalysisFrame = suppliedCompoundEmbedAnalysis
    ? deepFreeze({
      kind: "classical-nahuatl-compound-embed-lexical-analysis-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      lexicalStatus: "compound-embed-exception",
      sourceStem: embedStem,
      exceptionKind: compoundEmbedExceptionKind,
      variantStem: compoundEmbedVariantStem,
      meaningCertainty: compoundEmbedMeaningCertainty,
      historicalSource: normalizeStem(
        suppliedCompoundEmbedAnalysis.historicalSource
      ),
      sourceBoundaries: Object.freeze([...compoundEmbedSourceBoundaries]),
      productiveRouteAuthority: false,
      documentaryExampleAuthority: false,
    })
    : null;

  const hasUniqueAnalysis = Object.hasOwn(source, "uniqueCompoundNounstemAnalysis");
  const hasUniqueAnalyses = Object.hasOwn(source, "uniqueCompoundNounstemAnalyses");
  const suppliedUniqueCompoundAnalyses = constructionKind === "compound-nnc"
    ? hasUniqueAnalyses
      ? source.uniqueCompoundNounstemAnalyses
      : hasUniqueAnalysis
        ? [source.uniqueCompoundNounstemAnalysis]
        : []
    : [];
  const uniqueCompoundAnalysisAllowedKeys = new Set([
    "lexicalStatus", "position", "sourceStem", "meaningCertainty",
    "historicalSource", "sourceBoundaries", "relatedFormations",
  ]);
  const uniqueCompoundNounstemAnalysisFrames = [];
  const uniqueCompoundPositions = new Set();
  if (!blockReason && constructionKind === "compound-nnc" && (
    (hasUniqueAnalysis && hasUniqueAnalyses)
    || !Array.isArray(suppliedUniqueCompoundAnalyses)
    || ((hasUniqueAnalysis || hasUniqueAnalyses)
      && (suppliedUniqueCompoundAnalyses.length < 1
        || suppliedUniqueCompoundAnalyses.length > 2))
  )) {
    blockReason = "typed-unique-compound-nounstem-analysis-mismatch";
  }
  for (const analysis of Array.isArray(suppliedUniqueCompoundAnalyses)
    ? suppliedUniqueCompoundAnalyses.slice(0, 2) : []) {
    const validObject = analysis && typeof analysis === "object"
      && !Array.isArray(analysis);
    const position = normalizeKey(analysis?.position);
    const sourceStem = normalizeStem(analysis?.sourceStem);
    const meaningCertainty = normalizeKey(analysis?.meaningCertainty);
    const boundaries = Array.isArray(analysis?.sourceBoundaries)
      ? analysis.sourceBoundaries.map(normalizeStem) : [];
    const related = Array.isArray(analysis?.relatedFormations)
      ? analysis.relatedFormations.map(normalizeStem) : [];
    const positionStem = position === "embed" ? embedStem
      : position === "matrix" ? matrixStem : "";
    if (!blockReason && (
      !validObject
      || Reflect.ownKeys(analysis).some(key => typeof key !== "string"
        || !uniqueCompoundAnalysisAllowedKeys.has(key))
      || normalizeKey(analysis.lexicalStatus) !== "unique-compound-only-nounstem"
      || !positionStem || sourceStem !== positionStem
      || uniqueCompoundPositions.has(position)
      || !["known", "uncertain"].includes(meaningCertainty)
      || boundaries.length === 0 || boundaries.some(boundary => !boundary)
      || related.some(formation => !formation)
    )) {
      blockReason = "typed-unique-compound-nounstem-analysis-mismatch";
    }
    uniqueCompoundPositions.add(position);
    uniqueCompoundNounstemAnalysisFrames.push(deepFreeze({
      kind: "classical-nahuatl-unique-compound-nounstem-analysis-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      lexicalStatus: "unique-compound-only-nounstem",
      position, sourceStem, meaningCertainty,
      historicalSource: normalizeStem(analysis?.historicalSource),
      sourceBoundaries: Object.freeze([...boundaries]),
      relatedFormations: Object.freeze([...related]),
      productiveRouteAuthority: false,
      documentaryExampleAuthority: false,
    }));
  }
  Object.freeze(uniqueCompoundNounstemAnalysisFrames);
  const uniqueCompoundNounstemAnalysisFrame = uniqueCompoundNounstemAnalysisFrames.length === 1
    ? uniqueCompoundNounstemAnalysisFrames[0] : null;

  const compoundStructure = normalizeKey(
    request.structure || source.structure || "integrated"
  );
  const caMatrixResultAnalysis = matrixStem === "ca"
    ? matrixSourceClassFrame?.sourceClass === "tl"
      ? getCompoundEmbedSourceClassAnalysis("tl-1-a")
      : matrixSourceClassFrame
    : null;
  if (
    !blockReason
    && constructionKind === "compound-nnc"
    && matrixStem === "ca"
    && (
      caMatrixResultAnalysis?.nounClass !== "tl"
      || !["tl-1-a", "tl-2-c"].includes(
        caMatrixResultAnalysis?.sourceClass
      )
    )
  ) {
    blockReason = "ca-matrix-requires-typed-tl-1-a-or-tl-2-c-result-class";
  }
  const caMatrixFrame = constructionKind === "compound-nnc"
    && matrixStem === "ca"
    && caMatrixResultAnalysis
    ? deepFreeze({
      kind: "classical-nahuatl-ca-compound-matrix-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      lexicalStatus: "compound-only-matrix-nounstem",
      sourceStem: "ca",
      semanticContribution:
        "associated-characterized-or-made-of-entity",
      resultSourceClass: caMatrixResultAnalysis.sourceClass,
      resultNounClass: caMatrixResultAnalysis.nounClass,
      embedMeaningAuthority: "typed-lexical-analysis",
      laterUses: Object.freeze([
        "associated-entity",
        "gentilic-name",
        "profession",
      ]),
      productiveRouteAuthority: false,
      documentaryExampleAuthority: false,
    })
    : null;
  const ordinaryFinalCaFrame = constructionKind === "compound-nnc"
    && matrixStem !== "ca"
    && /ca$/u.test(matrixStem)
    && matrixSourceClassFrame?.subclass === "tl-2-b"
    && matrixSourceClassFrame?.ephemeralFinalVowel === "a"
    ? deepFreeze({
      kind: "classical-nahuatl-ordinary-final-ca-contrast-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      sourceStem: matrixStem,
      sourceClass: matrixSourceClassFrame.sourceClass,
      analysis: "ordinary-tl-2-b-final-ca-nounstem",
      caMatrixAnalysis: false,
      spellingAuthority: false,
      productiveRouteAuthority: false,
    })
    : null;

  const suppliedYoEmbedAnalysis = constructionKind === "compound-nnc"
    && source.yoEmbedAnalysis
    && typeof source.yoEmbedAnalysis === "object"
    && !Array.isArray(source.yoEmbedAnalysis)
    ? source.yoEmbedAnalysis
    : null;
  const yoEmbedAnalysisAllowedKeys = new Set([
    "lexicalStatus",
    "sourceStem",
    "embedState",
    "possessorKind",
    "meaningRelation",
    "initialIAnalysis",
  ]);
  const yoEmbedAnalysisForbiddenKey = suppliedYoEmbedAnalysis
    ? Reflect.ownKeys(suppliedYoEmbedAnalysis).find(
      key => typeof key !== "string" || !yoEmbedAnalysisAllowedKeys.has(key)
    )
    : "";
  const suppliedYoEmbedState = normalizeKey(
    suppliedYoEmbedAnalysis?.embedState
  );
  const capturedYoInitialISourceFrame = capturedEmbedResult?.sourceFrame
    && typeof capturedEmbedResult.sourceFrame.supportiveInitialI === "boolean"
    ? capturedEmbedResult.sourceFrame : null;
  const capturedYoInitialIAnalysis = capturedYoInitialISourceFrame
    ? capturedYoInitialISourceFrame.supportiveInitialI ? "supportive" : "real" : "";
  const yoInitialIAnalysis = normalizeKey(suppliedYoEmbedAnalysis?.initialIAnalysis
    || capturedYoInitialIAnalysis || "real");
  const suppliedYoPossessorKind = normalizeKey(
    suppliedYoEmbedAnalysis?.possessorKind
  );
  const capturedYoEmbedState = capturedEmbedResult
    ? capturedEmbedState === "possessive"
      && capturedEmbedPossessor === "nonspecific-nonhuman"
      ? "possessive"
      : capturedEmbedState === "absolutive"
        ? "absolutive"
        : ""
    : "";
  if (
    !blockReason
    && suppliedYoEmbedAnalysis
    && (
      yoEmbedAnalysisForbiddenKey
      || !["real", "supportive"].includes(yoInitialIAnalysis)
      || (yoInitialIAnalysis === "supportive" && !/^i/u.test(embedStem))
      || (capturedYoInitialIAnalysis && yoInitialIAnalysis !== capturedYoInitialIAnalysis)
      || !["yō", "yo"].includes(matrixStem)
      || normalizeKey(suppliedYoEmbedAnalysis.lexicalStatus)
        !== "yo-matrix-embed-history"
      || normalizeStem(suppliedYoEmbedAnalysis.sourceStem) !== embedStem
      || !["absolutive", "possessive"].includes(suppliedYoEmbedState)
      || (suppliedYoEmbedState === "possessive"
        ? suppliedYoPossessorKind !== "nonspecific-nonhuman"
        : suppliedYoPossessorKind !== "none")
      || (capturedYoEmbedState
        && suppliedYoEmbedState !== capturedYoEmbedState)
    )
  ) {
    blockReason = "typed-yo-embed-history-mismatch";
  }
  if (
    !blockReason
    && constructionKind === "compound-nnc"
    && ["yō", "yo"].includes(matrixStem)
    && matrixSourceClassFrame?.sourceClass !== "tl-1-b"
  ) {
    blockReason = "yo-matrix-requires-typed-tl-1-b-source-class";
  }
  const yoMatrixFrame = constructionKind === "compound-nnc"
    && ["yō", "yo"].includes(matrixStem)
    && matrixSourceClassFrame?.sourceClass === "tl-1-b"
    ? deepFreeze({
      kind: "classical-nahuatl-yo-compound-matrix-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      lexicalStatus: "compound-only-matrix-nounstem",
      sourceStem: "yō",
      sourceClass: "tl-1-b",
      semanticContribution:
        "abundant-ownership-or-characteristic-quality",
      laterUses: Object.freeze([
        "pertinency-§47.5",
        "gentilic-collectivity-§48.12",
        "characteristic-properties-§39.3",
      ]),
      productiveRouteAuthority: false,
      documentaryExampleAuthority: false,
    })
    : null;
  const selectedYoEmbedState = ["yō", "yo"].includes(matrixStem)
    ? suppliedYoEmbedState || capturedYoEmbedState || "absolutive"
    : "";
  const yoEmbedHistoryFrame = constructionKind === "compound-nnc"
    && ["yō", "yo"].includes(matrixStem)
    && selectedYoEmbedState
    ? deepFreeze({
      kind: "classical-nahuatl-yo-matrix-embed-history-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      lexicalStatus: "yo-matrix-embed-history",
      sourceStem: embedStem,
      embedState: selectedYoEmbedState,
      initialIAnalysis: yoInitialIAnalysis,
      initialIAnalysisAuthority: capturedYoInitialISourceFrame ? "owner-issued-nnc-source" : "typed-source-analysis",
      initialISourceFrame: capturedYoInitialISourceFrame,
      possessorKind: selectedYoEmbedState === "possessive"
        ? "nonspecific-nonhuman"
        : "none",
      possessorMorpheme: selectedYoEmbedState === "possessive"
        ? "tla"
        : "",
      meaningRelation: normalizeKey(
        suppliedYoEmbedAnalysis?.meaningRelation || "related-but-distinct"
      ),
      availableHistories: Object.freeze(capturedYoEmbedState
        ? [capturedYoEmbedState]
        : ["absolutive", "possessive"]),
      historyChoiceRequired: !capturedYoEmbedState,
      historyAuthority: capturedYoEmbedState
        ? "owner-issued-nnc-result"
        : suppliedYoEmbedAnalysis
          ? "typed-source-analysis"
          : "default-absolutive-source-analysis",
      translationAuthority: false,
      documentaryExampleAuthority: false,
    })
    : null;

  const sexSourceFacts = getClassicalNahuatlCompoundSexSourceFacts({...source, embedStem});
  const suppliedSexEmbedAnalysis = source.sexEmbedAnalysis
    && typeof source.sexEmbedAnalysis === "object"
    && !Array.isArray(source.sexEmbedAnalysis)
    ? source.sexEmbedAnalysis
    : null;
  const sexEmbedAllowedKeys = new Set([
    "lexicalStatus",
    "sourceStem",
    "sexValue",
    "referentClass",
    "neutralWithoutSex",
  ]);
  const sexEmbedForbiddenKey = suppliedSexEmbedAnalysis
    ? Reflect.ownKeys(suppliedSexEmbedAnalysis).find(
      key => typeof key !== "string" || !sexEmbedAllowedKeys.has(key)
    )
    : "";
  if (
    !blockReason
    && suppliedSexEmbedAnalysis
    && (
      sexEmbedForbiddenKey
      || normalizeKey(suppliedSexEmbedAnalysis.lexicalStatus)
        !== "sex-distinction-embed"
      || normalizeStem(suppliedSexEmbedAnalysis.sourceStem) !== embedStem
      || !["male", "female"].includes(
        normalizeKey(suppliedSexEmbedAnalysis.sexValue)
      )
      || normalizeKey(suppliedSexEmbedAnalysis.referentClass) !== "animate"
      || suppliedSexEmbedAnalysis.neutralWithoutSex !== true
      || sexSourceFacts.authorizationStatus === "blocked"
    )
  ) {
    blockReason = "typed-sex-distinction-embed-analysis-mismatch";
  }
  const selectedSexEmbedAnalysis = suppliedSexEmbedAnalysis
    || (normalizeKey(request.embedRole) === "sex" ? sexSourceFacts.sexEmbedAnalysis : null);
  const sexDistinctionFrame = constructionKind === "compound-nnc"
    && selectedSexEmbedAnalysis
    ? deepFreeze({
      kind: "classical-nahuatl-sex-distinction-compound-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      lexicalStatus: "sex-distinction-embed",
      sourceStem: embedStem,
      sexValue: normalizeKey(selectedSexEmbedAnalysis.sexValue),
      referentClass: "animate",
      matrixReferentId: "compound-matrix-referent",
      neutralWithoutSex: true,
      formConsequence: "ordinary-compound-shape",
      productiveRouteAuthority: false,
      documentaryExampleAuthority: false,
    })
    : null;

  const firstConjunctVestige = compoundStructure === "conjunctive"
    ? embedSourceClassFrame?.nounClass === "tl"
      ? "l"
      : embedSourceClassFrame?.nounClass === "tli"
        ? "tl"
        : ""
    : "";
  if (
    !blockReason
    && constructionKind === "compound-nnc"
    && compoundStructure === "conjunctive"
    && !firstConjunctVestige
  ) {
    blockReason = "conjunctive-compound-requires-tl-or-tli-first-source";
  }
  const conjunctiveStructureFrame = constructionKind === "compound-nnc"
    && compoundStructure === "conjunctive"
    && firstConjunctVestige
    ? deepFreeze({
      kind: "classical-nahuatl-conjunctive-compound-source-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      constituentRelation: "conjunction",
      constituentRoles: Object.freeze([
        "first-conjunct",
        "second-conjunct",
      ]),
      firstConjunctSourceClass: embedSourceClassFrame.sourceClass,
      firstConjunctNum1Class: embedSourceClassFrame.nounClass,
      firstConjunctVestige,
      secondConjunctSourceClass: matrixSourceClassFrame?.sourceClass || "",
      governmentRelation: false,
      vestigeChoiceRequired: false,
      documentaryExampleAuthority: false,
    })
    : null;

  // The lexical whole supplies custody, not a downstream formation license.
  // Its two signed Sources must independently satisfy this owner's ordinary
  // conjunctive analysis, including their actual classes and num1 vestige.
  const suppliedLexicalConjunction = source.canonicalLexicalConjunctionResult;
  let capturedLexicalConjunctionResult = null;
  let lexicalConjunctionHandoffFrame = null;
  if (Object.hasOwn(source, "canonicalLexicalConjunctionResult")) {
    const wholeValid = target.isClassicalNahuatlClauseConjunctionResultFrame?.(suppliedLexicalConjunction) === true
      && suppliedLexicalConjunction.authorizationStatus === "authorized"
      && suppliedLexicalConjunction.operationKind === "lexical-conjunction"
      && suppliedLexicalConjunction.relationFrame?.stateRealization === "compound-handoff"
      && suppliedLexicalConjunction.relationFrame?.sameSubjectReferent === true
      && suppliedLexicalConjunction.conjuncts?.length === 2;
    const envelopes = wholeValid ? suppliedLexicalConjunction.conjuncts.map(node => node.envelope) : [];
    const exactMembers = [capturedEmbedResult, capturedMatrixNncResult];
    const exactConstituents = wholeValid && conjunctiveStructureFrame
      && constructionKind === "compound-nnc" && compoundStructure === "conjunctive"
      && exactMembers.every(Boolean)
      && envelopes.every((envelope, index) =>
        target.isClassicalNahuatlSupplementationClauseEnvelope?.(envelope) === true
        && envelope.unitKind === "nnc"
        && target.getClassicalNahuatlSupplementationClauseSourceFrame?.(envelope) === exactMembers[index]);
    if (!blockReason && !exactConstituents) {
      blockReason = "lexical-conjunction-compound-exact-members-and-conjunctive-source-required";
    }
    if (!blockReason && exactConstituents) {
      capturedLexicalConjunctionResult = suppliedLexicalConjunction;
      lexicalConjunctionHandoffFrame = deepFreeze({
        kind: "classical-nahuatl-lexical-conjunction-compound-handoff-frame",
        version: VERSION,
        authorizationStatus: "authorized",
        canonicalLexicalConjunctionResult: capturedLexicalConjunctionResult,
        constituentResults: exactMembers,
        memberEnvelopes: envelopes,
        conjunctiveStructureFrame,
        independentConjunctiveSourceValidated: true,
        wholeFlagAuthorizesFormation: false,
        callerSuppliedAuthorityAccepted: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }
  }

  const suppliedUniqueAnalysis = source.uniqueEmbedAnalysis
    && typeof source.uniqueEmbedAnalysis === "object"
    && !Array.isArray(source.uniqueEmbedAnalysis)
    ? source.uniqueEmbedAnalysis
    : null;
  const knownUniqueFamily = NOMINAL_EMBED_UNIQUE_FAMILIES.get(embedStem) || "";
  const uniqueAnalysisAllowedKeys = new Set([
    "lexicalStatus",
    "sourceStem",
    "initialIAnalysis",
    "meaningCertainty",
    "historicalSource",
  ]);
  const uniqueAnalysisForbiddenKey = suppliedUniqueAnalysis
    ? Reflect.ownKeys(suppliedUniqueAnalysis).find(
      key => typeof key !== "string" || !uniqueAnalysisAllowedKeys.has(key)
    )
    : "";
  const suppliedUniqueStem = normalizeStem(suppliedUniqueAnalysis?.sourceStem);
  const suppliedUniqueStatus = normalizeKey(
    suppliedUniqueAnalysis?.lexicalStatus
  );
  const suppliedInitialIAnalysis = normalizeKey(
    suppliedUniqueAnalysis?.initialIAnalysis
  );
  const suppliedMeaningCertainty = normalizeKey(
    suppliedUniqueAnalysis?.meaningCertainty
  );
  if (
    !blockReason
    && suppliedUniqueAnalysis
    && (
      uniqueAnalysisForbiddenKey
      || suppliedUniqueStem !== embedStem
      || suppliedUniqueStatus !== "unique-incorporated-nounstem"
      || !["real", "supportive", "variable", "not-applicable"].includes(
        suppliedInitialIAnalysis
      )
      || !["known", "uncertain"].includes(suppliedMeaningCertainty)
    )
  ) {
    blockReason = "typed-unique-embed-analysis-mismatch";
  }
  const embedLexicalFamily = suppliedUniqueAnalysis
    ? embedStem === "ih"
      ? "ih"
      : "unique"
    : knownUniqueFamily;
  const uniqueEmbedAnalysisFrame = (suppliedUniqueAnalysis || knownUniqueFamily)
    ? deepFreeze({
      kind: "classical-nahuatl-unique-embed-analysis-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      lexicalStatus: "unique-incorporated-nounstem",
      sourceStem: embedStem,
      lexicalFamily: embedLexicalFamily,
      initialIAnalysis: suppliedUniqueAnalysis
        ? suppliedInitialIAnalysis
        : embedStem === "ih"
          ? "variable"
          : "not-applicable",
      meaningCertainty: suppliedUniqueAnalysis
        ? suppliedMeaningCertainty
        : "uncertain",
      historicalSource: normalizeStem(
        suppliedUniqueAnalysis?.historicalSource
      ),
      userSuppliedLexicalAnalysis: Boolean(suppliedUniqueAnalysis),
      productiveRouteAuthority: false,
      documentaryExampleAuthority: false,
    })
    : null;

  let embedLexicalRule = "";
  if (constructionKind === "nominal-embed-vnc") {
    const ordinaryLexicalSource = capturedExactOrdinaryNncPredicateFrame
      ?.sourceStemOperation
      ? capturedExactOrdinaryNncPredicateFrame.canonicalResultFrame.sourceFrame
      : null;
    if (["ā", "a"].includes(embedStem) && ["ī", "i"].includes(matrixStem)) {
      embedLexicalRule = "atli-retains-num1";
    } else if (
      ["cuica", "cuīca"].includes(embedStem)
      && ["ē-hu-a", "ē-hua"].includes(matrixStem)
    ) {
      embedLexicalRule = "cuica-to-cuic";
    } else if (
      (embedStem === "ā" && matrixStem === "quetza")
      || (embedStem === "mā" && matrixStem === "tlac")
    ) {
      embedLexicalRule = "glottalized-long-vowel";
    } else if (ordinaryLexicalSource?.stem === "īx" && matrixStem === "mati") {
      // This is the documented lexical added morph, not a hypothetical īxi noun.
      embedLexicalRule = "face-before-mati-added-i";
    } else if (ordinaryLexicalSource?.stem === "yaca" && matrixStem === "āna") {
      embedLexicalRule = "nose-before-ana-vowel-fusion";
    }
  } else if (constructionKind === "compound-nnc") {
    if (compoundEmbedAnalysisFrame) {
      embedLexicalRule = compoundEmbedAnalysisFrame.exceptionKind;
    } else if (negativeParticleSourceFrame || embedStem === "ah") {
      embedLexicalRule = "negative-ah";
    }
  }

  const specialMatrix = constructionKind === "compound-nnc"
    ? ({
      ca: "ca",
      yō: "yō",
      yo: "yō",
      poh: "poh",
      conē: "conē",
      cone: "conē",
      "pil-tōn": "pil-tōn",
      "pil-ton": "pil-tōn",
    })[matrixStem] || ""
    : "";
  const suppliedAffinityScopeAnalysis = source.affinityScopeAnalysis
    && typeof source.affinityScopeAnalysis === "object"
    && !Array.isArray(source.affinityScopeAnalysis)
    ? source.affinityScopeAnalysis
    : constructionKind === "compound-nnc" ? getDocumentedCompoundAffinityAnalysis(source) : null;
  const affinityScopeAllowedKeys = new Set([
    "lexicalStatus",
    "embedStem",
    "matrixStem",
    "availableTargets",
    "lexicalRequirement",
  ]);
  const affinityScopeForbiddenKey = suppliedAffinityScopeAnalysis
    ? Reflect.ownKeys(suppliedAffinityScopeAnalysis).find(
      key => typeof key !== "string" || !affinityScopeAllowedKeys.has(key)
    )
    : "";
  const affinityTargets = suppliedAffinityScopeAnalysis
    ? [...new Set((Array.isArray(
      suppliedAffinityScopeAnalysis.availableTargets
    ) ? suppliedAffinityScopeAnalysis.availableTargets : []).map(
      normalizeKey
    ))]
    : [];
  if (
    !blockReason
    && suppliedAffinityScopeAnalysis
    && (
      affinityScopeForbiddenKey
      || normalizeKey(suppliedAffinityScopeAnalysis.lexicalStatus)
        !== "compound-affinity-scope"
      || normalizeStem(suppliedAffinityScopeAnalysis.embedStem) !== embedStem
      || normalizeStem(suppliedAffinityScopeAnalysis.matrixStem) !== matrixStem
      || !affinityTargets.length
      || affinityTargets.some(target => (
        !["embed", "matrix", "both"].includes(target)
      ))
      || !["optional", "obligatory"].includes(normalizeKey(
        suppliedAffinityScopeAnalysis.lexicalRequirement
      ))
    )
  ) {
    blockReason = "typed-compound-affinity-scope-analysis-mismatch";
  }
  const affinityScopeAnalysisFrame = suppliedAffinityScopeAnalysis
    ? deepFreeze({
      kind: "classical-nahuatl-compound-affinity-scope-analysis-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      lexicalStatus: "compound-affinity-scope",
      embedStem,
      matrixStem,
      availableTargets: Object.freeze(affinityTargets),
      lexicalRequirement: normalizeKey(
        suppliedAffinityScopeAnalysis.lexicalRequirement
      ),
      targetChoiceRequired: affinityTargets.length > 1,
      analysisSource: source.affinityScopeAnalysis ? "typed-source-analysis" : "documented-exact-source",
      vowelQuantityPreserved: true,
      productiveRouteAuthority: false,
      documentaryExampleAuthority: false,
    })
    : null;

  const suppliedDistributiveAnalysis = source.distributiveVarietalAnalysis
    && typeof source.distributiveVarietalAnalysis === "object"
    && !Array.isArray(source.distributiveVarietalAnalysis)
    ? source.distributiveVarietalAnalysis
    : null;
  const distributiveAllowedKeys = new Set([
    "lexicalStatus",
    "semanticReading",
    "contextDecides",
  ]);
  const distributiveForbiddenKey = suppliedDistributiveAnalysis
    ? Reflect.ownKeys(suppliedDistributiveAnalysis).find(
      key => typeof key !== "string" || !distributiveAllowedKeys.has(key)
    )
    : "";
  const distributiveReading = normalizeKey(
    suppliedDistributiveAnalysis?.semanticReading || "ambiguous"
  );
  const distributiveContextDecides = suppliedDistributiveAnalysis
    ?.contextDecides === true;
  if (
    !blockReason
    && suppliedDistributiveAnalysis
    && (
      distributiveForbiddenKey
      || normalizeKey(suppliedDistributiveAnalysis.lexicalStatus)
        !== "compound-distributive-varietal-reading"
      || !["distribution", "variety", "ambiguous"].includes(
        distributiveReading
      )
      || (distributiveContextDecides
        && distributiveReading === "ambiguous")
    )
  ) {
    blockReason = "typed-distributive-varietal-reading-analysis-mismatch";
  }
  const distributiveVarietalAnalysisFrame = deepFreeze({
    kind: "classical-nahuatl-distributive-varietal-analysis-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    lexicalStatus: "compound-distributive-varietal-reading",
    semanticReading: distributiveReading,
    contextDecides: distributiveContextDecides,
    meaningChoiceRequired: !distributiveContextDecides
      && distributiveReading === "ambiguous",
    reduplicationTarget: "embed",
    targetChoiceRequired: false,
    sourceBoundaryPreserved: true,
    vowelAndGlottalEvidencePreserved: true,
    productiveRouteAuthority: false,
    documentaryExampleAuthority: false,
  });

  const progenyMatrixFrame = ["conē", "pil-tōn"].includes(specialMatrix)
    ? deepFreeze({
      kind: "classical-nahuatl-progeny-matrix-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      matrixStem: specialMatrix,
      semanticContribution: specialMatrix === "conē"
        ? "child-or-offspring"
        : "child-or-offspring-animal-synonym",
      humanParentNuance: specialMatrix === "conē"
        ? "woman-specific-in-lesson-31-human-reading"
        : "not-licensed-as-the-lesson-31-human-parent-reading",
      compatibleEmbedAdmission: "open-typed-nnc-source",
      productiveRouteAuthority: false,
      documentaryExampleAuthority: false,
    })
    : null;
  const fellowshipMatrixFrame = specialMatrix === "poh"
    ? deepFreeze({
      kind: "classical-nahuatl-fellowship-matrix-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      matrixStem: "poh",
      semanticContribution: Object.freeze([
        "companion", "match", "equal", "peer",
      ]),
      requiredState: "possessive",
      compatibleEmbedAdmission: "open-typed-nnc-source",
      productiveRouteAuthority: false,
      documentaryExampleAuthority: false,
    })
    : null;
  const capturedInitialI = capturedEmbedResult?.sourceFrame?.supportiveInitialI;
  const modifierInitialI = capturedAdjectivalModificationFrame?.modifierPart?.sourceInitialISelection;
  // Earlier subject/state carriers can precede the original modifier initial i.
  // The signed parent retains that analysis; only a word-initial i participates
  // at this new boundary.
  const fixedInitialI = ["real", "supportive"].includes(modifierInitialI)
    ? /^[iī]/u.test(embedStem) ? modifierInitialI : "real" : "";
  const sourceInitialIAnalysis = ["real", "supportive"].includes(fixedInitialI) ? fixedInitialI
    : typeof capturedInitialI === "boolean" ? capturedInitialI ? "supportive" : "real"
      : normalizeKey(source.initialIAnalysis || "real");
  if (fixedInitialI && source.initialIAnalysis
    && normalizeKey(source.initialIAnalysis) !== fixedInitialI) {
    blockReason = "nominal-source-initial-i-analysis-mismatch";
  }
  if (!["real", "supportive"].includes(sourceInitialIAnalysis)
    || sourceInitialIAnalysis === "supportive" && !/^i/u.test(embedStem)) {
    blockReason = "nominal-source-initial-i-analysis-mismatch";
  }
  const capturedMatrixInitialI = capturedMatrixNncResult?.sourceFrame?.supportiveInitialI;
  const matrixInitialIAnalysis = typeof capturedMatrixInitialI === "boolean"
    ? capturedMatrixInitialI ? "supportive" : "real"
    : normalizeKey(source.matrixInitialIAnalysis || "real");
  if (constructionKind === "compound-nnc" && (
    !["real", "supportive"].includes(matrixInitialIAnalysis)
    || matrixInitialIAnalysis === "supportive" && !/^i/u.test(matrixStem)
    || typeof capturedMatrixInitialI === "boolean" && source.matrixInitialIAnalysis
      && normalizeKey(source.matrixInitialIAnalysis) !== matrixInitialIAnalysis
  )) blockReason = "compound-matrix-initial-i-analysis-mismatch";
  const suppliedAffectiveLexicalAnalysis = source.affectiveLexicalAnalysis
    && typeof source.affectiveLexicalAnalysis === "object"
    && !Array.isArray(source.affectiveLexicalAnalysis)
    ? source.affectiveLexicalAnalysis
    : null;
  const affectiveLexicalAllowedKeys = new Set([
    "lexicalStatus",
    "embedStem",
    "matrixStem",
    "lexicalizedSpecialMeaning",
    "classException",
    "resultClass",
    "embedVariantStem",
    "variantKind",
    "irregularSilentNum1",
  ]);
  const affectiveLexicalForbiddenKey = suppliedAffectiveLexicalAnalysis
    ? Reflect.ownKeys(suppliedAffectiveLexicalAnalysis).find(
      key => typeof key !== "string" || !affectiveLexicalAllowedKeys.has(key)
    )
    : "";
  const affectiveMatrixKey = normalizeKey(
    request.affectiveMatrix || source.affectiveMatrix
  );
  const affectiveLexicalized = suppliedAffectiveLexicalAnalysis
    ?.lexicalizedSpecialMeaning === true;
  const affectiveClassException = suppliedAffectiveLexicalAnalysis
    ?.classException === true;
  const affectiveIrregularSilentNum1 = suppliedAffectiveLexicalAnalysis
    ?.irregularSilentNum1 === true;
  const affectiveExceptionalResultClass = normalizeNounClass(
    suppliedAffectiveLexicalAnalysis?.resultClass
  );
  const affectiveVariantStem = normalizeStem(
    suppliedAffectiveLexicalAnalysis?.embedVariantStem
  );
  if (
    !blockReason
    && suppliedAffectiveLexicalAnalysis
    && (
      affectiveLexicalForbiddenKey
      || normalizeKey(suppliedAffectiveLexicalAnalysis.lexicalStatus)
        !== "affective-compound-lexical-analysis"
      || normalizeStem(suppliedAffectiveLexicalAnalysis.embedStem)
        !== embedStem
      || normalizeKey(suppliedAffectiveLexicalAnalysis.matrixStem)
        !== affectiveMatrixKey
      || (!affectiveLexicalized
        && !affectiveClassException
        && !affectiveVariantStem
        && !affectiveIrregularSilentNum1)
      || (affectiveIrregularSilentNum1
        && (affectiveLexicalized || affectiveClassException
          || affectiveVariantStem || normalizeNounClass(source.embedClass) === "zero"))
      || (affectiveLexicalized
        && (affectiveClassException
          || affectiveExceptionalResultClass !== "tli"))
      || (affectiveClassException
        && !["zero", "tli"].includes(affectiveExceptionalResultClass))
      || (affectiveVariantStem && normalizeKey(
        suppliedAffectiveLexicalAnalysis.variantKind
      ) !== "irregular-compound-embed")
    )
  ) {
    blockReason = "typed-affective-compound-lexical-analysis-mismatch";
  }
  let affectiveLexicalAnalysisFrame = suppliedAffectiveLexicalAnalysis
    ? deepFreeze({
      kind: "classical-nahuatl-affective-compound-lexical-analysis-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      lexicalStatus: "affective-compound-lexical-analysis",
      embedStem,
      matrixStem: affectiveMatrixKey,
      lexicalizedSpecialMeaning: affectiveLexicalized,
      classException: affectiveClassException,
      irregularSilentNum1: affectiveIrregularSilentNum1,
      resultClass: affectiveLexicalized || affectiveClassException
        ? affectiveExceptionalResultClass
        : "",
      embedVariantStem: affectiveVariantStem,
      variantKind: affectiveVariantStem
        ? "irregular-compound-embed"
        : "",
      sourceShapePreserved: true,
      productiveRouteAuthority: false,
      documentaryExampleAuthority: false,
    })
    : null;
  const documentedAffectiveAffinityAnalysis = constructionKind === "affective-nnc"
    ? getDocumentedAffectiveAffinityAnalysis(source, affectiveMatrixKey) : null;
  const suppliedAffectiveAffinityAnalysis = source.affectiveAffinityAnalysis
    && typeof source.affectiveAffinityAnalysis === "object"
    && !Array.isArray(source.affectiveAffinityAnalysis)
    ? source.affectiveAffinityAnalysis
    : documentedAffectiveAffinityAnalysis;
  const affectiveAffinityAllowedKeys = new Set([
    "lexicalStatus",
    "embedStem",
    "matrixStem",
    "embedAffinityRequirement",
    "embedAffinityTarget",
  ]);
  const affectiveAffinityForbiddenKey = suppliedAffectiveAffinityAnalysis
    ? Reflect.ownKeys(suppliedAffectiveAffinityAnalysis).find(
      key => typeof key !== "string" || !affectiveAffinityAllowedKeys.has(key)
    )
    : "";
  const embedAffinityRequirement = normalizeKey(
    suppliedAffectiveAffinityAnalysis?.embedAffinityRequirement || "none"
  );
  const embedAffinityTarget = normalizeKey(
    suppliedAffectiveAffinityAnalysis?.embedAffinityTarget || "initial"
  );
  if (
    !blockReason
    && suppliedAffectiveAffinityAnalysis
    && (
      affectiveAffinityForbiddenKey
      || normalizeKey(suppliedAffectiveAffinityAnalysis.lexicalStatus)
        !== "affective-affinity-scope-analysis"
      || normalizeStem(suppliedAffectiveAffinityAnalysis.embedStem)
        !== embedStem
      || normalizeKey(suppliedAffectiveAffinityAnalysis.matrixStem)
        !== affectiveMatrixKey
      || !["none", "optional", "obligatory"].includes(
        embedAffinityRequirement
      )
      || !["initial", "matrix"].includes(embedAffinityTarget)
    )
  ) {
    blockReason = "typed-affective-affinity-scope-analysis-mismatch";
  }
  const affectiveAffinityAnalysisFrame = suppliedAffectiveAffinityAnalysis
    ? deepFreeze({
      kind: "classical-nahuatl-affective-affinity-scope-analysis-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      lexicalStatus: "affective-affinity-scope-analysis",
      embedStem,
      matrixStem: affectiveMatrixKey,
      embedAffinityRequirement,
      embedAffinityTarget,
      availableTargets: Object.freeze(embedAffinityRequirement === "optional"
        ? ["matrix", "both"]
        : [embedAffinityRequirement === "obligatory" ? "both" : "matrix"]),
      targetChoiceRequired: embedAffinityRequirement === "optional",
      analysisSource: source.affectiveAffinityAnalysis ? "typed-source-analysis" : "documented-exact-source",
      // The internal matrix is pō-ch, rather than the final consonantal morph ch.
      embedAffinityMatrixBoundary: documentedAffectiveAffinityAnalysis
        ? {sourceStem: embedStem, prefixStem: "tēl", matrixStem: embedStem.slice(4)} : null,
      sourceShapePreserved: true,
      productiveRouteAuthority: false,
      documentaryExampleAuthority: false,
    })
    : null;
  const suppliedFlawedSubjectAnalysis = source.flawedSubjectAnalysis
    && typeof source.flawedSubjectAnalysis === "object"
    && !Array.isArray(source.flawedSubjectAnalysis)
    ? source.flawedSubjectAnalysis
    : null;
  const flawedSubjectAllowedKeys = new Set([
    "lexicalStatus",
    "sourceStem",
    "availability",
    "semanticDomain",
    "defectEntityAmbiguous",
    "neutralStemClass",
    "flawedStemClassStrategy",
    "lexicalReading",
    "usuallyRooster",
  ]);
  const flawedSubjectForbiddenKey = suppliedFlawedSubjectAnalysis
    ? Reflect.ownKeys(suppliedFlawedSubjectAnalysis).find(
      key => typeof key !== "string" || !flawedSubjectAllowedKeys.has(key)
    )
    : "";
  const flawedAvailability = normalizeKey(
    suppliedFlawedSubjectAnalysis?.availability || ""
  );
  const flawedSemanticDomain = normalizeKey(
    suppliedFlawedSubjectAnalysis?.semanticDomain || ""
  );
  const flawedNeutralStemClass = normalizeNounClass(
    suppliedFlawedSubjectAnalysis?.neutralStemClass
  );
  const flawedStemClassStrategy = normalizeKey(
    suppliedFlawedSubjectAnalysis?.flawedStemClassStrategy || ""
  );
  const flawedLexicalReading = normalizeKey(
    suppliedFlawedSubjectAnalysis?.lexicalReading || ""
  );
  if (
    !blockReason
    && suppliedFlawedSubjectAnalysis
    && (
      flawedSubjectForbiddenKey
      || normalizeKey(suppliedFlawedSubjectAnalysis.lexicalStatus)
        !== "flawed-subject-lexical-analysis"
      || normalizeStem(suppliedFlawedSubjectAnalysis.sourceStem)
        !== embedStem
      || !["optional", "obligatory"].includes(flawedAvailability)
      || ![
        "abnormal-or-defective-entity",
        "repugnant-or-disagreeable-entity",
        "lexicalized-flawed-subject",
      ].includes(flawedSemanticDomain)
      || !["tl", "tli", "in", "zero"].includes(flawedNeutralStemClass)
      || ![
        "irregular-silent-num1",
        "zero-alternative",
        "source-zero-class",
      ].includes(flawedStemClassStrategy)
      || (flawedStemClassStrategy === "source-zero-class"
        && (flawedNeutralStemClass !== "zero"
          || normalizeNounClass(source.embedClass) !== "zero"))
      || !["", "chicken", "rooster", "hen"].includes(
        flawedLexicalReading
      )
      || (flawedLexicalReading
        && flawedSemanticDomain !== "lexicalized-flawed-subject")
      || (suppliedFlawedSubjectAnalysis.usuallyRooster === true
        && !["chicken", "rooster", "hen"].includes(flawedLexicalReading))
    )
  ) {
    blockReason = "typed-flawed-subject-lexical-analysis-mismatch";
  }
  const flawedSubjectAnalysisFrame = contextualFlawedSubjectSourceFrame
    ? deepFreeze({
      kind: "classical-nahuatl-contextual-flawed-subject-analysis-frame",
      version: VERSION, authorizationStatus: "authorized",
      sourceStem: "hueli", availability: "contextual",
      semanticDomain: "contextual-negative-possibility", defectEntityAmbiguous: false,
      neutralStemClass: "tl", flawedStemClassStrategy: "irregular-silent-num1",
      contextualFlawedSubjectSourceFrame, sourceShapePreserved: true,
      positiveHueliAnalysis: "unclaimed", productiveRouteAuthority: false,
    })
    : suppliedFlawedSubjectAnalysis
    ? deepFreeze({
      kind: "classical-nahuatl-flawed-subject-lexical-analysis-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      lexicalStatus: "flawed-subject-lexical-analysis",
      sourceStem: embedStem,
      availability: flawedAvailability,
      semanticDomain: flawedSemanticDomain,
      defectEntityAmbiguous:
        suppliedFlawedSubjectAnalysis.defectEntityAmbiguous === true,
      neutralStemClass: flawedNeutralStemClass,
      flawedStemClassStrategy,
      lexicalReading: flawedLexicalReading,
      usuallyRooster:
        suppliedFlawedSubjectAnalysis.usuallyRooster === true,
      sourceShapePreserved: true,
      exactExampleIdentityAuthority: false,
      productiveRouteAuthority: false,
      documentaryExampleAuthority: false,
    })
    : null;
  const lesson35OldPersonNominalSourceFrame = (() => {
    const facts = ({
      ilama: {
        family: "old-woman",
        sourceKind: "ordinary-nounstem",
        distribution: ["simple-nnc", "nominal-embed"],
        lexicalReading: "old-woman",
        relatedSource: "ilama-ti",
      },
      ilan: {
        family: "old-woman-variant",
        sourceKind: "ordinary-nounstem",
        distribution: ["simple-nnc", "nominal-embed"],
        lexicalReading: "old-woman",
        relatedSource: "ilama-ti",
      },
      "huē-huē": {
        family: "old-man-drum-reduplicative",
        sourceKind: "ordinary-nounstem",
        distribution: ["simple-nnc", "nominal-embed", "nominal-matrix"],
        lexicalReading: "upright-drum",
        basicOldManReadingInSimpleNnc: false,
        relatedSource: "huē-huē-ti",
      },
      "huē-hueh": {
        family: "old-man-glottalized-embed",
        sourceKind: "embed-only-nounstem",
        distribution: ["nominal-embed"],
        lexicalReading: "old-man",
        relatedSource: "huē-huē",
        distinctFromPreteritAgentive: "huē-hue-h-0",
      },
      hueh: {
        family: "big-glottalized-embed",
        sourceKind: "embed-only-nounstem",
        distribution: ["nominal-embed"],
        lexicalReading: "big",
        relatedSource: "huē",
      },
      "huē-huē-n": {
        family: "old-man-n-variant",
        sourceKind: "ordinary-nounstem",
        distribution: ["affective-nnc"],
        lexicalReading: "old-man",
        affectiveMatrix: "tōn",
        affectiveReading: "disparaging",
        relatedSource: "huē-huē",
      },
    })[embedStem];
    if (!facts) return null;
    return deepFreeze({
      kind: "classical-nahuatl-lesson35-old-person-nominal-source-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      sourceStem: embedStem,
      sourceShapePreserved: true,
      internalBoundariesPreserved: true,
      vowelQuantityPreserved: true,
      ...facts,
      constructionKind,
      surfaceSimilarityDoesNotMergeSources: true,
      sourceIdentityDoesNotAuthorizeOtherRoutes: true,
      productiveRouteAuthority: false,
      documentaryExampleAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  })();
  const preteritAgentiveCompoundAnalysisFrame = agentiveEmbed
    ? buildPreteritAgentiveCompoundAnalysis(capturedEmbedResult,
      constructionKind, constructionKind === "affective-nnc"
        ? affectiveMatrixKey : matrixStem, target) : null;
  if (constructionKind === "affective-nnc" && normalizeKey(request.affectiveMatrix) === "tōn"
    && embedStem === "huē-i" && (capturedEmbedResult
      ? target.isClassicalNahuatlOrdinaryNncResult?.(capturedEmbedResult)
        && capturedEmbedResult.sourceFrame.nounClass === "zero"
      : normalizeNounClass(source.embedClass) === "zero")) {
    affectiveLexicalAnalysisFrame = deepFreeze({kind:"classical-nahuatl-affective-lexical-analysis-frame",
      authorizationStatus:"authorized", lexicalStatus:"affective-compound-lexical-analysis",
      embedStem,matrixStem:"tōn",classException:true,resultClass:"tli",
      sourceAuthority:"attested-huei-ton-class-exception",callerSuppliedAuthorityAccepted:false});
  }
  const lexicalFacts = deepFreeze({
    canonicalAdverbialEmbedResult,
    canonicalRestrictedMatrixSourceFrame,
    preteritAgentiveCompoundAnalysisFrame,
    embedLexicalRule,
    // Exact Result analysis outranks the legacy convenience inventory. In
    // particular, cihuā's long ā is not a tagged ephemeral short a (§30.1).
    embedSubclass: capturedExactOrdinaryNncPredicateFrame
      ? capturedExactOrdinaryNncPredicateFrame.compoundFinalARetained ? "2b-final-a" : ""
      : constructionKind === "nominal-embed-vnc"
        && NOMINAL_EMBED_2B_FINAL_A_STEMS.has(embedStem)
        ? "2b-final-a"
        : "",
    embedLexicalFamily: constructionKind === "nominal-embed-vnc"
      ? embedLexicalFamily
      : "",
    matrixTlaFusion: false,
    matrixIsApplicative: constructionKind === "nominal-embed-vnc"
      && matrixDerivationType === "applicative",
    matrixDerivationType,
    ordinaryNncEmbed: Boolean(
      embedConstituent
      && normalizeKey(embedConstituent.kind) === "ordinary-nnc"
    ),
    compoundNncEmbed: Boolean(
      embedConstituent
      && normalizeKey(embedConstituent.kind) === "compound-nnc"
    ),
    affectiveNncEmbed: Boolean(
      embedConstituent
      && normalizeKey(embedConstituent.kind) === "affective-nnc"
    ),
    patientiveNncEmbed: Boolean(capturedEmbedPatientiveCaptureFrame),
    adjectivalModificationEmbed: Boolean(
      capturedAdjectivalModificationFrame,
    ),
    lexicalizedAdjectivalModification,
    matrixResultCaptured: Boolean(matrixResultProjection),
    capturedMatrixVoice: matrixResultProjection?.sourceVoice || "",
    capturedMatrixInitialISelection:
      matrixResultProjection?.sourceInitialISelection || "",
    capturedMatrixInherentImpersonal,
    capturedMatrixInternalTlaImpersonal,
    capturedMatrixVncResult: matrixResultProjection
      ? source.matrixConstituent?.resultFrame : null,
    capturedMatrixObjectRequests,
    capturedMatrixSubjectContext,
    capturedEmbedState,
    capturedEmbedPossessor,
    capturedEmbedSubject,
    capturedEmbedResult,
    capturedCharacteristicNounSourceFrame,
    adjectivalSourceConstituentFrame,
    capturedCompoundNncResult,
    capturedEmbedNegativeProjection,
    sourceInitialIAnalysis,
    capturedEmbedNounClass,
    capturedEmbedSourceClass,
    capturedEmbedUseShape,
    capturedEmbedSubclass,
    capturedEmbedEphemeralFinalVowel,
    capturedEmbedTruncationRepair,
    capturedEmbedPatientiveCaptureFrame,
    capturedAdjectivalModificationFrame,
    capturedExactOrdinaryNncPredicateFrame,
    capturedBasicNumeralEmbedCitation,
    plainSourceComplementReformationAvailable: Boolean(capturedExactOrdinaryNncPredicateFrame
      && admitsPlainSourceComplementReformation(capturedEmbedResult, target)),
    capturedMatrixNncResult,
    ...(capturedLexicalConjunctionResult ? {capturedLexicalConjunctionResult,
      lexicalConjunctionHandoffFrame} : {}),
    capturedMatrixPatientiveCaptureFrame,
    capturedMatrixNounClass,
    capturedMatrixSourceClass,
    capturedMatrixUseShape,
    capturedMatrixSubclass,
    capturedMatrixEphemeralFinalVowel,
    capturedMatrixTruncationRepair,
    compoundNncMatrix: Boolean(
      capturedMatrixNncResult?.constructionKind === "compound-nnc"
      || (capturedMatrixNncResult?.constructionKind === "affective-nnc"
        && capturedMatrixNncResult.operationFrame?.affectRoute === "compound")
    ),
    embedSourceClassFrame,
    compoundEmbedUseSourceAllowed,
    compoundEmbedUseSourceFrame,
    negativeParticleSourceFrame,
    matrixSourceClassFrame,
    matrixInitialIAnalysis,
    compoundEmbedAnalysisFrame,
    uniqueCompoundNounstemAnalysisFrame,
    uniqueCompoundNounstemAnalysisFrames,
    caMatrixFrame,
    ordinaryFinalCaFrame,
    yoEmbedHistoryFrame,
    yoMatrixFrame,
    sexDistinctionFrame,
    progenyMatrixFrame,
    fellowshipMatrixFrame,
    affinityScopeAnalysisFrame,
    distributiveVarietalAnalysisFrame,
    affectiveLexicalAnalysisFrame,
    affectiveAffinityAnalysisFrame,
    flawedSubjectAnalysisFrame,
    contextualFlawedSubjectSourceFrame,
    lesson35OldPersonNominalSourceFrame,
    conjunctiveStructureFrame,
    capturedNncConstituentCount: [
      capturedEmbedResult,
      capturedMatrixNncResult,
    ].filter(Boolean).length,
    uniqueEmbedAnalysisFrame,
    embedSemanticClass: "",
    agentiveEmbed,
    sourceAnalysisAmbiguous: false,
    specialMatrix,
    ordinary2bFinalCaMatrix: Boolean(ordinaryFinalCaFrame),
    uniqueLexemeLicensed: uniqueCompoundNounstemAnalysisFrames.length > 0,
    orderAlternative: constructionKind === "compound-nnc"
      && (
        (embedStem === "mā" && matrixStem === "ōpōch")
        || (embedStem === "ōpōch" && matrixStem === "mā")
      ),
    firstConjunctVestige,
    defectStemLicensed: constructionKind === "affective-nnc"
      && Boolean(flawedSubjectAnalysisFrame),
    defectEntityAmbiguous: constructionKind === "affective-nnc"
      && flawedSubjectAnalysisFrame?.defectEntityAmbiguous === true,
    lexicalizedSpecialMeaning: Boolean(
      affectiveLexicalAnalysisFrame?.lexicalizedSpecialMeaning
    ),
  });
  const frame = deepFreeze({
    kind: "classical-nahuatl-nominal-construction-source-authorization-frame",
    version: VERSION,
    constructionKind,
    authorizationStatus: blockReason ? "blocked" : "authorized",
    blockReason,
    sourceConstituents: projectSourceConstituents(
      constructionKind,
      source
    ),
    nominalEmbedSelections: constructionKind === "nominal-embed-vnc"
      ? deepFreeze({
        relation: normalizeKey(request.relation),
        route: normalizeKey(request.route || "direct-adverb"),
        adverbRole: normalizeKey(request.adverbRole),
        matrixFormation: normalizeKey(request.matrixFormation || "ordinary"),
        shapeVariant: normalizeKey(request.embedShapeVariant
          || source.embedShapeVariant || "ordinary"),
        boundarySpelling: normalizeKey(request.embedBoundarySpelling || ""),
      }) : null,
    lexicalFacts,
    lexicalFactsReadOnly: true,
    sourceConstituentsOnly: true,
    documentaryExampleAuthority: false,
    lessonMetadataAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    callerSuppliedAuthorityAccepted: false,
  });
  if (!blockReason) ISSUED_SOURCE_AUTHORIZATION_FRAMES.add(frame);
  return frame;
}

function isClassicalNahuatlNominalConstructionSourceAuthorization(frame = null) {
  return Boolean(
    ISSUED_SOURCE_AUTHORIZATION_FRAMES.has(frame)
    && frame?.kind
      === "classical-nahuatl-nominal-construction-source-authorization-frame"
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && normalizeConstructionKind(frame.constructionKind)
      === frame.constructionKind
    && frame.lexicalFactsReadOnly === true
    && frame.sourceConstituentsOnly === true
    && frame.documentaryExampleAuthority === false
    && frame.lessonMetadataAuthority === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && frame.callerSuppliedAuthorityAccepted === false
    && Object.isFrozen(frame)
  );
}

function isVowel(value = "") {
  return /^[aeiouāēīōū]$/u.test(normalizeKey(value));
}

function joinStemParts(parts = []) {
  return parts.map(normalizeStem).filter(Boolean).join("-");
}

function realizeBoundaryAssimilation(stem = "", followingStem = "") {
  const source = normalizeStem(stem);
  const next = firstSound(followingStem);
  if (!source) return "";
  if (/m$/u.test(source) && ["t", "n", "c", "z"].includes(next)) return `${source.slice(0, -1)}n`;
  if (/m$/u.test(source) && ["x", "y"].includes(next)) return source.slice(0, -1);
  if (/n$/u.test(source) && ["p", "m"].includes(next)) {
    return `${source.slice(0, -1)}m`;
  }
  if (/uh$/u.test(source) && next === "p") return `${source.slice(0, -2)}p`;
  return source;
}

function reduplicateInitial(stem = "", mode = "affinity", target = "initial") {
  const source = normalizeStem(stem);
  if (!source || mode === "none") return source;
  const chunks = source.split("-");
  const index = target === "matrix" ? Math.max(0, chunks.length - 1) : 0;
  const base = chunks[index];
  if (!/[aeioāēīō]/u.test(base)) return source;
  const shape = mode === "affinity" ? "long"
    : mode === "short-affinity" ? "short" : "short-glottal";
  chunks[index] = reduplicate(base, shape);
  return chunks.join("-");
}

function buildBlockedFrame(
  constructionKind,
  blockReason,
  request = {},
  extra = {}
) {
  const normalizedConstructionKind = normalizeConstructionKind(
    constructionKind
  );
  const curriculumLesson = normalizedConstructionKind
    ? CURRICULUM_LESSON_BY_CONSTRUCTION[normalizedConstructionKind]
    : "";
  const frame = Object.freeze({
    kind: "classical-nahuatl-nominal-construction-result-frame",
    version: VERSION,
    constructionKind: normalizedConstructionKind,
    curriculumLesson: String(curriculumLesson),
    lessonMetadataAuthorizesOutput: false,
    authorizationStatus: "blocked",
    blockReason,
    requestedOutputKind: normalizeKey(request.outputKind || request.outputScope || "word"),
    typedFrameAuthority: true,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    ...extra,
  });
  ISSUED_CONSTRUCTION_FRAMES.add(frame);
  return frame;
}

function buildCanonicalSemanticRestrictionFrame({
  constructionKind,
  restrictionId,
  request,
  sourceFrame,
  operationFacts = {},
}) {
  const semanticRestrictionFrame = deepFreeze({
    kind: "classical-nahuatl-nominal-construction-semantic-restriction-frame",
    version: VERSION,
    authorizationStatus: "blocked",
    blockReason: restrictionId,
    restrictionId,
    restrictionEnforced: true,
    typedRestrictionAuthority: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  return buildBlockedFrame(constructionKind, restrictionId, request, {
    sourceFrame: deepFreeze({
      ...sourceFrame,
      version: VERSION,
      authorizationStatus: "authorized",
      typedSourceAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    }),
    operationFrame: deepFreeze({
      kind: "classical-nahuatl-nominal-construction-semantic-restriction-operation-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      operationId: restrictionId,
      restrictionId,
      appliedSemanticRules: [restrictionId],
      ...operationFacts,
      typedOperationAuthority: true,
      callerSuppliedDerivedAuthorityAccepted: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    }),
    canonicalTargetEvaluator: "typed-semantic-restriction-evaluator",
    canonicalResult: deepFreeze({
      kind: "classical-nahuatl-nominal-construction-semantic-restriction-result",
      version: VERSION,
      authorizationStatus: "blocked",
      blockReason: restrictionId,
      restrictionId,
      selectedResultIsRestriction: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    }),
    semanticRestrictionFrame,
  });
}

function normalizeNounClass(value = "") {
  const key = normalizeKey(value).replace(/^class-/, "");
  return ({ "0": "zero", "ø": "zero", zero: "zero", tl: "tl", tli: "tli", in: "in" })[key] || "";
}

function normalizeSubject(value = "3sg") {
  const key = normalizeKey(value).replace(/-/gu, "");
  return ({
    "1sg": "1sg", "2sg": "2sg", "3sg": "3sg", "1pl": "1pl",
    "2pl": "2pl", "3pl": "3pl", "3common": "3common", common: "3common",
  })[key] || "";
}

function normalizeMatrixValence(value = "") {
  const key = normalizeKey(value);
  return ({
    intransitive: "intransitive",
    "zero-object": "intransitive",
    transitive: "single-object",
    "single-object": "single-object",
    "double-object": "double-object",
    "triple-object": "triple-object",
    "specific-projective": "single-object",
    "projective-human": "single-object",
    "projective-nonhuman": "single-object",
    "mainline-reflexive": "single-object",
    reflexive: "single-object",
    "human-reciprocal": "single-object",
  })[key] || "";
}

function buildObjectRequests(count, request = {}) {
  const supplied = Array.isArray(request.sourceObjectRequests)
    ? request.sourceObjectRequests
    : [];
  if (supplied.length === count) {
    return supplied.map((objectRequest, index) => {
      const objectKind = normalizeKey(
        objectRequest?.objectKind || "specific-projective"
      );
      return {
        objectId: normalizeKey(
          objectRequest?.objectId || `source-object-${index + 1}`
        ),
        objectKind,
        objectPerson: normalizeKey(
          objectRequest?.objectPerson
          || (objectKind === "specific-projective" ? "3sg" : "")
        ),
        governor: normalizeKey(
          objectRequest?.governor || (index ? "shuntline" : "directive")
        ),
        derivationalLevel: Number(
          objectRequest?.derivationalLevel || index + 1
        ),
      };
    });
  }
  const people = Array.isArray(request.objectPeople) ? request.objectPeople : [];
  const kinds = Array.isArray(request.objectKinds) ? request.objectKinds : [];
  const sourceValence = normalizeKey(
    request.matrixValence || request.sourceValence
  );
  const defaultObjectKind = sourceValence === "projective-human"
    ? "nonspecific-human"
    : sourceValence === "projective-nonhuman"
      ? "nonspecific-nonhuman"
      : ["mainline-reflexive", "reflexive", "human-reciprocal"].includes(
        sourceValence
      )
        ? "reflexive"
      : "specific-projective";
  return Array.from({ length: count }, (_, index) => ({
    objectId: `source-object-${index + 1}`,
    objectKind: normalizeKey(kinds[index] || defaultObjectKind),
    objectPerson: normalizeKey(
      people[index]
      || (defaultObjectKind === "specific-projective"
        ? index === 0
          ? request.objectPerson || "3sg"
          : "3sg"
        : "")
    ),
    governor: index === 0 ? "directive" : index === 1 ? "applicative" : "causative",
    derivationalLevel: index + 1,
  }));
}

function valenceFromObjectRequests(objectRequests = []) {
  if (!objectRequests.length) return "intransitive";
  if (objectRequests.length > 1) return "multiple-object";
  return normalizeKey(objectRequests[0]?.objectKind || "specific-projective") === "reflexive"
    ? "mainline-reflexive"
    : normalizeKey(objectRequests[0]?.objectKind || "specific-projective") === "nonspecific-human"
    ? "projective-human"
    : normalizeKey(objectRequests[0]?.objectKind || "specific-projective") === "nonspecific-nonhuman"
      ? "projective-nonhuman"
      : "specific-projective";
}

function isClassicalNahuatlNominalVncMatrixCoordinateFrame(frame = null) {
  return Boolean(ISSUED_NOMINAL_VNC_MATRIX_COORDINATES.has(frame)
    && frame?.authorizationStatus === "authorized"
    && isClassicalNahuatlNominalConstructionSourceAuthorization(frame.sourceAuthorizationFrame)
    && Object.isFrozen(frame));
}

function reissueClassicalNahuatlNominalVncMatrixCoordinate(result, choices = {}, target = {}) {
  if (target.isClassicalNahuatlClosureFrame?.(result) !== true) return null;
  const frame = result.operationFrame?.operationFacts?.nominalMatrixCoordinateFrame;
  if (!isClassicalNahuatlNominalVncMatrixCoordinateFrame(frame)) return null;
  const voice = normalizeKey(choices.requestedVoice || choices.voice || frame.coordinate.voice);
  if (voice !== "active" || !["", "direct"].includes(normalizeKey(choices.requestedDerivation))) return null;
  const coordinate = {subject: choices.subject || frame.coordinate.subject,
    mood: choices.mood || frame.coordinate.mood, tense: choices.tense || frame.coordinate.tense};
  if (Object.entries(coordinate).every(([key, value]) => frame.coordinate[key] === value)) return null;
  const reissued = evaluateNominalConstruction({...frame.nominalRequest, ...coordinate, voice}, target);
  return reissued?.authorizationStatus === "authorized" ? reissued.canonicalResult.resultFrame : null;
}

function evaluateCanonicalVncCoordinate(target, vncRequest = {}) {
  const directEvaluationAvailable =
    typeof target.evaluateClassicalNahuatlVncApplication === "function";
  const preparedProjectionAvailable = typeof target.prepareClassicalNahuatlVncParadigmPlan === "function"
    && typeof target.projectClassicalNahuatlVncParadigmCoordinates === "function";
  if (!preparedProjectionAvailable && !directEvaluationAvailable) {
    return Object.freeze({
      authorizationStatus: "blocked",
      blockReason: "canonical-vnc-application-unavailable",
      canonicalTargetEvaluator: "",
      canonicalResult: null,
    });
  }
  const vncCacheKey = JSON.stringify(vncRequest);
  const targetCache = vncScalarResultCaches.get(target) || new Map();
  if (!vncScalarResultCaches.has(target)) vncScalarResultCaches.set(target, targetCache);
  let canonicalResult = targetCache.get(vncCacheKey);
  if (!canonicalResult && directEvaluationAvailable) {
    canonicalResult = target.evaluateClassicalNahuatlVncApplication(
      vncRequest
    );
  }
  if (!canonicalResult && preparedProjectionAvailable) {
    // Paradigm plans carry service-owned identity. Preparing a fresh plan keeps
    // that identity paired with the service that projects its coordinates.
    const preparedPlan = target.prepareClassicalNahuatlVncParadigmPlan(
      vncRequest
    );
    const coordinate = target.projectClassicalNahuatlVncParadigmCoordinates(preparedPlan, [{
      subject: vncRequest.subject,
      mood: vncRequest.mood,
      tense: vncRequest.tense,
    }])?.[0] || null;
    canonicalResult = Object.freeze({
      kind: "classical-nahuatl-nominal-construction-vnc-result-frame",
      version: VERSION,
      authorizationStatus: coordinate?.authorizationStatus || "blocked",
      blockReason: coordinate?.blockReason || preparedPlan?.blockReason || "canonical-vnc-coordinate-blocked",
      typedSlotFrame: coordinate?.typedSlotFrame || null,
      formulaRealization: coordinate?.formulaRealization || "",
      surfaceRealization: coordinate?.surfaceRealization || "",
      typedFrameAuthority: true,
      callerSuppliedAuthorityAccepted: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  if (!targetCache.has(vncCacheKey)) targetCache.set(vncCacheKey, canonicalResult);
  return Object.freeze({
    authorizationStatus: canonicalResult?.authorizationStatus || "blocked",
    blockReason: canonicalResult?.blockReason || "",
    canonicalTargetEvaluator: directEvaluationAvailable
      ? "evaluateClassicalNahuatlVncApplication"
      : "prepareClassicalNahuatlVncParadigmPlan+projectClassicalNahuatlVncParadigmCoordinates",
    canonicalResult,
  });
}

// A compound noun inherits its final class from its matrix. The shared noun
// owner realizes that class's use stem; the compound graph remains the Source.
function buildCompoundNncUseStemFrame(stem, classFrame, target) {
  if (classFrame?.useShape !== "truncated") return null;
  return target.buildClassicalNahuatlNounstemSourceFrame(stem, {
    state: "absolutive", nounClass: classFrame.nounClass,
    classSelectionAuthority: "user-selection",
    classMembershipOptions: [classFrame.nounClass],
    generalUseShape: classFrame.useShape,
    tlSubclass: normalizeKey(classFrame.subclass).replace(/^tl-/u, ""),
    ephemeralFinalVowel: classFrame.ephemeralFinalVowel,
    truncationRepair: classFrame.truncationRepair,
  });
}

function realizeNominalEmbed(
  source = {},
  matrixStem = "",
  lexicalFacts = {},
  target = globalThis,
  requestedVariant = "ordinary"
) {
  const original = normalizeStem(source.embedStem);
  if (!original) return { authorizationStatus: "blocked", blockReason: "nominal-embed-embed-stem-required" };
  const lexicalRule = normalizeKey(lexicalFacts.embedLexicalRule);
  const patientiveNounClass = normalizeNounClass(
    lexicalFacts.capturedEmbedPatientiveCaptureFrame?.sourceNounClass
      || lexicalFacts.capturedEmbedNounClass
  );
  const characteristicPatientiveEmbed =
    lexicalFacts.capturedEmbedPatientiveCaptureFrame
      ?.characteristicPropertyPatientive === true;
  const exactOrdinaryNncPredicateFrame = lexicalFacts.capturedExactOrdinaryNncPredicateFrame || null;
  const compoundNncResult = lexicalFacts.capturedCompoundNncResult;
  const compoundNncUseStemFrame = compoundNncResult
    ? buildCompoundNncUseStemFrame(original,
      compoundNncResult.operationFrame.resultSourceClassFrame, target)
    : null;
  if (compoundNncUseStemFrame && compoundNncUseStemFrame.authorizationStatus !== "authorized") {
    return compoundNncUseStemFrame;
  }
  const compoundFinalARetained = compoundNncUseStemFrame
    ?.subclassSourceShapeFrame?.tlSubclass === "2B"
    && compoundNncUseStemFrame.ephemeralFinalVowel === "a";
  const basicNumeralCitation = lexicalFacts.capturedBasicNumeralEmbedCitation;
  let stem = basicNumeralCitation
    ? simpleNumeralStem(basicNumeralCitation.canonicalNumeralSourceAnalysisFrame.value,
      {embedded: true, following: matrixStem})
    : exactOrdinaryNncPredicateFrame?.realizedStem
    || (compoundNncUseStemFrame && !compoundFinalARetained
      ? compoundNncUseStemFrame.generalUseStem : original);
  let ruleId = basicNumeralCitation ? "nominal-embed-exact-basic-numeral-contextual-shape" : exactOrdinaryNncPredicateFrame
    ? exactOrdinaryNncPredicateFrame.compoundFinalARetained
      ? "nominal-embed-typed-final-a-retention"
      : "nominal-embed-exact-ordinary-nnc-predicate-use"
    : "nominal-embed-general-use-embed";
  const patientiveIncorporatedObject = Boolean(
    lexicalFacts.patientiveNncEmbed
    && normalizeKey(source.matrixSemanticFamily)
      === "patientive-incorporated-object-matrix"
  );
  if (patientiveIncorporatedObject) {
    ruleId = "patientive-incorporated-object-restricted-use-zero-connector";
  } else if (lexicalFacts.capturedCharacteristicNounSourceFrame) {
    // Silent morphs remain in the original analyzed noun Source. They do not
    // become literal letters when that noun is realized inside a verbstem.
    stem = joinStemParts(stem.split("-").filter(morph => !["0", "Ø", "⎕"].includes(morph)));
    ruleId = "characteristic-noun-source-zero-compound-connector";
  } else if (characteristicPatientiveEmbed) {
    ruleId = "characteristic-patientive-zero-compound-connector";
  } else if (
    lexicalFacts.patientiveNncEmbed
    && patientiveNounClass === "tl"
  ) {
    ruleId = "patientive-tl-compound-owner-derived-stem";
  } else if (lexicalFacts.patientiveNncEmbed) {
    ruleId = "patientive-tli-compound-zero-connector";
  } else if (lexicalRule === "cuica-to-cuic") {
    if (!["cuica", "cuīca"].includes(original)) return { authorizationStatus: "blocked", blockReason: "cuica-to-cuic-rule-requires-cuica" };
    stem = original.slice(0, -1);
    ruleId = "nominal-embed-cuica-to-cuic-exception";
  } else if (lexicalRule === "atli-retains-num1") {
    if (!["ā", "a"].includes(original)) return { authorizationStatus: "blocked", blockReason: "atli-rule-requires-water-stem" };
    stem = `${original}-tl`;
    ruleId = "nominal-embed-atli-absolutive-num1-exception";
  } else if (lexicalRule === "glottalized-long-vowel") {
    stem = original.replace(/([āēīōū])$/u, (_, vowel) => ({
      ā: "ah", ē: "eh", ī: "ih", ō: "oh", ū: "uh",
    })[vowel]);
    ruleId = "nominal-embed-glottalized-general-use-shape";
  } else if (lexicalRule === "h-to-y-before-vowel") {
    if (!/h$/u.test(original) || !isVowel(firstSound(matrixStem))) {
      return { authorizationStatus: "blocked", blockReason: "h-to-y-rule-requires-h-plus-vowel-boundary" };
    }
    stem = `${original.slice(0, -1)}y`;
    ruleId = "nominal-compound-h-to-y-vowel-boundary";
  } else if (lexicalRule === "face-before-mati-added-i") {
    stem = joinStemParts([stem, "i"]);
    ruleId = "nominal-embed-lexical-added-i";
  } else if (normalizeKey(lexicalFacts.embedSubclass) === "2b-final-a") {
    if (!/a$/u.test(stem)) return { authorizationStatus: "blocked", blockReason: "2b-final-a-rule-requires-final-a" };
    ruleId = "nominal-embed-final-a-retention";
  }
  const lexicalSource = exactOrdinaryNncPredicateFrame?.sourceStemOperation
    ? exactOrdinaryNncPredicateFrame.canonicalResultFrame.sourceFrame : null;
  const glottalizedUseFrame = lexicalSource
    && typeof target.buildClassicalNahuatlLongVowelGlottalFrame === "function"
    ? target.buildClassicalNahuatlLongVowelGlottalFrame({
      morpheme: lexicalSource.stem, compoundSubposition: "embed",
      matrixMorpheme: matrixStem,
    }) : null;
  // §39.6's cold noun has a documented compound-use allomorph. Its
  // perfective ce-cui ancestry licenses this lexical variant, not its spelling.
  const patientiveCapture = lexicalFacts.capturedEmbedPatientiveCaptureFrame;
  const coldCapture = patientiveCapture?.canonicalPatientiveSourceFrame
    ?.perfectivePatientiveVncCaptureFrame;
  const documentedShortLicensed = patientiveCapture?.patientiveSourceFamily === "perfective-active-core"
    && normalizeStem(coldCapture?.activeSourceStem) === "ce-cui"
    && original === "ce-uc";
  const variantCandidates = ["ordinary", ...(glottalizedUseFrame
    ?.authorizationStatus === "authorized" ? ["glottalized"] : []),
    ...(documentedShortLicensed ? ["documented-short"] : [])];
  const selectedVariant = normalizeKey(requestedVariant || "ordinary");
  if (!variantCandidates.includes(selectedVariant)) {
    return { authorizationStatus: "blocked", blockReason: "nominal-embed-use-shape-not-licensed" };
  }
  if (selectedVariant === "glottalized") {
    stem = glottalizedUseFrame.outputForm;
    ruleId = "nominal-embed-owner-issued-glottalized-use";
  }
  if (selectedVariant === "documented-short") {
    stem = original.replace(/-uc$/u, "-c");
    ruleId = "nominal-embed-perfective-cold-documented-short-use";
  }
  return {
    kind: "classical-nahuatl-nominal-embed-shape-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    sourceStem: original,
    realizedStem: stem,
    ruleId,
    exactOrdinaryNncPredicateFrame,
    compoundNncUseStemFrame,
    variantCandidates: Object.freeze(variantCandidates),
    selectedVariant,
    glottalizedUseFrame: glottalizedUseFrame?.authorizationStatus === "authorized"
      ? glottalizedUseFrame : null,
    patientiveNncEmbed: lexicalFacts.patientiveNncEmbed === true,
    patientiveNounClass: lexicalFacts.patientiveNncEmbed
      ? patientiveNounClass
      : "",
    patientiveCompoundConnector: lexicalFacts.patientiveNncEmbed ? "0" : "",
    sourceStringAuthority: false,
  };
}

// A compared-manner noun preserves latent verbal reflexive grammar (§35.12).
// The new contact is issued from its captured VNC, never from the written noun.
function buildPreteritAgentiveVncEmbedAnalysis(parent, matrixValence, subject, target) {
  if (target.isClassicalNahuatlDeverbalNncGrammarFrame?.(parent) !== true
    || parent.operationFrame?.nominalizationKind !== "preterit-agentive"
    || parent.sourceFrame?.sourceVoice !== "active"
    || parent.sourceFrame?.sourceObjectPattern !== "reflexive") return null;
  const capture = parent.sourceFrame.preteritVncCaptureFrame;
  if (!capture || capture.sourceObjectRequests?.length !== 1
    || capture.sourceObjectRequests[0].objectKind !== "reflexive") return null;
  const exactSource = capture.canonicalVncResult;
  const projection = target.getClassicalNahuatlVncContinuationSourceConstituents?.(exactSource);
  if (!projection) return null;
  const root = normalizeStem(projection.sourceStem).replaceAll("-", "");
  // Andrews explicitly lexicalizes the complete/entire noun. Its original
  // third-person mainline morph survives regardless of the matrix's valence.
  const lexicalized = root === "ahci" && projection.verbClass === "A";
  const shuntline = !lexicalized && matrixValence !== "intransitive";
  const concordSubject = lexicalized ? "3sg" : subject;
  // ih-mati's i is real in mainline contact, supportive after shunt ne.
  // This bounded lexical context does not omit arbitrary real initial vowels.
  const initialContext = root === "ihmati" && projection.verbClass === "B"
    ? shuntline ? "supportive-after-ne" : "real-after-mainline"
    : shuntline && capture.canonicalVncSourceAnalysisFrame?.sourceInitialIKind === "supportive"
      ? "supportive-after-ne" : "preserve-captured-analysis";
  const coordinate = target.evaluateClassicalNahuatlVncApplication?.({
    sourceStem: projection.sourceStem, verbClass: projection.verbClass,
    sourceInitialISelection: projection.sourceInitialISelection,
    sourceValence: shuntline ? "shuntline-reflexive" : "mainline-reflexive",
    objectKind: "reflexive", subject: concordSubject,
    mood: "indicative", tense: "preterit", requestedVoice: "active",
  });
  if (target.isClassicalNahuatlVncApplicationFrame?.(coordinate) !== true
    || coordinate.authorizationStatus !== "authorized") return null;
  const reissued = target.captureClassicalNahuatlPreteritVncResultForNominalization?.(coordinate.resultFrame);
  if (reissued?.authorizationStatus !== "authorized") return null;
  const slots = reissued.canonicalVncTypedSlotFrame?.slots;
  const valence = slots?.prePredicate;
  if (valence?.length !== 1 || slots.predicate?.tns !== "0") return null;
  const objectMorph = valence[0];
  const morphs = objectMorph.kind === "dyadic-valence"
    ? [objectMorph.va1, objectMorph.va2]
    : objectMorph.kind === "monadic-valence" ? [objectMorph.va] : [];
  if (!morphs.length) return null;
  const predicateStem = normalizeStem(slots.predicate.stem);
  const realizedPredicate = initialContext === "supportive-after-ne"
    && morphs[0] === "ne" && /^i/u.test(predicateStem)
      ? predicateStem.slice(1) : predicateStem;
  return deepFreeze({
    kind: "classical-nahuatl-preterit-agentive-vnc-embed-analysis-frame",
    authorizationStatus: "authorized", canonicalParentResult: parent,
    canonicalSourceCapture: capture, originalGeneralUseStem: parent.operationFrame.targetStems.generalUse,
    matrixValence, concordSubject, lexicalized,
    lexicalReading: lexicalized ? "complete-entire" : "ordinary-reflexive-manner",
    initialContext, sourceIdentityPreserved: true,
    coordinate, reissuedCapture: reissued, canonicalVncTypedSlotFrame: reissued.canonicalVncTypedSlotFrame,
    retainedPredicateStem: predicateStem, realizedPredicateStem: realizedPredicate,
    realizedStem: joinStemParts([...morphs, realizedPredicate, "0", "cā"]),
    shuntline, subjectConcordRequired: !lexicalized,
    callerSuppliedAuthorityAccepted: false, formulaStringAuthority: false, surfaceStringAuthority: false,
  });
}

function captureExactCoreActionNncConstituent(result, target, allowPotential = false) {
  // The existing public validator authenticates the complete owner-issued
  // grammar Result, including its source capture and exact typed noun slots.
  if (target.isClassicalNahuatlDeverbalNncGrammarFrame?.(result) !== true) return null;
  const operation = result.operationFrame;
  const stem = normalizeStem(operation?.targetStems?.restrictedUse);
  return operation?.constructionKind === "deverbal-action"
    && (operation.actionKind === "active-action"
      || allowPotential && operation.actionKind === "potential-patient")
    && ["z", "liz"].includes(operation.actionSuffix)
    && operation.nounClass === "tli"
    && result.canonicalResult?.state === "absolutive"
    && stem === normalizeStem(result.canonicalResult?.nncSlotFrame?.slots?.predicate?.stem)
      ? { canonicalActionNncResult: result, sourceStem: stem,
        actionKind: operation.actionKind,
        sourceNounClass: "tli", sourceState: "absolutive" } : null;
}

function evaluateNominalEmbedConstruction(request, target, sourceAuthorizationFrame) {
  const lexicalFacts = sourceAuthorizationFrame.lexicalFacts;
  const originalSource = request.source && typeof request.source === "object" ? request.source : request;
  const source = lexicalFacts.canonicalRestrictedMatrixSourceFrame ? {...originalSource,
    matrixVerbClass: lexicalFacts.canonicalRestrictedMatrixSourceFrame.sourceClass,
    matrixValence: lexicalFacts.canonicalRestrictedMatrixSourceFrame.sourceValence,
  } : originalSource;
  const relation = normalizeKey(request.relation || source.relation);
  const requestedRoute = normalizeKey(request.route || source.route);
  const capturedPossessiveNnc = Boolean(
    lexicalFacts.capturedEmbedState === "possessive"
    && lexicalFacts.capturedEmbedPossessor
    && lexicalFacts.capturedEmbedResult
  );
  const capturedAdverbRoutes = relation === "adverb"
    && lexicalFacts.capturedEmbedResult && lexicalFacts.matrixResultCaptured
      ? ["direct-adverb", ...(
        capturedPossessiveNnc
          ? lexicalFacts.capturedMatrixObjectRequests.length === 0
            ? ["supplement-subject"]
            : lexicalFacts.matrixIsApplicative !== true
              || normalizeKey(source.possessionKind) === "less-intimate"
              ? ["supplement-object"] : []
          : []
      ), ...(
        lexicalFacts.capturedMatrixVoice === "active"
          && lexicalFacts.capturedMatrixObjectRequests.length > 0
            ? ["passive-adverbialized-subject"] : []
      )]
      : [];
  const adverbSourceRouteCandidates = Array.isArray(
    source.adverbSourceRouteCandidates
  )
    ? [...new Set(source.adverbSourceRouteCandidates.map(normalizeKey).filter(Boolean))]
    : capturedAdverbRoutes;
  const route = requestedRoute
    || (relation === "adverb"
      ? adverbSourceRouteCandidates.length === 1
        ? adverbSourceRouteCandidates[0]
        : adverbSourceRouteCandidates.length === 0
          ? "direct-adverb"
          : ""
      : relation);
  const matrixStem = normalizeStem(source.matrixStem);
  const matrixValence = normalizeMatrixValence(source.matrixValence || source.sourceValence);
  const matrixSemanticFamily = normalizeKey(
    source.matrixSemanticFamily || "typed-matrix"
  );
  const matrixApplication = lexicalFacts.capturedMatrixVncResult;
  const classIndependentMatrix = target.isClassicalNahuatlImperfectiveVncApplicationFrame?.(matrixApplication) === true
    && target.isClassicalNahuatlImperfectiveVncSourceFrame?.(matrixApplication.canonicalImperfectiveSourceFrame) === true;
  const inherentMatrixSubject = matrixApplication?.resultFrame?.participantProjection?.targetSubject;
  const authenticatedOrdinaryInherentMatrix = !classIndependentMatrix
    && isClassicalNahuatlNominalConstructionSourceAuthorization(sourceAuthorizationFrame)
    && lexicalFacts.capturedMatrixInherentImpersonal === true
    && target.isClassicalNahuatlVncApplicationIssuedFrame?.(matrixApplication) === true
    && matrixApplication.normalizedRequest.sourceValence === "intransitive"
    && matrixApplication.normalizedRequest.sourceObjectRequests.length === 0
    && matrixApplication.resultFrame.selectedVoice === "impersonal"
    && matrixApplication.resultFrame.selectedVoiceOperation === "inherent-impersonal"
    && matrixApplication.resultFrame.selectedNonactiveOptionId === "inherent-impersonal"
    && matrixApplication.resultFrame.selectedMachineryFrame.voiceTransformationFrame.agentExpressible === false
    && isClassicalNahuatlParticipantFrame(inherentMatrixSubject) && Object.isFrozen(inherentMatrixSubject)
    && inherentMatrixSubject.person === "3" && inherentMatrixSubject.number === "singular"
    && inherentMatrixSubject.morphologicalAgreement === "3sg"
    && inherentMatrixSubject.hasReferent === false && inherentMatrixSubject.impersonal === true;
  const verbClass = classIndependentMatrix ? "" : normalizeToken(source.matrixVerbClass || source.verbClass || "A").toUpperCase();
  const subject = normalizeSubject(request.subject || "3sg");
  const requestedVoice = normalizeKey(request.voice || "active");
  if (!["object", "adverb", "complement"].includes(relation)) return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-relation-required", request);
  if (!matrixStem) return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-matrix-stem-required", request);
  if (!matrixValence) return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-matrix-valence-required", request);
  if (!classIndependentMatrix && !["A", "B", "C", "D"].includes(verbClass)) return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-matrix-verb-class-required", request);
  if (!subject) return buildBlockedFrame("nominal-embed-vnc", "unknown-nnc-or-vnc-subject", request);

  const ordinaryEmbedShape = realizeNominalEmbed(
    source,
    matrixStem,
    lexicalFacts,
    target,
    request.embedShapeVariant || source.embedShapeVariant || "ordinary"
  );
  const preteritAgentiveVncEmbedAnalysisFrame = relation === "adverb"
    && normalizeKey(request.adverbRole || source.adverbRole) === "compared-manner"
      ? buildPreteritAgentiveVncEmbedAnalysis(lexicalFacts.capturedEmbedResult,
        matrixValence, subject, target) : null;
  const embedShape = preteritAgentiveVncEmbedAnalysisFrame
    ? {...ordinaryEmbedShape, realizedStem: preteritAgentiveVncEmbedAnalysisFrame.realizedStem,
      ruleId: "preterit-agentive-reflexive-manner-contact", preteritAgentiveVncEmbedAnalysisFrame}
    : ordinaryEmbedShape;
  if (embedShape.authorizationStatus !== "authorized") return buildBlockedFrame("nominal-embed-vnc", embedShape.blockReason, request, { embedShape });

  const sourceObjectCount = ({ intransitive: 0, "single-object": 1, "double-object": 2, "triple-object": 3 })[matrixValence];
  const sourceObjectRequests = buildObjectRequests(sourceObjectCount, {
    ...source,
    sourceObjectRequests: lexicalFacts.capturedMatrixObjectRequests?.length
      ? lexicalFacts.capturedMatrixObjectRequests
      : source.sourceObjectRequests,
  }).map(objectRequest => {
    // Retain Participant facts only from the authenticated matrix capture.
    // The generic raw-object normalizer remains a scalar input path.
    const captured = lexicalFacts.capturedMatrixObjectRequests?.find(candidate =>
      candidate.objectId === objectRequest.objectId
      && candidate.objectKind === objectRequest.objectKind
      && candidate.objectPerson === objectRequest.objectPerson
      && candidate.governor === objectRequest.governor
      && candidate.derivationalLevel === objectRequest.derivationalLevel);
    return captured?.participantFrame
      ? {...objectRequest, participantFrame: captured.participantFrame}
      : objectRequest;
  });
  const activatedParent = lexicalFacts.capturedEmbedResult;
  const activationLicenseFrame = target.isClassicalNahuatlDeverbalNncGrammarFrame?.(activatedParent) === true
    && activatedParent.operationFrame?.nominalizationKind === "preterit-agentive"
    && activatedParent.operationFrame?.activatedProjectiveObject === true
      ? activatedParent.operationFrame.activationLicenseFrame : null;
  let activatedComplementObjectFrame = null;
  let targetObjectRequests = sourceObjectRequests;
  let targetValenceCount = sourceObjectCount;
  let targetSubject = subject;
  let selectedIncorporatedObjectId = "";
  let orientation = normalizeKey(request.orientation || source.orientation);
  let semanticRole = normalizeKey(request.adverbRole || request.complementRole || source.adverbRole || source.complementRole);
  const adverbRoleCandidates = Array.isArray(source.adverbRoleCandidates)
    ? [...new Set(source.adverbRoleCandidates.map(normalizeKey).filter(Boolean))]
    : [];
  const comparisonTargetCandidates = Array.isArray(source.comparisonTargetCandidates)
    ? [...new Set(source.comparisonTargetCandidates.map(normalizeKey).filter(
      candidate => ["subject", "object"].includes(candidate)
    ))]
    : [];
  const adverbSourceStructure = normalizeKey(
    source.adverbSourceStructure || "ordinary-adverbial"
  );
  let possessorReferenceFrame = null;
  let supplementTransformationFrame = null;
  let complementReferenceFrame = null;
  let complementScopeFrame = null;
  let possessiveComplementObjectTransformationFrame = null;
  let possessiveIncorporatedObjectTransformationFrame = null;
  const restrictions = [];
  const appliedSemanticRules = new Set([
    "nominal-embed/base",
    "nominal-embed/stem-shape",
    "nominal-embed/relation",
    "vnc/ordered-derivation",
    "vnc/voice-authorization",
    "nominal-embed/non-agent",
    "vnc/passive-agent-barrier",
  ]);
  const lexicalFamily = normalizeKey(lexicalFacts.embedLexicalFamily);
  const effectiveEmbedState = normalizeKey(
    lexicalFacts.capturedEmbedState || source.embedState
  );
  const embedPossessorPerson = normalizeKey(
    lexicalFacts.capturedEmbedPossessor || source.embedPossessorPerson
  );
  if (lexicalFamily) {
    if (!["unique", "ih"].includes(lexicalFamily)) {
      return buildBlockedFrame("nominal-embed-vnc", "recognized-nominal-embed-lexical-family-required", request);
    }
    if (lexicalFamily === "ih" && !/^ih/u.test(embedShape.realizedStem)) {
      return buildBlockedFrame("nominal-embed-vnc", "ih-family-requires-ih-embed-source", request);
    }
    appliedSemanticRules.add(lexicalFamily === "ih"
      ? "nominal-embed/ih-family"
      : "nominal-embed/unique-lexeme");
  }
  if (embedShape.ruleId === "nominal-embed-atli-absolutive-num1-exception") {
    appliedSemanticRules.add("incorporated-object/atli");
  }
  const matrixTlaFusion = relation === "adverb"
    && matrixValence === "intransitive"
    && /^tla-/u.test(matrixStem);

  if (relation === "object") {
    appliedSemanticRules.add("incorporated-object/license");
    appliedSemanticRules.add("incorporated-object/valence");
    appliedSemanticRules.add("incorporated-object/voice");
    if (sourceObjectCount < 1) return buildBlockedFrame("nominal-embed-vnc", "incorporated-object-requires-transitive-matrix", request);
    const suppliedCandidateIds = Array.isArray(
      source.incorporatedObjectCandidateIds
    )
      ? source.incorporatedObjectCandidateIds.map(normalizeKey).filter(Boolean)
      : [];
    const eligibleObjectIds = sourceObjectRequests.map(
      objectRequest => objectRequest.objectId
    );
    const incorporatedObjectCandidateIds = suppliedCandidateIds.length
      ? suppliedCandidateIds.filter(
        objectId => eligibleObjectIds.includes(objectId)
      )
      : [eligibleObjectIds[0]];
    const requestedIncorporatedObjectId = normalizeKey(
      request.incorporatedObjectId || source.incorporatedObjectId
    );
    if (!incorporatedObjectCandidateIds.length) {
      return buildBlockedFrame(
        "nominal-embed-vnc",
        "incorporated-object-compatible-role-required",
        request
      );
    }
    if (
      incorporatedObjectCandidateIds.length > 1
      && !requestedIncorporatedObjectId
    ) {
      return buildBlockedFrame(
        "nominal-embed-vnc",
        "incorporated-object-role-choice-required",
        request
      );
    }
    const incorporatedObjectId = requestedIncorporatedObjectId
      || incorporatedObjectCandidateIds[0];
    if (!incorporatedObjectCandidateIds.includes(incorporatedObjectId)) {
      return buildBlockedFrame(
        "nominal-embed-vnc",
        "incorporated-object-role-choice-mismatch",
        request
      );
    }
    selectedIncorporatedObjectId = incorporatedObjectId;
    const remainingSourceObjectRequests = sourceObjectRequests.filter(
      objectRequest => objectRequest.objectId !== incorporatedObjectId
    );
    targetObjectRequests = remainingSourceObjectRequests.map(
      (objectRequest, index) => ({
        ...objectRequest,
        sourceGovernor: objectRequest.governor,
        sourceDerivationalLevel: objectRequest.derivationalLevel,
        governor: index === 0 ? "directive" : objectRequest.governor,
        derivationalLevel: index + 1,
      })
    );
    targetValenceCount -= 1;
    const possessivePatientiveIncorporatedObject =
      matrixSemanticFamily === "patientive-incorporated-object-matrix"
      && effectiveEmbedState === "possessive";
    if (possessivePatientiveIncorporatedObject) {
      if (!embedPossessorPerson) {
        return buildBlockedFrame(
          "nominal-embed-vnc",
          "patientive-incorporated-object-possessor-required",
          request
        );
      }
      const possessorCorefersWithMatrixSubject =
        source.embedPossessorCorefersWithSubject === true
        || request.embedPossessorCorefersWithSubject === true
        || (
          ["1sg", "1pl", "2sg", "2pl"].includes(subject)
          && embedPossessorPerson === subject
        );
      const transferredPossessorObject = {
        objectId: normalizeKey(
          source.embedPossessorReferenceId
          || request.embedPossessorReferenceId
          || "patientive-possessor-object"
        ),
        objectKind: possessorCorefersWithMatrixSubject
          ? "reflexive"
          : ["3common", "nonspecific-human"].includes(embedPossessorPerson)
            ? "nonspecific-human"
            : "specific-projective",
        objectPerson: ["3common", "nonspecific-human"].includes(
          embedPossessorPerson
        )
          ? ""
          : embedPossessorPerson,
        governor: "applicative",
        derivationalLevel: 1,
        sourceRole: "possessor",
        sourceCase: "possessive",
        targetCase: "objective",
      };
      targetObjectRequests = [
        transferredPossessorObject,
        ...targetObjectRequests.map((objectRequest, index) => ({
          ...objectRequest,
          governor: index === 0 ? "directive" : objectRequest.governor,
          derivationalLevel: index + 2,
        })),
      ];
      targetValenceCount = targetObjectRequests.length;
      possessiveIncorporatedObjectTransformationFrame = deepFreeze({
        kind:
          "classical-nahuatl-possessive-incorporated-object-transformation-frame",
        version: VERSION,
        authorizationStatus: "authorized",
        sourceRole: "possessor",
        sourceCase: "possessive",
        sourcePerson: embedPossessorPerson,
        targetRole: "mainline-applicative-object",
        targetCase: "objective",
        targetObjectId: transferredPossessorObject.objectId,
        targetObjectKind: transferredPossessorObject.objectKind,
        targetObjectPerson: transferredPossessorObject.objectPerson,
        targetObjectGovernor: transferredPossessorObject.governor,
        participantRoleTransitionFrame:
          buildClassicalNahuatlParticipantRoleTransitionFrame({
            operationId: "incorporation:possessor-to-applicative-object",
            sourceRoles: ["source-possessor"],
            targetRoles: ["mainline-applicative-object"],
            retiredSourceRoles: ["source-possessor"],
            activatedTargetRoles: ["mainline-applicative-object"],
            preservedParticipantFacts: [
              "possessor-participant-identity",
              "typed-source-history",
            ],
          }),
        corefersWithMatrixSubject: possessorCorefersWithMatrixSubject,
        incorporatedObjectId,
        incorporatedObjectInsideVerbstem: true,
        externalPossessorObjectOutsideVerbstem: true,
        sourceMatrixValence: matrixValence,
        sourceValencePositionCount: sourceObjectCount,
        targetValencePositionCount: targetValenceCount,
        matrixValencePreserved: targetValenceCount === sourceObjectCount,
        applicativeSuffixAdded: false,
        ordinaryValencePrincipleViolated:
          targetValenceCount === sourceObjectCount,
        transformationDerivedAutomatically: true,
        userChoiceRequired: false,
        matrixSemanticFamily,
        referentIdentityAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
      appliedSemanticRules.add(
        "incorporated-object/possessive-possessor-to-applicative-object"
      );
      appliedSemanticRules.add(
        "incorporated-object/valence-preserved-without-applicative-suffix"
      );
    }
    semanticRole = "general-patient-area";
    orientation = "not-applicable";
    if (normalizeKey(request.voice || "active") === "passive" && targetValenceCount === 0) {
      return buildBlockedFrame("nominal-embed-vnc", "incorporated-object-from-single-object-matrix-cannot-passivize", request);
    }
  } else if (relation === "adverb") {
    appliedSemanticRules.add("incorporated-adverb/source-route");
    if (adverbSourceRouteCandidates.length > 1 && !requestedRoute) {
      return buildBlockedFrame("nominal-embed-vnc", "incorporated-adverb-source-route-choice-required", request);
    }
    if (
      adverbSourceRouteCandidates.length
      && !adverbSourceRouteCandidates.includes(route)
    ) {
      return buildBlockedFrame("nominal-embed-vnc", "incorporated-adverb-source-route-choice-mismatch", request);
    }
    if (!["direct-adverb", "supplement-subject", "supplement-object", "passive-adverbialized-subject"].includes(route)) {
      return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-adverb-source-route-required", request);
    }
    const supplementaryRoute = ["supplement-subject", "supplement-object"].includes(route);
    if (!supplementaryRoute && adverbRoleCandidates.length > 1 && !semanticRole) {
      return buildBlockedFrame("nominal-embed-vnc", "incorporated-adverb-role-choice-required", request);
    }
    if (semanticRole && adverbRoleCandidates.length && !adverbRoleCandidates.includes(semanticRole)) {
      return buildBlockedFrame("nominal-embed-vnc", "incorporated-adverb-role-choice-mismatch", request);
    }
    if ((!supplementaryRoute || semanticRole) && !NOMINAL_EMBED_ADVERB_ROLES.includes(semanticRole)) {
      return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-adverb-role-required", request);
    }
    if (adverbSourceStructure === "exceptional-tla-fusion") {
      if (semanticRole !== "form-style") {
        return buildBlockedFrame("nominal-embed-vnc", "exceptional-tla-fusion-requires-form-style-role", request);
      }
      if (!matrixTlaFusion) {
        return buildBlockedFrame("nominal-embed-vnc", "form-style-adverb-requires-intransitive-tla-fused-matrix", request);
      }
      appliedSemanticRules.add("incorporated-adverb/tla-fusion");
      appliedSemanticRules.add("incorporated-adverb/exceptional-form-style");
      restrictions.push("tla-remains-fused-matrix-object-history");
    } else if (matrixTlaFusion) {
      appliedSemanticRules.add("incorporated-adverb/tla-fusion");
    }
    if (semanticRole === "compared-manner") {
      appliedSemanticRules.add("incorporated-adverb/compared-manner");
      if (sourceObjectCount === 0) {
        if (orientation && orientation !== "subject") {
          return buildBlockedFrame("nominal-embed-vnc", "intransitive-compared-manner-requires-subject-orientation", request);
        }
        orientation = "subject";
      } else {
        const eligibleTargets = comparisonTargetCandidates.length
          ? comparisonTargetCandidates
          : ["subject", "object"];
        if (!orientation && eligibleTargets.length > 1) {
          return buildBlockedFrame("nominal-embed-vnc", "compared-manner-target-choice-required", request);
        }
        orientation = orientation || eligibleTargets[0];
        if (!eligibleTargets.includes(orientation)) {
          return buildBlockedFrame("nominal-embed-vnc", "compared-manner-target-choice-mismatch", request);
        }
      }
    } else if (!orientation) {
      orientation = "not-applicable";
    }
    if (route === "supplement-subject") {
      appliedSemanticRules.add("incorporated-adverb/supplement");
      appliedSemanticRules.add("incorporated-adverb/supplement-subject");
      if (effectiveEmbedState !== "possessive") return buildBlockedFrame("nominal-embed-vnc", "supplement-subject-embed-must-be-possessive", request);
      if (sourceObjectCount !== 0) return buildBlockedFrame("nominal-embed-vnc", "supplement-subject-route-requires-intransitive-principal", request);
      if (!embedPossessorPerson) return buildBlockedFrame("nominal-embed-vnc", "supplement-subject-possessor-required", request);
      targetSubject = ["te", "tē", "nonspecific-human"].includes(
        embedPossessorPerson
      )
        ? "3sg"
        : normalizeSubject(embedPossessorPerson);
      if (!targetSubject) return buildBlockedFrame("nominal-embed-vnc", "supplement-subject-possessor-person-invalid", request);
      restrictions.push("possessor-case:possessive-to-nominative");
      supplementTransformationFrame = deepFreeze({
        kind: "classical-nahuatl-incorporated-adverb-supplement-transformation-frame",
        version: VERSION,
        sourceRole: "supplementary-subject",
        sourceState: "possessive",
        possessorPerson: embedPossessorPerson,
        sourcePossessorCase: "possessive",
        targetPossessorCase: "nominative",
        targetRole: "matrix-subject",
        sourceMatrixSubject: subject,
        targetMatrixSubject: targetSubject,
        sourceCapturedFromOwnerResult: Boolean(
          lexicalFacts.capturedEmbedResult && lexicalFacts.capturedEmbedState
        ),
        semanticAttachment: "incorporated-embed",
        referentIdentityPreserved: true,
        supplementationRolePreserved: true,
        incorporationRolePreserved: true,
      });
    }
    if (route === "supplement-object") {
      appliedSemanticRules.add("incorporated-adverb/supplement");
      appliedSemanticRules.add("incorporated-adverb/supplement-object");
      if (effectiveEmbedState !== "possessive") return buildBlockedFrame("nominal-embed-vnc", "supplement-object-embed-must-be-possessive", request);
      if (sourceObjectCount < 1) return buildBlockedFrame("nominal-embed-vnc", "supplement-object-route-requires-transitive-principal", request);
      if (!embedPossessorPerson) return buildBlockedFrame("nominal-embed-vnc", "supplement-object-possessor-required", request);
      const possessionKind = normalizeKey(source.possessionKind || "intimate");
      if (
        possessionKind === "intimate"
        && lexicalFacts.matrixIsApplicative === true
      ) {
        return buildBlockedFrame("nominal-embed-vnc", "intimate-supplement-object-applicative-source-blocked", request);
      }
      appliedSemanticRules.add("incorporated-adverb/intimate-applicative-barrier");
      restrictions.push("possessor-case:possessive-to-objective");
      if (possessionKind === "less-intimate") {
        restrictions.push("less-intimate-applicative-imitation-licensed");
        appliedSemanticRules.add("incorporated-adverb/less-intimate");
      }
      const supplementObjectId = normalizeKey(
        request.supplementObjectId || source.supplementObjectId
          || (sourceObjectCount === 1 ? sourceObjectRequests[0]?.objectId : "")
      );
      if (!supplementObjectId && sourceObjectCount > 1) {
        return buildBlockedFrame("nominal-embed-vnc", "supplement-object-role-choice-required", request, {
          sourceAuthorizationFrame,
          relation: "adverb",
          sourceRouteCandidates: Object.freeze(adverbSourceRouteCandidates),
          sourceRouteChoiceRequired: adverbSourceRouteCandidates.length > 1,
          supplementObjectCandidateIds: Object.freeze(sourceObjectRequests.map(object => object.objectId)),
        });
      }
      if (!sourceObjectRequests.some(
        objectRequest => objectRequest.objectId === supplementObjectId
      )) {
        return buildBlockedFrame("nominal-embed-vnc", "supplement-object-role-mismatch", request);
      }
      const nonspecificHumanPossessor = [
        "te", "tē", "nonspecific-human",
      ].includes(embedPossessorPerson);
      const nonspecificNonhumanPossessor = [
        "tla", "tlā", "nonspecific-nonhuman",
      ].includes(embedPossessorPerson);
      targetObjectRequests = sourceObjectRequests.map(objectRequest => (
        objectRequest.objectId === supplementObjectId
          ? {
            ...objectRequest,
            sourceObjectPerson: objectRequest.objectPerson,
            sourceObjectKind: objectRequest.objectKind,
            objectKind: nonspecificHumanPossessor
              ? "nonspecific-human"
              : nonspecificNonhumanPossessor
                ? "nonspecific-nonhuman"
                : ["1sg", "2sg", "1pl", "2pl"].includes(subject)
                && embedPossessorPerson === subject ? "reflexive" : "specific-projective",
            objectPerson: nonspecificHumanPossessor
              || nonspecificNonhumanPossessor
              ? ""
              : embedPossessorPerson,
          }
          : objectRequest
      ));
      supplementTransformationFrame = deepFreeze({
        kind: "classical-nahuatl-incorporated-adverb-supplement-transformation-frame",
        version: VERSION,
        sourceRole: "supplementary-object",
        sourceState: "possessive",
        possessorPerson: embedPossessorPerson,
        sourcePossessorCase: "possessive",
        targetPossessorCase: "objective",
        targetRole: supplementObjectId,
        sourceObjectPerson: sourceObjectRequests.find(
          objectRequest => objectRequest.objectId === supplementObjectId
        )?.objectPerson || "",
        targetObjectPerson: targetObjectRequests.find(
          objectRequest => objectRequest.objectId === supplementObjectId
        )?.objectPerson || embedPossessorPerson,
        possessionKind,
        matrixDerivationType: lexicalFacts.matrixDerivationType,
        sourceCapturedFromOwnerResult: Boolean(
          lexicalFacts.capturedEmbedResult && lexicalFacts.capturedEmbedState
        ),
        semanticAttachment: "incorporated-embed",
        referentIdentityPreserved: true,
        supplementationRolePreserved: true,
        incorporationRolePreserved: true,
      });
    }
    const matrixParticipantReferenceIds = Object.freeze([
      normalizeKey(source.subjectReferenceId),
      ...(Array.isArray(source.objectReferenceIds)
        ? source.objectReferenceIds.map(normalizeKey)
        : []),
    ].filter(Boolean));
    const suppliedPossessorCandidates = Array.isArray(
      source.possessorReferenceCandidates
    )
      ? [...new Set(source.possessorReferenceCandidates.map(normalizeKey).filter(Boolean))]
      : [];
    const requestedPossessorReferenceId = normalizeKey(
      request.possessorReferenceId || source.possessorReferenceId
    );
    if (
      route === "direct-adverb"
      && ["means", "instrument", "place"].includes(semanticRole)
      && suppliedPossessorCandidates.length > 1
      && !requestedPossessorReferenceId
    ) {
      return buildBlockedFrame("nominal-embed-vnc", "incorporated-adverb-possessor-reference-choice-required", request);
    }
    const possessorReferenceId = requestedPossessorReferenceId
      || (suppliedPossessorCandidates.length === 1
        ? suppliedPossessorCandidates[0]
        : ["supplement-subject", "supplement-object"].includes(route)
          ? normalizeKey(source.embedPossessorReferenceId || "embed-possessor")
          : "");
    if (
      possessorReferenceId
      && suppliedPossessorCandidates.length
      && !suppliedPossessorCandidates.includes(possessorReferenceId)
    ) {
      return buildBlockedFrame("nominal-embed-vnc", "incorporated-adverb-possessor-reference-choice-mismatch", request);
    }
    const possessorCoreferential = Boolean(
      possessorReferenceId
      && matrixParticipantReferenceIds.includes(possessorReferenceId)
    );
    const directPossessorSensitiveAdverb = route === "direct-adverb"
      && ["means", "instrument", "place"].includes(semanticRole);
    if (directPossessorSensitiveAdverb && possessorCoreferential) {
      restrictions.push("coreferential-possessor-deleted");
      appliedSemanticRules.add("incorporated-adverb/direct-possessor-deletion");
    }
    possessorReferenceFrame = Object.freeze({
      kind: "classical-nahuatl-incorporated-adverb-possessor-reference-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      possessorReferenceId,
      possessorReferenceCandidates: Object.freeze(suppliedPossessorCandidates),
      matrixParticipantReferenceIds,
      referenceChoiceRequired: directPossessorSensitiveAdverb
        && suppliedPossessorCandidates.length > 1,
      referenceIdentityUnified: possessorCoreferential,
      possessorRepresentation: route === "supplement-subject"
        ? "promoted-to-matrix-subject"
        : route === "supplement-object"
          ? "promoted-to-matrix-object"
          : directPossessorSensitiveAdverb && possessorCoreferential
        ? "deleted-as-coreferential"
        : possessorReferenceId
          ? "preserved-as-noncoreferential"
          : "not-supplied",
      participantRoleTransitionFrame:
        directPossessorSensitiveAdverb && possessorCoreferential
          ? buildClassicalNahuatlParticipantRoleTransitionFrame({
            operationId: "incorporation:coreferential-possessor-deletion",
            sourceRoles: ["embedded-possessor-expression"],
            targetRoles: ["matrix-participant-reference"],
            retiredSourceRoles: ["embedded-possessor-expression"],
            activatedTargetRoles: [],
            preservedParticipantFacts: [
              "possessor-referent-identity",
              "matrix-participant-reference",
              "typed-source-history",
            ],
          })
          : null,
      referentIdentityAuthority: true,
      nounstemIdentityAuthority: false,
    });
    if (route === "passive-adverbialized-subject") {
      if (sourceObjectCount < 1) {
        return buildBlockedFrame("nominal-embed-vnc", "passive-adverbialized-subject-requires-transitive-active-source", request);
      }
      if (requestedVoice !== "passive") {
        return buildBlockedFrame("nominal-embed-vnc", "passive-adverbialized-subject-requires-passive-target", request, {
          sourceAuthorizationFrame, relation: "adverb",
          sourceRouteCandidates: Object.freeze(adverbSourceRouteCandidates),
          sourceRouteChoiceRequired: adverbSourceRouteCandidates.length > 1,
        });
      }
      targetSubject = normalizeSubject(
        sourceObjectRequests[0]?.objectPerson || "3sg"
      ) || "3sg";
      targetObjectRequests = sourceObjectRequests.map(
        (objectRequest, index) => index === 0
          ? {
            ...objectRequest,
            sourceObjectPerson: objectRequest.objectPerson,
            passiveSubjectPerson: targetSubject,
          }
          : objectRequest
      );
      restrictions.push("active-subject-discarded", "supplementary-subject-adverbialized-before-passive");
      appliedSemanticRules.add("incorporated-adverb/passive-barrier");
      supplementTransformationFrame = deepFreeze({
        kind: "classical-nahuatl-incorporated-adverb-supplement-transformation-frame",
        version: VERSION,
        sourceRole: "supplementary-subject",
        sourceState: effectiveEmbedState || "absolutive",
        sourceActiveSubject: subject,
        sourceActiveObject: sourceObjectRequests[0]?.objectPerson || "",
        targetPassiveSubject: targetSubject,
        targetRole: "incorporated-adverb",
        activeBasicSubjectRepresentation: "discarded",
        supplementarySubjectRepresentation: "incorporated-adverb",
        passiveAgentExpressible: false,
        semanticAttachment: "incorporated-embed",
        supplementationRolePreserved: true,
        incorporationRolePreserved: true,
      });
    }
    if (route === "direct-adverb") appliedSemanticRules.add("incorporated-adverb/direct");
    const adverbRule = ({
      means: "incorporated-adverb/means",
      instrument: "incorporated-adverb/means",
      place: "incorporated-adverb/place",
      time: "incorporated-adverb/time-duration",
      duration: "incorporated-adverb/time-duration",
      cause: "incorporated-adverb/cause-purpose",
      purpose: "incorporated-adverb/cause-purpose",
      manner: "incorporated-adverb/manner",
      "form-style": "incorporated-adverb/manner",
      "compared-manner": "incorporated-adverb/compared-manner",
    })[semanticRole];
    if (adverbRule) appliedSemanticRules.add(adverbRule);
    if (lexicalFacts.agentiveEmbed === true) {
      if (semanticRole !== "compared-manner" && !["supplement-subject", "supplement-object"].includes(route)) {
        return buildBlockedFrame("nominal-embed-vnc", "preterit-agentive-embed-requires-compared-manner", request, {
          sourceAuthorizationFrame,
          relation: "adverb",
          sourceRouteCandidates: Object.freeze(adverbSourceRouteCandidates),
          sourceRouteChoiceRequired: adverbSourceRouteCandidates.length > 1,
        });
      }
      appliedSemanticRules.add("incorporated-adverb/agentive-embed");
    }
    if (adverbSourceRouteCandidates.length > 1 || adverbRoleCandidates.length > 1) {
      appliedSemanticRules.add("nominal-embed/source-ambiguity");
    }
  } else {
    appliedSemanticRules.add("incorporated-complement/base");
    appliedSemanticRules.add("incorporated-complement/voice");
    const complementOrientationCandidates = Array.isArray(
      source.complementOrientationCandidates
    )
      ? [...new Set(source.complementOrientationCandidates
        .map(normalizeKey)
        .filter(candidate => ["subject", "object"].includes(candidate)))]
      : [];
    if (
      !orientation
      && complementOrientationCandidates.length === 1
    ) {
      orientation = complementOrientationCandidates[0];
    }
    if (
      !orientation
      && complementOrientationCandidates.length > 1
    ) {
      return buildBlockedFrame(
        "nominal-embed-vnc",
        "incorporated-complement-orientation-choice-required",
        request
      );
    }
    if (!["subject", "object"].includes(orientation)) {
      return buildBlockedFrame(
        "nominal-embed-vnc",
        "incorporated-complement-orientation-required",
        request
      );
    }
    if (
      complementOrientationCandidates.length
      && !complementOrientationCandidates.includes(orientation)
    ) {
      return buildBlockedFrame(
        "nominal-embed-vnc",
        "incorporated-complement-orientation-choice-mismatch",
        request
      );
    }
    const complementKindCandidates = Array.isArray(
      source.complementKindCandidates
    )
      ? [...new Set(source.complementKindCandidates
        .map(normalizeKey)
        .filter(candidate => [
          "considering", "changing", "pretending", "desiring",
        ].includes(candidate)))]
      : [];
    semanticRole = normalizeKey(
      request.complementKind || source.complementKind
    );
    if (
      orientation === "object"
      && !semanticRole
      && complementKindCandidates.length === 1
    ) {
      semanticRole = complementKindCandidates[0];
    }
    if (
      orientation === "object"
      && !semanticRole
      && complementKindCandidates.length > 1
    ) {
      return buildBlockedFrame(
        "nominal-embed-vnc",
        "object-complement-kind-choice-required",
        request
      );
    }
    if (orientation === "object" && ![
      "considering", "changing", "pretending", "desiring",
    ].includes(semanticRole)) {
      return buildBlockedFrame("nominal-embed-vnc", "object-complement-kind-required", request);
    }
    if (
      orientation === "object"
      && complementKindCandidates.length
      && !complementKindCandidates.includes(semanticRole)
    ) {
      return buildBlockedFrame(
        "nominal-embed-vnc",
        "object-complement-kind-choice-mismatch",
        request
      );
    }
    if (orientation === "subject") semanticRole = "";
    const matrixSubjectReferenceId = normalizeKey(
      source.subjectReferenceId || "matrix-subject"
    );
    const possessiveObjectComplement = orientation === "object"
      && effectiveEmbedState === "possessive";
    if (possessiveObjectComplement && !embedPossessorPerson) {
      return buildBlockedFrame(
        "nominal-embed-vnc",
        "possessive-object-complement-possessor-required",
        request
      );
    }
    const possessorCorefersWithMatrixSubject = possessiveObjectComplement
      && (
        source.embedPossessorCorefersWithSubject === true
        || request.embedPossessorCorefersWithSubject === true
        || (
          ["1sg", "1pl", "2sg", "2pl"].includes(subject)
          && embedPossessorPerson === subject
        )
      );
    const possessiveComplementObjectId = possessiveObjectComplement
      ? normalizeKey(
        source.embedPossessorReferenceId
        || request.embedPossessorReferenceId
        || "patientive-possessor-object"
      )
      : "";
    if (possessiveObjectComplement) {
      const transferredObjectGovernor =
        matrixSemanticFamily === "short-a-type-three-causative-tlani"
          ? "causative"
          : "applicative";
      const transferredPossessorObject = {
        objectId: possessiveComplementObjectId,
        objectKind: possessorCorefersWithMatrixSubject
          ? "reflexive"
          : ["3common", "nonspecific-human"].includes(embedPossessorPerson)
            ? "nonspecific-human"
            : "specific-projective",
        objectPerson: ["3common", "nonspecific-human"].includes(
          embedPossessorPerson
        )
          ? ""
          : embedPossessorPerson,
        governor: transferredObjectGovernor,
        derivationalLevel: sourceObjectRequests.length + 1,
        ...(transferredObjectGovernor === "causative"
          ? { mainlineLinearPriority: true }
          : {}),
        sourceRole: "possessor",
        sourceCase: "possessive",
        targetCase: "objective",
      };
      targetObjectRequests = [
        ...sourceObjectRequests,
        transferredPossessorObject,
      ];
      targetValenceCount = targetObjectRequests.length;
      possessiveComplementObjectTransformationFrame = deepFreeze({
        kind:
          "classical-nahuatl-possessive-complement-object-transformation-frame",
        version: VERSION,
        authorizationStatus: "authorized",
        sourceRole: "possessor",
        sourceCase: "possessive",
        sourcePerson: embedPossessorPerson,
        targetRole: transferredObjectGovernor === "causative"
          ? "mainline-causative-object"
          : "mainline-applicative-object",
        targetCase: "objective",
        targetObjectId: possessiveComplementObjectId,
        targetObjectKind: transferredPossessorObject.objectKind,
        targetObjectPerson: transferredPossessorObject.objectPerson,
        targetObjectGovernor: transferredPossessorObject.governor,
        participantRoleTransitionFrame:
          buildClassicalNahuatlParticipantRoleTransitionFrame({
            operationId: transferredObjectGovernor === "causative"
              ? "incorporated-complement:possessor-to-causative-object"
              : "incorporated-complement:possessor-to-applicative-object",
            sourceRoles: ["source-possessor"],
            targetRoles: [transferredObjectGovernor === "causative"
              ? "mainline-causative-object"
              : "mainline-applicative-object"],
            retiredSourceRoles: ["source-possessor"],
            activatedTargetRoles: [transferredObjectGovernor === "causative"
              ? "mainline-causative-object"
              : "mainline-applicative-object"],
            preservedParticipantFacts: [
              "possessor-participant-identity",
              "typed-source-history",
            ],
          }),
        corefersWithMatrixSubject: possessorCorefersWithMatrixSubject,
        sourceMatrixValence: matrixValence,
        sourceValencePositionCount: sourceObjectCount,
        targetValencePositionCount: targetValenceCount,
        valenceInflationWithoutSuffix: targetValenceCount
          === sourceObjectCount + 1,
        ordinaryValencePrincipleViolated: targetValenceCount
          === sourceObjectCount + 1,
        transformationDerivedAutomatically: true,
        userChoiceRequired: false,
        matrixSemanticFamily,
        typeThreeCausativeMatrix:
          transferredObjectGovernor === "causative",
        referentIdentityAuthority: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
      appliedSemanticRules.add(transferredObjectGovernor === "causative"
        ? "incorporated-complement/possessive-possessor-to-causative-object"
        : "incorporated-complement/possessive-possessor-to-object");
      appliedSemanticRules.add(
        "incorporated-complement/valence-inflation-without-suffix"
      );
    }
    if (activationLicenseFrame) {
      // §35.12 activates the nominal's projective participant while the
      // reflexive still belongs to the matrix. No derivational suffix is added.
      const internal = activatedParent.operationFrame.activatedInternalObjectRequest;
      if (requestedVoice !== "active" || sourceObjectCount !== 1
        || sourceObjectRequests[0].objectKind !== "reflexive"
        || orientation !== "subject" || !internal
        || !["nonspecific-human", "nonspecific-nonhuman"].includes(internal.objectKind)
        || activationLicenseFrame.authorizationStatus !== "authorized"
        || activationLicenseFrame.targetRelation !== "supplementary-object") {
        return buildBlockedFrame("nominal-embed-vnc",
          "activated-agentive-complement-requires-active-reflexive-matrix", request);
      }
      const external = {
        objectId: activationLicenseFrame.targetReferentId,
        objectKind: "specific-projective", objectPerson: activationLicenseFrame.targetObjectPerson,
        governor: internal.governor, derivationalLevel: 1,
        sourceRole: "activated-projective-nominal-object",
      };
      const matrixObject = {...sourceObjectRequests[0],
        sourceGovernor: sourceObjectRequests[0].governor,
        sourceDerivationalLevel: sourceObjectRequests[0].derivationalLevel,
        governor: "lexical", derivationalLevel: 2};
      targetObjectRequests = [external, matrixObject];
      targetValenceCount = 2;
      activatedComplementObjectFrame = deepFreeze({
        kind: "classical-nahuatl-activated-agentive-complement-object-frame",
        authorizationStatus: "authorized", canonicalParentResult: activatedParent,
        activationLicenseFrame, activatedInternalObjectRequest: internal,
        exactMatrixResult: lexicalFacts.capturedMatrixVncResult,
        sourceMatrixObjectRequest: sourceObjectRequests[0],
        targetObjectRequests, matrixReflexivePreserved: true,
        projectiveObjectOutsidePredicate: true, suffixAdded: false,
        ordinaryValencePrincipleException: true,
        callerSuppliedAuthorityAccepted: false, formulaStringAuthority: false, surfaceStringAuthority: false,
      });
      appliedSemanticRules.add("incorporated-complement/activated-projective-object");
    }
    const matrixObjectReferenceIds = Object.freeze(
      targetObjectRequests.map((objectRequest, index) => normalizeKey(
        source.objectReferenceIds?.[index]
        || objectRequest.objectId
      ))
    );
    const suppliedComplementTargetCandidates = Array.isArray(
      source.complementTargetReferenceCandidates
    )
      ? [...new Set(source.complementTargetReferenceCandidates
        .map(normalizeKey).filter(Boolean))]
      : [];
    const eligibleComplementTargets = orientation === "subject"
      ? [matrixSubjectReferenceId]
      : possessiveObjectComplement
        ? [possessiveComplementObjectId]
      : suppliedComplementTargetCandidates.length
        ? suppliedComplementTargetCandidates.filter(
          referenceId => matrixObjectReferenceIds.includes(referenceId)
        )
        : [...matrixObjectReferenceIds];
    if (!eligibleComplementTargets.length) {
      return buildBlockedFrame(
        "nominal-embed-vnc",
        "incorporated-complement-compatible-reference-required",
        request
      );
    }
    const eligibleComplementObjectFacts = deepFreeze(eligibleComplementTargets.map(referenceId => {
      const object = targetObjectRequests[matrixObjectReferenceIds.indexOf(referenceId)];
      return { referenceId, objectId: object?.objectId || "",
        objectKind: object?.objectKind || "", objectPerson: object?.objectPerson || "",
        governor: object?.governor || "", derivationalLevel: object?.derivationalLevel || 0,
        participantFrame: object?.participantFrame || null };
    }));
    const requestedComplementTargetReferenceId = normalizeKey(
      request.complementTargetReferenceId
      || source.complementTargetReferenceId
    );
    if (
      eligibleComplementTargets.length > 1
      && !requestedComplementTargetReferenceId
    ) {
      return buildBlockedFrame(
        "nominal-embed-vnc",
        "incorporated-complement-reference-choice-required",
        request,
        { complementReferenceFrame: deepFreeze({
          kind: "classical-nahuatl-incorporated-complement-reference-frame",
          version: VERSION,
          authorizationStatus: "choice-required",
          orientation,
          matrixSubjectReferenceId,
          matrixObjectReferenceIds,
          eligibleComplementTargetReferenceIds: eligibleComplementTargets,
          eligibleComplementTargets: eligibleComplementObjectFacts,
          targetReferenceChoiceRequired: true,
          grammarAuthority: false,
          callerSuppliedAuthorityAccepted: false,
          formulaStringAuthority: false,
          surfaceStringAuthority: false,
        }) },
      );
    }
    const complementTargetReferenceId =
      requestedComplementTargetReferenceId
      || eligibleComplementTargets[0];
    if (!eligibleComplementTargets.includes(complementTargetReferenceId)) {
      return buildBlockedFrame(
        "nominal-embed-vnc",
        "incorporated-complement-reference-choice-mismatch",
        request
      );
    }
    const suppliedEmbedSubjectReferenceId = normalizeKey(
      source.embedSubjectReferenceId
    );
    if (
      suppliedEmbedSubjectReferenceId
      && suppliedEmbedSubjectReferenceId !== complementTargetReferenceId
    ) {
      return buildBlockedFrame(
        "nominal-embed-vnc",
        "incorporated-complement-embed-subject-must-be-coreferential",
        request
      );
    }
    const embedSubjectReferenceId = suppliedEmbedSubjectReferenceId
      || complementTargetReferenceId;
    appliedSemanticRules.add(orientation === "subject"
      ? "incorporated-complement/subject"
      : semanticRole === "changing"
        ? "incorporated-complement/changing"
        : semanticRole === "desiring"
          ? "incorporated-complement/desiring"
          : "incorporated-complement/considering");
    if (request.preciseAsIfNuance === true) {
      return buildCanonicalSemanticRestrictionFrame({
        constructionKind: "nominal-embed-vnc",
        restrictionId:
          "nominal-embed-toca-as-if-precise-nuance-genuinely-blocked",
        request,
        sourceFrame: {
          kind: "classical-nahuatl-nominal-embed-source-frame",
          embedStem: normalizeStem(source.embedStem),
          matrixStem,
          matrixValence,
          matrixVerbClass: verbClass,
        },
        operationFacts: {
          relation,
          route,
          semanticRole,
          orientation,
          sourceMatrixValence: matrixValence,
          sourceValencePositionCount: sourceObjectCount,
          targetValencePositionCount: targetValenceCount,
          targetSourceValence: valenceFromObjectRequests(
            targetObjectRequests
          ),
        },
      });
    }
    restrictions.push("coreferential-embed-subject-deleted");
    complementReferenceFrame = deepFreeze({
      kind: "classical-nahuatl-incorporated-complement-reference-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      orientation,
      matrixSubjectReferenceId,
      matrixObjectReferenceIds,
      eligibleComplementTargetReferenceIds: Object.freeze(
        eligibleComplementTargets
      ),
      eligibleComplementTargets: eligibleComplementObjectFacts,
      targetReferenceChoiceRequired: eligibleComplementTargets.length > 1,
      complementTargetReferenceId,
      embedSubjectReferenceId,
      referenceIdentityUnified: true,
      embeddedSubjectRepresentation: "deleted-as-coreferential",
      matrixParticipantRepresentation: "preserved",
      participantRoleTransitionFrame:
        buildClassicalNahuatlParticipantRoleTransitionFrame({
          operationId: `incorporated-complement:${orientation}-reference-unification`,
          sourceRoles: ["embedded-subject-expression"],
          targetRoles: [`matrix-${orientation}-reference-carrier`],
          retiredSourceRoles: ["embedded-subject-expression"],
          activatedTargetRoles: [],
          preservedParticipantFacts: [
            "embedded-subject-referent-identity",
            "matrix-participant-reference",
            "typed-source-history",
          ],
        }),
      referenceIdentityDerivedFromComplementSelection:
        !suppliedEmbedSubjectReferenceId,
      referentIdentityAuthority: true,
      nounstemIdentityAuthority: false,
      translationAuthority: false,
    });
    complementScopeFrame = deepFreeze({
      kind: "classical-nahuatl-incorporated-complement-scope-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      necessaryCompletion: true,
      externalOrInternalPlacement: "incorporated-inside-governing-vnc",
      orientation,
      complementKind: semanticRole || "subject-complement",
      orientationCandidates: Object.freeze(complementOrientationCandidates),
      orientationChoiceRequired: complementOrientationCandidates.length > 1,
      complementKindCandidates: Object.freeze(complementKindCandidates),
      complementKindChoiceRequired: orientation === "object"
        && complementKindCandidates.length > 1,
      matrixValencePreserved: !possessiveObjectComplement,
      possessiveComplementObjectTransformationFrame,
      contextualReadings: Object.freeze(
        orientation === "subject"
          ? ["subject-complement"]
          : semanticRole === "changing"
            ? ["changing", "making-into"]
            : semanticRole === "pretending"
              ? ["pretending", "claiming-without-foundation"]
              : semanticRole === "desiring"
                ? ["desiring", "wanting-to-become-or-be-regarded-as"]
                : ["considering", "knowing-as"]
      ),
      lexicalReadingAuthority: false,
      translationAuthority: false,
    });
  }

  const embedReduplication = normalizeKey(request.embedReduplication || "none");
  // Admission may leave choices pending; execution must satisfy every
  // declared contextual-use condition, including obligatory copying.
  const contextualUse = lexicalFacts.capturedExactOrdinaryNncPredicateFrame
    ?.attestedPredicateEmbedUseFrame;
  if (contextualUse && ["embedReduplication", "similarityReduplicationShape"].some(key =>
    Object.hasOwn(contextualUse, key)
    && normalizeKey(request[key]) !== normalizeKey(contextualUse[key]))) {
    return buildBlockedFrame("nominal-embed-vnc",
      "attested-predicate-embed-contextual-choices-required", request);
  }
  const embedCopyingSelected = !["none", "plain-source"].includes(embedReduplication);
  const matrixReduplication = normalizeKey(request.matrixReduplication || "none");
  const similarityReduplicationShape = normalizeKey(request.similarityReduplicationShape);
  if (!["none", "affinity", "distributive-varietal", "similarity", "plain-source"].includes(
    embedReduplication
  )) {
    return buildBlockedFrame(
      "nominal-embed-vnc",
      "nominal-embed-reduplication-selection-invalid",
      request
    );
  }
  if (!["none", "affinity", "distributive-varietal", "frequentative"].includes(
    matrixReduplication
  )) {
    return buildBlockedFrame(
      "nominal-embed-vnc",
      "nominal-matrix-reduplication-selection-invalid",
      request
    );
  }
  if (
    similarityReduplicationShape
    && (embedReduplication !== "similarity"
      || !["short-cv", "long-cv", "glottalized-cv"].includes(similarityReduplicationShape))
  ) return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-similarity-reduplication-shape-invalid", request);
  if (embedReduplication === "similarity"
    && lexicalFacts.capturedExactOrdinaryNncPredicateFrame
    && !similarityReduplicationShape
  ) return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-similarity-reduplication-shape-required", request);
  let embedReformationFrame = null;
  if (embedReduplication === "plain-source") {
    if (relation !== "complement") return buildBlockedFrame(
      "nominal-embed-vnc", "nominal-plain-source-requires-complement", request
    );
    embedReformationFrame = reformPlainSourceComplementEmbed(
      lexicalFacts.capturedExactOrdinaryNncPredicateFrame, target
    );
    if (embedReformationFrame.authorizationStatus !== "authorized") return buildBlockedFrame(
      "nominal-embed-vnc", embedReformationFrame.blockReason, request
    );
    appliedSemanticRules.add("nominal-complement/explicit-plain-source-reformation");
  }
  let similarityPrefixFrame = null;
  if (embedReduplication === "similarity" && similarityReduplicationShape) {
    const vowelCapability = similarityReduplicationShape === "long-cv"
      ? "getClassicalNahuatlLongVowel" : "getClassicalNahuatlShortVowel";
    if (typeof target.getClassicalNahuatlInitialVowelFrame !== "function"
      || typeof target[vowelCapability] !== "function"
    ) return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-similarity-vowel-capability-required", request);
    const initial = target.getClassicalNahuatlInitialVowelFrame(embedShape.realizedStem);
    if (initial?.authorizationStatus !== "authorized") {
      return buildBlockedFrame("nominal-embed-vnc", initial?.blockReason || "nominal-embed-similarity-initial-vowel-required", request);
    }
    const vowel = target[vowelCapability](initial.vowel);
    if (!vowel) return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-similarity-vowel-required", request);
    similarityPrefixFrame = deepFreeze({
      kind: "classical-nahuatl-nominal-embed-similarity-prefix-frame",
      authorizationStatus: "authorized", initial, shape: similarityReduplicationShape,
      prefix: `${initial.onset}${vowel}${similarityReduplicationShape === "glottalized-cv" ? "h" : ""}`,
      sourceQuantityPreserved: true, formulaStringAuthority: false, surfaceStringAuthority: false,
    });
  }
  if (embedCopyingSelected || matrixReduplication !== "none") {
    appliedSemanticRules.add("nominal-embed/reduplication");
    if (lexicalFamily === "ih") appliedSemanticRules.add("nominal-embed/ih-interaction");
  }
  const realizedEmbed = embedReformationFrame
    ? embedReformationFrame.realizedStem
    : similarityPrefixFrame
    ? joinStemParts([similarityPrefixFrame.prefix, embedShape.realizedStem])
    : ["affinity", "distributive-varietal", "similarity"].includes(embedReduplication)
    ? reduplicateInitial(embedShape.realizedStem, embedReduplication === "affinity" ? "affinity" : "distributive", "initial")
    : embedShape.realizedStem;
  // §30.13 il+tēqui has the attested lexical operand tequi. This
  // alternation does not shorten tēqui with poz or any ordinary noun embed.
  const lexicalMatrixShapeFrame = relation === "adverb"
    && lexicalFacts.uniqueEmbedAnalysisFrame?.sourceStem === "il"
    && matrixStem.replaceAll("-", "") === "tēqui"
    ? deepFreeze({
      kind: "classical-nahuatl-nominal-embed-lexical-matrix-shape-frame",
      authorizationStatus: "authorized",
      ruleId: "cn-l30-13-il-tequi-lexical-vowel-alternation",
      sourceStem: matrixStem,
      realizedStem: matrixStem.replace("ē", "e"),
      lexicalQuantityAlternation: true,
      productiveShorteningRule: false,
      sourceAuthorizationFrame,
      formulaStringAuthority: false, surfaceStringAuthority: false,
    }) : null;
  if (lexicalMatrixShapeFrame) appliedSemanticRules.add(lexicalMatrixShapeFrame.ruleId);
  const matrixFormation = normalizeKey(request.matrixFormation || "ordinary");
  if (!["ordinary", "destockal-ca", "destockal-tz-a"].includes(matrixFormation)) {
    return buildBlockedFrame("nominal-embed-vnc", "nominal-matrix-formation-not-recognized", request);
  }
  const ihStockSelection = target.buildClassicalNahuatlNominalIhStockFormation?.(sourceAuthorizationFrame) || null;
  const ihMatrixStockFormationFrame = ihStockSelection?.authorizationStatus === "authorized" ? ihStockSelection : null;
  if (matrixFormation !== "ordinary" && !ihMatrixStockFormationFrame) {
    return buildBlockedFrame("nominal-embed-vnc", "ih-nominal-stock-source-and-formation-required", request);
  }
  if (ihMatrixStockFormationFrame) appliedSemanticRules.add("nominal-embed/ih-destockal-stock-formation");
  const matrixOperand = ihMatrixStockFormationFrame?.targetStem
    || lexicalMatrixShapeFrame?.realizedStem || matrixStem;
  const realizedMatrix = ihMatrixStockFormationFrame && matrixReduplication === "frequentative"
    ? ihMatrixStockFormationFrame.shortMatrixReduplicatedStem
    : ["affinity", "distributive-varietal", "frequentative"].includes(matrixReduplication)
      ? reduplicateInitial(matrixOperand, matrixReduplication === "affinity" ? "affinity" : "distributive", "initial")
      : matrixOperand;
  const reduplicationSemanticScopeCandidates = Array.isArray(
    source.reduplicationSemanticScopeCandidates
  )
    ? [...new Set(source.reduplicationSemanticScopeCandidates
      .map(normalizeKey)
      .filter(candidate => [
        "event-frequency",
        "subject-distribution",
        "alternating-distribution",
        "similarity",
        "affinity",
        "distribution-variety",
      ].includes(candidate)))]
    : [];
  let reduplicationSemanticScope = normalizeKey(
    request.reduplicationSemanticScope
    || source.reduplicationSemanticScope
  );
  if (
    !reduplicationSemanticScope
    && reduplicationSemanticScopeCandidates.length === 1
  ) {
    reduplicationSemanticScope = reduplicationSemanticScopeCandidates[0];
  }
  if (
    !reduplicationSemanticScope
    && reduplicationSemanticScopeCandidates.length > 1
  ) {
    return buildBlockedFrame(
      "nominal-embed-vnc",
      "nominal-embed-reduplication-semantic-scope-choice-required",
      request
    );
  }
  if (
    reduplicationSemanticScope
    && reduplicationSemanticScopeCandidates.length
    && !reduplicationSemanticScopeCandidates.includes(
      reduplicationSemanticScope
    )
  ) {
    return buildBlockedFrame(
      "nominal-embed-vnc",
      "nominal-embed-reduplication-semantic-scope-choice-mismatch",
      request
    );
  }
  const derivedReduplicationSemanticScopes = Object.freeze([
    ...(embedReduplication === "similarity"
      ? ["similarity"]
      : embedReduplication === "distributive-varietal"
        ? ["distribution-variety"]
        : embedReduplication === "affinity"
          ? ["affinity"]
          : []),
    ...(matrixReduplication === "frequentative"
      ? ["event-frequency"]
      : matrixReduplication === "distributive-varietal"
        ? ["distribution-variety"]
        : matrixReduplication === "affinity"
          ? ["affinity"]
          : []),
  ]);
  if (
    reduplicationSemanticScope
    && !reduplicationSemanticScopeCandidates.length
    && !derivedReduplicationSemanticScopes.includes(
      reduplicationSemanticScope
    )
  ) {
    return buildBlockedFrame(
      "nominal-embed-vnc",
      "nominal-embed-reduplication-semantic-scope-not-licensed",
      request
    );
  }
  const selectedReduplicationSemanticScopes = Object.freeze(
    reduplicationSemanticScope
      ? [reduplicationSemanticScope]
      : [...new Set(derivedReduplicationSemanticScopes)]
  );
  const reduplicationFrame = deepFreeze({
    kind: "classical-nahuatl-nominal-embed-reduplication-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    embedSelected: embedCopyingSelected,
    matrixSelected: matrixReduplication !== "none",
    targetScope: embedCopyingSelected
      && matrixReduplication !== "none"
      ? "both"
      : embedCopyingSelected
        ? "embed"
        : matrixReduplication !== "none"
          ? "matrix"
          : "none",
    embedOperation: embedCopyingSelected ? embedReduplication : "none",
    similarityReduplicationShape,
    similarityPrefixFrame,
    matrixOperation: matrixReduplication,
    sourceEmbedStem: embedShape.realizedStem,
    realizedEmbedStem: realizedEmbed,
    sourceMatrixStem: matrixStem,
    realizedMatrixStem: realizedMatrix,
    semanticScopeCandidates: Object.freeze(
      reduplicationSemanticScopeCandidates
    ),
    semanticScopeChoiceRequired:
      reduplicationSemanticScopeCandidates.length > 1,
    selectedSemanticScopes: selectedReduplicationSemanticScopes,
    sourceBoundariesPreserved: true,
    translationAuthority: false,
    documentaryExampleAuthority: false,
  });
  let boundaryRealizedEmbed = realizedEmbed;
  let boundaryRealizedMatrix = realizedMatrix;
  let matrixSupportiveInitialIFrame = null;
  if (lexicalFacts.capturedMatrixVncResult
    && lexicalFacts.capturedMatrixInitialISelection === "supportive"
    && /^i/u.test(realizedMatrix)
    && boundaryRealizedEmbed) {
    // The matrix's imaginary i belongs to its captured analysis. A real
    // compound contact removes its need only when the sound owner validates
    // the resulting sequence; the matrix's underlying Source stays intact.
    const contact = target.buildClassicalNahuatlSupportiveVowelFrame?.({
      sourceSegments: [boundaryRealizedEmbed.replaceAll("-", ""),
        "i", realizedMatrix.slice(1).replaceAll("-", "")],
      tokenLevelLegal: true, supportiveVowelNeeded: false,
      insertionPosition: "before", supportiveIndex: 1,
    });
    if (target.isClassicalNahuatlTranscriptionAnalysisFrame?.(contact) === true
      && contact.authorizationStatus === "authorized") {
      matrixSupportiveInitialIFrame = contact;
      boundaryRealizedMatrix = realizedMatrix.slice(1);
      appliedSemanticRules.add(contact.selectedRuleId);
    }
  }
  let boundaryAssimilationFrame = null;
  if (
    relation === "complement"
    && /uh$/u.test(realizedEmbed)
    && /^m/u.test(realizedMatrix)
  ) {
    // Keep the written constituent boundary. Andrews distinguishes uh+m
    // from its common assimilated spelling mm; final glottal h is not w.
    boundaryRealizedEmbed = realizedEmbed;
    boundaryAssimilationFrame = deepFreeze({
      kind: "classical-nahuatl-nominal-embed-boundary-assimilation-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      sourceFinal: "uh-as-w",
      spokenTargetSequence: "m-m",
      writtenSourceSequencePreserved: true,
      matrixInitial: "m",
      targetSequence: "m-m",
      sourceEmbedStem: realizedEmbed,
      realizedEmbedStem: boundaryRealizedEmbed,
      sourceAnalysisPreserved: true,
      formulaStringAuthority: false,
      exampleStemAuthority: false,
    });
    appliedSemanticRules.add("incorporated-complement/w-plus-m-assimilation");
  } else if (
    lexicalFacts.patientiveNncEmbed === true
    && (matrixSemanticFamily === "short-a-type-three-causative-tlani"
      || relation === "complement" && orientation === "object"
        && semanticRole === "desiring" && matrixStem === "tlani")
    && /l$/u.test(realizedEmbed)
    && /^tl/u.test(realizedMatrix)
  ) {
    boundaryRealizedMatrix = realizedMatrix.replace(/^tl/u, "l");
    boundaryAssimilationFrame = deepFreeze({
      kind: "classical-nahuatl-nominal-embed-boundary-assimilation-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      sourceFinal: "l",
      matrixInitial: "tl",
      targetSequence: "l-l",
      sourceEmbedStem: realizedEmbed,
      sourceMatrixStem: realizedMatrix,
      realizedEmbedStem: boundaryRealizedEmbed,
      realizedMatrixStem: boundaryRealizedMatrix,
      sourceAnalysisPreserved: true,
      shapeConditionAuthorizesRealization: true,
      exampleStemAuthority: false,
      formulaStringAuthority: false,
    });
    appliedSemanticRules.add(
      "patientive-compound/l-plus-tl-to-l-plus-l"
    );
  }
  let embedBoundarySpellingFrame = null;
  let embedOpenTransitionFrame = null;
  let embedBoundaryVowelFrame = null;
  if (lexicalFacts.embedLexicalRule === "nose-before-ana-vowel-fusion") {
    // The attested boundary is lexical. Andrews presents vowel fusion as a
    // probable analysis; the shared short-vowel owner preserves matrix ā.
    embedBoundaryVowelFrame = target.buildClassicalNahuatlVowelElisionFrame?.({
      sourceMorpheme: boundaryRealizedEmbed, elisionSide: "final",
      stressGroupCombination: true, indicatedInWriting: true,
    });
    if (embedBoundaryVowelFrame?.authorizationStatus !== "authorized") {
      return buildBlockedFrame("nominal-embed-vnc",
        embedBoundaryVowelFrame?.blockReason || "nominal-embed-boundary-vowel-capability-required", request);
    }
    boundaryRealizedEmbed = embedBoundaryVowelFrame.outputForm;
    appliedSemanticRules.add("incorporated-adverb/lexical-boundary-vowel-fusion");
  }
  if (embedShape.ruleId === "nominal-embed-cuica-to-cuic-exception") {
    if (typeof target.buildClassicalNahuatlDerivationalBoundarySpellingFrame !== "function") {
      return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-boundary-spelling-capability-required", request);
    }
    // The lexical exception removes a; the shared Lesson 2 owner then spells
    // the retained consonant against the matrix's actual initial vowel.
    embedBoundarySpellingFrame = target.buildClassicalNahuatlDerivationalBoundarySpellingFrame({
      sourceStem: source.embedStem,
      retainedStem: boundaryRealizedEmbed,
      followingMorpheme: boundaryRealizedMatrix,
    });
    if (embedBoundarySpellingFrame.authorizationStatus !== "authorized") {
      return buildBlockedFrame("nominal-embed-vnc", embedBoundarySpellingFrame.blockReason, request);
    }
    boundaryRealizedEmbed = embedBoundarySpellingFrame.realizedRetainedStem;
  }
  // §2.5 normally preserves vocable-final uh at an open compound boundary.
  // Its optional hu writing changes spelling, never the noun's use-stem.
  const embedBoundarySpellingCandidates = /uh$/u.test(boundaryRealizedEmbed)
    && /^[aāeēiīoō]/u.test(boundaryRealizedMatrix)
    ? Object.freeze(["uh", "hu"]) : Object.freeze([]);
  const requestedBoundarySpelling = normalizeKey(request.embedBoundarySpelling || "");
  if (requestedBoundarySpelling) {
    if (!embedBoundarySpellingCandidates.includes(requestedBoundarySpelling)) {
      return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-open-transition-spelling-not-licensed", request);
    }
    embedOpenTransitionFrame = target.buildClassicalNahuatlOpenTransitionFrame?.({
      boundaryType: "compound", stemFinalPhoneme: "[w]",
      followingVowel: boundaryRealizedMatrix[0],
      requestedSpelling: requestedBoundarySpelling,
    });
    if (target.isClassicalNahuatlTranscriptionAnalysisFrame?.(embedOpenTransitionFrame) !== true
      || embedOpenTransitionFrame.authorizationStatus !== "authorized"
      || !["uh", "hu"].includes(embedOpenTransitionFrame.outputSpelling)) {
      return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-open-transition-owner-required", request);
    }
    boundaryRealizedEmbed = boundaryRealizedEmbed.slice(0, -2)
      + embedOpenTransitionFrame.outputSpelling;
    appliedSemanticRules.add(embedOpenTransitionFrame.selectedRuleId);
  }
  const compoundStem = joinStemParts([
    boundaryRealizedEmbed,
    boundaryRealizedMatrix,
  ]);
  const characteristicPatientiveCapture =
    lexicalFacts.capturedEmbedPatientiveCaptureFrame
      ?.characteristicPropertyPatientive === true
      ? lexicalFacts.capturedEmbedPatientiveCaptureFrame
      : null;
  const fullCharacteristicEmbedSelected = Boolean(
    characteristicPatientiveCapture
    && normalizeStem(source.embedStem)
      === normalizeStem(
        characteristicPatientiveCapture.characteristicMatrixFullEmbedStem
      )
  );
  const canonicalCharacteristicEmbedStem = fullCharacteristicEmbedSelected
    ? normalizeStem(source.embedStem).replaceAll("-", "")
    : "";
  const canonicalVncSourceStem = fullCharacteristicEmbedSelected
    ? joinStemParts([canonicalCharacteristicEmbedStem, realizedMatrix])
    : boundaryAssimilationFrame?.targetSequence === "l-l"
      ? joinStemParts([boundaryRealizedEmbed, realizedMatrix])
      : compoundStem;
  const uniqueEmbedAnalysisFrame = lexicalFacts.uniqueEmbedAnalysisFrame || null;
  const requestedInitialISelection = normalizeKey(
    source.embedInitialISelection || ""
  );
  const uniqueInitialISelection = embedCopyingSelected
    ? "real"
    : ["real", "supportive"].includes(requestedInitialISelection)
      ? requestedInitialISelection
      : ["real", "supportive"].includes(
        uniqueEmbedAnalysisFrame?.initialIAnalysis
      )
        ? uniqueEmbedAnalysisFrame.initialIAnalysis
        : uniqueEmbedAnalysisFrame?.initialIAnalysis === "variable"
          ? "real"
          : "";
  const ordinaryEmbedSource = lexicalFacts.capturedExactOrdinaryNncPredicateFrame
    ?.canonicalResultFrame?.sourceFrame
    || (lexicalFacts.ordinaryNncEmbed
      ? lexicalFacts.capturedEmbedResult?.sourceFrame : null);
  const ordinaryEmbedInitialISelection = ordinaryEmbedSource
    && typeof ordinaryEmbedSource.supportiveInitialI === "boolean"
      ? ordinaryEmbedSource.supportiveInitialI ? "supportive" : "real"
      : "";
  const preteritEmbedInitialISelection = lexicalFacts.capturedEmbedResult
    ?.sourceFrame?.preteritVncCaptureFrame?.canonicalVncSourceAnalysisFrame
    ?.sourceInitialIKind || "";
  const patientiveCapture = lexicalFacts.capturedEmbedPatientiveCaptureFrame;
  const patientiveEmbedInitialISelection = lexicalFacts.patientiveNncEmbed === true
    && target.isClassicalNahuatlPatientiveNncContinuationCaptureFrame?.(patientiveCapture) === true
    && target.getClassicalNahuatlVncContinuationSourceConstituents?.(
      patientiveCapture.canonicalVncResult,
    )?.sourceInitialISelection === "real"
      ? "real" : "";
  const adjectivalEmbedInitialISelection = lexicalFacts.capturedAdjectivalModificationFrame
    ?.modifierPart?.sourceInitialISelection || "";
  const adverbialEmbedInitialISelection = lexicalFacts.canonicalAdverbialEmbedResult
    ?.lexicalNncSourceFrame?.initialIAnalysis?.kind || "";
  const compoundInitialISelection = /^[iī]/u.test(compoundStem)
    && (
      lexicalFacts.embedLexicalFamily
      || lexicalFacts.embedSemanticClass
      || ordinaryEmbedInitialISelection
      || preteritEmbedInitialISelection
      || patientiveEmbedInitialISelection
      || adjectivalEmbedInitialISelection
      || adverbialEmbedInitialISelection
    )
      ? adverbialEmbedInitialISelection || ordinaryEmbedInitialISelection || preteritEmbedInitialISelection || patientiveEmbedInitialISelection || adjectivalEmbedInitialISelection || uniqueInitialISelection || "real"
      : "";
  const targetSourceValence = valenceFromObjectRequests(targetObjectRequests);
  const targetVoice = lexicalFacts.capturedMatrixInherentImpersonal
    || lexicalFacts.capturedMatrixInternalTlaImpersonal
    || route === "supplement-subject" && ["te", "tē", "nonspecific-human"].includes(embedPossessorPerson)
    ? "impersonal" : requestedVoice;
  const targetSpecificObject = targetObjectRequests.find(objectRequest => (
    normalizeKey(objectRequest.objectKind) === "specific-projective"
    && Boolean(normalizeKey(objectRequest.objectPerson))
  )) || null;
  const targetHasOnlyNonspecificObjects = targetObjectRequests.length > 0
    && targetObjectRequests.every(objectRequest => [
      "nonspecific-human",
      "nonspecific-nonhuman",
    ].includes(normalizeKey(objectRequest.objectKind)));
  const passiveAvailable = Boolean(targetSpecificObject);
  const impersonalAvailable = targetObjectRequests.length === 0
    || targetHasOnlyNonspecificObjects;
  const availableNonactiveVoices = Object.freeze([
    ...(passiveAvailable ? ["passive"] : []),
    ...(impersonalAvailable ? ["impersonal"] : []),
  ]);
  if (targetVoice === "passive" && !passiveAvailable) {
    return buildBlockedFrame(
      "nominal-embed-vnc",
      relation === "object" && targetObjectRequests.length === 0
        ? "incorporated-object-from-single-object-matrix-cannot-passivize"
        : "incorporated-compound-passive-requires-specific-object",
      request
    );
  }
  if (targetVoice === "impersonal" && !impersonalAvailable) {
    return buildBlockedFrame(
      "nominal-embed-vnc",
      "incorporated-compound-impersonal-requires-intransitive-or-nonspecific-objects",
      request
    );
  }
  if (targetVoice === "passive") {
    if (route !== "passive-adverbialized-subject") {
      targetSubject = normalizeSubject(
        targetSpecificObject?.objectPerson || "3sg"
      ) || "3sg";
    }
    restrictions.push("source-object-promoted-to-passive-subject");
    appliedSemanticRules.add("nominal-embed/nonactive-continuation");
    appliedSemanticRules.add("nominal-embed/passive-continuation");
  } else if (targetVoice === "impersonal") {
    targetSubject = "3sg";
    restrictions.push("faceless-third-singular-impersonal-subject");
    appliedSemanticRules.add("nominal-embed/nonactive-continuation");
    appliedSemanticRules.add("nominal-embed/impersonal-continuation");
  }
  const nonactiveContinuationFrame = deepFreeze({
    kind: "classical-nahuatl-nominal-embed-nonactive-continuation-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    completedCompoundStem: compoundStem,
    completedCompoundValence: targetSourceValence,
    completedCompoundObjectRequests: Object.freeze(targetObjectRequests),
    availableNonactiveVoices,
    selectedVoice: targetVoice,
    passiveAvailable,
    impersonalAvailable,
    sourceMatrixSubject: subject,
    targetFiniteSubject: targetSubject,
    passiveSubjectSourceObjectId: targetVoice === "passive"
      ? targetSpecificObject?.objectId || ""
      : "",
    impersonalSubjectStructure: targetVoice === "impersonal"
      ? "faceless-third-singular-nominative"
      : "",
    embedIsFiniteSubject: false,
    embedIsAgent: false,
    passiveAgentExpressible: false,
    ordinaryNonactiveOwnerReused: true,
    translationAuthority: false,
    exampleStemAuthority: false,
  });
  const adverbScopeFrame = relation === "adverb" && semanticRole
    ? deepFreeze({
      kind: "classical-nahuatl-incorporated-adverb-scope-frame",
      version: VERSION,
      semanticRole,
      scope: ({
        place: "location",
        time: "time",
        duration: "temporal-extent",
        cause: "cause",
        purpose: "purpose",
        manner: "manner",
        "form-style": "form-style",
        "compared-manner": "participant-comparison",
      })[semanticRole] || semanticRole,
      contextualReadings: Object.freeze(({
        cause: ["cause", "lack-cause"],
        purpose: ["purpose", "lack-purpose"],
        "form-style": ["form", "style", "nature", "resemblance"],
      })[semanticRole] || [semanticRole]),
      comparisonTarget: semanticRole === "compared-manner" ? orientation : "",
      comparisonTargetCandidates: Object.freeze(
        semanticRole === "compared-manner"
          ? comparisonTargetCandidates.length
            ? comparisonTargetCandidates
            : sourceObjectCount > 0
              ? ["subject", "object"]
              : ["subject"]
          : []
      ),
      comparisonTargetChoiceRequired: semanticRole === "compared-manner"
        && sourceObjectCount > 0
        && (comparisonTargetCandidates.length
          ? comparisonTargetCandidates.length > 1
          : true),
      contextualReadingAuthority: false,
      translationAuthority: false,
    })
    : null;
  const operationFrame = deepFreeze({
    kind: "classical-nahuatl-nominal-embed-operation-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    relation,
    route,
    sourceRouteCandidates: Object.freeze(adverbSourceRouteCandidates),
    sourceRouteChoiceRequired: relation === "adverb"
      && adverbSourceRouteCandidates.length > 1,
    semanticRole,
    semanticRoleCandidates: Object.freeze(adverbRoleCandidates),
    semanticRoleChoiceRequired: relation === "adverb"
      && !["supplement-subject", "supplement-object"].includes(route)
      && adverbRoleCandidates.length > 1,
    adverbSourceStructure,
    adverbScopeFrame,
    complementReferenceFrame,
    complementScopeFrame,
    activatedComplementObjectFrame,
    embedNegativeScopeFrame: lexicalFacts.capturedEmbedNegativeProjection || null,
    embedReformationFrame,
    possessiveComplementObjectTransformationFrame,
    possessiveIncorporatedObjectTransformationFrame,
    lexicalMatrixShapeFrame,
    ihMatrixStockFormationFrame,
    ihMatrixStockOptions: Object.freeze(ihStockSelection?.optionIds || []),
    uniqueEmbedAnalysisFrame: uniqueEmbedAnalysisFrame
      ? deepFreeze({
        ...uniqueEmbedAnalysisFrame,
        selectedInitialIAnalysis: compoundInitialISelection
          || uniqueEmbedAnalysisFrame.initialIAnalysis,
        reduplicationForcesRealInitialVowel:
          embedCopyingSelected,
        sourceBoundaries: Object.freeze(
          normalizeStem(source.embedStem).split("-").filter(Boolean)
        ),
      })
      : null,
    orientation,
    sourceMatrixSubject: subject,
    targetMatrixSubject: targetSubject,
    sourceMatrixValence: matrixValence,
    sourceValencePositionCount: sourceObjectCount,
    targetValencePositionCount: targetValenceCount,
    targetSourceValence,
    selectedVoice: targetVoice,
    sourceObjectRequests,
    targetObjectRequests,
    incorporatedObjectId: relation === "object"
      ? selectedIncorporatedObjectId
      : "",
    incorporatedObjectRequest: relation === "object"
      ? sourceObjectRequests.find(
        objectRequest => objectRequest.objectId === selectedIncorporatedObjectId
      ) || null
      : null,
    incorporatedObjectCandidateIds: relation === "object"
      ? Object.freeze(
        (Array.isArray(source.incorporatedObjectCandidateIds)
          ? source.incorporatedObjectCandidateIds.map(normalizeKey).filter(
            objectId => sourceObjectRequests.some(
              objectRequest => objectRequest.objectId === objectId
            )
          )
          : [sourceObjectRequests[0]?.objectId]).filter(Boolean)
      )
      : Object.freeze([]),
    incorporatedObjectRoleChoiceRequired: relation === "object"
      && Array.isArray(source.incorporatedObjectCandidateIds)
      && source.incorporatedObjectCandidateIds.length > 1,
    remainingObjectIds: Object.freeze(
      targetObjectRequests.map(objectRequest => objectRequest.objectId)
    ),
    matrixTlaFusion,
    preteritAgentiveVncEmbedAnalysisFrame,
    matrixFormation: matrixTlaFusion
      ? "tla-fused-intransitive"
      : possessiveIncorporatedObjectTransformationFrame
        ? "patientive-incorporated-object-matrix"
      : "ordinary-matrix",
    possessorReferenceFrame,
    embedBoundaryVowelFrame,
    embedBoundaryVowelAnalysisCertainty: embedBoundaryVowelFrame ? "probable" : "",
    supplementTransformationFrame,
    embedShape,
    boundaryAssimilationFrame,
    embedBoundarySpellingFrame,
    embedOpenTransitionFrame,
    embedBoundarySpellingCandidates,
    embedInternalBoundaries: Object.freeze(
      normalizeStem(source.embedStem).split("-").filter(Boolean)
    ),
    embedInternalBoundariesPreserved: true,
    compoundStem,
    matrixSupportiveInitialIFrame,
    embedReduplication,
    matrixReduplication,
    reduplicationFrame,
    nonactiveContinuationFrame,
    restrictions,
    appliedSemanticRules: Object.freeze([...appliedSemanticRules]),
    embedIsAgent: false,
    embedIsGrammaticalSubject: false,
    passiveAgentExpressible: false,
    valenceChanged: activatedComplementObjectFrame != null || relation === "object"
      || possessiveComplementObjectTransformationFrame != null
      || possessiveIncorporatedObjectTransformationFrame != null,
    callerSuppliedDerivedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  const vncRequest = {
    sourceStem: canonicalVncSourceStem,
    verbClass: ihMatrixStockFormationFrame?.targetClass || verbClass,
    sourceValence: targetSourceValence,
    sourceObjectRequests: targetObjectRequests,
    objectPerson: targetObjectRequests[0]?.objectPerson || "",
    subject: targetVoice === "passive" && route !== "passive-adverbialized-subject"
      ? subject : targetSubject,
    ...(targetVoice === "passive" && lexicalFacts.capturedMatrixSubjectContext
      ? lexicalFacts.capturedMatrixSubjectContext : {}),
    ...(route === "passive-adverbialized-subject" ? {sourceSubject: subject} : {}),
    ...(lexicalFacts.canonicalRestrictedMatrixSourceFrame ? {
      sourceEmbedStem: lexicalFacts.canonicalAdverbialEmbedResult.wordSurface,
      sourceMatrixStem: lexicalFacts.canonicalRestrictedMatrixSourceFrame.sourceStem,
      sourceSubject: targetSubject,
      sourceSubjectAnimacy: request.subjectAnimacy,
      sourceSubjectHumanness: request.subjectHumanness,
      sourceSubjectNumber: request.subjectNumber,
    } : {}),
    mood: normalizeKey(request.mood || "indicative"),
    tense: normalizeKey(request.tense || "present"),
    requestedVoice: targetVoice,
    nonactiveOptionId: normalizeKey(
      lexicalFacts.capturedMatrixInherentImpersonal
        ? "inherent-impersonal"
        : lexicalFacts.capturedMatrixInternalTlaImpersonal
          ? "tla-impersonal"
        : request.nonactiveOptionId || source.nonactiveOptionId
    ),
    outputScope: "single",
    incorporatedAdverb: relation === "adverb",
    directionalPrefix: request.directionalPrefix || "",
    sourceInitialISelection: compoundInitialISelection,
    requestedCausativeSpecificShuntlineRealization:
      targetObjectRequests.some(objectRequest => (
        objectRequest.governor === "causative"
      ))
      && targetObjectRequests.some(objectRequest => (
        objectRequest.objectKind === "specific-projective"
        && objectRequest.governor !== "causative"
      ))
        ? "silent"
        : "",
  };
  const retainedCompound = lexicalFacts.capturedMatrixVncResult;
  // Resolve only authenticated wrappers; printed sentence text has no authority.
  const retainedMatrixSource = target.isClassicalNahuatlVncSentenceResultFrame?.(retainedCompound) === true
    ? retainedCompound.canonicalResultFrame : retainedCompound;
  const retainedMatrixNucleus = target.isClassicalNahuatlVncApplicationFrame?.(retainedMatrixSource) === true
    ? retainedMatrixSource.resultFrame : retainedMatrixSource;
  const retainedMatrixParadigm = retainedMatrixNucleus?.selectedMachineryFrame?.lesson11ParadigmPlan;
  const compoundPrefixCoordinate = relation === "adverb"
    && route === "direct-adverb"
    && semanticRole === "manner"
    && !similarityPrefixFrame
    && embedShape.selectedVariant === "ordinary"
    && boundaryRealizedEmbed
      === lexicalFacts.capturedExactOrdinaryNncPredicateFrame?.realizedStem
    && target.isClassicalNahuatlClosureFrame?.(retainedCompound) === true
    && retainedCompound.operationFrame?.operation === "compound"
    && retainedCompound.operationFrame?.variant === "connective-t"
    ? target.prefixClassicalNahuatlCompoundWithNominal?.(
      sourceAuthorizationFrame, {subject, mood: vncRequest.mood,
        tense: vncRequest.tense, voice: targetVoice}
    ) || null : null;
  let vncEvaluation = compoundPrefixCoordinate
    ? {canonicalTargetEvaluator: "retained-compound-nominal-prefix",
      canonicalResult: {authorizationStatus: compoundPrefixCoordinate.authorizationStatus,
        blockReason: compoundPrefixCoordinate.blockReason,
        resultFrame: compoundPrefixCoordinate}}
    : evaluateCanonicalVncCoordinate(target, vncRequest);
  // Preserve an authenticated matrix whose lexical/irregular licensing
  // cannot be recovered from a flattened, newly prefixed source identity.
  // The nominal owner signs the resolved participant and constituent graph;
  // the finite owner inherits the matrix's actual coordinate and allomorph.
  const patientiveMatrixApplication = lexicalFacts.patientiveNncEmbed
    && !lexicalFacts.capturedMatrixVncResult
    ? target.evaluateClassicalNahuatlVncApplication?.({
      sourceStem: matrixStem, verbClass,
      sourceValence: valenceFromObjectRequests(sourceObjectRequests),
      sourceObjectRequests, subject, mood: vncRequest.mood,
      tense: vncRequest.tense, requestedVoice: "active",
    }) : null;
  const exactMatrixResult = lexicalFacts.capturedMatrixVncResult
    || (target.isClassicalNahuatlVncApplicationFrame?.(patientiveMatrixApplication) === true
      && patientiveMatrixApplication.authorizationStatus === "authorized"
      ? patientiveMatrixApplication.resultFrame : null);
  const incorporatedNonhumanImpersonalMatrix = relation === "object"
    && ["object", "direct-object"].includes(route) && targetVoice === "impersonal"
    && targetSourceValence === "intransitive" && sourceObjectRequests.length === 1
    && sourceObjectRequests[0].objectKind === "nonspecific-nonhuman";
  if ((vncEvaluation.canonicalResult?.authorizationStatus !== "authorized"
      || lexicalFacts.patientiveNncEmbed
      || authenticatedOrdinaryInherentMatrix
      || retainedMatrixParadigm?.selectedStemOverride
      || relation === "adverb"
        && target.isClassicalNahuatlDeverbalNncGrammarFrame?.(lexicalFacts.capturedEmbedResult) === true)
    && (relation === "complement" && complementReferenceFrame?.authorizationStatus === "authorized"
      || relation === "adverb"
        && ["direct-adverb", "supplement-subject", "supplement-object"].includes(route)
      || incorporatedNonhumanImpersonalMatrix)
    && (targetVoice === "active"
      || (classIndependentMatrix || authenticatedOrdinaryInherentMatrix)
        && lexicalFacts.capturedMatrixInherentImpersonal
      || incorporatedNonhumanImpersonalMatrix
      || (targetVoice === "passive"
        && (relation === "complement"
          && complementReferenceFrame?.authorizationStatus === "authorized"
          || relation === "adverb"
            && ["direct-adverb", "supplement-subject", "supplement-object"].includes(route))))
    && embedShape.selectedVariant === "ordinary"
    && !similarityPrefixFrame && !embedCopyingSelected && matrixReduplication === "none"
    && !ihMatrixStockFormationFrame && !lexicalMatrixShapeFrame
    && (lexicalFacts.capturedExactOrdinaryNncPredicateFrame || lexicalFacts.ordinaryNncEmbed
      || !lexicalFacts.capturedEmbedResult && lexicalFacts.embedSourceClassFrame?.authorizationStatus === "authorized"
      || lexicalFacts.compoundNncEmbed
      || lexicalFacts.patientiveNncEmbed
      || lexicalFacts.capturedBasicNumeralEmbedCitation
      || target.isClassicalNahuatlDeverbalNncGrammarFrame?.(lexicalFacts.capturedEmbedResult) === true)
    && exactMatrixResult
    && typeof target.buildClassicalNahuatlNominalVncMatrixCoordinateResult === "function") {
    const exactMatrix = exactMatrixResult;
    const projection = target.getClassicalNahuatlVncContinuationSourceConstituents?.(exactMatrix);
    const noun = lexicalFacts.capturedExactOrdinaryNncPredicateFrame?.canonicalResultFrame
      || lexicalFacts.capturedEmbedResult;
    const nounAuthorized = target.isClassicalNahuatlOrdinaryNncResult?.(noun) === true
      || (lexicalFacts.patientiveNncEmbed
        && (lexicalFacts.capturedEmbedPatientiveCaptureFrame?.canonicalPatientiveNncResult === noun
          || target.isClassicalNahuatlDeverbalNncGrammarFrame?.(noun) === true
            && lexicalFacts.capturedEmbedPatientiveCaptureFrame?.canonicalNncGrammarFrame === noun
            && noun.canonicalResult === lexicalFacts.capturedEmbedPatientiveCaptureFrame.canonicalPatientiveNncResult))
      || target.isClassicalNahuatlDeverbalNncGrammarFrame?.(noun) === true
        && ["preterit-agentive", "preterit-patientive", "customary-agentive-full"].includes(noun.operationFrame?.nominalizationKind)
      || target.isClassicalNahuatlNominalConstructionResult?.(noun) === true
      && noun.constructionKind === "compound-nnc"
      || lexicalFacts.capturedCompoundNncResult
        && resolveCompoundNncEmbedResult(noun, target) === lexicalFacts.capturedCompoundNncResult;
    const primitiveSourceAuthorized = !noun
      && lexicalFacts.embedSourceClassFrame?.authorizationStatus === "authorized"
      && lexicalFacts.embedSourceClassFrame.sourceAuthority === "typed-open-nnc-source";
    if (projection && (nounAuthorized || primitiveSourceAuthorized
      || lexicalFacts.capturedBasicNumeralEmbedCitation?.canonicalResultFrame === noun)) {
      const retainedParadigm = retainedMatrixParadigm;
      const retainedAlternative = retainedParadigm?.selectedAlternativeStem
        && retainedParadigm.requestedMood === vncRequest.mood
        && retainedParadigm.requestedSemanticTense === vncRequest.tense
        && projection.sourceSubject === targetSubject
        ? retainedParadigm.selectedAlternativeStem : "";
      const matrixCoordinateSubject = targetVoice === "passive" ? subject : targetSubject;
      // A completed passive is not an active derivation operand. Re-coordinate
      // its authenticated pre-voice request, retaining the completed Result as
      // the exact parent of this nominal operation and its promotion receipt.
      const exactApplication = target.isClassicalNahuatlVncSentenceResultFrame?.(exactMatrix) === true
        ? exactMatrix.vncApplicationFrame : exactMatrix;
      const retainedPreVoiceApplication = targetVoice === "passive"
        && projection.sourceVoice === "passive"
        && target.isClassicalNahuatlVncApplicationFrame?.(exactApplication) === true
        && exactApplication.authorizationStatus === "authorized"
        && exactApplication.normalizedRequest.sourceVoice === "active"
        && exactApplication.normalizedRequest.requestedDerivation === "direct"
        && exactApplication.resultFrame.selectedVoice === "passive"
        && !exactApplication.normalizedRequest.sourceEmbedStem
        && !exactApplication.normalizedRequest.sourceMatrixStem
        ? exactApplication : null;
      const original = retainedPreVoiceApplication?.normalizedRequest;
      const coordinateSource = original ? {
        sourceStem: original.sourceStem, sourceLexemeId: original.sourceLexemeId,
        sourceInitialISelection: original.sourceInitialISelection,
        verbClass: original.verbClass, sourceValence: original.sourceValence,
        sourceObjectRequests: original.sourceObjectRequests,
        sourceSubject: original.sourceSubject, sourceVoice: original.sourceVoice,
        nonactiveOptionId: exactApplication.resultFrame.selectedNonactiveOptionId,
        tlaFusion: original.tlaFusion, silentSpecificObject: original.silentSpecificObject,
      } : projection;
      const inheritedMatrixCoordinate = (classIndependentMatrix || authenticatedOrdinaryInherentMatrix)
        && projection.sourceSubject === matrixCoordinateSubject
        && matrixApplication.normalizedRequest.mood === vncRequest.mood
        && matrixApplication.normalizedRequest.tense === vncRequest.tense
        && (classIndependentMatrix && projection.sourceVoice === targetVoice
          || authenticatedOrdinaryInherentMatrix && targetVoice === "impersonal"
            && vncRequest.nonactiveOptionId === matrixApplication.resultFrame.selectedNonactiveOptionId)
        ? matrixApplication : null;
      // The application service takes a canonical nucleus as continuation;
      // an application envelope in that argument is interpreted as dependencies.
      // Keep the whole issued envelope as exactMatrix in the signed receipt.
      const matrixCoordinate = inheritedMatrixCoordinate || target.evaluateClassicalNahuatlVncApplication?.({
        ...coordinateSource, ...(retainedAlternative ? {irregularStemChoice: retainedAlternative} : {}),
        subject: matrixCoordinateSubject, mood: vncRequest.mood,
        directionalPrefix: request.directionalPrefix || "",
        ...(request.nonactiveOptionId ? {nonactiveOptionId: request.nonactiveOptionId} : {}),
        tense: vncRequest.tense, requestedVoice: targetVoice,
        requestedDerivation: "direct", incorporatedAdverb: false,
      }, retainedPreVoiceApplication ? null
        : target.isClassicalNahuatlVncApplicationIssuedFrame?.(exactMatrix) === true
          ? exactMatrix.resultFrame : exactMatrix);
      if (target.isClassicalNahuatlVncApplicationFrame?.(matrixCoordinate) === true
        && matrixCoordinate.authorizationStatus === "authorized") {
        const frame = deepFreeze({
          kind: "classical-nahuatl-nominal-vnc-matrix-coordinate-frame", version: VERSION,
          authorizationStatus: "authorized", sourceAuthorizationFrame,
          exactNounResult: noun, exactMatrixResult: exactMatrix, matrixCoordinate,
          retainedPreVoiceApplication,
          nominalRequest: request,
          embedStem: boundaryRealizedEmbed, compoundStem, canonicalVncSourceStem, operationFrame,
          targetClass: targetVoice === "passive"
            ? matrixCoordinate.resultFrame.selectedMachineryFrame.classId : projection.verbClass,
          targetValence: targetSourceValence,
          initialVowelKind: compoundInitialISelection,
          targetObjectRequests, coordinate: {subject: matrixCoordinateSubject, mood: vncRequest.mood,
            tense: vncRequest.tense, voice: targetVoice},
          callerSuppliedAuthorityAccepted: false, formulaStringAuthority: false,
          surfaceStringAuthority: false,
        });
        ISSUED_NOMINAL_VNC_MATRIX_COORDINATES.add(frame);
        const inherited = target.buildClassicalNahuatlNominalVncMatrixCoordinateResult(frame);
        if (inherited?.authorizationStatus === "authorized") vncEvaluation = {
          canonicalTargetEvaluator: "authenticated-matrix-coordinate-with-nominal-prefix",
          canonicalResult: {authorizationStatus: "authorized", blockReason: "", resultFrame: inherited},
        };
      }
    }
  }
  const canonicalResult = vncEvaluation.canonicalResult;
  const authorized = canonicalResult?.authorizationStatus === "authorized";
  const canonicalFormulaRealization =
    canonicalResult?.resultFrame?.formulaRealization
      || canonicalResult?.finiteSurfaceFrame?.formulaRealization
      || canonicalResult?.formulaRealization
      || "";
  const canonicalWordSurface = canonicalResult?.resultFrame?.wordSurface
    || canonicalResult?.resultFrame?.surfaceRealization
    || canonicalResult?.resultFrame?.finiteSurfaceFrame?.wordRealization
    || canonicalResult?.finiteSurfaceFrame?.wordSurface
    || canonicalResult?.finiteSurfaceFrame?.wordRealization
    || canonicalResult?.wordSurface
    || canonicalResult?.surfaceRealization
    || "";
  let nominalWritingProjection = null;
  if (authorized && lexicalFacts.capturedExactOrdinaryNncPredicateFrame && similarityPrefixFrame) {
    const requiredWritingCapabilities = [
      "buildClassicalNahuatlDerivationalBoundarySpellingFrame",
      "isClassicalNahuatlVncSlotFrame",
      "realizeClassicalNahuatlLesson25TypedVncWord",
    ];
    if (requiredWritingCapabilities.some(name => typeof target[name] !== "function")) {
      return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-exact-writing-capability-required", request);
    }
    const sourceTypedSlotFrame = canonicalResult?.resultFrame?.finalTypedVncSlotFrame
      || canonicalResult?.finiteSurfaceFrame?.typedFrame
      || canonicalResult?.typedSlotFrame;
    if (target.isClassicalNahuatlVncSlotFrame(sourceTypedSlotFrame) !== true) {
      return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-exact-writing-typed-result-required", request);
    }
    const predicateStem = normalizeStem(sourceTypedSlotFrame.slots.predicate.stem);
    const embedBoundary = `${boundaryRealizedEmbed}-`;
    if (!predicateStem.startsWith(embedBoundary)) {
      return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-exact-writing-boundary-mismatch", request);
    }
    const exactEmbed = lexicalFacts.capturedExactOrdinaryNncPredicateFrame;
    const followingMatrix = predicateStem.slice(embedBoundary.length);
    const boundarySpellingFrame = target.buildClassicalNahuatlDerivationalBoundarySpellingFrame({
      sourceStem: exactEmbed.predicateStem,
      retainedStem: boundaryRealizedEmbed,
      followingMorpheme: followingMatrix,
      sourceFollowingVowel: exactEmbed.sourceStemOperation
        ? exactEmbed.useStemFrame?.ephemeralFinalVowel || "" : "",
    });
    if (boundarySpellingFrame?.authorizationStatus !== "authorized") {
      return buildBlockedFrame("nominal-embed-vnc", boundarySpellingFrame?.blockReason || "nominal-embed-exact-boundary-spelling-required", request);
    }
    // This is a written projection of the exact owner-issued finite predicate,
    // not a second grammatical Source. Only the newly formed embed boundary
    // changes spelling; all pre-existing internal source boundaries stay intact.
    const targetTypedSlotFrame = deepClone(sourceTypedSlotFrame);
    targetTypedSlotFrame.slots.predicate.stem = joinStemParts([
      boundarySpellingFrame.realizedRetainedStem, followingMatrix,
    ]);
    if (target.isClassicalNahuatlVncSlotFrame(targetTypedSlotFrame) !== true) {
      return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-exact-writing-target-invalid", request);
    }
    const writtenWord = target.realizeClassicalNahuatlLesson25TypedVncWord(targetTypedSlotFrame);
    if (!writtenWord) return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-exact-written-projection-required", request);
    nominalWritingProjection = deepFreeze({
      kind: "classical-nahuatl-exact-nominal-embed-writing-projection",
      authorizationStatus: "authorized", blockReason: "",
      canonicalFiniteResult: canonicalResult,
      sourceTypedSlotFrame, boundarySpellingFrame, targetTypedSlotFrame,
      wordSurface: writtenWord,
      sentenceSurface: "",
      sentenceRequested: false,
      projectionRole: "independent-written-realization",
      typedBoundaryAuthority: true,
      formulaStringAuthority: false, surfaceStringAuthority: false,
      sourceReentryAuthorized: false,
    });
  }
  const embedNegativePrefix = lexicalFacts.capturedEmbedNegativeProjection
    ?.prefixalStack.map(carrier => carrier.replace(/#$/u, "")).join("") || "";
  const nuclearFormulaRealization = fullCharacteristicEmbedSelected
    ? canonicalFormulaRealization.replace(
      canonicalCharacteristicEmbedStem,
      normalizeStem(source.embedStem)
    )
    : boundaryAssimilationFrame?.targetSequence === "l-l"
      ? canonicalFormulaRealization.replace(
        `${boundaryRealizedEmbed}-tl`,
        `${boundaryRealizedEmbed}-l`
      )
      : canonicalFormulaRealization;
  const nuclearWordSurface = nominalWritingProjection
    ? nominalWritingProjection.wordSurface
    : boundaryAssimilationFrame?.targetSequence === "l-l"
    ? canonicalWordSurface.replace(
      `${boundaryRealizedEmbed.replace(/-/gu, "")}tl`,
      `${boundaryRealizedEmbed.replace(/-/gu, "")}l`
    )
    : canonicalWordSurface;
  const formulaRealization = embedNegativePrefix + nuclearFormulaRealization;
  const wordSurface = embedNegativePrefix + nuclearWordSurface;
  return Object.freeze({
    kind: "classical-nahuatl-nominal-construction-result-frame",
    version: VERSION,
    constructionFamily: "nnc-plus-vnc-nominal-embed",
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized ? "" : canonicalResult?.blockReason || "canonical-vnc-application-blocked",
    sourceFrame: Object.freeze({
      kind: "classical-nahuatl-nominal-embed-source-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      embedStem: normalizeStem(source.embedStem),
      matrixStem,
      canonicalVncSourceStem,
      matrixValence,
      matrixVerbClass: verbClass,
      adverbSourceRouteCandidates: Object.freeze(adverbSourceRouteCandidates),
      adverbRoleCandidates: Object.freeze(adverbRoleCandidates),
      comparisonTargetCandidates: Object.freeze(comparisonTargetCandidates),
      complementOrientationCandidates: Object.freeze(
        Array.isArray(source.complementOrientationCandidates)
          ? source.complementOrientationCandidates.map(normalizeKey).filter(
            candidate => ["subject", "object"].includes(candidate)
          )
          : []
      ),
      complementKindCandidates: Object.freeze(
        Array.isArray(source.complementKindCandidates)
          ? source.complementKindCandidates.map(normalizeKey).filter(Boolean)
          : []
      ),
      complementTargetReferenceCandidates: Object.freeze(
        Array.isArray(source.complementTargetReferenceCandidates)
          ? source.complementTargetReferenceCandidates.map(normalizeKey)
            .filter(Boolean)
          : []
      ),
      adverbSourceStructure,
      embedInitialISelection: compoundInitialISelection,
      matrixDerivationType: lexicalFacts.matrixDerivationType,
      subjectReferenceId: normalizeKey(source.subjectReferenceId),
      objectReferenceIds: Object.freeze(
        Array.isArray(source.objectReferenceIds)
          ? source.objectReferenceIds.map(normalizeKey).filter(Boolean)
          : []
      ),
      possessorReferenceCandidates: Object.freeze(
        Array.isArray(source.possessorReferenceCandidates)
          ? source.possessorReferenceCandidates.map(normalizeKey).filter(Boolean)
          : []
      ),
    }),
    operationFrame,
    canonicalTargetEvaluator: vncEvaluation.canonicalTargetEvaluator,
    canonicalResult,
    nominalWritingProjection,
    formulaRealization,
    wordSurface,
    sentenceSurface: nominalWritingProjection
      ? nominalWritingProjection.sentenceSurface
      : canonicalResult?.resultFrame?.sentenceSurface
      || canonicalResult?.finiteSurfaceFrame?.sentenceSurface
      || canonicalResult?.sentenceSurface
      || "",
    requestedOutputKind: normalizeKey(request.outputKind || request.outputScope || "single"),
    typedFrameAuthority: true,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildCustomNumberFrame({
  subject,
  stem,
  nounClass,
  num1,
  num2,
  animacy,
  ruleId,
  nounClassApplicability = "ordinary-class",
}) {
  // §14.2 defines class by singular/common num1. The §34.1 totality
  // matrix is plural-only; its special number dyad does not establish an
  // ordinary class (and short ix is not the face noun īx-tli).
  const classAuthorized = Boolean(nounClass) || (
    nounClass === ""
    && nounClassApplicability === "not-applicable-plural-only-totality"
    && subject.endsWith("pl")
    && ["cardinal-nominal-gross-count-plural-t-in",
      "cardinal-nominal-gross-possessive-nonanimate-ti-zero"].includes(ruleId)
  );
  return {
    kind: "classical-nahuatl-nominal-construction-number-frame",
    version: VERSION,
    authorizationStatus: subject && stem && classAuthorized && num1 && num2 ? "authorized" : "blocked",
    blockReason: subject && stem && classAuthorized && num1 && num2 ? "" : "incomplete-nominal-construction-number-frame",
    subject,
    subjectNumber: subject.endsWith("pl") ? "plural" : subject === "3common" ? "common" : "singular",
    stem,
    nounClass,
    ...(nounClassApplicability === "ordinary-class" ? {} : { nounClassApplicability }),
    nounClassAuthority: ruleId,
    ruleId,
    num1,
    num2,
    connectorRule: ruleId,
    animacy,
    metaphoricalOverride: false,
    numberBelongsTo: "subject-personal-pronoun",
    numberIsNounInflection: false,
  };
}

function buildNncTarget({
  target,
  constructionFamily,
  sourceFrame,
  stem,
  nounClass,
  subject,
  state = "absolutive",
  possessor = "3sg",
  animacy = "animate",
  pluralConnector = "t-in",
  singularPossessiveConnector = "0",
  numberFrameOverride = null,
  operationIds = [],
  nncLayerOperationIds = [],
  sentenceModifier = "",
  predicateStructureFrame = null,
  followingMorpheme = "",
  externalObjectParent = null,
  contextualFlawedSubjectSourceFrame = null,
  subjectSemanticContext = null,
}) {
  if (contextualFlawedSubjectSourceFrame
    && !isClassicalNahuatlContextualFlawedSubjectSourceFrame(contextualFlawedSubjectSourceFrame, target)) {
    return {authorizationStatus: "blocked", blockReason: "issued-contextual-flawed-subject-source-required"};
  }
  if (predicateStructureFrame && !ISSUED_GROSS_CONJUNCTION_EMBED_FRAMES.has(predicateStructureFrame)) {
    return { authorizationStatus: "blocked", blockReason: "issued-cardinal-conjunction-embed-required" };
  }
  if (typeof target.buildClassicalNahuatlNncSubjectPersonFrame !== "function"
    || typeof target.buildClassicalNahuatlNncSlotFrame !== "function"
    || typeof target.renderClassicalNahuatlNncSlotFrameFormula !== "function") {
    return { authorizationStatus: "blocked", blockReason: "canonical-nnc-evaluator-unavailable" };
  }
  let supportiveInitialIFrame = null;
  if (state === "possessive" && sourceFrame.supportiveInitialI === true && /^i/u.test(stem)) {
    const followingStem = stem.slice(1);
    const provisionalState = target.buildClassicalNahuatlPossessiveStateFrame({
      possessor, subject, stem: followingStem, nounstemRelationKind: "nonrelational",
    });
    const stateCarrier = provisionalState.slots?.map(slot => slot.carrier)
      .filter(morph => morph && !["0", "Ø", "⎕"].includes(morph)).join("");
    supportiveInitialIFrame = target.buildClassicalNahuatlSupportiveVowelFrame?.({
      sourceSegments: [stateCarrier, "i", followingStem.replace(/-/gu, ""), ...(followingMorpheme ? [followingMorpheme] : [])],
      tokenLevelLegal: true, supportiveVowelNeeded: false,
      insertionPosition: "before", supportiveIndex: 1,
    });
    if (target.isClassicalNahuatlTranscriptionAnalysisFrame?.(supportiveInitialIFrame) !== true
      || supportiveInitialIFrame.authorizationStatus !== "authorized") {
      return {authorizationStatus: "blocked", blockReason: "nominal-possessive-supportive-i-owner-required"};
    }
    stem = followingStem;
  }
  const stateFrame = state === "possessive"
    ? target.buildClassicalNahuatlPossessiveStateFrame({
      possessor,
      subject,
      stem,
      nounstemRelationKind: "nonrelational",
    })
    : {
      kind: "classical-nahuatl-nominal-construction-vacant-state-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      arity: "vacant",
      slots: [],
    };
  // Subject person precedes State, so its vowel boundary belongs to the
  // actual possessive carrier when State is occupied, not the nounstem.
  const stateFollowingMaterial = stateFrame.slots?.map(slot => slot.carrier)
    .find(morph => morph && !["0", "Ø", "⎕"].includes(morph));
  const followingMaterial = stateFollowingMaterial || (predicateStructureFrame
    ? predicateStructureFrame.segments.flatMap(segment => segment.orderedMorphs)
      .find(morph => !["0", "Ø", "⎕"].includes(morph)) || stem
    : stem);
  const personFrame = target.buildClassicalNahuatlNncSubjectPersonFrame({ subject, followingMaterial,
    ...(subjectSemanticContext ? {animacy:subjectSemanticContext.animacy,
      humanness:subjectSemanticContext.humanness} : {}),
    // Ordinary count supplies referential animacy. Gross count's separate
    // plural morphology override must not be mistaken for that semantic fact.
    ...(constructionFamily === "cardinal-nominal" && sourceFrame.countKind === "ordinary"
      ? {animacy: sourceFrame.animacy} : {}),
  });
  if (contextualFlawedSubjectSourceFrame) {
    // The supplied form establishes person/number, not a referent analysis.
    delete personFrame.participantFrame;
  }
  let numberFrame = numberFrameOverride;
  if (!numberFrame) {
    numberFrame = state === "possessive"
      ? target.resolveClassicalNahuatlLesson13PossessiveNumberDyad({
        subject,
        stem,
        singularConnector: singularPossessiveConnector,
        animacy,
      })
      : target.resolveClassicalNahuatlLesson12AbsolutiveNumberDyad({
        subject,
        nounClass,
        stem,
        pluralConnector,
        animacy,
        metaphoricalOverride: false,
      });
  }
  if (
    ["nominal-compound", "affective-nominal"].includes(constructionFamily)
    && state === "possessive"
    && numberFrame?.authorizationStatus === "authorized"
  ) {
    // Possessive number morphology does not select a noun class. Preserve
    // the construction's already governed class on its canonical frame.
    numberFrame = {
      ...numberFrame,
      nounClass,
      nounClassAuthority: constructionFamily === "nominal-compound"
        ? "typed-compound-matrix"
        : "typed-affective-construction",
    };
  }
  const appliedNncOperationIds = nncLayerOperationIds.length
    ? nncLayerOperationIds
    : operationIds;
  const activationLicenseFrame = externalObjectParent?.operationFrame
    ?.activationLicenseFrame || null;
  const externalObjectPerson = activationLicenseFrame?.targetObjectPerson || "";
  const canonicalExternalObjectFrame = externalObjectPerson
    ? target.getClassicalNahuatlSpecificProjectiveObjectFrame?.({
      objectPerson: externalObjectPerson, stem,
      personDyad: {pers1: personFrame.pers1, pers2: personFrame.pers2},
    }) : null;
  if (externalObjectPerson && (!canonicalExternalObjectFrame?.va1
    || !canonicalExternalObjectFrame?.va2)) {
    return {authorizationStatus: "blocked",
      blockReason: "canonical-specific-projective-object-frame-unavailable"};
  }
  const participantFrame = canonicalExternalObjectFrame ? deepFreeze({
    kind: "classical-nahuatl-specific-projective-object-participant-frame",
    authorizationStatus: "authorized", role: "specific-projective-object",
    arity: "dyadic", objectPerson: externalObjectPerson,
    slots: [
      {role: "va1", carrier: canonicalExternalObjectFrame.va1},
      {role: "va2", carrier: canonicalExternalObjectFrame.va2},
    ],
  }) : null;
  const nncSlotFrame = target.buildClassicalNahuatlNncSlotFrame({
    sourceFrameKind: sourceFrame.kind,
    sourceAuthorizationStatus: sourceFrame.authorizationStatus,
    stem,
    stateFrame,
    personFrame,
    participantFrame,
    numberFrame,
    appliedOperationIds: appliedNncOperationIds,
    resultOperationId: appliedNncOperationIds.at(-1)
      || `${constructionFamily}-construction`,
    requestedOutputKind: "selected-nnc-sentence-surface",
    nncFamily: contextualFlawedSubjectSourceFrame
      ? CONTEXTUAL_FLAWED_SUBJECT_FAMILY : `${constructionFamily}-construction`,
  });
  const authorized = target.isClassicalNahuatlNncSlotFrame?.(nncSlotFrame) === true;
  if (authorized && ["nominal-compound", "affective-nominal"].includes(constructionFamily)) {
    ISSUED_NOMINAL_NNC_SLOTS.add(nncSlotFrame);
    if (contextualFlawedSubjectSourceFrame) {
      nncSlotFrame.contextualFlawedSubjectSourceFrame = contextualFlawedSubjectSourceFrame;
      nncSlotFrame.subjectReferenceStatus = "unclaimed";
      nncSlotFrame.appliedOperationIds.push(CONTEXTUAL_FLAWED_SUBJECT_OPERATION);
      CONTEXTUAL_FLAWED_SUBJECT_SLOTS.set(nncSlotFrame, contextualFlawedSubjectSourceFrame);
    }
    if (canonicalExternalObjectFrame) {
      ISSUED_NOMINAL_EXTERNAL_OBJECTS.set(nncSlotFrame, canonicalExternalObjectFrame);
    }
  }
  if (authorized && predicateStructureFrame) {
    nncSlotFrame.slots.predicate.structureFrame = predicateStructureFrame;
  }
  const formulaRealization = authorized ? target.renderClassicalNahuatlNncSlotFrameFormula(nncSlotFrame) : "";
  const carriers = authorized
    ? [
      nncSlotFrame.slots.subject.pers1,
      nncSlotFrame.slots.subject.pers2,
      ...nncSlotFrame.slots.participant.slots.map(slot => slot.carrier),
      ...nncSlotFrame.slots.state.slots.map(slot => slot.carrier),
      getClassicalNahuatlNncPredicateBoundaryCarrier(nncSlotFrame.slots),
      nncSlotFrame.slots.number.num1,
      nncSlotFrame.slots.number.num2,
    ]
    : [];
  const realize = typeof target.realizeClassicalNahuatlNncSurfaceCarrier === "function"
    ? target.realizeClassicalNahuatlNncSurfaceCarrier
    : value => normalizeStem(value).replace(/[0Ø⎕-]/gu, "");
  let wordSurface = typeof target.realizeClassicalNahuatlNncSurfaceCarriers === "function"
    ? target.realizeClassicalNahuatlNncSurfaceCarriers(carriers, {
      boundaryKind:["nominal-compound","affective-nominal"].includes(constructionFamily)
        ? "typed-nnc-slots" : "",
    })
    : carriers.map(realize).join("");
  let structuredWritingSource = null;
  let structuredWrittenResult = null;
  let structuredBoundarySpellingFrame = null;
  if (authorized && predicateStructureFrame) {
    if (typeof target.issueClassicalNahuatlLesson2WritingSource !== "function"
      || typeof target.writeClassicalNahuatlLesson2Result !== "function"
      || typeof target.isClassicalNahuatlLesson2WrittenResult !== "function"
      || typeof target.buildClassicalNahuatlDerivationalBoundarySpellingFrame !== "function") {
      return { authorizationStatus: "blocked", blockReason: "cardinal-conjunction-embed-writing-owner-required" };
    }
    const nonzero = (morphs, role) => morphs.map(realize).filter(Boolean)
      .map(value => ({ role, value }));
    const rightmost = predicateStructureFrame.rightmostEmbedFrame;
    structuredBoundarySpellingFrame = target.buildClassicalNahuatlDerivationalBoundarySpellingFrame({
      sourceStem: rightmost.sourcePredicateStem,
      retainedStem: rightmost.embedStem,
      followingMorpheme: predicateStructureFrame.matrixStem,
    });
    if (structuredBoundarySpellingFrame?.authorizationStatus !== "authorized") {
      return { authorizationStatus: "blocked", blockReason: structuredBoundarySpellingFrame?.blockReason || "cardinal-conjunction-embed-boundary-spelling-required" };
    }
    const parts = nonzero([
      nncSlotFrame.slots.subject.pers1,
      nncSlotFrame.slots.subject.pers2,
      ...nncSlotFrame.slots.state.slots.map(slot => slot.carrier),
    ], "outer-gross-person-state");
    predicateStructureFrame.segments.forEach((segment, index) => {
      const slots = segment.canonicalNncSlotFrame.slots;
      const earlier = index < predicateStructureFrame.segments.length - 1;
      // Existing predicate-internal boundaries have already been owned.
      // Project those predicates intact, as in ordinary NNC writing; only
      // the new rightmost embed/ix boundary receives a spelling operation.
      const predicate = earlier ? segment.predicateStem : joinStemParts([
        additionalNumberLink(rightmost.embedStem),
        structuredBoundarySpellingFrame.realizedRetainedStem,
      ]);
      parts.push(...nonzero([
        slots.subject.pers1, slots.subject.pers2,
        ...slots.participant.slots.map(slot => slot.carrier),
        ...slots.state.slots.map(slot => slot.carrier), predicate,
        ...(earlier ? [slots.number.num1, slots.number.num2] : []),
      ], `embedded-clause-${index + 1}`));
      if (earlier) {
        parts.at(-1).joinAfter = " ";
      }
    });
    parts.push(...nonzero([predicateStructureFrame.matrixStem,
      nncSlotFrame.slots.number.num1, nncSlotFrame.slots.number.num2], "outer-gross-matrix-number"));
    structuredWritingSource = target.issueClassicalNahuatlLesson2WritingSource({
      parts, boundaryKind: "downgraded-nuclear-clause-conjunction",
    });
    structuredWrittenResult = target.writeClassicalNahuatlLesson2Result(structuredWritingSource);
    if (!target.isClassicalNahuatlLesson2WrittenResult(structuredWrittenResult)) {
      return { authorizationStatus: "blocked", blockReason: structuredWrittenResult?.blockReason || "cardinal-conjunction-embed-writing-required" };
    }
    wordSurface = structuredWrittenResult.surface;
  }
  const sentenceWord = `${sentenceModifier ? `${sentenceModifier} ` : ""}${wordSurface}`;
  const sentenceSurface = authorized && !contextualFlawedSubjectSourceFrame
    ? `${sentenceWord.charAt(0).toUpperCase()}${sentenceWord.slice(1)}.`
    : "";
  return {
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized ? "" : nncSlotFrame?.blockReason || numberFrame?.blockReason || stateFrame?.blockReason || personFrame?.blockReason || "canonical-nnc-evaluation-blocked",
    personFrame,
    stateFrame,
    numberFrame,
    nncSlotFrame,
    activationLicenseFrame,
    externalObjectParent,
    externalObjectFrame: canonicalExternalObjectFrame,
    supportiveInitialIFrame,
    sourceOperationIds: Object.freeze([...operationIds]),
    formulaRealization,
    wordSurface,
    sentenceSurface,
    ...(predicateStructureFrame ? { predicateStructureFrame, structuredWritingSource,
      structuredWrittenResult, structuredBoundarySpellingFrame } : {}),
  };
}

function realizeCompoundEmbed(source, matrixStem, lexicalFacts = {}, target = {}) {
  const adjectival = lexicalFacts.adjectivalSourceConstituentFrame;
  if (isClassicalNahuatlAdjectivalNncSourceConstituentFrame(adjectival)) return {
    kind:"classical-nahuatl-compound-nnc-embed-shape-frame", version:VERSION,
    authorizationStatus:"authorized", sourceStem:adjectival.stem,
    realizedStem:adjectival.stem, writtenStem:adjectival.stem,
    sourceClass:adjectival.useShape === "source-root" ? "root-only" : "tl-1-a",
    nounClass:adjectival.useShape === "source-root" ? "" : "tl", subclass:"",
    useShape:"base", selectedUseKind:adjectival.useShape,
    sourceShapeRule:"owned-adjectival-consuming-use", sourceShapeAuthority:"owner-issued-exact-bridge",
    classMembershipClaimed:adjectival.classMembershipClaimed, canonicalBridgeFrame:adjectival,
    formulaStringAuthority:false, documentaryExampleAuthority:false};
  let embedStem = lexicalFacts.preteritAgentiveCompoundAnalysisFrame
    ?.retainedGeneralUseStem || lexicalFacts.compoundEmbedUseSourceFrame?.compoundUseStem
    || normalizeStem(source.embedStem);
  const lexicalRule = normalizeKey(lexicalFacts.embedLexicalRule);
  if (!embedStem) return { authorizationStatus: "blocked", blockReason: "compound-nnc-embed-stem-required" };
  const sourceClass = lexicalFacts.embedSourceClassFrame || null;
  if (sourceClass?.classAlternativeAnalyses) {
    const candidateUseShapes = sourceClass.classAlternativeAnalyses.map(analysis =>
      realizeCompoundEmbed(source, matrixStem, {
        ...lexicalFacts,
        embedSourceClassFrame: { ...analysis, sourceAuthority: sourceClass.sourceAuthority },
      }, target)
    );
    if (candidateUseShapes.some(shape => shape.authorizationStatus !== "authorized")) {
      return { authorizationStatus: "blocked", blockReason:
        "compound-embed-class-constraint-candidate-operation-blocked" };
    }
    const operationRecipe = shape => ({
      sourceStem: shape.sourceStem, realizedStem: shape.realizedStem,
      writtenStem: shape.writtenStem, useShape: shape.useShape,
      selectedUseKind: shape.selectedUseKind, ephemeralFinalVowel: shape.ephemeralFinalVowel,
      truncationRepair: shape.truncationRepair, sourceShapeRule: shape.sourceShapeRule,
      boundaryRuleId: shape.boundaryRuleId, lexicalException: shape.lexicalException,
      ruleId: shape.ruleId,
      boundarySpellingFrame: shape.boundarySpellingFrame,
      openTransitionFrame: shape.openTransitionFrame,
    });
    const commonUseShape = operationRecipe(candidateUseShapes[0]);
    if (candidateUseShapes.some(shape => JSON.stringify(operationRecipe(shape))
      !== JSON.stringify(commonUseShape))) {
      return { authorizationStatus: "blocked", blockReason:
        "compound-embed-class-constraint-divergent-operation" };
    }
    const classConstraintFrame = deepFreeze({
      kind: "classical-nahuatl-compound-embed-class-constraint-frame",
      version: VERSION, authorizationStatus: "authorized",
      declaredClassAlternatives: sourceClass.declaredClassAlternatives,
      normalizedClassAlternatives: sourceClass.normalizedClassAlternatives,
      selectionRequired: false, selectedClass: "", commonUseShape, candidateUseShapes,
      invariantUseAndBoundary: true,
      operationScope: "integrated-association-matrix-oriented-absolutive",
      grammarAuthority: false,
      formulaStringAuthority: false, surfaceStringAuthority: false,
    });
    // Build the common operand from verified operation fields. None of one
    // candidate's class identity becomes a fact of the unresolved Source.
    return {
      kind: "classical-nahuatl-compound-nnc-embed-shape-frame",
      version: VERSION, authorizationStatus: "authorized",
      sourceStem: commonUseShape.sourceStem, realizedStem: commonUseShape.realizedStem,
      sourceClass: "", nounClass: "", subclass: sourceClass.subclass,
      useShape: commonUseShape.useShape, selectedUseKind: commonUseShape.selectedUseKind,
      ephemeralFinalVowel: commonUseShape.ephemeralFinalVowel,
      truncationRepair: commonUseShape.truncationRepair,
      sourceShapeRule: commonUseShape.sourceShapeRule,
      patientiveNncEmbed: false, adjectivalModificationEmbed: false,
      patientiveNounClass: "", patientiveCompoundConnector: "",
      lexicalException: commonUseShape.lexicalException,
      boundaryRuleId: commonUseShape.boundaryRuleId,
      boundarySpellingFrame: commonUseShape.boundarySpellingFrame,
      openTransitionFrame: commonUseShape.openTransitionFrame,
      writtenStem: commonUseShape.writtenStem, ruleId: commonUseShape.ruleId,
      sourceShapeAuthority: sourceClass.sourceAuthority,
      fullerSourceAnalysisPreserved: true, formulaStringAuthority: false,
      documentaryExampleAuthority: false, classConstraintFrame,
    };
  }
  const compoundUse = lexicalFacts.compoundEmbedUseSourceFrame;
  if (compoundUse && !ISSUED_COMPOUND_USE_SOURCE_FRAMES.has(compoundUse)) return {
    authorizationStatus: "blocked", blockReason: "issued-compound-use-source-required" };
  const lexicalAnalysis = lexicalFacts.compoundEmbedAnalysisFrame || null;
  const firstConjunctRestricted = lexicalFacts.conjunctiveStructureFrame?.constituentRelation === "conjunction";
  let sourceShapeRule = firstConjunctRestricted
    ? "conjunctive-first-restricted-use-before-num1-vestige" : "general-use-embed";
  const patientiveNounClass = normalizeNounClass(
    lexicalFacts.capturedEmbedPatientiveCaptureFrame?.sourceNounClass
      || lexicalFacts.capturedEmbedNounClass
  );
  const characteristicPatientiveEmbed =
    lexicalFacts.capturedEmbedPatientiveCaptureFrame
      ?.characteristicPropertyPatientive === true;
  if (characteristicPatientiveEmbed) {
    sourceShapeRule = "characteristic-patientive-zero-compound-connector";
  } else if (
    lexicalFacts.patientiveNncEmbed && patientiveNounClass === "tl"
  ) {
    sourceShapeRule = "patientive-tl-compound-owner-derived-stem";
  } else if (lexicalFacts.patientiveNncEmbed) {
    sourceShapeRule = "patientive-tli-compound-zero-connector";
  }
  if (lexicalFacts.adjectivalModificationEmbed) {
    sourceShapeRule =
      "owner-issued-adjectival-modification-incorporation";
  }
  if (!firstConjunctRestricted && normalizeKey(sourceClass?.useShape) === "truncated") {
    const ephemeral = normalizeKey(sourceClass.ephemeralFinalVowel);
    const subclass = normalizeKey(sourceClass.subclass);
    if (subclass === "tl-2-b" && ephemeral === "a") {
      sourceShapeRule = "compound-tl-2-b-final-a-retention";
    } else if (ephemeral && embedStem.endsWith(ephemeral)) {
      embedStem = embedStem.slice(0, -ephemeral.length);
      if (normalizeKey(sourceClass.truncationRepair) === "supportive-i") {
        embedStem = `${embedStem}i`;
      }
      sourceShapeRule = "typed-general-use-truncation";
    }
  }
  if (lexicalRule === "marked-final-a-loss") {
    if (
      normalizeKey(sourceClass?.subclass) !== "tl-2-b"
      || normalizeKey(sourceClass?.ephemeralFinalVowel) !== "a"
      || !/a$/u.test(embedStem)
    ) {
      return {
        authorizationStatus: "blocked",
        blockReason: "marked-final-a-loss-requires-tl-2-b-final-a-source",
      };
    }
    embedStem = embedStem.replace(/a$/u, "");
    sourceShapeRule = "marked-tl-2-b-final-a-loss";
  }
  if (lexicalRule === "unexpected-variant") {
    if (!lexicalAnalysis?.variantStem) {
      return {
        authorizationStatus: "blocked",
        blockReason: "unexpected-compound-variant-requires-typed-variant-stem",
      };
    }
    embedStem = lexicalAnalysis.variantStem;
    sourceShapeRule = "typed-unexpected-compound-variant";
  }
  if (lexicalRule === "glottalized-long-vowel") {
    const glottalized = embedStem.replace(/([āēīōū])$/u, (_, vowel) => ({
      ā: "ah", ē: "eh", ī: "ih", ō: "oh", ū: "uh",
    })[vowel]);
    if (glottalized === embedStem) {
      return {
        authorizationStatus: "blocked",
        blockReason: "glottalized-embed-requires-final-long-vowel-shape",
      };
    }
    embedStem = glottalized;
    sourceShapeRule = "typed-long-vowel-glottalization";
  }
  let boundaryRuleId = "ordinary-compound-boundary";
  // ch is one affricate and uh represents /w/; neither ends in glottal h.
  if (/(?<![cu])h$/u.test(embedStem) && isVowel(firstSound(matrixStem))) {
    embedStem = `${embedStem.slice(0, -1)}y`;
    boundaryRuleId = "final-h-to-y-before-vowel";
  }
  if (lexicalRule === "negative-ah") {
    embedStem = lexicalFacts.negativeParticleSourceFrame?.selectedForm || "ah";
    boundaryRuleId = embedStem === "ay"
      ? "optional-final-h-to-y-before-vowel" : "negative-ah-retained";
  }
  // Own the new nounstem boundary before this compound becomes a Source
  // for another operation. Its original constituents remain in the frame.
  const boundarySpellingFrame = target
    .buildClassicalNahuatlDerivationalBoundarySpellingFrame?.({
      sourceStem: normalizeStem(source.embedStem),
      retainedStem: embedStem,
      followingMorpheme: matrixStem,
      sourceFollowingVowel: sourceClass?.ephemeralFinalVowel || "",
    });
  if (boundarySpellingFrame?.authorizationStatus !== "authorized") {
    return {
      authorizationStatus: "blocked",
      blockReason: boundarySpellingFrame?.blockReason
        || "compound-nnc-boundary-spelling-owner-required",
    };
  }
  // A nounstem junction is open transition (§2.5), unlike a derivational
  // suffix junction. Retain the final /w/'s vocable-final writing here.
  let openTransitionFrame = null;
  let writtenStem = boundarySpellingFrame.realizedRetainedStem;
  if (/(?:uh|hu)$/u.test(embedStem) && isVowel(firstSound(matrixStem))) {
    openTransitionFrame = target.buildClassicalNahuatlOpenTransitionFrame?.({
      boundaryType: "compound", stemFinalPhoneme: "[w]",
      followingVowel: firstSound(matrixStem), requestedSpelling: "uh",
    });
    if (target.isClassicalNahuatlTranscriptionAnalysisFrame?.(openTransitionFrame) !== true
      || openTransitionFrame.authorizationStatus !== "authorized") {
      return { authorizationStatus: "blocked", blockReason: "compound-nnc-open-transition-owner-required" };
    }
    writtenStem = embedStem.slice(0, -2) + openTransitionFrame.outputSpelling;
  }
  return {
    kind: "classical-nahuatl-compound-nnc-embed-shape-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    sourceStem: compoundUse?.sourceStem || normalizeStem(source.embedStem),
    realizedStem: embedStem,
    sourceClass: sourceClass?.sourceClass || "",
    nounClass: sourceClass?.nounClass || normalizeNounClass(source.embedClass),
    useShape: sourceClass?.useShape || "base",
    selectedUseKind: firstConjunctRestricted ? "restricted-use" : "general-use",
    subclass: sourceClass?.subclass || "",
    ephemeralFinalVowel: sourceClass?.ephemeralFinalVowel || "",
    truncationRepair: sourceClass?.truncationRepair || "none",
    sourceShapeRule: compoundUse ? "declared-general-use-compound-form" : sourceShapeRule,
    compoundEmbedUseSourceFrame: compoundUse || null,
    classMembershipClaimed: compoundUse ? false : Boolean(sourceClass),
    patientiveNncEmbed: lexicalFacts.patientiveNncEmbed === true,
    adjectivalModificationEmbed:
      lexicalFacts.adjectivalModificationEmbed === true,
    patientiveNounClass: lexicalFacts.patientiveNncEmbed
      ? patientiveNounClass
      : "",
    patientiveCompoundConnector: lexicalFacts.patientiveNncEmbed ? "0" : "",
    lexicalException: lexicalRule,
    boundaryRuleId,
    boundarySpellingFrame,
    openTransitionFrame,
    writtenStem,
    ruleId: boundaryRuleId === "ordinary-compound-boundary"
      ? sourceShapeRule
      : `${sourceShapeRule}+${boundaryRuleId}`,
    sourceShapeAuthority: sourceClass?.sourceAuthority
      || (lexicalFacts.capturedEmbedResult
        ? "owner-issued-nnc-result"
        : "typed-open-nnc-source"),
    fullerSourceAnalysisPreserved: true,
    formulaStringAuthority: false,
    documentaryExampleAuthority: false,
  };
}

function evaluateNominalCompoundConstruction(request, target, sourceAuthorizationFrame) {
  const suppliedSource = request.source && typeof request.source === "object" ? request.source : request;
  const lexicalFacts = sourceAuthorizationFrame.lexicalFacts;
  const useSource = lexicalFacts.compoundEmbedUseSourceFrame;
  const source = ISSUED_COMPOUND_USE_SOURCE_FRAMES.has(useSource)
    ? {...suppliedSource, embedStem: useSource.sourceStem} : suppliedSource;
  const structure = normalizeKey(request.structure || source.structure || "integrated");
  const matrixStem = normalizeStem(source.matrixStem);
  const requestedMatrixClass = normalizeNounClass(source.matrixClass);
  const matrixClass = lexicalFacts.matrixSourceClassFrame?.nounClass || requestedMatrixClass;
  if (requestedMatrixClass && matrixClass !== requestedMatrixClass) {
    return buildBlockedFrame("compound-nnc", "compound-matrix-source-class-mismatch", request);
  }
  const subject = normalizeSubject(request.subject || "3sg");
  const state = normalizeKey(request.state || "absolutive");
  const animacy = normalizeKey(request.animacy || "animate");
  const requestedOrientation = normalizeKey(
    request.possessorOrientation || source.possessorOrientation
  );
  const embedRole = normalizeKey(request.embedRole || source.embedRole || "association");
  if (!["integrated", "linked-connective-t", "linked-connectiveless", "conjunctive"].includes(structure)) {
    return buildBlockedFrame("compound-nnc", "nominal-compound-compound-structure-required", request);
  }
  if (!matrixStem || !matrixClass) return buildBlockedFrame("compound-nnc", "nominal-compound-matrix-stem-and-class-required", request);
  if (!lexicalFacts.embedSourceClassFrame
    && !ISSUED_COMPOUND_USE_SOURCE_FRAMES.has(lexicalFacts.compoundEmbedUseSourceFrame)) {
    return buildBlockedFrame(
      "compound-nnc",
      "nominal-compound-embed-stem-and-class-required",
      request
    );
  }
  if (!subject) return buildBlockedFrame("compound-nnc", "unknown-nnc-subject", request);
  if (!["absolutive", "possessive"].includes(state)) return buildBlockedFrame("compound-nnc", "nominal-compound-state-required", request);
  if (!NOMINAL_COMPOUND_EMBED_ROLES.includes(embedRole)) return buildBlockedFrame("compound-nnc", "nominal-compound-embed-role-required", request);
  const linkedStructure = structure.startsWith("linked");
  const inheritedEmbedOrientation = Boolean(
    lexicalFacts.capturedEmbedState === "possessive"
    && lexicalFacts.capturedEmbedPossessor
  );
  const possessorOrientationOptions = linkedStructure
    || inheritedEmbedOrientation
    ? ["embed"]
    : state === "possessive"
      ? ["matrix", "embed"]
      : ["matrix"];
  const orientation = requestedOrientation
    || possessorOrientationOptions[0];
  if (linkedStructure && requestedOrientation && orientation !== "embed") {
    return buildBlockedFrame("compound-nnc", "linked-compound-requires-embed-possessor-orientation", request);
  }
  if (!possessorOrientationOptions.includes(orientation)) {
    return buildBlockedFrame(
      "compound-nnc",
      inheritedEmbedOrientation
        ? "captured-possessive-embed-requires-embed-orientation"
        : "nominal-compound-possessor-orientation-required",
      request
    );
  }
  if (normalizeKey(lexicalFacts.specialMatrix) === "poh" && state !== "possessive") {
    return buildBlockedFrame("compound-nnc", "fellowship-poh-is-possessive-state-only", request);
  }
  const specialMatrix = normalizeKey(lexicalFacts.specialMatrix);
  const specialMatrixRequirements = {
    ca: ["ca"],
    yō: ["yō", "yo"],
    poh: ["poh"],
    conē: ["conē", "cone"],
    "pil-tōn": ["pil-tōn", "pil-ton"],
  };
  if (specialMatrix && !Object.hasOwn(specialMatrixRequirements, specialMatrix)) {
    return buildBlockedFrame("compound-nnc", "recognized-special-compound-nnc-matrix-required", request);
  }
  if (specialMatrix && !specialMatrixRequirements[specialMatrix].includes(matrixStem)) {
    return buildBlockedFrame("compound-nnc", "special-compound-nnc-matrix-stem-mismatch", request);
  }
  if (embedRole === "sex" && !lexicalFacts.sexDistinctionFrame) {
    return buildBlockedFrame(
      "compound-nnc",
      "sex-compound-requires-typed-sex-distinction-embed-analysis",
      request
    );
  }
  if (
    embedRole === "sex"
    && normalizeKey(animacy) !== "animate"
  ) {
    return buildBlockedFrame(
      "compound-nnc",
      "sex-distinction-compound-requires-animate-matrix-referent",
      request
    );
  }
  if (embedRole === "progeny" && !["conē", "pil-tōn"].includes(specialMatrix)) {
    return buildBlockedFrame("compound-nnc", "progeny-compound-requires-cone-or-pil-ton-matrix", request);
  }
  if (embedRole === "fellowship" && specialMatrix !== "poh") {
    return buildBlockedFrame("compound-nnc", "fellowship-compound-requires-poh-matrix", request);
  }
  const embedFollowingStem = structure === "conjunctive"
    ? lexicalFacts.firstConjunctVestige
    : matrixStem;
  const embedShape = realizeCompoundEmbed(
    source,
    embedFollowingStem,
    lexicalFacts,
    target
  );
  if (embedShape.authorizationStatus !== "authorized") return buildBlockedFrame("compound-nnc", embedShape.blockReason, request, { embedShape });
  const reduplication = normalizeKey(request.reduplication || "none");
  const requestedReduplicationTarget = normalizeKey(
    request.reduplicationTarget || ""
  );
  const affinityAnalysis = lexicalFacts.affinityScopeAnalysisFrame || null;
  if (subject.endsWith("pl") && affinityAnalysis?.lexicalRequirement === "obligatory"
    && reduplication !== "affinity") {
    return buildBlockedFrame("compound-nnc",
      "nominal-compound-obligatory-affinity-requires-affinity", request);
  }
  const reduplicationTarget = reduplication === "affinity"
    ? requestedReduplicationTarget
      || affinityAnalysis?.availableTargets?.[0]
      || "embed"
    : "embed";
  if (reduplication === "affinity" && !subject.endsWith("pl")) {
    return buildBlockedFrame(
      "compound-nnc",
      "nominal-compound-affinity-reduplication-requires-plural-subject",
      request
    );
  }
  if (
    reduplication === "affinity"
    && affinityAnalysis
    && !affinityAnalysis.availableTargets.includes(reduplicationTarget)
  ) {
    return buildBlockedFrame(
      "compound-nnc",
      "nominal-compound-affinity-target-not-licensed-by-typed-source",
      request
    );
  }
  if (
    reduplication === "distributive-varietal"
    && requestedReduplicationTarget
    && requestedReduplicationTarget !== "embed"
  ) {
    return buildBlockedFrame("compound-nnc", "nominal-compound-distributive-varietal-reduplication-requires-embed", request);
  }
  if (!["none", "affinity", "distributive-varietal"].includes(reduplication)) {
    return buildBlockedFrame("compound-nnc", "nominal-compound-reduplication-kind-invalid", request);
  }
  if (!["embed", "matrix", "both"].includes(reduplicationTarget)) {
    return buildBlockedFrame("compound-nnc", "nominal-compound-reduplication-target-invalid", request);
  }
  const affinityScopeFrame = reduplication === "affinity"
    ? deepFreeze({
      kind: "classical-nahuatl-compound-affinity-scope-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      embedStem: normalizeStem(source.embedStem),
      matrixStem,
      availableTargets: Object.freeze(affinityAnalysis
        ? [...affinityAnalysis.availableTargets]
        : ["embed", "matrix", "both"]),
      selectedTarget: reduplicationTarget,
      targetChoiceRequired: affinityAnalysis
        ? affinityAnalysis.targetChoiceRequired
        : true,
      lexicalRequirement:
        affinityAnalysis?.lexicalRequirement || "unspecified",
      subject,
      pluralSubjectRequired: true,
      pluralSubjectSatisfied: subject.endsWith("pl"),
      vowelQuantityPreserved: true,
      sourceBoundaryPreserved: true,
      scopeAuthority: affinityAnalysis
        ? "typed-source-analysis"
        : "single-selected-source-scope",
      productiveRouteAuthority: false,
      documentaryExampleAuthority: false,
    })
    : null;
  const distributiveVarietalFrame = reduplication
    === "distributive-varietal"
    ? lexicalFacts.distributiveVarietalAnalysisFrame
    : null;
  const capturedRecursiveEmbedResult = lexicalFacts.compoundNncEmbed
    ? lexicalFacts.capturedEmbedResult
    : null;
  const capturedRecursiveMatrixResult = lexicalFacts.compoundNncMatrix
    ? lexicalFacts.capturedMatrixNncResult
    : null;
  const derivedBracketing = capturedRecursiveEmbedResult
    && capturedRecursiveMatrixResult
    ? "both"
    : capturedRecursiveEmbedResult
      ? "compound-embed"
      : capturedRecursiveMatrixResult
        ? "compound-matrix"
        : "unambiguous";
  const requestedBracketing = normalizeKey(
    request.bracketing || source.bracketing || ""
  );
  const bracketing = derivedBracketing !== "unambiguous"
    ? derivedBracketing
    : requestedBracketing || "unambiguous";
  if (!["unambiguous", "compound-embed", "compound-matrix", "both"].includes(bracketing)) {
    return buildBlockedFrame("compound-nnc", "recognized-compound-nnc-bracketing-required", request);
  }
  if (
    derivedBracketing !== "unambiguous"
    && requestedBracketing
    && requestedBracketing !== "unambiguous"
    && requestedBracketing !== derivedBracketing
  ) {
    return buildBlockedFrame(
      "compound-nnc",
      "recursive-compound-bracketing-conflicts-with-captured-results",
      request
    );
  }
  if (
    derivedBracketing === "unambiguous"
    && bracketing !== "unambiguous"
  ) {
    return buildBlockedFrame(
      "compound-nnc",
      "recursive-compound-requires-owner-issued-compound-result",
      request
    );
  }
  const recursiveEmbed = ["compound-embed", "both"].includes(bracketing);
  const recursiveMatrix = ["compound-matrix", "both"].includes(bracketing);
  const innerEmbedDepth = Number(
    capturedRecursiveEmbedResult?.operationFrame?.recursiveHierarchyFrame
      ?.depth || (capturedRecursiveEmbedResult ? 1 : 0)
  );
  const innerMatrixDepth = Number(
    capturedRecursiveMatrixResult?.operationFrame?.recursiveHierarchyFrame
      ?.depth || (capturedRecursiveMatrixResult ? 1 : 0)
  );
  const recursiveHierarchyFrame = recursiveEmbed || recursiveMatrix
    ? deepFreeze({
      kind: "classical-nahuatl-recursive-compound-hierarchy-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      bracketing,
      derivedFromCapturedResults: true,
      bracketingOptions: Object.freeze([bracketing]),
      bracketingChoiceRequired: false,
      depth: 1 + Math.max(innerEmbedDepth, innerMatrixDepth),
      recursiveEmbed,
      recursiveMatrix,
      embedResultFrame: capturedRecursiveEmbedResult,
      matrixResultFrame: capturedRecursiveMatrixResult,
      innerEmbedMatrixStem: normalizeStem(
        capturedRecursiveEmbedResult?.operationFrame?.matrixStem
      ),
      innerMatrixMatrixStem: normalizeStem(
        capturedRecursiveMatrixResult?.operationFrame?.matrixStem
      ),
      outerMatrixStem: matrixStem,
      acyclic: true,
      surfaceSpellingAuthority: false,
      documentaryExampleAuthority: false,
    })
    : null;
  let embed = embedShape.writtenStem;
  let matrix = matrixStem;
  const yoEmbedHistoryFrame = lexicalFacts.yoEmbedHistoryFrame || null;
  let yoSupportiveInitialIFrame = null;
  if (yoEmbedHistoryFrame?.embedState === "possessive") {
    if (yoEmbedHistoryFrame.initialIAnalysis === "supportive") {
      yoSupportiveInitialIFrame = target.buildClassicalNahuatlSupportiveVowelFrame?.({
        sourceSegments: [yoEmbedHistoryFrame.possessorMorpheme, "i", embed.slice(1).replace(/-/gu, "")],
        tokenLevelLegal: true,
        supportiveVowelNeeded: false,
        insertionPosition: "before",
        supportiveIndex: 1,
      });
      if (!target.isClassicalNahuatlTranscriptionAnalysisFrame?.(yoSupportiveInitialIFrame)
        || yoSupportiveInitialIFrame.authorizationStatus !== "authorized") {
        return buildBlockedFrame("compound-nnc", yoSupportiveInitialIFrame?.blockReason
          || "yo-possessive-embed-supportive-i-owner-required", request);
      }
      embed = yoSupportiveInitialIFrame.outputForm;
    } else {
      embed = joinStemParts([yoEmbedHistoryFrame.possessorMorpheme, embed]);
    }
  }
  const matrixInitialIVariant = normalizeKey(request.matrixInitialIVariant || "retain");
  let matrixSupportiveInitialIFrame = null;
  if (!["retain", "absent"].includes(matrixInitialIVariant)) {
    return buildBlockedFrame("compound-nnc", "compound-matrix-initial-i-variant-invalid", request);
  }
  if (matrixInitialIVariant === "absent") {
    if (lexicalFacts.matrixInitialIAnalysis !== "supportive" || !/^i/u.test(matrix)
      || structure !== "integrated" || recursiveMatrix) {
      return buildBlockedFrame("compound-nnc", "compound-matrix-supportive-i-variant-not-licensed", request);
    }
    matrixSupportiveInitialIFrame = target.buildClassicalNahuatlSupportiveVowelFrame?.({
      sourceSegments: [embed.replace(/-/gu, ""), "i", matrix.slice(1).replace(/-/gu, "")],
      tokenLevelLegal: true, supportiveVowelNeeded: false,
      insertionPosition: "before", supportiveIndex: 1,
    });
    if (!target.isClassicalNahuatlTranscriptionAnalysisFrame?.(matrixSupportiveInitialIFrame)
      || matrixSupportiveInitialIFrame.authorizationStatus !== "authorized") {
      return buildBlockedFrame("compound-nnc", matrixSupportiveInitialIFrame?.blockReason
        || "compound-matrix-supportive-i-owner-required", request);
    }
    matrix = matrix.slice(1);
  }
  let matrixBoundaryRuleId = "ordinary-matrix-boundary";
  let matrixBoundaryFrame = null;
  if (specialMatrix === "yō" || /l$/u.test(embed) && /^tl/u.test(matrix)) {
    const boundary = target.buildClassicalNahuatlProgressiveAssimilationFrame(
      joinStemParts([embed, matrix])
    );
    if (boundary.authorizationStatus !== "authorized") {
      return buildBlockedFrame("compound-nnc", boundary.blockReason, request);
    }
    matrixBoundaryFrame = boundary;
    const matrixAction = boundary.boundaryActions.find(
      action => action.boundaryIndex === normalizeStem(embed).split("-").length - 1
    );
    if (matrixAction) {
      matrix = joinStemParts([matrixAction.realizedRightMorph, ...normalizeStem(matrix).split("-").slice(1)]);
      matrixBoundaryRuleId = matrixAction.selectedRuleId;
    }
  }
  const redupMode = reduplication === "affinity" ? "affinity" : "distributive";
  if (reduplication !== "none" && ["embed", "both"].includes(reduplicationTarget)) embed = reduplicateInitial(embed, redupMode, "initial");
  if (reduplication !== "none" && ["matrix", "both"].includes(reduplicationTarget)) matrix = reduplicateInitial(matrix, redupMode, "initial");
  let matrixNumberFrame = null;
  let matrixNumberResult = null;
  if (subject.endsWith("pl") && state === "absolutive"
    && structure === "integrated" && matrix === matrixStem) {
    const probe = target.buildClassicalNahuatlPronominalNncSourceFrame?.({stem: matrixStem});
    const matrixSource = probe?.lexicalAuthorizationStatus === "authorized"
      ? target.buildClassicalNahuatlPronominalNncSourceFrame({
        stem: matrixStem, embedStem: probe.embedStem, matrixStem: probe.matrixStem,
      }) : null;
    if (target.isClassicalNahuatlPronominalNncSourceFrame?.(matrixSource)) {
      const operation = target.buildClassicalNahuatlPronominalNncOperationFrame(matrixSource, {
        subject, numberForm: normalizeKey(request.pluralConnector || "t-in"),
      });
      matrixNumberResult = target.evaluateClassicalNahuatlPronominalNnc(matrixSource, operation);
      if (!target.isClassicalNahuatlPronominalNncResult(matrixNumberResult)) {
        return buildBlockedFrame("compound-nnc", matrixNumberResult.blockReason, request);
      }
      const projection = target.getClassicalNahuatlPronominalNncRestrictedUseCitationProjection(matrixNumberResult);
      if (projection.authorizationStatus !== "authorized") {
        return buildBlockedFrame("compound-nnc", projection.blockReason, request);
      }
      // The matrix is embedded, so its citation stem supplies the boundary;
      // standalone subject-conditioned eh/yeh selection does not apply here.
      // Its owner still performs internal pluralization and licenses the dyad.
      const number = projection.numberAnalysisFrame;
      const embeddedPredicate = number.internalPluralMorph === "n-inside-stem"
        ? pluralizeClassicalNahuatlLesson16InternalStem(matrixStem)
        : number.predicateStem;
      if (!embeddedPredicate) {
        return buildBlockedFrame("compound-nnc", "compound-matrix-internal-plural-shape-required", request);
      }
      matrixNumberFrame = deepFreeze({...number, predicateStem: embeddedPredicate});
      matrix = matrixNumberFrame.predicateStem;
    }
  }
  const ownedMatrix = lexicalFacts.capturedMatrixNncResult;
  if (structure === "integrated" && matrix === matrixStem && ownedMatrix) {
    if (target.isClassicalNahuatlDeverbalNncGrammarFrame?.(ownedMatrix)
      && ["preterit-agentive", "customary-agentive-reanalysis"].includes(
        ownedMatrix.operationFrame?.nominalizationKind)
      && state === "absolutive") {
      // Re-enter the same native nominal owner for outside subject/number.
      // Customary reanalysis keeps its VNC dyads (0-0 / 0-h), never t-in.
      const operation = ownedMatrix.operationFrame;
      const ownerhood = operation.constructionKind === "ownerhood";
      const ownerhoodParent = operation.ownerhoodSourceCaptureFrame?.canonicalNncResult;
      matrixNumberResult = target.evaluateClassicalNahuatlDeverbalNnc(ownerhood ? {
        constructionKind: "ownerhood",
        ...(ownerhoodParent ? {canonicalNncResult: ownerhoodParent} : {}),
        source: {
          ownerhoodMatrix: operation.ownerhoodMatrix,
          ...(!ownerhoodParent ? {
            sourceStem: operation.ownerhoodCharacteristicSourceFrame?.fullSourceStem
              || operation.restrictedUseNounSourceStem,
            nounClass: operation.sourceNounClass,
            nounSubclass: operation.sourceNounSubclass,
          } : {}),
        },
        ownerhoodBoundaryVariant: operation.ownerhoodBoundaryFrame?.boundaryVariant,
        ...(["full", "omitted"].includes(operation.characteristicMatrixRealization)
          ? {characteristicMatrixRealization: operation.characteristicMatrixRealization} : {}),
        subject, state, animacy, numberConnector: operation.singularConnectorChoice,
      } : {
        constructionKind: "predicate-nominalization",
        nominalizationKind: operation.nominalizationKind,
        canonicalVncResult: ownedMatrix.sourceFrame.canonicalVncResult,
        subject, state, animacy, numberConnector: operation.singularConnectorChoice,
      });
      if (target.isClassicalNahuatlDeverbalNncGrammarFrame?.(matrixNumberResult) !== true
        || matrixNumberResult.authorizationStatus !== "authorized") return buildBlockedFrame(
          "compound-nnc", matrixNumberResult?.blockReason || "compound-matrix-agentive-number-required", request);
      matrixNumberFrame = matrixNumberResult.canonicalResult.numberFrame;
      matrix = matrixNumberResult.canonicalResult.nncSlotFrame.slots.predicate.stem;
    } else if (target.isClassicalNahuatlOrdinaryNncResult?.(ownedMatrix)
      && ownedMatrix.stemOperation?.predicateFormation === "secondary-general-use"
      && state === "absolutive") {
      // The inner possessor was downgraded into the secondary stem. Its
      // owner chooses the matrix's possessed use/number; no outer State is added.
      const operation = target.buildClassicalNahuatlOrdinaryNncOperationFrame(ownedMatrix.sourceFrame, {
        predicateFormation: "secondary-general-use", state: "possessive", subject,
        possessor: "nonspecific-human", nonspecificHumanForm: ownedMatrix.operationFrame.nonspecificHumanForm,
      });
      matrixNumberResult = target.evaluateClassicalNahuatlOrdinaryNnc(ownedMatrix.sourceFrame, operation);
      if (target.isClassicalNahuatlOrdinaryNncResult?.(matrixNumberResult) !== true) return buildBlockedFrame(
        "compound-nnc", matrixNumberResult?.blockReason || "compound-secondary-matrix-use-required", request);
      const slots = matrixNumberResult.typedSlotFrame;
      matrix = slots.slots.predicate.stem;
      matrixNumberFrame = deepFreeze({authorizationStatus: "authorized", nounClass: slots.nounClass,
        subjectNumber: slots.subjectNumber, animacy: slots.subjectAnimacy, ...slots.slots.number});
    } else if (target.isClassicalNahuatlNominalConstructionResult?.(ownedMatrix)
      && ownedMatrix.constructionKind === "affective-nnc"
      && (ownedMatrix.typedSlotFrame || ownedMatrix.canonicalResult?.nncSlotFrame)?.subjectNumber
        === (subject.endsWith("pl") ? "plural" : subject === "3common" ? "common" : "singular")
      && (ownedMatrix.typedSlotFrame || ownedMatrix.canonicalResult?.nncSlotFrame)?.slots.state.arity
        === (state === "absolutive" ? "vacant" : "dyadic")) {
      const slots = ownedMatrix.typedSlotFrame || ownedMatrix.canonicalResult?.nncSlotFrame;
      matrixNumberResult = ownedMatrix;
      matrixNumberFrame = deepFreeze({authorizationStatus: "authorized", nounClass: slots.nounClass,
        subjectNumber: slots.subjectNumber, animacy: slots.subjectAnimacy, ...slots.slots.number});
    }
  }
  const embedIntensification = normalizeKey(request.embedIntensification || "none");
  const matrixExpansion = normalizeKey(request.matrixExpansion || "none");
  if (!["none", "long-vowel-quality"].includes(embedIntensification)
    || !["none", "internal-heavy"].includes(matrixExpansion)) {
    return buildBlockedFrame("compound-nnc", "recognized-adjectival-compound-scope-required", request);
  }
  let embedIntensityFrame = null;
  if (embedIntensification !== "none") {
    const bridge = lexicalFacts.adjectivalSourceConstituentFrame;
    if (!isClassicalNahuatlAdjectivalNncSourceConstituentFrame(bridge)
      || bridge.useShape !== "source-root" || structure !== "integrated") return buildBlockedFrame(
        "compound-nnc", "embed-quality-requires-owned-adjectival-root", request);
    const intensifiedStem = reduplicate(embed, "long", {supportiveI: lexicalFacts.sourceInitialIAnalysis === "supportive"});
    embedIntensityFrame = deepFreeze({kind:"classical-nahuatl-compound-embed-quality-frame",
      authorizationStatus:"authorized", canonicalSourceBridge:bridge,
      originalStem:embed, targetStem:intensifiedStem, operationScope:"embed", reading:"quality-intensification"});
    embed = intensifiedStem;
  }
  let matrixExpansionFrame = null;
  if (matrixExpansion !== "none") {
    // These separately attested matrix expansions belong to the authenticated
    // inchoative Source, not to an arbitrary spelling transform on any matrix.
    const fullMatrixSource = ownedMatrix?.sourceFrame?.sourceStem;
    const expansionRoot = {"pah-ti":"palalah", "cal-ti":"calalah"}[fullMatrixSource];
    if (!expansionRoot || structure !== "integrated"
      || ownedMatrix.operationFrame?.nominalizationKind !== "preterit-agentive"
      || !matrix.startsWith(fullMatrixSource)) return buildBlockedFrame(
        "compound-nnc", "matrix-heavy-expansion-requires-attested-owned-source", request);
    const expandedMatrix = joinStemParts([expansionRoot, "ti", ...matrix.split("-").slice(2)]);
    matrixExpansionFrame = deepFreeze({kind:"classical-nahuatl-adjectival-matrix-expansion-frame",
      authorizationStatus:"authorized", canonicalMatrixResult:ownedMatrix,
      canonicalSourceFrame:ownedMatrix.sourceFrame, originalStem:matrix,
      targetStem:expandedMatrix, operationScope:"matrix", expansion:"internal-heavy"});
    matrix = expandedMatrix;
  }
  if (lexicalFacts.lexicalizedAdjectivalModification === true) {
    if (structure !== "integrated" || reduplication !== "none") return buildBlockedFrame(
      "compound-nnc", "fixed-modification-lexicalization-scope-required", request);
    // The original head's subject remains inside the fixed stem; the new NNC
    // imports its own outside subject/number and uses that head's real class.
    matrix = joinStemParts([
      ...lexicalFacts.capturedAdjectivalModificationFrame.headPart.subjectPersonCarriers
        .filter(carrier => !["0", "Ø", "⎕"].includes(carrier)), matrix,
    ]);
  }
  let compoundStem = "";
  if (structure === "conjunctive") {
    const vestige = normalizeKey(
      lexicalFacts.firstConjunctVestige || "tl"
    );
    if (!["l", "tl", "tli"].includes(vestige)) return buildBlockedFrame("compound-nnc", "conjunctive-compound-first-num1-vestige-required", request);
    compoundStem = joinStemParts([embed, vestige, matrix]);
  } else if (structure === "linked-connective-t") {
    // §58.2.5 also permits the selected connective between nounstems
    // whose matrix is nonrelational. It is part of the compound stem.
    compoundStem = joinStemParts([embed, "ti", matrix]);
  } else {
    compoundStem = joinStemParts([realizeBoundaryAssimilation(embed, matrix), matrix]);
  }
  const matrixStateUseStemFrame = state === "possessive"
    ? buildCompoundNncUseStemFrame(compoundStem, lexicalFacts.matrixSourceClassFrame, target)
    : null;
  if (matrixStateUseStemFrame && matrixStateUseStemFrame.authorizationStatus !== "authorized") {
    return buildBlockedFrame("compound-nnc", matrixStateUseStemFrame.blockReason, request);
  }
  const stateRealizedCompoundStem = specialMatrix === "yō"
    && state === "possessive"
    ? compoundStem.replace(/ō$/u, "o")
    : matrixStateUseStemFrame?.generalUseStem || compoundStem;
  const stateStemRuleId = specialMatrix === "yō"
    && state === "possessive"
    ? "yo-tl-1-b-final-o-shortening-before-possessive-zero-dyad"
    : matrixStateUseStemFrame ? "compound-matrix-class-general-use"
      : "compound-source-stem-preserved";
  const sourceFrame = deepFreeze({
    kind: "classical-nahuatl-nominal-compound-source-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    structure,
    supportiveInitialI: lexicalFacts.sourceInitialIAnalysis === "supportive",
    matrixInitialIAnalysis: lexicalFacts.matrixInitialIAnalysis,
    embedStem: normalizeStem(source.embedStem),
    embedSourceClass: embedShape.sourceClass,
    embedNounClass: embedShape.nounClass,
    matrixStem,
    matrixClass,
    ...(lexicalFacts.matrixSourceClassFrame?.restrictedUseOnly === true ? {
      restrictedUseOnly: true, generalUseShapeClaimed: false,
      possessiveSubclassClaimed: false,
    } : {}),
    matrixSourceClass:
      lexicalFacts.matrixSourceClassFrame?.sourceClass || matrixClass,
    resultSourceClass: lexicalFacts.caMatrixFrame?.resultSourceClass
      || lexicalFacts.matrixSourceClassFrame?.sourceClass
      || matrixClass,
    embedRole,
    possessorOrientation: orientation,
    possessorOrientationOptions: Object.freeze([
      ...possessorOrientationOptions,
    ]),
    possessorOrientationChoiceRequired:
      possessorOrientationOptions.length > 1,
    possessorOrientationSource: linkedStructure
      ? "linked-structure"
      : inheritedEmbedOrientation
        ? "captured-possessive-embed"
        : state === "possessive"
          ? "integrated-source-analysis"
          : "irrelevant-in-absolutive-state",
    orderedConstituents: Object.freeze(structure === "conjunctive"
      ? ["first-conjunct", "second-conjunct"]
      : ["embed", "matrix"]),
    constituentRelation: structure === "conjunctive"
      ? "conjunction"
      : "government",
    sourceBoundaryPreserved: true,
    embedSourceAnalysisPreserved: true,
    compoundEmbedAnalysisFrame:
      lexicalFacts.compoundEmbedAnalysisFrame || null,
    uniqueCompoundNounstemAnalysisFrame:
      lexicalFacts.uniqueCompoundNounstemAnalysisFrame || null,
    uniqueCompoundNounstemAnalysisFrames:
      lexicalFacts.uniqueCompoundNounstemAnalysisFrames || Object.freeze([]),
    caMatrixFrame: lexicalFacts.caMatrixFrame || null,
    ordinaryFinalCaFrame: lexicalFacts.ordinaryFinalCaFrame || null,
    yoMatrixFrame: lexicalFacts.yoMatrixFrame || null,
    yoEmbedHistoryFrame,
    yoSupportiveInitialIFrame,
    matrixInitialIVariant,
    matrixSupportiveInitialIFrame,
    adjectivalModificationIncorporationFrame:
      lexicalFacts.capturedAdjectivalModificationFrame || null,
    recursiveHierarchyFrame,
    sexDistinctionFrame: lexicalFacts.sexDistinctionFrame || null,
    progenyMatrixFrame: lexicalFacts.progenyMatrixFrame || null,
    fellowshipMatrixFrame: lexicalFacts.fellowshipMatrixFrame || null,
    affinityScopeFrame,
    distributiveVarietalFrame,
    conjunctiveStructureFrame:
      lexicalFacts.conjunctiveStructureFrame || null,
    ...(lexicalFacts.capturedLexicalConjunctionResult ? {
      canonicalLexicalConjunctionResult: lexicalFacts.capturedLexicalConjunctionResult,
      lexicalConjunctionHandoffFrame: lexicalFacts.lexicalConjunctionHandoffFrame,
    } : {}),
    matrixGovernsClass: structure !== "conjunctive",
    resultClassSource: structure === "conjunctive"
      ? "second-conjunct"
      : "matrix",
    matrixSelectionAuthority: "typed-source-analysis",
    englishGlossOrderAuthority: false,
    translationAuthority: false,
    documentaryExampleAuthority: false,
  });
  const appliedSemanticRules = new Set([
    "compound-nnc/base",
    "compound-nnc/embed-role",
    "compound-nnc/possessor-orientation",
    "compound-nnc/matrix-governance",
    "compound-nnc/stem-shape",
  ]);
  if (lexicalFacts.orderAlternative === true) appliedSemanticRules.add("compound-nnc/order-ambiguity");
  if (embedShape.lexicalException === "glottalized-long-vowel") {
    appliedSemanticRules.add("compound-nnc/glottalized-embed");
  }
  if (embedShape.lexicalException === "negative-ah") {
    appliedSemanticRules.add("compound-nnc/negative-embed");
  }
  if (embedShape.boundaryRuleId === "final-h-to-y-before-vowel") {
    appliedSemanticRules.add("compound-nnc/lexical-boundary");
  }
  if (lexicalFacts.uniqueCompoundNounstemAnalysisFrames?.length) {
    appliedSemanticRules.add("compound-nnc/unique-lexeme");
  }
  if (lexicalFacts.adjectivalModificationEmbed) {
    appliedSemanticRules.add(
      "compound-nnc/incorporated-adjectival-modification",
    );
  }
  if (lexicalFacts.caMatrixFrame) {
    appliedSemanticRules.add("compound-nnc/ca-matrix");
  }
  if (lexicalFacts.ordinary2bFinalCaMatrix === true) {
    appliedSemanticRules.add("compound-nnc/ca-exclusion");
  }
  if (specialMatrix === "yō") {
    appliedSemanticRules.add("compound-nnc/yo-matrix");
    if (stateStemRuleId
      === "yo-tl-1-b-final-o-shortening-before-possessive-zero-dyad") {
      appliedSemanticRules.add("compound-nnc/yo-possessive-o-shortening");
    }
    if (yoEmbedHistoryFrame?.embedState === "possessive") {
      appliedSemanticRules.add("compound-nnc/yo-possessive-embed");
    }
    if (matrixBoundaryRuleId !== "ordinary-matrix-boundary") {
      appliedSemanticRules.add("compound-nnc/yo-boundary-assimilation");
    }
  }
  if (structure === "conjunctive") appliedSemanticRules.add("compound-nnc/conjunctive");
  if (recursiveEmbed || recursiveMatrix) {
    appliedSemanticRules.add("compound-nnc/recursion");
  }
  if (bracketing !== "unambiguous") appliedSemanticRules.add("compound-nnc/bracketing");
  if (embedRole === "sex") appliedSemanticRules.add("compound-nnc/sex");
  if (embedRole === "progeny") appliedSemanticRules.add("compound-nnc/progeny");
  if (embedRole === "fellowship") appliedSemanticRules.add("compound-nnc/fellowship");
  if (specialMatrix === "poh") appliedSemanticRules.add("compound-nnc/fellowship");
  if (reduplication === "affinity") appliedSemanticRules.add("compound-nnc/affinity");
  if (reduplication === "distributive-varietal") appliedSemanticRules.add("compound-nnc/distributive");
  const compoundSourceOperationIds = [
    "nominal-compound-compound-nnc",
    `nominal-compound-${structure}`,
    `nominal-compound-${embedRole}`,
  ];
  // The matrix governs both the use stem and the possessed number connector.
  // Let the ordinary noun owner select that connector from the inherited class.
  const matrixClassFrame = lexicalFacts.matrixSourceClassFrame;
  let matrixConnectorSelectionFrame = null;
  if (state === "possessive" && !subject.endsWith("pl")
    && matrixClassFrame?.subclass) {
    const connectorSource = target.buildClassicalNahuatlNounstemSourceFrame?.(compoundStem, {
      state, nounClass: matrixClassFrame.nounClass,
      classSelectionAuthority: "user-selection",
      classMembershipOptions: [matrixClassFrame.nounClass],
      generalUseShape: matrixClassFrame.useShape,
      tlSubclass: normalizeKey(matrixClassFrame.subclass).replace(/^tl-/u, ""),
      tliSubclass: normalizeKey(matrixClassFrame.subclass).replace(/^tli-/u, ""),
      ephemeralFinalVowel: matrixClassFrame.ephemeralFinalVowel,
      truncationRepair: matrixClassFrame.truncationRepair,
    });
    if (connectorSource?.authorizationStatus !== "authorized") {
      return buildBlockedFrame("compound-nnc", connectorSource?.blockReason
        || "compound-matrix-number-source-required", request);
    }
    matrixConnectorSelectionFrame = target.resolveClassicalNahuatlLesson14ConnectorSelection?.(
      connectorSource, null, {
        subject,
        tlSubclass: normalizeKey(matrixClassFrame.subclass).replace(/^tl-/u, ""),
        tliSubclass: normalizeKey(matrixClassFrame.subclass).replace(/^tli-/u, ""),
        singularConnector: request.singularPossessiveConnector,
      }
    );
    if (matrixConnectorSelectionFrame?.authorizationStatus !== "authorized") {
      return buildBlockedFrame("compound-nnc", matrixConnectorSelectionFrame?.blockReason
        || "compound-matrix-number-connector-required", request);
    }
    if (request.singularPossessiveConnector
      && normalizeKey(request.singularPossessiveConnector)
        !== normalizeKey(matrixConnectorSelectionFrame.singularConnector)) {
      return buildBlockedFrame("compound-nnc", "compound-matrix-number-connector-mismatch", request);
    }
  }
  const targetResult = buildNncTarget({
    target,
    constructionFamily: "nominal-compound",
    sourceFrame,
    stem: stateRealizedCompoundStem,
    numberFrameOverride: matrixNumberFrame,
    nounClass: matrixClass,
    subject,
    state,
    possessor: normalizeKey(request.possessor || "3sg"),
    animacy,
    ...(lexicalFacts.capturedLexicalConjunctionResult ? {subjectSemanticContext:{
      animacy, humanness:normalizeKey(request.humanness || "unspecified"),
    }} : {}),
    pluralConnector: normalizeKey(request.pluralConnector || "t-in"),
    singularPossessiveConnector: matrixConnectorSelectionFrame?.singularConnector
      || normalizeKey(request.singularPossessiveConnector || "0"),
    operationIds: compoundSourceOperationIds,
    nncLayerOperationIds: [
      "nnc-clause-shell",
      state === "possessive"
        ? "nnc-possessive-state"
        : "nnc-absolutive-state",
    ],
  });
  const typedSlotFrame = targetResult.authorizationStatus === "authorized"
    ? targetResult.nncSlotFrame
    : null;
  const sentenceFrame = typedSlotFrame
    && typeof target.buildClassicalNahuatlNncSentenceSurfaceFrame
      === "function"
    ? target.buildClassicalNahuatlNncSentenceSurfaceFrame(
      typedSlotFrame,
      {
        sentenceType: "assertion",
        polarity: "positive",
        predicateKind: "equative",
      },
    )
    : null;
  const sentenceFrameAuthorized = Boolean(
    sentenceFrame
    && typeof target.isClassicalNahuatlIssuedNncSentenceSurfaceFrame
      === "function"
    && target.isClassicalNahuatlIssuedNncSentenceSurfaceFrame(
      sentenceFrame,
    )
  );
  return deepFreeze({
    kind: "classical-nahuatl-nominal-construction-result-frame",
    version: VERSION,
    constructionFamily: "nnc-plus-nnc-compound",
    authorizationStatus: targetResult.authorizationStatus,
    blockReason: targetResult.blockReason,
    sourceFrame,
    operationFrame: {
      kind: "classical-nahuatl-nominal-compound-operation-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      state, possessor: state === "possessive" ? normalizeKey(request.possessor || "3sg") : "",
      subject,
      embedShape,
      adjectivalModificationIncorporationFrame:
        lexicalFacts.capturedAdjectivalModificationFrame || null,
      lexicalizedAdjectivalModification: lexicalFacts.lexicalizedAdjectivalModification === true,
      compoundStem,
    embedIntensification, embedIntensityFrame, matrixExpansion, matrixExpansionFrame,
      stateRealizedCompoundStem,
      matrixNumberFrame,
      matrixNumberResult,
      matrixConnectorSelectionFrame,
      stateStemRuleId,
      matrixStateUseStemFrame,
      embedStem: normalizeStem(source.embedStem),
      matrixStem,
      embedRole,
      matrixClass,
      possessorOrientation: orientation,
      possessorOrientationOptions: Object.freeze([
        ...possessorOrientationOptions,
      ]),
      possessorOrientationChoiceRequired:
        possessorOrientationOptions.length > 1,
      possessorOrientationSource: sourceFrame.possessorOrientationSource,
      capturedNncConstituentCount:
        lexicalFacts.capturedNncConstituentCount,
      embedSourceClassFrame: lexicalFacts.embedSourceClassFrame,
      compoundEmbedUseSourceFrame: lexicalFacts.compoundEmbedUseSourceFrame,
      embedClassConstraintFrame: embedShape.classConstraintFrame || null,
      matrixSourceClassFrame: lexicalFacts.matrixSourceClassFrame,
      resultSourceClassFrame: lexicalFacts.caMatrixFrame
        ? deepFreeze({
          kind: "classical-nahuatl-compound-result-source-class-frame",
          version: VERSION,
          authorizationStatus: "authorized",
          ...getCompoundEmbedSourceClassAnalysis(
            lexicalFacts.caMatrixFrame.resultSourceClass
          ),
          sourceAuthority: "typed-ca-matrix-analysis",
          documentaryExampleAuthority: false,
        })
        : lexicalFacts.matrixSourceClassFrame,
      resultSourceClass: sourceFrame.resultSourceClass,
      compoundEmbedAnalysisFrame:
        lexicalFacts.compoundEmbedAnalysisFrame || null,
      uniqueCompoundNounstemAnalysisFrame:
        lexicalFacts.uniqueCompoundNounstemAnalysisFrame || null,
      uniqueCompoundNounstemAnalysisFrames:
        lexicalFacts.uniqueCompoundNounstemAnalysisFrames || Object.freeze([]),
      caMatrixFrame: lexicalFacts.caMatrixFrame || null,
      ordinaryFinalCaFrame: lexicalFacts.ordinaryFinalCaFrame || null,
      yoMatrixFrame: lexicalFacts.yoMatrixFrame || null,
      yoEmbedHistoryFrame,
      yoSupportiveInitialIFrame,
      matrixInitialIVariant,
      matrixSupportiveInitialIFrame,
      recursiveHierarchyFrame,
      sexDistinctionFrame: lexicalFacts.sexDistinctionFrame || null,
      progenyRelationFrame: embedRole === "progeny"
        ? deepFreeze({
          ...lexicalFacts.progenyMatrixFrame,
          embedStem: normalizeStem(source.embedStem),
          matrixReferentId: "compound-progeny-referent",
          recursiveAnimalDescriptionPreserved: Boolean(
            lexicalFacts.compoundNncEmbed
          ),
          ordinaryNncInflectionAutomatic: true,
          matrixClass,
        })
        : null,
      fellowshipRelationFrame: embedRole === "fellowship"
        ? deepFreeze({
          ...lexicalFacts.fellowshipMatrixFrame,
          embedStem: normalizeStem(source.embedStem),
          subjectParticipantId: `compound-subject:${subject}`,
          possessorParticipantId: `compound-possessor:${normalizeKey(
            request.possessor || "3sg"
          )}`,
          possessorOrientation: orientation,
          sourceState: state,
          subjectNumber: subject.endsWith("pl") ? "plural" : "singular",
          ordinaryNncInflectionAutomatic: true,
          huanFellowshipRelationKeptDistinct: true,
        })
        : null,
      affinityScopeFrame,
      distributiveVarietalFrame,
      matrixBoundaryRuleId,
      matrixBoundaryFrame,
      conjunctiveStructureFrame:
        lexicalFacts.conjunctiveStructureFrame || null,
      ...(lexicalFacts.capturedLexicalConjunctionResult ? {
        canonicalLexicalConjunctionResult: lexicalFacts.capturedLexicalConjunctionResult,
        lexicalConjunctionHandoffFrame: lexicalFacts.lexicalConjunctionHandoffFrame,
      } : {}),
      firstConjunctVestige:
        lexicalFacts.conjunctiveStructureFrame?.firstConjunctVestige || "",
      constituentRelation: sourceFrame.constituentRelation,
      resultClassSource: sourceFrame.resultClassSource,
      possessiveContinuationFrame: structure === "conjunctive"
        ? deepFreeze({
          sourceState: state,
          singleCompoundAvailable: true,
          separateConjoinedNncsAvailable: state === "possessive",
          laterOwner: "double-nucleus-conjunction",
          breakupChoiceExposedHere: false,
        })
        : null,
      typedConstituentResultsPreserved: Boolean(
        lexicalFacts.capturedNncConstituentCount === 2
      ),
      orderedConstituents: sourceFrame.orderedConstituents,
      matrixSelectionAuthority: sourceFrame.matrixSelectionAuthority,
      translationAuthority: false,
      documentaryExampleAuthority: false,
      reduplication,
      reduplicationTarget,
      recursiveEmbed,
      recursiveMatrix,
      bracketing,
      appliedSemanticRules: Object.freeze([...appliedSemanticRules]),
      formulaStringAuthority: false,
    },
    canonicalTargetEvaluator: "buildClassicalNahuatlNncSlotFrame",
    canonicalResult: targetResult,
    typedSlotFrame,
    nncSlotFrame: typedSlotFrame,
    sentenceFrame: sentenceFrameAuthorized ? sentenceFrame : null,
    formulaProjection: {
      kind: "classical-nahuatl-compound-nnc-formula-projection",
      formulaRealization: targetResult.formulaRealization,
      projectionSource: "typed-nnc-slot-frame",
      writtenSurfaceAuthority: false,
    },
    writtenProjection: {
      kind: "classical-nahuatl-compound-nnc-written-projection",
      surfaceRealization: targetResult.wordSurface,
      projectionSource: "typed-nnc-boundary-realization",
      formulaStringAuthority: false,
    },
    formulaRealization: targetResult.formulaRealization,
    surfaceRealization: targetResult.wordSurface,
    wordSurface: targetResult.wordSurface,
    sentenceSurface: targetResult.sentenceSurface,
    formulaAndWrittenDerivedIndependently: true,
    typedFrameAuthority: true,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function affectiveMatrixClass(matrix, embedClass, lexicalAnalysis = null) {
  if (lexicalAnalysis?.classException === true) {
    return lexicalAnalysis.resultClass;
  }
  if (lexicalAnalysis?.lexicalizedSpecialMeaning === true) return "tli";
  if (["pil", "pōl"].includes(matrix)) return "zero";
  if (matrix === "zol") return "tli";
  return embedClass === "zero" ? "zero" : "tli";
}

function buildAffectiveDenominalSourceFrame(request, source, matrix) {
  if (!["zol", "tzin", "pōl"].includes(matrix)) {
    return buildBlockedFrame("affective-nnc", "denominal-affective-vnc-requires-zol-tzin-or-pol", request);
  }
  if (matrix === "tzin") {
    return buildBlockedFrame("affective-nnc", "tzin-denominal-vnc-is-restricted-to-honorific-matrix-operation", request);
  }
  if (matrix === "pōl") {
    return buildBlockedFrame("affective-nnc", "pol-denominal-vnc-is-restricted-to-pejorative-matrix-operation", request);
  }
  const sourceNounstem = normalizeStem(source.embedStem);
  const sourceNounClass = normalizeNounClass(source.embedClass);
  if (sourceNounstem !== "zol" || sourceNounClass !== "tli") {
    return buildBlockedFrame(
      "affective-nnc",
      "zol-denominal-continuation-requires-typed-zol-tli-source",
      request
    );
  }
  const denominalKind = normalizeKey(request.denominalKind || "inchoative");
  if (!["inchoative", "causative"].includes(denominalKind)) {
    return buildBlockedFrame("affective-nnc", "recognized-zol-denominal-operation-required", request);
  }
  const sourceFrame = deepFreeze({
    kind: "classical-nahuatl-affective-nominal-source-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    affectiveMatrix: matrix,
    denominalKind,
    sourceNounstem,
    sourceNounClass,
    sourceAnalysisPreserved: true,
    availableContinuations: Object.freeze(["inchoative", "causative"]),
    causativeObjectKinds: Object.freeze(["specific-projective", "non-specific-nonhuman"]),
    derivedVerbstemBoundary: denominalKind === "inchoative"
      ? Object.freeze(["zol", "i", "hui"])
      : Object.freeze(["zol", "o", "ā"]),
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_AFFECTIVE_DENOMINAL_SOURCE_FRAMES.add(sourceFrame);
  return sourceFrame;
}

function isAffectiveDenominalSourceFrame(frame) {
  return ISSUED_AFFECTIVE_DENOMINAL_SOURCE_FRAMES.has(frame);
}

function evaluateAffectiveDenominalVnc(request, target, source, matrix) {
  const sourceFrame = buildAffectiveDenominalSourceFrame(request, source, matrix);
  if (!isAffectiveDenominalSourceFrame(sourceFrame)) return sourceFrame;
  const { denominalKind, sourceNounstem, sourceNounClass } = sourceFrame;
  const stem = sourceFrame.derivedVerbstemBoundary.join("-");
  const verbClass = denominalKind === "inchoative" ? "B" : "C";
  const sourceValence = denominalKind === "inchoative" ? "intransitive" : "projective-nonhuman";
  const subject = normalizeSubject(request.subject || "3sg");
  if (!subject || subject === "3common") return buildBlockedFrame("affective-nnc", "denominal-vnc-requires-finite-vnc-subject", request);
  const vncRequest = {
    sourceStem: stem,
    verbClass,
    sourceValence,
    subject,
    mood: normalizeKey(request.mood || "indicative"),
    tense: normalizeKey(request.tense || "present"),
    requestedVoice: normalizeKey(request.voice || "active"),
    outputScope: "single",
  };
  const vncEvaluation = evaluateCanonicalVncCoordinate(target, vncRequest);
  const canonicalResult = vncEvaluation.canonicalResult;
  const authorized = vncEvaluation.authorizationStatus === "authorized";
  return deepFreeze({
    kind: "classical-nahuatl-nominal-construction-result-frame",
    version: VERSION,
    constructionFamily: "affective-denominal-vnc",
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized ? "" : vncEvaluation.blockReason || "canonical-zol-denominal-vnc-blocked",
    sourceFrame,
    operationFrame: {
      kind: "classical-nahuatl-affective-nominal-operation-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      operation: "denominal-vnc",
      denominalKind,
      stem,
      targetClass: verbClass,
      targetSourceValence: sourceValence,
      denominalContinuationFrame: deepFreeze({
        kind: "classical-nahuatl-zol-denominal-continuation-frame",
        version: VERSION,
        authorizationStatus: "authorized",
        sourceNounstem,
        sourceNounClass,
        availableContinuations: Object.freeze([
          "inchoative", "causative",
        ]),
        selectedContinuation: denominalKind,
        derivedVerbstem: stem,
        derivedBoundary: denominalKind === "inchoative"
          ? Object.freeze(["zol", "i", "hui"])
          : Object.freeze(["zol", "o", "ā"]),
        manualStemAssemblyAllowed: false,
        tzinContinuationRestrictedTo: "honorific-matrix-operation",
        polContinuationRestrictedTo: "pejorative-matrix-operation",
        productiveRouteAuthority: false,
        documentaryExampleAuthority: false,
      }),
      tzinPolMatrixRestrictionEnforced: true,
      appliedSemanticRules: Object.freeze([
        "nnc-to-vnc/denominal",
        "affective/zol",
      ]),
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    },
    canonicalTargetEvaluator: vncEvaluation.canonicalTargetEvaluator,
    canonicalResult,
    formulaRealization: canonicalResult?.resultFrame?.formulaRealization
      || canonicalResult?.finiteSurfaceFrame?.formulaRealization
      || canonicalResult?.formulaRealization
      || "",
    wordSurface: canonicalResult?.resultFrame?.wordSurface
      || canonicalResult?.resultFrame?.surfaceRealization
      || canonicalResult?.finiteSurfaceFrame?.wordSurface
      || canonicalResult?.finiteSurfaceFrame?.wordRealization
      || canonicalResult?.wordSurface
      || canonicalResult?.surfaceRealization
      || "",
    sentenceSurface: canonicalResult?.resultFrame?.sentenceSurface
      || canonicalResult?.finiteSurfaceFrame?.sentenceSurface
      || canonicalResult?.sentenceSurface
      || "",
    typedFrameAuthority: true,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function evaluateAffectiveNominalConstruction(request, target, sourceAuthorizationFrame) {
  const source = request.source && typeof request.source === "object" ? request.source : request;
  const lexicalFacts = sourceAuthorizationFrame.lexicalFacts;
  const contextualFlawedSubjectSourceFrame = lexicalFacts.contextualFlawedSubjectSourceFrame;
  const embedStem = normalizeStem(source.embedStem);
  const embedClass = normalizeNounClass(source.embedClass);
  const matrix = normalizeKey(request.affectiveMatrix || source.affectiveMatrix);
  const subject = normalizeSubject(request.subject || (contextualFlawedSubjectSourceFrame ? "3common" : "3sg"));
  const plural = Boolean(subject && subject.endsWith("pl"));
  const state = normalizeKey(request.state || "absolutive");
  const animacy = normalizeKey(request.animacy || source.animacy || (contextualFlawedSubjectSourceFrame ? "unspecified" : "animate"));
  const requestedAffectRoute = normalizeKey(
    request.affectRoute || "compound"
  );
  if (contextualFlawedSubjectSourceFrame && (
    requestedAffectRoute !== "flawed-subject" || subject !== "3common"
    || state !== "absolutive" || animacy !== "unspecified" || matrix
    || !["", "none"].includes(normalizeKey(request.reduplication || "none"))
    || normalizeKey(request.affectiveOutputKind || "nnc") !== "nnc"
    || request.semanticReading && !["ordinary-affective", "negative-possibility"].includes(request.semanticReading)
  )) return buildBlockedFrame("affective-nnc", "contextual-flawed-subject-negative-possibility-coordinate-mismatch", request);
  const semanticReading = contextualFlawedSubjectSourceFrame ? "negative-possibility"
    : normalizeKey(request.semanticReading || source.semanticReading || "ordinary-affective");
  const pilLexemeReading = semanticReading.startsWith("pil-")
    ? semanticReading.slice(4)
    : "";
  const pilAffinityContext = getAffectivePilAffinityContext(request, source);
  const pilChildFormation = normalizeKey(request.pilChildRoute || "simple");
  const pilGenderSpecification = normalizeKey(
    request.pilGenderSpecification || "unspecified"
  );
  const pilPossessorDistribution = normalizeKey(
    request.pilPossessorDistribution || "ordinary"
  );
  if (normalizeKey(request.affectiveOutputKind || "nnc") === "denominal-vnc") {
    return evaluateAffectiveDenominalVnc(request, target, source, matrix);
  }
  if (!embedStem || !embedClass) return buildBlockedFrame("affective-nnc", "affective-nominal-embed-stem-and-class-required", request);
  if (!subject) return buildBlockedFrame("affective-nnc", "unknown-nnc-subject", request);
  if (!["absolutive", "possessive", "vocative"].includes(state)) return buildBlockedFrame("affective-nnc", "affective-nominal-state-required", request);
  if (![
    "compound", "ordinary-subject", "flawed-subject",
  ].includes(requestedAffectRoute)) return buildBlockedFrame("affective-nnc", "affective-nominal-affect-route-required", request);
  if (!contextualFlawedSubjectSourceFrame && ![
    "ordinary-affective",
    "special-regard",
    "honorific",
    "compassion",
    "affection",
    "cherished-smallness",
    "mass-delimited",
    "pil-appendage",
    "pil-child",
    "pil-noble",
    "pil-honorific-vocative",
  ].includes(semanticReading)) {
    return buildBlockedFrame("affective-nnc", "affective-nominal-semantic-reading-required", request);
  }
  const pilLexemeAtFinalBoundary = pilAffinityContext.lexemeAtFinalBoundary;
  if (pilLexemeReading && !pilLexemeAtFinalBoundary) {
    return buildBlockedFrame(
      "affective-nnc",
      "pil-lexeme-reading-requires-typed-pil-source",
      request
    );
  }
  if (pilLexemeReading && ![
    "unspecified", "male", "female",
  ].includes(pilGenderSpecification)) {
    return buildBlockedFrame(
      "affective-nnc",
      "pil-gender-specification-invalid",
      request
    );
  }
  if (pilLexemeReading && ![
    "ordinary", "distributive-varietal",
  ].includes(pilPossessorDistribution)) {
    return buildBlockedFrame(
      "affective-nnc",
      "pil-possessor-distribution-invalid",
      request
    );
  }
  if (
    pilLexemeReading === "child"
    && !["simple", "affective"].includes(pilChildFormation)
  ) {
    return buildBlockedFrame(
      "affective-nnc",
      "pil-child-formation-invalid",
      request
    );
  }

  // Andrews §32.6.1b requires an affective matrix for singular child
  // readings; simple singular pil belongs to the noble reading (§32.6.2a).
  if (pilLexemeReading === "child" && pilChildFormation === "simple"
    && subject.endsWith("sg")) {
    return buildBlockedFrame("affective-nnc",
      "pil-child-singular-requires-affective-matrix", request);
  }

  let matrixStem = ({ pil: "pīl" })[matrix] || matrix;
  let nounClass = embedClass;
  let compoundStem = embedStem;
  let realizedEmbedStem = embedStem;
  let affectiveBoundarySpellingFrame = null;
  const realizeAffectiveEmbedBoundary = (stem, following) => {
    if (/hu$/u.test(stem) && !/^[aāeēiīoō]/u.test(following)) {
      affectiveBoundarySpellingFrame = target
        .buildClassicalNahuatlDerivationalBoundarySpellingFrame?.({
          sourceStem: stem, retainedStem: stem, followingMorpheme: following,
        }) || null;
      return affectiveBoundarySpellingFrame?.authorizationStatus === "authorized"
        ? affectiveBoundarySpellingFrame.realizedRetainedStem : stem;
    }
    if (/uh$/u.test(stem) && /^p/u.test(following)) {
      // Preserve written /w/ at this compound boundary; its spoken bilabial
      // assimilation does not require replacing the source spelling by p.
      affectiveBoundarySpellingFrame = target
        .buildClassicalNahuatlDerivationalBoundarySpellingFrame?.({
          sourceStem: stem, retainedStem: stem, followingMorpheme: following,
        }) || null;
      return affectiveBoundarySpellingFrame?.authorizationStatus === "authorized"
        ? affectiveBoundarySpellingFrame.realizedRetainedStem
        : stem;
    }
    return realizeBoundaryAssimilation(stem, following);
  };
  let quantitiveEmbedAllomorphFrame = null;
  let pilNobleYoResultFrame = null;
  const restrictions = [];
  const appliedSemanticRules = new Set(["affective/base"]);
  const flawedSubjectAnalysis = lexicalFacts.flawedSubjectAnalysisFrame || null;
  const defectLicensed = Boolean(flawedSubjectAnalysis);
  const pluralSuppressesFlawing = requestedAffectRoute === "flawed-subject"
    && plural
    && flawedSubjectAnalysis?.availability === "optional";
  const affectRoute = pluralSuppressesFlawing
    ? "ordinary-subject"
    : requestedAffectRoute;
  const pilChildUsesAffectiveMatrix = pilAffinityContext.childUsesMatrix;
  const pilUsesAffectiveMatrix = pilChildUsesAffectiveMatrix
    || pilLexemeReading === "honorific-vocative";
  const pilSimpleLexemeFormation = pilAffinityContext.simpleLexemeFormation;
  const pilGenderStem = ({
    male: "oquich",
    female: "cihuā",
  })[pilGenderSpecification] || "";
  if (pilLexemeReading && affectRoute !== "compound") {
    return buildBlockedFrame(
      "affective-nnc",
      "pil-lexeme-reading-requires-compound-or-simple-pil-route",
      request
    );
  }
  if (
    pilLexemeReading === "honorific-vocative"
    && (plural || subject === "3common")
  ) {
    return buildBlockedFrame(
      "affective-nnc",
      "pil-honorific-vocative-requires-singular-subject",
      request
    );
  }
  const attitudeRouteFrame = deepFreeze({
    kind: "classical-nahuatl-affective-attitude-route-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    selectedRoute: affectRoute,
    availableRoutes: Object.freeze(contextualFlawedSubjectSourceFrame ? ["flawed-subject"] : !defectLicensed
      ? ["compound"]
      : plural
        ? ["ordinary-subject", "compound"]
        : flawedSubjectAnalysis.availability === "obligatory"
          ? ["flawed-subject", "compound"]
          : ["ordinary-subject", "flawed-subject", "compound"]),
    routeChoiceRequired: Boolean(
      !contextualFlawedSubjectSourceFrame && defectLicensed
      && !plural
    ),
    requestedRoute: requestedAffectRoute,
    pluralSuppressesFlawing,
    attitudeLocation: affectRoute === "compound"
      ? pilSimpleLexemeFormation
        ? "typed-pil-lexeme-reading"
        : "affective-matrix-nounstem"
      : affectRoute === "ordinary-subject"
        ? "none-neutral-subject"
        : "subject-pronoun-num1",
    subjectReferentId: contextualFlawedSubjectSourceFrame ? "" : `affective-subject:${subject}`,
    constituentOrder: affectRoute === "compound"
      ? pilSimpleLexemeFormation
        ? Object.freeze(["pil-lexeme"])
        : Object.freeze(["embed", "affective-matrix"])
      : affectRoute === "ordinary-subject"
        ? Object.freeze(["nounstem", "ordinary-subject-pronoun"])
        : Object.freeze(["nounstem", "flawed-subject-pronoun"]),
    translationAuthority: false,
    documentaryExampleAuthority: false,
  });
  if (affectRoute === "compound") {
    if (
      pilUsesAffectiveMatrix
      && !["tzin", "tōn", "pil", "pōl"].includes(matrix)
    ) {
      return buildBlockedFrame(
        "affective-nnc",
        "pil-child-affective-matrix-required",
        request
      );
    }
    if (pilSimpleLexemeFormation && state === "vocative") {
      return buildBlockedFrame(
        "affective-nnc",
        "pil-child-vocative-requires-affective-tzin-formation",
        request
      );
    }
    if (
      !pilSimpleLexemeFormation
      && !AFFECTIVE_NOMINAL_MATRICES.includes(matrix)
    ) return buildBlockedFrame("affective-nnc", "affective-nominal-affective-matrix-required", request);
    if (!pilSimpleLexemeFormation && matrix === "zol" && animacy !== "nonanimate") return buildBlockedFrame("affective-nnc", "affective-zol-requires-nonanimate-embed", request);
    if (!pilSimpleLexemeFormation && matrix === "zol") {
      restrictions.push("zol-recursive-embed-licensed");
      appliedSemanticRules.add("affective/zol");
    }
    if (!pilSimpleLexemeFormation && ["pil", "pōl"].includes(matrix)
      && !lexicalFacts.preteritAgentiveCompoundAnalysisFrame?.classException) {
      restrictions.push("affective-class-always-zero");
      appliedSemanticRules.add("affective/pil-pol");
    }
    if (!pilSimpleLexemeFormation && ["tzin", "tōn"].includes(matrix)) {
      restrictions.push("embed-zero-keeps-zero-otherwise-tli");
      appliedSemanticRules.add("affective/tzin-ton-class");
    }
    nounClass = pilSimpleLexemeFormation
      ? "tli"
      : affectiveMatrixClass(
        matrix,
        embedClass,
        lexicalFacts.preteritAgentiveCompoundAnalysisFrame?.classException
          ? lexicalFacts.preteritAgentiveCompoundAnalysisFrame
          : lexicalFacts.affectiveLexicalAnalysisFrame
      );
    if (lexicalFacts.lexicalizedSpecialMeaning === true) {
      appliedSemanticRules.add("affective/lexicalized-class");
    }
    if (
      matrix === "tōn"
      && (
        lexicalFacts.affectiveLexicalAnalysisFrame?.classException === true
        || lexicalFacts.affectiveLexicalAnalysisFrame?.embedVariantStem
      )
    ) {
      appliedSemanticRules.add("affective/ton-exception");
    }
    const vocativeForm = normalizeKey(request.vocativeForm || "full");
    if (state === "vocative" && !["full", "abbreviated"].includes(vocativeForm)) {
      return buildBlockedFrame("affective-nnc", "affective-vocative-form-required", request);
    }
    if (state === "vocative" && vocativeForm === "abbreviated") {
      if (pilSimpleLexemeFormation || matrix !== "tzin") return buildBlockedFrame("affective-nnc", "abbreviated-vocative-requires-tzin", request);
      matrixStem = "tz";
      restrictions.push("abbreviated-vocative-less-formal");
    }
    if (state === "vocative") appliedSemanticRules.add("affective/vocative");
    if (semanticReading === "mass-delimited" && matrix !== "tzin") return buildBlockedFrame("affective-nnc", "mass-delimitation-requires-tzin", request);
    if (
      ["special-regard", "honorific", "compassion", "affection",
        "cherished-smallness"].includes(semanticReading)
      && matrix !== "tzin"
    ) {
      return buildBlockedFrame(
        "affective-nnc",
        "selected-tzin-reading-requires-tzin-matrix",
        request
      );
    }
    if (semanticReading === "mass-delimited") appliedSemanticRules.add("affective/mass-delimitation");
    if (pilLexemeReading) {
      if (!["appendage", "child", "noble", "honorific-vocative"].includes(pilLexemeReading)) {
        return buildBlockedFrame("affective-nnc", "unknown-pil-semantic-reading", request);
      }
      if (pilLexemeReading === "honorific-vocative" && !(matrix === "tzin" && state === "vocative")) {
        return buildBlockedFrame("affective-nnc", "pil-honorific-vocative-requires-tzin-vocative", request);
      }
      restrictions.push(`pil-reading:${pilLexemeReading}`);
      appliedSemanticRules.add("pil/reading");
      if (pilLexemeReading === "child") {
        appliedSemanticRules.add(pilChildFormation === "simple"
          ? "pil/child-simple"
          : "pil/child-affective");
      }
      if (pilLexemeReading === "noble") appliedSemanticRules.add("pil/noble");
      if (pilLexemeReading === "honorific-vocative") appliedSemanticRules.add("pil/honorific-vocative");
      if (pilGenderStem) appliedSemanticRules.add("pil/gender-specific");
      if (pilPossessorDistribution === "distributive-varietal") {
        appliedSemanticRules.add("pil/distributive-possessor");
      }
    }
    realizedEmbedStem = lexicalFacts.preteritAgentiveCompoundAnalysisFrame
      ?.retainedGeneralUseStem || lexicalFacts.affectiveLexicalAnalysisFrame
      ?.embedVariantStem || embedStem;
    // Affective matrices use the same class-conditioned general-use shape as
    // other nominal compounds. Preserve an explicitly declared lexical variant.
    if (realizedEmbedStem === embedStem
      && lexicalFacts.embedSourceClassFrame?.useShape === "truncated") {
      const embedShape = realizeCompoundEmbed(source, matrixStem, lexicalFacts, target);
      if (embedShape.authorizationStatus !== "authorized") {
        return buildBlockedFrame("affective-nnc", embedShape.blockReason, request);
      }
      realizedEmbedStem = embedShape.realizedStem;
      appliedSemanticRules.add(embedShape.sourceShapeRule);
    }
    // §16.7: a quantity matrix has its ih allomorph when the complete
    // quantity stem becomes an affective embed. A chi spelling alone
    // is not a quantity-morpheme analysis.
    if (!pilSimpleLexemeFormation && realizedEmbedStem === embedStem) {
      const parts = embedStem.split("-");
      const sourceMatrix = parts.pop();
      const quantityParent = target.isClassicalNahuatlPronominalNncResult?.(
        lexicalFacts.capturedEmbedResult) === true
        ? lexicalFacts.capturedEmbedResult : null;
      const quantitySource = quantityParent?.sourceFrame
        || target.buildClassicalNahuatlPronominalNncSourceFrame?.({
          stem: embedStem, embedStem: parts.join("-"), matrixStem: sourceMatrix
        });
      if (target.isClassicalNahuatlPronominalNncSourceFrame?.(quantitySource)
        && quantitySource.familyId === "quantitive"
        && ["qui", "chi"].includes(quantitySource.matrixFamily)) {
        const underlyingMatrix = `${quantitySource.matrixFamily.slice(0, -1)}ī`;
        const outputMatrix = `${underlyingMatrix.slice(0, -1)}ih`;
        const quantityEmbed = quantityParent
          ? parts.join("-") : quantitySource.embedStem;
        realizedEmbedStem = joinStemParts([quantityEmbed, outputMatrix]);
        quantitiveEmbedAllomorphFrame = {
          sourceFrame: quantitySource,
          parentResult: quantityParent,
          operationFrame: quantityParent?.operationFrame || null,
          internalReduplicationFrame: quantityParent?.operationFrame
            ?.internalReduplicationFrame || quantitySource.internalReduplicationFrame,
          underlyingMatrix,
          outputMatrix,
          conditioningMatrix: matrixStem,
          realizedEmbedStem,
          operation: "short-vowel-plus-glottal-before-affective-matrix",
        };
        appliedSemanticRules.add("affective/quantitive-matrix-glottal-allomorph");
      }
    }
    if (pilLexemeReading) {
      realizedEmbedStem = joinStemParts([pilGenderStem, realizedEmbedStem]);
    }
    compoundStem = pilSimpleLexemeFormation
      ? realizedEmbedStem
      : joinStemParts([
        realizeAffectiveEmbedBoundary(realizedEmbedStem, matrixStem),
        matrixStem,
      ]);
    if (pilLexemeReading === "noble" && state === "possessive") {
      // The existing yō owner selects its l allomorph and preserves underlying
      // long ō independently of reduced vocable-final spelling (§§2.2, 15.1.2).
      const nobleSource = target.buildClassicalNahuatlOrdinaryNncSourceFrame?.({
        stem: realizedEmbedStem, sourceClass: "tli-1",
      });
      const nobleOperation = target.buildClassicalNahuatlOrdinaryNncOperationFrame?.(
        nobleSource, {
          subject, state: "possessive", possessor: request.possessor || "3sg",
          humanness: "human", predicateFormation: "yo-matrix",
        });
      pilNobleYoResultFrame = target.requestClassicalOrdinaryNncResult?.(
        nobleSource, nobleOperation);
      if (target.isClassicalNahuatlOrdinaryNncResult?.(pilNobleYoResultFrame) !== true
        || pilNobleYoResultFrame.authorizationStatus !== "authorized") {
        return buildBlockedFrame("affective-nnc", "pil-noble-yo-owner-required", request);
      }
      compoundStem = pilNobleYoResultFrame.typedSlotFrame.slots.predicate.stem;
      nounClass = "tl";
      restrictions.push("pil-noble-possession-uses-yo-matrix");
      appliedSemanticRules.add("pil/noble-yo-possession");
    }
    if (pilLexemeReading === "honorific-vocative") {
      if (normalizeKey(request.vocativeForm || "full") !== "full") {
        return buildBlockedFrame(
          "affective-nnc",
          "pil-honorific-vocative-requires-full-tzin",
          request
        );
      }
      compoundStem = joinStemParts([compoundStem, "tzin"]);
      nounClass = "tli";
      restrictions.push(
        "pil-honorific-vocative-nested-tzin-recursion",
        "pil-honorific-vocative-singular-no-affinity"
      );
      appliedSemanticRules.add("pil/honorific-vocative-recursion");
    }
  } else if (affectRoute === "ordinary-subject") {
    if (!defectLicensed) {
      return buildBlockedFrame(
        "affective-nnc",
        "ordinary-subject-alternative-requires-typed-flaw-compatible-source",
        request
      );
    }
    if (flawedSubjectAnalysis.availability === "obligatory") {
      return buildBlockedFrame(
        "affective-nnc",
        "typed-source-allows-only-flawed-subject",
        request
      );
    }
    compoundStem = embedStem;
    nounClass = flawedSubjectAnalysis.neutralStemClass || embedClass;
    restrictions.push("ordinary-subject-counterpart-keeps-sounded-num1");
    appliedSemanticRules.add("affective/ordinary-subject-counterpart");
    if (pluralSuppressesFlawing) {
      restrictions.push("plural-subject-automatically-restores-sounded-num1");
      appliedSemanticRules.add("affective/flawing-suppressed-by-plural");
    }
  } else {
    if (!defectLicensed) return buildBlockedFrame("affective-nnc", "flawed-subject-requires-licensed-defect-stem", request);
    if (state !== "absolutive") return buildBlockedFrame("affective-nnc", "flawed-subject-is-absolutive-only", request);
    if (plural) return buildBlockedFrame("affective-nnc", "flawed-subject-is-singular-common-only", request);
    nounClass = flawedSubjectAnalysis.flawedStemClassStrategy
      === "zero-alternative" || flawedSubjectAnalysis.flawedStemClassStrategy
      === "source-zero-class"
      ? "zero"
      : flawedSubjectAnalysis.neutralStemClass || embedClass;
    restrictions.push("sounded-num1-replaced-by-silent-variant");
    appliedSemanticRules.add("affective/flawed-subject");
    appliedSemanticRules.add("affective/flawed-lexicon");
    appliedSemanticRules.add("affective/flawing-purpose");
    if (lexicalFacts.defectEntityAmbiguous === true) {
      const analysis = normalizeKey(request.defectAnalysis);
      if (!["defect", "entity"].includes(analysis)) {
        return buildBlockedFrame("affective-nnc", "defect-entity-ambiguity-requires-typed-analysis", request);
      }
      appliedSemanticRules.add("affective/defect-entity");
    }
    if (flawedSubjectAnalysis.lexicalReading) {
      appliedSemanticRules.add("affective/typed-lexical-reading");
    }
  }

  const capturedAffectiveEmbedResult = lexicalFacts.affectiveNncEmbed
    ? lexicalFacts.capturedEmbedResult
    : null;
  // §32.3's defective il lexeme has an attested full-tzin honorific
  // vocative. The issued inner tzin is a constituent, never reduplication.
  const nestedIlHonorificVocative = Boolean(capturedAffectiveEmbedResult
    && capturedAffectiveEmbedResult.sourceFrame?.embedStem === "il"
    && capturedAffectiveEmbedResult.operationFrame?.affectiveMatrix === "tzin"
    && !capturedAffectiveEmbedResult.operationFrame?.recursiveAffectiveEmbedFrame
    && matrix === "tzin" && state === "vocative"
    && normalizeKey(request.vocativeForm || "full") === "full"
    && !plural && normalizeKey(request.reduplication || "none") === "none");
  if (
    capturedAffectiveEmbedResult
    && capturedAffectiveEmbedResult.operationFrame?.affectiveMatrix !== "zol"
    && !nestedIlHonorificVocative
  ) {
    return buildBlockedFrame(
      "affective-nnc",
      "recursive-affective-embed-requires-zol-inner-matrix",
      request
    );
  }
  const innerAffectiveDepth = Number(
    capturedAffectiveEmbedResult?.operationFrame
      ?.recursiveAffectiveEmbedFrame?.depth
      || (capturedAffectiveEmbedResult ? 1 : 0)
  );
  const recursiveAffectiveEmbedFrame = capturedAffectiveEmbedResult
    ? deepFreeze({
      kind: "classical-nahuatl-recursive-affective-embed-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      depth: innerAffectiveDepth + 1,
      innerMatrix: capturedAffectiveEmbedResult.operationFrame.affectiveMatrix,
      repeatedMatrixAnalysis: nestedIlHonorificVocative ? "nested-constituent-not-reduplication" : "distinct-affective-matrices",
      outerMatrix: matrix,
      innerCompoundStem:
        capturedAffectiveEmbedResult.operationFrame?.compoundStem,
      outerCompoundStem: compoundStem,
      innerResultFrame: capturedAffectiveEmbedResult,
      sourceBoundariesPreserved: true,
      ownerIssuedResultPreserved: true,
      acyclic: true,
      depthChoiceRequired: false,
      surfaceSpellingAuthority: false,
      documentaryExampleAuthority: false,
    })
    : null;
  if (recursiveAffectiveEmbedFrame) {
    appliedSemanticRules.add("affective/zol-recursion");
  }

  const requestedReduplication = normalizeKey(
    request.reduplication || "none"
  );
  const nonanimateReduplicationRequested = animacy === "nonanimate"
    && requestedReduplication !== "none";
  const nonanimateReduplicationReading = normalizeKey(
    request.nonanimateReduplicationReading
      || (requestedReduplication === "distributive-varietal"
        ? "distributive-varietal"
        : "ambiguous")
  );
  if (
    nonanimateReduplicationRequested
    && ![
      "ambiguous", "affinity", "distributive-varietal",
    ].includes(nonanimateReduplicationReading)
  ) {
    return buildBlockedFrame(
      "affective-nnc",
      "nonanimate-affective-reduplication-reading-invalid",
      request
    );
  }
  const nonanimateReduplicationEvidence = Object.freeze(
    (Array.isArray(request.nonanimateReduplicationEvidence)
      ? request.nonanimateReduplicationEvidence
      : [])
      .map(normalizeKey)
      .filter(value => [
        "verb-glottal-reduplication",
        "distributive-varietal-quantifier",
        "affinity-agreement",
      ].includes(value))
  );
  const lexicalizedOrdinaryCompound = lexicalFacts.lexicalizedSpecialMeaning === true
    && affectRoute === "compound";
  const nonanimateCommonReduplicated = nonanimateReduplicationRequested
    && subject === "3common"
    && affectRoute === "compound";
  const pilChildDoubleAffinity = pilAffinityContext.childDoubleAffinity;
  const uniquePilChildHierarchy = pilChildUsesAffectiveMatrix
    && plural
    && state === "possessive"
    && matrix === "tzin";
  const reduplication = lexicalizedOrdinaryCompound
    ? requestedReduplication
    : nonanimateReduplicationRequested
    && affectRoute === "compound"
    ? "affinity"
    : plural
    && affectRoute === "compound"
    && requestedReduplication !== "distributive-varietal"
    && !(pilSimpleLexemeFormation && state === "possessive")
    ? "affinity"
    : requestedReduplication;
  if (!["none", "affinity", "distributive-varietal"].includes(reduplication)) {
    return buildBlockedFrame("affective-nnc", "affective-nominal-reduplication-kind-invalid", request);
  }
  if (
    requestedReduplication === "affinity"
    && ((!plural && !nonanimateCommonReduplicated)
      || affectRoute !== "compound")
  ) {
    return buildBlockedFrame(
      "affective-nnc",
      "affective-affinity-requires-plural-compound-subject",
      request
    );
  }
  const affinityAnalysis = lexicalFacts.affectiveAffinityAnalysisFrame || null;
  const affinityEmbedSelected = request.affinityEmbedSelected === true;
  if (
    affinityEmbedSelected
    && affinityAnalysis?.embedAffinityRequirement !== "optional"
  ) {
    return buildBlockedFrame(
      "affective-nnc",
      "affective-embed-affinity-choice-not-licensed-by-typed-source",
      request
    );
  }
  const embedAffinityApplied = Boolean(
    pilChildDoubleAffinity
    ||
    affinityAnalysis?.embedAffinityRequirement === "obligatory"
    || (
      affinityAnalysis?.embedAffinityRequirement === "optional"
      && affinityEmbedSelected
    )
  );
  let affectiveAffinityFrame = null;
  if (lexicalizedOrdinaryCompound && reduplication !== "none") {
    compoundStem = reduplicateInitial(compoundStem, reduplication, "initial");
    appliedSemanticRules.add("affective/lexicalized-ordinary-stem-relation");
  } else if (
    (plural || nonanimateCommonReduplicated)
    && reduplication === "affinity"
    && affectRoute === "compound"
  ) {
    const compoundPilLexeme = realizedEmbedStem.endsWith("-pil");
    const automaticPilTarget = compoundPilLexeme ? "matrix" : "initial";
    // §32.6.2 contrasts simple pīpil with compound noble cihuā-pi-pil;
    // §18.11 also has tēc-pi-pil. Child affinity retains its long vowel.
    const shortPilAffinity = pilSimpleLexemeFormation
      && pilLexemeReading === "noble" && compoundPilLexeme;
    const embedAffinityBoundary = affinityAnalysis?.embedAffinityMatrixBoundary;
    let affinityEmbedStem = embedAffinityApplied || pilSimpleLexemeFormation
      ? !pilLexemeReading && affinityAnalysis?.embedAffinityTarget === "matrix"
        && embedAffinityBoundary?.sourceStem === realizedEmbedStem
        ? joinStemParts([embedAffinityBoundary.prefixStem,
          reduplicateInitial(embedAffinityBoundary.matrixStem, "affinity", "initial")])
        : reduplicateInitial(
        realizedEmbedStem,
        shortPilAffinity ? "short-affinity" : "affinity",
        pilLexemeReading
          ? automaticPilTarget
          : affinityAnalysis?.embedAffinityTarget || "initial"
      )
      : realizedEmbedStem;
    if (
      uniquePilChildHierarchy
      && pilPossessorDistribution === "distributive-varietal"
    ) {
      affinityEmbedStem = reduplicateInitial(
        realizedEmbedStem,
        "distributive-varietal",
        automaticPilTarget
      );
    }
    const affinityMatrixStem = pilSimpleLexemeFormation
      ? ""
      : reduplicateInitial(
        matrixStem,
        "distributive",
        "initial"
      ).replace(/h/u, "");
    compoundStem = pilSimpleLexemeFormation
      ? affinityEmbedStem
      : uniquePilChildHierarchy
        ? joinStemParts([
          affinityEmbedStem,
          "hu-ān",
          affinityMatrixStem,
        ])
        : joinStemParts([
          realizeAffectiveEmbedBoundary(affinityEmbedStem, affinityMatrixStem),
          affinityMatrixStem,
        ]);
    const correspondingSingularNum1 = nounClass === "zero"
      ? "silent"
      : "sounded";
    affectiveAffinityFrame = deepFreeze({
      kind: "classical-nahuatl-affective-affinity-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      subject,
      pluralSubjectRequired: !nonanimateCommonReduplicated,
      commonNumberNonanimateSubjectLicensed:
        nonanimateCommonReduplicated,
      matrixStem: pilSimpleLexemeFormation ? "not-applicable" : matrixStem,
      matrixAffinityStem: affinityMatrixStem,
      matrixPrefixVowelQuantity: pilSimpleLexemeFormation
        ? "not-applicable"
        : "short",
      matrixAffinityAutomatic: !pilSimpleLexemeFormation,
      embedStem: realizedEmbedStem,
      embedAffinityStem: affinityEmbedStem,
      embedAffinityRequirement: pilChildDoubleAffinity
        ? "obligatory-by-pil-child-grammar"
        : pilSimpleLexemeFormation
          ? "simple-pil-affinity"
          : affinityAnalysis?.embedAffinityRequirement || "none",
      embedAffinityTarget: pilLexemeReading
        ? automaticPilTarget
        : affinityAnalysis?.embedAffinityTarget || "initial",
      embedAffinityApplied: embedAffinityApplied || pilSimpleLexemeFormation,
      embedPrefixVowelQuantity: pilLexemeReading
        && (embedAffinityApplied || pilSimpleLexemeFormation)
        ? shortPilAffinity ? "short" : "long"
        : "not-applicable",
      availableTargets: pilChildDoubleAffinity
        ? Object.freeze(["both"])
        : pilSimpleLexemeFormation
          ? Object.freeze(["pil-lexeme"])
          : affinityAnalysis?.availableTargets
            || Object.freeze(["matrix"]),
      selectedTarget: pilChildDoubleAffinity
        ? "both"
        : pilSimpleLexemeFormation
          ? "pil-lexeme"
          : embedAffinityApplied ? "both" : "matrix",
      targetChoiceRequired: pilChildDoubleAffinity || pilSimpleLexemeFormation
        ? false
        : affinityAnalysis?.targetChoiceRequired === true,
      correspondingSingularNum1,
      absolutivePluralDyad: correspondingSingularNum1 === "sounded"
        ? "t-in"
        : "⎕-⎕",
      sourceBoundaryPreserved: true,
      sourceVowelQuantityPreserved: true,
      lesson31LongVowelAffinityKeptDistinct: !pilSimpleLexemeFormation,
      productiveRouteAuthority: false,
      documentaryExampleAuthority: false,
    });
  }
  if (reduplication === "distributive-varietal" && animacy !== "nonanimate") {
    restrictions.push("distributive-varietal-context-required");
  }
  if (/uh$/u.test(realizedEmbedStem) && /^p/u.test(matrixStem)
    && affectiveBoundarySpellingFrame?.authorizationStatus !== "authorized") {
    return buildBlockedFrame("affective-nnc",
      "affective-compound-boundary-spelling-capability-required", request);
  }
  if (reduplication === "affinity" && state === "possessive") {
    appliedSemanticRules.add("affective/affinity-possessive");
  } else if (reduplication === "affinity") {
    appliedSemanticRules.add("affective/affinity-absolutive");
  }
  if (animacy === "nonanimate" && reduplication !== "none") {
    appliedSemanticRules.add("affective/nonanimate-affinity");
    appliedSemanticRules.add("affective/nonanimate-reduplication");
  }
  const sourceFrame = deepFreeze({
    pilNobleYoResultFrame,
    kind: "classical-nahuatl-affective-nominal-source-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    embedStem,
    embedClass,
    supportiveInitialI: lexicalFacts.sourceInitialIAnalysis === "supportive",
    affectRoute,
    requestedAffectRoute,
    affectiveMatrix: pilSimpleLexemeFormation ? "none" : matrix || "none",
    // §32.3: the citation matrix is tli; the compound class below is
    // inherited from its zero embed. Never conflate these two classes.
    ...(["tzin", "tōn"].includes(matrix) ? {affectiveMatrixSourceClass: "tli"} : {}),
    semanticReading,
    animacy,
    defectStemLicensed: defectLicensed,
    flawedSubjectAnalysisFrame: flawedSubjectAnalysis,
    attitudeRouteFrame,
    affectiveBoundarySpellingFrame,
    affectiveLexicalAnalysisFrame:
      lexicalFacts.affectiveLexicalAnalysisFrame || null,
    affectiveAffinityAnalysisFrame: affinityAnalysis,
    pilLexemeFrame: pilLexemeReading
      ? deepFreeze({
        kind: "classical-nahuatl-pil-lexeme-frame",
        version: VERSION,
        authorizationStatus: "authorized",
        sourceStem: embedStem,
        lexemeStem: "pil",
        lexemeAtFinalMorphemeBoundary: true,
        sourceClass: "tli",
        basicMeaning: "pendant-dependent-thing-or-appendage",
        selectedReading: pilLexemeReading,
        availableHumanReadings: Object.freeze(["child", "noble"]),
        humanReadingChoiceRequired: ["child", "noble"].includes(
          pilLexemeReading
        ) && state === "absolutive",
        contrastedChildLexeme: "conē-child-of-a-woman",
        affectivePilMatrixKeptDistinct: "pīl",
        genderSpecification: pilGenderSpecification,
        genderStem: pilGenderStem,
        childFormation: pilLexemeReading === "child"
          ? pilChildFormation
          : "simple",
        possessorDistribution: pilPossessorDistribution,
        translationAuthority: false,
        documentaryExampleAuthority: false,
      })
      : null,
    nonanimateReduplicationAnalysisFrame:
      nonanimateReduplicationRequested
        ? deepFreeze({
          kind:
            "classical-nahuatl-nonanimate-reduplication-analysis-frame",
          version: VERSION,
          authorizationStatus: "authorized",
          sourceAnimacy: "nonanimate",
          matrixShape: "reduplicated-affective-matrix",
          selectedReading: nonanimateReduplicationReading,
          availableReadings: Object.freeze([
            "affinity", "distributive-varietal",
          ]),
          readingChoiceRequired:
            nonanimateReduplicationReading === "ambiguous",
          contextualEvidence: nonanimateReduplicationEvidence,
          contextForcesDistributiveVarietal: Boolean(
            nonanimateReduplicationEvidence.includes(
              "verb-glottal-reduplication"
            )
            || nonanimateReduplicationEvidence.includes(
              "distributive-varietal-quantifier"
            )
          ),
          shapeAloneDecidesMeaning: false,
          documentaryExampleAuthority: false,
        })
        : null,
    recursiveAffectiveEmbedFrame,
  });

  let numberFrameOverride = null;
  let possessiveAffinityNumberFrame = null;
  const irregularSilentNum1 = lexicalFacts.affectiveLexicalAnalysisFrame
    ?.irregularSilentNum1 === true;
  if (irregularSilentNum1
    && (affectRoute !== "compound" || plural || state !== "absolutive"
      || reduplication !== "none")) {
    return buildBlockedFrame("affective-nnc",
      "affective-irregular-silent-num1-requires-nonplural-absolutive-compound", request);
  }
  const defectAffectiveForcesFlawedSubject = affectRoute === "compound"
    && defectLicensed
    && ["tzin", "tōn"].includes(matrix)
    && state === "absolutive"
    && !plural;
  if (defectAffectiveForcesFlawedSubject) {
    restrictions.push("defect-affective-matrix-forces-flawed-subject");
    appliedSemanticRules.add("affective/flawed-subject");
    appliedSemanticRules.add("affective/flawed-lexicon");
  }
  if (
    affectRoute === "flawed-subject"
    || defectAffectiveForcesFlawedSubject
  ) {
    numberFrameOverride = buildCustomNumberFrame({
      subject,
      stem: compoundStem,
      nounClass,
      num1: "⎕",
      num2: "0",
      animacy,
      ruleId: defectAffectiveForcesFlawedSubject
        ? "affective-nominal-defect-affective-forces-flawed-subject"
        : "affective-nominal-flawed-subject-silent-num1",
    });
  } else if (plural && reduplication === "affinity" && !lexicalizedOrdinaryCompound) {
    if (state === "possessive") {
      const possessivePlural = normalizeKey(request.possessiveAffinityPlural || "hu-ān");
      if (!["hu-ān", "silent"].includes(possessivePlural)) {
        return buildBlockedFrame("affective-nnc", "possessive-affinity-plural-choice-invalid", request);
      }
      numberFrameOverride = buildCustomNumberFrame({
        subject,
        stem: compoundStem,
        nounClass,
        num1: possessivePlural === "hu-ān" ? "hu" : "⎕",
        num2: possessivePlural === "hu-ān" ? "ān" : "⎕",
        animacy,
        ruleId: "affective-nominal-possessive-affinity-number",
      });
      possessiveAffinityNumberFrame = deepFreeze({
        kind: "classical-nahuatl-possessive-affinity-number-frame",
        version: VERSION,
        authorizationStatus: "authorized",
        possessor: normalizeKey(request.possessor || "3sg"),
        subject,
        pluralSubjectRequired: true,
        affinityCompoundStem: compoundStem,
        availableDyads: Object.freeze(["hu-ān", "⎕-⎕"]),
        selectedDyad: possessivePlural === "hu-ān" ? "hu-ān" : "⎕-⎕",
        choiceRequired: true,
        moreFrequentVariant: "hu-ān",
        documentaryDisagreementPreserved: true,
        appliesAcrossAffectiveMatrices: true,
        matrixWhitelistAllowed: false,
        productiveRouteAuthority: false,
        documentaryExampleAuthority: false,
      });
    } else {
      const soundedSingular = affectiveAffinityFrame
        ?.correspondingSingularNum1 === "sounded";
      numberFrameOverride = buildCustomNumberFrame({
        subject,
        stem: compoundStem,
        nounClass,
        num1: soundedSingular ? "t" : "⎕",
        num2: soundedSingular ? "in" : "⎕",
        animacy,
        ruleId: "affective-nominal-absolutive-affinity-number-follows-singular-num1",
      });
    }
  }
  if (affectRoute === "compound" && ["tzin", "tōn"].includes(matrix) && defectLicensed && !plural) {
    numberFrameOverride = buildCustomNumberFrame({
      subject,
      stem: compoundStem,
      nounClass,
      num1: "⎕",
      num2: "0",
      animacy,
      ruleId: "affective-nominal-defect-affective-matrix-forces-flawing",
    });
    restrictions.push("defect-tzin-ton-forces-flawed-subject");
  }
  if (irregularSilentNum1) {
    numberFrameOverride = buildCustomNumberFrame({
      subject, stem: compoundStem, nounClass, num1: "⎕", num2: "0", animacy,
      ruleId: "affective-lexical-irregular-silent-nonplural-num1",
    });
    restrictions.push("typed-irregular-silence-keeps-affective-nounstem-class");
  }
  if (animacy === "nonanimate" && plural && reduplication === "affinity") {
    restrictions.push("nonanimate-affective-plural-t-in-exception", "supplement-head-may-remain-common-number");
  }
  const targetState = state === "vocative"
    ? normalizeKey(request.vocativeState || "possessive") : state;
  if (!["absolutive", "possessive"].includes(targetState)) {
    return buildBlockedFrame("affective-nnc", "affective-vocative-state-required", request);
  }
  const targetResult = buildNncTarget({
    target,
    constructionFamily: "affective-nominal",
    contextualFlawedSubjectSourceFrame,
    sourceFrame,
    externalObjectParent: lexicalFacts.agentiveEmbed
      && lexicalFacts.capturedEmbedResult?.operationFrame?.activatedProjectiveObject
      ? lexicalFacts.capturedEmbedResult : null,
    followingMorpheme: state === "vocative" ? "e" : "",
    stem: compoundStem,
    nounClass,
    subject,
    state: targetState,
    possessor: normalizeKey(request.possessor || "3sg"),
    animacy,
    pluralConnector: normalizeKey(request.pluralConnector || "t-in"),
    singularPossessiveConnector: normalizeKey(request.singularPossessiveConnector || "0"),
    numberFrameOverride,
    operationIds: ["affective-nominal-affective-nnc", `affective-nominal-${affectRoute}`, `affective-nominal-${matrix || "flawed"}`],
  });
  if (pilNobleYoResultFrame) {
    // Keep the ordinary owner's exact slots, including vowel provenance, through
    // this semantic wrapper. A new slot copy would lose its boundary analysis.
    targetResult.nncSlotFrame = pilNobleYoResultFrame.typedSlotFrame;
    targetResult.formulaRealization = pilNobleYoResultFrame.formulaRealization;
    targetResult.wordSurface = pilNobleYoResultFrame.wordSurface;
    targetResult.sentenceSurface = pilNobleYoResultFrame.sentenceSurface;
    targetResult.pilNobleYoResultFrame = pilNobleYoResultFrame;
  }
  let vocativeBoundaryWritingFrame = null;
  if (targetResult.authorizationStatus === "authorized" && state === "vocative") {
    if (typeof target.getClassicalNahuatlNncFinalSupportiveIAnalysis !== "function") {
      return buildBlockedFrame("affective-nnc", "affective-vocative-boundary-owner-required", request);
    }
    const finalSupportiveIAnalysis = target.getClassicalNahuatlNncFinalSupportiveIAnalysis(
      targetResult.nncSlotFrame,
    );
    if (finalSupportiveIAnalysis && !targetResult.wordSurface.endsWith("i")) {
      return buildBlockedFrame("affective-nnc", "affective-vocative-supportive-i-projection-mismatch", request);
    }
    // §18.11 absorbs only the typed final supportive vowel. The underlying
    // number carrier (including tli's tl) remains on the exact NNC slots.
    const retainedWordSurface = finalSupportiveIAnalysis
      ? targetResult.wordSurface.slice(0, -1) : targetResult.wordSurface;
    const writingSource = target.issueClassicalNahuatlLesson2WritingSource?.({
      parts: [
        { role: "written-vocable", value: `${retainedWordSurface.charAt(0).toUpperCase()}${retainedWordSurface.slice(1)}` },
        { role: "vocative-particle", value: "é" },
      ],
      boundaryKind: "typed-affective-vocative",
    });
    const writtenResult = target.writeClassicalNahuatlLesson2Result?.(writingSource);
    if (target.isClassicalNahuatlLesson2WrittenResult?.(writtenResult) !== true) {
      return buildBlockedFrame("affective-nnc", "affective-vocative-writing-owner-required", request);
    }
    vocativeBoundaryWritingFrame = deepFreeze({
      sourceNncSlotFrame: targetResult.nncSlotFrame,
      sourceWordSurface: targetResult.wordSurface,
      retainedWordSurface,
      finalSupportiveIAnalysis,
      writingSource,
      writtenResult,
    });
    targetResult.sentenceSurface = writtenResult.surface;
    targetResult.formulaRealization = `${targetResult.formulaRealization}é#`;
  }
  const nonanimateAffectiveAgreementFrame = animacy === "nonanimate"
    && affectRoute === "compound"
    && reduplication === "affinity"
    ? deepFreeze({
      kind:
        "classical-nahuatl-nonanimate-affective-agreement-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      sourceAnimacy: "nonanimate",
      surfaceSubjectNumber: plural ? "plural" : "common",
      surfaceNumberDyad: Object.freeze({
        num1: targetResult.numberFrame?.num1 || "",
        num2: targetResult.numberFrame?.num2 || "",
      }),
      pluralTinExceptionApplied: Boolean(
        plural
        && targetResult.numberFrame?.num1 === "t"
        && targetResult.numberFrame?.num2 === "in"
      ),
      moreFrequentNumber: "common",
      supplementHeadNumber: plural ? "common" : "common",
      supplementHeadMayRemainCommon: plural,
      supplementAgreementExceptionKind: plural
        ? "nonanimate-affective-plural-common-head"
        : "none",
      sameReferentRequired: true,
      reduplicationReading: nonanimateReduplicationReading,
      reduplicationReadingChoiceRequired:
        nonanimateReduplicationReading === "ambiguous",
      contextualEvidence: nonanimateReduplicationEvidence,
      contextForcesDistributiveVarietal:
        sourceFrame.nonanimateReduplicationAnalysisFrame
          ?.contextForcesDistributiveVarietal === true,
      sourceShapeAloneDecidesReading: false,
      exampleStemWhitelistAllowed: false,
      documentaryExampleAuthority: false,
    })
    : null;
  return deepFreeze({
    kind: "classical-nahuatl-nominal-construction-result-frame",
    version: VERSION,
    constructionFamily: "affective-nnc",
    authorizationStatus: targetResult.authorizationStatus,
    blockReason: targetResult.blockReason,
    sourceFrame,
    operationFrame: {
      kind: "classical-nahuatl-affective-nominal-operation-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      compoundStem,
      nounClass,
      matrixClass: nounClass,
      // These matrix-governed tli compounds retain their complete stem
      // before possessive 0. Zero remains zero, including lexical exceptions.
      ...(["zero", "tli"].includes(nounClass) ? {
        resultSourceClass: nounClass === "tli" ? "tli-1" : "zero",
      } : {}),
      affectRoute,
      affectiveMatrix: pilSimpleLexemeFormation ? "none" : matrix,
      affectiveMatrixStem: pilSimpleLexemeFormation ? "" : matrixStem,
      quantitiveEmbedAllomorphFrame,
      semanticReading,
      attitudeRouteFrame,
      pilLexemeFrame: sourceFrame.pilLexemeFrame,
      pilChildFormationFrame: pilLexemeReading === "child"
        ? deepFreeze({
          kind: "classical-nahuatl-pil-child-formation-frame",
          version: VERSION,
          authorizationStatus: "authorized",
          sourceStem: embedStem,
          lexemeStem: "pil",
          selectedReading: "child",
          childNobleAmbiguityPreserved: true,
          conēContrast: "conē-means-child-of-a-woman",
          selectedFormation: pilChildFormation,
          state,
          subject,
          possessor: ["possessive", "vocative"].includes(state)
            ? normalizeKey(request.possessor || "3sg")
            : "not-applicable",
          genderSpecification: pilGenderSpecification,
          genderStem: pilGenderStem,
          possessorDistribution: pilPossessorDistribution,
          affinityAutomatic: plural && state === "absolutive",
          hierarchyAutomatic: uniquePilChildHierarchy,
          productiveRouteAuthority: false,
          documentaryExampleAuthority: false,
        })
        : null,
      pilNobleFormationFrame: pilLexemeReading === "noble"
        ? deepFreeze({
          kind: "classical-nahuatl-pil-noble-formation-frame",
          version: VERSION,
          authorizationStatus: "authorized",
          sourceStem: embedStem,
          realizedStem: realizedEmbedStem,
          subject,
          state,
          selectedReading: "noble",
          availableHumanReadings: Object.freeze(["child", "noble"]),
          childNobleAmbiguityPreserved: state === "absolutive",
          readingChoiceRequired: state === "absolutive",
          genderSpecification: pilGenderSpecification,
          genderStem: pilGenderStem,
          femaleSpecificStemCustomarilyPreferred:
            pilGenderSpecification === "female",
          possessiveYoMatrixAutomatic: state === "possessive",
          possessiveStem: state === "possessive"
            ? compoundStem
            : "not-applicable",
          possessiveMeaning: state === "possessive"
            ? "nobility-pertinency"
            : "not-applicable",
          commonAbsolutiveYoMeaningAmbiguity: Object.freeze([
            "nobility", "childishness",
          ]),
          manualYoControlAllowed: false,
          documentaryExampleAuthority: false,
        })
        : null,
      pilHonorificVocativeFrame:
        pilLexemeReading === "honorific-vocative"
          ? deepFreeze({
            kind:
              "classical-nahuatl-pil-honorific-vocative-frame",
            version: VERSION,
            authorizationStatus: "authorized",
            sourceStem: embedStem,
            innerStem: joinStemParts([realizedEmbedStem, "tzin"]),
            outerMatrix: "tzin",
            nestedStem: compoundStem,
            subject,
            singularSubjectRequired: true,
            singularSubjectSatisfied: !plural && subject !== "3common",
            affinityPresent: false,
            repeatedTzinAnalysis: "typed-recursion-not-reduplication",
            selectedMeaning: "honorific-address-sir",
            vocativeParticle: "é",
            userSelectedVocative: true,
            manualBracketingControlAllowed: false,
            documentaryExampleAuthority: false,
          })
          : null,
      uniquePilChildHierarchyFrame: uniquePilChildHierarchy
        ? deepFreeze({
          kind: "classical-nahuatl-unique-pil-child-hierarchy-frame",
          version: VERSION,
          authorizationStatus: "authorized",
          innerPossessiveNncStem: joinStemParts([
            pilPossessorDistribution === "distributive-varietal"
              ? reduplicateInitial(
                realizedEmbedStem,
                "distributive-varietal",
                pilGenderStem ? "matrix" : "initial"
              )
              : realizedEmbedStem,
            "hu-ān",
          ]),
          outerAffectiveMatrix: "tzi-tzin",
          outerNumberAlternatives: Object.freeze(["hu-ān", "⎕-⎕"]),
          selectedOuterNumber: possessiveAffinityNumberFrame?.selectedDyad,
          relicStructure: "possessive-nnc-embedded-in-affinity-shaped-tzin-matrix",
          uniqueInLanguage: true,
          hierarchyChoiceRequired: false,
          sourceBoundariesPreserved: true,
          documentaryExampleAuthority: false,
        })
        : null,
      affectiveChildMatrixFrame: pilChildUsesAffectiveMatrix
        ? deepFreeze({
          kind: "classical-nahuatl-affective-pil-child-matrix-frame",
          version: VERSION,
          authorizationStatus: "authorized",
          childStem: realizedEmbedStem,
          matrix,
          matrixStem,
          availableMatrices: Object.freeze(["tzin", "tōn", "pil", "pōl"]),
          matrixMeaning: ({
            tzin: "weak-affective-child-or-special-regard",
            tōn: "weak-affective-small-child",
            pil: "darling-child",
            pōl: "brat",
          })[matrix] || "",
          resultClass: nounClass,
          pluralAbsolutiveDoubleAffinityRequired:
            plural && state === "absolutive",
          doubleAffinityApplied: pilChildDoubleAffinity,
          possessionPreserved: state === "possessive" || state === "vocative",
          vocativeMeaning: state !== "vocative"
            ? "not-applicable"
            : normalizeKey(request.vocativeForm || "full") === "abbreviated"
              ? embedStem.includes("tla-zoh-pil")
                ? "beloved-child"
                : "summons-without-child-address"
              : "my-child",
          productiveRouteAuthority: false,
          documentaryExampleAuthority: false,
        })
        : null,
      possessiveAffinityNumberFrame,
      nonanimateAffectiveAgreementFrame,
      flawedSubjectFrame: defectLicensed
        ? deepFreeze({
          kind: "classical-nahuatl-flawed-subject-frame",
          version: VERSION,
          authorizationStatus: "authorized",
          sourceStem: embedStem,
          sourceClass: embedClass,
          selectedRoute: affectRoute,
          requestedRoute: requestedAffectRoute,
          availableRoutes: attitudeRouteFrame.availableRoutes,
          routeChoiceRequired: attitudeRouteFrame.routeChoiceRequired,
          availability: flawedSubjectAnalysis.availability,
          semanticDomain: flawedSubjectAnalysis.semanticDomain,
          subject,
          state,
          flawedFormLimitedToSingularOrCommon: true,
          pluralSuppressesFlawing,
          num1Realization: affectRoute === "flawed-subject"
            || defectAffectiveForcesFlawedSubject
            ? "irregular-silent"
            : "ordinary-sounded",
          neutralStemClass: flawedSubjectAnalysis.neutralStemClass,
          flawedStemClassStrategy:
            flawedSubjectAnalysis.flawedStemClassStrategy,
          defectEntityAmbiguous:
            flawedSubjectAnalysis.defectEntityAmbiguous,
          selectedDefectEntityReading:
            flawedSubjectAnalysis.defectEntityAmbiguous
              ? normalizeKey(request.defectAnalysis)
              : "not-applicable",
          pronominalCase: "nominative-subject",
          sourceShapeDistinguishesPronominalCase: true,
          selectedLexicalReading:
            flawedSubjectAnalysis.lexicalReading || "not-specified",
          usuallyRooster: flawedSubjectAnalysis.usuallyRooster,
          affectiveTzinTonForcesFlawing:
            defectAffectiveForcesFlawedSubject,
          unrelatedSilentNum1Procedures: Object.freeze([
            "adverbialization", "personal-name-nnc",
          ]),
          unrelatedProceduresKeptDistinct: true,
          exampleStemWhitelistAllowed: false,
          documentaryExampleAuthority: false,
        })
        : null,
      affectiveMatrixFrame: affectRoute === "compound"
        && !pilSimpleLexemeFormation
        ? deepFreeze({
          matrix,
          sourceStem: ({ pil: "pīl" })[matrix] || matrix,
          semanticContribution: ({
            pil: "affectionate-smallness",
            pōl: "disparaging-largeness",
            tzin: semanticReading === "ordinary-affective"
              ? "special-regard"
              : semanticReading,
            tōn: "smallness-without-admiration-or-affection",
            zol: "old-or-worn-out",
          })[matrix] || "",
          classRule: ["pil", "pōl"].includes(matrix)
            ? "always-zero"
            : ["tzin", "tōn"].includes(matrix)
              ? "zero-embed-keeps-zero-otherwise-tli"
              : matrix === "zol"
                ? "always-tli"
                : "",
          embedAdmission: "open-compatible-typed-nnc-source",
          productiveRouteAuthority: false,
          documentaryExampleAuthority: false,
        })
        : null,
      lexicalizedSpecialMeaningFrame:
        lexicalFacts.affectiveLexicalAnalysisFrame || null,
      tonMatrixFrame: !pilSimpleLexemeFormation && matrix === "tōn"
        ? deepFreeze({
          selectedMeaning: "smallness-without-admiration-or-affection",
          embedClass,
          resultClass: nounClass,
          classDerivedAutomatically:
            lexicalFacts.affectiveLexicalAnalysisFrame?.classException
              !== true,
          classExceptionFrame:
            lexicalFacts.affectiveLexicalAnalysisFrame?.classException === true
              ? lexicalFacts.affectiveLexicalAnalysisFrame
              : null,
          boundaryExceptionFrame:
            lexicalFacts.affectiveLexicalAnalysisFrame?.embedVariantStem
              ? lexicalFacts.affectiveLexicalAnalysisFrame
              : null,
          recursiveEmbedAvailable: true,
          compatibleEmbedAdmission: "open-typed-nnc-source",
          documentaryExampleAuthority: false,
        })
        : null,
      zolMatrixFrame: !pilSimpleLexemeFormation && matrix === "zol"
        ? deepFreeze({
          selectedMeaning: "old-or-worn-out-nonanimate-entity",
          animacy,
          requiredAnimacy: "nonanimate",
          resultClass: nounClass,
          classRule: "always-tli",
          compatibleEmbedAdmission: "open-nonanimate-typed-nnc-source",
          recursiveEmbedResultAvailable: true,
          denominalContinuations: Object.freeze([
            "inchoative", "causative",
          ]),
          productiveRouteAuthority: false,
          documentaryExampleAuthority: false,
        })
        : null,
      recursiveAffectiveEmbedFrame,
      affectiveAffinityFrame,
      nonanimateAffectiveSubjectChoiceFrame: animacy === "nonanimate"
        && affectRoute === "compound" && state === "absolutive"
        && !pilSimpleLexemeFormation && !lexicalizedOrdinaryCompound
        && !irregularSilentNum1 && nounClass !== "zero"
        ? deepFreeze({
          authorizationStatus: "authorized",
          subjectValues: Object.freeze(["3common", "3pl"]),
          subjectNumberValues: Object.freeze(["common", "plural"]),
          pluralRequiresMatrixAffinity: true,
          pluralNumberDyad: Object.freeze({num1: "t", num2: "in"}),
          moreFrequentSubject: "3common",
        }) : null,
      tzinMatrixFrame: !pilSimpleLexemeFormation && matrix === "tzin"
        ? deepFreeze({
          selectedMeaning: semanticReading === "ordinary-affective"
            ? "special-regard"
            : semanticReading,
          availableMeanings: Object.freeze([
            "special-regard", "honorific", "compassion", "affection",
            "cherished-smallness", "mass-delimited",
          ]),
          meaningChoiceRequired: true,
          embedClass,
          resultClass: nounClass,
          classDerivedAutomatically: true,
          demonstrativeSourcesRemainAvailable: true,
          masslikeEmbedAvailable: true,
          documentaryExampleAuthority: false,
        })
        : null,
      vocativeFrame: state === "vocative"
        ? deepFreeze({
          boundaryWritingFrame: vocativeBoundaryWritingFrame,
          selectedForm: normalizeKey(request.vocativeForm || "full"),
          matrixStem,
          particle: "é",
          register: normalizeKey(request.vocativeForm || "full")
            === "abbreviated"
            ? "less-formal-or-less-ritualistic"
            : "full-formal-or-ritualistic",
          formChoiceRequired: matrix === "tzin",
          specialIlReading: embedStem === "il"
            && normalizeKey(request.vocativeForm || "full")
              === "abbreviated"
            ? "derogatory"
            : embedStem === "il"
              ? "honorific-affective-only-in-full-nested-formation"
              : "not-applicable",
          particleChoiceRequired: false,
        })
        : null,
      matrixClassRule: restrictions.find(item => item.includes("class")) || "",
      reduplication,
      restrictions,
      appliedSemanticRules: Object.freeze([...appliedSemanticRules]),
      affectDerivedFromTypedSource: true,
      displayLabelAuthority: false,
    },
    canonicalTargetEvaluator: "buildClassicalNahuatlNncSlotFrame",
    canonicalResult: targetResult,
    formulaRealization: targetResult.formulaRealization,
    wordSurface: targetResult.wordSurface,
    sentenceSurface: targetResult.sentenceSurface,
    typedFrameAuthority: true,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function numeralOneEmbed(following = "") {
  const next = firstSound(following);
  if (isVowel(next) || ["p", "m"].includes(next)) return "cem";
  return "cen";
}

function numeralTwoEmbed(following = "") {
  const next = firstSound(following);
  if (isVowel(next) || ["p", "m"].includes(next)) return "ōm";
  return "ōn";
}

function numeralSourceProfile(value) {
  return ({
    1: {
      sourceStem: "cem",
      sourceKind: "nounstem",
      freeShapes: ["cē"],
      embedShapes: ["cem"],
      // §34.3's nonembedded m loss applies before the plural subject dyad too.
      pluralStem: "cē",
      pluralStemFormationKind: "free-compensatory-length",
    },
    2: {
      sourceStem: "ōme",
      sourceKind: "pronominal-stem",
      freeShapes: ["ōme"],
      embedShapes: ["ōm", "ōme"],
      pluralStem: "ōme-n",
      pluralStemFormationKind: "internal-plural",
      internalPluralMorph: "n",
      grossCountMorph: "x",
    },
    3: {
      sourceStem: "ēyi",
      sourceKind: "pronominal-stem",
      freeShapes: ["ēyi", "yēyi"],
      orthographicShapes: ["ēi", "yēi"],
      embedShapes: ["ē", "yē", "ēx"],
      pluralStem: "ēi-n",
      pluralStemFormationKind: "internal-plural",
      internalPluralMorph: "n",
    },
    4: {
      sourceStem: "nāhui",
      sourceKind: "pronominal-stem",
      freeShapes: ["nāhui"],
      embedShapes: ["nāhu", "nāuh"],
      pluralStem: "nāhui-n",
      pluralStemFormationKind: "internal-plural",
      internalPluralMorph: "n",
    },
    5: {
      sourceStem: "mā-cu-ī-l",
      sourceKind: "derived-passive-patientive-nounstem",
      freeShapes: ["mā-cu-ī-l"],
      embedShapes: ["mā-cu-ī-l"],
      pluralStem: "mā-cu-ī-l",
      morphemicParts: ["mā", "cu", "ī", "l"],
      sourceHistory: "hand-comparison-passive-patientive",
    },
    6: {
      sourceStem: "chicua-cem",
      sourceKind: "five-plus-one-compound-numeral",
      freeShapes: ["chicua-cē"],
      embedShapes: ["chicua-cem", "chicua-cen"],
      pluralStem: "chicua-cem-in",
      pluralStemFormationKind: "internal-plural",
      internalPluralMorph: "in",
      grossStem: "chicua-cem-ix",
      morphemicParts: ["chicua", "cem"],
    },
    7: {
      sourceStem: "chic-ōme",
      sourceKind: "five-plus-two-compound-numeral",
      freeShapes: ["chic-ōme"],
      embedShapes: ["chic-ōm", "chic-ōn", "chic-ōme"],
      pluralStem: "chic-ōme-n",
      pluralStemFormationKind: "internal-plural",
      internalPluralMorph: "n",
      grossCountMorph: "x",
      grossStem: "chic-ōme-x",
      morphemicParts: ["chic", "ōme"],
    },
    8: {
      sourceStem: "chicu-ēyi",
      sourceKind: "five-plus-three-compound-numeral",
      freeShapes: ["chicu-ēi"],
      embedShapes: ["chicu-ē", "chicu-yē", "chicu-ēx"],
      pluralStem: "chicu-ēi-n",
      pluralStemFormationKind: "internal-plural",
      internalPluralMorph: "n",
      grossStem: "chicu-ē-ix",
      morphemicParts: ["chicu", "ēyi"],
    },
    9: {
      sourceStem: "chiuc-nāhui",
      sourceKind: "five-plus-four-compound-numeral",
      freeShapes: ["chiuc-nāhui"],
      embedShapes: ["chiuc-nāhu", "chiuc-nāuh"],
      pluralStem: "chiuc-nāhui-n",
      pluralStemFormationKind: "internal-plural",
      internalPluralMorph: "n",
      grossStem: "chiuc-nāhu-ix",
      morphemicParts: ["chiuc", "nāhui"],
    },
    10: {
      sourceStem: "mah-tlāc",
      sourceKind: "hand-torso-compound-nounstem",
      freeShapes: ["mah-tlāc"],
      embedShapes: ["mah-tlāc"],
      pluralStem: "mah-tlāc",
      grossStem: "mah-tlāqu-ix",
      morphemicParts: ["mah", "tlāc"],
    },
    15: {
      sourceStem: "cax-tōl",
      sourceKind: "numeral-nounstem",
      freeShapes: ["cax-tōl"],
      embedShapes: ["cax-tōl"],
      pluralStem: "cax-tōl",
      grossStem: "cax-tōl-ix",
      morphemicParts: ["cax", "tōl"],
    },
  })[value] || null;
}

function availableNumeralVariants(value, embedded = false) {
  if (value === 2 && embedded) return ["short", "full"];
  if (value === 3 && embedded) return ["y-loss", "y-retained", "y-to-x"];
  if (value === 3) return ["plain", "initial-y"];
  return ["automatic"];
}

function simpleNumeralStem(value, {
  embedded = false,
  following = "",
  variant = "",
} = {}) {
  if (!Number.isInteger(value) || value < 1 || value > 19) return "";
  const normalizedVariant = normalizeKey(variant);
  const allowedVariants = availableNumeralVariants(value, embedded);
  const selectedVariant = normalizedVariant || allowedVariants[0];
  if (!allowedVariants.includes(selectedVariant)) return "";
  const unit = {
    1: embedded ? numeralOneEmbed(following) : "cē",
    2: embedded
      ? selectedVariant === "full" ? "ōme" : numeralTwoEmbed(following)
      : "ōme",
    3: embedded
      ? ({ "y-loss": "ē", "y-retained": "yē", "y-to-x": "ēx" })[
        selectedVariant
      ]
      : selectedVariant === "initial-y" ? "yēyi" : "ēyi",
    4: embedded ? (isVowel(firstSound(following)) ? "nāhu" : "nāuh") : "nāhui",
    5: "mā-cu-ī-l",
    6: embedded
      ? joinStemParts(["chicua", numeralOneEmbed(following)])
      : "chicua-cē",
    7: embedded
      ? joinStemParts(["chic", numeralTwoEmbed(following)])
      : "chic-ōme",
    8: embedded ? "chicu-ē" : "chicu-ēi",
    9: embedded
      ? joinStemParts([
        "chiuc",
        isVowel(firstSound(following)) ? "nāhu" : "nāuh",
      ])
      : "chiuc-nāhui",
    10: "mah-tlāc",
    15: "cax-tōl",
  }[value];
  if (unit) return unit;
  const base = value < 15 ? 10 : 15;
  const remainder = value - base;
  return joinStemParts([
    simpleNumeralStem(base, { embedded: false }),
    `om-${simpleNumeralStem(remainder, { embedded: false })}`,
  ]);
}

function inflectedSimpleNumeralStem(value, stem, {
  plural = false,
  countKind = "ordinary",
  classifier = "basic",
  subject = "",
} = {}) {
  if (countKind === "gross") {
    if (classifier !== "basic") return joinStemParts([stem, "ix"]);
    return numeralSourceProfile(value)?.grossStem || ({
      2: "ōme-x",
      3: "ē-ix",
      4: "nāhu-ix",
    })[value] || joinStemParts([stem, "ix"]);
  }
  if (!plural || classifier !== "basic") return stem;
  const profile = numeralSourceProfile(value);
  const freeShapeIndex = profile?.freeShapes?.indexOf(stem) ?? -1;
  // §34.4 keeps the selected free-form initial y when person is zero.
  // Its written stem alternative and internal plural n belong to the
  // predicate; the external subject-number dyad is selected separately.
  const selectedWrittenStem = subject.startsWith("3")
    && profile?.pluralStemFormationKind === "internal-plural"
    && freeShapeIndex >= 0
    ? profile.orthographicShapes?.[freeShapeIndex] : "";
  return selectedWrittenStem
    ? joinStemParts([selectedWrittenStem, profile.internalPluralMorph])
    : profile?.pluralStem || stem;
}

function buildNumeralSourceAnalysisFrame({
  value,
  countKind,
  classifier,
  embedded,
  following,
  requestedVariant,
  selectedStem,
  compatibleClassifiers = [],
  terms = [],
  grossPossessiveFrame = null,
  conjunctionFrame = null,
  classifierFrame = null,
}) {
  const profile = numeralSourceProfile(value);
  const variantSourceValue = terms[0]?.order > 1 ? terms[0].multiplier : value;
  const availableVariants = availableNumeralVariants(variantSourceValue, embedded || terms[0]?.order > 1);
  const selectedVariant = normalizeKey(requestedVariant)
    || availableVariants[0];
  const numeralTerms = terms.map(term => deepFreeze({
    order: Number(term.order),
    multiplier: Number(term.multiplier),
    computedValue: Number(term.value),
    realizedStem: normalizeStem(term.stem),
    matrix: ({
      20: "pōhu-a-l",
      400: "tzon",
      8000: "xiqu-ipil",
    })[term.order] || "basic-numeral",
  }));
  const higherOrderMatrixFacts = numeralTerms
    .filter(term => term.order > 1)
    .map(term => {
      if (term.order === 20
        && ["cob", "tecpan", "ipil", "quimil"].includes(classifier)
        && classifierFrame?.matrixStem) {
        return deepFreeze({
          order: 20,
          matrixStem: classifierFrame.matrixStem,
          sourceMeaning: classifierFrame.groupingMeaning,
          bodilyCountBasis: "typed-group-of-twenty",
          secondaryLexicalReadings: [],
        });
      }
      return deepFreeze(({
      20: {
        order: 20,
        matrixStem: "pōhu-a-l",
        sourceMeaning: "something-counted",
        bodilyCountBasis: "digits-of-two-hands-and-two-feet",
        secondaryLexicalReadings: [],
      },
      400: {
        order: 400,
        matrixStem: "tzon",
        sourceMeaning: "hair-or-feather-barbs-as-a-set",
        bodilyCountBasis: "twenty-times-twenty",
        secondaryLexicalReadings: ["many", "mockingbird"],
      },
      8000: {
        order: 8000,
        matrixStem: "xiqu-ipil",
        sourceMeaning: "enclosed-stack-pile-or-bag",
        bodilyCountBasis: "twenty-times-twenty-times-twenty",
        secondaryLexicalReadings: ["possible-cacao-bagful"],
      },
      })[term.order]);
    });
  return deepFreeze({
    kind: "classical-nahuatl-cardinal-numeral-source-analysis-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    numeralSystemBase: 20,
    vigesimalOrders: Object.freeze([1, 20, 400, 8000]),
    bodilyStages: Object.freeze([
      "one-hand", "two-hands", "two-hands-one-foot",
      "two-hands-two-feet",
    ]),
    withinStageUnits: Object.freeze([1, 2, 3, 4]),
    value,
    sourceStem: profile?.sourceStem || selectedStem,
    sourceKind: profile?.sourceKind || "derived-numeral-stem",
    morphemicParts: Object.freeze([
      ...(profile?.morphemicParts || [profile?.sourceStem || selectedStem]),
    ]),
    sourceHistory: profile?.sourceHistory || "",
    freeShapes: Object.freeze([...(profile?.freeShapes || [selectedStem])]),
    orthographicShapes: Object.freeze([
      ...(profile?.orthographicShapes || []),
    ]),
    embedShapes: Object.freeze([...(profile?.embedShapes || [])]),
    position: embedded ? "embed" : "free-nnc",
    followingBoundarySound: embedded ? firstSound(following) : "",
    availableVariants: Object.freeze(availableVariants),
    selectedVariant,
    variantChoiceRequired: availableVariants.length > 1,
    selectedStem,
    numeralTerms: Object.freeze(numeralTerms),
    activeVigesimalOrders: Object.freeze([
      ...new Set(numeralTerms.map(term => term.order)),
    ]),
    computedTotalValue: numeralTerms.reduce(
      (total, term) => total + term.computedValue,
      0
    ) || value,
    higherOrderMatrixFacts: Object.freeze(higherOrderMatrixFacts),
    countKind,
    grossCountMatrix: countKind === "gross" ? "ix" : "",
    grossCountMeaning: countKind === "gross" ? "aggregate-total-complete" : "",
    classifier,
    compatibleClassifiers: Object.freeze([...compatibleClassifiers]),
    classifierChoiceRequired: compatibleClassifiers.length > 1,
    grossPossessiveFrame,
    conjunctionFrame,
    classifierFrame,
    examplesAuthorizeSourceOrRoute: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function orderTerm(multiplier, order, variant = "") {
  const matrix = ({ 20: "pōhu-a-l", 400: "tzon", 8000: "xiqu-ipil" })[order];
  if (!matrix || multiplier < 1 || multiplier > 19) return "";
  return joinStemParts([simpleNumeralStem(multiplier, { embedded: true, following: matrix, variant }), matrix]);
}

function decomposeVigesimal(value) {
  if (!Number.isInteger(value) || value < 1) return [];
  let remaining = value;
  const terms = [];
  for (const order of [8000, 400, 20]) {
    const multiplier = Math.floor(remaining / order);
    if (multiplier) {
      if (multiplier > 19) return [];
      terms.push({ order, multiplier, value: multiplier * order, stem: orderTerm(multiplier, order) });
      remaining %= order;
    }
  }
  if ((remaining >= 11 && remaining <= 14)
    || (remaining >= 16 && remaining <= 19)) {
    const firstValue = remaining < 15 ? 10 : 15;
    const secondValue = remaining - firstValue;
    terms.push({
      order: 1,
      multiplier: firstValue,
      value: firstValue,
      stem: simpleNumeralStem(firstValue),
    });
    terms.push({
      order: 1,
      multiplier: secondValue,
      value: secondValue,
      stem: secondValue === 3 ? "ēi" : simpleNumeralStem(secondValue),
    });
  } else if (remaining) {
    const rightwardSimpleStem = terms.length > 0 && remaining === 3
      ? "ēi"
      : simpleNumeralStem(remaining);
    terms.push({
      order: 1,
      multiplier: remaining,
      value: remaining,
      stem: rightwardSimpleStem,
    });
  }
  return terms;
}

function classifierMatrix(classifier, source = {}) {
  return {
    rock: "te",
    row: "pān",
    thing: "tla-man",
    cob: "ōlō",
    tecpan: "tecpān",
    ipil: "ipil",
    quimil: "quimil",
    measure: normalizeStem(source.measureStem),
  }[classifier] || "";
}

function additionalNumberLink(stem = "", compound = false) {
  const next = firstSound(stem);
  if (isVowel(next) || ["m", "p"].includes(next)) return "om";
  if (compound && ["c", "z"].includes(next)) return "oz";
  return "on";
}

function joinNumeralClassifierStem(stem = "", matrix = "") {
  const normalizedStem = normalizeStem(stem);
  const normalizedMatrix = normalizeStem(matrix);
  if (normalizedMatrix === "pān" && /āuh$/u.test(normalizedStem)) {
    return joinStemParts([
      normalizedStem.replace(/āuh$/u, "āp"),
      normalizedMatrix,
    ]);
  }
  if (normalizedMatrix === "tla-man" && /l$/u.test(normalizedStem)) {
    return joinStemParts([normalizedStem, "la-man"]);
  }
  return joinStemParts([normalizedStem, normalizedMatrix]);
}

function buildCardinalConjunctionFrame({
  value,
  classifier,
  conjunctionForm,
  terms,
  stems,
}) {
  const conjoined = terms.length > 1;
  const compoundAvailable = classifier === "basic"
    && value >= 11
    && value <= 14;
  const selectedForm = conjunctionForm || "separate";
  const conjuncts = terms.map((term, index) => deepFreeze({
    rank: index + 1,
    value: term.value,
    order: term.order,
    multiplier: term.multiplier,
    sourceStem: term.stem,
    realizedStem: stems[index] || "",
    relation: index === 0 ? "first-higher-conjunct" : "rightward-lower-conjunct",
    shortAdditionalNumberMorph: index === 0
      ? "not-applicable"
      : additionalNumberLink(
        term.stem,
        selectedForm === "compound"
      ),
    longTwoStemConfusable: term.value === 2 ? "ōm" : "not-applicable",
    numberPosition: "present",
  }));
  const downgradedTerms = terms.filter(term => (
    term.order > 1 && term.multiplier >= 11 && term.multiplier <= 19
  ));
  return deepFreeze({
    kind: "classical-nahuatl-cardinal-conjunction-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    conjoined,
    recursive: conjuncts.length > 2,
    conjunctionDirection: conjoined ? "higher-to-lower" : "not-applicable",
    conjunctor: conjoined ? "silent" : "not-applicable",
    selectedForm,
    availableForms: Object.freeze(
      compoundAvailable ? ["separate", "compound"] : ["separate"]
    ),
    formChoiceRequired: compoundAvailable,
    conjuncts: Object.freeze(conjuncts),
    shortOmSource: "om",
    shortOmMeaning: "additional-number",
    shortOmDistinctFromLongTwo: true,
    sameMatrixConjunctionAllowed: false,
    classifierRepeatedOnRightwardConjunct: false,
    downgradedEmbedFrames: Object.freeze(downgradedTerms.map(term => {
      const outerMatrix = ({
        20: "pōhu-a-l",
        400: "tzon",
        8000: "xiqu-ipil",
      })[term.order] || "";
      return deepFreeze({
        kind: "classical-nahuatl-downgraded-numeral-conjunction-frame",
        version: VERSION,
        sourceConjunctionValue: term.multiplier,
        outerOrder: term.order,
        outerMatrix,
        computedValue: term.value,
        rankChange: "complete-conjunction-to-bound-embed",
        deletedPosition: "rightmost-number-position-only",
        internalSourcesPreserved: true,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    })),
    scribalFinalNMayBeUnwritten: true,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildCardinalClassifierFrame({
  classifier,
  classifierStem,
  compatibleClassifiers,
  source,
  value,
}) {
  const facts = ({
    basic: ["basic-numeral-set", 1],
    rock: ["rock-set-compatible-unit", 1],
    row: ["row-set-compatible-unit", 1],
    thing: ["set-down-or-stackable-unit", 1],
    cob: ["maize-cob-shape-compatible-unit", 1],
    tecpan: ["lined-up-group-of-twenty", 20],
    ipil: ["pile-group-of-twenty", 20],
    quimil: ["bundle-group-of-twenty", 20],
    measure: ["typed-measure-unit", 1],
  })[classifier] || ["", 1];
  return deepFreeze({
    kind: "classical-nahuatl-cardinal-classifier-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    classifier,
    matrixStem: classifierStem || "basic-numeral",
    groupingMeaning: facts[0],
    unitValue: facts[1],
    multiplier: facts[1] === 20 ? Math.floor(value / 20) : value,
    computedGroupedValue: value,
    compatibleClassifiers: Object.freeze([...compatibleClassifiers]),
    compatibilityAuthority: compatibleClassifiers.length
      ? "typed-referent-analysis"
      : "open-intended-grouping",
    classifierChoiceRequired: compatibleClassifiers.length > 1,
    selectedByUser: source.classifierSelectionExplicit === true,
    exampleReferentMembershipRequired: false,
    exampleReferentsAuthorizeRoute: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function isCanonicalCobPreteritAgentiveResult(result, selection, target) {
  const source = result?.sourceFrame;
  const operation = result?.operationFrame;
  const canonical = result?.canonicalResult;
  const slots = canonical?.nncSlotFrame;
  const selectedSourceState = selection.sourceUse === "general-use"
    ? canonical?.state : "absolutive";
  const selectedPredicateStem = selectedSourceState === "possessive"
    ? operation?.targetStems?.generalUse : operation?.targetStems?.restrictedUse;
  return Boolean(
    typeof target.isClassicalNahuatlDeverbalNncGrammarFrame === "function"
    && target.isClassicalNahuatlDeverbalNncGrammarFrame(result)
    && result.authorizationStatus === "authorized"
    && result.constructionKind === "predicate-nominalization"
    && source.sourceStage === "preterit-predicate"
    && source.sourceStem === "tlami"
    && source.verbClass === "A"
    && source.sourceVoice === "active"
    && source.sourceValence === "intransitive"
    && source.sourceObjectPattern === "none"
    && operation.nominalizationKind === "preterit-agentive"
    && operation.nounClass === "zero"
    && operation.targetStems.restrictedUse
    && canonical.authorizationStatus === "authorized"
    && ["absolutive", "possessive"].includes(selectedSourceState)
    && canonical.state === selectedSourceState
    && canonical.subject === selection.subject
    && operation.numberAnimacyFrame?.selectedAnimacy === selection.animacy
    && typeof target.isClassicalNahuatlNncSlotFrame === "function"
    && target.isClassicalNahuatlNncSlotFrame(slots)
    && slots.slots.subject.subject === selection.subject
    && (slots.slots.state.arity === "vacant") === (selectedSourceState === "absolutive")
    && slots.slots.predicate.stem === selectedPredicateStem
    && slots.nounClass === operation.nounClass
    && canonical.numberFrame.stem === slots.slots.predicate.stem
    && canonical.numberFrame.nounClass === slots.nounClass
    && canonical.numberFrame.num1 === slots.slots.number.num1
    && canonical.numberFrame.num2 === slots.slots.number.num2
  );
}

function buildCobGrossConjunction(value, source, selection, target) {
  const blocked = blockReason => ({ authorizationStatus: "blocked", blockReason });
  const supplied = source.cobConjunctionResultFrame || null;
  const suppliedAgentive = source.cobPreteritAgentiveResultFrame || null;
  // The default source is the ordinary common-number counting clause.
  // A supplied source retains its own agreement, independently of outer ix.
  const sourceResult = supplied || evaluateNominalConstruction({
    constructionKind: "cardinal-numeral-nnc",
    value, classifier: "cob", countKind: "ordinary", state: "absolutive",
    subject: suppliedAgentive?.canonicalResult?.subject || "3common",
    animacy: suppliedAgentive?.operationFrame?.numberAnimacyFrame?.selectedAnimacy || "nonanimate",
    reduplication: selection.reduplication,
    source: suppliedAgentive ? { cobPreteritAgentiveResultFrame: suppliedAgentive } : {},
  }, target);
  const operation = sourceResult?.operationFrame;
  const conjunction = operation?.conjunctionFrame;
  const capture = operation?.conjunctionCaptureFrame;
  const members = capture?.conjunctResults;
  if (!isClassicalNahuatlNominalConstructionResult(sourceResult)
    || sourceResult.authorizationStatus !== "authorized"
    || sourceResult.constructionKind !== "cardinal-numeral-nnc"
    || operation.value !== value || operation.classifier !== "cob"
    || operation.countKind !== "ordinary"
    || conjunction?.selectedForm !== "separate" || !conjunction.conjoined
    || capture?.authorizationStatus !== "authorized"
    || !Array.isArray(members) || members.length < 2
    || members.length !== conjunction.conjuncts.length
    || capture.principalResult !== sourceResult.canonicalResult.nncSlotFrame
    || members[0].canonicalNncResultFrame !== sourceResult.canonicalResult
    || (suppliedAgentive && operation.cobPreteritAgentiveResultFrame !== suppliedAgentive)
    || members.some(member => !target.isClassicalNahuatlNncSlotFrame?.(member.canonicalResult))) {
    return blocked("gross-count-exact-ordinary-cob-conjunction-source-required");
  }
  if (supplied && selection.reduplicationExplicit
    && selection.reduplication !== operation.reduplication) {
    return blocked("gross-conjunction-source-reduplication-selection-mismatch");
  }
  const rightmostEmbedFrame = buildCardinalConjunctionRightmostEmbed(
    members.at(-1).canonicalNumeralResultFrame,
    source.rightmostNumeralVariant || "", target
  );
  if (rightmostEmbedFrame.authorizationStatus !== "authorized") return rightmostEmbedFrame;
  // §§34.8.3, 35.14: downgrade the whole conjunction, retaining the earlier
  // complete clauses and every inner person/state position. Only the final
  // number position is deleted; internal plural n/in remains in its stem.
  const segments = members.map((member, index) => {
    const canonicalNncSlotFrame = member.canonicalResult;
    const slots = canonicalNncSlotFrame.slots;
    const earlier = index < members.length - 1;
    const sourcePredicateStem = slots.predicate.stem;
    const predicateStem = earlier ? sourcePredicateStem
      : joinStemParts([additionalNumberLink(rightmostEmbedFrame.embedStem), rightmostEmbedFrame.embedStem]);
    return {
      rank: index + 1, canonicalNncSlotFrame, sourcePredicateStem, predicateStem,
      personPositionPreserved: true, statePositionPreserved: true,
      numberPosition: earlier ? "preserved" : "deleted",
      orderedMorphs: [
        slots.subject.pers1, slots.subject.pers2,
        ...slots.participant.slots.map(slot => slot.carrier),
        ...slots.state.slots.map(slot => slot.carrier),
        ...predicateStem.split("-"),
        ...(earlier ? [slots.number.num1, slots.number.num2] : []),
      ],
    };
  });
  const stem = joinStemParts([...segments.flatMap(segment => segment.orderedMorphs), "ix"]);
  const cobGrossConjunctionFrame = deepFreeze({
    kind: "classical-nahuatl-gross-cardinal-conjunction-embed-frame",
    version: VERSION, authorizationStatus: "authorized",
    canonicalConjunctionResultFrame: sourceResult,
    canonicalConjunctionCaptureFrame: capture,
    rightmostEmbedFrame, segments,
    matrixStem: "ix", matrixClass: "",
    matrixNumberJurisdiction: "plural-only-totality",
    compositionScope: "whole-conjunction", stem, numeralValue: value,
    reduplication: operation.reduplication,
    sourceAgreementChanged: false, sourceStateChanged: false,
    onlyRightmostNumberDeleted: true,
    formulaStringAuthority: false, surfaceStringAuthority: false,
  });
  ISSUED_GROSS_CONJUNCTION_EMBED_FRAMES.add(cobGrossConjunctionFrame);
  // This is one outer NNC. The exact original arithmetic clauses live in
  // its typed predicate structure, not in a second outer conjunction.
  const terms = [{ order: 1, multiplier: value, value, stem }];
  return {
    authorizationStatus: "authorized", stem, terms, matrixStem: "ix",
    restrictions: ["tlamic-preterit-agentive-class-a-exception"],
    cobPreteritAgentiveResultFrame: operation.cobPreteritAgentiveResultFrame,
    cobGrossConjunctionFrame, conjunctionForm: "separate",
    conjunctionFrame: buildCardinalConjunctionFrame({
      value, classifier: "cob", conjunctionForm: "separate", terms, stems: [stem],
    }),
  };
}

function buildCardinalConjunctionRightmostEmbed(
  result = null,
  variant = "",
  target = globalThis,
  followingMatrix = "ix"
) {
  const blocked = blockReason => deepFreeze({
    kind: "classical-nahuatl-cardinal-conjunction-rightmost-embed-frame",
    version: VERSION,
    authorizationStatus: "blocked",
    blockReason,
    embedStem: "",
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  if (!isClassicalNahuatlNominalConstructionResult(result)
    || result.authorizationStatus !== "authorized"
    || !hasCanonicalCardinalCitationAnalysis(result, target)) {
    return blocked("cardinal-conjunction-rightmost-issued-numeral-analysis-required");
  }
  const source = result.sourceFrame;
  const operation = result.operationFrame;
  const formation = operation.numeralStemFormationFrame;
  const canonical = result.canonicalResult;
  const slots = canonical.nncSlotFrame;
  const number = canonical.numberFrame;
  const terms = source.terms;
  const value = operation.value;
  if (operation.classifier !== "basic"
    || operation.countKind !== "ordinary"
    || source.state !== "absolutive"
    || slots.slots.state.arity !== "vacant"
    || operation.conjunctionFrame?.conjoined !== false
    || operation.conjunctionCaptureFrame
    || operation.adjectivalModificationFrame
    || !Array.isArray(terms) || terms.length !== 1
    || terms[0].order !== 1 || terms[0].value !== value
    || operation.conjunctionFrame.conjuncts.length !== 1
    || formation.retainedDerivationalConstituents !== true
    || number.authorizationStatus !== "authorized"
    || number.subject !== slots.slots.subject.subject
    || number.num1 !== slots.slots.number.num1
    || number.num2 !== slots.slots.number.num2
    || number.animacy !== source.animacy
    || !Object.isFrozen(number)) {
    return blocked("cardinal-conjunction-rightmost-single-basic-number-source-required");
  }
  const internalPluralMorph = formation.internalPluralMorph;
  const sourcePredicateStem = slots.slots.predicate.stem;
  const reduplication = formation.reduplication;
  if (!["none", "affinity", "distributive-varietal"].includes(reduplication)) {
    return blocked("cardinal-conjunction-rightmost-canonical-reduplication-required");
  }
  const availableVariants = internalPluralMorph !== "none"
    ? ["automatic"] : availableNumeralVariants(value, true);
  const requestedVariant = normalizeKey(variant);
  const selectedVariant = !requestedVariant || requestedVariant === "automatic"
    ? availableVariants[0] : requestedVariant;
  if (!availableVariants.includes(selectedVariant)) {
    return blocked("cardinal-conjunction-rightmost-embed-variant-not-licensed");
  }
  let embedBaseStem = sourcePredicateStem;
  let embedStem = sourcePredicateStem;
  let embedReduplicationFrame = null;
  if (internalPluralMorph === "none") {
    // §§34.3–34.4 supply the numeral's boundary-conditioned use shape;
    // §34.14 applies the source's selected reduplication to that same stem.
    // This is a use projection, not a second derivation of the source.
    embedBaseStem = simpleNumeralStem(value, {
      embedded: true,
      following: followingMatrix,
      variant: selectedVariant,
    });
    if (!embedBaseStem) {
      return blocked("cardinal-conjunction-rightmost-general-use-stem-required");
    }
    embedReduplicationFrame = reduplicateNumeral(
      value,
      embedBaseStem,
      reduplication,
      [{ ...terms[0], stem: embedBaseStem }],
      null,
      "basic",
      "",
      embedBaseStem
    );
    embedStem = embedReduplicationFrame.stem;
  }
  // §34.8.3 deletes the rightmost number POSITION. Internal n/in belongs
  // to the already-derived predicate, so neither it nor its selected
  // reduplication/allomorph is reconstructed from the unpluralized lexeme.
  // The containing rank owner, not this nounstem projection, removes slots.
  return deepFreeze({
    kind: "classical-nahuatl-cardinal-conjunction-rightmost-embed-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    canonicalNumeralResultFrame: result,
    canonicalNumeralStemFormationFrame: formation,
    canonicalNumeralSourceAnalysisFrame: source.numeralSourceAnalysisFrame,
    canonicalNncSlotFrame: slots,
    canonicalNumberFrame: number,
    sourcePredicateStem,
    embedBaseStem,
    embedStem,
    matrixStem: followingMatrix,
    selectedVariant,
    availableVariants,
    internalPluralMorph,
    reduplication,
    canonicalSourceReduplicationFrame: formation.reduplicationFrame,
    embedReduplicationFrame,
    useKind: "general-use",
    projectionScope: "nounstem-only",
    sourceDerivationChanged: false,
    sourceAgreementChanged: false,
    sourceNumberPositionChanged: false,
    sourceClauseFeaturesProjected: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildCobGrossFormation(agentiveResult, target) {
  const restrictedUseStem = agentiveResult.operationFrame.targetStems.restrictedUse;
  const generalUseStem = agentiveResult.operationFrame.targetStems.generalUse;
  if (!generalUseStem) return {
    authorizationStatus: "blocked",
    blockReason: "cob-gross-count-canonical-general-use-stem-required",
  };
  const matrixStem = "ix";
  const compoundSource = {
    embedStem: generalUseStem,
    embedConstituent: {
      kind: "preterit-agentive-nnc",
      stem: generalUseStem,
      resultFrame: agentiveResult,
    },
    matrixStem,
  };
  // Reuse the compound owner's exact issued general-use constituent
  // validation and embed realization, without evaluating an ordinary NNC
  // or inventing a singular/common class for the plural-only matrix.
  const sourceAuthorizationFrame = issueClassicalNahuatlNominalConstructionSourceAuthorization({
    constructionKind: "compound-nnc", source: compoundSource,
  }, target);
  if (sourceAuthorizationFrame.authorizationStatus !== "authorized") {
    return sourceAuthorizationFrame;
  }
  const embedShapeFrame = realizeCompoundEmbed(
    compoundSource, matrixStem, sourceAuthorizationFrame.lexicalFacts, target
  );
  if (embedShapeFrame.authorizationStatus !== "authorized") return embedShapeFrame;
  const embedStem = realizeBoundaryAssimilation(
    embedShapeFrame.writtenStem, matrixStem
  );
  const frame = deepFreeze({
    kind: "classical-nahuatl-cob-gross-general-use-formation-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    canonicalPreteritAgentiveResultFrame: agentiveResult,
    sourceAuthorizationFrame,
    embedShapeFrame,
    restrictedUseStem,
    generalUseStem,
    embedStem,
    matrixStem,
    matrixClass: "",
    matrixNumberJurisdiction: "plural-only-totality",
    compoundStem: joinStemParts([embedStem, matrixStem]),
    compositionScope: "single-nounstem",
    sourceAgreementChanged: false,
    sourceStateChanged: false,
    sourceClauseFeaturesProjected: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_COB_GROSS_FORMATION_FRAMES.add(frame);
  return frame;
}

function buildOrderConjunctionEmbed(multiplier, order, source, target) {
  const matrixStem = ({20: "pōhu-a-l", 400: "tzon", 8000: "xiqu-ipil"})[order];
  const parent = source.multiplierConjunctionResultFrame || evaluateNominalConstruction({
    constructionKind: "cardinal-numeral-nnc", value: multiplier,
    classifier: "basic", countKind: "ordinary", state: "absolutive",
    subject: "3common", animacy: "nonanimate",
  }, target);
  const operation = parent?.operationFrame;
  const capture = operation?.conjunctionCaptureFrame;
  const members = capture?.conjunctResults;
  if (!matrixStem || !isClassicalNahuatlNominalConstructionResult(parent)
    || parent.authorizationStatus !== "authorized"
    || operation?.value !== multiplier || operation.classifier !== "basic"
    || operation.countKind !== "ordinary" || operation.reduplication !== "none"
    || parent.sourceFrame.state !== "absolutive"
    || operation.conjunctionFrame?.selectedForm !== "separate"
    || !operation.conjunctionFrame.conjoined
    || capture?.principalResult !== parent.canonicalResult.nncSlotFrame
    || !Array.isArray(members) || members.length < 2
    || members.some(member => !target.isClassicalNahuatlNncSlotFrame?.(member.canonicalResult))) {
    return {authorizationStatus: "blocked", blockReason: "order-multiplier-issued-whole-conjunction-required"};
  }
  const rightmostEmbedFrame = buildCardinalConjunctionRightmostEmbed(
    members.at(-1).canonicalNumeralResultFrame,
    source.rightmostNumeralVariant || "", target, matrixStem
  );
  if (rightmostEmbedFrame.authorizationStatus !== "authorized") return rightmostEmbedFrame;
  const segments = members.map((member, index) => {
    const slots = member.canonicalResult.slots;
    const earlier = index < members.length - 1;
    const predicateStem = earlier ? slots.predicate.stem
      : joinStemParts([additionalNumberLink(rightmostEmbedFrame.embedStem), rightmostEmbedFrame.embedStem]);
    return {
      rank: index + 1, canonicalNncSlotFrame: member.canonicalResult,
      sourcePredicateStem: slots.predicate.stem, predicateStem,
      personPositionPreserved: true, statePositionPreserved: true,
      numberPosition: earlier ? "preserved" : "deleted",
      orderedMorphs: [slots.subject.pers1, slots.subject.pers2,
        ...slots.participant.slots.map(slot => slot.carrier),
        ...slots.state.slots.map(slot => slot.carrier), predicateStem,
        ...(earlier ? [slots.number.num1, slots.number.num2] : [])],
    };
  });
  const stem = joinStemParts([...segments.flatMap(segment => segment.orderedMorphs), matrixStem]);
  const frame = deepFreeze({
    kind: "classical-nahuatl-cardinal-order-conjunction-embed-frame",
    version: VERSION, authorizationStatus: "authorized",
    canonicalConjunctionResultFrame: parent, canonicalConjunctionCaptureFrame: capture,
    rightmostEmbedFrame, segments, matrixStem, matrixClass: "tli",
    compositionScope: "whole-conjunction", stem, numeralValue: multiplier * order,
    sourceAgreementChanged: false, sourceStateChanged: false,
    onlyRightmostNumberDeleted: true,
    formulaStringAuthority: false, surfaceStringAuthority: false,
  });
  ISSUED_GROSS_CONJUNCTION_EMBED_FRAMES.add(frame);
  return frame;
}

function realizeNumeralConstruction(
  value,
  classifier,
  source = {},
  target = globalThis,
  selection = {}
) {
  const restrictions = [];
  if (classifier === "cob" && value > 39) {
    return { authorizationStatus: "blocked", blockReason: "cob-classifier-is-not-licensed-beyond-thirty-nine" };
  }
  if (classifier === "cob" && value >= 20) {
    const gross = selection.countKind === "gross";
    if (gross && value > 20) {
      return buildCobGrossConjunction(value, source, selection, target);
    }
    const suppliedAgentiveResult = source.cobPreteritAgentiveResultFrame || null;
    // For gross20 it is the nounstem, not the source clause's agreement,
    // that is embedded. Retain a supplied clause's actual agreement; the
    // ordinary citation clause is the default when no child is supplied.
    const agentiveSubject = gross
      ? suppliedAgentiveResult?.canonicalResult?.subject || "3common"
      : selection.subject;
    const agentiveAnimacy = gross
      ? suppliedAgentiveResult?.operationFrame?.numberAnimacyFrame?.selectedAnimacy || "nonanimate"
      : selection.animacy;
    const derivedAgentiveResult = !suppliedAgentiveResult
      && typeof target.evaluateClassicalNahuatlDeverbalNnc === "function"
      ? target.evaluateClassicalNahuatlDeverbalNnc({
        constructionKind: "predicate-nominalization",
        nominalizationKind: "preterit-agentive",
        source: {
          sourceStage: "preterit-predicate",
          sourceStem: "tlami",
          verbClass: "A",
          sourceVoice: "active",
          sourceValence: "intransitive",
          sourceObjectPattern: "none",
          sourceSubject: agentiveSubject,
        },
        subject: agentiveSubject,
        animacy: agentiveAnimacy,
        state: "absolutive",
      })
      : null;
    const agentiveResult = suppliedAgentiveResult || derivedAgentiveResult;
    const canonicalAgentive = isCanonicalCobPreteritAgentiveResult(
      agentiveResult,
      { subject: agentiveSubject, animacy: agentiveAnimacy,
        sourceUse: gross ? "general-use" : "restricted-use" },
      target
    );
    if (!canonicalAgentive) {
      return {
        authorizationStatus: "blocked",
        blockReason:
          "cob-twenty-route-requires-engine-issued-tlamic-preterit-agentive",
      };
    }
    if (gross) {
      const cobGrossFormationFrame = buildCobGrossFormation(agentiveResult, target);
      if (cobGrossFormationFrame.authorizationStatus !== "authorized") {
        return cobGrossFormationFrame;
      }
      const principalStem = cobGrossFormationFrame.generalUseStem;
      const terms = [{ order: 20, multiplier: 1, value: 20, stem: principalStem }];
      return {
        authorizationStatus: "authorized",
        stem: principalStem,
        terms,
        restrictions: ["tlamic-preterit-agentive-class-a-exception"],
        matrixStem: principalStem,
        cobPreteritAgentiveResultFrame: agentiveResult,
        cobGrossFormationFrame,
        conjunctionForm: "separate",
        conjunctionFrame: buildCardinalConjunctionFrame({
          value, classifier, conjunctionForm: "separate", terms, stems: [principalStem],
        }),
      };
    }
    const remainder = value - 20;
    const remainderTerms = remainder ? decomposeVigesimal(remainder) : [];
    // §34.12 substitutes a complete preterit-agentive NNC, not a tl-class
    // nounstem made from its written output. Keep its number outside the
    // restricted predicate; the Class-A analysis is the lexical exception.
    const principalStem =
      agentiveResult.canonicalResult.nncSlotFrame.slots.predicate.stem;
    const terms = [
      { order: 20, multiplier: 1, value: 20, stem: principalStem },
      ...remainderTerms,
    ];
    const stems = terms.map((term, index) => (
      index === 0
        ? term.stem
        : `${additionalNumberLink(term.stem)}-${term.stem}`
    ));
    const stem = stems.join("-");
    return {
      authorizationStatus: "authorized",
      stem,
      terms,
      restrictions: ["tlamic-preterit-agentive-class-a-exception"],
      matrixStem: principalStem,
      cobPreteritAgentiveResultFrame: agentiveResult,
      conjunctionForm: "separate",
      conjunctionFrame: buildCardinalConjunctionFrame({
        value,
        classifier,
        conjunctionForm: "separate",
        terms,
        stems,
      }),
    };
  }
  if (["tecpan", "ipil", "quimil"].includes(classifier)) {
    const multiplier = Math.floor(value / 20);
    const remainder = value % 20;
    if (multiplier < 1 || multiplier > 19) {
      return { authorizationStatus: "blocked", blockReason: "special-twenty-classifier-requires-one-through-nineteen-groups-of-twenty" };
    }
    const matrix = classifierMatrix(classifier, source);
    const groupStem = joinNumeralClassifierStem(
      simpleNumeralStem(multiplier, {
        embedded: true,
        following: matrix,
        variant: normalizeKey(source.numeralVariant || ""),
      }),
      matrix
    );
    const remainderTerms = remainder
      ? decomposeVigesimal(remainder)
      : [];
    const terms = [
      { order: 20, multiplier, value: multiplier * 20, stem: groupStem },
      ...remainderTerms,
    ];
    const stems = terms.map((term, index) => (
      index === 0
        ? term.stem
        : `${additionalNumberLink(term.stem)}-${term.stem}`
    ));
    return {
      authorizationStatus: "authorized",
      stem: stems.join("-"),
      terms,
      restrictions,
      matrixStem: matrix,
      conjunctionFrame: buildCardinalConjunctionFrame({
        value,
        classifier,
        conjunctionForm: "separate",
        terms,
        stems,
      }),
    };
  }
  const terms = decomposeVigesimal(value);
  if (!terms.length) return { authorizationStatus: "blocked", blockReason: "numeral-value-outside-licensed-vigesimal-range" };
  const classifierStem = classifierMatrix(classifier, source);
  if (classifier === "measure" && !classifierStem) {
    return { authorizationStatus: "blocked", blockReason: "measure-classifier-requires-measure-stem" };
  }
  const requestedVariant = normalizeKey(source.numeralVariant || "");
  let downgradedConjunctionFrame = null;
  const realizedTerms = terms.map((term, index) => {
    if (index === 0 && classifier === "basic" && term.order > 1
      && term.multiplier >= 11 && term.multiplier <= 19 && term.multiplier !== 15) {
      downgradedConjunctionFrame = buildOrderConjunctionEmbed(term.multiplier, term.order, source, target);
      return {...term, stem: downgradedConjunctionFrame.stem || ""};
    }
    if (index === 0 && term.order > 1 && [2, 3].includes(term.multiplier)) {
      return {...term, stem: orderTerm(term.multiplier, term.order, requestedVariant === "automatic" ? "" : requestedVariant)};
    }
    if (index !== 0 || term.order !== 1 || term.value < 1 || term.value > 19) {
      return term;
    }
    const embedded = classifier !== "basic";
    const selectedStem = simpleNumeralStem(term.value, {
      embedded,
      following: embedded ? classifierStem : "",
      variant: requestedVariant,
    });
    return { ...term, stem: selectedStem };
  });
  if (downgradedConjunctionFrame?.authorizationStatus === "blocked") return downgradedConjunctionFrame;
  if (realizedTerms.some(term => !term.stem)) {
    return {
      authorizationStatus: "blocked",
      blockReason: "numeral-source-variant-not-licensed-for-position",
    };
  }
  const stems = realizedTerms.map((term, index) => {
    if (index === 0 && classifier !== "basic") {
      return joinNumeralClassifierStem(
        term.stem,
        classifierStem
      );
    }
    if (!index) return term.stem;
    const precedingOrder = terms[index - 1]?.order || 1;
    const linker = precedingOrder >= 400
      ? normalizeKey(source.higherOrderLink || "īpan")
      : additionalNumberLink(term.stem, normalizeKey(source.conjunctionForm) === "compound");
    if (precedingOrder >= 400 && !["īpan", "ihuān"].includes(linker)) return "";
    return `${linker}-${term.stem}`;
  });
  if (stems.some(stem => !stem)) {
    return { authorizationStatus: "blocked", blockReason: "higher-order-link-requires-ipan-or-ihuan" };
  }
  if (classifier !== "basic" && terms.length > 1) restrictions.push("rightward-conjunct-does-not-repeat-classifier");
  const requestedConjunctionForm = normalizeKey(source.conjunctionForm || "separate");
  if (!["separate", "compound"].includes(requestedConjunctionForm)) {
    return {
      authorizationStatus: "blocked",
      blockReason: "cardinal-conjunction-form-not-recognized",
    };
  }
  const compoundAvailable = classifier === "basic"
    && value >= 11
    && value <= 14;
  if (requestedConjunctionForm === "compound" && !compoundAvailable) {
    return {
      authorizationStatus: "blocked",
      blockReason: "numeral-conjunctive-compound-not-licensed-for-selected-structure",
    };
  }
  let compoundRightmostResultFrame = null;
  if (requestedConjunctionForm === "compound" && stems.length === 2) {
    compoundRightmostResultFrame = evaluateNominalConstruction({
      constructionKind: "cardinal-numeral-nnc", value: realizedTerms[1].value,
      classifier: "basic", countKind: "ordinary", state: "absolutive",
      subject: selection.subject, animacy: selection.animacy,
    }, target);
    if (compoundRightmostResultFrame.authorizationStatus !== "authorized") return compoundRightmostResultFrame;
    const rightStem = compoundRightmostResultFrame.canonicalResult.nncSlotFrame.slots.predicate.stem;
    stems[0] = `${stems[0]}-tl`;
    stems[1] = `${additionalNumberLink(rightStem, true)}-${rightStem}`;
  }
  const conjunctionFrame = buildCardinalConjunctionFrame({
    value,
    classifier,
    conjunctionForm: requestedConjunctionForm,
    terms: realizedTerms,
    stems,
  });
  return {
    authorizationStatus: "authorized",
    stem: stems.join("-"),
    terms: realizedTerms,
    restrictions,
    matrixStem: classifierStem || "basic-numeral",
    conjunctionFrame,
    downgradedConjunctionFrame,
    compoundRightmostResultFrame,
  };
}

function reduplicateNumeral(
  value,
  stem,
  kind,
  terms,
  conjunctionFrame,
  classifier,
  classifierStem,
  unreduplicatedStem
) {
  const originalConjunctStems = conjunctionFrame?.conjuncts?.map(
    conjunct => conjunct.realizedStem
  ) || [unreduplicatedStem || stem];
  if (kind === "none") {
    return {
      stem,
      conjunctStems: originalConjunctStems,
      targetScope: "none",
      scopeTargets: [],
    };
  }
  const mode = kind === "affinity" ? "affinity" : "distributive";
  const reduplicateTerm = (termStem, termValue) => {
    if ([7, 8, 9].includes(termValue)) {
      const [embed, ...matrixParts] = termStem.split("-");
      const first = reduplicateInitial(embed, mode, "initial");
      const matrix = reduplicateInitial(matrixParts.join("-"), mode, "initial");
      return joinStemParts([first, matrix]);
    }
    if (termValue === 10) return reduplicateInitial(termStem, mode, "matrix");
    const realized = reduplicateInitial(termStem, mode, "initial");
    if (termValue === 1 && classifier === "basic") {
      return realized.replace(/-cē$/u, "-cen");
    }
    return realized;
  };
  const conjunctStems = terms.map((term, index) => {
    const reduplicatedBase = reduplicateTerm(term.stem, term.value);
    if (index === 0 && classifier !== "basic") {
      if (term.stem === classifierStem) return reduplicatedBase;
      return joinNumeralClassifierStem(reduplicatedBase, classifierStem);
    }
    const original = originalConjunctStems[index] || term.stem;
    const prefix = original.endsWith(term.stem)
      ? original.slice(0, original.length - term.stem.length)
      : index > 0 ? `${additionalNumberLink(term.stem)}-` : "";
    return `${prefix}${reduplicatedBase}`;
  });
  const baseBeforeInflection = unreduplicatedStem || originalConjunctStems.join("-");
  const inflectionTail = stem.startsWith(baseBeforeInflection)
    ? stem.slice(baseBeforeInflection.length)
    : "";
  const reduplicatedStem = `${conjunctStems.join("-")}${inflectionTail}`;
  const targetScope = terms.length > 1
    ? "all-conjuncts"
    : [7, 8, 9].includes(value)
      ? "embed-and-basic-numeral-matrix"
      : value === 10
        ? "mahtlac-matrix"
        : "first-part";
  return {
    stem: reduplicatedStem,
    conjunctStems,
    targetScope,
    scopeTargets: terms.length > 1
      ? terms.map((term, index) => `conjunct-${index + 1}:${term.value}`)
      : targetScope === "embed-and-basic-numeral-matrix"
        ? ["numeral-embed", "basic-numeral-matrix"]
        : [targetScope],
  };
}

function evaluateCardinalNominalConstruction(request, target) {
  const source = request.source && typeof request.source === "object" ? request.source : request;
  const value = Number(request.value ?? source.value);
  const compatibleClassifiers = Array.isArray(source.compatibleClassifiers)
    ? [...new Set(source.compatibleClassifiers.map(normalizeKey).filter(
      candidate => CARDINAL_NOMINAL_CLASSIFIERS.includes(candidate)
    ))]
    : [];
  const classifier = normalizeKey(
    request.classifier
    || source.classifier
    || (compatibleClassifiers.length === 1 ? compatibleClassifiers[0] : "basic")
  );
  const countKind = normalizeKey(request.countKind || source.countKind || "ordinary");
  const requestedNumeralOutputKind = normalizeKey(
    request.numeralOutputKind || "nnc"
  );
  const legacyVncAdverbRequest = requestedNumeralOutputKind === "vnc-adverb";
  const numeralOutputKind = requestedNumeralOutputKind === "vnc-adverb"
    ? "vnc-embed" : requestedNumeralOutputKind;
  const subject = normalizeSubject(request.subject
    || (numeralOutputKind === "vnc-embed" ? "3sg" : countKind === "gross" ? "3pl" : "3common"));
  const animacy = normalizeKey(request.animacy || source.animacy || "nonanimate");
  const state = normalizeKey(request.state || "absolutive");
  if (!Number.isInteger(value) || value < 1) return buildBlockedFrame("cardinal-numeral-nnc", "positive-integer-numeral-value-required", request);
  if (!CARDINAL_NOMINAL_CLASSIFIERS.includes(classifier)) return buildBlockedFrame("cardinal-numeral-nnc", "cardinal-nominal-classifier-required", request);
  if (!["ordinary", "gross"].includes(countKind)) return buildBlockedFrame("cardinal-numeral-nnc", "cardinal-nominal-count-kind-required", request);
  if (!["nnc", "vnc-embed"].includes(numeralOutputKind)) {
    return buildBlockedFrame("cardinal-numeral-nnc", "cardinal-nominal-output-kind-required", request);
  }
  if (compatibleClassifiers.length
    && !compatibleClassifiers.includes(classifier)) {
    return buildBlockedFrame(
      "cardinal-numeral-nnc",
      "selected-counting-set-not-compatible-with-typed-referent",
      request
    );
  }
  if (!subject) return buildBlockedFrame("cardinal-numeral-nnc", "unknown-nnc-subject", request);
  const reduplicatedOnePlural = numeralOutputKind === "nnc"
    && countKind === "ordinary" && classifier === "basic" && value === 1
    && subject.endsWith("pl")
    && ["affinity", "distributive-varietal"].includes(normalizeKey(request.reduplication));
  const ordinaryNumberVariant = normalizeKey(request.ordinaryNumberVariant || "tin");
  const lastBasicTerm = decomposeVigesimal(value).at(-1);
  const separatedPronominalRightward = normalizeKey(source.conjunctionForm || "separate") === "separate"
    && decomposeVigesimal(value).length > 1 && lastBasicTerm?.order === 1
    && lastBasicTerm.value >= 2 && lastBasicTerm.value <= 4;
  const silentNumberAvailable = numeralOutputKind === "nnc"
    && countKind === "ordinary" && classifier === "basic"
    && ((value >= 2 && value <= 4) || separatedPronominalRightward) && subject.endsWith("pl");
  if (!["tin", "zero", ...(reduplicatedOnePlural ? ["meh"] : [])].includes(ordinaryNumberVariant)
    || (ordinaryNumberVariant === "zero" && !silentNumberAvailable)) {
    return buildBlockedFrame("cardinal-numeral-nnc", "ordinary-cardinal-number-variant-not-licensed", request);
  }
  const availableOrdinaryNumberVariants = Object.freeze(
    reduplicatedOnePlural ? ["tin", "meh"] : silentNumberAvailable ? ["tin", "zero"] : ["tin"]
  );
  if (numeralOutputKind === "vnc-embed") {
    if (![1, 2, 3, 4].includes(value)
      || classifier !== "basic" || countKind !== "ordinary") {
      return buildBlockedFrame("cardinal-numeral-nnc", "basic-one-through-four-required-for-lesson34-vnc-embed", request);
    }
    const matrixStem = normalizeStem(source.matrixStem);
    if (!matrixStem) return buildBlockedFrame("cardinal-numeral-nnc", "numeral-vnc-adverb-requires-matrix-stem", request);
    const numeralVariant = normalizeKey(
      request.numeralVariant || source.numeralVariant || ""
    );
    const numeralEmbedStem = simpleNumeralStem(value, {
      embedded: true,
      following: matrixStem,
      variant: numeralVariant,
    });
    if (!numeralEmbedStem) {
      return buildBlockedFrame(
        "cardinal-numeral-nnc",
        "numeral-source-variant-not-licensed-for-position",
        request
      );
    }
    const nominalEmbedRequest = {
      constructionKind: "nominal-embed-vnc",
      relation: "adverb",
      route: "direct-adverb",
      adverbRole: value === 1 ? "manner" : "quantity",
      orientation: "subject",
      subject,
      mood: normalizeKey(request.mood || "indicative"),
      tense: normalizeKey(request.tense || "present"),
      voice: normalizeKey(request.voice || "active"),
      source: {
        embedStem: numeralEmbedStem,
        matrixStem,
        matrixVerbClass: normalizeToken(source.matrixVerbClass || "A").toUpperCase(),
        // Preserve semantic valence until the nominal owner derives the
        // object slots; normalizing it here would erase nonspecific objects.
        matrixValence: source.matrixValence || "intransitive",
        sourceObjectRequests: buildObjectRequests(
          ({ "intransitive": 0, "single-object": 1, "double-object": 2, "triple-object": 3 })[
            normalizeMatrixValence(source.matrixValence || "intransitive")
          ] || 0,
          source
        ),
      },
    };
    const nominalEmbedSourceAuthorization =
      issueClassicalNahuatlNominalConstructionSourceAuthorization(
        nominalEmbedRequest,
        target
      );
    const nominalEmbed = evaluateNominalEmbedConstruction(
      nominalEmbedRequest,
      target,
      nominalEmbedSourceAuthorization
    );
    const authorized = nominalEmbed.authorizationStatus === "authorized";
    return Object.freeze({
      ...nominalEmbed,
      kind: "classical-nahuatl-nominal-construction-result-frame",
      constructionFamily: legacyVncAdverbRequest
        ? "cardinal-numeral-vnc-adverb"
        : "cardinal-numeral-vnc-embed",
      sourceFrame: Object.freeze({
        kind: legacyVncAdverbRequest
          ? "classical-nahuatl-cardinal-vnc-adverb-source-frame"
          : "classical-nahuatl-cardinal-vnc-embed-source-frame",
        version: VERSION,
        authorizationStatus: "authorized",
        value,
        numeralStem: numeralEmbedStem,
        matrixStem,
        numeralSourceAnalysisFrame: buildNumeralSourceAnalysisFrame({
          value,
          countKind,
          classifier,
          embedded: true,
          following: matrixStem,
          requestedVariant: numeralVariant,
          selectedStem: numeralEmbedStem,
          compatibleClassifiers,
          terms: [{
            order: 1,
            multiplier: value,
            value,
            stem: numeralEmbedStem,
          }],
        }),
      }),
      operationFrame: Object.freeze({
        kind: legacyVncAdverbRequest
          ? "classical-nahuatl-cardinal-vnc-adverb-operation-frame"
          : "classical-nahuatl-cardinal-vnc-embed-operation-frame",
        version: VERSION,
        authorizationStatus: authorized ? "authorized" : "blocked",
        relation: "incorporated-adverb",
        semanticRole: value === 1
          ? "complete-entire-together-forever"
          : "numerical-quantity-or-repetition",
        stem: nominalEmbed.operationFrame?.compoundStem || "",
        appliedSemanticRules: Object.freeze([
          "numeral/base",
          value === 1 ? "numeral/one" : "numeral/two-four",
          value === 1 ? "numeral/vnc-adverb" : "numeral/vnc-embed",
          ...(nominalEmbed.operationFrame?.appliedSemanticRules || []),
        ]),
        canonicalNominalEmbedOperationFrame: nominalEmbed.operationFrame || null,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      }),
      canonicalResult: nominalEmbed.canonicalResult,
      typedFrameAuthority: true,
      callerSuppliedAuthorityAccepted: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }
  if (!["absolutive", "possessive"].includes(state)) return buildBlockedFrame("cardinal-numeral-nnc", "cardinal-nominal-state-required", request);
  if (state === "possessive" && countKind !== "gross") return buildBlockedFrame("cardinal-numeral-nnc", "cardinal-numeral-nnc-is-absolutive-only-except-gross-count", request);
  if (countKind === "gross" && value < 2) {
    return buildBlockedFrame(
      "cardinal-numeral-nnc",
      "gross-count-requires-a-numeral-value-of-two-or-more",
      request
    );
  }
  if (countKind === "gross" && !subject.endsWith("pl")) return buildBlockedFrame("cardinal-numeral-nnc", "gross-count-requires-plural-subject", request);
  if (countKind === "ordinary" && animacy === "nonanimate" && subject !== "3common") {
    return buildBlockedFrame("cardinal-numeral-nnc", "ordinary-nonanimate-count-requires-common-number-subject", request);
  }
  if (countKind === "ordinary" && animacy === "animate" && subject === "3common") {
    return buildBlockedFrame("cardinal-numeral-nnc", "ordinary-animate-count-requires-singular-or-plural-subject", request);
  }
  const possessor = normalizeKey(request.possessor || "3pl");
  const grossPossessorKind = state === "possessive"
    ? normalizeKey(
      request.grossPossessorKind
      || source.grossPossessorKind
      || source.possessorAnimacy
      || "animate"
    )
    : "not-applicable";
  const grossPossessiveNumberVariant = state === "possessive"
    ? normalizeKey(
      request.grossPossessiveNumberVariant
      || source.grossPossessiveNumberVariant
      || "tin"
    )
    : "not-applicable";
  if (state === "possessive") {
    if (!possessor) return buildBlockedFrame("cardinal-numeral-nnc", "gross-possessive-requires-possessor", request);
    if (!["animate", "nonanimate"].includes(grossPossessorKind)) {
      return buildBlockedFrame("cardinal-numeral-nnc", "gross-possessive-possessor-kind-required", request);
    }
    if (grossPossessorKind === "animate"
      && !["1pl", "2pl", "3pl"].includes(possessor)) {
      return buildBlockedFrame("cardinal-numeral-nnc", "gross-possessive-animate-possessor-must-be-plural", request);
    }
    if (grossPossessorKind === "nonanimate") {
      if (possessor !== "3sg") {
        return buildBlockedFrame("cardinal-numeral-nnc", "gross-possessive-nonanimate-possessor-requires-third-person-common-number", request);
      }
      if (source.possessorReferentPlural !== true) {
        return buildBlockedFrame("cardinal-numeral-nnc", "gross-possessive-nonanimate-possessor-referent-must-be-plural", request);
      }
      if (!["tin", "ti"].includes(grossPossessiveNumberVariant)) {
        return buildBlockedFrame("cardinal-numeral-nnc", "gross-possessive-nonanimate-number-variant-required", request);
      }
    } else if (grossPossessiveNumberVariant !== "tin") {
      return buildBlockedFrame("cardinal-numeral-nnc", "gross-possessive-ti-variant-requires-nonanimate-possessor", request);
    }
  }
  const grossPossessiveFrame = state === "possessive"
    ? deepFreeze({
      kind: "classical-nahuatl-cardinal-gross-possessive-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      possessor,
      possessorKind: grossPossessorKind,
      possessorReferentPlural: grossPossessorKind === "animate"
        ? true
        : source.possessorReferentPlural === true,
      availableNumberVariants: Object.freeze(
        grossPossessorKind === "nonanimate" ? ["tin", "ti"] : ["tin"]
      ),
      selectedNumberVariant: grossPossessiveNumberVariant,
      numberVariantChoiceRequired: grossPossessorKind === "nonanimate",
      finalNMayBeOrthographicallyOmitted:
        grossPossessorKind === "nonanimate",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    })
    : null;
  const numeral = realizeNumeralConstruction(
    value,
    classifier,
    source,
    target,
    { countKind, subject, animacy,
      reduplication: normalizeKey(request.reduplication || "none"),
      reduplicationExplicit: request.reduplication !== undefined }
  );
  if (numeral.authorizationStatus !== "authorized") return buildBlockedFrame("cardinal-numeral-nnc", numeral.blockReason, request);
  const cobPreteritAgentiveResultFrame =
    numeral.cobPreteritAgentiveResultFrame || null;
  const cobGrossFormationFrame = numeral.cobGrossFormationFrame || null;
  const cobGrossConjunctionFrame = numeral.cobGrossConjunctionFrame || null;
  const cobCanonicalResult = !cobGrossFormationFrame && !cobGrossConjunctionFrame
    ? cobPreteritAgentiveResultFrame?.canonicalResult : null;
  const plural = subject.endsWith("pl");
  const sourceProfile = numeralSourceProfile(value);
  let stem = cobCanonicalResult
    ? cobCanonicalResult.nncSlotFrame.slots.predicate.stem
    : cobGrossFormationFrame ? cobGrossFormationFrame.compoundStem
    : cobGrossConjunctionFrame ? cobGrossConjunctionFrame.stem
    : inflectedSimpleNumeralStem(value, numeral.stem, {
    plural,
    countKind,
    classifier,
    subject,
  });
  const preReduplicationStem = stem;
  const reduplication = cobGrossConjunctionFrame?.reduplication
    || normalizeKey(request.reduplication || "none");
  if (!["none", "affinity", "distributive-varietal"].includes(reduplication)) {
    return buildBlockedFrame("cardinal-numeral-nnc", "cardinal-nominal-reduplication-kind-invalid", request);
  }
  // §34.4/§34.5: plural n/in is already inside the selected numeral
  // nounstem. Reduplicate that owned stem, including its allomorph, rather
  // than guessing a suffix by comparing it with an uninflected spelling.
  const selectedPluralStemIsReduplicationSource = countKind === "ordinary"
    && classifier === "basic" && plural && numeral.terms.length === 1
    && sourceProfile?.pluralStemFormationKind === "internal-plural";
  const reduplicationTerms = selectedPluralStemIsReduplicationSource
    ? [{ ...numeral.terms[0], stem }] : numeral.terms;
  const reduplicationRealization = cobGrossConjunctionFrame ? {
    stem, conjunctStems: [stem], targetScope: "all-embedded-conjuncts",
    scopeTargets: cobGrossConjunctionFrame.segments.map(segment => ({
      rank: segment.rank, sourceStem: segment.sourcePredicateStem,
      realizedStem: segment.predicateStem,
    })),
  } : reduplicateNumeral(
    value,
    stem,
    reduplication,
    reduplicationTerms,
    numeral.conjunctionFrame,
    classifier,
    numeral.matrixStem,
    selectedPluralStemIsReduplicationSource ? stem : numeral.stem
  );
  stem = cobCanonicalResult
    ? reduplicationRealization.conjunctStems[0]
    : reduplicationRealization.stem;
  const modifier = normalizeKey(request.modifier || "none");
  const modifierSurface = {
    none: "",
    canah: "Canah",
    quēn: "Quēn",
    "ahzo-quēn": "Ahzo quēn",
    oc: "Oc",
  }[modifier];
  if (modifierSurface === undefined) return buildBlockedFrame("cardinal-numeral-nnc", "cardinal-nominal-numeral-modifier-invalid", request);
  const measureMeaning = classifier === "measure"
    ? normalizeKey(source.measureMeaning || "amount")
    : "not-applicable";
  if (classifier === "measure"
    && !["amount", "length"].includes(measureMeaning)) {
    return buildBlockedFrame(
      "cardinal-numeral-nnc",
      "measure-nnc-requires-amount-or-length-meaning",
      request
    );
  }
  if (classifier === "measure" && !normalizeNounClass(source.measureClass)) {
    return buildBlockedFrame(
      "cardinal-numeral-nnc",
      "measure-nnc-requires-measure-class",
      request
    );
  }
  const nounClass = cobCanonicalResult
    ? cobCanonicalResult.nncSlotFrame.nounClass
    : cobGrossFormationFrame || cobGrossConjunctionFrame ? ""
    : classifier === "basic"
    ? (normalizeKey(source.conjunctionForm) === "compound"
      ? "zero"
      : [1, 2, 3, 4, 6, 7, 8, 9].includes(value) ? "zero" : "tli")
    : ["rock", "cob"].includes(classifier) ? "tl"
      : ["row", "thing", "tecpan"].includes(classifier) ? "tli"
        : ["ipil", "quimil"].includes(classifier) ? "tli"
          : normalizeNounClass(source.measureClass || "tli");
  const classifierFrame = buildCardinalClassifierFrame({
    classifier,
    classifierStem: numeral.matrixStem,
    compatibleClassifiers,
    source,
    value,
  });
  let conjunctionFrame = reduplication !== "none"
    ? buildCardinalConjunctionFrame({
      value,
      classifier,
      conjunctionForm: numeral.conjunctionForm
        || normalizeKey(source.conjunctionForm || "separate"),
      terms: numeral.terms,
      stems: reduplicationRealization.conjunctStems,
    })
    : numeral.conjunctionFrame
    || buildCardinalConjunctionFrame({
      value,
      classifier,
      conjunctionForm: normalizeKey(source.conjunctionForm || "separate"),
      terms: numeral.terms,
      stems: numeral.terms.map((term, index) => (
        index === 0
          ? term.stem
          : `${additionalNumberLink(term.stem)}-${term.stem}`
      )),
    });
  // §34.8's short om introduces a basic numeral NNC, not an ordinary
  // noun rebuilt from an uninflected numeral label. Let the cardinal owner
  // retain each addend's internal n/in, selected reduplication and number
  // analysis before adding that independent additional-number constituent.
  const canonicalConjunctSourceFrames = Object.freeze(
    conjunctionFrame.conjuncts.map((conjunct, index) => {
      if (countKind !== "ordinary"
        || conjunctionFrame.selectedForm !== "separate"
        || index === 0
        || numeral.terms[index - 1].order >= 400
        || conjunct.order !== 1) return null;
      return evaluateNominalConstruction({
        constructionKind: "cardinal-numeral-nnc",
        value: conjunct.value,
        classifier: "basic",
        countKind: "ordinary",
        state: "absolutive",
        subject,
        animacy,
        reduplication,
        ordinaryNumberVariant: conjunct.value >= 2 && conjunct.value <= 4
          ? ordinaryNumberVariant : "tin",
      }, target);
    })
  );
  const rejectedConjunctSource = canonicalConjunctSourceFrames.find(result => (
    result && (!isClassicalNahuatlNominalConstructionResult(result)
      || result.authorizationStatus !== "authorized")
  ));
  if (rejectedConjunctSource) return buildBlockedFrame(
    "cardinal-numeral-nnc",
    rejectedConjunctSource.blockReason || "cardinal-conjunct-canonical-numeral-source-required",
    request
  );
  if (canonicalConjunctSourceFrames.some(Boolean)) {
    conjunctionFrame = buildCardinalConjunctionFrame({
      value,
      classifier,
      conjunctionForm: "separate",
      terms: numeral.terms,
      stems: conjunctionFrame.conjuncts.map((conjunct, index) => {
        const child = canonicalConjunctSourceFrames[index];
        const contextualThreeStem = child && !plural && child.operationFrame.value === 3
          ? child.sourceFrame.numeralSourceAnalysisFrame.orthographicShapes[0]
          : null;
        // The rightward spelling has its own licensed three-stem allomorph.
        // Its boundary realization must retain the selected reduplication.
        const predicate = contextualThreeStem
          ? reduplication === "none" ? contextualThreeStem
            : reduplicateInitial(contextualThreeStem,
              reduplication === "affinity" ? "affinity" : "distributive")
          : child?.canonicalResult.nncSlotFrame.slots.predicate.stem;
        return child
          ? joinStemParts([additionalNumberLink(predicate), predicate])
          : conjunct.realizedStem;
      }),
    });
  }
  const reduplicationFrame = reduplication === "none"
    ? null
    : deepFreeze({
      kind: "classical-nahuatl-cardinal-reduplication-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      selectedMeaning: reduplication,
      semanticContrast: reduplication === "affinity"
        ? "continuity-or-relatedness"
        : "separateness-dispersion-or-variety",
      realizationContrast: reduplication === "affinity"
        ? "reduplicant-vowel-length"
        : "reduplicant-glottal-stop",
      targetScope: reduplicationRealization.targetScope,
      scopeTargets: Object.freeze([...reduplicationRealization.scopeTargets]),
      scopeDerivedFromMorphemicStructure: true,
      manualScopeChoiceAccepted: false,
      exampleNumeralMembershipRequired: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  const measureFrame = classifier === "measure"
    ? deepFreeze({
      kind: "classical-nahuatl-cardinal-measure-source-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      numeralEmbedValue: value,
      numeralEmbedStem: numeral.terms[0]?.stem || "",
      measureMatrixStem: numeral.matrixStem,
      measureMatrixClass: normalizeNounClass(source.measureClass),
      selectedMeaning: measureMeaning,
      availableMeanings: Object.freeze(["amount", "length"]),
      meaningChoiceRequired: source.measureMeaningSettledByTypedSource !== true,
      compoundRelation: "numeral-embed-plus-measure-matrix",
      compatibleTypedMeasureSourcesAreOpen: true,
      exampleMeasureMembershipRequired: false,
      exampleMeasuresAuthorizeRoute: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    })
    : null;
  const compoundInternalPlural = numeral.compoundRightmostResultFrame
    ?.operationFrame?.numeralStemFormationFrame?.internalPluralMorph;
  const internalPluralMorph = compoundInternalPlural && compoundInternalPlural !== "none"
    ? compoundInternalPlural : countKind === "ordinary"
    && plural
    && classifier === "basic"
    && sourceProfile?.pluralStemFormationKind === "internal-plural"
    ? sourceProfile.internalPluralMorph
    : "none";
  const grossCountMorph = countKind === "gross"
    ? (classifier === "basic" ? sourceProfile?.grossCountMorph : "ix") || "ix"
    : "none";
  const requiredDerivationalConstituents = [
    ...(internalPluralMorph === "none" ? [] : [internalPluralMorph]),
    ...(grossCountMorph === "none" ? [] : [grossCountMorph]),
  ];
  const retainedDerivationalConstituents = requiredDerivationalConstituents
    .every(morph => preReduplicationStem.endsWith(`-${morph}`)
      && stem.endsWith(`-${morph}`));
  const conditionedNasal = countKind === "ordinary"
    && classifier === "basic"
    && sourceProfile?.pluralStemFormationKind === "conditioned-nasal"
    && reduplication === "none";
  // Retain the already generated free form before the plural subject
  // conditions cem. Do not replay that subject or strip derivational n/ix.
  const citationStem = conditionedNasal ? numeral.stem : stem;
  const numeralStemFormationFrame = deepFreeze({
    kind: "classical-nahuatl-cardinal-numeral-stem-formation-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    value,
    classifier,
    countKind,
    preInflectionStem: cobCanonicalResult
      ? cobCanonicalResult.nncSlotFrame.slots.predicate.stem
      : numeral.stem,
    preReduplicationStem,
    derivedStem: stem,
    nounClass,
    internalPluralMorph,
    internalPluralBelongsTo: "predicate-stem-derivation",
    internalPluralIsSubjectNumberConnector: false,
    grossCount: countKind === "gross",
    grossCountMorph,
    reduplication,
    reduplicationFrame,
    conjunctionFrame,
    classifierFrame,
    measureFrame,
    cobPreteritAgentiveResultFrame,
    cobGrossFormationFrame,
    cobGrossConjunctionFrame,
    canonicalConjunctSourceFrames,
    requiredDerivationalConstituents,
    retainedDerivationalConstituents,
    citationStem,
    stemProjectionAction: cobCanonicalResult
      ? (reduplication === "none"
        ? "retain-preterit-agentive-restricted-stem"
        : "retain-reduplicated-preterit-agentive-numeral-stem")
      : conditionedNasal && citationStem !== stem
      ? "restore-unconditioned-free-one-stem"
      : "retain-derived-cardinal-stem",
    citationNumberConstraint: countKind === "gross"
      || internalPluralMorph !== "none"
      ? "plural-only"
      : "class-governed",
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  const sourceFrame = deepFreeze({
    kind: "classical-nahuatl-cardinal-nominal-source-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    value,
    countKind,
    classifier,
    animacy,
    state,
    ordinaryNumberVariant,
    availableOrdinaryNumberVariants,
    vigesimalOrders: numeral.terms.map(term => term.order),
    terms: numeral.terms,
    numeralSourceAnalysisFrame: buildNumeralSourceAnalysisFrame({
      value,
      countKind,
      classifier,
      embedded: classifier !== "basic",
      following: classifier !== "basic" ? numeral.matrixStem : "",
      requestedVariant: request.numeralVariant || source.numeralVariant || "",
      selectedStem: stem,
      compatibleClassifiers,
      terms: numeral.terms,
      grossPossessiveFrame,
      conjunctionFrame,
      classifierFrame,
    }),
    numeralStemFormationFrame,
    cobPreteritAgentiveResultFrame,
    cobGrossFormationFrame,
    cobGrossConjunctionFrame,
    canonicalConjunctSourceFrames,
    conjunctionFrame,
    classifierFrame,
    reduplicationFrame,
    measureFrame,
    measureComposition: normalizeKey(request.measureComposition || "measure-only"),
    measuredStem: normalizeStem(source.measuredStem),
    measuredClass: normalizeNounClass(source.measuredClass),
  });
  let num1 = "0";
  let num2 = "0";
  let ruleId = "cardinal-nominal-ordinary-common-number";
  if (countKind === "gross") {
    if (
      state === "possessive"
      && grossPossessorKind === "nonanimate"
      && grossPossessiveNumberVariant === "ti"
    ) {
      num1 = "ti";
      num2 = "0";
      ruleId = "cardinal-nominal-gross-possessive-nonanimate-ti-zero";
    } else {
      num1 = "t";
      num2 = "in";
      ruleId = "cardinal-nominal-gross-count-plural-t-in";
    }
  } else if (plural && classifier === "rock") {
    num1 = "m";
    num2 = "eh";
    ruleId = "cardinal-nominal-rock-ordinary-plural-m-eh";
  } else if (reduplicatedOnePlural && ordinaryNumberVariant === "tin") {
    num1 = "t";
    num2 = "in";
    ruleId = "cardinal-nominal-reduplicated-one-plural-t-in";
  } else if (plural && value === 1 && classifier === "basic") {
    num1 = "m";
    num2 = "eh";
    ruleId = "cardinal-nominal-one-plural-m-eh";
  } else if (plural && ordinaryNumberVariant === "zero" && !separatedPronominalRightward) {
    ruleId = "cardinal-nominal-ordinary-plural-zero-zero";
  } else if (plural) {
    num1 = "t";
    num2 = "in";
    ruleId = "cardinal-nominal-animate-ordinary-plural-t-in";
  } else if (nounClass === "tl") {
    num1 = "tl";
    num2 = "0";
    ruleId = "cardinal-nominal-singular-common-tl";
  } else if (nounClass === "tli") {
    num1 = finalSound(stem) === "l" ? "li" : "tli";
    num2 = "0";
    ruleId = "cardinal-nominal-singular-common-tli";
  }
  // §34.14 numeral reduplication acts on the nounstem. It does not replace
  // the §35.3 preterit-agentive number analysis with a cardinal t-in/tl dyad.
  const numberFrameOverride = cobCanonicalResult
    ? (reduplication === "none"
      ? cobCanonicalResult.numberFrame
      : deepFreeze({ ...cobCanonicalResult.numberFrame, stem }))
    : buildCustomNumberFrame({
    subject,
    stem,
    nounClass,
    num1,
    num2,
    animacy,
    ruleId,
    nounClassApplicability: cobGrossFormationFrame || cobGrossConjunctionFrame
      ? "not-applicable-plural-only-totality" : "ordinary-class",
  });
  const targetResult = cobCanonicalResult && reduplication === "none"
    ? cobCanonicalResult
    : buildNncTarget({
    target,
    constructionFamily: "cardinal-nominal",
    sourceFrame,
    stem,
    nounClass,
    subject,
    state,
    possessor,
    animacy: countKind === "gross" ? "animate" : animacy,
    numberFrameOverride,
    predicateStructureFrame: cobGrossConjunctionFrame || numeral.downgradedConjunctionFrame,
    operationIds: ["cardinal-nominal-cardinal-nnc", `cardinal-nominal-${countKind}`, `cardinal-nominal-classifier-${classifier}`],
    sentenceModifier: modifierSurface,
  });
  const cobNumeralFrame = cobCanonicalResult
    ? deepFreeze({
      kind: "classical-nahuatl-cob-numeral-preterit-agentive-frame",
      version: VERSION,
      authorizationStatus: targetResult.authorizationStatus,
      canonicalPreteritAgentiveResultFrame: cobPreteritAgentiveResultFrame,
      canonicalPreteritNncResultFrame: cobCanonicalResult,
      canonicalPreteritSlotFrame: cobCanonicalResult.nncSlotFrame,
      canonicalSelectedNncResultFrame: targetResult,
      canonicalSelectedSlotFrame: targetResult.nncSlotFrame,
      canonicalPreteritNumberFrame: cobCanonicalResult.numberFrame,
      sourcePredicateStem: cobCanonicalResult.nncSlotFrame.slots.predicate.stem,
      selectedPredicateStem: stem,
      nounClass,
      subject,
      animacy,
      countKind,
      numeralValue: value,
      principalNumeralValue: 20,
      reduplication,
      reduplicationFrame,
      numeralStemFormationFrame,
      conjunctionFrame,
      selectedNumberFrame: targetResult.numberFrame,
      numberAnalysisPreserved: true,
      preteritResultRebuiltAsOrdinaryNoun: false,
      sourceAgreementChanged: false,
      selectedResultRole: conjunctionFrame.conjoined
        ? "first-conjunct" : "complete-numeral-nnc",
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    })
    : null;
  const conjunctionCaptureFrame = conjunctionFrame.conjoined
    ? deepFreeze({
      kind: "classical-nahuatl-cardinal-conjunction-capture-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      principalResult: targetResult.nncSlotFrame,
      conjunctResults: Object.freeze(
        conjunctionFrame.conjuncts.map((conjunct, index) => {
          if (index === 0 && cobNumeralFrame) {
            return deepFreeze({
              rank: 1,
              role: conjunct.relation,
              value: conjunct.value,
              canonicalResult: targetResult.nncSlotFrame,
              canonicalNncResultFrame: targetResult,
              canonicalPreteritAgentiveResultFrame: cobPreteritAgentiveResultFrame,
              formulaRealization: targetResult.formulaRealization,
              wordSurface: targetResult.wordSurface,
              formulaStringAuthority: false,
              surfaceStringAuthority: false,
            });
          }
          if (index > 0 && numeral.terms[index - 1].order >= 400) {
            const link = normalizeKey(source.higherOrderLink || "īpan");
            const linkResult = target.requestClassicalRelationalNncResult?.({
              nounstem: {kind: "classical-nahuatl-nnc-nounstem-request",
                stemId: link === "īpan" ? "pan-surface-time" : "huan-company",
                formation: "option-one", operation: "relational-nnc", sourceKind: "possessor"},
              subjectMode: "adverbialized", state: "possessive", possessorId: "3sg",
            });
            const numberResult = evaluateNominalConstruction({
              constructionKind: "cardinal-numeral-nnc", value: conjunct.value,
              classifier: "basic", countKind, state: "absolutive", subject, animacy,
            }, target);
            if (!target.isClassicalNahuatlRelationalResult?.(linkResult)
              || numberResult.authorizationStatus !== "authorized") {
              return {authorizationStatus: "blocked", blockReason: "higher-order-issued-relational-link-required"};
            }
            return deepFreeze({rank: index + 1, role: conjunct.relation, value: conjunct.value,
              higherOrderLinkResultFrame: linkResult, canonicalNumeralResultFrame: numberResult,
              canonicalResult: numberResult.canonicalResult.nncSlotFrame,
              formulaRealization: `${linkResult.formula} ${numberResult.formulaRealization}`,
              wordSurface: `${linkResult.surface} ${numberResult.wordSurface}`,
              formulaStringAuthority: false, surfaceStringAuthority: false});
          }
          const canonicalNumeralResultFrame = canonicalConjunctSourceFrames[index];
          if (canonicalNumeralResultFrame) {
            const child = canonicalNumeralResultFrame.canonicalResult;
            const sourcePredicateStem = child.nncSlotFrame.slots.predicate.stem;
            const selectedPredicateStem = conjunct.realizedStem;
            const conjunctResult = buildNncTarget({
              target,
              constructionFamily: "cardinal-conjunction-member",
              sourceFrame,
              stem: selectedPredicateStem,
              nounClass: child.nncSlotFrame.nounClass,
              subject,
              state: "absolutive",
              animacy,
              numberFrameOverride: deepFreeze({ ...child.numberFrame, stem: selectedPredicateStem }),
              operationIds: ["cardinal-numeral-conjunction", "cardinal-numeral-rightward-conjunct"],
            });
            return deepFreeze({
              rank: index + 1,
              role: conjunct.relation,
              value: conjunct.value,
              canonicalNumeralResultFrame,
              canonicalNncResultFrame: conjunctResult,
              canonicalResult: conjunctResult.nncSlotFrame,
              numeralStemFormationFrame: canonicalNumeralResultFrame.operationFrame.numeralStemFormationFrame,
              additionalNumberFrame: {
                kind: "classical-nahuatl-cardinal-additional-number-frame",
                authorizationStatus: conjunctResult.authorizationStatus,
                canonicalNumeralResultFrame,
                sourcePredicateStem,
                selectedPredicateStem,
                additionalNumberStem: "om",
                prefix: additionalNumberLink(sourcePredicateStem),
                numberAnalysisPreserved: true,
                sourceAgreementChanged: false,
                formulaStringAuthority: false,
                surfaceStringAuthority: false,
              },
              formulaRealization: conjunctResult.formulaRealization,
              wordSurface: conjunctResult.wordSurface,
              formulaStringAuthority: false,
              surfaceStringAuthority: false,
            });
          }
          const conjunctClass = index === 0 && classifier !== "basic"
            ? (["rock", "cob"].includes(classifier)
              && !(classifier === "cob" && conjunct.sourceStem === "tlamic")
              ? "tl"
              : "tli")
            : ([1, 2, 3, 4, 6, 7, 8, 9].includes(conjunct.value)
              ? "zero"
              : "tli");
          const conjunctResult = buildNncTarget({
            target,
            constructionFamily: "cardinal-conjunction-member",
            sourceFrame,
            stem: conjunct.realizedStem,
            nounClass: conjunctClass,
            subject,
            state: "absolutive",
            animacy,
            operationIds: [
              "cardinal-numeral-conjunction",
              index === 0
                ? "cardinal-numeral-higher-conjunct"
                : "cardinal-numeral-rightward-conjunct",
            ],
          });
          return deepFreeze({
            rank: index + 1,
            role: conjunct.relation,
            value: conjunct.value,
            canonicalResult: conjunctResult.nncSlotFrame,
            formulaRealization: conjunctResult.formulaRealization,
            wordSurface: conjunctResult.wordSurface,
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
          });
        })
      ),
      ownerIssuedResultsRequired: true,
      copiedOrStringResultsAccepted: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    })
    : null;
  const supplementationClauseEnvelope = null;
  const numeralModifierFrame = modifier === "none"
    ? null
    : deepFreeze({
      kind: "classical-nahuatl-cardinal-modifier-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      modifier,
      modifierSurface,
      position: "before-complete-numeral-nnc",
      meaning: ({
        canah: "approximately-more-or-less",
        quēn: "approximately-more-or-less",
        "ahzo-quēn": "perhaps-approximately-more-or-less",
        oc: "another-or-more",
      })[modifier],
      completeOcCeClause: modifier === "oc" && value === 1,
      supplementarySubjectEligible: Boolean(
        supplementationClauseEnvelope?.authorizationStatus === "authorized"
      ),
      canonicalSupplementationClauseEnvelope:
        supplementationClauseEnvelope || null,
      englishElseExpressionsAuthorizeGrammar: false,
      exampleSentencesAuthorizeRoute: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  const measureComposition = normalizeKey(request.measureComposition || "measure-only");
  if (!["measure-only", "with-measured-nnc"].includes(measureComposition)) {
    return buildBlockedFrame("cardinal-numeral-nnc", "recognized-measure-composition-required", request);
  }
  if (measureComposition === "with-measured-nnc" && classifier !== "measure") {
    return buildBlockedFrame("cardinal-numeral-nnc", "measured-nnc-composition-requires-measure-classifier", request);
  }
  let adjectivalModificationFrame = null;
  let formulaRealization = targetResult.formulaRealization;
  let wordSurface = targetResult.wordSurface;
  let sentenceSurface = targetResult.sentenceSurface;
  if (cobNumeralFrame && modifierSurface) {
    sentenceSurface = `${modifierSurface} ${targetResult.wordSurface}.`;
  }
  if (conjunctionCaptureFrame
    && conjunctionFrame.selectedForm === "separate") {
    formulaRealization = conjunctionCaptureFrame.conjunctResults
      .map(conjunct => conjunct.formulaRealization)
      .join(" ");
    wordSurface = conjunctionCaptureFrame.conjunctResults
      .map(conjunct => conjunct.wordSurface)
      .join(" ");
    const writtenSentence = `${modifierSurface ? `${modifierSurface} ` : ""}${wordSurface}`;
    sentenceSurface = `${writtenSentence.charAt(0).toUpperCase()}${writtenSentence.slice(1)}.`;
  }
  if (measureComposition === "with-measured-nnc") {
    const measuredStem = normalizeStem(source.measuredStem);
    const measuredClass = normalizeNounClass(source.measuredClass);
    if (!measuredStem || !measuredClass) {
      return buildBlockedFrame("cardinal-numeral-nnc", "measure-composition-requires-measured-nnc-stem-and-class", request);
    }
    const measuredSourceFrame = deepFreeze({
      kind: "classical-nahuatl-cardinal-nominal-source-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      constructionRole: "thing-measured",
      measuredStem,
      measuredClass,
    });
    const measuredResult = buildNncTarget({
      target,
      constructionFamily: "cardinal-measured-nominal",
      sourceFrame: measuredSourceFrame,
      stem: measuredStem,
      nounClass: measuredClass,
      subject: "3common",
      state: "absolutive",
      animacy: "nonanimate",
      operationIds: ["cardinal-nominal-measured-nnc", "adjectival-modification-modifier"],
    });
    if (targetResult.authorizationStatus !== "authorized" || measuredResult.authorizationStatus !== "authorized") {
      return buildBlockedFrame("cardinal-numeral-nnc", targetResult.blockReason || measuredResult.blockReason || "measure-adjectival-modification-component-blocked", request);
    }
    adjectivalModificationFrame = deepFreeze({
      kind: "classical-nahuatl-cardinal-measure-modification-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      relation: "adjectival-modification",
      principalClauseRole: "measure-nnc",
      modifierClauseRole: "thing-measured-nnc",
      principalNncResult: targetResult,
      measuredNncResult: measuredResult,
      principalNncSlotFrame: targetResult.nncSlotFrame,
      measuredNncSlotFrame: measuredResult.nncSlotFrame,
      measureSourceFrame: measureFrame,
      sharedReferent: true,
      measureIsPrincipal: true,
      ownerIssuedComponentsRequired: true,
      copiedOrStringComponentsAccepted: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    formulaRealization = `${targetResult.formulaRealization} ${measuredResult.formulaRealization}`;
    sentenceSurface = `${targetResult.wordSurface} ${measuredResult.wordSurface}.`;
  }
  const appliedSemanticRules = new Set([
    "numeral/base",
    "numeral/count-kind",
    "numeral/number-gate",
  ]);
  if (classifier === "basic") appliedSemanticRules.add("numeral/basic-set");
  if (value === 1) appliedSemanticRules.add("numeral/one");
  if ([2, 3, 4].includes(value)) appliedSemanticRules.add("numeral/two-four");
  if (value === 4) appliedSemanticRules.add("numeral/four-boundary");
  if (value === 5) appliedSemanticRules.add("numeral/five");
  if ([6, 7, 8, 9].includes(value)) appliedSemanticRules.add("numeral/six-nine");
  if ([10, 15].includes(value)) appliedSemanticRules.add("numeral/ten-fifteen");
  if (state === "possessive") appliedSemanticRules.add("numeral/gross-possessive");
  if (numeral.terms.some(term => term.order === 20)) appliedSemanticRules.add("numeral/order-20");
  if (numeral.terms.some(term => term.order === 400)) appliedSemanticRules.add("numeral/order-400");
  if (numeral.terms.some(term => term.order === 8000)) appliedSemanticRules.add("numeral/order-8000");
  const conjoined = numeral.terms.length > 1 || (value >= 11 && value <= 19);
  if (conjoined) {
    appliedSemanticRules.add("numeral/conjunction");
    appliedSemanticRules.add("numeral/conjunction-agreement");
    appliedSemanticRules.add("numeral/conjunction-restriction");
  }
  if (normalizeKey(source.conjunctionForm) === "compound") {
    appliedSemanticRules.add("numeral/conjunctive-compound");
  }
  if (numeral.terms.some(term => term.order > 1 && term.multiplier >= 11)) {
    appliedSemanticRules.add("numeral/downgraded-multiplier");
  }
  if (numeral.terms.length > 1 && numeral.terms[0]?.order >= 400) {
    appliedSemanticRules.add("numeral/higher-order-link");
  }
  const classifierRule = ({
    rock: "numeral/classifier-rock",
    row: "numeral/classifier-row",
    thing: "numeral/classifier-thing",
    cob: "numeral/classifier-cob",
    tecpan: "numeral/twenty-classifier-tecpan",
    ipil: "numeral/twenty-classifier-ipil",
    quimil: "numeral/twenty-classifier-quimil",
    measure: "numeral/measure",
  })[classifier];
  if (classifierRule) appliedSemanticRules.add(classifierRule);
  if (source.classifierSelectionExplicit === true) appliedSemanticRules.add("numeral/classifier-selection");
  if (source.classifierEmbeddedIn === "nnc" || source.classifierEmbeddedIn === "vnc") {
    appliedSemanticRules.add("numeral/classifier-recursion");
  }
  if (reduplication !== "none") {
    appliedSemanticRules.add("numeral/reduplication");
    if ([7, 8, 9, 10].includes(value)) appliedSemanticRules.add("numeral/reduplication-exception");
    if (conjoined) appliedSemanticRules.add("numeral/conjunction-reduplication");
  }
  if (modifier !== "none") appliedSemanticRules.add("numeral/modifier");
  if (measureComposition === "with-measured-nnc") {
    appliedSemanticRules.add("sentence/adjectival-modification");
  }
  return deepFreeze({
    kind: "classical-nahuatl-nominal-construction-result-frame",
    version: VERSION,
    constructionFamily: "cardinal-numeral-nnc",
    authorizationStatus: targetResult.authorizationStatus,
    blockReason: targetResult.blockReason,
    sourceFrame,
    operationFrame: {
      kind: "classical-nahuatl-cardinal-nominal-operation-frame",
      version: VERSION,
      authorizationStatus: "authorized",
      value,
      countKind,
      classifier,
      stem,
      nounClass,
      numeralSourceAnalysisFrame: sourceFrame.numeralSourceAnalysisFrame,
      numeralStemFormationFrame,
      grossPossessiveFrame,
      conjunctionFrame,
      classifierFrame,
      conjunctionCaptureFrame,
      downgradedConjunctionFrame: numeral.downgradedConjunctionFrame || null,
      compoundRightmostResultFrame: numeral.compoundRightmostResultFrame || null,
      reduplicationFrame,
      numeralModifierFrame,
      measureFrame,
      reduplication,
      modifier,
      conjunctionDirection: numeral.terms.length > 1 ? "higher-to-lower" : "not-applicable",
      sameMatrixConjunctionAllowed: false,
      rightConjunctRepeatsClassifier: false,
      restrictions: numeral.restrictions,
      cobPreteritAgentiveResultFrame:
        numeral.cobPreteritAgentiveResultFrame || null,
      cobNumeralFrame,
      cobGrossFormationFrame,
      cobGrossConjunctionFrame,
      canonicalConjunctSourceFrames,
      appliedSemanticRules: Object.freeze([...appliedSemanticRules]),
      measureComposition,
      adjectivalModificationFrame,
      formulaStringAuthority: false,
    },
    canonicalTargetEvaluator: cobNumeralFrame
      ? (reduplication === "none"
        ? "exact-preterit-agentive-nnc-result"
        : "typed-numeral-reduplication-with-preterit-number-analysis")
      : "buildClassicalNahuatlNncSlotFrame",
    canonicalResult: targetResult,
    formulaRealization,
    wordSurface,
    sentenceSurface,
    typedFrameAuthority: true,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function buildClassicalNahuatlNominalConstructionTypedSourceFrame(source = {}, target = globalThis) {
  if (source && typeof source === "object" && !Array.isArray(source)
    && Reflect.ownKeys(source).length === 1 && Object.hasOwn(source,"value")) {
    const descriptor = Object.getOwnPropertyDescriptor(source,"value");
    const value = descriptor && Object.hasOwn(descriptor,"value") ? descriptor.value : null;
    if (!Number.isSafeInteger(value) || !decomposeVigesimal(value).length) return null;
    if (CARDINAL_NUMERIC_SOURCE_CACHE.has(value)) return CARDINAL_NUMERIC_SOURCE_CACHE.get(value);
    const frame = deepFreeze({kind:"classical-nahuatl-cardinal-numeric-source-frame",version:VERSION,
      authorizationStatus:"authorized",value,sourceRank:"cardinal-number",sourceInputMode:"positive-integer",
      standaloneNncAuthorized:false,ordinaryNounParadigmAuthorized:false,sourceStringAuthority:false,
      callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false});
    CARDINAL_NUMERIC_SOURCE_FRAMES.add(frame);CARDINAL_NUMERIC_SOURCE_CACHE.set(value,frame);return frame;
  }
  if (!source || typeof source !== "object" || Array.isArray(source)
    || Reflect.ownKeys(source).some(key => !["stem", "embedStem", "matrixStem", "sourceClass", "supportiveInitialI"].includes(key))) return null;
  const supportive = Object.getOwnPropertyDescriptor(source,"supportiveInitialI");
  if (supportive && (!Object.hasOwn(supportive,"value") || supportive.value !== false)) return null;
  for (const key of ["stem", "embedStem", "matrixStem", "sourceClass"]) {
    const d = Object.getOwnPropertyDescriptor(source, key);
    if (!d || !Object.hasOwn(d,"value") || typeof d.value !== "string") return null;
  }
  const stem = normalizeStem(source.stem), embedStem = normalizeStem(source.embedStem), matrixStem = normalizeStem(source.matrixStem);
  const sourceClass = normalizeKey(source.sourceClass);
  if (!stem || !embedStem || !matrixStem || stem !== `${embedStem}-${matrixStem}`
    || [source.stem,source.embedStem,source.matrixStem].some(value => /[()[\]{}#>+=□]/u.test(value))
    || !["tl","tli"].includes(sourceClass)) return null;
  const knownMatrix = target.buildClassicalNahuatlOrdinaryNncSourceFrame?.({stem:matrixStem});
  if (target.isClassicalNahuatlOrdinaryNncSourceFrame?.(knownMatrix) === true
    && knownMatrix.nounClass !== sourceClass) return null;
  const matrixSourceClassFrame = deepFreeze({kind:"classical-nahuatl-compound-matrix-source-class-frame",version:VERSION,
    authorizationStatus:"authorized",...getCompoundEmbedSourceClassAnalysis(sourceClass),
    sourceAuthority:"typed-open-nnc-source",productiveRouteAuthority:false,documentaryExampleAuthority:false});
  const frame = deepFreeze({kind:"classical-nahuatl-nominal-compound-typed-source-frame",version:VERSION,
    familyId:"nominal-compound-source",authorizationStatus:"authorized",blockReason:"",stem,embedStem,matrixStem,
    sourceClass,nounClass:matrixSourceClassFrame.nounClass,subclass:"",matrixSourceClassFrame,
    compoundSource:true,sourceConstituents:[embedStem,matrixStem],sourceConstituentKinds:["analyzed-embed","nounstem-matrix"],
    allowedStateValues:["absolutive"],referentialAnimacy:"any",embedClassClaimed:false,
    standaloneNncAuthorized:false,classDependentInflectionAuthorized:false,typedSourceAuthority:true,
    callerSuppliedAuthorityAccepted:false,formulaStringAuthority:false,surfaceStringAuthority:false});
  ISSUED_RAW_COMPOUND_SOURCE_FRAMES.add(frame);
  return frame;
}

function isClassicalNahuatlNominalConstructionTypedSourceFrame(
  frame = null,
  target = globalThis
) {
  if (CARDINAL_NUMERIC_SOURCE_FRAMES.has(frame)) return Object.isFrozen(frame)
    && frame.kind === "classical-nahuatl-cardinal-numeric-source-frame" && frame.authorizationStatus === "authorized";
  if (ISSUED_RAW_COMPOUND_SOURCE_FRAMES.has(frame)) return Object.isFrozen(frame)
    && frame.kind === "classical-nahuatl-nominal-compound-typed-source-frame"
    && frame.authorizationStatus === "authorized" && frame.embedClassClaimed === false;
  let ownerIssuedOrdinarySource = false;
  try {
    ownerIssuedOrdinarySource = Boolean(
      frame
      && typeof target.isClassicalNahuatlOrdinaryNncSourceFrame === "function"
      && target.isClassicalNahuatlOrdinaryNncSourceFrame(frame) === true
    );
  } catch {
    ownerIssuedOrdinarySource = false;
  }
  return Boolean(
    ownerIssuedOrdinarySource
    && frame.authorizationStatus === "authorized"
    && frame.compoundSource === true
    && normalizeStem(frame.embedStem)
    && normalizeStem(frame.matrixStem)
    && Array.isArray(frame.sourceConstituents)
    && frame.sourceConstituents.length === 2
    && normalizeStem(frame.sourceConstituents[0])
      === normalizeStem(frame.embedStem)
    && normalizeStem(frame.sourceConstituents[1])
      === normalizeStem(frame.matrixStem)
    && Array.isArray(frame.sourceConstituentKinds)
    && frame.sourceConstituentKinds.length === 2
    && frame.sourceConstituentKinds[0] === "nounstem-embed"
    && frame.sourceConstituentKinds[1] === "nounstem-matrix"
    && Object.isFrozen(frame)
  );
}

function freezeNominalCompoundTypedSourceSelections(selections = {}) {
  if (
    !selections
    || typeof selections !== "object"
    || Array.isArray(selections)
  ) return null;
  const allowed = new Set(NOMINAL_COMPOUND_TYPED_SOURCE_SELECTION_FIELDS);
  const entries = [];
  for (const key of Reflect.ownKeys(selections)) {
    if (typeof key !== "string" || !allowed.has(key)) return null;
    let descriptor = null;
    try {
      descriptor = Object.getOwnPropertyDescriptor(selections, key);
    } catch {
      return null;
    }
    if (
      !descriptor
      || !Object.prototype.hasOwnProperty.call(descriptor, "value")
      || typeof descriptor.value !== "string"
    ) return null;
    entries.push([key, normalizeToken(descriptor.value)]);
  }
  return Object.freeze(Object.fromEntries(entries));
}

function buildNominalCompoundTypedSourceOwnerRequest(
  exactSourceFrame = null,
  selections = {}
) {
  const embedSourceClass = normalizeKey(selections.embedSourceClass);
  const embedUse = normalizeKey(selections.embedUse || "nounstem");
  const compoundForm = embedUse === "compound-form";
  const embedAnalysis = normalizeKey(selections.embedAnalysis || "ordinary");
  if (!["ordinary", "marked-final-a-loss", "glottalized-long-vowel", "unexpected-variant"].includes(embedAnalysis)) return null;
  const embedClassAnalysis = getCompoundEmbedSourceClassAnalysis(
    embedSourceClass
  );
  const matrixSourceClass = normalizeKey(
    exactSourceFrame?.sourceClass || exactSourceFrame?.nounClass
  );
  const matrixClassAnalysis = getCompoundEmbedSourceClassAnalysis(
    matrixSourceClass
  );
  if ((!embedClassAnalysis && !compoundForm) || !matrixClassAnalysis
    || !["nounstem","compound-form"].includes(embedUse)
    || compoundForm && (embedSourceClass || !ISSUED_RAW_COMPOUND_SOURCE_FRAMES.has(exactSourceFrame))) return null;
  const sourceStateOptions = Array.isArray(exactSourceFrame.allowedStateValues)
    ? exactSourceFrame.allowedStateValues
    : [];
  const state = normalizeKey(
    selections.state
    || (sourceStateOptions.includes("absolutive")
      ? "absolutive"
      : sourceStateOptions[0])
    || "absolutive"
  );
  if (ISSUED_RAW_COMPOUND_SOURCE_FRAMES.has(exactSourceFrame) && state !== "absolutive") return null;
  const subject = normalizeSubject(
    selections.subject
    || (exactSourceFrame.referentialAnimacy === "nonanimate"
      ? "3common"
      : "3sg")
  );
  const animacy = normalizeKey(
    selections.animacy
    || (exactSourceFrame.referentialAnimacy === "nonanimate"
      ? "nonanimate"
      : "animate")
  );
  const structure = normalizeKey(selections.structure || "integrated");
  const request = {
    constructionKind: "compound-nnc",
    structure,
    embedRole: normalizeKey(selections.embedRole || "association"),
    possessorOrientation: normalizeKey(
      selections.possessorOrientation
      || (structure.startsWith("linked") ? "embed" : "matrix")
    ),
    reduplication: normalizeKey(selections.reduplication || "none"),
    reduplicationTarget: normalizeKey(
      selections.reduplicationTarget || "embed"
    ),
    bracketing: normalizeKey(selections.bracketing || "unambiguous"),
    subject,
    state,
    possessor: normalizeKey(selections.possessor || "3sg"),
    animacy,
    pluralConnector: normalizeKey(
      selections.pluralConnector
      || exactSourceFrame.pluralConnectorOptions?.[0]
      || "t-in"
    ),
    singularPossessiveConnector: normalizeKey(
      selections.singularPossessiveConnector || "0"
    ),
    source: {
      embedStem: normalizeStem(exactSourceFrame.embedStem),
      ...(compoundForm ? {compoundEmbedUseSource:{sourceStem:exactSourceFrame.embedStem,compoundUseStem:exactSourceFrame.embedStem}}
        : {embedClass:embedClassAnalysis.nounClass,embedSourceClass}),
      ...(ISSUED_RAW_COMPOUND_SOURCE_FRAMES.has(exactSourceFrame) ? {rawCompoundSourceFrame:exactSourceFrame} : {}),
      ...(embedAnalysis === "ordinary" ? {} : {compoundEmbedAnalysis:{
        lexicalStatus:"compound-embed-exception",sourceStem:exactSourceFrame.embedStem,
        exceptionKind:embedAnalysis,meaningCertainty:"known",
        sourceBoundaries:exactSourceFrame.embedStem.split("-").filter(Boolean),
        ...(embedAnalysis === "unexpected-variant" ? {variantStem:normalizeStem(selections.variantStem)} : {}),
      }}),
      matrixStem: normalizeStem(exactSourceFrame.matrixStem),
      matrixClass: matrixClassAnalysis.nounClass,
      matrixSourceClass,
      structure,
      embedRole: normalizeKey(selections.embedRole || "association"),
      bracketing: normalizeKey(selections.bracketing || "unambiguous"),
    },
  };
  return deepFreeze(request);
}

function projectNominalCompoundTypedSourceClassOptions(
  exactSourceFrame = null,
  selections = {},
  target = globalThis
) {
  return Object.freeze(["tl", "tli", ...Object.keys(
    NOMINAL_COMPOUND_EMBED_SOURCE_CLASS_ANALYSES
  )].map(optionId => {
    const request = buildNominalCompoundTypedSourceOwnerRequest(
      exactSourceFrame,
      { ...selections, embedSourceClass: optionId }
    );
    let probe = null;
    try {
      probe = request ? evaluateNominalConstruction(request, target) : null;
    } catch {
      probe = null;
    }
    const available = Boolean(
      probe
      && isClassicalNahuatlNominalConstructionResult(probe)
      && probe.authorizationStatus === "authorized"
      && probe.constructionKind === "compound-nnc"
    );
    return Object.freeze({
      choiceId: "embedSourceClass",
      optionId,
      label: optionId,
      availabilityStatus: available ? "available" : "incompatible",
      blockReason: available
        ? ""
        : String(probe?.blockReason || "compound-embed-source-class-blocked"),
      ownerOptionProjected: true,
      ownerOptionAuthority: false,
      grammarAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }));
}

function issueCardinalNumericSourceBinding(exactSourceFrame, callerSelections, target) {
  const domains = {
    countKind:["ordinary","gross"], classifier:CARDINAL_NOMINAL_CLASSIFIERS,
    animacy:["animate","nonanimate"], subject:["1sg","2sg","3sg","1pl","2pl","3pl","3common"],
    conjunctionForm:["separate","compound"], modifier:["none","oc","canah","quēn","ahzo-quēn"],
    state:["absolutive","possessive"], possessor:["1sg","2sg","3sg","1pl","2pl","3pl"],
    grossPossessorKind:["animate","nonanimate"], grossPossessiveNumberVariant:["tin","ti"],
    numeralVariant:["automatic","plain","initial-y","short","full","y-loss","y-retained","y-to-x"],
    ordinaryNumberVariant:["tin","zero"],
  };
  if (!callerSelections || typeof callerSelections !== "object" || Array.isArray(callerSelections)
    || Reflect.ownKeys(callerSelections).some(key=>typeof key !== "string" || !Object.hasOwn(domains,key)
      || !Object.hasOwn(Object.getOwnPropertyDescriptor(callerSelections,key),"value")
      || typeof callerSelections[key] !== "string")) return null;
  const selections = Object.freeze(Object.fromEntries(Object.entries(callerSelections).map(([key,value])=>[key,normalizeKey(value)])));
  if (Object.keys(selections).some(key=>!domains[key].includes(selections[key]))) return null;
  const grossPossessive = values => values.countKind === "gross" && values.state === "possessive";
  const ownerRequestFor = values => deepFreeze({
    constructionKind:"cardinal-numeral-nnc", value:exactSourceFrame.value,
    countKind:values.countKind || "ordinary", classifier:values.classifier || "basic", animacy:values.animacy || "nonanimate",
    subject:values.subject || (values.countKind === "gross" ? "3pl" : values.animacy === "animate" ? "3sg" : "3common"),
    state:values.state || "absolutive", numeralOutputKind:"nnc", reduplication:"none", modifier:values.modifier || "none",
    ordinaryNumberVariant:values.ordinaryNumberVariant || "tin",
    ...(grossPossessive(values) ? {possessor:values.possessor || (values.grossPossessorKind === "nonanimate" ? "3sg" : "3pl")} : {}),
    source:{conjunctionForm:values.conjunctionForm || "separate", numeralVariant:values.numeralVariant || "",
      ...(grossPossessive(values) ? {
        grossPossessorKind:values.grossPossessorKind || "animate",
        grossPossessiveNumberVariant:values.grossPossessiveNumberVariant || "tin",
        // This choice is explicitly labelled "nonanimate plural referent".
        // It is a contextual declaration, not inference from a common morph.
        possessorReferentPlural:values.grossPossessorKind === "nonanimate",
      } : {}),
    },
  });
  const probe = values => {try{return evaluateNominalConstruction(ownerRequestFor(values),target);}catch{return null;}};
  const required = ["countKind","classifier","animacy","subject"].filter(key=>!selections[key]);
  if (grossPossessive(selections)) {
    if (!selections.grossPossessorKind) required.push("grossPossessorKind");
    if (selections.grossPossessorKind === "animate" && !selections.possessor) required.push("possessor");
  }
  const requiredChoiceIds = Object.freeze(required);
  const ownerRequest = required.length ? null : ownerRequestFor(selections);
  const preflightResult = ownerRequest ? probe(selections) : null;
  const variantContext = {...selections};delete variantContext.numeralVariant;
  const analysis = probe(variantContext)?.sourceFrame;
  const fields = {
    countKind:domains.countKind, classifier:domains.classifier, animacy:domains.animacy, subject:domains.subject,
    conjunctionForm:domains.conjunctionForm, modifier:domains.modifier,
    state:selections.countKind === "gross" ? domains.state : ["absolutive"],
    ...(selections.countKind !== "gross" ? {
      numeralVariant:analysis?.numeralSourceAnalysisFrame?.availableVariants || [],
      ordinaryNumberVariant:analysis?.availableOrdinaryNumberVariants || [],
    } : {}),
    ...(grossPossessive(selections) ? {
      grossPossessorKind:domains.grossPossessorKind,
      ...(selections.grossPossessorKind ? {
        possessor:selections.grossPossessorKind === "nonanimate" ? ["3sg"] : ["1pl","2pl","3pl"],
        grossPossessiveNumberVariant:selections.grossPossessorKind === "nonanimate" ? ["tin","ti"] : ["tin"],
      } : {}),
    } : {}),
  };
  const dependencies = {
    countKind:["state","subject","ordinaryNumberVariant","grossPossessorKind","possessor","grossPossessiveNumberVariant"],
    classifier:["numeralVariant","ordinaryNumberVariant","conjunctionForm"],
    state:["grossPossessorKind","possessor","grossPossessiveNumberVariant"],
    grossPossessorKind:["possessor","grossPossessiveNumberVariant"],
    animacy:["subject","ordinaryNumberVariant"], subject:["ordinaryNumberVariant"],
    conjunctionForm:["ordinaryNumberVariant"],
  };
  const blockedDescendant = {
    "cardinal-numeral-nnc-is-absolutive-only-except-gross-count":"state",
    "gross-count-requires-plural-subject":"subject",
    "ordinary-nonanimate-count-requires-common-number-subject":"subject",
    "ordinary-animate-count-requires-singular-or-plural-subject":"subject",
    "gross-possessive-animate-possessor-must-be-plural":"possessor",
    "gross-possessive-nonanimate-possessor-requires-third-person-common-number":"possessor",
    "gross-possessive-ti-variant-requires-nonanimate-possessor":"grossPossessiveNumberVariant",
    "ordinary-cardinal-number-variant-not-licensed":"ordinaryNumberVariant",
    "numeral-source-variant-not-licensed-for-position":"numeralVariant",
    "numeral-conjunctive-compound-not-licensed-for-selected-structure":"conjunctionForm",
  };
  const project = (choiceId,optionId) => {
    const candidate = {...selections,[choiceId]:optionId}, descendants = dependencies[choiceId] || [], cleared = [];
    let p;
    for (let attempt=0;attempt<=descendants.length;attempt++) {
      if (!grossPossessive(candidate)) for (const key of ["grossPossessorKind","possessor","grossPossessiveNumberVariant"])
        if (descendants.includes(key) && Object.hasOwn(candidate,key)) {delete candidate[key];cleared.push(key);}
      p=probe(candidate);
      if (p?.authorizationStatus === "authorized") break;
      const key=blockedDescendant[p?.blockReason];
      if (!descendants.includes(key) || !Object.hasOwn(candidate,key)) break;
      delete candidate[key];cleared.push(key);
    }
    const available=p?.authorizationStatus === "authorized";
    return Object.freeze({choiceId,optionId,
      label:choiceId === "grossPossessorKind" ? ({animate:"animate plural",nonanimate:"nonanimate plural referent"})[optionId]
        : choiceId === "grossPossessiveNumberVariant" ? ({tin:"tin · final n represented",ti:"ti · final n not represented"})[optionId] : optionId,
      availabilityStatus:available?"available":"incompatible",clearedChoiceIds:Object.freeze(available?[...new Set(cleared)]:[]),
      inventoryFieldRef:({countKind:"id:classical-cardinal-count-kind",classifier:"id:classical-cardinal-classifier",
        animacy:"id:classical-rule-logic-nnc-subject-animacy",subject:"id:classical-rule-logic-nnc-subject",
        conjunctionForm:"id:classical-cardinal-conjunction-form",modifier:"id:classical-cardinal-modifier",
        state:"id:classical-rule-logic-nnc-state",possessor:"id:classical-rule-logic-nnc-possessor",
        grossPossessorKind:"id:classical-cardinal-gross-possessor-kind",grossPossessiveNumberVariant:"id:classical-cardinal-gross-number-variant",
        numeralVariant:"id:classical-cardinal-numeral-variant",ordinaryNumberVariant:"id:classical-cardinal-ordinary-number-variant"})[choiceId],
      blockReason:available?"":p?.blockReason || "cardinal-numeric-selection-incompatible",ownerOptionProjected:true,
      ownerOptionAuthority:false,grammarAuthority:false,formulaStringAuthority:false,surfaceStringAuthority:false});
  };
  const choiceOptionProjection=Object.freeze({...Object.fromEntries(Object.entries(fields).map(([key,values])=>[key,Object.freeze(values.map(value=>project(key,value)))])),grammarAuthority:false});
  const ready = preflightResult?.authorizationStatus === "authorized";
  const bindingStatus = requiredChoiceIds.length ? "choices-required" : ready ? "ready" : "rejected";
  const frame = Object.freeze({kind:NOMINAL_COMPOUND_TYPED_SOURCE_BINDING_KIND,version:VERSION,
    authorizationStatus:bindingStatus === "rejected" ? "blocked":"authorized",bindingStatus,
    blockReason:bindingStatus === "ready" ? "" : requiredChoiceIds.length ? "cardinal-numeric-build-selections-required"
      : preflightResult?.blockReason || "cardinal-numeric-build-selections-not-authorized",
    operationId:"grammar:nominal-construction",exactSourceFrame,callerSelections:selections,
    effectiveSelections:Object.freeze({...selections,state:ownerRequest?.state || selections.state || "absolutive",numeralOutputKind:"nnc",
      ...(ownerRequest?.possessor ? {possessor:ownerRequest.possessor} : {})}),requiredChoiceIds,choiceOptionProjection,
    numeralSourceAnalysisFrame:preflightResult?.sourceFrame?.numeralSourceAnalysisFrame || null,
    executionArgs:Object.freeze(ready?[exactSourceFrame,selections]:[]),ownerChoicesRequired:requiredChoiceIds.length>0,
    operationSelectionRequired:requiredChoiceIds.length>0,ownerInputAcceptanceProven:true,ownerRejectionProven:false,
    exactSourceIdentityPreserved:true,ownerExecutionStillRequired:ready,ownerRequestRetainedPrivately:ready,
    sourceStringAuthority:false,formulaStringAuthority:false,surfaceStringAuthority:false,lessonMetadataAuthority:false,
    storedStateAuthority:false,grammarAuthority:false});
  ISSUED_TYPED_SOURCE_BINDING_FRAMES.add(frame);TYPED_SOURCE_BINDING_CONTEXTS.set(frame,Object.freeze({
    exactSourceFrame,ownerRequest:ready?ownerRequest:null,preflightResult,cardinalNumericSource:true}));return frame;
}

function issueClassicalNahuatlNominalConstructionTypedSourceBindingFrame(
  exactSourceFrame = null,
  callerSelections = {},
  target = globalThis
) {
  if (!isClassicalNahuatlNominalConstructionTypedSourceFrame(
    exactSourceFrame,
    target
  )) return null;
  if (CARDINAL_NUMERIC_SOURCE_FRAMES.has(exactSourceFrame)) return issueCardinalNumericSourceBinding(exactSourceFrame,callerSelections,target);
  const selections = freezeNominalCompoundTypedSourceSelections(
    callerSelections
  );
  if (!selections) return null;
  const embedSourceClass = normalizeKey(selections.embedSourceClass);
  const rawSource = ISSUED_RAW_COMPOUND_SOURCE_FRAMES.has(exactSourceFrame);
  const embedUse = normalizeKey(selections.embedUse || (rawSource ? "" : "nounstem"));
  const classOptions = projectNominalCompoundTypedSourceClassOptions(
    exactSourceFrame,
    selections,
    target
  );
  const selectedClassOption = embedSourceClass
    ? classOptions.find(option => option.optionId === embedSourceClass) || null
    : null;
  const requiredChoiceIds = Object.freeze(!embedUse ? ["embedUse"]
    : embedUse === "nounstem" && !embedSourceClass ? ["embedSourceClass"] : []);
  const ownerRequest = embedUse === "compound-form"
    ? buildNominalCompoundTypedSourceOwnerRequest(exactSourceFrame,selections)
    : embedSourceClass
    && selectedClassOption?.availabilityStatus === "available"
    ? buildNominalCompoundTypedSourceOwnerRequest(
      exactSourceFrame,
      selections
    )
    : null;
  let preflightResult = null;
  if (ownerRequest) {
    try {
      preflightResult = evaluateNominalConstruction(ownerRequest, target);
    } catch {
      preflightResult = null;
    }
  }
  const ownerRequestAccepted = Boolean(
    preflightResult
    && isClassicalNahuatlNominalConstructionResult(preflightResult)
    && preflightResult.authorizationStatus === "authorized"
    && preflightResult.constructionKind === "compound-nnc"
  );
  const bindingStatus = requiredChoiceIds.length
    ? "choices-required"
    : ownerRequestAccepted
      ? "ready"
      : "rejected";
  const blockReason = bindingStatus === "ready"
    ? ""
    : bindingStatus === "choices-required"
      ? "nominal-compound-embed-source-class-selection-required"
      : String(
        preflightResult?.blockReason
        || selectedClassOption?.blockReason
        || "nominal-compound-typed-source-selections-not-authorized"
      );
  const effectiveSelections = ownerRequest
    ? deepFreeze({
      embedSourceClass,
      ...(rawSource ? {embedUse} : {}),
      embedAnalysis:ownerRequest.source.compoundEmbedAnalysis?.exceptionKind || "ordinary",
      ...(ownerRequest.source.compoundEmbedAnalysis?.variantStem
        ? {variantStem:ownerRequest.source.compoundEmbedAnalysis.variantStem} : {}),
      structure: ownerRequest.structure,
      embedRole: ownerRequest.embedRole,
      possessorOrientation: ownerRequest.possessorOrientation,
      reduplication: ownerRequest.reduplication,
      reduplicationTarget: ownerRequest.reduplicationTarget,
      bracketing: ownerRequest.bracketing,
      subject: ownerRequest.subject,
      state: ownerRequest.state,
      possessor: ownerRequest.possessor,
      animacy: ownerRequest.animacy,
      pluralConnector: ownerRequest.pluralConnector,
      singularPossessiveConnector:
        ownerRequest.singularPossessiveConnector,
    })
    : Object.freeze({ ...selections });
  const choiceOptionProjection = Object.freeze({
    embedSourceClass: classOptions,
    ...Object.fromEntries(Object.entries({subject:["1sg","2sg","3sg","1pl","2pl","3pl","3common"],
      animacy:["animate","nonanimate"],pluralConnector:["t-in","m-eh","0-h"]}).map(([choiceId,values])=>[
      choiceId,Object.freeze(values.map(optionId=>{
        const request=buildNominalCompoundTypedSourceOwnerRequest(exactSourceFrame,{...selections,[choiceId]:optionId});
        let result=null;try{result=request?evaluateNominalConstruction(request,target):null;}catch{}
        const available=result?.authorizationStatus === "authorized";
        return Object.freeze({choiceId,optionId,label:optionId,
          inventoryFieldRef:({subject:"id:classical-rule-logic-nnc-subject",animacy:"id:classical-rule-logic-nnc-subject-animacy",
            pluralConnector:"id:classical-compound-nnc-plural-connector"})[choiceId],
          availabilityStatus:available?"available":"incompatible",blockReason:available?"":result?.blockReason||"compound-selection-not-authorized",
          ownerOptionProjected:true,ownerOptionAuthority:false,grammarAuthority:false,formulaStringAuthority:false,surfaceStringAuthority:false});
      }))])),
    embedAnalysis:Object.freeze(["ordinary","marked-final-a-loss","glottalized-long-vowel","unexpected-variant"].map(optionId=>{
      const request=buildNominalCompoundTypedSourceOwnerRequest(exactSourceFrame,{...selections,embedAnalysis:optionId});
      let result=null;try{result=request?evaluateNominalConstruction(request,target):null;}catch{}
      const available=result?.authorizationStatus === "authorized";
      return Object.freeze({choiceId:"embedAnalysis",optionId,label:optionId,
        inventoryFieldRef:"id:classical-compound-nnc-embed-analysis",
        availabilityStatus:available?"available":"incompatible",
        blockReason:available?"":result?.blockReason||"compound-embed-analysis-not-authorized",
        ownerOptionProjected:true,ownerOptionAuthority:false,grammarAuthority:false,formulaStringAuthority:false,surfaceStringAuthority:false});
    })),
    ...(rawSource ? {embedUse:Object.freeze(["nounstem","compound-form"].map(optionId => Object.freeze({
      choiceId:"embedUse",optionId,label:optionId === "nounstem" ? "Nounstem" : "Compound form",
      availabilityStatus:"available",ownerOptionProjected:true,ownerOptionAuthority:false,grammarAuthority:false,
      formulaStringAuthority:false,surfaceStringAuthority:false}))) } : {}),
    grammarAuthority: false,
  });
  const frame = Object.freeze({
    kind: NOMINAL_COMPOUND_TYPED_SOURCE_BINDING_KIND,
    version: VERSION,
    authorizationStatus: bindingStatus === "rejected"
      ? "blocked"
      : "authorized",
    bindingStatus,
    blockReason,
    operationId: "grammar:nominal-construction",
    exactSourceFrame,
    callerSelections: selections,
    effectiveSelections,
    requiredChoiceIds,
    choiceOptionProjection,
    executionArgs: Object.freeze(
      bindingStatus === "ready"
        ? [exactSourceFrame, selections]
        : []
    ),
    ownerChoicesRequired: requiredChoiceIds.length > 0,
    operationSelectionRequired: requiredChoiceIds.length > 0,
    ownerInputAcceptanceProven: true,
    ownerRejectionProven: false,
    exactSourceIdentityPreserved: true,
    ownerExecutionStillRequired: bindingStatus === "ready",
    ownerRequestRetainedPrivately: bindingStatus === "ready",
    sourceStringAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    lessonMetadataAuthority: false,
    storedStateAuthority: false,
    grammarAuthority: false,
  });
  ISSUED_TYPED_SOURCE_BINDING_FRAMES.add(frame);
  TYPED_SOURCE_BINDING_CONTEXTS.set(frame, Object.freeze({
    exactSourceFrame,
    ownerRequest: ownerRequestAccepted ? ownerRequest : null,
    preflightResult,
  }));
  return frame;
}

function isClassicalNahuatlNominalConstructionTypedSourceBindingFrame(
  frame = null,
  target = globalThis
) {
  const context = frame
    ? TYPED_SOURCE_BINDING_CONTEXTS.get(frame) || null
    : null;
  if (context?.cardinalNumericSource) return ISSUED_TYPED_SOURCE_BINDING_FRAMES.has(frame)
    && Object.isFrozen(frame) && frame.exactSourceFrame === context.exactSourceFrame
    && CARDINAL_NUMERIC_SOURCE_FRAMES.has(context.exactSourceFrame)
    && (frame.bindingStatus !== "ready" || context.preflightResult?.authorizationStatus === "authorized"
      && isClassicalNahuatlNominalConstructionResult(context.preflightResult)
      && context.preflightResult.sourceFrame.value === context.exactSourceFrame.value
      && frame.executionArgs[0] === context.exactSourceFrame && frame.executionArgs[1] === frame.callerSelections);
  if (
    !frame
    || !context
    || !ISSUED_TYPED_SOURCE_BINDING_FRAMES.has(frame)
    || frame.kind !== NOMINAL_COMPOUND_TYPED_SOURCE_BINDING_KIND
    || frame.version !== VERSION
    || !["choices-required", "ready", "rejected"].includes(
      frame.bindingStatus
    )
    || frame.authorizationStatus !== (frame.bindingStatus === "rejected"
      ? "blocked"
      : "authorized")
    || frame.operationId !== "grammar:nominal-construction"
    || frame.exactSourceFrame !== context.exactSourceFrame
    || !isClassicalNahuatlNominalConstructionTypedSourceFrame(
      frame.exactSourceFrame,
      target
    )
    || !Array.isArray(frame.requiredChoiceIds)
    || !Array.isArray(frame.executionArgs)
    || frame.callerSelections == null
    || frame.effectiveSelections == null
    || frame.choiceOptionProjection == null
    || !Object.isFrozen(frame)
    || !Object.isFrozen(frame.callerSelections)
    || !Object.isFrozen(frame.effectiveSelections)
    || !Object.isFrozen(frame.requiredChoiceIds)
    || !Object.isFrozen(frame.choiceOptionProjection)
    || !Object.isFrozen(frame.choiceOptionProjection.embedSourceClass)
    || !Object.isFrozen(frame.executionArgs)
    || frame.ownerChoicesRequired !== Boolean(
      frame.requiredChoiceIds.length
    )
    || frame.operationSelectionRequired !== Boolean(
      frame.requiredChoiceIds.length
    )
    || frame.ownerInputAcceptanceProven !== true
    || frame.ownerRejectionProven !== false
    || frame.exactSourceIdentityPreserved !== true
    || frame.ownerExecutionStillRequired !== (frame.bindingStatus === "ready")
    || frame.ownerRequestRetainedPrivately !== (frame.bindingStatus === "ready")
    || frame.sourceStringAuthority !== false
    || frame.formulaStringAuthority !== false
    || frame.surfaceStringAuthority !== false
    || frame.lessonMetadataAuthority !== false
    || frame.storedStateAuthority !== false
    || frame.grammarAuthority !== false
    || !Array.isArray(frame.choiceOptionProjection.embedSourceClass)
    || frame.choiceOptionProjection.embedSourceClass.length === 0
    || frame.choiceOptionProjection.grammarAuthority !== false
    || !frame.choiceOptionProjection.embedSourceClass.every(option => (
      option
      && Object.isFrozen(option)
      && option.choiceId === "embedSourceClass"
      && option.optionId
      && ["available", "incompatible"].includes(option.availabilityStatus)
      && option.ownerOptionProjected === true
      && option.ownerOptionAuthority === false
      && option.grammarAuthority === false
    ))
  ) return false;
  if (frame.bindingStatus === "choices-required") {
    return Boolean(
      context.ownerRequest === null
      && frame.blockReason
      && frame.requiredChoiceIds.length === 1
      && ["embedSourceClass","embedUse"].includes(frame.requiredChoiceIds[0])
      && frame.choiceOptionProjection.embedSourceClass.some(option => (
        option.availabilityStatus === "available"
      ))
      && frame.executionArgs.length === 0
    );
  }
  if (frame.bindingStatus === "rejected") {
    return Boolean(
      context.ownerRequest === null
      && frame.blockReason
      && frame.requiredChoiceIds.length === 0
      && frame.executionArgs.length === 0
    );
  }
  return Boolean(
    context.ownerRequest
    && context.preflightResult
    && isClassicalNahuatlNominalConstructionResult(
      context.preflightResult
    )
    && context.preflightResult.authorizationStatus === "authorized"
    && context.preflightResult.constructionKind === "compound-nnc"
    && frame.blockReason === ""
    && frame.requiredChoiceIds.length === 0
    && frame.executionArgs.length === 2
    && frame.executionArgs[0] === frame.exactSourceFrame
    && frame.executionArgs[1] === frame.callerSelections
  );
}

function evaluateNominalConstructionRequest(request = {}, target = globalThis) {
  if (!TYPED_SOURCE_BINDING_CONTEXTS.has(request)) {
    return evaluateNominalConstruction(request, target);
  }
  if (
    !isClassicalNahuatlNominalConstructionTypedSourceBindingFrame(
      request,
      target
    )
    || request.bindingStatus !== "ready"
    || EXECUTED_TYPED_SOURCE_BINDING_FRAMES.has(request)
  ) return null;
  const context = TYPED_SOURCE_BINDING_CONTEXTS.get(request);
  EXECUTED_TYPED_SOURCE_BINDING_FRAMES.add(request);
  const result = evaluateNominalConstruction(context.ownerRequest, target);
  if (
    !isClassicalNahuatlNominalConstructionResult(result)
    || result.authorizationStatus !== "authorized"
    || result.constructionKind !== (context.cardinalNumericSource ? "cardinal-numeral-nnc" : "compound-nnc")
  ) return null;
  const enrichedResult = deepFreeze({
    ...result,
    navigatorSourceFrame: context.exactSourceFrame,
    navigatorSourceIdentityPreserved: true,
    ...(context.cardinalNumericSource ? {canonicalNumericSourceFrame:context.exactSourceFrame} : {}),
  });
  ISSUED_CONSTRUCTION_FRAMES.add(enrichedResult);
  return enrichedResult;
}

// Appendix E gives calendar numerals an ordinal function and the concomitant
// day-sign a third-singular subject. These are new uses of authentic parents,
// not a quantity NNC or an outer quoted personal-name predicate (§56.3.5).
function issueCalendarDateSourceAuthorization(request, target) {
  const source = request.source || {};
  const numeral = source.numeralResult || null;
  const daySign = source.daySignResult || null;
  let blockReason = Reflect.ownKeys(source).some(key => !["numeralResult", "daySignResult"].includes(key))
    ? "calendar-date-exact-parent-fields-required" : "";
  const citation = numeral ? getClassicalNahuatlCardinalNncRestrictedUseCitationProjection(numeral, target) : null;
  const analysis = citation?.canonicalNumeralSourceAnalysisFrame;
  const numeralSlots = numeral?.canonicalResult?.nncSlotFrame;
  const daySignSlots = daySign?.typedSlotFrame;
  const daySignProjection = daySign && target.getClassicalNahuatlNncContinuationSourceConstituents?.(daySign);
  if (!blockReason && !numeral && !daySign) blockReason = "calendar-date-exact-parent-required";
  if (!blockReason && numeral && (!isClassicalNahuatlCardinalNncRestrictedUseCitationProjection(citation, target)
    || citation.authorizationStatus !== "authorized" || analysis?.classifier !== "basic"
    || analysis.countKind !== "ordinary" || analysis.value < 1 || analysis.value > 13
    || numeral.operationFrame.reduplication !== "none" || numeral.operationFrame.modifier !== "none"
    || citation.internalPluralMorph !== "none" || citation.grossCount
    || !["3sg", "3common"].includes(numeralSlots?.slots.subject.subject)
    || numeralSlots.slots.state.arity !== "vacant")) {
    blockReason = "calendar-date-issued-simple-ordinary-numeral-required";
  }
  if (!blockReason && daySign && (target.isClassicalNahuatlOrdinaryNncResult?.(daySign) !== true
    || daySign.authorizationStatus !== "authorized" || !daySignProjection
    || daySignProjection.canonicalResultFrame !== daySign
    || !["3sg", "3common"].includes(daySignSlots?.slots.subject.subject)
    || daySign.operationFrame.state !== "absolutive"
    || daySign.stemOperation?.predicateFormation !== "source-stem")) {
    blockReason = "calendar-date-issued-absolutive-day-sign-parent-required";
  }
  const frame = deepFreeze({
    kind: "classical-nahuatl-nominal-construction-source-authorization-frame",
    version: VERSION, constructionKind: "calendar-date-nnc",
    authorizationStatus: blockReason ? "blocked" : "authorized", blockReason,
    sourceConstituents: {numeralResult: numeral, daySignResult: daySign},
    lexicalFacts: {capturedNumeralResult: numeral, capturedDaySignResult: daySign,
      numeralCitation: citation, daySignProjection},
    lexicalFactsReadOnly: true, sourceConstituentsOnly: true,
    documentaryExampleAuthority: false, lessonMetadataAuthority: false,
    formulaStringAuthority: false, surfaceStringAuthority: false,
    callerSuppliedAuthorityAccepted: false,
  });
  if (!blockReason) ISSUED_SOURCE_AUTHORIZATION_FRAMES.add(frame);
  return frame;
}

function evaluateCalendarDateConstruction(request, target, sourceAuthorizationFrame) {
  const facts = sourceAuthorizationFrame.lexicalFacts;
  const numeral = facts.capturedNumeralResult, daySign = facts.capturedDaySignResult;
  const blocked = reason => buildBlockedFrame("calendar-date-nnc", reason, request);
  if (!numeral || !daySign) return blocked("calendar-date-both-exact-parents-required");
  const calendarBoundary = normalizeKey(request.calendarBoundary);
  if (!["double-nucleus", "single-nucleus"].includes(calendarBoundary)) return blocked("calendar-date-nucleus-boundary-required");
  if (request.subject !== undefined && normalizeSubject(request.subject) !== "3sg"
    || request.state !== undefined && normalizeKey(request.state) !== "absolutive"
    || request.possessor !== undefined) return blocked("calendar-date-absolutive-third-singular-use-required");
  const analysis = facts.numeralCitation.canonicalNumeralSourceAnalysisFrame;
  // The existing complex numeral owner remains the authority for conjoined
  // numerals. Their ordinal projection is not yet claimed by this operation.
  if (analysis.conjunctionFrame?.conjoined) return blocked("calendar-conjoined-numeral-formation-unavailable");
  const sourceDaySignSlotFrame = daySign.typedSlotFrame;
  const dayStem = sourceDaySignSlotFrame.slots.predicate.stem;
  const dayClass = sourceDaySignSlotFrame.nounClass;
  const sourceFrame = deepFreeze({kind: "classical-nahuatl-calendar-date-source-frame",
    version: VERSION, authorizationStatus: "authorized", constructionRole: "calendar-date",
    numeralResult: numeral, daySignResult: daySign,
    numeralSourceAnalysisFrame: analysis, numeralCitation: facts.numeralCitation,
    daySignSourceFrame: daySign.sourceFrame, daySignProjection: facts.daySignProjection,
    daySignUse: "calendar", lexicalDaySignMembershipClaimed: false,
    formulaStringAuthority: false, surfaceStringAuthority: false});
  const ordinalStem = analysis.orthographicShapes[analysis.freeShapes.indexOf(analysis.selectedStem)]
    || analysis.selectedStem;
  const number = (stem, nounClass, num1, num2) => buildCustomNumberFrame({
    subject: "3sg", stem, nounClass, num1, num2, animacy: "nonanimate",
    ruleId: "calendar-ordinal-absolutive-third-singular"});
  const build = (stem, nounClass, numberFrameOverride, family) => buildNncTarget({
    target, sourceFrame, constructionFamily: family, stem, nounClass,
    subject: "3sg", state: "absolutive", animacy: "nonanimate",
    numberFrameOverride, operationIds: ["calendar-date", "calendar-ordinal-position", family]});
  const daySignNncResult = build(dayStem, dayClass, number(dayStem, dayClass,
    sourceDaySignSlotFrame.slots.number.num1, sourceDaySignSlotFrame.slots.number.num2), "calendar-day-sign");
  const numeralSourceSlots = numeral.canonicalResult.nncSlotFrame;
  const ordinalNncResult = build(ordinalStem, numeralSourceSlots.nounClass, number(ordinalStem,
    numeralSourceSlots.nounClass, numeralSourceSlots.slots.number.num1, numeralSourceSlots.slots.number.num2), "calendar-ordinal");
  const embeddedNumeralStem = simpleNumeralStem(analysis.value, {embedded: true, following: dayStem});
  const compoundStem = joinStemParts([embeddedNumeralStem, dayStem]);
  const compound = calendarBoundary === "single-nucleus" ? build(compoundStem, dayClass,
    number(compoundStem, dayClass, sourceDaySignSlotFrame.slots.number.num1,
      sourceDaySignSlotFrame.slots.number.num2), "calendar-date-compound") : null;
  for (const component of [daySignNncResult, ordinalNncResult, compound].filter(Boolean)) {
    if (component.authorizationStatus !== "authorized") return blocked(component.blockReason);
    ISSUED_NOMINAL_NNC_SLOTS.add(component.nncSlotFrame);
  }
  const canonicalResult = deepFreeze({...compound || daySignNncResult,
    subject: "3sg", state: "absolutive"});
  const nameCase = word => `${word[0].toUpperCase()}${word.slice(1)}`;
  const wordSurface = compound ? nameCase(compound.wordSurface)
    : `${nameCase(ordinalNncResult.wordSurface)} ${nameCase(daySignNncResult.wordSurface)}`;
  const formulaRealization = compound ? compound.formulaRealization
    : `${ordinalNncResult.formulaRealization} ${daySignNncResult.formulaRealization}`;
  const writingSource = target.issueClassicalNahuatlLesson2WritingSource?.({
    parts: compound ? [{role: "calendar-compound-nnc", value: nameCase(compound.wordSurface)}]
      : [{role: "calendar-ordinal-nnc", value: nameCase(ordinalNncResult.wordSurface), joinAfter: " "},
        {role: "calendar-day-sign-nnc", value: nameCase(daySignNncResult.wordSurface)}],
    boundaryKind: "calendar-date-nuclei",
  });
  const writtenResult = writingSource && target.writeClassicalNahuatlLesson2Result?.(writingSource);
  if (target.isClassicalNahuatlLesson2WrittenResult?.(writtenResult) !== true
    || writtenResult.surface !== wordSurface) return blocked("calendar-date-lesson2-writing-required");
  const calendarDateFrame = deepFreeze({kind: "classical-nahuatl-calendar-date-formation-frame",
    version: VERSION, authorizationStatus: "authorized", calendarBoundary,
    subject: "3sg", state: "absolutive", numeralFunction: "ordinal-position",
    quantityInterpretation: false, quotedPredicate: false, innerSubjectBarrier: false,
    numeralResult: numeral, daySignResult: daySign,
    sourceNumeralSlotFrame: numeralSourceSlots, sourceDaySignSlotFrame,
    numeralSourceAnalysisFrame: analysis, numeralCitation: facts.numeralCitation,
    daySignNncResult, ordinalNncResult, compoundNncResult: compound,
    embeddedNumeralStem: compound ? embeddedNumeralStem : "", boundaryPreserved: true,
    lexicalDaySignMembershipClaimed: false, formationCoverage: "unconjoined-numeral", writingSource, writtenResult,
    formulaStringAuthority: false, surfaceStringAuthority: false});
  return {version: VERSION, constructionFamily: "calendar-date-nnc", authorizationStatus: "authorized",
    blockReason: "", sourceFrame,
    operationFrame: {kind: "classical-nahuatl-calendar-date-operation-frame", version: VERSION,
      authorizationStatus: "authorized", calendarDateFrame, calendarBoundary,
      subject: "3sg", state: "absolutive",
      relation: "calendar-ordinal-position", value: analysis.value, countKind: "ordinal-position",
      stem: canonicalResult.nncSlotFrame.slots.predicate.stem, nounClass: dayClass,
      formulaStringAuthority: false},
    canonicalTargetEvaluator: "buildClassicalNahuatlNncSlotFrame", canonicalResult,
    typedSlotFrame: canonicalResult.nncSlotFrame, nncSlotFrame: canonicalResult.nncSlotFrame,
    formulaRealization, wordSurface, sentenceSurface: `${wordSurface[0].toUpperCase()}${wordSurface.slice(1)}.`,
    typedFrameAuthority: true, callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false, surfaceStringAuthority: false};
}

function evaluateNominalConstruction(request = {}, target = globalThis) {
  const trustedResultFrames =
    getNominalConstructionTrustedResultFrames(request);
  const trustedTypedSourceAnalyses =
    getNominalConstructionTrustedResultFrames(request);
  [
    request?.source?.affectiveLexicalAnalysis,
    request?.source?.affectiveAffinityAnalysis,
    request?.source?.flawedSubjectAnalysis,
  ].forEach(frame => {
    if (frame && typeof frame === "object") {
      trustedTypedSourceAnalyses.add(frame);
    }
  });
  const hostilePath = findHostileAuthorityPath(
    request, "request", new WeakSet(), trustedResultFrames
  );
  const callerMintedSourceAuthorityPath =
    findCallerMintedSourceAuthorityPath(
      request, "request", new WeakSet(), trustedTypedSourceAnalyses
    );
  const constructionKind = normalizeConstructionKind(request.constructionKind);
  if (hostilePath) {
    return buildBlockedFrame(
      constructionKind,
      `caller-supplied-derived-authority-rejected:${hostilePath}`,
      request
    );
  }
  if (callerMintedSourceAuthorityPath) {
    return buildBlockedFrame(
      constructionKind,
      `caller-supplied-lexical-authority-rejected:${callerMintedSourceAuthorityPath}`,
      request
    );
  }
  if (!constructionKind) return buildBlockedFrame("", "recognized-typed-construction-kind-required", request);
  const sourceAuthorizationFrame =
    issueClassicalNahuatlNominalConstructionSourceAuthorization(request, target);
  if (
    !isClassicalNahuatlNominalConstructionSourceAuthorization(
      sourceAuthorizationFrame
    )
  ) {
    return buildBlockedFrame(
      constructionKind,
      sourceAuthorizationFrame.blockReason
        || "typed-source-authorization-required",
      request,
      { sourceAuthorizationFrame }
    );
  }
  const frame = constructionKind === "adjectival-nnc"
    ? evaluateAdjectivalNncConstruction(request, target, sourceAuthorizationFrame)
    : constructionKind === "calendar-date-nnc"
    ? evaluateCalendarDateConstruction(request, target, sourceAuthorizationFrame)
    : constructionKind === "nominal-embed-vnc"
    ? evaluateNominalEmbedConstruction(request, target, sourceAuthorizationFrame)
    : constructionKind === "compound-nnc"
      ? evaluateNominalCompoundConstruction(request, target, sourceAuthorizationFrame)
      : constructionKind === "affective-nnc"
        ? evaluateAffectiveNominalConstruction(request, target, sourceAuthorizationFrame)
        : evaluateCardinalNominalConstruction(request, target);
  const completedFrame = {
    ...frame,
    kind: "classical-nahuatl-nominal-construction-result-frame",
    constructionKind,
    sourceAuthorizationFrame,
    curriculumLesson: String(
      CURRICULUM_LESSON_BY_CONSTRUCTION[constructionKind]
    ),
    lessonMetadataAuthorizesOutput: false,
  };
  const result = deepFreeze({
    ...completedFrame,
    greatestCommonDivisor: buildEvaluatedGcdFrame(completedFrame),
    leastCommonMultiple: buildSelectedLcmFrame(
      request,
      completedFrame,
      "scalar"
    ),
  });
  ISSUED_CONSTRUCTION_FRAMES.add(result);
  if (result.authorizationStatus === "authorized") NOMINAL_CONSTRUCTION_REQUESTS.set(result, deepFreeze(cloneNominalConstructionRequest(request)));
  if (
    constructionKind === "cardinal-numeral-nnc"
    && result.operationFrame?.numeralModifierFrame?.completeOcCeClause === true
    && typeof target.buildClassicalNahuatlSupplementationClauseEnvelope
      === "function"
  ) {
    const referenceId = normalizeToken(
      request?.source?.supplementReferenceId
      || request?.supplementReferenceId
      || "lesson34-oc-ce-referent"
    );
    const supplementationClauseEnvelope =
      target.buildClassicalNahuatlSupplementationClauseEnvelope(
        result,
        {
          referenceId,
          subjectReferenceId: referenceId,
          sourceStem: "cē",
          sentenceKind: "assertion",
        }
      );
    const enrichedModifierFrame = deepFreeze({
      ...result.operationFrame.numeralModifierFrame,
      supplementarySubjectEligible:
        supplementationClauseEnvelope?.authorizationStatus === "authorized",
      canonicalSupplementationClauseEnvelope:
        supplementationClauseEnvelope || null,
    });
    const enrichedResult = deepFreeze({
      ...result,
      operationFrame: {
        ...result.operationFrame,
        numeralModifierFrame: enrichedModifierFrame,
      },
    });
    ISSUED_CONSTRUCTION_FRAMES.add(enrichedResult);
    return enrichedResult;
  }
  return result;
}

function isClassicalNahuatlNominalConstructionResult(frame = null) {
  const issuedFrame = Boolean(
    ISSUED_CONSTRUCTION_FRAMES.has(frame)
    && frame?.kind === "classical-nahuatl-nominal-construction-result-frame"
    && frame.version === VERSION
    && frame.typedFrameAuthority === true
    && frame.callerSuppliedAuthorityAccepted === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame)
  );
  if (!issuedFrame) return false;
  if (frame.authorizationStatus === "blocked") {
    return Boolean(frame.blockReason);
  }
  return Boolean(
    frame.authorizationStatus === "authorized"
    && isClassicalNahuatlNominalConstructionSourceAuthorization(
      frame.sourceAuthorizationFrame
    )
    && frame.greatestCommonDivisor?.satisfied === true
    && frame.leastCommonMultiple?.licensedAxisSetComplete === true
  );
}

function getClassicalNahuatlCompoundNncRestrictedUseCitationProjection(
  resultFrame = null,
  target = globalThis
) {
  const blocked = blockReason => deepFreeze({
    kind: COMPOUND_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND,
    version: VERSION,
    authorizationStatus: "blocked",
    blockReason,
    stem: "",
    nounClass: "",
    projectionRole: "read-only-source-constituents",
    directSourceReentryAuthorized: false,
    grammarAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  if (
    !isClassicalNahuatlNominalConstructionResult(resultFrame)
    || resultFrame.authorizationStatus !== "authorized"
    || resultFrame.constructionKind !== "compound-nnc"
  ) {
    return blocked("issued-authorized-compound-nnc-result-required");
  }
  const sourceFrame = resultFrame.sourceFrame;
  const operationFrame = resultFrame.operationFrame;
  const sourceAuthorizationFrame = resultFrame.sourceAuthorizationFrame;
  const lexicalFacts = sourceAuthorizationFrame?.lexicalFacts;
  const typedSlotFrame = resultFrame.typedSlotFrame;
  const stem = normalizeStem(operationFrame?.compoundStem);
  const sourceStateStem = normalizeStem(
    operationFrame?.stateRealizedCompoundStem
  );
  const nounClass = normalizeNounClass(operationFrame?.matrixClass);
  if (
    typeof target.isClassicalNahuatlNncSlotFrame !== "function"
    || !target.isClassicalNahuatlNncSlotFrame(typedSlotFrame)
    || typedSlotFrame !== resultFrame.nncSlotFrame
    || typedSlotFrame !== resultFrame.canonicalResult?.nncSlotFrame
    || sourceFrame?.authorizationStatus !== "authorized"
    || operationFrame?.authorizationStatus !== "authorized"
    || !isClassicalNahuatlNominalConstructionSourceAuthorization(
      sourceAuthorizationFrame
    )
    || !lexicalFacts?.matrixSourceClassFrame
    || (!lexicalFacts?.embedSourceClassFrame
      && !ISSUED_COMPOUND_USE_SOURCE_FRAMES.has(lexicalFacts?.compoundEmbedUseSourceFrame))
    || operationFrame.matrixSourceClassFrame
      !== lexicalFacts.matrixSourceClassFrame
    || operationFrame.compoundEmbedUseSourceFrame !== lexicalFacts.compoundEmbedUseSourceFrame
    || operationFrame.embedSourceClassFrame
      !== lexicalFacts.embedSourceClassFrame
    || !stem
    || !sourceStateStem
    || sourceStateStem !== typedSlotFrame.slots.predicate.stem
    || !nounClass
    || nounClass !== typedSlotFrame.nounClass
    || nounClass !== sourceFrame.matrixClass
  ) {
    return blocked("compound-nnc-canonical-use-stem-analysis-required");
  }
  // The compound owner retains the derived base before state realization.
  // Reading it does not rebuild a clause or change the captured agreement,
  // relation, embed history, reduplication, or constituent hierarchy.
  // A typed possessive-only matrix does not supply a restricted counterpart;
  // this disposition is about this projection, not a ban on citing its form.
  if (lexicalFacts.fellowshipMatrixFrame?.requiredState === "possessive") {
    return blocked("compound-nnc-selected-matrix-has-no-restricted-use-counterpart");
  }
  const existing = COMPOUND_NNC_RESTRICTED_USE_CITATION_PROJECTIONS.get(
    resultFrame
  );
  if (existing) return existing;
  const projection = deepFreeze({
    kind: COMPOUND_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND,
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    canonicalResultFrame: resultFrame,
    canonicalSourceFrame: sourceFrame,
    canonicalOperationFrame: operationFrame,
    canonicalSourceAuthorizationFrame: sourceAuthorizationFrame,
    typedSlotFrame,
    stem,
    nounClass,
    useKind: "restricted-use",
    useShape: "base",
    sourcePredicateStem: typedSlotFrame.slots.predicate.stem,
    sourceStateStem,
    sourceAgreementChanged: false,
    sourceReferenceChanged: false,
    sourceDerivationChanged: false,
    projectionRole: "read-only-source-constituents",
    continuationMode: "licensed-operation-only",
    directSourceReentryAuthorized: false,
    grammarAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  COMPOUND_NNC_RESTRICTED_USE_CITATION_RECEIPTS.set(projection, Object.freeze({
    resultFrame,
    sourceFrame,
    operationFrame,
    sourceAuthorizationFrame,
    typedSlotFrame,
    stem,
    nounClass,
    sourceStateStem,
  }));
  COMPOUND_NNC_RESTRICTED_USE_CITATION_PROJECTIONS.set(resultFrame, projection);
  return projection;
}

function isClassicalNahuatlCompoundNncRestrictedUseCitationProjection(
  frame = null,
  target = globalThis
) {
  const receipt = frame && typeof frame === "object"
    ? COMPOUND_NNC_RESTRICTED_USE_CITATION_RECEIPTS.get(frame)
    : null;
  return Boolean(
    receipt
    && frame.kind === COMPOUND_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && frame.blockReason === ""
    && isClassicalNahuatlNominalConstructionResult(receipt.resultFrame)
    && receipt.resultFrame.authorizationStatus === "authorized"
    && receipt.resultFrame.constructionKind === "compound-nnc"
    && typeof target.isClassicalNahuatlNncSlotFrame === "function"
    && target.isClassicalNahuatlNncSlotFrame(receipt.typedSlotFrame)
    && frame.canonicalResultFrame === receipt.resultFrame
    && frame.canonicalSourceFrame === receipt.sourceFrame
    && frame.canonicalOperationFrame === receipt.operationFrame
    && frame.canonicalSourceAuthorizationFrame
      === receipt.sourceAuthorizationFrame
    && frame.typedSlotFrame === receipt.typedSlotFrame
    && receipt.typedSlotFrame === receipt.resultFrame.typedSlotFrame
    && receipt.typedSlotFrame === receipt.resultFrame.nncSlotFrame
    && receipt.typedSlotFrame
      === receipt.resultFrame.canonicalResult.nncSlotFrame
    && frame.stem === receipt.stem
    && frame.stem === receipt.operationFrame.compoundStem
    && frame.nounClass === receipt.nounClass
    && frame.nounClass === receipt.typedSlotFrame.nounClass
    && frame.sourceStateStem === receipt.sourceStateStem
    && frame.sourceStateStem === receipt.operationFrame.stateRealizedCompoundStem
    && frame.sourcePredicateStem === receipt.typedSlotFrame.slots.predicate.stem
    && frame.useKind === "restricted-use"
    && frame.useShape === "base"
    && frame.sourceAgreementChanged === false
    && frame.sourceReferenceChanged === false
    && frame.sourceDerivationChanged === false
    && frame.projectionRole === "read-only-source-constituents"
    && frame.continuationMode === "licensed-operation-only"
    && frame.directSourceReentryAuthorized === false
    && frame.grammarAuthority === false
    && frame.callerSuppliedAuthorityAccepted === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame)
  );
}

function hasCanonicalAffectiveCitationAnalysis(resultFrame, target) {
  const sourceFrame = resultFrame?.sourceFrame;
  const operationFrame = resultFrame?.operationFrame;
  const canonicalResult = resultFrame?.canonicalResult;
  const typedSlotFrame = canonicalResult?.nncSlotFrame;
  const stem = normalizeStem(operationFrame?.compoundStem);
  const nounClass = normalizeNounClass(operationFrame?.nounClass);
  return Boolean(
    isClassicalNahuatlNominalConstructionResult(resultFrame)
    && resultFrame.authorizationStatus === "authorized"
    && resultFrame.constructionKind === "affective-nnc"
    && resultFrame.constructionFamily === "affective-nnc"
    && sourceFrame?.kind === "classical-nahuatl-affective-nominal-source-frame"
    && sourceFrame.authorizationStatus === "authorized"
    && operationFrame?.kind
      === "classical-nahuatl-affective-nominal-operation-frame"
    && operationFrame.authorizationStatus === "authorized"
    && isClassicalNahuatlNominalConstructionSourceAuthorization(
      resultFrame.sourceAuthorizationFrame
    )
    && canonicalResult?.authorizationStatus === "authorized"
    && typeof target.isClassicalNahuatlNncSlotFrame === "function"
    && target.isClassicalNahuatlNncSlotFrame(typedSlotFrame)
    && (!resultFrame.typedSlotFrame
      || resultFrame.typedSlotFrame === typedSlotFrame)
    && (!resultFrame.nncSlotFrame
      || resultFrame.nncSlotFrame === typedSlotFrame)
    && stem
    && stem === operationFrame.compoundStem
    && (stem === typedSlotFrame.slots.predicate.stem
      || sourceFrame.supportiveInitialI === true
        && target.isClassicalNahuatlTranscriptionAnalysisFrame?.(canonicalResult.supportiveInitialIFrame) === true
        && canonicalResult.supportiveInitialIFrame.authorizationStatus === "authorized"
        && stem.slice(1) === typedSlotFrame.slots.predicate.stem)
    && nounClass
    && nounClass === operationFrame.nounClass
    && nounClass === operationFrame.matrixClass
    && nounClass === typedSlotFrame.nounClass
    && nounClass === canonicalResult.numberFrame?.nounClass
    && operationFrame.attitudeRouteFrame === sourceFrame.attitudeRouteFrame
    && sourceFrame.attitudeRouteFrame?.authorizationStatus === "authorized"
    && operationFrame.affectRoute === sourceFrame.affectRoute
    && Object.isFrozen(sourceFrame)
    && Object.isFrozen(operationFrame)
    && Object.isFrozen(canonicalResult)
  );
}

function getCanonicalAffectiveCitationUse(operationFrame) {
  const vocative = operationFrame.vocativeFrame;
  if (vocative?.selectedForm === "abbreviated") {
    if (operationFrame.affectRoute !== "compound"
      || operationFrame.affectiveMatrix !== "tzin"
      || operationFrame.affectiveMatrixStem !== "tz"
      || vocative.matrixStem !== "tz" || vocative.particle !== "é") return null;
    // §32.3 cites (-tz)-tli- itself. Quoting the selected matrix neither
    // expands it to tzin (which can change register/meaning) nor licenses
    // a new nonvocative NNC with this vocative-conditioned abbreviation.
    return { useKind: "isolated-citation", citationNumberConstraint: "vocative-only" };
  }
  return { useKind: "restricted-use", citationNumberConstraint: "class-governed" };
}

function getClassicalNahuatlAffectiveNncRestrictedUseCitationProjection(
  resultFrame = null,
  target = globalThis
) {
  const blocked = blockReason => deepFreeze({
    kind: AFFECTIVE_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND,
    version: VERSION,
    authorizationStatus: "blocked",
    blockReason,
    stem: "",
    nounClass: "",
    projectionRole: "read-only-source-constituents",
    directSourceReentryAuthorized: false,
    grammarAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  if (
    !isClassicalNahuatlNominalConstructionResult(resultFrame)
    || resultFrame.authorizationStatus !== "authorized"
    || resultFrame.constructionKind !== "affective-nnc"
  ) {
    return blocked("issued-authorized-affective-nnc-result-required");
  }
  if (!hasCanonicalAffectiveCitationAnalysis(resultFrame, target)) {
    return blocked("affective-nnc-canonical-use-stem-analysis-required");
  }
  const sourceFrame = resultFrame.sourceFrame;
  const operationFrame = resultFrame.operationFrame;
  const sourceAuthorizationFrame = resultFrame.sourceAuthorizationFrame;
  const typedSlotFrame = resultFrame.canonicalResult.nncSlotFrame;
  const citationUse = getCanonicalAffectiveCitationUse(operationFrame);
  if (!citationUse) {
    return blocked("affective-nnc-owned-vocative-matrix-analysis-required");
  }
  const existing = AFFECTIVE_NNC_RESTRICTED_USE_CITATION_PROJECTIONS.get(
    resultFrame
  );
  if (existing) return existing;
  const stem = operationFrame.compoundStem;
  const nounClass = operationFrame.nounClass;
  const canonicalAttitudeRouteFrame = operationFrame.attitudeRouteFrame;
  const canonicalFlawedSubjectFrame = operationFrame.flawedSubjectFrame;
  const canonicalPilHonorificVocativeFrame =
    operationFrame.pilHonorificVocativeFrame;
  // Citation isolates the already derived nounstem, including its selected
  // affinity and inner hierarchy. It does not reconstruct the source clause
  // or transfer its possessor or flawed subject pronoun into that nounstem.
  // Affective affinity alone is not plural-only: nonanimate stems can occur
  // with common-number subjects (Andrews 32.7).
  const projection = deepFreeze({
    kind: AFFECTIVE_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND,
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    canonicalResultFrame: resultFrame,
    canonicalSourceFrame: sourceFrame,
    canonicalOperationFrame: operationFrame,
    canonicalSourceAuthorizationFrame: sourceAuthorizationFrame,
    typedSlotFrame,
    canonicalAttitudeRouteFrame,
    canonicalFlawedSubjectFrame,
    canonicalPilHonorificVocativeFrame,
    canonicalVocativeFrame: operationFrame.vocativeFrame || null,
    stem,
    nounClass,
    ...citationUse,
    useShape: "base",
    sourcePredicateStem: typedSlotFrame.slots.predicate.stem,
    sourceAgreementChanged: false,
    sourceReferenceChanged: false,
    sourceDerivationChanged: false,
    sourceClauseFeaturesProjected: false,
    sourcePronounAttitudeProjected: false,
    sourceVocativeConditionProjected: false,
    projectionScope: "isolated-nounstem",
    projectionRole: "read-only-source-constituents",
    continuationMode: "licensed-operation-only",
    directSourceReentryAuthorized: false,
    grammarAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  AFFECTIVE_NNC_RESTRICTED_USE_CITATION_RECEIPTS.set(projection, Object.freeze({
    resultFrame,
    sourceFrame,
    operationFrame,
    sourceAuthorizationFrame,
    typedSlotFrame,
    canonicalAttitudeRouteFrame,
    canonicalFlawedSubjectFrame,
    canonicalPilHonorificVocativeFrame,
    stem,
    nounClass,
  }));
  AFFECTIVE_NNC_RESTRICTED_USE_CITATION_PROJECTIONS.set(resultFrame, projection);
  return projection;
}

function isClassicalNahuatlAffectiveNncRestrictedUseCitationProjection(
  frame = null,
  target = globalThis
) {
  const receipt = frame && typeof frame === "object"
    ? AFFECTIVE_NNC_RESTRICTED_USE_CITATION_RECEIPTS.get(frame)
    : null;
  const citationUse = receipt && getCanonicalAffectiveCitationUse(receipt.operationFrame);
  return Boolean(
    receipt
    && frame.kind === AFFECTIVE_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && frame.blockReason === ""
    && hasCanonicalAffectiveCitationAnalysis(receipt.resultFrame, target)
    && citationUse
    && frame.canonicalResultFrame === receipt.resultFrame
    && frame.canonicalSourceFrame === receipt.sourceFrame
    && frame.canonicalOperationFrame === receipt.operationFrame
    && frame.canonicalSourceAuthorizationFrame
      === receipt.sourceAuthorizationFrame
    && receipt.sourceFrame === receipt.resultFrame.sourceFrame
    && receipt.operationFrame === receipt.resultFrame.operationFrame
    && receipt.sourceAuthorizationFrame
      === receipt.resultFrame.sourceAuthorizationFrame
    && frame.typedSlotFrame === receipt.typedSlotFrame
    && receipt.typedSlotFrame
      === receipt.resultFrame.canonicalResult.nncSlotFrame
    && frame.canonicalAttitudeRouteFrame === receipt.canonicalAttitudeRouteFrame
    && frame.canonicalAttitudeRouteFrame
      === receipt.operationFrame.attitudeRouteFrame
    && frame.canonicalFlawedSubjectFrame === receipt.canonicalFlawedSubjectFrame
    && frame.canonicalFlawedSubjectFrame
      === receipt.operationFrame.flawedSubjectFrame
    && frame.canonicalPilHonorificVocativeFrame
      === receipt.canonicalPilHonorificVocativeFrame
    && frame.canonicalPilHonorificVocativeFrame
      === receipt.operationFrame.pilHonorificVocativeFrame
    && frame.stem === receipt.stem
    && frame.stem === receipt.operationFrame.compoundStem
    && frame.nounClass === receipt.nounClass
    && frame.nounClass === receipt.operationFrame.nounClass
    && frame.sourcePredicateStem === receipt.typedSlotFrame.slots.predicate.stem
    && frame.canonicalVocativeFrame === (receipt.operationFrame.vocativeFrame || null)
    && frame.useKind === citationUse.useKind
    && frame.citationNumberConstraint === citationUse.citationNumberConstraint
    && frame.useShape === "base"
    && frame.sourceAgreementChanged === false
    && frame.sourceReferenceChanged === false
    && frame.sourceDerivationChanged === false
    && frame.sourceClauseFeaturesProjected === false
    && frame.sourcePronounAttitudeProjected === false
    && frame.sourceVocativeConditionProjected === false
    && frame.projectionScope === "isolated-nounstem"
    && frame.projectionRole === "read-only-source-constituents"
    && frame.continuationMode === "licensed-operation-only"
    && frame.directSourceReentryAuthorized === false
    && frame.grammarAuthority === false
    && frame.callerSuppliedAuthorityAccepted === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame)
  );
}

function hasCanonicalCobGrossFormation(resultFrame, target) {
  const source = resultFrame?.sourceFrame;
  const operation = resultFrame?.operationFrame;
  const formation = operation?.numeralStemFormationFrame;
  const gross = operation?.cobGrossFormationFrame;
  const child = operation?.cobPreteritAgentiveResultFrame;
  const canonical = resultFrame?.canonicalResult;
  const number = canonical?.numberFrame;
  const slots = canonical?.nncSlotFrame;
  if (!ISSUED_COB_GROSS_FORMATION_FRAMES.has(gross)
    || !isCanonicalCobPreteritAgentiveResult(child, {
      subject: child?.canonicalResult?.subject,
      animacy: child?.operationFrame?.numberAnimacyFrame?.selectedAnimacy,
      sourceUse: "general-use",
    }, target)) return false;
  const authorization = gross.sourceAuthorizationFrame;
  const useClass = authorization.lexicalFacts.embedSourceClassFrame;
  return Boolean(
    isClassicalNahuatlNominalConstructionResult(resultFrame)
    && resultFrame.authorizationStatus === "authorized"
    && operation.value === 20
    && operation.classifier === "cob"
    && operation.countKind === "gross"
    && operation.cobNumeralFrame === null
    && source.cobGrossFormationFrame === gross
    && formation.cobGrossFormationFrame === gross
    && source.cobPreteritAgentiveResultFrame === child
    && formation.cobPreteritAgentiveResultFrame === child
    && gross.canonicalPreteritAgentiveResultFrame === child
    && isClassicalNahuatlNominalConstructionSourceAuthorization(authorization)
    && authorization.lexicalFacts.capturedEmbedResult === child
    && authorization.lexicalFacts.agentiveEmbed === true
    && useClass.nounClass === "tl" && useClass.sourceClass === "tl-1-a"
    && gross.generalUseStem === child.operationFrame.targetStems.generalUse
    && gross.restrictedUseStem === child.operationFrame.targetStems.restrictedUse
    && gross.embedShapeFrame.sourceStem === gross.generalUseStem
    && gross.embedShapeFrame.sourceShapeAuthority === "owner-issued-nnc-result"
    && gross.embedStem === realizeBoundaryAssimilation(gross.embedShapeFrame.realizedStem, gross.matrixStem)
    && gross.matrixStem === "ix"
    && gross.matrixClass === ""
    && gross.matrixNumberJurisdiction === "plural-only-totality"
    && gross.compoundStem === joinStemParts([gross.embedStem, gross.matrixStem])
    && gross.compositionScope === "single-nounstem"
    && gross.sourceAgreementChanged === false
    && gross.sourceStateChanged === false
    && gross.sourceClauseFeaturesProjected === false
    && gross.formulaStringAuthority === false
    && gross.surfaceStringAuthority === false
    && formation.preInflectionStem === gross.generalUseStem
    && formation.preReduplicationStem === gross.compoundStem
    && formation.citationNumberConstraint === "plural-only"
    && formation.retainedDerivationalConstituents === true
    && !operation.conjunctionFrame.conjoined
    && number.authorizationStatus === "authorized"
    && number.subject.endsWith("pl")
    && number.subject === slots.slots.subject.subject
    && number.nounClass === "" && slots.nounClass === ""
    && operation.nounClass === "" && formation.nounClass === ""
    && number.nounClassApplicability === "not-applicable-plural-only-totality"
    && number.nounClassAuthority === number.ruleId
    && (operation.grossPossessiveFrame?.selectedNumberVariant === "ti"
      ? number.ruleId === "cardinal-nominal-gross-possessive-nonanimate-ti-zero"
        && number.num1 === "ti" && number.num2 === "0"
      : number.ruleId === "cardinal-nominal-gross-count-plural-t-in"
        && number.num1 === "t" && number.num2 === "in")
    && number.num1 === slots.slots.number.num1
    && number.num2 === slots.slots.number.num2
    && Object.isFrozen(gross)
  );
}

function hasCanonicalGrossConjunctionCitationSource(resultFrame, target) {
  const operation = resultFrame?.operationFrame;
  const source = resultFrame?.sourceFrame;
  const formation = operation?.numeralStemFormationFrame;
  const gross = operation?.cobGrossConjunctionFrame;
  const selected = resultFrame?.canonicalResult;
  const slots = selected?.nncSlotFrame;
  const number = selected?.numberFrame;
  const ordinary = gross?.canonicalConjunctionResultFrame;
  const capture = gross?.canonicalConjunctionCaptureFrame;
  return Boolean(
    isClassicalNahuatlNominalConstructionResult(resultFrame)
    && resultFrame.authorizationStatus === "authorized"
    && ISSUED_GROSS_CONJUNCTION_EMBED_FRAMES.has(gross)
    && source.cobGrossConjunctionFrame === gross
    && formation.cobGrossConjunctionFrame === gross
    && slots.slots.predicate.structureFrame === gross
    && operation.stem === gross.stem
    && formation.citationStem === gross.stem
    && formation.retainedDerivationalConstituents === true
    && formation.citationNumberConstraint === "plural-only"
    && operation.classifier === "cob" && operation.countKind === "gross"
    && operation.value === gross.numeralValue
    && operation.reduplication === gross.reduplication
    && gross.compositionScope === "whole-conjunction"
    && gross.matrixStem === "ix" && gross.matrixClass === ""
    && gross.matrixNumberJurisdiction === "plural-only-totality"
    && !operation.conjunctionFrame.conjoined && !operation.conjunctionCaptureFrame
    && isClassicalNahuatlNominalConstructionResult(ordinary)
    && ordinary.authorizationStatus === "authorized"
    && ordinary.operationFrame.countKind === "ordinary"
    && ordinary.operationFrame.value === operation.value
    && ordinary.operationFrame.conjunctionCaptureFrame === capture
    && typeof target.isClassicalNahuatlNncSlotFrame === "function"
    && gross.segments.length === capture.conjunctResults.length
    && gross.segments.every((segment, index) => (
      segment.canonicalNncSlotFrame === capture.conjunctResults[index].canonicalResult
      && target.isClassicalNahuatlNncSlotFrame(segment.canonicalNncSlotFrame)
      && segment.personPositionPreserved && segment.statePositionPreserved
      && segment.numberPosition === (index < gross.segments.length - 1 ? "preserved" : "deleted")
    ))
    && gross.rightmostEmbedFrame.canonicalNumeralResultFrame
      === capture.conjunctResults.at(-1).canonicalNumeralResultFrame
    && gross.sourceAgreementChanged === false && gross.sourceStateChanged === false
    && gross.onlyRightmostNumberDeleted === true
    && number.authorizationStatus === "authorized"
    && number.subject.endsWith("pl") && number.subject === slots.slots.subject.subject
    && number.nounClass === "" && slots.nounClass === "" && operation.nounClass === ""
    && number.nounClassApplicability === "not-applicable-plural-only-totality"
    && (operation.grossPossessiveFrame?.selectedNumberVariant === "ti"
      ? number.num1 === "ti" && number.num2 === "0"
      : number.num1 === "t" && number.num2 === "in")
    && number.num1 === slots.slots.number.num1 && number.num2 === slots.slots.number.num2
    && selected.structuredBoundarySpellingFrame?.authorizationStatus === "authorized"
    && selected.structuredBoundarySpellingFrame.sourceStem === gross.rightmostEmbedFrame.sourcePredicateStem
    && selected.structuredBoundarySpellingFrame.retainedStem === gross.rightmostEmbedFrame.embedStem
    && selected.structuredBoundarySpellingFrame.followingMorpheme === gross.matrixStem
  );
}

function buildGrossConjunctionCitationParts(resultFrame, target) {
  const structure = resultFrame.operationFrame.cobGrossConjunctionFrame;
  const parts = [];
  structure.segments.forEach((segment, index) => {
    const earlier = index < structure.segments.length - 1;
    const slots = segment.canonicalNncSlotFrame.slots;
    const predicate = earlier ? segment.predicateStem : joinStemParts([
      additionalNumberLink(structure.rightmostEmbedFrame.embedStem),
      resultFrame.canonicalResult.structuredBoundarySpellingFrame.realizedRetainedStem,
    ]);
    const morphs = [slots.subject.pers1, slots.subject.pers2,
      ...slots.participant.slots.map(slot => slot.carrier),
      ...slots.state.slots.map(slot => slot.carrier), predicate,
      ...(earlier ? [slots.number.num1, slots.number.num2] : [])];
    parts.push(...morphs.map(value => target.realizeClassicalNahuatlNncSurfaceCarrier(value))
      .filter(Boolean).map(value => ({ role: `citation-inner-clause-${index + 1}`, value })));
    if (earlier) parts.at(-1).joinAfter = " ";
  });
  parts.push({ role: "citation-totality-matrix", value: structure.matrixStem });
  return deepFreeze(parts);
}

function hasCanonicalCardinalCitationAnalysis(resultFrame, target) {
  const sourceFrame = resultFrame?.sourceFrame;
  const operationFrame = resultFrame?.operationFrame;
  const canonicalResult = resultFrame?.canonicalResult;
  const typedSlotFrame = canonicalResult?.nncSlotFrame;
  const analysis = sourceFrame?.numeralSourceAnalysisFrame;
  const formation = sourceFrame?.numeralStemFormationFrame;
  const stem = normalizeStem(operationFrame?.stem);
  const nounClass = normalizeNounClass(operationFrame?.nounClass);
  return Boolean(
    isClassicalNahuatlNominalConstructionResult(resultFrame)
    && resultFrame.authorizationStatus === "authorized"
    && resultFrame.constructionKind === "cardinal-numeral-nnc"
    && resultFrame.constructionFamily === "cardinal-numeral-nnc"
    && sourceFrame?.kind === "classical-nahuatl-cardinal-nominal-source-frame"
    && sourceFrame.authorizationStatus === "authorized"
    && operationFrame?.kind
      === "classical-nahuatl-cardinal-nominal-operation-frame"
    && operationFrame.authorizationStatus === "authorized"
    && isClassicalNahuatlNominalConstructionSourceAuthorization(
      resultFrame.sourceAuthorizationFrame
    )
    && canonicalResult?.authorizationStatus === "authorized"
    && typeof target.isClassicalNahuatlNncSlotFrame === "function"
    && target.isClassicalNahuatlNncSlotFrame(typedSlotFrame)
    && (!resultFrame.typedSlotFrame
      || resultFrame.typedSlotFrame === typedSlotFrame)
    && (!resultFrame.nncSlotFrame
      || resultFrame.nncSlotFrame === typedSlotFrame)
    && stem
    && stem === operationFrame.stem
    && stem === typedSlotFrame.slots.predicate.stem
    && stem === canonicalResult.numberFrame?.stem
    && (nounClass || hasCanonicalCobGrossFormation(resultFrame, target)
      || hasCanonicalGrossConjunctionCitationSource(resultFrame, target))
    && nounClass === operationFrame.nounClass
    && nounClass === typedSlotFrame.nounClass
    && nounClass === canonicalResult.numberFrame.nounClass
    && analysis?.kind
      === "classical-nahuatl-cardinal-numeral-source-analysis-frame"
    && analysis.authorizationStatus === "authorized"
    && analysis === operationFrame.numeralSourceAnalysisFrame
    && analysis.selectedStem === stem
    && formation?.kind
      === "classical-nahuatl-cardinal-numeral-stem-formation-frame"
    && formation.authorizationStatus === "authorized"
    && formation === operationFrame.numeralStemFormationFrame
    && formation.derivedStem === stem
    && formation.nounClass === nounClass
    && formation.value === sourceFrame.value
    && formation.value === operationFrame.value
    && formation.countKind === sourceFrame.countKind
    && formation.countKind === operationFrame.countKind
    && formation.classifier === sourceFrame.classifier
    && formation.classifier === operationFrame.classifier
    && formation.reduplication === operationFrame.reduplication
    && formation.reduplicationFrame === sourceFrame.reduplicationFrame
    && formation.reduplicationFrame === operationFrame.reduplicationFrame
    && formation.conjunctionFrame === sourceFrame.conjunctionFrame
    && formation.conjunctionFrame === operationFrame.conjunctionFrame
    && formation.classifierFrame === sourceFrame.classifierFrame
    && formation.classifierFrame === operationFrame.classifierFrame
    && formation.measureFrame === sourceFrame.measureFrame
    && formation.measureFrame === operationFrame.measureFrame
    && formation.internalPluralBelongsTo === "predicate-stem-derivation"
    && formation.internalPluralIsSubjectNumberConnector === false
    && ["none", "n", "in"].includes(formation.internalPluralMorph)
    && ["none", "x", "ix"].includes(formation.grossCountMorph)
    && formation.grossCount === (formation.countKind === "gross")
    && formation.citationNumberConstraint === (
      formation.grossCount || formation.internalPluralMorph !== "none"
        ? "plural-only" : "class-governed"
    )
    && formation.citationStem
    && normalizeStem(formation.citationStem) === formation.citationStem
    && Object.isFrozen(sourceFrame)
    && Object.isFrozen(operationFrame)
    && Object.isFrozen(canonicalResult)
    && Object.isFrozen(analysis)
    && Object.isFrozen(formation)
  );
}

// Writing alternatives are readonly projections of an issued grammatical NNC.
// The Source graph, not a caller's word or boundary description, supplies every
// morph. Lesson 2 remains the authority for the nasal/sibilant realization.
function getClassicalNahuatlCardinalNncWrittenSpellingProjection(resultFrame, target) {
  if (!hasCanonicalCardinalCitationAnalysis(resultFrame, target)) return null;
  if (CARDINAL_NNC_WRITTEN_SPELLING_PROJECTIONS.has(resultFrame)) {
    return CARDINAL_NNC_WRITTEN_SPELLING_PROJECTIONS.get(resultFrame);
  }
  const sourceFrame = resultFrame.sourceFrame;
  const operationFrame = resultFrame.operationFrame;
  const measureFrame = sourceFrame.measureFrame;
  const typedSlotFrame = resultFrame.canonicalResult.nncSlotFrame;
  const slots = typedSlotFrame.slots;
  if (!measureFrame || sourceFrame.classifier !== "measure"
    || sourceFrame.measureComposition !== "measure-only"
    || operationFrame.stem !== joinStemParts([
      measureFrame.numeralEmbedStem, measureFrame.measureMatrixStem
    ])
    || typeof target.buildClassicalNahuatlAssimilationFrame !== "function"
    || typeof target.isClassicalNahuatlTranscriptionAnalysisFrame !== "function"
    || typeof target.realizeClassicalNahuatlNncSurfaceCarriers !== "function") return null;
  const boundaryRequest = {
    leftConsonant: measureFrame.numeralEmbedStem.slice(-1),
    rightConsonant: measureFrame.measureMatrixStem.slice(0, 1),
    sourceLeftMorpheme: measureFrame.numeralEmbedStem,
    sourceRightMorpheme: measureFrame.measureMatrixStem,
    grammaticalConstruction: true,
  };
  const variants = ["source-preserving", "fully-assimilated"].map(spellingStyle => {
    const boundaryFrame = target.buildClassicalNahuatlAssimilationFrame({
      ...boundaryRequest, spellingStyle,
    });
    if (!target.isClassicalNahuatlTranscriptionAnalysisFrame(boundaryFrame)
      || boundaryFrame.authorizationStatus !== "authorized"
      || boundaryFrame.selectedRuleId !== "cn-l2-211-regressive-nasal-sibilant") return null;
    const predicate = joinStemParts([
      boundaryFrame.realizedLeftMorpheme, boundaryFrame.realizedRightMorpheme
    ]);
    // Keep the realized junction within one carrier: the ordinary writer must
    // not reapply its source-preserving default to this already resolved pair.
    const wordSurface = target.realizeClassicalNahuatlNncSurfaceCarriers([
      slots.subject.pers1, slots.subject.pers2,
      ...slots.participant.slots.map(slot => slot.carrier),
      ...slots.state.slots.map(slot => slot.carrier),
      predicate, slots.number.num1, slots.number.num2,
    ], { boundaryKind: "typed-nnc-slots" });
    return deepFreeze({ spellingStyle, wordSurface, boundaryFrame });
  });
  if (variants.some(variant => !variant)
    || variants[0].wordSurface !== resultFrame.wordSurface
    || variants[0].wordSurface === variants[1].wordSurface) return null;
  const projection = deepFreeze({
    kind: "classical-nahuatl-cardinal-nnc-written-spelling-projection",
    version: VERSION,
    authorizationStatus: "authorized",
    readOnly: true,
    grammarAuthority: false,
    surfaceStringAuthority: false,
    canonicalResultFrame: resultFrame,
    sourceFrame,
    operationFrame,
    typedSlotFrame,
    numeralSourceAnalysisFrame: sourceFrame.numeralSourceAnalysisFrame,
    measureFrame,
    variants,
  });
  CARDINAL_NNC_WRITTEN_SPELLING_PROJECTIONS.set(resultFrame, projection);
  CARDINAL_NNC_WRITTEN_SPELLING_PARENTS.set(projection, resultFrame);
  return projection;
}

function isClassicalNahuatlCardinalNncWrittenSpellingProjection(frame, target) {
  const parent = frame && CARDINAL_NNC_WRITTEN_SPELLING_PARENTS.get(frame);
  return Boolean(parent && hasCanonicalCardinalCitationAnalysis(parent, target)
    && CARDINAL_NNC_WRITTEN_SPELLING_PROJECTIONS.get(parent) === frame
    && frame.canonicalResultFrame === parent
    && frame.sourceFrame === parent.sourceFrame
    && frame.operationFrame === parent.operationFrame
    && frame.typedSlotFrame === parent.canonicalResult.nncSlotFrame
    && frame.numeralSourceAnalysisFrame === parent.sourceFrame.numeralSourceAnalysisFrame
    && frame.measureFrame === parent.sourceFrame.measureFrame
    && frame.grammarAuthority === false && frame.readOnly === true);
}

function getCanonicalCobNumeralCitationAnalysis(resultFrame, target) {
  const operation = resultFrame?.operationFrame;
  const cob = operation?.cobNumeralFrame;
  const child = operation?.cobPreteritAgentiveResultFrame;
  if (!child) return { cob: null, projection: null, blockReason: "" };
  const blocked = blockReason => ({ cob: null, projection: null, blockReason });
  if (operation.cobGrossConjunctionFrame) {
    return hasCanonicalGrossConjunctionCitationSource(resultFrame, target)
      ? { cob: null, projection: null,
        grossConjunction: operation.cobGrossConjunctionFrame, blockReason: "" }
      : blocked("cardinal-nnc-canonical-gross-conjunction-required");
  }
  if (operation.cobGrossFormationFrame) {
    return hasCanonicalCobGrossFormation(resultFrame, target)
      ? { cob: null, projection: null,
        grossFormation: operation.cobGrossFormationFrame, blockReason: "" }
      : blocked("cardinal-nnc-cob-canonical-gross-composition-required");
  }
  if (typeof target.getClassicalNahuatlPreteritNncRestrictedUseCitationProjection
      !== "function"
    || typeof target.isClassicalNahuatlPreteritNncRestrictedUseCitationProjection
      !== "function") {
    return blocked("cardinal-nnc-cob-preterit-citation-capability-required");
  }
  if (!cob
    || !isCanonicalCobPreteritAgentiveResult(child, {
      subject: cob.subject,
      animacy: cob.animacy,
    }, target)) {
    return blocked("cardinal-nnc-cob-canonical-preterit-analysis-required");
  }
  const projection = target.getClassicalNahuatlPreteritNncRestrictedUseCitationProjection(child);
  if (!target.isClassicalNahuatlPreteritNncRestrictedUseCitationProjection(projection)
    || projection.canonicalResultFrame !== child
    || projection.typedSlotFrame !== child.canonicalResult.nncSlotFrame) {
    return blocked("cardinal-nnc-cob-canonical-preterit-projection-required");
  }
  const selected = resultFrame.canonicalResult;
  const number = selected.numberFrame;
  const sourceNumber = child.canonicalResult.numberFrame;
  if (cob.kind !== "classical-nahuatl-cob-numeral-preterit-agentive-frame"
    || cob.authorizationStatus !== "authorized"
    || operation.classifier !== "cob"
    || operation.countKind !== "ordinary"
    || operation.value < 20 || operation.value > 39
    || cob.canonicalPreteritAgentiveResultFrame !== child
    || resultFrame.sourceFrame.cobPreteritAgentiveResultFrame !== child
    || operation.numeralStemFormationFrame.cobPreteritAgentiveResultFrame !== child
    || cob.canonicalPreteritNncResultFrame !== child.canonicalResult
    || cob.canonicalPreteritSlotFrame !== projection.typedSlotFrame
    || cob.canonicalPreteritNumberFrame !== sourceNumber
    || cob.canonicalSelectedNncResultFrame !== selected
    || cob.canonicalSelectedSlotFrame !== selected.nncSlotFrame
    || cob.selectedNumberFrame !== number
    || cob.nounClass !== projection.nounClass
    || cob.nounClass !== operation.nounClass
    || cob.sourcePredicateStem !== projection.stem
    || cob.selectedPredicateStem !== operation.stem
    || cob.subject !== selected.nncSlotFrame.slots.subject.subject
    || cob.animacy !== resultFrame.sourceFrame.animacy
    || cob.countKind !== operation.countKind
    || cob.numeralValue !== operation.value
    || cob.principalNumeralValue !== 20
    || cob.numeralStemFormationFrame !== operation.numeralStemFormationFrame
    || cob.conjunctionFrame !== operation.conjunctionFrame
    || cob.reduplicationFrame !== operation.reduplicationFrame
    || cob.reduplication !== operation.reduplication
    || operation.conjunctionFrame.conjuncts[0].realizedStem !== operation.stem
    || !Object.keys(sourceNumber).every(key => key === "stem"
      || sourceNumber[key] === number[key])
    || Object.keys(sourceNumber).length !== Object.keys(number).length
    || cob.numberAnalysisPreserved !== true
    || cob.preteritResultRebuiltAsOrdinaryNoun !== false
    || cob.sourceAgreementChanged !== false
    || cob.formulaStringAuthority !== false
    || cob.surfaceStringAuthority !== false
    || (cob.reduplication === "none"
      ? selected !== child.canonicalResult || operation.stem !== projection.stem
      : !cob.reduplicationFrame
        || cob.reduplicationFrame.selectedMeaning !== cob.reduplication)
    || !Object.isFrozen(cob)) {
    return blocked("cardinal-nnc-cob-canonical-selected-result-required");
  }
  return { cob, projection, blockReason: "" };
}

function cardinalCitationCounterpartBlockReason(operationFrame) {
  if (operationFrame.downgradedConjunctionFrame) {
    return "cardinal-nnc-order-conjunction-restricted-counterpart-required";
  }
  if (operationFrame.conjunctionFrame?.conjoined
    && operationFrame.conjunctionFrame.selectedForm === "separate") {
    return "cardinal-nnc-separate-conjunction-restricted-counterpart-required";
  }
  if (operationFrame.measureComposition === "with-measured-nnc") {
    return "cardinal-nnc-measured-composition-restricted-counterpart-required";
  }
  if (operationFrame.cobPreteritAgentiveResultFrame
    && !operationFrame.cobNumeralFrame
    && !operationFrame.cobGrossFormationFrame
    && !operationFrame.cobGrossConjunctionFrame) {
    return "cardinal-nnc-cob-agentive-restricted-counterpart-required";
  }
  if (!operationFrame.numeralStemFormationFrame
    .retainedDerivationalConstituents) {
    return "cardinal-nnc-source-derivational-constituent-not-retained";
  }
  return "";
}

function getClassicalNahuatlBasicNumeralEmbedCitation(resultFrame = null, target = globalThis) {
  const citation = getClassicalNahuatlCardinalNncRestrictedUseCitationProjection(resultFrame, target);
  const analysis = citation.canonicalNumeralSourceAnalysisFrame;
  return isClassicalNahuatlCardinalNncRestrictedUseCitationProjection(citation, target)
    && citation.authorizationStatus === "authorized"
    && analysis?.classifier === "basic" && analysis.countKind === "ordinary"
    && [1, 2, 3, 4].includes(analysis.value)
    && resultFrame.operationFrame?.reduplication === "none"
    ? citation : null;
}

function getClassicalNahuatlCardinalNncRestrictedUseCitationProjection(
  resultFrame = null,
  target = globalThis
) {
  const blocked = blockReason => deepFreeze({
    kind: CARDINAL_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND,
    version: VERSION,
    authorizationStatus: "blocked",
    blockReason,
    stem: "",
    nounClass: "",
    projectionRole: "read-only-source-constituents",
    directSourceReentryAuthorized: false,
    grammarAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  if (
    !isClassicalNahuatlNominalConstructionResult(resultFrame)
    || resultFrame.authorizationStatus !== "authorized"
    || resultFrame.constructionKind !== "cardinal-numeral-nnc"
  ) {
    return blocked("issued-authorized-cardinal-nnc-result-required");
  }
  if (!hasCanonicalCardinalCitationAnalysis(resultFrame, target)) {
    return blocked("cardinal-nnc-canonical-use-stem-analysis-required");
  }
  const counterpartBlockReason = cardinalCitationCounterpartBlockReason(
    resultFrame.operationFrame
  );
  if (counterpartBlockReason) return blocked(counterpartBlockReason);
  const cobCitation = getCanonicalCobNumeralCitationAnalysis(resultFrame, target);
  if (cobCitation.blockReason) return blocked(cobCitation.blockReason);
  const existing = CARDINAL_NNC_RESTRICTED_USE_CITATION_PROJECTIONS.get(
    resultFrame
  );
  if (existing) return existing;
  const sourceFrame = resultFrame.sourceFrame;
  const operationFrame = resultFrame.operationFrame;
  const sourceAuthorizationFrame = resultFrame.sourceAuthorizationFrame;
  const typedSlotFrame = resultFrame.canonicalResult.nncSlotFrame;
  const canonicalNumeralSourceAnalysisFrame =
    sourceFrame.numeralSourceAnalysisFrame;
  const canonicalNumeralStemFormationFrame =
    sourceFrame.numeralStemFormationFrame;
  const stem = canonicalNumeralStemFormationFrame.citationStem;
  const nounClass = canonicalNumeralStemFormationFrame.nounClass;
  const predicateStructureFrame = cobCitation.grossConjunction || null;
  if (predicateStructureFrame
    && typeof target.realizeClassicalNahuatlNncSurfaceCarrier !== "function") {
    return blocked("cardinal-nnc-structured-citation-carrier-capability-required");
  }
  // The entire downgraded conjunction is part of this nounstem (§34.8.3).
  // Only OUTER clause features are excluded from citation. Its inner person,
  // state and earlier number positions remain protected (§35.14).
  const reduplicationSourceStem = predicateStructureFrame
    ? predicateStructureFrame.segments[0].orderedMorphs
      .filter(morph => !["0", "Ø", "⎕"].includes(morph)).join("-") : stem;
  const citationFormulaStem = predicateStructureFrame
    ? `${predicateStructureFrame.segments.map(segment => segment.orderedMorphs.join("-")).join("+")}-${predicateStructureFrame.matrixStem}`
    : stem;
  const citationWritingParts = predicateStructureFrame
    ? buildGrossConjunctionCitationParts(resultFrame, target) : null;
  const {
    internalPluralMorph,
    grossCount,
    citationNumberConstraint,
    stemProjectionAction,
  } = canonicalNumeralStemFormationFrame;
  // Citation removes no derivational constituent. Gross-count ix/x and
  // internal plural n/in remain distinct from the outer number dyad. Their
  // plural-subject restriction applies to a new NNC, not bare discussion
  // of the nounstem (Andrews 14.1, 16.1, 34.1, 34.3-34.6).
  const projection = deepFreeze({
    kind: CARDINAL_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND,
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    canonicalResultFrame: resultFrame,
    canonicalSourceFrame: sourceFrame,
    canonicalOperationFrame: operationFrame,
    canonicalSourceAuthorizationFrame: sourceAuthorizationFrame,
    typedSlotFrame,
    canonicalNumeralSourceAnalysisFrame,
    canonicalNumeralStemFormationFrame,
    canonicalCobNumeralFrame: cobCitation.cob,
    canonicalCobPreteritCitationProjection: cobCitation.projection,
    canonicalCobGrossFormationFrame: cobCitation.grossFormation || null,
    canonicalCobGrossConjunctionFrame: predicateStructureFrame,
    predicateStructureFrame, reduplicationSourceStem, citationFormulaStem, citationWritingParts,
    stem,
    nounClass,
    useKind: "restricted-use",
    useShape: "base",
    sourcePredicateStem: typedSlotFrame.slots.predicate.stem,
    internalPluralMorph,
    grossCount,
    citationNumberConstraint,
    stemProjectionAction,
    sourceAgreementChanged: false,
    sourceReferenceChanged: false,
    sourceDerivationChanged: false,
    sourceClauseFeaturesProjected: false,
    projectionScope: "isolated-nounstem",
    projectionRole: "read-only-source-constituents",
    continuationMode: "licensed-operation-only",
    directSourceReentryAuthorized: false,
    grammarAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  CARDINAL_NNC_RESTRICTED_USE_CITATION_RECEIPTS.set(projection, Object.freeze({
    resultFrame,
    sourceFrame,
    operationFrame,
    sourceAuthorizationFrame,
    typedSlotFrame,
    canonicalNumeralSourceAnalysisFrame,
    canonicalNumeralStemFormationFrame,
    canonicalCobNumeralFrame: cobCitation.cob,
    canonicalCobPreteritCitationProjection: cobCitation.projection,
    canonicalCobGrossFormationFrame: cobCitation.grossFormation || null,
    canonicalCobGrossConjunctionFrame: predicateStructureFrame,
    predicateStructureFrame, reduplicationSourceStem, citationFormulaStem, citationWritingParts,
    stem,
    nounClass,
    internalPluralMorph,
    grossCount,
    citationNumberConstraint,
    stemProjectionAction,
  }));
  CARDINAL_NNC_RESTRICTED_USE_CITATION_PROJECTIONS.set(resultFrame, projection);
  return projection;
}

function isClassicalNahuatlCardinalNncRestrictedUseCitationProjection(
  frame = null,
  target = globalThis
) {
  const receipt = frame && typeof frame === "object"
    ? CARDINAL_NNC_RESTRICTED_USE_CITATION_RECEIPTS.get(frame)
    : null;
  const cobCitation = receipt
    ? getCanonicalCobNumeralCitationAnalysis(receipt.resultFrame, target)
    : null;
  return Boolean(
    receipt
    && frame.kind === CARDINAL_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && frame.blockReason === ""
    && hasCanonicalCardinalCitationAnalysis(receipt.resultFrame, target)
    && !cardinalCitationCounterpartBlockReason(receipt.operationFrame)
    && !cobCitation.blockReason
    && frame.canonicalCobNumeralFrame === receipt.canonicalCobNumeralFrame
    && frame.canonicalCobNumeralFrame === cobCitation.cob
    && frame.canonicalCobPreteritCitationProjection
      === receipt.canonicalCobPreteritCitationProjection
    && frame.canonicalCobPreteritCitationProjection === cobCitation.projection
    && frame.canonicalCobGrossFormationFrame === receipt.canonicalCobGrossFormationFrame
    && frame.canonicalCobGrossFormationFrame === (cobCitation.grossFormation || null)
    && frame.canonicalCobGrossConjunctionFrame === (cobCitation.grossConjunction || null)
    && frame.canonicalCobGrossConjunctionFrame === receipt.canonicalCobGrossConjunctionFrame
    && frame.predicateStructureFrame === receipt.predicateStructureFrame
    && frame.predicateStructureFrame === frame.canonicalCobGrossConjunctionFrame
    && frame.reduplicationSourceStem === receipt.reduplicationSourceStem
    && frame.citationFormulaStem === receipt.citationFormulaStem
    && frame.citationWritingParts === receipt.citationWritingParts
    && frame.canonicalResultFrame === receipt.resultFrame
    && frame.canonicalSourceFrame === receipt.sourceFrame
    && frame.canonicalOperationFrame === receipt.operationFrame
    && frame.canonicalSourceAuthorizationFrame
      === receipt.sourceAuthorizationFrame
    && receipt.sourceFrame === receipt.resultFrame.sourceFrame
    && receipt.operationFrame === receipt.resultFrame.operationFrame
    && receipt.sourceAuthorizationFrame
      === receipt.resultFrame.sourceAuthorizationFrame
    && frame.typedSlotFrame === receipt.typedSlotFrame
    && receipt.typedSlotFrame
      === receipt.resultFrame.canonicalResult.nncSlotFrame
    && frame.canonicalNumeralSourceAnalysisFrame
      === receipt.canonicalNumeralSourceAnalysisFrame
    && frame.canonicalNumeralSourceAnalysisFrame
      === receipt.operationFrame.numeralSourceAnalysisFrame
    && frame.canonicalNumeralStemFormationFrame
      === receipt.canonicalNumeralStemFormationFrame
    && frame.canonicalNumeralStemFormationFrame
      === receipt.operationFrame.numeralStemFormationFrame
    && frame.stem === receipt.stem
    && frame.stem === receipt.canonicalNumeralStemFormationFrame.citationStem
    && frame.nounClass === receipt.nounClass
    && frame.nounClass === receipt.operationFrame.nounClass
    && frame.sourcePredicateStem === receipt.typedSlotFrame.slots.predicate.stem
    && frame.internalPluralMorph === receipt.internalPluralMorph
    && frame.grossCount === receipt.grossCount
    && frame.citationNumberConstraint === receipt.citationNumberConstraint
    && frame.stemProjectionAction === receipt.stemProjectionAction
    && frame.useKind === "restricted-use"
    && frame.useShape === "base"
    && frame.sourceAgreementChanged === false
    && frame.sourceReferenceChanged === false
    && frame.sourceDerivationChanged === false
    && frame.sourceClauseFeaturesProjected === false
    && frame.projectionScope === "isolated-nounstem"
    && frame.projectionRole === "read-only-source-constituents"
    && frame.continuationMode === "licensed-operation-only"
    && frame.directSourceReentryAuthorized === false
    && frame.grammarAuthority === false
    && frame.callerSuppliedAuthorityAccepted === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && Object.isFrozen(frame)
  );
}

function validateClassicalNahuatlIncorporatedNounRole(
  constructionFrame = null,
  claim = {}
) {
  const claimObject = claim && typeof claim === "object"
    && !Array.isArray(claim)
    ? claim
    : {};
  const allowedKeys = new Set(["claimedRole", "agentMentioned"]);
  const forbiddenKey = Reflect.ownKeys(claimObject).find(
    key => typeof key !== "string" || !allowedKeys.has(key)
  );
  const ownerIssued = isClassicalNahuatlNominalConstructionResult(
    constructionFrame
  );
  const operationFrame = ownerIssued ? constructionFrame.operationFrame : null;
  const incorporatedVnc = Boolean(
    ownerIssued
    && constructionFrame.constructionKind === "nominal-embed-vnc"
    && operationFrame.embedIsGrammaticalSubject === false
    && operationFrame.embedIsAgent === false
  );
  const selectedVoice = ownerIssued
    ? normalizeKey(operationFrame?.selectedVoice)
    : "";
  const nonactive = ["passive", "impersonal"].includes(selectedVoice);
  const relation = normalizeKey(operationFrame?.relation);
  const expectedRole = relation === "object"
    ? "incorporated-object"
    : relation === "complement"
      ? "incorporated-complement"
      : nonactive && ["means", "instrument"].includes(
        normalizeKey(operationFrame?.semanticRole)
      )
        ? "means-instrument"
        : "adverbial";
  const claimedRole = normalizeKey(claimObject.claimedRole);
  const agentMentioned = claimObject.agentMentioned === true;
  const roleLicensed = claimedRole === expectedRole;
  const agentBarrierSatisfied = !agentMentioned;
  const authorized = Boolean(
    !forbiddenKey
    && incorporatedVnc
    && [
      "incorporated-object",
      "adverbial",
      "means-instrument",
      "incorporated-complement",
    ].includes(claimedRole)
    && roleLicensed
    && agentBarrierSatisfied
  );
  const blockReason = forbiddenKey
    ? "incorporated-role-validation-accepts-role-context-only"
    : !ownerIssued
      ? "owner-issued-incorporated-vnc-result-required"
      : !incorporatedVnc
        ? "incorporated-nominal-vnc-result-required"
        : ["subject", "agent"].includes(claimedRole)
          ? "incorporated-noun-cannot-be-subject-or-agent"
        : !roleLicensed
            ? "incorporated-noun-role-does-not-match-typed-relation"
            : !agentBarrierSatisfied
              ? nonactive
                ? "passive-agent-mention-forbidden"
                : "incorporated-noun-cannot-be-subject-or-agent"
              : "";
  const frame = deepFreeze({
    kind: "classical-nahuatl-incorporated-noun-role-validation",
    version: VERSION,
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason,
    constructionFrame: ownerIssued ? constructionFrame : null,
    selectedVoice,
    relation,
    claimedRole,
    derivedRole: incorporatedVnc ? expectedRole : "",
    incorporatedNounIsSubject: false,
    incorporatedNounIsAgent: false,
    personalPronounSubjectPositionsPreserved: incorporatedVnc,
    passiveAgentMentionAllowed: false,
    agentMentioned,
    typedResultAuthority: true,
    translationAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    callerSuppliedAuthorityAccepted: false,
  });
  if (authorized) ISSUED_INCORPORATED_NOUN_ROLE_VALIDATIONS.add(frame);
  return frame;
}

function isClassicalNahuatlIncorporatedNounRoleValidation(frame = null) {
  return Boolean(
    ISSUED_INCORPORATED_NOUN_ROLE_VALIDATIONS.has(frame)
    && frame?.kind
      === "classical-nahuatl-incorporated-noun-role-validation"
    && frame.version === VERSION
    && frame.authorizationStatus === "authorized"
    && isClassicalNahuatlNominalConstructionResult(
      frame.constructionFrame
    )
    && frame.incorporatedNounIsSubject === false
    && frame.incorporatedNounIsAgent === false
    && frame.personalPronounSubjectPositionsPreserved === true
    && frame.passiveAgentMentionAllowed === false
    && frame.typedResultAuthority === true
    && frame.translationAuthority === false
    && frame.formulaStringAuthority === false
    && frame.surfaceStringAuthority === false
    && frame.callerSuppliedAuthorityAccepted === false
    && Object.isFrozen(frame)
  );
}

function buildParadigmPlan(request = {}, target = globalThis) {
  const hostilePath = findHostileAuthorityPath(
    request, "request", new WeakSet(),
    getNominalConstructionTrustedResultFrames(request)
  );
  const constructionKind = normalizeConstructionKind(request.constructionKind);
  if (hostilePath) {
    return buildBlockedFrame(
      constructionKind,
      `caller-supplied-derived-authority-rejected:${hostilePath}`,
      request
    );
  }
  if (!constructionKind) return buildBlockedFrame("", "recognized-typed-construction-kind-required", request);
  const requestedSubjects = Array.isArray(request.subjects) ? request.subjects : [];
  const defaultSubjects = constructionKind === "cardinal-numeral-nnc"
    ? normalizeKey(request.countKind || request.source?.countKind || "ordinary") === "gross"
      ? ["1pl", "2pl", "3pl"]
      : normalizeKey(request.animacy || request.source?.animacy || "nonanimate") === "nonanimate"
        ? ["3common"]
        : ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"]
    : ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"];
  const subjects = (requestedSubjects.length ? requestedSubjects : defaultSubjects).map(normalizeSubject).filter(Boolean);
  if (!subjects.length) {
    return buildBlockedFrame(
      constructionKind,
      "paradigm-subject-inventory-empty",
      request
    );
  }
  const vncConstruction = constructionKind === "nominal-embed-vnc"
    || (constructionKind === "cardinal-numeral-nnc"
      && normalizeKey(request.numeralOutputKind || "nnc") === "vnc-adverb")
    || (constructionKind === "affective-nnc"
      && normalizeKey(request.affectiveOutputKind || "nnc") === "denominal-vnc");
  const states = vncConstruction
    ? ["not-applicable"]
    : Array.isArray(request.states) && request.states.length
      ? request.states.map(normalizeKey)
      : [normalizeKey(request.state || "absolutive")];
  const coordinates = states.flatMap(state => subjects.map(subject => deepFreeze({
    coordinateId: `${state}:${subject}`,
    subject,
    state,
  })));
  const baseRequest = cloneNominalConstructionRequest(request);
  delete baseRequest.subject;
  delete baseRequest.subjects;
  delete baseRequest.states;
  const seedRequest = {
    ...cloneNominalConstructionRequest(baseRequest),
    subject: coordinates[0].subject,
  };
  if (coordinates[0].state !== "not-applicable") {
    seedRequest.state = coordinates[0].state;
  }
  const seed = evaluateNominalConstruction(seedRequest, target);
  const seedIsCanonicalSemanticRestriction = Boolean(
    seed.semanticRestrictionFrame?.restrictionEnforced === true
    && CANONICAL_SEMANTIC_RESTRICTION_IDS.includes(
      seed.semanticRestrictionFrame.restrictionId
    )
  );
  if (
    seed.authorizationStatus !== "authorized"
    && !seedIsCanonicalSemanticRestriction
  ) {
    return buildBlockedFrame(constructionKind, seed.blockReason, request);
  }
  const plan = deepFreeze({
    kind: "classical-nahuatl-nominal-construction-paradigm-plan",
    version: VERSION,
    constructionKind,
    curriculumLesson: String(
      CURRICULUM_LESSON_BY_CONSTRUCTION[constructionKind]
    ),
    lessonMetadataAuthorizesOutput: false,
    authorizationStatus: "authorized",
    blockReason: "",
    preparedSourceFrame: seed.sourceFrame,
    preparedOperationFrame: seed.operationFrame,
    greatestCommonDivisor: seed.greatestCommonDivisor,
    leastCommonMultiple: buildSelectedLcmFrame(
      seedRequest,
      seed,
      "paradigm"
    ),
    coordinates,
    coordinateCount: coordinates.length,
    scalarEvaluatorIdentity: "evaluateClassicalNahuatlNominalConstruction",
    callerSuppliedCoordinateAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  ISSUED_PARADIGM_PLANS.add(plan);
  PARADIGM_PLAN_CONTEXTS.set(plan, deepFreeze({ baseRequest }));
  return plan;
}

function isClassicalNahuatlNominalConstructionParadigmPlan(plan = null) {
  return Boolean(
    ISSUED_PARADIGM_PLANS.has(plan)
    && plan?.kind === "classical-nahuatl-nominal-construction-paradigm-plan"
    && plan.version === VERSION
    && plan.authorizationStatus === "authorized"
    && Array.isArray(plan.coordinates)
    && plan.coordinates.length > 0
    && plan.coordinateCount === plan.coordinates.length
    && plan.greatestCommonDivisor?.satisfied === true
    && plan.leastCommonMultiple?.licensedAxisSetComplete === true
    && plan.callerSuppliedCoordinateAuthorityAccepted === false
    && plan.formulaStringAuthority === false
    && plan.surfaceStringAuthority === false
    && Object.isFrozen(plan)
  );
}

function projectParadigm(plan = null, coordinates = null, target = globalThis) {
  if (!ISSUED_PARADIGM_PLANS.has(plan)
    || !plan
    || plan.kind !== "classical-nahuatl-nominal-construction-paradigm-plan"
    || plan.authorizationStatus !== "authorized") {
    return Object.freeze([]);
  }
  const selected = Array.isArray(coordinates) && coordinates.length ? coordinates : plan.coordinates;
  const planContext = PARADIGM_PLAN_CONTEXTS.get(plan);
  return Object.freeze(selected.map(coordinate => {
    const hostilePath = findHostileAuthorityPath(coordinate);
    if (hostilePath) {
      return buildBlockedFrame(
        plan.constructionKind,
        `caller-supplied-derived-authority-rejected:${hostilePath}`,
        coordinate
      );
    }
    const coordinateId = normalizeToken(coordinate.coordinateId);
    const planned = plan.coordinates.find(item => item.coordinateId === coordinateId)
      || plan.coordinates.find(item => item.subject === normalizeSubject(coordinate.subject)
        && item.state === normalizeKey(coordinate.state || "not-applicable"));
    if (!planned) {
      return buildBlockedFrame(
        plan.constructionKind,
        "coordinate-not-present-in-canonical-plan",
        coordinate
      );
    }
    const scalarRequest = {
      ...cloneNominalConstructionRequest(planContext.baseRequest),
      subject: planned.subject,
    };
    if (planned.state !== "not-applicable") scalarRequest.state = planned.state;
    const scalarFrame = evaluateNominalConstruction(scalarRequest, target);
    const result = Object.freeze({
      kind: "classical-nahuatl-nominal-construction-paradigm-coordinate-frame",
      version: VERSION,
      constructionKind: plan.constructionKind,
      curriculumLesson: plan.curriculumLesson,
      lessonMetadataAuthorizesOutput: false,
      coordinateId: planned.coordinateId,
      subject: planned.subject,
      state: planned.state,
      authorizationStatus: scalarFrame.authorizationStatus,
      blockReason: scalarFrame.blockReason,
      scalarFrame,
      scalarEquivalent: true,
      greatestCommonDivisor: scalarFrame.greatestCommonDivisor,
      leastCommonMultiple: scalarFrame.leastCommonMultiple,
      formulaRealization: scalarFrame.formulaRealization || "",
      wordSurface: scalarFrame.wordSurface || "",
      sentenceSurface: scalarFrame.sentenceSurface || "",
      callerSuppliedCoordinateAuthorityAccepted: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    if (
      result.authorizationStatus === "authorized"
      && result.scalarEquivalent === true
      && isClassicalNahuatlNominalConstructionResult(result.scalarFrame)
    ) {
      ISSUED_PARADIGM_COORDINATES.add(result);
    }
    return result;
  }));
}

function isClassicalNahuatlNominalConstructionParadigmCoordinate(
  coordinate = null
) {
  return Boolean(
    ISSUED_PARADIGM_COORDINATES.has(coordinate)
    && coordinate?.kind
      === "classical-nahuatl-nominal-construction-paradigm-coordinate-frame"
    && coordinate.version === VERSION
    && coordinate.authorizationStatus === "authorized"
    && coordinate.scalarEquivalent === true
    && isClassicalNahuatlNominalConstructionResult(
      coordinate.scalarFrame
    )
    && coordinate.formulaRealization
      === coordinate.scalarFrame.formulaRealization
    && coordinate.wordSurface === coordinate.scalarFrame.wordSurface
    && coordinate.sentenceSurface === coordinate.scalarFrame.sentenceSurface
    && coordinate.callerSuppliedCoordinateAuthorityAccepted === false
    && coordinate.formulaStringAuthority === false
    && coordinate.surfaceStringAuthority === false
    && Object.isFrozen(coordinate)
  );
}

function buildUiProjection(frame = null) {
  if (!isClassicalNahuatlNominalConstructionResult(frame)) return null;
  const projection = deepFreeze({
    kind: "classical-nahuatl-nominal-construction-ui-projection",
    version: VERSION,
    authorizationStatus: frame.authorizationStatus,
    blockReason: frame.blockReason,
    source: {
      panel: "#1 Source",
      constructionKind: frame.constructionKind || "",
      typedSourceKind: frame.sourceFrame?.kind || "",
      lexicalFacts:
        frame.sourceAuthorizationFrame?.lexicalFacts || {},
      readOnly: true,
    },
    grammar: {
      panel: "#2 Grammar",
      gcd: GCD_IDENTITY,
      operationKind: frame.operationFrame?.kind || "",
      derivedStem:
        frame.operationFrame?.compoundStem
        || frame.operationFrame?.targetStem
        || frame.operationFrame?.stem
        || "",
      derivedClass: frame.operationFrame?.matrixClass || frame.operationFrame?.nounClass || "",
      derivedValence:
        frame.operationFrame?.targetSourceValence
        || frame.canonicalResult?.finalTypedVncSlotFrame?.slots?.prePredicate?.length
        || "",
      readOnly: true,
    },
    result: {
      panel: "#3 Result",
      formulaRealization: frame.formulaRealization || "",
      wordSurface: frame.wordSurface || "",
      sentenceSurface: frame.sentenceSurface || "",
      readOnly: true,
    },
    sourceTextAuthority: false,
    displayTextAuthority: false,
    formulaStringAuthority: false,
  });
  ISSUED_UI_PROJECTIONS.add(projection);
  UI_PROJECTION_CONTEXTS.set(projection, frame);
  return projection;
}

function isClassicalNahuatlNominalConstructionUiProjection(
  projection = null
) {
  const frame = UI_PROJECTION_CONTEXTS.get(projection);
  return Boolean(
    ISSUED_UI_PROJECTIONS.has(projection)
    && projection?.kind
      === "classical-nahuatl-nominal-construction-ui-projection"
    && projection.version === VERSION
    && isClassicalNahuatlNominalConstructionResult(frame)
    && projection.authorizationStatus === frame.authorizationStatus
    && projection.blockReason === frame.blockReason
    && projection.source?.constructionKind === frame.constructionKind
    && projection.source?.typedSourceKind === frame.sourceFrame?.kind
    && projection.grammar?.operationKind === frame.operationFrame?.kind
    && projection.result?.formulaRealization === frame.formulaRealization
    && projection.result?.wordSurface === frame.wordSurface
    && projection.result?.sentenceSurface === frame.sentenceSurface
    && projection.sourceTextAuthority === false
    && projection.displayTextAuthority === false
    && projection.formulaStringAuthority === false
    && Object.isFrozen(projection)
  );
}

function getClassicalNahuatlFlawedSubjectSourceFacts(request = {}, exactParentResult = null, target = globalThis) {
  const source = {...(request.source || {})};
  const sourceStem = normalizeStem(source.embedStem);
  const sourceClass = normalizeNounClass(source.embedClass || source.embedSourceClass);
  const matrix = normalizeKey(request.affectiveMatrix || source.affectiveMatrix);
  const blocked = blockReason => deepFreeze({
    kind: "classical-nahuatl-affective-source-facts", authorizationStatus: "blocked",
    blockReason, sourceStem, sourceClass, status: "blocked", availability: "unclaimed",
    availableRoutes: [], availableLexicalReadings: [], availableDefectReadings: [],
    availableAffectiveSourceReadings: [], flawedSubjectAnalysis: null,
    affectiveLexicalAnalysis: null, factsReadOnly: true,
  });
  if (normalizeConstructionKind(request.constructionKind) !== "affective-nnc") {
    return blocked("affective-source-facts-construction-required");
  }
  if (!sourceStem || !sourceClass) return blocked("affective-source-stem-and-class-required");
  if (source.contextualFlawedSubjectSourceFrame !== undefined) {
    const authorization = issueClassicalNahuatlNominalConstructionSourceAuthorization(request, target);
    if (!isClassicalNahuatlNominalConstructionSourceAuthorization(authorization)) {
      return blocked(authorization.blockReason || "issued-contextual-flawed-subject-source-required");
    }
    const context = authorization.lexicalFacts.contextualFlawedSubjectSourceFrame;
    if (!context) return blocked("issued-contextual-flawed-subject-source-required");
    return deepFreeze({
      kind: "classical-nahuatl-affective-source-facts", authorizationStatus: "authorized", blockReason: "",
      sourceStem, sourceClass, status: "contextual-source-analysis", availability: "contextual",
      semanticDomain: "contextual-negative-possibility", neutralStemClass: "tl",
      flawedStemClassStrategy: "irregular-silent-num1", defectEntityAmbiguous: false,
      availableDefectReadings: [], availableLexicalReadings: [], selectedLexicalReading: "",
      selectedDefectAnalysis: "none", defaultDefectAnalysis: "none",
      availableRoutes: ["flawed-subject"], selectedRouteLicensed: request.affectRoute === "flawed-subject",
      routeChoiceRequired: false, compoundFlawedSubjectRequired: false,
      subject: "3common", state: "absolutive", animacy: "unspecified",
      subjectReferenceStatus: "unclaimed", participantSelectionRequired: false,
      contextualFlawedSubjectSourceFrame: context,
      flawedSubjectAnalysis: null, flawedSubjectAnalysisFrame: authorization.lexicalFacts.flawedSubjectAnalysisFrame,
      affectiveLexicalAnalysis: null, affectiveLexicalAnalysisFrame: null,
      availableAffectiveSourceReadings: ["ordinary-affective"], selectedReading: "ordinary-affective",
      defaultReading: "ordinary-affective", availableAffectiveSourceReadingOptions: [],
      positiveHueliAnalysis: "unclaimed", factsReadOnly: true,
    });
  }
  if (exactParentResult) {
    const nominalParent = isClassicalNahuatlNominalConstructionResult(exactParentResult)
      && exactParentResult.authorizationStatus === "authorized";
    const ordinaryParent = target.isClassicalNahuatlOrdinaryNncResult?.(exactParentResult) === true
      && exactParentResult.authorizationStatus === "authorized";
    const pronominalParent = target.isClassicalNahuatlPronominalNncResult?.(exactParentResult) === true
      && exactParentResult.authorizationStatus === "authorized";
    if (!nominalParent && !ordinaryParent && !pronominalParent) {
      return blocked("issued-authorized-affective-source-parent-required");
    }
    const parentRequest = nominalParent ? NOMINAL_CONSTRUCTION_REQUESTS.get(exactParentResult) : null;
    const parentSource = parentRequest?.source;
    if (normalizeStem(parentSource?.embedStem) === sourceStem
      && normalizeNounClass(parentSource?.embedClass) === sourceClass
      && normalizeKey(parentRequest?.affectiveMatrix || parentSource?.affectiveMatrix) === matrix) {
      for (const field of ["flawedSubjectAnalysis", "affectiveLexicalAnalysis"]) {
        if (!source[field] && parentSource[field]) source[field] = parentSource[field];
      }
    }
  }
  if (source.flawedSubjectAnalysis || source.affectiveLexicalAnalysis) {
    const suppliedAuthorization = issueClassicalNahuatlNominalConstructionSourceAuthorization(
      {...request, source}, target);
    if (!isClassicalNahuatlNominalConstructionSourceAuthorization(suppliedAuthorization)) {
      return blocked(suppliedAuthorization.blockReason || "affective-source-authorization-required");
    }
  }
  // Exact lexical facts supplement the productive typed analysis contract.
  // This inventory is not an admission whitelist for ordinary affective Sources.
  const records = {
    "nacaz-tzatza": {sourceClass: "tl", domain: "abnormal-or-defective-entity"},
    tzapa: {sourceClass: "tl", domain: "abnormal-or-defective-entity"},
    "ix-po-poy-ō": {sourceClass: "tl", domain: "abnormal-or-defective-entity"},
    "īx-cuitla": {sourceClass: "tl", domain: "abnormal-or-defective-entity",
      ambiguous: true, defaultDefectAnalysis: "entity"},
    "ix-cuitla": {sourceClass: "tl", domain: "abnormal-or-defective-entity",
      ambiguous: true, defaultDefectAnalysis: "defect"},
    "ix-te-coh-coy-o-c": {sourceClass: "tli", domain: "abnormal-or-defective-entity",
      ambiguous: true, defaultDefectAnalysis: "defect"},
    tepi: {sourceClass: "zero", domain: "abnormal-or-defective-entity",
      availability: "obligatory", strategy: "source-zero-class"},
    tecpin: {sourceClasses: ["tli", "zero"], domain: "repugnant-or-disagreeable-entity",
      strategy: sourceClass === "zero" ? "source-zero-class" : "zero-alternative"},
    "cuā-naca": {sourceClass: "tl", domain: "lexicalized-flawed-subject",
      availability: "obligatory", lexicalReadings: ["comb", "chicken", "rooster", "hen"]},
  };
  const record = records[sourceStem] || null;
  const suppliedFlawedAnalysis = source.flawedSubjectAnalysis || null;
  const availableLexicalReadings = record?.lexicalReadings
    || (suppliedFlawedAnalysis?.lexicalReading ? [suppliedFlawedAnalysis.lexicalReading] : []);
  const selectedLexicalReading = normalizeKey(request.flawedLexicalReading
    || suppliedFlawedAnalysis?.lexicalReading || availableLexicalReadings[0] || "");
  if (selectedLexicalReading && !availableLexicalReadings.includes(selectedLexicalReading)) {
    return blocked("affective-source-lexical-reading-not-licensed");
  }
  const defectEntityAmbiguous = suppliedFlawedAnalysis
    ? suppliedFlawedAnalysis.defectEntityAmbiguous === true : record?.ambiguous === true;
  const defaultDefectAnalysis = record?.defaultDefectAnalysis || "entity";
  const selectedDefectAnalysis = normalizeKey(request.defectAnalysis || defaultDefectAnalysis);
  const availableDefectReadings = defectEntityAmbiguous ? ["defect", "entity"] : [];
  if (defectEntityAmbiguous && !availableDefectReadings.includes(selectedDefectAnalysis)) {
    return blocked("affective-source-defect-reading-not-licensed");
  }
  const lexicalMeaningChanged = Boolean(record?.lexicalReadings
    && request.flawedLexicalReading
    && selectedLexicalReading !== suppliedFlawedAnalysis?.lexicalReading);
  let flawedSubjectAnalysis = lexicalMeaningChanged
    || (defectEntityAmbiguous && selectedDefectAnalysis === "defect")
    ? null : suppliedFlawedAnalysis;
  if (!flawedSubjectAnalysis && record) {
    const sourceClasses = record.sourceClasses || [record.sourceClass];
    if (!sourceClasses.includes(sourceClass)) return blocked("flawed-subject-source-class-mismatch");
    if (selectedLexicalReading !== "comb"
      && (!defectEntityAmbiguous || selectedDefectAnalysis === "entity")) {
      flawedSubjectAnalysis = {
        lexicalStatus: "flawed-subject-lexical-analysis", sourceStem,
        availability: record.availability || "optional", semanticDomain: record.domain,
        defectEntityAmbiguous, neutralStemClass: sourceClass,
        flawedStemClassStrategy: record.strategy || "irregular-silent-num1",
        ...(selectedLexicalReading ? {lexicalReading: selectedLexicalReading, usuallyRooster: true} : {}),
      };
    }
  }
  const suppliedLexicalAnalysis = source.affectiveLexicalAnalysis || null;
  const documentedLexicalFact = (sourceStem === "quimich" && matrix === "tōn")
    || (sourceStem === "te-coma" && ["tzin", "tōn"].includes(matrix))
    || (sourceStem === "eh-huā" && matrix === "tzin" && sourceClass !== "zero");
  const usesAffectiveMatrix = normalizeKey(request.affectRoute || "compound") === "compound"
    && !getAffectivePilAffinityContext(request, source).simpleLexemeFormation;
  const meaningContrastAvailable = usesAffectiveMatrix && ["pil", "pōl"].includes(matrix);
  const availableAffectiveSourceReadings = meaningContrastAvailable
    ? ["ordinary-affective", "lexicalized-special-meaning"]
    : [suppliedLexicalAnalysis?.lexicalizedSpecialMeaning
      ? "lexicalized-special-meaning" : "ordinary-affective"];
  const selectedReading = normalizeKey(request.affectiveSourceReading
    || (suppliedLexicalAnalysis?.lexicalizedSpecialMeaning ? "lexicalized-special-meaning" : "ordinary-affective"));
  if (!availableAffectiveSourceReadings.includes(selectedReading)) {
    return blocked("affective-source-special-meaning-reading-not-licensed");
  }
  let affectiveLexicalAnalysis = suppliedLexicalAnalysis;
  if (suppliedLexicalAnalysis && request.affectiveSourceReading
    && (suppliedLexicalAnalysis.lexicalizedSpecialMeaning === true)
      !== (selectedReading === "lexicalized-special-meaning")) {
    const specialMeaning = selectedReading === "lexicalized-special-meaning";
    const preserved = {...suppliedLexicalAnalysis,
      lexicalizedSpecialMeaning: specialMeaning,
      classException: specialMeaning ? false : suppliedLexicalAnalysis.classException === true,
      irregularSilentNum1: specialMeaning ? false : suppliedLexicalAnalysis.irregularSilentNum1 === true,
      resultClass: specialMeaning ? "tli"
        : suppliedLexicalAnalysis.classException ? suppliedLexicalAnalysis.resultClass : "",
    };
    affectiveLexicalAnalysis = preserved.lexicalizedSpecialMeaning || preserved.classException
      || preserved.irregularSilentNum1 || preserved.embedVariantStem ? preserved : null;
  }
  if (!affectiveLexicalAnalysis) {
    const specialMeaning = selectedReading === "lexicalized-special-meaning";
    const mouseException = sourceStem === "quimich" && matrix === "tōn";
    const jarVariant = sourceStem === "te-coma" && ["tzin", "tōn"].includes(matrix);
    const entitySilence = sourceStem === "eh-huā" && matrix === "tzin" && sourceClass !== "zero";
    if (specialMeaning || mouseException || jarVariant || entitySilence) {
      affectiveLexicalAnalysis = {
        lexicalStatus: "affective-compound-lexical-analysis", embedStem: sourceStem,
        matrixStem: matrix, lexicalizedSpecialMeaning: specialMeaning,
        classException: mouseException && !specialMeaning,
        resultClass: specialMeaning ? "tli" : mouseException ? "zero" : "",
        ...(jarVariant ? {embedVariantStem: "te-con", variantKind: "irregular-compound-embed"} : {}),
        ...(entitySilence && !specialMeaning ? {irregularSilentNum1: true} : {}),
      };
    }
  }
  const effectiveSource = {...source};
  delete effectiveSource.flawedSubjectAnalysis;
  delete effectiveSource.affectiveLexicalAnalysis;
  if (flawedSubjectAnalysis) effectiveSource.flawedSubjectAnalysis = flawedSubjectAnalysis;
  if (affectiveLexicalAnalysis) effectiveSource.affectiveLexicalAnalysis = affectiveLexicalAnalysis;
  const authorization = issueClassicalNahuatlNominalConstructionSourceAuthorization(
    {...request, source: effectiveSource}, target);
  if (!isClassicalNahuatlNominalConstructionSourceAuthorization(authorization)) {
    return blocked(authorization.blockReason || "affective-source-authorization-required");
  }
  const analysis = authorization.lexicalFacts.flawedSubjectAnalysisFrame;
  const plural = normalizeSubject(request.subject || "3sg")?.endsWith("pl") === true;
  const availableRoutes = [
    ...(analysis && analysis.availability !== "obligatory" ? ["ordinary-subject"] : []),
    ...(analysis && !plural && normalizeKey(request.state || "absolutive") === "absolutive"
      ? ["flawed-subject"] : []),
    "compound",
  ];
  const compoundFlawedSubjectRequired = Boolean(analysis
    && (!analysis.defectEntityAmbiguous || selectedDefectAnalysis === "entity")
    && normalizeKey(request.affectRoute || "compound") === "compound"
    && ["tzin", "tōn"].includes(matrix)
    && normalizeKey(request.state || "absolutive") === "absolutive" && !plural);
  return deepFreeze({
    kind: "classical-nahuatl-affective-source-facts", authorizationStatus: "authorized", blockReason: "",
    sourceStem, sourceClass, status: suppliedFlawedAnalysis || suppliedLexicalAnalysis
      ? "typed-source-analysis" : record || documentedLexicalFact ? "documented"
      : selectedReading === "lexicalized-special-meaning" ? "source-interpretation" : "unclaimed",
    availability: analysis?.availability || "unclaimed", semanticDomain: analysis?.semanticDomain || "unclaimed",
    neutralStemClass: analysis?.neutralStemClass || sourceClass,
    flawedStemClassStrategy: analysis?.flawedStemClassStrategy || null,
    defectEntityAmbiguous, availableDefectReadings, defaultDefectAnalysis, selectedDefectAnalysis,
    availableLexicalReadings, selectedLexicalReading, usuallyRooster: analysis?.usuallyRooster === true,
    availableRoutes,
    selectedRouteLicensed: availableRoutes.includes(normalizeKey(request.affectRoute || "compound")),
    routeChoiceRequired: availableRoutes.length > 1, compoundFlawedSubjectRequired,
    flawedSubjectAnalysis, flawedSubjectAnalysisFrame: analysis || null,
    affectiveLexicalAnalysis,
    affectiveLexicalAnalysisFrame: authorization.lexicalFacts.affectiveLexicalAnalysisFrame || null,
    availableAffectiveSourceReadings, defaultReading: "ordinary-affective", selectedReading,
    availableAffectiveSourceReadingOptions: [
      {value: "ordinary-affective", label: sourceStem === "cal" && matrix === "pōl" ? "Big house" : "Ordinary affective meaning"},
      {value: "lexicalized-special-meaning", label: sourceStem === "cal" && matrix === "pōl" ? "City district" : "Special lexical meaning"},
    ].filter(option => availableAffectiveSourceReadings.includes(option.value)),
    fixedEmbedVariantStem: affectiveLexicalAnalysis?.embedVariantStem || "",
    factsReadOnly: true,
  });
}

function getClassicalNahuatlCompoundSexSourceFacts(source = {}) {
  const sourceStem = normalizeStem(source.embedStem);
  const knownSex = COMPOUND_SEX_EMBED_MEANINGS[sourceStem] || "";
  const supplied = source.sexEmbedAnalysis;
  const allowed = new Set(["lexicalStatus", "sourceStem", "sexValue", "referentClass", "neutralWithoutSex"]);
  const invalid = supplied !== undefined && supplied !== null && (
    typeof supplied !== "object" || Array.isArray(supplied)
    || Reflect.ownKeys(supplied).some(key => typeof key !== "string" || !allowed.has(key))
    || normalizeKey(supplied.lexicalStatus) !== "sex-distinction-embed"
    || normalizeStem(supplied.sourceStem) !== sourceStem
    || !["male", "female"].includes(normalizeKey(supplied.sexValue))
    || normalizeKey(supplied.referentClass) !== "animate"
    || supplied.neutralWithoutSex !== true
    || (knownSex && normalizeKey(supplied.sexValue) !== knownSex)
  );
  const sexValue = invalid ? "" : knownSex || normalizeKey(supplied?.sexValue);
  return deepFreeze({
    kind: "classical-nahuatl-compound-sex-source-facts",
    authorizationStatus: invalid ? "blocked" : "authorized",
    blockReason: invalid ? "typed-sex-distinction-embed-analysis-mismatch" : "",
    sourceStem, sexValue,
    meaningAuthority: invalid ? "blocked" : knownSex ? "known-source-meaning"
      : supplied ? "typed-source-analysis" : "unclaimed",
    sexEmbedAnalysis: sexValue ? {
      lexicalStatus: "sex-distinction-embed", sourceStem, sexValue,
      referentClass: "animate", neutralWithoutSex: true,
    } : null,
    factsReadOnly: true, productiveRouteAuthority: false,
  });
}

function getClassicalNahuatlNominalAffinitySourceFacts(request = {}, exactParentResult = null, target = globalThis) {
  const constructionKind = normalizeConstructionKind(request.constructionKind);
  const source = request.source || {};
  const blocked = blockReason => deepFreeze({
    kind: "classical-nahuatl-nominal-affinity-source-facts", constructionKind,
    authorizationStatus: "blocked", blockReason, availableTargets: [],
    affinityScopeAnalysis: null, affectiveAffinityAnalysis: null, factsReadOnly: true,
  });
  if (!["compound-nnc", "affective-nnc"].includes(constructionKind)) {
    return blocked("nominal-affinity-source-construction-required");
  }
  if (exactParentResult && (!isClassicalNahuatlNominalConstructionResult(exactParentResult)
    || exactParentResult.authorizationStatus !== "authorized")) {
    return blocked("issued-authorized-nominal-affinity-parent-required");
  }
  const parentRequest = exactParentResult ? NOMINAL_CONSTRUCTION_REQUESTS.get(exactParentResult) : null;
  const parentSource = parentRequest?.source;
  const matchingParentSource = parentRequest?.constructionKind === constructionKind
    && normalizeStem(parentSource?.embedStem) === normalizeStem(source.embedStem)
    && (constructionKind === "compound-nnc"
      ? normalizeStem(parentSource?.matrixStem) === normalizeStem(source.matrixStem)
      : normalizeKey(parentRequest.affectiveMatrix || parentSource?.affectiveMatrix)
        === normalizeKey(request.affectiveMatrix || source.affectiveMatrix));
  const effectiveSource = {...source};
  if (matchingParentSource) {
    for (const field of ["affinityScopeAnalysis", "affectiveAffinityAnalysis"]) {
      if (!effectiveSource[field] && parentSource[field]) effectiveSource[field] = parentSource[field];
    }
  }
  const authorization = issueClassicalNahuatlNominalConstructionSourceAuthorization(
    {...request, source: effectiveSource}, target);
  if (!isClassicalNahuatlNominalConstructionSourceAuthorization(authorization)) {
    return blocked(authorization.blockReason || "nominal-affinity-source-authorization-required");
  }
  const compoundAnalysis = authorization.lexicalFacts.affinityScopeAnalysisFrame || null;
  const affectiveAnalysis = authorization.lexicalFacts.affectiveAffinityAnalysisFrame || null;
  const affinityScopeAnalysis = compoundAnalysis ? {
    lexicalStatus: "compound-affinity-scope", embedStem: compoundAnalysis.embedStem,
    matrixStem: compoundAnalysis.matrixStem, availableTargets: [...compoundAnalysis.availableTargets],
    lexicalRequirement: compoundAnalysis.lexicalRequirement,
  } : null;
  const affectiveAffinityAnalysis = affectiveAnalysis ? {
    lexicalStatus: "affective-affinity-scope-analysis", embedStem: affectiveAnalysis.embedStem,
    matrixStem: affectiveAnalysis.matrixStem, embedAffinityRequirement: affectiveAnalysis.embedAffinityRequirement,
    embedAffinityTarget: affectiveAnalysis.embedAffinityTarget,
  } : null;
  const pil = getAffectivePilAffinityContext(request, effectiveSource);
  if (constructionKind === "affective-nnc" && pil.reading && !pil.lexemeAtFinalBoundary) {
    return blocked("pil-lexeme-reading-requires-typed-pil-source");
  }
  const availableTargets = constructionKind === "compound-nnc"
    ? compoundAnalysis?.availableTargets || ["embed", "matrix", "both"]
    : pil.childDoubleAffinity ? ["both"]
    : pil.simpleLexemeFormation ? ["pil-lexeme"]
    : affectiveAnalysis?.availableTargets || ["matrix"];
  return deepFreeze({
    kind: "classical-nahuatl-nominal-affinity-source-facts", constructionKind,
    authorizationStatus: "authorized", blockReason: "", availableTargets,
    lexicalRequirement: compoundAnalysis?.lexicalRequirement || "unclaimed",
    embedAffinityRequirement: pil.childDoubleAffinity ? "obligatory-by-pil-child-grammar"
      : pil.simpleLexemeFormation ? "simple-pil-affinity"
      : affectiveAnalysis?.embedAffinityRequirement || "unclaimed",
    embedAffinityTarget: pil.reading ? normalizeStem(effectiveSource.embedStem).endsWith("-pil")
      ? "matrix" : "initial" : affectiveAnalysis?.embedAffinityTarget || null,
    targetChoiceRequired: constructionKind === "compound-nnc"
      ? compoundAnalysis?.targetChoiceRequired ?? true
      : !pil.childDoubleAffinity && !pil.simpleLexemeFormation && affectiveAnalysis?.targetChoiceRequired === true,
    optionalEmbedChoiceAvailable: constructionKind === "affective-nnc"
      && !pil.childDoubleAffinity && !pil.simpleLexemeFormation
      && affectiveAnalysis?.embedAffinityRequirement === "optional",
    affinityScopeAnalysis, affectiveAffinityAnalysis,
    affinityScopeAnalysisFrame: compoundAnalysis, affectiveAffinityAnalysisFrame: affectiveAnalysis,
    factsReadOnly: true,
  });
}

export function installClassicalNahuatlNominalConstructionGlobals(targetObject = globalThis, installationContext = {}) {
  const exportedTarget = targetObject && typeof targetObject === "object" ? targetObject : globalThis;
  const target = Object.create(exportedTarget);
  Object.defineProperties(target, Object.getOwnPropertyDescriptors(
    installationContext?.moduleDependencyCapabilities || {}
  ));
  const api = {
    CLASSICAL_NAHUATL_NOMINAL_EMBED_ADVERB_ROLES: NOMINAL_EMBED_ADVERB_ROLES,
    CLASSICAL_NAHUATL_NOMINAL_COMPOUND_EMBED_ROLES: NOMINAL_COMPOUND_EMBED_ROLES,
    CLASSICAL_NAHUATL_AFFECTIVE_NOMINAL_MATRICES: AFFECTIVE_NOMINAL_MATRICES,
    CLASSICAL_NAHUATL_CARDINAL_NOMINAL_CLASSIFIERS: CARDINAL_NOMINAL_CLASSIFIERS,
    validateClassicalNahuatlClosedConstructionException,
    isClassicalNahuatlClosedConstructionExceptionValidation,
    isClassicalNahuatlNominalConstructionSourceAuthorization,
    buildClassicalNahuatlAffectiveDenominalSourceFrame: request =>
      buildAffectiveDenominalSourceFrame(
        request, request.source || {}, normalizeStem(request.affectiveMatrix)
      ),
    isClassicalNahuatlAffectiveDenominalSourceFrame: isAffectiveDenominalSourceFrame,
    isClassicalNahuatlNominalVncMatrixCoordinateFrame,
    reissueClassicalNahuatlNominalVncMatrixCoordinate:
      (result, choices) => reissueClassicalNahuatlNominalVncMatrixCoordinate(result, choices, target),
    isClassicalNahuatlNominalConstructionTypedSourceFrame:
      frame => isClassicalNahuatlNominalConstructionTypedSourceFrame(
        frame,
        target
      ),
    buildClassicalNahuatlNominalConstructionTypedSourceFrame:
      source => buildClassicalNahuatlNominalConstructionTypedSourceFrame(source,target),
    issueClassicalNahuatlNominalConstructionTypedSourceBindingFrame:
      (frame, selections) => (
        issueClassicalNahuatlNominalConstructionTypedSourceBindingFrame(
          frame,
          selections,
          target
        )
      ),
    isClassicalNahuatlNominalConstructionTypedSourceBindingFrame:
      frame => (
        isClassicalNahuatlNominalConstructionTypedSourceBindingFrame(
          frame,
          target
        )
      ),
    evaluateClassicalNahuatlNominalConstruction:
      request => evaluateNominalConstructionRequest(request, target),
    getClassicalNahuatlCompoundSexSourceFacts,
    getClassicalNahuatlNominalAffinitySourceFacts:
      (request, exactParentResult) => getClassicalNahuatlNominalAffinitySourceFacts(request, exactParentResult, target),
    getClassicalNahuatlFlawedSubjectSourceFacts:
      (request, exactParentResult) => getClassicalNahuatlFlawedSubjectSourceFacts(request, exactParentResult, target),
    issueClassicalNahuatlContextualFlawedSubjectSourceFrame:
      (source, negativeSelection) => issueClassicalNahuatlContextualFlawedSubjectSourceFrame(source, negativeSelection, target),
    isClassicalNahuatlContextualFlawedSubjectSourceFrame:
      frame => isClassicalNahuatlContextualFlawedSubjectSourceFrame(frame, target),
    getClassicalNahuatlNominalNncSentenceContext:
      slot => getClassicalNahuatlNominalNncSentenceContext(slot, target),
    issueClassicalNahuatlPatientiveEmbedConstituentFrame:
      capture => issueClassicalNahuatlPatientiveEmbedConstituentFrame(capture, target),
    isClassicalNahuatlPatientiveEmbedConstituentFrame,
    issueClassicalNahuatlPatientiveMatrixConstituentFrame:
      capture => issueClassicalNahuatlPatientiveMatrixConstituentFrame(capture, target),
    isClassicalNahuatlPatientiveMatrixConstituentFrame,
    getClassicalNahuatlAdjectivalNncSourceConstituent: (parent, options) =>
      getClassicalNahuatlAdjectivalNncSourceConstituent(parent, options, target),
    isClassicalNahuatlAdjectivalNncSourceConstituentFrame,
    isClassicalNahuatlNominalConstructionResult,
    getClassicalNahuatlNominalConstructionReloadInputs: result =>
      isClassicalNahuatlNominalConstructionResult(result)
        ? NOMINAL_CONSTRUCTION_REQUESTS.get(result) || null : null,
    getClassicalNahuatlNominalCompoundReloadInputs: result =>
      isClassicalNahuatlNominalConstructionResult(result)
      && ["compound-nnc", "nominal-embed-vnc"].includes(result.constructionKind)
        ? NOMINAL_CONSTRUCTION_REQUESTS.get(result) || null : null,
    isClassicalNahuatlIssuedNominalConstructionNncSlotFrame:
      frame => ISSUED_NOMINAL_NNC_SLOTS.has(frame),
    getClassicalNahuatlNominalConstructionSlotExternalObject:
      frame => ISSUED_NOMINAL_EXTERNAL_OBJECTS.get(frame) || null,
    getClassicalNahuatlCompoundNncRestrictedUseCitationProjection:
      frame => getClassicalNahuatlCompoundNncRestrictedUseCitationProjection(
        frame,
        target
      ),
    isClassicalNahuatlCompoundNncRestrictedUseCitationProjection:
      frame => isClassicalNahuatlCompoundNncRestrictedUseCitationProjection(
        frame,
        target
      ),
    getClassicalNahuatlAffectiveNncRestrictedUseCitationProjection:
      frame => getClassicalNahuatlAffectiveNncRestrictedUseCitationProjection(
        frame,
        target
      ),
    isClassicalNahuatlAffectiveNncRestrictedUseCitationProjection:
      frame => isClassicalNahuatlAffectiveNncRestrictedUseCitationProjection(
        frame,
        target
      ),
    getClassicalNahuatlCardinalNncWrittenSpellingProjection: frame =>
      getClassicalNahuatlCardinalNncWrittenSpellingProjection(frame, target),
    isClassicalNahuatlCardinalNncWrittenSpellingProjection: frame =>
      isClassicalNahuatlCardinalNncWrittenSpellingProjection(frame, target),
    getClassicalNahuatlBasicNumeralEmbedCitation:
      frame => getClassicalNahuatlBasicNumeralEmbedCitation(frame, target),
    getClassicalNahuatlCardinalNncRestrictedUseCitationProjection:
      frame => getClassicalNahuatlCardinalNncRestrictedUseCitationProjection(
        frame,
        target
      ),
    isClassicalNahuatlCardinalNncRestrictedUseCitationProjection:
      frame => isClassicalNahuatlCardinalNncRestrictedUseCitationProjection(
        frame,
        target
      ),
    validateClassicalNahuatlIncorporatedNounRole,
    isClassicalNahuatlIncorporatedNounRoleValidation,
    buildClassicalNahuatlNominalConstructionParadigmPlan: request => buildParadigmPlan(request, target),
    isClassicalNahuatlNominalConstructionParadigmPlan,
    projectClassicalNahuatlNominalConstructionParadigmCoordinates: (plan, coordinates) => projectParadigm(plan, coordinates, target),
    isClassicalNahuatlNominalConstructionParadigmCoordinate,
    buildClassicalNahuatlNominalConstructionUiProjection: buildUiProjection,
    isClassicalNahuatlNominalConstructionUiProjection,
  };
  Object.defineProperties(exportedTarget, Object.getOwnPropertyDescriptors(api));
  return api;
}
