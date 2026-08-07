const REGISTRY_KIND = "classical-sgr-proof-route-recipe-registry";
const REGISTRY_VERSION = 1;

function deepFreeze(value) {
  if (Array.isArray(value)) {
    value.forEach(deepFreeze);
    return Object.freeze(value);
  }
  if (!value || typeof value !== "object") return value;
  Object.values(value).forEach(deepFreeze);
  return Object.freeze(value);
}

function choice(controlKey, value) {
  return { controlKey, value };
}

function ownerOption(...allTokens) {
  return { selectionKind: "owner-option-match", allTokens };
}

const VNC_CORE_OPERATIONS = Object.freeze([
  "concept:classification",
  "vnc:application",
  "vnc:diagram",
  "vnc:finite-slot",
  "vnc:finite-surface",
  "vnc:nuclear-clause",
  "vnc:sentence-result",
  "vnc:source-selection",
  "vnc:verbstem-class",
]);

const VNC_TRANSITIVE_OPERATIONS = Object.freeze([
  ...VNC_CORE_OPERATIONS,
  "vnc:transitive-object",
]);

const PRESETS = [
  {
    presetId: "transcription-source",
    order: 1,
    actions: ["open-transcription-source"],
  },
  {
    presetId: "vnc-intransitive-single",
    order: 2,
    basalUnit: "vnc",
    sourceMode: "whole-stem",
    derivationType: "direct",
    selections: [
      choice("classical-rule-logic-vnc-output-scope", "single"),
      choice("classical-construction-operation", "none"),
      choice("classical-rule-logic-late-operation", "none"),
      choice("classical-rule-logic-late-variant", ""),
      choice("classical-rule-logic-vnc-voice", "active"),
      choice("classical-rule-logic-class", "A"),
      choice("classical-rule-logic-valence", "intransitive"),
      choice("classical-rule-logic-subject", "3sg"),
      choice("classical-rule-logic-mood", "indicative"),
      choice("classical-rule-logic-tense", "present"),
    ],
  },
  {
    presetId: "vnc-transitive-single",
    order: 3,
    basalUnit: "vnc",
    sourceMode: "whole-stem",
    derivationType: "direct",
    selections: [
      choice("classical-rule-logic-vnc-output-scope", "single"),
      choice("classical-construction-operation", "none"),
      choice("classical-rule-logic-late-operation", "none"),
      choice("classical-rule-logic-late-variant", ""),
      choice("classical-rule-logic-vnc-voice", "active"),
      choice("classical-rule-logic-class", "A"),
      choice("classical-rule-logic-valence", "specific-projective"),
      choice("classical-rule-logic-subject", "3sg"),
      choice("classical-rule-logic-object", "specific-projective:3sg"),
      choice("classical-rule-logic-mood", "indicative"),
      choice("classical-rule-logic-tense", "present"),
    ],
  },
  {
    presetId: "vnc-transitive-paradigm",
    order: 4,
    basalUnit: "vnc",
    sourceMode: "whole-stem",
    derivationType: "direct",
    selections: [
      choice("classical-rule-logic-vnc-output-scope", "paradigm"),
      choice("classical-construction-operation", "none"),
      choice("classical-rule-logic-late-operation", "none"),
      choice("classical-rule-logic-vnc-voice", "active"),
      choice("classical-rule-logic-class", "A"),
      choice("classical-rule-logic-valence", "specific-projective"),
      choice("classical-rule-logic-subject", "3sg"),
      choice("classical-rule-logic-object", "specific-projective:3sg"),
      choice("classical-rule-logic-mood", "indicative"),
      choice("classical-rule-logic-tense", "present"),
    ],
  },
  {
    presetId: "nnc-ordinary-single",
    order: 5,
    basalUnit: "nnc",
    sourceMode: "whole-stem",
    derivationType: "direct",
    selections: [
      choice("classical-rule-logic-nnc-output-scope", "single"),
      choice("classical-nnc-source-example", ""),
      choice("classical-construction-operation", "none"),
      choice("classical-rule-logic-nnc-subject-person", "3"),
      choice("classical-rule-logic-nnc-subject-animacy", "nonanimate"),
      choice("classical-rule-logic-nnc-subject-number", "common"),
      choice("classical-rule-logic-nnc-state", "absolutive"),
      choice("classical-rule-logic-nnc-predicate-form", "source-stem"),
      choice("classical-rule-logic-nnc-stem-relation", "plain"),
      choice("polarity", "positive"),
      choice("classical-rule-logic-sentence-surface", "statement"),
    ],
  },
  {
    presetId: "nnc-ordinary-paradigm",
    order: 6,
    basalUnit: "nnc",
    sourceMode: "whole-stem",
    derivationType: "direct",
    selections: [
      choice("classical-rule-logic-nnc-output-scope", "paradigm"),
      choice("classical-nnc-source-example", ""),
      choice("classical-construction-operation", "none"),
      choice("classical-rule-logic-nnc-subject-person", "3"),
      choice("classical-rule-logic-nnc-subject-animacy", "nonanimate"),
      choice("classical-rule-logic-nnc-subject-number", "common"),
      choice("classical-rule-logic-nnc-state", "absolutive"),
      choice("classical-rule-logic-nnc-predicate-form", "source-stem"),
      choice("classical-rule-logic-nnc-stem-relation", "plain"),
      choice("polarity", "positive"),
      choice("classical-rule-logic-sentence-surface", "statement"),
    ],
  },
];

