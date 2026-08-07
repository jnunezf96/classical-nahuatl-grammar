const spec = {
  "ownerId": "classical-denominal-vnc-hui-lia-causative",
  "prefix": "ClassicalDenominalVncHuiLiaCausative",
  "operationId": "classical.denominal.vnc.hui.lia.causative.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-hui-lia-causative-source",
  "domain": "classical-denominal-vnc-hui-lia-causative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4984"
  ],
  "coordinates": {
    "claim-p4984::p4984-many-of-the-hui-verbstems-form-a-causative-counterpart": {
      "assertionId": "classical-denominal-vnc-hui-lia-causative:p4984-many-of-the-hui-verbstems-form-a-causative-counterpart",
      "canonicalPath": "result.objectCount"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4984": [
      "hui-lia-causative",
      "ti-hui-lia-causative",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4984": "authorized"
  }
};
export default Object.freeze(spec);
