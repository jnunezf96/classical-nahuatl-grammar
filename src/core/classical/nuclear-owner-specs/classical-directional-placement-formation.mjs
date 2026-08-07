const spec = {
  "ownerId": "classical-directional-placement-formation",
  "prefix": "ClassicalDirectionalPlacementFormation",
  "operationId": "classical.directional.placement.form",
  "inputContract": "complete-typed-classical-directional-placement-formation-source",
  "domain": "classical-directional-placement-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-directional-placement-formation",
  "selections": [
    "claim-p973",
    "claim-p976",
    "claim-p977"
  ],
  "coordinates": {
    "claim-p973::p973-in-a-transitive-vnc-the-prefix-is-placed-in": {
      "assertionId": "classical-directional-placement-formation:p973-in-a-transitive-vnc-the-prefix-is-placed-in",
      "canonicalPath": "placement"
    },
    "claim-p976::p976-if-the-transitive-vnc-has-a-dyadic-valence-position": {
      "assertionId": "classical-directional-placement-formation:p976-if-the-transitive-vnc-has-a-dyadic-valence-position",
      "canonicalPath": "placement"
    },
    "claim-p977::p977-result-the-direction-prefix-is-placed-after-the-valence": {
      "assertionId": "classical-directional-placement-formation:p977-result-the-direction-prefix-is-placed-after-the-valence",
      "canonicalPath": "finalFormula"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDirectionalPlacementSystemFrame",
  "executionValidatorName": "isClassicalNahuatlDirectionalPlacementSystemFrame",
  "executionArgsBySelection": {
    "claim-p973": [],
    "claim-p976": [],
    "claim-p977": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p973": "authorized",
    "claim-p976": "authorized",
    "claim-p977": "authorized"
  }
};
export default Object.freeze(spec);
