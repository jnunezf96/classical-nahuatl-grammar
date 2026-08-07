const spec = {
  "ownerId": "classical-type-two-ltia-ci-xi-alternation",
  "prefix": "ClassicalTypeTwoLtiaCiXiAlternation",
  "operationId": "classical.type.two.ltia.ci.xi.alternation.execute",
  "inputContract": "complete-typed-classical-type-two-ltia-ci-xi-alternation-source",
  "domain": "classical-type-two-ltia-ci-xi-alternation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2449",
    "claim-p2450"
  ],
  "coordinates": {
    "claim-p2449::p2449-the-active-source-stem-ends-in-si-the-s": {
      "assertionId": "classical-type-two-ltia-ci-xi-alternation:p2449-the-active-source-stem-ends-in-si-the-s",
      "canonicalPath": "derivations.imacaci.options.1.targetStem"
    },
    "claim-p2450::p2450-occasionally-a-final-sa-of-the-active-source-stem": {
      "assertionId": "classical-type-two-ltia-ci-xi-alternation:p2450-occasionally-a-final-sa-of-the-active-source-stem",
      "canonicalPath": "derivations.ihza.options.2.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2449": [],
    "claim-p2450": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2449": "authorized",
    "claim-p2450": "authorized"
  }
};
export default Object.freeze(spec);
