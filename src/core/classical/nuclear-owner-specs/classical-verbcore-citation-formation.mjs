const spec = {
  "ownerId": "classical-verbcore-citation-formation",
  "prefix": "ClassicalVerbcoreCitationFormation",
  "operationId": "classical.verbcore.citation.form",
  "inputContract": "complete-typed-classical-verbcore-citation-formation-source",
  "domain": "classical-verbcore-citation-formation",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-verbcore-citation-formation",
  "selections": [
    "claim-p849",
    "claim-p850"
  ],
  "coordinates": {
    "claim-p849::p849-it-is-therefore-important-not-to-cite-the-verbstem": {
      "assertionId": "classical-verbcore-citation-formation:p849-it-is-therefore-important-not-to-cite-the-verbstem",
      "canonicalPath": "citationUnit"
    },
    "claim-p850::p850-in-recognition-of-the-importance-of-the-verbcore-every": {
      "assertionId": "classical-verbcore-citation-formation:p850-in-recognition-of-the-importance-of-the-verbcore-every",
      "canonicalPath": "isolatedVerbstemCitationAllowed"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlVerbcoreCitationSystemFrame",
  "executionValidatorName": "isClassicalNahuatlVerbcoreCitationSystemFrame",
  "executionArgsBySelection": {
    "claim-p849": [],
    "claim-p850": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p849": "authorized",
    "claim-p850": "authorized"
  }
};
export default Object.freeze(spec);
