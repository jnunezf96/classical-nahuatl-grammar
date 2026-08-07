const spec = {
  ownerId: "classical-particle-lexicon",
  prefix: "ClassicalParticleLexicon",
  operationId: "classical.particle.lexicon.authorize",
  inputContract: "complete-typed-classical-particle-lexical-source",
  domain: "classical-particle-lexicon",
  operationType: "select",
  analyses: {
    "ach-doubt-particle": {
      classification: "doubt-and-indeterminacy-particle",
      facts: [
        "ach-expresses-doubt-or-indeterminacy",
        "ach-can-be-equivalent-to-negation-in-some-use",
        "ach-iquin-retains-ach-as-a-separate-particle",
        "dictionary-entry-head-does-not-authorize-particle-identity",
      ],
      relation: "ach-lexical-identity-excludes-achi-diminutive-meaning",
      checkpoint: "ach-doubt-particle-identity-checkpoint",
      allowedParticipantChoices: ["ach"],
      requiredPrerequisites: [{
        field: "achResult",
        ownerId: "classical-particle-result",
        validatorName: "isClassicalNahuatlParticleResultFrame",
        pathEquals: [
          { path: ["authorizationStatus"], value: "authorized" },
          { path: ["particleId"], value: "l3-ach" },
          { path: ["lexicalFactFrame", "meanings"], value: ["possibly", "indeterminably", "I do not know"] },
        ],
      }],
      payload: {
        lexicalIdentity: "ach",
        citedSequences: [["ach", "iquin"], ["ach", "aquin"]],
        dictionaryHeadAuthority: false,
      },
    },
    "achi-ach-liaison-contrast": {
      classification: "distinct-achi-identity-with-contextual-liaison",
      facts: [
        "achi-means-somewhat-or-a-little",
        "ach-and-achi-are-distinct-lexical-identities",
        "achi-before-iuh-or-iuhqui-has-ach-liaison-form",
        "y-for-i-is-documentary-spelling-not-a-new-lexeme",
      ],
      relation: "achi-liaison-retains-achi-lexical-identity-before-iuh-or-iuhqui",
      checkpoint: "achi-ach-liaison-contrast-checkpoint",
      allowedParticipantChoices: ["achi→ach/_iuh|iuhqui"],
      requiredPrerequisites: [
        {
          field: "achResult",
          ownerId: "classical-particle-result",
          validatorName: "isClassicalNahuatlParticleResultFrame",
          pathEquals: [{ path: ["particleId"], value: "l3-ach" }],
        },
        {
          field: "achiResult",
          ownerId: "classical-particle-result",
          validatorName: "isClassicalNahuatlParticleResultFrame",
          pathEquals: [
            { path: ["authorizationStatus"], value: "authorized" },
            { path: ["particleId"], value: "cn-achi" },
            { path: ["lexicalFactFrame", "meanings"], value: ["somewhat", "a little"] },
          ],
        },
      ],
      payload: {
        lexicalIdentity: "achi",
        liaisonContexts: ["iuh", "iuhqui"],
        liaisonForm: "ach",
        documentaryExamples: ["ach iuh", "ach iuhqui", "achi yuhqui"],
        writtenSurfaceExecutionClaimed: false,
      },
    },
  },
};

export default Object.freeze(spec);
