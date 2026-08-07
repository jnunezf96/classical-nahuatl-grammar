const spec = {
  "ownerId": "classical-adverbial-adjunction-concession-zan-za",
  "prefix": "ClassicalAdverbialAdjunctionConcessionZanZa",
  "operationId": "classical.adverbial.adjunction.concession.zan.za.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-concession-zan-za-source",
  "domain": "classical-adverbial-adjunction-concession-zan-za",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4780",
    "claim-p4781"
  ],
  "coordinates": {
    "claim-p4780::p4780-the-collocations-ma-nel-zan-ma-zan-nel-ma": {
      "assertionId": "classical-adverbial-adjunction-concession-zan-za:p4780-the-collocations-ma-nel-zan-ma-zan-nel-ma",
      "canonicalPath": "analysis.zanAndZaRemainSemanticallyDistinct"
    },
    "claim-p4781::p4781-it-should-remembered-that-za-expresses-the-notion-of": {
      "assertionId": "classical-adverbial-adjunction-concession-zan-za:p4781-it-should-remembered-that-za-expresses-the-notion-of",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4780": [
      "concession-zan-za"
    ],
    "claim-p4781": [
      "concession-zan-za"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4780": "authorized",
    "claim-p4781": "authorized"
  }
};
export default Object.freeze(spec);
