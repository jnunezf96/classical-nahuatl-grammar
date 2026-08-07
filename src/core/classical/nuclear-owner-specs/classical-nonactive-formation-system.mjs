const spec = {
  "ownerId": "classical-nonactive-formation-system",
  "prefix": "ClassicalNonactiveFormationSystem",
  "operationId": "classical.nonactive.formation.system.execute",
  "inputContract": "complete-typed-classical-nonactive-formation-system-source",
  "domain": "classical-nonactive-formation-system",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p1972",
    "claim-p1973",
    "claim-p1974"
  ],
  "coordinates": {
    "claim-p1972::p1972-the-nonactive-verbstem-is-created-by-derivation-a-process": {
      "assertionId": "classical-nonactive-formation-system:p1972-the-nonactive-verbstem-is-created-by-derivation-a-process",
      "canonicalPath": "contract.formationCores"
    },
    "claim-p1973::p1973-in-this-instance-the-derived-stem-is-created-by": {
      "assertionId": "classical-nonactive-formation-system:p1973-in-this-instance-the-derived-stem-is-created-by",
      "canonicalPath": "contract.gcd.operationOrder"
    },
    "claim-p1974::p1974-the-o-hua-and-lo-hua-combinations-are-usually": {
      "assertionId": "classical-nonactive-formation-system:p1974-the-o-hua-and-lo-hua-combinations-are-usually",
      "canonicalPath": "contract.gcd.predicateInvariant"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p1972": [],
    "claim-p1973": [],
    "claim-p1974": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1972": "authorized",
    "claim-p1973": "authorized",
    "claim-p1974": "authorized"
  }
};
export default Object.freeze(spec);
