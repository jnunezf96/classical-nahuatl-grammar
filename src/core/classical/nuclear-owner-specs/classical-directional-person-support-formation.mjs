const spec = {
  "ownerId": "classical-directional-person-support-formation",
  "prefix": "ClassicalDirectionalPersonSupportFormation",
  "operationId": "classical.directional.person.support.form",
  "inputContract": "complete-typed-classical-directional-person-support-formation-source",
  "domain": "classical-directional-person-support-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-directional-person-support-formation",
  "selections": [
    "claim-p978",
    "claim-p979",
    "claim-p980",
    "claim-p981",
    "claim-p982"
  ],
  "coordinates": {
    "claim-p978::p978-the-supportive-vowel-i-on-a-pers1-morph-is": {
      "assertionId": "classical-directional-person-support-formation:p978-the-supportive-vowel-i-on-a-pers1-morph-is",
      "canonicalPath": "supportiveIToOApplied"
    },
    "claim-p979::p979-result-the-supportive-vowel-i-on-a-pers1-morph": {
      "assertionId": "classical-directional-person-support-formation:p979-result-the-supportive-vowel-i-on-a-pers1-morph",
      "canonicalPath": "supportiveIToOApplied"
    },
    "claim-p980::p980-ni-c-on-no-c-on": {
      "assertionId": "classical-directional-person-support-formation:p980-ni-c-on-no-c-on",
      "canonicalPath": "firstPersonFormula"
    },
    "claim-p981::p981-ti-c-on-to-c-on": {
      "assertionId": "classical-directional-person-support-formation:p981-ti-c-on-to-c-on",
      "canonicalPath": "secondPersonFormula"
    },
    "claim-p982::p982-xi-c-on-xo-c-on": {
      "assertionId": "classical-directional-person-support-formation:p982-xi-c-on-xo-c-on",
      "canonicalPath": "optativeSecondFormula"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDirectionalPersonSupportSystemFrame",
  "executionValidatorName": "isClassicalNahuatlDirectionalPersonSupportSystemFrame",
  "executionArgsBySelection": {
    "claim-p978": [],
    "claim-p979": [],
    "claim-p980": [],
    "claim-p981": [],
    "claim-p982": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p978": "authorized",
    "claim-p979": "authorized",
    "claim-p980": "authorized",
    "claim-p981": "authorized",
    "claim-p982": "authorized"
  }
};
export default Object.freeze(spec);
