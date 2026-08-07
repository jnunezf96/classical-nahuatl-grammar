const spec = {
  "ownerId": "classical-attitude-honorific-motion",
  "prefix": "ClassicalAttitudeHonorificMotion",
  "operationId": "classical.attitude.honorific.motion.execute",
  "inputContract": "complete-typed-classical-attitude-honorific-motion-source",
  "domain": "classical-attitude-honorific-motion",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-attitude-vnc-runtime",
  "selections": [
    "claim-p3219",
    "claim-p3220"
  ],
  "coordinates": {
    "claim-p3219::p3219-the-irregular-intransitive-verbs-ya-uh-and-hua-l": {
      "assertionId": "classical-attitude-honorific-motion:p3219-the-irregular-intransitive-verbs-ya-uh-and-hua-l",
      "canonicalPath": "cases.honorificMotion.rules.honorific-irregular"
    },
    "claim-p3220::p3220-because-optative-mood-vncs-cannot-be-formed-on-the": {
      "assertionId": "classical-attitude-honorific-motion:p3220-because-optative-mood-vncs-cannot-be-formed-on-the",
      "canonicalPath": "cases.honorificMotion.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAttitudeVncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAttitudeVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3219": [],
    "claim-p3220": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3219": "authorized",
    "claim-p3220": "authorized"
  }
};
export default Object.freeze(spec);
