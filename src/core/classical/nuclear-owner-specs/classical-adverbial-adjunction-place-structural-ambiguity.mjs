const spec = {
  "ownerId": "classical-adverbial-adjunction-place-structural-ambiguity",
  "prefix": "ClassicalAdverbialAdjunctionPlaceStructuralAmbiguity",
  "operationId": "classical.adverbial.adjunction.place.structural.ambiguity.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-place-structural-ambiguity-source",
  "domain": "classical-adverbial-adjunction-place-structural-ambiguity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4717"
  ],
  "coordinates": {
    "claim-p4717::p4717-this-construction-affords-another-interpretation-for-sentences-such-as": {
      "assertionId": "classical-adverbial-adjunction-place-structural-ambiguity:p4717-this-construction-affords-another-interpretation-for-sentences-such-as",
      "canonicalPath": "analysis.placeStructureMayCompeteWithApposition"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4717": [
      "place-structural-ambiguity"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4717": "authorized"
  }
};
export default Object.freeze(spec);
