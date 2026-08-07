const spec = {
  "ownerId": "classical-numeral-conjunction",
  "prefix": "ClassicalNumeralConjunction",
  "operationId": "classical.numeral.conjunction.execute",
  "inputContract": "complete-typed-classical-numeral-conjunction-source",
  "domain": "classical-numeral-conjunction",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3299",
    "claim-p3300",
    "claim-p3301",
    "claim-p3302"
  ],
  "coordinates": {
    "claim-p3299::p3299-in-order-to-link-the-digits-one-through-four": {
      "assertionId": "classical-numeral-conjunction:p3299-in-order-to-link-the-digits-one-through-four",
      "canonicalPath": "cases.conjunction.rules.numeral/conjunction"
    },
    "claim-p3300::p3300-since-conjunction-is-recursive-the-second-conjunct-can-itself": {
      "assertionId": "classical-numeral-conjunction:p3300-since-conjunction-is-recursive-the-second-conjunct-can-itself",
      "canonicalPath": "cases.conjunction.authorizationStatus"
    },
    "claim-p3301::p3301-the-stem-of-the-nnc-that-functions-as-a": {
      "assertionId": "classical-numeral-conjunction:p3301-the-stem-of-the-nnc-that-functions-as-a",
      "canonicalPath": "cases.conjunction.gcdSatisfied"
    },
    "claim-p3302::p3302-one-should-not-confuse-om-with-o-m-the": {
      "assertionId": "classical-numeral-conjunction:p3302-one-should-not-confuse-om-with-o-m-the",
      "canonicalPath": "cases.conjunction.lcmComplete"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3299": [],
    "claim-p3300": [],
    "claim-p3301": [],
    "claim-p3302": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3299": "authorized",
    "claim-p3300": "authorized",
    "claim-p3301": "authorized",
    "claim-p3302": "authorized"
  }
};
export default Object.freeze(spec);
