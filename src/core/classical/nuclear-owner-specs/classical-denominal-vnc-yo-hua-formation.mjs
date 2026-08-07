const spec = {
  "ownerId": "classical-denominal-vnc-yo-hua-formation",
  "prefix": "ClassicalDenominalVncYoHuaFormation",
  "operationId": "classical.denominal.vnc.yo.hua.formation.execute",
  "inputContract": "complete-typed-classical-denominal-vnc-yo-hua-formation-source",
  "domain": "classical-denominal-vnc-yo-hua-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-denominal-vnc-runtime",
  "selections": [
    "claim-p5023"
  ],
  "coordinates": {
    "claim-p5023::p5023-the-inceptive-stative-suffix-hua-is-added-to-deverbal": {
      "assertionId": "classical-denominal-vnc-yo-hua-formation:p5023-the-inceptive-stative-suffix-hua-is-added-to-deverbal",
      "canonicalPath": "result.sourceKind"
    }
  },
  "executionFunctionName": "buildClassicalDenominalVncValidationFrame",
  "executionValidatorName": "isClassicalDenominalVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5023": [
      "yo-hua-formation",
      "deverbal-yo-hua",
      "default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5023": "authorized"
  }
};
export default Object.freeze(spec);
