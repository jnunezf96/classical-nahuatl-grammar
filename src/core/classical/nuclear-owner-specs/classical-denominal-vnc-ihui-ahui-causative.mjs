const spec = {
  "ownerId": "classical-denominal-vnc-ihui-ahui-causative",
  "prefix": "ClassicalDenominalVncIhuiAhuiCausative",
  "operationId": "classical.denominal.vnc.ihui.ahui.causative.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ihui-ahui-causative-source",
  "domain": "classical-denominal-vnc-ihui-ahui-causative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5143"
  ],
  "coordinates": {
    "claim-p5143::p5143-the-causative-o-a-verbstems-corresponding-to-the-i": {
      "assertionId": "classical-denominal-vnc-ihui-ahui-causative:p5143-the-causative-o-a-verbstems-corresponding-to-the-i",
      "canonicalPath": "result.objectCount"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5143": [
      "ihui-ahui-causative",
      "i-hui-to-o-a",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5143": "authorized"
  }
};
export default Object.freeze(spec);
