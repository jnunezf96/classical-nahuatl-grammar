const spec = {
  "ownerId": "classical-lo-nonactive-domain",
  "prefix": "ClassicalLoNonactiveDomain",
  "operationId": "classical.lo.nonactive.domain.execute",
  "inputContract": "complete-typed-classical-lo-nonactive-domain-source",
  "domain": "classical-lo-nonactive-domain",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p1979",
    "claim-p1980",
    "claim-p1981",
    "claim-p1982",
    "claim-p1983"
  ],
  "coordinates": {
    "claim-p1979::p1979-it-associates-mainly-with-transitive-verbstems-ending-in-a": {
      "assertionId": "classical-lo-nonactive-domain:p1979-it-associates-mainly-with-transitive-verbstems-ending-in-a",
      "canonicalPath": "nonactive.records.lo.suffixFamily"
    },
    "claim-p1980::p1980-the-lo-suffix-is-the-most-frequent-nonactive-formative": {
      "assertionId": "classical-lo-nonactive-domain:p1980-the-lo-suffix-is-the-most-frequent-nonactive-formative",
      "canonicalPath": "nonactive.records.lo.formationCore"
    },
    "claim-p1981::p1981-among-the-intransitive-stems-using-the-lo-suffix-are": {
      "assertionId": "classical-lo-nonactive-domain:p1981-among-the-intransitive-stems-using-the-lo-suffix-are",
      "canonicalPath": "nonactive.records.lo.targetClass"
    },
    "claim-p1982::p1982-except-for-class-d-verbs-the-nonactive-suffix-lo": {
      "assertionId": "classical-lo-nonactive-domain:p1982-except-for-class-d-verbs-the-nonactive-suffix-lo",
      "canonicalPath": "nonactive.records.lo.suffixFamily"
    },
    "claim-p1983::p1983-in-the-following-presentation-the-citation-form-of-the": {
      "assertionId": "classical-lo-nonactive-domain:p1983-in-the-following-presentation-the-citation-form-of-the",
      "canonicalPath": "nonactive.records.lo.formationCore"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p1979": [],
    "claim-p1980": [],
    "claim-p1981": [],
    "claim-p1982": [],
    "claim-p1983": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1979": "authorized",
    "claim-p1980": "authorized",
    "claim-p1981": "authorized",
    "claim-p1982": "authorized",
    "claim-p1983": "authorized"
  }
};
export default Object.freeze(spec);
