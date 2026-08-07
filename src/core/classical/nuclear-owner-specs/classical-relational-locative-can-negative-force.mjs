const spec = {
  "ownerId": "classical-relational-locative-can-negative-force",
  "prefix": "ClassicalRelationalLocativeCanNegativeForce",
  "operationId": "classical.relational.locative.can.negative.force.execute",
  "inputContract": "complete-typed-classical-relational-locative-can-negative-force-source",
  "domain": "classical-relational-locative-can-negative-force",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4355",
    "claim-p4356"
  ],
  "coordinates": {
    "claim-p4355::p4355-when-negativized": {
      "assertionId": "classical-relational-locative-can-negative-force:p4355-when-negativized",
      "canonicalPath": "cases.canNegative.canonicalResult"
    },
    "claim-p4356::p4356-it-also-ceases-to-be-interrogative-when-negativized": {
      "assertionId": "classical-relational-locative-can-negative-force:p4356-it-also-ceases-to-be-interrogative-when-negativized",
      "canonicalPath": "cases.canNegative.contextualFacts.interrogativeForce"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4355": [],
    "claim-p4356": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4355": "authorized",
    "claim-p4356": "authorized"
  }
};
export default Object.freeze(spec);
