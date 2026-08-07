const spec = {
  "ownerId": "classical-denominal-vnc-tiya-synonymy",
  "prefix": "ClassicalDenominalVncTiyaSynonymy",
  "operationId": "classical.denominal.vnc.tiya.synonymy.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-tiya-synonymy-source",
  "domain": "classical-denominal-vnc-tiya-synonymy",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5000"
  ],
  "coordinates": {
    "claim-p5000::p5000-the-source-and-derived-verbstems-normally-have-the-same": {
      "assertionId": "classical-denominal-vnc-tiya-synonymy:p5000-the-source-and-derived-verbstems-normally-have-the-same",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5000": [
      "tiya-synonymy",
      "inceptive-ti-ya",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5000": "authorized"
  }
};
export default Object.freeze(spec);
