const spec = {
  "ownerId": "classical-adjectival-modifier-adjunctor-in",
  "prefix": "ClassicalAdjectivalModifierAdjunctorIn",
  "operationId": "classical.adjectival.modifier.adjunctor.in.execute",
  "inputContract": "complete-typed-classical-adjectival-modifier-adjunctor-in-source",
  "domain": "classical-adjectival-modifier-adjunctor-in",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4019"
  ],
  "coordinates": {
    "claim-p4019::p4019-the-modifier-may-be-marked-by-the-adjunctor-in": {
      "assertionId": "classical-adjectival-modifier-adjunctor-in:p4019-the-modifier-may-be-marked-by-the-adjunctor-in",
      "canonicalPath": "cases.marked.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4019": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4019": "authorized"
  }
};
export default Object.freeze(spec);
