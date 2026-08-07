const spec = {
  "ownerId": "classical-attitude-honorific-gate",
  "prefix": "ClassicalAttitudeHonorificGate",
  "operationId": "classical.attitude.honorific.gate.execute",
  "inputContract": "complete-typed-classical-attitude-honorific-gate-source",
  "domain": "classical-attitude-honorific-gate",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-attitude-vnc-runtime",
  "selections": [
    "claim-p3205",
    "claim-p3206",
    "claim-p3207",
    "claim-p3208"
  ],
  "coordinates": {
    "claim-p3205::p3205-an-honorific-vnc-indicates-an-attitude-of-respect-or": {
      "assertionId": "classical-attitude-honorific-gate:p3205-an-honorific-vnc-indicates-an-attitude-of-respect-or",
      "canonicalPath": "cases.honorificGate.rules.honorific-gate"
    },
    "claim-p3206::p3206-obviously-to-avoid-the-odium-of-presumption-one-should": {
      "assertionId": "classical-attitude-honorific-gate:p3206-obviously-to-avoid-the-odium-of-presumption-one-should",
      "canonicalPath": "cases.honorificGate.authorizationStatus"
    },
    "claim-p3207::p3207-the-honorific-vnc-is-created-by-transforming-a-neutral": {
      "assertionId": "classical-attitude-honorific-gate:p3207-the-honorific-vnc-is-created-by-transforming-a-neutral",
      "canonicalPath": "cases.honorificGate.gcdSatisfied"
    },
    "claim-p3208::p3208-if-however-the-neutral-vnc-has-a-mainline-reflexive": {
      "assertionId": "classical-attitude-honorific-gate:p3208-if-however-the-neutral-vnc-has-a-mainline-reflexive",
      "canonicalPath": "cases.honorificGate.lcmComplete"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAttitudeVncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAttitudeVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3205": [],
    "claim-p3206": [],
    "claim-p3207": [],
    "claim-p3208": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3205": "authorized",
    "claim-p3206": "authorized",
    "claim-p3207": "authorized",
    "claim-p3208": "authorized"
  }
};
export default Object.freeze(spec);
