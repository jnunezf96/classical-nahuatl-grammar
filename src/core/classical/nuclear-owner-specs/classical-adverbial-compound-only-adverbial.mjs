const spec = {
  "ownerId": "classical-adverbial-compound-only-adverbial",
  "prefix": "ClassicalAdverbialCompoundOnlyAdverbial",
  "operationId": "classical.adverbial.compound.only.adverbial.execute",
  "inputContract": "complete-typed-classical-adverbial-compound-only-adverbial-source",
  "domain": "classical-adverbial-compound-only-adverbial",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4231"
  ],
  "coordinates": {
    "claim-p4231::p4231-certain-adverbial-nncs-tend-not-to-occur-or-do": {
      "assertionId": "classical-adverbial-compound-only-adverbial:p4231-certain-adverbial-nncs-tend-not-to-occur-or-do",
      "canonicalPath": "cases.compoundNal.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4231": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4231": "authorized"
  }
};
export default Object.freeze(spec);
