const spec = {
  "ownerId": "classical-late-grammar-lexical-nounstem-l",
  "prefix": "ClassicalLateGrammarLexicalNounstemL",
  "operationId": "classical.late.grammar.lexical.nounstem.l.execute",
  "inputContract": "complete-typed-classical-late-grammar-lexical-nounstem-l-source",
  "domain": "classical-late-grammar-lexical-nounstem-l",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-lexical-nounstem-l-runtime",
  "selections": [
    "claim-p5280",
    "claim-p5281"
  ],
  "coordinates": {
    "claim-p5280::p5280-there-are-a-number-of-nounstems-that-end-in": {
      "assertionId": "classical-late-grammar-lexical-nounstem-l:p5280-there-are-a-number-of-nounstems-that-end-in",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5281::p5281-it-has-the-variant-shape-tla-ti-l-li": {
      "assertionId": "classical-late-grammar-lexical-nounstem-l:p5281-it-has-the-variant-shape-tla-ti-l-li",
      "canonicalPath": "result.operationKind"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5280": [
      "lexical-nounstem-l",
      "default"
    ],
    "claim-p5281": [
      "lexical-nounstem-l",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5280": "authorized",
    "claim-p5281": "authorized"
  }
};
export default Object.freeze(spec);
