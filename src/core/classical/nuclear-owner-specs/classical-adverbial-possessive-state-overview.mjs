const spec = {
  "ownerId": "classical-adverbial-possessive-state-overview",
  "prefix": "ClassicalAdverbialPossessiveStateOverview",
  "operationId": "classical.adverbial.possessive.state.overview.execute",
  "inputContract": "complete-typed-classical-adverbial-possessive-state-overview-source",
  "domain": "classical-adverbial-possessive-state-overview",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4210",
    "claim-p4211"
  ],
  "coordinates": {
    "claim-p4210::p4210-as-pointed-out-in-44-2-an-adverbialized-nnc": {
      "assertionId": "classical-adverbial-possessive-state-overview:p4210-as-pointed-out-in-44-2-an-adverbialized-nnc",
      "canonicalPath": "cases.possessiveActive.canonicalResult"
    },
    "claim-p4211::p4211-there-are-however-a-few-rare-instances-of-a": {
      "assertionId": "classical-adverbial-possessive-state-overview:p4211-there-are-however-a-few-rare-instances-of-a",
      "canonicalPath": "cases.possessiveActive.family"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4210": [],
    "claim-p4211": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4210": "authorized",
    "claim-p4211": "authorized"
  }
};
export default Object.freeze(spec);
