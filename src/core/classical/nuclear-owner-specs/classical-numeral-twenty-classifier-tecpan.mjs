const spec = {
  "ownerId": "classical-numeral-twenty-classifier-tecpan",
  "prefix": "ClassicalNumeralTwentyClassifierTecpan",
  "operationId": "classical.numeral.twenty.classifier.tecpan.execute",
  "inputContract": "complete-typed-classical-numeral-twenty-classifier-tecpan-source",
  "domain": "classical-numeral-twenty-classifier-tecpan",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3333",
    "claim-p3334"
  ],
  "coordinates": {
    "claim-p3333::p3333-in-addition-to-the-unit-sets-there-are-special": {
      "assertionId": "classical-numeral-twenty-classifier-tecpan:p3333-in-addition-to-the-unit-sets-there-are-special",
      "canonicalPath": "cases.twentyClassifierTecpan.rules.numeral/twenty-classifier-tecpan"
    },
    "claim-p3334::p3334-when-counting-people-animals-houses-and-rocks-the-stem": {
      "assertionId": "classical-numeral-twenty-classifier-tecpan:p3334-when-counting-people-animals-houses-and-rocks-the-stem",
      "canonicalPath": "cases.twentyClassifierTecpan.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3333": [],
    "claim-p3334": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3333": "authorized",
    "claim-p3334": "authorized"
  }
};
export default Object.freeze(spec);
