const spec = {
  "ownerId": "classical-predicate-nominalization-customary-agentive-reanalysis",
  "prefix": "ClassicalPredicateNominalizationCustomaryAgentiveReanalysis",
  "operationId": "classical.predicate.nominalization.customary.agentive.reanalysis.execute",
  "inputContract": "complete-typed-classical-predicate-nominalization-customary-agentive-reanalysis-source",
  "domain": "classical-predicate-nominalization-customary-agentive-reanalysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3505",
    "claim-p3506",
    "claim-p3507",
    "claim-p3508",
    "claim-p3509",
    "claim-p3510",
    "claim-p3511"
  ],
  "coordinates": {
    "claim-p3505::p3505-as-is-the-case-with-the-absolutive-state-preterit": {
      "assertionId": "classical-predicate-nominalization-customary-agentive-reanalysis:p3505-as-is-the-case-with-the-absolutive-state-preterit",
      "canonicalPath": "cases.customaryReanalysis.authorizationStatus"
    },
    "claim-p3506::p3506-when-a-transitive-predicate-is-thereby-downgraded-to-the": {
      "assertionId": "classical-predicate-nominalization-customary-agentive-reanalysis:p3506-when-a-transitive-predicate-is-thereby-downgraded-to-the",
      "canonicalPath": "cases.customaryReanalysis.canonicalResult"
    },
    "claim-p3507::p3507-if-projective-it-is-filled-with-te-or-tla": {
      "assertionId": "classical-predicate-nominalization-customary-agentive-reanalysis:p3507-if-projective-it-is-filled-with-te-or-tla",
      "canonicalPath": "cases.customaryReanalysis.gcdSatisfied"
    },
    "claim-p3508::p3508-the-last-constituent-of-the-nounstem-is-always-the": {
      "assertionId": "classical-predicate-nominalization-customary-agentive-reanalysis:p3508-the-last-constituent-of-the-nounstem-is-always-the",
      "canonicalPath": "cases.customaryReanalysis.lcmComplete"
    },
    "claim-p3509::p3509-the-resultant-absolutive-state-nnc-has-its-subject-pronoun": {
      "assertionId": "classical-predicate-nominalization-customary-agentive-reanalysis:p3509-the-resultant-absolutive-state-nnc-has-its-subject-pronoun",
      "canonicalPath": "cases.customaryReanalysis.nounClass"
    },
    "claim-p3510::p3510-in-rare-instances-however-it-is-possible-for-a": {
      "assertionId": "classical-predicate-nominalization-customary-agentive-reanalysis:p3510-in-rare-instances-however-it-is-possible-for-a",
      "canonicalPath": "cases.customaryReanalysis.authorizationStatus"
    },
    "claim-p3511::p3511-what-is-strange-about-this-is-that-vnc-associated": {
      "assertionId": "classical-predicate-nominalization-customary-agentive-reanalysis:p3511-what-is-strange-about-this-is-that-vnc-associated",
      "canonicalPath": "cases.customaryReanalysis.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3505": [],
    "claim-p3506": [],
    "claim-p3507": [],
    "claim-p3508": [],
    "claim-p3509": [],
    "claim-p3510": [],
    "claim-p3511": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3505": "authorized",
    "claim-p3506": "authorized",
    "claim-p3507": "authorized",
    "claim-p3508": "authorized",
    "claim-p3509": "authorized",
    "claim-p3510": "authorized",
    "claim-p3511": "authorized"
  }
};
export default Object.freeze(spec);
