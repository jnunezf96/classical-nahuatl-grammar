const spec = {
  "ownerId": "classical-ac-pronominal-plural-cooperation",
  "prefix": "ClassicalAcPronominalPluralCooperation",
  "operationId": "classical.ac.pronominal.plural.cooperation.execute",
  "inputContract": "complete-typed-classical-ac-pronominal-plural-cooperation-source",
  "domain": "classical-ac-pronominal-plural-cooperation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-supplementation-runtime",
  "selections": [
    "claim-p1916",
    "claim-p1917",
    "claim-p1918",
    "claim-p1919"
  ],
  "coordinates": {
    "claim-p1916::p1916-these-three-questions-could-have-been-expressed-by-a": {
      "assertionId": "classical-ac-pronominal-plural-cooperation:p1916-these-three-questions-could-have-been-expressed-by-a",
      "canonicalPath": "acCooperation.route"
    },
    "claim-p1917::p1917-the-supplementary-subject-a-c-does-not-have-to": {
      "assertionId": "classical-ac-pronominal-plural-cooperation:p1917-the-supplementary-subject-a-c-does-not-have-to",
      "canonicalPath": "acPlural.principalClause.subject.category"
    },
    "claim-p1918::p1918-the-supplementary-constructions-with-a-c-take-part-in": {
      "assertionId": "classical-ac-pronominal-plural-cooperation:p1918-the-supplementary-constructions-with-a-c-take-part-in",
      "canonicalPath": "acPlural.supplementClause.subject.category"
    },
    "claim-p1919::p1919-there-is-a-variant-formation-that-has-a-vnc": {
      "assertionId": "classical-ac-pronominal-plural-cooperation:p1919-there-is-a-variant-formation-that-has-a-vnc",
      "canonicalPath": "acCooperation.zeroRootPrincipal"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlSupplementationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlSupplementationValidationFrame",
  "executionArgsBySelection": {
    "claim-p1916": [],
    "claim-p1917": [],
    "claim-p1918": [],
    "claim-p1919": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p1916": "authorized",
    "claim-p1917": "authorized",
    "claim-p1918": "authorized",
    "claim-p1919": "authorized"
  },
  "nonExecutableObservations": {
    "claim-p1920::p1920-also-spelled-aya-queh": {
      "assertionId": "classical-ac-pronominal-plural-cooperation:p1920-also-spelled-aya-queh",
      "disposition": "documentary-claim-runtime-observation-unverified",
      "reason": "The alternative spelling ayāqueh is source evidence in Canvas §19.3 (line 6406); the agreement-exception kind does not observe spelling.",
      "retiredCanonicalPath": "acPlural.referenceFrame.agreementException.kind",
      "executionCredit": false,
      "grammarAuthority": false
    }
  }
};
export default Object.freeze(spec);
