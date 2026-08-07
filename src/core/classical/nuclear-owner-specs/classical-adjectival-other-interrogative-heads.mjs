const spec = {
  "ownerId": "classical-adjectival-other-interrogative-heads",
  "prefix": "ClassicalAdjectivalOtherInterrogativeHeads",
  "operationId": "classical.adjectival.other.interrogative.heads.execute",
  "inputContract": "complete-typed-classical-adjectival-other-interrogative-heads-source",
  "domain": "classical-adjectival-other-interrogative-heads",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4118"
  ],
  "coordinates": {
    "claim-p4118::p4118-other-interrogative-nncs-may-be-used-in-structures-of": {
      "assertionId": "classical-adjectival-other-interrogative-heads:p4118-other-interrogative-nncs-may-be-used-in-structures-of",
      "canonicalPath": "cases.interrogativeHead.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4118": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4118": "authorized"
  }
};
export default Object.freeze(spec);
