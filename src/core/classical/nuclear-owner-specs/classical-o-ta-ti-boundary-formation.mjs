const spec = {
  "ownerId": "classical-o-ta-ti-boundary-formation",
  "prefix": "ClassicalOTaTiBoundaryFormation",
  "operationId": "classical.o.ta.ti.boundary.formation.execute",
  "inputContract": "complete-typed-classical-o-ta-ti-boundary-formation-source",
  "domain": "classical-o-ta-ti-boundary-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2038",
    "claim-p2039",
    "claim-p2040"
  ],
  "coordinates": {
    "claim-p2038::p2038-a-transitive-verb-ending-in-ta-may-have-its": {
      "assertionId": "classical-o-ta-ti-boundary-formation:p2038-a-transitive-verb-ending-in-ta-may-have-its",
      "canonicalPath": "nonactive.oTa.options.0.nonactiveStem"
    },
    "claim-p2039::p2039-tla-itt-a-to-see-s-th": {
      "assertionId": "classical-o-ta-ti-boundary-formation:p2039-tla-itt-a-to-see-s-th",
      "canonicalPath": "nonactive.oTi.options.0.nonactiveStem"
    },
    "claim-p2040::p2040-tla-mati-to-knows-th": {
      "assertionId": "classical-o-ta-ti-boundary-formation:p2040-tla-mati-to-knows-th",
      "canonicalPath": "nonactive.oTi.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2038": [],
    "claim-p2039": [],
    "claim-p2040": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2038": "authorized",
    "claim-p2039": "authorized",
    "claim-p2040": "authorized"
  }
};
export default Object.freeze(spec);
