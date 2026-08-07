const spec = {
  "ownerId": "classical-affinity-plural-nounstem-connector-selection",
  "prefix": "ClassicalAffinityPluralNounstemConnectorSelection",
  "operationId": "classical.affinity.plural.nounstem.connector.selection.execute",
  "inputContract": "complete-typed-classical-affinity-plural-nounstem-connector-selection-source",
  "domain": "classical-affinity-plural-nounstem-connector-selection",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nounstem-selection-runtime",
  "selections": [
    "claim-p1510",
    "claim-p1511",
    "claim-p1512",
    "claim-p1513",
    "claim-p1514",
    "claim-p1515",
    "claim-p1516"
  ],
  "coordinates": {
    "claim-p1510::p1510-result-the-use-of-the-affinity-nounstem-is-obligatory": {
      "assertionId": "classical-affinity-plural-nounstem-connector-selection:p1510-result-the-use-of-the-affinity-nounstem-is-obligatory",
      "canonicalPath": "lexicalSelectionRecord.pluralStemFormationRequirement"
    },
    "claim-p1511::p1511-the-use-of-the-affinity-nounstem-is-obligatory-when": {
      "assertionId": "classical-affinity-plural-nounstem-connector-selection:p1511-the-use-of-the-affinity-nounstem-is-obligatory-when",
      "canonicalPath": "lexicalSelectionRecord.stemFormation"
    },
    "claim-p1512::p1512-the-justification-for-this-is-not-always-clear-from": {
      "assertionId": "classical-affinity-plural-nounstem-connector-selection:p1512-the-justification-for-this-is-not-always-clear-from",
      "canonicalPath": "storedExampleAuthority"
    },
    "claim-p1513::p1513-if-the-source-stem-belongs-to-the-tl-class": {
      "assertionId": "classical-affinity-plural-nounstem-connector-selection:p1513-if-the-source-stem-belongs-to-the-tl-class",
      "canonicalPath": "connectorSelectionFrame.pluralConnector"
    },
    "claim-p1514::p1514-result-the-affinity-stem-uses-or-infrequently-m": {
      "assertionId": "classical-affinity-plural-nounstem-connector-selection:p1514-result-the-affinity-stem-uses-or-infrequently-m",
      "canonicalPath": "connectorSelectionFrame.selectionRule"
    },
    "claim-p1515::p1515-result-the-affinity-stem-uses-t": {
      "assertionId": "classical-affinity-plural-nounstem-connector-selection:p1515-result-the-affinity-stem-uses-t",
      "canonicalPath": "connectorSelectionFrame.pluralConnector"
    },
    "claim-p1516::p1516-if-the-source-stem-belongs-to-the-tli-or": {
      "assertionId": "classical-affinity-plural-nounstem-connector-selection:p1516-if-the-source-stem-belongs-to-the-tli-or",
      "canonicalPath": "connectorSelectionFrame.nounClass"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNounstemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNounstemValidationFrame",
  "executionArgsBySelection": {
    "claim-p1510": [
      "absolutive-plural-affinity-tli-default"
    ],
    "claim-p1511": [
      "absolutive-plural-affinity-tli-default"
    ],
    "claim-p1512": [
      "absolutive-plural-affinity-tli-default"
    ],
    "claim-p1513": [
      "absolutive-plural-affinity-tl-zero"
    ],
    "claim-p1514": [
      "absolutive-plural-affinity-tl-zero"
    ],
    "claim-p1515": [
      "absolutive-plural-affinity-tli-default"
    ],
    "claim-p1516": [
      "absolutive-plural-affinity-tli-default"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1510": "authorized",
    "claim-p1511": "authorized",
    "claim-p1512": "authorized",
    "claim-p1513": "authorized",
    "claim-p1514": "authorized",
    "claim-p1515": "authorized",
    "claim-p1516": "authorized"
  }
};
export default Object.freeze(spec);
