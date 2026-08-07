const spec = {
  ownerId: "classical-nounstem-lexicon",
  prefix: "ClassicalNounstemLexicon",
  operationId: "classical.nounstem.lexicon.analyze",
  inputContract: "complete-typed-classical-nounstem-lexical-source",
  domain: "classical-nounstem-lexicon",
  operationType: "establish",
  analyses: {
    "cal-semantic-range": {
      classification: "nounstem-semantic-range-not-gloss-equivalence",
      facts: [
        "cal-nounstem-is-not-equivalent-to-english-house",
        "cal-compounds-retain-cal-identity-across-divergent-translations",
        "foreign-language-glosses-are-documentary-and-non-authorizing",
      ],
      relation: "typed-cal-identity-precedes-and-outlives-any-single-translation",
      checkpoint: "cal-semantic-range-checkpoint",
      allowedParticipantChoices: ["cal≠house"],
      requiredPrerequisites: [{
        field: "calResult",
        ownerId: "classical-ordinary-nnc",
        validatorName: "isClassicalNahuatlOrdinaryNncResult",
        pathEquals: [
          { path: ["authorizationStatus"], value: "authorized" },
          { path: ["sourceFrame", "stem"], value: "cal" },
          { path: ["sourceFrame", "lexicalEntryId"], value: "ordinary-nounstem:cal" },
        ],
      }],
      payload: {
        nounstem: "cal",
        citedFormations: ["cal-pōl", "ā-cal", "chi-nān-cal", "tzon-cal"],
        documentaryGlosses: ["big house or town quarter", "dugout canoe or boat", "hedge enclosure", "scalp hair or wig"],
        translationAuthority: false,
      },
    },
  },
};

export default Object.freeze(spec);
