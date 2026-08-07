const spec = {
  "ownerId": "classical-relational-locative-n-reflexive-possessor-and-readings",
  "prefix": "ClassicalRelationalLocativeNReflexivePossessorAndReadings",
  "operationId": "classical.relational.locative.n.reflexive.possessor.and.readings.execute",
  "inputContract": "complete-typed-classical-relational-locative-n-reflexive-possessor-and-readings-source",
  "domain": "classical-relational-locative-n-reflexive-possessor-and-readings",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4373",
    "claim-p4374",
    "claim-p4375",
    "claim-p4376",
    "claim-p4377"
  ],
  "coordinates": {
    "claim-p4373::p4373-when-the-active-voice-vnc-that-serves-as-the": {
      "assertionId": "classical-relational-locative-n-reflexive-possessor-and-readings:p4373-when-the-active-voice-vnc-that-serves-as-the",
      "canonicalPath": "cases.imperfectActive.canonicalResult"
    },
    "claim-p4374::p4374-when-the-active-voice-vnc-that-serves-as-the": {
      "assertionId": "classical-relational-locative-n-reflexive-possessor-and-readings:p4374-when-the-active-voice-vnc-that-serves-as-the",
      "canonicalPath": "cases.imperfectActive.sourceFormation"
    },
    "claim-p4375::p4375-obviously-the-possessor-pronoun-of-the-nnc-must-be": {
      "assertionId": "classical-relational-locative-n-reflexive-possessor-and-readings:p4375-obviously-the-possessor-pronoun-of-the-nnc-must-be",
      "canonicalPath": "cases.imperfectActive.sourceState"
    },
    "claim-p4376::p4376-the-temporal-meaning-shown-in-the-two-previous-examples": {
      "assertionId": "classical-relational-locative-n-reflexive-possessor-and-readings:p4376-the-temporal-meaning-shown-in-the-two-previous-examples",
      "canonicalPath": "cases.imperfectActive.canonicalResult"
    },
    "claim-p4377::p4377-this-formation-also-creates-nncs-that-are-translated-by": {
      "assertionId": "classical-relational-locative-n-reflexive-possessor-and-readings:p4377-this-formation-also-creates-nncs-that-are-translated-by",
      "canonicalPath": "cases.imperfectActive.sourceFormation"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4373": [],
    "claim-p4374": [],
    "claim-p4375": [],
    "claim-p4376": [],
    "claim-p4377": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4373": "authorized",
    "claim-p4374": "authorized",
    "claim-p4375": "authorized",
    "claim-p4376": "authorized",
    "claim-p4377": "authorized"
  }
};
export default Object.freeze(spec);
