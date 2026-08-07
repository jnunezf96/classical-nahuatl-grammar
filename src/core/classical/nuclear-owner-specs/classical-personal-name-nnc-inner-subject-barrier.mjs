const spec = {
  "ownerId": "classical-personal-name-nnc-inner-subject-barrier",
  "prefix": "ClassicalPersonalNameNncInnerSubjectBarrier",
  "operationId": "classical.personal.name.nnc.inner.subject.barrier.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-inner-subject-barrier-source",
  "domain": "classical-personal-name-nnc-inner-subject-barrier",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5165"
  ],
  "coordinates": {
    "claim-p5165::p5165-the-inner-subject-pronoun-has-an-important-function-it": {
      "assertionId": "classical-personal-name-nnc-inner-subject-barrier:p5165-the-inner-subject-pronoun-has-an-important-function-it",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5165": [
      "inner-subject-barrier",
      "reflexive-preterit-agentive",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5165": "authorized"
  }
};
export default Object.freeze(spec);
