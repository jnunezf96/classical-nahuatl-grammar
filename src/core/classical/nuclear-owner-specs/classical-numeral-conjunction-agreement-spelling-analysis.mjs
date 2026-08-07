const spec = {
  "ownerId": "classical-numeral-conjunction-agreement-spelling-analysis",
  "prefix": "ClassicalNumeralConjunctionAgreementSpellingAnalysis",
  "operationId": "classical.numeral.conjunction.agreement.spelling.analysis.execute",
  "inputContract": "complete-typed-classical-numeral-conjunction-agreement-spelling-analysis-source",
  "domain": "classical-numeral-conjunction-agreement-spelling-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3307",
    "claim-p3308",
    "claim-p3309"
  ],
  "coordinates": {
    "claim-p3307::p3307-note-1-in-traditional-texts-one-can-find-conjoined": {
      "assertionId": "classical-numeral-conjunction-agreement-spelling-analysis:p3307-note-1-in-traditional-texts-one-can-find-conjoined",
      "canonicalPath": "cases.conjunctionAgreement.authorizationStatus"
    },
    "claim-p3308::p3308-such-items-are-the-result-of-the-failure-to": {
      "assertionId": "classical-numeral-conjunction-agreement-spelling-analysis:p3308-such-items-are-the-result-of-the-failure-to",
      "canonicalPath": "contract.evidenceRoles.conjunctionAgreementSpelling"
    },
    "claim-p3309::p3309-properly-spelled-the-exemplified-unit-is-caxto-ltin-ome": {
      "assertionId": "classical-numeral-conjunction-agreement-spelling-analysis:p3309-properly-spelled-the-exemplified-unit-is-caxto-ltin-ome",
      "canonicalPath": "contract.storedExampleAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3307": [],
    "claim-p3308": [],
    "claim-p3309": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3307": "authorized",
    "claim-p3308": "authorized",
    "claim-p3309": "authorized"
  }
};
export default Object.freeze(spec);
