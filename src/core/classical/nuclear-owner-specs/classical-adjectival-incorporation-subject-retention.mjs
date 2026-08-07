const spec = {
  "ownerId": "classical-adjectival-incorporation-subject-retention",
  "prefix": "ClassicalAdjectivalIncorporationSubjectRetention",
  "operationId": "classical.adjectival.incorporation.subject.retention.execute",
  "inputContract": "complete-typed-classical-adjectival-incorporation-subject-retention-source",
  "domain": "classical-adjectival-incorporation-subject-retention",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4083"
  ],
  "coordinates": {
    "claim-p4083::p4083-as-in-the-other-instances-of-incorporation-of-concatenated": {
      "assertionId": "classical-adjectival-incorporation-subject-retention:p4083-as-in-the-other-instances-of-incorporation-of-concatenated",
      "canonicalPath": "sources.compoundNnc.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4083": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4083": "authorized"
  }
};
export default Object.freeze(spec);
