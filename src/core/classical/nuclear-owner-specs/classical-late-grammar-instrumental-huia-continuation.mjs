const spec = {
  "ownerId": "classical-late-grammar-instrumental-huia-continuation",
  "prefix": "ClassicalLateGrammarInstrumentalHuiaContinuation",
  "operationId": "classical.late.grammar.instrumental.huia.continuation.execute",
  "inputContract": "complete-typed-classical-late-grammar-instrumental-huia-continuation-source",
  "domain": "classical-late-grammar-instrumental-huia-continuation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-instrumental-az-runtime",
  "selections": [
    "claim-p5291"
  ],
  "coordinates": {
    "claim-p5291::p5291-nounstems-formed-with-the-matrix-stem-a-z-tli": {
      "assertionId": "classical-late-grammar-instrumental-huia-continuation:p5291-nounstems-formed-with-the-matrix-stem-a-z-tli",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5291": [
      "instrumental-az",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5291": "authorized"
  }
};
export default Object.freeze(spec);
