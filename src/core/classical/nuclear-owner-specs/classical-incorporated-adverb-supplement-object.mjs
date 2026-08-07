const spec = {
  "ownerId": "classical-incorporated-adverb-supplement-object",
  "prefix": "ClassicalIncorporatedAdverbSupplementObject",
  "operationId": "classical.incorporated.adverb.supplement.object.execute",
  "inputContract": "complete-typed-classical-incorporated-adverb-supplement-object-source",
  "domain": "classical-incorporated-adverb-supplement-object",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p3030",
    "claim-p3031",
    "claim-p3032"
  ],
  "coordinates": {
    "claim-p3030::p3030-a-transitive-vnc-as-principal-clause-in-the-source": {
      "assertionId": "classical-incorporated-adverb-supplement-object:p3030-a-transitive-vnc-as-principal-clause-in-the-source",
      "canonicalPath": "cases.supplementObject.rules.incorporated-adverb/supplement-object"
    },
    "claim-p3031::p3031-the-possessor-pronoun-replaces-its-possessive-case-feature-with": {
      "assertionId": "classical-incorporated-adverb-supplement-object:p3031-the-possessor-pronoun-replaces-its-possessive-case-feature-with",
      "canonicalPath": "cases.supplementObject.authorizationStatus"
    },
    "claim-p3032::p3032-while-on-the-surface-the-object-pronoun-interacts-with": {
      "assertionId": "classical-incorporated-adverb-supplement-object:p3032-while-on-the-surface-the-object-pronoun-interacts-with",
      "canonicalPath": "cases.supplementObject.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p3030": [],
    "claim-p3031": [],
    "claim-p3032": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3030": "authorized",
    "claim-p3031": "authorized",
    "claim-p3032": "authorized"
  }
};
export default Object.freeze(spec);
