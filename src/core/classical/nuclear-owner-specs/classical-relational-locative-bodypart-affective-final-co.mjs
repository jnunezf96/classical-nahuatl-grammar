const spec = {
  "ownerId": "classical-relational-locative-bodypart-affective-final-co",
  "prefix": "ClassicalRelationalLocativeBodypartAffectiveFinalCo",
  "operationId": "classical.relational.locative.bodypart.affective.final.co.execute",
  "inputContract": "complete-typed-classical-relational-locative-bodypart-affective-final-co-source",
  "domain": "classical-relational-locative-bodypart-affective-final-co",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4439",
    "claim-p4440",
    "claim-p4441",
    "claim-p4442",
    "claim-p4443"
  ],
  "coordinates": {
    "claim-p4439::p4439-the-honorific-form-of-na-hua-c-tli-is": {
      "assertionId": "classical-relational-locative-bodypart-affective-final-co:p4439-the-honorific-form-of-na-hua-c-tli-is",
      "canonicalPath": "cases.coAffective.canonicalResult"
    },
    "claim-p4440::p4440-the-honorific-form-of-ix-co-is-ix-tzin": {
      "assertionId": "classical-relational-locative-bodypart-affective-final-co:p4440-the-honorific-form-of-ix-co-is-ix-tzin",
      "canonicalPath": "cases.coAffective.stemId"
    },
    "claim-p4441::p4441-the-honorific-form-of-tepotz-co-is-tepotz-tzin": {
      "assertionId": "classical-relational-locative-bodypart-affective-final-co:p4441-the-honorific-form-of-tepotz-co-is-tepotz-tzin",
      "canonicalPath": "cases.coAffective.typedOperationAuthority"
    },
    "claim-p4442::p4442-the-honorific-form-of-tzon-co-is-tzon-tzin": {
      "assertionId": "classical-relational-locative-bodypart-affective-final-co:p4442-the-honorific-form-of-tzon-co-is-tzon-tzin",
      "canonicalPath": "cases.coAffective.canonicalResult"
    },
    "claim-p4443::p4443-the-honorific-form-of-yo-l-lo-h-co": {
      "assertionId": "classical-relational-locative-bodypart-affective-final-co:p4443-the-honorific-form-of-yo-l-lo-h-co",
      "canonicalPath": "cases.coAffective.stemId"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4439": [],
    "claim-p4440": [],
    "claim-p4441": [],
    "claim-p4442": [],
    "claim-p4443": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4439": "authorized",
    "claim-p4440": "authorized",
    "claim-p4441": "authorized",
    "claim-p4442": "authorized",
    "claim-p4443": "authorized"
  }
};
export default Object.freeze(spec);
