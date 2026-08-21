// Canonical Lessons 45-47 relational-NNC grammar.
//
// The lesson numbers are evidence indexes. Runtime authority comes from the
// typed stem license, operation, participant/state mapping, and boundary
// realization encoded below.

const freeze = (value) => {
  if (value && typeof value === "object" && Object.isFrozen(value)) {
    return value;
  }
  if (Array.isArray(value)) {
    value.forEach(freeze);
  } else if (value && typeof value === "object") {
    Object.values(value).forEach(freeze);
  }
  return Object.freeze(value);
};

const OPTION = freeze({
  ONE: "option-one",
  TWO: "option-two",
  THREE: "option-three",
  FOUR: "option-four",
});

const STATE = freeze({
  ABSOLUTIVE: "absolutive",
  POSSESSIVE: "possessive",
});

const SUBJECT_PREFIXES = freeze({
  "1sg": "ni",
  "2sg": "ti",
  "3sg": "",
  "1pl": "ti",
  "2pl": "an",
  "3pl": "",
  "3common": "",
});

const POSSESSOR_PREFIXES = freeze({
  "1sg": "no",
  "2sg": "mo",
  "3sg": "ī",
  "3common": "ī",
  "1pl": "to",
  "2pl": "amo",
  "3pl": "īn",
  "nonspecific-human": "tē",
  "nonspecific-nonhuman": "tla",
  reciprocal: "ne",
});

const OPTION_GROUPS = freeze({
  "option-one-only": [OPTION.ONE],
  "option-two-only": [OPTION.TWO],
  "options-one-two": [OPTION.ONE, OPTION.TWO],
  "options-one-three": [OPTION.ONE, OPTION.THREE],
  "options-one-two-three": [OPTION.ONE, OPTION.TWO, OPTION.THREE],
});

const sourceKinds = (...values) => freeze(values);

export const CLASSICAL_NAHUATL_LESSONS45_47_RELATIONAL_STEMS = freeze([
  {
    stemId: "huan-company",
    optionGroup: "option-one-only",
    classicalMatrix: "huān",
    relationalKind: "company",
    allowedSourceKinds: sourceKinds("possessor"),
    affective: true,
  },
  {
    stemId: "tloc-proximity",
    optionGroup: "option-one-only",
    classicalMatrix: "tloc",
    relationalKind: "proximity",
    allowedSourceKinds: sourceKinds("possessor"),
    affective: true,
  },
  {
    stemId: "pal-favor",
    optionGroup: "option-one-only",
    classicalMatrix: "pal",
    relationalKind: "favor",
    allowedSourceKinds: sourceKinds("possessor"),
    affective: true,
  },
  {
    stemId: "c-means-purpose-reason-time",
    optionGroup: "option-one-only",
    classicalMatrix: "c",
    relationalKind: "means-purpose-reason-time",
    allowedSourceKinds: sourceKinds("possessor"),
    fixedPossessorId: "3common",
    affective: true,
    functions: ["means", "purpose", "reason", "time", "ordinal", "adverbial", "degree", "measurement"],
  },
  {
    stemId: "n-locative",
    optionGroup: "option-two-only",
    classicalMatrix: "n",
    relationalKind: "locative",
    allowedSourceKinds: sourceKinds(
      "nounstem",
      "preterit-agentive-general-use",
      "active-action",
      "interrogative-empty",
      "interrogative-modifier",
      "imperfect-predicate",
      "incorporated-adverb-imperfect-predicate"
    ),
    sourceFormationIds: [
      "plain-nounstem",
      "preterit-agentive",
      "active-action",
      "can-interrogative",
      "can-modified",
      "imperfect-active",
      "imperfect-passive",
      "imperfect-impersonal",
      "present-yohua",
    ],
    affective: true,
  },
  {
    stemId: "yan-locative",
    optionGroup: "option-two-only",
    classicalMatrix: "yā-n",
    relationalKind: "locative-perfective",
    allowedSourceKinds: sourceKinds(
      "perfective-core",
      "incorporated-adverb-perfective-core",
      "impersonal-tla-perfective-core"
    ),
    sourceFormationIds: ["perfective-active", "perfective-impersonal-tla"],
    affective: true,
  },
  {
    stemId: "tlah-abundance-place",
    optionGroup: "option-two-only",
    classicalMatrix: "tlah",
    relationalKind: "abundance-place",
    allowedSourceKinds: sourceKinds("nounstem", "varietal-nounstem"),
    affective: true,
  },
  {
    stemId: "co-c-specific-location",
    optionGroup: "option-two-only",
    classicalMatrix: "co/c",
    relationalKind: "specific-location",
    allowedSourceKinds: sourceKinds("nounstem", "compound-nounstem", "temporal-yo-stem", "body-part-stem"),
    affective: true,
  },
  {
    stemId: "ca-interval-distance",
    optionGroup: "option-two-only",
    classicalMatrix: "ca",
    relationalKind: "interval-distance",
    allowedSourceKinds: sourceKinds("quantitive", "hueh", "lexical"),
    affective: true,
  },
  {
    stemId: "pa-direction",
    optionGroup: "option-two-only",
    classicalMatrix: "pa",
    relationalKind: "direction",
    allowedSourceKinds: sourceKinds("particle", "nounstem", "relational-compound", "can-compound", "ican"),
    affective: true,
  },
  {
    stemId: "pa-frequency",
    optionGroup: "option-two-only",
    classicalMatrix: "pa",
    relationalKind: "frequency",
    allowedSourceKinds: sourceKinds("quantitive", "numeral"),
    defaultEmbeddedStem: "ōm",
    affective: true,
  },
  {
    stemId: "nal-far-bank",
    optionGroup: "option-two-only",
    classicalMatrix: "nāl",
    relationalKind: "far-bank",
    allowedSourceKinds: sourceKinds("water-stem"),
    fixedEmbeddedStem: "ā",
    affective: true,
  },
  {
    stemId: "chi-direction-toward",
    optionGroup: "option-two-only",
    classicalMatrix: "chi",
    relationalKind: "direction-toward",
    allowedSourceKinds: sourceKinds("ground-stem", "rare-nounstem"),
    affective: true,
  },
  {
    stemId: "ic-downward-direction",
    optionGroup: "option-two-only",
    classicalMatrix: "ic",
    relationalKind: "downward-direction",
    allowedSourceKinds: sourceKinds("body-part-stem"),
    affective: true,
  },
  {
    stemId: "teuh-similarity",
    optionGroup: "option-two-only",
    classicalMatrix: "teuh",
    relationalKind: "similarity-manner",
    allowedSourceKinds: sourceKinds("nounstem"),
    affective: true,
  },
  {
    stemId: "tzalan-between",
    optionGroup: "options-one-two",
    classicalMatrix: "tzālan",
    relationalKind: "between-among",
    allowedSourceKinds: sourceKinds("possessor", "nounstem", "varietal-nounstem"),
    affective: true,
  },
  {
    stemId: "huic-direction",
    optionGroup: "options-one-two",
    classicalMatrix: "huic",
    relationalKind: "direction",
    allowedSourceKinds: sourceKinds("possessor", "nounstem", "relational-compound", "negative-particle"),
    affective: true,
  },
  {
    stemId: "ca-means",
    optionGroup: "options-one-three",
    classicalMatrix: "ca",
    relationalKind: "means",
    allowedSourceKinds: sourceKinds("possessor", "nounstem", "numeral", "temporal-nounstem", "modified-structure"),
    affective: true,
  },
  {
    stemId: "icpac-top",
    optionGroup: "options-one-three",
    classicalMatrix: "icpa-c",
    relationalKind: "top-location",
    allowedSourceKinds: sourceKinds("possessor", "nounstem"),
    affective: true,
  },
  {
    stemId: "tech-contact",
    optionGroup: "options-one-two-three",
    classicalMatrix: "tech",
    relationalKind: "contact",
    allowedSourceKinds: sourceKinds("possessor", "nounstem", "compound-nounstem"),
    affective: true,
  },
  {
    stemId: "tlan-bottom",
    optionGroup: "options-one-two-three",
    classicalMatrix: "tlan",
    relationalKind: "bottom-adjacency",
    allowedSourceKinds: sourceKinds("possessor", "nounstem", "body-part-stem", "compound-nounstem"),
    affective: true,
  },
  {
    stemId: "pan-surface-time",
    optionGroup: "options-one-two-three",
    classicalMatrix: "pan",
    relationalKind: "surface-place-time",
    allowedSourceKinds: sourceKinds("possessor", "nounstem", "body-part-stem", "compound-nounstem"),
    affective: true,
  },
]);

