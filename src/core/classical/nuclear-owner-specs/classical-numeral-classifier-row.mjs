const spec = {
  "ownerId": "classical-numeral-classifier-row",
  "prefix": "ClassicalNumeralClassifierRow",
  "operationId": "classical.numeral.classifier.row.execute",
  "inputContract": "complete-typed-classical-numeral-classifier-row-source",
  "domain": "classical-numeral-classifier-row",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3319",
    "claim-p3320"
  ],
  "coordinates": {
    "claim-p3319::p3319-the-set-of-numeral-stems-used-for-counting-rows": {
      "assertionId": "classical-numeral-classifier-row:p3319-the-set-of-numeral-stems-used-for-counting-rows",
      "canonicalPath": "cases.classifierRow.rules.numeral/classifier-row"
    },
    "claim-p3320::p3320-when-there-is-a-structure-of-conjunction-the-stem": {
      "assertionId": "classical-numeral-classifier-row:p3320-when-there-is-a-structure-of-conjunction-the-stem",
      "canonicalPath": "cases.classifierRow.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3319": [],
    "claim-p3320": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3319": "authorized",
    "claim-p3320": "authorized"
  }
};
export default Object.freeze(spec);
