const spec = {
  "ownerId": "classical-late-grammar-solid-spelling-supplement",
  "prefix": "ClassicalLateGrammarSolidSpellingSupplement",
  "operationId": "classical.late.grammar.solid.spelling.supplement.execute",
  "inputContract": "complete-typed-classical-late-grammar-solid-spelling-supplement-source",
  "domain": "classical-late-grammar-solid-spelling-supplement",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-closed-construction-exception-runtime",
  "selections": [
    "claim-p5294",
    "claim-p5295",
    "claim-p5296"
  ],
  "coordinates": {
    "claim-p5294::p5294-there-are-other-constructions-that-result-merely-from-spelling": {
      "assertionId": "classical-late-grammar-solid-spelling-supplement:p5294-there-are-other-constructions-that-result-merely-from-spelling",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5295::p5295-supplement-construction-can-be-dissolved-by-either-tla-lli": {
      "assertionId": "classical-late-grammar-solid-spelling-supplement:p5295-supplement-construction-can-be-dissolved-by-either-tla-lli",
      "canonicalPath": "result.operationKind"
    },
    "claim-p5296::p5296-the-english-translation-would-remain-the-same": {
      "assertionId": "classical-late-grammar-solid-spelling-supplement:p5296-the-english-translation-would-remain-the-same",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5294": [
      "closed-construction-exception",
      "solid-spelling"
    ],
    "claim-p5295": [
      "closed-construction-exception",
      "solid-spelling"
    ],
    "claim-p5296": [
      "closed-construction-exception",
      "solid-spelling"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5294": "authorized",
    "claim-p5295": "authorized",
    "claim-p5296": "authorized"
  }
};
export default Object.freeze(spec);
