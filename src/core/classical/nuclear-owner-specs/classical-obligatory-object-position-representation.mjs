const spec = {
  "ownerId": "classical-obligatory-object-position-representation",
  "prefix": "ClassicalObligatoryObjectPositionRepresentation",
  "operationId": "classical.obligatory.object.position.representation.execute",
  "inputContract": "complete-typed-classical-obligatory-object-position-representation-source",
  "domain": "classical-obligatory-object-position-representation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2216",
    "claim-p2217"
  ],
  "coordinates": {
    "claim-p2216::p2216-the-following-restrictions-control-the-way-in-which-multiple": {
      "assertionId": "classical-obligatory-object-position-representation:p2216-the-following-restrictions-control-the-way-in-which-multiple",
      "canonicalPath": "objectHistory.twoSpecific.positionCount"
    },
    "claim-p2217::p2217-the-same-rule-that-is-fundamental-to-the-single": {
      "assertionId": "classical-obligatory-object-position-representation:p2217-the-same-rule-that-is-fundamental-to-the-single",
      "canonicalPath": "objectHistory.twoSpecific.positions.1.sounded"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2216": [],
    "claim-p2217": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2216": "authorized",
    "claim-p2217": "authorized"
  }
};
export default Object.freeze(spec);
