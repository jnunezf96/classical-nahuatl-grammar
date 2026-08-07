const spec = {
  "ownerId": "classical-denominal-vnc-ti-a-unattested-source",
  "prefix": "ClassicalDenominalVncTiAUnattestedSource",
  "operationId": "classical.denominal.vnc.ti.a.unattested.source.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-a-unattested-source-source",
  "domain": "classical-denominal-vnc-ti-a-unattested-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5069"
  ],
  "coordinates": {
    "claim-p5069::p5069-the-intransitive-verbstem-source-may-not-be-attested": {
      "assertionId": "classical-denominal-vnc-ti-a-unattested-source:p5069-the-intransitive-verbstem-source-may-not-be-attested",
      "canonicalPath": "analysis.unsupportedProductiveGuessBlocked"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5069": [
      "ti-a-unattested-source",
      "ti-a-causative-single",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5069": "authorized"
  }
};
export default Object.freeze(spec);
