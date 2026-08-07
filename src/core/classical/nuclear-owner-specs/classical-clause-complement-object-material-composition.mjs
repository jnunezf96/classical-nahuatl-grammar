const spec = {
  "ownerId": "classical-clause-complement-object-material-composition",
  "prefix": "ClassicalClauseComplementObjectMaterialComposition",
  "operationId": "classical.clause.complement.object.material.composition.execute",
  "inputContract": "complete-typed-classical-clause-complement-object-material-composition-source",
  "domain": "classical-clause-complement-object-material-composition",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4796",
    "claim-p4797"
  ],
  "coordinates": {
    "claim-p4796::p4796-the-object-complement-nnc-is-built-on-a-nounstem": {
      "assertionId": "classical-clause-complement-object-material-composition:p4796-the-object-complement-nnc-is-built-on-a-nounstem",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p4797::p4797-this-object-complement-construction-serves-as-the-source-for": {
      "assertionId": "classical-clause-complement-object-material-composition:p4797-this-object-complement-construction-serves-as-the-source-for",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4796": [
      "object-material-composition"
    ],
    "claim-p4797": [
      "object-material-composition"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4796": "authorized",
    "claim-p4797": "authorized"
  }
};
export default Object.freeze(spec);
