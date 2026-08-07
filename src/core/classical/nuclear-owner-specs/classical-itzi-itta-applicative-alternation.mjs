const spec = {
  "ownerId": "classical-itzi-itta-applicative-alternation",
  "prefix": "ClassicalItziIttaApplicativeAlternation",
  "operationId": "classical.itzi.itta.applicative.alternation.execute",
  "inputContract": "complete-typed-classical-itzi-itta-applicative-alternation-source",
  "domain": "classical-itzi-itta-applicative-alternation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-applicative-runtime",
  "selections": [
    "claim-p2533",
    "claim-p2534",
    "claim-p2535"
  ],
  "coordinates": {
    "claim-p2533::p2533-judging-by-its-translation-of-to-see-s-o": {
      "assertionId": "classical-itzi-itta-applicative-alternation:p2533-judging-by-its-translation-of-to-see-s-o",
      "canonicalPath": "formations.irregularItzi.option.targetStem"
    },
    "claim-p2534::p2534-in-addition-to-the-irregular-base-itt-the-derived": {
      "assertionId": "classical-itzi-itta-applicative-alternation:p2534-in-addition-to-the-irregular-base-itt-the-derived",
      "canonicalPath": "formations.irregularItzi.option.derivationSubtype"
    },
    "claim-p2535::p2535-itzi-nor-te-tla-itt-a-can-appear-in": {
      "assertionId": "classical-itzi-itta-applicative-alternation:p2535-itzi-nor-te-tla-itt-a-can-appear-in",
      "canonicalPath": "formations.valenceNeutralItzi.option.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlApplicativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2533": [],
    "claim-p2534": [],
    "claim-p2535": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2533": "authorized",
    "claim-p2534": "authorized",
    "claim-p2535": "authorized"
  }
};
export default Object.freeze(spec);
