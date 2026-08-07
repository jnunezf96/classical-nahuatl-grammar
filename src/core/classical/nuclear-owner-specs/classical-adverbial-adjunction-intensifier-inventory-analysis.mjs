const spec = {
  "ownerId": "classical-adverbial-adjunction-intensifier-inventory-analysis",
  "prefix": "ClassicalAdverbialAdjunctionIntensifierInventoryAnalysis",
  "operationId": "classical.adverbial.adjunction.intensifier.inventory.analysis.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-intensifier-inventory-analysis-source",
  "domain": "classical-adverbial-adjunction-intensifier-inventory-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4681"
  ],
  "coordinates": {
    "claim-p4681::p4681-the-following-are-a-few-of-the-most-common": {
      "assertionId": "classical-adverbial-adjunction-intensifier-inventory-analysis:p4681-the-following-are-a-few-of-the-most-common",
      "canonicalPath": "analysis.inventoryHeadingAuthorizesStructure"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4681": [
      "intensifier-inventory-analysis"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4681": "authorized"
  }
};
export default Object.freeze(spec);
