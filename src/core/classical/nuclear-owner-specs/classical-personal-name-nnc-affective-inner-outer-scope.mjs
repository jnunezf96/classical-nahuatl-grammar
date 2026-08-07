const spec = {
  "ownerId": "classical-personal-name-nnc-affective-inner-outer-scope",
  "prefix": "ClassicalPersonalNameNncAffectiveInnerOuterScope",
  "operationId": "classical.personal.name.nnc.affective.inner.outer.scope.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-affective-inner-outer-scope-source",
  "domain": "classical-personal-name-nnc-affective-inner-outer-scope",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5207",
    "claim-p5208",
    "claim-p5209"
  ],
  "coordinates": {
    "claim-p5207::p5207-the-affective-matrix-has-the-option-of-embedding-either": {
      "assertionId": "classical-personal-name-nnc-affective-inner-outer-scope:p5207-the-affective-matrix-has-the-option-of-embedding-either",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5208::p5208-the-formation-can-be-ambiguous-however": {
      "assertionId": "classical-personal-name-nnc-affective-inner-outer-scope:p5208-the-formation-can-be-ambiguous-however",
      "canonicalPath": "result.innerSubjectBarrier"
    },
    "claim-p5209::p5209-the-latter-is-exemplified-in-the-following-nncs-in": {
      "assertionId": "classical-personal-name-nnc-affective-inner-outer-scope:p5209-the-latter-is-exemplified-in-the-following-nncs-in",
      "canonicalPath": "result.sourceFamily"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5207": [
      "affective-inner-outer-scope",
      "absolutive-state-nnc",
      "inner-affective",
      ""
    ],
    "claim-p5208": [
      "affective-inner-outer-scope",
      "absolutive-state-nnc",
      "inner-affective",
      ""
    ],
    "claim-p5209": [
      "affective-inner-outer-scope",
      "absolutive-state-nnc",
      "inner-affective",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5207": "authorized",
    "claim-p5208": "authorized",
    "claim-p5209": "authorized"
  }
};
export default Object.freeze(spec);
