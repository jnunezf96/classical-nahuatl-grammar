const spec = {
  "ownerId": "classical-attitude-honorific-projective-ambiguity-analysis",
  "prefix": "ClassicalAttitudeHonorificProjectiveAmbiguityAnalysis",
  "operationId": "classical.attitude.honorific.projective.ambiguity.analysis.execute",
  "inputContract": "complete-typed-classical-attitude-honorific-projective-ambiguity-analysis-source",
  "domain": "classical-attitude-honorific-projective-ambiguity-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-attitude-vnc-runtime",
  "selections": [
    "claim-p3224",
    "claim-p3225",
    "claim-p3226",
    "claim-p3227",
    "claim-p3231"
  ],
  "coordinates": {
    "claim-p3224::p3224-from-the-point-of-view-of-meaning-the-construction": {
      "assertionId": "classical-attitude-honorific-projective-ambiguity-analysis:p3224-from-the-point-of-view-of-meaning-the-construction",
      "canonicalPath": "cases.honorificProjective.authorizationStatus"
    },
    "claim-p3225::p3225-not-just-the-subject-entity-but-an-object-entity": {
      "assertionId": "classical-attitude-honorific-projective-ambiguity-analysis:p3225-not-just-the-subject-entity-but-an-object-entity",
      "canonicalPath": "contract.evidenceRoles.projectiveAmbiguity"
    },
    "claim-p3226::p3226-when-the-latter-is-the-case-i-e-when": {
      "assertionId": "classical-attitude-honorific-projective-ambiguity-analysis:p3226-when-the-latter-is-the-case-i-e-when",
      "canonicalPath": "contract.storedExampleAuthority"
    },
    "claim-p3227::p3227-in-addition-to-this-logical-difficulty-the-vnc-is": {
      "assertionId": "classical-attitude-honorific-projective-ambiguity-analysis:p3227-in-addition-to-this-logical-difficulty-the-vnc-is",
      "canonicalPath": "cases.honorificProjective.authorizationStatus"
    },
    "claim-p3231::p3231-the-resultant-vncs-are-potentially-ambiguous-since-the-honored": {
      "assertionId": "classical-attitude-honorific-projective-ambiguity-analysis:p3231-the-resultant-vncs-are-potentially-ambiguous-since-the-honored",
      "canonicalPath": "contract.evidenceRoles.projectiveAmbiguity"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAttitudeVncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAttitudeVncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3224": [],
    "claim-p3225": [],
    "claim-p3226": [],
    "claim-p3227": [],
    "claim-p3231": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3224": "authorized",
    "claim-p3225": "authorized",
    "claim-p3226": "authorized",
    "claim-p3227": "authorized",
    "claim-p3231": "authorized"
  }
};
export default Object.freeze(spec);
