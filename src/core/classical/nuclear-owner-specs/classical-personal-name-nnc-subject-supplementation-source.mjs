const spec = {
  "ownerId": "classical-personal-name-nnc-subject-supplementation-source",
  "prefix": "ClassicalPersonalNameNncSubjectSupplementationSource",
  "operationId": "classical.personal.name.nnc.subject.supplementation.source.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-subject-supplementation-source-source",
  "domain": "classical-personal-name-nnc-subject-supplementation-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5216"
  ],
  "coordinates": {
    "claim-p5216::p5216-a-structure-of-subject-supplementation-serves-as-the-stem": {
      "assertionId": "classical-personal-name-nnc-subject-supplementation-source:p5216-a-structure-of-subject-supplementation-serves-as-the-stem",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5216": [
      "subject-supplementation-source",
      "subject-supplementation",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5216": "authorized"
  }
};
export default Object.freeze(spec);
