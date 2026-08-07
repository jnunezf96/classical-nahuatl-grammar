const spec = {
  "ownerId": "classical-relational-ic-negative-noninterrogative",
  "prefix": "ClassicalRelationalIcNegativeNoninterrogative",
  "operationId": "classical.relational.ic.negative.noninterrogative.execute",
  "inputContract": "complete-typed-classical-relational-ic-negative-noninterrogative-source",
  "domain": "classical-relational-ic-negative-noninterrogative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4303",
    "claim-p4304"
  ],
  "coordinates": {
    "claim-p4303::p4303-lc-also-ceases-to-be-interrogative-when-made-negative": {
      "assertionId": "classical-relational-ic-negative-noninterrogative:p4303-lc-also-ceases-to-be-interrogative-when-made-negative",
      "canonicalPath": "cases.icNegative.canonicalResult"
    },
    "claim-p4304::p4304-when-made-negative": {
      "assertionId": "classical-relational-ic-negative-noninterrogative:p4304-when-made-negative",
      "canonicalPath": "cases.icNegative.contextualFacts.interrogativeForce"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4303": [],
    "claim-p4304": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4303": "authorized",
    "claim-p4304": "authorized"
  }
};
export default Object.freeze(spec);
