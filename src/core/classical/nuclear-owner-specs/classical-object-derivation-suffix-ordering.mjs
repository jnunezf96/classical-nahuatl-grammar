const spec = {
  "ownerId": "classical-object-derivation-suffix-ordering",
  "prefix": "ClassicalObjectDerivationSuffixOrdering",
  "operationId": "classical.object.derivation.suffix.ordering.execute",
  "inputContract": "complete-typed-classical-object-derivation-suffix-ordering-source",
  "domain": "classical-object-derivation-suffix-ordering",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2220"
  ],
  "coordinates": {
    "claim-p2220::p2220-the-derived-verbstem-may-be-built-of-only-causative": {
      "assertionId": "classical-object-derivation-suffix-ordering:p2220-the-derived-verbstem-may-be-built-of-only-causative",
      "canonicalPath": "objectHistory.reflexiveNonspecific.positions.1.governor"
    }
  },
  "nonExecutableObservations": {
    "claim-p2221::p2221-as-a-rule-in-a-combination-causative-suffixes-are": {
      "assertionId": "classical-object-derivation-suffix-ordering:p2221-as-a-rule-in-a-combination-causative-suffixes-are",
      "disposition": "documentary-claim-runtime-observation-unverified",
      "reason": "Canvas7554 describes the ordinary order of causative and applicative suffixes, allowing occasional exceptions. The fixture's object-governor positions describe requested derivational history, not an observed suffix sequence; changing directive index 0 to causative index 1 would still not prove this claim.",
      "retiredCanonicalPath": "objectHistory.reflexiveNonspecific.positions.0.governor",
      "executionCredit": false,
      "grammarAuthority": false
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2220": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2220": "authorized"
  }
};
export default Object.freeze(spec);
