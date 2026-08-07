const spec = {
  "ownerId": "classical-denominal-vnc-temporal-tia-semantics",
  "prefix": "ClassicalDenominalVncTemporalTiaSemantics",
  "operationId": "classical.denominal.vnc.temporal.tia.semantics.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-temporal-tia-semantics-source",
  "domain": "classical-denominal-vnc-temporal-tia-semantics",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5111"
  ],
  "coordinates": {
    "claim-p5111::p5111-the-meaning-of-the-verbstem-is-to-spend-the": {
      "assertionId": "classical-denominal-vnc-temporal-tia-semantics:p5111-the-meaning-of-the-verbstem-is-to-spend-the",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5111": [
      "temporal-tia-semantics",
      "temporal-tia",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5111": "authorized"
  }
};
export default Object.freeze(spec);
