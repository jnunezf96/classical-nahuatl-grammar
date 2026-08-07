const spec = {
  "ownerId": "classical-quantitive-pronominal-source-inventory",
  "prefix": "ClassicalQuantitivePronominalSourceInventory",
  "operationId": "classical.quantitive.pronominal.source.inventory.execute",
  "inputContract": "complete-typed-classical-quantitive-pronominal-source-inventory-source",
  "domain": "classical-quantitive-pronominal-source-inventory",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1724",
    "claim-p1725",
    "claim-p1726",
    "claim-p1727",
    "claim-p1728"
  ],
  "coordinates": {
    "claim-p1724::p1724-quantitive-pronominal-nncs-can-also-function-as-quantitive-adjectival": {
      "assertionId": "classical-quantitive-pronominal-source-inventory:p1724-quantitive-pronominal-nncs-can-also-function-as-quantitive-adjectival",
      "canonicalPath": "pronominalFrame.sourceFrame.semanticKind"
    },
    "claim-p1725::p1725-the-stems-for-these-absolutive-state-nncs-are-compound": {
      "assertionId": "classical-quantitive-pronominal-source-inventory:p1725-the-stems-for-these-absolutive-state-nncs-are-compound",
      "canonicalPath": "pronominalFrame.sourceFrame.state"
    },
    "claim-p1726::p1726-serving-as-embeds-for-the-matrices-are-the-stems": {
      "assertionId": "classical-quantitive-pronominal-source-inventory:p1726-serving-as-embeds-for-the-matrices-are-the-stems",
      "canonicalPath": "quantitiveSourceAnalysis.inventorySelectionAuthority"
    },
    "claim-p1727::p1727-these-matrix-stems-mean-amount-quantity-number": {
      "assertionId": "classical-quantitive-pronominal-source-inventory:p1727-these-matrix-stems-mean-amount-quantity-number",
      "canonicalPath": "quantitiveSourceAnalysis.sourceExamplesAreRuntimeAuthority"
    },
    "claim-p1728::p1728-some-of-these-morphs-occur-in-other-stem-formations": {
      "assertionId": "classical-quantitive-pronominal-source-inventory:p1728-some-of-these-morphs-occur-in-other-stem-formations",
      "canonicalPath": "pronominalFrame.sourceFrame.referentCategory"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1724": [
      "l16-ixquich"
    ],
    "claim-p1725": [
      "l16-ixquich"
    ],
    "claim-p1726": [
      "l16-ixquich"
    ],
    "claim-p1727": [
      "l16-ixquich"
    ],
    "claim-p1728": [
      "l16-ixquich"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1724": "authorized",
    "claim-p1725": "authorized",
    "claim-p1726": "authorized",
    "claim-p1727": "authorized",
    "claim-p1728": "authorized"
  }
};
export default Object.freeze(spec);
