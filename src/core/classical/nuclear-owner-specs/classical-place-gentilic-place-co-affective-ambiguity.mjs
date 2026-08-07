const spec = {
  "ownerId": "classical-place-gentilic-place-co-affective-ambiguity",
  "prefix": "ClassicalPlaceGentilicPlaceCoAffectiveAmbiguity",
  "operationId": "classical.place.gentilic.place.co.affective.ambiguity.execute",
  "inputContract": "complete-typed-classical-place-gentilic-place-co-affective-ambiguity-source",
  "domain": "classical-place-gentilic-place-co-affective-ambiguity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-place-gentilic-runtime",
  "selections": [
    "claim-p4597",
    "claim-p4598"
  ],
  "coordinates": {
    "claim-p4597::p4597-if-available": {
      "assertionId": "classical-place-gentilic-place-co-affective-ambiguity:p4597-if-available",
      "canonicalPath": "analyses.coAffectiveAmbiguity.untypedAmbiguityBlocked"
    },
    "claim-p4598::p4598-historical-information-if-available-must-decide-which-formation-is": {
      "assertionId": "classical-place-gentilic-place-co-affective-ambiguity:p4598-historical-information-if-available-must-decide-which-formation-is",
      "canonicalPath": "analyses.coAffectiveAmbiguity.directCanonical"
    }
  },
  "executionFunctionName": "buildClassicalPlaceGentilicValidationFrame",
  "executionValidatorName": "isClassicalPlaceGentilicValidationFrame",
  "executionArgsBySelection": {
    "claim-p4597": [],
    "claim-p4598": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4597": "authorized",
    "claim-p4598": "authorized"
  }
};
export default Object.freeze(spec);
