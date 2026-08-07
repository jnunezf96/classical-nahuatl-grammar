const spec = {
  "ownerId": "classical-purposive-contextual-interpretation",
  "prefix": "ClassicalPurposiveContextualInterpretation",
  "operationId": "classical.purposive.contextual.interpretation.execute",
  "inputContract": "complete-typed-classical-purposive-contextual-interpretation-source",
  "domain": "classical-purposive-contextual-interpretation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-purposive-runtime",
  "selections": [
    "claim-p2958",
    "claim-p2959"
  ],
  "coordinates": {
    "claim-p2958::p2958-note-a-purposive-vnc-can-shift-the-normal-meaning": {
      "assertionId": "classical-purposive-contextual-interpretation:p2958-note-a-purposive-vnc-can-shift-the-normal-meaning",
      "canonicalPath": "contract.interpretationReadings.1"
    },
    "claim-p2959::p2959-the-notion-of-movement-may-be-metaphorical-and-the": {
      "assertionId": "classical-purposive-contextual-interpretation:p2959-the-notion-of-movement-may-be-metaphorical-and-the",
      "canonicalPath": "contract.interpretationReadings.2"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPurposiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPurposiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p2958": [],
    "claim-p2959": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2958": "authorized",
    "claim-p2959": "authorized"
  }
};
export default Object.freeze(spec);
