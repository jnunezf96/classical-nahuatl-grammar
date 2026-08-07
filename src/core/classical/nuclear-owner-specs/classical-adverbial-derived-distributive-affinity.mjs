const spec = {
  "ownerId": "classical-adverbial-derived-distributive-affinity",
  "prefix": "ClassicalAdverbialDerivedDistributiveAffinity",
  "operationId": "classical.adverbial.derived.distributive.affinity.execute",
  "inputContract": "complete-typed-classical-adverbial-derived-distributive-affinity-source",
  "domain": "classical-adverbial-derived-distributive-affinity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4163",
    "claim-p4164"
  ],
  "coordinates": {
    "claim-p4163::p4163-adverbialized-nncs-can-be-built-on-distributive-varietal-and": {
      "assertionId": "classical-adverbial-derived-distributive-affinity:p4163-adverbialized-nncs-can-be-built-on-distributive-varietal-and",
      "canonicalPath": "cases.nncDerived.canonicalResult"
    },
    "claim-p4164::p4164-if-their-meaning-permits": {
      "assertionId": "classical-adverbial-derived-distributive-affinity:p4164-if-their-meaning-permits",
      "canonicalPath": "cases.nncDerived.family"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4163": [],
    "claim-p4164": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4163": "authorized",
    "claim-p4164": "authorized"
  }
};
export default Object.freeze(spec);
