const spec = {
  "ownerId": "classical-lo-class-a-formation",
  "prefix": "ClassicalLoClassAFormation",
  "operationId": "classical.lo.class.a.formation.execute",
  "inputContract": "complete-typed-classical-lo-class-a-formation-source",
  "domain": "classical-lo-class-a-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p1984",
    "claim-p1985",
    "claim-p1986",
    "claim-p1987"
  ],
  "coordinates": {
    "claim-p1984::p1984-chihcha-to-spit": {
      "assertionId": "classical-lo-class-a-formation:p1984-chihcha-to-spit",
      "canonicalPath": "nonactive.loClassA.authorizationStatus"
    },
    "claim-p1985::p1985-tla-pa-tz-ca-to-squeeze-liquid-from-s": {
      "assertionId": "classical-lo-class-a-formation:p1985-tla-pa-tz-ca-to-squeeze-liquid-from-s",
      "canonicalPath": "nonactive.loClassA.options.0.suffixFamily"
    },
    "claim-p1986::p1986-tla-pa-tla-to-exchange-s-th": {
      "assertionId": "classical-lo-class-a-formation:p1986-tla-pa-tla-to-exchange-s-th",
      "canonicalPath": "nonactive.loClassA.options.0.nonactiveStem"
    },
    "claim-p1987::p1987-tla-mo-tla-to-throw-rocks-at-s-th": {
      "assertionId": "classical-lo-class-a-formation:p1987-tla-mo-tla-to-throw-rocks-at-s-th",
      "canonicalPath": "nonactive.loClassA.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p1984": [],
    "claim-p1985": [],
    "claim-p1986": [],
    "claim-p1987": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1984": "authorized",
    "claim-p1985": "authorized",
    "claim-p1986": "authorized",
    "claim-p1987": "authorized"
  }
};
export default Object.freeze(spec);
