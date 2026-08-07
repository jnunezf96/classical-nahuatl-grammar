const spec = {
  "ownerId": "classical-late-grammar-exclamatory-category",
  "prefix": "ClassicalLateGrammarExclamatoryCategory",
  "operationId": "classical.late.grammar.exclamatory.category.execute",
  "inputContract": "complete-typed-classical-late-grammar-exclamatory-category-source",
  "domain": "classical-late-grammar-exclamatory-category",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-exclamatory-utterance-runtime",
  "selections": [
    "claim-p5305"
  ],
  "coordinates": {
    "claim-p5305::p5305-utterances-that-express-vehement-or-excited-feeling-in-an": {
      "assertionId": "classical-late-grammar-exclamatory-category:p5305-utterances-that-express-vehement-or-excited-feeling-in-an",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5305": [
      "exclamatory-utterance",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5305": "authorized"
  }
};
export default Object.freeze(spec);
