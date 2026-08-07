const spec = {
  "ownerId": "classical-supplementation-head-role-system",
  "prefix": "ClassicalSupplementationHeadRoleSystem",
  "operationId": "classical.supplementation.head.role.system.execute",
  "inputContract": "complete-typed-classical-supplementation-head-role-system-source",
  "domain": "classical-supplementation-head-role-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1784",
    "claim-p1785",
    "claim-p1786"
  ],
  "coordinates": {
    "claim-p1784::p1784-consequently-the-nuclear-subject-the-nuclear-object-or-the": {
      "assertionId": "classical-supplementation-head-role-system:p1784-consequently-the-nuclear-subject-the-nuclear-object-or-the",
      "canonicalPath": "shared.referenceFrame.headRole"
    },
    "claim-p1785::p1785-the-supplement-an-adjoined-nuclear-clause-or-a-group": {
      "assertionId": "classical-supplementation-head-role-system:p1785-the-supplement-an-adjoined-nuclear-clause-or-a-group",
      "canonicalPath": "object.referenceFrame.headRole"
    },
    "claim-p1786::p1786-the-supplement-an-adjoined-nuclear-clause-or-a-group": {
      "assertionId": "classical-supplementation-head-role-system:p1786-the-supplement-an-adjoined-nuclear-clause-or-a-group",
      "canonicalPath": "possessor.referenceFrame.headRole"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1784": [],
    "claim-p1785": [],
    "claim-p1786": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1784": "authorized",
    "claim-p1785": "authorized",
    "claim-p1786": "authorized"
  }
};
export default Object.freeze(spec);
