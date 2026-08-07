const spec = {
  "ownerId": "classical-relational-continuation-associated-entity-matrix",
  "prefix": "ClassicalRelationalContinuationAssociatedEntityMatrix",
  "operationId": "classical.relational.continuation.associated.entity.matrix.execute",
  "inputContract": "complete-typed-classical-relational-continuation-associated-entity-matrix-source",
  "domain": "classical-relational-continuation-associated-entity-matrix",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-continuation-runtime",
  "selections": [
    "claim-p4530",
    "claim-p4531",
    "claim-p4532",
    "claim-p4533"
  ],
  "coordinates": {
    "claim-p4530::p4530-a-compound-nounstem-whose-matrix-is-a-relational-nounstem": {
      "assertionId": "classical-relational-continuation-associated-entity-matrix:p4530-a-compound-nounstem-whose-matrix-is-a-relational-nounstem",
      "canonicalPath": "cases.associatedPlain.canonicalResult"
    },
    "claim-p4531::p4531-the-meaning-of-the-resultant-compound-stem-is-entity": {
      "assertionId": "classical-relational-continuation-associated-entity-matrix:p4531-the-meaning-of-the-resultant-compound-stem-is-entity",
      "canonicalPath": "cases.associatedPlain.constructionKind"
    },
    "claim-p4532::p4532-the-stem-occurs-in-an-associated-entity-nnc": {
      "assertionId": "classical-relational-continuation-associated-entity-matrix:p4532-the-stem-occurs-in-an-associated-entity-nnc",
      "canonicalPath": "cases.associatedPlain.canonicalResult"
    },
    "claim-p4533::p4533-associated-with-a-the-strait-or-straits-the-matrix": {
      "assertionId": "classical-relational-continuation-associated-entity-matrix:p4533-associated-with-a-the-strait-or-straits-the-matrix",
      "canonicalPath": "cases.associatedPlain.constructionKind"
    }
  },
  "executionFunctionName": "buildClassicalRelationalContinuationValidationFrame",
  "executionValidatorName": "isClassicalRelationalContinuationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4530": [],
    "claim-p4531": [],
    "claim-p4532": [],
    "claim-p4533": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4530": "authorized",
    "claim-p4531": "authorized",
    "claim-p4532": "authorized",
    "claim-p4533": "authorized"
  }
};
export default Object.freeze(spec);
