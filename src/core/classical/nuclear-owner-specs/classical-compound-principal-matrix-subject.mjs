const spec = {
  "ownerId": "classical-compound-principal-matrix-subject",
  "prefix": "ClassicalCompoundPrincipalMatrixSubject",
  "operationId": "classical.compound.principal.matrix.subject.execute",
  "inputContract": "complete-typed-classical-compound-principal-matrix-subject-source",
  "domain": "classical-compound-principal-matrix-subject",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2735"
  ],
  "coordinates": {
    "claim-p2735::p2735-the-subject-pronoun-in-the-compound-nuclear-clause-is": {
      "assertionId": "classical-compound-principal-matrix-subject:p2735-the-subject-pronoun-in-the-compound-nuclear-clause-is",
      "canonicalPath": "contract.principalSubjectFromMatrix"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2735": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2735": "authorized"
  }
};
export default Object.freeze(spec);
