const spec = {
  "ownerId": "classical-relational-ic-means-purpose-reason-time",
  "prefix": "ClassicalRelationalIcMeansPurposeReasonTime",
  "operationId": "classical.relational.ic.means.purpose.reason.time.execute",
  "inputContract": "complete-typed-classical-relational-ic-means-purpose-reason-time-source",
  "domain": "classical-relational-ic-means-purpose-reason-time",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4288",
    "claim-p4289"
  ],
  "coordinates": {
    "claim-p4288::p4288-its-basic-meaning-is-instrumental-but-as-can-be": {
      "assertionId": "classical-relational-ic-means-purpose-reason-time:p4288-its-basic-meaning-is-instrumental-but-as-can-be",
      "canonicalPath": "cases.icMeans.canonicalResult"
    },
    "claim-p4289::p4289-the-collocation-in-i-c-is-traditionally-written-solid": {
      "assertionId": "classical-relational-ic-means-purpose-reason-time:p4289-the-collocation-in-i-c-is-traditionally-written-solid",
      "canonicalPath": "cases.icPurpose.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4288": [],
    "claim-p4289": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4288": "authorized",
    "claim-p4289": "authorized"
  }
};
export default Object.freeze(spec);
