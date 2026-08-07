const spec = {
  "ownerId": "classical-emphatic-negative-assertion-formation",
  "prefix": "ClassicalEmphaticNegativeAssertionFormation",
  "operationId": "classical.emphatic.negative.assertion.form",
  "inputContract": "complete-typed-classical-emphatic-negative-assertion-formation-source",
  "domain": "classical-emphatic-negative-assertion-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-emphatic-negative-assertion-formation",
  "selections": [
    "claim-p1030"
  ],
  "coordinates": {
    "claim-p1030::p1030-a-negative-assertion-can-be-made-emphatically-negative-by": {
      "assertionId": "classical-emphatic-negative-assertion-formation:p1030-a-negative-assertion-can-be-made-emphatically-negative-by",
      "canonicalPath": "sentenceParticles"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlEmphaticNegativeAssertionSystemFrame",
  "executionValidatorName": "isClassicalNahuatlEmphaticNegativeAssertionSystemFrame",
  "executionArgsBySelection": {
    "claim-p1030": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1030": "authorized"
  }
};
export default Object.freeze(spec);
