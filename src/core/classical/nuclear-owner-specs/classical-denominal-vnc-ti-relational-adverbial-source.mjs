const spec = {
  "ownerId": "classical-denominal-vnc-ti-relational-adverbial-source",
  "prefix": "ClassicalDenominalVncTiRelationalAdverbialSource",
  "operationId": "classical.denominal.vnc.ti.relational.adverbial.source.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-relational-adverbial-source-source",
  "domain": "classical-denominal-vnc-ti-relational-adverbial-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4968"
  ],
  "coordinates": {
    "claim-p4968::p4968-an-adverbialized-nounstem-formed-on-a-relational-nounstem-may": {
      "assertionId": "classical-denominal-vnc-ti-relational-adverbial-source:p4968-an-adverbialized-nounstem-formed-on-a-relational-nounstem-may",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4968": [
      "ti-relational-adverbial-source",
      "inceptive-ti",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4968": "authorized"
  }
};
export default Object.freeze(spec);
