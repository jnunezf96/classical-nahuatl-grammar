const spec = {
  "ownerId": "classical-verbstem-structure-formation",
  "prefix": "ClassicalVerbstemStructureFormation",
  "operationId": "classical.verbstem.structure.form",
  "inputContract": "complete-typed-classical-verbstem-structure-formation-source",
  "domain": "classical-verbstem-structure-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-verbstem-structure-formation",
  "selections": [
    "claim-p836",
    "claim-p837"
  ],
  "coordinates": {
    "claim-p836::p836-result-an-analyzed-stem-shows-its-constituent-morphs-isolated": {
      "assertionId": "classical-verbstem-structure-formation:p836-result-an-analyzed-stem-shows-its-constituent-morphs-isolated",
      "canonicalPath": "internalMorphBoundary"
    },
    "claim-p837::p837-when-this-is-the-case-an-analyzed-stem-shows": {
      "assertionId": "classical-verbstem-structure-formation:p837-when-this-is-the-case-an-analyzed-stem-shows",
      "canonicalPath": "internalMorphBoundaryScope"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVerbstemStructureSystemFrame",
  "executionValidatorName": "isClassicalNahuatlVerbstemStructureSystemFrame",
  "executionArgsBySelection": {
    "claim-p836": [],
    "claim-p837": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p836": "authorized",
    "claim-p837": "authorized"
  }
};
export default Object.freeze(spec);
