const spec = {
  "ownerId": "classical-adverbial-adjunction-condition-marker",
  "prefix": "ClassicalAdverbialAdjunctionConditionMarker",
  "operationId": "classical.adverbial.adjunction.condition.marker.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-condition-marker-source",
  "domain": "classical-adverbial-adjunction-condition-marker",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4736"
  ],
  "coordinates": {
    "claim-p4736::p4736-the-particle-tla-if-introduces-the-adverbial-clause-unit": {
      "assertionId": "classical-adverbial-adjunction-condition-marker:p4736-the-particle-tla-if-introduces-the-adverbial-clause-unit",
      "canonicalPath": "analysis.tlaIntroducesCondition"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4736": [
      "condition-marker"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4736": "authorized"
  }
};
export default Object.freeze(spec);
