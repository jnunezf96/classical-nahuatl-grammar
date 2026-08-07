const spec = {
  "ownerId": "classical-compound-hysteron-proteron-order",
  "prefix": "ClassicalCompoundHysteronProteronOrder",
  "operationId": "classical.compound.hysteron.proteron.order.execute",
  "inputContract": "complete-typed-classical-compound-hysteron-proteron-order-source",
  "domain": "classical-compound-hysteron-proteron-order",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2833",
    "claim-p2834",
    "claim-p2835",
    "claim-p2836",
    "claim-p2837"
  ],
  "coordinates": {
    "claim-p2833::p2833-occasionally-the-relative-order-of-events-represented-by-the": {
      "assertionId": "classical-compound-hysteron-proteron-order:p2833-occasionally-the-relative-order-of-events-represented-by-the",
      "canonicalPath": "contract.reversedEventOrder"
    },
    "claim-p2834::p2834-the-result-is-a-nahuatl-version-of-the-rhetorical": {
      "assertionId": "classical-compound-hysteron-proteron-order:p2834-the-result-is-a-nahuatl-version-of-the-rhetorical",
      "canonicalPath": "cases.hysteronProteron.facts.eventOrder"
    },
    "claim-p2835::p2835-the-stem-ahci-in-the-matrix-subposition-frequently-permits": {
      "assertionId": "classical-compound-hysteron-proteron-order:p2835-the-stem-ahci-in-the-matrix-subposition-frequently-permits",
      "canonicalPath": "cases.hysteronProteron.facts.matrixStem"
    },
    "claim-p2836::p2836-tequi-ti-t-ahci-to-work-upon-arriving-to": {
      "assertionId": "classical-compound-hysteron-proteron-order:p2836-tequi-ti-t-ahci-to-work-upon-arriving-to",
      "canonicalPath": "contract.reversedEventOrder"
    },
    "claim-p2837::p2837-tla-cuah-t-ahci-to-eat-s-th-upon": {
      "assertionId": "classical-compound-hysteron-proteron-order:p2837-tla-cuah-t-ahci-to-eat-s-th-upon",
      "canonicalPath": "cases.hysteronProteron.facts.eventOrder"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2833": [],
    "claim-p2834": [],
    "claim-p2835": [],
    "claim-p2836": [],
    "claim-p2837": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2833": "authorized",
    "claim-p2834": "authorized",
    "claim-p2835": "authorized",
    "claim-p2836": "authorized",
    "claim-p2837": "authorized"
  }
};
export default Object.freeze(spec);
