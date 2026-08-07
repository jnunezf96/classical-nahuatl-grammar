const spec = {
  "ownerId": "classical-denominal-vnc-huia-produce-for",
  "prefix": "ClassicalDenominalVncHuiaProduceFor",
  "operationId": "classical.denominal.vnc.huia.produce.for.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-huia-produce-for-source",
  "domain": "classical-denominal-vnc-huia-produce-for",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5129"
  ],
  "coordinates": {
    "claim-p5129::p5129-to-produce-the-thing-signified-by-the-source-nounstem": {
      "assertionId": "classical-denominal-vnc-huia-produce-for:p5129-to-produce-the-thing-signified-by-the-source-nounstem",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5129": [
      "huia-produce-for",
      "applicative-huia-produce",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5129": "authorized"
  }
};
export default Object.freeze(spec);
