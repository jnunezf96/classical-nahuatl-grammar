const spec = {
  "ownerId": "classical-nominal-embed-ih-family",
  "prefix": "ClassicalNominalEmbedIhFamily",
  "operationId": "classical.nominal.embed.ih.family.execute",
  "inputContract": "complete-typed-classical-nominal-embed-ih-family-source",
  "domain": "classical-nominal-embed-ih-family",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p3011",
    "claim-p3012",
    "claim-p3013"
  ],
  "coordinates": {
    "claim-p3011::p3011-the-nounstem-ih-also-occurs-as-an-incorporated-adverb": {
      "assertionId": "classical-nominal-embed-ih-family:p3011-the-nounstem-ih-also-occurs-as-an-incorporated-adverb",
      "canonicalPath": "cases.ihFamily.rules.nominal-embed/ih-family"
    },
    "claim-p3012::p3012-it-is-likely-that-ih-is-a-glottalized-variant": {
      "assertionId": "classical-nominal-embed-ih-family:p3012-it-is-likely-that-ih-is-a-glottalized-variant",
      "canonicalPath": "cases.ihFamily.authorizationStatus"
    },
    "claim-p3013::p3013-this-is-often-not-evident-in-the-translation-value": {
      "assertionId": "classical-nominal-embed-ih-family:p3013-this-is-often-not-evident-in-the-translation-value",
      "canonicalPath": "cases.ihFamily.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p3011": [],
    "claim-p3012": [],
    "claim-p3013": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3011": "authorized",
    "claim-p3012": "authorized",
    "claim-p3013": "authorized"
  }
};
export default Object.freeze(spec);
