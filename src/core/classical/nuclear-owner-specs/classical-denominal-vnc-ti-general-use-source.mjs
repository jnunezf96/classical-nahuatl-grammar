const spec = {
  "ownerId": "classical-denominal-vnc-ti-general-use-source",
  "prefix": "ClassicalDenominalVncTiGeneralUseSource",
  "operationId": "classical.denominal.vnc.ti.general.use.source.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-general-use-source-source",
  "domain": "classical-denominal-vnc-ti-general-use-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4965"
  ],
  "coordinates": {
    "claim-p4965::p4965-the-verbstem-forming-suffix-is-attached-to-the-general": {
      "assertionId": "classical-denominal-vnc-ti-general-use-source:p4965-the-verbstem-forming-suffix-is-attached-to-the-general",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4965": [
      "ti-general-use-source",
      "inceptive-ti",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4965": "authorized"
  }
};
export default Object.freeze(spec);
