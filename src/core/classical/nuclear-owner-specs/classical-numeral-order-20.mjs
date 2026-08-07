const spec = {
  "ownerId": "classical-numeral-order-20",
  "prefix": "ClassicalNumeralOrder20",
  "operationId": "classical.numeral.order.20.execute",
  "inputContract": "complete-typed-classical-numeral-order-20-source",
  "domain": "classical-numeral-order-20",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3297",
    "claim-p3298"
  ],
  "coordinates": {
    "claim-p3297::p3297-multiples-of-twenty-four-hundred-and-eight-thousand-are": {
      "assertionId": "classical-numeral-order-20:p3297-multiples-of-twenty-four-hundred-and-eight-thousand-are",
      "canonicalPath": "cases.order20.rules.numeral/order-20"
    },
    "claim-p3298::p3298-multiples-of-twenty-are-expressed-by-compound-nounstems-whose": {
      "assertionId": "classical-numeral-order-20:p3298-multiples-of-twenty-are-expressed-by-compound-nounstems-whose",
      "canonicalPath": "cases.order20.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3297": [],
    "claim-p3298": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3297": "authorized",
    "claim-p3298": "authorized"
  }
};
export default Object.freeze(spec);
