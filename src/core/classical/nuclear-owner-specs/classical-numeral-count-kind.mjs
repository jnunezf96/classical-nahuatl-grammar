const spec = {
  "ownerId": "classical-numeral-count-kind",
  "prefix": "ClassicalNumeralCountKind",
  "operationId": "classical.numeral.count.kind.execute",
  "inputContract": "complete-typed-classical-numeral-count-kind-source",
  "domain": "classical-numeral-count-kind",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3257",
    "claim-p3258",
    "claim-p3259",
    "claim-p3260",
    "claim-p3261"
  ],
  "coordinates": {
    "claim-p3257::p3257-there-are-five-sets-of-numeral-nncs-each-set": {
      "assertionId": "classical-numeral-count-kind:p3257-there-are-five-sets-of-numeral-nncs-each-set",
      "canonicalPath": "cases.countKind.rules.numeral/count-kind"
    },
    "claim-p3258::p3258-these-five-sets-consist-of-a-basic-set-and": {
      "assertionId": "classical-numeral-count-kind:p3258-these-five-sets-consist-of-a-basic-set-and",
      "canonicalPath": "cases.countKind.authorizationStatus"
    },
    "claim-p3259::p3259-the-latter-are-made-up-of-compound-nounstems-that": {
      "assertionId": "classical-numeral-count-kind:p3259-the-latter-are-made-up-of-compound-nounstems-that",
      "canonicalPath": "cases.countKind.gcdSatisfied"
    },
    "claim-p3260::p3260-numeral-stems-both-those-of-the-basic-set-and": {
      "assertionId": "classical-numeral-count-kind:p3260-numeral-stems-both-those-of-the-basic-set-and",
      "canonicalPath": "cases.countKind.lcmComplete"
    },
    "claim-p3261::p3261-this-nounstem-occurs-as-an-embed-in-the-quantitive": {
      "assertionId": "classical-numeral-count-kind:p3261-this-nounstem-occurs-as-an-embed-in-the-quantitive",
      "canonicalPath": "cases.countKind.rules.numeral/count-kind"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3257": [],
    "claim-p3258": [],
    "claim-p3259": [],
    "claim-p3260": [],
    "claim-p3261": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3257": "authorized",
    "claim-p3258": "authorized",
    "claim-p3259": "authorized",
    "claim-p3260": "authorized",
    "claim-p3261": "authorized"
  }
};
export default Object.freeze(spec);
