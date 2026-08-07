const spec = {
  "ownerId": "classical-denominal-vnc-oa-huia-counterpart",
  "prefix": "ClassicalDenominalVncOaHuiaCounterpart",
  "operationId": "classical.denominal.vnc.oa.huia.counterpart.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-oa-huia-counterpart-source",
  "domain": "classical-denominal-vnc-oa-huia-counterpart",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5117"
  ],
  "coordinates": {
    "claim-p5117::p5117-furthermore-the-intransitive-verbstem-has-a-single-object-counterpart": {
      "assertionId": "classical-denominal-vnc-oa-huia-counterpart:p5117-furthermore-the-intransitive-verbstem-has-a-single-object-counterpart",
      "canonicalPath": "result.objectCount"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5117": [
      "oa-huia-counterpart",
      "applicative-huia-use",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5117": "authorized"
  }
};
export default Object.freeze(spec);
