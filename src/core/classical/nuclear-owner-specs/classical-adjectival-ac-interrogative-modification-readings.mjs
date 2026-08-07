const spec = {
  "ownerId": "classical-adjectival-ac-interrogative-modification-readings",
  "prefix": "ClassicalAdjectivalAcInterrogativeModificationReadings",
  "operationId": "classical.adjectival.ac.interrogative.modification.readings.execute",
  "inputContract": "complete-typed-classical-adjectival-ac-interrogative-modification-readings-source",
  "domain": "classical-adjectival-ac-interrogative-modification-readings",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4108",
    "claim-p4110",
    "claim-p4111",
    "claim-p4112",
    "claim-p4113"
  ],
  "coordinates": {
    "claim-p4108::p4108-a-c-is-translated-the-one-s-or-the": {
      "assertionId": "classical-adjectival-ac-interrogative-modification-readings:p4108-a-c-is-translated-the-one-s-or-the",
      "canonicalPath": "cases.interrogativeHead.canonicalResult"
    },
    "claim-p4110::p4110-a-c-is-translated-someone-or-anyone-and-the": {
      "assertionId": "classical-adjectival-ac-interrogative-modification-readings:p4110-a-c-is-translated-someone-or-anyone-and-the",
      "canonicalPath": "cases.interrogativeHead.headClauseType"
    },
    "claim-p4111::p4111-the-sequence-a-c-in-can-also-be-translated": {
      "assertionId": "classical-adjectival-ac-interrogative-modification-readings:p4111-the-sequence-a-c-in-can-also-be-translated",
      "canonicalPath": "contract.documentarySpellingAuthority"
    },
    "claim-p4112::p4112-when-za-zo-modifies-a-c-the-sequence-za": {
      "assertionId": "classical-adjectival-ac-interrogative-modification-readings:p4112-when-za-zo-modifies-a-c-the-sequence-za",
      "canonicalPath": "cases.interrogativeHead.canonicalResult"
    },
    "claim-p4113::p4113-when-za-zo-modifies-a-c": {
      "assertionId": "classical-adjectival-ac-interrogative-modification-readings:p4113-when-za-zo-modifies-a-c",
      "canonicalPath": "cases.interrogativeHead.headClauseType"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4108": [],
    "claim-p4110": [],
    "claim-p4111": [],
    "claim-p4112": [],
    "claim-p4113": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4108": "authorized",
    "claim-p4110": "authorized",
    "claim-p4111": "authorized",
    "claim-p4112": "authorized",
    "claim-p4113": "authorized"
  }
};
export default Object.freeze(spec);
