const spec = {
  "ownerId": "classical-numeral-six-nine",
  "prefix": "ClassicalNumeralSixNine",
  "operationId": "classical.numeral.six.nine.execute",
  "inputContract": "complete-typed-classical-numeral-six-nine-source",
  "domain": "classical-numeral-six-nine",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3288",
    "claim-p3289"
  ],
  "coordinates": {
    "claim-p3288::p3288-the-nounstem-chicua-chiuc-c-ikw-chic-occurs-only": {
      "assertionId": "classical-numeral-six-nine:p3288-the-nounstem-chicua-chiuc-c-ikw-chic-occurs-only",
      "canonicalPath": "cases.sixNine.rules.numeral/six-nine"
    },
    "claim-p3289::p3289-the-compound-stem-therefore-means-something-like-the-count": {
      "assertionId": "classical-numeral-six-nine:p3289-the-compound-stem-therefore-means-something-like-the-count",
      "canonicalPath": "cases.sixNine.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3288": [],
    "claim-p3289": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3288": "authorized",
    "claim-p3289": "authorized"
  }
};
export default Object.freeze(spec);
