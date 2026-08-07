const spec = {
  "ownerId": "classical-adverbial-mo-rhetorical-question",
  "prefix": "ClassicalAdverbialMoRhetoricalQuestion",
  "operationId": "classical.adverbial.mo.rhetorical.question.execute",
  "inputContract": "complete-typed-classical-adverbial-mo-rhetorical-question-source",
  "domain": "classical-adverbial-mo-rhetorical-question",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4169",
    "claim-p4170",
    "claim-p4171",
    "claim-p4172",
    "claim-p4173",
    "claim-p4174"
  ],
  "coordinates": {
    "claim-p4169::p4169-the-proof-of-this-is-that-unlike-a-true": {
      "assertionId": "classical-adverbial-mo-rhetorical-question:p4169-the-proof-of-this-is-that-unlike-a-true",
      "canonicalPath": "cases.particleMoQuestion.canonicalResult"
    },
    "claim-p4170::p4170-when-not-in-the-sentence-initial-position": {
      "assertionId": "classical-adverbial-mo-rhetorical-question:p4170-when-not-in-the-sentence-initial-position",
      "canonicalPath": "cases.particleMoQuestion.context.interrogativeForce"
    },
    "claim-p4171::p4171-contrary-to-what-carochi-p-526-states-mo-is": {
      "assertionId": "classical-adverbial-mo-rhetorical-question:p4171-contrary-to-what-carochi-p-526-states-mo-is",
      "canonicalPath": "cases.particleMoQuestion.context.semanticPolarity"
    },
    "claim-p4172::p4172-when-used-affirmatively-in-a-question": {
      "assertionId": "classical-adverbial-mo-rhetorical-question:p4172-when-used-affirmatively-in-a-question",
      "canonicalPath": "cases.particleMoQuestion.canonicalResult"
    },
    "claim-p4173::p4173-when-used-affirmatively-in-a-question-mo-has-the": {
      "assertionId": "classical-adverbial-mo-rhetorical-question:p4173-when-used-affirmatively-in-a-question-mo-has-the",
      "canonicalPath": "cases.particleMoQuestion.context.interrogativeForce"
    },
    "claim-p4174::p4174-when-preceded-by-the-interrogative-particle-cuix-the-implied": {
      "assertionId": "classical-adverbial-mo-rhetorical-question:p4174-when-preceded-by-the-interrogative-particle-cuix-the-implied",
      "canonicalPath": "cases.particleMoQuestion.context.semanticPolarity"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4169": [],
    "claim-p4170": [],
    "claim-p4171": [],
    "claim-p4172": [],
    "claim-p4173": [],
    "claim-p4174": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4169": "authorized",
    "claim-p4170": "authorized",
    "claim-p4171": "authorized",
    "claim-p4172": "authorized",
    "claim-p4173": "authorized",
    "claim-p4174": "authorized"
  }
};
export default Object.freeze(spec);
