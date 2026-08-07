const spec = {
  "ownerId": "classical-late-grammar-exclamatory-pronoun-variant",
  "prefix": "ClassicalLateGrammarExclamatoryPronounVariant",
  "operationId": "classical.late.grammar.exclamatory.pronoun.variant.execute",
  "inputContract": "complete-typed-classical-late-grammar-exclamatory-pronoun-variant-source",
  "domain": "classical-late-grammar-exclamatory-pronoun-variant",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-exclamatory-utterance-runtime",
  "selections": [
    "claim-p5317"
  ],
  "coordinates": {
    "claim-p5317::p5317-the-personal-pronoun-nncs-eh-and-ehhua-tl-can": {
      "assertionId": "classical-late-grammar-exclamatory-pronoun-variant:p5317-the-personal-pronoun-nncs-eh-and-ehhua-tl-can",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5317": [
      "exclamatory-utterance",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5317": "authorized"
  }
};
export default Object.freeze(spec);
