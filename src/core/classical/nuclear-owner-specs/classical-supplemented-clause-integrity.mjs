const spec = {
  "ownerId": "classical-supplemented-clause-integrity",
  "prefix": "ClassicalSupplementedClauseIntegrity",
  "operationId": "classical.supplemented.clause.integrity.execute",
  "inputContract": "complete-typed-classical-supplemented-clause-integrity-source",
  "domain": "classical-supplemented-clause-integrity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1886",
    "claim-p1887",
    "claim-p1888",
    "claim-p1889"
  ],
  "coordinates": {
    "claim-p1886::p1886-from-the-indo-european-point-of-view-nouns-and": {
      "assertionId": "classical-supplemented-clause-integrity:p1886-from-the-indo-european-point-of-view-nouns-and",
      "canonicalPath": "shared.principalClause.authorizationStatus"
    },
    "claim-p1887::p1887-this-temptation-must-be-resisted": {
      "assertionId": "classical-supplemented-clause-integrity:p1887-this-temptation-must-be-resisted",
      "canonicalPath": "shared.supplementClause.authorizationStatus"
    },
    "claim-p1888::p1888-result-neither-ceases-to-be-a-fully-constituted-clause": {
      "assertionId": "classical-supplemented-clause-integrity:p1888-result-neither-ceases-to-be-a-fully-constituted-clause",
      "canonicalPath": "extractedFrames.shortPronominal.completeClauseStatusPreserved"
    },
    "claim-p1889::p1889-when-adjoined-as-part-of-a-larger-sentence-neither": {
      "assertionId": "classical-supplemented-clause-integrity:p1889-when-adjoined-as-part-of-a-larger-sentence-neither",
      "canonicalPath": "recursive.supplementContinuationFrames.0.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1886": [],
    "claim-p1887": [],
    "claim-p1888": [],
    "claim-p1889": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1886": "authorized",
    "claim-p1887": "authorized",
    "claim-p1888": "authorized",
    "claim-p1889": "authorized"
  }
};
export default Object.freeze(spec);
