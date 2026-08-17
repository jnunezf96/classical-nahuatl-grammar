const spec = {
  "ownerId": "classical-shared-object-compound-coreference",
  "prefix": "ClassicalSharedObjectCompoundCoreference",
  "operationId": "classical.shared.object.compound.coreference.execute",
  "inputContract": "complete-typed-classical-shared-object-compound-coreference-source",
  "domain": "classical-shared-object-compound-coreference",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2858",
    "claim-p2859",
    "claim-p2860",
    "claim-p2861",
    "claim-p2862"
  ],
  "coordinates": {
    "claim-p2858::p2858-the-final-type-of-connective-t-compound-stem-is": {
      "assertionId": "classical-shared-object-compound-coreference:p2858-the-final-type-of-connective-t-compound-stem-is",
      "canonicalPath": "contract.sharedObjectCoreferenceAuthority"
    },
    "claim-p2859::p2859-both-the-matrix-and-the-embed-come-from-transitive": {
      "assertionId": "classical-shared-object-compound-coreference:p2859-both-the-matrix-and-the-embed-come-from-transitive",
      "canonicalPath": "cases.sharedObject.facts.sharedObjectEmbedAndMatrixTransitive"
    },
    "claim-p2860::p2860-when-combined-into-a-compound-vnc-the-coreferential-object": {
      "assertionId": "classical-shared-object-compound-coreference:p2860-when-combined-into-a-compound-vnc-the-coreferential-object",
      "canonicalPath": "cases.sharedObject.facts.sharedObjectManifestationCount"
    },
    "claim-p2861::p2861-this-object-pronoun-may-be-reflexive-or-projective": {
      "assertionId": "classical-shared-object-compound-coreference:p2861-this-object-pronoun-may-be-reflexive-or-projective",
      "canonicalPath": "contract.sharedObjectKinds"
    },
    "claim-p2862::p2862-there-are-six-verbs-that-commonly-occur-as-the": {
      "assertionId": "classical-shared-object-compound-coreference:p2862-there-are-six-verbs-that-commonly-occur-as-the",
      "canonicalPath": "contract.sharedObjectMatrixInventory"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2858": [],
    "claim-p2859": [],
    "claim-p2860": [],
    "claim-p2861": [],
    "claim-p2862": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2858": "authorized",
    "claim-p2859": "authorized",
    "claim-p2860": "authorized",
    "claim-p2861": "authorized",
    "claim-p2862": "authorized"
  }
};
export default Object.freeze(spec);
