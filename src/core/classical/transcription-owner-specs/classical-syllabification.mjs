const spec = {
  "ownerId": "classical-syllabification",
  "prefix": "ClassicalSyllabification",
  "operationId": "classical.transcription.classical-syllabification.analyze",
  "inputContract": "complete-typed-classical-syllabification-source",
  "domain": "classical-syllabification",
  "mode": "canonical-rule",
  "selections": [
    "cn-l2-26-vowel-count-no-diphthongs",
    "cn-l2-26-four-syllable-shapes",
    "cn-l2-26-intervocalic-consonant-onset",
    "cn-l2-26-vowel-sequence-separated",
    "cn-l2-26-u-is-digraph-only",
    "cn-l2-26-two-consonant-cluster-split",
    "cn-l2-26-digraphs-single-consonant"
  ],
  "facets": [
    "a-vocable-nahuatl-many-syllables-vowels-there-no-diphthongs",
    "a-syllable-four-shapes-display-below-a-b-open",
    "vowel-e-g-a-e-o",
    "consonant-vowel-e-g-no-chi-tla",
    "vowel-consonant-e-g-oh-euc-a-tl-ic",
    "consonant-vowel-consonant-e-g-pan-za-tl-cuech",
    "any-consonant-sound-between-two-vowels-forms-a-syllable",
    "any-two-vowels-sequence-belong-separate-syllables-e-g",
    "special-care-should-taken-symbol-u-lessons-never-a",
    "no-more-than-two-consonant-sounds-juxtaposed-such-a",
    "two-juxtaposed-consonants-always-members-separate-syllables-e-g",
    "care-should-taken-digraphs-since-represent-a-single-consonant"
  ],
  "coordinates": {
    "cn-l2-26-vowel-count-no-diphthongs::a-vocable-nahuatl-many-syllables-vowels-there-no-diphthongs": {
      "assertionId": "classical-syllabification:a-vocable-nahuatl-many-syllables-vowels-there-no-diphthongs",
      "canonicalPath": ""
    },
    "cn-l2-26-four-syllable-shapes::a-syllable-four-shapes-display-below-a-b-open": {
      "assertionId": "classical-syllabification:a-syllable-four-shapes-display-below-a-b-open",
      "canonicalPath": ""
    },
    "cn-l2-26-four-syllable-shapes::vowel-e-g-a-e-o": {
      "assertionId": "classical-syllabification:vowel-e-g-a-e-o",
      "canonicalPath": ""
    },
    "cn-l2-26-four-syllable-shapes::consonant-vowel-e-g-no-chi-tla": {
      "assertionId": "classical-syllabification:consonant-vowel-e-g-no-chi-tla",
      "canonicalPath": ""
    },
    "cn-l2-26-four-syllable-shapes::vowel-consonant-e-g-oh-euc-a-tl-ic": {
      "assertionId": "classical-syllabification:vowel-consonant-e-g-oh-euc-a-tl-ic",
      "canonicalPath": ""
    },
    "cn-l2-26-four-syllable-shapes::consonant-vowel-consonant-e-g-pan-za-tl-cuech": {
      "assertionId": "classical-syllabification:consonant-vowel-consonant-e-g-pan-za-tl-cuech",
      "canonicalPath": ""
    },
    "cn-l2-26-intervocalic-consonant-onset::any-consonant-sound-between-two-vowels-forms-a-syllable": {
      "assertionId": "classical-syllabification:any-consonant-sound-between-two-vowels-forms-a-syllable",
      "canonicalPath": ""
    },
    "cn-l2-26-vowel-sequence-separated::any-two-vowels-sequence-belong-separate-syllables-e-g": {
      "assertionId": "classical-syllabification:any-two-vowels-sequence-belong-separate-syllables-e-g",
      "canonicalPath": ""
    },
    "cn-l2-26-u-is-digraph-only::special-care-should-taken-symbol-u-lessons-never-a": {
      "assertionId": "classical-syllabification:special-care-should-taken-symbol-u-lessons-never-a",
      "canonicalPath": ""
    },
    "cn-l2-26-two-consonant-cluster-split::no-more-than-two-consonant-sounds-juxtaposed-such-a": {
      "assertionId": "classical-syllabification:no-more-than-two-consonant-sounds-juxtaposed-such-a",
      "canonicalPath": ""
    },
    "cn-l2-26-two-consonant-cluster-split::two-juxtaposed-consonants-always-members-separate-syllables-e-g": {
      "assertionId": "classical-syllabification:two-juxtaposed-consonants-always-members-separate-syllables-e-g",
      "canonicalPath": ""
    },
    "cn-l2-26-digraphs-single-consonant::care-should-taken-digraphs-since-represent-a-single-consonant": {
      "assertionId": "classical-syllabification:care-should-taken-digraphs-since-represent-a-single-consonant",
      "canonicalPath": ""
    }
  },
  "ruleGetterName": "getClassicalNahuatlSyllableStructureRules",
  "executionFunctionName": "buildClassicalNahuatlSyllableStructureFrame",
  "executionValidatorName": "isClassicalNahuatlTranscriptionAnalysisFrame",
  "executionArgsBySelection": {
    "cn-l2-26-vowel-count-no-diphthongs": [
      "calli",
      {}
    ],
    "cn-l2-26-four-syllable-shapes": [
      "calli",
      {}
    ],
    "cn-l2-26-intervocalic-consonant-onset": [
      "cana",
      {}
    ],
    "cn-l2-26-vowel-sequence-separated": [
      "teotl",
      {}
    ],
    "cn-l2-26-u-is-digraph-only": [
      "quitzacuia",
      {}
    ],
    "cn-l2-26-two-consonant-cluster-split": [
      "calli",
      {}
    ],
    "cn-l2-26-digraphs-single-consonant": [
      "tochtli",
      {}
    ]
  },
  "requireSelectedRuleMatch": true
};
export default Object.freeze(spec);
