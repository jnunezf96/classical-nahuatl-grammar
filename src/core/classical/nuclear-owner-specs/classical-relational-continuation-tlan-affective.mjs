const spec = {
  "ownerId": "classical-relational-continuation-tlan-affective",
  "prefix": "ClassicalRelationalContinuationTlanAffective",
  "operationId": "classical.relational.continuation.tlan.affective.execute",
  "inputContract": "complete-typed-classical-relational-continuation-tlan-affective-source",
  "domain": "classical-relational-continuation-tlan-affective",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-continuation-runtime",
  "selections": [
    "claim-p4511"
  ],
  "coordinates": {
    "claim-p4511::p4511-the-honorific-form-of-tlan-is-tlan-tzin-co": {
      "assertionId": "classical-relational-continuation-tlan-affective:p4511-the-honorific-form-of-tlan-is-tlan-tzin-co",
      "canonicalPath": "cases.tlanAffective.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalRelationalContinuationValidationFrame",
  "executionValidatorName": "isClassicalRelationalContinuationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4511": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4511": "authorized"
  }
};
export default Object.freeze(spec);
