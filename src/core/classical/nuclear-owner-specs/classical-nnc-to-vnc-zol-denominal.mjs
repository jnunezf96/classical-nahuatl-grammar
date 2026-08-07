const spec = {
  "ownerId": "classical-nnc-to-vnc-zol-denominal",
  "prefix": "ClassicalNncToVncZolDenominal",
  "operationId": "classical.nnc.to.vnc.zol.denominal.execute",
  "inputContract": "complete-typed-classical-nnc-to-vnc-zol-denominal-source",
  "domain": "classical-nnc-to-vnc-zol-denominal",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3152",
    "claim-p3153"
  ],
  "coordinates": {
    "claim-p3152::p3152-zol-i-hui-to-become-worn-out-and-frayed": {
      "assertionId": "classical-nnc-to-vnc-zol-denominal:p3152-zol-i-hui-to-become-worn-out-and-frayed",
      "canonicalPath": "cases.zolDenominal.rules.nnc-to-vnc/denominal"
    },
    "claim-p3153::p3153-tla-zol-o-a-to-causes-th-to-become": {
      "assertionId": "classical-nnc-to-vnc-zol-denominal:p3153-tla-zol-o-a-to-causes-th-to-become",
      "canonicalPath": "cases.zolDenominal.rules.affective/zol"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3152": [],
    "claim-p3153": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3152": "authorized",
    "claim-p3153": "authorized"
  }
};
export default Object.freeze(spec);
