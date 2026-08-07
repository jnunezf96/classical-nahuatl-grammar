const spec = {
  "ownerId": "classical-predicate-nominalization-present-agentive",
  "prefix": "ClassicalPredicateNominalizationPresentAgentive",
  "operationId": "classical.predicate.nominalization.present.agentive.execute",
  "inputContract": "complete-typed-classical-predicate-nominalization-present-agentive-source",
  "domain": "classical-predicate-nominalization-present-agentive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3565",
    "claim-p3566",
    "claim-p3567",
    "claim-p3568",
    "claim-p3569",
    "claim-p3570"
  ],
  "coordinates": {
    "claim-p3565::p3565-much-less-important-than-the-customary-present-agentive-nnc": {
      "assertionId": "classical-predicate-nominalization-present-agentive:p3565-much-less-important-than-the-customary-present-agentive-nnc",
      "canonicalPath": "cases.presentAgentive.authorizationStatus"
    },
    "claim-p3566::p3566-it-is-formed-by-converting-the-predicate-of-a": {
      "assertionId": "classical-predicate-nominalization-present-agentive:p3566-it-is-formed-by-converting-the-predicate-of-a",
      "canonicalPath": "cases.presentAgentive.canonicalResult"
    },
    "claim-p3567::p3567-this-present-agentive-nounstem-is-used-only-to-form": {
      "assertionId": "classical-predicate-nominalization-present-agentive:p3567-this-present-agentive-nounstem-is-used-only-to-form",
      "canonicalPath": "cases.presentAgentive.gcdSatisfied"
    },
    "claim-p3568::p3568-this-is-a-connective-t-compound-vnc-with-ya": {
      "assertionId": "classical-predicate-nominalization-present-agentive:p3568-this-is-a-connective-t-compound-vnc-with-ya",
      "canonicalPath": "cases.presentAgentive.lcmComplete"
    },
    "claim-p3569::p3569-the-nounstem-can-also-be-used-metaphorically-in-the": {
      "assertionId": "classical-predicate-nominalization-present-agentive:p3569-the-nounstem-can-also-be-used-metaphorically-in-the",
      "canonicalPath": "cases.presentAgentive.sourceStage"
    },
    "claim-p3570::p3570-the-nounstem-can-also-mean-image-or-design-of": {
      "assertionId": "classical-predicate-nominalization-present-agentive:p3570-the-nounstem-can-also-mean-image-or-design-of",
      "canonicalPath": "cases.presentAgentive.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3565": [],
    "claim-p3566": [],
    "claim-p3567": [],
    "claim-p3568": [],
    "claim-p3569": [],
    "claim-p3570": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3565": "authorized",
    "claim-p3566": "authorized",
    "claim-p3567": "authorized",
    "claim-p3568": "authorized",
    "claim-p3569": "authorized",
    "claim-p3570": "authorized"
  }
};
export default Object.freeze(spec);
