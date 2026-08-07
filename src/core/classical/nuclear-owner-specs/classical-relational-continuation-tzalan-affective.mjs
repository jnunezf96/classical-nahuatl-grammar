const spec = {
  "ownerId": "classical-relational-continuation-tzalan-affective",
  "prefix": "ClassicalRelationalContinuationTzalanAffective",
  "operationId": "classical.relational.continuation.tzalan.affective.execute",
  "inputContract": "complete-typed-classical-relational-continuation-tzalan-affective-source",
  "domain": "classical-relational-continuation-tzalan-affective",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-continuation-runtime",
  "selections": [
    "claim-p4488"
  ],
  "coordinates": {
    "claim-p4488::p4488-the-honorific-form-of-tza-lan-tli-is-tza": {
      "assertionId": "classical-relational-continuation-tzalan-affective:p4488-the-honorific-form-of-tza-lan-tli-is-tza",
      "canonicalPath": "cases.tzalanAffective.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalRelationalContinuationValidationFrame",
  "executionValidatorName": "isClassicalRelationalContinuationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4488": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4488": "authorized"
  }
};
export default Object.freeze(spec);
