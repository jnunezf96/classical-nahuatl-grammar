const spec = {
  "ownerId": "classical-adverbial-adjunction-time-oc-modifier",
  "prefix": "ClassicalAdverbialAdjunctionTimeOcModifier",
  "operationId": "classical.adverbial.adjunction.time.oc.modifier.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-time-oc-modifier-source",
  "domain": "classical-adverbial-adjunction-time-oc-modifier",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4710"
  ],
  "coordinates": {
    "claim-p4710::p4710-the-adverbial-particle-oc-frequently-modifies-i-c-in": {
      "assertionId": "classical-adverbial-adjunction-time-oc-modifier:p4710-the-adverbial-particle-oc-frequently-modifies-i-c-in",
      "canonicalPath": "analysis.ocMayModifyTemporalIc"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4710": [
      "time-oc-modifier"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4710": "authorized"
  }
};
export default Object.freeze(spec);
