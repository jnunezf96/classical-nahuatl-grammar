const spec = {
  "ownerId": "classical-adverbial-external-incorporated-scope",
  "prefix": "ClassicalAdverbialExternalIncorporatedScope",
  "operationId": "classical.adverbial.external.incorporated.scope.execute",
  "inputContract": "complete-typed-classical-adverbial-external-incorporated-scope-source",
  "domain": "classical-adverbial-external-incorporated-scope",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adverbial-nuclear-runtime",
  "selections": [
    "claim-p4226",
    "claim-p4227"
  ],
  "coordinates": {
    "claim-p4226::p4226-when-an-adverbially-functioning-nnc-stands-outside-the-vnc": {
      "assertionId": "classical-adverbial-external-incorporated-scope:p4226-when-an-adverbially-functioning-nnc-stands-outside-the-vnc",
      "canonicalPath": "cases.incorporationPani.canonicalResult"
    },
    "claim-p4227::p4227-when-an-adverbially-functioning-nnc-stands-outside-the-vnc": {
      "assertionId": "classical-adverbial-external-incorporated-scope:p4227-when-an-adverbially-functioning-nnc-stands-outside-the-vnc",
      "canonicalPath": "cases.incorporationPani.scope"
    }
  },
  "executionFunctionName": "buildClassicalAdverbialNuclearValidationFrame",
  "executionValidatorName": "isClassicalAdverbialNuclearValidationFrame",
  "executionArgsBySelection": {
    "claim-p4226": [],
    "claim-p4227": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4226": "authorized",
    "claim-p4227": "authorized"
  }
};
export default Object.freeze(spec);
