const spec = {
  "ownerId": "classical-personal-name-nnc-incorporated-embed-not-subject",
  "prefix": "ClassicalPersonalNameNncIncorporatedEmbedNotSubject",
  "operationId": "classical.personal.name.nnc.incorporated.embed.not.subject.execute",
  "inputContract": "complete-typed-classical-personal-name-nnc-incorporated-embed-not-subject-source",
  "domain": "classical-personal-name-nnc-incorporated-embed-not-subject",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-personal-name-nnc-runtime",
  "selections": [
    "claim-p5176",
    "claim-p5177"
  ],
  "coordinates": {
    "claim-p5176::p5176-mistranslation-because-the-inner-stem-cua-uh-tli-eagle": {
      "assertionId": "classical-personal-name-nnc-incorporated-embed-not-subject:p5176-mistranslation-because-the-inner-stem-cua-uh-tli-eagle",
      "canonicalPath": "result.canonicalResult"
    },
    "claim-p5177::p5177-the-eagle-therefore-cannot-perform-the-alleged-action-of": {
      "assertionId": "classical-personal-name-nnc-incorporated-embed-not-subject:p5177-the-eagle-therefore-cannot-perform-the-alleged-action-of",
      "canonicalPath": "result.innerSubjectBarrier"
    }
  },
  "executionFunctionName": "buildClassicalPersonalNameNncValidationFrame",
  "executionValidatorName": "isClassicalPersonalNameNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p5176": [
      "incorporated-embed-not-subject",
      "present-agentive",
      "default",
      ""
    ],
    "claim-p5177": [
      "incorporated-embed-not-subject",
      "present-agentive",
      "default",
      ""
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p5176": "authorized",
    "claim-p5177": "authorized"
  }
};
export default Object.freeze(spec);
