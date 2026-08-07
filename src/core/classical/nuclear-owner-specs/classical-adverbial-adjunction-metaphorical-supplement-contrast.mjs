const spec = {
  "ownerId": "classical-adverbial-adjunction-metaphorical-supplement-contrast",
  "prefix": "ClassicalAdverbialAdjunctionMetaphoricalSupplementContrast",
  "operationId": "classical.adverbial.adjunction.metaphorical.supplement.contrast.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-metaphorical-supplement-contrast-source",
  "domain": "classical-adverbial-adjunction-metaphorical-supplement-contrast",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4656"
  ],
  "coordinates": {
    "claim-p4656::p4656-these-constructions-should-be-distinguished-from-the-following-which": {
      "assertionId": "classical-adverbial-adjunction-metaphorical-supplement-contrast:p4656-these-constructions-should-be-distinguished-from-the-following-which",
      "canonicalPath": "analysis.metaphoricalSupplementIsNotAdverbialAdjunction"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4656": [
      "metaphorical-supplement-contrast"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4656": "authorized"
  }
};
export default Object.freeze(spec);
