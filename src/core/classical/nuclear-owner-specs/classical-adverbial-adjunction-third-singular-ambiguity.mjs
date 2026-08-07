const spec = {
  "ownerId": "classical-adverbial-adjunction-third-singular-ambiguity",
  "prefix": "ClassicalAdverbialAdjunctionThirdSingularAmbiguity",
  "operationId": "classical.adverbial.adjunction.third.singular.ambiguity.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-third-singular-ambiguity-source",
  "domain": "classical-adverbial-adjunction-third-singular-ambiguity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4658",
    "claim-p4659"
  ],
  "coordinates": {
    "claim-p4658::p4658-notice-that-if-the-principal-clause-has-a-third": {
      "assertionId": "classical-adverbial-adjunction-third-singular-ambiguity:p4658-notice-that-if-the-principal-clause-has-a-third",
      "canonicalPath": "analysis.thirdSingularAllowsSupplementAmbiguity"
    },
    "claim-p4659::p4659-if-the-principal-clause-has-a-third-person-singular": {
      "assertionId": "classical-adverbial-adjunction-third-singular-ambiguity:p4659-if-the-principal-clause-has-a-third-person-singular",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4658": [
      "third-singular-ambiguity"
    ],
    "claim-p4659": [
      "third-singular-ambiguity"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4658": "authorized",
    "claim-p4659": "authorized"
  }
};
export default Object.freeze(spec);
