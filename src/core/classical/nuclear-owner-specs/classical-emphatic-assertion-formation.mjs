const spec = {
  "ownerId": "classical-emphatic-assertion-formation",
  "prefix": "ClassicalEmphaticAssertionFormation",
  "operationId": "classical.emphatic.assertion.form",
  "inputContract": "complete-typed-classical-emphatic-assertion-formation-source",
  "domain": "classical-emphatic-assertion-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-emphatic-assertion-formation",
  "selections": [
    "claim-p1028"
  ],
  "coordinates": {
    "claim-p1028::p1028-an-affirmative-assertion-can-be-converted-into-an-emphatically": {
      "assertionId": "classical-emphatic-assertion-formation:p1028-an-affirmative-assertion-can-be-converted-into-an-emphatically",
      "canonicalPath": "emphaticParticle"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlEmphaticAssertionSystemFrame",
  "executionValidatorName": "isClassicalNahuatlEmphaticAssertionSystemFrame",
  "executionArgsBySelection": {
    "claim-p1028": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1028": "authorized"
  }
};
export default Object.freeze(spec);
