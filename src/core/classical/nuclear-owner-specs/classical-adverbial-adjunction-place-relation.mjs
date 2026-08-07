const spec = {
  "ownerId": "classical-adverbial-adjunction-place-relation",
  "prefix": "ClassicalAdverbialAdjunctionPlaceRelation",
  "operationId": "classical.adverbial.adjunction.place.relation.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-place-relation-source",
  "domain": "classical-adverbial-adjunction-place-relation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4714"
  ],
  "coordinates": {
    "claim-p4714::p4714-the-principal-clause-unit-is-modified-by-an-adverbial": {
      "assertionId": "classical-adverbial-adjunction-place-relation:p4714-the-principal-clause-unit-is-modified-by-an-adverbial",
      "canonicalPath": "analysis.locativeAdjoinedClauseLicensed"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4714": [
      "place-relation"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4714": "authorized"
  }
};
export default Object.freeze(spec);
