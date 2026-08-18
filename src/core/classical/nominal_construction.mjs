// Canonical typed nominal-construction grammar. Andrews lesson coordinates are
// curriculum/evidence metadata only; they never select a runtime operation.

const VERSION = 1;
const GCD_IDENTITY = "typed-ordered-source-constituents+licensed-relation+matrix-governance+canonical-target-evaluator";
const ISSUED_CONSTRUCTION_FRAMES = new WeakSet();
const ISSUED_SOURCE_AUTHORIZATION_FRAMES = new WeakSet();
const ISSUED_PARADIGM_PLANS = new WeakSet();
const ISSUED_PARADIGM_COORDINATES = new WeakSet();
const ISSUED_UI_PROJECTIONS = new WeakSet();
const ISSUED_CLOSED_CONSTRUCTION_EXCEPTION_VALIDATIONS = new WeakSet();
const ISSUED_INCORPORATED_NOUN_ROLE_VALIDATIONS = new WeakSet();
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
const NOMINAL_EMBED_BODY_OR_CLOTHING_STEMS = Object.freeze(new Map([
  ["cac", "clothing"],
  ["cotz", "body-part"],
  ["cuā", "body-part"],
  ["icxi", "body-part"],
  ["ihti", "body-part"],
  ["īx", "body-part"],
  ["mā", "body-part"],
  ["mah-pil", "body-part"],
  ["tēn", "body-part"],
  ["tēn-tzon", "body-part"],
  ["tilmah", "clothing"],
  ["tlan", "body-part"],
  ["tzon", "body-part"],
  ["xīc", "body-part"],
  ["xo", "body-part"],
  ["yōl-loh", "body-part"],
]));
const NOMINAL_EMBED_APPLICATIVE_MATRIX_STEMS = Object.freeze(new Set([
  "chihui-lia",
  "mil-chihui-lia",
  "tē-chi-hui-lia",
  "toh-tom-i-lia",
  "tohtomilia",
]));
const NOMINAL_COMPOUND_UNIQUE_NOUNSTEMS = Object.freeze(new Set([
  "aca",
  "ca",
  "chi",
  "cuez",
  "il",
  "il-aca",
  "nāmi",
  "poz",
  "tēl",
  "tle-l",
  "yō",
]));
const NOMINAL_COMPOUND_ORDINARY_2B_FINAL_CA_STEMS = Object.freeze(new Set([
  "ciyaca",
  "cuica",
  "ihtaca",
  "ma-l-aca",
  "naca",
  "yaca",
]));
const NOMINAL_COMPOUND_CONJUNCT_VESTIGES = Object.freeze(new Map([
  ["ā", "l"],
  ["cuahui", "l"],
  ["cuāuh", "tl"],
]));
const AFFECTIVE_NOMINAL_DEFECT_ENTITY_AMBIGUITIES = Object.freeze(new Set([
  "ix-cuitla",
  "ix-te-coh-coy-o-c",
]));
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
  "manner", "form-style", "compared-manner",
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
  const clone = deepClone(request);
  const issuedPrerequisite =
    request?.source?.embedConstituent?.resultFrame || null;
  if (
    issuedPrerequisite
    && clone?.source?.embedConstituent
  ) {
    clone.source.embedConstituent.resultFrame = issuedPrerequisite;
  }
  const cobPreteritAgentiveResultFrame =
    request?.source?.cobPreteritAgentiveResultFrame || null;
  if (cobPreteritAgentiveResultFrame && clone?.source) {
    clone.source.cobPreteritAgentiveResultFrame =
      cobPreteritAgentiveResultFrame;
  }
  const matrixResultFrame =
    request?.source?.matrixConstituent?.resultFrame || null;
  if (matrixResultFrame && clone?.source?.matrixConstituent) {
    clone.source.matrixConstituent.resultFrame = matrixResultFrame;
  }
  return clone;
}

function deepFreeze(value) {
  if (!value || typeof value !== "object" || Object.isFrozen(value)) return value;
  Object.values(value).forEach(deepFreeze);
  return Object.freeze(value);
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
  [
    request?.source?.embedConstituent?.resultFrame,
    request?.source?.matrixConstituent?.resultFrame,
  ].forEach(frame => {
    if (frame && typeof frame === "object") trusted.add(frame);
  });
  return trusted;
}

