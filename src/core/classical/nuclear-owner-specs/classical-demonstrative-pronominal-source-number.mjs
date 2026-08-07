const spec = {
  "ownerId": "classical-demonstrative-pronominal-source-number",
  "prefix": "ClassicalDemonstrativePronominalSourceNumber",
  "operationId": "classical.demonstrative.pronominal.source.number.execute",
  "inputContract": "complete-typed-classical-demonstrative-pronominal-source-number-source",
  "domain": "classical-demonstrative-pronominal-source-number",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1706",
    "claim-p1707",
    "claim-p1708",
    "claim-p1709",
    "claim-p1710",
    "claim-p1711",
    "claim-p1712",
    "claim-p1713",
    "claim-p1714"
  ],
  "coordinates": {
    "claim-p1706::p1706-there-are-two-demonstrative-pronominal-nncs": {
      "assertionId": "classical-demonstrative-pronominal-source-number:p1706-there-are-two-demonstrative-pronominal-nncs",
      "canonicalPath": "pronominalFrame.sourceFrame.subtype"
    },
    "claim-p1707::p1707-both-can-also-function-as-demonstrative-adjectival-nncs-since": {
      "assertionId": "classical-demonstrative-pronominal-source-number:p1707-both-can-also-function-as-demonstrative-adjectival-nncs-since",
      "canonicalPath": "pronominalFrame.sourceFrame.sourceStem"
    },
    "claim-p1708::p1708-it-seems-preferable-however-to-treat-them-as-nncs": {
      "assertionId": "classical-demonstrative-pronominal-source-number:p1708-it-seems-preferable-however-to-treat-them-as-nncs",
      "canonicalPath": "pronominalFrame.sourceFrame.subject"
    },
    "claim-p1709::p1709-because-of-what-happens-in-the-honorific-forms-see": {
      "assertionId": "classical-demonstrative-pronominal-source-number:p1709-because-of-what-happens-in-the-honorific-forms-see",
      "canonicalPath": "numberFrame.internalPluralMorph"
    },
    "claim-p1710::p1710-when-plural-the-number-dyad-is-filled-with-see": {
      "assertionId": "classical-demonstrative-pronominal-source-number:p1710-when-plural-the-number-dyad-is-filled-with-see",
      "canonicalPath": "numberFrame.num1"
    },
    "claim-p1711::p1711-result-the-number-dyad-is-filled-with-see-16": {
      "assertionId": "classical-demonstrative-pronominal-source-number:p1711-result-the-number-dyad-is-filled-with-see-16",
      "canonicalPath": "numberFrame.num2"
    },
    "claim-p1712::p1712-the-stem-final-n-is-frequently-not-written-i": {
      "assertionId": "classical-demonstrative-pronominal-source-number:p1712-the-stem-final-n-is-frequently-not-written-i",
      "canonicalPath": "numberFrame.internalPluralMorph"
    },
    "claim-p1713::p1713-these-demonstrative-nncs-are-frequently-preceded-by-the-adjunctor": {
      "assertionId": "classical-demonstrative-pronominal-source-number:p1713-these-demonstrative-nncs-are-frequently-preceded-by-the-adjunctor",
      "canonicalPath": "pronominalFrame.sourceFrame.sourceStem"
    },
    "claim-p1714::p1714-the-adjunctor-and-the-nnc-are-traditionally-written-solid": {
      "assertionId": "classical-demonstrative-pronominal-source-number:p1714-the-adjunctor-and-the-nnc-are-traditionally-written-solid",
      "canonicalPath": "formulaStringAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1706": [
      "l16-demonstrative"
    ],
    "claim-p1707": [
      "l16-demonstrative"
    ],
    "claim-p1708": [
      "l16-demonstrative"
    ],
    "claim-p1709": [
      "l16-demonstrative"
    ],
    "claim-p1710": [
      "l16-demonstrative-plural"
    ],
    "claim-p1711": [
      "l16-demonstrative-plural"
    ],
    "claim-p1712": [
      "l16-demonstrative-plural"
    ],
    "claim-p1713": [
      "l16-demonstrative-plural"
    ],
    "claim-p1714": [
      "l16-demonstrative-plural"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1706": "authorized",
    "claim-p1707": "authorized",
    "claim-p1708": "authorized",
    "claim-p1709": "authorized",
    "claim-p1710": "authorized",
    "claim-p1711": "authorized",
    "claim-p1712": "authorized",
    "claim-p1713": "authorized",
    "claim-p1714": "authorized"
  }
};
export default Object.freeze(spec);
