const spec = {
  "ownerId": "classical-contextual-consonant-spelling",
  "prefix": "ClassicalContextualConsonantSpelling",
  "operationId": "classical.transcription.classical-contextual-consonant-spelling.analyze",
  "inputContract": "complete-typed-classical-contextual-consonant-spelling-source",
  "domain": "classical-contextual-consonant-spelling",
  "mode": "canonical-rule",
  "selections": [
    "cn-l2-24-k-final",
    "cn-l2-24-kw-final"
  ],
  "facets": [
    "imposition-peculiarities-spanish-spelling-conventions-see-appendix-f-consonants",
    "imposition-peculiarities-spanish-spelling-conventions-see-appendix-f",
    "difference-spelling-nothing-pronunciation-k-ca-co-que-qui",
    "depends-whether-sounds-syllable-final-not-w-hua-hue"
  ],
  "coordinates": {
    "cn-l2-24-k-final::imposition-peculiarities-spanish-spelling-conventions-see-appendix-f-consonants": {
      "assertionId": "classical-contextual-consonant-spelling:imposition-peculiarities-spanish-spelling-conventions-see-appendix-f-consonants",
      "canonicalPath": ""
    },
    "cn-l2-24-k-final::imposition-peculiarities-spanish-spelling-conventions-see-appendix-f": {
      "assertionId": "classical-contextual-consonant-spelling:imposition-peculiarities-spanish-spelling-conventions-see-appendix-f",
      "canonicalPath": ""
    },
    "cn-l2-24-k-final::difference-spelling-nothing-pronunciation-k-ca-co-que-qui": {
      "assertionId": "classical-contextual-consonant-spelling:difference-spelling-nothing-pronunciation-k-ca-co-que-qui",
      "canonicalPath": ""
    },
    "cn-l2-24-kw-final::depends-whether-sounds-syllable-final-not-w-hua-hue": {
      "assertionId": "classical-contextual-consonant-spelling:depends-whether-sounds-syllable-final-not-w-hua-hue",
      "canonicalPath": ""
    }
  },
  "ruleGetterName": "getClassicalNahuatlSpellingChangeRules",
  "executionFunctionName": "buildClassicalNahuatlSpellingChangeFrame",
  "executionValidatorName": "isClassicalNahuatlTranscriptionAnalysisFrame",
  "executionArgsBySelection": {
    "cn-l2-24-k-final": [
      {
        "phoneme": "/k/",
        "syllablePosition": "final",
        "followingVowel": "",
        "precedingVowel": "a"
      }
    ],
    "cn-l2-24-kw-final": [
      {
        "phoneme": "[kʷ]",
        "syllablePosition": "final",
        "followingVowel": "",
        "precedingVowel": "a"
      }
    ]
  },
  "requireSelectedRuleMatch": true
};
export default Object.freeze(spec);
