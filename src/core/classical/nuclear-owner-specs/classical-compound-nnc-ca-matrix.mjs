const spec = {
  "ownerId": "classical-compound-nnc-ca-matrix",
  "prefix": "ClassicalCompoundNncCaMatrix",
  "operationId": "classical.compound.nnc.ca.matrix.execute",
  "inputContract": "complete-typed-classical-compound-nnc-ca-matrix-source",
  "domain": "classical-compound-nnc-ca-matrix",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-nnc-runtime",
  "selections": [
    "claim-p3104",
    "claim-p3105",
    "claim-p3106",
    "claim-p3107",
    "claim-p3108",
    "claim-p3109",
    "claim-p3110"
  ],
  "coordinates": {
    "claim-p3104::p3104-there-are-two-nounstems-of-this-type-that-are": {
      "assertionId": "classical-compound-nnc-ca-matrix:p3104-there-are-two-nounstems-of-this-type-that-are",
      "canonicalPath": "cases.caMatrix.rules.compound-nnc/ca-matrix"
    },
    "claim-p3105::p3105-this-stem-has-aheady-been-encountered-in-the-irregular": {
      "assertionId": "classical-compound-nnc-ca-matrix:p3105-this-stem-has-aheady-been-encountered-in-the-irregular",
      "canonicalPath": "cases.caMatrix.authorizationStatus"
    },
    "claim-p3106::p3106-as-a-matrix-nounstem-ca-tl-means-entity-associated": {
      "assertionId": "classical-compound-nnc-ca-matrix:p3106-as-a-matrix-nounstem-ca-tl-means-entity-associated",
      "canonicalPath": "cases.caMatrix.gcdSatisfied"
    },
    "claim-p3107::p3107-at-times-the-meaning-of-the-embed-is-hypothetical": {
      "assertionId": "classical-compound-nnc-ca-matrix:p3107-at-times-the-meaning-of-the-embed-is-hypothetical",
      "canonicalPath": "cases.caMatrix.lcmComplete"
    },
    "claim-p3108::p3108-this-stem-is-also-used-as-the-matrix-for": {
      "assertionId": "classical-compound-nnc-ca-matrix:p3108-this-stem-is-also-used-as-the-matrix-for",
      "canonicalPath": "cases.caMatrix.rules.compound-nnc/ca-matrix"
    },
    "claim-p3109::p3109-compound-nounstems-formed-on-ca-tl-usually-belong-to": {
      "assertionId": "classical-compound-nnc-ca-matrix:p3109-compound-nounstems-formed-on-ca-tl-usually-belong-to",
      "canonicalPath": "cases.caMatrix.authorizationStatus"
    },
    "claim-p3110::p3110-na-cauh-n-a-ca-uh-it-is-my": {
      "assertionId": "classical-compound-nnc-ca-matrix:p3110-na-cauh-n-a-ca-uh-it-is-my",
      "canonicalPath": "cases.caMatrix.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3104": [],
    "claim-p3105": [],
    "claim-p3106": [],
    "claim-p3107": [],
    "claim-p3108": [],
    "claim-p3109": [],
    "claim-p3110": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3104": "authorized",
    "claim-p3105": "authorized",
    "claim-p3106": "authorized",
    "claim-p3107": "authorized",
    "claim-p3108": "authorized",
    "claim-p3109": "authorized",
    "claim-p3110": "authorized"
  }
};
export default Object.freeze(spec);
