const spec = {
  "ownerId": "classical-adjectival-predicate-adjective-single-nucleus",
  "prefix": "ClassicalAdjectivalPredicateAdjectiveSingleNucleus",
  "operationId": "classical.adjectival.predicate.adjective.single.nucleus.execute",
  "inputContract": "complete-typed-classical-adjectival-predicate-adjective-single-nucleus-source",
  "domain": "classical-adjectival-predicate-adjective-single-nucleus",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3956"
  ],
  "coordinates": {
    "claim-p3956::p3956-an-nnc-whose-stem-is-translatable-as-an-adjective": {
      "assertionId": "classical-adjectival-predicate-adjective-single-nucleus:p3956-an-nnc-whose-stem-is-translatable-as-an-adjective",
      "canonicalPath": "cases.ordinary.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3956": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3956": "authorized"
  }
};
export default Object.freeze(spec);
