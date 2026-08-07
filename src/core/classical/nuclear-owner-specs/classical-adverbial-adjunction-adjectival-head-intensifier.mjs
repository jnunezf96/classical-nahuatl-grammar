const spec = {
  "ownerId": "classical-adverbial-adjunction-adjectival-head-intensifier",
  "prefix": "ClassicalAdverbialAdjunctionAdjectivalHeadIntensifier",
  "operationId": "classical.adverbial.adjunction.adjectival.head.intensifier.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-adjectival-head-intensifier-source",
  "domain": "classical-adverbial-adjunction-adjectival-head-intensifier",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4685"
  ],
  "coordinates": {
    "claim-p4685::p4685-as-an-adverbial-modifier-of-a-modifier-the-intensifier": {
      "assertionId": "classical-adverbial-adjunction-adjectival-head-intensifier:p4685-as-an-adverbial-modifier-of-a-modifier-the-intensifier",
      "canonicalPath": "analysis.intensifierMayModifyAdjectivalNnc"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4685": [
      "adjectival-head-intensifier"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4685": "authorized"
  }
};
export default Object.freeze(spec);
