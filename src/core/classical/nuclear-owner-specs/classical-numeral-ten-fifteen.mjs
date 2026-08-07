const spec = {
  "ownerId": "classical-numeral-ten-fifteen",
  "prefix": "ClassicalNumeralTenFifteen",
  "operationId": "classical.numeral.ten.fifteen.execute",
  "inputContract": "complete-typed-classical-numeral-ten-fifteen-source",
  "domain": "classical-numeral-ten-fifteen",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3290",
    "claim-p3293"
  ],
  "coordinates": {
    "claim-p3290::p3290-the-stems-mah-tla-c-tli-ten-and-cax": {
      "assertionId": "classical-numeral-ten-fifteen:p3290-the-stems-mah-tla-c-tli-ten-and-cax",
      "canonicalPath": "cases.tenFifteen.rules.numeral/ten-fifteen"
    },
    "claim-p3293::p3293-when-the-subject-pronoun-is-animate-an-nnc-built": {
      "assertionId": "classical-numeral-ten-fifteen:p3293-when-the-subject-pronoun-is-animate-an-nnc-built",
      "canonicalPath": "cases.tenFifteen.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3290": [],
    "claim-p3293": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3290": "authorized",
    "claim-p3293": "authorized"
  }
};
export default Object.freeze(spec);
