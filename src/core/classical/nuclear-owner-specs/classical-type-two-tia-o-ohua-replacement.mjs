const spec = {
  "ownerId": "classical-type-two-tia-o-ohua-replacement",
  "prefix": "ClassicalTypeTwoTiaOOhuaReplacement",
  "operationId": "classical.type.two.tia.o.ohua.replacement.execute",
  "inputContract": "complete-typed-classical-type-two-tia-o-ohua-replacement-source",
  "domain": "classical-type-two-tia-o-ohua-replacement",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2433",
    "claim-p2434",
    "claim-p2435"
  ],
  "coordinates": {
    "claim-p2433::p2433-the-tia-replaces-the-o-or-o-hua-of": {
      "assertionId": "classical-type-two-tia-o-ohua-replacement:p2433-the-tia-replaces-the-o-or-o-hua-of",
      "canonicalPath": "derivations.tomi.options.1.typeTwoBridgeSuffixFamily"
    },
    "claim-p2434::p2434-the-formation-is-distinguished-by-the-presence-of-a": {
      "assertionId": "classical-type-two-tia-o-ohua-replacement:p2434-the-formation-is-distinguished-by-the-presence-of-a",
      "canonicalPath": "derivations.tomi.options.1.targetStem"
    },
    "claim-p2435::p2435-if-the-active-source-stem-has-two-consonants-before": {
      "assertionId": "classical-type-two-tia-o-ohua-replacement:p2435-if-the-active-source-stem-has-two-consonants-before",
      "canonicalPath": "derivations.tomi.options.1.derivationRoute"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2433": [],
    "claim-p2434": [],
    "claim-p2435": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2433": "authorized",
    "claim-p2434": "authorized",
    "claim-p2435": "authorized"
  }
};
export default Object.freeze(spec);
