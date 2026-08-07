const spec = {
  "ownerId": "classical-mochi-quantitive-source-alternatives",
  "prefix": "ClassicalMochiQuantitiveSourceAlternatives",
  "operationId": "classical.mochi.quantitive.source.alternatives.execute",
  "inputContract": "complete-typed-classical-mochi-quantitive-source-alternatives-source",
  "domain": "classical-mochi-quantitive-source-alternatives",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1766",
    "claim-p1767",
    "claim-p1768"
  ],
  "coordinates": {
    "claim-p1766::p1766-mo-chi-mo-ch-a-full-amount-or-number": {
      "assertionId": "classical-mochi-quantitive-source-alternatives:p1766-mo-chi-mo-ch-a-full-amount-or-number",
      "canonicalPath": "quantitiveSourceAnalysis.sourceStem"
    },
    "claim-p1767::p1767-the-nncs-formed-on-this-stem-can-be-modified": {
      "assertionId": "classical-mochi-quantitive-source-alternatives:p1767-the-nncs-formed-on-this-stem-can-be-modified",
      "canonicalPath": "quantitiveAuthorityRecord.predicatePluralization"
    },
    "claim-p1768::p1768-the-shortened-stem-mo-ch-besides-appearing-as-the": {
      "assertionId": "classical-mochi-quantitive-source-alternatives:p1768-the-shortened-stem-mo-ch-besides-appearing-as-the",
      "canonicalPath": "pronominalFrame.sourceFrame.sourceStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1766": [
      "l16-mochi"
    ],
    "claim-p1767": [
      "l16-moch-plain-plural"
    ],
    "claim-p1768": [
      "l16-moch-personal"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1766": "authorized",
    "claim-p1767": "authorized",
    "claim-p1768": "authorized"
  }
};
export default Object.freeze(spec);
