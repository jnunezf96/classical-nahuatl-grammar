const spec = {
  "ownerId": "classical-adverbial-adjunction-condition-tla-omission",
  "prefix": "ClassicalAdverbialAdjunctionConditionTlaOmission",
  "operationId": "classical.adverbial.adjunction.condition.tla.omission.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-condition-tla-omission-source",
  "domain": "classical-adverbial-adjunction-condition-tla-omission",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4761",
    "claim-p4762"
  ],
  "coordinates": {
    "claim-p4761::p4761-if-some-other-element-suggesting-a-condition-is-present": {
      "assertionId": "classical-adverbial-adjunction-condition-tla-omission:p4761-if-some-other-element-suggesting-a-condition-is-present",
      "canonicalPath": "analysis.tlaMayBeOmittedWithConditionalCue"
    },
    "claim-p4762::p4762-the-particle-tla-may-be-omitted-if-some-other": {
      "assertionId": "classical-adverbial-adjunction-condition-tla-omission:p4762-the-particle-tla-may-be-omitted-if-some-other",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4761": [
      "condition-tla-omission"
    ],
    "claim-p4762": [
      "condition-tla-omission"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4761": "authorized",
    "claim-p4762": "authorized"
  }
};
export default Object.freeze(spec);
