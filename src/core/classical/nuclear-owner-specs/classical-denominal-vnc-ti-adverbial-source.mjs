const spec = {
  "ownerId": "classical-denominal-vnc-ti-adverbial-source",
  "prefix": "ClassicalDenominalVncTiAdverbialSource",
  "operationId": "classical.denominal.vnc.ti.adverbial.source.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-adverbial-source-source",
  "domain": "classical-denominal-vnc-ti-adverbial-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4967"
  ],
  "coordinates": {
    "claim-p4967::p4967-the-nounstem-of-an-adverbialized-nnc-may-serve-as": {
      "assertionId": "classical-denominal-vnc-ti-adverbial-source:p4967-the-nounstem-of-an-adverbialized-nnc-may-serve-as",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4967": [
      "ti-adverbial-source",
      "inceptive-ti",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4967": "authorized"
  }
};
export default Object.freeze(spec);