function normalizeStem(value = "") {
  const stem = normalizeToken(value)
    .replace(/[()[\]{}#]/gu, "")
    .replace(/\s+/gu, "")
    .replace(/^-+|-+$/gu, "");
  return /^[\p{L}\p{M}⎕Ø0-]+$/u.test(stem) ? stem : "";
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
      "matrixStem",
      "matrixClass",
      "structure",
      "bracketing",
    ],
    "affective-nnc": [
      "embedStem",
      "embedClass",
      "affectiveMatrix",
      "animacy",
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

function issueClassicalNahuatlNominalConstructionSourceAuthorization(
  request = {},
  target = globalThis
) {
  const constructionKind = normalizeConstructionKind(request.constructionKind);
  const source = request.source && typeof request.source === "object"
    && !Array.isArray(request.source)
    ? request.source
    : {};
  const embedStem = normalizeStem(source.embedStem);
  const matrixStem = normalizeStem(source.matrixStem);
  const embedConstituent = source.embedConstituent;
  const matrixConstituent = source.matrixConstituent;
  let blockReason = "";
  let agentiveEmbed = false;
  if (embedConstituent !== undefined) {
    const constituentObject = embedConstituent
      && typeof embedConstituent === "object"
      && !Array.isArray(embedConstituent)
      ? embedConstituent
      : null;
    const allowedKeys = new Set(["kind", "stem", "resultFrame"]);
    const forbiddenKey = constituentObject
      ? Reflect.ownKeys(constituentObject).find(
        key => typeof key !== "string" || !allowedKeys.has(key)
      )
      : "embedConstituent";
    const constituentKind = normalizeKey(constituentObject?.kind);
    const constituentStem = normalizeStem(constituentObject?.stem);
    const suppliedResult = constituentObject?.resultFrame || null;
    const suppliedRestrictedStem = normalizeStem(
      suppliedResult?.operationFrame?.targetStems?.restrictedUse
    );
    const suppliedGeneralStem = normalizeStem(
      suppliedResult?.operationFrame?.targetStems?.generalUse
    );
    const suppliedPredicateStem = normalizeStem(
      suppliedResult?.canonicalResult?.nncSlotFrame?.slots?.predicate?.stem
    );
    const preteritAgentiveAuthorized = Boolean(
      constituentKind === "preterit-agentive-nnc"
      && suppliedResult
      && target.isClassicalNahuatlDeverbalNncGrammarFrame?.(suppliedResult) === true
      && suppliedResult.operationFrame?.nominalizationKind
        === "preterit-agentive"
      && [suppliedRestrictedStem, suppliedGeneralStem, suppliedPredicateStem]
        .filter(Boolean).includes(constituentStem)
    );
    const ordinaryNncAuthorized = Boolean(
      constituentKind === "ordinary-nnc"
      && suppliedResult
      && target.isClassicalNahuatlOrdinaryNncResult?.(suppliedResult) === true
      && normalizeStem(suppliedResult.sourceFrame?.stem) === constituentStem
    );
    const resultAuthorized = preteritAgentiveAuthorized
      || ordinaryNncAuthorized;
    if (
      forbiddenKey
      || !["ordinary-nnc", "preterit-agentive-nnc"].includes(constituentKind)
      || !constituentStem
      || constituentStem !== embedStem
      || !resultAuthorized
    ) {
      blockReason = constituentKind === "ordinary-nnc"
        ? "ordinary-nnc-embed-constituent-mismatch"
        : "preterit-agentive-embed-constituent-mismatch";
    } else {
      agentiveEmbed = preteritAgentiveAuthorized;
    }
  }
  let matrixResultProjection = null;
  if (!blockReason && matrixConstituent !== undefined) {
    const constituentObject = matrixConstituent
      && typeof matrixConstituent === "object"
      && !Array.isArray(matrixConstituent)
      ? matrixConstituent
      : null;
    const allowedKeys = new Set(["kind", "stem", "resultFrame"]);
    const forbiddenKey = constituentObject
      ? Reflect.ownKeys(constituentObject).find(
        key => typeof key !== "string" || !allowedKeys.has(key)
      )
      : "matrixConstituent";
    matrixResultProjection = target
      .getClassicalNahuatlVncContinuationSourceConstituents?.(
        constituentObject?.resultFrame
      ) || null;
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
    }
  }

  let embedLexicalRule = "";
  if (constructionKind === "nominal-embed-vnc") {
    if (["ā", "a"].includes(embedStem) && ["ī", "i"].includes(matrixStem)) {
      embedLexicalRule = "atli-retains-num1";
    } else if (
      embedStem === "cuica"
      && ["ē-hu-a", "ē-hua"].includes(matrixStem)
    ) {
      embedLexicalRule = "cuica-to-cuic";
    } else if (
      (embedStem === "ā" && matrixStem === "quetza")
      || (embedStem === "mā" && matrixStem === "tlac")
    ) {
      embedLexicalRule = "glottalized-long-vowel";
    }
  } else if (constructionKind === "compound-nnc") {
    if (embedStem === "ah") {
      embedLexicalRule = "negative-ah";
    } else if (
      (["huē", "hue"].includes(embedStem) && ["cāuh", "cauh"].includes(matrixStem))
      || (["teō", "teo"].includes(embedStem) && matrixStem === "calli")
      || (["māi", "mai"].includes(embedStem) && matrixStem === "pilli")
    ) {
      embedLexicalRule = "glottalized-long-vowel";
    } else if (
      /h$/u.test(embedStem)
      && isVowel(firstSound(matrixStem))
    ) {
      embedLexicalRule = "h-to-y-before-vowel";
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
  const lexicalFacts = deepFreeze({
    embedLexicalRule,
    embedSubclass: constructionKind === "nominal-embed-vnc"
      && NOMINAL_EMBED_2B_FINAL_A_STEMS.has(embedStem)
      ? "2b-final-a"
      : "",
    embedLexicalFamily: constructionKind === "nominal-embed-vnc"
      ? NOMINAL_EMBED_UNIQUE_FAMILIES.get(embedStem) || ""
      : "",
    matrixTlaFusion: constructionKind === "nominal-embed-vnc"
      && ["tla-cui", "tla-hcuil-o-a"].includes(matrixStem),
    matrixIsApplicative: constructionKind === "nominal-embed-vnc"
      && NOMINAL_EMBED_APPLICATIVE_MATRIX_STEMS.has(matrixStem),
    ordinaryNncEmbed: Boolean(
      embedConstituent
      && normalizeKey(embedConstituent.kind) === "ordinary-nnc"
    ),
    matrixResultCaptured: Boolean(matrixResultProjection),
    embedSemanticClass: constructionKind === "nominal-embed-vnc"
      ? NOMINAL_EMBED_BODY_OR_CLOTHING_STEMS.get(embedStem) || ""
      : "",
    agentiveEmbed,
    sourceAnalysisAmbiguous: constructionKind === "nominal-embed-vnc"
      && embedStem === "icxi"
      && ["toh-toca", "tohtoca"].includes(matrixStem),
    specialMatrix,
    ordinary2bFinalCaMatrix: constructionKind === "compound-nnc"
      && NOMINAL_COMPOUND_ORDINARY_2B_FINAL_CA_STEMS.has(matrixStem),
    uniqueLexemeLicensed: constructionKind === "compound-nnc"
      && (
        NOMINAL_COMPOUND_UNIQUE_NOUNSTEMS.has(embedStem)
        || NOMINAL_COMPOUND_UNIQUE_NOUNSTEMS.has(matrixStem)
      ),
    orderAlternative: constructionKind === "compound-nnc"
      && (
        (embedStem === "mā" && matrixStem === "ōpōch")
        || (embedStem === "ōpōch" && matrixStem === "mā")
      ),
    firstConjunctVestige: constructionKind === "compound-nnc"
      ? NOMINAL_COMPOUND_CONJUNCT_VESTIGES.get(embedStem) || "tl"
      : "",
    defectStemLicensed: constructionKind === "affective-nnc"
      && DEFECT_STEMS.has(embedStem),
    defectEntityAmbiguous: constructionKind === "affective-nnc"
      && AFFECTIVE_NOMINAL_DEFECT_ENTITY_AMBIGUITIES.has(embedStem),
    lexicalizedSpecialMeaning: constructionKind === "affective-nnc"
      && embedStem === "cal"
      && normalizeKey(request.affectiveMatrix || source.affectiveMatrix) === "pōl",
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
  if (/uh$/u.test(source) && next === "p") return `${source.slice(0, -2)}p`;
  return source;
}

function reduplicateInitial(stem = "", mode = "affinity", target = "initial") {
  const source = normalizeStem(stem);
  if (!source || mode === "none") return source;
  const chunks = source.split("-");
  const index = target === "matrix" ? Math.max(0, chunks.length - 1) : 0;
  const base = chunks[index];
  const match = /^([^aeiouāēīōū]*)([aeiouāēīōū])([^aeiouāēīōū]?)/u.exec(base);
  if (!match) return source;
  const [, onset, vowel, coda] = match;
  const longVowel = ({ a: "ā", e: "ē", i: "ī", o: "ō", u: "ū" })[vowel] || vowel;
  const shortVowel = ({ ā: "a", ē: "e", ī: "i", ō: "o", ū: "u" })[vowel] || vowel;
  const prefix = mode === "affinity"
    ? `${onset}${longVowel}${coda}`
    : `${onset}${shortVowel}h${coda}`;
  chunks[index] = `${prefix}-${base}`;
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
  })[key] || "";
}

function buildObjectRequests(count, request = {}) {
  const supplied = Array.isArray(request.sourceObjectRequests)
    ? request.sourceObjectRequests
    : [];
  if (supplied.length === count) {
    return supplied.map((objectRequest, index) => ({
      objectId: normalizeKey(
        objectRequest?.objectId || `source-object-${index + 1}`
      ),
      objectKind: normalizeKey(
        objectRequest?.objectKind || "specific-projective"
      ),
      objectPerson: normalizeKey(objectRequest?.objectPerson || "3sg"),
      governor: normalizeKey(
        objectRequest?.governor || (index ? "shuntline" : "directive")
      ),
      derivationalLevel: Number(
        objectRequest?.derivationalLevel || index + 1
      ),
    }));
  }
  const people = Array.isArray(request.objectPeople) ? request.objectPeople : [];
  const kinds = Array.isArray(request.objectKinds) ? request.objectKinds : [];
  return Array.from({ length: count }, (_, index) => ({
    objectId: `source-object-${index + 1}`,
    objectKind: normalizeKey(kinds[index] || "specific-projective"),
    objectPerson: normalizeKey(people[index] || (index === 0 ? request.objectPerson || "3sg" : "3sg")),
    governor: index === 0 ? "directive" : index === 1 ? "applicative" : "causative",
    derivationalLevel: index + 1,
  }));
}

function valenceFromObjectRequests(objectRequests = []) {
  if (!objectRequests.length) return "intransitive";
  if (objectRequests.length > 1) return "multiple-object";
  return normalizeKey(objectRequests[0]?.objectKind || "specific-projective") === "nonspecific-human"
    ? "projective-human"
    : normalizeKey(objectRequests[0]?.objectKind || "specific-projective") === "nonspecific-nonhuman"
      ? "projective-nonhuman"
      : "specific-projective";
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

function realizeNominalEmbed(
  source = {},
  matrixStem = "",
  lexicalFacts = {}
) {
  const original = normalizeStem(source.embedStem);
  if (!original) return { authorizationStatus: "blocked", blockReason: "nominal-embed-embed-stem-required" };
  const lexicalRule = normalizeKey(lexicalFacts.embedLexicalRule);
  let stem = original;
  let ruleId = "nominal-embed-general-use-embed";
  if (lexicalRule === "cuica-to-cuic") {
    if (original !== "cuica") return { authorizationStatus: "blocked", blockReason: "cuica-to-cuic-rule-requires-cuica" };
    stem = "cuic";
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
  } else if (normalizeKey(lexicalFacts.embedSubclass) === "2b-final-a") {
    if (!/a$/u.test(original)) return { authorizationStatus: "blocked", blockReason: "2b-final-a-rule-requires-final-a" };
    ruleId = "nominal-embed-final-a-retention";
  }
  return {
    kind: "classical-nahuatl-nominal-embed-shape-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    blockReason: "",
    sourceStem: original,
    realizedStem: stem,
    ruleId,
    sourceStringAuthority: false,
  };
}

function evaluateNominalEmbedConstruction(request, target, sourceAuthorizationFrame) {
  const source = request.source && typeof request.source === "object" ? request.source : request;
  const lexicalFacts = sourceAuthorizationFrame.lexicalFacts;
  const relation = normalizeKey(request.relation || source.relation);
  const route = normalizeKey(request.route || source.route || (relation === "adverb" ? "direct-adverb" : relation));
  const matrixStem = normalizeStem(source.matrixStem);
  const matrixValence = normalizeMatrixValence(source.matrixValence || source.sourceValence);
  const verbClass = normalizeToken(source.matrixVerbClass || source.verbClass || "A").toUpperCase();
  const subject = normalizeSubject(request.subject || "3sg");
  if (!["object", "adverb", "complement"].includes(relation)) return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-relation-required", request);
  if (!matrixStem) return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-matrix-stem-required", request);
  if (!matrixValence) return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-matrix-valence-required", request);
  if (!["A", "B", "C", "D"].includes(verbClass)) return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-matrix-verb-class-required", request);
  if (!subject) return buildBlockedFrame("nominal-embed-vnc", "unknown-nnc-or-vnc-subject", request);

  const embedShape = realizeNominalEmbed(
    source,
    matrixStem,
    lexicalFacts
  );
  if (embedShape.authorizationStatus !== "authorized") return buildBlockedFrame("nominal-embed-vnc", embedShape.blockReason, request, { embedShape });

  const sourceObjectCount = ({ intransitive: 0, "single-object": 1, "double-object": 2, "triple-object": 3 })[matrixValence];
  const sourceObjectRequests = buildObjectRequests(sourceObjectCount, source);
  let targetObjectRequests = sourceObjectRequests;
  let targetValenceCount = sourceObjectCount;
  let selectedIncorporatedObjectId = "";
  let orientation = normalizeKey(request.orientation || source.orientation);
  let semanticRole = normalizeKey(request.adverbRole || request.complementRole || source.adverbRole || source.complementRole);
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
  if (lexicalFacts.matrixTlaFusion === true) {
    if (relation !== "adverb" || !/^tla-/u.test(matrixStem)) {
      return buildBlockedFrame("nominal-embed-vnc", "tla-fusion-adverb-requires-fused-tla-matrix", request);
    }
    appliedSemanticRules.add("incorporated-adverb/tla-fusion");
  }

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
    semanticRole = "general-patient-area";
    orientation = "not-applicable";
    if (normalizeKey(request.voice || "active") === "passive" && targetValenceCount === 0) {
      return buildBlockedFrame("nominal-embed-vnc", "incorporated-object-from-single-object-matrix-cannot-passivize", request);
    }
  } else if (relation === "adverb") {
    appliedSemanticRules.add("incorporated-adverb/source-route");
    if (!["direct-adverb", "supplement-subject", "supplement-object", "passive-adverbialized-subject"].includes(route)) {
      return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-adverb-source-route-required", request);
    }
    if (!NOMINAL_EMBED_ADVERB_ROLES.includes(semanticRole)) {
      return buildBlockedFrame("nominal-embed-vnc", "nominal-embed-adverb-role-required", request);
    }
    if (semanticRole === "compared-manner") {
      appliedSemanticRules.add("incorporated-adverb/compared-manner");
      if (sourceObjectCount === 0 && orientation !== "subject") {
        return buildBlockedFrame("nominal-embed-vnc", "intransitive-compared-manner-requires-subject-orientation", request);
      }
      if (sourceObjectCount > 0 && !["subject", "object"].includes(orientation)) {
        return buildBlockedFrame("nominal-embed-vnc", "transitive-compared-manner-requires-subject-or-object-orientation", request);
      }
    } else if (!orientation) {
      orientation = semanticRole === "manner" ? "subject" : "not-applicable";
    }
    if (route === "supplement-subject") {
      appliedSemanticRules.add("incorporated-adverb/supplement");
      appliedSemanticRules.add("incorporated-adverb/supplement-subject");
      if (normalizeKey(source.embedState) !== "possessive") return buildBlockedFrame("nominal-embed-vnc", "supplement-subject-embed-must-be-possessive", request);
      if (sourceObjectCount !== 0) return buildBlockedFrame("nominal-embed-vnc", "supplement-subject-route-requires-intransitive-principal", request);
      restrictions.push("possessor-case:possessive-to-nominative");
    }
    if (route === "supplement-object") {
      appliedSemanticRules.add("incorporated-adverb/supplement");
      appliedSemanticRules.add("incorporated-adverb/supplement-object");
      if (normalizeKey(source.embedState) !== "possessive") return buildBlockedFrame("nominal-embed-vnc", "supplement-object-embed-must-be-possessive", request);
      if (sourceObjectCount < 1) return buildBlockedFrame("nominal-embed-vnc", "supplement-object-route-requires-transitive-principal", request);
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
    }
    if (
      route === "direct-adverb"
      && ["body-part", "clothing"].includes(
        normalizeKey(lexicalFacts.embedSemanticClass)
      )
    ) {
      restrictions.push("coreferential-possessor-deleted");
      appliedSemanticRules.add("incorporated-adverb/direct-possessor-deletion");
    }
    if (route === "passive-adverbialized-subject") {
      restrictions.push("active-subject-discarded", "supplementary-subject-adverbialized-before-passive");
      appliedSemanticRules.add("incorporated-adverb/passive-barrier");
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
      if (semanticRole !== "compared-manner") {
        return buildBlockedFrame("nominal-embed-vnc", "preterit-agentive-embed-requires-compared-manner", request);
      }
      appliedSemanticRules.add("incorporated-adverb/agentive-embed");
    }
    if (lexicalFacts.sourceAnalysisAmbiguous === true) {
      const analysis = normalizeKey(request.sourceAnalysis);
      if (!["direct", "supplement"].includes(analysis)) {
        return buildBlockedFrame("nominal-embed-vnc", "ambiguous-nominal-embed-requires-typed-source-analysis", request);
      }
      appliedSemanticRules.add("nominal-embed/source-ambiguity");
    }
  } else {
    appliedSemanticRules.add("incorporated-complement/base");
    appliedSemanticRules.add("incorporated-complement/voice");
    if (!["subject", "object"].includes(orientation)) return buildBlockedFrame("nominal-embed-vnc", "incorporated-complement-orientation-required", request);
    semanticRole = normalizeKey(request.complementKind || source.complementKind);
    if (orientation === "object" && !["considering", "changing", "pretending"].includes(semanticRole)) {
      return buildBlockedFrame("nominal-embed-vnc", "object-complement-kind-required", request);
    }
    appliedSemanticRules.add(orientation === "subject"
      ? "incorporated-complement/subject"
      : semanticRole === "changing"
        ? "incorporated-complement/changing"
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
  }

  const embedReduplication = normalizeKey(request.embedReduplication || "none");
  const matrixReduplication = normalizeKey(request.matrixReduplication || "none");
  if (embedReduplication !== "none" || matrixReduplication !== "none") {
    appliedSemanticRules.add("nominal-embed/reduplication");
    if (lexicalFamily === "ih") appliedSemanticRules.add("nominal-embed/ih-interaction");
  }
  const realizedEmbed = ["affinity", "distributive-varietal", "similarity"].includes(embedReduplication)
    ? reduplicateInitial(embedShape.realizedStem, embedReduplication === "affinity" ? "affinity" : "distributive", "initial")
    : embedShape.realizedStem;
  const realizedMatrix = ["affinity", "distributive-varietal", "frequentative"].includes(matrixReduplication)
    ? reduplicateInitial(matrixStem, matrixReduplication === "affinity" ? "affinity" : "distributive", "initial")
    : matrixStem;
  const compoundStem = joinStemParts([realizedEmbed, realizedMatrix]);
  const compoundInitialISelection = /^[iī]/u.test(compoundStem)
    && (
      lexicalFacts.embedLexicalFamily
      || lexicalFacts.embedSemanticClass
    )
      ? "real"
      : "";
  const targetSourceValence = valenceFromObjectRequests(targetObjectRequests);
  const targetVoice = normalizeKey(request.voice || "active");
  const operationFrame = deepFreeze({
    kind: "classical-nahuatl-nominal-embed-operation-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    relation,
    route,
    semanticRole,
    orientation,
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
    embedShape,
    compoundStem,
    embedReduplication,
    matrixReduplication,
    restrictions,
    appliedSemanticRules: Object.freeze([...appliedSemanticRules]),
    embedIsAgent: false,
    embedIsGrammaticalSubject: false,
    passiveAgentExpressible: false,
    valenceChanged: relation === "object",
    callerSuppliedDerivedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  const vncRequest = {
    sourceStem: compoundStem,
    verbClass,
    sourceValence: targetSourceValence,
    sourceObjectRequests: targetObjectRequests,
    objectPerson: targetObjectRequests[0]?.objectPerson || "",
    subject,
    mood: normalizeKey(request.mood || "indicative"),
    tense: normalizeKey(request.tense || "present"),
    requestedVoice: targetVoice,
    outputScope: "single",
    incorporatedAdverb: relation === "adverb",
    sourceInitialISelection: compoundInitialISelection,
    requestedCausativeSpecificShuntlineRealization:
      targetObjectRequests.some(objectRequest => (
        objectRequest.governor === "causative"
        && objectRequest.objectKind === "specific-projective"
      ))
        ? "silent"
        : "",
  };
  const vncEvaluation = evaluateCanonicalVncCoordinate(target, vncRequest);
  const canonicalResult = vncEvaluation.canonicalResult;
  const authorized = canonicalResult?.authorizationStatus === "authorized";
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
      matrixValence,
      matrixVerbClass: verbClass,
    }),
    operationFrame,
    canonicalTargetEvaluator: vncEvaluation.canonicalTargetEvaluator,
    canonicalResult,
    formulaRealization: canonicalResult?.resultFrame?.formulaRealization
      || canonicalResult?.finiteSurfaceFrame?.formulaRealization
      || canonicalResult?.formulaRealization
      || "",
    wordSurface: canonicalResult?.resultFrame?.wordSurface
      || canonicalResult?.resultFrame?.surfaceRealization
      || canonicalResult?.resultFrame?.finiteSurfaceFrame?.wordRealization
      || canonicalResult?.finiteSurfaceFrame?.wordSurface
      || canonicalResult?.finiteSurfaceFrame?.wordRealization
      || canonicalResult?.wordSurface
      || canonicalResult?.surfaceRealization
      || "",
    sentenceSurface: canonicalResult?.resultFrame?.sentenceSurface
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
}) {
  return {
    kind: "classical-nahuatl-nominal-construction-number-frame",
    version: VERSION,
    authorizationStatus: subject && stem && nounClass && num1 && num2 ? "authorized" : "blocked",
    blockReason: subject && stem && nounClass && num1 && num2 ? "" : "incomplete-nominal-construction-number-frame",
    subject,
    subjectNumber: subject.endsWith("pl") ? "plural" : subject === "3common" ? "common" : "singular",
    stem,
    nounClass,
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
  sentenceModifier = "",
}) {
  if (typeof target.buildClassicalNahuatlNncSubjectPersonFrame !== "function"
    || typeof target.buildClassicalNahuatlNncSlotFrame !== "function"
    || typeof target.renderClassicalNahuatlNncSlotFrameFormula !== "function") {
    return { authorizationStatus: "blocked", blockReason: "canonical-nnc-evaluator-unavailable" };
  }
  const personFrame = target.buildClassicalNahuatlNncSubjectPersonFrame({ subject, followingMaterial: stem });
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
  const nncSlotFrame = target.buildClassicalNahuatlNncSlotFrame({
    sourceFrameKind: sourceFrame.kind,
    sourceAuthorizationStatus: sourceFrame.authorizationStatus,
    stem,
    stateFrame,
    personFrame,
    numberFrame,
    appliedOperationIds: operationIds,
    resultOperationId: operationIds.at(-1)
      || `${constructionFamily}-construction`,
    requestedOutputKind: "selected-nnc-sentence-surface",
    nncFamily: `${constructionFamily}-construction`,
  });
  const authorized = target.isClassicalNahuatlNncSlotFrame?.(nncSlotFrame) === true;
  const formulaRealization = authorized ? target.renderClassicalNahuatlNncSlotFrameFormula(nncSlotFrame) : "";
  const carriers = authorized
    ? [
      nncSlotFrame.slots.subject.pers1,
      nncSlotFrame.slots.subject.pers2,
      ...nncSlotFrame.slots.state.slots.map(slot => slot.carrier),
      nncSlotFrame.slots.predicate.stem,
      nncSlotFrame.slots.number.num1,
      nncSlotFrame.slots.number.num2,
    ]
    : [];
  const realize = typeof target.realizeClassicalNahuatlNncSurfaceCarrier === "function"
    ? target.realizeClassicalNahuatlNncSurfaceCarrier
    : value => normalizeStem(value).replace(/[0Ø⎕-]/gu, "");
  const wordSurface = carriers.map(realize).join("");
  const sentenceSurface = authorized
    ? `${sentenceModifier ? `${sentenceModifier} ` : ""}${wordSurface.charAt(0).toUpperCase()}${wordSurface.slice(1)}.`
    : "";
  return {
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason: authorized ? "" : nncSlotFrame?.blockReason || numberFrame?.blockReason || stateFrame?.blockReason || personFrame?.blockReason || "canonical-nnc-evaluation-blocked",
    personFrame,
    stateFrame,
    numberFrame,
    nncSlotFrame,
    formulaRealization,
    wordSurface,
    sentenceSurface,
  };
}

function realizeCompoundEmbed(source, matrixStem, lexicalFacts = {}) {
  let embedStem = normalizeStem(source.embedStem);
  const lexicalRule = normalizeKey(lexicalFacts.embedLexicalRule);
  if (!embedStem) return { authorizationStatus: "blocked", blockReason: "compound-nnc-embed-stem-required" };
  if (lexicalRule === "irregular-final-a-loss") embedStem = embedStem.replace(/a$/u, "");
  if (lexicalRule === "glottalized-long-vowel") {
    const lesson215Allomorph = ({
      huē: "hueh", hue: "hueh",
      teō: "teoh", teo: "teoh",
      māi: "mah", mai: "mah",
    })[embedStem];
    embedStem = lesson215Allomorph || embedStem.replace(/([āēīōū])$/u, (_, vowel) => ({
      ā: "ah", ē: "eh", ī: "ih", ō: "oh", ū: "uh",
    })[vowel]);
  }
  if (lexicalRule === "h-to-y-before-vowel") {
    if (!/h$/u.test(embedStem) || !isVowel(firstSound(matrixStem))) {
      return { authorizationStatus: "blocked", blockReason: "h-to-y-rule-requires-h-plus-vowel-boundary" };
    }
    embedStem = `${embedStem.slice(0, -1)}y`;
  }
  if (lexicalRule === "negative-ah") embedStem = "ah";
  return {
    kind: "classical-nahuatl-compound-nnc-embed-shape-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    sourceStem: normalizeStem(source.embedStem),
    realizedStem: embedStem,
    ruleId: lexicalRule || "general-use-embed",
  };
}

function evaluateNominalCompoundConstruction(request, target, sourceAuthorizationFrame) {
  const source = request.source && typeof request.source === "object" ? request.source : request;
  const lexicalFacts = sourceAuthorizationFrame.lexicalFacts;
  const structure = normalizeKey(request.structure || source.structure || "integrated");
  const matrixStem = normalizeStem(source.matrixStem);
  const matrixClass = normalizeNounClass(source.matrixClass);
  const subject = normalizeSubject(request.subject || "3sg");
  const state = normalizeKey(request.state || "absolutive");
  const orientation = normalizeKey(request.possessorOrientation || source.possessorOrientation || "matrix");
  const embedRole = normalizeKey(request.embedRole || source.embedRole || "association");
  if (!["integrated", "linked-connective-t", "linked-connectiveless", "conjunctive"].includes(structure)) {
    return buildBlockedFrame("compound-nnc", "nominal-compound-compound-structure-required", request);
  }
  if (!matrixStem || !matrixClass) return buildBlockedFrame("compound-nnc", "nominal-compound-matrix-stem-and-class-required", request);
  if (!subject) return buildBlockedFrame("compound-nnc", "unknown-nnc-subject", request);
  if (!["absolutive", "possessive"].includes(state)) return buildBlockedFrame("compound-nnc", "nominal-compound-state-required", request);
  if (!NOMINAL_COMPOUND_EMBED_ROLES.includes(embedRole)) return buildBlockedFrame("compound-nnc", "nominal-compound-embed-role-required", request);
  if (structure.startsWith("linked") && orientation !== "embed") {
    return buildBlockedFrame("compound-nnc", "linked-compound-requires-embed-possessor-orientation", request);
  }
  if (!["matrix", "embed"].includes(orientation)) return buildBlockedFrame("compound-nnc", "nominal-compound-possessor-orientation-required", request);
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
  if (embedRole === "sex" && !["oquich", "cihuā", "cihua"].includes(normalizeStem(source.embedStem))) {
    return buildBlockedFrame("compound-nnc", "sex-compound-requires-oquich-or-cihua-embed", request);
  }
  if (embedRole === "progeny" && !["conē", "pil-tōn"].includes(specialMatrix)) {
    return buildBlockedFrame("compound-nnc", "progeny-compound-requires-cone-or-pil-ton-matrix", request);
  }
  if (embedRole === "fellowship" && specialMatrix !== "poh") {
    return buildBlockedFrame("compound-nnc", "fellowship-compound-requires-poh-matrix", request);
  }
  const embedShape = realizeCompoundEmbed(source, matrixStem, lexicalFacts);
  if (embedShape.authorizationStatus !== "authorized") return buildBlockedFrame("compound-nnc", embedShape.blockReason, request, { embedShape });
  const reduplication = normalizeKey(request.reduplication || "none");
  const reduplicationTarget = normalizeKey(request.reduplicationTarget || "embed");
  if (reduplication === "distributive-varietal" && reduplicationTarget !== "embed") {
    return buildBlockedFrame("compound-nnc", "nominal-compound-distributive-varietal-reduplication-requires-embed", request);
  }
  if (!["none", "affinity", "distributive-varietal"].includes(reduplication)) {
    return buildBlockedFrame("compound-nnc", "nominal-compound-reduplication-kind-invalid", request);
  }
  if (!["embed", "matrix", "both"].includes(reduplicationTarget)) {
    return buildBlockedFrame("compound-nnc", "nominal-compound-reduplication-target-invalid", request);
  }
  const bracketing = normalizeKey(
    request.bracketing || source.bracketing || "unambiguous"
  );
  if (!["unambiguous", "compound-embed", "compound-matrix", "both"].includes(bracketing)) {
    return buildBlockedFrame("compound-nnc", "recognized-compound-nnc-bracketing-required", request);
  }
  const recursiveEmbed = ["compound-embed", "both"].includes(bracketing);
  const recursiveMatrix = ["compound-matrix", "both"].includes(bracketing);
  let embed = embedShape.realizedStem;
  let matrix = matrixStem;
  const redupMode = reduplication === "affinity" ? "affinity" : "distributive";
  if (reduplication !== "none" && ["embed", "both"].includes(reduplicationTarget)) embed = reduplicateInitial(embed, redupMode, "initial");
  if (reduplication !== "none" && ["matrix", "both"].includes(reduplicationTarget)) matrix = reduplicateInitial(matrix, redupMode, "initial");
  let compoundStem = "";
  if (structure === "conjunctive") {
    const vestige = normalizeKey(
      lexicalFacts.firstConjunctVestige || "tl"
    );
    if (!["l", "tl", "tli"].includes(vestige)) return buildBlockedFrame("compound-nnc", "conjunctive-compound-first-num1-vestige-required", request);
    compoundStem = joinStemParts([embed, vestige, matrix]);
  } else {
    compoundStem = joinStemParts([realizeBoundaryAssimilation(embed, matrix), matrix]);
  }
  const sourceFrame = deepFreeze({
    kind: "classical-nahuatl-nominal-compound-source-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    structure,
    embedStem: normalizeStem(source.embedStem),
    matrixStem,
    matrixClass,
    embedRole,
    possessorOrientation: orientation,
    matrixGovernsClass: true,
    englishGlossOrderAuthority: false,
  });
  const appliedSemanticRules = new Set([
    "compound-nnc/base",
    "compound-nnc/embed-role",
    "compound-nnc/possessor-orientation",
    "compound-nnc/matrix-governance",
    "compound-nnc/stem-shape",
  ]);
  if (lexicalFacts.orderAlternative === true) appliedSemanticRules.add("compound-nnc/order-ambiguity");
  if (normalizeKey(lexicalFacts.embedLexicalRule) === "glottalized-long-vowel") {
    appliedSemanticRules.add("compound-nnc/glottalized-embed");
  }
  if (normalizeKey(lexicalFacts.embedLexicalRule) === "negative-ah") {
    appliedSemanticRules.add("compound-nnc/negative-embed");
  }
  if (normalizeKey(lexicalFacts.embedLexicalRule) === "h-to-y-before-vowel") {
    appliedSemanticRules.add("compound-nnc/lexical-boundary");
  }
  if (lexicalFacts.uniqueLexemeLicensed === true) appliedSemanticRules.add("compound-nnc/unique-lexeme");
  if (specialMatrix === "ca") appliedSemanticRules.add("compound-nnc/ca-matrix");
  if (lexicalFacts.ordinary2bFinalCaMatrix === true) {
    appliedSemanticRules.add("compound-nnc/ca-exclusion");
  }
  if (specialMatrix === "yō") appliedSemanticRules.add("compound-nnc/yo-matrix");
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
  const targetResult = buildNncTarget({
    target,
    constructionFamily: "nominal-compound",
    sourceFrame,
    stem: compoundStem,
    nounClass: matrixClass,
    subject,
    state,
    possessor: normalizeKey(request.possessor || "3sg"),
    animacy: normalizeKey(request.animacy || "animate"),
    pluralConnector: normalizeKey(request.pluralConnector || "t-in"),
    singularPossessiveConnector: normalizeKey(request.singularPossessiveConnector || "0"),
    operationIds: ["nominal-compound-compound-nnc", `nominal-compound-${structure}`, `nominal-compound-${embedRole}`],
  });
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
      embedShape,
      compoundStem,
      matrixClass,
      possessorOrientation: orientation,
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
    formulaRealization: targetResult.formulaRealization,
    wordSurface: targetResult.wordSurface,
    sentenceSurface: targetResult.sentenceSurface,
    typedFrameAuthority: true,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

const DEFECT_STEMS = Object.freeze(new Set([
  "nacaz-tzatza", "tzapa", "ix-po-poy-ō", "ix-te-coh-coy-o-c",
  "tepi", "tecpin", "cuā-naca",
]));

function affectiveMatrixClass(matrix, embedClass, lexicalized) {
  if (lexicalized) return "tli";
  if (["pil", "pōl"].includes(matrix)) return "zero";
  if (matrix === "zol") return "tli";
  return embedClass === "zero" ? "zero" : "tli";
}

function evaluateAffectiveDenominalVnc(request, target, source, matrix) {
  if (!["zol", "tzin", "pōl"].includes(matrix)) {
    return buildBlockedFrame("affective-nnc", "denominal-affective-vnc-requires-zol-tzin-or-pol", request);
  }
  if (matrix === "tzin") {
    return buildBlockedFrame("affective-nnc", "tzin-denominal-vnc-is-restricted-to-honorific-matrix-operation", request);
  }
  if (matrix === "pōl") {
    return buildBlockedFrame("affective-nnc", "pol-denominal-vnc-is-restricted-to-pejorative-matrix-operation", request);
  }
  const denominalKind = normalizeKey(request.denominalKind || "inchoative");
  if (!["inchoative", "causative"].includes(denominalKind)) {
    return buildBlockedFrame("affective-nnc", "recognized-zol-denominal-operation-required", request);
  }
  const stem = denominalKind === "inchoative" ? "zol-i-hui" : "zol-o-ā";
  const verbClass = denominalKind === "inchoative" ? "B" : "C";
  const sourceValence = denominalKind === "inchoative" ? "intransitive" : "projective-nonhuman";
  const subject = normalizeSubject(request.subject || "3sg");
  if (!subject || subject === "3common") return buildBlockedFrame("affective-nnc", "denominal-vnc-requires-finite-vnc-subject", request);
  const sourceFrame = deepFreeze({
    kind: "classical-nahuatl-affective-nominal-source-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    affectiveMatrix: matrix,
    denominalKind,
    sourceNounstem: "zol",
  });
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
  const embedStem = normalizeStem(source.embedStem);
  const embedClass = normalizeNounClass(source.embedClass);
  const matrix = normalizeKey(request.affectiveMatrix || source.affectiveMatrix);
  const subject = normalizeSubject(request.subject || "3sg");
  const state = normalizeKey(request.state || "absolutive");
  const animacy = normalizeKey(request.animacy || source.animacy || "animate");
  const affectRoute = normalizeKey(request.affectRoute || "compound");
  const semanticReading = normalizeKey(request.semanticReading || source.semanticReading || "ordinary-affective");
  if (normalizeKey(request.affectiveOutputKind || "nnc") === "denominal-vnc") {
    return evaluateAffectiveDenominalVnc(request, target, source, matrix);
  }
  if (!embedStem || !embedClass) return buildBlockedFrame("affective-nnc", "affective-nominal-embed-stem-and-class-required", request);
  if (!subject) return buildBlockedFrame("affective-nnc", "unknown-nnc-subject", request);
  if (!["absolutive", "possessive", "vocative"].includes(state)) return buildBlockedFrame("affective-nnc", "affective-nominal-state-required", request);
  if (!["compound", "flawed-subject"].includes(affectRoute)) return buildBlockedFrame("affective-nnc", "affective-nominal-affect-route-required", request);
  if (![
    "ordinary-affective",
    "mass-delimited",
    "pil-appendage",
    "pil-child",
    "pil-noble",
    "pil-honorific-vocative",
  ].includes(semanticReading)) {
    return buildBlockedFrame("affective-nnc", "affective-nominal-semantic-reading-required", request);
  }

  let matrixStem = matrix;
  let nounClass = embedClass;
  let compoundStem = embedStem;
  const restrictions = [];
  const appliedSemanticRules = new Set(["affective/base"]);
  const defectLicensed = lexicalFacts.defectStemLicensed === true;
  if (affectRoute === "compound") {
    if (!AFFECTIVE_NOMINAL_MATRICES.includes(matrix)) return buildBlockedFrame("affective-nnc", "affective-nominal-affective-matrix-required", request);
    if (matrix === "zol" && animacy !== "nonanimate") return buildBlockedFrame("affective-nnc", "affective-zol-requires-nonanimate-embed", request);
    if (matrix === "zol") {
      restrictions.push("zol-recursive-embed-licensed");
      appliedSemanticRules.add("affective/zol");
    }
    if (["pil", "pōl"].includes(matrix)) {
      restrictions.push("affective-class-always-zero");
      appliedSemanticRules.add("affective/pil-pol");
    }
    if (["tzin", "tōn"].includes(matrix)) {
      restrictions.push("embed-zero-keeps-zero-otherwise-tli");
      appliedSemanticRules.add("affective/tzin-ton-class");
    }
    nounClass = affectiveMatrixClass(
      matrix,
      embedClass,
      lexicalFacts.lexicalizedSpecialMeaning === true
    );
    if (lexicalFacts.lexicalizedSpecialMeaning === true) {
      appliedSemanticRules.add("affective/lexicalized-class");
    }
    if (matrix === "tōn" && embedStem === "quimich") nounClass = "zero";
    if (matrix === "tōn") appliedSemanticRules.add("affective/ton-exception");
    if (["tzin", "tōn"].includes(matrix) && embedStem === "te-coma") matrixStem = matrix;
    if (state === "vocative" && normalizeKey(request.vocativeForm || "full") === "abbreviated") {
      if (matrix !== "tzin") return buildBlockedFrame("affective-nnc", "abbreviated-vocative-requires-tzin", request);
      matrixStem = "tz";
      restrictions.push("abbreviated-vocative-less-formal");
    }
    if (state === "vocative") appliedSemanticRules.add("affective/vocative");
    if (semanticReading === "mass-delimited" && matrix !== "tzin") return buildBlockedFrame("affective-nnc", "mass-delimitation-requires-tzin", request);
    if (semanticReading === "mass-delimited") appliedSemanticRules.add("affective/mass-delimitation");
    if (semanticReading.startsWith("pil-")) {
      const pilReading = semanticReading.slice(4);
      if (!["appendage", "child", "noble", "honorific-vocative"].includes(pilReading)) {
        return buildBlockedFrame("affective-nnc", "unknown-pil-semantic-reading", request);
      }
      if (pilReading === "honorific-vocative" && !(matrix === "tzin" && state === "vocative")) {
        return buildBlockedFrame("affective-nnc", "pil-honorific-vocative-requires-tzin-vocative", request);
      }
      restrictions.push(`pil-reading:${pilReading}`);
      appliedSemanticRules.add("pil/reading");
      if (pilReading === "child") {
        appliedSemanticRules.add(normalizeKey(request.pilChildRoute || "simple") === "simple"
          ? "pil/child-simple"
          : "pil/child-affective");
      }
      if (pilReading === "noble") appliedSemanticRules.add("pil/noble");
      if (pilReading === "honorific-vocative") appliedSemanticRules.add("pil/honorific-vocative");
    }
    compoundStem = joinStemParts([embedStem, matrixStem]);
  } else {
    if (!defectLicensed) return buildBlockedFrame("affective-nnc", "flawed-subject-requires-licensed-defect-stem", request);
    if (state !== "absolutive") return buildBlockedFrame("affective-nnc", "flawed-subject-is-absolutive-only", request);
    if (subject.endsWith("pl")) return buildBlockedFrame("affective-nnc", "flawed-subject-is-singular-common-only", request);
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
    if (embedStem === "cuā-naca") appliedSemanticRules.add("affective/chicken");
  }

  const reduplication = normalizeKey(request.reduplication || "none");
  const plural = subject.endsWith("pl");
  if (!["none", "affinity", "distributive-varietal"].includes(reduplication)) {
    return buildBlockedFrame("affective-nnc", "affective-nominal-reduplication-kind-invalid", request);
  }
  if (plural && reduplication === "affinity" && affectRoute === "compound") {
    compoundStem = joinStemParts([embedStem, reduplicateInitial(matrixStem, "distributive", "initial").replace(/h/u, "")]);
  }
  if (reduplication === "distributive-varietal" && animacy !== "nonanimate") {
    restrictions.push("distributive-varietal-context-required");
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
    kind: "classical-nahuatl-affective-nominal-source-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    embedStem,
    embedClass,
    affectRoute,
    affectiveMatrix: matrix || "none",
    semanticReading,
    animacy,
    defectStemLicensed: defectLicensed,
  });

  let numberFrameOverride = null;
  const defectAffectiveForcesFlawedSubject = affectRoute === "compound"
    && defectLicensed
    && ["tzin", "tōn"].includes(matrix);
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
  } else if (plural && reduplication === "affinity") {
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
    } else {
      const soundedSingular = nounClass !== "zero";
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
  if (affectRoute === "compound" && ["tzin", "tōn"].includes(matrix) && defectLicensed && !subject.endsWith("pl")) {
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
  if (animacy === "nonanimate" && plural && reduplication === "affinity") {
    restrictions.push("nonanimate-affective-plural-t-in-exception", "supplement-head-may-remain-common-number");
  }
  const targetState = state === "vocative" ? "possessive" : state;
  const targetResult = buildNncTarget({
    target,
    constructionFamily: "affective-nominal",
    sourceFrame,
    stem: compoundStem,
    nounClass,
    subject,
    state: targetState,
    possessor: normalizeKey(request.possessor || "3sg"),
    animacy: animacy === "nonanimate" && plural ? "animate" : animacy,
    pluralConnector: normalizeKey(request.pluralConnector || "t-in"),
    singularPossessiveConnector: normalizeKey(request.singularPossessiveConnector || "0"),
    numberFrameOverride,
    operationIds: ["affective-nominal-affective-nnc", `affective-nominal-${affectRoute}`, `affective-nominal-${matrix || "flawed"}`],
  });
  if (targetResult.authorizationStatus === "authorized" && state === "vocative") {
    targetResult.sentenceSurface = `${targetResult.wordSurface}é`;
  }
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
  if (["p", "m"].includes(next)) return "ōm";
  return "ōn";
}

function simpleNumeralStem(value, { embedded = false, following = "" } = {}) {
  if (!Number.isInteger(value) || value < 1 || value > 19) return "";
  const unit = {
    1: embedded ? numeralOneEmbed(following) : "cē",
    2: embedded ? numeralTwoEmbed(following) : "ōme",
    3: embedded ? (isVowel(firstSound(following)) ? "ē" : "ēx") : "ēyi",
    4: embedded ? (isVowel(firstSound(following)) ? "nāhu" : "nāuh") : "nāhui",
    5: "mācuīl",
    6: embedded ? "chicuacem" : "chicuacē",
    7: "chicōme",
    8: "chicuēi",
    9: "chiucnāhui",
    10: "mahtlāc",
    15: "caxtōl",
  }[value];
  if (unit) return unit;
  const base = value < 15 ? 10 : 15;
  const remainder = value - base;
  return joinStemParts([
    simpleNumeralStem(base, { embedded: false }),
    `om-${simpleNumeralStem(remainder, { embedded: false })}`,
  ]);
}

function orderTerm(multiplier, order) {
  const matrix = ({ 20: "pōhu-a-l", 400: "tzon", 8000: "xiqu-ipil" })[order];
  if (!matrix || multiplier < 1 || multiplier > 19) return "";
  return joinStemParts([simpleNumeralStem(multiplier, { embedded: true, following: matrix }), matrix]);
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
  if (remaining) terms.push({ order: 1, multiplier: remaining, value: remaining, stem: simpleNumeralStem(remaining) });
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
  if (["m", "p"].includes(next)) return "om";
  if (compound && ["c", "z"].includes(next)) return "oz";
  return "on";
}

function realizeNumeralConstruction(
  value,
  classifier,
  source = {},
  target = globalThis
) {
  const restrictions = [];
  if (classifier === "cob" && value > 39) {
    return { authorizationStatus: "blocked", blockReason: "cob-classifier-is-not-licensed-beyond-thirty-nine" };
  }
  if (classifier === "cob" && value >= 20) {
    const agentiveResult = source.cobPreteritAgentiveResultFrame || null;
    const canonicalAgentive = Boolean(
      typeof target.isClassicalNahuatlDeverbalNncGrammarFrame === "function"
      && target.isClassicalNahuatlDeverbalNncGrammarFrame(agentiveResult)
      && agentiveResult?.authorizationStatus === "authorized"
      && agentiveResult?.operationFrame?.nominalizationKind
        === "preterit-agentive"
      && agentiveResult?.sourceFrame?.sourceStem === "tlami"
      && agentiveResult?.sourceFrame?.verbClass === "A"
      && agentiveResult?.wordSurface === "tlamic"
    );
    if (!canonicalAgentive) {
      return {
        authorizationStatus: "blocked",
        blockReason:
          "cob-twenty-route-requires-engine-issued-tlamic-preterit-agentive",
      };
    }
    const remainder = value - 20;
    const stem = remainder
      ? joinStemParts([
          agentiveResult.wordSurface,
          `om-${simpleNumeralStem(remainder)}`,
        ])
      : agentiveResult.wordSurface;
    return {
      authorizationStatus: "authorized",
      stem,
      terms: [{ order: 20, multiplier: 1, value: 20, stem: "tlamic" }],
      restrictions: ["tlamic-preterit-agentive-class-a-exception"],
      matrixStem: "tlamic",
      cobPreteritAgentiveResultFrame: agentiveResult,
    };
  }
  if (["tecpan", "ipil", "quimil"].includes(classifier)) {
    if (value % 20 !== 0 || value / 20 > 19) {
      return { authorizationStatus: "blocked", blockReason: "special-twenty-classifier-requires-one-through-nineteen-groups-of-twenty" };
    }
    const referentClass = normalizeKey(source.referentClass);
    const allowed = {
      tecpan: ["people", "animals", "houses", "rocks"],
      ipil: ["blankets", "paper", "tortillas", "hides"],
      quimil: ["blankets"],
    }[classifier];
    if (!allowed.includes(referentClass)) {
      return { authorizationStatus: "blocked", blockReason: `${classifier}-referent-class-not-licensed` };
    }
    const matrix = classifierMatrix(classifier, source);
    return {
      authorizationStatus: "authorized",
      stem: joinStemParts([simpleNumeralStem(value / 20, { embedded: true, following: matrix }), matrix]),
      terms: [{ order: 20, multiplier: value / 20, value }],
      restrictions,
      matrixStem: matrix,
    };
  }
  const terms = decomposeVigesimal(value);
  if (!terms.length) return { authorizationStatus: "blocked", blockReason: "numeral-value-outside-licensed-vigesimal-range" };
  const classifierStem = classifierMatrix(classifier, source);
  if (classifier === "measure" && !classifierStem) {
    return { authorizationStatus: "blocked", blockReason: "measure-classifier-requires-measure-stem" };
  }
  const stems = terms.map((term, index) => {
    if (index === 0 && classifier !== "basic") {
      return joinStemParts([
        simpleNumeralStem(term.value, { embedded: true, following: classifierStem }),
        classifierStem,
      ]);
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
  return {
    authorizationStatus: "authorized",
    stem: stems.join("-"),
    terms,
    restrictions,
    matrixStem: classifierStem || "basic-numeral",
  };
}

function reduplicateNumeral(value, stem, kind, terms) {
  if (kind === "none") return stem;
  const mode = kind === "affinity" ? "affinity" : "distributive";
  const reduplicateTerm = (termStem, termValue) => {
    if ([7, 8, 9].includes(termValue)) {
      const [embed, ...matrixParts] = termStem.split("-");
      const first = reduplicateInitial(embed, mode, "initial");
      const matrix = reduplicateInitial(matrixParts.join("-"), mode, "initial");
      return joinStemParts([first, matrix]);
    }
    if (termValue === 10) return reduplicateInitial(termStem, mode, "matrix");
    return reduplicateInitial(termStem, mode, "initial");
  };
  if (terms.length > 1) {
    return terms.map(term => reduplicateTerm(term.stem, term.value)).join("-om-");
  }
  return reduplicateTerm(stem, value);
}

function evaluateCardinalNominalConstruction(request, target) {
  const source = request.source && typeof request.source === "object" ? request.source : request;
  const value = Number(request.value ?? source.value);
  const classifier = normalizeKey(request.classifier || source.classifier || "basic");
  const countKind = normalizeKey(request.countKind || source.countKind || "ordinary");
  const numeralOutputKind = normalizeKey(request.numeralOutputKind || "nnc");
  const subject = normalizeSubject(request.subject
    || (numeralOutputKind === "vnc-adverb" ? "3sg" : countKind === "gross" ? "3pl" : "3common"));
  const animacy = normalizeKey(request.animacy || source.animacy || "nonanimate");
  const state = normalizeKey(request.state || "absolutive");
  if (!Number.isInteger(value) || value < 1) return buildBlockedFrame("cardinal-numeral-nnc", "positive-integer-numeral-value-required", request);
  if (!CARDINAL_NOMINAL_CLASSIFIERS.includes(classifier)) return buildBlockedFrame("cardinal-numeral-nnc", "cardinal-nominal-classifier-required", request);
  if (!["ordinary", "gross"].includes(countKind)) return buildBlockedFrame("cardinal-numeral-nnc", "cardinal-nominal-count-kind-required", request);
  if (!["nnc", "vnc-adverb"].includes(numeralOutputKind)) {
    return buildBlockedFrame("cardinal-numeral-nnc", "cardinal-nominal-output-kind-required", request);
  }
  if (!subject) return buildBlockedFrame("cardinal-numeral-nnc", "unknown-nnc-subject", request);
  if (numeralOutputKind === "vnc-adverb") {
    if (value !== 1 || classifier !== "basic" || countKind !== "ordinary") {
      return buildBlockedFrame("cardinal-numeral-nnc", "only-basic-one-licenses-the-cem-vnc-adverb", request);
    }
    const matrixStem = normalizeStem(source.matrixStem);
    if (!matrixStem) return buildBlockedFrame("cardinal-numeral-nnc", "numeral-vnc-adverb-requires-matrix-stem", request);
    const nominalEmbedRequest = {
      constructionKind: "nominal-embed-vnc",
      relation: "adverb",
      route: "direct-adverb",
      adverbRole: "manner",
      orientation: "subject",
      subject,
      mood: normalizeKey(request.mood || "indicative"),
      tense: normalizeKey(request.tense || "present"),
      voice: normalizeKey(request.voice || "active"),
      source: {
        embedStem: "cem",
        matrixStem,
        matrixVerbClass: normalizeToken(source.matrixVerbClass || "A").toUpperCase(),
        matrixValence: normalizeMatrixValence(source.matrixValence || "intransitive"),
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
      constructionFamily: "cardinal-numeral-vnc-adverb",
      sourceFrame: Object.freeze({
        kind: "classical-nahuatl-cardinal-vnc-adverb-source-frame",
        version: VERSION,
        authorizationStatus: "authorized",
        value: 1,
        numeralStem: "cem",
        matrixStem,
      }),
      operationFrame: Object.freeze({
        kind: "classical-nahuatl-cardinal-vnc-adverb-operation-frame",
        version: VERSION,
        authorizationStatus: authorized ? "authorized" : "blocked",
        relation: "incorporated-adverb",
        semanticRole: "complete-entire-together-forever",
        stem: nominalEmbed.operationFrame?.compoundStem || "",
        appliedSemanticRules: Object.freeze([
          "numeral/base",
          "numeral/one",
          "numeral/vnc-adverb",
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
  if (countKind === "gross" && !subject.endsWith("pl")) return buildBlockedFrame("cardinal-numeral-nnc", "gross-count-requires-plural-subject", request);
  if (countKind === "ordinary" && animacy === "nonanimate" && subject !== "3common") {
    return buildBlockedFrame("cardinal-numeral-nnc", "ordinary-nonanimate-count-requires-common-number-subject", request);
  }
  if (countKind === "ordinary" && animacy === "animate" && subject === "3common") {
    return buildBlockedFrame("cardinal-numeral-nnc", "ordinary-animate-count-requires-singular-or-plural-subject", request);
  }
  if (state === "possessive") {
    const possessor = normalizeKey(request.possessor || "");
    if (!possessor) return buildBlockedFrame("cardinal-numeral-nnc", "gross-possessive-requires-possessor", request);
    if (["1sg", "2sg", "3sg"].includes(possessor)) return buildBlockedFrame("cardinal-numeral-nnc", "gross-possessive-animate-possessor-must-be-plural", request);
    if (animacy === "nonanimate" && source.possessorReferentPlural !== true) {
      return buildBlockedFrame("cardinal-numeral-nnc", "gross-possessive-nonanimate-possessor-referent-must-be-plural", request);
    }
  }
  const numeral = realizeNumeralConstruction(
    value,
    classifier,
    source,
    target
  );
  if (numeral.authorizationStatus !== "authorized") return buildBlockedFrame("cardinal-numeral-nnc", numeral.blockReason, request);
  let stem = numeral.stem;
  if (countKind === "gross") stem = joinStemParts([stem, "ix"]);
  const reduplication = normalizeKey(request.reduplication || "none");
  if (!["none", "affinity", "distributive-varietal"].includes(reduplication)) {
    return buildBlockedFrame("cardinal-numeral-nnc", "cardinal-nominal-reduplication-kind-invalid", request);
  }
  stem = reduplicateNumeral(value, stem, reduplication, numeral.terms);
  const modifier = normalizeKey(request.modifier || "none");
  const modifierSurface = {
    none: "",
    canah: "Canah",
    quēn: "Quēn",
    "ahzo-quēn": "Ahzo quēn",
    oc: "Oc",
  }[modifier];
  if (modifierSurface === undefined) return buildBlockedFrame("cardinal-numeral-nnc", "cardinal-nominal-numeral-modifier-invalid", request);
  const nounClass = classifier === "basic"
    ? ([1, 2, 3, 4, 6, 7, 8, 9].includes(value) ? "zero" : [10].includes(value) ? "tli" : "tli")
    : ["rock", "cob"].includes(classifier) ? "tl"
      : ["row", "thing", "tecpan"].includes(classifier) ? "tli"
        : ["ipil", "quimil"].includes(classifier) ? "tli"
          : normalizeNounClass(source.measureClass || "tli");
  const sourceFrame = deepFreeze({
    kind: "classical-nahuatl-cardinal-nominal-source-frame",
    version: VERSION,
    authorizationStatus: "authorized",
    value,
    countKind,
    classifier,
    animacy,
    state,
    vigesimalOrders: numeral.terms.map(term => term.order),
    terms: numeral.terms,
    measureComposition: normalizeKey(request.measureComposition || "measure-only"),
    measuredStem: normalizeStem(source.measuredStem),
    measuredClass: normalizeNounClass(source.measuredClass),
  });
  const plural = subject.endsWith("pl");
  let num1 = "0";
  let num2 = "0";
  let ruleId = "cardinal-nominal-ordinary-common-number";
  if (countKind === "gross") {
    num1 = "t";
    num2 = "in";
    ruleId = "cardinal-nominal-gross-count-plural-t-in";
  } else if (plural && classifier === "rock") {
    num1 = "m";
    num2 = "eh";
    ruleId = "cardinal-nominal-rock-ordinary-plural-m-eh";
  } else if (plural && value === 1 && classifier === "basic") {
    num1 = "m";
    num2 = "eh";
    ruleId = "cardinal-nominal-one-plural-m-eh";
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
  const numberFrameOverride = buildCustomNumberFrame({
    subject,
    stem,
    nounClass,
    num1,
    num2,
    animacy,
    ruleId,
  });
  const targetResult = buildNncTarget({
    target,
    constructionFamily: "cardinal-nominal",
    sourceFrame,
    stem,
    nounClass,
    subject,
    state,
    possessor: normalizeKey(request.possessor || "3pl"),
    animacy: countKind === "gross" ? "animate" : animacy,
    numberFrameOverride,
    operationIds: ["cardinal-nominal-cardinal-nnc", `cardinal-nominal-${countKind}`, `cardinal-nominal-classifier-${classifier}`],
    sentenceModifier: modifierSurface,
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
  let sentenceSurface = targetResult.sentenceSurface;
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
      sharedReferent: true,
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
      reduplication,
      modifier,
      conjunctionDirection: numeral.terms.length > 1 ? "higher-to-lower" : "not-applicable",
      sameMatrixConjunctionAllowed: false,
      rightConjunctRepeatsClassifier: false,
      restrictions: numeral.restrictions,
      cobPreteritAgentiveResultFrame:
        numeral.cobPreteritAgentiveResultFrame || null,
      appliedSemanticRules: Object.freeze([...appliedSemanticRules]),
      measureComposition,
      adjectivalModificationFrame,
      formulaStringAuthority: false,
    },
    canonicalTargetEvaluator: "buildClassicalNahuatlNncSlotFrame",
    canonicalResult: targetResult,
    formulaRealization,
    wordSurface: targetResult.wordSurface,
    sentenceSurface,
    typedFrameAuthority: true,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

function evaluateNominalConstruction(request = {}, target = globalThis) {
  const trustedResultFrames =
    getNominalConstructionTrustedResultFrames(request);
  const hostilePath = findHostileAuthorityPath(
    request, "request", new WeakSet(), trustedResultFrames
  );
  const callerMintedSourceAuthorityPath =
    findCallerMintedSourceAuthorityPath(
      request, "request", new WeakSet(), trustedResultFrames
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
  const frame = constructionKind === "nominal-embed-vnc"
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
    && operationFrame?.relation === "adverb"
    && operationFrame.embedIsGrammaticalSubject === false
    && operationFrame.embedIsAgent === false
  );
  const selectedVoice = ownerIssued
    ? normalizeKey(operationFrame?.selectedVoice)
    : "";
  const nonactive = ["passive", "impersonal"].includes(selectedVoice);
  const expectedRole = nonactive ? "means-instrument" : "adverbial";
  const claimedRole = normalizeKey(claimObject.claimedRole);
  const agentMentioned = claimObject.agentMentioned === true;
  const roleLicensed = claimedRole === expectedRole;
  const passiveAgentBarrierSatisfied = !nonactive || !agentMentioned;
  const authorized = Boolean(
    !forbiddenKey
    && incorporatedVnc
    && ["adverbial", "means-instrument"].includes(claimedRole)
    && roleLicensed
    && passiveAgentBarrierSatisfied
  );
  const blockReason = forbiddenKey
    ? "incorporated-role-validation-accepts-role-context-only"
    : !ownerIssued
      ? "owner-issued-incorporated-vnc-result-required"
      : !incorporatedVnc
        ? "incorporated-adverb-vnc-result-required"
        : ["subject", "agent"].includes(claimedRole)
          ? "incorporated-noun-cannot-be-subject-or-agent"
          : !roleLicensed
            ? nonactive
              ? "nonactive-incorporated-noun-requires-means-instrument-role"
              : "active-incorporated-noun-requires-adverbial-role"
            : !passiveAgentBarrierSatisfied
              ? "passive-agent-mention-forbidden"
              : "";
  const frame = deepFreeze({
    kind: "classical-nahuatl-incorporated-noun-role-validation",
    version: VERSION,
    authorizationStatus: authorized ? "authorized" : "blocked",
    blockReason,
    constructionFrame: ownerIssued ? constructionFrame : null,
    selectedVoice,
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
  const hostilePath = findHostileAuthorityPath(request);
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

export function installClassicalNahuatlNominalConstructionGlobals(targetObject = globalThis) {
  const target = targetObject && typeof targetObject === "object" ? targetObject : globalThis;
  const api = {
    CLASSICAL_NAHUATL_NOMINAL_EMBED_ADVERB_ROLES: NOMINAL_EMBED_ADVERB_ROLES,
    CLASSICAL_NAHUATL_NOMINAL_COMPOUND_EMBED_ROLES: NOMINAL_COMPOUND_EMBED_ROLES,
    CLASSICAL_NAHUATL_AFFECTIVE_NOMINAL_MATRICES: AFFECTIVE_NOMINAL_MATRICES,
    CLASSICAL_NAHUATL_CARDINAL_NOMINAL_CLASSIFIERS: CARDINAL_NOMINAL_CLASSIFIERS,
    validateClassicalNahuatlClosedConstructionException,
    isClassicalNahuatlClosedConstructionExceptionValidation,
    isClassicalNahuatlNominalConstructionSourceAuthorization,
    evaluateClassicalNahuatlNominalConstruction: request => evaluateNominalConstruction(request, target),
    isClassicalNahuatlNominalConstructionResult,
    validateClassicalNahuatlIncorporatedNounRole,
    isClassicalNahuatlIncorporatedNounRoleValidation,
    buildClassicalNahuatlNominalConstructionParadigmPlan: request => buildParadigmPlan(request, target),
    isClassicalNahuatlNominalConstructionParadigmPlan,
    projectClassicalNahuatlNominalConstructionParadigmCoordinates: (plan, coordinates) => projectParadigm(plan, coordinates, target),
    isClassicalNahuatlNominalConstructionParadigmCoordinate,
    buildClassicalNahuatlNominalConstructionUiProjection: buildUiProjection,
    isClassicalNahuatlNominalConstructionUiProjection,
  };
  Object.defineProperties(target, Object.getOwnPropertyDescriptors(api));
  return api;
}
