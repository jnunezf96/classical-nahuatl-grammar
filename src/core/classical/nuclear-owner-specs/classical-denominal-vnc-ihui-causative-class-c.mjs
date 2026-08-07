const spec = {
  "ownerId": "classical-denominal-vnc-ihui-causative-class-c",
  "prefix": "ClassicalDenominalVncIhuiCausativeClassC",
  "operationId": "classical.denominal.vnc.ihui.causative.class.c.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ihui-causative-class-c-source",
  "domain": "classical-denominal-vnc-ihui-causative-class-c",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5145"
  ],
  "coordinates": {
    "claim-p5145::p5145-an-o-a-verbstem-belongs-to-class-c-tla": {
      "assertionId": "classical-denominal-vnc-ihui-causative-class-c:p5145-an-o-a-verbstem-belongs-to-class-c-tla",
      "canonicalPath": "result.targetClass"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5145": [
      "ihui-causative-class-c",
      "i-hui-to-o-a",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5145": "authorized"
  }
};
export default Object.freeze(spec);
