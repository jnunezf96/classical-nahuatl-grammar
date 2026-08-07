const spec = {
  "ownerId": "classical-relational-locative-n-supportive-i-boundary",
  "prefix": "ClassicalRelationalLocativeNSupportiveIBoundary",
  "operationId": "classical.relational.locative.n.supportive.i.boundary.execute",
  "inputContract": "complete-typed-classical-relational-locative-n-supportive-i-boundary-source",
  "domain": "classical-relational-locative-n-supportive-i-boundary",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4322",
    "claim-p4323"
  ],
  "coordinates": {
    "claim-p4322::p4322-when-n-tli-comes-after-a-consonant": {
      "assertionId": "classical-relational-locative-n-supportive-i-boundary:p4322-when-n-tli-comes-after-a-consonant",
      "canonicalPath": "cases.nSupportive.canonicalResult"
    },
    "claim-p4323::p4323-on-the-rare-occasions-when-n-tli-comes-after": {
      "assertionId": "classical-relational-locative-n-supportive-i-boundary:p4323-on-the-rare-occasions-when-n-tli-comes-after",
      "canonicalPath": "cases.nSupportive.predicateStem"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4322": [],
    "claim-p4323": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4322": "authorized",
    "claim-p4323": "authorized"
  }
};
export default Object.freeze(spec);
