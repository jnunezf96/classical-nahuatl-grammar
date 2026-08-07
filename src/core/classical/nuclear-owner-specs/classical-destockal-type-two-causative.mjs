const spec = {
  "ownerId": "classical-destockal-type-two-causative",
  "prefix": "ClassicalDestockalTypeTwoCausative",
  "operationId": "classical.destockal.type.two.causative.execute",
  "inputContract": "complete-typed-classical-destockal-type-two-causative-source",
  "domain": "classical-destockal-type-two-causative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2708"
  ],
  "coordinates": {
    "claim-p2708::p2708-it-is-possible-although-not-frequent-for-an-frequentative": {
      "assertionId": "classical-destockal-type-two-causative:p2708-it-is-possible-although-not-frequent-for-an-frequentative",
      "canonicalPath": "cases.destockalTypeTwo.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2708": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2708": "authorized"
  }
};
export default Object.freeze(spec);
