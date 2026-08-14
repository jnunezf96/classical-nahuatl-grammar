// Canonical ordinary-NNC application service.
//
// This service owns the typed Source -> Grammar operation -> canonical Result
// boundary for ordinary nominal nuclear clauses.  Curriculum labels, formulas,
// surfaces, examples, and UI/restored state are never accepted as authority.

const ORDINARY_NNC_SOURCE_KIND =
  "classical-nahuatl-ordinary-nnc-source-frame";
const ORDINARY_NNC_OPERATION_KIND =
  "classical-nahuatl-ordinary-nnc-operation-frame";
const ORDINARY_NNC_RESULT_KIND =
  "classical-nahuatl-ordinary-nnc-result-frame";
const ORDINARY_NNC_PARADIGM_PLAN_KIND =
  "classical-nahuatl-ordinary-nnc-paradigm-plan";
const ORDINARY_NNC_PARADIGM_COORDINATE_KIND =
  "classical-nahuatl-ordinary-nnc-paradigm-coordinate-frame";
const PRONOMINAL_NNC_SOURCE_KIND =
  "classical-nahuatl-pronominal-nnc-source-frame";
const PRONOMINAL_NNC_OPERATION_KIND =
  "classical-nahuatl-pronominal-nnc-operation-frame";
const PRONOMINAL_NNC_RESULT_KIND =
  "classical-nahuatl-pronominal-nnc-result-frame";
const PRONOMINAL_NNC_PARADIGM_PLAN_KIND =
  "classical-nahuatl-pronominal-nnc-paradigm-plan";
const PRONOMINAL_NNC_PARADIGM_COORDINATE_KIND =
  "classical-nahuatl-pronominal-nnc-paradigm-coordinate-frame";
const NNC_OPERATION_SELECTION_FRAME_KIND =
  "classical-nahuatl-nnc-operation-selection-frame";

const ORDINARY_NNC_STATES = Object.freeze(["absolutive", "possessive"]);
const ORDINARY_NNC_SUBJECTS = Object.freeze([
  "1sg",
  "2sg",
  "3sg",
  "3common",
  "1pl",
  "2pl",
  "3pl",
]);
const ORDINARY_NNC_POSSESSORS = Object.freeze([
  "1sg",
  "2sg",
  "3sg",
  "1pl",
  "2pl",
  "3pl",
  "reciprocal",
  "nonspecific-human",
  "nonspecific-nonhuman",
]);
const ORDINARY_NNC_SENTENCE_TYPES = Object.freeze([
  "statement",
  "yes-no-intonation",
  "yes-no-cuix",
  "emphatic",
  "wish",
]);
const ORDINARY_NNC_POLARITIES = Object.freeze(["positive", "negative"]);
const ORDINARY_NNC_STEM_FORMATIONS = Object.freeze([
  "plain",
  "affinity",
  "distributive-varietal",
]);
const ORDINARY_NNC_USE_SHAPES = Object.freeze(["base", "truncated"]);
const ORDINARY_NNC_SUBCLASSES_BY_CLASS = Object.freeze({
  tl: Object.freeze([
    "tl-1-a",
    "tl-1-b",
    "tl-2-a",
    "tl-2-b",
    "tl-2-c",
  ]),
  tli: Object.freeze(["tli-1", "tli-2"]),
  in: Object.freeze([""]),
  zero: Object.freeze([""]),
});
function defineOpenNncSourceClassPattern({
  absolutiveSingularCommon,
  absolutivePlural,
  possessiveSingularCommon,
  possessivePlural = "general-use stem + hu-ān",
}) {
  return Object.freeze({
    absolutiveSingularCommon: Object.freeze({
      realization: absolutiveSingularCommon,
      canvasSection: "§14.4",
    }),
    absolutivePlural: Object.freeze({
      realization: absolutivePlural,
      canvasSection: "§14.5",
    }),
    possessiveSingularCommon: Object.freeze({
      realization: possessiveSingularCommon,
      canvasSection: "§14.7",
    }),
    possessivePlural: Object.freeze({
      realization: possessivePlural,
      canvasSection: "§14.6",
    }),
  });
}
const TL_ABSOLUTIVE_PLURAL_PATTERN =
  "restricted-use stem + lexical m-eh or 0-h";
const OTHER_ABSOLUTIVE_PLURAL_PATTERN =
  "restricted-use stem + lexical t-in or m-eh";
const ORDINARY_NNC_OPEN_SOURCE_CLASS_ANALYSES = Object.freeze({
  "tl-1-a": Object.freeze({
    nounClass: "tl", useShape: "base", subclass: "tl-1-a",
    ephemeralFinalVowel: "", truncationRepair: "none",
    classPattern: defineOpenNncSourceClassPattern({
      absolutiveSingularCommon: "restricted-use stem + tl",
      absolutivePlural: TL_ABSOLUTIVE_PLURAL_PATTERN,
      possessiveSingularCommon: "general-use stem + uh",
    }),
  }),
  "tl-1-b": Object.freeze({
    nounClass: "tl", useShape: "base", subclass: "tl-1-b",
    ephemeralFinalVowel: "", truncationRepair: "none",
    classPattern: defineOpenNncSourceClassPattern({
      absolutiveSingularCommon: "restricted-use stem + tl",
      absolutivePlural: TL_ABSOLUTIVE_PLURAL_PATTERN,
      possessiveSingularCommon: "general-use stem + 0",
    }),
  }),
  "tl-2-a": Object.freeze({
    nounClass: "tl", useShape: "truncated", subclass: "tl-2-a",
    ephemeralFinalVowel: "i", truncationRepair: "none",
    classPattern: defineOpenNncSourceClassPattern({
      absolutiveSingularCommon: "restricted-use stem + tl",
      absolutivePlural: TL_ABSOLUTIVE_PLURAL_PATTERN,
      possessiveSingularCommon: "truncated general-use stem + 0",
    }),
  }),
  "tl-2-b-a": Object.freeze({
    nounClass: "tl", useShape: "truncated", subclass: "tl-2-b",
    ephemeralFinalVowel: "a", truncationRepair: "none",
    classPattern: defineOpenNncSourceClassPattern({
      absolutiveSingularCommon: "restricted-use stem + tl",
      absolutivePlural: TL_ABSOLUTIVE_PLURAL_PATTERN,
      possessiveSingularCommon: "truncated general-use stem + 0",
    }),
  }),
  "tl-2-b-i": Object.freeze({
    nounClass: "tl", useShape: "truncated", subclass: "tl-2-b",
    ephemeralFinalVowel: "i", truncationRepair: "none",
    classPattern: defineOpenNncSourceClassPattern({
      absolutiveSingularCommon: "restricted-use stem + tl",
      absolutivePlural: TL_ABSOLUTIVE_PLURAL_PATTERN,
      possessiveSingularCommon: "truncated general-use stem + 0",
    }),
  }),
  "tl-2-c": Object.freeze({
    nounClass: "tl", useShape: "truncated", subclass: "tl-2-c",
    ephemeralFinalVowel: "a", truncationRepair: "supportive-i",
    classPattern: defineOpenNncSourceClassPattern({
      absolutiveSingularCommon: "restricted-use stem + tl",
      absolutivePlural: TL_ABSOLUTIVE_PLURAL_PATTERN,
      possessiveSingularCommon:
        "truncated general-use stem + supportive i + 0",
    }),
  }),
  "tli-1": Object.freeze({
    nounClass: "tli", useShape: "base", subclass: "tli-1",
    ephemeralFinalVowel: "", truncationRepair: "none",
    classPattern: defineOpenNncSourceClassPattern({
      absolutiveSingularCommon: "restricted-use stem + tli or li",
      absolutivePlural: OTHER_ABSOLUTIVE_PLURAL_PATTERN,
      possessiveSingularCommon: "general-use stem + 0",
    }),
  }),
  "tli-2": Object.freeze({
    nounClass: "tli", useShape: "base", subclass: "tli-2",
    ephemeralFinalVowel: "", truncationRepair: "none",
    classPattern: defineOpenNncSourceClassPattern({
      absolutiveSingularCommon: "restricted-use stem + tli or li",
      absolutivePlural: OTHER_ABSOLUTIVE_PLURAL_PATTERN,
      possessiveSingularCommon:
        "general-use stem + hui or a licensed silent alternative",
    }),
  }),
  in: Object.freeze({
    nounClass: "in", useShape: "base", subclass: "",
    ephemeralFinalVowel: "", truncationRepair: "none",
    classPattern: defineOpenNncSourceClassPattern({
      absolutiveSingularCommon: "restricted-use stem + in",
      absolutivePlural: OTHER_ABSOLUTIVE_PLURAL_PATTERN,
      possessiveSingularCommon: "general-use stem + 0",
    }),
  }),
  zero: Object.freeze({
    nounClass: "zero", useShape: "base", subclass: "",
    ephemeralFinalVowel: "", truncationRepair: "none",
    classPattern: defineOpenNncSourceClassPattern({
      absolutiveSingularCommon: "restricted-use stem + 0",
      absolutivePlural: OTHER_ABSOLUTIVE_PLURAL_PATTERN,
      possessiveSingularCommon: "general-use stem + 0",
    }),
  }),
});
function getOpenNncSourceClassAnalysis(sourceClass = "") {
  const normalized = normalizeChoice(sourceClass).toLowerCase();
  return ORDINARY_NNC_OPEN_SOURCE_CLASS_ANALYSES[normalized] || null;
}
function getCanonicalNncSourceClass(lexicalEntry = null) {
  if (!lexicalEntry) return "";
  if (lexicalEntry.nounClass === "tl" && lexicalEntry.subclass === "tl-2-b") {
    return `tl-2-b-${lexicalEntry.ephemeralFinalVowel || "a"}`;
  }
  return lexicalEntry.subclass || lexicalEntry.nounClass || "";
}
function getClassicalNahuatlOpenNncSourceClassInventory() {
  return Object.freeze(Object.entries(
    ORDINARY_NNC_OPEN_SOURCE_CLASS_ANALYSES,
  ).map(([sourceClass, analysis]) => Object.freeze({
    sourceClass,
    ...analysis,
  })));
}
const ORDINARY_NNC_PLURAL_CONNECTORS = Object.freeze([
  "t-in",
  "m-eh",
  "0-h",
]);
function getClassGuidedAbsolutivePluralConnectors(sourceClass = "") {
  return Object.freeze(
    String(sourceClass || "").startsWith("tl-")
      ? ["m-eh", "0-h"]
      : ["t-in", "m-eh"],
  );
}
function getPluralConnectorsForStemRelation(
  sourceFrame = null,
  stemRelation = "plain",
) {
  const values = sourceFrame?.pluralConnectorOptions || [];
  if (stemRelation !== "affinity") {
    return Object.freeze([...values]);
  }
  if (sourceFrame?.nounClass === "tl") {
    return Object.freeze(values.filter((value) =>
      ["m-eh", "0-h"].includes(value)));
  }
  if (["tli", "in"].includes(sourceFrame?.nounClass)) {
    return Object.freeze(values.filter((value) => value === "t-in"));
  }
  return Object.freeze([]);
}
function defineOrdinaryNncLexeme({
  nounClass,
  referentialAnimacy = "any",
  naturalPossessionPolicy = "ordinary",
  naturalPossessionSemantics = "ordinary",
  possessorCompatibility = "ordinary",
  stemFormationOptions = ["plain"],
  pluralConnectorOptions = [],
  useShape = "base",
  subclass = "",
  ephemeralFinalVowel = "",
  truncationRepair = "none",
  compoundSource = false,
  lexicalFormation = "ordinary-nounstem",
  sourceConstituents = [],
  boundaryFacts = {},
} = {}) {
  return Object.freeze({
    nounClass,
    referentialAnimacy,
    naturalPossessionPolicy,
    naturalPossessionSemantics,
    possessorCompatibility,
    classMembershipOptions: Object.freeze([nounClass]),
    stemFormationOptions: Object.freeze([...stemFormationOptions]),
    pluralConnectorOptions: Object.freeze([...pluralConnectorOptions]),
    useShape,
    subclass,
    ephemeralFinalVowel,
    truncationRepair,
    compoundSource,
    lexicalFormation,
    sourceConstituents: Object.freeze([...sourceConstituents]),
    boundaryFacts: Object.freeze({ ...boundaryFacts }),
  });
}

const LESSON57_NOUNSTEM_L_SOURCES = Object.freeze({
  "te-l": "te",
  "ca-l": "ca",
  "tle-l": "tle",
  "cē-l": "cē",
  "icpa-l": "icpa",
  "cā-cā-l": "cā-cā",
  "ah-co-l": "ah-co",
  "xā-l": "xā",
  "xi-l": "xi",
});
const LESSON58_INSTRUMENTAL_AZ_STEMS = Object.freeze([
  "te-nām-āz", "tepon-āz", "tzō-tzop-āz", "ma-tzō-tzop-āz",
  "tzi-tzic-āz", "tle-hcu-āz", "pi-āz", "ā-pi-āz", "te-ā-pi-āz",
  "mamal-hu-āz", "māma-l-hu-āz", "tla-pi-pi-l-hu-āz",
  "cuauh-tla-pi-pī-l-hu-āz", "ā-pi-pi-l-hu-āz",
  "te-ā-pi-l-hu-āz", "ā-yōl-hu-āz", "ā-ol-hu-āz",
  "tla-tze-tzel-hu-āz", "tla-ht-ō-l-hu-āz", "tla-hcal-hu-āz",
  "te-hcuil-hu-āz", "neh-ne-hcuil-hu-āz", "tzon-hu-āz",
  "tla-chpān-hu-az", "ehca-hu-āz", "cuauh-ehca-hu-āz",
  "me-ca-ehca-hu-āz", "cuauh-pana-hu-āz", "cuap-pana-hu-āz",
  "tzicua-hu-āz", "tzica-hu-āz", "tla-pi-āz", "ah-āz",
]);
function getInstrumentalAzBoundaryFacts(stem = "") {
  const connectorClass = /-l-hu-āz$/u.test(stem)
    ? "hu-after-l"
    : /-n-hu-āz$/u.test(stem)
      ? "hu-after-n"
      : /-a-hu-āz$/u.test(stem)
        ? "hu-after-a"
        : "none";
  return {
    matrixNounstem: "āz",
    connectorClass,
    connectorSelectionAuthority: "lexical-and-boundary-conditioned",
    connectorIsUserChoice: false,
    productiveForUnknownSources: false,
  };
}
const LESSON57_NOUNSTEM_L_LEXICON = Object.freeze(Object.fromEntries(
  Object.entries(LESSON57_NOUNSTEM_L_SOURCES).map(([stem, sourceNounstem]) => [
    stem,
    defineOrdinaryNncLexeme({
      nounClass: "tli",
      subclass: "tli-1",
      lexicalFormation: "lexical-nounstem-l",
      sourceConstituents: [sourceNounstem, "l"],
      boundaryFacts: {
        sourceCategory: "nounstem",
        inferredNonactiveSource: false,
        locativeContinuation:
          stem === "xi-l" ? "xi-l-lan" : "",
      },
    }),
  ])
));
const LESSON58_INSTRUMENTAL_AZ_LEXICON = Object.freeze(Object.fromEntries(
  LESSON58_INSTRUMENTAL_AZ_STEMS.map(stem => [
    stem,
    defineOrdinaryNncLexeme({
      nounClass: "tli",
      subclass: "tli-1",
      pluralConnectorOptions:
        stem === "te-nām-āz" ? ["t-in"] : [],
      lexicalFormation: "restricted-instrumental-az-nounstem",
      sourceConstituents: stem.split("-"),
      boundaryFacts: getInstrumentalAzBoundaryFacts(stem),
    }),
  ])
));
const LESSON58_ASSOCIATED_AZ_LEXICON = Object.freeze({
  "āz-ca": defineOrdinaryNncLexeme({
    nounClass: "tl",
    subclass: "tl-1-a",
    lexicalFormation: "associated-entity-from-restricted-az-nounstem",
    sourceConstituents: ["āz", "ca"],
    boundaryFacts: {
      matrixNounstem: "ca",
      sourceInstrumentalNounstem: "āz",
      productiveForUnknownSources: false,
    },
  }),
});

