const spec = {
  "ownerId": "classical-personal-name-nnc-outer-affective-forced-zero",
  "prefix": "ClassicalPersonalNameNncOuterAffectiveForcedZero",
  "operationId": "classical.personal.name.nnc.outer.affective.forced.zero.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-outer-affective-forced-zero-source",
  "domain": "classical-personal-name-nnc-outer-affective-forced-zero",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5210"
  ],
  "coordinates": {
    "claim-p5210::p5210-the-affective-matrix-stem-always-forces-the-inner-subject": {
      "assertionId": "classical-personal-name-nnc-outer-affective-forced-zero:p5210-the-affective-matrix-stem-always-forces-the-inner-subject",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5210": [
      "outer-affective-forced-zero",
      "absolutive-state-nnc",
      "outer-affective",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5210": "authorized"
  }
};
export default Object.freeze(spec);
