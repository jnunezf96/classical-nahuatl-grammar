const spec = {
  "ownerId": "classical-adverbial-pani-final-i-loss",
  "prefix": "ClassicalAdverbialPaniFinalILoss",
  "operationId": "classical.adverbial.pani.final.i.loss.execute",
  "inputContract": "complete-typed-classical-adverbial-pani-final-i-loss-source",
  "domain": "classical-adverbial-pani-final-i-loss",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4229",
    "claim-p4230"
  ],
  "coordinates": {
    "claim-p4229::p4229-when-serving-as-an-incorporated-adverb-see-example-above": {
      "assertionId": "classical-adverbial-pani-final-i-loss:p4229-when-serving-as-an-incorporated-adverb-see-example-above",
      "canonicalPath": "cases.incorporationPani.canonicalResult"
    },
    "claim-p4230::p4230-while-the-stem-tlani-occurs-without-change-when-serving": {
      "assertionId": "classical-adverbial-pani-final-i-loss:p4230-while-the-stem-tlani-occurs-without-change-when-serving",
      "canonicalPath": "cases.incorporationPani.scope"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4229": [],
    "claim-p4230": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4229": "authorized",
    "claim-p4230": "authorized"
  }
};
export default Object.freeze(spec);
