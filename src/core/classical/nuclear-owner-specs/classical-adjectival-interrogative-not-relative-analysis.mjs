const spec = {
  "ownerId": "classical-adjectival-interrogative-not-relative-analysis",
  "prefix": "ClassicalAdjectivalInterrogativeNotRelativeAnalysis",
  "operationId": "classical.adjectival.interrogative.not.relative.analysis.execute",
  "inputContract": "complete-typed-classical-adjectival-interrogative-not-relative-analysis-source",
  "domain": "classical-adjectival-interrogative-not-relative-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4097",
    "claim-p4098",
    "claim-p4099"
  ],
  "coordinates": {
    "claim-p4097::p4097-as-stated-in-16-2-nahuatl-has-no-relative": {
      "assertionId": "classical-adjectival-interrogative-not-relative-analysis:p4097-as-stated-in-16-2-nahuatl-has-no-relative",
      "canonicalPath": "cases.interrogativeHead.canonicalResult"
    },
    "claim-p4098::p4098-there-are-however-sentences-in-which-the-interrogative-pronominal": {
      "assertionId": "classical-adjectival-interrogative-not-relative-analysis:p4098-there-are-however-sentences-in-which-the-interrogative-pronominal",
      "canonicalPath": "cases.interrogativeHead.headClauseType"
    },
    "claim-p4099::p4099-but-this-is-merely-a-translational-mirage": {
      "assertionId": "classical-adjectival-interrogative-not-relative-analysis:p4099-but-this-is-merely-a-translational-mirage",
      "canonicalPath": "contract.documentarySpellingAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4097": [],
    "claim-p4098": [],
    "claim-p4099": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4097": "authorized",
    "claim-p4098": "authorized",
    "claim-p4099": "authorized"
  }
};
export default Object.freeze(spec);
