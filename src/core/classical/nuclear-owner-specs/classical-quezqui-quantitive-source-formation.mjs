const spec = {
  "ownerId": "classical-quezqui-quantitive-source-formation",
  "prefix": "ClassicalQuezquiQuantitiveSourceFormation",
  "operationId": "classical.quezqui.quantitive.source.formation.execute",
  "inputContract": "complete-typed-classical-quezqui-quantitive-source-formation-source",
  "domain": "classical-quezqui-quantitive-source-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1759",
    "claim-p1762",
    "claim-p1763"
  ],
  "coordinates": {
    "claim-p1759::p1759-que-z-qui-how-large-or-full-a-number": {
      "assertionId": "classical-quezqui-quantitive-source-formation:p1759-que-z-qui-how-large-or-full-a-number",
      "canonicalPath": "quantitiveSourceAnalysis.sourceStem"
    },
    "claim-p1762::p1762-there-is-also-a-distributive-varietal-stem-with-reduplication": {
      "assertionId": "classical-quezqui-quantitive-source-formation:p1762-there-is-also-a-distributive-varietal-stem-with-reduplication",
      "canonicalPath": "quantitiveSourceAnalysis.inherentInterrogative"
    },
    "claim-p1763::p1763-que-c-iz-qui-how-many-each-what-sum": {
      "assertionId": "classical-quezqui-quantitive-source-formation:p1763-que-c-iz-qui-how-many-each-what-sum",
      "canonicalPath": "quantitiveSourceAnalysis.embedStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1759": [
      "l16-quezqui"
    ],
    "claim-p1762": [
      "l16-quezqui"
    ],
    "claim-p1763": [
      "l16-quezqui"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1759": "authorized",
    "claim-p1762": "authorized",
    "claim-p1763": "authorized"
  }
};
export default Object.freeze(spec);
