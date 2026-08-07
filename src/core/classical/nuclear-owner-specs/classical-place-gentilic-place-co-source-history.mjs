const spec = {
  "ownerId": "classical-place-gentilic-place-co-source-history",
  "prefix": "ClassicalPlaceGentilicPlaceCoSourceHistory",
  "operationId": "classical.place.gentilic.place.co.source.history.execute",
  "inputContract": "complete-typed-classical-place-gentilic-place-co-source-history-source",
  "domain": "classical-place-gentilic-place-co-source-history",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4591",
    "claim-p4592",
    "claim-p4593",
    "claim-p4594"
  ],
  "coordinates": {
    "claim-p4591::p4591-there-is-much-disagreement-about-the-meaning-of-this": {
      "assertionId": "classical-place-gentilic-place-co-source-history:p4591-there-is-much-disagreement-about-the-meaning-of-this",
      "canonicalPath": "analyses.coSourceHistory.historicalDerivationAuthorizesOutput"
    },
    "claim-p4592::p4592-i-to-i": {
      "assertionId": "classical-place-gentilic-place-co-source-history:p4592-i-to-i",
      "canonicalPath": "analyses.coSourceHistory.erroneousSoundChangeAuthorizesOutput"
    },
    "claim-p4593::p4593-the-explanation-is-not-viable-for-two-reasons-1": {
      "assertionId": "classical-place-gentilic-place-co-source-history:p4593-the-explanation-is-not-viable-for-two-reasons-1",
      "canonicalPath": "analyses.coSourceHistory.canonicalCoFrame"
    },
    "claim-p4594::p4594-in-the-cro-nica-mexihca-yotl-we-are-told": {
      "assertionId": "classical-place-gentilic-place-co-source-history:p4594-in-the-cro-nica-mexihca-yotl-we-are-told",
      "canonicalPath": "analyses.coSourceHistory.axisId"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4591": [],
    "claim-p4592": [],
    "claim-p4593": [],
    "claim-p4594": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4591": "authorized",
    "claim-p4592": "authorized",
    "claim-p4593": "authorized",
    "claim-p4594": "authorized"
  }
};
export default Object.freeze(spec);
