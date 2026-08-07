const spec = {
  "ownerId": "classical-compound-accompanying-possession-supplement",
  "prefix": "ClassicalCompoundAccompanyingPossessionSupplement",
  "operationId": "classical.compound.accompanying.possession.supplement.execute",
  "inputContract": "complete-typed-classical-compound-accompanying-possession-supplement-source",
  "domain": "classical-compound-accompanying-possession-supplement",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-compound-runtime",
  "selections": [
    "claim-p2845",
    "claim-p2846"
  ],
  "coordinates": {
    "claim-p2845::p2845-to-express-the-notion-of-having-something-in-one": {
      "assertionId": "classical-compound-accompanying-possession-supplement:p2845-to-express-the-notion-of-having-something-in-one",
      "canonicalPath": "cases.accompanyingPossession.facts.supplementarySubjectAuthorized"
    },
    "claim-p2846::p2846-they-carry-their-provisions-with-them-the-topic-i": {
      "assertionId": "classical-compound-accompanying-possession-supplement:p2846-they-carry-their-provisions-with-them-the-topic-i",
      "canonicalPath": "cases.accompanyingPossession.surfaceRealization"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlCompoundValidationFrame",
  "executionValidatorName": "isClassicalNahuatlCompoundValidationFrame",
  "executionArgsBySelection": {
    "claim-p2845": [],
    "claim-p2846": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p2845": "authorized",
    "claim-p2846": "authorized"
  }
};
export default Object.freeze(spec);
