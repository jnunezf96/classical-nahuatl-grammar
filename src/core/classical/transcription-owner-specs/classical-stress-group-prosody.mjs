const spec = {
  "ownerId": "classical-stress-group-prosody",
  "prefix": "ClassicalStressGroupProsody",
  "operationId": "classical.transcription.classical-stress-group-prosody.analyze",
  "inputContract": "complete-typed-classical-stress-group-prosody-source",
  "domain": "classical-stress-group-prosody",
  "mode": "canonical-rule",
  "selections": [
    "cn-l2-27-stress-group-connected-speech"
  ],
  "facets": [
    "nahuatl-english-sequence-vocables-a-sentence-syntactically-sorted-stress",
    "unity-such-a-stress-group-nahuatl-such-syllable-division",
    "also-times-permits-elision-occur-see-2-14"
  ],
  "coordinates": {
    "cn-l2-27-stress-group-connected-speech::nahuatl-english-sequence-vocables-a-sentence-syntactically-sorted-stress": {
      "assertionId": "classical-stress-group-prosody:nahuatl-english-sequence-vocables-a-sentence-syntactically-sorted-stress",
      "canonicalPath": ""
    },
    "cn-l2-27-stress-group-connected-speech::unity-such-a-stress-group-nahuatl-such-syllable-division": {
      "assertionId": "classical-stress-group-prosody:unity-such-a-stress-group-nahuatl-such-syllable-division",
      "canonicalPath": ""
    },
    "cn-l2-27-stress-group-connected-speech::also-times-permits-elision-occur-see-2-14": {
      "assertionId": "classical-stress-group-prosody:also-times-permits-elision-occur-see-2-14",
      "canonicalPath": ""
    }
  },
  "ruleGetterName": "getClassicalNahuatlStressRules",
  "executionFunctionName": "buildClassicalNahuatlStressFrame",
  "executionValidatorName": "isClassicalNahuatlTranscriptionAnalysisFrame",
  "executionArgsBySelection": {
    "cn-l2-27-stress-group-connected-speech": [
      "inin",
      {
        "stressGroup": true
      }
    ]
  },
  "requireSelectedRuleMatch": true
};
export default Object.freeze(spec);
