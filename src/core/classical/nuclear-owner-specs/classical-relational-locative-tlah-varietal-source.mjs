const spec = {
  "ownerId": "classical-relational-locative-tlah-varietal-source",
  "prefix": "ClassicalRelationalLocativeTlahVarietalSource",
  "operationId": "classical.relational.locative.tlah.varietal.source.execute",
  "inputContract": "complete-typed-classical-relational-locative-tlah-varietal-source-source",
  "domain": "classical-relational-locative-tlah-varietal-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4402"
  ],
  "coordinates": {
    "claim-p4402::p4402-the-nnc-may-be-formed-on-a-varietal-stem": {
      "assertionId": "classical-relational-locative-tlah-varietal-source:p4402-the-nnc-may-be-formed-on-a-varietal-stem",
      "canonicalPath": "cases.tlahVarietal.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4402": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4402": "authorized"
  }
};
export default Object.freeze(spec);
