const spec = {
  "ownerId": "classical-long-o-uh-orthographic-boundary",
  "prefix": "ClassicalLongOUhOrthographicBoundary",
  "operationId": "classical.long.o.uh.orthographic.boundary.execute",
  "inputContract": "complete-typed-classical-long-o-uh-orthographic-boundary-source",
  "domain": "classical-long-o-uh-orthographic-boundary",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nounstem-selection-runtime",
  "selections": [
    "claim-p1580",
    "claim-p1581",
    "claim-p1582",
    "claim-p1583",
    "claim-p1584"
  ],
  "coordinates": {
    "claim-p1580::p1580-result-another-occurs": {
      "assertionId": "classical-long-o-uh-orthographic-boundary:p1580-result-another-occurs",
      "canonicalPath": "orthographicBoundaryFrame.actions.0.applies"
    },
    "claim-p1581::p1581-another-occurs-when-a-ti-stem-ends-in-o": {
      "assertionId": "classical-long-o-uh-orthographic-boundary:p1581-another-occurs-when-a-ti-stem-ends-in-o",
      "canonicalPath": "orthographicBoundaryFrame.actions.0.sourceSequence"
    },
    "claim-p1582::p1582-in-this-context-o-is-pronounced-u-see-2": {
      "assertionId": "classical-long-o-uh-orthographic-boundary:p1582-in-this-context-o-is-pronounced-u-see-2",
      "canonicalPath": "orthographicBoundaryFrame.actions.0.outputPolicy"
    },
    "claim-p1583::p1583-at-the-same-time-that-it-falsifies-the-dimensions": {
      "assertionId": "classical-long-o-uh-orthographic-boundary:p1583-at-the-same-time-that-it-falsifies-the-dimensions",
      "canonicalPath": "orthographicBoundaryFrame.traditionalUnderwritingIsAuthority"
    },
    "claim-p1584::p1584-in-the-examples-given-the-stress-should-fall-on": {
      "assertionId": "classical-long-o-uh-orthographic-boundary:p1584-in-the-examples-given-the-stress-should-fall-on",
      "canonicalPath": "formulaRealization"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNounstemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNounstemValidationFrame",
  "executionArgsBySelection": {
    "claim-p1580": [
      "boundary-long-o"
    ],
    "claim-p1581": [
      "boundary-long-o"
    ],
    "claim-p1582": [
      "boundary-long-o"
    ],
    "claim-p1583": [
      "boundary-long-o"
    ],
    "claim-p1584": [
      "boundary-long-o"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1580": "authorized",
    "claim-p1581": "authorized",
    "claim-p1582": "authorized",
    "claim-p1583": "authorized",
    "claim-p1584": "authorized"
  }
};
export default Object.freeze(spec);
