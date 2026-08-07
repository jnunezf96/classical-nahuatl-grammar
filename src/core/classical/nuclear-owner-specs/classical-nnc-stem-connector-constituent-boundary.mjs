const spec = {
  "ownerId": "classical-nnc-stem-connector-constituent-boundary",
  "prefix": "ClassicalNncStemConnectorConstituentBoundary",
  "operationId": "classical.nnc.stem.connector.constituent.boundary.execute",
  "inputContract": "complete-typed-classical-nnc-stem-connector-constituent-boundary-source",
  "domain": "classical-nnc-stem-connector-constituent-boundary",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nounstem-selection-runtime",
  "selections": [
    "claim-p1571",
    "claim-p1572",
    "claim-p1573",
    "claim-p1574"
  ],
  "coordinates": {
    "claim-p1571::p1571-note-it-is-important-at-this-point-to-reiterate": {
      "assertionId": "classical-nnc-stem-connector-constituent-boundary:p1571-note-it-is-important-at-this-point-to-reiterate",
      "canonicalPath": "contractGreatestCommonDivisor.connectorBelongsTo"
    },
    "claim-p1572::p1572-although-except-for-the-morphic-dyads-filling-the-personal": {
      "assertionId": "classical-nnc-stem-connector-constituent-boundary:p1572-although-except-for-the-morphic-dyads-filling-the-personal",
      "canonicalPath": "connectorSelectionFrame.connectorIsNounSuffix"
    },
    "claim-p1573::p1573-the-state-position-is-in-front-of-the-nounstem": {
      "assertionId": "classical-nnc-stem-connector-constituent-boundary:p1573-the-state-position-is-in-front-of-the-nounstem",
      "canonicalPath": "slotFrame.slotOrder.3"
    },
    "claim-p1574::p1574-are-they-a-stem-final-consonant-or-a-num1": {
      "assertionId": "classical-nnc-stem-connector-constituent-boundary:p1574-are-they-a-stem-final-consonant-or-a-num1",
      "canonicalPath": "ambiguityFrame.alternativeCount"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNounstemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNounstemValidationFrame",
  "executionArgsBySelection": {
    "claim-p1571": [
      "absolutive-common-tli"
    ],
    "claim-p1572": [
      "absolutive-common-tli"
    ],
    "claim-p1573": [
      "possessive-common-tl1a"
    ],
    "claim-p1574": [
      "constituent-back-uh"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1571": "authorized",
    "claim-p1572": "authorized",
    "claim-p1573": "authorized",
    "claim-p1574": "authorized"
  }
};
export default Object.freeze(spec);
