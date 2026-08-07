const spec = {
  "ownerId": "classical-affirmative-assertion-formation",
  "prefix": "ClassicalAffirmativeAssertionFormation",
  "operationId": "classical.affirmative.assertion.form",
  "inputContract": "complete-typed-classical-affirmative-assertion-formation-source",
  "domain": "classical-affirmative-assertion-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-affirmative-assertion-formation",
  "selections": [
    "claim-p1023",
    "claim-p1024",
    "claim-p1025",
    "claim-p1026"
  ],
  "coordinates": {
    "claim-p1023::p1023-a-simple-affrrmative-assertion-sentence-in-nahuatl-consists-of": {
      "assertionId": "classical-affirmative-assertion-formation:p1023-a-simple-affrrmative-assertion-sentence-in-nahuatl-consists-of",
      "canonicalPath": "sentenceType"
    },
    "claim-p1024::p1024-this-means-that-the-vncs-in-lesson-7-and": {
      "assertionId": "classical-affirmative-assertion-formation:p1024-this-means-that-the-vncs-in-lesson-7-and",
      "canonicalPath": "consumedVncStatus"
    },
    "claim-p1025::p1025-if-it-is-a-verbal-nuclear-clause": {
      "assertionId": "classical-affirmative-assertion-formation:p1025-if-it-is-a-verbal-nuclear-clause",
      "canonicalPath": "indicativeVncRequired"
    },
    "claim-p1026::p1026-if-it-is-a-verbal-nuclear-clause-it-must": {
      "assertionId": "classical-affirmative-assertion-formation:p1026-if-it-is-a-verbal-nuclear-clause-it-must",
      "canonicalPath": "indicativeVncRequired"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffirmativeAssertionSystemFrame",
  "executionValidatorName": "isClassicalNahuatlAffirmativeAssertionSystemFrame",
  "executionArgsBySelection": {
    "claim-p1023": [],
    "claim-p1024": [],
    "claim-p1025": [],
    "claim-p1026": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1023": "authorized",
    "claim-p1024": "authorized",
    "claim-p1025": "authorized",
    "claim-p1026": "authorized"
  }
};
export default Object.freeze(spec);
