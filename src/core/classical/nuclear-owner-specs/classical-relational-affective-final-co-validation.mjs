const spec = {
  "ownerId": "classical-relational-affective-final-co-validation",
  "prefix": "ClassicalRelationalAffectiveFinalCoValidation",
  "operationId": "classical.relational.affective.final.co.validation.execute",
  "inputContract": "complete-typed-classical-relational-affective-final-co-validation-source",
  "domain": "classical-relational-affective-final-co-validation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4250",
    "claim-p4251"
  ],
  "coordinates": {
    "claim-p4250::p4250-first-the-relational-stem-follows-the-normal-procedure-of": {
      "assertionId": "classical-relational-affective-final-co-validation:p4250-first-the-relational-stem-follows-the-normal-procedure-of",
      "canonicalPath": "cases.affective.canonicalResult"
    },
    "claim-p4251::p4251-for-example-ipan-on-its-surface-becomes-not-ipantzin": {
      "assertionId": "classical-relational-affective-final-co-validation:p4251-for-example-ipan-on-its-surface-becomes-not-ipantzin",
      "canonicalPath": "cases.affective.operationTrace"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4250": [],
    "claim-p4251": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4250": "authorized",
    "claim-p4251": "authorized"
  }
};
export default Object.freeze(spec);
