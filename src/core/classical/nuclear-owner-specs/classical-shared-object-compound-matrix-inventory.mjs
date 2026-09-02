const spec = {
  "ownerId": "classical-shared-object-compound-matrix-inventory",
  "prefix": "ClassicalSharedObjectCompoundMatrixInventory",
  "operationId": "classical.shared.object.compound.matrix.inventory.execute",
  "inputContract": "complete-typed-classical-shared-object-compound-matrix-inventory-source",
  "domain": "classical-shared-object-compound-matrix-inventory",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2863",
    "claim-p2864",
    "claim-p2865",
    "claim-p2866",
    "claim-p2867",
    "claim-p2868"
  ],
  "coordinates": {
    "claim-p2863::p2863-m-o-te-tla-tla-l-i-a-to": {
      "assertionId": "classical-shared-object-compound-matrix-inventory:p2863-m-o-te-tla-tla-l-i-a-to",
      "canonicalPath": "cases.sharedObjectMatrices.tlāl-i-ā.facts.matrixReadingOptions"
    },
    "claim-p2864::p2864-m-o-te-tla-quetza-to-place-oneself-s": {
      "assertionId": "classical-shared-object-compound-matrix-inventory:p2864-m-o-te-tla-quetza-to-place-oneself-s",
      "canonicalPath": "cases.sharedObjectMatrices.quetza.facts.matrixReadingOptions"
    },
    "claim-p2865::p2865-m-o-te-tla-te-ca-to-stretch-oneself": {
      "assertionId": "classical-shared-object-compound-matrix-inventory:p2865-m-o-te-tla-te-ca-to-stretch-oneself",
      "canonicalPath": "cases.sharedObjectMatrices.tēca.facts.matrixReadingOptions"
    },
    "claim-p2866::p2866-m-o-te-tla-ca-hua-to-leave-oneself": {
      "assertionId": "classical-shared-object-compound-matrix-inventory:p2866-m-o-te-tla-ca-hua-to-leave-oneself",
      "canonicalPath": "constraints.cahuaSharedObjectMatrix.authorizationStatus"
    },
    "claim-p2867::p2867-m-o-te-tla-quix-tia-to-cause-oneself": {
      "assertionId": "classical-shared-object-compound-matrix-inventory:p2867-m-o-te-tla-quix-tia-to-cause-oneself",
      "canonicalPath": "cases.sharedObjectMatrices.quix-tiā.facts.matrixReadingOptions"
    },
    "claim-p2868::p2868-m-o-te-tla-ma-y-a-hui-to": {
      "assertionId": "classical-shared-object-compound-matrix-inventory:p2868-m-o-te-tla-ma-y-a-hui-to",
      "canonicalPath": "cases.sharedObjectMatrices.māy-a-hui.facts.matrixReadingOptions"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2863": [],
    "claim-p2864": [],
    "claim-p2865": [],
    "claim-p2866": [],
    "claim-p2867": [],
    "claim-p2868": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2863": "authorized",
    "claim-p2864": "authorized",
    "claim-p2865": "authorized",
    "claim-p2866": "authorized",
    "claim-p2867": "authorized",
    "claim-p2868": "authorized"
  }
};
export default Object.freeze(spec);
