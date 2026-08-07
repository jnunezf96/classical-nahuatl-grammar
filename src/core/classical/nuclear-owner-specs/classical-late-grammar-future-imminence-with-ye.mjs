const spec = {
  "ownerId": "classical-late-grammar-future-imminence-with-ye",
  "prefix": "ClassicalLateGrammarFutureImminenceWithYe",
  "operationId": "classical.late.grammar.future.imminence.with.ye.execute",
  "inputContract": "complete-typed-classical-late-grammar-future-imminence-with-ye-source",
  "domain": "classical-late-grammar-future-imminence-with-ye",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-contextual-time-runtime",
  "selections": [
    "claim-p5249",
    "claim-p5250"
  ],
  "coordinates": {
    "claim-p5249::p5249-afuture-tense-vnc-may-refer-to": {
      "assertionId": "classical-late-grammar-future-imminence-with-ye:p5249-afuture-tense-vnc-may-refer-to",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5250::p5250-the-adverbial-particle-ye-already-is-usually-present": {
      "assertionId": "classical-late-grammar-future-imminence-with-ye:p5250-the-adverbial-particle-ye-already-is-usually-present",
      "canonicalPath": "result.operationKind"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5249": [
      "contextual-time",
      "future-imminence"
    ],
    "claim-p5250": [
      "contextual-time",
      "future-imminence"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5249": "authorized",
    "claim-p5250": "authorized"
  }
};
export default Object.freeze(spec);
