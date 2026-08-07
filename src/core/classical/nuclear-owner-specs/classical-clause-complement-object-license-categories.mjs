const spec = {
  "ownerId": "classical-clause-complement-object-license-categories",
  "prefix": "ClassicalClauseComplementObjectLicenseCategories",
  "operationId": "classical.clause.complement.object.license.categories.execute",
  "inputContract": "complete-typed-classical-clause-complement-object-license-categories-source",
  "domain": "classical-clause-complement-object-license-categories",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4791",
    "claim-p4792"
  ],
  "coordinates": {
    "claim-p4791::p4791-only-vncs-built-on-certain-verbstems-permit-their-object": {
      "assertionId": "classical-clause-complement-object-license-categories:p4791-only-vncs-built-on-certain-verbstems-permit-their-object",
      "canonicalPath": "analysis.semanticBoundary"
    },
    "claim-p4792::p4792-these-fall-into-several-meaning-categories": {
      "assertionId": "classical-clause-complement-object-license-categories:p4792-these-fall-into-several-meaning-categories",
      "canonicalPath": "result.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4791": [
      "object-license-categories"
    ],
    "claim-p4792": [
      "object-license-categories"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4791": "authorized",
    "claim-p4792": "authorized"
  }
};
export default Object.freeze(spec);
