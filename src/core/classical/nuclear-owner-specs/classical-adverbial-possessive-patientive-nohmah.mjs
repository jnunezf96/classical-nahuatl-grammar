const spec = {
  "ownerId": "classical-adverbial-possessive-patientive-nohmah",
  "prefix": "ClassicalAdverbialPossessivePatientiveNohmah",
  "operationId": "classical.adverbial.possessive.patientive.nohmah.execute",
  "inputContract": "complete-typed-classical-adverbial-possessive-patientive-nohmah-source",
  "domain": "classical-adverbial-possessive-patientive-nohmah",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4214",
    "claim-p4215"
  ],
  "coordinates": {
    "claim-p4214::p4214-nncs-can-be-built-on-the-perfective-patientive-nounstem": {
      "assertionId": "classical-adverbial-possessive-patientive-nohmah:p4214-nncs-can-be-built-on-the-perfective-patientive-nounstem",
      "canonicalPath": "cases.possessivePatientive.canonicalResult"
    },
    "claim-p4215::p4215-while-this-stem-is-evidently-related-to-the-adverbialized": {
      "assertionId": "classical-adverbial-possessive-patientive-nohmah:p4215-while-this-stem-is-evidently-related-to-the-adverbialized",
      "canonicalPath": "cases.possessivePatientive.lexicalEntryId"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4214": [],
    "claim-p4215": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4214": "authorized",
    "claim-p4215": "authorized"
  }
};
export default Object.freeze(spec);
