const spec = {
  "ownerId": "classical-exceptional-oa-lia-applicative",
  "prefix": "ClassicalExceptionalOaLiaApplicative",
  "operationId": "classical.exceptional.oa.lia.applicative.execute",
  "inputContract": "complete-typed-classical-exceptional-oa-lia-applicative-source",
  "domain": "classical-exceptional-oa-lia-applicative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-applicative-runtime",
  "selections": [
    "claim-p2596",
    "claim-p2597"
  ],
  "coordinates": {
    "claim-p2596::p2596-in-exceptional-instances-a-verb-ending-in-o-a": {
      "assertionId": "classical-exceptional-oa-lia-applicative:p2596-in-exceptional-instances-a-verb-ending-in-o-a",
      "canonicalPath": "formations.exceptionalOaLia.option.targetStem"
    },
    "claim-p2597::p2597-the-lia-is-added-to-a-replacive-imperfective-stem": {
      "assertionId": "classical-exceptional-oa-lia-applicative:p2597-the-lia-is-added-to-a-replacive-imperfective-stem",
      "canonicalPath": "formations.exceptionalOaLia.option.formationRuleTier"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlApplicativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2596": [],
    "claim-p2597": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2596": "authorized",
    "claim-p2597": "authorized"
  }
};
export default Object.freeze(spec);
