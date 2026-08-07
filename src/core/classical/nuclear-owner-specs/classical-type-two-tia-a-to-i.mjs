const spec = {
  "ownerId": "classical-type-two-tia-a-to-i",
  "prefix": "ClassicalTypeTwoTiaAToI",
  "operationId": "classical.type.two.tia.a.to.i.execute",
  "inputContract": "complete-typed-classical-type-two-tia-a-to-i-source",
  "domain": "classical-type-two-tia-a-to-i",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2424",
    "claim-p2425"
  ],
  "coordinates": {
    "claim-p2424::p2424-since-hua-is-incompatible-with-a-preceding-a-this": {
      "assertionId": "classical-type-two-tia-a-to-i:p2424-since-hua-is-incompatible-with-a-preceding-a-this",
      "canonicalPath": "derivations.neci.options.2.targetStem"
    },
    "claim-p2425::p2425-the-expected-nonactive-stem-would-end-in-k-o": {
      "assertionId": "classical-type-two-tia-a-to-i:p2425-the-expected-nonactive-stem-would-end-in-k-o",
      "canonicalPath": "derivations.neci.options.2.typeTwoBridgeStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2424": [],
    "claim-p2425": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2424": "authorized",
    "claim-p2425": "authorized"
  }
};
export default Object.freeze(spec);
