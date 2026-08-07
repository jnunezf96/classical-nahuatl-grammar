const spec = {
  "ownerId": "classical-demonstrative-pronominal-plural-cooperation",
  "prefix": "ClassicalDemonstrativePronominalPluralCooperation",
  "operationId": "classical.demonstrative.pronominal.plural.cooperation.execute",
  "inputContract": "complete-typed-classical-demonstrative-pronominal-plural-cooperation-source",
  "domain": "classical-demonstrative-pronominal-plural-cooperation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1909",
    "claim-p1910",
    "claim-p1911",
    "claim-p1912",
    "claim-p1913",
    "claim-p1914",
    "claim-p1915"
  ],
  "coordinates": {
    "claim-p1909::p1909-the-demonstrative-pronominal-nncs-in-and-o-n-and": {
      "assertionId": "classical-demonstrative-pronominal-plural-cooperation:p1909-the-demonstrative-pronominal-nncs-in-and-o-n-and",
      "canonicalPath": "demonstrativePluralCooperation.route"
    },
    "claim-p1910::p1910-the-principal-in-the-combination-is-a-vnc-formed": {
      "assertionId": "classical-demonstrative-pronominal-plural-cooperation:p1910-the-principal-in-the-combination-is-a-vnc-formed",
      "canonicalPath": "demonstrativePlural.principalClause.sourceStem"
    },
    "claim-p1911::p1911-of-the-supplement-qu-eh-in-the-principal": {
      "assertionId": "classical-demonstrative-pronominal-plural-cooperation:p1911-of-the-supplement-qu-eh-in-the-principal",
      "canonicalPath": "demonstrativePlural.supplementClause.subject.category"
    },
    "claim-p1912::p1912-traditionally-the-resultant-collocations-are-spelled-either-partially-or": {
      "assertionId": "classical-demonstrative-pronominal-plural-cooperation:p1912-traditionally-the-resultant-collocations-are-spelled-either-partially-or",
      "canonicalPath": "demonstrativePluralCooperation.zeroRootPrincipal"
    },
    "claim-p1913::p1913-the-final-n-is-frequently-not-written": {
      "assertionId": "classical-demonstrative-pronominal-plural-cooperation:p1913-the-final-n-is-frequently-not-written",
      "canonicalPath": "demonstrativePluralCooperation.cooperationDerivedFromOwnerIssuedVncSource"
    },
    "claim-p1914::p1914-subject-in-cross-reference-to-the-nuclear-subject-of": {
      "assertionId": "classical-demonstrative-pronominal-plural-cooperation:p1914-subject-in-cross-reference-to-the-nuclear-subject-of",
      "canonicalPath": "demonstrativePlural.authorizationStatus"
    },
    "claim-p1915::p1915-this-nnc-is-a-preterit-aspresent-agentive-nnc-see": {
      "assertionId": "classical-demonstrative-pronominal-plural-cooperation:p1915-this-nnc-is-a-preterit-aspresent-agentive-nnc-see",
      "canonicalPath": "demonstrativePluralCooperation.route"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1909": [],
    "claim-p1910": [],
    "claim-p1911": [],
    "claim-p1912": [],
    "claim-p1913": [],
    "claim-p1914": [],
    "claim-p1915": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1909": "authorized",
    "claim-p1910": "authorized",
    "claim-p1911": "authorized",
    "claim-p1912": "authorized",
    "claim-p1913": "authorized",
    "claim-p1914": "authorized",
    "claim-p1915": "authorized"
  }
};
export default Object.freeze(spec);
