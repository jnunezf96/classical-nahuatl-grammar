const spec = {
  "ownerId": "classical-numeral-classifier-selection-evidence-analysis",
  "prefix": "ClassicalNumeralClassifierSelectionEvidenceAnalysis",
  "operationId": "classical.numeral.classifier.selection.evidence.analysis.execute",
  "inputContract": "complete-typed-classical-numeral-classifier-selection-evidence-analysis-source",
  "domain": "classical-numeral-classifier-selection-evidence-analysis",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-cardinal-numeral-runtime",
  "selections": [
    "claim-p3330",
    "claim-p3331",
    "claim-p3332"
  ],
  "coordinates": {
    "claim-p3330::p3330-remark-such-elements-as-te-tl-olo-tl-etc": {
      "assertionId": "classical-numeral-classifier-selection-evidence-analysis:p3330-remark-such-elements-as-te-tl-olo-tl-etc",
      "canonicalPath": "cases.classifierSelection.authorizationStatus"
    },
    "claim-p3331::p3331-their-usage-in-nahuatl-is-not-extremely-rigid-and": {
      "assertionId": "classical-numeral-classifier-selection-evidence-analysis:p3331-their-usage-in-nahuatl-is-not-extremely-rigid-and",
      "canonicalPath": "contract.evidenceRoles.classifierSelectionVariation"
    },
    "claim-p3332::p3332-o-me-me-tztli-o-ntetl-me-tztli-they": {
      "assertionId": "classical-numeral-classifier-selection-evidence-analysis:p3332-o-me-me-tztli-o-ntetl-me-tztli-they",
      "canonicalPath": "contract.storedExampleAuthority"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCardinalNumeralValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCardinalNumeralValidationFrame",
  "executionArgsBySelection": {
    "claim-p3330": [],
    "claim-p3331": [],
    "claim-p3332": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3330": "authorized",
    "claim-p3331": "authorized",
    "claim-p3332": "authorized"
  }
};
export default Object.freeze(spec);
