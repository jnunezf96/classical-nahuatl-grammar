const spec = {
  "ownerId": "classical-adverbial-semantic-domain-lexical-gate",
  "prefix": "ClassicalAdverbialSemanticDomainLexicalGate",
  "operationId": "classical.adverbial.semantic.domain.lexical.gate.execute",
  "inputContract": "complete-typed-classical-adverbial-semantic-domain-lexical-gate-source",
  "domain": "classical-adverbial-semantic-domain-lexical-gate",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4138",
    "claim-p4139",
    "claim-p4140"
  ],
  "coordinates": {
    "claim-p4138::p4138-this-means-that-the-possibility-for-adverbialization-is-constrained": {
      "assertionId": "classical-adverbial-semantic-domain-lexical-gate:p4138-this-means-that-the-possibility-for-adverbialization-is-constrained",
      "canonicalPath": "cases.overview.canonicalResult"
    },
    "claim-p4139::p4139-perhaps-the-pronoun-in-expressions-such-as-it-s": {
      "assertionId": "classical-adverbial-semantic-domain-lexical-gate:p4139-perhaps-the-pronoun-in-expressions-such-as-it-s",
      "canonicalPath": "cases.overview.typedSourceAuthority"
    },
    "claim-p4140::p4140-this-it-should-not-be-thought-of-as-referring": {
      "assertionId": "classical-adverbial-semantic-domain-lexical-gate:p4140-this-it-should-not-be-thought-of-as-referring",
      "canonicalPath": "contract.sourceAndAdverbialOperationsRemainSeparate"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4138": [],
    "claim-p4139": [],
    "claim-p4140": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4138": "authorized",
    "claim-p4139": "authorized",
    "claim-p4140": "authorized"
  }
};
export default Object.freeze(spec);
