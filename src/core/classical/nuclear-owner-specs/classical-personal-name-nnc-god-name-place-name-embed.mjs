const spec = {
  "ownerId": "classical-personal-name-nnc-god-name-place-name-embed",
  "prefix": "ClassicalPersonalNameNncGodNamePlaceNameEmbed",
  "operationId": "classical.personal.name.nnc.god.name.place.name.embed.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-god-name-place-name-embed-source",
  "domain": "classical-personal-name-nnc-god-name-place-name-embed",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5233",
    "claim-p5234",
    "claim-p5235"
  ],
  "coordinates": {
    "claim-p5233::p5233-note-2-the-name-of-a-god-can-appear": {
      "assertionId": "classical-personal-name-nnc-god-name-place-name-embed:p5233-note-2-the-name-of-a-god-can-appear",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5234::p5234-the-personal-name-nounstem-i-e-the-predicate-of": {
      "assertionId": "classical-personal-name-nnc-god-name-place-name-embed:p5234-the-personal-name-nounstem-i-e-the-predicate-of",
      "canonicalPath": "result.innerSubjectBarrier"
    },
    "claim-p5235::p5235-in-the-analyzed-versions-a-plus-sign-marks-the": {
      "assertionId": "classical-personal-name-nnc-god-name-place-name-embed:p5235-in-the-analyzed-versions-a-plus-sign-marks-the",
      "canonicalPath": "result.sourceFamily"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5233": [
      "god-name-place-name-embed",
      "absolutive-state-nnc",
      "default",
      "god-name-to-place-name-embed"
    ],
    "claim-p5234": [
      "god-name-place-name-embed",
      "absolutive-state-nnc",
      "default",
      "god-name-to-place-name-embed"
    ],
    "claim-p5235": [
      "god-name-place-name-embed",
      "absolutive-state-nnc",
      "default",
      "god-name-to-place-name-embed"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5233": "authorized",
    "claim-p5234": "authorized",
    "claim-p5235": "authorized"
  }
};
export default Object.freeze(spec);