const FAMILIES = [
  {
    familyId: "vnc-base",
    order: 1,
    routeDriver: "source-grammar-result-generation",
    providesOperationIds: [
      "concept:classification",
      "orthography:transcription",
      "vnc:application",
      "vnc:diagram",
      "vnc:finite-slot",
      "vnc:finite-surface",
      "vnc:nuclear-clause",
      "vnc:sentence-result",
      "vnc:source-selection",
      "vnc:transitive-object",
      "vnc:verbstem-class",
    ],
    dependsOnFamilyIds: [],
    cases: [
      {
        caseId: "vnc-base/intransitive-scalar",
        order: 1,
        presetId: "vnc-intransitive-single",
        activatesOperationIds: [...VNC_CORE_OPERATIONS],
        source: { mode: "whole-stem", fields: { whole: "chōca" } },
        actions: ["apply-source"],
      },
      {
        caseId: "vnc-base/transitive-scalar",
        order: 2,
        presetId: "vnc-transitive-single",
        activatesOperationIds: [...VNC_TRANSITIVE_OPERATIONS],
        source: { mode: "whole-stem", fields: { whole: "chihua" } },
        actions: ["apply-source"],
      },
      {
        caseId: "vnc-base/transitive-paradigm",
        order: 3,
        presetId: "vnc-transitive-paradigm",
        activatesOperationIds: [...VNC_TRANSITIVE_OPERATIONS],
        source: { mode: "whole-stem", fields: { whole: "chihua" } },
        actions: ["apply-source"],
      },
      {
        caseId: "vnc-base/embed-matrix-scalar",
        order: 4,
        presetId: "vnc-intransitive-single",
        activatesOperationIds: ["vnc:source-selection", "vnc:application"],
        source: {
          mode: "embed-matrix",
          fields: { embed: "huel", matrix: "mati" },
        },
        selections: [
          choice("classical-construction-operation", "none"),
          choice("classical-rule-logic-class", "A"),
          choice("classical-rule-logic-valence", "projective-nonhuman"),
          choice("classical-rule-logic-subject", "1sg"),
          choice("classical-rule-logic-mood", "indicative"),
          choice("classical-rule-logic-tense", "present"),
        ],
        actions: ["apply-source"],
      },
      {
        caseId: "vnc-base/orthography-token-156",
        order: 5,
        driver: "transcription-source-application",
        presetId: "transcription-source",
        activatesOperationIds: ["orthography:transcription"],
        source: {
          mode: "phonological-segments",
          fields: { transcription: "/k/ a /l/" },
        },
        actions: ["apply-transcription-source"],
      },
    ],
  },
  {
    familyId: "vnc-late-derivation",
    order: 2,
    routeDriver: "source-grammar-result-generation",
    providesOperationIds: ["vnc:derivational-operation"],
    dependsOnFamilyIds: ["vnc-base"],
    cases: [
      {
        caseId: "vnc-late-derivation/frequentative",
        order: 1,
        presetId: "vnc-intransitive-single",
        activatesOperationIds: ["vnc:derivational-operation"],
        source: { mode: "whole-stem", fields: { whole: "chōca" } },
        selections: [
          choice("classical-rule-logic-late-operation", "frequentative"),
          choice("classical-rule-logic-late-variant", "ordinary-long"),
          choice("classical-rule-logic-frequentative-repetitions", "2"),
        ],
        actions: ["apply-source"],
      },
    ],
  },
  {
    familyId: "vnc-ordered-voice",
    order: 3,
    routeDriver: "source-grammar-result-generation",
    providesOperationIds: [
      "vnc:ordered-voice-application",
      "vnc:ordered-voice-chain",
    ],
    dependsOnFamilyIds: ["vnc-base"],
    cases: [
      {
        caseId: "vnc-ordered-voice/layer-two",
        order: 1,
        presetId: "vnc-intransitive-single",
        activatesOperationIds: [
          "vnc:ordered-voice-application",
          "vnc:ordered-voice-chain",
        ],
        source: { mode: "whole-stem", fields: { whole: "yohua" } },
        selections: [
          choice("classical-rule-logic-subject", "1sg"),
          choice("classical-rule-logic-vnc-voice", "impersonal"),
          choice("classical-rule-logic-nonactive-family", "inherent-impersonal"),
          choice("classical-rule-logic-voice-layer-2", "tla-impersonal"),
        ],
        actions: ["apply-source"],
      },
      {
        caseId: "vnc-ordered-voice/layer-three",
        order: 2,
        presetId: "vnc-intransitive-single",
        activatesOperationIds: [
          "vnc:ordered-voice-application",
          "vnc:ordered-voice-chain",
        ],
        source: { mode: "whole-stem", fields: { whole: "yohua" } },
        selections: [
          choice("classical-rule-logic-subject", "1sg"),
          choice("classical-rule-logic-vnc-voice", "impersonal"),
          choice("classical-rule-logic-nonactive-family", "inherent-impersonal"),
          choice("classical-rule-logic-voice-layer-2", "tla-impersonal"),
          choice("classical-rule-logic-voice-layer-3", "nonactive-lō"),
        ],
        actions: ["apply-source"],
      },
    ],
  },
  {
    familyId: "vnc-denominal",
    order: 4,
    routeDriver: "source-grammar-result-generation",
    providesOperationIds: ["vnc:denominal"],
    dependsOnFamilyIds: ["vnc-base"],
    cases: [
      {
        caseId: "vnc-denominal/scalar",
        order: 1,
        presetId: "nnc-ordinary-single",
        activatesOperationIds: ["vnc:denominal"],
        source: { mode: "whole-stem", fields: { whole: "cuica" } },
        selections: [
          choice("classical-rule-logic-vnc-output-scope", "single"),
          choice("classical-construction-operation", "denominal-vnc"),
          choice("classical-denominal-vnc-operation", "ti-ia-applicative"),
          choice(
            "classical-denominal-vnc-operation-path",
            ownerOption("possession-ti:A", "ti-ia-applicative:C"),
          ),
        ],
        actions: ["apply-source"],
      },
      {
        caseId: "vnc-denominal/paradigm",
        order: 2,
        presetId: "nnc-ordinary-paradigm",
        activatesOperationIds: ["vnc:denominal"],
        source: { mode: "whole-stem", fields: { whole: "cuica" } },
        selections: [
          choice("classical-rule-logic-vnc-output-scope", "paradigm"),
          choice("classical-construction-operation", "denominal-vnc"),
          choice("classical-denominal-vnc-operation", "ti-ia-applicative"),
          choice(
            "classical-denominal-vnc-operation-path",
            ownerOption("possession-ti:A", "ti-ia-applicative:C"),
          ),
        ],
        actions: ["apply-source"],
      },
    ],
  },
  {
    familyId: "nnc-base",
    order: 5,
    routeDriver: "source-grammar-result-generation",
    providesOperationIds: [
      "nnc:diagram",
      "nnc:ordinary",
      "nnc:sentence-surface",
    ],
    dependsOnFamilyIds: [],
    cases: [
      {
        caseId: "nnc-base/ordinary-scalar",
        order: 1,
        presetId: "nnc-ordinary-single",
        alwaysObserve: true,
        activatesOperationIds: [
          "nnc:diagram",
          "nnc:ordinary",
          "nnc:sentence-surface",
        ],
        source: { mode: "whole-stem", fields: { whole: "nemi" } },
        preSelectionActions: ["apply-source"],
        selections: [
          choice("classical-rule-logic-nnc-class", "zero"),
          choice("classical-rule-logic-nnc-state", "absolutive"),
        ],
      },
      {
        caseId: "nnc-base/possessive-pil-reduplication",
        order: 2,
        presetId: "nnc-ordinary-single",
        alwaysObserve: true,
        activatesOperationIds: ["nnc:ordinary", "nnc:sentence-surface"],
        source: { mode: "whole-stem", fields: { whole: "pil" } },
        preSelectionActions: ["apply-source"],
        selections: [
          choice("classical-rule-logic-nnc-subject-animacy", "animate"),
          choice("classical-rule-logic-nnc-subject-number", "plural"),
          choice("classical-rule-logic-nnc-state", "possessive"),
          choice("classical-rule-logic-nnc-possessor-reduplication", true),
          choice("classical-rule-logic-nnc-possessor", "1sg"),
        ],
      },
      {
        caseId: "nnc-base/ordinary-paradigm",
        order: 3,
        presetId: "nnc-ordinary-paradigm",
        activatesOperationIds: ["nnc:diagram", "nnc:ordinary"],
        source: { mode: "whole-stem", fields: { whole: "cal" } },
        actions: ["apply-source"],
      },
    ],
  },
  {
    familyId: "nnc-pronominal",
    order: 6,
    routeDriver: "source-grammar-result-generation",
    providesOperationIds: ["nnc:pronominal"],
    dependsOnFamilyIds: ["nnc-base"],
    cases: [
      {
        caseId: "nnc-pronominal/personal-scalar",
        order: 1,
        presetId: "nnc-ordinary-single",
        activatesOperationIds: ["nnc:pronominal"],
        selections: [
          choice("classical-rule-logic-nnc-output-scope", "single"),
          choice("classical-nnc-source-example", "yeh"),
          choice("classical-rule-logic-nnc-subject-person", "3"),
          choice("classical-rule-logic-nnc-subject-animacy", "animate"),
          choice("classical-rule-logic-nnc-subject-number", "singular"),
          choice("classical-rule-logic-nnc-state", "absolutive"),
          choice("classical-rule-logic-nnc-clause-position", "initial"),
          choice("classical-rule-logic-sentence-surface", "statement"),
          choice("polarity", "positive"),
        ],
        actions: ["apply-source"],
      },
      {
        caseId: "nnc-pronominal/quantitive-scalar",
        order: 2,
        presetId: "nnc-ordinary-single",
        activatesOperationIds: ["nnc:pronominal"],
        selections: [
          choice("classical-nnc-source-example", "ix-qui-ch"),
          choice("classical-rule-logic-nnc-subject-number", "common"),
        ],
      },
      {
        caseId: "nnc-pronominal/personal-paradigm",
        order: 3,
        presetId: "nnc-ordinary-paradigm",
        activatesOperationIds: ["nnc:pronominal"],
        selections: [
          choice("classical-nnc-source-example", "yeh"),
          choice("classical-rule-logic-nnc-subject-animacy", "animate"),
          choice("classical-rule-logic-nnc-subject-number", "singular"),
        ],
        actions: ["apply-source"],
      },
    ],
  },
  {
    familyId: "nominal-construction",
    order: 7,
    routeDriver: "source-grammar-result-generation",
    providesOperationIds: ["grammar:nominal-construction"],
    dependsOnFamilyIds: ["vnc-base", "nnc-base"],
    cases: [
      {
        caseId: "nominal-construction/embed",
        order: 1,
        presetId: "vnc-transitive-single",
        activatesOperationIds: ["grammar:nominal-construction"],
        source: { mode: "embed-matrix", fields: { embed: "ā", matrix: "ī" } },
        selections: [
          choice("classical-construction-operation", "nominal-embed-vnc"),
          choice("classical-nominal-embed-role", "object"),
        ],
        actions: ["apply-source"],
      },
      {
        caseId: "nominal-construction/compound",
        order: 2,
        presetId: "nnc-ordinary-single",
        activatesOperationIds: ["grammar:nominal-construction"],
        selections: [
          choice("classical-nnc-source-example", "tle-māi"),
          choice("classical-construction-operation", "compound-nnc"),
          choice("classical-compound-nnc-structure", "integrated"),
          choice("classical-compound-nnc-bracketing", "unambiguous"),
          choice("classical-compound-nnc-embed-role", "association"),
          choice("classical-construction-reduplication", "none"),
        ],
        actions: ["apply-source"],
      },
      {
        caseId: "nominal-construction/affective",
        order: 3,
        presetId: "nnc-ordinary-single",
        activatesOperationIds: ["grammar:nominal-construction"],
        selections: [
          choice("classical-nnc-source-example", "pil"),
          choice("classical-construction-operation", "affective-nnc"),
          choice("classical-affective-target-kind", "nnc"),
          choice("classical-affective-route", "compound"),
          choice("classical-affective-matrix", "tzin"),
          choice("classical-affective-semantic-reading", "ordinary-affective"),
        ],
        actions: ["apply-source"],
      },
      {
        caseId: "nominal-construction/cardinal",
        order: 4,
        presetId: "nnc-ordinary-single",
        activatesOperationIds: ["grammar:nominal-construction"],
        source: { mode: "whole-stem", fields: { whole: "cal" } },
        selections: [
          choice("classical-construction-operation", "cardinal-numeral-nnc"),
          choice("classical-cardinal-value", "3"),
          choice("classical-cardinal-target-kind", "nnc"),
          choice("classical-cardinal-modifier", "none"),
          choice("classical-cardinal-count-kind", "ordinary"),
          choice("classical-cardinal-classifier", "basic"),
        ],
        actions: ["apply-source", "show-nnc-paradigm"],
      },
      {
        caseId: "nominal-construction/measure",
        order: 5,
        presetId: "nnc-ordinary-single",
        alwaysObserve: true,
        activatesOperationIds: ["grammar:nominal-construction"],
        source: {
          mode: "embed-matrix",
          fields: { embed: "tlacuā-l", matrix: "tla-māma-l" },
        },
        preSelectionActions: ["apply-source"],
        selections: [
          choice("classical-construction-operation", "cardinal-numeral-nnc"),
          choice("classical-cardinal-value", "1"),
          choice("classical-cardinal-target-kind", "nnc"),
          choice("classical-cardinal-modifier", "none"),
          choice("classical-cardinal-count-kind", "ordinary"),
          choice("classical-cardinal-classifier", "measure"),
          choice("classical-rule-logic-nnc-class", "tli"),
          choice("classical-cardinal-measure-composition", "with-measured-nnc"),
        ],
        actions: ["apply-source"],
      },
    ],
  },
  {
    familyId: "specialized-nnc",
    order: 8,
    routeDriver: "source-grammar-result-generation",
    providesOperationIds: [
      "nnc:adverbial",
      "nnc:deverbal-construction",
      "nnc:personal-name",
      "nnc:place-gentilic",
      "nnc:relational",
    ],
    dependsOnFamilyIds: ["vnc-base", "nnc-base"],
    cases: [
      {
        caseId: "specialized-nnc/deverbal-predicate",
        order: 1,
        presetId: "vnc-intransitive-single",
        activatesOperationIds: ["nnc:deverbal-construction"],
        source: { mode: "whole-stem", fields: { whole: "pix-ca" } },
        selections: [
          choice("classical-construction-operation", "deverbal-nnc"),
          choice("classical-deverbal-nnc-family", "predicate-nominalization"),
          choice("classical-deverbal-nnc-nominalization-kind", "preterit-agentive"),
          choice("classical-rule-logic-valence", "projective-human"),
          choice("classical-deverbal-nnc-activated-object-person", "1sg"),
        ],
        actions: ["apply-source", "show-nnc-paradigm"],
      },
      {
        caseId: "specialized-nnc/deverbal-patientive",
        order: 2,
        presetId: "vnc-intransitive-single",
        activatesOperationIds: ["nnc:deverbal-construction"],
        source: { mode: "whole-stem", fields: { whole: "cual-ā-ni" } },
        selections: [
          choice("classical-construction-operation", "deverbal-nnc"),
          choice("classical-deverbal-nnc-family", "patientive"),
          choice("classical-deverbal-nnc-patientive-family", "root-or-stock"),
          choice("classical-deverbal-nnc-root-stock-allomorph", "x"),
        ],
        actions: ["apply-source"],
      },
      {
        caseId: "specialized-nnc/adverbial-context",
        order: 3,
        presetId: "nnc-ordinary-single",
        activatesOperationIds: ["nnc:adverbial"],
        source: { mode: "whole-stem", fields: { whole: "mō" } },
        selections: [
          choice("classical-construction-operation", "adverbial-nuclear"),
          choice("classical-adverbial-scope", "external-clause"),
          choice("classical-adverbial-clause-type", "subordinate"),
        ],
        actions: ["apply-source", "show-nnc-paradigm"],
      },
      {
        caseId: "specialized-nnc/place-gentilic",
        order: 4,
        presetId: "nnc-ordinary-single",
        activatesOperationIds: ["nnc:place-gentilic"],
        source: { mode: "whole-stem", fields: { whole: "Huexō-tlah" } },
        selections: [
          choice("classical-construction-operation", "place-gentilic-nnc"),
          choice("classical-place-gentilic-result-kind", "gentilic"),
          choice("classical-place-gentilic-formation", "ca-full-place"),
          choice("classical-rule-logic-subject", "1sg"),
          choice("classical-rule-logic-nnc-subject-animacy", "animate"),
        ],
        actions: ["apply-source", "show-nnc-paradigm"],
      },
      {
        caseId: "specialized-nnc/place-title",
        order: 5,
        presetId: "nnc-ordinary-single",
        activatesOperationIds: ["nnc:place-gentilic"],
        source: { mode: "whole-stem", fields: { whole: "Huexō-tlah" } },
        selections: [
          choice("classical-construction-operation", "place-gentilic-nnc"),
          choice("classical-place-gentilic-result-kind", "profession-place-association"),
          choice("classical-place-gentilic-lexical-record", "tlacochcalcatl"),
          choice("classical-rule-logic-subject", "1sg"),
          choice("classical-rule-logic-nnc-subject-animacy", "animate"),
        ],
        actions: ["apply-source"],
      },
      {
        caseId: "specialized-nnc/place-profession",
        order: 6,
        presetId: "nnc-ordinary-single",
        activatesOperationIds: ["nnc:place-gentilic"],
        source: { mode: "whole-stem", fields: { whole: "Huexō-tlah" } },
        selections: [
          choice("classical-construction-operation", "place-gentilic-nnc"),
          choice("classical-place-gentilic-result-kind", "profession-place-association"),
          choice("classical-place-gentilic-lexical-record", "toltec-craftsman"),
          choice("classical-rule-logic-subject", "1sg"),
          choice("classical-rule-logic-nnc-subject-animacy", "animate"),
        ],
        actions: ["apply-source"],
      },
      {
        caseId: "specialized-nnc/relational",
        order: 7,
        presetId: "nnc-ordinary-single",
        activatesOperationIds: ["nnc:relational"],
        selections: [
          choice("classical-nnc-source-example", "relational:tlan-bottom"),
          choice("classical-relational-nnc-operation", "relational-nnc"),
          choice("classical-relational-nnc-option", "option-two"),
          choice("classical-relational-nnc-state", "possessive"),
          choice("classical-relational-nnc-possessor", "3sg"),
          choice("classical-relational-nnc-subject-mode", "adverbialized"),
        ],
        actions: ["apply-source"],
      },
      {
        caseId: "specialized-nnc/personal-name",
        order: 8,
        presetId: "nnc-ordinary-single",
        activatesOperationIds: ["nnc:personal-name"],
        source: { mode: "whole-stem", fields: { whole: "Temō-Ø" } },
        selections: [
          choice("classical-construction-operation", "personal-name-nnc"),
          choice("classical-personal-name-source-family", "preterit-agentive"),
          choice("classical-rule-logic-subject", "2sg"),
          choice("classical-rule-logic-nnc-subject-animacy", "animate"),
          choice("classical-rule-logic-nnc-subject-number", "singular"),
          choice("classical-personal-name-sentence-operation", "sentence-name-use"),
        ],
        actions: ["apply-source"],
      },
      {
        caseId: "specialized-nnc/deverbal-double-nucleus",
        order: 9,
        presetId: "vnc-intransitive-single",
        activatesOperationIds: ["nnc:deverbal-construction"],
        source: {
          mode: "embed-matrix",
          fields: { embed: "ā", matrix: "yō" },
        },
        selections: [
          choice("classical-construction-operation", "deverbal-nnc"),
          choice("classical-deverbal-nnc-family", "double-nucleus-ownerhood"),
        ],
        actions: ["apply-source"],
      },
      {
        caseId: "specialized-nnc/relational-paradigm",
        order: 10,
        presetId: "nnc-ordinary-single",
        activatesOperationIds: ["nnc:relational"],
        selections: [
          choice("classical-nnc-source-example", "relational:tlan-bottom"),
          choice("classical-relational-nnc-operation", "relational-nnc"),
          choice("classical-relational-nnc-option", "option-two"),
          choice("classical-relational-nnc-state", "absolutive"),
          choice("classical-relational-nnc-subject-mode", "adverbialized"),
        ],
        actions: ["apply-source", "show-nnc-paradigm"],
      },
      {
        caseId: "specialized-nnc/personal-name-paradigm",
        order: 11,
        presetId: "nnc-ordinary-single",
        activatesOperationIds: ["nnc:personal-name"],
        source: { mode: "whole-stem", fields: { whole: "Temō-Ø" } },
        selections: [
          choice("classical-construction-operation", "personal-name-nnc"),
          choice("classical-personal-name-source-family", "preterit-agentive"),
          choice("classical-rule-logic-subject", "2sg"),
          choice("classical-personal-name-sentence-operation", "sentence-name-use"),
        ],
        actions: ["apply-source", "show-nnc-paradigm"],
      },
    ],
  },
  {
    familyId: "sentence-layers",
    order: 9,
    routeDriver: "sentence-layer-application",
    providesOperationIds: [
      "particle:result",
      "sentence:adverbial-adjunction",
      "sentence:particle-adjunction",
    ],
    dependsOnFamilyIds: ["vnc-base"],
    cases: [
      {
        caseId: "sentence-layers/particle-and-adverbial",
        order: 1,
        presetId: "vnc-intransitive-single",
        activatesOperationIds: [
          "particle:result",
          "sentence:adverbial-adjunction",
          "sentence:particle-adjunction",
        ],
        source: { mode: "whole-stem", fields: { whole: "chōca" } },
        selections: [
          choice("classical-rule-logic-sentence-particle", "l3-auh-conjunctor"),
          choice("classical-rule-logic-sentence-particle-honorific", true),
          choice("classical-rule-logic-sentence-adverbial", "l3-oc"),
        ],
        actions: ["apply-source"],
      },
    ],
  },
  {
    familyId: "clause-relations",
    order: 10,
    routeDriver: "captured-clause-composition",
    providesOperationIds: [
      "clause:adverbial-adjunction",
      "clause:comparison",
      "clause:composition",
      "nnc:adjectival-modification",
      "sentence:supplementation",
    ],
    dependsOnFamilyIds: [
      "vnc-base",
      "nnc-base",
      "nnc-pronominal",
      "nominal-construction",
    ],
    cases: [
      {
        caseId: "clause-relations/adjectival",
        order: 1,
        activatesOperationIds: ["nnc:adjectival-modification"],
        participants: [
          { role: "principal", fixtureCaseId: "nnc-base/ordinary-scalar" },
          { role: "adjoined", fixtureCaseId: "nnc-base/ordinary-scalar" },
        ],
        selections: [
          choice("relation", "adjectival-modification"),
          choice("topology", "ordinary"),
          choice("order", "head-modifier"),
          choice("modifier-adjunctor", "none"),
        ],
        actions: ["compose"],
      },
      {
        caseId: "clause-relations/adverbial",
        order: 2,
        activatesOperationIds: ["clause:adverbial-adjunction"],
        participants: [
          { role: "principal", fixtureCaseId: "vnc-base/intransitive-scalar" },
          { role: "adjoined", fixtureCaseId: "nnc-base/ordinary-scalar" },
        ],
        selections: [
          choice("relation", "place"),
          choice("degree", "first"),
          choice("order", "modifier-head"),
        ],
        actions: ["compose"],
      },
      {
        caseId: "clause-relations/object-complement",
        order: 3,
        activatesOperationIds: ["clause:composition"],
        participants: [
          { role: "principal", fixtureCaseId: "vnc-base/transitive-scalar" },
          { role: "adjoined", fixtureCaseId: "nnc-base/ordinary-scalar" },
        ],
        selections: [
          choice("relation", "object-complement"),
          choice("semantic-category", "change"),
          choice("complement-order", "complement-principal"),
          choice("link-kind", "object-subject"),
          choice("designation-structure", "ordinary-object-complement"),
        ],
        actions: ["compose"],
      },
      {
        caseId: "clause-relations/conjunction",
        order: 4,
        activatesOperationIds: ["clause:composition"],
        participants: [
          { role: "principal", fixtureCaseId: "nnc-base/ordinary-scalar" },
          { role: "adjoined", fixtureCaseId: "nnc-base/ordinary-scalar" },
        ],
        selections: [
          choice("relation", "conjunction"),
          choice("coordination-relation", "unmarked"),
          choice("coordination-type", "additive"),
          choice("clause-level", "principal"),
          choice(
            "[data-classical-clause-relation-decision=\"polarity\"]",
            "positive",
          ),
          choice("left-context", "present"),
          choice("rightward-modifier", "none"),
          choice("modifier-adjunctor", "none"),
          choice("shared-modifier-scope", "none"),
          choice("shared-modifier", "none"),
          choice("adjoined-function", "none"),
        ],
        actions: ["compose"],
      },
      {
        caseId: "clause-relations/comparison-equality-with-dimension",
        order: 5,
        activatesOperationIds: ["clause:comparison"],
        participants: [
          { role: "principal", fixtureCaseId: "nnc-base/ordinary-scalar" },
          { role: "adjoined", fixtureCaseId: "nnc-base/ordinary-scalar" },
          { role: "dependent", fixtureCaseId: "nnc-base/ordinary-scalar" },
        ],
        selections: [
          choice("relation", "comparison"),
          choice("comparison-route", "equality-iuhqui"),
          choice("ic-relation", "no"),
          choice("sentence-type", "none"),
        ],
        actions: ["compose"],
      },
      {
        caseId: "clause-relations/comparison-superlative",
        order: 6,
        activatesOperationIds: ["clause:comparison"],
        participants: [
          { role: "principal", fixtureCaseId: "nnc-base/ordinary-scalar" },
          { role: "adjoined", fixtureCaseId: "nnc-base/ordinary-scalar" },
        ],
        selections: [
          choice("relation", "comparison"),
          choice("comparison-route", "superlative-adverbial"),
          choice("superlative-adverbial", "cencah"),
          choice("sentence-type", "declarative"),
        ],
        actions: ["compose"],
      },
      {
        caseId: "clause-relations/supplementation-shared",
        order: 7,
        activatesOperationIds: ["sentence:supplementation"],
        participants: [
          { role: "principal", fixtureCaseId: "vnc-base/intransitive-scalar" },
          { role: "adjoined", fixtureCaseId: "nnc-pronominal/personal-scalar" },
        ],
        selections: [
          choice("relation", "supplementation"),
          choice("supplementation-reference-mode", "shared"),
          choice("supplementation-head-role", "subject"),
          choice("supplementation-order", "principal-first"),
        ],
        actions: ["compose"],
      },
      {
        caseId: "clause-relations/supplementation-reported-speech",
        order: 8,
        activatesOperationIds: ["sentence:supplementation"],
        participants: [
          { role: "principal", fixtureCaseId: "vnc-base/transitive-scalar" },
          { role: "adjoined", fixtureCaseId: "vnc-base/intransitive-scalar" },
        ],
        selections: [
          choice("relation", "supplementation"),
          choice("supplementation-reference-mode", "included"),
          choice("supplementation-head-role", "object"),
          choice("supplementation-order", "principal-first"),
          choice("speech-directness", "indirect"),
        ],
        actions: ["compose"],
      },
      {
        caseId: "clause-relations/vocative",
        order: 9,
        activatesOperationIds: ["sentence:supplementation"],
        participants: [
          { role: "principal", fixtureCaseId: "nnc-base/possessive-pil-reduplication" },
        ],
        selections: [choice("relation", "vocative")],
        actions: ["compose"],
      },
      {
        caseId: "clause-relations/parallel-structure",
        order: 10,
        activatesOperationIds: ["clause:composition"],
        participants: [
          { role: "principal", fixtureCaseId: "nnc-base/ordinary-scalar" },
          { role: "adjoined", fixtureCaseId: "nnc-base/ordinary-scalar" },
        ],
        selections: [
          choice("relation", "parallel-structure"),
          choice("parallel-type", "rephrasive"),
          choice("rephrase-axis", "active-passive"),
          choice("appositive-type", "none"),
        ],
        actions: ["compose"],
      },
      {
        caseId: "clause-relations/adjectival-compound-contact",
        order: 11,
        activatesOperationIds: ["nnc:adjectival-modification"],
        participants: [
          { role: "principal", fixtureCaseId: "nominal-construction/compound" },
          { role: "adjoined", fixtureCaseId: "vnc-base/transitive-scalar" },
        ],
        selections: [
          choice("relation", "adjectival-modification"),
          choice("topology", "ordinary"),
          choice("order", "head-modifier"),
          choice("modifier-adjunctor", "none"),
          choice("link-kind", "vnc-subject"),
          choice("compound-head-target", "compound-matrix"),
        ],
        actions: ["compose"],
      },
    ],
  },
];

