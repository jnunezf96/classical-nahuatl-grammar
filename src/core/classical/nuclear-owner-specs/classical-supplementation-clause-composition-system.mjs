const spec = {
  "ownerId": "classical-supplementation-clause-composition-system",
  "prefix": "ClassicalSupplementationClauseCompositionSystem",
  "operationId": "classical.supplementation.clause.composition.system.execute",
  "inputContract": "complete-typed-classical-supplementation-clause-composition-system-source",
  "domain": "classical-supplementation-clause-composition-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1770",
    "claim-p1771",
    "claim-p1772"
  ],
  "coordinates": {
    "claim-p1770::p1770-until-now-the-only-kind-of-syntactical-group-dealt": {
      "assertionId": "classical-supplementation-clause-composition-system:p1770-until-now-the-only-kind-of-syntactical-group-dealt",
      "canonicalPath": "operationRequest.operationKind"
    },
    "claim-p1771::p1771-it-is-now-time-to-consider-concatenate-structures-created": {
      "assertionId": "classical-supplementation-clause-composition-system:p1771-it-is-now-time-to-consider-concatenate-structures-created",
      "canonicalPath": "shared.kind"
    },
    "claim-p1772::p1772-only-one-type-of-this-kind-of-syntactical-group": {
      "assertionId": "classical-supplementation-clause-composition-system:p1772-only-one-type-of-this-kind-of-syntactical-group",
      "canonicalPath": "paradigm.scalarBuilder"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1770": [],
    "claim-p1771": [],
    "claim-p1772": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1770": "authorized",
    "claim-p1771": "authorized",
    "claim-p1772": "authorized"
  }
};
export default Object.freeze(spec);
