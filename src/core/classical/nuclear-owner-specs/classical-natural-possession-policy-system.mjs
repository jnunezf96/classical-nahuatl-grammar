const spec = {
  "ownerId": "classical-natural-possession-policy-system",
  "prefix": "ClassicalNaturalPossessionPolicySystem",
  "operationId": "classical.natural.possession.policy.system.execute",
  "inputContract": "complete-typed-classical-natural-possession-policy-system-source",
  "domain": "classical-natural-possession-policy-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1622",
    "claim-p1623",
    "claim-p1624",
    "claim-p1625"
  ],
  "coordinates": {
    "claim-p1622::p1622-some-nounstems-occur-usually-or-always-in-possessive-state": {
      "assertionId": "classical-natural-possession-policy-system:p1622-some-nounstems-occur-usually-or-always-in-possessive-state",
      "canonicalPath": "sourceAuthorityFrame.naturalPossessionPolicy"
    },
    "claim-p1623::p1623-the-entity-referred-to-by-such-a-stem-is": {
      "assertionId": "classical-natural-possession-policy-system:p1623-the-entity-referred-to-by-such-a-stem-is",
      "canonicalPath": "sourceAuthorityFrame.stateAvailability"
    },
    "claim-p1624::p1624-when-such-stems-are-listed-in-dictionaries-with-an": {
      "assertionId": "classical-natural-possession-policy-system:p1624-when-such-stems-are-listed-in-dictionaries-with-an",
      "canonicalPath": "sourceAuthorityFrame.allowedStateValues"
    },
    "claim-p1625::p1625-result-it-is-merely-done-for-the-purpose-of": {
      "assertionId": "classical-natural-possession-policy-system:p1625-result-it-is-merely-done-for-the-purpose-of",
      "canonicalPath": "sourceAuthorityFrame.statePolicyBelongsTo"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1622": [
      "l15-natural-relation"
    ],
    "claim-p1623": [
      "l15-natural-relation"
    ],
    "claim-p1624": [
      "l15-natural-relation"
    ],
    "claim-p1625": [
      "l15-natural-relation"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1622": "authorized",
    "claim-p1623": "authorized",
    "claim-p1624": "authorized",
    "claim-p1625": "authorized"
  }
};
export default Object.freeze(spec);
