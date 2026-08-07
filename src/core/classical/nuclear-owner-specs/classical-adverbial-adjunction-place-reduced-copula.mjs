const spec = {
  "ownerId": "classical-adverbial-adjunction-place-reduced-copula",
  "prefix": "ClassicalAdverbialAdjunctionPlaceReducedCopula",
  "operationId": "classical.adverbial.adjunction.place.reduced.copula.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-place-reduced-copula-source",
  "domain": "classical-adverbial-adjunction-place-reduced-copula",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4716"
  ],
  "coordinates": {
    "claim-p4716::p4716-at-times-the-principal-clause-within-the-adverbial-clause": {
      "assertionId": "classical-adverbial-adjunction-place-reduced-copula:p4716-at-times-the-principal-clause-within-the-adverbial-clause",
      "canonicalPath": "analysis.reducedCopulaAnalysisLicensed"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4716": [
      "place-reduced-copula"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4716": "authorized"
  }
};
export default Object.freeze(spec);
