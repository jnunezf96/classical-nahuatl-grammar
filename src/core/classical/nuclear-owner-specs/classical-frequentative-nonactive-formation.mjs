const spec = {
  "ownerId": "classical-frequentative-nonactive-formation",
  "prefix": "ClassicalFrequentativeNonactiveFormation",
  "operationId": "classical.frequentative.nonactive.formation.execute",
  "inputContract": "complete-typed-classical-frequentative-nonactive-formation-source",
  "domain": "classical-frequentative-nonactive-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2716",
    "claim-p2717"
  ],
  "coordinates": {
    "claim-p2716::p2716-nonactive-verbstems-can-undergo-the-frequentative-derivation": {
      "assertionId": "classical-frequentative-nonactive-formation:p2716-nonactive-verbstems-can-undergo-the-frequentative-derivation",
      "canonicalPath": "contract.nonactiveRuleFamily"
    },
    "claim-p2717::p2717-an-impersonal-vnc-formed-on-such-a-stem-indicates": {
      "assertionId": "classical-frequentative-nonactive-formation:p2717-an-impersonal-vnc-formed-on-such-a-stem-indicates",
      "canonicalPath": "cases.nonactive.sourceVoice"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2716": [],
    "claim-p2717": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2716": "authorized",
    "claim-p2717": "authorized"
  }
};
export default Object.freeze(spec);
