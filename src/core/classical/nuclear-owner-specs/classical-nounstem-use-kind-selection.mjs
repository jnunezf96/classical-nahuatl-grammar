const spec = {
  "ownerId": "classical-nounstem-use-kind-selection",
  "prefix": "ClassicalNounstemUseKindSelection",
  "operationId": "classical.nounstem.use.kind.selection.execute",
  "inputContract": "complete-typed-classical-nounstem-use-kind-selection-source",
  "domain": "classical-nounstem-use-kind-selection",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nounstem-selection-runtime",
  "selections": [
    "claim-p1423",
    "claim-p1424",
    "claim-p1425",
    "claim-p1426",
    "claim-p1427",
    "claim-p1428"
  ],
  "coordinates": {
    "claim-p1423::p1423-every-nominal-lexical-item-in-nahuatl-at-least-theoretically": {
      "assertionId": "classical-nounstem-use-kind-selection:p1423-every-nominal-lexical-item-in-nahuatl-at-least-theoretically",
      "canonicalPath": "contractLeastCommonMultiple.useStemKindInventory.length"
    },
    "claim-p1424::p1424-use-stem-kinds": {
      "assertionId": "classical-nounstem-use-kind-selection:p1424-use-stem-kinds",
      "canonicalPath": "contractLeastCommonMultiple.useStemKindInventory.0.identity"
    },
    "claim-p1425::p1425-only-certain-nouns-show-a-difference-in-shape-between": {
      "assertionId": "classical-nounstem-use-kind-selection:p1425-only-certain-nouns-show-a-difference-in-shape-between",
      "canonicalPath": "sourceFrame.generalUseStem"
    },
    "claim-p1426::p1426-the-restricted-use-stem-regularly-is-the-citation-form": {
      "assertionId": "classical-nounstem-use-kind-selection:p1426-the-restricted-use-stem-regularly-is-the-citation-form",
      "canonicalPath": "sourceFrame.selectedUseStem"
    },
    "claim-p1427::p1427-it-is-used-in-forming-absolutive-state-nncs": {
      "assertionId": "classical-nounstem-use-kind-selection:p1427-it-is-used-in-forming-absolutive-state-nncs",
      "canonicalPath": "sourceFrame.selectedUseKind"
    },
    "claim-p1428::p1428-the-general-use-stem-is-derived-from-the-restricted": {
      "assertionId": "classical-nounstem-use-kind-selection:p1428-the-general-use-stem-is-derived-from-the-restricted",
      "canonicalPath": "sourceFrame.selectedUseKind"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNounstemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNounstemValidationFrame",
  "executionArgsBySelection": {
    "claim-p1423": [
      "use-stem-absolutive"
    ],
    "claim-p1424": [
      "use-stem-absolutive"
    ],
    "claim-p1425": [
      "use-stem-possessive-truncated"
    ],
    "claim-p1426": [
      "use-stem-absolutive"
    ],
    "claim-p1427": [
      "use-stem-absolutive"
    ],
    "claim-p1428": [
      "use-stem-possessive-truncated"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1423": "authorized",
    "claim-p1424": "authorized",
    "claim-p1425": "authorized",
    "claim-p1426": "authorized",
    "claim-p1427": "authorized",
    "claim-p1428": "authorized"
  }
};
export default Object.freeze(spec);
