const spec = {
  "ownerId": "classical-adjectival-predicate-adjective-multiple-nucleus",
  "prefix": "ClassicalAdjectivalPredicateAdjectiveMultipleNucleus",
  "operationId": "classical.adjectival.predicate.adjective.multiple.nucleus.execute",
  "inputContract": "complete-typed-classical-adjectival-predicate-adjective-multiple-nucleus-source",
  "domain": "classical-adjectival-predicate-adjective-multiple-nucleus",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3957",
    "claim-p3958"
  ],
  "coordinates": {
    "claim-p3957::p3957-when-an-adjectival-subject-complement-sentence-in-nahuatl-consists": {
      "assertionId": "classical-adjectival-predicate-adjective-multiple-nucleus:p3957-when-an-adjectival-subject-complement-sentence-in-nahuatl-consists",
      "canonicalPath": "cases.ordinary.canonicalResult"
    },
    "claim-p3958::p3958-when-an-adjectival-subject-complement-sentence-in-nahuatl-consists": {
      "assertionId": "classical-adjectival-predicate-adjective-multiple-nucleus:p3958-when-an-adjectival-subject-complement-sentence-in-nahuatl-consists",
      "canonicalPath": "cases.ordinary.operationKind"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3957": [],
    "claim-p3958": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3957": "authorized",
    "claim-p3958": "authorized"
  }
};
export default Object.freeze(spec);
