const spec = {
  "ownerId": "classical-nominal-embed-reduplication",
  "prefix": "ClassicalNominalEmbedReduplication",
  "operationId": "classical.nominal.embed.reduplication.execute",
  "inputContract": "complete-typed-classical-nominal-embed-reduplication-source",
  "domain": "classical-nominal-embed-reduplication",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p3049",
    "claim-p3050",
    "claim-p3051"
  ],
  "coordinates": {
    "claim-p3049::p3049-the-compound-verbstem-containing-an-incorporated-predicate-of-an": {
      "assertionId": "classical-nominal-embed-reduplication:p3049-the-compound-verbstem-containing-an-incorporated-predicate-of-an",
      "canonicalPath": "cases.reduplication.rules.nominal-embed/reduplication"
    },
    "claim-p3050::p3050-the-matrix-verbstem-may-of-course-be-reduplicated-see": {
      "assertionId": "classical-nominal-embed-reduplication:p3050-the-matrix-verbstem-may-of-course-be-reduplicated-see",
      "canonicalPath": "cases.reduplication.authorizationStatus"
    },
    "claim-p3051::p3051-it-is-also-possible-to-have-reduplication-on-both": {
      "assertionId": "classical-nominal-embed-reduplication:p3051-it-is-also-possible-to-have-reduplication-on-both",
      "canonicalPath": "cases.reduplication.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p3049": [],
    "claim-p3050": [],
    "claim-p3051": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3049": "authorized",
    "claim-p3050": "authorized",
    "claim-p3051": "authorized"
  }
};
export default Object.freeze(spec);
