const spec = {
  "ownerId": "classical-type-two-final-si-xi-formation",
  "prefix": "ClassicalTypeTwoFinalSiXiFormation",
  "operationId": "classical.type.two.final.si.xi.formation.execute",
  "inputContract": "complete-typed-classical-type-two-final-si-xi-formation-source",
  "domain": "classical-type-two-final-si-xi-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-applicative-runtime",
  "selections": [
    "claim-p2560"
  ],
  "coordinates": {
    "claim-p2560::p2560-if-the-source-stem-ends-in-si-this-changes": {
      "assertionId": "classical-type-two-final-si-xi-formation:p2560-if-the-source-stem-ends-in-si-this-changes",
      "canonicalPath": "formations.typeTwoFinalSi.option.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlApplicativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2560": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2560": "authorized"
  }
};
export default Object.freeze(spec);
