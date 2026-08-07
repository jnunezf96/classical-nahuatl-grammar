const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-absolutive-single-options",
  "prefix": "ClassicalDenominalVncTiAAbsolutiveSingleOptions",
  "operationId": "classical.denominal.vnc.ti.a.absolutive.single.options.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-absolutive-single-options-source",
  "domain": "classical-denominal-vnc-ti-a-absolutive-single-options",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5066",
    "claim-p5067"
  ],
  "coordinates": {
    "claim-p5066::p5066-when-the-source-nnc-is-in-the-absolutive-state": {
      "assertionId": "classical-denominal-vnc-ti-a-absolutive-single-options:p5066-when-the-source-nnc-is-in-the-absolutive-state",
      "canonicalPath": "result.objectCount"
    },
    "claim-p5067::p5067-when-the-source-nnc-is-in-the-absolutive-state": {
      "assertionId": "classical-denominal-vnc-ti-a-absolutive-single-options:p5067-when-the-source-nnc-is-in-the-absolutive-state",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5066": [
      "ti-a-absolutive-single-options",
      "ti-a-causative-single",
      "inceptive-source"
    ],
    "claim-p5067": [
      "ti-a-absolutive-single-options",
      "ti-a-causative-single",
      "inceptive-source"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5066": "authorized",
    "claim-p5067": "authorized"
  }
};
export default Object.freeze(spec);
