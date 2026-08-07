const spec = {
  "ownerId": "classical-relational-context-role-locale-source-goal-path",
  "prefix": "ClassicalRelationalContextRoleLocaleSourceGoalPath",
  "operationId": "classical.relational.context.role.locale.source.goal.path.execute",
  "inputContract": "complete-typed-classical-relational-context-role-locale-source-goal-path-source",
  "domain": "classical-relational-context-role-locale-source-goal-path",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4243",
    "claim-p4244",
    "claim-p4245"
  ],
  "coordinates": {
    "claim-p4243::p4243-for-example-a-given-locative-relational-nounstem-depending-on": {
      "assertionId": "classical-relational-context-role-locale-source-goal-path:p4243-for-example-a-given-locative-relational-nounstem-depending-on",
      "canonicalPath": "cases.contextRoles.canonicalResult"
    },
    "claim-p4244::p4244-similarly-a-given-directional-relational-nounstem-can-refer-to": {
      "assertionId": "classical-relational-context-role-locale-source-goal-path:p4244-similarly-a-given-directional-relational-nounstem-can-refer-to",
      "canonicalPath": "cases.contextRoles.contextualFacts.translationPrepositionIsMorphology"
    },
    "claim-p4245::p4245-this-means-that-in-translating-a-relational-nnc-one": {
      "assertionId": "classical-relational-context-role-locale-source-goal-path:p4245-this-means-that-in-translating-a-relational-nnc-one",
      "canonicalPath": "contract.translationPrepositionAuthorizesMorphology"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4243": [],
    "claim-p4244": [],
    "claim-p4245": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4243": "authorized",
    "claim-p4244": "authorized",
    "claim-p4245": "authorized"
  }
};
export default Object.freeze(spec);
