const spec = {
  "ownerId": "classical-type-two-tia-long-base",
  "prefix": "ClassicalTypeTwoTiaLongBase",
  "operationId": "classical.type.two.tia.long.base.execute",
  "inputContract": "complete-typed-classical-type-two-tia-long-base-source",
  "domain": "classical-type-two-tia-long-base",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2422",
    "claim-p2423"
  ],
  "coordinates": {
    "claim-p2422::p2422-the-formation-is-usually-distinguished-by-a-long-base": {
      "assertionId": "classical-type-two-tia-long-base:p2422-the-formation-is-usually-distinguished-by-a-long-base",
      "canonicalPath": "derivations.temi.options.1.targetStem"
    },
    "claim-p2423::p2423-frequently-when-two-consonants-appear-before-the-i-it": {
      "assertionId": "classical-type-two-tia-long-base:p2423-frequently-when-two-consonants-appear-before-the-i-it",
      "canonicalPath": "derivations.temi.options.1.typeTwoBridgeStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2422": [],
    "claim-p2423": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2422": "authorized",
    "claim-p2423": "authorized"
  }
};
export default Object.freeze(spec);
