const spec = {
  "ownerId": "classical-relational-tloc-ownerhood-affective",
  "prefix": "ClassicalRelationalTlocOwnerhoodAffective",
  "operationId": "classical.relational.tloc.ownerhood.affective.execute",
  "inputContract": "complete-typed-classical-relational-tloc-ownerhood-affective-source",
  "domain": "classical-relational-tloc-ownerhood-affective",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4286",
    "claim-p4287"
  ],
  "coordinates": {
    "claim-p4286::p4286-the-nounstem-tloc-may-appear-as-the-embed-in": {
      "assertionId": "classical-relational-tloc-ownerhood-affective:p4286-the-nounstem-tloc-may-appear-as-the-embed-in",
      "canonicalPath": "cases.tloc.canonicalResult"
    },
    "claim-p4287::p4287-the-honorific-form-of-tloc-is-tloc-tzin-co": {
      "assertionId": "classical-relational-tloc-ownerhood-affective:p4287-the-honorific-form-of-tloc-is-tloc-tzin-co",
      "canonicalPath": "cases.tloc.stemId"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4286": [],
    "claim-p4287": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4286": "authorized",
    "claim-p4287": "authorized"
  }
};
export default Object.freeze(spec);
