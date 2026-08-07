const spec = {
  "ownerId": "classical-incorporated-adverb-tla-fusion",
  "prefix": "ClassicalIncorporatedAdverbTlaFusion",
  "operationId": "classical.incorporated.adverb.tla.fusion.execute",
  "inputContract": "complete-typed-classical-incorporated-adverb-tla-fusion-source",
  "domain": "classical-incorporated-adverb-tla-fusion",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p2971",
    "claim-p2972"
  ],
  "coordinates": {
    "claim-p2971::p2971-in-certain-incorporated-nnc-compound-verbstems-what-should-presumably": {
      "assertionId": "classical-incorporated-adverb-tla-fusion:p2971-in-certain-incorporated-nnc-compound-verbstems-what-should-presumably",
      "canonicalPath": "cases.tlaFusion.rules.incorporated-adverb/tla-fusion"
    },
    "claim-p2972::p2972-since-the-tla-should-represent-a-fused-object-pronoun": {
      "assertionId": "classical-incorporated-adverb-tla-fusion:p2972-since-the-tla-should-represent-a-fused-object-pronoun",
      "canonicalPath": "cases.tlaFusion.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p2971": [],
    "claim-p2972": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2971": "authorized",
    "claim-p2972": "authorized"
  }
};
export default Object.freeze(spec);
