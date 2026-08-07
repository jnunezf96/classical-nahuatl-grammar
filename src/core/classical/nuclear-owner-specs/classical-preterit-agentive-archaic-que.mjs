const spec = {
  "ownerId": "classical-preterit-agentive-archaic-que",
  "prefix": "ClassicalPreteritAgentiveArchaicQue",
  "operationId": "classical.preterit.agentive.archaic.que.execute",
  "inputContract": "complete-typed-classical-preterit-agentive-archaic-que-source",
  "domain": "classical-preterit-agentive-archaic-que",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3408",
    "claim-p3409",
    "claim-p3410"
  ],
  "coordinates": {
    "claim-p3408::p3408-note-the-general-use-form-of-the-preterit-agentive": {
      "assertionId": "classical-preterit-agentive-archaic-que:p3408-note-the-general-use-form-of-the-preterit-agentive",
      "canonicalPath": "cases.preteritArchaic.authorizationStatus"
    },
    "claim-p3409::p3409-in-archaic-texts-usually-of-a-poetic-nature-one": {
      "assertionId": "classical-preterit-agentive-archaic-que:p3409-in-archaic-texts-usually-of-a-poetic-nature-one",
      "canonicalPath": "cases.preteritArchaic.canonicalResult"
    },
    "claim-p3410::p3410-banner-m-o-quetza-to-erect-itself-notice-the": {
      "assertionId": "classical-preterit-agentive-archaic-que:p3410-banner-m-o-quetza-to-erect-itself-notice-the",
      "canonicalPath": "cases.preteritArchaic.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3408": [],
    "claim-p3409": [],
    "claim-p3410": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3408": "authorized",
    "claim-p3409": "authorized",
    "claim-p3410": "authorized"
  }
};
export default Object.freeze(spec);
