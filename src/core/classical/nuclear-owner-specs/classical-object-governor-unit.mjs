const spec = {
  "ownerId": "classical-object-governor-unit",
  "prefix": "ClassicalObjectGovernorUnit",
  "operationId": "classical.object.governor.unit.execute",
  "inputContract": "complete-typed-classical-object-governor-unit-source",
  "domain": "classical-object-governor-unit",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2190",
    "claim-p2191",
    "claim-p2192"
  ],
  "coordinates": {
    "claim-p2190::p2190-while-a-direct-object-inherently-belongs-to-a-directive": {
      "assertionId": "classical-object-governor-unit:p2190-while-a-direct-object-inherently-belongs-to-a-directive",
      "canonicalPath": "objectHistory.specificHuman.positions.1.governorUnit.discontinuousUnit"
    },
    "claim-p2191::p2191-this-means-that-a-causative-or-applicative-object-cannot": {
      "assertionId": "classical-object-governor-unit:p2191-this-means-that-a-causative-or-applicative-object-cannot",
      "canonicalPath": "objectHistory.specificHuman.positions.1.governorUnit.requiredStemOperation"
    },
    "claim-p2192::p2192-they-are-a-constant-source-of-misunderstanding": {
      "assertionId": "classical-object-governor-unit:p2192-they-are-a-constant-source-of-misunderstanding",
      "canonicalPath": "objectHistory.specificHuman.positions.1.governorUnit.callerSuppliedGovernorAllowed"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2190": [],
    "claim-p2191": [],
    "claim-p2192": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2190": "authorized",
    "claim-p2191": "authorized",
    "claim-p2192": "authorized"
  }
};
export default Object.freeze(spec);
