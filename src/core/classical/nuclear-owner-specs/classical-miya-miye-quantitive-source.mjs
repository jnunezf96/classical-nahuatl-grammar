const spec = {
  "ownerId": "classical-miya-miye-quantitive-source",
  "prefix": "ClassicalMiyaMiyeQuantitiveSource",
  "operationId": "classical.miya.miye.quantitive.source.execute",
  "inputContract": "complete-typed-classical-miya-miye-quantitive-source-source",
  "domain": "classical-miya-miye-quantitive-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1752",
    "claim-p1753"
  ],
  "coordinates": {
    "claim-p1752::p1752-miya-qui-miya-c-miye-qui-miye-c-an": {
      "assertionId": "classical-miya-miye-quantitive-source:p1752-miya-qui-miya-c-miye-qui-miye-c-an",
      "canonicalPath": "quantitiveSourceAnalysis.canonicalSourceStem"
    },
    "claim-p1753::p1753-the-nncs-are-frequently-modified-by-adverbs": {
      "assertionId": "classical-miya-miye-quantitive-source:p1753-the-nncs-are-frequently-modified-by-adverbs",
      "canonicalPath": "quantitiveSourceAnalysis.embedStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1752": [
      "l16-miyequi"
    ],
    "claim-p1753": [
      "l16-miyequi"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1752": "authorized",
    "claim-p1753": "authorized"
  }
};
export default Object.freeze(spec);
