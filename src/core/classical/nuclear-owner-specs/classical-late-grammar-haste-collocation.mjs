const spec = {
  "ownerId": "classical-late-grammar-haste-collocation",
  "prefix": "ClassicalLateGrammarHasteCollocation",
  "operationId": "classical.late.grammar.haste.collocation.execute",
  "inputContract": "complete-typed-classical-late-grammar-haste-collocation-source",
  "domain": "classical-late-grammar-haste-collocation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-exclamatory-utterance-runtime",
  "selections": [
    "claim-p5306",
    "claim-p5307",
    "claim-p5308"
  ],
  "coordinates": {
    "claim-p5306::p5306-they-mean-something-like-let-it-forthwith-be": {
      "assertionId": "classical-late-grammar-haste-collocation:p5306-they-mean-something-like-let-it-forthwith-be",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5307::p5307-the-following-are-exclamatory-urgings-for-haste-they-mean": {
      "assertionId": "classical-late-grammar-haste-collocation:p5307-the-following-are-exclamatory-urgings-for-haste-they-mean",
      "canonicalPath": "result.operationKind"
    },
    "claim-p5308::p5308-the-following-are-exclamatory-urgings-for-haste": {
      "assertionId": "classical-late-grammar-haste-collocation:p5308-the-following-are-exclamatory-urgings-for-haste",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5306": [
      "exclamatory-utterance",
      "default"
    ],
    "claim-p5307": [
      "exclamatory-utterance",
      "default"
    ],
    "claim-p5308": [
      "exclamatory-utterance",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5306": "authorized",
    "claim-p5307": "authorized",
    "claim-p5308": "authorized"
  }
};
export default Object.freeze(spec);
