const spec = {
  "ownerId": "classical-adjectival-principal-clause-ambiguity",
  "prefix": "ClassicalAdjectivalPrincipalClauseAmbiguity",
  "operationId": "classical.adjectival.principal.clause.ambiguity.execute",
  "inputContract": "complete-typed-classical-adjectival-principal-clause-ambiguity-source",
  "domain": "classical-adjectival-principal-clause-ambiguity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4035",
    "claim-p4036",
    "claim-p4037",
    "claim-p4038",
    "claim-p4039"
  ],
  "coordinates": {
    "claim-p4035::p4035-meaning-depends-upon-which-nucleus-is-understood-to-be": {
      "assertionId": "classical-adjectival-principal-clause-ambiguity:p4035-meaning-depends-upon-which-nucleus-is-understood-to-be",
      "canonicalPath": "cases.ordinary.canonicalResult"
    },
    "claim-p4036::p4036-when-such-a-structure-serves-as-an-adjoined-unit": {
      "assertionId": "classical-adjectival-principal-clause-ambiguity:p4036-when-such-a-structure-serves-as-an-adjoined-unit",
      "canonicalPath": "cases.ordinary.operationKind"
    },
    "claim-p4037::p4037-since-either-nuclear-clause-can-serve-as-principal-ambiguity": {
      "assertionId": "classical-adjectival-principal-clause-ambiguity:p4037-since-either-nuclear-clause-can-serve-as-principal-ambiguity",
      "canonicalPath": "cases.ordinary.headRank"
    },
    "claim-p4038::p4038-the-principal-clause-of-each-structure-is-italicized-cuei": {
      "assertionId": "classical-adjectival-principal-clause-ambiguity:p4038-the-principal-clause-of-each-structure-is-italicized-cuei",
      "canonicalPath": "cases.ordinary.modifierRank"
    },
    "claim-p4039::p4039-consequently-the-last-two-examples-given-above-are-ambiguous": {
      "assertionId": "classical-adjectival-principal-clause-ambiguity:p4039-consequently-the-last-two-examples-given-above-are-ambiguous",
      "canonicalPath": "cases.ordinary.formulaGeneratedIndependently"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4035": [],
    "claim-p4036": [],
    "claim-p4037": [],
    "claim-p4038": [],
    "claim-p4039": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4035": "authorized",
    "claim-p4036": "authorized",
    "claim-p4037": "authorized",
    "claim-p4038": "authorized",
    "claim-p4039": "authorized"
  }
};
export default Object.freeze(spec);
