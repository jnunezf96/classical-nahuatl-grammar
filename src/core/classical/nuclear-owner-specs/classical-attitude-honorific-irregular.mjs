const spec = {
  "ownerId": "classical-attitude-honorific-irregular",
  "prefix": "ClassicalAttitudeHonorificIrregular",
  "operationId": "classical.attitude.honorific.irregular.execute",
  "inputContract": "complete-typed-classical-attitude-honorific-irregular-source",
  "domain": "classical-attitude-honorific-irregular",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-attitude-vnc-runtime",
  "selections": [
    "claim-p3217",
    "claim-p3218"
  ],
  "coordinates": {
    "claim-p3217::p3217-usually-however-all-four-of-these-irregular-verbs-prefer": {
      "assertionId": "classical-attitude-honorific-irregular:p3217-usually-however-all-four-of-these-irregular-verbs-prefer",
      "canonicalPath": "cases.honorificIrregular.rules.honorific-irregular"
    },
    "claim-p3218::p3218-but-this-is-a-unique-formation-having-a-structure": {
      "assertionId": "classical-attitude-honorific-irregular:p3218-but-this-is-a-unique-formation-having-a-structure",
      "canonicalPath": "cases.honorificIrregular.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAttitudeVncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAttitudeVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3217": [],
    "claim-p3218": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3217": "authorized",
    "claim-p3218": "authorized"
  }
};
export default Object.freeze(spec);
