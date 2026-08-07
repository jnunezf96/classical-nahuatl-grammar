const spec = {
  "ownerId": "classical-o-nonactive-domain",
  "prefix": "ClassicalONonactiveDomain",
  "operationId": "classical.o.nonactive.domain.execute",
  "inputContract": "complete-typed-classical-o-nonactive-domain-source",
  "domain": "classical-o-nonactive-domain",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nonactive-voice-object-runtime",
  "selections": [
    "claim-p2011",
    "claim-p2012",
    "claim-p2013",
    "claim-p2014",
    "claim-p2015"
  ],
  "coordinates": {
    "claim-p2011::p2011-normally-the-o-nonactive-suffix-is-used-only-when": {
      "assertionId": "classical-o-nonactive-domain:p2011-normally-the-o-nonactive-suffix-is-used-only-when",
      "canonicalPath": "nonactive.records.o.suffixFamily"
    },
    "claim-p2012::p2012-the-final-vowel-of-the-source-stem-is-deleted": {
      "assertionId": "classical-o-nonactive-domain:p2012-the-final-vowel-of-the-source-stem-is-deleted",
      "canonicalPath": "nonactive.records.o.formationCore"
    },
    "claim-p2013::p2013-in-many-instances-this-truncated-stem-is-identical-to": {
      "assertionId": "classical-o-nonactive-domain:p2013-in-many-instances-this-truncated-stem-is-identical-to",
      "canonicalPath": "nonactive.records.o.nonactiveStem"
    },
    "claim-p2014::p2014-after-the-deletion-of-the-final-vowel-s-changes": {
      "assertionId": "classical-o-nonactive-domain:p2014-after-the-deletion-of-the-final-vowel-s-changes",
      "canonicalPath": "nonactive.records.o.suffixFamily"
    },
    "claim-p2015::p2015-stems-ending-in-na-ni-and-sa-may-have": {
      "assertionId": "classical-o-nonactive-domain:p2015-stems-ending-in-na-ni-and-sa-may-have",
      "canonicalPath": "nonactive.records.o.formationCore"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNonactiveVoiceObjectValidationFrame",
  "executionArgsBySelection": {
    "claim-p2011": [],
    "claim-p2012": [],
    "claim-p2013": [],
    "claim-p2014": [],
    "claim-p2015": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2011": "authorized",
    "claim-p2012": "authorized",
    "claim-p2013": "authorized",
    "claim-p2014": "authorized",
    "claim-p2015": "authorized"
  }
};
export default Object.freeze(spec);
