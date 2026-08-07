const spec = {
  "ownerId": "classical-late-grammar-such-that-polarity-and-frozen-ellipsis",
  "prefix": "ClassicalLateGrammarSuchThatPolarityAndFrozenEllipsis",
  "operationId": "classical.late.grammar.such.that.polarity.and.frozen.ellipsis.execute",
  "inputContract": "complete-typed-classical-late-grammar-such-that-polarity-and-frozen-ellipsis-source",
  "domain": "classical-late-grammar-such-that-polarity-and-frozen-ellipsis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-such-that-adjunction-runtime",
  "selections": [
    "claim-p5321",
    "claim-p5322"
  ],
  "coordinates": {
    "claim-p5321::p5321-the-combination-of-a-negative-principal-clause-plus-mah": {
      "assertionId": "classical-late-grammar-such-that-polarity-and-frozen-ellipsis:p5321-the-combination-of-a-negative-principal-clause-plus-mah",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5322::p5322-the-expressions-que-mah-and-quemahca-listed-in-44": {
      "assertionId": "classical-late-grammar-such-that-polarity-and-frozen-ellipsis:p5322-the-expressions-que-mah-and-quemahca-listed-in-44",
      "canonicalPath": "result.operationKind"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5321": [
      "such-that-adjunction",
      "strong-affirmative"
    ],
    "claim-p5322": [
      "such-that-adjunction",
      "strong-affirmative"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5321": "authorized",
    "claim-p5322": "authorized"
  }
};
export default Object.freeze(spec);
