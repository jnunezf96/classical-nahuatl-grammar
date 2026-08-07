const spec = {
  "ownerId": "classical-relational-locative-can-noninitial-force",
  "prefix": "ClassicalRelationalLocativeCanNoninitialForce",
  "operationId": "classical.relational.locative.can.noninitial.force.execute",
  "inputContract": "complete-typed-classical-relational-locative-can-noninitial-force-source",
  "domain": "classical-relational-locative-can-noninitial-force",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4353",
    "claim-p4354"
  ],
  "coordinates": {
    "claim-p4353::p4353-when-not-occurring-in-a-sentence-initial-position-ca": {
      "assertionId": "classical-relational-locative-can-noninitial-force:p4353-when-not-occurring-in-a-sentence-initial-position-ca",
      "canonicalPath": "cases.canNoninitial.canonicalResult"
    },
    "claim-p4354::p4354-when-not-occurring-in-a-sentence-initial-position": {
      "assertionId": "classical-relational-locative-can-noninitial-force:p4354-when-not-occurring-in-a-sentence-initial-position",
      "canonicalPath": "cases.canNoninitial.contextualFacts.interrogativeForce"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4353": [],
    "claim-p4354": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4353": "authorized",
    "claim-p4354": "authorized"
  }
};
export default Object.freeze(spec);
