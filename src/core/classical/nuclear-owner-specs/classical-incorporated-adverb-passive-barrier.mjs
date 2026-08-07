const spec = {
  "ownerId": "classical-incorporated-adverb-passive-barrier",
  "prefix": "ClassicalIncorporatedAdverbPassiveBarrier",
  "operationId": "classical.incorporated.adverb.passive.barrier.execute",
  "inputContract": "complete-typed-classical-incorporated-adverb-passive-barrier-source",
  "domain": "classical-incorporated-adverb-passive-barrier",
  "mode": "canonical-operation",
  "canonicalActorId": "classical-nahuatl-nominal-embed-runtime",
  "selections": [
    "claim-p3039",
    "claim-p3040",
    "claim-p3041"
  ],
  "coordinates": {
    "claim-p3039::p3039-the-supplementary-subject-of-an-active-voice-transitive-vnc": {
      "assertionId": "classical-incorporated-adverb-passive-barrier:p3039-the-supplementary-subject-of-an-active-voice-transitive-vnc",
      "canonicalPath": "cases.passiveBarrier.rules.incorporated-adverb/passive-barrier"
    },
    "claim-p3040::p3040-in-the-passive-transformation-the-basic-subject-the-pronominal": {
      "assertionId": "classical-incorporated-adverb-passive-barrier:p3040-in-the-passive-transformation-the-basic-subject-the-pronominal",
      "canonicalPath": "cases.passiveBarrier.authorizationStatus"
    },
    "claim-p3041::p3041-the-resultant-adverb-normally-meaning-by-way-of-with": {
      "assertionId": "classical-incorporated-adverb-passive-barrier:p3041-the-resultant-adverb-normally-meaning-by-way-of-with",
      "canonicalPath": "cases.passiveBarrier.gcdSatisfied"
    }
  },
  "executionFunctionName": "buildClassicalNahuatlNominalEmbedValidationFrame",
  "executionValidatorName": "isClassicalNahuatlNominalEmbedValidationFrame",
  "executionArgsBySelection": {
    "claim-p3039": [],
    "claim-p3040": [],
    "claim-p3041": []
  },
  "expectedCanonicalStatusBySelection": {
    "claim-p3039": "authorized",
    "claim-p3040": "authorized",
    "claim-p3041": "authorized"
  }
};
export default Object.freeze(spec);
