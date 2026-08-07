const spec = {
  "ownerId": "classical-specific-object-incompatibility-silencing",
  "prefix": "ClassicalSpecificObjectIncompatibilitySilencing",
  "operationId": "classical.specific.object.incompatibility.silencing.execute",
  "inputContract": "complete-typed-classical-specific-object-incompatibility-silencing-source",
  "domain": "classical-specific-object-incompatibility-silencing",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2224",
    "claim-p2225"
  ],
  "coordinates": {
    "claim-p2224::p2224-specific-projective-object-pronouns-are-incompatible-with-one-another": {
      "assertionId": "classical-specific-object-incompatibility-silencing:p2224-specific-projective-object-pronouns-are-incompatible-with-one-another",
      "canonicalPath": "objectHistory.twoSpecific.positions.1.sounded"
    },
    "claim-p2225::p2225-it-should-be-remembered-that-unsounded-morphs-are-as": {
      "assertionId": "classical-specific-object-incompatibility-silencing:p2225-it-should-be-remembered-that-unsounded-morphs-are-as",
      "canonicalPath": "objectHistory.twoSpecific.positions.1.silencingRule"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2224": [],
    "claim-p2225": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2224": "authorized",
    "claim-p2225": "authorized"
  }
};
export default Object.freeze(spec);
