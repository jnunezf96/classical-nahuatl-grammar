const spec = {
  "ownerId": "classical-supplementary-subject-binding",
  "prefix": "ClassicalSupplementarySubjectBinding",
  "operationId": "classical.supplementary.subject.binding.execute",
  "inputContract": "complete-typed-classical-supplementary-subject-binding-source",
  "domain": "classical-supplementary-subject-binding",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1794",
    "claim-p1795",
    "claim-p1796",
    "claim-p1797",
    "claim-p1798"
  ],
  "coordinates": {
    "claim-p1794::p1794-supplementary-subject-the-personal-pronoun-subject-of-the-adjunct": {
      "assertionId": "classical-supplementary-subject-binding:p1794-supplementary-subject-the-personal-pronoun-subject-of-the-adjunct",
      "canonicalPath": "shared.referenceFrame.headRole"
    },
    "claim-p1795::p1795-ni-of-the-supplement-its-head-ni-in-the": {
      "assertionId": "classical-supplementary-subject-binding:p1795-ni-of-the-supplement-its-head-ni-in-the",
      "canonicalPath": "shared.referenceFrame.supplementContactRole"
    },
    "claim-p1796::p1796-of-the-supplement-its-head-in-the-principal": {
      "assertionId": "classical-supplementary-subject-binding:p1796-of-the-supplement-its-head-in-the-principal",
      "canonicalPath": "shared.referenceFrame.referenceIdentityUnified"
    },
    "claim-p1797::p1797-t-h-of-the-supplement-its-head-ti-qu": {
      "assertionId": "classical-supplementary-subject-binding:p1797-t-h-of-the-supplement-its-head-ti-qu",
      "canonicalPath": "shared.referenceFrame.referenceRelationship"
    },
    "claim-p1798::p1798-h-of-the-supplement-its-head-h-in-the": {
      "assertionId": "classical-supplementary-subject-binding:p1798-h-of-the-supplement-its-head-h-in-the",
      "canonicalPath": "shared.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1794": [],
    "claim-p1795": [],
    "claim-p1796": [],
    "claim-p1797": [],
    "claim-p1798": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1794": "authorized",
    "claim-p1795": "authorized",
    "claim-p1796": "authorized",
    "claim-p1797": "authorized",
    "claim-p1798": "authorized"
  }
};
export default Object.freeze(spec);
