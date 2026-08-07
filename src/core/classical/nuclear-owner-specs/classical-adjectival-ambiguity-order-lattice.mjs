const spec = {
  "ownerId": "classical-adjectival-ambiguity-order-lattice",
  "prefix": "ClassicalAdjectivalAmbiguityOrderLattice",
  "operationId": "classical.adjectival.ambiguity.order.lattice.execute",
  "inputContract": "complete-typed-classical-adjectival-ambiguity-order-lattice-source",
  "domain": "classical-adjectival-ambiguity-order-lattice",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4031"
  ],
  "coordinates": {
    "claim-p4031::p4031-unmarked-adjunct-marked-adjunct-supplementation-transform-principal-adjunct-principal": {
      "assertionId": "classical-adjectival-ambiguity-order-lattice:p4031-unmarked-adjunct-marked-adjunct-supplementation-transform-principal-adjunct-principal",
      "canonicalPath": "cases.markedPreposed.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4031": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4031": "authorized"
  }
};
export default Object.freeze(spec);
