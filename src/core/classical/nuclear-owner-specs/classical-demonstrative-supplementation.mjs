const spec = {
  "ownerId": "classical-demonstrative-supplementation",
  "prefix": "ClassicalDemonstrativeSupplementation",
  "operationId": "classical.demonstrative.supplementation.execute",
  "inputContract": "complete-typed-classical-demonstrative-supplementation-source",
  "domain": "classical-demonstrative-supplementation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1811",
    "claim-p1812",
    "claim-p1813",
    "claim-p1814"
  ],
  "coordinates": {
    "claim-p1811::p1811-the-demonstrative-pronominal-nncs-i-n-and-o-n": {
      "assertionId": "classical-demonstrative-supplementation:p1811-the-demonstrative-pronominal-nncs-i-n-and-o-n",
      "canonicalPath": "demonstrativeSupplement.authorizationStatus"
    },
    "claim-p1812::p1812-also-written-yehhua-tlin-and-yehhuatli": {
      "assertionId": "classical-demonstrative-supplementation:p1812-also-written-yehhua-tlin-and-yehhuatli",
      "canonicalPath": "demonstrativeSupplement.supplementClause.demonstrativeKind"
    },
    "claim-p1813::p1813-also-written-yehhua-ntino-n-and-yehhuantino": {
      "assertionId": "classical-demonstrative-supplementation:p1813-also-written-yehhua-ntino-n-and-yehhuantino",
      "canonicalPath": "extractedFrames.demonstrativeAdjunctor.fusesWithDemonstrative"
    },
    "claim-p1814::p1814-yeh-o-n-that-is-the-one-also-written": {
      "assertionId": "classical-demonstrative-supplementation:p1814-yeh-o-n-that-is-the-one-also-written",
      "canonicalPath": "demonstrativeSupplement.referenceFrame.headRole"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1811": [],
    "claim-p1812": [],
    "claim-p1813": [],
    "claim-p1814": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1811": "authorized",
    "claim-p1812": "authorized",
    "claim-p1813": "authorized",
    "claim-p1814": "authorized"
  }
};
export default Object.freeze(spec);
