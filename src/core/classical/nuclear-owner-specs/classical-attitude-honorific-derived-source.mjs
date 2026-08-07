const spec = {
  "ownerId": "classical-attitude-honorific-derived-source",
  "prefix": "ClassicalAttitudeHonorificDerivedSource",
  "operationId": "classical.attitude.honorific.derived.source.execute",
  "inputContract": "complete-typed-classical-attitude-honorific-derived-source-source",
  "domain": "classical-attitude-honorific-derived-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-attitude-vnc-runtime",
  "selections": [
    "claim-p3229"
  ],
  "coordinates": {
    "claim-p3229::p3229-causative-and-applicative-vncs-create-their-honorific-vncs-according": {
      "assertionId": "classical-attitude-honorific-derived-source:p3229-causative-and-applicative-vncs-create-their-honorific-vncs-according",
      "canonicalPath": "cases.honorificDerivedSource.rules.honorific-applicative"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAttitudeVncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAttitudeVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3229": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3229": "authorized"
  }
};
export default Object.freeze(spec);
