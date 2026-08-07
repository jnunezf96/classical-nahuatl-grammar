const spec = {
  "ownerId": "classical-numeral-measure",
  "prefix": "ClassicalNumeralMeasure",
  "operationId": "classical.numeral.measure.execute",
  "inputContract": "complete-typed-classical-numeral-measure-source",
  "domain": "classical-numeral-measure",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3354",
    "claim-p3355",
    "claim-p3356"
  ],
  "coordinates": {
    "claim-p3354::p3354-a-compound-stemmed-nnc-whose-stem-contains-a-numeral": {
      "assertionId": "classical-numeral-measure:p3354-a-compound-stemmed-nnc-whose-stem-contains-a-numeral",
      "canonicalPath": "cases.measure.rules.numeral/measure"
    },
    "claim-p3355::p3355-a-similar-formation-can-express-a-measure-of-length": {
      "assertionId": "classical-numeral-measure:p3355-a-similar-formation-can-express-a-measure-of-length",
      "canonicalPath": "cases.measure.authorizationStatus"
    },
    "claim-p3356::p3356-cemiztetl-cemiztitl-it-is-one-fingernail-length-i-e": {
      "assertionId": "classical-numeral-measure:p3356-cemiztetl-cemiztitl-it-is-one-fingernail-length-i-e",
      "canonicalPath": "cases.measure.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3354": [],
    "claim-p3355": [],
    "claim-p3356": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3354": "authorized",
    "claim-p3355": "authorized",
    "claim-p3356": "authorized"
  }
};
export default Object.freeze(spec);
