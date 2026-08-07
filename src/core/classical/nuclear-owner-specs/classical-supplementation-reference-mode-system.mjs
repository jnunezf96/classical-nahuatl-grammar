const spec = {
  "ownerId": "classical-supplementation-reference-mode-system",
  "prefix": "ClassicalSupplementationReferenceModeSystem",
  "operationId": "classical.supplementation.reference.mode.system.execute",
  "inputContract": "complete-typed-classical-supplementation-reference-mode-system-source",
  "domain": "classical-supplementation-reference-mode-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1787",
    "claim-p1788",
    "claim-p1789"
  ],
  "coordinates": {
    "claim-p1787::p1787-there-are-two-kinds-of-structures-of-supplementation-1": {
      "assertionId": "classical-supplementation-reference-mode-system:p1787-there-are-two-kinds-of-structures-of-supplementation-1",
      "canonicalPath": "shared.referenceFrame.referenceMode"
    },
    "claim-p1788::p1788-all-three-kinds-of-nuclear-personal-pronouns-subject-object": {
      "assertionId": "classical-supplementation-reference-mode-system:p1788-all-three-kinds-of-nuclear-personal-pronouns-subject-object",
      "canonicalPath": "includedWish.referenceFrame.referenceMode"
    },
    "claim-p1789::p1789-in-shared-referent-supplementation-a-relevant-personal-pronoun-in": {
      "assertionId": "classical-supplementation-reference-mode-system:p1789-in-shared-referent-supplementation-a-relevant-personal-pronoun-in",
      "canonicalPath": "includedWish.referenceFrame.wholeSupplementIsReferent"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1787": [],
    "claim-p1788": [],
    "claim-p1789": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1787": "authorized",
    "claim-p1788": "authorized",
    "claim-p1789": "authorized"
  }
};
export default Object.freeze(spec);
