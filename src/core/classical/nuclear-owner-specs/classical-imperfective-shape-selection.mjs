const spec = {
  "ownerId": "classical-imperfective-shape-selection",
  "prefix": "ClassicalImperfectiveShapeSelection",
  "operationId": "classical.imperfective.shape.select",
  "inputContract": "complete-typed-classical-imperfective-shape-selection-source",
  "domain": "classical-imperfective-shape-selection",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-imperfective-shape-selection",
  "selections": [
    "claim-p884",
    "claim-p885",
    "claim-p886",
    "claim-p887",
    "claim-p888",
    "claim-p889"
  ],
  "coordinates": {
    "claim-p884::p884-in-the-instance-of-class-c-and-class-d": {
      "assertionId": "classical-imperfective-shape-selection:p884-in-the-instance-of-class-c-and-class-d",
      "canonicalPath": "classShapeCounts"
    },
    "claim-p885::p885-when-vocable-final-or-when-followed-by-the-plural": {
      "assertionId": "classical-imperfective-shape-selection:p885-when-vocable-final-or-when-followed-by-the-plural",
      "canonicalPath": "classDPresentShape"
    },
    "claim-p886::p886-in-these-two-classes-the-stems-with-short-vowels": {
      "assertionId": "classical-imperfective-shape-selection:p886-in-these-two-classes-the-stems-with-short-vowels",
      "canonicalPath": "classDPresentStem"
    },
    "claim-p887::p887-this-means-for-example-that-the-truncated-class-c": {
      "assertionId": "classical-imperfective-shape-selection:p887-this-means-for-example-that-the-truncated-class-c",
      "canonicalPath": "classCOptativeShape"
    },
    "claim-p888::p888-the-imperfective-stem-of-class-a-verbs-with-a": {
      "assertionId": "classical-imperfective-shape-selection:p888-the-imperfective-stem-of-class-a-verbs-with-a",
      "canonicalPath": "classShapeCounts.A"
    },
    "claim-p889::p889-note-the-final-a-of-class-c-verbs-is": {
      "assertionId": "classical-imperfective-shape-selection:p889-note-the-final-a-of-class-c-verbs-is",
      "canonicalPath": "classCUnderlyingSilentCarrier"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlImperfectiveShapeSelectionSystemFrame",
  "executionValidatorName": "isClassicalNahuatlImperfectiveShapeSelectionSystemFrame",
  "executionArgsBySelection": {
    "claim-p884": [],
    "claim-p885": [],
    "claim-p886": [],
    "claim-p887": [],
    "claim-p888": [],
    "claim-p889": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p884": "authorized",
    "claim-p885": "authorized",
    "claim-p886": "authorized",
    "claim-p887": "authorized",
    "claim-p888": "authorized",
    "claim-p889": "authorized"
  }
};
export default Object.freeze(spec);
