const spec = {
  "ownerId": "classical-deverbal-action-compound-source",
  "prefix": "ClassicalDeverbalActionCompoundSource",
  "operationId": "classical.deverbal.action.compound.source.execute",
  "inputContract": "complete-typed-classical-deverbal-action-compound-source-source",
  "domain": "classical-deverbal-action-compound-source",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-deverbal-patientive-runtime",
  "selections": [
    "claim-p3656",
    "claim-p3657"
  ],
  "coordinates": {
    "claim-p3656::p3656-further-remarks-may-be-made-concerning-deverbal-nounstems-formed": {
      "assertionId": "classical-deverbal-action-compound-source:p3656-further-remarks-may-be-made-concerning-deverbal-nounstems-formed",
      "canonicalPath": "cases.deverbalCompoundSource.authorizationStatus"
    },
    "claim-p3657::p3657-an-active-action-nounstem-can-be-derived-from-a": {
      "assertionId": "classical-deverbal-action-compound-source:p3657-an-active-action-nounstem-can-be-derived-from-a",
      "canonicalPath": "cases.deverbalCompoundSource.canonicalResult"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionValidatorName": "isClassicalNahuatlDeverbalPatientiveValidationFrame",
  "executionArgsBySelection": {
    "claim-p3656": [],
    "claim-p3657": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3656": "authorized",
    "claim-p3657": "authorized"
  }
};
export default Object.freeze(spec);
