const spec = {
  "ownerId": "classical-supportive-vowel-realization",
  "prefix": "ClassicalSupportiveVowelRealization",
  "operationId": "classical.transcription.classical-supportive-vowel-realization.analyze",
  "inputContract": "complete-typed-classical-supportive-vowel-realization-source",
  "domain": "classical-supportive-vowel-realization",
  "mode": "canonical-rule",
  "selections": [
    "cn-l2-263-supportive-i-illegal-sequence",
    "cn-l2-263-supportive-i-drop-when-unneeded"
  ],
  "facets": [
    "note-1-vowel-phone-i-important-supportive-function-nahuatl",
    "note-1-vowel-phone-i-important-supportive-function-nahuatl-rul",
    "conditions-initial-supportive-i-rarely-a-final-ceases-needed"
  ],
  "coordinates": {
    "cn-l2-263-supportive-i-illegal-sequence::note-1-vowel-phone-i-important-supportive-function-nahuatl": {
      "assertionId": "classical-supportive-vowel-realization:note-1-vowel-phone-i-important-supportive-function-nahuatl",
      "canonicalPath": ""
    },
    "cn-l2-263-supportive-i-illegal-sequence::note-1-vowel-phone-i-important-supportive-function-nahuatl-rul": {
      "assertionId": "classical-supportive-vowel-realization:note-1-vowel-phone-i-important-supportive-function-nahuatl-rul",
      "canonicalPath": ""
    },
    "cn-l2-263-supportive-i-drop-when-unneeded::conditions-initial-supportive-i-rarely-a-final-ceases-needed": {
      "assertionId": "classical-supportive-vowel-realization:conditions-initial-supportive-i-rarely-a-final-ceases-needed",
      "canonicalPath": ""
    }
  },
  "ruleGetterName": "getClassicalNahuatlSupportiveVowelRules",
  "executionFunctionName": "buildClassicalNahuatlSupportiveVowelFrame",
  "executionValidatorName": "isClassicalNahuatlTranscriptionAnalysisFrame",
  "executionArgsBySelection": {
    "cn-l2-263-supportive-i-illegal-sequence": [
      {
        "sourceSegments": [
          "k",
          "k"
        ],
        "insertionPosition": "between",
        "supportiveIndex": 1,
        "supportiveVowelNeeded": true,
        "tokenLevelLegal": false
      }
    ],
    "cn-l2-263-supportive-i-drop-when-unneeded": [
      {
        "sourceSegments": [
          "i",
          "x",
          "tl"
        ],
        "insertionPosition": "before",
        "supportiveIndex": 0,
        "supportiveVowelNeeded": false,
        "tokenLevelLegal": false
      }
    ]
  },
  "requireSelectedRuleMatch": true
};
export default Object.freeze(spec);
