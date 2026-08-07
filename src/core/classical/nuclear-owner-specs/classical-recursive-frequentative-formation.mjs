const spec = {
  "ownerId": "classical-recursive-frequentative-formation",
  "prefix": "ClassicalRecursiveFrequentativeFormation",
  "operationId": "classical.recursive.frequentative.formation.execute",
  "inputContract": "complete-typed-classical-recursive-frequentative-formation-source",
  "domain": "classical-recursive-frequentative-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2671",
    "claim-p2672",
    "claim-p2673"
  ],
  "coordinates": {
    "claim-p2671::p2671-neh-neh-nemi-to-walk-continually": {
      "assertionId": "classical-recursive-frequentative-formation:p2671-neh-neh-nemi-to-walk-continually",
      "canonicalPath": "cases.recursive.operationFacts.repetitions"
    },
    "claim-p2672::p2672-cho-cho-cho-ca-to-cry-and-cry-and": {
      "assertionId": "classical-recursive-frequentative-formation:p2672-cho-cho-cho-ca-to-cry-and-cry-and",
      "canonicalPath": "cases.recursive.ruleFamilies.1"
    },
    "claim-p2673::p2673-tla-cuah-cua-cua-to-chew-on-s-th": {
      "assertionId": "classical-recursive-frequentative-formation:p2673-tla-cuah-cua-cua-to-chew-on-s-th",
      "canonicalPath": "cases.recursive.targetStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2671": [],
    "claim-p2672": [],
    "claim-p2673": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2671": "authorized",
    "claim-p2672": "authorized",
    "claim-p2673": "authorized"
  }
};
export default Object.freeze(spec);
