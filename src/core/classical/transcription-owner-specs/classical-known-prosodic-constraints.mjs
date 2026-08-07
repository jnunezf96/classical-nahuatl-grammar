const spec = {
  "ownerId": "classical-known-prosodic-constraints",
  "prefix": "ClassicalKnownProsodicConstraints",
  "operationId": "classical.transcription.classical-known-prosodic-constraints.analyze",
  "inputContract": "complete-typed-classical-known-prosodic-constraints-source",
  "domain": "classical-known-prosodic-constraints",
  "mode": "canonical-rule",
  "selections": [
    "cn-l2-216-known-stress-rules"
  ],
  "facets": [
    "however-rules-stress-known-nuclear-clauses-stress-groups-next",
    "however-rules-stress-known-nuclear-clauses-stress-groups-next-rul"
  ],
  "coordinates": {
    "cn-l2-216-known-stress-rules::however-rules-stress-known-nuclear-clauses-stress-groups-next": {
      "assertionId": "classical-known-prosodic-constraints:however-rules-stress-known-nuclear-clauses-stress-groups-next",
      "canonicalPath": ""
    },
    "cn-l2-216-known-stress-rules::however-rules-stress-known-nuclear-clauses-stress-groups-next-rul": {
      "assertionId": "classical-known-prosodic-constraints:however-rules-stress-known-nuclear-clauses-stress-groups-next-rul",
      "canonicalPath": ""
    }
  },
  "ruleGetterName": "getClassicalNahuatlProsodicContourRules",
  "executionFunctionName": "buildClassicalNahuatlProsodicContourFrame",
  "executionValidatorName": "isClassicalNahuatlTranscriptionAnalysisFrame",
  "executionArgsBySelection": {
    "cn-l2-216-known-stress-rules": [
      {
        "contourType": "nuclear-clause-stress",
        "vocable": "calli"
      }
    ]
  },
  "requireSelectedRuleMatch": true
};
export default Object.freeze(spec);
