const spec = {
  "ownerId": "classical-denominal-vnc-huia-use-apply",
  "prefix": "ClassicalDenominalVncHuiaUseApply",
  "operationId": "classical.denominal.vnc.huia.use.apply.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-huia-use-apply-source",
  "domain": "classical-denominal-vnc-huia-use-apply",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5124"
  ],
  "coordinates": {
    "claim-p5124::p5124-to-use-or-apply-the-thing-signified-by-the": {
      "assertionId": "classical-denominal-vnc-huia-use-apply:p5124-to-use-or-apply-the-thing-signified-by-the",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5124": [
      "huia-use-apply",
      "applicative-huia-use",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5124": "authorized"
  }
};
export default Object.freeze(spec);