// These are lexical records, not UI defaults.  The Canvas explicitly warns
// that noun class, use shape, and plural connectors must be learned with the
// nounstem.  Canonical records therefore keep all of those facts engine-owned.
// An unlisted direct entry may still carry one explicit noun-class analysis;
// the application issues that analysis as a typed open-stem Source and keeps
// use shape, subclass, plural behavior, and possession policy derived here.
const ORDINARY_NNC_LEXICON = Object.freeze({
  exō: defineOrdinaryNncLexeme({
    nounClass: "tl",
    referentialAnimacy: "nonanimate",
    subclass: "tl-1-a",
    lexicalFormation: "quality-entity-nounstem",
    boundaryFacts: {
      predicateReading: "green-thing-in-the-form-of-a-bean",
      fullNuclearClauseRequired: true,
      phraseOrWordGlossAuthority: false,
    },
  }),
  imax: defineOrdinaryNncLexeme({
    nounClass: "tli",
    referentialAnimacy: "nonanimate",
    subclass: "tli-1",
    lexicalFormation: "common-number-nounstem",
    boundaryFacts: {
      numberCategory: "common",
      numberReadings: Object.freeze(["one", "more-than-one"]),
      dictionaryGlossAuthority: false,
    },
  }),
  cin: defineOrdinaryNncLexeme({
    nounClass: "tli",
    referentialAnimacy: "nonanimate",
    subclass: "tli-1",
  }),
  pah: defineOrdinaryNncLexeme({
    nounClass: "tli",
    stemFormationOptions: ["plain", "affinity", "distributive-varietal"],
    subclass: "tli-1",
  }),
  cal: defineOrdinaryNncLexeme({
    nounClass: "tli",
    referentialAnimacy: "nonanimate",
    stemFormationOptions: ["plain", "affinity", "distributive-varietal"],
    pluralConnectorOptions: ["t-in"],
    subclass: "tli-1",
  }),
  mich: defineOrdinaryNncLexeme({
    nounClass: "in",
    stemFormationOptions: ["plain", "affinity", "distributive-varietal"],
  }),
  chichi: defineOrdinaryNncLexeme({
    nounClass: "zero",
    stemFormationOptions: ["plain", "affinity", "distributive-varietal"],
    pluralConnectorOptions: ["m-eh"],
  }),
  tēuc: defineOrdinaryNncLexeme({
    nounClass: "tli",
    stemFormationOptions: ["plain", "affinity", "distributive-varietal"],
    pluralConnectorOptions: ["t-in"],
    subclass: "tli-1",
  }),
  pil: defineOrdinaryNncLexeme({
    nounClass: "tli",
    stemFormationOptions: ["plain", "affinity", "distributive-varietal"],
    pluralConnectorOptions: ["t-in"],
    subclass: "tli-1",
  }),
  māi: defineOrdinaryNncLexeme({
    nounClass: "tl",
    stemFormationOptions: [
      "plain",
      "affinity",
      "distributive-varietal",
    ],
    useShape: "truncated",
    subclass: "tl-2-a",
    ephemeralFinalVowel: "i",
  }),
  "tle-māi": defineOrdinaryNncLexeme({
    nounClass: "tl",
    stemFormationOptions: [
      "plain",
      "affinity",
      "distributive-varietal",
    ],
    useShape: "truncated",
    subclass: "tl-2-a",
    ephemeralFinalVowel: "i",
    compoundSource: true,
    lexicalFormation: "compound-nounstem",
    sourceConstituents: ["tle", "māi"],
    boundaryFacts: {
      generalUseEmbedStem: "tle-mā",
      restrictedUseStem: "tle-māi",
      sourceStructureAuthority: "typed-embed-matrix",
    },
  }),
  nēnehuilia: defineOrdinaryNncLexeme({
    nounClass: "zero",
    lexicalFormation: "verbstem-resemblance-predicate-nnc",
    boundaryFacts: {
      sourceCategory: "verbstem",
      comparisonRelation: "resemblance",
    },
  }),
  yōlchicāhuacātzintli: defineOrdinaryNncLexeme({
    nounClass: "zero",
    lexicalFormation: "honorific-predicate-nnc",
    boundaryFacts: {
      honorific: true,
      comparisonInterpretation: "superlative",
    },
  }),
  ...LESSON57_NOUNSTEM_L_LEXICON,
  ...LESSON58_INSTRUMENTAL_AZ_LEXICON,
  ...LESSON58_ASSOCIATED_AZ_LEXICON,
});
const ORDINARY_NNC_SOURCE_INPUT_KEYS = Object.freeze(
  new Set(["stem", "embedStem", "matrixStem", "nounClass", "sourceClass"]),
);
const ORDINARY_NNC_OPERATION_SELECTION_KEYS = Object.freeze(new Set([
  "state",
  "subject",
  "metaphoricalUse",
  "possessor",
  "stemFormation",
  "predicateFormation",
  "possessorReduplication",
  "pluralConnector",
  "sentenceType",
  "polarity",
]));
const ORDINARY_NNC_DERIVED_OPERATION_KEYS = Object.freeze(new Set([
  "referentialAnimacy",
  "useShape",
  "subclass",
]));
const ORDINARY_NNC_PARADIGM_REQUEST_KEYS = Object.freeze(new Set([
  "states",
  "subjects",
  "possessors",
  "predicateFormation",
  "possessorReduplication",
  "sentenceType",
  "polarity",
]));
const PRONOMINAL_NNC_FAMILIES = Object.freeze([
  "personal-simple",
  "personal-compound",
  "personal-compound-derived",
  "interrogative-what",
  "interrogative-what-compound",
  "interrogative-which",
  "interrogative-which-compound",
  "interrogative-who",
  "demonstrative-this",
  "demonstrative-that",
  "indefinite-someone",
  "indefinite-something",
  "quantitive",
  "quantitive-personal-compound",
]);
const NNC_OPERATION_SELECTION_INPUT_KEYS = Object.freeze(new Set([
  "state",
  "subject",
  "animacy",
  "metaphoricalUse",
  "possessor",
  "stemFormation",
  "predicateFormation",
  "possessorReduplication",
  "pluralConnector",
  "clausePosition",
  "adjunctorInMode",
  "doubledFirstPlural",
  "specialHumanUse",
]));
function definePronominalNncLexeme(
  familyId,
  {
    embedStem = "",
    matrixStem = "",
    matrixFamily = "",
    matrixForm = "",
    sourceStructure = "whole-stem",
  } = {},
) {
  return Object.freeze({
    familyId,
    embedStem,
    matrixStem,
    matrixFamily,
    matrixForm,
    sourceStructure,
  });
}

const PRONOMINAL_NNC_LEXICON = Object.freeze({
  eh: definePronominalNncLexeme("personal-simple"),
  yeh: definePronominalNncLexeme("personal-simple"),
  "eh-huā": definePronominalNncLexeme("personal-compound", {
    embedStem: "eh",
    matrixStem: "huā",
    sourceStructure: "embed-matrix",
  }),
  "yeh-huā": definePronominalNncLexeme("personal-compound", {
    embedStem: "yeh",
    matrixStem: "huā",
    sourceStructure: "embed-matrix",
  }),
  "yeh-yeh-huā": definePronominalNncLexeme(
    "personal-compound-derived",
    {
      embedStem: "yeh-yeh",
      matrixStem: "huā",
      sourceStructure: "embed-matrix",
    },
  ),
  "eh-eh-huā": definePronominalNncLexeme(
    "personal-compound-derived",
    {
      embedStem: "eh-eh",
      matrixStem: "huā",
      sourceStructure: "embed-matrix",
    },
  ),
  "tl-eh": definePronominalNncLexeme("interrogative-what", {
    embedStem: "tl",
    matrixStem: "eh",
    sourceStructure: "embed-matrix",
  }),
  "tl-eh-huā": definePronominalNncLexeme(
    "interrogative-what-compound",
    {
      embedStem: "tl",
      matrixStem: "eh-huā",
      sourceStructure: "embed-matrix",
    },
  ),
  cā: definePronominalNncLexeme("interrogative-which"),
  "cā-tl-eh": definePronominalNncLexeme(
    "interrogative-which-compound",
    {
      embedStem: "cā",
      matrixStem: "tl-eh",
      sourceStructure: "embed-matrix",
    },
  ),
  "cā-tl-e-in": definePronominalNncLexeme(
    "interrogative-which-compound",
    {
      embedStem: "cā",
      matrixStem: "tl-e-in",
      sourceStructure: "embed-matrix",
    },
  ),
  "cā-tl-eh-huā": definePronominalNncLexeme(
    "interrogative-which-compound",
    {
      embedStem: "cā",
      matrixStem: "tl-eh-huā",
      sourceStructure: "embed-matrix",
    },
  ),
  "ā-0": definePronominalNncLexeme("interrogative-who", {
    sourceStructure: "internal-morphemes",
  }),
  īn: definePronominalNncLexeme("demonstrative-this"),
  ōn: definePronominalNncLexeme("demonstrative-that"),
  "a-c-ah": definePronominalNncLexeme("indefinite-someone", {
    embedStem: "a-c",
    matrixStem: "ah",
    sourceStructure: "embed-matrix",
  }),
  "itl-ah": definePronominalNncLexeme("indefinite-something", {
    embedStem: "itl",
    matrixStem: "ah",
    sourceStructure: "embed-matrix",
  }),
  "ix-qui-ch": definePronominalNncLexeme("quantitive", {
    embedStem: "ix",
    matrixStem: "qui-ch",
    matrixFamily: "quich",
    matrixForm: "qui-ch",
    sourceStructure: "embed-matrix",
  }),
  "cem-ix-qui-ch": definePronominalNncLexeme("quantitive", {
    embedStem: "cem-ix",
    matrixStem: "qui-ch",
    matrixFamily: "quich",
    matrixForm: "qui-ch",
    sourceStructure: "embed-matrix",
  }),
  "quē-x-qui-ch": definePronominalNncLexeme("quantitive", {
    embedStem: "quē-x",
    matrixStem: "qui-ch",
    matrixFamily: "quich",
    matrixForm: "qui-ch",
    sourceStructure: "embed-matrix",
  }),
  "quē-x-ix-qui-ch": definePronominalNncLexeme("quantitive", {
    embedStem: "quē-x-ix",
    matrixStem: "qui-ch",
    matrixFamily: "quich",
    matrixForm: "qui-ch",
    sourceStructure: "embed-matrix",
  }),
  "miya-qui": definePronominalNncLexeme("quantitive", {
    embedStem: "miya",
    matrixStem: "qui",
    matrixFamily: "qui",
    matrixForm: "qui",
    sourceStructure: "embed-matrix",
  }),
  "miya-c": definePronominalNncLexeme("quantitive", {
    embedStem: "miya",
    matrixStem: "c",
    matrixFamily: "qui",
    matrixForm: "c",
    sourceStructure: "embed-matrix",
  }),
  "miye-qui": definePronominalNncLexeme("quantitive", {
    embedStem: "miye",
    matrixStem: "qui",
    matrixFamily: "qui",
    matrixForm: "qui",
    sourceStructure: "embed-matrix",
  }),
  "miye-c": definePronominalNncLexeme("quantitive", {
    embedStem: "miye",
    matrixStem: "c",
    matrixFamily: "qui",
    matrixForm: "c",
    sourceStructure: "embed-matrix",
  }),
  "ce-qui": definePronominalNncLexeme("quantitive", {
    embedStem: "ce",
    matrixStem: "qui",
    matrixFamily: "qui",
    matrixForm: "qui",
    sourceStructure: "embed-matrix",
  }),
  "iz-qui": definePronominalNncLexeme("quantitive", {
    embedStem: "iz",
    matrixStem: "qui",
    matrixFamily: "qui",
    matrixForm: "qui",
    sourceStructure: "embed-matrix",
  }),
  "quē-z-qui": definePronominalNncLexeme("quantitive", {
    embedStem: "quē-z",
    matrixStem: "qui",
    matrixFamily: "qui",
    matrixForm: "qui",
    sourceStructure: "embed-matrix",
  }),
  "quē-c-iz-qui": definePronominalNncLexeme("quantitive", {
    embedStem: "quē-c-iz",
    matrixStem: "qui",
    matrixFamily: "qui",
    matrixForm: "qui",
    sourceStructure: "embed-matrix",
  }),
  "a-qui": definePronominalNncLexeme("quantitive", {
    embedStem: "a",
    matrixStem: "qui",
    matrixFamily: "qui",
    matrixForm: "qui",
    sourceStructure: "embed-matrix",
  }),
  "a-chi": definePronominalNncLexeme("quantitive", {
    embedStem: "a",
    matrixStem: "chi",
    matrixFamily: "chi",
    matrixForm: "chi",
    sourceStructure: "embed-matrix",
  }),
  "mo-chi": definePronominalNncLexeme("quantitive", {
    embedStem: "mo",
    matrixStem: "chi",
    matrixFamily: "chi",
    matrixForm: "chi",
    sourceStructure: "embed-matrix",
  }),
  "mo-ch": definePronominalNncLexeme("quantitive", {
    embedStem: "mo",
    matrixStem: "ch",
    matrixFamily: "chi",
    matrixForm: "ch",
    sourceStructure: "embed-matrix",
  }),
  "mo-ch-eh-huā": definePronominalNncLexeme(
    "quantitive-personal-compound",
    {
      embedStem: "mo-ch",
      matrixStem: "eh-huā",
      sourceStructure: "embed-matrix",
    },
  ),
  "ix-a-chi": definePronominalNncLexeme("quantitive", {
    embedStem: "ix-a",
    matrixStem: "chi",
    matrixFamily: "chi",
    matrixForm: "chi",
    sourceStructure: "embed-matrix",
  }),
});
const PRONOMINAL_NNC_SOURCE_INPUT_KEYS = Object.freeze(
  new Set(["stem", "embedStem", "matrixStem"]),
);
const PRONOMINAL_NNC_OPERATION_SELECTION_KEYS = Object.freeze(new Set([
  "subject",
  "clausePosition",
  "adjunctorInMode",
  "doubledFirstPlural",
  "specialHumanUse",
  "sentenceType",
  "polarity",
]));
const PRONOMINAL_NNC_DERIVED_OPERATION_KEYS = Object.freeze(new Set([
  "numberForm",
  "matrixForm",
  "predicatePluralization",
]));
const PRONOMINAL_NNC_PARADIGM_REQUEST_KEYS = Object.freeze(new Set([
  "subjects",
  "sentenceType",
  "polarity",
]));
const ORDINARY_NNC_FORBIDDEN_AUTHORITY_KEYS = Object.freeze(new Set([
  "answer",
  "canvasanswer",
  "citation",
  "curriculum",
  "display",
  "displaytext",
  "evidence",
  "example",
  "formula",
  "formulaartifact",
  "formularealization",
  "formularecord",
  "formularecords",
  "formulastring",
  "lesson",
  "lessonid",
  "lessonmetadata",
  "lessonnumber",
  "result",
  "restoredstate",
  "selectedresult",
  "sourceclaim",
  "sourceclaims",
  "sourcedocument",
  "sourcespan",
  "sourcespans",
  "sourcetext",
  "storedanswer",
  "surface",
  "surfaceform",
  "surfaceforms",
  "surfacerealization",
  "targetsurface",
  "translation",
  "uistate",
  "urlstate",
]));

function normalizeKey(value = "") {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]/gu, "");
}

function ownDataValue(record = null, key = "", fallback = undefined) {
  if (!record || typeof record !== "object") return fallback;
  try {
    const descriptor = Object.getOwnPropertyDescriptor(record, key);
    return descriptor && Object.prototype.hasOwnProperty.call(descriptor, "value")
      ? descriptor.value
      : fallback;
  } catch {
    return fallback;
  }
}

function findForbiddenAuthorityCarrier(
  value,
  path = "$",
  seen = new Set(),
) {
  if (!value || typeof value !== "object" || seen.has(value)) return "";
  seen.add(value);
  let keys = [];
  try {
    keys = Reflect.ownKeys(value);
  } catch {
    return `${path}:uninspectable`;
  }
  for (const rawKey of keys) {
    if (typeof rawKey !== "string") continue;
    const childPath = `${path}.${rawKey}`;
    if (ORDINARY_NNC_FORBIDDEN_AUTHORITY_KEYS.has(normalizeKey(rawKey))) {
      return childPath;
    }
    let descriptor = null;
    try {
      descriptor = Object.getOwnPropertyDescriptor(value, rawKey);
    } catch {
      return `${childPath}:uninspectable`;
    }
    if (!descriptor || !Object.prototype.hasOwnProperty.call(descriptor, "value")) {
      return `${childPath}:accessor`;
    }
    const nested = findForbiddenAuthorityCarrier(
      descriptor.value,
      childPath,
      seen,
    );
    if (nested) return nested;
  }
  return "";
}

