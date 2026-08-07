const spec = {
  "ownerId": "classical-adverbial-unknown-eh-collocation-analysis",
  "prefix": "ClassicalAdverbialUnknownEhCollocationAnalysis",
  "operationId": "classical.adverbial.unknown.eh.collocation.analysis.execute",
  "inputContract": "complete-typed-classical-adverbial-unknown-eh-collocation-analysis-source",
  "domain": "classical-adverbial-unknown-eh-collocation-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4194",
    "claim-p4195",
    "claim-p4196",
    "claim-p4197"
  ],
  "coordinates": {
    "claim-p4194::p4194-there-are-two-adverbial-collocations-with-eh-that-are": {
      "assertionId": "classical-adverbial-unknown-eh-collocation-analysis:p4194-there-are-two-adverbial-collocations-with-eh-that-are",
      "canonicalPath": "cases.uncertainCollocation.canonicalResult"
    },
    "claim-p4195::p4195-the-length-also-prevents-the-ye-z-from-being": {
      "assertionId": "classical-adverbial-unknown-eh-collocation-analysis:p4195-the-length-also-prevents-the-ye-z-from-being",
      "canonicalPath": "cases.uncertainCollocation.lexicalStatus"
    },
    "claim-p4196::p4196-ye-ceh-is-also-spelled-e-ceh-or-in": {
      "assertionId": "classical-adverbial-unknown-eh-collocation-analysis:p4196-ye-ceh-is-also-spelled-e-ceh-or-in",
      "canonicalPath": "contract.uncertaintyAuthorizesGrammar"
    },
    "claim-p4197::p4197-see-52-4-3-a-for-a-contrast-of": {
      "assertionId": "classical-adverbial-unknown-eh-collocation-analysis:p4197-see-52-4-3-a-for-a-contrast-of",
      "canonicalPath": "cases.uncertainCollocation.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4194": [],
    "claim-p4195": [],
    "claim-p4196": [],
    "claim-p4197": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4194": "authorized",
    "claim-p4195": "authorized",
    "claim-p4196": "authorized",
    "claim-p4197": "authorized"
  }
};
export default Object.freeze(spec);
