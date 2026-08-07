const spec = {
  "ownerId": "classical-type-two-ltia-ti-chi-alternation",
  "prefix": "ClassicalTypeTwoLtiaTiChiAlternation",
  "operationId": "classical.type.two.ltia.ti.chi.alternation.execute",
  "inputContract": "complete-typed-classical-type-two-ltia-ti-chi-alternation-source",
  "domain": "classical-type-two-ltia-ti-chi-alternation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2452"
  ],
  "coordinates": {
    "claim-p2452::p2452-the-active-source-stem-ends-in-a-vowel-plus": {
      "assertionId": "classical-type-two-ltia-ti-chi-alternation:p2452-the-active-source-stem-ends-in-a-vowel-plus",
      "canonicalPath": "derivations.matiProjective.options.2.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2452": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2452": "authorized"
  }
};
export default Object.freeze(spec);
