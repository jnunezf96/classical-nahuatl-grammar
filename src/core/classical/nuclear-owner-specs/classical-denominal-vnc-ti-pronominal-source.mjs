const spec = {
  "ownerId": "classical-denominal-vnc-ti-pronominal-source",
  "prefix": "ClassicalDenominalVncTiPronominalSource",
  "operationId": "classical.denominal.vnc.ti.pronominal.source.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-pronominal-source-source",
  "domain": "classical-denominal-vnc-ti-pronominal-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4963"
  ],
  "coordinates": {
    "claim-p4963::p4963-certain-pronominal-stems-may-serve-as-the-source": {
      "assertionId": "classical-denominal-vnc-ti-pronominal-source:p4963-certain-pronominal-stems-may-serve-as-the-source",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4963": [
      "ti-pronominal-source",
      "inceptive-ti",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4963": "authorized"
  }
};
export default Object.freeze(spec);
