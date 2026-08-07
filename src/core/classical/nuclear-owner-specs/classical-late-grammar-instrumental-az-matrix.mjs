const spec = {
  "ownerId": "classical-late-grammar-instrumental-az-matrix",
  "prefix": "ClassicalLateGrammarInstrumentalAzMatrix",
  "operationId": "classical.late.grammar.instrumental.az.matrix.execute",
  "inputContract": "complete-typed-classical-late-grammar-instrumental-az-matrix-source",
  "domain": "classical-late-grammar-instrumental-az-matrix",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-instrumental-az-runtime",
  "selections": [
    "claim-p5282",
    "claim-p5283",
    "claim-p5284",
    "claim-p5285",
    "claim-p5286"
  ],
  "coordinates": {
    "claim-p5282::p5282-a-number-of-instrumental-nounstems-are-formed-as-compounds": {
      "assertionId": "classical-late-grammar-instrumental-az-matrix:p5282-a-number-of-instrumental-nounstems-are-formed-as-compounds",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5283::p5283-this-matrix-stem-is-strange-in-that-its-use": {
      "assertionId": "classical-late-grammar-instrumental-az-matrix:p5283-this-matrix-stem-is-strange-in-that-its-use",
      "canonicalPath": "result.operationKind"
    },
    "claim-p5284::p5284-apparently-it-is-a-passive-patientive-nounstem-derived-from": {
      "assertionId": "classical-late-grammar-instrumental-az-matrix:p5284-apparently-it-is-a-passive-patientive-nounstem-derived-from",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p5285::p5285-the-stem-a-z-tli-also-occurs-in-az": {
      "assertionId": "classical-late-grammar-instrumental-az-matrix:p5285-the-stem-a-z-tli-also-occurs-in-az",
      "canonicalPath": "analysis.hostileAuthorityBlocked"
    },
    "claim-p5286::p5286-the-following-are-a-few-compound-nounstems-illustrating-the": {
      "assertionId": "classical-late-grammar-instrumental-az-matrix:p5286-the-following-are-a-few-compound-nounstems-illustrating-the",
      "canonicalPath": "analysis.translationAuthority"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5282": [
      "instrumental-az",
      "default"
    ],
    "claim-p5283": [
      "instrumental-az",
      "default"
    ],
    "claim-p5284": [
      "instrumental-az",
      "default"
    ],
    "claim-p5285": [
      "instrumental-az",
      "default"
    ],
    "claim-p5286": [
      "instrumental-az",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5282": "authorized",
    "claim-p5283": "authorized",
    "claim-p5284": "authorized",
    "claim-p5285": "authorized",
    "claim-p5286": "authorized"
  }
};
export default Object.freeze(spec);
