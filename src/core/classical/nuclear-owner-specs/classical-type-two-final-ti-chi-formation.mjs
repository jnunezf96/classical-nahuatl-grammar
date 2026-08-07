const spec = {
  "ownerId": "classical-type-two-final-ti-chi-formation",
  "prefix": "ClassicalTypeTwoFinalTiChiFormation",
  "operationId": "classical.type.two.final.ti.chi.formation.execute",
  "inputContract": "complete-typed-classical-type-two-final-ti-chi-formation-source",
  "domain": "classical-type-two-final-ti-chi-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-applicative-runtime",
  "selections": [
    "claim-p2563"
  ],
  "coordinates": {
    "claim-p2563::p2563-if-the-source-verbstem-ends-in-ti-preceded-by": {
      "assertionId": "classical-type-two-final-ti-chi-formation:p2563-if-the-source-verbstem-ends-in-ti-preceded-by",
      "canonicalPath": "formations.typeTwoFinalTi.option.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlApplicativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2563": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2563": "authorized"
  }
};
export default Object.freeze(spec);
