const spec = {
  "ownerId": "classical-denominal-vnc-transitive-ia-source",
  "prefix": "ClassicalDenominalVncTransitiveIaSource",
  "operationId": "classical.denominal.vnc.transitive.ia.source.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-transitive-ia-source-source",
  "domain": "classical-denominal-vnc-transitive-ia-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5148"
  ],
  "coordinates": {
    "claim-p5148::p5148-there-are-a-few-denominal-verbstems-that-are-created": {
      "assertionId": "classical-denominal-vnc-transitive-ia-source:p5148-there-are-a-few-denominal-verbstems-that-are-created",
      "canonicalPath": "result.sourceKind"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5148": [
      "transitive-ia-source",
      "transitive-i-a",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5148": "authorized"
  }
};
export default Object.freeze(spec);
