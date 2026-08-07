const spec = {
  "ownerId": "classical-incorporated-adverb-direct-possessor-deletion",
  "prefix": "ClassicalIncorporatedAdverbDirectPossessorDeletion",
  "operationId": "classical.incorporated.adverb.direct.possessor.deletion.execute",
  "inputContract": "complete-typed-classical-incorporated-adverb-direct-possessor-deletion-source",
  "domain": "classical-incorporated-adverb-direct-possessor-deletion",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p2986",
    "claim-p2987",
    "claim-p2989",
    "claim-p2990"
  ],
  "coordinates": {
    "claim-p2986::p2986-frequently-the-adverb-of-means-or-instrument-in-the": {
      "assertionId": "classical-incorporated-adverb-direct-possessor-deletion:p2986-frequently-the-adverb-of-means-or-instrument-in-the",
      "canonicalPath": "cases.directPossessorDeletion.rules.incorporated-adverb/direct-possessor-deletion"
    },
    "claim-p2987::p2987-when-incorporated-into-a-compound-the-possessive-pronoun-that": {
      "assertionId": "classical-incorporated-adverb-direct-possessor-deletion:p2987-when-incorporated-into-a-compound-the-possessive-pronoun-that",
      "canonicalPath": "cases.directPossessorDeletion.authorizationStatus"
    },
    "claim-p2989::p2989-as-in-the-formation-in-30-7-a-stem": {
      "assertionId": "classical-incorporated-adverb-direct-possessor-deletion:p2989-as-in-the-formation-in-30-7-a-stem",
      "canonicalPath": "cases.directPossessorDeletion.gcdSatisfied"
    },
    "claim-p2990::p2990-again-the-possessor-pronoun-in-the-source-is-deleted": {
      "assertionId": "classical-incorporated-adverb-direct-possessor-deletion:p2990-again-the-possessor-pronoun-in-the-source-is-deleted",
      "canonicalPath": "cases.directPossessorDeletion.lcmComplete"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p2986": [],
    "claim-p2987": [],
    "claim-p2989": [],
    "claim-p2990": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2986": "authorized",
    "claim-p2987": "authorized",
    "claim-p2989": "authorized",
    "claim-p2990": "authorized"
  }
};
export default Object.freeze(spec);
