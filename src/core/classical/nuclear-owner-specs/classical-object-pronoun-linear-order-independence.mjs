const spec = {
  "ownerId": "classical-object-pronoun-linear-order-independence",
  "prefix": "ClassicalObjectPronounLinearOrderIndependence",
  "operationId": "classical.object.pronoun.linear.order.independence.execute",
  "inputContract": "complete-typed-classical-object-pronoun-linear-order-independence-source",
  "domain": "classical-object-pronoun-linear-order-independence",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2222",
    "claim-p2223"
  ],
  "coordinates": {
    "claim-p2222::p2222-the-sequence-of-verb-object-pronouns-is-governed-by": {
      "assertionId": "classical-object-pronoun-linear-order-independence:p2222-the-sequence-of-verb-object-pronouns-is-governed-by",
      "canonicalPath": "objectHistory.reflexiveNonspecific.linearOrder"
    },
    "claim-p2223::p2223-while-the-rightward-sequence-of-stem-suffixes-rigidly-reflects": {
      "assertionId": "classical-object-pronoun-linear-order-independence:p2223-while-the-rightward-sequence-of-stem-suffixes-rigidly-reflects",
      "canonicalPath": "objectHistory.reflexiveNonspecific.positions.0.derivationalLevel"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2222": [],
    "claim-p2223": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2222": "authorized",
    "claim-p2223": "authorized"
  }
};
export default Object.freeze(spec);
