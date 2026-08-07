const spec = {
  "ownerId": "classical-relational-locative-nahuac-ownerhood-and-nnc",
  "prefix": "ClassicalRelationalLocativeNahuacOwnerhoodAndNnc",
  "operationId": "classical.relational.locative.nahuac.ownerhood.and.nnc.execute",
  "inputContract": "complete-typed-classical-relational-locative-nahuac-ownerhood-and-nnc-source",
  "domain": "classical-relational-locative-nahuac-ownerhood-and-nnc",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4437",
    "claim-p4438"
  ],
  "coordinates": {
    "claim-p4437::p4437-the-compound-nounstem-na-hua-c-tli-may-be": {
      "assertionId": "classical-relational-locative-nahuac-ownerhood-and-nnc:p4437-the-compound-nounstem-na-hua-c-tli-may-be",
      "canonicalPath": "cases.cBodyPart.canonicalResult"
    },
    "claim-p4438::p4438-the-compound-stem-can-occur-in-a-nonadverbialized-nnc": {
      "assertionId": "classical-relational-locative-nahuac-ownerhood-and-nnc:p4438-the-compound-stem-can-occur-in-a-nonadverbialized-nnc",
      "canonicalPath": "cases.cBodyPart.sourceKind"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4437": [],
    "claim-p4438": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4437": "authorized",
    "claim-p4438": "authorized"
  }
};
export default Object.freeze(spec);
