const spec = {
  "ownerId": "classical-clause-comparison-panahuia-modifiers",
  "prefix": "ClassicalClauseComparisonPanahuiaModifiers",
  "operationId": "classical.clause.comparison.panahuia.modifiers.execute",
  "inputContract": "complete-typed-classical-clause-comparison-panahuia-modifiers-source",
  "domain": "classical-clause-comparison-panahuia-modifiers",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-comparison-runtime",
  "selections": [
    "claim-p4941"
  ],
  "coordinates": {
    "claim-p4941::p4941-the-vnc-formed-on-these-stems-is-optionally-modified": {
      "assertionId": "classical-clause-comparison-panahuia-modifiers:p4941-the-vnc-formed-on-these-stems-is-optionally-modified",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalComparisonValidationFrame",
  "executionValidatorName": "isClassicalComparisonValidationFrame",
  "executionArgsBySelection": {
    "claim-p4941": [
      "panahuia-modifiers"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4941": "authorized"
  }
};
export default Object.freeze(spec);
