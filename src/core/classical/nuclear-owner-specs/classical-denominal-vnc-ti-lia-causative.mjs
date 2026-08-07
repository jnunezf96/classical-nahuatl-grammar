const spec = {
  "ownerId": "classical-denominal-vnc-ti-lia-causative",
  "prefix": "ClassicalDenominalVncTiLiaCausative",
  "operationId": "classical.denominal.vnc.ti.lia.causative.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-lia-causative-source",
  "domain": "classical-denominal-vnc-ti-lia-causative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4976"
  ],
  "coordinates": {
    "claim-p4976::p4976-an-intransitive-inceptive-stative-verbstem-formed-with-ti-may": {
      "assertionId": "classical-denominal-vnc-ti-lia-causative:p4976-an-intransitive-inceptive-stative-verbstem-formed-with-ti-may",
      "canonicalPath": "result.objectCount"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4976": [
      "ti-lia-causative",
      "ti-hui-lia-causative",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4976": "authorized"
  }
};
export default Object.freeze(spec);
