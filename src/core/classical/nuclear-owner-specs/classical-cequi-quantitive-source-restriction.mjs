const spec = {
  "ownerId": "classical-cequi-quantitive-source-restriction",
  "prefix": "ClassicalCequiQuantitiveSourceRestriction",
  "operationId": "classical.cequi.quantitive.source.restriction.execute",
  "inputContract": "complete-typed-classical-cequi-quantitive-source-restriction-source",
  "domain": "classical-cequi-quantitive-source-restriction",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1754",
    "claim-p1756"
  ],
  "coordinates": {
    "claim-p1754::p1754-ce-qui-ce-c-one-a-certain-amount-or": {
      "assertionId": "classical-cequi-quantitive-source-restriction:p1754-ce-qui-ce-c-one-a-certain-amount-or",
      "canonicalPath": "quantitiveSourceAnalysis.sourceStem"
    },
    "claim-p1756::p1756-the-nncs-can-be-modified-by-adverbs": {
      "assertionId": "classical-cequi-quantitive-source-restriction:p1756-the-nncs-can-be-modified-by-adverbs",
      "canonicalPath": "quantitiveSourceAnalysis.selectedStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1754": [
      "l16-cequi"
    ],
    "claim-p1756": [
      "l16-cequi"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1754": "authorized",
    "claim-p1756": "authorized"
  }
};
export default Object.freeze(spec);
