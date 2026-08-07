const spec = {
  "ownerId": "classical-nonanimate-specific-subject-distinction",
  "prefix": "ClassicalNonanimateSpecificSubjectDistinction",
  "operationId": "classical.nonanimate.specific.subject.distinction.execute",
  "inputContract": "complete-typed-classical-nonanimate-specific-subject-distinction-source",
  "domain": "classical-nonanimate-specific-subject-distinction",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2139",
    "claim-p2140",
    "claim-p2141",
    "claim-p2142"
  ],
  "coordinates": {
    "claim-p2139::p2139-both-are-limited-to-third-person-singular-vncs-an": {
      "assertionId": "classical-nonanimate-specific-subject-distinction:p2139-both-are-limited-to-third-person-singular-vncs-an",
      "canonicalPath": "voice.passiveSingle.impersonalSubjectReferent"
    },
    "claim-p2140::p2140-therefore-the-basic-affixal-subject-can-be-supplemented": {
      "assertionId": "classical-nonanimate-specific-subject-distinction:p2140-therefore-the-basic-affixal-subject-can-be-supplemented",
      "canonicalPath": "voice.passiveSingle.targetSubject"
    },
    "claim-p2141::p2141-it-is-translated-for-a-liquid-to-become-clear": {
      "assertionId": "classical-nonanimate-specific-subject-distinction:p2141-it-is-translated-for-a-liquid-to-become-clear",
      "canonicalPath": "impersonal.inherent.impersonalSubjectReferent"
    },
    "claim-p2142::p2142-the-subject-is-always-a-specific-nameable-identifiable-entity": {
      "assertionId": "classical-nonanimate-specific-subject-distinction:p2142-the-subject-is-always-a-specific-nameable-identifiable-entity",
      "canonicalPath": "voice.passiveSingle.impersonalSubjectReferent"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2139": [],
    "claim-p2140": [],
    "claim-p2141": [],
    "claim-p2142": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2139": "authorized",
    "claim-p2140": "authorized",
    "claim-p2141": "authorized",
    "claim-p2142": "authorized"
  }
};
export default Object.freeze(spec);
