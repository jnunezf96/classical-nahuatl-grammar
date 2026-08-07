const spec = {
  "ownerId": "classical-adverbial-adjunction-larger-sentence-deinterrogation",
  "prefix": "ClassicalAdverbialAdjunctionLargerSentenceDeinterrogation",
  "operationId": "classical.adverbial.adjunction.larger.sentence.deinterrogation.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-larger-sentence-deinterrogation-source",
  "domain": "classical-adverbial-adjunction-larger-sentence-deinterrogation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4697",
    "claim-p4698"
  ],
  "coordinates": {
    "claim-p4697::p4697-when-one-of-these-sentences-is-included-as-part": {
      "assertionId": "classical-adverbial-adjunction-larger-sentence-deinterrogation:p4697-when-one-of-these-sentences-is-included-as-part",
      "canonicalPath": "analysis.includedInterrogativeLosesQuestionForce"
    },
    "claim-p4698::p4698-when-one-of-these-sentences-is-included-as-part": {
      "assertionId": "classical-adverbial-adjunction-larger-sentence-deinterrogation:p4698-when-one-of-these-sentences-is-included-as-part",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4697": [
      "larger-sentence-deinterrogation"
    ],
    "claim-p4698": [
      "larger-sentence-deinterrogation"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4697": "authorized",
    "claim-p4698": "authorized"
  }
};
export default Object.freeze(spec);
