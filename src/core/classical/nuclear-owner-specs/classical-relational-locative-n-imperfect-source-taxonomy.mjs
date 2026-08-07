const spec = {
  "ownerId": "classical-relational-locative-n-imperfect-source-taxonomy",
  "prefix": "ClassicalRelationalLocativeNImperfectSourceTaxonomy",
  "operationId": "classical.relational.locative.n.imperfect.source.taxonomy.execute",
  "inputContract": "complete-typed-classical-relational-locative-n-imperfect-source-taxonomy-source",
  "domain": "classical-relational-locative-n-imperfect-source-taxonomy",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-locative-relational-nnc-runtime",
  "selections": [
    "claim-p4367",
    "claim-p4368",
    "claim-p4369"
  ],
  "coordinates": {
    "claim-p4367::p4367-the-imperfect-tense-predicate-of-a-vnc-can-be": {
      "assertionId": "classical-relational-locative-n-imperfect-source-taxonomy:p4367-the-imperfect-tense-predicate-of-a-vnc-can-be",
      "canonicalPath": "prerequisites.imperfectActiveCanonical"
    },
    "claim-p4368::p4368-there-are-three-possible-stem-formations-according-to-whether": {
      "assertionId": "classical-relational-locative-n-imperfect-source-taxonomy:p4368-there-are-three-possible-stem-formations-according-to-whether",
      "canonicalPath": "prerequisites.imperfectPassiveCanonical"
    },
    "claim-p4369::p4369-the-compound-nounstem-has-the-meaning-of-place-of": {
      "assertionId": "classical-relational-locative-n-imperfect-source-taxonomy:p4369-the-compound-nounstem-has-the-meaning-of-place-of",
      "canonicalPath": "prerequisites.imperfectImpersonalCanonical"
    }
  },
  "executionFunctionName": "buildClassicalLocativeRelationalNncValidationFrame",
  "executionValidatorName": "isClassicalLocativeRelationalNncValidationFrame",
  "executionArgsBySelection": {
    "claim-p4367": [],
    "claim-p4368": [],
    "claim-p4369": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4367": "authorized",
    "claim-p4368": "authorized",
    "claim-p4369": "authorized"
  }
};
export default Object.freeze(spec);
