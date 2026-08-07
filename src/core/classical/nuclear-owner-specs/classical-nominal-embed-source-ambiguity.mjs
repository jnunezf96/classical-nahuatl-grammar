const spec = {
  "ownerId": "classical-nominal-embed-source-ambiguity",
  "prefix": "ClassicalNominalEmbedSourceAmbiguity",
  "operationId": "classical.nominal.embed.source.ambiguity.execute",
  "inputContract": "complete-typed-classical-nominal-embed-source-ambiguity-source",
  "domain": "classical-nominal-embed-source-ambiguity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p3035",
    "claim-p3036"
  ],
  "coordinates": {
    "claim-p3035::p3035-note-1-in-many-instances-the-concatenate-source-sentence": {
      "assertionId": "classical-nominal-embed-source-ambiguity:p3035-note-1-in-many-instances-the-concatenate-source-sentence",
      "canonicalPath": "cases.directAmbiguity.rules.nominal-embed/source-ambiguity"
    },
    "claim-p3036::p3036-at-times-careful-attention-is-needed-to-distinguish-the": {
      "assertionId": "classical-nominal-embed-source-ambiguity:p3036-at-times-careful-attention-is-needed-to-distinguish-the",
      "canonicalPath": "cases.directAmbiguity.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p3035": [],
    "claim-p3036": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3035": "authorized",
    "claim-p3036": "authorized"
  }
};
export default Object.freeze(spec);
