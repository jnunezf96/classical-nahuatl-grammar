const spec = {
  "ownerId": "classical-applicative-source-reflexive-shuntline-transform",
  "prefix": "ClassicalApplicativeSourceReflexiveShuntlineTransform",
  "operationId": "classical.applicative.source.reflexive.shuntline.transform.execute",
  "inputContract": "complete-typed-classical-applicative-source-reflexive-shuntline-transform-source",
  "domain": "classical-applicative-source-reflexive-shuntline-transform",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-applicative-runtime",
  "selections": [
    "claim-p2556",
    "claim-p2557"
  ],
  "coordinates": {
    "claim-p2556::p2556-contrast-the-following-formations": {
      "assertionId": "classical-applicative-source-reflexive-shuntline-transform:p2556-contrast-the-following-formations",
      "canonicalPath": "participants.doubleReflexiveSource.targetObjectRequests.0.objectPerson"
    },
    "claim-p2557::p2557-if-a-reflexive-object-pronoun-occurs-in-a-source": {
      "assertionId": "classical-applicative-source-reflexive-shuntline-transform:p2557-if-a-reflexive-object-pronoun-occurs-in-a-source",
      "canonicalPath": "participants.doubleReflexiveSource.targetObjectRequests.1.governor"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlApplicativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2556": [],
    "claim-p2557": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2556": "authorized",
    "claim-p2557": "authorized"
  }
};
export default Object.freeze(spec);
