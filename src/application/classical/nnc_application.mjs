import {createAttestedNncCellApi, createAttestedPlaceApi, createAttestedPrincipalCollocationApi} from './attested_source_cells.mjs';
import { analyzeQuantitiveInternalReduplication, deriveQuantitiveInternalReduplication } from '../../core/classical/quantitive_internal_reduplication.mjs';
import {createClassicalQuantitativePredicateApi} from './quantitative_predicate.mjs?v=20261009-reader-42-6-224';
import {
  buildClassicalNahuatlParticipantFrame,
} from "../../core/classical/participant_frame.mjs?v=20260823-passive-formation-continuity-238";

// Canonical ordinary-NNC application service.
//
// This service owns the typed Source -> Grammar operation -> canonical Result
// boundary for ordinary nominal nuclear clauses.  Curriculum labels, formulas,
// surfaces, examples, and UI/restored state are never accepted as authority.

const ORDINARY_NNC_SOURCE_KIND =
  "classical-nahuatl-ordinary-nnc-source-frame";
// §30.3 attests the restricted nominal assertion and its general-use embed,
// independently of an unprovided possessive/plural subclass.
const ORDINARY_NNC_ATTESTED_STEM_USES = Object.freeze({
  // §53.1.1 documents this contextual embed, not a possessive subclass.
  "coyō": Object.freeze({nounClass: "tl", generalUseStem: "coyō",
    predicateEmbedUse: Object.freeze({
      kind: "classical-nahuatl-attested-nominal-predicate-embed-use",
      sourceStem: "coyō", useStem: "coyō",
      constructionKind: "nominal-embed-vnc", relation: "adverb",
      orientation: "subject", adverbRole: "compared-manner", matrixStem: "neh-nemi",
      embedReduplication: "similarity", similarityReduplicationShape: "short-cv",
      sourceSection: "53.1.1", fullGeneralUseParadigmClaimed: false,
    })}),
  "xōchi": Object.freeze({nounClass: "tl", generalUseStem: "xōchi"}),
  // §30.15.2 supplies this citation/use pair before mati. It does not
  // supply a possessed subclass or an ordinary general-use paradigm.
  "tētz-ā-hui": Object.freeze({nounClass: "tl", generalUseStem: "tētz-ā-uh",
    predicateEmbedUse: Object.freeze({
      kind: "classical-nahuatl-attested-nominal-predicate-embed-use",
      sourceStem: "tētz-ā-hui", useStem: "tētz-ā-uh",
      constructionKind: "nominal-embed-vnc", relation: "complement",
      orientation: "object", complementKind: "considering", matrixStem: "mati",
      sourceSection: "30.15.2", fullGeneralUseParadigmClaimed: false,
    })}),
});
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
const NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND =
  "classical-nahuatl-nnc-restricted-use-citation-projection";
