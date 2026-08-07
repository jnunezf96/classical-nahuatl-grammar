const spec = {
  "ownerId": "classical-passive-reflexive-projective-transformation",
  "prefix": "ClassicalPassiveReflexiveProjectiveTransformation",
  "operationId": "classical.passive.reflexive.projective.transformation.execute",
  "inputContract": "complete-typed-classical-passive-reflexive-projective-transformation-source",
  "domain": "classical-passive-reflexive-projective-transformation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2114",
    "claim-p2115",
    "claim-p2116"
  ],
  "coordinates": {
    "claim-p2114::p2114-if-the-active-source-has-two-objects-one-reflexive": {
      "assertionId": "classical-passive-reflexive-projective-transformation:p2114-if-the-active-source-has-two-objects-one-reflexive",
      "canonicalPath": "voice.reflexivePassive.promotedObjectBecomesSubject"
    },
    "claim-p2115::p2115-the-shift-from-objective-case-to-nominative-case-requires": {
      "assertionId": "classical-passive-reflexive-projective-transformation:p2115-the-shift-from-objective-case-to-nominative-case-requires",
      "canonicalPath": "voice.reflexivePassive.formulaRealization"
    },
    "claim-p2116::p2116-the-mainline-reflexive-object-pronoun-of-the-source-is": {
      "assertionId": "classical-passive-reflexive-projective-transformation:p2116-the-mainline-reflexive-object-pronoun-of-the-source-is",
      "canonicalPath": "voice.reflexivePassive.sourceSubjectDeleted"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2114": [],
    "claim-p2115": [],
    "claim-p2116": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2114": "authorized",
    "claim-p2115": "authorized",
    "claim-p2116": "authorized"
  }
};
export default Object.freeze(spec);
