const spec = {
  "ownerId": "classical-nnc-state-participant-role-analysis",
  "prefix": "ClassicalNncStateParticipantRoleAnalysis",
  "operationId": "classical.nnc.state.participant.role.analysis.execute",
  "inputContract": "complete-typed-classical-nnc-state-participant-role-analysis-source",
  "domain": "classical-nnc-state-participant-role-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nnc-layer-evaluator",
  "selections": [
    "claim-p1262",
    "claim-p1263",
    "claim-p1264",
    "claim-p1265"
  ],
  "coordinates": {
    "claim-p1262::p1262-as-explained-in-lesson-4-the-difference-between-the": {
      "assertionId": "classical-nnc-state-participant-role-analysis:p1262-as-explained-in-lesson-4-the-difference-between-the",
      "canonicalPath": "contractGreatestCommonDivisor.valencePosition"
    },
    "claim-p1263::p1263-state-is-somewhat-like-valence-in-that-it-is": {
      "assertionId": "classical-nnc-state-participant-role-analysis:p1263-state-is-somewhat-like-valence-in-that-it-is",
      "canonicalPath": "contractGreatestCommonDivisor.stateCategories"
    },
    "claim-p1264::p1264-this-new-participant-is-always-included-in-the-predicate": {
      "assertionId": "classical-nnc-state-participant-role-analysis:p1264-this-new-participant-is-always-included-in-the-predicate",
      "canonicalPath": "stateFrame.slots.0.possessorPerson"
    },
    "claim-p1265::p1265-while-valence-brings-in-a-personal-pronoun-in-an": {
      "assertionId": "classical-nnc-state-participant-role-analysis:p1265-while-valence-brings-in-a-personal-pronoun-in-an",
      "canonicalPath": "stateFrame.possessorRole"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPossessiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPossessiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1262": [
      "dyadic-1sg"
    ],
    "claim-p1263": [
      "dyadic-1sg"
    ],
    "claim-p1264": [
      "dyadic-1sg"
    ],
    "claim-p1265": [
      "dyadic-1sg"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1262": "authorized",
    "claim-p1263": "authorized",
    "claim-p1264": "authorized",
    "claim-p1265": "authorized"
  }
};
export default Object.freeze(spec);
