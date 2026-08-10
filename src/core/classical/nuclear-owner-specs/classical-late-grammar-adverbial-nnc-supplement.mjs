const spec = {
  "ownerId": "classical-late-grammar-adverbial-nnc-supplement",
  "prefix": "ClassicalLateGrammarAdverbialNncSupplement",
  "operationId": "classical.late.grammar.adverbial.nnc.supplement.execute",
  "inputContract": "complete-typed-classical-late-grammar-adverbial-nnc-supplement-source",
  "domain": "classical-late-grammar-adverbial-nnc-supplement",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nnc-supplement-runtime",
  "selections": [
    "claim-p5270",
    "claim-p5271",
    "claim-p5272",
    "claim-p5273"
  ],
  "coordinates": {
    "claim-p5270::p5270-in-51-2-3-mention-was-made-of-a": {
      "assertionId": "classical-late-grammar-adverbial-nnc-supplement:p5270-in-51-2-3-mention-was-made-of-a",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5271::p5271-there-is-another-construction-in-which-the-syntax-seems": {
      "assertionId": "classical-late-grammar-adverbial-nnc-supplement:p5271-there-is-another-construction-in-which-the-syntax-seems",
      "canonicalPath": "result.operationKind"
    },
    "claim-p5272::p5272-care-must-be-taken-in-this-matter": {
      "assertionId": "classical-late-grammar-adverbial-nnc-supplement:p5272-care-must-be-taken-in-this-matter",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5270": [
      "adverbial-nnc-supplement",
      "default"
    ],
    "claim-p5271": [
      "adverbial-nnc-supplement",
      "default"
    ],
    "claim-p5272": [
      "adverbial-nnc-supplement",
      "default"
    ],
    "claim-p5273": [
      "adverbial-nnc-supplement",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5270": "authorized",
    "claim-p5271": "authorized",
    "claim-p5272": "authorized",
    "claim-p5273": "authorized"
  }
};
export default Object.freeze(spec);
