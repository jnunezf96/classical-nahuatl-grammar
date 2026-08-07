const spec = {
  "ownerId": "classical-relational-translation-preposition-no-source-slot",
  "prefix": "ClassicalRelationalTranslationPrepositionNoSourceSlot",
  "operationId": "classical.relational.translation.preposition.no.source.slot.execute",
  "inputContract": "complete-typed-classical-relational-translation-preposition-no-source-slot-source",
  "domain": "classical-relational-translation-preposition-no-source-slot",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4241",
    "claim-p4242"
  ],
  "coordinates": {
    "claim-p4241::p4241-if-one-gives-any-credence-to-the-fallacious-belief": {
      "assertionId": "classical-relational-translation-preposition-no-source-slot:p4241-if-one-gives-any-credence-to-the-fallacious-belief",
      "canonicalPath": "cases.translationBoundary.canonicalResult"
    },
    "claim-p4242::p4242-relational-nounstems-are-a-different-kind-of-device-from": {
      "assertionId": "classical-relational-translation-preposition-no-source-slot:p4242-relational-nounstems-are-a-different-kind-of-device-from",
      "canonicalPath": "contract.translationPrepositionAuthorizesMorphology"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4241": [],
    "claim-p4242": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4241": "authorized",
    "claim-p4242": "authorized"
  }
};
export default Object.freeze(spec);
