const spec = {
  "ownerId": "classical-clause-comparison-resemblance-verbstem-nnc",
  "prefix": "ClassicalClauseComparisonResemblanceVerbstemNnc",
  "operationId": "classical.clause.comparison.resemblance.verbstem.nnc.execute",
  "inputContract": "complete-typed-classical-clause-comparison-resemblance-verbstem-nnc-source",
  "domain": "classical-clause-comparison-resemblance-verbstem-nnc",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-comparison-runtime",
  "selections": [
    "claim-p4919"
  ],
  "coordinates": {
    "claim-p4919::p4919-an-nnc-built-on-a-verbstem-meaning-to-resemble": {
      "assertionId": "classical-clause-comparison-resemblance-verbstem-nnc:p4919-an-nnc-built-on-a-verbstem-meaning-to-resemble",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalComparisonValidationFrame",
  "executionValidatorName": "isClassicalComparisonValidationFrame",
  "executionArgsBySelection": {
    "claim-p4919": [
      "resemblance-verbstem-nnc"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4919": "authorized"
  }
};
export default Object.freeze(spec);
