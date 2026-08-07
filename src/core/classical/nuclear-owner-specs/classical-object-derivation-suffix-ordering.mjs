const spec = {
  "ownerId": "classical-object-derivation-suffix-ordering",
  "prefix": "ClassicalObjectDerivationSuffixOrdering",
  "operationId": "classical.object.derivation.suffix.ordering.execute",
  "inputContract": "complete-typed-classical-object-derivation-suffix-ordering-source",
  "domain": "classical-object-derivation-suffix-ordering",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2220",
    "claim-p2221"
  ],
  "coordinates": {
    "claim-p2220::p2220-the-derived-verbstem-may-be-built-of-only-causative": {
      "assertionId": "classical-object-derivation-suffix-ordering:p2220-the-derived-verbstem-may-be-built-of-only-causative",
      "canonicalPath": "objectHistory.reflexiveNonspecific.positions.1.governor"
    },
    "claim-p2221::p2221-as-a-rule-in-a-combination-causative-suffixes-are": {
      "assertionId": "classical-object-derivation-suffix-ordering:p2221-as-a-rule-in-a-combination-causative-suffixes-are",
      "canonicalPath": "objectHistory.reflexiveNonspecific.positions.0.governor"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2220": [],
    "claim-p2221": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2220": "authorized",
    "claim-p2221": "authorized"
  }
};
export default Object.freeze(spec);
