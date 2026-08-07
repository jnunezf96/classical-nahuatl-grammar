const spec = {
  "ownerId": "classical-patientive-root-stock-ihui-source-uncertainty",
  "prefix": "ClassicalPatientiveRootStockIhuiSourceUncertainty",
  "operationId": "classical.patientive.root.stock.ihui.source.uncertainty.execute",
  "inputContract": "complete-typed-classical-patientive-root-stock-ihui-source-uncertainty-source",
  "domain": "classical-patientive-root-stock-ihui-source-uncertainty",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3817",
    "claim-p3818",
    "claim-p3819"
  ],
  "coordinates": {
    "claim-p3817::p3817-note-since-an-intransitive-destockal-verbstem-ending-in-i": {
      "assertionId": "classical-patientive-root-stock-ihui-source-uncertainty:p3817-note-since-an-intransitive-destockal-verbstem-ending-in-i",
      "canonicalPath": "cases.rootStockIhuiUncertainty.authorizationStatus"
    },
    "claim-p3818::p3818-no-such-possibility-exists-of-course-in-the-instance": {
      "assertionId": "classical-patientive-root-stock-ihui-source-uncertainty:p3818-no-such-possibility-exists-of-course-in-the-instance",
      "canonicalPath": "cases.rootStockIhuiUncertainty.licensed.allCanonical"
    },
    "claim-p3819::p3819-the-stock-of-certain-intransitive-destockal-verbs-is-used": {
      "assertionId": "classical-patientive-root-stock-ihui-source-uncertainty:p3819-the-stock-of-certain-intransitive-destockal-verbs-is-used",
      "canonicalPath": "cases.rootStockIhuiUncertainty.uncertain.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3817": [],
    "claim-p3818": [],
    "claim-p3819": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3817": "authorized",
    "claim-p3818": "authorized",
    "claim-p3819": "authorized"
  }
};
export default Object.freeze(spec);
