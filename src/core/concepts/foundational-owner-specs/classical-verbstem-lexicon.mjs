const spec = {
  ownerId: "classical-verbstem-lexicon",
  prefix: "ClassicalVerbstemLexicon",
  operationId: "classical.verbstem.lexicon.authorize",
  inputContract: "complete-typed-classical-verbstem-lexical-source",
  domain: "classical-verbstem-lexicon",
  operationType: "select",
  analyses: {
    "cui-cuica-lexical-contrast": {
      classification: "dictionary-head-assignment-rejected-by-canonical-source-analysis",
      facts: [
        "cui-is-take-or-use-source",
        "xiccuican-example-belongs-to-cui-not-cuīca",
        "cited-literal-meaning-is-use-your-eyes-and-ears",
        "dictionary-head-and-foreign-gloss-are-non-authorizing",
      ],
      relation: "cui-source-selection-excludes-cuīca-dictionary-misassignment",
      checkpoint: "cui-cuica-lexical-contrast-checkpoint",
      allowedParticipantChoices: ["cui≠cuīca"],
      requiredPrerequisites: [
        {
          field: "cuiSource",
          ownerId: "classical-verbstem-source-selection",
          validatorName: "isClassicalNahuatlCanonicalSourceSelectionFrame",
          pathEquals: [
            { path: ["canonicalStem"], value: "cui" },
            { path: ["valence"], value: "transitive" },
          ],
        },
        {
          field: "cuicaSource",
          ownerId: "classical-verbstem-source-selection",
          validatorName: "isClassicalNahuatlCanonicalSourceSelectionFrame",
          pathEquals: [
            { path: ["canonicalStem"], value: "cuīca" },
            { path: ["valence"], value: "intransitive" },
          ],
        },
      ],
      payload: {
        sourceStems: ["cui", "cuīca"],
        selectedSource: "cui",
        citedExampleAuthority: false,
      },
    },
    "tzatzanatza-tzahtzi-source-contrast": {
      classification: "distinct-verbstem-sources-not-a-frequentative-derivation",
      facts: [
        "tla-tzatzanatza-is-transitive",
        "tzahtzi-is-intransitive",
        "tzatz-source-segment-is-not-tzahtz-source-segment",
        "h-in-tzahtz-represents-a-glottal-stop",
        "dictionary-root-resemblance-does-not-authorize-derivational-ancestry",
      ],
      relation: "valence-and-glottal-identity-block-false-frequentative-ancestry",
      checkpoint: "tzatzanatza-tzahtzi-source-contrast-checkpoint",
      allowedParticipantChoices: ["tla-tzatzanatza≠freq(tzahtzi)"],
      requiredPrerequisites: [
        {
          field: "tzatzanatzaSource",
          ownerId: "classical-verbstem-source-selection",
          validatorName: "isClassicalNahuatlCanonicalSourceSelectionFrame",
          pathEquals: [
            { path: ["canonicalStem"], value: "tla-tzatzanatza" },
            { path: ["valence"], value: "transitive" },
          ],
        },
        {
          field: "tzahtziSource",
          ownerId: "classical-verbstem-source-selection",
          validatorName: "isClassicalNahuatlCanonicalSourceSelectionFrame",
          pathEquals: [
            { path: ["canonicalStem"], value: "tzahtzi" },
            { path: ["valence"], value: "intransitive" },
          ],
        },
      ],
      payload: {
        sourceStems: ["tla-tzatzanatza", "tzahtzi"],
        sourceSegments: ["tzatz", "tzahtz"],
        tzatzanatzaValence: "transitive",
        tzahtziValence: "intransitive",
        frequentativeRelationAuthorized: false,
      },
    },
  },
};

export default Object.freeze(spec);