function deepFreeze(value, seen = new WeakSet()) {
  if (!value || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  Object.values(value).forEach((entry) => deepFreeze(entry, seen));
  return Object.freeze(value);
}

function normalizeText(value = "") {
  return String(value == null ? "" : value).trim();
}

function normalizeStem(value = "") {
  return normalizeText(value).replace(/^\((.*)\)$/u, "$1").trim();
}

function normalizeChoice(value = "") {
  return normalizeText(value).toLowerCase().replace(/[\s_]+/gu, "-");
}

function normalizeUniqueList(value, normalize, fallback = []) {
  const values = Array.isArray(value) ? value : fallback;
  return Array.from(new Set(values.map(normalize).filter(Boolean)));
}

function normalizeNaturalPossessionPolicy(value = "") {
  return {
    "": "ordinary",
    both: "ordinary",
    ordinary: "ordinary",
    "naturally-possessed": "naturally-possessed",
    "possessive-only": "naturally-possessed",
    "never-possessive": "never-possessive",
    "absolutive-only": "never-possessive",
  }[normalizeChoice(value)] || "";
}

function getAllowedStateValues(policy = "ordinary") {
  if (policy === "naturally-possessed") return ["possessive"];
  if (policy === "never-possessive") return ["absolutive"];
  return ["absolutive", "possessive"];
}

function buildBlockedFrame(kind, blockReason, extra = {}) {
  return deepFreeze({
    kind,
    version: 1,
    authorizationStatus: "blocked",
    blockReason,
    ...extra,
    typedSourceAuthority: false,
    callerSuppliedAuthorityAccepted: false,
    lessonMetadataAuthority: false,
    formulaStringAuthority: false,
    surfaceStringAuthority: false,
  });
}

export function createClassicalNahuatlNncApplicationModule(
  targetObject = globalThis,
) {
  const issuedSourceReceipts = new WeakMap();
  const issuedOperationReceipts = new WeakMap();
  const issuedResultReceipts = new WeakMap();
  const issuedParadigmPlanReceipts = new WeakMap();
  const issuedCoordinateReceipts = new WeakMap();
  const issuedPronominalSourceReceipts = new WeakMap();
  const issuedPronominalOperationReceipts = new WeakMap();
  const ownedPronominalOperationReceipts = new WeakMap();
  const issuedPronominalResultReceipts = new WeakMap();
  const issuedPronominalParadigmPlanReceipts = new WeakMap();
  const issuedPronominalCoordinateReceipts = new WeakMap();

  function normalizeNounClass(value = "") {
    return typeof targetObject.normalizeOrdinaryNncNounClass === "function"
      ? targetObject.normalizeOrdinaryNncNounClass(value)
      : "";
  }

  function normalizeSubject(value = "") {
    return typeof targetObject.normalizeClassicalNahuatlNncSubject === "function"
      ? targetObject.normalizeClassicalNahuatlNncSubject(value)
      : "";
  }

  function normalizePossessor(value = "") {
    return typeof targetObject.normalizeClassicalNahuatlNncPossessor === "function"
      ? targetObject.normalizeClassicalNahuatlNncPossessor(value)
      : "";
  }

  function getSourceSignature(frame = null) {
    return JSON.stringify({
      stem: frame?.stem || "",
      embedStem: frame?.embedStem || "",
      matrixStem: frame?.matrixStem || "",
      lexicalEntryId: frame?.lexicalEntryId || "",
      lexicalSelectionAuthority: frame?.lexicalSelectionAuthority || "",
      openStemSource: frame?.openStemSource === true,
      sourceClass: frame?.sourceClass || "",
      nounClass: frame?.nounClass || "",
      referentialAnimacy: frame?.referentialAnimacy || "",
      naturalPossessionPolicy: frame?.naturalPossessionPolicy || "",
      naturalPossessionSemantics: frame?.naturalPossessionSemantics || "",
      stateAvailability: frame?.stateAvailability || "",
      allowedSubjects: frame?.allowedSubjects || [],
      possessorCompatibility: frame?.possessorCompatibility || "",
      classMembershipOptions: frame?.classMembershipOptions || [],
      stemFormationOptions: frame?.stemFormationOptions || [],
      pluralConnectorOptions: frame?.pluralConnectorOptions || [],
      possessorReduplicationOptions:
        frame?.possessorReduplicationOptions || [],
      useShape: frame?.useShape || "",
      subclass: frame?.subclass || "",
      ephemeralFinalVowel: frame?.ephemeralFinalVowel || "",
      truncationRepair: frame?.truncationRepair || "",
      compoundSource: frame?.compoundSource === true,
      lexicalFormation: frame?.lexicalFormation || "",
      sourceConstituents: frame?.sourceConstituents || [],
      boundaryFacts: frame?.boundaryFacts || {},
    });
  }

  function buildClassicalNahuatlOrdinaryNncSourceFrame(source = {}) {
    const forbiddenCarrier = findForbiddenAuthorityCarrier(source);
    if (forbiddenCarrier) {
      return buildBlockedFrame(
        ORDINARY_NNC_SOURCE_KIND,
        `ordinary-nnc-source-forbidden-authority:${forbiddenCarrier}`,
      );
    }
    const stem = normalizeStem(ownDataValue(source, "stem", ""));
    const embedStem = normalizeStem(ownDataValue(source, "embedStem", ""));
    const matrixStem = normalizeStem(ownDataValue(source, "matrixStem", ""));
    const sourceKeys = Reflect.ownKeys(source)
      .filter((key) => typeof key === "string");
    const forbiddenSourceKey = sourceKeys.find(
      (key) => !ORDINARY_NNC_SOURCE_INPUT_KEYS.has(key),
    ) || "";
    const lexicalEntry = ORDINARY_NNC_LEXICON[stem] || null;
    const requestedSourceClass = normalizeChoice(
      ownDataValue(source, "sourceClass", ""),
    ).toLowerCase();
    const openSourceClassAnalysis = getOpenNncSourceClassAnalysis(
      requestedSourceClass,
    );
    const canonicalSourceClass = getCanonicalNncSourceClass(
      lexicalEntry,
    );
    const requestedOpenNounClass = normalizeNounClass(
      openSourceClassAnalysis?.nounClass || "",
    );
    const openStemSource = Boolean(!lexicalEntry && requestedOpenNounClass);
    const sourceClass = lexicalEntry
      ? canonicalSourceClass
      : requestedSourceClass;
    const sourceClassAnalysis = getOpenNncSourceClassAnalysis(sourceClass);
    const lexicalEntryId = lexicalEntry
      ? `ordinary-nounstem:${stem}`
      : openStemSource
        ? `open-nounstem:${stem}:${sourceClass || requestedOpenNounClass}`
        : "";
    const nounClass = lexicalEntry?.nounClass || requestedOpenNounClass;
    const referentialAnimacy =
      lexicalEntry?.referentialAnimacy || (openStemSource ? "any" : "");
    const naturalPossessionPolicy =
      lexicalEntry?.naturalPossessionPolicy || (openStemSource ? "ordinary" : "");
    const naturalPossessionSemantics =
      lexicalEntry?.naturalPossessionSemantics || (openStemSource ? "ordinary" : "");
    const stateAvailability = {
      ordinary: "both",
      "naturally-possessed": "possessive-only",
      "never-possessive": "absolutive-only",
    }[naturalPossessionPolicy] || "";
    const possessorCompatibility =
      lexicalEntry?.possessorCompatibility || (openStemSource ? "ordinary" : "");
    const classMembershipOptions =
      lexicalEntry?.classMembershipOptions
      || Object.freeze(openStemSource ? [nounClass] : []);
    const stemFormationOptions =
      lexicalEntry?.stemFormationOptions
      || Object.freeze(openStemSource ? ["plain"] : []);
    const lexicalPluralConnectorOptions =
      lexicalEntry?.pluralConnectorOptions || Object.freeze([]);
    const pluralConnectorOptions = lexicalPluralConnectorOptions.length
      ? lexicalPluralConnectorOptions
      : getClassGuidedAbsolutivePluralConnectors(sourceClass);
    const useShape = lexicalEntry?.useShape || (openStemSource
      ? openSourceClassAnalysis?.useShape || "base"
      : "");
    const subclass = lexicalEntry?.subclass || (openStemSource
      ? openSourceClassAnalysis?.subclass ?? (
        nounClass === "tl"
        ? "tl-1-a"
        : nounClass === "tli"
          ? "tli-1"
          : ""
      )
      : "");
    const ephemeralFinalVowel = lexicalEntry?.ephemeralFinalVowel
      || openSourceClassAnalysis?.ephemeralFinalVowel
      || "";
    const truncationRepair = lexicalEntry?.truncationRepair
      || (openStemSource
        ? openSourceClassAnalysis?.truncationRepair || "none"
        : "");
    const compoundSource = lexicalEntry?.compoundSource === true
      || Boolean(openStemSource && embedStem && matrixStem);
    const openSourceShapeCapabilityMissing = Boolean(
      openSourceClassAnalysis?.useShape === "truncated"
      && typeof targetObject.validateClassicalNahuatlSubclassSourceShape
        !== "function"
    );
    const openSourceShapeFrame = openSourceClassAnalysis
      && typeof targetObject.validateClassicalNahuatlSubclassSourceShape
        === "function"
      ? targetObject.validateClassicalNahuatlSubclassSourceShape(stem, {
        nounClass,
        generalUseShape: useShape,
        tlSubclass: subclass.replace(/^tl-2-/u, "2").toUpperCase(),
        ephemeralFinalVowel,
        truncationRepair,
        compoundStem: compoundSource,
      })
      : null;
    const lexicalFormation =
      lexicalEntry?.lexicalFormation || (openStemSource
        ? compoundSource
          ? "user-supplied-open-compound-nounstem"
          : "user-supplied-open-nounstem"
        : "ordinary-nounstem");
    const sourceConstituents =
      lexicalEntry?.sourceConstituents || Object.freeze(
        compoundSource ? [embedStem, matrixStem] : [],
      );
    const boundaryFacts =
      lexicalEntry?.boundaryFacts || Object.freeze({});
    const lexicalSelectionAuthority = lexicalEntry
      ? "canonical-lexical-inventory"
      : openStemSource
        ? "user-supplied-lexical-analysis"
        : "";
    const possessorReduplicationOptions = Object.freeze([false, true]);
    const lexicalSelectionRecord =
      typeof targetObject.buildClassicalNahuatlLexicalSelectionRecord
        === "function"
        ? targetObject.buildClassicalNahuatlLexicalSelectionRecord(
          stem,
          {
            selectionAuthority: lexicalSelectionAuthority,
            nounClass,
            classMembershipOptions,
            stemFormation: stemFormationOptions[0] || "",
            pluralStemFormationOptions: stemFormationOptions,
            pluralConnector: pluralConnectorOptions[0] || "",
            pluralConnectorOptions,
          },
        )
        : null;
    const lexicalSelectionAuthorized = Boolean(
      lexicalSelectionRecord
      && typeof targetObject.isClassicalNahuatlLexicalSelectionRecord
        === "function"
      && targetObject.isClassicalNahuatlLexicalSelectionRecord(
        lexicalSelectionRecord,
      ),
    );
    let blockReason = "";
    if (!stem || /[()#>+=□]/u.test(stem)) {
      blockReason = "ordinary-nnc-source-stem-required";
    } else if (forbiddenSourceKey) {
      blockReason =
        `ordinary-nnc-source-lexical-facts-are-engine-owned:${forbiddenSourceKey}`;
    } else if (requestedSourceClass && !openSourceClassAnalysis) {
      blockReason = "open-nounstem-source-class-analysis-not-recognized";
    } else if (
      lexicalEntry
      && requestedSourceClass
      && requestedSourceClass !== canonicalSourceClass
    ) {
      blockReason = "ordinary-nnc-source-class-contradicts-canonical-source";
    } else if ((embedStem && !matrixStem) || (!embedStem && matrixStem)) {
      blockReason = "ordinary-nnc-source-embed-matrix-pair-required";
    } else if (!lexicalEntry && !requestedOpenNounClass) {
      blockReason = "lexical-noun-class-selection-required";
    } else if (
      !["any", "animate", "nonanimate"].includes(
        referentialAnimacy
      )
    ) {
      blockReason =
        "ordinary-nnc-source-referential-animacy-not-recognized";
    } else if (
      embedStem !== (compoundSource ? sourceConstituents[0] || "" : "")
      || matrixStem !== (compoundSource ? sourceConstituents[1] || "" : "")
    ) {
      blockReason = "ordinary-nnc-source-constituent-structure-mismatch";
    } else if (!naturalPossessionPolicy || !stateAvailability) {
      blockReason = "ordinary-nnc-source-lexical-state-policy-missing";
    } else if (!["ordinary", "relational-tla", "analogical-tla-derived"]
      .includes(possessorCompatibility)) {
      blockReason = "ordinary-nnc-source-possessor-compatibility-not-recognized";
    } else if (
      !classMembershipOptions.includes(nounClass)
      || !classMembershipOptions.length
    ) {
      blockReason = "ordinary-nnc-source-selected-class-not-lexically-licensed";
    } else if (
      !stemFormationOptions.length
      || !stemFormationOptions.every((value) =>
        ORDINARY_NNC_STEM_FORMATIONS.includes(value))
    ) {
      blockReason = "ordinary-nnc-source-stem-formation-not-licensed";
    } else if (
      !pluralConnectorOptions.every((value) =>
        ORDINARY_NNC_PLURAL_CONNECTORS.includes(value))
    ) {
      blockReason = "ordinary-nnc-source-plural-connector-not-licensed";
    } else if (!ORDINARY_NNC_USE_SHAPES.includes(useShape)) {
      blockReason = "ordinary-nnc-source-use-shape-not-recognized";
    } else if (
      !(ORDINARY_NNC_SUBCLASSES_BY_CLASS[nounClass] || []).includes(subclass)
    ) {
      blockReason = "ordinary-nnc-source-subclass-mismatches-noun-class";
    } else if (
      openSourceShapeCapabilityMissing
    ) {
      blockReason = "ordinary-nnc-source-shape-validator-required";
    } else if (
      openSourceShapeFrame
      && openSourceShapeFrame.authorizationStatus !== "authorized"
    ) {
      blockReason = openSourceShapeFrame.blockReason;
    } else if (
      useShape === "truncated"
      && (
        nounClass !== "tl"
        || !["tl-2-a", "tl-2-b", "tl-2-c"].includes(subclass)
        || !["a", "i"].includes(ephemeralFinalVowel)
      )
    ) {
      blockReason = "ordinary-nnc-source-truncation-analysis-required";
    } else if (
      !["none", "supportive-i"].includes(truncationRepair)
      || (
        subclass === "tl-2-c"
        && (!compoundSource || truncationRepair !== "supportive-i")
      )
      || (
        ["tl-2-a", "tl-2-b"].includes(subclass)
        && truncationRepair !== "none"
      )
    ) {
      blockReason = "ordinary-nnc-source-truncation-repair-mismatch";
    } else if (!lexicalSelectionAuthorized) {
      blockReason = lexicalSelectionRecord?.blockReason
        || "ordinary-nnc-source-lexical-authorization-required";
    }
    const frame = deepFreeze({
      kind: ORDINARY_NNC_SOURCE_KIND,
      version: 1,
      authorizationStatus: blockReason ? "blocked" : "authorized",
      blockReason,
      stem,
      embedStem,
      matrixStem,
      lexicalEntryId,
      lexicalSelectionAuthority,
      openStemSource,
      sourceClass,
      sourceClassAnalysis,
      sourceClassShapeFrame: openSourceShapeFrame,
      nounClass,
      referentialAnimacy,
      naturalPossessionPolicy,
      naturalPossessionSemantics,
      stateAvailability,
      allowedStateValues: getAllowedStateValues(naturalPossessionPolicy),
      allowedSubjects: Object.freeze(
        referentialAnimacy === "nonanimate"
          ? ["3common"]
          : referentialAnimacy === "animate"
            ? ORDINARY_NNC_SUBJECTS.filter(
              (subject) => subject !== "3common",
            )
            : [...ORDINARY_NNC_SUBJECTS],
      ),
      possessorCompatibility,
      classMembershipOptions,
      stemFormationOptions,
      pluralConnectorOptions,
      possessorReduplicationOptions,
      useShape,
      subclass,
      ephemeralFinalVowel,
      truncationRepair,
      compoundSource,
      lexicalFormation,
      sourceConstituents,
      boundaryFacts,
      lexicalSelectionAuthorized,
      sourceConstituentKinds: Object.freeze(
        compoundSource
          ? ["nounstem-embed", "nounstem-matrix"]
          : ["nounstem"],
      ),
      lexicalFactsReadOnly: true,
      lexicalFormationIsUserChoice: false,
      boundaryFactsReadOnly: true,
      typedSourceAuthority: true,
      callerSuppliedAuthorityAccepted: false,
      curriculumOrderAuthority: false,
      lessonMetadataAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      documentaryExampleAuthority: false,
    });
    if (frame.authorizationStatus === "authorized") {
      issuedSourceReceipts.set(frame, Object.freeze({
        sourceSignature: getSourceSignature(frame),
        lexicalEntry,
        lexicalSelectionRecord,
      }));
    }
    return frame;
  }

  function isClassicalNahuatlOrdinaryNncSourceFrame(frame = null) {
    const receipt = frame && typeof frame === "object"
      ? issuedSourceReceipts.get(frame)
      : null;
    return Boolean(
      receipt
      && frame.kind === ORDINARY_NNC_SOURCE_KIND
      && frame.version === 1
      && frame.authorizationStatus === "authorized"
      && frame.typedSourceAuthority === true
      && frame.lexicalSelectionAuthorized === true
      && frame.lexicalFactsReadOnly === true
      && frame.lexicalFormationIsUserChoice === false
      && frame.boundaryFactsReadOnly === true
      && (
        frame.openStemSource === true
          ? receipt.lexicalEntry === null
            && frame.lexicalSelectionAuthority
              === "user-supplied-lexical-analysis"
            && receipt.lexicalSelectionRecord?.selectionAuthority
              === "user-supplied-lexical-analysis"
          : receipt.lexicalEntry === ORDINARY_NNC_LEXICON[frame.stem]
            && frame.lexicalSelectionAuthority
              === "canonical-lexical-inventory"
      )
      && targetObject.isClassicalNahuatlLexicalSelectionRecord(
        receipt.lexicalSelectionRecord,
      )
      && frame.callerSuppliedAuthorityAccepted === false
      && frame.lessonMetadataAuthority === false
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
      && receipt.sourceSignature === getSourceSignature(frame)
      && Object.isFrozen(frame)
    );
  }

  function getOperationSignature(frame = null) {
    return JSON.stringify({
      sourceSignature: frame?.sourceSignature || "",
      state: frame?.state || "",
      subject: frame?.subject || "",
      referentialAnimacy: frame?.referentialAnimacy || "",
      metaphoricalUse: frame?.metaphoricalUse === true,
      possessor: frame?.possessor || "",
      stemFormation: frame?.stemFormation || "",
      pluralConnector: frame?.pluralConnector || "",
      predicateFormation: frame?.predicateFormation || "",
      predicateOperation: frame?.predicateOperation || "",
      useShape: frame?.useShape || "",
      subclass: frame?.subclass || "",
      possessorReduplication: frame?.possessorReduplication === true,
      sentenceType: frame?.sentenceType || "",
      polarity: frame?.polarity || "",
    });
  }

  function getOrdinaryNncPredicateOptionContract(
    sourceFrame = null,
    {
      state = "absolutive",
      subject = "3sg",
      possessor = "",
      stemFormation = "plain",
    } = {},
  ) {
    if (!isClassicalNahuatlOrdinaryNncSourceFrame(sourceFrame)) {
      return null;
    }
    const predicateContractUseShape = sourceFrame.useShape === "truncated"
      ? sourceFrame.truncationRepair === "supportive-i"
        ? `truncated-${sourceFrame.ephemeralFinalVowel}-supportive-i`
        : `truncated-${sourceFrame.ephemeralFinalVowel}`
      : sourceFrame.useShape;
    const predicateContractSubclass = sourceFrame.subclass.replace(
      /-(\d)-([a-z])$/u,
      "-$1$2",
    );
    return (
      typeof targetObject.getClassicalNahuatlPredicateOptionContract
        === "function"
    )
      ? targetObject.getClassicalNahuatlPredicateOptionContract(
        sourceFrame.stem,
        {
          selectedState: state,
          subject,
          possessor,
          nounClass: sourceFrame.nounClass,
          useShape: predicateContractUseShape,
          subclass: predicateContractSubclass,
          stemFormation,
        },
      )
      : null;
  }

  function getNncSubjectAnimacy(subject = "") {
    return subject === "3common" ? "nonanimate" : "animate";
  }

  function getNncSubjectPerson(subject = "") {
    return subject === "3common"
      ? "3"
      : String(subject || "").match(/^([123])(?:sg|pl)$/u)?.[1] || "3";
  }

  function getNncSubjectNumber(subject = "") {
    if (subject === "3common") return "common";
    return String(subject || "").endsWith("pl") ? "plural" : "singular";
  }

  function selectNncSubjectForAnimacy(
    allowedSubjects = [],
    requestedSubject = "",
    requestedAnimacy = "",
  ) {
    const availableAnimacyValues = Object.freeze(Array.from(new Set(
      allowedSubjects.map(getNncSubjectAnimacy),
    )));
    const subjectAnimacy = getNncSubjectAnimacy(requestedSubject);
    const selectedAnimacy = availableAnimacyValues.includes(requestedAnimacy)
      ? requestedAnimacy
      : allowedSubjects.includes(requestedSubject)
        ? subjectAnimacy
        : availableAnimacyValues[0] || "";
    const subjectValues = Object.freeze(
      allowedSubjects.filter(
        (candidate) => getNncSubjectAnimacy(candidate) === selectedAnimacy,
      ),
    );
    const selectedSubject = subjectValues.includes(requestedSubject)
      ? requestedSubject
      : subjectValues.includes("3sg")
        ? "3sg"
        : subjectValues[0] || "";
    return {
      availableAnimacyValues,
      selectedAnimacy,
      subjectValues,
      selectedSubject,
    };
  }

  function buildClassicalNahuatlNncOperationSelectionFrame(
    sourceFrame = null,
    selections = {},
  ) {
    const forbiddenCarrier = findForbiddenAuthorityCarrier(selections);
    if (forbiddenCarrier) {
      return buildBlockedFrame(
        NNC_OPERATION_SELECTION_FRAME_KIND,
        `nnc-operation-selection-forbidden-authority:${forbiddenCarrier}`,
      );
    }
    const selectionKeys = Reflect.ownKeys(selections)
      .filter((key) => typeof key === "string");
    const unknownSelectionKey = selectionKeys.find(
      (key) => !NNC_OPERATION_SELECTION_INPUT_KEYS.has(key),
    ) || "";
    if (unknownSelectionKey) {
      return buildBlockedFrame(
        NNC_OPERATION_SELECTION_FRAME_KIND,
        `nnc-operation-selection-not-recognized:${unknownSelectionKey}`,
      );
    }
    const ordinary =
      isClassicalNahuatlOrdinaryNncSourceFrame(sourceFrame);
    const pronominal =
      isClassicalNahuatlPronominalNncSourceFrame(sourceFrame);
    if (!ordinary && !pronominal) {
      return buildBlockedFrame(
        NNC_OPERATION_SELECTION_FRAME_KIND,
        "issued-authorized-nnc-source-required",
      );
    }
    const requestedSubject = normalizeSubject(
      ownDataValue(selections, "subject", ""),
    );
    const suppliedAnimacy = normalizeChoice(
      ownDataValue(selections, "animacy", ""),
    );
    const requestedAnimacy = suppliedAnimacy || (
      ordinary && sourceFrame.referentialAnimacy !== "any"
        ? sourceFrame.referentialAnimacy
        : ""
    );
    const selectableSubjects = ordinary
      && sourceFrame.referentialAnimacy !== "any"
      ? ORDINARY_NNC_SUBJECTS
      : sourceFrame.allowedSubjects;
    const subjectSelection = selectNncSubjectForAnimacy(
      selectableSubjects,
      requestedSubject,
      requestedAnimacy,
    );
    const {
      selectedAnimacy,
      selectedSubject,
      subjectValues,
      availableAnimacyValues,
    } = subjectSelection;
    const subjectPersonValues = Object.freeze(Array.from(new Set(
      subjectValues.map(getNncSubjectPerson),
    )));
    const selectedSubjectPerson = getNncSubjectPerson(selectedSubject);
    const subjectNumberValues = Object.freeze(Array.from(new Set(
      subjectValues
        .filter(
          (candidate) =>
            getNncSubjectPerson(candidate) === selectedSubjectPerson,
        )
        .map(getNncSubjectNumber),
    )));
    const selectedSubjectNumber = getNncSubjectNumber(selectedSubject);
    const metaphoricalUseAvailable = ordinary
      && sourceFrame.referentialAnimacy !== "any"
      && selectedAnimacy !== sourceFrame.referentialAnimacy;
    const selectedMetaphoricalUse = metaphoricalUseAvailable
      && ownDataValue(selections, "metaphoricalUse", false) === true;

    if (ordinary) {
      const stateValues = sourceFrame.allowedStateValues;
      const requestedState = normalizeChoice(
        ownDataValue(selections, "state", "absolutive"),
      );
      const selectedState = stateValues.includes(requestedState)
        ? requestedState
        : stateValues[0] || "";
      const stemRelationEnvironmentAvailable =
        selectedSubject.endsWith("pl") || selectedSubject === "3common";
      const absolutivePlural = selectedState === "absolutive"
        && selectedSubject.endsWith("pl");
      const stemRelationValues = Object.freeze(
        sourceFrame.stemFormationOptions.filter(
          (value) =>
            value === "plain"
            || (
              stemRelationEnvironmentAvailable
              && (
                !absolutivePlural
                || getPluralConnectorsForStemRelation(
                  sourceFrame,
                  value,
                ).length > 0
              )
            ),
        ),
      );
      const requestedStemFormation = normalizeChoice(
        ownDataValue(selections, "stemFormation", "plain"),
      );
      const selectedStemFormation = stemRelationValues.includes(
        requestedStemFormation,
      )
        ? requestedStemFormation
        : stemRelationValues[0] || "";
      const possessorValues = selectedState !== "possessive"
        ? Object.freeze([])
        : Object.freeze(ORDINARY_NNC_POSSESSORS.filter((possessor) => (
          !(
            possessor === "reciprocal"
            && !["3sg", "3common", "3pl"].includes(selectedSubject)
          )
          && !(
            possessor === "nonspecific-nonhuman"
            && sourceFrame.possessorCompatibility === "ordinary"
          )
        )));
      const requestedPossessor = normalizePossessor(
        ownDataValue(selections, "possessor", ""),
      );
      const selectedPossessor = possessorValues.includes(requestedPossessor)
        ? requestedPossessor
        : possessorValues.includes("3sg")
          ? "3sg"
          : possessorValues[0] || "";
      const predicateOptionContract = getOrdinaryNncPredicateOptionContract(
        sourceFrame,
        {
          state: selectedState,
          subject: selectedSubject,
          possessor: selectedPossessor,
          stemFormation: selectedStemFormation,
        },
      );
      const predicateOptionValues = Object.freeze([
        ...(predicateOptionContract?.optionIds || []),
      ]);
      const requestedPredicateFormation = normalizeChoice(
        ownDataValue(selections, "predicateFormation", "source-stem"),
      );
      const selectedPredicateFormation = predicateOptionValues.includes(
        requestedPredicateFormation,
      )
        ? requestedPredicateFormation
        : predicateOptionValues.includes("source-stem")
          ? "source-stem"
          : predicateOptionValues[0] || "";
      const possessorReduplicationAvailable = Boolean(
        selectedState === "possessive"
        && selectedSubject.endsWith("pl")
        && ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"]
          .includes(selectedPossessor),
      );
      const pluralConnectorValues = absolutivePlural
          ? getPluralConnectorsForStemRelation(
            sourceFrame,
            selectedStemFormation,
          )
          : Object.freeze([]);
      const requestedPluralConnector = normalizeChoice(
        ownDataValue(selections, "pluralConnector", ""),
      );
      const selectedPluralConnector = pluralConnectorValues.includes(
        requestedPluralConnector,
      )
        ? requestedPluralConnector
        : pluralConnectorValues.length === 1
          ? pluralConnectorValues[0]
          : "";
      return deepFreeze({
        kind: NNC_OPERATION_SELECTION_FRAME_KIND,
        version: 1,
        authorizationStatus: "authorized",
        blockReason: "",
        sourceFrame,
        sourceKind: "ordinary",
        nncType: "ordinary",
        stateValues,
        nncState: selectedState,
        subjectValues,
        selectedSubject,
        subjectPersonValues,
        selectedSubjectPerson,
        subjectNumberValues,
        selectedSubjectNumber,
        animacyValues: availableAnimacyValues,
        selectedAnimacy,
        metaphoricalUseAvailable,
        selectedMetaphoricalUse,
        stemRelationValues,
        selectedStemRelation: selectedStemFormation,
        stemRelationEnvironmentAvailable,
        predicateOptionContract,
        predicateOptionValues,
        selectedPredicateOptionId: selectedPredicateFormation,
        possessorValues,
        selectedPossessor,
        possessorReduplicationLexicallyAuthorized: false,
        possessorReduplicationAvailable,
        selectedPossessorReduplication:
          possessorReduplicationAvailable
          && ownDataValue(
            selections,
            "possessorReduplication",
            false,
          ) === true,
        pluralConnectorValues,
        selectedPluralConnector,
        possessivePluralConnector:
          selectedState === "possessive" && selectedSubject.endsWith("pl")
            ? "hu-ān"
            : "",
        doubledFirstPluralAvailable: false,
        selectedDoubledFirstPlural: false,
        adjunctorInValues: Object.freeze(["none"]),
        selectedAdjunctorInMode: "none",
        dependentClauseIntroducedByInAvailable: false,
        selectedDependentClauseIntroducedByIn: false,
        specialHumanUseAvailable: false,
        selectedSpecialHumanUse: false,
        clausePositionValues: Object.freeze(["initial"]),
        selectedClausePosition: "initial",
        derivedNumberForms: pluralConnectorValues,
        lexicalFactsReadOnly: true,
        derivedCoordinateFactsReadOnly: true,
        selectionFrameAuthorizesGeneration: false,
        typedSourceAuthority: true,
        curriculumOrderAuthority: false,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
    }

    const receipt = issuedPronominalSourceReceipts.get(sourceFrame);
    const clausePositionValues = sourceFrame.allowedClausePositions;
    const requestedClausePosition = normalizeChoice(
      ownDataValue(selections, "clausePosition", "initial"),
    );
    const selectedClausePosition = clausePositionValues.includes(
      requestedClausePosition,
    )
      ? requestedClausePosition
      : clausePositionValues[0] || "";
    const adjunctorInValues = sourceFrame.allowedAdjunctorModes;
    const requestedAdjunctorInMode = normalizeChoice(
      ownDataValue(selections, "adjunctorInMode", "none"),
    );
    const selectedAdjunctorInMode = adjunctorInValues.includes(
      requestedAdjunctorInMode,
    )
      ? requestedAdjunctorInMode
      : adjunctorInValues.includes("none")
        ? "none"
        : adjunctorInValues[0] || "";
    const subjectCoordinates = receipt.coreCoordinates.filter(
      (coordinate) => coordinate.subject === selectedSubject,
    );
    const doubledFirstPluralAvailable = subjectCoordinates.some(
      (coordinate) => coordinate.doubledFirstPluralSelected === true,
    );
    const selectedDoubledFirstPlural = doubledFirstPluralAvailable
      && ownDataValue(selections, "doubledFirstPlural", false) === true;
    const specialHumanUseAvailable = subjectCoordinates.some(
      (coordinate) => coordinate.specialHumanUseSelected === true,
    );
    const selectedSpecialHumanUse = specialHumanUseAvailable
      && ownDataValue(selections, "specialHumanUse", false) === true;
    const selectedCoordinateCandidates = subjectCoordinates.filter(
      (coordinate) => (
        normalizeChoice(coordinate.clausePosition)
          === selectedClausePosition
        && normalizeChoice(coordinate.adjunctorInMode)
          === selectedAdjunctorInMode
        && coordinate.doubledFirstPluralSelected
          === selectedDoubledFirstPlural
        && (
          !specialHumanUseAvailable
          || coordinate.specialHumanUseSelected
            === selectedSpecialHumanUse
        )
      ),
    );
    const derivedCoordinateValues = (key) => Object.freeze(Array.from(
      new Set(
        selectedCoordinateCandidates
          .map((coordinate) => normalizeText(coordinate?.[key]))
          .filter(Boolean),
      ),
    ));
    return deepFreeze({
      kind: NNC_OPERATION_SELECTION_FRAME_KIND,
      version: 1,
      authorizationStatus: "authorized",
      blockReason: "",
      sourceFrame,
      sourceKind: "pronominal",
      nncType: sourceFrame.familyId,
      stateValues: Object.freeze(["absolutive"]),
      nncState: "absolutive",
      subjectValues,
      selectedSubject,
      subjectPersonValues,
      selectedSubjectPerson,
      subjectNumberValues,
      selectedSubjectNumber,
      animacyValues: availableAnimacyValues,
      selectedAnimacy,
      metaphoricalUseAvailable: false,
      selectedMetaphoricalUse: false,
      stemRelationValues: Object.freeze(["plain"]),
      selectedStemRelation: "plain",
      stemRelationEnvironmentAvailable: false,
      predicateOptionContract: null,
      predicateOptionValues: Object.freeze([]),
      selectedPredicateOptionId: "",
      possessorValues: Object.freeze([]),
      selectedPossessor: "",
      possessorReduplicationLexicallyAuthorized: false,
      possessorReduplicationAvailable: false,
      selectedPossessorReduplication: false,
      doubledFirstPluralAvailable,
      selectedDoubledFirstPlural,
      adjunctorInValues,
      selectedAdjunctorInMode,
      dependentClauseIntroducedByInAvailable:
        adjunctorInValues.includes("dependent-clause"),
      selectedDependentClauseIntroducedByIn:
        selectedAdjunctorInMode === "dependent-clause",
      specialHumanUseAvailable,
      selectedSpecialHumanUse,
      clausePositionValues,
      selectedClausePosition,
      derivedNumberForms: derivedCoordinateValues("numberForm"),
      derivedMatrixForms: derivedCoordinateValues("matrixForm"),
      derivedPredicatePluralizations:
        derivedCoordinateValues("predicatePluralization"),
      lexicalFactsReadOnly: true,
      derivedCoordinateFactsReadOnly: true,
      selectionFrameAuthorizesGeneration: false,
      typedSourceAuthority: true,
      curriculumOrderAuthority: false,
      lessonMetadataAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
  }

  function buildOrdinaryNncOperationFrame(
    sourceFrame = null,
    selections = {},
    issuedPluralConnector = undefined,
  ) {
    if (!isClassicalNahuatlOrdinaryNncSourceFrame(sourceFrame)) {
      return buildBlockedFrame(
        ORDINARY_NNC_OPERATION_KIND,
        "issued-authorized-ordinary-nnc-source-required",
      );
    }
    const forbiddenCarrier = findForbiddenAuthorityCarrier(selections);
    if (forbiddenCarrier) {
      return buildBlockedFrame(
        ORDINARY_NNC_OPERATION_KIND,
        `ordinary-nnc-operation-forbidden-authority:${forbiddenCarrier}`,
        { sourceFrame },
      );
    }
    const selectionKeys = Reflect.ownKeys(selections)
      .filter((key) => typeof key === "string");
    const derivedSelectionKey = selectionKeys.find(
      (key) => ORDINARY_NNC_DERIVED_OPERATION_KEYS.has(key),
    ) || "";
    const unknownSelectionKey = selectionKeys.find(
      (key) => (
        !ORDINARY_NNC_OPERATION_SELECTION_KEYS.has(key)
        && !ORDINARY_NNC_DERIVED_OPERATION_KEYS.has(key)
      ),
    ) || "";
    if (typeof issuedPluralConnector === "undefined" && derivedSelectionKey) {
      return buildBlockedFrame(
        ORDINARY_NNC_OPERATION_KIND,
        `ordinary-nnc-operation-derived-facts-are-engine-owned:${derivedSelectionKey}`,
        { sourceFrame },
      );
    }
    if (unknownSelectionKey) {
      return buildBlockedFrame(
        ORDINARY_NNC_OPERATION_KIND,
        `ordinary-nnc-operation-selection-not-recognized:${unknownSelectionKey}`,
        { sourceFrame },
      );
    }
    const state = normalizeChoice(
      ownDataValue(selections, "state", "absolutive"),
    );
    const subject = normalizeSubject(
      ownDataValue(selections, "subject", "3sg"),
    );
    const referentialAnimacy = subject === "3common"
      ? "nonanimate"
      : "animate";
    const metaphoricalUse =
      ownDataValue(selections, "metaphoricalUse", false) === true;
    const animacyMismatch = sourceFrame.referentialAnimacy !== "any"
      && sourceFrame.referentialAnimacy !== referentialAnimacy;
    const requestedPossessor = ownDataValue(selections, "possessor", "");
    const possessor = state === "possessive"
      ? normalizePossessor(requestedPossessor)
      : "";
    const stemFormation = normalizeChoice(
      ownDataValue(
        selections,
        "stemFormation",
        sourceFrame.stemFormationOptions[0] || "plain",
      ),
    );
    const requestedPluralConnector = normalizeChoice(
      ownDataValue(selections, "pluralConnector", ""),
    );
    const pluralConnector = (
      state === "absolutive"
      && subject.endsWith("pl")
    )
      ? normalizeChoice(
        typeof issuedPluralConnector === "undefined"
          ? requestedPluralConnector
            || (sourceFrame.pluralConnectorOptions.length === 1
              ? sourceFrame.pluralConnectorOptions[0]
              : "")
          : issuedPluralConnector,
      )
      : "";
    const predicateFormation = normalizeChoice(
      ownDataValue(selections, "predicateFormation", "source-stem"),
    );
    const useShape = sourceFrame.useShape;
    const subclass = sourceFrame.subclass;
    const possessorReduplication =
      ownDataValue(selections, "possessorReduplication", false) === true;
    const sentenceType = normalizeChoice(
      ownDataValue(selections, "sentenceType", "statement"),
    );
    const polarity = normalizeChoice(
      ownDataValue(selections, "polarity", "positive"),
    );
    const predicateOptionContract = getOrdinaryNncPredicateOptionContract(
      sourceFrame,
      {
        state,
        subject,
        possessor,
        stemFormation,
      },
    );
    const selectedPredicateOption = predicateOptionContract?.options?.find(
      (candidate) => candidate?.optionId === predicateFormation,
    ) || null;
    const predicateOperation = normalizeChoice(
      selectedPredicateOption?.operation || "",
    );
    let blockReason = "";
    if (!ORDINARY_NNC_STATES.includes(state)) {
      blockReason = "ordinary-nnc-state-not-recognized";
    } else if (!sourceFrame.allowedStateValues.includes(state)) {
      blockReason = "ordinary-nnc-state-not-lexically-authorized";
    } else if (!ORDINARY_NNC_SUBJECTS.includes(subject)) {
      blockReason = "ordinary-nnc-subject-not-recognized";
    } else if (animacyMismatch && !metaphoricalUse) {
      blockReason = "ordinary-nnc-animacy-mismatch-requires-metaphorical-use";
    } else if (metaphoricalUse && !animacyMismatch) {
      blockReason = "ordinary-nnc-metaphorical-use-requires-animacy-mismatch";
    } else if (state === "possessive" && !ORDINARY_NNC_POSSESSORS.includes(possessor)) {
      blockReason = "ordinary-nnc-possessor-required";
    } else if (state === "absolutive" && normalizeText(requestedPossessor)) {
      blockReason = "ordinary-nnc-absolutive-state-has-no-possessor-operation";
    } else if (
      possessor === "reciprocal"
      && !["3sg", "3common", "3pl"].includes(subject)
    ) {
      blockReason = "reciprocal-possessor-requires-third-person-subject";
    } else if (
      possessor === "nonspecific-nonhuman"
      && sourceFrame.possessorCompatibility === "ordinary"
    ) {
      blockReason = "nonspecific-nonhuman-possessor-requires-relational-source";
    } else if (!sourceFrame.stemFormationOptions.includes(stemFormation)) {
      blockReason = "ordinary-nnc-stem-formation-not-lexically-authorized";
    } else if (
      stemFormation !== "plain"
      && !(subject.endsWith("pl") || subject === "3common")
    ) {
      blockReason =
        "ordinary-nnc-derived-stem-formation-requires-plural-or-nonanimate-context";
    } else if (
      state === "absolutive"
      && subject.endsWith("pl")
      && !sourceFrame.pluralConnectorOptions.includes(pluralConnector)
    ) {
      blockReason = "ordinary-nnc-plural-connector-not-lexically-authorized";
    } else if (useShape !== sourceFrame.useShape) {
      blockReason = "ordinary-nnc-use-shape-mismatches-typed-source";
    } else if (subclass !== sourceFrame.subclass) {
      blockReason = "ordinary-nnc-subclass-mismatches-typed-source";
    } else if (!selectedPredicateOption || !predicateOperation) {
      blockReason =
        "ordinary-nnc-predicate-formation-not-licensed-for-source-and-context";
    } else if (
      possessorReduplication
      && !(
        state === "possessive"
        && subject.endsWith("pl")
        && ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"].includes(possessor)
      )
    ) {
      blockReason =
        "ordinary-nnc-possessor-reduplication-context-not-authorized";
    } else if (!ORDINARY_NNC_SENTENCE_TYPES.includes(sentenceType)) {
      blockReason = "ordinary-nnc-sentence-type-not-recognized";
    } else if (!ORDINARY_NNC_POLARITIES.includes(polarity)) {
      blockReason = "ordinary-nnc-polarity-not-recognized";
    }
    const sourceSignature = getSourceSignature(sourceFrame);
    const frame = deepFreeze({
      kind: ORDINARY_NNC_OPERATION_KIND,
      version: 1,
      authorizationStatus: blockReason ? "blocked" : "authorized",
      blockReason,
      operationId: "ordinary-nnc:inflect-and-realize",
      sourceFrame,
      sourceSignature,
      state,
      subject,
      referentialAnimacy,
      metaphoricalUse,
      possessor,
      stemFormation,
      pluralConnector,
      predicateFormation,
      predicateOperation,
      useShape,
      subclass,
      possessorReduplication,
      sentenceType,
      polarity,
      semanticPrerequisites: Object.freeze([
        "typed-ordinary-nounstem-source",
        "lexical-noun-class-authorization",
        "state-and-participant-selection",
        "licensed-predicate-formation-selection",
        "user-selected-structural-possessor-reduplication",
      ]),
      requestedOutputKind: "canonical-ordinary-nnc-result",
      derivedLexicalFactsReadOnly: true,
      typedOperationAuthority: true,
      callerSuppliedAuthorityAccepted: false,
      curriculumOrderAuthority: false,
      lessonMetadataAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    if (frame.authorizationStatus === "authorized") {
      issuedOperationReceipts.set(frame, Object.freeze({
        sourceFrame,
        selectedPredicateOption,
        operationSignature: getOperationSignature(frame),
      }));
    }
    return frame;
  }

  function buildClassicalNahuatlOrdinaryNncOperationFrame(
    sourceFrame = null,
    selections = {},
  ) {
    return buildOrdinaryNncOperationFrame(sourceFrame, selections);
  }

  function isClassicalNahuatlOrdinaryNncOperationFrame(frame = null) {
    const receipt = frame && typeof frame === "object"
      ? issuedOperationReceipts.get(frame)
      : null;
    return Boolean(
      receipt
      && frame.kind === ORDINARY_NNC_OPERATION_KIND
      && frame.version === 1
      && frame.authorizationStatus === "authorized"
      && frame.operationId === "ordinary-nnc:inflect-and-realize"
      && frame.typedOperationAuthority === true
      && frame.derivedLexicalFactsReadOnly === true
      && frame.sourceFrame === receipt.sourceFrame
      && isClassicalNahuatlOrdinaryNncSourceFrame(frame.sourceFrame)
      && frame.sourceSignature === getSourceSignature(frame.sourceFrame)
      && receipt.operationSignature === getOperationSignature(frame)
      && frame.callerSuppliedAuthorityAccepted === false
      && frame.lessonMetadataAuthority === false
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
      && Object.isFrozen(frame)
    );
  }

  function buildLexicalSelectionRecord(sourceFrame, operationFrame) {
    if (
      typeof targetObject.buildClassicalNahuatlLexicalSelectionRecord
      !== "function"
    ) {
      return null;
    }
    return targetObject.buildClassicalNahuatlLexicalSelectionRecord(
      sourceFrame.stem,
      {
        selectionAuthority: sourceFrame.lexicalSelectionAuthority,
        nounClass: sourceFrame.nounClass,
        classMembershipOptions: sourceFrame.classMembershipOptions,
        stemFormation: operationFrame.stemFormation,
        pluralStemFormationOptions: sourceFrame.stemFormationOptions,
        pluralConnector: operationFrame.pluralConnector,
        pluralConnectorOptions: sourceFrame.pluralConnectorOptions,
        sourcePlainPluralConnector: operationFrame.pluralConnector,
      },
    );
  }

  function evaluateClassicalNahuatlOrdinaryNnc(
    sourceFrame = null,
    operationFrame = null,
  ) {
    const sourceAuthorized =
      isClassicalNahuatlOrdinaryNncSourceFrame(sourceFrame);
    const operationAuthorized =
      isClassicalNahuatlOrdinaryNncOperationFrame(operationFrame);
    const sourceOperationMatch = Boolean(
      sourceAuthorized
      && operationAuthorized
      && operationFrame.sourceFrame === sourceFrame
      && operationFrame.sourceSignature === getSourceSignature(sourceFrame),
    );
    if (!sourceOperationMatch) {
      return buildBlockedFrame(
        ORDINARY_NNC_RESULT_KIND,
        !sourceAuthorized
          ? "issued-authorized-ordinary-nnc-source-required"
          : !operationAuthorized
            ? "issued-authorized-ordinary-nnc-operation-required"
            : "ordinary-nnc-source-operation-mismatch",
        {
          sourceFrame: sourceAuthorized ? sourceFrame : null,
          operationFrame: operationAuthorized ? operationFrame : null,
          formulaRealization: "",
          surfaceRealization: "",
          wordSurface: "",
          sentenceSurface: "",
        },
      );
    }
    const requiredCapabilityNames = [
      "buildClassicalNahuatlLexicalSelectionRecord",
      "isClassicalNahuatlLexicalSelectionRecord",
      "getClassicalNahuatlPredicateOptionContract",
      "buildClassicalNahuatlStemOperationRecord",
      "isClassicalNahuatlStemOperationRecord",
      "buildClassicalNahuatlPossessorReduplicationSelection",
      "buildClassicalNahuatlNncSourceAuthorityFrame",
      "buildClassicalNahuatlClassGovernedNncFrame",
      "buildClassicalNahuatlHigherNncFrame",
      "renderClassicalNahuatlNncSlotFrameFormula",
      "buildClassicalNahuatlNncSentenceSurfaceFrame",
      "isClassicalNahuatlIssuedNncSentenceSurfaceFrame",
    ];
    const missingCapability = requiredCapabilityNames.find(
      (name) => typeof targetObject[name] !== "function",
    );
    if (missingCapability) {
      return buildBlockedFrame(
        ORDINARY_NNC_RESULT_KIND,
        `ordinary-nnc-required-capability-missing:${missingCapability}`,
        {
          sourceFrame,
          operationFrame,
          formulaRealization: "",
          surfaceRealization: "",
          wordSurface: "",
          sentenceSurface: "",
        },
      );
    }
    const lexicalSelectionRecord = buildLexicalSelectionRecord(
      sourceFrame,
      operationFrame,
    );
    const lexicalSelectionAuthorized =
      targetObject.isClassicalNahuatlLexicalSelectionRecord(
        lexicalSelectionRecord,
      );
    const operationReceipt = issuedOperationReceipts.get(operationFrame);
    const selectedPredicateOption =
      operationReceipt?.selectedPredicateOption || null;
    const predicateContractUseShape = sourceFrame.useShape === "truncated"
      ? sourceFrame.truncationRepair === "supportive-i"
        ? `truncated-${sourceFrame.ephemeralFinalVowel}-supportive-i`
        : `truncated-${sourceFrame.ephemeralFinalVowel}`
      : sourceFrame.useShape;
    const predicateContractSubclass = sourceFrame.subclass.replace(
      /-(\d)-([a-z])$/u,
      "-$1$2",
    );
    const stemOperationRecord =
      targetObject.buildClassicalNahuatlStemOperationRecord(
        sourceFrame.stem,
        {
          operation: operationFrame.predicateOperation,
          predicateOptionId: operationFrame.predicateFormation,
          selectionAuthority:
            operationFrame.predicateFormation === "tec-title"
              ? "canvas-predicate-option"
              : operationFrame.predicateOperation === "regular"
                ? "canvas-regular-default"
                : operationFrame.predicateOperation === "tl-2a-to-1a"
                  ? "user-selection"
                  : "external-lexical-record",
          targetStem:
            operationFrame.predicateFormation === "tec-title"
              ? selectedPredicateOption?.targetStem || ""
              : "",
          selectedState: operationFrame.state,
          subject: operationFrame.subject,
          possessor: operationFrame.possessor,
          nounClass: sourceFrame.nounClass,
          useShape: predicateContractUseShape,
          subclass: predicateContractSubclass,
          stemFormation: operationFrame.stemFormation,
          suppletiveConnector:
            selectedPredicateOption?.suppletiveConnector
            || "class-governed",
          secondaryPossessorCarrier:
            selectedPredicateOption?.secondaryPossessorCarrier || "tē",
        },
      );
    const stemOperationAuthorized =
      targetObject.isClassicalNahuatlStemOperationRecord(
        stemOperationRecord,
      );
    const possessorReduplicationSelection =
      targetObject.buildClassicalNahuatlPossessorReduplicationSelection(
        sourceFrame.stem,
        {
          selected: operationFrame.possessorReduplication,
          selectionAuthority: operationFrame.possessorReduplication
            ? "user-selection"
            : "not-selected",
        },
      );
    const sourceAuthorityFrame =
      targetObject.buildClassicalNahuatlNncSourceAuthorityFrame(
        sourceFrame.stem,
        {
          selectedState: operationFrame.state,
          stateAvailability: sourceFrame.stateAvailability,
          naturalPossessionPolicy: sourceFrame.naturalPossessionPolicy,
          naturalPossessionSemantics: sourceFrame.naturalPossessionSemantics,
          metaphoricalOverride: operationFrame.metaphoricalUse === true,
          possessorCompatibility: sourceFrame.possessorCompatibility,
          policySelectionAuthority: sourceFrame.openStemSource
            ? "default-ordinary-source-analysis"
            : "external-lexical-record",
          lesson15StemOperationRecord: stemOperationRecord,
          lesson15PossessorReduplicationSelection:
            possessorReduplicationSelection,
        },
      );
    const classGovernedFrame =
      targetObject.buildClassicalNahuatlClassGovernedNncFrame(
        sourceFrame.stem,
        {
          state: operationFrame.state,
          subject: operationFrame.subject,
          possessor: operationFrame.possessor,
          nounClass: sourceFrame.nounClass,
          classSelectionAuthority: sourceFrame.lexicalSelectionAuthority,
          lesson14LexicalSelectionRecord: lexicalSelectionRecord,
          nncSourceAuthorityFrame: sourceAuthorityFrame,
          stemFormation: operationFrame.stemFormation,
          pluralConnector: operationFrame.pluralConnector,
          pluralSelectionAuthority: operationFrame.pluralConnector
            ? sourceFrame.pluralConnectorOptions.length > 1
              ? "user-selection"
              : "external-lexical-record"
            : "",
          generalUseShape: operationFrame.useShape,
          ephemeralFinalVowel: sourceFrame.ephemeralFinalVowel,
          truncationRepair: sourceFrame.truncationRepair,
          sourceStructure: sourceFrame.compoundSource ? "compound" : "",
          tlSubclass: sourceFrame.nounClass === "tl"
            ? operationFrame.subclass.replace(/^tl-/u, "")
            : "",
          tliSubclass: sourceFrame.nounClass === "tli"
            ? operationFrame.subclass.replace(/^tli-/u, "")
            : "",
          animacy: operationFrame.referentialAnimacy,
          metaphoricalOverride: operationFrame.metaphoricalUse === true,
          naturalPossessionPolicy: sourceFrame.naturalPossessionPolicy,
          stateAvailability: sourceFrame.stateAvailability,
          policySelectionAuthority: sourceFrame.openStemSource
            ? "default-ordinary-source-analysis"
            : "external-lexical-record",
          possessorCompatibility: sourceFrame.possessorCompatibility,
        },
      );
    const higherFrame =
      targetObject.buildClassicalNahuatlHigherNncFrame(
        classGovernedFrame,
        {
          animacy: operationFrame.referentialAnimacy,
          metaphoricalOverride: operationFrame.metaphoricalUse === true,
          naturalPossessionPolicy: sourceFrame.naturalPossessionPolicy,
          stateAvailability: sourceFrame.stateAvailability,
          policySelectionAuthority: sourceFrame.openStemSource
            ? "default-ordinary-source-analysis"
            : "external-lexical-record",
          nncSourceAuthorityFrame: sourceAuthorityFrame,
        },
      );
    const slotFrame = higherFrame?.nncSlotFrame || null;
    const formulaRealization =
      higherFrame?.authorizationStatus === "authorized"
        ? targetObject.renderClassicalNahuatlNncSlotFrameFormula(slotFrame)
        : "";
    const sentenceFrame =
      higherFrame?.authorizationStatus === "authorized"
        ? targetObject.buildClassicalNahuatlNncSentenceSurfaceFrame(
          slotFrame,
          {
            sentenceType: operationFrame.sentenceType,
            polarity: operationFrame.polarity,
            predicateKind: "equative",
          },
        )
        : null;
    const sentenceFrameAuthorized = Boolean(
      sentenceFrame
      && targetObject.isClassicalNahuatlIssuedNncSentenceSurfaceFrame(
        sentenceFrame,
      ),
    );
    const surfaceRealization = sentenceFrameAuthorized
      ? sentenceFrame.canonicalNuclearSurface
      : "";
    const sentenceSurface = sentenceFrameAuthorized
      ? sentenceFrame.sentenceSurface
      : "";
    const thirdPluralPossessorSt2Slot =
      operationFrame.possessor === "3pl"
        ? slotFrame?.slots?.state?.slots?.find(
          (slot) => slot?.role === "st2",
        ) || null
        : null;
    const thirdPluralBoundarySound =
      operationFrame.possessor === "3pl"
        ? normalizeStem(sourceFrame.stem)
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/gu, "")
          .toLowerCase()
          .match(/[a-z]/u)?.[0] || ""
        : "";
    const contextualRealizations = Object.freeze({
      thirdPluralPossessorSt2:
        thirdPluralPossessorSt2Slot?.carrier || "",
      thirdPluralPossessorBoundarySound: thirdPluralBoundarySound,
      thirdPluralPossessorApplicable:
        operationFrame.possessor === "3pl",
      selectionAuthority: "typed-boundary-context",
      userSelectionAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    let blockReason = "";
    if (!lexicalSelectionAuthorized) {
      blockReason = lexicalSelectionRecord?.blockReason
        || "ordinary-nnc-lexical-authorization-required";
    } else if (!stemOperationAuthorized) {
      blockReason = stemOperationRecord?.blockReason
        || "ordinary-nnc-predicate-formation-authorization-required";
    } else if (sourceAuthorityFrame?.authorizationStatus !== "authorized") {
      blockReason = sourceAuthorityFrame?.blockReason
        || "ordinary-nnc-source-authority-required";
    } else if (classGovernedFrame?.authorizationStatus !== "authorized") {
      blockReason = classGovernedFrame?.blockReason
        || "ordinary-nnc-class-governed-evaluation-blocked";
    } else if (higherFrame?.authorizationStatus !== "authorized") {
      blockReason = higherFrame?.blockReason
        || "ordinary-nnc-conditioned-evaluation-blocked";
    } else if (!formulaRealization) {
      blockReason = "ordinary-nnc-formula-projection-required";
    } else if (!sentenceFrameAuthorized || !surfaceRealization) {
      blockReason = sentenceFrame?.blockReason
        || "ordinary-nnc-written-projection-required";
    } else if (/[wk]/iu.test(surfaceRealization)) {
      blockReason = "ordinary-nnc-classical-written-projection-invalid";
    }
    const authorized = !blockReason;
    const frame = deepFreeze({
      kind: ORDINARY_NNC_RESULT_KIND,
      version: 1,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason,
      sourceFrame,
      operationFrame,
      contextualRealizations,
      formulaProjection: Object.freeze({
        kind: "classical-nahuatl-ordinary-nnc-formula-projection",
        formulaRealization: authorized ? formulaRealization : "",
        projectionSource: "typed-nnc-slot-frame",
        writtenSurfaceAuthority: false,
      }),
      writtenProjection: Object.freeze({
        kind: "classical-nahuatl-ordinary-nnc-written-projection",
        surfaceRealization: authorized ? surfaceRealization : "",
        projectionSource: "typed-nnc-boundary-realization",
        formulaStringAuthority: false,
      }),
      formulaRealization: authorized ? formulaRealization : "",
      surfaceRealization: authorized ? surfaceRealization : "",
      wordSurface: authorized ? surfaceRealization : "",
      sentenceSurface: authorized ? sentenceSurface : "",
      stemOperation: Object.freeze({
        predicateFormation: operationFrame.predicateFormation,
        operation: stemOperationRecord?.operation || "",
        sourceStem: stemOperationRecord?.sourceStem || "",
        targetStem: stemOperationRecord?.targetStem || "",
        targetStemDerivation:
          stemOperationRecord?.targetStemDerivation || "",
        suppletiveConnector:
          stemOperationRecord?.suppletiveConnector || "",
        secondaryPossessorCarrier:
          stemOperationRecord?.secondaryPossessorCarrier || "",
        lexicalAuthorizationStatus:
          stemOperationAuthorized ? "authorized" : "blocked",
        callerSuppliedTargetStemAuthority: false,
        documentaryOptionAuthority: false,
      }),
      typedSlotFrame: authorized ? slotFrame : null,
      sentenceFrame: authorized ? sentenceFrame : null,
      formulaAndWrittenDerivedIndependently: true,
      scalarEvaluatorIdentity:
        "evaluateClassicalNahuatlOrdinaryNnc",
      typedFrameAuthority: true,
      typedSourceAuthority: true,
      callerSuppliedAuthorityAccepted: false,
      curriculumOrderAuthority: false,
      lessonMetadataAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    issuedResultReceipts.set(frame, Object.freeze({
      sourceFrame,
      operationFrame,
      contextualRealizations: frame.contextualRealizations,
      typedSlotFrame: authorized ? slotFrame : null,
      sentenceFrame: authorized ? sentenceFrame : null,
      stemOperation: frame.stemOperation,
      formulaRealization: frame.formulaRealization,
      surfaceRealization: frame.surfaceRealization,
      sentenceSurface: frame.sentenceSurface,
      authorizationStatus: frame.authorizationStatus,
    }));
    return frame;
  }

  function isClassicalNahuatlOrdinaryNncResult(frame = null) {
    const receipt = frame && typeof frame === "object"
      ? issuedResultReceipts.get(frame)
      : null;
    return Boolean(
      receipt
      && frame.kind === ORDINARY_NNC_RESULT_KIND
      && frame.version === 1
      && frame.authorizationStatus === "authorized"
      && frame.sourceFrame === receipt.sourceFrame
      && frame.operationFrame === receipt.operationFrame
      && frame.contextualRealizations === receipt.contextualRealizations
      && isClassicalNahuatlOrdinaryNncSourceFrame(frame.sourceFrame)
      && isClassicalNahuatlOrdinaryNncOperationFrame(frame.operationFrame)
      && frame.operationFrame.sourceFrame === frame.sourceFrame
      && frame.formulaProjection?.formulaRealization
        === receipt.formulaRealization
      && frame.writtenProjection?.surfaceRealization
        === receipt.surfaceRealization
      && frame.formulaRealization === receipt.formulaRealization
      && frame.surfaceRealization === receipt.surfaceRealization
      && frame.sentenceSurface === receipt.sentenceSurface
      && frame.typedSlotFrame === receipt.typedSlotFrame
      && frame.sentenceFrame === receipt.sentenceFrame
      && frame.stemOperation === receipt.stemOperation
      && frame.formulaAndWrittenDerivedIndependently === true
      && frame.scalarEvaluatorIdentity
        === "evaluateClassicalNahuatlOrdinaryNnc"
      && frame.typedFrameAuthority === true
      && frame.callerSuppliedAuthorityAccepted === false
      && frame.lessonMetadataAuthority === false
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
      && Object.isFrozen(frame)
    );
  }

  function normalizeRequestedStates(value, sourceFrame) {
    return normalizeUniqueList(
      value,
      normalizeChoice,
      sourceFrame.allowedStateValues,
    );
  }

  function normalizeRequestedSubjects(value) {
    return normalizeUniqueList(value, normalizeSubject, ORDINARY_NNC_SUBJECTS);
  }

  function normalizeRequestedPossessors(value, sourceFrame) {
    const fallback = ORDINARY_NNC_POSSESSORS.filter((possessor) => (
      possessor !== "nonspecific-nonhuman"
      || sourceFrame.possessorCompatibility !== "ordinary"
    ));
    return normalizeUniqueList(value, normalizePossessor, fallback);
  }

  function prepareClassicalNahuatlOrdinaryNncParadigmPlan(
    sourceFrame = null,
    request = {},
  ) {
    if (!isClassicalNahuatlOrdinaryNncSourceFrame(sourceFrame)) {
      return buildBlockedFrame(
        ORDINARY_NNC_PARADIGM_PLAN_KIND,
        "issued-authorized-ordinary-nnc-source-required",
        { coordinates: Object.freeze([]), coordinateCount: 0 },
      );
    }
    const forbiddenCarrier = findForbiddenAuthorityCarrier(request);
    if (forbiddenCarrier) {
      return buildBlockedFrame(
        ORDINARY_NNC_PARADIGM_PLAN_KIND,
        `ordinary-nnc-paradigm-forbidden-authority:${forbiddenCarrier}`,
        {
          sourceFrame,
          coordinates: Object.freeze([]),
          coordinateCount: 0,
        },
      );
    }
    const requestKeys = Reflect.ownKeys(request)
      .filter((key) => typeof key === "string");
    const derivedRequestKey = requestKeys.find(
      (key) => ORDINARY_NNC_DERIVED_OPERATION_KEYS.has(key),
    ) || "";
    const unknownRequestKey = requestKeys.find(
      (key) => (
        !ORDINARY_NNC_PARADIGM_REQUEST_KEYS.has(key)
        && !ORDINARY_NNC_DERIVED_OPERATION_KEYS.has(key)
      ),
    ) || "";
    if (derivedRequestKey) {
      return buildBlockedFrame(
        ORDINARY_NNC_PARADIGM_PLAN_KIND,
        `ordinary-nnc-paradigm-derived-facts-are-engine-owned:${derivedRequestKey}`,
        {
          sourceFrame,
          coordinates: Object.freeze([]),
          coordinateCount: 0,
        },
      );
    }
    if (unknownRequestKey) {
      return buildBlockedFrame(
        ORDINARY_NNC_PARADIGM_PLAN_KIND,
        `ordinary-nnc-paradigm-selection-not-recognized:${unknownRequestKey}`,
        {
          sourceFrame,
          coordinates: Object.freeze([]),
          coordinateCount: 0,
        },
      );
    }
    const states = normalizeRequestedStates(
      ownDataValue(request, "states", null),
      sourceFrame,
    );
    const subjects = normalizeRequestedSubjects(
      ownDataValue(request, "subjects", null),
    );
    const possessors = normalizeRequestedPossessors(
      ownDataValue(request, "possessors", null),
      sourceFrame,
    );
    const rawStates = ownDataValue(request, "states", null);
    const rawSubjects = ownDataValue(request, "subjects", null);
    const rawPossessors = ownDataValue(request, "possessors", null);
    let blockReason = "";
    if (
      !states.length
      || states.some((state) =>
        !sourceFrame.allowedStateValues.includes(state))
      || Array.isArray(rawStates) && rawStates.length !== states.length
    ) {
      blockReason = "ordinary-nnc-paradigm-state-inventory-invalid";
    } else if (
      !subjects.length
      || subjects.some((subject) => !ORDINARY_NNC_SUBJECTS.includes(subject))
      || Array.isArray(rawSubjects) && rawSubjects.length !== subjects.length
    ) {
      blockReason = "ordinary-nnc-paradigm-subject-inventory-invalid";
    } else if (
      states.includes("possessive")
      && (
        !possessors.length
        || possessors.some((possessor) =>
          !ORDINARY_NNC_POSSESSORS.includes(possessor))
        || Array.isArray(rawPossessors)
          && rawPossessors.length !== possessors.length
      )
    ) {
      blockReason = "ordinary-nnc-paradigm-possessor-inventory-invalid";
    }
    const fixedSelections = {
      predicateFormation: ownDataValue(
        request,
        "predicateFormation",
        "source-stem",
      ),
      possessorReduplication:
        ownDataValue(request, "possessorReduplication", false) === true,
      sentenceType: ownDataValue(request, "sentenceType", "statement"),
      polarity: ownDataValue(request, "polarity", "positive"),
    };
    const operationFrames = [];
    if (!blockReason) {
      const appendCoordinateOperations = ({
        state,
        subject,
        possessor = "",
      }) => {
        const stemFormations = (
          subject.endsWith("pl")
          || subject === "3common"
        )
          ? sourceFrame.stemFormationOptions
          : sourceFrame.stemFormationOptions.includes("plain")
            ? ["plain"]
            : [];
        const pluralConnectors = (
          state === "absolutive"
          && subject.endsWith("pl")
        )
          ? sourceFrame.pluralConnectorOptions
          : [""];
        stemFormations.forEach((stemFormation) => {
          pluralConnectors.forEach((pluralConnector) => {
            const possessorReduplication = Boolean(
              fixedSelections.possessorReduplication
              && state === "possessive"
              && subject.endsWith("pl")
              && ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"]
                .includes(possessor),
            );
            const operationFrame =
              buildOrdinaryNncOperationFrame(
                sourceFrame,
                {
                  ...fixedSelections,
                  state,
                  subject,
                  possessor,
                  stemFormation,
                  possessorReduplication,
                },
                pluralConnector,
              );
            const scalarProbe = evaluateClassicalNahuatlOrdinaryNnc(
              sourceFrame,
              operationFrame,
            );
            if (isClassicalNahuatlOrdinaryNncResult(scalarProbe)) {
              operationFrames.push(operationFrame);
            }
          });
        });
      };
      states.forEach((state) => {
        subjects.forEach((subject) => {
          if (state === "absolutive") {
            appendCoordinateOperations({ state, subject });
            return;
          }
          possessors.forEach((possessor) => {
            if (
              possessor === "reciprocal"
              && !["3sg", "3common", "3pl"].includes(subject)
            ) {
              return;
            }
            appendCoordinateOperations({ state, subject, possessor });
          });
        });
      });
      const blockedOperation = operationFrames.find(
        (frame) =>
          !isClassicalNahuatlOrdinaryNncOperationFrame(frame),
      );
      if (blockedOperation) {
        blockReason = blockedOperation.blockReason
          || "ordinary-nnc-paradigm-operation-not-authorized";
      }
    }
    const authorized = !blockReason && operationFrames.length > 0;
    const coordinates = authorized
      ? operationFrames.map((operationFrame, index) => Object.freeze({
        coordinateId: [
          operationFrame.state,
          operationFrame.subject,
          operationFrame.possessor || "no-possessor",
          ...(operationFrame.predicateFormation === "source-stem"
            ? []
            : [operationFrame.predicateFormation]),
          operationFrame.stemFormation,
          operationFrame.pluralConnector || "no-plural-connector",
          ...(operationFrame.possessorReduplication
            ? ["reduplicated-possessor"]
            : []),
        ].join(":"),
        coordinateIndex: index,
        state: operationFrame.state,
        subject: operationFrame.subject,
        possessor: operationFrame.possessor,
        predicateFormation: operationFrame.predicateFormation,
        predicateOperation: operationFrame.predicateOperation,
        stemFormation: operationFrame.stemFormation,
        pluralConnector: operationFrame.pluralConnector,
        possessorReduplication:
          operationFrame.possessorReduplication,
        operationFrame,
      }))
      : [];
    const frame = deepFreeze({
      kind: ORDINARY_NNC_PARADIGM_PLAN_KIND,
      version: 1,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason,
      sourceFrame,
      sourceSignature: getSourceSignature(sourceFrame),
      states,
      subjects,
      possessors: states.includes("possessive") ? possessors : [],
      coordinates,
      coordinateCount: coordinates.length,
      scalarEvaluatorIdentity:
        "evaluateClassicalNahuatlOrdinaryNnc",
      pointwiseScalarEvaluationRequired: true,
      typedFrameAuthority: true,
      typedSourceAuthority: true,
      callerSuppliedCoordinateAuthorityAccepted: false,
      callerSuppliedAuthorityAccepted: false,
      curriculumOrderAuthority: false,
      lessonMetadataAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    if (authorized) {
      issuedParadigmPlanReceipts.set(frame, Object.freeze({
        sourceFrame,
        coordinates: frame.coordinates,
        coordinateCount: frame.coordinateCount,
      }));
    }
    return frame;
  }

  function isClassicalNahuatlOrdinaryNncParadigmPlan(frame = null) {
    const receipt = frame && typeof frame === "object"
      ? issuedParadigmPlanReceipts.get(frame)
      : null;
    return Boolean(
      receipt
      && frame.kind === ORDINARY_NNC_PARADIGM_PLAN_KIND
      && frame.version === 1
      && frame.authorizationStatus === "authorized"
      && frame.sourceFrame === receipt.sourceFrame
      && isClassicalNahuatlOrdinaryNncSourceFrame(frame.sourceFrame)
      && frame.coordinates === receipt.coordinates
      && frame.coordinateCount === receipt.coordinateCount
      && frame.coordinateCount === frame.coordinates.length
      && frame.coordinates.every((coordinate, index) => (
        coordinate.coordinateIndex === index
        && isClassicalNahuatlOrdinaryNncOperationFrame(
          coordinate.operationFrame,
        )
        && coordinate.operationFrame.sourceFrame === frame.sourceFrame
      ))
      && frame.scalarEvaluatorIdentity
        === "evaluateClassicalNahuatlOrdinaryNnc"
      && frame.pointwiseScalarEvaluationRequired === true
      && frame.callerSuppliedCoordinateAuthorityAccepted === false
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
      && Object.isFrozen(frame)
    );
  }

  function projectClassicalNahuatlOrdinaryNncParadigmCoordinates(
    plan = null,
  ) {
    if (!isClassicalNahuatlOrdinaryNncParadigmPlan(plan)) return [];
    return Object.freeze(plan.coordinates.map((coordinate) => {
      const scalarFrame = evaluateClassicalNahuatlOrdinaryNnc(
        plan.sourceFrame,
        coordinate.operationFrame,
      );
      const scalarAuthorized =
        isClassicalNahuatlOrdinaryNncResult(scalarFrame);
      const frame = deepFreeze({
        kind: ORDINARY_NNC_PARADIGM_COORDINATE_KIND,
        version: 1,
        authorizationStatus: scalarAuthorized ? "authorized" : "blocked",
        blockReason: scalarAuthorized
          ? ""
          : scalarFrame?.blockReason || "ordinary-nnc-scalar-coordinate-blocked",
        coordinateId: coordinate.coordinateId,
        coordinateIndex: coordinate.coordinateIndex,
        state: coordinate.state,
        subject: coordinate.subject,
        possessor: coordinate.possessor,
        operationFrame: coordinate.operationFrame,
        scalarFrame,
        formulaRealization: scalarFrame?.formulaRealization || "",
        surfaceRealization: scalarFrame?.surfaceRealization || "",
        wordSurface: scalarFrame?.wordSurface || "",
        sentenceSurface: scalarFrame?.sentenceSurface || "",
        scalarEvaluatorIdentity:
          "evaluateClassicalNahuatlOrdinaryNnc",
        scalarEquivalent: scalarAuthorized,
        pointwiseEquivalent: scalarAuthorized,
        typedFrameAuthority: true,
        callerSuppliedCoordinateAuthorityAccepted: false,
        callerSuppliedAuthorityAccepted: false,
        curriculumOrderAuthority: false,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
      issuedCoordinateReceipts.set(frame, Object.freeze({
        plan,
        operationFrame: frame.operationFrame,
        scalarFrame: frame.scalarFrame,
        formulaRealization: frame.formulaRealization,
        surfaceRealization: frame.surfaceRealization,
        sentenceSurface: frame.sentenceSurface,
      }));
      return frame;
    }));
  }

  function isClassicalNahuatlOrdinaryNncParadigmCoordinate(frame = null) {
    const receipt = frame && typeof frame === "object"
      ? issuedCoordinateReceipts.get(frame)
      : null;
    return Boolean(
      receipt
      && frame.kind === ORDINARY_NNC_PARADIGM_COORDINATE_KIND
      && frame.version === 1
      && frame.authorizationStatus === "authorized"
      && isClassicalNahuatlOrdinaryNncOperationFrame(frame.operationFrame)
      && isClassicalNahuatlOrdinaryNncResult(frame.scalarFrame)
      && frame.operationFrame === receipt.operationFrame
      && frame.scalarFrame === receipt.scalarFrame
      && frame.formulaRealization === receipt.formulaRealization
      && frame.surfaceRealization === receipt.surfaceRealization
      && frame.sentenceSurface === receipt.sentenceSurface
      && frame.formulaRealization === frame.scalarFrame.formulaRealization
      && frame.surfaceRealization === frame.scalarFrame.surfaceRealization
      && frame.wordSurface === frame.scalarFrame.wordSurface
      && frame.sentenceSurface === frame.scalarFrame.sentenceSurface
      && frame.scalarEvaluatorIdentity
        === "evaluateClassicalNahuatlOrdinaryNnc"
      && frame.scalarEquivalent === true
      && frame.pointwiseEquivalent === true
      && frame.callerSuppliedCoordinateAuthorityAccepted === false
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
      && Object.isFrozen(frame)
    );
  }

  function buildPronominalCoreSourceOptions({
    familyId = "",
    stem = "",
    embedStem = "",
    matrixStem = "",
    matrixFamily = "",
    matrixForm = "",
  } = {}) {
    const normalizedFamily = normalizeChoice(familyId);
    const normalizedStem = normalizeStem(stem);
    const normalizedEmbed = normalizeStem(embedStem);
    const normalizedMatrix = normalizeStem(matrixStem);
    const quantitiveMatrixFamily = {
      quich: "qui-ch",
      "qui-ch": "qui-ch",
      qui: "quī",
      "quī": "quī",
      chi: "chī",
      "chī": "chī",
    }[normalizeChoice(matrixFamily)] || normalizeStem(matrixFamily);
    const familyOptions = {
      "personal-simple": {
        subtype: "personal-simple",
        thirdCommonVariant: normalizedStem === "eh" ? "eh" : "yeh",
      },
      "personal-compound": {
        subtype: "personal-compound",
        thirdCommonVariant: normalizedStem === "eh-huā" ? "eh" : "yeh",
      },
      "personal-compound-derived": {
        subtype: "personal-compound-derived",
        derivedPersonalStem: normalizedStem,
        derivedPersonalRelation: "distributive-varietal",
      },
      "interrogative-what": {
        subtype: "interrogative",
        interrogativeKind: "tleh",
      },
      "interrogative-what-compound": {
        subtype: "interrogative",
        interrogativeKind: "tleh-huā",
      },
      "interrogative-which": {
        subtype: "interrogative",
        interrogativeKind: "cā",
      },
      "interrogative-which-compound": {
        subtype: "interrogative",
        interrogativeKind: "cā",
        compoundInterrogativeStem: normalizedStem,
        compoundInterrogativeEmbed: normalizedEmbed,
        compoundInterrogativeMatrix: normalizedMatrix,
        compoundInterrogativeNumberClass: /huā$/u.test(normalizedMatrix)
          ? "tl"
          : "zero",
      },
      "interrogative-who": {
        subtype: "interrogative",
        interrogativeKind: "āc",
      },
      "demonstrative-this": {
        subtype: "demonstrative",
        demonstrative: "īn",
      },
      "demonstrative-that": {
        subtype: "demonstrative",
        demonstrative: "ōn",
      },
      "indefinite-someone": {
        subtype: "indefinite",
        indefiniteKind: "someone",
      },
      "indefinite-something": {
        subtype: "indefinite",
        indefiniteKind: "something",
      },
      quantitive: {
        subtype: "quantitive",
        embedStem: normalizedEmbed,
        matrixFamily: quantitiveMatrixFamily,
        matrixForm: normalizeStem(matrixForm),
      },
      "quantitive-personal-compound": {
        subtype: "quantitive-personal-compound",
        quantitiveEmbed: normalizedEmbed,
        quantitivePersonalMatrix: normalizedMatrix,
      },
    }[normalizedFamily] || null;
    return familyOptions
      ? {
          ...familyOptions,
          enteredStem: normalizedStem,
          sourceStem: normalizedStem,
        }
      : null;
  }

  function getPronominalSourceSignature(frame = null) {
    return JSON.stringify({
      familyId: frame?.familyId || "",
      stem: frame?.stem || "",
      embedStem: frame?.embedStem || "",
      matrixStem: frame?.matrixStem || "",
      lexicalEntryId: frame?.lexicalEntryId || "",
      sourceStructure: frame?.sourceStructure || "",
      matrixFamily: frame?.matrixFamily || "",
      matrixForm: frame?.matrixForm || "",
      allowedSubjects: frame?.allowedSubjects || [],
      allowedNumberForms: frame?.allowedNumberForms || [],
      allowedMatrixForms: frame?.allowedMatrixForms || [],
      allowedPredicatePluralizations:
        frame?.allowedPredicatePluralizations || [],
      allowedClausePositions: frame?.allowedClausePositions || [],
      allowedAdjunctorModes: frame?.allowedAdjunctorModes || [],
    });
  }

  function buildClassicalNahuatlPronominalNncSourceFrame(source = {}) {
    const forbiddenCarrier = findForbiddenAuthorityCarrier(source);
    if (forbiddenCarrier) {
      return buildBlockedFrame(
        PRONOMINAL_NNC_SOURCE_KIND,
        `pronominal-nnc-source-forbidden-authority:${forbiddenCarrier}`,
      );
    }
    const stem = normalizeStem(ownDataValue(source, "stem", ""));
    const enteredEmbedStem = normalizeStem(
      ownDataValue(source, "embedStem", ""),
    );
    const enteredMatrixStem = normalizeStem(
      ownDataValue(source, "matrixStem", ""),
    );
    const sourceKeys = Reflect.ownKeys(source)
      .filter((key) => typeof key === "string");
    const forbiddenSourceKey = sourceKeys.find(
      (key) => !PRONOMINAL_NNC_SOURCE_INPUT_KEYS.has(key),
    ) || "";
    const lexicalEntry = PRONOMINAL_NNC_LEXICON[stem] || null;
    const lexicalEntryId = lexicalEntry ? `pronominal-nounstem:${stem}` : "";
    const familyId = lexicalEntry?.familyId || "";
    const embedStem = lexicalEntry?.embedStem || "";
    const matrixStem = lexicalEntry?.matrixStem || "";
    const matrixFamily = lexicalEntry?.matrixFamily || "";
    const matrixForm = lexicalEntry?.matrixForm || "";
    const sourceStructure = lexicalEntry?.sourceStructure || "";
    const coreSourceOptions = buildPronominalCoreSourceOptions({
      familyId,
      stem,
      embedStem,
      matrixStem,
      matrixFamily,
      matrixForm,
    });
    const requiredCapability =
      targetObject.buildClassicalNahuatlPronominalParadigmPlan;
    const corePlan = (
      coreSourceOptions
      && typeof requiredCapability === "function"
    )
      ? requiredCapability(coreSourceOptions)
      : null;
    const allAuthorizedCoreCoordinates = (
      corePlan?.authorizationStatus === "authorized"
      && Array.isArray(corePlan.coordinates)
    )
      ? corePlan.coordinates
      : [];
    const authorizedCoreCoordinates =
      allAuthorizedCoreCoordinates.filter((coordinate) => (
        normalizeStem(coordinate?.sourceFrame?.sourceStem || "") === stem
      ));
    const uniqueCoordinateValues = (key) => Object.freeze(
      Array.from(new Set(
        authorizedCoreCoordinates
          .map((coordinate) => normalizeText(coordinate?.[key]))
          .filter(Boolean),
      )),
    );
    let blockReason = "";
    if (!stem || /[()#>+=□]/u.test(stem)) {
      blockReason = "pronominal-nnc-source-stem-required";
    } else if (forbiddenSourceKey) {
      blockReason =
        `pronominal-nnc-source-lexical-facts-are-engine-owned:${forbiddenSourceKey}`;
    } else if (!lexicalEntry) {
      blockReason = "pronominal-nnc-source-lexical-entry-required";
    } else if (
      enteredEmbedStem !== embedStem
      || enteredMatrixStem !== matrixStem
    ) {
      blockReason = "pronominal-nnc-source-constituent-structure-mismatch";
    } else if (!PRONOMINAL_NNC_FAMILIES.includes(familyId)) {
      blockReason = "pronominal-nnc-source-lexical-family-missing";
    } else if (!coreSourceOptions) {
      blockReason = "pronominal-nnc-source-structure-not-recognized";
    } else if (!authorizedCoreCoordinates.length) {
      blockReason = corePlan?.blockReason
        || "pronominal-nnc-source-not-lexically-authorized";
    }
    const frame = deepFreeze({
      kind: PRONOMINAL_NNC_SOURCE_KIND,
      version: 1,
      authorizationStatus: blockReason ? "blocked" : "authorized",
      blockReason,
      familyId,
      stem,
      embedStem,
      matrixStem,
      lexicalEntryId,
      sourceStructure,
      matrixFamily,
      matrixForm,
      allowedSubjects: uniqueCoordinateValues("subject"),
      allowedNumberForms: uniqueCoordinateValues("numberForm"),
      allowedMatrixForms: uniqueCoordinateValues("matrixForm"),
      allowedPredicatePluralizations:
        uniqueCoordinateValues("predicatePluralization"),
      allowedClausePositions: uniqueCoordinateValues("clausePosition"),
      allowedAdjunctorModes: uniqueCoordinateValues("adjunctorInMode"),
      lexicalAuthorizationStatus: authorizedCoreCoordinates.length
        ? "authorized"
        : "blocked",
      sourceConstituentKinds: Object.freeze(
        sourceStructure === "embed-matrix"
          ? ["pronominal-nounstem-embed", "pronominal-nounstem-matrix"]
          : ["pronominal-nounstem"],
      ),
      lexicalFactsReadOnly: true,
      typedSourceAuthority: true,
      callerSuppliedAuthorityAccepted: false,
      curriculumOrderAuthority: false,
      lessonMetadataAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
      documentaryExampleAuthority: false,
    });
    if (frame.authorizationStatus === "authorized") {
      issuedPronominalSourceReceipts.set(frame, Object.freeze({
        sourceSignature: getPronominalSourceSignature(frame),
        lexicalEntry,
        coreSourceOptions: Object.freeze({ ...coreSourceOptions }),
        corePlan,
        coreCoordinates: Object.freeze([...authorizedCoreCoordinates]),
      }));
    }
    return frame;
  }

  function isClassicalNahuatlPronominalNncSourceFrame(frame = null) {
    const receipt = frame && typeof frame === "object"
      ? issuedPronominalSourceReceipts.get(frame)
      : null;
    return Boolean(
      receipt
      && frame.kind === PRONOMINAL_NNC_SOURCE_KIND
      && frame.version === 1
      && frame.authorizationStatus === "authorized"
      && frame.typedSourceAuthority === true
      && frame.lexicalAuthorizationStatus === "authorized"
      && frame.lexicalFactsReadOnly === true
      && receipt.lexicalEntry === PRONOMINAL_NNC_LEXICON[frame.stem]
      && frame.callerSuppliedAuthorityAccepted === false
      && frame.lessonMetadataAuthority === false
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
      && receipt.sourceSignature === getPronominalSourceSignature(frame)
      && receipt.corePlan?.authorizationStatus === "authorized"
      && receipt.coreCoordinates?.length > 0
      && Object.isFrozen(frame)
    );
  }

  function getPronominalOperationSignature(frame = null) {
    return JSON.stringify({
      sourceSignature: frame?.sourceSignature || "",
      subject: frame?.subject || "",
      numberForm: frame?.numberForm || "",
      matrixForm: frame?.matrixForm || "",
      predicatePluralization: frame?.predicatePluralization || "",
      clausePosition: frame?.clausePosition || "",
      adjunctorInMode: frame?.adjunctorInMode || "",
      doubledFirstPlural: frame?.doubledFirstPlural === true,
      specialHumanUse: frame?.specialHumanUse === true,
      sentenceType: frame?.sentenceType || "",
      polarity: frame?.polarity || "",
    });
  }

  function buildPronominalNncOperationFrame(
    sourceFrame = null,
    selections = {},
    selectedCoreCoordinate = null,
  ) {
    if (!isClassicalNahuatlPronominalNncSourceFrame(sourceFrame)) {
      return buildBlockedFrame(
        PRONOMINAL_NNC_OPERATION_KIND,
        "issued-authorized-pronominal-nnc-source-required",
      );
    }
    const forbiddenCarrier = findForbiddenAuthorityCarrier(selections);
    if (forbiddenCarrier) {
      return buildBlockedFrame(
        PRONOMINAL_NNC_OPERATION_KIND,
        `pronominal-nnc-operation-forbidden-authority:${forbiddenCarrier}`,
        { sourceFrame },
      );
    }
    const receipt = issuedPronominalSourceReceipts.get(sourceFrame);
    const selectionKeys = Reflect.ownKeys(selections)
      .filter((key) => typeof key === "string");
    const derivedSelectionKey = selectionKeys.find(
      (key) => PRONOMINAL_NNC_DERIVED_OPERATION_KEYS.has(key),
    ) || "";
    const unknownSelectionKey = selectionKeys.find(
      (key) => (
        !PRONOMINAL_NNC_OPERATION_SELECTION_KEYS.has(key)
        && !PRONOMINAL_NNC_DERIVED_OPERATION_KEYS.has(key)
      ),
    ) || "";
    if (!selectedCoreCoordinate && derivedSelectionKey) {
      return buildBlockedFrame(
        PRONOMINAL_NNC_OPERATION_KIND,
        `pronominal-nnc-operation-derived-facts-are-engine-owned:${derivedSelectionKey}`,
        { sourceFrame },
      );
    }
    if (unknownSelectionKey) {
      return buildBlockedFrame(
        PRONOMINAL_NNC_OPERATION_KIND,
        `pronominal-nnc-operation-selection-not-recognized:${unknownSelectionKey}`,
        { sourceFrame },
      );
    }
    const subject = normalizeSubject(
      ownDataValue(selections, "subject", ""),
    );
    const clausePosition = normalizeChoice(
      ownDataValue(selections, "clausePosition", "initial"),
    );
    const adjunctorInMode = normalizeChoice(
      ownDataValue(selections, "adjunctorInMode", "none"),
    );
    const doubledFirstPlural =
      ownDataValue(selections, "doubledFirstPlural", false) === true;
    const requestedSpecialHumanUse = ownDataValue(
      selections,
      "specialHumanUse",
      undefined,
    );
    const sentenceType = normalizeChoice(
      ownDataValue(selections, "sentenceType", "statement"),
    );
    const polarity = normalizeChoice(
      ownDataValue(selections, "polarity", "positive"),
    );
    const candidateInventory = selectedCoreCoordinate
      && receipt.coreCoordinates.includes(selectedCoreCoordinate)
      ? [selectedCoreCoordinate]
      : selectedCoreCoordinate
        ? []
        : receipt.coreCoordinates;
    const candidates = candidateInventory.filter((coordinate) => (
      (!subject || coordinate.subject === subject)
      && normalizeChoice(coordinate.clausePosition) === clausePosition
      && normalizeChoice(coordinate.adjunctorInMode) === adjunctorInMode
      && coordinate.doubledFirstPluralSelected === doubledFirstPlural
      && (
        typeof requestedSpecialHumanUse === "undefined"
        || coordinate.specialHumanUseSelected
          === (requestedSpecialHumanUse === true)
      )
    ));
    // Andrews §16.9 states that long-matrix internal -n is the normal plural
    // formation; plain-stem forms are licensed variants.  This contextual
    // preference is derived by the engine, not selected through a public
    // lexical-coordinate control.
    const selectedCoordinate = (
      sourceFrame.familyId === "quantitive"
      && subject.endsWith("pl")
    )
      ? candidates.find((coordinate) => (
        coordinate.predicatePluralization === "internal-n"
        && coordinate.numberForm === "t-in"
      )) || candidates.find((coordinate) => (
        coordinate.predicatePluralization === "internal-n"
      )) || candidates[0] || null
      : candidates[0] || null;
    let blockReason = "";
    if (
      selectedCoreCoordinate
      && !receipt.coreCoordinates.includes(selectedCoreCoordinate)
    ) {
      blockReason =
        "issued-pronominal-nnc-derived-coordinate-required";
    } else if (!subject || !sourceFrame.allowedSubjects.includes(subject)) {
      blockReason = "pronominal-nnc-subject-not-licensed-for-source";
    } else if (!ORDINARY_NNC_SENTENCE_TYPES.includes(sentenceType)) {
      blockReason = "pronominal-nnc-sentence-type-not-recognized";
    } else if (!ORDINARY_NNC_POLARITIES.includes(polarity)) {
      blockReason = "pronominal-nnc-polarity-not-recognized";
    } else if (
      doubledFirstPlural
      && (
        sourceFrame.familyId !== "personal-compound"
        || subject !== "1pl"
      )
    ) {
      blockReason =
        "doubled-first-plural-person-is-limited-to-first-plural-personal-compound-nnc";
    } else if (
      sourceFrame.familyId === "indefinite-something"
      && subject !== "3common"
      && requestedSpecialHumanUse !== true
    ) {
      blockReason =
        "itlah-with-human-subject-requires-special-situation-selection";
    } else if (
      !selectedCoordinate
      && sourceFrame.familyId === "quantitive"
    ) {
      blockReason =
        "entered-stem-does-not-match-selected-pronominal-nnc-analysis";
    } else if (!selectedCoordinate) {
      blockReason =
        "pronominal-nnc-operation-coordinate-not-licensed-for-source";
    }
    const sourceSignature = getPronominalSourceSignature(sourceFrame);
    const frame = deepFreeze({
      kind: PRONOMINAL_NNC_OPERATION_KIND,
      version: 1,
      authorizationStatus: blockReason ? "blocked" : "authorized",
      blockReason,
      operationId: "pronominal-nnc:inflect-and-realize",
      sourceFrame,
      sourceSignature,
      subject,
      numberForm: selectedCoordinate?.numberForm || "",
      matrixForm: selectedCoordinate?.matrixForm || "",
      predicatePluralization:
        selectedCoordinate?.predicatePluralization
        || "",
      clausePosition,
      adjunctorInMode,
      doubledFirstPlural,
      specialHumanUse:
        selectedCoordinate?.specialHumanUseSelected === true,
      sentenceType,
      polarity,
      semanticPrerequisites: Object.freeze([
        "typed-pronominal-nounstem-source",
        "lexical-pronominal-family-authorization",
        "participant-and-context-selection",
      ]),
      requestedOutputKind: "canonical-pronominal-nnc-result",
      derivedCoordinateFactsReadOnly: true,
      typedOperationAuthority: true,
      callerSuppliedAuthorityAccepted: false,
      curriculumOrderAuthority: false,
      lessonMetadataAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    ownedPronominalOperationReceipts.set(frame, Object.freeze({
      sourceFrame,
      operationSignature: getPronominalOperationSignature(frame),
    }));
    if (frame.authorizationStatus === "authorized") {
      issuedPronominalOperationReceipts.set(frame, Object.freeze({
        sourceFrame,
        selectedCoordinate,
        operationSignature: getPronominalOperationSignature(frame),
      }));
    }
    return frame;
  }

  function buildClassicalNahuatlPronominalNncOperationFrame(
    sourceFrame = null,
    selections = {},
  ) {
    return buildPronominalNncOperationFrame(sourceFrame, selections);
  }

  function isClassicalNahuatlPronominalNncOperationFrame(frame = null) {
    const receipt = frame && typeof frame === "object"
      ? issuedPronominalOperationReceipts.get(frame)
      : null;
    return Boolean(
      receipt
      && frame.kind === PRONOMINAL_NNC_OPERATION_KIND
      && frame.version === 1
      && frame.authorizationStatus === "authorized"
      && frame.operationId === "pronominal-nnc:inflect-and-realize"
      && frame.typedOperationAuthority === true
      && frame.derivedCoordinateFactsReadOnly === true
      && frame.sourceFrame === receipt.sourceFrame
      && isClassicalNahuatlPronominalNncSourceFrame(frame.sourceFrame)
      && frame.sourceSignature
        === getPronominalSourceSignature(frame.sourceFrame)
      && receipt.operationSignature
        === getPronominalOperationSignature(frame)
      && receipt.selectedCoordinate
      && frame.callerSuppliedAuthorityAccepted === false
      && frame.lessonMetadataAuthority === false
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
      && Object.isFrozen(frame)
    );
  }

  function evaluateClassicalNahuatlPronominalNnc(
    sourceFrame = null,
    operationFrame = null,
  ) {
    const sourceAuthorized =
      isClassicalNahuatlPronominalNncSourceFrame(sourceFrame);
    const operationAuthorized =
      isClassicalNahuatlPronominalNncOperationFrame(operationFrame);
    const ownedOperationReceipt =
      operationFrame && typeof operationFrame === "object"
        ? ownedPronominalOperationReceipts.get(operationFrame)
        : null;
    const ownedBlockedOperation = Boolean(
      sourceAuthorized
      && ownedOperationReceipt
      && operationFrame.authorizationStatus === "blocked"
      && operationFrame.sourceFrame === sourceFrame
      && ownedOperationReceipt.sourceFrame === sourceFrame
      && ownedOperationReceipt.operationSignature
        === getPronominalOperationSignature(operationFrame)
      && operationFrame.blockReason
      && Object.isFrozen(operationFrame),
    );
    if (ownedBlockedOperation) {
      return buildBlockedFrame(
        PRONOMINAL_NNC_RESULT_KIND,
        operationFrame.blockReason,
        {
          sourceFrame,
          operationFrame: null,
          formulaRealization: "",
          surfaceRealization: "",
          wordSurface: "",
          sentenceSurface: "",
        },
      );
    }
    if (
      !sourceAuthorized
      || !operationAuthorized
      || operationFrame.sourceFrame !== sourceFrame
    ) {
      return buildBlockedFrame(
        PRONOMINAL_NNC_RESULT_KIND,
        !sourceAuthorized
          ? "issued-authorized-pronominal-nnc-source-required"
          : !operationAuthorized
            ? "issued-authorized-pronominal-nnc-operation-required"
            : "pronominal-nnc-source-operation-mismatch",
        {
          formulaRealization: "",
          surfaceRealization: "",
          wordSurface: "",
          sentenceSurface: "",
        },
      );
    }
    const requiredCapabilityNames = [
      "buildClassicalNahuatlQuantitiveAuthorityRecord",
      "buildClassicalNahuatlContextSelectionRecord",
      "buildClassicalNahuatlPronominalNncFrame",
      "renderClassicalNahuatlNncSlotFrameFormula",
      "buildClassicalNahuatlNncSentenceSurfaceFrame",
      "isClassicalNahuatlIssuedNncSentenceSurfaceFrame",
    ];
    const missingCapability = requiredCapabilityNames.find(
      (name) => typeof targetObject[name] !== "function",
    );
    if (missingCapability) {
      return buildBlockedFrame(
        PRONOMINAL_NNC_RESULT_KIND,
        `pronominal-nnc-required-capability-missing:${missingCapability}`,
        {
          sourceFrame,
          operationFrame,
          formulaRealization: "",
          surfaceRealization: "",
          wordSurface: "",
          sentenceSurface: "",
        },
      );
    }
    const sourceReceipt = issuedPronominalSourceReceipts.get(sourceFrame);
    const coreTypeOptions = { ...sourceReceipt.coreSourceOptions };
    [
      "embedStem",
      "matrixFamily",
      "matrixForm",
      "sourceStem",
    ].forEach((key) => {
      if (sourceFrame.familyId === "quantitive") delete coreTypeOptions[key];
    });
    let quantitiveAuthorityRecord = null;
    if (sourceFrame.familyId === "quantitive") {
      quantitiveAuthorityRecord =
        targetObject.buildClassicalNahuatlQuantitiveAuthorityRecord({
          subject: operationFrame.subject,
          sourceStem: sourceFrame.stem,
          embedStem: sourceFrame.embedStem,
          matrixFamily: sourceFrame.matrixFamily,
          matrixForm: operationFrame.matrixForm === "not-applicable"
            ? sourceFrame.matrixForm
            : operationFrame.matrixForm,
          predicatePluralization:
            operationFrame.predicatePluralization,
        });
      coreTypeOptions.quantitiveAuthorityRecord =
        quantitiveAuthorityRecord;
    }
    const coordinateOptions = {
      ...coreTypeOptions,
      subject: operationFrame.subject,
      enteredStem: sourceFrame.stem,
      requireEnteredStem: true,
      pluralConnector: operationFrame.numberForm,
      numberVariant: operationFrame.numberForm === "silent-silent"
        ? "silent"
        : "sounded",
      clauseInitial: operationFrame.clausePosition === "initial",
      polarity: operationFrame.polarity,
      adjunctorInMode: operationFrame.adjunctorInMode,
      dependentClauseIntroducedByInSelected:
        operationFrame.adjunctorInMode === "dependent-clause",
      doubledFirstPluralSelected:
        operationFrame.doubledFirstPlural,
      specialHumanUseSelected: operationFrame.specialHumanUse,
    };
    const contextSelectionRecord =
      targetObject.buildClassicalNahuatlContextSelectionRecord(
        coordinateOptions,
      );
    const coreFrame =
      targetObject.buildClassicalNahuatlPronominalNncFrame({
        ...coordinateOptions,
        contextSelectionRecord,
      });
    const typedSlotFrame = coreFrame?.nncSlotFrame || null;
    const formulaRealization =
      coreFrame?.authorizationStatus === "authorized"
        ? targetObject.renderClassicalNahuatlNncSlotFrameFormula(
          typedSlotFrame,
        )
        : "";
    const sentenceType =
      coreFrame?.discourseFrame?.interrogativeReadingActive === true
        ? "information-question"
        : operationFrame.sentenceType;
    const sentenceFrame = coreFrame?.authorizationStatus === "authorized"
      ? targetObject.buildClassicalNahuatlNncSentenceSurfaceFrame(
        typedSlotFrame,
        {
          sentenceType,
          polarity: operationFrame.polarity,
          predicateKind: "equative",
          discourseFrame: coreFrame.discourseFrame || null,
        },
      )
      : null;
    const sentenceAuthorized = Boolean(
      sentenceFrame
      && targetObject.isClassicalNahuatlIssuedNncSentenceSurfaceFrame(
        sentenceFrame,
      ),
    );
    const surfaceRealization = sentenceAuthorized
      ? sentenceFrame.canonicalNuclearSurface
      : "";
    const sentenceSurface = sentenceAuthorized
      ? sentenceFrame.sentenceSurface
      : "";
    let blockReason = "";
    if (coreFrame?.authorizationStatus !== "authorized") {
      blockReason = coreFrame?.blockReason
        || "pronominal-nnc-core-evaluation-blocked";
    } else if (!formulaRealization) {
      blockReason = "pronominal-nnc-formula-projection-required";
    } else if (!sentenceAuthorized || !surfaceRealization) {
      blockReason = sentenceFrame?.blockReason
        || "pronominal-nnc-written-projection-required";
    } else if (/[wk]/iu.test(surfaceRealization)) {
      blockReason = "pronominal-nnc-classical-written-projection-invalid";
    }
    const authorized = !blockReason;
    const frame = deepFreeze({
      kind: PRONOMINAL_NNC_RESULT_KIND,
      version: 1,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason,
      sourceFrame,
      operationFrame,
      formulaProjection: Object.freeze({
        kind: "classical-nahuatl-pronominal-nnc-formula-projection",
        formulaRealization: authorized ? formulaRealization : "",
        projectionSource: "typed-nnc-slot-frame",
        writtenSurfaceAuthority: false,
      }),
      writtenProjection: Object.freeze({
        kind: "classical-nahuatl-pronominal-nnc-written-projection",
        surfaceRealization: authorized ? surfaceRealization : "",
        projectionSource: "typed-nnc-boundary-realization",
        formulaStringAuthority: false,
      }),
      formulaRealization: authorized ? formulaRealization : "",
      surfaceRealization: authorized ? surfaceRealization : "",
      wordSurface: authorized ? surfaceRealization : "",
      sentenceSurface: authorized ? sentenceSurface : "",
      typedSlotFrame: authorized ? typedSlotFrame : null,
      sentenceFrame: authorized ? sentenceFrame : null,
      cooperationFrame: authorized
        ? coreFrame?.lesson11CooperationFrame || null
        : null,
      discourse: Object.freeze({
        clausePosition: operationFrame.clausePosition,
        polarity: operationFrame.polarity,
        inherentInterrogative:
          coreFrame?.discourseFrame?.inherentInterrogative === true,
        interrogativeReadingActive:
          coreFrame?.discourseFrame?.interrogativeReadingActive === true,
      }),
      numberRealization: Object.freeze({
        internalPluralMorph:
          typedSlotFrame?.internalPluralMorph || "none",
        internalPluralBelongsTo: "predicate-stem-derivation",
        subjectNumberBelongsTo: "subject-personal-pronoun",
        internalPluralIsSubjectNumberConnector: false,
      }),
      formulaAndWrittenDerivedIndependently: true,
      scalarEvaluatorIdentity:
        "evaluateClassicalNahuatlPronominalNnc",
      typedFrameAuthority: true,
      typedSourceAuthority: true,
      callerSuppliedAuthorityAccepted: false,
      curriculumOrderAuthority: false,
      lessonMetadataAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    issuedPronominalResultReceipts.set(frame, Object.freeze({
      sourceFrame,
      operationFrame,
      typedSlotFrame: frame.typedSlotFrame,
      sentenceFrame: frame.sentenceFrame,
      cooperationFrame: frame.cooperationFrame,
      formulaRealization: frame.formulaRealization,
      surfaceRealization: frame.surfaceRealization,
      sentenceSurface: frame.sentenceSurface,
    }));
    return frame;
  }

  function isClassicalNahuatlPronominalNncResult(frame = null) {
    const receipt = frame && typeof frame === "object"
      ? issuedPronominalResultReceipts.get(frame)
      : null;
    return Boolean(
      receipt
      && frame.kind === PRONOMINAL_NNC_RESULT_KIND
      && frame.version === 1
      && frame.authorizationStatus === "authorized"
      && frame.sourceFrame === receipt.sourceFrame
      && frame.operationFrame === receipt.operationFrame
      && isClassicalNahuatlPronominalNncSourceFrame(frame.sourceFrame)
      && isClassicalNahuatlPronominalNncOperationFrame(
        frame.operationFrame,
      )
      && frame.typedSlotFrame === receipt.typedSlotFrame
      && frame.sentenceFrame === receipt.sentenceFrame
      && frame.cooperationFrame === receipt.cooperationFrame
      && frame.formulaRealization === receipt.formulaRealization
      && frame.surfaceRealization === receipt.surfaceRealization
      && frame.sentenceSurface === receipt.sentenceSurface
      && frame.formulaProjection?.formulaRealization
        === receipt.formulaRealization
      && frame.writtenProjection?.surfaceRealization
        === receipt.surfaceRealization
      && frame.formulaAndWrittenDerivedIndependently === true
      && frame.scalarEvaluatorIdentity
        === "evaluateClassicalNahuatlPronominalNnc"
      && frame.callerSuppliedAuthorityAccepted === false
      && frame.lessonMetadataAuthority === false
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
      && Object.isFrozen(frame)
    );
  }

  function prepareClassicalNahuatlPronominalNncParadigmPlan(
    sourceFrame = null,
    request = {},
  ) {
    if (!isClassicalNahuatlPronominalNncSourceFrame(sourceFrame)) {
      return buildBlockedFrame(
        PRONOMINAL_NNC_PARADIGM_PLAN_KIND,
        "issued-authorized-pronominal-nnc-source-required",
        { coordinates: Object.freeze([]), coordinateCount: 0 },
      );
    }
    const forbiddenCarrier = findForbiddenAuthorityCarrier(request);
    if (forbiddenCarrier) {
      return buildBlockedFrame(
        PRONOMINAL_NNC_PARADIGM_PLAN_KIND,
        `pronominal-nnc-paradigm-forbidden-authority:${forbiddenCarrier}`,
        { coordinates: Object.freeze([]), coordinateCount: 0 },
      );
    }
    const requestKeys = Reflect.ownKeys(request)
      .filter((key) => typeof key === "string");
    const derivedRequestKey = requestKeys.find(
      (key) => PRONOMINAL_NNC_DERIVED_OPERATION_KEYS.has(key),
    ) || "";
    const unknownRequestKey = requestKeys.find(
      (key) => (
        !PRONOMINAL_NNC_PARADIGM_REQUEST_KEYS.has(key)
        && !PRONOMINAL_NNC_DERIVED_OPERATION_KEYS.has(key)
      ),
    ) || "";
    if (derivedRequestKey) {
      return buildBlockedFrame(
        PRONOMINAL_NNC_PARADIGM_PLAN_KIND,
        `pronominal-nnc-paradigm-derived-facts-are-engine-owned:${derivedRequestKey}`,
        { coordinates: Object.freeze([]), coordinateCount: 0 },
      );
    }
    if (unknownRequestKey) {
      return buildBlockedFrame(
        PRONOMINAL_NNC_PARADIGM_PLAN_KIND,
        `pronominal-nnc-paradigm-selection-not-recognized:${unknownRequestKey}`,
        { coordinates: Object.freeze([]), coordinateCount: 0 },
      );
    }
    const requestedSubjects = normalizeUniqueList(
      ownDataValue(request, "subjects", null),
      normalizeSubject,
      sourceFrame.allowedSubjects,
    );
    const rawSubjects = ownDataValue(request, "subjects", null);
    const sentenceType = normalizeChoice(
      ownDataValue(request, "sentenceType", "statement"),
    );
    const polarity = normalizeChoice(
      ownDataValue(request, "polarity", "positive"),
    );
    let blockReason = "";
    if (
      !requestedSubjects.length
      || requestedSubjects.some((subject) =>
        !sourceFrame.allowedSubjects.includes(subject))
      || Array.isArray(rawSubjects)
        && rawSubjects.length !== requestedSubjects.length
    ) {
      blockReason = "pronominal-nnc-paradigm-subject-inventory-invalid";
    } else if (!ORDINARY_NNC_SENTENCE_TYPES.includes(sentenceType)) {
      blockReason = "pronominal-nnc-sentence-type-not-recognized";
    } else if (!ORDINARY_NNC_POLARITIES.includes(polarity)) {
      blockReason = "pronominal-nnc-polarity-not-recognized";
    }
    const sourceReceipt = issuedPronominalSourceReceipts.get(sourceFrame);
    const seenCoordinateIds = new Set();
    const coordinates = [];
    if (!blockReason) {
      sourceReceipt.coreCoordinates.forEach((coordinate) => {
        if (!requestedSubjects.includes(coordinate.subject)) return;
        const operationFrame =
          buildPronominalNncOperationFrame(
            sourceFrame,
            {
              subject: coordinate.subject,
              clausePosition: coordinate.clausePosition,
              adjunctorInMode: coordinate.adjunctorInMode,
              doubledFirstPlural:
                coordinate.doubledFirstPluralSelected === true,
              specialHumanUse:
                coordinate.specialHumanUseSelected === true,
              sentenceType,
              polarity,
            },
            coordinate,
          );
        if (!isClassicalNahuatlPronominalNncOperationFrame(operationFrame)) {
          blockReason = operationFrame?.blockReason
            || "pronominal-nnc-paradigm-operation-not-authorized";
          return;
        }
        const scalarProbe = evaluateClassicalNahuatlPronominalNnc(
          sourceFrame,
          operationFrame,
        );
        if (!isClassicalNahuatlPronominalNncResult(scalarProbe)) return;
        const coordinateId = [
          operationFrame.subject,
          operationFrame.numberForm,
          operationFrame.matrixForm || "not-applicable",
          operationFrame.predicatePluralization || "not-applicable",
          operationFrame.clausePosition,
          operationFrame.adjunctorInMode,
          operationFrame.doubledFirstPlural ? "doubled" : "plain",
          operationFrame.specialHumanUse ? "special-human" : "ordinary",
        ].join(":");
        if (seenCoordinateIds.has(coordinateId)) return;
        seenCoordinateIds.add(coordinateId);
        coordinates.push(Object.freeze({
          coordinateId,
          coordinateIndex: coordinates.length,
          subject: operationFrame.subject,
          numberForm: operationFrame.numberForm,
          matrixForm: operationFrame.matrixForm,
          predicatePluralization:
            operationFrame.predicatePluralization,
          clausePosition: operationFrame.clausePosition,
          adjunctorInMode: operationFrame.adjunctorInMode,
          doubledFirstPlural: operationFrame.doubledFirstPlural,
          specialHumanUse: operationFrame.specialHumanUse,
          operationFrame,
        }));
      });
    }
    const authorized = !blockReason && coordinates.length > 0;
    const frame = deepFreeze({
      kind: PRONOMINAL_NNC_PARADIGM_PLAN_KIND,
      version: 1,
      authorizationStatus: authorized ? "authorized" : "blocked",
      blockReason,
      sourceFrame,
      sourceSignature: getPronominalSourceSignature(sourceFrame),
      subjects: requestedSubjects,
      sentenceType,
      polarity,
      coordinates: authorized ? coordinates : [],
      coordinateCount: authorized ? coordinates.length : 0,
      scalarEvaluatorIdentity:
        "evaluateClassicalNahuatlPronominalNnc",
      pointwiseScalarEvaluationRequired: true,
      typedFrameAuthority: true,
      typedSourceAuthority: true,
      callerSuppliedCoordinateAuthorityAccepted: false,
      callerSuppliedAuthorityAccepted: false,
      curriculumOrderAuthority: false,
      lessonMetadataAuthority: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    if (authorized) {
      issuedPronominalParadigmPlanReceipts.set(frame, Object.freeze({
        sourceFrame,
        coordinates: frame.coordinates,
        coordinateCount: frame.coordinateCount,
      }));
    }
    return frame;
  }

  function isClassicalNahuatlPronominalNncParadigmPlan(frame = null) {
    const receipt = frame && typeof frame === "object"
      ? issuedPronominalParadigmPlanReceipts.get(frame)
      : null;
    return Boolean(
      receipt
      && frame.kind === PRONOMINAL_NNC_PARADIGM_PLAN_KIND
      && frame.version === 1
      && frame.authorizationStatus === "authorized"
      && frame.sourceFrame === receipt.sourceFrame
      && isClassicalNahuatlPronominalNncSourceFrame(frame.sourceFrame)
      && frame.coordinates === receipt.coordinates
      && frame.coordinateCount === receipt.coordinateCount
      && frame.coordinateCount === frame.coordinates.length
      && frame.coordinates.every((coordinate, index) => (
        coordinate.coordinateIndex === index
        && isClassicalNahuatlPronominalNncOperationFrame(
          coordinate.operationFrame,
        )
        && coordinate.operationFrame.sourceFrame === frame.sourceFrame
      ))
      && frame.scalarEvaluatorIdentity
        === "evaluateClassicalNahuatlPronominalNnc"
      && frame.pointwiseScalarEvaluationRequired === true
      && frame.callerSuppliedCoordinateAuthorityAccepted === false
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
      && Object.isFrozen(frame)
    );
  }

  function projectClassicalNahuatlPronominalNncParadigmCoordinates(
    plan = null,
  ) {
    if (!isClassicalNahuatlPronominalNncParadigmPlan(plan)) return [];
    return Object.freeze(plan.coordinates.map((coordinate) => {
      const scalarFrame = evaluateClassicalNahuatlPronominalNnc(
        plan.sourceFrame,
        coordinate.operationFrame,
      );
      const scalarAuthorized =
        isClassicalNahuatlPronominalNncResult(scalarFrame);
      const frame = deepFreeze({
        kind: PRONOMINAL_NNC_PARADIGM_COORDINATE_KIND,
        version: 1,
        authorizationStatus: scalarAuthorized ? "authorized" : "blocked",
        blockReason: scalarAuthorized
          ? ""
          : scalarFrame?.blockReason
            || "pronominal-nnc-scalar-coordinate-blocked",
        coordinateId: coordinate.coordinateId,
        coordinateIndex: coordinate.coordinateIndex,
        subject: coordinate.subject,
        numberForm: coordinate.numberForm,
        matrixForm: coordinate.matrixForm,
        predicatePluralization: coordinate.predicatePluralization,
        clausePosition: coordinate.clausePosition,
        adjunctorInMode: coordinate.adjunctorInMode,
        doubledFirstPlural: coordinate.doubledFirstPlural,
        specialHumanUse: coordinate.specialHumanUse,
        operationFrame: coordinate.operationFrame,
        scalarFrame,
        formulaRealization: scalarFrame?.formulaRealization || "",
        surfaceRealization: scalarFrame?.surfaceRealization || "",
        wordSurface: scalarFrame?.wordSurface || "",
        sentenceSurface: scalarFrame?.sentenceSurface || "",
        scalarEvaluatorIdentity:
          "evaluateClassicalNahuatlPronominalNnc",
        scalarEquivalent: scalarAuthorized,
        pointwiseEquivalent: scalarAuthorized,
        typedFrameAuthority: true,
        callerSuppliedCoordinateAuthorityAccepted: false,
        callerSuppliedAuthorityAccepted: false,
        curriculumOrderAuthority: false,
        lessonMetadataAuthority: false,
        formulaStringAuthority: false,
        surfaceStringAuthority: false,
      });
      issuedPronominalCoordinateReceipts.set(frame, Object.freeze({
        plan,
        operationFrame: frame.operationFrame,
        scalarFrame: frame.scalarFrame,
        formulaRealization: frame.formulaRealization,
        surfaceRealization: frame.surfaceRealization,
        sentenceSurface: frame.sentenceSurface,
      }));
      return frame;
    }));
  }

  function isClassicalNahuatlPronominalNncParadigmCoordinate(
    frame = null,
  ) {
    const receipt = frame && typeof frame === "object"
      ? issuedPronominalCoordinateReceipts.get(frame)
      : null;
    return Boolean(
      receipt
      && frame.kind === PRONOMINAL_NNC_PARADIGM_COORDINATE_KIND
      && frame.version === 1
      && frame.authorizationStatus === "authorized"
      && isClassicalNahuatlPronominalNncOperationFrame(
        frame.operationFrame,
      )
      && isClassicalNahuatlPronominalNncResult(frame.scalarFrame)
      && frame.operationFrame === receipt.operationFrame
      && frame.scalarFrame === receipt.scalarFrame
      && frame.formulaRealization === receipt.formulaRealization
      && frame.surfaceRealization === receipt.surfaceRealization
      && frame.sentenceSurface === receipt.sentenceSurface
      && frame.formulaRealization
        === frame.scalarFrame.formulaRealization
      && frame.surfaceRealization
        === frame.scalarFrame.surfaceRealization
      && frame.sentenceSurface === frame.scalarFrame.sentenceSurface
      && frame.scalarEvaluatorIdentity
        === "evaluateClassicalNahuatlPronominalNnc"
      && frame.scalarEquivalent === true
      && frame.pointwiseEquivalent === true
      && frame.callerSuppliedCoordinateAuthorityAccepted === false
      && frame.formulaStringAuthority === false
      && frame.surfaceStringAuthority === false
      && Object.isFrozen(frame)
    );
  }

  return Object.freeze({
    getClassicalNahuatlOpenNncSourceClassInventory,
    buildClassicalNahuatlOrdinaryNncSourceFrame,
    isClassicalNahuatlOrdinaryNncSourceFrame,
    buildClassicalNahuatlNncOperationSelectionFrame,
    buildClassicalNahuatlOrdinaryNncOperationFrame,
    isClassicalNahuatlOrdinaryNncOperationFrame,
    evaluateClassicalNahuatlOrdinaryNnc,
    isClassicalNahuatlOrdinaryNncResult,
    prepareClassicalNahuatlOrdinaryNncParadigmPlan,
    isClassicalNahuatlOrdinaryNncParadigmPlan,
    projectClassicalNahuatlOrdinaryNncParadigmCoordinates,
    isClassicalNahuatlOrdinaryNncParadigmCoordinate,
    buildClassicalNahuatlPronominalNncSourceFrame,
    isClassicalNahuatlPronominalNncSourceFrame,
    buildClassicalNahuatlPronominalNncOperationFrame,
    isClassicalNahuatlPronominalNncOperationFrame,
    evaluateClassicalNahuatlPronominalNnc,
    isClassicalNahuatlPronominalNncResult,
    prepareClassicalNahuatlPronominalNncParadigmPlan,
    isClassicalNahuatlPronominalNncParadigmPlan,
    projectClassicalNahuatlPronominalNncParadigmCoordinates,
    isClassicalNahuatlPronominalNncParadigmCoordinate,
  });
}

export function installClassicalNahuatlNncApplicationGlobals(
  targetObject = globalThis,
  installationContext = {},
) {
  const applicationTarget = Object.create(targetObject);
  Object.defineProperties(
    applicationTarget,
    Object.getOwnPropertyDescriptors(
      installationContext?.moduleDependencyCapabilities || {},
    ),
  );
  const api = createClassicalNahuatlNncApplicationModule(applicationTarget);
  Object.defineProperties(targetObject, Object.getOwnPropertyDescriptors(api));
  return api;
}
