const spec = {
  "ownerId": "classical-adjectival-tlaocoya-class-b-only",
  "prefix": "ClassicalAdjectivalTlaocoyaClassBOnly",
  "operationId": "classical.adjectival.tlaocoya.class.b.only.execute",
  "inputContract": "complete-typed-classical-adjectival-tlaocoya-class-b-only-source",
  "domain": "classical-adjectival-tlaocoya-class-b-only",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3932"
  ],
  "coordinates": {
    "claim-p3932::p3932-the-verbstem-tlao-co-ya-to-be-sad-uses": {
      "assertionId": "classical-adjectival-tlaocoya-class-b-only:p3932-the-verbstem-tlao-co-ya-to-be-sad-uses",
      "canonicalPath": "sources.patientive.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3932": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3932": "authorized"
  }
};
export default Object.freeze(spec);
