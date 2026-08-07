const spec = {
  "ownerId": "classical-denominal-vnc-tiya-deverbal-formation",
  "prefix": "ClassicalDenominalVncTiyaDeverbalFormation",
  "operationId": "classical.denominal.vnc.tiya.deverbal.formation.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-tiya-deverbal-formation-source",
  "domain": "classical-denominal-vnc-tiya-deverbal-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4999"
  ],
  "coordinates": {
    "claim-p4999::p4999-the-ya-is-used-to-form-deverbal-verbstems-from": {
      "assertionId": "classical-denominal-vnc-tiya-deverbal-formation:p4999-the-ya-is-used-to-form-deverbal-verbstems-from",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4999": [
      "tiya-deverbal-formation",
      "inceptive-ti-ya",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4999": "authorized"
  }
};
export default Object.freeze(spec);
