const spec = {
  "ownerId": "classical-late-grammar-present-contextual-time",
  "prefix": "ClassicalLateGrammarPresentContextualTime",
  "operationId": "classical.late.grammar.present.contextual.time.execute",
  "inputContract": "complete-typed-classical-late-grammar-present-contextual-time-source",
  "domain": "classical-late-grammar-present-contextual-time",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-contextual-time-runtime",
  "selections": [
    "claim-p5241",
    "claim-p5242",
    "claim-p5243"
  ],
  "coordinates": {
    "claim-p5241::p5241-a-present-tense-vnc-may-refer-to": {
      "assertionId": "classical-late-grammar-present-contextual-time:p5241-a-present-tense-vnc-may-refer-to",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5242::p5242-an-event-prior-to-another-event-in-past-time": {
      "assertionId": "classical-late-grammar-present-contextual-time:p5242-an-event-prior-to-another-event-in-past-time",
      "canonicalPath": "result.operationKind"
    },
    "claim-p5243::p5243-when-the-latter-is-in-the-historical-present-equivalent": {
      "assertionId": "classical-late-grammar-present-contextual-time:p5243-when-the-latter-is-in-the-historical-present-equivalent",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5241": [
      "contextual-time",
      "default"
    ],
    "claim-p5242": [
      "contextual-time",
      "default"
    ],
    "claim-p5243": [
      "contextual-time",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5241": "authorized",
    "claim-p5242": "authorized",
    "claim-p5243": "authorized"
  }
};
export default Object.freeze(spec);
