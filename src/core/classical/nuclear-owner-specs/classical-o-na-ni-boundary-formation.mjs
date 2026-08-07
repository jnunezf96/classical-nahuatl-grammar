const spec = {
  "ownerId": "classical-o-na-ni-boundary-formation",
  "prefix": "ClassicalONaNiBoundaryFormation",
  "operationId": "classical.o.na.ni.boundary.formation.execute",
  "inputContract": "complete-typed-classical-o-na-ni-boundary-formation-source",
  "domain": "classical-o-na-ni-boundary-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2025",
    "claim-p2026",
    "claim-p2027",
    "claim-p2028",
    "claim-p2029",
    "claim-p2030"
  ],
  "coordinates": {
    "claim-p2025::p2025-na-n-o": {
      "assertionId": "classical-o-na-ni-boundary-formation:p2025-na-n-o",
      "canonicalPath": "nonactive.oNaNi.authorizationStatus"
    },
    "claim-p2026::p2026-ni-n-o": {
      "assertionId": "classical-o-na-ni-boundary-formation:p2026-ni-n-o",
      "canonicalPath": "nonactive.oNaNi.options.0.nonactiveStem"
    },
    "claim-p2027::p2027-tla-a-na-to-take-hold-of-s-th": {
      "assertionId": "classical-o-na-ni-boundary-formation:p2027-tla-a-na-to-take-hold-of-s-th",
      "canonicalPath": "nonactive.oNaNi.options.0.suffixFamily"
    },
    "claim-p2028::p2028-tla-peh-pena-to-choose-s-th": {
      "assertionId": "classical-o-na-ni-boundary-formation:p2028-tla-peh-pena-to-choose-s-th",
      "canonicalPath": "nonactive.oNaNi.authorizationStatus"
    },
    "claim-p2029::p2029-tla-ti-tlani-to-send-s-th": {
      "assertionId": "classical-o-na-ni-boundary-formation:p2029-tla-ti-tlani-to-send-s-th",
      "canonicalPath": "nonactive.oNaNi.options.0.nonactiveStem"
    },
    "claim-p2030::p2030-tla-ih-tlani-to-request-s-th": {
      "assertionId": "classical-o-na-ni-boundary-formation:p2030-tla-ih-tlani-to-request-s-th",
      "canonicalPath": "nonactive.oNaNi.options.0.suffixFamily"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2025": [],
    "claim-p2026": [],
    "claim-p2027": [],
    "claim-p2028": [],
    "claim-p2029": [],
    "claim-p2030": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2025": "authorized",
    "claim-p2026": "authorized",
    "claim-p2027": "authorized",
    "claim-p2028": "authorized",
    "claim-p2029": "authorized",
    "claim-p2030": "authorized"
  }
};
export default Object.freeze(spec);
