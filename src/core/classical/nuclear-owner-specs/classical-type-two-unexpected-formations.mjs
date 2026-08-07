const spec = {
  "ownerId": "classical-type-two-unexpected-formations",
  "prefix": "ClassicalTypeTwoUnexpectedFormations",
  "operationId": "classical.type.two.unexpected.formations.execute",
  "inputContract": "complete-typed-classical-type-two-unexpected-formations-source",
  "domain": "classical-type-two-unexpected-formations",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2439",
    "claim-p2440",
    "claim-p2441"
  ],
  "coordinates": {
    "claim-p2439::p2439-among-the-unexpected-causative-stem-formations-from-o-or": {
      "assertionId": "classical-type-two-unexpected-formations:p2439-among-the-unexpected-causative-stem-formations-from-o-or",
      "canonicalPath": "derivations.mahui.options.2.targetStem"
    },
    "claim-p2440::p2440-the-active-source-stem-ends-in-wi": {
      "assertionId": "classical-type-two-unexpected-formations:p2440-the-active-source-stem-ends-in-wi",
      "canonicalPath": "derivations.mahui.options.2.formulaTargetStem"
    },
    "claim-p2441::p2441-the-active-source-is-a-transitive-stem-ending-in": {
      "assertionId": "classical-type-two-unexpected-formations:p2441-the-active-source-is-a-transitive-stem-ending-in",
      "canonicalPath": "derivations.quemi.options.1.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2439": [],
    "claim-p2440": [],
    "claim-p2441": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2439": "authorized",
    "claim-p2440": "authorized",
    "claim-p2441": "authorized"
  }
};
export default Object.freeze(spec);
