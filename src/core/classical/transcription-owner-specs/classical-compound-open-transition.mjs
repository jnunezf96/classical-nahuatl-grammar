const spec = {
  "ownerId": "classical-compound-open-transition",
  "prefix": "ClassicalCompoundOpenTransition",
  "operationId": "classical.transcription.classical-compound-open-transition.analyze",
  "inputContract": "complete-typed-classical-compound-open-transition-source",
  "domain": "classical-compound-open-transition",
  "mode": "canonical-rule",
  "selections": [
    "cn-l2-25-compound-boundary-open-transition",
    "cn-l2-25-supportive-i-kept",
    "cn-l2-25-stem-final-w-vocable-final",
    "cn-l2-25-stem-final-k-before-e-i-qu",
    "cn-l2-25-stem-final-kw-before-vowel-cu",
    "cn-l2-25-stem-final-w-before-vowel-hu-variant"
  ],
  "facets": [
    "two-stems-joined-compounding-see-primarily-lessons-30-31",
    "several-consequences-1-initial-supportive-i-see-2-6",
    "written-texts-recognize-open-transition-spelling-a-stem-final",
    "stem-final-k-before-stem-initial-e-i-spelled",
    "there-exceptions-rule",
    "stem-final-kw-retains-voice-release-feature-before-a",
    "times-stem-final-w-before-a-vowel-spelled-hu"
  ],
  "coordinates": {
    "cn-l2-25-compound-boundary-open-transition::two-stems-joined-compounding-see-primarily-lessons-30-31": {
      "assertionId": "classical-compound-open-transition:two-stems-joined-compounding-see-primarily-lessons-30-31",
      "canonicalPath": ""
    },
    "cn-l2-25-supportive-i-kept::several-consequences-1-initial-supportive-i-see-2-6": {
      "assertionId": "classical-compound-open-transition:several-consequences-1-initial-supportive-i-see-2-6",
      "canonicalPath": ""
    },
    "cn-l2-25-stem-final-w-vocable-final::written-texts-recognize-open-transition-spelling-a-stem-final": {
      "assertionId": "classical-compound-open-transition:written-texts-recognize-open-transition-spelling-a-stem-final",
      "canonicalPath": ""
    },
    "cn-l2-25-stem-final-k-before-e-i-qu::stem-final-k-before-stem-initial-e-i-spelled": {
      "assertionId": "classical-compound-open-transition:stem-final-k-before-stem-initial-e-i-spelled",
      "canonicalPath": ""
    },
    "cn-l2-25-stem-final-k-before-e-i-qu::there-exceptions-rule": {
      "assertionId": "classical-compound-open-transition:there-exceptions-rule",
      "canonicalPath": ""
    },
    "cn-l2-25-stem-final-kw-before-vowel-cu::stem-final-kw-retains-voice-release-feature-before-a": {
      "assertionId": "classical-compound-open-transition:stem-final-kw-retains-voice-release-feature-before-a",
      "canonicalPath": ""
    },
    "cn-l2-25-stem-final-w-before-vowel-hu-variant::times-stem-final-w-before-a-vowel-spelled-hu": {
      "assertionId": "classical-compound-open-transition:times-stem-final-w-before-a-vowel-spelled-hu",
      "canonicalPath": ""
    }
  },
  "ruleGetterName": "getClassicalNahuatlOpenTransitionRules",
  "executionFunctionName": "buildClassicalNahuatlOpenTransitionFrame",
  "executionValidatorName": "isClassicalNahuatlTranscriptionAnalysisFrame",
  "executionArgsBySelection": {
    "cn-l2-25-compound-boundary-open-transition": [
      {
        "boundaryType": "compound-stem-boundary",
        "stemFinalPhoneme": "/s/",
        "followingVowel": "",
        "stemInitialSupportiveI": false,
        "requestedSpelling": ""
      }
    ],
    "cn-l2-25-supportive-i-kept": [
      {
        "boundaryType": "compound-stem-boundary",
        "stemFinalPhoneme": "/s/",
        "followingVowel": "",
        "stemInitialSupportiveI": true,
        "requestedSpelling": ""
      }
    ],
    "cn-l2-25-stem-final-w-vocable-final": [
      {
        "boundaryType": "compound-stem-boundary",
        "stemFinalPhoneme": "[w]",
        "followingVowel": "a",
        "stemInitialSupportiveI": false,
        "requestedSpelling": ""
      }
    ],
    "cn-l2-25-stem-final-k-before-e-i-qu": [
      {
        "boundaryType": "compound-stem-boundary",
        "stemFinalPhoneme": "/k/",
        "followingVowel": "e",
        "stemInitialSupportiveI": false,
        "requestedSpelling": ""
      }
    ],
    "cn-l2-25-stem-final-kw-before-vowel-cu": [
      {
        "boundaryType": "compound-stem-boundary",
        "stemFinalPhoneme": "[kʷ]",
        "followingVowel": "a",
        "stemInitialSupportiveI": false,
        "requestedSpelling": ""
      }
    ],
    "cn-l2-25-stem-final-w-before-vowel-hu-variant": [
      {
        "boundaryType": "compound-stem-boundary",
        "stemFinalPhoneme": "[w]",
        "followingVowel": "a",
        "stemInitialSupportiveI": false,
        "requestedSpelling": "hu"
      }
    ]
  },
  "requireSelectedRuleMatch": true
};
export default Object.freeze(spec);
