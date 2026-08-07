const spec = {
  "ownerId": "classical-adverbial-adjunction-intensifier-capability",
  "prefix": "ClassicalAdverbialAdjunctionIntensifierCapability",
  "operationId": "classical.adverbial.adjunction.intensifier.capability.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-intensifier-capability-source",
  "domain": "classical-adverbial-adjunction-intensifier-capability",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4677"
  ],
  "coordinates": {
    "claim-p4677::p4677-in-addition-to-being-able-to-perform-normal-adverbial": {
      "assertionId": "classical-adverbial-adjunction-intensifier-capability:p4677-in-addition-to-being-able-to-perform-normal-adverbial",
      "canonicalPath": "analysis.adverbialNncMayIntensify"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4677": [
      "intensifier-capability"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4677": "authorized"
  }
};
export default Object.freeze(spec);
