const spec = {
  "ownerId": "classical-denominal-vnc-huiya-lia-causative",
  "prefix": "ClassicalDenominalVncHuiyaLiaCausative",
  "operationId": "classical.denominal.vnc.huiya.lia.causative.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-huiya-lia-causative-source",
  "domain": "classical-denominal-vnc-huiya-lia-causative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5009"
  ],
  "coordinates": {
    "claim-p5009::p5009-a-causative-verbstem-is-derived-from-a-hui-ya": {
      "assertionId": "classical-denominal-vnc-huiya-lia-causative:p5009-a-causative-verbstem-is-derived-from-a-hui-ya",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5009": [
      "huiya-lia-causative",
      "ya-lia-causative",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5009": "authorized"
  }
};
export default Object.freeze(spec);
