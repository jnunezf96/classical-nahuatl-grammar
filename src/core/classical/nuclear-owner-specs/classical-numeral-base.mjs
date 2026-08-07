const spec = {
  "ownerId": "classical-numeral-base",
  "prefix": "ClassicalNumeralBase",
  "operationId": "classical.numeral.base.execute",
  "inputContract": "complete-typed-classical-numeral-base-source",
  "domain": "classical-numeral-base",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3252",
    "claim-p3253",
    "claim-p3254",
    "claim-p3255",
    "claim-p3256"
  ],
  "coordinates": {
    "claim-p3252::p3252-the-numerical-system-of-nahuatl-is-vigesimal-that-is": {
      "assertionId": "classical-numeral-base:p3252-the-numerical-system-of-nahuatl-is-vigesimal-that-is",
      "canonicalPath": "cases.base.rules.numeral/base"
    },
    "claim-p3253::p3253-the-successive-orders-are-therefore-one-twenty-four-hundred": {
      "assertionId": "classical-numeral-base:p3253-the-successive-orders-are-therefore-one-twenty-four-hundred",
      "canonicalPath": "cases.base.authorizationStatus"
    },
    "claim-p3254::p3254-a-cardinal-numeral-in-nahuatl-is-structured-on-the": {
      "assertionId": "classical-numeral-base:p3254-a-cardinal-numeral-in-nahuatl-is-structured-on-the",
      "canonicalPath": "cases.base.gcdSatisfied"
    },
    "claim-p3255::p3255-like-pronominal-nncs-cardinal-numeral-nncs-do-not-occur": {
      "assertionId": "classical-numeral-base:p3255-like-pronominal-nncs-cardinal-numeral-nncs-do-not-occur",
      "canonicalPath": "cases.base.lcmComplete"
    },
    "claim-p3256::p3256-like-nounstems-cardinal-numeral-stems-may-be-embedded-in": {
      "assertionId": "classical-numeral-base:p3256-like-nounstems-cardinal-numeral-stems-may-be-embedded-in",
      "canonicalPath": "cases.base.rules.numeral/base"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3252": [],
    "claim-p3253": [],
    "claim-p3254": [],
    "claim-p3255": [],
    "claim-p3256": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3252": "authorized",
    "claim-p3253": "authorized",
    "claim-p3254": "authorized",
    "claim-p3255": "authorized",
    "claim-p3256": "authorized"
  }
};
export default Object.freeze(spec);
