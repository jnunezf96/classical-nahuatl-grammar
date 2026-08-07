const spec = {
  "ownerId": "classical-affective-vocative",
  "prefix": "ClassicalAffectiveVocative",
  "operationId": "classical.affective.vocative.execute",
  "inputContract": "complete-typed-classical-affective-vocative-source",
  "domain": "classical-affective-vocative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3144",
    "claim-p3145",
    "claim-p3147",
    "claim-p3148"
  ],
  "coordinates": {
    "claim-p3144::p3144-in-a-vocative-construction-containing-the-vocative-particle-e": {
      "assertionId": "classical-affective-vocative:p3144-in-a-vocative-construction-containing-the-vocative-particle-e",
      "canonicalPath": "cases.vocative.rules.affective/vocative"
    },
    "claim-p3145::p3145-the-vocative-unit-containing-the-nnc-with-the-abbreviated": {
      "assertionId": "classical-affective-vocative:p3145-the-vocative-unit-containing-the-nnc-with-the-abbreviated",
      "canonicalPath": "cases.vocative.authorizationStatus"
    },
    "claim-p3147::p3147-the-nounstem-il-li-is-attested-only-in-a": {
      "assertionId": "classical-affective-vocative:p3147-the-nounstem-il-li-is-attested-only-in-a",
      "canonicalPath": "cases.vocative.gcdSatisfied"
    },
    "claim-p3148::p3148-for-it-to-have-a-truly-honorific-affective-value": {
      "assertionId": "classical-affective-vocative:p3148-for-it-to-have-a-truly-honorific-affective-value",
      "canonicalPath": "cases.vocative.lcmComplete"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3144": [],
    "claim-p3145": [],
    "claim-p3147": [],
    "claim-p3148": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3144": "authorized",
    "claim-p3145": "authorized",
    "claim-p3147": "authorized",
    "claim-p3148": "authorized"
  }
};
export default Object.freeze(spec);
