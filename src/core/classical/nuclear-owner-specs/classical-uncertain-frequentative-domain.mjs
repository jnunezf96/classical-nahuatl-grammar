const spec = {
  "ownerId": "classical-uncertain-frequentative-domain",
  "prefix": "ClassicalUncertainFrequentativeDomain",
  "operationId": "classical.uncertain.frequentative.domain.execute",
  "inputContract": "complete-typed-classical-uncertain-frequentative-domain-source",
  "domain": "classical-uncertain-frequentative-domain",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2709"
  ],
  "coordinates": {
    "claim-p2709::p2709-there-are-several-types-of-frequentative-verbstems-the-details": {
      "assertionId": "classical-uncertain-frequentative-domain:p2709-there-are-several-types-of-frequentative-verbstems-the-details",
      "canonicalPath": "cases.uncertainCa.ruleFamily"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2709": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2709": "authorized"
  }
};
export default Object.freeze(spec);
