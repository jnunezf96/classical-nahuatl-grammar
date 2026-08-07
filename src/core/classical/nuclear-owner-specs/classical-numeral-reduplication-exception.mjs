const spec = {
  "ownerId": "classical-numeral-reduplication-exception",
  "prefix": "ClassicalNumeralReduplicationException",
  "operationId": "classical.numeral.reduplication.exception.execute",
  "inputContract": "complete-typed-classical-numeral-reduplication-exception-source",
  "domain": "classical-numeral-reduplication-exception",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3345",
    "claim-p3346",
    "claim-p3347",
    "claim-p3348"
  ],
  "coordinates": {
    "claim-p3345::p3345-but-with-seven-eight-and-nine-reduplication-occurs-both": {
      "assertionId": "classical-numeral-reduplication-exception:p3345-but-with-seven-eight-and-nine-reduplication-occurs-both",
      "canonicalPath": "cases.reduplicationException.rules.numeral/reduplication-exception"
    },
    "claim-p3346::p3346-chi-chiucna-na-hui-chi-chiucna-na-uhtetl-chi": {
      "assertionId": "classical-numeral-reduplication-exception:p3346-chi-chiucna-na-hui-chi-chiucna-na-uhtetl-chi",
      "canonicalPath": "cases.reduplicationException.authorizationStatus"
    },
    "claim-p3347::p3347-with-mah-tla-c-tli-reduplication-occurs-on-the": {
      "assertionId": "classical-numeral-reduplication-exception:p3347-with-mah-tla-c-tli-reduplication-occurs-on-the",
      "canonicalPath": "cases.reduplicationException.gcdSatisfied"
    },
    "claim-p3348::p3348-mahtla-tla-ctli-mahtla-tla-ctetl-mahtla-tla-ctlamantli": {
      "assertionId": "classical-numeral-reduplication-exception:p3348-mahtla-tla-ctli-mahtla-tla-ctetl-mahtla-tla-ctlamantli",
      "canonicalPath": "cases.reduplicationException.lcmComplete"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3345": [],
    "claim-p3346": [],
    "claim-p3347": [],
    "claim-p3348": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3345": "authorized",
    "claim-p3346": "authorized",
    "claim-p3347": "authorized",
    "claim-p3348": "authorized"
  }
};
export default Object.freeze(spec);
