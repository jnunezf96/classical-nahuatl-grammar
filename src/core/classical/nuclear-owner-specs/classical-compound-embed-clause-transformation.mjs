const spec = {
  "ownerId": "classical-compound-embed-clause-transformation",
  "prefix": "ClassicalCompoundEmbedClauseTransformation",
  "operationId": "classical.compound.embed.clause.transformation.execute",
  "inputContract": "complete-typed-classical-compound-embed-clause-transformation-source",
  "domain": "classical-compound-embed-clause-transformation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2736",
    "claim-p2737",
    "claim-p2738",
    "claim-p2739",
    "claim-p2740"
  ],
  "coordinates": {
    "claim-p2736::p2736-as-can-be-seen-in-the-compound-formulas-in": {
      "assertionId": "classical-compound-embed-clause-transformation:p2736-as-can-be-seen-in-the-compound-formulas-in",
      "canonicalPath": "contract.embedSubjectDeleted"
    },
    "claim-p2737::p2737-when-a-nuclear-clause-is-incorporated-into-a-compound": {
      "assertionId": "classical-compound-embed-clause-transformation:p2737-when-a-nuclear-clause-is-incorporated-into-a-compound",
      "canonicalPath": "cases.basic.facts.sourcePredicatePreserved"
    },
    "claim-p2738::p2738-the-deleted-subject-pronoun-whose-presence-continues-to-be": {
      "assertionId": "classical-compound-embed-clause-transformation:p2738-the-deleted-subject-pronoun-whose-presence-continues-to-be",
      "canonicalPath": "contract.embedDeterminesCompoundValence"
    },
    "claim-p2739::p2739-depending-on-the-type-of-compound-the-incorporated-clause": {
      "assertionId": "classical-compound-embed-clause-transformation:p2739-depending-on-the-type-of-compound-the-incorporated-clause",
      "canonicalPath": "contract.embedSubjectDeleted"
    },
    "claim-p2740::p2740-when-a-vnc-is-incorporated-into-a-vnc-the": {
      "assertionId": "classical-compound-embed-clause-transformation:p2740-when-a-vnc-is-incorporated-into-a-vnc-the",
      "canonicalPath": "cases.basic.facts.sourcePredicatePreserved"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2736": [],
    "claim-p2737": [],
    "claim-p2738": [],
    "claim-p2739": [],
    "claim-p2740": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2736": "authorized",
    "claim-p2737": "authorized",
    "claim-p2738": "authorized",
    "claim-p2739": "authorized",
    "claim-p2740": "authorized"
  }
};
export default Object.freeze(spec);
