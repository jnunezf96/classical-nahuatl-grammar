const spec = {
  "ownerId": "classical-relational-ic-adjectival-supplement-adverb",
  "prefix": "ClassicalRelationalIcAdjectivalSupplementAdverb",
  "operationId": "classical.relational.ic.adjectival.supplement.adverb.execute",
  "inputContract": "complete-typed-classical-relational-ic-adjectival-supplement-adverb-source",
  "domain": "classical-relational-ic-adjectival-supplement-adverb",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4310",
    "claim-p4311"
  ],
  "coordinates": {
    "claim-p4310::p4310-when-following-an-adjectival-nnc-that-functions-as-its": {
      "assertionId": "classical-relational-ic-adjectival-supplement-adverb:p4310-when-following-an-adjectival-nnc-that-functions-as-its",
      "canonicalPath": "cases.icAdverbial.canonicalResult"
    },
    "claim-p4311::p4311-when-following-an-adjectival-nnc-that-functions-as-its": {
      "assertionId": "classical-relational-ic-adjectival-supplement-adverb:p4311-when-following-an-adjectival-nnc-that-functions-as-its",
      "canonicalPath": "cases.icAdverbial.stemId"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4310": [],
    "claim-p4311": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4310": "authorized",
    "claim-p4311": "authorized"
  }
};
export default Object.freeze(spec);
