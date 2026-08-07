const spec = {
  "ownerId": "classical-nequi-future-embed-compound",
  "prefix": "ClassicalNequiFutureEmbedCompound",
  "operationId": "classical.nequi.future.embed.compound.execute",
  "inputContract": "complete-typed-classical-nequi-future-embed-compound-source",
  "domain": "classical-nequi-future-embed-compound",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2873",
    "claim-p2874",
    "claim-p2875"
  ],
  "coordinates": {
    "claim-p2873::p2873-tla-nequi-to-wants-th-to-desires-th-principal": {
      "assertionId": "classical-nequi-future-embed-compound:p2873-tla-nequi-to-wants-th-to-desires-th-principal",
      "canonicalPath": "cases.futureNequi.targetStem"
    },
    "claim-p2874::p2874-tla-co-hua-z-nequi-to-want-to-buys": {
      "assertionId": "classical-nequi-future-embed-compound:p2874-tla-co-hua-z-nequi-to-want-to-buys",
      "canonicalPath": "cases.futureNequi.facts.embedTenseMorph"
    },
    "claim-p2875::p2875-a-vnc-built-on-a-compound-stem-with-tla": {
      "assertionId": "classical-nequi-future-embed-compound:p2875-a-vnc-built-on-a-compound-stem-with-tla",
      "canonicalPath": "cases.futureNequi.facts.matrixSourceValence"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2873": [],
    "claim-p2874": [],
    "claim-p2875": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2873": "authorized",
    "claim-p2874": "authorized",
    "claim-p2875": "authorized"
  }
};
export default Object.freeze(spec);
