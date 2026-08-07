const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-double-unattested-ti",
  "prefix": "ClassicalDenominalVncTiADoubleUnattestedTi",
  "operationId": "classical.denominal.vnc.ti.a.double.unattested.ti.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-double-unattested-ti-source",
  "domain": "classical-denominal-vnc-ti-a-double-unattested-ti",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5084"
  ],
  "coordinates": {
    "claim-p5084::p5084-the-source-ti-verbstem-is-not-attested-for-either": {
      "assertionId": "classical-denominal-vnc-ti-a-double-unattested-ti:p5084-the-source-ti-verbstem-is-not-attested-for-either",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5084": [
      "ti-a-double-unattested-ti",
      "ti-a-causative-double-inceptive",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5084": "authorized"
  }
};
export default Object.freeze(spec);
