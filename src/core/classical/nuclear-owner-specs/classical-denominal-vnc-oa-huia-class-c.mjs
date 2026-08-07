const spec = {
  "ownerId": "classical-denominal-vnc-oa-huia-class-c",
  "prefix": "ClassicalDenominalVncOaHuiaClassC",
  "operationId": "classical.denominal.vnc.oa.huia.class.c.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-oa-huia-class-c-source",
  "domain": "classical-denominal-vnc-oa-huia-class-c",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5118"
  ],
  "coordinates": {
    "claim-p5118::p5118-both-the-intransitive-o-a-stem-and-its-corresponding": {
      "assertionId": "classical-denominal-vnc-oa-huia-class-c:p5118-both-the-intransitive-o-a-stem-and-its-corresponding",
      "canonicalPath": "result.targetClass"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5118": [
      "oa-huia-class-c",
      "applicative-huia-use",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5118": "authorized"
  }
};
export default Object.freeze(spec);
