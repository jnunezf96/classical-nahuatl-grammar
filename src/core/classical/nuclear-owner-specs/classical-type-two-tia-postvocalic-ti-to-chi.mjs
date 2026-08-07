const spec = {
  "ownerId": "classical-type-two-tia-postvocalic-ti-to-chi",
  "prefix": "ClassicalTypeTwoTiaPostvocalicTiToChi",
  "operationId": "classical.type.two.tia.postvocalic.ti.to.chi.execute",
  "inputContract": "complete-typed-classical-type-two-tia-postvocalic-ti-to-chi-source",
  "domain": "classical-type-two-tia-postvocalic-ti-to-chi",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2428",
    "claim-p2429"
  ],
  "coordinates": {
    "claim-p2428::p2428-in-certain-instances-when-ti-is-postvocalic-it-changes": {
      "assertionId": "classical-type-two-tia-postvocalic-ti-to-chi:p2428-in-certain-instances-when-ti-is-postvocalic-it-changes",
      "canonicalPath": "derivations.matiProjective.options.1.targetStem"
    },
    "claim-p2429::p2429-the-a-is-replaced-with-i-as-in-item": {
      "assertionId": "classical-type-two-tia-postvocalic-ti-to-chi:p2429-the-a-is-replaced-with-i-as-in-item",
      "canonicalPath": "derivations.matiProjective.options.1.typeTwoBridgeStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2428": [],
    "claim-p2429": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2428": "authorized",
    "claim-p2429": "authorized"
  }
};
export default Object.freeze(spec);
