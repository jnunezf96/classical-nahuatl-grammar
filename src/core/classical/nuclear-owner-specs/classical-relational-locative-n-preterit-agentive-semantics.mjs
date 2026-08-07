const spec = {
  "ownerId": "classical-relational-locative-n-preterit-agentive-semantics",
  "prefix": "ClassicalRelationalLocativeNPreteritAgentiveSemantics",
  "operationId": "classical.relational.locative.n.preterit.agentive.semantics.execute",
  "inputContract": "complete-typed-classical-relational-locative-n-preterit-agentive-semantics-source",
  "domain": "classical-relational-locative-n-preterit-agentive-semantics",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4333",
    "claim-p4334",
    "claim-p4335"
  ],
  "coordinates": {
    "claim-p4333::p4333-the-resultant-locative-compound-nounstem-means-place-of-a": {
      "assertionId": "classical-relational-locative-n-preterit-agentive-semantics:p4333-the-resultant-locative-compound-nounstem-means-place-of-a",
      "canonicalPath": "cases.nPreterit.canonicalResult"
    },
    "claim-p4334::p4334-the-compound-nounstem-is-used-in-an-absolutive-state": {
      "assertionId": "classical-relational-locative-n-preterit-agentive-semantics:p4334-the-compound-nounstem-is-used-in-an-absolutive-state",
      "canonicalPath": "cases.nPreterit.sourceFormation"
    },
    "claim-p4335::p4335-the-num1-filler-ti-is-included-with-the-general": {
      "assertionId": "classical-relational-locative-n-preterit-agentive-semantics:p4335-the-num1-filler-ti-is-included-with-the-general",
      "canonicalPath": "cases.nPreteritNormal.subjectMode"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4333": [],
    "claim-p4334": [],
    "claim-p4335": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4333": "authorized",
    "claim-p4334": "authorized",
    "claim-p4335": "authorized"
  }
};
export default Object.freeze(spec);
