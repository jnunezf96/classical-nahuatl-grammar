const spec = {
  "ownerId": "classical-adverbial-preterit-agentive-general-use",
  "prefix": "ClassicalAdverbialPreteritAgentiveGeneralUse",
  "operationId": "classical.adverbial.preterit.agentive.general.use.execute",
  "inputContract": "complete-typed-classical-adverbial-preterit-agentive-general-use-source",
  "domain": "classical-adverbial-preterit-agentive-general-use",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4198",
    "claim-p4199",
    "claim-p4200"
  ],
  "coordinates": {
    "claim-p4198::p4198-the-general-use-stem-of-a-preterit-agentive-nounstem": {
      "assertionId": "classical-adverbial-preterit-agentive-general-use:p4198-the-general-use-stem-of-a-preterit-agentive-nounstem",
      "canonicalPath": "cases.preteritProductive.canonicalResult"
    },
    "claim-p4199::p4199-by-adverbializing-the-subject-pronoun-nahuatl-creates-adverbs-of": {
      "assertionId": "classical-adverbial-preterit-agentive-general-use:p4199-by-adverbializing-the-subject-pronoun-nahuatl-creates-adverbs-of",
      "canonicalPath": "cases.preteritProductive.prerequisiteOwnerValidated"
    },
    "claim-p4200::p4200-english-usually-translates-these-adverbialized-nncs-by-means-of": {
      "assertionId": "classical-adverbial-preterit-agentive-general-use:p4200-english-usually-translates-these-adverbialized-nncs-by-means-of",
      "canonicalPath": "contract.sourceAndAdverbialOperationsRemainSeparate"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4198": [],
    "claim-p4199": [],
    "claim-p4200": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4198": "authorized",
    "claim-p4199": "authorized",
    "claim-p4200": "authorized"
  }
};
export default Object.freeze(spec);
