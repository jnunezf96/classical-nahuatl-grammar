const spec = {
  "ownerId": "classical-denominal-vnc-ti-unattested-source",
  "prefix": "ClassicalDenominalVncTiUnattestedSource",
  "operationId": "classical.denominal.vnc.ti.unattested.source.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-unattested-source-source",
  "domain": "classical-denominal-vnc-ti-unattested-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4970"
  ],
  "coordinates": {
    "claim-p4970::p4970-at-times-the-source-nounstem-is-not-attested": {
      "assertionId": "classical-denominal-vnc-ti-unattested-source:p4970-at-times-the-source-nounstem-is-not-attested",
      "canonicalPath": "analysis.unsupportedProductiveGuessBlocked"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4970": [
      "ti-unattested-source",
      "inceptive-ti",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4970": "authorized"
  }
};
export default Object.freeze(spec);
