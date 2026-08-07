const spec = {
  "ownerId": "classical-vnc-supplementation-clause-kind",
  "prefix": "ClassicalVncSupplementationClauseKind",
  "operationId": "classical.vnc.supplementation.clause.kind.execute",
  "inputContract": "complete-typed-classical-vnc-supplementation-clause-kind-source",
  "domain": "classical-vnc-supplementation-clause-kind",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1890",
    "claim-p1891",
    "claim-p1892",
    "claim-p1893",
    "claim-p1894",
    "claim-p1895"
  ],
  "coordinates": {
    "claim-p1890::p1890-the-two-preceding-lessons-were-limited-to-a-presentation": {
      "assertionId": "classical-vnc-supplementation-clause-kind:p1890-the-two-preceding-lessons-were-limited-to-a-presentation",
      "canonicalPath": "vncSupplement.principalClause.unitKind"
    },
    "claim-p1891::p1891-it-is-not-however-the-only-sentence-type-that": {
      "assertionId": "classical-vnc-supplementation-clause-kind:p1891-it-is-not-however-the-only-sentence-type-that",
      "canonicalPath": "vncSupplement.supplementClause.unitKind"
    },
    "claim-p1892::p1892-the-intransitive-and-transitive-types-may-also-occur-as": {
      "assertionId": "classical-vnc-supplementation-clause-kind:p1892-the-intransitive-and-transitive-types-may-also-occur-as",
      "canonicalPath": "vncSupplement.authorizationStatus"
    },
    "claim-p1893::p1893-it-is-however-almost-always-optional": {
      "assertionId": "classical-vnc-supplementation-clause-kind:p1893-it-is-however-almost-always-optional",
      "canonicalPath": "vncSupplement.operationFrames.2.adjunctor"
    },
    "claim-p1894::p1894-in-this-role-vncs-are-usually-marked-by-means": {
      "assertionId": "classical-vnc-supplementation-clause-kind:p1894-in-this-role-vncs-are-usually-marked-by-means",
      "canonicalPath": "vncSupplement.formulaStringAuthority"
    },
    "claim-p1895::p1895-as-will-be-seen-using-vncs-in-this-way": {
      "assertionId": "classical-vnc-supplementation-clause-kind:p1895-as-will-be-seen-using-vncs-in-this-way",
      "canonicalPath": "vncSupplement.principalClause.unitKind"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1890": [],
    "claim-p1891": [],
    "claim-p1892": [],
    "claim-p1893": [],
    "claim-p1894": [],
    "claim-p1895": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1890": "authorized",
    "claim-p1891": "authorized",
    "claim-p1892": "authorized",
    "claim-p1893": "authorized",
    "claim-p1894": "authorized",
    "claim-p1895": "authorized"
  }
};
export default Object.freeze(spec);
