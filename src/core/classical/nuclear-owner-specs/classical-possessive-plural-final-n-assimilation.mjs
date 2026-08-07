const spec = {
  "ownerId": "classical-possessive-plural-final-n-assimilation",
  "prefix": "ClassicalPossessivePluralFinalNAssimilation",
  "operationId": "classical.possessive.plural.final.n.assimilation.execute",
  "inputContract": "complete-typed-classical-possessive-plural-final-n-assimilation-source",
  "domain": "classical-possessive-plural-final-n-assimilation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1593",
    "claim-p1594",
    "claim-p1595",
    "claim-p1596"
  ],
  "coordinates": {
    "claim-p1593::p1593-result-the-preceding-vowel-is-somewhat-nasalized-and-the": {
      "assertionId": "classical-possessive-plural-final-n-assimilation:p1593-result-the-preceding-vowel-is-somewhat-nasalized-and-the",
      "canonicalPath": "higherFrame.operationFrame.appliedActions.0.action"
    },
    "claim-p1594::p1594-when-a-nounstem-ends-in-n-the-preceding-vowel": {
      "assertionId": "classical-possessive-plural-final-n-assimilation:p1594-when-a-nounstem-ends-in-n-the-preceding-vowel",
      "canonicalPath": "higherFrame.operationFrame.appliedActions.0.outputStem"
    },
    "claim-p1595::p1595-na-n-tli-na-n-mother": {
      "assertionId": "classical-possessive-plural-final-n-assimilation:p1595-na-n-tli-na-n-mother",
      "canonicalPath": "higherFrame.operationFrame.appliedActions.0.spellingAlternative"
    },
    "claim-p1596::p1596-also-written-tona-nhua-n": {
      "assertionId": "classical-possessive-plural-final-n-assimilation:p1596-also-written-tona-nhua-n",
      "canonicalPath": "ordinaryContract.leastCommonMultiple.selectedCoordinate.possessivePluralBoundaryIdentity"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1593": [
      "l15-final-n"
    ],
    "claim-p1594": [
      "l15-final-n"
    ],
    "claim-p1595": [
      "l15-final-n"
    ],
    "claim-p1596": [
      "l15-final-n"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1593": "authorized",
    "claim-p1594": "authorized",
    "claim-p1595": "authorized",
    "claim-p1596": "authorized"
  }
};
export default Object.freeze(spec);
