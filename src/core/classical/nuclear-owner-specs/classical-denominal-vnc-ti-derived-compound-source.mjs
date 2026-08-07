const spec = {
  "ownerId": "classical-denominal-vnc-ti-derived-compound-source",
  "prefix": "ClassicalDenominalVncTiDerivedCompoundSource",
  "operationId": "classical.denominal.vnc.ti.derived.compound.source.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-derived-compound-source-source",
  "domain": "classical-denominal-vnc-ti-derived-compound-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4961"
  ],
  "coordinates": {
    "claim-p4961::p4961-a-derived-or-compound-nounstem-may-serve-as-the": {
      "assertionId": "classical-denominal-vnc-ti-derived-compound-source:p4961-a-derived-or-compound-nounstem-may-serve-as-the",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4961": [
      "ti-derived-compound-source",
      "inceptive-ti",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4961": "authorized"
  }
};
export default Object.freeze(spec);
