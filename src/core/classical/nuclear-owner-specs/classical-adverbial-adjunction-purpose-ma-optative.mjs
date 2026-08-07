const spec = {
  "ownerId": "classical-adverbial-adjunction-purpose-ma-optative",
  "prefix": "ClassicalAdverbialAdjunctionPurposeMaOptative",
  "operationId": "classical.adverbial.adjunction.purpose.ma.optative.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-purpose-ma-optative-source",
  "domain": "classical-adverbial-adjunction-purpose-ma-optative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4734"
  ],
  "coordinates": {
    "claim-p4734::p4734-the-adjoined-clause-may-suggest-the-purposive-notion-by": {
      "assertionId": "classical-adverbial-adjunction-purpose-ma-optative:p4734-the-adjoined-clause-may-suggest-the-purposive-notion-by",
      "canonicalPath": "analysis.maOptativePurposeLicensed"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4734": [
      "purpose-ma-optative"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4734": "authorized"
  }
};
export default Object.freeze(spec);
