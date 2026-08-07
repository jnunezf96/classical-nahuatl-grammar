const spec = {
  "ownerId": "classical-numeral-gross-possessive-spelling-analysis",
  "prefix": "ClassicalNumeralGrossPossessiveSpellingAnalysis",
  "operationId": "classical.numeral.gross.possessive.spelling.analysis.execute",
  "inputContract": "complete-typed-classical-numeral-gross-possessive-spelling-analysis-source",
  "domain": "classical-numeral-gross-possessive-spelling-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3296"
  ],
  "coordinates": {
    "claim-p3296::p3296-when-the-possessor-is-nonanimate-some-write-the-subject": {
      "assertionId": "classical-numeral-gross-possessive-spelling-analysis:p3296-when-the-possessor-is-nonanimate-some-write-the-subject",
      "canonicalPath": "cases.grossPossessive.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3296": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3296": "authorized"
  }
};
export default Object.freeze(spec);