export const CLASSICAL_SGR_ROUTE_RECIPE_REGISTRY = deepFreeze({
  kind: REGISTRY_KIND,
  version: REGISTRY_VERSION,
  authority: {
    proofOnly: true,
    uiAuthority: "none",
    grammarAuthority: false,
    semanticOwnerAuthority: false,
    canonicalGenerationAuthority: false,
    runtimeInstallable: false,
  },
  presets: PRESETS,
  families: FAMILIES,
});

export function getClassicalSgrRouteRecipeRegistry() {
  return CLASSICAL_SGR_ROUTE_RECIPE_REGISTRY;
}

function sortedUnique(values) {
  return [...new Set(values)].sort((left, right) => left.localeCompare(right));
}

export function validateClassicalSgrRouteRecipeRegistry(
  registry = CLASSICAL_SGR_ROUTE_RECIPE_REGISTRY,
  publicOperationIds = [],
) {
  const families = Array.isArray(registry?.families) ? registry.families : [];
  const presets = Array.isArray(registry?.presets) ? registry.presets : [];
  const expectedOperations = sortedUnique(publicOperationIds.map(String));
  const providedOperations = families.flatMap(
    family => family.providesOperationIds || [],
  );
  const providerCounts = Object.fromEntries(expectedOperations.map(id => [id, 0]));
  providedOperations.forEach(id => {
    if (Object.hasOwn(providerCounts, id)) providerCounts[id] += 1;
  });
  const familyIds = families.map(family => family.familyId);
  const familyById = new Map(families.map(family => [family.familyId, family]));
  const caseRecords = families.flatMap(family => (
    (family.cases || []).map(caseRecord => ({ family, caseRecord }))
  ));
  const caseIds = caseRecords.map(entry => entry.caseRecord.caseId);
  const presetIds = presets.map(preset => preset.presetId);
  const presetIdSet = new Set(presetIds);
  const problems = [];
  const add = problem => {
    if (problem) problems.push(problem);
  };
  add(registry?.kind === REGISTRY_KIND ? "" : "registry-kind");
  add(registry?.version === REGISTRY_VERSION ? "" : "registry-version");
  add(registry?.authority?.proofOnly === true ? "" : "proof-only");
  add(registry?.authority?.uiAuthority === "none" ? "" : "ui-authority");
  add(registry?.authority?.grammarAuthority === false ? "" : "grammar-authority");
  add(registry?.authority?.semanticOwnerAuthority === false ? "" : "semantic-owner-authority");
  add(registry?.authority?.canonicalGenerationAuthority === false ? "" : "canonical-generation-authority");
  add(registry?.authority?.runtimeInstallable === false ? "" : "runtime-installable");
  add(new Set(familyIds).size === familyIds.length ? "" : "duplicate-family-id");
  add(new Set(caseIds).size === caseIds.length ? "" : "duplicate-case-id");
  add(new Set(presetIds).size === presetIds.length ? "" : "duplicate-preset-id");
  Object.entries(providerCounts).forEach(([id, count]) => {
    add(count === 1 ? "" : `provider-count:${id}:${count}`);
  });
  sortedUnique(providedOperations).forEach(id => {
    add(expectedOperations.includes(id) ? "" : `unknown-provider:${id}`);
  });
  families.forEach((family, familyIndex) => {
    add(family.order === familyIndex + 1 ? "" : `family-order:${family.familyId}`);
    (family.dependsOnFamilyIds || []).forEach(dependencyId => {
      const dependency = familyById.get(dependencyId);
      add(dependency ? "" : `missing-dependency:${family.familyId}:${dependencyId}`);
      add(!dependency || dependency.order < family.order
        ? ""
        : `dependency-order:${family.familyId}:${dependencyId}`);
    });
    const provided = new Set(family.providesOperationIds || []);
    const activated = new Set();
    (family.cases || []).forEach((caseRecord, caseIndex) => {
      add(caseRecord.order === caseIndex + 1
        ? ""
        : `case-order:${caseRecord.caseId}`);
      add(!caseRecord.presetId || presetIdSet.has(caseRecord.presetId)
        ? ""
        : `missing-preset:${caseRecord.caseId}:${caseRecord.presetId}`);
      (caseRecord.activatesOperationIds || []).forEach(operationId => {
        activated.add(operationId);
        add(provided.has(operationId)
          ? ""
          : `activation-outside-family:${caseRecord.caseId}:${operationId}`);
      });
    });
    provided.forEach(operationId => {
      add(activated.has(operationId)
        ? ""
        : `provided-operation-unactivated:${family.familyId}:${operationId}`);
    });
  });
  const traversed = new Set();
  const active = new Set();
  const visit = familyId => {
    if (active.has(familyId)) {
      add(`dependency-cycle:${familyId}`);
      return;
    }
    if (traversed.has(familyId)) return;
    active.add(familyId);
    (familyById.get(familyId)?.dependsOnFamilyIds || []).forEach(visit);
    active.delete(familyId);
    traversed.add(familyId);
  };
  familyIds.forEach(visit);
  const inspect = (value, path = "registry") => {
    if (typeof value === "function") {
      add(`function-value:${path}`);
      return;
    }
    if (!value || typeof value !== "object") return;
    Object.entries(value).forEach(([key, entry]) => {
      const normalizedKey = key.toLowerCase().replace(/[^a-z]/gu, "");
      if ([
        "atomid",
        "atomids",
        "lesson",
        "lessonid",
        "formula",
        "formulas",
        "surface",
        "surfaces",
        "canonicalresult",
        "copiedresult",
        "storedanswer",
      ].includes(normalizedKey)) {
        add(`forbidden-key:${path}.${key}`);
      }
      inspect(entry, `${path}.${key}`);
    });
  };
  inspect(registry);
  return deepFreeze({
    valid: problems.length === 0,
    problems: sortedUnique(problems),
    familyCount: families.length,
    caseCount: caseRecords.length,
    publicOperationCount: expectedOperations.length,
    providedOperationCount: sortedUnique(providedOperations).length,
    familyOrder: [...familyIds],
    dependencyOrder: families.map(family => ({
      familyId: family.familyId,
      dependsOnFamilyIds: [...(family.dependsOnFamilyIds || [])],
    })),
  });
}
