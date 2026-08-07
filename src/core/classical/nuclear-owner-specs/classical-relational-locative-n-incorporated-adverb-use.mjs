const spec = {
  "ownerId": "classical-relational-locative-n-incorporated-adverb-use",
  "prefix": "ClassicalRelationalLocativeNIncorporatedAdverbUse",
  "operationId": "classical.relational.locative.n.incorporated.adverb.use.execute",
  "inputContract": "complete-typed-classical-relational-locative-n-incorporated-adverb-use-source",
  "domain": "classical-relational-locative-n-incorporated-adverb-use",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4325"
  ],
  "coordinates": {
    "claim-p4325::p4325-the-stem-can-also-serve-as-an-incorporated-adverb": {
      "assertionId": "classical-relational-locative-n-incorporated-adverb-use:p4325-the-stem-can-also-serve-as-an-incorporated-adverb",
      "canonicalPath": "cases.nIncorporated.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4325": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4325": "authorized"
  }
};
export default Object.freeze(spec);
