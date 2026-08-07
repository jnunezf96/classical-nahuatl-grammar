const spec = {
  "ownerId": "classical-consonant-loss",
  "prefix": "ClassicalConsonantLoss",
  "operationId": "classical.transcription.classical-consonant-loss.analyze",
  "inputContract": "complete-typed-classical-consonant-loss-source",
  "domain": "classical-consonant-loss",
  "mode": "canonical-rule",
  "selections": [
    "cn-l2-212-loss-general",
    "cn-l2-212-tz-w-tz",
    "cn-l2-212-ch-w-ch",
    "cn-l2-212-glottal-y-h",
    "cn-l2-212-glottal-y-y",
    "cn-l2-212-initial-y-unstable-note",
    "cn-l2-212-y-between-long-a-o-vowels",
    "cn-l2-212-nasal-y-y",
    "cn-l2-212-nasal-w-w",
    "cn-l2-212-w-w-w"
  ],
  "facets": [
    "consonant-sequences-consonants-becomes-imperceptible",
    "a-subvariety-assimilation-lost-consonant-either-first-second",
    "¢-w-¢-optional-rule",
    "c-w-c-optional-rule",
    "ʔ-y-h-optional-rule",
    "there-another-rule-produces-opposite-i-e-first-consonant",
    "yy-y-concerning-ʔ-y-see-2-13-1",
    "note-a-stem-initial-y-sometimes-omitted-no-apparent",
    "sometimes-added-no-apparent-reason-e-yi-ye-yi",
    "also-times-a-y-between-two-long-vowels-a",
    "nasal-y-y-nasal-voiceless-syllable-final-position-seems",
    "nasal-w-w-rule-4-unpronounced-nasal-tends-leave",
    "m-before-w-if-represented-writing-spelled-letter-n",
    "w-w-w-first-w-voiceless-lost"
  ],
  "coordinates": {
    "cn-l2-212-loss-general::consonant-sequences-consonants-becomes-imperceptible": {
      "assertionId": "classical-consonant-loss:consonant-sequences-consonants-becomes-imperceptible",
      "canonicalPath": ""
    },
    "cn-l2-212-loss-general::a-subvariety-assimilation-lost-consonant-either-first-second": {
      "assertionId": "classical-consonant-loss:a-subvariety-assimilation-lost-consonant-either-first-second",
      "canonicalPath": ""
    },
    "cn-l2-212-tz-w-tz::¢-w-¢-optional-rule": {
      "assertionId": "classical-consonant-loss:¢-w-¢-optional-rule",
      "canonicalPath": ""
    },
    "cn-l2-212-ch-w-ch::c-w-c-optional-rule": {
      "assertionId": "classical-consonant-loss:c-w-c-optional-rule",
      "canonicalPath": ""
    },
    "cn-l2-212-glottal-y-h::ʔ-y-h-optional-rule": {
      "assertionId": "classical-consonant-loss:ʔ-y-h-optional-rule",
      "canonicalPath": ""
    },
    "cn-l2-212-glottal-y-y::there-another-rule-produces-opposite-i-e-first-consonant": {
      "assertionId": "classical-consonant-loss:there-another-rule-produces-opposite-i-e-first-consonant",
      "canonicalPath": ""
    },
    "cn-l2-212-glottal-y-y::yy-y-concerning-ʔ-y-see-2-13-1": {
      "assertionId": "classical-consonant-loss:yy-y-concerning-ʔ-y-see-2-13-1",
      "canonicalPath": ""
    },
    "cn-l2-212-initial-y-unstable-note::note-a-stem-initial-y-sometimes-omitted-no-apparent": {
      "assertionId": "classical-consonant-loss:note-a-stem-initial-y-sometimes-omitted-no-apparent",
      "canonicalPath": ""
    },
    "cn-l2-212-initial-y-unstable-note::sometimes-added-no-apparent-reason-e-yi-ye-yi": {
      "assertionId": "classical-consonant-loss:sometimes-added-no-apparent-reason-e-yi-ye-yi",
      "canonicalPath": ""
    },
    "cn-l2-212-y-between-long-a-o-vowels::also-times-a-y-between-two-long-vowels-a": {
      "assertionId": "classical-consonant-loss:also-times-a-y-between-two-long-vowels-a",
      "canonicalPath": ""
    },
    "cn-l2-212-nasal-y-y::nasal-y-y-nasal-voiceless-syllable-final-position-seems": {
      "assertionId": "classical-consonant-loss:nasal-y-y-nasal-voiceless-syllable-final-position-seems",
      "canonicalPath": ""
    },
    "cn-l2-212-nasal-w-w::nasal-w-w-rule-4-unpronounced-nasal-tends-leave": {
      "assertionId": "classical-consonant-loss:nasal-w-w-rule-4-unpronounced-nasal-tends-leave",
      "canonicalPath": ""
    },
    "cn-l2-212-nasal-w-w::m-before-w-if-represented-writing-spelled-letter-n": {
      "assertionId": "classical-consonant-loss:m-before-w-if-represented-writing-spelled-letter-n",
      "canonicalPath": ""
    },
    "cn-l2-212-w-w-w::w-w-w-first-w-voiceless-lost": {
      "assertionId": "classical-consonant-loss:w-w-w-first-w-voiceless-lost",
      "canonicalPath": ""
    }
  },
  "ruleGetterName": "getClassicalNahuatlConsonantLossRules",
  "executionFunctionName": "buildClassicalNahuatlConsonantLossFrame",
  "executionValidatorName": "isClassicalNahuatlTranscriptionAnalysisFrame",
  "executionArgsBySelection": {
    "cn-l2-212-loss-general": [
      {
        "leftConsonant": "tz",
        "rightConsonant": "w",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-212-tz-w-tz": [
      {
        "leftConsonant": "tz",
        "rightConsonant": "w",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-212-ch-w-ch": [
      {
        "leftConsonant": "ch",
        "rightConsonant": "w",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-212-glottal-y-h": [
      {
        "leftConsonant": "glottal",
        "rightConsonant": "y",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-212-glottal-y-y": [
      {
        "leftConsonant": "glottal",
        "rightConsonant": "y",
        "firstConsonantLost": true,
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-212-initial-y-unstable-note": [
      {
        "leftConsonant": "y",
        "rightConsonant": "h",
        "position": "initial",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-212-y-between-long-a-o-vowels": [
      {
        "leftConsonant": "y",
        "rightConsonant": "h",
        "environment": "between-long-a-o-vowels",
        "leftVowel": "ā",
        "rightVowel": "ō",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-212-nasal-y-y": [
      {
        "leftConsonant": "n",
        "rightConsonant": "y",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-212-nasal-w-w": [
      {
        "leftConsonant": "n",
        "rightConsonant": "w",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-212-w-w-w": [
      {
        "leftConsonant": "w",
        "rightConsonant": "w",
        "grammaticalConstruction": true
      }
    ]
  },
  "requireSelectedRuleMatch": true
};
export default Object.freeze(spec);
