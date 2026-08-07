const spec = {
  "ownerId": "classical-denominal-vnc-ihui-ahui-semantics",
  "prefix": "ClassicalDenominalVncIhuiAhuiSemantics",
  "operationId": "classical.denominal.vnc.ihui.ahui.semantics.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ihui-ahui-semantics-source",
  "domain": "classical-denominal-vnc-ihui-ahui-semantics",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5140"
  ],
  "coordinates": {
    "claim-p5140::p5140-the-meaning-of-the-resultant-verbstem-is-to-become": {
      "assertionId": "classical-denominal-vnc-ihui-ahui-semantics:p5140-the-meaning-of-the-resultant-verbstem-is-to-become",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5140": [
      "ihui-ahui-semantics",
      "denominal-i-hui",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5140": "authorized"
  }
};
export default Object.freeze(spec);
