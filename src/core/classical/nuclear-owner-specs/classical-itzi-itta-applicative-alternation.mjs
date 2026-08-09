const spec = {
  "ownerId": "classical-itzi-itta-applicative-alternation",
  "prefix": "ClassicalItziIttaApplicativeAlternation",
  "operationId": "classical.itzi.itta.applicative.alternation.execute",
  "inputContract": "complete-typed-classical-itzi-itta-applicative-alternation-source",
  "domain": "classical-itzi-itta-applicative-alternation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-applicative-runtime",
  "selections": [
    "claim-p2534",
    "claim-p2535",
    "claim-p2533-02",
    "claim-p2533-04",
    "claim-p2533-05",
    "claim-p2533-06"
  ],
  "coordinates": {
    "claim-p2534::p2534-in-addition-to-the-irregular-base-itt-the-derived": {
      "assertionId": "classical-itzi-itta-applicative-alternation:p2534-in-addition-to-the-irregular-base-itt-the-derived",
      "canonicalPath": "formations.irregularItzi.option.derivationSubtype"
    },
    "claim-p2535::p2535-itzi-nor-te-tla-itt-a-can-appear-in": {
      "assertionId": "classical-itzi-itta-applicative-alternation:p2535-itzi-nor-te-tla-itt-a-can-appear-in",
      "canonicalPath": "formations.valenceNeutralItzi.option.targetStem"
    },
    "claim-p2533-02::itta-geminate-unique": {
      "assertionId": "classical-itzi-itta-applicative-alternation:itta-geminate-unique",
      "canonicalPath": "formations.irregularItzi.option.geminateStatus"
    },
    "claim-p2533-04::itta-phonological-shift": {
      "assertionId": "classical-itzi-itta-applicative-alternation:itta-phonological-shift",
      "canonicalPath": "formations.irregularItzi.option.phonologicalShift.operation"
    },
    "claim-p2533-05::itta-defective-source": {
      "assertionId": "classical-itzi-itta-applicative-alternation:itta-defective-source",
      "canonicalPath": "formations.irregularItzi.option.sourceMeaning"
    },
    "claim-p2533-06::itta-release-feature-result": {
      "assertionId": "classical-itzi-itta-applicative-alternation:itta-release-feature-result",
      "canonicalPath": "formations.irregularItzi.option.phonologicalShift.writtenManifestation"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlApplicativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2534": [],
    "claim-p2535": [],
    "claim-p2533-02": [],
    "claim-p2533-04": [],
    "claim-p2533-05": [],
    "claim-p2533-06": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2534": "authorized",
    "claim-p2535": "authorized",
    "claim-p2533-02": "authorized",
    "claim-p2533-04": "authorized",
    "claim-p2533-05": "authorized",
    "claim-p2533-06": "authorized"
  }
};
export default Object.freeze(spec);
