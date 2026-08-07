const spec = {
  "ownerId": "classical-denominal-vnc-included-possessor-temporal-pan",
  "prefix": "ClassicalDenominalVncIncludedPossessorTemporalPan",
  "operationId": "classical.denominal.vnc.included.possessor.temporal.pan.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-included-possessor-temporal-pan-source",
  "domain": "classical-denominal-vnc-included-possessor-temporal-pan",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5052"
  ],
  "coordinates": {
    "claim-p5052::p5052-in-the-fourth-type-the-various-verbstems-are-derived": {
      "assertionId": "classical-denominal-vnc-included-possessor-temporal-pan:p5052-in-the-fourth-type-the-various-verbstems-are-derived",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5052": [
      "included-possessor-temporal-pan",
      "included-possessor-ti",
      "temporal"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5052": "authorized"
  }
};
export default Object.freeze(spec);
