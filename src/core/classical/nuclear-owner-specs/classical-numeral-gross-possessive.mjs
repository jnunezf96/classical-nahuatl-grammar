const spec = {
  "ownerId": "classical-numeral-gross-possessive",
  "prefix": "ClassicalNumeralGrossPossessive",
  "operationId": "classical.numeral.gross.possessive.execute",
  "inputContract": "complete-typed-classical-numeral-gross-possessive-source",
  "domain": "classical-numeral-gross-possessive",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3294",
    "claim-p3295"
  ],
  "coordinates": {
    "claim-p3294::p3294-note-besides-appearing-in-an-absolutive-state-nnc-gross": {
      "assertionId": "classical-numeral-gross-possessive:p3294-note-besides-appearing-in-an-absolutive-state-nnc-gross",
      "canonicalPath": "cases.grossPossessive.rules.numeral/gross-possessive"
    },
    "claim-p3295::p3295-an-animate-possessor-pronoun-must-be-plural-and-the": {
      "assertionId": "classical-numeral-gross-possessive:p3295-an-animate-possessor-pronoun-must-be-plural-and-the",
      "canonicalPath": "cases.grossPossessive.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3294": [],
    "claim-p3295": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3294": "authorized",
    "claim-p3295": "authorized"
  }
};
export default Object.freeze(spec);
