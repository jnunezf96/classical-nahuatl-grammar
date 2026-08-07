const spec = {
  "ownerId": "classical-relational-locative-can-interrogative-force",
  "prefix": "ClassicalRelationalLocativeCanInterrogativeForce",
  "operationId": "classical.relational.locative.can.interrogative.force.execute",
  "inputContract": "complete-typed-classical-relational-locative-can-interrogative-force-source",
  "domain": "classical-relational-locative-can-interrogative-force",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4347",
    "claim-p4348"
  ],
  "coordinates": {
    "claim-p4347::p4347-the-compound-stem-therefore-means-literally-an-entity-s": {
      "assertionId": "classical-relational-locative-can-interrogative-force:p4347-the-compound-stem-therefore-means-literally-an-entity-s",
      "canonicalPath": "cases.canInitial.canonicalResult"
    },
    "claim-p4348::p4348-the-interrogative-particle-cuix-can-follow-it-ca-n": {
      "assertionId": "classical-relational-locative-can-interrogative-force:p4348-the-interrogative-particle-cuix-can-follow-it-ca-n",
      "canonicalPath": "cases.canInitial.predicateStem"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4347": [],
    "claim-p4348": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4347": "authorized",
    "claim-p4348": "authorized"
  }
};
export default Object.freeze(spec);
