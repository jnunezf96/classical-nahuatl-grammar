const spec = {
  "ownerId": "classical-tl-subclass-two-c-repair",
  "prefix": "ClassicalTlSubclassTwoCRepair",
  "operationId": "classical.tl.subclass.two.c.repair.execute",
  "inputContract": "complete-typed-classical-tl-subclass-two-c-repair-source",
  "domain": "classical-tl-subclass-two-c-repair",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nounstem-selection-runtime",
  "selections": [
    "claim-p1567",
    "claim-p1568",
    "claim-p1569",
    "claim-p1570"
  ],
  "coordinates": {
    "claim-p1567::p1567-subclass-2-c-has-a-limited-use-stem-that": {
      "assertionId": "classical-tl-subclass-two-c-repair:p1567-subclass-2-c-has-a-limited-use-stem-that",
      "canonicalPath": "sourceFrame.subclassSourceShapeFrame.conditionId"
    },
    "claim-p1568::p1568-the-deletion-of-the-ephemeral-a-leaves-an-illegal": {
      "assertionId": "classical-tl-subclass-two-c-repair:p1568-the-deletion-of-the-ephemeral-a-leaves-an-illegal",
      "canonicalPath": "sourceFrame.useShapeAction"
    },
    "claim-p1569::p1569-the-consonant-immediately-before-this-supportive-i-is-either": {
      "assertionId": "classical-tl-subclass-two-c-repair:p1569-the-consonant-immediately-before-this-supportive-i-is-either",
      "canonicalPath": "sourceFrame.truncationRepairFrame.realizedStem"
    },
    "claim-p1570::p1570-the-stems-are-few-in-number-and-all-of": {
      "assertionId": "classical-tl-subclass-two-c-repair:p1570-the-stems-are-few-in-number-and-all-of",
      "canonicalPath": "sourceFrame.subclassSourceShapeFrame.compoundSource"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNounstemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNounstemValidationFrame",
  "executionArgsBySelection": {
    "claim-p1567": [
      "possessive-common-tl2c"
    ],
    "claim-p1568": [
      "possessive-common-tl2c"
    ],
    "claim-p1569": [
      "possessive-common-tl2c"
    ],
    "claim-p1570": [
      "possessive-common-tl2c"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1567": "authorized",
    "claim-p1568": "authorized",
    "claim-p1569": "authorized",
    "claim-p1570": "authorized"
  }
};
export default Object.freeze(spec);
