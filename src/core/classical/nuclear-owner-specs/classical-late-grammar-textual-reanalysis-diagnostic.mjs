const spec = {
  "ownerId": "classical-late-grammar-textual-reanalysis-diagnostic",
  "prefix": "ClassicalLateGrammarTextualReanalysisDiagnostic",
  "operationId": "classical.late.grammar.textual.reanalysis.diagnostic.execute",
  "inputContract": "complete-typed-classical-late-grammar-textual-reanalysis-diagnostic-source",
  "domain": "classical-late-grammar-textual-reanalysis-diagnostic",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-textual-diagnostic-runtime",
  "selections": [
    "claim-p5344"
  ],
  "coordinates": {
    "claim-p5344::p5344-that-is-the-collocation-motei-ttitia-ya-motene-xti": {
      "assertionId": "classical-late-grammar-textual-reanalysis-diagnostic:p5344-that-is-the-collocation-motei-ttitia-ya-motene-xti",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5344": [
      "textual-diagnostic",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5344": "authorized"
  }
};
export default Object.freeze(spec);
