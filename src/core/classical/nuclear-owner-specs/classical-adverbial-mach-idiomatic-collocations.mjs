const spec = {
  "ownerId": "classical-adverbial-mach-idiomatic-collocations",
  "prefix": "ClassicalAdverbialMachIdiomaticCollocations",
  "operationId": "classical.adverbial.mach.idiomatic.collocations.execute",
  "inputContract": "complete-typed-classical-adverbial-mach-idiomatic-collocations-source",
  "domain": "classical-adverbial-mach-idiomatic-collocations",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4179",
    "claim-p4180",
    "claim-p4181",
    "claim-p4182",
    "claim-p4183"
  ],
  "coordinates": {
    "claim-p4179::p4179-mach-occurs-in-a-number-of-idiomatic-usages": {
      "assertionId": "classical-adverbial-mach-idiomatic-collocations:p4179-mach-occurs-in-a-number-of-idiomatic-usages",
      "canonicalPath": "cases.particleMach.canonicalResult"
    },
    "claim-p4180::p4180-the-collocation-mach-eh-traditionally-written-mache-is-translated": {
      "assertionId": "classical-adverbial-mach-idiomatic-collocations:p4180-the-collocation-mach-eh-traditionally-written-mache-is-translated",
      "canonicalPath": "cases.particleMach.context.stressPartner"
    },
    "claim-p4181::p4181-after-an-interrogative-mach-is-translated-as-an-exasperated": {
      "assertionId": "classical-adverbial-mach-idiomatic-collocations:p4181-after-an-interrogative-mach-is-translated-as-an-exasperated",
      "canonicalPath": "contract.traditionalSpellingAuthority"
    },
    "claim-p4182::p4182-the-mach-translated-negatively-in-16-6-2-mach": {
      "assertionId": "classical-adverbial-mach-idiomatic-collocations:p4182-the-mach-translated-negatively-in-16-6-2-mach",
      "canonicalPath": "cases.particleMach.canonicalResult"
    },
    "claim-p4183::p4183-in-the-meaning-notably-mach-also-occurs-after-o": {
      "assertionId": "classical-adverbial-mach-idiomatic-collocations:p4183-in-the-meaning-notably-mach-also-occurs-after-o",
      "canonicalPath": "cases.particleMach.context.stressPartner"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4179": [],
    "claim-p4180": [],
    "claim-p4181": [],
    "claim-p4182": [],
    "claim-p4183": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4179": "authorized",
    "claim-p4180": "authorized",
    "claim-p4181": "authorized",
    "claim-p4182": "authorized",
    "claim-p4183": "authorized"
  }
};
export default Object.freeze(spec);
