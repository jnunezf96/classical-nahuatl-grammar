const spec = {
  "ownerId": "classical-patientive-root-stock-ni",
  "prefix": "ClassicalPatientiveRootStockNi",
  "operationId": "classical.patientive.root.stock.ni.execute",
  "inputContract": "complete-typed-classical-patientive-root-stock-ni-source",
  "domain": "classical-patientive-root-stock-ni",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3801",
    "claim-p3802",
    "claim-p3803",
    "claim-p3804",
    "claim-p3805",
    "claim-p3806",
    "claim-p3807",
    "claim-p3808"
  ],
  "coordinates": {
    "claim-p3801::p3801-a-destockal-verb-may-derive-a-patienti-ve-nounstem": {
      "assertionId": "classical-patientive-root-stock-ni:p3801-a-destockal-verb-may-derive-a-patienti-ve-nounstem",
      "canonicalPath": "cases.rootStockNi.authorizationStatus"
    },
    "claim-p3802::p3802-intransitive-destockal-verbstems-of-the-ni-kind-see-24": {
      "assertionId": "classical-patientive-root-stock-ni:p3802-intransitive-destockal-verbstems-of-the-ni-kind-see-24",
      "canonicalPath": "cases.rootStockNi.canonicalResult"
    },
    "claim-p3803::p3803-the-long-vowel-that-serves-as-the-stock-formative": {
      "assertionId": "classical-patientive-root-stock-ni:p3803-the-long-vowel-that-serves-as-the-stock-formative",
      "canonicalPath": "cases.rootStockNi.gcdSatisfied"
    },
    "claim-p3804::p3804-the-irregular-destockal-verbstems-in-which-the-root-vowel": {
      "assertionId": "classical-patientive-root-stock-ni:p3804-the-irregular-destockal-verbstems-in-which-the-root-vowel",
      "canonicalPath": "cases.rootStockNi.lcmComplete"
    },
    "claim-p3805::p3805-it-is-possible-that-a-similar-derivation-using-the": {
      "assertionId": "classical-patientive-root-stock-ni:p3805-it-is-possible-that-a-similar-derivation-using-the",
      "canonicalPath": "cases.rootStockNi.rootStockKind"
    },
    "claim-p3806::p3806-the-frequentative-intransitive-destockal-verbstem-can-also-generate-a": {
      "assertionId": "classical-patientive-root-stock-ni:p3806-the-frequentative-intransitive-destockal-verbstem-can-also-generate-a",
      "canonicalPath": "cases.rootStockNi.authorizationStatus"
    },
    "claim-p3807::p3807-the-derived-frequentative-intransitive-destockal-verbstem-in-which-ca": {
      "assertionId": "classical-patientive-root-stock-ni:p3807-the-derived-frequentative-intransitive-destockal-verbstem-in-which-ca",
      "canonicalPath": "cases.rootStockNi.canonicalResult"
    },
    "claim-p3808::p3808-occasionally-an-compound-intransitive-destockal-verbstem-formed-with-a": {
      "assertionId": "classical-patientive-root-stock-ni:p3808-occasionally-an-compound-intransitive-destockal-verbstem-formed-with-a",
      "canonicalPath": "cases.rootStockNi.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3801": [],
    "claim-p3802": [],
    "claim-p3803": [],
    "claim-p3804": [],
    "claim-p3805": [],
    "claim-p3806": [],
    "claim-p3807": [],
    "claim-p3808": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3801": "authorized",
    "claim-p3802": "authorized",
    "claim-p3803": "authorized",
    "claim-p3804": "authorized",
    "claim-p3805": "authorized",
    "claim-p3806": "authorized",
    "claim-p3807": "authorized",
    "claim-p3808": "authorized"
  }
};
export default Object.freeze(spec);
