const spec = {
  "ownerId": "classical-denominal-vnc-possession-ti-no-ya",
  "prefix": "ClassicalDenominalVncPossessionTiNoYa",
  "operationId": "classical.denominal.vnc.possession.ti.no.ya.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-possession-ti-no-ya-source",
  "domain": "classical-denominal-vnc-possession-ti-no-ya",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5057"
  ],
  "coordinates": {
    "claim-p5057::p5057-this-ti-of-possession-is-unlike-the-inceptive-stative": {
      "assertionId": "classical-denominal-vnc-possession-ti-no-ya:p5057-this-ti-of-possession-is-unlike-the-inceptive-stative",
      "canonicalPath": "analysis.possessionTiYaBlocked"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5057": [
      "possession-ti-no-ya",
      "possession-ti",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5057": "authorized"
  }
};
export default Object.freeze(spec);
