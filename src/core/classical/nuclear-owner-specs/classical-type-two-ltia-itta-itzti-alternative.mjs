const spec = {
  "ownerId": "classical-type-two-ltia-itta-itzti-alternative",
  "prefix": "ClassicalTypeTwoLtiaIttaItztiAlternative",
  "operationId": "classical.type.two.ltia.itta.itzti.alternative.execute",
  "inputContract": "complete-typed-classical-type-two-ltia-itta-itzti-alternative-source",
  "domain": "classical-type-two-ltia-itta-itzti-alternative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2453",
    "claim-p2454"
  ],
  "coordinates": {
    "claim-p2453::p2453-the-verb-tla-itt-a-to-see-look-at": {
      "assertionId": "classical-type-two-ltia-itta-itzti-alternative:p2453-the-verb-tla-itt-a-to-see-look-at",
      "canonicalPath": "derivations.itta.options.0.targetStem"
    },
    "claim-p2454::p2454-itz-ti-to-become-observant-to-direct-one-s": {
      "assertionId": "classical-type-two-ltia-itta-itzti-alternative:p2454-itz-ti-to-become-observant-to-direct-one-s",
      "canonicalPath": "derivations.itzti.options.3.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2453": [],
    "claim-p2454": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2453": "authorized",
    "claim-p2454": "authorized"
  }
};
export default Object.freeze(spec);
