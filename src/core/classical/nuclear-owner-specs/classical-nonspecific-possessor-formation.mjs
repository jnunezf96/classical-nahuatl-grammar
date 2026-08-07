const spec = {
  "ownerId": "classical-nonspecific-possessor-formation",
  "prefix": "ClassicalNonspecificPossessorFormation",
  "operationId": "classical.nonspecific.possessor.formation.execute",
  "inputContract": "complete-typed-classical-nonspecific-possessor-formation-source",
  "domain": "classical-nonspecific-possessor-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nnc-layer-evaluator",
  "selections": [
    "claim-p1400"
  ],
  "coordinates": {
    "claim-p1400::p1400-the-nonspecific-possessor-morph-like-the-nonspecific-object-morphs": {
      "assertionId": "classical-nonspecific-possessor-formation:p1400-the-nonspecific-possessor-morph-like-the-nonspecific-object-morphs",
      "canonicalPath": "contractMonadicPossessorShapes.1.st"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPossessiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPossessiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1400": [
      "monadic-te"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1400": "authorized"
  }
};
export default Object.freeze(spec);
