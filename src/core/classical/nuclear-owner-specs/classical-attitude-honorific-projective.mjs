const spec = {
  "ownerId": "classical-attitude-honorific-projective",
  "prefix": "ClassicalAttitudeHonorificProjective",
  "operationId": "classical.attitude.honorific.projective.execute",
  "inputContract": "complete-typed-classical-attitude-honorific-projective-source",
  "domain": "classical-attitude-honorific-projective",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-attitude-vnc-runtime",
  "selections": [
    "claim-p3223",
    "claim-p3228"
  ],
  "coordinates": {
    "claim-p3223::p3223-as-a-general-rule-a-vnc-with-a-projective": {
      "assertionId": "classical-attitude-honorific-projective:p3223-as-a-general-rule-a-vnc-with-a-projective",
      "canonicalPath": "cases.honorificProjective.rules.honorific-projective"
    },
    "claim-p3228::p3228-with-projective-verbs-the-honorific-vnc-may-occur-even": {
      "assertionId": "classical-attitude-honorific-projective:p3228-with-projective-verbs-the-honorific-vnc-may-occur-even",
      "canonicalPath": "cases.honorificProjective.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAttitudeVncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAttitudeVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3223": [],
    "claim-p3228": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3223": "authorized",
    "claim-p3228": "authorized"
  }
};
export default Object.freeze(spec);
