const spec = {
  "ownerId": "classical-tla-impersonal-animate-generality",
  "prefix": "ClassicalTlaImpersonalAnimateGenerality",
  "operationId": "classical.tla.impersonal.animate.generality.execute",
  "inputContract": "complete-typed-classical-tla-impersonal-animate-generality-source",
  "domain": "classical-tla-impersonal-animate-generality",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2174",
    "claim-p2175"
  ],
  "coordinates": {
    "claim-p2174::p2174-in-an-extremely-limited-number-of-instances-the-impersonal": {
      "assertionId": "classical-tla-impersonal-animate-generality:p2174-in-an-extremely-limited-number-of-instances-the-impersonal",
      "canonicalPath": "impersonal.tlaInventory.15.semanticClass"
    },
    "claim-p2175::p2175-the-impersonal-subject-of-a-vnc-built-on-such": {
      "assertionId": "classical-tla-impersonal-animate-generality:p2175-the-impersonal-subject-of-a-vnc-built-on-such",
      "canonicalPath": "impersonal.tlaInventory.16.semanticClass"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2174": [],
    "claim-p2175": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2174": "authorized",
    "claim-p2175": "authorized"
  }
};
export default Object.freeze(spec);
