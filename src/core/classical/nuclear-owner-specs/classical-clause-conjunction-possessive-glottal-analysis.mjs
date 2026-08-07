const spec = {
  "ownerId": "classical-clause-conjunction-possessive-glottal-analysis",
  "prefix": "ClassicalClauseConjunctionPossessiveGlottalAnalysis",
  "operationId": "classical.clause.conjunction.possessive.glottal.analysis.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-possessive-glottal-analysis-source",
  "domain": "classical-clause-conjunction-possessive-glottal-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4858"
  ],
  "coordinates": {
    "claim-p4858::p4858-the-possessor-pronoun-i-on-ihtic-is-short-because": {
      "assertionId": "classical-clause-conjunction-possessive-glottal-analysis:p4858-the-possessor-pronoun-i-on-ihtic-is-short-because",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4858": [
      "possessive-glottal-analysis"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4858": "authorized"
  }
};
export default Object.freeze(spec);
