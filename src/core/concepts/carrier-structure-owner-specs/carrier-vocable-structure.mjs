const spec = {
  "ownerId": "carrier-vocable-structure",
  "operationId": "classical.carrier.vocable.compose",
  "prefix": "ClassicalCarrierVocableStructure",
  "domain": "carrier-vocable-structure",
  "inputContract": "typed-carrier-vocable-structure-source",
  "analyses": {
    "syllable-formed-vocable": {
      "classification": "meaningless-vocable-formed-from-syllables",
      "facts": [
        "a-vocable-is-a-meaningless-unit-formed-from-one-or-more-syllables"
      ],
      "relation": "owner-issued-syllables-are-vocable-constituents",
      "checkpoint": "carrier-vocable-syllable-formation-checkpoint",
      "unitConstructed": true
    },
    "word-syllable-perspective": {
      "classification": "word-treated-as-vocable-under-syllable-perspective",
      "facts": [
        "a-word-viewed-only-through-its-syllable-structure-is-treated-as-a-vocable"
      ],
      "relation": "word-meaning-and-spelling-do-not-authorize-vocable-structure",
      "checkpoint": "carrier-vocable-word-perspective-checkpoint",
      "unitConstructed": true
    }
  }
};
export default Object.freeze(spec);
