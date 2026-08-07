const spec = {
  "ownerId": "classical-denominal-vnc-oa-inventory",
  "prefix": "ClassicalDenominalVncOaInventory",
  "operationId": "classical.denominal.vnc.oa.inventory.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-oa-inventory-source",
  "domain": "classical-denominal-vnc-oa-inventory",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5115"
  ],
  "coordinates": {
    "claim-p5115::p5115-there-are-several-types-of-denominal-verbstems-created-by": {
      "assertionId": "classical-denominal-vnc-oa-inventory:p5115-there-are-several-types-of-denominal-verbstems-created-by",
      "canonicalPath": "result.operationId"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5115": [
      "oa-inventory",
      "intransitive-o-a-use",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5115": "authorized"
  }
};
export default Object.freeze(spec);
