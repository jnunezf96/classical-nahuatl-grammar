const spec = {
  "ownerId": "classical-numeral-five-history-analysis",
  "prefix": "ClassicalNumeralFiveHistoryAnalysis",
  "operationId": "classical.numeral.five.history.analysis.execute",
  "inputContract": "complete-typed-classical-numeral-five-history-analysis-source",
  "domain": "classical-numeral-five-history-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3285",
    "claim-p3286"
  ],
  "coordinates": {
    "claim-p3285::p3285-the-stem-ma-cu-i-l-li-is-a": {
      "assertionId": "classical-numeral-five-history-analysis:p3285-the-stem-ma-cu-i-l-li-is-a",
      "canonicalPath": "cases.five.authorizationStatus"
    },
    "claim-p3286::p3286-therefore-ma-cu-i-l-li-means-s-th": {
      "assertionId": "classical-numeral-five-history-analysis:p3286-therefore-ma-cu-i-l-li-means-s-th",
      "canonicalPath": "contract.evidenceRoles.fiveDerivationHistory"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3285": [],
    "claim-p3286": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3285": "authorized",
    "claim-p3286": "authorized"
  }
};
export default Object.freeze(spec);
