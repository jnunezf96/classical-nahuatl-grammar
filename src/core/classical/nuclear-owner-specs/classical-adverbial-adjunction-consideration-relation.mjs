const spec = {
  "ownerId": "classical-adverbial-adjunction-consideration-relation",
  "prefix": "ClassicalAdverbialAdjunctionConsiderationRelation",
  "operationId": "classical.adverbial.adjunction.consideration.relation.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-consideration-relation-source",
  "domain": "classical-adverbial-adjunction-consideration-relation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4719"
  ],
  "coordinates": {
    "claim-p4719::p4719-the-principal-clause-unit-is-modified-by-an-adverbial": {
      "assertionId": "classical-adverbial-adjunction-consideration-relation:p4719-the-principal-clause-unit-is-modified-by-an-adverbial",
      "canonicalPath": "analysis.considerationAdjoinedClauseLicensed"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4719": [
      "consideration-relation"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4719": "authorized"
  }
};
export default Object.freeze(spec);
