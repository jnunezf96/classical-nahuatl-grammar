const spec = {
  "ownerId": "classical-relational-locative-n-active-action-semantics",
  "prefix": "ClassicalRelationalLocativeNActiveActionSemantics",
  "operationId": "classical.relational.locative.n.active.action.semantics.execute",
  "inputContract": "complete-typed-classical-relational-locative-n-active-action-semantics-source",
  "domain": "classical-relational-locative-n-active-action-semantics",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4338",
    "claim-p4339",
    "claim-p4340"
  ],
  "coordinates": {
    "claim-p4338::p4338-the-resultant-locative-compound-nounstem-means-place-of-an": {
      "assertionId": "classical-relational-locative-n-active-action-semantics:p4338-the-resultant-locative-compound-nounstem-means-place-of-an",
      "canonicalPath": "cases.nActiveAction.canonicalResult"
    },
    "claim-p4339::p4339-it-is-used-in-a-possessive-state-nnc-with": {
      "assertionId": "classical-relational-locative-n-active-action-semantics:p4339-it-is-used-in-a-possessive-state-nnc-with",
      "canonicalPath": "cases.nActiveAction.sourceFormation"
    },
    "claim-p4340::p4340-since-the-nnc-is-in-the-possessive-state-the": {
      "assertionId": "classical-relational-locative-n-active-action-semantics:p4340-since-the-nnc-is-in-the-possessive-state-the",
      "canonicalPath": "cases.nActiveAction.sourceState"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4338": [],
    "claim-p4339": [],
    "claim-p4340": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4338": "authorized",
    "claim-p4339": "authorized",
    "claim-p4340": "authorized"
  }
};
export default Object.freeze(spec);
