const spec = {
  "ownerId": "classical-denominal-vnc-huia-yo-matrix-suppression",
  "prefix": "ClassicalDenominalVncHuiaYoMatrixSuppression",
  "operationId": "classical.denominal.vnc.huia.yo.matrix.suppression.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-huia-yo-matrix-suppression-source",
  "domain": "classical-denominal-vnc-huia-yo-matrix-suppression",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5128"
  ],
  "coordinates": {
    "claim-p5128::p5128-at-times-the-huia-is-added-to-a-nounstem": {
      "assertionId": "classical-denominal-vnc-huia-yo-matrix-suppression:p5128-at-times-the-huia-is-added-to-a-nounstem",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5128": [
      "huia-yo-matrix-suppression",
      "applicative-huia-use",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5128": "authorized"
  }
};
export default Object.freeze(spec);
