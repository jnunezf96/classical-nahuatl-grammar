const spec = {
  "ownerId": "classical-denominal-vnc-huia-broad-semantics",
  "prefix": "ClassicalDenominalVncHuiaBroadSemantics",
  "operationId": "classical.denominal.vnc.huia.broad.semantics.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-huia-broad-semantics-source",
  "domain": "classical-denominal-vnc-huia-broad-semantics",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5126"
  ],
  "coordinates": {
    "claim-p5126::p5126-the-notion-of-use-or-application-can-be-quite": {
      "assertionId": "classical-denominal-vnc-huia-broad-semantics:p5126-the-notion-of-use-or-application-can-be-quite",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5126": [
      "huia-broad-semantics",
      "applicative-huia-use",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5126": "authorized"
  }
};
export default Object.freeze(spec);
