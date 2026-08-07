const spec = {
  "ownerId": "classical-late-grammar-true-valence-exception",
  "prefix": "ClassicalLateGrammarTrueValenceException",
  "operationId": "classical.late.grammar.true.valence.exception.execute",
  "inputContract": "complete-typed-classical-late-grammar-true-valence-exception-source",
  "domain": "classical-late-grammar-true-valence-exception",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-valence-source-analysis-runtime",
  "selections": [
    "claim-p5251",
    "claim-p5252",
    "claim-p5253"
  ],
  "coordinates": {
    "claim-p5251::p5251-while-rules-governing-valence-are-remarkably-strict-and-clearcut": {
      "assertionId": "classical-late-grammar-true-valence-exception:p5251-while-rules-governing-valence-are-remarkably-strict-and-clearcut",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5252::p5252-there-are-other-instances-in-which-for-no-apparent": {
      "assertionId": "classical-late-grammar-true-valence-exception:p5252-there-are-other-instances-in-which-for-no-apparent",
      "canonicalPath": "result.operationKind"
    },
    "claim-p5253::p5253-in-the-following-two-sentences-for-example-verbstems-that": {
      "assertionId": "classical-late-grammar-true-valence-exception:p5253-in-the-following-two-sentences-for-example-verbstems-that",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5251": [
      "valence-source-analysis",
      "default"
    ],
    "claim-p5252": [
      "valence-source-analysis",
      "default"
    ],
    "claim-p5253": [
      "valence-source-analysis",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5251": "authorized",
    "claim-p5252": "authorized",
    "claim-p5253": "authorized"
  }
};
export default Object.freeze(spec);
