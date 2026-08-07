const spec = {
  "ownerId": "classical-preterit-agentive-affective-hybrid",
  "prefix": "ClassicalPreteritAgentiveAffectiveHybrid",
  "operationId": "classical.preterit.agentive.affective.hybrid.execute",
  "inputContract": "complete-typed-classical-preterit-agentive-affective-hybrid-source",
  "domain": "classical-preterit-agentive-affective-hybrid",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3416",
    "claim-p3417"
  ],
  "coordinates": {
    "claim-p3416::p3416-note-the-verbal-and-nominal-nnc-hybrid-of-the": {
      "assertionId": "classical-preterit-agentive-affective-hybrid:p3416-note-the-verbal-and-nominal-nnc-hybrid-of-the",
      "canonicalPath": "cases.preteritAffectiveHybrid.authorizationStatus"
    },
    "claim-p3417::p3417-the-hybrid-nature-of-the-formation-is-even-more": {
      "assertionId": "classical-preterit-agentive-affective-hybrid:p3417-the-hybrid-nature-of-the-formation-is-even-more",
      "canonicalPath": "cases.preteritAffectiveHybrid.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3416": [],
    "claim-p3417": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3416": "authorized",
    "claim-p3417": "authorized"
  }
};
export default Object.freeze(spec);
