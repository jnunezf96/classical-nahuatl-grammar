const spec = {
  "ownerId": "classical-relational-nounstem-not-preposition",
  "prefix": "ClassicalRelationalNounstemNotPreposition",
  "operationId": "classical.relational.nounstem.not.preposition.execute",
  "inputContract": "complete-typed-classical-relational-nounstem-not-preposition-source",
  "domain": "classical-relational-nounstem-not-preposition",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-relational-nnc-runtime",
  "selections": [
    "claim-p4237",
    "claim-p4238",
    "claim-p4239",
    "claim-p4240"
  ],
  "coordinates": {
    "claim-p4237::p4237-these-relational-nounstems-do-possess-certain-peculiarities-but-they": {
      "assertionId": "classical-relational-nounstem-not-preposition:p4237-these-relational-nounstems-do-possess-certain-peculiarities-but-they",
      "canonicalPath": "cases.translationBoundary.canonicalResult"
    },
    "claim-p4238::p4238-in-acknowledgement-of-their-special-character-they-are-called": {
      "assertionId": "classical-relational-nounstem-not-preposition:p4238-in-acknowledgement-of-their-special-character-they-are-called",
      "canonicalPath": "contract.translationPrepositionAuthorizesMorphology"
    },
    "claim-p4239::p4239-like-most-other-adverbialized-nncs-they-are-usually-translated": {
      "assertionId": "classical-relational-nounstem-not-preposition:p4239-like-most-other-adverbialized-nncs-they-are-usually-translated",
      "canonicalPath": "blockedCases.callerStringsIgnored.canonicalMatchesHostile"
    },
    "claim-p4240::p4240-in-such-circumstances-the-pressures-of-translational-mirage-are": {
      "assertionId": "classical-relational-nounstem-not-preposition:p4240-in-such-circumstances-the-pressures-of-translational-mirage-are",
      "canonicalPath": "cases.translationBoundary.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4237": [],
    "claim-p4238": [],
    "claim-p4239": [],
    "claim-p4240": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4237": "authorized",
    "claim-p4238": "authorized",
    "claim-p4239": "authorized",
    "claim-p4240": "authorized"
  }
};
export default Object.freeze(spec);
