const spec = {
  "ownerId": "classical-plain-plural-nounstem-connector-selection",
  "prefix": "ClassicalPlainPluralNounstemConnectorSelection",
  "operationId": "classical.plain.plural.nounstem.connector.selection.execute",
  "inputContract": "complete-typed-classical-plain-plural-nounstem-connector-selection-source",
  "domain": "classical-plain-plural-nounstem-connector-selection",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nounstem-selection-runtime",
  "selections": [
    "claim-p1504",
    "claim-p1505",
    "claim-p1506",
    "claim-p1508",
    "claim-p1509"
  ],
  "coordinates": {
    "claim-p1504::p1504-the-choice-of-the-morphic-filler-for-the-subject": {
      "assertionId": "classical-plain-plural-nounstem-connector-selection:p1504-the-choice-of-the-morphic-filler-for-the-subject",
      "canonicalPath": "connectorSelectionFrame.selectionRule"
    },
    "claim-p1505::p1505-the-choice-of-one-or-the-other-for-a": {
      "assertionId": "classical-plain-plural-nounstem-connector-selection:p1505-the-choice-of-one-or-the-other-for-a",
      "canonicalPath": "lexicalSelectionRecord.pluralConnectorOptions"
    },
    "claim-p1506::p1506-with-a-tl-class-stem-the-num1-filler-is": {
      "assertionId": "classical-plain-plural-nounstem-connector-selection:p1506-with-a-tl-class-stem-the-num1-filler-is",
      "canonicalPath": "connectorSelectionFrame.pluralConnector"
    },
    "claim-p1508::p1508-with-a-stem-belonging-to-a-tli-in-or": {
      "assertionId": "classical-plain-plural-nounstem-connector-selection:p1508-with-a-stem-belonging-to-a-tli-in-or",
      "canonicalPath": "lexicalSelectionRecord.pluralConnectorOptions"
    },
    "claim-p1509::p1509-again-the-choice-for-a-given-stem-must-be": {
      "assertionId": "classical-plain-plural-nounstem-connector-selection:p1509-again-the-choice-for-a-given-stem-must-be",
      "canonicalPath": "lexicalSelectionRecord.selectionAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNounstemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNounstemValidationFrame",
  "executionArgsBySelection": {
    "claim-p1504": [
      "absolutive-plural-plain"
    ],
    "claim-p1505": [
      "absolutive-plural-tl-zero"
    ],
    "claim-p1506": [
      "absolutive-plural-tl-m"
    ],
    "claim-p1508": [
      "lexical-alternatives"
    ],
    "claim-p1509": [
      "absolutive-plural-plain"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1504": "authorized",
    "claim-p1505": "authorized",
    "claim-p1506": "authorized",
    "claim-p1508": "authorized",
    "claim-p1509": "authorized"
  }
};
export default Object.freeze(spec);
