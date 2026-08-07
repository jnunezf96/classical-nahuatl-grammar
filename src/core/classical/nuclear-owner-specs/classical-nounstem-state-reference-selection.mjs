const spec = {
  "ownerId": "classical-nounstem-state-reference-selection",
  "prefix": "ClassicalNounstemStateReferenceSelection",
  "operationId": "classical.nounstem.state.reference.selection.execute",
  "inputContract": "complete-typed-classical-nounstem-state-reference-selection-source",
  "domain": "classical-nounstem-state-reference-selection",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nounstem-selection-runtime",
  "selections": [
    "claim-p1497",
    "claim-p1498",
    "claim-p1499",
    "claim-p1500",
    "claim-p1501",
    "claim-p1502",
    "claim-p1503"
  ],
  "coordinates": {
    "claim-p1497::p1497-when-the-subject-pronoun-refers-to-more-than-one": {
      "assertionId": "classical-nounstem-state-reference-selection:p1497-when-the-subject-pronoun-refers-to-more-than-one",
      "canonicalPath": "connectorSelectionFrame.subjectNumber"
    },
    "claim-p1498::p1498-when-the-subject-pronoun-refers-to-more-than-one": {
      "assertionId": "classical-nounstem-state-reference-selection:p1498-when-the-subject-pronoun-refers-to-more-than-one",
      "canonicalPath": "contractLeastCommonMultiple.stemRelationInventory.length"
    },
    "claim-p1499::p1499-only-the-base-shape-of-a-nounstem-is-used": {
      "assertionId": "classical-nounstem-state-reference-selection:p1499-only-the-base-shape-of-a-nounstem-is-used",
      "canonicalPath": "sourceFrame.selectedUseShape"
    },
    "claim-p1500::p1500-when-the-subject-pronoun-shows": {
      "assertionId": "classical-nounstem-state-reference-selection:p1500-when-the-subject-pronoun-shows",
      "canonicalPath": "contractLeastCommonMultiple.selectedCoordinate.stateSubjectEnvironmentIdentity"
    },
    "claim-p1501::p1501-if-the-common-number-subject-refers-to-a-nonlinguistic": {
      "assertionId": "classical-nounstem-state-reference-selection:p1501-if-the-common-number-subject-refers-to-a-nonlinguistic",
      "canonicalPath": "formulaRealization"
    },
    "claim-p1502::p1502-if-the-common-number-subject-refers-to-a-nonlinguistic": {
      "assertionId": "classical-nounstem-state-reference-selection:p1502-if-the-common-number-subject-refers-to-a-nonlinguistic",
      "canonicalPath": "contractLeastCommonMultiple.selectedCoordinate.stemRelation"
    },
    "claim-p1503::p1503-an-absolutive-state-nnc-with-a-plural-number-subject": {
      "assertionId": "classical-nounstem-state-reference-selection:p1503-an-absolutive-state-nnc-with-a-plural-number-subject",
      "canonicalPath": "sourceFrame.selectedUseKind"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNounstemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNounstemValidationFrame",
  "executionArgsBySelection": {
    "claim-p1497": [
      "absolutive-plural-plain"
    ],
    "claim-p1498": [
      "absolutive-common-tli"
    ],
    "claim-p1499": [
      "use-stem-absolutive"
    ],
    "claim-p1500": [
      "use-stem-absolutive"
    ],
    "claim-p1501": [
      "absolutive-common-distributive"
    ],
    "claim-p1502": [
      "absolutive-common-distributive"
    ],
    "claim-p1503": [
      "absolutive-plural-plain"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1497": "authorized",
    "claim-p1498": "authorized",
    "claim-p1499": "authorized",
    "claim-p1500": "authorized",
    "claim-p1501": "authorized",
    "claim-p1502": "authorized",
    "claim-p1503": "authorized"
  }
};
export default Object.freeze(spec);
