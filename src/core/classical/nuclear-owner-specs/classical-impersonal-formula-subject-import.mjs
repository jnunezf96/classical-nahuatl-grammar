const spec = {
  "ownerId": "classical-impersonal-formula-subject-import",
  "prefix": "ClassicalImpersonalFormulaSubjectImport",
  "operationId": "classical.impersonal.formula.subject.import.execute",
  "inputContract": "complete-typed-classical-impersonal-formula-subject-import-source",
  "domain": "classical-impersonal-formula-subject-import",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2159",
    "claim-p2160",
    "claim-p2161",
    "claim-p2162",
    "claim-p2163"
  ],
  "coordinates": {
    "claim-p2159::p2159-an-impersonal-vnc-formed-on-a-nonactive-stem-is": {
      "assertionId": "classical-impersonal-formula-subject-import:p2159-an-impersonal-vnc-formed-on-a-nonactive-stem-is",
      "canonicalPath": "voice.impersonalIntransitive.targetSubject"
    },
    "claim-p2160::p2160-the-subject-pronoun-person-dyad-plus-number-dyad-of": {
      "assertionId": "classical-impersonal-formula-subject-import:p2160-the-subject-pronoun-person-dyad-plus-number-dyad-of",
      "canonicalPath": "voice.impersonalIntransitive.sourceSubjectDeleted"
    },
    "claim-p2161::p2161-it-is-not-generated-from-anything-in-the-active": {
      "assertionId": "classical-impersonal-formula-subject-import:p2161-it-is-not-generated-from-anything-in-the-active",
      "canonicalPath": "voice.impersonalIntransitive.impersonalSubjectReferent"
    },
    "claim-p2162::p2162-this-impersonal-subject-pronoun-has-no-nameable-referent-in": {
      "assertionId": "classical-impersonal-formula-subject-import:p2162-this-impersonal-subject-pronoun-has-no-nameable-referent-in",
      "canonicalPath": "voice.impersonalIntransitive.formulaStringAuthority"
    },
    "claim-p2163::p2163-the-discarded-subject-pronoun-of-the-source-is-unrecoverable": {
      "assertionId": "classical-impersonal-formula-subject-import:p2163-the-discarded-subject-pronoun-of-the-source-is-unrecoverable",
      "canonicalPath": "voice.impersonalIntransitive.targetSubject"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2159": [],
    "claim-p2160": [],
    "claim-p2161": [],
    "claim-p2162": [],
    "claim-p2163": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2159": "authorized",
    "claim-p2160": "authorized",
    "claim-p2161": "authorized",
    "claim-p2162": "authorized",
    "claim-p2163": "authorized"
  }
};
export default Object.freeze(spec);
