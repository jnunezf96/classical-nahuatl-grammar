const spec = {
  "ownerId": "classical-izqui-quantitive-number-alternative",
  "prefix": "ClassicalIzquiQuantitiveNumberAlternative",
  "operationId": "classical.izqui.quantitive.number.alternative.execute",
  "inputContract": "complete-typed-classical-izqui-quantitive-number-alternative-source",
  "domain": "classical-izqui-quantitive-number-alternative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1757",
    "claim-p1758"
  ],
  "coordinates": {
    "claim-p1757::p1757-iz-qui-an-equal-amount-or-number-as-much": {
      "assertionId": "classical-izqui-quantitive-number-alternative:p1757-iz-qui-an-equal-amount-or-number-as-much",
      "canonicalPath": "quantitiveSourceAnalysis.sourceStem"
    },
    "claim-p1758::p1758-the-nncs-are-frequently-modified-by-adverbs": {
      "assertionId": "classical-izqui-quantitive-number-alternative:p1758-the-nncs-are-frequently-modified-by-adverbs",
      "canonicalPath": "quantitiveSourceAnalysis.allowedPluralizations"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1757": [
      "l16-izqui"
    ],
    "claim-p1758": [
      "l16-izqui"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1757": "authorized",
    "claim-p1758": "authorized"
  }
};
export default Object.freeze(spec);
