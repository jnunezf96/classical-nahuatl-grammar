const spec = {
  "ownerId": "classical-relational-ic-initial-interrogative",
  "prefix": "ClassicalRelationalIcInitialInterrogative",
  "operationId": "classical.relational.ic.initial.interrogative.execute",
  "inputContract": "complete-typed-classical-relational-ic-initial-interrogative-source",
  "domain": "classical-relational-ic-initial-interrogative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4290",
    "claim-p4291"
  ],
  "coordinates": {
    "claim-p4290::p4290-when-appearing-at-the-beginning-of-a-question-sentence": {
      "assertionId": "classical-relational-ic-initial-interrogative:p4290-when-appearing-at-the-beginning-of-a-question-sentence",
      "canonicalPath": "cases.icInitial.canonicalResult"
    },
    "claim-p4291::p4291-the-interrogative-particle-cuix-can-appear-after-it": {
      "assertionId": "classical-relational-ic-initial-interrogative:p4291-the-interrogative-particle-cuix-can-appear-after-it",
      "canonicalPath": "cases.icInitial.contextualFacts.interrogativeForce"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4290": [],
    "claim-p4291": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4290": "authorized",
    "claim-p4291": "authorized"
  }
};
export default Object.freeze(spec);
