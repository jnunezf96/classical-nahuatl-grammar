const spec = {
  "ownerId": "classical-attitude-reverential-double",
  "prefix": "ClassicalAttitudeReverentialDouble",
  "operationId": "classical.attitude.reverential.double.execute",
  "inputContract": "complete-typed-classical-attitude-reverential-double-source",
  "domain": "classical-attitude-reverential-double",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-attitude-vnc-runtime",
  "selections": [
    "claim-p3240",
    "claim-p3241"
  ],
  "coordinates": {
    "claim-p3240::p3240-a-reverential-vnc-is-a-subtype-of-the-honorific": {
      "assertionId": "classical-attitude-reverential-double:p3240-a-reverential-vnc-is-a-subtype-of-the-honorific",
      "canonicalPath": "cases.reverentialDouble.rules.reverential-double"
    },
    "claim-p3241::p3241-the-expression-of-respect-is-heightened-to-the-point": {
      "assertionId": "classical-attitude-reverential-double:p3241-the-expression-of-respect-is-heightened-to-the-point",
      "canonicalPath": "cases.reverentialDouble.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAttitudeVncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAttitudeVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3240": [],
    "claim-p3241": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3240": "authorized",
    "claim-p3241": "authorized"
  }
};
export default Object.freeze(spec);
