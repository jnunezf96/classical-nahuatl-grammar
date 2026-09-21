const spec = {
  "ownerId": "classical-relational-continuation-tlan-directional-restriction",
  "prefix": "ClassicalRelationalContinuationTlanDirectionalRestriction",
  "operationId": "classical.relational.continuation.tlan.directional.restriction.execute",
  "inputContract": "complete-typed-classical-relational-continuation-tlan-directional-restriction-source",
  "domain": "classical-relational-continuation-tlan-directional-restriction",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-continuation-runtime",
  "selections": [
    "claim-p4509"
  ],
  "coordinates": {
    "claim-p4509::p4509-the-stem-tlan-may-serve-as-an-embed-to": {
      "assertionId": "classical-relational-continuation-tlan-directional-restriction:p4509-the-stem-tlan-may-serve-as-an-embed-to",
      "canonicalPath": "cases.tlanDirection.canonicalResult"
    }
  },
  "nonExecutableObservations": {
    "claim-p4510::p4510-nnc-tlani-is-not-used-with-a-vnc-built": {
      "assertionId": "classical-relational-continuation-tlan-directional-restriction:p4510-nnc-tlani-is-not-used-with-a-vnc-built",
      "disposition": "documentary-claim-runtime-observation-unverified",
      "reason": "Canvas19537 states that tlani is not used with a VNC built on (ya-uh). The observed fixture forms a pa-direction continuation from tlan and neither constructs nor rejects that NNC/VNC pairing. Its predicate stem does not prove the restriction.",
      "retiredCanonicalPath": "cases.tlanDirection.predicateStem",
      "executionCredit": false,
      "grammarAuthority": false
    }
  },
  "executionFunctionName": "buildClassicalRelationalContinuationValidationFrame",
  "executionValidatorName": "isClassicalRelationalContinuationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4509": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4509": "authorized"
  }
};
export default Object.freeze(spec);
