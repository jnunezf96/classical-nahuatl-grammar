const spec = {
  "ownerId": "classical-third-possessor-initial-i-boundary",
  "prefix": "ClassicalThirdPossessorInitialIBoundary",
  "operationId": "classical.third.possessor.initial.i.boundary.execute",
  "inputContract": "complete-typed-classical-third-possessor-initial-i-boundary-source",
  "domain": "classical-third-possessor-initial-i-boundary",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nounstem-selection-runtime",
  "selections": [
    "claim-p1585",
    "claim-p1586",
    "claim-p1587"
  ],
  "coordinates": {
    "claim-p1585::p1585-result-also": {
      "assertionId": "classical-third-possessor-initial-i-boundary:p1585-result-also",
      "canonicalPath": "orthographicBoundaryFrame.appliedActionIds.0"
    },
    "claim-p1586::p1586-when-the-nounstem-begins-with-an-i-followed-by": {
      "assertionId": "classical-third-possessor-initial-i-boundary:p1586-when-the-nounstem-begins-with-an-i-followed-by",
      "canonicalPath": "orthographicBoundaryFrame.appliedActionIds.0"
    },
    "claim-p1587::p1587-if-the-nounstem-begins-with-a-supportive-i-it": {
      "assertionId": "classical-third-possessor-initial-i-boundary:p1587-if-the-nounstem-begins-with-a-supportive-i-it",
      "canonicalPath": "orthographicBoundaryFrame.appliedActionIds.0"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNounstemValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNounstemValidationFrame",
  "executionArgsBySelection": {
    "claim-p1585": [
      "boundary-long-i"
    ],
    "claim-p1586": [
      "boundary-i-glottal"
    ],
    "claim-p1587": [
      "boundary-supportive-i"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1585": "authorized",
    "claim-p1586": "authorized",
    "claim-p1587": "authorized"
  }
};
export default Object.freeze(spec);
