const spec = {
  "ownerId": "classical-action-possessor-role-contrast",
  "prefix": "ClassicalActionPossessorRoleContrast",
  "operationId": "classical.action.possessor.role.contrast.execute",
  "inputContract": "complete-typed-classical-action-possessor-role-contrast-source",
  "domain": "classical-action-possessor-role-contrast",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3670",
    "claim-p3671",
    "claim-p3672"
  ],
  "coordinates": {
    "claim-p3670::p3670-study-the-difference-between-the-members-of-the-following": {
      "assertionId": "classical-action-possessor-role-contrast:p3670-study-the-difference-between-the-members-of-the-following",
      "canonicalPath": "cases.actionPossessorRoleContrast.authorizationStatus"
    },
    "claim-p3671::p3671-in-the-ones-derived-from-the-active-voice-the": {
      "assertionId": "classical-action-possessor-role-contrast:p3671-in-the-ones-derived-from-the-active-voice-the",
      "canonicalPath": "cases.actionPossessorRoleContrast.first.canonicalResult"
    },
    "claim-p3672::p3672-in-the-nncs-derived-from-the-passive-voice-the": {
      "assertionId": "classical-action-possessor-role-contrast:p3672-in-the-nncs-derived-from-the-passive-voice-the",
      "canonicalPath": "cases.actionPossessorRoleContrast.second.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3670": [],
    "claim-p3671": [],
    "claim-p3672": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3670": "authorized",
    "claim-p3671": "authorized",
    "claim-p3672": "authorized"
  }
};
export default Object.freeze(spec);
