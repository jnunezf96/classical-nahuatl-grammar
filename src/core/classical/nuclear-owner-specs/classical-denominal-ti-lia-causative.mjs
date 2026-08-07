const spec = {
  "ownerId": "classical-denominal-ti-lia-causative",
  "prefix": "ClassicalDenominalTiLiaCausative",
  "operationId": "classical.denominal.ti.lia.causative.execute",
  "inputContract": "complete-typed-classical-denominal-ti-lia-causative-source",
  "domain": "classical-denominal-ti-lia-causative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2457"
  ],
  "coordinates": {
    "claim-p2457::p2457-those-verbstems-ending-in-i-that-take-lia-are": {
      "assertionId": "classical-denominal-ti-lia-causative:p2457-those-verbstems-ending-in-i-that-take-lia-are",
      "canonicalPath": "derivations.nelti.options.1.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2457": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2457": "authorized"
  }
};
export default Object.freeze(spec);
