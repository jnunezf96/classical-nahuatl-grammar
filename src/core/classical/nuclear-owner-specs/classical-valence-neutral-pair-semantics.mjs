const spec = {
  "ownerId": "classical-valence-neutral-pair-semantics",
  "prefix": "ClassicalValenceNeutralPairSemantics",
  "operationId": "classical.valence.neutral.pair.semantics.execute",
  "inputContract": "complete-typed-classical-valence-neutral-pair-semantics-source",
  "domain": "classical-valence-neutral-pair-semantics",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-vnc-derivation-runtime",
  "selections": [
    "claim-p2276",
    "claim-p2277",
    "claim-p2278",
    "claim-p2279",
    "claim-p2280",
    "claim-p2281"
  ],
  "coordinates": {
    "claim-p2276::p2276-coincident-with-the-occasional-randomness-of-stem-final-i": {
      "assertionId": "classical-valence-neutral-pair-semantics:p2276-coincident-with-the-occasional-randomness-of-stem-final-i",
      "canonicalPath": "contract.axes.0.distinctionKind"
    },
    "claim-p2277::p2277-this-is-a-violation-of-the-valence-principle-of": {
      "assertionId": "classical-valence-neutral-pair-semantics:p2277-this-is-a-violation-of-the-valence-principle-of",
      "canonicalPath": "contract.axes.0.prerequisite"
    },
    "claim-p2278::p2278-since-the-intransitive-stem-of-one-of-the-valence": {
      "assertionId": "classical-valence-neutral-pair-semantics:p2278-since-the-intransitive-stem-of-one-of-the-valence",
      "canonicalPath": "sources.piya.sourceValence"
    },
    "claim-p2279::p2279-when-the-stem-final-vowel-of-a-valence-neutral": {
      "assertionId": "classical-valence-neutral-pair-semantics:p2279-when-the-stem-final-vowel-of-a-valence-neutral",
      "canonicalPath": "contract.axes.0.distinctionKind"
    },
    "claim-p2280::p2280-when-the-stem-final-vowel-of-a-valence-neutral": {
      "assertionId": "classical-valence-neutral-pair-semantics:p2280-when-the-stem-final-vowel-of-a-valence-neutral",
      "canonicalPath": "contract.axes.0.prerequisite"
    },
    "claim-p2281::p2281-in-a-few-exceptional-instances-however-the-transitive-stem": {
      "assertionId": "classical-valence-neutral-pair-semantics:p2281-in-a-few-exceptional-instances-however-the-transitive-stem",
      "canonicalPath": "sources.piya.sourceValence"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVncDerivationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlVncDerivationValidationFrame",
  "executionArgsBySelection": {
    "claim-p2276": [],
    "claim-p2277": [],
    "claim-p2278": [],
    "claim-p2279": [],
    "claim-p2280": [],
    "claim-p2281": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2276": "authorized",
    "claim-p2277": "authorized",
    "claim-p2278": "authorized",
    "claim-p2279": "authorized",
    "claim-p2280": "authorized",
    "claim-p2281": "authorized"
  }
};
export default Object.freeze(spec);
