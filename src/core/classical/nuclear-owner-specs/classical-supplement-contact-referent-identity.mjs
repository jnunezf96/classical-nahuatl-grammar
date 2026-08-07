const spec = {
  "ownerId": "classical-supplement-contact-referent-identity",
  "prefix": "ClassicalSupplementContactReferentIdentity",
  "operationId": "classical.supplement.contact.referent.identity.execute",
  "inputContract": "complete-typed-classical-supplement-contact-referent-identity-source",
  "domain": "classical-supplement-contact-referent-identity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1810"
  ],
  "coordinates": {
    "claim-p1810::p1810-since-the-point-of-contact-between-a-supplement-and": {
      "assertionId": "classical-supplement-contact-referent-identity:p1810-since-the-point-of-contact-between-a-supplement-and",
      "canonicalPath": "shared.referenceFrame.referenceRelationship"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1810": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1810": "authorized"
  }
};
export default Object.freeze(spec);
