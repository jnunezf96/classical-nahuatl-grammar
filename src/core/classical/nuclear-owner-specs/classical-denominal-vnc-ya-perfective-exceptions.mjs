const spec = {
  "ownerId": "classical-denominal-vnc-ya-perfective-exceptions",
  "prefix": "ClassicalDenominalVncYaPerfectiveExceptions",
  "operationId": "classical.denominal.vnc.ya.perfective.exceptions.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ya-perfective-exceptions-source",
  "domain": "classical-denominal-vnc-ya-perfective-exceptions",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4994"
  ],
  "coordinates": {
    "claim-p4994::p4994-but-the-following-are-among-the-exceptions": {
      "assertionId": "classical-denominal-vnc-ya-perfective-exceptions:p4994-but-the-following-are-among-the-exceptions",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4994": [
      "ya-perfective-exceptions",
      "inceptive-root-ya",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4994": "authorized"
  }
};
export default Object.freeze(spec);
