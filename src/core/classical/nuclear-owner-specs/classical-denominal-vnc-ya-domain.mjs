const spec = {
  "ownerId": "classical-denominal-vnc-ya-domain",
  "prefix": "ClassicalDenominalVncYaDomain",
  "operationId": "classical.denominal.vnc.ya.domain.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ya-domain-source",
  "domain": "classical-denominal-vnc-ya-domain",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4985"
  ],
  "coordinates": {
    "claim-p4985::p4985-the-inceptive-stative-suffix-ya-may-form-either-denominal": {
      "assertionId": "classical-denominal-vnc-ya-domain:p4985-the-inceptive-stative-suffix-ya-may-form-either-denominal",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4985": [
      "ya-domain",
      "inceptive-root-ya",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4985": "authorized"
  }
};
export default Object.freeze(spec);
