const spec = {
  "ownerId": "classical-denominal-vnc-ti-num1-exception",
  "prefix": "ClassicalDenominalVncTiNum1Exception",
  "operationId": "classical.denominal.vnc.ti.num1.exception.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ti-num1-exception-source",
  "domain": "classical-denominal-vnc-ti-num1-exception",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4971"
  ],
  "coordinates": {
    "claim-p4971::p4971-in-certain-exceptional-instances-the-ti-suffix-can-be": {
      "assertionId": "classical-denominal-vnc-ti-num1-exception:p4971-in-certain-exceptional-instances-the-ti-suffix-can-be",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4971": [
      "ti-num1-exception",
      "inceptive-ti",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4971": "authorized"
  }
};
export default Object.freeze(spec);
