const spec = {
  "ownerId": "classical-vocative-preterit-agentive-boundary",
  "prefix": "ClassicalVocativePreteritAgentiveBoundary",
  "operationId": "classical.vocative.preterit.agentive.boundary.execute",
  "inputContract": "complete-typed-classical-vocative-preterit-agentive-boundary-source",
  "domain": "classical-vocative-preterit-agentive-boundary",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3488",
    "claim-p3489",
    "claim-p3490",
    "claim-p3491",
    "claim-p3492",
    "claim-p3493"
  ],
  "coordinates": {
    "claim-p3488::p3488-when-the-vocative-particle-e": {
      "assertionId": "classical-vocative-preterit-agentive-boundary:p3488-when-the-vocative-particle-e",
      "canonicalPath": "cases.vocativeBoundary.authorizationStatus"
    },
    "claim-p3489::p3489-see-18-11-is-used-with-a-preterit-agentive": {
      "assertionId": "classical-vocative-preterit-agentive-boundary:p3489-see-18-11-is-used-with-a-preterit-agentive",
      "canonicalPath": "cases.vocativeBoundary.canonicalResult"
    },
    "claim-p3490::p3490-when-the-nnc-s-subject-pronoun-has-the-singular": {
      "assertionId": "classical-vocative-preterit-agentive-boundary:p3490-when-the-nnc-s-subject-pronoun-has-the-singular",
      "canonicalPath": "cases.vocativeBoundary.gcdSatisfied"
    },
    "claim-p3491::p3491-when-the-nnc-s-subject-pronoun-has-the-singular": {
      "assertionId": "classical-vocative-preterit-agentive-boundary:p3491-when-the-nnc-s-subject-pronoun-has-the-singular",
      "canonicalPath": "cases.vocativeBoundary.lcmComplete"
    },
    "claim-p3492::p3492-when-the-source-verbstem-belongs-to-class-b-and": {
      "assertionId": "classical-vocative-preterit-agentive-boundary:p3492-when-the-source-verbstem-belongs-to-class-b-and",
      "canonicalPath": "cases.vocativeBoundary.operationId"
    },
    "claim-p3493::p3493-a-problem-would-occur-here-only-in-the-instance": {
      "assertionId": "classical-vocative-preterit-agentive-boundary:p3493-a-problem-would-occur-here-only-in-the-instance",
      "canonicalPath": "cases.vocativeBoundary.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3488": [],
    "claim-p3489": [],
    "claim-p3490": [],
    "claim-p3491": [],
    "claim-p3492": [],
    "claim-p3493": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3488": "authorized",
    "claim-p3489": "authorized",
    "claim-p3490": "authorized",
    "claim-p3491": "authorized",
    "claim-p3492": "authorized",
    "claim-p3493": "authorized"
  }
};
export default Object.freeze(spec);
