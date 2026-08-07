const spec = {
  "ownerId": "classical-adverbial-quen-lexicalized-collocation",
  "prefix": "ClassicalAdverbialQuenLexicalizedCollocation",
  "operationId": "classical.adverbial.quen.lexicalized.collocation.execute",
  "inputContract": "complete-typed-classical-adverbial-quen-lexicalized-collocation-source",
  "domain": "classical-adverbial-quen-lexicalized-collocation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4190"
  ],
  "coordinates": {
    "claim-p4190::p4190-in-certain-collocations-que-n-and-a-following-vnc": {
      "assertionId": "classical-adverbial-quen-lexicalized-collocation:p4190-in-certain-collocations-que-n-and-a-following-vnc",
      "canonicalPath": "cases.particleQuenInitial.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4190": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4190": "authorized"
  }
};
export default Object.freeze(spec);
