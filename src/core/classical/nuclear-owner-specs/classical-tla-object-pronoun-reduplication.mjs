const spec = {
  "ownerId": "classical-tla-object-pronoun-reduplication",
  "prefix": "ClassicalTlaObjectPronounReduplication",
  "operationId": "classical.tla.object.pronoun.reduplication.execute",
  "inputContract": "complete-typed-classical-tla-object-pronoun-reduplication-source",
  "domain": "classical-tla-object-pronoun-reduplication",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2676",
    "claim-p2677"
  ],
  "coordinates": {
    "claim-p2676::p2676-in-instances-of-tla-fusion-see-7-10-the": {
      "assertionId": "classical-tla-object-pronoun-reduplication:p2676-in-instances-of-tla-fusion-see-7-10-the",
      "canonicalPath": "cases.fusedTlaObjectScope.operationFacts.objectPronounReduplicated"
    },
    "claim-p2677::p2677-the-reduplicated-tla-can-be-fused-to-a-reduplicated": {
      "assertionId": "classical-tla-object-pronoun-reduplication:p2677-the-reduplicated-tla-can-be-fused-to-a-reduplicated",
      "canonicalPath": "cases.fusedTlaAndStem.operationFacts.lexicalStemAlsoReduplicated"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2676": [],
    "claim-p2677": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2676": "authorized",
    "claim-p2677": "authorized"
  }
};
export default Object.freeze(spec);
