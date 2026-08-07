const spec = {
  "ownerId": "classical-denominal-vnc-oa-produce",
  "prefix": "ClassicalDenominalVncOaProduce",
  "operationId": "classical.denominal.vnc.oa.produce.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-oa-produce-source",
  "domain": "classical-denominal-vnc-oa-produce",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5121"
  ],
  "coordinates": {
    "claim-p5121::p5121-to-produce-the-thing-signified-by-the-source-nounstem": {
      "assertionId": "classical-denominal-vnc-oa-produce:p5121-to-produce-the-thing-signified-by-the-source-nounstem",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5121": [
      "oa-produce",
      "intransitive-o-a-produce",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5121": "authorized"
  }
};
export default Object.freeze(spec);
