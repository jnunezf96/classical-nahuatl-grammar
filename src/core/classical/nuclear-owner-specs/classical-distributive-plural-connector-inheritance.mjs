const spec = {
  "ownerId": "classical-distributive-plural-connector-inheritance",
  "prefix": "ClassicalDistributivePluralConnectorInheritance",
  "operationId": "classical.distributive.plural.connector.inheritance.execute",
  "inputContract": "complete-typed-classical-distributive-plural-connector-inheritance-source",
  "domain": "classical-distributive-plural-connector-inheritance",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nounstem-selection-runtime",
  "selections": [
    "claim-p1517",
    "claim-p1518"
  ],
  "coordinates": {
    "claim-p1517::p1517-result-the-formation-of-an-nnc-on-a-distributive": {
      "assertionId": "classical-distributive-plural-connector-inheritance:p1517-result-the-formation-of-an-nnc-on-a-distributive",
      "canonicalPath": "connectorSelectionFrame.selectionRule"
    },
    "claim-p1518::p1518-when-the-subject-pronoun-is-plural-the-formation-of": {
      "assertionId": "classical-distributive-plural-connector-inheritance:p1518-when-the-subject-pronoun-is-plural-the-formation-of",
      "canonicalPath": "lexicalSelectionRecord.sourcePlainPluralConnector"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNounstemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNounstemValidationFrame",
  "executionArgsBySelection": {
    "claim-p1517": [
      "absolutive-plural-distributive"
    ],
    "claim-p1518": [
      "absolutive-plural-distributive"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1517": "authorized",
    "claim-p1518": "authorized"
  }
};
export default Object.freeze(spec);
