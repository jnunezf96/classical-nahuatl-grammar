const spec = {
  "ownerId": "classical-numeral-ten-fifteen-analysis",
  "prefix": "ClassicalNumeralTenFifteenAnalysis",
  "operationId": "classical.numeral.ten.fifteen.analysis.execute",
  "inputContract": "complete-typed-classical-numeral-ten-fifteen-analysis-source",
  "domain": "classical-numeral-ten-fifteen-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3291",
    "claim-p3292"
  ],
  "coordinates": {
    "claim-p3291::p3291-the-stem-mah-tla-c-tli-is-a-compound": {
      "assertionId": "classical-numeral-ten-fifteen-analysis:p3291-the-stem-mah-tla-c-tli-is-a-compound",
      "canonicalPath": "cases.tenFifteen.authorizationStatus"
    },
    "claim-p3292::p3292-the-compound-stem-therefore-refers-to-the-fingers-of": {
      "assertionId": "classical-numeral-ten-fifteen-analysis:p3292-the-compound-stem-therefore-refers-to-the-fingers-of",
      "canonicalPath": "contract.evidenceRoles.tenFifteenAnalysis"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3291": [],
    "claim-p3292": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3291": "authorized",
    "claim-p3292": "authorized"
  }
};
export default Object.freeze(spec);
