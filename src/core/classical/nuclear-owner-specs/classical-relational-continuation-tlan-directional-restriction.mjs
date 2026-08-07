const spec = {
  "ownerId": "classical-relational-continuation-tlan-directional-restriction",
  "prefix": "ClassicalRelationalContinuationTlanDirectionalRestriction",
  "operationId": "classical.relational.continuation.tlan.directional.restriction.execute",
  "inputContract": "complete-typed-classical-relational-continuation-tlan-directional-restriction-source",
  "domain": "classical-relational-continuation-tlan-directional-restriction",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-continuation-runtime",
  "selections": [
    "claim-p4509",
    "claim-p4510"
  ],
  "coordinates": {
    "claim-p4509::p4509-the-stem-tlan-may-serve-as-an-embed-to": {
      "assertionId": "classical-relational-continuation-tlan-directional-restriction:p4509-the-stem-tlan-may-serve-as-an-embed-to",
      "canonicalPath": "cases.tlanDirection.canonicalResult"
    },
    "claim-p4510::p4510-nnc-tlani-is-not-used-with-a-vnc-built": {
      "assertionId": "classical-relational-continuation-tlan-directional-restriction:p4510-nnc-tlani-is-not-used-with-a-vnc-built",
      "canonicalPath": "cases.tlanDirection.predicateStem"
    }
  },
  "executionFunctionName": "buildClassicalRelationalContinuationValidationFrame",
  "executionValidatorName": "isClassicalRelationalContinuationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4509": [],
    "claim-p4510": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4509": "authorized",
    "claim-p4510": "authorized"
  }
};
export default Object.freeze(spec);
