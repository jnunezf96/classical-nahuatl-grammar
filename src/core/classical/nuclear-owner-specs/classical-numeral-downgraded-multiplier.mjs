const spec = {
  "ownerId": "classical-numeral-downgraded-multiplier",
  "prefix": "ClassicalNumeralDowngradedMultiplier",
  "operationId": "classical.numeral.downgraded.multiplier.execute",
  "inputContract": "complete-typed-classical-numeral-downgraded-multiplier-source",
  "domain": "classical-numeral-downgraded-multiplier",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3305",
    "claim-p3306"
  ],
  "coordinates": {
    "claim-p3305::p3305-in-order-to-obey-the-rule-about-numeral-embeds": {
      "assertionId": "classical-numeral-downgraded-multiplier:p3305-in-order-to-obey-the-rule-about-numeral-embeds",
      "canonicalPath": "cases.downgradedMultiplier.rules.numeral/downgraded-multiplier"
    },
    "claim-p3306::p3306-the-downgrading-of-the-structure-of-conjunction-is-accomplished": {
      "assertionId": "classical-numeral-downgraded-multiplier:p3306-the-downgrading-of-the-structure-of-conjunction-is-accomplished",
      "canonicalPath": "cases.downgradedMultiplier.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3305": [],
    "claim-p3306": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3305": "authorized",
    "claim-p3306": "authorized"
  }
};
export default Object.freeze(spec);
