const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-possessive-double-options",
  "prefix": "ClassicalDenominalVncTiAPossessiveDoubleOptions",
  "operationId": "classical.denominal.vnc.ti.a.possessive.double.options.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-possessive-double-options-source",
  "domain": "classical-denominal-vnc-ti-a-possessive-double-options",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5082",
    "claim-p5083"
  ],
  "coordinates": {
    "claim-p5082::p5082-when-the-source-nnc-is-in-the-possessive-state": {
      "assertionId": "classical-denominal-vnc-ti-a-possessive-double-options:p5082-when-the-source-nnc-is-in-the-possessive-state",
      "canonicalPath": "result.objectCount"
    },
    "claim-p5083::p5083-when-the-source-nnc-is-in-the-possessive-state": {
      "assertionId": "classical-denominal-vnc-ti-a-possessive-double-options:p5083-when-the-source-nnc-is-in-the-possessive-state",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5082": [
      "ti-a-possessive-double-options",
      "ti-a-causative-double-inceptive",
      "default"
    ],
    "claim-p5083": [
      "ti-a-possessive-double-options",
      "ti-a-causative-double-inceptive",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5082": "authorized",
    "claim-p5083": "authorized"
  }
};
export default Object.freeze(spec);
