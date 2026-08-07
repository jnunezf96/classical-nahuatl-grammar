const spec = {
  "ownerId": "classical-parallel-type-one-type-two-applicatives",
  "prefix": "ClassicalParallelTypeOneTypeTwoApplicatives",
  "operationId": "classical.parallel.type.one.type.two.applicatives.execute",
  "inputContract": "complete-typed-classical-parallel-type-one-type-two-applicatives-source",
  "domain": "classical-parallel-type-one-type-two-applicatives",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-applicative-runtime",
  "selections": [
    "claim-p2601",
    "claim-p2602",
    "claim-p2603"
  ],
  "coordinates": {
    "claim-p2601::p2601-the-fact-that-a-verb-permits-the-applicative-derivation": {
      "assertionId": "classical-parallel-type-one-type-two-applicatives:p2601-the-fact-that-a-verb-permits-the-applicative-derivation",
      "canonicalPath": "formations.parallelChihuaTypeOne.option.targetStem"
    },
    "claim-p2602::p2602-te-tla-chi-hu-ia-to-bewitch-s-o": {
      "assertionId": "classical-parallel-type-one-type-two-applicatives:p2602-te-tla-chi-hu-ia-to-bewitch-s-o",
      "canonicalPath": "formations.parallelChihuaTypeTwo.option.targetStem"
    },
    "claim-p2603::p2603-te-tla-chi-hui-lia-to-do-make-s": {
      "assertionId": "classical-parallel-type-one-type-two-applicatives:p2603-te-tla-chi-hui-lia-to-do-make-s",
      "canonicalPath": "formations.parallelChihuaTypeTwo.option.derivationSubtype"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlApplicativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2601": [],
    "claim-p2602": [],
    "claim-p2603": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2601": "authorized",
    "claim-p2602": "authorized",
    "claim-p2603": "authorized"
  }
};
export default Object.freeze(spec);
