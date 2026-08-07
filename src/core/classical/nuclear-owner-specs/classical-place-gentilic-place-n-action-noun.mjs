const spec = {
  "ownerId": "classical-place-gentilic-place-n-action-noun",
  "prefix": "ClassicalPlaceGentilicPlaceNActionNoun",
  "operationId": "classical.place.gentilic.place.n.action.noun.execute",
  "inputContract": "complete-typed-classical-place-gentilic-place-n-action-noun-source",
  "domain": "classical-place-gentilic-place-n-action-noun",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4584",
    "claim-p4585"
  ],
  "coordinates": {
    "claim-p4584::p4584-the-formation-can-use-the-matrix-stem-n-tli": {
      "assertionId": "classical-place-gentilic-place-n-action-noun:p4584-the-formation-can-use-the-matrix-stem-n-tli",
      "canonicalPath": "cases.nAction.canonicalFrame"
    },
    "claim-p4585::p4585-pronoun-has-lost-its-length-because-of-the-following": {
      "assertionId": "classical-place-gentilic-place-n-action-noun:p4585-pronoun-has-lost-its-length-because-of-the-following",
      "canonicalPath": "cases.nAction.lcmAxisId"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4584": [],
    "claim-p4585": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4584": "authorized",
    "claim-p4585": "authorized"
  }
};
export default Object.freeze(spec);
