const spec = {
  "ownerId": "classical-numeral-four-boundary",
  "prefix": "ClassicalNumeralFourBoundary",
  "operationId": "classical.numeral.four.boundary.execute",
  "inputContract": "complete-typed-classical-numeral-four-boundary-source",
  "domain": "classical-numeral-four-boundary",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3282",
    "claim-p3283"
  ],
  "coordinates": {
    "claim-p3282::p3282-the-na-hu-and-na-uh-variants-are-used": {
      "assertionId": "classical-numeral-four-boundary:p3282-the-na-hu-and-na-uh-variants-are-used",
      "canonicalPath": "cases.fourBoundary.rules.numeral/four-boundary"
    },
    "claim-p3283::p3283-tina-huintin-tina-huin-ti-na-hui-n-t": {
      "assertionId": "classical-numeral-four-boundary:p3283-tina-huintin-tina-huin-ti-na-hui-n-t",
      "canonicalPath": "cases.fourBoundary.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3282": [],
    "claim-p3283": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3282": "authorized",
    "claim-p3283": "authorized"
  }
};
export default Object.freeze(spec);
