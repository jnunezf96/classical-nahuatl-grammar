const spec = {
  "ownerId": "classical-adjectival-transitive-vnc-adjectival-function",
  "prefix": "ClassicalAdjectivalTransitiveVncAdjectivalFunction",
  "operationId": "classical.adjectival.transitive.vnc.adjectival.function.execute",
  "inputContract": "complete-typed-classical-adjectival-transitive-vnc-adjectival-function-source",
  "domain": "classical-adjectival-transitive-vnc-adjectival-function",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3908"
  ],
  "coordinates": {
    "claim-p3908::p3908-occasionally-the-predicate-of-a-transitive-vnc-may-be": {
      "assertionId": "classical-adjectival-transitive-vnc-adjectival-function:p3908-occasionally-the-predicate-of-a-transitive-vnc-may-be",
      "canonicalPath": "cases.vncObjectContact.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3908": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3908": "authorized"
  }
};
export default Object.freeze(spec);
