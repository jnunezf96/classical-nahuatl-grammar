const spec = {
  "ownerId": "classical-type-two-final-chi-formation",
  "prefix": "ClassicalTypeTwoFinalChiFormation",
  "operationId": "classical.type.two.final.chi.formation.execute",
  "inputContract": "complete-typed-classical-type-two-final-chi-formation-source",
  "domain": "classical-type-two-final-chi-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-applicative-runtime",
  "selections": [
    "claim-p2561",
    "claim-p2562"
  ],
  "coordinates": {
    "claim-p2561::p2561-if-the-source-stem-ends-in-c-i-the": {
      "assertionId": "classical-type-two-final-chi-formation:p2561-if-the-source-stem-ends-in-c-i-the",
      "canonicalPath": "formations.typeTwoFinalTzi.option.targetStem"
    },
    "claim-p2562::p2562-te-tla-ce-huechi-lia-impers-for-freezing-to": {
      "assertionId": "classical-type-two-final-chi-formation:p2562-te-tla-ce-huechi-lia-impers-for-freezing-to",
      "canonicalPath": "formations.typeTwoFinalTzi.option.derivationRoute"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlApplicativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2561": [],
    "claim-p2562": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2561": "authorized",
    "claim-p2562": "authorized"
  }
};
export default Object.freeze(spec);
