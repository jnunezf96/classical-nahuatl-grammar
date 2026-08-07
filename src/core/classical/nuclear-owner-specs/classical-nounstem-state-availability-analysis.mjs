const spec = {
  "ownerId": "classical-nounstem-state-availability-analysis",
  "prefix": "ClassicalNounstemStateAvailabilityAnalysis",
  "operationId": "classical.nounstem.state.availability.analysis.execute",
  "inputContract": "complete-typed-classical-nounstem-state-availability-analysis-source",
  "domain": "classical-nounstem-state-availability-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nnc-layer-evaluator",
  "selections": [
    "claim-p1357",
    "claim-p1358",
    "claim-p1359",
    "claim-p1360"
  ],
  "coordinates": {
    "claim-p1357::p1357-the-logical-relationship-of-state-to-nounstem-is-totally": {
      "assertionId": "classical-nounstem-state-availability-analysis:p1357-the-logical-relationship-of-state-to-nounstem-is-totally",
      "canonicalPath": "sourceAuthorityFrame.allowedStateValues"
    },
    "claim-p1358::p1358-unlike-the-verbstem-which-chooses-its-transitive-or-intransitive": {
      "assertionId": "classical-nounstem-state-availability-analysis:p1358-unlike-the-verbstem-which-chooses-its-transitive-or-intransitive",
      "canonicalPath": "sourceAuthorityFrame.stateAvailability"
    },
    "claim-p1359::p1359-it-is-true-that-there-are-certain-stems-that": {
      "assertionId": "classical-nounstem-state-availability-analysis:p1359-it-is-true-that-there-are-certain-stems-that",
      "canonicalPath": "sourceAuthorityFrame.naturalPossessionPolicy"
    },
    "claim-p1360::p1360-however-the-vast-majority-of-nounstems-participate-freely-in": {
      "assertionId": "classical-nounstem-state-availability-analysis:p1360-however-the-vast-majority-of-nounstems-participate-freely-in",
      "canonicalPath": "sourceAuthorityFrame.allowedStateValues"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAbsolutiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAbsolutiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1357": [
      "common-tli"
    ],
    "claim-p1358": [
      "common-tli"
    ],
    "claim-p1359": [
      "never-possessive"
    ],
    "claim-p1360": [
      "never-possessive"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1357": "authorized",
    "claim-p1358": "authorized",
    "claim-p1359": "authorized",
    "claim-p1360": "authorized"
  }
};
export default Object.freeze(spec);
