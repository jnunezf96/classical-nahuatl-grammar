const spec = {
  "ownerId": "classical-denominal-vnc-possession-ti-lia-causative",
  "prefix": "ClassicalDenominalVncPossessionTiLiaCausative",
  "operationId": "classical.denominal.vnc.possession.ti.lia.causative.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-possession-ti-lia-causative-source",
  "domain": "classical-denominal-vnc-possession-ti-lia-causative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5062"
  ],
  "coordinates": {
    "claim-p5062::p5062-a-single-object-causative-verbstem-can-be-derived-from": {
      "assertionId": "classical-denominal-vnc-possession-ti-lia-causative:p5062-a-single-object-causative-verbstem-can-be-derived-from",
      "canonicalPath": "result.objectCount"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5062": [
      "possession-ti-lia-causative",
      "ti-hui-lia-causative",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5062": "authorized"
  }
};
export default Object.freeze(spec);
