const spec = {
  "ownerId": "classical-adverbial-possessive-first-degree-ambiguity",
  "prefix": "ClassicalAdverbialPossessiveFirstDegreeAmbiguity",
  "operationId": "classical.adverbial.possessive.first.degree.ambiguity.execute",
  "inputContract": "complete-typed-classical-adverbial-possessive-first-degree-ambiguity-source",
  "domain": "classical-adverbial-possessive-first-degree-ambiguity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4161",
    "claim-p4162"
  ],
  "coordinates": {
    "claim-p4161::p4161-those-possessive-state-nncs-that-can-because-of-their": {
      "assertionId": "classical-adverbial-possessive-first-degree-ambiguity:p4161-those-possessive-state-nncs-that-can-because-of-their",
      "canonicalPath": "cases.nncPossessiveFirst.canonicalResult"
    },
    "claim-p4162::p4162-it-is-at-to-from-their-home-homes-context": {
      "assertionId": "classical-adverbial-possessive-first-degree-ambiguity:p4162-it-is-at-to-from-their-home-homes-context",
      "canonicalPath": "cases.nncPossessiveFirst.clauseKind"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4161": [],
    "claim-p4162": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4161": "authorized",
    "claim-p4162": "authorized"
  }
};
export default Object.freeze(spec);
