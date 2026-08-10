const spec = {
  "ownerId": "classical-uncertain-ca-frequentative",
  "prefix": "ClassicalUncertainCaFrequentative",
  "operationId": "classical.uncertain.ca.frequentative.execute",
  "inputContract": "complete-typed-classical-uncertain-ca-frequentative-source",
  "domain": "classical-uncertain-ca-frequentative",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-frequentative-runtime",
  "selections": [
    "claim-p2710",
    "claim-p2711",
    "claim-p2713",
    "claim-p2712-02",
    "claim-p2712-03"
  ],
  "coordinates": {
    "claim-p2710::p2710-one-type-involves-the-use-of-the-intransitive-suffix": {
      "assertionId": "classical-uncertain-ca-frequentative:p2710-one-type-involves-the-use-of-the-intransitive-suffix",
      "canonicalPath": "cases.uncertainCa.targetStem"
    },
    "claim-p2711::p2711-the-resultant-stem-can-have-a-causative-counterpart-formed": {
      "assertionId": "classical-uncertain-ca-frequentative:p2711-the-resultant-stem-can-have-a-causative-counterpart-formed",
      "canonicalPath": "cases.uncertainCa.targetClass"
    },
    "claim-p2713::p2713-this-type-of-verbstem-formation-may-also-explain-the": {
      "assertionId": "classical-uncertain-ca-frequentative:p2713-this-type-of-verbstem-formation-may-also-explain-the",
      "canonicalPath": "cases.uncertainCa.targetStem"
    },
    "claim-p2712-02::hual-applicative-growl": {
      "assertionId": "classical-uncertain-ca-frequentative:hual-applicative-growl",
      "canonicalPath": "cases.uncertainCaApplicativeGrowl.targetStem"
    },
    "claim-p2712-03::hual-fused-tla-bark": {
      "assertionId": "classical-uncertain-ca-frequentative:hual-fused-tla-bark",
      "canonicalPath": "cases.uncertainCaFusedTlaBark.targetValence"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlFrequentativeValidationFrame",
  "executionValidatorName": "isClassicalNahuatlFrequentativeValidationFrame",
  "executionArgsBySelection": {
    "claim-p2710": [],
    "claim-p2711": [],
    "claim-p2713": [],
    "claim-p2712-02": [],
    "claim-p2712-03": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2710": "authorized",
    "claim-p2711": "authorized",
    "claim-p2713": "authorized",
    "claim-p2712-02": "authorized",
    "claim-p2712-03": "authorized"
  }
};
export default Object.freeze(spec);
