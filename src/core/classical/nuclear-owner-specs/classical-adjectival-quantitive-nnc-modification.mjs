const spec = {
  "ownerId": "classical-adjectival-quantitive-nnc-modification",
  "prefix": "ClassicalAdjectivalQuantitiveNncModification",
  "operationId": "classical.adjectival.quantitive.nnc.modification.execute",
  "inputContract": "complete-typed-classical-adjectival-quantitive-nnc-modification-source",
  "domain": "classical-adjectival-quantitive-nnc-modification",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4068",
    "claim-p4069",
    "claim-p4070",
    "claim-p4071",
    "claim-p4072"
  ],
  "coordinates": {
    "claim-p4068::p4068-a-quantitive-pronominal-nnc": {
      "assertionId": "classical-adjectival-quantitive-nnc-modification:p4068-a-quantitive-pronominal-nnc",
      "canonicalPath": "cases.quantitiveHead.canonicalResult"
    },
    "claim-p4069::p4069-when-a-structure-of-modification-serves-as-a-supplement": {
      "assertionId": "classical-adjectival-quantitive-nnc-modification:p4069-when-a-structure-of-modification-serves-as-a-supplement",
      "canonicalPath": "cases.quantitiveHead.exceptionProfile"
    },
    "claim-p4070::p4070-in-relation-to-this-when-a-structure-of-modification": {
      "assertionId": "classical-adjectival-quantitive-nnc-modification:p4070-in-relation-to-this-when-a-structure-of-modification",
      "canonicalPath": "cases.quantitiveHead.headClauseType"
    },
    "claim-p4071::p4071-english-translation-ignores-the-internal-relationships-of-the-nahuatl": {
      "assertionId": "classical-adjectival-quantitive-nnc-modification:p4071-english-translation-ignores-the-internal-relationships-of-the-nahuatl",
      "canonicalPath": "cases.quantitiveHead.canonicalResult"
    },
    "claim-p4072::p4072-the-quantitive-pronominal-nnc-may-be-the-head-in": {
      "assertionId": "classical-adjectival-quantitive-nnc-modification:p4072-the-quantitive-pronominal-nnc-may-be-the-head-in",
      "canonicalPath": "cases.quantitiveHead.exceptionProfile"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4068": [],
    "claim-p4069": [],
    "claim-p4070": [],
    "claim-p4071": [],
    "claim-p4072": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4068": "authorized",
    "claim-p4069": "authorized",
    "claim-p4070": "authorized",
    "claim-p4071": "authorized",
    "claim-p4072": "authorized"
  }
};
export default Object.freeze(spec);
