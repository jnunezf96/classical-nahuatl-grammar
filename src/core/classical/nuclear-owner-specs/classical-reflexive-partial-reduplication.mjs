const spec = {
  "ownerId": "classical-reflexive-partial-reduplication",
  "prefix": "ClassicalReflexivePartialReduplication",
  "operationId": "classical.reflexive.partial.reduplication.execute",
  "inputContract": "complete-typed-classical-reflexive-partial-reduplication-source",
  "domain": "classical-reflexive-partial-reduplication",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2678",
    "claim-p2679",
    "claim-p2680",
    "claim-p2681",
    "claim-p2682"
  ],
  "coordinates": {
    "claim-p2678::p2678-the-mainline-reflexive-object-pronoun-may-undergo-partial-reduplication": {
      "assertionId": "classical-reflexive-partial-reduplication:p2678-the-mainline-reflexive-object-pronoun-may-undergo-partial-reduplication",
      "canonicalPath": "cases.reflexivePartial.ruleFamily"
    },
    "claim-p2679::p2679-this-can-occur-only-before-verbstems-with-an-initial": {
      "assertionId": "classical-reflexive-partial-reduplication:p2679-this-can-occur-only-before-verbstems-with-an-initial",
      "canonicalPath": "cases.reflexivePartial.targetPrePredicate.0.carrier"
    },
    "claim-p2680::p2680-it-is-as-if-the-fol-of-the-reflexive": {
      "assertionId": "classical-reflexive-partial-reduplication:p2680-it-is-as-if-the-fol-of-the-reflexive",
      "canonicalPath": "cases.reflexivePartial.targetStem"
    },
    "claim-p2681::p2681-m-o-ilpi-a-to-gird-oneself-to-tie": {
      "assertionId": "classical-reflexive-partial-reduplication:p2681-m-o-ilpi-a-to-gird-oneself-to-tie",
      "canonicalPath": "cases.reflexivePartial.finiteAuthorizationStatus"
    },
    "claim-p2682::p2682-m-o-tla-itt-i-lia-to-consider-s": {
      "assertionId": "classical-reflexive-partial-reduplication:p2682-m-o-tla-itt-i-lia-to-consider-s",
      "canonicalPath": "cases.reflexivePartial.ruleFamily"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2678": [],
    "claim-p2679": [],
    "claim-p2680": [],
    "claim-p2681": [],
    "claim-p2682": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2678": "authorized",
    "claim-p2679": "authorized",
    "claim-p2680": "authorized",
    "claim-p2681": "authorized",
    "claim-p2682": "authorized"
  }
};
export default Object.freeze(spec);
