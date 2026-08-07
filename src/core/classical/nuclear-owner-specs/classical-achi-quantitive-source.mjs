const spec = {
  "ownerId": "classical-achi-quantitive-source",
  "prefix": "ClassicalAchiQuantitiveSource",
  "operationId": "classical.achi.quantitive.source.execute",
  "inputContract": "complete-typed-classical-achi-quantitive-source-source",
  "domain": "classical-achi-quantitive-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1765"
  ],
  "coordinates": {
    "claim-p1765::p1765-a-chi-a-small-amount-or-quantity-a-little": {
      "assertionId": "classical-achi-quantitive-source:p1765-a-chi-a-small-amount-or-quantity-a-little",
      "canonicalPath": "quantitiveSourceAnalysis.sourceStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1765": [
      "l16-achi"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1765": "authorized"
  }
};
export default Object.freeze(spec);
