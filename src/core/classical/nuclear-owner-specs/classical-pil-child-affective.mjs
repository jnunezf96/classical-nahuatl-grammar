const spec = {
  "ownerId": "classical-pil-child-affective",
  "prefix": "ClassicalPilChildAffective",
  "operationId": "classical.pil.child.affective.execute",
  "inputContract": "complete-typed-classical-pil-child-affective-source",
  "domain": "classical-pil-child-affective",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3182",
    "claim-p3183",
    "claim-p3184"
  ],
  "coordinates": {
    "claim-p3182::p3182-all-the-other-nncs-involving-pil-li-in-the": {
      "assertionId": "classical-pil-child-affective:p3182-all-the-other-nncs-involving-pil-li-in-the",
      "canonicalPath": "cases.pilChildAffective.rules.pil/child-affective"
    },
    "claim-p3183::p3183-the-affinity-stem-formation-is-used-on-both-the": {
      "assertionId": "classical-pil-child-affective:p3183-the-affinity-stem-formation-is-used-on-both-the",
      "canonicalPath": "cases.pilChildAffective.authorizationStatus"
    },
    "claim-p3184::p3184-this-formation-can-appear-in-the-vocative-collocation-with": {
      "assertionId": "classical-pil-child-affective:p3184-this-formation-can-appear-in-the-vocative-collocation-with",
      "canonicalPath": "cases.pilChildAffective.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3182": [],
    "claim-p3183": [],
    "claim-p3184": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3182": "authorized",
    "claim-p3183": "authorized",
    "claim-p3184": "authorized"
  }
};
export default Object.freeze(spec);
