const spec = {
  "ownerId": "classical-ayi-silent-object-supplementation",
  "prefix": "ClassicalAyiSilentObjectSupplementation",
  "operationId": "classical.ayi.silent.object.supplementation.execute",
  "inputContract": "complete-typed-classical-ayi-silent-object-supplementation-source",
  "domain": "classical-ayi-silent-object-supplementation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1857",
    "claim-p1858",
    "claim-p1859",
    "claim-p1860",
    "claim-p1861",
    "claim-p1862"
  ],
  "coordinates": {
    "claim-p1857::p1857-the-transitive-verb-tla-a-yi-to-dos-th": {
      "assertionId": "classical-ayi-silent-object-supplementation:p1857-the-transitive-verb-tla-a-yi-to-dos-th",
      "canonicalPath": "ayi.authorizationStatus"
    },
    "claim-p1858::p1858-if-the-patient-is-specific": {
      "assertionId": "classical-ayi-silent-object-supplementation:p1858-if-the-patient-is-specific",
      "canonicalPath": "ayi.referenceFrame.headRole"
    },
    "claim-p1859::p1859-present-this-means-that-when-an-nnc-is-adjoined": {
      "assertionId": "classical-ayi-silent-object-supplementation:p1859-present-this-means-that-when-an-nnc-is-adjoined",
      "canonicalPath": "ayi.referenceFrame.principalReferenceId"
    },
    "claim-p1860::p1860-when-an-nnc-is-adjoined-as-a-supplementary-object": {
      "assertionId": "classical-ayi-silent-object-supplementation:p1860-when-an-nnc-is-adjoined-as-a-supplementary-object",
      "canonicalPath": "ayi.referenceFrame.referenceIdentityUnified"
    },
    "claim-p1861::p1861-vncs-built-on-the-imperfective-stem-are-traditionally-written": {
      "assertionId": "classical-ayi-silent-object-supplementation:p1861-vncs-built-on-the-imperfective-stem-are-traditionally-written",
      "canonicalPath": "ayiEvidence.principalClause.silentSpecificObjectAuthorized"
    },
    "claim-p1862::p1862-note-the-verb-ich-tequi-to-steal-literally-to": {
      "assertionId": "classical-ayi-silent-object-supplementation:p1862-note-the-verb-ich-tequi-to-steal-literally-to",
      "canonicalPath": "extractedFrames.ayi.perfectiveStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1857": [],
    "claim-p1858": [],
    "claim-p1859": [],
    "claim-p1860": [],
    "claim-p1861": [],
    "claim-p1862": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1857": "authorized",
    "claim-p1858": "authorized",
    "claim-p1859": "authorized",
    "claim-p1860": "authorized",
    "claim-p1861": "authorized",
    "claim-p1862": "authorized"
  }
};
export default Object.freeze(spec);
