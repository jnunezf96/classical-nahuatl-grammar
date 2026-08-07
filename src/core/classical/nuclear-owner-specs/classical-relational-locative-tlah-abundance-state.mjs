const spec = {
  "ownerId": "classical-relational-locative-tlah-abundance-state",
  "prefix": "ClassicalRelationalLocativeTlahAbundanceState",
  "operationId": "classical.relational.locative.tlah.abundance.state.execute",
  "inputContract": "complete-typed-classical-relational-locative-tlah-abundance-state-source",
  "domain": "classical-relational-locative-tlah-abundance-state",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4397",
    "claim-p4398",
    "claim-p4399",
    "claim-p4400",
    "claim-p4401"
  ],
  "coordinates": {
    "claim-p4397::p4397-the-nounstem-tlah-tli-serves-as-the-matrix-in": {
      "assertionId": "classical-relational-locative-tlah-abundance-state:p4397-the-nounstem-tlah-tli-serves-as-the-matrix-in",
      "canonicalPath": "cases.tlahAbsolutive.canonicalResult"
    },
    "claim-p4398::p4398-the-compound-stem-may-form-either-an-absolutive-or": {
      "assertionId": "classical-relational-locative-tlah-abundance-state:p4398-the-compound-stem-may-form-either-an-absolutive-or",
      "canonicalPath": "cases.tlahPossessive.canonicalResult"
    },
    "claim-p4399::p4399-in-the-following-examples-when-the-subject-pronoun-is": {
      "assertionId": "classical-relational-locative-tlah-abundance-state:p4399-in-the-following-examples-when-the-subject-pronoun-is",
      "canonicalPath": "cases.tlahPossessive.sourceState"
    },
    "claim-p4400::p4400-the-subject-pronoun-of-this-nnc-may-be-either": {
      "assertionId": "classical-relational-locative-tlah-abundance-state:p4400-the-subject-pronoun-of-this-nnc-may-be-either",
      "canonicalPath": "cases.tlahAbsolutive.canonicalResult"
    },
    "claim-p4401::p4401-when-the-subject-pronoun-is-adverbialized": {
      "assertionId": "classical-relational-locative-tlah-abundance-state:p4401-when-the-subject-pronoun-is-adverbialized",
      "canonicalPath": "cases.tlahPossessive.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4397": [],
    "claim-p4398": [],
    "claim-p4399": [],
    "claim-p4400": [],
    "claim-p4401": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4397": "authorized",
    "claim-p4398": "authorized",
    "claim-p4399": "authorized",
    "claim-p4400": "authorized",
    "claim-p4401": "authorized"
  }
};
export default Object.freeze(spec);
