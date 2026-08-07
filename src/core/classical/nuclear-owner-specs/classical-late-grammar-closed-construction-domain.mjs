const spec = {
  "ownerId": "classical-late-grammar-closed-construction-domain",
  "prefix": "ClassicalLateGrammarClosedConstructionDomain",
  "operationId": "classical.late.grammar.closed.construction.domain.execute",
  "inputContract": "complete-typed-classical-late-grammar-closed-construction-domain-source",
  "domain": "classical-late-grammar-closed-construction-domain",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-closed-construction-exception-runtime",
  "selections": [
    "claim-p5292",
    "claim-p5293"
  ],
  "coordinates": {
    "claim-p5292::p5292-the-descriptions-of-stem-formations-and-nuclear-clause-formations": {
      "assertionId": "classical-late-grammar-closed-construction-domain:p5292-the-descriptions-of-stem-formations-and-nuclear-clause-formations",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5293::p5293-there-are-numerous-unaccounted-for-constructions-that-affect-only": {
      "assertionId": "classical-late-grammar-closed-construction-domain:p5293-there-are-numerous-unaccounted-for-constructions-that-affect-only",
      "canonicalPath": "result.operationKind"
    }
  },
  "executionFunctionName": "buildClassicalLateGrammarValidationFrame",
  "executionValidatorName": "isClassicalLateGrammarValidationFrame",
  "executionArgsBySelection": {
    "claim-p5292": [
      "closed-construction-exception",
      "default"
    ],
    "claim-p5293": [
      "closed-construction-exception",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5292": "authorized",
    "claim-p5293": "authorized"
  }
};
export default Object.freeze(spec);
