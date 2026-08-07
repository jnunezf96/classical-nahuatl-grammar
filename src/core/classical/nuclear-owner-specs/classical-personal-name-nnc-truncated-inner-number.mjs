const spec = {
  "ownerId": "classical-personal-name-nnc-truncated-inner-number",
  "prefix": "ClassicalPersonalNameNncTruncatedInnerNumber",
  "operationId": "classical.personal.name.nnc.truncated.inner.number.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-truncated-inner-number-source",
  "domain": "classical-personal-name-nnc-truncated-inner-number",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5203",
    "claim-p5204",
    "claim-p5205",
    "claim-p5206"
  ],
  "coordinates": {
    "claim-p5203::p5203-the-result-seems-to-have-an-informal-quality-vaguely": {
      "assertionId": "classical-personal-name-nnc-truncated-inner-number:p5203-the-result-seems-to-have-an-informal-quality-vaguely",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5204::p5204-some-personal-name-nncs-appear-only-in-this-truncated": {
      "assertionId": "classical-personal-name-nnc-truncated-inner-number:p5204-some-personal-name-nncs-appear-only-in-this-truncated",
      "canonicalPath": "result.innerSubjectBarrier"
    },
    "claim-p5205::p5205-glottalized-form-of-hue-tl-a-big-thing-see": {
      "assertionId": "classical-personal-name-nnc-truncated-inner-number:p5205-glottalized-form-of-hue-tl-a-big-thing-see",
      "canonicalPath": "result.sourceFamily"
    },
    "claim-p5206::p5206-while-it-is-not-impossible-for-a-personal-name": {
      "assertionId": "classical-personal-name-nnc-truncated-inner-number:p5206-while-it-is-not-impossible-for-a-personal-name",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5203": [
      "truncated-inner-number",
      "absolutive-state-truncated-inner-number",
      "default",
      ""
    ],
    "claim-p5204": [
      "truncated-inner-number",
      "absolutive-state-truncated-inner-number",
      "default",
      ""
    ],
    "claim-p5205": [
      "truncated-inner-number",
      "absolutive-state-truncated-inner-number",
      "default",
      ""
    ],
    "claim-p5206": [
      "truncated-inner-number",
      "absolutive-state-truncated-inner-number",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5203": "authorized",
    "claim-p5204": "authorized",
    "claim-p5205": "authorized",
    "claim-p5206": "authorized"
  }
};
export default Object.freeze(spec);
