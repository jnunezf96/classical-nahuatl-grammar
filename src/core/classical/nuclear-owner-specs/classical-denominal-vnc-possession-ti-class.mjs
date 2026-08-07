const spec = {
  "ownerId": "classical-denominal-vnc-possession-ti-class",
  "prefix": "ClassicalDenominalVncPossessionTiClass",
  "operationId": "classical.denominal.vnc.possession.ti.class.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-possession-ti-class-source",
  "domain": "classical-denominal-vnc-possession-ti-class",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5061"
  ],
  "coordinates": {
    "claim-p5061::p5061-a-ti-verbstem-of-possession-belongs-to-the-same": {
      "assertionId": "classical-denominal-vnc-possession-ti-class:p5061-a-ti-verbstem-of-possession-belongs-to-the-same",
      "canonicalPath": "result.targetClass"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5061": [
      "possession-ti-class",
      "possession-ti",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5061": "authorized"
  }
};
export default Object.freeze(spec);
