const spec = {
  "ownerId": "classical-deverbal-nnc-organic-possession-shell-condition",
  "prefix": "ClassicalDeverbalNncOrganicPossessionShellCondition",
  "operationId": "classical.deverbal.nnc.organic.possession.shell.condition.execute",
  "inputContract": "complete-typed-classical-deverbal-nnc-organic-possession-shell-condition-source",
  "domain": "classical-deverbal-nnc-organic-possession-shell-condition",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p4916"
  ],
  "coordinates": {
    "claim-p4916::p4916-nnc-to-indicate-an-organically-possessed-shell-i-cacallo": {
      "assertionId": "classical-deverbal-nnc-organic-possession-shell-condition:p4916-nnc-to-indicate-an-organically-possessed-shell-i-cacallo",
      "canonicalPath": "cases.organicPossession.second.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p4916": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4916": "authorized"
  }
};
export default Object.freeze(spec);
