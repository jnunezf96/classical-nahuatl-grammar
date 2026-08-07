const spec = {
  "ownerId": "classical-adjectival-adverbialized-nnc-modifier",
  "prefix": "ClassicalAdjectivalAdverbializedNncModifier",
  "operationId": "classical.adjectival.adverbialized.nnc.modifier.execute",
  "inputContract": "complete-typed-classical-adjectival-adverbialized-nnc-modifier-source",
  "domain": "classical-adjectival-adverbialized-nnc-modifier",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4060"
  ],
  "coordinates": {
    "claim-p4060::p4060-an-adverbialized-nnc-see-lesson-44": {
      "assertionId": "classical-adjectival-adverbialized-nnc-modifier:p4060-an-adverbialized-nnc-see-lesson-44",
      "canonicalPath": "cases.ordinary.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4060": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4060": "authorized"
  }
};
export default Object.freeze(spec);
