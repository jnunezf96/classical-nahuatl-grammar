const spec = {
  "ownerId": "classical-relational-ic-adjectival-degree",
  "prefix": "ClassicalRelationalIcAdjectivalDegree",
  "operationId": "classical.relational.ic.adjectival.degree.execute",
  "inputContract": "complete-typed-classical-relational-ic-adjectival-degree-source",
  "domain": "classical-relational-ic-adjectival-degree",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4312"
  ],
  "coordinates": {
    "claim-p4312::p4312-in-cooperation-with-an-adjectival-or-descriptive-nnc-i": {
      "assertionId": "classical-relational-ic-adjectival-degree:p4312-in-cooperation-with-an-adjectival-or-descriptive-nnc-i",
      "canonicalPath": "cases.icDegree.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4312": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4312": "authorized"
  }
};
export default Object.freeze(spec);
