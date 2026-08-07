const spec = {
  "ownerId": "classical-affective-flawing-purpose",
  "prefix": "ClassicalAffectiveFlawingPurpose",
  "operationId": "classical.affective.flawing.purpose.execute",
  "inputContract": "complete-typed-classical-affective-flawing-purpose-source",
  "domain": "classical-affective-flawing-purpose",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3202",
    "claim-p3203",
    "claim-p3204"
  ],
  "coordinates": {
    "claim-p3202::p3202-for-instance-the-use-of-an-irregular-silent-morph": {
      "assertionId": "classical-affective-flawing-purpose:p3202-for-instance-the-use-of-an-irregular-silent-morph",
      "canonicalPath": "cases.flawingPurpose.rules.affective/flawing-purpose"
    },
    "claim-p3203::p3203-flawing-of-the-subject-adverbialization-and-personal-name-formation": {
      "assertionId": "classical-affective-flawing-purpose:p3203-flawing-of-the-subject-adverbialization-and-personal-name-formation",
      "canonicalPath": "cases.flawingPurpose.authorizationStatus"
    },
    "claim-p3204::p3204-the-meaning-effect-accomplished-by-the-silencing-of-the": {
      "assertionId": "classical-affective-flawing-purpose:p3204-the-meaning-effect-accomplished-by-the-silencing-of-the",
      "canonicalPath": "cases.flawingPurpose.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3202": [],
    "claim-p3203": [],
    "claim-p3204": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3202": "authorized",
    "claim-p3203": "authorized",
    "claim-p3204": "authorized"
  }
};
export default Object.freeze(spec);
