const spec = {
  "ownerId": "classical-adverbial-adjunction-place-spelling-analysis",
  "prefix": "ClassicalAdverbialAdjunctionPlaceSpellingAnalysis",
  "operationId": "classical.adverbial.adjunction.place.spelling.analysis.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-place-spelling-analysis-source",
  "domain": "classical-adverbial-adjunction-place-spelling-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4715"
  ],
  "coordinates": {
    "claim-p4715::p4715-nochpo-chtzin-is-usually-spelled-nochpotzin": {
      "assertionId": "classical-adverbial-adjunction-place-spelling-analysis:p4715-nochpo-chtzin-is-usually-spelled-nochpotzin",
      "canonicalPath": "analysis.traditionalSpellingAuthorizesStructure"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4715": [
      "place-spelling-analysis"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4715": "authorized"
  }
};
export default Object.freeze(spec);
