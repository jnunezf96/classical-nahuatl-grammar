const spec = {
  "ownerId": "classical-denominal-vnc-possession-ti-orientation",
  "prefix": "ClassicalDenominalVncPossessionTiOrientation",
  "operationId": "classical.denominal.vnc.possession.ti.orientation.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-possession-ti-orientation-source",
  "domain": "classical-denominal-vnc-possession-ti-orientation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5058"
  ],
  "coordinates": {
    "claim-p5058::p5058-a-vnc-formed-on-the-inceptive-stative-ti-is": {
      "assertionId": "classical-denominal-vnc-possession-ti-orientation:p5058-a-vnc-formed-on-the-inceptive-stative-ti-is",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5058": [
      "possession-ti-orientation",
      "possession-ti",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5058": "authorized"
  }
};
export default Object.freeze(spec);
