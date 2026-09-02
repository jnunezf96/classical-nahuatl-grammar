const spec = {
  "ownerId": "classical-ichtequi-specific-object-restriction",
  "prefix": "ClassicalIchtequiSpecificObjectRestriction",
  "operationId": "classical.ichtequi.specific.object.restriction.execute",
  "inputContract": "complete-typed-classical-ichtequi-specific-object-restriction-source",
  "domain": "classical-ichtequi-specific-object-restriction",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-object-relationship-runtime",
  "selections": [
    "claim-p1862"
  ],
  "coordinates": {
    "claim-p1862::p1862-note-the-verb-ich-tequi-to-steal-literally-to": {
      "assertionId": "classical-ichtequi-specific-object-restriction:p1862-note-the-verb-ich-tequi-to-steal-literally-to",
      "canonicalPath": "constraints.ichtequiSpecificObjectOnly.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlObjectRelationshipValidationFrame",
  "executionValidatorName": "isClassicalNahuatlObjectRelationshipValidationFrame",
  "executionArgsBySelection": {
    "claim-p1862": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1862": "authorized"
  }
};
export default Object.freeze(spec);
