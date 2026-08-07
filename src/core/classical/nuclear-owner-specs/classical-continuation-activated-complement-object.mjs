const spec = {
  "ownerId": "classical-continuation-activated-complement-object",
  "prefix": "ClassicalContinuationActivatedComplementObject",
  "operationId": "classical.continuation.activated.complement.object.execute",
  "inputContract": "complete-typed-classical-continuation-activated-complement-object-source",
  "domain": "classical-continuation-activated-complement-object",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-nnc-runtime",
  "selections": [
    "claim-p3485",
    "claim-p3486",
    "claim-p3487"
  ],
  "coordinates": {
    "claim-p3485::p3485-if-however-the-matrix-verbstem-has-a-reflexive-object": {
      "assertionId": "classical-continuation-activated-complement-object:p3485-if-however-the-matrix-verbstem-has-a-reflexive-object",
      "canonicalPath": "cases.activatedComplementObject.authorizationStatus"
    },
    "claim-p3486::p3486-this-violates-the-valence-principle-of-23-1-since": {
      "assertionId": "classical-continuation-activated-complement-object:p3486-this-violates-the-valence-principle-of-23-1-since",
      "canonicalPath": "cases.activatedComplementObject.canonicalResult"
    },
    "claim-p3487::p3487-as-a-result-the-compound-stemmed-vnc-becomes-a": {
      "assertionId": "classical-continuation-activated-complement-object:p3487-as-a-result-the-compound-stemmed-vnc-becomes-a",
      "canonicalPath": "cases.activatedComplementObject.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3485": [],
    "claim-p3486": [],
    "claim-p3487": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3485": "authorized",
    "claim-p3486": "authorized",
    "claim-p3487": "authorized"
  }
};
export default Object.freeze(spec);
