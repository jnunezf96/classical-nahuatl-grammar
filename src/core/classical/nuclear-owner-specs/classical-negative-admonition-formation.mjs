const spec = {
  "ownerId": "classical-negative-admonition-formation",
  "prefix": "ClassicalNegativeAdmonitionFormation",
  "operationId": "classical.negative.admonition.formation.execute",
  "inputContract": "complete-typed-classical-negative-admonition-formation-source",
  "domain": "classical-negative-admonition-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-negative-admonition-formation",
  "selections": [
    "claim-p1125",
    "claim-p1126",
    "claim-p1127",
    "claim-p1128",
    "claim-p1129",
    "claim-p1130"
  ],
  "coordinates": {
    "claim-p1125::p1125-a-sentence-expressing-a-negative-admonition-traditionally-called-by": {
      "assertionId": "classical-negative-admonition-formation:p1125-a-sentence-expressing-a-negative-admonition-traditionally-called-by",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1126::p1126-the-negative-prefix-ah-is-affixed-to-the-admonitive": {
      "assertionId": "classical-negative-admonition-formation:p1126-the-negative-prefix-ah-is-affixed-to-the-admonitive",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1127::p1127-it-is-a-recommendation-to-reject-caution": {
      "assertionId": "classical-negative-admonition-formation:p1127-it-is-a-recommendation-to-reject-caution",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1128::p1128-the-negative-admonition-sentence-expresses-a-cancellation-of-a": {
      "assertionId": "classical-negative-admonition-formation:p1128-the-negative-admonition-sentence-expresses-a-cancellation-of-a",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1129::p1129-is-a-variant-of-t": {
      "assertionId": "classical-negative-admonition-formation:p1129-is-a-variant-of-t",
      "canonicalPath": "authorizationStatus"
    },
    "claim-p1130::p1130-the-is-a-morph-of-the-morpheme-ti": {
      "assertionId": "classical-negative-admonition-formation:p1130-the-is-a-morph-of-the-morpheme-ti",
      "canonicalPath": "authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdmonitiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdmonitiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p1125": [
      "negative-admonition"
    ],
    "claim-p1126": [
      "negative-admonition"
    ],
    "claim-p1127": [
      "negative-admonition"
    ],
    "claim-p1128": [
      "negative-admonition"
    ],
    "claim-p1129": [
      "negative-admonition"
    ],
    "claim-p1130": [
      "negative-admonition"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1125": "authorized",
    "claim-p1126": "authorized",
    "claim-p1127": "authorized",
    "claim-p1128": "authorized",
    "claim-p1129": "authorized",
    "claim-p1130": "authorized"
  }
};
export default Object.freeze(spec);
