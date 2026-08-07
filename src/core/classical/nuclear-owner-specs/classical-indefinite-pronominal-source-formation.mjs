const spec = {
  "ownerId": "classical-indefinite-pronominal-source-formation",
  "prefix": "ClassicalIndefinitePronominalSourceFormation",
  "operationId": "classical.indefinite.pronominal.source.formation.execute",
  "inputContract": "complete-typed-classical-indefinite-pronominal-source-formation-source",
  "domain": "classical-indefinite-pronominal-source-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1715",
    "claim-p1716",
    "claim-p1717",
    "claim-p1718",
    "claim-p1719",
    "claim-p1720"
  ],
  "coordinates": {
    "claim-p1715::p1715-there-are-two-indefinite-pronominal-nounstems-both-formed-as": {
      "assertionId": "classical-indefinite-pronominal-source-formation:p1715-there-are-two-indefinite-pronominal-nounstems-both-formed-as",
      "canonicalPath": "pronominalFrame.sourceFrame.subtype"
    },
    "claim-p1716::p1716-result-this-matrix-stem-also-occurs-in-the-substantival": {
      "assertionId": "classical-indefinite-pronominal-source-formation:p1716-result-this-matrix-stem-also-occurs-in-the-substantival",
      "canonicalPath": "pronominalFrame.sourceFrame.sourceStem"
    },
    "claim-p1717::p1717-this-matrix-stem-also-occurs-in-the-substantival-adverbial": {
      "assertionId": "classical-indefinite-pronominal-source-formation:p1717-this-matrix-stem-also-occurs-in-the-substantival-adverbial",
      "canonicalPath": "pronominalFrame.sourceFrame.referentCategory"
    },
    "claim-p1718::p1718-in-all-instances-of-ah-as-matrix-stem-length": {
      "assertionId": "classical-indefinite-pronominal-source-formation:p1718-in-all-instances-of-ah-as-matrix-stem-length",
      "canonicalPath": "pronominalFrame.sourceFrame.contextSelectionAuthority"
    },
    "claim-p1719::p1719-a-c-ah-someone-a-c-who-is-it": {
      "assertionId": "classical-indefinite-pronominal-source-formation:p1719-a-c-ah-someone-a-c-who-is-it",
      "canonicalPath": "formulaStringAuthority"
    },
    "claim-p1720::p1720-itl-ah-something-the-embedded-constituent-itl-is-related": {
      "assertionId": "classical-indefinite-pronominal-source-formation:p1720-itl-ah-something-the-embedded-constituent-itl-is-related",
      "canonicalPath": "pronominalFrame.sourceFrame.sourceStem"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1715": [
      "l16-indefinite-someone"
    ],
    "claim-p1716": [
      "l16-indefinite-someone"
    ],
    "claim-p1717": [
      "l16-indefinite-someone"
    ],
    "claim-p1718": [
      "l16-indefinite-someone"
    ],
    "claim-p1719": [
      "l16-indefinite-someone"
    ],
    "claim-p1720": [
      "l16-indefinite-something"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1715": "authorized",
    "claim-p1716": "authorized",
    "claim-p1717": "authorized",
    "claim-p1718": "authorized",
    "claim-p1719": "authorized",
    "claim-p1720": "authorized"
  }
};
export default Object.freeze(spec);
