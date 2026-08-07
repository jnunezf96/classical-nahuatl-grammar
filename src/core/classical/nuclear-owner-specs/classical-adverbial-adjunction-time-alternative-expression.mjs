const spec = {
  "ownerId": "classical-adverbial-adjunction-time-alternative-expression",
  "prefix": "ClassicalAdverbialAdjunctionTimeAlternativeExpression",
  "operationId": "classical.adverbial.adjunction.time.alternative.expression.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-time-alternative-expression-source",
  "domain": "classical-adverbial-adjunction-time-alternative-expression",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4709"
  ],
  "coordinates": {
    "claim-p4709::p4709-this-could-also-be-expressed-by-ca-ye-imman": {
      "assertionId": "classical-adverbial-adjunction-time-alternative-expression:p4709-this-could-also-be-expressed-by-ca-ye-imman",
      "canonicalPath": "analysis.alternativeTemporalExpressionIsEvidenceOnly"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4709": [
      "time-alternative-expression"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4709": "authorized"
  }
};
export default Object.freeze(spec);
