const spec = {
  "ownerId": "classical-reflexive-mainline-restriction",
  "prefix": "ClassicalReflexiveMainlineRestriction",
  "operationId": "classical.reflexive.mainline.restriction.execute",
  "inputContract": "complete-typed-classical-reflexive-mainline-restriction-source",
  "domain": "classical-reflexive-mainline-restriction",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2218",
    "claim-p2219"
  ],
  "coordinates": {
    "claim-p2218::p2218-except-for-rare-anomalous-circumstances-see-25-11-1": {
      "assertionId": "classical-reflexive-mainline-restriction:p2218-except-for-rare-anomalous-circumstances-see-25-11-1",
      "canonicalPath": "objectHistory.reflexiveNonspecific.positions.0.objectKind"
    },
    "claim-p2219::p2219-only-one-reflexive-object-pronoun-can-have-a-mainline": {
      "assertionId": "classical-reflexive-mainline-restriction:p2219-only-one-reflexive-object-pronoun-can-have-a-mainline",
      "canonicalPath": "objectHistory.reflexiveNonspecific.positions.0.prominence"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2218": [],
    "claim-p2219": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2218": "authorized",
    "claim-p2219": "authorized"
  }
};
export default Object.freeze(spec);
