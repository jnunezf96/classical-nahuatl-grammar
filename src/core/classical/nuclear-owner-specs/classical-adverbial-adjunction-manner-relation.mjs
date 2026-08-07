const spec = {
  "ownerId": "classical-adverbial-adjunction-manner-relation",
  "prefix": "ClassicalAdverbialAdjunctionMannerRelation",
  "operationId": "classical.adverbial.adjunction.manner.relation.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-manner-relation-source",
  "domain": "classical-adverbial-adjunction-manner-relation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4718"
  ],
  "coordinates": {
    "claim-p4718::p4718-the-principal-clause-unit-is-modified-by-an-adverbial": {
      "assertionId": "classical-adverbial-adjunction-manner-relation:p4718-the-principal-clause-unit-is-modified-by-an-adverbial",
      "canonicalPath": "analysis.mannerAdjoinedClauseLicensed"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4718": [
      "manner-relation"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4718": "authorized"
  }
};
export default Object.freeze(spec);
