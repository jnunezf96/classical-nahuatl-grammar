const spec = {
  "ownerId": "classical-attitude-compound-matrix",
  "prefix": "ClassicalAttitudeCompoundMatrix",
  "operationId": "classical.attitude.compound.matrix.execute",
  "inputContract": "complete-typed-classical-attitude-compound-matrix-source",
  "domain": "classical-attitude-compound-matrix",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-attitude-vnc-runtime",
  "selections": [
    "claim-p3249",
    "claim-p3250"
  ],
  "coordinates": {
    "claim-p3249::p3249-if-a-compound-stem-has-taken-on-an-idiomatic": {
      "assertionId": "classical-attitude-compound-matrix:p3249-if-a-compound-stem-has-taken-on-an-idiomatic",
      "canonicalPath": "cases.compoundMatrix.rules.attitude-compound"
    },
    "claim-p3250::p3250-in-the-instance-of-a-shared-object-compound-vnc": {
      "assertionId": "classical-attitude-compound-matrix:p3250-in-the-instance-of-a-shared-object-compound-vnc",
      "canonicalPath": "cases.compoundMatrix.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAttitudeVncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAttitudeVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3249": [],
    "claim-p3250": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3249": "authorized",
    "claim-p3250": "authorized"
  }
};
export default Object.freeze(spec);
