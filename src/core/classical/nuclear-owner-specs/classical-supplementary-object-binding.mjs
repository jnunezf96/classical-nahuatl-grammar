const spec = {
  "ownerId": "classical-supplementary-object-binding",
  "prefix": "ClassicalSupplementaryObjectBinding",
  "operationId": "classical.supplementary.object.binding.execute",
  "inputContract": "complete-typed-classical-supplementary-object-binding-source",
  "domain": "classical-supplementary-object-binding",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1801",
    "claim-p1802"
  ],
  "coordinates": {
    "claim-p1801::p1801-supplementary-object-the-personal-pronoun-subject-of-the-adjunct": {
      "assertionId": "classical-supplementary-object-binding:p1801-supplementary-object-the-personal-pronoun-subject-of-the-adjunct",
      "canonicalPath": "object.referenceFrame.headRole"
    },
    "claim-p1802::p1802-ni-of-the-supplement-its-head-n-e-ch": {
      "assertionId": "classical-supplementary-object-binding:p1802-ni-of-the-supplement-its-head-n-e-ch",
      "canonicalPath": "object.referenceFrame.referenceIdentityUnified"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1801": [],
    "claim-p1802": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1801": "authorized",
    "claim-p1802": "authorized"
  }
};
export default Object.freeze(spec);
