const spec = {
  "ownerId": "classical-denominal-vnc-ihui-ahui-source",
  "prefix": "ClassicalDenominalVncIhuiAhuiSource",
  "operationId": "classical.denominal.vnc.ihui.ahui.source.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ihui-ahui-source-source",
  "domain": "classical-denominal-vnc-ihui-ahui-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5137"
  ],
  "coordinates": {
    "claim-p5137::p5137-another-type-of-denominal-verbstem-formed-with-o-a": {
      "assertionId": "classical-denominal-vnc-ihui-ahui-source:p5137-another-type-of-denominal-verbstem-formed-with-o-a",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5137": [
      "ihui-ahui-source",
      "denominal-i-hui",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5137": "authorized"
  }
};
export default Object.freeze(spec);
