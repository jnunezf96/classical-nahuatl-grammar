const spec = {
  "ownerId": "classical-relational-no-preposition-morphology-counterpart",
  "prefix": "ClassicalRelationalNoPrepositionMorphologyCounterpart",
  "operationId": "classical.relational.no.preposition.morphology.counterpart.execute",
  "inputContract": "complete-typed-classical-relational-no-preposition-morphology-counterpart-source",
  "domain": "classical-relational-no-preposition-morphology-counterpart",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4246",
    "claim-p4247",
    "claim-p4248",
    "claim-p4249"
  ],
  "coordinates": {
    "claim-p4246::p4246-warning-the-major-deterrent-to-understanding-nahuatl-grammar-here": {
      "assertionId": "classical-relational-no-preposition-morphology-counterpart:p4246-warning-the-major-deterrent-to-understanding-nahuatl-grammar-here",
      "canonicalPath": "cases.translationBoundary.canonicalResult"
    },
    "claim-p4247::p4247-when-one-succumbs-to-linguicentrism-and-naively-demands-that": {
      "assertionId": "classical-relational-no-preposition-morphology-counterpart:p4247-when-one-succumbs-to-linguicentrism-and-naively-demands-that",
      "canonicalPath": "contract.translationPrepositionAuthorizesMorphology"
    },
    "claim-p4248::p4248-any-preposition-that-appears-in-an-english-or-spanish": {
      "assertionId": "classical-relational-no-preposition-morphology-counterpart:p4248-any-preposition-that-appears-in-an-english-or-spanish",
      "canonicalPath": "blockedCases.callerStringsIgnored.canonicalMatchesHostile"
    },
    "claim-p4249::p4249-one-should-not-be-duped-by-translational-mirage": {
      "assertionId": "classical-relational-no-preposition-morphology-counterpart:p4249-one-should-not-be-duped-by-translational-mirage",
      "canonicalPath": "cases.translationBoundary.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4246": [],
    "claim-p4247": [],
    "claim-p4248": [],
    "claim-p4249": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4246": "authorized",
    "claim-p4247": "authorized",
    "claim-p4248": "authorized",
    "claim-p4249": "authorized"
  }
};
export default Object.freeze(spec);
