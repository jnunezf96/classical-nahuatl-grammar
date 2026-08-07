const spec = {
  "ownerId": "classical-clause-conjunction-lexical-incorporation",
  "prefix": "ClassicalClauseConjunctionLexicalIncorporation",
  "operationId": "classical.clause.conjunction.lexical.incorporation.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-lexical-incorporation-source",
  "domain": "classical-clause-conjunction-lexical-incorporation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4894",
    "claim-p4895"
  ],
  "coordinates": {
    "claim-p4894::p4894-when-incorporated-into-compound-stems": {
      "assertionId": "classical-clause-conjunction-lexical-incorporation:p4894-when-incorporated-into-compound-stems",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p4895::p4895-the-lexical-unit-composed-of-the-stems-of-the": {
      "assertionId": "classical-clause-conjunction-lexical-incorporation:p4895-the-lexical-unit-composed-of-the-stems-of-the",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4894": [
      "lexical-incorporation"
    ],
    "claim-p4895": [
      "lexical-incorporation"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4894": "authorized",
    "claim-p4895": "authorized"
  }
};
export default Object.freeze(spec);
