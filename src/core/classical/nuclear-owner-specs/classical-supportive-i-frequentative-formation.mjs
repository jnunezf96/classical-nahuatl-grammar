const spec = {
  "ownerId": "classical-supportive-i-frequentative-formation",
  "prefix": "ClassicalSupportiveIFrequentativeFormation",
  "operationId": "classical.supportive.i.frequentative.formation.execute",
  "inputContract": "complete-typed-classical-supportive-i-frequentative-formation-source",
  "domain": "classical-supportive-i-frequentative-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2667",
    "claim-p2668",
    "claim-p2669"
  ],
  "coordinates": {
    "claim-p2667::p2667-note-1-if-the-source-stem-begins-with-a": {
      "assertionId": "classical-supportive-i-frequentative-formation:p2667-note-1-if-the-source-stem-begins-with-a",
      "canonicalPath": "cases.supportiveI.targetStem"
    },
    "claim-p2668::p2668-the-supportive-vowel-i-disappears": {
      "assertionId": "classical-supportive-i-frequentative-formation:p2668-the-supportive-vowel-i-disappears",
      "canonicalPath": "cases.supportiveI.ruleFamilies.1"
    },
    "claim-p2669::p2669-the-source-stem-may-no-longer-be-extant": {
      "assertionId": "classical-supportive-i-frequentative-formation:p2669-the-source-stem-may-no-longer-be-extant",
      "canonicalPath": "cases.supportiveI.operationFacts.shape"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2667": [],
    "claim-p2668": [],
    "claim-p2669": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2667": "authorized",
    "claim-p2668": "authorized",
    "claim-p2669": "authorized"
  }
};
export default Object.freeze(spec);
