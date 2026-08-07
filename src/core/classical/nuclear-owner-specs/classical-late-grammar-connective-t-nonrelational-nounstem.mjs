const spec = {
  "ownerId": "classical-late-grammar-connective-t-nonrelational-nounstem",
  "prefix": "ClassicalLateGrammarConnectiveTNonrelationalNounstem",
  "operationId": "classical.late.grammar.connective.t.nonrelational.nounstem.execute",
  "inputContract": "complete-typed-classical-late-grammar-connective-t-nonrelational-nounstem-source",
  "domain": "classical-late-grammar-connective-t-nonrelational-nounstem",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-closed-construction-exception-runtime",
  "selections": [
    "claim-p5302",
    "claim-p5303"
  ],
  "coordinates": {
    "claim-p5302::p5302-it-is-possible-to-find-a-connective-t-between": {
      "assertionId": "classical-late-grammar-connective-t-nonrelational-nounstem:p5302-it-is-possible-to-find-a-connective-t-between",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5303::p5303-when-the-matrix-is-not-a-relational-nounstem": {
      "assertionId": "classical-late-grammar-connective-t-nonrelational-nounstem:p5303-when-the-matrix-is-not-a-relational-nounstem",
      "canonicalPath": "result.operationKind"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5302": [
      "closed-construction-exception",
      "connective-t-nnc"
    ],
    "claim-p5303": [
      "closed-construction-exception",
      "connective-t-nnc"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5302": "authorized",
    "claim-p5303": "authorized"
  }
};
export default Object.freeze(spec);
