const spec = {
  "ownerId": "classical-optative-command-supplement-subject",
  "prefix": "ClassicalOptativeCommandSupplementSubject",
  "operationId": "classical.optative.command.supplement.subject.execute",
  "inputContract": "complete-typed-classical-optative-command-supplement-subject-source",
  "domain": "classical-optative-command-supplement-subject",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1866"
  ],
  "coordinates": {
    "claim-p1866::p1866-a-second-person-supplementary-subject-whose-head-is-in": {
      "assertionId": "classical-optative-command-supplement-subject:p1866-a-second-person-supplementary-subject-whose-head-is-in",
      "canonicalPath": "extractedFrames.commandSubject.isRealVocative"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1866": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1866": "authorized"
  }
};
export default Object.freeze(spec);
