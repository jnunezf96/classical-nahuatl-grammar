const spec = {
  "ownerId": "classical-quich-quantitive-source-formation",
  "prefix": "ClassicalQuichQuantitiveSourceFormation",
  "operationId": "classical.quich.quantitive.source.formation.execute",
  "inputContract": "complete-typed-classical-quich-quantitive-source-formation-source",
  "domain": "classical-quich-quantitive-source-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1742",
    "claim-p1743",
    "claim-p1744",
    "claim-p1745",
    "claim-p1746"
  ],
  "coordinates": {
    "claim-p1742::p1742-there-are-two-quantitive-pronominal-compound-stems-formed-on": {
      "assertionId": "classical-quich-quantitive-source-formation:p1742-there-are-two-quantitive-pronominal-compound-stems-formed-on",
      "canonicalPath": "quantitiveAuthorityRecord.matrixFamily"
    },
    "claim-p1743::p1743-ix-qui-ch-a-total-amount-or-quantity-all": {
      "assertionId": "classical-quich-quantitive-source-formation:p1743-ix-qui-ch-a-total-amount-or-quantity-all",
      "canonicalPath": "quantitiveSourceAnalysis.sourceStem"
    },
    "claim-p1744::p1744-the-nncs-are-frequently-modified-by-adverbs": {
      "assertionId": "classical-quich-quantitive-source-formation:p1744-the-nncs-are-frequently-modified-by-adverbs",
      "canonicalPath": "pronominalFrame.sourceFrame.composition.predicatePluralization"
    },
    "claim-p1745::p1745-que-x-qui-ch-how-large-a-total-amount": {
      "assertionId": "classical-quich-quantitive-source-formation:p1745-que-x-qui-ch-how-large-a-total-amount",
      "canonicalPath": "quantitiveSourceAnalysis.sourceStem"
    },
    "claim-p1746::p1746-there-is-also-a-distributive-varietal-stem-with-reduplication": {
      "assertionId": "classical-quich-quantitive-source-formation:p1746-there-is-also-a-distributive-varietal-stem-with-reduplication",
      "canonicalPath": "quantitiveSourceAnalysis.inherentInterrogative"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1742": [
      "l16-ixquich"
    ],
    "claim-p1743": [
      "l16-ixquich"
    ],
    "claim-p1744": [
      "l16-ixquich"
    ],
    "claim-p1745": [
      "l16-quexquich"
    ],
    "claim-p1746": [
      "l16-quexquich"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1742": "authorized",
    "claim-p1743": "authorized",
    "claim-p1744": "authorized",
    "claim-p1745": "authorized",
    "claim-p1746": "authorized"
  }
};
export default Object.freeze(spec);
