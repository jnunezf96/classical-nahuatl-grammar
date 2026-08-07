const spec = {
  "ownerId": "classical-frequentative-verbstem-domain",
  "prefix": "ClassicalFrequentativeVerbstemDomain",
  "operationId": "classical.frequentative.verbstem.domain.execute",
  "inputContract": "complete-typed-classical-frequentative-verbstem-domain-source",
  "domain": "classical-frequentative-verbstem-domain",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2652",
    "claim-p2653",
    "claim-p2654",
    "claim-p2655"
  ],
  "coordinates": {
    "claim-p2652::p2652-nahuatl-has-special-derived-verbstems-that-signify-1-repetition": {
      "assertionId": "classical-frequentative-verbstem-domain:p2652-nahuatl-has-special-derived-verbstems-that-signify-1-repetition",
      "canonicalPath": "contract.operationOrder.1"
    },
    "claim-p2653::p2653-the-prefix-may-have-one-of-three-shapes-1": {
      "assertionId": "classical-frequentative-verbstem-domain:p2653-the-prefix-may-have-one-of-three-shapes-1",
      "canonicalPath": "contract.shapes.0"
    },
    "claim-p2654::p2654-the-parentheses-around-the-consonant-element-in-these-formulas": {
      "assertionId": "classical-frequentative-verbstem-domain:p2654-the-parentheses-around-the-consonant-element-in-these-formulas",
      "canonicalPath": "contract.shapes.1"
    },
    "claim-p2655::p2655-there-are-several-different-types-of-frequentative-verbstems": {
      "assertionId": "classical-frequentative-verbstem-domain:p2655-there-are-several-different-types-of-frequentative-verbstems",
      "canonicalPath": "contract.shapes.2"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2652": [],
    "claim-p2653": [],
    "claim-p2654": [],
    "claim-p2655": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2652": "authorized",
    "claim-p2653": "authorized",
    "claim-p2654": "authorized",
    "claim-p2655": "authorized"
  }
};
export default Object.freeze(spec);
