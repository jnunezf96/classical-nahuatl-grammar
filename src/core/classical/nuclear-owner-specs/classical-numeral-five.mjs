const spec = {
  "ownerId": "classical-numeral-five",
  "prefix": "ClassicalNumeralFive",
  "operationId": "classical.numeral.five.execute",
  "inputContract": "complete-typed-classical-numeral-five-source",
  "domain": "classical-numeral-five",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3284",
    "claim-p3287"
  ],
  "coordinates": {
    "claim-p3284::p3284-there-are-two-nounstems-that-mean-five": {
      "assertionId": "classical-numeral-five:p3284-there-are-two-nounstems-that-mean-five",
      "canonicalPath": "cases.five.rules.numeral/five"
    },
    "claim-p3287::p3287-a-plural-subject-of-an-nnc-built-on-the": {
      "assertionId": "classical-numeral-five:p3287-a-plural-subject-of-an-nnc-built-on-the",
      "canonicalPath": "cases.five.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3284": [],
    "claim-p3287": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3284": "authorized",
    "claim-p3287": "authorized"
  }
};
export default Object.freeze(spec);
