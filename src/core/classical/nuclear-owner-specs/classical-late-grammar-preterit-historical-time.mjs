const spec = {
  "ownerId": "classical-late-grammar-preterit-historical-time",
  "prefix": "ClassicalLateGrammarPreteritHistoricalTime",
  "operationId": "classical.late.grammar.preterit.historical.time.execute",
  "inputContract": "complete-typed-classical-late-grammar-preterit-historical-time-source",
  "domain": "classical-late-grammar-preterit-historical-time",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-contextual-time-runtime",
  "selections": [
    "claim-p5244",
    "claim-p5245",
    "claim-p5246",
    "claim-p5247",
    "claim-p5248"
  ],
  "coordinates": {
    "claim-p5244::p5244-if-the-present-tense-vnc-is-representing-the-historical": {
      "assertionId": "classical-late-grammar-preterit-historical-time:p5244-if-the-present-tense-vnc-is-representing-the-historical",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5245::p5245-if-the-present-tense-vnc-is-representing-the-historical": {
      "assertionId": "classical-late-grammar-preterit-historical-time:p5245-if-the-present-tense-vnc-is-representing-the-historical",
      "canonicalPath": "result.operationKind"
    },
    "claim-p5246::p5246-when-he-had-brought-it": {
      "assertionId": "classical-late-grammar-preterit-historical-time:p5246-when-he-had-brought-it",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p5247::p5247-the-foregoing-example-might-therefore-need-to-be-translated": {
      "assertionId": "classical-late-grammar-preterit-historical-time:p5247-the-foregoing-example-might-therefore-need-to-be-translated",
      "canonicalPath": "analysis.hostileAuthorityBlocked"
    },
    "claim-p5248::p5248-in-a-more-technical-treatment-of-nahuatl-tense-the": {
      "assertionId": "classical-late-grammar-preterit-historical-time:p5248-in-a-more-technical-treatment-of-nahuatl-tense-the",
      "canonicalPath": "analysis.translationAuthority"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5244": [
      "contextual-time",
      "default"
    ],
    "claim-p5245": [
      "contextual-time",
      "default"
    ],
    "claim-p5246": [
      "contextual-time",
      "default"
    ],
    "claim-p5247": [
      "contextual-time",
      "default"
    ],
    "claim-p5248": [
      "contextual-time",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5244": "authorized",
    "claim-p5245": "authorized",
    "claim-p5246": "authorized",
    "claim-p5247": "authorized",
    "claim-p5248": "authorized"
  }
};
export default Object.freeze(spec);
