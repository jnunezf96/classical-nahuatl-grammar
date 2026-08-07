const spec = {
  "ownerId": "classical-compound-nnc-affinity",
  "prefix": "ClassicalCompoundNncAffinity",
  "operationId": "classical.compound.nnc.affinity.execute",
  "inputContract": "complete-typed-classical-compound-nnc-affinity-source",
  "domain": "classical-compound-nnc-affinity",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-nnc-runtime",
  "selections": [
    "claim-p3121",
    "claim-p3122",
    "claim-p3123",
    "claim-p3124",
    "claim-p3125",
    "claim-p3126"
  ],
  "coordinates": {
    "claim-p3121::p3121-when-the-subject-pronoun-is-plural-an-absolutive-state": {
      "assertionId": "classical-compound-nnc-affinity:p3121-when-the-subject-pronoun-is-plural-an-absolutive-state",
      "canonicalPath": "cases.affinity.rules.compound-nnc/affinity"
    },
    "claim-p3122::p3122-at-times-however-the-notion-of-affinity-is-expressed": {
      "assertionId": "classical-compound-nnc-affinity:p3122-at-times-however-the-notion-of-affinity-is-expressed",
      "canonicalPath": "cases.affinity.authorizationStatus"
    },
    "claim-p3123::p3123-at-times-this-reduplication-on-the-matrix-is-optional": {
      "assertionId": "classical-compound-nnc-affinity:p3123-at-times-this-reduplication-on-the-matrix-is-optional",
      "canonicalPath": "cases.affinity.gcdSatisfied"
    },
    "claim-p3124::p3124-a-given-nounstem-in-the-matrix-subposition-may-allow": {
      "assertionId": "classical-compound-nnc-affinity:p3124-a-given-nounstem-in-the-matrix-subposition-may-allow",
      "canonicalPath": "cases.affinity.lcmComplete"
    },
    "claim-p3125::p3125-at-times-affinity-is-expressed-on-both-the-embed": {
      "assertionId": "classical-compound-nnc-affinity:p3125-at-times-affinity-is-expressed-on-both-the-embed",
      "canonicalPath": "cases.affinity.rules.compound-nnc/affinity"
    },
    "claim-p3126::p3126-the-matrix-stem-of-a-possessive-state-nnc-may": {
      "assertionId": "classical-compound-nnc-affinity:p3126-the-matrix-stem-of-a-possessive-state-nnc-may",
      "canonicalPath": "cases.affinity.authorizationStatus"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundNncValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p3121": [],
    "claim-p3122": [],
    "claim-p3123": [],
    "claim-p3124": [],
    "claim-p3125": [],
    "claim-p3126": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3121": "authorized",
    "claim-p3122": "authorized",
    "claim-p3123": "authorized",
    "claim-p3124": "authorized",
    "claim-p3125": "authorized",
    "claim-p3126": "authorized"
  }
};
export default Object.freeze(spec);
