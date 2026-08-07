const spec = {
  "ownerId": "classical-late-grammar-instrumental-connective-hu",
  "prefix": "ClassicalLateGrammarInstrumentalConnectiveHu",
  "operationId": "classical.late.grammar.instrumental.connective.hu.execute",
  "inputContract": "complete-typed-classical-late-grammar-instrumental-connective-hu-source",
  "domain": "classical-late-grammar-instrumental-connective-hu",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-instrumental-az-runtime",
  "selections": [
    "claim-p5287",
    "claim-p5288",
    "claim-p5289",
    "claim-p5290"
  ],
  "coordinates": {
    "claim-p5287::p5287-this-connective-w-is-also-found-in-the-matrix": {
      "assertionId": "classical-late-grammar-instrumental-connective-hu:p5287-this-connective-w-is-also-found-in-the-matrix",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5288::p5288-here-in-the-majority-of-instances-the-w-follows": {
      "assertionId": "classical-late-grammar-instrumental-connective-hu:p5288-here-in-the-majority-of-instances-the-w-follows",
      "canonicalPath": "result.operationKind"
    },
    "claim-p5289::p5289-in-a-few-instances-the-w-follows-an-n": {
      "assertionId": "classical-late-grammar-instrumental-connective-hu:p5289-in-a-few-instances-the-w-follows-an-n",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p5290::p5290-and-in-a-few-instances-w-follows-the-vowel": {
      "assertionId": "classical-late-grammar-instrumental-connective-hu:p5290-and-in-a-few-instances-w-follows-the-vowel",
      "canonicalPath": "analysis.hostileAuthorityBlocked"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5287": [
      "instrumental-az",
      "connector-n"
    ],
    "claim-p5288": [
      "instrumental-az",
      "connector-n"
    ],
    "claim-p5289": [
      "instrumental-az",
      "connector-n"
    ],
    "claim-p5290": [
      "instrumental-az",
      "connector-n"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5287": "authorized",
    "claim-p5288": "authorized",
    "claim-p5289": "authorized",
    "claim-p5290": "authorized"
  }
};
export default Object.freeze(spec);
