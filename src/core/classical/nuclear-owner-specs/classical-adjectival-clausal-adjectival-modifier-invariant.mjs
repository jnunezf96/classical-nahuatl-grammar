const spec = {
  "ownerId": "classical-adjectival-clausal-adjectival-modifier-invariant",
  "prefix": "ClassicalAdjectivalClausalAdjectivalModifierInvariant",
  "operationId": "classical.adjectival.clausal.adjectival.modifier.invariant.execute",
  "inputContract": "complete-typed-classical-adjectival-clausal-adjectival-modifier-invariant-source",
  "domain": "classical-adjectival-clausal-adjectival-modifier-invariant",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4014",
    "claim-p4015"
  ],
  "coordinates": {
    "claim-p4014::p4014-in-nahuatl-except-for-those-embedded-in-compound-nounstems": {
      "assertionId": "classical-adjectival-clausal-adjectival-modifier-invariant:p4014-in-nahuatl-except-for-those-embedded-in-compound-nounstems",
      "canonicalPath": "cases.ordinary.canonicalResult"
    },
    "claim-p4015::p4015-the-language-has-no-modifier-word-plus-head-word": {
      "assertionId": "classical-adjectival-clausal-adjectival-modifier-invariant:p4015-the-language-has-no-modifier-word-plus-head-word",
      "canonicalPath": "cases.ordinary.operationKind"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4014": [],
    "claim-p4015": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4014": "authorized",
    "claim-p4015": "authorized"
  }
};
export default Object.freeze(spec);
