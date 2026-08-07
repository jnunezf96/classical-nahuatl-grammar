const spec = {
  "ownerId": "classical-gcd-deverbal-core-derivation",
  "prefix": "ClassicalGcdDeverbalCoreDerivation",
  "operationId": "classical.gcd.deverbal.core.derivation.execute",
  "inputContract": "complete-typed-classical-gcd-deverbal-core-derivation-source",
  "domain": "classical-gcd-deverbal-core-derivation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3622",
    "claim-p3623"
  ],
  "coordinates": {
    "claim-p3622::p3622-a-deverbal-nounstem-is-a-nounstem-that-is-derived": {
      "assertionId": "classical-gcd-deverbal-core-derivation:p3622-a-deverbal-nounstem-is-a-nounstem-that-is-derived",
      "canonicalPath": "cases.deverbalCoreDerivation.authorizationStatus"
    },
    "claim-p3623::p3623-it-is-not-formed-from-a-vnc-predicate-like": {
      "assertionId": "classical-gcd-deverbal-core-derivation:p3623-it-is-not-formed-from-a-vnc-predicate-like",
      "canonicalPath": "cases.deverbalCoreDerivation.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3622": [],
    "claim-p3623": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3622": "authorized",
    "claim-p3623": "authorized"
  }
};
export default Object.freeze(spec);
