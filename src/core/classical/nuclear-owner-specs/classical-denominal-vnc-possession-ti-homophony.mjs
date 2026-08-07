const spec = {
  "ownerId": "classical-denominal-vnc-possession-ti-homophony",
  "prefix": "ClassicalDenominalVncPossessionTiHomophony",
  "operationId": "classical.denominal.vnc.possession.ti.homophony.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-possession-ti-homophony-source",
  "domain": "classical-denominal-vnc-possession-ti-homophony",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5056"
  ],
  "coordinates": {
    "claim-p5056::p5056-the-inceptive-stative-suffix-ti-of-54-2-1": {
      "assertionId": "classical-denominal-vnc-possession-ti-homophony:p5056-the-inceptive-stative-suffix-ti-of-54-2-1",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5056": [
      "possession-ti-homophony",
      "possession-ti",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5056": "authorized"
  }
};
export default Object.freeze(spec);
