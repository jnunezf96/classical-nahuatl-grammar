const spec = {
  "ownerId": "classical-compound-embed-function-system",
  "prefix": "ClassicalCompoundEmbedFunctionSystem",
  "operationId": "classical.compound.embed.function.system.execute",
  "inputContract": "complete-typed-classical-compound-embed-function-system-source",
  "domain": "classical-compound-embed-function-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2741",
    "claim-p2743",
    "claim-p2744"
  ],
  "coordinates": {
    "claim-p2741::p2741-the-nuclear-clause-whose-stem-occupies-the-embed-subposition": {
      "assertionId": "classical-compound-embed-function-system:p2741-the-nuclear-clause-whose-stem-occupies-the-embed-subposition",
      "canonicalPath": "contract.embedNeverFunctionsAsSubject"
    },
    "claim-p2743::p2743-subject-and-predicate-are-antipodal-mutually-exclusive-functions-and": {
      "assertionId": "classical-compound-embed-function-system:p2743-subject-and-predicate-are-antipodal-mutually-exclusive-functions-and",
      "canonicalPath": "contract.embedNeverFunctionsAsSubject"
    },
    "claim-p2744::p2744-information-concerning-more-specialized-instances-of-embed-formation-will": {
      "assertionId": "classical-compound-embed-function-system:p2744-information-concerning-more-specialized-instances-of-embed-formation-will",
      "canonicalPath": "contract.operationOrder.0"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2741": [],
    "claim-p2743": [],
    "claim-p2744": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2741": "authorized",
    "claim-p2743": "authorized",
    "claim-p2744": "authorized"
  },
  "nonExecutableObservations": {
    "claim-p2742::p2742-it-can-never-function-as-an-incorporated-subject-there": {
      "assertionId": "classical-compound-embed-function-system:p2742-it-can-never-function-as-an-incorporated-subject-there",
      "disposition": "documentary-claim-runtime-observation-unverified",
      "reason": "Canvas9366–9369 excludes incorporated-subject function for an embed; operation order does not witness that structural restriction. The adapter has a handwritten no-subject flag, not a matching negative-execution observation.",
      "retiredCanonicalPath": "contract.operationOrder.0",
      "executionCredit": false,
      "grammarAuthority": false
    }
  }
};
export default Object.freeze(spec);
