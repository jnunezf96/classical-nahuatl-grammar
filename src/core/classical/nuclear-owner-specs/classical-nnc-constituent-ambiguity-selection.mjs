const spec = {
  "ownerId": "classical-nnc-constituent-ambiguity-selection",
  "prefix": "ClassicalNncConstituentAmbiguitySelection",
  "operationId": "classical.nnc.constituent.ambiguity.selection.execute",
  "inputContract": "complete-typed-classical-nnc-constituent-ambiguity-selection-source",
  "domain": "classical-nnc-constituent-ambiguity-selection",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nounstem-selection-runtime",
  "selections": [
    "claim-p1575",
    "claim-p1576",
    "claim-p1577",
    "claim-p1578",
    "claim-p1579"
  ],
  "coordinates": {
    "claim-p1575::p1575-if-the-o-is-long-the-problem-does-not": {
      "assertionId": "classical-nnc-constituent-ambiguity-selection:p1575-if-the-o-is-long-the-problem-does-not",
      "canonicalPath": "orthographicBoundaryFrame.vowelLengthAuthority"
    },
    "claim-p1576::p1576-if-the-o-is-long": {
      "assertionId": "classical-nnc-constituent-ambiguity-selection:p1576-if-the-o-is-long",
      "canonicalPath": "orthographicBoundaryFrame.predicateStem"
    },
    "claim-p1577::p1577-long-o-has-to-belong-to-the-stem": {
      "assertionId": "classical-nnc-constituent-ambiguity-selection:p1577-long-o-has-to-belong-to-the-stem",
      "canonicalPath": "orthographicBoundaryFrame.appliedActionIds.0"
    },
    "claim-p1578::p1578-a-similar-problem-exists-with-the-m-after-a": {
      "assertionId": "classical-nnc-constituent-ambiguity-selection:p1578-a-similar-problem-exists-with-the-m-after-a",
      "canonicalPath": "ambiguityFrame.selectedAnalysis.slots.st2"
    },
    "claim-p1579::p1579-to-solve-such-problems-one-must-be-aware-of": {
      "assertionId": "classical-nnc-constituent-ambiguity-selection:p1579-to-solve-such-problems-one-must-be-aware-of",
      "canonicalPath": "ambiguityFrame.spellingAloneSelectsAnalysis"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNounstemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNounstemValidationFrame",
  "executionArgsBySelection": {
    "claim-p1575": [
      "boundary-long-o"
    ],
    "claim-p1576": [
      "boundary-long-o"
    ],
    "claim-p1577": [
      "boundary-long-o"
    ],
    "claim-p1578": [
      "constituent-front-m"
    ],
    "claim-p1579": [
      "constituent-front-m"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1575": "authorized",
    "claim-p1576": "authorized",
    "claim-p1577": "authorized",
    "claim-p1578": "authorized",
    "claim-p1579": "authorized"
  }
};
export default Object.freeze(spec);
