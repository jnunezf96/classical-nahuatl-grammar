const spec = {
  "ownerId": "classical-object-pronoun-frequentative-domain",
  "prefix": "ClassicalObjectPronounFrequentativeDomain",
  "operationId": "classical.object.pronoun.frequentative.domain.execute",
  "inputContract": "complete-typed-classical-object-pronoun-frequentative-domain-source",
  "domain": "classical-object-pronoun-frequentative-domain",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2674",
    "claim-p2675"
  ],
  "coordinates": {
    "claim-p2674::p2674-a-subtype-of-the-formation-in-27-2-1": {
      "assertionId": "classical-object-pronoun-frequentative-domain:p2674-a-subtype-of-the-formation-in-27-2-1",
      "canonicalPath": "contract.objectRuleFamily"
    },
    "claim-p2675::p2675-this-may-occur-in-two-situations": {
      "assertionId": "classical-object-pronoun-frequentative-domain:p2675-this-may-occur-in-two-situations",
      "canonicalPath": "cases.fusedTlaObjectScope.ruleFamily"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2674": [],
    "claim-p2675": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2674": "authorized",
    "claim-p2675": "authorized"
  }
};
export default Object.freeze(spec);
