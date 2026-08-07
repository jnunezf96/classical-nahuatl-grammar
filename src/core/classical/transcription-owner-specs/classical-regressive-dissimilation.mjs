const spec = {
  "ownerId": "classical-regressive-dissimilation",
  "prefix": "ClassicalRegressiveDissimilation",
  "operationId": "classical.transcription.classical-regressive-dissimilation.analyze",
  "inputContract": "complete-typed-classical-regressive-dissimilation-source",
  "domain": "classical-regressive-dissimilation",
  "mode": "canonical-rule",
  "selections": [
    "cn-l2-211-regressive-dissimilation-kk-hk"
  ],
  "facets": [
    "note-there-another-process-called-dissimilation-a-sound-changes",
    "nahuatl-occurs-optionally-regressive-dissimilation-first-k",
    "sequence-kk-represented-irregular-phone-h-i-e-kk",
    "regressive-dissimilation-also-possible-sequence-kwk-after-optional-delabialization",
    "see-2-13-4-i-e-kw-k-kk"
  ],
  "coordinates": {
    "cn-l2-211-regressive-dissimilation-kk-hk::note-there-another-process-called-dissimilation-a-sound-changes": {
      "assertionId": "classical-regressive-dissimilation:note-there-another-process-called-dissimilation-a-sound-changes",
      "canonicalPath": ""
    },
    "cn-l2-211-regressive-dissimilation-kk-hk::nahuatl-occurs-optionally-regressive-dissimilation-first-k": {
      "assertionId": "classical-regressive-dissimilation:nahuatl-occurs-optionally-regressive-dissimilation-first-k",
      "canonicalPath": ""
    },
    "cn-l2-211-regressive-dissimilation-kk-hk::sequence-kk-represented-irregular-phone-h-i-e-kk": {
      "assertionId": "classical-regressive-dissimilation:sequence-kk-represented-irregular-phone-h-i-e-kk",
      "canonicalPath": ""
    },
    "cn-l2-211-regressive-dissimilation-kk-hk::regressive-dissimilation-also-possible-sequence-kwk-after-optional-delabialization": {
      "assertionId": "classical-regressive-dissimilation:regressive-dissimilation-also-possible-sequence-kwk-after-optional-delabialization",
      "canonicalPath": ""
    },
    "cn-l2-211-regressive-dissimilation-kk-hk::see-2-13-4-i-e-kw-k-kk": {
      "assertionId": "classical-regressive-dissimilation:see-2-13-4-i-e-kw-k-kk",
      "canonicalPath": ""
    }
  },
  "ruleGetterName": "getClassicalNahuatlAssimilationRules",
  "executionFunctionName": "buildClassicalNahuatlAssimilationFrame",
  "executionValidatorName": "isClassicalNahuatlTranscriptionAnalysisFrame",
  "executionArgsBySelection": {
    "cn-l2-211-regressive-dissimilation-kk-hk": [
      {
        "leftConsonant": "k",
        "rightConsonant": "k",
        "grammaticalConstruction": true
      }
    ]
  },
  "requireSelectedRuleMatch": true
};
export default Object.freeze(spec);
