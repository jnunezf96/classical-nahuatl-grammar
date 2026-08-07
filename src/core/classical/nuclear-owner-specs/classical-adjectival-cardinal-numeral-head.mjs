const spec = {
  "ownerId": "classical-adjectival-cardinal-numeral-head",
  "prefix": "ClassicalAdjectivalCardinalNumeralHead",
  "operationId": "classical.adjectival.cardinal.numeral.head.execute",
  "inputContract": "complete-typed-classical-adjectival-cardinal-numeral-head-source",
  "domain": "classical-adjectival-cardinal-numeral-head",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4061",
    "claim-p4062",
    "claim-p4063",
    "claim-p4064",
    "claim-p4065"
  ],
  "coordinates": {
    "claim-p4061::p4061-a-cardinal-numeral-nnc": {
      "assertionId": "classical-adjectival-cardinal-numeral-head:p4061-a-cardinal-numeral-nnc",
      "canonicalPath": "cases.cardinalHead.canonicalResult"
    },
    "claim-p4062::p4062-the-numeral-nnc-may-be-the-head-in-the": {
      "assertionId": "classical-adjectival-cardinal-numeral-head:p4062-the-numeral-nnc-may-be-the-head-in-the",
      "canonicalPath": "cases.cardinalHead.headClauseType"
    },
    "claim-p4063::p4063-the-construction-is-obvious-when-an-adjunctor-is-present": {
      "assertionId": "classical-adjectival-cardinal-numeral-head:p4063-the-construction-is-obvious-when-an-adjunctor-is-present",
      "canonicalPath": "cases.cardinalHead.adjunctor"
    },
    "claim-p4064::p4064-when-an-adjunctor-is-present-but": {
      "assertionId": "classical-adjectival-cardinal-numeral-head:p4064-when-an-adjunctor-is-present-but",
      "canonicalPath": "cases.cardinalHead.canonicalResult"
    },
    "claim-p4065::p4065-english-translation-prefers-to-ignore-the-construction-by-rendering": {
      "assertionId": "classical-adjectival-cardinal-numeral-head:p4065-english-translation-prefers-to-ignore-the-construction-by-rendering",
      "canonicalPath": "cases.cardinalHead.headClauseType"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4061": [],
    "claim-p4062": [],
    "claim-p4063": [],
    "claim-p4064": [],
    "claim-p4065": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4061": "authorized",
    "claim-p4062": "authorized",
    "claim-p4063": "authorized",
    "claim-p4064": "authorized",
    "claim-p4065": "authorized"
  }
};
export default Object.freeze(spec);
