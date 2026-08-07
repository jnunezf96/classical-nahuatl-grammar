const spec = {
  "ownerId": "classical-adverbial-adjunction-concession-intensifier",
  "prefix": "ClassicalAdverbialAdjunctionConcessionIntensifier",
  "operationId": "classical.adverbial.adjunction.concession.intensifier.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-concession-intensifier-source",
  "domain": "classical-adverbial-adjunction-concession-intensifier",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4765"
  ],
  "coordinates": {
    "claim-p4765::p4765-the-collocation-is-made-more-intense-by-adding-the": {
      "assertionId": "classical-adverbial-adjunction-concession-intensifier:p4765-the-collocation-is-made-more-intense-by-adding-the",
      "canonicalPath": "analysis.concessionMayTakeIntensivePronoun"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4765": [
      "concession-intensifier"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4765": "authorized"
  }
};
export default Object.freeze(spec);
