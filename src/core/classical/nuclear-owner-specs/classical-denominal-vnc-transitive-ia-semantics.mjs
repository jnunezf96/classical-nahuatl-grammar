const spec = {
  "ownerId": "classical-denominal-vnc-transitive-ia-semantics",
  "prefix": "ClassicalDenominalVncTransitiveIaSemantics",
  "operationId": "classical.denominal.vnc.transitive.ia.semantics.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-transitive-ia-semantics-source",
  "domain": "classical-denominal-vnc-transitive-ia-semantics",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5149"
  ],
  "coordinates": {
    "claim-p5149::p5149-the-meaning-of-the-resultant-stem-is-to-cause": {
      "assertionId": "classical-denominal-vnc-transitive-ia-semantics:p5149-the-meaning-of-the-resultant-stem-is-to-cause",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5149": [
      "transitive-ia-semantics",
      "transitive-i-a",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5149": "authorized"
  }
};
export default Object.freeze(spec);
