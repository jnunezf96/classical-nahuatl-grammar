const spec = {
  "ownerId": "classical-exceptional-tia-applicative",
  "prefix": "ClassicalExceptionalTiaApplicative",
  "operationId": "classical.exceptional.tia.applicative.execute",
  "inputContract": "complete-typed-classical-exceptional-tia-applicative-source",
  "domain": "classical-exceptional-tia-applicative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-applicative-runtime",
  "selections": [
    "claim-p2599",
    "claim-p2600"
  ],
  "coordinates": {
    "claim-p2599::p2599-the-formation-should-not-be-mistaken-for-a-causative": {
      "assertionId": "classical-exceptional-tia-applicative:p2599-the-formation-should-not-be-mistaken-for-a-causative",
      "canonicalPath": "formations.typeThreeNamaca.option.targetStem"
    },
    "claim-p2600::p2600-in-rare-exceptional-instances-the-suffixal-unit-tia-is": {
      "assertionId": "classical-exceptional-tia-applicative:p2600-in-rare-exceptional-instances-the-suffixal-unit-tia-is",
      "canonicalPath": "formations.typeThreeNamaca.option.derivationSubtype"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlApplicativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2599": [],
    "claim-p2600": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2599": "authorized",
    "claim-p2600": "authorized"
  }
};
export default Object.freeze(spec);
