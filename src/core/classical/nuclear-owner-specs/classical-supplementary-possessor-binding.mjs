const spec = {
  "ownerId": "classical-supplementary-possessor-binding",
  "prefix": "ClassicalSupplementaryPossessorBinding",
  "operationId": "classical.supplementary.possessor.binding.execute",
  "inputContract": "complete-typed-classical-supplementary-possessor-binding-source",
  "domain": "classical-supplementary-possessor-binding",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1803",
    "claim-p1804",
    "claim-p1805",
    "claim-p1806",
    "claim-p1807",
    "claim-p1808"
  ],
  "coordinates": {
    "claim-p1803::p1803-supplementary-possessor-the-personal-pronoun-subject-of-the-adjunct": {
      "assertionId": "classical-supplementary-possessor-binding:p1803-supplementary-possessor-the-personal-pronoun-subject-of-the-adjunct",
      "canonicalPath": "possessor.referenceFrame.headRole"
    },
    "claim-p1804::p1804-ni-of-the-supplement-its-head-n-o-in": {
      "assertionId": "classical-supplementary-possessor-binding:p1804-ni-of-the-supplement-its-head-n-o-in",
      "canonicalPath": "possessor.referenceFrame.principalHead.id"
    },
    "claim-p1805::p1805-as-a-consequence-of-nnc-structure-nahuatl-does-not": {
      "assertionId": "classical-supplementary-possessor-binding:p1805-as-a-consequence-of-nnc-structure-nahuatl-does-not",
      "canonicalPath": "possessor.referenceFrame.referenceIdentityUnified"
    },
    "claim-p1806::p1806-nahuatl-must-rely-on-this-supplementary-possessor-construction": {
      "assertionId": "classical-supplementary-possessor-binding:p1806-nahuatl-must-rely-on-this-supplementary-possessor-construction",
      "canonicalPath": "possessor.principalClause.unitKind"
    },
    "claim-p1807::p1807-they-are-my-fields-the-supplementary-possessor-merely-adds": {
      "assertionId": "classical-supplementary-possessor-binding:p1807-they-are-my-fields-the-supplementary-possessor-merely-adds",
      "canonicalPath": "possessor.supplementClause.unitKind"
    },
    "claim-p1808::p1808-mother-hu-a-n-of-the-supplement-its-head": {
      "assertionId": "classical-supplementary-possessor-binding:p1808-mother-hu-a-n-of-the-supplement-its-head",
      "canonicalPath": "possessor.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1803": [],
    "claim-p1804": [],
    "claim-p1805": [],
    "claim-p1806": [],
    "claim-p1807": [],
    "claim-p1808": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1803": "authorized",
    "claim-p1804": "authorized",
    "claim-p1805": "authorized",
    "claim-p1806": "authorized",
    "claim-p1807": "authorized",
    "claim-p1808": "authorized"
  }
};
export default Object.freeze(spec);
