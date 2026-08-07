const spec = {
  "ownerId": "classical-denominal-vnc-included-possessor-temporal-causative",
  "prefix": "ClassicalDenominalVncIncludedPossessorTemporalCausative",
  "operationId": "classical.denominal.vnc.included.possessor.temporal.causative.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-included-possessor-temporal-causative-source",
  "domain": "classical-denominal-vnc-included-possessor-temporal-causative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5055"
  ],
  "coordinates": {
    "claim-p5055::p5055-the-causative-suffix-a-may-be-added-to-the": {
      "assertionId": "classical-denominal-vnc-included-possessor-temporal-causative:p5055-the-causative-suffix-a-may-be-added-to-the",
      "canonicalPath": "result.objectCount"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5055": [
      "included-possessor-temporal-causative",
      "ti-a-causative-single",
      "included-temporal"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5055": "authorized"
  }
};
export default Object.freeze(spec);