const AXES = [
  "relational-nounstem-not-preposition",
  "translation-preposition-has-no-source-slot",
  "relational-context-role-locale-source-goal-path",
  "supplementary-possessor-cooperation",
  "affective-relational-tzin-or-ton-then-co",
  "usage-option-one-simple-possessive",
  "usage-option-two-integrated-matrix",
  "usage-option-three-linked-connective-t",
  "usage-option-four-compound-embed",
  "five-option-groups",
  "option-one-only-four-stems",
  "huan-reciprocal-downgrade",
  "huan-and-pan-numeral-link-not-conjunctor",
  "ic-fixed-third-common-possessor",
  "ic-means-purpose-reason-time-functions",
  "ic-initial-interrogative-vs-noninitial",
  "ic-canin-fusion-only-with-absent-adjunct",
  "ic-negative-noninterrogative",
  "ic-ordinal-adverb-degree-measurement",
  "option-two-only-eleven-matrices-not-suffixes",
  "locative-n-supportive-i-after-consonant",
  "locative-n-ca-two-source-attachments",
  "locative-n-active-action-possessor-agent",
  "locative-n-imperfect-active-passive-impersonal-state-mapping",
  "locative-n-yohua-present-exception",
  "locative-n-varietal-and-affective",
  "yan-perfective-source-subject-to-possessor",
  "yan-absolutive-incorporated-adverb-and-tla-impersonal",
  "tlah-abundance-absolutive-or-possessive",
  "co-c-conditioned-by-preceding-segment",
  "co-fire-after-vowel-exception",
  "co-c-temporal-yo-and-nested-location",
  "co-c-body-part-combinations-not-compound-prepositions",
  "co-c-affective-silent-replacement",
  "ca-interval-vs-locative-c-homonym",
  "pa-direction-vs-pa-frequency-source-gate",
  "pa-direction-can-embed-relational-compounds",
  "co-pa-composed-direction-source",
  "pa-frequency-boundary-assimilation",
  "nal-fixed-water-embed",
  "chi-favorite-ground-vs-rare-other-embed",
  "ic-downward-body-part-source",
  "teuh-similarity-manner",
  "options-one-two-tzalan-and-huic",
  "options-one-three-ca-and-icpac",
  "options-one-two-three-tech-tlan-pan",
  "associated-entity-ca-matrix",
  "associated-entity-co-c-silent-replacement",
  "associated-entity-not-gentilic",
  "pertinency-direct-relational-source",
  "pertinency-associated-entity-source",
  "embedded-possessor-does-not-control-outer-state",
  "ordinary-vs-adverbialized-subject-branch",
  "numeral-modifier-of-co-c-must-be-adverbialized",
  "contextual-translation-does-not-authorize-morphology",
];

export const CLASSICAL_NAHUATL_LESSONS45_47_GCD = freeze({
  identityId: "typed-nounstem+derived-lexical-class+licensed-formation+participant-state-mapping+boundary-realization+nnc-result",
  stageOrder: [
    "validate-one-nounstem",
    "derive-nounstem-lexical-class",
    "select-licensed-formation",
    "map-state-and-participants",
    "realize-relational-boundaries",
    "compose-nnc-result",
  ],
  typedSourceRequired: true,
  typedOperationRequired: true,
  canonicalResultRequired: true,
  formulaStringAuthority: false,
  surfaceStringAuthority: false,
  lessonMetadataAuthority: false,
});

export const CLASSICAL_NAHUATL_LESSONS45_47_LCM = freeze({
  identityId: "complete-lessons45-47-nounstem-relational-license-space",
  sourceCategory: "nounstem",
  derivedLexicalClasses: ["relational"],
  axes: AXES.map((axisId) => ({ axisId })),
  nounstemIds: CLASSICAL_NAHUATL_LESSONS45_47_RELATIONAL_STEMS.map(({ stemId }) => stemId),
  optionIds: Object.values(OPTION),
  optionGroupIds: Object.keys(OPTION_GROUPS),
  nounstemOperations: ["relational-nnc", "compound-embed", "associated-entity", "pertinency"],
});

export const CLASSICAL_NAHUATL_NNC_NOUNSTEM_REQUEST_KIND =
  "classical-nahuatl-nnc-nounstem-request";

