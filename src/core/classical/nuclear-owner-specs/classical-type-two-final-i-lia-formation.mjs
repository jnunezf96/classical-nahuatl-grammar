const spec = {
  "ownerId": "classical-type-two-final-i-lia-formation",
  "prefix": "ClassicalTypeTwoFinalILiaFormation",
  "operationId": "classical.type.two.final.i.lia.formation.execute",
  "inputContract": "complete-typed-classical-type-two-final-i-lia-formation-source",
  "domain": "classical-type-two-final-i-lia-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-applicative-runtime",
  "selections": [
    "claim-p2558",
    "claim-p2559"
  ],
  "coordinates": {
    "claim-p2558::p2558-both-transitive-and-intransitive-verbs-whose-imperfective-stems-end": {
      "assertionId": "classical-type-two-final-i-lia-formation:p2558-both-transitive-and-intransitive-verbs-whose-imperfective-stems-end",
      "canonicalPath": "formations.typeTwoFinalI.option.targetStem"
    },
    "claim-p2559::p2559-at-times-the-final-vowel-of-the-source-stem": {
      "assertionId": "classical-type-two-final-i-lia-formation:p2559-at-times-the-final-vowel-of-the-source-stem",
      "canonicalPath": "formations.typeTwoFinalI.option.derivationRoute"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlApplicativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2558": [],
    "claim-p2559": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2558": "authorized",
    "claim-p2559": "authorized"
  }
};
export default Object.freeze(spec);
