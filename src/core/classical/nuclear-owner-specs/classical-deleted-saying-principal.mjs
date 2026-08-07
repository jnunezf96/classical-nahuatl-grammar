const spec = {
  "ownerId": "classical-deleted-saying-principal",
  "prefix": "ClassicalDeletedSayingPrincipal",
  "operationId": "classical.deleted.saying.principal.execute",
  "inputContract": "complete-typed-classical-deleted-saying-principal-source",
  "domain": "classical-deleted-saying-principal",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1970",
    "claim-p1971"
  ],
  "coordinates": {
    "claim-p1970::p1970-with-vncs-expressing-a-speech-action-such-as-to": {
      "assertionId": "classical-deleted-saying-principal:p1970-with-vncs-expressing-a-speech-action-such-as-to",
      "canonicalPath": "deletedSaying.deletionKind"
    },
    "claim-p1971::p1971-in-the-following-example-the-deletion-of-the-verb": {
      "assertionId": "classical-deleted-saying-principal:p1971-in-the-following-example-the-deletion-of-the-verb",
      "canonicalPath": "deletedSaying.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1970": [],
    "claim-p1971": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1970": "authorized",
    "claim-p1971": "authorized"
  }
};
export default Object.freeze(spec);
