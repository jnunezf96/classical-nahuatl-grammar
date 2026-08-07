const spec = {
  "ownerId": "classical-cac-nonanimate-compound-embed",
  "prefix": "ClassicalCacNonanimateCompoundEmbed",
  "operationId": "classical.cac.nonanimate.compound.embed.execute",
  "inputContract": "complete-typed-classical-cac-nonanimate-compound-embed-source",
  "domain": "classical-cac-nonanimate-compound-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2821",
    "claim-p2822",
    "claim-p2823"
  ],
  "coordinates": {
    "claim-p2821::p2821-the-intransitive-perfective-stem-cac-appears-in-a-preterit": {
      "assertionId": "classical-cac-nonanimate-compound-embed:p2821-the-intransitive-perfective-stem-cac-appears-in-a-preterit",
      "canonicalPath": "cases.cacNonanimate.targetStem"
    },
    "claim-p2822::p2822-it-has-the-meaning-of-to-be-quiet-to": {
      "assertionId": "classical-cac-nonanimate-compound-embed:p2822-it-has-the-meaning-of-to-be-quiet-to",
      "canonicalPath": "blockedCases.animateCac.blockReason"
    },
    "claim-p2823::p2823-a-subject-pronoun-on-a-vnc-containing-it-can": {
      "assertionId": "classical-cac-nonanimate-compound-embed:p2823-a-subject-pronoun-on-a-vnc-containing-it-can",
      "canonicalPath": "cases.cacNonanimate.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2821": [],
    "claim-p2822": [],
    "claim-p2823": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2821": "authorized",
    "claim-p2822": "authorized",
    "claim-p2823": "authorized"
  }
};
export default Object.freeze(spec);
