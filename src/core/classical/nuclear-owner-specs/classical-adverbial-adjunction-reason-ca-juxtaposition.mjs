const spec = {
  "ownerId": "classical-adverbial-adjunction-reason-ca-juxtaposition",
  "prefix": "ClassicalAdverbialAdjunctionReasonCaJuxtaposition",
  "operationId": "classical.adverbial.adjunction.reason.ca.juxtaposition.execute",
  "inputContract": "complete-typed-classical-adverbial-adjunction-reason-ca-juxtaposition-source",
  "domain": "classical-adverbial-adjunction-reason-ca-juxtaposition",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-adjunction-runtime",
  "selections": [
    "claim-p4784"
  ],
  "coordinates": {
    "claim-p4784::p4784-this-means-that-the-nahuatl-construction-simply-juxtaposes-two": {
      "assertionId": "classical-adverbial-adjunction-reason-ca-juxtaposition:p4784-this-means-that-the-nahuatl-construction-simply-juxtaposes-two",
      "canonicalPath": "analysis.caIntroducesPrincipalClause"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialAdjunctionValidationFrame",
  "executionValidatorName": "isClassicalAdverbialAdjunctionValidationFrame",
  "executionArgsBySelection": {
    "claim-p4784": [
      "reason-ca-juxtaposition"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4784": "authorized"
  }
};
export default Object.freeze(spec);
