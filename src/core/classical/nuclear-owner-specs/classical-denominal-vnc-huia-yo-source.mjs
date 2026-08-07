const spec = {
  "ownerId": "classical-denominal-vnc-huia-yo-source",
  "prefix": "ClassicalDenominalVncHuiaYoSource",
  "operationId": "classical.denominal.vnc.huia.yo.source.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-huia-yo-source-source",
  "domain": "classical-denominal-vnc-huia-yo-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5127"
  ],
  "coordinates": {
    "claim-p5127::p5127-the-source-may-be-a-compound-nounstem-built-on": {
      "assertionId": "classical-denominal-vnc-huia-yo-source:p5127-the-source-may-be-a-compound-nounstem-built-on",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5127": [
      "huia-yo-source",
      "applicative-huia-use",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5127": "authorized"
  }
};
export default Object.freeze(spec);
