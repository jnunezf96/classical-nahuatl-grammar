const spec = {
  "ownerId": "classical-adjectival-interrogative-head-ambiguity",
  "prefix": "ClassicalAdjectivalInterrogativeHeadAmbiguity",
  "operationId": "classical.adjectival.interrogative.head.ambiguity.execute",
  "inputContract": "complete-typed-classical-adjectival-interrogative-head-ambiguity-source",
  "domain": "classical-adjectival-interrogative-head-ambiguity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4100"
  ],
  "coordinates": {
    "claim-p4100::p4100-consequently-sentences-in-which-a-c-and-tleh-occur": {
      "assertionId": "classical-adjectival-interrogative-head-ambiguity:p4100-consequently-sentences-in-which-a-c-and-tleh-occur",
      "canonicalPath": "cases.interrogativeHead.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4100": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4100": "authorized"
  }
};
export default Object.freeze(spec);
