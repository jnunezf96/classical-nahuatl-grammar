const spec = {
  "ownerId": "classical-numeral-basic-set-evidence-analysis",
  "prefix": "ClassicalNumeralBasicSetEvidenceAnalysis",
  "operationId": "classical.numeral.basic.set.evidence.analysis.execute",
  "inputContract": "complete-typed-classical-numeral-basic-set-evidence-analysis-source",
  "domain": "classical-numeral-basic-set-evidence-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3265",
    "claim-p3266",
    "claim-p3267"
  ],
  "coordinates": {
    "claim-p3265::p3265-nncs-built-on-the-basic-set-of-numeral-stems": {
      "assertionId": "classical-numeral-basic-set-evidence-analysis:p3265-nncs-built-on-the-basic-set-of-numeral-stems",
      "canonicalPath": "cases.basicSet.authorizationStatus"
    },
    "claim-p3266::p3266-the-basic-set-consists-of-only-eleven-stems-and": {
      "assertionId": "classical-numeral-basic-set-evidence-analysis:p3266-the-basic-set-consists-of-only-eleven-stems-and",
      "canonicalPath": "contract.evidenceRoles.basicSetInventory"
    },
    "claim-p3267::p3267-being-based-on-the-twenty-digits-fingers-and-toes": {
      "assertionId": "classical-numeral-basic-set-evidence-analysis:p3267-being-based-on-the-twenty-digits-fingers-and-toes",
      "canonicalPath": "contract.storedExampleAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3265": [],
    "claim-p3266": [],
    "claim-p3267": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3265": "authorized",
    "claim-p3266": "authorized",
    "claim-p3267": "authorized"
  }
};
export default Object.freeze(spec);
