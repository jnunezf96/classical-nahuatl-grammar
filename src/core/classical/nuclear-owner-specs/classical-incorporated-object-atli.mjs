const spec = {
  "ownerId": "classical-incorporated-object-atli",
  "prefix": "ClassicalIncorporatedObjectAtli",
  "operationId": "classical.incorporated.object.atli.execute",
  "inputContract": "complete-typed-classical-incorporated-object-atli-source",
  "domain": "classical-incorporated-object-atli",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p2967",
    "claim-p2968"
  ],
  "coordinates": {
    "claim-p2967::p2967-note-the-compound-verbstem-a-tl-i-to-drink": {
      "assertionId": "classical-incorporated-object-atli:p2967-note-the-compound-verbstem-a-tl-i-to-drink",
      "canonicalPath": "cases.atli.rules.incorporated-object/atli"
    },
    "claim-p2968::p2968-maguey-juice-a-compound-nounstem-see-31-5-1": {
      "assertionId": "classical-incorporated-object-atli:p2968-maguey-juice-a-compound-nounstem-see-31-5-1",
      "canonicalPath": "cases.atli.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p2967": [],
    "claim-p2968": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2967": "authorized",
    "claim-p2968": "authorized"
  }
};
export default Object.freeze(spec);
