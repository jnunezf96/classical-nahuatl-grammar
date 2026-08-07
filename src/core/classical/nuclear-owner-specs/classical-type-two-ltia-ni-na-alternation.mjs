const spec = {
  "ownerId": "classical-type-two-ltia-ni-na-alternation",
  "prefix": "ClassicalTypeTwoLtiaNiNaAlternation",
  "operationId": "classical.type.two.ltia.ni.na.alternation.execute",
  "inputContract": "complete-typed-classical-type-two-ltia-ni-na-alternation-source",
  "domain": "classical-type-two-ltia-ni-na-alternation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2446",
    "claim-p2447"
  ],
  "coordinates": {
    "claim-p2446::p2446-the-ni-may-appear-as-ni-or-change-to": {
      "assertionId": "classical-type-two-ltia-ni-na-alternation:p2446-the-ni-may-appear-as-ni-or-change-to",
      "canonicalPath": "derivations.cualani.options.2.targetStem"
    },
    "claim-p2447::p2447-cual-a-ni-to-become-angry-this-is-an": {
      "assertionId": "classical-type-two-ltia-ni-na-alternation:p2447-cual-a-ni-to-become-angry-this-is-an",
      "canonicalPath": "derivations.cualani.options.3.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2446": [],
    "claim-p2447": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2446": "authorized",
    "claim-p2447": "authorized"
  }
};
export default Object.freeze(spec);