const PRONOMINAL_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND =
  "classical-nahuatl-pronominal-nnc-restricted-use-citation-projection";

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
  "3common",
  "1pl",
  "2pl",
  "3pl",
  "reciprocal",
  "nonspecific-human",
  "nonspecific-nonhuman",
]);
const ORDINARY_NNC_SENTENCE_TYPES = Object.freeze([
  "statement",
  "exclamation",
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
    "",
    "tl-1-a",
    "tl-1-b",
    "tl-2-a",
    "tl-2-b",
    "tl-2-c",
  ]),
  tli: Object.freeze(["", "tli-1", "tli-2"]),
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
  // Andrews14.2/14.4: restricted-use singular needs the broad class only.
  // §14.5 also licenses plain absolute plural on the restricted-use base;
  // selecting its learned connector does not select a §14.7 possessive subtype.
  // This partial analysis supplies no general-use shape or possessive subtype.
  tl: Object.freeze({
    nounClass: "tl", useShape: "base", subclass: "",
    ephemeralFinalVowel: "", truncationRepair: "none", restrictedUseOnly: true,
  }),
  tli: Object.freeze({
    nounClass: "tli", useShape: "base", subclass: "",
    ephemeralFinalVowel: "", truncationRepair: "none", restrictedUseOnly: true,
  }),
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
  "tl-2-a-to-1-a": Object.freeze({
    nounClass: "tl", useShape: "truncated", subclass: "tl-2-a",
    ephemeralFinalVowel: "i", truncationRepair: "none",
    automaticPredicateOptionId: "tl-2a-to-1a",
    classPattern: defineOpenNncSourceClassPattern({
      absolutiveSingularCommon:
        "ephemeral-i-loss stem reclassified as tl 1-A + tl",
      absolutivePlural: TL_ABSOLUTIVE_PLURAL_PATTERN,
      possessiveSingularCommon:
        "ephemeral-i-loss stem reclassified as tl 1-A + uh",
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
  "borrowed-name": Object.freeze({
    nounClass: "zero", useShape: "base", subclass: "",
    ephemeralFinalVowel: "", truncationRepair: "none",
    referentialAnimacy: "animate",
    boundaryFacts: Object.freeze({ borrowedOrthographyRetained: true }),
    classPattern: defineOpenNncSourceClassPattern({
      absolutiveSingularCommon: "retained borrowed name + 0",
      absolutivePlural: OTHER_ABSOLUTIVE_PLURAL_PATTERN,
      possessiveSingularCommon: "general-use stem + 0",
    }),
  }),
  "borrowed-human-plural": Object.freeze({
    nounClass: "zero", useShape: "base", subclass: "",
    ephemeralFinalVowel: "", truncationRepair: "none",
    referentialAnimacy: "animate",
    boundaryFacts: Object.freeze({
      borrowedOrthographyRetained: true,
      borrowedPluralSilentNumberAuthorized: true,
    }),
    classPattern: defineOpenNncSourceClassPattern({
      absolutiveSingularCommon: "retained borrowed stem + 0",
      absolutivePlural: "retained borrowed plural stem + irregular silent number or native m-eh",
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
  "silent",
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
  stemFormationOptions = ["plain", "affinity", "distributive-varietal"],
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

// Andrews 40.2 names these exceptional lexical profiles. The profiles select
// productive pronoun, number and downgrading operations, never target words.
const ADJECTIVAL_SOURCE_PROFILES = Object.freeze({
  "huē-i": Object.freeze({kind: "pronominal-like", includesPossessor: false,
    internalPluralMorph: "n", silentPluralAuthorized: true, sourceSection: "40.2.1"}),
  "cē-l": Object.freeze({kind: "possessor-included", includesPossessor: true,
    includedPossessorOptions: Object.freeze(["1sg", "2sg", "3common", "1pl", "2pl", "3pl"]),
    fixedOuterState: "absolutive", outerSubjectOptions: Object.freeze(["3sg", "3common", "3pl"]),
    silentPluralAuthorized: false, sourceSection: "40.2.3"}),
  el: Object.freeze({kind: "possessor-included", includesPossessor: true,
    includedPossessorOptions: Object.freeze(["1sg", "2sg", "3common", "1pl", "2pl", "3pl"]),
    fixedOuterState: "absolutive", outerSubjectOptions: Object.freeze(["3sg", "3common", "3pl"]),
    silentPluralAuthorized: true, sourceSection: "40.2.3"}),
});
const INCLUDED_ADJECTIVAL_LEXEME = defineOrdinaryNncLexeme({nounClass: "zero",
  stemFormationOptions: ["plain"], pluralConnectorOptions: ["t-in"],
  lexicalFormation: "possessor-included-adjectival-nounstem"});

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
  // Andrews §47, PDF p.501: inherited Spanish plural, optionally Españolesmeh.
  // The irregular silent number and writing are source facts, not a stored Result.
  "Españoles": defineOrdinaryNncLexeme({
    nounClass: "zero", referentialAnimacy: "animate",
    pluralConnectorOptions: ["silent", "m-eh"],
    boundaryFacts: {
      borrowedOrthographyRetained: true,
      borrowedPluralSilentNumberAuthorized: true,
    },
  }),
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
    // §31.4 dependent entity/appendage; the child sense remains animate.
    referentialAnimacy: "any",
    // Andrews 32.6 explicitly permits absolutive affinity pīpiltin.
    naturalPossessionPolicy: "ordinary",
    naturalPossessionSemantics: "ordinary",
    stemFormationOptions: ["plain", "affinity", "distributive-varietal"],
    pluralConnectorOptions: ["t-in"],
    subclass: "tli-1",
  }),
  "tōtō": defineOrdinaryNncLexeme({
    nounClass: "tl",
    referentialAnimacy: "animate",
    subclass: "tl-1-a",
    pluralConnectorOptions: ["m-eh"],
    boundaryFacts: {
      absolutivePluralStemFormationOptions: ["plain"],
    },
  }),
  huez: defineOrdinaryNncLexeme({
    nounClass: "tli",
    referentialAnimacy: "animate",
    naturalPossessionPolicy: "naturally-possessed",
    naturalPossessionSemantics: "kinship-or-human-relation",
    subclass: "tli-2",
  }),
  tah: defineOrdinaryNncLexeme({
    nounClass: "tli",
    referentialAnimacy: "animate",
    subclass: "tli-1",
  }),
  "ic-cāuh": defineOrdinaryNncLexeme({
    nounClass: "tli",
    referentialAnimacy: "animate",
    subclass: "tli-1",
  }),
  "āch-cāuh": defineOrdinaryNncLexeme({
    nounClass: "tli",
    referentialAnimacy: "animate",
    subclass: "tli-1",
    boundaryFacts: {
      nonspecificHumanPossessorCarrier: "tē",
      nonspecificHumanForms: Object.freeze(["tē", "ti", "t"]),
    },
  }),
  chān: defineOrdinaryNncLexeme({
    nounClass: "tli",
    referentialAnimacy: "nonanimate",
    naturalPossessionPolicy: "naturally-possessed",
    naturalPossessionSemantics: "property",
    subclass: "tli-1",
  }),
  āxcāi: defineOrdinaryNncLexeme({
    nounClass: "tl",
    referentialAnimacy: "nonanimate",
    naturalPossessionPolicy: "naturally-possessed",
    naturalPossessionSemantics: "property",
    useShape: "truncated",
    subclass: "tl-2-a",
    ephemeralFinalVowel: "i",
    boundaryFacts: {
      diplomaticCanvasWitness: "āxcaī",
      normalizedRestrictedUseStem: "āxcāi",
    },
  }),
  nān: defineOrdinaryNncLexeme({
    nounClass: "tli",
    referentialAnimacy: "animate",
    naturalPossessionPolicy: "naturally-possessed",
    naturalPossessionSemantics: "kinship-or-human-relation",
    subclass: "tli-1",
  }),
  yāō: defineOrdinaryNncLexeme({
    nounClass: "tl",
    referentialAnimacy: "animate",
    naturalPossessionPolicy: "naturally-possessed",
    naturalPossessionSemantics: "kinship-or-human-relation",
    subclass: "tl-1-a",
  }),
  poh: defineOrdinaryNncLexeme({
    nounClass: "tli",
    referentialAnimacy: "animate",
    naturalPossessionPolicy: "naturally-possessed",
    naturalPossessionSemantics: "kinship-or-human-relation",
    subclass: "tli-1",
  }),
  yaca: defineOrdinaryNncLexeme({
    nounClass: "tl",
    referentialAnimacy: "nonanimate",
    naturalPossessionPolicy: "naturally-possessed",
    naturalPossessionSemantics: "body-part",
    useShape: "truncated",
    subclass: "tl-2-b",
    ephemeralFinalVowel: "a",
  }),
  māi: defineOrdinaryNncLexeme({
    nounClass: "tl",
    referentialAnimacy: "nonanimate",
    naturalPossessionPolicy: "naturally-possessed",
    naturalPossessionSemantics: "body-part",
    stemFormationOptions: [
      "plain",
      "affinity",
      "distributive-varietal",
    ],
    useShape: "truncated",
    subclass: "tl-2-a",
    ephemeralFinalVowel: "i",
  }),
  mix: defineOrdinaryNncLexeme({
    nounClass: "tli",
    referentialAnimacy: "nonanimate",
    naturalPossessionPolicy: "never-possessive",
    naturalPossessionSemantics: "never-possessive",
    subclass: "tli-1",
  }),
  "quiy-a-hui": defineOrdinaryNncLexeme({
    nounClass: "tl",
    referentialAnimacy: "nonanimate",
    naturalPossessionPolicy: "never-possessive",
    naturalPossessionSemantics: "never-possessive",
    useShape: "truncated",
    subclass: "tl-2-b",
    ephemeralFinalVowel: "i",
  }),
  tōnatiuh: defineOrdinaryNncLexeme({
    nounClass: "zero",
    referentialAnimacy: "any",
    naturalPossessionPolicy: "never-possessive",
    naturalPossessionSemantics: "never-possessive",
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
  new Set(["stem", "embedStem", "matrixStem", "nounClass", "sourceClass", "supportiveInitialI", "sourceUse"]),
);
const ORDINARY_NNC_OPERATION_SELECTION_KEYS = Object.freeze(new Set([
  "state",
  "subject",
  "humanness",
  "metaphoricalUse",
  "possessor",
  "includedPossessor",
  "stemFormation",
  "predicateFormation",
  "possessorReduplication",
  "pluralConnector",
  "singularConnector",
  "nonspecificHumanForm",
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
  "humanness",
  "metaphoricalUse",
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
  "humanness",
  "metaphoricalUse",
  "possessor",
  "includedPossessor",
  "stemFormation",
  "compoundMatrix",
  "predicateFormation",
  "possessorReduplication",
  "pluralConnector",
  "singularConnector",
  "nonspecificHumanForm",
  "clausePosition",
  "adjunctorInMode",
  "numberForm",
  "predicatePluralization",
  "doubledFirstPlural",
  "specialHumanUse",
  "sentenceType",
  "polarity",
]));
function definePronominalNncLexeme(
  familyId,
  {
    embedStem = "",
    matrixStem = "",
    matrixFamily = "",
    matrixForm = "",
    sourceStructure = "whole-stem",
    quantitiveReferenceScope = "",
  } = {},
) {
  return Object.freeze({
    familyId,
    embedStem,
    matrixStem,
    matrixFamily,
    matrixForm,
    sourceStructure,
    quantitiveReferenceScope,
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
  // §16.7 and §16.9 explicitly permit mia/mie spelling without the y.
  // Each entered spelling remains a typed Source; the number and matrix
  // allomorph still come from the existing quantity owner.
  ...Object.fromEntries(["miya", "mia", "miye", "mie"].flatMap(embedStem =>
    ["qui", "c"].map(matrixStem => [
      `${embedStem}-${matrixStem}`,
      definePronominalNncLexeme("quantitive", {
        embedStem, matrixStem, matrixFamily: "qui", matrixForm: matrixStem,
        sourceStructure: "embed-matrix",
      }),
    ]))),
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
    quantitiveReferenceScope: "all",
  }),
  "mo-ch": definePronominalNncLexeme("quantitive", {
    embedStem: "mo",
    matrixStem: "ch",
    matrixFamily: "chi",
    matrixForm: "ch",
    sourceStructure: "embed-matrix",
    quantitiveReferenceScope: "all",
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
  "stemFormation",
  "compoundMatrix",
  "subject",
  "humanness",
  "clausePosition",
  "adjunctorInMode",
  "numberForm",
  "predicatePluralization",
  "doubledFirstPlural",
  "specialHumanUse",
  "sentenceType",
  "polarity",
]));
const PRONOMINAL_NNC_DERIVED_OPERATION_KEYS = Object.freeze(new Set([
  "matrixForm",
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
  const issuedResultByTypedSlotFrame = new WeakMap();
  const issuedParadigmPlanReceipts = new WeakMap();
  const issuedCoordinateReceipts = new WeakMap();
  const issuedPronominalSourceReceipts = new WeakMap();
  const pronominalCompoundSources = new WeakMap();
  const pronominalCompoundProvenance = new WeakMap();
  const issuedPronominalOperationReceipts = new WeakMap();
  const ownedPronominalOperationReceipts = new WeakMap();
  const issuedPronominalResultReceipts = new WeakMap();
  const issuedPronominalParadigmPlanReceipts = new WeakMap();
  const issuedPronominalCoordinateReceipts = new WeakMap();
  const continuationSourceProjections = new WeakMap();
  const restrictedUseCitationProjections = new WeakMap();
  const issuedRestrictedUseCitationProjectionReceipts = new WeakMap();
  const pronominalRestrictedUseCitationProjections = new WeakMap();
  const issuedPronominalRestrictedUseCitationProjectionReceipts = new WeakMap();

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
      sourceUse: frame?.sourceUse || "nounstem",
      generalUseOnly: frame?.generalUseOnly === true,
      restrictedCitationClaimed: frame?.restrictedCitationClaimed !== false,
      classClaimed: frame?.classClaimed !== false,
      selectedUseScope: frame?.selectedUseScope || "",
      supportiveInitialI: frame?.supportiveInitialI === true,
      embedStem: frame?.embedStem || "",
      matrixStem: frame?.matrixStem || "",
      lexicalEntryId: frame?.lexicalEntryId || "",
      lexicalSelectionAuthority: frame?.lexicalSelectionAuthority || "",
      openStemSource: frame?.openStemSource === true,
      sourceClass: frame?.sourceClass || "",
      restrictedUseOnly: frame?.restrictedUseOnly === true,
      attestedGeneralUseStem: frame?.attestedGeneralUseStem || "",
      generalUseShapeClaimed: frame?.generalUseShapeClaimed !== false,
      possessiveSubclassClaimed: frame?.possessiveSubclassClaimed !== false,
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
      adjectivalProfile: frame?.adjectivalProfile || null,
    });
  }

  function buildClassFreeSelectedUseSource(source = {}) {
    const stem = normalizeStem(ownDataValue(source, "stem", ""));
    const extraKey = Reflect.ownKeys(source).find(key => typeof key !== "string"
      || !ORDINARY_NNC_SOURCE_INPUT_KEYS.has(key));
    if (!stem || /[()#>+=□]/u.test(stem) || extraKey
      || normalizeChoice(ownDataValue(source, "sourceUse", "")) !== "general-use"
      || normalizeText(ownDataValue(source, "sourceClass", ""))
      || normalizeText(ownDataValue(source, "nounClass", ""))
      || normalizeText(ownDataValue(source, "embedStem", ""))
      || normalizeText(ownDataValue(source, "matrixStem", ""))
      || ownDataValue(source, "supportiveInitialI", false) !== false) {
      return buildBlockedFrame(ORDINARY_NNC_SOURCE_KIND,
        "ordinary-nnc-class-free-selected-general-use-operand-required");
    }
    // This privately recorded operand declares no nominal citation class.
    // The explicit common/silent possessive cell is supplied by Build.
    const frame = deepFreeze({
      kind: ORDINARY_NNC_SOURCE_KIND, version: 1,
      authorizationStatus: "authorized", blockReason: "", stem,
      sourceUse: "general-use", generalUseOnly: true, classClaimed: false,
      selectedUseScope: "possessive-common-silent", restrictedCitationClaimed: false,
      supportiveInitialI: false, embedStem: "", matrixStem: "",
      lexicalEntryId: "", lexicalSelectionAuthority: "declared-general-use-operand",
      lexicalSelectionAuthorized: false, openStemSource: false,
      sourceClass: "", nounClass: "", subclass: "", sourceClassAnalysis: null,
      restrictedUseOnly: false, generalUseShapeClaimed: true,
      possessiveSubclassClaimed: false, sourceClassShapeFrame: null,
      referentialAnimacy: "nonanimate", naturalPossessionPolicy: "ordinary",
      naturalPossessionSemantics: "ordinary", stateAvailability: "both",
      adjectivalProfile: null, allowedStateValues: ["possessive"],
      allowedSubjects: ["3common"], possessorCompatibility: "ordinary",
      classMembershipOptions: [], stemFormationOptions: ["plain"],
      pluralConnectorOptions: [], possessorReduplicationOptions: [false],
      useShape: "base", ephemeralFinalVowel: "", truncationRepair: "none",
      compoundSource: false, lexicalFormation: "declared-general-use-operand",
      sourceConstituents: [], sourceConstituentKinds: ["general-use-nounstem"],
      boundaryFacts: {}, lexicalFactsReadOnly: true, lexicalFormationIsUserChoice: false,
      boundaryFactsReadOnly: true, typedSourceAuthority: true,
      callerSuppliedAuthorityAccepted: false, curriculumOrderAuthority: false,
      lessonMetadataAuthority: false, formulaStringAuthority: false,
      surfaceStringAuthority: false, documentaryExampleAuthority: false,
    });
    issuedSourceReceipts.set(frame, Object.freeze({
      sourceSignature: getSourceSignature(frame),
      selectedUseReceipt: Object.freeze({kind: "class-free-selected-general-use-receipt",
        stem, sourceUse: "general-use", scope: frame.selectedUseScope}),
    }));
    return frame;
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
    const sourceUse = normalizeChoice(ownDataValue(source, "sourceUse", "nounstem"));
    if (sourceUse === "general-use" && !normalizeText(ownDataValue(source, "sourceClass", ""))) {
      return buildClassFreeSelectedUseSource(source);
    }
    const generalUseOnly = sourceUse === "general-use";
    // An entered general-use operand supplies no restricted citation or fine
    // possessive subclass. Its selected cell remains owned by this service.
    let lexicalEntry = generalUseOnly ? null : ORDINARY_NNC_LEXICON[stem] || null;
    const requestedSupportiveInitialI = ownDataValue(source, "supportiveInitialI", false);
    const supportiveInitialI = requestedSupportiveInitialI === true;
    const requestedSourceClass = normalizeChoice(
      ownDataValue(source, "sourceClass", ""),
    ).toLowerCase();
    const adjectivalProfile = requestedSourceClass === "zero"
      ? ADJECTIVAL_SOURCE_PROFILES[stem] || null : null;
    if (adjectivalProfile?.includesPossessor) lexicalEntry = INCLUDED_ADJECTIVAL_LEXEME;
    const openSourceClassAnalysis = getOpenNncSourceClassAnalysis(
      requestedSourceClass,
    );
    const canonicalSourceClass = getCanonicalNncSourceClass(
      lexicalEntry,
    );
    const requestedCanonicalReclassification = Boolean(
      lexicalEntry
      && canonicalSourceClass === "tl-2-a"
      && requestedSourceClass === "tl-2-a-to-1-a"
    );
    const requestedOpenNounClass = normalizeNounClass(
      openSourceClassAnalysis?.nounClass || "",
    );
    const openStemSource = Boolean(!lexicalEntry && requestedOpenNounClass);
    const sourceClass = lexicalEntry
      ? requestedCanonicalReclassification
        ? requestedSourceClass
        : canonicalSourceClass
      : requestedSourceClass;
    const sourceClassAnalysis = getOpenNncSourceClassAnalysis(sourceClass);
    const restrictedUseOnly = !generalUseOnly && openStemSource && sourceClassAnalysis?.restrictedUseOnly === true;
    const lexicalEntryId = lexicalEntry
      ? `ordinary-nounstem:${stem}`
      : openStemSource
        ? `open-nounstem:${stem}:${sourceClass || requestedOpenNounClass}`
        : "";
    const nounClass = lexicalEntry?.nounClass || requestedOpenNounClass;
    const referentialAnimacy =
      lexicalEntry?.referentialAnimacy || (openStemSource
        ? openSourceClassAnalysis?.referentialAnimacy || "any" : "");
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
    const stemFormationOptions = generalUseOnly ? Object.freeze(["plain"]) :
      lexicalEntry?.stemFormationOptions
      // Andrews 14.5.2a/18.11 licenses affinity in the coarse TL absolute
      // cell too. The restricted operation guard still excludes possession
      // and any unestablished general-use or distributive paradigm.
      || Object.freeze(openStemSource ? restrictedUseOnly ? (["tl", "tli"].includes(sourceClass) ? ["plain", "affinity"] : ["plain"]) : ["plain", "affinity", "distributive-varietal"] : []);
    const lexicalPluralConnectorOptions =
      lexicalEntry?.pluralConnectorOptions || Object.freeze(
        openSourceClassAnalysis?.boundaryFacts?.borrowedPluralSilentNumberAuthorized
          ? ["silent", "m-eh"] : []);
    const pluralConnectorOptions = generalUseOnly ? Object.freeze([]) : restrictedUseOnly
      ? Object.freeze(sourceClass === "tl" ? ["m-eh", "0-h"]
        : sourceClass === "tli" ? ["t-in", "m-eh"] : []) : adjectivalProfile
      ? Object.freeze(adjectivalProfile.silentPluralAuthorized ? ["t-in", "silent"] : ["t-in"])
      : lexicalPluralConnectorOptions.length
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
    const openSourceShapeFrame = !generalUseOnly && openSourceClassAnalysis
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
    const boundaryFacts = Object.freeze({
      ...(lexicalEntry?.boundaryFacts || openSourceClassAnalysis?.boundaryFacts || {}),
      // Andrews 14.7.1.b.ii: a lexical alternative, not a productive rule.
      tliSubclass2SilentNum1Authorized: ["ich", "ītz", "oquich"].includes(stem)
        && sourceClass === "tli-2",
    });
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
    } else if (!["nounstem", "general-use"].includes(sourceUse)) {
      blockReason = "ordinary-nnc-source-use-not-recognized";
    } else if (generalUseOnly && (requestedSourceClass !== "tl"
      || embedStem || matrixStem || supportiveInitialI)) {
      blockReason = "ordinary-nnc-selected-general-use-coarse-tl-operand-required";
    } else if (stem === "cē-l" && !requestedSourceClass) {
      blockReason = "lexical-noun-class-selection-required";
    } else if (forbiddenSourceKey) {
      blockReason =
        `ordinary-nnc-source-lexical-facts-are-engine-owned:${forbiddenSourceKey}`;
    } else if (typeof requestedSupportiveInitialI !== "boolean"
      || (supportiveInitialI && (!/^[iī]/u.test(stem) || stem.length < 2))) {
      blockReason = "ordinary-nnc-supportive-initial-i-requires-initial-i";
    } else if (requestedSourceClass && !openSourceClassAnalysis) {
      blockReason = "open-nounstem-source-class-analysis-not-recognized";
    } else if (
      lexicalEntry
      && requestedSourceClass
      && requestedSourceClass !== canonicalSourceClass
      && !requestedCanonicalReclassification
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
      supportiveInitialI,
      embedStem,
      matrixStem,
      lexicalEntryId,
      lexicalSelectionAuthority,
      openStemSource,
      sourceClass,
      sourceClassAnalysis: generalUseOnly ? Object.freeze({
        nounClass, subclass: "", sourceUse: "general-use",
        restrictedCitationClaimed: false, selectedCellOnly: true,
      }) : sourceClassAnalysis,
      restrictedUseOnly,
      ...(generalUseOnly ? {sourceUse, generalUseOnly: true, restrictedCitationClaimed: false} : {}),
      ...(ORDINARY_NNC_ATTESTED_STEM_USES[stem]?.nounClass === nounClass
        ? {attestedGeneralUseStem: ORDINARY_NNC_ATTESTED_STEM_USES[stem].generalUseStem,
          ...(ORDINARY_NNC_ATTESTED_STEM_USES[stem].predicateEmbedUse
            ? {attestedPredicateEmbedUse: ORDINARY_NNC_ATTESTED_STEM_USES[stem].predicateEmbedUse} : {})} : {}),
      generalUseShapeClaimed: !restrictedUseOnly,
      possessiveSubclassClaimed: !restrictedUseOnly && !generalUseOnly,
      sourceClassShapeFrame: openSourceShapeFrame,
      nounClass,
      referentialAnimacy,
      naturalPossessionPolicy,
      naturalPossessionSemantics,
      stateAvailability,
      adjectivalProfile,
      allowedStateValues: generalUseOnly ? Object.freeze(["possessive"])
        : restrictedUseOnly ? Object.freeze(["absolutive"]) : adjectivalProfile?.fixedOuterState
        ? Object.freeze([adjectivalProfile.fixedOuterState])
        : getAllowedStateValues(naturalPossessionPolicy),
      allowedSubjects: Object.freeze(
        adjectivalProfile?.outerSubjectOptions || (referentialAnimacy === "nonanimate"
          ? ["3common"]
          : referentialAnimacy === "animate"
            ? ORDINARY_NNC_SUBJECTS.filter(
              (subject) => subject !== "3common",
            )
            : [...ORDINARY_NNC_SUBJECTS]).filter(
          (subject) => !(restrictedUseOnly && !pluralConnectorOptions.length
            && subject.endsWith("pl")),
        ),
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
    if (receipt?.selectedUseReceipt) return Boolean(
      frame.kind === ORDINARY_NNC_SOURCE_KIND && frame.version === 1
      && frame.authorizationStatus === "authorized" && frame.typedSourceAuthority === true
      && frame.generalUseOnly === true && frame.sourceUse === "general-use"
      && frame.classClaimed === false && frame.restrictedCitationClaimed === false
      && frame.nounClass === "" && frame.sourceClass === "" && frame.subclass === ""
      && frame.lexicalSelectionAuthorized === false && frame.possessiveSubclassClaimed === false
      && frame.selectedUseScope === "possessive-common-silent"
      && receipt.selectedUseReceipt.stem === frame.stem
      && receipt.selectedUseReceipt.sourceUse === frame.sourceUse
      && receipt.selectedUseReceipt.scope === frame.selectedUseScope
      && receipt.sourceSignature === getSourceSignature(frame)
      && frame.lexicalFactsReadOnly === true && frame.boundaryFactsReadOnly === true
      && frame.callerSuppliedAuthorityAccepted === false && frame.lessonMetadataAuthority === false
      && frame.formulaStringAuthority === false && frame.surfaceStringAuthority === false
      && Object.isFrozen(frame));
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
          : receipt.lexicalEntry === (frame.adjectivalProfile?.includesPossessor
              ? INCLUDED_ADJECTIVAL_LEXEME : ORDINARY_NNC_LEXICON[frame.stem])
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
      referentialHumanness: frame?.referentialHumanness || "",
      referentialAnimacy: frame?.referentialAnimacy || "",
      metaphoricalUse: frame?.metaphoricalUse === true,
      possessor: frame?.possessor || "",
      includedPossessor: frame?.includedPossessor || "",
      stemFormation: frame?.stemFormation || "",
      pluralConnector: frame?.pluralConnector || "",
      singularConnector: frame?.singularConnector || "",
      nonspecificHumanForm: frame?.nonspecificHumanForm || "",
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
      nonspecificHumanForm = "",
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
    const contract = (
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
          secondaryPossessorCarrier:
            nonspecificHumanForm || sourceFrame.boundaryFacts?.nonspecificHumanPossessorCarrier
            || "tē",
        },
      )
      : null;
    if (!contract || !(sourceFrame.restrictedUseOnly || sourceFrame.generalUseOnly)) return contract;
    const options = Object.freeze(contract.options.filter(option => option.optionId === "source-stem"));
    return Object.freeze({...contract, options, optionIds: Object.freeze(options.map(option => option.optionId))});
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
    preferRequestedSubject = false,
  ) {
    const availableAnimacyValues = Object.freeze(Array.from(new Set(
      allowedSubjects.map(getNncSubjectAnimacy),
    )));
    const subjectAnimacy = getNncSubjectAnimacy(requestedSubject);
    const selectedAnimacy = preferRequestedSubject
      && allowedSubjects.includes(requestedSubject)
      ? subjectAnimacy
      : availableAnimacyValues.includes(requestedAnimacy)
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
    const compoundMatrixValues = pronominal ? getPronominalCompoundMatrixValues(sourceFrame) : [];
    const requestedCompoundMatrix = pronominal ? normalizeChoice(selections.compoundMatrix || "none") : "none";
    if (requestedCompoundMatrix !== "none"
      && !compoundMatrixValues.includes(requestedCompoundMatrix)) {
      return buildBlockedFrame(NNC_OPERATION_SELECTION_FRAME_KIND,
        "pronominal-compound-matrix-not-licensed-for-source");
    }
    const effectiveSourceFrame = requestedCompoundMatrix !== "none"
      ? getPronominalCompoundSource(sourceFrame, requestedCompoundMatrix)
      : sourceFrame;
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
      && !sourceFrame.adjectivalProfile?.includesPossessor
      && sourceFrame.referentialAnimacy !== "any"
      ? ORDINARY_NNC_SUBJECTS
      : effectiveSourceFrame?.allowedSubjects || [];
    const requestedSubjectAnimacy = getNncSubjectAnimacy(requestedSubject);
    const preferRequestedPronominalSubject = pronominal
      && (
        !suppliedAnimacy
        || requestedSubjectAnimacy === suppliedAnimacy
      );
    const subjectSelection = selectNncSubjectForAnimacy(
      selectableSubjects,
      requestedSubject,
      requestedAnimacy,
      preferRequestedPronominalSubject,
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
    const requestedHumanness = normalizeChoice(
      ownDataValue(selections, "humanness", ""),
    );
    const humannessValues = Object.freeze(
      selectedAnimacy === "nonanimate"
        ? ["nonhuman"]
        : ["1", "2"].includes(selectedSubjectPerson)
          ? ["human"]
          : ["human", "nonhuman"],
    );
    const selectedHumanness = humannessValues.includes(requestedHumanness)
      ? requestedHumanness
      : humannessValues.length === 1
        ? humannessValues[0]
        : "unspecified";
    const subjectParticipantFrame = buildClassicalNahuatlParticipantFrame({
      role: "subject",
      agreement: selectedSubject,
      animacy: selectedAnimacy,
      humanness: selectedHumanness,
    });
    const metaphoricalUseAvailable = ordinary
      && (
        sourceFrame.naturalPossessionPolicy === "never-possessive"
        || (
          sourceFrame.referentialAnimacy !== "any"
          && selectedAnimacy !== sourceFrame.referentialAnimacy
        )
      );
    const selectedMetaphoricalUse = metaphoricalUseAvailable
      && ownDataValue(selections, "metaphoricalUse", false) === true;

    if (ordinary) {
      const requestedPredicateFormationInput = normalizeChoice(
        ownDataValue(selections, "predicateFormation", "source-stem"),
      );
      const derivedPredicateHasIndependentPossessionPolicy =
        requestedPredicateFormationInput !== "source-stem"
        || Boolean(
          sourceFrame.sourceClassAnalysis?.automaticPredicateOptionId
        );
      const stateValues = Object.freeze(
        sourceFrame.adjectivalProfile?.fixedOuterState
          ? [sourceFrame.adjectivalProfile.fixedOuterState]
          : sourceFrame.naturalPossessionPolicy === "never-possessive"
        && selectedMetaphoricalUse
          ? ["absolutive", "possessive"]
          : sourceFrame.naturalPossessionPolicy === "naturally-possessed"
            && derivedPredicateHasIndependentPossessionPolicy
            ? ["absolutive", "possessive"]
            : [...sourceFrame.allowedStateValues],
      );
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
            (value === "plain"
            || (
              stemRelationEnvironmentAvailable
              && (
                !absolutivePlural
                || getPluralConnectorsForStemRelation(
                  sourceFrame,
                  value,
                ).length > 0
              )
            ))
            && (!absolutivePlural
              || !sourceFrame.boundaryFacts?.absolutivePluralStemFormationOptions
              || sourceFrame.boundaryFacts.absolutivePluralStemFormationOptions.includes(value)),
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
        )));
      const requestedPossessor = normalizePossessor(
        ownDataValue(selections, "possessor", ""),
      );
      const includedPossessorValues = sourceFrame.adjectivalProfile?.includedPossessorOptions || Object.freeze([]);
      const requestedIncludedPossessor = normalizeChoice(ownDataValue(selections, "includedPossessor", ""));
      const selectedIncludedPossessor = includedPossessorValues.includes(requestedIncludedPossessor)
        ? requestedIncludedPossessor : "";
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
      ].filter((optionId) => optionId !== "tl-2a-to-1a"));
      const requestedPredicateFormation = requestedPredicateFormationInput;
      const selectedPredicateFormation = predicateOptionValues.includes(
        requestedPredicateFormation,
      )
        ? requestedPredicateFormation
        : predicateOptionValues.includes("source-stem")
          ? "source-stem"
          : predicateOptionValues[0] || "";
      const nonspecificHumanFormValues = Object.freeze(
        selectedState === "possessive"
          && (selectedPredicateFormation === "secondary-general-use"
            || (selectedPredicateFormation === "source-stem" && selectedPossessor === "nonspecific-human"))
          ? sourceFrame.boundaryFacts?.nonspecificHumanForms || ["tē"] : []
      );
      const requestedNonspecificHumanForm = normalizeChoice(ownDataValue(selections, "nonspecificHumanForm", ""));
      const selectedNonspecificHumanForm = nonspecificHumanFormValues.includes(requestedNonspecificHumanForm)
        ? requestedNonspecificHumanForm : nonspecificHumanFormValues[0] || "";
      const possessorReduplicationAvailable = Boolean(
        selectedState === "possessive"
        && selectedSubject.endsWith("pl")
        && ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"]
          .includes(selectedPossessor),
      );
      const singularConnectorValues = Object.freeze(
        selectedState === "possessive" && !selectedSubject.endsWith("pl")
          && sourceFrame.generalUseOnly ? ["silent"]
          : selectedState === "possessive" && !selectedSubject.endsWith("pl")
          && sourceFrame.subclass === "tli-2"
          ? sourceFrame.boundaryFacts?.tliSubclass2SilentNum1Authorized
            ? ["hui", "silent"] : ["hui"]
          : [],
      );
      const requestedSingularConnector = normalizeChoice(
        ownDataValue(selections, "singularConnector", ""),
      );
      const selectedSingularConnector = singularConnectorValues.includes(requestedSingularConnector)
        ? requestedSingularConnector : sourceFrame.generalUseOnly ? "" : singularConnectorValues[0] || "";
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
        humannessValues,
        selectedHumanness,
        subjectParticipantFrame,
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
        includedPossessorValues,
        selectedIncludedPossessor,
        includedPossessorSelectionRequired: includedPossessorValues.length > 0,
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
        singularConnectorValues,
        selectedSingularConnector,
        nonspecificHumanFormValues,
        selectedNonspecificHumanForm,
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

    const receipt = issuedPronominalSourceReceipts.get(effectiveSourceFrame);
    if (!receipt) return buildBlockedFrame(NNC_OPERATION_SELECTION_FRAME_KIND,
      "pronominal-compound-source-preflight-blocked");
    const clausePositionValues = effectiveSourceFrame.allowedClausePositions;
    const requestedClausePosition = normalizeChoice(
      ownDataValue(selections, "clausePosition", "initial"),
    );
    const selectedClausePosition = clausePositionValues.includes(
      requestedClausePosition,
    )
      ? requestedClausePosition
      : clausePositionValues[0] || "";
    const adjunctorInValues = effectiveSourceFrame.allowedAdjunctorModes;
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
    const specialHumanUseAvailable =
      subjectParticipantFrame.humanness !== "nonhuman"
      && subjectCoordinates.some(
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
    const predicatePluralizationValues = Object.freeze([
      ...derivedCoordinateValues("predicatePluralization"),
    ].sort((left, right) => (
      left === "internal-n" ? -1 : right === "internal-n" ? 1 : 0
    )));
    const requestedPredicatePluralization = normalizeChoice(
      ownDataValue(selections, "predicatePluralization", ""),
    );
    const preferredPredicatePluralization = (
      sourceFrame.familyId === "quantitive"
      && selectedSubject.endsWith("pl")
      && predicatePluralizationValues.includes("internal-n")
    )
      ? "internal-n"
      : predicatePluralizationValues[0] || "";
    const selectedPredicatePluralization = predicatePluralizationValues
      .includes(requestedPredicatePluralization)
      ? requestedPredicatePluralization
      : preferredPredicatePluralization;
    const numberCoordinateCandidates = selectedPredicatePluralization
      ? selectedCoordinateCandidates.filter(
        (coordinate) => normalizeChoice(coordinate.predicatePluralization)
          === selectedPredicatePluralization,
      )
      : selectedCoordinateCandidates;
    const numberFormValues = Object.freeze(Array.from(new Set(
      numberCoordinateCandidates
        .map((coordinate) => normalizeText(coordinate?.numberForm))
        .filter(Boolean),
    )));
    const requestedNumberForm = normalizeChoice(
      ownDataValue(selections, "numberForm", ""),
    );
    const preferredNumberForm = sourceFrame.familyId === "quantitive"
      && selectedSubject.endsWith("pl")
      && numberFormValues.includes("t-in")
      ? "t-in"
      : numberFormValues[0] || "";
    const selectedNumberForm = numberFormValues.includes(requestedNumberForm)
      ? requestedNumberForm
      : preferredNumberForm;
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
      humannessValues,
      selectedHumanness,
      subjectParticipantFrame,
      animacyValues: availableAnimacyValues,
      selectedAnimacy,
      metaphoricalUseAvailable: false,
      selectedMetaphoricalUse: false,
      stemRelationValues: sourceFrame.allowedStemFormations,
      selectedStemRelation: sourceFrame.allowedStemFormations.includes(selections.stemFormation)
        ? selections.stemFormation : "plain",
      stemRelationEnvironmentAvailable: sourceFrame.allowedStemFormations.length > 1,
      compoundMatrixValues,
      selectedCompoundMatrix: requestedCompoundMatrix,
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
      numberFormValues,
      selectedNumberForm,
      predicatePluralizationValues,
      selectedPredicatePluralization,
      derivedNumberForms: numberFormValues,
      derivedMatrixForms: derivedCoordinateValues("matrixForm"),
      derivedPredicatePluralizations:
        predicatePluralizationValues,
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
    const requestedHumanness = normalizeChoice(
      ownDataValue(selections, "humanness", ""),
    );
    const subjectParticipantFrame = buildClassicalNahuatlParticipantFrame({
      role: "subject",
      agreement: subject,
      animacy: referentialAnimacy,
      humanness: requestedHumanness || "unspecified",
    });
    const metaphoricalUse =
      ownDataValue(selections, "metaphoricalUse", false) === true;
    const animacyMismatch = sourceFrame.referentialAnimacy !== "any"
      && sourceFrame.referentialAnimacy !== referentialAnimacy;
    const includedPossessor = normalizeChoice(ownDataValue(selections, "includedPossessor", ""));
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
    const nonspecificHumanForm = normalizeChoice(ownDataValue(selections, "nonspecificHumanForm", ""));
    const singularConnector = normalizeChoice(
      ownDataValue(selections, "singularConnector", ""),
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
    const sourceClassPredicateOptionId = normalizeChoice(
      sourceFrame.sourceClassAnalysis?.automaticPredicateOptionId || "",
    );
    const effectivePredicateFormation =
      sourceClassPredicateOptionId || predicateFormation;
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
        nonspecificHumanForm,
      },
    );
    const selectedPredicateOption = predicateOptionContract?.options?.find(
      (candidate) => candidate?.optionId === effectivePredicateFormation,
    ) || null;
    const predicateOperation = normalizeChoice(
      selectedPredicateOption?.operation || "",
    );
    const derivedPredicateHasIndependentPossessionPolicy =
      predicateOperation && predicateOperation !== "regular";
    const metaphoricalPossessionOverride =
      sourceFrame.naturalPossessionPolicy === "never-possessive"
      && state === "possessive"
      && metaphoricalUse;
    const stateLexicallyAuthorized =
      sourceFrame.allowedStateValues.includes(state)
      || (
        sourceFrame.naturalPossessionPolicy === "naturally-possessed"
        && derivedPredicateHasIndependentPossessionPolicy
      )
      || metaphoricalPossessionOverride;
    let blockReason = "";
    const selectedGeneralUseContext = sourceFrame.generalUseOnly
      && state === "possessive" && sourceFrame.allowedSubjects.includes(subject)
      && possessor && stemFormation === "plain" && effectivePredicateFormation === "source-stem"
      && !possessorReduplication && !requestedPluralConnector && !nonspecificHumanForm && !metaphoricalUse;
    if (selectedGeneralUseContext && !subject.endsWith("pl") && !singularConnector) {
      blockReason = "ordinary-nnc-selected-general-use-singular-connector-required";
    } else if (sourceFrame.generalUseOnly && (
      !selectedGeneralUseContext
      || (subject.endsWith("pl") ? Boolean(singularConnector) : singularConnector !== "silent")
    )) {
      blockReason = "ordinary-nnc-selected-general-use-cell-not-licensed";
    } else if (sourceFrame.restrictedUseOnly && (
      state !== "absolutive" || (subject.endsWith("pl") && !sourceFrame.pluralConnectorOptions.length)
      || !(stemFormation === "plain" || (["tl", "tli"].includes(sourceFrame.sourceClass) && stemFormation === "affinity")) || effectivePredicateFormation !== "source-stem"
      || possessorReduplication || normalizeText(requestedPossessor)
    )) {
      blockReason = "ordinary-nnc-restricted-use-analysis-needs-additional-source-facts";
    } else if (sourceFrame.adjectivalProfile?.includesPossessor && !includedPossessor) {
      blockReason = "included-adjectival-person-selection-required";
    } else if (sourceFrame.adjectivalProfile?.includesPossessor && (
      state !== "absolutive" || !sourceFrame.adjectivalProfile.outerSubjectOptions.includes(subject)
      || !sourceFrame.adjectivalProfile.includedPossessorOptions.includes(includedPossessor)
      || predicateFormation !== "source-stem" || stemFormation !== "plain"
    )) {
      blockReason = "included-adjectival-source-requires-included-person-and-third-absolute-outer-shell";
    } else if (includedPossessor && !sourceFrame.adjectivalProfile?.includesPossessor) {
      blockReason = "included-person-requires-possessor-included-source";
    } else if (!ORDINARY_NNC_STATES.includes(state)) {
      blockReason = "ordinary-nnc-state-not-recognized";
    } else if (!stateLexicallyAuthorized) {
      blockReason = "ordinary-nnc-state-not-lexically-authorized";
    } else if (!ORDINARY_NNC_SUBJECTS.includes(subject)) {
      blockReason = "ordinary-nnc-subject-not-recognized";
    } else if (subjectParticipantFrame.category !== subject) {
      blockReason = "ordinary-nnc-subject-reference-mismatches-selected-person";
    } else if (
      animacyMismatch
      && !metaphoricalUse
      && !derivedPredicateHasIndependentPossessionPolicy
    ) {
      blockReason = "ordinary-nnc-animacy-mismatch-requires-metaphorical-use";
    } else if (
      metaphoricalUse
      && !animacyMismatch
      && !metaphoricalPossessionOverride
    ) {
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
    } else if (nonspecificHumanForm && (
      state !== "possessive"
      || !(predicateFormation === "secondary-general-use" || (predicateFormation === "source-stem" && possessor === "nonspecific-human"))
      || !(sourceFrame.boundaryFacts?.nonspecificHumanForms || ["tē"]).includes(nonspecificHumanForm)
    )) {
      blockReason = "ordinary-nnc-nonspecific-human-form-not-licensed";
    } else if (singularConnector && !sourceFrame.generalUseOnly && (
      state !== "possessive" || subject.endsWith("pl")
      || sourceFrame.subclass !== "tli-2"
      || !["hui", "silent"].includes(singularConnector)
      || (singularConnector === "silent"
        && !sourceFrame.boundaryFacts.tliSubclass2SilentNum1Authorized)
    )) {
      blockReason = "ordinary-nnc-singular-connector-not-licensed";
    } else if (!sourceFrame.stemFormationOptions.includes(stemFormation)
      || (state === "absolutive" && subject.endsWith("pl")
        && sourceFrame.boundaryFacts?.absolutivePluralStemFormationOptions
        && !sourceFrame.boundaryFacts.absolutivePluralStemFormationOptions.includes(stemFormation))) {
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
      referentialHumanness: subjectParticipantFrame.humanness,
      subjectParticipantFrame,
      metaphoricalUse,
      possessor,
      includedPossessor,
      stemFormation,
      pluralConnector,
      singularConnector,
      nonspecificHumanForm,
      predicateFormation,
      predicateOperation,
      sourceClassPredicateOptionId,
      predicateFormationAuthority: sourceClassPredicateOptionId
        ? "typed-source-class"
        : "grammar-selection",
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
        tliSubclass2SilentNum1Authorized: sourceFrame.boundaryFacts?.tliSubclass2SilentNum1Authorized === true,
        supportiveInitialI: sourceFrame.supportiveInitialI === true,
        // The citation keeps its vowel. Select the licensed variant only at
        // the possessive boundary; reduplicative stems treat initial i as real.
        selectedInitialVariant: sourceFrame.supportiveInitialI === true
          && operationFrame.state === "possessive"
          && operationFrame.stemFormation === "plain"
          && ["1sg", "2sg", "1pl", "2pl", "3sg", "nonspecific-nonhuman"]
            .includes(operationFrame.possessor)
            ? "omitted"
            : "retained",
        nounClass: sourceFrame.nounClass,
        classMembershipOptions: sourceFrame.classMembershipOptions,
        stemFormation: operationFrame.stemFormation,
        pluralStemFormationOptions: sourceFrame.stemFormationOptions,
        pluralConnector: operationFrame.pluralConnector,
        pluralConnectorOptions: sourceFrame.pluralConnectorOptions,
        sourcePlainPluralConnector: operationFrame.pluralConnector,
        possessivePluralDerivedSemanticNeed:
          operationFrame.state === "possessive"
          && operationFrame.subject.endsWith("pl")
          && operationFrame.stemFormation !== "plain",
      },
    );
  }

  function getClassicalNahuatlOrdinaryNncReinflectionContext(exact = null) {
    const sentence = targetObject.isClassicalNahuatlIssuedNncSentenceSurfaceFrame?.(exact) === true
      ? exact : null;
    const ordinary = isClassicalNahuatlOrdinaryNncResult(exact) ? exact
      : sentence ? getClassicalNahuatlOrdinaryNncResultForTypedSlotFrame(sentence.sourceNncSlotFrame) : null;
    if (!ordinary) return null;
    const operation = ordinary.operationFrame;
    const sentenceFrame = sentence || ordinary.sentenceFrame;
    const selections = Object.fromEntries([...ORDINARY_NNC_OPERATION_SELECTION_KEYS]
      .filter(key => Object.hasOwn(operation,key)).map(key => [key,operation[key]]));
    selections.humanness = operation.referentialHumanness;
    selections.sentenceType = sentenceFrame.requestedSentenceType === "assertion" ? "statement"
      : sentenceFrame.requestedSentenceType;
    selections.polarity = sentenceFrame.polarity;
    return Object.freeze({exactInput:exact, ordinaryResult:ordinary, sourceFrame:ordinary.sourceFrame,
      operationFrame:operation, sentenceFrame, selections:Object.freeze(selections)});
  }

  function evaluateClassicalNahuatlOrdinaryNnc(
    sourceFrame = null,
    operationFrame = null,
  ) {
    const reinflection = getClassicalNahuatlOrdinaryNncReinflectionContext(sourceFrame);
    if (reinflection) {
      // The current exact Result attests the original nounstem analysis.
      // Re-inflect it through the ordinary owner, never through its spelling.
      sourceFrame = reinflection.sourceFrame;
      const inherited = {...reinflection.selections};
      if (operationFrame?.state === "absolutive" && inherited.state !== "absolutive") {
        inherited.possessor = "";
        inherited.possessorReduplication = false;
      }
      operationFrame = buildClassicalNahuatlOrdinaryNncOperationFrame(sourceFrame,
        {...inherited, ...(operationFrame || {})});
    }
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
    if (sourceFrame.generalUseOnly) requiredCapabilityNames.push("buildClassicalNahuatlPossessiveNncFrame");
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
    const classFreeSelectedUse = sourceFrame.generalUseOnly && sourceFrame.classClaimed === false;
    const lexicalSelectionRecord = classFreeSelectedUse ? null : buildLexicalSelectionRecord(
      sourceFrame,
      operationFrame,
    );
    const lexicalSelectionAuthorized = classFreeSelectedUse
      ? isClassicalNahuatlOrdinaryNncSourceFrame(sourceFrame)
      : targetObject.isClassicalNahuatlLexicalSelectionRecord(
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
                  : sourceFrame.openStemSource
                    ? "user-supplied-lexical-analysis"
                    : "external-lexical-record",
          targetStem:
            selectedPredicateOption?.operation === "suppletive"
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
    const derivedPredicateHasIndependentPossessionPolicy =
      operationFrame.predicateOperation !== "regular";
    const effectiveNaturalPossessionPolicy =
      derivedPredicateHasIndependentPossessionPolicy
        ? "ordinary"
        : sourceFrame.naturalPossessionPolicy;
    const effectiveNaturalPossessionSemantics =
      derivedPredicateHasIndependentPossessionPolicy
        ? "ordinary"
        : sourceFrame.naturalPossessionSemantics;
    const effectiveStateAvailability =
      effectiveNaturalPossessionPolicy === "ordinary"
        ? "both"
        : sourceFrame.stateAvailability;
    const sourceAuthorityFrame =
      targetObject.buildClassicalNahuatlNncSourceAuthorityFrame(
        sourceFrame.stem,
        {
          selectedState: operationFrame.state,
          stateAvailability: effectiveStateAvailability,
          naturalPossessionPolicy: effectiveNaturalPossessionPolicy,
          naturalPossessionSemantics: effectiveNaturalPossessionSemantics,
          metaphoricalOverride: operationFrame.metaphoricalUse === true,
          possessorCompatibility: sourceFrame.possessorCompatibility,
          nonspecificHumanPossessorCarrier:
            operationFrame.predicateOperation === "secondary-general-use"
              ? "tē"
              : operationFrame.nonspecificHumanForm || sourceFrame.boundaryFacts?.nonspecificHumanPossessorCarrier
                || "tē",
          policySelectionAuthority: sourceFrame.openStemSource
            ? "default-ordinary-source-analysis"
            : "external-lexical-record",
          lesson15StemOperationRecord: stemOperationRecord,
          lesson15PossessorReduplicationSelection:
            possessorReduplicationSelection,
        },
      );
    const classGovernedFrame = sourceFrame.generalUseOnly
      ? targetObject.buildClassicalNahuatlPossessiveNncFrame(sourceFrame.stem, {
          subject: operationFrame.subject, possessor: operationFrame.possessor,
          animacy: operationFrame.referentialAnimacy, humanness: operationFrame.referentialHumanness,
          singularConnector: operationFrame.singularConnector === "silent" ? "0" : "",
          nncSourceAuthorityFrame: sourceAuthorityFrame,
        })
      : targetObject.buildClassicalNahuatlClassGovernedNncFrame(
        sourceFrame.stem,
        {
          state: operationFrame.state,
          subject: operationFrame.subject,
          possessor: operationFrame.possessor,
          nounClass: sourceFrame.nounClass,
          classSelectionAuthority: sourceFrame.lexicalSelectionAuthority,
          lesson14LexicalSelectionRecord: lexicalSelectionRecord,
          borrowedNncSourceFrame: sourceFrame,
          nncSourceAuthorityFrame: sourceAuthorityFrame,
          stemFormation: operationFrame.stemFormation,
          pluralConnector: operationFrame.pluralConnector,
          singularConnector: operationFrame.singularConnector,
          pluralSelectionAuthority: operationFrame.pluralConnector
            ? sourceFrame.pluralConnectorOptions.length > 1
              ? "user-selection"
              : "external-lexical-record"
            : "",
          generalUseShape: operationFrame.useShape,
          ephemeralFinalVowel: sourceFrame.ephemeralFinalVowel,
          truncationRepair: sourceFrame.truncationRepair,
          sourceStructure: sourceFrame.compoundSource ? "compound" : "",
          compoundSourceConstituents: sourceFrame.sourceConstituents,
          tlSubclass: sourceFrame.nounClass === "tl"
            ? operationFrame.subclass.replace(/^tl-/u, "")
            : "",
          tliSubclass: sourceFrame.nounClass === "tli"
            ? operationFrame.subclass.replace(/^tli-/u, "")
            : "",
          animacy: operationFrame.referentialAnimacy,
          humanness: operationFrame.referentialHumanness,
          metaphoricalOverride: operationFrame.metaphoricalUse === true,
          naturalPossessionPolicy: effectiveNaturalPossessionPolicy,
          stateAvailability: effectiveStateAvailability,
          policySelectionAuthority: sourceFrame.openStemSource
            ? "default-ordinary-source-analysis"
            : "external-lexical-record",
          possessorCompatibility: sourceFrame.possessorCompatibility,
        },
      );
    // A selected already-general-use cell goes directly to the existing
    // possession owner. Reclassifying it as a citation would invent a paradigm.
    const higherFrame = sourceFrame.generalUseOnly ? classGovernedFrame
      : targetObject.buildClassicalNahuatlHigherNncFrame(
        classGovernedFrame,
        {
          adjectivalSourceFrame: sourceFrame.adjectivalProfile ? sourceFrame : null,
          adjectivalOperationFrame: sourceFrame.adjectivalProfile ? operationFrame : null,
          animacy: operationFrame.referentialAnimacy,
          humanness: operationFrame.referentialHumanness,
          metaphoricalOverride: operationFrame.metaphoricalUse === true,
          naturalPossessionPolicy: effectiveNaturalPossessionPolicy,
          stateAvailability: effectiveStateAvailability,
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
            borrowedNncSourceFrame: sourceFrame,
            ...(reinflection?.sentenceFrame.discourseFrame
              ? {discourseFrame:reinflection.sentenceFrame.discourseFrame} : {}),
            ...(reinflection?.sentenceFrame.negativePrefix
              && targetObject.getClassicalNahuatlNncSentenceNegativePrefixOptions?.(slotFrame,
                {sentenceType:operationFrame.sentenceType,polarity:operationFrame.polarity,
                  borrowedNncSourceFrame:sourceFrame}).includes(reinflection.sentenceFrame.negativePrefix)
              ? {negativePrefix:reinflection.sentenceFrame.negativePrefix} : {}),
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
      adjectivalPredicateFrame: authorized ? higherFrame.adjectivalPredicateFrame || null : null,
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
      // Keep the canonical pre-number use-stem analysis privately. A final
      // predicate may already have possessive truncation or plural quantity
      // changes; its written/formula stem cannot reconstruct this analysis.
      nounstemUseFrame: authorized && !sourceFrame.generalUseOnly ? deepFreeze(classGovernedFrame.sourceFrame) : null,
      adjectivalPredicateFrame: frame.adjectivalPredicateFrame,
      nounstemDerivedFrame: authorized && !sourceFrame.generalUseOnly
        ? deepFreeze(classGovernedFrame.derivedStemFrame) : null,
      stemOperationRecord: authorized ? deepFreeze(stemOperationRecord) : null,
      contextualRealizations: frame.contextualRealizations,
      typedSlotFrame: authorized ? slotFrame : null,
      sentenceFrame: authorized ? sentenceFrame : null,
      stemOperation: frame.stemOperation,
      formulaRealization: frame.formulaRealization,
      surfaceRealization: frame.surfaceRealization,
      sentenceSurface: frame.sentenceSurface,
      authorizationStatus: frame.authorizationStatus,
    }));
    if (authorized) issuedResultByTypedSlotFrame.set(slotFrame, frame);
    return frame;
  }

  function getClassicalNahuatlOrdinaryNncResultForTypedSlotFrame(slotFrame = null) {
    const result = slotFrame && typeof slotFrame === "object"
      ? issuedResultByTypedSlotFrame.get(slotFrame) : null;
    return isClassicalNahuatlOrdinaryNncResult(result)
      && result.typedSlotFrame === slotFrame ? result : null;
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
      && frame.adjectivalPredicateFrame === receipt.adjectivalPredicateFrame
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

  function normalizeRequestedStates(
    value,
    sourceFrame,
    allowedStateValues = sourceFrame.allowedStateValues,
  ) {
    return normalizeUniqueList(
      value,
      normalizeChoice,
      allowedStateValues,
    );
  }

  function normalizeRequestedSubjects(value) {
    return normalizeUniqueList(value, normalizeSubject, ORDINARY_NNC_SUBJECTS);
  }

  function normalizeRequestedPossessors(value, sourceFrame) {
    const fallback = ORDINARY_NNC_POSSESSORS;
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
    const requestedPredicateFormation = normalizeChoice(
      ownDataValue(request, "predicateFormation", "source-stem"),
    );
    const derivedPredicateHasIndependentPossessionPolicy =
      requestedPredicateFormation !== "source-stem";
    const metaphoricalPossessionOverride =
      sourceFrame.naturalPossessionPolicy === "never-possessive"
      && ownDataValue(request, "metaphoricalUse", false) === true;
    const allowedStateValues = (
      sourceFrame.naturalPossessionPolicy === "naturally-possessed"
      && derivedPredicateHasIndependentPossessionPolicy
    ) || metaphoricalPossessionOverride
      ? ORDINARY_NNC_STATES
      : sourceFrame.allowedStateValues;
    const states = normalizeRequestedStates(
      ownDataValue(request, "states", null),
      sourceFrame,
      allowedStateValues,
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
        !allowedStateValues.includes(state))
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
      humanness: normalizeChoice(
        ownDataValue(request, "humanness", "unspecified"),
      ) || "unspecified",
      metaphoricalUse:
        ownDataValue(request, "metaphoricalUse", false) === true,
      predicateFormation: requestedPredicateFormation,
      possessorReduplication:
        ownDataValue(request, "possessorReduplication", false) === true,
      sentenceType: ownDataValue(request, "sentenceType", "statement"),
      polarity: ownDataValue(request, "polarity", "positive"),
    };
    const operationFrames = [];
    let firstCandidateBlockReason = "";
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
            // The participant owner may normalize an incompatible coordinate
            // (human/common or nonhuman/first person). A fixed context cannot
            // silently change its requested subject or referential fact.
            if (fixedSelections.humanness !== "unspecified"
              && (operationFrame.referentialHumanness !== fixedSelections.humanness
                || operationFrame.subjectParticipantFrame?.category !== subject)) {
              firstCandidateBlockReason ||= "ordinary-nnc-paradigm-fixed-humanness-coordinate-mismatch";
              return;
            }
            const scalarProbe = evaluateClassicalNahuatlOrdinaryNnc(
              sourceFrame,
              operationFrame,
            );
            if (isClassicalNahuatlOrdinaryNncResult(scalarProbe)) {
              operationFrames.push(operationFrame);
            } else if (!firstCandidateBlockReason) {
              firstCandidateBlockReason = operationFrame?.blockReason
                || scalarProbe?.blockReason
                || "ordinary-nnc-paradigm-scalar-not-authorized";
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
      if (!operationFrames.length) {
        blockReason = firstCandidateBlockReason
          || "ordinary-nnc-paradigm-no-authorized-coordinates";
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
      quantitiveReferenceScope: frame?.quantitiveReferenceScope || "",
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
    const enteredStem = normalizeStem(ownDataValue(source, "stem", ""));
    const enteredEmbedStem = normalizeStem(
      ownDataValue(source, "embedStem", ""),
    );
    const enteredMatrixStem = normalizeStem(
      ownDataValue(source, "matrixStem", ""),
    );
    // A flat display mirror may accompany the explicitly entered analysis.
    // Preserve its boundaries only when every segment (including quantity) agrees.
    const structuredStem = enteredEmbedStem && enteredMatrixStem
      ? `${enteredEmbedStem}-${enteredMatrixStem}` : "";
    const stem = structuredStem
      && enteredStem.replace(/-/gu, "") === structuredStem.replace(/-/gu, "")
      ? structuredStem : enteredStem;
    const sourceKeys = Reflect.ownKeys(source)
      .filter((key) => typeof key === "string");
    const forbiddenSourceKey = sourceKeys.find(
      (key) => !PRONOMINAL_NNC_SOURCE_INPUT_KEYS.has(key),
    ) || "";
    const internalReduplication = analyzeQuantitiveInternalReduplication(stem, targetObject);
    const baseLexicalEntry = internalReduplication
      ? PRONOMINAL_NNC_LEXICON[internalReduplication.baseStem]
      : null;
    const lexicalEntry = PRONOMINAL_NNC_LEXICON[stem]
      || (baseLexicalEntry?.familyId === "quantitive"
        && internalReduplication.derivedStem === stem
        ? Object.freeze({ ...baseLexicalEntry,
            embedStem: internalReduplication.derivedEmbed,
          })
        : null);
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
    const personalAlternantFamily = [
      "personal-simple",
      "personal-compound",
    ].includes(familyId);
    const authorizedCoreCoordinates =
      allAuthorizedCoreCoordinates.filter((coordinate) => {
        const realizedSourceStem = normalizeStem(
          coordinate?.sourceFrame?.sourceStem || "",
        );
        const sourceIdentityStem = normalizeStem(
          coordinate?.sourceFrame?.sourceIdentityStem
          || coordinate?.sourceFrame?.sourceStem
          || "",
        );
        return personalAlternantFamily
          || realizedSourceStem === stem
          || (
            String(coordinate?.subject || "").endsWith("pl")
            && coordinate?.predicatePluralization === "plain-variant"
            && sourceIdentityStem === stem
          );
      });
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
      ...(lexicalEntry?.quantitiveReferenceScope
        ? {quantitiveReferenceScope: lexicalEntry.quantitiveReferenceScope} : {}),
      internalReduplicationFrame: baseLexicalEntry ? internalReduplication : null,
      allowedStemFormations: Object.freeze(familyId === "quantitive"
        && deriveQuantitiveInternalReduplication(stem, targetObject)
        ? ["plain", "distributive-varietal"] : ["plain"]),
      sourceStructure,
      nounClass: authorizedCoreCoordinates[0]?.sourceFrame?.nounClass || "",
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
        baseLexicalEntry,
        internalReduplication,
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
      && (receipt.lexicalEntry === PRONOMINAL_NNC_LEXICON[frame.stem]
        || (receipt.internalReduplication
          && receipt.baseLexicalEntry === PRONOMINAL_NNC_LEXICON[receipt.internalReduplication.baseStem]
          && receipt.internalReduplication === frame.internalReduplicationFrame
          && receipt.internalReduplication.derivedStem === frame.stem))
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
      stemFormation: frame?.stemFormation || "plain",
      compoundMatrix: frame?.compoundMatrix || "",
      derivedSourceSignature: frame?.derivedSourceFrame
        ? getPronominalSourceSignature(frame.derivedSourceFrame) : "",
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

  function getPronominalCompoundMatrixValues(sourceFrame) {
    if (!isClassicalNahuatlPronominalNncSourceFrame(sourceFrame)
      || sourceFrame.familyId !== "interrogative-which") return Object.freeze([]);
    return Object.freeze(["none", ...Object.values(PRONOMINAL_NNC_LEXICON)
      .filter(entry => entry.familyId === "interrogative-which-compound"
        && entry.sourceStructure === "embed-matrix"
        && entry.embedStem === sourceFrame.stem)
      .map(entry => entry.matrixStem)]);
  }

  function getPronominalCompoundSource(sourceFrame, matrix) {
    if (matrix === "none" || !getPronominalCompoundMatrixValues(sourceFrame).includes(matrix))
      return null;
    let byMatrix = pronominalCompoundSources.get(sourceFrame);
    if (!byMatrix) {
      byMatrix = new Map();
      pronominalCompoundSources.set(sourceFrame, byMatrix);
    }
    if (byMatrix.has(matrix)) return byMatrix.get(matrix);
    const derived = buildClassicalNahuatlPronominalNncSourceFrame({
      stem: `${sourceFrame.stem}-${matrix}`, embedStem: sourceFrame.stem,
      matrixStem: matrix,
    });
    if (!isClassicalNahuatlPronominalNncSourceFrame(derived)) return null;
    pronominalCompoundProvenance.set(derived, Object.freeze({
      sourceFrame, matrix, sourceSignature: getPronominalSourceSignature(sourceFrame),
      derivedSignature: getPronominalSourceSignature(derived),
    }));
    byMatrix.set(matrix, derived);
    return derived;
  }

  function hasPronominalCompoundProvenance(operationFrame) {
    if (!operationFrame.compoundMatrix) return true;
    const derived = operationFrame.derivedSourceFrame;
    const provenance = pronominalCompoundProvenance.get(derived);
    return Boolean(provenance
      && provenance.sourceFrame === operationFrame.sourceFrame
      && provenance.matrix === operationFrame.compoundMatrix
      && provenance.sourceSignature === getPronominalSourceSignature(operationFrame.sourceFrame)
      && provenance.derivedSignature === getPronominalSourceSignature(derived)
      && isClassicalNahuatlPronominalNncSourceFrame(derived)
      && pronominalCompoundSources.get(operationFrame.sourceFrame)?.get(provenance.matrix) === derived);
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
    const stemFormation = normalizeChoice(selections.stemFormation || "plain");
    const formation = stemFormation === "distributive-varietal"
      && sourceFrame.allowedStemFormations.includes(stemFormation)
      ? deriveQuantitiveInternalReduplication(sourceFrame.stem, targetObject) : null;
    const requestedCompoundMatrix = normalizeChoice(selections.compoundMatrix || "none");
    const compoundMatrix = requestedCompoundMatrix === "none" ? "" : requestedCompoundMatrix;
    if (compoundMatrix && (stemFormation !== "plain"
      || !getPronominalCompoundMatrixValues(sourceFrame).includes(compoundMatrix))) {
      return buildBlockedFrame(PRONOMINAL_NNC_OPERATION_KIND,
        "pronominal-compound-matrix-not-licensed-for-source", {sourceFrame});
    }
    const derivedSourceFrame = compoundMatrix
      ? getPronominalCompoundSource(sourceFrame, compoundMatrix) : formation
      ? buildClassicalNahuatlPronominalNncSourceFrame({
          stem: formation.derivedStem,
          embedStem: formation.derivedEmbed,
          matrixStem: formation.matrixStem,
        }) : null;
    const effectiveSourceFrame = derivedSourceFrame || sourceFrame;
    const receipt = issuedPronominalSourceReceipts.get(effectiveSourceFrame);
    if (compoundMatrix && !derivedSourceFrame) {
      return buildBlockedFrame(PRONOMINAL_NNC_OPERATION_KIND,
        "pronominal-compound-source-preflight-blocked", {sourceFrame});
    }
    if (!receipt || !sourceFrame.allowedStemFormations.includes(stemFormation)) {
      return buildBlockedFrame(PRONOMINAL_NNC_OPERATION_KIND,
        "pronominal-stem-formation-unavailable", {sourceFrame});
    }
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
    const pronominalSubjectParticipantFrame = buildClassicalNahuatlParticipantFrame({
      role: "subject",
      agreement: subject,
      animacy: getNncSubjectAnimacy(subject),
      humanness: ownDataValue(selections, "humanness", "") || "unspecified",
    });
    const clausePosition = normalizeChoice(
      ownDataValue(selections, "clausePosition", "initial"),
    );
    const adjunctorInMode = normalizeChoice(
      ownDataValue(selections, "adjunctorInMode", "none"),
    );
    const requestedNumberForm = normalizeChoice(
      ownDataValue(selections, "numberForm", ""),
    );
    const requestedPredicatePluralization = normalizeChoice(
      ownDataValue(selections, "predicatePluralization", ""),
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
    const contextualCandidates = candidateInventory.filter((coordinate) => (
      (!subject || coordinate.subject === subject)
      && normalizeChoice(coordinate.clausePosition) === clausePosition
      && normalizeChoice(coordinate.adjunctorInMode) === adjunctorInMode
      && coordinate.doubledFirstPluralSelected === doubledFirstPlural
      && (
        pronominalSubjectParticipantFrame.humanness === "nonhuman"
        || typeof requestedSpecialHumanUse === "undefined"
        || coordinate.specialHumanUseSelected
          === (requestedSpecialHumanUse === true)
      )
    ));
    const availablePredicatePluralizations = Array.from(new Set(
      contextualCandidates
        .map((coordinate) => normalizeChoice(
          coordinate.predicatePluralization,
        ))
        .filter(Boolean),
    ));
    const pluralizationCandidates = requestedPredicatePluralization
      ? contextualCandidates.filter((coordinate) => (
        normalizeChoice(coordinate.predicatePluralization)
          === requestedPredicatePluralization
      ))
      : contextualCandidates;
    const availableNumberForms = Array.from(new Set(
      pluralizationCandidates
        .map((coordinate) => normalizeChoice(coordinate.numberForm))
        .filter(Boolean),
    ));
    const candidates = requestedNumberForm
      ? pluralizationCandidates.filter(
        (coordinate) => normalizeChoice(coordinate.numberForm)
          === requestedNumberForm,
      )
      : pluralizationCandidates;
    // Andrews §16.9 states that long-matrix internal -n is the normal plural
    // formation; plain-stem forms are licensed variants. The engine defaults
    // to the normal internal-n pattern. A user may select the plain variant
    // only when the typed source inventory licenses both patterns.
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
    } else if (!subject || !effectiveSourceFrame.allowedSubjects.includes(subject)) {
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
      requestedPredicatePluralization
      && !availablePredicatePluralizations.includes(
        requestedPredicatePluralization,
      )
    ) {
      blockReason =
        "selected-predicate-pluralization-not-licensed-for-pronominal-nnc-context";
    } else if (
      requestedNumberForm
      && !availableNumberForms.includes(requestedNumberForm)
    ) {
      blockReason = "selected-number-form-not-licensed-for-pronominal-nnc-context";
    } else if (
      sourceFrame.familyId === "indefinite-something"
      && requestedSpecialHumanUse === true
      && pronominalSubjectParticipantFrame.humanness === "nonhuman"
    ) {
      blockReason =
        "special-human-itlah-selection-is-limited-to-itlah-with-a-human-subject";
    } else if (
      sourceFrame.familyId === "indefinite-something"
      && pronominalSubjectParticipantFrame.humanness !== "nonhuman"
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
      stemFormation,
      compoundMatrix,
      internalReduplicationFrame: formation,
      derivedSourceFrame,
      sourceFrame,
      sourceSignature,
      subject,
      referentialHumanness: pronominalSubjectParticipantFrame.humanness,
      subjectParticipantFrame: pronominalSubjectParticipantFrame,
      numberForm: selectedCoordinate?.numberForm || "",
      matrixForm: selectedCoordinate?.matrixForm || "",
      predicatePluralization:
        selectedCoordinate?.predicatePluralization
        || "",
      clausePosition,
      adjunctorInMode,
      completionRequirement: adjunctorInMode === "dependent-clause"
        ? Object.freeze({kind: "dependent-clause",
          blockReason: "pronominal-nnc-dependent-clause-requires-supplementation",
          operationId: "sentence:supplementation", bindingId: "supplementation:principal",
          principalSelections: Object.freeze({adjunctorInMode: "none"}),
          scalarSentenceComplete: false, generationAuthority: false})
        : null,
      doubledFirstPlural,
      specialHumanUse:
        pronominalSubjectParticipantFrame.humanness !== "nonhuman"
        && selectedCoordinate?.specialHumanUseSelected === true,
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
        derivedSourceFrame,
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
      && frame.derivedSourceFrame === receipt.derivedSourceFrame
      && hasPronominalCompoundProvenance(frame)
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
    // Separate in belongs to an actual supplementary clause. This scalar
    // coordinate retains its grammar but cannot publish a placeholder sentence.
    if (operationFrame.completionRequirement) {
      return buildBlockedFrame(PRONOMINAL_NNC_RESULT_KIND,
        operationFrame.completionRequirement.blockReason,
        {sourceFrame, operationFrame, completionRequirement: operationFrame.completionRequirement,
          formulaRealization: "", surfaceRealization: "", wordSurface: "", sentenceSurface: ""});
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
    const effectiveSourceFrame = operationFrame.derivedSourceFrame || sourceFrame;
    const sourceReceipt = issuedPronominalSourceReceipts.get(effectiveSourceFrame);
    const coreTypeOptions = { ...sourceReceipt.coreSourceOptions };
    [
      "embedStem",
      "matrixFamily",
      "matrixForm",
      "sourceStem",
    ].forEach((key) => {
      if (effectiveSourceFrame.familyId === "quantitive") delete coreTypeOptions[key];
    });
    let quantitiveAuthorityRecord = null;
    if (effectiveSourceFrame.familyId === "quantitive") {
      quantitiveAuthorityRecord =
        targetObject.buildClassicalNahuatlQuantitiveAuthorityRecord({
          subject: operationFrame.subject,
          sourceStem: effectiveSourceFrame.stem,
          embedStem: effectiveSourceFrame.embedStem,
          matrixFamily: effectiveSourceFrame.matrixFamily,
          matrixForm: operationFrame.matrixForm === "not-applicable"
            ? effectiveSourceFrame.matrixForm
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
      animacy: operationFrame.subjectParticipantFrame.animacy,
      humanness: operationFrame.referentialHumanness,
      subjectReferentCategory: operationFrame.referentialHumanness,
      enteredStem: effectiveSourceFrame.stem,
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
    // The sentence owner derives information-question force from discourse.
    // Retain the caller's sentence choice for subsequent scope operations.
    const sentenceType = operationFrame.sentenceType;
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
      coreSourceFrame: deepFreeze(coreFrame?.sourceFrame || null),
      coreNumberFrame: deepFreeze(coreFrame?.numberFrame || null),
      coreContextSelectionRecord:
        deepFreeze(coreFrame?.contextSelectionRecord || null),
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

  function hasCanonicalPronominalCitationAnalysis(resultFrame, receipt) {
    const source = receipt?.coreSourceFrame;
    const number = receipt?.coreNumberFrame;
    const context = receipt?.coreContextSelectionRecord;
    const slots = receipt?.typedSlotFrame;
    return Boolean(
      source?.authorizationStatus === "authorized"
      && number?.authorizationStatus === "authorized"
      && context?.authorizationStatus === "authorized"
      && source.contextSelectionRecord === context
      && source.state === "absolutive"
      && hasPronominalCompoundProvenance(resultFrame.operationFrame)
      && source.enteredStem === (resultFrame.operationFrame.derivedSourceFrame
        || resultFrame.sourceFrame).stem
      && source.subject === resultFrame.operationFrame.subject
      && number.subject === source.subject
      && context.subject === source.subject
      && slots === resultFrame.typedSlotFrame
      && slots?.authorizationStatus === "authorized"
      && slots.nncFamily === "pronominal"
      && slots.slots?.state?.arity === "vacant"
      && Array.isArray(slots.slots.state.slots)
      && slots.slots.state.slots.length === 0
      && slots.slots.subject.subject === source.subject
      && slots.nounClass === source.nounClass
      && slots.nounClass === number.nounClass
      && slots.slots.predicate.stem === number.predicateStem
      && slots.slots.number.num1 === number.num1
      && slots.slots.number.num2 === number.num2
      && slots.internalPluralMorph === number.internalPluralMorph
      && number.internalPluralBelongsTo === "predicate-stem-derivation"
      && number.internalPluralIsSubjectNumberConnector === false
      && Object.isFrozen(source)
      && Object.isFrozen(number)
      && Object.isFrozen(context)
    );
  }

  function getClassicalNahuatlPronominalNncRestrictedUseCitationProjection(
    resultFrame = null,
  ) {
    const blocked = (reason) => buildBlockedFrame(
      PRONOMINAL_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND,
      reason,
      { stem: "", nounClass: "", projectionRole: "read-only-source-constituents" },
    );
    if (!isClassicalNahuatlPronominalNncResult(resultFrame)) {
      return blocked("issued-authorized-pronominal-nnc-result-required");
    }
    const existing = pronominalRestrictedUseCitationProjections.get(resultFrame);
    if (existing) return existing;
    const receipt = issuedPronominalResultReceipts.get(resultFrame);
    if (!hasCanonicalPronominalCitationAnalysis(resultFrame, receipt)) {
      return blocked("pronominal-nnc-canonical-citation-analysis-required");
    }
    const sourceAnalysisFrame = receipt.coreSourceFrame;
    const numberAnalysisFrame = receipt.coreNumberFrame;
    const contextSelectionRecord = receipt.coreContextSelectionRecord;
    const internalPluralMorph = numberAnalysisFrame.internalPluralMorph;
    const internalPlural = internalPluralMorph === "n-inside-stem";
    if (!internalPlural && internalPluralMorph !== "none") {
      return blocked("pronominal-nnc-citation-internal-plural-analysis-unsupported");
    }
    let stem = "";
    let stemProjectionAction = "";
    if (numberAnalysisFrame.predicateStemAction === "identity") {
      stem = numberAnalysisFrame.predicateStem;
      stemProjectionAction = internalPlural
        ? "retain-internal-plural-stem-derivation"
        : "retain-canonical-predicate-stem";
    } else if (
      numberAnalysisFrame.predicateStemAction
        === "realize-long-quantitive-matrix-before-internal-plural-n"
      && internalPlural
    ) {
      stem = numberAnalysisFrame.predicateStem;
      stemProjectionAction = "retain-internal-plural-stem-derivation";
    } else if (
      numberAnalysisFrame.predicateStemAction
        === "realize-final-in-as-i-before-m-eh"
      && !internalPlural
      && sourceAnalysisFrame.structuralPluralType
        === "fused-in-to-i-plus-m-eh"
    ) {
      // The plural connector conditions -in as -i; it is not the distinct
      // derivational plural n of §16.1. Cite the retained compound constituent.
      stem = sourceAnalysisFrame.sourceStem;
      stemProjectionAction = "restore-final-in-before-plural-number-dyad";
    } else {
      return blocked("pronominal-nnc-citation-predicate-action-unsupported");
    }
    if (!normalizeStem(stem) || !numberAnalysisFrame.nounClass) {
      return blocked("pronominal-nnc-restricted-use-citation-stem-required");
    }
    // This projection is not a newly singular/common NNC. The plural n is
    // inside the derived stem (§§14.3, 16.1), and a later finite shell must
    // still obey that stem's plural subject-number requirement.
    const citationNumberConstraint = internalPlural ? "plural-only" : "class-governed";
    const projection = deepFreeze({
      kind: PRONOMINAL_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND,
      version: 1,
      authorizationStatus: "authorized",
      blockReason: "",
      canonicalResultFrame: resultFrame,
      canonicalSourceFrame: resultFrame.sourceFrame,
      canonicalOperationFrame: resultFrame.operationFrame,
      typedSlotFrame: resultFrame.typedSlotFrame,
      sourceAnalysisFrame,
      numberAnalysisFrame,
      contextSelectionRecord,
      stem,
      nounClass: numberAnalysisFrame.nounClass,
      useKind: "restricted-use",
      useShape: "base",
      sourcePredicateStem: numberAnalysisFrame.predicateStem,
      internalPluralMorph,
      citationNumberConstraint,
      stemProjectionAction,
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
    issuedPronominalRestrictedUseCitationProjectionReceipts.set(
      projection,
      Object.freeze({
        resultFrame,
        sourceAnalysisFrame,
        numberAnalysisFrame,
        contextSelectionRecord,
        stem,
        nounClass: numberAnalysisFrame.nounClass,
        internalPluralMorph,
        citationNumberConstraint,
        stemProjectionAction,
      }),
    );
    pronominalRestrictedUseCitationProjections.set(resultFrame, projection);
    return projection;
  }

  function isClassicalNahuatlPronominalNncRestrictedUseCitationProjection(
    frame = null,
  ) {
    const receipt = frame && typeof frame === "object"
      ? issuedPronominalRestrictedUseCitationProjectionReceipts.get(frame) : null;
    if (!receipt || !isClassicalNahuatlPronominalNncResult(receipt.resultFrame)) {
      return false;
    }
    const resultReceipt = issuedPronominalResultReceipts.get(receipt.resultFrame);
    return Boolean(
      hasCanonicalPronominalCitationAnalysis(receipt.resultFrame, resultReceipt)
      && frame.kind === PRONOMINAL_NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND
      && frame.version === 1
      && frame.authorizationStatus === "authorized"
      && frame.canonicalResultFrame === receipt.resultFrame
      && frame.canonicalSourceFrame === resultReceipt.sourceFrame
      && frame.canonicalOperationFrame === resultReceipt.operationFrame
      && frame.typedSlotFrame === resultReceipt.typedSlotFrame
      && frame.sourceAnalysisFrame === receipt.sourceAnalysisFrame
      && frame.sourceAnalysisFrame === resultReceipt.coreSourceFrame
      && frame.numberAnalysisFrame === receipt.numberAnalysisFrame
      && frame.numberAnalysisFrame === resultReceipt.coreNumberFrame
      && frame.contextSelectionRecord === receipt.contextSelectionRecord
      && frame.contextSelectionRecord === resultReceipt.coreContextSelectionRecord
      && frame.stem === receipt.stem
      && frame.nounClass === receipt.nounClass
      && frame.sourcePredicateStem === resultReceipt.coreNumberFrame.predicateStem
      && frame.internalPluralMorph === receipt.internalPluralMorph
      && frame.citationNumberConstraint === receipt.citationNumberConstraint
      && frame.stemProjectionAction === receipt.stemProjectionAction
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

  function getClassicalNahuatlNncContinuationSourceConstituents(
    resultFrame = null,
  ) {
    const ordinary = isClassicalNahuatlOrdinaryNncResult(resultFrame);
    const pronominal = isClassicalNahuatlPronominalNncResult(resultFrame);
    if (!ordinary && !pronominal) return null;
    const existing = continuationSourceProjections.get(resultFrame);
    if (existing) return existing;
    const sourceFrame = resultFrame.sourceFrame;
    const operationFrame = resultFrame.operationFrame;
    const constituentSourceFrame = pronominal && operationFrame.derivedSourceFrame
      ? operationFrame.derivedSourceFrame : sourceFrame;
    const typedSlotFrame = resultFrame.typedSlotFrame;
    const predicateStem = normalizeStem(
      typedSlotFrame?.slots?.predicate?.stem || "",
    );
    if (
      !predicateStem
      || typedSlotFrame?.authorizationStatus !== "authorized"
    ) {
      return null;
    }
    const sourceConstituents = constituentSourceFrame.sourceConstituents?.length
      ? constituentSourceFrame.sourceConstituents
      : [constituentSourceFrame.embedStem, constituentSourceFrame.matrixStem].some(Boolean)
        ? Object.freeze([
          constituentSourceFrame.embedStem || "",
          constituentSourceFrame.matrixStem || "",
        ].filter(Boolean))
        : Object.freeze([sourceFrame.stem]);
    const projection = deepFreeze({
      kind:
        "classical-nahuatl-nnc-result-source-constituent-projection",
      version: 1,
      clauseKind: "nominal-nuclear-clause",
      nncType: ordinary ? "ordinary" : "pronominal",
      canonicalResultFrame: resultFrame,
      canonicalSourceFrame: sourceFrame,
      canonicalDerivedSourceFrame: constituentSourceFrame !== sourceFrame ? constituentSourceFrame : null,
      canonicalOperationFrame: operationFrame,
      typedSlotFrame,
      sourceIdentityStem: sourceFrame.stem,
      predicateStem,
      sourceNounClass:
        constituentSourceFrame.nounClass || typedSlotFrame.nounClass || "",
      sourceUseShape: ordinary ? sourceFrame.useShape || "" : "",
      sourceSubclass: ordinary ? sourceFrame.subclass || "" : "",
      sourceReferentialAnimacy:
        ordinary ? sourceFrame.referentialAnimacy || "" : "",
      naturalPossessionPolicy:
        ordinary ? sourceFrame.naturalPossessionPolicy || "" : "",
      naturalPossessionSemantics:
        ordinary ? sourceFrame.naturalPossessionSemantics || "" : "",
      stateAvailability:
        ordinary ? sourceFrame.stateAvailability || "" : "",
      allowedStateValues:
        ordinary ? sourceFrame.allowedStateValues || Object.freeze([]) : Object.freeze([]),
      possessorCompatibility:
        ordinary ? sourceFrame.possessorCompatibility || "" : "",
      state: ordinary ? operationFrame.state : "absolutive",
      stateArity: typedSlotFrame.slots.state.arity,
      stateSlots: typedSlotFrame.slots.state.slots,
      subjectParticipantFrame:
        operationFrame.subjectParticipantFrame || null,
      possessor: ordinary ? operationFrame.possessor || "" : "",
      stemOperation: ordinary ? resultFrame.stemOperation : null,
      pronominalFamily:
        pronominal ? constituentSourceFrame.familyId || "" : "",
      sourceConstituentKinds:
        constituentSourceFrame.sourceConstituentKinds?.length
          ? constituentSourceFrame.sourceConstituentKinds
          : Object.freeze(
            sourceConstituents.length > 1
              ? ["nounstem-embed", "nounstem-matrix"]
              : ["nounstem"],
          ),
      sourceConstituents,
      projectionRole: "read-only-source-constituents",
      continuationMode: "licensed-operation-only",
      directSourceReentryAuthorized: false,
      grammarAuthority: false,
      callerSuppliedAuthorityAccepted: false,
      formulaStringAuthority: false,
      surfaceStringAuthority: false,
    });
    continuationSourceProjections.set(resultFrame, projection);
    return projection;
  }

  function getClassicalNahuatlNncRestrictedUseCitationProjection(
    resultFrame = null,
  ) {
    const blocked = (reason) => buildBlockedFrame(
      NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND,
      reason,
      { stem: "", nounClass: "", projectionRole: "read-only-source-constituents" },
    );
    if (!isClassicalNahuatlOrdinaryNncResult(resultFrame)) {
      return blocked("issued-authorized-ordinary-nnc-result-required");
    }
    const existing = restrictedUseCitationProjections.get(resultFrame);
    if (existing) return existing;
    const receipt = issuedResultReceipts.get(resultFrame);
    const sourceFrame = receipt.sourceFrame;
    const operationFrame = receipt.operationFrame;
    const sourceUseFrame = receipt.nounstemUseFrame;
    const sourceDerivedFrame = receipt.nounstemDerivedFrame;
    const sourceStemOperationRecord = receipt.stemOperationRecord;
    const nounClass = resultFrame.typedSlotFrame.nounClass;
    if (
      sourceUseFrame?.authorizationStatus !== "authorized"
      || sourceDerivedFrame?.authorizationStatus !== "authorized"
      || !normalizeStem(sourceUseFrame.selectedRestrictedUseStem)
      || sourceDerivedFrame.stemFormation !== operationFrame.stemFormation
      || typeof targetObject.isClassicalNahuatlStemOperationRecord !== "function"
      || !targetObject.isClassicalNahuatlStemOperationRecord(sourceStemOperationRecord)
    ) {
      return blocked("ordinary-nnc-canonical-use-stem-analysis-required");
    }

    let stem = "";
    let citationDerivedStemFrame = null;
    let citationStemOperationRecord = sourceStemOperationRecord;
    const includedPredicateFrame = receipt.adjectivalPredicateFrame;
    if (includedPredicateFrame?.kind === "classical-nahuatl-included-possessive-predicate-frame") {
      if (includedPredicateFrame.sourceFrame !== sourceFrame
        || includedPredicateFrame.operationFrame !== operationFrame
        || includedPredicateFrame.targetStem !== resultFrame.typedSlotFrame.slots.predicate.stem) {
        return blocked("issued-included-predicate-source-operation-required");
      }
      // §40.2.3 downgrades the actual inner predicate. Its state carriers
      // remain inside the use stem, independently of the outer dyad.
      stem = includedPredicateFrame.targetStem;
    } else if (sourceStemOperationRecord.operation === "regular") {
      if (typeof targetObject.buildClassicalNahuatlDerivedStemFrame !== "function") {
        return blocked("ordinary-nnc-citation-derived-stem-capability-required");
      }
      // This is a use-stem projection, not a new singular/common NNC. Keep
      // the original relation and reference while deriving the restricted
      // counterpart, before any clause-number boundary changes its shape.
      citationDerivedStemFrame = targetObject.buildClassicalNahuatlDerivedStemFrame(
        sourceUseFrame.selectedRestrictedUseStem,
        {
          stemFormation: operationFrame.stemFormation,
          subject: operationFrame.subject,
          animacy: operationFrame.referentialAnimacy,
        },
      );
      if (
        citationDerivedStemFrame?.authorizationStatus !== "authorized"
        || nounClass !== sourceUseFrame.nounClass
      ) {
        return blocked(citationDerivedStemFrame?.blockReason
          || "ordinary-nnc-citation-derived-stem-analysis-required");
      }
      stem = normalizeStem(citationDerivedStemFrame.derivedStem);
    } else {
      if (
        typeof targetObject.getClassicalNahuatlPredicateOptionContract !== "function"
        || typeof targetObject.buildClassicalNahuatlStemOperationRecord !== "function"
      ) {
        return blocked("ordinary-nnc-citation-predicate-operation-capability-required");
      }
      const predicateOptionId = operationFrame.sourceClassPredicateOptionId
        || operationFrame.predicateFormation;
      const citationContext = {
        selectedState: "absolutive",
        subject: operationFrame.subject,
        possessor: operationFrame.possessor,
        nounClass: sourceStemOperationRecord.sourceNounClass,
        useShape: sourceStemOperationRecord.sourceUseShape,
        subclass: sourceStemOperationRecord.sourceSubclass,
        stemFormation: sourceStemOperationRecord.sourceStemFormation,
        secondaryPossessorCarrier: sourceStemOperationRecord.secondaryPossessorCarrier,
      };
      // The canonical operation must have a restricted-use counterpart.
      // In particular, a possessive-only secondary or suppletive predicate
      // must not be silently replaced by its original lexical Source.
      const contract = targetObject.getClassicalNahuatlPredicateOptionContract(
        sourceFrame.stem, citationContext,
      );
      const option = contract?.options?.find((candidate) => (
        candidate.optionId === predicateOptionId
        && candidate.operation === sourceStemOperationRecord.operation
      ));
      if (contract?.authorizationStatus !== "authorized" || !option) {
        return blocked("ordinary-nnc-selected-predicate-has-no-restricted-use-counterpart");
      }
      citationStemOperationRecord = targetObject.buildClassicalNahuatlStemOperationRecord(
        sourceFrame.stem,
        {
          ...citationContext,
          operation: sourceStemOperationRecord.operation,
          predicateOptionId,
          selectionAuthority: sourceStemOperationRecord.selectionAuthority,
          suppletiveConnector: sourceStemOperationRecord.suppletiveConnector,
        },
      );
      if (
        !targetObject.isClassicalNahuatlStemOperationRecord(citationStemOperationRecord)
        || citationStemOperationRecord.targetNounClass !== nounClass
        || citationStemOperationRecord.operation !== sourceStemOperationRecord.operation
        || citationStemOperationRecord.sourceStemFormation !== operationFrame.stemFormation
      ) {
        return blocked(citationStemOperationRecord?.blockReason
          || "ordinary-nnc-citation-predicate-counterpart-analysis-required");
      }
      stem = normalizeStem(citationStemOperationRecord.targetStem);
    }
    if (!stem || !nounClass) {
      return blocked("ordinary-nnc-restricted-use-citation-stem-required");
    }
    const projection = deepFreeze({
      kind: NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND,
      version: 1,
      authorizationStatus: "authorized",
      blockReason: "",
      canonicalResultFrame: resultFrame,
      canonicalSourceFrame: sourceFrame,
      canonicalOperationFrame: operationFrame,
      typedSlotFrame: resultFrame.typedSlotFrame,
      stem,
      nounClass,
      useKind: "restricted-use",
      useShape: "base",
      includedPredicateFrame: includedPredicateFrame || null,
      sourcePredicateStem: resultFrame.typedSlotFrame.slots.predicate.stem,
      sourceUseKind: sourceUseFrame.selectedUseKind,
      sourceUseFrame,
      sourceDerivedFrame,
      sourceStemOperationRecord,
      citationDerivedStemFrame,
      citationStemOperationRecord,
      sourceStemFormation: operationFrame.stemFormation,
      sourcePredicateFormation: operationFrame.predicateFormation,
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
    issuedRestrictedUseCitationProjectionReceipts.set(projection, Object.freeze({
      resultFrame, stem, nounClass,
      sourceUseFrame, sourceDerivedFrame, sourceStemOperationRecord,
      citationDerivedStemFrame, citationStemOperationRecord,
    }));
    restrictedUseCitationProjections.set(resultFrame, projection);
    return projection;
  }

  function isClassicalNahuatlNncRestrictedUseCitationProjection(frame = null) {
    const receipt = frame && typeof frame === "object"
      ? issuedRestrictedUseCitationProjectionReceipts.get(frame) : null;
    return Boolean(
      receipt
      && frame.kind === NNC_RESTRICTED_USE_CITATION_PROJECTION_KIND
      && frame.version === 1
      && frame.authorizationStatus === "authorized"
      && frame.canonicalResultFrame === receipt.resultFrame
      && isClassicalNahuatlOrdinaryNncResult(receipt.resultFrame)
      && frame.canonicalSourceFrame === receipt.resultFrame.sourceFrame
      && frame.canonicalOperationFrame === receipt.resultFrame.operationFrame
      && frame.typedSlotFrame === receipt.resultFrame.typedSlotFrame
      && frame.stem === receipt.stem
      && frame.nounClass === receipt.nounClass
      && frame.sourceUseFrame === receipt.sourceUseFrame
      && frame.sourceDerivedFrame === receipt.sourceDerivedFrame
      && frame.sourceStemOperationRecord === receipt.sourceStemOperationRecord
      && frame.citationDerivedStemFrame === receipt.citationDerivedStemFrame
      && frame.citationStemOperationRecord === receipt.citationStemOperationRecord
      && frame.useKind === "restricted-use"
      && frame.useShape === "base"
      && frame.sourceAgreementChanged === false
      && frame.sourceReferenceChanged === false
      && frame.sourceDerivationChanged === false
      && frame.directSourceReentryAuthorized === false
      && frame.grammarAuthority === false
      && frame.callerSuppliedAuthorityAccepted === false
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
    let firstScalarBlockReason = "";
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
        if (!isClassicalNahuatlPronominalNncResult(scalarProbe)) {
          if (!firstScalarBlockReason) {
            firstScalarBlockReason = scalarProbe?.blockReason
              || "pronominal-nnc-paradigm-scalar-not-authorized";
          }
          return;
        }
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
    if (!blockReason && !coordinates.length) {
      blockReason = firstScalarBlockReason
        || "pronominal-nnc-paradigm-no-authorized-coordinates";
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
    ...createClassicalQuantitativePredicateApi(),
    ...createAttestedNncCellApi(targetObject),
    ...createAttestedPlaceApi(),
    ...createAttestedPrincipalCollocationApi(),
    buildClassicalNahuatlOrdinaryNncSourceFrame,
    isClassicalNahuatlOrdinaryNncSourceFrame,
    buildClassicalNahuatlNncOperationSelectionFrame,
    buildClassicalNahuatlOrdinaryNncOperationFrame,
    isClassicalNahuatlOrdinaryNncOperationFrame,
    evaluateClassicalNahuatlOrdinaryNnc,
    isClassicalNahuatlOrdinaryNncResult,
    getClassicalNahuatlOrdinaryNncResultForTypedSlotFrame,
    getClassicalNahuatlOrdinaryNncReinflectionContext,
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
    getClassicalNahuatlNncContinuationSourceConstituents,
    getClassicalNahuatlNncRestrictedUseCitationProjection,
    isClassicalNahuatlNncRestrictedUseCitationProjection,
    getClassicalNahuatlPronominalNncRestrictedUseCitationProjection,
    isClassicalNahuatlPronominalNncRestrictedUseCitationProjection,
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
