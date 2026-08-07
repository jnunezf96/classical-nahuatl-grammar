const spec = {
  "ownerId": "classical-denominal-vnc-tiya-lia-causative",
  "prefix": "ClassicalDenominalVncTiyaLiaCausative",
  "operationId": "classical.denominal.vnc.tiya.lia.causative.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-tiya-lia-causative-source",
  "domain": "classical-denominal-vnc-tiya-lia-causative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5005"
  ],
  "coordinates": {
    "claim-p5005::p5005-just-like-denominal-ya-verbstems-deverbal-verbstems-ending-in": {
      "assertionId": "classical-denominal-vnc-tiya-lia-causative:p5005-just-like-denominal-ya-verbstems-deverbal-verbstems-ending-in",
      "canonicalPath": "result.objectCount"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5005": [
      "tiya-lia-causative",
      "ya-lia-causative",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5005": "authorized"
  }
};
export default Object.freeze(spec);
