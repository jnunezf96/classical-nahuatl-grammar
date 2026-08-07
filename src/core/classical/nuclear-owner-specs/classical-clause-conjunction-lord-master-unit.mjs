const spec = {
  "ownerId": "classical-clause-conjunction-lord-master-unit",
  "prefix": "ClassicalClauseConjunctionLordMasterUnit",
  "operationId": "classical.clause.conjunction.lord.master.unit.execute",
  "inputContract": "complete-typed-classical-clause-conjunction-lord-master-unit-source",
  "domain": "classical-clause-conjunction-lord-master-unit",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-conjunction-runtime",
  "selections": [
    "claim-p4906"
  ],
  "coordinates": {
    "claim-p4906::p4906-usually-the-meaning-of-the-combination-is-simply-that": {
      "assertionId": "classical-clause-conjunction-lord-master-unit:p4906-usually-the-meaning-of-the-combination-is-simply-that",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseConjunctionValidationFrame",
  "executionValidatorName": "isClassicalClauseConjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4906": [
      "lord-master-unit"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4906": "authorized"
  }
};
export default Object.freeze(spec);
