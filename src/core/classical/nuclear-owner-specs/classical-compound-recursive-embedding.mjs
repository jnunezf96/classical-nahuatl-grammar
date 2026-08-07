const spec = {
  "ownerId": "classical-compound-recursive-embedding",
  "prefix": "ClassicalCompoundRecursiveEmbedding",
  "operationId": "classical.compound.recursive.embedding.execute",
  "inputContract": "complete-typed-classical-compound-recursive-embedding-source",
  "domain": "classical-compound-recursive-embedding",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2886",
    "claim-p2887",
    "claim-p2888",
    "claim-p2889"
  ],
  "coordinates": {
    "claim-p2886::p2886-tla-cuah-t-ahci-ti-uh-to-go-along": {
      "assertionId": "classical-compound-recursive-embedding:p2886-tla-cuah-t-ahci-ti-uh-to-go-along",
      "canonicalPath": "cases.recursiveEmbed.authorizationStatus"
    },
    "claim-p2887::p2887-tla-cuah-t-ahci-ti-ya-z-nequi-to": {
      "assertionId": "classical-compound-recursive-embedding:p2887-tla-cuah-t-ahci-ti-ya-z-nequi-to",
      "canonicalPath": "cases.recursiveEmbed.facts.recursiveEmbed"
    },
    "claim-p2888::p2888-coch-ti-pil-ca-t-o-to-remain-asleep": {
      "assertionId": "classical-compound-recursive-embedding:p2888-coch-ti-pil-ca-t-o-to-remain-asleep",
      "canonicalPath": "cases.recursiveEmbed.ruleFamily"
    },
    "claim-p2889::p2889-te-cui-ti-huetzi-z-nequi-to-want-to": {
      "assertionId": "classical-compound-recursive-embedding:p2889-te-cui-ti-huetzi-z-nequi-to-want-to",
      "canonicalPath": "contract.recursiveTypedClosureRequired"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2886": [],
    "claim-p2887": [],
    "claim-p2888": [],
    "claim-p2889": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2886": "authorized",
    "claim-p2887": "authorized",
    "claim-p2888": "authorized",
    "claim-p2889": "authorized"
  }
};
export default Object.freeze(spec);
