const spec = {
  "ownerId": "classical-object-combination-inventory",
  "prefix": "ClassicalObjectCombinationInventory",
  "operationId": "classical.object.combination.inventory.execute",
  "inputContract": "complete-typed-classical-object-combination-inventory-source",
  "domain": "classical-object-combination-inventory",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2247",
    "claim-p2248",
    "claim-p2249"
  ],
  "coordinates": {
    "claim-p2247::p2247-i-ii-iii-iv-v-specific-direction-mainline-nonspecific": {
      "assertionId": "classical-object-combination-inventory:p2247-i-ii-iii-iv-v-specific-direction-mainline-nonspecific",
      "canonicalPath": "objectHistory.combinationCount"
    },
    "claim-p2248::p2248-the-ne-at-times-occurs-in-column-iii-and": {
      "assertionId": "classical-object-combination-inventory:p2248-the-ne-at-times-occurs-in-column-iii-and",
      "canonicalPath": "objectHistory.everyCombinationAuthorized"
    },
    "claim-p2249::p2249-it-is-also-possible-to-shunt-a-reflexive-object": {
      "assertionId": "classical-object-combination-inventory:p2249-it-is-also-possible-to-shunt-a-reflexive-object",
      "canonicalPath": "objectHistory.combinations.12.positionCount"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2247": [],
    "claim-p2248": [],
    "claim-p2249": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2247": "authorized",
    "claim-p2248": "authorized",
    "claim-p2249": "authorized"
  }
};
export default Object.freeze(spec);
