const spec = {
  "ownerId": "classical-adverbial-adjunction-condition-vnc-center",
  "prefix": "ClassicalAdverbialAdjunctionConditionVncCenter",
  "operationId": "classical.adverbial.adjunction.condition.vnc.center.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-condition-vnc-center-source",
  "domain": "classical-adverbial-adjunction-condition-vnc-center",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4744"
  ],
  "coordinates": {
    "claim-p4744::p4744-the-center-of-the-adjunct-may-be-a-vnc": {
      "assertionId": "classical-adverbial-adjunction-condition-vnc-center:p4744-the-center-of-the-adjunct-may-be-a-vnc",
      "canonicalPath": "analysis.vncMayCenterConditionAdjunct"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4744": [
      "condition-vnc-center"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4744": "authorized"
  }
};
export default Object.freeze(spec);
