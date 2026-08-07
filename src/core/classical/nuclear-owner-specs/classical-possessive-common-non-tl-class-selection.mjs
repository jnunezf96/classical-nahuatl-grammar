const spec = {
  "ownerId": "classical-possessive-common-non-tl-class-selection",
  "prefix": "ClassicalPossessiveCommonNonTlClassSelection",
  "operationId": "classical.possessive.common.non.tl.class.selection.execute",
  "inputContract": "complete-typed-classical-possessive-common-non-tl-class-selection-source",
  "domain": "classical-possessive-common-non-tl-class-selection",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nounstem-selection-runtime",
  "selections": [
    "claim-p1533",
    "claim-p1534",
    "claim-p1535",
    "claim-p1536",
    "claim-p1537",
    "claim-p1538",
    "claim-p1539",
    "claim-p1540",
    "claim-p1541"
  ],
  "coordinates": {
    "claim-p1533::p1533-the-nounstem-used-in-a-possessive-state-nnc-with": {
      "assertionId": "classical-possessive-common-non-tl-class-selection:p1533-the-nounstem-used-in-a-possessive-state-nnc-with",
      "canonicalPath": "contractLeastCommonMultiple.useStemKindInventory.1.allowedShapeIdentities"
    },
    "claim-p1534::p1534-the-base-shape-is-used-for-stems-of-the": {
      "assertionId": "classical-possessive-common-non-tl-class-selection:p1534-the-base-shape-is-used-for-stems-of-the",
      "canonicalPath": "connectorSelectionFrame.selectionRule"
    },
    "claim-p1535::p1535-the-morphic-filler-for-the-subject-s-num1-subposition": {
      "assertionId": "classical-possessive-common-non-tl-class-selection:p1535-the-morphic-filler-for-the-subject-s-num1-subposition",
      "canonicalPath": "connectorSelectionFrame.singularConnector"
    },
    "claim-p1536::p1536-the-difference-creates-two-subclasses": {
      "assertionId": "classical-possessive-common-non-tl-class-selection:p1536-the-difference-creates-two-subclasses",
      "canonicalPath": "contractLeastCommonMultiple.classSubclassInventory.5.identity"
    },
    "claim-p1537::p1537-subclass-1-of-the-tli-stems-uses-in-the": {
      "assertionId": "classical-possessive-common-non-tl-class-selection:p1537-subclass-1-of-the-tli-stems-uses-in-the",
      "canonicalPath": "connectorSelectionFrame.selectionRule"
    },
    "claim-p1538::p1538-subclass-2-of-tli-stems-uses-hui-in-the": {
      "assertionId": "classical-possessive-common-non-tl-class-selection:p1538-subclass-2-of-tli-stems-uses-hui-in-the",
      "canonicalPath": "connectorSelectionFrame.selectionRule"
    },
    "claim-p1539::p1539-huez-tli-sister-in-law-of-a-woman-the": {
      "assertionId": "classical-possessive-common-non-tl-class-selection:p1539-huez-tli-sister-in-law-of-a-woman-the",
      "canonicalPath": "formulaRealization"
    },
    "claim-p1540::p1540-in-this-subclass-there-is-also-a-very-limited": {
      "assertionId": "classical-possessive-common-non-tl-class-selection:p1540-in-this-subclass-there-is-also-a-very-limited",
      "canonicalPath": "lexicalSelectionRecord.tliSubclass2SilentNum1Authorized"
    },
    "claim-p1541::p1541-here-the-i-of-the-stem-is-a-real": {
      "assertionId": "classical-possessive-common-non-tl-class-selection:p1541-here-the-i-of-the-stem-is-a-real",
      "canonicalPath": "slotFrame.slots.state.slots.1.carrier"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNounstemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNounstemValidationFrame",
  "executionArgsBySelection": {
    "claim-p1533": [
      "possessive-common-in"
    ],
    "claim-p1534": [
      "possessive-common-in"
    ],
    "claim-p1535": [
      "possessive-common-zero"
    ],
    "claim-p1536": [
      "possessive-common-tli1"
    ],
    "claim-p1537": [
      "possessive-common-tli1"
    ],
    "claim-p1538": [
      "possessive-common-tli2"
    ],
    "claim-p1539": [
      "possessive-common-tli2"
    ],
    "claim-p1540": [
      "possessive-common-tli2-silent"
    ],
    "claim-p1541": [
      "possessive-common-tli2"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1533": "authorized",
    "claim-p1534": "authorized",
    "claim-p1535": "authorized",
    "claim-p1536": "authorized",
    "claim-p1537": "authorized",
    "claim-p1538": "authorized",
    "claim-p1539": "authorized",
    "claim-p1540": "authorized",
    "claim-p1541": "authorized"
  }
};
export default Object.freeze(spec);
