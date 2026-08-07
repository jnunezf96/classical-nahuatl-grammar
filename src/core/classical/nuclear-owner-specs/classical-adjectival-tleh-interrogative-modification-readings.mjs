const spec = {
  "ownerId": "classical-adjectival-tleh-interrogative-modification-readings",
  "prefix": "ClassicalAdjectivalTlehInterrogativeModificationReadings",
  "operationId": "classical.adjectival.tleh.interrogative.modification.readings.execute",
  "inputContract": "complete-typed-classical-adjectival-tleh-interrogative-modification-readings-source",
  "domain": "classical-adjectival-tleh-interrogative-modification-readings",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4109",
    "claim-p4114",
    "claim-p4115",
    "claim-p4116",
    "claim-p4117"
  ],
  "coordinates": {
    "claim-p4109::p4109-tleh-is-translated-the-thing-s-and-the-adjunctor": {
      "assertionId": "classical-adjectival-tleh-interrogative-modification-readings:p4109-tleh-is-translated-the-thing-s-and-the-adjunctor",
      "canonicalPath": "cases.interrogativeHead.canonicalResult"
    },
    "claim-p4114::p4114-tleh-is-translated-something-or-anything-and-the-adjunctor": {
      "assertionId": "classical-adjectival-tleh-interrogative-modification-readings:p4114-tleh-is-translated-something-or-anything-and-the-adjunctor",
      "canonicalPath": "cases.interrogativeHead.headClauseType"
    },
    "claim-p4115::p4115-the-sequence-tleh-in-can-also-be-translated-whatever": {
      "assertionId": "classical-adjectival-tleh-interrogative-modification-readings:p4115-the-sequence-tleh-in-can-also-be-translated-whatever",
      "canonicalPath": "contract.documentarySpellingAuthority"
    },
    "claim-p4116::p4116-when-za-zo-modifies-tleh-the-sequence-za-zo": {
      "assertionId": "classical-adjectival-tleh-interrogative-modification-readings:p4116-when-za-zo-modifies-tleh-the-sequence-za-zo",
      "canonicalPath": "cases.interrogativeHead.canonicalResult"
    },
    "claim-p4117::p4117-when-za-zo-modifies-tleh": {
      "assertionId": "classical-adjectival-tleh-interrogative-modification-readings:p4117-when-za-zo-modifies-tleh",
      "canonicalPath": "cases.interrogativeHead.headClauseType"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4109": [],
    "claim-p4114": [],
    "claim-p4115": [],
    "claim-p4116": [],
    "claim-p4117": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4109": "authorized",
    "claim-p4114": "authorized",
    "claim-p4115": "authorized",
    "claim-p4116": "authorized",
    "claim-p4117": "authorized"
  }
};
export default Object.freeze(spec);
