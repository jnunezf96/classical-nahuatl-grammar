const spec = {
  "ownerId": "classical-agentive-source-stage-semantic-contrast",
  "prefix": "ClassicalAgentiveSourceStageSemanticContrast",
  "operationId": "classical.agentive.source.stage.semantic.contrast.execute",
  "inputContract": "complete-typed-classical-agentive-source-stage-semantic-contrast-source",
  "domain": "classical-agentive-source-stage-semantic-contrast",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3525",
    "claim-p3526",
    "claim-p3527"
  ],
  "coordinates": {
    "claim-p3525::p3525-the-notion-of-habitual-action-implicit-in-the-customary": {
      "assertionId": "classical-agentive-source-stage-semantic-contrast:p3525-the-notion-of-habitual-action-implicit-in-the-customary",
      "canonicalPath": "cases.agentiveSourceStageContrast.authorizationStatus"
    },
    "claim-p3526::p3526-the-many-instances-where-the-two-nncs-have-the": {
      "assertionId": "classical-agentive-source-stage-semantic-contrast:p3526-the-many-instances-where-the-two-nncs-have-the",
      "canonicalPath": "contract.evidenceRoles.agentiveSourceStageContrast"
    },
    "claim-p3527::p3527-there-are-other-pairs-in-which-the-meaning-of": {
      "assertionId": "classical-agentive-source-stage-semantic-contrast:p3527-there-are-other-pairs-in-which-the-meaning-of",
      "canonicalPath": "contract.translationAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3525": [],
    "claim-p3526": [],
    "claim-p3527": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3525": "authorized",
    "claim-p3526": "authorized",
    "claim-p3527": "authorized"
  }
};
export default Object.freeze(spec);
