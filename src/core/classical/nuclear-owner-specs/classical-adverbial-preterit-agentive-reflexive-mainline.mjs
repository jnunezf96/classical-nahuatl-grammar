const spec = {
  "ownerId": "classical-adverbial-preterit-agentive-reflexive-mainline",
  "prefix": "ClassicalAdverbialPreteritAgentiveReflexiveMainline",
  "operationId": "classical.adverbial.preterit.agentive.reflexive.mainline.execute",
  "inputContract": "complete-typed-classical-adverbial-preterit-agentive-reflexive-mainline-source",
  "domain": "classical-adverbial-preterit-agentive-reflexive-mainline",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4208",
    "claim-p4209"
  ],
  "coordinates": {
    "claim-p4208::p4208-if-the-preterit-agentive-nounstem-has-become-strongly-lexicalized": {
      "assertionId": "classical-adverbial-preterit-agentive-reflexive-mainline:p4208-if-the-preterit-agentive-nounstem-has-become-strongly-lexicalized",
      "canonicalPath": "cases.preteritReflexiveMainline.canonicalResult"
    },
    "claim-p4209::p4209-however-if-the-preterit-agentive-nounstem-has-become-strongly": {
      "assertionId": "classical-adverbial-preterit-agentive-reflexive-mainline:p4209-however-if-the-preterit-agentive-nounstem-has-become-strongly",
      "canonicalPath": "cases.preteritReflexiveMainline.sourceKind"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4208": [],
    "claim-p4209": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4208": "authorized",
    "claim-p4209": "authorized"
  }
};
export default Object.freeze(spec);
