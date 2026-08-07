const spec = {
  "ownerId": "classical-patientive-compound-source",
  "prefix": "ClassicalPatientiveCompoundSource",
  "operationId": "classical.patientive.compound.source.execute",
  "inputContract": "complete-typed-classical-patientive-compound-source-source",
  "domain": "classical-patientive-compound-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3738",
    "claim-p3739",
    "claim-p3740",
    "claim-p3741",
    "claim-p3742"
  ],
  "coordinates": {
    "claim-p3738::p3738-passive-and-impersonal-patientive-nounstems-may-be-compound-in": {
      "assertionId": "classical-patientive-compound-source:p3738-passive-and-impersonal-patientive-nounstems-may-be-compound-in",
      "canonicalPath": "cases.patientiveCompoundSource.authorizationStatus"
    },
    "claim-p3739::p3739-when-the-source-verbstem-has-an-adverbial-embed-the": {
      "assertionId": "classical-patientive-compound-source:p3739-when-the-source-verbstem-has-an-adverbial-embed-the",
      "canonicalPath": "cases.patientiveCompoundSource.canonicalResult"
    },
    "claim-p3740::p3740-the-source-of-the-patientive-nounstem-may-be-a": {
      "assertionId": "classical-patientive-compound-source:p3740-the-source-of-the-patientive-nounstem-may-be-a",
      "canonicalPath": "cases.patientiveCompoundSource.gcdSatisfied"
    },
    "claim-p3741::p3741-ah-huech-tli-ah-huach-tli-a-thing-that": {
      "assertionId": "classical-patientive-compound-source:p3741-ah-huech-tli-ah-huach-tli-a-thing-that",
      "canonicalPath": "cases.patientiveCompoundSource.lcmComplete"
    },
    "claim-p3742::p3742-when-however-the-source-of-the-patientive-nounstem-is": {
      "assertionId": "classical-patientive-compound-source:p3742-when-however-the-source-of-the-patientive-nounstem-is",
      "canonicalPath": "cases.patientiveCompoundSource.patientiveSourceFamily"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3738": [],
    "claim-p3739": [],
    "claim-p3740": [],
    "claim-p3741": [],
    "claim-p3742": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3738": "authorized",
    "claim-p3739": "authorized",
    "claim-p3740": "authorized",
    "claim-p3741": "authorized",
    "claim-p3742": "authorized"
  }
};
export default Object.freeze(spec);
