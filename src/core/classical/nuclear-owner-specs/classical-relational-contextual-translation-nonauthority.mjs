const spec = {
  "ownerId": "classical-relational-contextual-translation-nonauthority",
  "prefix": "ClassicalRelationalContextualTranslationNonauthority",
  "operationId": "classical.relational.contextual.translation.nonauthority.execute",
  "inputContract": "complete-typed-classical-relational-contextual-translation-nonauthority-source",
  "domain": "classical-relational-contextual-translation-nonauthority",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4270",
    "claim-p4271"
  ],
  "coordinates": {
    "claim-p4270::p4270-any-preposition-in-the-english-translations-of-the-relational": {
      "assertionId": "classical-relational-contextual-translation-nonauthority:p4270-any-preposition-in-the-english-translations-of-the-relational",
      "canonicalPath": "cases.translationBoundary.canonicalResult"
    },
    "claim-p4271::p4271-since-nahuatl-has-no-prepositions-the-english-preposition-shown": {
      "assertionId": "classical-relational-contextual-translation-nonauthority:p4271-since-nahuatl-has-no-prepositions-the-english-preposition-shown",
      "canonicalPath": "contract.translationPrepositionAuthorizesMorphology"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4270": [],
    "claim-p4271": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4270": "authorized",
    "claim-p4271": "authorized"
  }
};
export default Object.freeze(spec);
