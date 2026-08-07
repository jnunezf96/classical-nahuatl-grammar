const spec = {
  "ownerId": "classical-tl-subclass-one-connector-selection",
  "prefix": "ClassicalTlSubclassOneConnectorSelection",
  "operationId": "classical.tl.subclass.one.connector.selection.execute",
  "inputContract": "complete-typed-classical-tl-subclass-one-connector-selection-source",
  "domain": "classical-tl-subclass-one-connector-selection",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nounstem-selection-runtime",
  "selections": [
    "claim-p1542",
    "claim-p1543",
    "claim-p1544",
    "claim-p1545",
    "claim-p1546",
    "claim-p1547",
    "claim-p1548",
    "claim-p1549",
    "claim-p1550",
    "claim-p1551",
    "claim-p1552"
  ],
  "coordinates": {
    "claim-p1542::p1542-they-are-determined-by-the-shape-of-the-general": {
      "assertionId": "classical-tl-subclass-one-connector-selection:p1542-they-are-determined-by-the-shape-of-the-general",
      "canonicalPath": "sourceFrame.generalUseShape"
    },
    "claim-p1543::p1543-there-are-two-subclasses-of-tl-nounstems": {
      "assertionId": "classical-tl-subclass-one-connector-selection:p1543-there-are-two-subclasses-of-tl-nounstems",
      "canonicalPath": "contractLeastCommonMultiple.classSubclassInventory.0.nounClass"
    },
    "claim-p1544::p1544-in-subclass-1-a-base-stem-is-used-in": {
      "assertionId": "classical-tl-subclass-one-connector-selection:p1544-in-subclass-1-a-base-stem-is-used-in",
      "canonicalPath": "contractLeastCommonMultiple.classSubclassInventory.1.generalUseShape"
    },
    "claim-p1545::p1545-each-of-these-subclasses-has-further-subclasses": {
      "assertionId": "classical-tl-subclass-one-connector-selection:p1545-each-of-these-subclasses-has-further-subclasses",
      "canonicalPath": "contractLeastCommonMultiple.classSubclassInventory.length"
    },
    "claim-p1546::p1546-subclass-1-of-tl-nounstems-has-two-subclasses": {
      "assertionId": "classical-tl-subclass-one-connector-selection:p1546-subclass-1-of-tl-nounstems-has-two-subclasses",
      "canonicalPath": "contractLeastCommonMultiple.classSubclassInventory.0.identity"
    },
    "claim-p1547::p1547-the-selection-is-not-predictable-and-must-be-learned": {
      "assertionId": "classical-tl-subclass-one-connector-selection:p1547-the-selection-is-not-predictable-and-must-be-learned",
      "canonicalPath": "lexicalSelectionRecord.selectionAuthority"
    },
    "claim-p1548::p1548-subclass-1-a-uses-uh-as-the-morphic-filler": {
      "assertionId": "classical-tl-subclass-one-connector-selection:p1548-subclass-1-a-uses-uh-as-the-morphic-filler",
      "canonicalPath": "connectorSelectionFrame.singularConnector"
    },
    "claim-p1549::p1549-note-occasionally-a-tli-class-general-use-stem-ends": {
      "assertionId": "classical-tl-subclass-one-connector-selection:p1549-note-occasionally-a-tli-class-general-use-stem-ends",
      "canonicalPath": "ambiguityFrame.ambiguityPreserved"
    },
    "claim-p1550::p1550-the-uh-in-such-instances-should-not-be-confused": {
      "assertionId": "classical-tl-subclass-one-connector-selection:p1550-the-uh-in-such-instances-should-not-be-confused",
      "canonicalPath": "ambiguityFrame.spellingAloneSelectsAnalysis"
    },
    "claim-p1551::p1551-2-n-o-te-uh-it-is-my-rock": {
      "assertionId": "classical-tl-subclass-one-connector-selection:p1551-2-n-o-te-uh-it-is-my-rock",
      "canonicalPath": "ambiguityFrame.selectedAnalysis.slots.num1"
    },
    "claim-p1552::p1552-subclass-1-b-uses-as-the-morphic-filler-for": {
      "assertionId": "classical-tl-subclass-one-connector-selection:p1552-subclass-1-b-uses-as-the-morphic-filler-for",
      "canonicalPath": "connectorSelectionFrame.singularConnector"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNounstemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNounstemValidationFrame",
  "executionArgsBySelection": {
    "claim-p1542": [
      "possessive-common-tl1a"
    ],
    "claim-p1543": [
      "absolutive-common-tli"
    ],
    "claim-p1544": [
      "absolutive-common-tli"
    ],
    "claim-p1545": [
      "absolutive-common-tli"
    ],
    "claim-p1546": [
      "absolutive-common-tli"
    ],
    "claim-p1547": [
      "possessive-common-tl1a"
    ],
    "claim-p1548": [
      "possessive-common-tl1a"
    ],
    "claim-p1549": [
      "constituent-back-uh"
    ],
    "claim-p1550": [
      "constituent-back-uh"
    ],
    "claim-p1551": [
      "constituent-back-uh"
    ],
    "claim-p1552": [
      "possessive-common-tl1b"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1542": "authorized",
    "claim-p1543": "authorized",
    "claim-p1544": "authorized",
    "claim-p1545": "authorized",
    "claim-p1546": "authorized",
    "claim-p1547": "authorized",
    "claim-p1548": "authorized",
    "claim-p1549": "authorized",
    "claim-p1550": "authorized",
    "claim-p1551": "authorized",
    "claim-p1552": "authorized"
  }
};
export default Object.freeze(spec);
