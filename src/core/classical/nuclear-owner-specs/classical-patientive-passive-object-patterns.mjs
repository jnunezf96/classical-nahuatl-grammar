const spec = {
  "ownerId": "classical-patientive-passive-object-patterns",
  "prefix": "ClassicalPatientivePassiveObjectPatterns",
  "operationId": "classical.patientive.passive.object.patterns.execute",
  "inputContract": "complete-typed-classical-patientive-passive-object-patterns-source",
  "domain": "classical-patientive-passive-object-patterns",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3699",
    "claim-p3700",
    "claim-p3701",
    "claim-p3702"
  ],
  "coordinates": {
    "claim-p3699::p3699-if-the-passive-vnc-source-is-reflexive-the-shuntline": {
      "assertionId": "classical-patientive-passive-object-patterns:p3699-if-the-passive-vnc-source-is-reflexive-the-shuntline",
      "canonicalPath": "cases.patientivePassiveObjectPatterns.authorizationStatus"
    },
    "claim-p3700::p3700-if-the-passive-vnc-source-is-derived-from-a": {
      "assertionId": "classical-patientive-passive-object-patterns:p3700-if-the-passive-vnc-source-is-derived-from-a",
      "canonicalPath": "cases.patientivePassiveObjectPatterns.allCanonical"
    },
    "claim-p3701::p3701-when-the-object-pronoun-on-the-passive-vnc-source": {
      "assertionId": "classical-patientive-passive-object-patterns:p3701-when-the-object-pronoun-on-the-passive-vnc-source",
      "canonicalPath": "cases.patientivePassiveObjectPatterns.records.2.authorizationIds.0"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3699": [],
    "claim-p3700": [],
    "claim-p3701": [],
    "claim-p3702": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3699": "authorized",
    "claim-p3700": "authorized",
    "claim-p3701": "authorized",
    "claim-p3702": "authorized"
  }
};
export default Object.freeze(spec);
