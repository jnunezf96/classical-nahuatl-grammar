const spec = {
  "ownerId": "classical-purposive-movement-base-allomorphy",
  "prefix": "ClassicalPurposiveMovementBaseAllomorphy",
  "operationId": "classical.purposive.movement.base.allomorphy.execute",
  "inputContract": "complete-typed-classical-purposive-movement-base-allomorphy-source",
  "domain": "classical-purposive-movement-base-allomorphy",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-purposive-runtime",
  "selections": [
    "claim-p2903",
    "claim-p2904",
    "claim-p2905",
    "claim-p2906",
    "claim-p2907"
  ],
  "coordinates": {
    "claim-p2903::p2903-the-base-stem-to-which-the-directional-prefix-is": {
      "assertionId": "classical-purposive-movement-base-allomorphy:p2903-the-base-stem-to-which-the-directional-prefix-is",
      "canonicalPath": "contract.matrixBaseStems.imperfective"
    },
    "claim-p2904::p2904-the-meaning-of-the-base-stem-is-to-move": {
      "assertionId": "classical-purposive-movement-base-allomorphy:p2904-the-meaning-of-the-base-stem-is-to-move",
      "canonicalPath": "contract.movementBaseMeaning"
    },
    "claim-p2905::p2905-the-uh-and-hui-are-the-same-stems-that": {
      "assertionId": "classical-purposive-movement-base-allomorphy:p2905-the-uh-and-hui-are-the-same-stems-that",
      "canonicalPath": "cases.singularSeries.outbound-nonpast-indicative.facts.imperfectiveNumberPartner"
    },
    "claim-p2906::p2906-the-imperfective-base-stem-is-i-which-has-a": {
      "assertionId": "classical-purposive-movement-base-allomorphy:p2906-the-imperfective-base-stem-is-i-which-has-a",
      "canonicalPath": "cases.singularSeries.outbound-nonpast-indicative.facts.matrixBaseStem"
    },
    "claim-p2907::p2907-the-perfective-base-stem-is-o": {
      "assertionId": "classical-purposive-movement-base-allomorphy:p2907-the-perfective-base-stem-is-o",
      "canonicalPath": "cases.singularSeries.outbound-past-indicative.facts.matrixBaseStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlPurposiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlPurposiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p2903": [],
    "claim-p2904": [],
    "claim-p2905": [],
    "claim-p2906": [],
    "claim-p2907": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2903": "authorized",
    "claim-p2904": "authorized",
    "claim-p2905": "authorized",
    "claim-p2906": "authorized",
    "claim-p2907": "authorized"
  }
};
export default Object.freeze(spec);
