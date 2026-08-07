const spec = {
  "ownerId": "classical-denominal-vnc-ti-absolutive-source",
  "prefix": "ClassicalDenominalVncTiAbsolutiveSource",
  "operationId": "classical.denominal.vnc.ti.absolutive.source.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-absolutive-source-source",
  "domain": "classical-denominal-vnc-ti-absolutive-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4960"
  ],
  "coordinates": {
    "claim-p4960::p4960-the-inceptive-stative-suffix-ti-is-attached-directly-to": {
      "assertionId": "classical-denominal-vnc-ti-absolutive-source:p4960-the-inceptive-stative-suffix-ti-is-attached-directly-to",
      "canonicalPath": "result.sourceState"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4960": [
      "ti-absolutive-source",
      "inceptive-ti",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4960": "authorized"
  }
};
export default Object.freeze(spec);
