const spec = {
  "ownerId": "classical-adjectival-modifier-clause-type-lattice",
  "prefix": "ClassicalAdjectivalModifierClauseTypeLattice",
  "operationId": "classical.adjectival.modifier.clause.type.lattice.execute",
  "inputContract": "complete-typed-classical-adjectival-modifier-clause-type-lattice-source",
  "domain": "classical-adjectival-modifier-clause-type-lattice",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4044",
    "claim-p4045",
    "claim-p4046"
  ],
  "coordinates": {
    "claim-p4044::p4044-this-is-not-the-only-structure-possible-however-as": {
      "assertionId": "classical-adjectival-modifier-clause-type-lattice:p4044-this-is-not-the-only-structure-possible-however-as",
      "canonicalPath": "cases.ordinary.canonicalResult"
    },
    "claim-p4045::p4045-there-is-in-fact-a-wide-variety-of-nuclear": {
      "assertionId": "classical-adjectival-modifier-clause-type-lattice:p4045-there-is-in-fact-a-wide-variety-of-nuclear",
      "canonicalPath": "cases.ordinary.operationKind"
    },
    "claim-p4046::p4046-for-the-sake-of-economy-only-the-marked-prepo": {
      "assertionId": "classical-adjectival-modifier-clause-type-lattice:p4046-for-the-sake-of-economy-only-the-marked-prepo",
      "canonicalPath": "cases.ordinary.headRank"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4044": [],
    "claim-p4045": [],
    "claim-p4046": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4044": "authorized",
    "claim-p4045": "authorized",
    "claim-p4046": "authorized"
  }
};
export default Object.freeze(spec);
