const spec = {
  "ownerId": "classical-strengthened-admonition-formation",
  "prefix": "ClassicalStrengthenedAdmonitionFormation",
  "operationId": "classical.strengthened.admonition.formation.execute",
  "inputContract": "complete-typed-classical-strengthened-admonition-formation-source",
  "domain": "classical-strengthened-admonition-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-strengthened-admonition-formation",
  "selections": [
    "claim-p1119"
  ],
  "coordinates": {
    "claim-p1119::p1119-remark-all-of-the-admonition-sentences-above-could-have": {
      "assertionId": "classical-strengthened-admonition-formation:p1119-remark-all-of-the-admonition-sentences-above-could-have",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdmonitiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdmonitiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p1119": [
      "strengthened-warning"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1119": "authorized"
  }
};
export default Object.freeze(spec);
