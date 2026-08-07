const spec = {
  "ownerId": "classical-tl-subclass-two-a-truncation",
  "prefix": "ClassicalTlSubclassTwoATruncation",
  "operationId": "classical.tl.subclass.two.a.truncation.execute",
  "inputContract": "complete-typed-classical-tl-subclass-two-a-truncation-source",
  "domain": "classical-tl-subclass-two-a-truncation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nounstem-selection-runtime",
  "selections": [
    "claim-p1556",
    "claim-p1557"
  ],
  "coordinates": {
    "claim-p1556::p1556-subclass-2-a-has-a-limited-use-stem-that": {
      "assertionId": "classical-tl-subclass-two-a-truncation:p1556-subclass-2-a-has-a-limited-use-stem-that",
      "canonicalPath": "sourceFrame.subclassSourceShapeFrame.conditionId"
    },
    "claim-p1557::p1557-the-truncated-general-use-stem-consequently-ends-in-a": {
      "assertionId": "classical-tl-subclass-two-a-truncation:p1557-the-truncated-general-use-stem-consequently-ends-in-a",
      "canonicalPath": "sourceFrame.generalUseStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNounstemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNounstemValidationFrame",
  "executionArgsBySelection": {
    "claim-p1556": [
      "possessive-common-tl2a"
    ],
    "claim-p1557": [
      "possessive-common-tl2a"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1556": "authorized",
    "claim-p1557": "authorized"
  }
};
export default Object.freeze(spec);
