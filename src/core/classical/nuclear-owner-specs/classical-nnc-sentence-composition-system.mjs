const spec = {
  "ownerId": "classical-nnc-sentence-composition-system",
  "prefix": "ClassicalNncSentenceCompositionSystem",
  "operationId": "classical.nnc.sentence.composition.system.execute",
  "inputContract": "complete-typed-classical-nnc-sentence-composition-system-source",
  "domain": "classical-nnc-sentence-composition-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1640",
    "claim-p1641",
    "claim-p1642"
  ],
  "coordinates": {
    "claim-p1640::p1640-just-like-vncs-nncs-can-constitute-simple-sentences-or": {
      "assertionId": "classical-nnc-sentence-composition-system:p1640-just-like-vncs-nncs-can-constitute-simple-sentences-or",
      "canonicalPath": "sentenceHandoffFrame.consumedNncStatus"
    },
    "claim-p1641::p1641-this-means-that-all-the-nncs-in-lesson-14": {
      "assertionId": "classical-nnc-sentence-composition-system:p1641-this-means-that-all-the-nncs-in-lesson-14",
      "canonicalPath": "sentenceHandoffFrame.allowedSentenceTypes"
    },
    "claim-p1642::p1642-equative-sentences-may-express-simple-affirmative-assertions-negative-assertions": {
      "assertionId": "classical-nnc-sentence-composition-system:p1642-equative-sentences-may-express-simple-affirmative-assertions-negative-assertions",
      "canonicalPath": "sentenceHandoffFrame.definitenessRemainsAmbiguous"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1640": [
      "l15-sentence"
    ],
    "claim-p1641": [
      "l15-sentence"
    ],
    "claim-p1642": [
      "l15-sentence"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1640": "authorized",
    "claim-p1641": "authorized",
    "claim-p1642": "authorized"
  }
};
export default Object.freeze(spec);
