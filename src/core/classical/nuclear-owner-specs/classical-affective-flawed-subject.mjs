const spec = {
  "ownerId": "classical-affective-flawed-subject",
  "prefix": "ClassicalAffectiveFlawedSubject",
  "operationId": "classical.affective.flawed.subject.execute",
  "inputContract": "complete-typed-classical-affective-flawed-subject-source",
  "domain": "classical-affective-flawed-subject",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3195",
    "claim-p3196",
    "claim-p3198",
    "claim-p3199"
  ],
  "coordinates": {
    "claim-p3195::p3195-besides-indicating-an-attitude-toward-a-subject-s-referent": {
      "assertionId": "classical-affective-flawed-subject:p3195-besides-indicating-an-attitude-toward-a-subject-s-referent",
      "canonicalPath": "cases.flawedSubject.rules.affective/flawed-subject"
    },
    "claim-p3196::p3196-in-this-kind-of-nnc-one-replaces-the-sounded": {
      "assertionId": "classical-affective-flawed-subject:p3196-in-this-kind-of-nnc-one-replaces-the-sounded",
      "canonicalPath": "cases.flawedSubject.authorizationStatus"
    },
    "claim-p3198::p3198-the-flawing-occurs-only-in-absolutive-state-nncs-with": {
      "assertionId": "classical-affective-flawed-subject:p3198-the-flawing-occurs-only-in-absolutive-state-nncs-with",
      "canonicalPath": "cases.flawedSubject.gcdSatisfied"
    },
    "claim-p3199::p3199-when-a-nounstem-that-signifies-an-abnormal-or-defective": {
      "assertionId": "classical-affective-flawed-subject:p3199-when-a-nounstem-that-signifies-an-abnormal-or-defective",
      "canonicalPath": "cases.flawedSubject.lcmComplete"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3195": [],
    "claim-p3196": [],
    "claim-p3198": [],
    "claim-p3199": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3195": "authorized",
    "claim-p3196": "authorized",
    "claim-p3198": "authorized",
    "claim-p3199": "authorized"
  }
};
export default Object.freeze(spec);
