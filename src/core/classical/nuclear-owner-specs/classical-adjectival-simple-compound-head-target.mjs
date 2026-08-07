const spec = {
  "ownerId": "classical-adjectival-simple-compound-head-target",
  "prefix": "ClassicalAdjectivalSimpleCompoundHeadTarget",
  "operationId": "classical.adjectival.simple.compound.head.target.execute",
  "inputContract": "complete-typed-classical-adjectival-simple-compound-head-target-source",
  "domain": "classical-adjectival-simple-compound-head-target",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-adjectival-modification-runtime",
  "selections": [
    "claim-p4040",
    "claim-p4041"
  ],
  "coordinates": {
    "claim-p4040::p4040-the-head-of-a-structure-of-modification-may-be": {
      "assertionId": "classical-adjectival-simple-compound-head-target:p4040-the-head-of-a-structure-of-modification-may-be",
      "canonicalPath": "cases.compoundMatrix.canonicalResult"
    },
    "claim-p4041::p4041-the-modifier-in-the-latter-structure-while-modifying-the": {
      "assertionId": "classical-adjectival-simple-compound-head-target:p4041-the-modifier-in-the-latter-structure-while-modifying-the",
      "canonicalPath": "cases.compoundMatrix.compoundHeadTarget"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionValidatorName": "isClassicalNahuatlAdjectivalModificationValidationFrame",
  "executionArgsBySelection": {
    "claim-p4040": [],
    "claim-p4041": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p4040": "authorized",
    "claim-p4041": "authorized"
  }
};
export default Object.freeze(spec);
