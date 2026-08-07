const spec = {
  "ownerId": "classical-adverbial-adjunction-collocation-translation-analysis",
  "prefix": "ClassicalAdverbialAdjunctionCollocationTranslationAnalysis",
  "operationId": "classical.adverbial.adjunction.collocation.translation.analysis.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-collocation-translation-analysis-source",
  "domain": "classical-adverbial-adjunction-collocation-translation-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4676"
  ],
  "coordinates": {
    "claim-p4676::p4676-as-in-the-particle-plus-particle-collocations-in-3": {
      "assertionId": "classical-adverbial-adjunction-collocation-translation-analysis:p4676-as-in-the-particle-plus-particle-collocations-in-3",
      "canonicalPath": "analysis.translationCompositionAuthorizesStructure"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4676": [
      "collocation-translation-analysis"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4676": "authorized"
  }
};
export default Object.freeze(spec);
