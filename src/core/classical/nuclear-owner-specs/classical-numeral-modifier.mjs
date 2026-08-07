const spec = {
  "ownerId": "classical-numeral-modifier",
  "prefix": "ClassicalNumeralModifier",
  "operationId": "classical.numeral.modifier.execute",
  "inputContract": "complete-typed-classical-numeral-modifier-source",
  "domain": "classical-numeral-modifier",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3351",
    "claim-p3352",
    "claim-p3353"
  ],
  "coordinates": {
    "claim-p3351::p3351-when-canah-somewhere-que-n-in-a-manner-or": {
      "assertionId": "classical-numeral-modifier:p3351-when-canah-somewhere-que-n-in-a-manner-or",
      "canonicalPath": "cases.modifier.rules.numeral/modifier"
    },
    "claim-p3352::p3352-when-oc-still-is-placed-before-a-number-nnc": {
      "assertionId": "classical-numeral-modifier:p3352-when-oc-still-is-placed-before-a-number-nnc",
      "canonicalPath": "cases.modifier.authorizationStatus"
    },
    "claim-p3353::p3353-as-a-supplementary-subject-the-sentence-oc-ce-he": {
      "assertionId": "classical-numeral-modifier:p3353-as-a-supplementary-subject-the-sentence-oc-ce-he",
      "canonicalPath": "cases.modifier.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3351": [],
    "claim-p3352": [],
    "claim-p3353": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3351": "authorized",
    "claim-p3352": "authorized",
    "claim-p3353": "authorized"
  }
};
export default Object.freeze(spec);
