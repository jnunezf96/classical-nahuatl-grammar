const spec = {
  "ownerId": "classical-late-grammar-absolute-topic",
  "prefix": "ClassicalLateGrammarAbsoluteTopic",
  "operationId": "classical.late.grammar.absolute.topic.execute",
  "inputContract": "complete-typed-classical-late-grammar-absolute-topic-source",
  "domain": "classical-late-grammar-absolute-topic",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-absolute-topic-runtime",
  "selections": [
    "claim-p5259"
  ],
  "coordinates": {
    "claim-p5259::p5259-there-is-a-construction-that-may-be-called-the": {
      "assertionId": "classical-late-grammar-absolute-topic:p5259-there-is-a-construction-that-may-be-called-the",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5259": [
      "absolute-topic",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5259": "authorized"
  }
};
export default Object.freeze(spec);
