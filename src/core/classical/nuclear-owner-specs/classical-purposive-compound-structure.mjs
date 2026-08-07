const spec = {
  "ownerId": "classical-purposive-compound-structure",
  "prefix": "ClassicalPurposiveCompoundStructure",
  "operationId": "classical.purposive.compound.structure.execute",
  "inputContract": "complete-typed-classical-purposive-compound-structure-source",
  "domain": "classical-purposive-compound-structure",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-purposive-runtime",
  "selections": [
    "claim-p2890",
    "claim-p2891",
    "claim-p2892",
    "claim-p2893"
  ],
  "coordinates": {
    "claim-p2890::p2890-compound-verbstems-that-signify-movement-toward-the-speaker-or": {
      "assertionId": "classical-purposive-compound-structure:p2890-compound-verbstems-that-signify-movement-toward-the-speaker-or",
      "canonicalPath": "contract.compoundType"
    },
    "claim-p2891::p2891-instead-of-having-an-integrated-structure-these-stems-have": {
      "assertionId": "classical-purposive-compound-structure:p2891-instead-of-having-an-integrated-structure-these-stems-have",
      "canonicalPath": "contract.linkage"
    },
    "claim-p2892::p2892-the-structure-is-however-of-the-connectiveless-type-see": {
      "assertionId": "classical-purposive-compound-structure:p2892-the-structure-is-however-of-the-connectiveless-type-see",
      "canonicalPath": "contract.operationOrder.2"
    },
    "claim-p2893::p2893-the-following-points-outline-the-peculiarities-of-the-formation": {
      "assertionId": "classical-purposive-compound-structure:p2893-the-following-points-outline-the-peculiarities-of-the-formation",
      "canonicalPath": "contract.compoundType"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPurposiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPurposiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p2890": [],
    "claim-p2891": [],
    "claim-p2892": [],
    "claim-p2893": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2890": "authorized",
    "claim-p2891": "authorized",
    "claim-p2892": "authorized",
    "claim-p2893": "authorized"
  }
};
export default Object.freeze(spec);
