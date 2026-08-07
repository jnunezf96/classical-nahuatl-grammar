const spec = {
  "ownerId": "classical-syllable-structure",
  "operationId": "classical.carrier.syllable.compose",
  "prefix": "ClassicalSyllableStructure",
  "domain": "classical-syllable-structure",
  "inputContract": "typed-classical-syllable-structure-source",
  "analyses": {
    "vowel-center": {
      "classification": "vowel-centered-classical-syllable",
      "facts": [
        "a-Classical-Nahuatl-syllable-has-a-vowel-phoneme-or-phone-at-its-center"
      ],
      "relation": "vowel-center-is-distinct-from-optional-margins",
      "checkpoint": "classical-syllable-vowel-center-checkpoint",
      "unitConstructed": true
    },
    "consonant-margins": {
      "classification": "consonant-fore-and-aft-margins",
      "facts": [
        "consonant-phonemes-or-phones-can-appear-in-fore-and-aft-margins"
      ],
      "relation": "consonant-margins-surround-but-do-not-replace-the-vowel-center",
      "checkpoint": "classical-syllable-consonant-margins-checkpoint",
      "unitConstructed": true
    },
    "language-specific-structure": {
      "classification": "Classical-Nahuatl-specific-syllable-structure",
      "facts": [
        "syllable-structure-rules-are-language-specific"
      ],
      "relation": "English-syllabic-consonants-do-not-authorize-a-Classical-center",
      "checkpoint": "classical-syllable-language-specificity-checkpoint",
      "unitConstructed": true
    },
    "meaningless-unit": {
      "classification": "meaningless-syllable-unit",
      "facts": [
        "syllables-belong-to-the-meaningless-carrier-hierarchy"
      ],
      "relation": "syllable-formation-does-not-create-a-sememe-or-meaning",
      "checkpoint": "classical-syllable-meaningless-unit-checkpoint",
      "unitConstructed": true
    }
  }
};
export default Object.freeze(spec);
