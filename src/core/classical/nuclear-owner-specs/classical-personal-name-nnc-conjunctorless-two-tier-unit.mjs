const spec = {
  "ownerId": "classical-personal-name-nnc-conjunctorless-two-tier-unit",
  "prefix": "ClassicalPersonalNameNncConjunctorlessTwoTierUnit",
  "operationId": "classical.personal.name.nnc.conjunctorless.two.tier.unit.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-conjunctorless-two-tier-unit-source",
  "domain": "classical-personal-name-nnc-conjunctorless-two-tier-unit",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5227",
    "claim-p5228",
    "claim-p5229"
  ],
  "coordinates": {
    "claim-p5227::p5227-when-a-multiple-clause-structure-created-by-conjunctorless-conjunction": {
      "assertionId": "classical-personal-name-nnc-conjunctorless-two-tier-unit:p5227-when-a-multiple-clause-structure-created-by-conjunctorless-conjunction",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5228::p5228-when-a-multiple-clause-structure-created-by-conjunctorless-conjunction": {
      "assertionId": "classical-personal-name-nnc-conjunctorless-two-tier-unit:p5228-when-a-multiple-clause-structure-created-by-conjunctorless-conjunction",
      "canonicalPath": "result.innerSubjectBarrier"
    },
    "claim-p5229::p5229-this-means-that-the-two-or-more-inner-subject": {
      "assertionId": "classical-personal-name-nnc-conjunctorless-two-tier-unit:p5229-this-means-that-the-two-or-more-inner-subject",
      "canonicalPath": "result.sourceFamily"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5227": [
      "conjunctorless-two-tier-unit",
      "conjunctorless-personal-name-unit",
      "default",
      ""
    ],
    "claim-p5228": [
      "conjunctorless-two-tier-unit",
      "conjunctorless-personal-name-unit",
      "default",
      ""
    ],
    "claim-p5229": [
      "conjunctorless-two-tier-unit",
      "conjunctorless-personal-name-unit",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5227": "authorized",
    "claim-p5228": "authorized",
    "claim-p5229": "authorized"
  }
};
export default Object.freeze(spec);
