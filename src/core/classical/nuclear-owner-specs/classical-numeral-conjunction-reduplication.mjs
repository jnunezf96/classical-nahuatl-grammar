const spec = {
  "ownerId": "classical-numeral-conjunction-reduplication",
  "prefix": "ClassicalNumeralConjunctionReduplication",
  "operationId": "classical.numeral.conjunction.reduplication.execute",
  "inputContract": "complete-typed-classical-numeral-conjunction-reduplication-source",
  "domain": "classical-numeral-conjunction-reduplication",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3349",
    "claim-p3350"
  ],
  "coordinates": {
    "claim-p3349::p3349-when-there-is-a-structure-of-conjunction-the-reduplication": {
      "assertionId": "classical-numeral-conjunction-reduplication:p3349-when-there-is-a-structure-of-conjunction-the-reduplication",
      "canonicalPath": "cases.conjunctionReduplication.rules.numeral/conjunction-reduplication"
    },
    "claim-p3350::p3350-ca-caxto-lli-omee-i-ca-caxto-ltetl-omee": {
      "assertionId": "classical-numeral-conjunction-reduplication:p3350-ca-caxto-lli-omee-i-ca-caxto-ltetl-omee",
      "canonicalPath": "cases.conjunctionReduplication.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3349": [],
    "claim-p3350": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3349": "authorized",
    "claim-p3350": "authorized"
  }
};
export default Object.freeze(spec);
