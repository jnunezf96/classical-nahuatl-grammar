const spec = {
  "ownerId": "classical-adverbial-vnc-possessive-first-degree-restriction",
  "prefix": "ClassicalAdverbialVncPossessiveFirstDegreeRestriction",
  "operationId": "classical.adverbial.vnc.possessive.first.degree.restriction.execute",
  "inputContract": "complete-typed-classical-adverbial-vnc-possessive-first-degree-restriction-source",
  "domain": "classical-adverbial-vnc-possessive-first-degree-restriction",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4144",
    "claim-p4145"
  ],
  "coordinates": {
    "claim-p4144::p4144-vncs-and-possessive-state-nncs-permit-only-first-degree": {
      "assertionId": "classical-adverbial-vnc-possessive-first-degree-restriction:p4144-vncs-and-possessive-state-nncs-permit-only-first-degree",
      "canonicalPath": "blockedCases.vncSecondDegree.authorizationStatus"
    },
    "claim-p4145::p4145-in-these-formations-therefore-the-nuclear-clause-may-be": {
      "assertionId": "classical-adverbial-vnc-possessive-first-degree-restriction:p4145-in-these-formations-therefore-the-nuclear-clause-may-be",
      "canonicalPath": "blockedCases.vncSecondDegree.blockReason"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4144": [],
    "claim-p4145": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4144": "authorized",
    "claim-p4145": "authorized"
  }
};
export default Object.freeze(spec);
