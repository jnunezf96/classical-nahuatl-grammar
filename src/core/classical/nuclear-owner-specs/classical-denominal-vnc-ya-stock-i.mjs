const spec = {
  "ownerId": "classical-denominal-vnc-ya-stock-i",
  "prefix": "ClassicalDenominalVncYaStockI",
  "operationId": "classical.denominal.vnc.ya.stock.i.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-ya-stock-i-source",
  "domain": "classical-denominal-vnc-ya-stock-i",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p4988",
    "claim-p4989"
  ],
  "coordinates": {
    "claim-p4988::p4988-occasionally-the-base-to-which-the-ya-is-added": {
      "assertionId": "classical-denominal-vnc-ya-stock-i:p4988-occasionally-the-base-to-which-the-ya-is-added",
      "canonicalPath": "result.operationId"
    },
    "claim-p4989::p4989-cel-i-ya-fora-plant-to-sprout-take-root": {
      "assertionId": "classical-denominal-vnc-ya-stock-i:p4989-cel-i-ya-fora-plant-to-sprout-take-root",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4988": [
      "ya-stock-i",
      "inceptive-root-ya",
      "default"
    ],
    "claim-p4989": [
      "ya-stock-i",
      "inceptive-root-ya",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4988": "authorized",
    "claim-p4989": "authorized"
  }
};
export default Object.freeze(spec);
