const spec = {
  "ownerId": "classical-possessive-stem-suppletion",
  "prefix": "ClassicalPossessiveStemSuppletion",
  "operationId": "classical.possessive.stem.suppletion.execute",
  "inputContract": "complete-typed-classical-possessive-stem-suppletion-source",
  "domain": "classical-possessive-stem-suppletion",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-higher-pronominal-nnc-runtime",
  "selections": [
    "claim-p1597",
    "claim-p1598",
    "claim-p1599",
    "claim-p1600",
    "claim-p1601",
    "claim-p1602"
  ],
  "coordinates": {
    "claim-p1597::p1597-certain-nouns-use-a-suppletive-stem-to-form-a": {
      "assertionId": "classical-possessive-stem-suppletion:p1597-certain-nouns-use-a-suppletive-stem-to-form-a",
      "canonicalPath": "stemOperationRecord.operation"
    },
    "claim-p1598::p1598-pil-li-pil-lo-tl-nobleman-the-stem-pil": {
      "assertionId": "classical-possessive-stem-suppletion:p1598-pil-li-pil-lo-tl-nobleman-the-stem-pil",
      "canonicalPath": "stemOperationRecord.targetStem"
    },
    "claim-p1599::p1599-te-uc-tli-te-uc-yo-lord-the-stem": {
      "assertionId": "classical-possessive-stem-suppletion:p1599-te-uc-tli-te-uc-yo-lord-the-stem",
      "canonicalPath": "stemOperationRecord.targetStem"
    },
    "claim-p1600::p1600-there-is-also-a-special-possessive-state-nnc-tote": {
      "assertionId": "classical-possessive-stem-suppletion:p1600-there-is-also-a-special-possessive-state-nnc-tote",
      "canonicalPath": "stemOperationRecord.targetStem"
    },
    "claim-p1601::p1601-it-is-used-as-a-title-and-a-personal": {
      "assertionId": "classical-possessive-stem-suppletion:p1601-it-is-used-as-a-title-and-a-personal",
      "canonicalPath": "stemOperationRecord.targetStemDerivation"
    },
    "claim-p1602::p1602-at-least-however-his-statement-proves-that-there-was": {
      "assertionId": "classical-possessive-stem-suppletion:p1602-at-least-however-his-statement-proves-that-there-was",
      "canonicalPath": "higherFrame.operationFrame.prohibitedDerivationRecords.0.rejectedOutput"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlHigherPronominalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p1597": [
      "l15-suppletive"
    ],
    "claim-p1598": [
      "l15-suppletive"
    ],
    "claim-p1599": [
      "l15-yo-matrix"
    ],
    "claim-p1600": [
      "l15-totec"
    ],
    "claim-p1601": [
      "l15-totec"
    ],
    "claim-p1602": [
      "l15-totec"
    ]
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1597": "authorized",
    "claim-p1598": "authorized",
    "claim-p1599": "authorized",
    "claim-p1600": "authorized",
    "claim-p1601": "authorized",
    "claim-p1602": "authorized"
  }
};
export default Object.freeze(spec);
