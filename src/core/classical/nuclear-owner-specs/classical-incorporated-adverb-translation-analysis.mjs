const spec = {
  "ownerId": "classical-incorporated-adverb-translation-analysis",
  "prefix": "ClassicalIncorporatedAdverbTranslationAnalysis",
  "operationId": "classical.incorporated.adverb.translation.analysis.execute",
  "inputContract": "complete-typed-classical-incorporated-adverb-translation-analysis-source",
  "domain": "classical-incorporated-adverb-translation-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p2978",
    "claim-p2979"
  ],
  "coordinates": {
    "claim-p2978::p2978-the-incorporated-adverb-is-frequently-translated-by-an-adverbial": {
      "assertionId": "classical-incorporated-adverb-translation-analysis:p2978-the-incorporated-adverb-is-frequently-translated-by-an-adverbial",
      "canonicalPath": "contract.translationAndIdiomRole"
    },
    "claim-p2979::p2979-an-incorporated-adverb-compound-verbstem-frequently-has-an-idiomatic": {
      "assertionId": "classical-incorporated-adverb-translation-analysis:p2979-an-incorporated-adverb-compound-verbstem-frequently-has-an-idiomatic",
      "canonicalPath": "contract.storedExampleAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p2978": [],
    "claim-p2979": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2978": "authorized",
    "claim-p2979": "authorized"
  }
};
export default Object.freeze(spec);
