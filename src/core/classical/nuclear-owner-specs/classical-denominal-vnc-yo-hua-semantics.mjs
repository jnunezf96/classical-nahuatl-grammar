const spec = {
  "ownerId": "classical-denominal-vnc-yo-hua-semantics",
  "prefix": "ClassicalDenominalVncYoHuaSemantics",
  "operationId": "classical.denominal.vnc.yo.hua.semantics.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-yo-hua-semantics-source",
  "domain": "classical-denominal-vnc-yo-hua-semantics",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5024"
  ],
  "coordinates": {
    "claim-p5024::p5024-since-the-stem-has-yo-tl-as-its-matrix": {
      "assertionId": "classical-denominal-vnc-yo-hua-semantics:p5024-since-the-stem-has-yo-tl-as-its-matrix",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5024": [
      "yo-hua-semantics",
      "deverbal-yo-hua",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5024": "authorized"
  }
};
export default Object.freeze(spec);
