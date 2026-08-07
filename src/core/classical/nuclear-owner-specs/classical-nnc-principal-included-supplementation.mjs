const spec = {
  "ownerId": "classical-nnc-principal-included-supplementation",
  "prefix": "ClassicalNncPrincipalIncludedSupplementation",
  "operationId": "classical.nnc.principal.included.supplementation.execute",
  "inputContract": "complete-typed-classical-nnc-principal-included-supplementation-source",
  "domain": "classical-nnc-principal-included-supplementation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1928",
    "claim-p1929",
    "claim-p1930",
    "claim-p1932",
    "claim-p1933",
    "claim-p1934"
  ],
  "coordinates": {
    "claim-p1928::p1928-subject-of-nelli-but-this-sentence-is-ambiguous-it": {
      "assertionId": "classical-nnc-principal-included-supplementation:p1928-subject-of-nelli-but-this-sentence-is-ambiguous-it",
      "canonicalPath": "includedAntecessive.principalClause.unitKind"
    },
    "claim-p1929::p1929-i-e-i-spoke-the-truth-with-the-nuclear": {
      "assertionId": "classical-nnc-principal-included-supplementation:p1929-i-e-i-spoke-the-truth-with-the-nuclear",
      "canonicalPath": "includedAntecessive.supplementClause.unitKind"
    },
    "claim-p1930::p1930-subject-having-the-same-referent-as-its-head-the": {
      "assertionId": "classical-nnc-principal-included-supplementation:p1930-subject-having-the-same-referent-as-its-head-the",
      "canonicalPath": "includedAntecessive.referenceFrame.referenceMode"
    },
    "claim-p1932::p1932-subject-is-the-referent-of-the-personal-pronominal-subject": {
      "assertionId": "classical-nnc-principal-included-supplementation:p1932-subject-is-the-referent-of-the-personal-pronominal-subject",
      "canonicalPath": "includedAntecessive.referenceFrame.wholeSupplementIsReferent"
    },
    "claim-p1933::p1933-among-the-nncs-that-frequently-serve-as-the-principal": {
      "assertionId": "classical-nnc-principal-included-supplementation:p1933-among-the-nncs-that-frequently-serve-as-the-principal",
      "canonicalPath": "includedAntecessive.authorizationStatus"
    },
    "claim-p1934::p1934-included-referent-supplementation-in-which-the-adjunct-is-a": {
      "assertionId": "classical-nnc-principal-included-supplementation:p1934-included-referent-supplementation-in-which-the-adjunct-is-a",
      "canonicalPath": "includedAntecessive.principalClause.unitKind"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1928": [],
    "claim-p1929": [],
    "claim-p1930": [],
    "claim-p1932": [],
    "claim-p1933": [],
    "claim-p1934": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1928": "authorized",
    "claim-p1929": "authorized",
    "claim-p1930": "authorized",
    "claim-p1932": "authorized",
    "claim-p1933": "authorized",
    "claim-p1934": "authorized"
  }
};
export default Object.freeze(spec);
