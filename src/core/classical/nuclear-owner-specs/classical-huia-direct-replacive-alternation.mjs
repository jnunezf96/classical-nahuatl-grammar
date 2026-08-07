const spec = {
  "ownerId": "classical-huia-direct-replacive-alternation",
  "prefix": "ClassicalHuiaDirectReplaciveAlternation",
  "operationId": "classical.huia.direct.replacive.alternation.execute",
  "inputContract": "complete-typed-classical-huia-direct-replacive-alternation-source",
  "domain": "classical-huia-direct-replacive-alternation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2462",
    "claim-p2463",
    "claim-p2464"
  ],
  "coordinates": {
    "claim-p2462::p2462-at-times-the-huia-is-added-directly-to-the": {
      "assertionId": "classical-huia-direct-replacive-alternation:p2462-at-times-the-huia-is-added-directly-to-the",
      "canonicalPath": "derivations.temo.options.0.targetStem"
    },
    "claim-p2463::p2463-at-other-times-huia-is-added-to-a-replacive": {
      "assertionId": "classical-huia-direct-replacive-alternation:p2463-at-other-times-huia-is-added-to-a-replacive",
      "canonicalPath": "derivations.tlehcō.options.0.targetStem"
    },
    "claim-p2464::p2464-it-is-possible-however-for-an-intransitive-stem-ending": {
      "assertionId": "classical-huia-direct-replacive-alternation:p2464-it-is-possible-however-for-an-intransitive-stem-ending",
      "canonicalPath": "derivations.pano.options.1.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2462": [],
    "claim-p2463": [],
    "claim-p2464": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2462": "authorized",
    "claim-p2463": "authorized",
    "claim-p2464": "authorized"
  }
};
export default Object.freeze(spec);
