const spec = {
  "ownerId": "classical-denominal-vnc-relational-oa-transitivity",
  "prefix": "ClassicalDenominalVncRelationalOaTransitivity",
  "operationId": "classical.denominal.vnc.relational.oa.transitivity.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-relational-oa-transitivity-source",
  "domain": "classical-denominal-vnc-relational-oa-transitivity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5134"
  ],
  "coordinates": {
    "claim-p5134::p5134-the-o-a-verbstems-are-usually-transitive-but-in": {
      "assertionId": "classical-denominal-vnc-relational-oa-transitivity:p5134-the-o-a-verbstems-are-usually-transitive-but-in",
      "canonicalPath": "result.objectCount"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5134": [
      "relational-oa-transitivity",
      "relational-o-a-intransitive",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5134": "authorized"
  }
};
export default Object.freeze(spec);
