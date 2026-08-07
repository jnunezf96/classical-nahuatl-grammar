const spec = {
  "ownerId": "classical-admonitive-glottal-ambiguity-analysis",
  "prefix": "ClassicalAdmonitiveGlottalAmbiguityAnalysis",
  "operationId": "classical.admonitive.glottal.ambiguity.analysis.execute",
  "inputContract": "complete-typed-classical-admonitive-glottal-ambiguity-analysis-source",
  "domain": "classical-admonitive-glottal-ambiguity-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-admonitive-glottal-ambiguity-analysis",
  "selections": [
    "claim-p1135",
    "claim-p1136",
    "claim-p1137",
    "claim-p1138"
  ],
  "coordinates": {
    "claim-p1135::p1135-singular-forms-thus-for-example-when-translating-ma-tzatzi": {
      "assertionId": "classical-admonitive-glottal-ambiguity-analysis:p1135-singular-forms-thus-for-example-when-translating-ma-tzatzi",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1136::p1136-the-first-and-third-person-singular-vncs-of-the": {
      "assertionId": "classical-admonitive-glottal-ambiguity-analysis:p1136-the-first-and-third-person-singular-vncs-of-the",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1137::p1137-the-first-and-third-person-plural-vncs-of-the": {
      "assertionId": "classical-admonitive-glottal-ambiguity-analysis:p1137-the-first-and-third-person-plural-vncs-of-the",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1138::p1138-note-that-the-similarity-of-the-vncs-is-only": {
      "assertionId": "classical-admonitive-glottal-ambiguity-analysis:p1138-note-that-the-similarity-of-the-vncs-is-only",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdmonitiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdmonitiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p1135": [
      "class-a-singular"
    ],
    "claim-p1136": [
      "class-c-contrast"
    ],
    "claim-p1137": [
      "class-a-singular"
    ],
    "claim-p1138": [
      "class-c-contrast"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1135": "authorized",
    "claim-p1136": "authorized",
    "claim-p1137": "authorized",
    "claim-p1138": "authorized"
  }
};
export default Object.freeze(spec);
