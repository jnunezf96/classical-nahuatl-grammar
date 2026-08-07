const spec = {
  "ownerId": "classical-attitude-honorific-applicative",
  "prefix": "ClassicalAttitudeHonorificApplicative",
  "operationId": "classical.attitude.honorific.applicative.execute",
  "inputContract": "complete-typed-classical-attitude-honorific-applicative-source",
  "domain": "classical-attitude-honorific-applicative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-attitude-vnc-runtime",
  "selections": [
    "claim-p3221",
    "claim-p3222"
  ],
  "coordinates": {
    "claim-p3221::p3221-certain-intransitive-verbs-create-honorific-vncs-by-using-their": {
      "assertionId": "classical-attitude-honorific-applicative:p3221-certain-intransitive-verbs-create-honorific-vncs-by-using-their",
      "canonicalPath": "cases.honorificApplicative.rules.honorific-applicative"
    },
    "claim-p3222::p3222-the-honored-subject-entity-is-presented-as-performing-an": {
      "assertionId": "classical-attitude-honorific-applicative:p3222-the-honored-subject-entity-is-presented-as-performing-an",
      "canonicalPath": "cases.honorificApplicative.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAttitudeVncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAttitudeVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3221": [],
    "claim-p3222": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3221": "authorized",
    "claim-p3222": "authorized"
  }
};
export default Object.freeze(spec);
