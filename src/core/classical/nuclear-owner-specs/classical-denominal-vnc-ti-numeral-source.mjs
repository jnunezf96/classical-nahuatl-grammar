const spec = {
  "ownerId": "classical-denominal-vnc-ti-numeral-source",
  "prefix": "ClassicalDenominalVncTiNumeralSource",
  "operationId": "classical.denominal.vnc.ti.numeral.source.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-numeral-source-source",
  "domain": "classical-denominal-vnc-ti-numeral-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4962"
  ],
  "coordinates": {
    "claim-p4962::p4962-a-numeral-nounstem-may-serve-as-the-source": {
      "assertionId": "classical-denominal-vnc-ti-numeral-source:p4962-a-numeral-nounstem-may-serve-as-the-source",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4962": [
      "ti-numeral-source",
      "inceptive-ti",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4962": "authorized"
  }
};
export default Object.freeze(spec);
