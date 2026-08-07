const spec = {
  "ownerId": "classical-numeral-classifier-thing",
  "prefix": "ClassicalNumeralClassifierThing",
  "operationId": "classical.numeral.classifier.thing.execute",
  "inputContract": "complete-typed-classical-numeral-classifier-thing-source",
  "domain": "classical-numeral-classifier-thing",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3321",
    "claim-p3322",
    "claim-p3323"
  ],
  "coordinates": {
    "claim-p3321::p3321-the-set-of-numeral-stems-used-in-counting-things": {
      "assertionId": "classical-numeral-classifier-thing:p3321-the-set-of-numeral-stems-used-in-counting-things",
      "canonicalPath": "cases.classifierThing.rules.numeral/classifier-thing"
    },
    "claim-p3322::p3322-the-gross-count-stem-occurs-as-expected-only-in": {
      "assertionId": "classical-numeral-classifier-thing:p3322-the-gross-count-stem-occurs-as-expected-only-in",
      "canonicalPath": "cases.classifierThing.authorizationStatus"
    },
    "claim-p3323::p3323-when-there-is-a-structure-of-conjunction-the-stem": {
      "assertionId": "classical-numeral-classifier-thing:p3323-when-there-is-a-structure-of-conjunction-the-stem",
      "canonicalPath": "cases.classifierThing.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3321": [],
    "claim-p3322": [],
    "claim-p3323": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3321": "authorized",
    "claim-p3322": "authorized",
    "claim-p3323": "authorized"
  }
};
export default Object.freeze(spec);
