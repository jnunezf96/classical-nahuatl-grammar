const spec = {
  "ownerId": "carrier-phonotactic-surface-constraints",
  "operationId": "classical.carrier.phonotactic.constraints.validate",
  "prefix": "ClassicalCarrierPhonotacticSurfaceConstraints",
  "domain": "carrier-phonotactic-surface-constraints",
  "inputContract": "typed-carrier-phonotactic-constraint-source",
  "analyses": {
    "language-specific-vocable-rules": {
      "classification": "language-specific-phonotactic-vocable-constraints",
      "facts": [
        "phonotactic-rules-determine-possible-sequences-and-token-contact-changes"
      ],
      "relation": "constraint-validation-consumes-actual-syllable-or-vocable-structure",
      "checkpoint": "carrier-phonotactic-language-rules-checkpoint",
      "unitConstructed": false
    },
    "meaningful-surface-conformance": {
      "classification": "meaningful-combinations-eventually-conform-to-carrier-surface-constraints",
      "facts": [
        "syllables-and-vocables-establish-instance-level-phonological-surface-constraints"
      ],
      "relation": "surface-conformance-is-a-downstream-restriction-not-a-stored-surface",
      "checkpoint": "carrier-phonotactic-surface-conformance-checkpoint",
      "unitConstructed": false
    }
  }
};
export default Object.freeze(spec);
