const spec = {
  "ownerId": "classical-yes-no-question-formation",
  "prefix": "ClassicalYesNoQuestionFormation",
  "operationId": "classical.yes.no.question.form",
  "inputContract": "complete-typed-classical-yes-no-question-formation-source",
  "domain": "classical-yes-no-question-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-yes-no-question-formation",
  "selections": [
    "claim-p1031",
    "claim-p1032",
    "claim-p1033"
  ],
  "coordinates": {
    "claim-p1031::p1031-a-simple-assertion-sentence-affirmative-or-negative-can-be": {
      "assertionId": "classical-yes-no-question-formation:p1031-a-simple-assertion-sentence-affirmative-or-negative-can-be",
      "canonicalPath": "sentenceType"
    },
    "claim-p1032::p1032-by-changing-the-intonation-pattern-this-is-indicated-in": {
      "assertionId": "classical-yes-no-question-formation:p1032-by-changing-the-intonation-pattern-this-is-indicated-in",
      "canonicalPath": "finalPunctuation"
    },
    "claim-p1033::p1033-by-inserting-the-interrogative-particle-cuix": {
      "assertionId": "classical-yes-no-question-formation:p1033-by-inserting-the-interrogative-particle-cuix",
      "canonicalPath": "questionMode"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlYesNoQuestionSystemFrame",
  "executionValidatorName": "isClassicalNahuatlYesNoQuestionSystemFrame",
  "executionArgsBySelection": {
    "claim-p1031": [],
    "claim-p1032": [],
    "claim-p1033": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1031": "authorized",
    "claim-p1032": "authorized",
    "claim-p1033": "authorized"
  }
};
export default Object.freeze(spec);
