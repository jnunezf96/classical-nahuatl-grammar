const spec = {
  "ownerId": "classical-pil-child-simple",
  "prefix": "ClassicalPilChildSimple",
  "operationId": "classical.pil.child.simple.execute",
  "inputContract": "complete-typed-classical-pil-child-simple-source",
  "domain": "classical-pil-child-simple",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-affective-nnc-runtime",
  "selections": [
    "claim-p3174",
    "claim-p3175",
    "claim-p3177",
    "claim-p3178",
    "claim-p3179",
    "claim-p3180",
    "claim-p3181"
  ],
  "coordinates": {
    "claim-p3174::p3174-the-simple-stem-of-pil-li-is-used-primarily": {
      "assertionId": "classical-pil-child-simple:p3174-the-simple-stem-of-pil-li-is-used-primarily",
      "canonicalPath": "cases.pilChildSimple.rules.pil/child-simple"
    },
    "claim-p3175::p3175-such-a-plural-subject-nnc-can-be-involved-in": {
      "assertionId": "classical-pil-child-simple:p3175-such-a-plural-subject-nnc-can-be-involved-in",
      "canonicalPath": "cases.pilChildSimple.authorizationStatus"
    },
    "claim-p3177::p3177-in-the-resultant-nnc-the-subject-pronoun-s-plural": {
      "assertionId": "classical-pil-child-simple:p3177-in-the-resultant-nnc-the-subject-pronoun-s-plural",
      "canonicalPath": "cases.pilChildSimple.gcdSatisfied"
    },
    "claim-p3178::p3178-a-distributive-varietal-formation-of-this-irregular-affective-nnc": {
      "assertionId": "classical-pil-child-simple:p3178-a-distributive-varietal-formation-of-this-irregular-affective-nnc",
      "canonicalPath": "cases.pilChildSimple.lcmComplete"
    },
    "claim-p3179::p3179-the-affinity-stem-of-pil-li-is-also-used": {
      "assertionId": "classical-pil-child-simple:p3179-the-affinity-stem-of-pil-li-is-also-used",
      "canonicalPath": "cases.pilChildSimple.rules.pil/child-simple"
    },
    "claim-p3180::p3180-the-nncs-are-ambiguous-see-subsection-2-below": {
      "assertionId": "classical-pil-child-simple:p3180-the-nncs-are-ambiguous-see-subsection-2-below",
      "canonicalPath": "cases.pilChildSimple.authorizationStatus"
    },
    "claim-p3181::p3181-a-gender-specific-stem-can-be-used": {
      "assertionId": "classical-pil-child-simple:p3181-a-gender-specific-stem-can-be-used",
      "canonicalPath": "cases.pilChildSimple.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAffectiveNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAffectiveNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3174": [],
    "claim-p3175": [],
    "claim-p3177": [],
    "claim-p3178": [],
    "claim-p3179": [],
    "claim-p3180": [],
    "claim-p3181": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3174": "authorized",
    "claim-p3175": "authorized",
    "claim-p3177": "authorized",
    "claim-p3178": "authorized",
    "claim-p3179": "authorized",
    "claim-p3180": "authorized",
    "claim-p3181": "authorized"
  }
};
export default Object.freeze(spec);
