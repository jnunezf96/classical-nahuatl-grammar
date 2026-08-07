const spec = {
  "ownerId": "classical-ohua-alternative-licensing",
  "prefix": "ClassicalOhuaAlternativeLicensing",
  "operationId": "classical.ohua.alternative.licensing.execute",
  "inputContract": "complete-typed-classical-ohua-alternative-licensing-source",
  "domain": "classical-ohua-alternative-licensing",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2070",
    "claim-p2071"
  ],
  "coordinates": {
    "claim-p2070::p2070-occasionally-an-active-intransitive-stem-ending-in-ni-may": {
      "assertionId": "classical-ohua-alternative-licensing:p2070-occasionally-an-active-intransitive-stem-ending-in-ni-may",
      "canonicalPath": "nonactive.ohuaAlternative.selectorRequired"
    },
    "claim-p2071::p2071-occasionally-a-transitive-verbstem-serves-as-the-source-for": {
      "assertionId": "classical-ohua-alternative-licensing:p2071-occasionally-a-transitive-verbstem-serves-as-the-source-for",
      "canonicalPath": "nonactive.ohuaAlternative.alternativeSelectionPolicy"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2070": [],
    "claim-p2071": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2070": "authorized",
    "claim-p2071": "authorized"
  }
};
export default Object.freeze(spec);
