const spec = {
  "ownerId": "classical-adverbial-first-degree-function-ambiguity",
  "prefix": "ClassicalAdverbialFirstDegreeFunctionAmbiguity",
  "operationId": "classical.adverbial.first.degree.function.ambiguity.execute",
  "inputContract": "complete-typed-classical-adverbial-first-degree-function-ambiguity-source",
  "domain": "classical-adverbial-first-degree-function-ambiguity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4157",
    "claim-p4158",
    "claim-p4159"
  ],
  "coordinates": {
    "claim-p4157::p4157-if-an-nnc-permits-first-degree-adverbialization": {
      "assertionId": "classical-adverbial-first-degree-function-ambiguity:p4157-if-an-nnc-permits-first-degree-adverbialization",
      "canonicalPath": "cases.nncFirst.canonicalResult"
    },
    "claim-p4158::p4158-if-an-nnc-permits-first-degree-adverbialization-its-third": {
      "assertionId": "classical-adverbial-first-degree-function-ambiguity:p4158-if-an-nnc-permits-first-degree-adverbialization-its-third",
      "canonicalPath": "cases.nncFirst.degree"
    },
    "claim-p4159::p4159-a-limited-number-of-english-nounwords-permit-something-vaguely": {
      "assertionId": "classical-adverbial-first-degree-function-ambiguity:p4159-a-limited-number-of-english-nounwords-permit-something-vaguely",
      "canonicalPath": "cases.nncFirst.clauseKind"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4157": [],
    "claim-p4158": [],
    "claim-p4159": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4157": "authorized",
    "claim-p4158": "authorized",
    "claim-p4159": "authorized"
  }
};
export default Object.freeze(spec);
