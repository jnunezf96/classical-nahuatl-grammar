const spec = {
  "ownerId": "classical-patientive-root-stock-hua",
  "prefix": "ClassicalPatientiveRootStockHua",
  "operationId": "classical.patientive.root.stock.hua.execute",
  "inputContract": "complete-typed-classical-patientive-root-stock-hua-source",
  "domain": "classical-patientive-root-stock-hua",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3809",
    "claim-p3810",
    "claim-p3811",
    "claim-p3812",
    "claim-p3813",
    "claim-p3814",
    "claim-p3815",
    "claim-p3816"
  ],
  "coordinates": {
    "claim-p3809::p3809-the-long-vowel-that-serves-as-the-stock-formative": {
      "assertionId": "classical-patientive-root-stock-hua:p3809-the-long-vowel-that-serves-as-the-stock-formative",
      "canonicalPath": "cases.rootStockHua.authorizationStatus"
    },
    "claim-p3810::p3810-intransitive-destockal-hua-verbstems-that-have-e-as-the": {
      "assertionId": "classical-patientive-root-stock-hua:p3810-intransitive-destockal-hua-verbstems-that-have-e-as-the",
      "canonicalPath": "cases.rootStockHua.canonicalResult"
    },
    "claim-p3811::p3811-as-mentioned-in-24-6-2-the-role-of": {
      "assertionId": "classical-patientive-root-stock-hua:p3811-as-mentioned-in-24-6-2-the-role-of",
      "canonicalPath": "cases.rootStockHua.gcdSatisfied"
    },
    "claim-p3812::p3812-a-destockal-hua-verbstem-may-occasionally-form-a-patientive": {
      "assertionId": "classical-patientive-root-stock-hua:p3812-a-destockal-hua-verbstem-may-occasionally-form-a-patientive",
      "canonicalPath": "cases.rootStockHua.lcmComplete"
    },
    "claim-p3813::p3813-a-destockal-hua-verbstem-can-also-form-a-patientive": {
      "assertionId": "classical-patientive-root-stock-hua:p3813-a-destockal-hua-verbstem-can-also-form-a-patientive",
      "canonicalPath": "cases.rootStockHua.rootStockKind"
    },
    "claim-p3814::p3814-intransitive-destockal-verbstems-of-the-i-hui-a-hui": {
      "assertionId": "classical-patientive-root-stock-hua:p3814-intransitive-destockal-verbstems-of-the-i-hui-a-hui",
      "canonicalPath": "cases.rootStockHua.authorizationStatus"
    },
    "claim-p3815::p3815-both-the-intransitive-i-hui-a-hui-destockal-verbstems": {
      "assertionId": "classical-patientive-root-stock-hua:p3815-both-the-intransitive-i-hui-a-hui-destockal-verbstems",
      "canonicalPath": "cases.rootStockHua.canonicalResult"
    },
    "claim-p3816::p3816-since-deverbal-nounstems-are-formed-on-verbcores-see-37": {
      "assertionId": "classical-patientive-root-stock-hua:p3816-since-deverbal-nounstems-are-formed-on-verbcores-see-37",
      "canonicalPath": "cases.rootStockHua.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3809": [],
    "claim-p3810": [],
    "claim-p3811": [],
    "claim-p3812": [],
    "claim-p3813": [],
    "claim-p3814": [],
    "claim-p3815": [],
    "claim-p3816": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3809": "authorized",
    "claim-p3810": "authorized",
    "claim-p3811": "authorized",
    "claim-p3812": "authorized",
    "claim-p3813": "authorized",
    "claim-p3814": "authorized",
    "claim-p3815": "authorized",
    "claim-p3816": "authorized"
  }
};
export default Object.freeze(spec);
