const spec = {
  "ownerId": "classical-numeral-conjunction-restriction",
  "prefix": "ClassicalNumeralConjunctionRestriction",
  "operationId": "classical.numeral.conjunction.restriction.execute",
  "inputContract": "complete-typed-classical-numeral-conjunction-restriction-source",
  "domain": "classical-numeral-conjunction-restriction",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3312",
    "claim-p3313"
  ],
  "coordinates": {
    "claim-p3312::p3312-numeral-nncs-with-the-same-matrix-stem-cannot-be": {
      "assertionId": "classical-numeral-conjunction-restriction:p3312-numeral-nncs-with-the-same-matrix-stem-cannot-be",
      "canonicalPath": "cases.conjunctionRestriction.rules.numeral/conjunction-restriction"
    },
    "claim-p3313::p3313-notice-also-that-e-i-cannot-be-a-scribal": {
      "assertionId": "classical-numeral-conjunction-restriction:p3313-notice-also-that-e-i-cannot-be-a-scribal",
      "canonicalPath": "cases.conjunctionRestriction.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3312": [],
    "claim-p3313": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3312": "authorized",
    "claim-p3313": "authorized"
  }
};
export default Object.freeze(spec);
