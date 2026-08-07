const spec = {
  "ownerId": "classical-adverbial-degree-taxonomy",
  "prefix": "ClassicalAdverbialDegreeTaxonomy",
  "operationId": "classical.adverbial.degree.taxonomy.execute",
  "inputContract": "complete-typed-classical-adverbial-degree-taxonomy-source",
  "domain": "classical-adverbial-degree-taxonomy",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4141"
  ],
  "coordinates": {
    "claim-p4141::p4141-adverbialization-in-nahuatl-can-occur-in-two-degrees": {
      "assertionId": "classical-adverbial-degree-taxonomy:p4141-adverbialization-in-nahuatl-can-occur-in-two-degrees",
      "canonicalPath": "catalog.canonicalLcm"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4141": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4141": "authorized"
  }
};
export default Object.freeze(spec);
