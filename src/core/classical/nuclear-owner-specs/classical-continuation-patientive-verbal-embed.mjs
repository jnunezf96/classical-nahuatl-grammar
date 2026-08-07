const spec = {
  "ownerId": "classical-continuation-patientive-verbal-embed",
  "prefix": "ClassicalContinuationPatientiveVerbalEmbed",
  "operationId": "classical.continuation.patientive.verbal.embed.execute",
  "inputContract": "complete-typed-classical-continuation-patientive-verbal-embed-source",
  "domain": "classical-continuation-patientive-verbal-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3825",
    "claim-p3826",
    "claim-p3827",
    "claim-p3828"
  ],
  "coordinates": {
    "claim-p3825::p3825-note-as-always-the-derivational-history-behind-the-formation": {
      "assertionId": "classical-continuation-patientive-verbal-embed:p3825-note-as-always-the-derivational-history-behind-the-formation",
      "canonicalPath": "cases.patientiveVerbalEmbed.authorizationStatus"
    },
    "claim-p3826::p3826-it-originates-in-the-incorporated-object-compound-verbstem-tla": {
      "assertionId": "classical-continuation-patientive-verbal-embed:p3826-it-originates-in-the-incorporated-object-compound-verbstem-tla",
      "canonicalPath": "cases.patientiveVerbalEmbed.canonicalResult"
    },
    "claim-p3827::p3827-it-is-then-incorporated-as-a-verb-object-into": {
      "assertionId": "classical-continuation-patientive-verbal-embed:p3827-it-is-then-incorporated-as-a-verb-object-into",
      "canonicalPath": "cases.patientiveVerbalEmbed.gcdSatisfied"
    },
    "claim-p3828::p3828-this-compound-verbstem-in-turn-becomes-an-imperfective-patientive": {
      "assertionId": "classical-continuation-patientive-verbal-embed:p3828-this-compound-verbstem-in-turn-becomes-an-imperfective-patientive",
      "canonicalPath": "cases.patientiveVerbalEmbed.lcmComplete"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3825": [],
    "claim-p3826": [],
    "claim-p3827": [],
    "claim-p3828": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3825": "authorized",
    "claim-p3826": "authorized",
    "claim-p3827": "authorized",
    "claim-p3828": "authorized"
  }
};
export default Object.freeze(spec);
