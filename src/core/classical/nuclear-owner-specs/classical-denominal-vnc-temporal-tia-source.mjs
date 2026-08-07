const spec = {
  "ownerId": "classical-denominal-vnc-temporal-tia-source",
  "prefix": "ClassicalDenominalVncTemporalTiaSource",
  "operationId": "classical.denominal.vnc.temporal.tia.source.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-temporal-tia-source-source",
  "domain": "classical-denominal-vnc-temporal-tia-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5110"
  ],
  "coordinates": {
    "claim-p5110::p5110-the-nnc-source-is-formed-on-a-compound-nounstem": {
      "assertionId": "classical-denominal-vnc-temporal-tia-source:p5110-the-nnc-source-is-formed-on-a-compound-nounstem",
      "canonicalPath": "result.sourceKind"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5110": [
      "temporal-tia-source",
      "temporal-tia",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5110": "authorized"
  }
};
export default Object.freeze(spec);
