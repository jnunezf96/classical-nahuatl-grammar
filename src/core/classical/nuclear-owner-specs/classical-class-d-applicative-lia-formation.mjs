const spec = {
  "ownerId": "classical-class-d-applicative-lia-formation",
  "prefix": "ClassicalClassDApplicativeLiaFormation",
  "operationId": "classical.class.d.applicative.lia.formation.execute",
  "inputContract": "complete-typed-classical-class-d-applicative-lia-formation-source",
  "domain": "classical-class-d-applicative-lia-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-applicative-runtime",
  "selections": [
    "claim-p2578",
    "claim-p2579"
  ],
  "coordinates": {
    "claim-p2578::p2578-this-means-that-the-final-vowel-of-the-source": {
      "assertionId": "classical-class-d-applicative-lia-formation:p2578-this-means-that-the-final-vowel-of-the-source",
      "canonicalPath": "formations.classDFinalLong.option.targetStem"
    },
    "claim-p2579::p2579-class-d-stems-form-the-applicative-stem-by-adding": {
      "assertionId": "classical-class-d-applicative-lia-formation:p2579-class-d-stems-form-the-applicative-stem-by-adding",
      "canonicalPath": "formations.classDFinalLong.option.derivationRoute"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlApplicativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2578": [],
    "claim-p2579": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2578": "authorized",
    "claim-p2579": "authorized"
  }
};
export default Object.freeze(spec);
