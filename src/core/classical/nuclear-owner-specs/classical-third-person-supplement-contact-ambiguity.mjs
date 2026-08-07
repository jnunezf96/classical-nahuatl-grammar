const spec = {
  "ownerId": "classical-third-person-supplement-contact-ambiguity",
  "prefix": "ClassicalThirdPersonSupplementContactAmbiguity",
  "operationId": "classical.third.person.supplement.contact.ambiguity.execute",
  "inputContract": "complete-typed-classical-third-person-supplement-contact-ambiguity-source",
  "domain": "classical-third-person-supplement-contact-ambiguity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1815",
    "claim-p1816"
  ],
  "coordinates": {
    "claim-p1815::p1815-since-the-shared-referent-contact-between-two-nuclear-clauses": {
      "assertionId": "classical-third-person-supplement-contact-ambiguity:p1815-since-the-shared-referent-contact-between-two-nuclear-clauses",
      "canonicalPath": "extractedFrames.contactAlternatives.alternatives.0.headRole"
    },
    "claim-p1816::p1816-o-quittac-petoloh-a-peter-saw-him": {
      "assertionId": "classical-third-person-supplement-contact-ambiguity:p1816-o-quittac-petoloh-a-peter-saw-him",
      "canonicalPath": "extractedFrames.contactAlternatives.alternatives.1.headRole"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1815": [],
    "claim-p1816": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1815": "authorized",
    "claim-p1816": "authorized"
  }
};
export default Object.freeze(spec);
