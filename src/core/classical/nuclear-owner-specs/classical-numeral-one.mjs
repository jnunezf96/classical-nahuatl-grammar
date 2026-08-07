const spec = {
  "ownerId": "classical-numeral-one",
  "prefix": "ClassicalNumeralOne",
  "operationId": "classical.numeral.one.execute",
  "inputContract": "complete-typed-classical-numeral-one-source",
  "domain": "classical-numeral-one",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3268",
    "claim-p3269",
    "claim-p3270"
  ],
  "coordinates": {
    "claim-p3268::p3268-the-stem-cem-meaning-one-is-a-nounstem": {
      "assertionId": "classical-numeral-one:p3268-the-stem-cem-meaning-one-is-a-nounstem",
      "canonicalPath": "cases.one.rules.numeral/one"
    },
    "claim-p3269::p3269-when-not-occurring-as-the-embed-of-a-compound": {
      "assertionId": "classical-numeral-one:p3269-when-not-occurring-as-the-embed-of-a-compound",
      "canonicalPath": "cases.one.authorizationStatus"
    },
    "claim-p3270::p3270-an-nnc-with-a-plural-subject-uses-the-plural": {
      "assertionId": "classical-numeral-one:p3270-an-nnc-with-a-plural-subject-uses-the-plural",
      "canonicalPath": "cases.one.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3268": [],
    "claim-p3269": [],
    "claim-p3270": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3268": "authorized",
    "claim-p3269": "authorized",
    "claim-p3270": "authorized"
  }
};
export default Object.freeze(spec);
