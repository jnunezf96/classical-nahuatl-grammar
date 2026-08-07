const spec = {
  "ownerId": "classical-adverbial-adjunction-lexicalized-intensifier-collocation",
  "prefix": "ClassicalAdverbialAdjunctionLexicalizedIntensifierCollocation",
  "operationId": "classical.adverbial.adjunction.lexicalized.intensifier.collocation.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-lexicalized-intensifier-collocation-source",
  "domain": "classical-adverbial-adjunction-lexicalized-intensifier-collocation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4684"
  ],
  "coordinates": {
    "claim-p4684::p4684-there-are-a-number-of-lexicalized-collocations-of-intensifier": {
      "assertionId": "classical-adverbial-adjunction-lexicalized-intensifier-collocation:p4684-there-are-a-number-of-lexicalized-collocations-of-intensifier",
      "canonicalPath": "analysis.lexicalizedIntensifierCollocationLicensed"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4684": [
      "lexicalized-intensifier-collocation"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4684": "authorized"
  }
};
export default Object.freeze(spec);
