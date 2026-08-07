const spec = {
  "ownerId": "classical-vnc-supplementary-possessor-binding",
  "prefix": "ClassicalVncSupplementaryPossessorBinding",
  "operationId": "classical.vnc.supplementary.possessor.binding.execute",
  "inputContract": "complete-typed-classical-vnc-supplementary-possessor-binding-source",
  "domain": "classical-vnc-supplementary-possessor-binding",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1907",
    "claim-p1908"
  ],
  "coordinates": {
    "claim-p1907::p1907-the-possessive-pronoun-i-oficol-and-the-object-pronoun": {
      "assertionId": "classical-vnc-supplementary-possessor-binding:p1907-the-possessive-pronoun-i-oficol-and-the-object-pronoun",
      "canonicalPath": "vncPossessorSupplement.referenceFrame.headRole"
    },
    "claim-p1908::p1908-for-the-formation-of-ticmona-mictiznequi-see-25-3": {
      "assertionId": "classical-vnc-supplementary-possessor-binding:p1908-for-the-formation-of-ticmona-mictiznequi-see-25-3",
      "canonicalPath": "vncPossessorSupplement.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1907": [],
    "claim-p1908": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1907": "authorized",
    "claim-p1908": "authorized"
  }
};
export default Object.freeze(spec);
