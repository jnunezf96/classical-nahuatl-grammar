const spec = {
  "ownerId": "classical-uncertain-tzca-frequentative",
  "prefix": "ClassicalUncertainTzcaFrequentative",
  "operationId": "classical.uncertain.tzca.frequentative.execute",
  "inputContract": "complete-typed-classical-uncertain-tzca-frequentative-source",
  "domain": "classical-uncertain-tzca-frequentative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2714",
    "claim-p2715"
  ],
  "coordinates": {
    "claim-p2714::p2714-another-type-of-frequentative-intransitive-verbstem-involves-replacing-a": {
      "assertionId": "classical-uncertain-tzca-frequentative:p2714-another-type-of-frequentative-intransitive-verbstem-involves-replacing-a",
      "canonicalPath": "cases.uncertainTzca.targetStem"
    },
    "claim-p2715::p2715-this-type-of-verbstem-formation-may-also-explain-the": {
      "assertionId": "classical-uncertain-tzca-frequentative:p2715-this-type-of-verbstem-formation-may-also-explain-the",
      "canonicalPath": "cases.uncertainTzca.targetClass"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2714": [],
    "claim-p2715": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2714": "authorized",
    "claim-p2715": "authorized"
  }
};
export default Object.freeze(spec);
