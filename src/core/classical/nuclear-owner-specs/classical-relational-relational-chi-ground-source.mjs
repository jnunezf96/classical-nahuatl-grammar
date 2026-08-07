const spec = {
  "ownerId": "classical-relational-relational-chi-ground-source",
  "prefix": "ClassicalRelationalRelationalChiGroundSource",
  "operationId": "classical.relational.relational.chi.ground.source.execute",
  "inputContract": "complete-typed-classical-relational-relational-chi-ground-source-source",
  "domain": "classical-relational-relational-chi-ground-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4473",
    "claim-p4474"
  ],
  "coordinates": {
    "claim-p4473::p4473-the-relational-nounstem-chi-direction-toward-has-the-stem": {
      "assertionId": "classical-relational-relational-chi-ground-source:p4473-the-relational-nounstem-chi-direction-toward-has-the-stem",
      "canonicalPath": "cases.chiGround.canonicalResult"
    },
    "claim-p4474::p4474-only-on-rare-occasions-does-one-find-chi-with": {
      "assertionId": "classical-relational-relational-chi-ground-source:p4474-only-on-rare-occasions-does-one-find-chi-with",
      "canonicalPath": "cases.chiRare.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4473": [],
    "claim-p4474": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4473": "authorized",
    "claim-p4474": "authorized"
  }
};
export default Object.freeze(spec);
