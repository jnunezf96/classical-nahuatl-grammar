const spec = {
  "ownerId": "classical-relational-relational-pa-direction-domain",
  "prefix": "ClassicalRelationalRelationalPaDirectionDomain",
  "operationId": "classical.relational.relational.pa.direction.domain.execute",
  "inputContract": "complete-typed-classical-relational-relational-pa-direction-domain-source",
  "domain": "classical-relational-relational-pa-direction-domain",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4451",
    "claim-p4452",
    "claim-p4453",
    "claim-p4454"
  ],
  "coordinates": {
    "claim-p4451::p4451-the-relational-nounstem-pa-meaning-place-or-more-frequently": {
      "assertionId": "classical-relational-relational-pa-direction-domain:p4451-the-relational-nounstem-pa-meaning-place-or-more-frequently",
      "canonicalPath": "cases.direction.canonicalResult"
    },
    "claim-p4452::p4452-the-stem-is-often-translated-at-in-to-from": {
      "assertionId": "classical-relational-relational-pa-direction-domain:p4452-the-stem-is-often-translated-at-in-to-from",
      "canonicalPath": "cases.directionNounstem.canonicalResult"
    },
    "claim-p4453::p4453-is-the-stem-of-the-demonstrative-pronoun-of-16": {
      "assertionId": "classical-relational-relational-pa-direction-domain:p4453-is-the-stem-of-the-demonstrative-pronoun-of-16",
      "canonicalPath": "cases.direction.stemId"
    },
    "claim-p4454::p4454-its-unexpected-use-here-is-apparently-due-to-its": {
      "assertionId": "classical-relational-relational-pa-direction-domain:p4454-its-unexpected-use-here-is-apparently-due-to-its",
      "canonicalPath": "cases.direction.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4451": [],
    "claim-p4452": [],
    "claim-p4453": [],
    "claim-p4454": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4451": "authorized",
    "claim-p4452": "authorized",
    "claim-p4453": "authorized",
    "claim-p4454": "authorized"
  }
};
export default Object.freeze(spec);
