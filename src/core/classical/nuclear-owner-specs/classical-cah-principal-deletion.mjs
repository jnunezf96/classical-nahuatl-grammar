const spec = {
  "ownerId": "classical-cah-principal-deletion",
  "prefix": "ClassicalCahPrincipalDeletion",
  "operationId": "classical.cah.principal.deletion.execute",
  "inputContract": "complete-typed-classical-cah-principal-deletion-source",
  "domain": "classical-cah-principal-deletion",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1863",
    "claim-p1864",
    "claim-p1865"
  ],
  "coordinates": {
    "claim-p1863::p1863-under-certain-conditions-a-vnc-that-serves-as-a": {
      "assertionId": "classical-cah-principal-deletion:p1863-under-certain-conditions-a-vnc-that-serves-as-a",
      "canonicalPath": "deletedCahPrincipal.deletionKind"
    },
    "claim-p1864::p1864-since-the-head-of-the-supplementary": {
      "assertionId": "classical-cah-principal-deletion:p1864-since-the-head-of-the-supplementary",
      "canonicalPath": "deletedCahPrincipal.deletedPrincipalClause.unitKind"
    },
    "claim-p1865::p1865-subject-is-no-longer-present-what-was-the-supplementary": {
      "assertionId": "classical-cah-principal-deletion:p1865-subject-is-no-longer-present-what-was-the-supplementary",
      "canonicalPath": "deletedCahPrincipal.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1863": [],
    "claim-p1864": [],
    "claim-p1865": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1863": "authorized",
    "claim-p1864": "authorized",
    "claim-p1865": "authorized"
  }
};
export default Object.freeze(spec);
