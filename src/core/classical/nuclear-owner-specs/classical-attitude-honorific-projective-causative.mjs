const spec = {
  "ownerId": "classical-attitude-honorific-projective-causative",
  "prefix": "ClassicalAttitudeHonorificProjectiveCausative",
  "operationId": "classical.attitude.honorific.projective.causative.execute",
  "inputContract": "complete-typed-classical-attitude-honorific-projective-causative-source",
  "domain": "classical-attitude-honorific-projective-causative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-attitude-vnc-runtime",
  "selections": [
    "claim-p3230"
  ],
  "coordinates": {
    "claim-p3230::p3230-certain-transitive-vncs-that-have-projective-object-pronouns-create": {
      "assertionId": "classical-attitude-honorific-projective-causative:p3230-certain-transitive-vncs-that-have-projective-object-pronouns-create",
      "canonicalPath": "cases.honorificProjectiveCausative.rules.honorific-causative"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAttitudeVncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAttitudeVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3230": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3230": "authorized"
  }
};
export default Object.freeze(spec);
