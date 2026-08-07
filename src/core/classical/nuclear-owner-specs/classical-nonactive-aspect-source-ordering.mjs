const spec = {
  "ownerId": "classical-nonactive-aspect-source-ordering",
  "prefix": "ClassicalNonactiveAspectSourceOrdering",
  "operationId": "classical.nonactive.aspect.source.ordering.execute",
  "inputContract": "complete-typed-classical-nonactive-aspect-source-ordering-source",
  "domain": "classical-nonactive-aspect-source-ordering",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p1975",
    "claim-p1976"
  ],
  "coordinates": {
    "claim-p1975::p1975-the-base-to-which-these-nonactive-suffixes-are-attached": {
      "assertionId": "classical-nonactive-aspect-source-ordering:p1975-the-base-to-which-these-nonactive-suffixes-are-attached",
      "canonicalPath": "nonactive.records.lo.sourceIsImperfectiveActiveStem"
    },
    "claim-p1976::p1976-as-with-the-perfective-active-stem-the-perfective-nonactive": {
      "assertionId": "classical-nonactive-aspect-source-ordering:p1976-as-with-the-perfective-active-stem-the-perfective-nonactive",
      "canonicalPath": "contract.gcd.operationOrder.1"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p1975": [],
    "claim-p1976": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1975": "authorized",
    "claim-p1976": "authorized"
  }
};
export default Object.freeze(spec);
