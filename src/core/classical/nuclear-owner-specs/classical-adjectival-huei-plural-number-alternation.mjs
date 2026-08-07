const spec = {
  "ownerId": "classical-adjectival-huei-plural-number-alternation",
  "prefix": "ClassicalAdjectivalHueiPluralNumberAlternation",
  "operationId": "classical.adjectival.huei.plural.number.alternation.execute",
  "inputContract": "complete-typed-classical-adjectival-huei-plural-number-alternation-source",
  "domain": "classical-adjectival-huei-plural-number-alternation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p3866",
    "claim-p3867",
    "claim-p3868",
    "claim-p3869"
  ],
  "coordinates": {
    "claim-p3866::p3866-when-the-subject-pronoun-is-plural-its-number-position": {
      "assertionId": "classical-adjectival-huei-plural-number-alternation:p3866-when-the-subject-pronoun-is-plural-its-number-position",
      "canonicalPath": "sources.higherPronominal.authorizationStatus"
    },
    "claim-p3867::p3867-when-the-subject-pronoun-is-plural": {
      "assertionId": "classical-adjectival-huei-plural-number-alternation:p3867-when-the-subject-pronoun-is-plural",
      "canonicalPath": "cases.pronominalHead.canonicalResult"
    },
    "claim-p3868::p3868-the-distributive-varietal-stem-can-of-course-also-be": {
      "assertionId": "classical-adjectival-huei-plural-number-alternation:p3868-the-distributive-varietal-stem-can-of-course-also-be",
      "canonicalPath": "contract.sourceAndModificationOperationsRemainSeparate"
    },
    "claim-p3869::p3869-when-the-subject-pronoun-has-common-number": {
      "assertionId": "classical-adjectival-huei-plural-number-alternation:p3869-when-the-subject-pronoun-has-common-number",
      "canonicalPath": "sources.higherPronominal.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p3866": [],
    "claim-p3867": [],
    "claim-p3868": [],
    "claim-p3869": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3866": "authorized",
    "claim-p3867": "authorized",
    "claim-p3868": "authorized",
    "claim-p3869": "authorized"
  }
};
export default Object.freeze(spec);
