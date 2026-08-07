const spec = {
  "ownerId": "classical-adverbial-adjunction-purpose-purposive-vnc",
  "prefix": "ClassicalAdverbialAdjunctionPurposePurposiveVnc",
  "operationId": "classical.adverbial.adjunction.purpose.purposive.vnc.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-purpose-purposive-vnc-source",
  "domain": "classical-adverbial-adjunction-purpose-purposive-vnc",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4730",
    "claim-p4731"
  ],
  "coordinates": {
    "claim-p4730::p4730-the-purposive-vncs-of-lesson-29-may-be-combined": {
      "assertionId": "classical-adverbial-adjunction-purpose-purposive-vnc:p4730-the-purposive-vncs-of-lesson-29-may-be-combined",
      "canonicalPath": "analysis.purposiveVncMayServeAsAdjunct"
    },
    "claim-p4731::p4731-the-purposive-vncs-may-be-used-in-the-more": {
      "assertionId": "classical-adverbial-adjunction-purpose-purposive-vnc:p4731-the-purposive-vncs-may-be-used-in-the-more",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4730": [
      "purpose-purposive-vnc"
    ],
    "claim-p4731": [
      "purpose-purposive-vnc"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4730": "authorized",
    "claim-p4731": "authorized"
  }
};
export default Object.freeze(spec);
