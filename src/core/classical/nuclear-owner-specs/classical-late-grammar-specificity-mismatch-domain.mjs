const spec = {
  "ownerId": "classical-late-grammar-specificity-mismatch-domain",
  "prefix": "ClassicalLateGrammarSpecificityMismatchDomain",
  "operationId": "classical.late.grammar.specificity.mismatch.domain.execute",
  "inputContract": "complete-typed-classical-late-grammar-specificity-mismatch-domain-source",
  "domain": "classical-late-grammar-specificity-mismatch-domain",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-referent-conditioned-agreement-runtime",
  "selections": [
    "claim-p5260",
    "claim-p5261",
    "claim-p5262"
  ],
  "coordinates": {
    "claim-p5260::p5260-when-an-adjunct-with-a-specific-pronoun-is-placed": {
      "assertionId": "classical-late-grammar-specificity-mismatch-domain:p5260-when-an-adjunct-with-a-specific-pronoun-is-placed",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5261::p5261-lack-of-agreement-in-specificity-occurs-when-an-adjunct": {
      "assertionId": "classical-late-grammar-specificity-mismatch-domain:p5261-lack-of-agreement-in-specificity-occurs-when-an-adjunct",
      "canonicalPath": "result.operationKind"
    },
    "claim-p5262::p5262-in-such-a-construction-the-adjunct-delineates-an-area": {
      "assertionId": "classical-late-grammar-specificity-mismatch-domain:p5262-in-such-a-construction-the-adjunct-delineates-an-area",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5260": [
      "referent-conditioned-agreement",
      "default"
    ],
    "claim-p5261": [
      "referent-conditioned-agreement",
      "default"
    ],
    "claim-p5262": [
      "referent-conditioned-agreement",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5260": "authorized",
    "claim-p5261": "authorized",
    "claim-p5262": "authorized"
  }
};
export default Object.freeze(spec);
