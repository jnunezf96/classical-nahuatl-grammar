const spec = {
  "ownerId": "classical-relational-continuation-pan-clause-analysis",
  "prefix": "ClassicalRelationalContinuationPanClauseAnalysis",
  "operationId": "classical.relational.continuation.pan.clause.analysis.execute",
  "inputContract": "complete-typed-classical-relational-continuation-pan-clause-analysis-source",
  "domain": "classical-relational-continuation-pan-clause-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-continuation-runtime",
  "selections": [
    "claim-p4523",
    "claim-p4524"
  ],
  "coordinates": {
    "claim-p4523::p4523-yehhua-tl-is-the-principal-clause-and-in-calli": {
      "assertionId": "classical-relational-continuation-pan-clause-analysis:p4523-yehhua-tl-is-the-principal-clause-and-in-calli",
      "canonicalPath": "analyses.panClauseAnalysis.canonicalNestedFrame"
    },
    "claim-p4524::p4524-because-of-this-there-are-many-difficulties": {
      "assertionId": "classical-relational-continuation-pan-clause-analysis:p4524-because-of-this-there-are-many-difficulties",
      "canonicalPath": "analyses.panClauseAnalysis.translationAuthorizesClauseStructure"
    }
  },
  "executionFunctionName": "buildClassicalRelationalContinuationValidationFrame",
  "executionValidatorName": "isClassicalRelationalContinuationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4523": [],
    "claim-p4524": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4523": "authorized",
    "claim-p4524": "authorized"
  }
};
export default Object.freeze(spec);
