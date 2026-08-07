const spec = {
  "ownerId": "classical-adverbial-carochi-analysis-conflict",
  "prefix": "ClassicalAdverbialCarochiAnalysisConflict",
  "operationId": "classical.adverbial.carochi.analysis.conflict.execute",
  "inputContract": "complete-typed-classical-adverbial-carochi-analysis-conflict-source",
  "domain": "classical-adverbial-carochi-analysis-conflict",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4217",
    "claim-p4218",
    "claim-p4219",
    "claim-p4220"
  ],
  "coordinates": {
    "claim-p4217::p4217-for-one-thing-he-shows-a-final-glottal-stop": {
      "assertionId": "classical-adverbial-carochi-analysis-conflict:p4217-for-one-thing-he-shows-a-final-glottal-stop",
      "canonicalPath": "cases.possessivePatientive.canonicalResult"
    },
    "claim-p4218::p4218-if-correct": {
      "assertionId": "classical-adverbial-carochi-analysis-conflict:p4218-if-correct",
      "canonicalPath": "contract.uncertaintyAuthorizesGrammar"
    },
    "claim-p4219::p4219-for-another-thing-he-says-that-the-honorific-forms": {
      "assertionId": "classical-adverbial-carochi-analysis-conflict:p4219-for-another-thing-he-says-that-the-honorific-forms",
      "canonicalPath": "contract.translationAuthority"
    },
    "claim-p4220::p4220-this-use-of-tzinco-and-not-tzin-as-the": {
      "assertionId": "classical-adverbial-carochi-analysis-conflict:p4220-this-use-of-tzinco-and-not-tzin-as-the",
      "canonicalPath": "cases.possessivePatientive.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4217": [],
    "claim-p4218": [],
    "claim-p4219": [],
    "claim-p4220": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4217": "authorized",
    "claim-p4218": "authorized",
    "claim-p4219": "authorized",
    "claim-p4220": "authorized"
  }
};
export default Object.freeze(spec);
