const spec = {
  "ownerId": "classical-denominal-vnc-temporal-tia-category",
  "prefix": "ClassicalDenominalVncTemporalTiaCategory",
  "operationId": "classical.denominal.vnc.temporal.tia.category.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-temporal-tia-category-source",
  "domain": "classical-denominal-vnc-temporal-tia-category",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5109"
  ],
  "coordinates": {
    "claim-p5109::p5109-there-is-another-verbstem-fonning-suffix-tia-that-looks": {
      "assertionId": "classical-denominal-vnc-temporal-tia-category:p5109-there-is-another-verbstem-fonning-suffix-tia-that-looks",
      "canonicalPath": "result.objectCount"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5109": [
      "temporal-tia-category",
      "temporal-tia",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5109": "authorized"
  }
};
export default Object.freeze(spec);
