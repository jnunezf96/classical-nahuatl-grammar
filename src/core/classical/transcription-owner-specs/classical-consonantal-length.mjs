const spec = {
  "ownerId": "classical-consonantal-length",
  "prefix": "ClassicalConsonantalLength",
  "operationId": "classical.transcription.classical-consonantal-length.analyze",
  "inputContract": "complete-typed-classical-consonantal-length-source",
  "domain": "classical-consonantal-length",
  "mode": "canonical-rule",
  "selections": [
    "cn-l2-28-identical-consonants-create-long-consonant",
    "cn-l2-28-single-bridging-pronunciation",
    "cn-l2-28-affricate-release-feature-loss",
    "cn-l2-28-within-vocable-double-spelling"
  ],
  "facets": [
    "two-identical-consonants-come-together-a-grammatical-construction-create",
    "occur-either-between-vocables-within-a-vocable",
    "length-a-long-consonant-not-exaggerated-however",
    "often-amounts-nothing-more-than-a-slightly-more-energetic",
    "case-¢¢-c-c-release-feature-first-consonant-lost",
    "case-¢¢-c-c-release-feature-first-consonant-lost-rul",
    "usually-spelled-a-double-letter-a-double-digraph",
    "a-long-consonant-occurs-within-a-vocable-usually-spelled",
    "rapid-speech-most-long-consonants-tend-synthesized-short-ones"
  ],
  "coordinates": {
    "cn-l2-28-identical-consonants-create-long-consonant::two-identical-consonants-come-together-a-grammatical-construction-create": {
      "assertionId": "classical-consonantal-length:two-identical-consonants-come-together-a-grammatical-construction-create",
      "canonicalPath": ""
    },
    "cn-l2-28-identical-consonants-create-long-consonant::occur-either-between-vocables-within-a-vocable": {
      "assertionId": "classical-consonantal-length:occur-either-between-vocables-within-a-vocable",
      "canonicalPath": ""
    },
    "cn-l2-28-single-bridging-pronunciation::length-a-long-consonant-not-exaggerated-however": {
      "assertionId": "classical-consonantal-length:length-a-long-consonant-not-exaggerated-however",
      "canonicalPath": ""
    },
    "cn-l2-28-single-bridging-pronunciation::often-amounts-nothing-more-than-a-slightly-more-energetic": {
      "assertionId": "classical-consonantal-length:often-amounts-nothing-more-than-a-slightly-more-energetic",
      "canonicalPath": ""
    },
    "cn-l2-28-affricate-release-feature-loss::case-¢¢-c-c-release-feature-first-consonant-lost": {
      "assertionId": "classical-consonantal-length:case-¢¢-c-c-release-feature-first-consonant-lost",
      "canonicalPath": ""
    },
    "cn-l2-28-affricate-release-feature-loss::case-¢¢-c-c-release-feature-first-consonant-lost-rul": {
      "assertionId": "classical-consonantal-length:case-¢¢-c-c-release-feature-first-consonant-lost-rul",
      "canonicalPath": ""
    },
    "cn-l2-28-within-vocable-double-spelling::usually-spelled-a-double-letter-a-double-digraph": {
      "assertionId": "classical-consonantal-length:usually-spelled-a-double-letter-a-double-digraph",
      "canonicalPath": ""
    },
    "cn-l2-28-within-vocable-double-spelling::a-long-consonant-occurs-within-a-vocable-usually-spelled": {
      "assertionId": "classical-consonantal-length:a-long-consonant-occurs-within-a-vocable-usually-spelled",
      "canonicalPath": ""
    },
    "cn-l2-28-within-vocable-double-spelling::rapid-speech-most-long-consonants-tend-synthesized-short-ones": {
      "assertionId": "classical-consonantal-length:rapid-speech-most-long-consonants-tend-synthesized-short-ones",
      "canonicalPath": ""
    }
  },
  "ruleGetterName": "getClassicalNahuatlConsonantalLengthRules",
  "executionFunctionName": "buildClassicalNahuatlConsonantalLengthFrame",
  "executionValidatorName": "isClassicalNahuatlTranscriptionAnalysisFrame",
  "executionArgsBySelection": {
    "cn-l2-28-identical-consonants-create-long-consonant": [
      {
        "leftConsonant": "l",
        "rightConsonant": "l",
        "boundaryType": "within-vocable",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-28-single-bridging-pronunciation": [
      {
        "leftConsonant": "l",
        "rightConsonant": "l",
        "boundaryType": "within-vocable",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-28-affricate-release-feature-loss": [
      {
        "leftConsonant": "tz",
        "rightConsonant": "tz",
        "boundaryType": "within-vocable",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-28-within-vocable-double-spelling": [
      {
        "leftConsonant": "l",
        "rightConsonant": "l",
        "boundaryType": "within-vocable",
        "grammaticalConstruction": true
      }
    ]
  },
  "requireSelectedRuleMatch": true
};
export default Object.freeze(spec);
