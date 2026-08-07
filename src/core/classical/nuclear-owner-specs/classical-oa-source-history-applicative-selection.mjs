const spec = {
  "ownerId": "classical-oa-source-history-applicative-selection",
  "prefix": "ClassicalOaSourceHistoryApplicativeSelection",
  "operationId": "classical.oa.source.history.applicative.selection.execute",
  "inputContract": "complete-typed-classical-oa-source-history-applicative-selection-source",
  "domain": "classical-oa-source-history-applicative-selection",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-applicative-runtime",
  "selections": [
    "claim-p2591",
    "claim-p2592"
  ],
  "coordinates": {
    "claim-p2591::p2591-when-the-o-a-participates-in-a-causitive-destockal": {
      "assertionId": "classical-oa-source-history-applicative-selection:p2591-when-the-o-a-participates-in-a-causitive-destockal",
      "canonicalPath": "formations.oaHistoryAHui.option.targetStem"
    },
    "claim-p2592::p2592-the-a-l-is-used-when-the-intransitive-destockal": {
      "assertionId": "classical-oa-source-history-applicative-selection:p2592-the-a-l-is-used-when-the-intransitive-destockal",
      "canonicalPath": "formations.oaHistoryIHui.option.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlApplicativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlApplicativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2591": [],
    "claim-p2592": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2591": "authorized",
    "claim-p2592": "authorized"
  }
};
export default Object.freeze(spec);
