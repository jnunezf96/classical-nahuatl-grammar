const spec = {
  "ownerId": "classical-type-two-tia-s-to-x",
  "prefix": "ClassicalTypeTwoTiaSToX",
  "operationId": "classical.type.two.tia.s.to.x.execute",
  "inputContract": "complete-typed-classical-type-two-tia-s-to-x-source",
  "domain": "classical-type-two-tia-s-to-x",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2426",
    "claim-p2427"
  ],
  "coordinates": {
    "claim-p2426::p2426-the-s-changes-to-s": {
      "assertionId": "classical-type-two-tia-s-to-x:p2426-the-s-changes-to-s",
      "canonicalPath": "derivations.quiza.options.0.targetStem"
    },
    "claim-p2427::p2427-the-a-is-replaced-with-i-as-in-item": {
      "assertionId": "classical-type-two-tia-s-to-x:p2427-the-a-is-replaced-with-i-as-in-item",
      "canonicalPath": "derivations.quiza.options.0.typeTwoBridgeStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2426": [],
    "claim-p2427": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2426": "authorized",
    "claim-p2427": "authorized"
  }
};
export default Object.freeze(spec);