const normalizeToken = (value) => String(value ?? "").trim().toLowerCase().replace(/[_\s]+/gu, "-");
const normalizeStemText = (value) => String(value ?? "")
  .trim()
  .replace(/^\((.*)\)$/u, "$1")
  .replace(/[#+={}]/gu, "")
  .replace(/[Øø⎕]/gu, "")
  .replace(/\s+/gu, "");

const OWNER_ISSUED_DERIVED_SOURCE_FORMATIONS = freeze([
  "preterit-agentive",
  "active-action",
  "imperfect-active",
  "imperfect-passive",
  "imperfect-impersonal",
  "present-yohua",
  "perfective-active",
  "perfective-impersonal-tla",
]);

const VNC_DERIVED_SOURCE_FORMATIONS = freeze({
  "imperfect-active": {
    tense: "imperfect",
    voiceOperations: ["active"],
  },
  "imperfect-passive": {
    tense: "imperfect",
    voiceOperations: ["passive"],
  },
  "imperfect-impersonal": {
    tense: "imperfect",
    voiceOperations: ["impersonal", "inherent-impersonal"],
  },
  "present-yohua": {
    tense: "present",
    voiceOperations: ["active"],
    requiredStemEnding: "yohua",
  },
  "perfective-active": {
    tense: "preterit",
    voiceOperations: ["active"],
  },
  "perfective-impersonal-tla": {
    tense: "preterit",
    voiceOperations: ["tla-impersonal"],
  },
});

function findStem(stemId) {
  const normalized = normalizeToken(stemId);
  return CLASSICAL_NAHUATL_LESSONS45_47_RELATIONAL_STEMS.find((entry) => entry.stemId === normalized) || null;
}

function realizeClassicalTranscription(value) {
  return String(value || "");
}

function endsInVowel(value) {
  return /[aeiouāēīō]$/u.test(String(value || ""));
}

function sourceFrameMatrixForCoC(sourceEmbedStem, sourceLexemeId = "") {
  return sourceLexemeId === "tle-fire" || !endsInVowel(sourceEmbedStem) ? "co" : "c";
}

function buildPredicateSegment({
  morpheme = "",
  role = "predicate",
  formulaCarrier = morpheme,
  writtenCarrier = morpheme,
  contextualRuleId = "",
} = {}) {
  return {
    morpheme: String(morpheme || ""),
    role: String(role || "predicate"),
    formulaCarrier: String(formulaCarrier || ""),
    writtenCarrier: String(writtenCarrier || ""),
    contextualRuleId: String(contextualRuleId || ""),
  };
}

function buildPredicateSegmentsFromTypedCarrier(value, role = "source") {
  return String(value || "")
    .split("-")
    .filter(Boolean)
    .map((morpheme) => buildPredicateSegment({
      morpheme,
      role: morpheme === "0" ? "silent-boundary" : role,
      formulaCarrier: morpheme,
      writtenCarrier: morpheme === "0" ? "" : morpheme,
      contextualRuleId: morpheme === "0" ? "typed-zero-has-no-written-carrier" : "",
    }));
}

function replaceFinalPredicateSegment(segments, replacement) {
  if (!segments.length) {
    return [];
  }
  return segments.map((segment, index) => (
    index === segments.length - 1
      ? { ...segment, ...replacement(segment) }
      : { ...segment }
  ));
}

function removeFinalSemanticSuffix(segments, suffixes) {
  if (!segments.length) {
    return [];
  }
  const finalSegment = segments.at(-1);
  const suffix = suffixes.find((candidate) => finalSegment.morpheme.endsWith(candidate));
  if (!suffix) {
    return segments.map((segment) => ({ ...segment }));
  }
  const trimSuffix = (value) => String(value || "").endsWith(suffix)
    ? String(value).slice(0, -suffix.length)
    : String(value || "");
  const retained = replaceFinalPredicateSegment(segments, (segment) => ({
    morpheme: trimSuffix(segment.morpheme),
    formulaCarrier: trimSuffix(segment.formulaCarrier),
    writtenCarrier: trimSuffix(segment.writtenCarrier),
  }));
  return retained.filter((segment) => (
    segment.morpheme || segment.formulaCarrier || segment.writtenCarrier
  ));
}

function applyFrequencyBoundaryToSegments(sourceSegments) {
  const finalMorpheme = sourceSegments.at(-1)?.morpheme || "";
  if (/m$/u.test(finalMorpheme)) {
    return [
      ...replaceFinalPredicateSegment(sourceSegments, (segment) => ({
        writtenCarrier: segment.writtenCarrier.slice(0, -1),
        contextualRuleId: "frequency-final-m-or-w-before-pa",
      })),
      buildPredicateSegment({
        morpheme: "pa",
        role: "matrix",
        formulaCarrier: "pa",
        writtenCarrier: "ppa",
        contextualRuleId: "frequency-final-m-or-w-before-pa",
      }),
    ];
  }
  if (/y$/u.test(finalMorpheme)) {
    return [
      ...replaceFinalPredicateSegment(sourceSegments, (segment) => ({
        writtenCarrier: segment.writtenCarrier.slice(0, -1),
        contextualRuleId: "frequency-final-y-before-pa",
      })),
      buildPredicateSegment({
        morpheme: "pa",
        role: "matrix",
        formulaCarrier: "pa",
        writtenCarrier: "xpa",
        contextualRuleId: "frequency-final-y-before-pa",
      }),
    ];
  }
  return [
    ...sourceSegments.map((segment) => ({ ...segment })),
    buildPredicateSegment({ morpheme: "pa", role: "matrix" }),
  ];
}

function applyAffectiveBoundaryToSegments(predicateSegments, affective) {
  if (!["honorific", "pejorative"].includes(affective)) {
    return predicateSegments.map((segment) => ({ ...segment }));
  }
  return [
    ...removeFinalSemanticSuffix(predicateSegments, ["co"]),
    buildPredicateSegment({
      morpheme: affective === "honorific" ? "tzin" : "tōn",
      role: "affective",
    }),
    buildPredicateSegment({ morpheme: "co", role: "adverbializer" }),
  ];
}

function buildPredicateRecord({
  predicateSegments = [],
  operationId = "",
  operationTrace = [],
  nounConnector = "",
} = {}) {
  const normalizedPredicateSegments = freeze(predicateSegments.map((segment, index) => ({
    segmentId: `predicate-${index + 1}`,
    morpheme: String(segment?.morpheme || ""),
    role: String(segment?.role || "predicate"),
    formulaCarrier: String(segment?.formulaCarrier || ""),
    writtenCarrier: String(segment?.writtenCarrier || ""),
    contextualRuleId: String(segment?.contextualRuleId || ""),
  })));
  const formulaPredicate = normalizedPredicateSegments
    .map((segment) => segment.formulaCarrier)
    .filter(Boolean)
    .join("-");
  const writtenPredicate = normalizedPredicateSegments
    .map((segment) => segment.writtenCarrier)
    .filter(Boolean)
    .join("");
  return {
    predicateSegments: normalizedPredicateSegments,
    formulaPredicate,
    writtenPredicate,
    classicalPredicate: writtenPredicate,
    formulaProjection: freeze({
      kind: "classical-nahuatl-relational-nnc-formula-predicate-projection",
      sourceKind: "typed-predicate-segments",
      segmentCarriers: normalizedPredicateSegments.map((segment) => segment.formulaCarrier),
      result: formulaPredicate,
      derivedFromWrittenProjection: false,
    }),
    writtenProjection: freeze({
      kind: "classical-nahuatl-relational-nnc-written-predicate-projection",
      sourceKind: "typed-predicate-segments",
      segmentCarriers: normalizedPredicateSegments.map((segment) => segment.writtenCarrier),
      result: writtenPredicate,
      derivedFromFormulaProjection: false,
    }),
    formulaDerivedFromWritten: false,
    writtenDerivedFromFormula: false,
    operationId,
    operationTrace: [...operationTrace],
    ...(nounConnector ? { nounConnector } : {}),
  };
}

function getAllowedOptions(stem) {
  return [...(OPTION_GROUPS[stem?.optionGroup] || []), OPTION.FOUR];
}

function getAllowedStates(option) {
  if (option === OPTION.ONE) {
    return [STATE.POSSESSIVE];
  }
  if (option === OPTION.TWO || option === OPTION.THREE) {
    return [STATE.ABSOLUTIVE, STATE.POSSESSIVE];
  }
  return [];
}

function deriveStateForSource(stemId, formationId, sourceVoice, sourceKind, requestedState) {
  if (stemId === "yan-locative") {
    return ["incorporated-adverb-perfective-core", "impersonal-tla-perfective-core"].includes(sourceKind)
      ? STATE.ABSOLUTIVE
      : STATE.POSSESSIVE;
  }
  if (stemId !== "n-locative") {
    return requestedState;
  }
  if (formationId === "preterit-agentive") {
    return STATE.ABSOLUTIVE;
  }
  if (formationId === "can-interrogative" || formationId === "can-modified") {
    return STATE.ABSOLUTIVE;
  }
  if (formationId === "active-action") {
    return STATE.POSSESSIVE;
  }
  if (formationId === "imperfect-passive") {
    return STATE.POSSESSIVE;
  }
  if (formationId === "imperfect-impersonal" || formationId === "present-yohua") {
    return STATE.ABSOLUTIVE;
  }
  if (formationId === "imperfect-active") {
    return sourceKind === "incorporated-adverb-imperfect-predicate"
      ? STATE.ABSOLUTIVE
      : STATE.POSSESSIVE;
  }
  if (sourceVoice === "impersonal") {
    return STATE.ABSOLUTIVE;
  }
  return requestedState;
}

function buildRelationalPredicate(targetObject, sourceFrame) {
  const {
    stem,
    option,
    constructionKind,
    affective,
    sourceKind,
    formationId,
    lexicalExceptionId,
  } = sourceFrame;
  const sourceStem = sourceFrame.predicateStemFrame.sourceEmbedStem
    || sourceFrame.predicateStemFrame.sourceStem;
  const targetStem = sourceFrame.predicateStemFrame.downstreamTargetStem;
  const matrix = stem.classicalMatrix;

  if (constructionKind === "compound-embed") {
    if (!targetStem) {
      return { error: "target-matrix-stem-required" };
    }
    const relationalEmbed = matrix.replace("/", "").replace(/-$/u, "");
    let relationalSegments = buildPredicateSegmentsFromTypedCarrier(relationalEmbed, "relational-source");
    const targetSegments = buildPredicateSegmentsFromTypedCarrier(targetStem, "target-matrix");
    const targetInitial = targetSegments[0]?.morpheme || "";
    const operationTrace = ["retain-relational-source", "place-relational-stem-in-embed"];
    if (/n$/u.test(relationalEmbed) && /^p/u.test(targetInitial)) {
      relationalSegments = replaceFinalPredicateSegment(relationalSegments, (segment) => ({
        writtenCarrier: segment.writtenCarrier.replace(/n$/u, "m"),
        contextualRuleId: "relational-n-before-p-as-m",
      }));
      operationTrace.push("realize-n-before-p-as-m");
    } else if (/c$/u.test(relationalEmbed) && /^[ei]/u.test(targetInitial)) {
      relationalSegments = replaceFinalPredicateSegment(relationalSegments, (segment) => ({
        writtenCarrier: segment.writtenCarrier.replace(/c$/u, "qu"),
        contextualRuleId: "relational-c-before-front-vowel-as-qu",
      }));
      operationTrace.push("realize-c-before-front-vowel-as-qu");
    }
    operationTrace.push("attach-selected-target-matrix");
    return buildPredicateRecord({
      predicateSegments: [...relationalSegments, ...targetSegments],
      operationId: "relational-option-four-compound-embed",
      operationTrace,
    });
  }

  if (option === OPTION.ONE) {
    let predicateSegments = buildPredicateSegmentsFromTypedCarrier(matrix.replace("/", ""), "relational-matrix");
    const operationTrace = ["select-simple-relational-predicate", "require-possessive-state"];
    if (affective !== "none") {
      if (!stem.affective) {
        return { error: "affective-formation-not-licensed-for-stem" };
      }
      predicateSegments = applyAffectiveBoundaryToSegments(predicateSegments, affective);
      operationTrace.push("embed-relational-stem-in-affective", "validate-adverbiality-with-final-co");
    }
    return buildPredicateRecord({
      predicateSegments,
      operationId: "relational-option-one-simple-possessive",
      operationTrace,
    });
  }

  if (!sourceStem && sourceKind !== "interrogative-empty") {
    return { error: "embedded-source-required" };
  }

  let predicateSegments = [];
  let operationId = option === OPTION.THREE
    ? "relational-option-three-linked-matrix"
    : "relational-option-two-integrated-matrix";
  const operationTrace = ["retain-typed-embedded-source"];
  const sourceSegments = buildPredicateSegmentsFromTypedCarrier(sourceStem, "embedded-source");

  if (stem.stemId === "n-locative") {
    if (formationId === "can-interrogative") {
      predicateSegments = [
        buildPredicateSegment({ morpheme: "cā", role: "interrogative-base" }),
        buildPredicateSegment({ morpheme: "n", role: "locative-matrix" }),
      ];
      operationTrace.push("form-interrogative-ca-n");
    } else if (formationId === "can-modified") {
      predicateSegments = [
        ...sourceSegments,
        buildPredicateSegment({ morpheme: "cā", role: "interrogative-base" }),
        buildPredicateSegment({ morpheme: "n", role: "locative-matrix" }),
      ];
      operationTrace.push("attach-modifier-to-ca-n");
    } else if (formationId === "present-yohua") {
      predicateSegments = [
        ...sourceSegments,
        buildPredicateSegment({ morpheme: "n", role: "locative-matrix" }),
      ];
      operationTrace.push("retain-present-predicate-yohua", "attach-locative-n");
    } else {
      predicateSegments = [
        ...sourceSegments,
        buildPredicateSegment({
          morpheme: endsInVowel(sourceStem) ? "n" : "ni",
          role: "locative-matrix",
        }),
      ];
      operationTrace.push(
        formationId.startsWith("imperfect-") ? "retain-nominalized-imperfect-predicate" : "retain-licensed-source-stem",
        endsInVowel(sourceStem) ? "attach-locative-n" : "insert-supportive-i-before-locative-n"
      );
    }
  } else if (stem.stemId === "yan-locative") {
    predicateSegments = [
      ...sourceSegments,
      buildPredicateSegment({ morpheme: "yā", role: "perfective-relational-matrix" }),
      buildPredicateSegment({ morpheme: "n", role: "locative-matrix" }),
    ];
    operationTrace.push("retain-perfective-core", "attach-locative-ya-n");
  } else if (stem.stemId === "co-c-specific-location") {
    const useCo = sourceFrame.sourceLexemeId === "tle-fire" || !endsInVowel(sourceStem);
    predicateSegments = [
      ...sourceSegments,
      buildPredicateSegment({ morpheme: useCo ? "co" : "c", role: "specific-location-matrix" }),
    ];
    operationTrace.push(useCo ? "select-co-after-consonant-or-fire" : "select-c-after-vowel");
  } else if (stem.stemId === "tlah-abundance-place") {
    const matrixMorpheme = /l$/u.test(sourceStem) ? "lah" : "tlah";
    predicateSegments = [
      ...sourceSegments,
      buildPredicateSegment({ morpheme: matrixMorpheme, role: "abundance-place-matrix" }),
    ];
    operationTrace.push("attach-abundance-tlah", matrixMorpheme === "lah" ? "realize-l-plus-tl-as-l-l" : "retain-boundary");
  } else if (stem.stemId === "pa-frequency") {
    const frequencyAssimilates = /[my]$/u.test(sourceStem);
    predicateSegments = applyFrequencyBoundaryToSegments(sourceSegments);
    operationTrace.push("attach-frequency-pa", frequencyAssimilates ? "realize-frequency-assimilation" : "retain-boundary");
  } else if (stem.stemId === "tlan-bottom" && option === OPTION.TWO && /l$/u.test(sourceStem)) {
    predicateSegments = [
      ...sourceSegments,
      buildPredicateSegment({ morpheme: "lan", role: "integrated-relational-matrix" }),
    ];
    operationTrace.push("attach-integrated-relational-matrix", "realize-l-plus-tl-as-ll");
  } else if (stem.stemId === "nal-far-bank") {
    predicateSegments = [
      ...buildPredicateSegmentsFromTypedCarrier("ā", "water-source"),
      buildPredicateSegment({ morpheme: "nāl", role: "far-bank-matrix" }),
    ];
    operationTrace.push("require-water-embed", "attach-far-bank-nal");
  } else if (option === OPTION.THREE) {
    if (lexicalExceptionId === "ohtli-ca") {
      predicateSegments = [
        buildPredicateSegment({ morpheme: "oh", role: "lexical-exception-source" }),
        buildPredicateSegment({ morpheme: "tli", role: "retained-absolutive" }),
        buildPredicateSegment({ morpheme: "ca", role: "linked-relational-matrix" }),
      ];
      operationTrace.push("apply-licensed-ohtli-ca-retention");
    } else {
      const normalizedMatrix = matrix.replace("/", "");
      const connective = /^[aeiouāēīō]/u.test(normalizedMatrix) ? "t" : "ti";
      predicateSegments = [
        ...sourceSegments,
        buildPredicateSegment({ morpheme: connective, role: "connective" }),
        ...buildPredicateSegmentsFromTypedCarrier(normalizedMatrix, "linked-relational-matrix"),
      ];
      operationTrace.push(
        /^[aeiouāēīō]/u.test(normalizedMatrix)
          ? "insert-connective-t"
          : "insert-connective-t-with-supportive-i",
        "attach-linked-relational-matrix"
      );
    }
  } else {
    predicateSegments = [
      ...sourceSegments,
      ...buildPredicateSegmentsFromTypedCarrier(matrix.replace("/", ""), "integrated-relational-matrix"),
    ];
    operationTrace.push("attach-integrated-relational-matrix");
  }

  if (affective !== "none") {
    if (!stem.affective) {
      return { error: "affective-formation-not-licensed-for-stem" };
    }
    predicateSegments = applyAffectiveBoundaryToSegments(predicateSegments, affective);
    operationTrace.push("embed-relational-stem-in-affective", "validate-adverbiality-with-final-co");
  }

  return buildPredicateRecord({
    predicateSegments,
    operationId,
    operationTrace,
  });
}

function buildDerivedPredicate(sourceFrame) {
  const source = sourceFrame.predicateStemFrame.sourceStem;
  if (!source) {
    return { error: "typed-relational-source-required" };
  }
  const sourceSegments = buildPredicateSegmentsFromTypedCarrier(source, "derived-relational-source");
  if (sourceFrame.constructionKind === "associated-entity") {
    const sourceEndsInCoOrC = /(?:co|c)$/u.test(source);
    const baseSegments = sourceEndsInCoOrC
      ? removeFinalSemanticSuffix(sourceSegments, ["co", "c"])
      : sourceSegments;
    return buildPredicateRecord({
      predicateSegments: [
        ...baseSegments,
        buildPredicateSegment({ morpheme: "ca", role: "associated-entity-matrix" }),
      ],
      nounConnector: "tl",
      operationId: "relational-associated-entity-ca",
      operationTrace: [
        "consume-compound-relational-source",
        ...(sourceEndsInCoOrC ? ["replace-final-co-or-c-with-silent-variant"] : []),
        "attach-associated-entity-ca",
      ],
    });
  }
  if (sourceFrame.constructionKind === "pertinency") {
    return buildPredicateRecord({
      predicateSegments: [
        ...sourceSegments,
        buildPredicateSegment({ morpheme: "yō", role: "pertinency-matrix" }),
      ],
      nounConnector: "tl",
      operationId: sourceFrame.pertinencySourceKind === "associated-entity"
        ? "relational-pertinency-from-associated-entity"
        : "relational-pertinency-direct",
      operationTrace: [
        sourceFrame.pertinencySourceKind === "associated-entity"
          ? "consume-associated-entity-stem"
          : "consume-adverbialized-relational-stem",
        "attach-pertinency-yo",
      ],
    });
  }
  return { error: "derived-construction-kind-invalid" };
}

function buildFormulaAndSurface(targetObject, sourceFrame, predicateRecord) {
  const state = sourceFrame.state;
  const formulaPredicate = predicateRecord.formulaPredicate;
  const writtenPredicate = predicateRecord.writtenPredicate;
  const predicateSurface = realizeClassicalTranscription(writtenPredicate);
  const possessorClassical = state === STATE.POSSESSIVE
    ? POSSESSOR_PREFIXES[sourceFrame.possessorId] || ""
    : "";
  const possessorSurface = realizeClassicalTranscription(possessorClassical);
  const normalSubject = sourceFrame.subjectMode === "normal";
  const subjectClassical = normalSubject ? SUBJECT_PREFIXES[sourceFrame.subjectId] || "" : "";
  const subjectSurface = realizeClassicalTranscription(subjectClassical);
  const nounConnector = sourceFrame.nounConnector || predicateRecord.nounConnector || "";
  const nounConnectorSurface = realizeClassicalTranscription(nounConnector);
  const pluralConnector = sourceFrame.numberConnector || "";
  const pluralConnectorSurface = realizeClassicalTranscription(pluralConnector);
  const formula = state === STATE.POSSESSIVE
    ? `#${normalSubject ? subjectClassical || "Ø" : "Ø"}-Ø+${possessorClassical || "Ø"}-Ø(${formulaPredicate})${nounConnector || "Ø"}-${pluralConnector || "Ø"}#`
    : `#${normalSubject ? subjectClassical || "Ø" : "Ø"}-Ø(${formulaPredicate})${nounConnector || "Ø"}-${pluralConnector || "Ø"}#`;
  const surface = `${subjectSurface}${possessorSurface}${predicateSurface}${nounConnectorSurface}${pluralConnectorSurface}`;
  const formulaSlots = freeze({
    subject: subjectClassical,
    possessor: possessorClassical,
    predicate: formulaPredicate,
    writtenPredicate,
    nounConnector,
    numberConnector: pluralConnector,
    state,
    subjectMode: sourceFrame.subjectMode,
  });
  const writtenSlots = freeze({
    subject: subjectSurface,
    possessor: possessorSurface,
    predicate: predicateSurface,
    nounConnector: nounConnectorSurface,
    numberConnector: pluralConnectorSurface,
    state,
    subjectMode: sourceFrame.subjectMode,
  });
  return {
    predicate: writtenPredicate,
    formulaPredicate,
    writtenPredicate,
    predicateSegments: predicateRecord.predicateSegments,
    predicateSurface,
    possessorSurface,
    subjectSurface,
    nounConnector,
    numberConnector: pluralConnector,
    formula,
    surface,
    formulaSlots,
    writtenSlots,
    formulaProjection: freeze({
      kind: "classical-nahuatl-relational-nnc-formula-projection",
      sourceKind: "typed-predicate-segments-and-typed-nnc-slots",
      predicateProjection: predicateRecord.formulaProjection,
      slots: formulaSlots,
      result: formula,
      derivedFromWrittenProjection: false,
    }),
    writtenProjection: freeze({
      kind: "classical-nahuatl-relational-nnc-written-projection",
      sourceKind: "typed-predicate-segments-and-typed-nnc-slots",
      predicateProjection: predicateRecord.writtenProjection,
      slots: writtenSlots,
      result: surface,
      derivedFromFormulaProjection: false,
    }),
    formulaDerivedFromWritten: false,
    writtenDerivedFromFormula: false,
  };
}

function makeBlocked(request, diagnostics, partial = {}) {
  return freeze({
    kind: "classical-nahuatl-relational-nnc-relational-result",
    contractKind: "classical-nahuatl-relational-nnc-relational-result",
    version: 1,
    authorizationStatus: "blocked",
    generationAllowed: false,
    supported: false,
    result: "—",
    surface: "",
    surfaceForms: [],
    formula: "",
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    lessonMetadataAuthority: false,
    diagnostics: freeze([...diagnostics]),
    requestSnapshot: freeze({
      nounstemKind: String(request?.nounstem?.kind || ""),
      stemId: normalizeToken(request?.nounstem?.stemId),
      formation: normalizeToken(request?.nounstem?.formation),
      operation: normalizeToken(request?.nounstem?.operation || "relational-nnc"),
    }),
    ...partial,
  });
}

function resolveOwnerIssuedDerivedSourceCarrier(
  targetObject,
  normalized,
  issuedUpstreamSourceCarriers,
) {
  const associatedEntityPertinency =
    normalized.constructionKind === "pertinency"
    && normalized.pertinencySourceKind === "associated-entity";
  if (associatedEntityPertinency) {
    const upstreamResult = normalized.upstreamResult;
    const ownerValidator =
      targetObject?.isClassicalNahuatlRelationalResult;
    if (
      typeof ownerValidator !== "function"
      || ownerValidator(upstreamResult) !== true
      || upstreamResult.constructionKind !== "associated-entity"
    ) {
      return {
        diagnostics: ["canonical-associated-entity-upstream-result-required"],
        carrier: null,
        normalized,
      };
    }
    const sourceSegments =
      upstreamResult.operationFrame?.predicateStemFrame?.predicateSegments;
    const sourceMorphemes = Array.isArray(sourceSegments)
      ? sourceSegments.map((segment) => normalizeStemText(segment?.morpheme))
      : [];
    if (
      !sourceMorphemes.length
      || sourceMorphemes.some((morpheme) => !morpheme)
    ) {
      return {
        diagnostics: ["associated-entity-upstream-typed-segments-required"],
        carrier: null,
        normalized,
      };
    }
    const sourceStem = sourceMorphemes.join("-");
    if (normalized.sourceStemSupplied && normalized.sourceStem !== sourceStem) {
      return {
        diagnostics: ["caller-derived-source-claim-mismatch"],
        carrier: null,
        normalized,
      };
    }
    const carrier = Object.freeze({
      kind: "classical-nahuatl-relational-derived-source-carrier",
      contractKind: "classical-nahuatl-relational-derived-source-carrier",
      version: 1,
      ownerOperationId: upstreamResult.operationFrame?.operationId || "",
      ownerResult: upstreamResult,
      sourceKind: "associated-entity",
      sourceFormation: "associated-entity",
      sourceVoice: "not-applicable",
      sourceStem,
      sourceSegments,
      typedSourceAuthority: true,
      callerSuppliedAuthorityAccepted: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      lessonMetadataAuthority: false,
    });
    issuedUpstreamSourceCarriers.add(carrier);
    return {
      diagnostics: [],
      carrier,
      normalized: {
        ...normalized,
        sourceKind: carrier.sourceKind,
        formationId: carrier.sourceFormation,
        sourceVoice: carrier.sourceVoice,
        sourceStem,
      },
    };
  }
  if (!OWNER_ISSUED_DERIVED_SOURCE_FORMATIONS.includes(normalized.formationId)) {
    return { diagnostics: [], carrier: null, normalized };
  }
  const upstreamResult = normalized.upstreamResult;
  if (!upstreamResult || typeof upstreamResult !== "object") {
    return {
      diagnostics: ["owner-issued-upstream-result-required"],
      carrier: null,
      normalized,
    };
  }

  let ownerOperationId = "";
  let sourceKind = "";
  let sourceFormation = normalized.formationId;
  let sourceVoice = "";
  let sourceStem = "";

  if (["preterit-agentive", "active-action"].includes(normalized.formationId)) {
    const ownerValidator = targetObject?.isClassicalNahuatlDeverbalNncGrammarFrame;
    if (
      typeof ownerValidator !== "function"
      || ownerValidator(upstreamResult) !== true
    ) {
      return {
        diagnostics: ["canonical-deverbal-upstream-result-required"],
        carrier: null,
        normalized,
      };
    }
    const expectedOperationId = `predicate-nominalization:${normalized.formationId}`;
    if (upstreamResult.operationFrame?.operationId !== expectedOperationId) {
      return {
        diagnostics: ["deverbal-upstream-operation-mismatch"],
        carrier: null,
        normalized,
      };
    }
    sourceStem = normalizeStemText(
      upstreamResult.operationFrame?.targetStems?.generalUse,
    );
    if (!sourceStem) {
      return {
        diagnostics: ["deverbal-upstream-general-use-stem-required"],
        carrier: null,
        normalized,
      };
    }
    ownerOperationId = expectedOperationId;
    sourceKind = normalized.formationId === "preterit-agentive"
      ? "preterit-agentive-general-use"
      : "active-action";
    sourceVoice = normalizeToken(
      upstreamResult.operationFrame?.sourceVoice || "active",
    );
  } else {
    const ownerValidator = targetObject?.isClassicalNahuatlVncApplicationFrame;
    if (
      typeof ownerValidator !== "function"
      || ownerValidator(upstreamResult) !== true
    ) {
      return {
        diagnostics: ["canonical-vnc-upstream-result-required"],
        carrier: null,
        normalized,
      };
    }
    const vncResult = upstreamResult.resultFrame;
    const formationLicense =
      VNC_DERIVED_SOURCE_FORMATIONS[normalized.formationId];
    const selectedVoiceOperation = normalizeToken(
      vncResult?.selectedVoiceOperation || "active",
    );
    const selectedSourceVoice = normalizeToken(
      vncResult?.selectedSourceVoice
      || upstreamResult.normalizedRequest?.sourceVoice
      || vncResult?.selectedVoice
      || "active",
    );
    const selectedTense = normalizeToken(
      upstreamResult.normalizedRequest?.tense
      || upstreamResult.normalizedRequest?.semanticTense
      || "",
    );
    if (
      !formationLicense
      || !formationLicense.voiceOperations.some((voiceOperation) => (
        voiceOperation === selectedVoiceOperation
        || voiceOperation === selectedSourceVoice
      ))
      || selectedTense !== formationLicense.tense
    ) {
      return {
        diagnostics: ["vnc-upstream-formation-mismatch"],
        carrier: null,
        normalized,
      };
    }
    const typedPredicateSlot =
      vncResult?.finalTypedVncSlotFrame?.slots?.predicate || null;
    const typedPredicateStem = normalizeStemText(typedPredicateSlot?.stem);
    const typedTenseCarrier = normalizeStemText(typedPredicateSlot?.tns);
    sourceStem = [
      typedPredicateStem,
      typedTenseCarrier && typedTenseCarrier !== "0"
        ? typedTenseCarrier
        : "",
    ].filter(Boolean).join("-");
    if (
      !sourceStem
      || (
        formationLicense.requiredStemEnding
        && !sourceStem.endsWith(formationLicense.requiredStemEnding)
      )
    ) {
      return {
        diagnostics: ["vnc-upstream-predicate-stem-mismatch"],
        carrier: null,
        normalized,
      };
    }
    const incorporatedAdverb = normalizeStemText(
      upstreamResult.normalizedRequest?.incorporatedAdverb,
    );
    if (normalized.formationId === "imperfect-active") {
      sourceKind = incorporatedAdverb
        ? "incorporated-adverb-imperfect-predicate"
        : "imperfect-predicate";
    } else if (normalized.formationId === "perfective-active") {
      sourceKind = incorporatedAdverb
        ? "incorporated-adverb-perfective-core"
        : "perfective-core";
    } else if (normalized.formationId === "perfective-impersonal-tla") {
      sourceKind = "impersonal-tla-perfective-core";
    } else {
      sourceKind = "imperfect-predicate";
    }
    ownerOperationId = `vnc:application:${selectedVoiceOperation}:${selectedTense}`;
    sourceVoice = formationLicense.voiceOperations.includes(selectedSourceVoice)
      ? selectedSourceVoice
      : normalizeToken(vncResult?.selectedVoice || selectedVoiceOperation);
  }

  if (
    (normalized.sourceKindSupplied && normalized.sourceKind !== sourceKind)
    || (
      normalized.sourceFormationSupplied
      && normalized.formationId !== sourceFormation
    )
    || (
      normalized.sourceVoiceSupplied
      && normalized.sourceVoice !== sourceVoice
    )
    || (
      normalized.sourceStemSupplied
      && normalized.sourceStem !== sourceStem
    )
  ) {
    return {
      diagnostics: ["caller-derived-source-claim-mismatch"],
      carrier: null,
      normalized,
    };
  }

  const carrier = Object.freeze({
    kind: "classical-nahuatl-relational-derived-source-carrier",
    contractKind: "classical-nahuatl-relational-derived-source-carrier",
    version: 1,
    ownerOperationId,
    ownerResult: upstreamResult,
    sourceKind,
    sourceFormation,
    sourceVoice,
    sourceStem,
    typedSourceAuthority: true,
    callerSuppliedAuthorityAccepted: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    lessonMetadataAuthority: false,
  });
  issuedUpstreamSourceCarriers.add(carrier);
  return {
    diagnostics: [],
    carrier,
    normalized: {
      ...normalized,
      sourceKind,
      formationId: sourceFormation,
      sourceVoice,
      sourceStem,
    },
  };
}

function normalizeRequest(request = {}) {
  const nounstem = request?.nounstem && typeof request.nounstem === "object"
    ? request.nounstem
    : null;
  return {
    nounstemRequestValid:
      nounstem?.kind === CLASSICAL_NAHUATL_NNC_NOUNSTEM_REQUEST_KIND,
    stemId: normalizeToken(nounstem?.stemId),
    option: normalizeToken(nounstem?.formation || OPTION.TWO),
    constructionKind: normalizeToken(nounstem?.operation || "relational-nnc"),
    sourceKind: normalizeToken(nounstem?.sourceKind || "nounstem"),
    sourceKindSupplied: Boolean(String(nounstem?.sourceKind ?? "").trim()),
    formationId: normalizeToken(nounstem?.sourceFormation || "plain-nounstem"),
    sourceFormationSupplied: Boolean(
      String(nounstem?.sourceFormation ?? "").trim(),
    ),
    sourceVoice: normalizeToken(nounstem?.sourceVoice || "active"),
    sourceVoiceSupplied: Boolean(String(nounstem?.sourceVoice ?? "").trim()),
    state: normalizeToken(request.state || ""),
    possessorId: normalizeToken(request.possessorId || ""),
    subjectMode: normalizeToken(request.subjectMode || "adverbialized"),
    subjectId: normalizeToken(request.subjectId || "3common"),
    sourceStem: normalizeStemText(nounstem?.sourceStem),
    sourceStemSupplied: Boolean(String(nounstem?.sourceStem ?? "").trim()),
    upstreamResult: nounstem?.upstreamResult || null,
    sourceMode: normalizeToken(nounstem?.sourceMode),
    sourceEmbedStem: normalizeStemText(nounstem?.sourceEmbedStem),
    sourceMatrixStem: normalizeStemText(nounstem?.sourceMatrixStem),
    downstreamTargetStem: normalizeStemText(nounstem?.downstreamTargetStem),
    affective: normalizeToken(nounstem?.affective || "none"),
    sourceLexemeId: normalizeToken(nounstem?.sourceLexemeId),
    lexicalExceptionId: normalizeToken(nounstem?.lexicalExceptionId),
    relationalFunction: normalizeToken(nounstem?.relationalFunction),
    sentencePosition: normalizeToken(request.sentencePosition || "noninitial"),
    adjunctorIn: request.adjunctorIn === true,
    dependentClausePresent: request.dependentClausePresent === true,
    negative: request.negative === true,
    sourceEndsInCoOrC: nounstem?.sourceEndsInCoOrC === true,
    pertinencySourceKind: normalizeToken(nounstem?.pertinencySourceKind || "direct-relational"),
    nounConnector: normalizeStemText(nounstem?.nounConnector),
    numberConnector: normalizeStemText(request.numberConnector),
  };
}

function buildSourceFrame(targetObject, issuedUpstreamSourceCarriers, request) {
  let normalized = normalizeRequest(request);
  if (!normalized.nounstemRequestValid) {
    return { diagnostics: ["nounstem-request-required"], normalized };
  }
  const upstreamSource = resolveOwnerIssuedDerivedSourceCarrier(
    targetObject,
    normalized,
    issuedUpstreamSourceCarriers,
  );
  if (upstreamSource.diagnostics.length) {
    return { diagnostics: upstreamSource.diagnostics, normalized };
  }
  normalized = upstreamSource.normalized;
  const upstreamSourceCarrier = upstreamSource.carrier;
  const stem = findStem(normalized.stemId);
  if (!stem) {
    return { diagnostics: ["relational-stem-license-required"], normalized };
  }
  const constructionKind = normalized.constructionKind;
  const option = normalized.option;
  const allowedConstructionKinds = CLASSICAL_NAHUATL_LESSONS45_47_LCM.nounstemOperations;
  if (!allowedConstructionKinds.includes(constructionKind)) {
    return { diagnostics: ["relational-construction-kind-invalid"], normalized, stem };
  }
  if (constructionKind === "relational-nnc" || constructionKind === "compound-embed") {
    if (!getAllowedOptions(stem).includes(option)) {
      return { diagnostics: ["relational-option-not-licensed-for-stem"], normalized, stem };
    }
    if (constructionKind === "compound-embed" && option !== OPTION.FOUR) {
      return { diagnostics: ["compound-embed-requires-option-four"], normalized, stem };
    }
  }
  if (constructionKind === "associated-entity" || constructionKind === "pertinency") {
    if (!normalized.sourceStem) {
      return { diagnostics: ["typed-relational-source-required"], normalized, stem };
    }
  }
  if (constructionKind === "relational-nnc") {
    if (option === OPTION.ONE && normalized.sourceKind !== "possessor") {
      return { diagnostics: ["relational-option-one-requires-possessor-source"], normalized, stem };
    }
    if (option !== OPTION.ONE && normalized.sourceKind === "possessor") {
      return { diagnostics: ["relational-compound-option-requires-embedded-source"], normalized, stem };
    }
    if (!stem.allowedSourceKinds.includes(normalized.sourceKind)) {
      return { diagnostics: ["relational-source-kind-not-licensed"], normalized, stem };
    }
    if (stem.fixedEmbeddedStem && normalized.sourceStem && normalized.sourceStem !== normalizeStemText(stem.fixedEmbeddedStem)) {
      return { diagnostics: ["relational-fixed-embed-mismatch"], normalized, stem };
    }
    if (stem.sourceFormationIds && !stem.sourceFormationIds.includes(normalized.formationId)) {
      return { diagnostics: ["relational-source-formation-not-licensed"], normalized, stem };
    }
  }
  let state = deriveStateForSource(
    stem.stemId,
    normalized.formationId,
    normalized.sourceVoice,
    normalized.sourceKind,
    normalized.state
  );
  if (!state) {
    state = option === OPTION.ONE ? STATE.POSSESSIVE : STATE.ABSOLUTIVE;
  }
  if (constructionKind === "relational-nnc" && !getAllowedStates(option).includes(state)) {
    return { diagnostics: ["relational-state-not-licensed-for-option"], normalized, stem };
  }
  let possessorId = normalized.possessorId;
  if (state === STATE.POSSESSIVE) {
    possessorId = possessorId || stem.fixedPossessorId || "3sg";
    if (stem.fixedPossessorId && possessorId !== stem.fixedPossessorId) {
      return { diagnostics: ["relational-fixed-possessor-mismatch"], normalized, stem };
    }
    if (!Object.hasOwn(POSSESSOR_PREFIXES, possessorId)) {
      return { diagnostics: ["relational-possessor-selection-required"], normalized, stem };
    }
  }
  if (stem.stemId === "pa-frequency" && !["quantitive", "numeral"].includes(normalized.sourceKind)) {
    return { diagnostics: ["frequency-pa-requires-quantitive-or-numeral-source"], normalized, stem };
  }
  if (stem.stemId === "nal-far-bank" && normalized.sourceKind !== "water-stem") {
    return { diagnostics: ["nal-requires-water-source"], normalized, stem };
  }
  if (stem.stemId === "ic-downward-direction" && normalized.sourceKind !== "body-part-stem") {
    return { diagnostics: ["downward-ic-requires-body-part-source"], normalized, stem };
  }
  if (stem.stemId === "n-locative" && normalized.formationId === "imperfect-impersonal" && state !== STATE.ABSOLUTIVE) {
    return { diagnostics: ["impersonal-imperfect-locative-requires-absolutive-state"], normalized, stem };
  }
  if (stem.stemId === "n-locative" && ["active-action", "imperfect-passive"].includes(normalized.formationId) && state !== STATE.POSSESSIVE) {
    return { diagnostics: ["selected-locative-source-requires-possessive-state"], normalized, stem };
  }
  if (stem.functions && normalized.relationalFunction && !stem.functions.includes(normalized.relationalFunction)) {
    return { diagnostics: ["relational-function-not-licensed-for-stem"], normalized, stem };
  }
  const predicateSourceStem = normalized.sourceStem || normalizeStemText(stem.fixedEmbeddedStem);
  const sourceMode = normalized.sourceMode || (option === OPTION.ONE ? "whole-stem" : "embed-matrix");
  const sourceEmbedStem = normalized.sourceEmbedStem || (option === OPTION.ONE ? "" : predicateSourceStem);
  const expectedMatrixStem = stem.stemId === "co-c-specific-location"
    ? sourceFrameMatrixForCoC(sourceEmbedStem, normalized.sourceLexemeId)
    : normalizeStemText(stem.classicalMatrix);
  const sourceMatrixStem = normalized.sourceMatrixStem || expectedMatrixStem;
  if (constructionKind === "relational-nnc") {
    if (option === OPTION.ONE && sourceMode !== "whole-stem") {
      return { diagnostics: ["relational-simple-source-requires-stem"], normalized, stem };
    }
    if (option !== OPTION.ONE && sourceMode !== "embed-matrix") {
      return { diagnostics: ["relational-compound-source-requires-embed-matrix"], normalized, stem };
    }
    if (sourceMatrixStem !== expectedMatrixStem) {
      return { diagnostics: ["relational-source-matrix-mismatch"], normalized, stem };
    }
    if (option !== OPTION.ONE && !sourceEmbedStem && normalized.sourceKind !== "interrogative-empty") {
      return { diagnostics: ["relational-source-embed-required"], normalized, stem };
    }
  }
  const internalAnalysis = constructionKind === "compound-embed"
    ? {
      embed: stem.classicalMatrix.replace("/", "").replace(/-$/u, ""),
      matrix: normalized.downstreamTargetStem,
      connective: "",
    }
    : constructionKind === "relational-nnc"
      ? {
        embed: option === OPTION.ONE ? "" : sourceEmbedStem,
        matrix: sourceMatrixStem,
        connective: option === OPTION.THREE ? "connective-t" : "",
      }
      : {
        sourcePredicate: predicateSourceStem,
        derivation: constructionKind,
      };
  const predicateStemFrame = freeze({
    kind: "classical-nahuatl-relational-nnc-predicate-source-frame",
    contractKind: "classical-nahuatl-relational-nnc-predicate-source-frame",
    version: 1,
    oneNncPredicate: true,
    sourceCategory: "nounstem",
    lexicalClass: "relational",
    relationalKind: stem.relationalKind,
    stemId: stem.stemId,
    formation: option,
    operation: constructionKind,
    sourceKind: normalized.sourceKind,
    sourceFormation: normalized.formationId,
    sourceVoice: normalized.sourceVoice,
    sourceMode,
    sourceStem: constructionKind === "relational-nnc"
      ? option === OPTION.ONE
        ? sourceMatrixStem
        : [sourceEmbedStem, sourceMatrixStem].filter(Boolean).join("-")
      : predicateSourceStem,
    sourceEmbedStem: constructionKind === "relational-nnc" ? sourceEmbedStem : "",
    sourceMatrixStem: constructionKind === "relational-nnc" ? sourceMatrixStem : "",
    downstreamTargetStem: normalized.downstreamTargetStem,
    affective: normalized.affective,
    internalAnalysis: freeze(internalAnalysis),
    callerSuppliedAuthority: false,
  });
  return {
    diagnostics: [],
    normalized,
    stem,
    sourceFrame: freeze({
      kind: "classical-nahuatl-relational-nnc-relational-source-frame",
      contractKind: "classical-nahuatl-relational-nnc-relational-source-frame",
      version: 1,
      stem,
      stemId: stem.stemId,
      option,
      optionGroup: stem.optionGroup,
      constructionKind,
      sourceKind: normalized.sourceKind,
      formationId: normalized.formationId,
      sourceVoice: normalized.sourceVoice,
      state,
      possessorId,
      subjectMode: normalized.subjectMode,
      subjectId: normalized.subjectId,
      predicateStemFrame,
      affective: normalized.affective,
      sourceLexemeId: normalized.sourceLexemeId,
      lexicalExceptionId: normalized.lexicalExceptionId,
      relationalFunction: normalized.relationalFunction,
      sentencePosition: normalized.sentencePosition,
      adjunctorIn: normalized.adjunctorIn,
      dependentClausePresent: normalized.dependentClausePresent,
      negative: normalized.negative,
      sourceEndsInCoOrC: normalized.sourceEndsInCoOrC,
      pertinencySourceKind: normalized.pertinencySourceKind,
      nounConnector: normalized.nounConnector,
      numberConnector: normalized.numberConnector,
      upstreamSourceCarrier,
      typedSourceAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      lessonMetadataAuthority: false,
    }),
  };
}

function buildOperationFrame(targetObject, sourceFrame) {
  const predicateRecord = ["associated-entity", "pertinency"].includes(sourceFrame.constructionKind)
    ? buildDerivedPredicate(sourceFrame)
    : buildRelationalPredicate(targetObject, sourceFrame);
  if (predicateRecord.error) {
    return { diagnostics: [predicateRecord.error] };
  }
  const formulaAndSurface = buildFormulaAndSurface(targetObject, sourceFrame, predicateRecord);
  const predicateStemFrame = freeze({
    kind: "classical-nahuatl-relational-nnc-predicate-stem-frame",
    contractKind: "classical-nahuatl-relational-nnc-predicate-stem-frame",
    version: 1,
    oneNncPredicate: true,
    sourceCategory: "nounstem",
    lexicalClass: "relational",
    relationalKind: sourceFrame.stem.relationalKind,
    predicateStem: formulaAndSurface.predicate,
    formulaPredicateStem: formulaAndSurface.formulaPredicate,
    writtenPredicateStem: formulaAndSurface.writtenPredicate,
    predicateSegments: formulaAndSurface.predicateSegments,
    formulaProjection: formulaAndSurface.formulaProjection,
    writtenProjection: formulaAndSurface.writtenProjection,
    formulaDerivedFromWritten: false,
    writtenDerivedFromFormula: false,
    formation: sourceFrame.option,
    operation: sourceFrame.constructionKind,
    internalAnalysis: sourceFrame.predicateStemFrame.internalAnalysis,
    boundaryOperations: freeze([...predicateRecord.operationTrace]),
    typedPredicateAuthority: true,
    callerSuppliedAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
  const contextualFacts = {
    translationPrepositionIsMorphology: false,
    locativeContextRole: null,
    interrogativeForce: sourceFrame.sentencePosition === "initial" && !sourceFrame.negative,
    fusedAdjunctorSurfaceAllowed: sourceFrame.adjunctorIn === true && sourceFrame.dependentClausePresent === false,
    supplementaryPossessorRequired: sourceFrame.option === OPTION.ONE,
    associatedEntityIsGentilic: false,
    embeddedPossessorControlsOuterState: false,
  };
  return {
    diagnostics: [],
    operationFrame: freeze({
      kind: "classical-nahuatl-relational-nnc-relational-operation-frame",
      contractKind: "classical-nahuatl-relational-nnc-relational-operation-frame",
      version: 1,
      operationId: predicateRecord.operationId,
      operationTrace: predicateRecord.operationTrace,
      sourceFrame,
      predicateStemFrame,
      predicateRecord: freeze(predicateRecord),
      formulaAndSurface: freeze(formulaAndSurface),
      contextualFacts: freeze(contextualFacts),
      typedOperationAuthority: true,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      lessonMetadataAuthority: false,
    }),
  };
}

function buildGrammarFrame(sourceFrame, operationFrame) {
  const selectedAxisIds = new Set([
    "relational-nounstem-not-preposition",
    "translation-preposition-has-no-source-slot",
    "contextual-translation-does-not-authorize-morphology",
    sourceFrame.option === OPTION.ONE ? "usage-option-one-simple-possessive" : "",
    sourceFrame.option === OPTION.TWO ? "usage-option-two-integrated-matrix" : "",
    sourceFrame.option === OPTION.THREE ? "usage-option-three-linked-connective-t" : "",
    sourceFrame.option === OPTION.FOUR ? "usage-option-four-compound-embed" : "",
    sourceFrame.affective !== "none" ? "affective-relational-tzin-or-ton-then-co" : "",
    sourceFrame.constructionKind === "associated-entity" ? "associated-entity-ca-matrix" : "",
    sourceFrame.constructionKind === "pertinency" && sourceFrame.pertinencySourceKind === "associated-entity"
      ? "pertinency-associated-entity-source"
      : "",
    sourceFrame.constructionKind === "pertinency" && sourceFrame.pertinencySourceKind !== "associated-entity"
      ? "pertinency-direct-relational-source"
      : "",
  ].filter(Boolean));
  const stemAxes = {
    "n-locative": "locative-n-ca-two-source-attachments",
    "yan-locative": "yan-perfective-source-subject-to-possessor",
    "tlah-abundance-place": "tlah-abundance-absolutive-or-possessive",
    "co-c-specific-location": "co-c-conditioned-by-preceding-segment",
    "ca-interval-distance": "ca-interval-vs-locative-c-homonym",
    "pa-direction": "pa-direction-can-embed-relational-compounds",
    "pa-frequency": "pa-direction-vs-pa-frequency-source-gate",
    "nal-far-bank": "nal-fixed-water-embed",
    "chi-direction-toward": "chi-favorite-ground-vs-rare-other-embed",
    "ic-downward-direction": "ic-downward-body-part-source",
    "teuh-similarity": "teuh-similarity-manner",
    "tzalan-between": "options-one-two-tzalan-and-huic",
    "huic-direction": "options-one-two-tzalan-and-huic",
    "ca-means": "options-one-three-ca-and-icpac",
    "icpac-top": "options-one-three-ca-and-icpac",
    "tech-contact": "options-one-two-three-tech-tlan-pan",
    "tlan-bottom": "options-one-two-three-tech-tlan-pan",
    "pan-surface-time": "options-one-two-three-tech-tlan-pan",
  };
  if (stemAxes[sourceFrame.stemId]) {
    selectedAxisIds.add(stemAxes[sourceFrame.stemId]);
  }
  return freeze({
    kind: "classical-nahuatl-relational-nnc-grammar-frame",
    contractKind: "classical-nahuatl-relational-nnc-grammar-frame",
    version: 1,
    authorizationStatus: "authorized",
    greatestCommonDivisor: {
      identityId: CLASSICAL_NAHUATL_LESSONS45_47_GCD.identityId,
      stageOrder: CLASSICAL_NAHUATL_LESSONS45_47_GCD.stageOrder,
      satisfied: true,
    },
    leastCommonMultiple: {
      identityId: CLASSICAL_NAHUATL_LESSONS45_47_LCM.identityId,
      sourceCategory: CLASSICAL_NAHUATL_LESSONS45_47_LCM.sourceCategory,
      derivedLexicalClass: "relational",
      axisCount: CLASSICAL_NAHUATL_LESSONS45_47_LCM.axes.length,
      licensedAxisSetComplete: true,
      selectedAxisIds: [...selectedAxisIds],
    },
    sourceFrame,
    operationFrame,
    typedGrammarAuthority: true,
    callerSuppliedCoordinateAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
    lessonMetadataAuthority: false,
  });
}

export function createClassicalNahuatlNncClosureApi(targetObject = globalThis) {
  const issuedGrammarFrames = new WeakSet();
  const issuedRelationalResults = new WeakSet();
  const issuedUpstreamSourceCarriers = new WeakSet();
  const issuedPreparedPlans = new WeakSet();

  function evaluateClassicalNahuatlRelationalNnc(request = {}) {
    const source = buildSourceFrame(
      targetObject,
      issuedUpstreamSourceCarriers,
      request,
    );
    if (source.diagnostics.length) {
      return makeBlocked(request, source.diagnostics);
    }
    const operation = buildOperationFrame(targetObject, source.sourceFrame);
    if (operation.diagnostics.length) {
      return makeBlocked(request, operation.diagnostics, { sourceFrame: source.sourceFrame });
    }
    const { sourceFrame } = source;
    const { operationFrame } = operation;
    const { formulaAndSurface } = operationFrame;
    const grammarFrame = buildGrammarFrame(sourceFrame, operationFrame);
    issuedGrammarFrames.add(grammarFrame);
    const result = freeze({
      kind: "classical-nahuatl-relational-nnc-relational-result",
      contractKind: "classical-nahuatl-relational-nnc-relational-result",
      version: 1,
      authorizationStatus: "authorized",
      generationAllowed: true,
      supported: true,
      outputKind: "relational-nnc",
      clauseKind: "nominal-nuclear-clause",
      routeStage: "generate-lessons45-47-relational-nnc",
      constructionKind: sourceFrame.constructionKind,
      stemId: sourceFrame.stemId,
      option: sourceFrame.option,
      optionGroup: sourceFrame.optionGroup,
      sourceCategory: "nounstem",
      lexicalClass: "relational",
      relationalKind: sourceFrame.stem.relationalKind,
      sourceState: sourceFrame.state,
      predicateState: sourceFrame.state,
      predicateStem: formulaAndSurface.predicate,
      predicateStemFrame: operationFrame.predicateStemFrame,
      formulaPredicateStem: formulaAndSurface.formulaPredicate,
      writtenPredicateStem: formulaAndSurface.writtenPredicate,
      formulaStem: `(${formulaAndSurface.formulaPredicate})`,
      formula: formulaAndSurface.formula,
      formulaEcho: formulaAndSurface.formula,
      formulaSlots: formulaAndSurface.formulaSlots,
      writtenSlots: formulaAndSurface.writtenSlots,
      surface: formulaAndSurface.surface,
      result: formulaAndSurface.surface,
      surfaceForms: [formulaAndSurface.surface],
      predicateSegments: formulaAndSurface.predicateSegments,
      formulaProjection: formulaAndSurface.formulaProjection,
      writtenProjection: formulaAndSurface.writtenProjection,
      formulaDerivedFromWritten: false,
      writtenDerivedFromFormula: false,
      sourceFrame,
      operationFrame,
      grammarFrame,
      greatestCommonDivisor: freeze({
        ...grammarFrame.greatestCommonDivisor,
        writtenForm: formulaAndSurface.surface,
      }),
      leastCommonMultiple: freeze({
        ...grammarFrame.leastCommonMultiple,
        formulaForm: formulaAndSurface.formula,
      }),
      contextualFacts: operationFrame.contextualFacts,
      typedGrammarAuthority: true,
      callerSuppliedAuthorityAccepted: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      lessonMetadataAuthority: false,
      diagnostics: ["lessons45-47-relational-source-authorized", "lessons45-47-relational-operation-applied"],
    });
    issuedRelationalResults.add(result);
    return result;
  }

  function isClassicalNahuatlRelationalNncGrammarFrame(frame) {
    if (
      !issuedGrammarFrames.has(frame)
      || !frame
      || frame.kind !== "classical-nahuatl-relational-nnc-grammar-frame"
    ) {
      return false;
    }
    if (frame.greatestCommonDivisor?.identityId !== CLASSICAL_NAHUATL_LESSONS45_47_GCD.identityId
      || frame.greatestCommonDivisor?.satisfied !== true) {
      return false;
    }
    if (frame.leastCommonMultiple?.identityId !== CLASSICAL_NAHUATL_LESSONS45_47_LCM.identityId
      || frame.leastCommonMultiple?.licensedAxisSetComplete !== true
      || frame.leastCommonMultiple?.axisCount !== CLASSICAL_NAHUATL_LESSONS45_47_LCM.axes.length) {
      return false;
    }
    return frame.typedGrammarAuthority === true
      && frame.callerSuppliedCoordinateAuthority === false
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
      && frame.lessonMetadataAuthority === false;
  }

  function isClassicalNahuatlRelationalResult(frame = null) {
    return Boolean(
      issuedRelationalResults.has(frame)
      && frame?.kind
        === "classical-nahuatl-relational-nnc-relational-result"
      && frame.version === 1
      && frame.authorizationStatus === "authorized"
      && frame.generationAllowed === true
      && frame.supported === true
      && isClassicalNahuatlRelationalNncGrammarFrame(frame.grammarFrame)
      && frame.sourceFrame === frame.grammarFrame.sourceFrame
      && frame.operationFrame === frame.grammarFrame.operationFrame
      && (
        frame.sourceFrame.upstreamSourceCarrier == null
        || issuedUpstreamSourceCarriers.has(
          frame.sourceFrame.upstreamSourceCarrier,
        )
      )
      && frame.greatestCommonDivisor?.satisfied === true
      && frame.leastCommonMultiple?.licensedAxisSetComplete === true
      && String(frame.formula || "").trim()
      && String(frame.surface || "").trim()
      && frame.callerSuppliedAuthorityAccepted === false
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
      && frame.lessonMetadataAuthority === false
      && Object.isFrozen(frame)
    );
  }

  function buildClassicalNahuatlPreparedPlan(baseRequest = {}, coordinates = []) {
    const normalizedCoordinates = Array.isArray(coordinates) ? coordinates.map((coordinate, index) => freeze({
      coordinateId: String(coordinate?.coordinateId || `coordinate-${index + 1}`),
      request: freeze({ ...coordinate }),
    })) : [];
    if (!normalizedCoordinates.length) {
      return makeBlocked(baseRequest, ["relational-paradigm-coordinates-required"]);
    }
    const mergeCoordinateRequest = request => ({
      ...baseRequest,
      ...request,
      nounstem: request?.nounstem
        ? {
          ...(baseRequest?.nounstem || {}),
          ...request.nounstem,
        }
        : baseRequest?.nounstem,
    });
    const projected = normalizedCoordinates.map(({ request }) =>
      evaluateClassicalNahuatlRelationalNnc(mergeCoordinateRequest(request)));
    if (projected.some((result) => result.authorizationStatus !== "authorized")) {
      return makeBlocked(baseRequest, ["relational-paradigm-coordinate-blocked"], {
        coordinateResults: freeze(projected),
      });
    }
    const plan = freeze({
      kind: "classical-nahuatl-relational-nnc-prepared-plan",
      contractKind: "classical-nahuatl-relational-nnc-prepared-plan",
      version: 1,
      authorizationStatus: "authorized",
      coordinateCount: normalizedCoordinates.length,
      coordinates: normalizedCoordinates,
      coordinateResults: projected,
      baseRequest: freeze({ ...baseRequest }),
      scalarEvaluatorIdentity: "evaluateClassicalNahuatlRelationalNnc",
      callerSuppliedCoordinateAuthorityAccepted: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      lessonMetadataAuthority: false,
    });
    issuedPreparedPlans.add(plan);
    return plan;
  }

  function isClassicalNahuatlPreparedPlan(plan = null) {
    return Boolean(
      issuedPreparedPlans.has(plan)
      && plan?.kind === "classical-nahuatl-relational-nnc-prepared-plan"
      && plan.contractKind
        === "classical-nahuatl-relational-nnc-prepared-plan"
      && plan.version === 1
      && plan.authorizationStatus === "authorized"
      && plan.coordinateCount === plan.coordinates?.length
      && plan.coordinateCount === plan.coordinateResults?.length
      && plan.scalarEvaluatorIdentity
        === "evaluateClassicalNahuatlRelationalNnc"
      && plan.callerSuppliedCoordinateAuthorityAccepted === false
      && plan.formulaStringAuthority === false
      && plan.surfaceStringAuthority === false
      && plan.lessonMetadataAuthority === false
      && Object.isFrozen(plan)
    );
  }

  function projectClassicalNahuatlPreparedCoordinate(plan, coordinateId) {
    if (!isClassicalNahuatlPreparedPlan(plan)) {
      return makeBlocked({}, ["authorized-relational-prepared-plan-required"]);
    }
    const index = plan.coordinates.findIndex((coordinate) => coordinate.coordinateId === String(coordinateId || ""));
    if (index < 0) {
      return makeBlocked({}, ["relational-prepared-coordinate-not-found"]);
    }
    return evaluateClassicalNahuatlRelationalNnc({
      ...plan.baseRequest,
      ...plan.coordinates[index].request,
      nounstem: plan.coordinates[index].request?.nounstem
        ? {
          ...(plan.baseRequest?.nounstem || {}),
          ...plan.coordinates[index].request.nounstem,
        }
        : plan.baseRequest?.nounstem,
    });
  }

  function projectClassicalNahuatlPreparedCoordinates(
    plan,
    coordinateIds = null,
  ) {
    if (!isClassicalNahuatlPreparedPlan(plan)) {
      return freeze([]);
    }
    const selectedIds =
      Array.isArray(coordinateIds) && coordinateIds.length
        ? coordinateIds.map(value => String(value || ""))
        : plan.coordinates.map(coordinate => coordinate.coordinateId);
    return freeze(selectedIds.map(coordinateId => (
      projectClassicalNahuatlPreparedCoordinate(
        plan,
        coordinateId,
      )
    )));
  }

  function getClassicalNahuatlRelationalStemInventory() {
    return CLASSICAL_NAHUATL_LESSONS45_47_RELATIONAL_STEMS.map((stem) => ({
      stemId: stem.stemId,
      classicalMatrix: stem.classicalMatrix,
      optionGroup: stem.optionGroup,
      relationalKind: stem.relationalKind,
      allowedOptions: getAllowedOptions(stem),
      allowedSourceKinds: [...stem.allowedSourceKinds],
      fixedEmbeddedStem: stem.fixedEmbeddedStem || "",
      defaultEmbeddedStem: stem.defaultEmbeddedStem || "",
      affective: stem.affective === true,
    }));
  }

  return {
    CLASSICAL_NAHUATL_LESSONS45_47_GCD,
    CLASSICAL_NAHUATL_LESSONS45_47_LCM,
    CLASSICAL_NAHUATL_LESSONS45_47_RELATIONAL_STEMS,
    CLASSICAL_NAHUATL_NNC_NOUNSTEM_REQUEST_KIND,
    evaluateClassicalNahuatlRelationalNnc,
    isClassicalNahuatlRelationalNncGrammarFrame,
    isClassicalNahuatlRelationalResult,
    buildClassicalNahuatlPreparedPlan,
    isClassicalNahuatlPreparedPlan,
    projectClassicalNahuatlPreparedCoordinate,
    projectClassicalNahuatlPreparedCoordinates,
    getClassicalNahuatlRelationalStemInventory,
  };
}

export function installClassicalNahuatlRelationalNncGlobals(targetObject = globalThis) {
  const api = createClassicalNahuatlNncClosureApi(targetObject);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
