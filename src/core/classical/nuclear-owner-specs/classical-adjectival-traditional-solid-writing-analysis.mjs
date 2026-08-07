const spec = {
  "ownerId": "classical-adjectival-traditional-solid-writing-analysis",
  "prefix": "ClassicalAdjectivalTraditionalSolidWritingAnalysis",
  "operationId": "classical.adjectival.traditional.solid.writing.analysis.execute",
  "inputContract": "complete-typed-classical-adjectival-traditional-solid-writing-analysis-source",
  "domain": "classical-adjectival-traditional-solid-writing-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4101",
    "claim-p4102",
    "claim-p4103"
  ],
  "coordinates": {
    "claim-p4101::p4101-traditionally-the-sequences-a-c-in-and-tleh-in": {
      "assertionId": "classical-adjectival-traditional-solid-writing-analysis:p4101-traditionally-the-sequences-a-c-in-and-tleh-in",
      "canonicalPath": "contract.documentarySpellingAuthority"
    },
    "claim-p4102::p4102-remember-that-tleh-in-is-normally-pronounced-tie-in": {
      "assertionId": "classical-adjectival-traditional-solid-writing-analysis:p4102-remember-that-tleh-in-is-normally-pronounced-tie-in",
      "canonicalPath": "contract.surfaceStringAuthority"
    },
    "claim-p4103::p4103-changes-to-y-see-2-13-1-and-16": {
      "assertionId": "classical-adjectival-traditional-solid-writing-analysis:p4103-changes-to-y-see-2-13-1-and-16",
      "canonicalPath": "cases.interrogativeHead.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4101": [],
    "claim-p4102": [],
    "claim-p4103": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4101": "authorized",
    "claim-p4102": "authorized",
    "claim-p4103": "authorized"
  }
};
export default Object.freeze(spec);
