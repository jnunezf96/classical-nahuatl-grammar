const spec = {
  "ownerId": "classical-consonant-phone-shift",
  "prefix": "ClassicalConsonantPhoneShift",
  "operationId": "classical.transcription.classical-consonant-phone-shift.analyze",
  "inputContract": "complete-typed-classical-consonant-phone-shift-source",
  "domain": "classical-consonant-phone-shift",
  "mode": "canonical-rule",
  "selections": [
    "cn-l2-213-phone-shift-general",
    "cn-l2-213-glottal-vowel-y",
    "cn-l2-213-m-exposed-n",
    "cn-l2-213-y-exposed-x",
    "cn-l2-213-y-exposed-prior-s",
    "cn-l2-213-kw-exposed-k",
    "cn-l2-213-t-final-h",
    "cn-l2-213-rare-glottal-nonfinal-t"
  ],
  "facets": [
    "addition-consonant-phone-shift-produced-assimilation-regular-consonant-phone",
    "addition-consonant-phone-shift-produced-assimilation-regular-consonant-phone-rul",
    "ʔ-vowel-y-vowel-optional-change-intervocalic-resultant-y",
    "m-n-left-exposed-end-a-syllable-vocable",
    "n-phone-resulting-change-reverts-original-m-sound-following",
    "if-vocable-final-n-a-phone-n-pronounced-environment",
    "y-s-left-exposed-end-a-syllable-vocable",
    "vocable-contains-a-prior-s-sound-y-s-left",
    "occasionally-kw-k-i-e-becomes-delabialized-dropping-labial",
    "occasionally-t-h-t-forced-a-vocable-final-position",
    "extremely-rare-occasions-shift-go-opposite-direction-non-final"
  ],
  "coordinates": {
    "cn-l2-213-phone-shift-general::addition-consonant-phone-shift-produced-assimilation-regular-consonant-phone": {
      "assertionId": "classical-consonant-phone-shift:addition-consonant-phone-shift-produced-assimilation-regular-consonant-phone",
      "canonicalPath": ""
    },
    "cn-l2-213-phone-shift-general::addition-consonant-phone-shift-produced-assimilation-regular-consonant-phone-rul": {
      "assertionId": "classical-consonant-phone-shift:addition-consonant-phone-shift-produced-assimilation-regular-consonant-phone-rul",
      "canonicalPath": ""
    },
    "cn-l2-213-glottal-vowel-y::ʔ-vowel-y-vowel-optional-change-intervocalic-resultant-y": {
      "assertionId": "classical-consonant-phone-shift:ʔ-vowel-y-vowel-optional-change-intervocalic-resultant-y",
      "canonicalPath": ""
    },
    "cn-l2-213-m-exposed-n::m-n-left-exposed-end-a-syllable-vocable": {
      "assertionId": "classical-consonant-phone-shift:m-n-left-exposed-end-a-syllable-vocable",
      "canonicalPath": ""
    },
    "cn-l2-213-m-exposed-n::n-phone-resulting-change-reverts-original-m-sound-following": {
      "assertionId": "classical-consonant-phone-shift:n-phone-resulting-change-reverts-original-m-sound-following",
      "canonicalPath": ""
    },
    "cn-l2-213-m-exposed-n::if-vocable-final-n-a-phone-n-pronounced-environment": {
      "assertionId": "classical-consonant-phone-shift:if-vocable-final-n-a-phone-n-pronounced-environment",
      "canonicalPath": ""
    },
    "cn-l2-213-y-exposed-x::y-s-left-exposed-end-a-syllable-vocable": {
      "assertionId": "classical-consonant-phone-shift:y-s-left-exposed-end-a-syllable-vocable",
      "canonicalPath": ""
    },
    "cn-l2-213-y-exposed-prior-s::vocable-contains-a-prior-s-sound-y-s-left": {
      "assertionId": "classical-consonant-phone-shift:vocable-contains-a-prior-s-sound-y-s-left",
      "canonicalPath": ""
    },
    "cn-l2-213-kw-exposed-k::occasionally-kw-k-i-e-becomes-delabialized-dropping-labial": {
      "assertionId": "classical-consonant-phone-shift:occasionally-kw-k-i-e-becomes-delabialized-dropping-labial",
      "canonicalPath": ""
    },
    "cn-l2-213-t-final-h::occasionally-t-h-t-forced-a-vocable-final-position": {
      "assertionId": "classical-consonant-phone-shift:occasionally-t-h-t-forced-a-vocable-final-position",
      "canonicalPath": ""
    },
    "cn-l2-213-rare-glottal-nonfinal-t::extremely-rare-occasions-shift-go-opposite-direction-non-final": {
      "assertionId": "classical-consonant-phone-shift:extremely-rare-occasions-shift-go-opposite-direction-non-final",
      "canonicalPath": ""
    }
  },
  "ruleGetterName": "getClassicalNahuatlConsonantPhoneShiftRules",
  "executionFunctionName": "buildClassicalNahuatlConsonantPhoneShiftFrame",
  "executionValidatorName": "isClassicalNahuatlTranscriptionAnalysisFrame",
  "executionArgsBySelection": {
    "cn-l2-213-phone-shift-general": [
      {
        "sourceConsonant": "m",
        "position": "exposed",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-213-glottal-vowel-y": [
      {
        "sourceConsonant": "glottal",
        "followingVowel": "a",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-213-m-exposed-n": [
      {
        "sourceConsonant": "m",
        "position": "exposed",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-213-y-exposed-x": [
      {
        "sourceConsonant": "y",
        "position": "exposed",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-213-y-exposed-prior-s": [
      {
        "sourceConsonant": "y",
        "position": "exposed",
        "priorSSound": true,
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-213-kw-exposed-k": [
      {
        "sourceConsonant": "kw",
        "position": "exposed",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-213-t-final-h": [
      {
        "sourceConsonant": "t",
        "position": "exposed",
        "grammaticalConstruction": true
      }
    ],
    "cn-l2-213-rare-glottal-nonfinal-t": [
      {
        "sourceConsonant": "glottal",
        "position": "nonfinal",
        "grammaticalConstruction": true
      }
    ]
  },
  "requireSelectedRuleMatch": true
};
export default Object.freeze(spec);
