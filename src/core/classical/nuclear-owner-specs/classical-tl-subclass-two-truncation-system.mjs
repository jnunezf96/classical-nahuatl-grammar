const spec = {
  "ownerId": "classical-tl-subclass-two-truncation-system",
  "prefix": "ClassicalTlSubclassTwoTruncationSystem",
  "operationId": "classical.tl.subclass.two.truncation.system.execute",
  "inputContract": "complete-typed-classical-tl-subclass-two-truncation-system-source",
  "domain": "classical-tl-subclass-two-truncation-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nounstem-selection-runtime",
  "selections": [
    "claim-p1553",
    "claim-p1554",
    "claim-p1555"
  ],
  "coordinates": {
    "claim-p1553::p1553-subclass-2-of-tl-nounstems-has-three-subclasses": {
      "assertionId": "classical-tl-subclass-two-truncation-system:p1553-subclass-2-of-tl-nounstems-has-three-subclasses",
      "canonicalPath": "contractLeastCommonMultiple.classSubclassInventory.length"
    },
    "claim-p1554::p1554-all-of-them-use-a-truncated-general-use-stem": {
      "assertionId": "classical-tl-subclass-two-truncation-system:p1554-all-of-them-use-a-truncated-general-use-stem",
      "canonicalPath": "contractLeastCommonMultiple.classSubclassInventory.2.generalUseShape"
    },
    "claim-p1555::p1555-the-morphic-filler-for-the-subject-s-num1-subposition": {
      "assertionId": "classical-tl-subclass-two-truncation-system:p1555-the-morphic-filler-for-the-subject-s-num1-subposition",
      "canonicalPath": "connectorSelectionFrame.singularConnector"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNounstemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNounstemValidationFrame",
  "executionArgsBySelection": {
    "claim-p1553": [
      "absolutive-common-tli"
    ],
    "claim-p1554": [
      "absolutive-common-tli"
    ],
    "claim-p1555": [
      "use-stem-possessive-truncated"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1553": "authorized",
    "claim-p1554": "authorized",
    "claim-p1555": "authorized"
  }
};
export default Object.freeze(spec);
