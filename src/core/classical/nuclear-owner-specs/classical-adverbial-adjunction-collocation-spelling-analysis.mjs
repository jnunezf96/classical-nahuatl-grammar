const spec = {
  "ownerId": "classical-adverbial-adjunction-collocation-spelling-analysis",
  "prefix": "ClassicalAdverbialAdjunctionCollocationSpellingAnalysis",
  "operationId": "classical.adverbial.adjunction.collocation.spelling.analysis.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-collocation-spelling-analysis-source",
  "domain": "classical-adverbial-adjunction-collocation-spelling-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4769"
  ],
  "coordinates": {
    "claim-p4769::p4769-this-is-usually-written-solid-as-intlacanel-or-intlacanelmo": {
      "assertionId": "classical-adverbial-adjunction-collocation-spelling-analysis:p4769-this-is-usually-written-solid-as-intlacanel-or-intlacanelmo",
      "canonicalPath": "analysis.traditionalSpellingAuthorizesStructure"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4769": [
      "collocation-spelling-analysis"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4769": "authorized"
  }
};
export default Object.freeze(spec);
