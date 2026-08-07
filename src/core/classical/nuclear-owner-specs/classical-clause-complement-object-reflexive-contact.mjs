const spec = {
  "ownerId": "classical-clause-complement-object-reflexive-contact",
  "prefix": "ClassicalClauseComplementObjectReflexiveContact",
  "operationId": "classical.clause.complement.object.reflexive.contact.execute",
  "inputContract": "complete-typed-classical-clause-complement-object-reflexive-contact-source",
  "domain": "classical-clause-complement-object-reflexive-contact",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-clause-complementation-runtime",
  "selections": [
    "claim-p4793"
  ],
  "coordinates": {
    "claim-p4793::p4793-the-object-pronoun-being-complemented-can-be-reflexive": {
      "assertionId": "classical-clause-complement-object-reflexive-contact:p4793-the-object-pronoun-being-complemented-can-be-reflexive",
      "canonicalPath": "analysis.semanticBoundary"
    }
  },
  "executionFunctionName": "buildClassicalClauseComplementValidationFrame",
  "executionValidatorName": "isClassicalClauseComplementValidationFrame",
  "executionArgsBySelection": {
    "claim-p4793": [
      "object-reflexive-contact"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4793": "authorized"
  }
};
export default Object.freeze(spec);
