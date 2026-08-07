const spec = {
  "ownerId": "classical-type-two-consonant-a-to-i-lia",
  "prefix": "ClassicalTypeTwoConsonantAToILia",
  "operationId": "classical.type.two.consonant.a.to.i.lia.execute",
  "inputContract": "complete-typed-classical-type-two-consonant-a-to-i-lia-source",
  "domain": "classical-type-two-consonant-a-to-i-lia",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-applicative-runtime",
  "selections": [
    "claim-p2570"
  ],
  "coordinates": {
    "claim-p2570::p2570-as-a-gen-eral-rule-when-the-sound-preceding": {
      "assertionId": "classical-type-two-consonant-a-to-i-lia:p2570-as-a-gen-eral-rule-when-the-sound-preceding",
      "canonicalPath": "formations.typeTwoConsonantA.option.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlApplicativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2570": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2570": "authorized"
  }
};
export default Object.freeze(spec);
