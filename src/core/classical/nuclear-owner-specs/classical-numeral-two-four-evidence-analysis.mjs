const spec = {
  "ownerId": "classical-numeral-two-four-evidence-analysis",
  "prefix": "ClassicalNumeralTwoFourEvidenceAnalysis",
  "operationId": "classical.numeral.two.four.evidence.analysis.execute",
  "inputContract": "complete-typed-classical-numeral-two-four-evidence-analysis-source",
  "domain": "classical-numeral-two-four-evidence-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3280",
    "claim-p3281"
  ],
  "coordinates": {
    "claim-p3280::p3280-e-yi-ye-yi-e-yi-ye-yi-nonan": {
      "assertionId": "classical-numeral-two-four-evidence-analysis:p3280-e-yi-ye-yi-e-yi-ye-yi-nonan",
      "canonicalPath": "cases.twoFour.authorizationStatus"
    },
    "claim-p3281::p3281-te-intin-te-in-t-e-i-n-t": {
      "assertionId": "classical-numeral-two-four-evidence-analysis:p3281-te-intin-te-in-t-e-i-n-t",
      "canonicalPath": "contract.evidenceRoles.twoFourExamples"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3280": [],
    "claim-p3281": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3280": "authorized",
    "claim-p3281": "authorized"
  }
};
export default Object.freeze(spec);
