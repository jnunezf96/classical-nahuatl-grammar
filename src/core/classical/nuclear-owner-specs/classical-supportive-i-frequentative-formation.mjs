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
    "claim-p2668"
  ],
  "coordinates": {
    "claim-p2667::p2667-note-1-if-the-source-stem-begins-with-a": {
      "assertionId": "classical-supportive-i-frequentative-formation:p2667-note-1-if-the-source-stem-begins-with-a",
      "canonicalPath": "cases.supportiveI.targetStem"
    },
    "claim-p2668::p2668-the-supportive-vowel-i-disappears": {
      "assertionId": "classical-supportive-i-frequentative-formation:p2668-the-supportive-vowel-i-disappears",
      "canonicalPath": "cases.supportiveI.ruleFamilies.1"
    }
  },
  "nonExecutableObservations": {
    "claim-p2669::p2669-the-source-stem-may-no-longer-be-extant": {
      "assertionId": "classical-supportive-i-frequentative-formation:p2669-the-source-stem-may-no-longer-be-extant",
      "disposition": "documentary-claim-runtime-observation-unverified",
      "reason": "Canvas9054–9056 states that sources may no longer be extant, exemplified by *tzona and *pena. The supportiveI fixture derives from ihcuil-o-ā; its shape neither observes those examples nor establishes historical attestation. Nonextant is not converted into a productive-admission prohibition.",
      "retiredCanonicalPath": "cases.supportiveI.operationFacts.shape",
      "executionCredit": false,
      "grammarAuthority": false
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2667": [],
    "claim-p2668": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2667": "authorized",
    "claim-p2668": "authorized"
  }
};
export default Object.freeze(spec);
