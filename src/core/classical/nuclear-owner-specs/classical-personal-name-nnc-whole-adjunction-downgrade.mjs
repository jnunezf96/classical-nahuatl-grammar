const spec = {
  "ownerId": "classical-personal-name-nnc-whole-adjunction-downgrade",
  "prefix": "ClassicalPersonalNameNncWholeAdjunctionDowngrade",
  "operationId": "classical.personal.name.nnc.whole.adjunction.downgrade.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-whole-adjunction-downgrade-source",
  "domain": "classical-personal-name-nnc-whole-adjunction-downgrade",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5214",
    "claim-p5215"
  ],
  "coordinates": {
    "claim-p5214::p5214-when-a-multiple-clause-structure-created-by-adjunction-serves": {
      "assertionId": "classical-personal-name-nnc-whole-adjunction-downgrade:p5214-when-a-multiple-clause-structure-created-by-adjunction-serves",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5215::p5215-when-a-multiple-clause-structure-created-by-adjunction-serves": {
      "assertionId": "classical-personal-name-nnc-whole-adjunction-downgrade:p5215-when-a-multiple-clause-structure-created-by-adjunction-serves",
      "canonicalPath": "result.innerSubjectBarrier"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5214": [
      "whole-adjunction-downgrade",
      "subject-supplementation",
      "default",
      ""
    ],
    "claim-p5215": [
      "whole-adjunction-downgrade",
      "subject-supplementation",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5214": "authorized",
    "claim-p5215": "authorized"
  }
};
export default Object.freeze(spec);
